#!/usr/bin/env python3
"""Source-bound subject for the fixed emission-only F6c refinement.

CLI: --repo-root ROOT --plan FILE --plan-sha256 SHA --producer-sha256 SHA
     --out-dir NEW --budget-seconds REMAINING --git-binary ABSOLUTE.
Only the captured old producer helper and its three frozen numerical modules
are executed. Independent comparator sources are bound, NEVER imported.
Every query is durably flushed before progress advances. All outputs are
private/write-once then hardlinked exclusively; failure retracts only owned
public inodes and retains the private attempt. A successful producer is NOT
independent acceptance: the separate checker and whole-attempt closure remain
required. No acceleration, EOM evolution, metric, or physical claim is made.
"""
from __future__ import annotations

import argparse
from contextlib import contextmanager, ExitStack
from decimal import Decimal, localcontext
from fractions import Fraction
import hashlib
import json
import math
import os
from pathlib import Path
import re
import signal
import stat
import subprocess
import sys
import tempfile
import time
from types import ModuleType

_EXECUTING_CODE = sys._getframe().f_code
SELF = "scripts/eom/prepare-f6c-emission-refinement.py"
CONTROLS = "tests/test_f6c_emission_refinement_preparation.py"
VERIFIER = "scripts/eom/verify-f6c-emission-refinement.py"
VERIFIER_CONTROLS = "tests/test_f6c_emission_refinement.py"
DECLARATION = "reference/priorities/braid-program/evidence/2026-08-27-f6c-emission-refinement-predeclaration.md"
DECLARATION_SHA = "53f3398ba083218948c9efd93f10db09cbf5d617bc0270988f5adea24c48f037"
COMPARISON = "scripts/eom/oracle/f6c_emission_refinement_conformance.py"
COMPARISON_SHA = "0f21d676f4f50702e8375f7ba9c1f362cca82ad3d636316e7121ab819a2dbc7b"
COMPARISON_CONTROLS = "tests/test_f6c_emission_refinement_conformance.py"
COMPARISON_CONTROLS_SHA = "bac7357186fb05c5b7ea35154c5564e7527075a9a94177a8b600f9a02119adb5"
HELPER = "scripts/eom/prepare-f6c-cached-continuous-reception-root-cover.py"
HELPER_SHA = "7b81efbf67b67c78c759fcb1c49e757ffb7f513f75ca8489178bfda71f4f31c5"
BASE = ".local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/pilot-cell-0-cached-v1/"
FIXED = (
    ('export', '.local-data/braid-analysis/f6c-history-export-20260827.jUhLLg/retained-history.json', 'f479bb88a6425e9e98e00288f2524f33d5a3c0f4c2a14139dbaae4f468c46db1'),
    ('reconstruction', '.local-data/braid-analysis/f6c-accepted-frame-reconstruction-20260827.5o7jK3/reconstruction.json', '7c30aae03d43f7720b79288a19a9c9f9a7c0ab6b7b16ac9a948828ca80b92b43'),
    ('guards', '.local-data/braid-analysis/f6c-retained-history-guards-20260827.hdrqLF/guards.json', '86d7fa14ac64ee20930094ff1a59880fe4e1ef5c81758f5d8baf2c6777ee4880'),
    ('manifest', BASE+'subject/cover-manifest.json', '19fae257f7f36d858fa60d9031125b3f29dbb8780e944802699aab5292275f4c'),
    ('comparison', BASE+'comparison.json', '6bf2b50ef4f0b46f43ae77a9881f82a2f9d504d5df757bc0ad215deb8eac36c6'),
    ('admission', BASE+'pilot-admission.json', '1a814c90279eed456546b2c4959a8504657213ffc2d25c063060831814e930ee'),
    ('rows', BASE+'subject/rows.ndjson', '786785b2597bcdf024e350ba89c129fb32115afed693169a6db3137c6bdca383'),
    ('pieces', BASE+'subject/pieces.ndjson', '2c064a5956e7684868cbda7aa7e312ac609e07760bf67f1cf121c934d6d4c411'),
    ('priorPlan', 'reference/priorities/braid-program/evidence/2026-08-27-f6c-cached-root-cover-pilot-launch.v1.json', '5f5afcced38878828d65e0c5482f1764092f6449c2cba36ac6b99a1bbf9f9f86'),
    ('priorClosureOwner', 'reference/priorities/braid-program/evidence/2026-08-27-f6c-cached-root-cover-full-resource-plan.md', '8263f700a35af04b07690c81c17e0d1078eadb1fb32550cc60226b6efa0f6378'),
    ('reference', 'scripts/eom/oracle/continuous_reception_acceleration.py', 'abfc21f29d8bdd984118b1e0ba0cb62b88a081a75a961052eb11f31ea7bdd7b8'),
    ('referenceControls', 'tests/test_eom_continuous_reception_acceleration.py', '26b7c5455a57da5beba6e7fd32a0b7bfbc8e1f32630b663c55a33273e8cc1823'),
    ('referenceProof', 'reference/priorities/braid-program/evidence/2026-08-27-f6c-continuous-reception-acceleration-reference.md', '8d2c7819962db6bac0e1ea0939292992145dbe342a28b51928efb81e74478179'),
    ('memberPredeclaration', 'reference/priorities/braid-program/evidence/2026-08-26-f6c-normalized-member-acceleration-predeclaration.md', '7d4c202ce935256168ccef52e3588ffa72eb4d6509db432e814eba65ed5568bc'),
    ('rootTheorem', 'reference/priorities/braid-program/evidence/2026-08-27-f6c-continuous-reception-enclosure-contract.md', 'db38185a68210cc8567b0b9f054c6deb5d32509f858cefb5701511a4e23ef2bc'),
    ('reconstructionTheorem', 'reference/priorities/braid-program/evidence/2026-08-27-f6c-accepted-frame-history-reconstruction.md', '710279f5c348a81fd36d58c6ca704730b3fa70da729ca30b9c92ae4e1cc6734b'),
)

