"""Additional independent LOG census review using frozen own geometry checker.
No subject function imports. Original four-cell review stays byte frozen.
"""
import argparse,hashlib,importlib.util,json,time
from pathlib import Path
import mpmath as mp
ROOT=Path(__file__).resolve().parents[2]
HELPER=ROOT/'scripts/braid-program/ring_logarithmic_census_independent_adjudication_20261003.py'
HELPER_SHA='ff36abd46fafa59203d021a9e373351310bd444415d75cbd753e5099002b3f78'
assert hashlib.sha256(HELPER.read_bytes()).hexdigest()==HELPER_SHA
spec=importlib.util.spec_from_file_location('own_frozen_cartesian_log',HELPER);own=importlib.util.module_from_spec(spec);spec.loader.exec_module(own)
OUT=ROOT/'.local-data/ring-exploration/logarithmic-extended-adjudication'
SOURCE=ROOT/'.local-data/ring-exploration/logarithmic-extended-census'
HASHES={0:'84ebb5e9867e5e202f3725bdf1a82cea6c905c252c0d852fda40b5766b1c8158',5:'71a6163db66685d1bf87515f72ab0f7a4a4b46f854cb63d8811429139f64f832',6:'13513db00a696fa1fdb129aeeccad20d9bdcc0d439dc8e7cb457476e64da188d',7:'0d723a455760670e5e3b4ebc4d270fdad3bd1c1ad2379ef98453fc30801bcf8a',8:'aab4507eb18be3a3442412dfdaa54b8c62001c268c8f469cdd9d1f8d595b21ac',9:'4d128025af7216ed5cc7c3077fc77703a6b86879fcd5605b213195e84b4d8421',10:'8fd268496d997b2184e68bf5e276e2a01a4365e95b642a0d664511bb01049693',11:'d4acfa4bd41d6232139aa94c0aaa6d372ee94eee087cc28ebf53c5f21b1ced17',12:'efbc4c158c6100c54453c2406b3486ae64abdb70fe0fef03233ca4774d0a0a97',13:'6d4ba6ba1e47f0e59f1006fab532e3a4d80df2912bae0c641b5fe1adf05c13db',14:'85b88894e09cc180e4f2d2e22eba2dc8b9db82250f5394a231bf1d0b3db11454',15:'18c037476e9a651139f495a9f9646b656b73018efc3f8e165a6a1a396489cbe9',16:'4ea941bea378e830a784416f75b37e0c6d08d95e77a2f643552756744fee8a54',17:'2372617bd8cde199351e09da60793dc82ab4ee77ad3bb3d81fa80ff22846dd11',18:'e448faac0a923184e176e697cd5f2234f22379586134a5c7db1bf63fbf94f5fd',19:'b3e189ea7924bf3b4889222732e3f478ea5cc03a0d6e76128ffedac886d5a100',20:'6784296221b3007260a0eb6d3e0d3fc7d3c472d38a24c41b84a76349cea41595'}
I,lo,hi,read,sign=own.I,own.lo,own.hi,own.read,own.sign
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def save(name,data):
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(name+'.json')
    p.write_text(json.dumps(own.encode({'passed':True,'instrumentSha256':sha(Path(__file__)),'ownFrozenGeometrySha256':sha(HELPER),'K_log':1,'c_f':1,**data}),indent=2,sort_keys=True)+'\n')
    print(json.dumps({'name':name,'sha256':sha(p)}),flush=True)
def derivative(beta):
    rows=[];total=I(0)
    for m in range(-5,0):
        _,row=own.cartesian_row(beta,m,1);x,D=row['halfAngle'],row['cartesianD']
        value=-(-1)**m*mp.iv.sin(x)/(2*D**3)
        total+=value;rows.append({'m':m,'CtPrime':value,'geometry':row})
    return total,rows
