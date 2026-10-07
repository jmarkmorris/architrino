"""Independent complete-window E+M error propagation; imports only reference code."""
import pathlib,importlib.util,hashlib,json,time,sys,resource,argparse,signal
from datetime import datetime,timezone
HERE=pathlib.Path(__file__).resolve().parent
P=HERE/'authorized-cases-ten-hour-reference-e-residual-stream-v4.py'
PIN='550aae5eee6e21bf8cb9b23f2a3feed3b9fa2aebaf91d778850aef08946fd965'
assert hashlib.sha256(P.read_bytes()).hexdigest()==PIN
spec=importlib.util.spec_from_file_location('independent_residual',P);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
r,I,S,iv,mp=m.r,m.I,m.S,m.iv,m.mp
a=m.v.a
LOCAL=pathlib.Path('.local-data/master-equation-closure/braid-program/authorized-cases-ten-hour/reference')
KNOWN=LOCAL/'e-error-stream-known-v1.json'
STREAM=LOCAL/'e-residual-reference-t15-v1.rows.jsonl'
OUT=LOCAL/'e-error-reference-t15-v1.rows.jsonl'
STOP=False

def stop(*_):
    global STOP;STOP=True
for sig in (signal.SIGINT,signal.SIGTERM):signal.signal(sig,stop)
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def upper(x):return I(r.hi(x))
def sym(x):return iv.mpf([-r.hi(x),r.hi(x)])
def hull(vals):return iv.mpf([min(r.lo(x) for x in vals),max(r.hi(x) for x in vals)])
def matzero():return [[I(0) for _ in range(3)] for _ in range(3)]
def source(tr,j,w):
    pieces=tr.windows(w);assert pieces,'empty source window'
    # Independently verify that the returned intervals cover the requested window.
    ordered=sorted((r.lo(z),r.hi(z)) for z,_ in pieces);edge=r.lo(w)
    for le,ri in ordered:
        assert le<=edge,'source-piece gap';edge=max(edge,ri)
    assert edge>=r.hi(w)
    states=[tr.state(j,S([win,1]),reg) for win,reg in pieces]
    q=[[hull([st[d][axis].c[0] for st in states]) for axis in range(3)] for d in range(3)]
    jerk=[hull([st[2][axis].c[1] for st in states]) for axis in range(3)]
    return q,jerk

def previous(records,j,w):
    if r.hi(w)<=0:return [I(0)]*3
    edge=max(mp.mpf(0),r.lo(w));end=r.hi(w);found=[]
    for rec in records:
        if rec['right']<edge or rec['left']>end:continue
        assert rec['left']<=edge,'completed-error gap'
        found.append(rec['errors'][j]);edge=max(edge,rec['right'])
        if edge>=end:break
    assert found and edge>=end,'uncompleted source window'
    return [I(max(r.hi(z[d]) for z in found)) for d in range(3)]

