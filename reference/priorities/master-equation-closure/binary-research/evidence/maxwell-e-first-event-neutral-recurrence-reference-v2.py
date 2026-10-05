"""Separately authored exact scalar r/p comparison, q conversion, physical A,
complete nonmonotone source census and direct angular-history audit.
Coefficient-family mathematics is the independently assessed theorem/source;
this reference audits recurrence, stored full-history obligations, not their AD.
"""
import argparse,hashlib,importlib.util,json,time
from fractions import Fraction as Q
from pathlib import Path
p=Path(__file__).with_name('maxwell-e-first-event-directional-recurrence-reference.py');sp=importlib.util.spec_from_file_location('frozen_directional_neutral',p);prior=importlib.util.module_from_spec(sp);sp.loader.exec_module(prior)
def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def ceil(q):q=Q(q);scale=10**24;return Q((q.numerator*scale+q.denominator-1)//q.denominator,scale)
def terms(b,src,geo,psi,delta,bc,ra,rc):
    Cq,Vq,CH,UH,VH,AH,Pc=map(Q,[b[k] for k in ['Cq','Vq','CH','UH','VH','AH','Pc']]);sr,sv,sa=map(Q,src);Rs,Vs,As=map(Q,geo);psi,delta,bc,ra,rc=map(Q,[psi,delta,bc,ra,rc]);assert min(Cq,Vq,CH,UH,VH,AH,Pc,sr,sv,sa,Rs,Vs,As,psi,delta,bc)>=0 and min(ra,rc)>0
    fq=Cq*(sr+Rs*psi)+Vq*(sv+Vs*psi);fH=delta+CH*(sr+Rs*psi)+VH*(sv+Vs*psi)+AH*(sa+As*psi);L=UH+Pc/ra
    return dict(fq=fq,fH=fH,L=L,m00=Cq,m01=Q(1),m10=CH+L*Cq+Pc*bc/(ra*rc),m11=L,f0=fq,f1=fH+L*fq)
def flow(r,p,c,dt):
    a=1-dt*c['m00'];d=1-dt*c['m11'];det=a*d-dt*dt*c['m01']*c['m10'];assert min(a,d,det)>0
    b0=r+dt*c['f0'];b1=p+dt*c['f1'];return (d*b0+dt*c['m01']*b1)/det,(dt*c['m10']*b0+a*b1)/det,det
def known():
    c=dict(m00=Q(0),m01=Q(1),m10=Q(0),m11=Q(0),f0=Q(0),f1=Q(0));assert flow(Q(2),Q(3),c,Q('1/5'))==(Q('13/5'),Q(3),Q(1));b=dict(zip(['Cq','Vq','CH','UH','VH','AH','Pc'],map(Q,[1,2,3,4,5,6,2])));z=terms(b,['1/10','1/5','3/10'],[7,8,9],'1/100','1/20',3,4,5);assert z['fq']==Q('73/100') and z['fH']==Q('43/10') and z['L']==Q('9/2');assert ceil(Q(1,3))>=Q(1,3) and ceil(0)==0
    try:flow(Q(1),Q(1),dict(c,m00=Q(10)),Q('1/5'))
    except AssertionError:pass
    else:raise AssertionError('nonpositive inverse accepted')
    times=list(map(Q,[0,1,2]));errors=[dict(omega=Q(0)),dict(omega=Q('1/10')),dict(omega=Q('1/5'))];assert angular(times,errors,Q('1/2'),2,0,Q('2/5'))==Q('1/4') and angular(times,errors,Q('-1/2'),2,0,Q('2/5'))==Q('1/2') and angular(times,errors,Q('1/2'),Q('5/2'),Q('3/10'),Q('2/5'))==Q('2/5');return dict(passed=True,prior=prior.known(),zeroReceivingAngularControls='1/4,1/2 plus receiving2/5',cases=['exact triangular comparison13/5,3','complete transformed source forcing73/100,43/10,L9/2','outward grid0/1over3','nonpositive inverse rejected'])
def source(times,errors,past,initial,window):
    lo,hi=map(Q,[window['lo'],window['hi']]);assert -6<lo<=hi<times[-1];bins=prior.selected(times,lo,hi);out=[]
    for k in ['r','u','a']:
        vals=[errors[i][k] for i in bins]
        if lo<=0:vals.extend([past[k],initial[k]])
        assert vals;out.append(max(vals))
    return lo,hi,bins,out
def angular(times,errors,lo,end,current,past):
    lo,end,current,past=map(Q,[lo,end,current,past]);assert -6<lo<=times[-1]<=end and min(current,past)>=0
    value=max(Q(0),-lo)*past
    for j in range(1,len(times)):
        value+=max(Q(0),times[j]-max(times[j-1],lo))*errors[j]['omega']
    return value+(end-times[-1])*current
def analyze(path):
    r=json.loads(Path(path).read_text());assert r['knownFirst']['passed'];assert sha(r['input'])==r['inputSHA'] and sha(r['defects'])==r['defectSHA'];assert r['actualCensusPremise'].startswith('conditional no-prior-unit event');prefix=json.loads(Path(r['prefix']).read_text());prefixrows=list(map(json.loads,Path(r['prefix']+'.jsonl').read_text().splitlines()));rows=list(map(json.loads,Path(path+'.jsonl').read_text().splitlines()));assert rows[:len(prefixrows)]==prefixrows and len(rows)==r['bins'];assert sha(r['prefix'])==r['prefixSHA'] and sha(r['prefix']+'.jsonl')==r['prefixRowsSHA'];tr=json.loads(Path(r['transferAudit']).read_text());assert sha(r['transferAudit'])==r['transferAuditSHA'] and tr['target']['passed'] and tr['target']['subjectSHA']==r['prefixSHA'] and tr['target']['rowsSHA']==r['prefixRowsSHA'];initial={k:Q(v) for k,v in r['initialIntrinsic'].items()};past={k:Q(v) for k,v in r['pastIntrinsic'].items()};pw=Q(r['pastOmega']);times=[Q(0)];errors=[dict(initial,omega=Q(0))]
    for row in prefixrows:times.append(Q(row['t']));errors.append({k:Q(row[k]) for k in ['r','u','a','omega']})
    assert times[-1]==Q(r['conditionalStart']);p0=r['transformedInitial'];lo,hi,bins,src=source(times,errors,past,initial,p0['S']);assert bins==p0['sourceBins'] and src==list(map(Q,p0['sourceIntrinsic']));psi=angular(times,errors,lo,times[-1],Q(0),pw);assert psi==Q(p0['psi']);Cq,Vq=map(Q,[p0['Cq'],p0['Vq']]);Rs,Vs,_=map(Q,p0['sourceGeometry']);fq=Cq*(src[0]+Rs*psi)+Vq*(src[1]+Vs*psi);qe=Cq*errors[-1]['r']+fq;assert fq==Q(p0['fq']) and qe==Q(p0['qError']) and Q(p0['physicalU'])==errors[-1]['u'];pr=errors[-1]['r'];pp=ceil(errors[-1]['u']+qe);assert pp==Q(p0['p']);defs=list(map(json.loads,Path(r['defects']).read_text().splitlines()));defs=[dict(d,left=str(max(Q(d['left']),times[-1]))) for d in defs if Q(d['right'])>times[-1]];started=time.monotonic();last=started;minDet=None
    for j,row in enumerate(rows[len(prefixrows):]):
        end=Q(row['t']);dt=end-times[-1];d=defs[j];assert Q(d['left'])==times[-1] and min(Q(d['right']),Q(r['horizon']))==end and Q(d['bound'])==Q(row['delta']);assert Q(row['previousR'])==pr and Q(row['previousP'])==pp;lo,hi,bins,src=source(times,errors,past,initial,row['S']);assert bins==row['sourceBins'] and src==list(map(Q,row['sourceIntrinsic']));psi=angular(times,errors,lo,end,Q(row['trialOmega']),pw);assert psi==Q(row['psi']);g=row['receiverGeometry'];rc,ra,bc=map(Q,[g[k] for k in ['rComparison','rTrialActual','speed']]);er,ep,eu=map(Q,[row[k] for k in ['trialR','trialP','trialU']]);assert ra==rc-er>0;assert Q(row['trialOmega'])>=eu/ra+bc*er/(ra*rc);c=terms(row['fieldBounds'],src,row['sourceGeometry'],psi,row['delta'],bc,ra,rc);assert c=={k:Q(v) for k,v in row['transformedCoefficients'].items()};rr,rp,det=flow(pr,pp,c,dt);assert dict(r=rr,p=rp,det=det)=={k:Q(v) for k,v in row['rawFlow'].items()} and det==Q(row['inverseDet']);minDet=det if minDet is None else min(minDet,det);ru=rp+Q(row['fieldBounds']['Cq'])*rr+c['fq'];assert ru==Q(row['physicalU']) and rr<er and rp<ep and ru<eu;E=row['originalE'];assert E['S']==row['S'];Rs,Vs,As=map(Q,row['sourceGeometry']);ea=Q(E['Cx'])*(rr+src[0]+Rs*psi)+Q(E['Hv'])*(src[1]+Vs*psi)+Q(E['B'])*(src[2]+As*psi)+Q(row['delta']);assert ea==Q(row['physicalA']);stored=[ceil(x) for x in [rr,rp,ru,ea]];assert stored==[Q(row[k]) for k in ['r','p','u','a']];assert Q(row['ur'])==Q(row['ut'])==stored[2] and Q(row['ar'])==Q(row['at'])==stored[3];omega=ru/(rc-rr)+bc*rr/((rc-rr)*rc);assert Q(row['omega'])==ceil(omega);assert Q(row['angularPrefix'])==Q(rows[len(prefixrows)+j-1]['angularPrefix'])+dt*Q(row['omega']);guard=row['proposedSource'];assert -6<Q(guard['lo'])<=lo<=hi<=Q(guard['hi'])<times[-1];pr,pp=stored[:2];times.append(end);errors.append(dict(r=stored[0],u=stored[2],a=stored[3],omega=Q(row['omega'])));
        if time.monotonic()-last>=30:print(json.dumps(dict(event='neutral-reference-heartbeat',cells=j+1,t=float(end))),flush=True);last=time.monotonic()
    assert times[-1]==Q(r['final']['t']);return dict(passed=True,subjectSHA=sha(path),rowsSHA=sha(path+'.jsonl'),cells=len(rows),continuedCells=len(rows)-len(prefixrows),end=str(times[-1]),minimumInverseDet=str(minDet),wallSeconds=time.monotonic()-started,scope='independent exact r/p recurrence and physicalU/A conversion, complete source/history and direct angular census; AD coefficient-family mathematical authority remains separate parent assessment; geometry/domain separate audit; no actual event')
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--receipt');p.add_argument('--output',required=True);a=p.parse_args();out=dict(knownFirst=known());print(json.dumps(out),flush=True)
    if a.receipt:out['target']=analyze(a.receipt)
    with Path(a.output).open('x') as f:json.dump(out,f,indent=2);f.write('\n')
    print(json.dumps(out),flush=True)
