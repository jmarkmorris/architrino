#!/usr/bin/env python3
"""Exact anchored-past / accepted-frame-future containment, not dynamics.

The independent reference is the frozen reconstruction theorem. This standalone
instrument imports no solver, previous verifier, or reference mathematics.
Accepted receipts require fresh successful CLI closure as well as their bytes.
"""

from __future__ import annotations

import argparse
from contextlib import ExitStack
from fractions import Fraction as F
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
THEOREMS = {
    "reference/priorities/braid-program/evidence/2026-08-27-f6c-accepted-frame-history-reconstruction.md": "710279f5c348a81fd36d58c6ca704730b3fa70da729ca30b9c92ae4e1cc6734b",
    "reference/priorities/braid-program/evidence/2026-08-27-f6c-continuous-reception-enclosure-contract.md": "db38185a68210cc8567b0b9f054c6deb5d32509f858cefb5701511a4e23ef2bc",
}
RUN_ID = "f6c-balanced-tetrahedral-p0.678-n1.25-th3.36-br0.787-cp1.76-hp0.0771-hm-0.147-rp0.0463-rm-0.134-tp0.116-tm-0.254-hhp4.82-hhm2.21-hrp6-hrm3.44-v1"
LABELS = ("0+", "0-", "1+", "1-", "2+", "2-", "3+", "3-")
CHARGE = "0.1666666666666666666666666666666667"
SCHEMA = "braid-program/f6c-accepted-frame-reconstruction.v1"
MAX_INPUT_BYTES = 16 * 1024 * 1024
MAX_INSTRUMENT_BYTES = 1024 * 1024
HEARTBEAT_SECONDS, DEADLINE_SECONDS = 15, 1800
TOKEN = re.compile(r"-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE]([+-]?[0-9]+))?\Z")
COUNTS = {"members": 8, "segments": 14080, "declaredSegmentsPerMember": 1600,
          "evolvedSegmentsPerMember": 160, "acceptedFrames": 81,
          "acceptedFrameIntervals": 80, "orderedPairs": 64}


class ProofError(ValueError):
    pass


def require(condition, message):
    if not condition:
        raise ProofError(message)


def exact(token):
    require(type(token) is str and len(token) <= 256, "bounded decimal string required")
    match = TOKEN.fullmatch(token)
    require(match is not None, "invalid finite decimal token")
    exponent = match.group(1)
    require(exponent is None or (len(exponent) <= 5 and abs(int(exponent)) <= 256),
            "decimal exponent exceeds resource bound")
    return F(token)


def ratio(value):
    return {"numerator": str(value.numerator), "denominator": str(value.denominator)}


def exact_int(value, expected, name):
    require(type(value) is int and value == expected, f"{name} mismatch")


def unique_object(pairs):
    result = {}
    for key, value in pairs:
        require(key not in result, f"duplicate JSON key: {key}")
        result[key] = value
    return result


def reject_number(token):
    raise ProofError(f"non-integer JSON number: {token}")


def parse_json(data):
    try:
        return json.loads(data.decode("utf-8"), object_pairs_hook=unique_object,
                          parse_float=reject_number, parse_constant=reject_number)
    except (UnicodeError, json.JSONDecodeError) as error:
        raise ProofError(f"invalid UTF-8 JSON: {error}") from error


def vector(value):
    require(type(value) is dict and set(value) == {"x", "y", "z"}, "frame vector fields")
    return tuple(exact(value[key]) for key in ("x", "y", "z"))


