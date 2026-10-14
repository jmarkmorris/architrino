"""Event extraction from the 31 reviewed event cells (Codex release 2026-10-12T21:24:38.820Z). Separately written;
imports numpy and the standard library only, and no other instrument of this campaign or of the frozen subject.

Inputs per cell k (interval [5+k/64, 5+(k+1)/64]) and receiver i, from the reviewed cell files: boxes of the
comparison displacement, velocity and acceleration over the whole cell (y, vhat, ahat), and the majorants P_out,
V_out, A_out that bound |e|, |e'|, |e''| on the whole cell (they are nondecreasing in the cell, so the outgoing
value bounds the cell). The actual path is x = xhat + e. Raw endpoint velocities come from the receiver archive's
nodes (node 16 j is time 5 + j/64).

Derivations used.
  speed:   |v| <= |vhat| + |e'|, so sup over the cell of |v| <= normhi(vhat box) + V_out; and at an endpoint
           |v| >= |vhat(t_j)| - V(t_j), with V(t_j) = V_out of the cell ending there (V_in of cell 0 at j = 0).
  forcing: if every receiver has speed < 1 on cells 0..s-1 and some receiver has speed > 1 at endpoint j > s, the
           first time any receiver's speed equals one lies in (5 + s/64, 5 + j/64], by continuity.
  who:     the receiver whose speed is one at that time, in cell k, has normhi(vhat box) + V_out >= 1 on cell k.
  alpha:   d/dt (|v|^2 / 2) = v.a = vhat.ahat + e'.ahat + v.e'' >= vhat.ahat - V |ahat| - |v| A; at |v| = 1 this is
           >= lower(vhat.ahat) - V_out * normhi(ahat box) - A_out. Positive means the crossing is transversal.
  domain:  |displacement| <= normhi(y box) + P_out; distinct labels stay apart by at least dmin - 2 * that.
All floating operations that enter a bound are rounded outward by one nextafter step after a round-to-nearest
operation; strict comparisons with 1 are exact in floats and the comparison with 7/20 is done in rationals.

Usage: python event_cell_independent_extraction.py known <out json>
       python event_cell_independent_extraction.py target <out json> <passing known json> <base data dir>
"""
import hashlib
import json
import pathlib
import sys
import time
from fractions import Fraction as Fr
import numpy as np

up = lambda x: np.nextafter(x, np.inf)
dn = lambda x: np.nextafter(x, -np.inf)
sha = lambda p: hashlib.sha256(pathlib.Path(p).read_bytes()).hexdigest()


def sq_hi(lo, hi):
    return up(np.maximum(lo * lo, hi * hi))


def sq_lo(lo, hi):
    m = np.maximum(dn(np.minimum(lo * lo, hi * hi)), 0.0)
    return np.where((lo <= 0) & (hi >= 0), 0.0, m)


def sum_up(x):
    return up(up(x[..., 0] + x[..., 1]) + x[..., 2])


def sum_dn(x):
    return dn(dn(x[..., 0] + x[..., 1]) + x[..., 2])


def norm_hi(lo, hi):
    return up(np.sqrt(sum_up(sq_hi(lo, hi))))


def norm_lo(lo, hi):
    return np.maximum(dn(np.sqrt(np.maximum(sum_dn(sq_lo(lo, hi)), 0.0))), 0.0)


def dot_lo(vlo, vhi, alo, ahi):
    p = np.minimum(np.minimum(vlo * alo, vlo * ahi), np.minimum(vhi * alo, vhi * ahi))
    return sum_dn(dn(p))


def alpha_lo(vlo, vhi, alo, ahi, V, A):
    return dn(dn(dot_lo(vlo, vhi, alo, ahi) - up(V * norm_hi(alo, ahi))) - A)


def check_structure(indices, points_list, ref_points, n_expected):
    assert [int(i) for i in indices] == list(range(n_expected)), "cells missing, duplicated or out of order"
    for p in points_list:
        assert p.shape == ref_points.shape and np.array_equal(p, ref_points), "receiver identities differ"


def endpoint_node(j, per_cell=16):
    assert isinstance(j, int) and j >= 0
    return per_cell * j


def cell_interval(k, t0=Fr(5), h=Fr(1, 64)):
    return t0 + k * h, t0 + (k + 1) * h


