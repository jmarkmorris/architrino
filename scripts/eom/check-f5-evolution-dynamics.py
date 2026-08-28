#!/usr/bin/env python
"""Bounded, independent F5 comparison; frozen oracle mathematics is unmodified.

This is not a production integrator or a global validated-integration theorem.
The caller must separately admit this one scientific process on the shared host.
"""
from __future__ import annotations

import argparse
from datetime import datetime, timezone
from decimal import Decimal, localcontext
from fractions import Fraction
from hashlib import sha256
import json
import math
import os
from pathlib import Path
import resource
import signal
import stat
import sys
import time
import types

ROOT = Path(__file__).resolve().parents[2]
PRECISION = 80
OUTPUT_LIMIT = 64 * 1024 * 1024
HANDOFF_SHA = "4e0696a848a0d36ccbe5948295e71738c933b7ea120e9aee00e2effdd6ecc149"
ORACLE_HASHES = {
    "__init__": "de6f7aeb0acfc97c996d601059ad243b886d9381247fbf9541acacc74bac3ae1",
    "decimal_interval": "fffc17270e149e6213315c1c82b518caa739657eb649822fd1955b8a2820e38a",
    "certified_history": "ca916b4bc979629a5e25c1490da07fd78a26b4e75cfba5677f35fbab658a29e7",
    "certified_acceleration": "62787f1bb0d14329c0ad1f3586ef1f1cbeb666fe8c11f8831f7ad761d7c42b83",
    "certified_evolution": "00567dfef3163d40634dd5790d5eeb667cff8698394831130e8cb91937ddc80a",
}


def capture(path, limit=128 * 1024 * 1024):
    """Read one bounded regular file without following its final symlink."""
    path = Path(path).absolute()
    fd = os.open(path, os.O_RDONLY | os.O_NOFOLLOW | os.O_NONBLOCK)
    try:
        before = os.fstat(fd)
        if not stat.S_ISREG(before.st_mode) or before.st_size > limit:
            raise ValueError("input must be a bounded regular file")
        chunks, remaining = [], before.st_size
        while remaining:
            chunk = os.read(fd, min(remaining, 1024 * 1024))
            if not chunk:
                raise ValueError("input truncated during capture")
            chunks.append(chunk)
            remaining -= len(chunk)
        after = os.fstat(fd)
        for key in ("st_dev", "st_ino", "st_size", "st_mtime_ns", "st_ctime_ns"):
            if getattr(before, key) != getattr(after, key):
                raise ValueError("input changed during capture")
        data = b"".join(chunks)
        return data, {"path": str(path), "sha256": sha256(data).hexdigest(), "bytes": len(data)}
    finally:
        os.close(fd)


def load_frozen_oracle(root=ROOT):
    """Compile verified bytes under a fresh namespace, avoiding cached imports."""
    captures = {}
    for name, expected in ORACLE_HASHES.items():
        data, binding = capture(root / "scripts/eom/oracle" / (name + ".py"))
        if binding["sha256"] != expected:
            raise ValueError("frozen oracle changed: " + name)
        captures[name] = (data, binding)
    package = "_f5_dynamics_frozen_" + str(time.monotonic_ns())
    for name, (data, binding) in captures.items():
        full_name = package if name == "__init__" else package + "." + name
        module = types.ModuleType(full_name)
        module.__file__ = binding["path"]
        module.__package__ = package
        if name == "__init__":
            module.__path__ = []
        sys.modules[full_name] = module
        exec(compile(data, binding["path"], "exec"), module.__dict__)
    return sys.modules[package + ".certified_evolution"], [item[1] for item in captures.values()]


def decimal(value):
    if not isinstance(value, str) or len(value) > 2048:
        raise ValueError("exact decimal string required")
    result = Decimal(value)
    if not result.is_finite() or abs(result.adjusted()) > 2000:
        raise ValueError("bounded finite decimal required")
    return result


