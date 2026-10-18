# Correlated-continuation campaign, review (ramon-e-moore lens): CENTRED-FORM end evaluator for correlated state sets; written 2026-10-14 11:50-12:05 UTC after my Phase A
# freeze (reference bca8dede..., companion 1 adccee78...), before opening any correlated-continuation file of another role or the coordinator. It executes my frozen
# turning-point audit9 v5 (sha256 b1aca3581b817bfd0abbe74c85feddfcf3b45c0605105e560ea1fc8a55f0ce8c, verified) up to its target block, so all of its controls run first and the
# own chain p1..q2 is appended (486 records) when given with --own. Additions (derived in my reference, section 4): first-order interval dual numbers in (q, w); the end values
# a (tangent acceleration), a_r, l = -w^2 - a_r and dl/dt = -2 w a - da_r/dt evaluated on a correlated set {z_hat + C u + r : u in [-1,1]^m, r in R} by the centred form
# f(z) in f(z_hat) + grad f([Z]) (C U + R), the gradient enclosed over the whole set including the delay-root dependence (dtau/dq = rho_q / D, ds/dq = -rho_q / D, source
# rates w', a', j' from my own lookup and the stored rate bounds); the history is an INDEPENDENT box unless reconstructed (the loss is stated, not hidden).
# Controls BEFORE any target: (K1) exact affine function on a thin correlated set (centred form exact, box form wider); (K2) q*w on a parallelogram, exact range by vertex and
# edge enumeration contained, box form wider; (K3) dual derivatives of a, a_r and dl/dt against central differences of my point evaluation at a frozen end state with the
# history held fixed; (K4) frozen step-436 end: my centred value on the record box meets the subject's stored end values; (N1) lost correlation (box hull first) wider; (N2)
# unjustified intersection with a box of another instant excludes the truth and is flagged; (N3) a forbidden common parameter for an independent box excludes a true corner;
# v2 (after run C4, which stopped in its own new control K0 before any target; v1 retained): point values wrapped as intervals before mixing with intervals (mpmath refuses mpf + interval); no other change.
# v3 (after run C6, which stopped at the same kind of mix in K0 line 105 before any target; v2 retained): that line wrapped; every synthetic-control line re-read for point-interval mixes.
# v4 (after run C8, which stopped in my own control K1 before any target; v3 retained): K1 compared an interval built from the binary float 1e-6 with an exact value built from the decimal string 1e-6 at tolerance 1e-25 (difference about 3e-23); the remainder is now built from the decimal string; nothing else changed.
# (N5) an omitted remainder excludes a true point. Usage: centred.py OUT.json [--own FILE... --] [TARGET.json[:LO-HI] ...]  (targets: records with correlated sets, later)
import os, sys, json, hashlib, copy
E9 = "reference/priorities/master-equation-closure/noether-sea-research/evidence/"
_b9 = open(E9 + "spherical-six-pole-turning-point-claude-review-audit9.py", "rb").read(); assert hashlib.sha256(_b9).hexdigest() == "b1aca3581b817bfd0abbe74c85feddfcf3b45c0605105e560ea1fc8a55f0ce8c"
_args = list(sys.argv[1:]); _out = _args[0]; sys.argv = [sys.argv[0], "/dev/null"] + _args[1:]
_head = _b9.decode().split("# ---------- targets (the audit8 target block", 1)[0]
exec(_head)
outp = _out
# ---------- interval duals in (q, w) ----------
class Dn:
    __slots__ = ("v", "g")
    def __init__(s, v, g=None): s.v = v if isinstance(v, iv.mpf) else iv.mpf(v); s.g = g if g is not None else [iv.mpf(0), iv.mpf(0)]
