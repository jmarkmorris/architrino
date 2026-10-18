"""Cell driver version 3 for the independent staggered-cell campaign (2026-10-14): early-cell method.

Combines, without modifying any of them: the pinned evaluator (8f08b1cd..., through driver v2's loader), driver v2
(table authentication, admission refusals), and the accepted early method (staggered_early_method.py: rigorous
pre-zero Q and Q', cancellation-preserving changed rows). New here:

1. Source-order admission. The early history is admitted for orders 0 (Q) and 1 (Q') only; any other order is
   refused, as is any pre-zero source time outside [-32, 0] (the method's table domain).
2. Radius-scaled stationary remainder (rule derived in the Codex method review from the frozen positive series in
   next-event/independent/stationary-full-tail.py, which is read as data and never executed): for a tabulated radius
   B0 and 0 <= B <= B0, field_tail(B) <= (B/B0)^5 field_tail(B0), and the receiver-Jacobian tail scales with the
   fourth power. The stored values already include g = 16. B is an upward-rounded bound on |q| over the whole
   reception subinterval (for a defect evaluation the receiver is the comparison itself; a propagation step must
   use its full trial-tube radius instead). B0 is the smallest tabulated radius not below B; B above the largest
   radius is refused. The scaling is exact rational arithmetic on the binary64 stored values (each an upper bound of
   its exact rational) and one upward conversion.
3. The stationary polynomial (cubic and potential degrees 6..14 from the pinned coefficient receipts) is evaluated
   with the pinned interval class exactly as the pinned field16 evaluates it, but with the scaled tail above in place
   of the fixed tabulated one.
4. The defect on a subinterval: rho = Q''(t) - [16 S(Q(t)) + 16 sum of identity rows], plus the pinned remote
   changing-source tail at the cell's right end, as in the pilot. No reception derivative, so no time-zero jump term.

Usage (repository root, shared venv):
    python staggered_cell_driver_v3.py known <out json>
    python staggered_cell_driver_v3.py cell <out dir (fresh)> <passing known json> --cell <k> --pieces <N>
"""
import hashlib
import importlib.util
import json
import math
import os
import resource
import sys
import time
from fractions import Fraction as Fr
from pathlib import Path

import numpy as np

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[5]
if Path.cwd().resolve() != ROOT:
    raise SystemExit("Run from the Architrino repository root")
PINS = {
    "staggered_cell_driver_v2.py": "20dfcb1c781a615c2ab291a05afce86759907e3898c279e876dfdfb48d2fb67f",
    "staggered_early_method.py": "b844ab44b102a7e1835720fef7c8f19b8d72d7bc60cd04eff2c56d2c587ef8a0",
}
CLOSURE = ROOT / ".local-data/master-equation-closure"
TAIL = CLOSURE / "next-event/independent/stationary-full-tail-target.json"
TAIL_SHA256 = "b0802d3208ce0ae3fade2a3ad92b3eaedb4886464f64327a509c55ff92e8fba2"
INF = math.inf