# Source/control closure is explicit even for bound but unexecuted references.
EXTRA = (
    (HELPER, HELPER_SHA),
    ("tests/test_f6c_cached_continuous_reception_root_cover_preparation.py", "3bee7599b03f2500ede6eeeea31c46e1aac82410f456e967102c13e820b93221"),
    ("scripts/eom/oracle/continuous_reception_roots_cached.py", "daa4cc227cb8685de673fc400d817a19666b4fc7323e6c3a56f475a463b23acf"),
    ("tests/test_eom_continuous_reception_roots_cached.py", "a5ac7c8b26c5d0a193f20305f4bdbad93939756780bdaefd9cbf569f42a487eb"),
    ("scripts/eom/oracle/certified_history.py", "ca916b4bc979629a5e25c1490da07fd78a26b4e75cfba5677f35fbab658a29e7"),
    ("scripts/eom/oracle/decimal_interval.py", "fffc17270e149e6213315c1c82b518caa739657eb649822fd1955b8a2820e38a"),
    ("tests/test_eom_decimal_interval.py", "22242cb7335cdddeb56416b8584793972195ee1aa6b460d8a43ea6baeb693b44"),
    ("scripts/eom/verify-f6c-cached-continuous-reception-root-cover.py", "3221c44ed626f0902cc1c6e4d439fc87669bc6fa9ec1397d111b2d1fc69bbfc7"),
    ("tests/test_f6c_cached_continuous_reception_root_cover.py", "09b5c51b2e43727b98adfffde6a080e8e9c92f1ffa7280d8f819d830c8f7e2a3"),
    ("reference/priorities/braid-program/evidence/2026-08-27-f6c-call-local-state-cache-equivalence.md", "a5d9ee0b77f436f5d8cf3b3f1895e94438d220543ee87c117996a704994dc34d"),
    (DECLARATION, DECLARATION_SHA), (COMPARISON, COMPARISON_SHA),
    (COMPARISON_CONTROLS, COMPARISON_CONTROLS_SHA),
)
MODULE_PATHS = {
    "decimal_interval": "scripts/eom/oracle/decimal_interval.py",
    "certified_history": "scripts/eom/oracle/certified_history.py",
    "continuous_reception_roots": "scripts/eom/oracle/continuous_reception_roots_cached.py",
}
SCHEMA = "braid-program/f6c-emission-refinement-cover.v1"
PLAN_SCHEMA = "braid-program/f6c-emission-refinement-launch.v1"
SCOPE = "pilot-cell-0-emission-refinement"
LANE = ".local-data/braid-analysis/f6c-emission-refinement-20260827"
IDS = ("0+", "0-", "1+", "1-", "2+", "2-", "3+", "3-")
CHARGE = "0.1666666666666666666666666666666667"
MAX_BYTES, MAX_RUNTIME_BYTES, LIMIT, HEARTBEAT = 64*1024**2, 1024**3, 1800, 15
HEX = re.compile(r"[a-f0-9]{64}\Z")
LIMITS = dict(inclusiveSeconds=1800, maximumAggregateRssBytes=2*1024**3,
    maximumRssSampleGapMs=1000, heartbeatSeconds=15, admissionFreeMemoryPercent=40,
    admissionDiskBytes=64*1024**3, stopFreeMemoryBelowPercent=20, stopDiskBelowBytes=16*1024**3,
    hostObservationSeconds=15, hostObservationTimeoutSeconds=2, maximumScientificFileBytes=MAX_BYTES,
    maximumOutputFileBytes=MAX_BYTES, maximumCombinedLogBytes=16*1024**2, serialWorkers=1, eomWorkers=0)
CENSUS = dict(cells=1, members=8, queries=3584, pairRows=64, ordinaryPairs=56, selfZeros=8, pieceRecords=112)
ALGORITHM = dict(lowerQueriesPerPair=32, upperQueriesPerPair=32, order="receiver-major;lower32;reset;upper32")
CLAIMS = {k: False for k in ("historicalTrajectoryIdentityEstablished", "metricsAvailable", "scoreAuthorized",
                            "h3EvidenceEligible", "eomExecuted", "independentComparisonPassed", "executionAuthorized")}
PLAN_KEYS = frozenset(("schema", "scope", "declaration", "producer", "producerControls", "verifier",
    "verifierControls", "comparisonReference", "comparisonReferenceControls", "subjectSourceBindings",
    "runtimeBindings", "operationalBindings", "limits", "priorCoverClosure"))
