"""Separate conservative analytic-domain and unsquared real-chart admission."""
import argparse, hashlib, json
from pathlib import Path
import mpmath as mp
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'.local-data/ring-followup/departure/domain-independent'
REF=ROOT/'.local-data/bp-011-t02-characteristic/certificate.json'
JETS=ROOT/'.local-data/ring-followup/departure/interval-jets20/target.json'
mp.mp.dps=140;mp.iv.dps=100
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def I(a,b=None):return mp.iv.mpf([a,a if b is None else b])
def lo(x):return mp.mpf(x._mpi_[0])
def hi(x):return mp.mpf(x._mpi_[1])
def mag(x):return max(abs(lo(x)),abs(hi(x)))
def read(p,k):return I(*(mp.mpf(tuple(v)) for v in p['exactIntervalBinaryBounds'][k]))
def unpack(x):return I(*(mp.mpf(tuple(v)) for v in x['binary']))
def enc(x):
    if isinstance(x,dict):return {k:enc(v) for k,v in x.items()}
    if isinstance(x,(tuple,list)):return [enc(v) for v in x]
    if hasattr(x,'_mpi_'):return {'binary':[list(t) for t in x._mpi_],'display':[mp.nstr(lo(x),55),mp.nstr(hi(x),55)]}
    if hasattr(x,'_mpf_'):return mp.nstr(x,55)
    return x
def save(stage,d):
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(stage+'.json')
    p.write_text(json.dumps(enc(dict(passed=True,instrumentSha256=sha(Path(__file__)),K=1,c_f=1,**d)),indent=2)+'\n')
    print(json.dumps(dict(stage=stage,passed=True,receiptSha256=sha(p))),flush=True)
def cover(function,a,b,perturb,depth=0):
    value=function(I(a,b));margin=lo(value) if lo(value)>0 else -hi(value)
    if margin>hi(perturb):return [dict(lower=a,upper=b,gap=value,margin=margin)]
    assert depth<42,('unsquared inactive cover unresolved',a,b)
    c=(a+b)/2
    return cover(function,a,c,perturb,depth+1)+cover(function,c,b,perturb,depth+1)
def known():
    # Static implicit squared-gap map about separation two; its derivative
    # on delta=.02 is bounded by .01 and its initial image by .010025.
    eta=I('.01');s=I('.02');initial=(4*eta+eta*eta)/4
    assert hi(initial+s*s/2)<lo(s)
    # Unsquared static complete complement, independent of squared-gap code.
    leaves=cover(lambda d:2-d,mp.mpf('.1'),mp.mpf('1.9'),I('.05'))+cover(lambda d:2-d,mp.mpf('2.1'),mp.mpf(3),I('.05'))
    assert len(leaves)==2
    # Closed geometric-series tail <= full scaled coefficient sum / 2^(N+1).
    x=I('.01');tail=x**21/(1-x);scaled=1/(1-2*x)/I(2)**21
    assert hi(tail)<lo(scaled)
    save('known',dict(staticMapImage=initial+s*s/2,staticUnsquaredComplement=leaves,geometricTail=tail,scaledTailBound=scaled))
