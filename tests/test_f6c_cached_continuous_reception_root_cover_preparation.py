"""Binding-only cached consumer successor; synthetic histories only.

All 25 original subject-control obligations run unchanged against the successor
and independently frozen comparator. The private module alias deliberately stays
``continuous_reception_roots``; its captured filename/hash select the cached
implementation. No import by that alias may select an on-disk or cached module.
Exact source-byte and AST checks constrain this batch to six binding assignments.
No actual export, guard, reconstruction, pilot or root-cover data is read here.
"""
import ast
import hashlib
from pathlib import Path
import sys
from types import ModuleType
import unittest
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT/"scripts/eom/prepare-f6c-continuous-reception-root-cover.py"
BASE_TESTS = ROOT/"tests/test_f6c_continuous_reception_root_cover_preparation.py"
SOURCE = ROOT/"scripts/eom/prepare-f6c-cached-continuous-reception-root-cover.py"
REFERENCE = ROOT/"scripts/eom/verify-f6c-cached-continuous-reception-root-cover.py"
BASE_SHA = "6229e8227d26abdb1acc415ae10f0456d325ced5649ad68eb261790c585ae0a3"
BASE_TESTS_SHA = "68a940c40b2e3b463555b95858031f96796e2ac94963a86b3a9ae6fd74dc3742"
REFERENCE_SHA = "3221c44ed626f0902cc1c6e4d439fc87669bc6fa9ec1397d111b2d1fc69bbfc7"
REFERENCE_TESTS_SHA = "09b5c51b2e43727b98adfffde6a080e8e9c92f1ffa7280d8f819d830c8f7e2a3"
DECLARATION_SHA = "520bd9fd40a9e73a1decb8bdbdd3b262f51478ed5bc61103f86b92f5079de2ba"
CACHED_SHA = "daa4cc227cb8685de673fc400d817a19666b4fc7323e6c3a56f475a463b23acf"
ALLOWED = {"SELF", "REFERENCE", "REFERENCE_SHA", "DECLARATION", "DECLARATION_SHA", "FIXED"}


def pinned(path, expected):
    raw = path.read_bytes()
    if hashlib.sha256(raw).hexdigest() != expected:
        raise AssertionError("frozen source changed: "+str(path))
    return raw


def captured_module(name, path, raw):
    module = ModuleType(name)
    module.__file__ = str(path)
    exec(compile(raw, str(path), "exec", dont_inherit=True), module.__dict__)
    return module


BASE_BYTES = pinned(BASE, BASE_SHA)
CONTROL_BYTES = pinned(BASE_TESTS, BASE_TESTS_SHA)
# Authenticate reference and cached-library generations BEFORE any comparison
# control or root-library definition is executed. Only source/protocol files
# are read; the actual scientific data in FIXED is never opened by these tests.
REFERENCE_BYTES = pinned(REFERENCE, REFERENCE_SHA)
pinned(ROOT/"tests/test_f6c_cached_continuous_reception_root_cover.py", REFERENCE_TESTS_SHA)
pinned(ROOT/"scripts/eom/oracle/continuous_reception_roots_cached.py", CACHED_SHA)
pinned(ROOT/"tests/test_eom_continuous_reception_roots_cached.py", "a5ac7c8b26c5d0a193f20305f4bdbad93939756780bdaefd9cbf569f42a487eb")
pinned(ROOT/"scripts/eom/verify-f6c-continuous-reception-root-cover.py", "1e121cb46ae4ebb7a50e17f00db7b6ecf063e1e2e465fea590e4eba93ee17f36")
pinned(ROOT/"reference/priorities/braid-program/evidence/2026-08-27-f6c-cached-root-cover-predeclaration.md", DECLARATION_SHA)
S = captured_module("synthetic_cached_f6c_cover_subject", SOURCE, SOURCE.read_bytes())
V = captured_module("frozen_cached_f6c_cover_reference", REFERENCE, REFERENCE_BYTES)
LEGACY = captured_module("original_f6c_subject_controls_for_cached_successor", BASE_TESTS, CONTROL_BYTES)
BASE_MODULE = LEGACY.S
# Preserve every original test function and synthetic fixture. Retarget only
# its subject/reference handles and negative-CLI subject path.
LEGACY.S, LEGACY.V, LEGACY.SOURCE = S, V, SOURCE


