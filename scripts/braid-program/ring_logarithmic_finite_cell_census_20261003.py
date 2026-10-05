#!/usr/bin/env python3
"""Continuous LOG tangential sign cover on T01..T04, plus fold-end bounds.

Uses unchanged frozen root proposals, independently checks endpoint root
enclosures and constructs a continuous speed cover. No baseline import or
stability calculation. K_log=c_f=1; every positive-delay self hit retained.
"""
import argparse
import hashlib
import importlib.util
import json
from pathlib import Path
import sys
import time

import mpmath as mp

ROOT=Path(__file__).resolve().parents[2]
SOURCE=ROOT/'scripts/braid-program/ring_logarithmic_variation_20261003.py'
SOURCE_HASH='0eecb7dd023d958a1936bf544ac144a658f640de78157b607dacd305c9aa5e16'
assert hashlib.sha256(SOURCE.read_bytes()).hexdigest()==SOURCE_HASH
spec=importlib.util.spec_from_file_location('frozen_log_proposals',SOURCE)
proposal=importlib.util.module_from_spec(spec);spec.loader.exec_module(proposal)
mp.mp.dps=110;mp.iv.dps=85
OUT=ROOT/'.local-data/ring-exploration/logarithmic-finite-cells'
MAX_BOXES=20000
STRIP='1e-5'
RHO='0.01'


def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def I(a,b=None):return mp.iv.mpf(a if b is None else [a,b])
def lo(x):return mp.mpf(x.a)
def hi(x):return mp.mpf(x.b)
def sign(x):return 1 if lo(x)>0 else -1 if hi(x)<0 else 0
def angle_star(beta):return mp.iv.atan2(mp.iv.sqrt(beta**2-1),I(1))
def encode(x):
    if hasattr(x,'_mpi_'):return {'binary':x._mpi_,'decimalDiagnostics':[mp.nstr(lo(x),75),mp.nstr(hi(x),75)]}
    if isinstance(x,dict):return {k:encode(v) for k,v in x.items()}
    if isinstance(x,(list,tuple)):return [encode(v) for v in x]
    if isinstance(x,mp.mpf):return mp.nstr(x,90)
    return x
def record(name,data):
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(name+'.json')
    payload={'instrumentSha256':sha(Path(__file__)),'frozenProposalSha256':SOURCE_HASH,
             'K_log':1,'c_f':1,'pointDps':110,'intervalDps':85,**data}
    p.write_text(json.dumps(encode(payload),indent=2,sort_keys=True)+'\n')
    print(json.dumps({'receipt':str(p.relative_to(ROOT)),'passed':data.get('passed'),
                      'sha256':sha(p),'cell':data.get('cell'),'acceptedBoxes':data.get('acceptedBoxes')}),flush=True)
def gate():
    a=json.loads((OUT/'known.json').read_text())
    assert a['passed'] and a['instrumentSha256']==sha(Path(__file__)) and sha(SOURCE)==SOURCE_HASH


def row_enclosure(beta,m,side):
    boxes=[]
    for b in (lo(beta),hi(beta)):
        x=proposal.root(b,m,side);pad=mp.mpf('1e-70')
        a,c=x-pad,x+pad
        f=lambda z:I(b)*mp.iv.sin(I(z))-I(z)-m*mp.iv.pi/6
        expected=-1 if side=='rising' else 1
        assert sign(f(a))==expected and sign(f(c))==-expected
        boxes.append((a,c))
    x=I(min(a for a,b in boxes),max(b for a,b in boxes))
    assert lo(x)>0 and hi(x)<lo(mp.iv.pi)
    sn,cs=mp.iv.sin(x),mp.iv.cos(x)
    divisor=1-beta*cs;expected=-1 if side=='rising' else 1
    if sign(divisor)!=expected:raise ValueError('interval divisor not signed')
    ct=(-1)**m*cs/(2*sn*abs(divisor))
    return {'m':m,'side':side,'x':x,'D':divisor,'Ct':ct,
            'endpointRootBoxes':[I(a,b) for a,b in boxes]}