def exact_binary64(value):
    decimal(value)
    parsed = float(value)
    if not math.isfinite(parsed):
        raise ValueError("finite binary64 endpoint required")
    return Decimal.from_float(parsed)


def radius(values):
    if len(values) != 3:
        raise ValueError("three axis errors required")
    result = max(max(decimal(v), exact_binary64(v)) for v in values)
    if any(decimal(v) < 0 for v in values):
        raise ValueError("negative reconstruction error")
    return result


def make_history(oracle, path_id, segments):
    return oracle.PiecewisePolynomialHistory.from_segments([
        oracle.CubicHistorySegment.from_decimal_tokens(
            t_start=decimal(s["startTime"]), t_end=decimal(s["endTime"]),
            coefficients=[[decimal(v) for v in axis] for axis in s["coefficients"]],
            position_error=radius(s["positionErrors"]),
            velocity_error=radius(s["velocityErrors"]), precision=PRECISION,
        ) for s in segments
    ], history_id="borg-eom-shadow/" + path_id)


def require_equal(actual, expected, label):
    if actual != expected:
        raise ValueError(label + " mismatch")


def validate_wire(request, wire):
    """Authenticate the declared fresh transport against its actual V10 records."""
    lines = wire.splitlines()
    require_equal(lines[0], "EOM_BORG_NATIVE_V10", "wire protocol")
    run = lines[1].split("\t")
    require_equal(len(run), 60, "wire RUN width")
    c, m = request["numericalControls"], request["modelControls"]
    b = request["certifiedBudget"]["allocations"]
    o, f, r, p = b["ordinary"], b["finiteWidth"], b["resources"], b["precision"]
    expected = ["RUN", request["runId"], request["absoluteTimeInterval"]["start"], request["absoluteTimeInterval"]["end"],
                c["initialStep"], c["minimumStep"], c["maximumStep"], "1" if c["useAdaptiveStepGrowth"] else "0",
                m["fieldSpeed"], m["coupling"], m["coreScale"], c["rootTolerance"], c["accelerationTolerance"],
                c["farFieldEnclosureFraction"], c["positionTolerance"], c["velocityTolerance"], c["correctionTolerance"],
                c["threadCount"], request["resourceEnvelope"]["memoryBudgetBytes"], b["schema"], request["certifiedBudget"]["presetId"],
                request["certifiedBudget"]["allocationHash"], request["certifiedBudget"]["allocationCanonicalJson"],
                b["topLevel"]["positionIncrement"], b["topLevel"]["velocityIncrement"], o["transmitterFactorFloor"],
                f["causalWidth"], f["receiverImpulseTotal"], f["receiverPositionMomentTotal"], f["independentOverlap"],
                *[f["rowFractions"][key] for key in ("quadrature", "causalWidthRegulator", "coreRegulator", "finiteWidthStateNumerical", "amendment1RegulatorMatching")],
                f["regulatorRefinementRatio"], f["regulatorLevels"], p["difficultRowInitialBits"], p["difficultRowMaximumBits"],
                *[r[key] for key in ("rootMaximumDepth", "rootMaximumCells", "quadratureMaximumDepth", "quadratureMaximumCells", "eventMaximumDepth", "eventMaximumCells", "correctionIterations", "maximumStepAttempts", "maximumRejectedSteps")],
                o["chartPolicy"], p["deterministicReduction"], p["roundingMode"], f["receiverAllocationRule"], o["quadratureTolerance"],
                request["runGrade"], len(request["histories"]), "none", "0", "0", "0", "0"]
    require_equal(run, [str(v) for v in expected], "wire RUN conditions")
    require_equal(json.loads(run[22]), b, "wire allocation JSON")
    require_equal(sha256(run[22].encode()).hexdigest(), run[21], "wire allocation hash")
    index = 2
    for h in request["histories"]:
        require_equal(lines[index].split("\t"), ["PATH", h["pathId"], h["charge"], str(h["stateFlags"]), "0", str(len(h["segments"]))], "fresh wire PATH")
        index += 1
        for segment in h["segments"]:
            require_equal(lines[index].split("\t"), ["SEG", segment["startTime"], segment["endTime"],
                          *[v for axis in segment["coefficients"] for v in axis], *segment["positionErrors"], *segment["velocityErrors"]], "wire exact history SEG")
            index += 1
    require_equal(lines[index:], ["END"], "wire end and command census")


