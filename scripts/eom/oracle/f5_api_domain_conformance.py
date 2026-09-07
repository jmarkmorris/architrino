"""Independent, receipt-bound F5 history-API endpoint-domain supplement.

This does not generate histories, replay the nominal proof, or solve roots.
The trusted input is the externally pinned original-byte SHA of an accepted
nominal certificate. Its bounds cover [a,b]; this instrument extends those
bounds to [pred(float(a)), succ(float(b))] and tests the actual binary64 error
radii. An accepted output never grants H3 or reviewed-build authority.
"""

from __future__ import annotations

import argparse
from decimal import Decimal
from fractions import Fraction
import hashlib
import json
import math
from pathlib import Path
import re
import signal
import struct
import sys
import time
from types import ModuleType

_EXECUTING_CODE = sys._getframe().f_code
SELF_PATH = "scripts/eom/oracle/f5_api_domain_conformance.py"
SCHEMA = "braid-program/f5-api-domain-conformance.v1"
LIMIT_SECONDS = 1800
HEARTBEAT_SECONDS = 15
EXPECTED_SEGMENTS = 12384
ORACLE_HASHES = {
    "scripts/eom/oracle/decimal_interval.py": "fffc17270e149e6213315c1c82b518caa739657eb649822fd1955b8a2820e38a",
    "scripts/eom/oracle/f5_actual_cubic_conformance.py": "4a90227cd79a4acfe319c723a05b711df1947953cc229f87114c4bc7babf6e09",
    "scripts/eom/oracle/f5_history_manifest_conformance.py": "c34cd3f368398fd1ecd3a227c8026508efd319e9219b0ae8819eb4dfab646c74",
}
SUBJECT_API_HASHES = {
    "src/eom/native/eom_f5_enclosed_root_cli.cpp": "9f7661f4000174d631d4c60f7078e124d77ae9b2ddba6af36197f13096095f81",
    "src/eom/CMakeLists.txt": "e4b3a8bdfc91c756eb00e4c37e872bcbebfe1f7b406a551e3aa630f8818d2bdd",
    "src/eom/src/History.cpp": "cd732843db488de66798953278d1e3b15151163c826b9d5b93eed98363a8b4c5",
    "src/eom/src/Interval.cpp": "5da66e8473f78439dbb075857918af85b7789b2749e5046c83d9b58d944023a5",
    "src/eom/include/architrino/eom/History.hpp": "0e326f15c70a0b0dc5786b1c14a2f2378324754c28cc597b92d82c0c1da3c8f3",
    "src/eom/include/architrino/eom/Interval.hpp": "880a98273244c65f85ebcce2e08026a177c4af633633b8e29078948b54143dd9",
}


def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def _load_snapshot():
    """Compile the pinned original bytes; never accept stale imported bytecode."""
    root = Path(__file__).resolve().parents[3]
    sources = {path: (root / path).read_bytes() for path in (*ORACLE_HASHES, SELF_PATH)}
    if compile(sources[SELF_PATH], _EXECUTING_CODE.co_filename, "exec",
               dont_inherit=True, optimize=sys.flags.optimize) != _EXECUTING_CODE:
        raise ValueError("executing supplement differs from its source snapshot")
    for path, expected in ORACLE_HASHES.items():
        if sha256(sources[path]) != expected:
            raise ValueError(f"frozen oracle hash mismatch: {path}")
    package_name = "_f5_api_snapshot_" + sha256(b"".join(sources.values()))
    package = ModuleType(package_name)
    package.__path__ = []
    sys.modules[package_name] = package
    for path in ORACLE_HASHES:
        name = package_name + "." + Path(path).stem
        module = ModuleType(name)
        module.__file__ = str(root / path)
        module.__package__ = package_name
        sys.modules[name] = module
        exec(compile(sources[path], module.__file__, "exec", dont_inherit=True), module.__dict__)
    nominal = sys.modules[package_name + ".f5_history_manifest_conformance"]
    if nominal._IMPORTED_SOURCE_BYTES != {path: sources[path] for path in ORACLE_HASHES}:
        raise ValueError("nested nominal oracle snapshot differs from pinned source bytes")
    return root, sources, nominal


