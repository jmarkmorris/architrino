"""Exact retained-trial departure feasibility only; no actual-solution claim."""
from pathlib import Path
import importlib.util,json,sys,hashlib
p=Path(__file__).with_name('authorized-cases-ten-hour-e-trial-v2.py')
assert hashlib.sha256(p.read_bytes()).hexdigest()=='e4d089f42cc64b74ff100031d0d45ce081acca7515d5cce8ac2cb12fab897528'
s=importlib.util.spec_from_file_location('obs_trial',p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
j=m.j;I,iv,mp=j.I,j.iv,j.mp

def observable(x,rupper):
    A=j.sub(x[0],x[2]);B=j.sub(x[1],x[3]);H=j.dot(A,B)
    distance=abs(H)/(2*j.norm(B)+4*rupper)
    return H,distance

def known():
    x=[[I('1.1'),I('.07'),I('.13')],[I(0),I(1),I(0)],[I(-1),I(0),I(0)],[I(0),I(-1),I(0)]]
    H,d=observable(x,I(1));assert j.contains(H,mp.mpf(7)/50);assert j.contains(d,mp.mpf(7)/400)
    return {'passed':True,'control':'exact rational H=7/50, distance lower bound7/400'}
if __name__=='__main__':
    if sys.argv[1:]==['--known']:print(json.dumps(known()));sys.exit()
    known_result=known();trial=m.Trial(sys.argv[1]);rstar=iv.mpf(['2.55921061613','2.55921061616'])
    initial=trial.eps*trial.r*iv.sqrt(I('3.18'))+abs(trial.r-rstar)
    rows=[]
    for t in ['0','10','12','15','20','25.59210616145']:
        x=[[a.c[0] for a in trial.point(i,mp.mpf(t))[0]] for i in range(4)]
        H,d=observable(x,I(j.upper(rstar)));budget=d-2*I(j.upper(initial))
        rows.append({'T':t,'H':j.bound(H),'distanceLower':j.bound(d)[0],'initialDistanceUpper':j.bound(initial)[1],'ratioLower':j.bound(d/I(j.upper(initial)))[0],'positionErrorBudgetForTwofold':j.bound(budget)[0]})
    out={'claim':'exact trial observable feasibility; actual solution still requires error certificate','known':known_result,'inputSha256':hashlib.sha256(Path(sys.argv[1]).read_bytes()).hexdigest(),'rows':rows}
    assert not Path(sys.argv[2]).exists();Path(sys.argv[2]).write_text(json.dumps(out,indent=2));print(json.dumps(out,indent=2))
