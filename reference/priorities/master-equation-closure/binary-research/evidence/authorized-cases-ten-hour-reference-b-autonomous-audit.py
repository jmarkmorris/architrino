"""Independent SymPy polynomial-ring residual audit of finite autonomous rows."""
import argparse, hashlib, json, pathlib, resource, signal, time
from math import factorial
from fractions import Fraction
from sympy.polys.rings import ring
from sympy.polys.domains import QQ
START=time.monotonic();LAST=START
signal.signal(signal.SIGALRM,lambda *_:(_ for _ in ()).throw(TimeoutError('internal 240-second limit')));signal.alarm(240)
R,e,z,a,p,v=ring('e,z,a,p,v',QQ)
def trim(q,n):return R.from_dict({k:c for k,c in q.items() if k[0]+k[1]<=n})
def prod(q,r,n):return trim(q*r,n)
def bc(x,k):
    c=QQ.one
    for j in range(k):c=c*(x-j)/(j+1)
    return c
def beat(stage):
    global LAST
    assert resource.getrusage(resource.RUSAGE_SELF).ru_maxrss<2*1024**3
    now=time.monotonic()
    if now-LAST>10 or stage.startswith('done'):
        print(json.dumps({'stage':stage,'seconds':now-START}),flush=True);LAST=now

def known_field():return [(-R.one,R.zero),(R.zero,R.zero),(-v*v/2,-p*v),(-8*a*p/3,4*a*v/3),(-3*v**4/8+4*a*(v*v-p*p)-a*a,7*a*p*v-3*p*v**3/2),(a*(-32*p**3+68*p*v*v)/5+4*a*a*p/5,a*(36*p*p*v-14*v**3)/5+4*a*a*v/15)]
def calculate(rows,n):
    # Source jets carry intrinsic lag degree separately from autonomous epsilon order.
    fields=[sum((e**j*rows[j][c] for j in range(len(rows))),R.zero) for c in range(2)]
    jets=[None,(p,v)]
    jets.append(tuple(trim(a*f,n-2) for f in fields))
    for m in range(2,n):
        b=n-m-1;fr,ft=[trim(f,b) for f in fields]
        vec=jets[m]
        D=[prod(-p*a,q.diff(a),b)+prod(v*v+a*fr,q.diff(p),b)+prod(-p*v+a*ft,q.diff(v),b) for q in vec]
        jets.append((trim(D[0]-v*vec[1]-(m-1)*p*vec[0],b),trim(D[1]+v*vec[0]-(m-1)*p*vec[1],b)))
        beat('jets-'+str(m+1))
    Q=[2*R.one,R.zero]
    for m in range(1,n+1):
        for c in range(2):Q[c]+=trim(jets[m][c]*z**m,n)*QQ((-1)**m,factorial(m))
    H=(prod(Q[0],Q[0],n)+prod(Q[1],Q[1],n))/4-1
    assert all(k[0]+k[1]>=1 for k in H)
    out=[[R.zero,R.zero] for _ in range(n+1)];out[0][0]=-R.one
    hp=R.one
    for power in range(n+1):
        if power:hp=prod(hp,H,n)
        for c in range(2):
            terms=prod(hp,Q[c],n)
            for k,val in terms.items():
                ed,zd,aa,pp,vv=k
                if zd<2:continue
                coef=4*(zd-1)*QQ(2)**(zd-3)*bc(QQ(zd-3,2),power)
                if coef:out[ed+zd][c]+=R.from_dict({(0,0,aa,pp,vv):val*coef})
        beat('binomial-'+str(power))
    return out,jets

def controls():
    assert (a+p)*(a-p)==a*a-p*p and (a*a*p**3).diff(p)==3*a*a*p*p
    assert bc(QQ(1,2),3)==QQ(1,16)
    rows=known_field();out,jets=calculate(rows,5)
    assert all(tuple(out[n])==rows[n] for n in range(6))
    bad=[list(x) for x in rows];bad[5][0]+=a*a*p
    assert out[5][0]!=bad[5][0]
    central=[(-R.one,R.zero)]+[(R.zero,R.zero)]*5
    _,j=calculate(central,5)
    assert j[3]==(2*a*p,-a*v)
    assert j[4]==(a*(3*v*v-6*p*p)-2*a*a,6*a*p*v)
    return {'passed':True,'controls':['independent SymPy polynomial product/differentiation','binomial coefficient','full F0–F5 identities','deliberate F5 mismatch rejected','central normalized jets3,4']}
def loadrows(data):
    out=[]
    for n,pair in enumerate(data['polar_coefficients']):
        q=[]
        for axis,terms in enumerate(pair):
            d={}
            for key,val in terms:
                key=tuple(key);assert key[0]==key[1]==0
                assert 2*key[2]+key[3]+key[4]==n and key[4]%2==axis if n else key==(0,0,0,0,0)
                assert key not in d;d[key]=QQ(val)
            q.append(R.from_dict(d))
        out.append(tuple(q))
    return out

def target(path):
    data=json.loads(path.read_text());rows=loadrows(data);assert len(rows)==17
    assert rows[:6]==known_field()
    out,jets=calculate(rows,16)
    counts=[]
    for n in range(17):
        for c in range(2):assert out[n][c]==rows[n][c],('full polynomial residual',n,c,str(out[n][c]-rows[n][c]))
        counts.append([len(x) for x in rows[n]])
    # Angle conversion independently follows w'=2wB-u, u'=w+A+uB, log eta'=-B.
    angle=[]
    for n,pair in enumerate(rows):
        converted=[]
        for axis,poly in enumerate(pair):
            dd={}
            for key,val in poly.items():
                aa,pp,vv=key[2:];assert vv%2==axis
                kk=(aa+vv-axis,pp);dd[kk]=dd.get(kk,QQ.zero)+val
            converted.append({k:c for k,c in dd.items() if c})
        angle.append([[[list(k),str(c)] for k,c in sorted(d.items())] for d in converted])
    return {'passed':True,'target_sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'full_polynomial_rows_checked':list(range(17)),'monomial_counts':counts,'converted_radial_angular':angle,'scope':'independent full rational autonomous row identities; no actual-history remainder or phase'}

ap=argparse.ArgumentParser();ap.add_argument('mode',choices=['known','target']);ap.add_argument('--input');ap.add_argument('--known');ap.add_argument('--output',required=True);args=ap.parse_args();digest=hashlib.sha256(pathlib.Path(__file__).read_bytes()).hexdigest()
if args.mode=='known':result=controls()
else:
    k=pathlib.Path(args.known);known=json.loads(k.read_text());assert known['passed'] and known['instrument_sha256']==digest
    result=target(pathlib.Path(args.input));result['known_receipt_sha256']=hashlib.sha256(k.read_bytes()).hexdigest()
result.update(instrument_sha256=digest,mode=args.mode,wall_seconds=time.monotonic()-START);out=pathlib.Path(args.output);assert not out.exists();s=json.dumps(result,indent=2,sort_keys=True)+'\n';assert len(s)<2**20;out.write_text(s);beat('done-'+args.mode);print(json.dumps({'passed':result['passed'],'sha256':hashlib.sha256(s.encode()).hexdigest(),'wall_seconds':result['wall_seconds']}),flush=True)
