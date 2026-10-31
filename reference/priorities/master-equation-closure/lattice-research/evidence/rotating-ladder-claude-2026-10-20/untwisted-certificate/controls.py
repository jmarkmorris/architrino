"""Known-case controls for the untwisted ladder interval certificate. Run before any target.

C1  interval Newton on a function with a known root (x^2 - 2 on [1, 2]) and the kernel's
    causal-root enclosure at eps = 0, where the roots are known exactly (stationary sources):
    tau_+ = |z|, tau_- = sqrt(z^2 + 4).
C2  static alternating sums at eps = 0 through the kernel's head + certified tail, against
    sum_{k != 0} (-1)^k/(k delta)^2 = -pi^2/(6 delta^2) and
    sum_k (-1)^k/(4 + k^2 delta^2) = pi/(2 delta sinh(2 pi/delta)); and S_0 against Lemma 8's bracket.
C3  raw three-vector float evaluation of complete rows (positions, causal root by bisection, D,
    acceleration vector), written separately from the kernel, against the kernel's scalar reduction.
C4  2-D Krawczyk routine on a system with a known root: x^2 + y^2 - 2 = 0, x - y = 0, root (1, 1).
C5  tail consistency at one point: enclosures of G and S with N = 300 and N = 3000 must overlap
    (a falsification test of the tail bounds, not a proof).
Writes controls_receipt.json next to this file.
"""
import json, math, os, sys, time
import numpy as np
from mpmath import iv, mp

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import ladder_interval_kernel as L

HERE = os.path.dirname(os.path.abspath(__file__))
rec = {"controls": {}}
t_all = time.time()


def s(x):
    return [str(x.a), str(x.b)]


# ---------------- C1
def newton_generic(f, df, T, maxit=50):
    cert = False
    for _ in range(maxit):
        m = T.mid
        Nt = m - f(m) / df(T)
        if L.strictly_inside(Nt, T):
            cert = True
        Tn = L.intersect(Nt, T)
        if Tn is None:
            return None, cert
        if cert and L.width(Tn) >= 0.5 * L.width(T):
            return Tn, cert
        T = Tn
    return T, cert


T, cert = newton_generic(lambda x: x * x - 2, lambda x: 2 * x, iv.mpf([1, 2]))
mp.dps = 40
sq2 = mp.sqrt(2)
c1a = bool(cert) and bool(T.a <= sq2) and bool(sq2 <= T.b)
mp.dps = 15
rec["controls"]["C1a_newton_sqrt2"] = {"certified": cert, "enclosure": s(T), "width": L.width(T),
                                       "contains_sqrt2_40digits": c1a, "pass": bool(cert and c1a)}

c1b = []
ok = True
for nu in (1, -1):
    for k, dl in [(1, 3.345), (7, 2.5), (1000, 3.345035293), (0, 3.0)]:
        if nu == 1 and k == 0:
            continue
        delta = L.I(dl)
        z = k * delta
        guess = float(k * dl) if nu == 1 else math.sqrt((k * dl) ** 2 + 4)
        Tk, r = L.root_enclosure(nu, z, L.I(0), guess=guess, rho=1e-6)
        exact = z if nu == 1 else iv.sqrt(z * z + 4)
        good = bool(r[1]) and L.intersect(Tk, exact) is not None and L.width(Tk) < 1e-15 * (1 + guess)
        ok = ok and good
        c1b.append({"nu": nu, "k": k, "delta": dl, "enclosure": s(Tk), "exact": s(exact), "pass": good})
rec["controls"]["C1b_stationary_root"] = {"cases": c1b, "pass": ok}

# ---------------- C2: static sums at eps = 0
mp.dps = 30


