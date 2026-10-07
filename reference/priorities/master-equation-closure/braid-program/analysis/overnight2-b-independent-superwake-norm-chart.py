"""Standalone all-reception functional root-chart certificate.

No subject/reference imports. Squared-chord error and derivative error enclose
every actual C1 history within the stated uniform norms. Stored bracket centers
are hints only; endpoint signs, derivative, complements and margins are reproved.
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
INPUT=ROOT/'.local-data/master-equation-closure/overnight2-b/superwake-norm-chart-recent/target.json'
INPUT_SHA='84c00158e4f8432978b43320c5da7c2f24087e3ff36cce866dc0f5ce46bd898d'
OUT=ROOT/'.local-data/master-equation-closure/overnight2-b/independent-superwake-norm-chart'
START=time.monotonic();CELLS=0;MAX_RSS=512*1024**2;MAX_BYTES=8*1024**2

def alarm(signum,frame):raise TimeoutError('300-second internal cap')
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
def meet(x,y):
    a,b=ends(x);c,d=ends(y);lo,hi=max(a,c),min(b,d)
    if lo>hi:raise ArithmeticError('empty inclusive intersection')
    return I(lo,hi)
def rss():
    n=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss
    return n if sys.platform=='darwin' else n*1024
def budget():
    if time.monotonic()-START>300:raise TimeoutError('wall cap')
    if rss()>MAX_RSS:raise MemoryError('observed RSS cap')
    if CELLS>30000:raise RuntimeError('complement leaf cap')

def errors(beta_upper,eps,nu,h,u):
    ep=8*eps+4*eps**2
    ed=4*eps*beta_upper+4*nu+4*eps*nu+4*h*u
    return ep,ed

def function(j,beta,eps,nu,h,u):
    ep,ed=errors(ends(beta)[1],eps,nu,h,u)
    gap_error=I(-ep,ep+4*h*h);slope_error=I(-ed,ed)
    def evaluate(d):
        alpha=j*iv.pi/3-beta*d
        # Exact identity 4 sin^2(alpha/2)=2-2 cos(alpha).
        gap=2-2*iv.cos(alpha)-d**2+gap_error
        derivative=-2*(beta*iv.sin(alpha)+d)+slope_error
        return gap,derivative
    return evaluate

def complement(fun,a,b):
    global CELLS
    pending=[(a,b,0)];records=[]
    while pending:
        left,right,depth=pending.pop();budget()
        if left>=right:raise ArithmeticError('empty complementary interval')
        gap,slope=fun(I(left,right))
        if sg(gap):
            records.append({'interval':[str(left),str(right)],'kind':'gap-sign','gap':enc(gap)})
            CELLS+=1;continue
        gl=fun(rat(left))[0];gr=fun(rat(right))[0]
        if sg(slope) and sg(gl)==sg(gr)!=0:
            records.append({'interval':[str(left),str(right)],'kind':'monotone-endpoints',
                            'derivative':enc(slope),'leftGap':enc(gl),'rightGap':enc(gr)})
            CELLS+=1;continue
        if depth==26:raise ArithmeticError('unresolved complementary cell')
        midpoint=(left+right)/2
        pending.extend(((midpoint,right,depth+1),(left,midpoint,depth+1)))
    return records

def bracket(fun,center,cursor,end):
    direction=sg(fun(rat(center))[1])
    if not direction:raise ArithmeticError('guide derivative not resolved')
    found=[]
    for side in (-1,1):
        target=side*direction;width=F(1,2048);outside=None
        for attempt in range(22):
            point=center+side*width
            if not cursor<point<end:raise ArithmeticError('bracket reaches guard or prior root')
            if sg(fun(rat(point))[0])==target:
                outside=point;break
            width*=F(3,2)
        if outside is None:raise ArithmeticError('uniform root endpoint not found')
        inside=center
        # Bring the certified endpoint toward the guide, retaining only strict
        # uniform signs. The inside location itself has no claimed sign.
        for step in range(16):
            middle=(outside+inside)/2
            if sg(fun(rat(middle))[0])==target:outside=middle
            else:inside=middle
        found.append(outside)
    left,right=found
    if not cursor<left<right<end:raise ArithmeticError('unordered root bracket')
    derivative=fun(I(left,right))[1]
    if sg(derivative)!=direction:raise ArithmeticError('protected monotonicity unresolved')
    return left,right,derivative

def census(fun,guides,recent,end):
    roots=[];inactive=[];cursor=recent
    for center in sorted(guides):
        left,right,derivative=bracket(fun,F(center),cursor,end)
        gl=fun(rat(left))[0];gr=fun(rat(right))[0]
        if sg(gl)*sg(gr)!=-1:raise ArithmeticError('opposite root endpoint signs lost')
        inactive.extend(complement(fun,cursor,left));cursor=right
        root=I(left,right)
        for iteration in range(32):
            a,b=ends(root);middle=(a+b)/2;ds=fun(root)[1]
            if not sg(ds):raise ArithmeticError('root slope lost')
            newer=meet(root,rat(middle)-fun(rat(middle))[0]/ds)
            if ends(newer)==(a,b):break
            root=newer
        divisor=-fun(root)[1]/(2*root)
        if not sg(divisor):raise ArithmeticError('ordinary root unproved')
        roots.append({'hint':str(center),'protected':[str(left),str(right)],'leftGap':enc(gl),'rightGap':enc(gr),
                      'protectedDerivative':enc(derivative),'delay':enc(root),'divisor':enc(divisor),
                      'contractionSteps':iteration+1})
    inactive.extend(complement(fun,cursor,end))
    pieces=[tuple(map(F,r['protected'])) for r in roots]+[tuple(map(F,r['interval'])) for r in inactive]
    cursor=recent
    for a,b in sorted(pieces):
        if a!=cursor or b<=a:raise AssertionError('exact delay partition gap or overlap')
        cursor=b
    if cursor!=end:raise AssertionError('delay cover endpoint missing')
    return {'roots':roots,'complement':inactive,'exactCover':True}

def guards(beta_lo,beta_hi,eps,nu,h,u):
    recent=F(1,4)
    x=beta_hi*recent/2
    if not 0<x<F(1,4):raise ArithmeticError('sine-bound argument domain')
    self_floor=beta_lo*(1-x*x/6)-nu
    speed=iv.sqrt(rat((beta_hi+nu)**2+u*u))
    partner=rat(1-2*eps)-(1+speed)*rat(recent)
    if self_floor<=1 or ends(partner)[0]<=0:raise ArithmeticError('recent guard failed')
    diameter=2*iv.sqrt(rat((1+eps)**2+h*h));end=ends(diameter)[1]+F(1,50)
    return recent,end,{'selfChordRatioFloor':str(self_floor),'sineArgumentUpper':str(x),
                      'partnerGapFloor':enc(partner),'speedBound':enc(speed),
                      'diameter':enc(diameter),'recent':str(recent),'end':str(end)}

def contains(x,expected):
    a,b=ends(x)
    if not a<=expected<=b or b-a>=F(1,10**40):raise AssertionError('known exact quantity not narrowly enclosed')

def known():
    zero=rat(0);records=[]
    for j,guess,square in ((1,F(1),1),(2,F(1732,1000),3),(3,F(2),4),(4,F(1732,1000),3),(5,F(1),1)):
        fun=function(j,zero,F(0),F(0),F(0),F(0))
        result=census(fun,[guess],F(1,4),F(3))
        if len(result['roots'])!=1:raise AssertionError('static census count')
        a,b=map(F,result['roots'][0]['delay'])
        if not a*a<=square<=b*b:raise AssertionError('static exact chord missing')
        records.append({'source':j,**result})
    self=census(function(0,zero,F(0),F(0),F(0),F(0)),[],F(1,4),F(3))
    if self['roots']:raise AssertionError('static self root')
    fun=function(3,zero,F(0),F(0),F(0),F(0))
    contains(fun(rat(2))[0],F(0));contains(fun(rat(2))[1],F(-4))
    ep,ed=errors(F(2),F(1,100),F(1,50),F(1,10),F(1,5))
    if (ep,ed)!=(F(201,2500),F(301,1250)):raise AssertionError('norm error exact control')
    if not 2*(1-F(1,4)**2/6)>F(197,100):raise AssertionError('recent sine guard control')
    beta=5*iv.pi/(6*iv.sqrt(rat(2)));delay=iv.sqrt(rat(2))
    g,gd=function(1,beta,F(0),F(0),F(0),F(0))(delay)
    contains(g,F(0));contains(-gd/(2*delay)-(1-5*iv.pi/12),F(0))
    if not sg(gd)==1:raise AssertionError('negative divisor control')
    rejected=False
    try:census(function(1,zero,F(0),F(0),F(0),F(0)),[],F(1,4),F(3))
    except ArithmeticError:rejected=True
    if not rejected:raise AssertionError('omitted root passed')
    return {'passed':True,'staticChannels':records,'staticSelf':self,'errorKnown':[str(ep),str(ed)],
            'negativeDivisor':enc(-gd/(2*delay)),
            'controls':['complete static roots, complements, and no self root','static exact chord squares',
                        'diametric derivative','independent exact norm errors','recent sine inequality',
                        'nonstatic negative divisor','missing root hint rejected']}

def prior(stage):
    path=OUT/(stage+'.json');old=json.loads(path.read_text())
    if not old['completed'] or not old['passed'] or old['sourceSha256']!=sha(SOURCE):raise RuntimeError('matching prior pass required')
    return sha(path)

def run():
    parser=argparse.ArgumentParser();parser.add_argument('--stage',choices=('known','pilot','target'),required=True)
    stage=parser.parse_args().stage
    for key in ('OPENBLAS_NUM_THREADS','OMP_NUM_THREADS','MKL_NUM_THREADS'):
        if os.environ.get(key)!='1':raise RuntimeError('one numerical thread required')
    OUT.mkdir(parents=True,exist_ok=True);destination=OUT/(stage+'.json')
    if destination.exists():raise FileExistsError('preserving retained receipt')
    data={'stage':stage,'sourceSha256':sha(SOURCE),'inputHintsSha256':INPUT_SHA,'K':1,'c_f':1,
          'mpmathVersion':mpmath.__version__,'intervalDecimalDigits':iv.dps,'completed':False,'passed':False,
          'limits':{'internalSeconds':300,'supervisorSeconds':360,'residentBytes':MAX_RSS,'receiptBytes':MAX_BYTES,'threads':1}}
    channels=data['channels']=[];failed=False
    try:
        if stage=='known':data.update(known())
        else:
            data['knownSha256']=prior('known')
            if stage=='target':data['pilotSha256']=prior('pilot')
            if sha(INPUT)!=INPUT_SHA:raise RuntimeError('frozen hint receipt mismatch')
            hints=json.loads(INPUT.read_text())['channels']
            lo,hi=F(73,40),F(457,250)
            if stage=='pilot':lo=hi=(lo+hi)/2
            eps,nu,h,u=F(1,1000),F(1,100),F(1,8),F(1,2)
            beta=I(lo,hi);recent,end,guard=guards(lo,hi,eps,nu,h,u)
            data['domain']={'beta':[str(lo),str(hi)],'eps':str(eps),'nu':str(nu),'h':str(h),'u':str(u)}
            data['guards']=guard;data['errorConstants']=list(map(str,errors(hi,eps,nu,h,u)))
            for j in range(6):
                source=[row for row in hints if row['source']==j]
                if len(source)!=1:raise ValueError('hint source identity')
                guides=[sum(map(F,row['bracket']))/2 for row in source[0]['roots']]
                result=census(function(j,beta,eps,nu,h,u),guides,recent,end)
                channels.append({'source':j,**result});budget()
            counts=[len(x['roots']) for x in channels]
            if counts!=[1,3,1,1,1,1]:raise ArithmeticError('count claim not established')
            delays=[tuple(map(F,r['delay'])) for c in channels for r in c['roots']]
            divisors=[tuple(map(F,r['divisor'])) for c in channels for r in c['roots']]
            min_delay=min(a for a,b in delays);max_delay=max(b for a,b in delays)
            min_divisor=min(min(abs(a),abs(b)) for a,b in divisors)
            data['rootCounts']=counts;data['delayHull']=[str(min_delay),str(max_delay)]
            data['absoluteDivisorFloor']=str(min_divisor)
            data['coarseMarginsPassed']=min_delay>F(7,20) and max_delay<2 and min_divisor>F(1,20)
            data['passed']=data['coarseMarginsPassed']
        data['completed']=True
    except Exception as error:failed=True;data['failure']=repr(error)
    signal.alarm(0)
    data['wallSeconds']=time.monotonic()-START;data['complementLeaves']=CELLS
    data['maxResidentBytesBeforeSerialization']=rss()
    output=json.dumps(data,indent=2)+'\n'
    if len(output.encode())>MAX_BYTES:raise RuntimeError('receipt limit')
    with destination.open('x') as stream:stream.write(output)
    print(json.dumps({'receipt':str(destination),'sha256':sha(destination),'completed':data['completed'],'passed':data['passed'],
                      'rootCounts':data.get('rootCounts'),'coarseMarginsPassed':data.get('coarseMarginsPassed'),
                      'wallSeconds':data['wallSeconds'],'complementLeaves':CELLS,'outputBytes':len(output.encode()),
                      'maxResidentBytesAfterSerialization':rss(),'failure':data.get('failure')}),flush=True)
    if failed:raise SystemExit(1)

if __name__=='__main__':run()
