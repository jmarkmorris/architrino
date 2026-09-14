#!/usr/bin/env python3
"""Export the byte-frozen Stage B F6c data; never evaluate a trajectory or law.

All source JSON number lexemes become strings, without binary64 conversion.
The accepted-frame Hermite data and retained cubic histories remain separate.
This instrument imports only the standard library. Its structural checks are
not root, acceleration, continuous-reception, or trajectory certification.
"""

from __future__ import annotations

if 'OPTION_B_PRODUCTION_IDENTITIES' not in globals():
    import hashlib as _b_hashlib, json as _b_json, os as _b_os, stat as _b_stat, sys as _b_sys, types as _b_types
    from pathlib import Path as _b_Path
    _b_root = _b_Path(__file__).resolve().parents[2]
    _b_held = {}
    def _b_identity(path):
        value = path.lstat()
        return (value.st_dev, value.st_ino, value.st_size, value.st_mtime_ns, value.st_ctime_ns)
    def _b_capture(relative, expected=None):
        if (type(relative) is not str or not relative or '\\' in relative
                or _b_Path(relative).is_absolute() or any(p in ('', '.', '..') for p in relative.split('/'))):
            raise ValueError('Unsafe selected Python bootstrap path')
        path = _b_root / relative
        if path.resolve() != path or not _b_stat.S_ISREG(path.lstat().st_mode):
            raise ValueError('Canonical regular Python bootstrap source required')
        before = _b_identity(path)
        if relative in _b_held and _b_held[relative] != before:
            raise ValueError('Selected Python bootstrap source replaced')
        fd = _b_os.open(path, _b_os.O_RDONLY | _b_os.O_NONBLOCK | _b_os.O_NOFOLLOW)
        try:
            value = _b_os.fstat(fd)
            if not _b_stat.S_ISREG(value.st_mode) or not 0 < value.st_size <= 16 * 1024**2:
                raise ValueError('Bounded Python bootstrap source required')
            parts = []; size = 0
            while size < value.st_size:
                part = _b_os.read(fd, min(65536, value.st_size-size))
                if not part: raise ValueError('Truncated Python bootstrap source')
                parts.append(part); size += len(part)
            raw = b''.join(parts); value = _b_os.fstat(fd)
            if before != (value.st_dev,value.st_ino,value.st_size,value.st_mtime_ns,value.st_ctime_ns) or before != _b_identity(path):
                raise ValueError('Selected Python bootstrap source changed during capture')
        finally:
            _b_os.close(fd)
        if expected is not None and _b_hashlib.sha256(raw).hexdigest() != expected:
            raise ValueError('Selected Python bootstrap digest differs')
        _b_held[relative] = before
        return raw
    def _b_unique(pairs):
        result = {}
        for key,value in pairs:
            if key in result: raise ValueError('Duplicate selected Python bootstrap key')
            result[key] = value
        return result
    def _b_decode(raw): return _b_json.loads(raw, object_pairs_hook=_b_unique)
    def _b_recheck():
        for relative,identity in _b_held.items():
            if _b_identity(_b_root/relative) != identity:
                raise ValueError('Retained Python bootstrap source replaced')
    _b_selection = _b_decode(_b_capture('reference/priorities/development-process-review/contracts/option-b-production-selection.json'))
    _b_accepted = _b_decode(_b_capture(_b_selection['acceptedBaseline'], _b_selection['acceptedBaselineSha256']))
    _b_profiles = [p for p in _b_accepted['profiles'] if p['name'] == 'production-source-records']
    if len(_b_profiles) != 1: raise ValueError('One selected production bootstrap profile required')
    _b_map = _b_decode(_b_profiles[0]['manifestRaw'])
    _b_path = 'scripts/eom/production_source_records.py'
    _b_rows = [r for r in _b_map['@graph'] if r.get('@type') == 'Source' and r.get('binding',{}).get('path') == _b_path]
    if (len(_b_rows) != 1 or _b_rows[0]['role'] != 'scientific-contract'
            or _b_rows[0]['binding']['selector'] != {'kind':'whole'}
            or _b_rows[0]['binding']['contract'] != 'fixed-byte-selection/v1'):
        raise ValueError('Exact selected Python production bridge required')
    _b_raw = _b_capture(_b_path, _b_rows[0]['binding']['sha256'])
    _b_bridge = _b_types.ModuleType('_admitted_f6c_bridge_' + str(id(_b_held)))
    _b_bridge.__file__ = str(_b_root/_b_path)
    _b_sys.modules[_b_bridge.__name__] = _b_bridge
    _b_recheck()
    exec(compile(_b_raw,_b_bridge.__file__,'exec',dont_inherit=True),_b_bridge.__dict__)
    _b_recheck()
    def _b_call(name, *args, **kwargs):
        _b_recheck()
        result = getattr(_b_bridge,name)(*args,**kwargs)
        _b_recheck()
        return result
    production_identities = lambda *args,**kwargs: _b_call('production_identities',*args,**kwargs)
    production_source_pair = lambda *args,**kwargs: _b_call('production_source_pair',*args,**kwargs)
    production_recheck = lambda: _b_call('production_recheck')
    production_historical_record = lambda *args,**kwargs: _b_call('production_historical_record',*args,**kwargs)
    production_runtime_binding = lambda: _b_call('production_runtime_binding')
    production_original_source_binding = lambda *args, **kwargs: _b_call('production_original_source_binding', *args, **kwargs)
    OPTION_B_PRODUCTION_IDENTITIES = production_identities(__file__)

