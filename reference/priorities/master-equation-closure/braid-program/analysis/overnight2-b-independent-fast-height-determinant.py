"""Independent phase-zero fast-height determinant audit on fixed original boxes."""
import argparse
from fractions import Fraction as F
import hashlib
import importlib.util
import json
import os
from pathlib import Path
import signal
import time

P=Path(__file__).resolve(); ROOT=P.parents[5]
HELPER=P.with_name('overnight2-b-independent-superwake-norm-chart.py')
HELPER_SHA='f9a9bcbfb5fa9771356ac6b9428e0a49e02ee4a5db1825f8665759e7ad2b9d39'
INPUT=ROOT/'.local-data/master-equation-closure/overnight2-b/fast-height-determinant/target.json'
INPUT_SHA='e7e8520975a7a4a72dced5318810c49acef13dd8c5aa7f9ec7020c0d59669bed'
OUT=ROOT/'.local-data/master-equation-closure/overnight2-b/independent-fast-height-determinant'
SERIES='-rational-metadata'
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
if sha(HELPER)!=HELPER_SHA: raise RuntimeError('frozen independent helper changed')
spec=importlib.util.spec_from_file_location('frozen_independent_helper',HELPER)
c=importlib.util.module_from_spec(spec); spec.loader.exec_module(c)
signal.alarm(0); iv=c.iv; START=time.monotonic()
def timeout(*args): raise TimeoutError('120-second internal cap')
signal.signal(signal.SIGALRM,timeout); signal.alarm(120)
BETA=(F(182643,100000),F(182644,100000))
SLABS=[(F(49,1000),F(51,1000)),(F(99,1000),F(101,1000))]
GUIDES=[[F(39,20)],[F(3,8),F(37,25),F(9,5)],
        [F(737,1000)],[F(109,100)],[F(143,100)],[F(173,100)]]

def geometry(j,beta,height,frequency,d):
    # Evaluate the actual profile and its source-time derivative at negative phase.
    w=-frequency*d; polarity=(-1)**j
    shape=iv.cos(w)-iv.sin(3*w)/8
    axial=height*(1-polarity*shape)
    source_axial=-polarity*height*frequency*(iv.sin(w)+3*iv.cos(3*w)/8)
    angle=j*iv.pi/3-beta*d
    radial=1-iv.cos(angle); tangential=-iv.sin(angle)
    gap=2*radial+axial**2-d**2
    # Planar Q dot V simplifies to -beta sin(angle).
    slope=2*(beta*tangential+axial*source_axial-d)
    return gap,slope,(radial,tangential,axial),source_axial

def certify(beta,height,frequency,guides=GUIDES,static=False):
    a,b=c.ends(beta); upper_h=c.ends(height)[1]
    recent,end=F(1,4),F(3)
    x=b*recent/2
    secant=a*(1-x*x/6)
    partner=1-(1+b)*recent
    diameter=2*iv.sqrt(c.rat(1+(9*upper_h/8)**2))
    if partner<=0 or c.ends(diameter)[1]>=end: raise ArithmeticError('complete past guard failed')
    if not static and not (0<x<1 and secant>1): raise ArithmeticError('recent self guard failed')
    sums=[c.I(0),c.I(0),c.I(0)]; channels=[]; failure=None
    sources=list(range(1,6)) if static else list(range(6))
    for j in sources:
        try:
            fun=lambda d: geometry(j,beta,height,frequency,d)[:2]
            proof=c.census(fun,guides[j],recent,end)
            if len(proof['roots'])!=len(guides[j]): raise ArithmeticError('count differs')
            for root in proof['roots']:
                d=c.I(*map(F,root['delay'])); divisor=c.I(*map(F,root['divisor']))
                if not c.sg(divisor): raise ArithmeticError('ordinary divisor unresolved')
                _,slope,q,_=geometry(j,beta,height,frequency,d)
                rows=[c.meet((-1)**j*v/(d**3*abs(divisor)),
                             2*(-1)**j*v/(d**2*abs(slope))) for v in q]
                root['acceleration']=[c.enc(row) for row in rows]
                sums=[old+row for old,row in zip(sums,rows)]
            channels.append({'source':j,**proof})
        except ArithmeticError as error:
            failure=repr(error); break
    complete=failure is None and len(channels)==len(sources)
    radial_demand=-beta**2; axial_demand=-height*frequency**2
    determinant=sums[0]*axial_demand-sums[2]*radial_demand
    return {'completeChart':complete,'channels':channels,'failure':failure,
            'pendingSources':sources[len(channels):],
            'disposition':'excluded' if complete and c.sg(determinant) else 'unresolved',
            'determinant':c.enc(determinant) if complete else None,
            'acceleration':[c.enc(row) for row in sums] if complete else None,
            'demandRadial':c.enc(radial_demand),'demandAxial':c.enc(axial_demand),
            'complementLeaves':sum(len(row['complement']) for row in channels),
            'guards':{'recent':str(recent),'end':str(end),'selfSecantFloor':str(secant),
                      'partnerPlanarGap':str(partner),'diameter':c.enc(diameter)}}

