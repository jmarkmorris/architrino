"""Independent fixed-box factored determinant proof; subject hints are proposals only."""
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
BASE=ROOT/'.local-data/master-equation-closure/overnight2-b/fast-height-determinant/target.json'
BASE_SHA='e7e8520975a7a4a72dced5318810c49acef13dd8c5aa7f9ec7020c0d59669bed'
INPUT=ROOT/'.local-data/master-equation-closure/overnight2-b/fast-height-centered/target.json'
INPUT_SHA='012523a36562da24e8b5e4c21cb86fa3725acb5e171893c237724770dedd33a4'
OUT=ROOT/'.local-data/master-equation-closure/overnight2-b/independent-fast-height-centered'
def sha(path): return hashlib.sha256(path.read_bytes()).hexdigest()
if sha(HELPER)!=HELPER_SHA: raise RuntimeError('frozen independent helper identity')
spec=importlib.util.spec_from_file_location('independent_interval_helper',HELPER)
c=importlib.util.module_from_spec(spec); spec.loader.exec_module(c)
signal.alarm(0); iv=c.iv; START=time.monotonic()
def timeout(*args): raise TimeoutError('120-second internal cap')
signal.signal(signal.SIGALRM,timeout); signal.alarm(120)
BETA=(F(182643,100000),F(182644,100000))
HEIGHT=(F(99,1000),F(101,1000))
SLABS=[(F(49,1000),F(51,1000)),HEIGHT]
FLAT_HINTS=[[F(39,20)],[F(3,8),F(37,25),F(9,5)],
            [F(737,1000)],[F(109,100)],[F(143,100)],[F(173,100)]]
OUTSIDE=[58,103,104,148,149,163,193,194,195,200,202,203,236,237,238,239,240,241]
PILOT=[57,91,126,190,233,252]

def geometry(j,beta,height,kappa,d):
    # The height profile is evaluated at source phase -kappa*d.
    w=-kappa*d; sigma=(-1)**j; angle=j*iv.pi/3-beta*d
    factor=1-sigma*(iv.cos(w)-iv.sin(3*w)/8)
    factor_delay=-sigma*kappa*(iv.sin(w)+3*iv.cos(3*w)/8)
    radial=1-iv.cos(angle)
    gap=2*radial+height**2*factor**2-d**2
    slope=2*(-beta*iv.sin(angle)+height**2*factor*factor_delay-d)
    return gap,slope,radial,factor,height*factor_delay

def numerator(sigma,radial,factor,beta,kappa):
    return sigma*(beta**2*factor-kappa**2*radial)

def interval_partition(cells,a,b,n):
    if len(cells)!=n: raise ValueError('wrong partition count')
    step=(b-a)/n; cursor=a
    for i,pair in enumerate(cells):
        if pair!=(a+i*step,a+(i+1)*step): raise ValueError('wrong exact endpoints')
        lo,hi=pair
        if lo!=cursor or not lo<hi: raise ValueError('gap/overlap')
        cursor=hi
    if cursor!=b: raise ValueError('wrong boundary')
    return {'complete':True,'count':n,'domain':[str(a),str(b)],'step':str(step)}

def select(rows,value):
    answer=[]; seen=set()
    for row in rows:
        index=row['index']
        if index in seen: raise ValueError('duplicate selection index')
        seen.add(index)
        if type(row['excluded']) is not bool: raise ValueError('nonboolean disposition')
        if row['excluded'] is value: answer.append(index)
    return answer

def evaluate(beta,height,kappa,hints,static=False):
    lo,hi=c.ends(beta); recent,end=F(1,4),F(3)
    secant=lo*(1-(hi*recent/2)**2/6)
    partner=1-(1+hi)*recent
    diameter=2*iv.sqrt(1+(9*height/8)**2)
    if partner<=0 or c.ends(diameter)[1]>=end: raise ArithmeticError('past guard failed')
    if not static and not (0<hi*recent/2<1 and secant>1): raise ArithmeticError('recent self guard failed')
    source_ids=list(range(1,6)) if static else list(range(6))
    total=c.I(0); ar=c.I(0); az=c.I(0); channels=[]; failure=None
    for j in source_ids:
        try:
            fun=lambda d:geometry(j,beta,height,kappa,d)[:2]
            guides=[F(str(v)) if isinstance(v,float) else F(v) for v in hints[j]]
            result=c.census(fun,guides,recent,end)
            for root in result['roots']:
                d=c.I(*map(F,root['delay'])); divisor=c.I(*map(F,root['divisor']))
                if not c.sg(divisor): raise ArithmeticError('ordinary divisor failed')
                _,slope,r,f,_=geometry(j,beta,height,kappa,d)
                n=numerator((-1)**j,r,f,beta,kappa)
                term=c.meet(n/(d**3*abs(divisor)),2*n/(d**2*abs(slope)))
                total+=term
                ar+=(-1)**j*r/(d**3*abs(divisor))
                az+=(-1)**j*height*f/(d**3*abs(divisor))
                root['normalizedDeterminantContribution']=c.enc(term)
            channels.append({'source':j,**result})
        except ArithmeticError as error:
            failure=repr(error); break
    complete=failure is None and len(channels)==len(source_ids)
    counts=[len(row['roots']) for row in channels]
    if complete and not static and counts!=[1,3,1,1,1,1]:
        complete=False; failure='claimed eight-root count not established'
    return {'completeChart':complete,'channels':channels,'rootCounts':counts,
            'failure':failure,'pendingSources':source_ids[len(channels):],
            'normalizedDeterminant':c.enc(total) if complete else None,
            'radialAcceleration':c.enc(ar) if complete else None,
            'axialAcceleration':c.enc(az) if complete else None,
            'disposition':'excluded' if complete and c.ends(height)[0]>0 and c.sg(total) else 'unresolved',
            'complementLeaves':sum(len(row['complement']) for row in channels),
            'guards':{'recent':str(recent),'end':str(end),'selfSecantFloor':str(secant),
                      'partnerPlanarGap':str(partner),'diameter':c.enc(diameter)}}

