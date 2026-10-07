"""Independent varying-radius/rate interval geometry and exact cell audit.

Only the previously frozen independent interval/census helper is imported.
Subject receipt fields are used solely for exact beta/index correspondence.
"""
import argparse
from fractions import Fraction as F
import hashlib
import importlib.util
import json
import os
from pathlib import Path
import signal
import time

SOURCE = Path(__file__).resolve()
ROOT = SOURCE.parents[5]
HELPER = SOURCE.with_name('overnight2-b-independent-superwake-norm-chart.py')
HELPER_HASH = 'f9a9bcbfb5fa9771356ac6b9428e0a49e02ee4a5db1825f8665759e7ad2b9d39'
INPUT = ROOT / '.local-data/master-equation-closure/overnight2-b/variable-planar-torque/target.json'
INPUT_HASH = '78cd8b2a35f025f1a7f84fc592c73999494091fc6041dd40f999db561e7ed2e3'
OUT = ROOT / '.local-data/master-equation-closure/overnight2-b/independent-variable-planar-torque'

def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

if sha(HELPER) != HELPER_HASH:
    raise RuntimeError('independent dependency changed')
loader = importlib.util.spec_from_file_location('frozen_independent_intervals', HELPER)
c = importlib.util.module_from_spec(loader)
loader.loader.exec_module(c)
signal.alarm(0)
iv = c.iv
START = time.monotonic()

def deadline(*args):
    raise TimeoutError('120-second internal limit')

signal.signal(signal.SIGALRM, deadline)
signal.alarm(120)
GUIDES = [F(13,25), F(51,50), F(37,25), F(93,50), F(399,200)]

def planar_chord(d, angle, receiver_radius, source_radius, radial_velocity, source_rate):
    """Return squared planar gap and its actual delay derivative."""
    r, s = receiver_radius, source_radius
    cosine, sine = iv.cos(angle), iv.sin(angle)
    gap = (r-s)**2 + 2*r*s*(1-cosine) - d**2
    # Differentiate separation with respect to delay: Q_d equals source velocity.
    q_dot_v = radial_velocity*(r*cosine-s) - r*s*source_rate*sine
    return gap, 2*(q_dot_v-d)

def enclosed_history(j, beta, e, h, u):
    radius = c.I(1-e, 1+e)
    angular = beta + c.I(-e, e)
    radial_velocity = c.I(-e, e)
    height_square = c.I(0, 4*h*h)
    height_derivative = c.I(-4*h*u, 4*h*u)
    def evaluate(d):
        # Average rate bounds enclose the integral over the complete delay.
        angle = j*iv.pi/3 - angular*d
        g, slope = planar_chord(d, angle, radius, radius, radial_velocity, angular)
        return g+height_square, slope+height_derivative
    return evaluate

def exact_partition(cells, a, b, n):
    if len(cells) != n:
        raise ValueError('partition count')
    step = (b-a)/n
    cursor = a
    for k, pair in enumerate(cells):
        if pair != (a+k*step, a+(k+1)*step):
            raise ValueError('fixed endpoint mismatch')
        left, right = pair
        if left != cursor or not left < right:
            raise ValueError('partition gap/overlap')
        cursor = right
    if cursor != b:
        raise ValueError('outer endpoint mismatch')
    return {'complete':True, 'count':n, 'domain':[str(a),str(b)], 'step':str(step),
            'adjacency':'closed common endpoints and disjoint interiors'}

