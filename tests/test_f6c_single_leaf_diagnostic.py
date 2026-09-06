"""Synthetic composition controls; no actual adapter, history or root calls."""

from dataclasses import asdict, FrozenInstanceError
from decimal import Decimal, localcontext
from fractions import Fraction as F
import hashlib
from pathlib import Path
import sys
from types import ModuleType, SimpleNamespace
import unittest


ROOT = Path(__file__).resolve().parents[1]


def load(name, relative, expected=None):
    path = ROOT / relative
    raw = path.read_bytes()
    if expected is not None:
        assert hashlib.sha256(raw).hexdigest() == expected
    module = ModuleType(name)
    module.__file__ = str(path)
    sys.modules[name] = module
    exec(compile(raw, str(path), 'exec'), module.__dict__)
    return module


D = load('single_leaf_subject', 'scripts/eom/f6c_single_leaf_diagnostic.py')
A = load('single_leaf_acceleration', 'scripts/eom/oracle/continuous_reception_acceleration.py',
         'abfc21f29d8bdd984118b1e0ba0cb62b88a081a75a961052eb11f31ea7bdd7b8')
I = load('single_leaf_integral', 'scripts/eom/oracle/f6c_residual_integral_supremum.py',
         'fc170a91b2747923bda89ef00b58d529c98bf96b01cc7b2c05c035042fc79c5a')
C = load('single_leaf_correlated', 'scripts/eom/oracle/f6c_correlated_residual_enclosure.py',
         'b86907236e849124f3fa9c6bcad0f65492ecc6fbeb1b51a27438655c45b037b1')
G = load('single_leaf_gk', 'scripts/eom/oracle/f6c_gk13_protocol.py',
         'a70a15481f793e913440628068f9c53bab611fe9d92f36206a401c01e91478eb')
RULER = F('0.5320012303229503')


def exact_decimal(value):
    with localcontext() as context:
        context.prec = 200
        result = str(Decimal(value.numerator) / Decimal(value.denominator))
    assert F(result) == value
    return result


class SyntheticAdapter:
    """Independent constant integrand: required acceleration=(1,0,0), law=0."""

    acceleration_reference = A
    integral_reference = I
    gk_protocol = G

    def __init__(self):
        self.context = I.Context(I.FAMILY, 'a' * 64, 'b' * 64, '1',
                                 '10.304229970992187', '0.5320012303229503')
        self.provenance = (('scope', 'synthetic-only'),)
        self.call_counts = dict.fromkeys(D.COUNTERS, 0)
        self.events = []
        self.values = []
        self.residual_arguments = []
        self.fail_at = None
        self.bad = None

    def project(self, frame, domain):
        self.call_counts['projections'] += 1
        self.events.append(('project', frame, domain))
        return SimpleNamespace(cell=SimpleNamespace(frame_index=frame, reception=domain))

    def evaluate(self, projection):
        self.call_counts['evaluations'] += 1
        count = self.call_counts['evaluations']
        self.events.append(('evaluate', projection))
        if self.fail_at == count:
            raise RuntimeError('synthetic unavailable provider')
        q = exact_decimal(RULER * RULER)
        members = tuple(SimpleNamespace(label=label, squared_norm=A.Bounds(q, q)) for label in D.LABELS)
        result = SimpleNamespace(frame_index=0, reception=projection.cell.reception, member_ranges=members)
        value = SimpleNamespace(projection=projection, ranges=result)
        if self.bad == 'projection':
            value.projection = SimpleNamespace(cell=projection.cell)
        elif self.bad == 'frame':
            result.frame_index = 1
        elif self.bad == 'domain':
            result.reception = A.Bounds('0', '0.002')
        elif self.bad == 'order':
            result.member_ranges = tuple(reversed(members))
        elif self.bad == 'missing':
            result.member_ranges = members[:-1]
        elif self.bad == 'root':
            self.call_counts['root_queries'] += 1
        elif self.bad == 'extra_range':
            self.call_counts['evaluations'] += 1
        self.values.append(value)
        return value

    def residual_for(self, evaluated, polynomial):
        self.call_counts['residuals'] += 1
        self.residual_arguments.append((evaluated, polynomial))
        self.events.append(('residual', polynomial.key.label))
        if self.bad == 'extra_residual':
            self.call_counts['residuals'] += 1
        if self.bad == 'emission':
            self.call_counts['emission_refinements'] += 1
        return C.enclose(I, polynomial, (C.Affine('1', '0'), C.Affine('0', '0'), C.Affine('0', '0')),
                         (I.Bounds('0', '0'),) * 3)


class SingleLeafTests(unittest.TestCase):
    def test_exact_constant_integrals_without_actual_data(self):
        result = D.measure(SyntheticAdapter())
        expected = RULER * RULER / 1000
        self.assertEqual(len(result.leaf.cell.members), 8)
        for member in result.leaf.cell.members:
            integral, = member.validated_integrals
            self.assertEqual(F(integral.bounds.lower), expected)
            self.assertEqual(F(integral.bounds.upper), expected)
        self.assertEqual(result.leaf.integral_width, 0)
        self.assertEqual(len(result.leaf.witnesses), 24)
        self.assertTrue(all(not flag for flag in asdict(result.claims).values()))
        self.assertEqual(result.source_provenance, (('scope', 'synthetic-only'),))

    def test_exact_four_call_order_and_same_whole_leaf_residual(self):
        adapter = SyntheticAdapter()
        result = D.measure(adapter)
        domains = (I.Bounds('0', '0.001'), *G.node_neighborhoods(I, I.Bounds('0', '0.001')))
        self.assertEqual(tuple((event[2].lower, event[2].upper) for event in adapter.events if event[0] == 'project'),
                         tuple((domain.lower, domain.upper) for domain in domains))
        self.assertEqual(tuple(event[0] for event in adapter.events), ('project', 'evaluate') * 4 + ('residual',) * 8)
        self.assertEqual(tuple(dict(result.call_counts).values()), (4, 4, 8, 0, 0))
        for index, (value, polynomial) in enumerate(adapter.residual_arguments):
            self.assertIs(value, adapter.values[0])
            self.assertIs(polynomial, result.leaf.response.members[index].polynomial)
            self.assertEqual(polynomial.key.label, D.LABELS[index])
        self.assertEqual(len(result.ranges), 4)

    def test_progress_is_explicit_and_bounded(self):
        events = []
        D.measure(SyntheticAdapter(), lambda *event: events.append(event))
        self.assertEqual(events, [('range', n, 4) for n in range(1, 5)]
                         + [('residual', n, 8) for n in range(1, 9)] + [('leaf', 1, 1)])

    def test_no_retry_after_unavailable_range(self):
        adapter = SyntheticAdapter()
        adapter.fail_at = 3
        with self.assertRaisesRegex(RuntimeError, 'unavailable'):
            D.measure(adapter)
        self.assertEqual(adapter.call_counts['evaluations'], 3)
        self.assertEqual(adapter.call_counts['residuals'], 0)

    def test_malformed_or_extra_provider_work_rejects(self):
        for bad in ('projection', 'frame', 'domain', 'order', 'missing', 'root',
                    'extra_range', 'extra_residual', 'emission'):
            with self.subTest(bad=bad):
                adapter = SyntheticAdapter()
                adapter.bad = bad
                with self.assertRaises(ValueError):
                    D.measure(adapter)

    def test_fresh_context_required(self):
        for key in D.COUNTERS:
            with self.subTest(key=key):
                adapter = SyntheticAdapter()
                adapter.call_counts[key] = 1
                with self.assertRaisesRegex(ValueError, 'fresh'):
                    D.measure(adapter)
                self.assertEqual(adapter.events, [])

    def test_counter_types_and_callback_shape(self):
        for value in (True, -1, 0.0, '0'):
            adapter = SyntheticAdapter()
            adapter.call_counts['projections'] = value
            with self.assertRaises(ValueError):
                D.measure(adapter)
        with self.assertRaises(ValueError):
            D.measure(SyntheticAdapter(), False)

    def test_progress_cannot_sneak_in_last_extra_call(self):
        adapter = SyntheticAdapter()
        def callback(stage, *_):
            if stage == 'leaf':
                adapter.call_counts['evaluations'] += 1
        with self.assertRaisesRegex(ValueError, 'progress'):
            D.measure(adapter, callback)

    def test_progress_exception_stops_without_retry(self):
        adapter = SyntheticAdapter()
        def callback(*_):
            raise RuntimeError('cancelled')
        with self.assertRaisesRegex(RuntimeError, 'cancelled'):
            D.measure(adapter, callback)
        self.assertEqual(adapter.call_counts['evaluations'], 1)
        self.assertEqual(adapter.call_counts['residuals'], 0)