def validate_contract(declaration, envelope, response, handoff):
    require_equal(declaration["schema"], "braid-program/f5-ordinary-evolution-declaration.v1", "declaration schema")
    if declaration["authorization"]["approved"] is not True or not declaration["independentDeclarationReview"]:
        raise ValueError("strength authorization and independent declaration review required")
    require_equal(envelope["schema"], "braid-program/ordinary-evolution-request-preparation.v1", "envelope schema")
    require_equal(envelope["candidateId"], "f5", "candidate")
    require_equal(response["schema"], "eom_borg_native_response/v1", "raw response schema")
    require_equal(response["runGrade"], "certified", "run grade")
    request = envelope["transportRequest"]
    for key in ("runId",):
        require_equal(response[key], request[key], "response " + key)
    for key in ("fieldSpeed", "coupling", "coreScale"):
        require_equal(response[key], request["modelControls"][key], "response " + key)
    require_equal(response["budgetProvenance"]["allocationHash"], request["certifiedBudget"]["allocationHash"], "response budget binding")
    require_equal(sha256(envelope["wire"]["utf8"].encode()).hexdigest(), envelope["wire"]["sha256"], "wire hash")
    validate_wire(request, envelope["wire"]["utf8"])
    scientific = declaration["scientificConditions"]
    require_equal(request["absoluteTimeInterval"], {"start": scientific["releaseTime"], "end": scientific["endTime"]}, "time interval")
    require_equal(request["modelControls"]["fieldSpeed"], "1", "normalized wake speed")
    require_equal(request["modelControls"]["coupling"], declaration["authorization"]["coupling"], "coupling")
    require_equal(request["modelControls"]["futurePathPolicy"], "prohibited", "future policy")
    require_equal(request["modelControls"]["selfPairs"], "included-except-coincident-endpoint", "self-pair policy")
    require_equal(request["resourceEnvelope"]["causalHistoryRetention"], None, "history retirement disabled")
    controls = request["numericalControls"]
    matches = [r for r in declaration["rungs"] if all(controls.get(k) == v for k, v in r.items() if k != "id")]
    if len(matches) != 1 or matches[0]["id"] != "fine":
        raise ValueError("independent dynamics initially admits only exact declared fine rung")
    common, budget = declaration["commonNumericalControls"], request["certifiedBudget"]["allocations"]
    require_equal(controls["useAdaptiveStepGrowth"], False, "adaptive growth")
    require_equal(controls["farFieldEnclosureFraction"], "0", "far-field enclosure")
    require_equal(budget["ordinary"]["chartPolicy"], "sharp", "sharp chart")
    require_equal(budget["ordinary"]["transmitterFactorFloor"], common["transmitterFactorFloor"], "transmitter floor")
    require_equal(controls["threadCount"], common["workerThreads"], "worker count")
    require_equal(budget["precision"]["roundingMode"], common["roundingMode"], "rounding mode")
    require_equal(budget["precision"]["deterministicReduction"], common["deterministicReduction"], "reduction mode")
    for key in ("rootMaximumDepth", "rootMaximumCells", "correctionIterations", "maximumStepAttempts", "maximumRejectedSteps"):
        require_equal(budget["resources"][key], common[key], key)
    require_equal(len(request["histories"]), 12, "F5 member census")
    require_equal([r["pathId"] for r in response["publishedExtensions"]], [r["pathId"] for r in request["histories"]], "published path order")
    q = decimal(declaration["authorization"]["chargeMagnitude"])
    with localcontext() as context:
        context.prec = 200
        require_equal(decimal(declaration["authorization"]["effectiveStrength"]), decimal(request["modelControls"]["coupling"]) * q * q, "effective strength")
    for original, supplied in zip(handoff["members"], request["histories"], strict=True):
        require_equal(supplied["pathId"], original["worldlineId"], "original path")
        require_equal(decimal(supplied["charge"]), q * original["polarity"], "charge")
        expected = [{"startTime": s["tStart"], "endTime": s["tEnd"], **{k: s[k] for k in ("coefficients", "positionErrors", "velocityErrors")}} for s in original["segments"]]
        require_equal(supplied["segments"], expected, "accepted exact past-only history")
    end = decimal(response["acceptedEndTime"])
    if not decimal(scientific["releaseTime"]) <= end <= decimal(scientific["endTime"]):
        raise ValueError("accepted time outside declaration")
    return request, matches[0]


