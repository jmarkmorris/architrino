"""Independent record checker for eom_stationary_joint_frontier_fixture/v5
(Saturday quantitative round, task 2, 2026-10-11).

It reads the JSON record the fixture prints with no arguments and re-derives each
obligation from the printed data, without importing or calling any solver code:
decimal arithmetic for root-bracket widths, the causal equation |X_r(T)-X_t(S)| = T-S
re-evaluated from printed enclosures, and the canonical per-root acceleration
kappa*sigma*|q q'| / (r^2 |D_t|) re-evaluated from the printed root bracket and hulls.

Frozen before the fixture source was edited.  Known cases K1 (analytic stationary pair)
and K2 (deliberately defective records) are asserted before any target file is read.
It checks the record; it cannot check that the fixture computed the record honestly,
and it certifies nothing about the physical trajectory.
Usage: python fixture_record_check.py [record.json ...]
"""
import copy, json, sys
from decimal import Decimal as Dc, getcontext

getcontext().prec = 60
SCHEMA = "eom_stationary_joint_frontier_fixture/v5"
PAIRS = [("positive", "positive"), ("positive", "negative"), ("negative", "positive"), ("negative", "negative")]
CHARGE = {"positive": Dc("0.1666666666666666666666666666666667"), "negative": Dc("-0.1666666666666666666666666666666667")}

def D(x): return x if isinstance(x, Dc) else Dc(str(x))
def rows_by_pair(rows):
    out = {}
    for r in rows:
        key = (r["receiver"], r["transmitter"])
        if key in out: return None
        out[key] = r
    return out
def certified_cross(r): return r["status"] == "certified_complete" and r["root_free_complement"] is True and r["root_count"] == 1 and len(r["roots"]) == 1
def certified_self(r): return r["status"] == "certified_complete" and r["root_free_complement"] is True and r["root_count"] == 0 and len(r.get("roots", [])) == 0
def same_row(a, b):
    keys = ("status", "failure", "root_count", "root_free_complement", "memory_boundary_contact")
    if any(a.get(k) != b.get(k) for k in keys): return False
    ra, rb = a.get("roots", []), b.get("roots", [])
    if len(ra) != len(rb): return False
    rk = ("lower", "upper", "transmitter_factor_lower", "transmitter_factor_upper", "receiver_factor_lower",
          "receiver_factor_upper", "precision_route", "precision_bits")
    return all(x.get(k) == y.get(k) for x, y in zip(ra, rb) for k in rk)

def causal_consistent(T, root, x_recv, x_trans):
    """[T-upper, T-lower] must meet the distance interval between the receiver enclosure at T and
    the transmitter hull over the root bracket (x-axis configuration; other axes carried exactly)."""
    lo, hi = T - D(root["upper"]), T - D(root["lower"])
    comps = []
    for a, b in zip(x_recv, x_trans):
        dl, dh = D(a[0]) - D(b[1]), D(a[1]) - D(b[0])
        mn = Dc(0) if dl <= 0 <= dh else min(abs(dl), abs(dh))
        comps.append((mn, max(abs(dl), abs(dh))))
    dmin = sum(c[0] ** 2 for c in comps).sqrt(); dmax = sum(c[1] ** 2 for c in comps).sqrt()
    return lo <= dmax and hi >= dmin and lo > 0

def acceleration_interval_x(kappa, recv, trans, T, root, x_recv, x_trans, v_trans):
    """x-component interval of the canonical per-root acceleration on the receiver, for a
    configuration on the x-axis: kappa*sigma*|q q'| * n_x / (r^2 D_t), r = T - S, D_t = 1 - n.v."""
    r_lo, r_hi = T - D(root["upper"]), T - D(root["lower"])
    dl, dh = D(x_recv[0][0]) - D(x_trans[0][1]), D(x_recv[0][1]) - D(x_trans[0][0])
    if dl <= 0 <= dh: return None
    n = Dc(1) if dl > 0 else Dc(-1)
    nv = sorted([n * D(v_trans[0][0]), n * D(v_trans[0][1])])
    D_lo, D_hi = 1 - nv[1], 1 - nv[0]
    if D_lo <= 0: return None
    sigma = Dc(1) if CHARGE[recv] * CHARGE[trans] > 0 else Dc(-1)
    mag_lo = kappa * abs(CHARGE[recv] * CHARGE[trans]) / (r_hi ** 2 * D_hi)
    mag_hi = kappa * abs(CHARGE[recv] * CHARGE[trans]) / (r_lo ** 2 * D_lo)
    vals = sorted([sigma * n * mag_lo, sigma * n * mag_hi])
    return vals[0], vals[1]

