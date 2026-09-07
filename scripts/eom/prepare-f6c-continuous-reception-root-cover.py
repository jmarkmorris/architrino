#!/usr/bin/env python3
"""Separate subject for the frozen F6c conditional root-cover comparison.

Default scope is the one-cell pilot. A separately hash-bound full-scope launch
plan is required for all 160 cells. This program issues no acceptance, executes
no EOM solver, and evaluates no acceleration or metric. The independent verifier
is never imported. Only three checked, captured library modules are executed in
a fresh private package; their on-disk import paths and cached generations are
not used. Actual execution still requires the separately reviewed outer resource
supervisor and subsequent independent comparison, within one inclusive budget.
"""
from __future__ import annotations

import argparse
from contextlib import contextmanager, ExitStack
from decimal import Decimal
from fractions import Fraction
import hashlib
import json
import os
from pathlib import Path
import re
import resource
import signal
import stat
import subprocess
import sys
import time
from types import ModuleType

_EXECUTING_CODE = sys._getframe().f_code
SELF = "scripts/eom/prepare-f6c-continuous-reception-root-cover.py"
REFERENCE = "scripts/eom/verify-f6c-continuous-reception-root-cover.py"
REFERENCE_SHA = "1e121cb46ae4ebb7a50e17f00db7b6ecf063e1e2e465fea590e4eba93ee17f36"
SCHEMA = "braid-program/f6c-continuous-reception-root-cover.v1"
DECLARATION = "reference/priorities/braid-program/evidence/2026-08-27-f6c-continuous-reception-root-cover-predeclaration.md"
DECLARATION_SHA = "3b20e5d7bce4b57dfd41c0d1efcc34f9242dcd41a02b35676f45ba0984499578"
FIXED = (
    ("export", ".local-data/braid-analysis/f6c-history-export-20260827.jUhLLg/retained-history.json", "f479bb88a6425e9e98e00288f2524f33d5a3c0f4c2a14139dbaae4f468c46db1"),
    ("reconstruction", ".local-data/braid-analysis/f6c-accepted-frame-reconstruction-20260827.5o7jK3/reconstruction.json", "7c30aae03d43f7720b79288a19a9c9f9a7c0ab6b7b16ac9a948828ca80b92b43"),
    ("guards", ".local-data/braid-analysis/f6c-retained-history-guards-20260827.hdrqLF/guards.json", "86d7fa14ac64ee20930094ff1a59880fe4e1ef5c81758f5d8baf2c6777ee4880"),
    ("rootTheorem", "reference/priorities/braid-program/evidence/2026-08-27-f6c-continuous-reception-enclosure-contract.md", "db38185a68210cc8567b0b9f054c6deb5d32509f858cefb5701511a4e23ef2bc"),
    ("reconstructionTheorem", "reference/priorities/braid-program/evidence/2026-08-27-f6c-accepted-frame-history-reconstruction.md", "710279f5c348a81fd36d58c6ca704730b3fa70da729ca30b9c92ae4e1cc6734b"),
    ("rootLibrary", "scripts/eom/oracle/continuous_reception_roots.py", "f38657eedb585f6066bf233cef05508ef4d4336146dbf1e44501dfa9b669e04c"),
    ("rootControls", "tests/test_eom_continuous_reception_roots.py", "81de0ebc74a6e2e2a6c66e96cd3a7856806b7e41f775e3e2f184caf5bd1158ac"),
    ("historyReference", "scripts/eom/oracle/certified_history.py", "ca916b4bc979629a5e25c1490da07fd78a26b4e75cfba5677f35fbab658a29e7"),
    ("decimalReference", "scripts/eom/oracle/decimal_interval.py", "fffc17270e149e6213315c1c82b518caa739657eb649822fd1955b8a2820e38a"),
    ("reconstructionAuthor", "scripts/eom/verify-f6c-accepted-frame-reconstruction.py", "0c5ae3b5e7161cbed60de71670d17d5437a41b7ce4109843dbf3cdd20b9e3965"),
    ("guardAuthor", "scripts/eom/verify-f6c-retained-history-guards.py", "b8480f3652fd7254bdfe998bbe0f6d092500c6451d692c1ab225d3405295897d"),
    ("declaration", DECLARATION, DECLARATION_SHA),
)
MODULES = (("decimal_interval", "decimalReference"), ("certified_history", "historyReference"), ("continuous_reception_roots", "rootLibrary"))
IDS = ("0+", "0-", "1+", "1-", "2+", "2-", "3+", "3-")
KNOT_SHA = "11acd09b692fe175861d0f9478b5d1763c18e088682a0c6a16fc29d65453075c"
FALSE_FLAGS = {key: False for key in ("premise_truth_authenticated", "subject_membership_established", "execution_authorized", "metrics_available", "h3_evidence_eligible")}
MAX_BYTES = 64*1024*1024
MAX_RUNTIME_BYTES = 1024*1024*1024
LIMIT = 1800
HEARTBEAT = 15
TOKEN = re.compile(r"-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\Z")
HEX = re.compile(r"[0-9a-f]{64}\Z")


