#!/usr/bin/env python3
"""Exact finite-data F6c guards, conditional on original-box history membership.

Power polynomials are converted to Bernstein controls over whole closed cells.
All decimal strings and comparisons are exact rationals. No solver, root
routine, compatibility witness, or other mathematical oracle is imported.
"""

from __future__ import annotations

import argparse
from contextlib import ExitStack
from fractions import Fraction
from hashlib import sha256
import json
from math import comb
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
THEOREM_SHA256 = "f20e4bdaaff8b6f0012fdc6135b15d568a817832fb55d5c42f80d8421a117f68"
THEOREM_PATH = "reference/priorities/braid-program/evidence/2026-08-27-f6c-continuous-reception-enclosure-contract.md"
SCHEMA = "braid-program/f6c-retained-history-guards.v1"
RUN_ID = "f6c-balanced-tetrahedral-p0.678-n1.25-th3.36-br0.787-cp1.76-hp0.0771-hm-0.147-rp0.0463-rm-0.134-tp0.116-tm-0.254-hhp4.82-hhm2.21-hrp6-hrm3.44-v1"
LABELS = ("0+", "0-", "1+", "1-", "2+", "2-", "3+", "3-")
CHARGE = "0.1666666666666666666666666666666667"
MAX_INPUT_BYTES = 16 * 1024 * 1024
MAX_SOURCE_BYTES = 1024 * 1024
MAX_TOKEN_LENGTH = 256
MAX_DECIMAL_EXPONENT = 256
MAX_RECEPTION_CELLS = 1280
HEARTBEAT_SECONDS = 15
DEADLINE_SECONDS = 1800
MODES = ("axis", "scalar")
DECIMAL_TOKEN = re.compile(r"-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE]([+-]?[0-9]+))?\Z")
SEGMENT_KEYS = {"startTime", "endTime", "coefficients", "positionErrors",
                "velocityErrors", "positionError", "velocityError"}


class GuardError(ValueError):
    pass


def require(condition, message):
    if not condition:
        raise GuardError(message)


def rational(token):
    require(type(token) is str and len(token) <= MAX_TOKEN_LENGTH,
            "decimal token must be a bounded string")
    match = DECIMAL_TOKEN.fullmatch(token)
    require(match is not None, "invalid finite decimal token")
    exponent = match.group(1)
    require(exponent is None or (len(exponent) <= 5 and abs(int(exponent)) <= MAX_DECIMAL_EXPONENT),
            "decimal exponent exceeds instrument resource bound")
    return Fraction(token)


def fraction_record(value):
    return {"numerator": str(value.numerator), "denominator": str(value.denominator)}


def _unique_object(pairs):
    result = {}
    for key, value in pairs:
        require(key not in result, f"duplicate JSON key: {key}")
        result[key] = value
    return result


def _reject_number(value):
    raise GuardError(f"non-integer JSON numeric token: {value}")


def parse_export(data):
    try:
        return json.loads(data.decode("utf-8"), object_pairs_hook=_unique_object,
                          parse_float=_reject_number, parse_constant=_reject_number)
    except (UnicodeError, json.JSONDecodeError) as error:
        raise GuardError(f"invalid UTF-8 JSON: {error}") from error


def require_integer(value, expected, name):
    require(type(value) is int and value == expected, f"{name} mismatch")


def validate_identity(document):
    require(type(document) is dict, "export must be an object")
    require(document.get("schema") == "braid-program/f6c-retained-history-export.v1"
            and document.get("status") == "exported-data-only", "export schema/status mismatch")
    require(document.get("runId") == RUN_ID
            and document.get("modelFingerprint") == "fnv1a64:6b87d1f138d33e13"
            and document.get("generatingSpec") == "F6c-nonlinear-return-map-search-v2-return-continuation",
            "frozen run identity mismatch")
    require(document.get("fieldSpeed") == "1"
            and document.get("coupling") == "10.304229970992187", "frozen numerical literals mismatch")
    require(document.get("interval") == {"start": "0", "end": "0.13"}, "reception interval mismatch")
    expected = {"members": 8, "segments": 14080, "declaredSegmentsPerMember": 1600,
                "evolvedSegmentsPerMember": 160, "acceptedFrames": 81,
                "acceptedFrameIntervals": 80, "orderedPairs": 64}
    counts = document.get("counts")
    require(type(counts) is dict and set(counts) == set(expected), "count fields mismatch")
    for key, value in expected.items():
        require_integer(counts[key], value, key)
    histories = document.get("retainedHistories")
    require(type(histories) is list and len(histories) == 8, "member census mismatch")
    for index, (history, label) in enumerate(zip(histories, LABELS)):
        require(type(history) is dict and history.get("id") == label, "member identity/order mismatch")
        require_integer(history.get("pathKey"), index + 1, "path key")
        positive = index % 2 == 0
        require_integer(history.get("polarity"), 1 if positive else -1, "polarity")
        require_integer(history.get("stateFlags"), 1 if positive else 2, "state flags")
        require(history.get("charge") == (CHARGE if positive else "-" + CHARGE), "signed charge literal mismatch")
        require_integer(history.get("declaredPrehistorySegmentCount"), 1600, "prehistory count")
        require_integer(history.get("evolvedSegmentCount"), 160, "evolved count")
        require(history.get("coverageStart") == "-8" and history.get("coverageEnd") == "0.13",
                "declared retained domain mismatch")
        require(type(history.get("segments")) is list and len(history["segments"]) == 1760,
                "actual segment census mismatch")
    return histories


