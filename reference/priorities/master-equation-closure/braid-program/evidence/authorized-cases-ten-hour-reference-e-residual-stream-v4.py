"""Immutable independent residual stream; frozen reference mathematics, new transport wrapper."""
import pathlib,importlib.util,hashlib,json,sys,time,math,signal,resource,argparse,types
p=pathlib.Path(__file__).with_name('authorized-cases-ten-hour-reference-e-seam-audit-v2.py')
assert hashlib.sha256(p.read_bytes()).hexdigest()=='6246594bd91333aef876b535c9b39bc0f697c1bc8873f62429679e805e1af305'
sp=importlib.util.spec_from_file_location('ownref',p);v=importlib.util.module_from_spec(sp);sp.loader.exec_module(v)
r,I,S,iv,mp,Trial,difference,partials=v.r,v.I,v.S,v.iv,v.mp,v.Trial,v.difference,v.partials
LOCAL=v.L;SOURCE=pathlib.Path('.local-data/master-equation-closure/braid-program/maxwell-shaped-overnight/ring-full-plus1e4-h0025.history.json');SOURCE_SHA='ef83cb8910090bf4c7179ebef65986c8895bb0d693e1a50bc5099a018393e193'
def rational(x):
    sign,mant,exponent,_=mp.mpf(x)._mpf_
    return r.Q((-1 if sign else 1)*int(mant))*r.Q(2)**int(exponent)
def centered_coverage(lo,hi,mid,rad):
    assert rational(mid)-rational(rad)<=rational(lo) and rational(mid)+rational(rad)>=rational(hi),'point center/radius lost domain coverage'
def window_coverage(window,left,right,rad):
    assert rational(r.lo(window))<=rational(left)-4*rational(rad) and rational(r.hi(window))>=rational(right)+4*rational(rad),'source window lost exact dyadic coverage'
original_difference=difference
def difference(tr,i,ra,rb,w):
    mid=(r.lo(w)+r.hi(w))/2;rad=(r.hi(w)-r.lo(w))/2
    centered_coverage(r.lo(w),r.hi(w),mid,rad)
    return original_difference(tr,i,ra,rb,w)

