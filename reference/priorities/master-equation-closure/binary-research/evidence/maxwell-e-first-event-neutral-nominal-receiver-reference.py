"""Separate exact symbolic nominal receiving-derivative identity.
Imports immutable Cartesian symbolic antecedent, never new subject.
Known static/affine/nonaligned controls recorded before generic unit-ray identity.
"""
import argparse,importlib.util,json,hashlib
from pathlib import Path
import sympy as s
p=Path(__file__).with_name('maxwell-e-first-event-neutral-coefficient-reference.py');spec=importlib.util.spec_from_file_location('immutable_coefficient_reference',p);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
def known():
    z=[0,0,0]
    for case in [([2,0,0],z,z,z,z),(['5/2',0,0],['1/5',0,0],z,z,z),(['6/5','8/5',0],['1/10','-1/5',0],['2/7','-3/11',0],['1/13','2/17',0],['-3/10','2/5',0])]:
        out=m.evaluate(case);assert out['q']['AX']==out['H']['Fu']
    return dict(passed=True,cases=['static exactdiag(-1/4,1/4)','affine nominalclock equality','nonaligned sourceA/J/U equality'])
def identity():
    # Full stereographic unit sphere chart; rational identity and continuity cover omitted pole.
    y,z=s.symbols('chart_y chart_z');d=1+y*y+z*z;n=s.Matrix([(1-y*y-z*z)/d,2*y/d,2*z/d]);mapping=dict(zip(m.n,n));diff=m.Hm['Fu']-m.Qm['AX'];entries=[s.cancel(x.subs(mapping)) for x in diff];assert entries==[0]*9
    return dict(passed=True,entries=list(map(str,entries)),scope='exact 3D unit-ray Cartesian nominalclock H_u=q_X identity; source clock R>0,D>0; omitted chart pole by rational-function continuity')
def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--out',required=True);p.add_argument('--identity',action='store_true');a=p.parse_args();out=dict(knownFirst=known(),sourceSHA=sha(__file__),immutableReferenceSHA=sha(m.__file__));print(json.dumps(out),flush=True)
    if a.identity:out['identity']=identity()
    with Path(a.out).open('x') as f:json.dump(out,f,indent=2);f.write('\n')
    print(json.dumps(out),flush=True)
