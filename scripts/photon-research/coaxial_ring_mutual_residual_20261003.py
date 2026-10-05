#!/usr/bin/env python3
"""Complete ordinary mutual-root screen of prescribed coaxial exact rings.

No EOM evolution, no linearization and no ladder recomputation. Run control
before target. All numerical models use K=c_f=1; all sign claims use intervals.
"""
import argparse
import hashlib
import json
from pathlib import Path
import mpmath as mp

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / '.local-data/ring-exploration/coaxial'
BALANCE = ROOT / '.local-data/braid-analysis/b13-velocity-search/2026-08-29-b13-equal-radius-interval-zero-count.v1.json'
RADII = ROOT / '.local-data/ring-exploration/axial-adjudication/target.json'
BALANCE_SHA = 'fd83e4ea68aace450fc945e410182177c048be05a592608a865e14bc93e463af'
RADII_SHA = '1278c3a2aa76e3581c82cbeaf6e8ffd0c67f953262df28214c66b7e4feacd2c0'
mp.mp.dps = 110
mp.iv.dps = 95

def digest(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def lo(x): return mp.mpf(x._mpi_[0])
def hi(x): return mp.mpf(x._mpi_[1])
def I(a,b=None): return mp.iv.mpf([a,a if b is None else b])
def sg(x): return 1 if lo(x)>0 else -1 if hi(x)<0 else 0
def binary(x): return {'binary':[list(v) for v in x._mpi_], 'display':[mp.nstr(lo(x),40),mp.nstr(hi(x),40)]}
def encode(x):
    if isinstance(x,dict): return {k:encode(v) for k,v in x.items()}
    if isinstance(x,(list,tuple)): return [encode(v) for v in x]
    if hasattr(x,'_mpi_'): return binary(x)
    if isinstance(x,mp.mpf): return mp.nstr(x,50)
    return x
def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True)
    result={'stage':stage,'instrumentSha256':digest(Path(__file__)),'c_f':1,'K':1,'intervalDps':mp.iv.dps,**data}
    p=OUT/(stage+'.json');p.write_text(json.dumps(encode(result),indent=2)+'\n')
    print(json.dumps({'stage':stage,'path':str(p.relative_to(ROOT)),'sha256':digest(p)}),flush=True)
def require_control():
    c=json.loads((OUT/'control.json').read_text())
    assert c['passed'] and c['instrumentSha256']==digest(Path(__file__))

def refine(f,df,a,b):
    sa,sb=sg(f(I(a))),sg(f(I(b)))
    assert sa*sb==-1 and sg(df(I(a,b)))
    for _ in range(240):
        if b-a < mp.mpf('1e-24'): break
        m=(a+b)/2;sm=sg(f(I(m)))
        if sm==sa: a=m
        elif sm==sb: b=m
        else:
            aa=(3*a+b)/4;bb=(a+3*b)/4
            assert sg(f(I(aa)))==sa and sg(f(I(bb)))==sb
            a,b=aa,bb
    assert b-a < mp.mpf('1e-24') and sg(f(I(a)))==sa and sg(f(I(b)))==sb
    assert sg(df(I(a,b)))
    return I(a,b)

def isolate(f,df,a,b):
    # Every discarded box has a zero-free value range, or a fixed derivative
    # and same-sign endpoints. Every retained box has one transverse root.
    todo=[(mp.mpf(a),mp.mpf(b),0)];roots=[];visited=0;excluded=0;maxdepth=0
    while todo:
        a,b,depth=todo.pop();visited+=1;maxdepth=max(maxdepth,depth)
        assert visited<20000 and depth<180
        box=I(a,b)
        if sg(f(box)):
            excluded+=1;continue
        sd=sg(df(box));sa,sb=sg(f(I(a))),sg(f(I(b)))
        if sd and sa and sb:
            if sa!=sb: roots.append(refine(f,df,a,b))
            else: excluded+=1
            continue
        m=(a+b)/2;todo.extend([(m,b,depth+1),(a,m,depth+1)])
    roots.sort(key=lo)
    assert all(hi(a)<lo(b) for a,b in zip(roots,roots[1:]))
    return roots,{'visitedBoxes':visited,'excludedBoxes':excluded,'maxDepth':maxdepth,'completeOnRange':[str(a),str(b)]}