def geometry(tr,k,row,records,cap,terminal=15):
    left=tr.times[k];right=min(tr.times[k+1],mp.mpf(terminal));T=iv.mpf([left,right]);dt=I(right)-I(left);rad=dt/2
    assert right>left
    state=[tr.state(i,S([T]),('poly',k)) for i in range(4)];members=[]
    for i in range(4):
        x=[q.c[0]+sym(cap) for q in state[i][0]];u=[q.c[0]+sym(cap) for q in state[i][1]]
        assert r.hi(r.normi(u))<mp.mpf('.6'),'receiver speed tube'
        A=matzero();B=matzero();forcing=I(0);hits=[]
        assert set(row['rootMid'][i])=={str(j) for j in range(4) if j!=i}
        for j in range(4):
            if i==j:continue
            root=I(row['rootMid'][i][str(j)])
            wc=root+sym(4*rad+cap/I('.4'));ws=root+sym(4*rad+2*cap/I('.4'))
            assert r.hi(ws)<left,'positive completed delay'
            sq,jj=source(tr,j,wc);R=T-wc;nn=[(x[d]-sq[0][d])/R for d in range(3)]
            D=1-r.dot(nn,sq[1]);assert r.lo(R)>0 and r.lo(D)>0
            assert r.hi(r.normi(sq[1]))<mp.mpf('.6')
            AA,BB=a.matrices(R,nn,sq[1],sq[2],jj,u);sg=(-1)**(i+j)
            A=[[A[d][e]+sg*AA[d][e] for e in range(3)] for d in range(3)]
            B=[[B[d][e]+sg*BB[d][e] for e in range(3)] for d in range(3)]
            errors=previous(records,j,ws);sq,jj=source(tr,j,ws)
            qp=[[q+sym(errors[d]) for q in sq[d]] for d in range(3)]
            RR=T-ws;ns=[(x[d]-qp[0][d])/RR for d in range(3)]
            DD=1-r.dot(ns,qp[1]);assert r.lo(RR)>0 and r.lo(DD)>0
            assert r.hi(r.normi(qp[1]))<mp.mpf('.6'),'completed-source speed tube'
            if any(r.hi(e)>0 for e in errors):
                pr=m.partials(RR,ns,qp[1],qp[2],u)
                px=(pr[0]+2*pr[1]/I(r.lo(RR))+pr[2]*r.normi(sq[2])+pr[3]*r.normi(jj))/I('.4')
                f=px*errors[0]+pr[2]*errors[1]+pr[3]*errors[2]
            else:f=I(0)
            forcing+=f
            hits.append({'source':j,'window':[r.out(ws,False),r.out(ws)],'rangeLower':r.out(RR,False),'DLower':r.out(DD,False),'sourceErrors':[r.out(e) for e in errors],'contribution':r.out(f)})
        gamma=I(1)/16
        mu=upper(a.norm([[A[d][e]+(gamma if d==e else 0) for e in range(3)] for d in range(3)])/(2*iv.sqrt(gamma)))
        members.append({'mu':mu,'lx':upper(a.norm(A)),'lu':upper(a.norm(B)),'past':upper(forcing),'hits':hits,'A':A,'B':B})
    return left,right,dt,members

def propagate(old,mu,dt,forcing):
    if r.hi(mu)==0:return upper(old+dt*forcing)
    ex=iv.exp(mu*dt)
    return upper(ex*old+(ex-1)/mu*forcing)

class Run:
    def __init__(self,tr,cap='1e-3'):
        self.tr=tr;self.cap=I(cap);self.records=[];self.radii=[I(0)]*4
    def seed(self):
        errors=[I('1.308e-11'),I('3.270e-12'),I('3.352e-10')]
        assert r.hi(iv.sqrt(errors[0]**2/16+errors[1]**2))<mp.mpf('5e-12')
        for k in range(3):self.records.append({'left':self.tr.times[k],'right':self.tr.times[k+1],'errors':[errors[:] for _ in range(4)]})
        self.radii=[I('5e-12')]*4
    def advance(self,k,row):
        assert k==len(self.records),'receiving gap'
        left,right,dt,geo=geometry(self.tr,k,row,self.records,self.cap)
        for key,val in [('left',left),('right',right)]:assert r.lo(I(row[key]))<=val<=r.hi(I(row[key]))
        assert not self.records or self.records[-1]['right']==left
        result=[];errors=[];radii=[]
        for i,g in enumerate(geo):
            f=g['past']+I(row['memberRho'][i]);w=propagate(self.radii[i],g['mu'],dt,f);x=upper(4*w);v=w;acc=upper(g['lx']*x+g['lu']*v+f)
            assert r.hi(x)<r.lo(self.cap) and r.hi(v)<r.lo(self.cap),'error cap'
            errors.append([x,v,acc]);radii.append(w)
            result.append({'mu':r.out(g['mu']),'lx':r.out(g['lx']),'lu':r.out(g['lu']),'past':r.out(g['past']),'residual':row['memberRho'][i],'radius':r.out(w),'errors':[r.out(x),r.out(v),r.out(acc)],'hits':g['hits']})
        self.records.append({'left':left,'right':right,'errors':errors});self.radii=radii
        return {'segment':k,'left':r.out(I(left),False),'right':r.out(I(right)),'members':result}

