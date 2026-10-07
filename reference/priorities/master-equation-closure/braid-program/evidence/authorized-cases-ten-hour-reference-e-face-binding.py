"""Exact original-knot and accepted-seed binding for completed reference rows."""
from pathlib import Path
from fractions import Fraction as Q
import json,hashlib,sys
ROOT=Path('.local-data/master-equation-closure/braid-program')
BASE=ROOT/'authorized-cases-ten-hour/reference'
SOURCE=ROOT/'maxwell-shaped-overnight/ring-full-plus1e4-h0025.history.json'
SHA='ef83cb8910090bf4c7179ebef65986c8895bb0d693e1a50bc5099a018393e193'
PILOT=ROOT/'authorized-cases-ten-hour/e-residual-pilot-v2.json'
PSHA='bfeb9af7ba32dbac66ffed3a9ee5839d24a6cde98c62394ee9239a89c5859923'

def q(x):return Q.from_float(x) if isinstance(x,float) else Q(x)
def contains(pair,x):return Q(pair[0])<=x<=Q(pair[1])
def bind(times,pilot,rs,es):
    assert len(pilot)==3 and times[0]==0
    for k,p in enumerate(pilot):assert contains(p['left'],times[k]) and contains(p['right'],times[k+1])
    for k,r in enumerate(rs):
        assert r['segment']==k
        le,ri=times[k],min(times[k+1],Q(15));assert le<ri
        assert contains(r['row']['left'],le) and contains(r['row']['right'],ri)
    first=None;last=None
    for e in es:
        if e['kind']!='cell':continue
        row=e['row'];k=row['segment']
        if first is None:assert k==3;first=k
        else:assert k==last+1
        assert row['left']==rs[k]['row']['left'][0] and row['right']==rs[k]['row']['right'][1]
        last=k
    return times[3],last

def known():
    assert q(.1)==Q(3602879701896397,36028797018963968)
    t=list(map(Q,[0,1,2,3,4]));p=[{'left':[str(k)]*2,'right':[str(k+1)]*2} for k in range(3)]
    rs=[{'segment':k,'row':{'left':[str(k)]*2,'right':[str(k+1)]*2}} for k in range(4)];es=[{'kind':'cell','row':{'segment':3,'left':'3','right':'4'}}]
    assert bind(t,p,rs,es)==(3,3)
    bad=[{'kind':'cell','row':{'segment':3,'left':'2.9','right':'4'}}]
    try:bind(t,p,rs,bad)
    except AssertionError:pass
    else:raise AssertionError('wrong join accepted')
    out={'passed':True,'sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),'controls':['exact binary float rational','original faces and seed join','deliberately shifted first face rejected']}
    f=BASE/'e-face-binding-known-v1.json';assert not f.exists();f.write_text(json.dumps(out));print('Known binary-rational and exact-join controls passed before target.')

def readrows(p):return [json.loads(z) for z in p.read_bytes().splitlines(keepends=True) if z.endswith(b'\n')]
def target():
    assert json.loads((BASE/'e-face-binding-known-v1.json').read_text())['sha256']==hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
    assert hashlib.sha256(SOURCE.read_bytes()).hexdigest()==SHA and hashlib.sha256(PILOT.read_bytes()).hexdigest()==PSHA
    # Downstream first, to avoid requiring a later upstream cell in a live snapshot.
    es=readrows(BASE/'e-error-reference-t15-v1.rows.jsonl');rs=[z for z in readrows(BASE/'e-residual-reference-t15-v1.rows.jsonl') if z['kind']=='cell']
    data=json.loads(SOURCE.read_text());times=[q(k['t']) for k in data['members'][0]['knots']]
    for member in data['members'][1:]:assert [q(k['t']) for k in member['knots'][:len(rs)+1]]==times[:len(rs)+1]
    endpoint,last=bind(times,json.loads(PILOT.read_text())['rows'],rs,es)
    print(json.dumps({'passed':True,'seedEndpointNumerator':str(endpoint.numerator),'seedEndpointDenominator':str(endpoint.denominator),'firstComputedSegment':3 if last is not None else None,'lastComputedSegment':last,'residualFacesChecked':len(rs),'allMemberFacesAgree':True,'sourceSha256':SHA,'acceptedPilotSha256':PSHA,'scope':'exact source/seed/serialized-face binding; recurrence proof remains in frozen independent verifier'},indent=2))
if __name__=='__main__':known() if sys.argv[1]=='known' else target()