def channel(beta,d,phi,j,s,axial_sign):
    theta=lambda x:phi+j*mp.iv.pi/3-s*beta*x
    f=lambda x:x*x-d*d-2+2*mp.iv.cos(theta(x))
    df=lambda x:2*x+2*s*beta*mp.iv.sin(theta(x))
    # Exact causal coverage d<=x<=sqrt(d*d+4), padded by the rational d+2.
    roots,coverage=isolate(f,df,d,d+2)
    assert sg(f(I(d)))==-1 and sg(f(I(d+2)))==1
    rows=[]
    for x in roots:
        t=theta(x);co=mp.iv.cos(t);si=mp.iv.sin(t)
        D=1+s*beta*si/x;sd=sg(D);assert sd
        weight=(-1)**j/(x*x*D*sd)
        acc=[weight*(1-co)/x,-weight*si/x,weight*axial_sign*d/x]
        rows.append({'source':j,'delayOverR':x,'D':D,'dimensionlessScalarWeight':weight,'dimensionlessAcceleration':acc})
    coverage['completeOnRange']=[d,d+2]
    return rows,coverage

def mutual(beta,radius,d,phi,s,axial_sign):
    allrows=[];coverage=[]
    for j in range(6):
        rows,cov=channel(beta,d,phi,j,s,axial_sign);allrows+=rows;coverage.append({'source':j,**cov,'rootCount':len(rows)})
    coeff=[sum((row['dimensionlessAcceleration'][k] for row in allrows),I(0)) for k in range(3)]
    acc=[v/radius**2 for v in coeff]
    scalar=sum((row['dimensionlessScalarWeight'] for row in allrows),I(0))/radius**2
    axial_weight=sum((row['dimensionlessScalarWeight']/row['delayOverR'] for row in allrows),I(0))/radius**3
    return {'mutualRootsPerReceiver':len(allrows),'mutualDirectedRootsThisComponent':6*len(allrows),'residualRadialTangentialAxial':acc,
            'residualSigns':[sg(x) for x in acc],'crossScalarWeight':scalar,'crossScalarWeightSign':sg(scalar),'crossAxialWeight':axial_weight,
            'fullRows':allrows,'coverage':coverage,'delayCoveragePhysical':[d*radius,mp.iv.sqrt(d*d+4)*radius]}

def control():
    roots,coverage=isolate(lambda x:x*x-4,lambda x:2*x,1,3)
    assert len(roots)==1 and lo(roots[0])<=2<=hi(roots[0])
    static=[I(0),I(0),-I(2)/roots[0]**3]
    assert lo(static[2])<=-mp.mpf(1)/4<=hi(static[2]) and sg(static[2])==-1
    # Exact wake-speed helical self contact: transverse chord vanishes at
    # one full turn and the axial ray/source velocity gives D=0.
    chord=4*mp.iv.sin(mp.iv.pi)**2
    assert lo(chord)<=0<=hi(chord);D=I(1)-I(1);assert lo(D)==hi(D)==0
    # Independently known stationary fold boundary beta=2, d=3/2:
    # cos(theta)=1/4, x=sqrt(15)/2 gives both f=0 and D=0.
    c=I(1)/4;x=mp.iv.sqrt(15)/2;d=I(3)/2
    fold_value=x*x-d*d-2+2*c
    fold_factor=1-2*mp.iv.sqrt(1-c*c)/x
    assert lo(fold_value)<=0<=hi(fold_value) and lo(fold_factor)<=0<=hi(fold_factor)
    qmax=(I(2)-I(1)/2)**2-d*d;assert lo(qmax)==hi(qmax)==0
    # Before inherited target values, exercise ordinary six-source geometry
    # at a subwake synthetic beta and compare the analytic charge relabeling.
    beta=I('0.5');r=I(1);phi=mp.iv.pi/7
    a=mutual(beta,r,2,phi,1,-1);b=mutual(beta,r,2,phi+mp.iv.pi/3,1,-1)
    assert a['mutualRootsPerReceiver']==b['mutualRootsPerReceiver']==6
    for aa,bb in zip(a['residualRadialTangentialAxial'],b['residualRadialTangentialAxial']):
        assert lo(aa+bb)<=0<=hi(aa+bb)
    save('control',{'passed':True,'staticRoot':roots[0],'staticAcceleration':static,'staticCoverage':coverage,
                   'wakeSpeedHelicalChord':chord,'wakeSpeedHelicalTransmitterFactor':D,
                   'knownFoldBoundaryResidual':fold_value,'knownFoldBoundaryFactor':fold_factor,'phaseBijectionResidual':
                   [aa+bb for aa,bb in zip(a['residualRadialTangentialAxial'],b['residualRadialTangentialAxial'])]})

