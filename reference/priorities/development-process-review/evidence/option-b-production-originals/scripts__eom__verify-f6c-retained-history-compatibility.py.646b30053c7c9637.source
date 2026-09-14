#!/usr/bin/env python3
"""Exact, data-only F6c midpoint-Hermite compatibility witness.

No solver or oracle is imported. An accepted receipt proves existence of a
globally C1 path inside the original componentwise position/velocity allowances,
plus a strict bound on the original velocity boxes. It never identifies that
witness with the represented EOM subject or certifies dynamics or metrics.
"""

from __future__ import annotations

import argparse
from contextlib import ExitStack
from fractions import Fraction
from hashlib import sha256
import json
import os
from pathlib import Path
import re
import signal
import stat
import sys
import tempfile
import time


_EXECUTING_CODE = sys._getframe().f_code
EXPORT_SHA256 = "f479bb88a6425e9e98e00288f2524f33d5a3c0f4c2a14139dbaae4f468c46db1"
SCHEMA = "braid-program/f6c-retained-history-compatibility.v1"
RUN_ID = "f6c-balanced-tetrahedral-p0.678-n1.25-th3.36-br0.787-cp1.76-hp0.0771-hm-0.147-rp0.0463-rm-0.134-tp0.116-tm-0.254-hhp4.82-hhm2.21-hrp6-hrm3.44-v1"
LABELS = ("0+", "0-", "1+", "1-", "2+", "2-", "3+", "3-")
CHARGE = "0.1666666666666666666666666666666667"
MAX_INPUT_BYTES = 16 * 1024 * 1024
MAX_SOURCE_BYTES = 1024 * 1024
MAX_TOKEN_LENGTH = 256
MAX_DECIMAL_EXPONENT = 256
HEARTBEAT_SECONDS = 15
DEADLINE_SECONDS = 1800
DECIMAL_TOKEN = re.compile(r"-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE]([+-]?[0-9]+))?\Z")
SEGMENT_KEYS = {"startTime", "endTime", "coefficients", "positionErrors",
                "velocityErrors", "positionError", "velocityError"}


class CompatibilityError(ValueError):
    pass


def require(condition, message):
    if not condition:
        raise CompatibilityError(message)


def rational(value):
    """Original finite decimal token, lifted exactly; no ambient rounding."""
    require(type(value) is str and len(value) <= MAX_TOKEN_LENGTH,
            "decimal token must be a bounded string")
    match = DECIMAL_TOKEN.fullmatch(value)
    require(match is not None, "invalid finite decimal token")
    exponent = match.group(1)
    require(exponent is None or (len(exponent) <= 5
            and abs(int(exponent)) <= MAX_DECIMAL_EXPONENT),
            "decimal exponent exceeds the declared instrument resource bound")
    return Fraction(value)


def fraction_record(value):
    return {"numerator": str(value.numerator), "denominator": str(value.denominator)}


def _unique_object(pairs):
    result = {}
    for key, value in pairs:
        require(key not in result, f"duplicate JSON key: {key}")
        result[key] = value
    return result


def _reject_number(value):
    raise CompatibilityError(f"non-integer JSON numeric token: {value}")


def parse_export(data):
    try:
        return json.loads(data.decode("utf-8"), object_pairs_hook=_unique_object,
                          parse_float=_reject_number, parse_constant=_reject_number)
    except (UnicodeError, json.JSONDecodeError) as error:
        raise CompatibilityError(f"invalid UTF-8 JSON: {error}") from error


def require_integer(value, expected, label):
    require(type(value) is int and value == expected, f"{label} mismatch")


