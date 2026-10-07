"""Bounded three-cell current-tube pilot; no forward trajectory integration."""
from pathlib import Path
import importlib.util,hashlib,json,sys,time,resource,signal
from datetime import datetime,timezone
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[4]
LOCAL=ROOT/'.local-data/master-equation-closure/braid-program/authorized-cases-ten-hour'
FILES={
 'prop':('authorized-cases-ten-hour-e-propagation.py','a1b850177383f0aa2fff17e6014b9e3305f9240010b33a25c8b480b0533284ba'),
 'trial':('authorized-cases-ten-hour-e-trial-v2.py','e4d089f42cc64b74ff100031d0d45ce081acca7515d5cce8ac2cb12fab897528')}
mods={}
for key,(name,digest) in FILES.items():
    p=HERE/name;assert hashlib.sha256(p.read_bytes()).hexdigest()==digest
    spec=importlib.util.spec_from_file_location('e_pilot_'+key,p);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);mods[key]=m
p,tr=mods['prop'],mods['trial'];I,iv,mp,J=tr.I,tr.iv,tr.mp,tr.J
lower,upper,bound=p.lower,p.upper,p.bound
TRIAL=ROOT/'.local-data/master-equation-closure/braid-program/maxwell-shaped-overnight/ring-full-plus1e4-h0025.history.json'
TRIAL_SHA='ef83cb8910090bf4c7179ebef65986c8895bb0d693e1a50bc5099a018393e193'
RESIDUAL=LOCAL/'e-residual-pilot-v2.json'
RESIDUAL_SHA='bfeb9af7ba32dbac66ffed3a9ee5839d24a6cde98c62394ee9239a89c5859923'
KNOWN=HERE/'authorized-cases-ten-hour-e-propagation-pilot-known.json'
STOP=False

def stop(sig,frame):
    global STOP;STOP=True
for sig in (signal.SIGINT,signal.SIGTERM):signal.signal(sig,stop)
def sha(path):return hashlib.sha256(path.read_bytes()).hexdigest()
def ball(x,cap):return [a+iv.mpf([-upper(cap),upper(cap)]) for a in x]
def norm(v):return iv.sqrt(sum((a**2 for a in v),I(0)))
def coefficients(trial,k,Tbox,roots,xcap,vcap):
    width=I(upper(Tbox))-I(lower(Tbox));rad=width/2
    values=[trial.state(i,J([Tbox,I(1)]),('poly',k)) for i in range(4)]
    xx=[[a.c[0] for a in q[0]] for q in values]
    uu=[[a.c[0] for a in q[1]] for q in values]
    speed=p.max_upper([norm(v) for v in uu])+vcap
    assert upper(speed)<mp.mpf('.6'),'current speed bootstrap failed'
    separation=min([norm(p.vs(xx[i],p.neg(xx[j])))-2*xcap for i in range(4) for j in range(i)],key=lower)
    assert lower(separation)>0
    output=[];allR=[];allD=[];allS=[]
    for i in range(4):
        rows=[];signs=[]
        for j in range(4):
            if i==j:continue
            Smid=I(roots[i][str(j)])
            reach=4*rad+xcap/I('.4')
            Sbox=Smid+iv.mpf([-upper(reach),upper(reach)])
            assert upper(Sbox)<0 and trial.region(Sbox)==('circle',0),'pilot source left old circles'
            sx,sv,sa=trial.state(j,J([Sbox,I(1)]),('circle',0))
            R=Tbox-Sbox;assert lower(R)>0
            n=[(x-y.c[0])/R for x,y in zip(ball(xx[i],xcap),sx)]
            row=p.jacobian(R,n,[v.c[0] for v in sv],[a.c[0] for a in sa],[a.c[1] for a in sa],ball(uu[i],vcap))
            assert lower(row['D'])>0
            allR.append(R);allD.append(row['D']);allS.append(Sbox)
            rows.append(row);signs.append((-1)**(i+j))
        A,B=p.signed_sum(rows,signs)
        c=p.block_coefficients(A,B,I(1)/16)
        output.append((c,A,B))
    return output,{'actualSpeedUpper':bound(speed)[1],'actualSeparationLower':bound(separation)[0],
                   'auxRangeLower':bound(min(allR,key=lower))[0],'auxDenominatorLower':bound(min(allD,key=lower))[0],
                   'latestSourceUpper':bound(max(allS,key=upper))[1]}

