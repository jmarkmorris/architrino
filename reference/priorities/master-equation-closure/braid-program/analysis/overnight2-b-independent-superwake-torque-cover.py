"""Independent fixed-leaf audit: exact binary partition and all-root torque.

Uses only the frozen independent chart arithmetic/helper and its own target.
Subject receipt contributes parameter boxes and phase choices, never signs.
No subdivision of subject leaves is permitted.
"""
import argparse
from collections import Counter
from fractions import Fraction as F
import hashlib
import importlib.util
import json
import os
from pathlib import Path
import signal
import time

HERE=Path(__file__).resolve();ROOT=HERE.parents[5]
BASE=ROOT/'.local-data/master-equation-closure/overnight2-b'
OUT=BASE/'independent-superwake-torque-cover'
HELPER=HERE.with_name('overnight2-b-independent-superwake-norm-chart.py')
HELPER_SHA='f9a9bcbfb5fa9771356ac6b9428e0a49e02ee4a5db1825f8665759e7ad2b9d39'
CHART=BASE/'independent-superwake-norm-chart/target.json'
CHART_SHA='0ca2f541041d56c81917f92ea7aeb46ed89dda3304b7f03489fb02259e7f593a'
SUBJECT=BASE/'superwake-torque-cover/target.json'
SUBJECT_SHA='3400504f597a40f15d2be76dfc5b43514733ba1950e528588226ef12fbf3f9d5'
DOMAIN=((F(1,20),F(1,9)),(F(73,40),F(457,250)),(F(1,2),F(3)))
def digest(p):return hashlib.sha256(p.read_bytes()).hexdigest()
if digest(HELPER)!=HELPER_SHA:raise RuntimeError('frozen independent helper changed')
spec=importlib.util.spec_from_file_location('independent_chart_helper',HELPER)
c=importlib.util.module_from_spec(spec);spec.loader.exec_module(c)
signal.alarm(0)
iv=c.iv
START=time.monotonic();LAST=START
def timeout(*args):raise TimeoutError('1200-second internal limit')
signal.signal(signal.SIGALRM,timeout)
signal.alarm(1200)
def limits():
    if time.monotonic()-START>1200:raise TimeoutError('internal wall cap')
    if c.rss()>512*1024**2:raise MemoryError('observed resident cap')
def unpack(box):return tuple(tuple(map(F,pair)) for pair in box)
def packed(box):return [[str(a),str(b)] for a,b in box]
def volume(box):
    out=F(1)
    for a,b in box:out*=b-a
    return out

def partition(boxes,domain):
    """Reconstruct every closed binary child; missing or crossing pieces fail."""
    if len(set(boxes))!=len(boxes):raise ValueError('duplicate box')
    leaves=[];nodes=0;maximum=0
    def visit(node,indices,depth,address):
        nonlocal nodes,maximum
        nodes+=1;maximum=max(maximum,depth)
        if not indices:raise ValueError('missing binary region')
        for index in indices:
            if any(not a<=x<y<=b for (a,b),(x,y) in zip(node,boxes[index])):
                raise ValueError('leaf outside current closed node')
        if len(indices)==1 and boxes[indices[0]]==node:
            leaves.append({'index':indices[0],'depth':depth,'address':address});return
        if depth>=30:raise ValueError('nonmatching partition depth')
        axis=max(range(3),key=lambda k:(node[k][1]-node[k][0])/(domain[k][1]-domain[k][0]))
        lo,hi=node[axis];middle=(lo+hi)/2
        left=list(node);right=list(node);left[axis]=(lo,middle);right[axis]=(middle,hi)
        groups=[[],[]]
        for index in indices:
            a,b=boxes[index][axis]
            if b<=middle:groups[0].append(index)
            elif a>=middle:groups[1].append(index)
            else:raise ValueError('box crosses reconstructed split')
        visit(tuple(left),groups[0],depth+1,address+'0')
        visit(tuple(right),groups[1],depth+1,address+'1')
    visit(domain,list(range(len(boxes))),0,'')
    if sum(map(volume,boxes),F(0))!=volume(domain):raise AssertionError('partition volume inconsistency')
    return {'complete':True,'nodes':nodes,'leafCount':len(leaves),'maximumDepth':maximum,
            'volume':str(volume(domain)),'leaves':sorted(leaves,key=lambda row:row['index'])}

def wave(x):
    return iv.cos(x)-iv.sin(3*x)/8,-iv.sin(x)-3*iv.cos(3*x)/8

def fields(d,offset,phase,parameters):
    height,rate,frequency=parameters;polarity=1 if offset%2==0 else -1
    azimuth=offset*iv.pi/3-rate*d
    now,_=wave(phase);past,vertical=wave(phase-frequency*d)
    separation_z=height*(now-polarity*past)
    source_z=polarity*height*frequency*vertical
    sin_angle=iv.sin(azimuth)
    # Cartesian planar difference (1-cos(alpha), -sin(alpha)) dotted
    # with source velocity beta*(-sin(alpha),cos(alpha)) is -beta*sin.
    dot=-rate*sin_angle+separation_z*source_z
    squared=2*(1-iv.cos(azimuth))+separation_z**2-d**2
    derivative=2*(dot-d)
    return squared,derivative,dot,-polarity*sin_angle

