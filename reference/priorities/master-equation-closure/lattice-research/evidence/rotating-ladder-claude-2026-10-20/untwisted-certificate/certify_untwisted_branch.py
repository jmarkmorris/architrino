"""Certified continuous branch of the untwisted rotating alternating ladder over a speed range.

For pieces E_i = [e_i, e_{i+1}] covering [eps_a, eps_b] the driver finds Delta_i = [m - r, m + r] and checks
  (i)  G_delta(Delta_i, E_i) > 0                      (interval enclosure, all rungs, tail included)
  (ii) K_i = m - G(m, E_i)/c + (1 - G_delta(Delta_i, E_i)/c)(Delta_i - m)  lies in int Delta_i
  (iii) S(Delta_i, E_i) > 0, and records R = S/eps^2 enclosed by S(Delta_i, E_i)/E_i^2,
and for consecutive pieces (iv) Delta_i and Delta_{i+1} overlap. Then for each eps in E_i there is exactly
one zero delta(eps) of G(., eps) in Delta_i, and (iv) glues the pieces into one continuous branch
(proof in the note analysis/rotating-ladder-claude-2026-10-20-untwisted-certified-branch.md).

Rows: the frozen kernel's root enclosure, Dual arithmetic and tail bounds are imported unchanged. The row
function here differs from the kernel's only in the enclosure of p = sinc(theta) and p' over a wide theta
interval, which uses the mean-value form with the proved bounds |sinc'(x)| <= min(x/3, 1/2) and
|sinc''(x)| <= 1/3 (sinc(x) = int_0^1 cos(xt) dt), intersected with the kernel's direct enclosure.

Usage:
  python certify_untwisted_branch.py selftest
  python certify_untwisted_branch.py cover eps_a eps_b N_schedule w0_rel receipt_name [deadline_utc_epoch]
  (N_schedule e.g. "2000:0.6,6000:0.85,20000:1")
"""
import json, math, os, sys, time
import numpy as np
from mpmath import iv

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import ladder_interval_kernel as L
from ladder_interval_kernel import Dual, I

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, *([".."] * 7)))
PROG_DIR = os.path.join(ROOT, ".local-data/master-equation-closure/rotating-ladder/claude-2026-10-20/untwisted-certificate")
os.makedirs(PROG_DIR, exist_ok=True)
THIRD = iv.mpf(1) / 3
WMAX = 0.004  # largest piece width tried; pilot: G(m, E) widths are about 1.2-5 times the piece width
HALF = iv.mpf(0.5)


def s(x):
    return [str(x.a), str(x.b)]


# ---------------------------------------------------------------- sinc enclosures over wide intervals

def sinc_mv(X):
    """Enclosure of sinc and sinc' over X (X >= 0): intersection of the kernel's direct forms with the
    mean-value forms around the midpoint."""
    if X.b == X.a:
        return L.sinc_iv(X), L.dsinc_iv(X)
    m = X.mid
    sm, dm = L.sinc_iv(m), L.dsinc_iv(m)
    dX = X - m
    bound = X.b / 3
    if bound > HALF:
        bound = HALF
    d_rng = iv.mpf([-bound.b, bound.b])
    D1 = dm + iv.mpf([-THIRD.b, THIRD.b]) * dX           # |sinc''| <= 1/3
    D1 = L.intersect(D1, d_rng) or D1
    P = sm + D1 * dX
    if X.a > 1e-3:
        Pd = iv.sin(X) / X
        P = L.intersect(P, Pd) or P
        Dd = (X * iv.cos(X) - iv.sin(X)) / (X * X)
        D1 = L.intersect(D1, Dd) or D1
    P = L.intersect(P, iv.mpf([-0.25, 1])) or P            # sinc in [-0.2173, 1]
    return P, D1


def d_sinc_mv(u):
    P, D1 = sinc_mv(u.v)
    if u.g is None:
        return Dual(P, None)
    return Dual(P, (D1 * u.g[0], D1 * u.g[1]))