def assignments(raw):
    text = raw.decode("utf-8")
    result = {}
    for node in ast.parse(text).body:
        if isinstance(node, ast.Assign) and len(node.targets) == 1 and isinstance(node.targets[0], ast.Name):
            name = node.targets[0].id
            if name in ALLOWED:
                if name in result: raise AssertionError("duplicate binding assignment")
                result[name] = ast.get_source_segment(text, node)
    return result


def expected_successor_bytes():
    old = assignments(BASE_BYTES)
    if set(old) != ALLOWED: raise AssertionError("baseline binding assignment census")
    replacement = {
        "SELF": 'SELF = "scripts/eom/prepare-f6c-cached-continuous-reception-root-cover.py"',
        "REFERENCE": 'REFERENCE = "scripts/eom/verify-f6c-cached-continuous-reception-root-cover.py"',
        "REFERENCE_SHA": 'REFERENCE_SHA = "'+REFERENCE_SHA+'"',
        "DECLARATION": 'DECLARATION = "reference/priorities/braid-program/evidence/2026-08-27-f6c-cached-root-cover-predeclaration.md"',
        "DECLARATION_SHA": 'DECLARATION_SHA = "'+DECLARATION_SHA+'"',
        "FIXED": assignments(REFERENCE_BYTES)["FIXED"],
    }
    text = BASE_BYTES.decode("utf-8")
    for name, value in replacement.items():
        if text.count(old[name]) != 1: raise AssertionError("nonunique original binding")
        text = text.replace(old[name], value)
    return text.encode("utf-8")


def require_exact_successor(raw):
    if raw != expected_successor_bytes():
        raise AssertionError("undeclared consumer source delta")