def load_iv(pair):return c.I(*map(F,pair))
def torque_sum(box,phase_fraction,chart):
    parameters=[c.I(a,b) for a,b in box];phase=c.rat(phase_fraction)*iv.pi
    total=c.I(0);evidence=[]
    for channel in chart:
        offset=channel['source']
        for label,proof in enumerate(channel['roots']):
            enclosure=load_iv(proof['delay']);global_slope=load_iv(proof['protectedDerivative'])
            for iteration in range(40):
                limits();lo,hi=c.ends(enclosure);mid=(lo+hi)/2
                slope=c.meet(fields(enclosure,offset,phase,parameters)[1],global_slope)
                if not c.sg(slope):raise ArithmeticError('lost uniform derivative')
                value=fields(c.rat(mid),offset,phase,parameters)[0]
                refined=c.meet(enclosure,c.rat(mid)-value/slope)
                if c.ends(refined)==(lo,hi):break
                enclosure=refined
            gap,slope,dot,numerator=fields(enclosure,offset,phase,parameters)
            slope=c.meet(slope,global_slope)
            divisor=c.meet(1-dot/enclosure,-slope/(2*enclosure))
            divisor=c.meet(divisor,load_iv(proof['divisor']))
            if not c.sg(divisor):raise ArithmeticError('signed divisor contains zero')
            # Two exact row forms; intersection reduces dependency inflation.
            row=c.meet(numerator/(enclosure**3*abs(divisor)),
                       2*numerator/(enclosure**2*abs(slope)))
            total+=row
            evidence.append({'source':offset,'label':label,'delay':c.enc(enclosure),
                             'divisor':c.enc(divisor),'gap':c.enc(gap),'derivative':c.enc(slope),
                             'row':c.enc(row),'iterations':iteration+1})
    if len(evidence)!=8:raise AssertionError('eight complete rows required')
    return total,evidence

def known():
    unit=((F(0),F(1)),)*3
    cubes=[((F(i,2),F(i+1,2)),(F(j,2),F(j+1,2)),(F(k,2),F(k+1,2)))
           for i in range(2) for j in range(2) for k in range(2)]
    good=partition(cubes,unit)
    if good['nodes']!=15:raise AssertionError('eight-cube tree')
    overlapping=list(cubes);overlapping[0]=((F(0),F(3,4)),*cubes[0][1:])
    # Equal total volume: enlarge one x interval by 1/8 and shrink another
    # while shifting its outer boundary, leaving both overlap and a gap.
    same_volume=list(cubes)
    same_volume[0]=((F(0),F(5,8)),*cubes[0][1:])
    same_volume[4]=((F(1,2),F(7,8)),*cubes[4][1:])
    if sum(map(volume,same_volume),F(0))!=1:raise AssertionError('adversarial volume setup')
    rejects=[]
    for name,bad in [('missing',cubes[:-1]),('duplicate',cubes+[cubes[0]]),
                     ('overlap',overlapping),('equal-volume overlap and gap',same_volume)]:
        try:partition(bad,unit)
        except ValueError:rejects.append(name)
        else:raise AssertionError('corrupt partition accepted: '+name)
    total=c.I(0)
    for offset in range(1,6):
        d=2*iv.sin(offset*iv.pi/6)
        gap,derivative,dot,n=fields(d,offset,c.I(0),[c.I(0),c.I(0),c.I(1)])
        c.contains(gap,F(0));c.contains(derivative+2*d,F(0));c.contains(dot,F(0))
        total+=n/(d**3)
    c.contains(total,F(0))
    a,b=wave(c.I(0));c.contains(a,F(1));c.contains(b,F(-3,8))
    a,b=wave(iv.pi/2);c.contains(a,F(1,8));c.contains(b,F(-1))
    d=iv.sqrt(c.rat(2));beta=5*iv.pi/(6*d)
    gap,derivative,dot,n=fields(d,1,c.I(0),[c.I(0),beta,c.I(1)])
    D=1-dot/d
    c.contains(gap,F(0));c.contains(D-(1-5*iv.pi/12),F(0));c.contains(n,F(-1))
    c.contains(D+derivative/(2*d),F(0))
    if c.sg(D)!=-1:raise AssertionError('nonstatic negative divisor')
    if F(9,8)*DOMAIN[0][1]!=F(1,8) or F(11,8)*DOMAIN[0][1]*DOMAIN[2][1]!=F(11,24):
        raise AssertionError('exact norm admission')
    return {'passed':True,'partitionControl':good,'corruptionsRejected':rejects,
            'controls':['static complete partner torque zero','static gap and derivative','profile exact values',
                        'nonstatic negative source divisor','two divisor identities','exact domain norms'],
            'negativeDivisor':c.enc(D)}

