"""Serial task 7: identity join and reconciliation of the released-balance counts, and per-record tables.

Reads only. Inputs, each pinned by SHA-256 in the output: the retained named-release records release-<name>.json
of geometry-session-20261005 (five balances below wake speed), the three first census files, the three
census-rates files of geometry-session-20261006, and the fresh replay results written by
serial-release-hypothesis-replay-2026-10-11.py.

A record's identity key is (balance source file, balance index, seed, amplitude, steps per period). Its
preparation key drops the steps per period: the same balance, kick seed and kick amplitude is one preparation,
whatever instrument or resolution ran it. Distinct amplitudes and distinct resolutions are never merged.

Known cases of the join run first: a record joins to itself; a planted duplicate key is reported; a planted
missing key is reported; a record whose steps per period is altered does not join; and the frozen table's
kick counts (6, 6, 6, 3, 3) and time ranges are parsed from literals written here and compared with the
retained records by rule, including a planted wrong range that must fail.
Usage: python <this> <replay runs dir> <output dir>
"""
import hashlib
import json
import pathlib
import sys

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[4]
G5 = ROOT / ".local-data/master-equation-closure/geometry-session-20261005"
G6 = ROOT / ".local-data/master-equation-closure/geometry-session-20261006"
SRC = {"travel3": ("results/0151.json", 0), "planar6": ("results/0022.json", 0), "travel6": ("results/0090.json", 0), "mirror7": ("results/0199.json", 0), "travel8": ("results/0152.json", 0)}
LABEL = {"travel3": "Travelling three-member", "planar6": "Planar six-member", "travel6": "Travelling six-member", "mirror7": "Three-dimensional seven-member", "travel8": "Travelling eight-member"}
BASE = {"travel3": 2000, "planar6": 1500, "travel6": 1500, "mirror7": 1500, "travel8": 1500}
# Frozen release analysis, table "Kicks of size 1e-4" and "Time, in periods", rows of the five balances below wake speed.
FROZEN_TABLE = {"travel3": (6, "0.50", "0.57"), "planar6": (6, "0.78", "1.37"), "travel6": (6, "1.00", "1.27"), "mirror7": (3, "0.32", "0.33"), "travel8": (3, "0.16", "0.17")}
sha = lambda p: hashlib.sha256(pathlib.Path(p).read_bytes()).hexdigest()
ident = lambda r: (r["file"], r["idx"], r["seed"], float(r["amp"]), r["hdiv"])
prep = lambda r: (r["file"], r["idx"], r["seed"], float(r["amp"]))


def join(left, right):
    """left, right: lists of records carrying file, idx, seed, amp, hdiv. Returns matches, duplicates, missing."""
    dup = sorted(set(k for k in map(ident, right) if list(map(ident, right)).count(k) > 1))
    index = {ident(r): r for r in right}
    matched = [(l, index[ident(l)]) for l in left if ident(l) in index]
    missing = [ident(l) for l in left if ident(l) not in index]
    return matched, dup, missing


def range_ok(times, lo, hi, places=2):
    return ("%.*f" % (places, min(times))) == lo and ("%.*f" % (places, max(times))) == hi


def named_records():
    out = []
    for name, (f, k) in SRC.items():
        for i, r in enumerate(json.load(open(G5 / ("release-%s.json" % name)))):
            assert r["name"] == name
            out.append(dict(r, file=f, idx=k, record="release-%s.json#%d" % (name, i)))
    return out


known = {}
a = dict(file="x", idx=0, seed=1, amp=1e-4, hdiv=1500)
m, d, miss = join([a], [dict(a)])
known["positive: a record joins to itself"] = len(m) == 1 and not d and not miss
m, d, miss = join([a], [dict(a), dict(a)])
known["duplicate: a planted duplicate key is reported"] = d == [ident(a)]
m, d, miss = join([a, dict(a, seed=9)], [dict(a)])
known["missing: a planted missing key is reported"] = miss == [ident(dict(a, seed=9))]
m, d, miss = join([a], [dict(a, hdiv=3000)])
known["mismatched setting: a record with altered steps per period does not join"] = not m and miss == [ident(a)]
m, d, miss = join([a], [dict(a, amp=1e-6)])
known["mismatched setting: a record with altered amplitude does not join"] = not m and miss == [ident(a)]
known["range rule: rounding of the extremes to two places, with a planted wrong range failing"] = range_ok([0.497, 0.5665], "0.50", "0.57") and not range_ok([0.497, 0.5665], "0.50", "0.58")
out = {"known": {k: bool(v) for k, v in known.items()}}
out["known_result"] = "PASS" if all(out["known"].values()) else "FAIL"
print(json.dumps({"known_result": out["known_result"]}), file=sys.stderr, flush=True)