class Static:
    points=[[1,0,0],[0,1,0],[-1,0,0],[0,-1,0]]
    times=[mp.mpf(0),mp.mpf('.001')]
    def state(self,i,t,reg):return ([t.co(q) for q in self.points[i]],[t.co(0)]*3,[t.co(0)]*3)
    def windows(self,w):return [(w,('circle',0))]

def known():
    tr=Static();mid=I('.0005');roots=[{str(j):[r.out(mid-r.normi([I(x-y) for x,y in zip(tr.points[i],tr.points[j])]),False),r.out(mid-r.normi([I(x-y) for x,y in zip(tr.points[i],tr.points[j])]))] for j in range(4) if j!=i} for i in range(4)]
    row={'rootMid':roots,'memberRho':['0']*4}
    _,_,_,geo=geometry(tr,0,row,[],I(0))
    for i,g in enumerate(geo):
        expected=matzero()
        for j in range(4):
            if i==j:continue
            z=[I(x-y) for x,y in zip(tr.points[i],tr.points[j])];R=r.normi(z);n=[q/R for q in z]
            expected=[[expected[d][e]+(-1)**(i+j)*((1 if d==e else 0)-3*n[d]*n[e])/R**3 for e in range(3)] for d in range(3)]
        assert all(r.lo(g['A'][d][e])<=r.hi(expected[d][e]) and r.hi(g['A'][d][e])>=r.lo(expected[d][e]) for d in range(3) for e in range(3))
        assert r.hi(g['past'])==0
    assert r.lo(propagate(I(1),I(0),I(2),I(3)))<=7<=r.hi(propagate(I(1),I(0),I(2),I(3)))
    expected=2*iv.exp(1)-1;got=propagate(I(1),I(1),I(1),I(1));assert r.hi(got)>=r.lo(expected)
    records=[{'left':mp.mpf(0),'right':mp.mpf(1),'errors':[[I(1),I(2),I(3)]]*4}]
    assert [r.hi(q) for q in previous(records,0,iv.mpf([-.5,.5]))]==[1,2,3]
    try:previous(records,0,iv.mpf([0,2]))
    except AssertionError:pass
    else:raise AssertionError('uncompleted window accepted')
    class Gap(Static):
        def windows(self,w):return [(iv.mpf([r.lo(w),r.lo(w)]),('circle',0))]
    try:source(Gap(),0,iv.mpf([0,1]))
    except AssertionError:pass
    else:raise AssertionError('piece gap accepted')
    # Generated static source with independent nonzero acceleration discrepancy.
    class Generated(Static):times=[mp.mpf(4),mp.mpf('4.001')]
    tr=Generated();roots=[{str(j):[r.out(I('4.0005')-r.normi([I(x-y) for x,y in zip(tr.points[i],tr.points[j])]),False),r.out(I('4.0005')-r.normi([I(x-y) for x,y in zip(tr.points[i],tr.points[j])]))] for j in range(4) if j!=i} for i in range(4)]
    rec=[{'left':mp.mpf(0),'right':mp.mpf(4),'errors':[[I(0),I(0),I('1e-8')]]*4}]
    _,_,_,gg=geometry(tr,0,{'rootMid':roots},rec,I(0));expected=(iv.sqrt(2)+I(1)/2)*I('1e-8')
    assert all(r.hi(z['past'])>=r.lo(expected) and r.hi(z['past'])<2*r.hi(expected) for z in gg)
    out={'passed':True,'instrumentSha256':sha(pathlib.Path(__file__)),'time':datetime.now(timezone.utc).isoformat(),'controls':['12 static-square analytic current Jacobians','zero completed-source defect','constant and exponential comparison solutions','full positive source coverage and missing-tail rejection','source-piece gap rejection','12 generated-source acceleration discrepancies with exact sum sqrt2+1/2']}
    assert not KNOWN.exists();KNOWN.write_text(json.dumps(out,indent=2));print(json.dumps(out),flush=True)