def require(condition, message):
    if not condition: raise ValueError(message)


class PreparationFailure(ValueError):
    def __init__(self, report):
        self.report = report
        super().__init__(json.dumps(report))


def failure_report(progress, error, active_row=None):
    completed, total = progress["completedRows"], progress["expectedRows"]
    failed = active_row if type(active_row) is int and active_row == completed < total else None
    dispositions = []
    if completed: dispositions.append({"from": 0, "count": completed, "disposition": "completed-conditional-row"})
    if failed is not None: dispositions.append({"from": failed, "count": 1, "disposition": "failed-or-unresolved"})
    remaining = total-completed-int(failed is not None)
    if remaining: dispositions.append({"from": completed+int(failed is not None), "count": remaining, "disposition": "not-run"})
    return {**progress, "completed": False, "accepted": False, "failure": str(error),
            "failedRowIndex": failed, "failedRows": int(failed is not None), "notRunRows": remaining,
            "censusScope": "serialized conditional-row pipeline; not-run does not assert absence of internal library arithmetic",
            "rowDispositions": dispositions}


def sha(raw):
    return hashlib.sha256(raw).hexdigest()


def encoded(value):
    return json.dumps(value, sort_keys=True, separators=(",", ":"), allow_nan=False).encode()+b"\n"


def decode(raw, *, receipt=False):
    def pairs(items):
        result = {}
        for key, value in items:
            require(key not in result, "duplicate JSON key")
            result[key] = value
        return result
    def reject(value): raise ValueError("JSON floating/nonfinite value forbidden: "+value)
    return json.loads(raw.decode("utf-8", errors="strict"), object_pairs_hook=pairs,
                      parse_float=Decimal if receipt else reject, parse_constant=reject)


def exact(token):
    require(type(token) is str and len(token) <= 1100 and TOKEN.fullmatch(token), "exact bounded decimal string required")
    value = Decimal(token)
    require(value.is_finite() and len(value.as_tuple().digits) <= 1024 and abs(value.as_tuple().exponent) <= 1000, "decimal token limit")
    return value


def fraction_record(value):
    require(type(value) is dict and set(value) == {"numerator", "denominator"}, "guard rational shape")
    n, d = int(value["numerator"]), int(value["denominator"])
    require(d > 0, "guard rational denominator")
    return Fraction(n, d)


def finite_decimal(value):
    """Exact finite-decimal conversion, independent of ambient precision."""
    value = Fraction(value); denominator = value.denominator; twos = fives = 0
    while denominator % 2 == 0: denominator //= 2; twos += 1
    while denominator % 5 == 0: denominator //= 5; fives += 1
    require(denominator == 1, "time endpoint has no finite decimal expansion")
    places = max(twos, fives)
    scaled = value.numerator * 2**(places-twos) * 5**(places-fives)
    digits = tuple(int(c) for c in str(abs(scaled)))
    return Decimal((int(scaled < 0), digits, -places))


@contextmanager
def captured_package(captured):
    """Load checked bytes only. No original-package imports or previous cache."""
    stem = "_f6c_cover_"+sha(b"".join(captured[name][1] for name, _ in MODULES))[:24]
    package = stem; suffix = 0
    while package in sys.modules:
        suffix += 1; package = stem+"_"+str(suffix)
    allocated = []; modules = {}
    try:
        parent = ModuleType(package); parent.__path__ = []; parent.__package__ = package
        sys.modules[package] = parent; allocated.append(package)
        for name, _ in MODULES:
            filename, raw, digest = captured[name]
            require(sha(raw) == digest, "captured module hash differs")
            identity = package+"."+name
            module = ModuleType(identity); module.__file__ = filename; module.__package__ = package
            sys.modules[identity] = module; allocated.append(identity)
            exec(compile(raw, filename, "exec", dont_inherit=True, optimize=sys.flags.optimize), module.__dict__)
            setattr(parent, name, module); modules[name] = module
        yield modules
    finally:
        for name in reversed(allocated): sys.modules.pop(name, None)


