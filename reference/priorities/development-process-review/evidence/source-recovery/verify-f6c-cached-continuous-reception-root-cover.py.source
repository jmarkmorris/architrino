#!/usr/bin/env python3
"""Independent exact-data comparison, authored before its separate consumer.

No root-library, history-reference, or interval-reference imports are permitted.
Each original cubic is bounded by exact rational Bernstein controls. Reported
intervals must contain these independent enclosures, not reproduce their bytes.
Square-root comparisons use signs and squared Fractions, never rounded roots.
After proving a nonempty independent root-distance intersection and its
containment, its validated reported rational endpoints may bound denominators.
Noncontainment is unresolved, never a geometry negative.

The closed three-file subject contract is defined by *_KEYS below. Intervals
are {lower: exact-decimal-string, upper: exact-decimal-string, precision: 90}.
The externally hash-pinned launch plan supplies a closed comparisonContract;
it is not authorized by its own embedded review flag. No actual F6c data has
been evaluated merely by authoring this instrument.
"""
from __future__ import annotations

import argparse
from contextlib import ExitStack
from decimal import Decimal
from fractions import Fraction as F
import hashlib
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
SELF = "scripts/eom/verify-f6c-cached-continuous-reception-root-cover.py"
SCHEMA = "braid-program/f6c-continuous-reception-root-cover.v1"
REPORT_SCHEMA = "braid-program/f6c-continuous-reception-root-cover-conformance.v1"
DECLARATION = "reference/priorities/braid-program/evidence/2026-08-27-f6c-cached-root-cover-predeclaration.md"
DECLARATION_SHA = "7c2a8b0bb06f46da158e0dfe2cb313dd72e2edff3c411e87c1588aa6d028f9e4"
FIXED = (
    ("export", ".local-data/braid-analysis/f6c-history-export-20260827.jUhLLg/retained-history.json", "f479bb88a6425e9e98e00288f2524f33d5a3c0f4c2a14139dbaae4f468c46db1"),
    ("reconstruction", ".local-data/braid-analysis/f6c-accepted-frame-reconstruction-20260827.5o7jK3/reconstruction.json", "7c30aae03d43f7720b79288a19a9c9f9a7c0ab6b7b16ac9a948828ca80b92b43"),
    ("guards", ".local-data/braid-analysis/f6c-retained-history-guards-20260827.hdrqLF/guards.json", "86d7fa14ac64ee20930094ff1a59880fe4e1ef5c81758f5d8baf2c6777ee4880"),
    ("rootTheorem", "reference/priorities/braid-program/evidence/2026-08-27-f6c-continuous-reception-enclosure-contract.md", "f20e4bdaaff8b6f0012fdc6135b15d568a817832fb55d5c42f80d8421a117f68"),
    ("reconstructionTheorem", "reference/priorities/braid-program/evidence/2026-08-27-f6c-accepted-frame-history-reconstruction.md", "6abbbbacc1671052bdd881790094dbd71ebb03d54904ac1f937edae1f3c9f936"),
    ("rootLibrary", "scripts/eom/oracle/continuous_reception_roots_cached.py", "daa4cc227cb8685de673fc400d817a19666b4fc7323e6c3a56f475a463b23acf"),
    ("rootControls", "tests/test_eom_continuous_reception_roots_cached.py", "a5ac7c8b26c5d0a193f20305f4bdbad93939756780bdaefd9cbf569f42a487eb"),
    ("historyReference", "scripts/eom/oracle/certified_history.py", "ca916b4bc979629a5e25c1490da07fd78a26b4e75cfba5677f35fbab658a29e7"),
    ("decimalReference", "scripts/eom/oracle/decimal_interval.py", "fffc17270e149e6213315c1c82b518caa739657eb649822fd1955b8a2820e38a"),
    ("reconstructionAuthor", "scripts/eom/verify-f6c-accepted-frame-reconstruction.py", "80a96ebd0b306148b3eb96cb12e797c5cf80942e52ea457a8c6a72d58e8618a0"),
    ("guardAuthor", "scripts/eom/verify-f6c-retained-history-guards.py", "efaed33a6d6e55be5788ffb7e4e6f596fbc0381466a8308154dbd550743896b9"),
    ("declaration", DECLARATION, DECLARATION_SHA),
    ("governingDeclaration", "reference/priorities/braid-program/evidence/2026-08-27-f6c-continuous-reception-root-cover-predeclaration.md", "765e6663cdd60323f84b9e1af52ba1399345322eb747727f2a0898b4dd0fd079"),
    ("baselineRootLibrary", "scripts/eom/oracle/continuous_reception_roots.py", "f38657eedb585f6066bf233cef05508ef4d4336146dbf1e44501dfa9b669e04c"),
    ("baselineRootControls", "tests/test_eom_continuous_reception_roots.py", "473cba3b039027879eeea6987515261faaadcf0833f3e4d2864fc610f5b7a144"),
    ("baselineComparator", "scripts/eom/verify-f6c-continuous-reception-root-cover.py", "2d25103e0fb6ab584485b7954465afe0fa5de556b3a7e111c56d20156b7011fd"),
    ("baselineComparatorControls", "tests/test_f6c_continuous_reception_root_cover.py", "5f501e0b8cf60030d214fc9637e1292faa93a615c396e787ef77fc7b261991c5"),
    ("cacheEquivalence", "reference/priorities/braid-program/evidence/2026-08-27-f6c-call-local-state-cache-equivalence.md", "798858e87058b5a1a2d478c89edad3154a2e4993f3c14cab089b4aabf3434ee3"),
    ("governingResourcePlan", "reference/priorities/braid-program/evidence/2026-08-27-f6c-root-cover-pilot-resource-plan.md", "36b72681c116cedf1803cc89ead8b48a7d9604bae7f9bffd7b0f95b33c3bb9b4"),
    ("priorResourceReturn", "reference/priorities/braid-program/evidence/2026-08-27-f6c-root-cover-full-resource-plan.md", "46a827d13a5e8f7a068e73e642f74d679ebf18e0b2e8f42ab53aab4de26598ef"),
)
KNOT_SHA = "11acd09b692fe175861d0f9478b5d1763c18e088682a0c6a16fc29d65453075c"
IDS = ("0+", "0-", "1+", "1-", "2+", "2-", "3+", "3-")
FALSE_FLAGS = {name: False for name in ("premise_truth_authenticated", "subject_membership_established", "execution_authorized", "metrics_available", "h3_evidence_eligible")}
MANIFEST_KEYS = frozenset(("schema", "scope", "status", "accepted", "fixedBindings", "launchPlan", "subjectSourceBindings", "runtimeBindings", "members", "knotSha256", "retainedDomain", "receptionDomain", "precision", "speedUpper", "clearanceLower", "cellCount", "rowCount", "ordinaryNonselfRows", "selfExclusionRows", "pieceRecordCount", "rows", "pieces", "libraryFlags"))
ROW_KEYS = frozenset(("rowIndex", "cellIndex", "receiverIndex", "transmitterIndex", "receiverId", "transmitterId", "reception", "emission", "ordinaryRootsPerReception", "coincidentEndpointExcluded", "oldestResidual", "lowerFaceResidual", "upperFaceResidual", "displacement", "distance", "transmitterFactor", "receiverFactor", "receiverPieceRecord", "transmitterPieceRecord", "rootFreeComplementConditional", "retainedBoundaryContact", "libraryFlags"))
PIECE_KEYS = frozenset(("recordIndex", "rowIndex", "role", "memberId", "historyDigest", "requestedInterval", "touchedPieceCount", "firstIndex", "lastIndex", "contiguousIndexRange", "clippedPiecesSha256"))
CONTRACT_KEYS = frozenset(("declarationSha256", "verifierSha256", "scope", "subjectSourceBindings", "runtimeBindings"))
BINDING_KEYS = frozenset(("path", "sha256", "bytes"))
DECIMAL_RE = re.compile(r"-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\Z")
HEX_RE = re.compile(r"[0-9a-f]{64}\Z")
MAX_BYTES = 64 * 1024 * 1024
MAX_LINE = 128 * 1024
MAX_RUNTIME_BYTES = 1024 * 1024 * 1024
LIMIT = 1800
HEARTBEAT = 15


