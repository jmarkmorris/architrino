#!/usr/bin/env python3
"""Exact-reference defect residuals and prescribed axis-field diagnostics.
Known static and neutral square controls precede target. Consumes frozen
binary complete-root intervals; computes residuals, never defect stability.
"""
import argparse
import hashlib
import json
from pathlib import Path
import mpmath as mp
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'.local-data/ring-exploration/probe-defect'
mp.mp.dps=110;mp.iv.dps=85
HASHES={2:'3f44600259557b9736b860a904dc986193b7ca21f33cdbbaeb45f8bc0a440c50',
        4:'17b41d073a1aeec059e292b6696ad2fe54c60b27c46d54976848d29062debc4a'}
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def I(x):return mp.iv.mpf(x)
def lo(x):return mp.mpf(x._mpi_[0])
def hi(x):return mp.mpf(x._mpi_[1])
def nonzero(v):return any(lo(x)>0 or hi(x)<0 for x in v)
def iv(p,key):return mp.iv.mpf([mp.mpf(tuple(v)) for v in p['exactIntervalBinaryBounds'][key]])
def enc(x):
    if isinstance(x,dict):return {k:enc(v) for k,v in x.items()}
    if isinstance(x,(tuple,list)):return [enc(v) for v in x]
    if isinstance(x,(str,int,bool)) or x is None:return x
    if hasattr(x,'_mpi_'):return {'display':[mp.nstr(lo(x),60),mp.nstr(hi(x),60)],'binary':[list(t) for t in x._mpi_]}
    return mp.nstr(x,65)
def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(stage+'.json')
    p.write_text(json.dumps(enc({'stage':stage,'instrumentSha256':sha(Path(__file__)),
        'K':1,'c_f':1,'intervalDps':mp.iv.dps,**data}),indent=2,sort_keys=True)+'\n')
    print(json.dumps({'stage':stage,'path':str(p.relative_to(ROOT)),'sha256':sha(p)}))
def known():
    # Receiver (2,0,0), stationary source at origin: raw row 1/4,
    # source radial displacement derivative +1/4, receiver derivative -1/4.
    a=I(1)/I(2)**2; ds=I(2)/I(2)**3;dr=-ds
    assert lo(a)==hi(a)==mp.mpf(1)/4 and lo(ds)==hi(ds)==mp.mpf(1)/4
    # Alternating static square at any axis point z=1 has common L=sqrt2.
    coords=[(1,0),(0,1),(-1,0),(0,-1)];L=mp.iv.sqrt(I(2))
    neutral=[sum((-1)**j*I(v) for j,v in enumerate(vals))/L**3 for vals in
             [[-x for x,y in coords],[-y for x,y in coords],[1]*4]]
    assert all(lo(v)==hi(v)==0 for v in neutral)
    save('known',{'passed':True,'staticAcceleration':a,'staticSourceDerivative':ds,
                  'staticReceiverDerivative':dr,'neutralAxisSquare':neutral})
def target():
    known=json.loads((OUT/'known.json').read_text());assert known['passed'] and known['instrumentSha256']==sha(Path(__file__))
    reports=[]
    for t in [2,4]:
        path=ROOT/f'.local-data/ring-exploration/stability/T{t:02d}-certificate.json'
        assert sha(path)==HASHES[t];p=json.loads(path.read_text());assert p['passed']
        R,W=iv(p,'/R'),iv(p,'/Omega');channels=[[I(0),I(0)] for _ in range(6)]
        fchannels=[[[I(0),I(0)],[I(0),I(0)]] for _ in range(6)]
        csum=[[I(0),I(0)],[I(0),I(0)]]
        for n,row in enumerate(p['rootRows']):
            m=row['m'];j=m%6;x=iv(p,f'/rootRows/{n}/v');D=iv(p,f'/rootRows/{n}/D')
            s,c=mp.iv.sin(x),mp.iv.cos(x);sig=(-1)**m
            channels[j][0]+=sig/(4*R*R*s*abs(D));channels[j][1]+=sig*c/(4*R*R*s*s*abs(D))
            for i in range(2):
                for k in range(2):
                    fchannels[j][i][k]+=iv(p,f'/rootRows/{n}/F/{i}/{k}')
                    csum[i][k]+=iv(p,f'/rootRows/{n}/C/{i}/{k}')
        path_acc=[-W*W*R,I(0)]
        removed=[];flipped=[];displaced=[]
        for i in range(6):
            j=(-i)%6
            if i!=0:removed.append({'receiver':i,'residual':[-v for v in channels[j]]})
            flip=[-2*v for v in channels[j]] if i!=0 else [2*(channels[0][k]-path_acc[k]) for k in range(2)]
            derivative=[fchannels[j][k][0] for k in range(2)] if i!=0 else [csum[k][0]+fchannels[0][k][0]+(W*W if k==0 else 0) for k in range(2)]
            assert nonzero(flip) and nonzero(derivative)
            if i!=0:assert nonzero(removed[-1]['residual'])
            flipped.append({'receiver':i,'residual':flip})
            displaced.append({'receiver':i,'residualDerivativePerRadialDisplacement':derivative})
        axis=[]
        for ratio in [0,1,10]:
            z=ratio*R;L=mp.iv.sqrt(R*R+z*z);theta=-W*L
            removed_field=[R*mp.iv.cos(theta)/L**3,R*mp.iv.sin(theta)/L**3,-z/L**3]
            axis.append({'zOverR':ratio,'commonDelay':L,'D':1,'removedMember0InstantaneousField':removed_field,
                         'removedMember0CycleMean':[I(0),I(0),-z/L**3],
                         'polarityFlipMember0Multiplier':2})
        reports.append({'topology':f'T{t:02d}','certificateSha256':sha(path),
            'rootCountPerReceiver':len(p['rootRows']),'originalCompleteChannelAccelerations':channels,
            'removedMember0Residuals':removed,'flippedMember0Residuals':flipped,
            'prescribedRadialDisplacementMember0LinearResiduals':displaced,
            'prescribedAxisProbeDefectFields':axis})
    save('target',{'passed':True,'grade':'outward exact-reference channel residuals and displacement derivatives',
        'reports':reports,'finiteDisplacement':'no finite displacement amplitude or new census certified',
        'stability':'not calculated for these unbalanced configurations'})
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','target'],required=True)
    args=p.parse_args();{'known':known,'target':target}[args.stage]()