def authenticate_premises(export, reconstruction, guards):
    """Check already accepted source-bound premises; never prove new identity."""
    require(export["schema"] == "braid-program/f6c-retained-history-export.v1" and export["fieldSpeed"] == "1", "frozen normalized export required")
    originals = export["retainedHistories"]
    require(tuple(h["id"] for h in originals) == IDS, "member order differs")
    union = None
    for i, h in enumerate(originals):
        require(h["pathKey"] == i+1 and h["polarity"] == (1 if i % 2 == 0 else -1), "member identity differs")
        require(len(h["segments"]) == 1760 and h["coverageStart"] == "-8" and h["coverageEnd"] == "0.13", "retained census/domain differs")
        cursor = Decimal(-8); future = set()
        for index, s in enumerate(h["segments"]):
            a, b = exact(s["startTime"]), exact(s["endTime"])
            require(a == cursor < b, "original gap or overlap")
            cursor = b
            require(len(s["coefficients"]) == 3 and all(len(row) == 4 for row in s["coefficients"]), "coefficient shape differs")
            for row in s["coefficients"]:
                for token in row: exact(token)
            for field in ("position", "velocity"):
                radii = s[field+"Errors"]; scalar = exact(s[field+"Error"])
                require(len(radii) == 3 and all(0 <= exact(x) <= scalar for x in radii), "scalar enlargement does not preserve axis radii")
            require(b <= 0 if index < 1600 else a >= 0, "prehistory/future split differs")
            if index >= 1600: future.update((Fraction(a), Fraction(b)))
        require(cursor == Decimal("0.13"), "retained suffix missing")
        if union is None: union = sorted(future)
        else: require(union == sorted(future), "member future grids differ")
    require(len(union) == 161 and sha("".join(str(t)+"\n" for t in union).encode()) == KNOT_SHA, "exact knot hash differs")
    require([Fraction(exact(f["time"])) for f in export["acceptedFrames"]] == union[::2], "accepted frame grid differs")
    cells = list(zip(union, union[1:]))
    for proof in (reconstruction, guards):
        require(proof["accepted"] is True and proof["historyExportBefore"]["sha256"] == proof["historyExportAfter"]["sha256"] == FIXED[0][2], "accepted original-bound premise required")
        require(proof["claims"]["subjectMembershipEstablished"] is False and proof["claims"]["rootsEvaluated"] is False, "premise historical authority changed")
    for key in ("anchoredPrehistoryFamilyNonempty", "fixedAcceptedFrameFutureContained", "reconstructedFullHistoryFamilyNonempty", "reconstructedFamilyContainedInOriginalEnclosures"):
        require(reconstruction["claims"][key] is True, "represented family premise missing")
    for key in ("conditionalUniformOldestBoundaryResidualStrictlyNegative", "conditionalUniformSameTimeNonselfSeparation", "conditionalUniformSpeedStrictlyBelowOne"):
        require(guards["claims"][key] is True, "uniform guard premise missing")
    analysis = guards["analysis"]
    require([(fraction_record(c["start"]), fraction_record(c["end"])) for c in analysis["closedReceptionCells"]] == cells, "guard cells differ")
    require(tuple(m["id"] for m in analysis["members"]) == IDS and len(analysis["clearancePairs"]) == 28 and len(analysis["oldestBoundaryPairs"]) == 56, "guard member/pair census differs")
    for mode in ("axis", "scalar"):
        require(all(Fraction(289, 400)-fraction_record(m["maximumSpeedSquared"][mode]["value"]) > Fraction(131, 50000) for m in analysis["members"]), "speed simplification failed")
        require(all(fraction_record(p["minimumSeparationSquared"][mode]["value"])-Fraction(729, 10000) > Fraction(309, 250000) for p in analysis["clearancePairs"]), "clearance simplification failed")
        require(all(fraction_record(p["minimumDelaySquaredMinusDistanceSquared"][mode]["value"]) > 0 for p in analysis["oldestBoundaryPairs"]), "oldest guard failed")
    return originals, cells


def build_histories(originals, modules):
    history_module = modules["certified_history"]
    histories = []
    for original in originals:
        segments = tuple(history_module.CubicHistorySegment(
            exact(s["startTime"]), exact(s["endTime"]),
            tuple(tuple(exact(t) for t in row) for row in s["coefficients"]),
            exact(s["positionError"]), exact(s["velocityError"]), 90) for s in original["segments"])
        # Nominal pieces need not themselves join. The externally accepted
        # family supplies coherent paths inside these unchanged scalar boxes.
        histories.append(history_module.PiecewisePolynomialHistory(segments, original["id"]))
    return tuple(histories)


