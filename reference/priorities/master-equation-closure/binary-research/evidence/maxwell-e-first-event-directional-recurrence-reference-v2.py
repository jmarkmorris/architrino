"""V2 preserves raw improvement metadata and rounded stored strict witnesses. Independent directional intrinsic-history/angular-integral recurrence audit.

The mathematical reference is the fixed-rotation covariance and skew-frame
proof, plus an independently solved constant-coefficient comparison equation.
No subject module is imported; frozen Gaussian/potential references stay unchanged.
This audits arithmetic and support, not an unassessed physical root/field family.
"""
import argparse,bisect,hashlib,importlib.util,json,time
from fractions import Fraction as Q
from math import isqrt
from pathlib import Path
p=Path(__file__).with_name('maxwell-shaped-overnight-independent-adaptive-test-check.py')
s=importlib.util.spec_from_file_location('frozen_math',p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
iv=m.iv;IQ=m.IQ

def column_upper(matrix,direction):
    values=[]
    for row in matrix:
        low=high=Q(0)
        for x,y in zip(row,direction):
            products=[Q(x[a])*Q(y[b]) for a in ['lo','hi'] for b in ['lo','hi']]
            low+=min(products);high+=max(products)
        values.append(max(abs(low),abs(high)))
    square=sum(x*x for x in values);scale=10**40
    n=isqrt(square.numerator*scale*scale//square.denominator)
    return Q(n+1,scale)

def column_known():
    box=lambda x:dict(lo=str(x),hi=str(x))
    matrix=[[box('.25'),box(0)],[box(0),box('-.125')]]
    for direction,expected in [([0,1],Q('1/8')),([1,0],Q('1/4'))]:
        upper=column_upper(matrix,list(map(box,direction)));assert expected<=upper<expected+Q('1e-30')
    C,Cs,psi,sr,su,sa,r,b,a,H,B,de=map(Q,['.5','.2','.1','.1','.2','.3','2','3','4','.3','.4','.01'])
    sourceRadial=min(C,Cs+C*psi)
    force=de+sourceRadial*sr+C*r*psi+H*(su+b*psi)+B*(sa+a*psi)
    assert sourceRadial==Q('1/4') and force==Q('113/200')
    return dict(passed=True,cases=['independent exact static columns1/8 and1/4','independent complete radial phase/forcing113/200'])

def comparison(x,v,C,U,F,h):
    x,v,C,U,F,h=map(IQ,[x,v,C,U,F,h])
    if C.a==C.b==0:
        if U.a==U.b==0:return x+h*v+F*h*h/2,v+F*h
        ep=iv.exp(U*h);return x+(v+F/U)*(ep-1)/U-F*h/U,(v+F/U)*ep-F/U
    half=U/2;lam=iv.sqrt(C+half*half);ep=iv.exp(lam*h);em=iv.exp(-lam*h);ch=(ep+em)/2;sh=(ep-em)/2;growth=iv.exp(half*h)
    offset=x+F/C
    return growth*(offset*ch+(v-half*offset)*sh/lam)-F/C,growth*(v*ch+(C*x+F+half*v)*sh/lam)

def omega(er,eu,b,ra,rc):
    assert min(er,eu,b)>=0 and min(ra,rc)>0
    return eu/ra+b*er/(ra*rc)

def selected(times,lo,hi):
    assert -6<lo<=hi<times[-1]
    first=max(1,bisect.bisect_left(times,lo));last=min(len(times)-1,bisect.bisect_right(times,hi))
    return list(range(first,last+1))

def angular(times,errors,lo,hi,trial,past):
    assert -6<lo<times[-1]<hi
    value=Q(0);coverage=Q(0)
    if lo<0:value+=(-lo)*past;coverage-=lo
    first=max(1,bisect.bisect_left(times,lo))
    for j in range(first,len(times)):
        a=max(lo,times[j-1]);b=min(hi,times[j])
        if a<b:value+=(b-a)*errors[j]['omega'];coverage+=b-a
    value+=(hi-times[-1])*trial;coverage+=hi-times[-1]
    assert coverage==hi-lo
    return value

def intrinsic(ex,ev,ea,rc,b,a):
    assert rc>0
    return dict(r=ex,u=ev+2*b*ex/rc,a=ea+2*a*ex/rc)

def known():
    raw,stored,trial=Q(1,3),Q(".333333333333333333333334"),Q(".5");assert raw<=stored<trial and trial-raw>trial-stored

    old=m.known();columns=column_known()
    x,v=comparison(1,Q('1/10'),Q('1/200'),Q('1/20'),0,1)
    exp=iv.exp(IQ('1/10'));assert x.a<=exp.a<=exp.b<=x.b and v.a<=(exp/10).a<=(exp/10).b<=v.b
    x,v=comparison(1,Q('1/5'),Q('1/200'),Q('1/20'),Q('1/200'),1)
    expected=2*exp-1;expectedv=exp/5
    assert x.a<=expected.a<=expected.b<=x.b and v.a<=expectedv.a<=expectedv.b<=v.b
    x,v=comparison(2,3,0,0,8,Q('1/2'));assert m.k.contains(x,IQ('9/2')) and m.k.contains(v,IQ(7))
    assert omega(Q('1/10'),Q('1/5'),Q(3),Q(2),Q(2))==Q('7/40')
    times=list(map(Q,[0,1,2]));errors=[dict(omega=Q(0)),dict(omega=Q('1/10')),dict(omega=Q('1/5'))]
    assert angular(times,errors,Q('-1/2'),Q('5/2'),Q('3/10'),Q('2/5'))==Q('13/20')
    assert angular(times,errors,Q('3/2'),Q('5/2'),Q('3/10'),Q('2/5'))==Q('1/4')
    assert selected(times,Q(1),Q(1))==[1,2]
    assert intrinsic(Q('1/10'),Q('1/5'),Q('3/10'),Q(2),Q(3),Q(4))==dict(r=Q('1/10'),u=Q('1/2'),a=Q('7/10'))
    return dict(passed=True,prior=old,directional=columns,cases=['independent two-by-two solution exact e^(t/10)','nonzero C/U/forcing exact 2e^(t/10)-1','nonzero quadratic forcing exact R9/2 U7','omega/intrinsic conversion exact rational cases','complete supplied/earlier/receiving angular integral and late finite-window exclusion','closed intrinsic source seam'])

def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()

def analyze(path):
    result=json.loads(Path(path).read_text())
    for p,k in [('input','inputSHA'),('defects','defectSHA'),('predecessor','predecessorSHA')]:assert sha(result[p])==result[k]
    assert sha(result['predecessor']+'.jsonl')==result['predecessorRowsSHA']
    rows=list(map(json.loads,Path(path+'.jsonl').read_text().splitlines()));old=list(map(json.loads,Path(result['predecessor']+'.jsonl').read_text().splitlines()));defects=list(map(json.loads,Path(result['defects']).read_text().splitlines()))
    assert len(rows)==result['bins']
    initial={k:Q(v) for k,v in result['initialIntrinsic'].items()};past={k:Q(v) for k,v in result['pastIntrinsic'].items()};pg={k:Q(v) for k,v in result['pastGeometry'].items()};pc=list(map(Q,result['pastCartesian']))
    assert past==intrinsic(*pc,pg['rComparison'],pg['speed'],pg['acceleration'])
    assert pg['rActual']==pg['rComparison']-past['r']
    pastomega=omega(past['r'],past['u'],pg['speed'],pg['rActual'],pg['rComparison']);assert pastomega==Q(result['pastOmega'])
    times=[Q(0)];errors=[dict(initial,omega=Q(0))];prev=initial;started=time.monotonic();last=started;mind=minr=minD=None
    for j,row in enumerate(rows):
        end=Q(row['t']);h=end-times[-1];d=defects[j];assert Q(d['left'])==times[-1] and end==min(Q(d['right']),Q(result['horizon'])) and Q(d['bound'])==Q(row['delta'])
        g={k:Q(v) for k,v in row['receiverGeometry'].items()};tr,tu=Q(row['trialR']),Q(row['trialU']);assert g['rTrialActual']==g['rComparison']-tr>0 and g['speed']+tu<1
        trialomega=omega(tr,tu,g['speed'],g['rTrialActual'],g['rComparison']);assert trialomega==Q(row['trialOmega'])
        lo,hi=Q(row['S']['lo']),Q(row['S']['hi']);bins=selected(times,lo,hi);assert bins==row['sourceBins']
        sr=[]
        for k in ['r','u','a']:
            values=[errors[b][k] for b in bins]
            if lo<=0:values.extend([past[k],initial[k]])
            assert values;sr.append(max(values))
        assert sr==list(map(Q,row['sourceIntrinsic']))
        psi=angular(times,errors,lo,end,trialomega,pastomega);assert psi==Q(row['psi'])
        w=row['proposedSource'];assert Q(w['lo'])<=lo<=hi<=Q(w['hi'])<times[-1] and Q(w['lo'])>-6
        initialpsi=angular(times,errors,Q(w['lo']),end,trialomega,pastomega);assert initialpsi==Q(row['initialPsi'])
        reach=row['initialSourceWindow'];assert Q(w['lo'])<=Q(reach['lo'])<=Q(reach['hi'])<=Q(w['hi'])
        sg=list(map(Q,row['sourceGeometry']));aligned=[a+b*psi for a,b in zip(sr,sg)];assert aligned==list(map(Q,row['alignedSource']))
        assert all(a<=b for a,b in zip(aligned,map(Q,row['expandedAlignedSource'])))
        C,Ct,Cs,H,B,delta=map(Q,[row[k] for k in ['Cx','Ct','Cs','Hv','B','delta']]);assert 0<=Ct<=C and 0<=Cs<=C;assert Ct>=min(C,column_upper(row['AX'],row['currentDirection'])) and Cs>=min(C,column_upper(row['AX'],row['sourceDirection']));sourceRadial=min(C,Cs+C*psi);assert sourceRadial==Q(row['sourceRadial']);F=delta+sourceRadial*sr[0]+C*sg[0]*psi+H*aligned[1]+B*aligned[2];assert F==Q(row['forcing']) and min(C,H,B,delta)>=0
        Cr=Ct+g['speed']**2/(g['rTrialActual']*g['rComparison']);Cu=g['speed']/g['rTrialActual'];assert Cr==Q(row['Cr']) and Cu==Q(row['Cu'])
        xr,uv=comparison(prev['r'],prev['u'],Cr,Cu,F,h);assert IQ(row['rawR']).a>=xr.b and IQ(row['rawU']).a>=uv.b
        cap=None
        if j<len(old) and Q(old[j]['t'])==end:
            cap=intrinsic(Q(old[j]['x']),Q(old[j]['v']),Q(old[j]['a']),g['rComparison'],g['speed'],g['acceleration']);assert cap=={k:Q(v) for k,v in row['oldCaps'].items()}
        else:assert row['oldCaps'] is None
        r,u,a=map(Q,[row[k] for k in ['r','u','a']])
        if cap:
            actualr=min(xr.b,IQ(cap['r']).a);actualu=min(uv.b,IQ(cap['u']).a)
            assert IQ(r).a>=actualr and IQ(u).a>=actualu
            acceleration=IQ(Ct)*iv.mpf([actualr,actualr])+IQ(F)
            assert IQ(a).a>=min(acceleration.b,IQ(cap['a']).a)
        else:
            assert IQ(r).a>=xr.b and IQ(u).a>=uv.b
            acceleration=IQ(Ct)*iv.mpf([xr.b,xr.b])+IQ(F)
            assert IQ(a).a>=acceleration.b
        acceptedRawR=min(Q(row['rawR']),cap['r']) if cap else Q(row['rawR']);acceptedRawU=min(Q(row['rawU']),cap['u']) if cap else Q(row['rawU'])
        assert r>=acceptedRawR and u>=acceptedRawU and r<tr and u<tu
        assert Q(row['improvementR'])==tr-acceptedRawR and Q(row['improvementU'])==tu-acceptedRawU
        om=omega(r,u,g['speed'],g['rComparison']-r,g['rComparison']);assert Q(row['omega'])>=om
        assert Q(row['D']['lo'])>0 and Q(row['Dclock']['lo'])>0 and Q(row['R']['lo'])>0 and Q(row['radiusLower'])>0 and Q(row['speedUpper'])<1
        md=min(tr-r,tu-u);mind=md if mind is None else min(mind,md);minr=Q(row['radiusLower']) if minr is None else min(minr,Q(row['radiusLower']));minD=Q(row['D']['lo']) if minD is None else min(minD,Q(row['D']['lo']))
        times.append(end);prev=dict(r=r,u=u,a=a,omega=Q(row['omega']));errors.append(prev)
        if time.monotonic()-last>=30:print(json.dumps(dict(event='independent-recurrence-heartbeat',bins=j+1,t=float(end))),flush=True);last=time.monotonic()
    assert times[-1]==Q(result['final']['t'])
    return dict(acceptedRecurrence=True,bins=len(rows),end=str(times[-1]),minimumStrictImprovement=str(mind),minimumRadius=str(minr),minimumD=str(minD),subjectSHA=sha(path),rowsSHA=sha(path+'.jsonl'),wallSeconds=time.monotonic()-started,scope='independently solved directional intrinsic comparison and exact complete-source/angular integral/old-cap/strict arithmetic; physical field-root family requires separate assessed proof')

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--receipt');p.add_argument('--output',required=True);args=p.parse_args();out=dict(knownFirst=known());print(json.dumps(out),flush=True)
    if args.receipt:out['target']=analyze(args.receipt)
    with Path(args.output).open('x') as f:json.dump(out,f,indent=2);f.write('\n')
    print(json.dumps(out),flush=True)