def static_rails(dl, N):
    delta = L.I(dl)
    e0 = L.I(0)
    own = L.I(0)
    oth = L.row(-1, 0, delta, e0, guess=2.0, rho=1e-9)["g"].v
    for k in range(1, N + 1):
        a = L.row(1, k, delta, e0, guess=k * dl, rho=1e-6)["g"].v
        b = L.row(-1, k, delta, e0, guess=math.sqrt((k * dl) ** 2 + 4), rho=1e-6)["g"].v
        sg = 2 if k % 2 == 0 else -2
        own = own + sg * a
        oth = oth + sg * b
    M = N + 1
    aM = L.row(1, M, delta, e0, guess=M * dl, rho=1e-6)["g"].v
    bM = L.row(-1, M, delta, e0, guess=math.sqrt((M * dl) ** 2 + 4), rho=1e-6)["g"].v
    tb = L.tail_bounds(delta, e0, N)
    half = tb["I2"] / 2  # per-rail bound
    sM = 1 if M % 2 == 0 else -1
    own_t = own + sM * (aM + L.pm(half))
    oth_t = oth + sM * (bM + L.pm(half))
    return own_t, oth_t


c2 = []
ok = True
for dl, N in [(3.3452801575, 400), (2.0, 400), (5.0, 400)]:
    own, oth = static_rails(dl, N)
    delta = L.I(dl)
    own_exact = -iv.pi ** 2 / (6 * delta * delta)
    yv = 2 * iv.pi / delta
    oth_exact = iv.pi / (2 * delta * ((iv.exp(yv) - iv.exp(-yv)) / 2))
    Gfull = L.ladder_sums(delta, L.I(0), N, seed=(dl, 0.0, lambda k: 1e-6))
    B = oth_exact + own_exact
    good = (L.intersect(own, own_exact) is not None and L.intersect(oth, oth_exact) is not None
            and L.intersect(Gfull["G"], B) is not None)
    S0 = Gfull["S"]
    lo8 = iv.mpf(0.25) - 4 / (4 + delta * delta) ** 1.5
    hi8 = lo8 + 4 / (4 + 4 * delta * delta) ** 1.5
    good8 = bool(S0.a >= lo8.a) and bool(S0.b <= hi8.b)
    ok = ok and good and good8
    c2.append({"delta": dl, "N": N, "own_enclosure": s(own), "own_closed_form": s(own_exact),
               "other_enclosure": s(oth), "other_closed_form": s(oth_exact),
               "G_enclosure": s(Gfull["G"]), "B_closed_form": s(B),
               "G_width": L.width(Gfull["G"]), "S0_enclosure": s(S0), "lemma8_bracket": [str(lo8.a), str(hi8.b)],
               "pass": bool(good and good8)})
rec["controls"]["C2_static_sums"] = {"cases": c2, "pass": ok}

# ---------------- C3: raw three-vector rows vs reduction


def raw_row(nu, k, delta, eps):
    """Raw canonical law, float: receiver x=(1,0,0) at T=0; source path X(t)=(nu cos eps t, nu sin eps t, k delta)."""
    x = np.array([1.0, 0.0, 0.0])

    def X(t):
        return np.array([nu * math.cos(eps * t), nu * math.sin(eps * t), k * delta])

    def V(t):
        return np.array([-nu * eps * math.sin(eps * t), nu * eps * math.cos(eps * t), 0.0])

    f = lambda tau: tau - np.linalg.norm(x - X(-tau))
    a, b = 1e-12, 10.0 + abs(k) * delta * 2
    for _ in range(200):
        m = 0.5 * (a + b)
        if f(m) > 0:
            b = m
        else:
            a = m
    tau = 0.5 * (a + b)
    r = x - X(-tau)
    n = r / tau
    D = 1 - n.dot(V(-tau))
    sigma = nu * (-1) ** k
    acc = sigma * r / (tau ** 3 * abs(D))
    return tau, D, acc, X(-tau)


c3 = []
ok = True
for (dl, ef) in [(3.345035293, 0.01384081428), (3.3, 0.3)]:
    for nu in (1, -1):
        for k in (0, 1, 2, 7, 40):
            if nu == 1 and k == 0:
                continue
            tau, D, acc, Xs = raw_row(nu, k, dl, ef)
            r = L.row(nu, k, L.I(dl), L.I(ef))
            sign = (-1) ** k
            g = float(r["g"].v.mid)
            h = float(r["h"].v.mid)
            tan_red = ef * sign * g
            rad_red = nu * sign * h
            dt = abs(acc[1] - tan_red) / max(abs(acc[1]), 1e-300)
            dr = abs(acc[0] - rad_red) / max(abs(acc[0]), 1e-300)
            dtau = abs(tau - float(r["tau"].mid)) / tau
            # axial partner check: rung -k gives the opposite axial component
            tau2, D2, acc2, _ = raw_row(nu, -k, dl, ef)
            ax = abs(acc[2] + acc2[2])
            good = dt < 1e-12 and dr < 1e-11 and dtau < 1e-13 and ax <= 1e-15 * (abs(acc[2]) + 1e-300) + 1e-300
            ok = ok and good
            c3.append({"delta": dl, "eps": ef, "nu": nu, "k": k, "tau_raw": tau, "D_raw": D,
                       "a_raw": acc.tolist(), "tan_reduced": tan_red, "rad_reduced": rad_red,
                       "rel_dev_tan": dt, "rel_dev_rad": dr, "rel_dev_tau": dtau, "axial_pair_sum": ax,
                       "pass": bool(good)})
