"""Independent signed3component current algebra/PSD/lognorm/scalar flow audit.
Does not import coefficient/driver/helper subjects. Rule authority is separate
frozen subject theorem and independent mathematical derivation/review.
"""
import argparse,importlib.util,json,time
from fractions import Fraction as Q
from pathlib import Path
from math import isqrt
p=Path(__file__).with_name('maxwell-e-first-event-neutral-recurrence-reference-v2.py');sp=importlib.util.spec_from_file_location('neutral_scalar_frozen',p);base=importlib.util.module_from_spec(sp);sp.loader.exec_module(base)
iv,IQ=base.prior.iv,base.prior.IQ
sha=base.sha
B=lambda z:(Q(z['lo']),Q(z['hi']))
def add(a,b):return a[0]+b[0],a[1]+b[1]
def neg(a):return -a[1],-a[0]
def sub(a,b):return add(a,neg(b))
def mul(a,b):v=[x*y for x in a for y in b];return min(v),max(v)
def div(a,b):assert b[0]>0 or b[1]<0;return mul(a,(1/b[1],1/b[0]))
def dot(a,b):v=(Q(0),Q(0));
# Separate sum rather than relying on subject operation order.
def dot(a,b):
    v=(Q(0),Q(0))
    for x,y in zip(a,b):v=add(v,mul(x,y))
    return v
