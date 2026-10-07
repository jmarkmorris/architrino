"""Exact subject arithmetic for the unchanged-history release proof, not evolution."""
import argparse
import hashlib
import importlib.util
import json
import pathlib
import resource
import signal
import time
import sympy as sp

START = time.monotonic()
signal.signal(signal.SIGALRM, lambda *_: (_ for _ in ()).throw(TimeoutError("90-second limit")))
signal.alarm(90)
SOURCE = pathlib.Path(__file__).with_name("overnight2-a-canonical-adiabatic.py")
PIN = "69bff0a0ca954f10c373848311543e1b2ea6bc75ccc942579fcc36db750f05e8"
assert hashlib.sha256(SOURCE.read_bytes()).hexdigest() == PIN
spec = importlib.util.spec_from_file_location("release_frozen_subject", SOURCE)
engine = importlib.util.module_from_spec(spec)
spec.loader.exec_module(engine)
P, Q, alpha = engine.P, engine.Q, engine.alpha
x, y = sp.symbols("x y", real=True)
eps = sp.Rational(".00033356411")
elo = sp.Rational(".00033356410")
small = 90 * eps**2
hmin = 1 - 42 * eps**2
amax = eps / hmin

def bound(poly, radius=small, avalue=amax):
    shifted = sp.Poly(sp.expand(poly.subs({P:y, Q:1+x})), x, y, alpha)
    return sum(abs(c)*radius**(i+j)*avalue**k for (i,j,k),c in shifted.terms())

def output(z):
    return {"exact":str(z), "decimal_diagnostic":str(sp.N(z,24))}

def known():
    assert bound(2-3*(Q-1)+4*P**2*alpha,sp.Rational(1,10),sp.Rational(1,20)) == sp.Rational(1151,500)
    assert sp.diff(P**2+(Q-1)**2,P) == 2*P
    assert sum(sp.Rational("2.04")**k/sp.factorial(k) for k in range(20)) < 8
    # Upper exponential tail, ratio <= 2.04/21 beyond term twenty.
    assert sum(sp.Rational("2.04")**k/sp.factorial(k) for k in range(20)) + sp.Rational("2.04")**20/sp.factorial(20)/(1-sp.Rational("2.04")/21) < 8
    return {"status":"PASS","controls":["fixed signed shifted polynomial","central derivative","exponential upper tail"]}

def target():
    js,_ = engine.construct(6)
    J=sum(alpha**j*c for j,c in enumerate(js))
    JP=sp.diff(J,P)
    JQ=sp.diff(J,Q)
    Gh=sp.expand(-2*J-alpha*sp.diff(J,alpha))
    G=sp.expand(P*JP+2*Q*JQ+Gh)
    limits={
        "JP_over_eps":bound(JP)/eps,
        "G_over_Q_eps_squared":bound(G)/(1-small)/eps**2,
        "response_gradient_over_eps":(bound(JP)+bound(G)/(1-small))/hmin**2/eps,
        "coordinate_P_over_eps":bound(JP)/hmin**2/eps,
        "coordinate_Q_over_eps_squared":bound(JQ)/hmin**2/eps**2,
        "coordinate_h_over_eps_squared":bound(Gh)/hmin**3/eps**2,
    }
    caps=[sp.Rational("4.1"),365,sp.Rational("4.25"),sp.Rational("4.2"),200,20]
    assertions={k:bool(v<c) for (k,v),c in zip(limits.items(),caps)}
    w=sp.Rational(".00033356409519815205")
    charge=sp.Rational(".1666666666666666666666666666666667")
    coupling=sp.Rational(".000016022161698524887")
    esq=coupling*charge**2/4
    defect=(1-w*w/esq)/esq
    assertions["literal_epsilon_enclosure"]=bool(elo**2<esq<eps**2)
    assertions["literal_squared_speed_defect"]=bool(0<defect<sp.Rational(".51"))
    release=sp.Rational("4.25")*sp.Rational("5.1")*sp.Rational("40.2")*eps**5+sp.Rational("3.33e-21")
    transfer=sp.Rational("4.2")*eps*sp.Rational("1.73e-13")+200*eps**2*sp.Rational("3.48e-13")+20*eps**2*sp.Rational("1.73e-13")
    assertions["release_account_cap"]=bool(release<sp.Rational("4e-15"))
    assertions["nominal_coordinate_transfer_cap"]=bool(transfer<sp.Rational("5e-16"))
    engine.progress("release-majorants-complete")
    return {"status":"PASS" if all(assertions.values()) else "FAILED_INEQUALITY", "assertions":assertions,
            "gradient_majorants":{k:output(v) for k,v in limits.items()},
            "squared_speed_defect_over_epsilon_squared":output(defect),"release_account_error":output(release),
            "nominal_transfer_error":output(transfer),
            "boundary":"conditional subject arithmetic; release seam and coordinate map need independent proof; no fate"}

if __name__ == "__main__":
    p=argparse.ArgumentParser();p.add_argument("mode",choices=["known","target"])
    mode=p.parse_args().mode
    result=known() if mode=="known" else target()
    result.update(mode=mode, source_sha256=hashlib.sha256(pathlib.Path(__file__).read_bytes()).hexdigest(), reused_source_sha256=PIN,
                  elapsed_seconds=time.monotonic()-START,peak_rss_bytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss)
    assert result["peak_rss_bytes"]<512*1024*1024
    encoded=json.dumps(result,indent=2);assert len(encoded.encode())<1048576
    print(encoded,flush=True)
