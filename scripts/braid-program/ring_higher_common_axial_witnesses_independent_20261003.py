#!/usr/bin/env python3
"""Independent positive-complex witnesses on the admitted axial references.
Uses frozen independent Cartesian scalar functions, never root-subject code.
Rectangle self-map plus derivative contraction certifies simple roots.
"""
import argparse,hashlib,importlib.util,json
from pathlib import Path
import mpmath as mp
ROOT=Path(__file__).resolve().parents[2]
PRIMITIVE=ROOT/'scripts/braid-program/ring_higher_common_axial_independent_20261003.py'
PRIMITIVE_SHA='6fd5b1d4b85be98765c74e2ebcaeaf6d01d251e5b03b1b6f28ef6f627f757a04'
OUT=ROOT/'.local-data/ring-exploration/higher-common-axial-witness-independent'
spec=importlib.util.spec_from_file_location('frozen_independent_axial',PRIMITIVE);own=importlib.util.module_from_spec(spec);spec.loader.exec_module(own)
I=own.I;lo=own.lo;hi=own.hi
PROPOSALS={10:[('5.349766894743662830359109721309796202578572858885357437','82.83729145672599985698146499922769949211494479628037947')],20:[('56.86902463158019657171412066601016690038514748249965876','338.1784193916100525840535046321499473426509151249838396')],50:[('472.114503900514604480091928025620865603406826506735691191774','2402.43241533892116237051584902098149808309898069685051484912')],100:[('1453.91041556401967042795395152079594823975501876692952426429','10674.7834802021457288544642946057262520318034541233707297662'),('1205.81213181214790369303391164163228493149586887669949026202','17601.5136269676242986225934106454583845328990780125246681685')],200:[('2867.9787857061331028021579416833314438300963310061258913713','44104.9083016106797485296267269132456558109942172747677614958'),('10174.8385365248501349761562358679782889723232373581239967945','78211.7017100493204034238042857660347906271609739655269318139'),('1244.5597363807931193353434948380207218622346950937566702244','111674.649294509886383868575107808019259583542657059999053591')]}
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(stage+'.json');p.write_text(json.dumps(own.method.encode({'instrumentSha256':sha(Path(__file__)),'primitiveSha256':sha(PRIMITIVE),'K':1,'c_f':1,**data}),indent=2,sort_keys=True)+'\n');print(json.dumps({'stage':stage,'passed':data['passed'],'sha256':sha(p)}),flush=True)
def witness(fun,derivative,point,halfwidth):
    c=mp.mpc(*point);C=own.method.C(c);h=mp.mpf(halfwidth);X=mp.iv.mpc(I(c.real-h,c.real+h),I(c.imag-h,c.imag+h));gc=fun(C);dc=derivative(C);mid=own.method.midpoint(dc);assert mid!=0
    Y=own.method.C(1/mid);dx=derivative(X);defect=1-Y*dx;K=C-Y*gc+defect*(X-C)
    assert lo(X.real)<lo(K.real)<hi(K.real)<hi(X.real) and lo(X.imag)<lo(K.imag)<hi(K.imag)<hi(X.imag)
    assert hi(abs(defect))<1 and lo(abs(dx))>0
    return {'rootRectangle':X,'selfMapImage':K,'preconditioner':Y,'derivativeEnclosure':dx,'derivativeContractionCap':abs(defect),'centerResidual':gc,'nonmultiplicity':True}
def known():
    assert sha(PRIMITIVE)==PRIMITIVE_SHA
    f=lambda z:(z-I('.5'))**2+1;df=lambda z:2*(z-I('.5'))
    a=witness(f,df,('.5','1'),'.001');assert lo(a['rootRectangle'].real)>0 and lo(a['rootRectangle'].imag)>0
    save('known',{'passed':True,'knownExactRoot':['.5','1'],'knownQuadraticWitness':a})
def target():
    p=json.loads((OUT/'known.json').read_text());assert p['passed'] and p['instrumentSha256']==sha(Path(__file__)) and p['primitiveSha256']==PRIMITIVE_SHA and sha(PRIMITIVE)==PRIMITIVE_SHA
    results=[]
    for t,proposals in PROPOSALS.items():
        rows,admission=own.reconstruct(t);G,derivative=own.functions(rows);answers=[]
        for proposal in proposals:
            answer=witness(G,derivative,proposal,'1e-10');assert lo(answer['rootRectangle'].real)>0 and lo(answer['rootRectangle'].imag)>0;answers.append(answer)
        path=ROOT/f'.local-data/ring-exploration/higher-common-axial-independent/T{t:02d}-target.json';count=json.loads(path.read_text());assert count['passed'] and count['instrumentSha256']==PRIMITIVE_SHA and count['zeroCount']==2*len(answers)
        results.append({'rung':t,'countReceiptSha256':sha(path),'rightHalfPlaneRootCount':count['zeroCount'],**admission,'positiveImaginarySimpleWitnesses':answers});print(json.dumps({'rung':t,'certifiedPositiveImaginaryWitnesses':len(answers)}),flush=True)
    save('target',{'passed':True,'results':results,'scope':'eight simple positive-imaginary roots plus conjugates; complete scalar counts on selected exact references'})
if __name__=='__main__':
    ap=argparse.ArgumentParser();ap.add_argument('--stage',choices=['known','target'],required=True);a=ap.parse_args();known() if a.stage=='known' else target()
