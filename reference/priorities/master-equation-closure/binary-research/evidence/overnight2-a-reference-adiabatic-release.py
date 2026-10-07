"""Independent rational release arithmetic, conditional on the proved source seam."""
import argparse
import hashlib
import importlib.util
import json
import math
from pathlib import Path
import time

import sympy as s

START = time.monotonic()
SOURCE = Path(__file__).with_name("overnight2-a-reference-adiabatic-budget.py")
PIN = "7efb434b498ec5073d69728c70ed276a695c7774d205d2a1ee1e623bb4264634"
assert hashlib.sha256(SOURCE.read_bytes()).hexdigest() == PIN
spec = importlib.util.spec_from_file_location("frozen_reference_budget", SOURCE)
ref = importlib.util.module_from_spec(spec)
spec.loader.exec_module(ref)
F = ref.F
x, y, alpha = ref.x, ref.y, ref.alpha
eps = F(".00033356411")
hmin = 1-42*eps**2
qmin = 1-90*eps**2


def normbound(poly, normalize=0):
    answer = F(0)
    for (a, b, j), c in s.Poly(s.expand(poly), x, y, alpha).terms():
        power = 2*(a+b)+j-normalize
        assert power >= 0
        answer += abs(ref.rf(c))*90**(a+b)*eps**power/hmin**j
    return answer


def exp_upper(z, N):
    return sum((z**k/F(math.factorial(k)) for k in range(N)), F(0))+z**N/F(math.factorial(N))/(1-z/F(N+1))


def known():
    assert normbound(2-3*x+4*y*y*alpha) == 2+270*eps**2+4*90**2*eps**5/hmin
    assert normbound(2*x+alpha**2, 2) == 180+1/hmin**2
    assert exp_upper(F(0), 20) == 1 and exp_upper(F(1), 20) < F("2.719")
    assert s.diff(x*x+y*y, y) == 2*y
    return {"status": "PASS", "controls": ["fixed shifted polynomial", "normalized epsilon powers",
                                            "geometric exponential tail", "central derivative"]}


def target():
    J = sum(alpha**j*f for j, f in enumerate(ref.js()))
    JP, JQ = s.diff(J, y), s.diff(J, x)
    Gh = -2*J-alpha*s.diff(J, alpha)
    G = y*JP+2*(x+1)*JQ+Gh
    values = {
        "JP_over_eps": normbound(JP, 1),
        "G_over_Q_eps2": normbound(G, 2)/qmin,
        "response_gradient_over_eps": (normbound(JP, 1)+eps*normbound(G, 2)/qmin)/hmin**2,
        "coordinate_P_over_eps": normbound(JP, 1)/hmin**2,
        "coordinate_Q_over_eps2": normbound(JQ, 2)/hmin**2,
        "coordinate_h_over_eps2": normbound(Gh, 2)/hmin**3,
    }
    caps = [F("4.1"), F(365), F("4.25"), F("4.2"), F(200), F(20)]
    assertions = {k: v < c for (k, v), c in zip(values.items(), caps)}
    ref.ref.tick("six independent gradient majorants")
    w = F(".00033356409519815205")
    charge = F(".1666666666666666666666666666666667")
    coupling = F(".000016022161698524887")
    esq = coupling*charge**2/4
    defect = (1-w*w/esq)/esq
    assertions["literal_tokens"] = F(".00033356410")**2 < esq < eps**2 and 0 < defect < F(".51")
    assertions["finite_comparison_exponential"] = exp_upper(F("2.04"), 20) < 8
    release = F("4.25")*F("5.1")*F("40.2")*eps**5+F("3.33e-21")
    transfer = F("4.2")*eps*F("1.73e-13")+200*eps**2*F("3.48e-13")+20*eps**2*F("1.73e-13")
    assertions["release_cap"] = release < F("4e-15")
    assertions["nominal_transfer_cap"] = transfer < F("5e-16")
    hu = F("40.2")*(1+90*eps**3/hmin+30*eps**2/hmin**2)
    assertions["one_sided_h_bound"] = hu < F("40.201")
    radial_high = ((1+F("40.201")*eps**2)**2/(1-90*eps**2)-1)/eps**2
    radial_low = (1-(1-F(".256")*eps**2)**2/(1+90*eps**2))/eps**2
    assertions["sharpened_radius_bound"] = max(radial_high, radial_low) < 171
    seam = F("4.95")/(1-171*eps**2)+F("8.7e13")*eps**5/hmin**8
    assertions["seam_response_coefficient"] = seam < F("5.1")
    assert all(assertions.values())
    ref.ref.tick("tokens, sharpened tube, seam coefficient and final caps")
    return {"status": "PASS", "assertions": assertions,
            "gradient_majorants": {k: ref.show(v) for k, v in values.items()},
            "token_defect": ref.show(defect), "release_cap_value": ref.show(release),
            "nominal_transfer_value": ref.show(transfer),
            "one_sided_h_coefficient": ref.show(hu), "radius_upper_coefficient": ref.show(radial_high),
            "seam_response_coefficient": ref.show(seam),
            "boundary": "exact conditional arithmetic; seam proof and actual source admission remain analytical"}


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--mode", choices=["known", "target"], required=True)
    args = parser.parse_args()
    out = known() if args.mode == "known" else target()
    out["source_sha256"] = hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
    out["frozen_reference_budget_sha256"] = PIN
    out["elapsed_seconds"] = time.monotonic()-START
    ref.ref.tick("complete")
    payload = json.dumps(out, indent=2)
    assert len(payload.encode()) < 1024**2
    print(payload, flush=True)
