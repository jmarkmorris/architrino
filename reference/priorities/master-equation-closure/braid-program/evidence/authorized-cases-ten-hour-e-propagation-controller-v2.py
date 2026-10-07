"""Stateful finite propagation over immutable, contiguous residual rows.
No standalone target runner and no scientific acceptance from stream completion.
"""
from pathlib import Path
import importlib.util,hashlib,json,sys
from datetime import datetime,timezone
PATH=Path(__file__).with_name('authorized-cases-ten-hour-e-propagation-geometry.py')
GEOMETRY_SHA='bd12fbb0a60d7b6ca2d264f46570be9b8ce7cd7912c0e8f8bc194e5f05155c5c'
assert hashlib.sha256(PATH.read_bytes()).hexdigest()==GEOMETRY_SHA
sp=importlib.util.spec_from_file_location('e_controller_geometry',PATH);g=importlib.util.module_from_spec(sp);sp.loader.exec_module(g)
I,iv,mp=g.I,g.iv,g.mp

class Propagation:
    def __init__(self,trial,xcap,vcap,gamma=I(1)/16,terminal=None):
        self.trial=trial;self.xcap=I(xcap);self.vcap=I(vcap);self.gamma=I(gamma)
        self.terminal=mp.mpf(terminal) if terminal is not None else trial.times[-1]
        assert self.terminal>0 and self.terminal<=trial.times[-1]
        assert min(g.lower(self.xcap),g.lower(self.vcap),g.lower(self.gamma))>0
        self.records=[];self.results=[];self.radii=[I(0)]*4
    def seed_accepted_pilot(self):
        assert not self.records and not self.results
        assert g.lower(self.gamma)==g.upper(self.gamma)==mp.mpf(1)/16
        assert self.terminal>=self.trial.times[3]
        ex,ev,ea,r=map(I,('1.308e-11','3.270e-12','3.352e-10','5e-12'))
        assert g.upper(iv.sqrt(self.gamma*ex**2+ev**2))<g.lower(r)
        assert g.upper(ex)<g.lower(self.xcap) and g.upper(ev)<g.lower(self.vcap)
        for k in range(3):
            errors=[{'position':ex,'velocity':ev,'acceleration':ea,'radius':r} for _ in range(4)]
            self.records.append({'left':self.trial.times[k],'right':self.trial.times[k+1],'errors':errors})
            self.results.append({'segment':k,'independentSeed':True,
                'assessmentSha256':'1fe5355e223fd34a654cae1de67bd4f72bc011e10abd8f0923ce7fbcf2bea832',
                'left':g.bound(I(self.trial.times[k])),'right':g.bound(I(self.trial.times[k+1])),
                'errors':[{key:g.bound(value) for key,value in e.items()} for e in errors]})
        self.radii=[r]*4
    def advance(self,k,row):
        assert k==len(self.records),'residual rows must be contiguous original segments from zero'
        left,next_face=self.trial.times[k:k+2];right=min(next_face,self.terminal)
        assert left<right,'terminal reception face reached'
        assert g.lower(I(row['left']))<=left<=g.upper(I(row['left']))
        assert g.lower(I(row['right']))<=right<=g.upper(I(row['right']))
        assert len(row['memberRho'])==4 and len(row['rootMid'])==4
        for i,roots in enumerate(row['rootMid']):assert set(roots)=={str(j) for j in range(4) if j!=i}
        Tbox=iv.mpf([left,right]);width=I(right)-I(left)
        geom,margins=g.geometry(self.trial,k,Tbox,row['rootMid'],self.xcap,self.vcap,self.records,left,self.gamma)
        errors=[];members=[];radii=[]
        for i,member in enumerate(geom):
            rho=I(row['memberRho'][i]);assert g.lower(rho)>=0
            forcing=rho+member['sourceForcing']
            out=g.p.step(self.radii[i],forcing,width,member['coefficients'])
            assert g.upper(out['position'])<g.lower(self.xcap) and g.upper(out['velocity'])<g.lower(self.vcap),'current bootstrap cap failed'
            errors.append(out);radii.append(out['radius'])
            members.append({'errors':{key:g.bound(v) for key,v in out.items()},
                            'coefficients':{key:g.bound(v) for key,v in member['coefficients'].items()},
                            'residual':g.bound(rho),'sourceForcing':g.bound(member['sourceForcing']),
                            'totalForcing':g.bound(forcing),'sourceContributions':member['sources']})
        # Mutation occurs only after all four caps pass. A failed row leaves
        # the previously completed prefix untouched and cannot be skipped.
        self.radii=radii
        self.records.append({'left':left,'right':right,'errors':errors})
        result={'segment':k,'left':g.bound(I(left)),'right':g.bound(I(right)),'margins':margins,'members':members,
                'residualRowSha256':hashlib.sha256(json.dumps(row,sort_keys=True,separators=(',',':')).encode()).hexdigest()}
        self.results.append(result);return result
    def export(self):
        return {'completedCells':len(self.records),'terminalFace':g.bound(I(self.terminal)),'caps':{'position':g.bound(self.xcap),'velocity':g.bound(self.vcap)},
                'gamma':g.bound(self.gamma),'rows':self.results,
                'boundary':'subject prefix only; input identities, complete root proof and output assessment belong to admitted caller'}