def parse_segment(raw):
    require(type(raw) is dict and set(raw) == SEGMENT_KEYS, "segment fields mismatch")
    a, b = rational(raw["startTime"]), rational(raw["endTime"])
    require(a < b, "segment duration must be strictly positive")
    rows = raw["coefficients"]
    require(type(rows) is list and len(rows) == 3
            and all(type(row) is list and len(row) == 4 for row in rows), "coefficient shape mismatch")
    errors = {}
    for kind in ("position", "velocity"):
        values = raw[kind + "Errors"]
        require(type(values) is list and len(values) == 3, "error axis census mismatch")
        axes = tuple(rational(value) for value in values)
        scalar = rational(raw[kind + "Error"])
        require(all(value >= 0 for value in axes) and scalar >= max(axes),
                "negative or underbounding original error allowance")
        errors[kind] = {"axis": axes, "scalar": (scalar,) * 3}
    return {"a": a, "b": b, "rows": tuple(tuple(rational(c) for c in row) for row in rows),
            "errors": errors}


def power_shift(coefficients, offset):
    """Exact coefficients of q(offset+u), from the binomial theorem."""
    return tuple(sum((coefficients[j] * comb(j, k) * offset ** (j-k)
                      for j in range(k, len(coefficients))), Fraction(0))
                 for k in range(len(coefficients)))


def derivative(coefficients):
    return tuple(k * coefficients[k] for k in range(1, len(coefficients)))


def bernstein_controls(coefficients, width):
    """Power-to-Bernstein identity on [0,width], not a sampled comparison."""
    require(coefficients and width > 0, "Bernstein hull requires nonempty polynomial and positive width")
    degree = len(coefficients) - 1
    return tuple(sum((coefficients[j] * width**j * Fraction(comb(k, j), comb(degree, j))
                      for j in range(k + 1)), Fraction(0)) for k in range(degree + 1))


def polynomial_box(coefficients, width, radius):
    require(radius >= 0, "negative box radius")
    controls = bernstein_controls(coefficients, width)
    return min(controls) - radius, max(controls) + radius


def norm_squared_bounds(boxes):
    lower = upper = Fraction(0)
    for lo, hi in boxes:
        require(lo <= hi, "inverted coordinate enclosure")
        minimum = Fraction(0) if lo <= 0 <= hi else min(abs(lo), abs(hi))
        maximum = max(abs(lo), abs(hi))
        lower += minimum * minimum
        upper += maximum * maximum
    return lower, upper


def reception_cover(paths, reception):
    """Closed union partition; interior joins occur in both adjacent cells."""
    left, right = reception
    require(left < right, "empty reception domain")
    knots = {left, right}
    for path in paths:
        require(path[0]["a"] <= left < right <= path[-1]["b"], "reception not covered")
        for segment in path:
            if left < segment["a"] < right:
                knots.add(segment["a"])
            if left < segment["b"] < right:
                knots.add(segment["b"])
    ordered = sorted(knots)
    require(len(ordered) - 1 <= MAX_RECEPTION_CELLS, "reception partition exceeds bound")
    indices = [0] * len(paths)
    result = []
    for a, b in zip(ordered, ordered[1:]):
        for member, path in enumerate(paths):
            while indices[member] + 1 < len(path) and path[indices[member]]["b"] <= a:
                indices[member] += 1
            segment = path[indices[member]]
            require(segment["a"] <= a < b <= segment["b"], "cell not contained in original segment")
        result.append((a, b, tuple(indices)))
    require(result[0][0] == left and result[-1][1] == right, "reception endpoints missing")
    return result


