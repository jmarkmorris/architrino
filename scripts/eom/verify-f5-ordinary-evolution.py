#!/usr/bin/env python3
"""Independent exact-rational checks on published F5 cubic histories.

This reference imports no EOM, producer, transport, or other numerical oracle.
Bernstein convex-hull bounds apply to the serialized nominal polynomials plus
their stated errors. They do not prove those errors enclose the EOM solution;
that obligation belongs to a separately frozen dynamical reference check.
"""

from __future__ import annotations

import argparse
from bisect import bisect_left
from fractions import Fraction as F
from hashlib import sha256
import json
from math import comb, isfinite, isqrt, nextafter
import os
from pathlib import Path
import re
import stat
import sys
import time


HANDOFF_SHA = "4e0696a848a0d36ccbe5948295e71738c933b7ea120e9aee00e2effdd6ecc149"
SCHEMA = "braid-program/f5-ordinary-evolution-outcome-check.v1"
DECLARATION_SCHEMA = "braid-program/f5-ordinary-evolution-declaration.v1"
GRADE = "executable_architecture_evidence"
TOKEN = re.compile(r"[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?\Z")


class CheckError(ValueError):
    pass


def require(condition, message):
    if not condition:
        raise CheckError(message)


def exact(token):
    require(isinstance(token, str) and len(token) <= 512 and TOKEN.fullmatch(token),
            "finite bounded decimal string required")
    exponent = token.lower().split("e")
    require(len(exponent) == 1 or abs(int(exponent[1])) <= 1000,
            "decimal exponent exceeds checker bound")
    return F(token)


def ratio(value):
    return {"numerator": str(value.numerator), "denominator": str(value.denominator)}


def interval_record(pair):
    return {"lower": ratio(pair[0]), "upper": ratio(pair[1])}