def interval_record(value):
    if value is None: return None
    require(value.precision == 90, "returned precision changed")
    return {"lower": str(value.lower), "upper": str(value.upper), "precision": value.precision}


def flags(result):
    value = {key: getattr(result, key) for key in FALSE_FLAGS}
    require(all(v is False for v in value.values()), "library authority flag changed")
    return value


def compact_pieces(pieces, *, record_index, row_index, role, member, digest, requested):
    require(bool(pieces), "ordinary geometry omitted original pieces")
    hashed = hashlib.sha256(); prior = None
    for index, part in pieces:
        require(type(index) is int and (prior is None or index == prior+1), "noncontiguous returned original pieces")
        hashed.update(f"{index}\t{Fraction(part.lower)}\t{Fraction(part.upper)}\n".encode("ascii"))
        prior = index
    return {"recordIndex": record_index, "rowIndex": row_index, "role": role, "memberId": member,
            "historyDigest": digest, "requestedInterval": interval_record(requested),
            "touchedPieceCount": len(pieces), "firstIndex": pieces[0][0], "lastIndex": pieces[-1][0],
            "contiguousIndexRange": [pieces[0][0], pieces[-1][0]], "clippedPiecesSha256": hashed.hexdigest()}


def emit_cell(histories, cell, cell_index, modules, write_row, write_piece, *, row_start=0, piece_start=0, error_state=None):
    """One actual public library call; no reference or scalar-root search."""
    error_state = {} if error_state is None else error_state
    error_state["activeRow"] = None
    lib, intervals = modules["continuous_reception_roots"], modules["decimal_interval"]
    box = intervals.DecimalInterval
    reception = box.bounds(finite_decimal(cell[0]), finite_decimal(cell[1]), 90)
    emission = box.bounds("-8", finite_decimal(cell[0]-Fraction(1, 20)), 90)
    ids = tuple(h.history_id for h in histories); digests = tuple((h.history_id, h.digest()) for h in histories)
    require(len(ids) == 8 and len(set(ids)) == 8, "eight persistent histories required")
    premises = lib.ConditionalPremises(digests, box.bounds("-8", "0.13", 90), reception,
                                      tuple(Decimal("0.85") for _ in ids),
                                      tuple(tuple(Decimal(0) if i == j else Decimal("0.27") for j in range(8)) for i in range(8)),
                                      True, True, "Externally authenticated F_H subset of unchanged original envelopes; not historical trajectory identity.")
    proposal = lib.ReceptionCellProposal(reception, {(a, b): emission for a in ids for b in ids if a != b})
    result = lib.enclose_root_cover(histories, premises, (proposal,))
    authority = flags(result); row_index = row_start; piece_index = piece_start; visits = 0
    require(result.hypotheses is premises, "library replaced the supplied conditional premises")
    require(result.reception_cells == (reception,) and result.expected_rows == 64,
            f"library per-cell coverage/census differs: {result.failure_code}: {result.failure_detail}")
    for offset, row in enumerate(result.rows):
        error_state["activeRow"] = row_index
        i, j = divmod(offset, 8)
        require(offset < 64 and row.receiver_id == ids[i] and row.transmitter_id == ids[j] and row.reception == reception, "library row order/identity differs")
        record = {"rowIndex": row_index, "cellIndex": cell_index, "receiverIndex": i, "transmitterIndex": j,
                  "receiverId": row.receiver_id, "transmitterId": row.transmitter_id,
                  "reception": interval_record(row.reception), "emission": interval_record(row.emission),
                  "ordinaryRootsPerReception": row.ordinary_roots_per_reception,
                  "coincidentEndpointExcluded": row.coincident_endpoint_excluded,
                  "oldestResidual": interval_record(row.oldest_residual), "lowerFaceResidual": interval_record(row.lower_face_residual),
                  "upperFaceResidual": interval_record(row.upper_face_residual),
                  "displacement": None if row.displacement is None else [interval_record(v) for v in row.displacement],
                  "distance": interval_record(row.distance), "transmitterFactor": interval_record(row.transmitter_factor),
                  "receiverFactor": interval_record(row.receiver_factor), "receiverPieceRecord": None, "transmitterPieceRecord": None,
                  "rootFreeComplementConditional": row.root_free_complement_conditional,
                  "retainedBoundaryContact": row.retained_boundary_contact, "libraryFlags": dict(authority)}
        if i == j:
            require(row.ordinary_roots_per_reception == 0 and row.coincident_endpoint_excluded is True and row.emission is None
                    and not row.receiver_pieces and not row.transmitter_pieces
                    and all(getattr(row, key) is None for key in ("oldest_residual", "lower_face_residual", "upper_face_residual",
                                                                 "displacement", "distance", "transmitter_factor", "receiver_factor")), "invalid self row")
        else:
            require(row.ordinary_roots_per_reception == 1 and row.emission == emission and row.coincident_endpoint_excluded is False, "ordinary root proposal differs")
            require(row.oldest_residual == row.lower_face_residual and row.lower_face_residual.upper < 0 < row.upper_face_residual.lower, "non-strict actual unrestricted faces")
            require(row.distance.lower > 0 and row.transmitter_factor.lower >= Decimal("1e-24") and row.receiver_factor.lower > 0, "actual positive distance/factors unresolved")
            for role, mi, parts, requested in (("receiver", i, row.receiver_pieces, row.reception), ("transmitter", j, row.transmitter_pieces, row.emission)):
                record[role+"PieceRecord"] = piece_index
                piece = compact_pieces(parts, record_index=piece_index, row_index=row_index, role=role,
                                       member=ids[mi], digest=digests[mi][1], requested=requested)
                write_piece(piece); visits += len(parts); piece_index += 1
        require(row.root_free_complement_conditional is True and row.retained_boundary_contact is False, "conditional complement or boundary changed")
        write_row(record); row_index += 1; error_state["activeRow"] = None
    if result.status == "unresolved" and len(result.rows) < 64:
        error_state["activeRow"] = row_index
    require(result.status == "conditional_complete" and len(result.rows) == 64 and result.failure_code == result.failure_detail == "",
            f"unresolved cell {cell_index}: {result.failure_code}: {result.failure_detail}; completed rows {len(result.rows)}")
    # The complete cell result and its original per-row arrays are released on
    # return; only compact records and counts survive into the next call.
    return {"completedRows": row_index, "pieceRecords": piece_index, "recordedGeometryPieceVisits": visits}


