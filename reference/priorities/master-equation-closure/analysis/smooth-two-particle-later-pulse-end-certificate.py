"""Append and certify the right-target polynomial through the later pulse ends.

The frozen prefix, source histories and interval primitives are unchanged.
New nodes only propose a path; its residual includes the full stationary field.
"""
import argparse
from fractions import Fraction as F
import hashlib
import importlib.util
import json
import math
from pathlib import Path
import time

import numpy as np
from scipy.integrate import solve_ivp

HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[3]
OLD=ROOT/'.local-data/master-equation-closure/later-certification'
OUT=ROOT/'.local-data/master-equation-closure/later-pulse-ends'
H=F(259,128)
GRID=1024
SUB=8
TAIL_START=2*GRID


def digest(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()


def load_module(name,path):
    spec=importlib.util.spec_from_file_location(name,path)
    mod=importlib.util.module_from_spec(spec);spec.loader.exec_module(mod)
    return mod


def dependencies():
    residual=json.loads((OLD/'check/certified-full-s8.json').read_text())
    archive=Path(residual['input'])
    assert digest(archive)==residual['input_sha256']
    assert residual['sources']['labels']==list(range(76)) and residual['target']['labels']==[1]
    assert F.from_float(residual['sources']['max_euclidean_residual'])<F(1,10**10)
    assert F.from_float(residual['target']['max_euclidean_residual'])<F(1,10**9)
    rp=HERE/'smooth-two-particle-later-residual.py'
    ap=HERE/'smooth-two-particle-later-approximant.py'
    manifest=json.loads((OLD/'approx/approximant-h1024.json').read_text())
    assert manifest['array_sha256']==digest(archive)
    R=load_module('accepted_residual',rp)
    A=load_module('accepted_approximant',ap)
    N=A.imported()
    return R,A,N,residual,archive


def selected(r2,first_m,horizon):
    cuts={2:F(1,32),3:F(11,32),4:F(39,64),5:F(27,32)}
    radius=F(1,100000)+F(1,60000)
    return np.array([j for j,(r,m) in enumerate(zip(r2,first_m))
                     if r>0 and F(int(r))<(horizon+radius-cuts[int(m)])**2],dtype=int)


def source_history(A,coeff,h,s,idx):
    assert np.all(np.isfinite(s)) and np.max(s)<=33/32
    active=s>0;ss=np.maximum(s,0)
    cell=np.minimum((ss/h).astype(int),len(coeff[0])-1)
    u=ss/h-cell
    return tuple(A.poly(coeff[:,cell,idx],u,h,k)*active[:,None] for k in range(2))


def known():
    R,A,N,receipt,archive=dependencies()
    # Exact rational join identities, with an arbitrary nonzero shared node.
    h=F(1,1024)
    triples=[F(1,3),F(-2,7),F(5,11),F(7,9),F(2,13),F(-3,17)]
    c=A.exact_coeff(*triples,h)
    assert [A.exact_eval(c,F(1),h,k) for k in range(3)]==triples[3:]
    d=A.exact_coeff(*(triples[3:]+[F(0),F(1),F(2)]),h)
    assert [A.exact_eval(d,F(0),h,k) for k in range(3)]==triples[3:]
    # Numerical proposal evaluator, checked on exact dyadic q(t)=t^5+t^2.
    t=np.arange(1057)/1024
    y=np.zeros((1057,1,3));v=y.copy();a=y.copy()
    y[:,0,2]=t**5+t*t;v[:,0,2]=5*t**4+2*t;a[:,0,2]=20*t**3+2
    cc=A.coeff_arrays(y,v,a,float(h))
    s=np.array([1/32,5/16,33/32]);idx=np.zeros(3,dtype=int)
    py,pv=source_history(A,cc,float(h),s,idx)
    assert np.max(abs(py[:,2]-(s**5+s*s)))<1e-14
    assert np.max(abs(pv[:,2]-(5*s**4+2*s)))<1e-14
    assert np.array_equal(source_history(A,cc,float(h),np.array([-1.,0.]),np.zeros(2,dtype=int))[0],np.zeros((2,3)))
    # A unit-neighbor row can enter, a distance-two row is still excluded.
    assert np.array_equal(selected([1,4],[2,2],H),[0])
    # Interval quadratic derivative and centered residual control from the
    # accepted primitive; all target-specific data use follows this pass.
    I=R.I
    tau=I(2,2+1/1024)
    quadratic=2*tau-tau*tau
    assert quadratic.lo<=0 and quadratic.hi>=-2/1024-1/1024**2
    # Common-history velocity integration: v=-3t gives exact drop.
    left,right=F(2),H
    exact=3*(right*right-left*left)/2
    bounded=I(3)*I(float(left),float(right))*float(right-left)
    assert F.from_float(float(bounded.lo))<=exact<=F.from_float(float(bounded.hi))
    OUT.mkdir(parents=True,exist_ok=True)
    result={'result':'PASS','source_sha256':digest(__file__),
            'controls':['exact rational C2 append join','known dyadic quintic source evaluation and zero past','exact causal inactivity selection','interval quadratic enclosure','known integrated linear velocity'],
            'inherited_residual_source_sha256':receipt['known']['source_sha256'],
            'inherited_archive_sha256':digest(archive)}
    (OUT/'known.json').write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps(result),flush=True)