def target():
    known=json.loads((OUT/'known.json').read_text());assert known['passed'] and known['instrumentSha256']==sha(Path(__file__))
    assert sha(REF)=='ca1673b65e8dab0e0e602c4156e59deb3008c0d40fb52ee0dbcf8f8cc0591ff6'
    p=json.loads(REF.read_text());j=json.loads(JETS.read_text());assert p['passed'] and j['passed'] and j['order']==20
    R,O,B=[read(p,k) for k in ('/R','/Omega','/betaBracket')];lam=unpack(j['lambdaInterval'])
    assert lo(lam)>mp.mpf('10.6584') and hi(lam)<mp.mpf('10.6585')
    eta,s,eps=I('.003'),I('.04'),I('.001');rows=[];M=I(0)
    for n,row in enumerate(p['rootEnclosures']):
        d=read(p,f'/rootEnclosures/{n}/delay');D=read(p,f'/rootEnclosures/{n}/D');x=read(p,f'/rootEnclosures/{n}/v');phase=-2*x
        dl=I(lo(d));div=I(lo(abs(D)));w=I(hi(O));rr=I(hi(R));bb=I(hi(B));ll=I('10.6584');lu=I('10.6585')
        cosine,sine=I(mag(mp.iv.cos(phase))),I(mag(mp.iv.sin(phase)));rot=cosine+sine;eg=mp.iv.exp(w*s)
        rho=mp.iv.exp(-ll*dl+lu*s);assert hi(rho)<mp.mpf('.5')
        base=[R*(1-mp.iv.cos(phase)),-R*mp.iv.sin(phase)]
        qr=I(max(mag(z) for z in base))+rot*rr*(eg-1)
        vr=rot*bb*eg;dq=eta*(1+rot*eg*rho);dv=rot*eg*(w+lu)*eta*rho
        cosh=(eg+1/eg)/2;sinh=(eg-1/eg)/2
        curvature=2*rr*rr*w*w*(cosine*cosh+sine*sinh)+2
        perturb=curvature*s+4*(qr*dv+vr*dq+dq*dv);slope=2*dl*div
        ratio=perturb/slope;dq0=eta*(1+rot*mp.iv.exp(-ll*dl))
        start=(2*sum((abs(z) for z in base),I(0))*dq0+2*dq0*dq0)/slope
        assert hi(ratio)<1 and hi(start+ratio*s)<lo(s)
        acceleration=2*(qr+dq)/((dl-s)**2*(slope-perturb));M+=acceleration
        rows.append(dict(row=n,delayRatio=ratio,delayImage=start+ratio*s,accelerationBound=acceleration))
    assert hi(M)<13
    coefficients=[(1,[unpack(v) for v in j['u1']])]+[(v['n'],[unpack(z) for z in v['coefficient']]) for v in j['coefficients']]
    def norm(scale,power=0):return sum(I(max(mag(z) for z in v))*scale**n*n**power for n,v in coefficients)
    assert hi(norm(eps))<mp.mpf('.000994') and hi(norm(2*eps))<mp.mpf('.002026')
    # Deliberately independent rational caps, weaker than the subject's
    # decimal bounds; no subject majorant or physical-cap receipt is read.
    z=I(21)*I('10.6584');den=z*z-34*z-318
    assert hi(1/den)<mp.mpf('.000024') and hi(I(21)**2/den)<mp.mpf('.0106')
    L=I(0)
    for n in range(8):
        def matrix(key):return I(max(hi(sum((abs(read(p,f'/rootEnclosures/{n}/{key}/{r}/{c}')) for c in range(2)),I(0))) for r in range(2)))
        d=read(p,f'/rootEnclosures/{n}/delay')
        L+=matrix('C')+mp.iv.exp(-I('10.6584')*d)*(matrix('F')+I('10.6585')*matrix('H'))
    assert hi(L)<167
    inverse,weighted,mass,linear,tail=I('.000024'),I('.0106'),I(13),I(167),I('3e-10')
    margin=eta-I('.000994')-tail;lip=inverse*(2*mass/margin+linear);forcing=mass/I(2)**21
    image=inverse*forcing+lip*tail;wt=weighted*(forcing+(2*mass/margin+linear)*tail)
    assert hi(lip)<mp.mpf('.316') and hi(image)<lo(tail) and hi(wt)<mp.mpf('1.1e-7')
    ns=[norm(eps)+tail,norm(eps,1)+I('1.1e-7')/21,norm(eps,2)+I('1.1e-7')]
    pos=mp.iv.sqrt(2)*ns[0];vel=mp.iv.sqrt(2)*(I('10.6585')*ns[1]+O*ns[0]);acc=mp.iv.sqrt(2)*(I('10.6585')**2*ns[2]+2*I('10.6585')*O*ns[1]+O*O*ns[0])
    assert hi(pos)<mp.mpf('.001406') and hi(vel)<mp.mpf('.017884')
    # New unsquared range chart: |Q-Qref| <= 2 positionCap. Unit-vector
    # change <= 4 positionCap/(referenceRange-2 positionCap).
    perturbRange=2*pos;active=[[] for _ in range(6)];charts=[];minD=[]
    for n,row in enumerate(p['rootEnclosures']):
        d=read(p,f'/rootEnclosures/{n}/delay');active[row['m']%6].append((lo(d)-mp.mpf('.04'),hi(d)+mp.mpf('.04')))
    for source in range(6):
        alpha=source*mp.iv.pi/3
        def chord(d):return 2*R*abs(mp.iv.sin((alpha-O*d)/2))
        def gap(d):return chord(d)-d
        inactive=[];protected=[];cursor=mp.mpf('.1')
        for a,b in sorted(active[source]):
            inactive+=cover(gap,cursor,a,perturbRange);cursor=b
            left,right=gap(I(a)),gap(I(b));assert (lo(left)>hi(perturbRange) and hi(right)<-hi(perturbRange)) or (hi(left)<-hi(perturbRange) and lo(right)>hi(perturbRange))
            d=I(a,b);g=(alpha-O*d)/2;sgn=1 if lo(mp.iv.sin(g))>0 else -1 if hi(mp.iv.sin(g))<0 else 0;assert sgn
            divisor=1+B*mp.iv.cos(g)*sgn
            error=4*pos*B/(chord(d)-2*pos)+vel
            floor=I(lo(abs(divisor)))-error;assert lo(floor)>0
            minD.append(floor);protected.append(dict(lower=a,upper=b,DLower=floor))
        inactive+=cover(gap,cursor,mp.mpf(3),perturbRange)
        charts.append(dict(source=source,protected=protected,inactive=inactive))
    recent=B*(1-(O*I('.1'))**2/6)-vel-1;partner=R-2*pos-(B+vel+1)*I('.1');remote=2*(R+pos)
    assert lo(recent)>0 and lo(partner)>0 and hi(remote)<3
    assert sum(len(c['protected']) for c in charts)==8
    save('target',dict(referenceSha256=sha(REF),coefficientSubjectSha256=sha(JETS),rows=rows,accelerationMapBound=M,tailContraction=lip,tailImage=image,tailNorm=tail,weightedTailNorm=I('1.1e-7'),physicalPosition=pos,physicalVelocity=vel,physicalAcceleration=acc,completeUnsquaredChart=charts,minimumDLower=min(lo(v) for v in minD),speedLower=B-vel,simultaneousSeparationLower=R-2*pos,recentSelfMargin=recent,recentPartnerMargin=partner,remoteDelayBound=remote,scope='Conditional on independently admitted degree20 exact coefficients; analytic q radius .001 and complete eight-hit real chart; no later fate'))
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=('known','target'),required=True);a=p.parse_args();known() if a.stage=='known' else target()
