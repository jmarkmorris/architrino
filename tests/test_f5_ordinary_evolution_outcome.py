"""Known-answer and hostile-input controls; no actual F5 evolution runs."""
import contextlib
import copy
from fractions import Fraction as F
from hashlib import sha256
import importlib.util
import io
import json
import math
from pathlib import Path
import random
import tempfile
import unittest
from unittest.mock import patch


SOURCE = Path(__file__).resolve().parents[1]/"scripts/eom/verify-f5-ordinary-evolution.py"
spec = importlib.util.spec_from_file_location("f5_outcome_reference", SOURCE)
ref = importlib.util.module_from_spec(spec)
spec.loader.exec_module(ref)


def segment(a, b, x="0", speed="0", error="0"):
    return {"startTime": a, "endTime": b,
            "coefficients": [[x, speed, "0", "0"], ["0"]*4, ["0"]*4],
            "positionErrors": [error]*3, "velocityErrors": [error]*3}


def decimal(q):
    """Test-only exact decimal for dyadic/fifth-denominator rationals."""
    q = F(q)
    n, d = q.numerator, q.denominator
    scale = 0
    while d != 1 and scale < 100:
        n *= 10
        common = __import__("math").gcd(n, d)
        n //= common
        d //= common
        scale += 1
    if d != 1:
        raise ValueError("nonterminating test decimal")
    sign = "-" if n < 0 else ""
    text = str(abs(n)).zfill(scale+1)
    return sign+(text[:-scale]+"."+text[-scale:] if scale else text)


def fixture():
    """Twelve artificial stationary paths with analytically known distances."""
    controls = {"center": ["0"]*3, "collapseDistance": "0.02", "separationRadius": "0.8",
                "bernsteinSubdivisions": 2, "maximumPanels": 1000,
                "comparisonTimes": ["0", "0.25", "0.5"],
                "comparisonDomainPolicy": "declared-grid-plus-common-prefix-end; unreachable-grid-explicit",
                "positionComparisonTolerance": "0.0001", "velocityComparisonTolerance": "0.0001"}
    numerical = {"initialStep": "0.5", "minimumStep": "0.5", "maximumStep": "0.5",
                 "rootTolerance": "0.000001", "accelerationTolerance": "0.000001",
                 "positionTolerance": "0.000001", "velocityTolerance": "0.000001",
                 "correctionTolerance": "0.000001", "useAdaptiveStepGrowth": False,
                 "threadCount": 1, "farFieldEnclosureFraction": "0"}
    strength = {"effectiveStrength": "0.002", "chargeMagnitude": "1", "coupling": "0.002"}
    budget = {"allocationHash": "a"*64, "allocations": {"ordinary": {"chartPolicy": "sharp"}}}
    declaration = {"schema": ref.DECLARATION_SCHEMA, "outcomeControls": controls,
                   "authorization": {"approved": False, **strength},
                   "scientificConditions": {"candidateId": "f5", "releaseTime": "0", "historyStart": "-1", "endTime": "0.5", "fieldSpeed": "1", "chartPolicy": "sharp"},
                   "rungs": [{"id": "synthetic", **{k: v for k, v in numerical.items() if k not in ("useAdaptiveStepGrowth", "threadCount", "farFieldEnclosureFraction")}}],
                   "commonNumericalControls": {"useAdaptiveStepGrowth": False, "workerThreads": 1, "farFieldEnclosureFraction": "0"}}
    handoff = {"normalizedFieldSpeed": "1", "releaseTime": "0", "retainedInterval": ["-1", "0"], "members": []}
    supplied, wire, extensions = [], [], []
    for i in range(12):
        x = decimal(F(i, 20))
        path_id = f"synthetic-{i}"
        past = [segment(decimal(F(j-51, 64)), decimal(F(j-50, 64)), x) for j in range(51)]
        past[0]["startTime"] = "-1"
        original = [{"tStart": s["startTime"], "tEnd": s["endTime"], **{k: v for k, v in s.items() if k not in ("startTime", "endTime")}} for s in past]
        member = {"index": i, "constituentId": "constituent/"+path_id, "worldlineId": path_id, "restrictedHistoryId": "history/"+path_id,
                  "historyFingerprint": "synthetic/"+path_id, "polarity": 1 if i%2 else -1, "segments": original}
        handoff["members"].append(member)
        supplied.append({"pathId": path_id, "sourceHistoryId": member["restrictedHistoryId"], "sourceFingerprint": member["historyFingerprint"], "polarity": member["polarity"], "segments": past})
        wire.append({"pathId": path_id, "charge": str(member["polarity"]), "stateFlags": 0, "segments": copy.deepcopy(past)})
        pieces = [segment(decimal(F(j, 8)), decimal(F(j+1, 8)), x) for j in range(4)]
        for s in pieces:
            s.update(evidenceStatus=ref.GRADE, claimGrade=ref.GRADE)
        extensions.append({"pathId": path_id, "stateFlags": 0, "segments": pieces})
    settings = {"endTime": "0.5", "strength": strength, "numericalControls": numerical, "certifiedBudget": budget}
    request = {"runId": "synthetic-run", "runGrade": "certified", "absoluteTimeInterval": {"start": "0", "end": "0.5"},
               "modelControls": {"fieldSpeed": "1", "coupling": "0.002", "futurePathPolicy": "prohibited", "selfPairs": "included-except-coincident-endpoint"},
               "histories": wire, "numericalControls": copy.deepcopy(numerical), "certifiedBudget": copy.deepcopy(budget), "resourceEnvelope": {"causalHistoryRetention": None}}
    prepared = {"schema": "braid-program/ordinary-evolution-request-preparation.v1", "input": {"candidateId": "f5", "releaseTime": "0", "historyCoverageStart": "-1", "histories": supplied, "settings": settings}, "transportRequest": request}
    response = {"schema": "eom_borg_native_response/v1", "runGrade": "certified", "runId": "synthetic-run", "fieldSpeed": "1", "coupling": "0.002",
                "status": "completed", "allStepsAtomic": True, "acceptedEndTime": "0.5", "acceptedStepCount": 1,
                "haltCode": "", "claimGrade": ref.GRADE, "evidenceStatus": ref.GRADE,
                "budgetProvenance": copy.deepcopy(budget), "publishedExtensions": extensions}
    response["rejectedStepCount"] = 0
    response["stepFailures"] = [{"status": "accepted", "failureCode": "", "attemptedStart": "0", "attemptedEnd": "0.5",
        "localErrors": [{"pathId": path["pathId"], "positionError": 0, "velocityError": 0,
                         "positionErrors": [0]*3, "velocityErrors": [0]*3} for path in wire]}]
    return declaration, handoff, prepared, response