def partition(cells,a,b,n):
    if len(cells)!=n: raise ValueError('cell count')
    step=(b-a)/n; cursor=a
    for k,pair in enumerate(cells):
        if pair!=(a+k*step,a+(k+1)*step): raise ValueError('exact cell mismatch')
        left,right=pair
        if left!=cursor or not left<right: raise ValueError('gap/overlap')
        cursor=right
    if cursor!=b: raise ValueError('outer endpoint')
    return {'count':n,'domain':[str(a),str(b)],'step':str(step),'complete':True}

def known():
    if tuple(map(F,['182643/100000','182644/100000']))!=BETA:
        raise AssertionError('equivalent rational beta spelling rejected')
    toy=[(F(k,8),F(k+1,8)) for k in range(8)]
    part=partition(toy,F(0),F(1),8); rejected=[]
    duplicate=toy.copy(); duplicate[1]=duplicate[0]
    overlap=toy.copy(); overlap[1]=(F(1,16),F(1,4))
    for name,items in [('missing',toy[:-1]),('duplicate',duplicate),('overlap',overlap)]:
        try: partition(items,F(0),F(1),8)
        except ValueError: rejected.append(name)
        else: raise AssertionError('corrupt partition accepted')
    static_guides=[[],[F(1)],[F(173,100)],[F(2)],[F(173,100)],[F(1)]]
    static=certify(c.I(0),c.I(0),c.I(1),static_guides,True)
    if not static['completeChart']: raise AssertionError('static roots missing')
    for channel,square in zip(static['channels'],[1,3,4,3,1]):
        left,right=map(F,channel['roots'][0]['delay'])
        if not left*left<=square<=right*right: raise AssertionError('static exact chord missing')
    exact=-c.rat(F(5,4))+1/iv.sqrt(c.I(3))
    c.contains(c.I(*map(F,static['acceleration'][0]))-exact,F(0))
    c.contains(c.I(*map(F,static['acceleration'][1])),F(0))
    c.contains(c.I(*map(F,static['acceleration'][2])),F(0))
    static_self=c.census(lambda d:geometry(0,c.I(0),c.I(0),c.I(1),d)[:2],[],F(1,4),F(3))
    if static_self['roots']: raise AssertionError('static self root')
    _,_,q,v=geometry(0,c.I(0),c.rat(F(1,10)),c.I(2),iv.pi/4)
    c.contains(q[2],F(9,80)); c.contains(v,F(1,5))
    flat=certify(c.I(*BETA),c.I(0),c.I(8))
    if not flat['completeChart'] or [len(row['roots']) for row in flat['channels']]!=[1,3,1,1,1,1]:
        raise AssertionError('independent flat chart failed')
    if [c.sg(c.I(*map(F,r['divisor']))) for r in flat['channels'][1]['roots']]!=[1,-1,1]:
        raise AssertionError('flat negative divisor omitted')
    try: c.census(lambda d:geometry(1,c.I(0),c.I(0),c.I(1),d)[:2],[],F(1,4),F(3))
    except ArithmeticError: pass
    else: raise AssertionError('omitted root accepted')
    return {'passed':True,'toyPartition':part,'corruptPartitionsRejected':rejected,
            'static':static,'staticSelf':static_self,'flat':flat,
            'quarterHeightCycle':{'separation':c.enc(q[2]),'sourceVelocity':c.enc(v)},
            'omittedRootRejected':True}

def prior(stage):
    p=OUT/(stage+SERIES+'.json'); record=json.loads(p.read_text())
    if not record['completed'] or not record['passed'] or record['sourceSha256']!=sha(P):
        raise RuntimeError('matching prior pass required')
    return sha(p)

