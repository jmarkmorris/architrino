#!/usr/bin/env python
"""Independent, bounded spherical Surface comparison; no production imports.

Run --known-only first and retain that receipt before reading target records.
The existing interaction oracle is immutable; this file owns only a separately
derived sphere projection and retained-polynomial comparison instrument.
"""
from __future__ import annotations

import argparse
import bisect
from fractions import Fraction as Q
import hashlib
import json
from math import comb
from pathlib import Path
import sys
import time

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from oracle import reference_kernel as k
from mpmath import mp

RESIDUAL_LIMIT = "2e-5"
PRECISION_LIMIT = "1e-45"


def require(condition, explanation):
    if not condition:
        raise AssertionError(explanation)


def out(value):
    return mp.nstr(value, 24)


def sphere(x, v, interaction):
    """Derived by twice differentiating X.X=R², without production geometry."""
    r2 = k.dot(x, x)
    normal = k.scale(k.dot(x, interaction) / r2, x)
    tangent = k.subtract(interaction, normal)
    curvature = k.scale(-k.dot(v, v) / r2, x)
    support = k.subtract(curvature, normal)
    return dict(netInteraction=interaction, tangentInteraction=tangent,
                discardedNormal=normal, curvature=curvature, support=support,
                totalAcceleration=k.add(tangent, curvature))


def padd(a, b):
    return [(a[i] if i < len(a) else Q(0)) +
            (b[i] if i < len(b) else Q(0)) for i in range(max(len(a), len(b)))]


def pmul(a, b):
    result = [Q(0)] * (len(a) + len(b) - 1)
    for i, x in enumerate(a):
        for j, y in enumerate(b):
            result[i + j] += x * y
    return result


def pdot(a, b):
    result = [Q(0)]
    for x, y in zip(a, b):
        result = padd(result, pmul(x, y))
    return result


def bernstein(poly, lower, upper):
    """Exact rational power->Bernstein convex-hull range on a closed cell."""
    n = len(poly) - 1
    width = upper - lower
    shifted = [sum((poly[j] * comb(j, i) * lower ** (j - i) * width ** i
                    for j in range(i, n + 1)), Q(0)) for i in range(n + 1)]
    coefficients = [sum((shifted[i] * Q(comb(j, i), comb(n, i))
                         for i in range(j + 1)), Q(0)) for j in range(n + 1)]
    return min(coefficients), max(coefficients)


def dense_range(poly, width, cells=64):
    bounds = [bernstein(poly, width * Q(i, cells), width * Q(i + 1, cells))
              for i in range(cells)]
    return min(lo for lo, _ in bounds), max(hi for _, hi in bounds)


def qmp(value):
    return mp.mpf(value.numerator) / value.denominator


