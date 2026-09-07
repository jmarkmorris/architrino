"""Synthetic and analytic controls; no F6c record, roots, or metrics are run."""

from collections.abc import Sequence
from dataclasses import FrozenInstanceError, replace
from decimal import Decimal as D, localcontext
from fractions import Fraction as F
from hashlib import sha256
from pathlib import Path
import unittest
from unittest.mock import patch

from scripts.eom.oracle import continuous_reception_roots as box
from scripts.eom.oracle.certified_history import CubicHistorySegment, PiecewisePolynomialHistory
from scripts.eom.oracle.decimal_interval import DecimalInterval as I


def interval(lo, hi=None):
    return I.bounds(str(lo), str(lo if hi is None else hi), 90)


def piece(start, end, x, *, position_error="0", velocity_error="0"):
    return CubicHistorySegment.from_decimal_tokens(t_start=str(start), t_end=str(end),
        coefficients=[list(x), ["0"] * 4, ["0"] * 4], position_error=position_error,
        velocity_error=velocity_error, precision=90)


def path(identity, *segments):
    return PiecewisePolynomialHistory.from_segments(segments, history_id=identity)


def stationary(identity, position, start="-8", end="1", **errors):
    return path(identity, piece(start, end, [str(position), "0", "0", "0"], **errors))


def premises(paths, *, reception=None, speeds=None, clearance="1"):
    count = len(paths)
    return box.ConditionalPremises(
        tuple((p.history_id, p.digest()) for p in paths), interval(paths[0].t_start, paths[0].t_end),
        reception or interval("0", "0.1"), tuple(D(s) for s in (speeds or ["0"] * count)),
        tuple(tuple(D(0) if i == j else D(clearance) for j in range(count)) for i in range(count)),
        True, True, "independently specified synthetic coherent paths; no subject identity asserted")


def proposal(paths, reception=None, emission=None):
    return box.ReceptionCellProposal(reception or interval("0", "0.1"),
        {(a.history_id, b.history_id): emission or interval("-1.1", "-0.8")
         for a in paths for b in paths if a is not b})


def contains(test, enclosure, rational):
    test.assertLessEqual(F(enclosure.lower), F(rational))
    test.assertGreaterEqual(F(enclosure.upper), F(rational))


