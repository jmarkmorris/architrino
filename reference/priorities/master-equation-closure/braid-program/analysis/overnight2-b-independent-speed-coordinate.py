"""Physical-speed interval audit of exactly 144 frozen unresolved leaves.

Standalone independently derived formulas; imports no subject or prior oracle.
Both unsquared-gap and squared-gap inclusive contractions are applied without
subdivision. Source velocity amplitude v is kept independent of height H.
"""
import argparse
from collections import Counter
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

iv = mpmath.iv
iv.dps = 50
SOURCE = Path(__file__).resolve()
ROOT = SOURCE.parents[5]
INPUT = ROOT / '.local-data/master-equation-closure/overnight2-b/independent-domain-cover/target.json'
INPUT_SHA = 'b4d5927370c804f27d3990dd387b77f0077a76a2535703b7055101d689e965fc'
OUT = ROOT / '.local-data/master-equation-closure/overnight2-b/independent-speed-coordinate'
DOMAIN = ((F(1,10),F(5,6)),(F(1,20),F(4,5)),(F(1,10),F(1)))
START = time.monotonic()
MAX_RSS = 512*1024**2
MAX_BYTES = 16*1024**2
CALLS = 0

def deadline(signum, frame):
    raise TimeoutError('300 second internal deadline')
signal.signal(signal.SIGALRM, deadline)
signal.alarm(300)

def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def rat(x):
    x = F(x)
    return iv.mpf(x.numerator)/x.denominator

def endpoints(x):
    return tuple(F(-m if sign else m)*F(2)**exp for sign,m,exp,_ in x._mpi_)

def interval(a,b=None):
    if b is None:
        a,b = a
    return iv.mpf([rat(a).a,rat(b).b])

def packed(x):
    return list(map(str,endpoints(x)))

def meet(a,b):
    al,au = endpoints(a); bl,bu = endpoints(b)
    lo,hi = max(al,bl),min(au,bu)
    if lo>hi:
        raise ArithmeticError('empty valid-enclosure intersection')
    return interval(lo,hi)

def rss():
    value = resource.getrusage(resource.RUSAGE_SELF).ru_maxrss
    return value if sys.platform=='darwin' else value*1024

def budget():
    if time.monotonic()-START>300:
        raise TimeoutError('internal wall deadline')
    if rss()>MAX_RSS:
        raise MemoryError('observed RSS exceeds 512 MiB')

def mapping(H,beta,eta):
    s = iv.sqrt(rat(F(19,20))**2-beta**2)
    v = eta*s
    vp = (rat(0),-eta*beta/s,s)
    k = v/H
    kp = (-v/H**2,vp[1]/H,s/H)
    return v,k,vp,kp

def geometry(d,H,beta,v,k,j):
    angle = j*iv.pi/3-beta*d
    lag = k*d
    sa,ca,sl,cl = iv.sin(angle),iv.cos(angle),iv.sin(lag),iv.cos(lag)
    square = 4*iv.sin(angle/2)**2+H**2*sl**2
    contraction = beta*sa-H*v*sl*cl
    return square,contraction,sa,ca,sl,cl,lag

def root(H,beta,v,k,j):
    global CALLS
    CALLS += 1
    current = iv.mpf([rat(F(20,39)).a, (2*iv.sqrt(1+H**2)).b])
    steps = {'unsquaredLocal':0,'globalSecant':0,'squaredNewton':0}
    for iteration in range(100):
        lo,hi = endpoints(current)
        midpoint = rat((lo+hi)/2)
        q2,contraction,*_ = geometry(current,H,beta,v,k,j)
        qm2,*_ = geometry(midpoint,H,beta,v,k,j)
        slope = interval(F(1,20),F(39,20))
        q = iv.sqrt(q2)
        if endpoints(q)[0]>0:
            slope = meet(1+contraction/q,slope)
            steps['unsquaredLocal'] += 1
        else:
            steps['globalSecant'] += 1
        newer = meet(current,midpoint+(iv.sqrt(qm2)-midpoint)/slope)
        fd = -2*(current+contraction)
        if endpoints(fd)[1]<0:
            newer = meet(newer,midpoint-(qm2-midpoint**2)/fd)
            steps['squaredNewton'] += 1
        if endpoints(newer)==(lo,hi):
            break
        current = newer
    budget()
    return current,steps