def analyze(cells, end_v, points, targets, t0=Fr(5), h=Fr(1, 64), domain=Fr(7, 20), dmin=1.0):
    """cells[k]: dict of arrays v_lo, v_hi, a_lo, a_hi, y_lo, y_hi (n, 3) and P_out, V_out, A_out, V_in (n,).
    end_v[j]: raw velocity (n, 3) at endpoint j = 0..len(cells). targets: receiver indices. Returns a dict."""
    n = len(cells)
    assert len(end_v) == n + 1
    U = [up(norm_hi(c["v_lo"], c["v_hi"]) + c["V_out"]) for c in cells]
    Umax = [float(u.max()) for u in U]
    safe = 0
    while safe < n and Umax[safe] < 1.0:          # consecutive prefix only; a later cell below one does not count
        safe += 1
    L = [dn(norm_lo(end_v[j], end_v[j]) - (cells[0]["V_in"] if j == 0 else cells[j - 1]["V_out"])) for j in range(n + 1)]
    Lmax = [float(x.max()) for x in L]
    witness = next((j for j in range(n + 1) if Lmax[j] > 1.0), None)
    out = dict(cells=n, speed_upper_with_error_max_by_cell=Umax, safe_prefix_cells=safe, safe_through=str(t0 + safe * h),
               endpoint_speed_lower_max_by_endpoint=Lmax, witness_endpoint=witness)
    if witness is None:
        out["status"] = "inconclusive: no endpoint has a speed lower bound strictly above one"
        return out
    assert witness > safe, "inconsistent input: a witness inside the safe prefix"
    wi = int(np.argmax(L[witness]))
    out.update(witness_time=str(t0 + witness * h), witness_identity=[int(x) for x in points[wi]], witness_speed_lower=Lmax[witness],
               bracket=[str(t0 + safe * h), str(t0 + witness * h)], forcing_prefix_cells=list(range(witness)))
    cand, union, alphas = [], set(), []
    vz, disp = [], []
    for k in range(witness):
        c = cells[k]
        idx = np.nonzero(U[k] >= 1.0)[0]
        if len(idx):
            al = alpha_lo(c["v_lo"][idx], c["v_hi"][idx], c["a_lo"][idx], c["a_hi"][idx], c["V_out"][idx], c["A_out"][idx])
            ids = [[int(x) for x in points[i]] for i in idx]
            union.update(tuple(i) for i in ids)
            alphas.extend(float(a) for a in al)
            lo, hi = cell_interval(k, t0, h)
            cand.append(dict(cell=k, interval=[str(lo), str(hi)], identities=ids, speed_upper_with_error=[float(U[k][i]) for i in idx], alpha_lower=[float(a) for a in al]))
        vz.append([float(dn(c["v_lo"][t, 2] - c["V_out"][t])) for t in targets])
        disp.append(float(up(norm_hi(c["y_lo"], c["y_hi"]) + c["P_out"]).max()))
    dmax = max(disp)
    sep = float(dn(dmin - up(2.0 * dmax)))
    out.update(candidates_by_cell=cand, candidate_union=sorted(list(u) for u in union), candidate_count=len(union),
               alpha_lower_min=(min(alphas) if alphas else None), all_candidates_transversal=bool(alphas) and all(a > 0.0 for a in alphas),
               candidates_before_safe_prefix_end=any(d["cell"] < safe for d in cand),
               target_vz_lower_by_cell=vz, target_vz_lower_min=min(min(r) for r in vz), targets_vz_positive=all(x > 0.0 for r in vz for x in r),
               displacement_with_error_max_by_cell=disp, displacement_with_error_max=dmax, inside_domain=bool(Fr(dmax) < domain),
               separation_lower=sep, distinct_labels_separated=bool(sep > 0.0))
    ok = out["all_candidates_transversal"] and out["targets_vz_positive"] and out["inside_domain"] and out["distinct_labels_separated"] and safe >= 1
    out["status"] = ("all predicates hold: a first speed-one event is forced in the bracket and every possible identity crosses transversally" if ok
                     else "inconclusive: a witness exists but at least one predicate fails")
    return out


