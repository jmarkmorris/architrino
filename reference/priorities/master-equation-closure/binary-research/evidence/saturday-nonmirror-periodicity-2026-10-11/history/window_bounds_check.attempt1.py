"""Kinematic checks for the Saturday non-mirror periodicity note (2026-10-11).

Session instrument.  It evaluates the single partner row of the canonical
Master Equation (c_f = 1, unit coupling, opposite polarity) on PRESCRIBED
analytic planar paths and tests algebra and inequalities that hold for every
twice continuously differentiable path below wake speed.  Prescribed paths do
not obey the equation; nothing here is evidence about solutions.

Order: known cases K1, K2 run and must pass before any target (T1, T2, T3).
Usage: python window_bounds_check.py [out.json]
"""
import cmath, json, math, random, sys
from scipy.optimize import brentq

def dot(a, b): return (a.conjugate() * b).real
def cross(a, b): return (a.conjugate() * b).imag

class Path:
    """z(t) = c + u t + sum_k a_k exp(i(w_k t + p_k)); analytic speed bound."""
    def __init__(self, c, u, harm):
        self.c, self.u, self.h = c, u, harm
        self.wmax = abs(u) + sum(abs(a) * abs(w) for a, w, p in harm)
    def z(self, t): return self.c + self.u * t + sum(a * cmath.exp(1j * (w * t + p)) for a, w, p in self.h)
    def v(self, t): return self.u + sum(1j * w * a * cmath.exp(1j * (w * t + p)) for a, w, p in self.h)
    def a(self, t): return sum(-w * w * a * cmath.exp(1j * (w * t + p)) for a, w, p in self.h)

def root(recv, emit, t):
    """Emission time s<t with t-s = |recv(t)-emit(s)| (unique below wake speed)."""
    zr = recv.z(t)
    g = lambda s: t - s - abs(zr - emit.z(s))
    d0 = abs(zr - emit.z(t))
    lo = t - d0 / (1.0 - emit.wmax) - 1e-9 - 1e-12 * abs(t)
    return brentq(g, lo, t, xtol=1e-15, rtol=4e-16, maxiter=400)

def row(recv, emit, t):
    s = root(recv, emit, t); tau = t - s
    n = (recv.z(t) - emit.z(s)) / tau
    D = 1.0 - dot(n, emit.v(s))
    return s, tau, n, D, 1.0 / (tau * tau * D)

def state(p1, p2, t):
    r = p1.z(t) - p2.z(t); R = abs(r); rh = r / R; th = 1j * rh
    s1, tau1, n1, D1, rho1 = row(p1, p2, t)
    s2, tau2, n2, D2, rho2 = row(p2, p1, t)
    a1, a2 = -rho1 * n1, -rho2 * n2
    return dict(r=r, R=R, rh=rh, th=th, s1=s1, s2=s2, tau1=tau1, tau2=tau2, D1=D1, D2=D2,
                rho1=rho1, rho2=rho2, n1=n1, n2=n2, rate=cross(r, a1 - a2),
                mu1=dot(th, p1.v(t)), mu2=dot(th, p2.v(t)),
                D1v=p1.z(t) - p1.z(s2), D2v=p2.z(t) - p2.z(s1),
                J=cross(r, p1.v(t) - p2.v(t)))

def grid(a, b, n): return [a + (b - a) * k / (n - 1) for k in range(n)]

out = {"instrument": "window_bounds_check.py", "known": {}, "targets": {}}
rng = random.Random(20261011)

# ---- K1: straight uniform histories, closed form (exploration item 4) -------
worst_cf, worst_eq = 0.0, 0.0
for _ in range(400):
    def vel():
        sp, an = rng.uniform(0, 0.95), rng.uniform(0, 2 * math.pi)
        return cmath.rect(sp, an)
    p1 = Path(cmath.rect(rng.uniform(0.5, 30), rng.uniform(0, 6.28)), vel(), [])
    p2 = Path(0j, vel(), [])
    q = state(p1, p2, rng.uniform(-3, 3))
    v1, v2 = p1.u, p2.u
    v1p, v1t, v2p, v2t = dot(q["rh"], v1), dot(q["th"], v1), dot(q["rh"], v2), dot(q["th"], v2)
    S1, S2 = math.sqrt(1 - v1t ** 2), math.sqrt(1 - v2t ** 2)
    closed = (v1t * (1 + v1p / S1) - v2t * (1 - v2p / S2)) / q["R"]
    scale = (abs(v1t) + abs(v2t) + 1e-3) / q["R"]
    worst_cf = max(worst_cf, abs(q["rate"] - closed) / scale)
    lin = q["R"] * (q["rho2"] * q["mu1"] - q["rho1"] * q["mu2"])
    worst_eq = max(worst_eq, abs(q["rate"] - lin) / scale)
