"""Separate-subject controls using artificial stationary histories only.

The positive cell is checked against closed-form distances/factors and the
unchanged, previously frozen rational comparison. No real F6c data is loaded,
no accepted production receipt is generated, and no EOM solver is called.
"""
from contextlib import ExitStack, redirect_stdout
from copy import deepcopy
from dataclasses import replace
from decimal import Decimal, localcontext
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
from types import SimpleNamespace
import unittest
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT/"scripts/eom/prepare-f6c-continuous-reception-root-cover.py"


def load(name, source):
    spec = importlib.util.spec_from_file_location(name, source)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


S = load("synthetic_f6c_cover_subject", SOURCE)
V = load("frozen_independent_f6c_cover_reference", ROOT/S.REFERENCE)


def captured():
    result = {}
    for name, key in S.MODULES:
        _, filename, digest = next(b for b in S.FIXED if b[0] == key)
        raw = (ROOT/filename).read_bytes()
        if hashlib.sha256(raw).hexdigest() != digest:
            raise AssertionError("frozen library changed: "+filename)
        result[name] = (str(ROOT/filename), raw, digest)
    return result


def originals():
    # Two exact stationary segments, not the original F6c geometry.
    return [{"id": label, "coverageStart": "-8", "coverageEnd": "0.13", "segments": [
        {"startTime": a, "endTime": b,
         "coefficients": [[str(Decimal(i)*Decimal("0.3")), "0", "0", "0"], ["0"]*4, ["0"]*4],
         "positionError": "0", "velocityError": "0", "positionErrors": ["0"]*3, "velocityErrors": ["0"]*3}
        for a, b in (("-8", "0"), ("0", "0.13"))]}
        for i, label in enumerate(S.IDS)]


def argv(budget="1"):
    return ["--plan", "missing", "--plan-sha256", "0"*64, "--consumer-sha256", "0"*64,
            "--out-dir", "/definitely-missing/f6c-pilot", "--budget-seconds", budget, "--git-binary", "/missing/git"]


class CellTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.package = S.captured_package(captured())
        cls.modules = cls.package.__enter__()
        cls.originals = originals()
        cls.histories = S.build_histories(cls.originals, cls.modules)

    @classmethod
    def tearDownClass(cls):
        cls.package.__exit__(None, None, None)

    def cell(self, *, library=None):
        rows, pieces = [], []
        modules = self.modules if library is None else {**self.modules, "continuous_reception_roots": library}
        result = S.emit_cell(self.histories, (F(0), F(1, 1000)), 0, modules, rows.append, pieces.append)
        return result, rows, pieces

    def test_actual_public_library_cell_independent_reference_and_closed_form(self):
        result, rows, pieces = self.cell()
        self.assertEqual(result, {"completedRows": 64, "pieceRecords": 112, "recordedGeometryPieceVisits": 168})
        mapping = [{"historyDigest": h.digest()} for h in self.histories]
        checked = V.compare_rows(rows, pieces, self.originals, [(F(0), F(1, 1000))], mapping)
        self.assertIs(checked["accepted"], False)
        self.assertEqual(checked["pairCellCertificates"], 64)
        for index, row in enumerate(rows):
            i, j = divmod(index, 8)
            self.assertEqual(set(row), V.ROW_KEYS)
            self.assertEqual(row["libraryFlags"], V.FALSE_FLAGS)
            if i == j:
                self.assertEqual(row["ordinaryRootsPerReception"], 0)
                self.assertIsNone(row["distance"])
            else:
                distance = F(abs(i-j)*3, 10)
                self.assertLessEqual(F(row["distance"]["lower"]), distance)
                self.assertGreaterEqual(F(row["distance"]["upper"]), distance)
                for field in ("transmitterFactor", "receiverFactor"):
                    self.assertLessEqual(F(row[field]["lower"]), 1)
                    self.assertGreaterEqual(F(row[field]["upper"]), 1)
                self.assertEqual(row["emission"], {"lower": "-8", "upper": "-0.05", "precision": 90})
        for piece in pieces: self.assertEqual(set(piece), V.PIECE_KEYS)

    def test_original_closed_endpoint_singleton_preserved(self):
        _, _, pieces = self.cell()
        self.assertEqual(pieces[0]["touchedPieceCount"], 2)
        self.assertEqual(pieces[0]["clippedPiecesSha256"], hashlib.sha256(b"0\t0\t0\n1\t0\t1/1000\n").hexdigest())
        self.assertEqual(pieces[1]["clippedPiecesSha256"], hashlib.sha256(b"0\t-8\t-1/20\n").hexdigest())

    def test_two_synthetic_cells_keep_global_row_and_piece_offsets(self):
        cells = [(F(0), F(1, 1000)), (F(1, 1000), F(1, 500))]
        rows, pieces = [], []
        for index, cell in enumerate(cells):
            result = S.emit_cell(self.histories, cell, index, self.modules, rows.append, pieces.append,
                                 row_start=len(rows), piece_start=len(pieces))
            self.assertEqual(result["completedRows"], 64*(index+1))
            self.assertEqual(result["pieceRecords"], 112*(index+1))
        mapping = [{"historyDigest": h.digest()} for h in self.histories]
        checked = V.compare_rows(rows, pieces, self.originals, cells, mapping)
        self.assertEqual(checked["pairCellCertificates"], 128)
        self.assertIs(checked["accepted"], False)

    def test_exact_original_decimal_data_and_scalar_radii(self):
        values = deepcopy(self.originals)
        s = values[0]["segments"][0]
        tokens = ["1.00000000000000000000000000000000001", "-0.123456789012345678901234567890123456", "0.0000000000000000000000003", "2e-35"]
        s["coefficients"][0] = tokens
        s["positionError"], s["velocityError"] = "0.00000000000000000000123", "0.00000000000000000000456"
        s["positionErrors"] = ["0"]*3
        with localcontext() as context:
            context.prec = 9
            segment = S.build_histories(values, self.modules)[0].segments[0]
        self.assertEqual([str(x) for x in segment.coefficients[0]], [str(Decimal(t)) for t in tokens])
        self.assertEqual(segment.position_error, Decimal(s["positionError"]))
        self.assertEqual(segment.velocity_error, Decimal(s["velocityError"]))
        self.assertEqual(segment.precision, 90)

    def test_authority_and_self_geometry_poisoning_rejected(self):
        lib = self.modules["continuous_reception_roots"]
        actual = lib.enclose_root_cover
        for mutation in ("flag", "self", "hypotheses", "failure"):
            def poisoned(*args):
                result = actual(*args)
                if mutation == "flag": return replace(result, execution_authorized=True)
                if mutation == "self":
                    row = replace(result.rows[0], distance=self.modules["decimal_interval"].DecimalInterval.point("1", 90))
                    return replace(result, rows=(row, *result.rows[1:]))
                if mutation == "hypotheses": return replace(result, hypotheses=replace(result.hypotheses))
                return replace(result, failure_code="synthetic_failure")
            with self.subTest(mutation=mutation), patch.object(lib, "enclose_root_cover", side_effect=poisoned):
                with self.assertRaises(ValueError): self.cell()

    def test_unresolved_preserves_prefix_and_original_failure(self):
        lib = self.modules["continuous_reception_roots"]; actual = lib.enclose_root_cover
        rows, pieces, error_state = [], [], {}
        def fail(*args):
            result = actual(*args)
            return replace(result, status="unresolved", rows=result.rows[:2], failure_code="fixture_unresolved", failure_detail="fixture pair stopped")
        with patch.object(lib, "enclose_root_cover", side_effect=fail), self.assertRaisesRegex(ValueError, "fixture_unresolved: fixture pair stopped"):
            S.emit_cell(self.histories, (F(0), F(1, 1000)), 0, self.modules, rows.append, pieces.append, error_state=error_state)
        self.assertEqual((len(rows), len(pieces)), (2, 2))
        self.assertEqual(error_state["activeRow"], 2)
        self.assertTrue(all(r["libraryFlags"] == V.FALSE_FLAGS for r in rows))

    def test_preflight_failure_reason_is_not_lost(self):
        lib = self.modules["continuous_reception_roots"]; actual = lib.enclose_root_cover
        def fail(*args):
            result = actual(*args)
            return replace(result, status="unresolved", rows=(), reception_cells=(), expected_rows=0,
                           failure_code="fixture_preflight", failure_detail="fixture bad digest")
        with patch.object(lib, "enclose_root_cover", side_effect=fail), self.assertRaisesRegex(ValueError, "fixture_preflight: fixture bad digest"):
            self.cell()