def known():
    toy=[(F(k,8),F(k+1,8)) for k in range(8)]
    partition=interval_partition(toy,F(0),F(1),8); rejected=[]
    dup=toy.copy(); dup[1]=dup[0]
    overlap=toy.copy(); overlap[1]=(F(1,16),F(1,4))
    for name,broken in [('missing',toy[:-1]),('duplicate',dup),('overlap',overlap)]:
        try: interval_partition(broken,F(0),F(1),8)
        except ValueError: rejected.append(name)
        else: raise AssertionError('bad partition accepted')
    selection=[{'index':0,'excluded':True},{'index':1,'excluded':False},{'index':2,'excluded':False}]
    if select(selection,False)!=[1,2]: raise AssertionError('known selection')
    try: select(selection+[selection[1]],False)
    except ValueError: pass
    else: raise AssertionError('duplicate selection accepted')
    hints=[[],[F(1)],[F(173,100)],[F(2)],[F(173,100)],[F(1)]]
    static=evaluate(c.I(0),c.I(0),c.I(1),hints,True)
    if not static['completeChart']: raise AssertionError('static census')
    for row,square in zip(static['channels'],[1,3,4,3,1]):
        a,b=map(F,row['roots'][0]['delay'])
        if not a*a<=square<=b*b: raise AssertionError('static chord')
    c.contains(c.I(*map(F,static['radialAcceleration']))-(-c.rat(F(5,4))+1/iv.sqrt(c.I(3))),F(0))
    c.contains(c.I(*map(F,static['axialAcceleration'])),F(0))
    _,_,_,factor,velocity=geometry(0,c.I(0),c.rat(F(1,10)),c.I(2),iv.pi/4)
    c.contains(factor,F(9,8)); c.contains(velocity,F(1,5))
    c.contains(numerator(-1,c.I(2),c.rat(F(9,8)),c.rat(F(3,2)),c.I(2)),F(175,32))
    flat=evaluate(c.I(*BETA),c.I(0),c.I(8),FLAT_HINTS)
    if not flat['completeChart'] or flat['rootCounts']!=[1,3,1,1,1,1]: raise AssertionError('flat chart')
    if [c.sg(c.I(*map(F,r['divisor']))) for r in flat['channels'][1]['roots']]!=[1,-1,1]:
        raise AssertionError('negative divisor retained')
    try: c.census(lambda d:geometry(1,c.I(0),c.I(0),c.I(1),d)[:2],[],F(1,4),F(3))
    except ArithmeticError: pass
    else: raise AssertionError('omitted root accepted')
    if tuple(map(F,['182643/100000','182644/100000']))!=BETA: raise AssertionError('rational metadata')
    return {'passed':True,'partition':partition,'corruptPartitionsRejected':rejected,
            'selectionKnown':[1,2],'duplicateSelectionRejected':True,'static':static,'flat':flat,
            'quarterCycle':{'factor':c.enc(factor),'sourceVelocity':c.enc(velocity)},
            'normalizedNumeratorKnown':'175/32','omittedRootRejected':True}