def validate_identity(document):
    """Fixed production census; never infer candidate identity from its labels."""
    require(type(document) is dict, "export must be an object")
    require(document.get("schema") == "braid-program/f6c-retained-history-export.v1"
            and document.get("status") == "exported-data-only", "export schema/status mismatch")
    require(document.get("runId") == RUN_ID
            and document.get("modelFingerprint") == "fnv1a64:6b87d1f138d33e13"
            and document.get("generatingSpec") == "F6c-nonlinear-return-map-search-v2-return-continuation",
            "frozen run identity mismatch")
    require(document.get("fieldSpeed") == "1"
            and document.get("coupling") == "10.304229970992187", "frozen numerical literals mismatch")
    require(document.get("interval") == {"start": "0", "end": "0.13"}, "measurement interval mismatch")
    counts = document.get("counts")
    expected = {"members": 8, "segments": 14080, "declaredSegmentsPerMember": 1600,
                "evolvedSegmentsPerMember": 160, "acceptedFrames": 81,
                "acceptedFrameIntervals": 80, "orderedPairs": 64}
    require(type(counts) is dict and set(counts) == set(expected), "count fields mismatch")
    for key, value in expected.items():
        require_integer(counts[key], value, key)
    histories = document.get("retainedHistories")
    require(type(histories) is list and len(histories) == 8, "member census mismatch")
    for index, (history, label) in enumerate(zip(histories, LABELS)):
        require(type(history) is dict and history.get("id") == label, "member identity/order mismatch")
        require_integer(history.get("pathKey"), index + 1, "member path key")
        require_integer(history.get("polarity"), 1 if index % 2 == 0 else -1, "member polarity")
        require_integer(history.get("stateFlags"), 1 if index % 2 == 0 else 2, "member state flags")
        require(history.get("charge") == (CHARGE if index % 2 == 0 else "-" + CHARGE),
                "member signed polarity literal mismatch")
        require_integer(history.get("declaredPrehistorySegmentCount"), 1600, "prehistory count")
        require_integer(history.get("evolvedSegmentCount"), 160, "evolved count")
        require(history.get("coverageStart") == "-8" and history.get("coverageEnd") == "0.13",
                "declared history domain mismatch")
        segments = history.get("segments")
        require(type(segments) is list and len(segments) == 1760, "actual segment census mismatch")
    return histories


def parse_segment(segment):
    require(type(segment) is dict and set(segment) == SEGMENT_KEYS, "segment fields mismatch")
    start, end = rational(segment["startTime"]), rational(segment["endTime"])
    require(start < end, "segment duration must be strictly positive")
    rows = segment["coefficients"]
    require(type(rows) is list and len(rows) == 3
            and all(type(row) is list and len(row) == 4 for row in rows), "coefficient shape mismatch")
    coefficients = tuple(tuple(rational(value) for value in row) for row in rows)
    errors = {}
    for kind in ("position", "velocity"):
        values = segment[kind + "Errors"]
        require(type(values) is list and len(values) == 3, "error axis census mismatch")
        axes = tuple(rational(value) for value in values)
        scalar = rational(segment[kind + "Error"])
        require(all(value >= 0 for value in axes) and scalar >= max(axes),
                "negative or underbounding original error allowance")
        errors[kind] = (axes, scalar)
    return {"a": start, "b": end, "h": end - start, "rows": coefficients, "errors": errors}


def exact_state(row, local_time):
    c0, c1, c2, c3 = row
    return (((c3 * local_time + c2) * local_time + c1) * local_time + c0,
            (3 * c3 * local_time + 2 * c2) * local_time + c1)


def check_partition(segments, *, domain=None, split=None):
    require(segments, "empty retained partition")
    for left, right in zip(segments, segments[1:]):
        require(left["b"] == right["a"], "exact history gap or overlap")
    if domain is not None:
        require(segments[0]["a"] == domain[0] and segments[-1]["b"] == domain[1],
                "actual retained domain mismatch")
    if split is not None:
        index, time_value = split
        require(0 < index < len(segments)
                and segments[index - 1]["b"] == segments[index]["a"] == time_value,
                "actual prehistory/evolved boundary mismatch")


def correction_controls(h, e0, e1, d0, d1):
    """Cubic position and quadratic velocity Bernstein controls on [0,1]."""
    require(all(type(value) is Fraction for value in (h, e0, e1, d0, d1)),
            "correction operands must be exact Fractions")
    require(h > 0, "correction needs positive exact duration")
    return ((e0, e0 + h * d0 / 3, e1 - h * d1 / 3, e1),
            (d0, 3 * (e1 - e0) / h - d0 - d1, d1))


def velocity_box_squared(segment):
    """Exact coordinatewise quadratic hull, inflated by original axis radii."""
    h = segment["h"]
    bounds = []
    for row, radius in zip(segment["rows"], segment["errors"]["velocity"][0]):
        _, c1, c2, c3 = row
        controls = (c1, c1 + h * c2, c1 + 2 * h * c2 + 3 * h * h * c3)
        bounds.append(max(abs(value) for value in controls) + radius)
    return sum(value * value for value in bounds)


