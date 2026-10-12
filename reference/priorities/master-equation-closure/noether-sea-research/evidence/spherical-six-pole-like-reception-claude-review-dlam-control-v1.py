# Like-reception campaign, review (ramon-e-moore lens), 2026-10-11 22:12 UTC: controls for the review's three-class support-derivative functions on the NEW
# domain, executed on the UNCHANGED function definitions of audit6.py (hash asserted; definitions exec'd as text up to "def sgn("). No target here.
# (K1) exact hand-derived case: all classes at the zero state with delayed accelerations g: d a_rad/dt = -g^2/sqrt2 exactly (antipode term exactly 0).
# (K3) prescribed-history known case on the new domain: every member follows h(s) = 0.02 + 0.03 s + 0.045 s^2 (acceleration 0.09 prescribed, not the law);
#      at t = 3.0 (q = 0.515, qdot = 0.30; unlike delayed state near q' = 0.24, v' = 0.20) the delays of the three classes are solved by bisection in
#      separately written point formulas, lambda_hat(t) = -h'(t)^2 - a_rad(t) is differenced centrally (h = 1e-5 and 5e-6, Richardson), and compared with the
#      closed-form -2 h' h'' - d a_rad/dt from d_mer / d_anti with the source acceleration 0.09. Also at t = 3.3 (q = 0.609).
# (W) negative: the same closed form with the source acceleration set to 0 (a window-type or missing-record error) must differ detectably.
import os, sys, json, hashlib
print("PID", os.getpid(), flush=True)
SRC = "reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-six-pole-like-reception-claude-review-audit6.py"
src = open(SRC, "rb").read(); hsh = hashlib.sha256(src).hexdigest(); assert hsh == "41ab269205519c019b6b4d7855d050acc2b454432d2e33501661576d2da19373", hsh
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
print("controls K1", okK1, "K3", okK3, "W", okW, flush=True); assert okK1 and okK3 and okW, "control failure"
p = sys.argv[1]; assert not os.path.exists(p); json.dump(out, open(p, "w"), indent=1); print("saved", p)