class RestrictedSyntheticAdapter(SyntheticAdapter):
    """Independent direct restricted route, with deliberately unequal counts."""

    def __init__(self):
        super().__init__()
        self.geometry_accounting = dict.fromkeys(D.GEOMETRY_COUNTERS, 0)
        self.state_counts = (17, 19, 23, 29)
        self.bad_geometry = None

    def project(self, *_):
        raise AssertionError('restricted composition must never call project')

    def project_restricted(self, frame, domain):
        count = self.call_counts['projections']
        self.geometry_accounting['restriction_calls'] += 1
        self.geometry_accounting['completed_restrictions'] += 1
        self.geometry_accounting['restricted_projections'] += 1
        self.geometry_accounting['history_state_evaluations'] += self.state_counts[count]
        self.call_counts['projections'] += 1
        self.events.append(('restricted', frame, domain))
        if self.bad_geometry == 'incomplete':
            self.geometry_accounting['completed_restrictions'] -= 1
        elif self.bad_geometry == 'extra':
            self.geometry_accounting['restriction_calls'] += 1
        elif self.bad_geometry == 'zero_states':
            self.geometry_accounting['history_state_evaluations'] = 0
        return SimpleNamespace(cell=SimpleNamespace(frame_index=frame, reception=domain),
                               geometry_inherited_unchanged=self.bad_geometry == 'inherited')

    def evaluate(self, projection):
        result = super().evaluate(projection)
        if self.bad_geometry == 'evaluation':
            self.geometry_accounting['history_state_evaluations'] += 1
        return result

    def residual_for(self, evaluated, polynomial):
        result = super().residual_for(evaluated, polynomial)
        if self.bad_geometry == 'residual':
            self.geometry_accounting['history_state_evaluations'] += 1
        return result


class RestrictedSingleLeafTests(unittest.TestCase):
    def test_additive_result_contains_exact_unchanged_legacy_diagnostic(self):
        old = D.measure(SyntheticAdapter())
        adapter = RestrictedSyntheticAdapter()
        result = D.measure_restricted(adapter)
        self.assertEqual(result.schema, 'braid-program/f6c-single-leaf-restricted-diagnostic.v1')
        self.assertEqual(result.mode, 'restricted-reception-geometry')
        self.assertEqual(asdict(result.diagnostic), asdict(old))
        self.assertEqual(result.history_state_evaluations, (17, 19, 23, 29))
        self.assertEqual(dict(result.geometry_accounting), dict(restriction_calls=4, completed_restrictions=4,
                         history_state_evaluations=88, restricted_projections=4))
        with self.assertRaises(FrozenInstanceError):
            result.mode = 'inherit'
        self.assertTrue(all(v is False for v in asdict(result.diagnostic.claims).values()))

    def test_restricted_exact_constant_integrals_and_census(self):
        adapter = RestrictedSyntheticAdapter()
        result = D.measure_restricted(adapter).diagnostic
        expected = RULER * RULER / 1000
        for member in result.leaf.cell.members:
            value, = member.validated_integrals
            self.assertEqual((F(value.bounds.lower), F(value.bounds.upper)), (expected, expected))
        self.assertEqual(result.leaf.integral_width, 0)
        self.assertEqual(len(result.leaf.witnesses), 24)
        self.assertEqual(tuple(event[0] for event in adapter.events), ('restricted', 'evaluate') * 4 + ('residual',) * 8)
        domains = (I.Bounds('0', '0.001'), *G.node_neighborhoods(I, I.Bounds('0', '0.001')))
        self.assertEqual([(event[1], event[2].lower, event[2].upper) for event in adapter.events if event[0] == 'restricted'],
                         [(0, domain.lower, domain.upper) for domain in domains])
        self.assertEqual(dict(result.call_counts), dict(projections=4, evaluations=4, residuals=8, root_queries=0, emission_refinements=0))
        for index, (value, polynomial) in enumerate(adapter.residual_arguments):
            self.assertIs(value, adapter.values[0])
            self.assertIs(polynomial, result.leaf.response.members[index].polynomial)

    def test_legacy_needs_no_geometry_api(self):
        adapter = SyntheticAdapter()
        self.assertFalse(hasattr(adapter, 'geometry_accounting'))
        self.assertFalse(hasattr(adapter, 'project_restricted'))
        self.assertIs(type(D.measure(adapter)), D.LeafDiagnostic)

    def test_geometry_freshness_types_and_closed_fields(self):
        for key in D.GEOMETRY_COUNTERS:
            for value in (1, True, -1, 0.0, '0'):
                with self.subTest(key=key, value=value):
                    adapter = RestrictedSyntheticAdapter()
                    adapter.geometry_accounting[key] = value
                    with self.assertRaises(ValueError):
                        D.measure_restricted(adapter)
                    self.assertEqual(adapter.events, [])
        for mutation in (lambda d: d.pop('restriction_calls'), lambda d: d.update(extra=0)):
            adapter = RestrictedSyntheticAdapter()
            mutation(adapter.geometry_accounting)
            with self.assertRaises(ValueError):
                D.measure_restricted(adapter)
            self.assertEqual(adapter.events, [])

    def test_direct_route_malformed_results_or_stealth_geometry_reject(self):
        for bad in ('incomplete', 'extra', 'zero_states', 'inherited', 'evaluation', 'residual'):
            with self.subTest(bad=bad):
                adapter = RestrictedSyntheticAdapter()
                adapter.bad_geometry = bad
                with self.assertRaises(ValueError):
                    D.measure_restricted(adapter)

    def test_issued_identity_and_existing_provider_failures_still_reject(self):
        for bad in ('projection', 'frame', 'domain', 'order', 'missing', 'root', 'extra_range', 'extra_residual', 'emission'):
            adapter = RestrictedSyntheticAdapter()
            adapter.bad = bad
            with self.subTest(bad=bad), self.assertRaises(ValueError):
                D.measure_restricted(adapter)

    def test_each_progress_stage_cannot_add_geometry_or_other_work(self):
        for stage in ('range', 'residual', 'leaf'):
            for field in ('history_state_evaluations', 'restriction_calls', 'evaluations'):
                adapter = RestrictedSyntheticAdapter()
                def callback(which, *_):
                    if which == stage:
                        target = adapter.call_counts if field == 'evaluations' else adapter.geometry_accounting
                        target[field] += 1
                with self.subTest(stage=stage, field=field), self.assertRaisesRegex(ValueError, 'progress'):
                    D.measure_restricted(adapter, callback)
                if stage == 'range':
                    self.assertEqual(adapter.geometry_accounting['completed_restrictions'], 1)

    def test_leaf_cannot_perform_hidden_geometry(self):
        adapter = RestrictedSyntheticAdapter()
        calls = []
        def leaf(ref, response):
            calls.append(response)
            result = G.evaluate_leaf(ref, response)
            adapter.geometry_accounting['history_state_evaluations'] += 1
            return result
        adapter.gk_protocol = SimpleNamespace(node_neighborhoods=G.node_neighborhoods, LeafRequest=G.LeafRequest,
            polynomial_for_nodes=G.polynomial_for_nodes, MemberEvidence=G.MemberEvidence, LeafResponse=G.LeafResponse, evaluate_leaf=leaf)
        with self.assertRaisesRegex(ValueError, 'leaf'):
            D.measure_restricted(adapter)
        self.assertEqual(len(calls), 1)

    def test_unavailable_range_and_callback_stop_without_retry(self):
        adapter = RestrictedSyntheticAdapter()
        adapter.fail_at = 3
        with self.assertRaisesRegex(RuntimeError, 'unavailable'):
            D.measure_restricted(adapter)
        self.assertEqual(adapter.geometry_accounting['restriction_calls'], 3)
        self.assertEqual(adapter.call_counts['residuals'], 0)
        adapter = RestrictedSyntheticAdapter()
        def cancelled(*_):
            raise RuntimeError('cancelled')
        with self.assertRaisesRegex(RuntimeError, 'cancelled'):
            D.measure_restricted(adapter, cancelled)
        self.assertEqual(adapter.geometry_accounting['restriction_calls'], 1)




