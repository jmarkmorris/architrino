#!/usr/bin/env python
"""Direct phase-channel/Cartesian axial certificate adjudication.

Does not import the subject or its root/projection implementations. Candidate
rectangles are inputs, not evidence. Uses outward row sums for contraction.
"""
import argparse
import hashlib
import json
from pathlib import Path
from decimal import Decimal, localcontext, ROUND_FLOOR, ROUND_CEILING
import mpmath as mp

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / '.local-data/ring-exploration/axial-adjudication'
BALANCE = ROOT / '.local-data/braid-analysis/b13-velocity-search/2026-08-29-b13-equal-radius-interval-zero-count.v1.json'
SUBJECT = ROOT / '.local-data/ring-exploration/axial/target.json'
SOURCE_HASH = 'fd83e4ea68aace450fc945e410182177c048be05a592608a865e14bc93e463af'
mp.mp.dps = 100
mp.iv.dps = 85


def digest(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def I(a,b=None): return mp.iv.mpf([a,a if b is None else b])
def lower(v): return mp.mpf(v._mpi_[0])
def upper(v): return mp.mpf(v._mpi_[1])
def fixed_sign(v): return 1 if lower(v)>0 else -1 if upper(v)<0 else 0
def binary(v): return [list(p) for p in v._mpi_]


def upper_decimal(raw):
    sign,mantissa,exponent,_ = raw
    with localcontext() as ctx:
        ctx.prec=50;ctx.rounding=ROUND_CEILING
        numerator=Decimal(-mantissa if sign else mantissa)
        return str(numerator*Decimal(1<<exponent) if exponent>=0 else numerator/Decimal(1<<-exponent))


def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True)
    record=dict(stage=stage,checker_sha256=digest(Path(__file__)),**data)
    (OUT/(stage+'.json')).write_text(json.dumps(record,indent=2)+'\n')
    print(json.dumps(dict(stage=stage,passed=data['passed'],receipt=str(OUT/(stage+'.json')))))


def phase_roots(beta,source):
    alpha=source*mp.pi/3
    g=lambda chi:2*beta*abs(mp.sin((chi-alpha)/2))-chi
    points=[mp.mpf(0),2*beta]
    for k in range(-3,4):
        zero=alpha+2*k*mp.pi
        if 0<zero<2*beta:points.append(zero)
        if beta>1:
            turning=zero+2*mp.acos(1/beta)
            if 0<turning<2*beta:points.append(turning)
    points=sorted(points);roots=[]
    for a,b in zip(points,points[1:]):
        ga,gb=g(a),g(b)
        if a==0 and source==0:ga=mp.mpf(0)
        if gb==0 and b>0:roots.append(b)
        if ga*gb>=0:continue
        for _ in range(345):
            c=(a+b)/2;gc=g(c)
            if gc*ga>0:a,ga=c,gc
            else:b=c
        roots.append((a+b)/2)
    return roots


