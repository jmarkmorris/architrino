# Stage B precision item, support role (emmy-noether): comparison/remainder enclosure of the full-minus-held-antipode speed (and position) difference
# at the end of step 21 (t upper 2.0767) on the admitted R = 10 history, from the frozen records three-b3 (canonical) and two-b (held-antipode
# diagnostic, noncanonical), steps 13-21. No trajectory run, no solver: only interval evaluation of closed forms on the recorded boxes.
# Derivation (report section 1): every delayed argument of every class, for every state in the boxes, lies before the start of step 13 (tau = chord
# >= 1.1 (unlike), 1.41 (like), 1.95 (antipode) against a step-13 start near 1.9867), so on [t13, t21end] BOTH runs are delay-free non-autonomous ODEs on
# the common history h:  q'' = g[Phi(t,q) + A(t,q)],  qh'' = g[Phi(t,qh) + H(qh)],  H(z) = sin(z/2)/(4 cos^2(z/2)),  A = H(q - p)/D_A.
# delta = q - qh:  delta'' = k(t) delta - eps(t),  k = g dPsi/dq at an intermediate state (Psi = Phi + H),  eps = g[H(q) - H(q-p)/D_A] at the FULL state,
# eps = g[H'(zeta) p + H(q-p)(D_A-1)/D_A] >= 0 (mean value form, zeta in [q-p, q]);  delta = delta' = 0 at t13 (identical law and history before t_a).
# Bound: |delta(t)| <= sigma * t * I_eps(t), sigma = sinh(kappa T)/(kappa T), kappa = sqrt(K), K >= sup|k|;
#   delta'(T) in -I_eps + [-1,1] K sigma T^2 I_hi/2;   delta(T) in -E2 + [-1,1] K sigma T^3 I_hi/6,  E2 = int (T-s) eps ds,  T = 0.09.
# Controls BEFORE the target: (K1) toy delta'' = +-K0 delta - eps0 (exact sinh/sin solutions) inside the bound; (K2) the dPsi_c/dq closed form vs a
# finite difference on a model history (40 digits); (W) wrong-sign eps flips the conclusion.
# Run: OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -l perl -e 'alarm 30; exec @ARGV' -- ../.venv/bin/python -I <this file> <out.json>
import os, sys, json
print("PID", os.getpid(), flush=True)
W14 = "reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-curvature-claude-coverage-wave14-rest-iv.py"
exec(open(W14).read().split('if __name__ == "__main__":')[0])   # Family, I, lo, up, pt, s45, S2, ONE, ZERO, iv, mp
g = iv.mpf(1)/10; fam = Family("sixpole")
def J(x): return [s45(x.a), s45(x.b)]
def iv_of(p): return I(mp.mpf(p[0]), mp.mpf(p[1]))
def hull(a, b): return I(min(lo(a), lo(b)), max(up(a), up(b)))
def H(z, L=iv): return L.sin(z/2)/(4*L.cos(z/2)**2)
def Hp(z, L=iv): return (1 + L.sin(z/2)**2)/(8*L.cos(z/2)**3)
def mer(q, qp, vp, sg, L=iv):
    s2 = L.sqrt(L.mpf(2)); cc = L.cos(q + qp); s_ = L.sin(q + qp)
    r2 = 2 - sg*s2*s_ + sg*L.sin(q)*L.sin(qp); r = L.sqrt(r2)
    r_q = sg*(-s2*cc + L.cos(q)*L.sin(qp))/(2*r); r_qp = sg*(-s2*cc + L.sin(q)*L.cos(qp))/(2*r)
    M = cc/s2 - L.sin(q)*L.cos(qp)/2; M_q = -s_/s2 - L.cos(q)*L.cos(qp)/2; M_qp = -s_/s2 + L.sin(q)*L.sin(qp)/2
    D = 1 - sg*vp*M/r; D_q = -sg*vp*(M_q*r - M*r_q)/r2; D_qp = -sg*vp*(M_qp*r - M*r_qp)/r2; D_vp = -sg*M/r
    N = cc/s2 - L.cos(q)*L.sin(qp)/2; N_q = -s_/s2 + L.sin(q)*L.sin(qp)/2; N_qp = -s_/s2 - L.cos(q)*L.cos(qp)/2
    W = r**3*D; W_q = 3*r2*r_q*D + r**3*D_q; W_qp = 3*r2*r_qp*D + r**3*D_qp; W_vp = r**3*D_vp
    return {"a": N/W, "a_q": (N_q*W - N*W_q)/W**2, "a_qp": (N_qp*W - N*W_qp)/W**2, "a_vp": -N*W_vp/W**2, "r": r, "r_q": r_q, "r_qp": r_qp, "D": D}
def dPsi_c(q, qp, vp, app, sg, L=iv):
    m = mer(q, qp, vp, sg, L); dtau = m["r_q"]/(1 + m["r_qp"]*vp)
    return m["a_q"] - (m["a_qp"]*vp + m["a_vp"]*app)*dtau
