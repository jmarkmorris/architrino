"""Qualification runner for the prototype validated far-step carrier.

Truth references here are written separately from the carrier and use no
carrier arithmetic: closed-form brackets for static pasts, a change-of-variable
bracket for the oscillating control at small times, and the frozen bracket
instrument at t = 2. c_f = 1 throughout. The static known cases run first and
the script exits 2 if any of them fails, before any target is evaluated.

Usage: python <this file> [--long-step-denominator N]   (default 256)
"""
import importlib.util
import json
import pathlib
import sys
from fractions import Fraction as Q

HERE = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import matched_pair_stage_3_validated_far_step_carrier as vfs  # noqa: E402

spec = importlib.util.spec_from_file_location(
    "frozen_bound", HERE / "matched-pair-stage-3-aliasing-control-bound.py")
frozen = importlib.util.module_from_spec(spec)
spec.loader.exec_module(frozen)

ZERO = (Q(0), Q(0), Q(0), Q(0))
RESULTS = []


def record(name, passed, detail):
    RESULTS.append({"check": name, "passed": bool(passed), "detail": detail})
    print(f"  {'PASS' if passed else 'FAIL'}  {name}: {detail}")
    return bool(passed)


def sci(x):
    return f"{float(x):.9e}"


def segment(t0, t1, coefficients, provenance="exact_prescribed"):
    return {"t0": Q(t0), "t1": Q(t1),
            "c": [tuple(Q(v) for v in axis) for axis in coefficients],
            "rx": [Q(0)] * 3, "rv": [Q(0)] * 3, "provenance": provenance}


def static_path(name, charge, position, start=-20):
    return {"id": name, "charge": Q(charge), "segments": [segment(
        start, 0, [(Q(x), 0, 0, 0) for x in position])]}


def oscillating_source(A, start=-20):
    """z = 10 + A p(S), p of period 1, exact C1 piecewise cubic."""
    A = Q(A)
    segments = []
    for twice in range(2 * start, 0):
        rising = twice % 2 == 0
        cz = (10, 0, 12 * A, -16 * A) if rising else (10 + A, 0, -12 * A, 16 * A)
        segments.append(segment(Q(twice, 2), Q(twice + 1, 2), [ZERO, ZERO, cz]))
    return {"id": "source", "charge": Q(1), "segments": segments}


def end_tube(path):
    X, V = vfs.end_section(path)
    return X, V


def contains(interval, bracket):
    return interval.lo <= bracket[0] and bracket[1] <= interval.hi


def intersects(interval, bracket):
    return interval.lo <= bracket[1] and bracket[0] <= interval.hi


# ---------------------------------------------------------------- truths ----
def static_axis_truth(kappa, R, t):
    """Receiver from rest at distance R from a static same-sign source past.

    The motion stays on the line through the source, away from it. With
    zeta >= 0 the displacement, the acceleration magnitude is
    kappa / (R + zeta)^2. First, a <= kappa / R^2 gives zeta(s) <= c_hi s^2,
    c_hi = kappa / (2 R^2), and with delta = c_hi t^2, a >= kappa / (R+delta)^2
    gives zeta(s) >= c_lo s^2, c_lo = kappa / (2 (R + delta)^2), for s <= t.
    Second, for x = zeta / R in [0, 1), 1 - 2x <= (1 + x)^-2 <= 1 - 2x + 3x^2,
    so a(s) lies between (kappa / R^2)(1 - 2 c_hi s^2 / R) and
    (kappa / R^2)(1 - 2 c_lo s^2 / R + 3 c_hi^2 s^4 / R^2). Integrating once
    and twice gives the speed and displacement brackets returned here. The
    same bracket holds for the source, which reads the receiver's static past.
    """
    c_hi = kappa / (2 * R * R)
    delta = c_hi * t * t
    if not delta < R:
        raise ValueError("outside the static bracket's domain")
    c_lo = kappa / (2 * (R + delta) ** 2)
    scale = kappa / (R * R)
    speed = (scale * (t - 2 * c_hi * t ** 3 / (3 * R)),
             scale * (t - 2 * c_lo * t ** 3 / (3 * R)
                      + 3 * c_hi ** 2 * t ** 5 / (5 * R * R)))
    shift = (scale * (t * t / 2 - c_hi * t ** 4 / (6 * R)),
             scale * (t * t / 2 - c_lo * t ** 4 / (6 * R)
                      + c_hi ** 2 * t ** 6 / (10 * R * R)))
    return speed, shift