def validate_export(document):
    require(type(document) is dict, "export object required")
    require(document.get("schema") == "braid-program/f6c-retained-history-export.v1"
            and document.get("status") == "exported-data-only", "export schema/status")
    require(document.get("runId") == RUN_ID
            and document.get("modelFingerprint") == "fnv1a64:6b87d1f138d33e13"
            and document.get("generatingSpec") == "F6c-nonlinear-return-map-search-v2-return-continuation",
            "frozen run identity")
    require(document.get("fieldSpeed") == "1" and document.get("coupling") == "10.304229970992187",
            "frozen numerical literals")
    require(document.get("interval") == {"start": "0", "end": "0.13"}, "measurement interval")
    counts = document.get("counts")
    require(type(counts) is dict and set(counts) == set(COUNTS), "count fields")
    for key, value in COUNTS.items():
        exact_int(counts[key], value, key)
    histories = document.get("retainedHistories")
    require(type(histories) is list and len(histories) == 8, "history member census")
    for index, history in enumerate(histories):
        require(type(history) is dict and history.get("id") == LABELS[index], "history identity/order")
        for field, expected in (("pathKey", index + 1), ("polarity", 1 if index % 2 == 0 else -1),
                                ("stateFlags", 1 if index % 2 == 0 else 2),
                                ("declaredPrehistorySegmentCount", 1600), ("evolvedSegmentCount", 160)):
            exact_int(history.get(field), expected, field)
        require(history.get("charge") == ("" if index % 2 == 0 else "-") + CHARGE,
                "signed polarity literal")
        require(history.get("coverageStart") == "-8" and history.get("coverageEnd") == "0.13",
                "declared retained domain")
        require(type(history.get("segments")) is list and len(history["segments"]) == 1760,
                "actual stored segment census")
    frames = document.get("acceptedFrames")
    require(type(frames) is list and len(frames) == 81, "accepted frame census")
    times, states = [], [[] for _ in LABELS]
    for index, frame in enumerate(frames):
        require(type(frame) is dict and set(frame) == {"frameIndex", "time", "members"}, "frame fields")
        exact_int(frame["frameIndex"], index, "frame index")
        frame_time = exact(frame["time"])
        require(not times or times[-1] < frame_time, "frame time ordering")
        times.append(frame_time)
        require(type(frame["members"]) is list and len(frame["members"]) == 8, "frame member census")
        for member, row in enumerate(frame["members"]):
            require(type(row) is dict and set(row) == {"pathKey", "position", "velocity", "positionErrorBound", "stateFlags"},
                    "frame member fields")
            exact_int(row["pathKey"], member + 1, "frame path key/order")
            exact_int(row["stateFlags"], 1 if member % 2 == 0 else 2, "frame state flags")
            require(exact(row["positionErrorBound"]) >= 0, "negative frame provenance error")
            # Frame errors remain provenance. They never enlarge or shift H.
            states[member].append((vector(row["position"]), vector(row["velocity"])))
    require(times[0] == 0 and times[-1] == F(13, 100), "actual frame domain")
    intervals = document.get("acceptedFrameIntervals")
    require(type(intervals) is list and len(intervals) == 80, "accepted interval census")
    for index, interval in enumerate(intervals):
        require(type(interval) is dict and set(interval) == {"leftFrameIndex", "rightFrameIndex", "startTime", "endTime"},
                "accepted interval fields")
        exact_int(interval["leftFrameIndex"], index, "left frame index")
        exact_int(interval["rightFrameIndex"], index + 1, "right frame index")
        require(interval["startTime"] == frames[index]["time"]
                and interval["endTime"] == frames[index + 1]["time"], "accepted interval token binding")
    return histories, times, states


def parse_segment(item):
    require(type(item) is dict and set(item) == {"startTime", "endTime", "coefficients", "positionErrors",
                                                "velocityErrors", "positionError", "velocityError"}, "stored segment fields")
    a, b = exact(item["startTime"]), exact(item["endTime"])
    require(a < b, "positive stored duration required")
    rows = item["coefficients"]
    require(type(rows) is list and len(rows) == 3
            and all(type(row) is list and len(row) == 4 for row in rows), "stored coefficient shape")
    radii = {}
    for kind in ("position", "velocity"):
        axes = item[kind + "Errors"]
        require(type(axes) is list and len(axes) == 3, "stored radius axis census")
        axes = tuple(exact(value) for value in axes)
        scalar = exact(item[kind + "Error"])
        require(all(value >= 0 for value in axes) and scalar >= max(axes), "invalid original radius")
        radii[kind] = (axes, scalar)
    return {"a": a, "b": b, "rows": tuple(tuple(exact(value) for value in row) for row in rows), "radii": radii}


def state(row, u):
    a, b, c, d = row
    return a + u*(b + u*(c + u*d)), b + u*(2*c + u*3*d)