class AnalyticRootBoxes(unittest.TestCase):
    def test_eight_member_complete_56_plus_8_census(self):
        paths = tuple(stationary(f"synthetic-{i}", str(i)) for i in range(8))
        emissions = {}
        for i, receiver in enumerate(paths):
            for j, transmitter in enumerate(paths):
                if i != j:
                    distance = D(abs(i-j))
                    emissions[(receiver.history_id, transmitter.history_id)] = interval(-distance-D("0.1"), -distance+D("0.2"))
        proposed = box.ReceptionCellProposal(interval("0", "0.1"), emissions)
        result = box.enclose_root_cover(paths, premises(paths), [proposed])
        self.assertTrue(result.complete_conditional_coverage, result.failure_detail)
        self.assertEqual(result.expected_rows, 64)
        self.assertEqual(sum(row.ordinary_roots_per_reception for row in result.rows), 56)
        self.assertEqual(sum(row.coincident_endpoint_excluded for row in result.rows), 8)
        self.assertTrue(all(row.root_free_complement_conditional and not row.retained_boundary_contact for row in result.rows))

    def test_static_unique_root_curve_exact_geometry_and_self_exclusions(self):
        paths = (stationary("receiver", "0"), stationary("source", "1"))
        result = box.enclose_root_cover(paths, premises(paths), [proposal(paths)])
        self.assertEqual(result.status, "conditional_complete", result.failure_detail)
        self.assertEqual(result.expected_rows, 4)
        self.assertEqual(len(result.rows), 4)
        for row in result.rows:
            if row.receiver_id == row.transmitter_id:
                self.assertEqual(row.ordinary_roots_per_reception, 0)
                self.assertTrue(row.coincident_endpoint_excluded)
                self.assertIsNone(row.distance)
            else:
                self.assertEqual(row.ordinary_roots_per_reception, 1)
                self.assertFalse(row.coincident_endpoint_excluded)
                # Exact root is t=r-1, all r in [0,1/10]; d=Dt=Dr=1.
                self.assertLess(row.lower_face_residual.upper, 0)
                self.assertGreater(row.upper_face_residual.lower, 0)
                for r in (F(0), F(1, 20), F(1, 10)):
                    contains(self, row.emission, r-1)
                self.assertEqual(row.distance, interval(1))
                self.assertEqual(row.transmitter_factor, interval(1))
                self.assertEqual(row.receiver_factor, interval(1))
        self.assertFalse(result.premise_truth_authenticated)
        self.assertFalse(result.subject_membership_established)
        self.assertFalse(result.execution_authorized)
        self.assertFalse(result.metrics_available)
        self.assertFalse(result.h3_evidence_eligible)

    def test_affine_source_both_directions_against_exact_roots(self):
        # x0=0; x1=1+t/5, represented locally as -3/5+(t+8)/5.
        paths = (stationary("zero", "0"), path("moving", piece("-8", "1", ["-0.6", "0.2", "0", "0"])))
        result = box.enclose_root_cover(paths, premises(paths, speeds=["0", "0.2"]),
                                       [proposal(paths, emission=interval("-1.1", "-0.7"))])
        self.assertTrue(result.complete_conditional_coverage, result.failure_detail)
        for row in result.rows:
            if row.receiver_id == row.transmitter_id:
                continue
            for r in (F(0), F(1, 10)):
                if row.receiver_id == "zero":
                    t = (r-1) * F(5, 6)
                    source_factor, receiver_factor = F(6, 5), F(1)
                else:
                    t = F(4, 5)*r-1
                    source_factor, receiver_factor = F(1), F(4, 5)
                contains(self, row.emission, t)
                contains(self, row.distance, r-t)
                contains(self, row.transmitter_factor, source_factor)
                contains(self, row.receiver_factor, receiver_factor)

    def test_receiver_and_transmitter_original_knots_are_all_retained(self):
        p0 = path("zero", piece("-8", "-0.95", ["0"]*4), piece("-0.95", "0.04", ["0"]*4),
                  piece("0.04", "1", ["0"]*4))
        p1 = path("one", piece("-8", "-0.9", ["1", "0", "0", "0"]),
                  piece("-0.9", "0.06", ["1", "0", "0", "0"]),
                  piece("0.06", "1", ["1", "0", "0", "0"]))
        paths = (p0, p1)
        result = box.enclose_root_cover(paths, premises(paths), [proposal(paths)])
        self.assertTrue(result.complete_conditional_coverage, result.failure_detail)
        self.assertEqual(result.reception_cells, (interval("0", "0.04"), interval("0.04", "0.06"), interval("0.06", "0.1")))
        self.assertEqual(len(result.rows), 12)
        nonself = [row for row in result.rows if row.emission is not None]
        self.assertTrue(all(len(row.transmitter_pieces) == 2 for row in nonself))
        # Multiple piece evaluations do not add arrivals or change pair identity.
        self.assertTrue(all(row.ordinary_roots_per_reception == 1 for row in nonself))
        self.assertEqual({(r.receiver_id, r.transmitter_id) for r in nonself}, {("zero", "one"), ("one", "zero")})

    def test_closed_point_join_evaluates_both_error_envelopes(self):
        joined = path("uncertain", piece("-8", "0", ["0"]*4, position_error="0.1"),
                      piece("0", "1", ["0.1", "0", "0", "0"], position_error="0.1"))
        state = box.history_state_over(joined, interval("0"))
        self.assertEqual([index for index, _ in state.pieces], [0, 1])
        self.assertEqual(state.position[0], interval("-0.1", "0.2"))
        left = box.history_state_over(joined, interval("-0.1", "0"))
        right = box.history_state_over(joined, interval("0", "0.1"))
        self.assertEqual(len(left.pieces), 2)
        self.assertEqual(len(right.pieces), 2)

    def test_exact_decimal_coverage_survives_low_ambient_precision(self):
        paths = (stationary("zero", "0"), stationary("one", "1"))
        split = "0.050000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
        proposals = [proposal(paths, interval("0", split)), proposal(paths, interval(split, "0.1"))]
        with localcontext() as context:
            context.prec = 3
            result = box.enclose_root_cover(paths, premises(paths), proposals)
        self.assertTrue(result.complete_conditional_coverage, result.failure_detail)
        self.assertEqual(result.reception_cells[0].upper, D(split))
        self.assertEqual(result.reception_cells[1].lower, D(split))


