"""Exact-rational recheck of displayed arithmetic in the nominal phase assessment.

Subject of the recheck: binary-research/analysis/overnight2-a-reference-nominal-phase-fate.md.
Every number below is copied from that document's displayed text. This script
checks only that the displayed inequalities and decimal values follow from the
displayed constants. It does not derive the account polynomial, the response
sensitivities, the interval enclosure of I_0 and Gamma, or any inherited theorem.

All arithmetic is in exact rationals; square roots are avoided by squaring
positive quantities. Known cases run first. Run with the shared project venv.
"""
from fractions import Fraction as F
import json

D = lambda text: F(text)


def known():
    assert D("0.1") + D("0.2") == D("0.3")
    assert F(1, 3) < D("0.3334") and not F(1, 3) < D("0.3333")
    # 3/2 power comparison by squaring: 4^(3/2) = 8.
    assert F(8) ** 2 == F(4) ** 3 and not F(7) ** 2 >= F(4) ** 3
    return ["exact decimal arithmetic", "strict rational comparison in both directions", "three-halves power comparison by squaring"]


controls = known()
nu, eps_minus, R = D("1.39392e-38"), D("0.00033356410"), F(10) ** 16
# The document does not display the upper endpoint of epsilon. Any value at or above the
# true one makes the two release bounds harder to meet, so a deliberately large one is used.
eps_plus = D("0.000334")
checks = {}

lead = 2 * nu / (D("0.98") * eps_minus)
eq2 = lead * (3 / D("0.999") + 10 * R / (3 * D("0.999") ** 3))
checks["(2) value begins 2.8513120315e-18 and is below 4e-18"] = D("2.8513120315e-18") <= eq2 < D("2.8513120316e-18") and eq2 < D("4e-18")
eq4 = lead * (18 + 10 * R / (2 * D("0.999") ** 2))
checks["(4) value begins 4.2726910792e-18 and is below 1e-17"] = D("4.2726910792e-18") <= eq4 < D("4.2726910793e-18") and eq4 < D("1e-17")
phase_lead = 18 * nu * R / (D("0.98") * eps_minus ** 2)
others = (2 * nu / D("0.98")) * (9 + R / (3 * D("0.999") ** 2)) + 4 * nu * eps_plus * R * D("1.021") / (9 * D("0.98") * D("0.999") ** 3) + 4 * nu * eps_plus / (3 * D("0.98") * D("0.999"))
checks["(6) three smaller phase terms sum below 1e-20"] = others < D("1e-20")
checks["phase-isotropic majorant begins 2.30104797e-14 and is below 3e-14"] = D("2.30104797e-14") <= phase_lead + others < D("2.30104798e-14") and phase_lead + others < D("3e-14")

h_m, h_p = 1 - 42 * eps_plus ** 2, 1 + 42 * eps_plus ** 2
q_m, q_p, p_star = 1 - 90 * eps_plus ** 2, 1 + 90 * eps_plus ** 2, 90 * eps_plus ** 2
A = eps_plus / h_m
component = (1 + A / 2 + (q_p + 1 + A * p_star / 2 + F(21, 2) * A ** 2 + 3 * A + 5 * A ** 3) / q_m) / h_m
checks["release component sum below 3.2"] = component < D("3.2")
release_phase = 2 * eps_plus ** 3 / (3 * h_m ** 2) + (h_p + eps_plus ** 2 * (q_p + F(2, 3)) / h_m + F(2, 3) * eps_plus ** 3 * p_star / h_m ** 2) / q_m
checks["release phase sensitivity times epsilon below 1.01"] = release_phase < D("1.01")
checks["(8) direction change below 0.0051"] = D("3.34e-6") / (D("0.000666") - D("3.34e-6")) < D("0.0051")

# Endpoint stage: consequences of (9), (P - alpha Q)^2 < 2Q, at r = R.
Q1 = F(5000) ** 2 / R
checks["h<5000 gives Q<2.5e-9 at r=R"] = Q1 <= D("2.5e-9")
# |P| < sqrt(2Q) + alpha*Q with alpha < 0.000335; compare by squaring.
bound_P1 = D("7.1e-5") - D("0.000335") * Q1
checks["and |P|<7.1e-5"] = bound_P1 > 0 and bound_P1 ** 2 > 2 * Q1
Q2 = F(1501) ** 2 / R
checks["h<1501 gives Q<2.254e-10"] = Q2 < D("2.254e-10")
alpha2 = eps_plus / 1498
checks["h>1498 gives alpha<2.23e-7"] = alpha2 < D("2.23e-7")
bound_P2 = D("2.13e-5") - alpha2 * Q2
checks["and |P|<2.13e-5"] = bound_P2 > 0 and bound_P2 ** 2 > 2 * Q2
eta = D("4.7e-10")
eq11 = 1501 * eta / (eps_minus * (1 - eta) * (2 - eta))
checks["(11) below 0.001058"] = eq11 < D("0.001058")
# (12): 4e-14 / (2 eps (I0- - 4e-14)^(3/2)) < 0.203, by squaring, with the displayed lower endpoint of I_0.
I_low = D("4.4505976657061e-7") - D("4e-14")
lhs = D("4e-14") / (2 * eps_minus * D("0.203"))
checks["(12) below 0.203, by squaring"] = lhs > 0 and lhs ** 2 < I_low ** 3
checks["I_0 enclosure is consistent with 1498<h<1501 up to the stated defect"] = F(1) / F(1501) ** 2 < D("4.4505976657062e-7") * (1 + D("4e-7")) and D("4.4505976657061e-7") * (1 - D("4e-7")) < F(1) / F(1498) ** 2
checks["(13) total 0.203+0.002+3e-8+1.5e-7 below 0.206"] = D("0.203") + D("0.002") + D("3e-8") + D("1.5e-7") < D("0.206")
checks["(14) |P|/(1-Q) below 0.000022"] = D("2.13e-5") / (1 - D("2.254e-10")) < D("0.000022")
required = D("0.206") + D("0.007") + D("0.000022")
checks["required circular distance 0.213022 below 0.214"] = required == D("0.213022") and required < D("0.214")
# Gamma in (-0.328064, -0.328061): its distance from 2*pi*Z is |Gamma| because |Gamma| < 3 < pi.
checks["enclosed distance above 0.328061 exceeds 0.214 with reserve above 0.114"] = D("0.328061") - D("0.214") > D("0.114") and D("0.328064") < 3

tan2 = (2 * F(1, 5)) / (1 - F(1, 25))
tan4 = (2 * tan2) / (1 - tan2 ** 2)
checks["Machin: tan(2 atan 1/5)=5/12, tan(4 atan 1/5)=120/119, and the difference with 1/239 has tangent 1"] = tan2 == F(5, 12) and tan4 == F(120, 119) and (tan4 - F(1, 239)) / (1 + tan4 * F(1, 239)) == 1
checks["(15): tan(atan 1/2 + atan 1/3) = 1"] = (F(1, 2) + F(1, 3)) / (1 - F(1, 6)) == 1

result = {"result": "PASS" if all(checks.values()) else "FAIL", "known_controls": controls, "checks": checks, "assumed_epsilon_upper": str(eps_plus), "values": {"(2)": float(eq2), "(4)": float(eq4), "phase majorant": float(phase_lead + others), "component sum": float(component), "release phase": float(release_phase), "(11)": float(eq11)}}
print(json.dumps(result, indent=1))
raise SystemExit(0 if result["result"] == "PASS" else 1)
