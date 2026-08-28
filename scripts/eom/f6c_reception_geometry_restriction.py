"""Pure conditional reception-cell geometry restriction, not authentication.

restrict_cell_geometry(references, histories, parent, J, guards) uses ONLY the
injected frozen cached library's public history_state_over, certified_history
constructors, decimal_interval arithmetic, and acceleration Bounds/RootRow
record types. References must be captured/authenticated by a later caller;
their presence here is not source authentication. There is no file IO, root
search, face query, emission refinement, acceleration, quadrature or launch.

The inclusion proof is the accepted continuous-reception enclosure contract
(f20e4bda..., paragraphs145–169): on J contained in the proved parent cell,
each same-history root remains in the SAME pair-specific E. The original
strict faces, oldest boundary -8, uniqueness and self exclusions restrict to
J without another sign query. Closed-piece unions enclose Xi(J),Vi(J),Xj(E),
Vj(E), including both originals at a shared knot and unchanged scalar errors
covering the preserved axis errors. D=Xi-Xj; R=norm(D) intersect (J-E) intersect
[delta/(1+vj),infinity); N=D/R; Dt=1-N.Vj and Dr=1-N.Vi intersect their uniform
speed bounds. These are root-only intersections, never face evidence. Empty
intersections fail, never discard a root. No optional parent-geometry
intersection is taken, so the frozen19c57 exact Bernstein geometry checks
remain applicable. Receiver coverage changes; transmitter coverage does not.

All scientific inputs are bounded, exact immutable records, copied before
state evaluation. Eight labels,64 ordered rows,112 nonself piece records,
c_f=1, speed=.85, clearance=.27 and precision90 are fixed. Histories have
1..1760 pieces for portable controls; actual1760/source/whole-family truth
remain external obligations. history_generation hashes ALL original tokens,
including axis radii, as a consistency label only, never file provenance.
State/coverage reuse is call-local and keyed by member and exact interval.
There is no global cache, geometry contraction or accuracy guarantee.

Falsifiers: an omitted closed knot, changed E/face/identity, omitted original
uncertainty, non-outward endpoint, or exact permitted root geometry outside
the returned boxes. A failed sufficient interval test is not a physical
counterexample. Output authority flags remain false, even on success.
"""

from dataclasses import dataclass, replace
from decimal import Decimal, localcontext
from fractions import Fraction
import hashlib
import json
import re


LABELS = ('0+', '0-', '1+', '1-', '2+', '2-', '3+', '3-')
PRECISION = 90
MAX_SEGMENTS = 1760
_TOKEN = re.compile(r'[+-]?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)(?:[eE][+-]?[0-9]+)?\Z')
_SHA = re.compile(r'[0-9a-f]{64}\Z')


class RestrictionUnresolved(ValueError):
    pass


def _require(value, message):
    if not value:
        raise RestrictionUnresolved(message)


def _tuple(value, size):
    _require(type(value) is tuple and len(value) == size, 'exact bounded tuple required')


def _decimal(token):
    _require(type(token) is str and 0 < len(token) <= 1152 and _TOKEN.fullmatch(token),
             'bounded exact decimal token required')
    mantissa, *exponent = re.split('[eE]', token)
    _require(sum(c.isdigit() for c in mantissa) <= 1024, 'decimal digit bound')
    if exponent:
        magnitude = exponent[0].lstrip('+-0') or '0'
        _require(len(magnitude) <= 4 and int(magnitude) <= 1000, 'decimal exponent bound')
    value = Decimal(token)
    _require(value.is_finite() and abs(value.as_tuple().exponent) <= 1000, 'finite bounded decimal')
    return value


@dataclass(frozen=True, slots=True)
class References:
    history: object
    roots: object
    intervals: object
    ranges: object


@dataclass(frozen=True, slots=True)
class Segment:
    start: str
    end: str
    coefficients: tuple
    position_errors: tuple
    velocity_errors: tuple
    position_error: str
    velocity_error: str


@dataclass(frozen=True, slots=True)
class History:
    label: str
    segments: tuple


@dataclass(frozen=True, slots=True)
class ParentCell:
    index: int
    reception: object
    rows: tuple
    history_generations: tuple
    family_key: str
    retained_start: str
    status: str


@dataclass(frozen=True, slots=True)
class Guards:
    field_speed: str
    speed_upper: tuple
    clearance_lower: tuple