class FailClosedControls(unittest.TestCase):
    def setUp(self):
        self.paths = (stationary("zero", "0"), stationary("one", "1"))
        self.premises = premises(self.paths)
        self.proposal = proposal(self.paths)

    def check_unresolved(self, *, assumptions=None, proposals=None, paths=None, code=None):
        result = box.enclose_root_cover(paths or self.paths, assumptions or self.premises,
                                       proposals if proposals is not None else [self.proposal])
        self.assertFalse(result.complete_conditional_coverage)
        self.assertEqual(result.status, "unresolved")
        self.assertFalse(result.execution_authorized)
        if code:
            self.assertEqual(result.failure_code, code, result.failure_detail)
        return result

    def test_missing_false_or_invalid_uniform_premises(self):
        for change in ({"common_c1_original_box_membership_assumed": False},
                       {"uniform_speed_and_clearance_assumed": False}, {"hypothesis_scope": ""},
                       {"speed_upper": (D(0), D(1))}, {"speed_upper": (D(0), D(-1))},
                       {"speed_upper": (D(0), 0.1)},
                       {"clearance_lower": ((D(0), D(0)), (D(1), D(0)))},
                       {"clearance_lower": ((D(0), D(1)),)}):
            with self.subTest(change=change):
                self.check_unresolved(assumptions=replace(self.premises, **change), code="premise")

    def test_history_digest_or_order_mismatch(self):
        bad = replace(self.premises, member_digests=tuple(reversed(self.premises.member_digests)))
        self.check_unresolved(assumptions=bad, code="identity")
        changed = (self.paths[0], stationary("one", "1.01"))
        self.check_unresolved(paths=changed, code="identity")

    def test_non_90_precision_and_invalid_exponent_rejected(self):
        self.check_unresolved(assumptions=replace(self.premises, reception_domain=I.bounds("0", "0.1", 80)), code="precision")
        self.check_unresolved(assumptions=replace(self.premises, speed_upper=(D(0), D("1e-1001"))), code="premise")

    def test_missing_extra_or_self_pair_rejected(self):
        for key, add in ((("zero", "one"), False), (("zero", "zero"), True), (("other", "one"), True)):
            emission = dict(self.proposal.emission_boxes)
            if add:
                emission[key] = interval("-1.1", "-0.8")
            else:
                del emission[key]
            self.check_unresolved(proposals=[replace(self.proposal, emission_boxes=emission)], code="pair_census")

    def test_empty_gapped_overlapping_reordered_or_truncated_cover(self):
        self.check_unresolved(proposals=[], code="resource_limit")
        for times in ([("0", "0.04"), ("0.05", "0.1")],
                      [("0", "0.06"), ("0.05", "0.1")],
                      [("0.05", "0.1"), ("0", "0.05")], [("0", "0.09")], [("0", "0.11")]):
            self.check_unresolved(proposals=[proposal(self.paths, interval(*pair)) for pair in times], code="coverage")

    def test_emission_touching_receiver_or_outside_retention_rejected(self):
        for bounds in (("-1", "0"), ("-9", "-0.8"), ("-1", "-1")):
            self.check_unresolved(proposals=[proposal(self.paths, emission=interval(*bounds))], code="time_domain")

    def test_strict_faces_not_zero_or_just_nominal_bracket(self):
        # At the lower receiver endpoint the exact root is -1; equality fails.
        result = self.check_unresolved(proposals=[proposal(self.paths, emission=interval("-1", "-0.8"))], code="face_sign")
        self.assertLess(len(result.rows), result.expected_rows)
        self.check_unresolved(proposals=[proposal(self.paths, emission=interval("-1.1", "-1"))], code="face_sign")

    def test_oldest_boundary_contact_fails_before_root_geometry(self):
        paths = (stationary("zero", "0"), stationary("one", "8"))
        self.check_unresolved(paths=paths, assumptions=premises(paths), code="oldest_boundary")

    def test_unrestricted_signs_execute_before_any_root_only_intersection(self):
        with patch.object(box, "_root_geometry", side_effect=AssertionError("root-only operation reached before strict signs")):
            self.check_unresolved(proposals=[proposal(self.paths, emission=interval("-1", "-0.8"))], code="face_sign")

    def test_empty_intersection_is_not_a_root_disposition(self):
        with self.assertRaisesRegex(box.RootBoxUnresolved, "empty") as raised:
            box._intersection(interval("0", "1"), interval("2", "3"), "synthetic inconsistent root bounds")
        self.assertEqual(raised.exception.code, "empty_intersection")
        # Claimed clearance larger than the actual distance is an inconsistent
        # premise: strict faces cannot override the empty root-value intersection.
        self.check_unresolved(assumptions=replace(self.premises,
                              clearance_lower=((D(0), D(2)), (D(2), D(0)))), code="empty_intersection")

    def test_zero_denominator_guard_and_invalid_clearance(self):
        same = stationary("same", "0")
        # Direct private-operation control deliberately violates its already-
        # covered-root precondition; no zero-distance division may proceed.
        with self.assertRaises(box.RootBoxUnresolved) as raised:
            box._root_geometry(same, same, interval("0"), interval("0"), D(0), D(0), D(0))
        self.assertEqual(raised.exception.code, "zero_denominator")

    def test_positive_factor_below_frozen_floor_still_unresolved(self):
        with localcontext() as context:
            context.prec = 120
            speed = D(1) - D("1e-25")
            c0 = -8 * speed
            end = D(1) + D("1e-28")
        paths = (stationary("one", "1", end="2"),
                 path("near-field", piece("-8", "2", [str(c0), str(speed), "0", "0"])))
        assumptions = premises(paths, reception=interval(1, end), speeds=["0", str(speed)], clearance="1e-30")
        proposed = proposal(paths, interval(1, end), interval("-1", "0.01"))
        result = box.enclose_root_cover(paths, assumptions, [proposed])
        self.assertEqual(result.failure_code, "factor_floor", result.failure_detail)
        self.assertFalse(result.complete_conditional_coverage)

    def test_partial_history_hull_and_directly_malformed_partition_rejected(self):
        with self.assertRaises(box.RootBoxUnresolved):
            box.history_state_over(self.paths[0], interval("-9", "0"))
        invalid = PiecewisePolynomialHistory((piece("-8", "0", ["0"]*4), piece("0.01", "1", ["0"]*4)), "invalid")
        with self.assertRaises(box.RootBoxUnresolved):
            box.history_state_over(invalid, interval("0", "0.1"))

    def test_resource_bound_applies_after_original_knot_splitting(self):
        paths = (path("zero", piece("-8", "0.04", ["0"]*4), piece("0.04", "1", ["0"]*4)), self.paths[1])
        with patch.object(box, "MAX_RECEPTION_CELLS", 1):
            result = box.enclose_root_cover(paths, premises(paths), [proposal(paths)])
        self.assertEqual(result.failure_code, "resource_limit")