def root_robust(nu, z, eps, guess, rho):
    """Kernel root enclosure from a guess box; on failure retry with the box radius inflated 4x
    (up to 5 times, keeping the box positive), then the kernel's Lemma 1 bracket. Any success is a
    Newton certificate; the guess only places the box."""
    if guess is None:
        mid = z.mid if nu == 1 else iv.sqrt(z.mid * z.mid + 4)
        guess = float(mid.a)
        rho = 1e-3 * (1 + guess)
    rr = rho
    for _ in range(6):
        if rr < 0.95 * guess:
            try:
                return L.root_enclosure(nu, z, eps, guess=guess, rho=rr)
            except RuntimeError:
                pass
        rr *= 4
    return L.root_enclosure(nu, z, eps)


def row_mv(nu, k, delta, eps, grad=False, guess=None, rho=None):
    z = k * delta
    T, rec = root_robust(nu, z, eps, guess, rho)
    if grad:
        wT = T - nu * eps * iv.sin(eps * T)
        tau = Dual(T, (k * z / wT, nu * T * iv.sin(eps * T) / wT))
        e = Dual(eps, (I(0), I(1)))
    else:
        tau = Dual(T, None)
        e = Dual(eps, None)
    th = e * tau
    p = d_sinc_mv(th)
    w = tau * (1 - nu * (e * e) * p)
    g = p / (tau * w)
    half = th * I(0.5)
    if nu == 1:
        sn = L.d_sin(half)
        c = 2 * (sn * sn)
    else:
        cc = L.d_cos(half)
        c = 2 * (cc * cc)
    h = c / ((tau * tau) * w)
    return {"g": g, "h": h, "tau": T, "rec": rec}


def sums(delta, eps, N, grad, dc, ec, rho_fn, hb=None):
    """Enclosures over the box of G, S and (grad) G_delta, all rungs (head + kernel tail bounds)."""
    gp = L.float_roots(1, range(0, N + 2), dc, ec)
    gm = L.float_roots(-1, range(0, N + 2), dc, ec)
    r0 = row_mv(-1, 0, delta, eps, grad=grad, guess=gm[0], rho=rho_fn(0))
    G, S = r0["g"].v, r0["h"].v
    Gd = r0["g"].g[0] if grad else None
    its = [r0["rec"][0]]
    for k in range(1, N + 1):
        a = row_mv(1, k, delta, eps, grad=grad, guess=gp[k], rho=rho_fn(k))
        b = row_mv(-1, k, delta, eps, grad=grad, guess=gm[k], rho=rho_fn(k))
        sg = 2 if k % 2 == 0 else -2
        G = G + sg * (a["g"].v + b["g"].v)
        S = S + sg * (b["h"].v - a["h"].v)
        if grad:
            Gd = Gd + sg * (a["g"].g[0] + b["g"].g[0])
        its.append(max(a["rec"][0], b["rec"][0]))
        if hb is not None and k % 250 == 0:
            hb("k=%d" % k)
    M = N + 1
    aM = row_mv(1, M, delta, eps, guess=gp[M], rho=rho_fn(M))
    bM = row_mv(-1, M, delta, eps, guess=gm[M], rho=rho_fn(M))
    tb = L.tail_bounds(delta, eps, N)
    sM = 1 if M % 2 == 0 else -1
    out = {"G": G + sM * (aM["g"].v + bM["g"].v + L.pm(tb["I2"])), "S": S + L.pm(tb["S_abs"]),
           "tail": {"I2": float(tb["I2"].b), "S_abs": float(tb["S_abs"].b), "Gd_abs": float(tb["Gd_abs"].b)},
           "head_newton_max": max(its)}
    if grad:
        out["Gd"] = Gd + L.pm(tb["Gd_abs"])
    return out


# ---------------------------------------------------------------- float branch (seeds only)

def float_G(d, e, Nf=20000):
    ks = np.arange(1, Nf + 2)
    tot = None
    for nu in (1, -1):
        t = L.float_roots(nu, ks, d, e)
        th = e * t
        p = np.sin(th) / th
        g = p / (t * t * (1 - nu * e * e * p))
        tot = g if tot is None else tot + g
    t0 = L.float_roots(-1, [0], d, e)[0]
    th0 = e * t0
    p0 = math.sin(th0) / th0
    g0 = p0 / (t0 * t0 * (1 + e * e * p0))
    sg = np.where(ks % 2 == 0, 2.0, -2.0)
    return g0 + np.sum(sg[:-1] * tot[:-1]) + 0.5 * sg[-1] * tot[-1]