def p_rise(u):
    return 12 * u * u - 16 * u ** 3


def oscillating_truth(A, kappa, t, cells=2000):
    """Receiver end state at 0 < t <= 1/4 for the oscillating control.

    Fixed receiver: with u = S + R, reception time is t(u) = u + A p(u),
    increasing, and integral_0^t a dt' = -kappa integral_0^{u(t)} g du,
    g = 1 / (R + A p)^2, decreasing on [0, 1/2]. The position integral has the
    weight (t - t(u)), also decreasing and nonnegative on [0, u(t)]. u(t) is
    bracketed by bisection; left and right Riemann sums bracket the integrals.
    Receiver motion adds at most kappa^2 L t^3 / (6 R^2 (1 - 3A)) in velocity
    and kappa^2 L t^4 / (24 R^2 (1 - 3A)) in position, as in addendum 1.
    """
    R = Q(10)
    A, kappa, t = Q(A), Q(kappa), Q(t)
    if not (0 < t <= Q(1, 4) and 3 * A < 1):
        raise ValueError("outside the bracket's domain")
    t_of = lambda u: u + A * p_rise(u)
    lo, hi = Q(0), Q(1, 2)
    for _ in range(90):
        mid = (lo + hi) / 2
        if t_of(mid) <= t:
            lo = mid
        else:
            hi = mid
    g = lambda u: 1 / (R + A * p_rise(u)) ** 2
    f = lambda u: (t - t_of(u)) * g(u)
    w_lo, w_hi = lo / cells, hi / cells
    v_lower = sum(vfs.down(g((k + 1) * w_lo) * w_lo) for k in range(cells))
    v_upper = sum(vfs.up(g(k * w_hi) * w_hi) for k in range(cells))
    z_lower = sum(vfs.down(f((k + 1) * w_lo) * w_lo) for k in range(cells))
    z_upper = (sum(vfs.up(f(k * w_lo) * w_lo) for k in range(cells))
               + vfs.up((hi - lo) * f(lo)))
    floor = 1 - 3 * A
    L = 2 / (R ** 3 * floor ** 2) + 24 * A / (R ** 2 * floor ** 3)
    dv = kappa ** 2 * L * t ** 3 / (6 * R ** 2 * floor)
    dz = kappa ** 2 * L * t ** 4 / (24 * R ** 2 * floor)
    return ((-kappa * v_upper - dv, -kappa * v_lower + dv),
            (-kappa * z_upper - dz, -kappa * z_lower + dz))


# ----------------------------------------------------------------- cases ----
KAPPA = Q(1, 1000)
BUDGETS = {"position": Q(1, 10 ** 8), "velocity": Q(1, 10 ** 8)}
SMALL = Q(1, 128)


def advance(paths, T, h, steps, budgets):
    certificates = []
    for k in range(steps):
        certificate = vfs.step(paths, T + k * h, h, KAPPA, budgets)
        certificates.append(certificate)
        if certificate["status"] != "certified":
            break
        paths = vfs.extend(paths, certificate)
    return paths, certificates