MANIFEST_KEYS = frozenset(("schema", "scope", "status", "accepted", "launchPlan", "producer", "fixedBindings",
    "subjectSourceBindings", "executionBindings", "priorCoverClosure", "members", "knotSha256",
    "retainedDomain", "receptionDomain", "originalEmissionDomain", "precision", "speedUpper", "clearanceLower",
    "algorithm", "restrictions", "census", "queries", "rows", "pieces", "libraryFlags", "claims"))
OPERATIONS = (
    "scripts/eom/run-f6c-emission-refinement-pilot.mjs",
    "scripts/eom/launch-f6c-emission-refinement-pilot.mjs",
    "tests/f6c-emission-refinement-pilot.test.js",
    "tests/f6c-emission-refinement-pilot-process.test.js",
    "scripts/eom/launch-prescribed-response-pilot.mjs",
    "scripts/eom/launch-subfield-circular-root-pilot.mjs",
    "/bin/ps", "/usr/bin/memory_pressure",
)
OP_PINS = {
    OPERATIONS[4]: "116eb8eee6a7d9ba9a98641d836d9c4e540449279bab1e55cdce92b12e90a26c",
    OPERATIONS[5]: "dcd4bb58b83489fe66093fa61104245aae7dbf914c6e756a2e7e0b5349908289",
    "/usr/bin/memory_pressure": "a1668e28505400a9e09ab9b2bd2558f04d038152dfdb05826576a0a0aa27fe56",
}


def require(ok, message):
    if not ok: raise ValueError(message)


def sha(raw):
    return hashlib.sha256(raw).hexdigest()


def encoded(value):
    return json.dumps(value, sort_keys=True, separators=(",", ":"), allow_nan=False).encode()+b"\n"


def decode(raw, *, document_type="data"):
    # Operational receipts carry captured command/source strings, not numeric
    # lexemes. Callers select that document class; ordinary data stays at 8192.
    require(type(document_type) is str and document_type in ("data", "operational-receipt"), "JSON document type")
    string_limit = 65536 if document_type == "operational-receipt" else 8192
    require(len(raw) <= MAX_BYTES, "JSON byte limit")
    def pairs(items):
        result = {}
        for k, v in items:
            require(k not in result, "duplicate JSON key"); result[k] = v
        return result
    def bad(value): raise ValueError("nonfinite JSON: "+value)
    value = json.loads(raw.decode("utf-8"), object_pairs_hook=pairs, parse_float=Decimal, parse_constant=bad)
    def bounded(v, depth=0):
        require(depth <= 24, "JSON depth limit")
        if isinstance(v, dict):
            require(len(v) <= 10000, "JSON object limit")
            for k, x in v.items(): require(len(k) <= 4096, "key limit"); bounded(x, depth+1)
        elif isinstance(v, list):
            require(len(v) <= 20000, "JSON array limit")
            for x in v: bounded(x, depth+1)
        elif isinstance(v, str): require(len(v) <= string_limit, "JSON token limit")
    bounded(value); return value


class BoundFile:
    """Original byte capture and same-file before/after identity."""
    def __init__(self, path, expected, *, collect=False, limit=MAX_BYTES):
        self.path = Path(path).absolute(); self.expected = expected; self.collect = collect; self.limit = limit
        self.fd = None
    @staticmethod
    def identity(s): return s.st_dev, s.st_ino, s.st_size, s.st_mtime_ns, s.st_ctime_ns
    def __enter__(self):
        require(type(self.expected) is str and HEX.fullmatch(self.expected), "SHA-256 required")
        self.fd = os.open(self.path, os.O_RDONLY | os.O_NONBLOCK | getattr(os, "O_NOFOLLOW", 0))
        try:
            self.initial = os.fstat(self.fd)
            require(stat.S_ISREG(self.initial.st_mode) and 0 < self.initial.st_size <= self.limit, "bounded regular file required")
            self.data, digest = self.scan(self.collect)
            require(digest == self.expected, "source hash mismatch: "+str(self.path)); self.recheck(); return self
        except BaseException:
            os.close(self.fd); self.fd = None; raise
    def scan(self, collect=False):
        os.lseek(self.fd, 0, os.SEEK_SET); chunks = []; digest = hashlib.sha256(); size = 0
        while True:
            block = os.read(self.fd, min(1024**2, self.limit+1-size))
            if not block: break
            size += len(block); require(size <= self.limit, "file grew beyond bound")
            digest.update(block)
            if collect: chunks.append(block)
        require(size == self.initial.st_size and self.identity(os.fstat(self.fd)) == self.identity(self.initial), "file changed during capture")
        return (b"".join(chunks) if collect else None), digest.hexdigest()
    def recheck(self):
        require(self.scan()[1] == self.expected and self.identity(os.lstat(self.path)) == self.identity(self.initial), "bound source changed/replaced")
    def binding(self): return dict(path=str(self.path), sha256=self.expected, bytes=self.initial.st_size)
    def __exit__(self, *_):
        if self.fd is not None: os.close(self.fd)
        self.fd = None


