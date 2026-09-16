"""Complete affected-population polynomial proposal through 13/4.

This is a proof-candidate constructor, not a production EOM solver. The unchanged
infinite stationary block field must be covered by the independent residual.
All source queries use immutable histories through 73/32; no extrapolation.
"""
import argparse
from fractions import Fraction as F
import hashlib
import importlib.util
import itertools
import json
from math import isqrt
from pathlib import Path
import time

import numpy as np
from scipy.integrate import solve_ivp

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[3]
OUT = ROOT / '.local-data/master-equation-closure/population-restart/approximant'
PRIOR = ROOT / '.local-data/master-equation-closure/next-maximum/approximant/candidate.npz'
INCOMING = PRIOR.with_name('bridge-h13-4.npz')
GRID = 1024
START, END, INCOMING_END = F(89, 32), F(13, 4), F(73, 32)


def digest(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def dependencies():
    path = HERE / 'smooth-two-particle-next-maximum-approximant.py'
    spec = importlib.util.spec_from_file_location('frozen_maximum_proposal', path)
    M = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(M)
    P, A, N, _ = M.dependencies()
    return M, P, A, N


def first_zero(m):
    """Exact lower grid cut for sqrt(m)-11/8, with no floating square root."""
    return F(isqrt(int(m) * GRID * GRID) - 11 * GRID // 8, GRID)


def known():
    M, P, A, N = dependencies()
    cube = np.array(list(itertools.product(range(-1, 2), repeat=3)))
    assert len(cube[np.sum(cube*cube, axis=1) == 1]) == 6
    shell, environment = M.first_shell(np.array([[0,0,0],[1,0,0],[0,1,1],[-2,0,0],[0,2,2]]))
    assert shell.tolist() == [100000,100000,2,4,8]
    assert environment.tolist() == [False,False,True,True,True]
    assert first_zero(4) == F(5,8) and first_zero(9) == F(13,8)
    assert first_zero(2) == F(5,128)
    for m in range(2, 23):
        cut = first_zero(m) + F(11,8)
        assert cut*cut <= m < (cut+F(1,GRID))**2
    triples = [F(1,3),F(-1,5),F(2,7),F(4,9),F(5,11),F(-6,13)]
    c = A.exact_coeff(*triples, F(1,GRID))
    assert [A.exact_eval(c,F(0),F(1,GRID),k) for k in range(3)] == triples[:3]
    assert [A.exact_eval(c,F(1),F(1,GRID),k) for k in range(3)] == triples[3:]
    tt = np.arange(GRID+1)/GRID
    y = np.zeros((GRID+1,1,3)); v = y.copy(); a = y.copy()
    y[:,0,2] = tt**5+tt*tt; v[:,0,2] = 5*tt**4+2*tt; a[:,0,2] = 20*tt**3+2
    coeff = A.coeff_arrays(y,v,a,1/GRID)
    s = np.array([-1.,0.,.25,1.]); idx = np.zeros(4,dtype=int)
    yy,vv = P.history(A,coeff,1.,s,idx); ss = np.maximum(s,0)
    assert np.max(abs(yy[:,2]-ss**5-ss*ss)) < 1e-14
    assert np.max(abs(vv[:,2]-5*ss**4-2*ss)) < 1e-14
    try:
        P.history(A,coeff,1.,np.array([1.01]),np.array([0]))
    except AssertionError:
        pass
    else:
        raise AssertionError('future history extrapolated')
    probe = np.array([[[1.,2.,3.],[-4.,5.,-6.]]])
    assert np.array_equal(P.reflected(probe),[[[-1.,2.,3.],[4.,5.,-6.]]])
    assert np.array_equal(P.reflected(P.reflected(probe)),probe)
    ri,si,_ = P.pairs(np.array([[0,0,0],[1,0,0]]),np.array([[0,0,0],[1,0,0],[0,1,0]]),1)
    assert list(zip(ri,si)) == [(0,1),(0,2),(1,0)]
    assert np.array_equal(N.delta_row(np.array([[1.,2.,3.]]),np.zeros((1,3)),np.zeros((1,3))),np.zeros((1,3)))
    constant = np.array([[[0.,3.,4.]],[[0.,3.,4.]]])
    norm_control = norms(A,[constant,np.zeros_like(constant),np.zeros_like(constant)])
    assert norm_control['global']=={'0':5.,'1':0.,'2':0.,'3':0.}
    assert json.loads(json.dumps(norm_control))==norm_control
    OUT.mkdir(parents=True,exist_ok=True)
    rec = {'result':'PASS','source_sha256':digest(__file__),'controls':['six exact unit neighbors','known first-old shell identities','exact rational lower zero cuts including irrational roots','exact rational C2 endpoint conditions','known quintic history and zero past','future-history rejection','exact plane reflection and involution','ordered pairs including both targets and excluding self','zero changed row']}
    (OUT/'known.json').write_text(json.dumps(rec,indent=2)+'\n')
    print(json.dumps(rec),flush=True)


def prepare():
    checked = json.loads((OUT/'known.json').read_text()); assert checked['result']=='PASS'
    M,P,A,N = dependencies()
    pm = json.loads(PRIOR.with_suffix('.json').read_text())
    im = json.loads(INCOMING.with_suffix('.json').read_text())
    assert digest(PRIOR)==pm['array_sha256']
    assert digest(INCOMING)==im['array_sha256']
    assert pm['source_interval']==['0',str(START)]
    assert im['source_interval']==['0',str(INCOMING_END)]
    old,inc = np.load(PRIOR),np.load(INCOMING)
    assert np.array_equal(old['source_points'][76],[0,0,0])
    assert np.array_equal(inc['target_points'],[[1,0,0]])
    cube = np.array(list(itertools.product(range(-5,7),range(-5,6),range(-5,6))),dtype=int)
    first_m,valid = M.first_shell(cube)
    max_m = int((END+F(11,8))**2)
    chosen = cube[valid & (first_m<=max_m)]
    previous = {tuple(p) for p in old['source_points']}
    extra = np.array([p for p in chosen if tuple(p) not in previous],dtype=int).reshape(-1,3)
    points = np.concatenate([old['source_points'],extra])
    env = np.concatenate([old['environment_labels'],np.arange(len(old['source_points']),len(points))])
    incoming_points = np.concatenate([inc['source_points'],inc['target_points']])
    assert len(np.unique(points,axis=0))==len(points)
    assert len(np.unique(incoming_points,axis=0))==len(incoming_points)
    shell,_ = M.first_shell(points)
    zero_cuts = pm['source_exact_zero_through']+[str(first_zero(m)) for m in shell[len(old['source_points']):]]
    assert all(F(cut)>=START for cut in zero_cuts[len(old['source_points']):])
    ri,si,offset = P.pairs(points[env],incoming_points,10)
    edges = np.stack([env[ri],si],axis=1)
    # Full candidate lists retain inactive rows for independent causal filtering.
    old_edges = np.array([(int(i),j) for i in env for j in range(2)],dtype=int)
    report = {'grade':'numerical construction plan; independent causal census required','horizon':str(END),'source_interval':['0',str(END)],'target_interval':['0',str(END)],'source_start':str(START),'source_end':str(END),'incoming_source_interval':['0',str(INCOMING_END)],'source_points':points.tolist(),'incoming_source_points':incoming_points.tolist(),'environment_labels':env.tolist(),'environment_paths':len(env),'source_paths':len(points),'represented_identities':len(points)+1,'new_environmental_paths':len(extra),'first_old_shell_counts':{str(int(m)):int(np.sum(shell[env]==m)) for m in sorted(set(shell[env]))},'source_exact_zero_through':zero_cuts,'source_generated_rows':len(si),'source_old_candidate_rows':len(old_edges),'source_generated_max_squared_range':10,'incoming_source_archive':str(INCOMING),'incoming_source_archive_sha256':digest(INCOMING),'source_archive':str(PRIOR),'source_archive_sha256':digest(PRIOR),'partner_index':76,'incoming_right_target_index':len(inc['source_points']),'source_sha256':digest(__file__),'known':checked}
    return M,P,A,N,old,inc,report,points,env,ri,si,offset,edges,old_edges


def plan():
    M,P,A,N,old,inc,report,points,env,ri,si,offset,edges,old_edges = prepare()
    prior_norms = norms(A,[old['source_'+q] for q in ['y','v','a']])
    prior_env = old['environment_labels']
    report['inherited_prefix_diagnostic_norms'] = {'all_sources':prior_norms['global'],'environment_only':{k:max(v[j] for j in prior_env) for k,v in prior_norms['per_path'].items()},'partner_only':{k:v[76] for k,v in prior_norms['per_path'].items()}}
    (OUT/'plan.json').write_text(json.dumps(report,indent=2)+'\n')
    print(json.dumps({k:v for k,v in report.items() if k not in ['source_points','incoming_source_points','environment_labels','source_exact_zero_through']},indent=2),flush=True)


def norms(A,arrays):
    coeff = A.coeff_arrays(*arrays,1/GRID)
    per_path = {}
    for order in range(4):
        cc = coeff
        for _ in range(order):
            cc = np.array([j*cc[j] for j in range(1,len(cc))])
        absolute = np.sum(abs(cc),axis=0)*GRID**order
        per_path[str(order)] = np.asarray(np.max(np.linalg.norm(absolute,axis=-1),axis=0),dtype=float).tolist()
    return {'global':{k:max(v) for k,v in per_path.items()},'per_path':per_path}


def target():
    M,P,A,N,old,inc,report,points,env,ri,si,offset,edges,old_edges = prepare()
    begun = time.perf_counter(); last_heartbeat = begun
    incoming_points = np.array(report['incoming_source_points']); ne = len(env); ns = len(points)
    prefix_count = int(START*GRID)+1; count = int(END*GRID)+1
    incoming_count = int(INCOMING_END*GRID)+1
    incoming_arrays = [np.concatenate([inc['source_'+q],inc['target_'+q][:incoming_count]],axis=1) for q in ['y','v','a']]
    coeff = A.coeff_arrays(*incoming_arrays,1/GRID)
    signs = 16*N.polarity(points[env[ri]])*N.polarity(incoming_points[si])
    max_emission = max_root_error = 0.; min_range = min_D = float('inf'); calls = 0
    def acc(t,y):
        nonlocal max_emission,max_root_error,min_range,min_D,last_heartbeat,calls
        calls += 1; now = time.perf_counter()
        if now-last_heartbeat>=5:
            print(json.dumps({'progress':'population append','time':t,'wall_seconds':now-begun,'acceleration_evaluations':calls}),flush=True)
            last_heartbeat = now
        aa = N.old_rows(t,points[env],y); R0 = offset+y[ri]
        s = t-np.linalg.norm(R0,axis=-1)
        for _ in range(4):
            pp,vv = P.history(A,coeff,float(INCOMING_END),s,si)
            rv = R0-pp; r = np.linalg.norm(rv,axis=-1); D = 1-np.sum(rv*vv,axis=-1)/r
            s -= (s+r-t)/D
        pp,vv = P.history(A,coeff,float(INCOMING_END),s,si)
        rv = R0-pp; r = np.linalg.norm(rv,axis=-1); D = 1-np.sum(rv*vv,axis=-1)/r
        max_emission = max(max_emission,float(np.max(s)))
        max_root_error = max(max_root_error,float(np.max(abs(s+r-t))))
        min_range = min(min_range,float(np.min(r))); min_D = min(min_D,float(np.min(D)))
        assert min_range>0 and min_D>0
        np.add.at(aa,ri,signs[:,None]*N.delta_row(R0,pp,vv))
        return aa
    arrays = {q:np.zeros((count,ns,3)) for q in ['y','v','a']}
    for q in arrays:
        arrays[q][:prefix_count,:len(old['source_points'])] = old['source_'+q]
    initial = np.stack([arrays['y'][prefix_count-1,env],arrays['v'][prefix_count-1,env]]).ravel()
    def rhs(t,state):
        y,v = state.reshape(2,ne,3)
        return np.stack([v,acc(t,y)]).ravel()
    sol = solve_ivp(rhs,(float(START),float(END)),initial,method='DOP853',atol=1e-19,rtol=3e-13,max_step=1/GRID,dense_output=True)
    assert sol.success
    tt = np.arange(prefix_count,count)/GRID
    values = sol.sol(tt).T.reshape(-1,2,ne,3)
    for q,k in [('y',0),('v',1)]:
        arrays[q][prefix_count:,env] = values[:,k]
    arrays['a'][prefix_count:,env] = np.array([acc(t,y) for t,y in zip(tt,values[:,0])])
    for q in arrays:
        arrays[q][:,76:77] = P.reflected(inc['target_'+q])
        for j in range(len(old['source_points']),ns):
            arrays[q][:int(F(report['source_exact_zero_through'][j])*GRID)+1,j] = 0
        assert np.array_equal(arrays[q][:prefix_count,:len(old['source_points'])],old['source_'+q])
        assert np.array_equal(arrays[q][:,76:77],P.reflected(inc['target_'+q]))
        assert np.array_equal(inc['target_'+q],old['target_'+q][:count])
    nodes = {'source_'+q:arrays[q] for q in arrays}
    nodes.update({'target_'+q:inc['target_'+q] for q in arrays})
    nodes.update(source_points=points,target_points=inc['target_points'],source_edges=edges,source_old_edges=old_edges,old_source_points=N.CENTERS.astype(int),incoming_source_points=incoming_points,environment_labels=env)
    # Preserve the accepted right-target incoming graph explicitly; it refers to
    # incoming_source_points, not the larger simultaneous population table.
    nodes['target_edges'] = inc['target_edges']
    archive = OUT/'candidate.npz'; np.savez_compressed(archive,**nodes)
    source_norms = norms(A,[arrays[q] for q in ['y','v','a']])
    target_norms = norms(A,[inc['target_'+q] for q in ['y','v','a']])
    report['diagnostic_environment_norms'] = {k:max(v[j] for j in env) for k,v in source_norms['per_path'].items()}
    report['diagnostic_partner_norms'] = {k:v[76] for k,v in source_norms['per_path'].items()}
    report['environment_endpoint_norms'] = {'position':float(np.max(np.linalg.norm(arrays['y'][-1,env],axis=-1))),'velocity':float(np.max(np.linalg.norm(arrays['v'][-1,env],axis=-1))),'acceleration':float(np.max(np.linalg.norm(arrays['a'][-1,env],axis=-1)))}
    report.update(grade='exact dyadic full-population polynomial proposal; full-law residual and propagated error required',g=16,c_f=1,step_numerator=1,step_denominator=GRID,source_max_emission=max_emission,incoming_emission_margin=float(INCOMING_END)-max_emission,max_root_residual=max_root_error,diagnostic_min_causal_range=min_range,diagnostic_min_transmitter_factor=min_D,diagnostic_polynomial_norm_bounds={'source':source_norms['global'],'target':target_norms['global']},diagnostic_source_norms_by_path=source_norms['per_path'],source_endpoint_position_norms=np.linalg.norm(arrays['y'][-1],axis=-1).tolist(),source_endpoint_velocity_norms=np.linalg.norm(arrays['v'][-1],axis=-1).tolist(),array_file=str(archive),array_sha256=digest(archive),seconds=time.perf_counter()-begun,acceleration_evaluations=calls,shape='All source and target node arrays are [time,path,axis] through13/4. source_edges=[receiver index in source_points, transmitter index in incoming_source_points]. source_old_edges use old_source_points. target_edges refer to incoming_source_points and preserve the accepted right-target graph.',preservation='First361 source histories through89/32 preserved exactly; all new environmental histories zero before declared cuts; right target through13/4 copied exactly; source76 its exact plane reflection.',stationary_background='Omitted only in numerical center; full unchanged infinite stationary block field required in independent residual.',producer_dependencies={p.name:digest(p) for p in [HERE/'smooth-two-particle-next-maximum-approximant.py',HERE/'smooth-two-particle-next-minimum-approximant.py',HERE/'smooth-two-particle-later-approximant.py',HERE/'smooth-two-particle-later-nonlinear.py']})
    (OUT/'candidate.json').write_text(json.dumps(report,indent=2)+'\n')
    omitted = ['source_points','incoming_source_points','environment_labels','source_exact_zero_through','diagnostic_source_norms_by_path','source_endpoint_position_norms','source_endpoint_velocity_norms']
    print(json.dumps({k:v for k,v in report.items() if k not in omitted},indent=2),flush=True)


if __name__=='__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('mode',choices=['known','plan','target'])
    args = parser.parse_args()
    {'known':known,'plan':plan,'target':target}[args.mode]()