if ('OPTION_B_PRODUCTION_IDENTITIES' not in globals()
        or type(OPTION_B_PRODUCTION_IDENTITIES) is not tuple
        or len(OPTION_B_PRODUCTION_IDENTITIES) != 13):
    raise RuntimeError('Admitted production host must supply the original identity tuple')

import argparse
from decimal import Decimal, InvalidOperation
from hashlib import sha256
import json
import os
from pathlib import Path
import re
import sys


RUN_ID = "f6c-balanced-tetrahedral-p0.678-n1.25-th3.36-br0.787-cp1.76-hp0.0771-hm-0.147-rp0.0463-rm-0.134-tp0.116-tm-0.254-hhp4.82-hhm2.21-hrp6-hrm3.44-v1"
MODEL = "fnv1a64:6b87d1f138d33e13"
GENERATING_SPEC = "F6c-nonlinear-return-map-search-v2-return-continuation"
LABELS = ("0+", "0-", "1+", "1-", "2+", "2-", "3+", "3-")
CHARGE = "0.1666666666666666666666666666666667"
ORIGINAL = ".tmp/f6c-dual-turn-stage-b-row12-refined-v2"
DURABLE = "reference/priorities/braid-program/evidence"
SOURCES = {
    "record": (f"{ORIGINAL}/row-000/assembly-view-record.json", OPTION_B_PRODUCTION_IDENTITIES[0]),
    "frames": (f"{ORIGINAL}/row-000/frames.jsonl", OPTION_B_PRODUCTION_IDENTITIES[1]),
    "checkpoint": (f"{ORIGINAL}/row-000/checkpoint.bin", OPTION_B_PRODUCTION_IDENTITIES[2]),
    "originalManifest": (f"{ORIGINAL}/row-000/run-manifest.json", OPTION_B_PRODUCTION_IDENTITIES[3]),
    "originalSummary": (f"{ORIGINAL}/search-summary.json", OPTION_B_PRODUCTION_IDENTITIES[4]),
    "manifest": (f"{DURABLE}/2026-08-27-f6c-refined-stage-b-manifest.json", OPTION_B_PRODUCTION_IDENTITIES[5]),
    "summary": (f"{DURABLE}/2026-08-27-f6c-refined-stage-b-summary.json", OPTION_B_PRODUCTION_IDENTITIES[6]),
}
INSTRUMENTS = {
    "scripts/eom/attractor-ensemble-harness.cpp": OPTION_B_PRODUCTION_IDENTITIES[7],
    "scripts/mapping-electromagnetism/f6c-nonlinear-return-map-search.mjs": OPTION_B_PRODUCTION_IDENTITIES[8],
    "scripts/eom/oracle/certified_acceleration.py": OPTION_B_PRODUCTION_IDENTITIES[9],
    "scripts/eom/oracle/reference_kernel.py": OPTION_B_PRODUCTION_IDENTITIES[10],
    "scripts/eom/oracle/certified_history.py": OPTION_B_PRODUCTION_IDENTITIES[11],
    "scripts/eom/oracle/decimal_interval.py": OPTION_B_PRODUCTION_IDENTITIES[12],
}
DECIMAL_TOKEN = re.compile(r"-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\Z")


class ExportError(ValueError):
    pass


class JsonNumber(str):
    """An original JSON numeric lexeme, distinguished from a JSON string."""


def _require(condition: bool, message: str) -> None:
    if not condition:
        raise ExportError(message)


