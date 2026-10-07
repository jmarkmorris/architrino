"""Whole-cell source-window geometry for finite error propagation.
No target runner. Known controls precede any external target use.
"""
from pathlib import Path
import importlib.util,hashlib,json,sys
from datetime import datetime,timezone
HERE=Path(__file__).resolve().parent
FILES={
 'prop':('authorized-cases-ten-hour-e-propagation.py','a1b850177383f0aa2fff17e6014b9e3305f9240010b33a25c8b480b0533284ba'),
 'residual':('authorized-cases-ten-hour-e-residual-v3.py','1aea647e4f61c9cc9636e54119c581f6a013352930c1569e6d905ae5661cbee0')}
mods={}
for name,(file,digest) in FILES.items():
    path=HERE/file;assert hashlib.sha256(path.read_bytes()).hexdigest()==digest
    spec=importlib.util.spec_from_file_location('e_geometry_'+name,path);mod=importlib.util.module_from_spec(spec);spec.loader.exec_module(mod);mods[name]=mod
p,res=mods['prop'],mods['residual'];I,J,iv,mp=res.I,res.J,res.iv,res.mp
lower,upper,bound=p.lower,p.upper,p.bound

def norm(v):return iv.sqrt(sum((x**2 for x in v),I(0)))
def expand(v,cap):return [x+iv.mpf([-upper(cap),upper(cap)]) for x in v]
def hull_vectors(vs):return [res.j.hull([v[k] for v in vs]) for k in range(3)]
def source_jets(trial,i,window):
    pieces=[trial.state(i,J([piece,I(1)]),region) for piece,region in res.source_windows(trial,window)]
    assert pieces,'source window must have positive width'
    jets=[hull_vectors([[q[d][k].c[0] for k in range(3)] for q in pieces]) for d in range(3)]
    jets.append(hull_vectors([[q[2][k].c[1] for k in range(3)] for q in pieces]))
    return jets

def history_errors(records,source,window,face):
    """records have exact left/right times and four uniform X/V/A error maps.
    Their positive-time intervals must cover [0,face] without gaps.
    """
    assert upper(window)<face,'source window is not completed'
    if upper(window)<=0:return [I(0)]*3
    covered=mp.mpf(0);values=[]
    for row in records:
        assert row['left']==covered and row['right']>covered,'history coverage gap'
        covered=row['right']
        if row['right']>=lower(window) and row['left']<=upper(window):
            values.append([row['errors'][source][key] for key in ('position','velocity','acceleration')])
    assert covered==face,'completed history does not reach receiving face'
    assert values,'positive source window missed completed cells'
    return [p.positive_bound(p.max_upper([v[k] for v in values])) for k in range(3)]

