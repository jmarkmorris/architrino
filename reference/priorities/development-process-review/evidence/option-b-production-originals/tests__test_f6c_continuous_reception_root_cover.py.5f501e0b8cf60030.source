"""Independent closed-form/negative controls; NO real F6c rows or EOM calls.

Positive row plumbing uses eight explicitly artificial stationary histories.
Their exact distances and factors are known without the comparison instrument.
It never produces a production accepted receipt or consumes real F6c inputs.
"""
from contextlib import ExitStack, redirect_stdout
from copy import deepcopy
from decimal import Decimal
from fractions import Fraction as F
import hashlib
import importlib.util
import io
import json
import os
from pathlib import Path
import subprocess
import sys
import tempfile
import time
import unittest
from unittest.mock import patch

SOURCE = Path(__file__).resolve().parents[1]/"scripts/eom/verify-f6c-continuous-reception-root-cover.py"
SPEC = importlib.util.spec_from_file_location("independent_f6c_cover", SOURCE)
V = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(V)


def token(value):
    value = F(value)
    # Controls only use terminating rationals here; no subject serialization.
    return str(Decimal(value.numerator)/Decimal(value.denominator))


def interval(lo, hi=None):
    return {"lower": token(lo), "upper": token(lo if hi is None else hi), "precision": 90}


def segment(start, end, x=0, *, coefficients=None, ex="0", ev="0"):
    return {"startTime": token(start), "endTime": token(end),
            "coefficients": coefficients or [[token(x), "0", "0", "0"], ["0"]*4, ["0"]*4],
            "positionError": ex, "velocityError": ev,
            "positionErrors": [ex]*3, "velocityErrors": [ev]*3}


def fixture():
    histories = [{"id": label, "coverageStart": "-8", "coverageEnd": "0.13",
                  "segments": [segment(-8, 0, F(i*3, 10)), segment(0, F(13, 100), F(i*3, 10))]}
                 for i, label in enumerate(V.IDS)]
    mapping = [{"historyDigest": hashlib.sha256(h["id"].encode()).hexdigest()} for h in histories]
    rows, pieces = [], []
    for i in range(8):
        for j in range(8):
            index = len(rows)
            row = {"rowIndex": index, "cellIndex": 0, "receiverIndex": i, "transmitterIndex": j,
                   "receiverId": histories[i]["id"], "transmitterId": histories[j]["id"],
                   "reception": interval(0, F(1, 1000)), "emission": None,
                   "ordinaryRootsPerReception": 0 if i == j else 1,
                   "coincidentEndpointExcluded": i == j,
                   "oldestResidual": None, "lowerFaceResidual": None, "upperFaceResidual": None,
                   "displacement": None, "distance": None, "transmitterFactor": None, "receiverFactor": None,
                   "receiverPieceRecord": None, "transmitterPieceRecord": None,
                   "rootFreeComplementConditional": True, "retainedBoundaryContact": False,
                   "libraryFlags": deepcopy(V.FALSE_FLAGS)}
            if i != j:
                dx, distance = F((i-j)*3, 10), F(abs(i-j)*3, 10)
                row.update(emission=interval(-8, -F(1, 20)),
                           oldestResidual=interval(distance-F(8001, 1000), distance-8),
                           lowerFaceResidual=interval(distance-F(8001, 1000), distance-8),
                           upperFaceResidual=interval(distance-F(51, 1000), distance-F(1, 20)),
                           displacement=[interval(dx), interval(0), interval(0)], distance=interval(distance),
                           transmitterFactor=interval(1), receiverFactor=interval(1))
                for role, member in (("receiver", i), ("transmitter", j)):
                    receiver = role == "receiver"
                    # Exact closed-form coverage: receiver includes old endpoint
                    # singleton AND new piece; transmitter touches only old piece.
                    raw = b"0\t0\t0\n1\t0\t1/1000\n" if receiver else b"0\t-8\t-1/20\n"
                    pindex = len(pieces)
                    row[role+"PieceRecord"] = pindex
                    pieces.append({"recordIndex": pindex, "rowIndex": index, "role": role,
                                   "memberId": histories[member]["id"], "historyDigest": mapping[member]["historyDigest"],
                                   "requestedInterval": interval(0, F(1, 1000)) if receiver else interval(-8, -F(1, 20)),
                                   "touchedPieceCount": 2 if receiver else 1, "firstIndex": 0,
                                   "lastIndex": 1 if receiver else 0, "contiguousIndexRange": [0, 1 if receiver else 0],
                                   "clippedPiecesSha256": hashlib.sha256(raw).hexdigest()})
            rows.append(row)
    return rows, pieces, histories, [(F(0), F(1, 1000))], mapping