def _d(x): return x if isinstance(x, Dn) else Dn(x)
def dadd(a, b): a, b = _d(a), _d(b); return Dn(a.v + b.v, [a.g[i] + b.g[i] for i in range(2)])
def dneg(a): return Dn(-a.v, [-x for x in a.g])
def dsub(a, b): return dadd(a, dneg(_d(b)))
def dmul(a, b): a, b = _d(a), _d(b); return Dn(a.v*b.v, [a.g[i]*b.v + a.v*b.g[i] for i in range(2)])
def dinv(a): a = _d(a); f = 1/a.v; return Dn(f, [-x*f*f for x in a.g])
def ddiv(a, b): return dmul(a, dinv(b))
def dsin(a): return Dn(iv.sin(a.v), [iv.cos(a.v)*x for x in a.g])
def dcos(a): return Dn(iv.cos(a.v), [-iv.sin(a.v)*x for x in a.g])
def dsqrt(a): f = iv.sqrt(a.v); return Dn(f, [x/(2*f) for x in a.g])
SQ2 = iv.sqrt(2)
def dmer(q, p, vp, sg):
    s_ = dsin(dadd(q, p)); c_ = dcos(dadd(q, p)); sq = dsin(q); cq = dcos(q); sp = dsin(p); cp = dcos(p)
    r2 = dadd(dsub(2, dmul(sg*SQ2, s_)), dmul(sg, dmul(sq, sp))); r = dsqrt(r2)
    M = dsub(ddiv(c_, SQ2), dmul(dmul(sq, cp), iv.mpf("0.5"))); N = dsub(ddiv(c_, SQ2), dmul(dmul(cq, sp), iv.mpf("0.5")))
    D = dsub(1, ddiv(dmul(sg, dmul(vp, M)), r)); hit = ddiv(N, dmul(dmul(dmul(r, r), r), D))
    r_q = ddiv(dmul(sg, dadd(dmul(-SQ2, c_), dmul(cq, sp))), dmul(2, r)); r_qp = ddiv(dmul(sg, dadd(dmul(-SQ2, c_), dmul(sq, cp))), dmul(2, r))
    M_q = dsub(dmul(-1/SQ2, s_), dmul(dmul(cq, cp), iv.mpf("0.5"))); M_qp = dadd(dmul(-1/SQ2, s_), dmul(dmul(sq, sp), iv.mpf("0.5")))
    return r, D, hit, r_q, r_qp, M, M_q, M_qp
def dd_mer(q, p, vp, w, sg, ap):
    r, D, hit, r_q, r_qp, M, M_q, M_qp = dmer(q, p, vp, sg); taudot = ddiv(dadd(dmul(r_q, w), dmul(r_qp, vp)), D); one = dsub(1, taudot)
    rdot = dadd(dmul(r_q, w), dmul(dmul(r_qp, vp), one)); vdotp = dmul(ap, one); Mdot = dadd(dmul(M_q, w), dmul(dmul(M_qp, vp), one))
    Ddot = dmul(-sg, dadd(ddiv(dmul(vdotp, M), r), ddiv(dmul(vp, dsub(dmul(Mdot, r), dmul(M, rdot))), dmul(r, r))))
    rD = dmul(r, D); return dneg(ddiv(dadd(dmul(rdot, D), dmul(r, Ddot)), dmul(rD, rD))), r, D, hit
def danti(q, p, vp): d = dsub(q, p); r = dmul(2, dcos(dmul(d, iv.mpf("0.5")))); D = dadd(1, dmul(vp, dsin(dmul(d, iv.mpf("0.5"))))); return r, D, ddiv(dsin(d), dmul(dmul(dmul(r, r), r), D))
def dd_anti(q, p, vp, w, ap):
    d = dsub(q, p); sd = dsin(dmul(d, iv.mpf("0.5"))); cd = dcos(dmul(d, iv.mpf("0.5"))); r = dmul(2, cd); D = dadd(1, dmul(vp, sd))
    taudot = ddiv(dadd(dmul(dneg(sd), w), dmul(sd, vp)), D); one = dsub(1, taudot); rdot = dmul(dneg(sd), dsub(w, dmul(vp, one))); vdotp = dmul(ap, one)
    Ddot = dadd(dmul(vdotp, sd), dmul(dmul(vp, cd), dmul(dsub(w, dmul(vp, one)), iv.mpf("0.5")))); rD = dmul(r, D)
    return dneg(ddiv(dadd(dmul(rdot, D), dmul(r, Ddot)), dmul(rD, rD))), r, D, danti(q, p, vp)[2]