assert worst_cf < 1e-9 and worst_eq < 1e-9, (worst_cf, worst_eq)
out["known"]["K1_straight_windows"] = {"cases": 400, "max_scaled_error_closed_form": worst_cf,
                                       "max_scaled_error_zero_curvature_equality": worst_eq}
print("K1 passed", worst_cf, worst_eq)

# ---- K2: rigid mirror circle R=1, omega=0.5 (recorded tau, beta) ------------
p1 = Path(0j, 0j, [(1.0, 0.5, 0.0)]); p2 = Path(0j, 0j, [(1.0, 0.5, math.pi)])
q = state(p1, p2, 0.37)
beta1 = math.asin(-cross(q["rh"], q["D2v"]) / q["tau1"])
e_tau, e_beta = abs(q["tau1"] - 1.800734445179), abs(beta1 - 0.450183611295)
assert e_tau < 1e-11 and e_beta < 1e-11 and abs(beta1 - 0.25 * q["tau1"]) < 1e-13, (e_tau, e_beta)
out["known"]["K2_mirror_circle"] = {"tau": q["tau1"], "beta": beta1, "err_tau": e_tau, "err_beta": e_beta}
print("K2 passed", q["tau1"], beta1)

# ---- targets: curved prescribed paths ---------------------------------------
def curved(wcap):
    """two paths with analytic speed bounds below wcap, separated."""
    def one(c):
        u = cmath.rect(rng.uniform(0, 0.5 * wcap), rng.uniform(0, 6.28))
        budget = wcap * rng.uniform(0.3, 0.98) - abs(u)
        harm, k = [], rng.randint(1, 3)
        for _ in range(k):
            w = rng.choice([-1, 1]) * rng.uniform(0.02, 1.5)
            a = (budget / k) / abs(w) * rng.uniform(0.3, 1.0)
            harm.append((a, w, rng.uniform(0, 6.28)))
        return Path(c, u, harm)
    return one(cmath.rect(rng.uniform(1.0, 40.0), rng.uniform(0, 6.28))), one(0j)

NW = 41
t1 = dict(samples=0, min_margin_lemma=1e9, min_margin_lower=1e9, min_margin_upper=1e9, both_signs=[0, 0])
t2 = dict(samples=0, min_tau=1e9, min_D=1e9, min_rho=1e9, min_rwin=1e9, min_rowsup=1e9,
          min_sinbeta=1e9, min_explicit=1e9, min_gamma=1e9, J_pos=0, J_neg=0, explicit_bound_positive=0)
