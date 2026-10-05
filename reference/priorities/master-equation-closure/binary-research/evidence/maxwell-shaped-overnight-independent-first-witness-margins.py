"""Exact restrictions of already admitted receiving cells to first speed witness.

This is an inventory corollary, not a field or trajectory checker. Independent
receiving induction and Gaussian speed witness remain mandatory predecessors.
"""
import argparse, hashlib, json
from fractions import Fraction as Q
from pathlib import Path
sha=lambda p:hashlib.sha256(Path(p).read_bytes()).hexdigest()
def margins(rows, start):
    t=Q(start); bounds={k:None for k in ['work','R','D','Dclock','clearance','sourceAge','sourceCompleted','strictX','strictV']}
    for row in rows:
        l,r,h=map(Q,[row['left'],row['right'],row['dt']]); assert l==t and r-l==h and h>0
        z={k:Q(row[k]['lo']) for k in ['R','D','Dclock']}
        z.update(work=Q(row['work']['lo']), clearance=Q(row['clearance']), sourceAge=l-Q(row['source']['hi']), sourceCompleted=Q(start)-Q(row['initialSource']['hi']), strictX=Q(row['localExpansion']['x'])-Q(row['errors']['x']), strictV=Q(row['localExpansion']['v'])-Q(row['errors']['v']))
        for k,v in z.items(): bounds[k]=v if bounds[k] is None else min(bounds[k],v)
        t=r
    return dict(reached=str(t), cells=len(rows), minima={k:str(v) for k,v in bounds.items()})
def known():
    row=dict(left='2',right='3',dt='1',R=dict(lo=2),D=dict(lo='1/2'),Dclock=dict(lo='3/4'),work=dict(lo='1/4'),clearance=3,source=dict(hi=1),initialSource=dict(hi='3/2'),localExpansion=dict(x=2,v=3),errors=dict(x=1,v=1))
    z=margins([row],2); assert z['reached']=='3' and z['minima']==dict(work='1/4',R='2',D='1/2',Dclock='3/4',clearance='3',sourceAge='1',sourceCompleted='1/2',strictX='1',strictV='2')
    try:margins([dict(row,left='5/2')],2)
    except AssertionError:pass
    else:raise AssertionError('gap accepted')
    return dict(passed=True,cases=['exact positive whole-cell margins','gapped restriction rejected'])
def analyze(receiving,induction,faces):
    r=json.loads(Path(receiving).read_text()); i=json.loads(Path(induction).read_text())['target']; f=json.loads(Path(faces).read_text())['target'];digest=sha(receiving)
    assert i['acceptedInduction'] and i['receiptSHA']==digest==f['receiptSHA'] and f['passed'] and f['first'] is not None
    n=f['first']['cell']; assert 0<n<=r['acceptedCells']; rows=r['rows'][:n];out=margins(rows,r['case']['Tc']); assert out['reached']==f['first']['t']
    assert Q(f['first']['speedGap']['lo'])>0 and Q(out['minima']['work'])==Q(f['first']['minimumWork'])
    assert all(Q(v)>0 for v in out['minima'].values())
    out.update(accepted=True,ancestorSHA=digest,inductionSHA=sha(induction),facesSHA=sha(faces),speedGap=f['first']['speedGap'],scope='whole accepted restriction through first independently reconstructed strict speed witness; actual-prefix and mathematical field/domain admissions external')
    return out
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--receiving');p.add_argument('--induction');p.add_argument('--faces');p.add_argument('--output',required=True);a=p.parse_args();out=dict(known=known());print(json.dumps(out),flush=True)
    if a.receiving:out['target']=analyze(a.receiving,a.induction,a.faces)
    Path(a.output).write_text(json.dumps(out,indent=2)+'\n');print(json.dumps(out),flush=True)