@contextmanager
def captured_helper(source):
    require(source.expected == HELPER_SHA and sha(source.data) == HELPER_SHA, "frozen helper generation")
    name = "_emission_helper_"+HELPER_SHA[:20]; suffix = 0
    while name in sys.modules: suffix += 1; name = "_emission_helper_"+HELPER_SHA[:20]+"_"+str(suffix)
    module = ModuleType(name); module.__file__ = str(source.path); sys.modules[name] = module
    try:
        exec(compile(source.data, str(source.path), "exec", dont_inherit=True, optimize=sys.flags.optimize), module.__dict__)
        yield module
    finally: sys.modules.pop(name, None)


def binding(value):
    require(type(value) is dict and set(value) == {"path", "sha256", "bytes"}, "closed byte binding")
    require(type(value["path"]) is str and 0 < len(value["path"]) < 4096, "bounded path")
    require(type(value["sha256"]) is str and HEX.fullmatch(value["sha256"]), "binding SHA")
    require(type(value["bytes"]) is int and 0 < value["bytes"] <= MAX_RUNTIME_BYTES, "binding bytes")
    p = Path(value["path"])
    require(str(p) == value["path"] and ".." not in p.parts, "canonical binding token")
    return value


def binding_list(values):
    require(type(values) is list and 0 < len(values) <= 512, "bounded binding list")
    for v in values: binding(v)
    require(len({v["path"] for v in values}) == len(values), "duplicate binding paths")


def validate_plan(plan, own_sha):
    require(type(plan) is dict and set(plan) == PLAN_KEYS, "closed launch plan")
    require(plan["schema"] == PLAN_SCHEMA and plan["scope"] == SCOPE and encoded(plan["limits"]) == encoded(LIMITS), "fixed scope/limits")
    named = {"producer": (SELF, own_sha), "producerControls": (CONTROLS, None),
             "verifier": (VERIFIER, None), "verifierControls": (VERIFIER_CONTROLS, None),
             "declaration": (DECLARATION, DECLARATION_SHA), "comparisonReference": (COMPARISON, COMPARISON_SHA),
             "comparisonReferenceControls": (COMPARISON_CONTROLS, COMPARISON_CONTROLS_SHA)}
    for key, (path, digest) in named.items():
        b = binding(plan[key]); require(b["path"] == path and (digest is None or b["sha256"] == digest), "named source differs: "+key)
    for key in ("subjectSourceBindings", "runtimeBindings", "operationalBindings"): binding_list(plan[key])
    expected = {**dict(EXTRA), SELF: own_sha, CONTROLS: plan["producerControls"]["sha256"]}
    require({b["path"]: b["sha256"] for b in plan["subjectSourceBindings"]} == expected, "exact fifteen source/control bindings")
    for key in ("producer", "producerControls", "declaration", "comparisonReference", "comparisonReferenceControls"):
        require(plan[key] in plan["subjectSourceBindings"], "named/subject binding disagreement")
    ops = {b["path"]: b["sha256"] for b in plan["operationalBindings"]}
    require(set(OPERATIONS) < set(ops) and len(ops) == 9, "exact operational files plus resolved Node")
    extra = next(iter(set(ops)-set(OPERATIONS)))
    require(Path(extra).is_absolute() and Path(extra).name == "node", "resolved Node runtime binding")
    for p, h in OP_PINS.items(): require(ops[p] == h, "frozen operational helper differs")
    expected_closure = dict(authority="externally-reviewed-caller-observation",
        ownerSha256=dict((k, h) for k, _, h in FIXED)["priorClosureOwner"],
        admissionSha256=dict((k, h) for k, _, h in FIXED)["admission"],
        matchingFreshCompletionObserved=True, exitCode=0, elapsedSeconds="8.534247625",
        processesClosed=True, independentAuditAccepted=True)
    require(encoded(plan["priorCoverClosure"]) == encoded(expected_closure), "prior external closure premise differs")
    return plan


def canonical_decimal(value, helper):
    text = format(helper.finite_decimal(value), "f")
    if "." in text: text = text.rstrip("0").rstrip(".")
    return "0" if text in ("-0", "") else text