def certify(a, b, e, h, u, guides):
    beta = c.I(a,b)
    angular = beta+c.I(-e,e)
    radius = c.I(1-e,1+e)
    speed_squared = e*e+(1+e)**2*(max(abs(a-e),abs(b+e)))**2+u*u
    speed = iv.sqrt(c.rat(speed_squared))
    recent, remote = F(1,4), F(3)
    recent_gap = c.rat(1-e)-(1+speed)*c.rat(recent)
    diameter = 2*iv.sqrt(c.rat((1+e)**2+h*h))
    if c.sg(recent_gap) != 1 or c.ends(diameter)[1] >= remote:
        raise ArithmeticError('past-domain guards unresolved')
    channels = []
    torque = c.I(0)
    for j, hint in enumerate(guides, 1):
        fun = enclosed_history(j,beta,e,h,u)
        certificate = c.census(fun,[hint],recent,remote)
        if len(certificate['roots']) != 1:
            raise ArithmeticError('partner count mismatch')
        proof = certificate['roots'][0]
        d = c.I(*map(F,proof['delay']))
        divisor = c.I(*map(F,proof['divisor']))
        if c.sg(divisor) != 1:
            raise ArithmeticError('positive ordinary divisor unproved')
        numerator = (-1)**(j+1)*radius*iv.sin(j*iv.pi/3-angular*d)
        row = c.meet(numerator/(d**3*divisor),2*numerator/(d**2*abs(fun(d)[1])))
        torque += row
        channels.append({'source':j,'tangentialRow':c.enc(row),**certificate})
    return {'completeChart':True,'channels':channels,'partnerTorque':c.enc(torque),
            'disposition':'excluded' if c.ends(torque)[0]>0 else 'unresolved',
            'complementLeaves':sum(len(x['complement']) for x in channels),
            'guards':{'recent':str(recent),'end':str(remote),'speed':c.enc(speed),
                      'recentGap':c.enc(recent_gap),'diameter':c.enc(diameter)}}

def known():
    cells = [(F(k,8),F(k+1,8)) for k in range(8)]
    partition = exact_partition(cells,F(0),F(1),8)
    duplicate = list(cells); duplicate[1] = duplicate[0]
    overlap = list(cells); overlap[1] = (F(1,16),F(1,4))
    rejected = []
    for name, broken in [('missing',cells[:-1]),('duplicate',duplicate),('overlap',overlap)]:
        try:
            exact_partition(broken,F(0),F(1),8)
        except ValueError:
            rejected.append(name)
        else:
            raise AssertionError('invalid partition accepted')
    g, gd = planar_chord(c.I(2),iv.pi,c.I(2),c.I(3),c.rat(F(1,10)),c.I(0))
    c.contains(g,F(21)); c.contains(gd,F(-5))
    g2, gd2 = planar_chord(c.I(2),iv.pi/2,c.I(2),c.I(3),c.rat(F(1,10)),c.rat(F(1,4)))
    c.contains(g2,F(9)); c.contains(gd2,F(-38,5))
    static = certify(F(0),F(0),F(0),F(0),F(0),[F(1),F(173,100),F(2),F(173,100),F(1)])
    c.contains(c.I(*map(F,static['partnerTorque'])),F(0))
    for channel,square in zip(static['channels'],[1,3,4,3,1]):
        lo,hi = map(F,channel['roots'][0]['delay'])
        if not lo*lo <= square <= hi*hi:
            raise AssertionError('static squared chord mismatch')
    flat = certify(F(1),F(1),F(0),F(0),F(0),GUIDES)
    if F(flat['partnerTorque'][0]) <= F(1,10):
        raise AssertionError('flat analytical bound missing')
    try:
        c.census(enclosed_history(1,c.I(0),F(0),F(0),F(0)),[],F(1,4),F(3))
    except ArithmeticError:
        pass
    else:
        raise AssertionError('omitted root accepted')
    e,h,u = F(1,1000),F(1,5),F(2,5)
    if not (F(3,5)-e>0 and (F(7,5)+e)*F(21,10)<3):
        raise AssertionError('self angle guard')
    if not 4*((1+e)**2+h*h)<F(21,10)**2:
        raise AssertionError('remote guard')
    if not e*e+(1+e)**2*(F(7,5)+e)**2+u*u<F(9,4):
        raise AssertionError('speed guard')
    return {'passed':True,'partition':partition,'corruptPartitionsRejected':rejected,
            'diametric':{'gap':c.enc(g),'derivative':c.enc(gd)},
            'quarterTurn':{'gap':c.enc(g2),'derivative':c.enc(gd2)},
            'static':static,'flat':flat,'omittedRootRejected':True,
            'rationalGuardsPassed':True}