def cell(tr,k,terminal):
    le,ri=tr.times[k:k+2];ri=min(ri,mp.mpf(terminal));mid=(le+ri)/2;rad=(ri-le)/2;centered_coverage(le,ri,mid,rad);T=iv.mpf([le,ri]);receiving=[];rootdata=[]
    for i in range(4):
        roots={};regs={};windows={};correction=I(0);xx,uu,_=tr.state(i,S([T]),('poly',k));assert r.hi(r.normi([v.c[0] for v in uu]))<mp.mpf('.6');nominal={}
        for j in range(4):
            if i==j:continue
            rt=tr.root(i,j,mid);nominal[str(j)]=[r.out(rt,False),r.out(rt)];reg=tr.region(rt);er=tr.root(i,j,mid,reg,rt);w=iv.mpf([min(r.lo(rt),r.lo(er)),max(r.hi(rt),r.hi(er))])+I(rad)*iv.mpf([-4,4]);window_coverage(w,min(r.lo(rt),r.lo(er)),max(r.hi(rt),r.hi(er)),rad);roots[j]=er;regs[j]=reg;windows[j]=w
            ext=tr.state(j,S([w,1]),reg);assert r.hi(r.normi([q.c[0] for q in ext[1]]))<mp.mpf('.6');eps=[I(0)]*3;vals=[]
            for win,rr in tr.windows(w):
                vals.append(tr.state(j,S([win]),rr));assert r.hi(r.normi([q.c[0] for q in vals[-1][1]]))<mp.mpf('.6');diff=difference(tr,j,reg,rr,win);eps=[I(max(r.hi(x),r.hi(y))) for x,y in zip(eps,diff)]
            if any(r.hi(q)>0 for q in eps):
                union=[[iv.mpf([min([r.lo(v[d][ax].c[0]) for v in vals]+[r.lo(ext[d][ax].c[0])]),max([r.hi(v[d][ax].c[0]) for v in vals]+[r.hi(ext[d][ax].c[0])])]) for ax in range(3)] for d in range(3)];R=T-w;n=[(q.c[0]-v)/R for q,v in zip(xx,union[0])];assert r.lo(R)>0 and r.lo(1-r.dot(n,union[1]))>0
                pr=partials(R,n,union[1],union[2],[q.c[0] for q in uu]);A=r.normi([q.c[0] for q in ext[2]]);J=r.normi([q.c[1] for q in ext[2]]);px=(pr[0]+2*pr[1]/I(r.lo(R))+pr[2]*A+pr[3]*J)/I('.4');correction+=px*eps[0]+pr[2]*eps[1]+pr[3]*eps[2]
        errors=[]
        for t,rr in [(S([I(mid),1,0,0,0]),roots),(S([T,1,0,0,0]),windows)]:
            x,u,ac=tr.state(i,t,('poly',k));f=[t.co(0)]*3
            for j in roots:
                ff,_=r.hit(x,u,t,lambda s,j=j:tr.state(j,s,regs[j]),rr[j]);f=[v+(-1)**(i+j)*q for v,q in zip(f,ff)]
            errors.append([v-q for v,q in zip(ac,f)])
        comp=[sum((I(r.ab(errors[0][ax].c[q]))*I(rad)**q for q in range(4)),I(0))+I(r.ab(errors[1][ax].c[4]))*I(rad)**4 for ax in range(3)];rho=r.normi(comp)+correction
        receiving.append({'rho':r.out(rho),'correction':r.out(correction)});rootdata.append(nominal)
    return {'left':[r.out(I(le),False),r.out(I(le))],'right':[r.out(I(ri),False),r.out(I(ri))],'memberRho':[q['rho'] for q in receiving],'rho':max((q['rho'] for q in receiving),key=mp.mpf),'rootMid':rootdata,'extensionCorrection':[q['correction'] for q in receiving],'method':'independent norm-clock Taylor4 and direct-dual source partials'}
def speed_prefix(tr,terminal):
    top=mp.mpf(0)
    for k,left in enumerate(tr.times[:-1]):
        if left>=terminal:break
        h=I(tr.times[k+1])-I(left)
        for i in range(4):
            tr.state(i,S([I(left)]),('poly',k));_,cs=tr.cache[(i,k)]
            controls=[]
            for axis in cs:
                pw=[axis[j+1]*(j+1)*h**j for j in range(5)]
                controls.append([sum((pw[z]*I(r.Q(math.comb(j,z),math.comb(4,z))) for z in range(j+1)),I(0)) for j in range(5)])
            top=max(top,max(r.hi(r.normi([axis[j] for axis in controls])) for j in range(5)))
    assert top<mp.mpf('.6');return r.out(I(top))
def valid_bracket(gap,box):return r.hi(gap(r.lo(box)))<0 and r.lo(gap(r.hi(box)))>0
class Proposals:
    def __init__(self,path):
        self.path=pathlib.Path(path);self.rows={};self.offset=0;self.header=None;self.footer=None
        if self.path.suffix=='.json':
            d=json.loads(self.path.read_text());assert d['sourceSha256']==SOURCE_SHA
            self.rows=dict(zip(d['selectedSegments'],d['rows']));self.header=d
    def get(self,k,deadline):
        while k not in self.rows and time.monotonic()<deadline:
            if self.path.suffix=='.json' or self.footer is not None:break
            if not self.path.exists():time.sleep(.25);continue
            with self.path.open('rb') as f:f.seek(self.offset);line=f.readline()
            if not line.endswith(b'\n'):time.sleep(.25);continue
            self.offset+=len(line);obj=json.loads(line)
            if self.header is None:assert obj['kind']=='header' and obj['sourceSha256']==SOURCE_SHA;self.header=obj
            elif obj['kind']=='cell':
                assert obj['segment'] not in self.rows;self.rows[obj['segment']]=obj['row']
            else:assert obj['kind']=='footer';self.footer=obj
        return self.rows.get(k)
