"""Full-law residual enclosure for the fixed-history next-minimum candidate.

Uses frozen accepted interval primitives. The candidate is not an evolution
oracle: every added residual includes the infinite stationary block field.
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
OUT=ROOT/'.local-data/master-equation-closure/next-minimum/check'
OLD=ROOT/'.local-data/master-equation-closure/later-certification'
TAIL=ROOT/'.local-data/master-equation-closure/later-pulse-ends'
CANDIDATE=ROOT/'.local-data/master-equation-closure/next-minimum/approximant/candidate.json'
GRID=1024
H=F(9,4)
SOURCE_END=F(41,32)
SOURCE_START=F(33,32)
TARGET_START=F(259,128)
CENTERS=np.array([[0,0,0],[1,0,0]],dtype=int)


def digest(path):return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def primitive():
    receipt=json.loads((OLD/'check/certified-full-s8.json').read_text())
    path=HERE/'smooth-two-particle-later-residual.py'
    spec=importlib.util.spec_from_file_location('frozen_interval_primitive',path)
    module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
    return module,receipt


R,PRIOR_RECEIPT=primitive()
I=R.I


def selected(receiver,points,cuts,end,receiver_bound,source_bound):
    """Strict rational exclusion using each source's exact early-zero cut."""
    answer=[]
    for j,p in enumerate(points):
        r2=sum(int(x)**2 for x in receiver-p)
        limit=end+receiver_bound+source_bound-cuts[j]
        if r2 and limit>0 and F(r2)<limit**2:answer.append(j)
    return np.array(answer,dtype=int)


def scatter(result,rows,receivers,signs):
    """Outward addition of ordered rows; every individual addition is padded."""
    for edge,receiver in enumerate(receivers):
        for derivative in range(3):
            term=signs[edge]*rows.c[derivative][:,edge,:]
            result[derivative].lo[:,receiver,:]=np.nextafter(result[derivative].lo[:,receiver,:]+term.lo,-np.inf)
            result[derivative].hi[:,receiver,:]=np.nextafter(result[derivative].hi[:,receiver,:]+term.hi,np.inf)


def known():
    # Run the current interval primitives' independent analytic controls in
    # this task's output directory, preserving all earlier evidence records.
    original_out=R.OUT
    R.OUT=OUT/'primitive-controls'
    try:
        R.known()
        primitive_controls=json.loads((R.OUT/'known.json').read_text())
    finally:
        R.OUT=original_out
    # Known exact graph with self exclusion and one reachable neighbor.
    points=np.array([[0,0,0],[1,0,0],[2,0,0]])
    got=selected(points[0],points,[F(0)]*3,F(3,2),F(0),F(0))
    assert np.array_equal(got,[1])
    # Ordered interval scatter with opposing signs and two receiver labels.
    values=np.array([[[1.,2.,3.],[4.,5.,6.],[-2.,-3.,-4.]]])
    rows=R.J([I(values),I(2)*I(values),I(3)*I(values)])
    result=[I(np.zeros((1,2,3)),np.zeros((1,2,3))) for _ in range(3)]
    scatter(result,rows,[0,1,0],[2,-1,3])
    for d,q in enumerate(result):
        expected=(d+1)*np.array([[[-4.,-5.,-6.],[-4.,-5.,-6.]]])
        assert np.all(q.lo<=expected) and np.all(q.hi>=expected)
    # Known exact quintic and continuous norm enclosure.
    t=np.arange(9)/8
    y=np.zeros((9,1,3));v=y.copy();a=y.copy()
    y[:,0,2]=t**5;v[:,0,2]=5*t**4;a[:,0,2]=20*t**3
    path=R.Paths(y,v,a,1/8)
    mid=I(np.array([5/16]));lab=np.array([0])
    vals=path.values(mid,lab,4)
    for q,expected in zip(vals,[F(5,16)**5,5*F(5,16)**4,20*F(5,16)**3,60*F(5,16)**2,120*F(5,16)]):
        assert F.from_float(float(q.lo[0,2]))<=expected<=F.from_float(float(q.hi[0,2]))
    # A cubic defect's exact second-order centered expansion has an enclosed
    # remainder when its second derivative ranges across the complete cell.
    center=I(F(1,2));delta=I(-1/8,1/8)
    value=center**3+3*(center**2)*delta+3*I(3/8,5/8)*(delta**2)
    assert value.lo<=float(F(3,8)**3) and value.hi>=float(F(5,8)**3)
    OUT.mkdir(parents=True,exist_ok=True)
    record={'result':'PASS','source_sha256':digest(__file__),
            'primitive_sha256':digest(HERE/'smooth-two-particle-later-residual.py'),
            'primitive_controls':primitive_controls,
            'controls':['exact causal row inclusion and self exclusion','ordered signed outward scatter','known quintic derivative enclosures','centered cubic defect remainder']}
    (OUT/'known.json').write_text(json.dumps(record,indent=2)+'\n')
    print(json.dumps(record),flush=True)


