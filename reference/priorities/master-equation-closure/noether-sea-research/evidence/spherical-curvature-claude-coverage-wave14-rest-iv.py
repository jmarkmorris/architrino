# Wave 14: interval enclosures (wave-11 method) of two further rest releases at g = 1 on their stationary-source windows:
#   (1) six poles from rest: positrino at +e1 moves on the great circle X(q) = cos q e1 - sin q (e2 + e3)/sqrt2 (the direction of its release
#       acceleration, away from the positrino cap toward the electrino cap); by the order-12 symmetry (C3 cyclic, inversion with polarity swap)
#       all six move with the same q (electrinos at -X_i(q)); fixed images at the other five initial sites during the window.
#   (2) antiprism at colatitude 60 degrees from rest: positrino P0 at azimuth 0 moves on its meridian X(th) = (sin th, 0, cos th) with the
#       colatitude th increasing from pi/3 (down, toward the equator; the release acceleration points that way); electrinos at the antipodes move up;
#       symmetry order 12 (C3, three vertical reflections, inversion with swap); fixed images at the other five initial sites during the window.
# For a unit-speed path X(q) on the sphere with unit tangent T(q) = dX/dq, the static field of the fixed images A = sum_j sigma_j (X - Xj)/|X - Xj|^3
# is -grad(Phi) with Phi = sum_j sigma_j / |X - Xj|, so the tangential acceleration is F(q) = T(q).A(X(q)) = -dPhi/dq and the first integral is
# qdot^2 = 2 g U(q), U(q) = Phi(0) - Phi(q) (W(q) - W(0) with W = -Phi). F'(q) = -X.A + T^T J T with J = sum_j sigma_j (I/r^3 - 3 r r^T/r^5) (T' = -X).
# U is evaluated cancellation-free from r(q)^2 - r0^2 = -2 (X(q) - X(0)).Xj with X(q) - X(0) written with half-angle identities.
# Enclosure: wave-11 method (monotone first cell, midpoint rule with the interval I'' bound, bracketing inversion); window end T* = min_j chord_j(q(T*))
# with a strictly increasing residual (the minimal chord decreases in q, verified in intervals); wake crossing q_c from U(q_c) = 1/(2g) (U increasing)
# and t(q_c) from the node bounds bracketing q_c. mpmath iv at 30 digits, directed rounding; nodes exact decimals. No integrator.
# Run from the checkout root: OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -p perl -e 'alarm 110; exec @ARGV' -- ../.venv/bin/python -I <this file> <family: sixpole|antiprism> <q_max> <N> <out.json>
import sys, json, time
from mpmath import iv, mp
iv.dps = 30; mp.dps = 30
PI = iv.pi; D = PI/180
def pt(e): return mp.mpf(e.a) if hasattr(e, "a") else mp.mpf(e)
def lo(x): return pt(x.a)
def up(x): return pt(x.b)
def I(a, b): return iv.mpf([a, b])
def s45(e): return mp.nstr(pt(e), 25)
ZERO = iv.mpf(0); ONE = iv.mpf(1); S2 = iv.sqrt(iv.mpf(2)); S3 = iv.sqrt(iv.mpf(3))
def dot(a, b): return a[0]*b[0] + a[1]*b[1] + a[2]*b[2]
def sub(a, b): return [a[0]-b[0], a[1]-b[1], a[2]-b[2]]
def norm(a): return iv.sqrt(dot(a, a))

