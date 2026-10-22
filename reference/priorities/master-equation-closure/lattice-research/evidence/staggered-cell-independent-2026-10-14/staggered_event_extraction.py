"""First speed-one event of the exact staggered branch from the independently propagated error (campaign 2026-10-14).

Inputs: a completed propagation receipt directory of staggered_propagation.py (cells.jsonl with, per table cell j,
the end-of-cell bounds P_j >= sup|h|, V_j >= sup|h'| over the cell and A_j >= ess sup|h''| over the cell; P and V are
nondecreasing so the end value bounds the whole cell), and the admitted comparison archive.

Predicates (first-event document Section 7), evaluated on every archive sub-cell k (width 1/512) inside table cell j,
with q = Q + h:
  speed upper     sup Q'(sub-cell) + V_j < 1      -> q' < 1 on the sub-cell
  speed positive  inf Q'(sub-cell) - V_j > 0      -> q' > 0 (no turn)
  separation      1 - 2 (sup Q + P_j) > 0         -> distinct-label separation positive (reported as a lower bound)
  acceleration    inf Q''(sub-cell) - A_j > 0     -> q'' > 0 (transversality where it is needed)
Lower bound: T_lo is the end of the longest prefix of sub-cells from zero on which speed-upper and speed-positive hold
(before zero q' is in (0, 1) by the accepted incoming theorem). The predicates are strict on closed sub-cells, so
q' < 1 on the closed interval [0, T_lo] and t_* > T_lo.
Upper bound: tau is the first archive node after T_lo with Q'(tau) - V_j > 1 (point enclosure of Q' at the node, V_j of
the table cell containing the node; for a node on a table-cell boundary both adjacent cells' V are used, the larger).
Then q'(tau) > 1, q'(T_lo) < 1 and q' is continuous, so a first speed-one time exists in (T_lo, tau). The auxiliary
cross-row equation agrees with the full law until that first time, because no positive-delay self root exists before
it (Section 7); nothing after it is promoted to a full-law solution.
Transversality: on [T_lo, tau] inf Q'' - A_j > 0 on every sub-cell gives q''(t_*) > 0, so V.A = q' q'' = q''(t_*) > 0
for every label; the reported number is the minimum of inf Q'' - A_j over the bracket.
Q' enclosures: the pinned quintic's whole-cell derivative (Horner on x in [0, 1]); Q'' enclosures: Q2 v2's Bernstein
whole-cell bounds (accepted). Every comparison is a strict inequality on outward intervals.

Usage (repository root, shared venv):
    python staggered_event_extraction.py known <out json>
    python staggered_event_extraction.py extract <propagation dir> <summary sha256> <rows sha256> <passing known json> <out json>
The two digests are trusted inputs supplied by the caller (the completed run's files as retained); the summary and
rows are read once, hashed and parsed from the same bytes, and structurally checked before use (review 2).
"""
import hashlib
import importlib.util
import json
import math
import sys
import time
from fractions import Fraction as Fr
from pathlib import Path

import numpy as np

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[5]
INF = math.inf


