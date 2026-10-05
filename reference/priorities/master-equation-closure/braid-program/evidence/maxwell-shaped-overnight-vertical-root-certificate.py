"""Directed Rouche disk certificate for frozen ring's vertical m3 roots.
Uses previously certified complete parameter boxes and derived vertical response.
This is separate from the unchanged measured Cartesian characteristic subject.
Known complex modulus/derivative and polynomial disk checks precede target.
"""
import json,hashlib,importlib.util
from pathlib import Path
import mpmath as mp
mp.iv.dps=55;iv=mp.iv
I=lambda a,b=None:iv.mpf([a,a if b is None else b])
C=lambda re,im:iv.mpc(I(re),I(im))
abscomplex=lambda z:iv.sqrt(z.real**2+z.imag**2)

# Preserve the independent outward endpoint exporter unchanged.
path=Path(__file__).with_name('maxwell-shaped-overnight-independent-ring-certified-export.py')
spec=importlib.util.spec_from_file_location('outward_export',path);export=importlib.util.module_from_spec(spec);spec.loader.exec_module(export)

def known():
    assert abscomplex(C(3,4)).a==5 and abscomplex(C(3,4)).b==5
    z=C(1,0);rho=I('.001');f=z*z-1;df=2*z;M=I(2)
    assert abscomplex(f).b+M*rho**2/2 < abscomplex(df).a*rho
    assert (C(1,2)*C(3,4)).real.a==-5 and (C(1,2)*C(3,4)).imag.a==10
    return dict(passed=True,cases=['complex modulus five','exact complex multiplication','Rouche polynomial z2minus1 radius.001'])

def coeffs(cert,law):
    beta=I(*cert['beta']);case=next(c for c in cert['cases'] if c['law']==law);r=I(*case['radius']);out=[]
    for hit in cert['hits']:
        a=I(*hit['a']);tau=r*I(*hit['delay_over_radius']);D=I(*hit['D'])
        H=1-beta**2*iv.cos(2*a)
        if law=='E':A=H/(tau**3*D**3);B=-H/(tau**2*D**3);CC=-1/(tau*D**2)
        else:
            A=H/(tau**3*D**2)+beta*I(*hit['E_t'])/(r**2*tau)
            B=-H/(tau**2*D**2);CC=-1/(tau*D)
        out.append((tau,A,B,CC))
    return out

def chi(rows,z,deriv=0):
    ans=z*z if deriv==0 else 2*z
    # combined exact sigma*exp(3ijpi/2) is +i,-1,-i
    phases=[C(0,1),C(-1,0),C(0,-1)]
    for j,(tau,a,b,c) in enumerate(rows,1):
        phase=phases[j-1]*iv.exp(-z*tau);p=a-b*z-c*z*z
        if deriv==0:ans-=(-1)**j*a;ans+=phase*p
        else:ans+=phase*(-tau*p-b-2*c*z)
    return ans

def second_bound(rows,z,rho):
    L=abscomplex(z).b+rho;out=I(2)
    for tau,a,b,c in rows:
        aa=abs(a).b;bb=abs(b).b;cc=abs(c).b;tt=tau.b
        p=aa+bb*L+cc*L*L;pd=bb+2*cc*L
        e=iv.exp(-(z.real-rho)*tau.a).b
        out+=e*(tt*tt*p+2*tt*pd+2*cc)
    return out.b

def target():
    cert=json.loads(Path('.local-data/master-equation-closure/braid-program/maxwell-shaped-overnight-independent/ring-outward-balance-certificate.json').read_text())['certificate']
    results=[]
    for law,re,im in [('E','0.02135268760361724446008557537436787','0.21506761942675149857322318680161622'),('E+M','0.00785868192262262301993871522613038','0.13324775149510119885551872644675521')]:
        rows=coeffs(cert,law);z=C(re,im);rho=I('0.0000001')
        eta=abscomplex(chi(rows,z)).b;d=abscomplex(chi(rows,z,1)).a;M=second_bound(rows,z,rho)
        left=eta+M*rho*rho/2;right=d*rho
        assert left.b<right.a and z.real.a>rho.b
        results.append(dict(law=law,sector=3,center=[re,im],radius='0.0000001',chi_center_modulus_upper=export.encode(eta),chi_derivative_modulus_lower=export.encode(d),second_derivative_upper=export.encode(M),rouche_left=export.encode(left),rouche_right=export.encode(right),positive_real_part_lower=export.encode(z.real-rho),grade='derived unique characteristic zero inside positive-real Rouche disk; no nonlinear fate'))
    return results

if __name__=='__main__':
    import argparse
    p=argparse.ArgumentParser();p.add_argument('--target',action='store_true');p.add_argument('--output',required=True);a=p.parse_args()
    result=dict(known=known());print(json.dumps(result),flush=True)
    assert hashlib.sha256(b'abc').hexdigest()=='ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'
    result['pre_target_sha256']=hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
    if a.target:result['certificates']=target()
    Path(a.output).write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result),flush=True)