def known():
    J=g.J
    class Static:
        times=[mp.mpf(0),mp.mpf('.001'),mp.mpf('.002')];delta=I(1)
        points=[[I(1),I(0),I(0)],[I(0),I(1),I(0)],[I(-1),I(0),I(0)],[I(0),I(-1),I(0)]]
        def region(self,S):return ('circle',0)
        def state(self,i,T,region):return [[J(x,T.n) for x in self.points[i]],[J(0,T.n)]*3,[J(0,T.n)]*3]
    trial=Static();run=Propagation(trial,'.1','.1')
    def row(k,terminal=None):
        left,right=trial.times[k:k+2]
        if terminal is not None:right=min(right,mp.mpf(terminal))
        mid=(left+right)/2
        roots=[{str(j):g.bound(I(mid)-g.norm(g.p.vs(trial.points[i],g.p.neg(trial.points[j])))) for j in range(4) if i!=j} for i in range(4)]
        return {'left':g.bound(I(left)),'right':g.bound(I(right)),'memberRho':['1']*4,'rootMid':roots}
    run.advance(0,row(0));run.advance(1,row(1))
    assert len(run.records)==2
    for r in run.radii:assert mp.mpf('.002')<=g.upper(r)<mp.mpf('.0022')
    assert all(g.upper(member['acceleration'])>=1 for rec in run.records for member in rec['errors'])
    # Ordering guard is independent of numerical comparison formulas.
    try:Propagation(trial,'.1','.1').advance(1,row(1))
    except AssertionError:pass
    else:raise AssertionError('noncontiguous row accepted')
    # Deliberately insufficient caps must not publish a partial receiver row.
    bad=Propagation(trial,'1e-6','1e-6')
    try:bad.advance(0,row(0))
    except AssertionError:pass
    else:raise AssertionError('insufficient cap accepted')
    assert not bad.records and not bad.results
    clipped=Propagation(trial,'.1','.1',terminal='.0015')
    clipped.advance(0,row(0));clipped.advance(1,row(1,'.0015'))
    assert clipped.records[-1]['right']==mp.mpf('.0015')
    for r in clipped.radii:assert mp.mpf('.0015')<=g.upper(r)<mp.mpf('.0017')
    # Seed control checks only norm conversion and record construction;
    # physical admission of these constants is the pinned independent theorem.
    class SeedTrial:times=[mp.mpf(i)/1000 for i in range(5)]
    seeded=Propagation(SeedTrial(),'1e-3','1e-3');seeded.seed_accepted_pilot()
    assert len(seeded.records)==3 and all(g.lower(r)<=mp.mpf('5e-12')<=g.upper(r) for r in seeded.radii)
    report={'passed':True,'time':datetime.now(timezone.utc).isoformat(),'instrumentSha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),
            'geometrySha256':GEOMETRY_SHA,'cases':['two contiguous static-source forced comparison cells','acceleration error retained','noncontiguous row rejection','cap failure leaves completed prefix unchanged','exact clipped terminal cell','independent pilot seed norm conversion'],
            'scope':'controller controls only; no retained trial target'}
    Path(__file__).with_name('authorized-cases-ten-hour-e-propagation-controller-v2-known.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report,indent=2))
if __name__=='__main__':
    assert sys.argv[1:]==['--known'];known()
