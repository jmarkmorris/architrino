"""Controlled measured checks of the separately stated far-coaxial theorem."""
import argparse
import hashlib
import importlib.util
import json
from fractions import Fraction
from pathlib import Path
import mpmath as mp

ROOT=Path(__file__).resolve().parents[2]
METHOD=ROOT/'scripts/photon-research/coaxial_ring_mutual_residual_20261003.py'
OUT=ROOT/'.local-data/ring-exploration/coaxial-far-mean'
METHOD_SHA='d4ee50325b693a385432ff110b32d05f582afd4a589a380a215177b56ab351c2'
spec=importlib.util.spec_from_file_location('admitted_mutual_method',METHOD)
base=importlib.util.module_from_spec(spec);spec.loader.exec_module(base)
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True)
    p=OUT/(stage+'.json');p.write_text(json.dumps(base.encode(dict(passed=True,instrumentSha256=sha(Path(__file__)),
        methodSha256=sha(METHOD),K=1,c_f=1,**data)),indent=2)+'\n')
    print(json.dumps(dict(stage=stage,passed=True,receiptSha256=sha(p))),flush=True)
def known():
    assert sha(METHOD)==METHOD_SHA
    rows,cov=base.channel(base.I(0),2,mp.iv.pi,0,1,-1)
    assert len(rows)==1
    exact=-2/mp.iv.sqrt(8)**3
    measured=rows[0]['dimensionlessAcceleration'][2]
    assert base.lo(measured)<=base.hi(exact) and base.lo(exact)<=base.hi(measured)
    assert base.sg(measured)==-1
    # Exact Laurent polynomial coefficient of (1-cos theta)^3 at k=3.
    poly={0:Fraction(1),1:Fraction(-1,2),-1:Fraction(-1,2)}
    cube={0:Fraction(1)}
    for _ in range(3):
        nxt={}
        for a,x in cube.items():
            for b,y in poly.items():nxt[a+b]=nxt.get(a+b,Fraction(0))+x*y
        cube=nxt
    assert cube[3]==cube[-3]==Fraction(-1,8)
    assert base.hi(mp.iv.exp(base.I(1)/4))<mp.mpf('1.285')
    assert mp.mpf('0.997')**2<1-mp.mpf('4.57')/1024
    image=base.I('2')*base.I('2.285')/(base.I('1.997')*32)
    derivative=base.I('1.285')/(32*base.I('.997'))
    amplitude=1/(base.I('.997')**3*base.I('.959'))
    assert base.hi(image)<mp.mpf('.072') and base.hi(derivative)<mp.mpf('.041') and base.hi(amplitude)<mp.mpf('1.06')
    save('known',dict(control='static source at axial gap2 and transverse chord2; exact negative1/(8sqrt2)',
        staticAcceleration=measured,staticCoverage=cov,laurentCoefficient='-1/8',
        analyticImageUpper=image,analyticDerivativeUpper=derivative,analyticAmplitudeUpper=amplitude))
def target():
    known=json.loads((OUT/'known.json').read_text())
    assert known['passed'] and known['instrumentSha256']==sha(Path(__file__)) and known['methodSha256']==sha(METHOD)
    results=[]
    for rung,beta,R,_,_ in base.references():
        for d in (300,1000,10000):
            for phase,phi in [('0',base.I(0)),('pi/6',mp.iv.pi/6)]:
                lower=base.mutual(beta,R,d,phi,1,-1);upper=base.mutual(beta,R,d,-phi,1,1)
                assert lower['mutualRootsPerReceiver']==upper['mutualRootsPerReceiver']==6
                prefactor=27*beta**3/(4*R**2*d**5)
                leadingLower=-prefactor*mp.iv.sin(3*(phi-beta*d))
                leadingUpper=-prefactor*mp.iv.sin(3*(phi+beta*d))
                epsilon0=1/(32*(1+beta));assert base.lo(d*epsilon0)>2
                bound=14/(R**2*d**6*epsilon0**4)
                errors=[lower['residualRadialTangentialAxial'][2]-leadingLower,upper['residualRadialTangentialAxial'][2]-leadingUpper]
                assert all(base.hi(abs(e))<base.lo(bound) for e in errors)
                row=dict(rung=rung,gapOverR=d,phase=phase,beta=beta,R=R,lower=lower,upper=upper,
                    leadingLower=leadingLower,leadingUpper=leadingUpper,absoluteErrors=errors,
                    coefficientScale=prefactor,conservativeCauchyErrorBound=bound,
                    errorOverCoefficientScale=[e/prefactor for e in errors],
                    grade='measured outward residual comparison, not independent theorem adjudication')
                results.append(row);save('progress',dict(completed=len(results),last=dict(rung=rung,d=d,phase=phase)))
    save('target',dict(rows=results,scope='12 prescribed far pairs, complete mutual ledger; no evolution or stability'))
if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--stage',choices=['known','target'],required=True);args=parser.parse_args()
    known() if args.stage=='known' else target()