def target():
    checked=json.loads((OUT/'known.json').read_text())
    assert checked['result']=='PASS'
    R,A,N,prior,archive=dependencies();I=R.I
    assert checked['inherited_archive_sha256']==digest(archive)
    begun=time.perf_counter();data=np.load(archive);h=1/GRID;end=float(H)
    sources=data['source_points'];offset=np.array([1,0,0])-sources
    r2=np.sum(offset*offset,axis=1)
    d2=np.sum((sources[:,None,:]-np.array([[0,0,0],[1,0,0]])[None,:,:])**2,axis=-1)
    first_m=np.min(np.where(d2>=2,d2,100000),axis=1)
    js=selected(r2,first_m,H)
    assert len(js)==21 and np.array_equal(js,selected(r2,first_m,F(2)))
    signs=16*N.polarity(np.array([1,0,0]))*N.polarity(sources[js])
    sc=A.coeff_arrays(data['source_y'],data['source_v'],data['source_a'],h)
    def history(s,j):return source_history(A,sc,h,s,j)
    def acceleration(t,y):
        R0=offset[js]+y
        s=t-np.linalg.norm(R0,axis=-1)
        for _ in range(4):
            P,V=history(s,js);Rv=R0-P;rad=np.linalg.norm(Rv,axis=-1)
            s-=(s+rad-t)/(1-np.sum(Rv*V,axis=-1)/rad)
        P,V=history(s,js)
        return np.sum(signs[:,None]*N.delta_row(R0,P,V),axis=0)
    initial=np.concatenate([data['receiver_y'][-1,1],data['receiver_v'][-1,1]])
    def rhs(t,state):return np.concatenate([state[3:],acceleration(t,state[:3])])
    solution=solve_ivp(rhs,(2,end),initial,method='DOP853',atol=1e-20,rtol=3e-13,max_step=h/2,dense_output=True)
    assert solution.success
    times=np.arange(TAIL_START,int(H*GRID)+1)/GRID
    values=solution.sol(times).T
    nodes={}
    for name,col in [('y',slice(0,3)),('v',slice(3,6))]:
        old=data['receiver_'+name][:,1:2,:]
        nodes[name]=np.concatenate([old,values[1:,col][:,None,:]])
    acc=np.array([acceleration(t,y) for t,y in zip(times[1:],values[1:,:3])])[:,None,:]
    nodes['a']=np.concatenate([data['receiver_a'][:,1:2,:],acc])
    for name,array in nodes.items():
        assert array.shape==(int(H*GRID)+1,1,3) and array.dtype==np.float64 and np.all(np.isfinite(array))
        assert np.array_equal(array[:TAIL_START+1],data['receiver_'+name][:,1:2,:])
    npz=OUT/'target-approximant.npz'
    np.savez_compressed(npz,**nodes)
    P=R.Paths(nodes['y'],nodes['v'],nodes['a'],h)
    S=R.Paths(data['source_y'],data['source_v'],data['source_a'],h)
    cells=np.arange(TAIL_START,int(H*GRID));labels=np.zeros(len(cells),dtype=int)
    tube=P.cell(cells,labels,I(np.zeros(len(cells)),np.ones(len(cells))),4)
    bounds=[float(np.max(R.upper_norm(v))) for v in tube]
    assert F.from_float(bounds[0])<F(9,10**6)
    def rhs_jet(t,vals):
        shape=t.lo.shape+(len(js),)
        tt=I(np.broadcast_to(t.lo[...,None],shape),np.broadcast_to(t.hi[...,None],shape))
        vv=[I(np.broadcast_to(v.lo[...,None,:],shape+(3,)),np.broadcast_to(v.hi[...,None,:],shape+(3,))) for v in vals]
        jj=np.broadcast_to(js,shape)
        q,roots=R.row_jet(tt,vv,offset[js],lambda s,j,d:S.values(s,j,d),jj,np.nextafter(1/60000,np.inf))
        rows=[]
        for jet in q.c:
            value=I(np.zeros_like(vals[0].lo))
            for j in range(len(js)):value+=signs[j]*jet[...,j,:]
            rows.append(value)
        return rows,roots
    width=h/SUB;count=round((end-2)/width)
    max_res=max_stationary=0.;worst=None;max_emission=0.
    for start in range(0,count,32):
        k=np.arange(start,min(count,start+32))
        tm=2+(k+.5)*width
        mid=I(tm);cell=I(2+k*width,2+(k+1)*width);lab=np.zeros(len(k),dtype=int)
        vm=P.values(mid,lab,4);vi=P.values(cell,lab,4)
        qm,_=rhs_jet(mid,vm);qi,roots=rhs_jet(cell,vi)
        defect=vm[2]-qm[0]+(vm[3]-qm[1])*I(-width/2,width/2)+(vi[4]/2-qi[2])*(I(0,width/2)**2)
        stationary=(22400*R.norm(vi[0])**3).hi
        total=(I(R.upper_norm(defect))+I(stationary)).hi
        loc=int(np.argmax(total))
        if total[loc]>max_res:max_res=float(total[loc]);worst=[float(cell.lo[loc]),float(cell.hi[loc])]
        max_stationary=max(max_stationary,float(np.max(stationary)))
        max_emission=max(max_emission,float(np.max(roots.hi)))
    assert F.from_float(max_res)<F(1,10**9)
    # With the extended propagation theorem's unchanged sufficient budgets,
    # prove every tail cell's actual velocity sign and endpoint enclosure.
    ep=I(6)/10**8;ev=I(12)/10**8;ea=I(2)/10**7
    vertical_velocity=I(np.min(tube[1].lo[:,2]),np.max(tube[1].hi[:,2]))+I(-ev.hi,ev.hi)
    assert vertical_velocity.hi<0
    end_values=P.values(I(np.array([end])),np.array([0]),2)
    state=[]
    for derivative,eps in enumerate([ep,ev,ea]):
        z=end_values[derivative][0,2]+I(-eps.hi,eps.hi)
        state.append([float(z.lo),float(z.hi)])
    # The entire accepted final turning window precedes t=2. The additional
    # fall from2 toH is the integral of strictly negative velocity. Bound it
    # using the exact polynomial endpoint difference and propagated v error.
    z2=P.values(I(np.array([2.])),np.array([0]),0)[0][0,2]
    zh=end_values[0][0,2]
    difference=z2-zh+I(-ev.hi,ev.hi)*float(H-F(2))
    assert difference.lo>0
    result={'grade':'conditional full-law tail certificate; new continuation and propagation require independent acceptance',
            'horizon':str(H),'time_interval':[2,end],'g':16,'c_f':1,'known':checked,
            'frozen_prefix_receipt':str(OLD/'check/certified-full-s8.json'),
            'frozen_prefix_receipt_sha256':digest(OLD/'check/certified-full-s8.json'),
            'source_archive_sha256':digest(archive),'target_archive':str(npz),'target_archive_sha256':digest(npz),
            'unchanged_prefix':'all right-target nodes through2 and all source prefixes retained exactly',
            'exact_target_source_labels':sources[js].tolist(),'target_source_count':len(js),
            'tail_polynomial_norm_bounds':bounds,'residual_cells':count,'tail_max_residual':max_res,
            'tail_max_stationary_contribution':max_stationary,'worst_residual_cell':worst,
            'max_enclosed_source_time':max_emission,'full_target_max_residual':max(max_res,prior['target']['max_euclidean_residual']),
            'uniform_error_budgets':{'position':float(ep.hi),'velocity':float(ev.hi),'acceleration':float(ea.hi)},
            'actual_tail_vertical_velocity':[float(vertical_velocity.lo),float(vertical_velocity.hi)],
            'actual_endpoint_vertical_state':{'height':state[0],'velocity':state[1],'acceleration':state[2]},
            'actual_fall_from2_toH':[float(difference.lo),float(difference.hi)],
            'additional_turn_on_tail':'excluded conditional on propagation acceptance',
            'completed_new_excursion':'none; descent is unfinished at horizon',
            'seconds':time.perf_counter()-begun}
    (OUT/'certificate.json').write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps(result,indent=2),flush=True)


if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('mode',choices=['known','target'])
    args=parser.parse_args();known() if args.mode=='known' else target()
