#!/usr/bin/env python3
"""Bounded Fourier-sector comparison; no total spectral count or evolution.

Uses the frozen in-session common-sector row factorization as subject input.
The analytical controls are Cartesian translations and static source response.
Rectangular interval Krawczyk inclusion independently certifies complex roots.
"""
import argparse
import hashlib
import importlib.util
import json
import time
from pathlib import Path
import mpmath as mp
import numpy as np
from scipy.optimize import root as solve_double

ROOT=Path(__file__).resolve().parents[2]
BASEPATH=ROOT/'scripts/braid-program/ring_family_symmetric_stability_20261003.py'
FROZEN='d55cf3827cd049cfd2cad0ee316f45ab12ab4e8fe529e03728e9a1330fb24f82'
assert hashlib.sha256(BASEPATH.read_bytes()).hexdigest()==FROZEN
spec=importlib.util.spec_from_file_location('frozen_common_ring_rows',BASEPATH)
base=importlib.util.module_from_spec(spec);spec.loader.exec_module(base)
OUT=ROOT/'.local-data/ring-exploration/differential-planar'
mp.mp.dps=100;mp.iv.dps=85


def sha(path):return hashlib.sha256(path.read_bytes()).hexdigest()
def lo(x):return mp.mpf(x.a)
def hi(x):return mp.mpf(x.b)
def record(name,data):
    exact={}
    def enc(x,path=''):
        if hasattr(x,'_mpi_'):
            exact[path]=[list(t) for t in x._mpi_]
            return [mp.nstr(lo(x),65),mp.nstr(hi(x),65)]
        if hasattr(x,'_mpci_'):
            return {'real':enc(x.real,path+'/real'),'imag':enc(x.imag,path+'/imag')}
        if isinstance(x,mp.mpc):return {'real':mp.nstr(x.real,65),'imag':mp.nstr(x.imag,65)}
        if isinstance(x,dict):return {k:enc(v,path+'/'+k) for k,v in x.items()}
        if isinstance(x,(tuple,list)):return [enc(v,path+'/'+str(i)) for i,v in enumerate(x)]
        if isinstance(x,(int,str,bool)) or x is None:return x
        return mp.nstr(x,65)
    payload=enc({'instrumentSha256':sha(Path(__file__)),'frozenBaseSha256':FROZEN,'K':1,'c_f':1,'pointDps':100,'intervalDps':85,**data})
    payload['exactIntervalBinaryBounds']=exact
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(name+'.json')
    p.write_text(json.dumps(payload,indent=2,sort_keys=True)+'\n')
    print(json.dumps({'receipt':str(p.relative_to(ROOT)),'passed':data.get('passed'),'sha256':sha(p)}),flush=True)

def require(name):
    p=json.loads((OUT/(name+'.json')).read_text());assert p['passed'] and p['instrumentSha256']==sha(Path(__file__))

def phase(k,m,ctx):
    if k==0:return ctx.mpf(1)
    if k==3:return ctx.mpf((-1)**m)
    theta=k*m*ctx.pi/3
    return ctx.mpc(ctx.cos(theta),ctx.sin(theta))

def matrix(z,k,coef,w,ctx=mp,derivative=False):
    if derivative:A=[[2*z,-2*w],[2*w,2*z]]
    else:A=[[z*z-w*w,-2*w*z],[2*w*z,z*z-w*w]]
    for row in coef:
        E=phase(k,row['m'],ctx)*ctx.exp(-z*row['delay'])
        for i in range(2):
            for j in range(2):
                if derivative:A[i][j]-=E*(row['H'][i][j]-row['delay']*(row['F'][i][j]+z*row['H'][i][j]))
                else:A[i][j]-=row['C'][i][j]+E*(row['F'][i][j]+z*row['H'][i][j])
    return A

def determinant(z,k,coef,w,ctx=mp,derivative=False):
    A=matrix(z,k,coef,w,ctx)
    if not derivative:return A[0][0]*A[1][1]-A[0][1]*A[1][0]
    B=matrix(z,k,coef,w,ctx,True)
    return B[0][0]*A[1][1]+A[0][0]*B[1][1]-B[0][1]*A[1][0]-A[0][1]*B[1][0]

def known():
    T,U=base.tensor([mp.mpf(1),mp.mpf(0)],mp.mpf(2),[0,0],[0,0],mp.mpf(1),1)
    assert T==[[mp.mpf('-.25'),0],[0,mp.mpf('.125')]]
    # Krawczyk on an exactly known analytic polynomial, before ring targets.
    cert=krawczyk(mp.mpc(2,3),mp.mpf('1e-8'),lambda z:z-(2+3j),lambda z:mp.iv.mpc(1))
    assert cert['strictlyIncluded'] and cert['contractionInfinityNorm']==0
    quadratic=krawczyk(mp.mpc(0,1),mp.mpf('1e-8'),lambda z:z*z+1,lambda z:2*z)
    assert quadratic['strictlyIncluded'] and quadratic['contractionInfinityNorm']<mp.mpf('1e-6')
    record('known',{'passed':True,'staticSourceTensor':T,'complexLinearPolynomialControl':cert,'complexQuadraticPolynomialControl':quadratic})