def install_checked_roots(tr):
    original=tr.root;tr.root_checks={'proposed':0,'widened':0,'fallback':0,'extension':0}
    def checked(self,i,j,t,reg=None,bracket=None):
        row=getattr(self,'proposal_row',None)
        candidate=I(row['rootMid'][i][str(j)]) if reg is None and row is not None else bracket
        if candidate is not None:
            xx=self.state(i,S([I(t)]),self.region(I(t)))[0]
            def gap(z):
                yy=self.state(j,S([I(z)]),reg or self.region(I(z)))[0]
                return r.normi([a.c[0]-b.c[0] for a,b in zip(xx,yy)])+I(z)-I(t)
            for pad in ['0','1e-28','1e-24','1e-18']:
                box=iv.mpf([r.lo(candidate)-mp.mpf(pad),r.hi(candidate)+mp.mpf(pad)])
                if valid_bracket(gap,box):
                    self.root_checks['extension' if reg is not None else 'proposed' if pad=='0' else 'widened']+=1
                    return box
        self.root_checks['fallback']+=1
        return original(i,j,t,reg,bracket)
    tr.root=types.MethodType(checked,tr)

def known():
    centered_coverage(mp.mpf(0),mp.mpf(1),mp.mpf('.5'),mp.mpf('.5'))
    try:centered_coverage(mp.mpf(0),mp.mpf(1),mp.mpf('.5'),mp.mpf('.49'))
    except AssertionError:pass
    else:raise AssertionError('inward radius passed exact coverage')
    window_coverage(iv.mpf([-4,5]),mp.mpf(0),mp.mpf(1),mp.mpf(1))
    try:window_coverage(iv.mpf([-3,5]),mp.mpf(0),mp.mpf(1),mp.mpf(1))
    except AssertionError:pass
    else:raise AssertionError('inward window passed exact coverage')
    class Static:
        times=[mp.mpf(0),mp.mpf('.001')];delta=I(1)
        points=[[1,0,0],[0,1,0],[-1,0,0],[0,-1,0]]
        def state(self,i,t,reg):return ([t.co(q) for q in self.points[i]],[t.co(0)]*3,[t.co(0)]*3)
        def region(self,s):return ('circle',0)
        def root(self,i,j,t,reg=None,bracket=None):return I(t)-r.normi([I(x-y) for x,y in zip(self.points[i],self.points[j])])
        def windows(self,w):return [(w,('circle',0))]
    assert valid_bracket(lambda z:I(z)+2,iv.mpf(['-2.01','-1.99']))
    assert not valid_bracket(lambda z:I(z)+2,iv.mpf(['-1','1']))
    row=cell(Static(),0,mp.mpf('.00075'));expected=1/iv.sqrt(2)-I(1)/4
    assert all(mp.mpf(q)>=r.lo(expected) and mp.mpf(q)<r.hi(expected)+mp.mpf('1e-12') for q in row['memberRho'])
    assert r.lo(I(row['right']))<=mp.mpf('.00075')<=r.hi(I(row['right']))
    assert all(mp.mpf(q)==0 for q in row['extensionCorrection'])
    st=Static();install_checked_roots(st);st.proposal_row={'rootMid':[{str(j):['-100','-99'] for j in range(4) if j!=i} for i in range(4)]}
    checked=cell(st,0,mp.mpf('.00075'));assert st.root_checks['fallback']==12 and st.root_checks['extension']==12
    assert all(mp.mpf(q)>=r.lo(expected) and mp.mpf(q)<r.hi(expected)+mp.mpf('1e-12') for q in checked['memberRho'])
    st=Static();install_checked_roots(st);st.proposal_row=row
    checked=cell(st,0,mp.mpf('.00075'));assert st.root_checks['fallback']==0 and st.root_checks['extension']==12 and st.root_checks['proposed']+st.root_checks['widened']==12

    report={'passed':True,'instrumentSha256':hashlib.sha256(pathlib.Path(__file__).read_bytes()).hexdigest(),'cases':['all12 independent static-square roots and full residual','exact clipped terminal face','zero local-extension defect','immutable row schema','independent valid and invalid proposed-root signs','full12 proposal widening and rejected-proposal independent fallback','exact dyadic center and source-window coverage with deliberately inward negative controls']};out=LOCAL/'e-residual-stream-known-v4.json';assert not out.exists();out.write_text(json.dumps(report,indent=2));print(json.dumps(report))
