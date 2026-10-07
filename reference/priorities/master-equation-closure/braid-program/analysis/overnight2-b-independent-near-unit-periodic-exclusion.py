"""Independent partner-only norm chart; all self roots handled analytically."""
import argparse
from fractions import Fraction as F
import hashlib
import importlib.util
import json
import os
from pathlib import Path
import signal
import time

SOURCE=Path(__file__).resolve();ROOT=SOURCE.parents[5]
HELPER=SOURCE.with_name('overnight2-b-independent-superwake-norm-chart.py')
HELPER_SHA='f9a9bcbfb5fa9771356ac6b9428e0a49e02ee4a5db1825f8665759e7ad2b9d39'
OUT=ROOT/'.local-data/master-equation-closure/overnight2-b/independent-near-unit-periodic-exclusion'
def sha(path):return hashlib.sha256(path.read_bytes()).hexdigest()
if sha(HELPER)!=HELPER_SHA:raise RuntimeError('frozen independent helper mismatch')
spec=importlib.util.spec_from_file_location('frozen_independent_chart',HELPER)
c=importlib.util.module_from_spec(spec);spec.loader.exec_module(c)
signal.alarm(0);iv=c.iv;START=time.monotonic()
def alarm(*args):raise TimeoutError('120-second internal deadline')
signal.signal(signal.SIGALRM,alarm);signal.alarm(120)
# Rough rational hints only. Entire surrounding delay domain is re-certified.
GUIDES=[F(13,25),F(51,50),F(37,25),F(93,50),F(399,200)]

def equation(offset,beta,height,axial):
    chord_error=c.I(0,4*height**2)
    contraction_error=c.I(-4*height*axial,4*height*axial)
    def evaluate(delay):
        angle=offset*iv.pi/3-beta*delay
        return (2-2*iv.cos(angle)-delay**2+chord_error,
                -2*(beta*iv.sin(angle)+delay)+contraction_error)
    return evaluate

def chart(lo,hi,height,axial,guides):
    beta=c.I(lo,hi);recent=F(1,4);end=F(3)
    source_speed=iv.sqrt(c.rat(hi**2+axial**2))
    recent_margin=1-(1+source_speed)*c.rat(recent)
    diameter=2*iv.sqrt(c.rat(1+height**2))
    if c.sg(recent_margin)!=1 or c.ends(diameter)[1]>=end:raise ArithmeticError('global guard failed')
    rows=[]
    for offset,guide in enumerate(guides,1):
        record=c.census(equation(offset,beta,height,axial),[guide],recent,end)
        if len(record['roots'])!=1:raise ArithmeticError('not one complete partner root')
        rows.append({'source':offset,**record})
    return rows,{'recent':str(recent),'end':str(end),'sourceSpeed':c.enc(source_speed),
                 'recentPartnerMargin':c.enc(recent_margin),'remoteDiameter':c.enc(diameter)}

def known():
    static,guards=chart(F(0),F(0),F(0),F(0),[F(1),F(173,100),F(2),F(173,100),F(1)])
    for row,square in zip(static,[1,3,4,3,1]):
        a,b=map(F,row['roots'][0]['delay'])
        if not a*a<=square<=b*b:raise AssertionError('static chord square missing')
    gap,derivative=equation(3,c.I(0),F(0),F(0))(c.I(2))
    c.contains(gap,F(0));c.contains(derivative,F(-4))
    flat,_=chart(F(1),F(1),F(0),F(0),GUIDES)
    total=c.I(0)
    for row in flat:
        proof=row['roots'][0];delay=c.I(*map(F,proof['delay']));D=c.I(*map(F,proof['divisor']))
        if c.sg(D)!=1:raise AssertionError('flat unit partner divisor')
        angle=row['source']*iv.pi/3-delay
        total+=(-1)**(row['source']+1)*iv.sin(angle)/(delay**3*D)
    if c.ends(total)[0]<=F(1,10):raise AssertionError('analytic flat torque lower bound failed')
    rejected=False
    try:c.census(equation(1,c.I(0),F(0),F(0)),[],F(1,4),F(3))
    except ArithmeticError:rejected=True
    if not rejected:raise AssertionError('omitted root accepted')
    b=F(20001,20000);d=F(1,20)
    upper=b-d*d/24+b**5*d**4/1920;lower=1-b**3*d*d/6
    if not upper<1 or not lower>F(999,1000):raise AssertionError('exact sine inequalities')
    if not b*b+F(2,5)**2<F(11,10)**2:raise AssertionError('source speed inequality')
    if not F(999,1000)/F(21,10)>F(2,5):raise AssertionError('short self row coefficient')
    if 5/(F(2,5)**2*F(1,4))!=125:raise AssertionError('five partner row bound')
    return {'passed':True,'staticChannels':static,'flatChannels':flat,
            'flatTorque':c.enc(total),'omittedRootRejected':True,
            'sineChordRatioUpper':str(upper),'sineTangentRatioLower':str(lower),
            'controls':['five complete static partners and exact chord squares','diametric gap and derivative',
                        'analytic complete flat unit-circle torque greater than 1/10',
                        'omitted root rejected','exact rational sine, speed and row inequalities']}

