"""Separate symbolic chain-rule oracle on exact synthetic rational tuples.

No subject module imports. Derives p' from original E and d(q)/dt in
physical receiving velocity coordinates before substituting the inverse map.
"""
import json
from pathlib import Path
import sympy as s
R,vn,vt,un,ut,pn,pt,an,at,theta=s.symbols('R vn vt un ut pn pt an at theta', real=True)
assert s.diff(R**3,R).subs(R,s.Rational(2,3))==s.Rational(4,3)
assert s.diff(1/R,R).subs(R,2)==-s.Rational(1,4)
print('Known symbolic differentiation controls passed before fixture construction.',flush=True)
n=s.Matrix([s.cos(theta),s.sin(theta)]); v=s.Matrix([vn,vt]); u=s.Matrix([un,ut]); acc=s.Matrix([an,at]); I=s.eye(2)
D=1+(n.dot(v)); w=1-n.dot(u); P=I-n*n.T
q=P*v/(R*D*w)
C=(1-v.dot(v))*(n+v)/(R**2*D**3)
B=((n+v)*n.T-D*I)/(R*D**3)
A=-C+B*acc
clock=w/D; Rdot=1-clock; ndot=P*(u+clock*v)/R
thetaDot=(s.Matrix([-s.sin(theta),s.cos(theta)]).dot(ndot))
Hraw=A+q.diff(R)*Rdot+q.diff(theta)*thetaDot+q.jacobian([vn,vt])*acc*clock+q.jacobian([un,ut])*A
q0=q.subs(theta,0); H0=s.simplify(Hraw.subs(theta,0))
assert H0.diff(an)==s.zeros(2,1) and H0.diff(at)==s.zeros(2,1)
inverse={un:pn,ut:pt-vt/(R*(1+vn)*(1-pn))}
fields={'q':q0,'P':u+q0,'deltaQ':q0-s.Matrix([1/R,vt/(R*(1+vn))]),'H':H0}
rotation=s.Matrix([[0,-1],[1,0]])
def coefficients(F):
    Fv=F.jacobian([vn,vt]); Fp=F.jacobian([un,ut]); FR=F.diff(R)
    # Changing the ray rotates components of fixed Cartesian v,p backward.
    angular=rotation*F-Fv*rotation*s.Matrix([vn,vt])-Fp*rotation*s.Matrix([un,ut])
    AX=s.Matrix.hstack((FR-Fv*acc-vt*angular/R)/(1+vn),angular/R)
    return {'F':F,'FR':FR,'Fv':Fv,'Fu':Fp,'Ftheta':angular,'AX':AX}
model={k:coefficients(f) for k,f in fields.items()}
def encode(M,sub):
    if M.cols==1:return [str(s.cancel(v.subs(sub))) for v in M]
    return [[str(s.cancel(M[i,j].subs(sub))) for j in range(M.cols)] for i in range(M.rows)]
fixtures=[]
for label,values in [('stationary',[2,0,0,s.Rational(1,3),s.Rational(2,5),0,0]),('moving',[2,s.Rational(1,5),s.Rational(3,10),s.Rational(1,4),s.Rational(7,30),0,0]),('accelerated',[s.Rational(7,3),s.Rational(-1,6),s.Rational(2,7),s.Rational(-1,5),s.Rational(3,8),s.Rational(7,100),s.Rational(-9,100)]),('radial',[3,s.Rational(1,7),0,s.Rational(2,9),s.Rational(-1,6),s.Rational(1,11),s.Rational(1,13)])]:
    sub=dict(zip([R,vn,vt,un,ut,an,at],values))
    fixtures.append({'label':label,'tuple':[str(z) for z in values],'fields':{k:{name:encode(M,sub) for name,M in row.items()} for k,row in model.items()}})
assert fixtures[0]['fields']['H']['AX']==[['1/4','0'],['0','-1/8']]
assert fixtures[0]['fields']['H']['Fu']==[['0','0'],['0','0']]
assert fixtures[1]['fields']['q']['F']==['0','1/6']
assert fixtures[1]['fields']['H']['F']==['-67/360','-8023/64800']
out={'passed':True,'knownFirst':['polynomial derivative4/3','reciprocal derivative-1/4','stationary original E derivatives','moving rational value controls'],'independentConstruction':'symbolic original E plus full physical q chain rule, exact rational differentiation; no subject imports','delayedAccelerationCancelsExactly':True,'fixtures':fixtures}
dest=Path('.local-data/master-equation-closure/binary-research/authorized-cases-ten-hour/reference/transverse-physical-u-symbolic-controls-v1.json')
assert not dest.exists(); dest.write_text(json.dumps(out,indent=2)+'\n'); print(json.dumps({'passed':True,'out':str(dest)}))