def require(condition, message):
    if not condition:
        raise ValueError(message)


def keys(value, expected, name):
    require(type(value) is dict and set(value) == expected, name + " closed keys differ")


def integer(value, minimum=0, maximum=1000000):
    require(type(value) is int and minimum <= value <= maximum, "bounded integer required")
    return value


def sha(data):
    return hashlib.sha256(data).hexdigest()


def canonical(value):
    return json.dumps(value, sort_keys=True, separators=(",", ":"), allow_nan=False).encode()


def decode(data, *, receipt=False):
    def pairs(items):
        result = {}
        for k, v in items:
            require(k not in result, "duplicate JSON key")
            result[k] = v
        return result
    def reject(value):
        raise ValueError("JSON floating/nonfinite token forbidden: " + value)
    return json.loads(data.decode("utf-8", errors="strict"), object_pairs_hook=pairs,
                      parse_float=Decimal if receipt else reject, parse_constant=reject)


def number(token):
    require(type(token) is str and len(token) <= 1100 and DECIMAL_RE.fullmatch(token), "exact decimal string required")
    exponent = re.search(r"[eE]([+-]?[0-9]+)$", token)
    require(not exponent or abs(int(exponent[1])) <= 1000, "decimal exponent too large")
    require(sum(c.isdigit() for c in token.split("e")[0].split("E")[0]) <= 1024, "decimal digit limit")
    return F(token)


def interval(value):
    keys(value, {"lower", "upper", "precision"}, "interval")
    require(type(value["precision"]) is int and value["precision"] == 90, "interval precision differs")
    lo, hi = number(value["lower"]), number(value["upper"])
    require(lo <= hi, "reversed interval")
    return lo, hi


def rational(value):
    keys(value, {"numerator", "denominator"}, "rational")
    require(all(type(value[k]) is str and len(value[k]) <= 4096 for k in value), "bounded rational strings required")
    n, d = int(value["numerator"]), int(value["denominator"])
    require(d > 0, "nonpositive rational denominator")
    return F(n, d)


def contains(outer, inner):
    return outer[0] <= inner[0] <= inner[1] <= outer[1]


def add(a, b):
    return a[0] + b[0], a[1] + b[1]