def inventory():
    if sha(INPUT)!=INPUT_SHA: raise RuntimeError('frozen input changed')
    data=json.loads(INPUT.read_text())
    if tuple(map(F,data['domain']['beta']))!=BETA: raise ValueError('beta mismatch')
    rows=data['results']; expected=[(s,k) for s in range(2) for k in range(256)]
    if [(row['slab'],row['index']) for row in rows]!=expected: raise ValueError('index inventory')
    audit=[]; selected=[]; outside=[]
    for slab in range(2):
        entries=[row for row in rows if row['slab']==slab]
        if any(tuple(map(F,row['height']))!=SLABS[slab] for row in entries): raise ValueError('height mismatch')
        audit.append(partition([tuple(map(F,row['frequency'])) for row in entries],F(8),F(32),256))
        for row in entries:
            pair=(slab,row['index'])
            if row['excluded'] is True: selected.append(pair)
            elif row['excluded'] is False: outside.append(pair)
            else: raise ValueError('selection flag type')
    if [sum(s==slab for s,k in selected) for slab in range(2)]!=[256,172] or len(outside)!=84:
        raise ValueError('selected inventory mismatch')
    return audit,selected,outside

def main():
    parser=argparse.ArgumentParser(); parser.add_argument('--stage',choices=['known','pilot','target'],required=True)
    stage=parser.parse_args().stage
    for name in ['OPENBLAS_NUM_THREADS','OMP_NUM_THREADS','MKL_NUM_THREADS']:
        if os.environ.get(name)!='1': raise RuntimeError('single thread required')
    OUT.mkdir(parents=True,exist_ok=True); destination=OUT/(stage+SERIES+'.json')
    if destination.exists(): raise FileExistsError('preserve previous receipt')
    data={'stage':stage,'sourceSha256':sha(P),'helperSha256':HELPER_SHA,'inputSha256':INPUT_SHA,
          'K':1,'c_f':1,'mpmathVersion':c.mpmath.__version__,'intervalDigits':iv.dps,
          'completed':False,'passed':False,'results':[],
          'limits':{'internalSeconds':120,'supervisorSeconds':180,'residentBytes':512*1024**2,
                    'receiptBytes':32*1024**2,'threads':1}}
    try:
        if stage=='known': data.update(known())
        else:
            data['knownSha256']=prior('known')
            if stage=='target': data['pilotSha256']=prior('pilot')
            audit,selected,outside=inventory()
            indices=[(0,0),(0,127),(0,255),(1,0),(1,255)] if stage=='pilot' else selected
            if not all(pair in selected for pair in indices): raise ValueError('pilot outside original exclusions')
            data.update(partition=audit,selectedInventory=selected,outsideReview=outside,
                        requestedIndices=indices,beta=list(map(str,BETA)))
            for slab,k in indices:
                if time.monotonic()-START>110: raise TimeoutError('pre-cell guard')
                low,high=F(8)+F(3*k,32),F(8)+F(3*(k+1),32)
                row=certify(c.I(*BETA),c.I(*SLABS[slab]),c.I(low,high))
                row.update(slab=slab,index=k,height=list(map(str,SLABS[slab])),frequency=[str(low),str(high)])
                data['results'].append(row)
                print(json.dumps({'progress':'independent fast-height box','slab':slab,'index':k,
                                  'disposition':row['disposition'],'wallSeconds':time.monotonic()-START}),flush=True)
            data['unresolvedIndices']=[[r['slab'],r['index']] for r in data['results'] if r['disposition']!='excluded']
            data['excludedCount']=sum(r['disposition']=='excluded' for r in data['results'])
            data['passed']=not data['unresolvedIndices']
        data['completed']=True
    except Exception as error: data['failure']=repr(error)
    signal.alarm(0); data['wallSeconds']=time.monotonic()-START; data['maxResidentBytes']=c.rss()
    raw=json.dumps(data,indent=2)+'\n'
    if len(raw.encode())>32*1024**2: raise RuntimeError('receipt byte cap')
    with destination.open('x') as stream: stream.write(raw)
    print(json.dumps({'receipt':str(destination),'sha256':sha(destination),'bytes':len(raw.encode()),
                      'completed':data['completed'],'passed':data['passed'],'wallSeconds':data['wallSeconds'],
                      'maxResidentBytesAfterSerialization':c.rss(),'excludedCount':data.get('excludedCount'),
                      'unresolvedIndices':data.get('unresolvedIndices'),'failure':data.get('failure')}),flush=True)
    if not data['completed']: raise SystemExit(1)

if __name__=='__main__': main()