def authenticate_prior(fixed):
    """Check the pinned prior metadata chain; never re-evaluate root evidence."""
    docs = {k: decode(fixed[k].data, document_type="operational-receipt" if k == "admission" else "data")
            for k in ("manifest", "comparison", "admission", "priorPlan")}
    m, c, a, p = (docs[k] for k in ("manifest", "comparison", "admission", "priorPlan"))
    for obj, key, role in ((m, "rows", "rows"), (m, "pieces", "pieces"), (m, "launchPlan", "priorPlan"),
        (c, "rows", "rows"), (c, "pieces", "pieces"), (c, "manifest", "manifest"),
        (c, "launchPlan", "priorPlan"), (a, "plan", "priorPlan")):
        require(binding(obj[key]) == fixed[role].binding(), "prior original-byte link differs")
    require(c["schema"] == "braid-program/f6c-continuous-reception-root-cover-conformance.v1"
        and c["accepted"] is True and c["scope"] == "pilot-cell-0"
        and c["analysis"]["accepted"] is False and c["analysis"]["conditionalEnclosuresConformant"] is True,
        "prior conditional comparison absent")
    require(p["schema"] == "braid-program/f6c-cached-root-cover-pilot-launch.v1" and p["scope"] == "pilot-cell-0",
        "prior plan scope differs")
    require(m["subjectSourceBindings"] == p["comparisonContract"]["subjectSourceBindings"]
        and m["runtimeBindings"] == p["comparisonContract"]["runtimeBindings"], "prior source/runtime chain differs")
    require(a["schema"] == "braid-program/f6c-cached-root-cover-pilot-admission.v1"
        and a["accepted"] is True and a["scope"] == "pilot-cell-0" and a["processesClosed"] is True,
        "prior operational admission absent")
    for key in ("eomExecuted", "fullRunAuthorized", "h3EvidenceEligible", "historicalTrajectoryIdentityEstablished", "metricsAvailable"):
        require(a[key] is False, "prior authority promoted")
    require(len(a["stages"]) == 2, "prior stage census")
    for item, stage in zip(a["stages"], ("consumer", "comparison")):
        process = item["process"]; completion = item["admission"]["completion"]
        require(item["stage"] == stage and item["admission"]["accepted"] is True and process["accepted"] is True
            and process["processesClosed"] is True and process["exit"] == {"code": 0, "signal": None}
            and completion["completed"] is True and completion["accepted"] is (stage == "comparison"), "prior closed stage differs")
        require(len(process["gates"]) == 1 and process["gates"][0]["retired"] is True, "prior gate closure differs")
        expected = [fixed[k].binding() for k in ("rows", "pieces", "manifest")] if stage == "consumer" else fixed["comparison"].binding()
        require(completion["outputs" if stage == "consumer" else "output"] == expected, "prior completed outputs differ")


def propose(histories, modules, helper, write_query, progress):
    """Subject algorithm only; whole-face public calls, no private cache."""
    with localcontext() as context:
        context.prec = 90; context.Emin = -999999; context.Emax = 999999
        return _propose(histories, modules, helper, write_query, progress)


def _propose(histories, modules, helper, write_query, progress):
    require(len(histories) == 8 and tuple(h.history_id for h in histories) == IDS, "eight ordered histories")
    lib = modules["continuous_reception_roots"]; box = modules["decimal_interval"].DecimalInterval
    reception = box.bounds("0", "0.001", 90); restrictions = []; qindex = 0
    for i in range(8):
        for j in range(8):
            if i == j: continue
            retained = {"lower": Fraction(-8), "upper": Fraction(-1, 20)}
            proof = {"lower": None, "upper": None}
            for side in ("lower", "upper"):
                lo, hi = Fraction(-8), Fraction(-1, 20)
                for ordinal in range(32):
                    before = (lo, hi); midpoint = (lo+hi)/2
                    token = canonical_decimal(midpoint, helper)
                    face = box.bounds(token, token, 90)
                    residual = lib.unrestricted_residual(histories[i], histories[j], reception, face)
                    require(residual.precision == 90 and residual.lower.is_finite() and residual.upper.is_finite()
                            and residual.lower <= residual.upper, "finite 90-digit unrestricted residual")
                    proved = residual.upper < 0 if side == "lower" else residual.lower > 0
                    if proved: retained[side] = midpoint; proof[side] = qindex
                    if side == "lower":
                        if proved: lo = midpoint
                        else: hi = midpoint
                        decision = "retain-negative" if proved else "explore-lower-half"
                    else:
                        if proved: hi = midpoint
                        else: lo = midpoint
                        decision = "retain-positive" if proved else "explore-upper-half"
                    record = dict(queryIndex=qindex, receiverIndex=i, transmitterIndex=j, receiverId=IDS[i],
                        transmitterId=IDS[j], side=side, ordinal=ordinal,
                        exploratory=dict(lower=canonical_decimal(before[0], helper), upper=canonical_decimal(before[1], helper), precision=90),
                        midpoint=token, residual=helper.interval_record(residual), decision=decision,
                        retainedFace=canonical_decimal(retained[side], helper))
                    write_query(record)  # Durable caller flush precedes completed-prefix authority.
                    qindex += 1; progress["completedQueries"] = qindex
            require(Fraction(-8) <= retained["lower"] < retained["upper"] <= Fraction(-1, 20), "crossed/equal retained faces unresolved")
            restrictions.append(dict(receiverIndex=i, transmitterIndex=j, receiverId=IDS[i], transmitterId=IDS[j],
                lower=canonical_decimal(retained["lower"], helper), upper=canonical_decimal(retained["upper"], helper),
                lowerQueryIndex=proof["lower"], upperQueryIndex=proof["upper"]))
    require(qindex == 3584 and len(restrictions) == 56, "complete query census")
    return restrictions