def _unique_object(pairs):
    result = {}
    for key, value in pairs:
        _require(key not in result, f"duplicate JSON key: {key}")
        result[key] = value
    return result


def _reject_constant(value):
    raise ExportError(f"nonfinite JSON constant: {value}")


def parse_json(data: bytes):
    """Preserve original decimals, including exponent spelling and trailing zeros."""
    try:
        return json.loads(data.decode("utf-8"), parse_int=JsonNumber,
                          parse_float=JsonNumber, parse_constant=_reject_constant,
                          object_pairs_hook=_unique_object)
    except (UnicodeError, json.JSONDecodeError) as error:
        raise ExportError(f"invalid UTF-8 JSON: {error}") from error


def decimal_token(value, *, numeric: bool = False) -> Decimal:
    expected = JsonNumber if numeric else str
    _require(type(value) is expected, "wrong decimal token kind")
    _require(DECIMAL_TOKEN.fullmatch(value) is not None, "invalid decimal token")
    try:
        parsed = Decimal(value)
    except InvalidOperation as error:
        raise ExportError("invalid decimal token") from error
    _require(parsed.is_finite(), "nonfinite decimal token")
    return parsed


def integer_token(value) -> int:
    _require(type(value) is JsonNumber and re.fullmatch(r"0|[1-9][0-9]*", value),
             "expected nonnegative JSON integer")
    return int(value)


def _keys(value, expected, label):
    _require(type(value) is dict and set(value) == set(expected),
             f"{label} fields differ from the frozen schema")


def validate_segments(segments):
    """Structural/token validation only; does not evaluate a polynomial."""
    _require(type(segments) is list and len(segments) > 0, "missing segments")
    previous_end = None
    for segment in segments:
        _keys(segment, ("startTime", "endTime", "coefficients", "positionErrors",
                        "velocityErrors", "positionError", "velocityError"), "segment")
        start = decimal_token(segment["startTime"])
        end = decimal_token(segment["endTime"])
        _require(start < end, "segment must have positive duration")
        _require(previous_end is None or previous_end == start, "segment gap or overlap")
        previous_end = end
        rows = segment["coefficients"]
        _require(type(rows) is list and len(rows) == 3, "coefficient axis census")
        for row in rows:
            _require(type(row) is list and len(row) == 4, "coefficient degree census")
            for coefficient in row:
                decimal_token(coefficient)
        for kind in ("position", "velocity"):
            radii = segment[f"{kind}Errors"]
            _require(type(radii) is list and len(radii) == 3, "error axis census")
            values = [decimal_token(token) for token in radii]
            scalar = decimal_token(segment[f"{kind}Error"])
            _require(all(value >= 0 for value in values) and scalar >= max(values),
                     "negative or underbounding error radius")
    return segments


def validate_frames(data: bytes, *, path_keys: tuple[int, ...], frame_count: int):
    lines = data.splitlines()
    _require(len(lines) == len(path_keys) * frame_count, "frame row census")
    frames = []
    previous_time = None
    for frame_index in range(frame_count):
        members = []
        frame_time = None
        time_value = None
        for offset, path_key in enumerate(path_keys):
            row = parse_json(lines[frame_index * len(path_keys) + offset])
            _keys(row, ("pathKey", "frameIndex", "time", "position", "velocity",
                        "errorBound", "stateFlags"), "frame row")
            _require(integer_token(row["pathKey"]) == path_key, "frame member order")
            _require(integer_token(row["frameIndex"]) == frame_index, "frame index")
            value = decimal_token(row["time"], numeric=True)
            if frame_time is None:
                frame_time, time_value = str(row["time"]), value
            _require(str(row["time"]) == frame_time, "mixed frame time tokens")
            for kind in ("position", "velocity"):
                _keys(row[kind], ("x", "y", "z"), f"frame {kind}")
                for axis in ("x", "y", "z"):
                    decimal_token(row[kind][axis], numeric=True)
            _require(decimal_token(row["errorBound"], numeric=True) >= 0, "negative frame error")
            _require(integer_token(row["stateFlags"]) == (1 if path_key % 2 else 2),
                     "frame polarity differs")
            members.append({"pathKey": path_key, "position": row["position"],
                            "velocity": row["velocity"], "positionErrorBound": row["errorBound"],
                            "stateFlags": integer_token(row["stateFlags"])})
        _require(previous_time is None or previous_time < time_value, "nonincreasing frames")
        previous_time = time_value
        frames.append({"frameIndex": frame_index, "time": frame_time, "members": members})
    return frames


