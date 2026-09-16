"""Continuous full-law residual for the population refresh through19/4.

Uses the independently checked cubic coefficient and Legendre remainder.
The first-derivative defect enclosure is valid across C2 quintic joins; reception
cells may span up to4 polynomial cells, all included in interval hulls.
Previous instruments are frozen primitives, not independent references for new claims.
"""
import argparse,importlib.util,json,time
from pathlib import Path
from fractions import Fraction as F
import numpy as np
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[3]
s=importlib.util.spec_from_file_location('frozen_population',HERE/'smooth-two-particle-population-restart-certificate.py');M=importlib.util.module_from_spec(s);s.loader.exec_module(M)
R=M.R;N=M.N;I=M.I
OUT=ROOT/'.local-data/master-equation-closure/post-restart/nineteen-population-check'
MANIFEST=ROOT/'.local-data/master-equation-closure/post-restart/approximant/population-h19-4.json'
START=F(17,4);END=F(19,4);GRID=1024
B=F(1,16);BS=F(1,400)

def rational(q):return I(q.numerator)/q.denominator

def cubic(values,coefficient):
 y=R.J([values[0],values[1],values[2]/2]);rr=R.jdot(y,y)
 return ((5/2)*(y*y*y)-(3/2)*y*rr[...,None])*coefficient


def source_values(paths,t,labels,order):
 # Cover broad initial root boxes by overlapping outward subdivisions.
 # Frozen Paths.values retains its own <=4-cell and prefix assertions.
 lo=np.maximum(t.lo,0);hi=np.maximum(t.hi,0)
 if np.max(np.minimum((hi/paths.h).astype(int),paths.n-1)-np.minimum((lo/paths.h).astype(int),paths.n-1))<=4:return paths.values(t,labels,order)
 n=max(1,int(np.ceil(np.max(t.hi-t.lo)*GRID/3)))
 if n==1:return paths.values(t,labels,order)
 left=I(t.lo);span=I(t.hi)-left;answer=None
 for k in range(n):
  aa=left+span*(I(k)/n);bb=left+span*(I(k+1)/n)
  lo=np.maximum(t.lo,aa.lo);hi=np.minimum(t.hi,bb.hi)
  current=paths.values(I(lo,hi),labels,order)
  answer=current if answer is None else [a.hull(b) for a,b in zip(answer,current)]
 return answer

def known():
 saved=M.OUT;M.OUT=OUT/'inherited-controls'
 try:M.known()
 finally:M.OUT=saved
 y=I(np.array([[[.25,0.,0.]]]));v=I(np.array([[[1.,0.,0.]]]));a=I(np.zeros((1,1,3)))
 z=cubic([y,v,a],I(14))
 for j,exact in enumerate([14/64,42/16,42/4]):
  assert z.c[j].lo[0,0,0]<=exact<=z.c[j].hi[0,0,0]
  assert np.max(z.c[j].hi-z.c[j].lo)<1e-10
  assert np.all(z.c[j].lo[0,0,1:]<=0) and np.all(z.c[j].hi[0,0,1:]>=0)
 tt=np.arange(1025)/GRID;yy=np.zeros((1025,1,3));vv=yy.copy();aa=yy.copy();yy[:,0,0]=tt*tt;vv[:,0,0]=2*tt;aa[:,0,0]=2
 pp=R.Paths(yy,vv,aa,1/GRID);wide=source_values(pp,I(np.array([[1/8]]),np.array([[9/64]])),np.array([[0]]),4)
 for j,(lo,hi) in enumerate([(1/64,81/4096),(1/4,9/32),(2,2),(0,0),(0,0)]):
  assert wide[j].lo[0,0,0]<=lo and wide[j].hi[0,0,0]>=hi
  assert max(lo-wide[j].lo[0,0,0],wide[j].hi[0,0,0]-hi)<[1e-10,1e-10,1e-8,1e-6,1/1000][j]
 print('KNOWN broad16-cell quadratic interval PASS before target',flush=True)
 # C2 join with a jump in jerk: y=2(t-1)^3 left, (t-1)^3 right.
 tt=np.arange(9)/4;f=np.where(tt<=1,2.,1.);yy=np.zeros((9,1,3));vv=yy.copy();aa=yy.copy();yy[:,0,0]=f*(tt-1)**3;vv[:,0,0]=3*f*(tt-1)**2;aa[:,0,0]=6*f*(tt-1)
 pp=R.Paths(yy,vv,aa,1/4);mid=pp.values(I(np.array([[1.]])),np.array([[0]]),3);whole=pp.values(I(np.array([[.75]]),np.array([[1.25]])),np.array([[0]]),3)
 defect=mid[2]+whole[3]*I(-.25,.25)
 assert defect.lo[0,0,0]<=-3 and defect.hi[0,0,0]>=1.5
 old_formula=mid[2]+mid[3]*I(-.25,.25);assert old_formula.lo[0,0,0]>-2
 q=F(1,256);assert F(65,2)*(27/(1-q)+15*q/(1-q)**2+2*q*(1+q)/(1-q)**3)<900
 print('KNOWN piecewiseC2 jerk jump covered by first-derivative defect; second-order shortcut rejected',flush=True)
 OUT.mkdir(parents=True,exist_ok=True);r={'result':'PASS','source_sha256':M.digest(__file__),'controls':['inherited exact causal rows, continuous polynomial residual and ordered scatter','independent exact cubic axis polynomial14(1/4+t)^3 and two Taylor derivatives','exact quadratic over a broad16-cell source interval and derivatives through4','C2 cubic join with jerk jump and exact acceleration range','rational stationary fifth-order remainder<900 on1/16']}
 (OUT/'known.json').write_text(json.dumps(r,indent=2)+'\n');print('KNOWN stationary cubic jets PASS before target',flush=True)