def make_request(oracle, request, histories):
    c, b = request["numericalControls"], request["certifiedBudget"]["allocations"]
    o, r, f = b["ordinary"], b["resources"], b["finiteWidth"]
    return oracle.CoupledEvolutionRequest.from_decimal_tokens(
        run_id=request["runId"] + "/independent-local-check",
        path_ids=tuple(histories), initial_histories=histories,
        charges={h["pathId"]: h["charge"] for h in request["histories"]},
        start_time=request["absoluteTimeInterval"]["start"], end_time=request["absoluteTimeInterval"]["end"],
        initial_step=c["initialStep"], minimum_step=c["minimumStep"], field_speed="1",
        coupling=request["modelControls"]["coupling"], chart_policy=o["chartPolicy"],
        causal_width=f["causalWidth"], core_scale=f["coreScale"],
        root_tolerance=c["rootTolerance"], transmitter_factor_floor=o["transmitterFactorFloor"],
        acceleration_tolerance=c["accelerationTolerance"], quadrature_tolerance=o["quadratureTolerance"],
        position_tolerance=c["positionTolerance"], velocity_tolerance=c["velocityTolerance"], correction_tolerance=c["correctionTolerance"],
        root_max_depth=r["rootMaximumDepth"], root_max_cells=r["rootMaximumCells"],
        quadrature_max_depth=r["quadratureMaximumDepth"], quadrature_max_cells=r["quadratureMaximumCells"],
        max_correction_iterations=r["correctionIterations"], max_step_attempts=r["maximumStepAttempts"], max_rejected_steps=r["maximumRejectedSteps"],
    )


def interval_record(value):
    return {"lower": str(value.lower), "upper": str(value.upper)}


def compare_interval(left, right, tolerance):
    delta = abs((Fraction(left.lower) + Fraction(left.upper)
                 - Fraction(right.lower) - Fraction(right.upper)) / 2)
    overlap = max(left.lower, right.lower) <= min(left.upper, right.upper)
    return {"oracle": interval_record(left), "eom": interval_record(right), "overlap": overlap,
            "midpointAbsoluteDeltaRational": {"numerator": str(delta.numerator), "denominator": str(delta.denominator)},
            "midpointTolerance": str(tolerance), "passed": overlap and delta <= Fraction(tolerance)}


def compare_states(oracle, reference, actual, when, controls, path_ids):
    reference = tuple(reference)
    if not path_ids or len(set(path_ids)) != len(path_ids):
        raise ValueError("nonempty unique state comparison paths required")
    require_equal([row[0] for row in reference], list(path_ids), "reference state path census")
    require_equal(list(actual), list(path_ids), "actual state path census")
    rows = []
    for path_id, expected in reference:
        left = expected.state_interval(oracle.DecimalInterval.point(when, PRECISION))
        right = actual[path_id].state_interval(oracle.DecimalInterval.point(when, PRECISION))
        for index, name in enumerate(("position", "velocity")):
            for axis in range(3):
                rows.append({"pathId": path_id, "quantity": name, "axis": axis,
                             **compare_interval(left[index][axis], right[index][axis], decimal(controls[name + "Tolerance"]))})
    require_equal(len(rows), len(path_ids) * 6, "state axis census")
    return {"passed": all(row["passed"] for row in rows), "time": str(when), "axes": rows}


