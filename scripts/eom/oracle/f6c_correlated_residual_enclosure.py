"""Exact common-time box envelope for the F6c auxiliary residual f-p.

The independent proof is 2026-08-27-f6c-correlated-residual-box-envelope.md.
Inject the unchanged f6c_residual_integral_supremum reference (fc170a91...).
Its bounded number/key validation and outward presentation are dependencies;
this module does not authenticate that injected module or any source bytes.

For local time u=T-polynomial.key.domain.lower, required_acceleration contains
the three exact affine components of H'' and acceleration contains three
uniform law-side intervals. These are PREMISES about the same member, original
frame side, normalization and common history family as polynomial.key. Their
origin and truth must be established by the actual-data caller, not this API.

The calculation retains common u in L0^2*sum((H''_k(u)-A_k)^2)-p(u), optimizing
over the independent rectangular A box. It needs no derivatives of A or of an
arbitrary C1 family member. Up to nine internal algebraic cuts select exact
quadratic formulas; these are not new reception requests or protocol splits.
Output is ONE uniform whole-leaf ResidualPartition. A signed f-p bound is never
clipped to nonnegative values. Exact box extrema are not asserted attainable
by any physical trajectory. No IO, roots, EOM, scheduling or metrics occur.
"""

from __future__ import annotations

from dataclasses import dataclass
from fractions import Fraction as F


REFERENCE_SHA256 = 'fc170a91b2747923bda89ef00b58d529c98bf96b01cc7b2c05c035042fc79c5a'
MAX_ALGEBRAIC_PIECES = 10
MAX_RATIONAL_BITS = 262144


class ResidualBoxUnresolved(ValueError):
    def __init__(self, code, detail):
        super().__init__(detail)
        self.code = code


def _require(condition, code, detail):
    if not condition:
        raise ResidualBoxUnresolved(code, detail)


def _bounded(value):
    _require(type(value) is F and
             max(value.numerator.bit_length(), value.denominator.bit_length()) <= MAX_RATIONAL_BITS,
             'capacity', 'bounded exact rational required')
    return value


@dataclass(frozen=True, slots=True)
class Affine:
    """Exact rational coefficients of one H'' component in local time u.

    A coefficient is an exact Fraction or a bounded finite decimal string.
    Fractions preserve nonterminating Hermite coefficients without rounding.
    """
    intercept: str | F
    slope: str | F


@dataclass(frozen=True, slots=True)
class ResidualBoxResult:
    polynomial: object
    required_acceleration: tuple[Affine, Affine, Affine]
    acceleration: tuple
    residual_partition: object
    exact_lower: F
    exact_upper: F
    algebraic_piece_count: int
    conditional_inclusion_valid: bool
    claims: object


def _square_affine(intercept, slope):
    return (_bounded(intercept*intercept), _bounded(2*intercept*slope),
            _bounded(slope*slope))


def _coefficient(reference, value):
    return _bounded(value) if type(value) is F else reference._number(value)


def _value(coefficients, time):
    return _bounded(coefficients[0] + time*(coefficients[1] + time*coefficients[2]))


def _extrema(coefficients, lo, hi):
    values = [_value(coefficients, lo), _value(coefficients, hi)]
    if coefficients[2]:
        vertex = _bounded(-coefficients[1]/(2*coefficients[2]))
        if lo < vertex < hi:
            values.append(_value(coefficients, vertex))
    return min(values), max(values)


def enclose(reference, polynomial, required_acceleration, acceleration):
    """Return a conditional f-p enclosure from immutable same-subject premises.

    ``polynomial`` must be the exact finite auxiliary polynomial selected by
    the consuming protocol. This helper supports degree at most two; it does
    not select, fit, round, or replace that polynomial. Supplied affine H''
    coefficients must already be exact, not independently rounded fits.
    """
    try:
        # The frozen reference validates the entire integral key and all exact
        # coefficient tokens, including the fixed F6c context and c_f=1.
        reference.polynomial_integral(polynomial)
        _require(len(polynomial.coefficients) <= 3, 'degree', 'degree at most two required')
        _require(type(required_acceleration) is tuple and len(required_acceleration) == 3,
                 'shape', 'three immutable affine curvature components required')
        _require(type(acceleration) is tuple and len(acceleration) == 3,
                 'shape', 'three immutable law-side intervals required')
        affine = []
        for component in required_acceleration:
            _require(type(component) is Affine, 'immutability', 'exact Affine required')
            affine.append((_coefficient(reference, component.intercept), _coefficient(reference, component.slope)))
        boxes = tuple(reference._bounds(box) for box in acceleration)
        p = tuple(reference._number(token) for token in polynomial.coefficients)
        p = p + (F(0),)*(3-len(p))
        left, right = reference._key(polynomial.key)
        ruler = reference._number(polynomial.key.context.ruler)
    except reference.EnclosureUnresolved as error:
        raise ResidualBoxUnresolved(error.code, str(error)) from error

    width, scale = _bounded(right-left), _bounded(ruler*ruler)
    cuts = {F(0), width}
    for (intercept, slope), (lo, hi) in zip(affine, boxes):
        if slope:
            for threshold in (lo, hi, (lo+hi)/2):
                time = _bounded((threshold-intercept)/slope)
                if 0 < time < width:
                    cuts.add(time)
    cuts = sorted(cuts)
    _require(1 <= len(cuts)-1 <= MAX_ALGEBRAIC_PIECES, 'capacity', 'algebraic piece bound')

    lower, upper = None, None
    for lo_time, hi_time in zip(cuts, cuts[1:]):
        midpoint = (lo_time+hi_time)/2
        minimum_polynomial = [F(0), F(0), F(0)]
        maximum_polynomial = [F(0), F(0), F(0)]
        for (intercept, slope), (lo, hi) in zip(affine, boxes):
            current = _bounded(intercept+slope*midpoint)
            if current < lo:
                minimum = _square_affine(intercept-lo, slope)
            elif current > hi:
                minimum = _square_affine(intercept-hi, slope)
            else:
                minimum = (F(0), F(0), F(0))
            far_endpoint = hi if current < (lo+hi)/2 else lo
            maximum = _square_affine(intercept-far_endpoint, slope)
            for n in range(3):
                minimum_polynomial[n] = _bounded(minimum_polynomial[n]+minimum[n])
                maximum_polynomial[n] = _bounded(maximum_polynomial[n]+maximum[n])
        minimum_polynomial = tuple(_bounded(scale*x-y) for x, y in zip(minimum_polynomial, p))
        maximum_polynomial = tuple(_bounded(scale*x-y) for x, y in zip(maximum_polynomial, p))
        piece_lower = _extrema(minimum_polynomial, lo_time, hi_time)[0]
        piece_upper = _extrema(maximum_polynomial, lo_time, hi_time)[1]
        lower = piece_lower if lower is None else min(lower, piece_lower)
        upper = piece_upper if upper is None else max(upper, piece_upper)

    _require(lower is not None and lower <= upper, 'interval', 'nonempty exact residual envelope')
    try:
        presentation = reference._present((lower, upper))
        # This result crosses back into the unchanged reference as external
        # input. Fail closed if its token capacities cannot represent it.
        reference._bounds(presentation)
        partition = reference.ResidualPartition(polynomial.key,
            (reference.ResidualPiece(polynomial.key.domain, presentation),))
    except reference.EnclosureUnresolved as error:
        raise ResidualBoxUnresolved(error.code, str(error)) from error
    return ResidualBoxResult(polynomial, required_acceleration, acceleration, partition,
                             lower, upper, len(cuts)-1, True, reference.Claims())