def _update_extreme(records, key, value, location, maximize=False):
    old = records.get(key)
    if old is None or (value > old[0] if maximize else value < old[0]):
        records[key] = (value, {**location, "value": fraction_record(value)})


def analyze_guards(histories, *, production=False, reception=(Fraction(0), Fraction(13, 100)),
                   oldest=Fraction(-8), progress=None):
    """Pure sufficient bounds, without source authentication or acceptance authority."""
    require(type(histories) is list and 2 <= len(histories) <= 8, "member census out of bounds")
    ids, paths = [], []
    total_segments = 0
    for history in histories:
        require(type(history) is dict and type(history.get("id")) is str
                and history["id"] not in ids, "missing or duplicate persistent identity")
        raw = history.get("segments")
        require(type(raw) is list and 0 < len(raw) <= 1760, "segment census out of bounds")
        path = [parse_segment(segment) for segment in raw]
        require(path[0]["a"] == oldest and path[-1]["b"] == reception[1], "retained endpoints mismatch")
        require(all(a["b"] == b["a"] for a, b in zip(path, path[1:])), "exact history gap or overlap")
        if production:
            require(len(path) == 1760 and path[1599]["b"] == path[1600]["a"] == 0,
                    "production prehistory/evolved split mismatch")
        ids.append(history["id"])
        paths.append(path)
        total_segments += len(path)
        if progress:
            progress("parse", total_segments)
    if production:
        require(tuple(ids) == LABELS and total_segments == 14080
                and reception == (Fraction(0), Fraction(13, 100)) and oldest == -8,
                "production identity/domain census mismatch")
    require(oldest < reception[0], "oldest boundary must precede reception")
    cells = reception_cover(paths, reception)
    unordered = [(i, j) for i in range(len(paths)) for j in range(i + 1, len(paths))]
    ordered = [(i, j) for i in range(len(paths)) for j in range(len(paths)) if i != j]
    speed, clearance, boundary = {}, {}, {}
    checks = {"speed": 0, "clearance": 0, "oldestBoundary": 0}
    failures = {key: 0 for key in checks}
    check_hash = sha256()

    def check(kind, value, location, passed):
        checks[kind] += 1
        if not passed:
            failures[kind] += 1
        payload = {"kind": kind, **location, "value": fraction_record(value), "passed": passed}
        check_hash.update((json.dumps(payload, sort_keys=True, separators=(",", ":")) + "\n").encode())

    completed = 0
    for member, path in enumerate(paths):
        for index, segment in enumerate(path):
            width = segment["b"] - segment["a"]
            for mode in MODES:
                boxes = [polynomial_box(derivative(row), width, radius) for row, radius in
                         zip(segment["rows"], segment["errors"]["velocity"][mode])]
                upper = norm_squared_bounds(boxes)[1]
                location = {"member": ids[member], "segment": index, "allowances": mode}
                _update_extreme(speed, (member, mode), upper, location, maximize=True)
                check("speed", upper, location, upper < 1)
            completed += 1
            if progress and completed % 64 == 0:
                progress("speed", completed)
    for cell_index, (a, b, indices) in enumerate(cells):
        width = b - a
        segments = [path[index] for path, index in zip(paths, indices)]
        shifted = [tuple(power_shift(row, a - segment["a"]) for row in segment["rows"])
                   for segment in segments]
        for mode in MODES:
            for i, j in unordered:
                boxes = []
                for axis in range(3):
                    difference = tuple(x-y for x, y in zip(shifted[i][axis], shifted[j][axis]))
                    radius = (segments[i]["errors"]["position"][mode][axis]
                              + segments[j]["errors"]["position"][mode][axis])
                    boxes.append(polynomial_box(difference, width, radius))
                lower = norm_squared_bounds(boxes)[0]
                location = {"pair": [ids[i], ids[j]], "cell": cell_index, "allowances": mode}
                _update_extreme(clearance, (i, j, mode), lower, location)
                check("clearance", lower, location, lower > 0)
            for i, j in ordered:
                boxes = []
                for axis in range(3):
                    coefficients = list(shifted[i][axis])
                    coefficients[0] -= paths[j][0]["rows"][axis][0]
                    radius = (segments[i]["errors"]["position"][mode][axis]
                              + paths[j][0]["errors"]["position"][mode][axis])
                    boxes.append(polynomial_box(coefficients, width, radius))
                upper = norm_squared_bounds(boxes)[1]
                # Positive margin proves ||Xi(R)-Xj(oldest)|| < R-oldest
                # everywhere in this closed cell, without a square-root seam.
                margin = (a - oldest)**2 - upper
                location = {"receiver": ids[i], "transmitter": ids[j], "cell": cell_index,
                            "allowances": mode}
                _update_extreme(boundary, (i, j, mode), margin, location)
                check("oldestBoundary", margin, location, margin > 0)
        if progress:
            progress("reception", cell_index + 1)
    expected = {"speed": total_segments * 2, "clearance": len(cells) * len(unordered) * 2,
                "oldestBoundary": len(cells) * len(ordered) * 2}
    require(checks == expected, "guard evaluation census mismatch")
    members = [{"id": label, "pathKey": histories[index].get("pathKey"),
                "polarity": histories[index].get("polarity"),
                "stateFlags": histories[index].get("stateFlags"),
                "charge": histories[index].get("charge"),
                "segments": len(paths[index]), "maximumSpeedSquared":
                {mode: speed[(index, mode)][1] for mode in MODES}} for index, label in enumerate(ids)]
    return {"uniformSpeedStrictlyBelowOne": failures["speed"] == 0,
            "uniformSameTimeNonselfSeparation": failures["clearance"] == 0,
            "uniformOldestBoundaryResidualStrictlyNegative": failures["oldestBoundary"] == 0,
            "counts": {"members": len(paths), "segments": total_segments, "axes": total_segments * 3,
                       "internalJoins": total_segments - len(paths), "receptionCells": len(cells),
                       "unorderedNonselfPairs": len(unordered), "orderedNonselfPairs": len(ordered),
                       "comparisons": checks, "failedComparisons": failures},
            "members": members,
            "closedReceptionCells": [{"start": fraction_record(a), "end": fraction_record(b),
                                      "memberSegmentIndices": list(indices)} for a, b, indices in cells],
            "clearancePairs": [{"unordered": [ids[i], ids[j]],
                                "ordered": [[ids[i], ids[j]], [ids[j], ids[i]]],
                                "minimumSeparationSquared":
                                {mode: clearance[(i, j, mode)][1] for mode in MODES}} for i, j in unordered],
            "oldestBoundaryPairs": [{"receiver": ids[i], "transmitter": ids[j],
                                      "minimumDelaySquaredMinusDistanceSquared":
                                      {mode: boundary[(i, j, mode)][1] for mode in MODES}} for i, j in ordered],
            "comparisonOrder": "member/segment/mode speed, then cell/mode/unordered clearance/ordered boundary",
            "comparisonSha256": check_hash.hexdigest(),
            "failureDisposition": "all comparisons evaluated and hashed; exact failed counts and worst witness per member/pair retained",
            "failures": [{"code": kind + "_guard_unproved", "failedComparisons": count}
                         for kind, count in failures.items() if count]}


