"""Independent LOG continuous-cell checker: own bisection and Cartesian rows.
Known static, root, fold and moving-center controls precede target admission.
Subject routines and point proposals are never imported.
"""
import argparse,hashlib,json,time
from functools import lru_cache
from pathlib import Path
import mpmath as mp
ROOT=Path(__file__).resolve().parents[2]
SOURCE=ROOT/'.local-data/ring-exploration/logarithmic-finite-cells'
OUT=ROOT/'.local-data/ring-exploration/logarithmic-census-adjudication'
HASHES={1:'9c91b66730313d9ad6aa719444534e733de8275d2811382d52a550d5956a1c5c',
2:'a08046fccb3f7e486e43e3229c78375769112ee7d6308983b62f734c41b46151',
3:'3edd2ce00c1533e07fa79318678442a9f1cd64b68cd5f50c024921cd5a09eac4',
4:'d32f83a3485d3bdbce468062c944b13c30533a3d19e7bc004299a855208bce26'}
mp.mp.dps=150;mp.iv.dps=110
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def lo(x):return mp.mpf(x._mpi_[0])
def hi(x):return mp.mpf(x._mpi_[1])
def I(a,b=None):return mp.iv.mpf([a,a if b is None else b])
def read(x):return mp.iv.mpf([mp.mpf(tuple(v)) for v in x['binary']])
def sign(x):return 1 if lo(x)>0 else -1 if hi(x)<0 else 0
def encode(x):
    if isinstance(x,dict):return {k:encode(v) for k,v in x.items()}
    if isinstance(x,(list,tuple)):return [encode(v) for v in x]
    if hasattr(x,'_mpi_'):return {'binary':[list(t) for t in x._mpi_],'display':[mp.nstr(lo(x),60),mp.nstr(hi(x),60)]}
    if hasattr(x,'_mpf_'):return mp.nstr(x,100)
    return x
def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(stage+'.json')
    p.write_text(json.dumps(encode({'passed':True,'instrumentSha256':sha(Path(__file__)),'K_log':1,'c_f':1,**data}),sort_keys=True,indent=2)+'\n')
    print(json.dumps({'stage':stage,'sha256':sha(p)}),flush=True)
def bisect(fun,a,b,increasing):
    for _ in range(440):
        c=(a+b)/2;v=fun(c)
        if (v>0)==increasing:b=c
        else:a=c
    return (a+b)/2
@lru_cache(maxsize=30000)
def root(beta,m,branch):
    star=mp.acos(1/beta) if beta>1 else mp.mpf(0)
    f=lambda x:beta*mp.sin(x)-x-m*mp.pi/6
    if branch==-1:a,b=mp.mpf(0),star;increasing=True
    else:a,b=star,mp.pi;increasing=False
    center=bisect(f,a,b,increasing);pad=mp.mpf('1e-100')
    box=I(center-pad,center+pad)
    fa=I(beta)*mp.iv.sin(I(lo(box)))-I(lo(box))-m*mp.iv.pi/6
    fb=I(beta)*mp.iv.sin(I(hi(box)))-I(hi(box))-m*mp.iv.pi/6
    assert sign(fa)==(-1 if increasing else 1) and sign(fb)==(1 if increasing else -1)
    return box
def birth(q,height_point=None,height_interval=None):
    if q==0 and height_point is None:return I(1)
    height_point=q*mp.pi/6 if height_point is None else height_point
    height_interval=q*mp.iv.pi/6 if height_interval is None else height_interval
    f=lambda b:mp.sqrt(b*b-1)-mp.acos(1/b)-height_point
    center=bisect(f,mp.mpf(1),mp.mpf(3)+q,True)
    box=I(center-mp.mpf('1e-100'),center+mp.mpf('1e-100'))
    def residual(b):return mp.iv.sqrt(b*b-1)-mp.iv.atan2(mp.iv.sqrt(b*b-1),I(1))-height_interval
    assert sign(residual(I(lo(box))))==-1 and sign(residual(I(hi(box))))==1
    return box
