"""Capture selected, graph-admitted original test identities before controls run."""
import json
import hashlib
import os
from pathlib import Path
import re
import stat
import subprocess

_SELECTION_PATH = "reference/priorities/development-process-review/contracts/option-b-production-selection.json"
_SELECTION = None
_PAIR_IDENTITIES = None
_BOOTSTRAP = None
_NODE_RUNTIME = None
_REQUEST_CACHE = {}
_REQUEST_CACHE_BYTES = 0
_OPTIONAL_ORIGINAL_KEYS = {}
_CACHE_MAX_BYTES = 64 * 1024 * 1024
_CACHE_MAX_REQUESTS = 4096


def _file_identity(root, relative):
    """Observe canonical regular files without interpreting their bytes as authority."""
    if (not isinstance(relative, str) or not relative or "\\" in relative
            or Path(relative).is_absolute()
            or any(part in {"", ".", ".."} for part in relative.split("/"))):
        raise ValueError("Unsafe production source path")
    current = root
    for part in relative.split("/"):
        current = current / part
        observed = current.lstat()
        if stat.S_ISLNK(observed.st_mode):
            raise ValueError("Symlink in production source path: " + relative)
    if not stat.S_ISREG(observed.st_mode) or current.resolve() != current:
        raise ValueError("Noncanonical regular production source required: " + relative)
    return (observed.st_dev, observed.st_ino, observed.st_size,
            observed.st_mtime_ns, observed.st_ctime_ns)


def _check_identities(root, identities):
    for relative, initial in identities.items():
        if _file_identity(root, relative) != initial:
            raise ValueError("Retained production source identity changed: " + relative)


def _inventory_identities(root, selection):
    """Inventory only; the Node admission still authenticates every selected value."""
    identities = {}

    def capture(relative, parse=False):
        identity = _file_identity(root, relative)
        if relative in identities and identities[relative] != identity:
            raise ValueError("Production source changed during inventory: " + relative)
        identities[relative] = identity
        if parse:
            return json.loads((root / relative).read_text(encoding="utf-8"),
                              object_pairs_hook=_unique_object)

    capture(_SELECTION_PATH)
    accepted = capture(selection["acceptedBaseline"], parse=True)
    capture(selection["transition"])
    capture(accepted["historicalProof"]["path"])
    for profile in accepted["profiles"]:
        manifest = capture(profile["manifestPath"], parse=True)
        for source in manifest["@graph"]:
            if source.get("@type") == "Source":
                capture(source["binding"]["path"])
    _check_identities(root, identities)
    return identities


def _unique_object(pairs):
    result = {}
    for key, value in pairs:
        if key in result:
            raise ValueError("Duplicate production record key: " + key)
        result[key] = value
    return result


_BOOTSTRAP_PATHS = {
    "scripts/equation-mapping/production-source-records.mjs": "admission",
    "scripts/equation-mapping/current-source-manifest.mjs": "manifest-reader",
    "scripts/equation-mapping/current-source-transition.mjs": "manifest-reader",
}


def _captured_bytes(root, relative, expected=None):
    """Capture an original regular-file identity and optionally authenticate bytes."""
    before = _file_identity(root, relative)
    fd = os.open(root / relative, os.O_RDONLY | os.O_NOFOLLOW | os.O_NONBLOCK)
    try:
        with os.fdopen(fd, "rb", closefd=False) as stream:
            raw = stream.read()
        observed = os.fstat(fd)
        current = (observed.st_dev, observed.st_ino, observed.st_size,
                   observed.st_mtime_ns, observed.st_ctime_ns)
        if current != before or _file_identity(root, relative) != before:
            raise ValueError("Production bootstrap identity changed during capture: " + relative)
    finally:
        os.close(fd)
    if expected is not None:
        if not isinstance(expected, str) or re.fullmatch(r"[a-f0-9]{64}", expected) is None:
            raise ValueError("External bootstrap digest required")
        if hashlib.sha256(raw).hexdigest() != expected:
            raise ValueError("Production bootstrap digest differs: " + relative)
    return raw, before