@dataclass(frozen=True, slots=True)
class PieceCoverage:
    row_index: int
    role: str
    member_id: str
    requested: object
    clips: tuple
    sha256: str


@dataclass(frozen=True, slots=True)
class Claims:
    accepted: bool = False
    source_authenticated: bool = False
    premise_truth_authenticated: bool = False
    historical_trajectory_identity_established: bool = False
    root_coverage_established: bool = False
    execution_authorized: bool = False
    metrics_available: bool = False
    score_authorized: bool = False
    h3_evidence_eligible: bool = False
    physical_claim_established: bool = False


@dataclass(frozen=True, slots=True)
class GeometryRestriction:
    status: str
    family_key: str
    cell_index: int
    parent_reception: object
    reception: object
    history_generations: tuple
    rows: tuple
    coverage: tuple
    state_evaluations: int
    claims: Claims
    root_queries: int = 0
    face_queries: int = 0
    emission_refinements: int = 0
    acceleration_evaluations: int = 0
    accuracy_guaranteed: bool = False


def _history(history):
    _require(type(history) is History and type(history.label) is str and history.label in LABELS,
             'original history identity required')
    _require(type(history.segments) is tuple and 0 < len(history.segments) <= MAX_SEGMENTS,
             'bounded original segment census')
    cursor = Decimal('-8'); copied = []
    for segment in history.segments:
        _require(type(segment) is Segment, 'original Segment required')
        lo, hi = _decimal(segment.start), _decimal(segment.end)
        _require(lo == cursor < hi <= Decimal('0.13'), 'original gap/overlap/domain')
        _tuple(segment.coefficients, 3)
        for axis in segment.coefficients:
            _tuple(axis, 4)
            for token in axis:
                _decimal(token)
        for errors, radius in ((segment.position_errors, segment.position_error),
                               (segment.velocity_errors, segment.velocity_error)):
            _tuple(errors, 3); r = _decimal(radius)
            _require(r >= 0 and all(0 <= _decimal(e) <= r for e in errors), 'axis/scalar error containment')
        copied.append(Segment(segment.start, segment.end, tuple(tuple(a) for a in segment.coefficients),
                              tuple(segment.position_errors), tuple(segment.velocity_errors),
                              segment.position_error, segment.velocity_error))
        cursor = hi
    _require(cursor == Decimal('0.13'), 'complete retained end required')
    return History(history.label, tuple(copied))


def _generation(history):
    values = [history.label, [(s.start, s.end, s.coefficients, s.position_errors,
                              s.velocity_errors, s.position_error, s.velocity_error) for s in history.segments]]
    return hashlib.sha256(json.dumps(values, separators=(',', ':'), ensure_ascii=True).encode('ascii')).hexdigest()


def history_generation(history):
    """Exact token consistency label, not original-file or premise authentication."""
    return _generation(_history(history))


def _bounds(ranges, value, *, positive=False):
    _require(type(value) is ranges.Bounds, 'frozen Bounds type required')
    lo, hi = _decimal(value.lower), _decimal(value.upper)
    _require(lo < hi if positive else lo <= hi, 'ordered bounds required')
    return ranges.Bounds(value.lower, value.upper)


def _clip(history, bounds):
    lo, hi = Fraction(_decimal(bounds.lower)), Fraction(_decimal(bounds.upper))
    clips = []; cursor = lo
    for n, segment in enumerate(history.segments):
        a, b = max(lo, Fraction(_decimal(segment.start))), min(hi, Fraction(_decimal(segment.end)))
        if a > b:
            continue
        _require(a <= cursor and (not clips or n == clips[-1][0]+1), 'complete closed piece coverage')
        clips.append((n, a, b)); cursor = max(cursor, b)
    _require(clips and cursor == hi, 'missing closed coverage')
    text = ''.join(f'{n}\t{a}\t{b}\n' for n, a, b in clips)
    return tuple(clips), hashlib.sha256(text.encode('ascii')).hexdigest()


