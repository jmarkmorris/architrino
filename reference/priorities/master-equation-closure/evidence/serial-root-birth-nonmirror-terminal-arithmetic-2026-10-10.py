"""Exact-rational recheck of displayed arithmetic in the spatial-transport and
terminal-speed assessments of the nonmirror dispersal chain.

Subjects of the recheck: binary-research/analysis/overnight2-a-reference-spatial-phase-transport.md
and overnight2-a-reference-terminal-speed-scale.md. Every number is copied from
their displayed text. The script checks only that displayed inequalities follow
from displayed constants; it derives no row, error bound or inherited theorem.
Square roots and fractional powers are avoided by comparing integer powers of
positive quantities. Known cases run first. Run with the shared project venv.
"""
from fractions import Fraction as F
import json

D = lambda text: F(text)


def known():
    assert D("0.1") * 3 == D("0.3") and not D("0.1") * 3 > D("0.3")
    # sqrt comparison by squaring: sqrt(2) < 1.4143 and not < 1.4142
    assert 2 < D("1.4143") ** 2 and not 2 < D("1.4142") ** 2
    # fourth-root comparison by fourth powers: 16^(1/4) = 2
    assert F(2) ** 4 == 16
    return ["exact decimal products", "square-root comparison by squaring, both directions", "fourth-root comparison by fourth powers"]


controls = known()
c = {}

# Spatial transport, finite comparison.
dh, dY, eps_up = D("1.73e-13"), D("1.129e-15"), D("0.000334")
rate = D("1.01") * dh + D("2.01") * dY
c["spatial: 1.01|dh|+2.01|dY| below 1.78e-13"] = rate < D("1.78e-13")
c["spatial: times 40*epsilon below 2.4e-15"] = D("1.78e-13") * 40 * eps_up < D("2.4e-15")
c["spatial: |dh|/epsilon below 5.19e-10 with the lower epsilon endpoint"] = dh / D("0.00033356410") < D("5.19e-10")
c["spatial: extra angle term 3*epsilon*2.4e-15 below 3e-18"] = 3 * eps_up * D("2.4e-15") < D("3e-18")
c["spatial: sensitivities bounded by two give below 1.05e-12"] = 2 * (D("1.73e-13") + D("3.48e-13")) < D("1.05e-12")

# Terminal speed scale.
c["cos(3/2) upper polynomial equals 11/128 and is below 0.09"] = 1 - F(9, 8) + F(81, 16) / 24 == F(11, 128) and F(11, 128) < D("0.09")
c["Q_e below 1.1"] = 1 + D("1.000001") * F(11, 128) < D("1.1")
c["(2): 4*0.9975 - 2.2 = 1.79 exceeds 16/9"] = 4 * D("0.9975") - D("2.2") == D("1.79") and D("1.79") > F(16, 9)
c["(2): chi_e range from K and d_e ranges"] = D("4e-7") / D("4e7") == D("1e-14") and D("4.5e-7") / D("2e6") == D("2.25e-13")
c["virial: 18/5 exceeds 16/9"] = F(18, 5) > F(16, 9)
chi_hi, root_hi = D("2.25e-13"), D("4.75e-7")
c["sqrt(chi_e) below 4.75e-7, by squaring"] = chi_hi < root_hi ** 2
# The document's strict "2.76*sqrt(chi_e) < 1.311e-6" is strict because sqrt(chi_e) < 4.75e-7 strictly
# (checked above). At the bound value itself the product equals 1.311e-6 exactly. The first run of this
# script tested a strict inequality at the bound value and reported false; that was this script's error.
c["(4): 101/100 + (3/2)(441/380) below 2.76; 2.76*4.75e-7 equals 1.311e-6, which is below 2e-6"] = F(101, 100) + F(3, 2) * F(441, 380) < D("2.76") and D("2.76") * root_hi == D("1.311e-6") < D("2e-6")
B = D("2e-6")
c["(8): leading term below 7.125e-7 and the total below 1e-5"] = F(3, 2) * root_hi <= D("7.125e-7") and F(3, 2) * root_hi + 2 * B ** 2 + (D("2.2") * B ** 2 + D("10.1")) * chi_hi < D("1e-5")
c["(10): linear sum 26.95*B equals 0.0000539 and is below 0.001"] = D("26.95") * B == D("0.0000539") and D("0.0000539") + D("1e-9") < D("0.001")
c["(11): (2.01*3/4)*(2/3) equals 1.005, and 2.01 is below 1.5^2"] = D("2.01") * F(3, 4) * F(2, 3) == D("1.005") and D("2.01") < D("1.5") ** 2
c["upper radial speed: 4.02*4.75e-7 + 8e-6 below 0.00001 below 2.001^2 - 4"] = D("4.02") * root_hi + D("8e-6") < D("0.00001") < D("2.001") ** 2 - 4 and D("2.001") ** 2 - 4 == D("0.004001")
c["(12): 2^(-3/2) below 0.36 by squaring; 0.99*(2/3)*0.64 equals 0.4224 exceeds 0.405; 2*0.405 equals 0.81"] = F(1, 8) < D("0.36") ** 2 and D("1.99") / D("2.001") > D("0.99") and D("0.99") * F(2, 3) * D("0.64") == D("0.4224") and 2 * D("0.405") == D("0.81")
c["(1) lower: 0.9^4*(1e-14)^3 = 6.561e-43 exceeds (2e-11)^4 = 1.6e-43"] = D("0.9") ** 4 * D("1e-14") ** 3 == D("6.561e-43") and D("6.561e-43") > D("2e-11") ** 4 == D("1.6e-43")
c["(1) upper: 1.5^4*(2.25e-13)^3 = 5.76650390625e-38 below (5e-10)^4 = 6.25e-38"] = D("1.5") ** 4 * chi_hi ** 3 == D("5.76650390625e-38") and D("5.76650390625e-38") < D("5e-10") ** 4 == D("6.25e-38")
beta = D("0.05")
c["nested sources: 3 - 1/0.95 - 1.05/0.95^2 is positive"] = 3 - 1 / D("0.95") - D("1.05") / D("0.95") ** 2 > 0
c["(13): 1.1025*3.851 = 4.2457275 below 5.2*0.95^3 = 4.45835"] = (1 + beta) ** 2 * D("3.851") == D("4.2457275") and D("5.2") * D("0.95") ** 3 == D("4.45835") and D("4.2457275") < D("4.45835")
c["(13): eta below 0.001"] = (1 + beta) ** 2 / (1 - 3 * beta) ** 2 * chi_hi < D("0.001")
x = D("7.8") * root_hi
c["(14): x = 3.705e-6; 2.64 below 2.65(1-x) = 2.64999018175; 2.64*3.705 = 9.7812 below 10(1-x) = 9.99996295"] = x == D("3.705e-6") and D("2.65") * (1 - x) == D("2.64999018175") and D("2.64") < D("2.64999018175") and D("2.64") * D("3.705") == D("9.7812") and 10 * (1 - x) == D("9.99996295") and D("9.7812") < D("9.99996295")
c["5.2*(3/2) equals 7.8"] = D("5.2") * F(3, 2) == D("7.8")

result = {"result": "PASS" if all(c.values()) else "FAIL", "known_controls": controls, "checks": c}
print(json.dumps(result, indent=1))
raise SystemExit(0 if result["result"] == "PASS" else 1)