def sub(a, b):
    return a[0] - b[1], a[1] - b[0]


def mul(a, b):
    values = [x*y for x in a for y in b]
    return min(values), max(values)


def divide_positive(a, b):
    require(0 < b[0] <= b[1], "unvalidated or nonpositive denominator")
    return mul(a, (1/b[1], 1/b[0]))


def squared_norm(vector):
    lo = hi = F(0)
    for a, b in vector:
        lo += 0 if a <= 0 <= b else min(a*a, b*b)
        hi += max(a*a, b*b)
    return lo, hi


def le_sqrt(x, q):
    require(q >= 0, "negative squared norm")
    return x <= 0 or x*x <= q


def sqrt_le(q, x):
    require(q >= 0, "negative squared norm")
    return x >= 0 and q <= x*x


def check_face(reported, displacement, delay, sign):
    qlo, qhi = squared_norm(displacement)
    lo, hi = interval(reported)
    require(le_sqrt(lo + delay[1], qlo) and sqrt_le(qhi, hi + delay[0]), "returned face does not contain independent Bernstein residual")
    require(hi < 0 if sign == "negative" else lo > 0, "non-strict returned face")


def check_distance(reported, displacement, delay):
    """Prove nonempty sqrt/delay/clearance intersection BEFORE containment."""
    qlo, qhi = squared_norm(displacement)
    floor = F(27, 185)
    # max(sqrt(qlo), delay.lo, floor) <= min(sqrt(qhi), delay.hi).
    require(qlo <= qhi and delay[0] <= delay[1]
            and sqrt_le(qlo, delay[1]) and le_sqrt(delay[0], qhi)
            and floor <= delay[1] and le_sqrt(floor, qhi), "empty independent root-distance intersection")
    lo, hi = interval(reported)
    require(lo > 0, "returned distance not positive")
    lower_contained = le_sqrt(lo, qlo) or lo <= delay[0] or lo <= floor
    upper_contained = sqrt_le(qhi, hi) or delay[1] <= hi
    require(lower_contained and upper_contained, "returned distance misses independent root-distance enclosure")
    return lo, hi


def check_factor(reported, displacement, distance, velocity, *, transmitter=False):
    dot = (F(0), F(0))
    for dx, v in zip(displacement, velocity):
        dot = add(dot, mul(divide_positive(dx, distance), v))
    raw = sub((F(1), F(1)), dot)
    bound = (max(raw[0], F(3, 20)), min(raw[1], F(37, 20)))
    require(bound[0] <= bound[1], "empty independent factor intersection")
    actual = interval(reported)
    require(contains(actual, bound), "returned factor misses independent factor enclosure")
    require(actual[0] >= F(1, 10**24) if transmitter else actual[0] > 0, "factor floor/positivity fails")


def bernstein_piece(segment, lo, hi):
    """Exact degree-three/degree-two conversion; no interval-library replay."""
    origin = number(segment["startTime"])
    require(origin <= lo <= hi <= number(segment["endTime"]), "clipped piece outside original")
    a, w = lo-origin, hi-lo
    ex, ev = number(segment["positionError"]), number(segment["velocityError"])
    positions, velocities = [], []
    for tokens in segment["coefficients"]:
        c0, c1, c2, c3 = map(number, tokens)
        d0 = c0+c1*a+c2*a*a+c3*a*a*a
        d1 = w*(c1+2*c2*a+3*c3*a*a)
        d2 = w*w*(c2+3*c3*a)
        d3 = w*w*w*c3
        p = (d0, d0+d1/3, d0+2*d1/3+d2/3, d0+d1+d2+d3)
        e0, e1, e2 = c1+2*c2*a+3*c3*a*a, w*(2*c2+6*c3*a), 3*c3*w*w
        v = (e0, e0+e1/2, e0+e1+e2)
        positions.append((min(p)-ex, max(p)+ex))
        velocities.append((min(v)-ev, max(v)+ev))
    return tuple(positions), tuple(velocities)


def state_box(history, requested):
    lo, hi = requested
    require(number(history["coverageStart"]) <= lo <= hi <= number(history["coverageEnd"]), "state request outside retained history")
    positions = velocities = None
    clipped = hashlib.sha256(); count = 0; first = last = None; cursor = lo
    for index, s in enumerate(history["segments"]):
        a, b = max(lo, number(s["startTime"])), min(hi, number(s["endTime"]))
        if a > b:
            continue
        require(a <= cursor and (last is None or index == last+1), "piece gap or noncontiguous original indices")
        p, v = bernstein_piece(s, a, b)
        if positions is None:
            positions, velocities = p, v
        else:
            positions = tuple((min(x[0], y[0]), max(x[1], y[1])) for x, y in zip(positions, p))
            velocities = tuple((min(x[0], y[0]), max(x[1], y[1])) for x, y in zip(velocities, v))
        clipped.update(f"{index}\t{a}\t{b}\n".encode("ascii"))
        if first is None: first = index
        last = index; count += 1; cursor = max(cursor, b)
    require(positions is not None and cursor == hi, "incomplete closed-piece coverage")
    return {"position": positions, "velocity": velocities, "touchedPieceCount": count,
            "firstIndex": first, "lastIndex": last, "contiguousIndexRange": [first, last],
            "clippedPiecesSha256": clipped.hexdigest()}