def metadata():
    if sha(BASE)!=BASE_SHA or sha(INPUT)!=INPUT_SHA: raise RuntimeError('input identity changed')
    original=json.loads(BASE.read_text()); full=original['results']
    if tuple(map(F,original['domain']['beta']))!=BETA: raise ValueError('beta mismatch')
    if [(r['slab'],r['index']) for r in full]!=[(s,k) for s in range(2) for k in range(256)]:
        raise ValueError('original full index inventory')
    audits=[]
    for slab in range(2):
        rows=[r for r in full if r['slab']==slab]
        if any(tuple(map(F,r['height']))!=SLABS[slab] for r in rows): raise ValueError('height changed')
        audits.append(interval_partition([tuple(map(F,r['frequency'])) for r in rows],F(8),F(32),256))
    remainder=[r for r in full if r['excluded'] is False]
    if len(remainder)!=84 or any(r['slab']!=1 for r in remainder): raise ValueError('original remainder')
    rows=json.loads(INPUT.read_text())['results']
    expected=[r['index'] for r in remainder]
    if [r['index'] for r in rows]!=expected: raise ValueError('centered inventory differs from original84')
    originals={r['index']:r for r in remainder}
    for row in rows:
        old=originals[row['index']]
        if row['slab']!=1 or any(tuple(map(F,row[key]))!=tuple(map(F,old[key])) for key in ['height','frequency']):
            raise ValueError('box metadata changed')
    chosen=select(rows,True); outside=select(rows,False)
    if len(chosen)!=66 or outside!=OUTSIDE: raise ValueError('66/18 inventory mismatch')
    # Only proposal root locations and audited metadata leave this routine.
    proposals={r['index']:r['rootHints'] for r in rows if r['index'] in chosen}
    return audits,expected,chosen,outside,proposals

def prior(stage):
    p=OUT/(stage+'.json'); record=json.loads(p.read_text())
    if not record['completed'] or not record['passed'] or record['sourceSha256']!=sha(P):
        raise RuntimeError('matching prior pass required')
    return sha(p)

def main():
    parser=argparse.ArgumentParser(); parser.add_argument('--stage',choices=['known','pilot','target'],required=True)
    stage=parser.parse_args().stage
    for name in ['OPENBLAS_NUM_THREADS','OMP_NUM_THREADS','MKL_NUM_THREADS']:
        if os.environ.get(name)!='1': raise RuntimeError('one numerical thread required')
    OUT.mkdir(parents=True,exist_ok=True); destination=OUT/(stage+'.json')
    if destination.exists(): raise FileExistsError('preserve prior receipt')
    record={'stage':stage,'sourceSha256':sha(P),'helperSha256':HELPER_SHA,
            'originalSha256':BASE_SHA,'selectionHintsSha256':INPUT_SHA,'K':1,'c_f':1,
            'mpmathVersion':c.mpmath.__version__,'intervalDigits':iv.dps,
            'completed':False,'passed':False,'results':[],
            'limits':{'internalSeconds':120,'supervisorSeconds':180,'residentBytes':512*1024**2,
                      'receiptBytes':8*1024**2,'complementLeaves':50000,'threads':1}}
    try:
        if stage=='known': record.update(known())
        else:
            record['knownSha256']=prior('known')
            if stage=='target': record['pilotSha256']=prior('pilot')
            audits,original84,chosen,outside,proposals=metadata()
            indices=PILOT if stage=='pilot' else chosen
            if not all(k in chosen for k in indices): raise ValueError('pilot not in selected66')
            record.update(partition=audits,originalRemainder=original84,selectedInventory=chosen,
                          outsideReview=outside,requestedIndices=indices,beta=list(map(str,BETA)),height=list(map(str,HEIGHT)))
            for k in indices:
                if time.monotonic()-START>110: raise TimeoutError('pre-cell wall guard')
                low,high=F(8)+F(3*k,32),F(8)+F(3*(k+1),32)
                row=evaluate(c.I(*BETA),c.I(*HEIGHT),c.I(low,high),proposals[k])
                row.update(slab=1,index=k,height=list(map(str,HEIGHT)),frequency=[str(low),str(high)])
                record['results'].append(row)
                print(json.dumps({'progress':'independent unchanged centered box','index':k,
                                  'disposition':row['disposition'],'wallSeconds':time.monotonic()-START}),flush=True)
            record['excludedCount']=sum(r['disposition']=='excluded' for r in record['results'])
            record['unresolvedIndices']=[r['index'] for r in record['results'] if r['disposition']!='excluded']
            record['passed']=not record['unresolvedIndices']
        record['completed']=True
    except Exception as error: record['failure']=repr(error)
    signal.alarm(0); record['wallSeconds']=time.monotonic()-START; record['maxResidentBytes']=c.rss()
    payload=json.dumps(record,indent=2)+'\n'
    if len(payload.encode())>8*1024**2: raise RuntimeError('receipt byte cap')
    with destination.open('x') as stream: stream.write(payload)
    print(json.dumps({'receipt':str(destination),'sha256':sha(destination),'bytes':len(payload.encode()),
                      'completed':record['completed'],'passed':record['passed'],'wallSeconds':record['wallSeconds'],
                      'maxResidentBytesAfterSerialization':c.rss(),'excludedCount':record.get('excludedCount'),
                      'unresolvedIndices':record.get('unresolvedIndices'),'failure':record.get('failure')}),flush=True)
    if not record['completed']: raise SystemExit(1)

if __name__=='__main__': main()
