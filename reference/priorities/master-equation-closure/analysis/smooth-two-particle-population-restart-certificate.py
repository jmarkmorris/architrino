"""Continuous full-law residuals for a complete-population restart.

The numerical histories are exact dyadic quintics. The full infinite stationary
field is retained by its independently accepted norm enclosure. Earlier
certificates and interval primitives are read-only dependencies.
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
OUT=ROOT/'.local-data/master-equation-closure/population-restart/check'
PRIOR=ROOT/'.local-data/master-equation-closure/next-maximum'
MANIFEST=ROOT/'.local-data/master-equation-closure/population-restart/approximant/candidate.json'
GRID=1024
START=F(73,32)
END=F(13,4)
CENTERS=np.array([[0,0,0],[1,0,0]],dtype=int)
spec=importlib.util.spec_from_file_location('frozen_later_certificate',HERE/'smooth-two-particle-next-maximum-later-certificate.py')
L=importlib.util.module_from_spec(spec);spec.loader.exec_module(L)
N=L.N;R=L.R;I=R.I


def digest(path):return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def zero_rhs(times,count):
    return [I(np.zeros((times,count,3)),np.zeros((times,count,3))) for _ in range(3)]


def scatter_groups(receivers):
    """Group the nth incoming edge of each receiver, preserving its order."""
    receivers=np.asarray(receivers,dtype=int)
    assert np.all(receivers[1:]>=receivers[:-1])
    if not len(receivers):return []
    starts=np.r_[0,np.flatnonzero(receivers[1:]!=receivers[:-1])+1]
    counts=np.diff(np.r_[starts,len(receivers)])
    return [starts[counts>k]+k for k in range(int(max(counts)))]


def scatter(result,rows,receivers,signs,groups):
    # Every vectorized assignment has unique receiver indices. For each
    # receiver the exact order and outward padding equal the frozen loop.
    for edges in groups:
        labels=receivers[edges]
        for derivative in range(3):
            term=signs[edges][None,:,None]*rows.c[derivative][:,edges,:]
            result[derivative].lo[:,labels,:]=np.nextafter(result[derivative].lo[:,labels,:]+term.lo,-np.inf)
            result[derivative].hi[:,labels,:]=np.nextafter(result[derivative].hi[:,labels,:]+term.hi,np.inf)


def path_norm_profiles(paths,cut_cells):
    maxima=np.zeros((5,paths.count))
    profiles={};start=0
    for cut in sorted(set(cut_cells)):
        assert 0<cut<=paths.n
        for first in range(start,cut,64):
            cells=np.arange(first,min(cut,first+64))[:,None]
            indices=np.broadcast_to(cells,(len(cells),paths.count))
            labels=np.broadcast_to(np.arange(paths.count),indices.shape)
            values=paths.cell(indices,labels,I(np.zeros(indices.shape),np.ones(indices.shape)),4)
            maxima=np.maximum(maxima,[np.max(R.upper_norm(v),axis=0) for v in values])
        profiles[cut]=maxima.copy();start=cut
    return profiles


def path_norms(paths,end_cell):return path_norm_profiles(paths,[end_cell])[end_cell]


def known():
    saved=L.OUT;L.OUT=OUT/'inherited-controls'
    try:
        L.known()
        previous=json.loads((L.OUT/'known.json').read_text())
    finally:L.OUT=saved
    receivers=np.array([0,0,0,2,3,3]);signs=np.array([16.,-16.,16.,-16.,16.,-16.])
    values=np.array([[[1.,2.,-3.],[2.,-1.,4.],[-1.,2.,1.],[4.,-2.,1.],[3.,-4.,2.],[-2.,1.,3.]]])
    rows=R.J([I(values*(d+1)) for d in range(3)])
    actual=zero_rhs(1,4);reference=zero_rhs(1,4)
    scatter(actual,rows,receivers,signs,scatter_groups(receivers))
    N.scatter(reference,rows,receivers,signs)
    exact=np.array([[[-32.,80.,-96.],[0.,0.,0.],[-64.,32.,-16.],[80.,-80.,-16.]]])
    for d,(a,b) in enumerate(zip(actual,reference)):
        assert np.all(a.lo<=exact*(d+1)) and np.all(a.hi>=exact*(d+1))
        assert np.array_equal(a.lo,b.lo) and np.array_equal(a.hi,b.hi)
        assert np.max(a.hi-a.lo)<1e-11
    assert scatter_groups(np.array([],dtype=int))==[]
    t=np.arange(5)/4;y=np.zeros((5,2,3));v=y.copy();a=y.copy()
    y[:,0,0]=t*t;v[:,0,0]=2*t;a[:,0,0]=2
    y[:,1,1]=3*t;v[:,1,1]=3
    bounds=path_norms(R.Paths(y,v,a,1/4),2)
    exact=np.array([[.25,1.5],[1.,3.],[2.,0.],[0.,0.],[0.,0.]])
    assert np.all(bounds>=exact) and np.max(bounds-exact)<1e-10
    profiles=path_norm_profiles(R.Paths(y,v,a,1/4),[1,2,4])
    for cut,bounds in profiles.items():
        end=cut/4;exact=np.array([[end*end,3*end],[2*end,3.],[2.,0.],[0.,0.],[0.,0.]])
        assert np.all(bounds>=exact) and np.max(bounds-exact)<1e-10
    # First-old shell census is tested on an elementary two-center case.
    p=np.array([0,1,0]);assert sorted(np.sum((p-CENTERS)**2,axis=1))==[1,2]
    OUT.mkdir(parents=True,exist_ok=True)
    record={'result':'PASS','source_sha256':digest(__file__),'inherited':previous,
            'controls':['exact mixed-sign unequal-degree accumulation with an empty receiver','frozen ordered-scatter parity, distinct from the exact reference','empty edge list','exact per-path polynomial norms on a proper prefix','known two-center old-excitation geometry']}
    (OUT/'known.json').write_text(json.dumps(record,indent=2)+'\n')
    print(json.dumps(record),flush=True)


def bit_equal(a,b):return a.shape==b.shape and a.dtype==b.dtype and a.tobytes()==b.tobytes()


def inputs():
    known_record=json.loads((OUT/'known.json').read_text());assert known_record['result']=='PASS'
    manifest=json.loads(MANIFEST.read_text())
    assert manifest['g']==16 and manifest['c_f']==1 and manifest['step_denominator']==GRID
    assert F(manifest['horizon'])==END and F(manifest['source_end'])==END
    archive=Path(manifest['array_file']);assert digest(archive)==manifest['array_sha256']
    data=np.load(archive)
    prior_receipt=json.loads((PRIOR/'later-check/both-residual.json').read_text())
    prior_archive=Path(prior_receipt['archive']);assert digest(prior_archive)==prior_receipt['archive_sha256']
    old=np.load(prior_archive)
    incoming_points=np.concatenate([old['source_points'],old['target_points']])
    incoming=[np.concatenate([old['source_'+q],old['target_'+q][:2337]],axis=1) for q in ['y','v','a']]
    assert incoming_points.shape==(248,3)
    assert np.array_equal(np.array(manifest['incoming_source_points'],dtype=int),incoming_points)
    points=data['source_points'];env=np.array([j for j,p in enumerate(points) if tuple(p) not in map(tuple,CENTERS)])
    assert len(points)==505 and len(env)==504 and len(set(map(tuple,points)))==505
    assert points.dtype.kind in 'iu' and np.array_equal(points[76],CENTERS[0])
    assert bit_equal(points[:247],old['source_points'])
    assert np.array_equal(data['environment_labels'],env)
    for q in ['y','v','a']:
        a=data['source_'+q];b=data['target_'+q]
        assert a.shape==(3329,505,3) and b.shape==(3329,1,3)
        assert a.dtype==b.dtype==np.float64 and np.all(np.isfinite(a)) and np.all(np.isfinite(b))
        assert bit_equal(a[:2337,:247],old['source_'+q])
        assert bit_equal(b,old['target_'+q])
        assert bit_equal(a[:,76:77],b*np.array([-1.,1.,1.]))
    cuts=[F(x) for x in manifest['source_exact_zero_through']]
    assert len(cuts)==505
    for j,cut in enumerate(cuts):
        assert cut*GRID==int(cut*GRID)
        assert all(np.all(data['source_'+q][:int(cut*GRID)+1,j]==0) for q in ['y','v','a'])
    earlier_cuts=[F(x) for x in prior_receipt['exact_zero_cuts']]
    for j in range(247):cuts[j]=max(cuts[j],earlier_cuts[j])
    incoming_cuts=cuts[:247]+[cuts[76]]
    receiver_bound=F(1,2000);source_bound=F(1,40000)
    expected=set()
    for p in itertools.product(range(-5,7),range(-5,6),range(-5,6)):
        if p in [(0,0,0),(1,0,0)]:continue
        m=min(x for x in [sum((p[k]-int(c[k]))**2 for k in range(3)) for c in CENTERS] if x>=2)
        if F(m)<(END+F(11,8)+receiver_bound+F(1,314928))**2:expected.add(p)
    assert set(map(tuple,points[env]))==expected
    for j in range(247,505):
        assert cuts[j]>=START
        for c in CENTERS:
            m=sum(int(x)**2 for x in points[j]-c)
            assert F(m)>(START+F(11,8)+F(1,314928))**2
    edges=[]
    for receiver,j in enumerate(env):
        for source in N.selected(points[j],incoming_points,incoming_cuts,END,receiver_bound,source_bound):edges.append((receiver,int(source)))
    er=np.array([x[0] for x in edges]);es=np.array([x[1] for x in edges])
    old_edges={(int(i),int(j)) for i,j in prior_receipt['source_generated_edges']}
    old_by_label={j:i for i,j in enumerate(prior_receipt['source_environmental_labels'])}
    for receiver,source in edges:
        j=int(env[receiver]);m=sum(int(x)**2 for x in points[j]-incoming_points[source])
        # Incoming index151 was the right target in the preceding stage;
        # in this incoming table its identity is at247.
        old_source=151 if source==247 else source
        if j in old_by_label and source<151 and (old_by_label[j],source) in old_edges:continue
        if j in old_by_label and source==247 and (old_by_label[j],old_source) in old_edges:continue
        limit=START+receiver_bound+source_bound-incoming_cuts[source]
        assert limit<=0 or F(m)>limit**2
    assert END-1+receiver_bound+source_bound<START
    assert START-1+receiver_bound+source_bound<F(57,32)
    ps=R.Paths(data['source_y'],data['source_v'],data['source_a'],1/GRID)
    pb=R.Paths(*incoming,1/GRID)
    return known_record,manifest,archive,prior_receipt,points,env,incoming_points,ps,pb,er,es,cuts


def residual(args):
    checked,manifest,archive,old,points,env,incoming_points,ps,pb,er,es,cuts=inputs()
    begun=time.perf_counter();width=1/(GRID*args.subdivisions)
    profiles=path_norm_profiles(ps,[int(F(n,32)*GRID) for n in range(73,90)]+[ps.n])
    per_path=profiles[ps.n]
    early_per_path=profiles[int(F(89,32)*GRID)]
    norms=np.max(per_path,axis=1).tolist()
    assert norms[0]<1/2000
    endpoint=ps.values(I(np.full((1,len(points)),float(END))),np.arange(len(points))[None,:],2)
    endpoint_norms=[float(np.max(R.upper_norm(x))) for x in endpoint]
    prefix_bounds={'through':'89/32','all':np.max(early_per_path,axis=1).tolist(),'environmental':np.max(early_per_path[:,env],axis=1).tolist(),'target':early_per_path[:,76].tolist()}
    norm_report={'grade':'outward polynomial norms only; actual source envelopes require propagated errors','archive':str(archive),'archive_sha256':digest(archive),
                 'source_points':points.tolist(),'environmental_labels':env.tolist(),'norms':norms,'endpoint_norms':endpoint_norms,
                 'per_path_polynomial_norms':per_path.tolist(),'per_path_prefix_norms':early_per_path.tolist(),'prefix_bounds':prefix_bounds,
                 'prefix_profiles':[{'through':str(F(c,GRID)),'all':np.max(p,axis=1).tolist(),'environmental':np.max(p[:,env],axis=1).tolist(),'target':p[:,76].tolist(),'per_path_position':p[0].tolist()} for c,p in profiles.items()]}
    (OUT/'polynomial-bounds.json').write_text(json.dumps(norm_report,indent=2)+'\n')
    print(json.dumps({'phase':'polynomial_bounds','paths':len(points),'environmental_paths':len(env),'norms':norms,'endpoint_norms':endpoint_norms,'prefix_bounds':prefix_bounds,'edges':len(er)}),flush=True)
    offsets=points[env[er]]-incoming_points[es]
    signs=16*R.parity(points[env[er]])*R.parity(incoming_points[es])
    groups=scatter_groups(er)
    def rhs(t,values):
        result=zero_rhs(len(t.lo),len(env))
        for c in CENTERS:
            row,_=R.row_jet(t,values,points[env]-c,lambda s,j,d:R.vector_pulse(s,d),np.broadcast_to(env,t.lo.shape),np.nextafter(1/314928,np.inf))
            signs_old=16*R.parity(points[env])*R.parity(c)
            result=[a+signs_old[None,:,None]*b for a,b in zip(result,row.c)]
        tt=I(t.lo[:,er],t.hi[:,er]);rv=[I(v.lo[:,er,:],v.hi[:,er,:]) for v in values]
        row,roots=R.row_jet(tt,rv,offsets,lambda s,j,d:pb.values(s,j,d),np.broadcast_to(es,tt.lo.shape),np.nextafter(1/40000,np.inf))
        scatter(result,row,er,signs,groups)
        return result,roots
    steps=int((END-START)*GRID*args.subdivisions)
    maximum=stationary_max=emission_max=0.;worst=None;last=begun
    per_environmental_residual=np.zeros(len(env));per_environmental_stationary=np.zeros(len(env))
    temporal_residual=np.zeros(31)
    for first in range(0,steps,args.batch):
        indices=np.arange(first,min(steps,first+args.batch));shape=(len(indices),len(env));labels=np.broadcast_to(env,shape)
        lo=float(START)+indices*width;hi=lo+width;mid=lo+width/2
        tm=I(np.broadcast_to(mid[:,None],shape));ti=I(np.broadcast_to(lo[:,None],shape),np.broadcast_to(hi[:,None],shape))
        vm=ps.values(tm,labels,4);vi=ps.values(ti,labels,4)
        qm,_=rhs(tm,vm);qi,roots=rhs(ti,vi)
        defect=vm[2]-qm[0]+(vm[3]-qm[1])*I(-width/2,width/2)+(vi[4]/2-qi[2])*(I(0,width/2)**2)
        stationary=(22400*R.norm(vi[0])**3).hi
        total=(I(R.upper_norm(defect))+I(stationary)).hi
        per_environmental_residual=np.maximum(per_environmental_residual,np.max(total,axis=0))
        per_environmental_stationary=np.maximum(per_environmental_stationary,np.max(stationary,axis=0))
        for k,row in zip(indices,total):temporal_residual[int(k)//(32*args.subdivisions)]=max(temporal_residual[int(k)//(32*args.subdivisions)],float(max(row)))
        loc=np.unravel_index(int(np.argmax(total)),total.shape)
        if total[loc]>maximum:maximum=float(total[loc]);worst={'time':[float(ti.lo[loc]),float(ti.hi[loc])],'label':int(labels[loc])}
        stationary_max=max(stationary_max,float(np.max(stationary)));emission_max=max(emission_max,float(np.max(roots.hi)))
        if first==0 or time.perf_counter()-last>=20:
            print(json.dumps({'phase':'population_residual','cells_finished':int(indices[-1]+1),'cells_total':steps,'maximum':maximum,'seconds':time.perf_counter()-begun}),flush=True);last=time.perf_counter()
    report={'grade':'continuous full-law population residual; actual state bounds require accepted propagation',
            'known':checked,'archive':str(archive),'archive_sha256':digest(archive),'manifest_sha256':digest(MANIFEST),
            'g':16,'c_f':1,'horizon':str(END),'incoming_end':str(START),'grid':GRID,'subdivisions':args.subdivisions,
            'polynomial_norms':norms,'per_path_polynomial_norms':per_path.tolist(),'endpoint_polynomial_norms':endpoint_norms,'prefix_bounds':prefix_bounds,
            'per_path_prefix_norms':early_per_path.tolist(),'environmental_labels':env.tolist(),
            'incoming_source_points':incoming_points.tolist(),'generated_edges':[[int(i),int(j)] for i,j in zip(er,es)],
            'exact_zero_cuts':[str(c) for c in cuts],'prefix_bit_equality':'PASS; earlier source prefix, full target and reflected partner',
            'tail_residual':maximum,'stationary_max':stationary_max,'max_emission':emission_max,'worst':worst,
            'per_environmental_tail_residual':per_environmental_residual.tolist(),'per_environmental_stationary':per_environmental_stationary.tolist(),
            'inherited_environmental_residual':old['sources']['full_residual'],'inherited_target_residual':old['target']['full_residual'],
            'full_residual':max(maximum,old['sources']['full_residual'],old['target']['full_residual']),
            'time':[float(START),float(END)],'temporal_residual_bins':[{'from':str(F(73+k,32)),'through':str(F(74+k,32)),'residual':float(r)} for k,r in enumerate(temporal_residual)],'cells':steps,'seconds':time.perf_counter()-begun}
    (OUT/'population-residual.json').write_text(json.dumps(report,indent=2)+'\n')
    print(json.dumps({k:v for k,v in report.items() if k not in ['known','generated_edges','incoming_source_points','environmental_labels','exact_zero_cuts','per_path_polynomial_norms','per_path_prefix_norms','per_environmental_tail_residual','per_environmental_stationary']},indent=2),flush=True)


def target_residual(args):
    checked,manifest,archive,old,points,env,incoming_points,ps,pb,er,es,cuts=inputs()
    population_path=OUT/'population-residual.json';population=json.loads(population_path.read_text())
    assert population['archive_sha256']==digest(archive)
    candidate_path=PRIOR/'approximant/candidate.json';candidate=json.loads(candidate_path.read_text())
    target_archive=Path(candidate['array_file']);assert digest(target_archive)==candidate['array_sha256']
    assert candidate['horizon']=='15/4' and candidate['source_end']=='89/32'
    data=np.load(target_archive);prior=np.load(old['archive'])
    for q in ['y','v','a']:
        assert bit_equal(data['target_'+q][:3329],prior['target_'+q])
        assert bit_equal(ps.raw[['y','v','a'].index(q)][:2849,:361],data['source_'+q])
    assert bit_equal(points[:361],data['source_points'])
    pt=R.Paths(data['target_y'],data['target_v'],data['target_a'],1/GRID)
    target_norms=N.polynomial_bounds(pt,np.array([0]));assert target_norms[0]<1/500
    assert population['prefix_bounds']['all'][0]<1/8000
    assert F(15,4)-1+F(1,500)+F(1,2500)<F(89,32)
    sources=N.selected(CENTERS[1],points,cuts,F(15,4),F(1,64),F(1,8000))
    old_sources=set(old['target_generated_labels'])
    for j in sources:
        if int(j) in old_sources:continue
        m=sum(int(x)**2 for x in CENTERS[1]-points[j])
        limit=END+F(1,500)+F(1,8000)-cuts[j]
        assert limit<=0 or F(m)>limit**2
    offsets=CENTERS[1]-points[sources]
    signs=16*R.parity(CENTERS[1])*R.parity(points[sources])
    receiver_labels=np.zeros(len(sources),dtype=int);groups=scatter_groups(receiver_labels)
    begun=time.perf_counter();width=1/(GRID*args.subdivisions)
    def rhs(t,values):
        count=len(t.lo);result=zero_rhs(count,1)
        tt=I(np.broadcast_to(t.lo,(count,len(sources))),np.broadcast_to(t.hi,(count,len(sources))))
        rv=[I(np.broadcast_to(v.lo,(count,len(sources),3)),np.broadcast_to(v.hi,(count,len(sources),3))) for v in values]
        row,roots=R.row_jet(tt,rv,offsets,lambda s,j,d:ps.values(s,j,d),np.broadcast_to(sources,tt.lo.shape),np.nextafter(1/8000,np.inf))
        assert np.max(roots.hi)<89/32
        scatter(result,row,receiver_labels,signs,groups)
        return result,roots
    steps=int(F(1,2)*GRID*args.subdivisions)
    maximum=stationary_max=emission_max=0.;worst=None;last=begun
    for first in range(0,steps,args.batch):
        indices=np.arange(first,min(steps,first+args.batch));lo=13/4+indices*width;hi=lo+width;mid=lo+width/2
        tm=I(mid[:,None]);ti=I(lo[:,None],hi[:,None]);labels=np.zeros((len(indices),1),dtype=int)
        vm=pt.values(tm,labels,4);vi=pt.values(ti,labels,4)
        qm,_=rhs(tm,vm);qi,roots=rhs(ti,vi)
        defect=vm[2]-qm[0]+(vm[3]-qm[1])*I(-width/2,width/2)+(vi[4]/2-qi[2])*(I(0,width/2)**2)
        stationary=(22400*R.norm(vi[0])**3).hi;total=(I(R.upper_norm(defect))+I(stationary)).hi
        loc=np.unravel_index(int(np.argmax(total)),total.shape)
        if total[loc]>maximum:maximum=float(total[loc]);worst={'time':[float(ti.lo[loc]),float(ti.hi[loc])]}
        stationary_max=max(stationary_max,float(np.max(stationary)));emission_max=max(emission_max,float(np.max(roots.hi)))
        if first==0 or time.perf_counter()-last>=20:
            print(json.dumps({'phase':'target_residual','cells_finished':int(indices[-1]+1),'cells_total':steps,'maximum':maximum,'seconds':time.perf_counter()-begun}),flush=True);last=time.perf_counter()
    report={'grade':'continuous full-law target residual; actual continuation and propagated errors remain required',
            'known':checked,'target_archive':str(target_archive),'target_archive_sha256':digest(target_archive),
            'source_archive':str(archive),'source_archive_sha256':digest(archive),'population_receipt_sha256':digest(population_path),
            'g':16,'c_f':1,'time':['13/4','15/4'],'source_cut':'89/32','grid':GRID,'subdivisions':args.subdivisions,
            'target_polynomial_norms':target_norms,'target_source_labels':sources.tolist(),'target_source_count':len(sources),
            'prefix_bit_equality':'PASS; complete accepted target and all361 numerical source prefixes',
            'tail_residual':maximum,'full_residual':max(maximum,old['target']['full_residual']),
            'stationary_max':stationary_max,'max_emission':emission_max,'worst':worst,'cells':steps,'seconds':time.perf_counter()-begun}
    (OUT/'target-residual.json').write_text(json.dumps(report,indent=2)+'\n')
    print(json.dumps(report,indent=2),flush=True)


if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('mode',choices=['known','residual','target'])
    parser.add_argument('--manifest',default=str(MANIFEST))
    parser.add_argument('--output-dir',default=str(OUT))
    parser.add_argument('--subdivisions',type=int,choices=[4,8,16],default=4)
    parser.add_argument('--batch',type=int,default=8)
    args=parser.parse_args();MANIFEST=Path(args.manifest);OUT=Path(args.output_dir)
    known() if args.mode=='known' else target_residual(args) if args.mode=='target' else residual(args)