def sqrt_decimal_bounds(pair, places=18):
    """Directed integer square roots, without floating-point rounding."""
    require(0 <= pair[0] <= pair[1], "invalid squared interval")
    scale = 10 ** places
    a = isqrt(pair[0].numerator * scale * scale // pair[0].denominator)
    b = isqrt(pair[1].numerator * scale * scale // pair[1].denominator)
    if F(b * b, scale * scale) < pair[1]:
        b += 1
    def token(integer):
        text = str(integer).zfill(places + 1)
        return text[:-places] + "." + text[-places:]
    return {"lower": token(a), "upper": token(b)}


def polynomial(coefficients, time):
    result = F(0)
    for c in reversed(coefficients):
        result = result * time + c
    return result


def bernstein(coefficients, lower, upper):
    """Exact power-to-Bernstein conversion after u = lower+(upper-lower)*s.

    For degree n, shifted power a_k gives b_i=sum_{k<=i}
    a_k*C(i,k)/C(n,k). On 0<=s<=1 the polynomial is a convex
    combination of b_i, so min(b_i),max(b_i) enclose every value.
    """
    require(lower <= upper, "reversed polynomial interval")
    n = len(coefficients) - 1
    power = [sum(coefficients[j] * comb(j, k) * lower ** (j-k)
                 for j in range(k, n+1)) * (upper-lower) ** k
             for k in range(n+1)]
    values = [sum(power[k] * F(comb(i, k), comb(n, k))
                  for k in range(i+1)) for i in range(n+1)]
    return min(values), max(values)


def inflate(box, error):
    return box[0]-error, box[1]+error


def norm_squared(boxes):
    lower = sum(F(0) if lo <= 0 <= hi else min(lo*lo, hi*hi) for lo, hi in boxes)
    upper = sum(max(lo*lo, hi*hi) for lo, hi in boxes)
    return lower, upper


def difference(left, right):
    return [(a[0]-b[1], a[1]-b[0]) for a, b in zip(left, right)]


class Segment:
    def __init__(self, record):
        self.start = exact(record["startTime"])
        self.end = exact(record["endTime"])
        self.end_token = record["endTime"]
        require(self.start < self.end, "degenerate segment")
        rows = record["coefficients"]
        require(len(rows) == 3 and all(len(row) == 4 for row in rows), "3 by 4 coefficients required")
        self.coefficients = tuple(tuple(exact(t) for t in row) for row in rows)
        self.position_errors = tuple(exact(t) for t in record["positionErrors"])
        self.velocity_errors = tuple(exact(t) for t in record["velocityErrors"])
        require(len(self.position_errors) == len(self.velocity_errors) == 3,
                "three error radii required")
        require(min(self.position_errors + self.velocity_errors) >= 0, "negative error radius")

    def boxes(self, a, b, velocity=False):
        require(self.start <= a <= b <= self.end, "evaluation outside segment")
        rows = self.coefficients
        errors = self.position_errors
        if velocity:
            rows = [tuple(k*row[k] for k in range(1, 4)) for row in rows]
            errors = self.velocity_errors
        return [inflate(bernstein(row, a-self.start, b-self.start), error)
                for row, error in zip(rows, errors)]


def segment_at(segments, time):
    i = bisect_left([s.end for s in segments], time)
    require(i < len(segments) and segments[i].start <= time, "uncovered evaluation time")
    return segments[i]


def check_join(left, right):
    require(left.end == right.start, "segment gap or overlap")
    for velocity in (False, True):
        a = left.boxes(left.end, left.end, velocity)
        b = right.boxes(right.start, right.start, velocity)
        require(all(max(x[0], y[0]) <= min(x[1], y[1]) for x, y in zip(a, b)),
                "disjoint position/velocity join enclosures")


def _no_duplicates(pairs):
    result = {}
    for key, value in pairs:
        require(key not in result, "duplicate JSON key")
        result[key] = value
    return result


def read_bound(path, limit=256*1024*1024):
    """Capture one ordinary file without following a final-component symlink."""
    path = Path(path).absolute()
    fd = os.open(path, os.O_RDONLY | os.O_NOFOLLOW | os.O_NONBLOCK)
    try:
        before = os.fstat(fd)
        require(stat.S_ISREG(before.st_mode) and before.st_size <= limit, "input must be a bounded regular file")
        with os.fdopen(fd, "rb", closefd=False) as stream:
            data = stream.read(limit+1)
        after = os.fstat(fd)
        signature = lambda s: (s.st_dev, s.st_ino, s.st_size, s.st_mtime_ns, s.st_ctime_ns)
        require(signature(before) == signature(after) and len(data) == before.st_size,
                "input changed during capture")
    finally:
        os.close(fd)
    record = json.loads(data, object_pairs_hook=_no_duplicates,
                        parse_constant=lambda _: (_ for _ in ()).throw(CheckError("nonfinite JSON")))
    return record, {"path": str(path), "sha256": sha256(data).hexdigest(), "bytes": len(data)}


def authenticate_request(prepared, handoff, declaration):
    """Compare supplied past tokens with the independently accepted handoff."""
    require(prepared["schema"] == "braid-program/ordinary-evolution-request-preparation.v1", "request preparation schema")
    source, request = prepared["input"], prepared["transportRequest"]
    require(source["candidateId"] == "f5" and source["releaseTime"] == "0" and source["historyCoverageStart"] == "-1", "F5 release/domain")
    require(handoff["normalizedFieldSpeed"] == "1" and handoff["releaseTime"] == "0" and handoff["retainedInterval"] == ["-1", "0"], "handoff domain")
    require(request["runGrade"] == "certified" and request["absoluteTimeInterval"] == {"start": "0", "end": source["settings"]["endTime"]}, "request grade/domain")
    model = request["modelControls"]
    require(model["fieldSpeed"] == "1" and model["futurePathPolicy"] == "prohibited" and model["selfPairs"] == "included-except-coincident-endpoint", "model conditions")
    require(request["resourceEnvelope"]["causalHistoryRetention"] is None, "history retirement is outside this checker")
    require(request["certifiedBudget"]["allocations"]["ordinary"]["chartPolicy"] == "sharp", "sharp chart required")
    strength = source["settings"]["strength"]
    q, k, coupling = [exact(strength[key]) for key in ("chargeMagnitude", "effectiveStrength", "coupling")]
    require(q > 0 and coupling > 0 and k == coupling*q*q and model["coupling"] == strength["coupling"], "strength factorization")
    require(request["numericalControls"] == source["settings"]["numericalControls"] and request["certifiedBudget"] == source["settings"]["certifiedBudget"], "settings mismatch")
    science = declaration["scientificConditions"]
    require(science["candidateId"] == "f5" and science["releaseTime"] == "0" and science["historyStart"] == "-1" and science["fieldSpeed"] == "1" and science["chartPolicy"] == "sharp", "declared scientific conditions")
    require(science["endTime"] == source["settings"]["endTime"], "declared horizon mismatch")
    authorization = declaration["authorization"]
    require(all(authorization[key] == strength[key] for key in ("effectiveStrength", "chargeMagnitude", "coupling")), "strength differs from declaration")
    numerical = source["settings"]["numericalControls"]
    matches = [rung for rung in declaration["rungs"] if all(numerical.get(key) == value for key, value in rung.items() if key != "id")]
    require(len(matches) == 1, "request must match exactly one declared numerical rung")
    common = declaration["commonNumericalControls"]
    require(numerical["useAdaptiveStepGrowth"] == common["useAdaptiveStepGrowth"] and numerical["threadCount"] == common["workerThreads"] and numerical["farFieldEnclosureFraction"] == common["farFieldEnclosureFraction"], "common numerical controls mismatch")
    require(len(source["histories"]) == len(request["histories"]) == len(handoff["members"]) == 12, "ordered twelve-member census")
    histories = []
    for i, (member, original, transport) in enumerate(zip(handoff["members"], source["histories"], request["histories"])):
        require(member["index"] == i and original["pathId"] == member["worldlineId"] == transport["pathId"], "member order/identity")
        require(original["sourceHistoryId"] == member["restrictedHistoryId"] and original["sourceFingerprint"] == member["historyFingerprint"], "history identity")
        require(original["polarity"] == member["polarity"] and exact(transport["charge"]) == q*member["polarity"] and transport["stateFlags"] == 0, "member polarity/charge/state")
        expected = [{"startTime": s["tStart"], "endTime": s["tEnd"], "coefficients": s["coefficients"], "positionErrors": s["positionErrors"], "velocityErrors": s["velocityErrors"]} for s in member["segments"]]
        require(original["segments"] == expected == transport["segments"], "past history tokens changed")
        parsed = [Segment(s) for s in expected]
        require(len(parsed) == 51 and parsed[0].start == -1 and parsed[-1].end == 0 and all(s.end <= 0 for s in parsed), "past-only coverage")
        for a, b in zip(parsed, parsed[1:]):
            check_join(a, b)
        histories.append(parsed)
    return request, histories


def matched_rung(prepared, declaration):
    controls = prepared["input"]["settings"]["numericalControls"]
    matches = [r["id"] for r in declaration["rungs"]
               if all(controls.get(k) == v for k, v in r.items() if k != "id")]
    require(len(matches) == 1, "request must match one declared rung")
    return matches[0]


def binary64_number(value):
    require(type(value) in (int, float) and isfinite(value) and value >= 0,
            "nonnegative finite binary64 measurement required")
    return F(float(value))


def check_step_records(response, request, endpoint):
    """Check full attempt census and published local estimators, not dynamics."""
    accepted_count, rejected_count = response["acceptedStepCount"], response["rejectedStepCount"]
    require(type(accepted_count) is int and type(rejected_count) is int and min(accepted_count, rejected_count) >= 0,
            "nonnegative integer step census required")
    steps = response["stepFailures"]  # Historical field name includes accepted steps.
    require(len(steps) == accepted_count+rejected_count, "complete attempted-step census")
    spans, rejected, current = [], 0, F(0)
    ids = [h["pathId"] for h in request["histories"]]
    for step in steps:
        a, b = exact(step["attemptedStart"]), exact(step["attemptedEnd"])
        require(a == current and a < b <= exact(request["absoluteTimeInterval"]["end"]), "step chronology/domain")
        require(step["status"] in ("accepted", "rejected"), "unknown attempt status")
        if step["status"] == "rejected":
            require(bool(step["failureCode"]), "rejected step lacks failure code")
            rejected += 1
            continue
        require(step["failureCode"] == "", "accepted step has failure code")
        errors = step["localErrors"]
        require([row["pathId"] for row in errors] == ids, "accepted local-error path census")
        for row in errors:
            for kind in ("position", "velocity"):
                axes = row[kind+"Errors"]
                require(len(axes) == 3, "three local-error axes required")
                values = [binary64_number(v) for v in axes]
                maximum = binary64_number(row[kind+"Error"])
                require(maximum == max(values), "local-error maximum differs from axes")
                parsed = float(request["numericalControls"][kind+"Tolerance"])
                require(isfinite(parsed) and parsed > 0, "finite positive parsed tolerance")
                tolerance = F(nextafter(parsed, float("-inf")))
                require(tolerance > 0, "positive downward tolerance endpoint required")
                require(maximum <= tolerance, "accepted local estimator exceeds downward tolerance endpoint")
        spans.append((a,b))
        current = b
    require(len(spans) == accepted_count and rejected == rejected_count and current == endpoint,
            "accepted/rejected census or final step endpoint mismatch")
    return spans


def reconstruct(response, request, histories):
    require(response["schema"] == "eom_borg_native_response/v1" and response["runGrade"] == "certified", "response schema/grade")
    require(response["status"] in ("completed", "halted") and response["allStepsAtomic"] is True, "response status/atomic publication")
    require(response["runId"] == request["runId"], "response run identity")
    require(response["fieldSpeed"] == request["modelControls"]["fieldSpeed"] and response["coupling"] == request["modelControls"]["coupling"], "response model echo")
    endpoint = exact(response["acceptedEndTime"])
    horizon = exact(request["absoluteTimeInterval"]["end"])
    require(0 <= endpoint <= horizon, "accepted endpoint outside request")
    completed = response["status"] == "completed"
    require((completed and endpoint == horizon and response["haltCode"] == "" and response["evidenceStatus"] == GRADE and response["claimGrade"] == GRADE) or
            (not completed and endpoint < horizon and bool(response["haltCode"]) and response["evidenceStatus"] == "failed" and response["claimGrade"] == "failed"), "inconsistent response outcome")
    require(response["budgetProvenance"]["allocationHash"] == request["certifiedBudget"]["allocationHash"] and response["budgetProvenance"]["allocations"] == request["certifiedBudget"]["allocations"], "response budget binding")
    spans = check_step_records(response, request, endpoint)
    extensions = response["publishedExtensions"]
    require(len(extensions) == 12, "missing published paths")
    generated = []
    common_partition = None
    for initial, path, extension in zip(histories, request["histories"], extensions):
        require(extension["pathId"] == path["pathId"] and extension["stateFlags"] == 0, "published path order/state")
        pieces = [Segment(s) for s in extension["segments"]]
        require(len(pieces) == 4*response["acceptedStepCount"], "quarter-step publication census")
        for record in extension["segments"]:
            require(record["evidenceStatus"] == response["evidenceStatus"] and record["claimGrade"] == response["claimGrade"], "segment grade mismatch")
        require((not pieces and endpoint == 0) or (bool(pieces) and pieces[0].start == 0 and pieces[-1].end == endpoint), "generated coverage incomplete")
        for a, b in zip([initial[-1]] + pieces, pieces):
            check_join(a, b)
        partition = [(s.start,s.end) for s in pieces]
        if common_partition is None:
            common_partition = partition
        require(partition == common_partition, "published path partition differs")
        for i, (a,b) in enumerate(spans):
            require(pieces[4*i].start == a and pieces[4*i+3].end == b,
                    "four-piece publication does not partition accepted step")
        generated.append(pieces)
    return generated, endpoint, completed


def geometric_bounds(paths, endpoint, controls):
    require(endpoint > 0 and all(paths), "no generated interval")
    require(len(paths) == 12, "geometry needs twelve paths")
    subdivisions = controls["bernsteinSubdivisions"]
    require(type(subdivisions) is int and 1 <= subdivisions <= 64, "subdivision limit")
    center = [exact(t) for t in controls["center"]]
    require(len(center) == 3, "radius center must have three coordinates")
    collapse = exact(controls["collapseDistance"])
    escape = exact(controls["separationRadius"])
    require(0 < collapse < escape, "event thresholds")
    require(type(controls["maximumPanels"]) is int and 0 < controls["maximumPanels"] <= 100000,
            "declared panel cap must be an integer in [1,100000]")
    cuts = sorted({F(0), endpoint, *(s.start for path in paths for s in path), *(s.end for path in paths for s in path)})
    require((len(cuts)-1)*subdivisions <= controls["maximumPanels"], "geometry panel resource limit")
    separation_lower, separation_upper = None, None
    radius_lower = radius_upper = speed_lower = speed_upper = F(0)
    witnesses = []
    panels = 0
    for a, b in zip(cuts, cuts[1:]):
        segments = [segment_at(path, (a+b)/2) for path in paths]
        for j in range(subdivisions):
            lo, hi = a+(b-a)*F(j, subdivisions), a+(b-a)*F(j+1, subdivisions)
            boxes = [s.boxes(lo, hi) for s in segments]
            endpoint_positions = [[s.boxes(t, t) for s in segments] for t in (lo, hi)]
            endpoint_velocities = [[s.boxes(t, t, True) for s in segments] for t in (lo, hi)]
            for i, (s, box) in enumerate(zip(segments, boxes)):
                r = norm_squared([(x-c, y-c) for (x, y), c in zip(box, center)])
                v = norm_squared(s.boxes(lo, hi, True))
                radius_upper, speed_upper = max(radius_upper, r[1]), max(speed_upper, v[1])
                for ti, t in enumerate((lo, hi)):
                    rp = norm_squared([(x-c, y-c) for (x, y), c in zip(endpoint_positions[ti][i], center)])
                    vp = norm_squared(endpoint_velocities[ti][i])
                    radius_lower, speed_lower = max(radius_lower, rp[0]), max(speed_lower, vp[0])
                    if rp[0] >= escape*escape and not any(w["event"] == "separation-radius-crossing" for w in witnesses):
                        witnesses.append({"event": "separation-radius-crossing", "pathIndex": i, "time": ratio(t), "squaredValue": interval_record(rp)})
                for k in range(i):
                    d = norm_squared(difference(box, boxes[k]))
                    separation_lower = d[0] if separation_lower is None else min(separation_lower, d[0])
                    for ti, t in enumerate((lo, hi)):
                        dp = norm_squared(difference(endpoint_positions[ti][i], endpoint_positions[ti][k]))
                        separation_upper = dp[1] if separation_upper is None else min(separation_upper, dp[1])
                        if dp[1] <= collapse*collapse and not any(w["event"] == "collapse-separation-crossing" for w in witnesses):
                            witnesses.append({"event": "collapse-separation-crossing", "pathIndices": [k, i], "time": ratio(t), "squaredValue": interval_record(dp)})
            panels += 1
    sq = {"minimumPairSeparation": (separation_lower, separation_upper), "maximumRadius": (radius_lower, radius_upper), "maximumSpeed": (speed_lower, speed_upper)}
    return {"panels": panels, "squaredBounds": {k: interval_record(v) for k, v in sq.items()},
            "decimalBounds": {k: sqrt_decimal_bounds(v) for k, v in sq.items()},
            "eventWitnesses": witnesses,
            "entireIntervalAboveCollapseThreshold": separation_lower > collapse*collapse,
            "entireIntervalBelowSeparationRadius": radius_upper < escape*escape,
            "scope": "serialized cubic histories plus declared component error radii; not independently validated EOM solution errors"}


def compare_rungs(left, right, times, controls):
    require(len(left) == len(right) == 12, "comparison needs twelve paths on both sides")
    require(bool(times) and len(times) <= 1024, "nonempty bounded comparison grid required")
    grid = [exact(t) for t in times]
    require(grid == sorted(set(grid)), "comparison times must be strictly increasing")
    require(controls["comparisonDomainPolicy"] == "declared-grid-plus-common-prefix-end; unreachable-grid-explicit",
            "undeclared partial comparison policy")
    end = min(left[0][-1].end if left[0] else F(0), right[0][-1].end if right[0] else F(0))
    require(all((path[-1].end if path else F(0)) >= end for path in left+right), "incomplete comparison paths")
    unreachable = [t for t in times if exact(t) > end]
    selected = [t for t in times if exact(t) <= end]
    if end > 0 and end not in grid:
        selected.append(left[0][-1].end_token if left[0][-1].end == end else right[0][-1].end_token)
    domain = {"commonGeneratedEnd": ratio(end), "unreachableDeclaredTimes": unreachable,
              "completeComparisonDomain": not unreachable and end >= grid[-1],
              "fullHorizonCompared": not unreachable and end >= grid[-1]}
    if end <= 0:
        return {"rows": [], "passed": False, "status": "no-common-generated-interval", **domain}
    rows = []
    for token in selected:
        t = exact(token)
        require(t >= 0, "comparison time before release")
        for i, (a, b) in enumerate(zip(left, right)):
            for velocity in (False, True):
                aa, bb = segment_at(a, t), segment_at(b, t)
                boxes = difference(aa.boxes(t, t, velocity), bb.boxes(t, t, velocity))
                bounds = norm_squared(boxes)
                key = "velocity" if velocity else "position"
                tolerance = exact(controls[key+"ComparisonTolerance"])
                require(tolerance > 0, "positive comparison tolerance required")
                rows.append({"time": token, "pathIndex": i, "quantity": key,
                             "differenceSquared": interval_record(bounds),
                             "withinToleranceIncludingRadii": bounds[1] <= tolerance*tolerance})
    return {"rows": rows, "passed": all(r["withinToleranceIncludingRadii"] for r in rows),
            "status": "common-generated-domain-compared", **domain,
            "scope": "finite common-time Euclidean differences including both histories' error radii; not independent dynamics validation or continuous-time convergence"}


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    for name in ("declaration", "handoff", "request", "response", "out"):
        parser.add_argument("--"+name, required=True)
    parser.add_argument("--comparison-request")
    parser.add_argument("--comparison-response")
    parser.add_argument("--expected-request-sha256")
    parser.add_argument("--expected-comparison-request-sha256")
    args = parser.parse_args(argv)
    started = time.monotonic()
    source_bytes = Path(__file__).read_bytes()
    source_hash = sha256(source_bytes).hexdigest()
    captured = []
    def read(path):
        value, binding = read_bound(path)
        captured.append(binding)
        return value, binding
    declaration, declaration_binding = read(args.declaration)
    require(declaration["schema"] == DECLARATION_SCHEMA, "declaration schema")
    controls = declaration["outcomeControls"]
    grid = [exact(t) for t in controls["comparisonTimes"]]
    require(bool(grid) and grid[0] == 0 and grid[-1] == exact(declaration["scientificConditions"]["endTime"])
            and grid == sorted(set(grid)), "declared comparison grid must span release through horizon")
    handoff, binding = read(args.handoff)
    require(binding["sha256"] == HANDOFF_SHA, "accepted handoff SHA mismatch")
    prepared, request_binding = read(args.request)
    if args.expected_request_sha256:
        require(request_binding["sha256"] == args.expected_request_sha256, "expected request SHA mismatch")
    response, response_binding = read(args.response)
    request, initial = authenticate_request(prepared, handoff, declaration)
    paths, endpoint, completed = reconstruct(response, request, initial)
    metrics = geometric_bounds(paths, endpoint, controls) if endpoint > 0 else None
    outcome = "unresolved-no-generated-evolution" if endpoint == 0 else "unresolved-halted-prefix"
    if metrics and metrics["eventWitnesses"]:
        outcome = "declared-geometric-event-observed"
    elif completed and metrics["entireIntervalAboveCollapseThreshold"] and metrics["entireIntervalBelowSeparationRadius"]:
        outcome = "bounded-persistence-over-declared-horizon-conditional-on-solver-errors"
    elif completed:
        outcome = "unresolved-geometric-threshold-enclosure"
    comparison = None
    require(bool(args.comparison_request) == bool(args.comparison_response), "both comparison inputs required")
    if args.comparison_request:
        other, other_binding = read(args.comparison_request)
        if args.expected_comparison_request_sha256:
            require(other_binding["sha256"] == args.expected_comparison_request_sha256, "expected comparison request SHA mismatch")
        other_response, _ = read(args.comparison_response)
        other_request, other_initial = authenticate_request(other, handoff, declaration)
        require(matched_rung(prepared, declaration) != matched_rung(other, declaration), "distinct numerical rungs required")
        require(other["input"]["settings"]["strength"] == prepared["input"]["settings"]["strength"] and other_request["absoluteTimeInterval"] == request["absoluteTimeInterval"], "comparison science differs")
        other_paths, other_endpoint, _ = reconstruct(other_response, other_request, other_initial)
        comparison = compare_rungs(paths, other_paths, controls["comparisonTimes"], controls)
    report = {"schema": SCHEMA, "accepted": False, "mathematicalCheckPassed": True,
              "dynamicsIndependentlyValidated": False, "executionAndAuthorizationAuthenticated": False,
              "claimGrade": "exact-rational-generated-history-analysis",
              "outcome": outcome, "completeRequestedHorizon": completed,
              "generatedDomain": ["0", response["acceptedEndTime"]], "haltCode": response["haltCode"],
              "checkedStepCounts": {"accepted": response["acceptedStepCount"], "rejected": response["rejectedStepCount"]},
              "localEstimatorCheck": "All accepted per-path axis estimators are finite, nonnegative, match their published maxima, and do not exceed the downward adjacent binary64 endpoint of each parsed tolerance token, as used by the EOM gate; this checks estimator records, not their independent accuracy.",
              "publicationPartitionCheck": "Four contiguous segments per accepted step, matching its exact outer endpoint tokens and the ordered partition of every member; no exact rational-quarter claim is made for binary64-generated internal knots.",
              "metrics": metrics, "comparison": comparison,
              "inputs": captured, "referenceSha256": source_hash,
              "elapsedAnalysisSeconds": time.monotonic()-started,
              "remainingObligations": ["external scientific authorization and actual execution authentication", "independent frozen dynamical reference comparison", "resource supervision through publication", "no stability or permanent retention claim"]}
    for binding in captured:
        require(read_bound(binding["path"])[1] == binding, "input changed before publication")
    require(Path(__file__).read_bytes() == source_bytes, "reference source changed during analysis")
    output = json.dumps(report, indent=2, sort_keys=True).encode()+b"\n"
    with open(args.out, "xb") as stream:
        stream.write(output)
        stream.flush()
        os.fsync(stream.fileno())
    for binding in captured:
        require(read_bound(binding["path"])[1] == binding, "input changed after publication; output not admitted")
    require(Path(args.out).read_bytes() == output, "output changed after publication")
    require(Path(__file__).read_bytes() == source_bytes, "reference source changed after publication; output not admitted")
    print(json.dumps({"schema": SCHEMA, "output": str(Path(args.out).absolute()), "sha256": sha256(output).hexdigest(), "bytes": len(output), "mathematicalCheckPassed": True, "accepted": False}))


if __name__ == "__main__":
    try:
        main()
    except (CheckError, KeyError, TypeError, OSError, json.JSONDecodeError) as exc:
        print(str(exc), file=sys.stderr)
        sys.exit(1)
