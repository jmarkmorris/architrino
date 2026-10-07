"""Exact symbolic curvature proposal; known controls precede target use."""
import argparse, hashlib, json, os, resource, signal, sys, time
for key in ('OMP_NUM_THREADS','OPENBLAS_NUM_THREADS','MKL_NUM_THREADS'):
    os.environ[key]='1'
import sympy as s
from pathlib import Path
signal.signal(signal.SIGALRM, lambda *_: (_ for _ in ()).throw(TimeoutError('30s limit')))
signal.alarm(30)
t0=time.perf_counter()
c,v=s.symbols('c v',real=True)
z=s.sqrt(1-c*c);D=1-v*c
B=c/(z*D)
def derivative(f):return -z/(2*D)*s.diff(f,c)
root=Path('.local-data/master-equation-closure/overnight2-c')
digest=hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
a=argparse.ArgumentParser();a.add_argument('--stage',choices=['known','target'],required=True);stage=a.parse_args().stage
out=root/f'tangential-curvature-symbolic-rational-{stage}.json'
if out.exists():raise RuntimeError('preserve prior receipt')
if stage=='known':
    f=c/z
    for _ in range(3):f=-z*s.diff(f,c)/2
    assert s.simplify(f+(1+2*c*c)/(4*(1-c*c)**2))==0
    assert s.simplify(derivative(B)+(1-v*c**3)/(2*(1-c*c)*D**3))==0
    result={'known_passed':True,'controls':['static cotangent third derivative','previous independently derived first derivative']}
else:
    known=json.loads((root/'tangential-curvature-symbolic-rational-known.json').read_text())
    assert known['known_passed'] and known['source_sha256']==digest
    f=B
    for _ in range(3):f=derivative(f)
    numerator=s.factor(-4*(1-c*c)**2*D**7*f)
    assert s.Poly(numerator,c,v).domain.is_QQ or s.Poly(numerator,c,v).domain.is_ZZ
    result={'third_derivative_numerator':str(numerator),'expanded':str(s.expand(numerator)), 'denominator':'4*(1-c*c)**2*(1-v*c)**7', 'B_third':'minus numerator / denominator', 'polynomial_at_v1':str(s.factor(numerator.subs(v,1)))}
result.update(stage=stage,source_sha256=digest,sympy_version=s.__version__,elapsed_seconds=time.perf_counter()-t0,peak_rss_bytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss)
assert result['elapsed_seconds']<30 and result['peak_rss_bytes']<400_000_000
encoded=json.dumps(result,indent=2)+'\n';assert len(encoded.encode())<50_000
out.write_text(encoded);print(encoded)
