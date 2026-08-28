"""Independent synthetic closed forms, not an actual-data acceptance receipt."""

from dataclasses import FrozenInstanceError, fields, replace
from decimal import Decimal, Inexact, localcontext
from fractions import Fraction as F
import inspect
import json
from pathlib import Path
import random
import sys
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'scripts' / 'eom'))
from oracle import continuous_reception_acceleration as ref


def box(a, b=None):
    return ref.Bounds(str(a), str(a if b is None else b))


def vec(*values):
    return tuple(box(x) for x in values)


def finite_decimal(value):
    """Test-only exact terminating rational serializer, independent of reference."""
    value = F(value)
    denominator = value.denominator
    twos = fives = 0
    while denominator % 2 == 0:
        denominator //= 2
        twos += 1
    while denominator % 5 == 0:
        denominator //= 5
        fives += 1
    assert denominator == 1
    scale = max(twos, fives)
    integer = value.numerator * 2**(scale-twos) * 5**(scale-fives)
    digits = str(abs(integer)).zfill(scale+1)
    return ('-' if integer < 0 else '') + (digits if not scale else digits[:-scale]+'.'+digits[-scale:])


def static_input():
    """8 stationary distinct points Xi=(i,0,0), exact causal delay |i-j|.

    Source faces follow directly from g(T,s)=|i-j|-T+s. Fake hash tokens
    explicitly exercise conditional plumbing; they authenticate no file.
    """
    reception = box('0', '0.001')
    bindings = tuple(ref.Binding(role, 'synthetic/'+role, 'a'*64, 1)
                     for role in ref.REQUIRED_BINDINGS)
    members = tuple(ref.Member(label, str(i+1), '1' if i%2 == 0 else '-1',
                        f'{i:064x}', (str(i), '0', '0'), ('0', '0', '0'),
                        (str(i), '0', '0'), ('0', '0', '0'))
                    for i, label in enumerate(ref.LABELS))
    rows = []
    for i, receiver in enumerate(ref.LABELS):
        for j, source in enumerate(ref.LABELS):
            if i == j:
                rows.append(ref.RootRow(receiver, source, reception, None, 0, True,
                    None, None, None, None, None, None, None, None, None, True, False))
            else:
                d = abs(i-j)
                emission = box(finite_decimal(-d-F(1,1000)), finite_decimal(-d+F(2,1000)))
                rows.append(ref.RootRow(receiver, source, reception, emission, 1, False,
                    box(finite_decimal(d-8-F(1,1000)), str(d-8)), box('-.002','-.001'),
                    box('.001','.002'), vec(i-j, 0, 0), box(d), box(1), box(1),
                    'c'*64, 'd'*64, True, False))
    return ref.CellRangeInput('synthetic-control', 90, 0, 0, reception, box(0,1), box(-8,1),
        '1', '2', '1', 'conditional_complete', bindings, members, tuple(rows))


def row_change(request, index=1, **changes):
    return replace(request, rows=request.rows[:index] + (replace(request.rows[index], **changes),)
                   + request.rows[index+1:])