def read_bound(path: Path, expected_hash: str):
    original = path.read_bytes()
    digest = sha256(original).hexdigest()
    _require(digest == expected_hash, f"source hash mismatch: {path}")
    return original, {"path": str(path), "realPath": str(path.resolve()),
                      "sha256": digest, "bytes": len(original)}


def _subject_payload(record, manifest, summary, frames):
    _require(record["schema"] == "assembly-view-record.v0", "record schema")
    _require(manifest["schema"] == "eom_attractor_ensemble_run_manifest/v1", "manifest schema")
    _require(summary["schema"] == "f6c-nonlinear-return-map-search/v2", "summary schema")
    _require(len(summary["rows"]) == 1, "Stage B row census")
    row = summary["rows"][0]
    _require(integer_token(row["index"]) == 0 and row["status"] == "analyzed", "Stage B row")
    result = row["result"]
    for identity in (record["provenance"], manifest, result["manifest"]):
        _require(identity["runId"] == RUN_ID and identity["modelFingerprint"] == MODEL,
                 "run or model identity mismatch")
        _require(identity["generatingSpec"] == GENERATING_SPEC, "generating specification mismatch")
    _require(record["provenance"]["runStatus"] == manifest["status"] == "completed", "incomplete subject")
    _require(manifest["coupling"] == "10.304229970992187", "coupling differs")
    _require(integer_token(manifest["acceptedSteps"]) == 80
             and integer_token(manifest["rejectedSteps"]) == 0
             and integer_token(manifest["sampleEvery"]) == 1
             and integer_token(manifest["framesEmitted"]) == 648, "accepted-frame accounting")
    _require(record["window"]["end"] == manifest["acceptedEndTime"] == "0.13", "end time")
    _require(frames[0]["time"] == "0" and frames[-1]["time"] == "0.13", "frame window")
    _require(len(result["parameters"]) == 15, "parameter census")
    _require(len(record["worldlines"]) == len(LABELS) == len(manifest["seeds"]), "member census")
    worldlines = []
    for index, (worldline, label, seed) in enumerate(zip(record["worldlines"], LABELS, manifest["seeds"])):
        key = index + 1
        charge = CHARGE if key % 2 else f"-{CHARGE}"
        _require(worldline["id"] == seed["pathId"] == label
                 and integer_token(worldline["pathKey"]) == key, "member identity or order")
        _require(worldline["charge"] == seed["charge"] == charge, "charge literal differs")
        _require(decimal_token(worldline["polarity"], numeric=True) == (1 if key % 2 else -1)
                 and integer_token(worldline["stateFlags"]) == (1 if key % 2 else 2), "member polarity")
        _require(integer_token(worldline["declaredPrehistorySegmentCount"]) == 1600
                 and integer_token(worldline["evolvedSegmentCount"]) == 160, "segment census")
        segments = validate_segments(worldline["segments"])
        _require(len(segments) == 1760, "complete history census")
        _require(worldline["coverageStart"] == segments[0]["startTime"] == "-8"
                 and worldline["coverageEnd"] == segments[-1]["endTime"] == "0.13"
                 and segments[1599]["endTime"] == segments[1600]["startTime"] == "0", "history coverage")
        endpoints = {Decimal(segment["endTime"]) for segment in segments[1600:]}
        _require(all(Decimal(frame["time"]) in endpoints for frame in frames[1:]), "missing accepted endpoint")
        worldlines.append({**worldline, "pathKey": key,
                           "polarity": 1 if key % 2 else -1,
                           "stateFlags": 1 if key % 2 else 2,
                           "declaredPrehistorySegmentCount": 1600, "evolvedSegmentCount": 160})
    return {
        "runId": RUN_ID, "modelFingerprint": MODEL, "generatingSpec": GENERATING_SPEC,
        "fieldSpeed": "1", "coupling": manifest["coupling"],
        "interval": {"start": "0", "end": "0.13"},
        "sourceInputCoordinates": manifest["f6cCoordinate"],
        "sourceInputSeeds": manifest["seeds"],
        "sourceSummaryParameters": result["parameters"],
        "sourceSummaryReleaseCoordinates": result["completeStateRecords"]["release"],
        "recordedControls": {key: manifest[key] for key in (
            "historyDepth", "historySegmentStep", "step", "rootTolerance", "rootMaxDepth",
            "transmitterFactorFloor", "sampleEvery", "acceptedSteps", "rejectedSteps")},
        "retainedHistories": worldlines,
        "acceptedFrames": frames,
        "acceptedFrameIntervals": [{"leftFrameIndex": i, "rightFrameIndex": i + 1,
                                     "startTime": frames[i]["time"], "endTime": frames[i + 1]["time"]}
                                    for i in range(80)],
        "orderedPairs": [{"receiver": receiver, "transmitter": transmitter, "self": receiver == transmitter}
                         for receiver in LABELS for transmitter in LABELS],
        "counts": {"members": 8, "segments": 14080, "declaredSegmentsPerMember": 1600,
                   "evolvedSegmentsPerMember": 160, "acceptedFrames": 81,
                   "acceptedFrameIntervals": 80, "orderedPairs": 64},
    }


