#!/usr/bin/env python3
"""Independent restriction verifier; never a producer, parser/build certificate or EOM request.

Producer contract (closed key sets below): preserve the twelve member identities
and source segments 0..50 literally, changing only segment 50 tEnd to "0".
There is deliberately no current history ID/fingerprint: originalHistory names
provenance only. No coupling or future state belongs to this data artifact.

Inclusion theorem: the exact nominal domains restrict, and the API domains
[pred(RN(start)),succ(RN(end))] restrict. Coefficients, origin and error tokens
are unchanged. The two accepted analytic interpretations and their position /
derivative error bounds therefore restrict to these domains. This is not a
claim that newly evaluated interval outputs are identical, nor a certificate
of any future EOM consumer, binary, numeric conversion or initial request.
The positive-subnormal succ(0) is an evaluation overhang, not supplied future.
"""
from __future__ import annotations

import argparse
from fractions import Fraction
import hashlib
import json
import math
import os
from pathlib import Path
import re
import signal
import stat
import struct
import sys
import tempfile
import time

_EXECUTING_CODE = sys._getframe().f_code
SELF = "scripts/eom/verify-f5-prehistory-restriction.py"
BASE = ".local-data/braid-analysis/2026-08-26-f5-enclosed-root-restart/prepared-20260827-v1/"
FULL_PATH = BASE + "history-manifest.json"
FULL_SHA = "5c665fcd7eee92a105fd958929ee443e4eeaea6afc0222935739aad2622a1725"
NOMINAL_PATH = BASE + "nominal-history-conformance.json"
NOMINAL_SHA = "f862a7148a0a00b3bde5fbb0d164156fce2dbfc161597b0cdaa182457f3741e0"
API_PATH = BASE + "api-domain-conformance.json"
API_SHA = "440deb996eaeb646b7863e9276fb937f9897c11fdbd56fed11a32efb269fe746"
SCHEMA = "braid-program/f5-prehistory-restriction.v1"
REPORT_SCHEMA = "braid-program/f5-prehistory-restriction-conformance.v1"
TOP_KEYS = frozenset(("schema", "sourceFullManifest", "normalizedFieldSpeed", "retainedInterval",
                      "releaseTime", "maximumSegmentStep", "positionWidth", "velocityWidth", "members"))
MEMBER_KEYS = frozenset(("index", "constituentId", "worldlineId", "polarity", "originalHistory", "segments"))
SEGMENT_KEYS = frozenset(("index", "tStart", "tEnd", "coefficients", "positionErrors", "velocityErrors"))
DECIMAL = re.compile(r"-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\Z")
LIMIT = 1800
HEARTBEAT = 15
MAX_FILE_BYTES = 128 * 1024 * 1024


def require(condition, message):
    if not condition:
        raise ValueError(message)


def sha(data):
    return hashlib.sha256(data).hexdigest()


def canonical(value):
    return json.dumps(value, sort_keys=True, separators=(",", ":"), allow_nan=False).encode()


def decode(data):
    def pairs(items):
        result = {}
        for key, value in items:
            require(key not in result, "duplicate JSON key")
            result[key] = value
        return result
    def reject(value):
        raise ValueError("JSON floating/nonfinite numeric token forbidden: " + value)
    return json.loads(data, object_pairs_hook=pairs, parse_float=reject, parse_constant=reject)


def number(token):
    require(type(token) is str and len(token) <= 4096 and DECIMAL.fullmatch(token), "exact decimal string required")
    exponent = re.search(r"[eE]([+-]?[0-9]+)$", token)
    require(not exponent or abs(int(exponent[1])) <= 4096, "decimal exponent exceeds bound")
    return Fraction(token)


def rational(value):
    return {"numerator": str(value.numerator), "denominator": str(value.denominator)}


def expanded(start, end):
    a, b = number(start), number(end)
    fa, fb = float(a), float(b)
    require(math.isfinite(fa) and math.isfinite(fb) and fa < fb and a < b, "invalid exact/binary64 domain")
    lo, hi = math.nextafter(fa, -math.inf), math.nextafter(fb, math.inf)
    require(math.isfinite(lo) and math.isfinite(hi), "unbounded API domain")
    result = (Fraction.from_float(lo), Fraction.from_float(hi))
    require(result[0] < a < b < result[1], "API expansion does not contain nominal domain")
    return result


def prove_subset(old_start, old_end, new_start, new_end):
    a, b, c, d = map(number, (old_start, old_end, new_start, new_end))
    require(a <= c < d <= b, "nominal domain is not a restriction")
    old_api, new_api = expanded(old_start, old_end), expanded(new_start, new_end)
    require(old_api[0] <= new_api[0] < new_api[1] <= old_api[1], "API domain is not a restriction")
    return {"nominalOriginal": [old_start, old_end], "nominalRestricted": [new_start, new_end],
            "apiOriginal": list(map(rational, old_api)), "apiRestricted": list(map(rational, new_api))}


