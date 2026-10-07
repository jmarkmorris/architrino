"""Bounded independent cover/primitive audit; never searches or evaluates target leaves."""
import argparse
from fractions import Fraction as Q
import hashlib
import json
from pathlib import Path
import sys
from mpmath import iv
import mpmath

SELF=Path(__file__)
OWNER=SELF.parent.parent
EXPECTED='c1c0f341a2f60a2cba948138f4ab9575019eb18bc6ad94f4460f1d37d7b73be7'
DOMAIN=((Q(6,5),Q(7,5)),(Q(8,5),Q(9,5)),(Q(1,10),Q(1,2)),
        (-Q(22,7),Q(22,7)),(-Q(22,7),Q(22,7)))
iv.dps=30

def digest(path): return hashlib.sha256(path.read_bytes()).hexdigest()
def exact_endpoint(t):
    sign,man,exponent,_=t
    return (-1 if sign else 1)*Q(int(man))*Q(2)**exponent

def bounds(v): return tuple(exact_endpoint(t) for t in v._mpi_)
def contains(v,q):
    lo,hi=bounds(v)
    return lo<=q<=hi

def point(q): return iv.mpf(q.numerator)/q.denominator

def decode(path,domain):
    out=list(domain)
    for char in path:
        code=int(char); axis=code//2
        lo,hi=out[axis]; mid=(lo+hi)/2
        out[axis]=(lo,mid) if code%2==0 else (mid,hi)
    return tuple(out)

def cover_audit(paths):
    # Set of all proper prefixes and their observed immediate child codes.
    leaves=set(paths)
    assert len(leaves)==len(paths), 'duplicate leaf'
    prefixes={}
    for path in paths:
        for depth,char in enumerate(path):
            assert char in '0123456789', 'bad digit'
            prefix=path[:depth]
            assert prefix not in leaves, 'ancestor leaf'
            prefixes.setdefault(prefix,set()).add(int(char))
    assert leaves, 'empty cover'
    for children in prefixes.values():
        assert len(children)==2, 'missing sibling'
        a,b=sorted(children)
        assert a%2==0 and b==a+1, 'different split axes'
    mass=sum((Q(1,2)**len(p) for p in paths),Q(0))
    assert mass==1, 'normalized volume differs from one'
    return {'leaves':len(paths),'internalNodes':len(prefixes),'normalizedVolume':str(mass),'maxDepth':max(map(len,paths))}

def controls():
    assert exact_endpoint((0,3,-1,2))==Q(3,2)
    assert exact_endpoint((1,5,-2,3))==-Q(5,4)
    assert bounds(iv.mpf([1,2]))==(Q(1),Q(2))
    for q in (Q(1,10),Q(-2,3),Q(2**180+1),Q(22,7)):
        assert contains(point(q),q)
    assert contains(point(Q(1,10))+point(Q(1,5)),Q(3,10))
    assert contains(point(Q(1,3))*point(Q(3,7)),Q(1,7))
    assert contains(point(Q(2,3))/point(Q(4,9)),Q(3,2))
    lo,hi=bounds(iv.sqrt(iv.mpf(2))); assert lo*lo<=2<=hi*hi
    assert bounds(iv.mpf([-2,1])**2)==(Q(0),Q(4))
    assert contains(iv.sin(iv.pi/6),Q(1,2))
    assert contains(iv.cos(iv.pi/3),Q(1,2))
    assert bounds(iv.sin(iv.mpf([-4,4])))==(Q(-1),Q(1))
    assert bounds(iv.pi)[1]<Q(22,7)
    assert cover_audit([''])['leaves']==1
    assert cover_audit(['02','03','1'])['normalizedVolume']=='1'
    for bad in ([],['0'],['0','0','1'],['0','00','1'],['0','3']):
        try: cover_audit(bad)
        except AssertionError: pass
        else: raise AssertionError('invalid cover accepted')
    assert decode('09',((Q(0),Q(2)),)*5)==((Q(0),Q(1)),)+((Q(0),Q(2)),)*3+((Q(1),Q(2)),)
    # I_n=int_0^1 x^n/(1+x^2) dx represented as constant + pi*p + log(2)*l.
    integrals=[(Q(0),Q(1,4),Q(0)),(Q(0),Q(0),Q(1,2))]
    for n in range(2,9):
        old=integrals[n-2]
        integrals.append((Q(1,n-1)-old[0],-old[1],-old[2]))
    polynomial=[1,-4,6,-4,1]
    integral=tuple(sum((Q(c)*integrals[j+4][k] for j,c in enumerate(polynomial)),Q(0)) for k in range(3))
    assert integral==(Q(22,7),Q(-1),Q(0))
    return {'passed':True,'checks':['exact endpoint extraction','outward rational conversion and arithmetic','sqrt square and trigonometric known values','complete and deliberately malformed covers','exact rational path reconstruction','positive-integral identity 22/7-pi'],'piBoundIntegral':list(map(str,integral))}

def target(source,control):
    recorded=json.loads(control.read_text())
    assert recorded['passed'] and recorded['mode']=='controls' and recorded['instrumentSha256']==digest(SELF)
    data=json.loads(source.read_text())
    assert data['sha256']==EXPECTED
    domain=tuple(tuple(Q(s) for s in pair) for pair in data['domain'])
    assert domain==DOMAIN
    excluded=data['excluded']; unresolved=data['unresolved']
    paths=[row[0] for row in excluded]+unresolved
    result=cover_audit(paths)
    for path in paths:
        box=decode(path,domain)
        assert all(lo<=a<b<=hi for (lo,hi),(a,b) in zip(domain,box))
    signs={'positive':0,'negative':0}
    for path,k,value in excluded:
        assert isinstance(k,int) and 0<=k<6
        assert value.startswith('[') and value.endswith(']')
        lo,hi=(Q(s.strip()) for s in value[1:-1].split(','))
        assert lo<=hi
        if lo>0: signs['positive']+=1
        elif hi<0: signs['negative']+=1
        else: raise AssertionError('printed exclusion interval contains zero')
    assert data['complete_exclusion']==(len(unresolved)==0)
    return {'passed':True,'source':str(source),'sourceSha256':digest(source),'subjectSha256':data['sha256'],
            'excludedLeaves':len(excluded),'unresolvedLeaves':len(unresolved),
            'completeExclusion':data['complete_exclusion'],'partition':result,'printedSigns':signs,
            'scope':'Exact path/cover audit and printed-sign check only. No target residual replay or proof of rounded decimal endpoint enclosure.'}

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('mode',choices=['controls','target']);parser.add_argument('--source');parser.add_argument('--control');args=parser.parse_args()
    result=controls() if args.mode=='controls' else target(Path(args.source),Path(args.control))
    result.update(mode=args.mode,instrumentSha256=digest(SELF),python=sys.executable,mpmathVersion=mpmath.__version__,ivDps=iv.dps)
    print(json.dumps(result,indent=2))