def original_history_digest(history):
    # This is only serialization identity. It confers no mathematical authority.
    tokens = [history["id"]]
    for s in history["segments"]:
        raw = [s["startTime"], s["endTime"], *[t for row in s["coefficients"] for t in row], s["positionError"], s["velocityError"]]
        for t in raw: number(t)
        tokens.extend(str(Decimal(t)) for t in raw)
        tokens.append("90")
    return sha("\n".join(tokens).encode())


def validate_premises(export, reconstruction, guards):
    """Reuses independently accepted pinned premise receipts; no new membership proof."""
    require(export["schema"] == "braid-program/f6c-retained-history-export.v1" and export["fieldSpeed"] == "1", "original normalized export differs")
    histories = export["retainedHistories"]
    require(tuple(h["id"] for h in histories) == IDS and len(histories) == 8, "original eight-member order differs")
    union = None; mapping = []
    for i, h in enumerate(histories):
        require(h["pathKey"] == i+1 and h["polarity"] == (1 if i % 2 == 0 else -1), "original identity/polarity differs")
        require(h["coverageStart"] == "-8" and h["coverageEnd"] == "0.13" and len(h["segments"]) == 1760, "original retained domain/census differs")
        cursor = F(-8); ks = set()
        for index, s in enumerate(h["segments"]):
            a, b = number(s["startTime"]), number(s["endTime"])
            require(a == cursor < b, "original history gap/overlap")
            cursor = b
            require(type(s["coefficients"]) is list and len(s["coefficients"]) == 3 and all(type(row) is list and len(row) == 4 for row in s["coefficients"]), "original coefficient shape differs")
            for row in s["coefficients"]:
                for t in row: number(t)
            for axis_key, scalar_key in (("positionErrors", "positionError"), ("velocityErrors", "velocityError")):
                require(len(s[axis_key]) == 3, "original radius-axis census differs")
                radius = number(s[scalar_key])
                require(all(0 <= number(t) <= radius for t in s[axis_key]), "scalar radius fails to cover original axis radius")
            require((b <= 0) if index < 1600 else (a >= 0), "prehistory/future split differs")
            if a >= 0: ks.update((a, b))
        require(cursor == F(13, 100), "original history suffix missing")
        if union is None: union = sorted(ks)
        else: require(union == sorted(ks), "member future knots differ")
        mapping.append({"id": h["id"], "pathKey": h["pathKey"], "polarity": h["polarity"], "originalHistoryFingerprint": h["historyFingerprint"], "historyDigest": original_history_digest(h)})
    require(len(union) == 161 and sha("".join(str(k)+"\n" for k in union).encode()) == KNOT_SHA, "exact knot inventory differs")
    require([number(frame["time"]) for frame in export["acceptedFrames"]] == union[::2], "accepted frame knots differ")
    cells = list(zip(union, union[1:]))
    require(max(b-a for a, b in cells) == F(200000000000001, 200000000000000000), "maximum cell width differs")
    for proof in (reconstruction, guards):
        require(proof["accepted"] is True and proof["historyExportBefore"]["sha256"] == FIXED[0][2] and proof["historyExportAfter"]["sha256"] == FIXED[0][2], "accepted original-bound premise required")
        require(proof["claims"]["subjectMembershipEstablished"] is False and proof["claims"]["rootsEvaluated"] is False and proof["claims"]["metricsComputed"] is False, "premise authority changed")
    for key in ("anchoredPrehistoryFamilyNonempty", "fixedAcceptedFrameFutureContained", "reconstructedFullHistoryFamilyNonempty", "reconstructedFamilyContainedInOriginalEnclosures"):
        require(reconstruction["claims"][key] is True, "represented family applicability missing")
    for key in ("conditionalUniformOldestBoundaryResidualStrictlyNegative", "conditionalUniformSameTimeNonselfSeparation", "conditionalUniformSpeedStrictlyBelowOne"):
        require(guards["claims"][key] is True, "uniform guard premise missing")
    ga = guards["analysis"]
    require(ga["counts"]["comparisons"] == {"speed": 28160, "clearance": 8960, "oldestBoundary": 17920}
            and ga["counts"]["failedComparisons"] == {"speed": 0, "clearance": 0, "oldestBoundary": 0}, "accepted guard comparison census differs")
    require(len(ga["members"]) == 8 and len(ga["clearancePairs"]) == 28 and len(ga["oldestBoundaryPairs"]) == 56, "guard census differs")
    require([(rational(c["start"]), rational(c["end"])) for c in ga["closedReceptionCells"]] == cells, "guard cell order differs")
    for j, cell in enumerate(ga["closedReceptionCells"]):
        require(cell["memberSegmentIndices"] == [1600+j]*8, "guard member-piece mapping differs")
    for i, m in enumerate(ga["members"]):
        require(m["id"] == IDS[i] and m["pathKey"] == i+1 and m["segments"] == 1760, "guard member mapping differs")
        for mode in ("axis", "scalar"):
            require(F(289, 400)-rational(m["maximumSpeedSquared"][mode]["value"]) > F(131, 50000), "speed simplification margin fails")
    expected_pairs = {(a, b) for a in IDS for b in IDS if a != b}
    observed = set()
    for pair in ga["clearancePairs"]:
        a, b = pair["unordered"]
        require(a != b and pair["ordered"] == [[a, b], [b, a]], "clearance pair mapping differs")
        require((a, b) not in observed and (b, a) not in observed, "duplicate clearance pair")
        observed.update(((a, b), (b, a)))
        for mode in ("axis", "scalar"):
            require(rational(pair["minimumSeparationSquared"][mode]["value"])-F(729, 10000) > F(309, 250000), "clearance simplification margin fails")
    require(observed == expected_pairs, "clearance pair census incomplete")
    observed = set()
    for pair in ga["oldestBoundaryPairs"]:
        key = (pair["receiver"], pair["transmitter"])
        require(key not in observed, "duplicate oldest-boundary pair")
        observed.add(key)
        for mode in ("axis", "scalar"):
            require(rational(pair["minimumDelaySquaredMinusDistanceSquared"][mode]["value"]) > 0, "oldest strict guard fails")
    require(observed == expected_pairs, "oldest pair census incomplete")
    return histories, cells, mapping


