"""Independent exact controls; synthetic tuple fixtures are never production proof.

No accepted full manifest is transformed here and no producer exists in this
test. The structural positive has accepted=False. Exact Fraction calculations,
binary bit patterns, and known cubic values are the independent references.
"""
import copy
from contextlib import ExitStack, redirect_stdout
from fractions import Fraction as F
import hashlib
import importlib.util
import io
import json
import os
from pathlib import Path
import signal
import struct
import subprocess
import sys
import tempfile
import time
import unittest
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "scripts/eom/verify-f5-prehistory-restriction.py"
spec = importlib.util.spec_from_file_location("f5_restriction_reference", SOURCE)
reference = importlib.util.module_from_spec(spec)
spec.loader.exec_module(reference)


def decimal_integer_scale(value, denominator=10000):
    """Fixture decimals by integer formatting, without reference arithmetic."""
    negative = value < 0
    a, b = divmod(abs(value), denominator)
    return ("-" if negative else "") + str(a) + ("." + str(b).zfill(4).rstrip("0") if b else "")


def synthetic_full():
    # 50 * .0199 gives -.005; piece 50 crosses zero. This is NOT F5 data.
    segments = [{"index": j, "tStart": decimal_integer_scale(-10000 + 199*j),
                 "tEnd": decimal_integer_scale(-10000 + 199*(j+1)),
                 "coefficients": [["1", "2", "3", "4"], ["-1", "0", "0", "0"], ["0", "-2", "1", "0"]],
                 "positionErrors": ["0.1"]*3, "velocityErrors": ["0.2"]*3}
                for j in range(1032)]
    return {"campaignId": "synthetic-only", "runId": "not-a-run", "normalizedFieldSpeed": "1",
            "retainedInterval": ["-1", "19.5368"], "maximumSegmentStep": "0.02",
            "positionWidth": "0.1", "velocityWidth": "0.2",
            "members": [{"index": i, "constituentId": f"fixture-{i}", "worldlineId": f"fixture-worldline-{i}",
                         "polarity": 1 if i % 2 == 0 else -1, "historyId": f"source-{i}",
                         "historyFingerprint": f"synthetic-provenance-{i}", "segments": segments}
                        for i in range(12)]}


def synthetic_prefix(full):
    # Test-only mechanical fixture construction; never applied to actual F5 data.
    members = []
    for old in full["members"]:
        member = {k: old[k] for k in ("index", "constituentId", "worldlineId", "polarity")}
        member["originalHistory"] = {k: old[k] for k in ("historyId", "historyFingerprint")}
        member["segments"] = copy.deepcopy(old["segments"][:51])
        member["segments"][-1]["tEnd"] = "0"
        members.append(member)
    return {"schema": "braid-program/f5-prehistory-restriction.v1",
            "sourceFullManifest": {"path": reference.FULL_PATH, "sha256": reference.FULL_SHA},
            "normalizedFieldSpeed": "1", "retainedInterval": ["-1", "0"], "releaseTime": "0",
            "maximumSegmentStep": "0.02", "positionWidth": "0.1", "velocityWidth": "0.2", "members": members}


def exact_binary_endpoint(token, upward):
    """IEEE bit-step independent of the instrument's nextafter operation."""
    value = float(F(token))
    bits = int.from_bytes(struct.pack(">d", value), "big")
    if value == 0:
        stepped = 1 if upward else (1 << 63) + 1
    else:
        stepped = bits + (1 if upward == (value > 0) else -1)
    return F.from_float(struct.unpack(">d", stepped.to_bytes(8, "big"))[0])


def finite_decimal(value):
    """Exact dyadic fraction formatting for synthetic accepted-domain controls."""
    n, d = value.numerator, value.denominator
    k = d.bit_length()-1
    assert d == 1 << k
    scaled = abs(n)*5**k
    digits = str(scaled).zfill(k+1)
    return ("-" if n < 0 else "") + (digits[:-k] + "." + digits[-k:] if k else digits)


