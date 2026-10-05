"""Directed real characteristic sign certificate, complete planar sector m=2.
Frozen nested-potential reference is imported unchanged. Directed arithmetic
replaces scalar storage; certified circle parameter boxes replace root midpoint.
Existence of positive characteristic root, not nonlinear instability theorem.
"""
import argparse,importlib.util,json
from pathlib import Path
import mpmath as mp
mp.iv.dps=55;iv=mp.iv
path=Path(__file__).with_name('maxwell-shaped-overnight-independent-cartesian-characteristic.py')
spec=importlib.util.spec_from_file_location('cartesian_reference',path);ref=importlib.util.module_from_spec(spec);spec.loader.exec_module(ref)

def init(self,v,d=0):self.v=iv.mpf(v);self.d=iv.mpf(d)
ref.Dual.__init__=init;ref.mp=iv
exportpath=Path(__file__).with_name('maxwell-shaped-overnight-independent-ring-certified-export.py')
exportspec=importlib.util.spec_from_file_location('outward_export',exportpath);export=importlib.util.module_from_spec(exportspec);exportspec.loader.exec_module(export)
I=lambda a,b=None:iv.mpf([a,a if b is None else b])

def determinant(lam,law,cert):
    beta=I(*cert['beta']);case=next(c for c in cert['cases'] if c['law']==law);r=I(*case['radius']);w=beta/r
    matrix=[]
    for col in range(2):
        z=[I(int(k==col)) for k in range(3)];value=ref.gen(ref.gen(z,lam,w),lam,w)
        for hit in cert['hits']:
            j=hit['j'];a=I(*hit['a']);R=2*r*iv.sin(a)
            xi=[r,I(0),I(0)];ej=[iv.cos(2*a),iv.sin(2*a),I(0)];xj=ref.mul(r,ej)
            u=[I(0),beta,I(0)];v=ref.mul(beta,ref.J(ej));acc=ref.mul(-beta*w,ej);jerk=ref.mul(-w*w,v)
            # EXACT quarter rotation and m2 phase, avoiding trigonometric phase rounding.
            zj=z[:]
            for _ in range(j):zj=ref.J(zj)
            zj=ref.mul((-1)**j,zj)
            eta=ref.mul(iv.exp(-lam*R),ref.rotate(zj,-w*R));etav=ref.gen(eta,lam,w);etaa=ref.gen(etav,lam,w)
            n=ref.mul(1/R,ref.add(xi,ref.mul(-1,xj)));D=1-ref.dot(n,v)
            dS=-ref.dot(n,ref.add(z,ref.mul(-1,eta)))/D
            make=lambda b,d:[ref.Dual(x,dx) for x,dx in zip(b,d)]
            E,F=ref.hit(make(xi,z),make(u,ref.gen(z,lam,w)),make(xj,ref.add(eta,ref.mul(dS,v))),make(v,ref.add(etav,ref.mul(dS,acc))),make(acc,ref.add(etaa,ref.mul(dS,jerk))))
            selected=E if law=='E' else F
            value=ref.add(value,ref.mul(-(-1)**j,[q.d for q in selected]))
        matrix.append(value[:2])
    return matrix[0][0]*matrix[1][1]-matrix[1][0]*matrix[0][1]

def known():
    z=[ref.Dual(0) for _ in range(3)];x=[ref.Dual(2,'0.3'),ref.Dual(0,'0.4'),ref.Dual(0,'-0.2')]
    E,F=ref.hit(x,z,z,z,z);expected=['-.075','.05','-.025']
    for a,e in zip(E,expected):assert a.d.a<=iv.mpf(e)<=a.d.b
    assert (I(2)*I(4)-I(1)*I(3)).a==5
    return dict(passed=True,cases=['directed stationary Cartesian derivative','exact determinant five'])

def target():
    path=Path('.local-data/master-equation-closure/braid-program/maxwell-shaped-overnight-independent/ring-outward-balance-certificate.json')
    cert=json.loads(path.read_text())['certificate'];result=[]
    for law,lo,hi in [('E','.3138916','.3138919'),('E+M','.2110793','.2110796')]:
        left=determinant(I(lo),law,cert);right=determinant(I(hi),law,cert)
        assert (left.b<0 and right.a>0) or (left.a>0 and right.b<0),(law,left,right)
        result.append(dict(law=law,lambda_bracket=[lo,hi],left_determinant=export.encode(left),right_determinant=export.encode(right),sector=2,space='planar Cartesian ring-shape mode outside imposed ring symmetry',grade='derived directed sign enclosure: at least one positive real characteristic root'))
    return result

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--target',action='store_true');p.add_argument('--output',required=True);a=p.parse_args();result=dict(known=known())
    if a.target:result['certificates']=target()
    Path(a.output).write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result))
