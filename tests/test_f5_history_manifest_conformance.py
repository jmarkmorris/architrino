"""Fail-closed manifest controls; no synthetic pass is adapter evidence."""

import copy
from decimal import Decimal, localcontext
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from scripts.eom.oracle.f5_history_manifest_conformance import (
    FIXED_BINDINGS, MANIFEST_SCHEMA, POSITION_WIDTH, VELOCITY_WIDTH,
    decode_json, history_fingerprint, load_frozen_sources, sha256,
    validate_manifest_shape, verify_manifest_bytes,
)


ROOT = Path(__file__).resolve().parents[1]


def encode(value):
    return (json.dumps(value, separators=(",", ":")) + "\n").encode()


class F5ManifestConformanceTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.config, cls.report, _ = load_frozen_sources(ROOT)
        constituents = {item["id"]: item for item in cls.config["constituents"]}
        worldlines = {item["constituentId"]: item for item in cls.config["worldlines"]}
        members = []
        for index, identity in enumerate(cls.config["relationships"]["sourceOrder"]):
            segments = [{
                "index": item["index"], "tStart": str(item["start"]), "tEnd": str(item["end"]),
                "coefficients": [[str(index), "0", "0", "0"] for _ in range(3)],
                "positionErrors": [POSITION_WIDTH] * 3, "velocityErrors": [VELOCITY_WIDTH] * 3,
            } for item in cls.report["segments"]]
            members.append({
                "index": index, "constituentId": identity, "worldlineId": worldlines[identity]["id"],
                "polarity": constituents[identity]["polarity"], "historyId": f"synthetic-{index}",
                "historyFingerprint": history_fingerprint(segments), "segments": segments,
            })
        cls.manifest = {
            "schema": MANIFEST_SCHEMA, "campaignId": "test-only-not-a-campaign", "runId": "synthetic",
            "normalizedFieldSpeed": "1", "retainedInterval": ["-1", "19.63359163663986"],
            "maximumSegmentStep": "0.02", "positionWidth": POSITION_WIDTH,
            "velocityWidth": VELOCITY_WIDTH, "members": members,
        }

    def test_source_bound_shape_is_not_conformance(self):
        operators = validate_manifest_shape(self.manifest, self.config, self.report)
        self.assertEqual(len(operators), 12)
        raw = encode(self.manifest)
        result = verify_manifest_bytes(raw)
        self.assertFalse(result["accepted"])
        self.assertFalse(result["h3EvidenceEligible"])
        self.assertEqual(result["historyManifestSha256"], sha256(raw))
        self.assertEqual(result["processedMemberSegments"], 1)
        self.assertEqual(result["failure"], "endpoint-defect-alone-exceeds-frozen-width")
        self.assertEqual(len(result["sourceBindings"]), 5)

    def test_duplicate_keys_and_nonfinite_json_are_rejected(self):
        for raw in (b'{"a":1,"a":2}', b'{"x":NaN}', b'{"x":Infinity}', b'[]'):
            with self.subTest(raw=raw), self.assertRaises(ValueError):
                decode_json(raw)

    def test_missing_member_or_segment_rejected_before_mathematics(self):
        for mutation in (lambda row: row["members"].pop(),
                         lambda row: row["members"][0]["segments"].pop()):
            value = copy.deepcopy(self.manifest)
            mutation(value)
            with self.assertRaisesRegex(ValueError, "twelve|1032"):
                validate_manifest_shape(value, self.config, self.report)

    def test_order_polarity_and_exact_grid_are_bound(self):
        for field, value in (("polarity", -1), ("index", False), ("worldlineId", "wrong")):
            row = copy.deepcopy(self.manifest)
            row["members"][0][field] = value
            with self.subTest(field=field), self.assertRaisesRegex(ValueError, "identity"):
                validate_manifest_shape(row, self.config, self.report)
        row = copy.deepcopy(self.manifest)
        row["members"][0]["segments"][0]["tEnd"] = "-0.98000620965441876"
        with self.assertRaisesRegex(ValueError, "frozen grid"):
            validate_manifest_shape(row, self.config, self.report)

    def test_token_chain_changed_coefficient_is_rejected(self):
        row = copy.deepcopy(self.manifest)
        row["members"][0]["segments"][0]["coefficients"][0][0] = "0.1"
        with self.assertRaisesRegex(ValueError, "fingerprint"):
            validate_manifest_shape(row, self.config, self.report)

    def test_changed_or_nonfinite_error_budget_is_rejected(self):
        for token in ("0", "2e-10", "NaN", "Infinity", "1e999999", "1e-400"):
            row = copy.deepcopy(self.manifest)
            row["members"][0]["segments"][0]["positionErrors"][0] = token
            with self.subTest(token=token), self.assertRaises(ValueError):
                validate_manifest_shape(row, self.config, self.report)

    def test_changed_source_bytes_have_no_bypass(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            relative, _ = FIXED_BINDINGS["approved-config"]
            target = root / relative
            target.parent.mkdir(parents=True)
            target.write_bytes((ROOT / relative).read_bytes() + b" ")
            with self.assertRaisesRegex(ValueError, "source hash mismatch"):
                load_frozen_sources(root)
            with self.assertRaisesRegex(ValueError, "executing verifier"):
                verify_manifest_bytes(encode(self.manifest), repo_root=root)
        with self.assertRaises(TypeError):
            verify_manifest_bytes(encode(self.manifest), verify_files=False)

    def test_shape_validation_survives_tiny_ambient_precision(self):
        with localcontext() as context:
            context.prec = 3
            self.assertEqual(len(validate_manifest_shape(self.manifest, self.config, self.report)), 12)

    def test_changed_file_after_import_is_rejected_without_running_old_code(self):
        read = Path.read_bytes
        target = ROOT / "scripts/eom/oracle/f5_actual_cubic_conformance.py"

        def changed(path):
            data = read(path)
            return data + b"\n# simulated later edit\n" if path == target else data

        with patch.object(Path, "read_bytes", changed):
            with self.assertRaisesRegex(ValueError, "changed after frozen import"):
                verify_manifest_bytes(encode(self.manifest))

    def test_cached_old_standard_module_cannot_supply_the_executing_proof(self):
        # Fresh process preloads a fake prior module. The wrapper must compile
        # its bound snapshot, not take the cached function. No files are edited.
        program = '''
import sys
from types import ModuleType
fake = ModuleType("scripts.eom.oracle.f5_actual_cubic_conformance")
fake.PRECISION = 1
sys.modules[fake.__name__] = fake
from scripts.eom.oracle import f5_history_manifest_conformance as wrapper
assert wrapper.PRECISION == 96
assert wrapper.certify_f5_segment.__module__.startswith("_f5_proof_snapshot_")
'''
        completed = subprocess.run([sys.executable, "-c", program], cwd=ROOT, capture_output=True, text=True)
        self.assertEqual(completed.returncode, 0, completed.stderr)

    def test_stale_wrapper_code_cannot_claim_current_source_bytes(self):
        source_path = ROOT / "scripts/eom/oracle/f5_history_manifest_conformance.py"
        stale = source_path.read_text().replace("HEARTBEAT_SECONDS = 15", "HEARTBEAT_SECONDS = 14")
        namespace = {"__name__": "stale_wrapper_test_only", "__file__": str(source_path)}
        with self.assertRaisesRegex(ValueError, "executing wrapper code differs"):
            exec(compile(stale, str(source_path), "exec"), namespace)

    def test_final_hash_checks_cannot_cross_deadline_and_still_pass(self):
        clock, count = [0.0], [0]
        read = Path.read_bytes
        target = ROOT / "scripts/eom/oracle/f5_history_manifest_conformance.py"

        def mocked_proof(*_):
            count[0] += 1
            return {"accepted": True, "reason": "mocked-test-only"}

        def slow_final_read(path):
            if count[0] == 12384 and path == target:
                clock[0] = 1801.0
            return read(path)

        with patch("scripts.eom.oracle.f5_history_manifest_conformance.certify_f5_segment", mocked_proof), \
                patch("scripts.eom.oracle.f5_history_manifest_conformance.time.monotonic", lambda: clock[0]), \
                patch.object(Path, "read_bytes", slow_final_read):
            result = verify_manifest_bytes(encode(self.manifest))
        self.assertFalse(result["accepted"])
        self.assertTrue(result["resourceContact"])
        self.assertEqual(result["failure"], "resource-limit-contact")
        self.assertEqual(result["elapsedWallSeconds"], 1801.0)

    def test_mocked_orchestration_covers_every_segment_but_grants_no_h3(self):
        # Mocked proof results test census/progress only and are never written as
        # evidence. Production exposes no callback to replace the proof.
        events = []
        with patch("scripts.eom.oracle.f5_history_manifest_conformance.certify_f5_segment",
                   return_value={"accepted": True, "reason": "mocked-test-only"}) as proof:
            result = verify_manifest_bytes(encode(self.manifest), progress=events.append)
        self.assertEqual(proof.call_count, 12384)
        self.assertEqual(result["processedMemberSegments"], 12384)
        self.assertTrue(result["accepted"])
        self.assertFalse(result["h3EvidenceEligible"])
        self.assertEqual(events[-1]["status"], "actual-cubic-conformance-passed")

    def test_cli_preserves_an_existing_output(self):
        with tempfile.TemporaryDirectory() as temporary:
            output = Path(temporary) / "existing.json"
            output.write_bytes(b"preserve me\n")
            command = [sys.executable, "-m", "scripts.eom.oracle.f5_history_manifest_conformance",
                       "--history-manifest", str(Path(temporary) / "absent.json"), "--out", str(output)]
            completed = subprocess.run(command, cwd=ROOT, capture_output=True, text=True)
            self.assertEqual(completed.returncode, 2)
            self.assertIn("output already exists", completed.stderr)
            self.assertEqual(output.read_bytes(), b"preserve me\n")


if __name__ == "__main__":
    unittest.main()