def controls():
    require('known');base.require('known');base.require('controls')
    b,r,w,_=base.point_reference(2);coef=base.coefficients(b,r,2)
    # Exact translation Q(-Omega T-alpha_j) applied to fixed Cartesian vectors.
    errors=[]
    for k,z,u in [(1,mp.j*w,[1,mp.j]),(5,-mp.j*w,[1,-mp.j])]:
        A=matrix(z,k,coef,w)
        errors.append(max(abs(sum(A[i][j]*u[j] for j in range(2))) for i in range(2)))
    phase_error=max(abs(matrix(0,0,coef,w)[i][1]) for i in range(2))
    zero_sector=max(abs(matrix(mp.mpf('.7'),0,coef,w)[i][j]-base.matrix(mp.mpf('.7'),coef,w)[i][j]) for i in range(2) for j in range(2))
    conjugacy=max(abs(matrix(mp.mpc('.4','.7'),2,coef,w)[i][j].conjugate()-matrix(mp.mpc('.4','-.7'),4,coef,w)[i][j]) for i in range(2) for j in range(2))
    derivative_error=abs(determinant(mp.mpc('.4','.7'),2,coef,w,derivative=True)-mp.diff(lambda z:determinant(z,2,coef,w),mp.mpc('.4','.7')))
    b4,r4,w4,_=base.point_reference(4);coef4=base.coefficients(b4,r4,4)
    errors4=[]
    for k,z,u in [(1,mp.j*w4,[1,mp.j]),(5,-mp.j*w4,[1,-mp.j])]:
        A=matrix(z,k,coef4,w4)
        errors4.append(max(abs(sum(A[i][j]*u[j] for j in range(2))) for i in range(2)))
    phase4=max(abs(matrix(0,0,coef4,w4)[i][1]) for i in range(2))
    assert max(errors+errors4+[phase_error,phase4,zero_sector,conjugacy,derivative_error])<mp.mpf('1e-75')
    record('controls',{'passed':True,'translationNeutralErrorsT02':errors,'translationNeutralErrorsT04':errors4,'translationSectors':[{'k':1,'z':'i Omega','nullVector':[1,'i']},{'k':5,'z':'-i Omega','nullVector':[1,'-i']}],'phaseNeutralityErrorT02':phase_error,'phaseNeutralityErrorT04':phase4,'commonSectorParity':zero_sector,'conjugateSectorError':conjugacy,'analyticDerivativeError':derivative_error,'grade':'analytical symmetry controls plus common-row reproduction; parity is not independence'})

def krawczyk(center,width,F,Fprime):
    x,y=center.real,center.imag
    X=[mp.iv.mpf([x-width,x+width]),mp.iv.mpf([y-width,y+width])]
    Z=mp.iv.mpc(X[0],X[1]);fc=F(mp.iv.mpc(x,y));fp=Fprime(Z)
    # Point preconditioner is an explicitly fixed finite number, interval-wrapped.
    pc=Fprime(mp.iv.mpc(x,y));d=mp.mpc((lo(pc.real)+hi(pc.real))/2,(lo(pc.imag)+hi(pc.imag))/2)
    inv=1/d;Y=[[mp.iv.mpf(inv.real),mp.iv.mpf(-inv.imag)],[mp.iv.mpf(inv.imag),mp.iv.mpf(inv.real)]]
    J=[[fp.real,-fp.imag],[fp.imag,fp.real]]
    M=[[(1 if i==j else 0)-sum(Y[i][k]*J[k][j] for k in range(2)) for j in range(2)] for i in range(2)]
    f=[fc.real,fc.imag];c=[x,y];dx=[X[i]-c[i] for i in range(2)]
    K=[mp.iv.mpf(c[i])-sum(Y[i][j]*f[j] for j in range(2))+sum(M[i][j]*dx[j] for j in range(2)) for i in range(2)]
    norm=max(hi(sum(abs(v) for v in row)) for row in M)
    strict=all(lo(K[i])>lo(X[i]) and hi(K[i])<hi(X[i]) for i in range(2))
    return {'box':X,'KrawczykImage':K,'strictlyIncluded':strict,'contractionInfinityNorm':norm,'centerDeterminant':fc,'determinantDerivativeOnBox':fp,'preconditioner':Y,'IminusYJ':M}

