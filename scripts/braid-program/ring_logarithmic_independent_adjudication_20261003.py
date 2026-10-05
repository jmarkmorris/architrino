#!/usr/bin/env python3
"""Separate Cartesian/delay reconstruction of the frozen LOG ring witnesses.

Imports no subject evaluator. Analytical controls precede target; K_log=c_f=1.
"""
import argparse
import hashlib
import json
from pathlib import Path
import mpmath as mp

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'.local-data/ring-exploration/logarithmic-adjudication'
SUBJECT=ROOT/'reference/priorities/master-equation-closure/braid-program/analysis/ring-logarithmic-variation-2026-10-03.md'
INSTRUMENT=ROOT/'scripts/braid-program/ring_logarithmic_variation_20261003.py'
BALANCE=ROOT/'.local-data/ring-exploration/logarithmic/balance.json'
BASELINE=ROOT/'.local-data/ring-exploration/logarithmic/baseline-residual.json'
KNOWN=ROOT/'.local-data/ring-exploration/logarithmic/known.json'
FROZEN={SUBJECT:'2816e63e4f15255a67bea5e408befc356a6a842f07872f3cb8911f1486cbb2c2',
        INSTRUMENT:'0eecb7dd023d958a1936bf544ac144a658f640de78157b607dacd305c9aa5e16',
        BALANCE:'24835ebefdef9417fa2a070b7daf905e562b1da1238cc2d3ef0f33da2c7ccfb1',
        BASELINE:'33aa34499a915d131eca6cbff3948fb542b0faf5f8f6ac80e28eeee69a0d5333'}
mp.mp.dps=115;mp.iv.dps=100
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def lo(x):return mp.mpf(x._mpi_[0])
def hi(x):return mp.mpf(x._mpi_[1])
def I(a,b=None):return mp.iv.mpf([a,a if b is None else b])
def sign(x):return 1 if lo(x)>0 else -1 if hi(x)<0 else 0
def binary(x):return {'binary':[list(v) for v in x._mpi_],'display':[mp.nstr(lo(x),45),mp.nstr(hi(x),45)]}
def encode(x):
    if isinstance(x,dict):return {k:encode(v) for k,v in x.items()}
    if isinstance(x,(list,tuple)):return [encode(v) for v in x]
    if hasattr(x,'_mpi_'):return binary(x)
    if isinstance(x,mp.mpf):return mp.nstr(x,80)
    return x
def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(stage+'.json')
    p.write_text(json.dumps(encode({'stage':stage,'checkerSha256':sha(Path(__file__)),'c_f':1,'K_log':1,**data}),indent=2)+'\n')
    print(json.dumps({'stage':stage,'path':str(p.relative_to(ROOT)),'sha256':sha(p)}),flush=True)
def supplied_interval(x):return I(*[mp.mpf(tuple(v)) for v in x['binary']])

def delay_roots(beta,j):
    if beta==0:return [] if j==0 else [2*mp.sin(j*mp.pi/6)]
    alpha=j*mp.pi/3;nodes=[mp.mpf(0),mp.mpf(2)]
    # On each phase lobe the distance gap is strictly concave, and its one
    # maximum is known. Splitting at zeros/maxima makes every piece monotone.
    for k in range(-2,int(mp.ceil(beta/mp.pi))+3):
        start=(alpha+2*k*mp.pi)/beta
        if 0<start<2:nodes.append(start)
        if beta>1:
            turn=(alpha+2*k*mp.pi+2*mp.acos(1/beta))/beta
            if 0<turn<2:nodes.append(turn)
    nodes=sorted(nodes);roots=[]
    g=lambda x:2*abs(mp.sin((beta*x-alpha)/2))-x
    for a,b in zip(nodes,nodes[1:]):
        fa,fb=g(a),g(b)
        for x,v in ((a,fa),(b,fb)):
            if x>0 and abs(v)<mp.mpf('1e-108'):roots.append(x)
        if fa*fb<0:
            for _ in range(250):
                m=(a+b)/2;fm=g(m)
                if fm==0:a=b=m;break
                if fm*fa>0:a,fa=m,fm
                else:b=m
            roots.append((a+b)/2)
    roots.sort();unique=[]
    for x in roots:
        if not unique or x-unique[-1]>mp.mpf('1e-65'):unique.append(x)
    return unique

def evaluate(beta,t,check_cell=True):
    bm=(lo(beta)+hi(beta))/2
    if check_cell:
        if t==0:assert lo(beta)>=0 and hi(beta)<=1
        else:
            y=mp.iv.sqrt(beta*beta-1);M=y-mp.iv.atan2(y,I(1))
            assert sign(M-(t-1)*mp.iv.pi/6)==1 and sign(t*mp.iv.pi/6-M)==1
    rows=[];radial=tangent=I(0)
    for j in range(6):
        alpha=j*mp.iv.pi/3;previous=None
        for x in delay_roots(bm,j):
            pad=mp.mpf('1e-60')+mp.mpf('1e6')*(hi(beta)-lo(beta));a,b=x-pad,x+pad;assert a>0
            gap=lambda u:2*abs(mp.iv.sin((beta*u-alpha)/2))-u
            left,right=gap(I(a)),gap(I(b));assert sign(left)*sign(right)==-1
            xi=I(a,b);theta=alpha-beta*xi;si=mp.iv.sin(theta);co=mp.iv.cos(theta)
            assert previous is None or hi(previous)<lo(xi)
            previous=xi
            D=1+beta*si/xi;sd=sign(D);assert sd
            half=(beta*xi-alpha)/2;tau=sign(mp.iv.sin(half));assert tau
            gap_derivative=tau*beta*mp.iv.cos(half)-1
            assert sign(gap_derivative)==-sd
            # The root's geometric chord gives the Cartesian vector directly;
            # no half-angle LOG coefficient formula is imported.
            row_r=(-1)**j*(1-co)/(xi*xi*D*sd)
            row_t=-(-1)**j*si/(xi*xi*D*sd)
            radial+=row_r;tangent+=row_t
            rows.append({'source':j,'delayOverR':xi,'D':D,'gapDerivative':gap_derivative,'leftGap':left,'rightGap':right,'Cr':row_r,'Ct':row_t})
    expected=5 if t==0 else 2*t+4
    assert len(rows)==expected
    return {'Cr':radial,'Ct':tangent,'CtSign':sign(tangent),'directedRoots':6*len(rows),
            'positiveSelfRoots':sum(v['source']==0 for v in rows)*6,'rows':rows}

