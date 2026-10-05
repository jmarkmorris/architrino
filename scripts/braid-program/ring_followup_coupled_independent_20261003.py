"""Separate absolute-Cartesian full residual and complete reception-zero census."""
import argparse,hashlib,json
from pathlib import Path
import mpmath as mp
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'.local-data/ring-followup/geometry/coupled-independent'
INPUT=ROOT/'.local-data/ring-followup/geometry/coupled-search'
mp.mp.dps=140;mp.iv.dps=100
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def I(a,b=None):return mp.iv.mpf([a,a if b is None else b])
def lo(x):return mp.mpf(x._mpi_[0])
def hi(x):return mp.mpf(x._mpi_[1])
def sign(x):return 1 if lo(x)>0 else -1 if hi(x)<0 else 0
def unpack(x):return I(*(mp.mpf(tuple(v)) for v in x['binary']))
def encode(x):
    if isinstance(x,dict):return {k:encode(v) for k,v in x.items()}
    if isinstance(x,(tuple,list)):return [encode(v) for v in x]
    if hasattr(x,'_mpi_'):return {'binary':[list(t) for t in x._mpi_],'display':[mp.nstr(lo(x),55),mp.nstr(hi(x),55)]}
    if hasattr(x,'_mpf_'):return mp.nstr(x,55)
    return x
def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(stage+'.json')
    p.write_text(json.dumps(encode(dict(passed=True,instrumentSha256=sha(Path(__file__)),K=1,c_f=1,**data)),indent=2)+'\n')
    print(json.dumps(dict(stage=stage,passed=True,receiptSha256=sha(p))),flush=True)
def waveform(ph,x,H):
    a,b,c,d,e,f,B,k=x;co,si=mp.iv.cos(2*ph),mp.iv.sin(2*ph)
    return [1+a*co+b*si,-2*a*si+2*b*co,-4*a*co-4*b*si,
            c*co+d*si,-2*c*si+2*d*co,-4*c*co-4*d*si,
            H*mp.iv.cos(ph)+e*mp.iv.cos(3*ph)+f*mp.iv.sin(3*ph),
            -H*mp.iv.sin(ph)-3*e*mp.iv.sin(3*ph)+3*f*mp.iv.cos(3*ph),
            -H*mp.iv.cos(ph)-9*e*mp.iv.cos(3*ph)-9*f*mp.iv.sin(3*ph)]
def geometry(delay,j,x,H):
    B,k=x[6:];r,_,_,p,_,_,z,_,_=waveform(I(0),x,H)
    rs,rs1,_,ps,ps1,_,zs,zs1,_=waveform(-k*delay,x,H)
    angle=j*mp.iv.pi/3-B*delay+ps;c,s=mp.iv.cos(angle),mp.iv.sin(angle);pol=(-1)**j
    receiver=[r*mp.iv.cos(p),r*mp.iv.sin(p),z]
    source=[rs*c,rs*s,pol*zs]
    velocity=[k*rs1*c-rs*(B+k*ps1)*s,k*rs1*s+rs*(B+k*ps1)*c,pol*k*zs1]
    q=[receiver[v]-source[v] for v in range(3)]
    gap=sum((v*v for v in q),I(0))-delay*delay
    derivative=2*sum((q[v]*velocity[v] for v in range(3)),I(0))-2*delay
    return gap,derivative,q,velocity
def complement(fun,a,b,depth=0):
    if a==b:return []
    value=fun(I(a,b))
    if sign(value):return [dict(lower=a,upper=b,gap=value)]
    assert depth<40,('incomplete complement',a,b)
    c=(a+b)/2
    return complement(fun,a,c,depth+1)+complement(fun,c,b,depth+1)
def root(fun,der,a,b):
    s=sign(der(I(a,b)));assert s and sign(fun(I(a)))==-s and sign(fun(I(b)))==s
    while b-a>mp.mpf('1e-18'):
        c=(a+b)/2;v=sign(fun(I(c)))
        if not v:break
        if v==s:b=c
        else:a=c
    return I(a,b)
def known():
    # Static planar alternating hexagon at radius one, full five partner sum.
    x=[I(0)]*8;acc=[I(0)]*3
    for j in range(1,6):
        d=2*abs(mp.iv.sin(j*mp.iv.pi/6));g,gp,q,v=geometry(d,j,x,I(0))
        assert lo(g)<=0<=hi(g) and sign(gp)<0
        for k in range(3):acc[k]+=(-1)**j*q[k]/d**3
    expected=[1/mp.iv.sqrt(3)-I('1.25'),I(0),I(0)]
    assert all(lo(a)<=hi(b) and lo(b)<=hi(a) for a,b in zip(acc,expected))
    F=lambda d:4-d*d;D=lambda d:-2*d
    r=root(F,D,mp.mpf('1.9'),mp.mpf('2.1'));assert lo(r)<=2<=hi(r)
    leaves=complement(F,mp.mpf(0),mp.mpf('1.9'))+complement(F,mp.mpf('2.1'),mp.mpf(3))
    assert leaves
    save('known',dict(exactStaticFullAcceleration=acc,analyticalStaticAcceleration=expected,staticRoot=r,staticComplement=leaves))