def _bootstrap_capture(root, selection):
    """Authenticate only bootstrap code; the existing Node engine owns B semantics."""
    identities = {}
    raw, identities[_SELECTION_PATH] = _captured_bytes(root, _SELECTION_PATH)
    if json.loads(raw, object_pairs_hook=_unique_object) != selection:
        raise ValueError("Production selection changed before bootstrap")
    accepted_raw, identities[selection["acceptedBaseline"]] = _captured_bytes(
        root, selection["acceptedBaseline"], selection["acceptedBaselineSha256"])
    accepted = json.loads(accepted_raw, object_pairs_hook=_unique_object)
    profiles = [p for p in accepted["profiles"] if p["name"] == "production-source-records"]
    if len(profiles) != 1:
        raise ValueError("One accepted production bootstrap profile required")
    retained = json.loads(profiles[0]["manifestRaw"], object_pairs_hook=_unique_object)
    modules = {}
    for relative, role in _BOOTSTRAP_PATHS.items():
        rows = [r for r in retained["@graph"] if r.get("@type") == "Source"
                and r.get("binding", {}).get("path") == relative]
        if (len(rows) != 1 or rows[0]["role"] != role
                or rows[0]["binding"]["selector"] != {"kind": "whole"}
                or rows[0]["binding"]["contract"] != "fixed-byte-selection/v1"):
            raise ValueError("Exact protected bootstrap code row required: " + relative)
        raw, identities[relative] = _captured_bytes(root, relative, rows[0]["binding"]["sha256"])
        modules[str(root / relative)] = raw.decode("utf-8", errors="strict")
    _check_identities(root, identities)
    return modules, identities


def _node_runtime():
    """Use the installed runtime, never a PATH-shadowed command or refreshed identity."""
    global _NODE_RUNTIME
    if _NODE_RUNTIME is None:
        executable = next((p for p in (Path("/opt/homebrew/bin/node"), Path("/usr/local/bin/node"))
                           if p.is_file()), None)
        if executable is None:
            raise ValueError("Installed Node runtime unavailable for production admission")
        executable = executable.resolve(strict=True)
        raw, identity = _captured_bytes(executable.parent, executable.name)
        _NODE_RUNTIME = (executable, identity, hashlib.sha256(raw).hexdigest())
    executable, identity, digest = _NODE_RUNTIME
    current = _file_identity(executable.parent, executable.name)
    if current != identity:
        raise ValueError("Production Node runtime identity changed")
    return executable


def production_runtime_binding():
    """Actual bootstrap runtime binding for the host's existing runtime inventory check."""
    executable = _node_runtime()
    return {"path": str(executable), "sha256": _NODE_RUNTIME[2], "bytes": _NODE_RUNTIME[1][2]}


_CAPTURED_NODE_RUNNER = r"""
import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
import assert from 'node:assert/strict';
import {registerHooks,isBuiltin} from 'node:module';
const envelope=JSON.parse(fs.readFileSync(0,'utf8'));
assert.equal(fs.realpathSync(process.execPath),envelope.nodePath,'Installed Node runtime differs');
const sources=new Map(Object.entries(envelope.modules).map(([filename,source])=>[pathToFileURL(filename).href,source]));
const entry=pathToFileURL(envelope.entry).href;
const hooks=registerHooks({
 resolve(specifier,context,next){
  if(isBuiltin(specifier))return next(specifier,context);
  const url=new URL(specifier,context.parentURL).href;
  assert.ok(sources.has(url),'Uncaptured production bootstrap import: '+url);
  return {url,shortCircuit:true};
 },
 load(url,context,next){
  if(isBuiltin(url))return next(url,context);
  assert.ok(sources.has(url),'Uncaptured production bootstrap module: '+url);
  return {format:'module',source:sources.get(url),shortCircuit:true};
 }
});
try{
 const module=await import(entry);
 const {decode,sha256}=await import(new URL('./current-source-manifest.mjs',entry).href);
 const request=envelope.request;
 assert.ok(['identities','sourcePair','originalSourceBinding','originalSourceBindingIfPresent','historicalRecord','capturedSources','check'].includes(request.operation),'Unknown production operation');
 const admission=module.beginProductionAdmission(request);
 const result=request.operation==='check'?true:['sourcePair','originalSourceBinding','originalSourceBindingIfPresent'].includes(request.operation)
  ?admission[request.operation](request.target,request.expectedOriginalSha??undefined)
  :admission[request.operation](request.target??undefined);
 let originalKeys=null;
 if(request.operation==='originalSourceBindingIfPresent'){
  // The successful operation established this consumer's index dependency and role.
  // Authenticate the census against the very same retained source, then recheck it.
  const row=admission.capturedSources().find(row=>row.path===request.root+'/'+module.PRODUCTION_ORIGINALS);
  assert.ok(row,'Admitted original index capture required');
  const raw=fs.readFileSync(row.path);
  assert.equal(sha256(raw),row.sha256,'Original index census differs');
  const index=decode(raw);
  originalKeys=Object.keys(index.sources);
 }
 admission.check();process.stdout.write(JSON.stringify({result,originalKeys}));
}finally{hooks.deregister();}
"""


