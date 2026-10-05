"""Independent symbolic/exact controls for E history-vector transformation.
No transformed subject or target trajectory is imported. Pure algebra/control
artifact; no assertion of a solution, stability, event or useful error bound.
"""
import argparse,hashlib,json
from pathlib import Path
import sympy as s
def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
R=s.Symbol('R',positive=True);sig=s.Symbol('sigma');n=s.Matrix(s.symbols('nx ny nz'));v=s.Matrix(s.symbols('vx vy vz'));u=s.Matrix(s.symbols('ux uy uz'));a=s.Matrix(s.symbols('ax ay az'));D=1-n.dot(v);eta=n.dot(u);delay=(1-eta)/D
q=sig*(v-n)/(R*D);B=sig*((n-v)*n.T-D*s.eye(3))/(R*D**3);G=sig*(1-v.dot(v))*(n-v)/(R**2*D**3);w=u-v*delay;Rd=n.dot(w);nd=(w-n*Rd)/R
def simple(z):return z.applyfunc(s.cancel)
def values(z,nn,vv,uu,aa,r=2):
    substitution={R:s.Rational(r),sig:-1}
    for variables,entries in [(n,nn),(v,vv),(u,uu),(a,aa)]:substitution.update(zip(variables,map(s.Rational,entries)))
    return simple(z.subs(substitution))
def known():
    assert (s.Matrix([3,4,0])/5).dot(s.Matrix([3,4,0])/5)==1
    radial=q.diff(R);normal=q.jacobian(n);velocity=q.jacobian(v)
    assert simple(velocity+D*B)==s.zeros(3)
    L=radial*Rd+normal*nd
    explicit=-q*Rd/R+sig*(-nd+(v-n)*v.dot(nd)/D)/(R*D)
    assert simple(L-explicit)==s.zeros(3,1)
    derivative=radial*Rd+normal*nd+velocity*a*delay
    total=G+B*a+derivative
    assert simple(total-G-explicit-eta*B*a)==s.zeros(3,1)
    zero=[0,0,0];ray=[1,0,0];transverse=[0,'3/100',0]
    assert values(total,ray,zero,zero,transverse)==s.Matrix([-s.Rational(1,4),0,0])
    assert values(total,ray,zero,['1/5',0,0],transverse)==s.Matrix([-s.Rational(3,10),s.Rational(3,1000),0])
    assert values(total,ray,['1/5',0,0],zero,transverse)==s.Matrix([-s.Rational(5,16),0,0])
    nn=['3/5','4/5',0];vv=['1/10','-1/5',0];uu=['-3/10','2/5',0];aa=['2/7','-3/11',0]
    assert values(s.Matrix([eta,D]),nn,vv,uu,aa)==s.Matrix([s.Rational(7,50),s.Rational(11,10)])
    assert values(total-G-explicit,nn,vv,uu,aa)==s.Rational(7,50)*values(B*a,nn,vv,uu,aa)
    return dict(passed=True,sympyVersion=s.__version__,symbolicDimension=3,polarity=-1,K=1,cf=1,cases=['exact rational unit ray3/5,4/5','independently differentiated global q_v+D B zero matrix','independent geometry Jacobian equals statedL0','full transformed chain-rule residual zero in all3components','static transverse acceleration receivingzero gives[-1/4,0,0]','radial receiving1/5 gives[-3/10,3/1000,0]','affine source1/5 gives[-5/16,0,0] with transverse termcancelled','nonaligned exact eta7/50 andD11/10 neutralcoefficient'],nonalignedTransformedDerivative=list(map(str,values(total,nn,vv,uu,aa))),scope='symbolic coefficient identity and exact controls only; receiving/root geometry hypotheses separately derived; no target actual error, event or stability')
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--out',required=True);args=p.parse_args();out=dict(knownFirst=known(),sourceSHA=sha(__file__),theoremSHA=sha(Path(__file__).with_name('maxwell-e-first-event-neutral-velocity-transform-theorem.md')))
    with Path(args.out).open('x') as f:f.write(json.dumps(out,indent=2)+'\n')
    print(json.dumps(out),flush=True)
