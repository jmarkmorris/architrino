"""Independent pilot speed/acceleration/jerk Bernstein comparison."""
import importlib.util,pathlib,json,math,hashlib
p=pathlib.Path(__file__).with_name('authorized-cases-ten-hour-reference-e-pilot-audit-v2.py')
assert hashlib.sha256(p.read_bytes()).hexdigest()=='911422519232a587d5181ab256b541576129d263b53759a9c1de09000b81177e'
sp=importlib.util.spec_from_file_location('ref',p);r=importlib.util.module_from_spec(sp);sp.loader.exec_module(r)
def controls(c,h,d):
    n=5-d
    power=[c[k+d]*r.I(math.factorial(k+d)//math.factorial(k))*h**k for k in range(n+1)]
    return [sum((power[k]*r.I(r.Q(math.comb(j,k),math.comb(n,k))) for k in range(j+1)),r.I(0)) for j in range(n+1)]
test=controls(list(map(r.I,[0,0,1,0,0,0])),r.I(1),1)
assert all(r.lo(v)<=r.mp.mpf(k)/2<=r.hi(v) for k,v in enumerate(test))
print('Known exact Bernstein derivative controls passed before target.')
base=pathlib.Path('.local-data/master-equation-closure')
data=json.loads((base/'braid-program/maxwell-shaped-overnight/ring-full-plus1e4-h0025.history.json').read_text())
subject=json.loads((base/'braid-program/authorized-cases-ten-hour/e-residual-pilot-v2.json').read_text())
ks=[m['knots'][:4] for m in data['members']]
for i in range(4):
    x,v,a=r.circle(i,r.S([0]));total=[r.I(0)]*3
    for j in range(4):
        if i==j:continue
        root=r.root([z.c[0] for z in x],0,j);ff,_=r.hit(x,v,r.S([0]),lambda s,j=j:r.circle(j,s),root)
        total=[z+(-1)**(i+j)*f.c[0] for z,f in zip(total,ff)]
    ks[i][0]={'t':0,'x':[z.c[0] for z in x],'v':[z.c[0] for z in v],'a':total}
maxima=[r.mp.mpf(0)]*3
for k in range(3):
    for i in range(4):
        a,b=ks[i][k:k+2];h=r.I(b['t'])-r.I(a['t']);xx,vv,aa=r.receive(a,b,r.S([r.I(a['t']),1,0,0,0,0,0]))
        cs=[x.c+[acc.c[3]/20] for x,acc in zip(xx,aa)]
        for d in range(1,4):
            ctr=[controls(c,h,d) for c in cs]
            maxima[d-1]=max(maxima[d-1],max(r.hi(r.normi([c[j] for c in ctr])) for j in range(6-d)))
for name,value in zip(['speed','acceleration','jerk'],maxima):assert value<r.mp.mpf(subject['trialBounds'][name])
assert maxima[0]<r.mp.mpf('.6')
out={'passed':True,'knownFirst':True,'bounds':dict(zip(['generatedSpeed','acceleration','jerk'],map(lambda z:r.out(r.I(z)),maxima))),'allBelowSubject':True,'cells':3,'members':4}
dest=base/'binary-research/authorized-cases-ten-hour/reference/e-pilot-jets-v1.json';assert not dest.exists();dest.write_text(json.dumps(out,indent=2));print(json.dumps(out,indent=2))
