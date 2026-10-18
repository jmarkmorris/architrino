# Correlated-continuation campaign, support role (emmy-noether): this role's OWN 486-record admitted chain, verified, before any Phase B target.
# Executes the frozen turning-point slice6-iv.py (6f1de0ee...): the 264-chain controls (L1-L6, N1-N9, E1-E8), the 324-chain controls (M4, M6, M7) and the
# detector controls (E9-E17). Then appends, in order and only as the next consecutive certified step, the 162 accepted records of steps 275-436 from
# p1-p4, v3b-p5..p7, v3c1-q1, q2 (allow-list by file), and runs: (R4) all 485 joins (polynomial end box of record k meets the start strings and a0 of record
# k+1; both uncertain start-time endpoints step by Delta); (R6) self-append: source time 5.0 refused with 324 records, answered with 486; a request at the
# guaranteed end of step 436 meets its end strings; the chain end equals the campaign restart strings exactly; (R7) negatives: gap (step 420 removed),
# uncertified (step 430 flagged), unaccepted (q2 records off the allow-list), beyond the guaranteed end of step 436, read into its uncertain end.
# Run: OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -l perl -e 'alarm 110; exec @ARGV' -- ../.venv/bin/python -I <this file> <out.json>
import os, sys, json, time
print("PID", os.getpid(), flush=True)
EVR = "reference/priorities/master-equation-closure/noether-sea-research/evidence/"
OUTR = sys.argv[1]; _ar = sys.argv; sys.argv = [_ar[0], OUTR + ".slice6-controls.json"]
exec(open(EVR + "spherical-six-pole-turning-point-claude-support-slice6-iv.py").read())
sys.argv = _ar; assert out6["controls_all_pass"] and len(SLABS) == 324
outR = {"controls": [], "slice6_controls_all_pass": True}; SL324 = SLABS
C = EVR + "spherical-six-pole-turning-point-claude-continuation-steps9-iv-"
FILES = [C + "N4000-p1.json", C + "N4000-p2.json", C + "N4000-p3.json", C + "N4000-p4.json", C + "v3b-N4000-p5.json", C + "v3b-N4000-p6.json", C + "v3b-N4000-p7.json", C + "v3c1-N4000-q1.json", C + "v3c1-N4000-q2.json"]
raw = []; last = 274; skipped = []
for f in FILES:
    for st in json.load(open(f))["steps"]:
        if st.get("certified") and st["step"] == last + 1: raw.append(("sm", st)); last = st["step"]
        else: skipped.append([f.split("iv-")[-1], st["step"], bool(st.get("certified"))])
LAWX = [rec_boxes(s, "sm") for _, s in raw]; SL = make_slabs(ALLRAW6 + raw, ALLLAW6 + LAWX, QT, VT); bad, maxw = joins(SL)
outR["controls"].append({"name": "(R4) known, REAL records: 486-record chain, all 485 joins (polynomial end box meets next start strings and a0; both uncertain start-time endpoints step by Delta); appended steps 275..436 consecutive and certified", "n_records": len(SL), "appended": len(raw), "skipped_entries": skipped, "failures": bad[:5], "max_poly_end_q_width": mp.nstr(maxw, 5),
    "pass": bool(not bad and len(SL) == 486 and [s["step"] for s in SL[324:]] == list(range(275, 437)))})
t436 = I(lo(SL[-1]["T"]) + DELTA, up(SL[-1]["T"]) + DELTA)
END = {"t": ["6.226684593623649597167969", "6.226684709182828044891357"], "q": ["1.592721688242382609626022", "1.617964591601622245972285"], "w": ["0.2703088004357569579439419", "0.30158608323792367059605"]}
ok_end = bool(lo(SL[-1]["Qe"]) == mp.mpf(END["q"][0]) and up(SL[-1]["Qe"]) == mp.mpf(END["q"][1]) and lo(SL[-1]["Ve"]) == mp.mpf(END["w"][0]) and up(SL[-1]["Ve"]) == mp.mpf(END["w"][1]) and abs(lo(t436) - mp.mpf(END["t"][0])) < mp.mpf("1e-22") and abs(up(t436) - mp.mpf(END["t"][1])) < mp.mpf("1e-22"))
ra, wa = lookup(I(mp.mpf("5.0"), mp.mpf("5.0")), SL324); rb, _ = lookup(I(mp.mpf("5.0"), mp.mpf("5.0")), SL); rc, _ = lookup(I(lo(t436), lo(t436)), SL)
outR["controls"].append({"name": "(R6) known, self-append: source time 5.0 refused with 324 records and answered with 486; a request at the guaranteed end of step 436 meets its end strings; the chain end equals the campaign restart strings exactly", "refusal": wa, "end_matches_restart": ok_end, "pass": bool(ra is None and rb is not None and rc is not None and meets(rc[0], SL[-1]["Qe"]) and meets(rc[1], SL[-1]["Ve"]) and ok_end)})
neg = {}
g_ = [s for s in SL if not (s["src"] == "sm" and s["step"] == 420)]; r_, w_ = lookup(I(mp.mpf("6.052"), mp.mpf("6.072")), g_); neg["gap (step 420 removed) refused"] = bool(r_ is None); neg["gap reason"] = w_
u_ = [dict(s, certified=(False if (s["src"] == "sm" and s["step"] == 430) else s["certified"])) for s in SL]; r_, w_ = lookup(I(mp.mpf("6.160"), mp.mpf("6.170")), u_); neg["uncertified (step 430 flagged) refused"] = bool(r_ is None); neg["uncertified reason"] = w_
x_ = [dict(s, certified=(False if (s["src"] == "sm" and s["step"] >= 427) else s["certified"])) for s in SL]; r_, w_ = lookup(I(mp.mpf("6.18"), mp.mpf("6.18")), x_); neg["unaccepted (q2 records off the allow-list) refused"] = bool(r_ is None); neg["unaccepted reason"] = w_
r_, _ = lookup(I(lo(t436) - mp.mpf("0.001"), lo(t436) + mp.mpf("0.001")), SL); neg["beyond the guaranteed end of step 436 refused"] = bool(r_ is None)
r_, _ = lookup(I(up(t436), up(t436)), SL); r2_, _ = lookup(I(lo(t436) + mp.mpf("1e-9"), lo(t436) + mp.mpf("1e-9")), SL); neg["read into the uncertain end of step 436 refused"] = bool(r_ is None and r2_ is None)
outR["controls"].append({"name": "(R7) negatives on the 486-record chain", "detail": neg, "pass": bool(all(v for k, v in neg.items() if not k.endswith("reason")))})
outR["controls_all_pass"] = all(c["pass"] for c in outR["controls"]); outR["chain"] = {"records": len(SL), "guaranteed_end": s45(lo(t436)), "possible_end": s45(up(t436))}
print(json.dumps(outR, indent=0)[:3000], flush=True); json.dump(outR, open(OUTR, "w"), indent=1)
