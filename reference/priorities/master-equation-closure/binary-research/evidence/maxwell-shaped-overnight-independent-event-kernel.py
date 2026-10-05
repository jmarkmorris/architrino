"""Independent incoming-cylinder field enclosure from potential derivatives.
Four-variable interval AD independently reconstructs selected response; complete
root/source-support certification is a separate required input. K=cf=1 only.
"""
import argparse,json
from pathlib import Path
import mpmath as mp
mp.iv.dps=55;iv=mp.iv

def I(x):return x if isinstance(x,iv.mpf) else iv.mpf(x)
class J:
    def __init__(self,v,d=None):self.v=I(v);self.d=[I(0) for _ in range(4)] if d is None else list(map(I,d))
    def __add__(self,o):o=jet(o);return J(self.v+o.v,[a+b for a,b in zip(self.d,o.d)])
    __radd__=__add__
    def __neg__(self):return J(-self.v,[-a for a in self.d])
    def __sub__(self,o):return self+-jet(o)
    def __rsub__(self,o):return jet(o)+-self
    def __mul__(self,o):o=jet(o);return J(self.v*o.v,[a*o.v+self.v*b for a,b in zip(self.d,o.d)])
    __rmul__=__mul__
    def __truediv__(self,o):o=jet(o);return J(self.v/o.v,[(a-self.v/o.v*b)/o.v for a,b in zip(self.d,o.d)])
    def __rtruediv__(self,o):return jet(o)/self
    def sqrt(self):v=iv.sqrt(self.v);return J(v,[a/(2*v) for a in self.d])
def jet(x):return x if isinstance(x,J) else J(x)
def dot(a,b):return sum(x*y for x,y in zip(a,b))
def norm(a):return iv.sqrt(dot(a,a))
def cross(a,b):return [a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]]
def field(x,u,source,v,a,polarity=-1):
    x,u,source,v,a=[list(map(I,z)) for z in [x,u,source,v,a]]
    r=[q-s for q,s in zip(x,source)];R=norm(r);n=[z/R for z in r];D=1-dot(n,v);assert D.a>0 and R.a>0
    ds=[-z/D for z in n]+[1/D]
    xd=[J(z,[int(k==j) for j in range(4)]) for k,z in enumerate(x)]
    sd=[J(z,[vv*t for t in ds]) for z,vv in zip(source,v)]
    vd=[J(z,[aa*t for t in ds]) for z,aa in zip(v,a)]
    rj=[q-s for q,s in zip(xd,sd)];Rj=dot(rj,rj).sqrt();nj=[z/Rj for z in rj];Dj=1-dot(nj,vd)
    amplitude=1/(Rj*Dj);current=[z*amplitude for z in vd]
    E=[polarity*(-amplitude.d[k]-current[k].d[3]) for k in range(3)]
    curl=[polarity*(current[2].d[1]-current[1].d[2]),polarity*(current[0].d[2]-current[2].d[0]),polarity*(current[1].d[0]-current[0].d[1])]
    M=cross(u,curl);full=[e+m for e,m in zip(E,M)]
    return dict(E=E,M=M,full=full,R=R,D=D,work=2*dot(u,E))
def contains(x,y):return x.a<=I(y).a and I(y).b<=x.b
def known():
    z=['0','0','0'];x=['2','0','0'];u=['.2','.3','0']
    static=field(x,u,z,z,z,1);assert contains(static['E'][0],'.25')
    affine=field(x,u,z,['.2','0','0'],z,1);assert contains(affine['E'][0],'.375')
    accelerated=field(x,u,z,z,['0','.03','0'],1)
    for x,y in zip(accelerated['E'],['.25','-.015','0']):assert contains(x,y)
    for x,y in zip(accelerated['M'],['-.0045','.003','0']):assert contains(x,y)
    assert contains(dot(list(map(I,u)),accelerated['M']),0)
    signed=field(['-2','0','0'],['-.2','-.3','0'],z,z,['0','-.03','0'],-1)
    for x,y in zip(signed['E'],['.25','-.015','0']):assert contains(x,y)
    return dict(passed=True,cases=['stationary potential E quarter','affine potential E threeeighths','transverse delayed A potential and curl','signed mirrored acceleration','full receiver work cancellation'])
def encode(z):
    if isinstance(z,list):return [encode(v) for v in z]
    if isinstance(z,dict):return {k:encode(v) for k,v in z.items()}
    # Exact rational outward endpoints; no nearest decimal export.
    def endpoint(t):
        sign,man,exponent,bc=t
        num=(-1 if sign else 1)*man
        return f'{num*(1<<exponent) if exponent>=0 else num}/{1 if exponent>=0 else 1<<(-exponent)}'
    return dict(lo=endpoint(z._mpi_[0]),hi=endpoint(z._mpi_[1]))
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--inputs');p.add_argument('--output',required=True);arg=p.parse_args();result=dict(known=known());print(json.dumps(result),flush=True)
    if arg.inputs:
        spec=json.loads(Path(arg.inputs).read_text());assert spec['K']==spec['cf']==1
        result['target']=encode(field(**spec['field_inputs']));result['scope']='uniform independently differentiated potential response on supplied root/source boxes; no independent history/support theorem'
    Path(arg.output).write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result),flush=True)
