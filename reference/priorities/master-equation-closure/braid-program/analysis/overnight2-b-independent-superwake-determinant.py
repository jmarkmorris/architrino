"""Independent phase-zero, all-positive-root box exclusion.

No subject/proposal code imports. Input provides exact coefficient literals and
root-center hints only. Polar chord geometry, time derivatives, analytical tail
guards and exhaustive complementary delay intervals are independently certified.
"""
import argparse
from fractions import Fraction as F
import hashlib
import json
import os
from pathlib import Path
import resource
import signal
import sys
import time
import mpmath

iv=mpmath.iv;iv.dps=65
SOURCE=Path(__file__).resolve();ROOT=SOURCE.parents[5]
INPUT=ROOT/'.local-data/master-equation-closure/overnight2-b/superwake-determinant/target.json'
INPUT_SHA='7b99be2a4e9338e705b40c53c87da3a433306251470b151a0d478682f19bef7f'
OUT=ROOT/'.local-data/master-equation-closure/overnight2-b/independent-superwake-determinant'
START=time.monotonic();MAX_BYTES=16*1024**2;MAX_RSS=512*1024**2
CELLS=0

def alarm(signum,frame):raise TimeoutError('300 second internal cap')
signal.signal(signal.SIGALRM,alarm);signal.alarm(300)
def sha(path):return hashlib.sha256(path.read_bytes()).hexdigest()
def rat(x):
    x=F(x);return iv.mpf(x.numerator)/x.denominator
def ends(x):return tuple(F(-m if s else m)*F(2)**e for s,m,e,_ in x._mpi_)
def I(a,b=None):
    if b is None:b=a
    return iv.mpf([rat(a).a,rat(b).b])
def enc(x):return [str(t) for t in ends(x)]
def sg(x):
    a,b=ends(x);return 1 if a>0 else -1 if b<0 else 0
def cap(x):return max(abs(t) for t in ends(x))
def meet(x,y):
    a,b=ends(x);c,d=ends(y);lo,hi=max(a,c),min(b,d)
    if lo>hi:raise ArithmeticError('empty root inclusion')
    return I(lo,hi)
def rss():
    n=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss
    return n if sys.platform=='darwin' else n*1024
def budget():
    if time.monotonic()-START>300:raise TimeoutError('wall cap')
    if rss()>MAX_RSS:raise MemoryError('observed RSS cap')
    if CELLS>50000:raise RuntimeError('complement leaf budget')

def profiles(phi,x,H):
    a,b,C,D,e,f,beta,k,g,h,U,V,n,m=x
    r,rd,rdd=rat(1),rat(0),rat(0)
    omega,wd=beta,rat(0)
    for freq,rc,rs,pc,ps in ((2,a,b,C,D),(4,g,h,U,V)):
        co,si=iv.cos(freq*phi),iv.sin(freq*phi)
        amp=rc*co+rs*si
        r+=amp;rd+=k*freq*(-rc*si+rs*co);rdd-=k**2*freq**2*amp
        omega+=freq*(-pc*si+ps*co)
        wd-=k*freq**2*(pc*co+ps*si)
    z,zd,zdd=rat(0),rat(0),rat(0)
    for freq,zc,zs in ((1,H,rat(0)),(3,e,f),(5,n,m)):
        co,si=iv.cos(freq*phi),iv.sin(freq*phi)
        amp=zc*co+zs*si
        z+=amp;zd+=k*freq*(-zc*si+zs*co);zdd-=k**2*freq**2*amp
    return r,rd,rdd,omega,wd,z,zd,zdd

def geometry(delay,j,x,H):
    a,b,C,D,e,f,beta,k,g,h,U,V,n,m=x
    phase=-k*delay
    r0=1+a+g;z0=H+e+n
    rs,rd,_,omega,_,zs,zd,_=profiles(phase,x,H)
    shift=(C*(iv.cos(2*phase)-1)+D*iv.sin(2*phase)+U*(iv.cos(4*phase)-1)+V*iv.sin(4*phase))/k
    angle=j*iv.pi/3-beta*delay+shift
    co,si=iv.cos(angle),iv.sin(angle);pol=(-1)**j
    dz=z0-pol*zs
    q=[r0-rs*co,-rs*si,dz]
    # Polar difference formula avoids the repeated Cartesian square expansion.
    squared=(r0-rs)**2+4*r0*rs*iv.sin(angle/2)**2+dz**2
    dot=rd*(r0*co-rs)-r0*rs*omega*si+pol*zd*dz
    gap=squared-delay**2
    slope=2*(dot-delay)
    return gap,slope,q,dot

def demand(x,H):
    r,rd,rdd,w,wd,z,zd,zdd=profiles(rat(0),x,H)
    return [rdd-r*w**2,2*rd*w+r*wd,zdd]

