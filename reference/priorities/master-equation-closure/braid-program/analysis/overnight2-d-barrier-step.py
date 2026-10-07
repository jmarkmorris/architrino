"""Outward scalar comparison step for nonnegative constant growth and forcing.
Only the returned upper endpoint is used as a comparison allowance.
"""
import importlib.util,json,math
from fractions import Fraction as F
from pathlib import Path
HERE=Path(__file__).resolve().parent
s=importlib.util.spec_from_file_location('iv',HERE/'overnight-d-tail-interval-independent-check.py');iv=importlib.util.module_from_spec(s);s.loader.exec_module(iv);I=iv.I

def factors(x,terms=18):
    x=I.of(x)
    if x.lo<0 or x.hi>=1:raise ValueError('comparison step requires 0 <= growth times width < 1')
    if not isinstance(terms,int)or terms<1:raise ValueError('positive term count required')
    expterm=I(1.);phiterm=I(1.);expsum=expterm;phisum=phiterm
    for k in range(1,terms+1):
        expterm=expterm*x/k;phiterm=phiterm*x/(k+1);expsum=expsum+expterm;phisum=phisum+phiterm
    erem=(expterm*x/(terms+1))/(1-x/(terms+2));prem=(phiterm*x/(terms+2))/(1-x/(terms+3))
    return I(expsum.lo,(expsum+erem).hi),I(phisum.lo,(phisum+prem).hi)

def step(initial,growth,forcing,width):
    initial,growth,forcing,width=map(I.of,[initial,growth,forcing,width])
    if min(float(v.lo)for v in [initial,growth,forcing,width])<0:raise ValueError('nonnegative comparison inputs required')
    e,phi=factors((growth*width).nonnegative());value=e*initial+width*phi*forcing
    return I(float(value.hi))

def controls():
    iv.controls()
    for xx in ['0','.01','.5','.99']:
        x=F(xx);input=I.decimal(xx);ee,ph=factors(input)
        for shift,out in [(0,ee),(1,ph)]:
            low=sum(x**k/F(math.factorial(k+shift))for k in range(60))
            high=low+x**60/F(math.factorial(60+shift))/(1-x/F(61+shift))
            if not F.from_float(float(out.lo))<=low<=high<=F.from_float(float(out.hi)):raise RuntimeError('rational factorial-series control')
    got=step(I(4.),I(2.),I(3.),I(.25));x=F(1,2)
    e=sum(x**k/F(math.factorial(k))for k in range(60));er=x**60/F(math.factorial(60))/(1-x/61)
    upper=F(11,2)*(e+er)-F(3,2)
    if F.from_float(float(got.hi))<upper:raise RuntimeError('constant forcing solution control')
    z=step(2,0,3,.5)
    if not 3.5<=z.hi<3.5+1e-12:raise RuntimeError('zero growth control')
    for v in [-.1,1.,2.]:
        try:factors(v)
        except ValueError:pass
        else:raise RuntimeError('domain guard control')
    print(json.dumps(dict(control='independent exact factorial series and supplied constant-growth/forcing solution',status='PASS')),flush=True)
if __name__=='__main__':controls()