def hermite(p0, v0, p1, v1, h):
    require(all(type(value) is F for value in (p0, v0, p1, v1, h)) and h > 0,
            "Hermite operands must be exact Fractions with positive duration")
    return (p0, v0, (3*(p1-p0)/h - 2*v0-v1)/h, (2*(p0-p1)/h + v0+v1)/(h*h))


def shifted(row, offset):
    a, b = state(row, offset)
    return a, b, row[2] + 3*row[3]*offset, row[3]


def difference_controls(row, width):
    require(type(width) is F and width > 0 and all(type(value) is F for value in row),
            "exact positive-width difference operands required")
    a, b, c, d = row
    return ((a, a + width*b/3, a + 2*width*b/3 + width*width*c/3,
             a + width*b + width*width*c + width**3*d),
            (b, b + width*c, b + 2*width*c + 3*width*width*d))


def correction_controls(h, e0, e1, d0, d1):
    require(all(type(value) is F for value in (h, e0, e1, d0, d1)) and h > 0,
            "exact positive-duration correction operands required")
    position = (e0, e0+h*d0/3, e1-h*d1/3, e1)
    # Derivative Bernstein controls follow from successive position differences.
    velocity = tuple(3*(position[index+1]-position[index])/h for index in range(3))
    return position, velocity


def partition(segments, start, end):
    require(segments and segments[0]["a"] == start and segments[-1]["b"] == end, "partition domain")
    require(all(left["b"] == right["a"] for left, right in zip(segments, segments[1:])), "partition gap or overlap")


def aligned_cells(evolved, times):
    partition(evolved, times[0], times[-1])
    endpoints = {evolved[0]["a"], *(item["b"] for item in evolved)}
    require(all(value in endpoints for value in times), "frame knot not aligned to evolved endpoints")
    frame = 0
    result = []
    for index, item in enumerate(evolved):
        while frame + 1 < len(times)-1 and item["a"] >= times[frame+1]:
            frame += 1
        require(times[frame] <= item["a"] < item["b"] <= times[frame+1], "wrong frame cubic coverage")
        result.append((index, frame, item["a"], item["b"]))
    require(sum(b-a for _, _, a, b in result) == times[-1]-times[0], "incomplete future cell widths")
    return result


class ControlAudit:
    def __init__(self):
        self.comparisons = 0
        self.failures = []
        self.worst = {}

    def check(self, controls, segment, phase, member, index, axis):
        for kind, values in zip(("position", "velocity"), controls):
            radii, scalar = segment["radii"][kind]
            for control_index, value in enumerate(values):
                for scope, allowance in (("axis", radii[axis]), ("scalar", scalar)):
                    self.comparisons += 1
                    location = {"phase": phase, "member": member, "segment": index, "axis": axis,
                                "kind": kind, "radiusKind": scope, "control": control_index}
                    used = abs(value)
                    utilization = used/allowance if allowance else (F(0) if not used else None)
                    key = f"{phase}:{kind}:{scope}"
                    previous = self.worst.get(key)
                    if previous is None or (previous[0] is not None and
                                             (utilization is None or utilization > previous[0])):
                        self.worst[key] = (utilization, {**location, "absoluteControl": ratio(used),
                                                       "allowance": ratio(allowance),
                                                       "ratio": None if utilization is None else ratio(utilization),
                                                       "unboundedRatio": utilization is None})
                    if used > allowance:
                        self.failures.append({"code": "sufficient_control_bound_failed", **location,
                                              "signedControl": ratio(value), "allowance": ratio(allowance)})