def _parent(refs, parent, histories, J):
    a = refs.ranges
    _require(type(parent) is ParentCell and type(parent.index) is int and 0 <= parent.index < 160,
             'bounded original parent index')
    _require(parent.family_key == 'f6c-reconstruction-family' and type(parent.family_key) is str
             and type(parent.retained_start) is str and parent.retained_start == '-8'
             and type(parent.status) is str and parent.status == 'conditional_complete', 'fixed parent premises')
    reception = _bounds(a, parent.reception, positive=True)
    _require(Decimal(0) <= _decimal(reception.lower) <= _decimal(J.lower)
             < _decimal(J.upper) <= _decimal(reception.upper) <= Decimal('0.13'), 'positive J must restrict parent')
    _tuple(parent.history_generations, 8)
    generations = tuple(_generation(h) for h in histories)
    _require(all(type(x) is str and _SHA.fullmatch(x) for x in parent.history_generations)
             and parent.history_generations == generations, 'history generation mismatch')
    _tuple(parent.rows, 64); copied = []; clips = {}
    def clip(member, b):
        key = (member, b.lower, b.upper)
        if key not in clips:
            clips[key] = _clip(histories[member], b)
        return clips[key]
    for n, row in enumerate(parent.rows):
        i, j = divmod(n, 8)
        _require(type(row) is a.RootRow and type(row.receiver_id) is str and type(row.transmitter_id) is str
                 and (row.receiver_id, row.transmitter_id) == (LABELS[i], LABELS[j]), 'complete ordered pairs')
        row_reception = _bounds(a, row.reception, positive=True)
        _require(row_reception == reception, 'exact parent reception identity')
        _require(type(row.ordinary_roots_per_reception) is int
                 and row.ordinary_roots_per_reception == (0 if i == j else 1)
                 and type(row.coincident_endpoint_excluded) is bool and row.coincident_endpoint_excluded == (i == j)
                 and row.root_free_complement_conditional is True and row.retained_boundary_contact is False,
                 'parent root flags')
        fields = (row.emission, row.oldest_residual, row.lower_face_residual, row.upper_face_residual,
                  row.displacement, row.distance, row.transmitter_factor, row.receiver_factor,
                  row.receiver_coverage_sha256, row.transmitter_coverage_sha256)
        if i == j:
            _require(all(x is None for x in fields), 'self has no geometry or piece evidence')
            copied.append(a.RootRow(LABELS[i], LABELS[j], reception, None, 0, True,
                                   None, None, None, None, None, None, None, None, None, True, False))
            continue
        e, oldest, lower, upper, distance, dt, dr = (
            _bounds(a, x, positive=(k == 0)) for k, x in enumerate(
                (row.emission, row.oldest_residual, row.lower_face_residual, row.upper_face_residual,
                 row.distance, row.transmitter_factor, row.receiver_factor)))
        _require(Decimal('-8') <= _decimal(e.lower) < _decimal(e.upper) < _decimal(reception.lower), 'original emission domain')
        _require(_decimal(oldest.upper) < 0 and _decimal(lower.upper) < 0 and _decimal(upper.lower) > 0,
                 'strict inherited faces')
        _require(_decimal(distance.lower) > 0 and _decimal(dt.lower) >= Decimal('1e-24')
                 and _decimal(dr.lower) > 0, 'positive original geometry factors')
        _tuple(row.displacement, 3); displacement = tuple(_bounds(a, x) for x in row.displacement)
        for token in (row.receiver_coverage_sha256, row.transmitter_coverage_sha256):
            _require(type(token) is str and _SHA.fullmatch(token), 'original coverage identity')
        _require(clip(i, reception)[1] == row.receiver_coverage_sha256
                 and clip(j, e)[1] == row.transmitter_coverage_sha256, 'original coverage mismatch')
        copied.append(a.RootRow(LABELS[i], LABELS[j], reception, e, 1, False, oldest, lower, upper,
                               displacement, distance, dt, dr, row.receiver_coverage_sha256,
                               row.transmitter_coverage_sha256, True, False))
    return ParentCell(parent.index, reception, tuple(copied), generations,
                      parent.family_key, '-8', parent.status), clip