def guards(x,H):
    a,b,C,D,e,f,beta,k,g,h,U,V,n,m=x
    ra=sum(cap(t) for t in (a,b,g,h));rmin=1-ra;rmax=1+ra
    if rmin<=0:raise ArithmeticError('radius not positive')
    r1=2*(cap(a)+cap(b))+4*(cap(g)+cap(h))
    r2=4*(cap(a)+cap(b))+16*(cap(g)+cap(h))
    angular=2*(cap(C)+cap(D))+4*(cap(U)+cap(V))
    angular1=4*(cap(C)+cap(D))+16*(cap(U)+cap(V))
    zmax=cap(H)+sum(cap(t) for t in (e,f,n,m))
    z1=cap(H)+3*(cap(e)+cap(f))+5*(cap(n)+cap(m))
    z2=cap(H)+9*(cap(e)+cap(f))+25*(cap(n)+cap(m))
    kb=cap(k);wmax=cap(beta)+angular
    speed=iv.sqrt(rat((kb*r1)**2+(rmax*wmax)**2+(kb*z1)**2))
    accel=iv.sqrt(rat((kb**2*r2+rmax*wmax**2)**2+(2*kb*r1*wmax+rmax*kb*angular1)**2+(kb**2*z2)**2))
    r,rd,_,w,_,z,zd,_=profiles(rat(0),x,H)
    reception_speed=iv.sqrt(rd**2+(r*w)**2+zd**2)
    recent=F(1,128)
    self_floor=reception_speed-accel*rat(recent)/2
    if ends(speed)[1]<1:
        mode='speed-upper-below-one'
    elif ends(self_floor)[0]>1:
        mode='reception-speed-minus-acceleration'
    else:raise ArithmeticError('self recent interval not excluded')
    partner=rat(rmin)-(1+speed)*rat(recent)
    if ends(partner)[0]<=0:raise ArithmeticError('partner recent interval not excluded')
    remote=2*iv.sqrt(rat(rmax**2+zmax**2));end=ends(remote)[1]+F(1,50)
    return recent,end,{'radiusLower':str(rmin),'radiusUpper':str(rmax),'heightUpper':str(zmax),
        'speedUpper':enc(speed),'accelerationUpper':enc(accel),'receptionSpeed':enc(reception_speed),
        'selfRecentMode':mode,'selfChordRatioLower':enc(self_floor),'partnerGapLower':enc(partner),
        'diameter':enc(remote),'recent':str(recent),'end':str(end)}

def inactive(fun,left,right):
    global CELLS
    if left>=right:raise ValueError('invalid complement segment')
    work=[(left,right,0)];out=[]
    while work:
        a,b,depth=work.pop();budget()
        gap,slope,*_=fun(I(a,b))
        if sg(gap):
            out.append({'interval':[str(a),str(b)],'kind':'gap-sign','gap':enc(gap)})
            CELLS+=1;continue
        ga=fun(rat(a))[0];gb=fun(rat(b))[0]
        if sg(slope) and sg(ga)==sg(gb)!=0:
            out.append({'interval':[str(a),str(b)],'kind':'monotone-same-end-sign',
                        'slope':enc(slope),'leftGap':enc(ga),'rightGap':enc(gb)})
            CELLS+=1;continue
        if depth>=28:raise ArithmeticError('unresolved complementary interval')
        middle=(a+b)/2
        work.append((middle,b,depth+1));work.append((a,middle,depth+1))
    out.sort(key=lambda row:F(row['interval'][0]))
    cursor=left
    for row in out:
        a,b=map(F,row['interval'])
        if a!=cursor:raise AssertionError('complement coverage gap or overlap')
        cursor=b
    if cursor!=right:raise AssertionError('complement endpoint missing')
    return out