def prove_member(raw_segments, times, frames, *, member="independent-control", prehistory_count=1600,
                 audit=None, progress=None):
    """Exact mathematical helper; it cannot issue source-bound acceptance."""
    require(type(prehistory_count) is int and 0 < prehistory_count < len(raw_segments), "prehistory split census")
    require(len(times) == len(frames) >= 2 and times[0] == 0
            and all(a < b for a, b in zip(times, times[1:])), "frame domain/order")
    segments = [parse_segment(item) for item in raw_segments]
    past, future = segments[:prehistory_count], segments[prehistory_count:]
    partition(past, F(-8), F(0))
    partition(future, F(0), times[-1])
    audit = audit if audit is not None else ControlAudit()
    start_states = [tuple(state(row, F(0)) for row in item["rows"]) for item in past]
    end_states = [tuple(state(row, item["b"]-item["a"]) for row in item["rows"]) for item in past]
    targets = [start_states[0]]
    for left, right in zip(end_states, start_states[1:]):
        targets.append(tuple(((left[k][0]+right[k][0])/2, (left[k][1]+right[k][1])/2) for k in range(3)))
    targets.append(tuple(zip(frames[0][0], frames[0][1])))  # Exact H(0), H'(0), not a midpoint.
    for index, item in enumerate(past):
        h = item["b"]-item["a"]
        for axis in range(3):
            e0, d0 = (targets[index][axis][k]-start_states[index][axis][k] for k in range(2))
            e1, d1 = (targets[index+1][axis][k]-end_states[index][axis][k] for k in range(2))
            controls = correction_controls(h, e0, e1, d0, d1)
            audit.check(controls, item, "anchoredPrehistory", member, index, axis)
        if progress:
            progress()
    cubics = []
    for index, (left, right) in enumerate(zip(frames, frames[1:])):
        h = times[index+1]-times[index]
        rows = tuple(hermite(left[0][axis], left[1][axis], right[0][axis], right[1][axis], h) for axis in range(3))
        for axis, row in enumerate(rows):
            require(state(row, F(0)) == (left[0][axis], left[1][axis])
                    and state(row, h) == (right[0][axis], right[1][axis]), "exact Hermite endpoint identity failed")
        cubics.append(rows)
    # Shared frame data plus these identities prove all future C1 joins.
    cells = aligned_cells(future, times)
    for index, frame, a, b in cells:
        item = future[index]
        for axis in range(3):
            hrow = shifted(cubics[frame][axis], a-times[frame])
            qrow = shifted(item["rows"][axis], a-item["a"])
            delta = tuple(x-y for x, y in zip(hrow, qrow))
            audit.check(difference_controls(delta, b-a), item, "acceptedFrameFuture", member,
                        prehistory_count+index, axis)
        if progress:
            progress()
    return {"member": member, "prehistorySegments": len(past), "prehistoryInternalJoins": len(past)-1,
            "releaseAnchors": 1, "frameCubics": len(cubics), "futureFrameC1Joins": len(cubics)-1,
            "hermiteEndpointScalarEqualities": len(cubics)*12, "evolvedSegments": len(future),
            "futureContainmentCells": len(cells), "prehistoryAxes": len(past)*3, "futureAxes": len(cells)*3,
            "prehistoryWidth": ratio(F(8)), "futureCellWidthSum": ratio(sum(b-a for _, _, a, b in cells)),
            "releasePosition": [ratio(value) for value in frames[0][0]],
            "releaseVelocity": [ratio(value) for value in frames[0][1]]}, audit


def analyze_export(document, progress=None):
    histories, times, frames = validate_export(document)
    audit, members = ControlAudit(), []
    for index, history in enumerate(histories):
        require(len(history["segments"]) == 1760, "complete member segment census")
        summary, _ = prove_member(history["segments"], times, frames[index], member=LABELS[index],
                                  prehistory_count=1600, audit=audit, progress=progress)
        require(summary["frameCubics"] == 80 and summary["futureContainmentCells"] == 160,
                "production frame/cell census")
        members.append(summary)
    fields = ("prehistorySegments", "prehistoryInternalJoins", "releaseAnchors", "frameCubics",
              "futureFrameC1Joins", "hermiteEndpointScalarEqualities", "evolvedSegments",
              "futureContainmentCells", "prehistoryAxes", "futureAxes")
    counts = {field: sum(member[field] for member in members) for field in fields}
    counts.update(members=8, acceptedFrames=81, frameMemberRows=648, acceptedFrameIntervals=80,
                  allowanceComparisons=audit.comparisons)
    require(tuple(counts[field] for field in fields) == (12800, 12792, 8, 640, 632, 7680, 1280, 1280, 38400, 3840)
            and audit.comparisons == 591360, "evaluated production census")
    return {"counts": counts, "members": members,
            "anchoredPrehistoryFits": not any(row["phase"] == "anchoredPrehistory" for row in audit.failures),
            "acceptedFrameFutureFits": not any(row["phase"] == "acceptedFrameFuture" for row in audit.failures),
            "exactFutureC1AndReleaseAnchors": True,
            "worstControlAllowanceRatios": {key: value[1] for key, value in audit.worst.items()},
            "failures": audit.failures}