def reconstruct(topology):
    data=json.loads(BALANCE.read_text())
    src=next(d for d in data['intervals'] if d['topologyIntervalId']==f'T{topology:02d}')
    assert len(src['zeros'])==1
    bl,bh=map(mp.mpf,src['zeros'][0]['betaBracket']);bi=I(bl,bh)
    rows=[];radial=I(0);tangent=I(0)
    for j in range(6):
        rl,rh=phase_roots(bl,j),phase_roots(bh,j)
        assert len(rl)==len(rh)
        for cl,ch in zip(rl,rh):
            brackets=[]
            for b,c in ((bl,cl),(bh,ch)):
                a,z=c-mp.mpf('1e-75'),c+mp.mpf('1e-75')
                def equation(v): return 2*I(b)*abs(mp.iv.sin((I(v)-j*mp.iv.pi/3)/2))-I(v)
                assert fixed_sign(equation(a))*fixed_sign(equation(z))==-1
                brackets.append((a,z))
            chi=I(min(v[0] for v in brackets),max(v[1] for v in brackets))
            # Reconstruct emission vector and velocity directly in Cartesian axes.
            phase=j*mp.iv.pi/3-chi
            dx,dy=1-mp.iv.cos(phase),-mp.iv.sin(phase)
            length=mp.iv.sqrt(dx*dx+dy*dy)
            nx,ny=dx/length,dy/length
            vx,vy=-bi*mp.iv.sin(phase),bi*mp.iv.cos(phase)
            D=1-nx*vx-ny*vy
            assert fixed_sign(D)!=0
            # d chi/d beta = 2 abs(sin((chi-alpha)/2))/D has one sign.
            polarity=(-1)**j
            radial+=polarity*nx/(length**2*abs(D))
            tangent+=polarity*ny/(length**2*abs(D))
            rows.append(dict(source=j,chi=chi,D=D,polarity=polarity,length=length))
    assert 6*len(rows)==src['directedRootCount']
    assert fixed_sign(radial)==-1 and lower(tangent)<=0<=upper(tangent)
    radius=-radial/bi**2
    assert fixed_sign(radius)==1
    for row in rows:
        delay=radius*row['length']
        row['delay']=delay
        row['weight']=row['polarity']/(delay**3*abs(row['D']))
    return dict(topology=topology,rows=rows,R=radius,Omega=bi/radius,radial=radial,tangent=tangent)


def characteristic(rows,sector,x,y):
    real=x*x-y*y;imag=2*x*y
    dr=2*x;di=2*y
    for row in rows:
        tau=row['delay'];w=row['weight']
        theta=sector*row['source']*mp.iv.pi/3-y*tau
        damp=mp.iv.exp(-x*tau)
        c,s=damp*mp.iv.cos(theta),damp*mp.iv.sin(theta)
        real+=w*(c-1);imag+=w*s
        dr-=w*tau*c;di-=w*tau*s
    return real,imag,dr,di


def certificate(rows,sector,z,radius,provided_rectangle=None):
    xr,yi=map(mp.mpf,z);r=mp.mpf(radius)
    X=[I(xr-r,xr+r),I(yi-r,yi+r)]
    if provided_rectangle is not None:
        X=[I(mp.mpf(tuple(v['binary'][0])),mp.mpf(tuple(v['binary'][1]))) for v in provided_rectangle]
        assert lower(X[0])<xr<upper(X[0]) and lower(X[1])<yi<upper(X[1])
    f=characteristic(rows,sector,I(xr),I(yi))
    derivatives=characteristic(rows,sector,*X)
    # An arbitrary explicit, nonzero complex reciprocal gives an invertible
    # real preconditioner. The enclosed map, not its point accuracy, proves it.
    ar=(lower(f[2])+upper(f[2]))/2;ai=(lower(f[3])+upper(f[3]))/2
    denominator=ar*ar+ai*ai;assert denominator>0
    C=[[ar/denominator,ai/denominator],[-ai/denominator,ar/denominator]]
    J=[[derivatives[2],-derivatives[3]],[derivatives[3],derivatives[2]]]
    M=[[I(int(i==j))-sum((I(C[i][l])*J[l][j] for l in range(2)),I(0)) for j in range(2)] for i in range(2)]
    displacement=[X[0]-I(xr),X[1]-I(yi)]
    image=[I(v)-sum((I(C[i][j])*f[j] for j in range(2)),I(0))+sum((M[i][j]*displacement[j] for j in range(2)),I(0)) for i,v in enumerate((xr,yi))]
    # abs on an interval and interval addition round the entire row sum out.
    row_bounds=[sum((abs(cell) for cell in row),I(0)) for row in M]
    contraction_upper=max(upper(row) for row in row_bounds)
    included=all(lower(X[i])<lower(image[i]) and upper(image[i])<upper(X[i]) for i in range(2))
    passed=included and all(upper(row)<1 for row in row_bounds)
    return dict(passed=passed,rectangle=[binary(v) for v in X],image=[binary(v) for v in image],
                row_sum_intervals=[binary(v) for v in row_bounds],
                contraction_upper=upper_decimal(max(row_bounds,key=upper)._mpi_[1]),
                center=[str(xr),str(yi)])


