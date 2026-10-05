"""Known-first binary interval continuity and signed-chart audit."""
import hashlib,json
from pathlib import Path
import mpmath as mp
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'.local-data/ring-followup/departure/centered-independent'
mp.mp.dps=180;mp.iv.dps=125
I=mp.iv.mpf
def lo(x):return mp.mpf(x._mpi_[0])
def hi(x):return mp.mpf(x._mpi_[1])
def unpack(x):return I([mp.mpf(tuple(v)) for v in x['binary']])
def cover(rows,a,b):
 rows=sorted(rows,key=lo)
 return bool(rows) and lo(rows[0])<=lo(a) and hi(rows[-1])>=hi(b) and all(lo(y)<=hi(x) for x,y in zip(rows,rows[1:]))
def sign(x):return 1 if lo(x)>0 else -1 if hi(x)<0 else 0
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def save(name,data):
 path=OUT/(name+'.json');path.write_text(json.dumps({'instrumentSha256':sha(Path(__file__)),**data},indent=2)+'\n')
 print(json.dumps({'stage':name,'passed':data['passed'],'receiptSha256':sha(path)}),flush=True)
def known():
 assert cover([I([0,'.5']),I(['.5',1])],I(0),I(1))
 assert not cover([I([0,'.4']),I(['.6',1])],I(0),I(1))
 assert sign(I([-2,-1]))==-1 and sign(I([1,2]))==1 and sign(I([-1,1]))==0
 save('coverage-known',{'passed':True,'known':'adjacent cover accepted, gap rejected, signed and zero-crossing intervals distinguished'})
def target():
 path=OUT/'real.json';ref=ROOT/'.local-data/bp-011-t02-characteristic/certificate.json'
 data=json.loads(path.read_text());p=json.loads(ref.read_text());eps=I('.006');count=0;inactive=0
 assert data['passed'] and data['panels']==192
 for source in range(6):
  charts=[v for v in data['completeUnsquaredChart'] if v['source']==source]
  assert len(charts)==192 and cover([unpack(v['q']) for v in charts],-eps,eps)
  for c in charts:
   spans=[]
   for a in c['active']:
    spans.append(unpack(a['delay']));n=a['row']
    D=I([mp.mpf(tuple(v)) for v in p['exactIntervalBinaryBounds'][f'/rootEnclosures/{n}/D']])
    assert p['rootEnclosures'][n]['m']%6==source
    assert sign(unpack(a['delayDerivative']))==-sign(D)
    assert sign(unpack(a['leftGap']))*sign(unpack(a['rightGap']))==-1
    count+=1
   for a in c['completeInactiveComplement']:
    assert sign(unpack(a['unsquaredGap']))
    spans.append(unpack(a['delay']));inactive+=1
   assert cover(spans,I('.1'),I(3))
 assert count==8*192
 save('coverage',{'passed':True,'realReceiptSha256':sha(path),'referenceSha256':sha(ref),
  'amplitudePanelsPerSource':192,'sources':6,'ordinaryRootBoxes':count,'rootFreeBoxes':inactive,
  'exactAmplitudeEndpointsEnclosed':True,'allAdjacentAmplitudePanelsOverlap':True,
  'allDelayComplementsAndActiveBoxesCoverPoint1To3':True,'allOrdinarySignsMatchReference':True})
if __name__=='__main__':known();target()