def _update_worst(worst, used, allowance, location):
    ratio = used / allowance if allowance else (Fraction(0) if used == 0 else None)
    if worst is None or (not worst[0] and (ratio is None or ratio > worst[1])):
        record = {**location, "used": fraction_record(used), "allowance": fraction_record(allowance),
                  "ratio": None if ratio is None else fraction_record(ratio),
                  "unboundedRatio": ratio is None}
        return (ratio is None, ratio, record)
    return worst


def analyze_paths(histories, *, production=False, progress=None):
    """Pure exact construction. This helper does not issue an accepted receipt.

    Mathematical violations are all retained. Malformed structure stops before
    construction; a malformed input is not a negative compatibility theorem.
    """
    require(type(histories) is list and histories, "missing histories")
    if production:
        require(len(histories) == 8, "production member census mismatch")
    failures = []
    worst = {"positionAxis": None, "positionScalar": None,
             "velocityAxis": None, "velocityScalar": None}
    speed_worst = None
    segment_count = axis_count = join_count = checks = 0
    for member_index, history in enumerate(histories):
        require(type(history) is dict and type(history.get("id")) is str, "history identity missing")
        raw = history.get("segments")
        require(type(raw) is list and raw, "history segments missing")
        segments = [parse_segment(segment) for segment in raw]
        if production:
            require(history["id"] == LABELS[member_index] and len(segments) == 1760,
                    "production history order/census mismatch")
        check_partition(segments, domain=(-8, Fraction(13, 100)) if production else None,
                        split=(1600, Fraction(0)) if production else None)
        starts = [tuple(exact_state(row, Fraction(0)) for row in segment["rows"])
                  for segment in segments]
        ends = [tuple(exact_state(row, segment["h"]) for row in segment["rows"])
                for segment in segments]
        # One exact target per knot/axis/component, shared by its two neighbors.
        targets = [starts[0]]
        for left, right in zip(ends, starts[1:]):
            targets.append(tuple(tuple((x + y) / 2 for x, y in zip(laxis, raxis))
                                 for laxis, raxis in zip(left, right)))
        targets.append(ends[-1])
        join_count += len(segments) - 1
        for index, segment in enumerate(segments):
            segment_count += 1
            for axis in range(3):
                axis_count += 1
                e0 = targets[index][axis][0] - starts[index][axis][0]
                e1 = targets[index + 1][axis][0] - ends[index][axis][0]
                d0 = targets[index][axis][1] - starts[index][axis][1]
                d1 = targets[index + 1][axis][1] - ends[index][axis][1]
                position, velocity = correction_controls(segment["h"], e0, e1, d0, d1)
                for kind, controls in (("position", position), ("velocity", velocity)):
                    axis_radii, scalar = segment["errors"][kind]
                    for control, value in enumerate(controls):
                        for scope, allowance in (("Axis", axis_radii[axis]), ("Scalar", scalar)):
                            checks += 1
                            location = {"member": history["id"], "segment": index, "axis": axis,
                                        "kind": kind, "allowanceKind": scope.lower(), "control": control}
                            worst[kind + scope] = _update_worst(worst[kind + scope], abs(value), allowance, location)
                            if abs(value) > allowance:
                                failures.append({"code": "midpoint_bernstein_allowance_exceeded", **location,
                                                 "signedControl": fraction_record(value),
                                                 "allowance": fraction_record(allowance)})
            speed_squared = velocity_box_squared(segment)
            if speed_worst is None or speed_squared > speed_worst[0]:
                speed_worst = (speed_squared, {"member": history["id"], "segment": index,
                                               "squaredUpper": fraction_record(speed_squared)})
            if speed_squared >= 1:
                failures.append({"code": "velocity_box_subfield_bound_unproved", "member": history["id"],
                                 "segment": index, "squaredUpper": fraction_record(speed_squared)})
            if progress:
                progress(segment_count)
    if production:
        require((segment_count, axis_count, join_count, checks) == (14080, 42240, 14072, 591360),
                "evaluated production census mismatch")
    construction = not any(item["code"] == "midpoint_bernstein_allowance_exceeded" for item in failures)
    return {"constructionFitsOriginalEnclosures": construction,
            "velocityBoxesStrictlySubfield": speed_worst[0] < 1,
            "counts": {"members": len(histories), "segments": segment_count, "axes": axis_count,
                       "internalJoins": join_count, "allowanceComparisons": checks},
            "worstControlAllowanceRatios": {key: value[2] for key, value in worst.items()},
            "worstVelocityBox": speed_worst[1], "failures": failures}


