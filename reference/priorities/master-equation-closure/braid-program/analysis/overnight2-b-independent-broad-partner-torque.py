"""Independent fixed-cell partner torque audit; no subject geometry imports."""
import argparse
from fractions import Fraction as F
import hashlib
import importlib.util
import json
import os
from pathlib import Path
import signal
import time

P=Path(__file__).resolve();ROOT=P.parents[5]
HELPER=P.with_name('overnight2-b-independent-superwake-norm-chart.py')
HELPER_SHA='f9a9bcbfb5fa9771356ac6b9428e0a49e02ee4a5db1825f8665759e7ad2b9d39'
INPUT=ROOT/'.local-data/master-equation-closure/overnight2-b/broad-partner-torque/target.json'
INPUT_SHA='d31135271615f62fd1fe808e5249005ee05e93fa0bd9cebae9ccb494967cf8df'
OUT=ROOT/'.local-data/master-equation-closure/overnight2-b/independent-broad-partner-torque'
def digest(p):return hashlib.sha256(p.read_bytes()).hexdigest()
if digest(HELPER)!=HELPER_SHA:raise RuntimeError('independent helper changed')
spec=importlib.util.spec_from_file_location('independent_interval_helper',HELPER)
c=importlib.util.module_from_spec(spec);spec.loader.exec_module(c)
signal.alarm(0);START=time.monotonic();iv=c.iv
def timeout(*args):raise TimeoutError('120-second cap')
signal.signal(signal.SIGALRM,timeout);signal.alarm(120)
GUIDES=[F(13,25),F(51,50),F(37,25),F(93,50),F(399,200)]

def fixed_cells(a,b,count):
    step=(b-a)/count
    return [(a+index*step,a+(index+1)*step) for index in range(count)]

def partition(boxes,a,b,count):
    if len(boxes)!=count:raise ValueError('incorrect cell count')
    step=(b-a)/count;cursor=a
    for index,cell in enumerate(boxes):
        if cell!=(a+index*step,a+(index+1)*step):raise ValueError('fixed cell mismatch')
        lo,hi=cell
        if lo!=cursor or not hi>lo:raise ValueError('gap or overlap')
        cursor=hi
    if cursor!=b:raise ValueError('wrong outer endpoint')
    return {'complete':True,'count':count,'domain':[str(a),str(b)],'width':str(step),
            'adjacency':'exact closed common endpoints, disjoint interiors'}

def fields(source,beta,height,axial):
    axial_square=c.I(0,4*height*height);axial_derivative=c.I(-4*height*axial,4*height*axial)
    def result(d):
        theta=source*iv.pi/3-beta*d
        return 2*(1-iv.cos(theta))-d**2+axial_square,-2*(beta*iv.sin(theta)+d)+axial_derivative
    return result

def evaluate(lo,hi,h,u,guides):
    beta=c.I(lo,hi);recent=F(1,4);end=F(3)
    speed=iv.sqrt(c.rat(hi*hi+u*u))
    guard=1-(1+speed)*c.rat(recent);diameter=2*iv.sqrt(c.rat(1+h*h))
    if c.sg(guard)!=1 or c.ends(diameter)[1]>=end:raise ArithmeticError('complete-past guards failed')
    total=c.I(0);channels=[]
    for source,guide in enumerate(guides,1):
        fun=fields(source,beta,h,u)
        channel=c.census(fun,[guide],recent,end)
        if len(channel['roots'])!=1:raise ArithmeticError('complete root count differs from one')
        proof=channel['roots'][0];root=c.I(*map(F,proof['delay']));D=c.I(*map(F,proof['divisor']))
        if c.sg(D)!=1:raise ArithmeticError('partner divisor not positive')
        numerator=(-1)**(source+1)*iv.sin(source*iv.pi/3-beta*root)
        slope=fun(root)[1]
        contribution=c.meet(numerator/(root**3*D),2*numerator/(root**2*abs(slope)))
        total+=contribution
        channels.append({'source':source,'tangentialRow':c.enc(contribution),**channel})
    return {'channels':channels,'completeChart':True,'partnerTorque':c.enc(total),
            'disposition':'excluded' if c.ends(total)[0]>0 else 'unresolved',
            'complementLeaves':sum(len(row['complement']) for row in channels),
            'guards':{'recent':str(recent),'end':str(end),'sourceSpeed':c.enc(speed),
                      'partnerGap':c.enc(guard),'diameter':c.enc(diameter)}}

