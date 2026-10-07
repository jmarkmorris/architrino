"""Independent cross-product RMS evaluation, separate Hermite reconstruction."""
import pathlib,importlib.util,json,hashlib,bisect,sys
p=pathlib.Path(__file__).with_name('authorized-cases-ten-hour-reference-e-pilot-audit-v2.py');assert hashlib.sha256(p.read_bytes()).hexdigest()=='911422519232a587d5181ab256b541576129d263b53759a9c1de09000b81177e'
s=importlib.util.spec_from_file_location('r',p);r=importlib.util.module_from_spec(s);s.loader.exec_module(r)
I,iv,mp=r.I,r.iv,r.mp
L=pathlib.Path('.local-data/master-equation-closure/binary-research/authorized-cases-ten-hour/reference')
def rms(x,rad):
    a=[(x[0][k]-x[2][k])/2 for k in range(3)];b=[(x[1][k]-x[3][k])/2 for k in range(3)];c=[(x[0][k]+x[2][k]-x[1][k]-x[3][k])/4 for k in range(3)]
    cross=[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]]
    ab=sum((z**2 for z in a+b),I(0));cc=sum((z**2 for z in c),I(0));s=iv.sqrt(ab+2*r.normi(cross));v=cc+ab/2+rad**2-rad*s
    assert r.hi(v)>=0
    return iv.sqrt(iv.mpf([max(mp.mpf(0),r.lo(v)),r.hi(v)]))
def known():
    x=[[I(1),I(0),I(0)],[I(0),I(1),I(0)],[I(-1),I(0),I(0)],[I(0),I(-1),I(0)]];assert r.lo(rms(x,I(1)))==0
    x[0][0]+=I(1)/10;v=rms(x,I(1));q=iv.sqrt(3)/40;assert r.lo(v)<=r.hi(q) and r.lo(q)<=r.hi(v)
    q=rms([[I(0)]*3 for _ in range(4)],I(2));assert r.lo(q)<=2<=r.hi(q)
    d={'passed':True,'sha':hashlib.sha256(pathlib.Path(__file__).read_bytes()).hexdigest(),'controls':['exact square','radial single offset sqrt3/40','rank zero radius2']};p=L/'e-square-audit-known.json';assert not p.exists();p.write_text(json.dumps(d));print(json.dumps(d))
def target():
    k=json.loads((L/'e-square-audit-known.json').read_text());assert k['passed'] and k['sha']==hashlib.sha256(pathlib.Path(__file__).read_bytes()).hexdigest()
    base=pathlib.Path('.local-data/master-equation-closure/braid-program');src=base/'maxwell-shaped-overnight/ring-full-plus1e4-h0025.history.json';assert hashlib.sha256(src.read_bytes()).hexdigest()=='ef83cb8910090bf4c7179ebef65986c8895bb0d693e1a50bc5099a018393e193';data=json.loads(src.read_text());subp=base/'authorized-cases-ten-hour/e-square-observable-v1.json';assert hashlib.sha256(subp.read_bytes()).hexdigest()=='833067a9918618126adacf31b62c75616cf1c2ee78101ae586a15bcd1379b227';sub=json.loads(subp.read_text());rad=iv.mpf(['2.55921061613','2.55921061616']);rr=I('2.559210616145');initial=I('.0001')*rr*iv.sqrt(I('3.18'))/2+abs(rr-rad);rows=[]
    for row in sub['rows']:
        t=mp.mpf(row['T']);xx=[]
        for i in range(4):
            if t==0:xx.append([q.c[0] for q in r.circle(i,r.S([0]))[0]])
            else:
                knots=data['members'][i]['knots'];ts=[q['t'] for q in knots];idx=bisect.bisect_right(ts,t)-1;xx.append([q.c[0] for q in r.receive(knots[idx],knots[idx+1],r.S([I(row['T']),1,0,0,0,0,0]))[0]])
        # Fix radius midpoint and subtract its uncertainty using the independent radius Lipschitz proof.
        mid=I('2.559210616145');half=I('.000000000015');d=rms(xx,mid);low=r.lo(d)-r.hi(half);high=r.hi(d)+r.hi(half)
        # The two valid bounds need not nest; retain independently proved lower budget.
        budget=low-2*r.hi(initial);assert r.lo(I(row['rmsDistance']))<=high and low<=r.hi(I(row['rmsDistance']))
        rows.append({'T':row['T'],'rmsLower':r.out(I(low),False),'rmsUpper':r.out(I(high)),'positionBudgetLower':r.out(I(budget),False),'initialUpper':r.out(initial)})
    out={'passed':True,'knownFirst':True,'independentCrossProduct':True,'rows':rows};p=L/'e-square-audit-v1.json';assert not p.exists();p.write_text(json.dumps(out,indent=2));print(json.dumps(out,indent=2))
if __name__=='__main__':known() if sys.argv[1]=='known' else target()
