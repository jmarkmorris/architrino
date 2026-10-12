# Like-reception campaign, support role (emmy-noether): time derivative of each class's tangent contribution and of the total tangential acceleration.
# h_c(q, q', v') = N_c/(r_c^3 D_c);  dh_c/dt = h_q qdot + (h_q' v' + h_v' a') sdot,  sdot = 1 - taudot = (1 - r_q qdot)/D_c  (since D_c = 1 + r_q' v'),
# a' = source acceleration at the delayed argument;  d(qddot)/dt = g * sum_c m_c dh_c/dt  (m = 2, 2, 1; all classes read generated history).
# Partials by the quotient rule on W = r^3 D:  h_x = (N_x W - N W_x)/W^2,  W_x = 3 r^2 r_x D + r^3 D_x,  h_v' = -N r^3 D_v'/W^2.
# Meridional classes (c = +1 unlike, -1 like): N = cos(q+q')/sqrt2 - cos q sin q'/2, M = cos(q+q')/sqrt2 - sin q cos q'/2, r^2 = 2 - c sqrt2 sin(q+q') + c sin q sin q',
#   D = 1 - c v' M/r.  Antipode (c = 0): N = sin d, r = 2 cos(d/2), D = 1 + v' sin(d/2), d = q - q'.
# Source states and accelerations: this role's record-hull lookup (source_state of slice2/slice3: window law only inside the window; retained records
# beyond T*, hull at every join; refusal beyond covered history), obtained by executing the definition part of support-slice3-iv.py (sha256 4a10b441...).
# Controls BEFORE any target: (K) exact known case on a prescribed history with a generated segment (acceleration jump at s1 = 1), expanded domain,
# delays solved to 40 digits, Richardson differences of each class's h_c(t) and of the total vs the closed forms at t = 2.4 and t = 2.7;
# (W1) the pre-seam acceleration used for the unlike source beyond the seam must be detected; (W2) the velocity sign flipped in D must be detected.
# Target: frozen late-feedback slices (steps 22-94) and the v4 chain of this campaign (steps 95-154): per step, whole-step and step-end enclosures of
# g m_c dh_c/dt for each class and of d(qddot)/dt, with signs (undecided preserved); consistency with the continuation's recorded `ap` (its own
# enclosure of d(qddot)/dt used in the affine step; different formula path, same records).
# Run: OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -l perl -e 'alarm 110; exec @ARGV' -- ../.venv/bin/python -I <this file> <out.json>
import sys, json, time
EV = "reference/priorities/master-equation-closure/noether-sea-research/evidence/"
OUTFILE = sys.argv[1]
exec(open(EV + "spherical-six-pole-like-reception-claude-support-slice3-iv.py").read().split('t0 = time.time(); out = {"controls": [], "covered_history_end"', 1)[0])
def kern(q, qp, vp, c, L=iv, dsign=1):
    one = L.mpf(1)
    if c == 0:
        d = q - qp; sh = L.sin(d/2); ch = L.cos(d/2)
        N = L.sin(d); N_q = L.cos(d); N_qp = -L.cos(d); r = 2*ch; r_q = -sh; r_qp = sh
        D = one + dsign*vp*sh; D_q = dsign*vp*ch/2; D_qp = -dsign*vp*ch/2; D_vp = dsign*sh
    else:
        s2r = L.sqrt(L.mpf(2)); cc = L.cos(q + qp); ss = L.sin(q + qp)
        r2 = 2 - c*s2r*ss + c*L.sin(q)*L.sin(qp); r = L.sqrt(r2)
        r_q = c*(-s2r*cc + L.cos(q)*L.sin(qp))/(2*r); r_qp = c*(-s2r*cc + L.sin(q)*L.cos(qp))/(2*r)
        M = cc/s2r - L.sin(q)*L.cos(qp)/2; M_q = -ss/s2r - L.cos(q)*L.cos(qp)/2; M_qp = -ss/s2r + L.sin(q)*L.sin(qp)/2
        k = dsign*c; D = one - k*vp*M/r; D_q = -k*vp*(M_q*r - M*r_q)/r2; D_qp = -k*vp*(M_qp*r - M*r_qp)/r2; D_vp = -k*M/r
        N = cc/s2r - L.cos(q)*L.sin(qp)/2; N_q = -ss/s2r + L.sin(q)*L.sin(qp)/2; N_qp = -ss/s2r - L.cos(q)*L.cos(qp)/2
    W = r**3*D; W_q = 3*r*r*r_q*D + r**3*D_q; W_qp = 3*r*r*r_qp*D + r**3*D_qp; W_vp = r**3*D_vp
    return {"h": N/W, "h_q": (N_q*W - N*W_q)/(W*W), "h_qp": (N_qp*W - N*W_qp)/(W*W), "h_vp": -N*W_vp/(W*W), "r": r, "r_q": r_q, "D": D}