def bound(I_eps, E2, K, T):
    """delta'(T) and delta(T) enclosures from I_eps = int eps (interval, either sign handled by magnitudes), E2 = int (T-s) eps."""
    Ihi = iv.mpf(max(abs(lo(I_eps)), abs(up(I_eps)))); kap = iv.sqrt(K); x = kap*T; sigma = iv.sinh(x)/x if lo(x) > 0 else ONE
    rem_v = K*sigma*T*T*Ihi/2; rem_x = K*sigma*T**3*Ihi/6
    return -I_eps + I(-1, 1)*rem_v, -E2 + I(-1, 1)*rem_x, K*sigma*T*T/2, sigma
out = {"controls": []}
# ---- (K1) toy: delta'' = L delta - eps0, L = +K0 and -K0, exact solutions inside the bound
T = iv.mpf("0.09"); K0 = iv.mpf("0.5"); e0 = iv.mpf("1e-5"); kap = iv.sqrt(K0)
dv, dx, eta, sig = bound(e0*T, e0*T*T/2, K0, T)
ex_v_plus = -e0*iv.sinh(kap*T)/kap; ex_v_minus = -e0*iv.sin(kap*T)/kap; ex_x_plus = -e0*(iv.cosh(kap*T) - 1)/K0; ex_x_minus = -e0*(1 - iv.cos(kap*T))/K0
inside = lambda x, b: lo(b) <= lo(x) and up(x) <= up(b)
okK1 = inside(ex_v_plus, dv) and inside(ex_v_minus, dv) and inside(ex_x_plus, dx) and inside(ex_x_minus, dx) and up(dv) < 0
out["controls"].append({"name": "(K1) known toy: delta'' = +-K0 delta - eps0 (K0 = 0.5, eps0 = 1e-5, T = 0.09): exact sinh and sin solutions for speed and position lie inside the bound, and the bound proves the negative sign",
    "bound_v": J(dv), "exact_v_plus": J(ex_v_plus), "exact_v_minus": J(ex_v_minus), "bound_x": J(dx), "exact_x_plus": J(ex_x_plus), "exact_x_minus": J(ex_x_minus), "eta": J(eta), "pass": bool(okK1)})
# ---- (K2) dPsi_c/dq closed form vs finite difference on a model history h(s) = c0 + c1 s + c2 s^2 (40 digits), both classes
mp.dps = 40
c0, c1, c2 = mp.mpf("0.01"), mp.mpf("0.05"), mp.mpf("0.05"); tm = mp.mpf("2.0")
def hq(s): return c0 + c1*s + c2*s*s
def psi_c(q, sg):
    a_, b_ = mp.mpf("0.8"), mp.mpf("2.0")
    for _ in range(200):
        m_ = (a_ + b_)/2
        if m_ - mer(q, hq(tm - m_), 0, sg, mp)["r"] < 0: a_ = m_
        else: b_ = m_
    tau = (a_ + b_)/2; s = tm - tau
    return mer(q, hq(s), c1 + 2*c2*s, sg, mp)["a"], s
okK2 = True; k2 = {}
for sg in (1, -1):
    q0 = mp.mpf("0.2"); hh = mp.mpf("1e-8"); f1 = (psi_c(q0 + hh, sg)[0] - psi_c(q0 - hh, sg)[0])/(2*hh); f2 = (psi_c(q0 + 2*hh, sg)[0] - psi_c(q0 - 2*hh, sg)[0])/(4*hh); fd = (4*f1 - f2)/3
    s = psi_c(q0, sg)[1]; cf = dPsi_c(q0, hq(s), c1 + 2*c2*s, 2*c2, sg, mp); err = abs(cf - fd); okK2 = okK2 and err < mp.mpf("1e-14")
    k2["unlike" if sg == 1 else "like"] = {"closed": mp.nstr(cf, 20), "fd": mp.nstr(fd, 20), "abs_err": mp.nstr(err, 5)}
