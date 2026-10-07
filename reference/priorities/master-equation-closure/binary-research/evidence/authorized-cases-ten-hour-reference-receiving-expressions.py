"""Freeze exact symbolic interval expressions derived from the independent oracle."""
from pathlib import Path
import json,sys
import sympy as s
scope={}
old=Path(__file__).with_name('authorized-cases-ten-hour-reference-transverse-physical-u-oracle.py').read_text()
exec(old.split('fixtures=[]')[0],scope)
R,vn,vt,un,ut,an,at=[scope[k] for k in ['R','vn','vt','un','ut','an','at']]
cn,ct,jn,jt=s.symbols('cn ct jn jt',real=True)
rot=s.Matrix([[0,-1],[1,0]]); vel=s.Matrix([vn,vt]); acc=s.Matrix([an,at]); uv=s.Matrix([un,ut]); jerk=s.Matrix([jn,jt])
models={}
for name in ['q','H']:
    f=scope['fields'][name]; fv=f.jacobian([vn,vt]); fu=f.jacobian([un,ut]); fr=f.diff(R)
    theta=rot*f-fv*rot*vel-fu*rot*uv
    ax=s.Matrix.hstack((fr-fv*acc-ct*theta/R)/(1+cn),theta/R)
    models[name]=dict(F=f,FR=fr,Fv=fv,Fu=fu,Ftheta=theta,AX=ax)
f=s.simplify(scope['A'].subs(scope['theta'],0));fv=f.jacobian([vn,vt]);fa=f.jacobian([an,at]);fr=f.diff(R);theta=rot*f-fv*rot*vel-fa*rot*acc
models['original']=dict(F=f,Fv=fv,Fa=fa,AX=s.Matrix.hstack((fr-fv*acc-fa*jerk-ct*theta/R)/(1+cn),theta/R))
stat={R:2,vn:0,vt:0,un:s.Rational(1,3),ut:s.Rational(2,5),an:0,at:0,cn:0,ct:0,jn:0,jt:0}
assert s.simplify(models['H']['AX'].subs(stat))==s.diag(s.Rational(1,4),-s.Rational(1,8))
assert s.simplify(models['original']['AX'].subs(stat))==s.diag(s.Rational(1,4),-s.Rational(1,8))
assert s.simplify(models['original']['Fa'].subs(stat))==s.diag(0,-s.Rational(1,2))
print('Independent original-E stationary derivative and delayed-acceleration controls passed.',file=sys.stderr)
def ast(e):
    e=s.factor(e)
    if e.is_Rational:return str(e)
    if e.is_Symbol:return ['v',str(e)]
    if e.is_Add:return ['+',*[ast(x) for x in e.args]]
    if e.is_Mul:return ['*',*[ast(x) for x in e.args]]
    if e.is_Pow and e.exp.is_Integer:return ['^',ast(e.base),int(e.exp)]
    raise ValueError(e)
out={name:{key:[[ast(m[i,j]) for j in range(m.cols)] for i in range(m.rows)] for key,m in model.items()} for name,model in models.items()}
p=Path(sys.argv[1]);assert not p.exists();p.write_text(json.dumps(dict(passed=True,knownFirst=['original E stationary spatialdiag(1/4,-1/8)','delayed source accelerationdiag(0,-1/2)','independent physical H stationary derivative'],models=out),indent=2)+'\n')
