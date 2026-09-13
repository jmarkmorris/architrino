"""Known record-reading and rejection controls, not hash or scientific oracles."""
import copy
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch


ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("controlled_fixture_reader", ROOT / "tests/option_b_fixture_records.py")
reader = importlib.util.module_from_spec(spec)
spec.loader.exec_module(reader)


class FixtureRecords(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.root = Path(self.directory.name)
        self.known_path = self.root / "scripts/equation-mapping/fixtures/known-hash-answers.json"
        self.prior_path = self.root / "tests/fixtures/option-b-python-transport-identities.json"
        self.known_path.parent.mkdir(parents=True)
        self.prior_path.parent.mkdir(parents=True)
        # Synthetic tokens have no implied SHA preimage or scientific authority.
        self.known = dict(schema="known-hash-answers/v1", algorithm="SHA-256",
                          role="independent-known-answer-control", inputEncoding="UTF-8",
                          outputEncoding="lowercase hexadecimal", sha256=dict(abc="a" * 64))
        self.prior = dict(schema="option-b-python-transport-identities/v1", algorithm="SHA-256",
                          encoding="lowercase hexadecimal", role="fixed-historical-prior-and-rejection-control",
                          hashes=dict(originalVerifier="b" * 64, originalDeclaration="c" * 64,
                                      rejectedCurrentVerifier="d" * 64))

    def write(self, path, record):
        path.write_text(json.dumps(record), encoding="utf-8")

    def test_00_hand_authored_field_selection_and_immutable_capture(self):
        self.write(self.known_path, self.known)
        self.write(self.prior_path, self.prior)
        known = reader.known_sha256(self.root)
        prior = reader.acceleration_prior(self.root)
        self.assertEqual(known, "a" * 64)
        self.assertEqual(prior, ("b" * 64, "c" * 64, "d" * 64))
        self.assertIs(type(prior), tuple)
        self.known["sha256"]["abc"] = "e" * 64
        self.write(self.known_path, self.known)
        self.assertEqual(known, "a" * 64)

    def test_missing_malformed_and_duplicate_records_reject(self):
        for path, load in ((self.known_path, reader.known_sha256), (self.prior_path, reader.acceleration_prior)):
            with self.subTest(path=path), self.assertRaises(FileNotFoundError):
                load(self.root)
            for raw in ('[]', 'null', '{', '{"schema":"first","schema":"second"}',
                        '{"nested":{"duplicate":1,"duplicate":2}}'):
                path.write_text(raw, encoding="utf-8")
                with self.subTest(raw=raw), self.assertRaises(ValueError):
                    load(self.root)

    def test_wrong_schema_algorithm_role_encoding_and_census_reject(self):
        for path, original, load, encoding, values in (
                (self.known_path, self.known, reader.known_sha256, "outputEncoding", "sha256"),
                (self.prior_path, self.prior, reader.acceleration_prior, "encoding", "hashes")):
            for field, value in (("schema", "unknown"), ("algorithm", "SHA-1"), ("role", "current-approval"),
                                 (encoding, "base64"), (values, {}), (values, []), (values, None)):
                record = copy.deepcopy(original)
                record[field] = value
                self.write(path, record)
                with self.subTest(field=field), self.assertRaises(ValueError):
                    load(self.root)
            for bad in (None, True, 0, "", "a" * 63, "a" * 65, "A" * 64, "g" * 64, "a" * 64 + "\n"):
                record = copy.deepcopy(original)
                record[values][next(iter(record[values]))] = bad
                self.write(path, record)
                with self.subTest(value=bad), self.assertRaises(ValueError):
                    load(self.root)

    def test_actual_consumers_reject_malformed_data_before_subject_loading(self):
        original_read = Path.read_text
        original_spec = importlib.util.spec_from_file_location
        malformed = copy.deepcopy(self.known)
        malformed["sha256"]["abc"] = "invalid"
        fixture_path = ROOT / "scripts/equation-mapping/fixtures/known-hash-answers.json"

        def read(path, *args, **kwargs):
            if path == fixture_path:
                return json.dumps(malformed)
            return original_read(path, *args, **kwargs)

        def no_subject(name, location, *args, **kwargs):
            if Path(location).is_relative_to(ROOT / "scripts/eom"):
                raise AssertionError("Scientific subject loaded before fixture validation")
            return original_spec(name, location, *args, **kwargs)

        for filename in ("test_f5_current_handoff.py", "test_f6c_retained_history_export.py",
                         "test_f6c_acceleration_execution.py"):
            target = original_spec("malformed_fixture_consumer", ROOT / "tests" / filename)
            module = importlib.util.module_from_spec(target)
            with self.subTest(consumer=filename), patch.object(Path, "read_text", read), \
                    patch.object(importlib.util, "spec_from_file_location", no_subject), \
                    self.assertRaisesRegex(ValueError, "Malformed fixture digest"):
                target.loader.exec_module(module)


if __name__ == "__main__":
    unittest.main()