class BisectedSyntheticAdapter(RestrictedSyntheticAdapter):
    """Complete synthetic metadata; constant or exact affine normalized residual."""

    def __init__(self, amplitudes=None, time_squared=False):
        super().__init__()
        self.state_counts = (11, 13, 17, 19, 23, 29, 31, 37)
        times = tuple(F(n, 500) if n <= 50 else F(1, 10) + F(n-50, 1000) for n in range(81))
        self.frames = tuple(SimpleNamespace(time=exact_decimal(t)) for t in times)
        parents = []
        for lo, hi in zip(times, times[1:]):
            mid = (lo+hi)/2
            for a, b in ((lo, mid), (mid, hi)):
                n = len(parents)
                parents.append(SimpleNamespace(index=n, refined=n == 0, reception=A.Bounds(exact_decimal(a), exact_decimal(b)),
                                               bindings=('synthetic parent binding',)))
        self.parents = tuple(parents)
        self.amplitudes = amplitudes
        self.time_squared = time_squared
        self.foreign = None

    def project_restricted(self, frame, domain):
        projection = super().project_restricted(frame, domain)
        projection.context = self.context
        projection.parent_reception = self.parents[0].reception
        projection.cell.cell_index = 0
        projection.cell.bindings = self.parents[0].bindings
        projection.cell.frame_domain = A.Bounds(self.frames[0].time, self.frames[1].time)
        if self.foreign == 'context':
            projection.context = I.Context(I.FAMILY, 'c'*64, 'b'*64, '1', '10.304229970992187', str(RULER))
        elif self.foreign == 'parent':
            projection.parent_reception = A.Bounds('0', '0.002')
        elif self.foreign == 'bindings':
            projection.cell.bindings = ('foreign',)
        elif self.foreign == 'frame':
            projection.cell.frame_domain = A.Bounds('0', '0.003')
        return projection

    def evaluate(self, projection):
        value = super().evaluate(projection)
        if self.amplitudes is not None or self.time_squared:
            lo, hi = F(projection.cell.reception.lower), F(projection.cell.reception.upper)
            boxes = ((lo*lo, hi*hi),)*8 if self.time_squared else tuple((x*x, x*x) for x in self.amplitudes)
            value.ranges.member_ranges = tuple(SimpleNamespace(label=label, squared_norm=A.Bounds(exact_decimal(a), exact_decimal(b)))
                                               for label, (a, b) in zip(D.LABELS, boxes))
        return value

    def residual_for(self, evaluated, polynomial):
        if self.amplitudes is None and not self.time_squared:
            return super().residual_for(evaluated, polynomial)
        self.call_counts['residuals'] += 1
        self.residual_arguments.append((evaluated, polynomial))
        self.events.append(('residual', polynomial.key.label))
        i = D.LABELS.index(polynomial.key.label)
        lo = F(evaluated.projection.cell.reception.lower)
        affine = C.Affine(lo/RULER, F(1)/RULER) if self.time_squared else C.Affine(self.amplitudes[i]/RULER, F(0))
        return C.enclose(I, polynomial, (affine, C.Affine('0', '0'), C.Affine('0', '0')), (I.Bounds('0', '0'),)*3)


