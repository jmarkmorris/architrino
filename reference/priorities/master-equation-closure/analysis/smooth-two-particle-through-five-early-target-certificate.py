"""Sharpen the unchanged target residual on13/4..15/4; no evolution."""
import importlib.util
import json
import sys
import time
from fractions import Fraction as F
from pathlib import Path
import numpy as np

HERE=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('frozen_five_subject',HERE/'smooth-two-particle-through-five-population-certificate.py')
C=importlib.util.module_from_spec(spec);spec.loader.exec_module(C)
M=C.M;R=C.R;N=C.N;I=C.I
OUT=C.ROOT/'.local-data/master-equation-closure/through-five/early-target-check'

def known():
 saved=C.OUT;C.OUT=OUT/'inherited'
 try:C.known()
 finally:C.OUT=saved
 assert F(143271,10000)+197*F(1,500)**2<15
 assert F(15,4)-1+F(1,500)+F(1,2000)<F(89,32)
 assert [k//128 for k in [0,127,128,2047]]==[0,0,1,15]
 OUT.mkdir(parents=True,exist_ok=True)
 (OUT/'known.json').write_text(json.dumps({'result':'PASS','source_sha256':M.digest(__file__),'controls':['frozen causal and C2 integral-defect controls','exact stationary norm implication','known sixteen-bin indexing']},indent=2)+'\n')
 print('KNOWN early-target controls PASS before target',flush=True)

def target():
 checked=json.loads((OUT/'known.json').read_text());assert checked['result']=='PASS' and checked['source_sha256']==M.digest(__file__)
 begun=time.perf_counter()
 manifest=json.loads(M.MANIFEST.read_text());archive=Path(manifest['array_file']);assert M.digest(archive)==manifest['array_sha256']
 assert manifest['horizon']=='13/4' and manifest['g']==16 and manifest['c_f']==1
 data=dict(np.load(archive));points=data['source_points'];cuts=list(map(F,manifest['source_exact_zero_through']))
 previous=json.loads((M.PRIOR/'later-check/both-residual.json').read_text())
 cuts[:247]=[max(a,F(b)) for a,b in zip(cuts[:247],previous['exact_zero_cuts'])]
 ps=R.Paths(*[data['source_'+q] for q in ['y','v','a']],1/1024)
 candidate=json.loads((M.PRIOR/'approximant/candidate.json').read_text());ta=Path(candidate['array_file']);assert M.digest(ta)==candidate['array_sha256']
 assert candidate['horizon']=='15/4' and candidate['source_end']=='89/32'
 td=dict(np.load(ta))
 for q in ['y','v','a']:
  assert M.bit_equal(td['target_'+q][:3329],data['target_'+q])
  assert M.bit_equal(data['source_'+q][:2849,:361],td['source_'+q])
 assert M.bit_equal(points[:361],td['source_points'])
 for j,c in enumerate(cuts):
  assert c*1024==int(c*1024)
  assert all(np.all(data['source_'+q][:int(c*1024)+1,j]==0) for q in ['y','v','a'])
 pt=R.Paths(*[td['target_'+q] for q in ['y','v','a']],1/1024)
 norms=N.polynomial_bounds(pt,np.array([0]));assert norms[0]<1/500
 pop_path=M.OUT/'population-residual.json';pop=json.loads(pop_path.read_text());assert pop['archive_sha256']==M.digest(archive)
 assert pop['prefix_bounds']['all'][0]<1/8000
 assert pop['polynomial_norms'][0]<1/2000
 assert F(15,4)-1+F(1,500)+F(1,2000)<F(89,32)
 sources=N.selected(M.CENTERS[1],points,cuts,F(15,4),F(1,64),F(1,8000))
 offsets=M.CENTERS[1]-points[sources];signs=16*R.parity(M.CENTERS[1])*R.parity(points[sources])
 receivers=np.zeros(len(sources),dtype=int);groups=M.scatter_groups(receivers)
 def rhs(t,values):
  n=len(t.lo);result=M.zero_rhs(n,1)
  tt=I(np.broadcast_to(t.lo,(n,len(sources))),np.broadcast_to(t.hi,(n,len(sources))))
  rv=[I(np.broadcast_to(v.lo,(n,len(sources),3)),np.broadcast_to(v.hi,(n,len(sources),3))) for v in values]
  row,roots=R.row_jet(tt,rv,offsets,lambda s,j,d:ps.values(s,j,d),np.broadcast_to(sources,tt.lo.shape),np.nextafter(1/8000,np.inf))
  assert np.max(roots.hi)<89/32
  M.scatter(result,row,receivers,signs,groups)
  return result,roots
 width=1/4096;bins=np.zeros(16);maximum=stationary_max=emission=0.;last=begun
 for first in range(0,2048,16):
  ix=np.arange(first,first+16);lo=13/4+ix*width;hi=lo+width;mid=lo+width/2
  tm=I(mid[:,None]);ti=I(lo[:,None],hi[:,None]);labels=np.zeros((len(ix),1),dtype=int)
  vm=pt.values(tm,labels,3);vi=pt.values(ti,labels,3);qm,_=rhs(tm,vm);qi,roots=rhs(ti,vi)
  defect=vm[2]-qm[0]+(vi[3]-qi[1])*I(-width/2,width/2)
  stationary=(240*R.norm(vi[0])**3).hi;total=(I(R.upper_norm(defect))+I(stationary)).hi
  for k,x in zip(ix,total):bins[k//128]=max(bins[k//128],float(max(x)))
  maximum=max(maximum,float(np.max(total)));stationary_max=max(stationary_max,float(np.max(stationary)));emission=max(emission,float(np.max(roots.hi)))
  if first==0 or time.perf_counter()-last>=20:
   print(json.dumps({'phase':'early target residual','cells':first+16,'total':2048,'maximum':maximum,'seconds':time.perf_counter()-begun}),flush=True);last=time.perf_counter()
 r={'grade':'continuous full-law target residual; separate propagation required','known':checked,'target_archive':str(ta),'target_archive_sha256':M.digest(ta),'source_archive':str(archive),'source_archive_sha256':M.digest(archive),'population_receipt_sha256':M.digest(pop_path),'g':16,'c_f':1,'time':['13/4','15/4'],'target_source_labels':sources.tolist(),'target_source_count':len(sources),'target_polynomial_norms':norms,'stationary_norm_coefficient':15,'stationary_reference_sha256':C.STATIONARY_REFERENCE_SHA,'stationary_max':stationary_max,'tail_residual':maximum,'max_emission':emission,'cells':2048,'cell_width':'1/4096','temporal_residual_bins':[{'from':str(F(104+k,32)),'through':str(F(105+k,32)),'residual':float(v)} for k,v in enumerate(bins)],'seconds':time.perf_counter()-begun}
 (OUT/'target-residual.json').write_text(json.dumps(r,indent=2)+'\n');print(json.dumps({k:r[k] for k in ['tail_residual','stationary_max','max_emission','cells','seconds']}),flush=True)

if __name__=='__main__':known() if sys.argv[1]=='known' else target()
