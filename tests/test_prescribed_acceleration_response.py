"""Independent rational controls only; no actual F5 data or root solver.

The fixtures below define affine paths and algebraically known unique roots.
They are not accepted scientific receipts. Expected responses come from the
predeclaration's closed forms, not a call to another response implementation.
"""
from dataclasses import FrozenInstanceError, fields, replace
from decimal import Decimal as D, localcontext
from fractions import Fraction as F
import math
import random
import struct
import unittest

from scripts.eom.oracle import prescribed_acceleration_response as response
from scripts.eom.oracle.decimal_interval import DecimalInterval as I


def decimal_exact(value):
    """Independent finite decimal expansion by integer long division."""
    value = F(value)
    sign = '-' if value < 0 else ''
    n, d = abs(value.numerator), value.denominator
    whole, remainder = divmod(n, d)
    tail = []
    while remainder:
        digit, remainder = divmod(remainder*10, d)
        tail.append(str(digit))
        if len(tail) > 1400:
            raise AssertionError('fixture needs a terminating decimal')
    return sign+str(whole)+('.'+''.join(tail) if tail else '')


def independent_fingerprint(segments):
    # Build the entire independently specified length-framed byte stream first.
    strings = ['eom_history_segment_chain/v1']
    for p in segments:
        strings += [p.t_start, p.t_end]
        strings += [v for axis in p.coefficients for v in axis]
        strings += list(p.position_errors)+list(p.velocity_errors)
    stream = b''.join(str(len(s.encode())).encode()+b':'+s.encode() for s in strings)
    h = 14695981039346656037
    for byte in stream:
        h ^= byte
        h *= 1099511628211
        h %= 18446744073709551616
    return 'fnv1a64-chain-v1:'+format(h, '016x')


def member(index, position, velocity=(0, 0, 0), *, polarity=1, knots=(-2, 0), error='0'):
    segments = []
    for k, (a, b) in enumerate(zip(knots, knots[1:])):
        coefficients = tuple((decimal_exact(F(x)+F(v)*a), decimal_exact(v), '0', '0')
                             for x, v in zip(position, velocity))
        segments.append(response.SegmentTokens(k, decimal_exact(a), decimal_exact(b),
                                               coefficients, (error,)*3, (error,)*3))
    pieces = tuple(segments)
    return response.MemberTokens(index, f'synthetic-architrino-{index}',
        f'synthetic-worldline-{index}', polarity, f'synthetic-history-{index}',
        independent_fingerprint(pieces), pieces)


def native_bounds(value):
    """Independent host conversion used only for known exact control roots."""
    exact = F(value)
    rounded = float(exact)
    if F(rounded) == exact:
        return (repr(rounded), repr(rounded))
    return (repr(math.nextafter(rounded, -math.inf)),
            repr(math.nextafter(rounded, math.inf)))


def root(emission, dt=1, dr=1, indices=(0,)):
    return response.NativeRoot(*native_bounds(emission), *native_bounds(dt),
        *native_bounds(dr), 1, indices, 'binary64_outward', 53)


def request(members, roots, *, lower='-2'):
    pairs = []
    n = len(members)
    for i, receiver in enumerate(members):
        for j, transmitter in enumerate(members):
            pairs.append(response.NativePairSelection(i*n+j, f'synthetic-row-{i}-{j}', i, j,
                receiver.history_id, transmitter.history_id,
                receiver.history_fingerprint, transmitter.history_fingerprint,
                '0', lower, '0', '1', '1e-8', response.NATIVE_SCHEMA,
                'certified_complete', '', True, False, i == j, False, 0, 53,
                () if i == j else (roots[(i, j)],)))
    return response.ResponseInput('synthetic-control', 'synthetic-campaign',
        'synthetic-run', '0', lower, 90, (), ('synthetic-exact',), tuple(members), tuple(pairs))