def target(args):
    report=json.loads((LOCAL/'e-residual-stream-known-v4.json').read_text());assert report['passed'] and report['instrumentSha256']==hashlib.sha256(pathlib.Path(__file__).read_bytes()).hexdigest();assert hashlib.sha256(SOURCE.read_bytes()).hexdigest()==SOURCE_SHA
    started=time.monotonic();terminal=mp.mpf(args.terminal);assert 0<terminal<=15;tr=Trial(json.loads(SOURCE.read_text()));install_checked_roots(tr)
    if args.speed_receipt:
        cert=pathlib.Path(args.speed_receipt);assert hashlib.sha256(cert.read_bytes()).hexdigest()==args.speed_sha
        hd=json.loads(cert.read_text().splitlines()[0]);assert hd['sourceSha256']==SOURCE_SHA and hd['instrumentSha256']=='7677e32af2d1c3fa142364e9ec66515c96d91cd45975c7f76b0fb38fff7578b1' and mp.mpf(hd['terminal'])>=terminal
        speed=hd['trialBounds']['speed'];assert mp.mpf(speed)<mp.mpf('.6')
    else:speed=speed_prefix(tr,terminal)
    proposals=Proposals(args.proposals) if args.proposals else None
    indices=[k for k,t in enumerate(tr.times[:-1]) if t<terminal];selected=list(map(int,args.segments.split(','))) if args.segments else indices
    assert all(k in indices for k in selected);dest=LOCAL/args.output;assert not dest.exists();header={'kind':'header','sourceSha256':SOURCE_SHA,'instrumentSha256':report['instrumentSha256'],'referenceSha256':'6246594bd91333aef876b535c9b39bc0f697c1bc8873f62429679e805e1af305','selectedSegments':selected,'terminal':args.terminal,'trialBounds':{'speed':speed},'preparation':{'pastSpeed':[r.out((1+3*I('.429117161835'))/4,False),r.out((1+3*I('.429117161835'))/4)]}}
    with dest.open('x') as f:f.write(json.dumps(header)+'\n')
    digest=hashlib.sha256();count=0
    for k in selected:
        if time.monotonic()-started>args.deadline:break
        tick=time.monotonic();tr.proposal_row=proposals.get(k,started+args.deadline) if proposals else None;row=cell(tr,k,terminal);row['independentRootChecks']=dict(tr.root_checks);obj={'kind':'cell','segment':k,'row':row};line=json.dumps(obj,separators=(',',':'))+'\n';digest.update(line.encode())
        with dest.open('a') as f:f.write(line)
        count+=1;rss=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss*(1 if sys.platform=='darwin' else 1024);assert rss<2*1024**3;assert dest.stat().st_size<32*1024**2
        print(json.dumps({'segment':k,'seconds':time.monotonic()-tick,'elapsed':time.monotonic()-started,'rho':row['rho'],'peakRSS':rss}),flush=True)
    footer={'kind':'footer','terminal':'completed' if count==len(selected) else 'stopped','cellCount':count,'rowsSha256':digest.hexdigest(),'elapsed':time.monotonic()-started}
    with dest.open('a') as f:f.write(json.dumps(footer)+'\n')
    print(json.dumps(footer),flush=True)
if __name__=='__main__':
    ap=argparse.ArgumentParser();ap.add_argument('--known',action='store_true');ap.add_argument('--proposals');ap.add_argument('--speed-receipt');ap.add_argument('--speed-sha');ap.add_argument('--terminal',default='15');ap.add_argument('--segments');ap.add_argument('--deadline',type=float,default=120);ap.add_argument('--output',default='e-residual-reference-profile-v1.rows.jsonl');args=ap.parse_args();known() if args.known else target(args)