def dh_dt(q, qdot, qp, vp, app, c, L=iv, dsign=1):
    k = kern(q, qp, vp, c, L, dsign); sdot = (1 - k["r_q"]*qdot)/k["D"]
    return k["h_q"]*qdot + (k["h_qp"]*vp + k["h_vp"]*app)*sdot
out = {"controls": []}
# ---------------- controls (40 digits) ----------------
mp.dps = 40
s1 = mp.mpf(1); c0, c1, c2, c2b = mp.mpf(0), mp.mpf("0.05"), mp.mpf("0.05"), mp.mpf("0.07"); h1 = c0 + c1*s1 + c2*s1*s1; v1 = c1 + 2*c2*s1
def hist(s):
    if s <= s1: return c0 + c1*s + c2*s*s, c1 + 2*c2*s, 2*c2
    u = s - s1; return h1 + v1*u + c2b*u*u, v1 + 2*c2b*u, 2*c2b
def tau_of(t, c):
    a, b = mp.mpf("0.5"), mp.mpf("2.5")
    for _ in range(220):
        m = (a + b)/2
        if m - kern(hist(t)[0], hist(t - m)[0], 0, c, mp)["r"] < 0: a = m
        else: b = m
    return (a + b)/2
def h_model(t, c):
    s = t - tau_of(t, c); return kern(hist(t)[0], hist(s)[0], hist(s)[1], c, mp)["h"]
def closed(t, c, wrong_acc=False, dsign=1):
    s = t - tau_of(t, c); qs, vs, as_ = hist(s)
    if wrong_acc: as_ = 2*c2
    return dh_dt(hist(t)[0], hist(t)[1], qs, vs, as_, c, mp, dsign), s
gm = mp.mpf(1)/10; hh = mp.mpf("1e-7"); kdet = {}; okK = True
for tK in (mp.mpf("2.4"), mp.mpf("2.7")):
    tot_c = 0; tot_f = 0; row = {"q": mp.nstr(hist(tK)[0], 8), "qdot": mp.nstr(hist(tK)[1], 8)}
    for c in (1, -1, 0):
        cf, s = closed(tK, c); f1 = (h_model(tK + hh, c) - h_model(tK - hh, c))/(2*hh); f2 = (h_model(tK + 2*hh, c) - h_model(tK - 2*hh, c))/(4*hh); fd = (4*f1 - f2)/3
        e = abs(cf - fd); okK = okK and e < mp.mpf("1e-12"); tot_c += MULT[c]*gm*cf; tot_f += MULT[c]*gm*fd
        row[NAME[c]] = {"delayed_arg": mp.nstr(s, 8), "beyond_seam": bool(s > s1), "closed": mp.nstr(cf, 22), "fd": mp.nstr(fd, 22), "abs_err": mp.nstr(e, 5)}
    row["total_closed"] = mp.nstr(tot_c, 22); row["total_fd"] = mp.nstr(tot_f, 22); kdet[mp.nstr(tK, 3)] = row
out["controls"].append({"name": "(K) exact known: dh_c/dt for each class and d(qddot)/dt closed forms vs Richardson differences on a prescribed history with a generated segment (acceleration jump at s1 = 1), expanded domain, t = 2.4 and 2.7", "detail": kdet, "pass": bool(okK)})
cfU, _ = closed(mp.mpf("2.4"), 1); cwU, _ = closed(mp.mpf("2.4"), 1, wrong_acc=True); cvU, _ = closed(mp.mpf("2.4"), 1, dsign=-1)
out["controls"].append({"name": "(W1) negative: the pre-seam acceleration used for the unlike source beyond the seam at t = 2.4 changes dh_U/dt by more than 1e-6", "correct": mp.nstr(cfU, 18), "wrong": mp.nstr(cwU, 18), "pass": bool(abs(cfU - cwU) > mp.mpf("1e-6"))})
out["controls"].append({"name": "(W2) negative: the velocity sign flipped in D_U changes dh_U/dt by more than 1e-4", "correct": mp.nstr(cfU, 18), "wrong": mp.nstr(cvU, 18), "pass": bool(abs(cfU - cvU) > mp.mpf("1e-4"))})
out["controls_all_pass"] = all(c["pass"] for c in out["controls"]); print(json.dumps(out["controls"]), flush=True)
mp.dps = 30; iv.dps = 30
# ---------------- target ----------------
sg = lambda x: "negative" if up(x) < 0 else ("positive" if lo(x) > 0 else "spans zero (undecided)")
files = [(n, EV + "spherical-six-pole-late-feedback-claude-continuation-steps4-iv-N4000-%s.json" % n) for n in LFN] + [(n, EV + "spherical-six-pole-like-reception-claude-continuation-steps6-iv-N4000-%s.json" % n) for n in ("s1a2", "s1b2", "s2a3", "s2b2", "s3a", "s3b")]
rows = []
for tag, f in files:
    d = json.load(open(f))
    for st in d["steps"]:
        if not st.get("certified"): rows.append({"step": st["step"], "uncertified": True}); continue
        S = iv_of(st["S"]); VS = iv_of(st["VS"]); qe = iv_of(st["end_q_str"]); ve = iv_of(st["end_v_str"]); rec = {"step": st["step"], "file": tag, "t_int": st["t_int"], "t_end": [s45(mp.mpf(st["t_int"][0]) + mp.mpf("0.01")), st["t_int"][1]], "cls": {}, "source": {}}
        tot = ZERO; tot_e = ZERO; refused = False
        for name, c in (("unlike", 1), ("like", -1), ("antipode", 0)):
            cl = st["classes"][name]; ss = source_state(iv_of(cl["delayed_arg_range"]), iv_of(cl["history_q_range"]), iv_of(cl["history_qdot_range"]))
            if ss is None: refused = True; break
            qp, vp, app, note = ss; x = MULT[c]*g*dh_dt(S, VS, qp, vp, app, c); xe = MULT[c]*g*dh_dt(qe, ve, qp, vp, app, c)
            rec["cls"][name] = {"range": J(x), "sign": sg(x), "end": J(xe), "end_sign": sg(xe)}; rec["source"][name] = note[:40]; tot = tot + x; tot_e = tot_e + xe
        if refused: rows.append({"step": st["step"], "refused": True}); continue
        rec["dqddot_dt_range"] = J(tot); rec["sign"] = sg(tot); rec["dqddot_dt_end"] = J(tot_e); rec["end_sign"] = sg(tot_e)
        if "ap" in st:
            ap = iv_of(st["ap"]); rec["cont_ap"] = st["ap"]; rec["meets_cont_ap"] = bool(max(lo(ap), lo(tot)) <= min(up(ap), up(tot)))
        rows.append(rec)