def known_static_axis():
    print("\nK1 known case: static past on the axis, one step of 1/128")
    paths = [static_path("receiver", 1, (0, 0, 0)),
             static_path("source", 1, (0, 0, 10))]
    paths, certs = advance(paths, Q(0), SMALL, 1, BUDGETS)
    ok = record("K1 certified within budgets", certs[0]["status"] == "certified",
                certs[0]["code"] or "certified")
    if not ok:
        return False
    speed, shift = static_axis_truth(KAPPA, Q(10), SMALL)
    X, V = end_tube(paths[0])
    ok &= record("K1 receiver velocity tube contains analytic bracket",
                 contains(V[2], (-speed[1], -speed[0])),
                 f"tube [{sci(V[2].lo)}, {sci(V[2].hi)}], bracket"
                 f" [{sci(-speed[1])}, {sci(-speed[0])}]")
    ok &= record("K1 receiver position tube contains analytic bracket",
                 contains(X[2], (-shift[1], -shift[0])),
                 f"tube [{sci(X[2].lo)}, {sci(X[2].hi)}]")
    X, V = end_tube(paths[1])
    ok &= record("K1 source velocity tube contains analytic bracket",
                 contains(V[2], speed), f"tube [{sci(V[2].lo)}, {sci(V[2].hi)}]")
    ok &= record("K1 source position tube contains analytic bracket",
                 contains(X[2], (10 + shift[0], 10 + shift[1])),
                 f"tube [{sci(X[2].lo)}, {sci(X[2].hi)}]")
    g = certs[0]["detail"]["radius_growth"]["receiver"]
    record("K1 radius growth", True,
           f"position {sci(g['position'])}, velocity {sci(g['velocity'])}")
    return ok


def known_static_oblique():
    print("\nK2 known case: static past off the axes, source at (3, 4, 0)")
    paths = [static_path("receiver", 1, (0, 0, 0)),
             static_path("source", 1, (3, 4, 0))]
    paths, certs = advance(paths, Q(0), SMALL, 1, BUDGETS)
    ok = record("K2 certified within budgets", certs[0]["status"] == "certified",
                certs[0]["code"] or "certified")
    if not ok:
        return False
    speed, shift = static_axis_truth(KAPPA, Q(5), SMALL)
    X, V = end_tube(paths[0])
    for axis, direction in ((0, Q(3, 5)), (1, Q(4, 5))):
        ok &= record(f"K2 receiver velocity axis {axis} contains bracket",
                     contains(V[axis], (-speed[1] * direction,
                                        -speed[0] * direction)),
                     f"tube [{sci(V[axis].lo)}, {sci(V[axis].hi)}]")
        ok &= record(f"K2 receiver position axis {axis} contains bracket",
                     contains(X[axis], (-shift[1] * direction,
                                        -shift[0] * direction)),
                     f"tube [{sci(X[axis].lo)}, {sci(X[axis].hi)}]")
    ok &= record("K2 receiver z components contain zero",
                 contains(V[2], (0, 0)) and contains(X[2], (0, 0)), "exact zero")
    return ok


def known_truth_bracket():
    print("\nK3 known case for the oscillating-truth bracket: amplitude 0")
    v, z = oscillating_truth(0, KAPPA, SMALL)
    exact_v = -KAPPA * SMALL / 100
    exact_z = -KAPPA * SMALL * SMALL / 200
    ok = record("K3 velocity bracket contains -kappa t / R^2 minus correction",
                v[0] <= exact_v <= v[1] and v[1] - v[0] < Q(1, 10 ** 15),
                f"[{sci(v[0])}, {sci(v[1])}]")
    # The position integrand is not constant even when A = 0, so its Riemann
    # bracket has relative width 2 / cells; require containment and that width.
    ok &= record("K3 position bracket contains -kappa t^2 / (2 R^2)",
                 z[0] <= exact_z <= z[1]
                 and z[1] - z[0] <= 3 * abs(exact_z) / 2000,
                 f"[{sci(z[0])}, {sci(z[1])}], exact {sci(exact_z)}")
    return ok


