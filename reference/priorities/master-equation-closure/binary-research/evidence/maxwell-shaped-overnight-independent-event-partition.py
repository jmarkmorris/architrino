"""Finite position-box partition around unchanged frozen potential AD kernel.
A failed coarse box remains retained. This enclosure refinement alters no
physical case, field formula, or reference implementation.
"""
import argparse,importlib.util,itertools,json
from fractions import Fraction as Q
from pathlib import Path
p=Path(__file__).with_name('maxwell-shaped-overnight-independent-event-kernel.py');s=importlib.util.spec_from_file_location('frozen_event_kernel',p);k=importlib.util.module_from_spec(s);s.loader.exec_module(k)

def halves(pair):
    lo,hi=map(Q,pair);mid=(lo+hi)/2
    return [[lo,mid],[mid,hi]]
def interval(pair):
    a,b=pair;lo=k.I(a.numerator)/a.denominator;hi=k.I(b.numerator)/b.denominator
    return k.iv.mpf([lo.a,hi.b])
def pair(x):return list(map(Q,x)) if isinstance(x,list) else [Q(x),Q(x)]
def partitions(inputs):
    pairs={name:list(map(pair,inputs[name])) for name in ['x','u','source','v','a']}
    axes=[('x',0),('x',1),('source',0),('source',1)]
    for choices in itertools.product([0,1],repeat=4):
        selected={name:[z[:] for z in arr] for name,arr in pairs.items()}
        for (name,i),choice in zip(axes,choices):selected[name][i]=halves(pairs[name][i])[choice]
        yield {name:[interval(z) for z in arr] for name,arr in selected.items()},choices

def known():
    assert halves(['-1','1'])==[[Q(-1),Q(0)],[Q(0),Q(1)]]
    inputs=dict(x=[['-1','1'],['2','4'],'0'],source=[['3','5'],['-2','2'],'0'],u=['0']*3,v=['0']*3,a=['0']*3)
    boxes=list(partitions(inputs));assert len(boxes)==16 and len(set(c for _,c in boxes))==16
    for name,i in [('x',0),('x',1),('source',0),('source',1)]:
        h=halves(inputs[name][i]);assert h[0][0]==Q(inputs[name][i][0]) and h[0][1]==h[1][0] and h[1][1]==Q(inputs[name][i][1])
    return dict(passed=True,kernel=k.known(),cases=['exact twohalf union including midpoint','all16 independent positionhalf combinations cover Cartesian input box'])
def target(path):
    spec=json.loads(Path(path).read_text());assert spec['K']==spec['cf']==1;rows=[]
    for inputs,choices in partitions(spec['field_inputs']):
        f=k.field(**inputs,polarity=spec['field_inputs']['polarity']);A=k.norm(f['full']);rows.append(dict(choices=choices,work=k.encode(f['work']),fullNorm=k.encode(A),R=k.encode(f['R']),D=k.encode(f['D'])))
    return dict(partitions=rows,work_lower=str(min(Q(r['work']['lo']) for r in rows)),norm_upper=str(max(Q(r['fullNorm']['hi']) for r in rows)),scope='uniform positionhalf partition through unchanged separately frozen potential kernel; source/history prefix premises remain external')
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--inputs');p.add_argument('--output',required=True);a=p.parse_args();r=dict(known=known());print(json.dumps(r),flush=True)
    if a.inputs:r['target']=target(a.inputs)
    Path(a.output).write_text(json.dumps(r,indent=2)+'\n');print(json.dumps({**r,'target':{x:y for x,y in r.get('target',{}).items() if x!='partitions'}}),flush=True)
