"""Separate max-step 1/2000 actual-v8 receiving-test induction.
Kernel/domain math separately assessed; does not replay a target to prove it.
"""
import argparse,json,hashlib,importlib.util
from pathlib import Path
from fractions import Fraction as Q
def load(n):
    s=importlib.util.spec_from_file_location(n.replace('-','_'),Path(__file__).with_name('maxwell-shaped-overnight-independent-'+n+'.py'));m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
b=load('adaptive-test-check');inv=load('source-guard-check');sha=lambda p:hashlib.sha256(Path(p).read_bytes()).hexdigest()
def known():
    a=b.known();c=inv.known();rows=[dict(t=1,x=1,v=2,a=9),dict(t=2,x=2,v=3,a=4),dict(t=3,x=3,v=4,a=7)];ix,z=inv.inventory(rows,1,1);assert ix==[0,1] and z['a']==9
    assert 3*(Q('.0024955')+Q('.0002')+Q('.0024955'))>2*(4*Q('1/2000')+Q('1e-8'))+Q('1e-8')
    return dict(passed=True,majorant=a,inventory=c,cases=['exact whole-source seam bins before receiving test','max-step1/2000 internal defect bracket support'])
def analyze(path):
    r=json.loads(Path(path).read_text());c=r['case'];assert c['law']=='full' and c['K']==c['cf']==1 and sha(c['input'])==c['inputSHA'] and sha(c['prefix'])==c['prefixSHA'] and sha(c['prefix']+'.jsonl')==c['prefixRowsSHA']
    p=json.loads(Path(c['prefix']).read_text());rows=list(map(json.loads,Path(c['prefix']+'.jsonl').read_text().splitlines()));assert p['firstFailure'] is None and Q(p['horizon'])==Q(c['Tc'])
    ex,ev=map(Q,[p['final']['x'],p['final']['v']]);assert ex==Q(c['initialErrors']['x']) and ev==Q(c['initialErrors']['v']);left=Q(c['Tc']);guard=c['sourceGuard'];saved=json.loads(Path(c['input']).read_text());curve=b.Curve(saved['knots'],c['jetMid'])
    for row in r['rows']:
        dt=Q(row['dt']);assert Q(row['left'])==left and Q(row['right'])==left+dt and 0<dt<=Q('1/2000');W=row['initialSource'];S=row['source'];assert Q(guard['lo'])<Q(W['lo'])<=Q(S['lo'])<=Q(S['hi'])<=Q(W['hi'])<Q(c['Tc'])
        ix,z=inv.inventory(rows,W['lo'],W['hi']);z['x']=max(z['x'],Q(p['pastMismatch'][0]));z['v']=max(z['v'],Q(p['pastMismatch'][1]));assert [k+1 for k in ix]==row['sourceBins'] and z=={k:Q(v) for k,v in row['sourceErrors'].items()}
        co=row['coefficients'];C,Lv,La,de=[Q(co[k]) for k in ['Cx','Lv','La','defect']];assert min(C,Lv,La,de)>=0;f=C*z['x']+Lv*z['v']+La*z['a']+de
        x,v=b.majorant(ex,ev,C,f,dt);nx,nv=Q(row['errors']['x']),Q(row['errors']['v']);assert x.b<=b.IQ(nx).a and v.b<=b.IQ(nv).a
        rx,rv=Q(row['localExpansion']['x']),Q(row['localExpansion']['v']);assert rx==ex+Q(c['localSlack']['x']) and rv==ev+Q(c['localSlack']['v']) and nx<rx and nv<rv and nx<Q(c['radii']['x']) and nv<Q(c['radii']['v'])
        for k in ['D','Dclock','R']:assert Q(row[k]['lo'])>0
        assert Q(row['clearance'])>0 and left-Q(S['hi'])>0;ex,ev,left=nx,nv,left+dt
    assert len(r['rows'])==r['acceptedCells'] and left==Q(r['reached']) and ex==Q(r['finalErrors']['x']) and ev==Q(r['finalErrors']['v'])
    result=dict(acceptedInduction=True,cells=len(r['rows']),reached=str(left),receiptSHA=sha(path),scope='conditional no-earlier-unit error induction with admitted original source prefix; separate field/domain math premises')
    if r['failure'] is not None:
        assert r['speedGap'] is None and not r['passed'] and Q(r['failure']['left'])==left;result['fate']='no terminal event conclusion from partial failure'
    else:
        assert left==Q(c['Tf']);gap=b.k.norm(curve.box(left,left,1))-b.IQ(ev)-1;result['independentSpeedGap']=b.k.encode(gap)
        if r['passed']:assert gap.a>0 and Q(r['speedGap'])>0
        result['incomingCriterion']=r['passed'];result['transversePremise']=r['transverse']
    return result
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--receipt');p.add_argument('--output',required=True);a=p.parse_args();out=dict(known=known());print(json.dumps(out),flush=True)
    if a.receipt:out['target']=analyze(a.receipt)
    Path(a.output).write_text(json.dumps(out,indent=2)+'\n');print(json.dumps(out),flush=True)