def stationary_request(positions=((F(1, 2), 0, 0), (0, 0, 0)), polarities=(1, 1), knots=(-2, 0)):
    members = tuple(member(i, p, polarity=polarities[i], knots=knots) for i, p in enumerate(positions))
    roots = {}
    for i, p in enumerate(positions):
        for j, q in enumerate(positions):
            if i == j:
                continue
            square = sum((F(a)-F(b))**2 for a, b in zip(p, q))
            sn, sd = math.isqrt(square.numerator), math.isqrt(square.denominator)
            assert sn*sn == square.numerator and sd*sd == square.denominator
            emission = -F(sn, sd)
            indices = tuple(k for k, (a, b) in enumerate(zip(knots, knots[1:])) if a <= emission <= b)
            roots[i, j] = root(emission, indices=indices)
    return request(members, roots)


def point(value):
    return I.point(decimal_exact(value), 90)


def vector(*values):
    return tuple(point(v) for v in values)


def change_pair(req, index, **updates):
    return replace(req, pairs=req.pairs[:index]+(replace(req.pairs[index], **updates),)+req.pairs[index+1:])


class ExactControls(unittest.TestCase):
    def assertContains(self, box, value):
        if isinstance(box, dict):
            lo, hi = box['lower'], box['upper']
            self.assertEqual(F(hi)-F(lo), F(int(box['widthNumerator']), int(box['widthDenominator'])))
        else:
            lo, hi = box.lower, box.upper
        self.assertLessEqual(F(lo), F(value))
        self.assertGreaterEqual(F(hi), F(value))

    def assertVector(self, boxes, values):
        for box, value in zip(boxes, values):
            self.assertContains(box, value)

    def test_stationary_rational_directions_polarity_and_axis_permutations(self):
        # R=(3/5,4/5,0), d=1: signed response is precisely signed R.
        for p in ((F(3, 5), F(4, 5), 0), (0, F(3, 5), F(4, 5)),
                  (F(4, 5), 0, -F(3, 5)), (F(1, 2), 0, 0)):
            d = F(1, 2) if p == (F(1, 2), 0, 0) else F(1)
            for sign in (-1, 1):
                req = stationary_request((p, (0, 0, 0)), (1, sign))
                record = response.evaluate_response(req).to_record()
                expected = tuple(sign*F(x)/d**3 for x in p)
                self.assertVector(record['responses'][0]['components'], expected)
                self.assertVector(record['responses'][1]['components'], tuple(-x for x in expected))
                self.assertFalse(record['accepted'])
                self.assertTrue(record['arithmeticComplete'])

    def test_common_axial_motion_both_directions_and_polarities(self):
        # Derived independently: G+=(1-v)/L^2 and G-=-(1+v)/L^2.
        length = F(1, 2)
        for v in (-F(1, 2), F(0), F(1, 2)):
            for axis in range(3):
                position = tuple(length if k == axis else F(0) for k in range(3))
                velocity = tuple(v if k == axis else F(0) for k in range(3))
                for sign in (-1, 1):
                    members = (member(0, position, velocity), member(1, (0, 0, 0), velocity, polarity=sign))
                    req = request(members, {(0, 1): root(-length/(1-v), 1-v, 1-v),
                                            (1, 0): root(-length/(1+v), 1+v, 1+v)})
                    record = response.evaluate_response(req).to_record()
                    for i, expected in enumerate((sign*(1-v)/length**2, -sign*(1+v)/length**2)):
                        self.assertVector(record['responses'][i]['components'],
                                          tuple(expected if k == axis else 0 for k in range(3)))

    def test_nonaxial_receiver_velocity_does_not_multiply_response(self):
        expected = (F(5, 4), F(15, 16), F(0))
        answers = []
        for velocity, dr in (((0, 0, 0), F(1)), ((F(1, 2), 0, 0), F(3, 5)),
                             ((0, F(1, 2), 0), F(7, 10))):
            r = root(-1, F(16, 25), dr)
            value = response._root_response(vector(F(4, 5), 0, 0), vector(*velocity),
                vector(0, -F(3, 5), 0), vector(0, F(3, 5), 0), point(-1), r)[0]
            self.assertVector(value, expected)
            answers.append(value)
        self.assertEqual(answers[0], answers[1])
        self.assertEqual(answers[1], answers[2])

    def test_nonaxial_complete_two_member_pipeline(self):
        # Reverse ordered pair sees a stationary transmitter at x=4/5;
        # its sole root is -4/5 and its unsigned response is (-25/16,0,0).
        for sign in (-1, 1):
            members = (member(0, (F(4, 5), 0, 0)),
                       member(1, (0, 0, 0), (0, F(3, 5), 0), polarity=sign))
            req = request(members, {(0, 1): root(-1, F(16, 25)),
                                    (1, 0): root(-F(4, 5))})
            record = response.evaluate_response(req).to_record()
            self.assertVector(record['responses'][0]['components'], (sign*F(5, 4), sign*F(15, 16), 0))
            self.assertVector(record['responses'][1]['components'], (-sign*F(25, 16), 0, 0))

    def test_three_member_fixed_order_sum_and_symmetric_zero_containment(self):
        req = stationary_request(((-F(1, 2), 0, 0), (0, 0, 0), (F(1, 2), 0, 0)), (1, 1, 1))
        record = response.evaluate_response(req).to_record()
        for row, exact in zip(record['responses'], (-5, 0, 5)):
            self.assertVector(row['components'], (exact, 0, 0))
        self.assertEqual(record['census'], {'members': 3, 'segments': 3, 'orderedPairs': 9,
                                          'ordinaryRoots': 6, 'selfExclusions': 3})
        self.assertEqual([(x['receiverIndex'], x['transmitterIndex']) for x in record['contributions']],
                         [(0, 1), (0, 2), (1, 0), (1, 2), (2, 0), (2, 1)])
        self.assertFalse(any(record['claims'].values()))
        self.assertEqual(record['newRootSearches'], 0)

    def test_closed_knot_history_coverage_keeps_both_pieces(self):
        req = stationary_request(((1, 0, 0), (0, 0, 0)), knots=(-2, -1, 0))
        record = response.evaluate_response(req).to_record()
        for row in record['contributions']:
            self.assertEqual([p['index'] for p in row['transmitterPieces']], [0, 1])
            self.assertEqual(row['nativeSegmentIndices'], [0, 1])
        self.assertVector(record['responses'][0]['components'], (1, 0, 0))

    def test_exact_decimal_mapping_preserves_nonbinary_coefficients_and_origins(self):
        m = member(0, (F(1, 10), F(3, 10), 0), (F(1, 5), 0, 0), knots=(-2, -1, 0))
        history = response.map_member(m, 0, False)
        self.assertEqual(F(history.segments[0].coefficients[0][0]), -F(3, 10))
        self.assertNotEqual(F(history.segments[0].coefficients[0][0]), F(float('-0.3')))
        self.assertEqual(history.segments[0].t_start, D('-2'))
        state = response.history_state_over(history, point(0))
        self.assertVector(state.position, (F(1, 10), F(3, 10), 0))
        self.assertVector(state.velocity, (F(1, 5), 0, 0))
        self.assertEqual(response.fnv_fingerprint(m.segments), independent_fingerprint(m.segments))

    def test_exact_cubic_mapping_against_rational_horner_at_original_origin(self):
        # q_x(u)=1/10+u/5-3u^2/10+u^3/2, u=t+2.
        segment = response.SegmentTokens(0, '-2', '0',
            (('0.1', '0.2', '-0.3', '0.5'), ('0',)*4, ('0',)*4), ('0',)*3, ('0',)*3)
        m = replace(member(0, (0, 0, 0)), segments=(segment,), history_fingerprint=independent_fingerprint((segment,)))
        history = response.map_member(m, 0, False)
        for t in (F(-2), F(-7, 4), F(-1), F(-1, 4), F(0)):
            u = t+2
            expected_x = F(1, 10)+u/F(5)-F(3, 10)*u*u+u**3/F(2)
            expected_v = F(1, 5)-F(3, 5)*u+F(3, 2)*u*u
            state = response.history_state_over(history, point(t))
            self.assertContains(state.position[0], expected_x)
            self.assertContains(state.velocity[0], expected_v)


