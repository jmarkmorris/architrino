"""Pure conditional F6c integral, RMS, peak and polynomial-remainder reference.

The definition/proof is 2026-08-27-f6c-residual-integral-supremum-enclosure.md,
SHA256 945441097fdd2934434dd2ff6d9dd6f06a77898752db6bcac90745a76420eb4b.
No scientific IO, source authentication, root/EOM import, callbacks, node API,
Gauss--Kronrod rule, adaptive planner or subdivision-allowance interpretation.

Context hashes are caller-declared consistency labels ONLY. The mathematical
premise is one common X in the same nonempty F_H over the whole partition, with
all supplied cell/witness/integral bounds valid uniformly for every such X.
This module checks finite shape and consistency, never that premise's truth.

aggregate accepts exactly 80 ordered original Frames and ordered positive-width
Cells covering each frame from 0 to .13, with all eight labels per cell. It
intersects extra ValidatedIntegral records only with their exact IntegralKey's
duration times squared_norm, and nonnegativity. Integral-only bounds never
tighten peak. Witnesses name one original frame side. Results distinguish
conditional inclusion from final outward-width targets; ALL authority Claims
remain false, even when both widths are at most the fixed 1e-6.

Polynomial coefficients are exact decimal rationals in powers of T-domain.lo.
ResidualPartition bounds f-p throughout its whole subcells, not at samples.
QuadratureBounds are independently supplied bounds on one and the SAME fixed
linear rule K[f], K[p], K[f-p]. They do not specify or authenticate any nodes.
Helpers implement the theorem's exact identities and same-key intersections.

All arithmetic is Fraction/integer arithmetic. Only presentation is rounded
outward to 90 significant decimal digits. sqrt_bounds uses integer isqrt and
exact squared comparisons, independently of the ambient Decimal context.
Capacities below are data-safety limits, NOT permission for 20 subdivisions,
an interpretation of that allowance, or an execution budget.
"""

from __future__ import annotations

from dataclasses import asdict, dataclass
from decimal import Decimal
from fractions import Fraction
from math import isqrt
import re


PRECISION = 90
LABELS = ('0+', '0-', '1+', '1-', '2+', '2-', '3+', '3-')
FAMILY = 'f6c-reconstruction-family'
COUPLING = '10.304229970992187'
RULER = '0.5320012303229503'
DURATION = Fraction(13, 100)
WIDTH_TARGET = Fraction(1, 10**6)
MAX_CELLS = 16384
MAX_WITNESSES = 16384
MAX_INTEGRAL_BOUNDS = 8
MAX_POLYNOMIAL_COEFFICIENTS = 33
MAX_RATIONAL_BITS = 262144
MAX_TOKEN_CHARS = 1152
MAX_TOKEN_DIGITS = 1024
MAX_TOKEN_EXPONENT = 1000
_DECIMAL = re.compile(r'[+-]?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)(?:[eE][+-]?[0-9]+)?\Z')
_HASH = re.compile(r'[0-9a-f]{64}\Z')


class EnclosureUnresolved(ValueError):
    def __init__(self, code, detail):
        super().__init__(detail)
        self.code = code


def _require(condition, code, detail):
    if not condition:
        raise EnclosureUnresolved(code, detail)


def _tuple(value, minimum, maximum):
    _require(type(value) is tuple and minimum <= len(value) <= maximum,
             'shape', 'bounded exact tuple required')


def _number(token):
    _require(type(token) is str and 0 < len(token) <= MAX_TOKEN_CHARS
             and _DECIMAL.fullmatch(token) is not None, 'token', 'bounded decimal string required')
    mantissa, *exponent = re.split('[eE]', token)
    digits = sum(c.isdigit() for c in mantissa)
    _require(digits <= MAX_TOKEN_DIGITS, 'token', 'decimal digit limit')
    if exponent:
        magnitude = exponent[0].lstrip('+-').lstrip('0') or '0'
        _require(len(magnitude) <= 4 and int(magnitude) <= MAX_TOKEN_EXPONENT,
                 'token', 'decimal exponent limit')
    parsed = Decimal(token)
    _require(parsed.is_finite() and abs(parsed.as_tuple().exponent) <= MAX_TOKEN_EXPONENT,
             'token', 'finite bounded decimal required')
    return Fraction(parsed)


