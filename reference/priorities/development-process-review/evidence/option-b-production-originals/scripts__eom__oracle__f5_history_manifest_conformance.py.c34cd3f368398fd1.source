"""Source-bound verification of every actual F5 history polynomial.

This is a report-only oracle, not a history generator or root solver. Its
certificate covers only the raw manifest bytes passed to it. A separate build
receipt and root ledger must bind those same bytes before any H3 conclusion.
"""

from __future__ import annotations

import argparse
from decimal import Decimal
import hashlib
import json
import math
from pathlib import Path
import re
import sys
import time
from types import ModuleType
from typing import Callable

_EXECUTING_WRAPPER_CODE = sys._getframe().f_code

SCHEMA = "braid-program/f5-actual-cubic-conformance.v1"
MANIFEST_SCHEMA = "braid-program/f5-enclosed-root-history-manifest.v1"
POSITION_WIDTH = "1.528724905003159e-10"
VELOCITY_WIDTH = "2.866983034112353e-7"
SEGMENT_COUNT = 1032
LIMIT_SECONDS = 1800
HEARTBEAT_SECONDS = 15
FIXED_BINDINGS = {
    "approved-config": (
        "reference/priorities/braid-program/configurations/phase-varying-prescribed-display-history.v3.json",
        "e92e450c8ea83086b60184d31ff5b07fe8a470b1e20088ea312592f2b38800fb",
    ),
    "pilot-fixture": (
        "reference/priorities/braid-program/evidence/2026-08-26-f5-phase-varying-root-pilot-source.v2.json",
        "bda39fe695e8b446ac91aee96a9f867c7f48b8228f2c9f6ac547c8172e0da344",
    ),
    "restart-predeclaration": (
        "reference/priorities/braid-program/evidence/2026-08-26-f5-enclosed-root-restart-predeclaration.md",
        "1bc458d0b80c0a4f9e5b5c22e83d7e360306f020526296a937ae26742a6296e5",
    ),
    "enclosure-evidence": (
        "reference/priorities/braid-program/evidence/2026-08-26-f5-independent-interpolation-enclosure.md",
        "931f5d88a209648bde63dfbdd1f24303b7a33e101e11565e75fd608be347d496",
    ),
    "accepted-enclosure-report": (
        ".local-data/braid-analysis/parallel-agent-search/parallel-braid-prescribed-search-20260826-v1/f5-independent-enclosure/accepted-enclosure-report.v1.json",
        "2f8fa7bdd40df643a661b2efae4a1007683120077d074165f8f506a4b9941bd9",
    ),
}
INSTRUMENT_PATHS = (
    "scripts/eom/oracle/decimal_interval.py",
    "scripts/eom/oracle/f5_actual_cubic_conformance.py",
    "scripts/eom/oracle/f5_history_manifest_conformance.py",
)


def _load_frozen_proof_snapshot():
    """Execute exactly the captured source bytes, never a cached prior import.

    The isolated package makes the core's relative decimal import resolve to
    the same byte snapshot. No adapter code or external source is loaded.
    """
    root = Path(__file__).resolve().parents[3]
    sources = {relative: (root / relative).read_bytes() for relative in INSTRUMENT_PATHS}
    compiled_wrapper = compile(sources[INSTRUMENT_PATHS[-1]],
        _EXECUTING_WRAPPER_CODE.co_filename, "exec", dont_inherit=True, optimize=sys.flags.optimize)
    if compiled_wrapper != _EXECUTING_WRAPPER_CODE:
        raise ValueError("executing wrapper code differs from the captured source snapshot")
    digest = hashlib.sha256(b"".join(sources.values())).hexdigest()
    package_name = f"_f5_proof_snapshot_{digest}"
    package = ModuleType(package_name)
    package.__path__ = []
    sys.modules[package_name] = package
    for relative in INSTRUMENT_PATHS[:2]:
        name = f"{package_name}.{Path(relative).stem}"
        module = ModuleType(name)
        module.__file__ = str(root / relative)
        module.__package__ = package_name
        sys.modules[name] = module
        exec(compile(sources[relative], module.__file__, "exec"), module.__dict__)
    return sys.modules[f"{package_name}.f5_actual_cubic_conformance"], sources


_PROOF, _IMPORTED_SOURCE_BYTES = _load_frozen_proof_snapshot()
PRECISION = _PROOF.PRECISION
certify_f5_segment = _PROOF.certify_f5_segment
point = _PROOF.point