def inputs():
    checked=json.loads((OUT/'known.json').read_text())
    assert checked['result']=='PASS' and checked['primitive_controls']['result']=='PASS'
    manifest=json.loads(CANDIDATE.read_text())
    assert manifest['g']==16 and manifest['c_f']==1 and manifest['horizon']==str(H)
    assert manifest['source_end']==str(SOURCE_END) and manifest['step_denominator']==GRID
    producer=HERE/'smooth-two-particle-next-minimum-approximant.py'
    assert manifest['known']['result']=='PASS'
    archive=Path(manifest['array_file']);assert digest(archive)==manifest['array_sha256']
    data=np.load(archive)
    prior_path=Path(PRIOR_RECEIPT['input'])
    assert digest(prior_path)==PRIOR_RECEIPT['input_sha256']==manifest['source_archive_sha256']
    prior=np.load(prior_path)
    tail_receipt=json.loads((TAIL/'certificate.json').read_text())
    tail_path=Path(tail_receipt['target_archive'])
    assert digest(tail_path)==tail_receipt['target_archive_sha256']==manifest['tail_archive_sha256']
    tail=np.load(tail_path)
    points=data['source_points'];env=np.array([j for j,p in enumerate(points) if tuple(p) not in map(tuple,CENTERS)])
    expected=set()
    for p in itertools.product(range(-4,6),range(-4,5),range(-4,5)):
        if p in [(0,0,0),(1,0,0)]:continue
        distances=[sum((p[k]-int(c[k]))**2 for k in range(3)) for c in CENTERS]
        if any(d in [2,3,4,5,6] for d in distances):expected.add(p)
    assert len(expected)==100 and set(map(tuple,points[env]))==expected
    assert points.dtype.kind in 'iu' and points.shape==(101,3)
    assert np.array_equal(points[:76],prior['source_points']) and np.array_equal(points[76],CENTERS[0])
    assert np.array_equal(data['environment_labels'],env)
    for q in ['y','v','a']:
        s=data['source_'+q];t=data['target_'+q]
        assert s.shape==(1313,101,3) and t.shape==(2305,1,3)
        assert s.dtype==np.float64 and t.dtype==np.float64 and np.all(np.isfinite(s)) and np.all(np.isfinite(t))
        assert np.array_equal(s[:1057,:76],prior['source_'+q])
        assert np.array_equal(t[:2073],tail[q])
        assert np.array_equal(s[:,76:77],tail[q][:1313]*np.array([-1.,1.,1.]))
    cuts=[F(x) for x in manifest['source_exact_zero_through']]
    assert len(cuts)==101
    for j,cut in enumerate(cuts):
        assert all(np.all(data['source_'+q][:int(cut*GRID)+1,j]==0) for q in ['y','v','a'])
    # Stronger exact zero cuts are essential to carry the old residuals into
    # the enlarged receiving equations without introducing early trial rows.
    old_dist=np.sum((points[:76,None,:]-CENTERS[None,:,:])**2,axis=-1)
    first_m=np.min(np.where(old_dist>=2,old_dist,100000),axis=1)
    for j in np.flatnonzero(first_m==2):
        assert all(np.all(data['source_'+q][:34,j]==0) for q in ['y','v','a'])
        cuts[j]=F(33,1024)
    assert all(np.all(data['source_'+q][:1057,76]==0) for q in ['y','v','a'])
    cuts[76]=F(33,32)
    for j in range(77,101):
        assert cuts[j]==F(17,16)
        # Each new source's old pulse is absent on its exact zero prefix.
        for c in CENTERS:
            r2=sum(int(x)**2 for x in points[j]-c)
            assert F(r2)>(cuts[j]+F(11,8))**2
    ps=R.Paths(data['source_y'],data['source_v'],data['source_a'],1/GRID)
    pt=R.Paths(data['target_y'],data['target_v'],data['target_a'],1/GRID)
    pb=R.Paths(prior['source_y'],prior['source_v'],prior['source_a'],1/GRID)
    edges=[]
    for receiver,j in enumerate(env):
        for source in selected(points[j],points[:76],cuts[:76],SOURCE_END,F(1,200000),F(1,60000)):
            edges.append((receiver,int(source)))
    er=np.array([x[0] for x in edges]);es=np.array([x[1] for x in edges])
    assert all(first_m[j]==2 and np.sum((points[env[i]]-points[j])**2)==1 for i,j in edges)
    final=selected(CENTERS[1],points,cuts,H,F(1,100000),F(1,200000))
    assert len(final)==26 and 76 in final
    assert sorted(np.sum((CENTERS[1]-points[final])**2,axis=1).tolist())==[1]*6+[2]*12+[3]*8
    # The larger equation agrees with the retained source/target prefix:
    # every newly available trial row is zero wherever it was formerly absent.
    assert SOURCE_START-F(1)+F(1,200000)+F(1,60000)<F(33,1024)
    assert TARGET_START-F(1)+F(1,100000)+F(1,200000)<cuts[76]
    prior_final=selected(CENTERS[1],points,cuts,TARGET_START,F(1,100000),F(1,200000))
    assert len(prior_final)==21 and all(j<76 for j in prior_final)
    for j in prior_final:
        r2=sum(int(x)**2 for x in CENTERS[1]-points[j])
        assert F(r2)>(TARGET_START+F(1,100000)+F(1,200000)-SOURCE_START)**2
    return checked,manifest,archive,tail_receipt,ps,pt,pb,points,env,er,es,final,cuts


