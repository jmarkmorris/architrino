"""Independent completed-prefix assessment of a failed whole-launch attempt.
Validated v6 error/domain math is a separate premise; failure is preserved.
"""
import argparse,bisect,hashlib,json,time,datetime
from pathlib import Path
from fractions import Fraction as Q
def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def selection(times,S):
    lo,hi=Q(S['lo']),Q(S['hi']);assert hi<times[-1]
    start=max(1,bisect.bisect_left(times,lo));end=min(len(times)-1,bisect.bisect_right(times,hi))
    return list(range(start,end+1))
def known():
    t=list(map(Q,[0,1,2,3]));assert selection(t,dict(lo='1',hi='1'))==[1,2]
    assert selection(t,dict(lo='1.1',hi='1.9'))==[2] and selection(t,dict(lo='-.2',hi='-.1'))==[]
    # Coefficient root window is contained in the earlier proposed inventory;
    # the retained proposed inventory can contain strictly more source bins.
    assert set(selection(t,dict(lo='1.1',hi='1.9'))) < set(selection(t,dict(lo='.9',hi='2.1')))
    try:selection(t,dict(lo='2',hi='3'))
    except AssertionError:pass
    else:raise AssertionError('source ahead accepted')
    assert hashlib.sha256(b'abc').hexdigest()=='ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'
    return dict(passed=True,cases=['closed source knot both bins','interior source bin','negative past','source ahead rejected','known SHA abc'])
def analyze(path):
    r=json.loads(Path(path).read_text());assert r['firstFailure'] is not None and not r.get('completedPrefix')
    assert sha(r['input'])==r['inputSHA'] and sha(r['defects'])==r['defectSHA']
    cells=list(map(json.loads,Path(r['defects']).read_text().splitlines()));rows=list(map(json.loads,Path(path+'.jsonl').read_text().splitlines()));assert len(rows)==r['bins']
    times=[Q(0)];acc=[Q(r['initialErrors'][2])];x,v=map(Q,r['initialErrors'][:2]);prefix=acc[0];started=time.monotonic();last=started
    for j,row in enumerate(rows):
        c=cells[j];assert Q(c['left'])==times[-1] and Q(c['right'])==Q(row['t']) and Q(c['bound'])==Q(row['delta'])
        S,W=row['S'],row['initialSourceWindow'];assert Q(W['lo'])>-6 and Q(W['hi'])<times[-1] and Q(W['lo'])<=Q(S['lo'])<=Q(S['hi'])<=Q(W['hi'])
        bins=selection(times,S);assert row['sourceBins']==bins and row['sourceIndex']==(bins[-1] if bins else -1)
        initial=selection(times,W);assert set(initial)<=set(row['initialSourceBins']) and set(bins)<=set(initial)
        assert all(1<=k<len(times) for k in row['initialSourceBins'])
        values=[acc[k] for k in bins]
        if Q(S['lo'])<=0:values.extend([Q(r['pastMismatch'][2]),Q(r['initialErrors'][2])])
        assert values and Q(row['sourceAccelerationError'])==max(values)
        assert Q(row['x'])>=x and Q(row['v'])>=v and Q(row['a'])>=0 and Q(row['prefixA'])>=max(prefix,Q(row['a']))
        assert Q(row['D']['lo'])>0 and Q(row['R']['lo'])>0 and Q(row['radiusLower'])>0 and Q(row['speedUpper'])<1
        times.append(Q(row['t']));acc.append(Q(row['a']));x,v,prefix=map(Q,[row['x'],row['v'],row['prefixA']])
        if time.monotonic()-last>=30:print(json.dumps(dict(heartbeat=datetime.datetime.now(datetime.timezone.utc).isoformat(),bins=j+1)),flush=True);last=time.monotonic()
    assert times[-1]==Q(r['final']['t'])==Q(r['firstFailure']['lastCompleted']) and times[-1]<Q(r['horizon'])
    for key in ['t','x','v','a','prefixA']:assert Q(rows[-1][key])==Q(r['final'][key])
    return dict(acceptedPrefix=True,law=r['law'],subject=path,subjectSHA=sha(path),rowsSHA=sha(path+'.jsonl'),inputSHA=r['inputSHA'],lastCovered=str(times[-1]),initialFace='0',bins=len(rows),inheritedFailure=r['firstFailure'],requestedHorizon=r['horizon'],mathPremise='independently assessed v6 original-past/root/error/whole-bin kernel; completed exact same-curve defect composition assessed separately',scope='derived actual complete-prefix enclosure only; failed requested horizon and no physical event preserved',wall_seconds=time.monotonic()-started)
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--receipt');p.add_argument('--output',required=True);a=p.parse_args();r=dict(known=known());print(json.dumps(r),flush=True)
    if a.receipt:r.update(analyze(a.receipt))
    Path(a.output).write_text(json.dumps(r,indent=2)+'\n');print(json.dumps({k:v for k,v in r.items() if k!='inheritedFailure'}),flush=True)