class BinaryMapping(unittest.TestCase):
    def test_rounding_against_independent_ieee_host_bits(self):
        rng = random.Random(2741)
        values = ['0', '-0', '0.1', '-0.3', '1e-320', '-1e-320', '1e-1000', '-1e-1000',
                  '2.2250738585072014e-308', '1.7976931348623157e308']
        values += [str(rng.randrange(-10**18, 10**18))+'e'+str(rng.randrange(-280, 281)) for _ in range(220)]
        for literal in values:
            expected = struct.pack('>d', float(literal)).hex()
            self.assertEqual(response.binary64_bits(literal), expected, literal)
            self.assertEqual(response.bits_value(expected), F(struct.unpack('>d', bytes.fromhex(expected))[0]))

    def test_ties_even_and_signed_subnormal_rounding(self):
        for word in (0x3fe0000000000000, 0x3fe0000000000001, 0x3ff0000000000000, 0x3ff0000000000001):
            a = F(struct.unpack('>d', word.to_bytes(8, 'big'))[0])
            b = F(struct.unpack('>d', (word+1).to_bytes(8, 'big'))[0])
            literal = decimal_exact((a+b)/2)
            self.assertEqual(int(response.binary64_bits(literal), 16), word+(word & 1))
        # Compact tokens around half the smallest positive subnormal.
        self.assertEqual(response.binary64_bits('2.4703282292062327e-324'), '0000000000000000')
        self.assertEqual(response.binary64_bits('2.4703282292062328e-324'), '0000000000000001')
        self.assertEqual(response.binary64_bits('-2.4703282292062327e-324'), '8000000000000000')
        self.assertEqual(response.binary64_bits('-2.4703282292062328e-324'), '8000000000000001')

    def test_printed_decimal_is_not_used_as_binary_endpoint(self):
        endpoint = response.lift_endpoint('0.1')
        self.assertEqual(endpoint.exact_value, F(float('0.1')))
        self.assertGreater(endpoint.exact_value, F(1, 10))
        box, ends = response.lifted_interval('0.1', '0.1')
        self.assertEqual(F(box.lower), endpoint.exact_value)
        self.assertEqual(F(box.upper), endpoint.exact_value)
        self.assertEqual(ends[0].to_record()['originalToken'], '0.1')

    def test_outward_rational_lift_survives_ambient_precision_and_subnormals(self):
        for prec in (3, 28, 140):
            with localcontext() as ctx:
                ctx.prec = prec
                for exact in (F(1, 3), -F(1, 3), F(1, 1 << 1074), -F(1, 1 << 1074)):
                    box = response.rational_interval(exact)
                    self.assertLessEqual(F(box.lower), exact)
                    self.assertGreaterEqual(F(box.upper), exact)

    def test_invalid_binary_tokens_fail_closed(self):
        for literal in ('NaN', 'Infinity', '+1', '01', '1.', '1e1001', '1e309', '0x1', '', ' 1'):
            with self.subTest(literal=literal), self.assertRaises(response.ResponseUnresolved):
                response.binary64_bits(literal)
        for bits in ('7ff0000000000000', 'fff0000000000000', '7ff8000000000000', 'A'*16, '0'):
            with self.assertRaises(response.ResponseUnresolved):
                response.bits_value(bits)