def target_small_and_two_step():
    print("\nT1/T2 adversarial control past, steps of 1/128 with budgets 1e-8")
    paths = [static_path("receiver", 1, (0, 0, 0)), oscillating_source(Q(1, 5))]
    paths1, certs1 = advance(paths, Q(0), SMALL, 1, BUDGETS)
    ok = record("T1 first step certified within budgets",
                certs1[0]["status"] == "certified",
                certs1[0]["code"] or "certified")
    if not ok:
        return False
    g = certs1[0]["detail"]["radius_growth"]["receiver"]
    record("T1 receiver radius growth", True,
           f"position {sci(g['position'])}, velocity {sci(g['velocity'])};"
           f" budgets {sci(BUDGETS['position'])}, {sci(BUDGETS['velocity'])}")
    v, z = oscillating_truth(Q(1, 5), KAPPA, SMALL)
    X1, V1 = end_tube(paths1[0])
    ok &= record("T1 receiver velocity tube contains true bracket",
                 contains(V1[2], v),
                 f"tube [{sci(V1[2].lo)}, {sci(V1[2].hi)}], true"
                 f" [{sci(v[0])}, {sci(v[1])}]")
    ok &= record("T1 receiver position tube contains true bracket",
                 contains(X1[2], z),
                 f"tube [{sci(X1[2].lo)}, {sci(X1[2].hi)}], true"
                 f" [{sci(z[0])}, {sci(z[1])}]")
    speed, shift = static_axis_truth(KAPPA, Q(10), SMALL)
    Xs, Vs = end_tube(paths1[1])
    ok &= record("T1 source tubes contain analytic bracket",
                 contains(Vs[2], speed)
                 and contains(Xs[2], (10 + shift[0], 10 + shift[1])),
                 f"velocity tube [{sci(Vs[2].lo)}, {sci(Vs[2].hi)}]")

    paths2, certs2 = advance(paths1, SMALL, SMALL, 1, BUDGETS)
    ok &= record("T2 second step certified within budgets",
                 certs2[0]["status"] == "certified",
                 certs2[0]["code"] or "certified")
    if certs2[0]["status"] != "certified":
        return False
    seg1 = paths2[0]["segments"][-2]
    seg2 = paths2[0]["segments"][-1]
    inherited = seg1["rx"][2] > 0 and seg1["rv"][2] > 0
    ok &= record("T2 second step inherits nonzero position and velocity radii",
                 inherited, f"inherited radii position {sci(seg1['rx'][2])},"
                 f" velocity {sci(seg1['rv'][2])}")
    ok &= record("T2 radii do not shrink across the join",
                 all(seg2["rx"][a] >= seg1["rx"][a]
                     and seg2["rv"][a] >= seg1["rv"][a] for a in range(3)),
                 f"second-step radii position {sci(seg2['rx'][2])},"
                 f" velocity {sci(seg2['rv'][2])}")
    # The second step's start section must be the first step's end section.
    L = seg1["t1"] - seg1["t0"]
    end1 = vfs.shifted(seg1["c"][2], L)
    start_tube = vfs.I(seg2["c"][2][0] - seg2["rx"][2],
                       seg2["c"][2][0] + seg2["rx"][2])
    end_tube1 = vfs.I(end1[0] - seg1["rx"][2], end1[0] + seg1["rx"][2])
    ok &= record("T2 start tube of step two contains end tube of step one",
                 start_tube.contains(end_tube1), "position, z axis")
    v, z = oscillating_truth(Q(1, 5), KAPPA, 2 * SMALL)
    X2, V2 = end_tube(paths2[0])
    ok &= record("T2 receiver velocity tube contains true bracket at 2h",
                 contains(V2[2], v),
                 f"tube [{sci(V2[2].lo)}, {sci(V2[2].hi)}], true"
                 f" [{sci(v[0])}, {sci(v[1])}]")
    ok &= record("T2 receiver position tube contains true bracket at 2h",
                 contains(X2[2], z),
                 f"tube [{sci(X2[2].lo)}, {sci(X2[2].hi)}]")
    return ok