class AlgebraTests(unittest.TestCase):
    def test_signed_sqrt_comparisons(self):
        for x, q, le, ge in [(-1, 0, True, False), (0, 0, True, True), (1, 2, True, False),
                              (2, 2, False, True), (3, 9, True, True), (-3, 9, True, False)]:
            self.assertEqual(V.le_sqrt(F(x), F(q)), le)
            self.assertEqual(V.sqrt_le(F(q), F(x)), ge)
        with self.assertRaises(ValueError): V.le_sqrt(F(1), F(-1))

    def test_irrational_face_containment_without_sqrt(self):
        d = ((F(1), F(1)), (F(1), F(1)), (F(0), F(0)))
        V.check_face(interval(F(2, 5), F(3, 2)), d, (F(0), F(1)), "positive")
        V.check_face(interval(-2, -F(1, 2)), d, (F(2), F(3)), "negative")
        for bad in (interval(F(1, 2), F(3, 2)), interval(F(2, 5), F(7, 5))):
            with self.assertRaises(ValueError): V.check_face(bad, d, (F(0), F(1)), "positive")

    def test_non_strict_face_is_rejected(self):
        d = ((F(1), F(1)), (F(0), F(0)), (F(0), F(0)))
        with self.assertRaises(ValueError): V.check_face(interval(0, 1), d, (F(0), F(1)), "positive")

    def test_distance_nonempty_is_not_vacuous(self):
        d = ((F(1), F(1)), (F(1), F(1)), (F(0), F(0)))
        self.assertEqual(V.check_distance(interval(F(7, 5), F(3, 2)), d, (F(1, 2), F(3))), (F(7, 5), F(3, 2)))
        for delay in ((F(3), F(4)), (F(0), F(1))):
            with self.assertRaisesRegex(ValueError, "empty independent"):
                V.check_distance(interval(F(1, 100), 100), d, delay)
        small = ((F(1, 10), F(1, 10)), (F(0), F(0)), (F(0), F(0)))
        with self.assertRaisesRegex(ValueError, "empty independent"):
            V.check_distance(interval(F(1, 100), 100), small, (F(0), F(3)))

    def test_distance_containment_catches_both_ends(self):
        d = ((F(1), F(1)), (F(1), F(1)), (F(0), F(0)))
        for bad in (interval(F(3, 2), 2), interval(1, F(7, 5)), interval(0, 2)):
            with self.assertRaises(ValueError): V.check_distance(bad, d, (F(1, 2), F(3)))

    def test_validated_distance_factor_composition(self):
        d = ((F(1), F(1)), (F(0), F(0)), (F(0), F(0)))
        velocity = ((F(1, 10), F(1, 10)), (F(0), F(0)), (F(0), F(0)))
        V.check_factor(interval(F(92, 100), F(94, 100)), d, (F(7, 5), F(3, 2)), velocity, transmitter=True)
        with self.assertRaises(ValueError):
            V.check_factor(interval(F(93, 100)), d, (F(7, 5), F(3, 2)), velocity)
        with self.assertRaises(ValueError): V.divide_positive((F(1), F(2)), (F(0), F(1)))

    def test_bernstein_cubic_and_derivative_closed_forms(self):
        s = segment(0, 1, coefficients=[["0", "0", "0", "1"], ["0", "-1", "1", "0"], ["0"]*4])
        p, v = V.bernstein_piece(s, F(0), F(1))
        self.assertEqual(p, ((F(0), F(1)), (-F(1, 3), F(0)), (F(0), F(0))))
        self.assertEqual(v, ((F(0), F(3)), (-F(1), F(1)), (F(0), F(0))))

    def test_shifted_piece_and_nonzero_radii(self):
        s = segment(-2, 2, coefficients=[["1", "2", "3", "4"], ["0"]*4, ["0"]*4], ex="0.1", ev="0.2")
        p, v = V.bernstein_piece(s, F(0), F(0))
        self.assertEqual(p[0], (F(49)-F(1, 10), F(49)+F(1, 10)))
        self.assertEqual(v[0], (F(62)-F(1, 5), F(62)+F(1, 5)))

    def test_generic_rational_polynomial_controls(self):
        for offset in range(-3, 4):
            coeff = [F(offset, 7), F(2-offset, 5), F(offset+1, 3), F(1-offset, 11)]
            # Independent exact polynomial evaluation at rational points checks
            # generic conversion algebra; the Bernstein theorem proves continuum.
            strings = [str(Decimal(c.numerator)/Decimal(c.denominator)) for c in coeff]
            exact = list(map(F, strings))
            s = segment(-2, 2, coefficients=[strings, ["0"]*4, ["0"]*4])
            p, v = V.bernstein_piece(s, F(-1), F(1))
            for k in range(21):
                u = F(1)+F(k, 10)
                value = sum(exact[n]*u**n for n in range(4))
                slope = sum(n*exact[n]*u**(n-1) for n in range(1, 4))
                self.assertTrue(p[0][0] <= value <= p[0][1])
                self.assertTrue(v[0][0] <= slope <= v[0][1])

    def test_closed_join_singletons_are_included(self):
        h = fixture()[2][0]
        state = V.state_box(h, (F(0), F(1, 1000)))
        self.assertEqual(state["touchedPieceCount"], 2)
        self.assertEqual(state["clippedPiecesSha256"], hashlib.sha256(b"0\t0\t0\n1\t0\t1/1000\n").hexdigest())
        point = V.state_box(h, (F(0), F(0)))
        self.assertEqual(point["clippedPiecesSha256"], hashlib.sha256(b"0\t0\t0\n1\t0\t0\n").hexdigest())

    def test_gap_is_not_hulled_over(self):
        h = fixture()[2][0]; h["segments"][1]["startTime"] = "0.0001"
        with self.assertRaises(ValueError): V.state_box(h, (F(0), F(1, 1000)))