class PinnedInput:
    def __init__(self, path, expected, *, capture=False, limit=MAX_BYTES):
        self.path = Path(path).absolute(); self.expected = expected; self.capture = capture; self.limit = limit
        self.fd = None

    @staticmethod
    def identity(info):
        return info.st_dev, info.st_ino, info.st_size, info.st_mtime_ns, info.st_ctime_ns

    def __enter__(self):
        require(type(self.expected) is str and HEX.fullmatch(self.expected), "external source hash required")
        self.fd = os.open(self.path, os.O_RDONLY | os.O_NONBLOCK | getattr(os, "O_NOFOLLOW", 0))
        try:
            self.initial = os.fstat(self.fd)
            require(stat.S_ISREG(self.initial.st_mode) and 0 < self.initial.st_size <= self.limit, "bounded regular source required")
            self.data, digest = self.scan(self.capture)
            require(digest == self.expected, "source hash mismatch: "+str(self.path))
            return self
        except BaseException:
            os.close(self.fd); self.fd = None; raise

    def scan(self, capture=False):
        os.lseek(self.fd, 0, os.SEEK_SET)
        digest = hashlib.sha256(); size = 0; chunks = []
        while True:
            chunk = os.read(self.fd, min(1024*1024, self.limit+1-size))
            if not chunk: break
            size += len(chunk); require(size <= self.limit, "source exceeded byte bound")
            digest.update(chunk)
            if capture: chunks.append(chunk)
        require(size == self.initial.st_size and self.identity(os.fstat(self.fd)) == self.identity(self.initial), "source changed during read")
        return (b"".join(chunks) if capture else None), digest.hexdigest()

    def recheck(self):
        require(self.scan()[1] == self.expected and self.identity(os.stat(self.path, follow_symlinks=False)) == self.identity(self.initial), "bound source changed/replaced")

    def binding(self):
        return {"path": str(self.path), "sha256": self.expected, "bytes": self.initial.st_size}

    def __exit__(self, *_):
        if self.fd is not None: os.close(self.fd)
        self.fd = None