class RangeReferenceTests(unittest.TestCase):
    def assert_contains(self, interval, expected):
        self.assertLessEqual(F(interval.lower), F(expected))
        self.assertGreaterEqual(F(interval.upper), F(expected))

    def assert_vector(self, values, expected):
        for interval, exact in zip(values, expected):
            self.assert_contains(interval, exact)

    def reject(self, request, code=None):
        with self.assertRaises(ref.RangeUnresolved) as caught:
            ref.evaluate_cell(request)
        if code is not None:
            self.assertEqual(caught.exception.code, code)

    def sharp(self, displacement=vec(1,0,0), distance=box(1), factor=box(1), **kw):
        return ref.sharp_range(displacement=displacement, distance=distance,
            transmitter_factor=factor, coupling=kw.pop('coupling', '1'),
            receiver_charge=kw.pop('receiver_charge', '1'),
            transmitter_charge=kw.pop('transmitter_charge', '1'),
            field_speed=kw.pop('field_speed', '1'), **kw)

    def test_stationary_pair_inverse_square_signed(self):
        # A = signed k qi qj R / |R|^3, with a 3-4-5 triangle.
        actual = self.sharp(vec(3,4,0), box(5), box(1), coupling='2',
                            receiver_charge='-3', transmitter_charge='4')
        self.assert_vector(actual, (F(-72,125), F(-96,125), 0))

    def test_common_axial_velocity_directional_closed_forms(self):
        # v=3/5,L=2: R+=L/(1-v)=5; R-=-L/(1+v)=-5/4.
        # Exact directional responses: +(1-v)/L²=1/10, -(1+v)/L²=-2/5.
        self.assert_vector(self.sharp(vec(5,0,0), box(5), box('.4')), (F(1,10),0,0))
        self.assert_vector(self.sharp(vec('-1.25',0,0), box('1.25'), box('1.6')), (F(-2,5),0,0))

    def test_nonaxial_known_root_and_transmitter_factor(self):
        # T=0, receiver(.8,0), source(0,.6s), s=-1: R=(.8,.6), Dt=.64.
        self.assert_vector(self.sharp(vec('.8','.6',0), box(1), box('.64')),
                           (F(5,4),F(15,16),0))

    def test_interval_kernel_contains_independent_corner_values(self):
        actual = self.sharp((box('-2','1'),box('3','4'),box('-.1','.2')),
                           box('1.5','2'), box('.5','1.25'), coupling='3',
                           receiver_charge='-2', transmitter_charge='1')
        # Evaluate scalar formula independently at every corner of each component.
        for axis, xs in enumerate(((-2,1),(3,4),(F(-1,10),F(1,5)))):
            for x in xs:
                for radius in (F(3,2),F(2)):
                    for factor in (F(1,2),F(5,4)):
                        self.assert_contains(actual[axis], -6*F(x)/radius**3/factor)

    def test_full_stationary_census_sums_residuals_and_no_member_cancellation(self):
        result = ref.evaluate_cell(static_input())
        self.assertEqual(len(result.pair_ranges),64)
        self.assertEqual(len(result.member_ranges),8)
        for i, member in enumerate(result.member_ranges):
            expected = sum((F(2*(-1)**(i+j)*(1 if i>j else -1), (i-j)**2)
                            for j in range(8) if i != j), F(0))
            self.assert_vector(member.acceleration, (expected,0,0))
            self.assert_vector(member.required_acceleration, (0,0,0))
            self.assert_vector(member.residual, (-expected,0,0))
            self.assert_contains(member.squared_norm, expected**2)
            self.assertGreater(F(member.squared_norm.lower), 0)
            self.assertEqual(result.pair_ranges[i*8+i].disposition, 'self_empty_zero')
            self.assert_vector(result.pair_ranges[i*8+i].acceleration, (0,0,0))
            self.assertIsNone(result.rows[i*8+i].receiver_coverage_sha256)
            self.assertIsNone(result.rows[i*8+i].transmitter_coverage_sha256)

    def test_receiver_factor_changes_no_acceleration(self):
        request = static_input()
        other = row_change(request, receiver_factor=box('.001','1.999'))
        self.assertEqual(ref.evaluate_cell(request).pair_ranges, ref.evaluate_cell(other).pair_ranges)

    def test_explicit_ruler_scales_each_residual_and_square(self):
        original = ref.evaluate_cell(static_input())
        result = ref.evaluate_cell(replace(static_input(), ruler='3'))
        expected = sum((F(2*(-1)**j*-1,j*j) for j in range(1,8)), F(0))
        self.assert_vector(result.member_ranges[0].residual, (-3*expected,0,0))
        self.assert_contains(result.member_ranges[0].squared_norm, 9*expected**2)
        self.assertEqual(original.pair_ranges, result.pair_ranges)

    def test_exact_cubic_hermite_derivative_nonzero_origin(self):
        # p(T)=2-3T+5T²-7T³; p''=10-42T, plus two other independent cubics.
        polynomials = ((2,-3,5,-7), (0,1,-2,3), (1,0,0,0))
        a,b,left,right = F(-2),F(3),F(-1,2),F(5,4)
        def value(c,t): return sum((F(c[k])*t**k for k in range(4)),F(0))
        def velocity(c,t): return sum((k*F(c[k])*t**(k-1) for k in range(1,4)),F(0))
        actual = ref.hermite_second_derivative(frame=box(a,b),
            reception=box(finite_decimal(left),finite_decimal(right)),
            position_left=tuple(finite_decimal(value(c,a)) for c in polynomials),
            velocity_left=tuple(finite_decimal(velocity(c,a)) for c in polynomials),
            position_right=tuple(finite_decimal(value(c,b)) for c in polynomials),
            velocity_right=tuple(finite_decimal(velocity(c,b)) for c in polynomials))
        for result,c in zip(actual,polynomials):
            exact = sorted((2*c[2]+6*c[3]*left,2*c[2]+6*c[3]*right))
            self.assertEqual((F(result.lower),F(result.upper)),tuple(exact))

    def test_rational_nonterminating_hermite_not_rounded_into_new_curve(self):
        # H=3(T/3)^2-2(T/3)^3 has H''(1)=2/9.
        actual = ref.hermite_second_derivative(frame=box(0,3), reception=box(1),
            position_left=('0','0','0'), velocity_left=('0','0','0'),
            position_right=('1','0','0'), velocity_right=('0','0','0'))
        self.assert_contains(actual[0], F(2,9))
        self.assertLess(F(actual[0].lower), F(2,9))
        self.assertGreater(F(actual[0].upper), F(2,9))
        self.assertLess(F(actual[0].upper)-F(actual[0].lower), F(1,10**88))

    def test_two_one_sided_knot_limits_are_distinct_not_averaged(self):
        # Left H=T² on[0,1], right H=1+2u+3u² on[1,2]; C1, H''=2 vs6.
        common = dict(reception=box(1), position_left=('0','0','0'),
            velocity_left=('0','0','0'), position_right=('1','0','0'), velocity_right=('2','0','0'))
        left = ref.hermite_second_derivative(frame=box(0,1), **common)
        right = ref.hermite_second_derivative(frame=box(1,2), reception=box(1),
            position_left=('1','0','0'),velocity_left=('2','0','0'),
            position_right=('6','0','0'),velocity_right=('8','0','0'))
        self.assertEqual(left[0],box(2))
        self.assertEqual(right[0],box(6))

    def test_many_exact_polynomials_independent_known_derivatives(self):
        rng = random.Random(2049)
        for _ in range(32):
            cs = tuple(rng.randint(-8,8) for _ in range(4))
            a,b=F(rng.randint(-4,0)),F(rng.randint(1,4))
            x=a+(b-a)/4
            def p(t): return cs[0]+cs[1]*t+cs[2]*t*t+cs[3]*t*t*t
            def v(t): return cs[1]+2*cs[2]*t+3*cs[3]*t*t
            result = ref.hermite_second_derivative(frame=box(a,b),reception=box(finite_decimal(x)),
                position_left=(finite_decimal(p(a)),'0','0'),velocity_left=(finite_decimal(v(a)),'0','0'),
                position_right=(finite_decimal(p(b)),'0','0'),velocity_right=(finite_decimal(v(b)),'0','0'))
            self.assert_contains(result[0],2*cs[2]+6*cs[3]*x)

    def test_ambient_precision_rounding_and_traps_cannot_change_result(self):
        request = static_input()
        expected = ref.evaluate_cell(request)
        for precision in (3,28,160):
            with localcontext() as context:
                context.prec=precision
                context.Emax=9
                context.Emin=-9
                context.traps[Inexact]=True
                self.assertEqual(ref.evaluate_cell(request),expected)

    def test_authority_flags_always_false_and_record_fresh(self):
        request=static_input()
        result=ref.evaluate_cell(request)
        self.assertTrue(all(getattr(result.claims,f.name) is False for f in fields(ref.Claims)))
        record=result.to_record()
        self.assertEqual(json.loads(json.dumps(record))['status'],'conditional_ranges')
        record['claims']['accepted']=True
        record['bindings'][0]['sha256']='f'*64
        self.assertFalse(result.claims.accepted)
        self.assertEqual(result.bindings[0].sha256,'a'*64)

    def test_immutable_result_and_copied_premises_cannot_be_changed(self):
        result=ref.evaluate_cell(static_input())
        for obj,field,value in ((result,'scope','wrong'),(result.members[0],'charge','2'),
                                (result.rows[1].distance,'lower','0'),(result.claims,'accepted',True)):
            with self.assertRaises((FrozenInstanceError,AttributeError)):
                setattr(obj,field,value)
        with self.assertRaises(TypeError): result.rows[0]=result.rows[1]

    def test_f6c_literals_checked_without_actual_f6c_data(self):
        # Stationary synthetic geometry only; selecting F6c constants is NOT a data proof.
        request=static_input()
        request=replace(request,scope='f6c-reconstruction-family',coupling=ref.F6C_COUPLING,
            ruler=ref.F6C_RULER,frame_domain=box(0,'.13'),retained_domain=box(-8,'.13'),
            members=tuple(replace(m,charge=('' if i%2==0 else '-')+ref.F6C_CHARGE)
                          for i,m in enumerate(request.members)))
        self.assertFalse(ref.evaluate_cell(request).claims.accepted)
        for update in ({'coupling':'1'},{'ruler':'1'},{'retained_domain':box(-7,'.13')}):
            self.reject(replace(request,**update))
        self.reject(replace(request,members=(replace(request.members[0],charge='0.1666666666666667'),)+request.members[1:]))

    def test_zero_crossing_squared_norm_is_not_naive_interval_product(self):
        request=static_input()
        rows=tuple(replace(r,displacement=(box(-1,1),box(-2,2),box(-3,3)))
                   if r.emission is not None else r for r in request.rows)
        result=ref.evaluate_cell(replace(request,rows=rows))
        for member in result.member_ranges:
            self.assertEqual(F(member.squared_norm.lower),0)
            self.assertGreater(F(member.squared_norm.upper),0)

    def test_missing_duplicate_and_reordered_pairs_rejected(self):
        request=static_input()
        self.reject(replace(request,rows=request.rows[:-1]),'census')
        self.reject(replace(request,rows=(request.rows[1],)+request.rows[1:]),'census')
        self.reject(replace(request,rows=tuple(reversed(request.rows))),'census')

    def test_missing_duplicate_member_path_and_polarity_rejected(self):
        request=static_input()
        self.reject(replace(request,members=request.members[:-1]),'census')
        for change in ({'path_id':'2'},{'label':'1+'},{'charge':'-1'},{'charge':'0'}):
            self.reject(replace(request,members=(replace(request.members[0],**change),)+request.members[1:]))

    def test_wrong_precision_field_speed_status_and_boolean_numbers(self):
        request=static_input()
        for change in ({'precision':80},{'precision':True},{'field_speed':'2'},{'field_speed':'1.0'},
                       {'cover_status':'unresolved'},{'cell_index':True},{'frame_index':16384},
                       {'coupling':'0'},{'ruler':'-1'},{'scope':'historical-eom'}):
            self.reject(replace(request,**change))
        self.reject(row_change(request,ordinary_roots_per_reception=True),'census')

    def test_invalid_and_threshold_denominators(self):
        request=static_input()
        for value in (box(0),box(-1,1),box(-2,-1)):
            self.reject(row_change(request,distance=value),'distance')
        for value in (box(0),box(-1,1),box(-2,-1),box('0.999e-24','1e-24')):
            self.reject(row_change(request,transmitter_factor=value),'factor')
        self.assertFalse(ref.evaluate_cell(row_change(request,transmitter_factor=box('1e-24'))).claims.accepted)
        self.reject(row_change(request,receiver_factor=box(0,1)),'factor')

    def test_faces_complement_contacts_and_self_rules(self):
        request=static_input()
        for update in ({'oldest_residual':box(0)},{'lower_face_residual':box(-1,0)},
                       {'upper_face_residual':box(0,1)},{'root_free_complement_conditional':False},
                       {'retained_boundary_contact':True},{'coincident_endpoint_excluded':True},
                       {'root_free_complement_conditional':1}):
            self.reject(row_change(request,**update))
        for update in ({'ordinary_roots_per_reception':1},{'coincident_endpoint_excluded':False},
                       {'distance':box(1)},{'emission':box(-1,'-.5')},
                       {'receiver_coverage_sha256':'b'*64}):
            self.reject(row_change(request,0,**update),'self')

    def test_frame_crossing_emission_domain_and_exact_cell_tokens(self):
        request=static_input()
        for update in ({'frame_domain':box('.0001',1)},{'frame_domain':box(0,'.0005')},
                       {'frame_domain':box(0)},{'reception':box(0)}):
            self.reject(replace(request,**update),'frame')
        for emission in (box(-9,-1),box(-1,0),box(-1),box(-1,1)):
            self.reject(row_change(request,emission=emission),'coverage')
        self.reject(row_change(request,reception=box('0.0','.001')),'identity')

    def test_nonfinite_float_malformed_huge_and_reversed_tokens(self):
        for token in ('NaN','Infinity','-Infinity',' 1','1_0','1/3','1e1001','1e'+'9'*1000,'1'*1025,1.0,True):
            with self.subTest(token=str(token)[:20]):
                self.reject(replace(static_input(),coupling=token))
        self.reject(row_change(static_input(),distance=box(2,1)),'interval')

    def test_binding_roles_hashes_census_and_sizes_are_strict_not_authenticated(self):
        request=static_input()
        self.reject(replace(request,bindings=request.bindings[:-1]))
        for update in ({'sha256':'A'*64},{'bytes':True},{'bytes':0},{'bytes':2**40+1},
                       {'role':'root_cover'},{'path':'x\nmalformed'}):
            self.reject(replace(request,bindings=(replace(request.bindings[0],**update),)+request.bindings[1:]))
        self.reject(row_change(request,transmitter_coverage_sha256='0'))
        self.reject(row_change(request,receiver_coverage_sha256=None))

    def test_mutable_containers_and_subclasses_rejected_before_math(self):
        request=static_input()
        class String(str): pass
        class Tuple(tuple): pass
        class EvilBounds(ref.Bounds): pass
        for update in ({'members':list(request.members)},{'rows':Tuple(request.rows)},
                       {'bindings':list(request.bindings)},{'scope':String(request.scope)},
                       {'reception':EvilBounds('0','.001')}):
            self.reject(replace(request,**update))
        self.reject(replace(request,members=(replace(request.members[0],position_left=['0','0','0']),)+request.members[1:]))
        self.reject(row_change(request,displacement=list(vec(1,0,0))))
        self.reject(replace(request,coupling=String('2')))

    def test_no_subject_import_or_io_and_schema_has_no_metrics(self):
        source=inspect.getsource(ref)
        self.assertNotIn('from .continuous_reception_roots',source)
        self.assertNotIn('from .certified_acceleration',source)
        self.assertNotIn('open(',source)
        record=ref.evaluate_cell(static_input()).to_record()
        self.assertEqual(set(record),{f.name for f in fields(ref.CellRangeResult)})
        self.assertNotIn('rms',record)
        self.assertNotIn('peak',record)
        self.assertNotIn('quadrature',record)

    def test_long_exact_endpoint_cancellation_is_preserved(self):
        offset='1000000000000000000000000000000000000000000000000000000000000'
        p0=F(offset)
        # On[0,3], endpoints differ by1 with zero velocities: H''(1)=2/9.
        with localcontext() as context:
            context.prec=3
            result=ref.hermite_second_derivative(frame=box(0,3),reception=box(1),
                position_left=(str(p0.numerator),'0','0'),velocity_left=('0','0','0'),
                position_right=(str((p0+1).numerator),'0','0'),velocity_right=('0','0','0'))
        self.assert_contains(result[0],F(2,9))

    def test_outer_frame_endpoints_are_inward_limits(self):
        # H(T)=T^3 on[0,1], so the endpoint accelerations are0 and6.
        kwargs=dict(frame=box(0,1),position_left=('0','0','0'),velocity_left=('0','0','0'),
                    position_right=('1','0','0'),velocity_right=('3','0','0'))
        self.assertEqual(ref.hermite_second_derivative(reception=box(0),**kwargs)[0],box(0))
        self.assertEqual(ref.hermite_second_derivative(reception=box(1),**kwargs)[0],box(6))

    def test_frame_has_no_error_inflation_or_midpoint_substitution_field(self):
        request=static_input()
        with self.assertRaises(TypeError):
            replace(request.members[0],position_error='1')
        changed=replace(request.members[0],position_right=('1','0','0'))
        result=ref.evaluate_cell(replace(request,members=(changed,)+request.members[1:]))
        # H=3T²-2T³: on[0,.001], H'' is exactly[5.988,6].
        self.assertEqual(result.member_ranges[0].required_acceleration[0],box('5.988','6'))

    def test_fixed_summation_order_in_record_and_rational_cancellation(self):
        request=static_input()
        rows=request.rows
        # Synthetic interval algebra only: exact giant terms cancel before rounding.
        rows=rows[:1]+(replace(rows[1],displacement=vec('1e80',0,0),distance=box(1)),)+rows[2:]
        rows=rows[:2]+(replace(rows[2],displacement=vec('1e80',0,0),distance=box(1)),)+rows[3:]
        result=ref.evaluate_cell(replace(request,rows=rows))
        expected=sum((F(2*(-1)**j*-1,j*j) for j in range(3,8)),F(0))
        self.assert_contains(result.member_ranges[0].acceleration[0],expected)
        self.assertEqual(tuple((r.receiver_id,r.transmitter_id) for r in result.pair_ranges),
                         tuple((a,b) for a in ref.LABELS for b in ref.LABELS))


if __name__ == '__main__':
    unittest.main()
