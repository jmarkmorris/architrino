#!/usr/bin/env python
"""Review-role independent check of the coverage subject's F3 closed form (release second derivative of speed
under the static-field first step): d2|v|/dT2 = [a.A + v^T J v]/|v| - (v.A)^2/|v|^3 with a = P A - (|v|^2/R) n,
J the Jacobian of the static inverse-square field. Exact sympy arithmetic. Controls before targets.
Authored by the review role; does not import or copy any subject code. c_f = 1, K = 1."""
import json, os, sys, time
import sympy as sp

class NonTangent(Exception):
    pass

def V(*a):
    return sp.Matrix([sp.nsimplify(x) for x in a])

def static_field_and_jacobian(Xi, sources):
    """sources: list of (position, sigma). Returns F, J (3x3) at Xi."""
    F = sp.zeros(3, 1); J = sp.zeros(3, 3)
    for Xj, sig in sources:
        r = Xi - Xj; rn = sp.sqrt(r.dot(r))
        if rn == 0:
            raise ValueError("zero separation")
        F += sig * r / rn**3
        J += sig * (sp.eye(3) / rn**3 - 3 * r * r.T / rn**5)
    return sp.simplify(F), sp.simplify(J)

def speed_derivatives(Xi, v, sources, R):
    n = Xi / R
    if sp.simplify(n.dot(v)) != 0:
        raise NonTangent("non-tangent velocity")
    F, J = static_field_and_jacobian(Xi, sources)
    PA = F - (n.dot(F)) * n
    sp_ = sp.sqrt(v.dot(v))
    a = PA - (v.dot(v) / R) * n
    d1 = sp.simplify(v.dot(F) / sp_)
    dvA = a.dot(F) + (v.T * J * v)[0, 0]
    d2 = sp.simplify(dvA / sp_ - (v.dot(F))**2 / sp_**3)
    return d1, d2, sp.simplify(a.dot(F)), sp.simplify((v.T * J * v)[0, 0])

OUT = {"_order": []}
def rec(k, d):
    OUT["_order"].append(k); OUT[k] = d; print(k, json.dumps(d)[:240])

# --- controls ---
# K1: single unlike source at (-2,0,0) seen from (0,0,0)-centred? Use receiver (1,0,0), source (-1,0,0), sigma=-1:
# F = -(1/4) xhat; J = -(I/8 - 3 e1e1/32)... for v=(0,1,0): v^T J v = -(1/8) (known: sigma |v|^2/r^3 with r.v=0).
F, J = static_field_and_jacobian(V(1, 0, 0), [(V(-1, 0, 0), -1)])
q = (V(0, 1, 0).T * J * V(0, 1, 0))[0, 0]
ok = (F == V(sp.Rational(-1, 4), 0, 0)) and (sp.simplify(q + sp.Rational(1, 8)) == 0)
rec("control_K1_single_source_field_and_quadratic_form", {"F": [str(x) for x in F], "vJv": str(q), "expected_vJv": "-1/8", "pass": bool(ok)})
if not ok: sys.exit("K1 failed")
# K2: zero-field known case: receiver at (1,0,0) between like sources at (0,1,0) and (0,-1,0) and unlike at (-1,0,0)?
# Simpler exact known case: d2|v|/dT2 for a single unlike antipodal source, V1-like v=(0,1,0), R=1, v=1:
# PA=0, n.A=-1/4 -> a.A = -(1)(-1/4)= 1/4 ; vJv = -1/8 ; v.A=0 -> d2 = 1/8.
d1, d2, aA, vJv = speed_derivatives(V(1, 0, 0), V(0, 1, 0), [(V(-1, 0, 0), -1)], 1)
ok = (d1 == 0) and (sp.simplify(d2 - sp.Rational(1, 8)) == 0)
rec("control_K2_antipodal_source_second_derivative", {"d1": str(d1), "d2": str(d2), "expected_d2": "1/8", "pass": bool(ok)})
if not ok: sys.exit("K2 failed")
# N1: non-tangent velocity rejected
try:
    speed_derivatives(V(1, 0, 0), V(1, 0, 0), [(V(-1, 0, 0), -1)], 1); rec("control_N1_nontangent_rejected", {"pass": False}); sys.exit("N1 failed")
except NonTangent as e:
    rec("control_N1_nontangent_rejected", {"pass": True, "message": str(e)})
rec("controls_complete_before_targets", {"utc": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())})

# --- targets: six poles V1 (common rotation about (1,1,1)/sqrt3), receiver +x ---
def six_poles(R):
    P = [V(1,0,0), V(0,1,0), V(0,0,1), V(-1,0,0), V(0,-1,0), V(0,0,-1)]
    pol = [1, 1, 1, -1, -1, -1]
    return [R * p for p in P], pol
res = {}
for (R, vv) in [(1, 1), (sp.Rational(1, 2), 1), (1, sp.Rational(1, 4)), (1, sp.Rational(3, 4)), (10, 1)]:
    R = sp.nsimplify(R); vv = sp.nsimplify(vv)
    pos, pol = six_poles(R)
    sources = [(pos[j], pol[0] * pol[j]) for j in range(1, 6)]
    v = vv * V(0, 1, -1) / sp.sqrt(2)
    d1, d2, aA, vJv = speed_derivatives(pos[0], v, sources, R)
    closed = 1 / (vv * R**4) + vv / (8 * R**3)
    res[f"R={R},v={vv}"] = {"d1": str(d1), "d2_exact": str(d2), "d2_f": float(d2), "aA": str(aA), "vJv": str(vJv),
                            "subject_closed_form": str(closed), "match": bool(sp.simplify(d2 - closed) == 0)}
rec("target_six_poles_V1_second_derivative", res)
# subject's V2 (toward own-side pole: v along +P(a)) and V4 (+x toward -y), R=1, v=1
pos, pol = six_poles(1); sources = [(pos[j], pol[0] * pol[j]) for j in range(1, 6)]
a_ax = V(1, 1, 1) / sp.sqrt(3); n0 = pos[0]
own = a_ax - (a_ax.dot(n0)) * n0; own = own / sp.sqrt(own.dot(own))
d1, d2, _, _ = speed_derivatives(n0, own, sources, 1)
rec("target_subject_V2_own_side_pole", {"v_dir": [str(x) for x in own], "d1": str(d1), "d2": str(d2), "d2_f": float(d2)})
d1, d2, _, _ = speed_derivatives(n0, V(0, -1, 0), sources, 1)
rec("target_subject_V4_toward_minus_y", {"d1": str(d1), "d1_f": float(d1), "d2": str(d2), "d2_f": float(d2)})
# hexagon B1 receiver azimuth 0, V1 about z: v=(0,1,0)
hexp = [V(sp.cos(k*sp.pi/3), sp.sin(k*sp.pi/3), 0) for k in range(6)]; hpol = [1,-1,1,-1,1,-1]
sources = [(hexp[j], hpol[0]*hpol[j]) for j in range(1, 6)]
d1, d2, _, _ = speed_derivatives(hexp[0], V(0, 1, 0), sources, 1)
rec("target_hexagon_B1_second_derivative", {"d1": str(d1), "d2": str(d2), "d2_f": float(d2)})
OUT["_utc"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
here = os.path.dirname(os.path.abspath(__file__))
json.dump(OUT, open(os.path.join(here, "spherical-curvature-claude-review-f3-check-output.json"), "w"), indent=1, sort_keys=True)