def known(out_path):
    res, detail = {}, {}
    one = lambda *a: np.array([list(a)], dtype=float)
    # K1 exact 3-4-5 and zero norms
    p = one(3, 4, 0); z = one(0, 0, 0)
    res["K1 3-4-5 norm enclosed within two ulps; zero norm lower is exactly 0 and upper is below 1e-150"] = bool(norm_lo(p, p)[0] <= 5.0 <= norm_hi(p, p)[0] and norm_hi(p, p)[0] - norm_lo(p, p)[0] < 1e-14 and norm_lo(z, z)[0] == 0.0 and 0.0 <= norm_hi(z, z)[0] < 1e-150)
    # K2 irrational radical: sqrt(2) strictly inside, checked in rationals
    q = one(1, 1, 0); lo, hi = Fr(float(norm_lo(q, q)[0])), Fr(float(norm_hi(q, q)[0]))
    res["K2 sqrt(2) strictly enclosed: lo^2 < 2 < hi^2 in exact rationals, width below 1e-14"] = bool(lo * lo < 2 < hi * hi and hi - lo < Fr(1, 10**14))
    # K3 interval dot with mixed signs: exact minimum -7; a box norm straddling zero has lower 0
    vlo, vhi, alo, ahi = one(-1, 1, 0), one(2, 3, 0), one(-2, -1, 5), one(1, 1, 5)
    d = float(dot_lo(vlo, vhi, alo, ahi)[0])
    res["K3 interval dot with crossed signs: lower bound at or below the exact -7 and within 1e-12; straddling box has norm lower 0 and upper >= sqrt(13)"] = bool(-7 - 1e-12 < d <= -7 and norm_lo(one(-1, -1, 0), one(2, 3, 0))[0] == 0.0 and Fr(float(norm_hi(one(-1, 1, 0), one(2, 3, 0))[0])) ** 2 >= 13)
    # K4 alpha positive (exact 1.3) and deliberately failed (exact -0.1)
    v, a = one(1, 0, 0), one(2, 0, 0)
    a1 = float(alpha_lo(v, v, a, a, np.array([0.1]), np.array([0.5]))[0]); a2 = float(alpha_lo(v, v, a, a, np.array([0.1]), np.array([1.9]))[0])
    res["K4 alpha: exact 1.3 gives a positive lower bound within 1e-12 below it; exact -0.1 gives a negative one"] = bool(1.3 - 1e-12 < a1 <= 1.3 and a1 > 0 and -0.1 - 1e-12 < a2 <= -0.1 and not a2 > 0)

    def cell(vboxes, V, a=(3.0, 0.0, 0.0), A=0.1, y=0.1, P=0.01):
        vb = np.array(vboxes, dtype=float); n = len(vb)
        return dict(v_lo=vb[:, 0], v_hi=vb[:, 1], a_lo=np.tile(a, (n, 1)), a_hi=np.tile(a, (n, 1)), y_lo=np.full((n, 3), -y) * [1, 0, 0], y_hi=np.full((n, 3), y) * [1, 0, 0],
                    P_out=np.full(n, P), V_out=np.full(n, float(V)), A_out=np.full(n, A), V_in=np.full(n, float(V)))
    box = lambda lo, hi: ([lo, 0, 0.5], [hi, 0, 0.5])
    pts = np.array([[0, 0, 0], [1, 0, 0], [2, 0, 0]])
    # K5 strict versus equality: whole-cell upper exactly one is not safe and is a candidate; endpoint lower exactly one is not a witness
    c0 = cell([([0.5, 0, 0], [0.75, 0, 0])] * 3, 0.25); c0["V_out"] = np.array([0.25, 0.0, 0.0])
    Uexact = float(up(norm_hi(c0["v_lo"], c0["v_hi"]) + c0["V_out"])[0])
    e_eq = [np.zeros((3, 3)), np.array([[1.25, 0, 0], [0, 0, 0], [0, 0, 0]])]
    r = analyze([c0], e_eq, pts, [0, 1])
    c0b = dict(c0); c0b["V_out"] = np.array([0.125, 0.0, 0.0]); c0b["v_hi"] = c0["v_hi"].copy(); c0b["v_hi"][0, 0] = 0.875 - 2.0 ** -52
    e_gt = [np.zeros((3, 3)), np.array([[1.125 + 2.0 ** -40, 0, 0], [0, 0, 0], [0, 0, 0]])]
    r_eq = analyze([c0b], [e_gt[0], np.array([[1.125, 0, 0], [0, 0, 0], [0, 0, 0]])], pts, [0, 1])
    detail["K5"] = dict(upper_at_equality=Uexact, eq_case=r.get("status"), lower_at_equality=r_eq["endpoint_speed_lower_max_by_endpoint"])
    res["K5 thresholds: an upper bound of one or more is not safe (prefix 0); an endpoint lower bound at or below one is not a witness"] = bool(Uexact >= 1.0 and r["safe_prefix_cells"] == 0 and r_eq["witness_endpoint"] is None and r_eq["endpoint_speed_lower_max_by_endpoint"][1] <= 1.0)
    # K6 nonconsecutive safe-prefix trap: uppers 0.5, 1.2, 0.6 give a prefix of one cell
    cs = [cell([box(0.0, 0.1)] * 3, 0.01), cell([box(0.0, 1.1)] * 3, 0.01), cell([box(0.0, 0.2)] * 3, 0.01)]
    ends = [np.zeros((3, 3))] * 3 + [np.array([[1.5, 0, 0]] * 3)]
    r = analyze(cs, ends, pts, [0, 1])
    res["K6 a cell below one after a cell above one does not extend the safe prefix (prefix is 1 of 3)"] = bool(r["safe_prefix_cells"] == 1 and r["witness_endpoint"] == 3)

    def refused(fn):
        try:
            fn()
        except AssertionError:
            return True
        return False
    # K7 missing, duplicate, out-of-order cells and a permuted receiver list are refused; the right list is accepted
    perm = pts[[1, 0, 2]]
    res["K7 structure: cells [0,1,3], [0,1,1,2], [1,0,2] and [0,1] of 3 refused; permuted identities refused; [0,1,2] accepted"] = bool(
        refused(lambda: check_structure([0, 1, 3], [pts] * 3, pts, 3)) and refused(lambda: check_structure([0, 1, 1, 2], [pts] * 4, pts, 3)) and refused(lambda: check_structure([1, 0, 2], [pts] * 3, pts, 3))
        and refused(lambda: check_structure([0, 1], [pts] * 2, pts, 3)) and refused(lambda: check_structure([0, 1, 2], [pts, perm, pts], pts, 3)) and check_structure([0, 1, 2], [pts] * 3, pts, 3) is None)
    # K8 indexing: endpoint j is node 16 j at time 5 + j/64; cell k is [5 + k/64, 5 + (k+1)/64]; the last cell ends at 351/64
    res["K8 indexing: endpoint 31 is node 496 at 351/64; cell 30 is [175/32, 351/64]; cell 0 starts at 5; negative or fractional endpoints refused"] = bool(
        endpoint_node(31) == 496 and Fr(5) + 31 * Fr(1, 64) == Fr(351, 64) and cell_interval(30) == (Fr(175, 32), Fr(351, 64)) and cell_interval(0)[0] == 5 and refused(lambda: endpoint_node(-1)) and refused(lambda: endpoint_node(1.0)))
    # K9 exact synthetic two-cell bracket and candidate union, through the same analyze() used for the target
    c_safe = cell([box(0.0, 0.5), box(0.0, 0.5), box(0.0, 0.5)], 0.05)
    c_hot = cell([box(0.0, 0.5), box(0.5, 1.2), box(0.5, 0.8)], 0.05)       # receiver 2: sqrt(0.64 + 0.25) + 0.05 = 0.9934 < 1, not a candidate
    c_hot["v_hi"][2, 0] = 0.85                                              # now sqrt(0.7225 + 0.25) + 0.05 = 1.0362 >= 1, a candidate
    ends = [np.zeros((3, 3)), np.array([[0.2, 0, 0.5]] * 3), np.array([[0.2, 0, 0.5], [1.2, 0, 0.5], [0.8, 0, 0.5]])]
    r = analyze([c_safe, c_hot], ends, pts, [0, 1], t0=Fr(5))
    exp_alpha = 0.5 * 3.0 - 0.05 * 3.0 - 0.1                                # lower(vhat.ahat) = 0.5*3; V|ahat| = 0.15; A = 0.1
    detail["K9"] = dict(result={k: r[k] for k in ("safe_prefix_cells", "witness_endpoint", "bracket", "candidate_union", "alpha_lower_min", "witness_speed_lower", "target_vz_lower_min", "separation_lower", "status")}, expected_alpha=exp_alpha)
    res["K9 synthetic two cells: safe prefix 1, witness endpoint 2 at receiver (1,0,0) with lower bound just below 1.25, bracket (321/64, 161/32], candidates exactly (1,0,0) and (2,0,0) in cell 1, alpha just below 1.25, targets' vz lower 0.45, separation 1 - 2*0.11"] = bool(
        r["safe_prefix_cells"] == 1 and r["witness_endpoint"] == 2 and r["witness_identity"] == [1, 0, 0] and 1.25 - 1e-12 < r["witness_speed_lower"] <= 1.25 and r["bracket"] == ["321/64", "161/32"]
        and r["candidate_union"] == [[1, 0, 0], [2, 0, 0]] and [d["cell"] for d in r["candidates_by_cell"]] == [1] and exp_alpha - 1e-12 < r["alpha_lower_min"] <= exp_alpha and r["all_candidates_transversal"]
        and 0.45 - 1e-12 < r["target_vz_lower_min"] <= 0.45 and r["targets_vz_positive"] and 0.78 - 1e-12 < r["separation_lower"] <= 0.78 and r["inside_domain"] and r["status"].startswith("all predicates hold"))
    # K10 the same synthetic with the acceleration majorant raised so alpha fails, and with a displacement outside the domain: reported inconclusive
    bad = dict(c_hot); bad["A_out"] = np.full(3, 1.5)
    r1 = analyze([c_safe, bad], ends, pts, [0, 1])
    far = dict(c_hot); far["P_out"] = np.full(3, 0.3)
    r2 = analyze([c_safe, far], ends, pts, [0, 1])
    r3 = analyze([c_safe, c_safe], [ends[0], ends[1], ends[1]], pts, [0, 1])
    res["K10 failures are reported: alpha not positive, displacement outside 7/20, and no witness each give an inconclusive status"] = bool(
        not r1["all_candidates_transversal"] and r1["status"].startswith("inconclusive") and not r2["inside_domain"] and r2["status"].startswith("inconclusive") and r3["witness_endpoint"] is None and r3["status"].startswith("inconclusive"))
    out = dict(result="PASS" if all(res.values()) else "FAIL", controls={k: bool(v) for k, v in res.items()}, detail=detail, instrument_sha256=sha(__file__), utc=time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()))
    with open(out_path, "x") as fh:
        json.dump(out, fh, indent=1)
    print(json.dumps(dict(result=out["result"], failed=[k for k, v in res.items() if not v], controls=len(res))))
    raise SystemExit(0 if out["result"] == "PASS" else 1)