def f_all(q, w, src):
    """src[cls] = (p, vp, ap) as Dn; returns Dn for a, a_r, l, dl"""
    gD = iv.mpf(1)/10
    dU, rU, DU, hU = dd_mer(q, src["U"][0], src["U"][1], w, 1, src["U"][2]); dL, rL, DL, hL = dd_mer(q, src["L"][0], src["L"][1], w, -1, src["L"][2]); dA, rA, DA, hA = dd_anti(q, src["A"][0], src["A"][1], w, src["A"][2])
    a = dmul(gD, dadd(dadd(dmul(2, hU), dmul(2, hL)), hA)); ar = dmul(gD, dsub(dsub(dinv(dmul(rL, DL)), dinv(dmul(rU, DU))), dmul(iv.mpf("0.5"), dinv(dmul(rA, DA)))))
    dar = dmul(gD, dsub(dsub(dL, dU), dmul(iv.mpf("0.5"), dA))); l = dsub(dneg(dmul(w, w)), ar); dl = dsub(dmul(-2, dmul(w, a)), dar)
    return {"a": a, "a_r": ar, "l": l, "dl": dl}
CN = {"unlike": "U", "like": "L", "antipode": "A"}
def sources(Qbox, tlo, thi, guess, with_grad):
    """own delay brackets over Qbox and the time interval; source boxes (p, w', a') and, if with_grad, their q-derivatives via ds/dq = -rho_q / D with rates w', a', j'"""
    src = {}; info = {}
    for n in NAMES:
        tb = own_tau(Qbox, tlo, thi, n, guess[n])
        if tb is None: return None, {"failed": n}
        H, names = lookup(RECS, tlo - tb[1], thi - tb[0], "poly"); jh = ap_hull(tlo - tb[1], thi - tb[0]); info[n] = names
        p, vp, ap = H[0], H[1], H[2]
        if with_grad:
            if n == "antipode": d_ = Qbox - p; rq = -iv.sin(d_/2); Dv = 1 + vp*iv.sin(d_/2)
            else: sg = 1 if n == "unlike" else -1; rr = mer(Qbox, p, vp, sg); rq = rr[3]; Dv = rr[1]
            dsdq = -rq/Dv; src[CN[n]] = (Dn(p, [vp*dsdq, iv.mpf(0)]), Dn(vp, [ap*dsdq, iv.mpf(0)]), Dn(ap, [jh*dsdq, iv.mpf(0)]))
        else: src[CN[n]] = (Dn(p), Dn(vp), Dn(ap))
    return src, info
def centred_eval(zhat, C, R, tlo, thi, guess):
    """correlated set z = zhat + C u + r, u in [-1,1]^m, r in R (zhat point pair, C 2 x m interval matrix, R pair of intervals); returns centred enclosures of a, a_r, l, dl"""
    m = len(C[0]); U = iv.mpf([-1, 1])
    Zq = iv.mpf(zhat[0]) + sum((C[0][j]*U for j in range(m)), iv.mpf(0)) + R[0]; Zw = iv.mpf(zhat[1]) + sum((C[1][j]*U for j in range(m)), iv.mpf(0)) + R[1]
    s0, i0 = sources(iv.mpf(zhat[0]), tlo, thi, guess, False)
    if s0 is None: return None
    fc = f_all(Dn(iv.mpf(zhat[0])), Dn(iv.mpf(zhat[1])), s0)
    sg_, ig = sources(Zq, tlo, thi, guess, True)
    if sg_ is None: return None
    fg = f_all(Dn(Zq, [iv.mpf(1), iv.mpf(0)]), Dn(Zw, [iv.mpf(0), iv.mpf(1)]), sg_)
    res = {}
    for k in ("a", "a_r", "l", "dl"):
        gq, gw = fg[k].g; dev = sum(((gq*C[0][j] + gw*C[1][j])*U for j in range(m)), iv.mpf(0)) + gq*R[0] + gw*R[1]
        cen = fc[k].v + dev; plain = fg[k].v; best = iv.mpf([max(lo(cen), lo(plain)), min(up(cen), up(plain))])
        res[k] = {"centred": c2s(cen), "plain_box": c2s(plain), "best": c2s(best), "sign": sg3(best), "width_centred": mp.nstr(wid(cen), 5), "width_plain": mp.nstr(wid(plain), 5)}
    res["Zbox"] = [c2s(Zq), c2s(Zw)]; res["records_centre"] = i0; return res