class CaptureTests(unittest.TestCase):
    def test_package_uses_captured_generation_not_disk_and_cleans_up(self):
        sources = captured()
        before = set(sys.modules)
        with tempfile.TemporaryDirectory() as tmp:
            copied = {}
            for name, (_, raw, digest) in sources.items():
                path = Path(tmp)/(name+".py")
                path.write_text("raise RuntimeError('wrong disk generation')\n")
                copied[name] = (str(path), raw, digest)
            with S.captured_package(copied) as modules:
                histories = S.build_histories(originals(), modules)
                rows, pieces = [], []
                S.emit_cell(histories, (F(0), F(1, 1000)), 0, modules, rows.append, pieces.append)
                self.assertEqual(len(rows), 64)
                private = {name for name in sys.modules if name.startswith("_f6c_cover_")}-before
                self.assertEqual(len(private), 4)
            self.assertTrue(private.isdisjoint(sys.modules))

    def test_package_cache_isolation_failure_cleanup_and_wrong_hash(self):
        sources = captured()
        with S.captured_package(sources) as first:
            with S.captured_package(sources) as second:
                self.assertIsNot(first["certified_history"], second["certified_history"])
                self.assertNotEqual(first["certified_history"].__name__, second["certified_history"].__name__)
        before = {name for name in sys.modules if name.startswith("_f6c_cover_")}
        bad = dict(sources); filename, raw, digest = bad["certified_history"]
        bad["certified_history"] = filename, raw, "0"*64
        with self.assertRaisesRegex(ValueError, "module hash"):
            with S.captured_package(bad): pass
        self.assertEqual(before, {name for name in sys.modules if name.startswith("_f6c_cover_")})

    def test_same_fd_capture_detects_change_and_replacement(self):
        for mode in ("modify", "replace"):
            with self.subTest(mode=mode), tempfile.TemporaryDirectory() as tmp:
                source = Path(tmp)/"source"; source.write_bytes(b"original")
                with S.PinnedInput(source, hashlib.sha256(b"original").hexdigest(), capture=True) as bound:
                    self.assertEqual(bound.data, b"original")
                    if mode == "modify": source.write_bytes(b"changed!")
                    else:
                        replacement = Path(tmp)/"new"; replacement.write_bytes(b"original")
                        os.replace(replacement, source)
                    with self.assertRaises(ValueError): bound.recheck()
                self.assertIsNone(bound.fd)

    def test_nonregular_symlink_oversize_and_wrong_hash_fail(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp); regular = root/"regular"; regular.write_bytes(b"abc")
            fifo = root/"fifo"; os.mkfifo(fifo)
            link = root/"link"; link.symlink_to(regular)
            for path, digest, limit in ((fifo, "0"*64, 10), (link, hashlib.sha256(b"abc").hexdigest(), 10),
                                        (regular, "0"*64, 10), (regular, hashlib.sha256(b"abc").hexdigest(), 2)):
                with self.subTest(path=path, limit=limit), self.assertRaises((ValueError, OSError)):
                    with S.PinnedInput(path, digest, limit=limit): pass