class FailClosedControls(unittest.TestCase):
    def setUp(self):
        self.req = stationary_request()

    def reject(self, req, code=None):
        with self.assertRaises(response.ResponseUnresolved) as caught:
            response.evaluate_response(req)
        if code is not None:
            self.assertEqual(caught.exception.code, code)

    def test_incomplete_duplicate_or_reordered_census(self):
        self.reject(replace(self.req, pairs=self.req.pairs[:-1]))
        self.reject(replace(self.req, members=self.req.members[:1]))
        self.reject(replace(self.req, pairs=tuple(reversed(self.req.pairs))))
        self.reject(change_pair(self.req, 1, packet_row_index=0))
        self.reject(change_pair(self.req, 1, row_id=self.req.pairs[0].row_id))
        self.reject(change_pair(self.req, 1, roots=()))
        self.reject(change_pair(self.req, 1, roots=self.req.pairs[1].roots*2))
        self.reject(change_pair(self.req, 0, roots=self.req.pairs[1].roots))

    def test_exact_polarity_and_original_identity_types(self):
        for polarity in (0, 2, True, '1'):
            altered = replace(self.req.members[0], polarity=polarity)
            self.reject(replace(self.req, members=(altered, self.req.members[1])))
        altered = replace(self.req.members[1], worldline_id=self.req.members[0].worldline_id)
        self.reject(replace(self.req, members=(self.req.members[0], altered)), 'identity')
        self.reject(change_pair(self.req, 1, transmitter_history_id='restricted-alias'), 'fingerprint')

    def test_precision_field_speed_and_native_authority_flags(self):
        self.reject(replace(self.req, decimal_precision=53))
        self.reject(replace(self.req, reception_time='0.0'))
        for update in ({'field_speed': '2'}, {'field_speed': '1.0'}, {'root_tolerance': '1e-7'},
                       {'certificate_schema': 'python-certificate'}, {'status': 'uncertified'},
                       {'failure_code': 'failure'}, {'root_free_complement': False},
                       {'memory_boundary_contact': True}, {'has_difficult_cell': True},
                       {'difficult_cells': 1}, {'achieved_precision_bits': 128},
                       {'coincident_endpoint_excluded': True}):
            with self.subTest(update=update):
                self.reject(change_pair(self.req, 1, **update))
        for update in ({'precision_bits': 128}, {'precision_route': 'mpfr'}, {'transmitter_factor_sign': -1}):
            bad = replace(self.req.pairs[1].roots[0], **update)
            self.reject(change_pair(self.req, 1, roots=(bad,)))

    def test_wrong_root_delay_width_and_segment_coverage(self):
        original = self.req.pairs[1].roots[0]
        for update in ({'lower': '-2', 'upper': '-2'}, {'lower': '0', 'upper': '0'},
                       {'lower': '-0.6', 'upper': '-0.5'}, {'lower': '-0.4', 'upper': '-0.5'},
                       {'transmitter_segment_indices': ()}, {'transmitter_segment_indices': (1,)},
                       {'transmitter_segment_indices': (0, 0)}):
            self.reject(change_pair(self.req, 1, roots=(replace(original, **update),)))

    def test_exact_binary_width_not_rounded_decimal_width(self):
        # Printed decimal width is exactly 1e-8; actual dyadic width exceeds it.
        lo, hi = '-0.50000001', '-0.5'
        self.assertEqual(F(hi)-F(lo), F('1e-8'))
        self.assertGreater(F(float(hi))-F(float(lo)), F('1e-8'))
        r = replace(self.req.pairs[1].roots[0], lower=lo, upper=hi)
        self.reject(change_pair(self.req, 1, roots=(r,)), 'root_domain')

    def test_empty_distance_or_factor_intersection(self):
        r = replace(self.req.pairs[1].roots[0], lower='-0.75', upper='-0.75')
        self.reject(change_pair(self.req, 1, roots=(r,)), 'empty_intersection')
        for update in ({'transmitter_factor_lower': '2', 'transmitter_factor_upper': '2'},
                       {'receiver_factor_lower': '2', 'receiver_factor_upper': '2'}):
            r = replace(self.req.pairs[1].roots[0], **update)
            self.reject(change_pair(self.req, 1, roots=(r,)), 'empty_intersection')

    def test_zero_or_sign_indeterminate_native_factors_rejected_before_intersection(self):
        for name in ('transmitter', 'receiver'):
            for lower, upper in (('0', '1'), ('-1', '1'), ('0', '0')):
                r = replace(self.req.pairs[1].roots[0], **{name+'_factor_lower': lower, name+'_factor_upper': upper})
                self.reject(change_pair(self.req, 1, roots=(r,)), 'denominator')

    def test_original_token_origin_and_error_fingerprint(self):
        m = self.req.members[0]
        for update in ({'t_start': '-1.9'}, {'position_errors': ('0.01',)*3},
                       {'velocity_errors': ('0.01',)*3},
                       {'coefficients': (('0.50', '0', '0', '0'), ('0',)*4, ('0',)*4)}):
            piece = replace(m.segments[0], **update)
            self.reject(replace(self.req, members=(replace(m, segments=(piece,)), self.req.members[1])), 'fingerprint')

    def test_nonfinite_unequal_negative_errors_and_invalid_coefficients(self):
        m = self.req.members[0]
        for update in ({'position_errors': ('0', '0.1', '0')}, {'velocity_errors': ('-1',)*3},
                       {'position_errors': ('NaN',)*3}, {'coefficients': (('NaN',)*4, ('0',)*4, ('0',)*4)}):
            piece = replace(m.segments[0], **update)
            self.reject(replace(self.req, members=(replace(m, segments=(piece,)), self.req.members[1])))

    def test_f5_fixed_original_allowance_rejects_zero_substitution(self):
        # Structural negative only: this intentionally invalid 1032-piece
        # census is NOT a synthetic stand-in for accepted actual F5 evidence.
        m = self.req.members[0]
        identity = response.F5_IDS[0]
        pieces = tuple(replace(m.segments[0], index=i) for i in range(1032))
        bad = replace(m, worldline_id=identity, constituent_id=identity.replace('-worldline', '-architrino'),
            history_id='f5-enclosed-root/v1/'+identity, segments=pieces)
        with self.assertRaises(response.ResponseUnresolved) as caught:
            response.map_member(bad, 0, True)
        self.assertEqual(caught.exception.code, 'error_allowance')

    def test_history_gaps_overlaps_and_disjoint_join_rejected(self):
        original = member(0, (F(1, 2), 0, 0), knots=(-2, -1, 0))
        for update in ({'t_start': '-0.9'}, {'t_start': '-1.1'},
                       {'coefficients': (('0.6', '0', '0', '0'), ('0',)*4, ('0',)*4)}):
            segments = (original.segments[0], replace(original.segments[1], **update))
            altered = replace(original, segments=segments, history_fingerprint=independent_fingerprint(segments))
            with self.assertRaises(response.ResponseUnresolved):
                response.map_member(altered, 0, False)

    def test_history_domain_must_cover_entire_unchanged_root_box(self):
        m = member(0, (F(1, 2), 0, 0), knots=(-1, 0))
        self.reject(replace(self.req, members=(m, self.req.members[1])), 'history_coverage')

    def test_mutable_containers_and_subclass_leaves_rejected(self):
        class String(str):
            pass
        class Int(int):
            pass
        class Tuple(tuple):
            pass
        for bad in (replace(self.req, members=list(self.req.members)),
                    replace(self.req, pairs=list(self.req.pairs)),
                    replace(self.req, source_hashes=[]),
                    replace(self.req, interpretations=['synthetic-exact']),
                    replace(self.req, campaign_id=String('synthetic-campaign')),
                    replace(self.req, decimal_precision=Int(90))):
            self.reject(bad, 'immutable_input')
        m = self.req.members[0]
        for bad_member in (replace(m, segments=list(m.segments)), replace(m, segments=Tuple(m.segments)),
                           replace(m, polarity=True), replace(m, worldline_id=String(m.worldline_id))):
            self.reject(replace(self.req, members=(bad_member, self.req.members[1])), 'immutable_input')
        for update in ({'coefficients': list(m.segments[0].coefficients)},
                       {'coefficients': (list(m.segments[0].coefficients[0]), ('0',)*4, ('0',)*4)},
                       {'position_errors': ['0']*3}):
            piece = replace(m.segments[0], **update)
            self.reject(replace(self.req, members=(replace(m, segments=(piece,)), self.req.members[1])), 'immutable_input')
        bad_root = replace(self.req.pairs[1].roots[0], transmitter_segment_indices=[0])
        self.reject(change_pair(self.req, 1, roots=(bad_root,)), 'immutable_input')
        self.reject(replace(self.req, interpretations=(String('synthetic-exact'),)), 'source_binding')

    def test_source_hashes_cannot_promote_synthetic_input(self):
        self.reject(replace(self.req, source_hashes=(('a', '0'*64), ('a', '1'*64))), 'source_binding')
        self.reject(replace(self.req, source_hashes=(('a', 'not-a-hash'),)), 'source_binding')
        self.reject(replace(self.req, scope='f5-release', source_hashes=response.INPUT_PINS,
                            interpretations=('source-decimal', 'frozen-binary64')), 'source_binding')

    def test_result_and_originating_inputs_are_deeply_immutable(self):
        before = repr(self.req)
        result = response.evaluate_response(self.req)
        record = result.to_record()
        record['accepted'] = True
        record['responses'][0]['components'][0]['lower'] = '999'
        self.assertFalse(result.to_record()['accepted'])
        self.assertNotEqual(result.to_record()['responses'][0]['components'][0]['lower'], '999')
        self.assertEqual(repr(self.req), before)
        with self.assertRaises(FrozenInstanceError):
            self.req.members[0].polarity = -1
        with self.assertRaises(TypeError):
            self.req.members[0].segments[0].coefficients[0][0] = '999'
        with self.assertRaises(FrozenInstanceError):
            result.record_json = '{}'
        for value in (self.req, self.req.members[0], self.req.members[0].segments[0],
                      self.req.pairs[1], self.req.pairs[1].roots[0], result):
            self.assertFalse(hasattr(value, '__dict__'))

    def test_no_extra_constructor_fields_or_python_certificate_conversion(self):
        with self.assertRaises(TypeError):
            response.ResponseInput(**{**{f.name: getattr(self.req, f.name) for f in fields(self.req)}, 'accepted': True})
        self.assertNotIn('RootCompletenessCertificate', response.NativePairSelection.__name__)
        result = response.evaluate_response(self.req).to_record()
        self.assertEqual(set(result['claims']), set(response.FALSE_CLAIMS))
        self.assertFalse(result['accepted'])
        self.assertFalse(result['claims']['premiseTruthAuthenticated'])
        self.assertFalse(result['claims']['h3EvidenceEligible'])

    def test_closed_output_record_contract_and_all_original_endpoint_lexemes(self):
        record = response.evaluate_response(self.req).to_record()
        shapes = {key: set(value) for key, value in response.RECORD_SHAPES}
        self.assertEqual(set(record), shapes['reference'])
        self.assertEqual(set(record['census']), shapes['census'])
        for row in record['members']:
            self.assertEqual(set(row), shapes['member'])
            for name in ('receptionPosition', 'receptionVelocity'):
                self.assertEqual(len(row[name]), 3)
                for interval in row[name]:
                    self.assertEqual(set(interval), shapes['interval'])
        for row in record['contributions']:
            self.assertEqual(set(row), shapes['contribution'])
            original = self.req.pairs[row['packetRowIndex']].roots[0]
            for name, expected in (
                ('emissionEndpoints', (original.lower, original.upper)),
                ('nativeTransmitterFactorEndpoints', (original.transmitter_factor_lower, original.transmitter_factor_upper)),
                ('nativeReceiverFactorEndpoints', (original.receiver_factor_lower, original.receiver_factor_upper))):
                self.assertEqual([end['originalToken'] for end in row[name]], list(expected))
                for end in row[name]:
                    self.assertEqual(set(end), shapes['binaryEndpoint'])
            for name in ('receiverPieces', 'transmitterPieces'):
                for piece in row[name]:
                    self.assertEqual(set(piece), shapes['piece'])
                    self.assertEqual(set(piece['domain']), shapes['interval'])
        for row in record['selfExclusions']:
            self.assertEqual(set(row), shapes['selfExclusion'])
        for row in record['responses']:
            self.assertEqual(set(row), shapes['response'])

    def test_nonzero_uncertainty_is_preserved_without_midpoint_substitution(self):
        originals = tuple(member(i, (F(1, 2) if i == 0 else 0, 0, 0), error='0.0001') for i in range(2))
        req = request(originals, {(0, 1): root(-F(1, 2)), (1, 0): root(-F(1, 2))})
        record = response.evaluate_response(req).to_record()
        receiver = record['members'][0]['receptionPosition'][0]
        self.assertLessEqual(F(receiver['lower']), F(4999, 10000))
        self.assertGreaterEqual(F(receiver['upper']), F(5001, 10000))
        result = record['responses'][0]['components'][0]
        self.assertLess(F(result['lower']), F(4))
        self.assertGreater(F(result['upper']), F(4))
        self.assertNotEqual(result['widthNumerator'], '0')


if __name__ == '__main__':
    unittest.main()
