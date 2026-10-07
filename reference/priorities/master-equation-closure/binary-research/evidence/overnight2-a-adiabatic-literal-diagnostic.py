"""High-precision formal diagnostic, not an interval fate certificate."""
import argparse
import hashlib
import json
import pathlib
import resource
import signal
import time

import mpmath as mp
import sympy as sp

START = time.monotonic()
signal.signal(signal.SIGALRM, lambda *_: (_ for _ in ()).throw(TimeoutError("90-second budget")))
signal.alarm(90)
mp.mp.dps = 100
P, Q = sp.symbols("P Q", real=True)
RECEIPT = pathlib.Path(".local-data/master-equation-closure/overnight2-a/canonical-adiabatic-target.json")
EXPECTED = "0a9b2974b958658a554f2e24c82ddb47b1eada07cb4ecee1766fe863db345137"


def known():
    assert mp.sqrt(mp.mpf(4)) == 2
    assert abs(mp.sin(mp.pi)) < mp.mpf("1e-99")
    assert mp.mpf("0.125") == mp.mpf(1) / 8
    expr = sp.lambdify((P, Q), P**2 + (Q - 1)**2, "mpmath")
    assert expr(mp.mpf(3), mp.mpf(5)) == 25
    assert abs(mp.atan2(mp.mpf(1), mp.mpf(0)) - mp.pi / 2) < mp.mpf("1e-99")
    return {"mode": "known", "status": "PASS", "controls": ["exact square root", "pi sine", "exact decimal", "polynomial evaluation", "angle orientation"]}


def target():
    raw = RECEIPT.read_bytes()
    assert hashlib.sha256(raw).hexdigest() == EXPECTED
    data = json.loads(raw)
    js = [sp.sympify(z, locals={"P": P, "Q": Q}) for z in data["J"]]
    w = mp.mpf("0.00033356409519815205")
    delta = mp.mpf("3.1415926535897931")
    charge = mp.mpf("0.1666666666666666666666666666666667")
    coupling = mp.mpf("0.000016022161698524887")
    epsilon = mp.sqrt(coupling * charge**2 / 4)
    radius = mp.sin(delta / 2)
    h0 = w * radius**2 / epsilon
    q0 = h0**2 / radius
    aa = epsilon / h0
    account = sum(aa**j * sp.lambdify((P, Q), z, "mpmath")(mp.mpf(0), q0) for j, z in enumerate(js)) / h0**2
    rho = mp.sqrt(account)
    # Leading corrected vector only; no error theorem is assigned here.
    phi = mp.atan2(2 * epsilon / h0**2, (q0 - 1) / h0)
    theta = (1 / rho - h0) / epsilon - epsilon * (q0 - 1 + mp.mpf(1) / 3) / h0
    gap = mp.fmod(theta - phi - mp.pi + mp.pi, 2 * mp.pi)
    if gap < 0:
        gap += 2 * mp.pi
    gap -= mp.pi
    values = {"epsilon": epsilon, "radius_0": radius, "h_0": h0, "Q_0": q0, "formal_account_0": account, "formal_rho_0": rho, "leading_seed_angle": phi, "formal_opening_angle": theta, "wrapped_formal_phase_gap": gap}
    return {"mode": "target", "grade": "100-digit floating formal diagnostic only; no enclosure or physical conclusion", "input_receipt_sha256": EXPECTED, "values": {k: mp.nstr(v, 80) for k, v in values.items()}}


parser = argparse.ArgumentParser()
parser.add_argument("mode", choices=["known", "target"])
args = parser.parse_args()
result = known() if args.mode == "known" else target()
result["source_sha256"] = hashlib.sha256(pathlib.Path(__file__).read_bytes()).hexdigest()
result["elapsed_seconds"] = time.monotonic() - START
result["peak_rss_bytes"] = resource.getrusage(resource.RUSAGE_SELF).ru_maxrss
assert result["peak_rss_bytes"] < 512 * 1024 * 1024
output = json.dumps(result, indent=2)
assert len(output.encode()) < 1048576
print(output, flush=True)