def sha(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def load_propagation(expected):
    path = HERE / "staggered_propagation.py"
    if sha(path) != expected:
        raise SystemExit("propagation instrument bytes differ from the receipt identity")
    spec = importlib.util.spec_from_file_location("prop", path)
    mod = importlib.util.module_from_spec(spec)
    saved = sys.argv
    sys.argv = [str(path)]
    try:
        spec.loader.exec_module(mod)
    finally:
        sys.argv = saved
    return mod


def subcell_enclosures(M, ph, cells, last):
    """Per archive sub-cell k (in table cells 0..last): Q, Q', Q'' outward enclosures, and the owning table cell."""
    I = M.I
    poly = ph.hist.poly
    kmax = int(cells[last][1] * 512)
    ks = np.arange(kmax)
    unit = I(np.zeros(kmax), np.ones(kmax))
    Q, Q1 = poly.cell(ks, unit, 0), poly.cell(ks, unit, 1)
    lo2, hi2 = M.q2m.cell_q2_enclosure(M.ns, poly)
    owner = np.empty(kmax, int)
    for j in range(last + 1):
        a, b = int(cells[j][0] * 512), int(cells[j][1] * 512)
        owner[a:b] = j
    node_v = poly.cell(ks, I(np.ones(kmax)), 1)                             # Q' at the right node of each sub-cell
    return dict(Q=Q, Q1=Q1, Q2lo=lo2[:kmax], Q2hi=hi2[:kmax], owner=owner, node_v=node_v, kmax=kmax)


def extract_core(enc, P, V, A):
    """P, V, A: arrays over table cells. Returns the bracket and margins, or raises if a predicate fails first."""
    own = enc["owner"]
    Pk, Vk, Ak = P[own], V[own], A[own]
    sup_v = np.nextafter(enc["Q1"].hi + Vk, INF)
    inf_v = np.nextafter(enc["Q1"].lo - Vk, -INF)
    sep = np.nextafter(1.0 - 2.0 * np.nextafter(enc["Q"].hi + Pk, INF), -INF)
    acc = np.nextafter(enc["Q2lo"] - Ak, -INF)
    if not np.all(inf_v > 0):
        first = int(np.argmax(~(inf_v > 0)))
        raise ArithmeticError("speed positivity not established on sub-cell %d" % first)
    upper_ok = sup_v < 1.0
    n_lo = int(np.argmax(~upper_ok)) if not np.all(upper_ok) else enc["kmax"]
    T_lo = Fr(n_lo, 512)
    # node k+1 (right end of sub-cell k): q'(node) > 1 if Q'(node) - max(V of the cells sharing the node) > 1
    Vn = np.maximum(Vk, np.concatenate([Vk[1:], Vk[-1:]]))
    over = np.nextafter(enc["node_v"].lo - Vn, -INF) > 1.0
    cand = [k for k in range(n_lo, enc["kmax"]) if over[k]]
    if not cand:
        raise ArithmeticError("no node with a certified speed above one inside the propagated range")
    k_tau = cand[0]
    tau = Fr(k_tau + 1, 512)
    band = slice(n_lo, k_tau + 1)
    if not np.all(sep[: k_tau + 1] > 0):
        raise ArithmeticError("separation not established before tau")
    if not np.all(acc[band] > 0):
        raise ArithmeticError("transversality (q'' > 0) not established on the bracket")
    return dict(T_lo=str(T_lo), tau=str(tau), T_lo_float=float(T_lo), tau_float=float(tau), separation_lower=float(sep[: k_tau + 1].min()),
                acceleration_lower_on_bracket=float(acc[band].min()), speed_lower_before_tau=float(inf_v[: k_tau + 1].min()),
                V_at_tau=float(Vn[k_tau]), P_max=float(Pk[: k_tau + 1].max()), A_max_on_bracket=float(Ak[band].max()))


def admit_propagation(prop_dir, summary_sha, rows_sha):
    """Read the propagation's summary and rows once each, require their bytes to match the trusted digests supplied
    by the caller, parse those same bytes, and check structure: completed status, the complete prefix 0..last,
    finite nonnegative P, V, A, nondecreasing P and V, and the strict tube P < R on every row."""
    prop_dir = Path(prop_dir)
    sraw = (prop_dir / "summary.json").read_bytes()
    if hashlib.sha256(sraw).hexdigest() != summary_sha:
        raise ValueError("propagation summary bytes differ from the trusted digest")
    rraw = (prop_dir / "cells.jsonl").read_bytes()
    if hashlib.sha256(rraw).hexdigest() != rows_sha:
        raise ValueError("propagation rows bytes differ from the trusted digest")
    summ = json.loads(sraw)
    rows = [json.loads(l) for l in rraw.decode().splitlines() if l.strip()]
    if not summ.get("status", "").startswith("completed"):
        raise ValueError("propagation did not complete")
    last = summ["identity"]["last"]
    if [r["cell_index"] for r in rows] != list(range(last + 1)):
        raise ValueError("propagation rows are not the complete prefix 0..last")
    prevP = prevV = 0.0
    for r in rows:
        for k in ("P", "V", "A", "R"):
            if not (isinstance(r[k], float) and math.isfinite(r[k]) and r[k] >= 0):
                raise ValueError("row %d has an inadmissible %s" % (r["cell_index"], k))
        if r["P"] < prevP or r["V"] < prevV:
            raise ValueError("row %d: P and V must be nondecreasing" % r["cell_index"])
        if not r["P"] < r["R"]:
            raise ValueError("row %d: tube not strict" % r["cell_index"])
        prevP, prevV = r["P"], r["V"]
    return summ, rows


def known(out_path):
    """Synthetic controls of extract_core and of the input admission (copies only; no physical extraction)."""
    res = {}
    class Iv:
        def __init__(self, lo, hi): self.lo, self.hi = np.asarray(lo, float), np.asarray(hi, float)
    k = np.arange(16)
    t = (k + 0.5) / 512
    # comparison speed rising linearly through one: Q'(t) = 0.9 + 40 (t - 8/512) on sub-cells; V = 1e-3
    q1 = 0.9 + 40 * (t - 8 / 512)
    enc = dict(Q=Iv(np.full(16, 0.1), np.full(16, 0.11)), Q1=Iv(q1 - 0.04, q1 + 0.04), Q2lo=np.full(16, 30.0), Q2hi=np.full(16, 50.0),
               owner=k // 2, node_v=Iv(0.9 + 40 * ((k + 1) / 512 - 8 / 512), 0.9 + 40 * ((k + 1) / 512 - 8 / 512)), kmax=16)
    P = np.full(8, 1e-4); V = np.full(8, 1e-3); A = np.full(8, 1.0)
    r = extract_core(enc, P, V, A)
    def expected(Vc):
        own = k // 2
        lo = next(i for i in range(16) if 0.9 + 40 * ((i + 0.5) / 512 - 8 / 512) + 0.04 + Vc[own[i]] >= 1.0)
        def vn(i):
            return max(Vc[own[i]], Vc[own[i + 1]] if i + 1 < 16 else Vc[own[i]])
        tau = next(i for i in range(lo, 16) if 0.9 + 40 * ((i + 1) / 512 - 8 / 512) - vn(i) > 1.0) + 1
        return lo, tau
    want_lo, want_tau = expected(V)
    res["E1 synthetic linear crossing: the bracket is (first failing sub-cell start, first certified node) exactly"] = bool(r["T_lo"] == str(Fr(want_lo, 512)) and r["tau"] == str(Fr(want_tau, 512)))
    # E3 decisive unequal adjacent velocity bounds at a table-cell boundary node: the larger right-cell V must reject
    #    the boundary node (10/512), moving the upper end to 11/512; with the left V alone it would stay at 10/512
    V3 = V.copy(); V3[5] = 0.1
    r3 = extract_core(enc, P, V3, A)
    lo3, tau3 = expected(V3)
    res["E3 unequal adjacent V at the boundary node 10/512: the larger right-cell bound rejects it and the upper end is 11/512, as computed independently; the equal-V case gives 10/512"] = bool(
        want_tau == 10 and tau3 == 11 and r3["tau"] == str(Fr(11, 512)) and r3["T_lo"] == str(Fr(lo3, 512)))
    refs = {}
    for name, mod, want in (("negative speed", lambda e, P, V, A: (e.__setitem__("Q1", Iv(e["Q1"].lo - 2, e["Q1"].hi)), (P, V, A))[1], "speed positivity"),
                            ("no crossing", lambda e, P, V, A: (e.__setitem__("node_v", Iv(e["node_v"].lo - 1, e["node_v"].hi - 1)), (P, V, A))[1], "no node"),
                            ("transversality", lambda e, P, V, A: (P, V, np.full(8, 40.0)), "transversality"),
                            ("separation", lambda e, P, V, A: (np.full(8, 0.45), V, A), "separation")):
        e2 = dict(enc)
        P2, V2, A2 = mod(e2, P.copy(), V.copy(), A.copy())
        try:
            extract_core(e2, P2, V2, A2); refs[name] = False
        except ArithmeticError as ex:
            refs[name] = want in str(ex)
    res["E2 refusals for their reasons: a negative speed, no certified crossing, failed transversality, failed separation"] = bool(all(refs.values()))
    # E4 input admission on a synthetic propagation directory: accepted with its digests; refused for altered rows,
    #    altered summary, a consistently re-digested decrease, a broken tube and an incomplete prefix
    import tempfile, shutil
    scr = Path(tempfile.mkdtemp(dir=Path(out_path).parent))
    adm = {}
    try:
        d = scr / "prop"; d.mkdir()
        rows0 = [dict(cell_index=j, cell=[str(Fr(j, 64)), str(Fr(j + 1, 64))], P=1e-6 * (j + 1), V=1e-5 * (j + 1), A=1e-3, R=2e-6 * (j + 1)) for j in range(4)]
        summ0 = dict(status="completed cells 0..3", identity=dict(last=3, propagation="0" * 64))
        def write(rows, summ):
            (d / "cells.jsonl").write_text("".join(json.dumps(x) + "\n" for x in rows))
            (d / "summary.json").write_text(json.dumps(summ))
            return sha(d / "summary.json"), sha(d / "cells.jsonl")
        hs, hr = write(rows0, summ0)
        okA = len(admit_propagation(d, hs, hr)[1]) == 4
        def expect(name, want, call):
            try:
                call(); adm[name] = False
            except ValueError as e:
                adm[name] = want in str(e)
        bad = [dict(x) for x in rows0]; bad[2]["P"] = 0.0
        write(bad, summ0)
        expect("altered rows", "rows bytes differ", lambda: admit_propagation(d, hs, hr))
        write(rows0, dict(summ0, status="running"))
        expect("altered summary", "summary bytes differ", lambda: admit_propagation(d, hs, hr))
        h2 = write(bad, summ0)
        expect("re-digested decrease", "nondecreasing", lambda: admit_propagation(d, *h2))
        tub = [dict(x) for x in rows0]; tub[1]["R"] = tub[1]["P"]
        h3 = write(tub, summ0)
        expect("broken tube", "tube not strict", lambda: admit_propagation(d, *h3))
        h4 = write(rows0[:3], summ0)
        expect("incomplete prefix", "complete prefix", lambda: admit_propagation(d, *h4))
        h5 = write(rows0, dict(summ0, status="stopped: X"))
        expect("not completed", "did not complete", lambda: admit_propagation(d, *h5))
    finally:
        shutil.rmtree(scr)
    res["E4 propagation input admission: a synthetic directory is accepted with its digests and refused for altered rows, an altered summary, a re-digested decrease, a broken tube, an incomplete prefix and an incomplete status"] = bool(okA and all(adm.values()) and len(adm) == 6)
    out = dict(result="PASS" if all(res.values()) else "FAIL", controls=res, refusals=refs, admission_refusals=adm, detail=dict(E1=r, E3=r3), extraction_sha256=sha(__file__), utc=time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()))
    with open(out_path, "x") as fh:
        json.dump(out, fh, indent=1)
    print(json.dumps(dict(result=out["result"], controls=len(res))))
    raise SystemExit(0 if out["result"] == "PASS" else 1)


def extract(prop_dir, summary_sha, rows_sha, known_path, out_path):
    kraw = Path(known_path).read_bytes()
    k = json.loads(kraw)
    if k.get("result") != "PASS" or k.get("extraction_sha256") != sha(__file__):
        raise SystemExit("known receipt is not a PASS of these bytes")
    summ, rows = admit_propagation(prop_dir, summary_sha, rows_sha)
    prop = load_propagation(summ["identity"]["propagation"])
    M = prop.Modules()
    ph = prop.Physical(M)
    last = summ["identity"]["last"]
    for r, j in zip(rows, range(last + 1)):
        if r["cell"] != [str(ph.cells[j][0]), str(ph.cells[j][1])]:
            raise SystemExit("row %d cell identity differs" % j)
    P = np.array([r["P"] for r in rows]); V = np.array([r["V"] for r in rows]); A = np.array([r["A"] for r in rows])
    enc = subcell_enclosures(M, ph, ph.cells, last)
    res = extract_core(enc, P, V, A)
    out = dict(result="extracted", **res, propagation_summary_sha256=summary_sha, propagation_rows_sha256=rows_sha,
               extraction_sha256=sha(__file__), known_receipt_sha256=hashlib.sha256(kraw).hexdigest(), utc=time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()))
    with open(out_path, "x") as fh:
        json.dump(out, fh, indent=1)
    print(json.dumps(out))


if __name__ == "__main__":
    if Path.cwd().resolve() != ROOT:
        raise SystemExit("Run from the Architrino repository root")
    if len(sys.argv) == 3 and sys.argv[1] == "known":
        known(sys.argv[2])
    elif len(sys.argv) == 7 and sys.argv[1] == "extract":
        extract(*sys.argv[2:7])
    else:
        raise SystemExit("usage: known <out json> | extract <propagation dir> <summary sha256> <rows sha256> <known json> <out json>")
