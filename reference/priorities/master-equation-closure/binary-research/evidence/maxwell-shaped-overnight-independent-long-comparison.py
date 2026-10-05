"""Independent matched-time literal history comparison; no coupled-solution tube.
Frozen grid0..1e6, spacing initial orbitalperiod/100 plus fixed windowfaces.
Subject quintics reconstructed from endpoint constraints by linear algebra;
reference eighth-degree position differentiated directly. Known cases first.
"""
import argparse,json,math,time
from pathlib import Path
import numpy as np

B=np.array([[1,0,0,0,0,0],[0,1,0,0,0,0],[0,0,2,0,0,0],[1,1,1,1,1,1],[0,1,2,3,4,5],[0,0,2,6,12,20]],float)

def array_stream(path,key,chunk=65536):
    import re
    decoder=json.JSONDecoder();buffer='';position=0
    with Path(path).open() as f:
        while True:
            more=f.read(chunk);assert more,'array header missing';buffer+=more
            match=re.search('"'+key+'"\\s*:\\s*\\[',buffer)
            if match:buffer=buffer[match.end():];break
        while True:
            while position<len(buffer) and buffer[position] in ' \n\r\t,':position+=1
            if position<len(buffer) and buffer[position]==']':return
            try:value,end=decoder.raw_decode(buffer,position)
            except json.JSONDecodeError:
                buffer=buffer[position:];position=0;more=f.read(chunk);assert more,'incomplete array element';buffer+=more;continue
            yield value;position=end
            if position>chunk:buffer=buffer[position:];position=0

def hermite(left,right):
    h=right['t']-left['t'];assert h>0
    values=np.asarray([left['x'],h*np.asarray(left['v']),h*h*np.asarray(left['a']),right['x'],h*np.asarray(right['v']),h*h*np.asarray(right['a'])])
    return dict(t0=left['t'],t1=right['t'],coefficients=np.linalg.solve(B,values))

def jets(segment,t):
    c=np.asarray(segment['coefficients']);h=segment['t1']-segment['t0'];z=(t-segment['t0'])/h
    v=np.arange(1,len(c))[:,None]*c[1:]/h;a=np.arange(1,len(v))[:,None]*v[1:]/h
    return [np.polynomial.polynomial.polyval(z,p) for p in [c,v,a]]

def metrics(x,v,a,law):
    r=float(np.linalg.norm(x));h=float(x[0]*v[1]-x[1]*v[0]);H=h*math.exp(1/(4*r)) if law=='full' else h
    return dict(radius=r,radius_cubed=r**3,angular_sixth=H**6,speed=float(np.linalg.norm(v)),radial_velocity=float(np.dot(x,v)/r),tangential_velocity=h/r,x=x.tolist(),v=v.tolist(),a=a.tolist())

def slope(t,y):
    t=np.asarray(t);y=np.asarray(y);z=t-t.mean();s=float(np.dot(z,y-y.mean())/np.dot(z,z));offset=y.mean()-s*t.mean()
    return dict(slope=s,max_fit_residual=float(np.max(abs(y-offset-s*t))),samples=len(t))

def known():
    scratch=Path('.tmp/maxwell-shaped-overnight-independent/array-stream-known.json');scratch.parent.mkdir(parents=True,exist_ok=True);scratch.write_text('{"specification":{},"knots":[{"t":0,"x":[1,0]},{"t":2,"x":[3,0]}]}')
    rows=list(array_stream(scratch,'knots',chunk=7));assert len(rows)==2 and rows[1]['t']==2
    c=np.array([[1,0],[2,1],[3,2],[4,3],[5,4],[6,5]],float);seg=dict(t0=1e6,t1=1e6+2,coefficients=c)
    left=dict(t=seg['t0'],**dict(zip(['x','v','a'],jets(seg,seg['t0']))));right=dict(t=seg['t1'],**dict(zip(['x','v','a'],jets(seg,seg['t1']))));rec=hermite(left,right)
    assert max(float(np.max(abs(x-y))) for x,y in zip(jets(seg,1e6+.7),jets(rec,1e6+.7)))<1e-12
    fit=slope(np.arange(10),7-3*np.arange(10));assert abs(fit['slope']+3)<1e-14
    assert abs(metrics(np.array([2.,0]),np.array([0.,.5]),np.zeros(2),'E')['angular_sixth']-1)<1e-14
    return dict(passed=True,cases=['two compactJSONknots chunk7 parser','degree5 endpointconstraint reconstruction atclock1e6','linear7minus3t slope','radius2 velocityhalf angularsixth1'])