def emit_cover(histories, restrictions, modules, helper, write_row, write_piece, progress):
    """One unchanged public final-cover call; source-specific serialization."""
    lib = modules["continuous_reception_roots"]; box = modules["decimal_interval"].DecimalInterval
    reception = box.bounds("0", "0.001", 90)
    digests = tuple((h.history_id, h.digest()) for h in histories)
    require(len(restrictions) == 56, "complete proposals")
    emissions = {}
    for n, (i, j) in enumerate((i, j) for i in range(8) for j in range(8) if i != j):
        r = restrictions[n]
        require((r["receiverIndex"], r["transmitterIndex"], r["receiverId"], r["transmitterId"]) == (i, j, IDS[i], IDS[j]), "proposal order")
        require(Fraction(-8) <= Fraction(r["lower"]) < Fraction(r["upper"]) <= Fraction(-1, 20), "proposal domain")
        emissions[(IDS[i], IDS[j])] = box.bounds(r["lower"], r["upper"], 90)
    premises = lib.ConditionalPremises(digests, box.bounds("-8", "0.13", 90), reception,
        tuple(Decimal("0.85") for _ in IDS),
        tuple(tuple(Decimal(0) if i == j else Decimal("0.27") for j in range(8)) for i in range(8)),
        True, True, "Externally authenticated F_H subset of unchanged original envelopes; not historical trajectory identity.")
    result = lib.enclose_root_cover(histories, premises, (lib.ReceptionCellProposal(reception, emissions),))
    require(result.hypotheses is premises and result.expected_rows == 64 and result.reception_cells == (reception,), "final cover identity")
    flags = helper.flags(result); piece_index = 0; visits = 0
    for index, row in enumerate(result.rows):
        require(index < 64, "extra final row"); i, j = divmod(index, 8)
        require((row.receiver_id, row.transmitter_id, row.reception) == (IDS[i], IDS[j], reception), "final row identity")
        record = dict(rowIndex=index, cellIndex=0, receiverIndex=i, transmitterIndex=j,
            receiverId=IDS[i], transmitterId=IDS[j], reception=helper.interval_record(row.reception),
            emission=helper.interval_record(row.emission), ordinaryRootsPerReception=row.ordinary_roots_per_reception,
            coincidentEndpointExcluded=row.coincident_endpoint_excluded,
            oldestResidual=helper.interval_record(row.oldest_residual), lowerFaceResidual=helper.interval_record(row.lower_face_residual),
            upperFaceResidual=helper.interval_record(row.upper_face_residual),
            displacement=None if row.displacement is None else [helper.interval_record(v) for v in row.displacement],
            distance=helper.interval_record(row.distance), transmitterFactor=helper.interval_record(row.transmitter_factor),
            receiverFactor=helper.interval_record(row.receiver_factor), receiverPieceRecord=None, transmitterPieceRecord=None,
            rootFreeComplementConditional=row.root_free_complement_conditional,
            retainedBoundaryContact=row.retained_boundary_contact, libraryFlags=dict(flags))
        if i == j:
            require(row.ordinary_roots_per_reception == 0 and row.coincident_endpoint_excluded is True
                and not row.receiver_pieces and not row.transmitter_pieces
                and all(getattr(row, k) is None for k in ("emission", "oldest_residual", "lower_face_residual",
                    "upper_face_residual", "displacement", "distance", "transmitter_factor", "receiver_factor")), "self exclusion differs")
        else:
            require(row.ordinary_roots_per_reception == 1 and row.coincident_endpoint_excluded is False
                and row.emission == emissions[(IDS[i], IDS[j])], "final emission differs")
            require(row.oldest_residual.upper < 0 and row.lower_face_residual.upper < 0 < row.upper_face_residual.lower, "strict final/oldest faces unresolved")
            require(row.distance.lower > 0 and row.transmitter_factor.lower >= Decimal("1e-24")
                and row.receiver_factor.lower > 0, "positive distance/factors unresolved")
            for role, mi, parts, requested in (("receiver", i, row.receiver_pieces, row.reception),
                                               ("transmitter", j, row.transmitter_pieces, row.emission)):
                record[role+"PieceRecord"] = piece_index
                write_piece(helper.compact_pieces(parts, record_index=piece_index, row_index=index, role=role,
                    member=IDS[mi], digest=digests[mi][1], requested=requested))
                visits += len(parts); piece_index += 1; progress["completedPieces"] = piece_index
        require(row.root_free_complement_conditional is True and row.retained_boundary_contact is False, "complement/boundary differs")
        write_row(record); progress["completedRows"] = index+1
    require(result.status == "conditional_complete" and result.failure_code == result.failure_detail == ""
        and len(result.rows) == 64 and piece_index == 112, "final cover unresolved/incomplete")
    return visits


class Publication:
    """Private durable attempt; only own linked public inodes are retractable."""
    def __init__(self, output, deadline):
        self.output = Path(output); self.deadline = deadline; self.links = []
        self.output.mkdir(mode=0o700)
        self.private = Path(tempfile.mkdtemp(prefix=".emission-private-", dir=self.output))
    def check(self): require(time.monotonic() < self.deadline, "inclusive publication deadline")
    def sync_directory(self):
        fd = os.open(self.output, os.O_RDONLY)
        try: os.fsync(fd)
        finally: os.close(fd)
        self.check()
    def publish(self, name, helper):
        self.check()
        source = self.private/name; public = self.output/name
        with source.open("rb") as f: raw = f.read(MAX_BYTES+1)
        require(0 < len(raw) <= MAX_BYTES, "bounded completed output")
        digest = sha(raw)
        os.link(source, public); self.links.append((public, os.lstat(source).st_ino, os.lstat(source).st_dev))
        self.sync_directory()
        return dict(path=str(public), sha256=digest, bytes=len(raw))
    def reject(self):
        errors = []
        for path, ino, dev in reversed(self.links):
            try:
                s = os.lstat(path)
                if (s.st_ino, s.st_dev) == (ino, dev): path.unlink()
            except FileNotFoundError: pass
            except OSError as error: errors.append(str(error))
        fd = os.open(self.output, os.O_RDONLY)
        try: os.fsync(fd)
        finally: os.close(fd)
        return errors


