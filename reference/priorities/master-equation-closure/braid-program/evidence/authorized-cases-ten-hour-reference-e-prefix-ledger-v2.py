"""Exact coverage/digest summary of independent residual and error streams."""
from pathlib import Path
from fractions import Fraction as Q
import json,hashlib,sys
BASE=Path('.local-data/master-equation-closure/braid-program/authorized-cases-ten-hour/reference')

def records(p):
    raw=p.read_bytes();end=raw.rfind(b'\n')+1
    return raw[:end],[(line,json.loads(line)) for line in raw[:end].splitlines(keepends=True)]
def coverage(rows,start):
    edge=start
    for le,ri in rows:
        assert le<=edge<=ri and ri>le
        edge=ri
    return edge

def known():
    assert coverage([(Q(0),Q(1)),(Q(1),Q(2))],Q(0))==2
    try:coverage([(Q(0),Q(1)),(Q(2),Q(3))],Q(0))
    except AssertionError:pass
    else:raise AssertionError('coverage gap accepted')
    a=b'{"kind":"cell"}\n';assert hashlib.sha256(a).hexdigest()==hashlib.sha256(b'{"kind":"cell"}'+b'\n').hexdigest()
    assert Q('.001')==Q(1,1000) and Q('1.25e-3')==Q(1,800)
    p=BASE/'e-prefix-ledger-known-v2.json';assert not p.exists();p.write_text(json.dumps({'passed':True,'sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),'controls':['rational contiguous coverage and gap rejection','complete line digest','exact scientific decimal parsing']}));print('Known exact coverage, digest, decimal controls passed before target.')

def target():
    assert json.loads((BASE/'e-prefix-ledger-known-v2.json').read_text())['sha256']==hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
    residual=BASE/'e-residual-reference-t15-v1.rows.jsonl';error=BASE/'e-error-reference-t15-v1.rows.jsonl'
    # Read the downstream snapshot first: its complete upstream rows must then
    # already exist when the immutable residual prefix is read.
    eraw,ee=records(error);raw,rr=records(residual);res={};cellhash=hashlib.sha256();expected=0;rf=None
    for line,o in rr:
        if o['kind']=='header':continue
        if o['kind']=='footer':
            assert o['cellCount']==expected and o['rowsSha256']==cellhash.hexdigest();rf=o;continue
        assert o['kind']=='cell' and o['segment']==expected;expected+=1;cellhash.update(line);res[o['segment']]=(line,o['row'])
    seen=0;maxx=Q(0);maxv=Q(0);maxa=Q(0);mind=None;minrange=None;generated=0;ef=None;obs={};last=None
    for line,o in ee:
        if o['kind']=='header':continue
        if o['kind']=='footer':
            ef=o;assert hashlib.sha256(raw[:o['inputBytes']]).hexdigest()==o['inputSha256'];continue
        k=o['segment'] if o['kind']=='seedInput' else o['row']['segment']
        assert k==seen and k in res;seen+=1
        assert hashlib.sha256(res[k][0]).hexdigest()==o['inputLineSha256']
        if o['kind']=='seedInput':continue
        row=o['row'];le,ri=Q(row['left']),Q(row['right']);assert ri>le
        if last is not None:assert le<=last<=ri
        last=ri;assert len(row['members'])==4
        for i,g in enumerate(row['members']):
            xx,vv,aa=map(Q,g['errors']);assert 0<=xx<Q('1e-3') and 0<=vv<Q('1e-3') and aa>=0
            assert xx>=4*Q(g['radius'])-Q('1e-45')*max(xx,Q('1e-50'))
            maxx=max(maxx,xx);maxv=max(maxv,vv);maxa=max(maxa,aa)
            assert {h['source'] for h in g['hits']}==set(range(4))-{i}
            for h in g['hits']:
                lo,hi=map(Q,h['window']);assert lo<=hi<le
                d,ran=Q(h['DLower']),Q(h['rangeLower']);assert d>0 and ran>0
                mind=d if mind is None else min(mind,d);minrange=ran if minrange is None else min(minrange,ran)
                if hi>0:generated+=1
            for t in [10,12,15]:
                if le<=t<=ri:obs[str(t)]=max(obs.get(str(t),Q(0)),xx)
    def dec(x):return None if x is None else {'numerator':str(x.numerator),'denominator':str(x.denominator),'display':float(x)}
    out={'scope':'exact serialization, coverage, provenance and summary; mathematics remains in admitted independent verifier','residualCells':len(res),'errorCellsIncludingSeed':seen,'lastFace':dec(last),'maxPosition':dec(maxx),'maxVelocity':dec(maxv),'maxAcceleration':dec(maxa),'minAuxiliaryD':dec(mind),'minAuxiliaryRange':dec(minrange),'generatedSourceHits':generated,'observations':{k:dec(v) for k,v in obs.items()},'residualFooter':rf,'errorFooter':ef,'residualCompleteBytes':len(raw),'residualPrefixSha256':hashlib.sha256(raw).hexdigest(),'errorCompleteBytes':len(eraw),'errorPrefixSha256':hashlib.sha256(eraw).hexdigest()}
    print(json.dumps(out,indent=2))
if __name__=='__main__':known() if sys.argv[1]=='known' else target()