def _write_exclusive(path: Path, data: bytes, protected_paths):
    _require(path.resolve() not in {item.resolve() for item in protected_paths}, "output is a protected input")
    with path.open("xb") as output:
        output.write(data)
        output.flush()
        os.fsync(output.fileno())


def export_history(repo_root: Path, output: Path):
    root = repo_root.resolve(strict=True)
    instrument = Path(__file__).resolve(strict=True)
    instrument_bytes = instrument.read_bytes()
    captured, bindings = {}, {}
    for role, (relative, expected) in SOURCES.items():
        captured[role], bindings[role] = read_bound(root / relative, expected)
    references = {}
    for relative, expected in INSTRUMENTS.items():
        _, references[relative] = read_bound(root / relative, expected)
    _require(captured["manifest"] == captured["originalManifest"], "manifest copy differs")
    _require(captured["summary"] == captured["originalSummary"] + b"\n", "summary copy convention differs")
    frames = validate_frames(captured["frames"], path_keys=tuple(range(1, 9)), frame_count=81)
    payload = _subject_payload(parse_json(captured["record"]), parse_json(captured["manifest"]),
                               parse_json(captured["summary"]), frames)
    packet = {
        "schema": "braid-program/f6c-retained-history-export.v1",
        "status": "exported-data-only", "authority": "original-byte-bound structural data export only",
        "numericTokenPolicy": "source JSON numeric lexemes become strings; segment strings are unchanged",
        "claims": {"trajectoryCertified": False, "rootsEvaluated": False,
                   "accelerationsEvaluated": False, "metricsComputed": False, "eomExecuted": False,
                   "continuousReceptionBoundsSupplied": False, "measurementAuthorized": False,
                   "checkpointPayloadDecoded": False, "checkpointTokenParityVerified": False},
        "interpretation": {
            "requiredAccelerationInput": "independent Hermite construction across acceptedFrameIntervals; not computed here",
            "masterEquationInput": "retainedHistories with original cubic and enclosure tokens; not evaluated here",
            "frameErrors": "positionErrorBound is the original sampled field; no velocity error is invented",
            "historyErrors": "retain per-axis and scalar tokens; scalar radii verified to enclose every coordinate radius",
            "sourceCoordinates": "manifest input literals and summary release literals have distinct roles; neither replaces the other",
        },
        "sources": bindings, "frozenInstrumentBindings": references,
        "exporter": {"path": str(instrument), "sha256": sha256(instrument_bytes).hexdigest()},
        **payload,
    }
    data = (json.dumps(packet, ensure_ascii=False, separators=(",", ":"), allow_nan=False) + "\n").encode()
    # Re-read all bound bytes after validation, before the exclusive publication.
    for role, (relative, expected) in SOURCES.items():
        reread, _ = read_bound(root / relative, expected)
        _require(reread == captured[role], "input bytes changed during export")
    for relative, expected in INSTRUMENTS.items():
        read_bound(root / relative, expected)
    _require(instrument.read_bytes() == instrument_bytes, "exporter changed during export")
    protected = [root / relative for relative, _ in SOURCES.values()]
    protected.extend(root / relative for relative in INSTRUMENTS)
    _write_exclusive(output, data, [*protected, instrument])
    return {"schema": packet["schema"], "status": packet["status"], "out": str(output),
            "sha256": sha256(data).hexdigest(), "bytes": len(data), "counts": packet["counts"],
            "claims": packet["claims"]}


def main(argv=None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--repo-root", type=Path, required=True)
    parser.add_argument("--out", type=Path, required=True)
    args = parser.parse_args(argv)
    try:
        print(json.dumps(export_history(args.repo_root, args.out), sort_keys=True))
        return 0
    except (ValueError, OSError, KeyError, TypeError) as error:
        print(f"F6c data export rejected: {error}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