class Family:
    def __init__(self, name):
        self.name = name
        if name == "sixpole":
            e1, e2, e3 = [ONE, ZERO, ZERO], [ZERO, ONE, ZERO], [ZERO, ZERO, ONE]
            self.X0 = e1; self.sources = [(e2, 1), (e3, 1), ([-ONE, ZERO, ZERO], -1), ([ZERO, -ONE, ZERO], -1), ([ZERO, ZERO, -ONE], -1)]
            self.X = lambda q: [iv.cos(q), -iv.sin(q)/S2, -iv.sin(q)/S2]
            self.T = lambda q: [-iv.sin(q), -iv.cos(q)/S2, -iv.cos(q)/S2]
            self.dX = lambda q: [-2*iv.sin(q/2)**2, -iv.sin(q)/S2, -iv.sin(q)/S2]          # X(q) - X(0), cancellation-free
            self.labels = ["P2(+e2)", "P3(+e3)", "E1(-e1)", "E2(-e2)", "E3(-e3)"]
        elif name == "antiprism":
            th0 = PI/3; c60, s60 = iv.cos(th0), iv.sin(th0)
            def rotz(k, v): c, s = iv.cos(2*PI*k/3), iv.sin(2*PI*k/3); return [c*v[0] - s*v[1], s*v[0] + c*v[1], v[2]]
            P0 = [s60, ZERO, c60]; P1 = rotz(1, P0); P2 = rotz(2, P0)
            self.X0 = P0; self.sources = [(P1, 1), (P2, 1), ([-x for x in P0], -1), ([-x for x in P1], -1), ([-x for x in P2], -1)]
            self.X = lambda q: [iv.sin(th0 + q), ZERO, iv.cos(th0 + q)]
            self.T = lambda q: [iv.cos(th0 + q), ZERO, -iv.sin(th0 + q)]
            self.dX = lambda q: [2*iv.cos(th0 + q/2)*iv.sin(q/2), ZERO, -2*iv.sin(th0 + q/2)*iv.sin(q/2)]   # X(q) - X(0), cancellation-free
            self.labels = ["P1", "P2", "E0(-P0)", "E1(-P1)", "E2(-P2)"]
        self.r0 = [norm(sub(self.X0, Xj)) for Xj, s in self.sources]
    def A(self, q):
        X = self.X(q); A = [ZERO, ZERO, ZERO]
        for (Xj, s) in self.sources:
            r = sub(X, Xj); rn = norm(r)
            for c in range(3): A[c] += s*r[c]/rn**3
        return A
    def F(self, q, sign=1): return sign*dot(self.T(q), self.A(q))
    def Fp(self, q, sign=1):
        X = self.X(q); T = self.T(q); A = self.A(q); JTT = ZERO
        for (Xj, s) in self.sources:
            r = sub(X, Xj); rn = norm(r); rT = dot(r, T)
            JTT += s*(dot(T, T)/rn**3 - 3*rT*rT/rn**5)
        return sign*(-dot(X, A) + JTT)
    def U(self, q, sign=1):   # Phi(0) - Phi(q) = sum sigma (1/r0 - 1/r(q)) = sum sigma (r(q) - r0)/(r0 r(q)),  r(q) - r0 = (r(q)^2 - r0^2)/(r(q) + r0),  r(q)^2 - r0^2 = -2 dX.Xj
        tot = ZERO; dX = self.dX(q)
        for (Xj, s), r0 in zip(self.sources, self.r0):
            r2diff = -2*dot(dX, Xj); r = norm(sub(self.X(q), Xj))
            tot += s*(r2diff/(r + r0))/(r0*r)
        return sign*tot
    def chords(self, q): return {lab: norm(sub(self.X(q), Xj)) for lab, (Xj, s) in zip(self.labels, self.sources)}
    def chord_min_label(self):
        # the image that is nearest during the motion: ties at q = 0 (six poles: four neighbours at sqrt2) are broken at a small positive q
        qprobe = iv.mpf("0.2"); ch = self.chords(qprobe)
        return min(range(5), key=lambda j: pt(ch[self.labels[j]].a))