def sum_rows(beta,branches):
    rows=[row_enclosure(beta,m,side) for m,side in branches]
    return sum((r['Ct'] for r in rows),I(0)),rows


def fold(q,known_height=None):
    if q==0:return I(1)
    center=proposal.fold(q);radius=mp.mpf('1e-70')
    bracket=I(center-radius,center+radius)
    height=q*mp.iv.pi/6 if known_height is None else known_height
    f=lambda b:mp.iv.sqrt(b*b-1)-angle_star(b)-height
    assert sign(f(I(lo(bracket))))==-1 and sign(f(I(hi(bracket))))==1
    derivative=mp.iv.sqrt(1-1/bracket**2)
    image=I(center)-f(I(center))/derivative
    assert lo(bracket)<lo(image)<=hi(image)<hi(bracket)
    return image


def fold_strip(cell,left):
    q=cell-1;beta=I(lo(left),hi(left)+mp.mpf(STRIP))
    old=[(m,'descending') for m in range(-5,0)]
    if q:
        old.append((0,'descending'))
        old.extend((m,side) for m in range(1,q) for side in ('rising','descending'))
    older,rows=sum_rows(beta,old)
    rho=I(RHO)
    if q==0:
        # Exact wake-speed endpoint, with the new self root in(0,rho).
        assert sign(I(hi(beta))*mp.iv.sin(rho)-rho)==-1
        cot=mp.iv.cos(rho)/mp.iv.sin(rho)
        dmax=1-mp.iv.cos(rho)
        magnitude=cot/(2*dmax)
        extras={'wakeRootRightEndpointResidual':I(hi(beta))*mp.iv.sin(rho)-rho,
                'selfRootDomain':'0<x<rho, descending m0; all other five levels retained'}
    else:
        b=mp.iv.sqrt(beta**2-1);xstar=angle_star(beta)
        maximum=mp.iv.sqrt(I(hi(beta))**2-1)-angle_star(I(hi(beta)))
        gapmax=maximum-q*mp.iv.pi/6
        boundary=b*(1-mp.iv.cos(rho))-(rho-mp.iv.sin(rho))
        assert lo(boundary)>hi(gapmax)>0
        tube=I(lo(xstar)-hi(rho),hi(xstar)+hi(rho))
        cot=mp.iv.cos(tube)/mp.iv.sin(tube)
        assert lo(cot)>0
        dmax=I(hi(abs(1-beta*mp.iv.cos(tube))))
        magnitude=cot/dmax
        extras={'foldHeightGapUpper':gapmax,'movingCenterBoundaryGapLower':boundary,
                'xstar':xstar,'newPairTube':tube,'pairRootDomain':'one root on each side of xstar, both inside moving±rho tube'}
    margin=magnitude-abs(older)
    assert lo(margin)>0
    return {'beta':beta,'rho':rho,'olderCt':older,'olderRows':rows,
            'newbornMagnitudeLower':magnitude,'absoluteDominanceMargin':margin,
            'CtSign':(-1)**q,'domain':'one-sided open cell above exact left fold; singular endpoint excluded',**extras}