class ContractTests(unittest.TestCase):
    def plan(self):
        own = "1"*64
        bindings = [{"path": S.SELF, "sha256": own, "bytes": 1}]
        for _, key in S.MODULES:
            _, filename, digest = next(b for b in S.FIXED if b[0] == key)
            bindings.append({"path": filename, "sha256": digest, "bytes": 2})
        return {"comparisonContract": {"declarationSha256": S.DECLARATION_SHA, "verifierSha256": S.REFERENCE_SHA,
                "scope": "pilot-cell-0", "subjectSourceBindings": bindings,
                "runtimeBindings": [{"path": "/fixture/python", "sha256": "2"*64, "bytes": 3}]}}, own

    def test_frozen_reference_and_all_library_source_bindings(self):
        self.assertEqual(hashlib.sha256((ROOT/S.REFERENCE).read_bytes()).hexdigest(), S.REFERENCE_SHA)
        self.assertEqual(S.FIXED, V.FIXED)
        self.assertEqual(S.SCHEMA, V.SCHEMA)
        self.assertEqual(S.FALSE_FLAGS, V.FALSE_FLAGS)
        captured()
        plan, own = self.plan()
        self.assertEqual(S.validate_launch_contract(plan, "pilot-cell-0", own), plan["comparisonContract"])

    def test_full_scope_needs_matching_explicit_plan(self):
        plan, own = self.plan()
        with self.assertRaises(ValueError): S.validate_launch_contract(plan, "full", own)
        plan["comparisonContract"]["scope"] = "full"
        self.assertEqual(S.validate_launch_contract(plan, "full", own)["scope"], "full")

    def test_produced_manifest_matches_frozen_closed_contract_synthetically(self):
        plan, own = self.plan(); contract = S.validate_launch_contract(plan, "pilot-cell-0", own)
        launch = {"path": "/fixture/plan", "sha256": "3"*64, "bytes": 1}
        mapping = [{"id": label, "historyDigest": hashlib.sha256(label.encode()).hexdigest()} for label in S.IDS]
        rows = {"path": "/fixture/rows", "sha256": "4"*64, "bytes": 2}
        pieces = {"path": "/fixture/pieces", "sha256": "5"*64, "bytes": 3}
        cells = [(F(0), F(1, 1000))]
        with S.captured_package(captured()) as modules:
            manifest = S.make_manifest("pilot-cell-0", contract, launch, mapping, cells, modules, rows, pieces)
        self.assertEqual(set(manifest), V.MANIFEST_KEYS)
        self.assertEqual(V.validate_manifest(manifest, contract, launch, mapping, cells), 1)
        self.assertIs(manifest["accepted"], False)
        self.assertEqual(manifest["libraryFlags"], V.FALSE_FLAGS)

    def test_contract_rejects_unknown_missing_duplicate_and_wrong_source(self):
        for mode in ("extra", "missing", "duplicate", "wrong", "empty_runtime", "bad_bytes", "boolean_bytes"):
            plan, own = self.plan(); contract = plan["comparisonContract"]
            if mode == "extra": contract["extra"] = True
            elif mode == "missing": contract["subjectSourceBindings"].pop()
            elif mode == "duplicate": contract["subjectSourceBindings"].append(deepcopy(contract["subjectSourceBindings"][0]))
            elif mode == "wrong": contract["subjectSourceBindings"][1]["sha256"] = "0"*64
            elif mode == "empty_runtime": contract["runtimeBindings"] = []
            elif mode == "bad_bytes": contract["runtimeBindings"][0]["bytes"] = 0
            else: contract["runtimeBindings"][0]["bytes"] = True
            with self.subTest(mode=mode), self.assertRaises(ValueError): S.validate_launch_contract(plan, "pilot-cell-0", own)

    def test_exact_time_conversion_independent_of_ambient_precision(self):
        values = [F(0), -F(1, 20), F("0.099000000000000005"), F("0.10000000000000001"), F(1, 2**100), F(-7, 5**75)]
        with localcontext() as context:
            context.prec = 9
            for value in values: self.assertEqual(F(S.finite_decimal(value)), value)
        with self.assertRaises(ValueError): S.finite_decimal(F(1, 3))

    def test_json_duplicate_nonfinite_and_nonstrings_rejected(self):
        for raw in (b'{"x":1,"x":2}', b'{"x":NaN}', b'{"x":0.1}'):
            with self.assertRaises(ValueError): S.decode(raw)
        for value in (1, 0.1, "NaN", "Infinity", "1e1001", "01"):
            with self.assertRaises(ValueError): S.exact(value)

    def test_output_lane_rejects_parent_escape_symlink_and_existing_path(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp).resolve(); lane = root/".local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827"
            lane.mkdir(parents=True)
            alias = lane/"alias"; alias.symlink_to(root, target_is_directory=True)
            existing = lane/"existing"; existing.mkdir()
            with patch.object(S.subprocess, "run") as run:
                for target in (lane, lane/".."/"escape", alias/"child", existing):
                    with self.subTest(target=target), self.assertRaises(ValueError): S.check_ignored_lane(root, target, Path("/fixture/git"))
                run.assert_not_called()
            with patch.object(S.subprocess, "run", return_value=SimpleNamespace(returncode=0)) as run:
                S.check_ignored_lane(root, lane/"new", Path("/fixture/git"))
                self.assertEqual(run.call_args.kwargs["timeout"], 2)
                self.assertIs(run.call_args.kwargs["stdout"], subprocess.DEVNULL)


