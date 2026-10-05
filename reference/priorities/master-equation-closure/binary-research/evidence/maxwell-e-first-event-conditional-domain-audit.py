"""Independent complete nominal-history geometry and domain inventory, safe squares.

No new subject module is imported. Frozen independent Hermite and interval
references remain unchanged. This checks geometry and summarizes admitted
coefficient-family margins; it does not independently reconstruct those families.
"""
import argparse,hashlib,importlib.util,json,time
from fractions import Fraction as Q
from pathlib import Path
p=Path(__file__).with_name('maxwell-shaped-overnight-independent-adaptive-test-check.py')
s=importlib.util.spec_from_file_location('frozen_nominal',p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
iv,IQ=m.iv,m.IQ

def safe_norm(vector):
    # Component interval square has lower0 exactly when zero is included.
    return iv.sqrt(sum((x**2 for x in vector),IQ(0)))

def differentiate(c,n):
    c=list(c)
    for _ in range(n):c=[(j+1)*c[j+1] for j in range(len(c)-1)]
    return c

class CompleteNominal:
    def __init__(self,knots,spec):
        self.future=m.Curve(knots,[0,0]);self.last=Q(knots[-1]['t'])
        self.r,self.w,self.d=map(Q,[spec['r'],spec['omega'],spec['delta']]);self.beta=self.r*self.w
        first=knots[0];self.da=[Q(first['a'][0])+self.r*self.w**2,Q(first['a'][1])]
        self.dv=[Q(first['v'][0]),Q(first['v'][1])-self.beta]
        # Independently expanded physical-time patch polynomials.
        self.f=[Q(0),Q(0),Q('1/2'),3/(2*self.d),3/(2*self.d**2),1/(2*self.d**3)]
        # d[-4s^3+7s^4-3s^5], s=1+t/d, in physical time.
        self.g=[Q(0),Q(1),Q(0),-6/self.d**2,-8/self.d**3,-3/self.d**4]
    def old(self,a,b,n):
        a,b=Q(a),Q(b);assert a<=b<=0
        z=iv.mpf([IQ(a).a,IQ(b).b]);theta=IQ(self.w)*z;co,si=iv.cos(theta),iv.sin(theta)
        phase=n%4;factor=IQ(self.r*self.w**n)
        basis=[[co,si],[-si,co],[-co,-si],[si,-co]][phase]
        base=[factor*x for x in basis]
        if b<=-self.d:return base+[IQ(0)]
        lo=max(a,-self.d);patch=iv.mpf([IQ(lo).a,IQ(b).b])
        f=m.horner(differentiate(self.f,n),patch);g=m.horner(differentiate(self.g,n),patch)
        correction=[IQ(self.da[k])*f+IQ(self.dv[k])*g for k in range(2)]
        # A split crossing also contains the unmodified ancient-tail part.
        if a<-self.d:correction=[iv.mpf([min(IQ(0).a,x.a),max(IQ(0).b,x.b)]) for x in correction]
        return [base[k]+correction[k] for k in range(2)]+[IQ(0)]
    def box(self,a,b,n):
        a,b=Q(a),Q(b);assert a<=b<=self.last
        if b<=0:return self.old(a,b,n)
        if a>=0:return self.future.box(a,b,n)
        old=self.old(a,0,n);new=self.future.box(0,b,n)
        return [iv.mpf([min(x.a,y.a),max(x.b,y.b)]) for x,y in zip(old,new)]

def margins(row,left,conditional=False):
    S,W=row['S'],row['initialSourceWindow'];lo,hi=Q(S['lo']),Q(S['hi'])
    assert -6<lo<=hi<left and -6<Q(W['lo'])<=Q(W['hi'])<left
    for key in ['D','Dclock','R']:assert Q(row[key]['lo'])>0
    assert Q(row['radiusLower'])>0 and (conditional or Q(row['speedUpper'])<1)
    return [Q(row['R']['lo']),Q(row['D']['lo']),Q(row['Dclock']['lo']),left-hi]

def known():
    prior=m.known();cross=safe_norm([iv.mpf([-1,1]),IQ(0)]);assert cross.a==IQ(0).a and cross.b==IQ(1).b;diagonal=safe_norm([iv.mpf([3,4]),iv.mpf([-4,-3])]);assert diagonal.a<iv.sqrt(IQ(18)).b and diagonal.b>iv.sqrt(IQ(32)).a;knots=[dict(t=0,x=[2,0],v=[0,Q('1/5')],a=[Q('-1/50'),0]),dict(t=1,x=[Q('199/100'),Q('1/5')],v=[Q('-1/50'),Q('1/5')],a=[Q('-1/50'),0])]
    c=CompleteNominal(knots,dict(r=2,omega=Q('1/10'),delta=Q('1/2')))
    for n,expected in enumerate([[2,0],[0,Q('1/5')],[Q('-1/50'),0],[0,Q('-1/500')]]):
        for x,e in zip(c.old(0,0,n),expected):assert m.k.contains(x,IQ(e))
    # Generic patch derivatives give the complete C2 endpoint joins.
    for coeff,values in [(c.f,[0,0,0]),(c.g,[0,0,0])]:
        for n,e in enumerate(values):assert m.k.contains(m.horner(differentiate(coeff,n),IQ(-c.d)),IQ(e))
    for n,e in enumerate([0,0,1]):assert m.k.contains(m.horner(differentiate(c.f,n),IQ(0)),IQ(e))
    for n,e in enumerate([0,1,0]):assert m.k.contains(m.horner(differentiate(c.g,n),IQ(0)),IQ(e))
    row=dict(S=dict(lo='-2',hi='-1'),initialSourceWindow=dict(lo='-3',hi='-.5'),D=dict(lo='1'),Dclock=dict(lo='1'),R=dict(lo='1'),speedUpper='.3',radiusLower='2')
    assert margins(row,Q(0))==list(map(Q,[1,1,1,1]))
    bad={**row,'D':dict(lo='0')}
    try:margins(bad,Q(0))
    except AssertionError:pass
    else:raise AssertionError('zero transmitter margin accepted')
    assert (IQ('6/5')-IQ('1/10')).a>1 and (IQ('6/5')-IQ('1/4')).b<1
    return dict(passed=True,prior=prior,cases=['component square with crossing zero norm[0,1] and signed diagonal sqrt18..sqrt32','all four circle jets at zero phase','independent physical-time f/g patch C2 seam jets','strict complete source/domain inventory','zeroD rejected'])

def sha(path):return hashlib.sha256(Path(path).read_bytes()).hexdigest()
def analyze(path):
    result=json.loads(Path(path).read_text());assert result['actualCensusPremise'].startswith('conditional no-prior-unit event');assert sha(result['input'])==result['inputSHA']
    saved=json.loads(Path(result['input']).read_text());curve=CompleteNominal(saved['knots'],saved['specification'])
    rows=list(map(json.loads,Path(path+'.jsonl').read_text().splitlines()));assert len(rows)==result['bins']
    left=Q(0);summary=None;sourceA=receiverA=sourceJ=IQ(0);speed=IQ(0);radius=None;started=time.monotonic();last=started
    for j,row in enumerate(rows):
        right=Q(row['t']);assert right>left
        conditional=left>=Q(result['conditionalStart']);z=margins(row,left,conditional);summary=z if summary is None else list(map(min,summary,z))
        intrinsic='r' in row;ex,ev,ea=map(Q,[row[k] for k in (['r','u','a'] if intrinsic else ['x','v','a'])])
        rr=safe_norm(curve.box(left,right,0))-IQ(ex);vv=safe_norm(curve.box(left,right,1))+IQ(ev)
        assert rr.a>0 and (conditional or vv.b<1)
        radius=rr.a if radius is None else min(radius,rr.a);speed=max(speed,vv.b)
        receiverA=max(receiverA,(safe_norm(curve.box(left,right,2))+IQ(ea)).b)
        lo,hi=row['S']['lo'],row['S']['hi'];se=Q(row['sourceIntrinsic'][2] if intrinsic else row['sourceErrors'][2])
        sourceA=max(sourceA,(safe_norm(curve.box(lo,hi,2))+IQ(se)).b)
        sourceJ=max(sourceJ,safe_norm(curve.box(lo,hi,3)).b)
        left=right
        if time.monotonic()-last>=30:print(json.dumps(dict(event='domain-audit-heartbeat',cells=j+1,t=float(left))),flush=True);last=time.monotonic()
    assert left==Q(result['final']['t'])
    terminal=safe_norm(curve.box(left,left,1))-IQ(rows[-1]['u']);criterion=terminal.a>1
    return dict(passed=True,conditionalTerminalSpeedLower=m.k.encode(terminal),terminalContradiction=criterion,conditionalStart=result['conditionalStart'],cells=len(rows),end=str(left),subjectSHA=sha(path),rowsSHA=sha(path+'.jsonl'),minimumReportedMargins=dict(zip(['delayRange','transmitterD','comparisonClockD','completedSourceLag'],map(str,summary))),independentRadiusLower=m.k.encode(iv.mpf([radius,radius])),independentSpeedUpper=m.k.encode(iv.mpf([speed,speed])),actualReceiverAccelerationUpper=m.k.encode(iv.mpf([receiverA,receiverA])),actualDelayedSourceAccelerationUpper=m.k.encode(iv.mpf([sourceA,sourceA])),comparisonSourceJUpper=m.k.encode(iv.mpf([sourceJ,sourceJ])),wallSeconds=time.monotonic()-started,scope='conditional independent complete nominal history and radius/velocity/A triangles, source/domain margins and terminal lower-speed criterion; root census and continuation under stopping hypothesis remain separately proved premises; no outgoing claim or actual J inferred')

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--receipt');p.add_argument('--output',required=True);a=p.parse_args();out=dict(knownFirst=known());print(json.dumps(out),flush=True)
    if a.receipt:out['target']=analyze(a.receipt)
    with Path(a.output).open('x') as f:json.dump(out,f,indent=2);f.write('\n')
    print(json.dumps(out),flush=True)