MANIFEST_KEYS = {
    "schema", "campaignId", "runId", "normalizedFieldSpeed", "retainedInterval",
    "maximumSegmentStep", "positionWidth", "velocityWidth", "members",
}
MEMBER_KEYS = {
    "index", "constituentId", "worldlineId", "polarity", "historyId",
    "historyFingerprint", "segments",
}
SEGMENT_KEYS = {
    "index", "tStart", "tEnd", "coefficients", "positionErrors", "velocityErrors",
}
DECIMAL_TOKEN = re.compile(r"[+-]?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?\Z", re.ASCII)


def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def _unique_object(pairs: list) -> dict:
    result = {}
    for key, value in pairs:
        if key in result:
            raise ValueError(f"duplicate JSON field: {key}")
        result[key] = value
    return result


def _bad_constant(token: str):
    raise ValueError(f"nonfinite JSON constant: {token}")


def decode_json(data: bytes) -> dict:
    if not isinstance(data, bytes) or len(data) > 64 * 1024 * 1024:
        raise ValueError("input must be original bytes of at most 64 MiB")
    value = json.loads(data, parse_float=Decimal, parse_constant=_bad_constant,
                       object_pairs_hook=_unique_object)
    if not isinstance(value, dict):
        raise ValueError("JSON input must be an object")
    return value


def _keys(value: object, expected: set, label: str):
    if not isinstance(value, dict) or set(value) != expected:
        raise ValueError(f"{label} has missing or unexpected fields")


def _token(value: object) -> Decimal:
    if not isinstance(value, str) or len(value) > 128 or not DECIMAL_TOKEN.fullmatch(value):
        raise ValueError("expected a bounded decimal string token")
    result = Decimal(value)
    carrier = float(result)
    if abs(result.as_tuple().exponent) > 400 or not math.isfinite(carrier) or \
            (result != 0 and carrier == 0):
        raise ValueError("decimal token is outside the finite EOM carrier")
    return result


def history_fingerprint(segments: list[dict]) -> str:
    """Independent implementation of History.cpp's length-prefixed token chain."""
    state = 14695981039346656037

    def append(token: str):
        nonlocal state
        encoded = token.encode("utf-8")
        for byte in str(len(encoded)).encode("ascii") + b":" + encoded:
            state = ((state ^ byte) * 1099511628211) & ((1 << 64) - 1)

    append("eom_history_segment_chain/v1")
    for segment in segments:
        append(segment["tStart"])
        append(segment["tEnd"])
        for axis in segment["coefficients"]:
            for coefficient in axis:
                append(coefficient)
        for field in ("positionErrors", "velocityErrors"):
            for token in segment[field]:
                append(token)
    return f"fnv1a64-chain-v1:{state:016x}"


def load_frozen_sources(repo_root: Path) -> tuple[dict, dict, list[dict]]:
    repo_root = repo_root.resolve()
    loaded = {}
    bindings = []
    for identity, (relative, expected) in FIXED_BINDINGS.items():
        target = (repo_root / relative).resolve()
        if not target.is_relative_to(repo_root):
            raise ValueError(f"source escapes repository: {identity}")
        data = target.read_bytes()
        actual = sha256(data)
        if actual != expected:
            raise ValueError(f"frozen source hash mismatch: {identity}")
        bindings.append({"id": identity, "path": relative, "sha256": actual})
        if relative.endswith(".json"):
            loaded[identity] = decode_json(data)
    config, pilot, report = (loaded[name] for name in
                             ("approved-config", "pilot-fixture", "accepted-enclosure-report"))
    for field in ("constituents", "worldlines", "relationships", "history", "constraints",
                  "display", "interpolation"):
        if config[field] != pilot[field]:
            raise ValueError(f"approved scientific row changed at {field}")
    if report["accepted"] is not True or report["status"] != "independent-enclosure-passed" \
            or report["coverage"]["segmentCount"] != SEGMENT_COUNT:
        raise ValueError("frozen report has no accepted complete coverage")
    return config, report, bindings