ROOT, SOURCE_SNAPSHOT, NOMINAL = _load_snapshot()
PROOF = NOMINAL._PROOF
Interval = PROOF.DecimalInterval
point = PROOF.point
MODES = ("source-decimal", "frozen-binary64")
POSITION_RADIUS = Fraction.from_float(float(NOMINAL.POSITION_WIDTH))
VELOCITY_RADIUS = Fraction.from_float(float(NOMINAL.VELOCITY_WIDTH))
VELOCITY_THRESHOLD = (1 - Fraction(1, 2**53))**2 * VELOCITY_RADIUS


def _fraction_token(token: object) -> Fraction:
    value = Fraction(NOMINAL._token(token))
    if value < 0:
        raise ValueError("error bound must be nonnegative")
    return value


def rational_record(value: Fraction) -> dict:
    """Exact authority, not a rounded decimal display."""
    return {"numerator": str(value.numerator), "denominator": str(value.denominator)}


def expanded_domain(start_token: str, end_token: str) -> dict:
    a, b = NOMINAL._token(start_token), NOMINAL._token(end_token)
    if a >= b:
        raise ValueError("segment must have positive exact duration")
    parsed_a, parsed_b = float(a), float(b)
    if parsed_a >= parsed_b:
        raise ValueError("segment must have positive binary64 duration")
    lo = Decimal.from_float(math.nextafter(parsed_a, -math.inf))
    hi = Decimal.from_float(math.nextafter(parsed_b, math.inf))
    if not lo.is_finite() or not hi.is_finite() or not lo < a < b < hi:
        raise ValueError("expanded domain must strictly enclose the exact segment")
    delta = max(Fraction(a) - Fraction(lo), Fraction(hi) - Fraction(b))
    return {"a": a, "b": b, "lo": lo, "hi": hi, "delta": delta,
            "parsedEndpointBits": [struct.pack(">d", value).hex() for value in (parsed_a, parsed_b)]}


def cubic_second_derivative(coefficients: list[str], local_time):
    """q''=2*c2+6*c3*(t-a), evaluated independently in directed arithmetic."""
    if not isinstance(coefficients, list) or len(coefficients) != 4:
        raise ValueError("cubic needs four exact coefficient tokens")
    for token in coefficients:
        NOMINAL._token(token)
    return point(2) * point(coefficients[2]) + point(6) * point(coefficients[3]) * local_time


def sliver_second_defect(operator: dict, segment: dict, domain: dict) -> list[Decimal]:
    """Bound |f''-q''| only on the two slivers, for both frozen meanings of f."""
    upper = [Decimal(0)] * 3
    for left, right in ((domain["lo"], domain["a"]), (domain["b"], domain["hi"])):
        cell = Interval.bounds(left, right, PROOF.PRECISION)
        local_time = cell - point(domain["a"])
        q_second = [cubic_second_derivative(tokens, local_time) for tokens in segment["coefficients"]]
        for mode in MODES:
            jet = PROOF.f5_member_jet(operator, cell, mode=mode, order=2)
            for axis in range(3):
                # Jets use factorial-normalized coefficients: f''=2*jet[2].
                defect = point(2) * jet[axis][2] - q_second[axis]
                upper[axis] = max(upper[axis], PROOF.absolute_upper(defect))
    return upper


def extend_axis_bounds(bx: Fraction, bv: Fraction, dx: Fraction, dv: Fraction,
                       delta: Fraction, acceleration_defect: Fraction) -> tuple[Fraction, Fraction]:
    """Integrate the endpoint error twice; all arithmetic is exact rational.

    Bx/Bv cover the nominal interval; Dx/Dv also bound its endpoint defects.
    For either outward sliver, |e|<=Dx+delta*Dv+delta^2*A/2 and
    |e'|<=Dv+delta*A. The maximum includes the original nominal interval.
    """
    values = (bx, bv, dx, dv, delta, acceleration_defect)
    if any(not isinstance(value, Fraction) or value < 0 for value in values):
        raise ValueError("extension inputs must be nonnegative exact Fractions")
    if dx > bx or dv > bv:
        raise ValueError("nominal error bounds must dominate endpoint defects")
    return max(bx, dx + delta * dv + delta**2 * acceleration_defect / 2), \
        max(bv, dv + delta * acceleration_defect)


def _bounds(check: dict, field: str) -> list[Fraction]:
    values = check.get(field)
    if not isinstance(values, list) or len(values) != 3:
        raise ValueError(f"nominal certificate needs three {field} bounds")
    return [_fraction_token(value) for value in values]