def control():
    # LOG static Cartesian vector A=(x,y)/(x^2+y^2), not inverse-square.
    static=[I(2)/I(4),I(0)];assert lo(static[0])==hi(static[0])==mp.mpf('.5')
    derivative=[-I(1)/4,I(1)/4];assert lo(derivative[0])==-mp.mpf('.25') and lo(derivative[1])==mp.mpf('.25')
    hexagon=evaluate(I(0),0);assert lo(hexagon['Cr'])<=-mp.mpf('.5')<=hi(hexagon['Cr'])
    assert lo(hexagon['Ct'])<=0<=hi(hexagon['Ct']) and hexagon['directedRoots']==30
    exact=evaluate(2*mp.iv.pi/3,2)
    assert any(v['source']==1 and lo(v['delayOverR'])<=2<=hi(v['delayOverR']) for v in exact['rows'])
    slopes=[]
    for N in (1,2,3,10):
        total=-sum(((-1)**j*mp.iv.sin(j*mp.iv.pi/(2*N))/2 for j in range(1,2*N)),I(0))
        closed=mp.iv.sin(mp.iv.pi/(4*N))/(2*mp.iv.cos(mp.iv.pi/(4*N)))
        assert lo(total-closed)<=0<=hi(total-closed) and sign(total)==1
        slopes.append({'N':N,'finiteSum':total,'closedForm':closed})
    save('control',{'passed':True,'staticAcceleration':static,'staticJacobianDiagonal':derivative,'staticHexagon':hexagon,
                    'exactJ1Delay2Witness':[v for v in exact['rows'] if v['source']==1 and lo(v['delayOverR'])<=2<=hi(v['delayOverR'])],
                    'smallSpeedSlopes':slopes})

def target():
    c=json.loads((OUT/'control.json').read_text());assert c['passed'] and c['checkerSha256']==sha(Path(__file__))
    for p,h in FROZEN.items():assert sha(p)==h
    subject=json.loads(BALANCE.read_text());base=json.loads(BASELINE.read_text());known=json.loads(KNOWN.read_text())
    assert known['passed'] and known['instrumentSha256']==FROZEN[INSTRUMENT] and subject['passed'] and base['passed']
    results=[]
    for cell in subject['rows']:
        assert cell['finiteScanNotComplete'] and not cell['candidates']
        for record in cell['representativeSignedPoints']:
            b=mp.mpf(record['beta']);beta=I(b-mp.mpf('1e-70'),b+mp.mpf('1e-70'))
            measured=evaluate(beta,cell['topology']);assert measured['CtSign']==record['strictSign']
            supplied=supplied_interval(record['Ct']);assert max(lo(supplied),lo(measured['Ct']))<=min(hi(supplied),hi(measured['Ct']))
            assert measured['directedRoots']==record['directedRoots']
            results.append({'kind':'cell-point','topology':cell['topology'],'fraction':record['fractionThroughCell'],'beta':beta,**measured})
        save('progress',{'passed':True,'completedPoints':len(results),'lastCell':cell['topology']})
    for record in subject['lowSpeedSignedPoints']:
        measured=evaluate(I(record['beta']),0);assert measured['CtSign']==record['strictSign']==1
        assert max(lo(supplied_interval(record['Ct'])),lo(measured['Ct']))<=min(hi(supplied_interval(record['Ct'])),hi(measured['Ct']))
        results.append({'kind':'low-speed-point','beta':I(record['beta']),**measured})
    for record in base['rows']:
        t=int(record['baselineRung'][1:]);beta=I(*record['baselineBetaBracket']);measured=evaluate(beta,t)
        assert measured['CtSign']==record['strictSign']==-1 and measured['directedRoots']==record['directedRoots']
        assert max(lo(supplied_interval(record['logCt'])),lo(measured['Ct']))<=min(hi(supplied_interval(record['logCt'])),hi(measured['Ct']))
        results.append({'kind':'exact-baseline-bracket','topology':t,'beta':beta,**measured})
    assert len(results)==68
    save('target',{'passed':True,'frozenInputs':{str(p.relative_to(ROOT)):h for p,h in FROZEN.items()},'rows':results,
                   'scope':'65 point signs and3 baseline bracket exclusions; no continuous-cell zero census, stability or ladder theorem by numerical scan'})

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['control','target'],required=True)
    args=p.parse_args();control() if args.stage=='control' else target()
