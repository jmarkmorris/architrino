"""Full-law continuous residuals for the later search for the next upward maximum.

The frozen interval primitives define exact dyadic nodal quintics. Every
residual includes a norm enclosure of the unchanged infinite block field.
"""
import argparse
from fractions import Fraction as F
import hashlib
import importlib.util
import itertools
import json
from pathlib import Path
import time

import numpy as np

HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[3]
OUT=ROOT/'.local-data/master-equation-closure/next-maximum/later-check'
OLD=ROOT/'.local-data/master-equation-closure/next-maximum'
CANDIDATE=ROOT/'.local-data/master-equation-closure/next-maximum/approximant/bridge-h13-4.json'
GRID=1024
SOURCE_START=F(57,32)
TARGET_START=F(11,4)
CENTERS=np.array([[0,0,0],[1,0,0]],dtype=int)
spec=importlib.util.spec_from_file_location('accepted_minimum_certificate',HERE/'smooth-two-particle-next-minimum-certificate.py')
N=importlib.util.module_from_spec(spec);spec.loader.exec_module(N)
R=N.R
I=R.I
turn_spec=importlib.util.spec_from_file_location('frozen_bridge_turns',HERE/'smooth-two-particle-next-maximum-turns.py')
B=importlib.util.module_from_spec(turn_spec);turn_spec.loader.exec_module(B)


def digest(path):return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def zero_rhs(times,count):
    # scatter updates endpoints in place, so low/high must own separate arrays.
    return [I(np.zeros((times,count,3)),np.zeros((times,count,3))) for _ in range(3)]


def sign_enclosures(data,left,right,position_error,velocity_error):
    # Each dynamically loaded primitive module owns its interval class.
    p=B.T.R.Paths(data['target_y'],data['target_v'],data['target_a'],1/GRID)
    height=B.T.endpoint(p,0,right,0)+B.I(-position_error,position_error)
    velocity=B.T.cell_range(p,0,left,right,1)+B.I(-velocity_error,velocity_error)
    endpoint_velocity=B.T.endpoint(p,0,right,1)+B.I(-velocity_error,velocity_error)
    return height,velocity,endpoint_velocity


def known():
    previous_out=N.OUT
    N.OUT=OUT/'inherited-controls'
    try:
        N.known()
        inherited=json.loads((N.OUT/'known.json').read_text())
    finally:
        N.OUT=previous_out
    # Exact first-old-excitation identity for an adjacent environmental label:
    # the squared distance one pulse is finished before release, leaving two.
    p=np.array([0,1,0]);r2=np.sum((p-CENTERS)**2,axis=1)
    assert min(int(x) for x in r2 if x>=2)==2
    # A strict zero-cut test at an exactly rational anchor distance.
    points=np.array([[1,0,0],[2,0,0]])
    assert np.array_equal(N.selected(CENTERS[0],points,[F(1,4),F(0)],F(3,2),F(0),F(0)),[0])
    assert len(N.selected(CENTERS[0],points,[F(1,2),F(0)],F(3,2),F(0),F(0)))==0
    accumulator=zero_rhs(1,1)
    row=R.J([I(np.array([[[1.,-2.,3.]]])) for _ in range(3)])
    N.scatter(accumulator,row,[0],[2])
    for q in accumulator:
        expected=np.array([[[2.,-4.,6.]]])
        assert np.all(q.lo<=expected) and np.all(q.hi>=expected)
        assert np.max(q.hi-q.lo)<1e-12
    previous_turn_out=B.OUT
    B.OUT=OUT/'inherited-turn-controls'
    try:
        B.known()
        turn_controls=json.loads((B.OUT/'turns-known.json').read_text())
    finally:
        B.OUT=previous_turn_out
    t=np.arange(3)/GRID
    y=np.zeros((3,1,3));v=y.copy();a=y.copy()
    y[:,0,2]=t+t*t/2;v[:,0,2]=1+t;a[:,0,2]=1
    height,velocity,endpoint_velocity=sign_enclosures({'target_y':y,'target_v':v,'target_a':a},0,2/GRID,0,0)
    assert height.lo<=t[-1]+t[-1]**2/2<=height.hi
    assert velocity.lo>0 and endpoint_velocity.lo<=1+t[-1]<=endpoint_velocity.hi
    OUT.mkdir(parents=True,exist_ok=True)
    record={'result':'PASS','source_sha256':digest(__file__),'inherited':inherited,'turn_controls':turn_controls,
            'controls':['exact first postrelease exciting shell','strict exact zero-cut row exclusion','target-only signed accumulation with independent interval endpoints','exact rising quadratic through the complete sign-enclosure helper']}
    (OUT/'known.json').write_text(json.dumps(record,indent=2)+'\n')
    print(json.dumps(record),flush=True)