def _stat_identity(info):
    return (info.st_dev, info.st_ino, info.st_size, info.st_mtime_ns, info.st_ctime_ns)


class BoundFile:
    """Retain one regular-file descriptor and recheck its bytes and pathname."""

    def __init__(self, path, limit):
        self.path = Path(path).absolute()
        self.limit = limit
        self.fd = None

    def __enter__(self):
        flags = os.O_RDONLY | os.O_NONBLOCK | getattr(os, "O_NOFOLLOW", 0)
        self.fd = os.open(self.path, flags)
        try:
            self.identity = _stat_identity(os.fstat(self.fd))
            require(stat.S_ISREG(os.fstat(self.fd).st_mode), "input must be a regular file")
            require(0 < self.identity[2] <= self.limit, "input size exceeds bound or is empty")
            self.data = self._read()
            self.digest = sha256(self.data).hexdigest()
            self._check_identity()
            return self
        except BaseException:
            os.close(self.fd)
            self.fd = None
            raise

    def _read(self):
        os.lseek(self.fd, 0, os.SEEK_SET)
        pieces, total = [], 0
        while True:
            chunk = os.read(self.fd, min(1024 * 1024, self.limit + 1 - total))
            if not chunk:
                break
            pieces.append(chunk)
            total += len(chunk)
            require(total <= self.limit, "input grew beyond the size bound")
        return b"".join(pieces)

    def _check_identity(self):
        require(_stat_identity(os.fstat(self.fd)) == self.identity, "open input changed")
        info = os.stat(self.path, follow_symlinks=False)
        require(stat.S_ISREG(info.st_mode) and _stat_identity(info) == self.identity,
                "input pathname replaced or changed")

    def recheck(self):
        self._check_identity()
        data = self._read()
        self._check_identity()
        require(data == self.data and sha256(data).hexdigest() == self.digest, "input bytes changed")
        return self.binding()

    def binding(self):
        return {"path": str(self.path), "sha256": self.digest, "bytes": len(self.data),
                "device": self.identity[0], "inode": self.identity[1],
                "mtimeNs": self.identity[3], "ctimeNs": self.identity[4]}

    def __exit__(self, *unused):
        if self.fd is not None:
            os.close(self.fd)
            self.fd = None


def verify_executing_source(data):
    require(compile(data, _EXECUTING_CODE.co_filename, "exec", dont_inherit=True,
                    optimize=sys.flags.optimize) == _EXECUTING_CODE,
            "executing instrument differs from captured source")


def write_exclusive(output, packet):
    data = (json.dumps(packet, sort_keys=True, separators=(",", ":"), allow_nan=False) + "\n").encode()
    fd = os.open(Path(output), os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600)
    with os.fdopen(fd, "wb") as stream:
        stream.write(data)
        stream.flush()
        os.fsync(stream.fileno())
    return sha256(data).hexdigest()


def _sync_directory(path):
    fd = os.open(path, os.O_RDONLY)
    try:
        os.fsync(fd)
    finally:
        os.close(fd)