out["controls"]["centred"] = {}; cc_ = out["controls"]["centred"]
# (K0) exact AFFINE FLOW (q advancing with constant w over h = 0.01): the propagated correlated set (A z_hat, A C, A R) contains the exact images of every vertex
# (u in {-1,1}^2, r at the corners of R) and its box hull is narrower than propagating the box hull of the input (lost correlation)
hf = mpf("0.01"); zf = (mpf("1.6"), mpf("0.29")); Cf = [[mpf("0.004"), mpf("0.001")], [mpf("-0.003"), mpf("0.0005")]]; Rf = (mpf("1e-6"), mpf("2e-6"))
AC = [[Cf[0][j] + hf*Cf[1][j] for j in range(2)], [Cf[1][j] for j in range(2)]]; Uf = iv.mpf([-1, 1])
imgq = iv.mpf(zf[0] + hf*zf[1]) + sum((iv.mpf(AC[0][j])*Uf for j in range(2)), iv.mpf(0)) + iv.mpf([-Rf[0], Rf[0]]) + iv.mpf(hf)*iv.mpf([-Rf[1], Rf[1]]); imgw = iv.mpf(zf[1]) + sum((iv.mpf(AC[1][j])*Uf for j in range(2)), iv.mpf(0)) + iv.mpf([-Rf[1], Rf[1]])
okK0 = True; verts = []
for u1 in (-1, 1):
    for u2 in (-1, 1):
        for r1 in (-1, 1):
            for r2 in (-1, 1):
                q_ = zf[0] + Cf[0][0]*u1 + Cf[0][1]*u2 + Rf[0]*r1; w_ = zf[1] + Cf[1][0]*u1 + Cf[1][1]*u2 + Rf[1]*r2; qi, wi = q_ + hf*w_, w_; verts.append((qi, wi)); okK0 = okK0 and lo(imgq) <= qi <= up(imgq) and lo(imgw) <= wi <= up(imgw)
