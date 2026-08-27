"""Synthetic references only; no saved F6c data, EOM process, or metric.

Affine/root closed forms are the independent mathematics. Baseline byte parity
is explicitly an implementation-equivalence check, not an independent oracle.
"""

import ast
from collections.abc import Sequence
from dataclasses import fields, FrozenInstanceError, is_dataclass, replace
from decimal import Decimal as D, localcontext
from fractions import Fraction as F
from hashlib import sha256
import json
from pathlib import Path
import unittest
from unittest.mock import patch

from scripts.eom.oracle import continuous_reception_roots as baseline
from scripts.eom.oracle import continuous_reception_roots_cached as cached
from scripts.eom.oracle.certified_history import CubicHistorySegment, PiecewisePolynomialHistory
from scripts.eom.oracle.decimal_interval import DecimalInterval as I


BASELINE_SHA = "f38657eedb585f6066bf233cef05508ef4d4336146dbf1e44501dfa9b669e04c"


def interval(lo, hi=None, precision=90):
    return I.bounds(str(lo), str(lo if hi is None else hi), precision)


def segment(a, b, coefficients, *, px="0", pv="0"):
    return CubicHistorySegment(D(str(a)), D(str(b)),
        tuple(tuple(D(str(x)) for x in axis) for axis in coefficients), D(px), D(pv), 90)


def stationary(identity, x, *, knots=("-8", "1"), px="0", pv="0"):
    return PiecewisePolynomialHistory(tuple(segment(a, b, [[x, 0, 0, 0], [0]*4, [0]*4], px=px, pv=pv)
        for a, b in zip(knots, knots[1:])), identity)


def assumptions(module, histories, reception=None, speeds=None, clearance="1"):
    n = len(histories)
    return module.ConditionalPremises(tuple((h.history_id, h.digest()) for h in histories),
        interval(histories[0].t_start, histories[0].t_end), reception or interval("0", "0.001"),
        tuple(D(x) for x in (speeds or ["0"]*n)),
        tuple(tuple(D(0) if i == j else D(clearance) for j in range(n)) for i in range(n)),
        True, True, "Synthetic explicitly coherent affine histories; cf=1; no actual subject.")


def proposal(module, histories, reception=None, emission=None):
    return module.ReceptionCellProposal(reception or interval("0", "0.001"),
        {(a.history_id, b.history_id): emission or interval("-8", "-0.05")
         for a in histories for b in histories if a is not b})


def cover(module, histories, *, reception=None, emission=None, speeds=None, clearance="1"):
    return module.enclose_root_cover(histories, assumptions(module, histories, reception, speeds, clearance),
        (proposal(module, histories, reception, emission),))


def normalized(value):
    """Retain Decimal sign/digits/exponent, including zeros, for byte parity."""
    if type(value) is D:
        return {"decimalTuple": list(value.as_tuple())}
    if is_dataclass(value):
        return {"type": type(value).__name__, **{f.name: normalized(getattr(value, f.name)) for f in fields(value)}}
    if type(value) in (list, tuple):
        return [normalized(x) for x in value]
    if type(value) is dict:
        return {k: normalized(v) for k, v in value.items()}
    return value


def serialized(value):
    return json.dumps(normalized(value), sort_keys=True, separators=(",", ":"), allow_nan=False).encode()