def target(args):
    assert json.loads(KNOWN.read_text())['instrumentSha256']==sha(pathlib.Path(__file__))
    assert sha(m.SOURCE)==m.SOURCE_SHA and not OUT.exists()
    start=time.monotonic();tr=m.Trial(json.loads(m.SOURCE.read_text()));run=Run(tr);run.seed();offset=0;digest=hashlib.sha256();cells=hashlib.sha256();seen=0;header=None;footer=None;failure=None;status='stopped';last=time.monotonic();inode=None
    def emit(obj):
        with OUT.open('a') as f:f.write(json.dumps(obj,separators=(',',':'))+'\n')
        assert OUT.stat().st_size<32*1024**2
    try:
        while not STOP and time.monotonic()-start<args.deadline and datetime.now(timezone.utc)<datetime(2026,10,6,10,25,tzinfo=timezone.utc):
            rss=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss*(1 if sys.platform=='darwin' else 1024);assert rss<2*1024**3
            if not STREAM.exists():time.sleep(.5);continue
            st=STREAM.stat();assert st.st_size>=offset
            if inode is None:inode=st.st_ino
            assert st.st_ino==inode
            with STREAM.open('rb') as f:f.seek(offset);line=f.readline()
            if not line.endswith(b'\n'):
                if time.monotonic()-last>30:print(json.dumps({'phase':'await independent residual','seen':seen,'elapsed':time.monotonic()-start}),flush=True);last=time.monotonic()
                time.sleep(.5);continue
            obj=json.loads(line);offset+=len(line);digest.update(line)
            if header is None:
                assert obj['kind']=='header' and obj['instrumentSha256']==PIN and obj['sourceSha256']==m.SOURCE_SHA and obj['terminal']=='15'
                assert obj['selectedSegments']==[k for k,t in enumerate(tr.times[:-1]) if t<15]
                assert mp.mpf(obj['trialBounds']['speed'])+mp.mpf('.001')<mp.mpf('.6') and mp.mpf(obj['preparation']['pastSpeed'][1])<mp.mpf('.6')
                header=obj;emit({'kind':'header','instrumentSha256':sha(pathlib.Path(__file__)),'inputHeaderSha256':hashlib.sha256(line).hexdigest(),'seed':'independent conservative3cell','cap':'1e-3','gamma':'1/16'});continue
            if obj['kind']=='footer':
                assert obj['cellCount']==seen and obj['rowsSha256']==cells.hexdigest();footer=obj;status='completed' if obj['terminal']=='completed' else 'source stopped';break
            assert obj['kind']=='cell' and obj['segment']==seen;cells.update(line)
            if seen>=3:
                result=run.advance(seen,obj['row']);emit({'kind':'cell','inputLineSha256':hashlib.sha256(line).hexdigest(),'row':result})
                top=max(r.hi(e[0]) for e in run.records[-1]['errors'])
                if run.records[-1]['left']<=12<=run.records[-1]['right'] and top<mp.mpf('.00005988028'):
                    status='time12 comparison certified';seen+=1;break
                if top>=mp.mpf('.00043990155'):status='observable budget exhausted';seen+=1;break
            else:emit({'kind':'seedInput','segment':seen,'inputLineSha256':hashlib.sha256(line).hexdigest()})
            seen+=1
            if time.monotonic()-last>30:print(json.dumps({'phase':'independent error prefix','seen':seen,'face':str(run.records[-1]['right']),'position':r.out(max((e[0] for e in run.records[-1]['errors']),key=r.hi)),'elapsed':time.monotonic()-start}),flush=True);last=time.monotonic()
    except Exception as exc:status='failed';failure=type(exc).__name__+': '+str(exc)
    if STREAM.exists():
        with STREAM.open('rb') as f:assert hashlib.sha256(f.read(offset)).hexdigest()==digest.hexdigest()
    emit({'kind':'footer','status':status,'failure':failure,'inputBytes':offset,'inputSha256':digest.hexdigest(),'seen':seen,'lastProvedFace':str(run.records[-1]['right']),'lastErrors':[[r.out(e) for e in member] for member in run.records[-1]['errors']],'producerFooter':footer,'elapsed':time.monotonic()-start})
    print(json.dumps({'status':status,'failure':failure,'output':str(OUT),'sha256':sha(OUT)}),flush=True)
    if status=='failed':raise SystemExit(2)
if __name__=='__main__':
    ap=argparse.ArgumentParser();ap.add_argument('--known',action='store_true');ap.add_argument('--deadline',type=float,default=12000);args=ap.parse_args();known() if args.known else target(args)
