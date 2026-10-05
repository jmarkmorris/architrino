#!/usr/bin/env python3
"""Known-first interval diagnostic for implicit-root sharp-kernel enclosures.

Consumes identical retained error balls. No evolution, reference narrowing,
root census claim, or acceptance claim is produced by this instrument.
"""
import argparse
import hashlib
import json
from pathlib import Path

import mpmath as mp

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / '.local-data/ring-followup/t04/diagnostic'
mp.mp.dps = 85
mp.iv.dps = 80
iv = mp.iv


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def lo(x):
    return mp.mpf(x._mpi_[0])


def hi(x):
    return mp.mpf(x._mpi_[1])


def inter(x, y):
    a, b = max(lo(x), lo(y)), min(hi(x), hi(y))
    if a > b:
        raise ValueError('empty certified intersection')
    return iv.mpf([a, b])


def point(x):
    return iv.mpf(str(x))


def dot(a, b):
    return sum((x*y for x, y in zip(a, b)), point(0))


def norm(q):
    return iv.sqrt(dot(q, q))


def box(radius):
    return iv.mpf([-mp.mpf(str(radius)), mp.mpf(str(radius))])


def midpoint(x):
    return point((lo(x)+hi(x))/2)


def state(seg, t):
    u = t-point(seg['startTime'])
    c = [[point(v) for v in row] for row in seg['coefficients']]
    p = [((r[3]*u+r[2])*u+r[1])*u+r[0] for r in c]
    v = [(3*r[3]*u+2*r[2])*u+r[1] for r in c]
    a = [6*r[3]*u+2*r[2] for r in c]
    return p, v, a


def kernel(q, v, signed=1):
    r = norm(q)
    d = point(1)-dot(q, v)/r
    if lo(r) <= 0 or lo(d) <= 0 <= hi(d):
        raise ValueError('ordinary chart not certified')
    ad = d if lo(d)>0 else -d
    return [point(signed)*x/(r*r*r*ad) for x in q]


def centered(rec, seg, emission, signed=1):
    ep = [box(x) for x in seg['positionErrors']]
    ev = [box(x) for x in seg['velocityErrors']]
    p, v, a = state(seg, emission)
    q = [x-y-e for x, y, e in zip(rec, p, ep)]
    velocity = [x+e for x, e in zip(v, ev)]
    r = norm(q)
    n = [x/r for x in q]
    d = point(1)-dot(n, velocity)
    dn = point(1)-dot(n, v)
    if lo(dn)<=0<=hi(dn) or lo(d)<=0<=hi(d):
        raise ValueError('surrogate or actual transmitter chart crosses zero')
    low = point(lo(emission)); high = point(hi(emission))
    def residual(s, receiver, source_error):
        source, _, _ = state(seg, s)
        return norm([x-y-e for x,y,e in zip(receiver,source,source_error)])+s
    # Reception is translated to zero before this routine. Both strict signs
    # establish a unique surrogate root for every straight error homotopy.
    gl, gh = residual(low, rec, ep), residual(high, rec, ep)
    if not ((hi(gl)<0<lo(gh)) or (hi(gh)<0<lo(gl))):
        raise ValueError('uniform surrogate endpoint signs not certified')
    rec0 = [midpoint(x) for x in rec]
    center = emission
    for _ in range(90):
        s = midpoint(center)
        pp, vv, _ = state(seg, center)
        qq = [x-y for x,y in zip(rec0,pp)]
        dd = point(1)-dot(qq,vv)/norm(qq)
        candidate = s-residual(s, rec0, [point(0)]*3)/dd
        updated = inter(center,candidate)
        if hi(updated)-lo(updated) >= hi(center)-lo(center):
            break
        center = updated
    pc, vc, _ = state(seg, center)
    base = kernel([x-y for x,y in zip(rec0,pc)],vc,signed)
    weight = point(signed)/(r*r*r*(d if lo(d)>0 else -d))
    nv = dot(n,velocity)
    jq = [[weight*((1 if i==j else 0)-3*n[i]*n[j]
          -q[i]*(-velocity[j]/r+nv*n[j]/r)/d)
          for j in range(3)] for i in range(3)]
    jv = [[weight*q[i]*n[j]/d for j in range(3)] for i in range(3)]
    # The homotopy holds source position and velocity error VALUES fixed.
    # Its causal derivative is the nominal polynomial velocity v, not v+ev.
    js = [-dot(rowq,v)+dot(rowv,a) for rowq,rowv in zip(jq,jv)]
    jp = [[jq[i][j]-js[i]*n[j]/dn for j in range(3)] for i in range(3)]
    dp = [x-c-e for x,c,e in zip(rec,rec0,ep)]
    estimate = [base[i]+dot(jp[i],dp)+dot(jv[i],ev) for i in range(3)]
    natural = kernel(q,velocity,signed)
    return {
        'natural':natural,
        'centered':[inter(x,y) for x,y in zip(natural,estimate)],
        'nominalRoot':center,
        'actualD':d,
        'homotopyD':dn,
        'endpointResiduals':[gl,gh],
    }


