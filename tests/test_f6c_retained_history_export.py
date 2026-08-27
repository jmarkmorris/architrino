"""Hand-authored data-plumbing controls; no production export or physics run.

Expected tokens and bounds below are independent literals/exact Fractions.
No fixture is an accepted F6c history or a fabricated scientific certificate.
"""

import copy
from decimal import localcontext
from fractions import Fraction
import importlib.util
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest


SCRIPT = Path(__file__).resolve().parents[1] / "scripts/eom/export-f6c-retained-history.py"
SPEC = importlib.util.spec_from_file_location("f6c_data_export", SCRIPT)
exporter = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(exporter)

SEGMENT = {
    "startTime": "-1.000", "endTime": "0.000",
    "coefficients": [["1.000000000000000000000000000001", "-0.0", "2e-30", "3E+4"],
                     ["0", "1", "0", "0"], ["-1", "0", "0", "0"]],
    "positionErrors": ["0.0001", "1e-8", "0"], "positionError": "1.000e-4",
    "velocityErrors": ["0", "2e-6", "1e-6"], "velocityError": "0.000002",
}
FRAME_ZERO = b'{"pathKey":1,"frameIndex":0,"time":0.000,"position":{"x":1.000000000000000000000000000001,"y":-0.0,"z":2e-30},"velocity":{"x":3E+4,"y":0,"z":-1},"errorBound":1e-12,"stateFlags":1}'
FRAME_ONE = b'{"pathKey":1,"frameIndex":1,"time":0.002000,"position":{"x":1.002,"y":0,"z":0},"velocity":{"x":1,"y":0,"z":0},"errorBound":2.000e-12,"stateFlags":1}'
FRAMES = FRAME_ZERO + b"\n" + FRAME_ONE + b"\n"


class ExactTokenControls(unittest.TestCase):
    def test_numeric_lexemes_are_preserved_not_binary64_values(self):
        values = exporter.parse_json(b'[1.000000000000000000000000000001,-0.0,2e-30,3E+4,9007199254740993]')
        expected = ["1.000000000000000000000000000001", "-0.0", "2e-30", "3E+4", "9007199254740993"]
        self.assertEqual(values, expected)
        self.assertTrue(all(type(value) is exporter.JsonNumber for value in values))
        self.assertEqual(json.loads(json.dumps(values)), expected)
        self.assertEqual(Fraction(values[0]), Fraction(10**30 + 1, 10**30))

    def test_json_strings_remain_distinct_from_numeric_lexemes(self):
        values = exporter.parse_json(b'["0.10",0.10]')
        self.assertIs(type(values[0]), str)
        self.assertIs(type(values[1]), exporter.JsonNumber)
        with self.assertRaises(exporter.ExportError):
            exporter.decimal_token(values[0], numeric=True)
        with self.assertRaises(exporter.ExportError):
            exporter.decimal_token(values[1])

    def test_duplicate_keys_nonfinite_invalid_utf8_rejected(self):
        for data in (b'{"x":1,"x":2}', b'{"outer":{"x":1,"x":1}}',
                     b'[NaN]', b'[Infinity]', b'[-Infinity]', b'"\xff"', b'[01]'):
            with self.subTest(data=data), self.assertRaises(exporter.ExportError):
                exporter.parse_json(data)

    def test_nonliteral_or_nonfinite_decimal_tokens_rejected(self):
        for value in (0.1, 1, True, None, "NaN", "Infinity", "+1", " 1", "01", "1_0"):
            with self.subTest(value=value), self.assertRaises(exporter.ExportError):
                exporter.decimal_token(value)

    def test_integer_fields_cannot_be_booleans_strings_or_decimals(self):
        for value in (True, "1", exporter.JsonNumber("1.0"), exporter.JsonNumber("-1")):
            with self.subTest(value=value), self.assertRaises(exporter.ExportError):
                exporter.integer_token(value)