def sha(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def load_module(name, path, expected):
    if sha(path) != expected:
        raise SystemExit("pinned bytes differ: " + str(path))
    spec = importlib.util.spec_from_file_location(name, path)
    mod = importlib.util.module_from_spec(spec)
    saved = sys.argv
    sys.argv = [str(path)]
    try:
        spec.loader.exec_module(mod)
    finally:
        sys.argv = saved
    return mod


def load_all(pins=PINS):
    drv = load_module("drv2", HERE / "staggered_cell_driver_v2.py", pins["staggered_cell_driver_v2.py"])
    met = load_module("early", HERE / "staggered_early_method.py", pins["staggered_early_method.py"])
    ns = drv.load_v2()
    if sha(TAIL) != TAIL_SHA256:
        raise SystemExit("stationary tail receipt differs")
    return drv, met, ns


def strict_history(met):
    class StrictEarlyHistory(met.EarlyHistory):
        """Admitted for source orders 0 and 1 only."""
        def at(self, s, order):
            if order not in (0, 1):
                raise ArithmeticError("unsupported source order %r: only Q and Q' are admitted" % (order,))
            return super().at(s, order)
    return StrictEarlyHistory


class ScaledTail:
    """Radius-scaled stationary tails from the stored table (fifth power for the field, fourth for the Jacobian)."""

    def __init__(self, rows):
        self.rows = sorted(((Fr(r["radius"]), Fr(r["field_tail"]), Fr(r["receiver_jacobian_tail"])) for r in rows), key=lambda x: x[0])

    def _pick(self, B):
        B = Fr(B)
        if B < 0:
            raise ArithmeticError("negative radius")
        for B0, f, j in self.rows:
            if B <= B0:
                return B, B0, f, j
        raise ArithmeticError("radius %s above the largest tabulated radius" % B)

    def field(self, B):
        B, B0, f, _ = self._pick(B)
        return self._up((B / B0) ** 5 * f)

    def jacobian(self, B):
        B, B0, _, j = self._pick(B)
        return self._up((B / B0) ** 4 * j)

    @staticmethod
    def _up(q):
        x = float(q)
        return x if Fr(x) >= q else math.nextafter(x, INF)


def field16_scaled(ns, stationary, tail, q):
    """16 S(q): the pinned polynomial part, evaluated as the pinned field16 does, plus the radius-scaled tail."""
    I = ns["I"]
    B = float(q.mag().max())
    out = stationary.cubic * q * q.sq()
    for degree, c in stationary.axial.items():
        power = q
        for _ in range(degree - 2):
            power = power * q
        out = out - c * float(degree) * power
    out = out * 16.0
    t = tail.field(Fr(B))
    return out + I(-t, t), t


def ball_check(q_floor0, q_sup):
    if not (q_floor0 >= 0 and q_sup < 0.25):
        raise ValueError("comparison displacement is not inside the expected ball")


def defect_v3(ns, met, hist, stationary, tail, t, groups, q_sup, k_cell, x):
    q_t = hist.poly.cell(np.array([k_cell]), x, 0)
    acc = hist.poly.cell(np.array([k_cell]), x, 2)
    changed, box, D, r = met.changed_cancel(ns, hist, t, q_t, groups, q_sup)
    s16, stat_tail = field16_scaled(ns, stationary, tail, q_t)
    rho = acc - (s16 + ns["total"](changed, groups[:, 2]) * 16.0)
    return rho, {"max_emission": float(box.hi.max()), "min_emission": float(box.lo.min()), "min_D": float(D.lo.min()), "min_range": float(r.lo.min()), "stationary_tail": stat_tail, "q_hi": float(q_t.hi.max())}


def enclose_v3(drv, met, ns, table, archive, groups, cell, pieces, heartbeat=None):
    I = ns["I"]
    left, right = cell
    if not ns["dyadic"](pieces):
        raise ValueError("pieces must be a power of two")
    if (Fr(pieces) / ((right - left) * 512)).denominator != 1:
        raise ValueError("subintervals would straddle archive cells")
    hist = strict_history(met)(ns, archive, table)
    stationary = ns["Stationary"]()
    tail = ScaledTail(json.load(open(TAIL))["rows"])
    q_sup = float(hist.poly.q_ceil[int(right * 512) - 1])
    ball_check(float(hist.poly.q_floor[0]), q_sup)
    remote = ns["remote_tail16"](hist, right, 14)
    width = (right - left) / pieces
    worst, lo_all, hi_all = 0.0, INF, -INF
    st = {"max_emission": -INF, "min_emission": INF, "min_D": INF, "min_range": INF, "max_stationary_tail": 0.0, "max_q": 0.0}
    begun = last = time.time()
    for j in range(pieces):
        a, b = left + j * width, left + (j + 1) * width
        k = int(a * 512)
        x = I(np.array([float((a - Fr(k, 512)) * 512)]), np.array([float((b - Fr(k, 512)) * 512)]))
        if not (Fr(float(x.lo[0])) == (a - Fr(k, 512)) * 512 and Fr(float(x.hi[0])) == (b - Fr(k, 512)) * 512 and Fr(float(a)) == a and Fr(float(b)) == b):
            raise ValueError("a subinterval endpoint is not exact in binary64")
        rho, info = defect_v3(ns, met, hist, stationary, tail, I(np.array([float(a)]), np.array([float(b)])), groups, q_sup, k, x)
        lo_all, hi_all = min(lo_all, float(rho.lo[0])), max(hi_all, float(rho.hi[0]))
        worst = max(worst, float(rho.mag()[0]))
        st["max_emission"] = max(st["max_emission"], info["max_emission"]); st["min_emission"] = min(st["min_emission"], info["min_emission"])
        st["min_D"] = min(st["min_D"], info["min_D"]); st["min_range"] = min(st["min_range"], info["min_range"])
        st["max_stationary_tail"] = max(st["max_stationary_tail"], info["stationary_tail"]); st["max_q"] = max(st["max_q"], info["q_hi"])
        if heartbeat and (time.time() - last >= 10 or j == pieces - 1):
            last = time.time()
            heartbeat(dict(stage="cell", piece=j + 1, of=pieces, bound_so_far=worst, seconds=round(last - begun, 1)))
    bound = float(np.nextafter(worst + remote, INF))
    return dict(cell=[str(left), str(right)], subintervals=pieces, independent_defect_bound=bound, defect_enclosure_without_tail=[lo_all, hi_all], remote_tail16_bound=remote,
                comparison_displacement_sup=q_sup, **st, loop_seconds=round(time.time() - begun, 3))


def known(out_path):
    drv, met, ns = load_all()
    I = ns["I"]
    res, detail = {}, {}
    # V0 admission identities and refusal of altered dependency bytes
    archive = np.load(ns["ARCHIVE"])
    ok = sha(ns["ARCHIVE"]) == ns["ARCHIVE_SHA256"] and sha(drv.TABLE) == drv.TABLE_SHA256 and sha(drv.V2_PATH) == drv.V2_SHA256 and sha(TAIL) == TAIL_SHA256 and sha(ns["LAMBDA_RECEIPT"]) == ns["LAMBDA_RECEIPT_SHA256"]
    bad = dict(PINS); bad["staggered_early_method.py"] = "0" * 64
    try:
        load_all(bad)
        refused = False
    except SystemExit as e:
        refused = "pinned bytes differ" in str(e)
    res["V0 admission: archive, frozen table, pinned evaluator, stationary tail receipt and characteristic receipt match their pins; a wrong method pin is refused"] = bool(ok and refused)
    table = met.ExpTable(float(archive["lambda_center"]))
    hist = strict_history(met)(ns, archive, table)
    # V1 unsupported source order refused; orders 0 and 1 admitted
    box = I(np.array([-1.0]), np.array([-0.5]))
    try:
        hist.at(box, 2)
        r1 = False
    except ArithmeticError as e:
        r1 = "unsupported source order" in str(e)
    q0, q1 = hist.at(box, 0), hist.at(box, 1)
    res["V1 source order 2 refused for its reason; orders 0 and 1 return positive enclosures"] = bool(r1 and q0.lo[0] > 0 and q1.lo[0] > 0)
    # V2 pre-zero domain refusal
    try:
        hist.at(I(np.array([-33.0]), np.array([-32.5])), 0)
        r2 = False
    except ArithmeticError as e:
        r2 = "outside [-32, 0]" in str(e)
    res["V2 a pre-zero source box below -32 is refused for its reason"] = r2
    # V3 scaled tail: exact positive polynomial reference, then the frozen table
    poly = lambda B: 2 * B ** 5 + 3 * B ** 7
    synth = ScaledTail([{"radius": "1/2", "field_tail": float(poly(Fr(1, 2))), "receiver_jacobian_tail": 1.0}])
    s_ok = all(Fr(synth.field(B)) >= poly(Fr(B)) for B in (Fr(0), Fr(1, 4), Fr(1, 2))) and synth.field(0) == 0.0
    try:
        synth.field(Fr(3, 4)); s_ref = False
    except ArithmeticError as e:
        s_ref = "above the largest" in str(e)
    tail = ScaledTail(json.load(open(TAIL))["rows"])
    tiny = tail.field(Fr(1, 2 ** 40))
    f_ok = tail.field(0) == 0.0 and 0 < tiny < 1e-60 and tail.field(Fr(1, 10)) == 1.7364615933503328e-08 and tail.field(Fr(3, 10)) <= 2.8872598863860964e-05 and tail.jacobian(Fr(1, 2 ** 40)) < 1e-40
    try:
        tail.field(Fr(36, 100)); f_ref = False
    except ArithmeticError as e:
        f_ref = "above the largest" in str(e)
    try:
        tail.field(Fr(-1, 10)); n_ref = False
    except ArithmeticError as e:
        n_ref = "negative radius" in str(e)
    res["V3 scaled tail: bounds 2B^5+3B^7 at 0, 1/4, 1/2 and refuses 3/4 for a 1/2 table; frozen table: zero at 0, stored value at 1/10, positive below 1e-60 at 2^-40, Jacobian below 1e-40 there; 0.36 and -0.1 refused"] = bool(s_ok and s_ref and f_ok and f_ref and n_ref)
    detail["V3"] = dict(field_at_2m40=tiny, jacobian_at_2m40=tail.jacobian(Fr(1, 2 ** 40)), field_at_3_10=tail.field(Fr(3, 10)))
    # V4 planted failures: zero transmitter factor, zero-range segment, displacement ball
    planted = {}
    for name, call, want in (("transmitter factor", lambda: met.changed_identity(ns, I(np.array([1.0])), np.array([0.0]), np.array([1.0]), I(np.array([0.0])), I(np.array([1.5]))), "transmitter factor may vanish"),
                             ("zero range", lambda: met.changed_identity(ns, I(np.array([0.3])), np.array([0.0]), np.array([1.0]), I(np.array([0.5])), I(np.array([0.0]))), "zero range"),
                             ("displacement ball", lambda: ball_check(0.0, 0.3), "not inside the expected ball")):
        try:
            call(); planted[name] = False
        except (ArithmeticError, ValueError) as e:
            planted[name] = want in str(e)
    res["V4 planted failures refused for their reasons: vanishing transmitter factor, zero-range segment, displacement outside the ball"] = all(planted.values())
    # V5 interval composition: the scaled stationary polynomial at q = 1/8 contains the exact rational polynomial
    #     evaluated with the lower and with the upper coefficient endpoints (monotone in each coefficient for q > 0)
    stationary = ns["Stationary"]()
    q = I(np.array([0.125]))
    s16, t = field16_scaled(ns, stationary, tail, q)
    def exact(use_hi):
        cub = Fr(float(stationary.cubic.hi if use_hi else stationary.cubic.lo))
        val = cub * Fr(1, 8) ** 3
        for deg, c in stationary.axial.items():
            cc = Fr(float(c.lo if use_hi else c.hi))
            val -= cc * deg * Fr(1, 8) ** (deg - 1)
        return 16 * val
    e_hi, e_lo = exact(True), exact(False)
    res["V5 composition: 16 S(1/8) enclosure contains the exact rational polynomial at both coefficient extremes, widened only by the scaled tail"] = bool(Fr(float(s16.lo[0])) <= min(e_lo, e_hi) and max(e_lo, e_hi) <= Fr(float(s16.hi[0])))
    detail["V5"] = dict(enclosure=[float(s16.lo[0]), float(s16.hi[0])], exact=[float(e_lo), float(e_hi)], tail=t)
    # V6 loop glue on two subintervals of the already covered pilot cell; overlap with the pinned enclosure (diagnostic)
    groups = archive["groups"]
    pilot = drv.PILOT
    small = enclose_v3(drv, met, ns, table, archive, groups, pilot, 2)
    st2 = ns["Stationary"](); tl2 = ScaledTail(json.load(open(TAIL))["rows"])
    q_sup = float(hist.poly.q_ceil[int(pilot[1] * 512) - 1])
    direct, pinned = [], []
    curve = ns["Comparison"](archive)
    for j in range(2):
        a, b = pilot[0] + j * (pilot[1] - pilot[0]) / 2, pilot[0] + (j + 1) * (pilot[1] - pilot[0]) / 2
        k = int(a * 512)
        x = I(np.array([float((a - Fr(k, 512)) * 512)]), np.array([float((b - Fr(k, 512)) * 512)]))
        tt = I(np.array([float(a)]), np.array([float(b)]))
        direct.append(defect_v3(ns, met, hist, st2, tl2, tt, groups, q_sup, k, x)[0])
        pinned.append(ns["defect"](curve, st2, tt, groups, q_sup, k, x)[0])
    glue = small["defect_enclosure_without_tail"] == [min(float(r.lo[0]) for r in direct), max(float(r.hi[0]) for r in direct)]
    overlap = all(max(float(d.lo[0]), float(p.lo[0])) <= min(float(d.hi[0]), float(p.hi[0])) for d, p in zip(direct, pinned))
    res["V6 loop on two subintervals of the covered pilot cell equals direct calls; each new enclosure overlaps the pinned one (diagnostic, both valid)"] = bool(glue and overlap)
    detail["V6"] = dict(new=[[float(r.lo[0]), float(r.hi[0])] for r in direct], pinned=[[float(r.lo[0]), float(r.hi[0])] for r in pinned])
    # V7 inherited admission refusals, by reason
    why = {}
    for name, call, want in (("1000 pieces", lambda: enclose_v3(drv, met, ns, table, archive, groups, pilot, 1000), "power of two"), ("2 pieces on [0,1/64]", lambda: enclose_v3(drv, met, ns, table, archive, groups, (Fr(0), Fr(1, 64)), 2), "straddle")):
        try:
            call(); why[name] = False
        except ValueError as e:
            why[name] = want in str(e)
    res["V7 non-power-of-two and archive-straddling subdivisions refused for their reasons"] = all(why.values())
    out = dict(result="PASS" if all(res.values()) else "FAIL", controls={k: bool(v) for k, v in res.items()}, detail=detail, driver_v3_sha256=sha(__file__), pins=PINS, tail_sha256=TAIL_SHA256,
               utc=time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()))
    with open(out_path, "x") as fh:
        json.dump(out, fh, indent=1)
    print(json.dumps(dict(result=out["result"], failed=[k for k, v in res.items() if not v], controls=len(res))))
    raise SystemExit(0 if out["result"] == "PASS" else 1)