def control():
    # Independent analytical root in the direct chord chart.
    roots=phase_roots(mp.pi/2,0)
    assert len(roots)==1 and abs(roots[0]-mp.pi)<mp.mpf('1e-90')
    assert phase_roots(mp.mpf('.5'),0)==[]
    # Synthetic H(z)=z^2+1: tau=0, sector3/source1, w=-1/2.
    rows=[dict(source=1,weight=I('-.5'),delay=I(0))]
    known=certificate(rows,3,['0','1'],'1e-10')
    assert known['passed'] and Decimal(known['contraction_upper'])<Decimal('1e-8')
    # Independent differentiation of the Cartesian static-source kernel.
    import sympy as sp
    z=sp.symbols('z',real=True)
    assert sp.diff(z/(4+z*z)**sp.Rational(3,2),z).subs(z,0)==sp.Rational(1,8)
    # Outward interval row sums enclose the known rational contraction sum.
    row=abs(I('-.2','.3'))+abs(I('-.4','.1'))
    assert lower(row)<=mp.mpf('.7')<=upper(row)
    save('control',dict(passed=True,analytical_cases=['direct self chord beta=pi/2 -> chi=pi','beta=1/2 -> no positive self root','synthetic H=z^2+1 Krawczyk at i','static-source axial derivative 1/8','outward row sum encloses7/10'],synthetic_certificate=known))


def target():
    control_receipt=json.loads((OUT/'control.json').read_text())
    assert control_receipt['passed'] and control_receipt['checker_sha256']==digest(Path(__file__))
    assert digest(BALANCE)==SOURCE_HASH
    source=json.loads(SUBJECT.read_text());result=[]
    for t in (2,4,6):
        d=reconstruct(t);record=next(v for v in source['rows'] if v['topology']==t)
        B=sum((v['weight']*v['delay'] for v in d['rows']),I(0))
        W=sum((v['weight'] for v in d['rows']),I(0))
        pucker=-2*sum((v['weight'] for v in d['rows'] if v['source']%2),I(0))
        assert fixed_sign(B)==-1 and fixed_sign(W)==-1 and fixed_sign(pucker)==1
        # Translation and tilt are exact symmetry controls of the reconstructed
        # reference family; dependency widening is retained here.
        tilt=characteristic(d['rows'],1,I(0),d['Omega'])
        assert all(lower(v)<=0<=upper(v) for v in tilt[:2])
        certificates=[]
        for sector in record['sectors']:
            for witness in sector.get('positiveRootWitnesses',[])+sector.get('decayingRootWitnesses',[]):
                cert=certificate(d['rows'],sector['sector'],witness['root'],'1e-20',witness['certificate']['rectangle'])
                assert cert['passed']
                certificates.append(dict(sector=sector['sector'],**cert))
        assert len(certificates)>=3
        result.append(dict(topology=t,directed_roots=6*len(d['rows']),self_roots=sum(v['source']==0 for v in d['rows'])*6,
                           radius=binary(d['R']),radial=binary(d['radial']),tangential=binary(d['tangent']),drift=binary(B),signed_weight=binary(W),
                           pucker_characteristic=binary(pucker),certificates=certificates))
    save('target',dict(passed=True,balance_source_sha256=SOURCE_HASH,subject_receipt_sha256=digest(SUBJECT),rows=result,
                      scope='independent chord/Cartesian root reconstruction and outward-rounded local inclusion; no global spectral count'))


if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--stage',choices=['control','target'],required=True)
    args=parser.parse_args()
    control() if args.stage=='control' else target()
