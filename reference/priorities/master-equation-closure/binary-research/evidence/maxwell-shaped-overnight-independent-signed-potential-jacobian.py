"""Independent interval Cartesian sensitivity from nested potential derivatives.
Outer directional Dual differentiates all r/vs/as/u inputs; inner four-jet
constructs the selected E and E+M rows from scalar/current potentials.
No direct numerator formula or subject interval-AD source is imported.
Comparison source clock/jerk dependence is explicit; K=cf=1 only.
"""
import argparse,json
from pathlib import Path
import mpmath as mp
mp.iv.dps=60;iv=mp.iv

def I(x):return x if isinstance(x,iv.mpf) else iv.mpf(x)
class D:
    def __init__(self,v,d=0):self.v=I(v);self.d=I(d)
    def __add__(self,o):o=dual(o);return D(self.v+o.v,self.d+o.d)
    __radd__=__add__
    def __neg__(self):return D(-self.v,-self.d)
    def __sub__(self,o):return self+-dual(o)
    def __rsub__(self,o):return dual(o)+-self
    def __mul__(self,o):
        if isinstance(o,J):return NotImplemented
        o=dual(o);return D(self.v*o.v,self.d*o.v+self.v*o.d)
    __rmul__=__mul__
    def __truediv__(self,o):o=dual(o);return D(self.v/o.v,(self.d-self.v/o.v*o.d)/o.v)
    def __rtruediv__(self,o):return dual(o)/self
    def sqrt(self):s=iv.sqrt(self.v);return D(s,self.d/(2*s))
def dual(x):return x if isinstance(x,D) else D(x)
class J:
    def __init__(self,v,d=None):self.v=dual(v);self.d=[D(0) for _ in range(4)] if d is None else list(map(dual,d))
    def __add__(self,o):o=jet(o);return J(self.v+o.v,[a+b for a,b in zip(self.d,o.d)])
    __radd__=__add__
    def __neg__(self):return J(-self.v,[-a for a in self.d])
    def __sub__(self,o):return self+-jet(o)
    def __rsub__(self,o):return jet(o)+-self
    def __mul__(self,o):o=jet(o);return J(self.v*o.v,[a*o.v+self.v*b for a,b in zip(self.d,o.d)])
    __rmul__=__mul__
    def __truediv__(self,o):o=jet(o);return J(self.v/o.v,[(a-self.v/o.v*b)/o.v for a,b in zip(self.d,o.d)])
    def __rtruediv__(self,o):return jet(o)/self
    def sqrt(self):s=self.v.sqrt();return J(s,[a/(2*s) for a in self.d])
def jet(x):return x if isinstance(x,J) else J(x)
def dot(a,b):return sum(x*y for x,y in zip(a,b))
def cross(a,b):return [a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]]
def row(r,v,a,u,polarity):
    R=dot(r,r).sqrt();n=[z/R for z in r];den=1-dot(n,v)
    assert R.v.a>0 and den.v.a>0
    ds=[-z/den for z in n]+[1/den]
    xj=[J(r[k],[int(k==j) for j in range(4)]) for k in range(3)]
    sj=[J(D(0),[v[k]*z for z in ds]) for k in range(3)]
    vj=[J(v[k],[a[k]*z for z in ds]) for k in range(3)]
    rr=[x-y for x,y in zip(xj,sj)];Rj=dot(rr,rr).sqrt();nj=[z/Rj for z in rr];Dj=1-dot(nj,vj)
    phi=1/(Rj*Dj);current=[phi*z for z in vj]
    E=[polarity*(-phi.d[k]-current[k].d[3]) for k in range(3)]
    curl=[polarity*(current[2].d[1]-current[1].d[2]),polarity*(current[0].d[2]-current[2].d[0]),polarity*(current[1].d[0]-current[0].d[1])]
    M=cross(u,curl);full=[x+y for x,y in zip(E,M)]
    return E,full,R,den,n