NOMINAL_SEGMENT_KEYS = {
    "index", "accepted", "reason", "proofSubcells", "fourthDerivativeUpper",
    "positionDefectUpper", "velocityDefectUpper", "positionErrorUpper",
    "velocityErrorUpper", "positionSlackLower", "velocitySlackLower",
}


def validate_nominal_certificate(data: bytes, expected_sha256: str, manifest: dict,
                                 manifest_bytes: bytes, sources: list[dict]) -> dict:
    """Verify a pinned accepted receipt; this does not manufacture proof authority."""
    if not isinstance(expected_sha256, str) or not re.fullmatch("[0-9a-f]{64}", expected_sha256) \
            or sha256(data) != expected_sha256:
        raise ValueError("nominal certificate original-byte SHA mismatch")
    receipt = NOMINAL.decode_json(data)
    if receipt.get("accepted") is not True or receipt.get("h3EvidenceEligible") is not False \
            or receipt.get("resourceContact") is not False or receipt.get("failure", "missing") is not None:
        raise ValueError("nominal certificate is not an accepted non-resource-contact receipt")
    controls = {
        "schema": NOMINAL.SCHEMA, "status": "actual-cubic-conformance-passed",
        "historyManifestSha256": sha256(manifest_bytes),
        "campaignId": manifest["campaignId"], "runId": manifest["runId"],
        "normalizedFieldSpeed": "1", "retainedInterval": manifest["retainedInterval"],
        "positionWidth": NOMINAL.POSITION_WIDTH, "velocityWidth": NOMINAL.VELOCITY_WIDTH,
        "precisionDecimalDigits": PROOF.PRECISION, "proofSubcellLadder": [1, 2, 4, 8],
        "limitSeconds": LIMIT_SECONDS, "expectedMemberSegments": EXPECTED_SEGMENTS,
        "processedMemberSegments": EXPECTED_SEGMENTS,
        "sourceBindings": sources,
        "instrumentBindings": [{"path": path, "sha256": digest} for path, digest in ORACLE_HASHES.items()],
    }
    if any(receipt.get(key) != value for key, value in controls.items()):
        raise ValueError("nominal certificate changed a binding or fixed control")
    for key in ("precisionDecimalDigits", "limitSeconds", "expectedMemberSegments", "processedMemberSegments"):
        if type(receipt[key]) is not int:
            raise ValueError(f"nominal certificate {key} must be an integer")
    elapsed = receipt.get("elapsedWallSeconds")
    if type(elapsed) not in (int, Decimal) or not 0 <= elapsed < LIMIT_SECONDS:
        raise ValueError("nominal certificate has invalid elapsed time")
    members = receipt.get("memberResults")
    if not isinstance(members, list) or len(members) != 12:
        raise ValueError("nominal certificate needs twelve complete members")
    for member, actual in zip(members, manifest["members"], strict=True):
        NOMINAL._keys(member, {"index", "worldlineId", "historyFingerprint", "segments"}, "nominal member")
        for key in ("index", "worldlineId", "historyFingerprint"):
            if member[key] != actual[key] or (key == "index" and type(member[key]) is not int):
                raise ValueError("nominal certificate member identity mismatch")
        if not isinstance(member["segments"], list) or len(member["segments"]) != NOMINAL.SEGMENT_COUNT:
            raise ValueError("nominal certificate needs all 1032 segments per member")
        for index, check in enumerate(member["segments"]):
            NOMINAL._keys(check, NOMINAL_SEGMENT_KEYS, "nominal segment")
            if type(check["index"]) is not int or check["index"] != index or check["accepted"] is not True \
                    or check["reason"] != "continuous-actual-cubic-enclosure-passed" \
                    or type(check["proofSubcells"]) is not int or check["proofSubcells"] not in (1, 2, 4, 8):
                raise ValueError("nominal certificate segment is not an accepted ordered proof")
            bx, bv, dx, dv = (_bounds(check, field) for field in (
                "positionErrorUpper", "velocityErrorUpper", "positionDefectUpper", "velocityDefectUpper"))
            for axis in range(3):
                if not dx[axis] <= bx[axis] <= Fraction(NOMINAL.POSITION_WIDTH) \
                        or not dv[axis] <= bv[axis] <= Fraction(NOMINAL.VELOCITY_WIDTH):
                    raise ValueError("nominal certificate error bounds are inconsistent")
            for field in ("fourthDerivativeUpper", "positionSlackLower", "velocitySlackLower"):
                _bounds(check, field)
    return receipt


