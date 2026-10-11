# Wave 11: interval-arithmetic enclosure of the twisted-hexagon (challenge cell D1, twist 50 degrees, rest release) window motion from its
# first integral, g = K/(R c_f^2) given (R = c_f = 1). mpmath iv with directed rounding, explicit precision. No ODE integrator.
# Equation on the stationary-source window (wave 9, derived): psi'' = g F(psi), F(psi) = sum_E G(d_E - psi) - sum_P G(d_P - psi),
# G(d) = cos(d/2)/(4 sin^2(d/2)); first integral psi'^2 = 2 g U(psi), U(psi) = W(psi) - W(0) with W = -Phi, Phi = sum sigma/chord;
# t(psi) = int_0^sqrt(psi) I(u) du, I(u) = 2u / sqrt(2 g U(u^2)).  Window end: T* = 2 sin((50 deg - psi(T*))/2).
# Enclosure method: partition of u in [0, u_max]; first cell [0, u1] by monotonicity of F (F' > 0 verified in intervals) giving
# I(u) in [I0/sqrt(1 + F'max u1^2 / F0), I0], I0 = 2/sqrt(2 g F0); every other cell by the midpoint rule with the rigorous error
# (du^3/24) max|I''| from an interval bound of I'' on the cell. Two-sided bounds on t at the partition nodes; inversion psi(t)
# by bracketing nodes and the enclosed slope dpsi/dt = sqrt(2 g U) on the bracketing cell; window end by a bracketed monotone residual.
# Floating premises: mpmath iv implements directed rounding for +,-,*,/,sqrt,sin,cos at the set precision; the trig/sqrt enclosures are
# those of mpmath; the partition nodes are exact dyadic/decimal numbers; the identity chord(d - psi) - chord(d) = -4 cos((2d - psi)/4) sin(psi/4)
# is used in interval form. Run from the checkout root:
#   OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -p perl -e 'alarm 110; exec @ARGV' -- ../.venv/bin/python -I <this file> <g as p/q> <psi_max> <N> <out.json>
import sys, json, time
from mpmath import iv, mp
iv.dps = 30; mp.dps = 30
PI = iv.pi; D = PI/180
def pt(e): return mp.mpf(e.a) if hasattr(e, "a") else mp.mpf(e)
def lo(x): return pt(x.a)
def up(x): return pt(x.b)
def I(a, b): return iv.mpf([a, b])
def s45(e): return mp.nstr(pt(e), 25)
TW = 50*D
SRC = [(-1, TW), (-1, TW + 2*PI/3), (-1, TW + 4*PI/3), (+1, 2*PI/3), (+1, 4*PI/3)]   # (sigma_rel for the field on a positrino: -1 attracts, +1 repels), relative azimuth at psi = 0
def G(d): return iv.cos(d/2)/(4*iv.sin(d/2)**2)
def Gp(d): return -(1 + iv.cos(d/2)**2)/(8*iv.sin(d/2)**3)                  # dG/dd
def F(psi, sign=1):     # azimuthal acceleration per unit g (interval in, interval out)
    return sign*(sum((G(d - psi) for s, d in SRC if s < 0), iv.mpf(0)) - sum((G(d - psi) for s, d in SRC if s > 0), iv.mpf(0)))
def Fp(psi, sign=1):    # dF/dpsi = -[sum_E G'(d - psi) - sum_P G'(d - psi)]
    return sign*(-(sum((Gp(d - psi) for s, d in SRC if s < 0), iv.mpf(0)) - sum((Gp(d - psi) for s, d in SRC if s > 0), iv.mpf(0))))
def chord(d): return 2*iv.sin(d/2)
def U(psi, sign=1):     # W(psi) - W(0) = Phi(0) - Phi(psi), cancellation-free: sigma [1/chord(d) - 1/chord(d - psi)] with chord(d - psi) - chord(d) = -4 cos((2d - psi)/4) sin(psi/4)
    tot = iv.mpf(0)
    for s, d in SRC:
        diff = -4*iv.cos((2*d - psi)/4)*iv.sin(psi/4)
        tot += s*diff/(chord(d)*chord(d - psi))
    return sign*tot