boxq = iv.mpf(zf[0]) + iv.mpf(abs(Cf[0][0]) + abs(Cf[0][1]) + Rf[0])*Uf; boxw = iv.mpf(zf[1]) + iv.mpf(abs(Cf[1][0]) + abs(Cf[1][1]) + Rf[1])*Uf; lostq = boxq + iv.mpf(hf)*boxw
okK0 = bool(okK0 and wid(lostq) > wid(imgq)); out["controls"]["centred_K0_affine_flow"] = {"image_q": c2s(imgq), "image_w": c2s(imgw), "lost_correlation_q": c2s(lostq), "vertices": len(verts), "pass": okK0}
print("centred K0 affine flow", okK0, flush=True); assert okK0
# (K1) exact affine function on a thin correlated set; (N1) lost correlation
z_ = (mpf("1.6"), mpf("0.29")); Cm = [[iv.mpf("0.01"), iv.mpf("0.0001")], [iv.mpf("-0.0098"), iv.mpf("0.0001")]]; Rm = (iv.mpf(["-1e-6", "1e-6"]), iv.mpf(["-1e-6", "1e-6"]))
al, be = mpf("0.7"), mpf("0.71"); U1 = iv.mpf([-1, 1])
exact = [al*z_[0] + be*z_[1] - (abs(al*mpf("0.01") + be*mpf("-0.0098")) + abs(al*mpf("0.0001") + be*mpf("0.0001")) + (al + be)*mpf("1e-6")), al*z_[0] + be*z_[1] + (abs(al*mpf("0.01") + be*mpf("-0.0098")) + abs(al*mpf("0.0001") + be*mpf("0.0001")) + (al + be)*mpf("1e-6"))]
cenK1 = iv.mpf(al*z_[0] + be*z_[1]) + sum(((iv.mpf(al)*Cm[0][j] + iv.mpf(be)*Cm[1][j])*U1 for j in range(2)), iv.mpf(0)) + iv.mpf(al)*Rm[0] + iv.mpf(be)*Rm[1]
Zq1 = iv.mpf(z_[0]) + (Cm[0][0] + Cm[0][1])*U1 + Rm[0]; Zw1 = iv.mpf(z_[1]) + (abs(Cm[1][0]) + abs(Cm[1][1]))*U1 + Rm[1]; boxK1 = iv.mpf(al)*Zq1 + iv.mpf(be)*Zw1
okK1 = bool(abs(lo(cenK1) - exact[0]) < mpf("1e-25") and abs(up(cenK1) - exact[1]) < mpf("1e-25") and wid(boxK1) > 5*wid(cenK1)); cc_["K1_affine_exact_and_N1_lost_correlation_wider"] = {"centred": c2s(cenK1), "box": c2s(boxK1), "pass": okK1}
# (K2) q*w on a parallelogram: exact range by edges (bilinear: extrema on the boundary edges), centred form contains it, box form wider
def qw(u1, u2): return (z_[0] + mpf("0.01")*u1 + mpf("0.0001")*u2)*(z_[1] - mpf("0.0098")*u1 + mpf("0.0001")*u2)
vals = []
for j_ in range(201):
    x_ = -1 + mpf(2)*j_/200
    for (u1, u2) in ((x_, -1), (x_, 1), (-1, x_), (1, x_)): vals.append(qw(u1, u2))