def evaluate(box,derivatives):
    H,beta,eta = [interval(a,b) for a,b in box]
    v,k,vp,kp = mapping(H,beta,eta)
    sums = [rat(0),rat(0)]
    gradients = [[rat(0) for _ in range(3)] for _ in range(2)]
    records = []
    for j in range(1,6):
        d,steps = root(H,beta,v,k,j)
        _,c,sa,ca,sl,cl,lag = geometry(d,H,beta,v,k,j)
        D = meet(1+c/d,interval(F(1,20),F(39,20)))
        W = meet(d+c,d*D)
        if endpoints(W)[0]<=0:
            raise ArithmeticError('nonpositive source denominator enclosure')
        N = [-((-1)**j)*sa,-H*sl]
        scale = 1/(d**2*W)
        values = [n*scale for n in N]
        partials = []
        for ch in range(2):
            sums[ch] += values[ch]
        if derivatives:
            for i in range(3):
                ih,ib = int(i==0),int(i==1)
                # H^2*k_i = H*v_i-v*delta_iH, before interval arithmetic.
                di = (-sa*ib+H*sl**2*ih/d+(H*vp[i]-v*ih)*sl*cl)/D
                partials.append(di)
                ai = -d*ib-beta*di
                li = (d*vp[i]+v*di-lag*ih)/H
                wi = (di+ib*sa+beta*ca*ai-(ih*v+H*vp[i])*sl*cl
                      -H*v*iv.cos(2*lag)*li)
                ni = [-((-1)**j)*ca*ai,-ih*sl-H*cl*li]
                for ch in range(2):
                    gradients[ch][i] += scale*(ni[ch]-N[ch]*(2*di/d+wi/W))
        records.append({'partner':j,'delay':packed(d),'sourceDivisor':packed(D),
                        'W':packed(W),'rootPartials':[packed(x) for x in partials],**steps})
    return sums,gradients,records

def parse(raw):
    if len(raw)!=3 or any(len(x)!=2 for x in raw):
        raise ValueError('three intervals required')
    box = tuple(tuple(map(F,pair)) for pair in raw)
    if any(not da<=a<b<=db for (a,b),(da,db) in zip(box,DOMAIN)):
        raise ValueError('leaf not a positive-width subbox of domain')
    return box

def leaf(raw):
    box = parse(raw)
    direct,gradients,whole = evaluate(box,True)
    middle = tuple(((a+b)/2,(a+b)/2) for a,b in box)
    center,_,center_roots = evaluate(middle,False)
    centered,final = [],[]
    for ch in range(2):
        enclosure = center[ch]
        for i,(a,b) in enumerate(box):
            enclosure += gradients[ch][i]*interval(-(b-a)/2,(b-a)/2)
        centered.append(enclosure)
        final.append(meet(enclosure,direct[ch]))
    disposition = 'unresolved'
    for ch,name in enumerate(('torque','axial')):
        a,b = endpoints(final[ch])
        if a>0 or b<0:
            disposition = name
            break
    return {'box':raw,'kind':disposition,'torque':packed(final[0]),'axial':packed(final[1]),
            'direct':[packed(x) for x in direct],'center':[packed(x) for x in center],
            'centered':[packed(x) for x in centered],
            'gradients':[[packed(x) for x in row] for row in gradients],
            'wholeBoxRoots':whole,'centerRoots':center_roots}

def contains(x,expected):
    a,b = endpoints(x)
    if not a<=expected<=b or b-a>=F(1,10**30):
        raise AssertionError('closed-form result not narrowly enclosed')

