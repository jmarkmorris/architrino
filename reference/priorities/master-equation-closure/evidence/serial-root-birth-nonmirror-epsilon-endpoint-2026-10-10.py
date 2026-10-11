"""Bind the upper endpoint of epsilon used by the nominal-arithmetic recheck.

The exact tokens kappa and q are copied from the displayed text of
binary-research/analysis/overnight2-a-reference-spatial-seed.md, which states
K = kappa q^2 = 4 epsilon^2. The enclosure .00033356410 < epsilon < .00033356411
is the one displayed in overnight2-a-reference-adiabatic-budget.md. This script
checks, in exact rationals and by squaring, that the tokens imply that enclosure,
and then re-evaluates the epsilon-dependent checks of the nominal-arithmetic
recheck at the bound upper endpoint 33356411/10^11 instead of the assumed 0.000334.
It does not establish that these tokens are the frozen preparation; that is read
from the documents, not measured here. Known cases run first.
"""
from fractions import Fraction as F
import json

D = lambda text: F(text)


def known():
    # square-root enclosure by squaring: 1.41 < sqrt(2) < 1.42, and the wrong enclosure is rejected
    assert D("1.41") ** 2 < 2 < D("1.42") ** 2 and not D("1.42") ** 2 < 2
    # a quantity with known epsilon: 4*eps^2 = 1/25 gives eps = 1/10
    assert 4 * F(1, 10) ** 2 == F(1, 25)
    return ["square-root enclosure by squaring, both directions", "4 eps^2 = K at an exact known value"]


controls = known()
kappa, q = D("0.000016022161698524887"), D("0.1666666666666666666666666666666667")
K = kappa * q ** 2
lo, hi, assumed = D("0.00033356410"), F(33356411, 10 ** 11), D("0.000334")
c = {}
c["tokens give 4*lo^2 < kappa*q^2 < 4*hi^2, so .00033356410 < epsilon < .00033356411"] = 4 * lo ** 2 < K < 4 * hi ** 2
c["4e-7 < K < 5e-7 as the seed document states"] = D("4e-7") < K < D("5e-7")
c["bound upper endpoint is below the assumed 0.000334"] = hi < assumed

# Epsilon-dependent checks of the nominal-arithmetic recheck, re-evaluated at the bound endpoint.
nu, R, e = D("1.39392e-38"), F(10) ** 16, hi
others = (2 * nu / D("0.98")) * (9 + R / (3 * D("0.999") ** 2)) + 4 * nu * e * R * D("1.021") / (9 * D("0.98") * D("0.999") ** 3) + 4 * nu * e / (3 * D("0.98") * D("0.999"))
c["(6) three smaller phase terms sum below 1e-20, at the bound endpoint"] = others < D("1e-20")
h_m, h_p = 1 - 42 * e ** 2, 1 + 42 * e ** 2
q_m, q_p, p_star = 1 - 90 * e ** 2, 1 + 90 * e ** 2, 90 * e ** 2
A = e / h_m
component = (1 + A / 2 + (q_p + 1 + A * p_star / 2 + F(21, 2) * A ** 2 + 3 * A + 5 * A ** 3) / q_m) / h_m
c["release component sum below 3.2, at the bound endpoint"] = component < D("3.2")
release_phase = 2 * e ** 3 / (3 * h_m ** 2) + (h_p + e ** 2 * (q_p + F(2, 3)) / h_m + F(2, 3) * e ** 3 * p_star / h_m ** 2) / q_m
c["release phase sensitivity times epsilon below 1.01, at the bound endpoint"] = release_phase < D("1.01")
c["h>1498 gives alpha<2.23e-7, at the bound endpoint"] = e / 1498 < D("2.23e-7")
c["spatial: times 40*epsilon below 2.4e-15, at the bound endpoint"] = D("1.78e-13") * 40 * e < D("2.4e-15")
c["spatial: extra angle term 3*epsilon*2.4e-15 below 3e-18, at the bound endpoint"] = 3 * e * D("2.4e-15") < D("3e-18")

result = {"result": "PASS" if all(c.values()) else "FAIL", "known_controls": controls, "checks": c, "epsilon_upper_bound_used": str(hi), "K": str(K)}
print(json.dumps(result, indent=1))
raise SystemExit(0 if result["result"] == "PASS" else 1)
