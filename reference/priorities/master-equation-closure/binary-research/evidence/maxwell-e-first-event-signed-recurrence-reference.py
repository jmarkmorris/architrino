"""Independent rational check of signed weighted-norm transport and closed source selection.

This is not an equation/root oracle. Those are separate frozen prerequisites.
The mathematical reference is the proved symmetric-part norm and scalar integral.
No subject module is imported and no old reference is modified.
"""
import argparse
import bisect
import hashlib
import json
from fractions import Fraction as Q
from math import isqrt
from pathlib import Path

def sqrt_bounds(x):
    x=Q(x); assert x>=0
    scale=10**40
    n=isqrt(x.numerator*scale*scale//x.denominator)
    return Q(n,scale),Q(n+1,scale)

def norm_bound(matrix):
    centre=[[sum(map(Q,(z['lo'],z['hi'])))/2 for z in row] for row in matrix]
    radius=[(Q(z['hi'])-Q(z['lo']))/2 for row in matrix for z in row]
    f=sum(z*z for row in centre for z in row)
    det=centre[0][0]*centre[1][1]-centre[0][1]*centre[1][0]
    disc=f*f-4*det*det
    assert disc>=0
    # closed singular-value formula plus Frobenius radius inequality
    _,du=sqrt_bounds(disc)
    _,su=sqrt_bounds((f+du)/2)
    _,ru=sqrt_bounds(sum(z*z for z in radius))
    return su+ru

def exponential_upper(x):
    x=Q(x); assert 0<=x<=1
    term=Q(1); total=term; phi=term
    for k in range(1,81):
        term*=x/k; total+=term; phi+=term/(k+1)
    next_term=term*x/81
    remainder=next_term/(1-x/82)
    return total+remainder,phi+remainder/82

def propagate(z,mu,f,h):
    e,p=exponential_upper(mu*h)
    return e*z+p*f*h

def selected(times,lo,hi):
    assert hi<=times[-1]
    first=max(1,bisect.bisect_left(times,lo))
    edge=bisect.bisect_left(times,hi)
    last=min(len(times)-1,edge+(times[edge]==hi))
    return list(range(first,last+1))

def known():
    box=lambda x:dict(lo=str(x),hi=str(x))
    for matrix,expected in [([[0,0],[0,0]],0),([[Q('1/2'),0],[0,Q('1/8')]],Q('1/2')),([[Q('3/10'),Q('2/5')],[0,0]],Q('1/2'))]:
        upper=norm_bound([[box(z) for z in row] for row in matrix])
        assert expected<=upper<expected+Q('1/1000000000000000000')
    e,p=exponential_upper(0);assert e==p==1
    e,p=exponential_upper(1)
    assert Q('2.7182818284590452353602874713526624977')<e<Q('2.7182818284590452353602874713526624978')
    assert Q('1.7182818284590452353602874713526624977')<p<Q('1.7182818284590452353602874713526624978')
    assert propagate(Q(2),Q(0),Q(3),Q('1/10'))==Q('23/10')
    times=list(map(Q,[0,1,2,3]));assert selected(times,Q(1),Q(1))==[1,2]
    assert selected(times,Q('9/10'),Q('11/10'))==[1,2]
    try:selected(times,Q(2),Q(4))
    except AssertionError:pass
    else:raise AssertionError('unfinished history accepted')
    return dict(passed=True,cases=['zero/rank-one/diagonal exact spectral norms','independent rational exp/phi series and remainder','nonzero constant source 23/10','closed seam and unfinished source selection'])

def analyze(path):
    result=json.loads(Path(path).read_text())
    for p,k in [('input','inputSHA'),('defects','defectSHA'),('predecessor','predecessorSHA')]:
        assert hashlib.sha256(Path(result[p]).read_bytes()).hexdigest()==result[k]
    oldpath=Path(result['predecessor']+'.jsonl')
    assert hashlib.sha256(oldpath.read_bytes()).hexdigest()==result['predecessorRowsSHA']
    predecessor=json.loads(Path(result['predecessor']).read_text())
    old=[json.loads(s) for s in oldpath.read_text().splitlines() if s]
    rows=[json.loads(s) for s in Path(path+'.jsonl').read_text().splitlines() if s]
    defects=[json.loads(s) for s in Path(result['defects']).read_text().splitlines() if s]
    assert len(old)==predecessor['bins'] and len(rows)==result['bins']
    times=[Q(0)]; errors=[dict(zip(['x','v','a'],map(Q,result['initialErrors'])))];past=list(map(Q,result['pastMismatch']))
    nu=Q('1/10');_,z=sqrt_bounds((nu*errors[0]['x'])**2+errors[0]['v']**2)
    minimum_improvement=None
    for i,row in enumerate(rows):
        end=Q(row['t']);h=end-times[-1]
        assert Q(defects[i]['left'])==times[-1] and end==min(Q(defects[i]['right']),Q(result['horizon']))
        n=Q(row['nu']);z*=max(1,n/nu);nu=n
        matrix=[[dict(lo=str((Q(a['lo'])/nu+(nu if j==k else 0))/2),hi=str((Q(a['hi'])/nu+(nu if j==k else 0))/2)) for k,a in enumerate(r)] for j,r in enumerate(row['AX'])]
        assert Q(row['mu'])>=norm_bound(matrix)
        lo,hi=Q(row['S']['lo']),Q(row['S']['hi']);bins=selected(times,lo,hi)
        assert bins==row['sourceBins']
        src=[]
        for key,k in zip(['x','v','a'],range(3)):
            values=[errors[b][key] for b in bins]
            if lo<=0:values.extend([past[k],errors[0][key]])
            assert values;src.append(max(values))
        assert src==list(map(Q,row['sourceErrors']))
        C,H,B,de=map(Q,[row[k] for k in ['Cx','Hv','B','delta']]);assert min(C,H,B,de)>=0 and de==Q(defects[i]['bound'])
        f=de+C*src[0]+H*src[1]+B*src[2];assert f==Q(row['forcing'])
        raw=propagate(z,Q(row['mu']),f,h)
        assert Q(row['rawNorm'])>=raw
        cap=None
        if i<len(old) and Q(old[i]['t'])==end:
            _,cap=sqrt_bounds((nu*Q(old[i]['x']))**2+Q(old[i]['v'])**2)
            assert row['oldCap'] is not None and Q(row['oldCap'])>=cap
        else:assert row['oldCap'] is None
        accepted=Q(row['z'])
        assert accepted>=min(raw,cap) if cap is not None else accepted>=raw
        assert Q(row['x'])>=accepted/nu and Q(row['v'])>=accepted
        acc=C*accepted/nu+f
        assert Q(row['a'])>=min(acc,Q(old[i]['a'])) if cap is not None else Q(row['a'])>=acc
        trial=Q(row['trialNorm']);improvement=trial-accepted;assert improvement>0 and improvement==Q(row['improvement'])
        minimum_improvement=improvement if minimum_improvement is None else min(minimum_improvement,improvement)
        assert Q(row['speedUpper'])<1 and Q(row['radiusLower'])>0 and Q(row['D']['lo'])>0 and Q(row['Dclock']['lo'])>0 and Q(row['R']['lo'])>0
        assert Q(row['initialSourceWindow']['lo'])>-6 and Q(row['initialSourceWindow']['hi'])<times[-1] and hi<times[-1]
        z=accepted;times.append(end);errors.append({k:Q(row[k]) for k in ['x','v','a']})
    assert times[-1]==Q(result['final']['t'])
    return dict(acceptedRecurrence=True,bins=len(rows),end=str(times[-1]),minimumStrictImprovement=str(minimum_improvement),subjectSHA=hashlib.sha256(Path(path).read_bytes()).hexdigest(),rowsSHA=hashlib.sha256(Path(path+'.jsonl').read_bytes()).hexdigest(),scope='independent signed-norm spectral/transport/closed-source/metric/strict arithmetic; complete physical field and root family remain separate premises')

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--receipt');p.add_argument('--output',required=True);args=p.parse_args()
    out=dict(knownFirst=known());print(json.dumps(out),flush=True)
    if args.receipt:out['target']=analyze(args.receipt)
    with Path(args.output).open('x') as f:json.dump(out,f,indent=2);f.write('\n')
    print(json.dumps(out),flush=True)
