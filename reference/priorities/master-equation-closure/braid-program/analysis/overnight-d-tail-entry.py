"""Floating diagnostics for the sufficient tail condition, never an interval certificate.
Known linear and cubic Hermite extrema are checked before loading target data.
"""
import argparse, json, pathlib
import numpy as np
ROOT=pathlib.Path(__file__).resolve().parents[5]
OUT=ROOT/'.local-data/master-equation-closure/overnight-d'

def segment_max(x0,x1,v0,v1,h,U,qlo=0.):
    # v(q)-U = a*q^2+b*q+c, q in [qlo,1].
    a=6*(x0-x1)/h+3*(v0+v1); b=6*(x1-x0)/h-4*v0-2*v1; c=v0-U
    # derivative of squared norm / 2.
    coeff=[2*a.dot(a),3*a.dot(b),b.dot(b)+2*a.dot(c),b.dot(c)]
    coeff=np.trim_zeros(np.asarray(coeff),'f')
    qs=[qlo,1.]
    if len(coeff)>1:
        qs += [float(q.real) for q in np.roots(coeff) if abs(q.imag)<1e-10 and qlo<q.real<1]
    vals=[float(np.linalg.norm((a*q+b)*q+c)) for q in qs]
    k=int(np.argmax(vals)); return vals[k],qs[k]

def history_max(T,X,V,U,smin):
    best=np.zeros(len(U)); when=np.zeros(len(U))
    k0=max(0,np.searchsorted(T,smin,side='right')-1)
    for k in range(k0,len(T)-1):
        h=T[k+1]-T[k]; qlo=max(0.,(smin-T[k])/h)
        for j in range(len(U)):
            value,q=segment_max(X[k,j],X[k+1,j],V[k,j],V[k+1,j],h,U[j],qlo)
            if value>best[j]: best[j]=value; when[j]=T[k]+h*q
    return best,when

def assess(T,X,V,roots):
    U=V[-1]; earliest=min(x['s'] for x in roots)
    assert earliest>0, 'this diagnostic only handles the retained post-kick history'
    # An endpoint at earliest is a necessary lower bound on every strict S_* choice.
    eta,when=history_max(T,X,V,U,earliest)
    L=T[-1]-earliest; rows=[]
    for i in range(len(U)):
        for j in range(len(U)):
            if i==j: continue
            delta=X[-1,i]-X[-1,j]; d=np.linalg.norm(delta); e=delta/d; radial=e.dot(U[i]-U[j]); c=radial-eta[i]-eta[j]; m=min(d/L,c)-2*eta[j]
            rows.append(dict(i=i,j=j,d=float(d),radial=float(radial),c=float(c),m=float(m),B_term=float(8/(m*m*c*d)) if m>0 and c>0 else None))
    return dict(earliest_source=earliest,earliest_over_T=earliest/T[-1],L=L,minimum_required_eta=eta.tolist(),maxima_times=when.tolist(),rows=rows,min_c=min(x['c'] for x in rows),min_m=min(x['m'] for x in rows))

def controls():
    z=np.zeros(3); v=np.array([.3,0,0])
    m,q=segment_max(z,v,v,v,1,v); assert m<1e-14
    # x(q)=q^3-1.5q^2, v(q)=3q^2-3q, maximum |v|=.75 at q=.5.
    m,q=segment_max(z,np.array([-.5,0,0]),z,z,1,z)
    assert abs(m-.75)<1e-14 and abs(q-.5)<1e-14
    print(json.dumps(dict(control='linear and cubic Hermite velocity extrema',status='PASS',cubic_max=m,q=q)),flush=True)

if __name__=='__main__':
    p=argparse.ArgumentParser(); p.add_argument('tag'); args=p.parse_args(); controls()
    r=json.loads((OUT/(args.tag+'.json')).read_text()); a=np.load(OUT/(args.tag+'.npz'))
    result=assess(a['T'],a['X'],a['V'],r['final']['roots'])
    (OUT/(args.tag+'-entry.json')).write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps({k:v for k,v in result.items() if k!='rows'})); print('worst',min(result['rows'],key=lambda x:x['c']))
