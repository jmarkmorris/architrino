"""Binding-only successor controls; no actual F6c data or root-library calls.

All 35 frozen baseline control obligations run against the new comparator.
Exact source bytes and AST structure prove that only four binding assignments
changed; numerical agreement is not used as a new mathematical oracle.
"""
import ast
from copy import deepcopy
import hashlib
import importlib.util
from pathlib import Path
import types
import unittest

ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT/"scripts/eom/verify-f6c-continuous-reception-root-cover.py"
BASE_TESTS = ROOT/"tests/test_f6c_continuous_reception_root_cover.py"
SOURCE = ROOT/"scripts/eom/verify-f6c-cached-continuous-reception-root-cover.py"
BASE_SHA = "c0a9a9467f68ceed8b8d73fc12bf604bce64a3dc8f68e60f8cbc71b67ddc3987"
BASE_TESTS_SHA = "5f501e0b8cf60030d214fc9637e1292faa93a615c396e787ef77fc7b261991c5"
DECLARATION_SHA = "7c2a8b0bb06f46da158e0dfe2cb313dd72e2edff3c411e87c1588aa6d028f9e4"
ALLOWED_ASSIGNMENTS = {"SELF", "DECLARATION", "DECLARATION_SHA", "FIXED"}
REPLACEMENTS = [
    [
        "SELF = \"scripts/eom/verify-f6c-continuous-reception-root-cover.py\"",
        "SELF = \"scripts/eom/verify-f6c-cached-continuous-reception-root-cover.py\""
    ],
    [
        "DECLARATION = \"reference/priorities/braid-program/evidence/2026-08-27-f6c-continuous-reception-root-cover-predeclaration.md\"",
        "DECLARATION = \"reference/priorities/braid-program/evidence/2026-08-27-f6c-cached-root-cover-predeclaration.md\""
    ],
    [
        "DECLARATION_SHA = \"765e6663cdd60323f84b9e1af52ba1399345322eb747727f2a0898b4dd0fd079\"",
        "DECLARATION_SHA = \"7c2a8b0bb06f46da158e0dfe2cb313dd72e2edff3c411e87c1588aa6d028f9e4\""
    ],
    [
        "(\"rootLibrary\", \"scripts/eom/oracle/continuous_reception_roots.py\", \"f38657eedb585f6066bf233cef05508ef4d4336146dbf1e44501dfa9b669e04c\")",
        "(\"rootLibrary\", \"scripts/eom/oracle/continuous_reception_roots_cached.py\", \"daa4cc227cb8685de673fc400d817a19666b4fc7323e6c3a56f475a463b23acf\")"
    ],
    [
        "(\"rootControls\", \"tests/test_eom_continuous_reception_roots.py\", \"81de0ebc74a6e2e2a6c66e96cd3a7856806b7e41f775e3e2f184caf5bd1158ac\")",
        "(\"rootControls\", \"tests/test_eom_continuous_reception_roots_cached.py\", \"a5ac7c8b26c5d0a193f20305f4bdbad93939756780bdaefd9cbf569f42a487eb\")"
    ]
]
EXTRA_FIXED_LINES = """    ("governingDeclaration", "reference/priorities/braid-program/evidence/2026-08-27-f6c-continuous-reception-root-cover-predeclaration.md", "765e6663cdd60323f84b9e1af52ba1399345322eb747727f2a0898b4dd0fd079"),
    ("baselineRootLibrary", "scripts/eom/oracle/continuous_reception_roots.py", "f38657eedb585f6066bf233cef05508ef4d4336146dbf1e44501dfa9b669e04c"),
    ("baselineRootControls", "tests/test_eom_continuous_reception_roots.py", "81de0ebc74a6e2e2a6c66e96cd3a7856806b7e41f775e3e2f184caf5bd1158ac"),
    ("baselineComparator", "scripts/eom/verify-f6c-continuous-reception-root-cover.py", "c0a9a9467f68ceed8b8d73fc12bf604bce64a3dc8f68e60f8cbc71b67ddc3987"),
    ("baselineComparatorControls", "tests/test_f6c_continuous_reception_root_cover.py", "5f501e0b8cf60030d214fc9637e1292faa93a615c396e787ef77fc7b261991c5"),
    ("cacheEquivalence", "reference/priorities/braid-program/evidence/2026-08-27-f6c-call-local-state-cache-equivalence.md", "798858e87058b5a1a2d478c89edad3154a2e4993f3c14cab089b4aabf3434ee3"),
    ("governingResourcePlan", "reference/priorities/braid-program/evidence/2026-08-27-f6c-root-cover-pilot-resource-plan.md", "36b72681c116cedf1803cc89ead8b48a7d9604bae7f9bffd7b0f95b33c3bb9b4"),
    ("priorResourceReturn", "reference/priorities/braid-program/evidence/2026-08-27-f6c-root-cover-full-resource-plan.md", "46a827d13a5e8f7a068e73e642f74d679ebf18e0b2e8f42ab53aab4de26598ef"),
"""