def compare_structure(prefix, full):
    """Pure structural control; no receipt/file authority and no accepted result."""
    require(type(prefix) is dict and set(prefix) == TOP_KEYS, "prehistory top-level keys differ")
    require(prefix["schema"] == SCHEMA, "distinct prehistory-only schema required")
    require(prefix["sourceFullManifest"] == {"path": FULL_PATH, "sha256": FULL_SHA}, "original manifest binding differs")
    require(prefix["retainedInterval"] == ["-1", "0"] and prefix["releaseTime"] == "0", "exact prehistory/release domain required")
    for key in ("maximumSegmentStep", "positionWidth", "velocityWidth", "normalizedFieldSpeed"):
        require(prefix[key] == full[key] and type(prefix[key]) is str, "changed original header token: " + key)
    require(prefix["normalizedFieldSpeed"] == "1", "normalized wake speed must be one")
    require(type(prefix["members"]) is list and len(prefix["members"]) == len(full["members"]) == 12, "twelve members required")
    domains = []
    for mi, (member, original) in enumerate(zip(prefix["members"], full["members"])):
        require(type(member) is dict and set(member) == MEMBER_KEYS, "member keys or current fingerprint differ")
        for key in ("index", "constituentId", "worldlineId", "polarity"):
            require(type(member[key]) is type(original[key]) and member[key] == original[key], "changed member identity: " + key)
        require(type(member["index"]) is int and member["index"] == mi, "member order differs")
        require(member["originalHistory"] == {"historyId": original["historyId"], "historyFingerprint": original["historyFingerprint"]}, "original history provenance differs")
        require(type(member["segments"]) is list and len(member["segments"]) == 51 and len(original["segments"]) == 1032, "exact 51-of-1032 census required")
        for j, segment in enumerate(member["segments"]):
            source = original["segments"][j]
            require(type(segment) is dict and set(segment) == set(source) == SEGMENT_KEYS, "segment keys differ")
            require(type(segment["index"]) is int and segment["index"] == source["index"] == j, "segment order differs")
            for key in SEGMENT_KEYS - {"index", "tEnd"}:
                require(segment[key] == source[key], "changed original segment token: " + key)
            require(segment["tEnd"] == ("0" if j == 50 else source["tEnd"]), "only final tEnd may become exact zero")
            require(type(segment["coefficients"]) is list and len(segment["coefficients"]) == 3, "three coefficient axes required")
            for axis in segment["coefficients"]:
                require(type(axis) is list and len(axis) == 4, "four cubic coefficients required")
                for token in axis: number(token)
            for key in ("positionErrors", "velocityErrors"):
                require(type(segment[key]) is list and len(segment[key]) == 3, "three error axes required")
                for token in segment[key]: require(number(token) >= 0, "negative error radius")
            require(segment["tStart"] == ("-1" if j == 0 else member["segments"][j-1]["tEnd"]), "prefix gap or changed start token")
            require(number(source["tStart"]) < 0 and (j == 50 or number(source["tEnd"]) <= 0), "unexpected crossing census")
            if j == 50: require(number(source["tEnd"]) > 0, "last original segment must cross release")
            domains.append({"member": mi, "segment": j, **prove_subset(source["tStart"], source["tEnd"], segment["tStart"], segment["tEnd"])})
    return {"accepted": False, "structureConformant": True, "memberCount": 12, "segmentsPerMember": 51,
            "restrictedSegmentCount": 612, "clippedSegmentCount": 12, "domains": domains}


def validate_receipts(full, nominal, api):
    for receipt, schema in ((nominal, "braid-program/f5-actual-cubic-conformance.v1"), (api, "braid-program/f5-api-domain-conformance.v1")):
        require(receipt["schema"] == schema and receipt["accepted"] is True and receipt["h3EvidenceEligible"] is False,
                "accepted scoped original conformance required")
        require(receipt["resourceContact"] is False and receipt["failure"] is None, "original conformance incomplete")
        require(receipt["historyManifestSha256"] == FULL_SHA and receipt["processedMemberSegments"] == receipt["expectedMemberSegments"] == 12384, "original proof binding/census differs")
        require(receipt["campaignId"] == full["campaignId"] and receipt["runId"] == full["runId"], "original proof identity differs")
        for key in ("retainedInterval", "normalizedFieldSpeed", "positionWidth", "velocityWidth"):
            require(receipt[key] == full[key], "original proof header differs")
        require(len(receipt["memberResults"]) == 12, "original proof member census differs")
    require(api["nominalCertificateSha256"] == NOMINAL_SHA, "API proof nominal dependency differs")
    for mi, original in enumerate(full["members"]):
        for receipt in (nominal, api):
            member = receipt["memberResults"][mi]
            require(member["index"] == original["index"] == mi and member["worldlineId"] == original["worldlineId"] and member["historyFingerprint"] == original["historyFingerprint"], "original proof member identity differs")
            require(len(member["segments"]) == 1032, "original proof segment census differs")
        for j, source in enumerate(original["segments"][:51]):
            n, a = nominal["memberResults"][mi]["segments"][j], api["memberResults"][mi]["segments"][j]
            require(n["index"] == a["index"] == j and n["accepted"] is True and a["passed"] is True, "unaccepted original segment")
            require(tuple(number(x) for x in a["expandedIntervalExact"]) == expanded(source["tStart"], source["tEnd"]), "original API domain differs")
            require(a["parsedEndpointBits"] == [struct.pack(">d", float(number(source[key]))).hex() for key in ("tStart", "tEnd")], "original API endpoint bits differ")


