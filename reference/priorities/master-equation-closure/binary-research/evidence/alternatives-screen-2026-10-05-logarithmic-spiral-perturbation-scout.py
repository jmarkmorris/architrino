"""Full-clock Cartesian perturbation diagnostic; measured locators only."""
import argparse
import hashlib
import json
from datetime import datetime, timezone
from pathlib import Path
import numpy as np
from scipy.optimize import brentq, root

OMEGA = 2.2980147591220047
ANGLE = 1.1160548442916221


def setup(omega=OMEGA, angle=ANGLE, radial=False):
    lam = 2/3 if radial else np.exp(-angle/omega)
    a = 0.2 if radial else (1-lam)/np.sqrt(1+lam*lam+2*lam*np.cos(angle))
    om = np.array([[0., -omega, 0.], [omega, 0., 0.], [0., 0., 0.]])
    phase = omega*np.log(lam)
    p = np.array([[np.cos(phase), -np.sin(phase), 0.], [np.sin(phase), np.cos(phase), 0.], [0., 0., 1.]])
    av = np.array([a, 0., 0.])
    c = av+lam*p@av
    d = 1-lam
    n = c/d
    w = p@(np.eye(3)+om)@av
    den = 1+n@w
    return dict(omega=omega, lam=lam, a=a, om=om, p=p, av=av, c=c, d=d, n=n, w=w, den=den)


def variation(k, rho, x, par):
    lam, p, om = par['lam'], par['p'], par['om']
    d, den, n, w, c = (par[t] for t in ('d', 'den', 'n', 'w', 'c'))
    b = x-rho*lam**(k+1)*p@x
    dl = -(n@b)/den
    dc = b+w*dl
    dd = -dl
    dn = (dc-n*(n@dc))/d
    dw = rho*lam**k*p@((k+1)*np.eye(3)+om)@x-dl/lam*om@w
    dden = dn@w-n@dw
    return -dc/(d*d*den)+2*c*dd/(d**3*den)+c*dden/(d*d*den*den)


def matrix(k, rho, par):
    om = par['om']
    lhs = k*k*np.eye(3)+k*(np.eye(3)+2*om)+om+om@om
    return lhs-np.column_stack([variation(k, rho, np.eye(3)[:,j], par) for j in range(3)])


def normal(k, rho, par):
    lam = par['lam']
    return k*(k+1)+lam/(1-lam)**2*(1-rho*lam**(k+1))


def exact_response(amplitude, k, rho, x, par):
    """Independent implicit evaluation, used only on real radial control."""
    av, om = par['av'], par['om']
    current = av+amplitude*x
    def source(lam):
        phase = par['omega']*np.log(lam)
        p = np.array([[np.cos(phase), -np.sin(phase), 0.], [np.sin(phase), np.cos(phase), 0.], [0., 0., 1.]])
        us = -av+amplitude*rho*lam**k*x
        dus = amplitude*rho*k*lam**k*x
        return p@us, p@(dus+(np.eye(3)+om)@us)
    def residual(lam):
        us, _ = source(lam)
        return 1-lam-np.linalg.norm(current-lam*us)
    lam = brentq(residual, 0.1, 0.95, xtol=5e-15)
    us, velocity = source(lam)
    chord = current-lam*us
    length = np.linalg.norm(chord)
    direction = chord/length
    return -direction/(length*(1-direction@velocity))


def controls():
    p = setup()
    equilibrium = (p['om']+p['om']@p['om'])@p['av']+p['n']/(p['d']*p['den'])
    assert np.linalg.norm(equilibrium)<1e-12
    assert abs(np.linalg.norm(p['c'])-p['d'])<1e-14
    normal_error=0.
    for rho in (-1,1):
        for k in (0., 0.7, -0.3+1.2j, 2+4j):
            normal_error=max(normal_error, abs(matrix(k,rho,p)[2,2]-normal(k,rho,p)))
    assert normal_error<1e-12
    symmetry=[]
    for k,rho,x in [(0.,-1,p['om']@p['av']),(-1.,-1,(np.eye(3)+p['om'])@p['av']),(-1+1j*OMEGA,1,np.array([1.,1j,0.])),(-1-1j*OMEGA,1,np.array([1.,-1j,0.])),(-1.,1,np.array([0.,0.,1.])),(1j*OMEGA,-1,np.array([0.,0.,1.])),(-1j*OMEGA,-1,np.array([0.,0.,1.]))]:
        residual=float(np.linalg.norm(matrix(k,rho,p)@x))
        assert residual<1e-11, (k,rho,residual)
        symmetry.append(dict(k=[complex(k).real,complex(k).imag],rho=rho,residual=residual))
    pr=setup(omega=0,radial=True)
    derivative=[]
    for rho in (-1,1):
        for k in (0.,0.7,2.):
            x=np.array([0.2,-0.3,0.4])
            step=1e-5
            estimate=(exact_response(step,k,rho,x,pr)-exact_response(-step,k,rho,x,pr))/(2*step)
            residual=float(np.linalg.norm(estimate-variation(k,rho,x,pr)))
            assert residual<2e-8, (rho,k,residual)
            derivative.append(dict(rho=rho,k=k,residual=residual))
    return dict(equilibrium_norm=float(np.linalg.norm(equilibrium)),normal_formula_error=normal_error,symmetries=symmetry,radial_differential=derivative)


def target():
    p=setup()
    results=[]
    for rho in (-1,1):
        for sector in ('planar','normal'):
            found=[]
            def value(k):
                return np.linalg.det(matrix(k,rho,p)[:2,:2]) if sector=='planar' else normal(k,rho,p)
            def real_value(x):
                z=value(x[0]+1j*x[1])
                return [z.real,z.imag]
            for real in np.linspace(-4,3,15):
                for imag in np.linspace(0,24,49):
                    sol=root(real_value,[real,imag],tol=1e-11)
                    k=complex(*sol.x)
                    if abs(value(k))<1e-7 and -15<k.real<10 and abs(k.imag)<40:
                        if k.imag<0:k=k.conjugate()
                        if not any(abs(k-z)<1e-5 for z in found):found.append(k)
            found.sort(key=lambda z:(-z.real,z.imag))
            results.append(dict(rho=rho,sector=sector,roots=[dict(real=z.real,imag=z.imag,residual=abs(value(z))) for z in found]))
    signs={str(rho):[[k,float(np.linalg.det(matrix(k,rho,p)[:2,:2]).real)] for k in (0.01,0.05,0.1,0.2,0.5,1.,2.,3.,5.)] for rho in (-1,1)}
    return dict(parameters={key:float(p[key]) for key in ('omega','lam','a','den')},sectors=results,real_planar_signs=signs)


def main():
    parser=argparse.ArgumentParser()
    parser.add_argument('--target',action='store_true')
    parser.add_argument('--known')
    parser.add_argument('--out',required=True)
    args=parser.parse_args()
    digest=hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
    if args.target:
        previous=json.loads(Path(args.known).read_text())
        assert previous['source_sha256']==digest and previous['mode']=='known' and previous['passed']
    result=target() if args.target else controls()
    receipt=dict(mode='target' if args.target else 'known',passed=True,source_sha256=digest,utc=datetime.now(timezone.utc).isoformat(),result=result)
    with open(args.out,'x') as stream:json.dump(receipt,stream,indent=2)
    print(json.dumps(receipt,indent=2))

if __name__=='__main__':main()