def matrices(r,v,a,u,law,polarity=-1,sourceJ=None):
    flat=list(r)+list(v)+list(a)+list(u);blocks={n:[[I(0) for _ in range(3)] for _ in range(3)] for n in ['Fr','Fv','Fa','Fu']}
    val=None
    for k in range(12):
        z=[D(x,int(j==k)) for j,x in enumerate(flat)];E,F,R,den,n=row(z[:3],z[3:6],z[6:9],z[9:],polarity);f=E if law=='E' else F
        for i in range(3):blocks[['Fr','Fv','Fa','Fu'][k//3]][i][k%3]=f[i].d
        if val is None:val=[x.v for x in f];radius=R.v;d=den.v;normal=[x.v for x in n]
    out={'F':val,'R':radius,'D':d,**blocks}
    if sourceJ is not None:
        # v/a/sourceJ are signed source-path jets, NOT actual unknown source derivatives.
        vs=list(map(I,v));acs=list(map(I,a));js=list(map(I,sourceJ));Fr,Fv,Fa=[blocks[n] for n in ['Fr','Fv','Fa']]
        transport=[dot(Fv[i],acs)+dot(Fa[i],js) for i in range(3)]
        out['AX']=[[Fr[i][k]+(dot(Fr[i],vs)-transport[i])*normal[k]/d for k in range(3)] for i in range(3)]
    return out

def contains(x,y):return x.a<=I(y).a and I(y).b<=x.b
def known():
    z=['0']*3;r=['2','0','0'];m=matrices(r,z,z,z,'E',1,z)
    expected={'Fr':['-.25','.125','.125'],'Fv':['.5','-.25','-.25'],'Fa':['0','-.5','-.5'],'Fu':['0','0','0']}
    for n,diag in expected.items():
        for i in range(3):
            for k in range(3):assert contains(m[n][i][k],diag[i] if i==k else 0)
    assert all(contains(m['AX'][i][k],m['Fr'][i][k]) for i in range(3) for k in range(3))
    v=['.2','0','0'];m=matrices(r,v,z,z,'E',1,z);assert contains(m['F'][0],'.375')
    m=matrices(r,z,['0','.03','0'],['.2','.3','0'],'full',1,z)
    assert contains(m['F'][0],'.2455') and contains(m['F'][1],'-.012')
    for i in range(3):
        for j in range(3):assert contains(m['Fu'][i][j]+m['Fu'][j][i],0)
    # At rest transverse source jerk is propagated into spatial clock sensitivity.
    m=matrices(r,z,z,z,'E',1,['0','.05','0'])
    assert contains(m['AX'][1][0],'.025') and contains(m['AX'][1][1],'.125')
    return {'passed':True,'cases':['static Cartesian r/vs/as/u partial matrices','static clock-chain AX','affine response threeeighths','nonzero delayed sourceA full response','receiver skew derivative','sourceJ spatial-clock transverse calibration']}
def encode(x):
    if isinstance(x,list):return list(map(encode,x))
    if isinstance(x,dict):return {k:encode(v) for k,v in x.items()}
    def rat(z):
        s,m,e,b=z;n=(-1 if s else 1)*m
        return str(n*(1<<e))+'/1' if e>=0 else str(n)+'/'+str(1<<(-e))
    return {'lo':rat(x._mpi_[0]),'hi':rat(x._mpi_[1])}
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--inputs');p.add_argument('--output',required=True);a=p.parse_args();out={'known':known()};print(json.dumps(out),flush=True)
    if a.inputs:
        s=json.loads(Path(a.inputs).read_text());assert s['K']==s['cf']==1;out['target']=encode(matrices(**s['matrix_inputs']));out['scope']='independent uniform potential-Jacobian box; comparison source clock and J only; no actual prefix or propagator certificate'
    Path(a.output).write_text(json.dumps(out,indent=2)+'\n');print(json.dumps({'known':out['known'],'target':bool(a.inputs)}),flush=True)