def polynomial_bounds(paths,labels,start=0):
    maxima=np.zeros(5)
    for first in range(start,paths.n,64):
        cells=np.arange(first,min(paths.n,first+64))[:,None]
        idx=np.broadcast_to(cells,(len(cells),len(labels)))
        labs=np.broadcast_to(labels,idx.shape)
        vals=paths.cell(idx,labs,I(np.zeros(idx.shape),np.ones(idx.shape)),4)
        maxima=np.maximum(maxima,[float(np.max(R.upper_norm(v))) for v in vals])
    return maxima.tolist()


def residual(args):
    checked,manifest,archive,tail_receipt,ps,pt,pb,points,env,er,es,final,cuts=inputs()
    begun=time.perf_counter();h=1/GRID;width=h/args.subdivisions
    source_norms=polynomial_bounds(ps,np.arange(101));target_norms=polynomial_bounds(pt,np.array([0]))
    assert source_norms[0]<1/200000 and source_norms[1]<1/16000 and source_norms[2]<1/400
    assert target_norms[0]<1/100000
    print(json.dumps({'phase':'polynomial_tubes','source':source_norms,'target':target_norms,'source_edges':len(er),'target_edges':len(final)}),flush=True)
    report={'grade':'full-law residual certificate; actual-motion interpretation requires continuation and error propagation',
            'known':checked,'candidate_manifest_sha256':digest(CANDIDATE),'archive':str(archive),'archive_sha256':digest(archive),
            'horizon':str(H),'source_end':str(SOURCE_END),'g':16,'c_f':1,'grid':GRID,'subdivisions':args.subdivisions,
            'source_polynomial_norms':source_norms,'target_polynomial_norms':target_norms,
            'source_environmental_labels':env.tolist(),'source_generated_edges':[[int(i),int(j)] for i,j in zip(er,es)],
            'target_generated_labels':final.tolist(),'stronger_exact_zero_cuts':[str(c) for c in cuts],
            'prefix_byte_equality':'PASS; base76, right target, exact reflected partner',
            'inherited_source_residual':PRIOR_RECEIPT['sources']['max_euclidean_residual'],
            'inherited_target_residual':tail_receipt['full_target_max_residual']}
    for stage in ([args.stage] if args.stage!='both' else ['sources','target']):
        paths,labels,start,end=(ps,env,SOURCE_START,SOURCE_END) if stage=='sources' else (pt,np.array([0]),TARGET_START,H)
        def rhs(t,vals):
            count=len(labels);times=len(t.lo)
            result=[I(np.zeros((times,count,3)),np.zeros((times,count,3))) for _ in range(3)]
            if stage=='sources':
                for c in CENTERS:
                    k=points[labels]-c
                    q,_=R.row_jet(t,vals,k,lambda s,j,d:R.vector_pulse(s,d),np.broadcast_to(labels,t.lo.shape),np.nextafter(1/314928,np.inf))
                    sign=16*R.parity(points[labels])*R.parity(c)
                    result=[a+sign[None,:,None]*b for a,b in zip(result,q.c)]
                ri,sj=er,es;src=pb;offset=points[labels[ri]]-points[sj];bound=np.nextafter(1/60000,np.inf)
            else:
                ri=np.zeros(len(final),dtype=int);sj=final;src=ps;offset=CENTERS[1]-points[sj];bound=np.nextafter(1/200000,np.inf)
            tt=I(t.lo[:,ri],t.hi[:,ri]);rv=[I(v.lo[:,ri,:],v.hi[:,ri,:]) for v in vals]
            jj=np.broadcast_to(sj,tt.lo.shape)
            q,roots=R.row_jet(tt,rv,offset,lambda s,j,d:src.values(s,j,d),jj,bound)
            receiver_points=points[labels[ri]] if stage=='sources' else np.broadcast_to(CENTERS[1],offset.shape)
            signs=16*R.parity(receiver_points)*R.parity(points[sj])
            scatter(result,q,ri,signs)
            return result,roots
        steps=int((end-start)*GRID*args.subdivisions)
        maximum=stationary_max=emission_max=0.;worst=None;last_heartbeat=time.perf_counter()
        for first in range(0,steps,args.batch):
            indices=np.arange(first,min(steps,first+args.batch))
            shape=(len(indices),len(labels));labs=np.broadcast_to(labels,shape)
            lo=float(start)+indices*width;hi=lo+width;mid=lo+width/2
            tm=I(np.broadcast_to(mid[:,None],shape))
            ti=I(np.broadcast_to(lo[:,None],shape),np.broadcast_to(hi[:,None],shape))
            vm=paths.values(tm,labs,4);vi=paths.values(ti,labs,4)
            qm,_=rhs(tm,vm);qi,roots=rhs(ti,vi)
            defect=vm[2]-qm[0]+(vm[3]-qm[1])*I(-width/2,width/2)+(vi[4]/2-qi[2])*(I(0,width/2)**2)
            stationary=(22400*R.norm(vi[0])**3).hi
            total=(I(R.upper_norm(defect))+I(stationary)).hi
            loc=np.unravel_index(int(np.argmax(total)),total.shape)
            if total[loc]>maximum:
                maximum=float(total[loc]);worst={'time':[float(ti.lo[loc]),float(ti.hi[loc])],'label':int(labs[loc])}
            stationary_max=max(stationary_max,float(np.max(stationary)))
            emission_max=max(emission_max,float(np.max(roots.hi)))
            if first==0 or time.perf_counter()-last_heartbeat>=20:
                print(json.dumps({'phase':stage,'cells_finished':int(indices[-1]+1),'cells_total':steps,'residual':maximum,'seconds':time.perf_counter()-begun}),flush=True)
                last_heartbeat=time.perf_counter()
        inherited=PRIOR_RECEIPT['sources']['max_euclidean_residual'] if stage=='sources' else tail_receipt['full_target_max_residual']
        if stage=='sources':inherited=max(inherited,PRIOR_RECEIPT['target']['max_euclidean_residual'])
        report[stage]={'tail_residual':maximum,'full_residual':max(maximum,inherited),'stationary_max':stationary_max,'max_emission':emission_max,'worst':worst,'time':[float(start),float(end)],'cells':steps,'paths':len(labels)}
        print(json.dumps({'phase':stage+'_complete',**report[stage],'seconds':time.perf_counter()-begun}),flush=True)
    report['seconds']=time.perf_counter()-begun
    (OUT/(args.stage+'-residual.json')).write_text(json.dumps(report,indent=2)+'\n')
    print(json.dumps({'output':str(OUT/(args.stage+'-residual.json')),'seconds':report['seconds']}),flush=True)


if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('mode',choices=['known','residual'])
    parser.add_argument('--stage',choices=['sources','target','both'],default='both')
    parser.add_argument('--subdivisions',type=int,choices=[4,8,16],default=8)
    parser.add_argument('--batch',type=int,default=32)
    args=parser.parse_args()
    known() if args.mode=='known' else residual(args)