def snapshot_summary(snapshot):
    return {"status": snapshot.status, "receptionTime": str(snapshot.reception_time),
            "failureCode": snapshot.failure_code, "inputDigest": snapshot.input_digest,
            "rootRowCount": len(snapshot.root_certificates),
            "rootRows": [{"receiverPathId": receiver, "transmitterPathId": source,
                          "status": root.status, "inputDigest": root.input_digest,
                          "rootCount": len(root.roots), "visitedCells": root.visited_cells,
                          "unresolvedCells": len(root.unresolved_cells), "memoryBoundaryContact": root.memory_boundary_contact,
                          "coincidentEndpointExcluded": root.coincident_endpoint_excluded}
                         for receiver, source, root in snapshot.root_certificates],
            "receiverTotals": [{"receiverPathId": path_id, "acceleration": [interval_record(v) for v in values]}
                               for path_id, values in snapshot.acceleration.receiver_totals]}


def compare_snapshot(oracle, snapshot, raw, tolerance, path_ids):
    if not raw:
        return {"passed": False, "status": "missing-EOM-final-snapshot"}
    if snapshot.status != "certified_complete" or raw["status"] != "certified_complete":
        return {"passed": False, "status": "uncertified-snapshot"}
    require_equal(decimal(raw["receptionTime"]), snapshot.reception_time, "final snapshot time")
    require_equal(raw["rootRowCount"], len(path_ids) ** 2, "EOM snapshot pair census")
    require_equal(len(snapshot.root_certificates), len(path_ids) ** 2, "oracle snapshot pair census")
    totals = raw["receiverTotals"]
    require_equal([r["receiverPathId"] for r in totals], list(path_ids), "snapshot receiver order")
    actual = {r["receiverPathId"]: r["acceleration"] for r in totals}
    rows = []
    for path_id, vector in snapshot.acceleration.receiver_totals:
        require_equal(len(actual[path_id]), 3, "acceleration axes")
        for axis, left in enumerate(vector):
            right = actual[path_id][axis]
            right = oracle.DecimalInterval(exact_binary64(right["lower"]), exact_binary64(right["upper"]), PRECISION)
            rows.append({"pathId": path_id, "axis": axis, **compare_interval(left, right, tolerance)})
    require_equal(len(rows), len(path_ids) * 3, "acceleration axis census")
    return {"passed": all(row["passed"] for row in rows), "status": "compared", "axes": rows}


class BoundedStop(Exception):
    pass


