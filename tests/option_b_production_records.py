"""Admitted Python test hosts for representation-only production transfers.

The path set routes test loading; it supplies no digest or acceptance authority.
Every selected load obtains original/current bytes from the protected graph.
"""
import hashlib
import json
from pathlib import Path
import sys

_ROOT = Path(__file__).resolve().parents[1]
_HOSTS = str(_ROOT / "scripts/eom")
if _HOSTS not in sys.path:
    sys.path.insert(0, _HOSTS)
from production_source_records import production_source_pair, production_recheck, production_identities, production_historical_record, production_runtime_binding, production_original_source_binding, production_captured_sources, _captured_bytes

_TARGETS = frozenset(('scripts/eom/check-f5-evolution-dynamics.py', 'scripts/eom/derive-f5-independent-interpolation-enclosure.mjs', 'scripts/eom/derive-subfield-circular-history-budget.mjs', 'scripts/eom/derive-subfield-circular-root-reference.mjs', 'scripts/eom/execute-f5-prehistory-handoff.py', 'scripts/eom/execute-f6c-acceleration.py', 'scripts/eom/execute-f6c-emission-refinement.py', 'scripts/eom/export-f6c-retained-history.py', 'scripts/eom/f6c_leaf_stream_publication.py', 'scripts/eom/f6c_parent_emission_refinement.py', 'scripts/eom/f6c_variable_cell_adapter.py', 'scripts/eom/oracle/f5_api_domain_conformance.py', 'scripts/eom/oracle/f5_history_manifest_conformance.py', 'scripts/eom/oracle/f6c_correlated_residual_enclosure.py', 'scripts/eom/oracle/f6c_emission_refinement_conformance.py', 'scripts/eom/oracle/f6c_gk13_protocol.py', 'scripts/eom/oracle/f6c_parent_emission_refinement_conformance.py', 'scripts/eom/oracle/f6c_refined_acceleration_conformance.py', 'scripts/eom/prepare-f5-enclosed-root-build.mjs', 'scripts/eom/prepare-f5-enclosed-root.mjs', 'scripts/eom/prepare-f5-original-input-tree.mjs', 'scripts/eom/prepare-f5-prehistory-handoff-build.mjs', 'scripts/eom/prepare-f5-prehistory-handoff.py', 'scripts/eom/prepare-f5-prehistory-restriction.mjs', 'scripts/eom/prepare-f6c-cached-continuous-reception-root-cover.py', 'scripts/eom/prepare-f6c-continuous-reception-acceleration.py', 'scripts/eom/prepare-f6c-continuous-reception-root-cover.py', 'scripts/eom/prepare-f6c-emission-refinement.py', 'scripts/eom/prepare-f6c-parent-emission-refinement.py', 'scripts/eom/prepare-f6c-parent-refinement-batch.mjs', 'scripts/eom/prepare-f6c-refined-acceleration.py', 'scripts/eom/prepare-subfield-circular-root.mjs', 'scripts/eom/run-current-f5-enclosed-root.mjs', 'scripts/eom/run-f5-enclosed-root.mjs', 'scripts/eom/run-f6c-acceleration-pilot.mjs', 'scripts/eom/run-f6c-cached-root-cover-full.mjs', 'scripts/eom/run-f6c-cached-root-cover-pilot.mjs', 'scripts/eom/run-f6c-emission-refinement-pilot.mjs', 'scripts/eom/run-f6c-evidence-packaging.mjs', 'scripts/eom/run-f6c-parent-emission-refinement-pilot.mjs', 'scripts/eom/run-f6c-refined-acceleration-pilot.mjs', 'scripts/eom/run-f6c-root-cover-pilot.mjs', 'scripts/eom/run-f6c-streamed-leaf-diagnostic.mjs', 'scripts/eom/run-subfield-circular-root-pilot.mjs', 'scripts/eom/run-subfield-circular-root-rung.mjs', 'scripts/eom/verify-f5-enclosed-root-prefix.mjs', 'scripts/eom/verify-f5-ordinary-evolution.py', 'scripts/eom/verify-f5-prehistory-handoff.py', 'scripts/eom/verify-f5-prehistory-restriction.py', 'scripts/eom/verify-f6c-accepted-frame-reconstruction.py', 'scripts/eom/verify-f6c-bounded-operation-closure.mjs', 'scripts/eom/verify-f6c-cached-continuous-reception-root-cover.py', 'scripts/eom/verify-f6c-continuous-reception-acceleration.py', 'scripts/eom/verify-f6c-continuous-reception-root-cover.py', 'scripts/eom/verify-f6c-emission-refinement.py', 'scripts/eom/verify-f6c-parent-emission-refinement.py', 'scripts/eom/verify-f6c-refined-acceleration.py', 'scripts/eom/verify-f6c-retained-history-compatibility.py', 'scripts/eom/verify-f6c-retained-history-guards.py', 'scripts/eom/verify-subfield-circular-history.mjs', 'src/eom/native/eom_f5_enclosed_root_cli.cpp', 'src/eom/native/eom_subfield_circular_root_cli.cpp', 'src/prescribed-path-analysis/F5EnclosedRootLedgerReducer.mjs', 'src/prescribed-path-analysis/SubfieldCircularRootLedgerReducer.mjs'))