def target_long_run(denominator):
    h = Q(1, denominator)
    steps = 2 * denominator
    print(f"\nT3 adversarial control past, {steps} steps of 1/{denominator}"
          " to t = 2 with budgets 1e-8")
    paths = [static_path("receiver", 1, (0, 0, 0)), oscillating_source(Q(1, 5))]
    paths, certs = advance(paths, Q(0), h, steps, BUDGETS)
    ok = record("T3 every step certified within budgets",
                len(certs) == steps and certs[-1]["status"] == "certified",
                f"{sum(c['status'] == 'certified' for c in certs)} of {steps};"
                f" last code {certs[-1]['code'] or 'none'}")
    if not ok:
        return False
    truth = frozen.bracket({"amplitude": "0.2", "coupling": "0.001",
                            "step": "2"})
    X, V = end_tube(paths[0])
    ok &= record("T3 receiver velocity tube intersects the frozen true bracket",
                 intersects(V[2], truth["v_true"]),
                 f"tube [{sci(V[2].lo)}, {sci(V[2].hi)}], half-width"
                 f" {sci(V[2].rad())}; true [{sci(truth['v_true'][0])},"
                 f" {sci(truth['v_true'][1])}]")
    ok &= record("T3 receiver position tube intersects the frozen true bracket",
                 intersects(X[2], truth["z_true"]),
                 f"tube [{sci(X[2].lo)}, {sci(X[2].hi)}], half-width"
                 f" {sci(X[2].rad())}; true [{sci(truth['z_true'][0])},"
                 f" {sci(truth['z_true'][1])}]")
    record("T3 velocity tube contains the whole true bracket",
           True, str(contains(V[2], truth["v_true"])))
    aliased = None
    with open(HERE / "matched-pair-stage-3-aliasing-control-runs.jsonl",
              encoding="utf-8") as handle:
        for line in handle:
            row = json.loads(line)
            if (row.get("mode") == "evolve" and row["amplitude"] == "0.2"
                    and row["step"] == "2" and row["status"] == "completed"):
                aliased = next(p for p in row["paths"]
                               if p["path"] == "receiver")
    published = (Q(aliased["velocity_z"][0]), Q(aliased["velocity_z"][1]))
    separation = max(V[2].lo - published[1], published[0] - V[2].hi)
    record("T3 validated velocity tube versus the solver's aliased interval",
           True, f"aliased [{sci(published[0])}, {sci(published[1])}];"
           f" {'disjoint, separation ' + sci(separation) if separation > 0 else 'overlapping'}")
    speed, shift = static_axis_truth(KAPPA, Q(10), Q(2))
    Xs, Vs = end_tube(paths[1])
    ok &= record("T3 source tubes contain analytic bracket",
                 contains(Vs[2], speed)
                 and contains(Xs[2], (10 + shift[0], 10 + shift[1])),
                 f"velocity tube [{sci(Vs[2].lo)}, {sci(Vs[2].hi)}]")
    growth = max(c["detail"]["radius_growth"]["receiver"]["velocity"]
                 for c in certs)
    record("T3 largest per-step velocity radius growth", True, sci(growth))
    return ok


def target_adversarial_step():
    print("\nT4 the adversarial step itself: one step of 2")
    paths = [static_path("receiver", 1, (0, 0, 0)), oscillating_source(Q(1, 5))]
    unbudgeted = vfs.step(paths, 0, 2, KAPPA, None)
    ok = record("T4 hypotheses hold without a budget",
                unbudgeted["status"] == "certified",
                unbudgeted["code"] or "certified")
    if unbudgeted["status"] == "certified":
        truth = frozen.bracket({"amplitude": "0.2", "coupling": "0.001",
                                "step": "2"})
        X, V = end_tube(vfs.extend(paths, unbudgeted)[0])
        ok &= record("T4 unbudgeted tube contains the frozen true bracket",
                     contains(V[2], truth["v_true"])
                     and contains(X[2], truth["z_true"]),
                     f"velocity tube [{sci(V[2].lo)}, {sci(V[2].hi)}]")
    budgeted = vfs.step(paths, 0, 2, KAPPA, BUDGETS)
    ok &= record("T4 declined under the declared budgets",
                 budgeted["status"] == "declined"
                 and budgeted["code"] == "VFS-BUDGET-01"
                 and budgeted["published"] is None, budgeted["code"])
    return ok