def select_first_audit_end(declaration, response):
    """Choose once from the complete accepted chronology; never retry a failure."""
    independent = declaration["independentDynamics"]
    require_equal(independent["firstStepPolicy"], "minimum-of-declared-target-and-first-accepted-fine-step-end; none-if-no-accepted-step", "first-step audit policy")
    target = decimal(independent["firstStepEndTime"])
    require_equal(target, Decimal("0.0009765625"), "frozen first-step target")
    counts = [response["acceptedStepCount"], response["rejectedStepCount"]]
    if any(type(n) is not int or n < 0 for n in counts):
        raise ValueError("nonnegative integer attempt counts required")
    steps = response["stepFailures"]  # The established field includes accepted attempts.
    require_equal(len(steps), sum(counts), "attempt census")
    current, accepted, rejected, first = Decimal(0), 0, 0, None
    for index, step in enumerate(steps):
        start, end = decimal(step["attemptedStart"]), decimal(step["attemptedEnd"])
        if start != current or not start < end <= decimal(declaration["scientificConditions"]["endTime"]):
            raise ValueError("attempt chronology or domain mismatch")
        if step["status"] == "accepted":
            require_equal(step["failureCode"], "", "accepted failure code")
            current, accepted = end, accepted + 1
            if first is None:
                first = {"attemptArrayIndex": index, "attemptedStart": step["attemptedStart"], "attemptedEnd": step["attemptedEnd"]}
        elif step["status"] == "rejected" and step["failureCode"]:
            rejected += 1
        else:
            raise ValueError("unknown attempt status or missing rejection cause")
    require_equal([accepted, rejected], counts, "accepted/rejected census")
    require_equal(current, decimal(response["acceptedEndTime"]), "accepted chronology endpoint")
    selected = None if first is None else min(target, decimal(first["attemptedEnd"]))
    return selected, {"policy": independent["firstStepPolicy"], "declaredTarget": str(target),
                      "selectedEndTime": str(selected) if selected is not None else None,
                      "firstAcceptedStep": first}