class ArithmeticControls(unittest.TestCase):
    def test_exact_decimal_is_not_binary64(self):
        self.assertEqual(ref.exact("0.1"), F(1, 10))
        self.assertNotEqual(ref.exact("0.1"), F(0.1))

    def test_malformed_and_unbounded_tokens(self):
        for value in (1, 1.0, "NaN", "inf", "1e1001", "0/1", "1\n", "9"*513):
            with self.subTest(value=str(value)[:25]), self.assertRaises(ref.CheckError):
                ref.exact(value)

    def test_known_cubic_bernstein_control_hull(self):
        # 3u-3u^2 has Bernstein controls (0,1,1,0), attained max 3/4.
        self.assertEqual(ref.bernstein([F(0), F(3), F(-3), F(0)], F(0), F(1)), (0, 1))
        self.assertEqual(ref.bernstein([F(1), F(-2), F(1)], F(1), F(2)), (0, 1))

    def test_300_polynomials_against_separate_direct_sum(self):
        rng = random.Random(88231)
        for _ in range(300):
            coeff = [F(rng.randint(-100, 100), 100) for _ in range(4)]
            a = F(rng.randint(-20, 0), 7)
            b = a+F(rng.randint(1, 20), 11)
            lo, hi = ref.bernstein(coeff, a, b)
            for j in range(11):
                t = a+(b-a)*F(j, 10)
                expected = sum(c*t**k for k, c in enumerate(coeff))
                self.assertLessEqual(lo, expected)
                self.assertGreaterEqual(hi, expected)

    def test_velocity_derivative_and_error_inflation(self):
        s = segment("2", "3", error="0.1")
        s["coefficients"][0] = ["1", "2", "3", "4"]
        parsed = ref.Segment(s)
        self.assertEqual(parsed.boxes(F(3), F(3))[0], (F(99,10), F(101,10)))
        self.assertEqual(parsed.boxes(F(3), F(3), True)[0], (F(199,10), F(201,10)))

    def test_squared_norm_straddling_zero(self):
        self.assertEqual(ref.norm_squared([(F(-1),F(2)), (F(3),F(4)), (F(-5),F(-2))]), (13,45))
        self.assertEqual(ref.difference([(F(1),F(2))], [(F(3),F(5))]), [(-4,-1)])

    def test_directed_square_root_known_values_and_irrational(self):
        self.assertEqual(ref.sqrt_decimal_bounds((F(4),F(4))), {"lower":"2.000000000000000000", "upper":"2.000000000000000000"})
        box = ref.sqrt_decimal_bounds((F(2),F(2)))
        self.assertLessEqual(F(box["lower"])**2, 2)
        self.assertGreaterEqual(F(box["upper"])**2, 2)

    def test_join_error_overlap_not_nominal_equality(self):
        a = ref.Segment(segment("0", "1", "0", error="0.1"))
        b = ref.Segment(segment("1", "2", "0.15", error="0.1"))
        ref.check_join(a,b)
        with self.assertRaises(ref.CheckError):
            ref.check_join(a,ref.Segment(segment("1","2","0.25",error="0.1")))