def enclose(g, psi_max, N, sign=1, toy=None, verbose=True):
    """Return partition nodes u_k, two-sided t bounds at nodes, and per-cell data. toy: if given (F0 constant), use F == F0 (closed-form check)."""
    Fu = (lambda p: iv.mpf(toy)) if toy is not None else (lambda p: F(p, sign))
    Fpu = (lambda p: iv.mpf(0)) if toy is not None else (lambda p: Fp(p, sign))
    Uu = (lambda p: iv.mpf(toy)*p) if toy is not None else (lambda p: U(p, sign))
    u_max = iv.sqrt(iv.mpf(psi_max)); u1 = iv.mpf("0.005")
    F0 = Fu(iv.mpf(0))
    if lo(F0) <= 0: return {"rejected": "release acceleration not positive: F(0) encloses " + s45(F0.a) + ".." + s45(F0.b)}
    # first cell [0, u1]: F increasing on [0, u1^2] (interval F' > 0) => U/psi in [F0, F(u1^2)] => I in [I0 / sqrt(F(u1^2)/F0), I0]
    Fp_cell = Fpu(I(0, up(u1**2)))
    if lo(Fp_cell) <= 0 and toy is None: return {"rejected": "F not increasing on the first cell"}
    I0 = 2/iv.sqrt(2*g*F0); Fend = Fu(I(0, up(u1**2)))
    Imin = I0/iv.sqrt(Fend/F0); Imax = I0
    t_lo = lo(u1*iv.mpf(lo(Imin))); t_hi = up(u1*iv.mpf(up(Imax)))
    nodes = [(u1, iv.mpf(t_lo), iv.mpf(t_hi))]
    # remaining cells: midpoint rule with |I''| bound
    du = (u_max - u1)/N
    ua = u1
    worst_err = mp.mpf(0)
    for k in range(N):
        ub = ua + du; cell = I(lo(ua), up(ub)); mid = (ua + ub)/2
        # I(mid) as an interval, with U, F at the interval midpoint (degenerate) -- exact midpoint value enclosed
        Sm = 2*g*Uu(mid*mid); Im = 2*mid/iv.sqrt(Sm)
        # second derivative bound on the cell: S = 2 g U(u^2), S' = 4 g u F(u^2), S'' = 4 g F(u^2) + 8 g u^2 F'(u^2)
        # cell enclosures by monotonicity (tight): if F > 0 on the cell then U is increasing there, U(cell) within [U(psi_a), U(psi_b)];
        # if F' > 0 on the cell then F is increasing there, F(cell) within [F(psi_a), F(psi_b)]; otherwise fall back to the direct interval evaluation.
        psi_a = ua*ua; psi_b = ub*ub
        Fdirect = Fu(cell*cell); Fpc = Fpu(cell*cell)
        if lo(Fdirect) > 0: Uc = I(lo(Uu(psi_a)), up(Uu(psi_b)))
        else: Uc = Uu(cell*cell)
        if lo(Fpc) > 0: Fc = I(lo(Fu(psi_a)), up(Fu(psi_b)))
        else: Fc = Fdirect
        if lo(Uc) <= 0: return {"rejected": f"U not positive on cell {k}"}
        S = 2*g*Uc; Sp = 4*g*cell*Fc; Spp = 4*g*Fc + 8*g*cell*cell*Fpc
        Ipp = -2*Sp*S**(iv.mpf(-3)/2) - cell*Spp*S**(iv.mpf(-3)/2) + iv.mpf(3)/2*cell*Sp*Sp*S**(iv.mpf(-5)/2)
        M2 = max(abs(lo(Ipp)), abs(up(Ipp)))
        err = up(du**3/24*iv.mpf(M2)); worst_err = max(worst_err, err)
        contrib = du*Im
        t_lo = lo(iv.mpf(t_lo) + contrib - iv.mpf(err)); t_hi = up(iv.mpf(t_hi) + contrib + iv.mpf(err))
        nodes.append((ub, iv.mpf(t_lo), iv.mpf(t_hi)))
        ua = ub
    return {"nodes": nodes, "u1": u1, "du": du, "worst_cell_error": worst_err, "F0": F0, "I0": I0}