def false_flags(value):
    keys(value, set(FALSE_FLAGS), "library authority flags")
    require(all(value[k] is False for k in FALSE_FLAGS), "library authority flag was promoted")


def binding(value):
    keys(value, BINDING_KEYS, "file binding")
    require(type(value["path"]) is str and 0 < len(value["path"]) < 4096
            and type(value["sha256"]) is str and HEX_RE.fullmatch(value["sha256"]), "invalid file binding")
    integer(value["bytes"], 1, MAX_RUNTIME_BYTES)
    return value


def validate_manifest(manifest, contract, launch_binding, mapping, cells):
    keys(manifest, MANIFEST_KEYS, "manifest")
    keys(contract, CONTRACT_KEYS, "launch comparison contract")
    require(contract["declarationSha256"] == DECLARATION_SHA and contract["scope"] in ("pilot-cell-0", "full"), "launch scientific contract differs")
    require(manifest["schema"] == SCHEMA and manifest["status"] == "conditional_complete" and manifest["accepted"] is False, "subject cannot admit itself")
    require(manifest["scope"] == contract["scope"], "scope differs from external launch plan")
    require(manifest["launchPlan"] == launch_binding, "launch-plan binding differs")
    require(manifest["fixedBindings"] == [{"id": i, "path": p, "sha256": h} for i, p, h in FIXED], "fixed source/premise bindings differ")
    for key in ("subjectSourceBindings", "runtimeBindings"):
        require(type(contract[key]) is list and 0 < len(contract[key]) <= 256 and canonical(manifest[key]) == canonical(contract[key]), "reviewed execution bindings differ")
        for b in contract[key]: binding(b)
        require(len({b["path"] for b in contract[key]}) == len(contract[key]), "duplicate execution source path")
    require(canonical(manifest["members"]) == canonical(mapping) and manifest["knotSha256"] == KNOT_SHA, "history mapping or grid identity differs")
    require(type(manifest["precision"]) is int and manifest["precision"] == 90, "frozen precision differs")
    require(manifest["speedUpper"] == ["0.85"]*8 and manifest["clearanceLower"] == [["0" if i == j else "0.27" for j in range(8)] for i in range(8)], "fixed simplified premises differ")
    n = 1 if manifest["scope"] == "pilot-cell-0" else 160
    require(interval(manifest["retainedDomain"]) == (F(-8), F(13, 100)), "retained domain differs")
    require(interval(manifest["receptionDomain"]) == (cells[0][0], cells[n-1][1]), "reception domain differs")
    for key, count in (("cellCount", n), ("rowCount", n*64), ("ordinaryNonselfRows", n*56), ("selfExclusionRows", n*8), ("pieceRecordCount", n*112)):
        require(integer(manifest[key]) == count, "aggregate count differs: " + key)
    false_flags(manifest["libraryFlags"])
    for key in ("rows", "pieces"):
        binding(manifest[key]); require(manifest[key]["bytes"] <= MAX_BYTES, "stream exceeds fixed byte bound")
    return n


def check_piece(record, index, row_index, role, history, digest, requested, state):
    keys(record, PIECE_KEYS, "piece record")
    require(integer(record["recordIndex"]) == index and integer(record["rowIndex"]) == row_index and record["role"] == role, "piece row/role order differs")
    require(record["memberId"] == history["id"] and record["historyDigest"] == digest, "piece original history mapping differs")
    require(interval(record["requestedInterval"]) == requested, "piece requested interval differs")
    for key in ("touchedPieceCount", "firstIndex", "lastIndex"):
        require(integer(record[key]) == state[key], "piece census/index differs")
    require(type(record["contiguousIndexRange"]) is list and len(record["contiguousIndexRange"]) == 2
            and all(type(v) is int for v in record["contiguousIndexRange"])
            and record["contiguousIndexRange"] == state["contiguousIndexRange"], "piece contiguous range differs")
    require(record["clippedPiecesSha256"] == state["clippedPiecesSha256"], "closed clipped-piece hash differs")


