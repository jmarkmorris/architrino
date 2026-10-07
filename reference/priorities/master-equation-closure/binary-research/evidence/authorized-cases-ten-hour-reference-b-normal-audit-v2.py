"""Independent exact forward-map conjugacy audit using SymPy Gaussian rings."""
import argparse, hashlib, json, signal, time, resource
from pathlib import Path
from fractions import Fraction
from sympy.polys.rings import ring
from sympy.polys.ring_series import rs_mul
from sympy.polys.domains import QQ_I
R,d,q,b=ring('d,q,b',QQ_I)
I=QQ_I(0,1)
N=16
start=time.monotonic()
def tick(label):
    assert resource.getrusage(resource.RUSAGE_SELF).ru_maxrss<2*1024**3
    print(json.dumps({'stage':label,'seconds':time.monotonic()-start}),flush=True)
def cut(p):return R.from_dict({k:v for k,v in p.items() if k[0]<=N})
def mul(a,c):return rs_mul(a,c,d,N+1)
def power(a,n):
    out=R.one
    while n:
        if n&1:out=mul(out,a)
        n//=2
        if n:a=mul(a,a)
    return out
def loadpoly(rows):
    out=R.zero
    for k,re,im in rows:
        assert tuple(k) not in out
        out[tuple(k)]=QQ_I(QQ_I.dom(re),QQ_I.dom(im))
    return out
def conjugate(p):return R.from_dict({(n,k,j):QQ_I(v.x,-v.y) for (n,j,k),v in p.items()})
def act(v,f):return mul(v[0],f.diff(q))+mul(v[1],f.diff(b))+mul(v[2],d*f.diff(d))
def compose(f,maps):
    global N
    fullN=N
    # Taylor in the two coordinate increments. The parameter multiplier is exact.
    aq,ab=maps[0]-q,maps[1]-b
    kmax=N//2
    ap=[R.one];bp=[R.one];sp=[R.one]
    for k in range(1,kmax+1):ap.append(mul(ap[-1],aq));bp.append(mul(bp[-1],ab))
    for k in range(1,N+1):sp.append(mul(sp[-1],maps[2]))
    out=R.zero
    for n in range(fullN+1):
        N=fullN-n
        tick("compose-order-"+str(n))
        f0=R.from_dict({(0,j,k):v for (e,j,k),v in f.items() if e==n})
        if not f0:continue
        cap=N//2
        inner=R.zero
        fj=f0
        for j in range(cap+1):
            if j:fj=fj.diff(q)/j
            fk=fj
            for k in range(cap-j+1):
                if k:fk=fk.diff(b)/k
                if fk:inner+=mul(fk,mul(ap[j],bp[k]))
        term=mul(sp[n],inner)
        N=fullN
        out+=cut(d**n*term)
    N=fullN
    return cut(out)
def residual(field,normal,maps):
    return [act(normal,maps[j])-compose(field[j],maps) for j in (0,1)]+[act(normal,maps[2])+mul(maps[2],normal[2])-mul(maps[2],compose(field[2],maps))]