class BisectedTests(unittest.TestCase):
    def test_constant_known_answer_integrals_peak_and_claims(self):
        result = D.measure_bisected_restricted(BisectedSyntheticAdapter())
        q = RULER*RULER
        self.assertEqual(result.local_summary.total_integral, D.RationalBounds(str(8*q/1000), str(8*q/1000)))
        for member in result.local_summary.member_integrals:
            self.assertEqual(member.integral, D.RationalBounds(str(q/1000), str(q/1000)))
        self.assertEqual((F(result.local_summary.peak.lower), F(result.local_summary.peak.upper)), (RULER, RULER))
        self.assertEqual(result.local_summary.sum_leaf_integral_width_exact, '0')
        self.assertEqual(result.local_summary.serialized_integral_width, '0')
        for child in result.children:
            for member in child.leaf.cell.members:
                box = member.validated_integrals[0].bounds
                self.assertEqual((F(box.lower), F(box.upper)), (q/2000, q/2000))
            self.assertEqual(len(child.leaf.witnesses), 24)
            self.assertEqual(child.scope, 'conditional-child-interval-only-not-a-full-history-metric')
            self.assertTrue(all(v is False for v in asdict(child.claims).values()))
        self.assertTrue(all(v is False for v in asdict(result.claims).values()))
        self.assertNotIn('rms', asdict(result.local_summary))
        with self.assertRaises(FrozenInstanceError):
            result.scope = 'full'

    def test_exact_8_16_2_order_keys_identity_and_observed_deltas(self):
        adapter = BisectedSyntheticAdapter()
        result = D.measure_bisected_restricted(adapter)
        expected_domains = []
        for lo, hi in (('0', '0.0005'), ('0.0005', '0.001')):
            domain = I.Bounds(lo, hi)
            expected_domains.extend((domain, *G.node_neighborhoods(I, domain)))
        self.assertEqual([(e[2].lower, e[2].upper) for e in adapter.events if e[0] == 'restricted'],
                         [(x.lower, x.upper) for x in expected_domains])
        self.assertEqual(tuple(e[0] for e in adapter.events), (('restricted', 'evaluate')*4 + ('residual',)*8)*2)
        self.assertEqual(dict(result.call_counts), dict(projections=8, evaluations=8, residuals=16, root_queries=0, emission_refinements=0))
        self.assertEqual(result.history_state_evaluations, adapter.state_counts)
        self.assertEqual(dict(result.geometry_accounting), dict(restriction_calls=8, completed_restrictions=8,
                         history_state_evaluations=sum(adapter.state_counts), restricted_projections=8))
        for n, child in enumerate(result.children):
            self.assertEqual((child.request.frame_index, child.request.generation, child.request.path), (0, 160+n, (0, n)))
            self.assertIs(child.context, result.context)
            self.assertEqual(child.source_provenance, result.source_provenance)
            self.assertEqual(dict(child.call_counts), dict(projections=4, evaluations=4, residuals=8, root_queries=0, emission_refinements=0))
            for index, (value, polynomial) in enumerate(adapter.residual_arguments[8*n:8*n+8]):
                self.assertIs(value, adapter.values[4*n])
                self.assertIs(polynomial, child.leaf.response.members[index].polynomial)
                self.assertEqual(polynomial.key.domain, child.request.domain)
        self.assertIn('not-GK-State-issued', result.request_identity_scope)
        self.assertEqual(result.children[0].request.domain.upper, result.children[1].request.domain.lower)

    def test_split_accounting_includes_mandatory_cut_once_for_all_members(self):
        result = D.measure_bisected_restricted(BisectedSyntheticAdapter())
        self.assertEqual(asdict(result.split_accounting), dict(frame_index=0, mandatory_cut_tokens=('0.001',),
                         new_cut='0.0005', used_before=1, used_after=2, maximum=20, remaining=18))

    def test_distinct_member_constants_prevent_mean_or_member_omission(self):
        values = tuple(F(n) for n in range(1, 9))
        result = D.measure_bisected_restricted(BisectedSyntheticAdapter(amplitudes=values))
        for n, member in enumerate(result.local_summary.member_integrals, 1):
            self.assertEqual((F(member.integral.lower), F(member.integral.upper)), (F(n*n, 1000),)*2)
        self.assertEqual((F(result.local_summary.total_integral.lower), F(result.local_summary.total_integral.upper)), (F(204, 1000),)*2)
        self.assertEqual((F(result.local_summary.peak.lower), F(result.local_summary.peak.upper)), (F(8),)*2)

    def test_time_squared_exact_integrals_included_and_second_child_origin(self):
        adapter = BisectedSyntheticAdapter(time_squared=True)
        result = D.measure_bisected_restricted(adapter)
        targets = (F(1, 24000000000), F(7, 24000000000))
        for child, exact in zip(result.children, targets):
            for member in child.leaf.cell.members:
                box = member.validated_integrals[0].bounds
                self.assertLessEqual(F(box.lower), exact)
                self.assertGreaterEqual(F(box.upper), exact)
        total = result.local_summary.total_integral
        self.assertLessEqual(F(total.lower), F(8, 3000000000))
        self.assertGreaterEqual(F(total.upper), F(8, 3000000000))
        self.assertLessEqual(F(result.local_summary.peak.lower), F(1, 1000))
        self.assertGreaterEqual(F(result.local_summary.peak.upper), F(1, 1000))
        for _, polynomial in adapter.residual_arguments[8:]:
            self.assertEqual(polynomial.key.domain.lower, '0.0005')
            # Node interval midvalues and coefficient flooring need not give
            # the exact T^2 interpolant. They must still use the child origin.
            self.assertLessEqual(abs(F(polynomial.coefficients[0]) - F(1, 4000000)), F(1, 10**90))
            self.assertLessEqual(abs(F(polynomial.coefficients[1]) - F(1, 1000)), F(1, 10**85))
        self.assertGreaterEqual(F(result.local_summary.serialized_integral_width),
                                F(result.local_summary.sum_leaf_integral_width_exact))

    def test_progress_uses_cumulative_totals_without_full_aggregate(self):
        events = []
        D.measure_bisected_restricted(BisectedSyntheticAdapter(), lambda *e: events.append(e))
        self.assertEqual(events, [('range', n, 8) for n in range(1, 5)] + [('residual', n, 16) for n in range(1, 9)]
                         + [('leaf', 1, 2)] + [('range', n, 8) for n in range(5, 9)]
                         + [('residual', n, 16) for n in range(9, 17)] + [('leaf', 2, 2)])

    def test_bad_metadata_rejects_before_any_evaluation(self):
        mutations = (
            lambda a: setattr(a, 'frames', a.frames[:-1]),
            lambda a: setattr(a, 'parents', a.parents[:-1]),
            lambda a: setattr(a.parents[0], 'index', True),
            lambda a: setattr(a.parents[0], 'refined', False),
            lambda a: setattr(a.parents[1], 'reception', A.Bounds('0.0009', '0.002')),
            lambda a: setattr(a.parents[0], 'reception', A.Bounds('0', '0.0005')),
            lambda a: setattr(a.frames[1], 'time', '0.003'),
            lambda a: setattr(a.frames[2], 'time', '1e999999'),
        )
        for mutate in mutations:
            adapter = BisectedSyntheticAdapter(); mutate(adapter)
            with self.subTest(mutate=mutate), self.assertRaises(ValueError):
                D.measure_bisected_restricted(adapter)
            self.assertEqual(adapter.events, [])

    def test_foreign_context_parent_frame_or_binding_rejects_before_evaluate(self):
        for kind in ('context', 'parent', 'bindings', 'frame'):
            adapter = BisectedSyntheticAdapter(); adapter.foreign = kind
            with self.subTest(kind=kind), self.assertRaises(ValueError):
                D.measure_bisected_restricted(adapter)
            self.assertEqual(adapter.call_counts['evaluations'], 0)

    def test_same_generation_callbacks_cannot_switch_context_frames_or_parents(self):
        mutations = (
            lambda a: setattr(a, 'context', I.Context(I.FAMILY, 'c'*64, 'b'*64, '1', '10.304229970992187', '0.5320012303229503')),
            lambda a: setattr(a, 'provenance', (('scope', 'changed'),)),
            lambda a: setattr(a, 'frames', tuple(list(a.frames))),
            lambda a: setattr(a, 'parents', tuple(list(a.parents))),
            lambda a: setattr(a.frames[1], 'time', '0.003'),
        )
        for stage in ('range', 'residual', 'leaf'):
            for mutate in mutations:
                adapter = BisectedSyntheticAdapter()
                def callback(which, *_):
                    if which == stage: mutate(adapter)
                with self.subTest(stage=stage, mutate=mutate), self.assertRaises(ValueError):
                    D.measure_bisected_restricted(adapter, callback)

    def test_second_child_failure_never_returns_partial_success_or_retries(self):
        for at in (5, 8):
            adapter = BisectedSyntheticAdapter(); adapter.fail_at = at
            with self.subTest(at=at), self.assertRaisesRegex(RuntimeError, 'unavailable'):
                D.measure_bisected_restricted(adapter)
            self.assertEqual(adapter.call_counts['evaluations'], at)
            self.assertEqual(adapter.call_counts['residuals'], 8)

    def test_second_child_callback_cannot_add_numerical_or_geometry_work(self):
        for stage, target in (('range', 5), ('residual', 9), ('leaf', 2)):
            for field in ('projections', 'evaluations', 'residuals', 'root_queries', 'emission_refinements',
                          'restriction_calls', 'completed_restrictions', 'history_state_evaluations', 'restricted_projections'):
                adapter = BisectedSyntheticAdapter()
                def callback(which, ordinal, total):
                    if which == stage and ordinal == target:
                        (adapter.call_counts if field in adapter.call_counts else adapter.geometry_accounting)[field] += 1
                with self.subTest(stage=stage, field=field), self.assertRaises(ValueError):
                    D.measure_bisected_restricted(adapter, callback)

    def test_bisected_requires_fresh_counters_and_never_calls_global_protocol(self):
        adapter = BisectedSyntheticAdapter()
        D.measure_bisected_restricted(adapter)
        with self.assertRaisesRegex(ValueError, 'fresh'):
            D.measure_bisected_restricted(adapter)
        import ast
        tree = ast.parse((ROOT/'scripts/eom/f6c_single_leaf_diagnostic.py').read_text())
        # This obligation belongs to the bisected diagnostic and its complete
        # local helper graph, not the separately requested protocol session.
        functions = {node.name: node for node in tree.body if isinstance(node, ast.FunctionDef)}
        pending, visited, called = ['measure_bisected_restricted'], set(), set()
        while pending:
            name = pending.pop()
            if name in visited:
                continue
            visited.add(name)
            for node in ast.walk(functions[name]):
                if isinstance(node, ast.Call):
                    if isinstance(node.func, ast.Attribute):
                        called.add(node.func.attr)
                    elif isinstance(node.func, ast.Name) and node.func.id in functions:
                        pending.append(node.func.id)
        self.assertFalse({'start', 'respond', 'aggregate', 'enclose_root_cover'} & called)

    def test_rational_summary_is_not_decimal_bounds_and_widths_are_distinct(self):
        from dataclasses import replace
        result = D.measure_bisected_restricted(BisectedSyntheticAdapter())
        child = result.children[0]
        members = []
        for member in child.leaf.cell.members:
            integral = member.validated_integrals[0]
            box = I.Bounds(integral.bounds.lower, exact_decimal(F(integral.bounds.upper) + F(1, 10**100)))
            members.append(replace(member, validated_integrals=(replace(integral, bounds=box),)))
        widened = replace(child, leaf=replace(child.leaf, cell=replace(child.leaf.cell, members=tuple(members))))
        summary = D._local_summary(I, (widened, result.children[1]))
        self.assertIs(type(summary.total_integral), D.RationalBounds)
        self.assertEqual(F(summary.sum_leaf_integral_width_exact), 0)
        self.assertEqual(F(summary.serialized_integral_width), F(8, 10**100))

    def test_source_and_numeric_references_remain_the_frozen_contract(self):
        self.assertEqual(hashlib.sha256((ROOT/'scripts/eom/f6c_variable_cell_adapter.py').read_bytes()).hexdigest(),
                         '3ac5d1bfba780e41954ddda02120581a2ed4e6f17e3a07cdd058eed5063cec14')
        for key in ('rms', 'aggregate', 'full_run_authorized'):
            self.assertNotIn(key, D.BisectedRestrictedDiagnostic.__dataclass_fields__)

    def test_witness_is_bounded_by_same_member_and_both_closed_children(self):
        from dataclasses import replace
        result = D.measure_bisected_restricted(BisectedSyntheticAdapter())
        children = []
        for n, child in enumerate(result.children):
            members = tuple(replace(member, squared_norm=I.Bounds('0', ('1' if n == 0 else '4') if i == 0 else '100'))
                            for i, member in enumerate(child.leaf.cell.members))
            children.append(replace(child, leaf=replace(child.leaf, cell=replace(child.leaf.cell, members=members))))
        original = children[1]
        for time, label in (('0.0005', '0+'), ('0.00075', 'foreign')):
            witness = I.Witness(original.context, label, 0, time, '2')
            bad = replace(original, leaf=replace(original.leaf, witnesses=(witness,)))
            with self.subTest(time=time, label=label), self.assertRaises(ValueError):
                D._local_summary(I, (children[0], bad))
        # An interior right-child witness does not inherit the left upper bound.
        witness = I.Witness(original.context, '0+', 0, '0.00075', '2')
        good = replace(original, leaf=replace(original.leaf, witnesses=(witness,)))
        summary = D._local_summary(I, (children[0], good))
        self.assertLessEqual(F(summary.peak.lower)**2, 2)
        self.assertGreaterEqual(F(summary.peak.lower), 1)