def target():
    known=json.loads((OUT/'known.json').read_text());assert known['passed'] and known['instrumentSha256']==sha(Path(__file__))
    results=[]
    for label in ['H0.05-T02','H0.3-T02']:
        path=INPUT/('refined-chart-'+label+'.json');data=json.loads(path.read_text());assert data['passed']
        x=[I(v) for v in data['parameters']];H,R=I(data['height']),I(data['scale']);B,k=x[6:]
        a,b,c,d,e,f=x[:6];ra=abs(a)+abs(b);pa=abs(c)+abs(d);za=abs(e)+abs(f)
        rmin,rmax=1-ra,1+ra;wmin,wmax=B-2*k*pa,B+2*k*pa
        vmin=rmin*wmin
        # Independent l1 acceleration/speed caps (subject uses Euclidean).
        amax=4*k*k*ra+rmax*wmax*wmax+4*k*ra*wmax+4*rmax*k*k*pa+k*k*(H+9*za)
        vmax=2*k*ra+rmax*wmax+k*(H+3*za)
        assert lo(vmin)>1 and lo(rmin)>0
        recent=min(mp.mpf('.001'),lo((vmin-1)/(4*amax)),lo(rmin/(4*(vmax+1))))
        assert lo(vmin-amax*I(recent)/2)>1 and lo(rmin-(vmax+1)*I(recent))>0
        endpoint=mp.ceil(hi(2*mp.iv.sqrt(rmax*rmax+(H+za)**2)))+1
        first=data['cells'][0];assert mp.mpf(first['phaseFraction'][0])==0
        acc=[I(0),I(0),I(0)];channels=[];count=selfs=0
        for j,ch in enumerate(first['channels']):
            assert ch['source']==j
            F=lambda z:geometry(z,j,x,H)[0]
            D=lambda z:geometry(z,j,x,H)[1]
            protected=[];inactive=[];cursor=recent
            for hint in ch['roots']:
                box=unpack(hint['delay']);lower,upper=lo(box),hi(box)
                assert lower>=cursor
                inactive+=complement(F,cursor,lower);cursor=upper
                delay=root(F,D,lower,upper);_,_,q,v=geometry(delay,j,x,H)
                transmitter=1-sum((q[k]*v[k] for k in range(3)),I(0))/delay;assert sign(transmitter)
                contribution=[(-1)**j*q[k]/(delay**3*abs(transmitter)) for k in range(3)]
                for kk in range(3):acc[kk]+=contribution[kk]
                protected.append(dict(delay=delay,D=transmitter,contribution=contribution));count+=1;selfs+=int(j==0)
            inactive+=complement(F,cursor,endpoint)
            channels.append(dict(source=j,protected=protected,inactive=inactive))
        assert count==8 and selfs==1
        r,r1,r2,p,p1,p2,z,z1,z2=waveform(I(0),x,H)
        radial=k*k*r2-r*(B+k*p1)**2;tangent=2*k*r1*(B+k*p1)+r*k*k*p2
        demand=[radial*mp.iv.cos(p)-tangent*mp.iv.sin(p),radial*mp.iv.sin(p)+tangent*mp.iv.cos(p),k*k*z2]
        residual=[R*demand[k]-acc[k] for k in range(3)]
        assert any(sign(v) for v in residual)
        results.append(dict(label=label,trialReceiptSha256=sha(path),parameters=data['parameters'],height=data['height'],scale=data['scale'],sourceAndReceiverAbsoluteCartesian=True,recentDelay=recent,recentSelfSecantFloor=vmin-amax*I(recent)/2,recentPartnerRangeFloor=rmin-(vmax+1)*I(recent),remoteGeometricDelay=2*mp.iv.sqrt(rmax*rmax+(H+za)**2),completeReceptionZeroChannels=channels,rootsPerReceiver=count,directedRoots=6*count,directedSelfRoots=6*selfs,fullScaledVectorResidualAtZero=residual))
        print(json.dumps(dict(progress='independently completed trial',label=label)),flush=True)
    save('target',dict(knownSha256=sha(OUT/'known.json'),results=results,scope='Complete past causal census and full Cartesian residual at T=0 independently reject two declared whole histories; no independent whole-period Fourier intervals, fit-box exclusion or trial stability'))
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=('known','target'),required=True);a=p.parse_args();known() if a.stage=='known' else target()
