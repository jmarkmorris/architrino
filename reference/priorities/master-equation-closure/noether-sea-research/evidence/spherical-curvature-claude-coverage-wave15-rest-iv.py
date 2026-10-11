# Wave 15: interval certification of the remaining rest releases (wave-14 machinery executed in-process; mpmath iv, directed rounding, 30 digits).
# Families (derived in the report): antiprism at colatitude th0 (30, 45, 60 deg), the planar twisted hexagon at twist TW (40 deg; wave-11 family with its
# own image set), the alternating hexagon lifted uniformly to latitude lam (5, 15 deg) moving along its meridians (the latitude mode), and the six poles.
# Each family: unit-speed path X(q) in the direction of its release acceleration (the sign of F(0) decides the direction), fixed images at the other five
# initial sites during the window, first integral qdot^2 = 2 g U(q), U = Phi(0) - Phi(q). Window end T* = min_j chord_j(q(T*)): the residual uses the
# interval minimum over all five chords; its strict monotonicity is verified cell-wise (every image that can attain the minimum on a q-cell has a
# negative chord derivative there). Crossing: U(q_c) = 1/(2g) if reached (else U_max < 1/(2g) certifies no crossing). Turning point: F(q_z) = 0 (lifted
# hexagon) enclosed by bisection; the time to reach q_z - eps bounds the turning time from below.
# Run from the checkout root: OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -p perl -e 'alarm 110; exec @ARGV' -- ../.venv/bin/python -I <this file> <family> <param> <g p/q> <q_max> <N> <out.json>
import sys, json, time
W14 = "reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-curvature-claude-coverage-wave14-rest-iv.py"
exec(open(W14).read().split('if __name__ == "__main__":')[0])     # Family (sixpole, antiprism at 60), enclose, q_of_t, crossing, I, lo, up, pt, s45, ...

# wave-15 override of the frozen wave-14 enclose: the first-cell bound now accepts a release field that is monotone in either direction.
# If F is monotone on [0, u1^2] (interval F' of one sign), the mean U(psi)/psi lies between F(0) and F(u1^2), so I(u) = 2/sqrt(2 g U/psi)
# lies between I0 = 2/sqrt(2 g F0) and I0/sqrt(F(u1^2)/F0); everything else is the wave-14 (= wave-11) method unchanged.
def enclose(fam, g, q_max, N, sign=1, toy=None):
    Fu = (lambda p: iv.mpf(toy)) if toy is not None else (lambda p: fam.F(p, sign))
    Fpu = (lambda p: iv.mpf(0)) if toy is not None else (lambda p: fam.Fp(p, sign))
    Uu = (lambda p: iv.mpf(toy)*p) if toy is not None else (lambda p: fam.U(p, sign))
    u_max = iv.sqrt(iv.mpf(q_max)); u1 = iv.mpf("0.005")
    F0 = Fu(iv.mpf(0))
    if lo(F0) <= 0: return {"rejected": "release acceleration not positive: F(0) in [" + s45(F0.a) + ", " + s45(F0.b) + "]"}
    Fp_cell = Fpu(I(0, up(u1**2)))
    if toy is None and lo(Fp_cell) <= 0 <= up(Fp_cell): return {"rejected": "F not monotone on the first cell"}
    I0 = 2/iv.sqrt(2*g*F0); Fend = Fu(I(0, up(u1**2)))
    if lo(Fend) <= 0: return {"rejected": "F not positive on the first cell"}
    Ialt = I0/iv.sqrt(Fend/F0); Imin = iv.mpf(min(lo(I0), lo(Ialt))); Imax = iv.mpf(max(up(I0), up(Ialt)))
    t_lo = lo(u1*Imin); t_hi = up(u1*Imax); nodes = [(u1, iv.mpf(t_lo), iv.mpf(t_hi))]
    du = (u_max - u1)/N; ua = u1; worst = mp.mpf(0)
    for k in range(N):
        ub = ua + du; cell = I(lo(ua), up(ub)); mid = (ua + ub)/2
        Sm = 2*g*Uu(mid*mid); Im = 2*mid/iv.sqrt(Sm)
        psi_a = ua*ua; psi_b = ub*ub
        Fdirect = Fu(cell*cell); Fpc = Fpu(cell*cell)
        Uc = I(lo(Uu(psi_a)), up(Uu(psi_b))) if lo(Fdirect) > 0 else Uu(cell*cell)
        if lo(Fpc) > 0: Fc = I(lo(Fu(psi_a)), up(Fu(psi_b)))
        elif up(Fpc) < 0: Fc = I(lo(Fu(psi_b)), up(Fu(psi_a)))
        else: Fc = Fdirect
        if lo(Uc) <= 0: return {"rejected": f"U not positive on cell {k}"}
        S = 2*g*Uc; Sp = 4*g*cell*Fc; Spp = 4*g*Fc + 8*g*cell*cell*Fpc
        Ipp = -2*Sp*S**(iv.mpf(-3)/2) - cell*Spp*S**(iv.mpf(-3)/2) + iv.mpf(3)/2*cell*Sp*Sp*S**(iv.mpf(-5)/2)
        M2 = max(abs(lo(Ipp)), abs(up(Ipp))); err = up(du**3/24*iv.mpf(M2)); worst = max(worst, err)
        contrib = du*Im; t_lo = lo(iv.mpf(t_lo) + contrib - iv.mpf(err)); t_hi = up(iv.mpf(t_hi) + contrib + iv.mpf(err))
        nodes.append((ub, iv.mpf(t_lo), iv.mpf(t_hi))); ua = ub
    return {"nodes": nodes, "worst_cell_error": worst, "F0": F0}