class ConsumerCapacityControls(unittest.TestCase):
    def test_declared_7040_segment_finest_rung_fits_finite_capacity(self):
        # Hand-authored constant history with the declared 6,400 + 640 census.
        # This is structural coverage only; no actual data or root cover is run.
        past = [D(-8) + D(index)*D("0.00125") for index in range(6401)]
        future = [D(index)*D("0.000203125") for index in range(641)]
        knots = past + future[1:]
        segments = tuple(piece(a, b, ["0"]*4) for a, b in zip(knots, knots[1:]))
        self.assertEqual(len(segments), 7040)
        self.assertEqual((knots[0], knots[-1]), (D(-8), D("0.13")))
        synthetic = PiecewisePolynomialHistory(segments, "finest-census-constant-control")
        box._history_structure(synthetic)
        state = box.history_state_over(synthetic, interval("0"))
        self.assertEqual([index for index, _ in state.pieces], [6399, 6400])
        self.assertEqual(state.position, (interval(0),)*3)
        self.assertEqual(box.MAX_SEGMENTS_PER_HISTORY, 8192)

    def test_declared_6720_leaves_and_knot_union_capacity(self):
        paths = (stationary("zero", "0"), stationary("one", "1"))
        assumptions = premises(paths, reception=interval("0", "1"))
        # Finite decimal knots with exact shared tokens; no root calls.
        knots = [D(index)/D(6720) for index in range(6721)]
        proposals = [proposal(paths, interval(a, b)) for a, b in zip(knots, knots[1:])]
        split = box._split_proposals(paths, assumptions, proposals)
        self.assertEqual(len(split), 6720)
        self.assertEqual(split[0][0].lower, D(0))
        self.assertEqual(split[-1][0].upper, D(1))
        self.assertEqual(320*(20+1) + 8*(640-1), 11832)
        self.assertLessEqual(11832, box.MAX_RECEPTION_CELLS)
        self.assertEqual(box.MAX_RECEPTION_CELLS, 16384)

    def test_generator_and_oversized_sequence_rejected_before_iteration(self):
        paths = (stationary("zero", "0"), stationary("one", "1"))
        assumptions = premises(paths)
        touched = []

        def generator():
            touched.append("generator")
            raise AssertionError("generator must not be consumed")
            yield paths[0]

        class OversizedSequence(Sequence):
            def __len__(self):
                return 10**9

            def __getitem__(self, index):
                touched.append("index")
                raise AssertionError("oversized sequence must not be indexed")

            def __iter__(self):
                touched.append("iterator")
                raise AssertionError("oversized sequence must not be iterated")

        for source in (generator(), OversizedSequence()):
            result = box.enclose_root_cover(source, assumptions, [proposal(paths)])
            self.assertEqual(result.failure_code, "resource_limit", result.failure_detail)
            self.assertFalse(result.complete_conditional_coverage)
            self.assertEqual(result.rows, ())
        self.assertEqual(touched, [])

    def test_valid_bounded_sequence_never_uses_its_iterator(self):
        paths = (stationary("zero", "0"), stationary("one", "1"))

        class IndexOnly(Sequence):
            def __len__(self):
                return len(paths)

            def __getitem__(self, index):
                return paths[index]

            def __iter__(self):
                raise AssertionError("use only the declared finite index range")

        result = box.enclose_root_cover(IndexOnly(), premises(paths), [proposal(paths)])
        self.assertTrue(result.complete_conditional_coverage, result.failure_detail)