class SessionSyntheticAdapter(BisectedSyntheticAdapter):
    """Synthetic full partition with source-like non-midpoint decimal knots."""
    @property
    def call_counts(self):
        if getattr(self, 'closed', False):
            raise ValueError('synthetic adapter closed')
        return self._counters

    @call_counts.setter
    def call_counts(self, value):
        self._counters = value

    @property
    def integral_reference(self):
        self.reference_fetches += 1
        # Model the actual adapter: a fresh proxy on every property read.
        return SimpleNamespace(**{k: v for k, v in vars(I).items() if not k.startswith('_')})

    def __init__(self, wide=False):
        self.closed = False
        self.reference_fetches = 0
        super().__init__()
        self.wide = wide
        self.state_counts = tuple(8 + n % 57 for n in range(13120))
        self.frames[2].time = '0.0040000000000000001'
        self.frames[3].time = '0.0060000000000000001'
        parents = []
        for index, (left, right) in enumerate(zip(self.frames, self.frames[1:])):
            lo, hi = F(left.time), F(right.time)
            middle = ('0.0030000000000000001' if index == 1 else
                      '0.0050000000000000001' if index == 2 else exact_decimal((lo+hi)/2))
            for a, b in ((left.time, middle), (middle, right.time)):
                n = len(parents)
                parents.append(SimpleNamespace(index=n, refined=n == 0, reception=A.Bounds(a, b),
                                               bindings=('synthetic parent binding', n)))
        self.parents = tuple(parents)

    def project_restricted(self, frame, domain):
        projection = RestrictedSyntheticAdapter.project_restricted(self, frame, domain)
        parent, = (p for p in self.parents if F(p.reception.lower) <= F(domain.lower) < F(domain.upper) <= F(p.reception.upper))
        projection.context = self.context
        projection.parent_reception = parent.reception
        projection.cell.cell_index = parent.index
        projection.cell.bindings = parent.bindings
        projection.cell.frame_domain = A.Bounds(self.frames[frame].time, self.frames[frame+1].time)
        return projection

    def evaluate(self, projection):
        value = RestrictedSyntheticAdapter.evaluate(self, projection)
        value.ranges.frame_index = projection.cell.frame_index
        if self.wide:
            value.ranges.member_ranges = tuple(SimpleNamespace(label=label, squared_norm=A.Bounds('0', '1')) for label in D.LABELS)
        return value


