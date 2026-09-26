"""Full-law continuous population defect on19/4..5 from immutable histories.

This checks a comparison polynomial, not existence or actual motion by itself.
Old certificate primitives and independent references remain unchanged.
"""
import argparse
import gc
import importlib.util
import json
import time
from fractions import Fraction as F
from pathlib import Path
import numpy as np

HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[3]
spec=importlib.util.spec_from_file_location('frozen_nineteen',HERE/'smooth-two-particle-post-restart-nineteen-population-certificate.py')
P=importlib.util.module_from_spec(spec);spec.loader.exec_module(P)
M=P.M;R=P.R;N=P.N;I=P.I
OUT=ROOT/'.local-data/master-equation-closure/through-five/population-check'
DATA=ROOT/'.local-data/master-equation-closure/post-restart/approximant'
START=F(19,4);END=F(5);SOURCE_END=F(17,4);GRID=1024
B=F(1,16);BS=F(1,200)
STATIONARY_REFERENCE_SHA='175c2c941d913a11bcf177252affeb3650578c66008c5f8c0327ed56cf155cf0'
STATIONARY_REMAINDER=197

def bin_index(cell,cell_steps):
 return cell//(32//cell_steps)

def known():
 saved=P.OUT;P.OUT=OUT/'frozen-controls'
 try:P.known()
 finally:P.OUT=saved
 for h in [1,2,4]:
  assert [bin_index(k,h) for k in [0,32//h-1,32//h,256//h-1]]==[0,0,1,7]
 assert END-1+B+F(1,128)<F(131,32)
 assert END-1+B+BS<F(131,32)<SOURCE_END
 q=B*B
 assert F(65,2)*(6/(1-q)+2*q/(1-q)**2)<STATIONARY_REMAINDER
 values=np.array([[1.,4.],[3.,2.]])
 assert np.array_equal(np.max(values,axis=0),np.array([3.,4.]))
 OUT.mkdir(parents=True,exist_ok=True)
 r={'result':'PASS','source_sha256':M.digest(__file__),'controls':['frozen exact causal, polynomial, stationary-cubic and C2-join controls','exact8-bin indexing for all supported widths','rational two-stage source-prefix coverage','known ordered per-receiver maximum']}
 (OUT/'known.json').write_text(json.dumps(r,indent=2)+'\n')
 print('KNOWN through-five controls PASS before target',flush=True)

def load_checked(name):
 m=json.loads((DATA/(name+'.json')).read_text())
 path=Path(m['array_file']);assert M.digest(path)==m['array_sha256']
 return m,path,dict(np.load(path))

def residual(args):
 checked=json.loads((OUT/'known.json').read_text());assert checked['result']=='PASS'
 begun=time.perf_counter()
 manifest,archive,data=load_checked('population-h21-4')
 assert manifest['g']==16 and manifest['c_f']==1
 assert F(manifest['horizon'])==F(2571,512)>END and F(manifest['source_start'])==START
 pm,prior_archive,prior=load_checked('population-h19-4')
 assert manifest['incoming_source_archive_sha256']==pm['array_sha256']
 assert M.bit_equal(data['source_points'][:1069],prior['source_points'])
 assert M.bit_equal(data['incoming_source_points'],np.concatenate([prior['source_points'],prior['target_points']]))
 for q in ['y','v','a']:
  assert M.bit_equal(data['source_'+q][:4865,:1069],prior['source_'+q])
  assert M.bit_equal(data['target_'+q][:4865],prior['target_'+q])
 del prior;gc.collect()
 sm,incoming_archive,old=load_checked('population-h17-4')
 assert F(sm['horizon'])==SOURCE_END
 bounds=json.loads((ROOT/'.local-data/master-equation-closure/post-restart/cubic-population-check/polynomial-bounds.json').read_text())
 assert bounds['archive_sha256']==M.digest(incoming_archive) and bounds['norms'][0]<1/128
 assert END-1+B+F(1,128)<F(131,32)
 assert next(p['all'][0] for p in bounds['prefix_profiles'] if p['through']=='131/32')<float(BS)
 assert END-1+B+BS<F(131,32)<SOURCE_END
 points=data['source_points'];env=data['environment_labels']
 incoming=np.concatenate([old['source_points'],old['target_points']])
 assert len(points)==1349 and len(env)==1348 and len(incoming)==836
 assert M.bit_equal(points[:835],old['source_points'])
 for q in ['y','v','a']:
  assert M.bit_equal(data['source_'+q][:4353,:835],old['source_'+q])
  assert M.bit_equal(data['target_'+q][:4353],old['target_'+q])
  assert M.bit_equal(data['source_'+q][:,76:77],data['target_'+q]*np.array([-1.,1.,1.]))
 cuts=[F(c) for c in manifest['source_exact_zero_through']]
 source_cuts=[F(c) for c in sm['source_exact_zero_through']]+[F(1)]
 for j,c in enumerate(cuts):
  assert c*GRID==int(c*GRID)
  assert all(np.all(data['source_'+q][:int(c*GRID)+1,j]==0) for q in ['y','v','a'])
 n=int(END*GRID)+1
 ps=R.Paths(*[data['source_'+q][:n] for q in ['y','v','a']],1/GRID)
 pb=R.Paths(*[np.concatenate([old['source_'+q],old['target_'+q]],axis=1) for q in ['y','v','a']],1/GRID)
 edges=[(i,int(j)) for i,k in enumerate(env) for j in N.selected(points[k],incoming,source_cuts,END,B,BS)]
 er=np.array([e[0] for e in edges]);es=np.array([e[1] for e in edges])
 offset=points[env[er]]-incoming[es]
 signs=16*R.parity(points[env[er]])*R.parity(incoming[es]);groups=M.scatter_groups(er)
 profiles=M.path_norm_profiles(ps,[k*32 for k in range(152,161)])
 per=profiles[ps.n];norms=np.max(per,axis=1);assert norms[0]<float(B)
 nr={'archive':str(archive),'archive_sha256':M.digest(archive),'horizon':str(END),'source_points':points.tolist(),'environmental_labels':env.tolist(),'norms':norms.tolist(),'per_path_polynomial_norms':per.tolist(),'prefix_profiles':[{'through':str(F(c,GRID)),'all':np.max(v,axis=1).tolist(),'per_path_position':v[0].tolist(),'per_path_velocity':v[1].tolist(),'per_path_acceleration':v[2].tolist()} for c,v in profiles.items()]}
 (OUT/'polynomial-bounds.json').write_text(json.dumps(nr,indent=2)+'\n')
 print(json.dumps({'phase':'polynomial bounds','norms':norms.tolist(),'edges':len(edges),'seconds':time.perf_counter()-begun}),flush=True)
 al=P.rational(F(143016,10000));ah=P.rational(F(143271,10000));coefficient=I(al.lo,ah.hi)
 remainder_factor=P.rational(F(16*STATIONARY_REMAINDER))
 def rhs(t,values):
  result=M.zero_rhs(len(t.lo),len(env))
  for c in M.CENTERS:
   row,_=R.row_jet(t,values,points[env]-c,lambda ss,j,d:R.vector_pulse(ss,d),np.broadcast_to(env,t.lo.shape),np.nextafter(1/314928,np.inf))
   signs_old=16*R.parity(points[env])*R.parity(c)
   result=[x+signs_old[None,:,None]*y for x,y in zip(result,row.c)]
  tt=I(t.lo[:,er],t.hi[:,er]);rv=[I(v.lo[:,er,:],v.hi[:,er,:]) for v in values]
  row,roots=R.row_jet(tt,rv,offset,lambda ss,j,d:P.source_values(pb,ss,j,d),np.broadcast_to(es,tt.lo.shape),np.nextafter(float(BS),np.inf))
  assert np.max(roots.hi)<float(SOURCE_END)
  M.scatter(result,row,er,signs,groups)
  stationary=P.cubic(values,16*coefficient)
  return [x+y for x,y in zip(result,stationary.c)],roots
 width=args.cell_steps/GRID;steps=int((END-START)*GRID/args.cell_steps)
 maximum=remainder_max=emission_max=0.;last=time.perf_counter();worst=None
 per_error=np.zeros(len(env));bins=np.zeros(8);per_bins=np.zeros((8,len(env)))
 for first in range(0,steps,args.batch):
  inds=np.arange(first,min(steps,first+args.batch));shape=(len(inds),len(env));labels=np.broadcast_to(env,shape)
  lo=float(START)+inds*width;hi=lo+width;mid=lo+width/2
  tm=I(np.broadcast_to(mid[:,None],shape));ti=I(np.broadcast_to(lo[:,None],shape),np.broadcast_to(hi[:,None],shape))
  vm=ps.values(tm,labels,3);vi=ps.values(ti,labels,3);qm,_=rhs(tm,vm);qi,roots=rhs(ti,vi)
  defect=vm[2]-qm[0]+(vi[3]-qi[1])*I(-width/2,width/2)
  rem=(remainder_factor*R.norm(vi[0])**5).hi;total=(I(R.upper_norm(defect))+I(rem)).hi
  per_error=np.maximum(per_error,np.max(total,axis=0));loc=np.unravel_index(int(np.argmax(total)),total.shape)
  if total[loc]>maximum:
   maximum=float(total[loc]);worst={'time':[float(ti.lo[loc]),float(ti.hi[loc])],'label_index':int(labels[loc]),'point':points[int(labels[loc])].tolist()}
  for k,row in zip(inds,total):
   b=bin_index(int(k),args.cell_steps);bins[b]=max(bins[b],float(max(row)));per_bins[b]=np.maximum(per_bins[b],row)
  remainder_max=max(remainder_max,float(np.max(rem)));emission_max=max(emission_max,float(np.max(roots.hi)))
  if first==0 or time.perf_counter()-last>=20:
   print(json.dumps({'phase':'population residual','cells':int(inds[-1]+1),'total':steps,'maximum':maximum,'seconds':time.perf_counter()-begun}),flush=True);last=time.perf_counter()
  progress={'grade':'incomplete continuous residual; not an acceptance receipt','completed_cells':int(inds[-1]+1),'total_cells':steps,'maximum_so_far':maximum,'completed_bins':int(inds[-1]+1)//(32//args.cell_steps),'temporal_residual_bins':[{'from':str(START+F(k,32)),'through':str(START+F(k+1,32)),'residual':float(v),'per_environmental_residual':per_bins[k].tolist()} for k,v in enumerate(bins)]}
  (OUT/'progress.json').write_text(json.dumps(progress,indent=2)+'\n')
 r={'grade':'continuous full-law population residual; separate existence and error propagation required','known':checked,'archive':str(archive),'archive_sha256':M.digest(archive),'incoming_archive':str(incoming_archive),'incoming_archive_sha256':M.digest(incoming_archive),'preserved_prefix_archive':str(prior_archive),'g':16,'c_f':1,'time':[str(START),str(END)],'saved_horizon':manifest['horizon'],'incoming_end':str(SOURCE_END),'receiver_radius':str(B),'source_radius':str(BS),'environmental_labels':env.tolist(),'source_points':points.tolist(),'incoming_source_points':incoming.tolist(),'generated_edges':edges,'exact_zero_cuts':[str(c) for c in cuts],'polynomial_norms':norms.tolist(),'per_path_polynomial_norms':per.tolist(),'tail_residual':maximum,'per_environmental_tail_residual':per_error.tolist(),'stationary_coefficient':['143016/10000','143271/10000'],'stationary_remainder_max':remainder_max,'max_emission':emission_max,'worst':worst,'cells':steps,'cell_grid_steps':args.cell_steps,'temporal_residual_bins':progress['temporal_residual_bins'],'seconds':time.perf_counter()-begun}
 (OUT/'population-residual.json').write_text(json.dumps(r,indent=2)+'\n')
 print(json.dumps({k:r[k] for k in ['grade','time','tail_residual','stationary_remainder_max','max_emission','worst','cells','seconds']}),flush=True)

if __name__=='__main__':
 p=argparse.ArgumentParser(description=__doc__)
 p.add_argument('mode',choices=['known','residual']);p.add_argument('--cell-steps',type=int,default=4,choices=[1,2,4]);p.add_argument('--batch',type=int,default=2)
 args=p.parse_args();known() if args.mode=='known' else residual(args)