def compare_rows(rows, pieces, histories, cells, mapping, *, progress=None):
    """Pure comparison; even positive synthetic controls return accepted:false.

Production authorization cannot enter through this function. The CLI separately
authenticates the frozen real inputs, premise receipts, and external launch plan.
"""
    rows, pieces = iter(rows), iter(pieces)
    row_count = piece_count = nonself = self_rows = visits = 0
    comparison = hashlib.sha256()
    for cell_index, reception in enumerate(cells):
        cache = {}
        def state(member, requested):
            key = member, requested
            if key not in cache: cache[key] = state_box(histories[member], requested)
            return cache[key]
        emission = (F(-8), reception[0]-F(1, 20))
        require(F(-8) <= emission[0] < emission[1] < reception[0] < reception[1], "fixed proposed box invalid")
        require(F(27, 100)-F(37, 20)*(reception[1]-reception[0]+F(1, 20)) > 0, "derived unrestricted upper-face margin fails")
        for i in range(8):
            for j in range(8):
                if progress: progress(cell_index, row_count)
                row = next(rows, None)
                keys(row, ROW_KEYS, "row")
                require(integer(row["rowIndex"]) == row_count and integer(row["cellIndex"]) == cell_index
                        and integer(row["receiverIndex"], 0, 7) == i and integer(row["transmitterIndex"], 0, 7) == j, "row/cell/pair order differs")
                require(row["receiverId"] == histories[i]["id"] and row["transmitterId"] == histories[j]["id"], "persistent pair identity differs")
                require(interval(row["reception"]) == reception, "row reception interval differs")
                false_flags(row["libraryFlags"])
                require(row["rootFreeComplementConditional"] is True and row["retainedBoundaryContact"] is False, "complement/boundary assertion differs")
                if i == j:
                    require(integer(row["ordinaryRootsPerReception"]) == 0 and row["coincidentEndpointExcluded"] is True, "self exclusion differs")
                    require(all(row[k] is None for k in ("emission", "oldestResidual", "lowerFaceResidual", "upperFaceResidual", "displacement", "distance", "transmitterFactor", "receiverFactor", "receiverPieceRecord", "transmitterPieceRecord")), "fabricated self geometry or pieces")
                    self_rows += 1
                else:
                    require(integer(row["ordinaryRootsPerReception"]) == 1 and row["coincidentEndpointExcluded"] is False, "ordinary-root-per-reception assertion differs")
                    require(interval(row["emission"]) == emission, "emission proposal differs")
                    receiver = state(i, reception)
                    for name, t, sign in (("oldestResidual", F(-8), "negative"), ("lowerFaceResidual", emission[0], "negative"), ("upperFaceResidual", emission[1], "positive")):
                        source = state(j, (t, t))
                        displacement = tuple(sub(x, y) for x, y in zip(receiver["position"], source["position"]))
                        check_face(row[name], displacement, (reception[0]-t, reception[1]-t), sign)
                    require(interval(row["oldestResidual"]) == interval(row["lowerFaceResidual"]), "identical oldest/lower faces disagree")
                    transmitter = state(j, emission)
                    displacement = tuple(sub(x, y) for x, y in zip(receiver["position"], transmitter["position"]))
                    require(type(row["displacement"]) is list and len(row["displacement"]) == 3, "three displacement axes required")
                    require(all(contains(interval(r), d) for r, d in zip(row["displacement"], displacement)), "returned displacement misses independent enclosure")
                    distance = check_distance(row["distance"], displacement, (reception[0]-emission[1], reception[1]-emission[0]))
                    check_factor(row["transmitterFactor"], displacement, distance, transmitter["velocity"], transmitter=True)
                    check_factor(row["receiverFactor"], displacement, distance, receiver["velocity"])
                    for role, mi, requested, enclosure in (("receiver", i, reception, receiver), ("transmitter", j, emission, transmitter)):
                        require(integer(row[role+"PieceRecord"]) == piece_count, "piece reference order differs")
                        record = next(pieces, None)
                        check_piece(record, piece_count, row_count, role, histories[mi], mapping[mi]["historyDigest"], requested, enclosure)
                        comparison.update(canonical(record)+b"\n")
                        piece_count += 1; visits += enclosure["touchedPieceCount"]
                    nonself += 1
                comparison.update(canonical(row)+b"\n")
                row_count += 1
        if progress: progress(cell_index+1, row_count)
    eof = object()
    require(next(rows, eof) is eof and next(pieces, eof) is eof, "extra row or piece record")
    return {"accepted": False, "conditionalEnclosuresConformant": True, "cellCount": len(cells),
            "pairCellCertificates": row_count, "ordinaryNonselfRows": nonself, "selfExclusionRows": self_rows,
            "distinctNonselfFaceChecks": 2*nonself, "pieceRecordCount": piece_count,
            "recordedGeometryPieceVisits": visits, "comparisonSha256": comparison.hexdigest(),
            "pieceVisitScope": "Returned root-geometry receiver/transmitter piece lists only; not measured internal face-call traversal or runtime cost."}