class CachedBindingTests(unittest.TestCase):
    def test_exact_source_bytes_only_six_binding_assignments_changed(self):
        require_exact_successor(SOURCE.read_bytes())
        self.assertEqual(pinned(BASE, BASE_SHA), BASE_BYTES)
        self.assertEqual(pinned(BASE_TESTS, BASE_TESTS_SHA), CONTROL_BYTES)

    def test_ast_and_every_function_body_unchanged(self):
        def stripped(raw):
            tree = ast.parse(raw)
            tree.body = [node for node in tree.body if not (
                isinstance(node, ast.Assign) and len(node.targets) == 1
                and isinstance(node.targets[0], ast.Name) and node.targets[0].id in ALLOWED)]
            return ast.dump(tree, include_attributes=False)
        self.assertEqual(set(assignments(SOURCE.read_bytes())), ALLOWED)
        self.assertEqual(stripped(BASE_BYTES), stripped(SOURCE.read_bytes()))

    def test_source_delta_guard_rejects_math_limits_alias_and_binding_edits(self):
        raw = SOURCE.read_bytes()
        for before, after in ((b'LIMIT = 1800', b'LIMIT = 1801'),
                              (b'row.distance.lower > 0', b'row.distance.lower >= 0'),
                              (b'("continuous_reception_roots", "rootLibrary")', b'("continuous_reception_roots_cached", "rootLibrary")'),
                              (CACHED_SHA.encode(), b'0'*64)):
            with self.subTest(before=before):
                self.assertEqual(raw.count(before), 1)
                with self.assertRaisesRegex(AssertionError, "undeclared"):
                    require_exact_successor(raw.replace(before, after))
        with self.assertRaises(AssertionError): require_exact_successor(BASE_BYTES)

    def test_exact_twenty_binding_chain_and_original_premises_preserved(self):
        self.assertEqual(S.FIXED, V.FIXED)
        self.assertEqual(len(S.FIXED), 20)
        new = {role: (path, digest) for role, path, digest in S.FIXED}
        self.assertEqual(len(new), 20)
        self.assertEqual(S.FIXED[0], BASE_MODULE.FIXED[0])
        for role, path, digest in BASE_MODULE.FIXED:
            if role not in {"rootLibrary", "rootControls", "declaration"}:
                self.assertEqual(new[role], (path, digest))
        self.assertEqual(new["rootLibrary"], ("scripts/eom/oracle/continuous_reception_roots_cached.py", CACHED_SHA))
        self.assertEqual(S.REFERENCE_SHA, REFERENCE_SHA)
        self.assertEqual(S.DECLARATION_SHA, DECLARATION_SHA)
        for key in ("SCHEMA", "IDS", "KNOT_SHA", "FALSE_FLAGS", "MAX_BYTES", "MAX_RUNTIME_BYTES", "LIMIT", "HEARTBEAT", "MODULES"):
            self.assertEqual(getattr(S, key), getattr(BASE_MODULE, key), key)

    def test_captured_cached_bytes_use_explicit_private_legacy_alias(self):
        captured = LEGACY.captured()
        filename, raw, digest = captured["continuous_reception_roots"]
        self.assertEqual(Path(filename), ROOT/"scripts/eom/oracle/continuous_reception_roots_cached.py")
        self.assertEqual(digest, CACHED_SHA)
        poison = ModuleType("continuous_reception_roots")
        poison.enclose_root_cover = lambda *_: self.fail("global alias was imported")
        with patch.dict(sys.modules, {"continuous_reception_roots": poison}):
            with S.captured_package(captured) as modules:
                module = modules["continuous_reception_roots"]
                self.assertTrue(module.__name__.endswith(".continuous_reception_roots"))
                self.assertEqual(module.__file__, filename)
                self.assertEqual(module.enclose_root_cover.__code__.co_filename, filename)
                self.assertTrue(hasattr(module, "_CallLocalStateCache"))
                self.assertEqual(module.ConditionalPremises.__module__, module.__name__)
                self.assertIsNot(module, poison)
                self.assertIs(sys.modules["continuous_reception_roots"], poison)
        self.assertEqual(hashlib.sha256(raw).hexdigest(), CACHED_SHA)

    def test_wrong_cached_generation_rejected_before_execution(self):
        sources = LEGACY.captured()
        filename, raw, digest = sources["continuous_reception_roots"]
        sources["continuous_reception_roots"] = filename, raw+b"\nraise AssertionError('must not execute')\n", digest
        before = set(sys.modules)
        with self.assertRaisesRegex(ValueError, "module hash"):
            with S.captured_package(sources): pass
        self.assertFalse({name for name in set(sys.modules)-before if name.startswith("_f6c_cover_")})

    def test_old_and_mixed_launch_bindings_rejected(self):
        for mode in ("old-declaration", "old-reference", "old-library", "old-subject"):
            plan, own = LEGACY.ContractTests().plan()
            c = plan["comparisonContract"]
            if mode == "old-declaration": c["declarationSha256"] = BASE_MODULE.DECLARATION_SHA
            elif mode == "old-reference": c["verifierSha256"] = BASE_MODULE.REFERENCE_SHA
            elif mode == "old-library":
                row = next(r for r in c["subjectSourceBindings"] if r["path"].endswith("continuous_reception_roots_cached.py"))
                _, row["path"], row["sha256"] = next(b for b in BASE_MODULE.FIXED if b[0] == "rootLibrary")
            else: c["subjectSourceBindings"][0]["path"] = BASE_MODULE.SELF
            with self.subTest(mode=mode), self.assertRaises(ValueError):
                S.validate_launch_contract(plan, "pilot-cell-0", own)

    def test_original_twenty_five_controls_retargeted_without_body_changes(self):
        self.assertEqual(unittest.defaultTestLoader.loadTestsFromModule(LEGACY).countTestCases(), 25)
        self.assertIs(LEGACY.S, S)
        self.assertIs(LEGACY.V, V)
        self.assertEqual(LEGACY.SOURCE, SOURCE)
        self.assertEqual(pinned(BASE_TESTS, BASE_TESTS_SHA), CONTROL_BYTES)


def load_tests(loader, tests, pattern):
    baseline = loader.loadTestsFromModule(LEGACY)
    if baseline.countTestCases() != 25:
        raise AssertionError("original 25-control census changed")
    return unittest.TestSuite((tests, baseline))


if __name__ == "__main__":
    unittest.main()
