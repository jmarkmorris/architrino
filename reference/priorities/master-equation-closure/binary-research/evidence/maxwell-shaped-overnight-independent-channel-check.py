"""Known-first independent Fraction positive-transfer channel enclosure."""
import argparse,json,hashlib
from pathlib import Path
from fractions import Fraction as Q
N=10**24
names=['initialX','initialV','sourceX','sourceV','sourceA','comparisonDefect','upwardRounding']
def rnd(q,up):
    x=q*N;n=x.numerator//x.denominator
    if up and x.denominator!=1:n+=1
    return Q(n,N)
def step(x,v,C,c,h):
    assert min(x,v,C,c,h)>=0;den=1-h*h*C;assert den>0
    return [(x+h*v+h*h*c)/den,(v+h*C*x+h*c)/den]
def known():
    a=step(Q('.01'),Q('.02'),Q(2),Q('.03'),Q('.1'));b=step(Q('.02'),Q('.03'),Q(2),Q('.04'),Q('.1'));s=step(Q('.03'),Q('.05'),Q(2),Q('.07'),Q('.1'))
    assert s==[Q(357,9800),Q(63,980)] and [a[i]+b[i] for i in range(2)]==s
    assert rnd(Q(1,3),False)<=Q(1,3)<=rnd(Q(1,3),True)
    return {'passed':True,'cases':['independent rational forced transfer','exact channel additivity','directed thirds grid']}
def analyze(path):
    b=Path(path).read_bytes();r=json.loads(b);assert not r['passed'] and r['terminal']=='declared error tube failed' and r['speedGap'] is None
    incoming=[Q('.005'),Q('.01')];ch={n:[[Q(0),Q(0)],[Q(0),Q(0)]] for n in names};ch['initialX'][0]=[incoming[0]]*2;ch['initialV'][1]=[incoming[1]]*2;t=Q('38.3');last=None
    for k,row in enumerate(r['rows']):
        co=row['exactCoefficients'];C,h=Q(co['Cx']),Q(co['dt']);f=[Q(0),Q(0),C*Q('.005'),Q(co['Lv'])*Q('.005'),Q(co['La'])*Q('.03'),Q(co['defect']),Q(0)]
        raw=step(*incoming,C,sum(f),h);new=[Q(row['exactErrors'][key]) for key in ['x','v']];pulse=[new[i]-raw[i] for i in range(2)];assert all(0<=p<Q(1,N) for p in pulse)
        for n,force in zip(names,f):
            z=ch[n];lo=step(z[0][0],z[1][0],C,force,h);hi=step(z[0][1],z[1][1],C,force,h)
            ch[n]=[[rnd(lo[i]+(pulse[i] if n=='upwardRounding' else 0),False),rnd(hi[i]+(pulse[i] if n=='upwardRounding' else 0),True)] for i in range(2)]
        for i in range(2):assert sum(ch[n][i][0] for n in names)<=new[i]<=sum(ch[n][i][1] for n in names)
        assert Q(row['localExpansion']['x'])==incoming[0]+Q('.0001') and Q(row['localExpansion']['v'])==incoming[1]+Q('.001')
        accepted=new[0]<min(Q('.03'),Q(row['localExpansion']['x'])) and new[1]<min(Q('.15'),Q(row['localExpansion']['v']))
        assert accepted==(k<len(r['rows'])-1);t+=h;incoming=new
        last={'cell':k+1,'time':str(t),'total':list(map(str,new)),'channels':{n:[[str(v) for v in z] for z in ch[n]] for n in names}}
    assert t==Q(r['exactWitness']['reached'])
    return {'acceptedDiagnostic':True,'input':path,'sha256':hashlib.sha256(b).hexdigest(),'acceptedCells':len(r['rows'])-1,'failedCandidate':last,'scope':'fixed positive proof-bound channels only; no actual error/fate attribution'}
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--receipt');p.add_argument('--output',required=True);a=p.parse_args();r={'known':known()};print(json.dumps(r),flush=True)
    if a.receipt:r['target']=analyze(a.receipt)
    Path(a.output).write_text(json.dumps(r,indent=2)+'\n');print(json.dumps({k:v if k!='target' else {j:x for j,x in v.items() if j!='failedCandidate'} for k,v in r.items()}),flush=True)
