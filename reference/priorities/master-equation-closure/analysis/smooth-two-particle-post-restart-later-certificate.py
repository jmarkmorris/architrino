"""Full-law target comparison through9/2 with frozen population source input."""
import argparse,importlib.util,json,time
from pathlib import Path
from fractions import Fraction as F
import numpy as np
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[3]
s=importlib.util.spec_from_file_location('frozen_new_population',HERE/'smooth-two-particle-post-restart-population-certificate.py');P=importlib.util.module_from_spec(s);s.loader.exec_module(P)
M=P.M;R=P.R;N=P.N;I=P.I;OUT=ROOT/'.local-data/master-equation-closure/post-restart/later-check'
MANIFEST=ROOT/'.local-data/master-equation-closure/post-restart/approximant/target-h9-2.json'
START=F(33,8);END=F(9,2);CUT=F(15,4);GRID=1024

def known():
 old=P.OUT;P.OUT=OUT/'inherited-controls'
 try:P.known()
 finally:P.OUT=old
 # Independent exact mixed-coordinate stationary cubic control.
 y=I(np.array([[[1.,2.,3.]]]));zero=I(np.zeros((1,1,3)));q=P.cubic([y,zero,zero],I(14));exact=np.array([[[-259.,-308.,63.]]])
 assert np.all(q.c[0].lo<=exact) and np.all(q.c[0].hi>=exact) and np.max(q.c[0].hi-q.c[0].lo)<1e-9
 for z in q.c[1:]:assert np.all(z.lo<=0) and np.all(z.hi>=0)
 OUT.mkdir(parents=True,exist_ok=True);(OUT/'known.json').write_text(json.dumps({'result':'PASS','source_sha256':M.digest(__file__),'controls':['inherited continuous source/target residual controls','exact mixed-coordinate cubic(-259,-308,63)']},indent=2)+'\n');print('KNOWN later target controls PASS before target',flush=True)