def solve(receiver, source, reception, earliest):
    residual = lambda s: k.causal_residual(receiver, source, reception, s, 1)
    latest = reception - mp.mpf("1e-30")
    require(residual(earliest) < 0, "old-memory endpoint does not cover partner root")
    require(residual(latest) > 0, "partner endpoint sign missing")
    # Safeguarded Newton narrows a declared monotone bracket; the immutable
    # oracle then independently bisects that bracket to the precision target.
    lo, hi = earliest, latest
    guess = (lo + hi) / 2
    for _ in range(16):
        value = residual(guess)
        if value < 0:
            lo = guess
        else:
            hi = guess
        factor = k.normal_factors(receiver, source, reception, guess, 1)[0]
        proposed = guess - value / factor  # oracle residual_S = 1-n.V_source
        guess = proposed if lo < proposed < hi else (lo + hi) / 2
    narrow = mp.power(10, -(mp.dps // 2))
    left, right = max(lo, guess - narrow), min(hi, guess + narrow)
    if not (left < right and residual(left) < 0 and residual(right) > 0):
        left, right = lo, hi
    lo, hi = k.bisect_declared_simple_root(residual, left, right,
                                         mp.power(10, -(mp.dps - 12)))
    root = (lo + hi) / 2
    return root, abs(residual(root))


def controls():
    mp.dps = 100
    receiver = k.inertial_history(("0.1", 0, 0), (0, 0, 0))
    source = k.inertial_history(("-0.1", 0, 0), (0, 0, 0))
    root, residual = solve(receiver, source, mp.mpf("0.05"), mp.mpf("-0.5"))
    require(abs(root + mp.mpf("0.15")) < mp.mpf("1e-85"), "static root known case")
    acceleration = k.sharp_root_acceleration(receiver, source, ".05", root, 1, "1e-6", -1)
    require(k.norm(k.subtract(acceleration, k.vector(("-0.000025", 0, 0)))) < mp.mpf("1e-85"), "static kernel known case")
    parts = sphere(receiver(mp.mpf(0)).position, k.vector((0, ".01", 0)), acceleration)
    require(k.norm(parts["tangentInteraction"]) < mp.mpf("1e-85"), "radial projector known case")
    require(k.norm(k.subtract(parts["totalAcceleration"], k.vector(("-.001", 0, 0)))) < mp.mpf("1e-85"), "curvature known case")
    require(abs(k.dot(receiver(mp.mpf(0)).position, parts["totalAcceleration"]) + mp.mpf(".0001")) < mp.mpf("1e-85"), "sphere second derivative identity")
    wrong = k.add(parts["tangentInteraction"], k.scale(-1, parts["curvature"]))
    require(abs(k.dot(receiver(mp.mpf(0)).position, wrong) + mp.mpf(".0001")) > mp.mpf(".0001"), "wrong-sign negative control not rejected")
    require(bernstein([Q(1), Q(0), Q(0)], Q(0), Q(1)) == (Q(1), Q(1)), "constant Bernstein control")
    # Velocity .5+3t-3t² has safe endpoints and an interior speed 1.25.
    peak = pmul([Q(".5"), Q(3), Q(-3)], [Q(".5"), Q(3), Q(-3)])
    require(dense_range(peak, Q(1))[1] >= Q("1.5625"), "interior speed negative missed")
    require(dense_range([Q(".0001")], Q(1)) == (Q(".0001"), Q(".0001")), "safe speed control")
    prepared = dict(start="-.5", end="0", radius=".1", angularSpeed=".1", speed=".01", phase="0", height="0")
    linear = dict(start="0", end=".1", coefficients=[[".1","0","0","0"],["0",".01","0","0"],["0","0","0","0"]], positionErrors=["0"]*3, velocityErrors=["0"]*3)
    h = History(prepared, [linear])
    require(abs(h(mp.mpf(".05")).position[1]-mp.mpf(".0005")) < mp.mpf("1e-85"), "local cubic history control")
    require(abs(h(mp.mpf("-.1")).position[0]-mp.mpf(".1")*mp.cos(mp.mpf("-.01"))) < mp.mpf("1e-85"), "analytic preparation control")
    print("Known static delayed-root/kernel, radial projector, spherical curvature, wrong-sign and rational Bernstein controls passed before target reads.", file=sys.stderr, flush=True)
    return dict(status="passed", root=out(root), causalResidual=out(residual),
                acceleration=[out(x) for x in acceleration], wrongSignRejected=True,
                interiorSpeedViolationDetected=True)


class History:
    def __init__(self, preparation, retained):
        self.preparation = preparation
        self.segments = retained
        self.starts = [mp.mpf(s["start"]) for s in retained]
        self.data = [(mp.mpf(s["start"]), mp.mpf(s["end"]),
                      [[mp.mpf(c) for c in row] for row in s["coefficients"]]) for s in retained]
        self.prepared_end = mp.mpf(preparation["end"])

    def __call__(self, time):
        p = self.preparation
        if time <= self.prepared_end:
            require(time >= mp.mpf(p["start"]), "point before preparation memory")
            phase = mp.mpf(p.get("phase", "0")) + mp.mpf(p["angularSpeed"]) * time
            r, w = mp.mpf(p["radius"]), mp.mpf(p["angularSpeed"])
            require(Q(p["speed"]) == abs(Q(p["radius"])*Q(p["angularSpeed"])), "circular radius/speed mismatch")
            require(all(mp.mpf(p.get(key,"0")) == 0 for key in ("height", "tiltX", "tiltY")), "reference requires equatorial preparation")
            center = k.vector((0,0,0))
            u, v = k.vector((1,0,0)), k.vector((0,1,0))
            x = k.add(center, k.add(k.scale(r * mp.cos(phase), u), k.scale(r * mp.sin(phase), v)))
            velocity = k.add(k.scale(-r * w * mp.sin(phase), u), k.scale(r * w * mp.cos(phase), v))
            return k.HistoryState(x, velocity)
        index = bisect.bisect_right(self.starts, time) - 1
        start, end, coefficients = self.data[index]
        require(start <= time <= end, "retained point outside continuous coverage")
        d = time - start
        return k.HistoryState(k.vector(c[0] + d * (c[1] + d * (c[2] + d * c[3])) for c in coefficients),
                              k.vector(c[1] + d * (2 * c[2] + d * 3 * c[3]) for c in coefficients))


def boxes_contains(values, boxes, label):
    allowance = mp.mpf("1e-60")  # below point-reference refinement criterion
    for value, interval in zip(values, boxes):
        require(mp.mpf(interval[0]) - allowance <= value <= mp.mpf(interval[1]) + allowance,
                f"{label}: point {out(value)} outside {interval}")


def index_boxes(rows, keys):
    indexed = {}
    for row in rows:
        identity = tuple(row[key] for key in keys)
        indexed.setdefault(identity, []).append(row)
    for identity, values in indexed.items():
        values.sort(key=lambda row: float(row["reception"][0]))
        indexed[identity] = ([float(row["reception"][0]) for row in values], values)
    return indexed


def box_at(indexed, reception, identity):
    starts, rows = indexed[identity]
    candidate = bisect.bisect_right(starts, float(reception))-1
    for i in range(max(0,candidate-1), min(len(rows),candidate+2)):
        lo, hi = map(mp.mpf, rows[i]["reception"])
        if lo <= reception <= hi:
            return rows[i]
    raise AssertionError(f"missing full-slab row at {out(reception)}: {identity}")


def cover(rows, start, end):
    frontier = start
    for row in rows:
        lo, hi = map(mp.mpf, row["reception"])
        require(lo <= frontier + mp.mpf("1e-60"), "full-slab ledger has reception gap")
        frontier = max(frontier, hi)
    require(frontier >= end, "full-slab ledger ends before retained endpoint")


def dense_screen(segment, radius):
    coefficients = [[Q(c) for c in row] for row in segment["coefficients"]]
    velocities = [[(i + 1) * c[i + 1] for i in range(3)] for c in coefficients]
    h = Q(segment["end"]) - Q(segment["start"])
    xx = dense_range(pdot(coefficients, coefficients), h)
    vv = dense_range(pdot(velocities, velocities), h)
    xv = dense_range(pdot(coefficients, velocities), h)
    pe = [mp.mpf(x) for x in segment["positionErrors"]]
    ve = [mp.mpf(x) for x in segment["velocityErrors"]]
    ex, ev = k.norm(pe), k.norm(ve)
    radial = max(abs(mp.sqrt(qmp(xx[0])) - radius), abs(mp.sqrt(qmp(xx[1])) - radius))
    max_x, max_v = mp.sqrt(qmp(xx[1])), mp.sqrt(max(0, qmp(vv[1])))
    lower_x = mp.sqrt(qmp(xx[0])) - ex
    require(lower_x > 0, "dense tube reaches spherical center")
    tangent = max(abs(qmp(xv[0])), abs(qmp(xv[1])))
    return dict(distance=radial + ex,
                tangent=(tangent + max_x * ev + max_v * ex + ex * ev) / lower_x,
                speed=max_v + ev, nominalDistance=radial,
                nominalTangent=tangent / mp.sqrt(qmp(xx[0])), nominalSpeed=max_v)


def evaluate_case(name, request, response, dps):
    mp.dps = dps
    model = request["model"]
    require(model["compositionId"] == "canonical-surface/v1", "wrong composition")
    require(model.get("fieldSpeed", "1") == "1", "reference requires c_f=1")
    require(model["geometry"]["kind"] == "sphere", "reference is sphere only")
    require(model["geometry"].get("center", ["0"] * 3) == ["0"] * 3, "reference requires centered sphere")
    radius = mp.mpf(model["geometry"]["radius"])
    require(len(request["paths"]) == 6 and sorted(p["charge"] for p in request["paths"]) == ["-1"] * 3 + ["1"] * 3, "reference requires 3:3")
    histories = {r["pathId"]: r["segments"] for r in response["checkpoint"]["data"]["histories"]}
    paths = {p["pathId"]: p for p in request["paths"]}
    require(set(histories) == set(paths), "output population mismatch")
    history = {id: History(paths[id]["history"], records) for id, records in histories.items()}
    root_rows = response["ledgers"]["partnerRoots"]
    diagnostics = response["surfaceDiagnostics"]
    solutions = response["ledgers"]["surfaceSolutions"]
    root_index = index_boxes(root_rows, ("receiverPathId", "transmitterPathId"))
    diagnostic_index = index_boxes(diagnostics, ("pathId",))
    maximum = {key: mp.mpf(0) for key in ("distance", "tangent", "speed", "nominalDistance", "nominalTangent", "nominalSpeed", "odeResidual", "causalResidual", "normalLeak", "supportTangentLeak", "interaction", "tangentInteraction", "joinPositionGap", "joinVelocityGap")}
    points, roots, computed = [], 0, 0
    earliest = min(mp.mpf(p["history"]["start"]) for p in paths.values())
    start, end = mp.mpf(request["interval"]["start"]), mp.mpf(response["acceptedCoverage"]["end"])
    require(end == mp.mpf(request["interval"]["end"]), "run did not reach its declared endpoint")
    require(set(root_index) == {(a,b) for a in paths for b in paths if a!=b}, "full-slab ordered partner population missing")
    for _, rows in root_index.values():
        cover(rows, start, end)
    for _, rows in diagnostic_index.values():
        cover(rows, start, end)
    for snapshot in response["ledgers"]["pointRoots"]:
        pairs = {(row["receiverPathId"],row["transmitterPathId"]):row for row in snapshot["pairs"]}
        require(set(pairs) == {(a,b) for a in paths for b in paths}, "point snapshot ordered pair accounting missing")
        require(all(len(row["roots"]) == (0 if a==b else 1) for (a,b),row in pairs.items()), "point snapshot root multiplicity mismatch")
    for id, records in histories.items():
        previous = None
        for seg in records:
            if mp.mpf(seg["end"]) <= start:
                continue
            require(mp.mpf(seg["start"]) >= start, "segment crosses preparation boundary")
            screen = dense_screen(seg, radius)
            for key, value in screen.items():
                maximum[key] = max(maximum[key], value)
            require(screen["speed"] < 1, "full retained tube not subwake")
            if previous:
                require(mp.mpf(previous["end"]) == mp.mpf(seg["start"]), "dense join has time gap")
                h = mp.mpf(previous["end"]) - mp.mpf(previous["start"])
                pc = [[mp.mpf(c) for c in row] for row in previous["coefficients"]]
                left_x = k.vector(c[0] + h * (c[1] + h * (c[2] + h * c[3])) for c in pc)
                left_v = k.vector(c[1] + h * (2*c[2] + h*3*c[3]) for c in pc)
                right_x = k.vector(row[0] for row in seg["coefficients"])
                right_v = k.vector(row[1] for row in seg["coefficients"])
                dx, dv = k.subtract(left_x, right_x), k.subtract(left_v, right_v)
                maximum["joinPositionGap"] = max(maximum["joinPositionGap"], k.norm(dx))
                maximum["joinVelocityGap"] = max(maximum["joinVelocityGap"], k.norm(dv))
                for i in range(3):
                    require(abs(dx[i]) <= mp.mpf(previous["positionErrors"][i]) + mp.mpf(seg["positionErrors"][i]) + mp.mpf("1e-60"), "join position tubes incompatible")
                    require(abs(dv[i]) <= mp.mpf(previous["velocityErrors"][i]) + mp.mpf(seg["velocityErrors"][i]) + mp.mpf("1e-60"), "join velocity tubes incompatible")
            else:
                initial = history[id](start)
                for i in range(3):
                    require(abs(initial.position[i]-mp.mpf(seg["coefficients"][i][0])) <= mp.mpf(seg["positionErrors"][i])+mp.mpf("1e-60"), "prepared endpoint outside first position tube")
                    require(abs(initial.velocity[i]-mp.mpf(seg["coefficients"][i][1])) <= mp.mpf(seg["velocityErrors"][i])+mp.mpf("1e-60"), "prepared endpoint outside first velocity tube")
            previous = seg
            reception = (mp.mpf(seg["start"]) + mp.mpf(seg["end"])) / 2
            receiver = history[id]
            receiver_state = receiver(reception)
            terms, root_values = [], []
            for source_id, source in history.items():
                if source_id == id:
                    continue
                emission, residual = solve(receiver, source, reception, earliest)
                maximum["causalResidual"] = max(maximum["causalResidual"], residual)
                factor = k.normal_factors(receiver, source, reception, emission, 1)[0]
                row = box_at(root_index, reception, (id,source_id))
                boxes_contains((emission, factor), (row["emission"], row["factor"]), "partner root/factor")
                terms.append(k.sharp_root_acceleration(receiver, source, reception, emission, 1,
                             model["coupling"], mp.mpf(paths[id]["charge"])*mp.mpf(paths[source_id]["charge"])))
                root_values.append((source_id, emission, factor))
                roots += 1
                computed += emission > mp.mpf(paths[source_id]["history"]["end"])
            interaction = k.vector(mp.fsum(term[i] for term in terms) for i in range(3))
            parts = sphere(receiver_state.position, receiver_state.velocity, interaction)
            row = box_at(diagnostic_index, reception, (id,))
            for key, value in parts.items():
                boxes_contains(value, row[key], key)
            solution = next(s for s in solutions if s["pathId"] == id and mp.mpf(s["start"]) == mp.mpf(seg["start"]) and mp.mpf(s["end"]) == mp.mpf(seg["end"]))
            boxes_contains(parts["totalAcceleration"], solution["accelerationBound"], "solution acceleration")
            maximum["interaction"] = max(maximum["interaction"], k.norm(interaction))
            maximum["tangentInteraction"] = max(maximum["tangentInteraction"], k.norm(parts["tangentInteraction"]))
            maximum["normalLeak"] = max(maximum["normalLeak"], abs(k.dot(receiver_state.position, parts["tangentInteraction"])))
            maximum["supportTangentLeak"] = max(maximum["supportTangentLeak"], k.norm(k.subtract(parts["support"], k.scale(k.dot(parts["support"], receiver_state.position)/k.dot(receiver_state.position,receiver_state.position), receiver_state.position))))
            offset = reception - mp.mpf(seg["start"])
            acceleration = k.vector(2*mp.mpf(c[2])+6*offset*mp.mpf(c[3]) for c in seg["coefficients"])
            residual = k.norm(k.subtract(acceleration, parts["totalAcceleration"]))
            maximum["odeResidual"] = max(maximum["odeResidual"], residual)
            require(residual <= mp.mpf(RESIDUAL_LIMIT), "independent point ODE residual exceeds predeclared budget")
            points.append(dict(path=id, time=reception, roots=root_values, acceleration=parts["totalAcceleration"]))
        print(f"{name} dps={dps} path={id} midpoint_roots={roots} computed_source_roots={computed}", file=sys.stderr, flush=True)
    require(computed > 0, "computed source history not exercised")
    require(maximum["interaction"] > 0 and maximum["tangentInteraction"] > 0, "interacting receiver-total signal absent")
    require(maximum["distance"] <= mp.mpf(request["numerics"]["surfacePositionTolerance"]), "independent full polynomial+tube distance screen exceeds declared budget")
    require(maximum["tangent"] <= mp.mpf(request["numerics"]["surfaceTangentVelocityTolerance"]), "independent full polynomial+tube tangency screen exceeds declared budget")
    return dict(points=points, maximum=maximum, partnerRoots=roots, computedSourceRoots=computed,
                histories=history, records=histories)


def compare(first, second):
    maximum_x, maximum_v, max_ratio_x, max_ratio_v = [mp.mpf(0)] * 4
    count = 0
    for id, a in first["histories"].items():
        b = second["histories"][id]
        times = sorted(set(t for records in (first["records"][id], second["records"][id]) for seg in records if mp.mpf(seg["start"]) >= 0 for t in (mp.mpf(seg["start"]), (mp.mpf(seg["start"])+mp.mpf(seg["end"]))/2, mp.mpf(seg["end"]))))
        for t in times:
            left, right = a(t), b(t)
            for field, error, metric in (("position", "positionErrors", "x"), ("velocity", "velocityErrors", "v")):
                differences = k.subtract(getattr(left, field), getattr(right, field))
                for i, difference in enumerate(differences):
                    radii = []
                    for records in (first["records"][id], second["records"][id]):
                        matches = [seg for seg in records if mp.mpf(seg["start"]) <= t <= mp.mpf(seg["end"])]
                        radii.append(max(mp.mpf(seg[error][i]) for seg in matches))
                    budget = sum(radii)
                    require(abs(difference) <= budget + mp.mpf("1e-60"), "refined central histories outside summed emitted radii")
                    ratio = abs(difference)/budget if budget else mp.mpf(0)
                    if metric == "x":
                        max_ratio_x = max(max_ratio_x, ratio)
                    else:
                        max_ratio_v = max(max_ratio_v, ratio)
                if metric == "x":
                    maximum_x = max(maximum_x, k.norm(differences))
                else:
                    maximum_v = max(maximum_v, k.norm(differences))
            count += 1
    return dict(commonTimePoints=count, maximumPositionDifference=out(maximum_x), maximumVelocityDifference=out(maximum_v), maximumPositionBudgetRatio=out(max_ratio_x), maximumVelocityBudgetRatio=out(max_ratio_v))


def main():
    parser = argparse.ArgumentParser(__doc__)
    parser.add_argument("--known-only", action="store_true")
    parser.add_argument("--case", action="append", nargs=3, metavar=("NAME", "REQUEST", "RESPONSE"), default=[])
    args = parser.parse_args()
    started = time.monotonic()
    known = controls()  # Always before target reads, even after a prior receipt.
    if args.known_only:
        print(json.dumps(dict(knownControls=known, targetReads=0)))
        return
    require(args.case, "at least one case required")
    summary, evaluated = {}, {}
    for name, request_file, response_file in args.case:
        raw_request, raw_response = Path(request_file).read_bytes(), Path(response_file).read_bytes()
        request, response = json.loads(raw_request), json.loads(raw_response)
        request = request.get("request", request)
        coarse = evaluate_case(name, request, response, 70)
        fine = evaluate_case(name, request, response, 100)
        root_difference, acceleration_difference = mp.mpf(0), mp.mpf(0)
        for a, b in zip(coarse["points"], fine["points"]):
            require(a["path"] == b["path"] and abs(a["time"]-b["time"]) < mp.mpf("1e-60"), "precision point ordering mismatch")
            acceleration_difference = max(acceleration_difference, k.norm(k.subtract(a["acceleration"], b["acceleration"])))
            for x, y in zip(a["roots"], b["roots"]):
                root_difference = max(root_difference, abs(x[1]-y[1]), abs(x[2]-y[2]))
        require(root_difference < mp.mpf(PRECISION_LIMIT) and acceleration_difference < mp.mpf(PRECISION_LIMIT), "precision refinement disagreement")
        summary[name] = dict(requestSha256=hashlib.sha256(raw_request).hexdigest(), responseSha256=hashlib.sha256(raw_response).hexdigest(), midpointPoints=len(fine["points"]), partnerRoots=fine["partnerRoots"], computedSourceRoots=fine["computedSourceRoots"], maximum={key:out(value) for key,value in fine["maximum"].items()}, precisionRootFactorDifference=out(root_difference), precisionAccelerationDifference=out(acceleration_difference))
        evaluated[name] = fine
    names = list(evaluated)
    comparisons = {f"{a}:{b}": compare(evaluated[a], evaluated[b]) for a,b in zip(names,names[1:])}
    print(json.dumps(dict(schema="surface-stage-d-independent-reference/v1", status="passed", knownControls=known, sourceSha256=hashlib.sha256(Path(__file__).read_bytes()).hexdigest(), oracleSha256=hashlib.sha256(Path(k.__file__).read_bytes()).hexdigest(), residualLimit=RESIDUAL_LIMIT, precisionLimit=PRECISION_LIMIT, referencePrecisions=[70,100], cases=summary, refinementComparisons=comparisons, wallSeconds=time.monotonic()-started, scope="Independent sharp partner point roots/kernel/spherical projection and midpoint ODE residual; rational full-segment nominal polynomial screens plus declared tubes; no independent full-slab solution-inclusion proof, stability or physical acceptance.")))


if __name__ == "__main__":
    main()