def known():
    positions=[[1,0,0],[0,1,0],[-1,0,0],[0,-1,0]]
    class Static:
        def state(self,i,T,region=None):return ([J(q,T.n) for q in positions[i]],[J(0,T.n)]*3,[J(0,T.n)]*3)
        def region(self,S):return ('circle',0)
    T=iv.mpf(['0','.001']);mid=I('.0005');roots=[]
    for i in range(4):
        roots.append({str(j):bound(mid-norm([I(a-b) for a,b in zip(positions[i],positions[j])])) for j in range(4) if i!=j})
    rows,margins=coefficients(Static(),0,T,roots,I('1e-6'),I('1e-6'))
    a=1/(2*iv.sqrt(2));expected=[a-I(1)/4,a+I(1)/8,I(1)/8-1/iv.sqrt(2)]
    A=rows[0][1]
    for i in range(3):
        for j in range(3):
            e=expected[i] if i==j else I(0)
            assert lower(A[i][j])<=lower(e) and upper(A[i][j])>=upper(e)
    assert mp.mpf(margins['latestSourceUpper'])<0
    assert mp.mpf(margins['actualSeparationLower'])>mp.mpf('1.4')
    report={'passed':True,'time':datetime.now(timezone.utc).isoformat(),'instrumentSha256':sha(Path(__file__)),
            'cases':['all12 stationary-square tube roots','signed static-square exact receiver matrix','wholecell source window and separation margins'],
            'scope':'Geometry wrapper controls only; no retained target read'}
    KNOWN.write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report,indent=2))

def target():
    known=json.loads(KNOWN.read_text());assert known['passed'] and known['instrumentSha256']==sha(Path(__file__))
    assert sha(TRIAL)==TRIAL_SHA and sha(RESIDUAL)==RESIDUAL_SHA
    residual=json.loads(RESIDUAL.read_text());assert residual['terminal']=='completed' and residual['cellCount']==3
    assert mp.mpf(residual['trialBounds']['speed'])<mp.mpf('.6')
    started=time.monotonic();print(json.dumps({'phase':'load exact trial','elapsed':0}),flush=True)
    trial=tr.Trial(TRIAL)
    def rss():return resource.getrusage(resource.RUSAGE_SELF).ru_maxrss*(1 if sys.platform=='darwin' else 1024)
    assert rss()<1024**3,'one GiB budget exceeded'
    radii=[I(0)]*4;xcap=I('1e-6');vcap=I('1e-6');results=[]
    for k,row in enumerate(residual['rows']):
        if STOP or time.monotonic()-started>60:break
        left,right=I(row['left']),I(row['right'])
        # The imported cells correspond exactly to these retained binary times.
        assert lower(left)<=trial.times[k]<=upper(left) and lower(right)<=trial.times[k+1]<=upper(right)
        Tbox=iv.mpf([lower(left),upper(right)]);width=right-left
        coeff,margins=coefficients(trial,k,Tbox,row['rootMid'],xcap,vcap)
        outputs=[]
        for i,(c,A,B) in enumerate(coeff):
            out=p.step(radii[i],I(row['memberRho'][i]),width,c)
            assert upper(out['position'])<lower(xcap) and upper(out['velocity'])<lower(vcap),'bootstrap cap failed'
            radii[i]=out['radius']
            outputs.append({'coefficients':{name:bound(v) for name,v in c.items()},'errors':{name:bound(v) for name,v in out.items()},
                            'Jx':[[bound(v) for v in line] for line in A],'Ju':[[bound(v) for v in line] for line in B]})
        assert rss()<1024**3,'one GiB budget exceeded'
        results.append({'cell':k,'left':row['left'],'right':row['right'],'margins':margins,'members':outputs})
        print(json.dumps({'phase':'cell complete','cell':k,'elapsed':time.monotonic()-started,'peakRSS':rss()}),flush=True)
    result={'terminal':'completed' if len(results)==3 else 'stopped','time':datetime.now(timezone.utc).isoformat(),
            'claim':'directed three-cell actual-error propagation subject; independent output assessment required; no departure claim',
            'instrumentSha256':sha(Path(__file__)),'sourceSha256':TRIAL_SHA,'residualSha256':RESIDUAL_SHA,
            'caps':{'position':'1e-6','velocity':'1e-6'},'gamma':'1/16','initialErrors':'zero by exact preparation identity',
            'sourceErrors':'zero: all source windows remain in identical supplied old circles','cells':results,
            'wallSeconds':time.monotonic()-started,'peakRSS':rss()}
    path=LOCAL/'e-propagation-pilot.json';path.write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps({'terminal':result['terminal'],'output':str(path),'sha256':sha(path)}),flush=True)
if __name__=='__main__':
    if sys.argv[1:]==['--known']:known()
    elif sys.argv[1:]==['--target']:target()
    else:raise SystemExit('Use --known or separately admitted --target')
