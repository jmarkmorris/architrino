"""Pure conditional Gauss1/Kronrod3 request/response protocol for F6c.

No IO, callback evaluator, root/EOM operation, source authentication or metric
authority. Inject the unchanged f6c_residual_integral_supremum reference. The
declared reference SHA and Context hashes are consistency labels, not evidence.
Every range premise concerns the SAME fixed member/frame-side integrand and
the SAME nonempty history family over the entire partition.

The exact nodes are 0,+/-sqrt(3/5), with weights 8/9,5/9,5/9. Positive-width
neighborhoods use an integer-square-root bracket on the fixed 10^-90 grid;
no point requests or precision retries. The deterministic auxiliary quadratic
fits neighborhood/value midpoints before each coefficient is floored to 90
significant decimal digits. Only that exact rounded polynomial is used by the
residual premise; it need not interpolate afterwards.

Twenty TOTAL split events per ORIGINAL frame are shared by every member, RMS
and peak; mandatory interior knot cuts count. This conservative implementation
policy does not rewrite the original owner's ambiguous allowance. Root and
emission refinement budgets are both ZERO. Range-provider inability returns
unresolved; this module never broadens its scope or chooses physical settings.

States are opaque, immutable, in-memory transition products, NOT serialized
receipts or authentication capabilities. Normal Python record immutability is
assumed (not hostile object.__setattr__, function replacement or introspection).
Each response has an exact outstanding request, including generation and frame
side. All 8 members and all 3 neighborhoods are required, once per leaf.

The GK difference is diagnostic ONLY. The frozen remainder intersection cannot
improve its own surrogate bound. Naive Q-range(p) subtraction cannot improve
duration*Q; improvement needs genuinely tighter correlated residual premises
or new valid subcell ranges. No convergence or cost claim follows.
"""

from __future__ import annotations

from dataclasses import dataclass
from decimal import Decimal
from fractions import Fraction as F
from math import isqrt
import re


REFERENCE_SHA256 = 'fc170a91b2747923bda89ef00b58d529c98bf96b01cc7b2c05c035042fc79c5a'
PRECISION = 90
MAX_SPLITS_PER_FRAME = 20
ROOT_REFINEMENT_LIMIT = 0
EMISSION_REFINEMENT_LIMIT = 0
MAX_EVALUATED_LEAVES = 80 * 41
MAX_NODE_NEIGHBORHOODS = 3 * MAX_EVALUATED_LEAVES
LABELS = ('0+', '0-', '1+', '1-', '2+', '2-', '3+', '3-')
_DECIMAL = re.compile(r'[+-]?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)(?:[eE][+-]?[0-9]+)?\Z')
_HASH = re.compile(r'[0-9a-f]{64}\Z')
_STATE_KEY = object()


class ProtocolUnresolved(ValueError):
    def __init__(self, code, detail):
        super().__init__(detail)
        self.code = code


def _require(test, code, detail):
    if not test:
        raise ProtocolUnresolved(code, detail)


def _tuple(value, low, high):
    _require(type(value) is tuple and low <= len(value) <= high,
             'shape', 'bounded exact tuple required')


def _q(token):
    _require(type(token) is str and 0 < len(token) <= 1152
             and _DECIMAL.fullmatch(token) is not None, 'token', 'bounded decimal required')
    mantissa, *exponent = re.split('[eE]', token)
    _require(sum(c.isdigit() for c in mantissa) <= 1024, 'token', 'digit limit')
    if exponent:
        text = exponent[0].lstrip('+-').lstrip('0') or '0'
        _require(len(text) <= 4 and int(text) <= 1000, 'token', 'exponent limit')
    value = Decimal(token)
    _require(value.is_finite() and abs(value.as_tuple().exponent) <= 1000,
             'token', 'finite bounded exponent required')
    return F(value)


def _bounded(value):
    _require(max(value.numerator.bit_length(), value.denominator.bit_length()) <= 262144,
             'capacity', 'exact arithmetic capacity')
    return value