def file_identity(info):
    return info.st_dev, info.st_ino, info.st_size, info.st_mtime_ns, info.st_ctime_ns


class BoundFile:
    def __init__(self, path, limit):
        self.path, self.limit, self.fd = Path(path).absolute(), limit, None

    def __enter__(self):
        self.fd = os.open(self.path, os.O_RDONLY | os.O_NONBLOCK | getattr(os, "O_NOFOLLOW", 0))
        try:
            info = os.fstat(self.fd)
            require(stat.S_ISREG(info.st_mode) and 0 < info.st_size <= self.limit, "bounded nonempty regular input required")
            self.identity = file_identity(info)
            self.data = self.read()
            self.digest = sha256(self.data).hexdigest()
            self.check_identity()
            return self
        except BaseException:
            os.close(self.fd)
            self.fd = None
            raise

    def read(self):
        os.lseek(self.fd, 0, os.SEEK_SET)
        chunks, size = [], 0
        while True:
            chunk = os.read(self.fd, min(1024*1024, self.limit+1-size))
            if not chunk:
                break
            chunks.append(chunk)
            size += len(chunk)
            require(size <= self.limit, "input exceeded size bound")
        return b"".join(chunks)

    def check_identity(self):
        info = os.stat(self.path, follow_symlinks=False)
        require(stat.S_ISREG(info.st_mode) and file_identity(info) == self.identity
                and file_identity(os.fstat(self.fd)) == self.identity, "input changed or pathname replaced")

    def recheck(self):
        self.check_identity()
        data = self.read()
        self.check_identity()
        require(data == self.data and sha256(data).hexdigest() == self.digest, "original input bytes changed")
        return self.binding()

    def binding(self):
        return {"path": str(self.path), "sha256": self.digest, "bytes": len(self.data),
                "device": self.identity[0], "inode": self.identity[1], "mtimeNs": self.identity[3], "ctimeNs": self.identity[4]}

    def __exit__(self, *unused):
        if self.fd is not None:
            os.close(self.fd)
            self.fd = None


def verify_executing_source(data):
    require(compile(data, _EXECUTING_CODE.co_filename, "exec", dont_inherit=True,
                    optimize=sys.flags.optimize) == _EXECUTING_CODE, "executing code differs from captured source")


def write_exclusive(path, packet):
    data = (json.dumps(packet, sort_keys=True, separators=(",", ":"), allow_nan=False) + "\n").encode()
    fd = os.open(path, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600)
    with os.fdopen(fd, "wb") as stream:
        stream.write(data)
        stream.flush()
        os.fsync(stream.fileno())
    return sha256(data).hexdigest()


def sync_directory(path):
    fd = os.open(path, os.O_RDONLY)
    try:
        os.fsync(fd)
    finally:
        os.close(fd)