PACKETS = (("claude-chain-0-7", 0, 7), ("claude-chain-8-15", 8, 15), ("claude-chain-16-23", 16, 23), ("claude-chain-24-30", 24, 30))
INPUTS = dict(receivers=("next-event/evolution/cross-reference/reference.npz", "97aa2156bae5557dd19dc7072bc973e1e2e6d33d4b60da3584fbb730172f13ac"),
              errors=("next-event/continuation/prefix-refinement4.npz", "467aeec7cd3a38688e0dae4b5840dea3e8bdd3ae0c305ec9388791d2baef5a22"))
FINAL_STATE = "504f1c37afac256973b2c95080362791b75753fd614229ce222ed678622aaf83"
TARGETS = ((0, 0, 0), (1, 0, 0))


def target(out_path, known_path, base):
    kn = json.load(open(known_path))
    assert kn["result"] == "PASS" and kn["instrument_sha256"] == sha(__file__), "known cases must pass for these exact bytes first"
    base = pathlib.Path(base); owner = base / "event-cell-independent-2026-10-12"
    auth = dict(manifests={}, cell_files={})
    for name, a, b in PACKETS:                      # every entry of each packet's output manifest
        lines = (owner / name / "outputs.sha256").read_text().splitlines()
        for ln in lines:
            h, rel = ln.split("  ", 1)
            assert sha(owner / name / rel) == h, ("manifest entry differs", name, rel)
        auth["manifests"][name] = dict(entries=len(lines), sha256=sha(owner / name / "outputs.sha256"))
    assert sha(owner / "claude-chain-24-30/chain/chain-state.npz") == FINAL_STATE
    for key, (rel, h) in INPUTS.items():
        assert sha(base / rel) == h, key
    ref = np.load(base / INPUTS["receivers"][0]); err = np.load(base / INPUTS["errors"][0])
    points = ref["points"]
    files = [owner / name / "chain" / ("cell-%02d.npz" % k) for name, a, b in PACKETS for k in range(a, b + 1)]
    raw = [np.load(f) for f in files]
    check_structure([int(z["cell"]) for z in raw], [z["points"] for z in raw], points, 31)
    for k, (f, z) in enumerate(zip(files, raw)):
        auth["cell_files"]["cell-%02d" % k] = sha(f)
    times = ref["times"]
    assert len(times) == 513 and all(Fr(float(times[endpoint_node(j)])) == Fr(5) + j * Fr(1, 64) for j in range(32)), "archive nodes are not the dyadic endpoints"
    look = {tuple(p): j for j, p in enumerate(err["points"].tolist())}
    idx = [look.get(tuple(p)) for p in points.tolist()]
    P0 = np.array([err["errors"][320, j, 0] if j is not None else 0.0 for j in idx]); V0 = np.array([err["errors"][320, j, 1] if j is not None else 0.0 for j in idx])
    joins = [bool(np.array_equal(raw[0]["P_in"], P0) and np.array_equal(raw[0]["V_in"], V0))] + [bool(np.array_equal(raw[k]["P_in"], raw[k - 1]["P_out"]) and np.array_equal(raw[k]["V_in"], raw[k - 1]["V_out"])) for k in range(1, 31)]
    assert all(joins), "a join or the time-five start differs"
    contained = True                                 # raw endpoint values of both ends of each cell lie in that cell's boxes
    for k, z in enumerate(raw):
        for j in (k, k + 1):
            for nm, lo, hi in (("y", "y_lo", "y_hi"), ("v", "v_lo", "v_hi"), ("a", "a_lo", "a_hi")):
                x = ref[nm][endpoint_node(j)]
                contained &= bool(np.all(z[lo] <= x) and np.all(x <= z[hi]))
    assert contained, "a raw endpoint value lies outside its cell box"
    for z in raw:
        assert np.all(z["P_out"] >= z["P_in"]) and np.all(z["V_out"] >= z["V_in"]) and np.all(z["P_out"] < z["tube"]), "majorants are not monotone or not inside the tube"
    tidx = [points.tolist().index(list(t)) for t in TARGETS]
    d2 = min(int(((points[i + 1:] - points[i]) ** 2).sum(1).min()) for i in range(len(points) - 1))
    dmin = float(dn(np.sqrt(float(d2)))) if d2 != 1 else 1.0
    cells = [{k: z[k] for k in ("v_lo", "v_hi", "a_lo", "a_hi", "y_lo", "y_hi", "P_out", "V_out", "A_out", "V_in")} for z in raw]
    end_v = [ref["v"][endpoint_node(j)] for j in range(32)]
    res = analyze(cells, end_v, points, tidx, dmin=dmin)
    out = dict(instrument_sha256=sha(__file__), known_receipt_sha256=sha(known_path), authentication=dict(auth, joins_all_exact=True, time_five_start_exact=True, raw_endpoints_inside_boxes=True, final_state_sha256=FINAL_STATE,
               inputs={k: v[1] for k, v in INPUTS.items()}, receivers=int(len(points)), cells=31, coverage=[str(Fr(5)), str(Fr(351, 64))]),
               targets=[list(t) for t in TARGETS], target_indices=tidx, minimum_distinct_site_distance_squared=d2, result=res, utc=time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()))
    with open(out_path, "x") as fh:
        json.dump(out, fh, indent=1)
    print(json.dumps({k: res.get(k) for k in ("status", "safe_prefix_cells", "safe_through", "witness_endpoint", "witness_time", "witness_identity", "witness_speed_lower", "bracket", "candidate_count", "candidate_union", "alpha_lower_min",
                                              "target_vz_lower_min", "displacement_with_error_max", "separation_lower", "inside_domain")}))


if __name__ == "__main__":
    if len(sys.argv) == 3 and sys.argv[1] == "known":
        known(sys.argv[2])
    elif len(sys.argv) == 5 and sys.argv[1] == "target":
        target(sys.argv[2], sys.argv[3], sys.argv[4])
    else:
        raise SystemExit("usage: known <out json> | target <out json> <passing known json> <base data dir>")