class SnapshotControls(unittest.TestCase):
    @staticmethod
    def mutable_path(identity, x):
        # The frozen reference dataclasses can still be directly constructed
        # with aliased lists. These are plumbing inputs, not proof references.
        rows = [[D(x), D(0), D(0), D(0)], [D(0)]*4, [D(0)]*4]
        segments = [CubicHistorySegment(D(-8), D(1), rows, D(0), D(0), 90)]
        return PiecewisePolynomialHistory(segments, identity), rows, segments

    def test_snapshot_detaches_all_mutable_containers_and_is_deeply_immutable(self):
        original, rows, segments = self.mutable_path("mutable", "1")
        original_digest = original.digest()
        snapshot = box._snapshot_history(original)
        self.assertEqual(snapshot.history_digest, original_digest)
        self.assertIsNot(snapshot.segments, segments)
        self.assertIsNot(snapshot.segments[0], segments[0])
        self.assertIsNot(snapshot.segments[0].coefficients, rows)
        self.assertTrue(all(type(row) is tuple for row in snapshot.segments[0].coefficients))
        with self.assertRaises(FrozenInstanceError):
            snapshot.history_id = "changed"
        with self.assertRaises(FrozenInstanceError):
            snapshot.segments[0].position_error = D(1)
        with self.assertRaises(TypeError):
            snapshot.segments[0].coefficients[0][0] = D(100)
        rows[0][0] = D(100)
        rows[1].clear()
        segments.clear()
        state = box._history_state_over(snapshot, interval("0", "0.1"))
        self.assertEqual(state.position, (interval(1), interval(0), interval(0)))
        self.assertEqual(snapshot.history_digest, original_digest)

    def test_post_validation_caller_mutation_cannot_change_cover_generation(self):
        receiver, receiver_rows, receiver_segments = self.mutable_path("zero", "0")
        transmitter, transmitter_rows, _ = self.mutable_path("one", "1")
        paths = (receiver, transmitter)
        assumptions, proposed = premises(paths), proposal(paths)
        validate = box._validate_premises

        def mutate_after_validation(snapshots, supplied):
            validate(snapshots, supplied)
            receiver_rows[0][0] = D(20)
            transmitter_rows[0][0] = D(40)
            receiver_segments.clear()

        with patch.object(box, "_validate_premises", side_effect=mutate_after_validation):
            result = box.enclose_root_cover(paths, assumptions, [proposed])
        self.assertTrue(result.complete_conditional_coverage, result.failure_detail)
        for row in result.rows:
            if row.emission is not None:
                self.assertEqual(row.distance, interval(1))
                self.assertEqual(row.transmitter_factor, interval(1))
        # A later call must not reuse the now-invalid original by object id.
        later = box.enclose_root_cover(paths, assumptions, [proposed])
        self.assertEqual(later.failure_code, "resource_limit")
        self.assertEqual(later.rows, ())

    def test_changed_generation_during_capture_rejects_frozen_digest(self):
        receiver, _, _ = self.mutable_path("zero", "0")
        transmitter, transmitter_rows, _ = self.mutable_path("one", "1")
        paths = (receiver, transmitter)
        assumptions, proposed = premises(paths), proposal(paths)
        capture = box._snapshot_history
        captured = []

        def change_next_member(history):
            snapshot = capture(history)
            captured.append(snapshot)
            if len(captured) == 1:
                transmitter_rows[0][0] = D(2)
            return snapshot

        with patch.object(box, "_snapshot_history", side_effect=change_next_member):
            result = box.enclose_root_cover(paths, assumptions, [proposed])
        self.assertEqual(result.failure_code, "identity", result.failure_detail)
        self.assertEqual(result.rows, ())

    def test_once_per_member_validation_and_call_local_reuse_census(self):
        paths = tuple(stationary(f"member-{i}", str(i)) for i in range(8))
        emissions = {(a.history_id, b.history_id): interval(-abs(i-j)-D("0.1"), -abs(i-j)+D("0.2"))
                     for i, a in enumerate(paths) for j, b in enumerate(paths) if i != j}
        proposed = [box.ReceptionCellProposal(interval("0", "0.05"), emissions),
                    box.ReceptionCellProposal(interval("0.05", "0.1"), emissions)]
        assumptions = premises(paths)
        evaluate = box._history_state_over
        generations = []

        def observe(snapshot, time):
            generations.append(snapshot)
            return evaluate(snapshot, time)

        with patch.object(box, "_history_structure", wraps=box._history_structure) as validate, \
             patch.object(box, "_history_state_over", side_effect=observe):
            first = box.enclose_root_cover(paths, assumptions, proposed)
            self.assertTrue(first.complete_conditional_coverage, first.failure_detail)
            self.assertEqual(validate.call_count, 8)
            first_ids = {id(item) for item in generations}
            self.assertEqual(len(first_ids), 8)
            boundary = len(generations)
            second = box.enclose_root_cover(paths, assumptions, proposed)
            self.assertTrue(second.complete_conditional_coverage, second.failure_detail)
            self.assertEqual(validate.call_count, 16)
            second_ids = {id(item) for item in generations[boundary:]}
            self.assertEqual(len(second_ids), 8)
            self.assertTrue(first_ids.isdisjoint(second_ids))
        self.assertEqual(first.rows, second.rows)  # Plumbing determinism only.

    def test_public_state_entry_revalidates_each_new_generation(self):
        original, rows, segments = self.mutable_path("mutable", "0")
        with patch.object(box, "_history_structure", wraps=box._history_structure) as validate:
            self.assertEqual(box.history_state_over(original, interval(0)).position[0], interval(0))
            rows[0][0] = D(1)
            self.assertEqual(box.history_state_over(original, interval(0)).position[0], interval(1))
            segments[0] = replace(segments[0], velocity_error=D(-1))
            with self.assertRaises(box.RootBoxUnresolved):
                box.history_state_over(original, interval(0))
            self.assertEqual(validate.call_count, 3)