class ProtocolControls(unittest.TestCase):
    def setUp(self):
        self.declaration, self.handoff, self.prepared, self.response = fixture()

    def reconstruct(self):
        request, initial = ref.authenticate_request(self.prepared, self.handoff, self.declaration)
        return ref.reconstruct(self.response, request, initial)

    def test_complete_known_static_census(self):
        paths, end, completed = self.reconstruct()
        result = ref.geometric_bounds(paths, end, self.declaration["outcomeControls"])
        self.assertTrue(completed)
        self.assertEqual(result["decimalBounds"]["minimumPairSeparation"], {"lower":"0.050000000000000000", "upper":"0.050000000000000000"})
        self.assertEqual(result["decimalBounds"]["maximumRadius"], {"lower":"0.550000000000000000", "upper":"0.550000000000000000"})
        self.assertTrue(result["entireIntervalAboveCollapseThreshold"])
        self.assertTrue(result["entireIntervalBelowSeparationRadius"])

    def test_changed_past_token(self):
        self.prepared["input"]["histories"][0]["segments"][0]["coefficients"][0][0] = "999"
        with self.assertRaisesRegex(ref.CheckError,"past history tokens changed"):
            self.reconstruct()

    def test_supplied_future_rejected_even_if_two_request_views_agree(self):
        for key in ("input", "transportRequest"):
            self.prepared[key]["histories"][0]["segments"][-1]["endTime"] = "0.01"
        with self.assertRaises(ref.CheckError): self.reconstruct()

    def test_different_strength_and_horizon(self):
        for key, value in (("coupling","0.003"), ("fieldSpeed","2")):
            with self.subTest(key=key):
                changed = copy.deepcopy(self.prepared)
                changed["transportRequest"]["modelControls"][key] = value
                with self.assertRaises(ref.CheckError):
                    ref.authenticate_request(changed,self.handoff,self.declaration)
        self.declaration["scientificConditions"]["endTime"] = "1"
        with self.assertRaises(ref.CheckError): self.reconstruct()

    def test_unapproved_checker_never_grants_authority(self):
        self.assertFalse(self.declaration["authorization"]["approved"])
        self.assertTrue(self.reconstruct()[2])  # Pure synthetic math remains available.

    def test_wrong_rung(self):
        self.declaration["rungs"][0]["rootTolerance"] = "0.00001"
        with self.assertRaisesRegex(ref.CheckError,"numerical rung"): self.reconstruct()

    def test_path_reorder_missing_and_wrong_run(self):
        mutations = [lambda r:r["publishedExtensions"].reverse(), lambda r:r["publishedExtensions"].pop(), lambda r:r.update(runId="other")]
        for mutate in mutations:
            with self.subTest(mutate=mutate):
                prior = copy.deepcopy(self.response)
                mutate(self.response)
                with self.assertRaises(ref.CheckError): self.reconstruct()
                self.response = prior

    def test_truncated_segments_and_wrong_grade(self):
        self.response["publishedExtensions"][0]["segments"].pop()
        with self.assertRaisesRegex(ref.CheckError,"quarter-step"): self.reconstruct()
        self.response = fixture()[3]
        self.response["publishedExtensions"][0]["segments"][0]["claimGrade"] = "display-only"
        with self.assertRaisesRegex(ref.CheckError,"segment grade"): self.reconstruct()

    def test_gap_and_disjoint_join(self):
        for key, value in (("startTime","0.13"), ("coefficients", [["3","0","0","0"],["0"]*4,["0"]*4])):
            self.response = fixture()[3]
            self.response["publishedExtensions"][0]["segments"][1][key] = value
            with self.assertRaises(ref.CheckError): self.reconstruct()

    def test_halt_with_no_evolution_remains_empty(self):
        self.response.update(status="halted", acceptedEndTime="0", acceptedStepCount=0, haltCode="root-limit", evidenceStatus="failed", claimGrade="failed")
        for p in self.response["publishedExtensions"]: p["segments"] = []
        self.response["stepFailures"] = []
        paths, end, complete = self.reconstruct()
        self.assertEqual(end,0)
        self.assertFalse(complete)
        self.assertTrue(all(not p for p in paths))

    def test_falsely_completed_endpoint_rejected(self):
        self.response["acceptedEndTime"] = "0.25"
        with self.assertRaisesRegex(ref.CheckError,"inconsistent"): self.reconstruct()

    def test_declared_panel_resource_cap(self):
        paths,end,_ = self.reconstruct()
        self.declaration["outcomeControls"]["maximumPanels"] = 1
        with self.assertRaisesRegex(ref.CheckError,"resource limit"):
            ref.geometric_bounds(paths,end,self.declaration["outcomeControls"])

    def test_explicit_collapse_and_radius_witnesses(self):
        paths, end, _ = self.reconstruct()
        controls = copy.deepcopy(self.declaration["outcomeControls"])
        controls.update(collapseDistance="0.06",separationRadius="0.5")
        events = ref.geometric_bounds(paths,end,controls)["eventWitnesses"]
        self.assertEqual({e["event"] for e in events}, {"collapse-separation-crossing","separation-radius-crossing"})

    def test_interior_extremum_is_not_missed_by_endpoint_screen(self):
        # Each member has x(t)=offset+8t-16t^2 on [0,1/2]. The
        # nominal interior peak is offset+1 at t=1/4; both endpoints
        # are offset. This is an analytic test, not evolved F5 data.
        paths = []
        for i in range(12):
            s = segment("0","0.5",decimal(F(i,20)))
            s["coefficients"][0][1:3] = ["8","-16"]
            paths.append([ref.Segment(s)])
        result = ref.geometric_bounds(paths,F(1,2),self.declaration["outcomeControls"])
        self.assertGreaterEqual(F(result["decimalBounds"]["maximumRadius"]["upper"]), F(155,100))
        self.assertFalse(result["entireIntervalBelowSeparationRadius"])
        self.assertTrue(any(e["event"] == "separation-radius-crossing" for e in result["eventWitnesses"]))

    def test_join_union_with_different_knot_sequences(self):
        paths, end, _ = self.reconstruct()
        paths[0] = [ref.Segment(segment("0","0.0625")),ref.Segment(segment("0.0625","0.5"))]
        result = ref.geometric_bounds(paths,end,self.declaration["outcomeControls"])
        self.assertEqual(result["panels"],10)
        self.assertEqual(result["decimalBounds"]["minimumPairSeparation"]["lower"],"0.050000000000000000")

    def test_common_times_include_both_error_radii(self):
        a = [[ref.Segment(segment("0","0.5",error="0.00001"))] for _ in range(12)]
        b = [[ref.Segment(segment("0","0.5","0.00008",error="0.00001"))] for _ in range(12)]
        report = ref.compare_rungs(a,b,["0","0.5"],self.declaration["outcomeControls"])
        self.assertFalse(report["passed"])  # Euclidean error includes all three axes.
        b = [[ref.Segment(segment("0","0.5","0.00001",error="0.00001"))] for _ in range(12)]
        self.assertTrue(ref.compare_rungs(a,b,["0","0.5"],self.declaration["outcomeControls"])["passed"])

    def test_unreached_comparison_time_explicit_not_full_horizon(self):
        paths,_,_ = self.reconstruct()
        result = ref.compare_rungs(paths,paths,["0","0.6"],self.declaration["outcomeControls"])
        self.assertEqual(result["unreachableDeclaredTimes"],["0.6"])
        self.assertFalse(result["completeComparisonDomain"])
        self.assertTrue(result["passed"])
        self.assertEqual({F(row["time"]) for row in result["rows"]},{F(0),F(1,2)})

    def test_zero_common_generated_interval_cannot_pass(self):
        paths,_,_ = self.reconstruct()
        result = ref.compare_rungs([[] for _ in range(12)],paths,["0","0.5"],self.declaration["outcomeControls"])
        self.assertFalse(result["passed"])
        self.assertEqual(result["status"],"no-common-generated-interval")

    def test_attempt_and_local_error_census_fails_closed(self):
        mutations = [lambda r:r["stepFailures"].clear(),
                     lambda r:r.update(rejectedStepCount=1),
                     lambda r:r["stepFailures"][0]["localErrors"].pop(),
                     lambda r:r["stepFailures"][0]["localErrors"][0].update(positionError=1),
                     lambda r:r["stepFailures"][0]["localErrors"][0].update(positionError=1,positionErrors=[1,0,0]),
                     lambda r:r["stepFailures"][0].update(attemptedStart="0.1")]
        for mutate in mutations:
            self.response = fixture()[3]
            mutate(self.response)
            with self.assertRaises(ref.CheckError): self.reconstruct()

    def test_rejected_attempt_preserves_time_and_no_publication(self):
        self.response["stepFailures"].insert(0,{"status":"rejected","failureCode":"numeric_step_budget_exceeded","attemptedStart":"0","attemptedEnd":"0.5","localErrors":[]})
        self.response["rejectedStepCount"] = 1
        self.assertTrue(self.reconstruct()[2])

    def test_local_error_gate_uses_downward_tolerance_endpoint(self):
        threshold = float(self.prepared["transportRequest"]["numericalControls"]["positionTolerance"])
        error = self.response["stepFailures"][0]["localErrors"][0]
        error.update(positionError=threshold,positionErrors=[threshold,0,0])
        with self.assertRaisesRegex(ref.CheckError,"downward tolerance"): self.reconstruct()
        downward = math.nextafter(threshold,-math.inf)
        error.update(positionError=downward,positionErrors=[downward,0,0])
        self.assertTrue(self.reconstruct()[2])

    def test_four_segments_must_partition_shared_accepted_steps(self):
        self.response["publishedExtensions"][0]["segments"][0]["endTime"] = "0.1"
        self.response["publishedExtensions"][0]["segments"][1]["startTime"] = "0.1"
        with self.assertRaisesRegex(ref.CheckError,"partition differs"): self.reconstruct()

    def test_empty_repeated_unordered_or_partial_comparison_rejected(self):
        paths,_,_ = self.reconstruct()
        for times in ([],["0","0"],["0.5","0"]):
            with self.assertRaises(ref.CheckError):
                ref.compare_rungs(paths,paths,times,self.declaration["outcomeControls"])
        with self.assertRaises(ref.CheckError):
            ref.compare_rungs(paths[:-1],paths,["0"],self.declaration["outcomeControls"])