def cartesian_row(beta,m,branch):
    ends=[root(lo(beta),m,branch),root(hi(beta),m,branch)]
    x=I(min(lo(v) for v in ends),max(hi(v) for v in ends))
    angle=-2*x;source=[mp.iv.cos(angle),mp.iv.sin(angle)]
    sep=[1-source[0],-source[1]]
    # Cartesian factorization sep=2sin(x)*(sin(x),cos(x)) for0<x<pi.
    # This avoids a dependency blow-up at the zero-delay self birth.
    normal=[mp.iv.sin(x),mp.iv.cos(x)];ell=2*normal[0]
    if lo(ell)<=0:raise ValueError('range interval reaches zero')
    vel=[-beta*source[1],beta*source[0]]
    Dcart=1-sum(normal[k]*vel[k] for k in range(2))
    Didentity=1-beta*mp.iv.cos(x)
    D=I(max(lo(Dcart),lo(Didentity)),min(hi(Dcart),hi(Didentity)))
    if sign(D)!=branch:raise ValueError('Cartesian D not signed')
    # Authorized logarithmic row sigma*n/(ell*absD), not baseline inverse-square.
    Ct=(-1)**m*normal[1]/(ell*abs(D))
    return Ct,{'m':m,'branch':branch,'halfAngle':x,'endpointRoots':ends,'cartesianRange':ell,'cartesianD':D,'Ct':Ct}
def sum_rows(beta,branches):
    rows=[cartesian_row(beta,m,k) for m,k in branches]
    return sum((v for v,r in rows),I(0)),[r for v,r in rows]
def moving_strip(cell,left,end):
    q=cell-1;beta=I(lo(left),end);rho=I('.012')
    old=[(m,1) for m in range(-5,0)]
    if q:old += [(0,1)]+[(m,k) for m in range(1,q) for k in (-1,1)]
    older,rows=sum_rows(beta,old)
    if q==0:
        residual=I(end)*mp.iv.sin(rho)-rho;assert sign(residual)==-1
        magnitude=mp.iv.cos(rho)/(2*mp.iv.sin(rho)*(1-mp.iv.cos(rho)))
        extras={'wakeOriginUpperResidual':residual}
    else:
        B=mp.iv.sqrt(beta*beta-1);star=mp.iv.atan2(B,I(1))
        M=mp.iv.sqrt(I(end)**2-1)-mp.iv.atan2(mp.iv.sqrt(I(end)**2-1),I(1))
        gap=M-q*mp.iv.pi/6
        edge=B*(1-mp.iv.cos(rho))-(rho-mp.iv.sin(rho));assert lo(edge)>hi(gap)>0
        xupper=I(hi(star)+hi(rho));cot=mp.iv.cos(xupper)/mp.iv.sin(xupper);assert lo(cot)>0
        # Different bound from the subject's angle-tube D interval:
        # D(xstar+y)=1-cos(y)+B*sin(y).
        Dmax=1-mp.iv.cos(rho)+I(hi(B))*mp.iv.sin(rho)
        magnitude=cot/Dmax
        extras={'movingFoldGapUpper':gap,'smallerBoundaryGap':edge,'star':star,'newbornAbsDUpper':Dmax,'cotLower':cot}
    margin=magnitude-abs(older);assert lo(margin)>0
    return {'beta':beta,'rho':rho,'olderCartesianCt':older,'olderRows':rows,'newbornMagnitudeLower':magnitude,'signedDominanceMargin':margin,**extras}
