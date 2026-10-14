# Support role reporting helper (not an instrument: reads this role's slice5 output JSON and prints a digest; no new enclosure is computed).
# usage: <this> <slice5 out.json> <step,step,...>
import os, sys, json
print("PID", os.getpid(), flush=True)
d = json.load(open(sys.argv[1])); detail = [int(x) for x in sys.argv[2].split(",")] if len(sys.argv) > 2 else []
print("controls_all_pass", d["controls_all_pass"], "chain", d["chain"], "appended", d.get("appended"))
for tg in d["targets"]:
    rows = [r for r in tg["rows"] if "qddot_range" in r]; bad = [r for r in tg["rows"] if "qddot_range" not in r]
    print("FILE", tg["file"].split("claude-")[-1], "rows", len(rows), "not evaluated", [(r["step"], r.get("refused", "uncertified")) for r in bad])
    cmpc = {}; fam = {}
    for r in rows:
        for n in ("unlike", "like", "antipode"):
            e = r["cls"][n]
            for k in e:
                if k.startswith("vs_"):
                    for kk, v in e[k].items():
                        c = cmpc.setdefault(n + ":" + k + ":" + kk, {"n": 0, "meets": 0, "mine_inside": 0, "cont_inside": 0}); c["n"] += 1; c["meets"] += v["meets"]; c["mine_inside"] += v["mine_inside_cont"]; c["cont_inside"] += v["cont_inside_mine"]
            fam.setdefault(n, set()).update(t.split("#")[0] for t in e["touched"])
    print("COMPARE consumed objects:", json.dumps(cmpc)); print("FAMILIES", {k: sorted(v) for k, v in fam.items()})
    print("inside_new_box all:", all(r["inside_new_box"] for r in rows), " meets_cont flags all:", all(v for r in rows for k, v in r.items() if k.startswith("meets_cont_")), sorted(set(k for r in rows for k in r if k.startswith("meets_cont_"))))
    print("empty intersections:", [(r["step"], n, r["cls"][n]["empty_intersections"]) for r in rows for n in r["cls"] if r["cls"][n]["empty_intersections"]])
    print("root checks not enclosing:", [(r["step"], n, r["cls"][n]["own_root_check_at_end"]) for r in rows for n in r["cls"] if r["cls"][n]["own_root_check_at_end"]["lower"].startswith(("neg", "ref")) or r["cls"][n]["own_root_check_at_end"]["upper"].startswith(("pos", "ref"))])
    def hullk(key): return [min(r[key][0] for r in rows if True) if False else min((r[key][0] for r in rows), key=float), max((r[key][1] for r in rows), key=float)]
    for key in ("qddot_range", "dqddot_dt_range", "a_rad_range", "lambda_hat_range", "dlambda_dt_range", "VS"): print("HULL", key, hullk(key))
    for n in ("unlike", "like", "antipode"):
        print("CLASS", n, "tan hull", [min((r["cls"][n]["tan"][0] for r in rows), key=float), max((r["cls"][n]["tan"][1] for r in rows), key=float)], "dtan hull", [min((r["cls"][n]["dtan_dt"][0] for r in rows), key=float), max((r["cls"][n]["dtan_dt"][1] for r in rows), key=float)], "D hull", [min((r["cls"][n]["D_t"][0] for r in rows), key=float), max((r["cls"][n]["D_t"][1] for r in rows), key=float)],
              "D_side", sorted(set(r["cls"][n]["D_side"] for r in rows)), "M", sorted(set(r["cls"][n]["M_sign"] for r in rows)), "N steps", {s: [r["step"] for r in rows if r["cls"][n]["N_sign"] == s][:1] + [r["step"] for r in rows if r["cls"][n]["N_sign"] == s][-1:] for s in sorted(set(r["cls"][n]["N_sign"] for r in rows))}, "dtan signs", {s: [r["step"] for r in rows if r["cls"][n]["dtan_sign"] == s][:1] + [r["step"] for r in rows if r["cls"][n]["dtan_sign"] == s][-1:] for s in sorted(set(r["cls"][n]["dtan_sign"] for r in rows))},
              "min margin to coverage", min((r["cls"][n]["margin_to_guaranteed_coverage"] for r in rows), key=float), "chord hull", [min((r["cls"][n]["chord"][0] for r in rows), key=float), max((r["cls"][n]["chord"][1] for r in rows), key=float)])
    for r in rows:
        if r["step"] in detail:
            print("STEP", r["step"], "t_end", r["t_end"], "q_end", r["q_end"], "qdot_end", r["qdot_end"]); print("  qddot_end", r["qddot_end"], r["qddot_end_sign"], "qddot_range", r["qddot_range"], "rate", r["dqddot_dt_range"], r["dqddot_sign"], "rate_end_sign", r["dqddot_end_sign"])
            print("  a_rad_end", r["a_rad_end"], "lambda_end", r["lambda_hat_end"], r["lambda_end_sign"], "dlambda", r["dlambda_dt_range"], r["dlambda_sign"], "end", r["dlambda_end_sign"])
            for n in ("unlike", "like", "antipode"):
                e = r["cls"][n]; print("  ", n, "tan_end", e["tan_end"], e["tan_end_sign"], "rad_end", e["rad_end"], "D_end", e["D_end"], e["D_end_side"], "dtan", e["dtan_dt"], e["dtan_sign"], "| src", e["delayed_arg"], e["source_vs_L"], "age", e["age_range"], "touched", e["touched"], "N_end", e["N_end_sign"], "M", e["M_sign"], "| q'", e["q"], "v'", e["qdot"], "a'", e["qddot"])
            print("  residuals", {k: (v["rho"], v["sign"]) for k, v in r["residuals"].items()})
print("CERT", json.dumps(d.get("event_certificates"), indent=0))