for case in range(1500):
    wcap = rng.choice([0.05, 0.1, 0.125, 0.2, 0.3, 0.6, 0.9])
    p1, p2 = curved(wcap)
    w = max(p1.wmax, p2.wmax)
    t = rng.uniform(-50, 50)
    q = state(p1, p2, t)
    if q["R"] < 0.2: continue
    R = q["R"]
    # T1: window lemma and Theorem P in path form (true path accelerations)
    ab1 = max(abs(p1.a(u)) for u in grid(q["s2"], t, NW))
    ab2 = max(abs(p2.a(u)) for u in grid(q["s1"], t, NW))
    e1 = abs(dot(q["th"], q["D1v"]) - q["mu1"] * q["tau2"]); b1 = 0.5 * q["tau2"] ** 2 * ab1
    e2 = abs(dot(q["th"], q["D2v"]) - q["mu2"] * q["tau1"]); b2 = 0.5 * q["tau1"] ** 2 * ab2
    t1["min_margin_lemma"] = min(t1["min_margin_lemma"], (b1 - e1) / (b1 + 1e-300), (b2 - e2) / (b2 + 1e-300))
    lin = R * (q["rho2"] * q["mu1"] - q["rho1"] * q["mu2"])
    allow = R * 0.5 * (q["rho2"] * q["tau2"] * ab1 + q["rho1"] * q["tau1"] * ab2)
    t1["min_margin_lower"] = min(t1["min_margin_lower"], (q["rate"] - (lin - allow)) / (allow + 1e-300))
    t1["min_margin_upper"] = min(t1["min_margin_upper"], ((lin + allow) - q["rate"]) / (allow + 1e-300))
    t1["both_signs"][0 if q["rate"] > 0 else 1] += 1
    t1["samples"] += 1
    # T2: explicit constants for an all-history speed bound w < 1/3
    if w >= 0.32: continue
    lo, hi = R / (1 + w), R / (1 - w)
    rmin, rmax = (1 - w) ** 2 / ((1 + w) * R * R), (1 + w) ** 2 / ((1 - w) * R * R)
    Bbar = (1 + w) ** 2 * (1 - w) / ((1 - 3 * w) ** 2 * R * R)
    for tau in (q["tau1"], q["tau2"]): t2["min_tau"] = min(t2["min_tau"], (tau - lo) / R, (hi - tau) / R)
    for D in (q["D1"], q["D2"]): t2["min_D"] = min(t2["min_D"], D - (1 - w), (1 + w) - D)
    for rho in (q["rho1"], q["rho2"]): t2["min_rho"] = min(t2["min_rho"], (rho - rmin) / rmin, (rmax - rho) / rmax)
    for (pa, pb, s) in ((p1, p2, q["s2"]), (p2, p1, q["s1"])):   # pa's path over the window of pb's row
        for u in grid(s, t, 13):
            Ru = abs(p1.z(u) - p2.z(u))
            t2["min_rwin"] = min(t2["min_rwin"], (Ru - R * (1 - 3 * w) / (1 - w)) / R)
            rho_u = row(pa, pb, u)[4]
            t2["min_rowsup"] = min(t2["min_rowsup"], (Bbar - rho_u) / Bbar)
    sb1 = abs(cross(q["rh"], q["D2v"])) / q["tau1"]; sb2 = abs(cross(q["rh"], q["D1v"])) / q["tau2"]
    t2["min_sinbeta"] = min(t2["min_sinbeta"], w - sb1, w - sb2)
    J = q["J"]; sg = 1.0 if J > 0 else -1.0
    t2["J_pos" if J > 0 else "J_neg"] += 1
    lhs = R * R * (sg * lin - R * 0.5 * (q["rho2"] * q["tau2"] + q["rho1"] * q["tau1"]) * Bbar)
    expl = (1 - w) ** 2 * abs(J) / (1 + w) - (6 * w * w + 2 * w ** 4) * R / (1 - w * w) - (1 + w) ** 3 / (1 - 3 * w) ** 2
    t2["min_explicit"] = min(t2["min_explicit"], (lhs - expl) / (abs(expl) + 1.0))
    if expl > 0: t2["explicit_bound_positive"] += 1
    gam = sg * J / R - 0.5 * (q["tau1"] + q["tau2"]) * Bbar
    t2["min_gamma"] = min(t2["min_gamma"], (gam - (abs(J) - (1 + w) ** 2 / (1 - 3 * w) ** 2) / R) * R)
    t2["samples"] += 1
for k in ("min_margin_lemma", "min_margin_lower", "min_margin_upper"): assert t1[k] > -1e-9, (k, t1[k])
for k in ("min_tau", "min_D", "min_rho", "min_rwin", "min_rowsup", "min_sinbeta", "min_explicit", "min_gamma"):
    assert t2[k] > -1e-9, (k, t2[k])
out["targets"]["T1_window_lemma_and_theorem_P_path_form"] = t1
out["targets"]["T2_explicit_constants"] = t2
print("T1", t1); print("T2", t2)

# ---- T3: tabulated numbers quoted in the note -------------------------------
def jP(w, R): return (1 + w) / (1 - w) ** 2 * ((6 * w * w + 2 * w ** 4) * R / (1 - w * w) + (1 + w) ** 3 / (1 - 3 * w) ** 2)
def jQ(w): return (1 + w) ** 2 / (1 - 3 * w) ** 2
def hb(w): return (1 - w) ** 2 * (1 - 3 * w) ** 2 * math.sqrt(1 - w * w) - w * (1 + w) ** 3
tab = {str(w): {"jP_slope": jP(w, 1) - jP(w, 0), "jP_intercept": jP(w, 0), "jQ": jQ(w), "Hb_margin": hb(w)}
       for w in (0.02, 0.05, 0.1, 0.125, 0.14, 0.15, 0.2)}
lo, hi = 0.14, 0.15
for _ in range(60):
    mid = 0.5 * (lo + hi); lo, hi = (mid, hi) if hb(mid) > 0 else (lo, mid)
tab["Hb_threshold"] = lo
out["targets"]["T3_table"] = tab
for k, v in tab.items(): print("T3", k, v)
if len(sys.argv) > 1:
    json.dump(out, open(sys.argv[1], "w"), indent=1)
print("ALL PASSED")