def check_output(root, output, git_binary):
    lane = root/LANE
    require(output == output.resolve() and output.parent == lane and lane.is_dir() and lane.resolve() == lane, "canonical direct output child")
    require(not output.exists() and not output.is_symlink(), "fresh absent output directory")
    result = subprocess.run([str(git_binary), "check-ignore", "-q", "--", str(output.relative_to(root))],
        cwd=root, stdin=subprocess.DEVNULL, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=2)
    require(result.returncode == 0, "output not confirmed ignored")


def make_manifest(plan, own, plan_file, fixed, execution, mapping, restrictions, bindings, helper):
    box = lambda lo, hi: dict(lower=lo, upper=hi, precision=90)
    result = dict(schema=SCHEMA, scope=SCOPE, status="conditional_complete", accepted=False,
        launchPlan=plan_file.binding(), producer=own.binding(), fixedBindings={k: b.binding() for k, b in fixed.items()},
        subjectSourceBindings=plan["subjectSourceBindings"], executionBindings=execution,
        priorCoverClosure=plan["priorCoverClosure"], members=mapping, knotSha256=helper.KNOT_SHA,
        retainedDomain=box("-8", "0.13"), receptionDomain=box("0", "0.001"), originalEmissionDomain=box("-8", "-0.05"),
        precision=90, speedUpper="0.85", clearanceLower="0.27",
        algorithm=dict(ALGORITHM), restrictions=restrictions, census=dict(CENSUS),
        queries=bindings[0], rows=bindings[1], pieces=bindings[2], libraryFlags=dict(helper.FALSE_FLAGS), claims=dict(CLAIMS))
    require(set(result) == MANIFEST_KEYS, "closed manifest fields")
    return result


