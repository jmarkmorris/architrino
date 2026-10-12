# Stage B, support role (emmy-noether): three-radius tabulation from this role's own saved enclosures and the cells' end strings.
# (a) like-reading bracket per cell from this role's own residual sqrt(2 + sqrt2 sin q_end) - t_end at certified step ends (strictly decreasing sub-wake);
# (b) lambda_hat at matched dimensionless times: the whole-step enclosure (this role's saved lambda_hat ranges) of the certified step(s) whose t_int
#     contains the time (hull if two steps share the boundary); rigorous without any monotonicity assumption; None beyond a cell's attained interval.
# Controls before targets: (K1) known: at R = 10 the like residual changes sign across wave-17 step 1, bracketing the frozen t_like in [1.46704, 1.46775];
# (K2) known: the R = 10 lookup at t = 1.9467 (inside the frozen zero bracket) returns a range containing zero; (W1) negative: the unlike chord used for
# the like residual is already negative at the wave-17 start (wrong class detected); (W2) negative: a lookup beyond the attained R = 8 interval returns None.
# Run: OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -l perl -e 'alarm 30; exec @ARGV' -- ../.venv/bin/python -I <this file> <out.json>
import os, sys, json
print("PID", os.getpid(), flush=True)
from mpmath import iv, mp
iv.dps = 30; mp.dps = 30
E = "reference/priorities/master-equation-closure/noether-sea-research/evidence/"
def I(p): return iv.mpf([p[0], p[1]])
def J(x): return [mp.nstr(mp.mpf(x.a), 25), mp.nstr(mp.mpf(x.b), 25)]
S2 = iv.sqrt(iv.mpf(2))
def like_res(q, t, sg=-1): return iv.sqrt(2 - sg*S2*iv.sin(q)) - t      # sg = -1 like chord sqrt(2 + sqrt2 sin q); +1 unlike (negative control)
def steps_of(files): 
    out = []
    for f in files: out += json.load(open(E + f))["steps"]
    return out
def like_bracket(steps, start_t, start_q, sg=-1):
    prev_t = start_t; prev = like_res(I(start_q), I(start_t), sg); first = prev
    for s in steps:
        te = iv.mpf([mp.mpf(s["t_int"][0]) + mp.mpf("0.01"), s["t_int"][1]]); r = like_res(I(s["end_q_str"]), te, sg)
        if mp.mpf(prev.a) > 0 and mp.mpf(r.b) < 0: return {"t_lo": prev_t[1] if isinstance(prev_t, list) else str(prev_t), "t_hi": s["t_int"][1], "step": s["step"], "res_before": J(prev), "res_after": J(r), "start_res": J(first)}
        prev = r; prev_t = [s["t_int"][0], s["t_int"][1]]
    return {"none": True, "start_res": J(first)}
def lam_table(sources):
    rows = []
    for f, key, sub in sources:
        d = json.load(open(E + f)); recs = d["steps"] if sub is None else d["target"]["records"]
        for r in recs:
            if key in r and "t_int" in r: rows.append((mp.mpf(r["t_int"][0]), mp.mpf(r["t_int"][1]), I(r[key])))
    return rows
def lookup(rows, t):
    t = mp.mpf(t); hit = [x for (a, b, x) in rows if a <= t <= b]
    if not hit: return None
    lo = min(mp.mpf(x.a) for x in hit); hi = max(mp.mpf(x.b) for x in hit); return iv.mpf([lo, hi])