# ---- wave-11 enclosure machinery, parametrized by the family (same formulas as the frozen wave-11 script)
def enclose(fam, g, q_max, N, sign=1, toy=None):
    Fu = (lambda p: iv.mpf(toy)) if toy is not None else (lambda p: fam.F(p, sign))
    Fpu = (lambda p: iv.mpf(0)) if toy is not None else (lambda p: fam.Fp(p, sign))
    Uu = (lambda p: iv.mpf(toy)*p) if toy is not None else (lambda p: fam.U(p, sign))
    u_max = iv.sqrt(iv.mpf(q_max)); u1 = iv.mpf("0.005")
    F0 = Fu(iv.mpf(0))
    if lo(F0) <= 0: return {"rejected": "release acceleration not positive: F(0) in [" + s45(F0.a) + ", " + s45(F0.b) + "]"}
    Fp_cell = Fpu(I(0, up(u1**2)))
    if lo(Fp_cell) <= 0 and toy is None: return {"rejected": "F not increasing on the first cell"}
    I0 = 2/iv.sqrt(2*g*F0); Fend = Fu(I(0, up(u1**2))); Imin = I0/iv.sqrt(Fend/F0); Imax = I0
    t_lo = lo(u1*iv.mpf(lo(Imin))); t_hi = up(u1*iv.mpf(up(Imax))); nodes = [(u1, iv.mpf(t_lo), iv.mpf(t_hi))]
    du = (u_max - u1)/N; ua = u1; worst = mp.mpf(0)
    for k in range(N):
        ub = ua + du; cell = I(lo(ua), up(ub)); mid = (ua + ub)/2
        Sm = 2*g*Uu(mid*mid); Im = 2*mid/iv.sqrt(Sm)
        psi_a = ua*ua; psi_b = ub*ub
        Fdirect = Fu(cell*cell); Fpc = Fpu(cell*cell)
        Uc = I(lo(Uu(psi_a)), up(Uu(psi_b))) if lo(Fdirect) > 0 else Uu(cell*cell)
        Fc = I(lo(Fu(psi_a)), up(Fu(psi_b))) if lo(Fpc) > 0 else Fdirect
        if lo(Uc) <= 0: return {"rejected": f"U not positive on cell {k}"}
        S = 2*g*Uc; Sp = 4*g*cell*Fc; Spp = 4*g*Fc + 8*g*cell*cell*Fpc
        Ipp = -2*Sp*S**(iv.mpf(-3)/2) - cell*Spp*S**(iv.mpf(-3)/2) + iv.mpf(3)/2*cell*Sp*Sp*S**(iv.mpf(-5)/2)
        M2 = max(abs(lo(Ipp)), abs(up(Ipp))); err = up(du**3/24*iv.mpf(M2)); worst = max(worst, err)
        contrib = du*Im; t_lo = lo(iv.mpf(t_lo) + contrib - iv.mpf(err)); t_hi = up(iv.mpf(t_hi) + contrib + iv.mpf(err))
        nodes.append((ub, iv.mpf(t_lo), iv.mpf(t_hi))); ua = ub
    return {"nodes": nodes, "worst_cell_error": worst, "F0": F0}
def q_of_t(enc, fam, g, t, sign=1):
    nodes = enc["nodes"]; t = iv.mpf(t); a = None; b = None
    for k, (u, tl, th) in enumerate(nodes):
        if pt(th) <= pt(t): a = k
        if b is None and pt(tl) >= pt(t): b = k
    if a is None: ua, ta_lo, ta_hi = ZERO, ZERO, ZERO
    else: ua, ta_lo, ta_hi = nodes[a]
    if b is None: return None
    ub = nodes[b][0]; qa = ua*ua; qb = ub*ub
    Fcell = fam.F(I(lo(qa), up(qb)), sign); Ucell = I(lo(fam.U(qa, sign)), up(fam.U(qb, sign))) if lo(Fcell) > 0 else fam.U(I(lo(qa), up(qb)), sign)
    v = iv.sqrt(2*g*Ucell)
    plo = max(lo(qa), lo(qa + (t - ta_hi)*iv.mpf(lo(v)))); phi = min(up(qb), up(qa + (t - ta_lo)*iv.mpf(up(v))))
    q = I(plo, phi); speed = iv.sqrt(2*g*(I(lo(fam.U(iv.mpf(plo), sign)), up(fam.U(iv.mpf(phi), sign))) if lo(Fcell) > 0 else fam.U(q, sign)))
    return q, speed
