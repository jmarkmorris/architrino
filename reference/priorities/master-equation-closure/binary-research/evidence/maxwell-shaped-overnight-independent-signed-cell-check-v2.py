"""Independent potential-Jacobian scalar assessment of one signed-cell case.
Preserves subject matrix propagator and independent potential reference.
Uniform kernel inputs are supplied boxes; root/true-prefix admission is separate.
"""
import argparse,json,importlib.util,hashlib
from pathlib import Path
from fractions import Fraction as Q
def load(name):
    p=Path(__file__).with_name('maxwell-shaped-overnight-independent-'+name+'.py');s=importlib.util.spec_from_file_location(name.replace('-','_'),p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
j=load('signed-potential-jacobian');a=load('adaptive-test-check');iv=j.iv
def IQ(q):q=Q(q);return iv.mpf(q.numerator)/iv.mpf(q.denominator)
def I(z):return iv.mpf([IQ(z['lo']).a,IQ(z['hi']).b]) if isinstance(z,dict) else IQ(z)
def vec(z):return list(map(I,z))+[IQ(0)]
def norm_matrix(M):
    # Frobenius bound independently encloses operator norm, no subject SVD used.
    # Multiplying a sign-crossing interval by itself would admit negative
    # values; independently use the maximum endpoint absolute magnitude.
    upper=[max(abs(x.a),abs(x.b)) for row in M[:2] for x in row[:2]]
    return iv.sqrt(sum(x*x for x in upper))
def known():
    b=j.known();c=a.known();M=[[IQ('.25'),IQ(0)],[IQ(0),IQ('-.125')]];n=norm_matrix(M)
    assert n.a>IQ('.2795').b and n.b<IQ('.2796').a
    assert norm_matrix([[IQ(0)]*2]*2).a==0
    cross=iv.mpf([-1,1]);assert norm_matrix([[cross,IQ(0)],[IQ(0),IQ(0)]]).a==1
    return dict(passed=True,potential=b,majorant=c,cases=['static Frobenius operator bound','zero matrix bound','sign-crossing interval square bound','exact rational interval-input export'])
def analyze(path):
    receipt=json.loads(Path(path).read_text());c=receipt['case'];assert c['law']=='full' and c['K']==c['cf']==1
    assert hashlib.sha256(Path(c['input']).read_bytes()).hexdigest()==c['SHA256']
    z=receipt['inputBoxes'];r,v,ac,js,u=[vec(z[x]) for x in ['r','comparisonV','comparisonA','comparisonJ','actualU']]
    nominal=j.matrices(r,v,ac,u,'full',-1,js)
    offset=j.matrices(r,vec(z['actualConvexV']),vec(z['actualConvexA']),u,'full',-1)
    C,Lv,La=[norm_matrix(M).b for M in [nominal['AX'],offset['Fv'],offset['Fa']]]
    h=Q(c['Tf'])-Q(c['Tc']);ex,ev=[Q(c['initial'][x]) for x in ['x','v']];rx,rv=[Q(c['proposed'][x]) for x in ['x','v']]
    def exact_upper(x):
        s,m,e,_=x._mpi_[1];return Q((-1 if s else 1)*m)*Q(2)**e
    C,Lv,La=map(exact_upper,[C,Lv,La]);px,pv,pa=[Q(c['sourceErrors'][x]) for x in ['x','v','a']]
    forcing=C*px+Lv*pv+La*pa+Q(receipt['defect']);nx,nv=a.majorant(ex,ev,C,forcing,h)
    # Positive scalar majorants are monotone; endpoint bounds cover whole cell.
    return dict(accepted=nx.b<IQ(rx).a and nv.b<IQ(rv).a,receiptSHA=hashlib.sha256(Path(path).read_bytes()).hexdigest(),C=str(C),Lv=str(Lv),La=str(La),wholeErrors=dict(x=j.encode(nx),v=j.encode(nv)),nominal=j.encode(nominal),offset=j.encode(offset),scope='independent uniform potential derivatives and Frobenius scalar majorant on supplied complete-family boxes; no actual prefix')
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--receipt');p.add_argument('--output',required=True);arg=p.parse_args();out=dict(known=known());print(json.dumps(out),flush=True)
    if arg.receipt:out['target']=analyze(arg.receipt)
    Path(arg.output).write_text(json.dumps(out,indent=2)+'\n');print(json.dumps({**out,'target':{k:v for k,v in out.get('target',{}).items() if k not in ['nominal','offset']}}),flush=True)