# Operational file capture/publication follows the separately reviewed F6c
# compatibility instrument's pattern. Its mathematical implementation is not
# imported or used as a comparison/reference here.
def _stat_identity(info):
    return info.st_dev, info.st_ino, info.st_size, info.st_mtime_ns, info.st_ctime_ns


class BoundFile:
    def __init__(self, path, limit):
        self.path, self.limit, self.fd = Path(path).absolute(), limit, None

    def __enter__(self):
        self.fd = os.open(self.path, os.O_RDONLY | os.O_NONBLOCK | getattr(os, "O_NOFOLLOW", 0))
        try:
            info = os.fstat(self.fd)
            require(stat.S_ISREG(info.st_mode), "input must be a regular file")
            self.identity = _stat_identity(info)
            require(0 < info.st_size <= self.limit, "input size exceeds bound or is empty")
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
            total += len(chunk)
            require(total <= self.limit, "input grew beyond bound")
            pieces.append(chunk)
        return b"".join(pieces)

    def _check_identity(self):
        require(_stat_identity(os.fstat(self.fd)) == self.identity, "open input changed")
        info = os.stat(self.path, follow_symlinks=False)
        require(stat.S_ISREG(info.st_mode) and _stat_identity(info) == self.identity,
                "input pathname replaced or changed")

    def binding(self):
        return {"path": str(self.path), "sha256": self.digest, "bytes": len(self.data),
                "device": self.identity[0], "inode": self.identity[1],
                "mtimeNs": self.identity[3], "ctimeNs": self.identity[4]}

    def recheck(self):
        self._check_identity()
        data = self._read()
        self._check_identity()
        require(data == self.data and sha256(data).hexdigest() == self.digest, "input bytes changed")
        return self.binding()

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
    def __init__(self, output, packet, watch):
        self.output = Path(output).absolute()
        if os.path.lexists(self.output):
            raise FileExistsError(f"receipt output already exists: {self.output}")
        self.directory = Path(tempfile.mkdtemp(prefix=f".{self.output.name}.attempt-", dir=self.output.parent))
        self.candidate = self.directory / "candidate.json"
        self.packet, self.watch = packet, watch
        self.published_inode, self.rejected = None, False
        packet["publication"] = {
            "intendedOutput": str(self.output), "attemptDirectory": str(self.directory),
            "deadlineSeconds": DEADLINE_SECONDS,
            "admissibility": "intended output plus matching fresh-process completion hash, elapsed <= deadline, and exit 0",
            "privateCandidateHasAuthority": False}

    def publish(self):
        self.watch.publication = self
        try:
            self.watch.check_deadline()
            digest = write_exclusive(self.candidate, self.packet)
            info = os.stat(self.candidate, follow_symlinks=False)
            self.published_inode = info.st_dev, info.st_ino
            self.watch.check_deadline()
            os.link(self.candidate, self.output)
            _sync_directory(self.output.parent)
            self.watch.check_deadline()
            return digest
        except BaseException as error:
            self.reject(error)
            raise

    def reject(self, error):
        if self.rejected:
            return
        self.rejected = True
        signal.setitimer(signal.ITIMER_REAL, 0)
        if self.published_inode is not None:
            try:
                info = os.stat(self.output, follow_symlinks=False)
                if (info.st_dev, info.st_ino) == self.published_inode:
                    os.unlink(self.output)  # Only this attempt's link; private evidence is retained.
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
            pass
        _sync_directory(self.directory)
        _sync_directory(self.output.parent)
        print(f"F6c guard publication rejected; preserved rejection: {rejection}", file=sys.stderr, flush=True)