def window_end(enc, fam, g, t_a, t_b, iters=60):
    jmin = fam.chord_min_label()
    def r(t):
        qs = q_of_t(enc, fam, g, t)
        if qs is None: return None
        return t - fam.chords(qs[0])[fam.labels[jmin]]
    a = iv.mpf(t_a); b = iv.mpf(t_b); ra = r(a); rb = r(b)
    if ra is None or rb is None or not (up(ra) < 0 and lo(rb) > 0): return None
    for _ in range(iters):
        m = (a + b)/2; rm = r(m)
        if rm is None: break
        if up(rm) < 0: a = m
        elif lo(rm) > 0: b = m
        else: break
    return a, b, fam.labels[jmin]
def crossing(enc, fam, g):
    """q_c with U(q_c) = 1/(2g) (U increasing where F > 0); t(q_c) from the nodes bracketing q_c."""
    target = 1/(2*g); nodes = enc["nodes"]
    qlo = ZERO; qhi = nodes[-1][0]**2
    if up(fam.U(qhi)) < lo(target): return None
    a = iv.mpf(0); b = iv.mpf(up(qhi))
    for _ in range(80):
        m = iv.mpf(pt((a + b)/2)); um = fam.U(m)
        if up(um) < lo(target): a = m
        elif lo(um) > up(target): b = m
        else: break
    qc = I(lo(a), up(b))
    ka = max([k for k, (u, tl, th) in enumerate(nodes) if pt(u*u) <= lo(qc)] or [-1])
    # t(q_c) = t(node ka) + integral over the partial cell [u_ka, sqrt(q_c)] of I(u) = 2u/sqrt(2 g U(u^2)); on that cell U is enclosed by monotonicity (F > 0)
    u_k = ZERO if ka < 0 else nodes[ka][0]; t_k = I(0, 0) if ka < 0 else I(lo(nodes[ka][1]), up(nodes[ka][2]))
    uc = iv.sqrt(qc); cell = I(lo(u_k), up(uc)); qcell = I(lo(u_k*u_k), up(qc))
    Fc = fam.F(qcell); Uc = I(lo(fam.U(iv.mpf(lo(u_k*u_k)))), up(fam.U(iv.mpf(up(qc))))) if (lo(Fc) > 0 and lo(u_k*u_k) > 0) else fam.U(qcell)
    if lo(Uc) <= 0: return qc, I(lo(t_k), up(nodes[min(ka+1, len(nodes)-1)][2]))
    Ic = 2*cell/iv.sqrt(2*g*Uc); part = (uc - u_k)*Ic
    return qc, I(lo(t_k + part), up(t_k + part))

