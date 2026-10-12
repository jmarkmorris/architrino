# Like-reception campaign, review (ramon-e-moore lens), 2026-10-11 22:12 UTC: controls for the review's three-class support-derivative functions on the NEW
# domain, executed on the UNCHANGED function definitions of audit6.py (hash asserted; definitions exec'd as text up to "def sgn("). No target here.
# (K1) exact hand-derived case: all classes at the zero state with delayed accelerations g: d a_rad/dt = -g^2/sqrt2 exactly (antipode term exactly 0).
# (K3) prescribed-history known case on the new domain: every member follows h(s) = 0.02 + 0.03 s + 0.045 s^2 (acceleration 0.09 prescribed, not the law);
#      at t = 3.0 (q = 0.515, qdot = 0.30; unlike delayed state near q' = 0.24, v' = 0.20) the delays of the three classes are solved by bisection in
#      separately written point formulas, lambda_hat(t) = -h'(t)^2 - a_rad(t) is differenced centrally (h = 1e-5 and 5e-6, Richardson), and compared with the
#      closed-form -2 h' h'' - d a_rad/dt from d_mer / d_anti with the source acceleration 0.09. Also at t = 3.3 (q = 0.609).
# v2 (PI 22:14; v1 retained): audit6 v3 hash (its derivative functions are byte-identical to v2: the v2-to-v3 diff touches only the event bookkeeping); added
# (K4) EXACT hand-derived case at an expanded-domain state with the sources instantaneously at rest but accelerating (v' = 0, source accelerations a_c, receiver
#      speed qdot): d/dt[1/(r D)] = -r_q qdot/r^2 + sg a_c (1 - r_q qdot) M/r^2 with r_q = -sg N/r for a meridional class, and sd qdot/r^2 - a_A (1 + sd qdot) sd/r
#      with sd = sin((q - q')/2), r = 2 cos((q - q')/2) for the antipode; evaluated in separately written point arithmetic and compared with d_mer / d_anti.
# (W4) negative for K4: the source accelerations set to zero must differ.
# (W) negative: the same closed form with the source acceleration set to 0 (a window-type or missing-record error) must differ detectably.
import os, sys, json, hashlib
print("PID", os.getpid(), flush=True)
SRC = "reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-six-pole-like-reception-claude-review-audit6.py"
src = open(SRC, "rb").read(); hsh = hashlib.sha256(src).hexdigest(); assert hsh == "0b68b7c21c95cabaed8d60d2b32b755e3854b993139f47a9c1f3ff00cbb979c2", hsh
defs = src.decode().split("def sgn(x)")[0].replace('print("PID", os.getpid(), flush=True)', "")
exec(defs)   # mp, mpf, iv, I, lo, up, g, S2, F, mer, d_mer, anti, d_anti (unchanged bytes)
from mpmath import sin, cos, sqrt
out = {"source_sha256": hsh, "controls": {}}
Z = I(0); dU = d_mer(Z, Z, Z, Z, 1, g); dL = d_mer(Z, Z, Z, Z, -1, g); dA = d_anti(Z, Z, Z, Z, g); darad0 = g*(dL - dU - dA/2); exact = -g*g/S2
okK1 = bool(lo(darad0) <= lo(exact) and up(exact) <= up(darad0) and up(darad0) - lo(darad0) < mpf("1e-25") and lo(dA) == 0 and up(dA) == 0)
out["controls"]["K1_zero_state_exact"] = {"darad_dt": [str(lo(darad0)), str(up(darad0))], "exact_minus_g2_over_sqrt2": str(lo(exact)), "pass": okK1}
c0, c1, c2 = mpf("0.02"), mpf("0.03"), mpf("0.045"); gp = mpf(1)/10; r2 = sqrt(mpf(2))
def hq(s): return c0 + c1*s + c2*s*s
def hv(s): return c1 + 2*c2*s
def chord(q, qp, cls):
    if cls == "A": return 2*cos((q - qp)/2)
    sg = 1 if cls == "U" else -1; return sqrt(2 - sg*r2*sin(q + qp) + sg*sin(q)*sin(qp))
def tau_of(t, cls):
    q = hq(t); a, b = mpf("0.5"), mpf("2.5")
    for _ in range(110):
        m = (a + b)/2
        if m - chord(q, hq(t - m), cls) < 0: a = m
        else: b = m
    return (a + b)/2
def state(t):
    q = hq(t); st = {}
    for cls in ("U", "L", "A"):
        tau = tau_of(t, cls); qp = hq(t - tau); vp = hv(t - tau); r = chord(q, qp, cls)
        if cls == "A": Dd = 1 + vp*sin((q - qp)/2)
        else:
            sg = 1 if cls == "U" else -1; M = cos(q + qp)/r2 - sin(q)*cos(qp)/2; Dd = 1 - sg*vp*M/r
        st[cls] = (qp, vp, r, Dd, tau)
    return q, st
def lam(t):
    q, st = state(t); arad = gp*(1/(st["L"][2]*st["L"][3]) - 1/(st["U"][2]*st["U"][3]) - 1/(2*st["A"][2]*st["A"][3])); return -hv(t)**2 - arad