class RowContractTests(unittest.TestCase):
    def test_explicitly_synthetic_full_cell_never_grants_acceptance(self):
        result = V.compare_rows(*fixture())
        self.assertIs(result["accepted"], False)
        self.assertEqual((result["pairCellCertificates"], result["ordinaryNonselfRows"], result["selfExclusionRows"], result["pieceRecordCount"]), (64, 56, 8, 112))
        self.assertEqual(result["recordedGeometryPieceVisits"], 168)

    def test_missing_extra_reordered_rows(self):
        for mode in ("missing", "extra", "reordered"):
            rows, *rest = fixture()
            if mode == "missing": rows.pop()
            elif mode == "extra": rows.append(deepcopy(rows[-1]))
            else: rows[1], rows[2] = rows[2], rows[1]
            with self.assertRaises(ValueError): V.compare_rows(rows, *rest)

    def test_piece_identity_hash_count_and_singleton_mutations(self):
        for key, value in (("clippedPiecesSha256", "0"*64), ("touchedPieceCount", 1), ("firstIndex", 1),
                           ("rowIndex", 2), ("role", "transmitter"), ("historyDigest", "f"*64), ("contiguousIndexRange", [1, 1])):
            args = fixture(); args[1][0][key] = value
            with self.assertRaises(ValueError): V.compare_rows(*args)

    def test_extra_missing_piece_records(self):
        for extra in (False, True):
            args = fixture()
            if extra: args[1].append(deepcopy(args[1][-1]))
            else: args[1].pop()
            with self.assertRaises(ValueError): V.compare_rows(*args)

    def test_trailing_null_and_null_plus_tail_are_not_eof(self):
        for stream_index in (0, 1):
            for tail in (b"null\n", b'null\n{"unexpected":true}\n'):
                with self.subTest(stream=stream_index, tail=tail), tempfile.TemporaryDirectory() as tmp:
                    args = fixture()
                    streams = [b"".join(json.dumps(row).encode()+b"\n" for row in args[i]) for i in (0, 1)]
                    streams[stream_index] += tail
                    paths = [Path(tmp)/"rows", Path(tmp)/"pieces"]
                    for p, raw in zip(paths, streams): p.write_bytes(raw)
                    with V.BoundFile(paths[0], hashlib.sha256(streams[0]).hexdigest(), capture=False) as rows:
                        with V.BoundFile(paths[1], hashlib.sha256(streams[1]).hexdigest(), capture=False) as pieces:
                            with self.assertRaises(ValueError):
                                V.compare_rows(rows.records(), pieces.records(), *args[2:])
                    self.assertIsNone(rows.fd)
                    self.assertIsNone(pieces.fd)

    def test_both_valid_streams_reach_terminal_validation(self):
        for stream_index in (0, 1):
            args = list(fixture())
            def terminal_failure(original):
                yield from original
                raise ValueError("synthetic terminal hash mismatch")
            args[stream_index] = terminal_failure(args[stream_index])
            with self.assertRaisesRegex(ValueError, "synthetic terminal hash mismatch"):
                V.compare_rows(*args)

    def test_row_numerical_and_claim_mutations(self):
        mutations = [("emission", interval(-8, -F(1, 10))), ("upperFaceResidual", interval(0, 1)),
                     ("oldestResidual", interval(-10, -9)), ("distance", interval(F(31, 100))),
                     ("transmitterFactor", interval(F(99, 100))), ("receiverFactor", interval(F(99, 100))),
                     ("rootFreeComplementConditional", False), ("retainedBoundaryContact", True),
                     ("ordinaryRootsPerReception", True), ("receiverPieceRecord", 1)]
        for key, value in mutations:
            args = fixture(); args[0][1][key] = value
            with self.subTest(key=key), self.assertRaises(ValueError): V.compare_rows(*args)

    def test_authority_flags_and_self_geometry(self):
        for flag in V.FALSE_FLAGS:
            args = fixture(); args[0][1]["libraryFlags"][flag] = True
            with self.assertRaises(ValueError): V.compare_rows(*args)
        args = fixture(); args[0][0]["distance"] = interval(1)
        with self.assertRaises(ValueError): V.compare_rows(*args)
        with self.assertRaises(ValueError): V.false_flags({k: 0 for k in V.FALSE_FLAGS})

    def test_unknown_field_and_wrong_member(self):
        for key, value in (("unexpected", 0), ("transmitterId", "not-the-member")):
            args = fixture(); args[0][1][key] = value
            with self.assertRaises(ValueError): V.compare_rows(*args)