def known():
    # Exact inverse-distance Cartesian row at separation2 is1/2.
    sep=[I(2),I(0)];ell=mp.iv.sqrt(sum(v*v for v in sep));a=sep[0]/ell**2
    assert lo(a)==hi(a)==mp.mpf('.5')
    zero,rows=sum_rows(I(0),[(m,1) for m in range(-5,0)])
    assert lo(zero)<=0<=hi(zero) and max(abs(lo(zero)),abs(hi(zero)))<mp.mpf('1e-90')
    exact=root(2*mp.pi/3,1,1);assert lo(exact)<mp.pi/2<hi(exact)
    height=mp.sqrt(3)-mp.pi/3;heightIv=mp.iv.sqrt(I(3))-mp.iv.pi/3
    fold=birth(1,height,heightIv);assert lo(fold)<2<hi(fold)
    beta=I(2);B=mp.iv.sqrt(beta*beta-1);star=mp.iv.atan2(B,I(1));y=I('.012')
    direct=beta*mp.iv.sin(star)-star-(beta*mp.iv.sin(star+y)-(star+y))
    identity=B*(1-mp.iv.cos(y))+y-mp.iv.sin(y)
    factor=1-beta*mp.iv.cos(star+y)-(1-mp.iv.cos(y)+B*mp.iv.sin(y))
    assert lo(direct-identity)<=0<=hi(direct-identity) and lo(factor)<=0<=hi(factor)
    save('known',{'staticLogAcceleration':a,'staticHexagonCt':zero,'staticRows':rows,'knownHalfAngle':exact,'knownBirthBeta2':fold,'movingFoldIdentityResidual':direct-identity,'movingDIdentityResidual':factor})
def target(cells):
    known=json.loads((OUT/'known.json').read_text());assert known['passed'] and known['instrumentSha256']==sha(Path(__file__))
    reports=[];start=time.monotonic()
    for cell in cells:
        path=SOURCE/f'T{cell:02d}.json';assert sha(path)==HASHES[cell]
        p=json.loads(path.read_text());assert p['passed']
        left,right=birth(cell-1),birth(cell)
        # Fresh opposite-sign birth brackets fit strictly inside the supplied
        # fold enclosure. This independently validates its entire domain.
        for exact,supplied in [(left,read(p['leftFold'])),(right,read(p['rightFold']))]:
            assert lo(supplied)<=lo(exact)<=hi(exact)<=hi(supplied)
        original=[read(row['beta']) for row in p['regularCover']]
        assert all(hi(a)==lo(b) for a,b in zip(original,original[1:]))
        assert hi(original[-1])>=hi(right)
        strip=moving_strip(cell,left,hi(read(p['foldStrip']['beta']))+mp.mpf('1e-80'))
        assert hi(strip['beta'])>=lo(original[0])
        branches=[(m,1) for m in range(-5,1)]+[(m,k) for m in range(1,cell) for k in (-1,1)]
        assert p['directedRootsThroughoutOpenCell']==6*len(branches)
        stack=[(lo(v),hi(v),0) for v in original];accepted=[];attempts=0;expected=(-1)**(cell-1)
        while stack:
            a,b,depth=stack.pop();attempts+=1;assert attempts<50000 and depth<35
            try:ct,rows=sum_rows(I(a,b),branches);good=sign(ct)==expected
            except ValueError:good=False
            if good:accepted.append({'beta':I(a,b),'Ct':ct,'rows':rows,'depth':depth})
            else:
                mid=(a+b)/2;stack.extend([(a,mid,depth+1),(mid,b,depth+1)])
        accepted.sort(key=lambda v:lo(v['beta']))
        assert lo(accepted[0]['beta'])<=lo(original[0]) and hi(accepted[-1]['beta'])>=hi(original[-1])
        assert all(hi(a['beta'])>=lo(b['beta']) for a,b in zip(accepted,accepted[1:]))
        margin=min(lo(expected*v['Ct']) for v in accepted);assert margin>0
        reports.append({'cell':cell,'referenceReceiptSha256':sha(path),'leftBirth':left,'rightBirth':right,'movingStrip':strip,'regularCover':accepted,'CtSign':expected,'directedRoots':6*len(branches),'regularMarginLower':I(margin),'wholeCellMarginLower':I(min(margin,lo(strip['signedDominanceMargin']))),'attempts':attempts})
        print(json.dumps({'cell':cell,'CartesianCoverBoxes':len(accepted),'sign':expected}),flush=True)
    save('target',{'reports':reports,'wallSeconds':time.monotonic()-start,'scope':'complete open T01..T04 LOG tangential signs; no spectrum or root-birth continuation'})
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','target'],required=True);p.add_argument('--cells',type=int,nargs='+',default=[1,2,3,4]);a=p.parse_args()
    known() if a.stage=='known' else target(a.cells)