rec["controls"]["C3_raw_row_vs_reduction"] = {"cases": c3, "pass": ok,
                                              "note": "float three-vector law, bisection root; agreement tests the reduction of Lemmas 1-2 at sampled rows"}

# ---------------- C4: Krawczyk on a known system
X = [iv.mpf([0.9, 1.1]), iv.mpf([0.85, 1.12])]
xt = [L.I(1.01), L.I(0.99)]
Fx = [xt[0] ** 2 + xt[1] ** 2 - 2, xt[0] - xt[1]]
JX = [[2 * X[0], 2 * X[1]], [L.I(1), L.I(-1)]]
Jm = np.array([[2.02, 1.98], [1.0, -1.0]])
Y = np.linalg.inv(Jm).tolist()
K, C, contained, normC = L.krawczyk_2d(Fx, JX, xt, X, Y)
has_root = all(bool(K[i].a <= 1 <= K[i].b) for i in range(2))
rec["controls"]["C4_krawczyk_known"] = {"K": [s(K[0]), s(K[1])], "contained": contained, "normC": normC,
                                        "contains_(1,1)": has_root, "pass": bool(contained and has_root)}
# negative control: a box without a root must not certify
Xbad = [iv.mpf([1.2, 1.4]), iv.mpf([1.2, 1.4])]
xtb = [L.I(1.3), L.I(1.3)]
Fb = [xtb[0] ** 2 + xtb[1] ** 2 - 2, xtb[0] - xtb[1]]
Kb, Cb, cb, nb = L.krawczyk_2d(Fb, [[2 * Xbad[0], 2 * Xbad[1]], [L.I(1), L.I(-1)]], xtb, Xbad,
                               np.linalg.inv(np.array([[2.6, 2.6], [1.0, -1.0]])).tolist())
rec["controls"]["C4b_krawczyk_rootless_box"] = {"contained": cb, "pass": (not cb)}

# ---------------- C5: tail consistency
d0, e0 = 3.345035293, 0.01384081428
res = {}
for N in (300, 3000):
    out = L.ladder_sums(L.I(d0), L.I(e0), N, seed=(d0, e0, lambda k: 1e-9 + 1e-12 * k))
    res[N] = out
ovG = L.intersect(res[300]["G"], res[3000]["G"]) is not None
ovS = L.intersect(res[300]["S"], res[3000]["S"]) is not None
rec["controls"]["C5_tail_consistency"] = {
    "G_N300": s(res[300]["G"]), "G_N3000": s(res[3000]["G"]),
    "S_N300": s(res[300]["S"]), "S_N3000": s(res[3000]["S"]),
    "G_width_N300": L.width(res[300]["G"]), "G_width_N3000": L.width(res[3000]["G"]),
    "G_head_change_N300_to_N3000": float((res[3000]["G_head"] - res[300]["G_head"]).mid),
    "pass": bool(ovG and ovS)}

rec["all_pass"] = all(v["pass"] for v in rec["controls"].values())
rec["iv_dps"] = iv.dps
rec["runtime_s"] = time.time() - t_all
with open(os.path.join(HERE, "controls_receipt.json"), "w") as fh:
    json.dump(rec, fh, indent=1, default=lambda o: o.item() if hasattr(o, "item") else str(o))
print({k: bool(v["pass"]) for k, v in rec["controls"].items()}, "all_pass", rec["all_pass"], "runtime", rec["runtime_s"])