def residual(args):
 checked=json.loads((OUT/'known.json').read_text());assert checked['result']=='PASS'
 m=json.loads(MANIFEST.read_text());archive=Path(m['array_file']);assert M.digest(archive)==m['array_sha256'];data=dict(np.load(archive))
 assert m['g']==16 and m['c_f']==1 and F(m['horizon'])==END and F(m['source_start'])==START
 incoming_archive=Path(m['incoming_source_archive']);assert M.digest(incoming_archive)==m['incoming_source_archive_sha256'];old=dict(np.load(incoming_archive))
 om=json.loads(incoming_archive.with_suffix('.json').read_text());bounds=json.loads((ROOT/'.local-data/master-equation-closure/post-restart/cubic-population-check/polynomial-bounds.json').read_text());assert bounds['archive_sha256']==M.digest(incoming_archive) and bounds['norms'][0]<1/128
 assert END-1+B+F(1,128)<F(123,32)
 assert next(x['all'][0] for x in bounds['prefix_profiles'] if x['through']=='123/32')<float(BS)
 points=data['source_points'];env=data['environment_labels'];incoming=np.concatenate([old['source_points'],old['target_points']])
 assert len(points)==1069 and len(env)==1068 and len(incoming)==836
 assert M.bit_equal(points[:835],old['source_points']) and M.bit_equal(data['incoming_source_points'],incoming)
 for q in ['y','v','a']:
  assert M.bit_equal(data['source_'+q][:4353,:835],old['source_'+q])
  assert M.bit_equal(data['source_'+q][:,76:77],data['target_'+q]*np.array([-1.,1.,1.]))
  assert M.bit_equal(data['target_'+q][:4353],old['target_'+q])
 cuts=[F(x) for x in m['source_exact_zero_through']];incoming_cuts=[F(x) for x in om['source_exact_zero_through']]+[F(1)]
 for j,c in enumerate(cuts):
  assert c*GRID==int(c*GRID) and all(np.all(data['source_'+q][:int(c*GRID)+1,j]==0) for q in ['y','v','a'])
 ps=R.Paths(data['source_y'],data['source_v'],data['source_a'],1/GRID)
 pb=R.Paths(*[np.concatenate([old['source_'+q],old['target_'+q]],axis=1) for q in ['y','v','a']],1/GRID)
 edges=[(i,int(j)) for i,k in enumerate(env) for j in N.selected(points[k],incoming,incoming_cuts,END,B,BS)]
 er=np.array([e[0] for e in edges]);es=np.array([e[1] for e in edges]);offset=points[env[er]]-incoming[es];signs=16*R.parity(points[env[er]])*R.parity(incoming[es]);groups=M.scatter_groups(er)
 begun=time.perf_counter();profiles=M.path_norm_profiles(ps,[n*32 for n in range(136,153)]);per=profiles[ps.n];norms=np.max(per,axis=1);assert norms[0]<float(B)
 nr={'archive':str(archive),'archive_sha256':M.digest(archive),'source_points':points.tolist(),'environmental_labels':env.tolist(),'norms':norms.tolist(),'per_path_polynomial_norms':per.tolist(),'prefix_profiles':[{'through':str(F(c,GRID)),'all':np.max(v,axis=1).tolist(),'per_path_position':v[0].tolist(),'per_path_velocity':v[1].tolist()} for c,v in profiles.items()]}
 (OUT/'polynomial-bounds.json').write_text(json.dumps(nr,indent=2)+'\n');print(json.dumps({'phase':'polynomial bounds','norms':norms.tolist(),'edges':len(edges),'seconds':time.perf_counter()-begun}),flush=True)
 a_lo=rational(F(143016,10000));a_hi=rational(F(143271,10000));coefficient=I(a_lo.lo,a_hi.hi)
 remainder_factor=rational(F(16*900))
 def rhs(t,values):
  result=M.zero_rhs(len(t.lo),len(env))
  for c in M.CENTERS:
   row,_=R.row_jet(t,values,points[env]-c,lambda ss,j,d:R.vector_pulse(ss,d),np.broadcast_to(env,t.lo.shape),np.nextafter(1/314928,np.inf))
   signs_old=16*R.parity(points[env])*R.parity(c);result=[x+signs_old[None,:,None]*y for x,y in zip(result,row.c)]
  tt=I(t.lo[:,er],t.hi[:,er]);rv=[I(v.lo[:,er,:],v.hi[:,er,:]) for v in values]
  row,roots=R.row_jet(tt,rv,offset,lambda ss,j,d:source_values(pb,ss,j,d),np.broadcast_to(es,tt.lo.shape),np.nextafter(float(BS),np.inf))
  assert np.max(roots.hi)<float(START)
  M.scatter(result,row,er,signs,groups)
  stationary=cubic(values,16*coefficient)
  return [x+y for x,y in zip(result,stationary.c)],roots
 width=args.cell_steps/GRID;steps=int((END-START)*GRID/args.cell_steps);maximum=remainder_max=emission_max=0.;last=begun;worst=None;per_error=np.zeros(len(env));bins=np.zeros(16)
 for first in range(0,steps,args.batch):
  inds=np.arange(first,min(steps,first+args.batch));shape=(len(inds),len(env));labels=np.broadcast_to(env,shape);lo=float(START)+inds*width;hi=lo+width;mid=lo+width/2
  tm=I(np.broadcast_to(mid[:,None],shape));ti=I(np.broadcast_to(lo[:,None],shape),np.broadcast_to(hi[:,None],shape))
  vm=ps.values(tm,labels,3);vi=ps.values(ti,labels,3);qm,_=rhs(tm,vm);qi,roots=rhs(ti,vi)
  defect=vm[2]-qm[0]+(vi[3]-qi[1])*I(-width/2,width/2)
  rem=(remainder_factor*R.norm(vi[0])**5).hi;total=(I(R.upper_norm(defect))+I(rem)).hi
  per_error=np.maximum(per_error,np.max(total,axis=0));loc=np.unravel_index(int(np.argmax(total)),total.shape)
  if total[loc]>maximum:maximum=float(total[loc]);worst={'time':[float(ti.lo[loc]),float(ti.hi[loc])],'label':int(labels[loc])}
  for k,row in zip(inds,total):bins[int(k)//(32//args.cell_steps)]=max(bins[int(k)//(32//args.cell_steps)],float(max(row)))
  remainder_max=max(remainder_max,float(np.max(rem)));emission_max=max(emission_max,float(np.max(roots.hi)))
  if first==0 or time.perf_counter()-last>=20:
   print(json.dumps({'phase':'population residual','cells':int(inds[-1]+1),'total':steps,'maximum':maximum,'seconds':time.perf_counter()-begun}),flush=True);last=time.perf_counter()
 r={'grade':'continuous full-law population residual; source error propagation remains required','known':checked,'archive':str(archive),'archive_sha256':M.digest(archive),'incoming_archive':str(incoming_archive),'incoming_archive_sha256':M.digest(incoming_archive),'g':16,'c_f':1,'time':[str(START),str(END)],'incoming_end':str(START),'environmental_labels':env.tolist(),'source_points':points.tolist(),'incoming_source_points':incoming.tolist(),'generated_edges':edges,'exact_zero_cuts':[str(c) for c in cuts],'polynomial_norms':norms.tolist(),'per_path_polynomial_norms':per.tolist(),'tail_residual':maximum,'per_environmental_tail_residual':per_error.tolist(),'stationary_coefficient':['143016/10000','143271/10000'],'stationary_remainder_max':remainder_max,'max_emission':emission_max,'worst':worst,'cells':steps,'cell_grid_steps':args.cell_steps,'temporal_residual_bins':[{'from':str(F(136+k,32)),'through':str(F(137+k,32)),'residual':float(v)} for k,v in enumerate(bins)],'seconds':time.perf_counter()-begun}
 (OUT/'population-residual.json').write_text(json.dumps(r,indent=2)+'\n');print(json.dumps({k:r[k] for k in ['grade','time','tail_residual','stationary_remainder_max','max_emission','worst','cells','seconds']}),flush=True)
if __name__=='__main__':
 p=argparse.ArgumentParser(description=__doc__);p.add_argument('mode',choices=['known','residual']);p.add_argument('--cell-steps',type=int,default=4,choices=[1,2,4]);p.add_argument('--batch',type=int,default=8);args=p.parse_args();known() if args.mode=='known' else residual(args)
