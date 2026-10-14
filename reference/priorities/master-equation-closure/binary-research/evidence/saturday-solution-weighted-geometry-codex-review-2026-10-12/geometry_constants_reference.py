"""Independent rational arithmetic for the radial geometry review.
No peer code, no trajectories. Known cases print before target evaluations.
"""
from fractions import Fraction as F
from pathlib import Path
import json

def q(x): return F(str(x))
def constants(w,s):
    c1=(1+w)**2/(1-w)
    c2=(3*w+w**3)/(1-w*w)
    c3=(1+w)**3/(1-3*w)**2
    cm=2*(1-w)**2*s/(1+w)
    cp=2*c1
    km=(1+w)**2/(2*(1-w)*s)
    ks=1/(4*s**3)
    curved=(1+w)**3/((1-w)*(1-3*w)**2)*(1+(3+2*w)/s)
    return cm,cp,c1,c2,c3,km,ks,c3+w*curved,w*c3/s

assert constants(F(0),F(1))==(F(2),F(2),F(1),F(0),F(1),F(1,2),F(1,4),F(1),F(0))
# Kinematic circular control: r=2,J=2,A=J^2/r^3=1/2,
# r*A/J=J/r^2=1/2; every derivative correction vanishes.
assert F(2)*F(1,2)/F(2)==F(2)/F(2)**2==F(1,2)
print('KNOWN FIRST: zero-speed coefficient limit and exact circular kinematic identity PASS',flush=True)
w=F(1,10); slo=q('.994987'); shi=q('.994988')
assert slo*slo<1-w*w<shi*shi
cm,cp,c1,c2,c3,km,ks,e1,e2=constants(w,slo)
claims={
 'c_minus>=1.4653':cm>=q('1.4653'),
 'inverse_c_minus<=.6825':1/cm<=q('.6825'),
 'c_plus<=2.6889':cp<=q('2.6889'),
 'separation>=36.63':cm/(4*w*w)>=q('36.63'),
 'J_at_closest>=7.326':cm/(2*w)>=q('7.326'),
 'c1<=1.3445':c1<=q('1.3445'),
 '2wc2<=.06081':2*w*c2<=q('.06081'),
 'c3<=2.7164':c3<=q('2.7164'),
 'wc_plus<=.2689':w*cp<=q('.2689'),
 '4w2km<=.02703':4*w*w*km<=q('.02703'),
 '4w2ks<=.01016':4*w*w*ks<=q('.01016'),
 'e1<=3.989':e1<=q('3.989'),
 'e2<=.2731':e2<=q('.2731'),
 'loss_fraction<=.01845':4*w*w*km/cm<=q('.01845'),
 'rounded constant<=.04070':q('.02703')+q('.01016')*q('1.3445')<=q('.04070'),
 'rounded X coefficient<=.000618':q('.01016')*q('.06081')<=q('.000618'),
 'rounded inverseJ coefficient<=.0276':q('.01016')*q('2.7164')<=q('.0276'),
 'constant_r X<=826.2':q('826.2')**2*q('1.4653')>=10**6,
}
J=q('7.32'); X=q('826.2')
lhs=q('.6825')*(q('.04070')+q('.000618')*X+q('.0276')/J)
rhs=1-q('3.989')/J-q('.2731')/(J*J)
claims['constant_r upper<=.379']=lhs<=q('.379')
claims['constant_r lower>=.449']=rhs>=q('.449')
claims['constant_r strict contradiction']=lhs<rhs
# Safe orientation cutoff for the displayed sufficient test, retaining all
# nonnegative discarded terms; rho>=62 makes even its lower envelope >1.
base=q('.6825')*q('.04070')
slope=base*q('.2')+q('.01016')
claims['displayed sufficient test impossible for rho>=62']=base+slope*62>1
assert all(claims.values()),claims
res={'known_first':'pass','claims':claims,'constant_separation_lhs_upper':str(lhs),'constant_separation_rhs_lower':str(rhs),'decimal_orientation_lhs':float(lhs),'decimal_orientation_rhs':float(rhs),'displayed_test_lower_envelope':{'base':str(base),'slope':str(slope),'at_60':str(base+slope*60),'at_62':str(base+slope*62)},'limits':'Exact algebra with a proved rational sqrt enclosure; no source/path census, history evaluation or general periodicity claim'}
out=Path('.local-data/aaa-work-threads/saturday-evolved-history-2026-10-12/codex-binary-review');out.mkdir(parents=True,exist_ok=True)
(out/'independent-arithmetic.json').write_text(json.dumps(res,indent=2)+'\n')
print(json.dumps(res,indent=2))