class IndependentAffineControls(unittest.TestCase):
    def test_exact_three_axis_affine_state_and_uncertainty(self):
        # X(T)=(2+T/4, -1-T/2, 3); endpoints and derivative bounds
        # are independently evaluated as Fractions, not by subject arithmetic.
        h = PiecewisePolynomialHistory((segment("-8", "1",
            [[0, ".25", 0, 0], [3, "-.5", 0, 0], [3, 0, 0, 0]], px=".01", pv=".02"),), "affine")
        snapshot = cached._snapshot_history(h)
        memo = cached._CallLocalStateCache((snapshot,))
        state = memo.state(snapshot, interval("-.75", "-.25"))
        for axis, (a, v) in enumerate([(F(2), F(1, 4)), (F(-1), F(-1, 2)), (F(3), F(0))]):
            endpoints = [a+v*t for t in (F(-3, 4), F(-1, 4))]
            self.assertEqual((F(state.position[axis].lower), F(state.position[axis].upper)),
                             (min(endpoints)-F(1, 100), max(endpoints)+F(1, 100)))
            self.assertEqual((F(state.velocity[axis].lower), F(state.velocity[axis].upper)),
                             (v-F(1, 50), v+F(1, 50)))
        self.assertIs(state, memo.state(snapshot, interval("-.75", "-.25")))

    def test_stationary_exact_root_geometry_and_authority(self):
        hs = (stationary("left", 0), stationary("right", 1))
        result = cover(cached, hs)
        self.assertTrue(result.complete_conditional_coverage, result.failure_detail)
        self.assertEqual(len(result.rows), 4)
        for row in result.rows:
            if row.emission is None:
                self.assertTrue(row.coincident_endpoint_excluded)
                self.assertEqual(row.ordinary_roots_per_reception, 0)
            else:
                self.assertEqual(row.distance, interval(1))
                self.assertEqual(row.transmitter_factor, interval(1))
                self.assertEqual(row.receiver_factor, interval(1))
                for t in (F(0), F(1, 2000), F(1, 1000)):
                    self.assertLessEqual(F(row.emission.lower), t-1)
                    self.assertGreaterEqual(F(row.emission.upper), t-1)
        for name in ("premise_truth_authenticated", "subject_membership_established", "execution_authorized", "metrics_available", "h3_evidence_eligible"):
            self.assertIs(getattr(result, name), False)

    def test_common_axial_velocity_exact_two_direction_root_curves(self):
        # X_i(T)=i+T/5. With sign q=sign(i-j), s=T-|i-j|/(1-q/5).
        hs = tuple(PiecewisePolynomialHistory((segment("-8", "1",
            [[D(i)-D("1.6"), ".2", 0, 0], [0]*4, [0]*4]),), str(i)) for i in (0, 1))
        result = cover(cached, hs, speeds=[".2", ".2"])
        self.assertTrue(result.complete_conditional_coverage, result.failure_detail)
        for row in result.rows:
            if row.emission is None:
                continue
            sign = F(1) if row.receiver_id == "1" else F(-1)
            factor = 1-sign*F(1, 5)
            for t in (F(0), F(1, 2000), F(1, 1000)):
                s = t-1/factor
                for value, box in ((s, row.emission), (t-s, row.distance), (factor, row.receiver_factor), (factor, row.transmitter_factor)):
                    self.assertLessEqual(F(box.lower), value)
                    self.assertGreaterEqual(F(box.upper), value)

    def test_closed_shared_knot_preserves_both_original_envelopes(self):
        h = PiecewisePolynomialHistory((segment(-8, 0, [[0]*4]*3, px=".1"),
            segment(0, 1, [[".1", 0, 0, 0], [0]*4, [0]*4], px=".1")), "knot")
        snap = cached._snapshot_history(h); memo = cached._CallLocalStateCache((snap,))
        state = memo.state(snap, interval(0))
        self.assertEqual(state.position[0], interval("-.1", ".2"))
        self.assertEqual([i for i, _ in state.pieces], [0, 1])
        self.assertEqual(tuple((F(t.lower), F(t.upper)) for _, t in state.pieces), ((F(0), F(0)),)*2)