class Publication:
    """Private candidate, exclusive public link, deadline through durable closure."""
    def __init__(self, output, packet, watch):
        self.output, self.packet, self.watch = Path(output).absolute(), packet, watch
        if os.path.lexists(self.output):
            raise FileExistsError(f"output already exists: {self.output}")
        self.directory = Path(tempfile.mkdtemp(prefix=f".{self.output.name}.attempt-", dir=self.output.parent))
        self.candidate = self.directory / "candidate.json"
        self.inode, self.rejected = None, False
        packet["publication"] = {"intendedOutput": str(self.output), "attemptDirectory": str(self.directory),
                                 "deadlineSeconds": DEADLINE_SECONDS, "privateCandidateHasAuthority": False,
                                 "admissibility": "intended output, recomputed matching completion hash, finite publication elapsed <=1800, fresh CLI exit 0"}

    def publish(self):
        self.watch.publication = self
        try:
            self.watch.check()
            digest = write_exclusive(self.candidate, self.packet)
            info = os.stat(self.candidate, follow_symlinks=False)
            self.inode = (info.st_dev, info.st_ino)
            self.watch.check()
            os.link(self.candidate, self.output)
            sync_directory(self.output.parent)
            self.watch.check()
            return digest
        except BaseException as error:
            self.reject(error)
            raise

    def reject(self, error):
        if self.rejected:
            return
        self.rejected = True
        signal.setitimer(signal.ITIMER_REAL, 0)
        if self.inode is not None:
            try:
                info = os.stat(self.output, follow_symlinks=False)
                if (info.st_dev, info.st_ino) == self.inode:
                    os.unlink(self.output)  # Only our link; private candidate bytes remain intact.
            except FileNotFoundError:
                pass
        packet = {**self.packet, "accepted": False, "claims": {key: False for key in self.packet.get("claims", {})},
                  "publication": {**self.packet["publication"], "status": "rejected"},
                  "failures": [*self.packet.get("failures", []), {"code": "publication_rejected", "detail": str(error),
                               "exceptionType": type(error).__name__, "elapsedSeconds": time.monotonic()-self.watch.started}]}
        rejection = self.directory / "rejection.json"
        write_exclusive(rejection, packet)
        try:
            os.link(rejection, self.output)
        except FileExistsError:
            pass  # A different output is never ours to overwrite.
        sync_directory(self.directory)
        sync_directory(self.output.parent)
        print(f"Reconstruction publication rejected; evidence: {rejection}", file=sys.stderr, flush=True)


class Watch:
    def __enter__(self):
        self.started, self.completed, self.publication, self.publication_elapsed = time.monotonic(), 0, None, None
        self.previous = signal.getsignal(signal.SIGALRM)
        require(signal.getitimer(signal.ITIMER_REAL) == (0.0, 0.0), "existing alarm prevents standalone watch")
        signal.signal(signal.SIGALRM, self.heartbeat)
        signal.setitimer(signal.ITIMER_REAL, HEARTBEAT_SECONDS, HEARTBEAT_SECONDS)
        return self

    def check(self):
        elapsed = time.monotonic()-self.started
        require(elapsed <= DEADLINE_SECONDS, "proof/publication deadline exceeded")
        return elapsed

    def progress(self):
        self.completed += 1
        self.check()

    def heartbeat(self, *_):
        print(json.dumps({"event": "f6c-reconstruction-heartbeat", "pieces": self.completed,
                          "elapsedSeconds": time.monotonic()-self.started}), file=sys.stderr, flush=True)
        self.check()

    def __exit__(self, error_type, error, traceback):
        try:
            if error is not None:
                if self.publication is not None:
                    self.publication.reject(error)
            else:
                try:
                    self.publication_elapsed = self.check()
                except BaseException as late:
                    if self.publication is not None:
                        self.publication.reject(late)
                    raise
        finally:
            signal.setitimer(signal.ITIMER_REAL, 0)
            signal.signal(signal.SIGALRM, self.previous)