def rotz(k, v):
    c, s = iv.cos(2*PI*k/3), iv.sin(2*PI*k/3); return [c*v[0] - s*v[1], s*v[0] + c*v[1], v[2]]
class Antiprism(Family):
    """colatitude th0 (degrees); P0 on the meridian phi = 0; direction (+1: colatitude increasing, -1: decreasing) chosen by the sign of the release field."""
    def __init__(self, th0_deg):
        self.name = f"antiprism-{th0_deg}"; th0 = iv.mpf(th0_deg)*D; self.th0 = th0
        P0 = [iv.sin(th0), ZERO, iv.cos(th0)]; P1 = rotz(1, P0); P2 = rotz(2, P0)
        self.X0 = P0; self.sources = [(P1, 1), (P2, 1), ([-x for x in P0], -1), ([-x for x in P1], -1), ([-x for x in P2], -1)]
        self.labels = ["P1", "P2", "E0(-P0)", "E1(-P1)", "E2(-P2)"]; self.r0 = [norm(sub(self.X0, Xj)) for Xj, s in self.sources]
        self.dir = 1
        self.X = lambda q: [iv.sin(th0 + self.dir*q), ZERO, iv.cos(th0 + self.dir*q)]
        self.T = lambda q: [self.dir*iv.cos(th0 + self.dir*q), ZERO, -self.dir*iv.sin(th0 + self.dir*q)]
        self.dX = lambda q: [2*iv.cos(th0 + self.dir*q/2)*iv.sin(self.dir*q/2), ZERO, -2*iv.sin(th0 + self.dir*q/2)*iv.sin(self.dir*q/2)]
        if up(self.F(ZERO)) < 0: self.dir = -1
        self.direction = "colatitude increasing (toward the equator)" if self.dir == 1 else "colatitude decreasing (toward the pole)"