class ReceiptPublication:
    """Publish only a complete candidate; preserve rejected attempts privately.

    An accepted file is admissible only at its declared output path together
    with this fresh process's successful completion record and zero exit status.
    A candidate in the private attempt directory is never an accepted receipt.
    """

    def __init__(self, output, packet, watch):
        self.output = Path(output).absolute()
        if os.path.lexists(self.output):
            raise FileExistsError(f"receipt output already exists: {self.output}")
        self.directory = Path(tempfile.mkdtemp(prefix=f".{self.output.name}.attempt-", dir=self.output.parent))
        self.candidate = self.directory / "candidate.json"
        self.packet = packet
        self.watch = watch
        self.published_inode = None
        self.rejected = False
        packet["publication"] = {
            "intendedOutput": str(self.output), "attemptDirectory": str(self.directory),
            "deadlineSeconds": DEADLINE_SECONDS,
            "admissibility": "intended output plus matching fresh-process completion hash, elapsed <= deadline, and exit 0",
            "privateCandidateHasAuthority": False,
        }

    def publish(self):
        self.watch.publication = self
        try:
            self.watch.check_deadline()
            digest = write_exclusive(self.candidate, self.packet)
            info = os.stat(self.candidate, follow_symlinks=False)
            self.published_inode = (info.st_dev, info.st_ino)
            self.watch.check_deadline()  # Includes serialization/write/flush/fsync.
            os.link(self.candidate, self.output)  # Atomic, create-exclusive; no rename-overwrite.
            _sync_directory(self.output.parent)
            self.watch.check_deadline()  # Includes final link and directory durability.
            return digest
        except BaseException as error:
            self.reject(error)
            raise

    def reject(self, error):
        if self.rejected:
            return
        self.rejected = True
        # Acceptance is over. Do not let another deadline alarm interrupt the
        # rejection record; the enclosing watch still restores the old handler.
        signal.setitimer(signal.ITIMER_REAL, 0)
        if self.published_inode is not None:
            try:
                info = os.stat(self.output, follow_symlinks=False)
                if (info.st_dev, info.st_ino) == self.published_inode:
                    # Remove only our public hardlink. Original candidate bytes
                    # remain recoverable in the private attempt directory.
                    os.unlink(self.output)
            except FileNotFoundError:
                pass
        rejected = {**self.packet, "accepted": False,
                    "claims": {key: False for key in self.packet.get("claims", {})},
                    "publication": {**self.packet["publication"], "status": "rejected"},
                    "failures": [*self.packet.get("failures", []),
                                 {"code": "publication_rejected", "detail": str(error),
                                  "exceptionType": type(error).__name__,
                                  "elapsedSeconds": time.monotonic() - self.watch.started}]}
        rejection = self.directory / "rejection.json"
        write_exclusive(rejection, rejected)
        try:
            os.link(rejection, self.output)
        except FileExistsError:
            # A different preexisting/replaced output is not ours to overwrite.
            pass
        _sync_directory(self.directory)
        _sync_directory(self.output.parent)
        print(f"F6c publication rejected; preserved rejection: {rejection}", file=sys.stderr, flush=True)


class ProofWatch:
    def __enter__(self):
        self.started = time.monotonic()
        self.completed = 0
        self.publication = None
        self.publication_elapsed = None
        self.previous = signal.getsignal(signal.SIGALRM)
        self.previous_timer = signal.getitimer(signal.ITIMER_REAL)
        require(self.previous_timer == (0.0, 0.0), "an existing alarm prevents the standalone proof watchdog")
        signal.signal(signal.SIGALRM, self.heartbeat)
        signal.setitimer(signal.ITIMER_REAL, HEARTBEAT_SECONDS, HEARTBEAT_SECONDS)
        return self

    def progress(self, count):
        self.completed = count
        self.check_deadline()

    def check_deadline(self):
        elapsed = time.monotonic() - self.started
        require(elapsed <= DEADLINE_SECONDS, "proof/publication deadline exceeded")
        return elapsed

    def heartbeat(self, *_):
        elapsed = time.monotonic() - self.started
        print(json.dumps({"event": "f6c-compatibility-heartbeat", "segments": self.completed,
                          "elapsedSeconds": round(elapsed, 3)}), file=sys.stderr, flush=True)
        require(elapsed <= DEADLINE_SECONDS, "proof deadline exceeded")

    def __exit__(self, error_type, error, traceback):
        try:
            if error is not None:
                if self.publication is not None:
                    self.publication.reject(error)
            else:
                try:
                    # Last check includes binding-file closure and publication,
                    # immediately before this invocation's alarm is disabled.
                    self.publication_elapsed = self.check_deadline()
                except BaseException as late:
                    if self.publication is not None:
                        self.publication.reject(late)
                    raise
        finally:
            signal.setitimer(signal.ITIMER_REAL, 0)
            signal.signal(signal.SIGALRM, self.previous)