def serialize(value):
    if hasattr(value,'_mpi_'):
        return {'lower':str(lo(value)),'upper':str(hi(value)),
                'width':str(hi(value)-lo(value)),
                'binary':[[int(x) for x in t] for t in value._mpi_]}
    if isinstance(value,list):
        return [serialize(x) for x in value]
    if isinstance(value,dict):
        return {k:serialize(v) for k,v in value.items()}
    return value


def save(name, value):
    OUT.mkdir(parents=True,exist_ok=True)
    record={'instrumentSha256':sha(Path(__file__)),**value}
    (OUT/(name+'.json')).write_text(json.dumps(serialize(record),indent=2)+'\n')


def known():
    stationary={'startTime':'-4','endTime':'0','coefficients':[['0']*4]*3,
                'positionErrors':['0']*3,'velocityErrors':['0']*3}
    s=centered([point(2),point(0),point(0)],stationary,iv.mpf(['-2.1','-1.9']),-1)
    assert lo(s['centered'][0])<=mp.mpf('-.25')<=hi(s['centered'][0])
    negative={'startTime':'-4','endTime':'0','coefficients':[['-6','2','0','0'],['0']*4,['0']*4],
              'positionErrors':['0']*3,'velocityErrors':['0']*3}
    n=centered([point(0)]*3,negative,iv.mpf(['-2.1','-1.9']))
    assert lo(n['centered'][0])<=mp.mpf('.25')<=hi(n['centered'][0])
    assert hi(n['actualD'])<0
    negative['positionErrors']=['1e-6','0','0'];negative['velocityErrors']=['1e-6','0','0']
    rec=[box('1e-6'),point(0),point(0)]
    u=centered(rec,negative,iv.mpf(['-2.001','-1.999']))
    # Exact independent scalar range for receiver/source coordinate errors
    # and an independent source velocity value on this negative-D chart.
    exact=point(1)/((point(2)+box('2e-6'))**2*(point(1)+box('1e-6')))
    assert lo(u['centered'][0])<=lo(exact) and hi(u['centered'][0])>=hi(exact)
    save('known',{'passed':True,'stationary':s,'negativeD':n,'negativeDInputBall':u,
                  'exactInputBallRange':exact})
    print('known analytical static, negative-D and uncertainty-ball controls passed',flush=True)


def target():
    control=json.loads((OUT/'known.json').read_text())
    assert control['passed'] and control['instrumentSha256']==sha(Path(__file__))
    hpath=ROOT/'.local-data/ring-exploration/eom-release/handoff.json'
    rpath=ROOT/'.local-data/ring-exploration/eom-release-run/coarse-evolution/stdout.json'
    h=json.loads(hpath.read_text());response=json.loads(rpath.read_text())
    t=mp.mpf(response['acceptedEndTime']);assert t==mp.mpf('.0029296875')
    paths={m['pathId']:m['segments'] for m in h['members']}
    extended={m['pathId']:m['segments'] for m in response['publishedExtensions']}
    accounting=response['stepFailures'][-1]['rootAccounting']
    targets=[]
    for receiver,source in [('b13-0','b13-3'),('b13-3','b13-0')]:
        seg=extended[receiver][-1]; pp,_,_=state(seg,point(t))
        rec=[x+box(e) for x,e in zip(pp,seg['positionErrors'])]
        # Independent reproduction of the existing nearest-join position
        # correlation: integrate the published rate error over the last cell.
        prev=extended[receiver][-2];join=point(seg['startTime'])
        pl,_,_=state(prev,join);pr,_,_=state(seg,join)
        shared=[inter(x+box(e),y+box(f)) for x,y,e,f in zip(pl,pr,prev['positionErrors'],seg['positionErrors'])]
        rec=[inter(x,y+z-a+box(mp.mpf(e)*(t-mp.mpf(seg['startTime']))))
             for x,y,z,a,e in zip(rec,shared,pp,pr,seg['velocityErrors'])]
        row=next(x for x in accounting if x['receiverPathId']==receiver and x['transmitterPathId']==source)
        for k,root in enumerate(row['roots']):
            a,b=mp.mpf(root['lower']),mp.mpf(root['upper'])
            src=next(s for s in paths[source] if mp.mpf(s['startTime'])<=a and b<=mp.mpf(s['endTime']))
            # Translate the time origin only; exact decimal coefficients and
            # every original representation-error radius are preserved.
            shifted={**src,'startTime':str(mp.mpf(src['startTime'])-t),'endTime':str(mp.mpf(src['endTime'])-t)}
            report=centered(rec,shifted,iv.mpf([a-t,b-t]),-1)
            targets.append({'receiver':receiver,'source':source,'root':k,**report})
            print(f'{receiver} <- {source} root {k}: natural maxwidth '+str(max(hi(x)-lo(x) for x in report['natural']))+
                  '; centered '+str(max(hi(x)-lo(x) for x in report['centered'])),flush=True)
    save('target',{'passed':True,'handoffSha256':sha(hpath),'responseSha256':sha(rpath),'reception':str(t),
                   'scope':'diagnostic enclosures of identical retained error balls; no new root-census or evolved-prefix claim',
                   'rows':targets})


if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--stage',choices=['known','target'],required=True)
    args=parser.parse_args();known() if args.stage=='known' else target()