def _rational(value):
    _require(type(value) is Fraction, 'arithmetic', 'exact Fraction required')
    _require(max(value.numerator.bit_length(), value.denominator.bit_length()) <= MAX_RATIONAL_BITS,
             'capacity', 'rational data capacity exceeded')
    return value


@dataclass(frozen=True, slots=True)
class Bounds:
    lower: str
    upper: str


@dataclass(frozen=True, slots=True)
class Context:
    family: str
    source_generation_sha256: str
    frame_generation_sha256: str
    field_speed: str
    coupling: str
    ruler: str


@dataclass(frozen=True, slots=True)
class Frame:
    index: int
    domain: Bounds


@dataclass(frozen=True, slots=True)
class IntegralKey:
    context: Context
    label: str
    frame_index: int
    domain: Bounds


@dataclass(frozen=True, slots=True)
class ValidatedIntegral:
    key: IntegralKey
    bounds: Bounds


@dataclass(frozen=True, slots=True)
class MemberBound:
    label: str
    squared_norm: Bounds
    validated_integrals: tuple[ValidatedIntegral, ...] = ()


@dataclass(frozen=True, slots=True)
class Cell:
    context: Context
    frame_index: int
    domain: Bounds
    members: tuple[MemberBound, ...]


@dataclass(frozen=True, slots=True)
class Witness:
    context: Context
    label: str
    frame_index: int
    time: str
    squared_lower: str


@dataclass(frozen=True, slots=True)
class AggregationInput:
    context: Context
    frames: tuple[Frame, ...]
    cells: tuple[Cell, ...]
    witnesses: tuple[Witness, ...] = ()


@dataclass(frozen=True, slots=True)
class Claims:
    accepted: bool = False
    source_bytes_authenticated: bool = False
    frame_identity_authenticated: bool = False
    premise_truth_authenticated: bool = False
    historical_trajectory_identity_established: bool = False
    root_coverage_established: bool = False
    gauss_kronrod_completed: bool = False
    subdivision_allowance_verified: bool = False
    three_rung_agreement_established: bool = False
    execution_authorized: bool = False
    eom_executed: bool = False
    metrics_available: bool = False
    score_authorized: bool = False
    h3_evidence_eligible: bool = False
    physical_claim_established: bool = False


@dataclass(frozen=True, slots=True)
class MemberIntegral:
    label: str
    integral: Bounds


@dataclass(frozen=True, slots=True)
class AggregationResult:
    schema: str
    context: Context
    frames: tuple[Frame, ...]
    cells: int
    witnesses: int
    member_integrals: tuple[MemberIntegral, ...]
    total_integral: Bounds
    rms: Bounds
    peak: Bounds
    conditional_inclusion_valid: bool
    rms_width_target_met: bool
    peak_width_target_met: bool
    both_width_targets_met: bool
    claims: Claims

    def to_record(self):
        return asdict(self)


@dataclass(frozen=True, slots=True)
class Polynomial:
    key: IntegralKey
    coefficients: tuple[str, ...]


@dataclass(frozen=True, slots=True)
class ResidualPiece:
    domain: Bounds
    residual: Bounds


@dataclass(frozen=True, slots=True)
class ResidualPartition:
    key: IntegralKey
    pieces: tuple[ResidualPiece, ...]


@dataclass(frozen=True, slots=True)
class QuadratureBounds:
    key: IntegralKey
    k_f: Bounds
    k_p: Bounds
    k_residual: Bounds


@dataclass(frozen=True, slots=True)
class IntegralResult:
    key: IntegralKey
    bounds: Bounds
    exact_lower: Fraction
    exact_upper: Fraction
    conditional_inclusion_valid: bool
    claims: Claims


@dataclass(frozen=True, slots=True)
class RemainderResult:
    remainder: Bounds
    exact_remainder_lower: Fraction
    exact_remainder_upper: Fraction
    integral: IntegralResult
    claims: Claims