class ProofWatch:
    def __enter__(self):
        self.started = time.monotonic()
        self.stage, self.completed = "capture", 0
        self.publication, self.publication_elapsed = None, None
        self.previous = signal.getsignal(signal.SIGALRM)
        require(signal.getitimer(signal.ITIMER_REAL) == (0.0, 0.0), "existing alarm prevents standalone watchdog")
        signal.signal(signal.SIGALRM, self.heartbeat)
        signal.setitimer(signal.ITIMER_REAL, HEARTBEAT_SECONDS, HEARTBEAT_SECONDS)
        return self

    def progress(self, stage, completed):
        self.stage, self.completed = stage, completed
        self.check_deadline()

    def check_deadline(self):
        elapsed = time.monotonic() - self.started
        require(elapsed <= DEADLINE_SECONDS, "proof/publication deadline exceeded")
        return elapsed

    def heartbeat(self, *_):
        elapsed = time.monotonic() - self.started
        print(json.dumps({"event": "f6c-guards-heartbeat", "stage": self.stage, "completed": self.completed,
                          "elapsedSeconds": round(elapsed, 3)}), file=sys.stderr, flush=True)
        require(elapsed <= DEADLINE_SECONDS, "proof deadline exceeded")

    def __exit__(self, error_type, error, traceback):
        try:
            if error is not None:
                if self.publication is not None:
                    self.publication.reject(error)
            else:
                try:
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
              "subjectMembershipEstablished": False, "runId": RUN_ID, "fieldSpeed": "1",
              "authority": "exact finite-data uniform guards conditional on coherent original-box history membership",
              "retainedDomain": {"start": "-8", "end": "0.13"},
              "receptionDomain": {"start": "0", "end": "0.13"}, "oldestBoundaryTime": "-8",
              "expectedHistoryExportSha256": EXPORT_SHA256, "expectedTheoremSha256": THEOREM_SHA256,
              "claims": {"conditionalUniformSpeedStrictlyBelowOne": False,
                         "conditionalUniformSameTimeNonselfSeparation": False,
                         "conditionalUniformOldestBoundaryResidualStrictlyNegative": False,
                         "nonemptyC1AdmissibleFamilyEstablished": False,
                         "subjectMembershipEstablished": False, "trajectoryCertified": False,
                         "metricsComputed": False, "accelerationsEvaluated": False,
                         "rootsEvaluated": False, "eomExecuted": False,
                         "rootExecutionAuthorized": False, "measurementAuthorized": False,
                         "h3EvidenceEligible": False},
              "algorithm": {"arithmetic": "exact rational lifts of original decimal strings",
                            "enclosure": "power-to-Bernstein convex hull on every closed original segment/reception cell",
                            "allowances": "both original per-axis radii and original scalar radius on every component",
                            "sameTime": "subtract shifted cubics before interval hull; no independent-time substitution",
                            "oldestBoundary": "unrestricted distance upper squared < minimum delay squared; no root-derived clipping",
                            "sharedEndpoints": "all neighboring closed cells included; speed checked on both original sides",
                            "sourceModification": False},
              "limitations": ["conditional on one coherent C1 history and its derivative inside all original boxes",
                              "compatible-family existence and actual trajectory membership are separate obligations",
                              "failed sufficient bound is unproved guard, not collision, super-field motion, or nonexistence",
                              "finite retained history only; no causal-root, acceleration, dynamics, metric, or H3 receipt"],
              "failures": []}
    with ExitStack() as stack:
        bound = []
        try:
            instrument = stack.enter_context(BoundFile(__file__, MAX_SOURCE_BYTES))
            bound.append(("instrument", instrument))
            packet["instrumentBefore"] = instrument.binding()
            verify_executing_source(instrument.data)
            packet["executingCodeBinding"] = "captured-source compilation equals executing module code object"
            theorem = stack.enter_context(BoundFile(Path(__file__).resolve().parents[2] / THEOREM_PATH, MAX_SOURCE_BYTES))
            bound.append(("theorem", theorem))
            packet["theoremBefore"] = theorem.binding()
            require(theorem.digest == THEOREM_SHA256, "frozen theorem SHA-256 mismatch")
            source = stack.enter_context(BoundFile(history_export, MAX_INPUT_BYTES))
            bound.append(("historyExport", source))
            packet["historyExportBefore"] = source.binding()
            require(source.digest == EXPORT_SHA256, "frozen original export SHA-256 mismatch")
            histories = validate_identity(parse_export(source.data))
            result = analyze_guards(histories, production=True, progress=watch.progress)
            packet["analysis"] = result
            packet["failures"].extend(result["failures"])
        except (GuardError, OSError, ValueError, KeyError, TypeError, RecursionError) as error:
            packet["failures"].append({"code": "input_or_structure_rejected", "detail": str(error)})
        for role, source in bound:
            try:
                packet[role + "After"] = source.recheck()
            except (GuardError, OSError) as error:
                packet["failures"].append({"code": "bound_file_changed", "role": role, "detail": str(error)})
        bindings_valid = ("analysis" in packet and not any(item["code"] in
                          {"input_or_structure_rejected", "bound_file_changed"} for item in packet["failures"]))
        if bindings_valid:
            for claim, field in (("conditionalUniformSpeedStrictlyBelowOne", "uniformSpeedStrictlyBelowOne"),
                                 ("conditionalUniformSameTimeNonselfSeparation", "uniformSameTimeNonselfSeparation"),
                                 ("conditionalUniformOldestBoundaryResidualStrictlyNegative",
                                  "uniformOldestBoundaryResidualStrictlyNegative")):
                packet["claims"][claim] = packet["analysis"][field]
        packet["accepted"] = bindings_valid and not packet["failures"]
        packet["proofElapsedSeconds"] = time.monotonic() - watch.started
        digest = ReceiptPublication(output, packet, watch).publish()
    return packet, digest


def verify_export(history_export, output):
    with ProofWatch() as watch:
        packet, digest = _verify_export_watched(history_export, output, watch)
    return packet, digest, watch.publication_elapsed


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--history-export", required=True)
    parser.add_argument("--out", required=True, help="new receipt path; must not exist")
    args = parser.parse_args(argv)
    try:
        packet, digest, elapsed = verify_export(args.history_export, args.out)
    except (GuardError, OSError, ValueError) as error:
        print(f"F6c guard receipt not published: {error}", file=sys.stderr, flush=True)
        return 2
    print(json.dumps({"accepted": packet["accepted"], "receiptSha256": digest,
                      "output": args.out, "publicationElapsedSeconds": elapsed,
                      "subjectMembershipEstablished": False, "h3EvidenceEligible": False}, sort_keys=True))
    return 0 if packet["accepted"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