def prior(stage):
    path=OUT/(stage+'.json');record=json.loads(path.read_text())
    if not record['completed'] or not record['passed'] or record['sourceSha256']!=sha(SOURCE):
        raise RuntimeError('matching previous pass required')
    return sha(path)

def main():
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','pilot','target'],required=True)
    stage=p.parse_args().stage
    for key in ['OPENBLAS_NUM_THREADS','OMP_NUM_THREADS','MKL_NUM_THREADS']:
        if os.environ.get(key)!='1':raise RuntimeError('one numerical thread required')
    OUT.mkdir(parents=True,exist_ok=True);destination=OUT/(stage+'.json')
    if destination.exists():raise FileExistsError('preserve existing receipt')
    data={'stage':stage,'sourceSha256':sha(SOURCE),'helperSha256':HELPER_SHA,
          'K':1,'c_f':1,'mpmathVersion':c.mpmath.__version__,'intervalDigits':iv.dps,
          'limits':{'internalSeconds':120,'supervisorSeconds':180,'residentBytes':512*1024**2,
                    'receiptBytes':8*1024**2,'threads':1},'completed':False,'passed':False}
    try:
        if stage=='known':data.update(known())
        else:
            data['knownSha256']=prior('known')
            if stage=='target':data['pilotSha256']=prior('pilot')
            lo=F(1);hi=F(1) if stage=='pilot' else F(20001,20000)
            h=F(1,10) if stage=='pilot' else F(1,5)
            u=F(1,5) if stage=='pilot' else F(2,5)
            data['domain']={'beta':[str(lo),str(hi)],'height':str(h),'axialSpeed':str(u)}
            rows,guard=chart(lo,hi,h,u,GUIDES);data['channels']=rows;data['guards']=guard
            delays=[F(row['roots'][0]['delay'][0]) for row in rows]
            divisors=[F(row['roots'][0]['divisor'][0]) for row in rows]
            data['minimumDelay']=str(min(delays));data['minimumSignedDivisor']=str(min(divisors))
            data['complementLeaves']=sum(len(row['complement']) for row in rows)
            data['passed']=min(delays)>F(2,5) and min(divisors)>F(1,4)
        data['completed']=True
    except Exception as error:data['failure']=repr(error)
    signal.alarm(0);data['wallSeconds']=time.monotonic()-START;data['maxResidentBytes']=c.rss()
    payload=json.dumps(data,indent=2)+'\n'
    if len(payload.encode())>8*1024**2:raise RuntimeError('receipt cap')
    with destination.open('x') as stream:stream.write(payload)
    print(json.dumps({'receipt':str(destination),'sha256':sha(destination),'bytes':len(payload.encode()),
                      'completed':data['completed'],'passed':data['passed'],'wallSeconds':data['wallSeconds'],
                      'maxResidentBytesAfterSerialization':c.rss(),'failure':data.get('failure')}),flush=True)
    if not data['completed']:raise SystemExit(1)

if __name__=='__main__':main()