def release_values(prefix, nominal):
    """Exact source-decimal cubic values and inherited analytic enclosures, not an initial request."""
    result = []
    for mi, member in enumerate(prefix["members"]):
        s = member["segments"][-1]; u = -number(s["tStart"])
        proof = nominal["memberResults"][mi]["segments"][50]
        axes = []
        for ax, tokens in enumerate(s["coefficients"]):
            c = list(map(number, tokens)); p = sum(c[k]*u**k for k in range(4)); v = sum(k*c[k]*u**(k-1) for k in range(1, 4))
            ex, ev = number(proof["positionErrorUpper"][ax]), number(proof["velocityErrorUpper"][ax])
            require(0 <= ex <= number(s["positionErrors"][ax]) and 0 <= ev <= number(s["velocityErrors"][ax]), "inherited release radius invalid")
            axes.append({"axis": ax, "nominalPosition": rational(p), "nominalDerivative": rational(v),
                         "analyticPositionEnclosure": [rational(p-ex), rational(p+ex)],
                         "analyticVelocityEnclosure": [rational(v-ev), rational(v+ev)]})
        result.append({"index": mi, "worldlineId": member["worldlineId"], "time": "0", "axes": axes})
    return result


class BoundFile:
    def __init__(self, filename, expected):
        self.path = Path(filename).absolute(); self.expected = expected; self.fd = None

    def __enter__(self):
        require(type(self.expected) is str and re.fullmatch(r"[0-9a-f]{64}", self.expected), "external byte hash required")
        self.fd = os.open(self.path, os.O_RDONLY | os.O_NONBLOCK | getattr(os, "O_NOFOLLOW", 0))
        try:
            self.before = os.fstat(self.fd)
            require(stat.S_ISREG(self.before.st_mode) and self.before.st_size <= MAX_FILE_BYTES, "bounded regular input required")
            self.data = self.read()
            require(sha(self.data) == self.expected, "original byte hash differs: " + str(self.path))
            return self
        except BaseException:
            os.close(self.fd); self.fd = None; raise

    def read(self):
        os.lseek(self.fd, 0, os.SEEK_SET); chunks = []; size = 0
        while True:
            chunk = os.read(self.fd, min(1024*1024, MAX_FILE_BYTES+1-size))
            if not chunk: break
            chunks.append(chunk); size += len(chunk)
            require(size <= MAX_FILE_BYTES, "input grew beyond bound")
        info = os.fstat(self.fd)
        require(self.identity(info) == self.identity(self.before) and size == info.st_size, "input changed while captured")
        return b"".join(chunks)

    @staticmethod
    def identity(s): return (s.st_dev, s.st_ino, s.st_size, s.st_mtime_ns, s.st_ctime_ns)

    def recheck(self):
        require(self.read() == self.data, "captured input changed")
        require(self.identity(os.stat(self.path, follow_symlinks=False)) == self.identity(self.before), "input path replaced")

    def binding(self): return {"path": str(self.path), "sha256": self.expected, "bytes": len(self.data)}

    def __exit__(self, *_):
        if self.fd is not None: os.close(self.fd)


def publish(output, report, deadline):
    """Create-exclusive public copy; only matching fresh CLI completion/exit grants admission."""
    require(time.monotonic() < deadline, "publication deadline")
    data = canonical(report) + b"\n"; temporary = None
    try:
        with tempfile.NamedTemporaryFile(dir=output.parent, prefix=".f5-restriction-", delete=False) as f:
            temporary = Path(f.name); f.write(data); f.flush(); os.fsync(f.fileno())
        require(time.monotonic() < deadline, "publication deadline")
        os.link(temporary, output)
        require(output.read_bytes() == data and time.monotonic() < deadline, "post-publication admission failed")
        return {"path": str(output), "sha256": sha(data), "bytes": len(data)}
    finally:
        if temporary is not None: temporary.unlink(missing_ok=True)