class PublicationTests(unittest.TestCase):
    def test_failure_census_distinguishes_row_and_operational_failures(self):
        progress = {"stage": "library-cell", "completedRows": 2, "expectedRows": 64}
        row = S.failure_report(progress, ValueError("fixture row failure"), 2)
        self.assertEqual((row["failedRows"], row["notRunRows"]), (1, 61))
        self.assertEqual(row["rowDispositions"], [
            {"from": 0, "count": 2, "disposition": "completed-conditional-row"},
            {"from": 2, "count": 1, "disposition": "failed-or-unresolved"},
            {"from": 3, "count": 61, "disposition": "not-run"}])
        for completed, total in ((0, 64), (64, 10240), (64, 64)):
            report = S.failure_report({"stage": "stream-flush", "completedRows": completed, "expectedRows": total}, OSError("fixture logging failure"))
            self.assertIsNone(report["failedRowIndex"])
            self.assertEqual(report["failedRows"], 0)
            self.assertEqual(report["notRunRows"], total-completed)
            self.assertEqual(sum(r["count"] for r in report["rowDispositions"]), total)
            self.assertIs(report["accepted"], False)

    def test_stream_original_bytes_hash_exclusive_and_bounds(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp)/"rows"
            with S.JsonlSink(path, time.monotonic()+10) as sink:
                sink.write({"accepted": False, "token": "0.0001000"}); sink.flush()
                binding = sink.binding()
            raw = path.read_bytes()
            self.assertEqual(binding["sha256"], hashlib.sha256(raw).hexdigest())
            self.assertEqual(binding["bytes"], len(raw))
            self.assertEqual(sink.count, 1)
            with self.assertRaises(FileExistsError):
                with S.JsonlSink(path, time.monotonic()+10): pass
            with S.JsonlSink(Path(tmp)/"bounded", time.monotonic()+10) as sink, patch.object(S, "MAX_BYTES", 2):
                with self.assertRaises(ValueError): sink.write({"x": 1})

    def test_manifest_create_exclusive_and_postwrite_deadline(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp)/"manifest"
            binding = S.exclusive_json(path, {"accepted": False}, time.monotonic()+10)
            self.assertEqual(binding["sha256"], hashlib.sha256(path.read_bytes()).hexdigest())
            with self.assertRaises(FileExistsError): S.exclusive_json(path, {}, time.monotonic()+10)
            with patch.object(S.time, "monotonic", side_effect=[0.0, 2.0]), self.assertRaisesRegex(ValueError, "post-manifest"):
                S.exclusive_json(Path(tmp)/"late", {"accepted": False}, 1.0)

    def test_expired_stream_flush_is_not_success(self):
        with tempfile.TemporaryDirectory() as tmp:
            with S.JsonlSink(Path(tmp)/"rows", 1.0) as sink:
                with patch.object(S.time, "monotonic", return_value=0.0): sink.write({"accepted": False})
                with patch.object(S.time, "monotonic", return_value=2.0), self.assertRaisesRegex(ValueError, "stream flush"):
                    sink.flush()

    def test_late_cleanup_and_completion_write_fail_closed(self):
        clock = [0.0]; output = io.StringIO()
        with patch.object(S.time, "monotonic", side_effect=lambda: clock[0]), redirect_stdout(output):
            with ExitStack() as cleanup: cleanup.callback(lambda: clock.__setitem__(0, 2.0))
            with self.assertRaisesRegex(ValueError, "final preparation"):
                S.admit_completion({"completed": True, "accepted": False}, 1.0)
        self.assertEqual(output.getvalue(), "")
        clock[0] = 0.0
        def slow_print(*_args, **_kwargs): clock[0] = 2.0
        with patch.object(S.time, "monotonic", side_effect=lambda: clock[0]), patch("builtins.print", side_effect=slow_print):
            with self.assertRaisesRegex(ValueError, "completion-write"):
                S.admit_completion({"completed": True, "accepted": False}, 1.0)

    def test_tiny_budget_rejected_before_capture_or_timer(self):
        for budget in ("0", "1801", "1e-1000", "1e-100"):
            with self.subTest(budget=budget), patch.object(S, "PinnedInput", side_effect=AssertionError("capture reached")) as capture:
                with patch.object(S.signal, "setitimer") as timer, patch.object(S.time, "monotonic", return_value=1000.0):
                    with self.assertRaises(ValueError): S.main(argv(budget))
                capture.assert_not_called(); timer.assert_not_called()

    def test_negative_cli_never_loads_actual_inputs(self):
        result = subprocess.run([sys.executable, str(SOURCE), *argv("0")], capture_output=True, timeout=5)
        self.assertNotEqual(result.returncode, 0)
        self.assertNotIn(b'"accepted": true', result.stdout)
        self.assertIn(b'"completed": false', result.stderr)


if __name__ == "__main__":
    unittest.main()
