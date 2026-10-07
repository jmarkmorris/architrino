"""Independent directional dual-row and three-cell comparison; no subject imports."""
import pathlib,importlib.util,hashlib,json,sys
P=pathlib.Path(__file__).with_name('authorized-cases-ten-hour-reference-e-pilot-audit-v2.py')
assert hashlib.sha256(P.read_bytes()).hexdigest()=='911422519232a587d5181ab256b541576129d263b53759a9c1de09000b81177e'
sp=importlib.util.spec_from_file_location('ownref',P);r=importlib.util.module_from_spec(sp);sp.loader.exec_module(r)
I,S,iv,mp=r.I,r.S,r.iv,r.mp
LOCAL=pathlib.Path('.local-data/master-equation-closure/binary-research/authorized-cases-ten-hour/reference')
def add(a,b):return [x+y for x,y in zip(a,b)]
def scl(a,k):return [x*k for x in a]
def field(R,n,v,a,u):
    D=1-r.dot(n,v);z=1-r.dot(v,v);na=r.dot(n,a)
    E=[(z*(n[k]-v[k])+R*((n[k]-v[k])*na-D*a[k]))/(R**2*D**3) for k in range(3)]
    return [E[k]*(1-r.dot(u,n))+n[k]*r.dot(u,E) for k in range(3)]
def matrices(R,n,v,a,j,u):
    D=1-r.dot(n,v);A=[[I(0) for _ in range(3)] for _ in range(3)];B=[[I(0) for _ in range(3)] for _ in range(3)]
    for k in range(3):
        ds=-n[k]/D;dr=-ds;e=[I(int(l==k)) for l in range(3)]
        dn=[(e[l]-v[l]*ds-n[l]*dr)/R for l in range(3)]
        f=field(S([R,dr]),[S([x,y]) for x,y in zip(n,dn)],[S([x,y*ds]) for x,y in zip(v,a)],[S([x,y*ds]) for x,y in zip(a,j)],[S([x,0]) for x in u])
        g=field(S([R,0]),[S([x,0]) for x in n],[S([x,0]) for x in v],[S([x,0]) for x in a],[S([x,y]) for x,y in zip(u,e)])
        for l in range(3):A[l][k]=f[l].c[1];B[l][k]=g[l].c[1]
    return A,B

def norm(M):
    f=iv.sqrt(sum((x**2 for row in M for x in row),I(0)))
    rows=[sum((abs(x) for x in row),I(0)) for row in M]
    cols=[sum((abs(M[i][j]) for i in range(3)),I(0)) for j in range(3)]
    g=iv.sqrt(max(rows,key=r.hi)*max(cols,key=r.hi));return I(min(r.hi(f),r.hi(g)))
def contains(got,q):return r.lo(got)<=r.lo(q) and r.hi(got)>=r.hi(q)
def known():
    z=[I(0)]*3;A,B=matrices(I(2),[I(1),I(0),I(0)],z,[I(0),I(1)/20,I(0)],[I(0),I(0),I(1)/30],z)
    exp=[[I(-1)/4,I(1)/80,I(0)],[I(1)/40,I(1)/8,I(0)],[I(1)/60,I(0),I(1)/8]]
    eb=[[I(0),I(-1)/40,I(0)],[I(1)/40,I(0),I(0)],[I(0),I(0),I(0)]]
    assert all(contains(A[i][j],exp[i][j]) and contains(B[i][j],eb[i][j]) for i in range(3) for j in range(3))
    assert contains(norm([[I(int(i==j)*2) for j in range(3)] for i in range(3)]),I(2))
    out={'passed':True,'sha':hashlib.sha256(pathlib.Path(__file__).read_bytes()).hexdigest(),'controls':['exact transverse acceleration and independent normal jerk full receiver matrix','exact skew receiver velocity matrix','diagonal spectral norm']}
    p=LOCAL/'e-propagation-audit-known.json';assert not p.exists();p.write_text(json.dumps(out,indent=2));print(json.dumps(out))