def _request(consumer_file, **fields):
    global _SELECTION, _PAIR_IDENTITIES, _BOOTSTRAP, _REQUEST_CACHE_BYTES
    root = Path(__file__).resolve().parents[2]
    consumer = Path(consumer_file).resolve().relative_to(root).as_posix()
    if _SELECTION is None:
        _SELECTION = json.loads((root / _SELECTION_PATH).read_text(encoding="utf-8"),
                               object_pairs_hook=_unique_object)
        if not isinstance(_SELECTION, dict) or set(_SELECTION) != {
                "acceptedBaseline", "acceptedBaselineSha256", "transition", "transitionSha256"}:
            raise ValueError("Closed production selection required")
    if _BOOTSTRAP is None:
        _BOOTSTRAP = _bootstrap_capture(root, _SELECTION)
    _check_identities(root, _BOOTSTRAP[1])
    if _PAIR_IDENTITIES is None:
        _PAIR_IDENTITIES = _inventory_identities(root, _SELECTION)
    _check_identities(root, _PAIR_IDENTITIES)
    executable = _node_runtime()
    fields.setdefault("expectedOriginalSha", None)
    # Immutable serialized results are scoped to every exact request field and consumer.
    key = json.dumps([consumer, fields], sort_keys=True, separators=(",", ":"))
    if key in _REQUEST_CACHE:
        return _REQUEST_CACHE[key]
    target = fields.get("target")
    if (set(fields) == {"operation", "target", "expectedOriginalSha"}
            and fields["operation"] == "originalSourceBindingIfPresent"
            and consumer in _OPTIONAL_ORIGINAL_KEYS):
        # Match the reader's safePath contract before applying its admitted absence census.
        if (not isinstance(target, str) or not target or "\\" in target or "\0" in target
                or target.startswith("/")
                or any(part in {"", ".", ".."} for part in target.split("/"))):
            raise ValueError("Unsafe source path")
        if target not in _OPTIONAL_ORIGINAL_KEYS[consumer]:
            return "null"
    envelope = {"modules": _BOOTSTRAP[0], "nodePath": str(executable),
                "entry": str(root / "scripts/equation-mapping/production-source-records.mjs"),
                "request": dict(root=str(root), selection=_SELECTION, consumer=consumer, **fields)}
    _check_identities(root, _BOOTSTRAP[1])
    environment = dict(os.environ)
    for variable in ("NODE_OPTIONS", "NODE_PATH"):
        environment.pop(variable, None)
    result = subprocess.run(
        [str(executable), "--input-type=module", "-e", _CAPTURED_NODE_RUNNER],
        input=json.dumps(envelope), env=environment,
        text=True, encoding="utf-8", capture_output=True, timeout=30, check=False)
    _check_identities(root, _BOOTSTRAP[1])
    _check_identities(root, _PAIR_IDENTITIES)
    _node_runtime()
    if result.returncode != 0:
        raise ValueError("Production record admission rejected: " + result.stderr)
    response = json.loads(result.stdout, object_pairs_hook=_unique_object)
    if not isinstance(response, dict) or set(response) != {"result", "originalKeys"}:
        raise ValueError("Closed production response required")
    keys = response["originalKeys"]
    if keys is not None:
        if (fields.get("operation") != "originalSourceBindingIfPresent"
                or not isinstance(keys, list) or any(not isinstance(k, str) for k in keys)
                or len(set(keys)) != len(keys)):
            raise ValueError("Malformed admitted original index census")
        _OPTIONAL_ORIGINAL_KEYS[consumer] = frozenset(keys)
    serialized = json.dumps(response["result"], separators=(",", ":"))
    size = len(serialized.encode("utf-8")) + len(key.encode("utf-8"))
    if len(_REQUEST_CACHE) < _CACHE_MAX_REQUESTS and _REQUEST_CACHE_BYTES + size <= _CACHE_MAX_BYTES:
        _REQUEST_CACHE[key] = serialized
        _REQUEST_CACHE_BYTES += size
    return serialized