def main(argv=None):
    from contextlib import ExitStack
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--prefix", required=True); parser.add_argument("--prefix-sha256", required=True)
    parser.add_argument("--verifier-sha256", required=True); parser.add_argument("--out", required=True)
    args = parser.parse_args(argv); began = time.monotonic(); deadline = began + LIMIT
    root = Path(__file__).resolve().parents[2]; output = Path(args.out).absolute()
    inputs = [(root/FULL_PATH, FULL_SHA), (root/NOMINAL_PATH, NOMINAL_SHA), (root/API_PATH, API_SHA),
              (Path(args.prefix), args.prefix_sha256), (root/SELF, args.verifier_sha256)]
    require(output.parent.is_dir() and not output.exists() and not output.is_symlink(), "fresh output in existing directory required")
    require(output.resolve() not in {p.resolve() for p, _ in inputs}, "output aliases input")
    def heartbeat(*_):
        elapsed = time.monotonic()-began
        print(json.dumps({"stage": "prehistory-restriction-verification", "elapsedSeconds": elapsed, "h3EvidenceEligible": False}), file=sys.stderr, flush=True)
        if elapsed >= LIMIT: raise TimeoutError("verification deadline")
    previous = signal.signal(signal.SIGALRM, heartbeat); signal.setitimer(signal.ITIMER_REAL, HEARTBEAT, HEARTBEAT)
    try:
        with ExitStack() as stack:
            bound = [stack.enter_context(BoundFile(p, h)) for p,h in inputs]
            require(compile(bound[-1].data, _EXECUTING_CODE.co_filename, "exec", dont_inherit=True, optimize=sys.flags.optimize) == _EXECUTING_CODE, "executing verifier differs from captured source")
            full = decode(bound[0].data)
            # Proof packets contain finite numeric elapsed values: they are immutable hash-pinned evidence.
            nominal, api = (json.loads(b.data) for b in bound[1:3])
            prefix = decode(bound[3].data)
            analysis = compare_structure(prefix, full); validate_receipts(full, nominal, api)
            release = release_values(prefix, nominal)
            for b in bound: b.recheck()
            report = {"schema": REPORT_SCHEMA, "accepted": True, "authority": "fixed-original-proof-bound domain restriction only",
                      "claims": {"nominalContainmentInherited": True, "apiDomainContainmentInherited": True,
                                 "futureSupplied": False, "currentHistoryFingerprintEstablished": False,
                                 "consumerParserOrBuildCertified": False, "initialRequestAuthorized": False,
                                 "eomExecuted": False, "rootsEvaluated": False, "h3EvidenceEligible": False,
                                 "couplingChosen": False, "evolutionAuthorized": False},
                      "prefix": bound[3].binding(), "originalFullManifest": bound[0].binding(),
                      "nominalConformance": bound[1].binding(), "apiConformance": bound[2].binding(), "verifier": bound[4].binding(),
                      "analysis": analysis, "release": release,
                      "inheritedConstantInterpretations": api["constantInterpretations"],
                      "premises": ["previous independent acceptance of the pinned nominal and API proofs",
                                   "unchanged polynomial/error-token meanings under the same frozen History/Interval API semantics",
                                   "finite IEEE binary64 round-to-nearest, gradual underflow, as in the accepted API proof"],
                      "apiOverhangAtZero": rational(Fraction.from_float(math.nextafter(0.0, math.inf))),
                      "boundary": "Positive-subnormal API overhang is evaluation enclosure only, not prehistory at T>0. Release values are exact source-decimal cubic data and inherited analytic enclosures, not converted EOM initial data.",
                      "publication": {"intendedOutput": str(output), "admission": "matching fresh CLI completion SHA, elapsed <=1800 seconds and exit code zero required"},
                      "elapsedSecondsBeforePublication": time.monotonic()-began}
            publication = publish(output, report, deadline)
            for b in bound: b.recheck()
    finally:
        signal.setitimer(signal.ITIMER_REAL, 0); signal.signal(signal.SIGALRM, previous)
    # Admission follows all bound-input cleanup and watchdog teardown. The
    # watchdog stays live while ExitStack closes the captured input handles.
    require(time.monotonic() < deadline, "final verification deadline")
    print(json.dumps({"completed": True, "accepted": True, "output": publication,
                      "elapsedSeconds": time.monotonic()-began, "h3EvidenceEligible": False}), flush=True)


if __name__ == "__main__":
    try: main()
    except Exception as exc:
        print(json.dumps({"completed": False, "accepted": False, "failure": str(exc)}), file=sys.stderr, flush=True)
        raise SystemExit(1)