def synthetic_receipts(full):
    common = {"accepted": True, "h3EvidenceEligible": False, "resourceContact": False, "failure": None,
              "historyManifestSha256": reference.FULL_SHA, "processedMemberSegments": 12384,
              "expectedMemberSegments": 12384,
              **{k: full[k] for k in ("campaignId", "runId", "retainedInterval", "normalizedFieldSpeed", "positionWidth", "velocityWidth")}}
    nominal = {**common, "schema": "braid-program/f5-actual-cubic-conformance.v1", "memberResults": []}
    api = {**common, "schema": "braid-program/f5-api-domain-conformance.v1", "nominalCertificateSha256": reference.NOMINAL_SHA,
           "memberResults": [], "constantInterpretations": ["source-decimal", "frozen-binary64"]}
    for member in full["members"]:
        identity = {k: member[k] for k in ("index", "worldlineId", "historyFingerprint")}
        nsegments, asegments = [], []
        for j, segment in enumerate(member["segments"]):
            nsegments.append({"index": j, "accepted": True, "positionErrorUpper": ["0.01"]*3, "velocityErrorUpper": ["0.02"]*3})
            # The instrument reads only restricted original segments; unused
            # synthetic tail records are present solely for exact census checks.
            asegments.append({"index": j, "passed": True,
                              "expandedIntervalExact": [finite_decimal(exact_binary_endpoint(segment["tStart"], False)),
                                                        finite_decimal(exact_binary_endpoint(segment["tEnd"], True))],
                              "parsedEndpointBits": [struct.pack(">d", float(F(segment[k]))).hex() for k in ("tStart", "tEnd")]})
        nominal["memberResults"].append({**identity, "segments": nsegments})
        api["memberResults"].append({**identity, "segments": asegments})
    return nominal, api


class RestrictionTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.full = synthetic_full()
        cls.prefix = synthetic_prefix(cls.full)
        cls.nominal, cls.api = synthetic_receipts(cls.full)

    def test_complete_synthetic_structure_has_no_production_authority(self):
        result = reference.compare_structure(self.prefix, self.full)
        self.assertIs(result["accepted"], False)
        self.assertTrue(result["structureConformant"])
        self.assertEqual((result["memberCount"], result["restrictedSegmentCount"], result["clippedSegmentCount"]), (12, 612, 12))
        self.assertEqual(len(result["domains"]), 612)
        self.assertNotIn("historyFingerprint", self.prefix["members"][0])

    def test_exact_closed_keys_exclude_future_strength_and_current_fingerprint(self):
        for key in ("couplingStrength", "initialState", "historyFingerprint", "future", "accepted", "evolution"):
            with self.subTest(key=key):
                altered = copy.deepcopy(self.prefix); altered[key] = None
                with self.assertRaises(ValueError): reference.compare_structure(altered, self.full)
        altered = copy.deepcopy(self.prefix)
        altered["members"][0]["historyFingerprint"] = self.full["members"][0]["historyFingerprint"]
        with self.assertRaises(ValueError): reference.compare_structure(altered, self.full)

    def test_exact_lexemes_not_only_numeric_equality(self):
        mutations = [lambda p: p["members"][0]["segments"][0]["coefficients"][0].__setitem__(0, "1.0"),
                     lambda p: p["members"][0]["segments"][0]["positionErrors"].__setitem__(0, "0.10"),
                     lambda p: p["members"][0]["segments"][0]["velocityErrors"].__setitem__(0, "2e-1"),
                     lambda p: p["members"][0]["segments"][50].__setitem__("tEnd", "0.0"),
                     lambda p: p["members"][0]["segments"][1].__setitem__("tStart", "-0.98010"),
                     lambda p: p["members"][0]["segments"][0].__setitem__("tEnd", "-0.98010"),
                     lambda p: p.__setitem__("releaseTime", "-0"),
                     lambda p: p.__setitem__("positionWidth", "0.10")]
        for i, change in enumerate(mutations):
            with self.subTest(mutation=i):
                altered = copy.deepcopy(self.prefix); change(altered)
                with self.assertRaises(ValueError): reference.compare_structure(altered, self.full)

    def test_identity_provenance_and_census_are_exact(self):
        mutations = [lambda p: p["members"].reverse(), lambda p: p["members"].pop(),
                     lambda p: p["members"][0]["segments"].pop(),
                     lambda p: p["members"][0]["segments"].append(copy.deepcopy(self.full["members"][0]["segments"][51])),
                     lambda p: p["members"][0].__setitem__("polarity", -1),
                     lambda p: p["members"][0].__setitem__("index", False),
                     lambda p: p["members"][0]["originalHistory"].__setitem__("historyFingerprint", "other"),
                     lambda p: p["sourceFullManifest"].__setitem__("path", "/absolute/not/allowed"),
                     lambda p: p["sourceFullManifest"].__setitem__("sha256", "0"*64)]
        for i, change in enumerate(mutations):
            with self.subTest(mutation=i):
                altered = copy.deepcopy(self.prefix); change(altered)
                with self.assertRaises(ValueError): reference.compare_structure(altered, self.full)

    def test_complete_api_inclusion_against_independent_bit_steps(self):
        for j in range(51):
            source = self.full["members"][0]["segments"][j]
            end = "0" if j == 50 else source["tEnd"]
            result = reference.prove_subset(source["tStart"], source["tEnd"], source["tStart"], end)
            for name, tokens in (("apiOriginal", (source["tStart"], source["tEnd"])), ("apiRestricted", (source["tStart"], end))):
                actual = [F(int(x["numerator"]), int(x["denominator"])) for x in result[name]]
                expected = [exact_binary_endpoint(tokens[0], False), exact_binary_endpoint(tokens[1], True)]
                self.assertEqual(actual, expected)
        self.assertEqual(reference.expanded("-0.005", "0")[1], F(1, 2**1074))
        self.assertEqual(self.prefix["retainedInterval"][1], "0")  # overhang is not future data

    def test_api_clipping_at_actual_endpoint_literals(self):
        # Named endpoint constants only: no actual full manifest is transformed.
        start, end = "-0.0003104827209370331", "0.019683307624644097"
        old, new = reference.expanded(start, end), reference.expanded(start, "0")
        self.assertEqual(old[0], exact_binary_endpoint(start, False))
        self.assertEqual(old[1], exact_binary_endpoint(end, True))
        self.assertEqual(old[0], new[0]); self.assertLess(new[1], old[1])
        self.assertEqual(new[1], F(1, 2**1074))

    def test_nonrestrictions_and_binary_collapse_rejected(self):
        for args in (("-1", "1", "-2", "0"), ("-1", "1", "0", "2"), ("-1", "1", "0", "0")):
            with self.assertRaises(ValueError): reference.prove_subset(*args)
        for a, b in (("1", "1.00000000000000000000001"), ("0", "1e-400"), ("-1e309", "1")):
            with self.assertRaises((ValueError, OverflowError)): reference.expanded(a, b)

    def test_exact_release_known_cubic_and_derivative(self):
        rows = reference.release_values(self.prefix, self.nominal)
        self.assertEqual(len(rows), 12)
        for row in rows:
            p = row["axes"][0]["nominalPosition"]; v = row["axes"][0]["nominalDerivative"]
            self.assertEqual(F(int(p["numerator"]), int(p["denominator"])), F(2020151, 2000000))
            self.assertEqual(F(int(v["numerator"]), int(v["denominator"])), F(20303, 10000))
            interval = row["axes"][0]["analyticPositionEnclosure"]
            self.assertEqual([F(int(x["numerator"]), int(x["denominator"])) for x in interval],
                             [F(2020151, 2000000)-F(1,100), F(2020151,2000000)+F(1,100)])

    def test_release_bounds_must_fit_original_allowances(self):
        altered = copy.deepcopy(self.nominal)
        altered["memberResults"][0]["segments"][50]["positionErrorUpper"][0] = "0.1000000000000000000001"
        with self.assertRaises(ValueError): reference.release_values(self.prefix, altered)

    def test_synthetic_receipt_interface_without_authority(self):
        self.assertIsNone(reference.validate_receipts(self.full, self.nominal, self.api))

    def test_receipt_failure_identity_domain_and_bit_poisoning(self):
        mutations = [lambda n,a: a.__setitem__("nominalCertificateSha256", "0"*64),
                     lambda n,a: n.__setitem__("accepted", False),
                     lambda n,a: n.__setitem__("resourceContact", True),
                     lambda n,a: a.__setitem__("historyManifestSha256", "0"*64),
                     lambda n,a: a.__setitem__("runId", "other"),
                     lambda n,a: n.__setitem__("processedMemberSegments", 612),
                     lambda n,a: a["memberResults"][0]["segments"][50].__setitem__("passed", False),
                     lambda n,a: a["memberResults"][0]["segments"][50]["parsedEndpointBits"].__setitem__(1, "0000000000000000"),
                     lambda n,a: a["memberResults"][0]["segments"][50]["expandedIntervalExact"].__setitem__(1, "0"),
                     lambda n,a: a["memberResults"][0].__setitem__("historyFingerprint", "other")]
        for i, change in enumerate(mutations):
            with self.subTest(mutation=i):
                n, a = copy.deepcopy((self.nominal, self.api)); change(n, a)
                with self.assertRaises(ValueError): reference.validate_receipts(self.full, n, a)

    def test_duplicate_floating_and_nonfinite_json_rejected(self):
        for raw in (b'{"x":1,"x":2}', b'{"x":0.2}', b'{"x":NaN}', b'{"x":Infinity}'):
            with self.assertRaises(ValueError): reference.decode(raw)
        self.assertEqual(reference.decode(b'{"x":"0.2","index":0}'), {"x":"0.2", "index":0})

    def test_exact_decimal_parser_and_bounds(self):
        for token in (False, 1, "NaN", "Infinity", "01", "+1", "1e4097", "1e-4097", "1"*4097):
            with self.assertRaises(ValueError): reference.number(token)
        self.assertEqual(reference.number("-1.234567890123456789e-9"), F(-1234567890123456789, 10**27))
        self.assertEqual(reference.number("0E-195"), 0)