def bit_equal(a,b):return a.shape==b.shape and a.dtype==b.dtype and a.tobytes()==b.tobytes()


def inputs():
    checked=json.loads((OUT/'known.json').read_text());assert checked['result']=='PASS'
    manifest=json.loads(CANDIDATE.read_text())
    assert manifest['g']==16 and manifest['c_f']==1 and manifest['step_denominator']==GRID
    H=F(manifest['horizon']);source_end=F(manifest['source_end'])
    assert H==F(13,4) and source_end==F(73,32)
    archive=Path(manifest['array_file']);assert digest(archive)==manifest['array_sha256']
    data=np.load(archive)
    old_receipt=json.loads((OLD/'bridge-check/both-residual.json').read_text())
    old_path=Path(old_receipt['archive']);assert digest(old_path)==old_receipt['archive_sha256']
    old=np.load(old_path)
    incoming_points=np.concatenate([old['source_points'],old['target_points']])
    incoming=[np.concatenate([old['source_'+q],old['target_'+q][:1825]],axis=1) for q in ['y','v','a']]
    assert incoming_points.shape==(152,3)
    assert np.array_equal(np.array(manifest['incoming_source_points'],dtype=int),incoming_points)
    points=data['source_points'];env=np.array([j for j,p in enumerate(points) if tuple(p) not in map(tuple,CENTERS)])
    assert points.dtype.kind in 'iu' and len(set(map(tuple,points)))==len(points)
    assert bit_equal(points[:151],old['source_points'])
    assert np.array_equal(points[76],CENTERS[0]) and np.array_equal(data['environment_labels'],env)
    assert len(env)==246 and len(points)==247
    for q in ['y','v','a']:
        a=data['source_'+q];b=data['target_'+q]
        assert a.shape==(2337,247,3) and b.shape==(3329,1,3)
        assert a.dtype==np.float64 and b.dtype==np.float64 and np.all(np.isfinite(a)) and np.all(np.isfinite(b))
        assert bit_equal(a[:1825,:151],old['source_'+q])
        assert bit_equal(b[:2817],old['target_'+q])
        assert bit_equal(a[:,76:77],old['target_'+q][:2337]*np.array([-1.,1.,1.]))
    cuts=[F(x) for x in manifest['source_exact_zero_through']]
    assert len(cuts)==247
    for j,cut in enumerate(cuts):
        assert cut*GRID==int(cut*GRID)
        assert all(np.all(data['source_'+q][:int(cut*GRID)+1,j]==0) for q in ['y','v','a'])
    old_cuts=[F(x) for x in old_receipt['exact_zero_cuts']]
    for j in range(151):cuts[j]=max(cuts[j],old_cuts[j])
    incoming_cuts=cuts[:151]+[cuts[76]]
    bs=F(1,40000);bt=F(1,3000);b0=F(1,100000)
    expected=set()
    for p in itertools.product(range(-5,7),range(-5,6),range(-5,6)):
        if p in [(0,0,0),(1,0,0)]:continue
        r2=min(x for x in [sum((p[k]-int(c[k]))**2 for k in range(3)) for c in CENTERS] if x>=2)
        if F(r2)<(source_end+F(11,8)+bs+F(1,314928))**2:expected.add(p)
    assert set(map(tuple,points[env]))==expected
    for j in range(151,247):
        for c in CENTERS:
            r2=sum(int(x)**2 for x in points[j]-c)
            assert F(r2)>(SOURCE_START+F(11,8)+F(1,314928))**2
        assert cuts[j]>=SOURCE_START
    edges=[]
    for receiver,j in enumerate(env):
        for source in N.selected(points[j],incoming_points,incoming_cuts,source_end,bs,b0):edges.append((receiver,int(source)))
    er=np.array([x[0] for x in edges]);es=np.array([x[1] for x in edges])
    final=N.selected(CENTERS[1],points,cuts,H,bt,bs)
    old_edges={(int(i),int(j)) for i,j in old_receipt['source_generated_edges']}
    old_by_label={j:i for i,j in enumerate(old_receipt['source_environmental_labels'])}
    for receiver,source in edges:
        j=int(env[receiver]);r2=sum(int(x)**2 for x in points[j]-incoming_points[source])
        if j in old_by_label and (old_by_label[j],source) in old_edges:continue
        limit=SOURCE_START+bs+b0-incoming_cuts[source]
        assert limit<=0 or F(r2)>limit**2
    old_final=set(old_receipt['target_generated_labels'])
    for j in final:
        if int(j) in old_final:continue
        r2=sum(int(x)**2 for x in CENTERS[1]-points[j])
        limit=TARGET_START+bt+bs-cuts[j]
        assert limit<=0 or F(r2)>limit**2
    assert source_end-1+bs+b0<F(57,32)
    # Inherited prefix rows sample the unchanged earlier polynomial pieces.
    for receiver,source in old_edges:
        label=old_receipt['source_environmental_labels'][receiver]
        r2=sum(int(x)**2 for x in points[label]-incoming_points[source])
        assert F(r2)>(SOURCE_START+bs+b0-F(33,32))**2
    for j in old_final:
        r2=sum(int(x)**2 for x in CENTERS[1]-points[j])
        assert F(r2)>(TARGET_START+bt+bs-SOURCE_START)**2
    ps=R.Paths(data['source_y'],data['source_v'],data['source_a'],1/GRID)
    pt=R.Paths(data['target_y'],data['target_v'],data['target_a'],1/GRID)
    pb=R.Paths(*incoming,1/GRID)
    return checked,manifest,archive,old_receipt,incoming_points,H,source_end,ps,pt,pb,points,env,er,es,final,cuts