class SegmentControls(unittest.TestCase):
    def test_all_original_segment_tokens_preserved(self):
        original = copy.deepcopy(SEGMENT)
        result = exporter.validate_segments([original])
        self.assertEqual(result, [SEGMENT])
        self.assertEqual(result[0]["coefficients"][0],
                         ["1.000000000000000000000000000001", "-0.0", "2e-30", "3E+4"])
        self.assertEqual(result[0]["positionErrors"], ["0.0001", "1e-8", "0"])

    def test_radius_comparison_is_exact_under_low_ambient_precision(self):
        segment = copy.deepcopy(SEGMENT)
        segment["positionErrors"] = ["1.000000000000000000000000000001", "0", "0"]
        segment["positionError"] = "1.000000000000000000000000000000"
        self.assertGreater(Fraction(segment["positionErrors"][0]), Fraction(segment["positionError"]))
        for precision in (3, 28, 90):
            with self.subTest(precision=precision), localcontext() as context:
                context.prec = precision
                with self.assertRaises(exporter.ExportError):
                    exporter.validate_segments([segment])
                segment_equal = copy.deepcopy(segment)
                segment_equal["positionError"] = segment_equal["positionErrors"][0]
                self.assertEqual(exporter.validate_segments([segment_equal]), [segment_equal])

    def test_gap_overlap_reversal_and_missing_segments_rejected(self):
        with self.assertRaises(exporter.ExportError):
            exporter.validate_segments([])
        for start, end in (("0.001", "1"), ("-0.001", "1"), ("0", "0"), ("1", "0")):
            second = copy.deepcopy(SEGMENT)
            second["startTime"], second["endTime"] = start, end
            with self.subTest(start=start, end=end), self.assertRaises(exporter.ExportError):
                exporter.validate_segments([copy.deepcopy(SEGMENT), second])

    def test_equivalent_endpoint_spellings_are_not_rewritten(self):
        second = copy.deepcopy(SEGMENT)
        second["startTime"], second["endTime"] = "0e0", "1.0"
        result = exporter.validate_segments([copy.deepcopy(SEGMENT), second])
        self.assertEqual(result[0]["endTime"], "0.000")
        self.assertEqual(result[1]["startTime"], "0e0")

    def test_shape_negative_error_extra_field_and_inexact_token_rejected(self):
        changes = [lambda s: s["coefficients"].pop(),
                   lambda s: s["coefficients"][0].pop(),
                   lambda s: s["positionErrors"].pop(),
                   lambda s: s["velocityErrors"].__setitem__(0, "-1e-20"),
                   lambda s: s.__setitem__("invented", "0"),
                   lambda s: s["coefficients"][0].__setitem__(0, 0.1)]
        for change in changes:
            segment = copy.deepcopy(SEGMENT)
            change(segment)
            with self.assertRaises(exporter.ExportError):
                exporter.validate_segments([segment])


class FrameControls(unittest.TestCase):
    def test_frames_preserve_numbers_and_do_not_invent_velocity_error(self):
        frames = exporter.validate_frames(FRAMES, path_keys=(1,), frame_count=2)
        self.assertEqual([frame["time"] for frame in frames], ["0.000", "0.002000"])
        self.assertEqual(frames[0]["members"][0]["position"],
                         {"x": "1.000000000000000000000000000001", "y": "-0.0", "z": "2e-30"})
        self.assertEqual(frames[0]["members"][0]["velocity"]["x"], "3E+4")
        self.assertEqual(frames[1]["members"][0]["positionErrorBound"], "2.000e-12")
        self.assertNotIn("velocityError", frames[0]["members"][0])

    def test_missing_member_duplicate_frame_and_bad_polarity_rejected(self):
        cases = [FRAME_ZERO + b"\n", FRAME_ZERO + b"\n" + FRAME_ZERO + b"\n",
                 FRAMES.replace(b'"stateFlags":1', b'"stateFlags":2', 1),
                 FRAMES.replace(b'"pathKey":1', b'"pathKey":2', 1),
                 FRAMES.replace(b'"time":0.002000', b'"time":-0.002000'),
                 FRAMES.replace(b'"errorBound":1e-12', b'"errorBound":-1e-12'),
                 FRAMES.replace(b'"time":0.000', b'"time":"0.000"')]
        for data in cases:
            with self.subTest(data=data[:40]), self.assertRaises(exporter.ExportError):
                exporter.validate_frames(data, path_keys=(1,), frame_count=2)

    def test_mixed_time_tokens_in_one_frame_rejected(self):
        second_member = FRAME_ZERO.replace(b'"pathKey":1', b'"pathKey":2').replace(
            b'"stateFlags":1', b'"stateFlags":2').replace(b'"time":0.000', b'"time":0')
        with self.assertRaises(exporter.ExportError):
            exporter.validate_frames(FRAME_ZERO + b"\n" + second_member,
                                     path_keys=(1, 2), frame_count=1)


class FileBoundaryControls(unittest.TestCase):
    def test_original_byte_hash_binding_not_parsed_json_equality(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "source"
            path.write_bytes(b"abc")
            raw, binding = exporter.read_bound(path, "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad")
            self.assertEqual(raw, b"abc")
            self.assertEqual(binding["bytes"], 3)
            path.write_bytes(b"abc\n")
            with self.assertRaises(exporter.ExportError):
                exporter.read_bound(path, "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad")

    def test_output_is_create_exclusive_and_protected_inputs_unchanged(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "fixture-only.json"
            exporter._write_exclusive(path, b'{"fixtureOnly":true}\n', [])
            with self.assertRaises(FileExistsError):
                exporter._write_exclusive(path, b"replacement", [])
            self.assertEqual(path.read_bytes(), b'{"fixtureOnly":true}\n')
            with self.assertRaises(exporter.ExportError):
                exporter._write_exclusive(path, b"replacement", [path])

    def test_production_cli_rejects_absent_pinned_sources_without_output(self):
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory) / "must-not-exist.json"
            result = subprocess.run([sys.executable, str(SCRIPT), "--repo-root", directory,
                                     "--out", str(output)], capture_output=True, timeout=5)
            self.assertEqual(result.returncode, 1)
            self.assertIn(b"F6c data export rejected", result.stderr)
            self.assertFalse(output.exists())


if __name__ == "__main__":
    unittest.main()