class BindingAndPublicationTests(unittest.TestCase):
    def test_correct_original_bytes_binding_and_capture(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp)/"input.json"; raw = b'{"value":"1.00"}\n'; path.write_bytes(raw)
            with reference.BoundFile(path, hashlib.sha256(raw).hexdigest()) as bound:
                self.assertEqual(bound.data, raw); bound.recheck()
                self.assertEqual(bound.binding()["bytes"], len(raw))

    def test_hash_missing_wrong_and_nonregular_inputs_rejected(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp)/"input"; path.write_bytes(b"abc")
            for expected in (None, "not-a-hash", "0"*64):
                with self.assertRaises(ValueError):
                    with reference.BoundFile(path, expected): pass
            fifo = Path(tmp)/"fifo"; os.mkfifo(fifo)
            began = time.monotonic()
            with self.assertRaises(ValueError):
                with reference.BoundFile(fifo, "0"*64): pass
            self.assertLess(time.monotonic()-began, 1)
            with self.assertRaises(ValueError):
                with reference.BoundFile(Path(tmp), "0"*64): pass

    def test_bounded_read_symlink_and_changed_samefd(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp)/"input"; raw = b"abc"; path.write_bytes(raw); digest = hashlib.sha256(raw).hexdigest()
            with patch.object(reference, "MAX_FILE_BYTES", 2):
                with self.assertRaises(ValueError):
                    with reference.BoundFile(path, digest): pass
            symlink = Path(tmp)/"link"; symlink.symlink_to(path)
            with self.assertRaises(OSError):
                with reference.BoundFile(symlink, digest): pass
            with reference.BoundFile(path, digest) as bound:
                path.write_bytes(b"x")
                with self.assertRaises(ValueError): bound.recheck()

    def test_byte_identical_path_replacement_still_rejected(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp)/"input"; raw = b"abc"; path.write_bytes(raw)
            with reference.BoundFile(path, hashlib.sha256(raw).hexdigest()) as bound:
                replacement = Path(tmp)/"replacement"; replacement.write_bytes(raw); os.replace(replacement, path)
                with self.assertRaises(ValueError): bound.recheck()

    def test_exclusive_publication_exact_written_hash_and_no_overwrite(self):
        with tempfile.TemporaryDirectory() as tmp:
            output = Path(tmp)/"report.json"
            # Deliberately false: synthetic publication never asserts proof.
            report = {"accepted": False, "testOnly": True}
            result = reference.publish(output, report, time.monotonic()+2)
            self.assertEqual(result["sha256"], hashlib.sha256(output.read_bytes()).hexdigest())
            self.assertEqual(result["bytes"], output.stat().st_size)
            original = output.read_bytes()
            with self.assertRaises(FileExistsError): reference.publish(output, {"changed":True}, time.monotonic()+2)
            self.assertEqual(output.read_bytes(), original)
            self.assertEqual(list(Path(tmp).iterdir()), [output])

    def test_publication_deadline_and_no_temporary_debris(self):
        with tempfile.TemporaryDirectory() as tmp:
            output = Path(tmp)/"report.json"
            with self.assertRaises(ValueError): reference.publish(output, {"accepted":False}, time.monotonic()-1)
            self.assertFalse(output.exists()); self.assertEqual(list(Path(tmp).iterdir()), [])
            with patch.object(reference.time, "monotonic", side_effect=[0, 3]):
                with self.assertRaises(ValueError): reference.publish(output, {"accepted":False}, 2)
            self.assertFalse(output.exists()); self.assertEqual(list(Path(tmp).iterdir()), [])

    def test_postwrite_deadline_has_no_fresh_completion(self):
        with tempfile.TemporaryDirectory() as tmp:
            output = Path(tmp)/"report.json"
            with patch.object(reference.time, "monotonic", side_effect=[0, 1, 3]):
                with self.assertRaisesRegex(ValueError, "post-publication"):
                    reference.publish(output, {"accepted":False,"testOnly":True}, 2)
            self.assertTrue(output.exists())  # immutable incomplete attempt, not accepted by caller
            self.assertFalse(json.loads(output.read_bytes())["accepted"])

    def test_executed_source_code_matches_captured_generation(self):
        raw = SOURCE.read_bytes()
        compiled = compile(raw, reference._EXECUTING_CODE.co_filename, "exec", dont_inherit=True, optimize=sys.flags.optimize)
        self.assertEqual(compiled, reference._EXECUTING_CODE)
        changed = raw.replace(b'LIMIT = 1800', b'LIMIT = 1801')
        self.assertNotEqual(compile(changed, reference._EXECUTING_CODE.co_filename, "exec", dont_inherit=True, optimize=sys.flags.optimize), reference._EXECUTING_CODE)

    def test_cli_rejects_missing_or_existing_output_without_running_proof(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp)/"input.json"; path.write_bytes(b"{}")
            output = Path(tmp)/"existing.json"; output.write_bytes(b"preserve")
            command = [sys.executable, str(SOURCE), "--prefix", str(path), "--prefix-sha256", "0"*64,
                       "--verifier-sha256", hashlib.sha256(SOURCE.read_bytes()).hexdigest(), "--out", str(output)]
            result = subprocess.run(command, capture_output=True, timeout=2)
            self.assertEqual(result.returncode, 1)
            self.assertFalse(json.loads(result.stderr)["accepted"])
            self.assertEqual(result.stdout, b""); self.assertEqual(output.read_bytes(), b"preserve")

    def test_final_context_cleanup_overrun_withholds_success(self):
        self.assert_cleanup_overrun_withheld("context")

    def test_watchdog_teardown_overrun_withholds_success(self):
        self.assert_cleanup_overrun_withheld("watchdog")

    def assert_cleanup_overrun_withheld(self, slow_stage):
        # Synthetic finalization wiring only: all scientific checks and
        # publication are stubbed, no actual prefix is produced or evaluated.
        state = {"clock": 0, "watching": False, "closed": 0}
        test = self

        class SyntheticInput:
            def __init__(self, path, _expected):
                self.path = Path(path)
                self.data = SOURCE.read_bytes() if self.path == SOURCE else b'{"constantInterpretations":[]}'

            def __enter__(self): return self
            def recheck(self): pass
            def binding(self): return {"testOnly": True}

            def __exit__(self, *_):
                test.assertTrue(state["watching"], "deadline watch must survive input cleanup")
                state["closed"] += 1
                if state["closed"] == 5 and slow_stage == "context":
                    state["clock"] = 2

        def timer(_which, seconds, *_interval):
            state["watching"] = seconds != 0
            if seconds == 0 and slow_stage == "watchdog":
                state["clock"] = 2

        with tempfile.TemporaryDirectory() as tmp, ExitStack() as stack:
            stack.enter_context(patch.object(reference, "LIMIT", 1))
            stack.enter_context(patch.object(reference.time, "monotonic", side_effect=lambda: state["clock"]))
            stack.enter_context(patch.object(reference.signal, "setitimer", side_effect=timer))
            stack.enter_context(patch.object(reference, "BoundFile", SyntheticInput))
            stack.enter_context(patch.object(reference, "compare_structure", return_value={"accepted":False,"testOnly":True}))
            stack.enter_context(patch.object(reference, "validate_receipts", return_value=None))
            stack.enter_context(patch.object(reference, "release_values", return_value=[]))
            publication = stack.enter_context(patch.object(reference, "publish", return_value={"testOnly":True}))
            output = io.StringIO()
            with redirect_stdout(output), self.assertRaisesRegex(ValueError, "final verification deadline"):
                reference.main(["--prefix", str(Path(tmp)/"not-produced.json"), "--prefix-sha256", "0"*64,
                                "--verifier-sha256", "0"*64, "--out", str(Path(tmp)/"not-published.json")])
            publication.assert_called_once()
            self.assertEqual(state["closed"], 5)
            self.assertFalse(state["watching"])
            self.assertEqual(output.getvalue(), "")
            self.assertEqual(list(Path(tmp).iterdir()), [])


if __name__ == "__main__":
    unittest.main()