def digest(raw):
    return hashlib.sha256(raw).hexdigest()


def load_module(path, name):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


BASE_BYTES = BASE.read_bytes()
CONTROL_BYTES = BASE_TESTS.read_bytes()
if digest(BASE_BYTES) != BASE_SHA or digest(CONTROL_BYTES) != BASE_TESTS_SHA:
    raise RuntimeError("frozen baseline reference/control source drift")
V = load_module(SOURCE, "f6c_cached_binding_reference")
# Execute the unchanged controls in their own namespace, then retarget ONLY
# their subject/source handles. Their closed forms and negative cases are intact.
LEGACY = types.ModuleType("f6c_baseline_controls_for_cached_binding")
LEGACY.__file__ = str(BASE_TESTS)
exec(compile(CONTROL_BYTES, str(BASE_TESTS), "exec", dont_inherit=True), LEGACY.__dict__)
BASE_MODULE = LEGACY.V
LEGACY.V = V
LEGACY.SOURCE = SOURCE


def expected_successor_bytes():
    source = BASE_BYTES.decode()
    for old, new in REPLACEMENTS:
        if source.count(old) != 1:
            raise AssertionError("declared replacement is not unique")
        source = source.replace(old, new)
    marker = '    ("declaration", DECLARATION, DECLARATION_SHA),\n'
    if source.count(marker) != 1:
        raise AssertionError("fixed-binding insertion is not unique")
    return source.replace(marker, marker+EXTRA_FIXED_LINES).encode()


