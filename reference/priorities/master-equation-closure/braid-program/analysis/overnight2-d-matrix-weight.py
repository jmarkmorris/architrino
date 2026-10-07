"""Exact encoded SPD weights and verified anisotropic comparison norms.
No target or physical conclusion is implied by these analytic controls.
"""
import importlib.util,json,sys
from fractions import Fraction as F
from pathlib import Path
from types import SimpleNamespace
import numpy as np
HERE=Path(__file__).resolve().parent
def load(name,file):
    sp=importlib.util.spec_from_file_location(name,HERE/file);m=importlib.util.module_from_spec(sp);sp.loader.exec_module(m);return m
v=load('variation','overnight2-d-interval-variation.py');I=v.I
def determinant(a):
    if len(a)==1:return a[0][0]
    return sum((-1)**j*a[0][j]*determinant([row[:j]+row[j+1:]for row in a[1:]])for j in range(len(a)))

def weight(S):
    S=np.asarray(S,dtype=float)
    if S.shape!=(3,3)or not np.all(np.isfinite(S))or not np.array_equal(S,S.T):raise ValueError('finite encoded symmetric 3x3 weight required')
    exact=[[F.from_float(float(S[i,j]))for j in range(3)]for i in range(3)]
    minors=[determinant([row[:n]for row in exact[:n]])for n in [1,2,3]]
    if min(minors)<=0:raise ValueError('weight is not positive definite')
    inverse=[]
    for i in range(3):
        row=[]
        for j in range(3):
            minor=[[exact[r][c]for c in range(3)if c!=i]for r in range(3)if r!=j]
            row.append((-1)**(i+j)*determinant(minor)/minors[-1])
        inverse.append(row)
    lo=np.empty((3,3));hi=lo.copy()
    for i in range(3):
        for j in range(3):
            box=v.init.enclose(inverse[i][j],inverse[i][j]);lo[i,j]=box.lo;hi[i,j]=box.hi
    inv=I(lo,hi)
    return SimpleNamespace(S=I(S),inverse=inv,position_factor=v.norm_upper(inv),initial_factor=v.norm_upper(I(S)),minors=[str(x)for x in minors])

def receiver_growth(B,metric):return v.norm_upper(metric.S+v.mm(metric.inverse,v.trans(B)))/2
def delayed_norm(B,C,source_metric):
    x=-v.mm(B,source_metric.inverse);block=I(np.concatenate((x.lo,C.lo),axis=1),np.concatenate((x.hi,C.hi),axis=1));return v.norm_upper(block)

def controls():
    if sys.flags.optimize:raise RuntimeError('ordinary Python required')
    v.mn.controls()
    S=np.array([[2.,1.,0.],[1.,2.,0.],[0.,0.,1.]]);m=weight(S)
    expected=[[F(2,3),F(-1,3),F(0)],[F(-1,3),F(2,3),F(0)],[F(0),F(0),F(1)]]
    for i in range(3):
        for j in range(3):
            if not F.from_float(float(m.inverse.lo[i,j]))<=expected[i][j]<=F.from_float(float(m.inverse.hi[i,j])):raise RuntimeError('exact non-diagonal inverse')
    for S in [np.diag([.125,.25,.5]),np.array([[2.,1.,0.],[1.,2.,0.],[0.,0.,1.]])]:
        m=weight(S);mu=receiver_growth(I(-(S@S)),m)
        if not 0<=mu.hi<1e-12:raise RuntimeError('anisotropic oscillator cancellation')
    m=weight(np.diag([1.,2.,.5]));B=np.zeros((3,3));B[0,1]=8.;mu=receiver_growth(I(B),m)
    # Exact 2x2 Gram eigenvalue: (21+sqrt(425))/2; third singular value is 1/2.
    expected=((I(21.)+I(425.).sqrt())/2).sqrt()/2
    if mu.hi<expected.lo or mu.hi>expected.hi+1e-10:raise RuntimeError('noncommuting multiplication order')
    z=delayed_norm(I(np.diag([1.,2.,.5])),I(np.zeros((3,3))),m)
    if not 1<=z.hi<1+1e-10:raise RuntimeError('source weighted delayed block')
    for bad in [np.diag([1.,0.,1.]),np.diag([1.,-1.,1.]),np.array([[1.,1.,0.],[0.,1.,0.],[0.,0.,1.]])]:
        try:weight(bad)
        except ValueError:pass
        else:raise RuntimeError('invalid weight accepted')
    print(json.dumps(dict(control='exact rational SPD inverse, anisotropic oscillators, noncommuting closed Gram spectrum and source block',status='PASS')),flush=True)
if __name__=='__main__':controls()