def genuine_session_adapter(*, refined_indices=(0,)):
    """Independent stationary family, using the genuine frozen adapter methods."""
    V = load('provider_adapter_fixture_helpers', 'tests/test_f6c_variable_cell_adapter.py',
             '9cf5aae2bcfd5fecd1e3a73855eee86b0c16b19164056f5ce745a4b4b1973a7c')
    metadata = SessionSyntheticAdapter()
    times = tuple(frame.time for frame in metadata.frames)
    grid_tokens = ('-8', '-1', metadata.parents[0].reception.lower) + tuple(p.reception.upper for p in metadata.parents)
    grid = tuple(zip(map(F, grid_tokens), map(F, grid_tokens[1:])))
    histories = []
    spacing = F(1, 2)
    for i, label in enumerate(D.LABELS):
        histories.append(dict(id=label, pathKey=i+1, polarity=1 if i%2 == 0 else -1,
            charge=('' if i%2 == 0 else '-') + V.subject.CHARGE, historyFingerprint='provider-static-'+label,
            coverageStart='-8', coverageEnd='0.13', segments=[
                dict(startTime=lo, endTime=hi, coefficients=[[V.dec(i*spacing), '0', '0', '0'], ['0']*4, ['0']*4],
                     positionErrors=['0']*3, velocityErrors=['0']*3, positionError='0', velocityError='0')
                for lo, hi in zip(grid_tokens, grid_tokens[1:])]))
    frames = [dict(frameIndex=n, time=t, members=[
        dict(pathKey=i+1, position=dict(x=V.dec(i*spacing), y='0', z='0'), velocity=dict(x='0', y='0', z='0'),
             positionErrorBound='0', stateFlags=1 if i%2 == 0 else 2) for i in range(8)]) for n, t in enumerate(times)]
    export = dict(schema='braid-program/f6c-retained-history-export.v1', fieldSpeed='1', coupling=V.subject.COUPLING,
                  retainedHistories=histories, acceptedFrames=frames, acceptedFrameIntervals=[
                      dict(leftFrameIndex=n, rightFrameIndex=n+1, startTime=lo, endTime=hi)
                      for n, (lo, hi) in enumerate(zip(times, times[1:]))])
    bindings = tuple(V.a.Binding(role, 'synthetic/'+role, 'a'*64, 1) for role in V.a.REQUIRED_BINDINGS)
    parents = []
    for n, original in enumerate(metadata.parents):
        t = V.a.Bounds(original.reception.lower, original.reception.upper)
        lo, hi = F(t.lower), F(t.upper)
        rows = []
        for i, label in enumerate(D.LABELS):
            for j, other in enumerate(D.LABELS):
                if i == j:
                    rows.append(V.a.RootRow(label, other, t, None, 0, True, None, None, None, None,
                                           None, None, None, None, None, True, False))
                    continue
                d, epsilon = abs(i-j)*spacing, F(1, 10000)
                e = V.box(lo-d-epsilon, hi-d+epsilon)
                rx = V.independent_clip(grid, lo, hi)
                tx = V.independent_clip(grid, F(e.lower), F(e.upper))
                rows.append(V.a.RootRow(label, other, t, e, 1, False, V.box(d-8-hi, d-8-lo),
                    V.box(lo-hi-epsilon, -epsilon), V.box(epsilon, hi-lo+epsilon),
                    (V.box((i-j)*spacing), V.box(0), V.box(0)), V.box(d), V.box(1), V.box(1),
                    rx[3], tx[3], True, False))
        parents.append(V.subject.ParentCell(n, t, tuple(rows), bindings, n in refined_indices))
    # Explicit synthetic construction seam; no source-bound open_adapter call.
    adapter = V.subject._build(V.a, V.integral, V.correlated, export, tuple(parents), actual=False,
        provenance=(('scope', 'genuine-static-synthetic-only'),), gk=G, geometry=V.geometry,
        geometry_references=V.geometry.References(V.geometry_history, V.geometry_roots, V.geometry_intervals, V.a),
        geometry_guards=V.geometry.Guards('1', ('0.85',)*8,
            tuple(tuple('0' if i == j else '0.27' for j in range(8)) for i in range(8))))
    return adapter, V