ex2 = (min(vals), max(vals)); gq2 = Zw1; gw2 = Zq1   # gradient of q*w over the box
cenK2 = iv.mpf(z_[0]*z_[1]) + sum(((gq2*Cm[0][j] + gw2*Cm[1][j])*U1 for j in range(2)), iv.mpf(0)); boxK2 = Zq1*Zw1
okK2 = bool(lo(cenK2) <= ex2[0] and ex2[1] <= up(cenK2) and wid(boxK2) > wid(cenK2)); cc_["K2_quadratic_parallelogram"] = {"exact_sampled_range": [str(ex2[0]), str(ex2[1])], "centred": c2s(cenK2), "box": c2s(boxK2), "pass": okK2}
# (N2) unjustified intersection: truth at instant t_k (z_ itself) vs a box of the next instant (shifted by w*Delta in q): intersecting excludes the truth
Bnext = (iv.mpf([z_[0] + z_[1]*mpf("0.01") - mpf("0.001"), z_[0] + z_[1]*mpf("0.01") + mpf("0.001")]))
okN2 = bool(not (lo(Bnext) <= z_[0] <= up(Bnext))); cc_["N2_unjustified_intersection_excludes_truth"] = okN2
# (N3) forbidden common parameter: an independent box [q] x [w] written as one diagonal parameter misses the corner (q_hi, w_lo)
corner = (z_[0] + mpf("0.01"), z_[1] - mpf("0.01")); diagset = lambda u: (z_[0] + mpf("0.01")*u, z_[1] + mpf("0.01")*u)
okN3 = bool(all(not (abs(diagset(u)[0] - corner[0]) < mpf("1e-12") and abs(diagset(u)[1] - corner[1]) < mpf("1e-12")) for u in (mpf(-1), mpf(0), mpf(1))) and abs(corner[1] - diagset(1)[1]) > mpf("0.019")); cc_["N3_forbidden_common_parameter_misses_corner"] = okN3
# (N5) omitted remainder: a true point z_hat + C u + r with r at the edge of R is excluded when R is dropped
tp = (z_[0] + mpf("0.0101") + mpf("1e-6"), z_[1] - mpf("0.0097") + mpf("1e-6")); noR = (iv.mpf(z_[0]) + (Cm[0][0] + Cm[0][1])*1, iv.mpf(z_[1]) + Cm[1][0]*1 + Cm[1][1]*1)
okN5 = bool(tp[0] > up(noR[0])); cc_["N5_omitted_remainder_excludes_true_point"] = okN5
print("centred K1", okK1, "K2", okK2, "N2", okN2, "N3", okN3, "N5", okN5, flush=True); assert okK1 and okK2 and okN2 and okN3 and okN5, "control failure (synthetic)"
# (K3) dual derivatives against central differences at the frozen step-436 end state (history held fixed at the point delay of the centre)
q2r = json.load(open([p_ for p_ in OWN if p_.endswith("q2.json")][0])) if OWN else None
if q2r:
    st436 = [s_ for s_ in q2r["steps"] if s_["step"] == 436][0]; tlo = mpf(st436["t_int"][0]) + DELTA; thi = mpf(st436["t_int"][1]); guess = {n: st436["end_classes"][n]["tau"] for n in NAMES}
    qc = (mpf(st436["end_q_str"][0]) + mpf(st436["end_q_str"][1]))/2; wc = (mpf(st436["end_v_str"][0]) + mpf(st436["end_v_str"][1]))/2
    s0, _ = sources(iv.mpf(qc), tlo, thi, guess, False)
    def pt(qv, wv):
        f = f_all(Dn(iv.mpf(qv), [iv.mpf(1), iv.mpf(0)]), Dn(iv.mpf(wv), [iv.mpf(0), iv.mpf(1)]), {k: (Dn(mid(v[0].v)), Dn(mid(v[1].v)), Dn(mid(v[2].v))) for k, v in s0.items()})
        return f
    h_ = mpf("1e-8"); f0 = pt(qc, wc); fqp = pt(qc + h_, wc); fqm = pt(qc - h_, wc); fwp = pt(qc, wc + h_); fwm = pt(qc, wc - h_); okK3 = True; k3 = {}
    for k in ("a", "a_r", "l", "dl"):
        nq = (mid(fqp[k].v) - mid(fqm[k].v))/(2*h_); nw = (mid(fwp[k].v) - mid(fwm[k].v))/(2*h_); eq = abs(mid(f0[k].g[0]) - nq); ew = abs(mid(f0[k].g[1]) - nw); k3[k] = [mp.nstr(eq, 3), mp.nstr(ew, 3)]; okK3 = okK3 and eq < mpf("1e-10") and ew < mpf("1e-10")
    cc_["K3_dual_vs_central_difference_history_fixed"] = {"abs_err_q_w": k3, "pass": bool(okK3)}
    # (K4) frozen step-436 end: centred value on the record box meets the stored end values
    Qb = Ip(st436["end_q_str"]); Wb = Ip(st436["end_v_str"]); zh = (mid(Qb), mid(Wb)); Cb = [[iv.mpf((up(Qb) - lo(Qb))/2), iv.mpf(0)], [iv.mpf(0), iv.mpf((up(Wb) - lo(Wb))/2)]]
    ce = centred_eval(zh, Cb, (iv.mpf(0), iv.mpf(0)), tlo, thi, guess); okK4 = bool(ce is not None and meets(I(*ce["dl"]["best"]), I(*st436["dl_dt_end"])) and meets(I(*ce["a"]["best"]), I(*st436["tangent_sum_end"])) and meets(I(*ce["l"]["best"]), I(*st436["lambda_hat_end"])))
    cc_["K4_frozen_436_end_meets_subject"] = {"centred": ce, "subject_dl": st436.get("dl_dt_end"), "pass": okK4}
    print("K3", okK3, k3, "K4", okK4, {k: (ce[k]["width_centred"], ce[k]["width_plain"], ce[k]["sign"]) for k in ("a", "a_r", "l", "dl")} if ce else None, flush=True); assert okK3 and okK4, "control failure (real data)"
assert not os.path.exists(outp); json.dump(out, open(outp, "w"), indent=1); print("saved", outp)
