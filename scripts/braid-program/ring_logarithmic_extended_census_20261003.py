#!/usr/bin/env python3
"""LOG continuous zero-to-wake and T05..T20 sign covers.

The original four-cell subject, instrument and receipts remain frozen.
This wrapper uses their admitted endpoint-root primitive without calling
their record/target functions; every output belongs to a new owner.
"""
import argparse
import hashlib
import importlib.util
import json
from pathlib import Path
import time

import mpmath as mp

ROOT=Path(__file__).resolve().parents[2]
PRIMITIVE=ROOT/'scripts/braid-program/ring_logarithmic_finite_cell_census_20261003.py'
PRIMITIVE_HASH='39b2a1803847bd5026f9395d9a7067cf3fcf542860c6ed44b0519bc36e9cf103'
assert hashlib.sha256(PRIMITIVE.read_bytes()).hexdigest()==PRIMITIVE_HASH
spec=importlib.util.spec_from_file_location('frozen_four_cell_primitive',PRIMITIVE)
frozen=importlib.util.module_from_spec(spec);spec.loader.exec_module(frozen)
mp.mp.dps=110;mp.iv.dps=85
OUT=ROOT/'.local-data/ring-exploration/logarithmic-extended-census'
I,lo,hi,sign,encode=frozen.I,frozen.lo,frozen.hi,frozen.sign,frozen.encode
MAX_BOXES=20000


def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def record(name,data):
    OUT.mkdir(parents=True,exist_ok=True);path=OUT/(name+'.json')
    payload={'instrumentSha256':sha(Path(__file__)),'frozenRootPrimitiveSha256':PRIMITIVE_HASH,
             'frozenProposalSha256':frozen.SOURCE_HASH,'K_log':1,'c_f':1,
             'pointDps':110,'intervalDps':85,**data}
    path.write_text(json.dumps(encode(payload),indent=2,sort_keys=True)+'\n')
    print(json.dumps({'receipt':str(path.relative_to(ROOT)),'passed':data.get('passed'),
                      'sha256':sha(path),'cell':data.get('cell'),'boxes':data.get('acceptedBoxes')}),flush=True)
def gate():
    data=json.loads((OUT/'known.json').read_text())
    assert data['passed'] and data['instrumentSha256']==sha(Path(__file__))
    assert sha(PRIMITIVE)==PRIMITIVE_HASH and sha(frozen.SOURCE)==frozen.SOURCE_HASH


def low_derivative(beta):
    rows=[];total=I(0)
    for m in range(-5,0):
        row=frozen.row_enclosure(beta,m,'descending')
        x,d=row['x'],row['D'];sn,co=mp.iv.sin(x),mp.iv.cos(x)
        dp=-co+beta*sn**2/d
        derivative=-(-1)**m*(1+co*dp)/(2*sn*d**2)
        total+=derivative;rows.append({**row,'Dprime':dp,'CtPrime':derivative})
    return total,rows


def known():
    static,rows=frozen.sum_rows(I(0),[(m,'descending') for m in range(-5,0)])
    assert sign(static)==0
    derivative,drows=low_derivative(I(0))
    closed=(2-mp.iv.sqrt(I(3)))/2
    assert sign(derivative-closed)==0 and sign(derivative)==1
    exact=frozen.row_enclosure(2*mp.iv.pi/3,1,'descending')
    assert lo(exact['x'])<=lo(mp.iv.pi/2)<=hi(mp.iv.pi/2)<=hi(exact['x'])
    exact_height=mp.iv.sqrt(I(3))-mp.iv.pi/3
    inverse=frozen.fold(6*mp.sqrt(3)/mp.pi-2,exact_height)
    assert lo(inverse)<=2<=hi(inverse)
    beta=I(2);y=I('.01');x=frozen.angle_star(beta);b=mp.iv.sqrt(beta**2-1)
    direct=(beta*mp.iv.sin(x)-x)-(beta*mp.iv.sin(x+y)-(x+y))
    formula=b*(1-mp.iv.cos(y))+y-mp.iv.sin(y)
    assert sign(direct-formula)==0 and sign(formula)==1
    record('known',{'passed':True,'controlOrder':['staticCompleteHexagon','analyticalCtPrimeAtZero','exactDescendingPiOver2Root','exactFoldBeta2','exactMovingCenterGap'],
                    'staticCt':static,'staticRows':rows,'CtPrimeZero':derivative,'closedSlope':closed,
                    'derivativeRows':drows,'exactRoot':exact,'knownFoldBeta2':inverse,'gapIdentityResidual':direct-formula})


def regular_cover(name,begin,end,branches,expected):
    stack=[(begin,end,0)];accepted=[];attempts=0;maximum_depth=0
    while stack:
        a,b,depth=stack.pop();attempts+=1;maximum_depth=max(maximum_depth,depth)
        if attempts>MAX_BOXES or depth>40:
            return {'passed':False,'blocker':'bounded speed-cover budget exhausted','partialCover':accepted,
                    'attempts':attempts,'remaining':len(stack)+1}
        try:
            ct,rows=frozen.sum_rows(I(a,b),branches);success=sign(ct)==expected
        except ValueError:success=False
        if success:accepted.append({'beta':I(a,b),'Ct':ct,'rows':rows,'depth':depth})
        else:
            mid=(a+b)/2;stack.extend([(a,mid,depth+1),(mid,b,depth+1)])
        if attempts%50==0:
            record(name+'-progress',{'passed':False,'attempts':attempts,'acceptedBoxes':len(accepted),'remaining':len(stack)})
    ordered=sorted(accepted,key=lambda row:lo(row['beta']))
    assert lo(ordered[0]['beta'])==begin and hi(ordered[-1]['beta'])==end
    assert all(hi(a['beta'])==lo(b['beta']) for a,b in zip(ordered,ordered[1:]))
    margin=I(min(lo(expected*row['Ct']) for row in ordered))
    assert lo(margin)>0
    return {'passed':True,'regularCover':ordered,'attempts':attempts,'acceptedBoxes':len(ordered),
            'maximumDepth':maximum_depth,'regularSignedCtLowerBound':margin}