class CacheIdentityControls(unittest.TestCase):
    def setUp(self):
        self.h = stationary("same", 1)
        self.s = cached._snapshot_history(self.h)
        self.memo = cached._CallLocalStateCache((self.s,))

    def test_exact_repeat_reuses_only_successful_state(self):
        with patch.object(cached, "_history_state_over", wraps=cached._history_state_over) as evaluate:
            a = self.memo.state(self.s, interval(0, ".01"))
            self.assertIs(a, self.memo.state(self.s, interval(0, ".01")))
            self.assertEqual(evaluate.call_count, 1)

    def test_changed_interval_is_a_miss(self):
        with patch.object(cached, "_history_state_over", wraps=cached._history_state_over) as evaluate:
            self.memo.state(self.s, interval(0, ".01"))
            self.memo.state(self.s, interval(0, ".02"))
            self.assertEqual(evaluate.call_count, 2)

    def test_signed_zero_and_decimal_exponent_are_distinct_operands(self):
        with patch.object(cached, "_history_state_over", wraps=cached._history_state_over) as evaluate:
            for token in ("0", "-0", "0.0", "-0.0"):
                state = self.memo.state(self.s, interval(token, ".01"))
                self.assertEqual(state.pieces[0][1].lower.as_tuple(), D(token).as_tuple())
            self.assertEqual(evaluate.call_count, 4)
            self.memo.state(self.s, interval("-0", ".01"))
            self.assertEqual(evaluate.call_count, 4)

    def test_precision_is_validated_before_cache_lookup(self):
        self.memo.state(self.s, interval(0, ".01"))
        for p in (80, 91):
            with self.assertRaises(cached.RootBoxUnresolved) as error:
                self.memo.state(self.s, interval(0, ".01", p))
            self.assertEqual(error.exception.code, "precision")

    def test_noninteger_precision_cannot_borrow_prior_integer_success(self):
        original = self.memo.state(self.s, interval(0, ".01"))
        # The baseline reconstructs clipped parts with integer precision 90,
        # so 90.0 is accepted there. Preserve that behavior without a cache hit.
        with patch.object(cached, "_history_state_over", wraps=cached._history_state_over) as evaluate:
            for _ in range(2):
                uncached = self.memo.state(self.s, I(D(0), D(".01"), 90.0))
                self.assertEqual(uncached, original)
                self.assertIsNot(uncached, original)
            self.assertEqual(evaluate.call_count, 2)

    def test_interval_subclass_and_invalid_endpoint_cannot_hit_prior_cache(self):
        self.memo.state(self.s, interval(0, ".01"))
        class DerivedInterval(I):
            pass
        class DerivedDecimal(D):
            pass
        for time in (DerivedInterval(D(0), D(".01"), 90), I(DerivedDecimal(0), D(".01"), 90)):
            with self.assertRaises(cached.RootBoxUnresolved):
                self.memo.state(self.s, time)

    def test_same_identity_and_digest_do_not_identify_snapshot_objects(self):
        equal_but_distinct = cached._snapshot_history(self.h)
        self.assertEqual(equal_but_distinct, self.s)
        self.memo.state(self.s, interval(0))
        with self.assertRaises(cached.RootBoxUnresolved):
            self.memo.state(equal_but_distinct, interval(0))

    def test_two_captured_generations_with_same_name_remain_distinct(self):
        second = cached._snapshot_history(stationary("same", 2))
        memo = cached._CallLocalStateCache((self.s, second))
        self.assertEqual(memo.state(self.s, interval(0)).position[0], interval(1))
        self.assertEqual(memo.state(second, interval(0)).position[0], interval(2))

    def test_failure_is_not_cached(self):
        with patch.object(cached, "_history_state_over", wraps=cached._history_state_over) as evaluate:
            for _ in range(2):
                with self.assertRaises(cached.RootBoxUnresolved):
                    self.memo.state(self.s, interval(-9, -8))
            self.assertEqual(evaluate.call_count, 2)
            self.assertEqual(len(self.memo._states), 0)

    def test_entry_bound_evicts_without_rejecting_or_changing_result(self):
        with patch.object(cached, "_history_state_over", wraps=cached._history_state_over) as evaluate:
            for i in range(cached._MAX_CACHED_STATES+1):
                self.assertEqual(self.memo.state(self.s, interval(D(i)/100)).position[0], interval(1))
            self.assertEqual(len(self.memo._states), cached._MAX_CACHED_STATES)
            self.assertEqual(self.memo.state(self.s, interval(0)).position[0], interval(1))
            self.assertEqual(evaluate.call_count, cached._MAX_CACHED_STATES+2)

    def test_cached_state_and_snapshot_are_deeply_immutable(self):
        state = self.memo.state(self.s, interval(0))
        with self.assertRaises(FrozenInstanceError): state.position = ()
        with self.assertRaises(FrozenInstanceError): state.position[0].lower = D(200)
        with self.assertRaises(TypeError): state.position[0] = interval(200)
        with self.assertRaises(TypeError): state.pieces[0] = (100, interval(0))
        with self.assertRaises(FrozenInstanceError): self.s.segments[0].position_error = D(100)

    def test_caller_owned_lists_are_detached_before_reuse(self):
        matrix = [[D(1), D(0), D(0), D(0)], [D(0)]*4, [D(0)]*4]
        segments = [CubicHistorySegment(D(-8), D(1), matrix, D(0), D(0), 90)]
        h = PiecewisePolynomialHistory(segments, "aliased")
        snap = cached._snapshot_history(h); memo = cached._CallLocalStateCache((snap,))
        original = memo.state(snap, interval(0))
        matrix[0][0] = D(100); segments.clear()
        self.assertIs(original, memo.state(snap, interval(0)))
        self.assertEqual(original.position[0], interval(1))
        with self.assertRaises(cached.RootBoxUnresolved): cached.history_state_over(h, interval(0))