def det3(A):return A[0][0]*(A[1][1]*A[2][2]-A[1][2]*A[2][1])-A[0][1]*(A[1][0]*A[2][2]-A[1][2]*A[2][0])+A[0][2]*(A[1][0]*A[2][1]-A[1][1]*A[2][0])
def minors(A):return [A[i][i] for i in range(3)]+[A[i][i]*A[j][j]-A[i][j]*A[j][i] for i,j in [(0,1),(0,2),(1,2)]]+[det3(A)]
def sqrtupper(q,scale=10**40):q=Q(q);n=q.numerator*scale*scale;d=q.denominator;k=isqrt(n//d);return Q(k+(k*k*d<n),scale)
def enclose(outer,inner):assert outer[0]<=inner[0]<=inner[1]<=outer[1]
def signed_matrix(Qcol,Ccol,U,pc,nomV,ra,rc,nu):
    jp=[pc[1],neg(pc[0])];term=add(div(Qcol[1],ra),div(nomV[1],mul(ra,rc)));lower=[div(sub(sub(Ccol[k],dot(U[k],Qcol)),mul(jp[k],term)),(nu,nu)) for k in range(2)];pp=[[add(U[k][j],div(jp[k],ra)) if j==1 else U[k][j] for j in range(2)] for k in range(2)];return [[neg(Qcol[0]),(nu,nu),(Q(0),Q(0))],[lower[0],pp[0][0],pp[0][1]],[lower[1],pp[1][0],pp[1][1]]]
def known():
    assert min(minors([[Q(1),Q(1),Q(0)],[Q(1),Q(1),Q(0)],[Q(0),Q(0),Q(0)]]))==0 and min(minors([[Q(0),Q(1),Q(0)],[Q(1),Q(0),Q(0)],[Q(0),Q(0),Q(0)]]))<0
    z=(Q(0),Q(0));m=signed_matrix([(-1,-1),z],[(-2,-2),z],[[z,z],[z,z]],[z,z],[z,z],(1,1),(1,1),Q(1));assert m==[[(1,1),(1,1),z],[(-2,-2),z,z],[z,z,z]];assert sqrtupper(9)==3;assert sqrtupper(2)**2>=2
    cols=[dict(norm='2',radial='2',tangent='0'),dict(norm='1/2',radial='0',tangent='1/2')];src=dict(r=Q(0),ur=Q(4),ut=Q(5),ar=Q(100),at=Q(2));assert component_row(cols,src,[Q(0)]*3,Q(0),Q(0),Q(0))==9;assert cap(Q(0),Q(2),Q('1/10'))==Q('1/5');assert Q(0)/2+Q(3)*1/(2*3)==Q('1/2');assert norm30([Q(3),Q(4)])>5;assert norm30([Q('1/3'),Q(0)])>Q('1/3');return dict(passed=True,prior=base.known(),cases=['independent7principalminors rank1PSD and zero-diagonal nonPSD','exact signedQr−1/Hr−2 block','rational sqrt3/sqrt2 enclosures','scalar exp/phi validated separately by intervalexponential'])

def cap(x,n,psi):return min(n,x+n*psi)
def component_row(cols,src,geo,psi,delta,C):
    v,a=cols
    v={k:Q(x) for k,x in v.items()};a={k:Q(x) for k,x in a.items()}
    return delta+C*(src['r']+geo[0]*psi)+cap(v['radial'],v['norm'],psi)*src['ur']+cap(v['tangent'],v['norm'],psi)*src['ut']+v['norm']*geo[1]*psi+cap(a['radial'],a['norm'],psi)*src['ar']+cap(a['tangent'],a['norm'],psi)*src['at']+a['norm']*geo[2]*psi
def norm30(xs):
    q=sum(base.ceil(x)**2 for x in xs);sc=10**30;return Q(isqrt(q.numerator*sc*sc//q.denominator)+1,sc)
def projected_packet(packet,src,geo,psi,delta,C,old,hasnorm=True):
    raw=[component_row([packet['columns'][k+'V'],packet['columns'][k+'A']],src,geo,psi,delta,C) for k in ['r','t']]
    assert raw==list(map(Q,packet['raw']));values=[min(old,x) for x in raw];assert values==list(map(Q,packet['components']))
    if hasnorm:
        n=min(old,norm30(values));assert n==Q(packet['norm']);return n,values
    return None,values
KEYS=['r','u','a','ur','ut','ar','at','omega']
def complete_components(times,errors,past,initial,S,bins):
    lo,hi=map(Q,[S['lo'],S['hi']]);v={k:Q(0) for k in ['r','ur','ut','ar','at']}
    if lo<=0:
        for k in v:v[k]=max(past[k],initial[k])
    for j in bins:
        for k in v:v[k]=max(v[k],errors[j][k])
    return v

def analyze(path):
    result=json.loads(Path(path).read_text());assert result['knownFirst']['passed'];assert sha(result['input'])==result['inputSHA'] and sha(result['defects'])==result['defectSHA'];prefix=json.loads(Path(result['prefix']).read_text());prefixrows=list(map(json.loads,Path(result['prefix']+'.jsonl').read_text().splitlines()));rows=list(map(json.loads,Path(path+'.jsonl').read_text().splitlines()));assert rows[:len(prefixrows)]==prefixrows and len(rows)==result['bins'];assert sha(result['prefix'])==result['prefixSHA'] and sha(result['prefix']+'.jsonl')==result['prefixRowsSHA'];transfer=json.loads(Path(result['transferAudit']).read_text());assert sha(result['transferAudit'])==result['transferAuditSHA'] and transfer['target']['passed'] and transfer['target']['subjectSHA']==result['prefixSHA'] and transfer['target']['rowsSHA']==result['prefixRowsSHA'];initial={k:Q(v) for k,v in result['initialIntrinsic'].items()};past={k:Q(v) for k,v in result['pastIntrinsic'].items()};pw=Q(result['pastOmega']);times=[Q(0)];errors=[dict(initial,omega=Q(0))]
    for row in prefixrows:times.append(Q(row['t']));errors.append({k:Q(row[k]) for k in KEYS})
    assert times[-1]==Q(result['conditionalStart']);p0=result['transformedInitial'];lo,hi,bins,src=base.source(times,errors,past,initial,p0['S']);assert bins==p0['sourceBins'] and src==list(map(Q,p0['sourceIntrinsic']));psi=base.angular(times,errors,lo,times[-1],0,pw);assert psi==Q(p0['psi']);Cq,Vq=map(Q,[p0['Cq'],p0['Vq']]);Rs,Vs,_=map(Q,p0['sourceGeometry']);fq=Cq*(src[0]+Rs*psi)+Vq*(src[1]+Vs*psi);qe=Cq*errors[-1]['r']+fq;assert fq==Q(p0['fq']) and qe==Q(p0['qError']);pinit=base.ceil(errors[-1]['u']+qe);assert pinit==Q(p0['p']);nu=Q(result['signedInitial']['nu']);assert nu==Q(prefixrows[-1]['nu']);Wend=Q(result['signedInitial']['W']);assert Wend>=sqrtupper((nu*errors[-1]['r'])**2+pinit*pinit);defs=list(map(json.loads,Path(result['defects']).read_text().splitlines()));defs=[dict(d,left=str(max(Q(d['left']),times[-1]))) for d in defs if Q(d['right'])>times[-1]];started=time.monotonic();last=started
    for j,row in enumerate(rows[len(prefixrows):]):
        end=Q(row['t']);dt=end-times[-1];d=defs[j];assert Q(d['left'])==times[-1] and min(Q(d['right']),Q(result['horizon']))==end and Q(d['bound'])==Q(row['delta']);newnu=Q(row['nu']);previous=Wend*max(Q(1),newnu/nu);assert previous==Q(row['previousW']);lo,hi,bins,src=base.source(times,errors,past,initial,row['S']);assert bins==row['sourceBins'] and src==list(map(Q,row['sourceIntrinsic']));psi=base.angular(times,errors,lo,end,Q(row['trialOmega']),pw);assert psi==Q(row['psi']);g=row['receiverGeometry'];rc,rcmax,ra,bc=map(Q,[g[k] for k in ['rComparison','rComparisonMax','rTrialActual','speed']]);tr,tw,tu=map(Q,[row[k] for k in ['trialR','trialW','trialU']]);assert tr==tw/newnu and ra==rc-tr>0;assert Q(row['trialOmega'])>=tu/ra+bc*tr/(ra*rc);c=base.terms(row['fieldBounds'],src,row['sourceGeometry'],psi,row['delta'],bc,ra,rc);pr=row['projectedSource'];sourceparts=complete_components(times,errors,past,initial,row['S'],bins);assert [sourceparts[k] for k in ['ur','ut','ar','at']]==[Q(pr['sourceComponents'][k]) for k in ['ur','ut','ar','at']];assert c['fq']==Q(pr['oldForcing']['fq']) and c['fH']==Q(pr['oldForcing']['fH']);geo=list(map(Q,row['sourceGeometry']));fq,qparts=projected_packet(pr['q'],sourceparts,geo,psi,Q(0),Q(row['fieldBounds']['Cq']),c['fq']);fh,hparts=projected_packet(pr['H'],sourceparts,geo,psi,Q(row['delta']),Q(row['fieldBounds']['CH']),c['fH']);c['fq'],c['fH']=fq,fh;assert fq==Q(row['sourceForcing']['fq']) and fh==Q(row['sourceForcing']['fH']);k=row['signedCurrent'];qcol=list(map(B,k['Qcol']));ccol=list(map(B,k['Ccol']));U=[list(map(B,x)) for x in k['U']];pc=list(map(B,k['pc']));nv=list(map(B,k['nomV']));M=signed_matrix(qcol,ccol,U,pc,nv,(ra,rcmax+tr),(rc,rcmax),newnu);reportedM=[list(map(B,x)) for x in k['M']];reportedS=[list(map(B,x)) for x in k['S']]
        for i in range(3):
            for v in range(3):enclose(reportedM[i][v],M[i][v]);enclose(reportedS[i][v],div(add(reportedM[i][v],reportedM[v][i]),(Q(2),Q(2))))
        midpoint=[[(a+b)/2 for a,b in line] for line in reportedS];assert midpoint==[list(map(Q,line)) for line in row['lognorm']['midpoint']];alpha=Q(row['lognorm']['alpha']);A=[[alpha-x if i==v else -x for v,x in enumerate(line)] for i,line in enumerate(midpoint)];ms=minors(A);assert ms==list(map(Q,row['lognorm']['minors'])) and min(ms)>=0;radius=Q(row['lognorm']['radius']);assert radius>=sqrtupper(sum(((b-a)/2)**2 for line in reportedS for a,b in line));mu=alpha+radius;assert mu==Q(row['lognorm']['mu']);Pc=Q(row['fieldBounds']['Pc']);assert Pc>=sqrtupper(sum(max(abs(a),abs(b))**2 for a,b in pc));force=Q(row['flow']['forcing']);assert force>=sqrtupper((newnu*c['fq'])**2+(c['fH']+(Q(row['fieldBounds']['UH'])+Pc/ra)*c['fq'])**2);E,P=map(Q,[row['flow']['E'],row['flow']['P']]);exactE=iv.exp(IQ(mu)*IQ(dt));assert IQ(E).a>=exactE.b
        if mu==0:assert P>=dt
        else:assert IQ(P).a>=((exactE-1)/IQ(mu)).b
        whole=max(Q(1),E)*previous+P*force;endpoint=E*previous+P*force;assert whole==Q(row['flow']['W']) and endpoint==Q(row['flow']['Wend']);er=whole/newnu;eu=whole+Q(row['fieldBounds']['Cq'])*er+c['fq'];assert whole<tw and eu<tu and eu==Q(row['physicalU']);EA=row['originalE'];assert EA['S']==row['S'];Rs,Vs,As=map(Q,row['sourceGeometry']);ea=Q(EA['Cx'])*(er+src[0]+Rs*psi)+Q(EA['Hv'])*(src[1]+Vs*psi)+Q(EA['B'])*(src[2]+As*psi)+Q(row['delta']);assert ea==Q(row['physicalA']);assert [Q(row[k]) for k in ['r','p','W','Wend','u','a']]==[base.ceil(x) for x in [er,whole,whole,endpoint,eu,ea]];uparts=[min(eu,whole+max(abs(a),abs(b))*er+qparts[i]) for i,(a,b) in enumerate(qcol)];assert uparts==list(map(Q,pr['physicalUComponents']));position=Q(EA['Cx'])*(er+src[0]+Rs*psi);Asrc=dict(sourceparts,r=Q(0));_,aparts=projected_packet(pr['E'],Asrc,[Q(0),Vs,As],psi,Q(row['delta'])+position,Q(0),ea,False);assert [Q(row[k]) for k in ['ur','ut','ar','at']]==[base.ceil(x) for x in uparts+aparts];omega=eu/(rc-er)+bc*er/((rc-er)*rc);ag=row['componentAngular'];assert omega==Q(ag['old']);raw=uparts[1]/(rc-er)+Q(ag['tangentBound'])*er/((rc-er)*rc);assert raw==Q(ag['raw']) and min(raw,omega)==Q(ag['bound']);assert Q(row['omega'])==base.ceil(min(raw,omega));assert Q(row['angularPrefix'])==Q(rows[len(prefixrows)+j-1]['angularPrefix'])+dt*Q(row['omega']);guard=row['proposedSource'];assert -6<Q(guard['lo'])<=lo<=hi<=Q(guard['hi'])<times[-1];Wend,nu=Q(row['Wend']),newnu;times.append(end);errors.append({k:Q(row[k]) for k in KEYS})
        if time.monotonic()-last>=30:print(json.dumps(dict(event='signed-neutral-reference-heartbeat',cells=j+1,t=float(end))),flush=True);last=time.monotonic()
    assert times[-1]==Q(result['final']['t']);return dict(passed=True,subjectSHA=sha(path),rowsSHA=sha(path+'.jsonl'),cells=len(rows),continuedCells=len(rows)-len(prefixrows),end=str(times[-1]),wallSeconds=time.monotonic()-started,scope='independent signedcurrent interval algebra, exactPSDcertificate/lognorm radius, interval scalar exp/phi, whole/endW/physicalU/A and complete source/angles; separate coefficient-family theorem and independent geometry/domain required; no event alone')
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--receipt');p.add_argument('--output',required=True);a=p.parse_args();out=dict(knownFirst=known());print(json.dumps(out),flush=True)
    if a.receipt:out['target']=analyze(a.receipt)
    with Path(a.output).open('x') as f:json.dump(out,f,indent=2);f.write('\n')
    print(json.dumps(out),flush=True)