def _bounds(value, *, nonnegative=False):
    _require(type(value) is Bounds, 'immutability', 'exact Bounds record required')
    lo, hi = _number(value.lower), _number(value.upper)
    _require(lo <= hi and (not nonnegative or lo >= 0), 'interval', 'invalid interval')
    return lo, hi


def _domain(value):
    lo, hi = _bounds(value)
    _require(0 <= lo < hi <= DURATION, 'domain', 'positive future interval inside [0,.13] required')
    return lo, hi


def _context(value):
    _require(type(value) is Context, 'immutability', 'exact Context required')
    for token in (value.family, value.field_speed, value.coupling, value.ruler):
        _require(type(token) is str, 'immutability', 'exact context strings required')
    _require((value.family, value.field_speed, value.coupling, value.ruler)
             == (FAMILY, '1', COUPLING, RULER), 'context', 'fixed family/model/normalization required')
    for token in (value.source_generation_sha256, value.frame_generation_sha256):
        _require(type(token) is str and _HASH.fullmatch(token) is not None,
                 'context', 'declared lowercase generation SHA256 required')


def _frame_index(value):
    _require(type(value) is int and 0 <= value < 80, 'frame', 'exact frame index 0..79 required')


def _key(value):
    _require(type(value) is IntegralKey, 'immutability', 'exact IntegralKey required')
    _context(value.context)
    _require(type(value.label) is str and value.label in LABELS, 'member', 'fixed member label required')
    _frame_index(value.frame_index)
    return _domain(value.domain)


def _same_key(actual, expected):
    _key(actual)
    _require(actual == expected, 'identity', 'integrand/member/frame/domain/context mismatch')


def _add(a, b):
    return _rational(a[0] + b[0]), _rational(a[1] + b[1])


def _subtract(a, b):
    return _rational(a[0] - b[1]), _rational(a[1] - b[0])


def _scale_positive(width, value):
    return _rational(width * value[0]), _rational(width * value[1])


def _intersection(a, b):
    result = max(a[0], b[0]), min(a[1], b[1])
    _require(result[0] <= result[1], 'empty_intersection', 'inconsistent enclosures; no result')
    return result


def _nonnegative(value):
    _require(value[1] >= 0, 'empty_intersection', 'integral contradicts nonnegativity')
    return max(Fraction(0), value[0]), value[1]


def _ten(exponent):
    return Fraction(10**exponent) if exponent >= 0 else Fraction(1, 10**(-exponent))


def _decimal_exponent(positive):
    # Rational estimate of log10(2), followed by exact comparisons; no floats.
    exponent = ((positive.numerator.bit_length() - positive.denominator.bit_length())
                * 30103) // 100000
    while positive < _ten(exponent):
        exponent -= 1
    while positive >= _ten(exponent + 1):
        exponent += 1
    return exponent


def _decimal_token(coefficient, exponent):
    if coefficient == 0:
        return '0'
    digits = tuple(int(c) for c in str(abs(coefficient)))
    return str(Decimal((int(coefficient < 0), digits, exponent)))