def restrict_cell_geometry(references, histories, parent, J, guards):
    """Conditional64-row geometry only; no inferred truth from declared premises."""
    _require(type(references) is References, 'explicit frozen reference dependencies required')
    _tuple(histories, 8)
    histories = tuple(_history(h) for h in histories)
    _require(tuple(h.label for h in histories) == LABELS, 'fixed member order')
    _require(type(guards) is Guards and type(guards.field_speed) is str and guards.field_speed == '1', 'normalized guards')
    _tuple(guards.speed_upper, 8); _tuple(guards.clearance_lower, 8)
    _require(all(type(v) is str and v == '0.85' for v in guards.speed_upper), 'fixed full-domain speed')
    for i, row in enumerate(guards.clearance_lower):
        _tuple(row, 8)
        _require(all(type(v) is str and v == ('0' if i == j else '0.27') for j, v in enumerate(row)), 'fixed clearance')
    a, d, h, r = references.ranges, references.intervals, references.history, references.roots
    J = _bounds(a, J, positive=True)
    parent, clip = _parent(references, parent, histories, J)
    # Everything below operates on copied immutable inputs. No parent/source
    # object is consulted from within a reference state evaluation.
    models = tuple(h.PiecewisePolynomialHistory(tuple(h.CubicHistorySegment(
        _decimal(s.start), _decimal(s.end), tuple(tuple(_decimal(c) for c in row) for row in s.coefficients),
        _decimal(s.position_error), _decimal(s.velocity_error), PRECISION) for s in history.segments), history.label)
        for history in histories)
    states = {}
    I = d.DecimalInterval
    point = lambda x: I.point(x, PRECISION)
    def interval(b): return I.bounds(b.lower, b.upper, PRECISION)
    def output(b): return a.Bounds(str(b.lower), str(b.upper))
    def intersect(x, y):
        lo, hi = max(x.lower, y.lower), min(x.upper, y.upper)
        _require(lo <= hi, 'empty geometry intersection; no root discarded')
        return I.bounds(lo, hi, PRECISION)
    def state(member, b):
        key = (member, _decimal(b.lower).as_tuple(), _decimal(b.upper).as_tuple(), PRECISION)
        if key not in states:
            result = r.history_state_over(models[member], interval(b))
            actual = tuple((n, Fraction(part.lower), Fraction(part.upper)) for n, part in result.pieces)
            _require(actual == clip(member, b)[0], 'state omitted or changed a closed knot')
            states[key] = result
        return states[key]
    rows = []; coverage = []
    with localcontext() as context:
        context.prec = PRECISION; context.Emin = -999999; context.Emax = 999999
        speed_bounds = I.bounds('0.15', '1.85', PRECISION)
        floor = point('0.27') / (point(1) + point('0.85'))
        for n, row in enumerate(parent.rows):
            i, j = divmod(n, 8)
            if i == j:
                rows.append(replace(row, reception=J)); continue
            receiver, transmitter = state(i, J), state(j, row.emission)
            displacement = d.interval_vector(x-y for x, y in zip(receiver.position, transmitter.position))
            distance = intersect(d.interval_norm(displacement), interval(J)-interval(row.emission))
            _require(floor.lower <= distance.upper, 'empty clearance intersection')
            distance = intersect(distance, I.bounds(floor.lower, distance.upper, PRECISION))
            _require(distance.lower > 0, 'positive root distance unresolved')
            direction = d.interval_vector(x/distance for x in displacement)
            dt = intersect(point(1)-d.interval_dot(direction, transmitter.velocity), speed_bounds)
            dr = intersect(point(1)-d.interval_dot(direction, receiver.velocity), speed_bounds)
            _require(dt.lower >= Decimal('1e-24') and dr.lower > 0, 'factor floor/positivity unresolved')
            rx_clip, rx_hash = clip(i, J); tx_clip, tx_hash = clip(j, row.emission)
            _require(tx_hash == row.transmitter_coverage_sha256, 'unchanged emission coverage')
            rows.append(replace(row, reception=J, displacement=tuple(output(x) for x in displacement),
                                distance=output(distance), transmitter_factor=output(dt), receiver_factor=output(dr),
                                receiver_coverage_sha256=rx_hash))
            coverage.extend((PieceCoverage(n, 'receiver', LABELS[i], J, rx_clip, rx_hash),
                             PieceCoverage(n, 'transmitter', LABELS[j], row.emission, tx_clip, tx_hash)))
    _require(len(rows) == 64 and len(coverage) == 112, 'complete output census')
    return GeometryRestriction('conditional_geometry_restricted', parent.family_key, parent.index,
                               parent.reception, J, parent.history_generations, tuple(rows), tuple(coverage),
                               len(states), Claims())