def production_identities(consumer_file, target=None):
    """Supply immutable original values to an admitted host or a pure target module."""
    values = json.loads(_request(consumer_file, operation="identities", target=target),
                        object_pairs_hook=_unique_object)
    if (not isinstance(values, list) or not values
            or any(not isinstance(value, str) or re.fullmatch(r"[a-f0-9]{64}", value) is None
                   for value in values)):
        raise ValueError("Malformed production identity capture")
    return tuple(values)


def production_source_pair(root, consumer_file, target, expectedOriginalSha=None):
    """Return original and admitted current source bytes plus the target identity tuple."""
    root = Path(root).resolve()
    if root != Path(__file__).resolve().parents[2]:
        raise ValueError("Production source root differs from selected checkout")
    if expectedOriginalSha is not None and (not isinstance(expectedOriginalSha, str)
            or re.fullmatch(r"[a-f0-9]{64}", expectedOriginalSha) is None):
        raise ValueError("Expected original SHA-256 required")
    _file_identity(root, str(target))
    record = json.loads(_request(root / consumer_file, operation="sourcePair", target=str(target),
                                 expectedOriginalSha=expectedOriginalSha),
                        object_pairs_hook=_unique_object)
    if not isinstance(record, dict) or set(record) != {"original", "current", "identities"}:
        raise ValueError("Malformed original/current production source capture")
    if not isinstance(record["original"], str) or not isinstance(record["current"], str):
        raise ValueError("Source strings required")
    values = record["identities"]
    if not isinstance(values, list) or any(not isinstance(v, str) or re.fullmatch(r"[a-f0-9]{64}", v) is None for v in values):
        raise ValueError("Malformed source identity tuple")
    original = record["original"].encode("utf-8")
    if expectedOriginalSha is not None and hashlib.sha256(original).hexdigest() != expectedOriginalSha:
        raise ValueError("Returned original source generation differs")
    return original, record["current"].encode("utf-8"), tuple(values)


def production_recheck():
    """Recheck the retained generation without renewing its original file identities."""
    if _PAIR_IDENTITIES is None:
        raise ValueError("No retained production admission")
    root = Path(__file__).resolve().parents[2]
    _check_identities(root, _PAIR_IDENTITIES)
    _check_identities(root, _BOOTSTRAP[1])
    _node_runtime()


def production_historical_record(consumer_file, name):
    """Return admitted historical membership metadata; it grants no current acceptance."""
    if not isinstance(name, str) or re.fullmatch(r"[a-z0-9-]+", name) is None:
        raise ValueError("Historical record name required")
    return json.loads(_request(consumer_file, operation="historicalRecord", target=name),
                      object_pairs_hook=_unique_object)


def production_original_source_binding(root, consumer_file, target, expectedOriginalSha=None, *, optional=False):
    """Return the actual protected archive binding, never a synthetic current-file identity."""
    root = Path(root).resolve()
    if root != Path(__file__).resolve().parents[2]:
        raise ValueError("Production source root differs from selected checkout")
    record = json.loads(_request(root / consumer_file, operation="originalSourceBindingIfPresent" if optional else "originalSourceBinding", target=str(target),
                                 expectedOriginalSha=expectedOriginalSha), object_pairs_hook=_unique_object)
    if optional and record is None:
        return None
    if not isinstance(record, dict) or set(record) != {"path", "sha256", "bytes"}:
        raise ValueError("Closed original source binding required")
    filename = Path(record["path"])
    relative = filename.relative_to(root).as_posix()
    actual, identity = _captured_bytes(root, relative, record["sha256"])
    if len(actual) != record["bytes"]:
        raise ValueError("Original archive size differs")
    production_recheck()
    return record


def production_captured_sources(consumer_file):
    """Report the reader's actual retained records without widening eligibility."""
    rows = json.loads(_request(consumer_file, operation="capturedSources", target=None),
                      object_pairs_hook=_unique_object)
    if not isinstance(rows, list):
        raise ValueError("Captured production source list required")
    for row in rows:
        if not isinstance(row, dict) or set(row) != {"path", "sha256", "bytes", "identity"}:
            raise ValueError("Closed captured production source record required")
        if not isinstance(row["identity"], str) or len(row["identity"].split(":")) != 5:
            raise ValueError("Retained five-field production identity required")
    production_recheck()
    return tuple(dict(row) for row in rows)
