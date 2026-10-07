"""Polynomial source composition across ordinary reference knots.
Exact piece differences supply uniform value errors; no remainder differentiation.
"""
import importlib.util,json
from pathlib import Path
import numpy as np
HERE=Path(__file__).resolve().parent
sp=importlib.util.spec_from_file_location('residual',HERE/'overnight2-d-reference-residual-check.py');check=importlib.util.module_from_spec(sp);sp.loader.exec_module(check)
I,P=check.I,check.P

def enclose(data,nodes,H,j,s,details=False):
    sb=s.bound()
    if sb.hi<0:
        x,v=check.source_polys(data,nodes,H,j,s);return (x,v,{})if details else(x,v)
    if sb.lo<=0:raise ValueError('source-zero composition needs separate treatment')
    T=data['T']
    if sb.hi>T[-1]:raise ValueError('source interval exceeds completed reference')
    center=(float(sb.lo)+float(sb.hi))/2;k=min(len(T)-2,int(np.searchsorted(T,center,side='right')-1))
    x,v,_=check.cell_polys(data,nodes,k,j,s)
    first=max(0,int(np.searchsorted(T,sb.lo,side='right')-1));last=min(len(T)-2,int(np.searchsorted(T,sb.hi,side='left')))
    ex=np.zeros(3);ev=np.zeros(3);pieces=[]
    for ell in range(first,last+1):
        left=max(float(sb.lo),float(T[ell]));right=min(float(sb.hi),float(T[ell+1]))
        if left>right:continue
        pieces.append(ell)
        if ell==k:continue
        t=P((I(left)+I(right))/2)+P.variable()*((I(right)-I(left))/2)
        xa,va,_=check.cell_polys(data,nodes,ell,j,t);xe,ve,_=check.cell_polys(data,nodes,k,j,t)
        for c in range(3):
            ex[c]=max(ex[c],check.upper((xa[c]-xe[c]).bound()));ev[c]=max(ev[c],check.upper((va[c]-ve[c]).bound()))
    if not pieces:raise ValueError('empty source coverage')
    x=[P(z.c,z.e+I(ex[c]))for c,z in enumerate(x)];v=[P(z.c,z.e+I(ev[c]))for c,z in enumerate(v)]
    info=dict(extension_piece=k,covered_pieces=pieces,position_error=ex.tolist(),velocity_error=ev.tolist())
    return(x,v,info)if details else(x,v)

def controls():
    check.controls();data=dict(T=np.array([0.,1.,2.]),X=np.zeros((3,8,3)),DX=np.zeros((2,8,3)),V=np.zeros((3,8,3)),C=np.zeros((2,4,8,3)))
    data['X'][:,0,0]=[0,1,5];data['DX'][:,0,0]=[1,4];data['V'][:,0,0]=[0,2,6]
    q=P.variable();x,v,m=enclose(data,I(data['X']),None,0,1+q/4,True)
    if m['covered_pieces']!=[0,1] or not 1/16<=m['position_error'][0]<1/16+1e-11 or not .5<=m['velocity_error'][0]<.5+1e-11:raise RuntimeError('exact quadratic difference control')
    for z in [-1.,-.5,0.,.5,1.]:
        s=1+z/4;xe=s*s if s<=1 else 1+2*(s-1)+2*(s-1)**2;ve=2*s if s<=1 else 2+4*(s-1)
        a,b=x[0].value(z),v[0].value(z)
        if not a.lo<=xe<=a.hi or not b.lo<=ve<=b.hi:raise RuntimeError('piecewise quadratic value control')
    print(json.dumps(dict(control='exact C1 piecewise quadratics, all intersected pieces and independent position/velocity errors',status='PASS')),flush=True)
if __name__=='__main__':controls()