def validate_manifest_shape(manifest: dict, config: dict, report: dict) -> list[dict]:
    """Validate exact coverage and identity; this function grants no authority."""
    _keys(manifest, MANIFEST_KEYS, "history manifest")
    controls = {
        "schema": MANIFEST_SCHEMA, "normalizedFieldSpeed": "1",
        "maximumSegmentStep": "0.02", "positionWidth": POSITION_WIDTH,
        "velocityWidth": VELOCITY_WIDTH,
    }
    if any(manifest[key] != value for key, value in controls.items()):
        raise ValueError("history manifest changed frozen controls")
    for key in ("campaignId", "runId"):
        if not isinstance(manifest[key], str) or not 0 < len(manifest[key]) <= 256:
            raise ValueError(f"history manifest needs a nonempty {key}")
    interval = manifest["retainedInterval"]
    if not isinstance(interval, list) or len(interval) != 2 or \
            list(map(_token, interval)) != [Decimal(-1), Decimal("19.63359163663986")]:
        raise ValueError("history manifest changed retained interval")
    members = manifest["members"]
    if not isinstance(members, list) or len(members) != 12:
        raise ValueError("history manifest must contain all twelve members")
    constituents = {member["id"]: member for member in config["constituents"]}
    worldlines = {member["constituentId"]: member for member in config["worldlines"]}
    operators, ids, fingerprints = [], set(), set()
    for index, (member, identity) in enumerate(zip(members, config["relationships"]["sourceOrder"], strict=True)):
        _keys(member, MEMBER_KEYS, "history member")
        worldline = worldlines[identity]
        if type(member["index"]) is not int or member["index"] != index or \
                member["constituentId"] != identity or member["worldlineId"] != worldline["id"] or \
                type(member["polarity"]) is not int or member["polarity"] != constituents[identity]["polarity"]:
            raise ValueError("history member identity differs from approved source order")
        history_id = member["historyId"]
        if not isinstance(history_id, str) or not 0 < len(history_id) <= 256 or history_id in ids:
            raise ValueError("history IDs must be nonempty and unique")
        ids.add(history_id)
        segments = member["segments"]
        if not isinstance(segments, list) or len(segments) != SEGMENT_COUNT:
            raise ValueError("every history must contain exactly 1032 segments")
        preceding_end = Decimal(-1)
        for segment_index, (segment, expected) in enumerate(zip(segments, report["segments"], strict=True)):
            _keys(segment, SEGMENT_KEYS, "history segment")
            if type(segment["index"]) is not int or segment["index"] != segment_index:
                raise ValueError("history segment index differs from frozen order")
            start, end = _token(segment["tStart"]), _token(segment["tEnd"])
            if start != expected["start"] or end != expected["end"] or start != preceding_end \
                    or start >= end or (point(end) - point(start)).upper > Decimal("0.02"):
                raise ValueError("history segment differs from the exact frozen grid")
            preceding_end = end
            coefficients = segment["coefficients"]
            if not isinstance(coefficients, list) or len(coefficients) != 3 or any(
                    not isinstance(axis, list) or len(axis) != 4 for axis in coefficients):
                raise ValueError("history coefficients must have shape 3 by 4")
            for axis in coefficients:
                for token in axis:
                    _token(token)
            for field, width in (("positionErrors", POSITION_WIDTH), ("velocityErrors", VELOCITY_WIDTH)):
                errors = segment[field]
                if not isinstance(errors, list) or len(errors) != 3 or \
                        list(map(_token, errors)) != [Decimal(width)] * 3:
                    raise ValueError("history segment changed frozen error widths")
        fingerprint = history_fingerprint(segments)
        if member["historyFingerprint"] != fingerprint or fingerprint in fingerprints:
            raise ValueError("history fingerprint differs from its unique exact token chain")
        fingerprints.add(fingerprint)
        operators.append(worldline["operator"])
    return operators