def exact_maps(gens):
    maps=[q,b,R.one]
    for ix,g in enumerate(gens):
        step=ix+2
        tick('independent-flow-'+str(step))
        for a in range(3):
            term=maps[a];out=term
            for k in range(1,N//step+1):
                term=(act(g,term)+(mul(g[2],term) if a==2 else R.zero))/k
                if not term:break
                out+=term
            maps[a]=cut(out)
    return maps
def norm(p):return sum((abs(Fraction(str(v.x)))+abs(Fraction(str(v.y))))*4**(j+k) for (n,j,k),v in p.items())
def scalarnorm(p,axis):
    return sum((abs(Fraction(str(v.x)))+abs(Fraction(str(v.y))))*4**k for (n,j,k),v in p.items() if n>0)
def inputfield(aut):
    w=1+(q+b)/2;u=(q-b)*(-I/2)
    fr,ft=R.zero,R.zero
    for n,axes in enumerate(aut['polar_coefficients']):
        if n<2:continue
        for axis,rows in enumerate(axes):
            for (ee,z,a,p,t),c in rows:
                assert ee==z==0 and 2*a+p+t==n and t%2==axis
                value=d**n*w**(a+t-axis)*u**p*QQ_I.dom(c)
                if axis:ft+=value
                else:fr+=value
    f=I*q+2*w*ft+I*(u*ft+fr)
    return [cut(f),conjugate(cut(f)),cut(-ft)]
def known():
    global N
    N=6
    assert mul(q+b,q-b)==q*q-b*b
    # Exact nonlinear map old q=q/(1-d²q), generator d²q²; conjugate second row.
    maps=[sum((d**(2*k)*q**(k+1) for k in range(4)),R.zero),sum((d**(2*k)*b**(k+1) for k in range(4)),R.zero),R.one]
    central=[I*q,-I*b,R.zero]
    normal=[I*q-I*d*d*q*q,-I*b+I*d*d*b*b,R.zero]
    assert all(not v for v in residual(central,normal,maps))
    high=[d*d*q,d*d*b,R.zero]
    highnormal=[d*d*q-d**4*q*q,d*d*b-d**4*b*b,R.zero]
    assert all(not v for v in residual(high,highnormal,maps))
    bad=maps.copy();bad[0]+=d**4
    assert any(residual(central,normal,bad))
    # Parameter map from exact flow delta'=delta³: multiplier=(1-2delta²)^(-1/2).
    gp=[R.zero,R.zero,d*d]
    pm=exact_maps([gp])
    assert pm[2]==1+d*d+QQ_I.dom(3)/2*d**4+QQ_I.dom(5)/2*d**6
    assert all(not v for v in residual([R.zero,R.zero,d*d],[R.zero,R.zero,d*d],pm))
    assert act([R.zero,R.zero,d**3],d**2)==2*d**5
    p2=QQ_I.dom(1)/2+3*b/4+5*q*q/8+3*q*b/4+b*b/8
    p3=I*(QQ_I.dom(8)/3+5*b/3-q*q/3+4*q*b/3+b*b/3)
    w=1+(q+b)/2;u=(q-b)*(-I/2)
    f2=-2*w*u+I*(-u*u-w*w/2)
    f3=8*w*w/3-4*I*u*w/3
    N=3
    low=[I*q+d*d*f2+d**3*f3,conjugate(I*q+d*d*f2+d**3*f3),d*d*u-d**3*4*w/3]
    gs=[[d*d*p2,conjugate(d*d*p2),-d*d*(q+b)/2],[d**3*p3,conjugate(d**3*p3),d**3*2*I*(q-b)/3]]
    ms=exact_maps(gs)
    nf=[I*q+I*d*d*q/2+2*d**3*q,conjugate(I*q+I*d*d*q/2+2*d**3*q),-4*d**3/3]
    assert all(not v for v in residual(low,nf,ms))
    assert norm(d*d*(3*q+4*I*b))==28
    return {'passed':True,'controls':['exact nonlinear rational coordinate conjugacy','altered map rejected','exact parameter flow square-root multiplier','logarithmic derivative grading','full independent order2/3 map and row','Gaussian radius-four norm']}
def main():
    global N
    p=argparse.ArgumentParser();p.add_argument('--mode',choices=['known','target'],required=True);p.add_argument('--output',required=True);p.add_argument('--known');p.add_argument('--target');p.add_argument('--autonomous');p.add_argument('--deadline',type=int,default=240);a=p.parse_args()
    signal.signal(signal.SIGALRM,lambda *_:(_ for _ in ()).throw(TimeoutError()));signal.alarm(a.deadline)
    digest=hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
    if a.mode=='known':result=known()
    else:
        kr=json.loads(Path(a.known).read_text());assert kr['passed'] and kr['instrument_sha256']==digest
        raw=Path(a.target).read_bytes();assert hashlib.sha256(raw).hexdigest()=='a607884e8b14a96cb11033efedcd2ec00b5e18e802c5c6508600283f552f9782'
        ar=Path(a.autonomous).read_bytes();assert hashlib.sha256(ar).hexdigest()=='a3f32f07d942924a7d1d0d6bf6e14302247f23c7d5a69474e5e8cd040ac52e1c'
        data=json.loads(raw);N=16
        maps=[loadpoly(x) for x in data['forward_map']];nf=[loadpoly(x) for x in data['normal_form']];gs=[[loadpoly(x) for x in row] for row in data['generators']]
        assert len(gs)==15
        for ix,g in enumerate(gs):
            assert g[1]==conjugate(g[0]) and g[2]==conjugate(g[2])
            for axis in (0,2):
                assert all(n==ix+2 and j-k!=int(axis==0) for n,j,k in g[axis])
            assert sum(norm(x) for x in g)<=2**4096
        assert nf[1]==conjugate(nf[0]) and nf[2]==conjugate(nf[2])
        for axis in (0,2):assert all(j-k==int(axis==0) for n,j,k in nf[axis])
        assert scalarnorm(nf[0],0)+scalarnorm(nf[2],2)<=2**4096
        reconstructed=exact_maps(gs);assert reconstructed==maps
        tick('direct-full-conjugacy')
        field=inputfield(json.loads(ar));rr=residual(field,nf,maps)
        assert all(not v for v in rr),[(len(v),str(v)[:200]) for v in rr]
        result={'passed':True,'target_sha256':hashlib.sha256(raw).hexdigest(),'autonomous_sha256':hashlib.sha256(ar).hexdigest(),'generator_norms':[str(sum(norm(x) for x in g)) for g in gs],'scalar_combined_norm':str(scalarnorm(nf[0],0)+scalarnorm(nf[2],2)),'normal_order4':[[[list(k),str(v)] for k,v in row.items() if k[0]==4] for row in nf],'checks':['all fifteen exact flow forward maps','full three-component conjugacy through degree16','Gaussian reality and zero generator mean','resonance and exact radius-four coefficient norms'],'scope':'finite polynomial conjugacy and norms only; no phase or actual fate'}
    result.update(instrument_sha256=digest,wall_seconds=time.monotonic()-start,mode=a.mode)
    out=Path(a.output);assert not out.exists();out.write_text(json.dumps(result,indent=2)+'\n');tick('complete')
if __name__=='__main__':main()