def known():
    toy=fixed_cells(F(0),F(1),8)
    if toy!=[(F(k,8),F(k+1,8)) for k in range(8)]:raise AssertionError('toy generation')
    audit=partition(toy,F(0),F(1),8);rejected=[]
    overlap=list(toy);overlap[1]=(F(1,16),F(1,4))
    duplicate=list(toy);duplicate[1]=duplicate[0]
    for name,boxes in [('missing',toy[:-1]),('duplicate',duplicate),('overlap',overlap)]:
        try:partition(boxes,F(0),F(1),8)
        except ValueError:rejected.append(name)
        else:raise AssertionError('corrupt toy partition accepted')
    static=evaluate(F(0),F(0),F(0),F(0),[F(1),F(173,100),F(2),F(173,100),F(1)])
    c.contains(c.I(*map(F,static['partnerTorque'])),F(0))
    for channel,square in zip(static['channels'],[1,3,4,3,1]):
        left,right=map(F,channel['roots'][0]['delay'])
        if not left*left<=square<=right*right:raise AssertionError('static exact chord square')
    flat=evaluate(F(1),F(1),F(0),F(0),GUIDES)
    if F(flat['partnerTorque'][0])<=F(1,10):raise AssertionError('analytic flat unit torque bound')
    omitted=False
    try:c.census(fields(1,c.I(0),F(0),F(0)),[],F(1,4),F(3))
    except ArithmeticError:omitted=True
    if not omitted:raise AssertionError('omitted root accepted')
    if not F(7,5)*F(21,10)<3 or not 4*(1+F(1,5)**2)<F(21,10)**2:raise AssertionError('self sign bounds')
    return {'passed':True,'toyPartition':audit,'corruptedPartitionsRejected':rejected,
            'static':static,'flat':flat,'omittedRootRejected':True,
            'controls':['exact toy partition','static complete cancellation and chord squares',
                        'independent flat unit-circle analytical bound','omitted root rejection',
                        'exact remote and self-sine bounds']}

def previous(stage):
    path=OUT/(stage+'.json');record=json.loads(path.read_text())
    if not record['completed'] or not record['passed'] or record['sourceSha256']!=digest(P):
        raise RuntimeError('matching prior pass required')
    return digest(path)

def main():
    parser=argparse.ArgumentParser();parser.add_argument('--stage',choices=['known','pilot','target'],required=True)
    stage=parser.parse_args().stage
    for name in ['OPENBLAS_NUM_THREADS','OMP_NUM_THREADS','MKL_NUM_THREADS']:
        if os.environ.get(name)!='1':raise RuntimeError('single thread required')
    OUT.mkdir(parents=True,exist_ok=True);destination=OUT/(stage+'.json')
    if destination.exists():raise FileExistsError('preserve previous receipt')
    data={'stage':stage,'sourceSha256':digest(P),'helperSha256':HELPER_SHA,'inputSha256':INPUT_SHA,
          'K':1,'c_f':1,'mpmathVersion':c.mpmath.__version__,'intervalDigits':iv.dps,
          'limits':{'internalSeconds':120,'supervisorSeconds':180,'residentBytes':512*1024**2,
                    'receiptBytes':8*1024**2,'threads':1},'completed':False,'passed':False,'results':[]}
    try:
        if stage=='known':data.update(known())
        else:
            data['knownSha256']=previous('known')
            if stage=='target':data['pilotSha256']=previous('pilot')
            if digest(INPUT)!=INPUT_SHA:raise RuntimeError('frozen input changed')
            subject=json.loads(INPUT.read_text());entries=subject['results']
            if [row['index'] for row in entries]!=list(range(64)):raise ValueError('subject index inventory')
            cells=[tuple(map(F,row['beta'])) for row in entries]
            data['partition']=partition(cells,F(1,2),F(7,5),64)
            if cells!=fixed_cells(F(1,2),F(7,5),64):raise AssertionError('declared cells differ')
            selected=[2,21,42,63] if stage=='pilot' else list(range(2,64))
            data['selectedIndices']=selected;data['acceptedDomain']=['169/320','7/5']
            data['outsideReview']=[0,1]
            for index in selected:
                if time.monotonic()-START>110:raise TimeoutError('pre-cell guard')
                a,b=cells[index]
                try:row=evaluate(a,b,F(1,5),F(2,5),GUIDES)
                except ArithmeticError as error:row={'completeChart':False,'disposition':'unresolved','error':str(error)}
                row.update(index=index,beta=[str(a),str(b)]);data['results'].append(row)
            data['excludedCount']=sum(row['disposition']=='excluded' for row in data['results'])
            data['unresolvedIndices']=[row['index'] for row in data['results'] if row['disposition']!='excluded']
            data['passed']=not data['unresolvedIndices']
            if data['passed']:
                margin,index=min((F(row['partnerTorque'][0]),row['index']) for row in data['results'])
                data['positiveMargin']=str(margin);data['marginIndex']=index
        data['completed']=True
    except Exception as error:data['failure']=repr(error)
    signal.alarm(0);data['wallSeconds']=time.monotonic()-START;data['maxResidentBytes']=c.rss()
    payload=json.dumps(data,indent=2)+'\n'
    if len(payload.encode())>8*1024**2:raise RuntimeError('receipt cap')
    with destination.open('x') as f:f.write(payload)
    print(json.dumps({'receipt':str(destination),'sha256':digest(destination),'bytes':len(payload.encode()),
                      'completed':data['completed'],'passed':data['passed'],'wallSeconds':data['wallSeconds'],
                      'maxResidentBytesAfterSerialization':c.rss(),'excludedCount':data.get('excludedCount'),
                      'unresolvedIndices':data.get('unresolvedIndices'),'failure':data.get('failure')}),flush=True)
    if not data['completed']:raise SystemExit(1)

if __name__=='__main__':main()
