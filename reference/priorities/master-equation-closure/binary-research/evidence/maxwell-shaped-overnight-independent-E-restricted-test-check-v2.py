"""Independent E accepted-cell induction/restriction and potential-work check.
Imports frozen full-test polynomial/majorant reference without changing it.
Actual original prefix and whole-source error budgets remain external premises.
"""
import argparse,json,hashlib,time,itertools
from pathlib import Path
from fractions import Fraction as Q
import importlib.util
p=Path(__file__).with_name('maxwell-shaped-overnight-independent-adaptive-test-check.py')
s=importlib.util.spec_from_file_location('frozen_adaptive',p);a=importlib.util.module_from_spec(s);s.loader.exec_module(a)
iv=a.iv;k=a.k
def known():
    b=a.known()
    # Independent exact restriction faces and inherited full-cell error.
    faces=[Q(0),Q('1/3'),Q('2/3')];H=Q('1/2');pieces=[(l,min(r,H)) for l,r in zip(faces,faces[1:]) if l<H]
    assert pieces==[(Q(0),Q('1/3')),(Q('1/3'),Q('1/2'))]
    assert sum(r-l for l,r in pieces)==H
    assert Q('1.04')-Q('.03')-1>0 and Q('1.03')-Q('.03')-1==0
    # Fixed four equal quarters in each planar receiving-position component.
    cuts=[Q(-1)+Q(j,2) for j in range(5)]
    assert list(zip(cuts,cuts[1:]))==[(Q(-1),Q('-1/2')),(Q('-1/2'),Q(0)),(Q(0),Q('1/2')),(Q('1/2'),Q(1))]
    assert len(list(itertools.product(range(4),repeat=2)))==16
    return dict(passed=True,predecessor=b,cases=['exact non-dyadic final restriction','strict/equality reverse triangle','fixed sixteen closed planar quarter boxes cover entire receiving box'])
def split(z):
    # Interval endpoints are binary rationals: retain their exact mpi values.
    def q(t):
        sign,m,e,_=t;return Q((-1 if sign else 1)*m)*Q(2)**e
    lo,hi=map(q,z._mpi_);return [iv.mpf([a.IQ(lo+(hi-lo)*Q(j,4)).a,a.IQ(lo+(hi-lo)*Q(j+1,4)).b]) for j in range(4)]