class BoundFile:
    def __init__(self, filename, expected, *, capture=True, limit=MAX_BYTES):
        self.path = Path(filename).absolute(); self.expected = expected
        self.capture = capture; self.limit = limit; self.fd = None

    @staticmethod
    def identity(s):
        return s.st_dev, s.st_ino, s.st_size, s.st_mtime_ns, s.st_ctime_ns

    def __enter__(self):
        require(type(self.expected) is str and HEX_RE.fullmatch(self.expected), "external original-byte hash required")
        self.fd = os.open(self.path, os.O_RDONLY | os.O_NONBLOCK | getattr(os, "O_NOFOLLOW", 0))
        try:
            self.before = os.fstat(self.fd)
            require(stat.S_ISREG(self.before.st_mode) and 0 < self.before.st_size <= self.limit, "bounded nonempty regular file required")
            self.data, observed = self.scan(self.capture)
            require(observed == self.expected, "original file hash differs: " + str(self.path))
            return self
        except BaseException:
            os.close(self.fd); self.fd = None
            raise

    def scan(self, capture=False):
        os.lseek(self.fd, 0, os.SEEK_SET)
        digest = hashlib.sha256(); size = 0; chunks = []
        while True:
            chunk = os.read(self.fd, min(1024*1024, self.limit+1-size))
            if not chunk: break
            size += len(chunk); require(size <= self.limit, "file grew beyond bound")
            digest.update(chunk)
            if capture: chunks.append(chunk)
        info = os.fstat(self.fd)
        require(self.identity(info) == self.identity(self.before) and size == info.st_size, "file changed while read")
        return (b"".join(chunks) if capture else None), digest.hexdigest()

    def records(self):
        os.lseek(self.fd, 0, os.SEEK_SET)
        pending = b""; consumed = 0; digest = hashlib.sha256()
        while True:
            chunk = os.read(self.fd, 65536)
            if not chunk: break
            consumed += len(chunk); require(consumed <= self.limit, "stream grew beyond bound")
            digest.update(chunk); pending += chunk
            while b"\n" in pending:
                line, pending = pending.split(b"\n", 1)
                require(0 < len(line) <= MAX_LINE, "empty or oversized NDJSON line")
                yield decode(line)
            require(len(pending) <= MAX_LINE, "oversized unterminated NDJSON line")
        require(not pending and consumed == self.before.st_size and digest.hexdigest() == self.expected, "raw stream incomplete or changed")
        require(self.identity(os.fstat(self.fd)) == self.identity(self.before), "stream changed during comparison")

    def recheck(self):
        require(self.scan()[1] == self.expected, "bound file changed")
        require(self.identity(os.stat(self.path, follow_symlinks=False)) == self.identity(self.before), "bound path replaced")

    def binding(self):
        return {"path": str(self.path), "sha256": self.expected, "bytes": self.before.st_size}

    def __exit__(self, *_):
        if self.fd is not None: os.close(self.fd)
        self.fd = None


def publish(output, report, deadline):
    require(time.monotonic() < deadline, "publication deadline")
    raw = canonical(report)+b"\n"; temporary = None
    try:
        with tempfile.NamedTemporaryFile(dir=output.parent, prefix=".f6c-cover-comparison-", delete=False) as fd:
            temporary = Path(fd.name); fd.write(raw); fd.flush(); os.fsync(fd.fileno())
        require(time.monotonic() < deadline, "publication deadline")
        os.link(temporary, output)
        directory = os.open(output.parent, os.O_RDONLY)
        try: os.fsync(directory)
        finally: os.close(directory)
        require(output.read_bytes() == raw and time.monotonic() < deadline, "post-publication admission failed")
        return {"path": str(output), "sha256": sha(raw), "bytes": len(raw)}
    finally:
        if temporary is not None: temporary.unlink(missing_ok=True)


