"""Conditional frozen-history bounds on six external source rows near a close pair.
Floating arithmetic on retained Hermite history; no exact-trajectory enclosure.
"""
import argparse, json, pathlib
import numpy as np
ROOT=pathlib.Path(__file__).resolve().parents[5]; OUT=ROOT/'.local-data/master-equation-closure/overnight-d'

def acceleration_max(T,X,V,j,lo,hi):
    best=0.
    k0=max(0,np.searchsorted(T,lo,side='right')-1)
    for k in range(k0,len(T)-1):
        if T[k]>hi: break
        h=T[k+1]-T[k]; q0=max(0.,(lo-T[k])/h); q1=min(1.,(hi-T[k])/h)
        if q0>q1: continue
        a=6*(X[k,j]-X[k+1,j])/h+3*(V[k,j]+V[k+1,j]); b=6*(X[k+1,j]-X[k,j])/h-4*V[k,j]-2*V[k+1,j]
        best=max(best,float(np.linalg.norm((2*a*q0+b)/h)),float(np.linalg.norm((2*a*q1+b)/h)))
    return best

def row_bound(r,D,M,h):
    eps=8*h/D; rmin=r-h-eps
    # Assumes exact unit speed on the supplied history; diagnostics remain conditional.
    loss=2*(h+eps)/rmin+M*eps if rmin>0 else float('inf')
    return dict(eps=eps,rmin=rmin,loss=loss,admitted=rmin>0 and loss<D/2,bound=2/(D*rmin*rmin) if rmin>0 else None)

def controls():
    T=np.array([0.,1.]); X=np.array([[[0.,0,0]], [[-.5,0,0]]]); V=np.zeros_like(X)
    M=acceleration_max(T,X,V,0,.25,.75)
    assert abs(M-1.5)<1e-14 # derivative 6q-3 on the restricted interval
    b=row_bound(3.,1.,0.,.001); assert b['admitted'] and b['bound']>1/9
    print(json.dumps(dict(control='Hermite acceleration and static row',M=M,status='PASS')),flush=True)

if __name__=='__main__':
    p=argparse.ArgumentParser(); p.add_argument('tag'); args=p.parse_args(); controls()
    r=json.loads((OUT/(args.tag+'.json')).read_text()); a=np.load(OUT/(args.tag+'.npz')); T,X,V=a['T'],a['X'],a['V']; f=r['final']; pair=r['summary']['contact']['pair']; rows=[q for q in f['roots'] if q['i'] in pair and q['j'] not in pair]
    current={str(i):sum(q['row_norm'] for q in rows if q['i']==i) for i in pair}
    mutual={str(i):next(q['row_norm'] for q in f['roots'] if q['i']==i and q['j'] in pair) for i in pair}
    trials=[]
    for h in [.001,.0005,.0001,.00005,.00001]:
        bounds=[]
        for q in rows:
            eps=8*h/q['Dt']; lo=q['s']-eps; hi=q['s']+eps
            if lo<0 or hi>=T[-1]:
                bounds.append(dict(i=q['i'],j=q['j'],admitted=False,reason='source bracket not inside post-kick known history')); continue
            M=acceleration_max(T,X,V,q['j'],lo,hi); b=row_bound(q['tau'],q['Dt'],M,h); b.update(i=q['i'],j=q['j'],M=M,s=q['s']); bounds.append(b)
        admitted=all(b['admitted'] for b in bounds)
        totals={str(i):sum(b['bound'] for b in bounds if b['i']==i) for i in pair} if admitted else None
        trials.append(dict(h=h,admitted=admitted,totals=totals,rows=bounds))
    result=dict(pair=pair,T=f['t'],current_external_row_norm_sum=current,current_mutual_row_norm=mutual,trials=trials)
    (OUT/(args.tag+'-background.json')).write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps({k:v for k,v in result.items() if k!='trials'})); print(json.dumps([{k:v for k,v in t.items() if k!='rows'} for t in trials]))
