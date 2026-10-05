#!/usr/bin/env python3
"""Neutral translation/tilt simplicity on frozen exact T02,T04 charts.
Known static and polynomial-pencil controls precede ring targets. Consumes
authoritative binary coefficient bounds; no frozen evaluator imports/edits.
"""
import argparse
import hashlib
import json
from pathlib import Path
import mpmath as mp

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'.local-data/ring-exploration/drift-precession'
mp.mp.dps=110;mp.iv.dps=85
HASHES={2:'3f44600259557b9736b860a904dc986193b7ca21f33cdbbaeb45f8bc0a440c50',
        4:'17b41d073a1aeec059e292b6696ad2fe54c60b27c46d54976848d29062debc4a'}
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def I(x):return mp.iv.mpf(x)
def C(real,imag=0):return mp.iv.mpc(I(real),I(imag))
def low(x):return mp.mpf(x._mpi_[0])
def high(x):return mp.mpf(x._mpi_[1])
def nonzero(z):return low(z.real)>0 or high(z.real)<0 or low(z.imag)>0 or high(z.imag)<0
def zero_contains(z):return low(z.real)<=0<=high(z.real) and low(z.imag)<=0<=high(z.imag)
def enc(x):
    if isinstance(x,dict):return {k:enc(v) for k,v in x.items()}
    if isinstance(x,(list,tuple)):return [enc(v) for v in x]
    if isinstance(x,(str,int,bool)) or x is None:return x
    if hasattr(x,'_mpi_'):return {'display':[mp.nstr(low(x),60),mp.nstr(high(x),60)],'binary':[list(t) for t in x._mpi_]}
    if hasattr(x,'_mpci_'):return {'real':enc(x.real),'imag':enc(x.imag)}
    return mp.nstr(x,65)
def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(stage+'.json')
    p.write_text(json.dumps(enc({'stage':stage,'instrumentSha256':sha(Path(__file__)),
        'c_f':1,'K':1,'intervalDps':mp.iv.dps,**data}),indent=2,sort_keys=True)+'\n')
    print(json.dumps({'stage':stage,'path':str(p.relative_to(ROOT)),'sha256':sha(p)}))
def iv(packet,key):return mp.iv.mpf([mp.mpf(tuple(v)) for v in packet['exactIntervalBinaryBounds'][key]])
def known():
    static=I(1)/I(2)**3
    assert low(static)==high(static)==mp.mpf(1)/8
    # Free coordinate in a frame rotating at Omega=1: the physical constant
    # translation is a double root, so its determinant derivative is zero.
    z=C(0,-1);a=[[z*z-1,-2*z],[2*z,z*z-1]]
    b=[[2*z,C(-2)],[C(2),2*z]]
    v=[C(1),C(0,-1)]
    residual=[sum(a[i][j]*v[j] for j in range(2)) for i in range(2)]
    derivative=b[0][0]*a[1][1]+a[0][0]*b[1][1]-b[0][1]*a[1][0]-a[0][1]*b[1][0]
    assert all(zero_contains(r) for r in residual) and zero_contains(derivative)
    # A deliberately simple pencil diag(z+1,z+2) has det'(-1)=1.
    simple=(2*(-I(1))+3);assert low(simple)==high(simple)==1
    save('known',{'passed':True,'staticAxialDerivative':static,'freeTranslationNullResidual':residual,
                  'freeTranslationDeterminantDerivative':derivative,'simplePencilDerivative':simple})
def sector_matrices(packet,k,z):
    w=iv(packet,'/Omega');A=[[z*z-w*w,-2*w*z],[2*w*z,z*z-w*w]]
    Ap=[[2*z,C(-2*w)],[C(2*w),2*z]]
    H=z*z;Hp=2*z;R=iv(packet,'/R')
    for n,row in enumerate(packet['rootRows']):
        ell=iv(packet,f'/rootRows/{n}/delay');D=iv(packet,f'/rootRows/{n}/D')
        alpha=row['m']*mp.iv.pi/3
        phase=mp.iv.exp(C(0,k*alpha));E=phase*mp.iv.exp(-z*ell)
        weight=(-1)**row['m']/(ell**3*abs(D))
        H-=weight*(1-E);Hp-=weight*ell*E
        for i in range(2):
            for j in range(2):
                c=iv(packet,f'/rootRows/{n}/C/{i}/{j}')
                f=iv(packet,f'/rootRows/{n}/F/{i}/{j}')
                h=iv(packet,f'/rootRows/{n}/H/{i}/{j}')
                A[i][j]-=c+E*(f+z*h)
                Ap[i][j]-=E*(h-ell*(f+z*h))
    derivative=Ap[0][0]*A[1][1]+A[0][0]*Ap[1][1]-Ap[0][1]*A[1][0]-A[0][1]*Ap[1][0]
    determinant=A[0][0]*A[1][1]-A[0][1]*A[1][0]
    return A,determinant,derivative,H,Hp
def target():
    known=json.loads((OUT/'known.json').read_text());assert known['passed'] and known['instrumentSha256']==sha(Path(__file__))
    cases=[]
    for t in [2,4]:
        path=ROOT/f'.local-data/ring-exploration/stability/T{t:02d}-certificate.json'
        assert sha(path)==HASHES[t];p=json.loads(path.read_text());assert p['passed']
        w=iv(p,'/Omega');results=[]
        # k=-1,z=-iOmega gives physical constant translation; k=+1,z=+iOmega
        # gives axial rigid tilt. Conjugates are redundant controls, retained.
        for k,imag in [(-1,-1),(1,1)]:
            z=C(0,imag*w);A,d,dp,H,Hp=sector_matrices(p,k,z)
            v=[C(1),C(0,imag)]
            null=[sum(A[i][j]*v[j] for j in range(2)) for i in range(2)]
            assert all(zero_contains(v) for v in null) and zero_contains(d) and zero_contains(H)
            assert nonzero(dp) and nonzero(Hp)
            results.append({'k':k,'z':z,'translationNullResidual':null,
                            'translationDeterminant':d,'translationDeterminantDerivative':dp,
                            'tiltCharacteristic':H,'tiltCharacteristicDerivative':Hp})
        cases.append({'topology':f'T{t:02d}','certificateSha256':sha(path),
                      'rootCountPerReceiver':len(p['rootRows']),'cases':results})
    save('target',{'passed':True,'cases':cases,'scope':'simple neutral roots at T02,T04; restricted first-order polynomial/harmonic branch obstruction only'})
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','target'],required=True)
    args=p.parse_args();{'known':known,'target':target}[args.stage]()