class ImmutablePremiseControls(unittest.TestCase):
    def test_mutable_premise_containers_are_rejected_before_rows(self):
        paths = (stationary("zero", "0"), stationary("one", "1"))
        assumptions = premises(paths)
        changes = ({"speed_upper": list(assumptions.speed_upper)},
                   {"clearance_lower": list(assumptions.clearance_lower)},
                   {"clearance_lower": tuple(list(row) for row in assumptions.clearance_lower)},
                   {"member_digests": list(assumptions.member_digests)},
                   {"member_digests": tuple(list(pair) for pair in assumptions.member_digests)})
        for change in changes:
            with self.subTest(change=change):
                result = box.enclose_root_cover(paths, replace(assumptions, **change), [proposal(paths)])
                self.assertEqual(result.failure_code, "premise", result.failure_detail)
                self.assertFalse(result.complete_conditional_coverage)
                self.assertEqual(result.rows, ())

    def test_premise_subclasses_and_nonimmutable_leaves_are_rejected(self):
        class MutableString(str):
            pass

        class MutableDecimal(D):
            pass

        class MutableTuple(tuple):
            pass

        paths = (stationary("zero", "0"), stationary("one", "1"))
        assumptions = premises(paths)
        changes = ({"speed_upper": MutableTuple(assumptions.speed_upper)},
                   {"speed_upper": (MutableDecimal(0), D(0))},
                   {"clearance_lower": ((D(0), MutableDecimal(1)), (D(1), D(0)))},
                   {"member_digests": ((MutableString("zero"), paths[0].digest()), assumptions.member_digests[1])},
                   {"member_digests": (("zero", MutableString(paths[0].digest())), assumptions.member_digests[1])},
                   {"member_digests": (MutableTuple(assumptions.member_digests[0]), assumptions.member_digests[1])})
        for change in changes:
            with self.subTest(change=change):
                result = box.enclose_root_cover(paths, replace(assumptions, **change), [proposal(paths)])
                self.assertEqual(result.failure_code, "premise", result.failure_detail)
                self.assertEqual(result.rows, ())

    def test_accepted_premises_cannot_follow_mutable_origins_during_or_after_call(self):
        paths = (stationary("zero", "0"), stationary("one", "1"))
        initial = premises(paths)
        speed_origin = list(initial.speed_upper)
        clearance_origin = [list(row) for row in initial.clearance_lower]
        digest_origin = [list(pair) for pair in initial.member_digests]
        assumptions = replace(initial, speed_upper=tuple(speed_origin),
                              clearance_lower=tuple(tuple(row) for row in clearance_origin),
                              member_digests=tuple(tuple(pair) for pair in digest_origin))
        split = box._split_proposals

        def mutate_origins(*args):
            speed_origin[0] = D(1)
            clearance_origin[0][1] = D(100)
            digest_origin[0][0] = "changed"
            with self.assertRaises(TypeError):
                assumptions.speed_upper[0] = D(1)
            with self.assertRaises(TypeError):
                assumptions.clearance_lower[0][1] = D(100)
            with self.assertRaises(TypeError):
                assumptions.member_digests[0][0] = "changed"
            return split(*args)

        with patch.object(box, "_split_proposals", side_effect=mutate_origins):
            result = box.enclose_root_cover(paths, assumptions, [proposal(paths)])
        self.assertTrue(result.complete_conditional_coverage, result.failure_detail)
        self.assertIs(result.hypotheses, assumptions)
        self.assertEqual(result.hypotheses, initial)
        speed_origin.clear()
        clearance_origin[0].clear()
        digest_origin[0].clear()
        with self.assertRaises(FrozenInstanceError):
            result.hypotheses.speed_upper = (D(1), D(1))
        with self.assertRaises(TypeError):
            result.hypotheses.clearance_lower[0][1] = D(100)
        self.assertEqual(result.hypotheses, initial)