def _target(filename):
    path = Path(filename)
    if not path.is_absolute():
        path = _ROOT / path
    relative = path.relative_to(_ROOT).as_posix()
    if path != path.resolve():
        raise ValueError("Noncanonical production test target")
    return relative


def is_production_target(filename):
    path = Path(filename)
    if not path.is_absolute():
        path = _ROOT / path
    try:
        relative = path.relative_to(_ROOT).as_posix()
    except ValueError:
        return False
    if relative not in _TARGETS:
        return False
    return _target(path) in _TARGETS


def original_source(host_file, filename, *, expected_digest=None):
    original, current, identities = production_source_pair(_ROOT, __file__, _target(filename), expectedOriginalSha=expected_digest)
    return original


def load_current_module(host_file, module, filename, *, original_digest=None, raw=None):
    original, current, identities = production_source_pair(_ROOT, __file__, _target(filename), expectedOriginalSha=original_digest)
    if original_digest is not None and hashlib.sha256(original).hexdigest() != original_digest:
        raise ValueError("Original production generation differs")
    if raw is not None and raw != original and raw != current:
        raise ValueError("Caller source differs from both admitted generations")
    module.__file__ = str(_ROOT / _target(filename))
    module.OPTION_B_PRODUCTION_IDENTITIES = identities
    module.production_identities = production_identities
    module.production_source_pair = production_source_pair
    module.production_recheck = production_recheck
    module.production_historical_record = production_historical_record
    module.production_runtime_binding = production_runtime_binding
    module.production_original_source_binding = production_original_source_binding
    exec(compile(current, module.__file__, "exec", dont_inherit=True), module.__dict__)
    production_recheck()
    return module


def exec_module(host_file, spec, module):
    if is_production_target(spec.origin):
        return load_current_module(host_file, module, spec.origin)
    spec.loader.exec_module(module)
    return module


def source_bytes(host_file, filename):
    if is_production_target(filename):
        return original_source(host_file, filename)
    path = Path(filename)
    if path.is_absolute() and path.is_relative_to(_ROOT) and _target(filename).startswith("tests/"):
        original = original_test_data(filename)
        if original is not None:
            return original
    return Path(filename).read_bytes()


def captured_source(host_file, filename):
    return production_source_pair(_ROOT, __file__, _target(filename))


def exec_source(host_file, module, filename, raw):
    if is_production_target(filename):
        return load_current_module(host_file, module, filename, raw=raw)
    exec(compile(raw, str(filename), 'exec', dont_inherit=True), module.__dict__)
    return module


def load_named_module(host_file, name, filename):
    from types import ModuleType
    base_name=name
    suffix=0
    while name in sys.modules:
        suffix+=1
        name=f'{base_name}_{suffix}'
    module = ModuleType(name)
    sys.modules[name] = module
    try:
        return load_current_module(host_file, module, filename)
    except BaseException:
        sys.modules.pop(name, None)
        raise


_ORIGINAL_TEST_CAPTURES = {}

def _original_test_capture(relative, expected):
    raw, identity = _captured_bytes(_ROOT, relative, expected)
    prior = _ORIGINAL_TEST_CAPTURES.get(relative)
    if prior is not None and prior != (expected, identity):
        raise ValueError("Original test-data capture replaced")
    if prior is None:
        _ORIGINAL_TEST_CAPTURES[relative] = (expected, identity)
    return raw

def _original_test_recheck():
    for relative, (expected, identity) in tuple(_ORIGINAL_TEST_CAPTURES.items()):
        _, current = _captured_bytes(_ROOT, relative, expected)
        if current != identity:
            raise ValueError("Retained original test-data identity replaced")
    production_recheck()

def original_test_data(filename):
    """Original test evidence; this function does not execute an archive."""
    target = _target(filename)
    index_path = "reference/priorities/development-process-review/evidence/option-b-production-original-sources.json"
    selected = [row for row in production_captured_sources(__file__)
                if row["path"] == str(_ROOT / index_path)]
    if len(selected) != 1:
        raise ValueError("One authenticated original index required")
    _original_test_recheck()
    record = json.loads(_original_test_capture(index_path, selected[0]["sha256"]))
    if record.get("schema") != "option-b-production-original-sources/v1" or record.get("role") != "historical-source-generations-not-current-acceptance":
        raise ValueError("Original test-data index contract")
    entry = record["sources"].get(target)
    if entry is None:
        _original_test_recheck()
        return None
    raw = _original_test_capture(entry["path"], entry["sha256"])
    _original_test_recheck()
    return raw


def copy_production_fixture(destination):
    """Copy the admitted production closure into an explicit disposable root."""
    import subprocess
    destination=Path(destination).resolve()
    if destination==_ROOT:
        raise ValueError('Production fixture cannot overwrite selected checkout')
    runtime=production_runtime_binding()
    helper=(_ROOT/'tests/support/option-b-production-fixtures.mjs').as_uri()
    program="const m=await import(process.argv[1]);m.copyProductionFixture(process.argv[2],process.argv[3]);"
    production_recheck()
    subprocess.run([runtime['path'],'--input-type=module','-e',program,helper,str(_ROOT),str(destination)],check=True,capture_output=True)
    production_recheck()
