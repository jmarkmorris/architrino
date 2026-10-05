"""Independent exact-rational H/Z majorant and complete source audit.

Signed-source conditional version retains all source component columns, complete bins and physical acceleration components. V2 checks physical conversion from the independently solved raw endpoint; stored rounded Z/H remain the next-step state. Frozen prior references supply arithmetic/control formulas; no subject imports.
Physical response/root families require separate mathematical assessment.
"""
import argparse,bisect,hashlib,importlib.util,json,time
from fractions import Fraction as Q
from math import isqrt
from pathlib import Path

p=Path(__file__).with_name('maxwell-e-first-event-directional-recurrence-reference.py')
s=importlib.util.spec_from_file_location('frozen_directional',p);prior=importlib.util.module_from_spec(s);s.loader.exec_module(prior)
iv,IQ=prior.iv,prior.IQ

def bounds(z):return Q(z['lo']),Q(z['hi'])
def add(a,b):return a[0]+b[0],a[1]+b[1]
def mul(a,b):
    v=[x*y for x in a for y in b];return min(v),max(v)
def square(a):return (Q(0) if a[0]<=0<=a[1] else min(x*x for x in a),max(x*x for x in a))
def norm_upper(v):
    a=sum(max(abs(x),abs(y))**2 for x,y in v);scale=10**40
    return Q(isqrt(a.numerator*scale*scale//a.denominator)+1,scale)
def dot(a,b):
    out=(Q(0),Q(0))
    for x,y in zip(a,b):out=add(out,mul(x,y))
    return out
def matrix_vector(A,v):return [dot(r,v) for r in A]
def row_vector(v,A):return [dot(v,list(c)) for c in zip(*A)]
def encloses(z,a):lo,hi=bounds(z);assert lo<=a[0]<=a[1]<=hi

def advance(z,h,mu,c,l,fr,fh,dt):
    z,h,mu,c,l,fr,fh,dt=map(Q,[z,h,mu,c,l,fr,fh,dt]);assert min(z,h,mu,c,l,fr,fh,dt)>=0
    # Independently solve simultaneous endpoint supremum inequalities.
    A=Q(1)-dt*mu;B=-dt*c;C=-dt*l;D=Q(1);det=A*D-B*C
    assert A>0 and det>0
    v1=z+dt*fr;v2=h+dt*fh
    return (D*v1-B*v2)/det,(A*v2-C*v1)/det

def convert(z,h,nu,ra,rc,rcmax,hc):
    z,h,nu,ra,rc,rcmax,hc=map(Q,[z,h,nu,ra,rc,rcmax,hc]);assert min(nu,ra,rc,rcmax)>0
    r=z/nu;ut=h/ra+hc*r/(ra*rc);omega=h/ra**2+hc*r*(rcmax+r+rcmax)/(ra**2*rc**2)
    return r,norm_upper([(z,z),(ut,ut)]),omega

def component_force(delta,pos,col,V,A,source,geom,psi):
    delta,pos,col,psi=map(Q,[delta,pos,col,psi]);source=list(map(Q,source));geom=list(map(Q,geom))
    sr=min(pos,col+pos*psi);caps=[]
    for vector in [V,A]:
        caps.extend([min(Q(vector['norm']),Q(vector[k])+Q(vector['norm'])*psi) for k in ['radial','tangent']])
    F=delta+sr*source[0]+pos*geom[0]*psi+sum(x*y for x,y in zip(caps,source[1:]))+Q(V['norm'])*geom[1]*psi+Q(A['norm'])*geom[2]*psi
    return [sr]+caps,F

def ur_integral(times,errors,source,end,trial,past):
    source,end,trial,past=map(Q,[source,end,trial,past]);assert -6<source<=times[-1]<=end
    total=max(Q(0),-source)*past
    for i in range(1,len(times)):
        length=max(Q(0),times[i]-max(times[i-1],source))
        total+=length*errors[i]['ur']
    return total+(end-times[-1])*trial

def signed_force(delta,pos,sourcePhi,V,A,source,geom,psi,integral):
    caps,f=component_force(delta,0,0,V,A,[0]+source[1:],[0]+geom[1:],psi)
    b=max(abs(x) for x in sourcePhi);rotation=Q(pos)*(geom[0]+source[0])*psi
    return caps,f+b*integral+rotation,b,rotation

def known():
    times=list(map(Q,[0,1,3]));errors=[{'ur':Q(0)},{'ur':Q(2)},{'ur':Q(5)}];assert ur_integral(times,errors,Q('1/2'),4,7,3)==18;assert ur_integral(times,errors,1,4,7,3)==17;assert ur_integral(times,errors,-1,4,7,3)==22;assert ur_integral(times,errors,2,3,7,3)==5;assert Q(9)-2*(3-1)==5 and Q(0)-Q(-1)==1;original=prior.known();zero=dict(norm=0,radial=0,tangent=0);V=dict(norm=2,radial=2,tangent=0);A=dict(norm=Q('1/2'),radial=0,tangent=Q('1/2'));assert component_force(0,0,0,V,zero,[0,4,5,0,0],[0,0,0],0)[1]==8;assert component_force(0,0,0,zero,A,[0,0,0,100,2],[0,0,0],0)[1]==1;assert component_force(Q('1/10'),2,3,V,A,[1,4,5,100,2],[3,4,5],Q('1/10'))[1]==Q('75/4');assert advance(1,2,0,0,0,0,0,1)==(Q(1),Q(2))
    z,h=advance(1,1,1,2,3,0,0,Q('1/10'));assert z==h==Q('10/7')
    # Exact continuous eigenmode e^(3t), independently enclosed exponential.
    exact=iv.exp(IQ('3/10'));assert IQ(z).a>exact.b
    z,h=advance(2,3,0,2,0,4,6,Q('1/2'));assert z>=Q('17/2') and h==6
    kappa=Q('-1/4');nu=Q('1/2');assert abs(nu+kappa/nu)/2==0
    _,u,w=convert(Q('1/2'),1,Q('1/2'),2,3,3,2);assert u>=Q('5/6') and w>=Q('19/36')
    A=[[(Q('1/4'),Q('1/4')),(Q(0),Q(0))],[(Q(0),Q(0)),(Q('-1/8'),Q('-1/8'))]];v=[(Q(1),Q(1)),(Q(0),Q(0))];assert dot(v,matrix_vector(A,v))==(Q('1/4'),Q('1/4'))
    return dict(passed=True,prior=original,cases=['independent2x2Gaussian endpoint inverse','exact exponential eigenmode domination','exact quadratic forced control','signed harmonic norm cancellation','h/r and h/r² conversion','signed projection control','independent sourceV8/physicalA1/finiteangle75/4 component controls','independent direct whole-bin Ur integral/seam/negativepast/current/zero-length controls','affine and harmonic signed radial-error identities'])

def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def analyze(path):
    result=json.loads(Path(path).read_text());assert result['oldCapsPolicy']=='none; original complete comparison from release'
    for a,b in [('input','inputSHA'),('defects','defectSHA')]:assert sha(result[a])==result[b]
    assert result['actualCensusPremise'].startswith('conditional no-prior-unit event');prefix=json.loads(Path(result['prefix']).read_text());assert sha(result['prefix'])==result['prefixSHA'] and sha(result['prefix']+'.jsonl')==result['prefixRowsSHA'];prefixrows=list(map(json.loads,Path(result['prefix']+'.jsonl').read_text().splitlines()));assert len(prefixrows)==prefix['bins'] and Q(prefix['final']['t'])==Q(result['conditionalStart']);rows=list(map(json.loads,Path(path+'.jsonl').read_text().splitlines()));assert rows[:len(prefixrows)]==prefixrows;defects=list(map(json.loads,Path(result['defects']).read_text().splitlines()));assert len(rows)==result['bins']
    initial={k:Q(v) for k,v in result['initialIntrinsic'].items()};past={k:Q(v) for k,v in result['pastIntrinsic'].items()};pastomega=Q(result['pastOmega']);times=[Q(0)];errors=[dict(initial,omega=Q(0))]
    Z,H,nu=map(Q,[result['initialZ'],result['initialH'],result['initialNu']]);start=time.monotonic();last=start;minimum=None;urAccum=Q(0)
    for j,a in enumerate(rows):
        end=Q(a['t']);dt=end-times[-1];d=defects[j];assert Q(d['left'])==times[-1] and end==min(Q(d['right']),Q(result['horizon'])) and Q(d['bound'])==Q(a['delta'])
        currentnu=Q(a['nu']);oldZ=Z*max(Q(1),currentnu/nu);assert oldZ==Q(a['previousZ'])
        rz,rh,tr,tu,to=map(Q,[a[k] for k in ['trialZ','trialH','trialR','trialU','trialOmega']]);g=a['receiverGeometry'];rc,rcmax,ra,bc=map(Q,[g[k] for k in ['rComparison','rComparisonMax','rTrialActual','speed']]);hc=bounds(g['h']);assert ra==rc-tr>0 and tr==rz/currentnu and (j>=len(prefixrows) or bc+tu<1)
        _,expectedu,expectedomega=convert(rz,rh,currentnu,ra,rc,rcmax,max(abs(x) for x in hc));assert tu>=expectedu and to>=expectedomega
        lo,hi=bounds(a['S']);bins=prior.selected(times,lo,hi);assert bins==a['sourceBins'];source=[]
        for k in ['r','u','a']:
            values=[errors[b][k] for b in bins]
            if lo<=0:values.extend([past[k],initial[k]])
            source.append(max(values))
        assert source==list(map(Q,a['sourceIntrinsic']));components=[]
        for key in ['ur','ut','ar','at']:
            values=[errors[b][key] for b in bins]
            if lo<=0:values.extend([past[key],initial[key]])
            components.append(max(values))
        assert components==list(map(Q,a['sourceIntrinsicComponents']))
        psi=prior.angular(times,errors,lo,end,to,pastomega);assert psi==Q(a['psi']);guard=bounds(a['proposedSource']);assert guard[0]<=lo<=hi<=guard[1]<times[-1] and guard[0]>-6
        assert prior.angular(times,errors,guard[0],end,to,pastomega)==Q(a['initialPsi'])
        reach=bounds(a['initialSourceWindow']);assert guard[0]<=reach[0]<=reach[1]<=guard[1]
        geom=list(map(Q,a['sourceGeometry']));aligned=[x+y*psi for x,y in zip(source,geom)];assert aligned==list(map(Q,a['alignedSource'])) and all(x<=y for x,y in zip(aligned,map(Q,a['expandedAlignedSource'])))
        A=[[bounds(z) for z in r] for r in a['AX']];Fv=[[bounds(z) for z in r] for r in a['Fv']];Fa=[[bounds(z) for z in r] for r in a['Fa']];rad=[bounds(z) for z in a['currentDirection']];tan=[(-rad[1][1],-rad[1][0]),rad[0]];src=[bounds(z) for z in a['sourceDirection']];P=a['projections']
        pr=dot(rad,matrix_vector(A,rad));pt=dot(tan,matrix_vector(A,rad));encloses(P['PhiR'],pr);encloses(P['PhiT'],pt)
        for key,direction,matrix in [('CrPosition',rad,A),('CtPosition',tan,A),('Hr',rad,Fv),('Ht',tan,Fv),('Br',rad,Fa),('Bt',tan,Fa)]:assert Q(P[key])>=norm_upper(row_vector(direction,matrix))
        for key,direction in [('CsR',rad),('CsT',tan)]:assert Q(P[key])>=max(abs(x) for x in dot(direction,matrix_vector(A,src)))
        SC=a['sourceColumns'];st=[(-src[1][1],-src[1][0]),src[0]]
        for key,direction,matrix in [('rV',rad,Fv),('tV',tan,Fv),('rA',rad,Fa),('tA',tan,Fa)]:
            vector=row_vector(direction,matrix);assert Q(SC[key]['norm'])>=norm_upper(vector)
            for col,basis in [('radial',src),('tangent',st)]:assert Q(SC[key][col])>=max(abs(x) for x in dot(vector,basis))
        if j>=len(prefixrows):
            sr=dot(rad,matrix_vector(A,src));stp=dot(tan,matrix_vector(A,src));encloses(P['sourcePhiR'],sr);encloses(P['sourcePhiT'],stp)
            encloses(P['effectivePhiR'],add(bounds(P['PhiR']),bounds(P['sourcePhiR'])));encloses(P['effectivePhiT'],add(bounds(P['PhiT']),bounds(P['sourcePhiT'])))
            P=dict(P,PhiR=P['effectivePhiR'],PhiT=P['effectivePhiT'])
            integral=ur_integral(times,errors,lo,end,rz,past['ur']);assert Q(a['radialVelocityIntegral'])==integral
            assert Q(a['radialVelocityPrefix'])==urAccum+dt*Q(a['ur'])
        coef=a['coefficients'];hactual=(hc[0]-rh,hc[1]+rh);rmin=rc-tr;rmax=rcmax+tr;ha2=square(hactual);centr=(-3*ha2[1]/rmin**4,-3*ha2[0]/rmax**4);encloses(coef['centrifugal'],centr);encloses(coef['kappa'],add(bounds(P['PhiR']),centr))
        assert Q(coef['Ch'])>=max(abs(x) for x in add(hactual,hc))/rc**3 and Q(coef['rPlus'])>=rmax and Q(coef['rMinus'])<=rmin
        assert Q(coef['Lh'])>=rmax*max(abs(x) for x in bounds(P['PhiT']))+max(abs(x) for x in bounds(a['Atc']))
        kap=bounds(coef['kappa']);M=max(abs(currentnu+x/currentnu) for x in kap)/2;assert Q(a['mu'])>=M
        forces=[]
        for k,position,column,vv,aa in [('Fr','CrPosition','CsR','rV','rA'),('Ft','CtPosition','CsT','tV','tA')]:
            if j<len(prefixrows):caps,F=component_force(a['delta'],P[position],P[column],SC[vv],SC[aa],[source[0]]+components,geom,psi)
            else:
                sourcePhi=bounds(P['sourcePhiR' if k=='Fr' else 'sourcePhiT'])
                caps,F,bcol,rotation=signed_force(a['delta'],P[position],sourcePhi,SC[vv],SC[aa],[source[0]]+components,geom,psi,integral)
                assert Q(a[k]['sourceSignedColumn'])==bcol and Q(a[k]['radialVelocityIntegral'])==integral and Q(a[k]['sourcePositionRotation'])==rotation
            assert caps==list(map(Q,[a[k][z] for z in ['sourceRadial','vr','vt','ar','at']])) and Q(a[k]['forcing'])==F;forces.append(F)
        rznext,rhnext=advance(oldZ,H,Q(a['mu']),Q(coef['Ch']),Q(coef['Lh'])/currentnu,forces[0],Q(coef['rPlus'])*forces[1],dt);z,h=Q(a['Z']),Q(a['H']);assert z>=rznext and h>=rhnext and z<rz and h<rh
        r,u,om=convert(rznext,rhnext,currentnu,rc-rznext/currentnu,rc,rcmax,max(abs(x) for x in hc));assert Q(a['r'])>=r and Q(a['u'])>=u and Q(a['omega'])>=om
        ar=max(abs(x) for x in bounds(P['PhiR']))*r+forces[0];at=max(abs(x) for x in bounds(P['PhiT']))*r+forces[1];assert Q(a['a'])>=norm_upper([(ar,ar),(at,at)]) and Q(a['ar'])>=ar and Q(a['at'])>=at
        ut=rhnext/(rc-r)+max(abs(x) for x in hc)*r/((rc-r)*rc);assert Q(a['ur'])>=rznext and Q(a['ut'])>=ut
        assert Q(a['improvementZ'])==rz-z and Q(a['improvementH'])==rh-h
        for k in ['D','Dclock','R']:assert Q(a[k]['lo'])>0
        assert Q(a['radiusLower'])>0 and (j>=len(prefixrows) or Q(a['speedUpper'])<1)
        urAccum+=dt*Q(a['ur']);step=min(rz-z,rh-h);minimum=step if minimum is None else min(minimum,step);Z,H,nu=z,h,currentnu;times.append(end);errors.append({key:Q(a[key]) for key in ['r','u','a','omega','ur','ut','ar','at']})
        if time.monotonic()-last>30:print(json.dumps(dict(event='independent-H-heartbeat',bins=j+1,t=float(end))),flush=True);last=time.monotonic()
    assert times[-1]==Q(result['final']['t']);return dict(acceptedRecurrence=True,bins=len(rows),end=str(times[-1]),minimumStrictImprovement=str(minimum),subjectSHA=sha(path),rowsSHA=sha(path+'.jsonl'),wallSeconds=time.monotonic()-start,scope='independent signed-source-radius/current-plus-source projection/whole-Ur-history/conditional2x2endpoint/source/component/centrifugal/metric arithmetic; actual census/continuation under stopping hypothesis and physical field/root domain remain separately assessed')

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--receipt');p.add_argument('--output',required=True);args=p.parse_args();out=dict(knownFirst=known());print(json.dumps(out),flush=True)
    if args.receipt:out['target']=analyze(args.receipt)
    with Path(args.output).open('x') as f:json.dump(out,f,indent=2);f.write('\n')
    print(json.dumps(out),flush=True)