def target():
    known=json.loads((LOCAL/'e-propagation-audit-known.json').read_text());assert known['passed'] and known['sha']==hashlib.sha256(pathlib.Path(__file__).read_bytes()).hexdigest()
    base=pathlib.Path('.local-data/master-equation-closure/braid-program');data=json.loads((base/'maxwell-shaped-overnight/ring-full-plus1e4-h0025.history.json').read_text());rs=json.loads((base/'authorized-cases-ten-hour/e-residual-pilot-v2.json').read_text());sub=json.loads((base/'authorized-cases-ten-hour/e-propagation-pilot.json').read_text())
    assert hashlib.sha256((base/'authorized-cases-ten-hour/e-propagation-pilot.json').read_bytes()).hexdigest()=='29ee45cfa4c2924d2f69b03213da2996704738ce89acbe282f1187a59d3c2aee'
    knots=[m['knots'][:4] for m in data['members']]
    for i in range(4):
        x,v,a=r.circle(i,S([0]));acc=[I(0)]*3
        for j in range(4):
            if i!=j:
                rt=r.root([q.c[0] for q in x],0,j);f,_=r.hit(x,v,S([0]),lambda s,j=j:r.circle(j,s),rt);acc=add(acc,[(-1)**(i+j)*q.c[0] for q in f])
        knots[i][0]={'t':0,'x':[q.c[0] for q in x],'v':[q.c[0] for q in v],'a':acc}
    radii=[I(0)]*4;results=[];overlaps=0;inside=0
    cap=I('1e-6');gamma=I(1)/16
    for k,row in enumerate(rs['rows']):
        left=I(row['left']);right=I(row['right']);T=iv.mpf([r.lo(left),r.hi(right)]);dt=I(knots[0][k+1]['t'])-I(knots[0][k]['t']);rad=(I(r.hi(T))-I(r.lo(T)))/2
        states=[r.receive(knots[i][k],knots[i][k+1],S([T,1,0,0,0,0,0])) for i in range(4)]
        cell=[]
        for i in range(4):
            x=[q.c[0] for q in states[i][0]];u=[q.c[0]+iv.mpf([-r.hi(cap),r.hi(cap)]) for q in states[i][1]]
            AA=[[I(0) for _ in range(3)] for _ in range(3)];BB=[[I(0) for _ in range(3)] for _ in range(3)]
            for j in range(4):
                if i==j:continue
                mid=I(row['rootMid'][i][str(j)]);reach=4*rad+cap/I('.4');ss=mid+iv.mpf([-r.hi(reach),r.hi(reach)]);assert r.hi(ss)<-mp.mpf('.34')
                sx,sv,sa=r.circle(j,S([ss,1]));rr=T-ss;nn=[(q+iv.mpf([-r.hi(cap),r.hi(cap)])-z.c[0])/rr for q,z in zip(x,sx)]
                vv=[q.c[0] for q in sv];ac=[q.c[0] for q in sa];jj=[q.c[1] for q in sa]
                assert r.lo(rr)>0 and r.lo(1-r.dot(nn,vv))>0
                A,B=matrices(rr,nn,vv,ac,jj,u);sg=(-1)**(i+j)
                AA=[[AA[a][b]+sg*A[a][b] for b in range(3)] for a in range(3)];BB=[[BB[a][b]+sg*B[a][b] for b in range(3)] for a in range(3)]
            stored=sub['cells'][k]['members'][i]
            for name,M in [('Jx',AA),('Ju',BB)]:
                for a in range(3):
                    for b in range(3):
                        old=I(stored[name][a][b]);new=M[a][b];assert r.lo(old)<=r.hi(new) and r.lo(new)<=r.hi(old);overlaps+=1;inside+=int(r.lo(old)<=r.lo(new) and r.hi(old)>=r.hi(new))
            mu=norm([[AA[a][b]+(gamma if a==b else 0) for b in range(3)] for a in range(3)])/(2*iv.sqrt(gamma));mu=I(r.hi(mu));lx=norm(AA);lu=norm(BB);rho=I(row['memberRho'][i]);ee=iv.exp(mu*dt);end=I(r.hi(ee*radii[i]+(ee-1)/mu*rho));px=end/iv.sqrt(gamma);acc=lx*px+lu*end+rho
            assert r.hi(px)<r.lo(cap) and r.hi(end)<r.lo(cap);radii[i]=end
            # Independent recurrence also checks the producer's scalar arithmetic using its own recorded coefficient uppers.
            co=stored['coefficients'];sm=I(co['mu'][1]);sh=I(r.hi(right-left));sf=I(r.hi(rho));prev=I(0) if k==0 else I(sub['cells'][k-1]['members'][i]['errors']['radius'][1]);se=iv.exp(sm*sh);sr=se*prev+(se-1)/sm*sf
            assert r.hi(sr)<=mp.mpf(stored['errors']['radius'][1])
            cell.append({'mu':r.out(mu),'position':r.out(px),'velocity':r.out(end),'acceleration':r.out(acc)})
        results.append(cell)
    out={'passed':True,'knownFirst':True,'independentDirectionalMatrices':True,'matrixEntriesOverlap':overlaps,'independentEntriesInsideProducer':inside,'warning':'Entry overlap alone is not proof; independent full-domain matrices and their own recurrence certify the displayed separate caps.','cells':results}
    p=LOCAL/'e-propagation-audit-v1.json';assert not p.exists();p.write_text(json.dumps(out,indent=2));print(json.dumps(out,indent=2))
if __name__=='__main__':known() if sys.argv[1]=='known' else target()
