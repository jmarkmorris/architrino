"""Complete source-zero matrix regions and delayed/jump error allowances.
Application components; no trajectory claim is made by their controls.
"""
import importlib.util,json,sys
from pathlib import Path
from types import SimpleNamespace
import numpy as np
HERE=Path(__file__).resolve().parent
def load(name,file):
    sp=importlib.util.spec_from_file_location(name,HERE/file);m=importlib.util.module_from_spec(sp);sp.loader.exec_module(m);return m
ad=load('adaptive','overnight2-d-adaptive-residual.py');v=load('variation','overnight2-d-interval-variation.py')
check,p,P,PI=ad.check,ad.p,ad.P,ad.I;I=v.I

def rigid_positions(data,H,j,s):
    r,w,phi=PI(H.b['r'][j]),PI(H.b['w']),PI(H.b['phi'][j]);angle=s*w+phi
    cs=p.trig(angle,True,ad.center_trig);sn=p.trig(angle,False,ad.center_trig)
    return[(cs-ad.center_trig(phi,True))*r+data['X'][0,j,0],(sn-ad.center_trig(phi))*r+data['X'][0,j,1],P(data['X'][0,j,2])]

def continuous_positions(data,nodes,H,j,s):
    sb=s.bound()
    if sb.hi<0 or sb.lo>0:return ad.source(data,nodes,H,j,s)[0]
    if sb.hi>data['T'][-1]:raise ValueError('position composition exceeds completed reference')
    base=rigid_positions(data,H,j,s);errors=np.zeros(3)
    # The rigid extension agrees exactly with the joined negative branch.
    last=min(len(data['T'])-2,int(np.searchsorted(data['T'],sb.hi,side='left')))
    for k in range(last+1):
        left=max(0.,float(sb.lo),float(data['T'][k]));right=min(float(sb.hi),float(data['T'][k+1]))
        if left>right:continue
        t=P((PI(left)+PI(right))/2)+P.variable()*((PI(right)-PI(left))/2)
        actual,_,_=check.cell_polys(data,nodes,k,j,t);extension=rigid_positions(data,H,j,t)
        for c in range(3):errors[c]=max(errors[c],check.upper((actual[c]-extension[c]).bound()))
    return[P(z.c,z.e+PI(errors[c]))for c,z in enumerate(base)]

def geometry(data,nodes,H,Hist,k,i,j,L):
    left,right=map(float,data['T'][k:k+2]);L=PI(L);t=P((PI(left)+PI(right))/2)+P.variable()*((PI(right)-PI(left))/2)
    x,_,_=check.cell_polys(data,nodes,k,i,t);tau=check.candidate(Hist,i,j,(left+right)/2,(right-left)/2,5);s=t-tau
    xs=continuous_positions(data,nodes,H,j,s);R=[a-b for a,b in zip(x,xs)];gap=tau*tau-check.dot(R,R);tb=tau.bound()
    if not 0<=L.lo<=L.hi<1 or tb.lo<=0:raise ValueError('invalid reference root domain')
    delta=PI(check.upper(gap.bound()))/(PI(tb.lo)*(1-L))
    return dict(tb=tb,s=s.bound(),R=check.vbound(R),delta=delta,L=L,i=i,j=j)

def source_interval(g,position_radius):
    delta=g['delta']+PI(position_radius)/(1-g['L']);return g['s']+PI(-delta.hi,delta.hi)

def matrix_region(data,nodes,H,g,separation,position_radius,velocity_radius):
    L=g['L'];rp,rv=PI(position_radius),PI(velocity_radius)
    if min(rp.lo,rv.lo)<0 or (L+rv).hi>=1:raise ValueError('invalid translation/velocity region')
    delta=g['delta']+rp/(1-L);s=source_interval(g,position_radius);tau=g['tb']+PI(-delta.hi,delta.hi);floor=(PI(separation)-rp)/(1+L)
    if floor.lo<=0:raise ValueError('positive present-separation premise failed')
    tau=PI(max(float(tau.lo),float(floor.lo)),tau.hi)
    _,vv,aa,pieces=ad.fronts.source_boxes(data,ad.fronts.I(nodes.lo,nodes.hi),H,g['j'],ad.fronts.I(s.lo,s.hi))
    rr=rp+L*delta;n=(g['R']+PI(np.full(3,-rr.hi),np.full(3,rr.hi)))/tau
    z=I(np.full(3,-rv.hi),np.full(3,rv.hi));vel=I(vv.lo,vv.hi)
    B,C=v.matrices(I(tau.lo,tau.hi),I(n.lo,n.hi),vel,vel+z,I(aa.lo,aa.hi),H.pol[g['i']]*H.pol[g['j']],I(L.lo,L.hi),I(rv.lo,rv.hi))
    return B,C,dict(source_interval=s.record(),delay_interval=tau.record(),root_shift_upper=float(delta.hi),source_pieces=pieces)