hp_fd = (H(mp.mpf("0.2") + mp.mpf("1e-10"), mp) - H(mp.mpf("0.2") - mp.mpf("1e-10"), mp))/mp.mpf("2e-10"); okK2 = okK2 and abs(hp_fd - Hp(mp.mpf("0.2"), mp)) < mp.mpf("1e-14")
out["controls"].append({"name": "(K2) known: total dPsi_c/dq (current-coordinate derivative of a delayed-class hit on a fixed model history, delay re-solved) vs Richardson finite difference, both classes; H' vs finite difference", "detail": k2, "pass": bool(okK2)})
mp.dps = 30; iv.dps = 30
# ---- (W) negative: wrong-sign eps flips the conclusion on the toy
dvw, dxw, _, _ = bound(-e0*T, -e0*T*T/2, K0, T)
out["controls"].append({"name": "(W) negative: wrong-sign eps (toy) gives a proved POSITIVE speed difference (conclusion flips)", "bound_v_wrong": J(dvw), "pass": bool(lo(dvw) > 0)})
out["controls_all_pass"] = all(c["pass"] for c in out["controls"]); print(json.dumps(out["controls"]), flush=True)
# ---- target: frozen records
E = "reference/priorities/master-equation-closure/noether-sea-research/evidence/"
full = {s["step"]: s for s in json.load(open(E + "spherical-six-pole-antipodal-claude-continuation-steps3-iv-N4000-three-b3.json"))["steps"]}
held = {s["step"]: s for s in json.load(open(E + "spherical-six-pole-antipodal-claude-continuation-steps3-iv-N4000-two-b.json"))["steps"]}
steps = list(range(13, 22)); assert all(k in full and k in held and full[k]["certified"] and held[k]["certified"] for k in steps)
assert full[12]["end_q_str"] == held[12]["end_q_str"] and full[12]["end_v_str"] == held[12]["end_v_str"], "runs must share the step-12 end state strings"
t13 = lo(iv_of(full[13]["t_int"])); rows = []; I_eps = ZERO; E2 = ZERO; Kmax = mp.mpf(0); max_darg = mp.mpf("-1e9"); kmin = None; kmax = None; Ieps_w = ZERO
for k in steps:
    f = full[k]; h = held[k]; qf = iv_of(f["S"]); qb = hull(qf, iv_of(h["S"]))
    # common-history premise: every delayed argument recorded in either run on these steps is below the step-13 start
    for rec in (f, h):
        for name in rec["classes"]:
            max_darg = max(max_darg, mp.mpf(rec["classes"][name]["delayed_arg_range"][1]))
    # eps on the FULL state (antipode boxes of the full record)
    a = f["classes"]["antipode"]; p = iv_of(a["history_q_range"]); vA = iv_of(a["history_qdot_range"]); d = qf - p; DA = ONE + vA*iv.sin(d/2)
    assert lo(p) >= 0 and lo(vA) >= 0 and lo(d) > 0
    eps = g*(Hp(hull(d, qf))*p + H(d)*(DA - ONE)/DA); eps_naive = g*(H(qf) - H(d)/DA)
    # Lipschitz factor k = g dPsi/dq on the hull boxes of both runs
    kk = g*Hp(qb)
    for name, sg in (("unlike", 1), ("like", -1)):
        qp = hull(iv_of(f["classes"][name]["history_q_range"]), iv_of(h["classes"][name]["history_q_range"])); vp = hull(iv_of(f["classes"][name]["history_qdot_range"]), iv_of(h["classes"][name]["history_qdot_range"]))
        kk = kk + 2*g*dPsi_c(qb, qp, vp, g*fam.F(qp), sg)
    Kmax = max(Kmax, abs(lo(kk)), abs(up(kk))); kmin = lo(kk) if kmin is None else min(kmin, lo(kk)); kmax = up(kk) if kmax is None else max(kmax, up(kk))
    sk = iv.mpf("0.01")*(k - 13); I_eps = I_eps + iv.mpf("0.01")*eps; E2 = E2 + eps*iv.mpf("0.01")*(T - sk - iv.mpf("0.005")); Ieps_w = Ieps_w - iv.mpf("0.01")*eps
    rows.append({"step": k, "eps": J(eps), "eps_naive_subtraction": J(eps_naive), "p": J(p), "D_A": J(DA), "k": J(kk), "q_hull_both_runs": J(qb)})
K = iv.mpf(Kmax); dv, dx, eta, sigma = bound(I_eps, E2, K, T); dvw, dxw, _, _ = bound(Ieps_w, -E2, K, T)
fe = iv_of(full[21]["end_v_str"]); he = iv_of(held[21]["end_v_str"]); pred_v = fe - he; fq = iv_of(full[21]["end_q_str"]); hq_ = iv_of(held[21]["end_q_str"]); pred_x = fq - hq_
out["target"] = {"steps": rows, "common_history": {"max_recorded_delayed_argument": s45(max_darg), "step13_start_lower": s45(t13), "holds": bool(max_darg < t13)},
    "I_eps": J(I_eps), "E2": J(E2), "k_range": [s45(kmin), s45(kmax)], "K": s45(Kmax), "T": "0.09", "sigma": J(sigma), "eta": J(eta),
    "speed_difference_full_minus_held": J(dv), "speed_sign": "negative" if up(dv) < 0 else ("positive" if lo(dv) > 0 else "spans zero"),
    "position_difference_full_minus_held": J(dx), "position_sign": "negative" if up(dx) < 0 else ("positive" if lo(dx) > 0 else "spans zero"),
    "predecessor_speed_difference_from_end_strings": J(pred_v), "predecessor_position_difference": J(pred_x),
    "inside_predecessor_speed": bool(lo(pred_v) <= lo(dv) and up(dv) <= up(pred_v)), "inside_predecessor_position": bool(lo(pred_x) <= lo(dx) and up(dx) <= up(pred_x)),
    "wrong_sign_eps_speed": J(dvw), "wrong_sign_flips": bool(lo(dvw) > 0)}
print(json.dumps({k: v for k, v in out["target"].items() if k != "steps"}, indent=0), flush=True)
for r in rows: print(r["step"], "eps", r["eps"][0][:12], r["eps"][1][:12], "naive", r["eps_naive_subtraction"][0][:10], r["eps_naive_subtraction"][1][:10], "k", r["k"][0][:9], r["k"][1][:9], "p", r["p"][0][:10], r["p"][1][:10], flush=True)
json.dump(out, open(sys.argv[1], "w"), indent=1)
