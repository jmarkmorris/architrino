"""Whole-cell residual enclosure on the retained original E+M trial.
Fourth-order reception Taylor bounds are used only inside one source piece.
Cells intersecting source seams are subdivided; tiny cells use raw interval
union evaluation. A failure is a proof-instrument failure, never physical fate.
"""
import importlib.util,pathlib,json,math,time,os,argparse,hashlib,signal,resource,bisect,threading,sys
p=pathlib.Path(__file__).with_name('authorized-cases-ten-hour-e-trial-v3.py')
s=importlib.util.spec_from_file_location('e_trial',p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
j=m.j;I,J,iv,mp=j.I,j.J,j.iv,j.mp
lower,upper,mag,bound=j.lower,j.upper,j.mag,j.bound

def bernstein(cs):
    d=len(cs)-1
    return [sum((cs[k]*math.comb(q,k)/math.comb(d,k) for k in range(q+1)),I(0)) for q in range(d+1)]
def jet_bound(cs,h,k):
    bc=[bernstein([x/h**k for x in m.derivative(c,k)]) for c in cs]
    return max(upper(j.norm([row[z] for row in bc])) for z in range(len(bc[0])))
def piece_union(trial,k,box):
    lo,hi=lower(box),upper(box);cuts=[lo,hi]
    for v in [-upper(trial.delta),-lower(trial.delta),mp.mpf(0)]+trial.times[bisect.bisect_right(trial.times,lo):bisect.bisect_left(trial.times,hi)]:
        if lo<v<hi:cuts.append(v)
    cuts=sorted(set(cuts));values=[]
    for a,b in zip(cuts,cuts[1:]):
        mid=(a+b)/2
        try:region=trial.region(I(mid))
        except m.Seam:
            # Exact unknown patch endpoint lies in its tight interval;
            # either analytic formula encloses the same C2 values there.
            for reg in [('circle',0),('patch',0)]:values.append(trial.state(k,J(iv.mpf([a,b]),0),reg))
            continue
        values.append(trial.state(k,J(iv.mpf([a,b]),0),region))
    return [[J(j.hull([v[d][z].c[0] for v in values]),0) for z in range(3)] for d in range(3)]

class Residual:
    def __init__(self,trial):self.trial=trial;self.rows=[];self.raw=0;self.cells=0;self.maxrho=mp.mpf(0);self.speed=mp.mpf('.6')
    def field(self,i,k,T,roots,regions,n):
        trial=self.trial;xx,uu,aa=trial.state(i,T,('poly',k));total=[J(0,n)]*3
        for src in range(4):
            if src==i:continue
            if regions[src] is None:
                assert n==0
                f=lambda S:piece_union(trial,src,S.c[0])
            else:f=lambda S,src=src:trial.state(src,S,regions[src])
            ff,_=j.response(xx,uu,T,f,J(roots[src],n))
            total=[v+(-1)**(i+src)*a for v,a in zip(total,ff)]
        return aa,total
    def cell(self,k,left,right,depth=0):
        trial=self.trial;mid=(left+right)/2;rad=(right-left)/2
        roots=[];regions=[];seam=False
        for i in range(4):
            rr={};rg={}
            for src in range(4):
                if src==i:continue
                root=trial.root(i,src,mid);rr[src]=root
                # All trial speeds certified below .6 before target residual use.
                box=root+iv.mpf([-1,1])*rad*4
                try:rg[src]=trial.region(box)
                except m.Seam:rg[src]=None;seam=True
            roots.append(rr);regions.append(rg)
        if seam and right-left>mp.mpf('1e-10'):
            self.cell(k,left,mid,depth+1);self.cell(k,mid,right,depth+1);return
        errors=[];rootdata=[]
        for i in range(4):
            if seam:
                rr={src:r+iv.mpf([-1,1])*rad*4 for src,r in roots[i].items()}
                aa,ff=self.field(i,k,J(iv.mpf([left,right]),0),rr,regions[i],0)
                errors.append(upper(j.norm([a.c[0]-b.c[0] for a,b in zip(aa,ff)])));self.raw+=1
            else:
                Tc=J([I(mid),I(1),I(0),I(0),I(0)])
                aa,ff=self.field(i,k,Tc,roots[i],regions[i],4)
                # Bound the fourth derivative coefficient uniformly on the cell.
                Tb=J([iv.mpf([left,right]),I(1),I(0),I(0),I(0)])
                rr={src:r+iv.mpf([-1,1])*rad*4 for src,r in roots[i].items()}
                ab,fb=self.field(i,k,Tb,rr,regions[i],4)
                component=[]
                for ax in range(3):
                    e=sum((I(mag(aa[ax].c[q]-ff[ax].c[q]))*I(rad)**q for q in range(4)),I(0))
                    e+=I(mag(ab[ax].c[4]-fb[ax].c[4]))*I(rad)**4
                    component.append(I(upper(e)))
                errors.append(upper(j.norm(component)))
            rootdata.append({str(src):bound(r) for src,r in roots[i].items()})
        rho=max(errors);self.maxrho=max(self.maxrho,rho);self.cells+=1
        self.rows.append({'left':bound(I(left)),'right':bound(I(right)),'rho':j.upstr(rho),'memberRho':[j.upstr(x) for x in errors],'method':'raw-union' if seam else 'Taylor4','rootMid':rootdata})

prop_path=pathlib.Path(__file__).with_name('authorized-cases-ten-hour-e-propagation.py')
assert hashlib.sha256(prop_path.read_bytes()).hexdigest()=='a1b850177383f0aa2fff17e6014b9e3305f9240010b33a25c8b480b0533284ba'
ps=importlib.util.spec_from_file_location('e_extension_partials',prop_path);prop=importlib.util.module_from_spec(ps);ps.loader.exec_module(prop)

def vnorm_upper(values):return upper(iv.sqrt(sum((a**2 for a in values),I(0))))

def source_windows(trial,box):
    lo,hi=lower(box),upper(box);cuts=[lo,hi]
    for v in [-upper(trial.delta),-lower(trial.delta),mp.mpf(0)]+trial.times[bisect.bisect_right(trial.times,lo):bisect.bisect_left(trial.times,hi)]:
        if lo<v<hi:cuts.append(v)
    cuts=sorted(set(cuts));out=[]
    for a,b in zip(cuts,cuts[1:]):
        try:regions=[trial.region(I((a+b)/2))]
        except m.Seam:regions=[('circle',0),('patch',0)]
        out.extend((iv.mpf([a,b]),reg) for reg in regions)
    return out

def difference_bounds(trial,i,regA,regB,box):
    if regA==regB:return [I(0)]*3
    mid=(lower(box)+upper(box))/2;rad=(upper(box)-lower(box))/2
    T=J([I(mid),I(1)]+[I(0)]*4)
    xa=trial.state(i,T,regA)[0];xb=trial.state(i,T,regB)[0]
    analytic=(regA[0]=='poly')!=(regB[0]=='poly')
    errors=[]
    for d in range(3):
        comps=[]
        for axis in range(3):
            diff=[xa[axis].c[q+d]-xb[axis].c[q+d] for q in range(6-d)]
            diff=[v*math.factorial(q+d)/math.factorial(q) for q,v in enumerate(diff)]
            value=j.poly(diff,J(iv.mpf([-rad,rad]),0)).c[0]
            err=I(mag(value))
            if analytic:err+=trial.r*trial.om**6*I(rad)**(6-d)/math.factorial(6-d)
            comps.append(I(upper(err)))
        errors.append(I(vnorm_upper(comps)))
    return errors

class ExtensionResidual(Residual):
    def extension_root(self,i,src,mid,region,nominal):
        trial=self.trial;xx=[v.c[0] for v in trial.point(i,mid)[0]]
        def gap(S):
            xp=[v.c[0] for v in trial.state(src,J(I(S),0),region)[0]]
            return j.norm(j.sub(xx,xp))-(I(mid)-I(S))
        lo=lower(nominal)-mp.mpf('1e-18');hi=upper(nominal)+mp.mpf('1e-18')
        assert upper(gap(lo))<0 and lower(gap(hi))>0
        for _ in range(60):
            z=(lo+hi)/2;g=gap(z)
            if lower(g)>0:hi=z
            elif upper(g)<0:lo=z
            else:break
            if hi-lo<mp.mpf('1e-28'):break
        return iv.mpf([lo,hi])
    def cell(self,k,left,right,depth=0):
        trial=self.trial;mid=(left+right)/2;rad=(right-left)/2
        errors=[];rootdata=[];corrections=[]
        for i in range(4):
            roots={};regions={};source_ranges={};nominal_roots={}
            correction=I(0)
            Tb=J([iv.mpf([left,right]),I(1)]+[I(0)]*3)
            xx,uu,_=trial.state(i,J(iv.mpf([left,right]),0),('poly',k))
            for src in range(4):
                if src==i:continue
                nominal=trial.root(i,src,mid);nominal_roots[src]=nominal
                try:region=trial.region(nominal)
                except m.Seam:
                    center=(lower(nominal)+upper(nominal))/2
                    if center<=-upper(trial.delta):region=('circle',0)
                    elif center<=0:region=('patch',0)
                    else:region=('poly',max(0,min(len(trial.times)-2,bisect.bisect_right(trial.times,center)-1)))
                eroot=self.extension_root(i,src,mid,region,nominal)
                roots[src]=eroot;regions[src]=region
                sbox=j.hull([nominal,eroot])+iv.mpf([-1,1])*I(rad)*4
                source_ranges[src]=sbox
                ext=trial.state(src,J([sbox,I(1)]),region)
                ev=[v.c[0] for v in ext[1]];ea=[v.c[0] for v in ext[2]];ej=[v.c[1] for v in ext[2]]
                assert vnorm_upper(ev)<mp.mpf('.6'), 'local extension speed bound'
                actual_values=[];eps=[I(0)]*3
                for win,reg in source_windows(trial,sbox):
                    actual_values.append(trial.state(src,J(win,0),reg))
                    ds=difference_bounds(trial,src,region,reg,win)
                    eps=[I(max(upper(a),upper(b))) for a,b in zip(eps,ds)]
                if max(upper(e) for e in eps)>0:
                    union=[[j.hull([v[d][ax].c[0] for v in actual_values]+[ext[d][ax].c[0]]) for ax in range(3)] for d in range(3)]
                    R=iv.mpf([left,right])-sbox
                    n=j.scale(j.sub([v.c[0] for v in xx],union[0]),1/R)
                    row=prop.jacobian(R,n,union[1],union[2],[I(0)]*3,[v.c[0] for v in uu])
                    coeff=prop.source_from_partials(row,I('.6'),I(lower(R)),I(vnorm_upper(ea)),I(vnorm_upper(ej)))
                    correction+=sum((coeff[key]*err for key,err in zip(('Px','Pv','Pa'),eps)),I(0))
            Tc=J([I(mid),I(1)]+[I(0)]*3)
            aa,ff=self.field(i,k,Tc,roots,regions,4)
            ab,fb=self.field(i,k,Tb,source_ranges,regions,4)
            comp=[]
            for axis in range(3):
                er=sum((I(mag(aa[axis].c[q]-ff[axis].c[q]))*I(rad)**q for q in range(4)),I(0))
                er+=I(mag(ab[axis].c[4]-fb[axis].c[4]))*I(rad)**4
                comp.append(I(upper(er)))
            errors.append(upper(I(vnorm_upper(comp))+correction));corrections.append(upper(correction))
            rootdata.append({str(src):bound(r) for src,r in nominal_roots.items()})
        rho=max(errors);self.maxrho=max(self.maxrho,rho);self.cells+=1
        self.rows.append({'left':bound(I(left)),'right':bound(I(right)),'rho':j.upstr(rho),'memberRho':[j.upstr(x) for x in errors],'extensionCorrection':[j.upstr(x) for x in corrections],'method':'Taylor4 plus C2 source-piece difference','rootMid':rootdata})

def extension_known():
    class Cubic:
        r=I(1);om=I(1)
        def state(self,i,T,reg):
            f=J(0,T.n) if reg[1]==0 else T**3/6
            v=J(0,T.n) if reg[1]==0 else T*T/2
            a=J(0,T.n) if reg[1]==0 else T
            return [[f,J(0,T.n),J(0,T.n)],[v,J(0,T.n),J(0,T.n)],[a,J(0,T.n),J(0,T.n)]]
    e=difference_bounds(Cubic(),0,('poly',0),('poly',1),iv.mpf(['0','.1']))
    expected=[mp.mpf(1)/6000,mp.mpf(1)/200,mp.mpf(1)/10]
    for got,want in zip(e,expected):assert upper(got)>=want and upper(got)<want*mp.mpf('1.000000000000000000000000000001')
    return {'passed':True,'case':'exact C2 cubic seam source position velocity acceleration differences'}

def known():
    # Bernstein of t^2 over [0,1] is (0,0,1); exact velocity bound2.
    assert all(j.contains(x,q) for x,q in zip(bernstein([I(0),I(0),I(1)]),[0,0,1]))
    cs=[[I(0),I(0),I(1)],[I(0)]*3,[I(0)]*3];assert jet_bound(cs,I(1),1)==2
    # Taylor bound for f(t)=1/(2+t)^2 about0, |t|<=1/4.
    t=J([I(0),I(1),I(0),I(0),I(0)]);f=1/(2+t)**2
    box=J([iv.mpf(['-.25','.25']),I(1),I(0),I(0),I(0)]);fb=1/(2+box)**2
    for sign in [-1,1]:
        x=I(sign)/4;poly=sum((f.c[q]*x**q for q in range(4)),I(0));rem=mag(fb.c[4])/4**4
        exact=1/(2+x)**2;assert upper(abs(exact-poly))<=rem
    class SquareTrial:
        times=[mp.mpf(0),mp.mpf(1)]
        delta=I(1)
        points=[[I(1),I(0),I(0)],[I(0),I(1),I(0)],[I(-1),I(0),I(0)],[I(0),I(-1),I(0)]]
        def region(self,S):return ('circle',0)
        def state(self,i,T,region=None):return ([J(x,T.n) for x in self.points[i]],[J(0,T.n)]*3,[J(0,T.n)]*3)
        def point(self,i,t):return self.state(i,J(I(t),0))
        def root(self,i,k,T):return I(T)-j.norm(j.sub(self.points[i],self.points[k]))
    sq=Residual(SquareTrial());sq.cell(0,mp.mpf('.25'),mp.mpf('.251'))
    exact=1/iv.sqrt(2)-I(1)/4
    assert sq.maxrho>=lower(exact) and sq.maxrho<1
    for number in [I(1)/3,-I(1)/3]:
        a,b=bound(number);assert mp.mpf(a)<=lower(number) and mp.mpf(b)>=upper(number)
    return {'passed':True,'cases':['exact Bernstein t squared derivative bound','whole-cell fourth-order Taylor residual remainder rational function','all12 static square whole-cell residual exact radial magnitude','outward positive and negative third export']}

def rss_bytes():
    q=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss
    return q if sys.platform=="darwin" else q*1024

def memory_exceeded(used,limit=2*1024**3):return used>limit

def start_memory_watch():
    def watch():
        while True:
            if memory_exceeded(rss_bytes()):
                os.write(2,b"RSS high-water exceeded 2 GiB; owned process exits75\n")
                os._exit(75)
            time.sleep(.25)
    threading.Thread(target=watch,daemon=True).start()

stop=False
def stopped(*_):
    global stop;stop=True

def main():
    ap=argparse.ArgumentParser();ap.add_argument('--known',action='store_true');ap.add_argument('--input');ap.add_argument('--out');ap.add_argument('--max-time',type=str,default='20');ap.add_argument('--segments');ap.add_argument('--max-segments',type=int,default=0);ap.add_argument('--deadline',type=float,default=900);args=ap.parse_args()
    controls={'jets':j.known(),'trial':m.extra_known(),'residual':known(),'extension':extension_known()}
    assert not memory_exceeded(2*1024**3) and memory_exceeded(2*1024**3+1)
    controls['memoryWatch']={'passed':True,'limitBytes':2*1024**3,'pollSeconds':.25,'kind':'RSS high-water polling; not address-space hard limit'}
    if args.known:print(json.dumps(controls,indent=2));return
    assert args.input and args.out and not pathlib.Path(args.out).exists()
    signal.signal(signal.SIGTERM,stopped);signal.signal(signal.SIGINT,stopped)
    start=time.monotonic();assert 0<mp.mpf(args.max_time)<=mp.mpf('25.59210616145')
    start_memory_watch()
    trial=m.Trial(args.input,args.max_time);end=mp.mpf(args.max_time);res=ExtensionResidual(trial)
    prefix=[k for k,t in enumerate(trial.times[:-1]) if t<end]
    selected=prefix[:args.max_segments] if args.max_segments else prefix
    if args.segments:selected=[int(x) for x in args.segments.split(',')];assert all(x in prefix for x in selected)
    # Directed complete velocity bounds precede every target root calculation.
    vmax=upper((1+3*trial.beta)/4);amax=mp.mpf(0);jmax=mp.mpf(0)
    for ks in trial.segments:
        for k in prefix:
            cs,h=ks[k];vmax=max(vmax,jet_bound(cs,h,1));amax=max(amax,jet_bound(cs,h,2));jmax=max(jmax,jet_bound(cs,h,3))
    assert vmax<mp.mpf('.6')
    nextbeat=start;terminal='completed';last=-1
    pathlib.Path(args.out).parent.mkdir(parents=True,exist_ok=True)
    stream=pathlib.Path(args.out+".rows.jsonl")
    assert not stream.exists()
    header={"kind":"header","sourceSha256":hashlib.sha256(pathlib.Path(args.input).read_bytes()).hexdigest(),"instrumentSha256":hashlib.sha256(pathlib.Path(__file__).read_bytes()).hexdigest(),"selectedSegments":selected,"preparation":trial.preparation,"trialBounds":{"speed":j.upstr(vmax),"acceleration":j.upstr(amax),"jerk":j.upstr(jmax)}}
    with stream.open("x") as f:f.write(json.dumps(header)+"\n")
    for k in selected:
        if stop or time.monotonic()-start>args.deadline:terminal='graceful cutoff';break
        res.cell(k,trial.times[k],min(trial.times[k+1],end));last=k
        with stream.open('a') as f:f.write(json.dumps({'kind':'cell','segment':k,'row':res.rows[-1]})+'\n')
        if time.monotonic()>=nextbeat:
            print(json.dumps({'heartbeat':True,'segment':k,'time':str(trial.times[k+1]),'cells':res.cells,'rho':str(res.maxrho),'wallSeconds':time.monotonic()-start}),flush=True);nextbeat=time.monotonic()+30
    out={'claim':'directed subject whole-cell trial residual only; not actual-solution certificate','terminal':terminal,'selectedSegments':selected,'lastSegment':last,'controls':controls,'sourceSha256':hashlib.sha256(pathlib.Path(args.input).read_bytes()).hexdigest(),'preparation':trial.preparation,'trialBounds':{'speed':j.upstr(vmax),'acceleration':j.upstr(amax),'jerk':j.upstr(jmax)},'maxRho':j.upstr(res.maxrho),'cellCount':res.cells,'rawMemberCount':res.raw,'wallSeconds':time.monotonic()-start,'peakRSS':resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,'rows':res.rows}
    pathlib.Path(args.out).write_text(json.dumps(out,indent=2))
    with stream.open('a') as f:f.write(json.dumps({'kind':'footer','receiptSha256':hashlib.sha256(pathlib.Path(args.out).read_bytes()).hexdigest(),'terminal':terminal})+'\n')
    print(json.dumps({k:v for k,v in out.items() if k not in ['rows','controls','preparation']},indent=2))
if __name__=='__main__':main()
