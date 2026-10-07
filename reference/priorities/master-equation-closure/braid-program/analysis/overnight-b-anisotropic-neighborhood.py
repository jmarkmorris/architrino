"""Separate planar and vertical absolute-time bounds; outward subject certificate."""
import argparse
import hashlib
import importlib.util
import json
import time
from pathlib import Path
import mpmath as mp

ROOT=Path(__file__).resolve().parents[5]
OUT=ROOT/'.local-data/master-equation-closure/overnight-b/anisotropic'
HELPER=Path(__file__).with_name('overnight-b-neighborhood.py')
INVERSE=ROOT/'.local-data/master-equation-closure/overnight-b/resolvent/target.json'
INVERSE_SHA='3585efc5e36fe867de13845d30782e6f27e862a1ee9965f81915a2a32d843f95'
spec=importlib.util.spec_from_file_location('frozen_neighborhood_primitives',HELPER)
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
I,lo,hi,sign,read=m.I,m.lo,m.hi,m.sign,m.read


def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()


def save(name,data):
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(name+'.json')
    p.write_text(json.dumps(m.encode(dict(instrumentSha256=sha(Path(__file__)),helperSha256=sha(HELPER),K=1,c_f=1,
                  timeUTC=time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime()),**data)),indent=2)+'\n')
    print(json.dumps(dict(stage=name,receipt=str(p),sha256=sha(p),passed=data.get('passed'))),flush=True)


def geo(d,j,R,omega,e,h,v):
    E=I(-e,e);r=R+E;rs=R+E
    # Only p' is bounded: relative phase drift is bounded by 2 e d.
    angle=j*mp.iv.pi/3-omega*d+I(-2*e,2*e)*d
    c,s=mp.iv.cos(angle),mp.iv.sin(angle);rate=omega+I(-2*e,2*e)
    q=[r-rs*c,-rs*s,I(-2*h,2*h)]
    vs=[E*c-rs*rate*s,E*s+rs*rate*c,I(-v,v)]
    vr=[E,r*rate,I(-v,v)]
    gap=sum((qk**2 for qk in q),I(0))-d**2
    gd=2*m.dot(q,vs)-2*d
    return gap,gd,q,vs,vr


def guards(R,omega,e,h,v,a):
    rmax=hi(R+I(e));rmin=lo(R-I(e));wmax=hi(omega+I(2*e));wmin=lo(omega-I(2*e))
    vmin=I(rmin)*I(wmin);vmax=mp.iv.sqrt(I(e)**2+(I(rmax)*I(wmax))**2+I(v)**2)
    ar=I(e)+I(rmax)*I(wmax)**2;at=2*I(e)*I(wmax)+I(rmax)*I(e)
    amax=mp.iv.sqrt(ar**2+at**2+I(a)**2)
    recent=min(mp.mpf('.001'),lo((vmin-1)/amax),lo(I(rmin)/(2*(vmax+1))))
    assert recent>0
    self_floor=vmin-amax*I(recent)/2;partner_floor=I(rmin)-(vmax+1)*I(recent)
    assert lo(self_floor)>1 and lo(partner_floor)>0
    remote=2*mp.iv.sqrt(I(rmax)**2+I(h)**2)
    return dict(recent=recent,selfSecantFloor=self_floor,partnerGapFloor=partner_floor,
                accelerationUpper=amax,remoteBound=remote,end=hi(remote)+mp.mpf('.01'))


def known():
    fun=lambda d:geo(d,3,I(1),I(0),mp.mpf(0),mp.mpf(0),mp.mpf(0))
    root=m.admit(fun,I('1.9','2.1'))
    leaves=m.complement(fun,mp.mpf(0),mp.mpf('1.9'))+m.complement(fun,mp.mpf('2.1'),mp.mpf(3))
    assert lo(root['refined'])<=2<=hi(root['refined'])
    assert lo(fun(I(2))[1])==hi(fun(I(2))[1])==-4
    # A static alternating height h has exact diametric squared range 4+4h^2.
    h=mp.mpf(1)/16
    f=geo(I(2),3,I(1),I(0),mp.mpf(0),h,mp.mpf(0))[0]
    assert lo(f)<=0 and hi(f)>=4*h*h
    save('known',dict(passed=True,root=root,complement=leaves,staticHeightEnvelope=f,exactHeightGap=4*h*h))


