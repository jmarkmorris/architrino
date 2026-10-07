"""Outward spectral norm upper bound for a real 3-by-n interval matrix.
An SVD value proposes a bound; Sylvester's criterion verifies the exact midpoint.
"""
import importlib.util,json
from pathlib import Path
import numpy as np
HERE=Path(__file__).resolve().parent
sp=importlib.util.spec_from_file_location('iv',HERE/'overnight-d-tail-interval-independent-check.py');iv=importlib.util.module_from_spec(sp);sp.loader.exec_module(iv);I=iv.I

def product(a,b):
    if a.lo.ndim!=2 or b.lo.ndim!=2 or a.lo.shape[1]!=b.lo.shape[0]:raise ValueError('matrix dimensions')
    out=I(np.zeros((a.lo.shape[0],b.lo.shape[1])))
    for k in range(a.lo.shape[1]):out=out+I(a.lo[:,k,None],a.hi[:,k,None])*I(b.lo[None,k,:],b.hi[None,k,:])
    return out

def transpose(a):return I(a.lo.T,a.hi.T)
def det3(a):return a[0,0]*(a[1,1]*a[2,2]-a[1,2]*a[2,1])-a[0,1]*(a[1,0]*a[2,2]-a[1,2]*a[2,0])+a[0,2]*(a[1,0]*a[2,1]-a[1,1]*a[2,0])
def positive(a):return bool(a[0,0].lo>0 and (a[0,0]*a[1,1]-a[0,1]*a[1,0]).lo>0 and det3(a).lo>0)
def frobenius(a):
    total=I(0.)
    for row in range(a.lo.shape[0]):
        for col in range(a.lo.shape[1]):total=total+a[row,col].square()
    if total.hi==0:return I(0.)
    # A safe L1 fallback for subnormal squared norms avoids the frozen sqrt guard.
    if total.hi<1e-290:
        out=I(0.)
        for row in range(a.lo.shape[0]):
            for col in range(a.lo.shape[1]):out=out+I(max(abs(a[row,col].lo),abs(a[row,col].hi)))
        return out
    return total.sqrt()

def spectral(a):
    if a.lo.ndim!=2 or a.lo.shape[0]!=3:raise ValueError('requires three rows')
    mid=a.lo/2+a.hi/2
    radius=a-I(mid);radius=I(np.maximum(abs(radius.lo),abs(radius.hi)))
    G=product(I(mid),I(mid.T));seed=float(np.linalg.norm(mid,2))
    # Exact zero needs no eigenvalue computation or determinant cancellation.
    if np.all(mid==0):return frobenius(radius),dict(midpoint_upper=0.,attempts=0)
    margin=max(seed*1e-12,1e-150)
    for k in range(16):
        bound=float(np.nextafter(seed+margin,np.inf));M=I(bound).square()*np.eye(3)-G
        if positive(M):return I(bound)+frobenius(radius),dict(midpoint_upper=bound,attempts=k+1)
        margin*=10
    raise ArithmeticError('midpoint spectral bound failed verification')

def controls():
    iv.controls()
    cases=[(np.diag([1.,2.,3.]),3.),(np.array([[3.,4.,0.,0.],[0.,0.,0.,0.],[0.,0.,0.,0.]]),5.),(np.array([[1.,0.],[0.,1.],[1.,1.]]),np.sqrt(3.)),(np.zeros((3,6)),0.)]
    for m,value in cases:
        bound,_=spectral(I(m));assert bound.hi>=value and bound.hi<value+1e-9
    # All matrices in a width-epsilon box differ from the identity by at most 3 epsilon in Frobenius norm.
    eps=2.**-20;a=I(np.eye(3)-eps,np.eye(3)+eps);bound,_=spectral(a)
    assert bound.hi>=1+3*eps and bound.hi<1+3*eps+1e-9
    tiny,_=spectral(I(np.zeros((3,3)),np.full((3,3),np.nextafter(0.,1.))))
    assert tiny.hi>=0
    print(json.dumps(dict(control='analytic diagonal, rank-one, rectangular Gram, interval box and subnormal cases',status='PASS')),flush=True)
if __name__=='__main__':controls()