def known():
    zero,_=own.sum_rows(I(0),[(m,1) for m in range(-5,0)]);assert lo(zero)<=0<=hi(zero)
    slope,rows=derivative(I(0));closed=(2-mp.iv.sqrt(I(3)))/2
    assert lo(slope-closed)<=0<=hi(slope-closed) and sign(slope)==1
    half=own.root(2*mp.pi/3,1,1);assert lo(half)<mp.pi/2<hi(half)
    beta=own.birth(1,mp.sqrt(3)-mp.pi/3,mp.iv.sqrt(I(3))-mp.iv.pi/3);assert lo(beta)<2<hi(beta)
    save('known',{'staticCt':zero,'independentStaticSlope':slope,'analyticalStaticSlope':closed,'derivativeRows':rows,'exactHalfAngle':half,'knownFoldBeta2':beta,'controls':'simplified exact CtPrime=-sigma sinx/(2D^3), own root/fold controls'})
def target(cells):
    k=json.loads((OUT/'known.json').read_text());assert k['passed'] and k['instrumentSha256']==sha(Path(__file__)) and k['ownFrozenGeometrySha256']==sha(HELPER)
    for cell in cells:
        beginTime=time.monotonic();path=SOURCE/f'T{cell:02d}.json';assert sha(path)==HASHES[cell];p=json.loads(path.read_text());assert p['passed']
        branches=[(m,1) for m in range(-5,0 if cell==0 else 1)]+([] if cell==0 else [(m,k) for m in range(1,cell) for k in (-1,1)])
        original=[read(r['beta']) for r in p['regularCover']];assert all(hi(a)==lo(b) for a,b in zip(original,original[1:]))
        if cell==0:
            assert abs(lo(original[0])-mp.mpf('.001'))<mp.mpf('1e-100') and hi(original[-1])==1
            originEnd=max(lo(original[0]),hi(mp.iv.mpf('.001')))
            slope,rows=derivative(I(0,originEnd));assert sign(slope)==1
            static,_=own.sum_rows(I(0),branches);assert lo(static)<=0<=hi(static)
            # Exact static radial coefficient .5 sum sigma=-.5.
            staticRadial=mp.mpf(-1)/2
            extras={'originCtPrime':slope,'originRows':rows,'staticCt':static,'staticRadialCoefficient':staticRadial,'rootCount':30,'positiveSelfHits':0}
        else:
            left,right=own.birth(cell-1),own.birth(cell)
            for exact,ref in [(left,read(p['leftFold'])),(right,read(p['rightFold']))]:assert lo(ref)<=lo(exact)<=hi(exact)<=hi(ref)
            assert hi(original[-1])>=hi(right)
            strip=own.moving_strip(cell,left,hi(read(p['analyticStrip']['beta']))+mp.mpf('1e-80'));assert hi(strip['beta'])>=lo(original[0])
            countSelf=6*sum(1 for m,k in branches if m%6==0)
            assert p['directedRootsThroughoutOpenCell']==6*len(branches) and p['positiveDelaySelfHits']==countSelf
            extras={'leftBirth':left,'rightBirth':right,'movingStrip':strip,'rootCount':6*len(branches),'positiveSelfHits':countSelf}
        expected=1 if cell==0 else (-1)**(cell-1);stack=[(lo(x),hi(x),0) for x in original];accepted=[];attempts=0
        while stack:
            a,b,d=stack.pop();attempts+=1;assert attempts<50000 and d<35
            try:ct,rows=own.sum_rows(I(a,b),branches);good=sign(ct)==expected
            except ValueError:good=False
            if good:accepted.append({'beta':I(a,b),'Ct':ct,'rows':rows,'depth':d})
            else:
                mid=(a+b)/2;stack.extend([(a,mid,d+1),(mid,b,d+1)])
        accepted.sort(key=lambda r:lo(r['beta']));assert all(hi(a['beta'])>=lo(b['beta']) for a,b in zip(accepted,accepted[1:]))
        assert lo(accepted[0]['beta'])<=lo(original[0]) and hi(accepted[-1]['beta'])>=hi(original[-1])
        margin=min(lo(expected*r['Ct']) for r in accepted);assert margin>0
        save(f'T{cell:02d}',{'cell':cell,'referenceReceiptSha256':sha(path),'regularCover':accepted,'CtSign':expected,'regularMarginLower':I(margin),'wallSeconds':time.monotonic()-beginTime,**extras})
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','target'],required=True);p.add_argument('--cells',type=int,nargs='+',default=[0,*range(5,21)]);a=p.parse_args()
    known() if a.stage=='known' else target(a.cells)