def verify_manifest_bytes(
    data: bytes, *, repo_root: Path | None = None,
    progress: Callable[[dict], None] | None = None,
) -> dict:
    """Production entrypoint: no source-bypass or caller-supplied proof hooks."""
    started = time.monotonic()
    root = (repo_root or Path(__file__).resolve().parents[3]).resolve()
    if (root / INSTRUMENT_PATHS[-1]).resolve() != Path(__file__).resolve():
        raise ValueError("repository root is not the executing verifier's repository")
    initial_instruments = _IMPORTED_SOURCE_BYTES
    for relative, imported in initial_instruments.items():
        if (root / relative).read_bytes() != imported:
            raise ValueError("instrument changed after frozen import; start a fresh verifier process")
    config, report, bindings = load_frozen_sources(root)
    manifest = decode_json(data)
    operators = validate_manifest_shape(manifest, config, report)
    result = {
        "schema": SCHEMA, "accepted": False, "h3EvidenceEligible": False,
        "status": "actual-cubic-conformance-incomplete",
        "campaignId": manifest["campaignId"], "runId": manifest["runId"],
        "historyManifestSha256": sha256(data), "sourceBindings": bindings,
        "instrumentBindings": [{"path": relative, "sha256": sha256(source)}
                               for relative, source in initial_instruments.items()],
        "pythonVersion": sys.version, "precisionDecimalDigits": PRECISION,
        "proofSubcellLadder": [1, 2, 4, 8], "limitSeconds": LIMIT_SECONDS,
        "normalizedFieldSpeed": "1", "retainedInterval": manifest["retainedInterval"],
        "expectedMemberSegments": 12 * SEGMENT_COUNT, "processedMemberSegments": 0,
        "positionWidth": POSITION_WIDTH, "velocityWidth": VELOCITY_WIDTH,
        "memberResults": [], "resourceContact": False,
        "claim": "Continuous containment of both analytic F5 constant interpretations in the actual serialized cubic error boxes only; no root completeness, build provenance, evolution, retention, stability, score, or physical claim.",
    }
    last_heartbeat = started
    if progress:
        progress({"status": "started", "processedMemberSegments": 0, "wallSeconds": 0})
    failure = None
    for member, operator in zip(manifest["members"], operators, strict=True):
        member_result = {"index": member["index"], "worldlineId": member["worldlineId"],
                         "historyFingerprint": member["historyFingerprint"], "segments": []}
        result["memberResults"].append(member_result)
        for segment in member["segments"]:
            if time.monotonic() - started >= LIMIT_SECONDS:
                result["resourceContact"] = True
                failure = "resource-limit-contact"
                break
            try:
                check = certify_f5_segment(operator, segment)
            except (ArithmeticError, ValueError) as error:
                check = {"accepted": False, "reason": "proof-domain-failure", "detail": str(error)}
            member_result["segments"].append({"index": segment["index"], **check})
            result["processedMemberSegments"] += 1
            now = time.monotonic()
            if progress and now - last_heartbeat >= HEARTBEAT_SECONDS:
                progress({"status": "running", "processedMemberSegments": result["processedMemberSegments"],
                          "wallSeconds": now - started})
                last_heartbeat = now
            if not check["accepted"]:
                failure = check["reason"]
                break
        if failure:
            break
    if time.monotonic() - started >= LIMIT_SECONDS:
        result["resourceContact"] = True
        failure = "resource-limit-contact"
    # A mid-run edit cannot silently change the instrument or its source row.
    for relative, initial in initial_instruments.items():
        if (root / relative).read_bytes() != initial:
            failure = "instrument-changed-during-verification"
    for binding in bindings:
        if sha256((root / binding["path"]).read_bytes()) != binding["sha256"]:
            failure = "source-changed-during-verification"
    elapsed = time.monotonic() - started
    if elapsed >= LIMIT_SECONDS:
        result["resourceContact"] = True
        failure = "resource-limit-contact"
    result["accepted"] = failure is None and result["processedMemberSegments"] == 12 * SEGMENT_COUNT
    result["status"] = "actual-cubic-conformance-passed" if result["accepted"] else "actual-cubic-conformance-rejected"
    result["failure"] = failure
    result["elapsedWallSeconds"] = elapsed
    if progress:
        progress({key: result[key] for key in ("status", "processedMemberSegments", "elapsedWallSeconds")})
    return result


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--history-manifest", type=Path, required=True)
    parser.add_argument("--out", type=Path, required=True)
    args = parser.parse_args(argv)
    if args.out.exists():
        parser.error("output already exists; use a new evidence path")
    try:
        result = verify_manifest_bytes(args.history_manifest.read_bytes(),
            progress=lambda event: print(json.dumps(event, sort_keys=True), flush=True))
        with args.out.open("x", encoding="utf-8") as output:
            json.dump(result, output, indent=2, sort_keys=True, allow_nan=False)
            output.write("\n")
    except (OSError, ValueError, KeyError, TypeError) as error:
        print(json.dumps({"status": "rejected", "error": str(error)}), file=sys.stderr, flush=True)
        return 2
    return 0 if result["accepted"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