def geometry(trial,k,Tbox,roots,xcap,vcap,records,face,gamma=I(1)/16):
    """Root midpoints correspond to the exact receiving cell midpoint.
    Nominal trial speeds over the complete prefix/past must be <.6.
    Every previous completed position error must be <xcap.
    """
    rad=(I(upper(Tbox))-I(lower(Tbox)))/2
    values=[trial.state(i,J([Tbox,I(1)]),('poly',k)) for i in range(4)]
    xx=[[x.c[0] for x in q[0]] for q in values];vv=[[v.c[0] for v in q[1]] for q in values]
    actual_speed=p.max_upper([norm(v) for v in vv])+vcap
    assert upper(actual_speed)<mp.mpf('.6')
    separation=min([norm(p.vs(xx[i],p.neg(xx[j])))-2*xcap for i in range(4) for j in range(i)],key=lower)
    assert lower(separation)>0
    for row in records:
        assert all(upper(e['position'])<lower(xcap) and upper(e['velocity'])<lower(vcap) for e in row['errors'])
    outputs=[];ranges=[];denominators=[];sources=[]
    for i in range(4):
        rows=[];signs=[];forcing=I(0);source_rows=[]
        receiver_x=expand(xx[i],xcap);receiver_v=expand(vv[i],vcap)
        for src in range(4):
            if i==src:continue
            mid=I(roots[i][str(src)])
            reach=4*rad+xcap/I('.4')
            current=mid+iv.mpf([-upper(reach),upper(reach)])
            reach=4*rad+2*xcap/I('.4')
            complete=mid+iv.mpf([-upper(reach),upper(reach)])
            assert upper(complete)<face
            sx,sv,sa,sj=source_jets(trial,src,current)
            R=Tbox-current;n=[(x-y)/R for x,y in zip(receiver_x,sx)]
            row=p.jacobian(R,n,sv,sa,sj,receiver_v)
            rows.append(row);signs.append((-1)**(i+src))
            ranges.append(R);denominators.append(row['D']);sources.append(complete)
            ex,ev,ea=history_errors(records,src,complete,face)
            assert upper(ex)<lower(xcap) and upper(ev)<lower(vcap)
            if max(upper(e) for e in (ex,ev,ea))>0:
                tx,tv,ta,tj=source_jets(trial,src,complete)
                # Actual and auxiliary tuple endpoints lie in this box; the
                # box is convex, so it contains their independent-input segment.
                RR=Tbox-complete;nn=[(x-y)/RR for x,y in zip(receiver_x,expand(tx,ex))]
                partial=p.jacobian(RR,nn,expand(tv,ev),expand(ta,ea),[I(0)]*3,receiver_v)
                coeff=p.source_from_partials(partial,I('.6'),I(lower(RR)),I(upper(norm(ta))),I(upper(norm(tj))))
                defect=sum((coeff[key]*e for key,e in zip(('Px','Pv','Pa'),(ex,ev,ea))),I(0))
                forcing+=defect
                source_rows.append({'source':src,'window':bound(complete),'errors':[bound(e) for e in (ex,ev,ea)],
                                    'coefficients':{key:bound(v) for key,v in coeff.items()},'forcing':bound(defect)})
                ranges.append(RR);denominators.append(partial['D'])
        A,B=p.signed_sum(rows,signs);coeff=p.block_coefficients(A,B,gamma)
        outputs.append({'coefficients':coeff,'sourceForcing':p.positive_bound(forcing),'sources':source_rows,'Jx':A,'Ju':B})
    return outputs,{'speed':bound(actual_speed),'separation':bound(separation),
                    'range':bound(min(ranges,key=lower)),'denominator':bound(min(denominators,key=lower)),
                    'latestSource':bound(max(sources,key=upper))}

def known():
    def err(a):return {'position':I(a),'velocity':I(a)*2,'acceleration':I(a)*3}
    rec=[{'left':mp.mpf(0),'right':mp.mpf('.1'),'errors':[err('.001')]*4},
         {'left':mp.mpf('.1'),'right':mp.mpf('.2'),'errors':[err('.002')]*4}]
    got=history_errors(rec,2,iv.mpf(['-.1','.15']),mp.mpf('.2'))
    for a,q in zip(got,['.002','.004','.006']):assert lower(a)<=mp.mpf(q)<=upper(a)
    assert all(upper(x)==0 for x in history_errors([],0,iv.mpf(['-1','-.5']),mp.mpf(0)))
    try:history_errors([rec[1]],0,iv.mpf(['.11','.15']),mp.mpf('.2'))
    except AssertionError:pass
    else:raise AssertionError('gap was not rejected')
    class Seam:
        delta=I(1);times=[mp.mpf(0),mp.mpf(1)]
        def region(self,S):return ('circle',0) if upper(S)<0 else ('poly',0)
        def state(self,i,T,region):
            z=J(0,T.n)
            if region[0]=='circle':return [[z,z,z],[z,z,z],[z,z,z]]
            return [[T**3/6,z,z],[T*T/2,z,z],[T,z,z]]
    jets=source_jets(Seam(),0,iv.mpf(['-.1','.1']))
    for got,q in zip(jets,['0.0001666666666666666666666666666666666667','.005','.1','1']):
        assert lower(got[0])<=0 and upper(got[0])>=mp.mpf(q)-mp.mpf('1e-39')
    report={'passed':True,'time':datetime.now(timezone.utc).isoformat(),'instrumentSha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),
            'cases':['local completed-history maxima','exact supplied past has zero error','history gap rejection','C2 cubic source seam with jerk union'],
            'scope':'source-window and error-transport controls only; target geometry needs admission'}
    (HERE/'authorized-cases-ten-hour-e-propagation-geometry-known.json').write_text(json.dumps(report,indent=2)+'\n')
    print(json.dumps(report,indent=2))
if __name__=='__main__':
    assert sys.argv[1:]==['--known'];known()