def check(rec):
    f = []
    def need(cond, msg):
        if not cond: f.append(msg)
    need(rec.get("schema") == SCHEMA, "schema")
    need(rec.get("field_speed") == "1", "field_speed must be the token 1")
    reach = rec.get("minimum_reach", "")
    T = D(reach) if reach else None
    pos, neg = rec.get("positive", {}), rec.get("negative_control", {})
    ctl = rec.get("request_controls", {})
    # ---------------- positive obligation: minimum reach
    need(pos.get("prefix_status") == "completed", "P1 prefix not completed")
    need(pos.get("prefix_accepted_end") == reach and reach != "", "P1 accepted end differs from minimum reach")
    need(pos.get("prefix_all_steps_atomic") is True, "P1 prefix steps not all atomic")
    need(pos.get("final_step_status") == "accepted" and pos.get("final_step_accepted_time") == reach, "P1 final step")
    # consumed = endpoint snapshot of the final accepted step's last substep (the acceleration the corrector
    # consumed, on the candidate); recertification = that step's accepted_snapshot, which the solver computes on the
    # published history after acceptance of the local error; direct = non-traversal route on the published history.
    for name in ("consumed_snapshot", "recertification_snapshot", "direct_snapshot"):
        need(pos.get(name + "_status") == "certified_complete", "P3/P5 %s status" % name)
        need(pos.get(name + "_reception_time") == reach, "P3/P5 %s reception time" % name)
    tables = {}
    for name in ("consumed_pair_rows", "recertification_pair_rows", "direct_pair_rows"):
        t = rows_by_pair(pos.get(name, []))
        need(t is not None and sorted(t) == sorted(PAIRS), "P2 %s must hold exactly the four ordered pairs" % name)
        tables[name] = t or {}
        for (r, s), row in (t or {}).items():
            need(row.get("reception_time") == reach, "P2 %s %s<-%s reception time" % (name, r, s))
            if r == s: need(certified_self(row), "P2 %s self pair %s not certified root free" % (name, r))
            else:
                need(certified_cross(row), "P2 %s cross pair %s<-%s not one certified root" % (name, r, s))
                if certified_cross(row) and ctl.get("root_tolerance"):
                    w = D(row["roots"][0]["upper"]) - D(row["roots"][0]["lower"])
                    need(Dc(0) <= w <= D(ctl["root_tolerance"]), "P2 %s root width exceeds unchanged tolerance" % name)
    need(pos.get("logical_ordered_pairs") == 4, "P2 logical ordered pairs")
    states = {s["path_id"]: s for s in pos.get("endpoint_states", [])}
    hulls = {(h["receiver"], h["transmitter"]): h for h in pos.get("transmitter_hulls_over_root_brackets", [])}
    need(sorted(states) == ["negative", "positive"], "P4 endpoint states for both paths")
    for pid, s in states.items():
        sp2 = sum(max(abs(D(c[0])), abs(D(c[1]))) ** 2 for c in s["velocity"])
        need(sp2 < 1, "P2 endpoint speed of %s not below wake speed" % pid)
    acc = pos.get("acceleration", {})
    need(acc.get("consumed_status") == "certified_complete", "P3 consumed acceleration status")
    need(acc.get("recertification_status") == "certified_complete", "P3 recertification acceleration status")
    consumed = {a["path_id"]: a for a in acc.get("consumed_receiver_totals", [])}
    totals = {a["path_id"]: a for a in acc.get("recertification_receiver_totals", [])}
    need(sorted(totals) == ["negative", "positive"] and sorted(consumed) == ["negative", "positive"], "P3 receiver totals for both paths")
    for pid in totals:
        for axis in range(3):
            a, b = totals[pid]["acceleration"][axis], consumed.get(pid, totals[pid])["acceleration"][axis]
            need(D(a[0]) <= D(b[1]) and D(b[0]) <= D(a[1]), "P3 consumed and recertified acceleration of %s are disjoint" % pid)
    for (r, s) in PAIRS:
        if r == s: continue
        row = tables["recertification_pair_rows"].get((r, s)); h = hulls.get((r, s))
        if not (row and certified_cross(row) and h and r in states and T is not None):
            f.append("P2/P3 missing data for independent recomputation %s<-%s" % (r, s)); continue
        root = row["roots"][0]
        need(h.get("root_lower") == root["lower"] and h.get("root_upper") == root["upper"], "hull not on the printed root bracket")
        need(causal_consistent(T, root, states[r]["position"], h["position"]), "P2 causal equation inconsistent %s<-%s" % (r, s))
        iv = acceleration_interval_x(D(ctl.get("coupling", "0")), r, s, T, root, states[r]["position"], h["position"], h["velocity"])
        tot = totals.get(r)
        if iv is None or tot is None: f.append("P3 acceleration recomputation unavailable %s" % r); continue
        need(D(tot["acceleration"][0][0]) <= iv[1] and D(tot["acceleration"][0][1]) >= iv[0],
             "P3 recertified acceleration of %s does not meet the independently recomputed interval" % r)
        for axis in (1, 2):
            need(D(tot["acceleration"][axis][0]) <= 0 <= D(tot["acceleration"][axis][1]), "P3 transverse acceleration of %s excludes zero" % r)
    for name, extra in (("ordinary_histories", ()), ("joint_histories", ("symbol_count",))):
        hs = {h["path_id"]: h for h in pos.get(name, [])}
        need(sorted(hs) == ["negative", "positive"], "P4 %s for both paths" % name)
        for pid, h in hs.items():
            need(h.get("fingerprint", "") != "" and h.get("segment_count", 0) > 0, "P4 %s %s empty" % (name, pid))
            need(D(h.get("last_segment_end", "0")) == (T or Dc(-1)), "P4 %s %s does not end at the minimum reach" % (name, pid))
            for k in extra: need(h.get(k, 0) > 0, "P4 %s %s %s" % (name, pid, k))
    need(pos.get("final_step_published_matches_certificate") is True, "P4 final step publication differs from certificate")
    need(tables["recertification_pair_rows"] and all(same_row(tables["recertification_pair_rows"][p], tables["direct_pair_rows"].get(p, {}))
                                                     for p in tables["recertification_pair_rows"]),
         "P5 direct and traversal rows differ on some ordered pair")
    need(pos.get("passed") is True, "P fixture's own positive verdict")
    # ---------------- negative obligation: forced refusal with complete publication invariance
    radii = [D(r["radius"]) for r in neg.get("receiver_remainder_radii_x", [])]
    need(len(radii) == 2 and all(r > 0 for r in radii), "N1 two positive receiver remainder radii")
    nctl = neg.get("request_controls", {})
    diff = sorted(k for k in set(ctl) | set(nctl) if ctl.get(k) != nctl.get(k))
    need(diff == ["root_tolerance"], "N1 negative request differs in %s" % diff)
    if radii and nctl.get("root_tolerance"):
        tol = D(nctl["root_tolerance"])
        need(0 < tol < min(radii), "N2 derivation needs tolerance below the smaller receiver radius")
        need(tol * 4 <= min(radii) * (1 + Dc("1e-12")), "N2 tolerance is not the declared quarter radius")
        need(tol < D(ctl.get("root_tolerance", "0")), "N1 negative tolerance is not tighter")
    need(neg.get("attempted_start") == reach, "N3 negative attempt does not start at the accepted endpoint")
    need(neg.get("status") == "rejected", "N3 negative step was not rejected")
    need(neg.get("failure_code") == "root_completeness_not_certified", "N3 failure code")
    need(neg.get("accepted_time") == reach, "N4 accepted time changed")
    need(neg.get("failed_stage") in ("substep_start", "substep_endpoint", "final_recertification"), "N3 no failed acceleration snapshot")
    nt = rows_by_pair(neg.get("pair_rows", []))
    need(nt is not None and sorted(nt) == sorted(PAIRS), "N3 failed snapshot must hold the four ordered pairs")
    for (r, s), row in (nt or {}).items():
        if r != s:
            need(row["status"] != "certified_complete" and row["root_count"] == 0 and row["root_free_complement"] is False,
                 "N3 cross pair %s<-%s not refused" % (r, s))
            need("root_time_budget_exceeded" in row.get("diagnostic", ""), "N3 cross pair %s<-%s refused by another route" % (r, s))
    for name, counts in (("ordinary_invariance", ("paths_compared", "segments_compared", "leaves_compared")),
                         ("joint_invariance", ("paths_compared", "segments_compared", "leaves_compared", "symbols_compared"))):
        inv = neg.get(name, {})
        need(inv.get("equal") is True, "N4 %s not equal" % name)
        need(inv.get("paths_compared") == 2, "N4 %s path count" % name)
        need(all(inv.get(k, 0) > 0 for k in counts), "N4 %s vacuous" % name)
        need(inv.get("preimage_digest", "") != "" and inv.get("preimage_digest") == inv.get("returned_digest"), "N4 %s digests" % name)
    need(neg.get("path_ids_unchanged") is True and neg.get("input_fingerprints_match") is True, "N4 identities")
    st = neg.get("comparator_self_test", {})
    need(st.get("cross_path_ordinary_detected") is True and st.get("cross_path_joint_detected") is True, "N5 comparator blind to a different carrier")
    need(st.get("perturbed_joint_radius") in ("detected", "constructor_rejected"), "N5 comparator blind to a one-ulp radius change")
    need(neg.get("passed") is True, "N fixture's own negative verdict")
    nf = rec.get("natural_frontier_diagnostic", {})
    need(nf.get("mandatory") is False, "D natural frontier must be diagnostic only")
    need(nf.get("rejections_atomic_ordinary_and_joint") is True, "D a natural-frontier rejection was not atomic")
    need(rec.get("result") == "minimum_reach_and_rejection_control_passed", "result token")
    return f