if out["known_result"] == "PASS" and len(sys.argv) > 2:
    runs_dir, out_dir = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2])
    named = named_records()
    pins = {str(p.relative_to(ROOT)): sha(p) for p in [G5 / ("release-%s.json" % n) for n in SRC] + [G5 / "release-census.json", G5 / "release-census2.json", G5 / "release-census3.json", G6 / "census-rates.json", G6 / "census-rates2.json", G6 / "census-rates3.json", G5 / "release.py", G5 / "release_many.py", G6 / "census_rates.py"]}
    out["input_sha256"] = pins
    # ---- the frozen table against the retained records
    tab = {}
    selected = []
    for name, (kicks, lo, hi) in FROZEN_TABLE.items():
        recs = [r for r in named if r["name"] == name]
        base = [r for r in recs if float(r["amp"]) == 1e-4 and r["hdiv"] == BASE[name]]
        half = [r for r in recs if float(r["amp"]) == 1e-4 and r["hdiv"] == 2 * BASE[name]]
        other = [r for r in recs if float(r["amp"]) != 1e-4]
        tab[name] = dict(retained_records=len(recs), base_step_amp_1e4=len(base), half_step_repeats=len(half), other_amplitude=len(other), frozen_kicks=kicks, kick_count_matches=len(base) == kicks,
                         seeds=sorted(r["seed"] for r in base), all_wake=all(r["event"] == "wake" for r in recs), frozen_range=[lo, hi], base_range=[min(r["t_over_P"] for r in base), max(r["t_over_P"] for r in base)],
                         base_range_matches_frozen=range_ok([r["t_over_P"] for r in base], lo, hi), range_with_other_amplitudes_matches_frozen=range_ok([r["t_over_P"] for r in base + other], lo, hi),
                         other_amplitude_times=[r["t_over_P"] for r in other])
        selected += sorted(base, key=lambda r: r["seed"])
    out["frozen_table_check"] = tab
    out["selected_count"] = len(selected)
    all_named_times = [r["t_over_P"] for r in named]
    # ---- census reconciliation
    c1 = sum((json.load(open(G5 / f)) for f in ("release-census.json", "release-census2.json", "release-census3.json")), [])
    r1 = json.load(open(G6 / "census-rates.json"))
    r2 = json.load(open(G6 / "census-rates2.json"))
    r3 = json.load(open(G6 / "census-rates3.json"))
    ck = lambda r: (r["file"], r["idx"], r["seed"])
    below1 = [r for r in c1 if r.get("vmax0") is not None and r["vmax0"] < 1.0]
    rec = dict(first_census_records=len(c1), first_census_below_wake=len(below1), first_census_below_wake_events={e: sum(1 for r in below1 if r["event"] == e) for e in sorted(set(r["event"] for r in below1))},
               first_census_below_wake_balances=len(set((r["file"], r["idx"]) for r in below1)), rates_first=len(r1), rates_first_unique=len(set(map(ck, r1))), rates_first_balances=len(set((r["file"], r["idx"]) for r in r1)),
               rates_first_events={e: sum(1 for r in r1 if r["event"] == e) for e in sorted(set(r["event"] for r in r1))}, rates_first_with_rate_and_Dmin=sum(1 for r in r1 if "rate1" in r and "Dmin" in r),
               rates_first_keys_equal_first_census_below_wake=sorted(map(ck, r1)) == sorted(map(ck, below1)),
               rates_second=len(r2) + len(r3), rates_second_unique=len(set(map(ck, r2 + r3))), rates_second_balances=len(set((r["file"], r["idx"]) for r in r2 + r3)),
               rates_second_events={e: sum(1 for r in r2 + r3 if r["event"] == e) for e in sorted(set(r["event"] for r in r2 + r3))}, rates_second_wake_with_rate_and_Dmin=sum(1 for r in r2 + r3 if r["event"] == "wake" and "rate1" in r and "Dmin" in r),
               first_census_time_range=[min(r["t_over_P"] for r in below1), max(r["t_over_P"] for r in below1)], rates_first_time_range=[min(r["t_over_P"] for r in r1), max(r["t_over_P"] for r in r1)],
               named_time_range_all_35=[min(all_named_times), max(all_named_times)], named_time_range_selected_24=[min(r["t_over_P"] for r in selected), max(r["t_over_P"] for r in selected)])
    rec["runs_total"] = rec["rates_first"] + len(selected) + rec["rates_second"]
    rec["arrivals_total"] = rec["rates_first_events"].get("wake", 0) + len(selected) + rec["rates_second_events"].get("wake", 0)
    rec["arrivals_with_recorded_rate_and_factor"] = rec["rates_first_with_rate_and_Dmin"] + rec["rates_second_wake_with_rate_and_Dmin"]
    rec["arrivals_without"] = rec["arrivals_total"] - rec["arrivals_with_recorded_rate_and_factor"]
    out["reconciliation"] = rec
    # ---- census records of the same preparation as a selected record (same balance, seed, amplitude; other instrument)
    rindex = {ck(r): r for r in r1}
    # ---- replay results
    replays = {}
    for d in sorted(runs_dir.iterdir()):
        if (d / "result.json").exists():
            r = json.load(open(d / "result.json"))
            f, k = SRC[r["name"]]
            replays[(f, k, r["seed"], float(r["amp"]), r["hdiv"])] = dict(r, dir=d.name)
    rj = [dict(file=k[0], idx=k[1], seed=k[2], amp=k[3], hdiv=k[4]) for k in replays]
    m, d, miss = join(named, rj)
    out["replay_join"] = dict(retained_records=len(named), replay_results=len(replays), matched=len(m), duplicates=d, missing=miss, replay_only=sorted(str(k) for k in replays if k not in set(map(ident, named))))
    rows, repro = [], []
    for r in named:
        q = replays.get(ident(r))
        if q is None:
            continue
        P = q["period"]
        repro.append(dict(record=r["record"], same_event=q["event"][0] == r["event"], same_member=q["event"][1] == r["who"], time_difference_over_P=q["event"][2] / P - r["t_over_P"], Dmin_difference=q["Dmin_instrument"] - r["Dmin"],
                          min_pair_difference=q["min_pair_final"] - r["min_pair"], max_final_speed_difference=max(abs(x - y) for x, y in zip(q["final_speeds"], r["final_speeds"])), census0_same=q["census0"] == r["census0"]))
    out["replay_reproduction"] = dict(records=len(repro), all_same_event_and_member=all(x["same_event"] and x["same_member"] for x in repro), max_abs_time_difference_over_P=max(abs(x["time_difference_over_P"]) for x in repro),
                                      max_abs_Dmin_difference=max(abs(x["Dmin_difference"]) for x in repro), max_abs_min_pair_difference=max(abs(x["min_pair_difference"]) for x in repro),
                                      max_final_speed_difference=max(x["max_final_speed_difference"] for x in repro), all_census0_same=all(x["census0_same"] for x in repro), per_record=repro)

    def summary(q):
        A, R, KC = q["arrival"], q["rows_on_arriving_member"], q["kick_crossings"]
        ev = R["at_event_steps"]["step_0"]
        others = [s for i, s in enumerate(q["max_speed_before_event_step"]) if i != A["member"]]
        return dict(dir=q["dir"], hdiv=q["hdiv"], member=A["member"], time_over_P=A["event_time_over_P"], rate_1=A["rate_1"], rate_5=A.get("rate_5"), rate_20=A.get("rate_20"), rate_50=A.get("rate_50"), lower_slope_5=A["sampled_lower_slope_last_5"],
                    lower_slope_20=A["sampled_lower_slope_last_20"], lower_slope_50=A["sampled_lower_slope_last_50"], e_dot_B_minus_1=R["e_dot_B_step_minus_1"], e_dot_B_0=R["e_dot_B_step_0"], max_speed_before=A["max_speed_before_event_step"],
                    sampled_below_one=A["all_sampled_speeds_before_event_step_below_one"], increments_positive=A["speed_increments_last_50_all_positive"], max_other_speed=max(others), min_abs_D_event=min(abs(x["D"]) for x in ev),
                    min_delay_event=min(x["delay"] for x in ev), min_distance_event_over_size=min(x["distance_now"] for x in ev) / q["size"], one_root_per_partner=R["one_root_per_partner_at_every_checked_step"],
                    own_path_sign_changes=q["own_path_scan_step_minus_1"]["sign_changes"], own_path_min_g=q["own_path_scan_step_minus_1"]["min_g"], rigid_past_sources_at_event=KC["sources_still_emitting_from_rigid_past_at_event"], partners=len(ev),
                    nearest_kick_crossing_steps=KC["nearest_crossing_before_event_in_steps"], kick_crossings_last_50=KC["crossings_within_last_50_steps"], min_abs_g_event=KC["min_abs_g_at_event"], max_norm_B=R["max_norm_B_last_20"],
                    last_step_change_B=R["last_step_change_of_B"], max_step_change_B=R["max_step_change_of_B_last_20"], Dmin_run=q["Dmin_instrument"], min_pair_run_over_size=q["min_pair_whole_run"] / q["size"], steps=q["steps"], h=q["h"])
    table = []
    for n, r in enumerate(selected, 1):
        f, k = r["file"], r["idx"]
        base_q = replays.get(ident(r))
        half_key = (f, k, r["seed"], 1e-4, 2 * r["hdiv"])
        half_q = replays.get(half_key)
        half_ret = next((x["record"] for x in named if ident(x) == half_key), None)
        cen = rindex.get((f, k, r["seed"]))
        row = dict(n=n, balance=LABEL[r["name"]], name=r["name"], source="geometry-session-20261004/%s, balance %d" % (f, k), record=r["record"], seed=r["seed"], amp=float(r["amp"]), hdiv=r["hdiv"], event=r["event"], member=r["who"], time_over_P=r["t_over_P"],
                   retained_Dmin=r["Dmin"], retained_min_pair_over_size=r["min_pair"] / r["size"], retained_max_speeds=r["max_speeds"], retained_census0_rowsums=[sum(x) for x in r["census0"]], retained_half_step_record=half_ret,
                   census_same_preparation=(dict(instrument="release3.py, adaptive, 1200 steps per period", member=cen["who"], time_over_P=cen["t_over_P"], rate1=cen.get("rate1"), rate5=cen.get("rate5"), Dmin=cen.get("Dmin")) if cen else None),
                   base=summary(base_q) if base_q else None, half=summary(half_q) if half_q else None)
        if row["base"] and row["half"]:
            b, h2 = row["base"], row["half"]
            row["refinement"] = dict(same_member=b["member"] == h2["member"], time_difference_over_P=h2["time_over_P"] - b["time_over_P"], rate_1_ratio=h2["rate_1"] / b["rate_1"], rate_20_base_over_rate_40_half=None, lower_slope_20_ratio=h2["lower_slope_20"] / b["lower_slope_20"],
                                     e_dot_B_0_ratio=h2["e_dot_B_0"] / b["e_dot_B_0"])
            flags = []
            if not (b["sampled_below_one"] and h2["sampled_below_one"]):
                flags.append("a sampled speed of the arriving member reached one before the event step")
            if min(b["lower_slope_20"], h2["lower_slope_20"], b["e_dot_B_minus_1"], h2["e_dot_B_minus_1"]) <= 0:
                flags.append("a sampled slope or row projection is not positive")
            if not (b["one_root_per_partner"] and h2["one_root_per_partner"]):
                flags.append("root count per partner is not one at a checked step")
            if b["kick_crossings_last_50"] or h2["kick_crossings_last_50"]:
                flags.append("a partner's emission crosses the kick time within the last 50 steps")
            if max(b["max_other_speed"], h2["max_other_speed"]) >= 1:
                flags.append("another member reached wake speed before the event step")
            if not row["refinement"]["same_member"]:
                flags.append("arriving member differs between step sizes")
            row["flags"] = flags
        table.append(row)
    out["selected_records"] = table
    out["extra_retained_records"] = [dict(record=r["record"], seed=r["seed"], amp=float(r["amp"]), hdiv=r["hdiv"], event=r["event"], member=r["who"], time_over_P=r["t_over_P"], replay=(summary(replays[ident(r)]) if ident(r) in replays else None)) for r in named if float(r["amp"]) != 1e-4]
    out_dir.mkdir(parents=True, exist_ok=False)
    g = lambda x, p=3: ("%.*g" % (p, x)) if x is not None else "-"
    with open(out_dir / "tables.md", "x") as fh:
        fh.write("| No. | Balance | Retained record | Seed | Steps per period | Member | Time, periods | Half-step record | Same preparation in the census |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- |\n")
        for r in table:
            c = r["census_same_preparation"]
            fh.write("| %d | %s | `%s` | %d | %d | %d | $%.5f$ | %s | %s |\n" % (r["n"], r["balance"], r["record"], r["seed"], r["hdiv"], r["member"], r["time_over_P"], ("`%s`" % r["retained_half_step_record"]) if r["retained_half_step_record"] else "new, this task",
                                                                       ("yes: member %d at $%.4f$, rate $%s$, smallest factor $%.3f$" % (c["member"], c["time_over_P"], g(c["rate1"]), c["Dmin"])) if c else "no"))
        fh.write("\n| No. | Rate, last step (base; half) | Rate, 5 and 20 steps (base) | Sampled lower slope, 20 steps (base; half) | Row projection $\\mathbf e\\cdot\\mathbf B$ at steps $-1$, $0$ (base) | Largest earlier speed of the member | Largest speed of any other member | Smallest factor on its rows at the event | Smallest delay at the event | Nearest member, sizes | Partners still received from the rigid past | Nearest kick crossing before the event, steps (base) |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |\n")
        for r in table:
            b, h2 = r["base"], r["half"]
            fh.write("| %d | $%s$; $%s$ | $%s$, $%s$ | $%s$; $%s$ | $%s$, $%s$ | $%.6f$ | $%.4f$ | $%.3f$ | $%.3f$ | $%.3f$ | %d of %d | %s |\n" % (r["n"], g(b["rate_1"], 4), g(h2["rate_1"], 4), g(b["rate_5"], 4), g(b["rate_20"], 4), g(b["lower_slope_20"], 4), g(h2["lower_slope_20"], 4), g(b["e_dot_B_minus_1"], 4), g(b["e_dot_B_0"], 4),
                                                                                                             b["max_speed_before"], b["max_other_speed"], b["min_abs_D_event"], b["min_delay_event"], b["min_distance_event_over_size"], b["rigid_past_sources_at_event"], b["partners"],
                                                                                                             ("$%.0f$" % b["nearest_kick_crossing_steps"]) if b["nearest_kick_crossing_steps"] is not None else "none"))
    with open(out_dir / "join.json", "x") as fh:
        json.dump(out, fh, indent=1)
    S = out["selected_records"]
    print(json.dumps(dict(known_result="PASS", frozen_table_check={k: (v["kick_count_matches"], v["base_range_matches_frozen"], v["range_with_other_amplitudes_matches_frozen"]) for k, v in tab.items()}, reconciliation=rec, replay_join=out["replay_join"],
                          replay_reproduction={k: v for k, v in out["replay_reproduction"].items() if k != "per_record"}, selected=len(S), with_base_and_half=sum(1 for r in S if r["base"] and r["half"]), flagged={r["n"]: r["flags"] for r in S if r.get("flags")},
                          census_same_preparation=sum(1 for r in S if r["census_same_preparation"])), indent=1))
else:
    print(json.dumps(out, indent=1))
raise SystemExit(0 if out["known_result"] == "PASS" else 1)