class CoverAndParityControls(unittest.TestCase):
    def test_shared_boxes_448_requests_need_32_evaluations_and_eight_validations(self):
        hs = tuple(stationary(str(i), i) for i in range(8))
        with patch.object(cached, "_history_state_over", wraps=cached._history_state_over) as state, \
             patch.object(cached, "_history_structure", wraps=cached._history_structure) as validate:
            actual = cover(cached, hs)
        self.assertTrue(actual.complete_conditional_coverage, actual.failure_detail)
        self.assertEqual((len(actual.rows), state.call_count, validate.call_count), (64, 32, 8))
        with patch.object(baseline, "_history_state_over", wraps=baseline._history_state_over) as original_state:
            original = cover(baseline, hs)
        self.assertEqual(original_state.call_count, 448)
        self.assertEqual(serialized(actual), serialized(original))  # Implementation parity ONLY.

    def test_cache_does_not_survive_call_or_cell_boundaries(self):
        hs = (stationary("a", 0), stationary("b", 1)); received = []
        original = cached._history_state_over
        def observe(h, t):
            received.append(h)
            return original(h, t)
        with patch.object(cached, "_history_state_over", side_effect=observe):
            first = cover(cached, hs); boundary = len(received)
            second = cover(cached, hs)
        self.assertEqual((boundary, len(received)), (8, 16))
        self.assertTrue({id(h) for h in received[:boundary]}.isdisjoint({id(h) for h in received[boundary:]}))
        self.assertEqual(serialized(first), serialized(second))
        a = assumptions(cached, hs, interval(0, ".002"))
        props = (proposal(cached, hs, interval(0, ".001")), proposal(cached, hs, interval(".001", ".002")))
        with patch.object(cached, "_history_state_over", wraps=original) as evaluate:
            result = cached.enclose_root_cover(hs, a, props)
        self.assertTrue(result.complete_conditional_coverage, result.failure_detail)
        self.assertEqual(evaluate.call_count, 16)

    def test_changed_original_generation_is_not_reused_by_later_cover(self):
        hs = (stationary("a", 0), stationary("b", 1))
        good = cover(cached, hs)
        self.assertTrue(good.complete_conditional_coverage)
        changed = (hs[0], stationary("b", 2))
        bad = cached.enclose_root_cover(changed, assumptions(cached, hs), (proposal(cached, changed),))
        self.assertEqual(bad.failure_code, "identity")
        self.assertEqual(bad.rows, ())

    def test_mutation_after_capture_cannot_change_cached_generation(self):
        matrix = [[D(0)]*4 for _ in range(3)]
        segs = [CubicHistorySegment(D(-8), D(1), matrix, D(0), D(0), 90)]
        hs = (PiecewisePolynomialHistory(segs, "a"), stationary("b", 1))
        p = assumptions(cached, hs); proposed = proposal(cached, hs)
        validate = cached._validate_premises
        def mutate_after_validation(histories, supplied):
            validate(histories, supplied)
            matrix[0][0] = D(100)
            segs.clear()
        with patch.object(cached, "_validate_premises", side_effect=mutate_after_validation):
            result = cached.enclose_root_cover(hs, p, (proposed,))
        self.assertTrue(result.complete_conditional_coverage, result.failure_detail)
        self.assertEqual(result.rows[1].distance, interval(1))
        self.assertEqual(cached.enclose_root_cover(hs, p, (proposed,)).failure_code, "resource_limit")

    def test_changed_generation_during_capture_rejects_before_any_state_cache(self):
        matrix = [[D(1), D(0), D(0), D(0)], [D(0)]*4, [D(0)]*4]
        mutable = PiecewisePolynomialHistory([CubicHistorySegment(D(-8), D(1), matrix, D(0), D(0), 90)], "b")
        hs = (stationary("a", 0), mutable); p = assumptions(cached, hs); proposed = proposal(cached, hs)
        capture = cached._snapshot_history
        def change_next(h):
            result = capture(h)
            if h is hs[0]: matrix[0][0] = D(2)
            return result
        with patch.object(cached, "_snapshot_history", side_effect=change_next), \
             patch.object(cached, "_CallLocalStateCache", side_effect=AssertionError("unvalidated cache")):
            result = cached.enclose_root_cover(hs, p, (proposed,))
        self.assertEqual(result.failure_code, "identity")
        self.assertEqual(result.rows, ())

    def test_standalone_public_entries_do_not_use_cache(self):
        h = stationary("a", 0)
        with patch.object(cached, "_CallLocalStateCache", side_effect=AssertionError("public standalone cache")), \
             patch.object(cached, "_history_structure", wraps=cached._history_structure) as validate:
            cached.history_state_over(h, interval(0)); cached.history_state_over(h, interval(0))
            cached.unrestricted_residual(h, stationary("b", 1), interval(0), interval(-1))
        self.assertEqual(validate.call_count, 4)

    def test_failed_row_prefix_and_failure_fields_match_baseline(self):
        hs = tuple(stationary(str(i), i) for i in range(3))
        results = []
        for module in (baseline, cached):
            p = proposal(module, hs); values = dict(p.emission_boxes)
            values[("1", "0")] = interval("-1", "-.05")  # Equality at T=0 fails.
            results.append(module.enclose_root_cover(hs, assumptions(module, hs),
                (replace(p, emission_boxes=values),)))
        self.assertEqual(results[1].failure_code, "face_sign")
        self.assertEqual(len(results[1].rows), 3)
        self.assertEqual(serialized(results[0]), serialized(results[1]))

    def test_original_knots_split_cover_with_identical_token_serialization(self):
        hs = (stationary("a", 0, knots=("-8", "0.0004", "1")),
              stationary("b", 1, knots=("-8", "0.0006", "1")))
        original, actual = cover(baseline, hs), cover(cached, hs)
        self.assertTrue(actual.complete_conditional_coverage, actual.failure_detail)
        self.assertEqual(len(actual.reception_cells), 3)
        self.assertEqual(serialized(original), serialized(actual))

    def test_invalid_mutable_premises_and_nonfinite_leaf_fail_closed(self):
        hs = (stationary("a", 0), stationary("b", 1))
        for change in ({"speed_upper": [D(0), D(0)]}, {"member_digests": list(assumptions(cached, hs).member_digests)},
                       {"speed_upper": (D("NaN"), D(0))}):
            result = cached.enclose_root_cover(hs, replace(assumptions(cached, hs), **change), (proposal(cached, hs),))
            self.assertEqual(result.failure_code, "premise")
            self.assertEqual(result.rows, ())

    def test_invalid_generator_is_not_consumed(self):
        hs = (stationary("a", 0), stationary("b", 1))
        def invalid():
            raise AssertionError("unbounded generator consumed")
            yield hs[0]
        result = cached.enclose_root_cover(invalid(), assumptions(cached, hs), (proposal(cached, hs),))
        self.assertEqual(result.failure_code, "resource_limit")

    def test_low_ambient_precision_parity_and_returned_premise_identity(self):
        hs = (stationary("a", 0), stationary("b", 1))
        with localcontext() as ctx:
            ctx.prec = 3
            p = assumptions(cached, hs)
            actual = cached.enclose_root_cover(hs, p, (proposal(cached, hs),))
            original = cover(baseline, hs)
        self.assertIs(actual.hypotheses, p)
        self.assertEqual(serialized(actual), serialized(original))

    def test_source_delta_is_only_declared_cache_plumbing(self):
        root = Path(__file__).resolve().parents[1]/"scripts/eom/oracle"
        old = (root/"continuous_reception_roots.py").read_bytes()
        self.assertEqual(sha256(old).hexdigest(), BASELINE_SHA)
        original = ast.parse(old); successor = ast.parse((root/"continuous_reception_roots_cached.py").read_bytes())
        class RemovePlumbing(ast.NodeTransformer):
            def visit_Module(self, node):
                node.body = [s for s in node.body if not (isinstance(s, ast.Expr) and isinstance(s.value, ast.Constant) and isinstance(s.value.value, str))
                             and not (isinstance(s, ast.ClassDef) and s.name == "_CallLocalStateCache")]
                return self.generic_visit(node)
            def visit_Assign(self, node):
                if any(isinstance(t, ast.Name) and t.id in ("_MAX_CACHED_STATES", "state_over", "state_cache") for t in node.targets):
                    return None
                return self.generic_visit(node)
            def visit_Expr(self, node):
                if isinstance(node.value, ast.Call) and isinstance(node.value.func, ast.Attribute) and isinstance(node.value.func.value, ast.Name) and node.value.func.value.id == "state_cache":
                    return None
                return self.generic_visit(node)
            def visit_arguments(self, node):
                kept = [(a, d) for a, d in zip(node.kwonlyargs, node.kw_defaults) if a.arg != "_state_over"]
                node.kwonlyargs = [a for a, _ in kept]; node.kw_defaults = [d for _, d in kept]
                return self.generic_visit(node)
            def visit_Call(self, node):
                if isinstance(node.func, ast.Name) and node.func.id == "state_over": node.func.id = "_history_state_over"
                node.keywords = [k for k in node.keywords if k.arg != "_state_over"]
                return self.generic_visit(node)
        self.assertEqual(ast.dump(RemovePlumbing().visit(original)), ast.dump(RemovePlumbing().visit(successor)))


if __name__ == "__main__":
    unittest.main()