def proposals(k,coef,w,confinement):
    wd=float(w);cf=[]
    for row in coef:
        cf.append((float(row['delay']),complex(np.exp(1j*k*row['m']*np.pi/3)),*[np.array(row[key],dtype=float) for key in ['C','F','H']]))
    def det_and_deriv(z):
        A=np.array([[z*z-wd*wd,-2*wd*z],[2*wd*z,z*z-wd*wd]],dtype=complex)
        dA=np.array([[2*z,-2*wd],[2*wd,2*z]],dtype=complex)
        for delay,p,C,F,H in cf:
            E=p*np.exp(-z*delay)
            A-=C+E*(F+z*H);dA-=E*(H-delay*(F+z*H))
        det=A[0,0]*A[1,1]-A[0,1]*A[1,0]
        prime=dA[0,0]*A[1,1]+A[0,0]*dA[1,1]-dA[0,1]*A[1,0]-A[0,1]*dA[1,0]
        return det,prime
    def fun(x):
        d,p=det_and_deriv(complex(*x));return [d.real,d.imag]
    def jac(x):
        d,p=det_and_deriv(complex(*x));return [[p.real,-p.imag],[p.imag,p.real]]
    real=[.01*wd,.1*wd,.5*wd,wd,2*wd,5*wd,.4*float(confinement),.8*float(confinement)]
    imag=sorted(set([0,.5*wd,wd,2*wd,4*wd,8*wd,.25*float(confinement),.5*float(confinement),.8*float(confinement)]))
    points=[]
    for x in real:
        for y in imag+[-v for v in imag if v]:
            sol=solve_double(fun,[x,y],jac=jac,tol=1e-10)
            z=complex(*sol.x)
            if not sol.success or not (1e-7<z.real<float(confinement)) or abs(z)>float(confinement):continue
            if abs(fun(sol.x)[0])+abs(fun(sol.x)[1])>1e-3:continue
            if not any(abs(z-a)<1e-5*max(1,abs(z)) for a in points):points.append(z)
    return sorted(points,key=lambda z:(z.real,z.imag))

def target(t):
    require('known');require('controls');start=time.monotonic()
    b,r,w,bracket=base.point_reference(t)
    B,R,W,ivcoef,reference=base.interval_reference(t,bracket)
    assert reference['minimumAbsD']>0
    record(f'T{t:02d}-reference',{'passed':True,**reference})
    coef=base.coefficients(b,r,t)
    confinement=mp.mpf(json.loads((base.OUT/f'T{t:02d}-certificate.json').read_text())['rightHalfPlaneConfinement']['radius'])
    sectors=[]
    for k in [1,2,3]:
        seeds=proposals(k,coef,w,confinement);certs=[];failed=[]
        for seed in seeds:
            try:
                z=mp.findroot(lambda z:determinant(z,k,coef,w),mp.mpc(seed.real,seed.imag),df=lambda z:determinant(z,k,coef,w,derivative=True),tol=mp.mpf('1e-80'),maxsteps=50)
                if z.real<=0:continue
                width=mp.mpf('1e-12')*max(1,abs(z))
                cert=krawczyk(z,width,lambda Z:determinant(Z,k,ivcoef,W,mp.iv),lambda Z:determinant(Z,k,ivcoef,W,mp.iv,True))
                assert cert['strictlyIncluded'] and cert['contractionInfinityNorm']<1 and lo(cert['box'][0])>0
                if any(abs(z-a['center'])<mp.mpf('1e-8')*max(1,abs(z)) for a in certs):continue
                real_signs=None
                if k==3 and abs(z.imag)<width:
                    values=[determinant(mp.iv.mpf(z.real+offset),k,ivcoef,W,mp.iv) for offset in [-width,width]]
                    real_signs=[base.sgn(v) for v in values]
                    assert real_signs[0]*real_signs[1]==-1
                certs.append({'center':z,'certificate':cert,'realEndpointSigns':real_signs})
            except Exception as error:failed.append({'proposal':str(seed),'reason':repr(error)})
        sectors.append({'k':k,'conjugateSector':6-k if k!=3 else 3,'proposals':len(seeds),'certifiedPositiveRealPartRoots':certs,'failedProposals':failed,'totalCount':'not asserted; point-grid proposals do not establish absence'})
        record(f'T{t:02d}-k{k}',{'passed':True,'topology':t,'sector':k,'results':sectors[-1],'wallSeconds':time.monotonic()-start})
    record(f'T{t:02d}-target',{'passed':True,'topology':t,'sectors':sectors,'wallSeconds':time.monotonic()-start,'confinementInherited':confinement,'confinementBasis':'unit-modulus spatial phases leave coefficient norm inequality unchanged','spectralScope':'positive-real-part witnesses only, no count or no-growth verdict'})

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--stage',choices=['known','controls','target'],required=True);parser.add_argument('--rungs',nargs='+',type=int,default=[2,4]);a=parser.parse_args()
    if a.stage=='known':known()
    elif a.stage=='controls':controls()
    else:
        for t in a.rungs:target(t)