class JsonlSink:
    def __init__(self, path, deadline):
        self.path = Path(path); self.deadline = deadline; self.file = None
        self.digest = hashlib.sha256(); self.bytes = self.count = 0

    def __enter__(self):
        self.file = self.path.open("xb")
        return self

    def write(self, record):
        require(time.monotonic() < self.deadline, "row publication deadline")
        raw = encoded(record)
        require(self.bytes+len(raw) <= MAX_BYTES, "named stream byte limit")
        require(self.file.write(raw) == len(raw), "short row write")
        self.digest.update(raw); self.bytes += len(raw); self.count += 1

    def flush(self):
        self.file.flush(); os.fsync(self.file.fileno())
        require(time.monotonic() < self.deadline, "stream flush deadline")

    def binding(self):
        return {"path": str(self.path.absolute()), "sha256": self.digest.hexdigest(), "bytes": self.bytes}

    def __exit__(self, *_):
        if self.file is not None:
            try: self.file.flush(); os.fsync(self.file.fileno())
            finally: self.file.close()


def exclusive_json(path, value, deadline):
    require(time.monotonic() < deadline, "manifest publication deadline")
    raw = encoded(value)
    require(len(raw) <= MAX_BYTES, "manifest size limit")
    with Path(path).open("xb") as stream:
        require(stream.write(raw) == len(raw), "short manifest write")
        stream.flush(); os.fsync(stream.fileno())
    directory = os.open(Path(path).parent, os.O_RDONLY)
    try: os.fsync(directory)
    finally: os.close(directory)
    require(time.monotonic() < deadline, "post-manifest deadline")
    return {"path": str(Path(path).absolute()), "sha256": sha(raw), "bytes": len(raw)}


def validate_launch_contract(plan, scope, own_sha):
    contract = plan["comparisonContract"]
    require(type(contract) is dict and set(contract) == {"declarationSha256", "verifierSha256", "scope", "subjectSourceBindings", "runtimeBindings"}, "closed launch comparison contract required")
    require(contract["scope"] == scope and scope in ("pilot-cell-0", "full"), "explicit matching pilot/full plan required")
    require(contract["declarationSha256"] == DECLARATION_SHA and contract["verifierSha256"] == REFERENCE_SHA, "launch reference/declaration differs")
    expected_sources = {SELF: own_sha}
    for name, key in MODULES:
        _, path, digest = next(b for b in FIXED if b[0] == key)
        expected_sources[path] = digest
    for field in ("subjectSourceBindings", "runtimeBindings"):
        rows = contract[field]
        require(type(rows) is list and 0 < len(rows) <= 256, "bounded nonempty execution bindings required")
        require(all(type(b) is dict and set(b) == {"path", "sha256", "bytes"}
                    and type(b["path"]) is str and 0 < len(b["path"]) < 4096
                    and type(b["sha256"]) is str and HEX.fullmatch(b["sha256"])
                    and type(b["bytes"]) is int and 0 < b["bytes"] <= MAX_RUNTIME_BYTES for b in rows), "invalid execution binding")
        require(len({b["path"] for b in rows}) == len(rows), "duplicate execution binding")
    require({b["path"]: b["sha256"] for b in contract["subjectSourceBindings"]} == expected_sources, "complete captured project source closure differs")
    return contract


def make_manifest(scope, contract, launch_binding, mapping, cells, modules, rows_binding, pieces_binding):
    count = 1 if scope == "pilot-cell-0" else 160
    require(scope == contract["scope"] and scope in ("pilot-cell-0", "full") and len(cells) >= count, "manifest scope/cell census differs")
    box = modules["decimal_interval"].DecimalInterval
    return {"schema": SCHEMA, "scope": scope, "status": "conditional_complete", "accepted": False,
            "fixedBindings": [{"id": k, "path": p, "sha256": h} for k, p, h in FIXED],
            "launchPlan": launch_binding, "subjectSourceBindings": contract["subjectSourceBindings"], "runtimeBindings": contract["runtimeBindings"],
            "members": mapping, "knotSha256": KNOT_SHA,
            "retainedDomain": interval_record(box.bounds("-8", "0.13", 90)),
            "receptionDomain": interval_record(box.bounds(finite_decimal(cells[0][0]), finite_decimal(cells[count-1][1]), 90)),
            "precision": 90, "speedUpper": ["0.85"]*8,
            "clearanceLower": [["0" if i == j else "0.27" for j in range(8)] for i in range(8)],
            "cellCount": count, "rowCount": count*64, "ordinaryNonselfRows": count*56,
            "selfExclusionRows": count*8, "pieceRecordCount": count*112,
            "rows": rows_binding, "pieces": pieces_binding, "libraryFlags": dict(FALSE_FLAGS)}