def cell_run(out_dir, known_path, k, pieces):
    kn = json.load(open(known_path))
    if not (kn["result"] == "PASS" and kn["driver_v3_sha256"] == sha(__file__)):
        raise SystemExit("known controls must pass for these exact driver bytes first")
    drv, met, ns = load_all()
    out_dir = Path(out_dir)
    os.makedirs(out_dir)
    log = open(out_dir / "progress.jsonl", "x")
    beat = lambda d: (log.write(json.dumps(dict(d, utc=time.strftime("%H:%M:%SZ", time.gmtime()))) + "\n"), log.flush(), print(json.dumps(d), flush=True))
    begun = time.time()
    frozen = json.load(open(drv.TABLE))
    cells = drv.check_table([(c["from"], c["through"]) for c in frozen["cells"]])
    if not (0 <= k < 658):
        raise SystemExit("cell index outside 0..657")
    archive = np.load(ns["ARCHIVE"])
    t0 = time.time()
    table = met.ExpTable(float(archive["lambda_center"]))
    beat(dict(stage="setup", cell=k, pieces=pieces, table_seconds=round(time.time() - t0, 2)))
    res = enclose_v3(drv, met, ns, table, archive, archive["groups"], cells[k], pieces, heartbeat=beat)
    row = frozen["cells"][k]
    out = dict(result="completed", cell_index=k, **res, frozen_row_read_after_computation=dict(residual=row["residual"], midpoint_defect=row["midpoint_defect"]),
               driver_v3_sha256=sha(__file__), known_receipt_sha256=sha(known_path), pins=PINS, wall_seconds=round(time.time() - begun, 3), max_rss_bytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,
               utc=time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()))
    with open(out_dir / ("cell-%03d-pieces%d.json" % (k, pieces)), "x") as fh:
        json.dump(out, fh, indent=1)
    beat(dict(stage="done", cell=k, pieces=pieces, bound=res["independent_defect_bound"], seconds=round(time.time() - begun, 1)))


if __name__ == "__main__":
    a = sys.argv[1:]
    if len(a) == 2 and a[0] == "known":
        known(a[1])
    elif len(a) == 7 and a[0] == "cell" and a[3] == "--cell" and a[5] == "--pieces":
        cell_run(a[1], a[2], int(a[4]), int(a[6]))
    else:
        raise SystemExit("usage: known <out json> | cell <out dir> <known json> --cell <k> --pieces <N>")