class LiftedHexagon(Family):
    """alternating hexagon lifted uniformly to latitude lam (degrees): all six at colatitude 90 - lam, azimuths 60k, polarity (-1)^k; P0 moves on its meridian."""
    def __init__(self, lam_deg):
        self.name = f"lifted-hexagon-{lam_deg}"; th0 = (90 - iv.mpf(lam_deg))*D; self.th0 = th0
        pts = []
        for k in range(6):
            c, s = iv.cos(k*PI/3), iv.sin(k*PI/3); pts.append([iv.sin(th0)*c, iv.sin(th0)*s, iv.cos(th0)])
        self.X0 = pts[0]; self.sources = [(pts[k], 1 if k % 2 == 0 else -1) for k in range(1, 6)]
        self.labels = ["E1(60)", "P2(120)", "E3(180)", "P4(240)", "E5(300)"]; self.r0 = [norm(sub(self.X0, Xj)) for Xj, s in self.sources]
        self.dir = 1
        self.X = lambda q: [iv.sin(th0 + self.dir*q), ZERO, iv.cos(th0 + self.dir*q)]
        self.T = lambda q: [self.dir*iv.cos(th0 + self.dir*q), ZERO, -self.dir*iv.sin(th0 + self.dir*q)]
        self.dX = lambda q: [2*iv.cos(th0 + self.dir*q/2)*iv.sin(self.dir*q/2), ZERO, -2*iv.sin(th0 + self.dir*q/2)*iv.sin(self.dir*q/2)]
        if up(self.F(ZERO)) < 0: self.dir = -1
        self.direction = "colatitude increasing (toward the equator)" if self.dir == 1 else "colatitude decreasing (toward the pole)"
class TwistedHexagon(Family):
    """planar twisted hexagon: positrinos at azimuth 120k, electrinos at TW + 120k (degrees), P0 moves along the equator toward increasing azimuth."""
    def __init__(self, tw_deg):
        self.name = f"twisted-hexagon-{tw_deg}"; TWr = iv.mpf(tw_deg)*D
        def az(a): return [iv.cos(a), iv.sin(a), ZERO]
        self.X0 = az(ZERO); self.sources = [(az(2*PI/3), 1), (az(4*PI/3), 1), (az(TWr), -1), (az(TWr + 2*PI/3), -1), (az(TWr + 4*PI/3), -1)]
        self.labels = ["P1(120)", "P2(240)", "E0(tw)", "E1(tw+120)", "E2(tw+240)"]; self.r0 = [norm(sub(self.X0, Xj)) for Xj, s in self.sources]
        self.dir = 1
        self.X = lambda q: [iv.cos(self.dir*q), iv.sin(self.dir*q), ZERO]
        self.T = lambda q: [-self.dir*iv.sin(self.dir*q), self.dir*iv.cos(self.dir*q), ZERO]
        self.dX = lambda q: [-2*iv.sin(self.dir*q/2)**2, iv.sin(self.dir*q), ZERO]
        if up(self.F(ZERO)) < 0: self.dir = -1
        self.direction = "azimuth increasing (toward the nearer electrino)" if self.dir == 1 else "azimuth decreasing"
def make(family, param):
    if family == "sixpole": f = Family("sixpole"); f.direction = "along the great circle toward the electrino cap"; return f
    if family == "antiprism": return Antiprism(param)
    if family == "lifted": return LiftedHexagon(param)
    if family == "twist": return TwistedHexagon(param)
    raise ValueError(family)

def chord_min(fam, q):
    ch = fam.chords(q); return I(min(lo(v) for v in ch.values()), min(up(v) for v in ch.values()))
def monotone_check(fam, q_max, ncell=60):
    """cell-wise: on each q-cell, every image whose chord can attain the minimum must have d chord/dq < 0 (upper end) there."""
    ok = True; worst = None
    for k in range(ncell):
        qa = mp.mpf(q_max)*k/ncell; qb = mp.mpf(q_max)*(k+1)/ncell; cell = I(qa, qb); ch = fam.chords(cell); mn = min(up(v) for v in ch.values())
        for lab, (Xj, s) in zip(fam.labels, fam.sources):
            if lo(ch[lab]) <= mn:
                d = dot(fam.T(cell), sub(fam.X(cell), Xj))/norm(sub(fam.X(cell), Xj))
                if up(d) >= 0: ok = False; worst = (k, lab, float(up(d)))
    return ok, worst