def _verify_export_watched(history_export, output, watch):
    packet = {"schema": SCHEMA, "accepted": False, "h3EvidenceEligible": False,
              "subjectMembershipEstablished": False,
              "authority": "compatible-history-existence-only; no original-subject membership",
              "expectedHistoryExportSha256": EXPORT_SHA256, "runId": RUN_ID,
              "claims": {"nonemptyC1AdmissibleFamilyEstablished": False,
                         "conditionalVelocityBoxSubfield": False,
                         "subjectMembershipEstablished": False, "trajectoryCertified": False,
                         "metricsComputed": False, "accelerationsEvaluated": False,
                         "rootsEvaluated": False, "eomExecuted": False,
                         "rootExecutionAuthorized": False, "measurementAuthorized": False,
                         "h3EvidenceEligible": False},
              "witnessAlgorithm": {"name": "exact-midpoint-knot-Hermite-Bernstein",
                                   "arithmetic": "exact rational lifts of original decimal strings",
                                   "knots": "arithmetic mean of exact left/right nominal positions and derivatives",
                                   "outerEndpoints": "retain own exact nominal position and derivative",
                                   "allowances": "all original per-axis and scalar componentwise radii",
                                   "zeroAllowance": "requires exactly zero controls; zero/zero utilization recorded as zero",
                                   "sourceModification": False},
              "limitations": ["midpoint construction is sufficient, not necessary",
                              "failed control does not prove absence of another compatible history",
                              "witness is not identified with EOM trajectory or accepted-frame interpolant",
                              "no pair-clearance, boundary-sign, causal-root, or acceleration result",
                              "velocity box failure is an unproved bound, not a super-field observation"],
              "failures": []}
    started = watch.started
    with ExitStack() as stack:
        bound = []
        try:
            instrument = stack.enter_context(BoundFile(__file__, MAX_SOURCE_BYTES))
            bound.append(("instrument", instrument))
            packet["instrumentBefore"] = instrument.binding()
            verify_executing_source(instrument.data)
            packet["executingCodeBinding"] = "captured-source compilation equals executing module code object"
            source = stack.enter_context(BoundFile(history_export, MAX_INPUT_BYTES))
            bound.append(("historyExport", source))
            packet["historyExportBefore"] = source.binding()
            require(source.digest == EXPORT_SHA256, "frozen original export SHA-256 mismatch")
            document = parse_export(source.data)
            histories = validate_identity(document)
            result = analyze_paths(histories, production=True, progress=watch.progress)
            packet["analysis"] = result
            packet["failures"].extend(result["failures"])
        except (CompatibilityError, OSError, ValueError, KeyError, TypeError, RecursionError) as error:
            packet["failures"].append({"code": "input_or_structure_rejected", "detail": str(error)})
        for role, source in bound:
            try:
                packet[role + "After"] = source.recheck()
            except (CompatibilityError, OSError) as error:
                packet["failures"].append({"code": "bound_file_changed", "role": role, "detail": str(error)})
        bindings_valid = ("analysis" in packet and all(item["code"] not in
                          {"input_or_structure_rejected", "bound_file_changed"} for item in packet["failures"]))
        if bindings_valid:
            result = packet["analysis"]
            packet["claims"]["nonemptyC1AdmissibleFamilyEstablished"] = result["constructionFitsOriginalEnclosures"]
            packet["claims"]["conditionalVelocityBoxSubfield"] = result["velocityBoxesStrictlySubfield"]
        packet["accepted"] = bindings_valid and not packet["failures"]
        packet["proofElapsedSeconds"] = time.monotonic() - started
        packet["failureDisposition"] = "all evaluated violations retained; malformed structure stops construction"
        receipt_sha = ReceiptPublication(output, packet, watch).publish()
    return packet, receipt_sha


def verify_export(history_export, output):
    """Production entry: fixed original bytes, fresh process, no hash override."""
    with ProofWatch() as watch:
        packet, digest = _verify_export_watched(history_export, output, watch)
    return packet, digest, watch.publication_elapsed


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--history-export", required=True)
    parser.add_argument("--out", required=True, help="new receipt path; must not exist")
    args = parser.parse_args(argv)
    try:
        packet, digest, publication_elapsed = verify_export(args.history_export, args.out)
    except (CompatibilityError, OSError, ValueError) as error:
        print(f"F6c compatibility receipt not published: {error}", file=sys.stderr)
        return 2
    print(json.dumps({"accepted": packet["accepted"], "receiptSha256": digest,
                      "output": args.out, "h3EvidenceEligible": False,
                      "publicationElapsedSeconds": publication_elapsed,
                      "subjectMembershipEstablished": False}, sort_keys=True))
    return 0 if packet["accepted"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