class SuccessorBindingTests(unittest.TestCase):
    def test_exact_source_bytes_change_only_explicit_binding_literals(self):
        self.assertEqual(SOURCE.read_bytes(), expected_successor_bytes())
        self.assertEqual(digest(BASE.read_bytes()), BASE_SHA)
        self.assertEqual(digest(BASE_TESTS.read_bytes()), BASE_TESTS_SHA)

    def test_ast_identical_except_four_top_level_assignments(self):
        def stripped(raw):
            tree = ast.parse(raw)
            found = set()
            remaining = []
            for node in tree.body:
                if isinstance(node, ast.Assign) and len(node.targets) == 1 and isinstance(node.targets[0], ast.Name) and node.targets[0].id in ALLOWED_ASSIGNMENTS:
                    found.add(node.targets[0].id)
                else:
                    remaining.append(node)
            self.assertEqual(found, ALLOWED_ASSIGNMENTS)
            tree.body = remaining
            return ast.dump(tree, include_attributes=False)
        self.assertEqual(stripped(BASE_BYTES), stripped(SOURCE.read_bytes()))

    def test_complete_fixed_chain_retains_all_original_premises(self):
        old = {role: (path, sha) for role, path, sha in BASE_MODULE.FIXED}
        new = {role: (path, sha) for role, path, sha in V.FIXED}
        self.assertEqual(len(V.FIXED), 20)
        self.assertEqual(len(new), len(V.FIXED))
        self.assertEqual(V.FIXED[0], BASE_MODULE.FIXED[0])
        for role, expected in old.items():
            if role not in {"rootLibrary", "rootControls", "declaration"}:
                self.assertEqual(new[role], expected)
        self.assertEqual(new["rootLibrary"], ("scripts/eom/oracle/continuous_reception_roots_cached.py", "daa4cc227cb8685de673fc400d817a19666b4fc7323e6c3a56f475a463b23acf"))
        self.assertEqual(new["rootControls"], ("tests/test_eom_continuous_reception_roots_cached.py", "a5ac7c8b26c5d0a193f20305f4bdbad93939756780bdaefd9cbf569f42a487eb"))
        for source, retained in [("rootLibrary", "baselineRootLibrary"), ("rootControls", "baselineRootControls"), ("declaration", "governingDeclaration")]:
            self.assertEqual(new[retained], old[source])
        self.assertEqual(new["baselineComparator"], (str(BASE.relative_to(ROOT)), BASE_SHA))
        self.assertEqual(new["baselineComparatorControls"], (str(BASE_TESTS.relative_to(ROOT)), BASE_TESTS_SHA))
        # Read code/protocol bytes only; never load the three actual data files.
        for role, path, expected in V.FIXED:
            if role not in {"export", "reconstruction", "guards"}:
                self.assertEqual(digest((ROOT/path).read_bytes()), expected, role)
        self.assertEqual(V.DECLARATION_SHA, DECLARATION_SHA)
        self.assertEqual(V.SELF, str(SOURCE.relative_to(ROOT)))

    def test_scientific_schema_limits_and_false_authority_are_unchanged(self):
        for key in ("SCHEMA", "REPORT_SCHEMA", "IDS", "KNOT_SHA", "FALSE_FLAGS", "MANIFEST_KEYS", "ROW_KEYS", "PIECE_KEYS", "CONTRACT_KEYS", "BINDING_KEYS", "MAX_BYTES", "MAX_LINE", "MAX_RUNTIME_BYTES", "LIMIT", "HEARTBEAT"):
            self.assertEqual(getattr(V, key), getattr(BASE_MODULE, key), key)
        self.assertEqual((V.LIMIT, V.HEARTBEAT, V.MAX_BYTES), (1800, 15, 64*1024*1024))
        self.assertTrue(all(value is False for value in V.FALSE_FLAGS.values()))

    def test_old_and_hybrid_bindings_cannot_admit_a_successor_manifest(self):
        for mutation in ("old-contract", "old-fixed", "missing-equivalence", "reordered-fixed", "altered-cache", "missing-return"):
            args = LEGACY.ManifestTests().contract()
            manifest, contract = args[:2]
            if mutation == "old-contract":
                contract["declarationSha256"] = BASE_MODULE.DECLARATION_SHA
            elif mutation == "old-fixed":
                manifest["fixedBindings"] = [{"id": role, "path": path, "sha256": sha} for role, path, sha in BASE_MODULE.FIXED]
            elif mutation == "missing-equivalence":
                manifest["fixedBindings"] = [item for item in manifest["fixedBindings"] if item["id"] != "cacheEquivalence"]
            elif mutation == "reordered-fixed":
                manifest["fixedBindings"][0], manifest["fixedBindings"][1] = manifest["fixedBindings"][1], manifest["fixedBindings"][0]
            elif mutation == "altered-cache":
                next(item for item in manifest["fixedBindings"] if item["id"] == "rootLibrary")["sha256"] = BASE_MODULE.FIXED[5][2]
            else:
                manifest["fixedBindings"] = [item for item in manifest["fixedBindings"] if item["id"] != "priorResourceReturn"]
            with self.subTest(mutation=mutation), self.assertRaises(ValueError):
                V.validate_manifest(*args)

    def test_positive_fixture_only_preserves_original_comparison_chain(self):
        arguments = LEGACY.fixture()
        baseline = BASE_MODULE.compare_rows(*deepcopy(arguments))
        successor = V.compare_rows(*deepcopy(arguments))
        self.assertEqual(successor, baseline)  # implementation identity only
        self.assertIs(successor["accepted"], False)
        self.assertEqual((successor["pairCellCertificates"], successor["ordinaryNonselfRows"], successor["selfExclusionRows"], successor["pieceRecordCount"]), (64, 56, 8, 112))

    def test_original_control_inventory_is_complete_and_retargeted(self):
        suite = unittest.defaultTestLoader.loadTestsFromModule(LEGACY)
        self.assertEqual(suite.countTestCases(), 35)
        self.assertIs(LEGACY.V, V)
        self.assertEqual(LEGACY.SOURCE, SOURCE)


def load_tests(loader, tests, pattern):
    baseline_obligations = loader.loadTestsFromModule(LEGACY)
    if baseline_obligations.countTestCases() != 35:
        raise AssertionError("original 35-control census changed")
    return unittest.TestSuite((tests, baseline_obligations))


if __name__ == "__main__":
    unittest.main()
