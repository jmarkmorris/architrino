#!/usr/bin/env python
"""Known-controlled affine old-source profile bounds on frozen history."""
import importlib.util,json,hashlib
from pathlib import Path
import numpy as np
from scipy.interpolate import PPoly
from scipy.optimize import brentq
root=Path(__file__).resolve().parents[2];spec=importlib.util.spec_from_file_location('oracle',root/'scripts/collinear-research/linear-partner-fold-independent-integral.py');o=importlib.util.module_from_spec(spec);spec.loader.exec_module(o)
orbit_errors=[];eigen_errors=[]
for B in [1.1,7.6,80.,800.]:
 a=2*o.K/(B*B*(1+np.sqrt(1-4*o.K/(B*B))))
 J=np.array([[-a,-1.],[-(1-a),-2*a]])
 eigen_errors.append(float(max(abs(np.sort(np.linalg.eigvals(J))-np.sort([-1-a,1-2*a])))))
 for u in [.01,.1,.5,.9,.99]:
  xi=(1-u)/(1-a);dx=1/u-1-a*xi;du=a*(1/u-u)-(1-a)*xi/u
  orbit_errors.append(abs(dx+du/(1-a)))
 assert abs(o.K/(B*B)*(1/a+1/(1-a))-1)<1e-12
assert max(orbit_errors)<1e-11 and max(eigen_errors)<1e-12
print('KNOWN normalized exact orbit/eigenvalues passed before target',max(orbit_errors),max(eigen_errors))
def ranges(f,order,lo,hi):
 p=f.derivative(order);points=np.r_[lo,hi,p.x[(p.x>lo)&(p.x<hi)],o.roots(p.derivative(),0,lo,hi)];vals=p(points);return float(min(vals)),float(max(vals))
f=PPoly(np.array([[1.],[-1.5],[1.],[0.]]),[0.,1.]);assert ranges(f,1,0.,1.)==(.25,1.)
print('KNOWN exact cubic derivative range passed before target')
source=root/'.local-data/collinear-research/linear-postfold-continuation/resolved-h8192-q1e-06-tol1e-12-step0.01.npz';h=o.History(source);P,Q=h.clocks['P'],h.clocks['Q'];T0=float(h.t[-1]);Pu=float(P(T0));I=[Pu-1e-6,Pu+1e-6];peak=o.roots(P.derivative(),0,12.,13.)[0]
sp=[brentq(lambda s:float(Q(s))-L,0.,T0,xtol=5e-14) for L in I];ss=[brentq(lambda s:float(P(s))-L,0.,peak,xtol=5e-14) for L in I]
assert not np.any((Q.x>sp[0]) & (Q.x<sp[1])) and not np.any((P.x>ss[0]) & (P.x<ss[1]));Dp=ranges(Q,1,*sp);Ds=ranges(P,1,*ss);alpha0=o.K*(1/Dp[1]-1/Ds[0]);R0=o.K*((T0-sp[1])/Dp[1]-(T0-ss[0])/Ds[0]);assert alpha0>0 and R0>2*np.sqrt(o.K)
rec=dict(scope='measured exhaustive polynomial derivative range, floating-point arithmetic; no exact-release enclosure',cf=1,known=dict(orbit_residual=max(orbit_errors),eigen_error=max(eigen_errors),derivative_range=[.25,1.]),source_sha256=hashlib.sha256(source.read_bytes()).hexdigest(),T0=T0,clock_interval=I,each_inverse_in_single_polynomial_cell=True,partner_source_interval=sp,self_source_interval=ss,partner_derivative_range=Dp,self_derivative_range=Ds,alpha_lower=alpha0,old_acceleration_lower_at_T0=R0,threshold=2*np.sqrt(o.K),future_bound='R(T,L)>=R0+alpha_lower*(T-T0) for T>=T0, L in I',profile_curvature_bounds=dict(Q=ranges(Q,2,*sp),P=ranges(P,2,*ss)))
(root/'.local-data/collinear-research/linear-recross-fate-independent/profile-bounds.json').write_text(json.dumps(rec,indent=2)+'\n');print('TARGET',json.dumps(rec))
