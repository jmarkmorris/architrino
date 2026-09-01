#!/usr/bin/env python3

import argparse
import hashlib
import json
import math
from pathlib import Path


SCHEMA = "braid-program/stella-octangula-short-eom-release-independent-check.v1"


def require(condition, message):
    if not condition:
        raise ValueError(message)


def sha256(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def load_json(path):
    return json.loads(path.read_text(encoding="utf-8"))


def polynomial(coefficients, local_time):
    c0, c1, c2, c3 = map(float, coefficients)
    return c0 + local_time * (c1 + local_time * (c2 + local_time * c3))


def derivative(coefficients, local_time):
    _, c1, c2, c3 = map(float, coefficients)
    return c1 + local_time * (2.0 * c2 + local_time * 3.0 * c3)


def state_at(history, time):
    selected = None
    for index, segment in enumerate(history["segments"]):
        start = float(segment["startTime"])
        end = float(segment["endTime"])
        if start <= time and (time < end or index + 1 == len(history["segments"])):
            selected = segment
            break
    require(selected is not None, f"history {history['pathId']} does not cover {time}")
    local_time = time - float(selected["startTime"])
    return {
        "pathId": history["pathId"],
        "position": [polynomial(axis, local_time) for axis in selected["coefficients"]],
        "velocity": [derivative(axis, local_time) for axis in selected["coefficients"]],
    }


def dot(left, right):
    return sum(a * b for a, b in zip(left, right))


def norm(vector):
    return math.sqrt(dot(vector, vector))


def subtract(left, right):
    return [a - b for a, b in zip(left, right)]


def scale(vector, scalar):
    return [value * scalar for value in vector]


def frame_metrics(histories, time):
    states = [state_at(history, time) for history in histories]
    center = [sum(row["position"][axis] for row in states) / len(states) for axis in range(3)]
    members = []
    for row in states:
        radius = norm(row["position"])
        radial_direction = scale(row["position"], 1.0 / radius)
        radial_velocity = dot(row["velocity"], radial_direction)
        tangential = subtract(row["velocity"], scale(radial_direction, radial_velocity))
        members.append({
            **row,
            "radius": radius,
            "radialVelocity": radial_velocity,
            "tangentialSpeed": norm(tangential),
        })
    minimum_pair_separation = math.inf
    for left in range(len(states)):
        for right in range(left + 1, len(states)):
            minimum_pair_separation = min(
                minimum_pair_separation,
                norm(subtract(states[left]["position"], states[right]["position"])),
            )
    return {
        "time": time,
        "center": center,
        "centerNorm": norm(center),
        "minimumRadius": min(row["radius"] for row in members),
        "maximumRadius": max(row["radius"] for row in members),
        "minimumRadialVelocity": min(row["radialVelocity"] for row in members),
        "maximumRadialVelocity": max(row["radialVelocity"] for row in members),
        "maximumTangentialSpeed": max(row["tangentialSpeed"] for row in members),
        "minimumPairSeparation": minimum_pair_separation,
        "members": members,
    }


def accepted_times(response):
    if not response.get("histories"):
        return []
    accepted_end = float(response["acceptedEndTime"])
    return sorted({
        float(segment["endTime"])
        for segment in response["histories"][0]["segments"]
        if 0.0 < float(segment["endTime"]) <= accepted_end
    })


def response_audit(response, declaration):
    frames = [frame_metrics(response.get("histories", []), time) for time in accepted_times(response)]
    rules = declaration["stoppingRules"]
    violations = []
    for frame in frames:
        if frame["centerNorm"] > rules["maximumCenterResidual"]:
            violations.append({"time": frame["time"], "kind": "center-residual"})
        if frame["maximumTangentialSpeed"] > rules["maximumTangentialSpeed"]:
            violations.append({"time": frame["time"], "kind": "tangential-speed"})
        if frame["maximumRadialVelocity"] > rules["radialReversalTolerance"]:
            violations.append({"time": frame["time"], "kind": "radial-reversal"})
        if frame["minimumPairSeparation"] < rules["minimumPairSeparation"]:
            violations.append({"time": frame["time"], "kind": "pair-separation"})
    return {
        "status": response.get("status"),
        "evidenceStatus": response.get("evidenceStatus"),
        "claimGrade": response.get("claimGrade"),
        "haltCode": response.get("haltCode"),
        "acceptedEndTime": response.get("acceptedEndTime"),
        "acceptedStepCount": response.get("acceptedStepCount"),
        "rejectedStepCount": response.get("rejectedStepCount"),
        "stepFailureCount": len(response.get("stepFailures", [])),
        "frames": frames,
        "finalFrame": frames[-1] if frames else None,
        "violations": violations,
    }


def maximum_state_delta(left, right):
    if not left.get("finalFrame") or not right.get("finalFrame"):
        return None
    right_by_id = {row["pathId"]: row for row in right["finalFrame"]["members"]}
    maximum = 0.0
    for row in left["finalFrame"]["members"]:
        peer = right_by_id[row["pathId"]]
        for field in ("position", "velocity"):
            for a, b in zip(row[field], peer[field]):
                maximum = max(maximum, abs(a - b))
    return maximum


def check_run(predeclaration_path, run_summary_path):
    declaration = load_json(predeclaration_path)
    run = load_json(run_summary_path)
    require(declaration["schema"] ==
            "braid-program/stella-octangula-short-eom-release-predeclaration.v1",
            "wrong predeclaration schema")
    require(run["schema"] == "braid-program/stella-octangula-short-eom-release-run.v1",
            "wrong run-summary schema")
    require(run["packetId"] == declaration["packetId"], "packet identity changed")
    require(run.get("animationProduced") is False, "animation was produced")
    require(run.get("braidClassificationAttempted") is False,
            "braid classification was attempted")

    audits = {}
    bindings = {}
    for rung in run["rungs"]:
        response_path = Path(rung["response"]["path"])
        require(response_path.is_file(), f"missing response: {response_path}")
        require(response_path.stat().st_size == rung["response"]["bytes"],
                f"response byte count changed: {rung['rung']['id']}")
        require(sha256(response_path) == rung["response"]["sha256"],
                f"response hash changed: {rung['rung']['id']}")
        response = load_json(response_path)
        audits[rung["rung"]["id"]] = response_audit(response, declaration)
        bindings[rung["rung"]["id"]] = {
            "path": str(response_path),
            "sha256": rung["response"]["sha256"],
            "bytes": rung["response"]["bytes"],
        }

    primary = audits.get("fine")
    medium = audits.get("medium")
    coarse = audits.get("coarse")
    end_time = declaration["scientificConditions"]["endTime"]
    initial_radius = declaration["scientificConditions"]["initialCircumradius"]
    initial_acceleration = declaration["scientificConditions"]["initialAccelerationMagnitude"]
    t = float(end_time)
    taylor_radius = initial_radius - 0.5 * initial_acceleration * t * t
    primary_delta = maximum_state_delta(primary or {}, medium or {})
    primary_final = primary.get("finalFrame") if primary else None
    checks = {
        "primaryCompleted": primary is not None and primary["status"] == "completed",
        "primaryReachedHorizon": primary is not None and primary["acceptedEndTime"] == end_time,
        "primaryHasNoStepFailures": primary is not None and primary["stepFailureCount"] == 0,
        "primaryHasNoStoppingViolations": primary is not None and not primary["violations"],
        "primaryContractsInward": primary_final is not None and
            primary_final["maximumRadius"] < initial_radius and
            primary_final["maximumRadialVelocity"] < 0.0,
        "mediumCompleted": medium is not None and medium["status"] == "completed",
        "mediumHasNoStoppingViolations": medium is not None and not medium["violations"],
        "primaryMediumRefinementPasses": primary_delta is not None and
            primary_delta <= declaration["acceptance"]["primaryMediumMaximumStateDelta"],
    }
    accepted = all(checks.values())
    return {
        "schema": SCHEMA,
        "packetId": declaration["packetId"],
        "accepted": accepted,
        "claimGrade": "independent-response-audit",
        "responseBindings": bindings,
        "audits": audits,
        "comparisons": {
            "primaryToMediumMaximumStateDelta": primary_delta,
            "primaryToCoarseMaximumStateDelta": maximum_state_delta(primary or {}, coarse or {}),
            "constantReleaseAccelerationTaylorRadiusAtHorizon": taylor_radius,
            "primaryRadiusMinusTaylorRadius": None if primary_final is None else
                primary_final["maximumRadius"] - taylor_radius,
        },
        "checks": checks,
        "claimBoundary": declaration["claimBoundary"],
        "falsifier": declaration["acceptance"]["falsifier"],
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--predeclaration", required=True, type=Path)
    parser.add_argument("--run-summary", required=True, type=Path)
    parser.add_argument("--out", required=True, type=Path)
    args = parser.parse_args()
    require(not args.out.exists(), "output already exists")
    result = check_run(args.predeclaration, args.run_summary)
    args.out.write_text(json.dumps(result, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"out": str(args.out), "accepted": result["accepted"]}))


if __name__ == "__main__":
    main()