def previous(stage):
    path = OUT/(stage+'.json')
    record = json.loads(path.read_text())
    if not record['completed'] or not record['passed'] or record['sourceSha256']!=sha(SOURCE):
        raise RuntimeError('matching prior pass required')
    return sha(path)

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--stage',choices=['known','pilot','target'],required=True)
    stage = parser.parse_args().stage
    for key in ['OPENBLAS_NUM_THREADS','OMP_NUM_THREADS','MKL_NUM_THREADS']:
        if os.environ.get(key) != '1':
            raise RuntimeError('single thread required')
    OUT.mkdir(parents=True,exist_ok=True)
    destination = OUT/(stage+'.json')
    if destination.exists():
        raise FileExistsError('preserve all prior receipts')
    record = {'stage':stage,'sourceSha256':sha(SOURCE),'helperSha256':HELPER_HASH,
              'inputSha256':INPUT_HASH,'K':1,'c_f':1,'mpmathVersion':c.mpmath.__version__,
              'intervalDigits':iv.dps,'completed':False,'passed':False,'results':[],
              'limits':{'internalSeconds':120,'supervisorSeconds':180,
                        'residentBytes':512*1024**2,'receiptBytes':8*1024**2,'threads':1}}
    try:
        if stage == 'known':
            record.update(known())
        else:
            record['knownSha256'] = previous('known')
            if stage == 'target':
                record['pilotSha256'] = previous('pilot')
            if sha(INPUT) != INPUT_HASH:
                raise RuntimeError('subject metadata identity changed')
            supplied = json.loads(INPUT.read_text())['results']
            if [row['index'] for row in supplied] != list(range(64)):
                raise ValueError('subject index inventory')
            cells = [tuple(map(F,row['beta'])) for row in supplied]
            record['partition'] = exact_partition(cells,F(3,5),F(7,5),64)
            selected = [0,21,42,63] if stage=='pilot' else list(range(64))
            record['selectedIndices'] = selected
            record['domain'] = {'beta':['3/5','7/5'],'e':'1/1000','h':'1/5','u':'2/5'}
            for k in selected:
                if time.monotonic()-START>110:
                    raise TimeoutError('pre-cell wall guard')
                a,b = cells[k]
                try:
                    row = certify(a,b,F(1,1000),F(1,5),F(2,5),GUIDES)
                except ArithmeticError as error:
                    row = {'completeChart':False,'disposition':'unresolved','error':repr(error)}
                record['results'].append({'index':k,'beta':[str(a),str(b)],**row})
            record['unresolvedIndices'] = [r['index'] for r in record['results'] if r['disposition']!='excluded']
            record['excludedCount'] = sum(r['disposition']=='excluded' for r in record['results'])
            record['passed'] = not record['unresolvedIndices']
            if record['passed']:
                margin,index = min((F(r['partnerTorque'][0]),r['index']) for r in record['results'])
                record['positiveMargin'],record['marginIndex'] = str(margin),index
        record['completed'] = True
    except Exception as error:
        record['failure'] = repr(error)
    signal.alarm(0)
    record['wallSeconds'],record['maxResidentBytes'] = time.monotonic()-START,c.rss()
    payload = json.dumps(record,indent=2)+'\n'
    if len(payload.encode())>8*1024**2:
        raise RuntimeError('receipt byte cap')
    with destination.open('x') as stream:
        stream.write(payload)
    print(json.dumps({'receipt':str(destination),'sha256':sha(destination),'bytes':len(payload.encode()),
                      'completed':record['completed'],'passed':record['passed'],
                      'wallSeconds':record['wallSeconds'],'maxResidentBytesAfterSerialization':c.rss(),
                      'excludedCount':record.get('excludedCount'),'unresolvedIndices':record.get('unresolvedIndices'),
                      'failure':record.get('failure')}),flush=True)
    if not record['completed']:
        raise SystemExit(1)

if __name__ == '__main__':
    main()