# ------------------------------------------------------------------ known cases, before any target
def analytic_record():
    """Two members at rest at x = +-1/2 for all time: root S = T - 1 exactly, D_t = 1,
    acceleration -+ kappa |q q'| = -+0.28622861030533853 with the request's charge tokens
    (the stationary-transmitter control of the binding: W_acc = 1, inverse square)."""
    T = "1.2399999999999993"; S = str(D(T) - 1)
    kap = Dc("10.304229970992187"); a = kap * abs(CHARGE["positive"] * CHARGE["negative"])   # the request's charge tokens
    def row(r, s, cross):
        base = dict(receiver=r, transmitter=s, status="certified_complete", failure="", diagnostic="", reception_time=T,
                    root_free_complement=True, memory_boundary_contact=False)
        if cross: base.update(root_count=1, roots=[dict(lower=S, upper=S, transmitter_factor_lower="1", transmitter_factor_upper="1",
                              receiver_factor_lower="1", receiver_factor_upper="1", precision_route="binary64", precision_bits=53)])
        else: base.update(root_count=0, roots=[])
        return base
    rows = [row(r, s, r != s) for r, s in PAIRS]
    x = {"positive": "0.5", "negative": "-0.5"}
    st = [dict(path_id=p, position=[[x[p], x[p]], ["0", "0"], ["0", "0"]], velocity=[["0", "0"]] * 3) for p in x]
    hull = [dict(receiver=r, transmitter=s, root_lower=S, root_upper=S, position=[[x[s], x[s]], ["0", "0"], ["0", "0"]],
                 velocity=[["0", "0"]] * 3) for r, s in PAIRS if r != s]
    tot = [dict(path_id="positive", acceleration=[[str(-a), str(-a)], ["0", "0"], ["0", "0"]]),
           dict(path_id="negative", acceleration=[[str(a), str(a)], ["0", "0"], ["0", "0"]])]
    ctl = dict(root_tolerance="1e-5", coupling=str(kap), position_tolerance="2e-6")
    hist = [dict(path_id=p, fingerprint="f" + p, segment_count=3, last_segment_end=T, symbol_count=2) for p in x]
    inv = dict(equal=True, paths_compared=2, segments_compared=6, leaves_compared=90, symbols_compared=4, preimage_digest="d", returned_digest="d")
    nrow = [dict(row(r, s, False), **(dict(status="uncertified", root_free_complement=False,
            diagnostic="interior_root_not_surrounded/joint_root/root_time_budget_exceeded/") if r != s else {})) for r, s in PAIRS]
    return dict(schema=SCHEMA, field_speed="1", minimum_reach=T, request_controls=ctl,
        positive=dict(prefix_status="completed", prefix_accepted_end=T, prefix_all_steps_atomic=True, final_step_status="accepted",
            final_step_accepted_time=T, consumed_snapshot_status="certified_complete", consumed_snapshot_reception_time=T,
            recertification_snapshot_status="certified_complete", recertification_snapshot_reception_time=T,
            direct_snapshot_status="certified_complete", direct_snapshot_reception_time=T, logical_ordered_pairs=4,
            consumed_pair_rows=copy.deepcopy(rows), recertification_pair_rows=rows, direct_pair_rows=copy.deepcopy(rows),
            endpoint_states=st, transmitter_hulls_over_root_brackets=hull,
            acceleration=dict(consumed_status="certified_complete", recertification_status="certified_complete",
                              consumed_receiver_totals=copy.deepcopy(tot), recertification_receiver_totals=tot),
            ordinary_histories=hist, joint_histories=copy.deepcopy(hist), final_step_published_matches_certificate=True, passed=True),
        negative_control=dict(receiver_remainder_radii_x=[dict(path_id="positive", radius="4e-8"), dict(path_id="negative", radius="4e-8")],
            request_controls=dict(ctl, root_tolerance="1e-8"), attempted_start=T, status="rejected",
            failure_code="root_completeness_not_certified", accepted_time=T, failed_stage="substep_start", pair_rows=nrow,
            ordinary_invariance=dict(inv), joint_invariance=dict(inv), path_ids_unchanged=True, input_fingerprints_match=True,
            comparator_self_test=dict(cross_path_ordinary_detected=True, cross_path_joint_detected=True, perturbed_joint_radius="detected"),
            passed=True),
        natural_frontier_diagnostic=dict(mandatory=False, rejections_atomic_ordinary_and_joint=True),
        result="minimum_reach_and_rejection_control_passed")

