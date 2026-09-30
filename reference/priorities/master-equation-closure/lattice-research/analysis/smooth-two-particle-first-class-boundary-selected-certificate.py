"""Continuous full-law defects for two quadratic comparison paths after t=5.

The curves are auxiliaries, not a continuation of the physical histories.
Actual motion remains stopped at the original environmental class boundary.
"""
import argparse
import importlib.util
import json
import time
from fractions import Fraction as F
from pathlib import Path
import numpy as np

HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[4]
spec=importlib.util.spec_from_file_location('frozen_five',HERE/'smooth-two-particle-through-five-population-certificate.py')
C=importlib.util.module_from_spec(spec);spec.loader.exec_module(C)
P=C.P;M=C.M;R=C.R;N=C.N;I=C.I
OUT=ROOT/'.local-data/master-equation-closure/first-class-boundary/selected-check'
START=F(5);END=F(81,16);SOURCE_END=F(17,4)
B=F(3,40);BS=F(1,100)

class Quadratic:
 def __init__(self,y,v,a):self.y=y;self.v=v;self.a=a
 def values(self,t,labels,order):
  h=t-5;h=I(h.lo[...,None],h.hi[...,None]);y=I(self.y[labels]);v=I(self.v[labels]);a=I(self.a[labels])
  vals=[y+h*v+h*h*a/2,v+h*a,a,I(np.zeros_like(y.lo))]
  return vals[:order+1]

def known():
 saved=C.OUT;C.OUT=OUT/'frozen-controls'
 try:C.known()
 finally:C.OUT=saved
 q=Quadratic(np.array([[1.,2.,3.]]),np.array([[2.,4.,6.]]),np.array([[4.,8.,12.]]))
 got=q.values(I(np.array([[5.5]])),np.array([[0]]),3)
 for value,expected in zip(got,[[[2.5,5.,7.5]],[[4.,8.,12.]],[[4.,8.,12.]],[[0.,0.,0.]]]):
  assert np.all(value.lo<=expected) and np.all(value.hi>=expected)
 got=q.values(I(np.array([[5.]])),np.array([[0]]),3)
 for value,expected in zip(got[:3],[q.y,q.v,q.a]):
  assert np.all(value.lo<=expected) and np.all(value.hi>=expected)
 u=B*B
 assert F(65,2)*(6/(1-u)+2*u/(1-u)**2)<197
 assert END-1+B+BS<SOURCE_END
 assert F(2)+B+F(1,314928)<START+F(9,8)
 OUT.mkdir(parents=True,exist_ok=True)
 receipt={'result':'PASS','source_sha256':M.digest(__file__),'controls':['frozen causal-root, interval, stationary-cubic and polynomial controls','exact quadratic values and three derivatives at a known dyadic point','exact C2 endpoint match','rational stationary fifth-order constant on comparison radius3/40','rational source-prefix and exhausted old-pulse support coverage']}
 (OUT/'known.json').write_text(json.dumps(receipt,indent=2)+'\n')
 print('KNOWN selected quadratic controls PASS before target',flush=True)