def prior(stage):
    path=OUT/(stage+'.json');record=json.loads(path.read_text())
    if not record['completed'] or not record['passed'] or record['sourceSha256']!=digest(HERE):
        raise RuntimeError('matching prior pass required')
    return digest(path)

def main():
    global LAST
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','pilot','target'],required=True)
    stage=p.parse_args().stage
    for key in ('OPENBLAS_NUM_THREADS','OMP_NUM_THREADS','MKL_NUM_THREADS'):
        if os.environ.get(key)!='1':raise RuntimeError('one numerical thread required')
    OUT.mkdir(parents=True,exist_ok=True);destination=OUT/(stage+'.json')
    if destination.exists():raise FileExistsError('preserved receipt already exists')
    data={'stage':stage,'sourceSha256':digest(HERE),'independentHelperSha256':HELPER_SHA,
          'independentChartSha256':CHART_SHA,'subjectInputSha256':SUBJECT_SHA,'K':1,'c_f':1,
          'intervalDigits':iv.dps,'mpmathVersion':c.mpmath.__version__,'completed':False,'passed':False,
          'limits':{'internalSeconds':1200,'supervisorSeconds':1260,'residentBytes':512*1024**2,
                    'receiptBytes':16*1024**2,'threads':1},'results':[]}
    try:
        if stage=='known':data.update(known())
        else:
            data['knownSha256']=prior('known')
            if stage=='target':data['pilotSha256']=prior('pilot')
            if digest(SUBJECT)!=SUBJECT_SHA or digest(CHART)!=CHART_SHA:raise RuntimeError('frozen input changed')
            subject=json.loads(SUBJECT.read_text());chart=json.loads(CHART.read_text())
            if not chart['completed'] or not chart['passed']:raise RuntimeError('independent chart not certified')
            if unpack(subject['domain'])!=DOMAIN or subject['pending'] or subject['unresolved']:
                raise ValueError('subject domain or terminal inventory mismatch')
            rows=subject['excluded'];boxes=[unpack(row['box']) for row in rows]
            audit=partition(boxes,DOMAIN);data['partition']=audit
            if len(rows)!=624:raise ValueError('assigned leaf count mismatch')
            for leaf in audit['leaves']:
                if leaf['depth']!=rows[leaf['index']]['depth']:raise ValueError('subject depth mismatch')
            indices=list(range(624)) if stage=='target' else [n*623//15 for n in range(16)]
            data['indices']=indices;data['domain']=packed(DOMAIN)
            for index in indices:
                limits();row=rows[index];phase=F(row['phasePi'])
                if phase not in [F(0),F(1,2),F(1,4),F(3,4)]:raise ValueError('unassigned phase')
                result={'index':index,'box':packed(boxes[index]),'phasePi':str(phase)}
                try:
                    torque,evidence=torque_sum(boxes[index],phase,chart['channels'])
                    result.update(torque=c.enc(torque),sign=c.sg(torque),roots=evidence,
                                  disposition='excluded' if c.sg(torque) else 'unresolved')
                except ArithmeticError as error:result.update(disposition='unresolved',error=str(error))
                data['results'].append(result)
                if time.monotonic()-LAST>=10:
                    print(json.dumps({'progress':stage,'processed':len(data['results']),
                                      'total':len(indices),'wallSeconds':time.monotonic()-START}),flush=True)
                    LAST=time.monotonic()
            data['dispositions']=dict(Counter(x['disposition'] for x in data['results']))
            data['passed']=all(x['disposition']=='excluded' for x in data['results'])
            if data['passed']:
                margins=[(min(abs(F(x)) for x in row['torque']),row['index']) for row in data['results']]
                margin,index=min(margins)
                data['commonAbsoluteMargin']=str(margin);data['marginIndex']=index
        data['completed']=True
    except Exception as error:data['failure']=repr(error)
    signal.alarm(0);data['wallSeconds']=time.monotonic()-START;data['maxResidentBytes']=c.rss()
    payload=json.dumps(data,indent=2)+'\n'
    if len(payload.encode())>16*1024**2:raise RuntimeError('receipt byte cap')
    with destination.open('x') as stream:stream.write(payload)
    print(json.dumps({'receipt':str(destination),'sha256':digest(destination),'bytes':len(payload.encode()),
                      'completed':data['completed'],'passed':data['passed'],'wallSeconds':data['wallSeconds'],
                      'maxResidentBytesAfterSerialization':c.rss(),'dispositions':data.get('dispositions'),
                      'failure':data.get('failure')}),flush=True)
    if not data['completed']:raise SystemExit(1)

if __name__=='__main__':main()