def census(fun,hints,recent,end):
    protected=[];cursor=recent;complements=[]
    for hint in sorted(hints):
        center=F(hint);width=F(1,1024);proof=None
        for attempt in range(7):
            a,b=center-width,center+width
            if a<=cursor or b>=end:raise ArithmeticError('protected interval overlaps guard or another root')
            ga=fun(rat(a))[0];gb=fun(rat(b))[0];derivative=fun(I(a,b))[1]
            if sg(ga)*sg(gb)==-1 and sg(derivative):
                proof={'protected':[str(a),str(b)],'leftGap':enc(ga),'rightGap':enc(gb),
                       'protectedSlope':enc(derivative),'hint':str(center)}
                break
            width*=2
        if proof is None:raise ArithmeticError('hint lacks uniform root proof')
        complements.extend(inactive(fun,cursor,a));cursor=b
        enclosure=I(a,b)
        for iteration in range(32):
            lo,hi=ends(enclosure);mid=(lo+hi)/2;derivative=fun(enclosure)[1]
            if not sg(derivative):raise ArithmeticError('root contraction slope unproved')
            newer=meet(enclosure,rat(mid)-fun(rat(mid))[0]/derivative)
            if ends(newer)==(lo,hi):break
            enclosure=newer
        proof['root']=enc(enclosure);proof['contractions']=iteration+1
        protected.append((enclosure,proof))
    complements.extend(inactive(fun,cursor,end))
    # Verify exact coverage by protected brackets and certified complements.
    all_parts=[tuple(map(F,p['protected'])) for _,p in protected]+[tuple(map(F,p['interval'])) for p in complements]
    cursor=recent
    for a,b in sorted(all_parts):
        if a!=cursor or b<=a:raise AssertionError('single-source delay coverage defect')
        cursor=b
    if cursor!=end:raise AssertionError('single-source remote endpoint missing')
    return protected,complements

def box_proof(x,H,hints):
    recent,end,guard=guards(x,H)
    total=[rat(0),rat(0),rat(0)];sources=[]
    for j in range(6):
        fun=lambda delta:geometry(delta,j,x,H)
        roots,complement=census(fun,hints[j],recent,end);records=[]
        for d,proof in roots:
            gap,slope,q,dot=fun(d);D=1-dot/d
            if not sg(D):raise ArithmeticError('ordinary signed divisor not proved')
            terms=[(-1)**j*t/(d**3*abs(D)) for t in q]
            for i in range(3):total[i]+=terms[i]
            records.append({**proof,'signedDivisor':enc(D),'gapAtRootInterval':enc(gap),
                            'slopeAtRootInterval':enc(slope),'row':[enc(t) for t in terms]})
        sources.append({'source':j,'roots':records,'complement':complement})
    L=demand(x,H);det=total[0]*L[2]-total[2]*L[0]
    return {'guards':guard,'sources':sources,'rootCounts':[len(s['roots']) for s in sources],
            'acceleration':[enc(t) for t in total],'demand':[enc(t) for t in L],
            'determinant':enc(det),'strictlyNegative':ends(det)[1]<0}

def contains(x,exact,width=F(1,10**40)):
    a,b=ends(x)
    if not a<=exact<=b or b-a>=width:raise AssertionError('exact known result not narrowly enclosed')

def known():
    if ends(I(-2,3)**2)!=(F(0),F(9)):raise AssertionError('interval-square control')
    x=[rat(0) for _ in range(14)];x[7]=rat(1);H=rat(0)
    hints=[[],[F(1)],[F(1732,1000)],[F(2)],[F(1732,1000)],[F(1)]]
    proof=box_proof(x,H,hints)
    if proof['rootCounts']!=[0,1,1,1,1,1]:raise AssertionError('known full static census')
    Ar=I(*map(F,proof['acceleration'][0]));expected=-rat(F(5,4))+1/iv.sqrt(rat(3))
    contains(Ar-expected,F(0))
    contains(I(*map(F,proof['acceleration'][1])),F(0));contains(I(*map(F,proof['acceleration'][2])),F(0))
    contains(geometry(rat(2),3,x,H)[0],F(0));contains(geometry(rat(2),3,x,H)[1],F(-4))
    coefficients=list(map(F,['.02','.03','.04','.05','.06','.07','2','2','.01','.015','.02','.025','.03','.035']))
    xx=list(map(rat,coefficients));hh=rat(F(1,5))
    for phi,answers in ((rat(0),['1.03','.24','-.96','2.2','-.96','.29','.77','-5.96']),
                        (iv.pi/2,['.99','0','-.32','2','-.32','-.035','-.34','-.98'])):
        for actual,answer in zip(profiles(phi,xx,hh),answers):contains(actual,F(answer))
    # Nonstatic exact root with negative signed source divisor.
    yy=[rat(0) for _ in range(14)];yy[7]=rat(1)
    yy[6]=5*iv.pi/(6*iv.sqrt(rat(2)));d=iv.sqrt(rat(2))
    gap,slope,q,dot=geometry(d,1,yy,H);D=1-dot/d
    contains(gap,F(0));contains(D-(1-5*iv.pi/12),F(0))
    if not ends(D)[1]<0 or not ends(slope)[0]>0:raise AssertionError('negative-D root control')
    for component in q[:2]:contains(component,F(1))
    contains(q[2],F(0))
    row=-q[0]/(d**3*abs(D))
    expected_row=-1/(2*iv.sqrt(rat(2))*(5*iv.pi/12-1))
    contains(row-expected_row,F(0))
    # A wrong/missing hint cannot pass complementary coverage in this control.
    rejected=False
    try:census(lambda delta:geometry(delta,1,x,H),[],F(1,128),F(101,50))
    except ArithmeticError:rejected=True
    if not rejected:raise AssertionError('omitted static root was accepted')
    return {'passed':True,'staticCertificate':proof,'negativeDivisorControl':enc(D),
            'negativeDivisorSlope':enc(slope),'negativeDivisorRow':enc(row),
            'controls':['full static self and five-partner census and acceleration',
                        'exact diametric derivative','two-phase harmonic time derivatives',
                        'nonstatic negative signed divisor and absolute-divisor row','omitted root hint rejected']}

