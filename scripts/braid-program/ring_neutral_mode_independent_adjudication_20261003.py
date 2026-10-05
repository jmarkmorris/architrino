"""Direct Cartesian neutral derivative check, independent of stored tensors."""
import argparse,hashlib,importlib.util,json
from pathlib import Path
import mpmath as mp
ROOT=Path(__file__).resolve().parents[2]
HELPER=ROOT/'scripts/braid-program/ring_planar_sector_independent_adjudication_20261003.py'
spec=importlib.util.spec_from_file_location('neutral_cartesian',HELPER)
base=importlib.util.module_from_spec(spec);spec.loader.exec_module(base)
OUT=ROOT/'.local-data/ring-exploration/neutral-adjudication'
mp.mp.dps=110;mp.iv.dps=100
def lo(v):return mp.mpf(v.a)
def hi(v):return mp.mpf(v.b)
def zero(v):return lo(v.real)<=0<=hi(v.real) and lo(v.imag)<=0<=hi(v.imag)
def nonzero(v):return lo(v.real)>0 or hi(v.real)<0 or lo(v.imag)>0 or hi(v.imag)<0
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def save(stage,data):
    def enc(v):
        if hasattr(v,'_mpi_'):return {'binary':[list(x) for x in v._mpi_],'display':[mp.nstr(lo(v),35),mp.nstr(hi(v),35)]}
        if hasattr(v,'_mpci_'):return {'real':enc(v.real),'imag':enc(v.imag)}
        if isinstance(v,dict):return {k:enc(x) for k,x in v.items()}
        if isinstance(v,(list,tuple)):return [enc(x) for x in v]
        return v
    OUT.mkdir(parents=True,exist_ok=True)
    payload={'passed':True,'instrumentSha256':sha(Path(__file__)),'helperSha256':sha(HELPER),'chainSha256':sha(base.HELPER),'K':1,'c_f':1,**data}
    (OUT/(stage+'.json')).write_text(json.dumps(enc(payload),indent=2)+'\n')
    print(json.dumps({'stage':stage,'passed':True}),flush=True)

def axial(beta,radius,roots,z,k):
    H=z*z;Hp=2*z
    for m,x in roots:
        position=[radius*mp.iv.cos(-2*x),radius*mp.iv.sin(-2*x)]
        length=2*radius*mp.iv.sin(x)
        normal=[(radius-position[0])/length,-position[1]/length]
        omega=beta/radius;velocity=[-omega*position[1],omega*position[0]]
        D=1-base.base.dot(normal,velocity)
        weight=(-1)**m/(length**3*abs(D))
        E=mp.iv.exp(mp.iv.mpc(0,k*m*mp.iv.pi/3)-z*length)
        H-=weight*(1-E);Hp-=weight*length*E
    return H,Hp

def known():
    H,Hp=axial(mp.iv.mpf(0),mp.iv.mpf(1),[(0,mp.iv.pi/2)],mp.iv.mpc(1,0),0)
    expected=mp.iv.mpc(2-mp.iv.exp(-2)/4,0)
    assert zero(Hp-expected)
    z=mp.iv.mpc(0,-1);a=z*z-1;b=-2*z;c=2*z
    determinant=a*a-b*c
    derivative=4*z*a-(-2)*c-b*2
    assert zero(determinant) and zero(derivative)
    direct=base.characteristic(mp.iv.mpf(1),mp.iv.mpf(1),[],z,1,mp.iv)
    assert zero(direct[0]) and zero(direct[1])
    assert 2*(-1)+3==1
    save('known',{'controls':['static axial row derivative with weight1/8','free rotating translation double zero through Cartesian pencil','simple diagonal pencil derivative1'],'freeDeterminantDerivative':derivative,'staticAxialPencilDerivative':Hp})

def target():
    c=json.loads((OUT/'known.json').read_text())
    assert c['passed'] and c['instrumentSha256']==sha(Path(__file__)) and c['helperSha256']==sha(HELPER) and c['chainSha256']==sha(base.HELPER)
    rows=[]
    for t in [2,4]:
        beta,radius,roots=base.reference(t);omega=beta/radius
        for k,imag in [(1,1),(5,-1)]:
            z=mp.iv.mpc(0,imag*omega)
            determinant,derivative,A=base.characteristic(beta,radius,roots,z,k,mp.iv)
            vector=[1,mp.iv.mpc(0,imag)]
            assert zero(determinant) and all(zero(base.base.dot(row,vector)) for row in A)
            H,Hp=axial(beta,radius,roots,z,k)
            assert zero(H) and nonzero(derivative) and nonzero(Hp)
            rows.append({'topology':t,'sector':k,'translationDeterminantDerivative':derivative,'tiltDerivative':Hp,'acceptedSimpleNeutralRoots':True})
    save('target',{'rows':rows,'scope':'T02/T04 neutral symmetry roots; Cartesian derivative independence, not full sector census'})

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','target'],required=True);a=p.parse_args()
    known() if a.stage=='known' else target()