class CaptureControls(unittest.TestCase):
    def test_duplicate_keys_and_symlinks_rejected(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory)/"input.json"
            path.write_text('{"a":1,"a":2}')
            with self.assertRaisesRegex(ref.CheckError,"duplicate"): ref.read_bound(path)
            link = Path(directory)/"link.json"
            link.symlink_to(path)
            with self.assertRaises(OSError): ref.read_bound(link)

    def test_exclusive_publication_and_bound_output(self):
        declaration,handoff,prepared,response = fixture()
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            arguments = []
            for key, record in (("declaration",declaration),("handoff",handoff),("request",prepared),("response",response)):
                path = root/(key+".json")
                path.write_text(json.dumps(record))
                arguments.extend(["--"+key,str(path)])
            output = root/"out.json"
            arguments.extend(["--out",str(output)])
            with patch.object(ref,"HANDOFF_SHA",sha256((root/"handoff.json").read_bytes()).hexdigest()), contextlib.redirect_stdout(io.StringIO()) as log:
                ref.main(arguments)
                data = json.loads(output.read_bytes())
                self.assertFalse(data["accepted"])
                self.assertFalse(data["dynamicsIndependentlyValidated"])
                self.assertTrue(data["mathematicalCheckPassed"])
                completion = json.loads(log.getvalue())
                self.assertEqual(completion["sha256"],sha256(output.read_bytes()).hexdigest())
                with self.assertRaises(FileExistsError): ref.main(arguments)
                with self.assertRaisesRegex(ref.CheckError,"distinct numerical rungs"):
                    ref.main(arguments+["--comparison-request",str(root/"request.json"),"--comparison-response",str(root/"response.json")])


if __name__ == "__main__":
    unittest.main()