def residual(args):
    checked,manifest,archive,old,base,H,source_end,ps,pt,pb,points,env,er,es,final,cuts=inputs()
    begun=time.perf_counter();width=1/(GRID*args.subdivisions)
    source_norms=N.polynomial_bounds(ps,np.arange(len(points)));target_norms=N.polynomial_bounds(pt,np.array([0]))
    assert source_norms[0]<1/40000 and target_norms[0]<1/3000
    print(json.dumps({'phase':'polynomial_tubes','source':source_norms,'target':target_norms,'source_edges':len(er),'target_edges':len(final)}),flush=True)
    report={'grade':'full-law continuous residuals; actual-motion conclusion requires independently accepted continuation and propagation',
            'known':checked,'archive':str(archive),'archive_sha256':digest(archive),'candidate_manifest_sha256':digest(CANDIDATE),
            'horizon':str(H),'source_end':str(source_end),'g':16,'c_f':1,'grid':GRID,'subdivisions':args.subdivisions,
            'source_polynomial_norms':source_norms,'target_polynomial_norms':target_norms,
            'source_environmental_labels':env.tolist(),'source_generated_edges':[[int(i),int(j)] for i,j in zip(er,es)],
            'target_generated_labels':final.tolist(),'exact_zero_cuts':[str(c) for c in cuts],
            'prefix_bit_equality':'PASS; all prior151 source paths, target nodes and reflected partner',
            'inherited_source_residual':old['sources']['full_residual'],'inherited_target_residual':old['target']['full_residual']}
    for stage in ([args.stage] if args.stage!='both' else ['sources','target']):
        paths,labels,start,end=(ps,env,SOURCE_START,source_end) if stage=='sources' else (pt,np.array([0]),TARGET_START,H)
        def rhs(t,vals):
            result=zero_rhs(len(t.lo),len(labels))
            if stage=='sources':
                for c in CENTERS:
                    q,_=R.row_jet(t,vals,points[labels]-c,lambda s,j,d:R.vector_pulse(s,d),np.broadcast_to(labels,t.lo.shape),np.nextafter(1/314928,np.inf))
                    signs=16*R.parity(points[labels])*R.parity(c)
                    result=[a+signs[None,:,None]*b for a,b in zip(result,q.c)]
                ri,sj=er,es;src=pb;offset=points[labels[ri]]-base[sj]
            else:
                ri=np.zeros(len(final),dtype=int);sj=final;src=ps;offset=CENTERS[1]-points[sj]
            tt=I(t.lo[:,ri],t.hi[:,ri]);rv=[I(v.lo[:,ri,:],v.hi[:,ri,:]) for v in vals]
            bound=1/100000 if stage=='sources' else 1/40000
            q,roots=R.row_jet(tt,rv,offset,lambda s,j,d:src.values(s,j,d),np.broadcast_to(sj,tt.lo.shape),np.nextafter(bound,np.inf))
            receiver_points=points[labels[ri]] if stage=='sources' else np.broadcast_to(CENTERS[1],offset.shape)
            transmitter_points=base[sj] if stage=='sources' else points[sj]
            N.scatter(result,q,ri,16*R.parity(receiver_points)*R.parity(transmitter_points))
            return result,roots
        steps=int((end-start)*GRID*args.subdivisions)
        maximum=stationary_max=emission_max=0.;worst=None;last_heartbeat=time.perf_counter()
        for first in range(0,steps,args.batch):
            indices=np.arange(first,min(steps,first+args.batch));shape=(len(indices),len(labels));labs=np.broadcast_to(labels,shape)
            lo=float(start)+indices*width;hi=lo+width;mid=lo+width/2
            tm=I(np.broadcast_to(mid[:,None],shape));ti=I(np.broadcast_to(lo[:,None],shape),np.broadcast_to(hi[:,None],shape))
            vm=paths.values(tm,labs,4);vi=paths.values(ti,labs,4)
            qm,_=rhs(tm,vm);qi,roots=rhs(ti,vi)
            defect=vm[2]-qm[0]+(vm[3]-qm[1])*I(-width/2,width/2)+(vi[4]/2-qi[2])*(I(0,width/2)**2)
            stationary=(22400*R.norm(vi[0])**3).hi
            total=(I(R.upper_norm(defect))+I(stationary)).hi
            loc=np.unravel_index(int(np.argmax(total)),total.shape)
            if total[loc]>maximum:maximum=float(total[loc]);worst={'time':[float(ti.lo[loc]),float(ti.hi[loc])],'label':int(labs[loc])}
            stationary_max=max(stationary_max,float(np.max(stationary)));emission_max=max(emission_max,float(np.max(roots.hi)))
            if first==0 or time.perf_counter()-last_heartbeat>=20:
                print(json.dumps({'phase':stage,'cells_finished':int(indices[-1]+1),'cells_total':steps,'residual':maximum,'seconds':time.perf_counter()-begun}),flush=True)
                last_heartbeat=time.perf_counter()
        inherited=old['sources']['full_residual'] if stage=='sources' else old['target']['full_residual']
        if stage=='sources':inherited=max(inherited,old['target']['full_residual'])
        report[stage]={'tail_residual':maximum,'full_residual':max(maximum,inherited),'stationary_max':stationary_max,'max_emission':emission_max,'worst':worst,'time':[float(start),float(end)],'cells':steps,'paths':len(labels)}
        print(json.dumps({'phase':stage+'_complete',**report[stage],'seconds':time.perf_counter()-begun}),flush=True)
    report['seconds']=time.perf_counter()-begun
    (OUT/(args.stage+'-residual.json')).write_text(json.dumps(report,indent=2)+'\n')
    print(json.dumps({'output':str(OUT/(args.stage+'-residual.json')),'seconds':report['seconds']}),flush=True)


