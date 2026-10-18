"""Independent rational enclosure of low-J constants; no peer import or history.

Known controls execute before target admission. Decimal isqrt is independent
of the peer's bisection. Accepted row formulas are separately hand reviewed.
"""
import json
import sys
from fractions import Fraction as Q
from math import isqrt


def bracket(x):
    scale = 10**32
    n = isqrt(x.numerator * scale**2 // x.denominator)
    lo, hi = Q(n, scale), Q(n + 1, scale)
    assert lo**2 <= x <= hi**2
    return lo, hi


def bounds(w):
    sl, su = bracket(1-w*w)
    a = (1-w)**2/(1+w)
    b = (1+w)**3/(1-3*w)**2
    pre = b/(1-w)
    c_l, c_u = [pre*(1+(3+2*w)/s) for s in (su,sl)]
    cm_l, cm_u = [2*a*s for s in (sl,su)]
    z_l, z_u = [2*w*(1/s-1) for s in (su,sl)]
    e_l, e_u = b+w*c_l, b+w*c_u
    D_l, D_u = a-2*w*e_u/cm_l, a-2*w*e_l/cm_u
    result = dict(alpha=a,c3=b,cminus_lo=cm_l,e_up=e_u,D_lo=D_l,D_up=D_u)
    if D_l>0:
        k_u=(w*w+w*z_u)/D_l
        result.update(k_up=k_u,R_lo=cm_l/(2*w*k_u),floor_lo=cm_l/(4*w*w),
                      crosssize_up=e_u/(2*w*w),Jclosest_lo=cm_l/(2*w),
                      Rscaled_lo=cm_l*w*w/(2*k_u))
    return result


assert bracket(Q(4))[0]==2
assert bracket(Q(0))[0]==0
assert bracket(Q(1))[0]==1
assert (1-Q(1,10))**2/(1+Q(1,10))==Q(81,110)
assert (1+Q(1,10))**3/(1-3*Q(1,10))**2==Q(1331,490)
print('KNOWN FIRST: integer-root and hand coefficient controls PASS',flush=True)

rows = [
    (Q(1,10),'.19194','.052624','139.229','36.633','.1392'),
    (Q(1,20),'.74604','.0033595','5110.7','171.68','.6388'),
    (Q(1,100),'.95865','.00010433','930130','4851.7','.9301'),
    (Q(1,1000),'.99598','.0000010041','993000000','498500','.9930'),
]
records=[]
for w,dl,ku,rl,fl,rscaled in rows:
    b=bounds(w)
    checks=dict(D=b['D_lo']>=Q(dl),k=b['k_up']<=Q(ku),R=b['R_lo']>=Q(rl),
                floor=b['floor_lo']>=Q(fl),scaled=b['Rscaled_lo']>=Q(rscaled))
    assert all(checks.values()),(w,checks)
    records.append(dict(w=str(w),bounds={k:str(v) for k,v in b.items()},checks=checks))
    print('TARGET',w,checks,flush=True)
t=bounds(Q(1,10));extra={
    'old zero-size display upper':t['crosssize_up']<=Q('199.441'),
    'closest-approach lower':t['Jclosest_lo']>=Q('7.32'),
    'uniform error ratio':2*Q(1,10)*t['e_up']/t['cminus_lo']<=Q('.5445'),
    'negative at .11 by upper bound':bounds(Q(11,100))['D_up']<0,
    'positive at 8/75 by lower bound':bounds(Q(8,75))['D_lo']>0,
}
assert all(extra.values()),extra
out={'known_first':'pass','rows':records,'extra_checks':extra,
     'scope':'exact constants only; no peer code imported, no history evaluated'}
with open(sys.argv[1],'w')as f:json.dump(out,f,indent=2)
print('ALL TARGETS PASS; no crossing direction inferred from a size cap',flush=True)