res = {}
for tt in ("3.0", "3.3"):
    t = mpf(tt); h1 = mpf("1e-5"); d1 = (lam(t + h1) - lam(t - h1))/(2*h1); d2 = (lam(t + h1/2) - lam(t - h1/2))/h1; fd = (4*d2 - d1)/3
    q, st = state(t); qi = I(str(q)); qd = I(str(hv(t))); acc = I(str(2*c2))
    def P(x): return I(str(x))
    dar = g*(d_mer(qi, P(st["L"][0]), P(st["L"][1]), qd, -1, acc) - d_mer(qi, P(st["U"][0]), P(st["U"][1]), qd, 1, acc) - d_anti(qi, P(st["A"][0]), P(st["A"][1]), qd, acc)/2)
    closed = -2*qd*acc - dar; cmid = (lo(closed) + up(closed))/2
    darw = g*(d_mer(qi, P(st["L"][0]), P(st["L"][1]), qd, -1, Z) - d_mer(qi, P(st["U"][0]), P(st["U"][1]), qd, 1, Z) - d_anti(qi, P(st["A"][0]), P(st["A"][1]), qd, Z)/2); wrong = -2*qd*acc - darw; wmid = (lo(wrong) + up(wrong))/2
    res[tt] = {"q": str(q), "qdot": str(hv(t)), "delayed": {k: [str(v[0])[:12], str(v[1])[:12], "D=" + str(v[3])[:10], "s=" + str(t - v[4])[:8]] for k, v in st.items()}, "closed_form": str(cmid), "finite_difference_richardson": str(fd), "abs_err": str(abs(cmid - fd)), "wrong_acc0": str(wmid), "wrong_differs_by": str(abs(wmid - fd))}
    print("t", tt, "q", str(q)[:6], "closed", str(cmid)[:22], "fd", str(fd)[:22], "err", mp.nstr(abs(cmid - fd), 3), "| wrong differs by", mp.nstr(abs(wmid - fd), 3), res[tt]["delayed"], flush=True)
okK3 = all(mpf(v["abs_err"]) < mpf("1e-12") for v in res.values()); okW = all(mpf(v["wrong_differs_by"]) > mpf("1e-5") for v in res.values())
out["controls"]["K3_prescribed_history_new_domain"] = {"pass": bool(okK3), "cases": res}; out["controls"]["W_zero_source_acceleration_detected"] = bool(okW)
# K4 exact case at an expanded-domain state (v' = 0, accelerating sources)
q4, qd4 = mpf("0.55"), mpf("0.33"); st4 = {"U": (mpf("0.28"), mpf("0.105")), "L": (mpf("0.15"), mpf("0.103")), "A": (mpf("0.10"), mpf("0.101"))}
def exact_mer(q, qp, qd, a, sg):
    r = sqrt(2 - sg*r2*sin(q + qp) + sg*sin(q)*sin(qp)); N = cos(q + qp)/r2 - cos(q)*sin(qp)/2; M = cos(q + qp)/r2 - sin(q)*cos(qp)/2; rq = -sg*N/r
    return -rq*qd/r**2 + sg*a*(1 - rq*qd)*M/r**2
def exact_anti(q, qp, qd, a):
    sd = sin((q - qp)/2); r = 2*cos((q - qp)/2); return sd*qd/r**2 - a*(1 + sd*qd)*sd/r
P4 = lambda x: I(str(x)); ex = {"U": exact_mer(q4, st4["U"][0], qd4, st4["U"][1], 1), "L": exact_mer(q4, st4["L"][0], qd4, st4["L"][1], -1), "A": exact_anti(q4, st4["A"][0], qd4, st4["A"][1])}
cf = {"U": d_mer(P4(q4), P4(st4["U"][0]), Z, P4(qd4), 1, P4(st4["U"][1])), "L": d_mer(P4(q4), P4(st4["L"][0]), Z, P4(qd4), -1, P4(st4["L"][1])), "A": d_anti(P4(q4), P4(st4["A"][0]), Z, P4(qd4), P4(st4["A"][1]))}
cw = {"U": d_mer(P4(q4), P4(st4["U"][0]), Z, P4(qd4), 1, Z), "L": d_mer(P4(q4), P4(st4["L"][0]), Z, P4(qd4), -1, Z), "A": d_anti(P4(q4), P4(st4["A"][0]), Z, P4(qd4), Z)}
err4 = {k: abs((lo(cf[k]) + up(cf[k]))/2 - ex[k]) for k in ex}; dif4 = {k: abs((lo(cw[k]) + up(cw[k]))/2 - ex[k]) for k in ex}
okK4 = all(v < mpf("1e-26") for v in err4.values()); okW4 = all(v > mpf("1e-4") for v in dif4.values())
out["controls"]["K4_exact_expanded_state_v0_accelerating_sources"] = {"state": {"q": "0.55", "qdot": "0.33", "unlike": ["0.28", "a=0.105"], "like": ["0.15", "a=0.103"], "antipode": ["0.10", "a=0.101"]}, "exact": {k: str(v) for k, v in ex.items()}, "closed_form_mid": {k: str((lo(cf[k]) + up(cf[k]))/2) for k in cf}, "abs_err": {k: str(v) for k, v in err4.items()}, "pass": bool(okK4)}
out["controls"]["W4_zero_source_acceleration_differs"] = {"abs_diff": {k: str(v) for k, v in dif4.items()}, "detected": bool(okW4)}
print("K4 exact", {k: mp.nstr(v, 12) for k, v in ex.items()}, "err", {k: mp.nstr(v, 3) for k, v in err4.items()}, "W4 diffs", {k: mp.nstr(v, 3) for k, v in dif4.items()}, flush=True)
print("controls K1", okK1, "K3", okK3, "W", okW, "K4", okK4, "W4", okW4, flush=True); assert okK1 and okK3 and okW and okK4 and okW4, "control failure"
p = sys.argv[1]; assert not os.path.exists(p); json.dump(out, open(p, "w"), indent=1); print("saved", p)
