"""Independent kinematics and radial monotonicity, gated by domain admission."""
import argparse,hashlib,json
from pathlib import Path
import mpmath as mp
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'.local-data/ring-followup/departure/observables-independent'
JETS=ROOT/'.local-data/ring-followup/departure/interval-jets20/target.json'
REF=ROOT/'.local-data/bp-011-t02-characteristic/certificate.json'
mp.mp.dps=140;mp.iv.dps=100
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def I(a,b=None):return mp.iv.mpf([a,a if b is None else b])
def lo(x):return mp.mpf(x._mpi_[0])
def hi(x):return mp.mpf(x._mpi_[1])
def unpack(x):return I(*(mp.mpf(tuple(v)) for v in x['binary']))
def ref(p,k):return I(*(mp.mpf(tuple(v)) for v in p['exactIntervalBinaryBounds'][k]))
def encode(x):
    if isinstance(x,dict):return {k:encode(v) for k,v in x.items()}
    if isinstance(x,(tuple,list)):return [encode(v) for v in x]
    if hasattr(x,'_mpi_'):return {'binary':[list(t) for t in x._mpi_],'display':[mp.nstr(lo(x),55),mp.nstr(hi(x),55)]}
    return x
def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(stage+'.json')
    p.write_text(json.dumps(encode(dict(passed=True,instrumentSha256=sha(Path(__file__)),K=1,c_f=1,**data)),indent=2)+'\n')
    print(json.dumps(dict(stage=stage,passed=True,receiptSha256=sha(p))),flush=True)
def kinematics(radius,omega,lam,p,e):
    x,y=radius+p[0],p[1]
    r=mp.iv.sqrt(x*x+y*y)
    v=[lam*e[0]-omega*y,lam*e[1]+omega*x]
    return dict(radius=r,speed=mp.iv.sqrt(v[0]*v[0]+v[1]*v[1]),radialVelocity=lam*(x*e[0]+y*e[1])/r)
def horner(coeffs,q):
    y=I(0)
    for c in reversed(coeffs):y=y*q+c
    return y
def known():
    # X(T)=rotation(2T)(2+q(T),0), q' =3q; at q=.01
    # radius2.01, radialVelocity.03, speed sqrt(.03²+4.02²).
    q=I('.01');v=kinematics(I(2),I(2),I(3),[q,I(0)],[q,I(0)])
    expected=[I('2.01'),mp.iv.sqrt(I('.03')**2+I('4.02')**2),I('.03')]
    for z,e in zip(v.values(),expected):assert lo(z)<=hi(e) and lo(e)<=hi(z)
    assert lo(horner([I(1),I(2),I(3)],I(2)))==hi(horner([I(1),I(2),I(3)],I(2)))==17
    save('known',dict(exactRotatingKinematics=v,hornerControl=True))
def target(args):
    known=json.loads((OUT/'known.json').read_text());assert known['passed'] and known['instrumentSha256']==sha(Path(__file__))
    assert args.review.is_file() and args.domain_receipt.is_file()
    admission=json.loads(args.domain_receipt.read_text());assert admission.get('passed') is True or admission.get('accepted') is True
    assert sha(JETS)=='1b637b65fc1a4bcf9e442390a5f8fb8f8a413ee25be7ea97b4af06dbe8a7ec18' and sha(REF)=='ca1673b65e8dab0e0e602c4156e59deb3008c0d40fb52ee0dbcf8f8cc0591ff6'
    j=json.loads(JETS.read_text());p=json.loads(REF.read_text());R,O=ref(p,'/R'),ref(p,'/Omega');lam=unpack(j['lambdaInterval'])
    eps=I('.006');tail=I('7e-7');et=I('.00025')/21
    co=[[I(0),unpack(j['u1'][k])]+[unpack(v['coefficient'][k]) for v in j['coefficients']] for k in range(2)]
    def pos(q):return [horner(c,q)+I(-hi(tail),hi(tail)) for c in co]
    def euler(q):return [horner([n*z for n,z in enumerate(c)],q)+I(-hi(et),hi(et)) for c in co]
    endpoints=[]
    for q in [-eps,eps]:endpoints.append(dict(q=q,**kinematics(R,O,lam,pos(q),euler(q))))
    q=I(-hi(eps),hi(eps));xy=pos(q);quotients=[horner([(n+1)*z for n,z in enumerate(c[1:])],q)+I(-hi(et/eps),hi(et/eps)) for c in co]
    radius=mp.iv.sqrt((R+xy[0])**2+xy[1]**2)
    radialOverQ=lam*((R+xy[0])*quotients[0]+xy[1]*quotients[1])/radius
    assert lo(radialOverQ)>0
    elapsed=mp.iv.log(eps/I('1e-13'))/lam
    save('target',dict(reviewOwner=str(args.review),reviewOwnerSha256=sha(args.review),domainReceiptSha256=sha(args.domain_receipt),exactCoefficientReceiptSha256=sha(JETS),knownSha256=sha(OUT/'known.json'),assumedIndependentlyAdmittedTailCaps=dict(tail=tail,euler=et,eulerSquared=I('.00025')),endpoints=endpoints,wholeWindowRadialVelocityOverQ=radialOverQ,elapsedFromOldAmplitude=elapsed,scope='Conditional on cited independently admitted .006 domain and conservative tail caps; radial monotonicity and endpoint kinematics only, no later destination'))
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=('known','target'),required=True);p.add_argument('--review',type=Path);p.add_argument('--domain-receipt',type=Path);a=p.parse_args();known() if a.stage=='known' else target(a)
