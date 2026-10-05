"""Independent path perturbations, with emission times re-solved before response.

No imports from subject or reference instruments. This is high-precision numerical
finite-difference evidence, not an interval certificate. --known must run first.
"""
import argparse
import hashlib
import json
from pathlib import Path
from datetime import datetime, timezone
import mpmath as m

OUT = Path('.local-data/master-equation-closure/binary-research/alternatives-screen-2026-10-05/adjudication')
m.mp.dps = 80
P = m.mpf(3)/2

def vec(x, y): return m.matrix([x, y])
def rot(t, q): return vec(m.cos(t)*q[0]-m.sin(t)*q[1], m.sin(t)*q[0]+m.cos(t)*q[1])
def turn(q): return vec(-q[1], q[0])
def norm(q): return m.sqrt(q[0]*q[0]+q[1]*q[1])
def dot(a, b): return sum(a[k]*b[k] for k in range(2))
def root(f, a, b):
    assert f(a)*f(b)<0
    return m.findroot(f, (a,b), solver='bisect', maxsteps=400)
def out(x): return m.nstr(x, 45)
def emit(name, result):
    OUT.mkdir(parents=True, exist_ok=True)
    target=OUT/name
    assert not target.exists()
    result.update({'utc':datetime.now(timezone.utc).isoformat(), 'source_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(), 'cf':1})
    target.write_text(json.dumps(result, indent=2)+'\n')
    print(json.dumps(result, indent=2))

def stationary(eps, direction):
    receiver=vec(1,0)+eps*direction
    source=vec(-1,0)
    distance=root(lambda t:norm(receiver-source)-t, m.mpf(1), m.mpf(3))
    return -(receiver-source)/distance**(P+1)

def known():
    h=m.mpf('1e-12'); errors=[]
    for k in range(2):
        direction=vec(int(k==0),int(k==1))
        numerical=(stationary(h,direction)-stationary(-h,direction))/(2*h)
        exact=vec(P/2**(P+1),0) if k==0 else vec(0,-1/2**(P+1))
        errors.append(norm(numerical-exact))
    assert max(errors)<m.mpf('1e-23')
    emit('path-known.json', {'passed':True, 'grade':'measured calibration against separately stated exact stationary derivative', 'errors':[out(x) for x in errors]})

def phases(beta):
    return [root(lambda x:x-beta*m.sin(x),m.mpf('1.58'),m.mpf('3.14')),
            root(lambda x:x-beta*m.cos(x),m.mpf(0),m.mpf('1.57')),
            root(lambda x:x+beta*m.cos(x),m.mpf('1.58'),m.mpf('2.83')),
            root(lambda x:x+beta*m.cos(x),m.mpf('2.83'),m.mpf(4))]

def response(beta, xx, mu, eps, direction):
    # All positions here are divided by the base circle radius; velocity is
    # dimensional in cf=1 units. theta=omega*age, so the root is |r|=theta/beta.
    receiver=vec(1,0)+eps*direction
    total=vec(0,0); denominators=[]; shifts=[]
    for x, polarity in zip(xx, [1,-1,-1,-1]):
        def source(theta):
            return polarity*rot(-theta,vec(1,0))+eps*m.exp(-mu*theta)*rot(-theta,direction)
        def residual(theta): return norm(receiver-source(theta))-theta/beta
        center=2*x
        theta=root(residual,center-m.mpf('1e-4'),center+m.mpf('1e-4'))
        displacement=receiver-source(theta); distance=norm(displacement); n=displacement/distance
        velocity=beta*(polarity*rot(-theta,vec(0,1))+eps*m.exp(-mu*theta)*rot(-theta,mu*direction+turn(direction)))
        denominator=1-dot(n,velocity)
        total+=polarity*n/(distance**P*abs(denominator))
        denominators.append(denominator); shifts.append(theta-center)
    return total,denominators,shifts

def coefficient(beta): return response(beta,phases(beta),m.mpf(0),m.mpf(0),vec(0,0))[0]

def target():
    assert json.loads((OUT/'path-known.json').read_text())['passed']
    beta=m.findroot(lambda b:coefficient(b)[1], (m.mpf('3.69148037'),m.mpf('3.69148040')))
    xx=phases(beta); c,dd,_=response(beta,xx,0,0,vec(0,0))
    radius=(-c[0]/beta**2)**2
    results=[]
    for mu in [m.mpf('.24'),m.mpf('.26')]:
        for h in [m.mpf('1e-8'),m.mpf('1e-12'),m.mpf('1e-16')]:
            jac=m.matrix(2,2)
            for k in range(2):
                direction=vec(int(k==0),int(k==1))
                cp,_,_=response(beta,xx,mu,h,direction)
                cm,_,_=response(beta,xx,mu,-h,direction)
                column=(cp-cm)/(2*h)
                for j in range(2): jac[j,k]=column[j]
            derivative=m.matrix([[mu,-1],[1,mu]])
            matrix=derivative*derivative-radius**(1-P)*jac/beta**2
            determinant=m.det(matrix)
            assert determinant<0 if mu<m.mpf('.25') else determinant>0
            results.append({'mu':out(mu),'step_over_radius':out(h),'determinant':out(determinant), 'matrix':[[out(matrix[j,k]) for k in range(2)] for j in range(2)]})
    emit('path-target.json', {'grade':'measured independent all-root path finite variation; no rigorous error enclosure', 'beta':out(beta), 'radius':out(radius), 'radial_coefficient':out(c[0]), 'tangential_residual':out(c[1]), 'signed_denominators':[out(x) for x in dd], 'modes':results})

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--known',action='store_true');parser.add_argument('--target',action='store_true');args=parser.parse_args()
    assert args.known != args.target
    known() if args.known else target()