class ManifestTests(unittest.TestCase):
    def contract(self):
        contract = {"declarationSha256": V.DECLARATION_SHA, "verifierSha256": "a"*64,
                    "scope": "pilot-cell-0", "subjectSourceBindings": [{"path": "fixture-subject.py", "sha256": "b"*64, "bytes": 1}],
                    "runtimeBindings": [{"path": "/fixture-runtime", "sha256": "c"*64, "bytes": 2}]}
        launch = {"path": "/fixture-plan", "sha256": "d"*64, "bytes": 3}
        mapping = [{"id": label, "pathKey": i+1, "polarity": 1 if i % 2 == 0 else -1,
                    "originalHistoryFingerprint": "fixture", "historyDigest": hashlib.sha256(label.encode()).hexdigest()}
                   for i, label in enumerate(V.IDS)]
        cells = [(F(0), F(1, 1000))]
        manifest = {"schema": V.SCHEMA, "scope": "pilot-cell-0", "status": "conditional_complete", "accepted": False,
                    "fixedBindings": [{"id": i, "path": p, "sha256": h} for i, p, h in V.FIXED],
                    "launchPlan": launch, "subjectSourceBindings": deepcopy(contract["subjectSourceBindings"]),
                    "runtimeBindings": deepcopy(contract["runtimeBindings"]), "members": mapping,
                    "knotSha256": V.KNOT_SHA, "retainedDomain": interval(-8, F(13, 100)),
                    "receptionDomain": interval(0, F(1, 1000)), "precision": 90,
                    "speedUpper": ["0.85"]*8,
                    "clearanceLower": [["0" if i == j else "0.27" for j in range(8)] for i in range(8)],
                    "cellCount": 1, "rowCount": 64, "ordinaryNonselfRows": 56, "selfExclusionRows": 8,
                    "pieceRecordCount": 112, "rows": {"path": "/fixture-rows", "sha256": "e"*64, "bytes": 1},
                    "pieces": {"path": "/fixture-pieces", "sha256": "f"*64, "bytes": 2}, "libraryFlags": deepcopy(V.FALSE_FLAGS)}
        return manifest, contract, launch, deepcopy(mapping), cells

    def test_schema_only_synthetic_control_has_no_file_authority(self):
        self.assertEqual(V.validate_manifest(*self.contract()), 1)

    def test_closed_manifest_keys_counts_and_authority(self):
        for key, value in (("accepted", True), ("rowCount", 63), ("ordinaryNonselfRows", 55),
                           ("pieceRecordCount", 111), ("cellCount", True), ("unexpected", 0), ("precision", 80)):
            args = self.contract(); args[0][key] = value
            with self.subTest(key=key), self.assertRaises(ValueError): V.validate_manifest(*args)

    def test_source_grid_and_original_mapping_mutations(self):
        for mutation in ("source", "runtime", "fixed", "grid", "member", "boolean-member"):
            args = self.contract(); manifest = args[0]
            if mutation == "source": manifest["subjectSourceBindings"][0]["sha256"] = "0"*64
            elif mutation == "runtime": manifest["runtimeBindings"][0]["bytes"] = 3
            elif mutation == "fixed": manifest["fixedBindings"][0]["sha256"] = "0"*64
            elif mutation == "grid": manifest["knotSha256"] = "0"*64
            elif mutation == "member": manifest["members"][0]["historyDigest"] = "0"*64
            else: manifest["members"][0]["pathKey"] = True
            with self.subTest(mutation=mutation), self.assertRaises(ValueError): V.validate_manifest(*args)

    def test_scope_simplified_bounds_and_authority_flags(self):
        for mutation in ("scope", "speed", "clearance", "diagonal", "flags", "contract"):
            args = self.contract(); manifest = args[0]
            if mutation == "scope": manifest["scope"] = "full"
            elif mutation == "speed": manifest["speedUpper"][0] = "0.9"
            elif mutation == "clearance": manifest["clearanceLower"][0][1] = "0.26"
            elif mutation == "diagonal": manifest["clearanceLower"][0][0] = "0.27"
            elif mutation == "flags": manifest["libraryFlags"]["execution_authorized"] = True
            else: args[1]["declarationSha256"] = "0"*64
            with self.subTest(mutation=mutation), self.assertRaises(ValueError): V.validate_manifest(*args)

    def test_digest_is_only_independent_serialization_identity(self):
        h = {"id": "fixture", "segments": [segment(0, 1, 2)]}
        tokens = ["fixture", "0", "1", "2", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "90"]
        self.assertEqual(V.original_history_digest(h), hashlib.sha256("\n".join(tokens).encode()).hexdigest())


