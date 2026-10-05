"""Outward zero-free Nyquist cover for the common axial retarded pencil."""
import argparse,hashlib,json,importlib.util
from pathlib import Path
import mpmath as mp
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'.local-data/ring-exploration/common-axial-count'
SOURCE=ROOT/'.local-data/ring-exploration/stability'
HELPER=ROOT/'scripts/braid-program/ring_symmetric_independent_adjudication_20261003.py'
sp=importlib.util.spec_from_file_location('axial_count_binary',HELPER);base=importlib.util.module_from_spec(sp);sp.loader.exec_module(base)
mp.mp.dps=110;mp.iv.dps=85
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def lo(x):return mp.mpf(x.a)
def hi(x):return mp.mpf(x.b)
def sign(x):return 1 if lo(x)>0 else -1 if hi(x)<0 else 0
def point(v):return (lo(v.real)+hi(v.real))/2,(lo(v.imag)+hi(v.imag))/2
def contains(rect,p):return lo(rect.real)<=p[0]<=hi(rect.real) and lo(rect.imag)<=p[1]<=hi(rect.imag)
def encode(x):
    if hasattr(x,'_mpi_'):return {'binary':[list(v) for v in x._mpi_],'display':[mp.nstr(lo(x),40),mp.nstr(hi(x),40)]}
    if hasattr(x,'_mpci_'):return {'real':encode(x.real),'imag':encode(x.imag)}
    if hasattr(x,'_mpf_'):return {'pointBinary':list(x._mpf_),'display':mp.nstr(x,45)}
    if isinstance(x,dict):return {k:encode(v) for k,v in x.items()}
    if isinstance(x,(tuple,list)):return [encode(v) for v in x]
    return x
def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True)
    (OUT/(stage+'.json')).write_text(json.dumps(encode({'passed':True,'instrumentSha256':sha(Path(__file__)),'helperSha256':sha(HELPER),'K':1,'c_f':1,**data}),indent=2)+'\n')
    print(json.dumps({'stage':stage,'passed':True}),flush=True)
def winding_cover(fun,gamma,radius):
    panels=[]
    def go(a,b,depth):
        whole=fun(mp.iv.mpc(-gamma,mp.iv.mpf([a,b])))
        if sign(whole.real) or sign(whole.imag):
            pa=point(fun(mp.iv.mpc(-gamma,a)));pb=point(fun(mp.iv.mpc(-gamma,b)))
            if contains(whole,pa) and contains(whole,pb):
                panels.append({'interval':[a,b],'image':whole,'start':pa,'end':pb});return
        assert depth<26,('unresolved boundary',a,b)
        mid=(a+b)/2;go(a,mid,depth+1);go(mid,b,depth+1)
    go(mp.mpf(0),radius,0)
    assert panels[0]['start'][0]>0 and panels[0]['start'][1]==0
    assert panels[-1]['end'][1]>0
    turns=0;crossings=[]
    for p in panels:
        x0,y0=p['start'];x1,y1=p['end']
        if (y0<=0<y1) or (y1<=0<y0):
            cross=(mp.iv.mpf(x0)*y1-mp.iv.mpf(x1)*y0)/(mp.iv.mpf(y1)-y0)
            assert sign(cross)
            if sign(cross)<0:
                change=1 if y1<y0 else -1;turns+=change;crossings.append({'interval':p['interval'],'crossReal':cross,'change':change})
    count=-2*turns;assert count>=0
    return {'panels':panels,'negativeRayCrossings':crossings,'upperLiftTurns':turns,'rightHalfPlaneZeroCount':count}
def known():
    stable=winding_cover(lambda z:z+1,mp.mpf('.1'),mp.mpf(20));assert stable['rightHalfPlaneZeroCount']==0
    # Two explicit roots .5 +/- i; the only pole -3 is outside the half-plane.
    unstable=winding_cover(lambda z:((z-mp.iv.mpf('.5'))**2+1)/(z+3),mp.mpf('.1'),mp.mpf(20))
    assert unstable['rightHalfPlaneZeroCount']==2
    # For this rational control, |G-z|<|z| on the outer shifted arc follows
    # from (4|z|+1.25)/(|z|-3)<|z| at |z|>=19.9.
    assert (mp.mpf(4)*mp.mpf('19.9')+mp.mpf('1.25'))/(mp.mpf('19.9')-3)<mp.mpf('19.9')
    save('known',{'controls':['stable linear pencil has zero roots','explicit conjugate pair gives two roots; pole outside'],'stable':stable,'unstable':unstable})
def target():
    c=json.loads((OUT/'known.json').read_text());assert c['passed'] and c['instrumentSha256']==sha(Path(__file__)) and c['helperSha256']==sha(HELPER)
    reports=[]
    for t,g in [(2,'.4'),(4,'1'),(6,'.5')]:
        path=SOURCE/f'T{t:02d}-certificate.json';p=json.loads(path.read_text());assert p['passed']
        B=base.interval(p,'/beta');R=base.interval(p,'/R');rows=[]
        assert len(p['rootRows'])==2*t+4
        for j,row in enumerate(p['rootRows']):
            X=base.interval(p,f'/rootRows/{j}/v');D=1-B*mp.iv.cos(X);assert sign(D)
            gap=B*mp.iv.sin(X)-X-row['m']*mp.iv.pi/6;assert lo(gap)<=0<=hi(gap)
            delay=2*R*mp.iv.sin(X);assert lo(delay)>0
            rows.append(((-1)**row['m']/(delay**3*abs(D)),delay))
        gamma=mp.mpf(g)+mp.mpf('1e-20')
        C=sum((abs(w)*(1+mp.iv.exp(mp.iv.mpf(gamma)*d)) for w,d in rows),mp.iv.mpf(0))
        radius=mp.ceil(mp.sqrt(hi(C))+gamma)+1
        assert (radius-gamma)**2>hi(C)
        def G(z):return z-sum((w*(1-mp.iv.exp(-z*d))/z for w,d in rows),mp.iv.mpc(0))
        result=winding_cover(G,gamma,radius)
        assert result['rightHalfPlaneZeroCount']==0
        minusB=-sum((w*d for w,d in rows),mp.iv.mpf(0));assert lo(minusB)>0
        reports.append({'topology':t,'referenceSha256':sha(path),'decayStripGamma':gamma,'outerRadius':radius,'outerPerturbationBound':C,'neutralDerivative':minusB,**result})
        print(json.dumps({'reference':t,'panels':len(result['panels']),'count':0,'gamma':g}),flush=True)
    save('target',{'reports':reports,'scope':'all nonneutral common axial roots have Re(z)<-gamma; no other sectors or nonlinear stability claim'})
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','target'],required=True);a=p.parse_args()
    known() if a.stage=='known' else target()