def known():
    if endpoints(interval(-2,3)**2)!=(F(0),F(9)):
        raise AssertionError('interval square control')
    if endpoints(interval(-2,3)*interval(-2,3))!=(F(-6),F(9)):
        raise AssertionError('interval product control')
    H,beta,eta = rat(2),rat(F(57,100)),rat(F(1,2))
    v,k,vp,kp = mapping(H,beta,eta)
    for x,answer in zip((v,k,*vp,*kp),(F(19,50),F(19,100),F(0),F(-3,8),F(19,25),F(-19,200),F(-3,16),F(19,50))):
        contains(x,answer)
    contains(H*v,F(19,25)); contains(H**2*k,F(19,25))
    for i,answer in enumerate((F(19,50),F(-3,4),F(38,25))):
        contains(int(i==0)*v+H*vp[i],answer)
    # Enclosure identity on a nondegenerate H interval: cancellation retains
    # H*v in [2/5,4/5], while the algebraically equal H^2*(v/H) is wider.
    height = interval(1,2); velocity = rat(F(2,5))
    tight,loose = height*velocity,height**2*(velocity/height)
    if not endpoints(loose)[0]<endpoints(tight)[0] or not endpoints(tight)[1]<endpoints(loose)[1]:
        raise AssertionError('known interval dependency comparison')
    static = ((F(1),F(1)),(F(0),F(0)),(F(0),F(0)))
    values,gradients,roots = evaluate(static,True)
    for x in values:
        contains(x,F(0))
    for row,answers in zip(gradients,((F(0),F(19,12),F(0)),(F(0),F(0),F(-133,48)))):
        for x,answer in zip(row,answers):
            contains(x,answer)
    for record,square in zip(roots,(1,3,4,3,1)):
        a,b=map(F,record['delay'])
        if not a*a<=square<=b*b or b-a>=F(1,10**30):
            raise AssertionError('static chord control')
    H,beta=rat(F(1,2)),rat(0)
    eta=10*iv.pi/(19*iv.sqrt(rat(5)))
    v,k,vp,kp=mapping(H,beta,eta)
    d,steps=root(H,beta,v,k,1)
    contains(d**2,F(5,4))
    _,c,sa,ca,sl,cl,lag=geometry(d,H,beta,v,k,1)
    D=1+c/d
    di=[(-sa*int(i==1)+H*sl**2*int(i==0)/d+(H*vp[i]-v*int(i==0))*sl*cl)/D for i in range(3)]
    contains(D,F(1)); contains(di[0]**2,F(1,5)); contains(di[1]**2,F(3,4)); contains(di[2],F(0))
    if endpoints(di[0])[0]<=0 or endpoints(di[1])[1]>=0:
        raise AssertionError('nonstatic root derivative signs')
    # Squared and unsquared local derivatives at this nonstatic root are -2d,-1.
    contains(((-2*(d+c))**2),F(5)); contains(1+c/iv.sqrt(geometry(d,H,beta,v,k,1)[0]),F(1))
    return {'passed':True,'controls':['square and interval product','nonzero exact v,k and derivatives',
            'cancelled H*v and its coordinate derivatives','nondegenerate dependency inflation example',
            'five static roots and complete zero fields','static full gradients 19/12 and -133/48',
            'nonstatic exact root, source divisor, three root derivatives and both delay slopes'],
            'staticRoots':roots,'staticGradients':[[packed(x) for x in row] for row in gradients],
            'nonstaticRoot':packed(d),'nonstaticPartials':[packed(x) for x in di],
            'nonstaticSteps':steps,'dependencyTight':packed(tight),'dependencyLoose':packed(loose)}

def previous(stage):
    path=OUT/(stage+'.json')
    old=json.loads(path.read_text())
    if not old['completed'] or not old['passed'] or old['sourceSha256']!=sha(SOURCE):
        raise RuntimeError('matching successful prior stage required')
    return sha(path)