class BoundaryTests(unittest.TestCase):
    def test_strict_json_exact_tokens(self):
        for raw in (b'{"a":1,"a":2}', b'{"a":NaN}', b'{"a":1.2}', b'"\xff"'):
            with self.assertRaises((ValueError, UnicodeError)): V.decode(raw)
        for token_value in (1, True, "NaN", "Infinity", "0.1junk", "1e1001"):
            with self.assertRaises(ValueError): V.number(token_value)
        self.assertEqual(V.number("-1.25e-3"), -F(1, 800))

    def test_bounded_regular_descriptor_and_original_stream(self):
        with tempfile.TemporaryDirectory() as tmp:
            p = Path(tmp)/"rows"; raw = b'{"value":"0"}\n'; p.write_bytes(raw)
            with V.BoundFile(p, hashlib.sha256(raw).hexdigest(), capture=False) as b:
                self.assertEqual(list(b.records()), [{"value": "0"}]); b.recheck()
            with self.assertRaises(ValueError):
                with V.BoundFile(p, "0"*64): pass
            with self.assertRaises(ValueError):
                with V.BoundFile(p, hashlib.sha256(raw).hexdigest(), limit=1): pass

    def test_fifo_and_symlink_are_rejected(self):
        with tempfile.TemporaryDirectory() as tmp:
            fifo = Path(tmp)/"fifo"; os.mkfifo(fifo)
            start = time.monotonic()
            with self.assertRaises(ValueError):
                with V.BoundFile(fifo, "0"*64): pass
            self.assertLess(time.monotonic()-start, 1)
            real = Path(tmp)/"file"; real.write_bytes(b"x")
            link = Path(tmp)/"link"; link.symlink_to(real)
            with self.assertRaises(OSError):
                with V.BoundFile(link, hashlib.sha256(b"x").hexdigest()): pass

    def test_path_replacement_and_content_drift(self):
        with tempfile.TemporaryDirectory() as tmp:
            p = Path(tmp)/"input"; p.write_bytes(b"a")
            with V.BoundFile(p, hashlib.sha256(b"a").hexdigest()) as b:
                replacement = Path(tmp)/"replacement"; replacement.write_bytes(b"a"); os.replace(replacement, p)
                with self.assertRaises(ValueError): b.recheck()
            with V.BoundFile(p, hashlib.sha256(b"a").hexdigest()) as b:
                p.write_bytes(b"b")
                with self.assertRaises(ValueError): b.recheck()

    def test_ndjson_partial_extra_blank_and_oversize(self):
        for raw in (b'{"a":1}', b'\n', b'{"a":"'+b'x'*V.MAX_LINE+b'"}\n'):
            with tempfile.TemporaryDirectory() as tmp:
                p = Path(tmp)/"rows"; p.write_bytes(raw)
                with V.BoundFile(p, hashlib.sha256(raw).hexdigest(), capture=False) as b:
                    with self.assertRaises(ValueError): list(b.records())

    def test_publication_is_exclusive_and_timed(self):
        with tempfile.TemporaryDirectory() as tmp:
            out = Path(tmp)/"report.json"
            b = V.publish(out, {"accepted": False, "testOnly": True}, time.monotonic()+10)
            self.assertEqual(b["sha256"], hashlib.sha256(out.read_bytes()).hexdigest())
            with self.assertRaises(FileExistsError): V.publish(out, {}, time.monotonic()+10)
            with self.assertRaises(ValueError): V.publish(Path(tmp)/"late", {}, time.monotonic()-1)

    def test_late_cleanup_cannot_admit_success(self):
        clock = [0.0]; stdout = io.StringIO()
        with patch.object(V.time, "monotonic", side_effect=lambda: clock[0]), redirect_stdout(stdout):
            with ExitStack() as cleanup:
                cleanup.callback(lambda: clock.__setitem__(0, 2.0))
                publication = {"testOnly": True}
            with self.assertRaisesRegex(ValueError, "final comparison deadline"):
                V.admit_completion(publication, 0, 1)
        self.assertEqual(stdout.getvalue(), "")

    def test_late_success_write_cannot_return_normally(self):
        clock = [0.0]
        def delayed_print(*_args, **_kwargs): clock[0] = 2.0
        with patch.object(V.time, "monotonic", side_effect=lambda: clock[0]), patch("builtins.print", side_effect=delayed_print):
            with self.assertRaisesRegex(ValueError, "completion-publication deadline"):
                V.admit_completion({"testOnly": True}, 0, 1)

    def test_cli_invalid_budget_no_actual_inputs(self):
        for budget in ("0", "1801", "nan"):
            result = subprocess.run([sys.executable, str(SOURCE), "--manifest", "missing", "--manifest-sha256", "0"*64,
                                     "--plan", "missing", "--plan-sha256", "0"*64, "--verifier-sha256", "0"*64,
                                     "--out", "/definitely-missing/f6c.json", "--budget-seconds", budget], capture_output=True, timeout=5)
            self.assertNotEqual(result.returncode, 0)
            self.assertNotIn(b'"accepted": true', result.stdout)

    def test_tiny_budget_rejected_before_any_capture(self):
        # First underflows float to zero; second rounds deadline back to began.
        for budget in ("1e-1000", "1e-100"):
            with self.subTest(budget=budget), tempfile.TemporaryDirectory() as tmp:
                argv = ["--manifest", "missing", "--manifest-sha256", "0"*64,
                        "--plan", "missing", "--plan-sha256", "0"*64,
                        "--verifier-sha256", "0"*64, "--out", str(Path(tmp)/"out.json"),
                        "--budget-seconds", budget]
                with patch.object(V, "BoundFile", side_effect=AssertionError("first capture reached")) as capture:
                    with patch.object(V.signal, "setitimer") as timer, patch.object(V.time, "monotonic", return_value=1000.0):
                        with self.assertRaises(ValueError): V.main(argv)
                        capture.assert_not_called()
                        timer.assert_not_called()


if __name__ == "__main__":
    unittest.main()