class NoSamplingProofControls(unittest.TestCase):
    def test_endpoints_miss_whole_time_face_failure(self):
        # A general polynomial counterexample: x_receiver=-4u(1-u),u=r-2,
        # source=2. Endpoints on r=[2,3] pass the lower face t=-0.1;
        # midpoint fails. This path is deliberately NOT sub-field and does not
        # satisfy the global speed premise; scalar samples cannot establish it.
        # Direct dataclass to select the stated receiver polynomial on [2,3];
        # no common-C1 hypothesis or completed root cover is asserted here.
        receiver = PiecewisePolynomialHistory((piece("-8", "2", ["0"]*4),
                         piece("2", "3", ["0", "-4", "4", "0"])), "bump")
        source = stationary("source", "2", end="3")
        for r in ("2", "3"):
            sign = box.unrestricted_residual(receiver, source, interval(r), interval("-0.1"))
            self.assertLess(sign.upper, 0)
        middle = box.unrestricted_residual(receiver, source, interval("2.5"), interval("-0.1"))
        self.assertGreater(middle.lower, 0)
        whole = box.unrestricted_residual(receiver, source, interval("2", "3"), interval("-0.1"))
        self.assertGreater(whole.upper, 0)
        self.assertLess(whole.lower, 0)

    def test_nonzero_original_uncertainty_cannot_be_ignored_by_nominal_samples(self):
        paths = (stationary("zero", "0", position_error="0.2"), stationary("one", "1"))
        result = box.enclose_root_cover(paths, premises(paths, clearance="0.8"), [proposal(paths)])
        # Nominal static root curves pass the exact same proposals in the first
        # test. A coherent constant offset inside these boxes can move the root
        # beyond a proposed face, so this wider family must remain unresolved.
        self.assertEqual(result.failure_code, "face_sign", result.failure_detail)

    def test_frozen_mathematical_dependencies_remain_identical(self):
        root = Path(__file__).resolve().parents[1]
        for name, expected in {
            "scripts/eom/oracle/certified_history.py": "ca916b4bc979629a5e25c1490da07fd78a26b4e75cfba5677f35fbab658a29e7",
            "scripts/eom/oracle/decimal_interval.py": "fffc17270e149e6213315c1c82b518caa739657eb649822fd1955b8a2820e38a",
            "reference/priorities/braid-program/evidence/2026-08-27-f6c-continuous-reception-enclosure-contract.md":
                "f20e4bdaaff8b6f0012fdc6135b15d568a817832fb55d5c42f80d8421a117f68",
        }.items():
            self.assertEqual(sha256((root / name).read_bytes()).hexdigest(), expected)


if __name__ == "__main__":
    unittest.main()