def past_upper(times,envelopes,j,source_upper):
    if source_upper<0:return 0.
    if source_upper>times[-1]:raise ValueError('unadmitted source history')
    k=int(np.searchsorted(times,source_upper,side='left'))
    if k>=len(envelopes):raise ValueError('missing source envelope')
    return float(envelopes[k][j])

def comparison_jump(data,H,j):
    r,w,phi=I(H.b['r'][j]),I(H.b['w']),I(H.b['phi'][j]);cs=v.trig(phi,True);sn=v.trig(phi)
    before=v.vector([-r*w*sn,r*w*cs,I(0.)]);delta=I(data['V'][0,j])-before
    return I(float(check.norm(PI(delta.lo,delta.hi)).hi))

def jump_allowance(left,right,front_bracket,position_radius,jump_norm,delay_lower,L,Z):
    P0,J,tau,L,Z=map(I.of,[position_radius,jump_norm,delay_lower,L,Z])
    if min(float(P0.lo),float(J.lo))<0 or tau.lo<=0 or not 0<=L.lo<=L.hi<1 or Z.lo<0 or (1-L-Z).lo<=0:raise ValueError('invalid jump allowance domain')
    expand=P0/(1-L);support=I(front_bracket[0],front_bracket[1])+I(-expand.hi,expand.hi)
    a=max(left,float(support.lo));b=min(right,float(support.hi))
    overlap=I(0.)if b<=a else(I(b)-I(a)).nonnegative()
    height=J/(tau*tau*(1-L-Z)*(1-L-Z));allowance=2*height*overlap
    return I(float(allowance.hi)),dict(support=support.record(),overlap_upper=float(overlap.hi),height_upper=float(height.hi))

def controls():
    if sys.flags.optimize:raise RuntimeError('ordinary Python required')
    v.controls()
    data=dict(T=np.array([0.,1.,4.]),X=np.zeros((3,8,3)),DX=np.zeros((2,8,3)),V=np.zeros((3,8,3)),C=np.zeros((2,4,8,3)))
    data['X'][:,0,0]=2.;data['X'][:,1,0]=[0.,.25,1.];data['DX'][:,1,0]=[.25,.75];data['V'][:,1,0]=.25
    H=SimpleNamespace(b=dict(r=[0.]*8,w=0.,phi=[0.]*8),pol=np.ones(8));nodes=PI(data['X']);q=P.variable();x=continuous_positions(data,nodes,H,1,q/10)
    for a in [-1.,0.,1.]:
        exact=max(0.,a/10)/4;box=x[0].value(a)
        if not box.lo<=exact<=box.hi:raise RuntimeError('continuous birth position enclosure')
    class Known:
        T=data['T'];pol=H.pol
        def raw(self,j,t):
            if j==0:return np.array([2.,0,0]),np.zeros(3),np.zeros(3)
            return np.array([max(0.,t)/4,0,0]),np.array([.25 if t>=0 else 0.,0,0]),np.zeros(3)
    g=geometry(data,nodes,H,Known(),0,0,1,.25);B,C,m=matrix_region(data,nodes,H,g,1.,0.,0.)
    if not np.all(B.lo<=np.diag([-.25,.125,.125]))or not np.all(B.hi>=np.diag([-.25,.125,.125])):raise RuntimeError('known static B tensor region')
    j= comparison_jump(data,H,1)
    if not .25<=j.hi<.25+1e-12:raise RuntimeError('comparison trace difference')
    e=[[1.]*8,[2.]*8,[3.]*8]
    if[past_upper([0.,1.,2.],e,0,s)for s in [-1.,0.,.5,1.,1.5,2.]]!=[0.,1.,2.,2.,3.,3.]:raise RuntimeError('complete earlier-cell endpoint envelope')
    try:past_upper([0.,1.,2.],e,0,2.1)
    except ValueError:pass
    else:raise RuntimeError('future source accepted')
    a,m=jump_allowance(1.9,2.1,[2.,2.],I(.01),I(.25),I(2.),I(.25),I(0.))
    from fractions import Fraction as F
    exact=2*F(1,4)/(4*F(3,4)**2)*(2*F.from_float(.01)/F(3,4))
    if F.from_float(float(a.hi))<exact or a.hi>float(exact)+1e-12:raise RuntimeError('exact integrated jump upper allowance')
    print(json.dumps(dict(control='continuous kick position, static matrix region, comparison trace jump, complete past lookup, exact support-integral allowance',status='PASS')),flush=True)
if __name__=='__main__':controls()
