"""Independent algebra and rejection controls; no fabricated accepted receipt.

No test runs an actual whole-manifest supplement or grants conformance to a
subject adapter. Simple polynomials test the extension theorem independently.
"""

from decimal import Decimal, localcontext
from fractions import Fraction
import json
import math
from pathlib import Path
import struct
import subprocess
import sys
import tempfile
import unittest
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from scripts.eom.oracle import f5_api_domain_conformance as api


class F5ApiDomainTests(unittest.TestCase):
    def test_ieee_thresholds_use_exact_binary64_lifts(self):
        self.assertEqual(api.POSITION_RADIUS, Fraction(*float(api.NOMINAL.POSITION_WIDTH).as_integer_ratio()))
        self.assertEqual(api.VELOCITY_RADIUS, Fraction(*float(api.NOMINAL.VELOCITY_WIDTH).as_integer_ratio()))
        reserve = Fraction((2**53 - 1)**2, 2**106)
        self.assertEqual(api.VELOCITY_THRESHOLD, reserve * api.VELOCITY_RADIUS)
        self.assertLess(api.VELOCITY_THRESHOLD, api.VELOCITY_RADIUS)
        # A bound can fit the nominal decimal width yet fail the true carrier.
        self.assertNotEqual(api.POSITION_RADIUS, Fraction(api.NOMINAL.POSITION_WIDTH))

    def test_exact_threshold_is_not_replaced_by_rounded_display(self):
        lower = api.VELOCITY_THRESHOLD
        excess = lower + Fraction(1, 10**120)
        with localcontext() as context:
            context.prec = 6
            self.assertEqual(Decimal(lower.numerator) / Decimal(lower.denominator),
                             Decimal(excess.numerator) / Decimal(excess.denominator))
            self.assertGreater(excess, api.VELOCITY_THRESHOLD)

    def test_expansion_contains_exact_decimal_not_just_parsed_carrier(self):
        domain = api.expanded_domain("0.1", "0.12")
        lo = Fraction.from_float(math.nextafter(0.1, -math.inf))
        hi = Fraction.from_float(math.nextafter(0.12, math.inf))
        self.assertEqual(Fraction(domain["lo"]), lo)
        self.assertEqual(Fraction(domain["hi"]), hi)
        self.assertEqual(domain["delta"], max(Fraction(1, 10) - lo, hi - Fraction(3, 25)))
        self.assertEqual(domain["parsedEndpointBits"], [struct.pack(">d", t).hex() for t in (0.1, 0.12)])

    def test_expansion_is_exact_even_with_low_ambient_decimal_precision(self):
        with localcontext() as context:
            context.prec = 3
            domain = api.expanded_domain("-1", "-0.9800062096544188")
        expected_lo = Fraction(-1) - Fraction(1, 2**52)
        self.assertEqual(Fraction(domain["lo"]), expected_lo)
        self.assertEqual(domain["delta"], max(
            Fraction(-1) - expected_lo,
            Fraction(domain["hi"]) - Fraction("-0.9800062096544188")))

    def test_expansion_negative_and_zero_crossing(self):
        domain = api.expanded_domain("-0.01", "0.01")
        self.assertLess(domain["lo"], Decimal("-0.01"))
        self.assertGreater(domain["hi"], Decimal("0.01"))
        zero = api.expanded_domain("0", "0.01")
        self.assertEqual(Fraction(zero["lo"]), -Fraction(1, 2**1074))

    def test_bad_or_collapsed_domain_rejected(self):
        for a, b in (("0.1", "0.1"), ("1", "0"), ("NaN", "2"),
                     ("1", "1.0000000000000000000001"), ("-1e400", "1")):
            with self.subTest(a=a, b=b), self.assertRaises((ValueError, OverflowError)):
                api.expanded_domain(a, b)

    def test_cubic_second_derivative_uses_local_exact_origin(self):
        # q=1-2s+3s^2-4s^3 => q''=6-24s in [-6,0] for s in [1/4,1/2].
        value = api.cubic_second_derivative(["1", "-2", "3", "-4"], api.Interval.bounds("0.25", "0.5", 96))
        self.assertEqual(Fraction(value.lower), -6)
        self.assertEqual(Fraction(value.upper), 0)

    def test_two_integrals_match_independent_quadratic_error(self):
        # e(s)=1/7+(2/9)s+(3/11)s^2 on an outward interval [0,1/13].
        dx, dv, delta, accel = Fraction(1, 7), Fraction(2, 9), Fraction(1, 13), Fraction(6, 11)
        ex, ev = api.extend_axis_bounds(dx, dv, dx, dv, delta, accel)
        self.assertEqual(ex, Fraction(1, 7) + Fraction(2, 117) + Fraction(3, 1859))
        self.assertEqual(ev, Fraction(2, 9) + Fraction(6, 143))
        # Independent evaluations over rational grid points satisfy both bounds.
        for index in range(14):
            s = Fraction(index, 169)
            self.assertLessEqual(dx + dv * s + Fraction(3, 11) * s*s, ex)
            self.assertLessEqual(dv + Fraction(6, 11) * s, ev)

    def test_nominal_bound_is_not_lost_when_sliver_is_smaller(self):
        ex, ev = api.extend_axis_bounds(Fraction(10), Fraction(20), Fraction(1),
                                        Fraction(2), Fraction(1, 1000), Fraction(3))
        self.assertEqual((ex, ev), (10, 20))

    def test_extension_rejects_invalid_or_inexact_inputs(self):
        valid = [Fraction(1)] * 6
        for index in range(6):
            values = valid.copy()
            values[index] = -Fraction(1)
            with self.assertRaises(ValueError):
                api.extend_axis_bounds(*values)
        with self.assertRaises(ValueError):
            api.extend_axis_bounds(1.0, *valid[1:])
        with self.assertRaises(ValueError):
            api.extend_axis_bounds(Fraction(1), Fraction(1), Fraction(2), *valid[3:])

    def test_real_source_axial_acceleration_is_independent_constant_control(self):
        # For this frozen member, x(t)=0.31 identically. The arbitrary test q
        # has q''=6+24*(t-a). No adapter output or positive receipt is used.
        config, _, _ = api.NOMINAL.load_frozen_sources(api.ROOT)
        operator = config["worldlines"][0]["operator"]
        segment = {"tStart": "-1", "tEnd": "-0.9800062096544188",
                   "coefficients": [["0", "0", "3", "4"], ["0"] * 4, ["0"] * 4]}
        domain = api.expanded_domain(segment["tStart"], segment["tEnd"])
        calls = []
        original = api.PROOF.f5_member_jet

        def record_call(raw, time, *, mode, order):
            calls.append((time.lower, time.upper, mode, order))
            return original(raw, time, mode=mode, order=order)

        with patch.object(api.PROOF, "f5_member_jet", side_effect=record_call):
            bound = api.sliver_second_defect(operator, segment, domain)
        self.assertEqual(len(calls), 4)
        for left, right in ((domain["lo"], domain["a"]), (domain["b"], domain["hi"])):
            for mode in api.MODES:
                self.assertIn((left, right, mode, 2), calls)
        exact_max = 6 + 24 * (Fraction(domain["hi"]) - Fraction(domain["a"]))
        self.assertGreaterEqual(Fraction(bound[0]), exact_max)
        self.assertLess(Fraction(bound[0]) - exact_max, Fraction(1, 10**90))

    def test_nominal_receipt_raw_byte_binding_precedes_self_declared_status(self):
        data = b'{"accepted":true}'
        with self.assertRaisesRegex(ValueError, "original-byte SHA"):
            api.validate_nominal_certificate(data + b"\n", api.sha256(data), {}, b"{}", [])
        with self.assertRaisesRegex(ValueError, "not an accepted"):
            api.validate_nominal_certificate(data, api.sha256(data), {}, b"{}", [])

    def test_duplicate_and_missing_nominal_fields_are_fail_closed(self):
        # These are deliberately incomplete rejection controls, not fixtures
        # representing accepted nominal evidence.
        data = b'{"accepted":true,"accepted":false}'
        with self.assertRaisesRegex(ValueError, "duplicate JSON"):
            api.validate_nominal_certificate(data, api.sha256(data), {}, b"{}", [])
        for field, value in (("accepted", False), ("h3EvidenceEligible", True),
                             ("resourceContact", True), ("failure", "limit")):
            row = {"accepted": True, "h3EvidenceEligible": False,
                   "resourceContact": False, "failure": None, field: value}
            data = json.dumps(row).encode()
            with self.assertRaisesRegex(ValueError, "not an accepted"):
                api.validate_nominal_certificate(data, api.sha256(data), {}, b"{}", [])

    def test_bounds_require_three_finite_nonnegative_exact_tokens(self):
        for values in (["0", "0"], ["0", "0", "NaN"], ["0", "0", "-1"], [0, 0, 0]):
            with self.subTest(values=values), self.assertRaises(ValueError):
                api._bounds({"positionErrorUpper": values}, "positionErrorUpper")

    def test_incomplete_census_and_binding_changes_never_become_receipts(self):
        # Deliberately impossible evidence: no member records at all. These
        # metadata-only negative controls must fail before any sliver proof.
        manifest = {"campaignId": "negative-control", "runId": "not-actual-evidence",
                    "retainedInterval": ["-1", "19.63359163663986"], "members": []}
        manifest_bytes = json.dumps(manifest).encode()
        _, _, sources = api.NOMINAL.load_frozen_sources(api.ROOT)
        rejected_metadata = {
            "accepted": True, "h3EvidenceEligible": False, "resourceContact": False,
            "failure": None, "schema": api.NOMINAL.SCHEMA,
            "status": "actual-cubic-conformance-passed",
            "historyManifestSha256": api.sha256(manifest_bytes),
            "campaignId": manifest["campaignId"], "runId": manifest["runId"],
            "normalizedFieldSpeed": "1", "retainedInterval": manifest["retainedInterval"],
            "positionWidth": api.NOMINAL.POSITION_WIDTH, "velocityWidth": api.NOMINAL.VELOCITY_WIDTH,
            "precisionDecimalDigits": 96, "proofSubcellLadder": [1, 2, 4, 8],
            "limitSeconds": 1800, "expectedMemberSegments": 12384,
            "processedMemberSegments": 12384, "sourceBindings": sources,
            "instrumentBindings": [{"path": path, "sha256": digest} for path, digest in api.ORACLE_HASHES.items()],
            "elapsedWallSeconds": 1, "memberResults": [],
        }
        data = json.dumps(rejected_metadata).encode()
        with self.assertRaisesRegex(ValueError, "twelve complete members"):
            api.validate_nominal_certificate(data, api.sha256(data), manifest, manifest_bytes, sources)
        for field, value in (("sourceBindings", []), ("instrumentBindings", []),
                             ("historyManifestSha256", "0" * 64),
                             ("processedMemberSegments", 12383), ("elapsedWallSeconds", 1800)):
            row = {**rejected_metadata, field: value}
            data = json.dumps(row).encode()
            with self.subTest(field=field), self.assertRaises(ValueError):
                api.validate_nominal_certificate(data, api.sha256(data), manifest, manifest_bytes, sources)

    def test_imported_snapshot_and_subject_hashes_are_checked_without_edits(self):
        self.assertEqual(api.NOMINAL._IMPORTED_SOURCE_BYTES,
                         {path: api.SOURCE_SNAPSHOT[path] for path in api.ORACLE_HASHES})
        original = Path.read_bytes

        def changed_source(path):
            data = original(path)
            return data + b"\n" if path == api.ROOT / api.SELF_PATH else data

        with patch.object(Path, "read_bytes", changed_source), self.assertRaisesRegex(ValueError, "instrument changed"):
            api._verify_snapshot()

        def changed_subject(path):
            data = original(path)
            return data + b"\n" if path == api.ROOT / "src/eom/src/History.cpp" else data

        with patch.object(Path, "read_bytes", changed_subject), self.assertRaisesRegex(ValueError, "subject API hash"):
            api._verify_snapshot()

    def test_output_is_create_exclusive(self):
        with tempfile.TemporaryDirectory() as temporary:
            path = Path(temporary) / "control.json"
            row = {"accepted": False, "h3EvidenceEligible": False, "testOnly": True}
            api.write_exclusive(path, row)
            original = path.read_bytes()
            with self.assertRaises(FileExistsError):
                api.write_exclusive(path, row)
            self.assertEqual(path.read_bytes(), original)

    def test_fresh_cli_rejects_missing_inputs_and_preserves_rejection_output(self):
        with tempfile.TemporaryDirectory() as temporary:
            path = Path(temporary)
            out = path / "rejected.json"
            command = [sys.executable, str(api.ROOT / api.SELF_PATH),
                       "--history-manifest", str(path / "absent-manifest.json"),
                       "--nominal-certificate", str(path / "absent-certificate.json"),
                       "--nominal-certificate-sha256", "0" * 64, "--out", str(out)]
            result = subprocess.run(command, capture_output=True, text=True, timeout=15)
            self.assertEqual(result.returncode, 1, result.stderr)
            receipt = json.loads(out.read_bytes())
            self.assertFalse(receipt["accepted"])
            self.assertFalse(receipt["h3EvidenceEligible"])
            self.assertEqual(receipt["processedMemberSegments"], 0)
            original = out.read_bytes()
            repeat = subprocess.run(command, capture_output=True, text=True, timeout=15)
            self.assertEqual(repeat.returncode, 2)
            self.assertEqual(out.read_bytes(), original)


if __name__ == "__main__":
    unittest.main()