def checkpoints_reference(path,grid):
    out=[];k=0;started=time.monotonic();last=started;count=0
    for s in array_stream(path,'segments'):
        count+=1
        while k<len(grid) and grid[k]<=s['t1']:
            assert grid[k]>=s['t0'];out.append(jets(s,grid[k]));k+=1
        if k==len(grid):break
        if time.monotonic()-last>30:print(json.dumps(dict(heartbeat='referencecheckpointscan',segments=count,time=s['t1'],checkpoints=k,wall_seconds=time.monotonic()-started)),flush=True);last=time.monotonic()
    assert k==len(grid),'reference horizon unavailable';return out

def checkpoints_subject(path,grid):
    out=[];k=0;previous=None;started=time.monotonic();last=started;count=0
    for q in array_stream(path,'knots'):
        count+=1
        if previous is not None and k<len(grid) and grid[k]<=q['t']:
            s=hermite(previous,q)
            while k<len(grid) and grid[k]<=q['t']:
                assert grid[k]>=previous['t'];out.append(jets(s,grid[k]));k+=1
        previous=q
        if k==len(grid):break
        if time.monotonic()-last>30:print(json.dumps(dict(heartbeat='subjectcheckpointscan',knots=count,time=q['t'],checkpoints=k,wall_seconds=time.monotonic()-started)),flush=True);last=time.monotonic()
    assert k==len(grid),'subject horizon unavailable';return out

def analyze(reference,subject,law):
    start=time.monotonic();spacing=2*math.pi/.0005/100
    grid=sorted(set([0.,10000.,100000.,250000.,500000.,750000.,1000000.]+[k*spacing for k in range(1,int(1000000/spacing)+1)]))
    ref=checkpoints_reference(reference,grid);sub=checkpoints_subject(subject,grid);rows=[]
    for t,r,s in zip(grid,ref,sub):
        rm=metrics(*r,law);sm=metrics(*s,law);rows.append(dict(t=t,reference=rm,subject=sm,x_gap=float(np.linalg.norm(r[0][:2]-s[0][:2])),v_gap=float(np.linalg.norm(r[1][:2]-s[1][:2])),a_gap=float(np.linalg.norm(r[2][:2]-s[2][:2]))))
    windows=[];faces=[0,10000,100000,250000,500000,750000,1000000]
    for lo,hi in zip(faces,faces[1:]):
        selected=[r for r in rows if lo<=r['t']<=hi];fits={}
        for name in ['reference','subject']:
            fits[name]={measure:slope([r['t'] for r in selected],[r[name][measure] for r in selected]) for measure in ['radius_cubed','angular_sixth']}
        windows.append(dict(window=[lo,hi],fits=fits,max_x_gap=max(r['x_gap'] for r in selected),max_v_gap=max(r['v_gap'] for r in selected),max_a_gap=max(r['a_gap'] for r in selected)))
    return dict(K=1,cf=1,law=law,physical_case='beta.05 radius100 omega.0005 separately compatible originalcircle-tail',reference=reference,subject=subject,grid_spacing=spacing,checkpoints=len(rows),windows=windows,face_rows=[r for r in rows if r['t'] in faces],wall_seconds=time.monotonic()-start,scope='measured distinct frozen retained histories matched in physical time; inputpatchrounding differs explicitly; no exacttrajectorytube,eventtransfer,or fiterrorinterpretation')

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--reference');p.add_argument('--subject');p.add_argument('--law',choices=['E','full'],default='E');p.add_argument('--output',required=True);a=p.parse_args();r=dict(known=known());print(json.dumps(r),flush=True)
    if a.reference:r['target']=analyze(a.reference,a.subject,a.law)
    Path(a.output).write_text(json.dumps(r,indent=2)+'\n');print(json.dumps(dict(known=r['known'],summary={k:v for k,v in r.get('target',{}).items() if k not in ['face_rows']})),flush=True)