def prior(stage):
    path=OUT/(stage+'.json');old=json.loads(path.read_text())
    if not old['completed'] or not old['passed'] or old['sourceSha256']!=sha(SOURCE):raise RuntimeError('matching successful prior stage required')
    return sha(path)

def run():
    parser=argparse.ArgumentParser();parser.add_argument('--stage',choices=('known','pilot','target'),required=True)
    stage=parser.parse_args().stage
    for key in ('OPENBLAS_NUM_THREADS','OMP_NUM_THREADS','MKL_NUM_THREADS'):
        if os.environ.get(key)!='1':raise RuntimeError('one numerical thread required')
    OUT.mkdir(parents=True,exist_ok=True);destination=OUT/(stage+'.json')
    if destination.exists():raise FileExistsError('retained receipt is immutable')
    data={'stage':stage,'sourceSha256':sha(SOURCE),'inputSha256':INPUT_SHA,'K':1,'c_f':1,
          'mpmathVersion':mpmath.__version__,'intervalDecimalDigits':iv.dps,'completed':False,'passed':False,
          'limits':{'internalSeconds':300,'supervisorSeconds':360,'residentBytes':MAX_RSS,'receiptBytes':MAX_BYTES,'threads':1}}
    results=data['results']=[];failed=False
    try:
        if stage=='known':data.update(known())
        else:
            data['knownSha256']=prior('known')
            if stage=='target':data['pilotSha256']=prior('pilot')
            if sha(INPUT)!=INPUT_SHA:raise RuntimeError('input identity mismatch')
            raw=json.loads(INPUT.read_text())['results']
            if len(raw)!=2:raise RuntimeError('exactly two assigned boxes required')
            selected=raw[:1] if stage=='pilot' else raw
            for index,item in enumerate(selected):
                eps=F(1,2**20);literals=item['coefficientLiterals'];height=item['heightLiteral']
                if len(literals)!=14 or F(item['halfwidth'])!=eps:raise ValueError('box definition mismatch')
                endpoints=[(F(t)-eps,F(t)+eps) for t in literals]
                hp=(F(height)-eps,F(height)+eps)
                x=[I(a,b) for a,b in endpoints];H=I(*hp)
                # Stored bracket midpoints are merely root-location hints.
                hints=[[] for _ in range(6)]
                for channel in item['channels']:
                    j=channel['source']
                    hints[j]=[sum(map(F,r['bracket']))/2 for r in channel['roots']]
                result=box_proof(x,H,hints)
                results.append({'boxIndex':index,'heightLiteral':height,'coefficientLiterals':literals,
                                'heightInterval':[str(t) for t in hp],
                                'coefficientIntervals':[[str(t) for t in pair] for pair in endpoints],
                                'halfwidth':str(eps),**result})
                print(json.dumps({'progress':'independent superwake box','completedBoxes':len(results),
                                  'rootCounts':result['rootCounts'],'strictlyNegative':result['strictlyNegative'],
                                  'complementLeaves':CELLS}),flush=True)
            data['allBoxesExcluded']=all(x['strictlyNegative'] for x in results)
            data['passed']=True
        data['completed']=True
    except Exception as error:
        failed=True;data['failure']=repr(error)
    signal.alarm(0)
    data['wallSeconds']=time.monotonic()-START;data['complementLeaves']=CELLS
    data['maxResidentBytesBeforeSerialization']=rss()
    output=json.dumps(data,indent=2)+'\n'
    if len(output.encode())>MAX_BYTES:raise RuntimeError('16 MiB receipt ceiling')
    with destination.open('x') as stream:stream.write(output)
    print(json.dumps({'receipt':str(destination),'sha256':sha(destination),'completed':data['completed'],
                      'passed':data['passed'],'allBoxesExcluded':data.get('allBoxesExcluded'),
                      'wallSeconds':data['wallSeconds'],'outputBytes':len(output.encode()),
                      'maxResidentBytesAfterSerialization':rss(),'failure':data.get('failure')}),flush=True)
    if failed:raise SystemExit(1)

if __name__=='__main__':run()