def _verify(history_export, output, watch):
    packet = {"schema": SCHEMA, "accepted": False, "h3EvidenceEligible": False,
              "authority": "exact reconstructed-family containment only; not historical EOM identity",
              "runId": RUN_ID, "expectedHistoryExportSha256": EXPORT_SHA256,
              "claims": {key: False for key in ("anchoredPrehistoryFamilyNonempty", "fixedAcceptedFrameFutureContained",
                         "reconstructedFullHistoryFamilyNonempty", "reconstructedFamilyContainedInOriginalEnclosures",
                         "historicalEomTrajectoryIdentityEstablished", "subjectMembershipEstablished", "operatorInterpretationApproved",
                         "rootsEvaluated", "accelerationsEvaluated", "metricsComputed", "scoreAuthorized", "eomExecuted",
                         "rootExecutionAuthorized", "measurementAuthorized", "h3EvidenceEligible", "uniformRootCoverageProved")},
              "construction": {"arithmetic": "exact rational original-decimal tokens",
                               "future": "unique accepted-frame position/velocity Hermite cubics; frame error field not used as allowance",
                               "past": "nominal outer endpoint, exact midpoint internal targets, exact frame-zero position AND velocity anchor",
                               "containment": "all cubic/quadratic Bernstein controls, original per-axis AND scalar componentwise radii",
                               "sourceMutation": False, "zeroAllowance": "zero controls required; 0/0 utilization reported as zero"},
              "limitations": ["failed sufficient control is not proof that every anchored history is impossible",
                              "failed future Bernstein bound is not necessarily an actual future escape",
                              "no historical trajectory equality, speed/clearance/root claim, metric, knot interpretation, or score permission"],
              "failures": []}
    root = Path(__file__).resolve().parents[2]
    with ExitStack() as stack:
        bound = []
        try:
            instrument = stack.enter_context(BoundFile(__file__, MAX_INSTRUMENT_BYTES))
            bound.append(("instrument", instrument))
            packet["instrumentBefore"] = instrument.binding()
            verify_executing_source(instrument.data)
            packet["executingCodeBinding"] = "captured-source compilation equals executing module code object"
            packet["theoremsBefore"] = {}
            for relative, expected in THEOREMS.items():
                theorem = stack.enter_context(BoundFile(root / relative, MAX_INSTRUMENT_BYTES))
                bound.append((relative, theorem))
                require(theorem.digest == expected, f"frozen theorem SHA-256 mismatch: {relative}")
                packet["theoremsBefore"][relative] = theorem.binding()
            source = stack.enter_context(BoundFile(history_export, MAX_INPUT_BYTES))
            bound.append(("historyExport", source))
            packet["historyExportBefore"] = source.binding()
            require(source.digest == EXPORT_SHA256, "frozen export SHA-256 mismatch")
            result = analyze_export(parse_json(source.data), progress=watch.progress)
            packet["analysis"] = result
            packet["failures"].extend(result["failures"])
        except (ProofError, OSError, ValueError, KeyError, TypeError, RecursionError) as error:
            packet["failures"].append({"code": "input_or_structure_rejected", "detail": str(error)})
        packet["theoremsAfter"] = {}
        for role, source in bound:
            try:
                binding = source.recheck()
                if role in THEOREMS:
                    packet["theoremsAfter"][role] = binding
                else:
                    packet[role+"After"] = binding
            except (ProofError, OSError) as error:
                packet["failures"].append({"code": "bound_file_changed", "role": role, "detail": str(error)})
        valid = "analysis" in packet and not any(row["code"] in {"input_or_structure_rejected", "bound_file_changed"}
                                                for row in packet["failures"])
        if valid:
            past, future = packet["analysis"]["anchoredPrehistoryFits"], packet["analysis"]["acceptedFrameFutureFits"]
            packet["claims"].update(anchoredPrehistoryFamilyNonempty=past, fixedAcceptedFrameFutureContained=future,
                                    reconstructedFullHistoryFamilyNonempty=past and future,
                                    reconstructedFamilyContainedInOriginalEnclosures=past and future)
        packet["accepted"] = valid and not packet["failures"]
        packet["proofElapsedSeconds"] = time.monotonic()-watch.started
        packet["failureDisposition"] = "all evaluated control failures retained; malformed input stops proof"
        digest = Publication(output, packet, watch).publish()
    return packet, digest


def verify(history_export, output):
    with Watch() as watch:
        packet, digest = _verify(history_export, output, watch)
    return packet, digest, watch.publication_elapsed


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--history-export", required=True)
    parser.add_argument("--out", required=True, help="new receipt path, must not already exist")
    args = parser.parse_args(argv)
    try:
        packet, digest, elapsed = verify(args.history_export, args.out)
    except (ProofError, OSError, ValueError) as error:
        print(f"Reconstruction attempt rejected: {error}", file=sys.stderr)
        return 2
    print(json.dumps({"accepted": packet["accepted"], "receiptSha256": digest, "output": args.out,
                      "publicationElapsedSeconds": elapsed, "h3EvidenceEligible": False,
                      "historicalEomTrajectoryIdentityEstablished": False}, sort_keys=True))
    return 0 if packet["accepted"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