def known():
    # Inverse-distance static source and static complete hexagon.
    static=I(2)/I(4);assert lo(static)==hi(static)==mp.mpf('.5')
    zero,rows=sum_rows(I(0),[(m,'descending') for m in range(-5,0)])
    assert sign(zero)==0 and max(abs(lo(zero)),abs(hi(zero)))<mp.mpf('1e-60')
    analytic=row_enclosure(2*mp.iv.pi/3,1,'descending')
    assert lo(analytic['x'])<=lo(mp.iv.pi/2)<=hi(mp.iv.pi/2)<=hi(analytic['x'])
    # Independently known moving-center fold identity at beta=2, y=.01.
    beta=I(2);b=mp.iv.sqrt(beta**2-1);x=angle_star(beta);y=I('.01')
    direct=(beta*mp.iv.sin(x)-x)-(beta*mp.iv.sin(x+y)-(x+y))
    closed=b*(1-mp.iv.cos(y))+y-mp.iv.sin(y)
    assert sign(direct-closed)==0 and lo(closed)>0
    exact_height=mp.iv.sqrt(I(3))-mp.iv.pi/3
    exact_fold=fold(6*mp.sqrt(3)/mp.pi-2,exact_height)
    assert lo(exact_fold)<=2<=hi(exact_fold)
    record('known',{'passed':True,'controlOrder':['staticInverseDistance','staticHexagon','exactDescendingPiOver2Root','exactMovingFoldIdentity','analyticalFoldAtBeta2'],
                    'staticAcceleration':static,'staticHexagonCt':zero,'staticRows':rows,
                    'exactRoot':analytic,'foldIdentityResidual':direct-closed,
                    'exactFoldAtBeta2':exact_fold})


def target(cell):
    gate();start=time.monotonic();left,right=fold(cell-1),fold(cell)
    strip=fold_strip(cell,left)
    begin=lo(left)+mp.mpf(STRIP);end=hi(right)
    expected=(-1)**(cell-1)
    branches=[(m,'descending') for m in range(-5,1)]
    branches.extend((m,side) for m in range(1,cell) for side in ('rising','descending'))
    stack=[(begin,end,0)];accepted=[];attempts=0;maximum_depth=0
    while stack:
        a,b,depth=stack.pop();attempts+=1;maximum_depth=max(maximum_depth,depth)
        if attempts>MAX_BOXES or depth>40:
            record(f'T{cell:02d}',{'passed':False,'cell':cell,'blocker':'bounded interval cover budget exhausted',
                                   'attempts':attempts,'acceptedBoxes':len(accepted),'remaining':len(stack)+1,
                                   'leftFold':left,'rightFold':right,'foldStrip':strip,'partialCover':accepted});return
        try:
            ct,rows=sum_rows(I(a,b),branches)
            success=sign(ct)==expected
        except ValueError:
            success=False
        if success:
            accepted.append({'beta':I(a,b),'Ct':ct,'rows':rows,'depth':depth})
        else:
            middle=(a+b)/2;stack.extend([(a,middle,depth+1),(middle,b,depth+1)])
        if attempts%50==0:
            record(f'T{cell:02d}-progress',{'passed':False,'cell':cell,'attempts':attempts,
                                          'acceptedBoxes':len(accepted),'remaining':len(stack),'wallSeconds':time.monotonic()-start})
    ordered=sorted(accepted,key=lambda row:lo(row['beta']))
    assert lo(ordered[0]['beta'])==begin and hi(ordered[-1]['beta'])==end
    assert all(hi(a['beta'])==lo(b['beta']) for a,b in zip(ordered,ordered[1:]))
    assert hi(strip['beta'])>=begin
    regular_margin=I(min(lo(expected*row['Ct']) for row in ordered))
    global_margin=I(min(lo(regular_margin),lo(strip['absoluteDominanceMargin'])))
    assert lo(global_margin)>0
    record(f'T{cell:02d}',{'passed':True,'cell':cell,'leftFold':left,'rightFold':right,'foldStrip':strip,
                           'regularCover':ordered,'acceptedBoxes':len(ordered),'attempts':attempts,
                           'maximumDepth':maximum_depth,'CtSign':expected,'directedRootsThroughoutOpenCell':6*len(branches),
                           'regularSignedCtLowerBound':regular_margin,'wholeOpenCellSignedCtLowerBound':global_margin,
                           'wallSeconds':time.monotonic()-start,
                           'scope':'whole ordinary open cell; outgoing sheet continuation used only to enclose right open boundary; singular fold itself excluded',
                           'conclusion':'no exact regular six-member LOG circle at any positive radius or fixed positive coupling in this open cell'})


if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('stage',choices=('known','target'));parser.add_argument('--cell',type=int,choices=(1,2,3,4));args=parser.parse_args()
    known() if args.stage=='known' else target(args.cell)