def float_delta(e, d0):
    d = d0
    for _ in range(30):
        g = float_G(d, e)
        gd = (float_G(d + 1e-6, e) - g) / 1e-6
        step = g / gd
        d -= step
        if abs(step) < 1e-13:
            break
    return d, gd


# ---------------------------------------------------------------- one piece

def krawczyk_1d(Gm, Gd, m, D):
    c = float(Gd.mid)
    ci = I(c)
    K = m - Gm / ci + (1 - Gd / ci) * (D - m)
    return K, c


def piece(ea, eb, d_guess, N, hb):
    """Attempt one piece. Returns a record dict (success or failure, with reason)."""
    E = iv.mpf([I(ea).a, I(eb).b])
    ec = 0.5 * (ea + eb)
    w = eb - ea
    rec = {"E": [repr(ea), repr(eb)], "N": N}
    t0 = time.time()
    try:
        m_f, gd_f = float_delta(ec, d_guess)
        m = I(m_f)
        Lc = 1 - eb * eb
        rho0 = lambda k: min(3.0 * (w / 2) / Lc + 1e-12 * (1 + 4 * k), 0.4 * (1 + k))
        P = sums(m, E, N, False, m_f, ec, rho0, hb)
        Gm = P["G"]
        m_f = float(m_f)
        rec.update({"m": repr(m_f), "G_m_E": s(Gm), "float_Gdelta": float(gd_f)})
        gmax = max(abs(float(Gm.a)), abs(float(Gm.b)))
        r = max(2.0 * gmax / abs(gd_f), 1e-12)
        tries = []
        for attempt in range(3):
            D = iv.mpf([(m - r).a, (m + r).b])
            rho = lambda k: min(3.0 * (k * r + w / 2) / Lc + 1e-12 * (1 + 4 * k), 0.45 * (1 + k * m_f))
            B = sums(D, E, N, True, m_f, ec, rho, hb)
            K, c = krawczyk_1d(Gm, B["Gd"], m, D)
            inside = L.strictly_inside(K, D)
            pos = bool(B["Gd"].a > 0)
            tries.append({"r": r, "Delta": s(D), "Gdelta_box": s(B["Gd"]), "c": c, "K": s(K), "K_inside": inside,
                          "Gdelta_positive": pos, "S_box": s(B["S"]), "tail": B["tail"],
                          "newton_max": [P["head_newton_max"], B["head_newton_max"]]})
            if inside and pos:
                Sb = B["S"]
                Rb = Sb / (E * E) if Sb.a > 0 else None
                rec.update({"ok": Sb.a > 0, "Delta": s(D), "K": s(K), "delta_enclosure": s(L.intersect(K, D)),
                            "Gdelta_box": s(B["Gd"]), "S_box": s(Sb), "S_positive": bool(Sb.a > 0),
                            "R_enclosure": s(Rb) if Rb is not None else None, "tries": tries,
                            "seconds": time.time() - t0})
                if not Sb.a > 0:
                    rec["reason"] = "S not certified positive"
                return rec
            if not pos:
                break
            kr = max(abs(float(K.a) - m_f), abs(float(K.b) - m_f))
            if kr * 1.3 <= r:
                break
            r = kr * 1.3
        rec.update({"ok": False, "reason": "Krawczyk containment or G_delta > 0 failed", "tries": tries,
                    "seconds": time.time() - t0})
        return rec
    except (RuntimeError, ValueError, ZeroDivisionError) as exc:
        rec.update({"ok": False, "reason": "exception: %s" % exc, "seconds": time.time() - t0})
        return rec


# ---------------------------------------------------------------- self-test (known cases)