def negatives():
    print("\nN decline cases: each must return no published continuation")
    ok = True

    def expect(name, certificate, code):
        nonlocal ok
        good = (certificate["status"] == "declined"
                and certificate["code"] == code
                and certificate["published"] is None)
        try:
            vfs.extend([], certificate)
            good = False
        except ValueError:
            pass
        ok &= record(name, good, f"{certificate['code']}:"
                     f" {certificate['reason']}")

    receiver = static_path("receiver", 1, (0, 0, 0))
    source = static_path("source", 1, (0, 0, 10))
    estimated = static_path("source", 1, (0, 0, 10))
    estimated["segments"][0]["provenance"] = "step_doubling_estimate"
    expect("N1 unvalidated provenance", vfs.step(
        [receiver, estimated], 0, SMALL, KAPPA, BUDGETS), "VFS-H0-01")
    radius = static_path("source", 1, (0, 0, 10))
    radius["segments"][0]["rx"] = [Q(0), Q(0), Q(1, 10 ** 6)]
    expect("N2 prescribed segment carrying a radius", vfs.step(
        [receiver, radius], 0, SMALL, KAPPA, BUDGETS), "VFS-H0-01")
    corner = {"id": "source", "charge": Q(1), "segments": [
        segment(-20, -10, [ZERO, ZERO, (10, 0, 0, 0)]),
        segment(-10, 0, [ZERO, ZERO, (10, Q(1, 10), 0, 0)])]}
    expect("N3 prescribed join with a velocity corner", vfs.step(
        [receiver, corner], 0, SMALL, KAPPA, BUDGETS), "VFS-H0-01")
    expect("N4 past at or above field speed", vfs.step(
        [receiver, oscillating_source(Q(17, 50))], 0, SMALL, KAPPA, BUDGETS),
        "VFS-H1-01")
    expect("N5 step longer than the separation", vfs.step(
        [receiver, source], 0, 12, KAPPA, None), "VFS-H2-01")
    shallow_r = static_path("receiver", 1, (0, 0, 0), start=-10)
    shallow_s = static_path("source", 1, (0, 0, 10), start=-10)
    expect("N6 root on the retained boundary: neither present nor absent",
           vfs.step([shallow_r, shallow_s], 0, SMALL, KAPPA, BUDGETS),
           "VFS-H3-01")
    expect("N7 strong coupling: step velocity box reaches field speed",
           vfs.step([receiver, source], 0, 2, Q(200), None), "VFS-H1-01")
    expect("N8 enclosure iteration limit", vfs.step(
        [receiver, source], 0, SMALL, KAPPA, BUDGETS, max_iterations=1),
        "VFS-H5-01")
    expect("N9 budget exceeded on a wide step", vfs.step(
        [receiver, oscillating_source(Q(1, 5))], 0, Q(1, 4), KAPPA, BUDGETS),
        "VFS-BUDGET-01")

    absent_r = static_path("receiver", 1, (0, 0, 0), start=-5)
    absent_s = static_path("source", 1, (0, 0, 10), start=-5)
    certificate = vfs.step([absent_r, absent_s], 0, SMALL, KAPPA, BUDGETS)
    zero = certificate["status"] == "certified" and all(
        a.lo == 0 == a.hi
        for a in certificate["detail"]["acceleration_boxes"]["receiver"])
    ok &= record("P1 both pairs certified absent: zero acceleration", zero,
                 "conditional on the retained window being the complete"
                 " emission domain")
    return ok


def main(argv):
    denominator = 256
    if len(argv) == 3 and argv[1] == "--long-step-denominator":
        denominator = int(argv[2])
    known = known_static_axis()
    known &= known_static_oblique()
    known &= known_truth_bracket()
    if not known:
        print("\nKNOWN CASE FAILED; no target evaluated.")
        raise SystemExit(2)
    print("\nKnown cases passed before any target.")
    ok = target_small_and_two_step()
    ok &= target_adversarial_step()
    ok &= negatives()
    ok &= target_long_run(denominator)
    passed = sum(r["passed"] for r in RESULTS)
    print(f"\n{passed} of {len(RESULTS)} checks passed.")
    out = HERE / "matched-pair-stage-3-validated-far-step-qualification.json"
    out.write_text(json.dumps({
        "schema": "validated_far_step_prototype_qualification/v1",
        "long_step_denominator": denominator, "all_passed": bool(ok),
        "checks": RESULTS}, indent=1) + "\n", encoding="utf-8")
    raise SystemExit(0 if ok else 1)


if __name__ == "__main__":
    main(sys.argv)