def zero_to_wake():
    gate();start=time.monotonic();epsilon=mp.mpf('.001')
    derivative,rows=low_derivative(I(0,epsilon))
    assert sign(derivative)==1
    # Static Ct=0 exactly; the positive derivative supplies Ct>=m*beta>0
    # throughout the origin strip. No self root exists at or below wake.
    core=regular_cover('T00',epsilon,mp.mpf(1),[(m,'descending') for m in range(-5,0)],1)
    record('T00',{'cell':0,**core,'originStrip':[I(0,epsilon)],'originCtPrime':derivative,
                   'originRows':rows,'originProof':'Ct(0)=0 exactly and CtPrime>0 on[0,epsilon], so Ct(beta)>0 for beta>0',
                   'directedRootCount':30,'positiveDelaySelfHits':0,
                   'scope':'0<beta<=1 complete partner chart; beta0 static radial residual remainsnonzero',
                   'wallSeconds':time.monotonic()-start})


def strip_with_parameters(cell,left,width,rho_token):
    q=cell-1;beta=I(lo(left),hi(left)+mp.mpf(width));rho=I(rho_token)
    branches=[(m,'descending') for m in range(-5,1)]
    branches.extend((m,side) for m in range(1,q) for side in ('rising','descending'))
    old,rows=frozen.sum_rows(beta,branches)
    b=mp.iv.sqrt(beta**2-1);xstar=frozen.angle_star(beta)
    maximum=mp.iv.sqrt(I(hi(beta))**2-1)-frozen.angle_star(I(hi(beta)))
    gapmax=maximum-q*mp.iv.pi/6
    boundary=b*(1-mp.iv.cos(rho))-(rho-mp.iv.sin(rho))
    if not lo(boundary)>hi(gapmax)>0:raise ValueError('fold strip gap containment not proved')
    tube=I(lo(xstar)-hi(rho),hi(xstar)+hi(rho));cot=mp.iv.cos(tube)/mp.iv.sin(tube)
    if lo(cot)<=0:raise ValueError('newborn tube cotangent not positive')
    dmax=I(hi(abs(1-beta*mp.iv.cos(tube))));magnitude=cot/dmax
    margin=magnitude-abs(old)
    if lo(margin)<=0:raise ValueError('newborn dominance not proved')
    return {'beta':beta,'width':width,'rho':rho,'olderCt':old,'olderRows':rows,
            'foldHeightGapUpper':gapmax,'movingCenterBoundaryGapLower':boundary,
            'xstar':xstar,'newPairTube':tube,'newbornMagnitudeLower':magnitude,
            'absoluteDominanceMargin':margin,'CtSign':(-1)**q,
            'domain':'one-sided physical open cell above exact left fold; foldedendpoint excluded'}


def high_cell(cell):
    gate();start=time.monotonic();left,right=frozen.fold(cell-1),frozen.fold(cell)
    tries=[];strip=None
    for width,rho in [('1e-5','.01'),('1e-6','.001'),('1e-7','.001'),('1e-8','.0001')]:
        try:strip=strip_with_parameters(cell,left,width,rho);break
        except ValueError as exc:tries.append({'width':width,'rho':rho,'blocker':str(exc)})
    if strip is None:
        record(f'T{cell:02d}',{'passed':False,'cell':cell,'blocker':'all declared analytic strip admissions failed','trials':tries});return
    q=cell-1;branches=[(m,'descending') for m in range(-5,1)]
    branches.extend((m,side) for m in range(1,cell) for side in ('rising','descending'))
    begin=lo(left)+mp.mpf(strip['width']);end=hi(right);expected=(-1)**q
    core=regular_cover(f'T{cell:02d}',begin,end,branches,expected)
    assert hi(strip['beta'])>=begin
    if core['passed']:
        core['wholeOpenCellSignedCtLowerBound']=I(min(lo(core['regularSignedCtLowerBound']),lo(strip['absoluteDominanceMargin'])))
    record(f'T{cell:02d}',{'cell':cell,**core,'leftFold':left,'rightFold':right,
                           'analyticStrip':strip,'stripProposalFailures':tries,'CtSign':expected,
                           'directedRootsThroughoutOpenCell':6*len(branches),
                           'positiveDelaySelfHits':6*(1+2*(q//6)),
                           'scope':'whole ordinary open cell; outgoing-sheetcontinuation onlyenclosesrightedge, foldendpoints excluded',
                           'wallSeconds':time.monotonic()-start})


if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('stage',choices=('known','low','target'));p.add_argument('--cell',type=int,choices=range(5,21));args=p.parse_args()
    if args.stage=='known':known()
    elif args.stage=='low':zero_to_wake()
    else:high_cell(args.cell)