def certify_api_segment(operator: dict, segment: dict, nominal: dict) -> dict:
    """Local arithmetic only: no local result is an accepted manifest receipt."""
    domain = expanded_domain(segment["tStart"], segment["tEnd"])
    second = sliver_second_defect(operator, segment, domain)
    bx, bv, dx, dv = (_bounds(nominal, field) for field in (
        "positionErrorUpper", "velocityErrorUpper", "positionDefectUpper", "velocityDefectUpper"))
    ex, ev = [], []
    for axis in range(3):
        x, v = extend_axis_bounds(bx[axis], bv[axis], dx[axis], dv[axis],
                                 domain["delta"], Fraction(second[axis]))
        ex.append(x)
        ev.append(v)
    passed = all(x <= POSITION_RADIUS and v <= VELOCITY_THRESHOLD for x, v in zip(ex, ev, strict=True))
    return {"passed": passed, "index": segment["index"],
            "parsedEndpointBits": domain["parsedEndpointBits"],
            "expandedIntervalExact": [str(domain["lo"]), str(domain["hi"])],
            "deltaExact": rational_record(domain["delta"]),
            "secondDerivativeDefectUpper": list(map(str, second)),
            "positionErrorUpperExact": list(map(rational_record, ex)),
            "velocityErrorUpperExact": list(map(rational_record, ev)),
            "positionSlackLowerExact": [rational_record(POSITION_RADIUS - x) for x in ex],
            "velocitySlackLowerExact": [rational_record(VELOCITY_THRESHOLD - v) for v in ev]}


def _verify_snapshot() -> None:
    for path, original in SOURCE_SNAPSHOT.items():
        if (ROOT / path).read_bytes() != original:
            raise ValueError(f"instrument changed since fresh snapshot: {path}")
    for path, expected in SUBJECT_API_HASHES.items():
        if sha256((ROOT / path).read_bytes()) != expected:
            raise ValueError(f"frozen subject API hash mismatch: {path}")


def verify_files(manifest_path: Path, certificate_path: Path, certificate_sha256: str,
                 *, progress_state: dict) -> dict:
    started = time.monotonic()
    _verify_snapshot()
    manifest_bytes, certificate_bytes = manifest_path.read_bytes(), certificate_path.read_bytes()
    config, enclosure, sources = NOMINAL.load_frozen_sources(ROOT)
    manifest = NOMINAL.decode_json(manifest_bytes)
    operators = NOMINAL.validate_manifest_shape(manifest, config, enclosure)
    nominal = validate_nominal_certificate(certificate_bytes, certificate_sha256,
                                           manifest, manifest_bytes, sources)
    result = {
        "schema": SCHEMA, "accepted": False, "h3EvidenceEligible": False,
        "status": "api-domain-conformance-incomplete", "resourceContact": False,
        "historyManifestSha256": sha256(manifest_bytes),
        "nominalCertificateSha256": sha256(certificate_bytes),
        "historyManifestPath": str(manifest_path.resolve()),
        "nominalCertificatePath": str(certificate_path.resolve()),
        "campaignId": manifest["campaignId"], "runId": manifest["runId"],
        "sourceBindings": sources,
        "instrumentBindings": [{"path": path, "sha256": sha256(data)} for path, data in SOURCE_SNAPSHOT.items()],
        "subjectApiBindings": [{"path": path, "sha256": digest} for path, digest in SUBJECT_API_HASHES.items()],
        "expectedMemberSegments": EXPECTED_SEGMENTS, "processedMemberSegments": 0,
        "normalizedFieldSpeed": "1", "constantInterpretations": list(MODES),
        "retainedInterval": manifest["retainedInterval"],
        "positionWidth": NOMINAL.POSITION_WIDTH, "velocityWidth": NOMINAL.VELOCITY_WIDTH,
        "precisionDecimalDigits": PROOF.PRECISION,
        "positionRadiusExact": rational_record(POSITION_RADIUS),
        "velocityRadiusExact": rational_record(VELOCITY_RADIUS),
        "velocityThresholdExact": rational_record(VELOCITY_THRESHOLD),
        "velocityRelativeReserveExact": rational_record((1 - Fraction(1, 2**53))**2),
        "limitSeconds": LIMIT_SECONDS, "heartbeatSeconds": HEARTBEAT_SECONDS,
        "memberResults": [], "failure": None,
        "claim": "Conditional on the hash-pinned accepted nominal certificate: both analytic F5 constant interpretations fit the actual serialized cubic error radii on the expanded binary64 history-API segment domains, including the two-operation relative velocity reserve. Interval.inflate supplies the final outward subnormal guard. No root completeness, build provenance, H3, evolution, retention, stability, score, or physical claim.",
    }
    for member, operator, receipt_member in zip(manifest["members"], operators, nominal["memberResults"], strict=True):
        output_member = {key: member[key] for key in ("index", "constituentId", "worldlineId", "polarity", "historyId", "historyFingerprint")}
        output_member["segments"] = []
        result["memberResults"].append(output_member)
        for segment, nominal_segment in zip(member["segments"], receipt_member["segments"], strict=True):
            if time.monotonic() - started >= LIMIT_SECONDS:
                raise TimeoutError("API-domain proof deadline reached")
            check = certify_api_segment(operator, segment, nominal_segment)
            output_member["segments"].append(check)
            result["processedMemberSegments"] += 1
            progress_state["processedMemberSegments"] = result["processedMemberSegments"]
            if not check["passed"]:
                result["failure"] = "expanded-domain-error-exceeds-api-radius"
                break
        if result["failure"]:
            break
    _verify_snapshot()
    NOMINAL.load_frozen_sources(ROOT)
    if manifest_path.read_bytes() != manifest_bytes or certificate_path.read_bytes() != certificate_bytes:
        raise ValueError("manifest or nominal certificate changed during verification")
    elapsed = time.monotonic() - started
    if elapsed >= LIMIT_SECONDS:
        raise TimeoutError("API-domain proof deadline reached")
    result["elapsedWallSeconds"] = elapsed
    result["accepted"] = result["failure"] is None and result["processedMemberSegments"] == EXPECTED_SEGMENTS
    result["status"] = "api-domain-conformance-passed" if result["accepted"] else "api-domain-conformance-rejected"
    return result


