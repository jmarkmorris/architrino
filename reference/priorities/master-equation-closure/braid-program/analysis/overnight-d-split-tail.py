"""Candidate screening for overnight-d-split-history-tail.md.
Samples retained interpolation; never an exact or continuous certificate.
Known controls run before loading any target.
"""
import argparse, json, pathlib
import numpy as np
ROOT=pathlib.Path(__file__).resolve().parents[5]
OUT=ROOT/'.local-data/master-equation-closure/overnight-d'

def causal_cap_max(a,ell,w):
    radius=np.linalg.norm(a,axis=-1); beta=np.clip(ell/radius,0.,1.)
    q=np.sum(a*w,axis=-1)/radius; speed=np.linalg.norm(w,axis=-1)
    rim=beta*q+np.sqrt(np.maximum(0.,1-beta*beta))*np.sqrt(np.maximum(0.,speed*speed-q*q))
    return np.where(q>=beta*speed,speed,rim)

def old_bound(a,ell,w):
    radius=np.linalg.norm(a,axis=-1); delta=1-causal_cap_max(a,ell,w)
    k=int(np.argmin(delta)); D=float(delta[k]); R=float(np.min((radius+ell)/2))
    return dict(delta=D,R=R,B=2/(D*R) if D>0 and R>0 else None,witness_index=k,minimum_entry_gap=float(np.min(radius-ell)))

def future_bound(delta,U,W,eta_i,eta_j):
    relative=U-W; e=relative/np.linalg.norm(relative); d=e@delta; v=e@relative; c=v-eta_i-eta_j
    m=v-eta_i
    Dt=max(1-np.linalg.norm(W)-eta_j,(1-W@W+max(m,0)**2)/2-eta_j,max(c,0)**2/2)
    z=1-e@W-eta_j
    if d<=0 or c<=0: return dict(admitted=False,d=float(d),c=float(c),Dt=float(Dt))
    assert z>c, 'capped anchors and positive radii require z>c'
    if Dt<=0: return dict(admitted=False,d=float(d),c=float(c),Dt=float(Dt))
    return dict(admitted=True,B=float(z*(z-c)/(Dt*c*d)),onset=float(d/(z-c)),d=float(d),c=float(c),Dt=float(Dt))

def sampled_history(T,X,V,j,start):
    k0=max(0,np.searchsorted(T,start,side='right')-1)
    q=np.tile([0.,.5,1.],len(T)-1-k0); k=np.repeat(np.arange(k0,len(T)-1),3)
    times=T[k]+q*(T[k+1]-T[k]); times=np.concatenate(([start],times[times>=start]))
    k=np.minimum(np.searchsorted(T,times,side='right')-1,len(T)-2)
    h=T[k+1]-T[k]; q=(times-T[k])/h
    dx=X[k+1,j]-X[k,j]; a=3*dx-h[:,None]*(2*V[k,j]+V[k+1,j]); b=-2*dx+h[:,None]*(V[k,j]+V[k+1,j])
    pos=X[k,j]+q[:,None]*h[:,None]*V[k,j]+q[:,None]**2*a+q[:,None]**3*b
    vel=V[k,j]+2*q[:,None]*a/h[:,None]+3*q[:,None]**2*b/h[:,None]
    return times,pos,vel

def prepare(T,X,V,roots):
    rows=[]
    for root in roots:
        i,j=root['i'],root['j']; assert root['s']>0
        ts,xs,vs=sampled_history(T,X,V,j,root['s'])
        ob=old_bound(X[-1,i]-xs,T[-1]-ts,vs); ob['witness_s']=float(ts[ob.pop('witness_index')])
        rows.append(dict(i=i,j=j,old=ob))
    return rows

def assess(X,U,old,eta):
    totals=np.zeros(len(U)); rows=[]
    for row in old:
        i,j=row['i'],row['j']; ob=row['old']; fb=future_bound(X[i]-X[j],U[i],U[j],eta[i],eta[j])
        total=ob['B']+fb['B'] if ob['B'] is not None and fb['admitted'] else np.inf
        totals[i]+=total; rows.append(dict(**row,future=fb,total=float(total) if np.isfinite(total) else None))
    return totals,rows

def controls():
    a=np.array([[2.,0,0],[2.,0,0],[2.,0,0]]); ell=np.array([2.,1.,0.]); w=np.tile([0.,.5,0],(3,1))
    assert np.allclose(causal_cap_max(a,ell,w),[0.,np.sqrt(3)/4,.5],rtol=0,atol=1e-14)
    b=old_bound(a[:1],ell[:1],w[:1]); assert b['R']==2 and b['B']==1
    b=future_bound(np.array([2.,0,0]),np.array([.5,0,0]),np.array([-.5,0,0]),0.,0.)
    assert abs(b['onset']-4)<1e-14 and abs(b['Dt']-.875)<1e-14 and abs(b['B']-3/7)<1e-14
    b=future_bound(np.array([2.,0,0]),np.array([.5,0,0]),np.array([-.5,0,0]),.1,.1)
    assert abs(b['Dt']-.68)<1e-14 and abs(b['B']-105/136)<1e-14
    T=np.array([0.,1.]); X=np.array([[[0.,0,0]],[[.3,0,0]]]); V=np.array([[[.3,0,0]],[[.3,0,0]]])
    ts,xs,vs=sampled_history(T,X,V,0,.2)
    assert np.max(abs(xs[:,0]-.3*ts))<1e-14 and np.max(abs(vs-[.3,0,0]))<1e-14
    print(json.dumps(dict(control='causal spherical cap, old impulse, ballistic onset, linear history',status='PASS')),flush=True)

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('tag');args=p.parse_args();controls()
    r=json.loads((OUT/(args.tag+'.json')).read_text()); h=np.load(OUT/(args.tag+'.npz')); T,X,V=h['T'],h['X'],h['V']; U=V[-1]
    old=prepare(T,X,V,r['final']['roots']); result=[]
    for eta in [.01,.02,.04,.06,.08,.10,.12,.15,.18]:
        totals,rows=assess(X[-1],U,old,np.full(len(U),eta))
        result.append(dict(eta=eta,totals=[float(x) if np.isfinite(x) else None for x in totals],candidate=bool(np.all(totals<eta)),rows=rows))
    oldtot=np.zeros(len(U))
    for row in old: oldtot[row['i']]+=row['old']['B'] if row['old']['B'] is not None else np.inf
    output=dict(grade='sampled candidate screen, no exact certificate',old_totals=oldtot.tolist(),scans=result)
    (OUT/(args.tag+'-causal-split-tail.json')).write_text(json.dumps(output,indent=2)+'\n')
    print(json.dumps(dict(old_totals=output['old_totals'],scans=[{k:v for k,v in x.items() if k!='rows'} for x in result]),indent=2))
