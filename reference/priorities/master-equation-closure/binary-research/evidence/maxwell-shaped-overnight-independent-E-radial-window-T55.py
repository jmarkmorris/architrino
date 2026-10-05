"""Frozen E-only actual partial-prefix polar restriction on [20,55].

Imports unchanged Gaussian/norm-ball quantities from the full20..38 reference.
An independently admitted original E partial prefix is required; its failed
requested horizon remains preserved. No response or evolved history is changed.
"""
import argparse,hashlib,importlib.util,json,time
from fractions import Fraction as Q
from pathlib import Path
p=Path(__file__).with_name('maxwell-shaped-overnight-independent-radial-window-T38.py');s=importlib.util.spec_from_file_location('frozen_polar',p);old=importlib.util.module_from_spec(s);s.loader.exec_module(old);b=old.b;iv=old.iv
sha=lambda p:hashlib.sha256(Path(p).read_bytes()).hexdigest()
def clips(faces,start=Q(20),end=Q(55)):
    previous=Q(0);parts=[]
    for right in map(Q,faces):
        assert right>previous
        lo,hi=max(previous,start),min(right,end)
        if lo<hi:parts.append((lo,hi))
        previous=right
    assert previous>=end and parts[0][0]==start and parts[-1][1]==end
    for a,z in zip(parts,parts[1:]):assert a[1]==z[0]
    assert sum(hi-lo for lo,hi in parts)==end-start
    return parts
def binding(assessment,path,digest,rowsDigest,inputDigest):
    assert assessment['acceptedPrefix'] and assessment['law']=='E' and assessment['initialFace']=='0'
    assert assessment['subject']==path and assessment['subjectSHA']==digest and assessment['rowsSHA']==rowsDigest and assessment['inputSHA']==inputDigest
def known():
    prior=old.known();assert clips([21,54,56])==[(Q(20),Q(21)),(Q(21),Q(54)),(Q(54),Q(55))]
    try:clips([21,54])
    except AssertionError:pass
    else:raise AssertionError('insufficient coverage accepted')
    a=dict(acceptedPrefix=True,law='E',initialFace='0',subject='known',subjectSHA='x',rowsSHA='y',inputSHA='z');binding(a,'known','x','y','z')
    try:binding(a,'wrong','x','y','z')
    except AssertionError:pass
    else:raise AssertionError('wrong physical input accepted')
    return dict(passed=True,prior=prior,cases=['exact closed clipping20..55','incomplete target restriction rejected','assessed E input binding and wrong-case rejection'])
def analyze(path,assessmentPath):
    started=time.monotonic();tube=json.loads(Path(path).read_text());assessment=json.loads(Path(assessmentPath).read_text());rows=[json.loads(z) for z in Path(path+'.jsonl').read_text().splitlines() if z]
    binding(assessment,path,sha(path),sha(path+'.jsonl'),sha(tube['input']))
    assert tube['law']=='E' and tube['firstFailure'] is not None and len(rows)==tube['bins']==assessment['bins'] and Q(tube['final']['t'])==Q(assessment['lastCovered'])
    assert tube['inputSHA']=='187bc2739487ff983b3b095451c9b961d1fa5212d70f96a1eb4ebf7721b0a495' and tube['defectSHA']=='f1dfe60ce012fa4678fdd4a27ff871497bcc5dcf2a2a65bc306e6d4ecdd52ca1'
    expected=clips([r['t'] for r in rows]);saved=json.loads(Path(tube['input']).read_text());curve=b.Curve(saved['knots'],[0,0]);previous=Q(0);parts=[];hulls={};phase=[Q(0),Q(0)]
    for row in rows:
        right=Q(row['t']);lo,hi=max(previous,Q(20)),min(right,Q(55))
        if lo<hi:
            z=old.quantities(curve.box(lo,hi,0),curve.box(lo,hi,1),Q(row['x']),Q(row['v']));enc=b.k.encode(z)
            for k,v in enc.items():
                l,u=map(Q,[v['lo'],v['hi']]);hulls[k]=[l,u] if k not in hulls else [min(hulls[k][0],l),max(hulls[k][1],u)]
            phase[0]+=(hi-lo)*Q(enc['rate']['lo']);phase[1]+=(hi-lo)*Q(enc['rate']['hi']);parts.append(dict(left=str(lo),right=str(hi),**enc))
        previous=right
    assert [(Q(r['left']),Q(r['right'])) for r in parts]==expected
    return dict(accepted=True,law='E',start='20',end='55',cells=len(parts),tubeSHA=sha(path),rowsSHA=sha(path+'.jsonl'),inputSHA=sha(tube['input']),assessmentSHA=sha(assessmentPath),inheritedFailure=tube['firstFailure'],strictContraction=hulls['radial'][1]<0,positiveTangent=hulls['tangential'][0]>0,uniformPolar={k:dict(lo=str(z[0]),hi=str(z[1])) for k,z in hulls.items()},phaseAdvance=dict(lo=str(phase[0]),hi=str(phase[1])),parts=parts,wall_seconds=time.monotonic()-started,scope='actual original E partial-prefix polar restriction20..55 only; no terminal fate, capture or binding claim')
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--tube');p.add_argument('--assessment');p.add_argument('--output',required=True);a=p.parse_args();out=dict(known=known());print(json.dumps(out),flush=True)
    if a.tube:out['target']=analyze(a.tube,a.assessment)
    Path(a.output).write_text(json.dumps(out,indent=2)+'\n');print(json.dumps({**out,'target':{k:v for k,v in out.get('target',{}).items() if k!='parts'}}),flush=True)