def window_end_min(enc, fam, g, t_a, t_b, iters=60):
    def r(t):
        qs = q_of_t(enc, fam, g, t)
        if qs is None: return None
        return t - chord_min(fam, qs[0])
    a = iv.mpf(t_a); b = iv.mpf(t_b); ra = r(a); rb = r(b)
    if ra is None or rb is None or not (up(ra) < 0 and lo(rb) > 0): return None
    for _ in range(iters):
        m = (a + b)/2; rm = r(m)
        if rm is None: break
        if up(rm) < 0: a = m
        elif lo(rm) > 0: b = m
        else: break
    return a, b
def turning_point(fam, q_hi):
    """F decreasing through zero on [0, q_hi]: enclose q_z with F(q_z) = 0 by bisection (requires F(0) > 0 > F(q_hi))."""
    a = ZERO; b = iv.mpf(q_hi)
    if not (lo(fam.F(a)) > 0 and up(fam.F(b)) < 0): return None
    for _ in range(80):
        m = iv.mpf(pt((a + b)/2)); fm = fam.F(m)
        if lo(fm) > 0: a = m
        elif up(fm) < 0: b = m
        else: break
    return I(lo(a), up(b))

if __name__ == "__main__":
    family = sys.argv[1]; param = sys.argv[2]; g = iv.mpf(sys.argv[3].split("/")[0])/iv.mpf(sys.argv[3].split("/")[1]); q_max = sys.argv[4]; N = int(sys.argv[5]); outfile = sys.argv[6]
    fam = make(family, param); t0 = time.time()
    out = {"family": fam.name, "direction": fam.direction, "g": sys.argv[3], "q_max": q_max, "N": N, "precision_dps": 30, "controls": [],
           "premises": "mpmath iv directed rounding for +,-,*,/,sqrt,sin,cos,pi at 30 digits; exact decimal nodes; family, first integral and residual monotonicity derived in the report"}
    F0 = fam.F(ZERO); out["F0"] = [s45(F0.a), s45(F0.b)]; out["r0"] = {lab: s45(r) for lab, r in zip(fam.labels, fam.r0)}
    # ---- controls before target (wave-14 set)
    if family in ("antiprism", "lifted"):
        q90 = (PI/2 - fam.th0)*fam.dir
        Xh = fam.X(q90); Th = fam.T(q90)
        if family == "antiprism": Ph = [Xh, rotz(1, Xh), rotz(2, Xh)]; src = [(Ph[1], 1), (Ph[2], 1)] + [([-x for x in P], -1) for P in Ph]
        else:
            src = []
            for k in range(1, 6):
                c, s = iv.cos(k*PI/3), iv.sin(k*PI/3); src.append(([Xh[0]*c, Xh[0]*s, ZERO], 1 if k % 2 == 0 else -1))
        Ah = [ZERO, ZERO, ZERO]
        for (Xj, s) in src:
            r = sub(Xh, Xj); rn = norm(r)
            for c in range(3): Ah[c] += s*r[c]/rn**3
        tang = dot(Th, Ah); out["controls"].append({"name": "(a) known: all six co-moved to the equator (regular alternating hexagon) give a tangential field enclosing zero", "pass": bool(lo(tang) <= 0 <= up(tang)), "value": [s45(tang.a), s45(tang.b)]})
    elif family == "twist":
        f60 = TwistedHexagon(60); F60 = f60.F(ZERO); out["controls"].append({"name": "(a) known: twist 60 degrees (regular alternating hexagon) has a release field enclosing zero", "pass": bool(lo(F60) <= 0 <= up(F60)), "value": [s45(F60.a), s45(F60.b)]})
    else:
        out["controls"].append({"name": "(a) known: six-pole release acceleration encloses 1 and radial part -1/4", "pass": bool(lo(F0) <= 1 <= up(F0) and lo(dot(fam.X0, fam.A(ZERO))) <= -0.25 <= up(dot(fam.X0, fam.A(ZERO))))})
    okb = True; vals = []
    for p in ("0.02", "0.1", "0.2"):
        pq = mp.mpf(p); h = mp.mpf("1e-6"); d = pt((fam.U(iv.mpf(pq + h)) - fam.U(iv.mpf(pq - h)))/(2*h)); f = pt(fam.F(iv.mpf(pq)))
        Phi0 = sum((s/r0 for (Xj, s), r0 in zip(fam.sources, fam.r0)), ZERO); Phiq = sum((s/norm(sub(fam.X(iv.mpf(pq)), Xj)) for (Xj, s) in fam.sources), ZERO)
        vals.append([float(d - f), float(pt(fam.U(iv.mpf(pq)) - (Phi0 - Phiq)))]); okb = okb and abs(d - f) < mp.mpf("1e-7")*max(abs(f), mp.mpf("1e-3")) and abs(pt(fam.U(iv.mpf(pq)) - (Phi0 - Phiq))) < mp.mpf("1e-12")
    out["controls"].append({"name": "(b) first integral: dU/dq = F (finite difference) and cancellation-free U = Phi(0) - Phi(q) to 1e-12 at three points", "pass": bool(okb), "value": vals})
    toyF0 = pt(F0) if pt(F0) > 0 else mp.mpf(1); enc_toy = enclose(fam, g, "0.04", 400, toy=toyF0); ok_toy = True
    for (u, tl, th) in enc_toy["nodes"][::40]:
        exact = iv.sqrt(2*u*u/(g*iv.mpf(toyF0))); ok_toy = ok_toy and (pt(tl) <= lo(exact) and up(exact) <= pt(th))
    out["controls"].append({"name": "(c) constant-field toy encloses the closed form at every tenth node", "pass": bool(ok_toy)})
    neg = enclose(fam, g, "0.04", 50, sign=-1); out["controls"].append({"name": "(d) negative: the wrong sign F -> -F is rejected", "pass": bool("rejected" in neg), "message": neg.get("rejected")})
    out["controls_all_pass"] = all(c["pass"] for c in out["controls"])
    print(fam.name, "direction:", fam.direction, "F0 in", out["F0"][0][:12], out["F0"][1][:12]); print("controls:", "ALL PASS" if out["controls_all_pass"] else "FAIL"); [print("  ", "pass" if c["pass"] else "FAIL", c["name"], c.get("value", "")) for c in out["controls"]]
    if not out["controls_all_pass"]: json.dump(out, open(outfile, "w"), indent=1); sys.exit(2)
    # ---- turning point (if F changes sign before q_max): enclose q_z and restrict the enclosure to q_z - eps
    qz = turning_point(fam, q_max); q_enc = q_max
    if qz is not None:
        out["turning_point"] = {"q_z_rad": [s45(qz.a), s45(qz.b)], "F_at_q_z": [s45(fam.F(qz).a), s45(fam.F(qz).b)], "U_max": [s45(fam.U(qz).a), s45(fam.U(qz).b)]}
        q_enc = mp.nstr(lo(qz) - mp.mpf("0.002"), 12); print(f"turning point: F = 0 at q_z in [{s45(qz.a)[:10]}, {s45(qz.b)[:10]}] rad; U_max in [{s45(fam.U(qz).a)[:10]}, {s45(fam.U(qz).b)[:10]}]; enclosure restricted to q <= {q_enc}")
    enc = enclose(fam, g, q_enc, N)
    if "rejected" in enc: print("rejected:", enc["rejected"]); json.dump(out | {"rejected": enc["rejected"]}, open(outfile, "w"), indent=1); sys.exit(3)
    out["q_enclosed_max"] = q_enc; out["worst_cell_error"] = float(enc["worst_cell_error"]); out["t_at_q_enclosed_max"] = [s45(enc["nodes"][-1][1]), s45(enc["nodes"][-1][2])]
    print(f"t(q={q_enc}) in [{out['t_at_q_enclosed_max'][0][:12]}, {out['t_at_q_enclosed_max'][1][:12]}]; worst cell error {out['worst_cell_error']:.2e}")
    mono, worst = monotone_check(fam, q_enc); out["residual_monotone_cellwise"] = {"pass": mono, "worst": worst}
    print("cell-wise monotonicity of the minimal chord:", mono, worst)
    tA = sys.argv[7] if len(sys.argv) > 7 else "0.3"; tB = sys.argv[8] if len(sys.argv) > 8 else out["t_at_q_enclosed_max"][0][:12]
    we = window_end_min(enc, fam, g, tA, tB)
    if we is None: out["window_end"] = {"error": "bracket failed", "bracket": [tA, tB]}; print("window end: bracket failed (window end beyond the enclosed range or bracket ends of equal sign)")
    else:
        a, b = we; qa = q_of_t(enc, fam, g, a); qb = q_of_t(enc, fam, g, b); cha = fam.chords(qb[0]); labmin = min(cha, key=lambda k: pt(cha[k].a))
        out["window_end"] = {"T_star": [s45(a.a), s45(b.b)], "nearest_image_at_end": labmin, "q_star_rad": [s45(qa[0].a), s45(qb[0].b)], "speed_at_T_star": [s45(qa[1].a), s45(qb[1].b)]}
        print(f"window end T* in [{s45(a.a)[:12]}, {s45(b.b)[:12]}] (nearest image {labmin}); q* in [{s45(qa[0].a)[:10]}, {s45(qb[0].b)[:10]}]; speed there in [{s45(qa[1].a)[:10]}, {s45(qb[1].b)[:10]}]")
    cr = crossing(enc, fam, g)
    Umax_enc = fam.U(iv.mpf(q_enc)) if qz is None else fam.U(qz)
    if cr is None:
        out["crossing"] = {"none_on_enclosed_range": True, "U_max_on_range": [s45(Umax_enc.a), s45(Umax_enc.b)], "threshold_1_over_2g": s45((1/(2*g)).a), "certified_no_crossing": bool(up(Umax_enc) < lo(1/(2*g)))}
        print(f"crossing: none on the enclosed range (U_max in [{s45(Umax_enc.a)[:10]}, {s45(Umax_enc.b)[:10]}] vs 1/(2g) = {s45((1/(2*g)).a)[:8]}); certified no crossing: {out['crossing']['certified_no_crossing']}")
    else:
        qc, tc = cr; out["crossing"] = {"q_c_rad": [s45(qc.a), s45(qc.b)], "t_c": [s45(tc.a), s45(tc.b)], "chords_at_q_c": {k: [s45(v.a), s45(v.b)] for k, v in fam.chords(qc).items()}}
        print(f"wake crossing: q_c in [{s45(qc.a)[:10]}, {s45(qc.b)[:10]}] rad; t_c in [{s45(tc.a)[:12]}, {s45(tc.b)[:12]}]")
    if we is not None and cr is not None:
        first = "crossing first" if up(tc) < lo(a) else ("window end first" if up(b) < lo(tc) else "undecided: the enclosures overlap"); out["which_first"] = first; print("order:", first)
    elif we is not None: out["which_first"] = "window end (no crossing on the window)" if out["crossing"].get("certified_no_crossing") else "window end; crossing not certified either way"
    if qz is not None and we is not None:
        tz_lo = enc["nodes"][-1][1]; out["turning_point"]["t_to_reach_q_z_minus_eps_lower"] = s45(tz_lo); out["turning_point"]["beyond_window"] = bool(pt(tz_lo) > up(b)); out["turning_point"]["inside_window"] = bool(up(enc["nodes"][-1][2]) < lo(a))
        print(f"turning point: time to reach q_z - eps >= {s45(tz_lo)[:10]}; beyond the enclosed window: {out['turning_point']['beyond_window']}; inside: {out['turning_point']['inside_window']}")
    out["wall_s"] = time.time() - t0; json.dump(out, open(outfile, "w"), indent=1); print(f"wall {out['wall_s']:.1f} s")