def _rounded_endpoint(value, upper):
    _rational(value)
    if value == 0:
        return '0'
    exponent = _decimal_exponent(abs(value)) - PRECISION + 1
    scaled = value / _ten(exponent)
    coefficient = (-((-scaled.numerator) // scaled.denominator) if upper
                   else scaled.numerator // scaled.denominator)
    return _decimal_token(coefficient, exponent)


def _present(value):
    _require(value[0] <= value[1], 'interval', 'reversed exact output')
    return Bounds(_rounded_endpoint(value[0], False), _rounded_endpoint(value[1], True))


def sqrt_bounds(lower, upper):
    """Outward 90-significant-digit square roots of two exact Fractions."""
    _rational(lower)
    _rational(upper)
    _require(0 <= lower <= upper, 'sqrt', 'ordered nonnegative radicands required')

    def endpoint(value, ceiling):
        if value == 0:
            return '0'
        exponent = _decimal_exponent(value) // 2 - PRECISION + 1
        scaled = value / _ten(2 * exponent)
        root = isqrt(scaled.numerator // scaled.denominator)
        if ceiling and root * root * scaled.denominator != scaled.numerator:
            root += 1
        return _decimal_token(root, exponent)

    return Bounds(endpoint(lower, False), endpoint(upper, True))


def _integral_bound(value, key):
    _require(type(value) is ValidatedIntegral, 'immutability', 'exact ValidatedIntegral required')
    _same_key(value.key, key)
    return _bounds(value.bounds)


def aggregate(request):
    """Conditional complete-80-frame aggregation, never metric acceptance."""
    _require(type(request) is AggregationInput, 'immutability', 'exact AggregationInput required')
    _context(request.context)
    _tuple(request.frames, 80, 80)
    _tuple(request.cells, 80, MAX_CELLS)
    _tuple(request.witnesses, 0, MAX_WITNESSES)
    frames = []
    cursor = Fraction(0)
    for index, frame in enumerate(request.frames):
        _require(type(frame) is Frame, 'immutability', 'exact Frame required')
        _frame_index(frame.index)
        _require(frame.index == index, 'frame', 'frames must arrive in original order')
        lo, hi = _domain(frame.domain)
        _require(lo == cursor, 'coverage', 'frame gap or positive-duration overlap')
        frames.append((lo, hi))
        cursor = hi
    _require(cursor == DURATION, 'coverage', 'frames must end at exact .13')

    zero = Fraction(0)
    totals = [(zero, zero) for _ in LABELS]
    peak_lower, peak_upper = zero, zero
    frame_index, cursor = 0, zero
    # Uniform lower witnesses are checked against every applicable closed cell.
    cell_values = []
    for cell in request.cells:
        _require(type(cell) is Cell, 'immutability', 'exact Cell required')
        _context(cell.context)
        _require(cell.context == request.context, 'context', 'cell context differs')
        _frame_index(cell.frame_index)
        _require(frame_index < 80 and cell.frame_index == frame_index,
                 'coverage', 'cells must arrive in frame/time order')
        lo, hi = _domain(cell.domain)
        _require(lo == cursor and hi <= frames[frame_index][1], 'coverage',
                 'cell gap/overlap/cross-frame interval')
        _tuple(cell.members, 8, 8)
        row_values = []
        for member_index, (member, label) in enumerate(zip(cell.members, LABELS)):
            _require(type(member) is MemberBound, 'immutability', 'exact MemberBound required')
            _require(type(member.label) is str and member.label == label, 'member',
                     'complete fixed member order required')
            squared = _bounds(member.squared_norm, nonnegative=True)
            _tuple(member.validated_integrals, 0, MAX_INTEGRAL_BOUNDS)
            integral = _scale_positive(hi - lo, squared)
            key = IntegralKey(request.context, label, frame_index, cell.domain)
            for extra in member.validated_integrals:
                integral = _intersection(integral, _integral_bound(extra, key))
            integral = _nonnegative(integral)
            totals[member_index] = _add(totals[member_index], integral)
            peak_lower, peak_upper = max(peak_lower, squared[0]), max(peak_upper, squared[1])
            row_values.append(squared)
        cell_values.append((frame_index, lo, hi, tuple(row_values)))
        cursor = hi
        if cursor == frames[frame_index][1]:
            frame_index += 1
    _require(frame_index == 80 and cursor == DURATION, 'coverage', 'incomplete frame/cell suffix')

    for witness in request.witnesses:
        _require(type(witness) is Witness, 'immutability', 'exact Witness required')
        _context(witness.context)
        _require(witness.context == request.context, 'context', 'witness context differs')
        _require(type(witness.label) is str and witness.label in LABELS, 'member', 'unknown witness member')
        _frame_index(witness.frame_index)
        time, lower = _number(witness.time), _number(witness.squared_lower)
        frame = frames[witness.frame_index]
        _require(frame[0] <= time <= frame[1] and lower >= 0, 'witness', 'invalid frame-side witness')
        index = LABELS.index(witness.label)
        applicable = [row[index][1] for n, lo, hi, row in cell_values
                      if n == witness.frame_index and lo <= time <= hi]
        _require(applicable and lower <= min(applicable), 'empty_intersection',
                 'witness contradicts an applicable closed-cell bound')
        peak_lower = max(peak_lower, lower)
    _require(peak_lower <= peak_upper, 'empty_intersection', 'inconsistent peak bounds')

    total = (zero, zero)
    for member_total in totals:
        total = _add(total, member_total)
    rms = sqrt_bounds(total[0] / (8 * DURATION), total[1] / (8 * DURATION))
    peak = sqrt_bounds(peak_lower, peak_upper)
    # These are our bounded generated tokens, not new external input. Their
    # exponents may legitimately exceed the input-token limit after integration.
    rms_met = Fraction(Decimal(rms.upper)) - Fraction(Decimal(rms.lower)) <= WIDTH_TARGET
    peak_met = Fraction(Decimal(peak.upper)) - Fraction(Decimal(peak.lower)) <= WIDTH_TARGET
    return AggregationResult('braid-program/f6c-residual-integral-supremum.v1',
        request.context, request.frames, len(request.cells), len(request.witnesses),
        tuple(MemberIntegral(label, _present(value)) for label, value in zip(LABELS, totals)),
        _present(total), rms, peak, True, rms_met, peak_met, rms_met and peak_met, Claims())


def polynomial_integral(polynomial):
    """Exact integral; polynomial is auxiliary, never a replacement history."""
    _require(type(polynomial) is Polynomial, 'immutability', 'exact Polynomial required')
    lo, hi = _key(polynomial.key)
    _tuple(polynomial.coefficients, 1, MAX_POLYNOMIAL_COEFFICIENTS)
    width = hi - lo
    total, power = Fraction(0), width
    for index, token in enumerate(polynomial.coefficients):
        total = _rational(total + _number(token) * power / (index + 1))
        power = _rational(power * width)
    return total


def _residual_area(partition, key):
    _require(type(partition) is ResidualPartition, 'immutability', 'exact ResidualPartition required')
    _same_key(partition.key, key)
    _tuple(partition.pieces, 1, MAX_CELLS)
    cursor, end = _key(key)
    area = (Fraction(0), Fraction(0))
    for piece in partition.pieces:
        _require(type(piece) is ResidualPiece, 'immutability', 'exact ResidualPiece required')
        lo, hi = _domain(piece.domain)
        _require(lo == cursor and hi <= end, 'coverage', 'residual partition gap/overlap/order')
        area = _add(area, _scale_positive(hi - lo, _bounds(piece.residual)))
        cursor = hi
    _require(cursor == end, 'coverage', 'residual partition suffix missing')
    return area


def _integral_result(key, exact, range_integral):
    exact = _nonnegative(exact)
    if range_integral is not None:
        exact = _intersection(exact, _integral_bound(range_integral, key))
    exact = _nonnegative(exact)
    return IntegralResult(key, _present(exact), exact[0], exact[1], True, Claims())


def surrogate_integral(polynomial, residual_partition, *, range_integral=None):
    """I[p] + sum |C| range_C(f-p), intersected only for the same integral."""
    moment = polynomial_integral(polynomial)
    area = _residual_area(residual_partition, polynomial.key)
    return _integral_result(polynomial.key, _add((moment, moment), area), range_integral)


def quadrature_remainder(polynomial, residual_partition, quadrature, *, range_integral=None):
    """Conditional linear-rule identity; NO node evaluation or rule selection."""
    moment = polynomial_integral(polynomial)
    area = _residual_area(residual_partition, polynomial.key)
    _require(type(quadrature) is QuadratureBounds, 'immutability', 'exact QuadratureBounds required')
    _same_key(quadrature.key, polynomial.key)
    k_f, k_p, k_e = map(_bounds, (quadrature.k_f, quadrature.k_p, quadrature.k_residual))
    # A necessary consistency condition of the explicitly assumed SAME linear
    # rule; this check does not establish actual nodal values or rule identity.
    _intersection(k_f, _add(k_p, k_e))
    remainder = _subtract(_add(_subtract((moment, moment), k_p), area), k_e)
    surrogate = _add((moment, moment), area)
    integral = _intersection(_add(k_f, remainder), surrogate)
    result = _integral_result(polynomial.key, integral, range_integral)
    return RemainderResult(_present(remainder), remainder[0], remainder[1], result, Claims())