def references():
    assert digest(BALANCE)==BALANCE_SHA and digest(RADII)==RADII_SHA
    balance=json.loads(BALANCE.read_text());radii=json.loads(RADII.read_text());assert radii['passed']
    for t in (2,4):
        cell=next(v for v in balance['intervals'] if v['topologyIntervalId']==f'T{t:02d}')
        assert cell['uniqueZeroCount']==1 and len(cell['zeros'])==1
        beta=I(*cell['zeros'][0]['betaBracket'])
        row=next(v for v in radii['rows'] if v['topology']==t)
        radius=I(*[mp.mpf(tuple(v)) for v in row['radius']])
        assert sg(radius)==1
        same_scalar=I(*[mp.mpf(tuple(v)) for v in row['drift']])
        yield t,beta,radius,row['directed_roots'],same_scalar

def target():
    require_control();results=[]
    for t,beta,radius,isolated_roots,same_scalar in references():
        for d in (1,2,10):
            for phase_name,phi in [('0',I(0)),('pi/6',mp.iv.pi/6)]:
                for circulation,s in [('co',1),('contra',-1)]:
                    # Lower component circulates +; upper s. Products use
                    # aligned q0=+1; polarity conjugation negates every row.
                    lower=mutual(beta,radius,d,phi,s,-1)
                    upper=mutual(beta,radius,d,-phi,1,1)
                    for component in (lower,upper):
                        component['totalScalarWeight']=same_scalar+component['crossScalarWeight']
                        component['totalScalarWeightSign']=sg(component['totalScalarWeight'])
                    result={'topology':t,'gapOverR':d,'phase':phase_name,'circulation':circulation,'relativePolarity':1,
                            'beta':beta,'radius':radius,'Omega':beta/radius,'lower':lower,'upper':upper,
                            'isolatedScalarWeight':same_scalar,
                            'isolatedDirectedRootsBothComponents':2*isolated_roots,
                            'totalDirectedRoots':2*isolated_roots+lower['mutualDirectedRootsThisComponent']+upper['mutualDirectedRootsThisComponent'],
                            'phaseFoldMaximum':(beta-1/beta)**2-d*d,
                            'foldsAtSomeRelativePhase':sg((beta-1/beta)**2-d*d)==1,
                            'allPhaseOrdinaryByTransmitterBound':sg(I(d)-beta)==1,
                            'allPhaseTransmitterLowerBound':1-beta/d if sg(I(d)-beta)==1 else None,
                            'balanced':False,'balanceRejectionCertified':any(sg(v) for v in lower['residualRadialTangentialAxial']+upper['residualRadialTangentialAxial'])}
                    assert result['balanceRejectionCertified']
                    results.append(result)
                    save('progress',{'passed':True,'completedConfigurations':len(results),'lastConfiguration':{k:result[k] for k in ('topology','gapOverR','phase','circulation')},'rows':results})
    save('target',{'passed':True,'balanceSourceSha256':BALANCE_SHA,'radiusSourceSha256':RADII_SHA,'rows':results,
                   'scope':'24 prescribed pair preparations; full mutual residual, not stability, evolution, all spacings or all phases',
                   'relativePolarityMinusOne':'negate all mutual residuals and scalar weights; root census unchanged'})

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['control','target'],required=True)
    args=p.parse_args();control() if args.stage=='control' else target()