def psi_of_t(enc, g, t, sign=1, toy=None):
    """Enclose psi(t) and psi'(t): bracket t between node bounds, then use the enclosed slope sqrt(2 g U) on the bracketing cell."""
    Uu = (lambda p: iv.mpf(toy)*p) if toy is not None else (lambda p: U(p, sign))
    nodes = enc["nodes"]; t = iv.mpf(t)
    # a = last node with t_hi <= t  (psi(t) >= psi_a surely); b = first node with t_lo >= t (psi(t) <= psi_b surely)
    a = None; b = None
    for k, (u, tl, th) in enumerate(nodes):
        if pt(th) <= pt(t): a = k
        if b is None and pt(tl) >= pt(t): b = k
    if a is None: ua = iv.mpf(0); ta_lo = iv.mpf(0); ta_hi = iv.mpf(0)
    else: ua, ta_lo, ta_hi = nodes[a]
    if b is None: return None
    ub = nodes[b][0]
    psi_a = ua*ua; psi_b = ub*ub
    Fcell = (iv.mpf(toy) if toy is not None else F(I(lo(psi_a), up(psi_b)), sign))
    Ucell = I(lo(Uu(psi_a)), up(Uu(psi_b))) if lo(Fcell) > 0 else Uu(I(lo(psi_a), up(psi_b)))
    v = iv.sqrt(2*g*Ucell)                                              # dpsi/dt on the bracketing cell (U increasing there when F > 0)
    # psi(t) in [psi_a + (t - ta_hi) v_lo, psi_a + (t - ta_lo) v_hi], intersected with [psi_a, psi_b]
    plo = max(lo(psi_a), lo(psi_a + (t - ta_hi)*iv.mpf(lo(v))))
    phi = min(up(psi_b), up(psi_a + (t - ta_lo)*iv.mpf(up(v))))
    psi = I(plo, phi); speed = iv.sqrt(2*g*(I(lo(Uu(iv.mpf(plo))), up(Uu(iv.mpf(phi)))) if lo(Fcell) > 0 else Uu(psi)))
    return psi, speed

def window_end(enc, g, t_lo_guess, t_hi_guess, iters=60):
    """Residual r(t) = t - 2 sin((50 deg - psi(t))/2) is strictly increasing (psi increasing); bracket its root with interval evaluations."""
    def r(t):
        ps = psi_of_t(enc, g, t)
        if ps is None: return None
        return t - 2*iv.sin((TW - ps[0])/2)
    a = iv.mpf(t_lo_guess); b = iv.mpf(t_hi_guess)
    ra = r(a); rb = r(b)
    if ra is None or rb is None or not (up(ra) < 0 and lo(rb) > 0): return None
    for _ in range(iters):
        m = (a + b)/2; rm = r(m)
        if rm is None: break
        if up(rm) < 0: a = m
        elif lo(rm) > 0: b = m
        else: break                                                     # residual enclosure straddles zero: cannot narrow further rigorously
    return a, b