def run():
    parser=argparse.ArgumentParser()
    parser.add_argument('--stage',choices=('known','pilot','target'),required=True)
    stage=parser.parse_args().stage
    for key in ('OMP_NUM_THREADS','OPENBLAS_NUM_THREADS','MKL_NUM_THREADS'):
        if os.environ.get(key)!='1':
            raise RuntimeError('one numerical thread required')
    OUT.mkdir(parents=True,exist_ok=True)
    destination=OUT/(stage+'.json')
    if destination.exists():
        raise FileExistsError('preserving existing receipt')
    data={'stage':stage,'sourceSha256':sha(SOURCE),'inputSha256':INPUT_SHA,'K':1,'c_f':1,
          'mpmathVersion':mpmath.__version__,'intervalDecimalDigits':iv.dps,'completed':False,'passed':False,
          'limits':{'internalSeconds':300,'supervisorSeconds':360,'residentBytes':MAX_RSS,'receiptBytes':MAX_BYTES,'threads':1}}
    rows=data['rows']=[]
    selected=[]
    last=time.monotonic(); failed=False
    try:
        if stage=='known':
            data.update(known())
        else:
            data['knownSha256']=previous('known')
            if stage=='target':
                data['pilotSha256']=previous('pilot')
            if sha(INPUT)!=INPUT_SHA:
                raise RuntimeError('frozen independent target hash mismatch')
            old=json.loads(INPUT.read_text())
            unresolved=[x for x in old['rows'] if x['kind']=='unresolved']
            if len(unresolved)!=144 or len({x['subjectLeafIndex'] for x in unresolved})!=144:
                raise RuntimeError('not assigned 144 distinct leaves')
            data['allAssignedSubjectIndices']=[x['subjectLeafIndex'] for x in unresolved]
            selected=[i*143//7 for i in range(8)] if stage=='pilot' else list(range(144))
            for i in selected:
                budget()
                original=unresolved[i]
                result=leaf(original['box'])
                rows.append({'originalSubjectLeafIndex':original['subjectLeafIndex'],'unresolvedListIndex':i,**result})
                if time.monotonic()-last>=5:
                    print(json.dumps({'progress':'speed-coordinate audit','rows':len(rows),'assigned':len(selected),
                                      'unresolved':sum(x['kind']=='unresolved' for x in rows),'rootCalls':CALLS}),flush=True)
                    last=time.monotonic()
            data['dispositions']=dict(Counter(x['kind'] for x in rows))
            data['allAssignedLeavesExcluded']=all(x['kind']!='unresolved' for x in rows)
            data['passed']=True
        data['completed']=True
    except Exception as error:
        data['failure']=repr(error); failed=True
    signal.alarm(0)
    data['pendingUnresolvedListIndices']=selected[len(rows):]
    data['wallSeconds']=time.monotonic()-START
    data['rootCalls']=CALLS
    data['maxResidentBytesBeforeSerialization']=rss()
    output=json.dumps(data,indent=2)+'\n'
    if len(output.encode())>MAX_BYTES:
        raise RuntimeError('receipt exceeds 16 MiB')
    with destination.open('x') as stream:
        stream.write(output)
    print(json.dumps({'receipt':str(destination),'sha256':sha(destination),'completed':data['completed'],
                      'passed':data['passed'],'rows':len(rows),'pending':len(data['pendingUnresolvedListIndices']),
                      'dispositions':data.get('dispositions'),'allAssignedLeavesExcluded':data.get('allAssignedLeavesExcluded'),
                      'wallSeconds':data['wallSeconds'],'outputBytes':len(output.encode()),'maxResidentBytesAfterSerialization':rss(),
                      'failure':data.get('failure')}),flush=True)
    if failed:
        raise SystemExit(1)

if __name__=='__main__':
    run()