def signs(args):
    checked=json.loads((OUT/'known.json').read_text());assert checked['result']=='PASS'
    receipt_path=OUT/'both-residual.json';receipt=json.loads(receipt_path.read_text())
    assert receipt['horizon']=='13/4' and receipt['target']['time']==[11/4,13/4]
    archive=Path(receipt['archive']);assert digest(archive)==receipt['archive_sha256']
    data=np.load(archive)
    budgets=[F(args.position_error),F(args.velocity_error)]
    assert all(x>0 for x in budgets)
    eps=[(I(x.numerator)/x.denominator).hi for x in budgets]
    height,velocity,endpoint_velocity=sign_enclosures(data,11/4,13/4,*eps)
    inherited_path=OLD/'bridge-check/bridge-signs.json'
    inherited=json.loads(inherited_path.read_text())
    assert inherited['horizon']=='11/4' and inherited['actual_velocity_range'][0]>0
    old_path=ROOT/'.local-data/master-equation-closure/next-minimum/check/turns.json'
    old=json.loads(old_path.read_text());assert old['four_consecutive_turns']=='PASS'
    trough=B.I(*old['fourth_turn']['actual_height_range']);peak=B.I(*old['previous_maximum_height'])
    ratio=B.rise_ratio(trough,peak,height)
    assert velocity.lo>0 and (height-peak).lo>0 and ratio.lo>1
    record={'grade':'conditional actual rising extension; requires accepted continuation and error propagation',
            'known':checked,'residual_receipt':str(receipt_path),'residual_receipt_sha256':digest(receipt_path),
            'archive_sha256':receipt['archive_sha256'],'inherited_bridge_receipt':str(inherited_path),
            'inherited_bridge_receipt_sha256':digest(inherited_path),'previous_turn_receipt_sha256':digest(old_path),
            'horizon':'13/4','new_sign_interval':['11/4','13/4'],'g':16,'c_f':1,
            'position_error':float(eps[0]),'velocity_error':float(eps[1]),
            'actual_velocity_range':B.T.serialized(velocity),'endpoint_height':B.T.serialized(height),
            'endpoint_velocity':B.T.serialized(endpoint_velocity),'rise_so_far':B.T.serialized(height-trough),
            'rise_so_far_to_preceding_fall_ratio':B.T.serialized(ratio),
            'additional_turn':'excluded through this horizon using inherited and new continuous signs',
            'requested_next_maximum':'not yet reached'}
    (OUT/'signs.json').write_text(json.dumps(record,indent=2)+'\n')
    print(json.dumps(record,indent=2),flush=True)


if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('mode',choices=['known','residual','signs'])
    parser.add_argument('--stage',choices=['sources','target','both'],default='both')
    parser.add_argument('--subdivisions',type=int,choices=[4,8,16,32],default=8)
    parser.add_argument('--batch',type=int,default=32)
    parser.add_argument('--manifest',default=str(CANDIDATE))
    parser.add_argument('--output-dir',default=str(OUT))
    parser.add_argument('--position-error')
    parser.add_argument('--velocity-error')
    args=parser.parse_args()
    CANDIDATE=Path(args.manifest);OUT=Path(args.output_dir)
    known() if args.mode=='known' else signs(args) if args.mode=='signs' else residual(args)