if __name__ == "__main__":
    fam = Family(sys.argv[1]); g = iv.mpf(1); q_max = sys.argv[2]; N = int(sys.argv[3]); outfile = sys.argv[4]
    t0 = time.time(); out = {"family": fam.name, "g": "1", "q_max": q_max, "N": N, "precision_dps": 30, "controls": [], "premises": "mpmath iv directed rounding for +,-,*,/,sqrt,sin,cos,pi at 30 digits; exact decimal nodes; the fixed-image field, its gradient structure and the symmetry family are derived in the report"}
    # ---- controls before target
    # (a) field machinery: the full six-body static field (all members co-moved) vanishes tangentially at the regular alternating hexagon
    if fam.name == "antiprism":
        q90 = PI/2 - PI/3; Xh = fam.X(q90); Th = fam.T(q90)
        def rotz(k, v): c, s = iv.cos(2*PI*k/3), iv.sin(2*PI*k/3); return [c*v[0] - s*v[1], s*v[0] + c*v[1], v[2]]
        Ph = [Xh, rotz(1, Xh), rotz(2, Xh)]; src = [(Ph[1], 1), (Ph[2], 1)] + [([-x for x in P], -1) for P in Ph]
        Ah = [ZERO, ZERO, ZERO]
        for (Xj, s) in src:
            r = sub(Xh, Xj); rn = norm(r)
            for c in range(3): Ah[c] += s*r[c]/rn**3
        tang = dot(Th, Ah); out["controls"].append({"name": "(a) known: with all six members co-moved to colatitude 90 degrees (regular alternating hexagon) the tangential field at P0 encloses zero", "pass": bool(lo(tang) <= 0 <= up(tang)), "value": [s45(tang.a), s45(tang.b)]})
    else:
        F0 = fam.F(ZERO); out["controls"].append({"name": "(a) known: the release tangential acceleration of the six poles encloses K/R^2 = 1 (wave-1 closed form) and the radial part encloses -1/4", "pass": bool(lo(F0) <= 1 <= up(F0) and lo(dot(fam.X0, fam.A(ZERO))) <= -0.25 <= up(dot(fam.X0, fam.A(ZERO)))), "F0": [s45(F0.a), s45(F0.b)], "nA": [s45(dot(fam.X0, fam.A(ZERO)).a), s45(dot(fam.X0, fam.A(ZERO)).b)]})
    # (b) first integral consistent with the field: U'(q) = F(q) by central differences at three points, and U cancellation-free equals the direct difference
    okb = True; vals = []
    for p in ("0.02", "0.1", "0.2"):
        pq = mp.mpf(p); h = mp.mpf("1e-6"); d = pt((fam.U(iv.mpf(pq + h)) - fam.U(iv.mpf(pq - h)))/(2*h)); f = pt(fam.F(iv.mpf(pq)))
        Phi0 = sum((s/r0 for (Xj, s), r0 in zip(fam.sources, fam.r0)), ZERO); Phiq = sum((s/norm(sub(fam.X(iv.mpf(pq)), Xj)) for (Xj, s) in fam.sources), ZERO)
        vals.append([float(d - f), float(pt(fam.U(iv.mpf(pq)) - (Phi0 - Phiq)))]); okb = okb and abs(d - f) < mp.mpf("1e-7")*abs(f) and abs(pt(fam.U(iv.mpf(pq)) - (Phi0 - Phiq))) < mp.mpf("1e-12")
    out["controls"].append({"name": "(b) first integral: dU/dq = F (finite difference, 1e-7 relative) and cancellation-free U = Phi(0) - Phi(q) to 1e-12 at three points", "pass": bool(okb), "value": vals})
    # (c) constant-field toy encloses the closed form; (d) negative: wrong sign rejected
    toyF0 = pt(fam.F(ZERO)); enc_toy = enclose(fam, g, "0.04", 400, toy=toyF0); ok_toy = True
    for (u, tl, th) in enc_toy["nodes"][::40]:
        exact = iv.sqrt(2*u*u/(g*iv.mpf(toyF0))); ok_toy = ok_toy and (pt(tl) <= lo(exact) and up(exact) <= pt(th))
    out["controls"].append({"name": "(c) constant-field toy F == F0: the enclosure contains the closed form sqrt(2 q/(g F0)) at every tenth node", "pass": bool(ok_toy)})
    neg = enclose(fam, g, "0.04", 50, sign=-1); out["controls"].append({"name": "(d) negative: the wrong sign F -> -F is rejected", "pass": bool("rejected" in neg), "message": neg.get("rejected")})
    out["controls_all_pass"] = all(c["pass"] for c in out["controls"])
    print("controls:", "ALL PASS" if out["controls_all_pass"] else "FAIL"); [print("  ", "pass" if c["pass"] else "FAIL", c["name"], c.get("value", c.get("F0", ""))) for c in out["controls"]]
    if not out["controls_all_pass"]: json.dump(out, open(outfile, "w"), indent=1); sys.exit(2)
    # ---- target
    enc = enclose(fam, g, q_max, N)
    if "rejected" in enc: print("rejected:", enc["rejected"]); json.dump(out | {"rejected": enc["rejected"]}, open(outfile, "w"), indent=1); sys.exit(3)
    out["F0"] = [s45(enc["F0"].a), s45(enc["F0"].b)]; out["worst_cell_error"] = float(enc["worst_cell_error"]); out["t_at_q_max"] = [s45(enc["nodes"][-1][1]), s45(enc["nodes"][-1][2])]
    print(f"F0 in [{out['F0'][0][:14]}, {out['F0'][1][:14]}]; t(q_max={q_max}) in [{out['t_at_q_max'][0][:12]}, {out['t_at_q_max'][1][:12]}]; worst cell error {out['worst_cell_error']:.2e}")
    # monotone residual check: the minimal fixed-image chord must decrease in q over [0, q_max]
    jmin = fam.chord_min_label(); lab = fam.labels[jmin]; qr = I(0, mp.mpf(q_max)); Xj = fam.sources[jmin][0]
    dchord = dot(fam.T(qr), sub(fam.X(qr), Xj))/norm(sub(fam.X(qr), Xj))       # d chord / dq = T.(X - Xj)/|X - Xj|
    out["nearest_image"] = lab; out["dchord_dq_range"] = [s45(dchord.a), s45(dchord.b)]; out["residual_monotone"] = bool(up(dchord) < 0)
    we = window_end(enc, fam, g, sys.argv[5] if len(sys.argv) > 5 else "0.5", sys.argv[6] if len(sys.argv) > 6 else "1.3")
    cr = crossing(enc, fam, g)
    if we is None: out["window_end"] = {"error": "bracket failed"}; print("window end: bracket failed")
    else:
        a, b, lab = we; qa = q_of_t(enc, fam, g, a); qb = q_of_t(enc, fam, g, b)
        out["window_end"] = {"T_star": [s45(a.a), s45(b.b)], "nearest_image": lab, "q_star_rad": [s45(qa[0].a), s45(qb[0].b)], "speed_at_T_star": [s45(qa[1].a), s45(qb[1].b)], "chord_at_end": [s45(fam.chords(qb[0])[lab].a), s45(fam.chords(qa[0])[lab].b)]}
        print(f"window end T* in [{s45(a.a)[:12]}, {s45(b.b)[:12]}] (nearest image {lab}); q* in [{s45(qa[0].a)[:10]}, {s45(qb[0].b)[:10]}] rad; speed there in [{s45(qa[1].a)[:10]}, {s45(qb[1].b)[:10]}]")
    if cr is None: out["crossing"] = {"error": "U does not reach 1/(2g) within q_max"}; print("crossing: not within q_max")
    else:
        qc, tc = cr; out["crossing"] = {"q_c_rad": [s45(qc.a), s45(qc.b)], "q_c_deg": [s45(qc.a/D), s45(qc.b/D)], "t_c": [s45(tc.a), s45(tc.b)], "speed_at_q_c": "1 by definition (U(q_c) = 1/(2g))", "chords_at_q_c": {k: [s45(v.a), s45(v.b)] for k, v in fam.chords(qc).items()}}
        print(f"wake crossing: q_c in [{s45(qc.a)[:10]}, {s45(qc.b)[:10]}] rad = [{s45(qc.a/D)[:8]}, {s45(qc.b/D)[:8]}] deg; t_c in [{s45(tc.a)[:12]}, {s45(tc.b)[:12]}]")
        if we is not None:
            first = "crossing first (t_c upper < T* lower)" if up(tc) < lo(a) else ("window end first (T* upper < t_c lower)" if up(b) < lo(tc) else "undecided: the enclosures overlap")
            out["which_first"] = first; print("order:", first)
    out["wall_s"] = time.time() - t0; json.dump(out, open(outfile, "w"), indent=1); print(f"wall {out['wall_s']:.1f} s")