def selftest():
    out = {}
    # S1: 1-D parametric Krawczyk on G~(d, e) = d^2 - 2 - e, e in [0, 0.1]; zeros sqrt(2 + e)
    E = iv.mpf([0, 0.1])
    m = I(1.43)
    D = iv.mpf([1.40, 1.46])
    Gm = m * m - 2 - E
    Gd = 2 * D
    K, c = krawczyk_1d(Gm, Gd, m, D)
    ok1 = L.strictly_inside(K, D) and bool(K.a <= iv.sqrt(I(2)).a) and bool(iv.sqrt(I(2.1)).b <= K.b)
    out["S1_parametric_krawczyk_known"] = {"K": s(K), "pass": bool(ok1)}
    # S1b: a box without zeros must fail
    Db = iv.mpf([1.50, 1.56]); mb = I(1.53)
    Kb, _ = krawczyk_1d(mb * mb - 2 - E, 2 * Db, mb, Db)
    out["S1b_rootless_box_fails"] = {"K": s(Kb), "pass": not L.strictly_inside(Kb, Db)}
    # S2: sinc_mv against exact values at points of wide intervals (falsification test)
    import mpmath
    mpmath.mp.dps = 30
    bad = 0
    for (a, b) in [(0.0005, 0.002), (0.01, 0.03), (0.3, 0.9), (2.0, 9.0), (100.0, 400.0), (0.0, 0.5)]:
        X = iv.mpf([a, b])
        P, D1 = sinc_mv(X)
        for t in np.linspace(a, b, 41):
            t = mpmath.mpf(t)
            sv = mpmath.sinc(t)
            dv = (t * mpmath.cos(t) - mpmath.sin(t)) / t ** 2 if t != 0 else mpmath.mpf(0)
            if not (P.a <= sv <= P.b and D1.a <= dv <= D1.b):
                bad += 1
    out["S2_sinc_mv_contains_samples"] = {"violations": bad, "pass": bad == 0}
    # S3: row_mv at degenerate boxes overlaps the frozen kernel row (which passed the controls)
    bad = 0
    for (d, e) in [(3.345035293, 0.01384081428), (2.973283306, 0.4843985142), (2.214456143, 0.8722131936)]:
        for nu in (1, -1):
            for k in (0, 1, 5, 300):
                if nu == 1 and k == 0:
                    continue
                a = row_mv(nu, k, I(d), I(e), grad=True)
                b = L.row(nu, k, I(d), I(e), grad=True)
                for x, y in [(a["g"].v, b["g"].v), (a["h"].v, b["h"].v), (a["g"].g[0], b["g"].g[0])]:
                    if L.intersect(x, y) is None:
                        bad += 1
    out["S3_row_mv_vs_kernel_points"] = {"disjoint": bad, "pass": bad == 0}
    # S4: row_mv over an eps-interval contains kernel point values at sampled eps (falsification test)
    bad = 0
    for (d, e0, wd) in [(3.3, 0.01, 0.001), (3.2, 0.3, 0.003), (2.2, 0.87, 0.002)]:
        E = iv.mpf([e0, e0 + wd])
        for nu in (1, -1):
            for k in (0, 1, 7, 60, 900):
                if nu == 1 and k == 0:
                    continue
                Rw = row_mv(nu, k, I(d), E, grad=True)
                for e in np.linspace(e0, e0 + wd, 5):
                    Rp = L.row(nu, k, I(d), I(float(e)), grad=True)
                    for x, y in [(Rw["g"].v, Rp["g"].v), (Rw["h"].v, Rp["h"].v), (Rw["g"].g[0], Rp["g"].g[0])]:
                        if not (x.a <= y.a and y.b <= x.b):
                            bad += 1
    out["S4_interval_row_contains_point_rows"] = {"violations": bad, "pass": bad == 0}
    # S5: independent reference (PI's 55-digit Codex point at R = 1000) lies in the piece enclosure
    ref_d, ref_e = "3.34503529272328827", "0.01384081428068128"
    rec = piece(0.01384, 0.01385, 3.345035, 2000, None)
    ok5 = bool(rec.get("ok")) and L.intersect(iv.mpf([I(rec["delta_enclosure"][0].strip("[]").split(",")[0]).a,
                                                        I(rec["delta_enclosure"][1].strip("[]").split(",")[0]).b]),
                                               I(ref_d)) is not None and 0.01384 <= float(ref_e) <= 0.01385
    out["S5_reference_point_in_piece"] = {"piece": rec, "reference": [ref_d, ref_e], "pass": bool(ok5)}
    allp = all(v["pass"] for v in out.values())
    res = {"selftest": out, "all_pass": allp}
    name = "branch_selftest_receipt.json" if allp else \
        "branch_selftest_receipt_FAILED_%s.json" % time.strftime("%Y%m%dT%H%M%SZ", time.gmtime())
    json.dump(res, open(os.path.join(HERE, name), "w"), indent=1,
              default=lambda o: o.item() if hasattr(o, "item") else str(o))
    print({k: v["pass"] for k, v in out.items()}, "all_pass", allp, name)