def write_exclusive(path: Path, result: dict) -> None:
    with path.open("x", encoding="utf-8") as output:
        json.dump(result, output, indent=2, sort_keys=True, allow_nan=False)
        output.write("\n")


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--history-manifest", required=True, type=Path)
    parser.add_argument("--nominal-certificate", required=True, type=Path)
    parser.add_argument("--nominal-certificate-sha256", required=True)
    parser.add_argument("--out", required=True, type=Path)
    args = parser.parse_args(argv)
    if args.out.exists():
        parser.error("output already exists; choose a fresh evidence path")
    started = time.monotonic()
    state = {"status": "running", "processedMemberSegments": 0}

    def heartbeat(_signum, _frame):
        elapsed = time.monotonic() - started
        print(json.dumps({**state, "elapsedWallSeconds": elapsed}), flush=True)
        if elapsed >= LIMIT_SECONDS:
            raise TimeoutError("fixed API-domain proof deadline reached")

    # The POSIX timer fires even within a long individual segment calculation.
    prior_handler = signal.signal(signal.SIGALRM, heartbeat)
    signal.setitimer(signal.ITIMER_REAL, HEARTBEAT_SECONDS, HEARTBEAT_SECONDS)
    print(json.dumps({**state, "status": "started", "limitSeconds": LIMIT_SECONDS}), flush=True)
    try:
        try:
            result = verify_files(args.history_manifest, args.nominal_certificate,
                                  args.nominal_certificate_sha256, progress_state=state)
        except (OSError, ValueError, TypeError, KeyError, ArithmeticError, RecursionError) as error:
            result = {"schema": SCHEMA, "accepted": False, "h3EvidenceEligible": False,
                      "status": "api-domain-conformance-rejected", "failure": str(error),
                      "resourceContact": isinstance(error, TimeoutError),
                      "expectedMemberSegments": EXPECTED_SEGMENTS,
                      "processedMemberSegments": state["processedMemberSegments"],
                      "elapsedWallSeconds": time.monotonic() - started}
    finally:
        signal.setitimer(signal.ITIMER_REAL, 0)
        signal.signal(signal.SIGALRM, prior_handler)
    try:
        write_exclusive(args.out, result)
    except OSError as error:
        print(json.dumps({"status": "output-rejected", "error": str(error)}), file=sys.stderr, flush=True)
        return 2
    print(json.dumps({key: result[key] for key in ("status", "accepted", "h3EvidenceEligible", "processedMemberSegments")}), flush=True)
    return 0 if result["accepted"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