def admit_completion(value, deadline):
    require(time.monotonic() < deadline, "final cleanup deadline")
    print(json.dumps(value, allow_nan=False), flush=True)
    require(time.monotonic() < deadline, "completion flush deadline")


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    for key in ("repo-root", "plan", "plan-sha256", "producer-sha256", "out-dir", "budget-seconds", "git-binary"):
        parser.add_argument("--"+key, required=True)
    args = parser.parse_args(argv)
    began = time.monotonic()
    require(len(args.budget_seconds) < 128, "bounded budget token")
    require(re.fullmatch(r"(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?", args.budget_seconds), "decimal remaining budget")
    decimal_budget = Decimal(args.budget_seconds)
    require(decimal_budget.is_finite() and abs(decimal_budget.as_tuple().exponent) <= 1000, "bounded budget exponent")
    budget = Fraction(decimal_budget); seconds = float(budget); deadline = began+seconds
    require(0 < budget <= LIMIT and math.isfinite(seconds) and 0 < seconds <= LIMIT and deadline > began, "representable positive remaining budget")
    root = Path(args.repo_root).absolute(); output = Path(args.out_dir).absolute()
    require(root == root.resolve() and Path(__file__).absolute() == root/SELF, "canonical executing repository root")
    publication = None; progress = dict(stage="capture", completedQueries=0, completedRows=0, completedPieces=0)
    def heartbeat(*_):
        require(time.monotonic() < deadline, "producer deadline")
        print(json.dumps({**progress, "accepted": False, "elapsedSeconds": time.monotonic()-began}), file=sys.stderr, flush=True)
        signal.setitimer(signal.ITIMER_REAL, min(HEARTBEAT, max(0.000001, deadline-time.monotonic())))
    previous = signal.signal(signal.SIGALRM, heartbeat)
    signal.setitimer(signal.ITIMER_REAL, min(HEARTBEAT, seconds))
    try:
        with ExitStack() as stack:
            owned = []; by_path = {}
            def capture(path, digest, collect=False, limit=MAX_BYTES):
                path = Path(path).absolute()
                if path in by_path:
                    old = by_path[path]; require(old.expected == digest and (not collect or old.data is not None), "conflicting source capture")
                    return old
                obj = stack.enter_context(BoundFile(path, digest, collect=collect, limit=limit))
                owned.append(obj); by_path[path] = obj; return obj
            own = capture(root/SELF, args.producer_sha256, True)
            require(compile(own.data, _EXECUTING_CODE.co_filename, "exec", dont_inherit=True, optimize=sys.flags.optimize)
                == _EXECUTING_CODE, "executing producer differs from captured source")
            plan_file = capture(args.plan, args.plan_sha256, True); plan = validate_plan(decode(plan_file.data), args.producer_sha256)
            fixed = {key: capture(root/path, digest, True) for key, path, digest in FIXED}
            authenticate_prior(fixed)
            source_files = {}
            for b in plan["subjectSourceBindings"]:
                source_files[b["path"]] = capture(root/b["path"], b["sha256"], True)
                require(source_files[b["path"]].initial.st_size == b["bytes"], "source byte size")
            for key in ("verifier", "verifierControls"):
                b = plan[key]; obj = capture(root/b["path"], b["sha256"])
                require(obj.initial.st_size == b["bytes"], "named verifier bytes")
            execution = []; runtime = set()
            for key in ("runtimeBindings", "operationalBindings"):
                for b in plan[key]:
                    obj = capture(root/b["path"], b["sha256"], limit=MAX_RUNTIME_BYTES)
                    require(obj.initial.st_size == b["bytes"], "execution byte size")
                    execution.append(obj.binding())
                    if key == "runtimeBindings": runtime.add(obj.path.resolve())
            git_binary = Path(args.git_binary)
            require(git_binary.is_absolute() and git_binary == git_binary.resolve() and git_binary in runtime, "explicit bound resolved Git")
            require(Path(sys.executable).resolve() in runtime and Path(sys.executable).parent.parent/"pyvenv.cfg" in runtime, "shared Python/venv runtime")
            with captured_helper(source_files[HELPER]) as helper:
                captured = {name: (str(source_files[path].path), source_files[path].data, source_files[path].expected)
                            for name, path in MODULE_PATHS.items()}
                with helper.captured_package(captured) as modules:
                    excluded = [own.path, source_files[HELPER].path, *(source_files[p].path for p in MODULE_PATHS.values())]
                    require(helper.imported_runtime_paths(excluded) <= runtime, "runtime outside plan before work")
                    originals, cells = helper.authenticate_premises(decode(fixed["export"].data),
                        decode(fixed["reconstruction"].data), decode(fixed["guards"].data))
                    require(cells[0] == (Fraction(0), Fraction(1, 1000)), "original cell zero differs")
                    require(all(h["charge"] == (CHARGE if i % 2 == 0 else "-"+CHARGE)
                                for i, h in enumerate(originals)), "original charge differs")
                    histories = helper.build_histories(originals, modules)
                    mapping = [dict(id=h["id"], pathKey=h["pathKey"], polarity=h["polarity"], charge=h["charge"],
                        originalHistoryFingerprint=h["historyFingerprint"], historyDigest=history.digest())
                        for h, history in zip(originals, histories)]
                    check_output(root, output, git_binary); publication = Publication(output, deadline)
                    progress["stage"] = "query-proposal"
                    sinks = [helper.JsonlSink(publication.private/name, deadline) for name in ("queries.ndjson", "rows.ndjson", "pieces.ndjson")]
                    with sinks[0] as queries, sinks[1] as rows, sinks[2] as pieces:
                        def query(record): queries.write(record); queries.flush()
                        restrictions = propose(histories, modules, helper, query, progress)
                        progress["stage"] = "final-cover"
                        visits = emit_cover(histories, restrictions, modules, helper, rows.write, pieces.write, progress)
                        for sink in sinks: sink.flush()
                    require([s.count for s in sinks] == [3584, 64, 112], "complete serialized census")
                    progress["stage"] = "publication"
                    for obj in owned: obj.recheck()
                    bindings = [publication.publish(name, helper) for name in ("queries.ndjson", "rows.ndjson", "pieces.ndjson")]
                    manifest = make_manifest(plan, own, plan_file, fixed, execution, mapping, restrictions, bindings, helper)
                    helper.exclusive_json(publication.private/"cover-manifest.json", manifest, deadline)
                    bindings.append(publication.publish("cover-manifest.json", helper))
                    for b in bindings:
                        obj = capture(b["path"], b["sha256"]); require(obj.initial.st_size == b["bytes"], "output byte size")
                    require(helper.imported_runtime_paths(excluded) <= runtime, "late runtime outside plan")
                    for obj in owned: obj.recheck()
                    publication.check()
            progress["stage"] = "input-cleanup"
        publication.check()
        completion = dict(completed=True, accepted=False, scope=SCOPE, conditionalCoverPrepared=True,
            externalWholeAttemptAdmissionRequired=True, producer=own.binding(), launchPlan=plan_file.binding(),
            outputs=bindings, census=dict(CENSUS), recordedGeometryPieceVisits=visits,
            elapsedSeconds=time.monotonic()-began, h3EvidenceEligible=False, eomExecuted=False)
        admit_completion(completion, deadline)
    except BaseException as error:
        signal.setitimer(signal.ITIMER_REAL, 0)  # Failed-attempt cleanup; no successful authority.
        cleanup = publication.reject() if publication is not None else []
        failure = dict(completed=False, accepted=False, scope=SCOPE, conditionalCoverPrepared=False,
            externalWholeAttemptAdmissionRequired=True, **progress, failure=str(error),
            privateAttemptPreserved=str(publication.private) if publication else None, cleanupFailures=cleanup,
            h3EvidenceEligible=False, eomExecuted=False)
        print(json.dumps(failure), file=sys.stderr, flush=True)
        raise
    finally:
        signal.setitimer(signal.ITIMER_REAL, 0); signal.signal(signal.SIGALRM, previous)


if __name__ == "__main__":
    main()