def target(power):
    kp=OUT/'known.json';k=json.loads(kp.read_text())
    assert k['passed'] and k['instrumentSha256']==sha(Path(__file__)) and k['helperSha256']==sha(HELPER)
    assert sha(INVERSE)==INVERSE_SHA
    refs=json.loads(INVERSE.read_text())['results'];e=mp.mpf(1)/2**20
    h=mp.mpf(1)/2**power;v=4*h;a=16*h
    results=[];started=time.monotonic()
    for ref in refs:
        R,beta=read(ref['radius']),read(ref['beta']);omega=beta/R;rung=ref['rung']
        g=guards(R,omega,e,h,v,a);channels=[];E=I(0);B=I(0)
        labels=[n for n in range(-5,1)]+[n for n in range(1,rung) for _ in (-1,1)]
        try:
            for j in range(6):
                rows=[(n,row) for n,row in zip(labels,ref['rows']) if n%6==j]
                rows.sort(key=lambda item:lo(read(item[1]['delay'])))
                fun=lambda d:geo(d,j,R,omega,e,h,v)
                cursor=g['recent'];excluded=[];certified=[]
                for index,(n,row) in enumerate(rows):
                    d0=read(row['delay']);a0=read(row['a']);next_bound=lo(read(rows[index+1][1]['delay'])) if index+1<len(rows) else g['end']
                    root=None
                    for padding in ['.0001','.0005','.001','.003','.005','.01','.03']:
                        pad=mp.mpf(padding)
                        box=I(lo(d0)-pad,hi(d0)+pad)
                        if lo(box)<=cursor or hi(box)>=next_bound:continue
                        try:root=m.admit(fun,box);break
                        except AssertionError:continue
                    assert root is not None,('root bracket unavailable',j,n)
                    excluded+=m.complement(fun,cursor,lo(root['box']));cursor=hi(root['box'])
                    d=root['refined'];_,gd,q,vs,vr=fun(d);D=1-m.dot(q,vs)/d
                    assert sign(D) and sign(D)==-sign(gd)
                    coeff=1/(d**3*abs(D));dp=m.dot(q,[u-w for u,w in zip(vr,vs)])/(d*D)
                    eps=hi(abs(coeff-a0));delta=hi(abs(d-d0));eta=hi(abs(dp))
                    assert eta<1,('playback bound unavailable',j,n,eta)
                    E+=I(eps);B+=(a0+I(eps))*I(delta)/mp.iv.sqrt(1-I(eta))
                    certified.append(dict(m=n,**root,D=D,a=coeff,delayDerivative=dp,epsilon=eps,delta=delta,eta=eta))
                excluded+=m.complement(fun,cursor,g['end'])
                channels.append(dict(source=j,roots=certified,complement=excluded))
            C0=I(ref['C0']['display']);C1=I(ref['C1']['display']);criterion=2*C0*E+C1*B
            passed=hi(criterion)<1
            row=dict(rung=rung,passed=passed,guards=g,channels=channels,E=E,B=B,C0=C0,C1=C1,criterion=criterion)
            print(json.dumps(dict(rung=rung,height=str(h),passed=passed,criterionUpper=mp.nstr(hi(criterion),20))),flush=True)
        except AssertionError as exc:
            row=dict(rung=rung,passed=False,reason=str(exc),completedChannels=len(channels))
            print(json.dumps(dict(rung=rung,height=str(h),passed=False,reason=str(exc))),flush=True)
        results.append(row)
    save(f'h-2m{power}',dict(passed=all(r['passed'] for r in results),knownSha256=sha(kp),inverseSha256=sha(INVERSE),
                            planarEpsilon=e,height=h,heightVelocity=v,heightAcceleration=a,results=results,
                            elapsedSeconds=time.monotonic()-started,
                            scope='Subject anisotropic neighborhood with sharper subject inverse constants; independent check required'))


if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','target'],required=True)
    p.add_argument('--height-power',type=int,default=8);args=p.parse_args()
    known() if args.stage=='known' else target(args.height_power)