def analyze(path):
    rr=json.loads(Path(path).read_text());pb=Path(rr['input']).read_bytes();assert hashlib.sha256(pb).hexdigest()==rr['SHA256']
    parent=json.loads(pb);c=parent['case'];assert c['law']=='E' and c['K']==c['cf']==1 and parent['terminal']=='declared error tube failed'
    hb=Path(c['input']).read_bytes();assert hashlib.sha256(hb).hexdigest()==c['SHA256']==rr['historySHA256']
    saved=json.loads(hb);curve=a.Curve(saved['knots'],c['jetSelection']['midpoint']);Tc=Q('59.5');Tf=Q('59.56');left=Tc
    ex,ev=Q('.001'),Q('.005');worklo=None;started=time.monotonic();out=[]
    restricted=rr['restriction']['rows'];assert rr['passed'] and Q(rr['restriction']['reached'])==Tf
    for j,row in enumerate(parent['rows']):
        dt=Q(row['exactCoefficients']['dt']);right=left+dt;co=row['exactCoefficients'];C,Lv,La,de=map(Q,[co[z] for z in ['Cx','Lv','La','defect']]);assert min(C,Lv,La,de)>=0
        force=C*Q('.001')+Lv*Q('.001')+La*Q('.01')+de
        bx,bv=a.majorant(ex,ev,C,force,dt);nx,nv=Q(row['exactErrors']['x']),Q(row['exactErrors']['v'])
        assert a.IQ(nx).a>=bx.b and a.IQ(nv).a>=bv.b
        assert Q(row['localExpansion']['x'])==ex+Q('.00002') and Q(row['localExpansion']['v'])==ev+Q('.0002')
        assert nx<Q(row['localExpansion']['x']) and nv<Q(row['localExpansion']['v']) and nx<Q('.01') and nv<Q('.05')
        assert abs(float(left)-row['left'])<1e-13 and abs(float(right)-row['right'])<1e-13
        pr=restricted[j];assert Q(pr['left'])==left and Q(pr['right'])==min(right,Tf) and Q(pr['parentRight'])==right
        for key in ['exactErrors','source','work','D','R']:assert pr[key]==row[key]
        S=row['source'];assert Q('58.95')<Q(S['lo'])<Q(S['hi'])<Q('59.35')<Tc
        X=curve.box(left,right,0);U=curve.box(left,right,1);sx,sv,sa=[curve.box(S['lo'],S['hi'],n) for n in range(3)]
        rx,rv=Q(row['localExpansion']['x']),Q(row['localExpansion']['v'])
        X=[z+iv.mpf([-a.IQ(rx).b,a.IQ(rx).b]) if d<2 else z for d,z in enumerate(X)]
        U=[iv.mpf([max((z-a.IQ(rv)).a,a.IQ(-1).a),min((z+a.IQ(rv)).b,a.IQ(1).b)]) if d<2 else z for d,z in enumerate(U)]
        src=[-(z+iv.mpf([-a.IQ('.001').b,a.IQ('.001').b])) if d<2 else z for d,z in enumerate(sx)]
        V=[-(z+iv.mpf([-a.IQ('.001').b,a.IQ('.001').b])) if d<2 else z for d,z in enumerate(sv)]
        A=[-(z+iv.mpf([-a.IQ('.01').b,a.IQ('.01').b])) if d<2 else z for d,z in enumerate(sa)]
        f=k.field(X,U,src,V,A);coarse=Q(k.encode(f['work'])['lo'])
        w=min(Q(k.encode(k.field([xx,yy,X[2]],U,src,V,A)['work'])['lo']) for xx,yy in itertools.product(split(X[0]),split(X[1])))
        worklo=w if worklo is None else min(worklo,w)
        assert Q(row['work']['lo'])>0 and Q(row['D']['lo'])>0 and Q(row['R']['lo'])>0
        out.append(dict(left=str(left),right=str(min(right,Tf)),independentWorkLower=str(w)));ex,ev=nx,nv
        if right>=Tf:break
        left=right
    assert len(out)==len(restricted) and Q(out[-1]['right'])==Tf
    assert Q(rr['restriction']['errors']['x'])==ex and Q(rr['restriction']['errors']['v'])==ev
    initial=k.norm(curve.box(Tc,Tc,1));speed=k.norm(curve.box(Tf,Tf,1));gap=speed-a.IQ(ev)-1
    print(json.dumps(dict(initialSpeed=k.encode(initial),gap=k.encode(gap),independentWorkLower=str(worklo))),flush=True)
    assert initial.b+a.IQ('.005').b<1 and gap.a>0 and worklo>0
    return dict(accepted=True,cells=len(out),receiptSHA=hashlib.sha256(Path(path).read_bytes()).hexdigest(),parentSHA=rr['SHA256'],independentWorkLower=str(worklo),speed=k.encode(speed),gap=k.encode(gap),errors=dict(x=str(ex),v=str(ev)),wall_seconds=time.monotonic()-started,scope='conditional E first incoming event before59.56; actual original endpoint and wholeguard budgets unsupplied',rows=out)
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--receipt');p.add_argument('--output',required=True);args=p.parse_args();result=dict(known=known());print(json.dumps(result),flush=True)
    if args.receipt:result['target']=analyze(args.receipt)
    Path(args.output).write_text(json.dumps(result,indent=2)+'\n');print(json.dumps({**result,'target':{k:v for k,v in result.get('target',{}).items() if k!='rows'}}),flush=True)