def target(args):
 checked=json.loads((OUT/'known.json').read_text());assert checked['result']=='PASS'
 m=json.loads(MANIFEST.read_text());archive=Path(m['array_file']);assert M.digest(archive)==m['array_sha256'];d=dict(np.load(archive))
 assert m['g']==16 and m['c_f']==1 and F(m['horizon'])==END and F(m['source_end'])==CUT
 source_archive=Path(m['source_archive']);assert M.digest(source_archive)==m['source_archive_sha256'];old=dict(np.load(source_archive))
 prior_archive=Path(m['prior_target_archive']);assert M.digest(prior_archive)==m['prior_target_archive_sha256'];prior=dict(np.load(prior_archive))
 points=d['source_points'];assert len(points)==675 and M.bit_equal(points,old['source_points'])
 for q in ['y','v','a']:
  assert M.bit_equal(d['source_'+q],old['source_'+q]);assert M.bit_equal(d['target_'+q][:4225],prior['target_'+q])
 cuts=[F(x) for x in m['source_exact_zero_through']]
 for j,c in enumerate(cuts):assert c*GRID==int(c*GRID) and all(np.all(d['source_'+q][:int(c*GRID)+1,j]==0) for q in ['y','v','a'])
 ps=R.Paths(d['source_y'],d['source_v'],d['source_a'],1/GRID);pt=R.Paths(d['target_y'],d['target_v'],d['target_a'],1/GRID)
 sources=N.selected(M.CENTERS[1],points,cuts,END,F(1,64),F(1,500));offset=M.CENTERS[1]-points[sources];signs=16*R.parity(M.CENTERS[1])*R.parity(points[sources]);receivers=np.zeros(len(sources),dtype=int);groups=M.scatter_groups(receivers)
 norms=N.polynomial_bounds(pt,np.array([0]));assert norms[0]<1/64
 source_norms=json.loads((P.OUT/'polynomial-bounds.json').read_text());assert source_norms['archive_sha256']==M.digest(source_archive) and source_norms['norms'][0]<1/600
 a_lo=P.rational(F(1423,100));a_hi=P.rational(F(72,5));coefficient=I(a_lo.lo,a_hi.hi);rem_factor=P.rational(16*F(7995)/(1-F(1,64))**7)
 def rhs(t,values):
  count=len(t.lo);tt=I(np.broadcast_to(t.lo,(count,len(sources))),np.broadcast_to(t.hi,(count,len(sources))));rv=[I(np.broadcast_to(v.lo,(count,len(sources),3)),np.broadcast_to(v.hi,(count,len(sources),3))) for v in values]
  row,roots=R.row_jet(tt,rv,offset,lambda ss,j,d:ps.values(ss,j,d),np.broadcast_to(sources,tt.lo.shape),np.nextafter(1/600,np.inf));assert np.max(roots.hi)<float(CUT)
  result=M.zero_rhs(count,1);M.scatter(result,row,receivers,signs,groups);stat=P.cubic(values,16*coefficient)
  return [x+y for x,y in zip(result,stat.c)],roots
 width=1/(GRID*args.subdivisions);steps=int((END-START)*GRID*args.subdivisions);begun=time.perf_counter();last=begun;maximum=rem_max=emission_max=0.;worst=None;bins={}
 for first in range(0,steps,args.batch):
  inds=np.arange(first,min(steps,first+args.batch));lo=float(START)+inds*width;hi=lo+width;mid=lo+width/2;tm=I(mid[:,None]);ti=I(lo[:,None],hi[:,None]);labels=np.zeros((len(inds),1),dtype=int)
  vm=pt.values(tm,labels,4);vi=pt.values(ti,labels,4);qm,_=rhs(tm,vm);qi,roots=rhs(ti,vi)
  defect=vm[2]-qm[0]+(vm[3]-qm[1])*I(-width/2,width/2)+(vi[4]/2-qi[2])*(I(0,width/2)**2);rem=(rem_factor*R.norm(vi[0])**5).hi;total=(I(R.upper_norm(defect))+I(rem)).hi;loc=np.unravel_index(int(np.argmax(total)),total.shape)
  if total[loc]>maximum:maximum=float(total[loc]);worst=[float(ti.lo[loc]),float(ti.hi[loc])]
  for k,val in enumerate(total[:,0]):b=int(np.floor(lo[k]*32));bins[b]=max(bins.get(b,0),float(val))
  rem_max=max(rem_max,float(np.max(rem)));emission_max=max(emission_max,float(np.max(roots.hi)))
  if first==0 or time.perf_counter()-last>=20:print(json.dumps({'phase':'later target residual','cells':int(inds[-1]+1),'total':steps,'maximum':maximum,'seconds':time.perf_counter()-begun}),flush=True);last=time.perf_counter()
 r={'grade':'continuous full-law target residual; source certification, continuation and errors remain required','known':checked,'archive':str(archive),'archive_sha256':M.digest(archive),'source_archive':str(source_archive),'source_archive_sha256':M.digest(source_archive),'g':16,'c_f':1,'time':[str(START),str(END)],'source_cut':str(CUT),'target_polynomial_norms':norms,'target_source_count':len(sources),'target_source_labels':sources.tolist(),'target_source_points':points[sources].tolist(),'tail_residual':maximum,'stationary_remainder_max':rem_max,'max_emission':emission_max,'worst':worst,'cells':steps,'subdivisions':args.subdivisions,'residual_bins':[{'start':str(F(k,32)),'end':str(F(k+1,32)),'maximum':v} for k,v in sorted(bins.items())],'seconds':time.perf_counter()-begun}
 (OUT/'target-residual.json').write_text(json.dumps(r,indent=2)+'\n');print(json.dumps({k:v for k,v in r.items() if k not in ['known','target_source_labels','target_source_points','residual_bins']}),flush=True)
if __name__=='__main__':
 p=argparse.ArgumentParser(description=__doc__);p.add_argument('mode',choices=['known','target']);p.add_argument('--subdivisions',type=int,default=4,choices=[4,8,16]);p.add_argument('--batch',type=int,default=8);args=p.parse_args();known() if args.mode=='known' else target(args)