def admit_completion(publication, began, deadline):
    """Called only after bound inputs close and the local watchdog is torn down."""
    require(time.monotonic() < deadline, "final comparison deadline")
    print(json.dumps({"completed": True, "accepted": True, "output": publication,
                      "elapsedSeconds": time.monotonic()-began, "h3EvidenceEligible": False}), flush=True)
    # A blocked final stdout write must not return exit zero after the deadline.
    require(time.monotonic() < deadline, "completion-publication deadline")


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    for flag in ("manifest", "manifest-sha256", "plan", "plan-sha256", "verifier-sha256", "out", "budget-seconds"):
        parser.add_argument("--"+flag, required=True)
    args = parser.parse_args(argv)
    began = time.monotonic(); budget = number(args.budget_seconds)
    require(0 < budget <= LIMIT, "remaining comparison budget must be in (0,1800]")
    float_budget = float(budget)
    require(0 < float_budget <= LIMIT, "remaining budget not representable as a positive timer interval")
    deadline = began+float_budget
    require(deadline > began, "remaining budget cannot advance the monotonic deadline")
    root = Path(__file__).resolve().parents[2]; output = Path(args.out).absolute()
    require(output.parent.is_dir() and not output.exists() and not output.is_symlink(), "fresh output in existing directory required")
    state = {"stage": "capture", "completedCells": 0, "completedRows": 0}
    def tick(*_):
        elapsed = time.monotonic()-began
        print(json.dumps({**state, "elapsedSeconds": elapsed, "accepted": False}), file=sys.stderr, flush=True)
        require(time.monotonic() < deadline, "comparison deadline")
        signal.setitimer(signal.ITIMER_REAL, min(HEARTBEAT, max(0.000001, deadline-time.monotonic())))
    previous = signal.signal(signal.SIGALRM, tick)
    signal.setitimer(signal.ITIMER_REAL, min(HEARTBEAT, float_budget))
    try:
        with ExitStack() as stack:
            owned = []
            def capture(filename, expected, **kwargs):
                require(Path(filename).resolve() != output.resolve(), "output aliases a bound input")
                obj = stack.enter_context(BoundFile(filename, expected, **kwargs)); owned.append(obj)
                return obj
            own = capture(root/SELF, args.verifier_sha256)
            require(compile(own.data, _EXECUTING_CODE.co_filename, "exec", dont_inherit=True, optimize=sys.flags.optimize) == _EXECUTING_CODE, "executing reference differs from captured source")
            fixed = {identifier: capture(root/path, digest) for identifier, path, digest in FIXED}
            plan_file = capture(args.plan, args.plan_sha256)
            plan = decode(plan_file.data, receipt=True); contract = plan["comparisonContract"]
            keys(contract, CONTRACT_KEYS, "launch comparison contract")
            require(contract["verifierSha256"] == args.verifier_sha256, "external launch plan binds a different reference")
            manifest_file = capture(args.manifest, args.manifest_sha256)
            manifest = decode(manifest_file.data)
            export = decode(fixed["export"].data)
            reconstruction = decode(fixed["reconstruction"].data, receipt=True)
            guards = decode(fixed["guards"].data, receipt=True)
            state["stage"] = "premise-mapping"
            histories, cells, mapping = validate_premises(export, reconstruction, guards)
            count = validate_manifest(manifest, contract, plan_file.binding(), mapping, cells)
            execution = []
            for key in ("subjectSourceBindings", "runtimeBindings"):
                for item in contract[key]:
                    obj = capture(root/item["path"], item["sha256"], capture=False,
                                  limit=MAX_RUNTIME_BYTES if key == "runtimeBindings" else MAX_BYTES)
                    require(obj.before.st_size == item["bytes"], "execution source size differs")
                    execution.append(obj.binding())
            require(any((root/Path(b["path"])).resolve() == Path(sys.executable).resolve() for b in contract["runtimeBindings"]), "current Python executable missing from reviewed runtime bindings")
            row_file = capture(root/manifest["rows"]["path"], manifest["rows"]["sha256"], capture=False)
            piece_file = capture(root/manifest["pieces"]["path"], manifest["pieces"]["sha256"], capture=False)
            require(row_file.path != piece_file.path and row_file.before.st_size == manifest["rows"]["bytes"] and piece_file.before.st_size == manifest["pieces"]["bytes"], "distinct stream bindings/sizes required")
            state["stage"] = "independent-row-comparison"
            def progress(completed_cells, completed_rows):
                state.update(completedCells=completed_cells, completedRows=completed_rows)
                require(time.monotonic() < deadline, "comparison deadline")
            try:
                analysis = compare_rows(row_file.records(), piece_file.records(), histories, cells[:count], mapping, progress=progress)
            except Exception as error:
                # A comparison prefix is not a successful cell or complete cover.
                completed = state["completedRows"]
                detail = {"stage": state["stage"], "completedCells": state["completedCells"],
                          "completedComparisonRows": completed,
                          "failedComparisonRowIndex": completed if completed < count*64 else None,
                          "notRunComparisonRows": max(0, count*64-completed-1), "failure": str(error)}
                raise ValueError(json.dumps(detail)) from error
            state["stage"] = "final-source-rechecks"
            for b in owned: b.recheck()
            report = {"schema": REPORT_SCHEMA, "accepted": True,
                      "authority": "independent exact-rational containment of conditional reconstructed-family root-cover rows",
                      "scope": manifest["scope"], "manifest": manifest_file.binding(), "launchPlan": plan_file.binding(),
                      "verifier": own.binding(), "fixedBindings": {k: v.binding() for k, v in fixed.items()},
                      "executionBindings": execution, "rows": row_file.binding(), "pieces": piece_file.binding(),
                      "analysis": analysis, "libraryFlags": FALSE_FLAGS,
                      "claims": {"reconstructedFamilyApplicabilityAuthenticated": True, "conditionalRootCoverValidated": True,
                                 "historicalTrajectoryIdentityEstablished": False, "rootExecutionAuthorized": False,
                                 "metricsAvailable": False, "h3EvidenceEligible": False, "scoreAuthorized": False, "eomExecuted": False},
                      "premiseAuthority": "Previously independently accepted exact hash-pinned reconstruction/guard receipts; not newly proved membership.",
                      "publication": {"intendedOutput": str(output), "requires": "matching fresh completion, exit zero, external inclusive attempt deadline and owned-process closure"},
                      "remainingBudgetSeconds": args.budget_seconds, "elapsedSecondsBeforePublication": time.monotonic()-began}
            state["stage"] = "publication"
            publication = publish(output, report, deadline)
            for b in owned: b.recheck()
            state["stage"] = "bound-input-cleanup"
    finally:
        signal.setitimer(signal.ITIMER_REAL, 0)
        signal.signal(signal.SIGALRM, previous)
    admit_completion(publication, began, deadline)


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        print(json.dumps({"completed": False, "accepted": False, "failure": str(exc)}), file=sys.stderr, flush=True)
        raise SystemExit(1)