def publish_report(report, path, check_limits):
    """Keep this newly owned output fail-closed through write, fsync and recheck.

    The outer supervisor admits only a completed process, never a transient file.
    A publication failure rewrites only this same open owned descriptor as rejected.
    """
    def serialize():
        data = (json.dumps(report, indent=2, allow_nan=False) + "\n").encode()
        if len(data) > OUTPUT_LIMIT:
            raise ValueError("report exceeds output limit; no accepted artifact")
        return data

    data = serialize()
    with open(path, "xb+") as output:
        os.chmod(path, 0o600)
        try:
            check_limits()
            output.write(data)
            output.flush()
            os.fsync(output.fileno())
            check_limits()
            output.seek(0)
            require_equal(output.read(), data, "published report bytes")
            check_limits()
        except Exception as error:
            report.update(accepted=False, status="publication-failed-closed",
                          failure={"type": type(error).__name__, "message": str(error)})
            # A rejected artifact carries no successful bounded-run claim.
            signal.setitimer(signal.ITIMER_REAL, 0)
            data = serialize()
            output.seek(0)
            output.write(data)
            output.truncate()
            output.flush()
            os.fsync(output.fileno())
    return data


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    for name in ("request", "response", "declaration", "out"):
        parser.add_argument("--" + name, required=True)
    args = parser.parse_args(argv)
    if Path(args.out).exists():
        raise ValueError("output already exists; no silent rerun or overwrite")
    start, cpu_start = time.monotonic(), time.process_time()
    report = {"schema": "braid-program/f5-independent-evolution-dynamics.v1", "accepted": False,
              "status": "preparing", "startedAt": datetime.now(timezone.utc).isoformat(),
              "firstStep": {"status": "unvisited"}, "finalSnapshot": {"status": "unvisited"},
              "bindings": [], "precisionDecimalDigits": PRECISION,
              "expectedFinalOrderedPairs": 144,
              "interruptionAccounting": "An interrupted oracle call returns no certificate: all rows of that call remain unverified, regardless of unreported internal work. No retry or continuation is performed.",
              "historyInterpretation": "Original exact decimal coefficient/time tokens; scalar maximum across all axis radii and their parsed binary64 values. This enlarges axis uncertainty, does not change the nominal polynomial, and does not assert identical arithmetic boxes.",
              "comparisonPolicy": "Oracle full/two-half corrected step versus EOM quarter-step publication: require interval overlap AND midpoint delta within the declared fine-rung tolerance. No bit parity, set-containment, or global trajectory theorem.",
              "oraclePropagationLimitation": "The frozen oracle chooses last-segment nominal centers and carries endpoint radii plus full/two-half local discrepancies. EOM chooses correlated endpoint-hull centers and additionally propagates velocity/acceleration radius contributions. First-step agreement is numerical consistency, not an independent proof of EOM propagated uncertainty. Final snapshot checks the actual generated carrier independently.",
              "proofBoundary": "Independent first-step state and accepted-final acceleration snapshot only; not stability, permanent retention, or a global validated-integration theorem."}
    stage, deadline, rss_limit = ["preparation"], [start + 840], [2 * 1024**3]
    overall_deadline = start + 900
    last_heartbeat = [start - 15]

    def heartbeat(signum=None, frame=None):
        usage = resource.getrusage(resource.RUSAGE_SELF)
        rss = usage.ru_maxrss * (1 if sys.platform == "darwin" else 1024)
        if signum is None or time.monotonic() - last_heartbeat[0] >= 15:
            print(json.dumps({"schema": "f5-dynamics-heartbeat/v1", "pid": os.getpid(), "stage": stage[0],
                              "wallSeconds": time.monotonic() - start, "cpuSeconds": time.process_time() - cpu_start,
                              "maximumRssBytes": rss}), file=sys.stderr, flush=True)
            last_heartbeat[0] = time.monotonic()
        if time.monotonic() >= deadline[0]:
            raise BoundedStop("oracle wall deadline")
        if rss > rss_limit[0]:
            raise BoundedStop("oracle RSS ceiling")

    previous_alarm = signal.signal(signal.SIGALRM, heartbeat)
    previous_int = signal.signal(signal.SIGINT, lambda *_: (_ for _ in ()).throw(BoundedStop("operator interrupt")))
    signal.setitimer(signal.ITIMER_REAL, 0.5, 0.5)
    try:
        inputs = {}
        for name in ("request", "response", "declaration"):
            data, binding = capture(getattr(args, name))
            inputs[name] = json.loads(data)
            report["bindings"].append(binding)
        declaration = inputs["declaration"]
        limits = declaration["operationalLimits"]
        overall_deadline = min(start + min(900, limits["oracleWallSeconds"]), start + (datetime.fromisoformat(declaration["campaignDeadline"]) - datetime.now(timezone.utc)).total_seconds())
        work_seconds = declaration["independentDynamics"]["numericalWorkWallSeconds"]
        if not 0 < work_seconds <= 840:
            raise ValueError("numerical work must reserve at least60s of the900s stage")
        deadline[0] = min(start + work_seconds, overall_deadline - 60)
        rss_limit[0] = min(rss_limit[0], limits["aggregateRssBytes"])
        heartbeat()
        handoff_bytes, binding = capture(ROOT / declaration["history"]["path"])
        require_equal(binding["sha256"], HANDOFF_SHA, "accepted handoff hash")
        require_equal(declaration["history"]["sha256"], HANDOFF_SHA, "declared handoff hash")
        report["bindings"].append(binding)
        request, rung = validate_contract(declaration, inputs["request"], inputs["response"], json.loads(handoff_bytes))
        oracle, bindings = load_frozen_oracle()
        report["bindings"].extend(bindings)
        report["bindings"].append(capture(__file__)[1])
        report["rung"] = rung["id"]
        initial = {h["pathId"]: make_history(oracle, h["pathId"], h["segments"]) for h in request["histories"]}
        actual = {h["pathId"]: make_history(oracle, h["pathId"], h["segments"] + extension["segments"])
                  for h, extension in zip(request["histories"], inputs["response"]["publishedExtensions"], strict=True)}
        final_time = decimal(inputs["response"]["acceptedEndTime"])
        for history in actual.values():
            require_equal(history.t_end, final_time, "published accepted end")
        reference_request = make_request(oracle, request, initial)
        comparisons = declaration["independentDynamics"]["comparisonTolerances"]
        require_equal(comparisons, {"position": rung["positionTolerance"], "velocity": rung["velocityTolerance"], "acceleration": rung["accelerationTolerance"]}, "declared independent comparison tolerances")
        first_time, selection = select_first_audit_end(declaration, inputs["response"])
        report["firstStepSelection"] = selection
        if first_time is not None:
            stage[0] = "firstStep"
            report["firstStep"] = {"status": "running", "endTime": str(first_time)}
            heartbeat()
            first = oracle.certify_atomic_coupled_step(reference_request, tuple(initial.items()), step_index=0,
                                                      start_time=reference_request.start_time, end_time=first_time)
            report["firstStep"] = {"status": first.status, "failureCode": first.failure_code, "inputDigest": first.input_digest,
                                   "endTime": str(first_time), "localErrors": [e.to_record() for e in first.local_errors],
                                   "substeps": [{"status": s.status, "failureCode": s.failure_code} for s in first.substeps]}
            if first.status == "accepted":
                report["firstStep"]["comparison"] = compare_states(oracle, first.published_histories, actual, first_time, request["numericalControls"], reference_request.path_ids)
            else:
                report["firstStep"]["comparison"] = {"passed": False, "status": "oracle-rejected"}
            stage[0] = "finalSnapshot"
            report["finalSnapshot"] = {"status": "running", "receptionTime": str(final_time)}
            heartbeat()
            final = oracle.certify_acceleration_snapshot(reference_request, tuple(actual.items()), final_time)
            report["finalSnapshot"] = snapshot_summary(final)
            report["finalSnapshot"]["comparison"] = compare_snapshot(oracle, final, inputs["response"].get("finalAccelerationSnapshot"), decimal(rung["accelerationTolerance"]), reference_request.path_ids)
            report["accepted"] = (report["firstStep"]["comparison"]["passed"] and report["finalSnapshot"]["comparison"]["passed"])
            report["status"] = "local-checks-passed" if report["accepted"] else "unresolved-or-disagreement"
        else:
            report["firstStep"] = {"status": "unvisited-no-accepted-EOM-step"}
            report["finalSnapshot"] = {"status": "unvisited-no-accepted-EOM-step"}
            report["status"] = "unresolved-no-generated-evolution"
    except Exception as error:
        report["accepted"] = False
        report["status"] = "bounded-stop" if isinstance(error, BoundedStop) else "invalid-or-unresolved"
        report["failure"] = {"type": type(error).__name__, "message": str(error), "stage": stage[0]}
        if stage[0] in ("firstStep", "finalSnapshot") and report[stage[0]]["status"] == "running":
            report[stage[0]]["status"] = "interrupted-no-certificate"
    stage[0], deadline[0] = "finalization", overall_deadline
    try:
        heartbeat()
        for binding in report["bindings"]:
            require_equal(capture(binding["path"])[1]["sha256"], binding["sha256"], "end-of-run input/source identity")
        heartbeat()
    except Exception as error:
        report.update(accepted=False, status="finalization-failed-closed", failure=str(error))
        signal.setitimer(signal.ITIMER_REAL, 0)
    usage = resource.getrusage(resource.RUSAGE_SELF)
    report["resources"] = {"wallSeconds": time.monotonic() - start, "cpuSeconds": time.process_time() - cpu_start,
                           "maximumRssBytes": usage.ru_maxrss * (1 if sys.platform == "darwin" else 1024),
                           "pid": os.getpid(), "attempts": 1, "deadlineSeconds": max(0, overall_deadline - start),
                           "heartbeatSeconds": 15, "resourcePollSeconds": 0.5, "outputLimitBytes": OUTPUT_LIMIT}
    try:
        data = publish_report(report, args.out, heartbeat)
    finally:
        signal.setitimer(signal.ITIMER_REAL, 0)
        signal.signal(signal.SIGALRM, previous_alarm)
        signal.signal(signal.SIGINT, previous_int)
    print(json.dumps({"accepted": report["accepted"], "status": report["status"], "out": str(Path(args.out).absolute()), "sha256": sha256(data).hexdigest()}))
    return 0 if report["accepted"] else 2


if __name__ == "__main__":
    sys.exit(main())
