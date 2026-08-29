"""Synthetic known-answer checks only; no F5 strength-dependent computation."""
import copy
from decimal import Decimal
import importlib.util
import json
from pathlib import Path
import subprocess
import tempfile
import unittest


ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("f5_dynamics_checker", ROOT / "scripts/eom/check-f5-evolution-dynamics.py")
checker = importlib.util.module_from_spec(spec)
spec.loader.exec_module(checker)


class F5DynamicsWrapperTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.oracle, cls.bindings = checker.load_frozen_oracle()

    def test_source_bindings_cover_frozen_transitive_math(self):
        self.assertEqual(len(self.bindings), 5)
        again, _ = checker.load_frozen_oracle()
        self.assertIsNot(again, self.oracle)

    def test_loader_rejects_modified_reference_before_import(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            folder = root / "scripts/eom/oracle"
            folder.mkdir(parents=True)
            (folder / "__init__.py").write_text("raise AssertionError('must not execute')\n")
            with self.assertRaisesRegex(ValueError, "frozen oracle changed"):
                checker.load_frozen_oracle(root)

    def test_conservative_scalar_axis_radius(self):
        value = checker.radius(["0.1", "0.02", "0.03"])
        self.assertGreaterEqual(value, Decimal("0.1"))
        self.assertGreaterEqual(value, Decimal.from_float(0.1))
        with self.assertRaises(ValueError):
            checker.radius(["0", "-1", "0"])

    def test_exact_carrier_tokens_are_not_replaced_by_float_centers(self):
        h = checker.make_history(self.oracle, "synthetic", [{"startTime": "-1", "endTime": "0",
            "coefficients": [["0.1", "0", "0", "0"], ["0", "0", "0", "0"], ["0", "0", "0", "0"]],
            "positionErrors": ["0", "0", "0"], "velocityErrors": ["0", "0", "0"]}])
        self.assertEqual(h.segments[0].coefficients[0][0], Decimal("0.1"))
        self.assertNotEqual(h.segments[0].coefficients[0][0], Decimal.from_float(0.1))

    def test_interval_comparison_demands_overlap_and_declared_delta(self):
        interval = self.oracle.DecimalInterval
        point = lambda x: interval.point(x, checker.PRECISION)
        left = interval.bounds("0", "1", checker.PRECISION)
        self.assertTrue(checker.compare_interval(left, left, Decimal("0"))["passed"])
        self.assertFalse(checker.compare_interval(point("0"), point("0.1"), Decimal("1"))["passed"])
        self.assertFalse(checker.compare_interval(left, interval.bounds("0.9", "1", checker.PRECISION), Decimal("0.01"))["passed"])

    def test_large_exact_midpoint_counterexample_does_not_round_into_pass(self):
        interval = self.oracle.DecimalInterval
        n = 10 ** 80
        left = interval.bounds(str(n), str(n + 2), checker.PRECISION)
        right = interval.bounds(str(n + 1), str(n + 3), checker.PRECISION)
        result = checker.compare_interval(left, right, Decimal("0.5"))
        self.assertTrue(result["overlap"])
        self.assertEqual(result["midpointAbsoluteDeltaRational"], {"numerator": "1", "denominator": "1"})
        self.assertFalse(result["passed"])

    def test_state_census_rejects_empty_or_missing_paths(self):
        with self.assertRaisesRegex(ValueError, "path census"):
            checker.compare_states(self.oracle, (), {}, Decimal(0), {}, ["synthetic"])
        with self.assertRaisesRegex(ValueError, "nonempty"):
            checker.compare_states(self.oracle, (), {}, Decimal(0), {}, [])

    def test_publication_deadline_and_source_identity_failure_are_rejected(self):
        with tempfile.TemporaryDirectory() as temporary:
            output = Path(temporary) / "report.json"
            calls = []
            def check():
                calls.append(1)
                if len(calls) == 2:
                    raise checker.BoundedStop("synthetic publication deadline")
            report = {"accepted": True, "status": "synthetic"}
            checker.publish_report(report, output, check)
            actual = json.loads(output.read_text())
            self.assertFalse(actual["accepted"])
            self.assertEqual(actual["status"], "publication-failed-closed")
            with self.assertRaises(FileExistsError):
                checker.publish_report(report, output, lambda: None)

    def test_synthetic_full_contract_and_wire_mutations(self):
        """Only serialization/validation: invented stationary members, never evolved."""
        declaration = json.loads((ROOT / "reference/priorities/braid-program/evidence/2026-08-27-f5-ordinary-evolution-declaration.v1.json").read_text())
        declaration["authorization"].update(approved=True, coupling="1", chargeMagnitude="1", effectiveStrength="1")
        declaration["independentDeclarationReview"] = {"syntheticOnly": True}
        common, rung = declaration["commonNumericalControls"], declaration["rungs"][-1]
        controls = {k: v for k, v in rung.items() if k != "id"}
        controls.update(useAdaptiveStepGrowth=False, farFieldEnclosureFraction="0", threadCount=1)
        finite = {k: v for k, v in common["dormantFiniteWidth"].items() if k not in ("reason", "quadratureTolerance", "quadratureMaximumDepth", "quadratureMaximumCells", "eventMaximumDepth", "eventMaximumCells")}
        allocations = {"schema": "borg_certified_budget/v1", "presetId": "synthetic-only",
            "topLevel": {"positionIncrement": common["positionIncrementBudget"], "velocityIncrement": common["velocityIncrementBudget"]},
            "controller": {"initialStep": rung["initialStep"], "minimumStep": rung["minimumStep"], "maximumStep": rung["maximumStep"], "adaptiveGrowth": False},
            "ordinary": {"rootTimeEnclosure": rung["rootTolerance"], "accelerationEnclosure": rung["accelerationTolerance"], "farFieldEnclosureFraction": "0",
                "acceptedStepPosition": rung["positionTolerance"], "acceptedStepVelocity": rung["velocityTolerance"], "correctionAccelerationResidual": rung["correctionTolerance"],
                "transmitterFactorFloor": common["transmitterFactorFloor"], "chartPolicy": "sharp", "quadratureTolerance": common["dormantFiniteWidth"]["quadratureTolerance"]},
            "finiteWidth": finite,
            "precision": {"difficultRowInitialBits": common["initialMpfrBits"], "difficultRowMaximumBits": common["maximumMpfrBits"], "deterministicReduction": "fixed-pairwise", "roundingMode": "outward"},
            "resources": {k: common[k] for k in ("rootMaximumDepth", "rootMaximumCells", "correctionIterations", "maximumStepAttempts", "maximumRejectedSteps", "workerThreads", "requestMemoryBytes")}}
        allocations["resources"].update({k: common["dormantFiniteWidth"][k] for k in ("quadratureMaximumDepth", "quadratureMaximumCells", "eventMaximumDepth", "eventMaximumCells")})
        canonical = json.dumps(allocations, sort_keys=True, separators=(",", ":"))
        budget = {"presetId": "synthetic-only", "allocations": allocations, "allocationCanonicalJson": canonical, "allocationHash": checker.sha256(canonical.encode()).hexdigest()}
        segment = {"startTime": "-1", "endTime": "0", "coefficients": [["0", "0", "0", "0"]] * 3, "positionErrors": ["0"] * 3, "velocityErrors": ["0"] * 3}
        histories = [{"pathId": "synthetic-" + str(i), "charge": "1", "stateFlags": 0, "segments": [copy.deepcopy(segment)]} for i in range(12)]
        request = {"schema": "eom_borg_shadow_request/v1", "contractId": "eom_evolution_contract/v1", "contractAmendmentIds": [], "modelBindingId": "master_eom_binding/v1", "runId": "synthetic-contract-only", "runGrade": "certified",
            "absoluteTimeInterval": {"start": "0", "end": "0.5"}, "modelControls": {"fieldSpeed": "1", "coupling": "1", "coreScale": finite["coreScale"], "selfPairs": "included-except-coincident-endpoint", "futurePathPolicy": "prohibited"},
            "numericalControls": controls, "certifiedBudget": budget, "resourceEnvelope": {"memoryBudgetBytes": common["requestMemoryBytes"], "causalHistoryRetention": None}, "histories": histories}
        code = "import {encodeNativeRequest} from './scripts/eom/BorgNativeEomProcessClient.mjs'; let text=''; for await (const chunk of process.stdin) text+=chunk; process.stdout.write(encodeNativeRequest(JSON.parse(text)));"
        encoded = subprocess.run(["node", "--input-type=module", "-e", code], input=json.dumps(request), text=True, cwd=ROOT, capture_output=True, timeout=10)
        self.assertEqual(encoded.returncode, 0, encoded.stderr)
        wire = encoded.stdout
        envelope = {"schema": "braid-program/ordinary-evolution-request-preparation.v1", "candidateId": "f5", "transportRequest": request, "wire": {"utf8": wire, "sha256": checker.sha256(wire.encode()).hexdigest()}}
        raw = {"schema": "eom_borg_native_response/v1", "runGrade": "certified", "runId": request["runId"], "fieldSpeed": "1", "coupling": "1", "coreScale": finite["coreScale"], "budgetProvenance": {"allocationHash": budget["allocationHash"]}, "acceptedEndTime": "0",
               "publishedExtensions": [{"pathId": h["pathId"], "segments": []} for h in histories]}
        handoff = {"members": [{"worldlineId": h["pathId"], "polarity": 1, "segments": [{"tStart": "-1", "tEnd": "0", **{k: segment[k] for k in ("coefficients", "positionErrors", "velocityErrors")}}]} for h in histories]}
        self.assertEqual(checker.validate_contract(declaration, envelope, raw, handoff)[1]["id"], "fine")
        for key, value in (("acceptedEndTime", "0.6"), ("runId", "unrelated"), ("coupling", "2")):
            altered = copy.deepcopy(raw)
            altered[key] = value
            with self.assertRaises(ValueError):
                checker.validate_contract(declaration, envelope, altered, handoff)
        changed = wire.replace("PATH\tsynthetic-0\t1\t", "PATH\tsynthetic-0\t2\t")
        with self.assertRaisesRegex(ValueError, "PATH"):
            checker.validate_wire(request, changed)
        changed = wire.replace("SEG\t-1\t0\t0\t", "SEG\t-1\t0\t1\t", 1)
        with self.assertRaisesRegex(ValueError, "SEG"):
            checker.validate_wire(request, changed)

    def test_unapproved_declaration_cannot_reach_scientific_oracle(self):
        declaration = {"schema": "braid-program/f5-ordinary-evolution-declaration.v1",
                       "authorization": {"approved": False}, "independentDeclarationReview": None}
        with self.assertRaisesRegex(ValueError, "authorization"):
            checker.validate_contract(declaration, {}, {}, {})

    def test_first_audit_end_is_predeclared_first_accepted_step_minimum(self):
        declaration = {"scientificConditions": {"endTime": "0.5"}, "independentDynamics": {
            "firstStepEndTime": "0.0009765625",
            "firstStepPolicy": "minimum-of-declared-target-and-first-accepted-fine-step-end; none-if-no-accepted-step"}}
        response = {"acceptedStepCount": 2, "rejectedStepCount": 1, "acceptedEndTime": "0.001",
            "stepFailures": [{"attemptedStart": "0", "attemptedEnd": "0.0009765625", "status": "rejected", "failureCode": "synthetic"},
                             {"attemptedStart": "0", "attemptedEnd": "0.00048828125", "status": "accepted", "failureCode": ""},
                             {"attemptedStart": "0.00048828125", "attemptedEnd": "0.001", "status": "accepted", "failureCode": ""}]}
        chosen, record = checker.select_first_audit_end(declaration, response)
        self.assertEqual(chosen, Decimal("0.00048828125"))
        self.assertEqual(record["firstAcceptedStep"]["attemptArrayIndex"], 1)
        response = {"acceptedStepCount": 1, "rejectedStepCount": 0, "acceptedEndTime": "0.002",
                    "stepFailures": [{"attemptedStart": "0", "attemptedEnd": "0.002", "status": "accepted", "failureCode": ""}]}
        self.assertEqual(checker.select_first_audit_end(declaration, response)[0], Decimal("0.0009765625"))
        response["acceptedStepCount"] = 0
        with self.assertRaisesRegex(ValueError, "census"):
            checker.select_first_audit_end(declaration, response)

    def test_first_audit_end_has_no_fallback_for_zero_steps_or_bad_chronology(self):
        declaration = {"scientificConditions": {"endTime": "0.5"}, "independentDynamics": {
            "firstStepEndTime": "0.0009765625",
            "firstStepPolicy": "minimum-of-declared-target-and-first-accepted-fine-step-end; none-if-no-accepted-step"}}
        response = {"acceptedStepCount": 0, "rejectedStepCount": 1, "acceptedEndTime": "0",
            "stepFailures": [{"attemptedStart": "0", "attemptedEnd": "0.0001", "status": "rejected", "failureCode": "synthetic"}]}
        self.assertIsNone(checker.select_first_audit_end(declaration, response)[0])
        response["stepFailures"][0]["attemptedStart"] = "0.00001"
        with self.assertRaisesRegex(ValueError, "chronology"):
            checker.select_first_audit_end(declaration, response)

    def test_symlink_and_oversize_inputs_rejected(self):
        with tempfile.TemporaryDirectory() as temporary:
            file = Path(temporary) / "plain"
            file.write_text("abc")
            link = Path(temporary) / "link"
            link.symlink_to(file)
            with self.assertRaises(OSError):
                checker.capture(link)
            with self.assertRaises(ValueError):
                checker.capture(file, limit=2)

    def test_frozen_oracle_static_single_body_first_step_and_snapshot(self):
        """The known acceleration is exactly zero: coincident self endpoint excluded."""
        o = self.oracle
        h = checker.make_history(o, "synthetic-static", [{"startTime": "-1", "endTime": "0",
            "coefficients": [["0", "0", "0", "0"]] * 3,
            "positionErrors": ["0"] * 3, "velocityErrors": ["0"] * 3}])
        req = o.CoupledEvolutionRequest.from_decimal_tokens(run_id="synthetic-only", path_ids=["synthetic-static"],
            initial_histories={"synthetic-static": h}, charges={"synthetic-static": "1"}, start_time="0", end_time="0.5",
            initial_step="0.0009765625", minimum_step="0.0009765625", field_speed="1", coupling="1", chart_policy="sharp",
            root_tolerance="1e-8", root_max_cells=100, root_max_depth=24)
        end = Decimal("0.0009765625")
        step = o.certify_atomic_coupled_step(req, (("synthetic-static", h),), step_index=0, start_time=Decimal(0), end_time=end)
        self.assertEqual(step.status, "accepted")
        self.assertTrue(checker.compare_states(o, step.published_histories, dict(step.published_histories), end,
            {"positionTolerance": "1e-8", "velocityTolerance": "1e-8"}, req.path_ids)["passed"])
        snapshot = o.certify_acceleration_snapshot(req, step.published_histories, end)
        self.assertEqual(snapshot.status, "certified_complete")
        for _, total in snapshot.acceleration.receiver_totals:
            self.assertTrue(all(v.lower == v.upper == 0 for v in total))
        raw = {"status": "certified_complete", "receptionTime": str(end), "rootRowCount": 1,
               "receiverTotals": [{"receiverPathId": "synthetic-static", "acceleration": [{"lower": "0", "upper": "0"}] * 3}]}
        self.assertTrue(checker.compare_snapshot(o, snapshot, raw, Decimal("1e-8"), req.path_ids)["passed"])
        altered = copy.deepcopy(raw)
        altered["receiverTotals"][0]["acceleration"][0] = {"lower": "1", "upper": "1"}
        self.assertFalse(checker.compare_snapshot(o, snapshot, altered, Decimal("1e-8"), req.path_ids)["passed"])
        self.assertFalse(checker.compare_snapshot(o, snapshot, None, Decimal("1e-8"), req.path_ids)["passed"])


if __name__ == "__main__":
    unittest.main()
