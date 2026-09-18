"""Full-law target residual after15/4, with the unchanged stationary block sum."""
import argparse,importlib.util,json,time
from pathlib import Path
from fractions import Fraction as F
import numpy as np
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[3]
s=importlib.util.spec_from_file_location('frozen_population',HERE/'smooth-two-particle-population-restart-certificate.py');M=importlib.util.module_from_spec(s);s.loader.exec_module(M)
R=M.R;N=M.N;I=M.I
OUT=ROOT/'.local-data/master-equation-closure/post-restart/check'
MANIFEST=ROOT/'.local-data/master-equation-closure/post-restart/approximant/candidate.json'
GRID=1024;START=F(15,4);END=F(33,8)

def known():
 old=M.OUT;M.OUT=OUT/'inherited-controls'
 try:M.known()
 finally:M.OUT=old
 # The stationary scalar majorant is checked against the exact nearest-source cubic norm.
 y=I(np.array([[[1/1024,0.,0.]]]))
 majorant=400*R.norm(y)**3
 exact=224/1024**3
 assert float(majorant.lo[0,0])>exact
 OUT.mkdir(parents=True,exist_ok=True)
 r={'result':'PASS','source_sha256':M.digest(__file__),'controls':['frozen exact row, polynomial, scatter and continuous-Taylor controls','stationary majorant includes nearest-source cubic on coordinate axis'],'inherited':json.loads((OUT/'inherited-controls/known.json').read_text())}
 (OUT/'known.json').write_text(json.dumps(r,indent=2)+'\n');print('KNOWN controls PASS before target',flush=True)

def target(args):
 checked=json.loads((OUT/'known.json').read_text());assert checked['result']=='PASS'
 m=json.loads(MANIFEST.read_text());archive=Path(m['array_file']);assert M.digest(archive)==m['array_sha256']
 assert m['g']==16 and m['c_f']==1 and F(m['horizon'])==END and F(m['source_end'])==F(13,4)
 d=np.load(archive);source_archive=Path(m['source_archive']);assert M.digest(source_archive)==m['source_archive_sha256'];old=np.load(source_archive)
 prior_archive=Path(m['prior_target_archive']);assert M.digest(prior_archive)==m['prior_target_archive_sha256'];prior=np.load(prior_archive)
 points=d['source_points'];assert len(points)==505 and M.bit_equal(points,old['source_points'])
 for q in ['y','v','a']:
  assert M.bit_equal(d['source_'+q],old['source_'+q])
  assert M.bit_equal(d['target_'+q][:3841],prior['target_'+q])
 ps=R.Paths(d['source_y'],d['source_v'],d['source_a'],1/GRID);pt=R.Paths(d['target_y'],d['target_v'],d['target_a'],1/GRID)
 cuts=[F(x) for x in m['source_exact_zero_through']]
 for j,cut in enumerate(cuts):
  assert cut*GRID==int(cut*GRID)
  assert all(np.all(d['source_'+q][:int(cut*GRID)+1,j]==0) for q in ['y','v','a'])
 # Numerical exact-zero prefixes only exclude residual rows; actual completeness is a separate theorem.
 sources=N.selected(M.CENTERS[1],points,cuts,END,F(1,64),F(1,2000))
 target_norms=N.polynomial_bounds(pt,np.array([0]));assert target_norms[0]<1/250
 assert F(33,8)-1+F(1,250)+F(1,2000)<F(13,4)
 offsets=M.CENTERS[1]-points[sources];signs=16*R.parity(M.CENTERS[1])*R.parity(points[sources]);receivers=np.zeros(len(sources),dtype=int);groups=M.scatter_groups(receivers)
 def rhs(t,values):
  count=len(t.lo);tt=I(np.broadcast_to(t.lo,(count,len(sources))),np.broadcast_to(t.hi,(count,len(sources))))
  rv=[I(np.broadcast_to(v.lo,(count,len(sources),3)),np.broadcast_to(v.hi,(count,len(sources),3))) for v in values]
  row,roots=R.row_jet(tt,rv,offsets,lambda s,j,d:ps.values(s,j,d),np.broadcast_to(sources,tt.lo.shape),np.nextafter(1/2000,np.inf))
  assert np.max(roots.hi)<13/4
  result=M.zero_rhs(count,1);M.scatter(result,row,receivers,signs,groups)
  return result,roots
 begun=time.perf_counter();last=begun;width=1/(GRID*args.subdivisions);steps=int((END-START)*GRID*args.subdivisions)
 maximum=stationary_max=emission_max=0.;worst=None;bins={}
 for first in range(0,steps,args.batch):
  indices=np.arange(first,min(steps,first+args.batch));lo=float(START)+indices*width;hi=lo+width;mid=lo+width/2
  tm=I(mid[:,None]);ti=I(lo[:,None],hi[:,None]);labels=np.zeros((len(indices),1),dtype=int)
  vm=pt.values(tm,labels,4);vi=pt.values(ti,labels,4);qm,_=rhs(tm,vm);qi,roots=rhs(ti,vi)
  defect=vm[2]-qm[0]+(vm[3]-qm[1])*I(-width/2,width/2)+(vi[4]/2-qi[2])*(I(0,width/2)**2)
  stationary=(400*R.norm(vi[0])**3).hi;total=(I(R.upper_norm(defect))+I(stationary)).hi
  loc=np.unravel_index(int(np.argmax(total)),total.shape)
  if total[loc]>maximum:maximum=float(total[loc]);worst=[float(ti.lo[loc]),float(ti.hi[loc])]
  for k,value in enumerate(total[:,0]):
   b=int(np.floor(lo[k]*32));bins[b]=max(bins.get(b,0.),float(value))
  stationary_max=max(stationary_max,float(np.max(stationary)));emission_max=max(emission_max,float(np.max(roots.hi)))
  if first==0 or time.perf_counter()-last>=20:
   print(json.dumps({'phase':'target residual','cells':int(indices[-1]+1),'total':steps,'maximum':maximum,'seconds':time.perf_counter()-begun}),flush=True);last=time.perf_counter()
 report={'grade':'continuous full-law residual; actual continuation and state errors are separate obligations','known':checked,'archive':str(archive),'archive_sha256':M.digest(archive),'source_archive':str(source_archive),'source_archive_sha256':M.digest(source_archive),'g':16,'c_f':1,'time':[str(START),str(END)],'source_cut':'13/4','target_source_count':len(sources),'target_source_labels':sources.tolist(),'target_source_points':points[sources].tolist(),'target_polynomial_norms':target_norms,'tail_residual':maximum,'stationary_max':stationary_max,'max_emission':emission_max,'worst':worst,'cells':steps,'subdivisions':args.subdivisions,'residual_bins':[{'start':str(F(k,32)),'end':str(F(k+1,32)),'maximum':v} for k,v in sorted(bins.items())],'seconds':time.perf_counter()-begun}
 (OUT/'target-residual.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps({k:v for k,v in report.items() if k not in ['known','target_source_labels','target_source_points','residual_bins']}),flush=True)

if __name__=='__main__':
 p=argparse.ArgumentParser(description=__doc__);p.add_argument('mode',choices=['known','target']);p.add_argument('--subdivisions',type=int,default=4,choices=[4,8,16]);p.add_argument('--batch',type=int,default=8);a=p.parse_args();known() if a.mode=='known' else target(a)