def residual(args):
 known_receipt=json.loads((OUT/'known.json').read_text())
 assert known_receipt['result']=='PASS' and known_receipt['source_sha256']==M.digest(__file__)
 begun=time.perf_counter()
 manifest,archive,data=C.load_checked('population-h21-4')
 sm,incoming_archive,old=C.load_checked('population-h17-4')
 assert manifest['g']==sm['g']==16 and manifest['c_f']==sm['c_f']==1
 assert F(sm['horizon'])==SOURCE_END
 witness=int(np.flatnonzero(np.all(data['source_points']==[-1,0,0],axis=1))[0])
 points=np.array([[-1,0,0],[1,0,0]])
 vals=[np.concatenate([data['source_'+q][5120,witness:witness+1],data['target_'+q][5120]],axis=0) for q in ['y','v','a']]
 comparison=Quadratic(*vals)
 incoming=np.concatenate([old['source_points'],old['target_points']])
 pb=R.Paths(*[np.concatenate([old['source_'+q],old['target_'+q]],axis=1) for q in ['y','v','a']],1/1024)
 source_cuts=[F(c) for c in sm['source_exact_zero_through']]+[F(1)]
 old_bounds=json.loads((ROOT/'.local-data/master-equation-closure/post-restart/cubic-population-check/polynomial-bounds.json').read_text())
 assert old_bounds['archive_sha256']==M.digest(incoming_archive) and old_bounds['norms'][0]<float(BS)
 # Neither selected receiver can meet the negative-time pulse on this interval.
 assert np.max(np.sum((points[:,None,:]-M.CENTERS[None,:,:])**2,axis=2))<=4
 edges=[(i,int(j)) for i in range(2) for j in N.selected(points[i],incoming,source_cuts,END,B,BS)]
 er=np.array([e[0] for e in edges]);es=np.array([e[1] for e in edges]);offset=points[er]-incoming[es]
 signs=16*R.parity(points[er])*R.parity(incoming[es]);groups=M.scatter_groups(er)
 al=P.rational(F(143016,10000));ah=P.rational(F(143271,10000));coefficient=I(al.lo,ah.hi)
 def rhs(t,values):
  result=M.zero_rhs(len(t.lo),2)
  tt=I(t.lo[:,er],t.hi[:,er]);rv=[I(v.lo[:,er,:],v.hi[:,er,:]) for v in values]
  row,roots=R.row_jet(tt,rv,offset,lambda ss,j,d:P.source_values(pb,ss,j,d),np.broadcast_to(es,tt.lo.shape),np.nextafter(float(BS),np.inf))
  assert np.max(roots.hi)<float(SOURCE_END)
  M.scatter(result,row,er,signs,groups)
  stationary=P.cubic(values,16*coefficient)
  return [x+y for x,y in zip(result,stationary.c)],roots
 width=F(1,512);steps=int((END-START)/width);per=np.zeros(2);rows=[];emission=0.;norms=np.zeros((3,2))
 for k in range(steps):
  lo=START+k*width;hi=lo+width;mid=(lo+hi)/2;labels=np.array([[0,1]])
  tm=I(np.full((1,2),float(mid)));ti=I(np.full((1,2),float(lo)),np.full((1,2),float(hi)))
  vm=comparison.values(tm,labels,3);vi=comparison.values(ti,labels,3)
  assert np.max(R.upper_norm(vi[0]))<float(B)
  qm,_=rhs(tm,vm);qi,roots=rhs(ti,vi)
  defect=vm[2]-qm[0]+(vi[3]-qi[1])*P.rational(width/2)*I(-1,1)
  remainder=(P.rational(F(16*197))*R.norm(vi[0])**5).hi
  total=(I(R.upper_norm(defect))+I(remainder)).hi[0]
  per=np.maximum(per,total);emission=max(emission,float(np.max(roots.hi)))
  norms=np.maximum(norms,np.array([R.upper_norm(v)[0] for v in vi[:3]]))
  rows.append({'from':str(lo),'through':str(hi),'residual':total.tolist(),'remainder':remainder[0].tolist()})
  if k==0 or (k+1)%8==0:print(json.dumps({'cells':k+1,'total':steps,'residual':per.tolist(),'seconds':time.perf_counter()-begun}),flush=True)
 endpoint=comparison.values(I(np.full((1,2),float(END))),np.array([[0,1]]),2)
 receipt={'grade':'continuous full-law defect of quadratic comparison curves; physical event requires stopped comparison and independent adjudication','known':known_receipt,'source_sha256':M.digest(__file__),'archive':str(archive),'archive_sha256':M.digest(archive),'incoming_archive':str(incoming_archive),'incoming_archive_sha256':M.digest(incoming_archive),'g':16,'c_f':1,'time':[str(START),str(END)],'points':points.tolist(),'endpoint5':{q:v.tolist() for q,v in zip(['y','v','a'],vals)},'comparison_radius':str(B),'incoming_source_radius':str(BS),'incoming_end':str(SOURCE_END),'source_points':incoming.tolist(),'source_exact_zero_through':[str(c) for c in source_cuts],'generated_edges':edges,'per_receiver_residual':per.tolist(),'comparison_norms':norms.tolist(),'max_emission':emission,'endpoint_comparison_lower':[v.lo[0].tolist() for v in endpoint],'endpoint_comparison_upper':[v.hi[0].tolist() for v in endpoint],'residual_bins':rows,'seconds':time.perf_counter()-begun}
 (OUT/'selected-residual.json').write_text(json.dumps(receipt,indent=2)+'\n')
 print(json.dumps({k:receipt[k] for k in ['grade','time','per_receiver_residual','comparison_norms','max_emission','seconds']}),flush=True)

if __name__=='__main__':
 parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('mode',choices=['known','residual']);args=parser.parse_args()
 known() if args.mode=='known' else residual(args)
