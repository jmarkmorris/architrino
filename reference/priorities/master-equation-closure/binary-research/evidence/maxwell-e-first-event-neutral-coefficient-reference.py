"""Separate symbolic Cartesian/clock derivative controls for exact q/H fields.
No coefficient subject imported. Imports immutable transformation reference;
uses its independently differentiated global field and physical ray chain rule.
"""
import argparse,importlib.util,json,hashlib
from pathlib import Path
import sympy as s
p=Path(__file__).with_name('maxwell-e-first-event-neutral-velocity-transform-reference.py');spec=importlib.util.spec_from_file_location('frozen_symbolic_transform',p);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
R,n,v,u,a,D=m.R,m.n,m.v,m.u,m.a,m.D
j=s.Matrix(s.symbols('jx jy jz'));q=m.q;H=m.G+m.B*a+q.diff(R)*m.Rd+q.jacobian(n)*m.nd+q.jacobian(v)*a*m.delay
def matrices(f):
    direct=f.diff(R)*n.T+f.jacobian(n)*(s.eye(3)-n*n.T)/R;V=f.jacobian(v);A=f.jacobian(a);U=f.jacobian(u);clock=direct*(s.eye(3)+v*n.T/D)-(V*a+A*j)*n.T/D
    return dict(F=f,AX=clock,Fv=V,Fa=A,Fu=U)
Qm=matrices(q);Hm=matrices(H)
def evaluate(tuple):
    rr,vs,as_,js,us=tuple;ray=s.Matrix(rr);radius=s.sqrt(ray.dot(ray));ray=ray/radius;mapping={R:radius,m.sig:-1}
    for variables,entries in [(n,ray),(v,vs),(a,as_),(j,js),(u,us)]:mapping.update(zip(variables,map(s.Rational,entries)))
    def convert(matrix):return [[str(s.cancel(x.subs(mapping))) for x in row] for row in matrix.tolist()[:2]]
    return {kind:{key:convert(matrix) for key,matrix in matrices_.items()} for kind,matrices_ in [('q',Qm),('H',Hm)]}
def known():
    z=[0,0,0];static=evaluate(([2,0,0],z,z,z,z));assert static['H']['AX']==[['1/4','0','0'],['0','-1/8','0']] and static['H']['Fu']==[['-1/4','0','0'],['0','1/4','0']];assert static['q']['AX']==[['-1/4','0','0'],['0','1/4','0']] and static['q']['Fv']==[['0','0','0'],['0','-1/2','0']]
    accelerated=evaluate(([2,0,0],z,[0,'3/100',0],[0,'1/20',0],['1/5',0,0]));assert accelerated['H']['F']==[['-3/10'],['3/1000']] and accelerated['H']['Fa']==[['0','0','0'],['0','1/10','0']]
    # Independent direct source-A/J and moving-receiver clock derivative values.
    assert accelerated['H']['AX']==[['3/10','-3/2000','0'],['-19/2000','-7/40','0']]
    affine=evaluate((['5/2',0,0],['1/5',0,0],z,z,z));assert affine['H']['Fa']==[['0','0','0'],['0','0','0']]
    nonaligned=evaluate((['6/5','8/5',0],['1/10','-1/5',0],['2/7','-3/11',0],['1/13','2/17',0],['-3/10','2/5',0]));assert nonaligned['H']['F']==[['-13183/58564'],['-2648/14641']]
    return dict(passed=True,prior=m.known(),cases=['static fullCartesian and nominal-clock q/H matrices','transverse sourceA/J plus receivingu gives exactHclock[3/10,-3/2000;-19/2000,-7/40]','zero receivingrayprojection eliminates directsourceA matrix','nonaligned complete exact sourceA/J/U tuple'],controls=dict(static=static,accelerated=accelerated,affine=affine,nonaligned=nonaligned))
def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--out',required=True);args=p.parse_args();out=dict(knownFirst=known(),sourceSHA=sha(__file__),symbolicTransformReferenceSHA=sha(Path(__file__).with_name('maxwell-e-first-event-neutral-velocity-transform-reference.py')))
    with Path(args.out).open('x') as f:f.write(json.dumps(out,indent=2)+'\n')
    print(json.dumps(dict(passed=out['knownFirst']['passed'],cases=out['knownFirst']['cases'],sourceSHA=out['sourceSHA'])),flush=True)