def _box(ref, value, nonnegative=False):
    _require(type(value) is ref.Bounds, 'immutability', 'exact reference Bounds required')
    lo, hi = _q(value.lower), _q(value.upper)
    _require(lo <= hi and (not nonnegative or lo >= 0), 'interval', 'invalid bounds')
    return lo, hi


def _ten(exponent):
    return F(10**exponent) if exponent >= 0 else F(1, 10**(-exponent))


def _floor_token(value, upper=False):
    _bounded(value)
    if not value:
        return '0'
    exponent = ((abs(value.numerator).bit_length() - value.denominator.bit_length()) * 30103) // 100000
    while abs(value) < _ten(exponent):
        exponent -= 1
    while abs(value) >= _ten(exponent + 1):
        exponent += 1
    exponent -= PRECISION - 1
    scaled = value / _ten(exponent)
    coefficient = -((-scaled.numerator) // scaled.denominator) if upper else scaled.numerator // scaled.denominator
    return str(Decimal((int(coefficient < 0), tuple(int(c) for c in str(abs(coefficient))), exponent)))


def _present(ref, box):
    result = ref.Bounds(_floor_token(box[0]), _floor_token(box[1], True))
    _box(ref, result)  # The unchanged reference's external-token limits must fit.
    return result


def _exact_token(value):
    """Exact finite decimal for derived times, without ambient rounding."""
    _bounded(value)
    denominator, twos, fives = value.denominator, 0, 0
    while denominator % 2 == 0:
        denominator //= 2
        twos += 1
    while denominator % 5 == 0:
        denominator //= 5
        fives += 1
    _require(denominator == 1, 'time', 'finite decimal time required')
    places = max(twos, fives)
    _require(places <= 1000, 'capacity', 'derived time exponent limit; no retry')
    coefficient = value.numerator * 2**(places-twos) * 5**(places-fives)
    if coefficient == 0:
        return '0'
    token = str(Decimal((int(coefficient < 0), tuple(int(c) for c in str(abs(coefficient))), -places)))
    _q(token)
    return token


def _add(a, b):
    return _bounded(a[0]+b[0]), _bounded(a[1]+b[1])


def _sub(a, b):
    return _bounded(a[0]-b[1]), _bounded(a[1]-b[0])


def _scale(k, a):
    _require(k >= 0, 'arithmetic', 'positive scale required')
    return _bounded(k*a[0]), _bounded(k*a[1])


def _intersect(a, b):
    result = max(a[0], b[0]), min(a[1], b[1])
    _require(result[0] <= result[1], 'empty_intersection', 'inconsistent uniform premises')
    return result


def _poly_range(coefficients, domain):
    result = (F(0), F(0))
    for coefficient in reversed(coefficients):
        products = tuple(_bounded(x*y) for x in result for y in domain)
        result = _add((min(products), max(products)), (coefficient, coefficient))
    return result


@dataclass(frozen=True, slots=True)
class ProtocolInput:
    context: object
    frames: tuple
    mandatory_knots: tuple
    reference_sha256: str


@dataclass(frozen=True, slots=True)
class LeafRequest:
    context: object
    frame_index: int
    domain: object
    generation: int
    path: tuple
    node_neighborhoods: tuple


@dataclass(frozen=True, slots=True)
class MemberEvidence:
    label: str
    whole_squared: object
    node_squared: tuple
    polynomial: object
    residual: object  # reference.ResidualPartition: exactly ONE whole-leaf piece.
    residual_mode: str  # correlated or range-subtraction (explicit no-gain fallback).


@dataclass(frozen=True, slots=True)
class LeafResponse:
    request: LeafRequest
    members: tuple


@dataclass(frozen=True, slots=True)
class ProviderUnavailable:
    request: LeafRequest
    reason: str


@dataclass(frozen=True, slots=True)
class MemberDiagnostic:
    label: str
    gauss: object
    kronrod: object
    difference: object
    remainder: object
    integral: object
    residual_mode: str


@dataclass(frozen=True, slots=True)
class LeafEvaluation:
    response: LeafResponse
    cell: object
    witnesses: tuple
    diagnostics: tuple
    integral_width: F
    peak_upper_squared: F


@dataclass(frozen=True, slots=True)
class _Leaf:
    request: LeafRequest
    evaluation: LeafEvaluation | None


@dataclass(frozen=True, slots=True, init=False)
class State:
    plan: ProtocolInput
    leaves: tuple
    evaluations: tuple
    split_counts: tuple
    next_generation: int
    status: str
    reason: str | None
    aggregate: object | None
    claims: object
    _reference_identity: object

    def __new__(cls, key=None):
        _require(key is _STATE_KEY, 'state', 'state can only be created by start/respond')
        return object.__new__(cls)

    @property
    def node_neighborhood_count(self):
        return 3 * len(self.evaluations)

    @property
    def root_refinements(self):
        return 0

    @property
    def emission_refinements(self):
        return 0


def _state(ref, plan, leaves, evaluations, counts, generation, status, reason=None, aggregate=None):
    state = State(_STATE_KEY)
    values = (plan, leaves, evaluations, counts, generation, status, reason, aggregate, ref.Claims(), ref)
    for name, value in zip(State.__dataclass_fields__, values):
        object.__setattr__(state, name, value)
    return state


def _context(ref, value):
    _require(type(value) is ref.Context, 'immutability', 'exact Context required')
    for token in (value.family, value.field_speed, value.coupling, value.ruler):
        _require(type(token) is str, 'immutability', 'exact model token required')
    _require((value.family, value.field_speed, value.coupling, value.ruler) ==
             ('f6c-reconstruction-family', '1', '10.304229970992187', '0.5320012303229503'),
             'context', 'fixed family, field speed, coupling and ruler')
    for token in (value.source_generation_sha256, value.frame_generation_sha256):
        _require(type(token) is str and _HASH.fullmatch(token) is not None,
                 'context', 'declared generation hash required')


def _key_shape(ref, key):
    _require(type(key) is ref.IntegralKey, 'immutability', 'exact integral key required')
    _context(ref, key.context)
    _box(ref, key.domain)
    _require(type(key.label) is str and key.label in LABELS
             and type(key.frame_index) is int and 0 <= key.frame_index < 80,
             'identity', 'fixed member and exact frame index required')


def node_neighborhoods(ref, domain):
    """Exact finite rational boxes strictly inside this positive-width leaf."""
    lo, hi = _box(ref, domain)
    _require(0 <= lo < hi <= F(13, 100), 'domain', 'positive future leaf required')
    grid = 10**PRECISION
    floor = isqrt((3*grid*grid)//5)
    a, b = F(floor, grid), F(floor+1, grid)
    _require(a*a < F(3, 5) < b*b and 0 < a < b < 1, 'node', 'strict irrational bracket')
    center, half = (lo+hi)/2, (hi-lo)/2
    normalized = ((-b, -a), (-F(1, grid), F(1, grid)), (a, b))
    result = tuple(ref.Bounds(_exact_token(center+half*x), _exact_token(center+half*y))
                   for x, y in normalized)
    values = tuple(_box(ref, box) for box in result)
    _require(all(lo < x < y < hi for x, y in values)
             and values[0][1] < values[1][0] < values[1][1] < values[2][0],
             'node', 'positive disjoint contained neighborhoods required')
    return result


def _request(ref, context, index, domain, generation, path):
    return LeafRequest(context, index, domain, generation, path, node_neighborhoods(ref, domain))


def _validate_request(ref, req):
    _require(type(req) is LeafRequest, 'immutability', 'exact LeafRequest required')
    _context(ref, req.context)
    _require(type(req.frame_index) is int and 0 <= req.frame_index < 80
             and type(req.generation) is int and 0 <= req.generation < MAX_EVALUATED_LEAVES,
             'identity', 'bounded frame/generation required')
    _tuple(req.path, 1, 21)
    _require(type(req.path[0]) is int and 0 <= req.path[0] <= 20
             and all(type(x) is int and x in (0, 1) for x in req.path[1:]),
             'identity', 'initial knot cell and binary path required')
    _tuple(req.node_neighborhoods, 3, 3)
    for box in req.node_neighborhoods:
        _box(ref, box)
    _require(req.node_neighborhoods == node_neighborhoods(ref, req.domain),
             'node', 'no changed nodes or hidden precision retry')


def polynomial_for_nodes(ref, req, label, node_squared):
    """Floor-rounded exact quadratic; the rounded polynomial IS the auxiliary."""
    _validate_request(ref, req)
    _require(type(label) is str and label in LABELS, 'member', 'fixed member label')
    _tuple(node_squared, 3, 3)
    values = tuple(_box(ref, box, True) for box in node_squared)
    lo, _ = _box(ref, req.domain)
    x = tuple(sum(_box(ref, box), F(0))/2-lo for box in req.node_neighborhoods)
    y = tuple((a+b)/2 for a, b in values)
    coefficients = [F(0), F(0), F(0)]
    for i in range(3):
        j, k = tuple(n for n in range(3) if n != i)
        scale = _bounded(y[i]/((x[i]-x[j])*(x[i]-x[k])))
        for n, value in enumerate((x[j]*x[k], -x[j]-x[k], F(1))):
            coefficients[n] = _bounded(coefficients[n]+scale*value)
    tokens = tuple(_floor_token(value) for value in coefficients)
    for token in tokens:
        _q(token)
    return ref.Polynomial(ref.IntegralKey(req.context, label, req.frame_index, req.domain), tokens)


def fallback_residual(ref, req, polynomial, whole_squared):
    """Explicit range-subtraction fallback; no quadrature-only gain promised."""
    _validate_request(ref, req)
    _require(type(polynomial) is ref.Polynomial and type(polynomial.key) is ref.IntegralKey,
             'immutability', 'exact polynomial/key required')
    key = polynomial.key
    _key_shape(ref, key)
    _require(key.context == req.context and key.frame_index == req.frame_index
             and key.domain == req.domain and type(key.label) is str and key.label in LABELS,
             'identity', 'same member/frame/domain/context required')
    _tuple(polynomial.coefficients, 3, 3)
    coefficients = tuple(_q(c) for c in polynomial.coefficients)
    lo, hi = _box(ref, req.domain)
    residual = _sub(_box(ref, whole_squared, True), _poly_range(coefficients, (F(0), hi-lo)))
    return ref.ResidualPartition(key, (ref.ResidualPiece(req.domain, _present(ref, residual)),))


def evaluate_leaf(ref, response):
    """Conditional arithmetic only; supplied interval premises are not proved."""
    _require(type(response) is LeafResponse, 'immutability', 'exact response required')
    req = response.request
    _validate_request(ref, req)
    _tuple(response.members, 8, 8)
    lo, hi = _box(ref, req.domain)
    width, half = hi-lo, (hi-lo)/2
    members, witnesses, diagnostics = [], [], []
    integral_width, peak_upper = F(0), F(0)
    for label, evidence in zip(LABELS, response.members):
        _require(type(evidence) is MemberEvidence and type(evidence.label) is str and evidence.label == label,
                 'member', 'complete fixed member order required')
        whole = _box(ref, evidence.whole_squared, True)
        _tuple(evidence.node_squared, 3, 3)
        node_values = tuple(_intersect(whole, _box(ref, box, True)) for box in evidence.node_squared)
        polynomial = polynomial_for_nodes(ref, req, label, evidence.node_squared)
        _require(type(evidence.polynomial) is ref.Polynomial, 'immutability', 'exact polynomial required')
        _key_shape(ref, evidence.polynomial.key)
        _tuple(evidence.polynomial.coefficients, 3, 3)
        for coefficient in evidence.polynomial.coefficients:
            _q(coefficient)
        _require(evidence.polynomial == polynomial, 'polynomial', 'exact deterministic rounded polynomial required')
        residual = evidence.residual
        _require(type(residual) is ref.ResidualPartition, 'immutability', 'exact residual partition required')
        _key_shape(ref, residual.key)
        _require(residual.key == polynomial.key, 'identity', 'same residual integral key required')
        _tuple(residual.pieces, 1, 1)
        piece = residual.pieces[0]
        _require(type(piece) is ref.ResidualPiece and type(piece.domain) is ref.Bounds
                 and piece.domain == req.domain, 'coverage', 'ONE whole-leaf residual range required')
        error = _box(ref, piece.residual)
        _require(type(evidence.residual_mode) is str and evidence.residual_mode in ('correlated', 'range-subtraction'),
                 'residual', 'explicit residual premise mode required')
        if evidence.residual_mode == 'range-subtraction':
            _require(residual == fallback_residual(ref, req, polynomial, evidence.whole_squared),
                     'residual', 'fallback must be exact declared range subtraction')
        coefficients = tuple(_q(c) for c in polynomial.coefficients)
        _intersect(error, _sub(whole, _poly_range(coefficients, (F(0), width))))
        k_f, k_e = (F(0), F(0)), (F(0), F(0))
        for j, weight in enumerate((F(5, 9), F(8, 9), F(5, 9))):
            a, b = _box(ref, req.node_neighborhoods[j])
            p_node = _poly_range(coefficients, (a-lo, b-lo))
            e_node = _intersect(error, _sub(node_values[j], p_node))
            k_f = _add(k_f, _scale(half*weight, node_values[j]))
            k_e = _add(k_e, _scale(half*weight, e_node))
            # Midpoint is an exact rational time in this positive neighborhood,
            # not a false exact token for the irrational Kronrod node.
            witnesses.append(ref.Witness(req.context, label, req.frame_index,
                                         _exact_token((a+b)/2), _exact_token(node_values[j][0])))
        gauss = _scale(width, node_values[1])
        moment = ref.polynomial_integral(polynomial)  # K[p]=I[p], degree 2.
        quadrature = ref.QuadratureBounds(polynomial.key, _present(ref, k_f),
                                          _present(ref, (moment, moment)), _present(ref, k_e))
        range_integral = ref.ValidatedIntegral(polynomial.key, _present(ref, _scale(width, whole)))
        result = ref.quadrature_remainder(polynomial, residual, quadrature, range_integral=range_integral)
        integral = result.integral
        members.append(ref.MemberBound(label, evidence.whole_squared,
                                       (ref.ValidatedIntegral(polynomial.key, integral.bounds),)))
        integral_width += integral.exact_upper-integral.exact_lower
        peak_upper = max(peak_upper, whole[1])
        diagnostics.append(MemberDiagnostic(label, _present(ref, gauss), _present(ref, k_f),
            _present(ref, _sub(k_f, gauss)), result.remainder, integral.bounds, evidence.residual_mode))
    return LeafEvaluation(response, ref.Cell(req.context, req.frame_index, req.domain, tuple(members)),
                          tuple(witnesses), tuple(diagnostics), integral_width, peak_upper)


def start(ref, plan):
    _require(type(plan) is ProtocolInput, 'immutability', 'exact ProtocolInput required')
    _require(type(plan.reference_sha256) is str and plan.reference_sha256 == REFERENCE_SHA256,
             'reference', 'declared frozen reference identity required; not authenticated')
    _context(ref, plan.context)
    _tuple(plan.frames, 80, 80)
    _tuple(plan.mandatory_knots, 80, 80)
    cursor, leaves, counts, generation = F(0), [], [], 0
    for index, (frame, knots) in enumerate(zip(plan.frames, plan.mandatory_knots)):
        _require(type(frame) is ref.Frame and type(frame.index) is int and frame.index == index,
                 'frame', '80 original frames in order required')
        lo, hi = _box(ref, frame.domain)
        _require(lo == cursor and lo < hi <= F(13, 100), 'coverage', 'complete ordered positive frames')
        _tuple(knots, 0, 20)
        values = tuple(_q(token) for token in knots)
        _require(all(lo < x < hi for x in values)
                 and all(a < b for a, b in zip(values, values[1:])), 'knots', 'strict ordered interior knots')
        counts.append(len(knots))
        endpoints = (frame.domain.lower,) + knots + (frame.domain.upper,)
        for initial, (a, b) in enumerate(zip(endpoints, endpoints[1:])):
            req = _request(ref, plan.context, index, ref.Bounds(a, b), generation, (initial,))
            leaves.append(_Leaf(req, None))
            generation += 1
        cursor = hi
    _require(cursor == F(13, 100), 'coverage', 'exact .13 final endpoint required')
    return _state(ref, plan, tuple(leaves), (), tuple(counts), generation, 'pending')


def request(state):
    _require(type(state) is State, 'state', 'in-memory State required')
    if state.status != 'pending':
        return None
    return next(leaf.request for leaf in state.leaves if leaf.evaluation is None)


def _settle(ref, state, leaves, evaluations):
    if any(leaf.evaluation is None for leaf in leaves):
        return _state(ref, state.plan, leaves, evaluations, state.split_counts,
                      state.next_generation, 'pending')
    cells = tuple(leaf.evaluation.cell for leaf in leaves)
    # One strongest lower witness per member/frame suffices, retaining each
    # winning exact time and frame side; avoids the reference witness capacity.
    best = {}
    for leaf in leaves:
        for witness in leaf.evaluation.witnesses:
            key = witness.frame_index, witness.label
            if key not in best or _q(witness.squared_lower) > _q(best[key].squared_lower):
                best[key] = witness
    witnesses = tuple(best[(n, label)] for n in range(80) for label in LABELS)
    result = ref.aggregate(ref.AggregationInput(state.plan.context, state.plan.frames, cells, witnesses))
    if result.both_width_targets_met:
        return _state(ref, state.plan, leaves, evaluations, state.split_counts,
                      state.next_generation, 'conditional-width-complete', aggregate=result)
    eligible = [(i, leaf) for i, leaf in enumerate(leaves)
                if state.split_counts[leaf.request.frame_index] < MAX_SPLITS_PER_FRAME]
    if not eligible:
        return _state(ref, state.plan, leaves, evaluations, state.split_counts,
                      state.next_generation, 'unresolved', 'shared-split-budget-exhausted', result)
    if not result.rms_width_target_met:
        priority = lambda item: (-item[1].evaluation.integral_width, -item[1].evaluation.peak_upper_squared,
                                  item[1].request.frame_index, _q(item[1].request.domain.lower))
    else:
        priority = lambda item: (-item[1].evaluation.peak_upper_squared, -item[1].evaluation.integral_width,
                                  item[1].request.frame_index, _q(item[1].request.domain.lower))
    index, parent = min(eligible, key=priority)
    req = parent.request
    lo, hi = _box(ref, req.domain)
    middle = _exact_token((lo+hi)/2)
    children = tuple(_Leaf(_request(ref, req.context, req.frame_index, domain,
                         state.next_generation+j, req.path+(j,)), None)
                     for j, domain in enumerate((ref.Bounds(req.domain.lower, middle),
                                                ref.Bounds(middle, req.domain.upper))))
    counts = list(state.split_counts)
    counts[req.frame_index] += 1
    return _state(ref, state.plan, leaves[:index]+children+leaves[index+1:], evaluations,
                  tuple(counts), state.next_generation+2, 'pending')


def respond(ref, state, response):
    _require(type(state) is State and state._reference_identity is ref, 'state', 'same injected reference required')
    outstanding = request(state)
    _require(outstanding is not None, 'state', 'no pending response; completed or unresolved')
    _require(type(response) in (LeafResponse, ProviderUnavailable), 'immutability', 'exact response type required')
    _validate_request(ref, response.request)
    _require(response.request == outstanding,
             'identity', 'response must match exact next request; no stale parent/orphan/retry')
    if type(response) is ProviderUnavailable:
        _require(type(response.reason) is str and 0 < len(response.reason) <= 1024
                 and '\x00' not in response.reason, 'failure', 'bounded explicit provider failure required')
        return _state(ref, state.plan, state.leaves, state.evaluations, state.split_counts,
                      state.next_generation, 'unresolved', response.reason)
    evaluation = evaluate_leaf(ref, response)
    evaluations = state.evaluations+(evaluation,)
    _require(len(evaluations) <= MAX_EVALUATED_LEAVES, 'capacity', 'fixed evaluation census exceeded')
    leaves = tuple(_Leaf(leaf.request, evaluation) if leaf.request == outstanding else leaf for leaf in state.leaves)
    return _settle(ref, state, leaves, evaluations)