out = {"controls": []}
W17 = json.load(open(E + "spherical-curvature-claude-coverage-wave17-sixpole-steps2-iv-N4000-full.json"))
b10 = like_bracket(W17["steps"], W17["start"]["t0"], W17["start"]["q0"])
okK1 = "none" not in b10 and mp.mpf(b10["t_lo"]) <= mp.mpf("1.46704") and mp.mpf(b10["t_hi"]) >= mp.mpf("1.46775") and b10["step"] == 1
out["controls"].append({"name": "(K1) known: R = 10 like residual changes sign across wave-17 step 1, bracketing the frozen t_like in [1.46704, 1.46775]", "pass": bool(okK1), "bracket": b10})
R10 = lam_table([("spherical-six-pole-antipodal-claude-support-geometry-iv.json", "lambda_hat", None), ("spherical-six-pole-antipodal-claude-support-steps-iv-N4000a.json", "lambda_hat_range", 1), ("spherical-six-pole-antipodal-claude-support-steps-iv-N4000b3.json", "lambda_hat_range", 1)]
                + [("spherical-six-pole-late-feedback-claude-support-slice-iv-N4000-%s.json" % s, "lambda_hat_range", 1) for s in ("s1a2", "s1b", "s2a", "s2b3")] + [("spherical-six-pole-late-feedback-claude-support-slice2-iv-N4000-%s.json" % s, "lambda_hat_range", 1) for s in ("s3a", "s3b2", "s3c", "s3d")])
R8 = lam_table([("spherical-six-pole-late-feedback-claude-support-stageB-slice-iv-v2-R8-%s.json" % s, "lambda_hat_range", 1) for s in ("a2", "b", "c", "d")])
R12 = lam_table([("spherical-six-pole-late-feedback-claude-support-stageB-slice-iv-v2-R12-%s.json" % s, "lambda_hat_range", 1) for s in ("a", "b", "c", "d", "e")])
z = lookup(R10, "1.9467"); okK2 = z is not None and mp.mpf(z.a) < 0 < mp.mpf(z.b)
out["controls"].append({"name": "(K2) known: R = 10 lookup at t = 1.9467 (inside the frozen zero bracket) returns a range containing zero", "pass": bool(okK2), "range": J(z) if z is not None else None})
wr = like_res(I(W17["start"]["q0"]), I(W17["start"]["t0"]), +1); okW1 = mp.mpf(wr.b) < 0
out["controls"].append({"name": "(W1) negative: the unlike chord used for the like residual is already negative at the wave-17 start (wrong class detected)", "pass": bool(okW1), "res": J(wr)})
okW2 = lookup(R8, "2.2") is None
out["controls"].append({"name": "(W2) negative: a lookup beyond the attained R = 8 interval (t = 2.2) returns None", "pass": bool(okW2)})
out["controls_all_pass"] = all(c["pass"] for c in out["controls"]); print(json.dumps(out["controls"]), flush=True)
cells = {}
for Rn, files in ((8, ["a2", "b", "c", "d"]), (12, ["a", "b", "c", "d", "e"])):
    c0 = json.load(open(E + "spherical-six-pole-late-feedback-claude-continuation-stageB-steps5-iv-R%d-%s.json" % (Rn, files[0])))
    st = steps_of(["spherical-six-pole-late-feedback-claude-continuation-stageB-steps5-iv-R%d-%s.json" % (Rn, f) for f in files])
    cells[str(Rn)] = {"T_star": c0["window"]["T_star"], "q_at_T_star": c0["window"]["q_at_T_star"], "qdot_at_T_star": c0["window"]["qdot_at_T_star"], "like_reading": like_bracket(st, c0["start"]["t0"], c0["start"]["q0"])}
out["cells"] = cells
tab = {}
for t in ("1.4", "1.6", "1.8", "2.0", "2.2"):
    tab[t] = {}
    for name, rows, Rn in (("R8", R8, 8), ("R10", R10, 10), ("R12", R12, 12)):
        x = lookup(rows, t); tab[t][name] = None if x is None else {"lambda_hat": J(x), "physical_lambda": J(x/Rn), "physical_T": mp.nstr(mp.mpf(t)*Rn, 6)}
out["lambda_hat_at_matched_times"] = tab
print(json.dumps(cells, indent=0)[:1500], flush=True)
for t in tab: print(t, {k: (None if v is None else [v["lambda_hat"][0][:10], v["lambda_hat"][1][:10]]) for k, v in tab[t].items()}, flush=True)
json.dump(out, open(sys.argv[1], "w"), indent=1)