def known_cases():
    base = analytic_record()
    assert check(base) == [], ("K1 analytic stationary pair must pass", check(base))
    def broken(mut, expect):
        r = copy.deepcopy(base); mut(r); fails = check(r)
        assert any(expect in m for m in fails), ("K2 defect not detected", expect, fails)
    def shift_root(r):
        for row in r["positive"]["recertification_pair_rows"]:
            if row["root_count"]: row["roots"][0]["lower"] = row["roots"][0]["upper"] = "0.2409999999999993"
        for h in r["positive"]["transmitter_hulls_over_root_brackets"]: h["root_lower"] = h["root_upper"] = "0.2409999999999993"
    broken(shift_root, "causal equation inconsistent")
    def scale_acc(r):
        for t in r["positive"]["acceleration"]["recertification_receiver_totals"]:
            t["acceleration"][0] = [str(D(t["acceleration"][0][0]) * Dc("1.01"))] * 2
    broken(scale_acc, "independently recomputed interval")
    broken(lambda r: r["positive"]["consumed_pair_rows"].pop(0), "exactly the four ordered pairs")
    broken(lambda r: r["positive"]["recertification_pair_rows"][1]["roots"][0].update(
        upper=str(D(r["positive"]["recertification_pair_rows"][1]["roots"][0]["lower"]) + Dc("2e-5"))), "root width exceeds")
    def split_consumed(r):
        for t in r["positive"]["acceleration"]["consumed_receiver_totals"]: t["acceleration"][0] = ["5", "6"]
    broken(split_consumed, "are disjoint")
    broken(lambda r: r["positive"]["direct_pair_rows"][1]["roots"][0].update(precision_bits=128), "direct and traversal rows differ")
    broken(lambda r: r["positive"].update(prefix_accepted_end="1.2349999999999994"), "accepted end differs")
    broken(lambda r: r["negative_control"]["joint_invariance"].update(equal=False), "joint_invariance not equal")
    broken(lambda r: r["negative_control"]["joint_invariance"].update(leaves_compared=0), "joint_invariance vacuous")
    broken(lambda r: r["negative_control"]["ordinary_invariance"].update(returned_digest="x"), "ordinary_invariance digests")
    broken(lambda r: r["negative_control"]["request_controls"].update(root_tolerance="5e-8"), "below the smaller receiver radius")
    broken(lambda r: r["negative_control"]["request_controls"].update(position_tolerance="1e-3"), "negative request differs")
    broken(lambda r: r["negative_control"].update(status="accepted"), "was not rejected")
    broken(lambda r: r["negative_control"].update(accepted_time="1.2449999999999992"), "accepted time changed")
    broken(lambda r: r["negative_control"]["pair_rows"][1].update(diagnostic="resource"), "refused by another route")
    broken(lambda r: r["negative_control"]["comparator_self_test"].update(cross_path_joint_detected=False), "comparator blind")
    broken(lambda r: r["natural_frontier_diagnostic"].update(mandatory=True), "diagnostic only")
    print("known cases passed: K1 analytic stationary pair accepted; K2 seventeen defective records each detected")

if __name__ == "__main__":
    known_cases()
    status = 0
    for path in sys.argv[1:]:
        rec = json.loads(open(path).read(), parse_float=Dc)
        fails = check(rec)
        print(path, "PASS" if not fails else "FAIL")
        for m in fails: print("  -", m)
        status = status or (1 if fails else 0)
    sys.exit(status)