def imported_runtime_paths(project_files):
    """Name loaded standard-runtime sources/cache files, plus the interpreter."""
    excluded = {Path(p).resolve() for p in project_files}
    paths = {Path(sys.executable).resolve()}
    for module in tuple(sys.modules.values()):
        for key in ("__file__", "__cached__"):
            filename = getattr(module, key, None)
            if type(filename) is str:
                path = Path(filename).resolve()
                if path.is_file() and path not in excluded: paths.add(path)
    return paths


def check_ignored_lane(root, output, git_binary):
    lane = root/".local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827"
    require(output == output.resolve() and output.is_relative_to(lane) and output != lane,
            "attempt must be a canonical fresh child of the declared ignored lane")
    require(not output.exists() and not output.is_symlink(), "attempt already exists")
    result = subprocess.run([str(git_binary), "check-ignore", "-q", "--", str(output.relative_to(root))],
                            cwd=root, stdin=subprocess.DEVNULL, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=2)
    require(result.returncode == 0, "output lane is not confirmed ignored")


def admit_completion(publication, deadline):
    """Called only after bound inputs/private modules/timers have been closed."""
    require(time.monotonic() < deadline, "final preparation deadline")
    print(json.dumps(publication), flush=True)
    require(time.monotonic() < deadline, "completion-write deadline")


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    for flag in ("plan", "plan-sha256", "consumer-sha256", "out-dir", "budget-seconds", "git-binary"):
        parser.add_argument("--"+flag, required=True)
    parser.add_argument("--scope", choices=("pilot-cell-0", "full"), default="pilot-cell-0")
    args = parser.parse_args(argv)
    began = time.monotonic(); budget = Fraction(exact(args.budget_seconds)); seconds = float(budget)
    require(0 < budget <= LIMIT and 0 < seconds <= LIMIT, "representable positive remaining budget <=1800 required")
    deadline = began+seconds; require(deadline > began, "remaining budget cannot advance deadline")
    root = Path(__file__).resolve().parents[2]; output = Path(args.out_dir).absolute()
    progress = {"stage": "capture", "completedCells": 0, "completedRows": 0, "expectedRows": 64 if args.scope == "pilot-cell-0" else 10240}
    error_state = {"activeRow": None}
    usage_before = resource.getrusage(resource.RUSAGE_SELF)
    def heartbeat(*_):
        print(json.dumps({**progress, "elapsedSeconds": time.monotonic()-began, "accepted": False,
                          "independentlyPassedRows": 0, "failedRows": 0,
                          "remainingUncompletedRows": progress["expectedRows"]-progress["completedRows"]}), file=sys.stderr, flush=True)
        require(time.monotonic() < deadline, "preparation deadline")
        signal.setitimer(signal.ITIMER_REAL, min(HEARTBEAT, max(0.000001, deadline-time.monotonic())))
    previous = signal.signal(signal.SIGALRM, heartbeat)
    signal.setitimer(signal.ITIMER_REAL, min(HEARTBEAT, seconds))
    try:
        with ExitStack() as inputs:
            owned = []
            def capture(filename, digest, **kwargs):
                obj = inputs.enter_context(PinnedInput(filename, digest, **kwargs)); owned.append(obj); return obj
            own = capture(root/SELF, args.consumer_sha256, capture=True)
            require(compile(own.data, _EXECUTING_CODE.co_filename, "exec", dont_inherit=True, optimize=sys.flags.optimize) == _EXECUTING_CODE, "executed consumer differs from captured source")
            fixed = {key: capture(root/path, digest, capture=True) for key, path, digest in FIXED}
            reference = capture(root/REFERENCE, REFERENCE_SHA)
            plan_file = capture(args.plan, args.plan_sha256, capture=True)
            plan = decode(plan_file.data, receipt=True)
            contract = validate_launch_contract(plan, args.scope, args.consumer_sha256)
            source_bindings = contract["subjectSourceBindings"]
            actual_sources = {str(own.path): own}
            for name, key in MODULES: actual_sources[str(fixed[key].path)] = fixed[key]
            for b in source_bindings:
                obj = actual_sources.get(str((root/b["path"]).absolute()))
                require(obj is not None and obj.expected == b["sha256"] and obj.initial.st_size == b["bytes"], "captured source declaration differs")
            runtime = {}
            for b in contract["runtimeBindings"]:
                obj = capture(root/b["path"], b["sha256"], limit=MAX_RUNTIME_BYTES)
                require(obj.initial.st_size == b["bytes"], "runtime byte size differs")
                runtime[obj.path.resolve()] = obj
            git_binary = Path(args.git_binary).resolve()
            require(git_binary in runtime and Path(sys.executable).resolve() in runtime, "reviewed interpreter/git runtime missing")
            captured = {name: (str(fixed[key].path), fixed[key].data, fixed[key].expected) for name, key in MODULES}
            with captured_package(captured) as modules:
                require(imported_runtime_paths([own.path, *(fixed[key].path for _, key in MODULES)]) <= set(runtime), "loaded runtime source/cache closure absent from plan")
                progress["stage"] = "premise-mapping"
                export = decode(fixed["export"].data)
                originals, cells = authenticate_premises(export, decode(fixed["reconstruction"].data, receipt=True), decode(fixed["guards"].data, receipt=True))
                histories = build_histories(originals, modules)
                mapping = [{"id": h["id"], "pathKey": h["pathKey"], "polarity": h["polarity"],
                            "originalHistoryFingerprint": h["historyFingerprint"], "historyDigest": history.digest()}
                           for h, history in zip(originals, histories)]
                count = 1 if args.scope == "pilot-cell-0" else 160
                check_ignored_lane(root, output, git_binary)
                require(output.parent.is_dir(), "existing ignored lane/parent required")
                output.mkdir(mode=0o700)
                rows_sink = JsonlSink(output/"rows.ndjson", deadline)
                pieces_sink = JsonlSink(output/"pieces.ndjson", deadline)
                visits = 0
                with rows_sink as rows, pieces_sink as pieces:
                    for index, cell in enumerate(cells[:count]):
                        progress.update(stage="library-cell", cell=index)
                        def write_row(value):
                            rows.write(value); progress["completedRows"] = rows.count
                        result = emit_cell(histories, cell, index, modules, write_row, pieces.write,
                                           row_start=rows.count, piece_start=pieces.count, error_state=error_state)
                        require(result["completedRows"] == rows.count and result["pieceRecords"] == pieces.count, "serialized cell census differs")
                        visits += result["recordedGeometryPieceVisits"]
                        progress["stage"] = "cell-stream-flush"
                        rows.flush(); pieces.flush(); progress["completedCells"] = index+1
                require(rows_sink.count == count*64 and pieces_sink.count == count*112, "final stream census differs")
                progress["stage"] = "final-source-rechecks"
                for b in owned: b.recheck()
                manifest = make_manifest(args.scope, contract, plan_file.binding(), mapping, cells, modules, rows_sink.binding(), pieces_sink.binding())
                progress["stage"] = "publication"
                manifest_binding = exclusive_json(output/"cover-manifest.json", manifest, deadline)
                publications = [rows_sink.binding(), pieces_sink.binding(), manifest_binding]
                for b in publications:
                    obj = capture(b["path"], b["sha256"]); require(obj.initial.st_size == b["bytes"], "published output size differs")
                require(imported_runtime_paths([own.path, *(fixed[key].path for _, key in MODULES)]) <= set(runtime), "late imported runtime outside reviewed closure")
                for b in owned: b.recheck()
            progress["stage"] = "input-cleanup"
    except Exception as error:
        raise PreparationFailure(failure_report(progress, error, error_state["activeRow"])) from error
    finally:
        signal.setitimer(signal.ITIMER_REAL, 0)
        signal.signal(signal.SIGALRM, previous)
    require(time.monotonic() < deadline, "final preparation deadline")
    usage = resource.getrusage(resource.RUSAGE_SELF)
    admit_completion({"completed": True, "accepted": False, "scope": args.scope, "outputs": publications,
                      "conditionalLibraryRows": rows_sink.count, "pieceRecords": pieces_sink.count,
                      "recordedGeometryPieceVisits": visits, "elapsedSeconds": time.monotonic()-began,
                      "processUserSeconds": usage.ru_utime-usage_before.ru_utime,
                      "processSystemSeconds": usage.ru_stime-usage_before.ru_stime,
                      "maximumIndividualProcessResidentBytes": usage.ru_maxrss if sys.platform == "darwin" else usage.ru_maxrss*1024,
                      "comparisonRequired": True, "externalInclusiveDeadlineAndProcessClosureRequired": True,
                      "eomExecuted": False, "h3EvidenceEligible": False}, deadline)


if __name__ == "__main__":
    try: main()
    except Exception as error:
        print(json.dumps(error.report if isinstance(error, PreparationFailure) else
                         {"completed": False, "accepted": False, "failure": str(error)}), file=sys.stderr, flush=True)
        raise SystemExit(1)