out["target"] = rows
def summary(key_fn, label):
    good = [r for r in rows if "sign" in r]; pos = [r["step"] for r in good if key_fn(r) == "positive"]; neg = [r["step"] for r in good if key_fn(r) == "negative"]; und = [r["step"] for r in good if key_fn(r) not in ("positive", "negative")]
    return {"label": label, "positive_steps": pos, "negative_steps": neg, "undecided_steps": und}
out["summary"] = {"total_range": summary(lambda r: r["sign"], "d(qddot)/dt whole step"), "total_end": summary(lambda r: r["end_sign"], "d(qddot)/dt step end")}
for n in ("unlike", "like", "antipode"):
    out["summary"][n + "_range"] = summary(lambda r, n=n: r["cls"][n]["sign"], n + " whole step"); out["summary"][n + "_end"] = summary(lambda r, n=n: r["cls"][n]["end_sign"], n + " step end")
out["summary"]["meets_cont_ap"] = {"n": sum(1 for r in rows if "meets_cont_ap" in r), "fail": [r["step"] for r in rows if r.get("meets_cont_ap") is False]}
def comp(lst):
    if not lst: return "none"
    runs = []; a = lst[0]; b = lst[0]
    for x in lst[1:]:
        if x == b + 1: b = x
        else: runs.append((a, b)); a = b = x
    runs.append((a, b)); return ", ".join(("%d" % a) if a == b else ("%d-%d" % (a, b)) for a, b in runs)
for k, v in out["summary"].items():
    if "label" in v: print(k, "| positive:", comp(v["positive_steps"]), "| negative:", comp(v["negative_steps"]), "| undecided:", comp(v["undecided_steps"]), flush=True)
    else: print(k, v, flush=True)
for r in rows:
    if r.get("step") in (22, 40, 60, 70, 71, 79, 80, 86, 90, 94, 95, 100, 104, 105, 110, 114, 115, 116, 120, 124, 130, 134, 140, 144, 145, 146, 150, 154) and "sign" in r:
        print(r["step"], r["t_end"][1][:9], "tot", r["dqddot_dt_range"][0][:9], r["dqddot_dt_range"][1][:9], r["sign"][:4], "end", r["dqddot_dt_end"][0][:9], r["dqddot_dt_end"][1][:9], r["end_sign"][:4], "| U", r["cls"]["unlike"]["range"][0][:9], r["cls"]["unlike"]["range"][1][:9], r["cls"]["unlike"]["sign"][:4], "end", r["cls"]["unlike"]["end"][0][:9], r["cls"]["unlike"]["end"][1][:9], r["cls"]["unlike"]["end_sign"][:4], "| L", r["cls"]["like"]["range"][0][:9], r["cls"]["like"]["range"][1][:9], r["cls"]["like"]["sign"][:4], "| A", r["cls"]["antipode"]["range"][0][:9], r["cls"]["antipode"]["range"][1][:9], r["cls"]["antipode"]["sign"][:4], "| ap", r.get("cont_ap", ["", ""])[0][:9], r.get("cont_ap", ["", ""])[1][:9], r.get("meets_cont_ap"), "| srcU", r["source"]["unlike"][:24], flush=True)
json.dump(out, open(OUTFILE, "w"), indent=1)
