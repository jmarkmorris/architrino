"""Independent exact-rational event predicates from reviewed cell boxes and majorants.

Conditional on the independently reviewed enclosure instrument and shared archive.
Scenario: numerical c_f=1 and g=16, unchanged supplied-pulse comparison.
Does not import the subject extractor, interval arithmetic or propagation routines.
Known controls execute before any target input. Original references remain unchanged.
"""
from pathlib import Path
from fractions import Fraction as F
from math import isqrt
import hashlib, json, sys
import numpy as np

def sha(p):
    return hashlib.sha256(Path(p).read_bytes()).hexdigest()

def rat(x):
    return F.from_float(float(x))

def radical(q):
    assert q >= 0
    d = 10**30
    r = isqrt(q.numerator*d*d//q.denominator)
    lo = F(r,d)
    return lo, lo if lo*lo == q else F(r+1,d)

def norm_box(lo, hi):
    return radical(sum(max(rat(x)**2,rat(y)**2) for x,y in zip(lo,hi)))[1]

def alpha(lo, hi, alo, ahi, ve, ae):
    dot = sum(min(rat(x)*rat(y) for x in (l,h) for y in (a,b))
              for l,h,a,b in zip(lo,hi,alo,ahi))
    return dot-rat(ve)*norm_box(alo,ahi)-rat(ae)

def safe_prefix(values):
    n = 0
    for x in values:
        if x >= 1:
            break
        n += 1
    return n

def known():
    assert radical(F(25)) == (F(5),F(5))
    lo,hi = radical(F(2)); assert lo*lo <= 2 <= hi*hi and hi-lo <= F(1,10**30)
    assert norm_box([0,0,0],[3,4,0]) == 5
    assert alpha([1,0,0],[1,0,0],[2,0,0],[2,0,0],.125,.25) == F(3,2)
    assert alpha([1,0,0],[1,0,0],[-2,0,0],[-2,0,0],0,0) < 0
    assert safe_prefix([F(1,2),F(3,2),F(1,4)]) == 1
    assert radical(F(0)) == (0,0)
    print('Known exact radicals, interval norm/product, positive/negative alpha and nonconsecutive-prefix controls PASS before target files',flush=True)

known()
if len(sys.argv) == 2 and sys.argv[1] == 'known':
    raise SystemExit(0)
assert len(sys.argv) == 3, 'target requires campaign base and new output path'
base, out = map(Path,sys.argv[1:])
archive = Path('.local-data/master-equation-closure/next-event/evolution/cross-reference/reference.npz')
assert sha(archive) == '97aa2156bae5557dd19dc7072bc973e1e2e6d33d4b60da3584fbb730172f13ac'
raw = np.load(archive); pts=raw['points']; raw_v=raw['v']; assert len(pts)==1502
targets=[next(i for i,p in enumerate(pts) if tuple(p)==q) for q in ((0,0,0),(1,0,0))]
owners=['claude-chain-0-7','claude-chain-8-15','claude-chain-16-23','claude-chain-24-30']
rows=[]; pins={str(archive):sha(archive)}; previous=None
for k in range(31):
    owner=owners[min(k//8,3)]; p=base/owner/'chain'/('cell-%02d.npz'%k)
    z=np.load(p); pins[str(p)]=sha(p)
    assert int(z['cell'])==k and np.array_equal(z['points'],pts)
    assert np.all(z['P_out']<z['tube']) and np.all(z['P_in']<=z['tube'])
    if previous is not None:
        assert np.array_equal(z['P_in'],previous[0]) and np.array_equal(z['V_in'],previous[1])
    previous=z['P_out'].copy(),z['V_out'].copy()
    speeds=[]; displacements=[]; endpoint=[]; possible=[]; alphas=[]
    for i in range(1502):
        su=norm_box(z['v_lo'][i],z['v_hi'][i])+rat(z['V_out'][i]); speeds.append(su)
        displacements.append(norm_box(z['y_lo'][i],z['y_hi'][i])+rat(z['P_out'][i]))
        ev=raw_v[(k+1)*16,i]; endpoint.append(radical(sum(rat(x)**2 for x in ev))[0]-rat(z['V_out'][i]))
        if su>=1:
            possible.append(tuple(map(int,pts[i])))
            alphas.append(alpha(z['v_lo'][i],z['v_hi'][i],z['a_lo'][i],z['a_hi'][i],z['V_out'][i],z['A_out'][i]))
    target=min(rat(z['v_lo'][i,2])-rat(z['V_out'][i]) for i in targets)
    who=max(range(1502),key=endpoint.__getitem__)
    rows.append(dict(cell=k,through=str(F(5)+F(k+1,64)),speed_upper=max(speeds),
        displacement_upper=max(displacements),target_vz_lower=target,endpoint_lower=endpoint[who],
        witness=tuple(map(int,pts[who])),possible=possible,alpha_lower=min(alphas) if alphas else None))
    print(json.dumps({'checked_cell':k,'possible':len(possible)}),flush=True)
first=next((k for k,r in enumerate(rows) if r['endpoint_lower']>1),None)
prefix=rows if first is None else rows[:first+1]
safe=safe_prefix([r['speed_upper'] for r in prefix])
union=sorted(set(q for r in prefix for q in r['possible']))
amin=min((r['alpha_lower'] for r in prefix if r['alpha_lower'] is not None),default=None)
disp=max(r['displacement_upper'] for r in prefix); vz=min(r['target_vz_lower'] for r in prefix)
result=dict(arithmetic='exact rational interval predicates with 30-digit radical brackets',
    boundary='conditional on independently reviewed whole-cell polynomial boxes and majorants, frozen raw archive and earlier accepted history; auxiliary after actual first global event',
    cells=31,receivers=1502,first_forcing_cell=first,last_consecutive_subunit_cell=safe-1,
    bracket=None if first is None else [str(F(5)+F(safe,64)),rows[first]['through']],
    witness=None if first is None else rows[first]['witness'],candidate_union=union,
    displacement_upper_exact=str(disp),target_vz_lower_exact=str(vz),alpha_lower_exact=None if amin is None else str(amin),
    endpoint_lower_exact=None if first is None else str(rows[first]['endpoint_lower']),
    separation_lower_exact=str(1-2*disp),conditions_close=first is not None and safe>0 and disp<F(7,20) and vz>0 and amin is not None and amin>0,
    rows=[{key:str(value) if isinstance(value,F) else value for key,value in r.items()} for r in rows],
    inputs=pins,reference_sha256=sha(__file__))
assert not out.exists(),'new output required; preserve earlier receipts'
out.write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps({k:v for k,v in result.items() if k not in ('rows','inputs')}),flush=True)