if __name__ == "__main__":
    g = iv.mpf(sys.argv[1].split("/")[0])/iv.mpf(sys.argv[1].split("/")[1]); psi_max = sys.argv[2]; N = int(sys.argv[3]); outfile = sys.argv[4]
    t0 = time.time(); out = {"g": sys.argv[1], "psi_max": psi_max, "N": N, "precision_dps": 30, "controls": []}
    # ---- controls before target
    F60 = sum((G(60*D + 2*PI*j/3) for j in range(3)), iv.mpf(0)) - sum((G(2*PI*j/3) for j in (1, 2)), iv.mpf(0))
    out["controls"].append({"name": "(a) stationary 60-degree twist: the interval enclosure of F(0) contains zero", "pass": bool(lo(F60) <= 0 <= up(F60)), "F60": [s45(F60.a), s45(F60.b)]})
    toyF0 = mp.mpf("0.668064615"); enc_toy = enclose(g, "0.04", 400, toy=toyF0)
    ok_toy = True; worst_toy = mp.mpf(0)
    for (u, tl, th) in enc_toy["nodes"][::40]:
        exact = iv.sqrt(2*u*u/(g*iv.mpf(toyF0)))                        # closed form t = sqrt(2 psi/(g F0)), psi = u^2
        ok_toy = ok_toy and (pt(tl) <= lo(exact) and up(exact) <= pt(th)); worst_toy = max(worst_toy, pt(th) - pt(tl))
    out["controls"].append({"name": "(b) constant-field toy F == F0: the enclosure of t(psi) contains the closed form sqrt(2 psi/(g F0)) at every tenth node", "pass": bool(ok_toy), "max_width": float(worst_toy)})
    neg = enclose(g, "0.04", 50, sign=-1)
    out["controls"].append({"name": "(c) negative: a deliberately wrong sign (F -> -F) is rejected (release acceleration not positive)", "pass": bool("rejected" in neg), "message": neg.get("rejected")})
    out["controls_all_pass"] = all(c["pass"] for c in out["controls"])
    print("controls:", "ALL PASS" if out["controls_all_pass"] else "FAIL"); [print("  ", "pass" if c["pass"] else "FAIL", c["name"]) for c in out["controls"]]
    if not out["controls_all_pass"]: json.dump(out, open(outfile, "w"), indent=1); sys.exit(2)
    # ---- target
    enc = enclose(g, psi_max, N)
    if "rejected" in enc: print("rejected:", enc["rejected"]); json.dump(out | {"rejected": enc["rejected"]}, open(outfile, "w"), indent=1); sys.exit(3)
    out["F0"] = [s45(enc["F0"].a), s45(enc["F0"].b)]; out["worst_cell_error"] = float(enc["worst_cell_error"]); out["t_at_psi_max"] = [s45(enc["nodes"][-1][1]), s45(enc["nodes"][-1][2])]
    out["t_enclosure_width_at_psi_max"] = float(pt(enc["nodes"][-1][2]) - pt(enc["nodes"][-1][1]))
    print(f"F0 in [{out['F0'][0]}, {out['F0'][1]}]; t(psi_max={psi_max}) in [{out['t_at_psi_max'][0][:14]}, {out['t_at_psi_max'][1][:14]}] width {out['t_enclosure_width_at_psi_max']:.2e}; worst cell error {out['worst_cell_error']:.2e}")
    grid = []
    for tt in ["0.0355848897551", "0.1", "0.2", "0.3", "0.4", "0.5", "0.6"]:
        ps = psi_of_t(enc, g, tt)
        if ps is None: grid.append({"t": tt, "note": "beyond the enclosed psi range"}); continue
        psi, sp = ps
        grid.append({"t": tt, "psi_rad": [s45(psi.a), s45(psi.b)], "psi_deg": [s45(psi.a/D), s45(psi.b/D)], "twist_deg": [s45(50 - 2*psi.b/D), s45(50 - 2*psi.a/D)], "speed": [s45(sp.a), s45(sp.b)], "psi_width": float(up(psi) - lo(psi)), "speed_width": float(up(sp) - lo(sp))})
        print(f"t={tt}: psi in [{s45(psi.a)[:12]}, {s45(psi.b)[:12]}] rad (width {float(up(psi)-lo(psi)):.1e}); twist in [{s45(50-2*psi.b/D)[:9]}, {s45(50-2*psi.a/D)[:9]}] deg; speed in [{s45(sp.a)[:13]}, {s45(sp.b)[:13]}] (width {float(up(sp)-lo(sp)):.1e})")
    out["grid"] = grid
    we = window_end(enc, g, sys.argv[5] if len(sys.argv) > 5 else "0.5", sys.argv[6] if len(sys.argv) > 6 else "0.8")
    if we is None: out["window_end"] = {"error": "bracket failed"}; print("window end: bracket failed")
    else:
        a, b = we; psa = psi_of_t(enc, g, a); psb = psi_of_t(enc, g, b)
        psi_lo = lo(psa[0]); psi_hi = up(psb[0]); sp_lo = lo(psa[1]); sp_hi = up(psb[1])
        out["window_end"] = {"T_star": [s45(a.a), s45(b.b)], "T_width": float(pt(b.b) - pt(a.a)), "psi_star_deg": [s45(iv.mpf(psi_lo)/D), s45(iv.mpf(psi_hi)/D)], "twist_deg": [s45(50 - 2*iv.mpf(psi_hi)/D), s45(50 - 2*iv.mpf(psi_lo)/D)], "speed": [s45(sp_lo), s45(sp_hi)],
                             "residual_monotone": "r(t) = t - chord(50deg - psi(t)) is strictly increasing because psi(t) is increasing (psi' = sqrt(2 g U) > 0) and chord(50deg - psi) is decreasing in psi on [0, 50deg); the root is unique and bracketed by interval evaluations"}
        print(f"window end T* in [{s45(a.a)[:14]}, {s45(b.b)[:14]}] (width {out['window_end']['T_width']:.1e}); psi* in [{s45(iv.mpf(psi_lo)/D)[:9]}, {s45(iv.mpf(psi_hi)/D)[:9]}] deg; twist in [{out['window_end']['twist_deg'][0][:9]}, {out['window_end']['twist_deg'][1][:9]}] deg; speed in [{s45(sp_lo)[:12]}, {s45(sp_hi)[:12]}]")
    out["wall_s"] = time.time() - t0; json.dump(out, open(outfile, "w"), indent=1); print(f"wall {out['wall_s']:.1f} s")