class LeafResponseSessionTests(unittest.TestCase):
    def test_genuine_two_refined_parents_construct_and_advance_without_relabeling(self):
        adapter, V = genuine_session_adapter(refined_indices=(0, 1))
        self.assertEqual(tuple(p.index for p in adapter.parents if p.refined), (0, 1))
        session = D.LeafResponseSession(adapter)
        self.assertEqual(tuple(adapter.call_counts[k] for k in D.COUNTERS), (0,)*5)
        self.assertEqual(tuple(adapter.geometry_accounting.values()), (0,)*4)
        coupling, charge, ruler = F(V.subject.COUPLING), F(V.subject.CHARGE), F(V.subject.RULER)
        expected = tuple(sum((coupling*charge*charge*(-1)**(i+j)*(1 if i>j else -1)
                              / F(abs(i-j), 2)**2 for j in range(8) if i != j), F(0)) for i in range(8))
        for n, endpoints in enumerate((('0', '0.001'), ('0.001', '0.002'))):
            pending = G.request(session.state)
            self.assertEqual((pending.generation, pending.frame_index, pending.path), (n, 0, (n,)))
            self.assertEqual((pending.domain.lower, pending.domain.upper), endpoints)
            provision = session.provide(session.state)
            self.assertEqual(len(provision.ranges), 4)
            self.assertEqual(len(provision.correlated_residuals), 8)
            self.assertTrue(adapter.parents[n].refined)
            for snapshot in provision.ranges:
                self.assertEqual((snapshot.cell.cell_index, snapshot.cell.frame_index), (n, 0))
                self.assertEqual(len(snapshot.cell.rows), 64)
                for row, parent in zip(snapshot.cell.rows, adapter.parents[n].rows):
                    for field in ('emission', 'oldest_residual', 'lower_face_residual', 'upper_face_residual'):
                        self.assertEqual(getattr(row, field), getattr(parent, field))
                for i, member in enumerate(snapshot.ranges.member_ranges):
                    for axis, value in enumerate((expected[i], F(0), F(0))):
                        self.assertLessEqual(F(member.acceleration[axis].lower), value)
                        self.assertGreaterEqual(F(member.acceleration[axis].upper), value)
                    norm = ruler*ruler*expected[i]*expected[i]
                    self.assertLessEqual(F(member.squared_norm.lower), norm)
                    self.assertGreaterEqual(F(member.squared_norm.upper), norm)
            self.assertTrue(all(value is False for value in asdict(provision.claims).values()))
            next_state = session.advance(provision)
            self.assertIs(next_state.evaluations[-1].response, provision.response)
        self.assertEqual(tuple(adapter.call_counts[k] for k in D.COUNTERS), (8, 8, 16, 0, 0))
        self.assertEqual(adapter.geometry_accounting['restriction_calls'], 8)
        self.assertEqual(len(session.state.evaluations), 2)
        self.assertEqual(sum(leaf.evaluation is None for leaf in session.state.leaves), 158)
        self.assertIsNone(session.state.aggregate)

    def test_refinement_flags_are_typed_metadata_not_a_second_admission_policy(self):
        adapter = SessionSyntheticAdapter()
        baseline = D._partition_metadata(adapter)
        self.assertEqual(baseline[3], tuple(n == 0 for n in range(160)))
        adapter.parents[1].refined = True
        adapter.parents[4].refined = True  # Synthetic metadata only; no source authority.
        current = D._partition_metadata(adapter)
        self.assertEqual(current[:3], baseline[:3])
        self.assertEqual(tuple(n for n, value in enumerate(current[3]) if value), (0, 1, 4))
        for bad in (None, 0, 1, 'true', [], {}):
            candidate = SessionSyntheticAdapter(); candidate.parents[1].refined = bad
            with self.subTest(value=bad), self.assertRaises(ValueError):
                D.LeafResponseSession(candidate)
            self.assertEqual(tuple(candidate.call_counts.values()), (0,)*5)
        candidate = SessionSyntheticAdapter(); candidate.parents[0].refined = False
        with self.assertRaises(ValueError): D.LeafResponseSession(candidate)

    def test_refinement_flag_changes_poison_the_same_generation(self):
        for initial in (False, True):
            adapter = SessionSyntheticAdapter(); adapter.parents[1].refined = initial
            session = D.LeafResponseSession(adapter); state = session.state
            adapter.parents[1].refined = not initial
            with self.assertRaises(ValueError): session.provide(state)
            self.assertEqual(session.status, 'failed')
            self.assertEqual(tuple(adapter.call_counts.values()), (0,)*5)
        adapter = BisectedSyntheticAdapter()
        def changed(stage, *_):
            if stage == 'range': adapter.parents[1].refined = True
        with self.assertRaises(ValueError): D.measure_bisected_restricted(adapter, changed)

    def test_constructor_derives_exact_all_frame_knots_and_captures_reference_once(self):
        adapter = SessionSyntheticAdapter()
        session = D.LeafResponseSession(adapter)
        state = session.state
        self.assertIs(type(state), G.State)
        self.assertEqual(len(state.leaves), 160)
        self.assertEqual(tuple(state.split_counts), (1,)*80)
        self.assertEqual(state.plan.frames[1].domain.upper, '0.0040000000000000001')
        self.assertEqual(state.plan.mandatory_knots[1], ('0.0030000000000000001',))
        self.assertNotEqual(F(state.plan.mandatory_knots[1][0]),
                            (F(state.plan.frames[1].domain.lower)+F(state.plan.frames[1].domain.upper))/2)
        self.assertEqual([(x.request.domain.lower, x.request.domain.upper) for x in state.leaves],
                         [(p.reception.lower, p.reception.upper) for p in adapter.parents])
        self.assertIs(session.integral_reference, session.integral_reference)
        self.assertEqual(adapter.reference_fetches, 1)
        self.assertEqual(tuple(adapter.call_counts.values()), (0,)*5)
        self.assertEqual(tuple(adapter.geometry_accounting.values()), (0,)*4)
        with self.assertRaises(TypeError):
            session.state = state

    def test_provide_zero_leaf_evaluations_advance_exactly_once(self):
        counts = dict(start=0, respond=0, evaluate_leaf=0)
        code = {getattr(G, name).__code__: name for name in counts}
        def observe(frame, event, arg):
            if event == 'call' and frame.f_code in code:
                counts[code[frame.f_code]] += 1
        previous = sys.getprofile()
        try:
            sys.setprofile(observe)
            adapter = SessionSyntheticAdapter()
            session = D.LeafResponseSession(adapter)
            state = session.state
            pending = G.request(state)
            provision = session.provide(state)
            self.assertEqual(counts, dict(start=1, respond=0, evaluate_leaf=0))
            self.assertIs(provision.response.request, pending)
            self.assertEqual(len(provision.ranges), 4)
            self.assertEqual(len(provision.correlated_residuals), 8)
            self.assertEqual(dict(provision.call_counts), dict(projections=4, evaluations=4, residuals=8, root_queries=0, emission_refinements=0))
            self.assertEqual(provision.history_state_evaluations, (8, 9, 10, 11))
            self.assertTrue(all(v is False for v in asdict(provision.claims).values()))
            next_state = session.advance(provision)
            self.assertEqual(counts, dict(start=1, respond=1, evaluate_leaf=1))
            self.assertIs(next_state, session.state)
            self.assertIs(next_state.evaluations[-1].response, provision.response)
            self.assertEqual(adapter.reference_fetches, 1)
            self.assertIsNone(next_state.aggregate)
        finally:
            sys.setprofile(previous)

    def test_sequential_requests_nonzero_and_last_frame_and_shared_split_owned_by_GK(self):
        adapter = SessionSyntheticAdapter(wide=True)
        session = D.LeafResponseSession(adapter)
        seen = []
        for n in range(160):
            state = session.state
            request = G.request(state)
            seen.append(request)
            provision = session.provide(state)
            self.assertEqual(provision.response.request, request)
            for snapshot in provision.ranges:
                self.assertEqual(snapshot.cell.frame_index, request.frame_index)
                self.assertEqual(snapshot.cell.cell_index, n)
            session.advance(provision)
        self.assertEqual(seen[2].frame_index, 1)
        self.assertEqual(seen[-1].frame_index, 79)
        self.assertEqual(seen[-1].domain.upper, '0.13')
        state = session.state
        self.assertEqual(len(state.evaluations), 160)
        self.assertEqual(state.split_counts[0], 2)
        self.assertEqual(state.split_counts[1:], (1,)*79)
        child = G.request(state)
        self.assertEqual((child.generation, child.path, child.frame_index), (160, (0, 0), 0))
        self.assertEqual((child.domain.lower, child.domain.upper), ('0', '0.0005'))
        self.assertEqual(tuple(adapter.call_counts.values()), (640, 640, 1280, 0, 0))
        self.assertEqual(adapter.reference_fetches, 1)
        response = session.provide(state)
        self.assertIs(response.response.request, child)
        self.assertEqual(dict(response.call_counts)['evaluations'], 644)

    def test_foreign_copied_or_bare_request_rejected_before_numeric_work(self):
        adapter = SessionSyntheticAdapter()
        session = D.LeafResponseSession(adapter)
        foreign = G.start(session.integral_reference, session.state.plan)
        candidates = (foreign, G.request(session.state), None)
        for wrong in candidates:
            target = SessionSyntheticAdapter()
            owned = D.LeafResponseSession(target)
            with self.subTest(wrong=type(wrong).__name__), self.assertRaises(ValueError):
                owned.provide(wrong)
            self.assertEqual(tuple(target.call_counts.values()), (0,)*5)
            self.assertEqual(owned.status, 'failed')
        from copy import copy
        # Opaque State copies cannot be created through its public constructor.
        with self.assertRaises(ValueError):
            copy(session.state)

    def test_duplicate_provision_and_failed_provision_are_not_retryable(self):
        adapter = SessionSyntheticAdapter(); session = D.LeafResponseSession(adapter)
        state = session.state
        provision = session.provide(state)
        with self.assertRaises(ValueError):
            session.provide(state)
        with self.assertRaises(ValueError):
            session.advance(provision)
        self.assertEqual(tuple(adapter.call_counts.values()), (4, 4, 8, 0, 0))
        for at in (1, 3):
            adapter = SessionSyntheticAdapter(); adapter.fail_at = at
            session = D.LeafResponseSession(adapter); state = session.state
            with self.subTest(at=at), self.assertRaisesRegex(RuntimeError, 'unavailable'):
                session.provide(state)
            with self.assertRaises(ValueError):
                session.provide(state)
            self.assertEqual(adapter.call_counts['evaluations'], at)
            self.assertEqual(session.status, 'failed')

    def test_copy_replacement_foreign_and_reused_provision_rejected(self):
        from dataclasses import replace
        for change in (lambda p: replace(p), lambda p: p.response, lambda p: None):
            adapter = SessionSyntheticAdapter(); session = D.LeafResponseSession(adapter)
            provision = session.provide(session.state)
            with self.subTest(change=change), self.assertRaises(ValueError):
                session.advance(change(provision))
            self.assertEqual(session.status, 'failed')
            self.assertEqual(tuple(adapter.call_counts.values()), (4, 4, 8, 0, 0))
        adapter = SessionSyntheticAdapter(); session = D.LeafResponseSession(adapter)
        old_state = session.state; provision = session.provide(old_state); session.advance(provision)
        with self.assertRaises(ValueError):
            session.provide(old_state)
        adapter = SessionSyntheticAdapter(); session = D.LeafResponseSession(adapter)
        provision = session.provide(session.state); session.advance(provision)
        with self.assertRaises(ValueError):
            session.advance(provision)

    def test_external_counter_or_geometry_work_between_operations_rejects(self):
        for before_advance in (False, True):
            for field in D.COUNTERS+D.GEOMETRY_COUNTERS:
                adapter = SessionSyntheticAdapter(); session = D.LeafResponseSession(adapter)
                state = session.state
                provision = session.provide(state) if before_advance else None
                values = adapter.call_counts if field in D.COUNTERS else adapter.geometry_accounting
                values[field] += 1
                with self.subTest(before_advance=before_advance, field=field), self.assertRaises(ValueError):
                    session.advance(provision) if before_advance else session.provide(state)

    def test_callbacks_cannot_reenter_provide_or_advance_even_if_error_caught(self):
        for stage in ('range', 'residual'):
            for action in ('provide', 'advance'):
                adapter = SessionSyntheticAdapter(); session = D.LeafResponseSession(adapter)
                state = session.state
                def callback(which, *_):
                    if which == stage:
                        try:
                            session.provide(state) if action == 'provide' else session.advance(None)
                        except ValueError:
                            pass
                with self.subTest(stage=stage, action=action), self.assertRaises(ValueError):
                    session.provide(state, callback)
                self.assertEqual(session.status, 'failed')
                self.assertEqual(adapter.call_counts['evaluations'], 1 if stage == 'range' else 4)

    def test_callback_counter_context_closed_and_exception_fail_immediately(self):
        def cancelled(a):
            raise RuntimeError('cancelled')
        mutations = (
            lambda a: a.call_counts.__setitem__('evaluations', a.call_counts['evaluations']+1),
            lambda a: a.geometry_accounting.__setitem__('history_state_evaluations', a.geometry_accounting['history_state_evaluations']+1),
            lambda a: setattr(a, 'context', I.Context(I.FAMILY, 'c'*64, 'b'*64, '1', '10.304229970992187', '0.5320012303229503')),
            lambda a: setattr(a, 'closed', True),
            cancelled,
        )
        for stage in ('range', 'residual'):
            for mutation in mutations:
                adapter = SessionSyntheticAdapter(); session = D.LeafResponseSession(adapter); state = session.state
                def callback(which, *_):
                    if which == stage: mutation(adapter)
                with self.subTest(stage=stage, mutation=mutation), self.assertRaises((ValueError, RuntimeError)):
                    session.provide(state, callback)
                self.assertEqual(session.status, 'failed')
                self.assertEqual(adapter._counters['residuals'], 0 if stage == 'range' else 1)

    def test_progress_is_per_request_and_no_leaf_callback(self):
        adapter = SessionSyntheticAdapter(); session = D.LeafResponseSession(adapter)
        for _ in range(2):
            events = []
            provision = session.provide(session.state, lambda *event: events.append(event))
            self.assertEqual(events, [('range', n, 4) for n in range(1, 5)]+[('residual', n, 8) for n in range(1, 9)])
            session.advance(provision)

    def test_metadata_lexemes_and_shape_are_not_regularized_or_repaired(self):
        mutations = (
            lambda a: setattr(a, 'frames', a.frames[:-1]),
            lambda a: setattr(a, 'parents', a.parents[:-1]),
            lambda a: setattr(a.frames[2], 'time', '0.004'),
            lambda a: setattr(a.parents[2], 'reception', A.Bounds('0.002', '0.003')),
            lambda a: setattr(a.parents[2], 'index', True),
        )
        for mutation in mutations:
            adapter = SessionSyntheticAdapter(); mutation(adapter)
            with self.subTest(mutation=mutation), self.assertRaises(ValueError):
                D.LeafResponseSession(adapter)
            self.assertEqual(tuple(adapter.call_counts.values()), (0,)*5)
        adapter = SessionSyntheticAdapter(); session = D.LeafResponseSession(adapter); state = session.state
        adapter.parents[2].reception = A.Bounds('0.002', '0.003')
        with self.assertRaises(ValueError):
            session.provide(state)

    def test_genuine_adapter_issued_projection_identity_frame_and_stationary_answer(self):
        adapter, V = genuine_session_adapter()
        session = D.LeafResponseSession(adapter)
        coupling, charge, ruler = F(V.subject.COUPLING), F(V.subject.CHARGE), F(V.subject.RULER)
        expected = []
        for i in range(8):
            expected.append(sum((coupling*charge*charge*((-1)**(i+j))*(1 if i>j else -1)
                                 / (F(abs(i-j), 2)**2) for j in range(8) if i != j), F(0)))
        for n in range(3):
            provision = session.provide(session.state)
            for snapshot in provision.ranges:
                self.assertEqual(snapshot.cell.cell_index, n)
                self.assertEqual(snapshot.cell.frame_index, n//2)
                self.assertEqual(len(snapshot.cell.rows), 64)
                for row, parent in zip(snapshot.cell.rows, adapter.parents[n].rows):
                    self.assertEqual(row.emission, parent.emission)
                    self.assertEqual(row.oldest_residual, parent.oldest_residual)
                    self.assertEqual(row.lower_face_residual, parent.lower_face_residual)
                for i, member in enumerate(snapshot.ranges.member_ranges):
                    self.assertLessEqual(F(member.acceleration[0].lower), expected[i])
                    self.assertGreaterEqual(F(member.acceleration[0].upper), expected[i])
                    norm = ruler*ruler*expected[i]*expected[i]
                    self.assertLessEqual(F(member.squared_norm.lower), norm)
                    self.assertGreaterEqual(F(member.squared_norm.upper), norm)
            next_state = session.advance(provision)
            self.assertIs(next_state.evaluations[-1].response, provision.response)
        self.assertEqual(dict(adapter.call_counts)['evaluations'], 12)
        self.assertEqual(dict(adapter.call_counts)['residuals'], 24)
        self.assertEqual(dict(adapter.geometry_accounting)['restriction_calls'], 12)

    def test_legacy_bisected_dynamic_tripwire_still_forbids_protocol_execution(self):
        adapter = BisectedSyntheticAdapter()
        def forbidden(*_):
            raise AssertionError('legacy diagnostic must not run global protocol')
        api = {k: v for k, v in vars(G).items() if not k.startswith('_')}
        api.update(start=forbidden, respond=forbidden)
        adapter.gk_protocol = SimpleNamespace(**api)
        integral = {k: v for k, v in vars(I).items() if not k.startswith('_')}
        integral['aggregate'] = forbidden
        adapter.integral_reference = SimpleNamespace(**integral)
        D.measure_bisected_restricted(adapter)

    def test_late_transition_failure_and_closed_session_never_repeat_leaf_math(self):
        for failure in ('raise', 'extra_geometry', 'closed'):
            adapter = SessionSyntheticAdapter()
            calls = []
            api = {k: v for k, v in vars(G).items() if not k.startswith('_')}
            def respond(ref, state, response):
                calls.append(response)
                result = G.respond(ref, state, response)
                if failure == 'raise':
                    raise RuntimeError('late transition failure')
                if failure == 'extra_geometry':
                    adapter.geometry_accounting['history_state_evaluations'] += 1
                else:
                    adapter.closed = True
                return result
            api['respond'] = respond
            adapter.gk_protocol = SimpleNamespace(**api)
            session = D.LeafResponseSession(adapter)
            provision = session.provide(session.state)
            with self.subTest(failure=failure), self.assertRaises((ValueError, RuntimeError)):
                session.advance(provision)
            self.assertEqual(session.status, 'failed')
            with self.assertRaises(ValueError):
                session.advance(provision)
            self.assertEqual(len(calls), 1)
        adapter = SessionSyntheticAdapter(); session = D.LeafResponseSession(adapter)
        saved = session.state; adapter.closed = True
        with self.assertRaises(ValueError):
            _ = session.state
        adapter.closed = False  # Synthetic recovery cannot revive the session.
        with self.assertRaises(ValueError):
            session.provide(saved)

    def test_initial_state_construction_cannot_hide_adapter_work(self):
        adapter = SessionSyntheticAdapter()
        api = {k: v for k, v in vars(G).items() if not k.startswith('_')}
        def start(ref, plan):
            result = G.start(ref, plan)
            adapter.call_counts['evaluations'] += 1
            return result
        api['start'] = start
        adapter.gk_protocol = SimpleNamespace(**api)
        with self.assertRaisesRegex(ValueError, 'intervening'):
            D.LeafResponseSession(adapter)
        self.assertEqual(adapter.events, [])


if __name__ == '__main__':
    unittest.main()