# ---------------------------------------------------------------- covering

def cover(ea, eb, N, w0_rel, receipt, deadline):
    """N is a schedule string 'N1:e1,N2:e2,...': use N1 for pieces ending at or below e1, etc."""
    sched = [(int(a), float(b)) for a, b in (x.split(":") for x in N.split(","))]

    def N_of(e2):
        for n, lim in sched:
            if e2 <= lim:
                return n
        return sched[-1][0]
    assert json.load(open(os.path.join(HERE, "branch_selftest_receipt.json")))["all_pass"]
    prog = os.path.join(PROG_DIR, "progress_" + receipt.replace(".json", ".txt"))
    last = [0.0]

    def hb(msg, force=False):
        now = time.time()
        if force or now - last[0] >= 30:
            with open(prog, "a") as fh:
                fh.write("%s %s\n" % (time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()), msg))
                fh.flush()
            last[0] = now

    t0 = time.time()
    pieces, failures = [], []
    e = ea
    w = w0_rel * ea
    d_guess = float_delta(ea, 3.345)[0]
    stop = None
    while e < eb:
        if time.time() > deadline:
            stop = "deadline reached at eps = %r" % e
            break
        e2 = min(e + w, eb)
        Ne = N_of(e2)
        hb("piece [%r, %r] w=%.3g N=%d" % (e, e2, w, Ne), force=True)
        rec = piece(e, e2, d_guess, Ne, hb)
        rec["width"] = e2 - e
        if rec.get("ok"):
            if pieces:
                prevD = pieces[-1]["Delta"]
                Dp = iv.mpf([I(prevD[0].strip("[]").split(",")[0]).a, I(prevD[1].strip("[]").split(",")[0]).b])
                Dn = iv.mpf([I(rec["Delta"][0].strip("[]").split(",")[0]).a, I(rec["Delta"][1].strip("[]").split(",")[0]).b])
                rec["overlaps_previous_Delta"] = L.intersect(Dp, Dn) is not None
                if not rec["overlaps_previous_Delta"]:
                    rec["ok"] = False
                    rec["reason"] = "Delta does not overlap previous piece"
        if rec.get("ok"):
            pieces.append(rec)
            e = e2
            d_guess = float(rec["m"])
            w = min(w * 1.3, 0.5 * e2, WMAX)
        else:
            failures.append(rec)
            w = w / 2
            if w < 1e-7 * max(e, 1e-3):
                stop = "piece width below 1e-7 relative at eps = %r: %s" % (e, rec.get("reason"))
                break
        res = {"eps_a": ea, "eps_b_target": eb, "covered_to": e, "N": N, "pieces": pieces, "failures": failures,
               "stop": stop, "runtime_s": time.time() - t0, "complete": e >= eb,
               "interval_library": "mpmath 1.3.0 iv, dps %d" % iv.dps}
        json.dump(res, open(os.path.join(HERE, receipt), "w"), indent=1,
                  default=lambda o: o.item() if hasattr(o, "item") else str(o))
        print("eps", e, "pieces", len(pieces), "failures", len(failures), "last ok", rec.get("ok"),
              rec.get("reason", ""), "%.1fs" % rec["seconds"], flush=True)
    res = {"eps_a": ea, "eps_b_target": eb, "covered_to": e, "N": N, "pieces": pieces, "failures": failures,
           "stop": stop, "runtime_s": time.time() - t0, "complete": e >= eb,
           "interval_library": "mpmath 1.3.0 iv, dps %d" % iv.dps}
    json.dump(res, open(os.path.join(HERE, receipt), "w"), indent=1,
              default=lambda o: o.item() if hasattr(o, "item") else str(o))
    hb("finished covered_to=%r stop=%s" % (e, stop), force=True)
    print("covered to", e, "complete", res["complete"], "stop", stop)


if __name__ == "__main__":
    if sys.argv[1] == "selftest":
        selftest()
    else:
        ea, eb, N, w0, rc = float(sys.argv[2]), float(sys.argv[3]), sys.argv[4], float(sys.argv[5]), sys.argv[6]
        dl = float(sys.argv[7]) if len(sys.argv) > 7 else time.time() + 3600
        cover(ea, eb, N, w0, rc, dl)
