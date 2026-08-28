"""Separate call-local cached successor; NOT wired to any accepted consumer.

Baseline: continuous_reception_roots.py at SHA-256
f38657eedb585f6066bf233cef05508ef4d4336146dbf1e44501dfa9b669e04c.
Only successful immutable state-box evaluations are reused. Equivalence and
review boundary: 2026-08-27-f6c-call-local-state-cache-equivalence.md.
The baseline remains the accepted path until a separate protocol/binding batch.

Conditional whole-reception root boxes for the frozen sharp-law consumer.

This bounded mathematical library checks proposed boxes; it performs no scalar
root search, acceleration calculation, data loading, or measurement. Its result
is conditional on the explicitly supplied common-history and uniform-guard
hypotheses. Their truth, provenance, and applicability to a subject must be
independently established by the caller; matching history digests is not proof.

The proof is the separately reviewed F6c continuous-reception theorem at
f20e4bdaaff8b6f0012fdc6135b15d568a817832fb55d5c42f80d8421a117f68.
Frozen scalar references are consumed unchanged. Their scalar root certificate
is deliberately not imported or fabricated for interval reception times.
"""

from __future__ import annotations

from collections.abc import Sequence
from dataclasses import dataclass
from decimal import Decimal, localcontext
from typing import Mapping

from .certified_history import CubicHistorySegment, PiecewisePolynomialHistory
from .decimal_interval import DecimalInterval, IntervalVector, interval_dot, interval_norm, interval_vector


PRECISION = 90
TRANSMITTER_FACTOR_FLOOR = Decimal("1e-24")
MAX_MEMBERS = 8
# Finite capacities for the declared F6c three-rung consumer, not permission to
# enlarge its numerical/refinement contract. The finest declared nominal rung
# needs 6,400 past + 640 evolved pieces per member = 7,040 < 8,192.
MAX_SEGMENTS_PER_HISTORY = 8192
# 320 frame intervals, each with at most 20 splits, yield 6,720 leaves.
# Even if all eight members' 639 interior evolved knots are distinct, their
# union adds at most 5,112 leaves: 11,832 < 16,384. An actual census beyond this
# explicit finite capacity remains unresolved; no adaptive limit is relaxed.
MAX_RECEPTION_CELLS = 16384


class RootBoxUnresolved(ValueError):
    def __init__(self, code: str, detail: str):
        super().__init__(detail)
        self.code = code


def _require(condition: bool, code: str, detail: str) -> None:
    if not condition:
        raise RootBoxUnresolved(code, detail)


def _point(value: object) -> DecimalInterval:
    return DecimalInterval.point(value, PRECISION)


def _valid_time(interval: DecimalInterval, *, positive_width: bool = False) -> None:
    _require(type(interval) is DecimalInterval and interval.precision == PRECISION,
             "precision", "all time boxes require the frozen 90-digit precision")
    _require(_finite_decimal(interval.lower) and _finite_decimal(interval.upper)
             and interval.lower <= interval.upper, "time_domain", "invalid finite time box")
    if positive_width:
        _require(interval.lower < interval.upper, "time_domain", "time cell must have positive width")


def _finite_decimal(value: Decimal) -> bool:
    return (type(value) is Decimal and value.is_finite()
            and len(value.as_tuple().digits) <= 1024 and abs(value.as_tuple().exponent) <= 1000)


@dataclass(frozen=True)
class ConditionalPremises:
    """Explicit hypotheses, not a certificate or authority to assume them true.

speed_upper[i] is uniform on the FULL retained domain; clearance_lower[i][j]
is uniform on the full reception domain. Both concern the same coherent paths
and derivatives inside the scalar-enlarged original boxes. The diagonal is 0.
Scalar error radii may outwardly cover original axis radii, but the caller must
preserve and bind those original tokens and the scalar-enlargement relationship.
"""

    member_digests: tuple[tuple[str, str], ...]
    retained_domain: DecimalInterval
    reception_domain: DecimalInterval
    speed_upper: tuple[Decimal, ...]
    clearance_lower: tuple[tuple[Decimal, ...], ...]
    common_c1_original_box_membership_assumed: bool
    uniform_speed_and_clearance_assumed: bool
    hypothesis_scope: str


@dataclass(frozen=True)
class ReceptionCellProposal:
    reception: DecimalInterval
    emission_boxes: Mapping[tuple[str, str], DecimalInterval]


@dataclass(frozen=True)
class HistoryStateBox:
    position: IntervalVector
    velocity: IntervalVector
    # Includes both adjacent originals at a shared endpoint, even for point time.
    pieces: tuple[tuple[int, DecimalInterval], ...]


@dataclass(frozen=True)
class ConditionalRootRow:
    receiver_id: str
    transmitter_id: str
    reception: DecimalInterval
    emission: DecimalInterval | None
    ordinary_roots_per_reception: int
    coincident_endpoint_excluded: bool
    oldest_residual: DecimalInterval | None = None
    lower_face_residual: DecimalInterval | None = None
    upper_face_residual: DecimalInterval | None = None
    displacement: IntervalVector | None = None
    distance: DecimalInterval | None = None
    transmitter_factor: DecimalInterval | None = None
    receiver_factor: DecimalInterval | None = None
    receiver_pieces: tuple[tuple[int, DecimalInterval], ...] = ()
    transmitter_pieces: tuple[tuple[int, DecimalInterval], ...] = ()
    root_free_complement_conditional: bool = True
    retained_boundary_contact: bool = False


@dataclass(frozen=True)
class ConditionalRootCover:
    status: str
    rows: tuple[ConditionalRootRow, ...]
    reception_cells: tuple[DecimalInterval, ...]
    expected_rows: int
    failure_code: str
    failure_detail: str
    hypotheses: ConditionalPremises
    # These limits hold even when status is conditional_complete.
    premise_truth_authenticated: bool = False
    subject_membership_established: bool = False
    execution_authorized: bool = False
    metrics_available: bool = False
    h3_evidence_eligible: bool = False

    @property
    def complete_conditional_coverage(self) -> bool:
        return self.status == "conditional_complete"


def _history_structure(history: PiecewisePolynomialHistory) -> None:
    _require(type(history) is PiecewisePolynomialHistory and history.history_id,
             "history_structure", "history type and persistent identity required")
    _require(0 < len(history.segments) <= MAX_SEGMENTS_PER_HISTORY,
             "resource_limit", "history segment census exceeds library bound")
    cursor = history.segments[0].t_start
    for segment in history.segments:
        _require(segment.precision == PRECISION, "precision", "history precision must be exactly 90")
        _require(_finite_decimal(segment.t_start) and _finite_decimal(segment.t_end)
                 and cursor == segment.t_start < segment.t_end,
                 "history_coverage", "history has a gap, overlap, or invalid endpoint")
        _require(len(segment.coefficients) == 3 and all(len(row) == 4 for row in segment.coefficients)
                 and all(_finite_decimal(c) for row in segment.coefficients for c in row),
                 "history_structure", "exact finite cubic coefficient matrix required")
        _require(_finite_decimal(segment.position_error) and _finite_decimal(segment.velocity_error)
                 and segment.position_error >= 0 and segment.velocity_error >= 0,
                 "history_structure", "original scalar enlargement radii must be finite and nonnegative")
        cursor = segment.t_end


@dataclass(frozen=True)
class _ValidatedHistorySnapshot:
    """Call-local copied generation; its digest is NOT original-file provenance."""

    history_id: str
    segments: tuple[CubicHistorySegment, ...]
    t_start: Decimal
    t_end: Decimal
    history_digest: str


def _snapshot_history(history: PiecewisePolynomialHistory) -> _ValidatedHistorySnapshot:
    # Copy before validating or hashing. Frozen dataclass declarations alone do
    # not exclude caller-owned lists in their fields. Only immutable leaves and
    # fresh tuple/segment containers survive into the validated generation.
    _require(type(history) is PiecewisePolynomialHistory and type(history.history_id) is str,
             "history_structure", "history type and string identity required")
    identity, source_segments = history.history_id, history.segments
    _require(isinstance(source_segments, Sequence),
             "resource_limit", "history segments must be a bounded Sequence")
    segment_count = len(source_segments)
    _require(0 < segment_count <= MAX_SEGMENTS_PER_HISTORY,
             "resource_limit", "history segment census exceeds library bound")
    segments = []
    for index in range(segment_count):
        segment = source_segments[index]
        _require(type(segment) is CubicHistorySegment and type(segment.precision) is int,
                 "history_structure", "original cubic segment and integer precision required")
        source_rows = segment.coefficients
        _require(isinstance(source_rows, Sequence) and len(source_rows) == 3,
                 "history_structure", "exact finite cubic coefficient matrix required")
        rows = []
        for axis in range(3):
            row = source_rows[axis]
            _require(isinstance(row, Sequence) and len(row) == 4,
                     "history_structure", "exact finite cubic coefficient matrix required")
            rows.append(tuple(row[column] for column in range(4)))
        segments.append(CubicHistorySegment(segment.t_start, segment.t_end, tuple(rows),
                                           segment.position_error, segment.velocity_error,
                                           segment.precision))
    copied = PiecewisePolynomialHistory(tuple(segments), identity)
    _history_structure(copied)
    return _ValidatedHistorySnapshot(copied.history_id, copied.segments, copied.t_start,
                                     copied.t_end, copied.digest())


def _history_state_over(history: _ValidatedHistorySnapshot, time: DecimalInterval) -> HistoryStateBox:
    """Same closed-piece union arithmetic, on an already validated snapshot."""
    _valid_time(time)
    _require(history.t_start <= time.lower <= time.upper <= history.t_end,
             "history_coverage", "requested state box extends outside retained history")
    position = velocity = None
    pieces = []
    cursor = time.lower
    for index, segment in enumerate(history.segments):
        lo, hi = max(time.lower, segment.t_start), min(time.upper, segment.t_end)
        if lo > hi:
            continue
        _require(lo <= cursor, "history_coverage", "uncovered sliver in state box")
        part = DecimalInterval.bounds(lo, hi, PRECISION)
        x, v = segment.position_interval(part), segment.velocity_interval(part)
        if position is None:
            position, velocity = x, v
        else:
            position = interval_vector(a.hull(b) for a, b in zip(position, x))
            velocity = interval_vector(a.hull(b) for a, b in zip(velocity, v))
        pieces.append((index, part))
        cursor = max(cursor, hi)
    _require(position is not None and velocity is not None and cursor == time.upper,
             "history_coverage", "state enclosure did not cover every requested time")
    return HistoryStateBox(position, velocity, tuple(pieces))


def history_state_over(history: PiecewisePolynomialHistory, time: DecimalInterval) -> HistoryStateBox:
    """Fully validate a copied generation, then enclose ALL touched closed pieces.

This public entry point never trusts a previous call's validation. It checks
full requested coverage, unlike a partial-overlap hull, but neither assumes
nominal joins agree nor declares a coherent history exists.
"""
    _valid_time(time)
    return _history_state_over(_snapshot_history(history), time)



# A storage bound, NOT a mathematical admission limit. Eviction only forces
# recomputation. Four state roles per member fit the shared-box one-cell case.
_MAX_CACHED_STATES = 4 * MAX_MEMBERS


class _CallLocalStateCache:
    """Private reuse of validated immutable generations within one cover call.

    Hold strong snapshot references; object ids cannot be recycled in this
    cache. Decimal tuples preserve signed zero and exponent as well as value.
    Errors are never cached. No caller can inject this cache into a public API.
    """

    __slots__ = ("_histories", "_states")

    def __init__(self, histories: tuple[_ValidatedHistorySnapshot, ...]):
        _require(type(histories) is tuple
                 and all(type(h) is _ValidatedHistorySnapshot for h in histories),
                 "history_structure", "cache requires captured history snapshots")
        self._histories = {id(h): h for h in histories}
        self._states = {}

    def clear(self) -> None:
        self._states.clear()

    def state(self, history: _ValidatedHistorySnapshot,
              time: DecimalInterval) -> HistoryStateBox:
        _valid_time(time)  # A prior success never bypasses operand validation.
        _require(self._histories.get(id(history)) is history,
                 "history_structure", "snapshot is outside this call's captured generation")
        # Preserve baseline behavior for non-integer precision fields that
        # compare equal to 90: do not turn their evaluation into a cache hit.
        if type(time.precision) is not int:
            return _history_state_over(history, time)
        key = (id(history), time.lower.as_tuple(), time.upper.as_tuple(), time.precision)
        if key not in self._states:
            value = _history_state_over(history, time)
            if len(self._states) >= _MAX_CACHED_STATES:
                del self._states[next(iter(self._states))]
            self._states[key] = value
        return self._states[key]


def unrestricted_residual(receiver: PiecewisePolynomialHistory, transmitter: PiecewisePolynomialHistory,
                          reception: DecimalInterval, emission: DecimalInterval) -> DecimalInterval:
    """Original norm-minus-delay residual, NEVER intersected with a root equation."""
    return _unrestricted_residual(_snapshot_history(receiver), _snapshot_history(transmitter),
                                  reception, emission)


def _unrestricted_residual(receiver: _ValidatedHistorySnapshot, transmitter: _ValidatedHistorySnapshot,
                           reception: DecimalInterval, emission: DecimalInterval, *,
                           _state_over=None) -> DecimalInterval:
    _valid_time(reception)
    _valid_time(emission)
    _require(emission.upper <= reception.lower, "time_domain", "emission must precede every reception")
    state_over = _history_state_over if _state_over is None else _state_over
    xr = state_over(receiver, reception).position
    xt = state_over(transmitter, emission).position
    displacement = interval_vector(a-b for a, b in zip(xr, xt))
    return interval_norm(displacement) - (reception - emission)


def _intersection(left: DecimalInterval, right: DecimalInterval, label: str) -> DecimalInterval:
    _require(left.precision == right.precision == PRECISION, "precision", "intersection precision mismatch")
    lo, hi = max(left.lower, right.lower), min(left.upper, right.upper)
    _require(lo <= hi, "empty_intersection", f"empty {label} intersection; no root may be discarded")
    return DecimalInterval.bounds(lo, hi, PRECISION)


def _root_geometry(receiver: PiecewisePolynomialHistory | _ValidatedHistorySnapshot,
                   transmitter: PiecewisePolynomialHistory | _ValidatedHistorySnapshot,
                   reception: DecimalInterval, emission: DecimalInterval,
                   receiver_speed: Decimal, transmitter_speed: Decimal, clearance: Decimal, *,
                   _state_over=None):
    """Private post-face operation: only callers that already proved coverage use it."""
    # Direct analytic controls may pass original histories; the cover always
    # supplies its call-local snapshots and never revalidates whole histories.
    if type(receiver) is not _ValidatedHistorySnapshot:
        receiver = _snapshot_history(receiver)
    if type(transmitter) is not _ValidatedHistorySnapshot:
        transmitter = _snapshot_history(transmitter)
    state_over = _history_state_over if _state_over is None else _state_over
    receiver_state = state_over(receiver, reception)
    transmitter_state = state_over(transmitter, emission)
    displacement = interval_vector(a-b for a, b in zip(receiver_state.position, transmitter_state.position))
    distance = _intersection(interval_norm(displacement), reception - emission, "distance/delay")
    delay_floor = _point(clearance) / (_point(1) + _point(transmitter_speed))
    distance = _intersection(distance, DecimalInterval.bounds(delay_floor.lower, distance.upper, PRECISION)
                             if delay_floor.lower <= distance.upper else _point(delay_floor.lower),
                             "positive-clearance distance")
    _require(distance.lower > 0, "zero_denominator", "root distance is not separated from zero")
    direction = interval_vector(component / distance for component in displacement)
    source_factor = _point(1) - interval_dot(direction, transmitter_state.velocity)
    receiver_factor = _point(1) - interval_dot(direction, receiver_state.velocity)
    source_analytic = DecimalInterval.bounds((_point(1)-_point(transmitter_speed)).lower,
                                            (_point(1)+_point(transmitter_speed)).upper, PRECISION)
    receiver_analytic = DecimalInterval.bounds((_point(1)-_point(receiver_speed)).lower,
                                              (_point(1)+_point(receiver_speed)).upper, PRECISION)
    source_factor = _intersection(source_factor, source_analytic, "transmitter factor")
    receiver_factor = _intersection(receiver_factor, receiver_analytic, "receiver factor")
    _require(source_factor.lower >= TRANSMITTER_FACTOR_FLOOR,
             "factor_floor", "transmitter factor does not meet the frozen 1e-24 floor")
    _require(receiver_factor.lower > 0, "zero_denominator", "receiver factor positivity unresolved")
    return displacement, distance, source_factor, receiver_factor, receiver_state.pieces, transmitter_state.pieces


def _validate_premises(histories: tuple[_ValidatedHistorySnapshot, ...], premises: ConditionalPremises) -> None:
    _require(type(premises) is ConditionalPremises, "premise", "explicit conditional premises required")
    _require(2 <= len(histories) <= MAX_MEMBERS, "resource_limit", "member census outside bounded interface")
    # The same object is used throughout and retained in the result. Frozen
    # dataclasses alone do not exclude mutable lists or mutable leaf subclasses.
    _require(type(premises.member_digests) is tuple and len(premises.member_digests) == len(histories)
             and all(type(pair) is tuple and len(pair) == 2
                     and all(type(token) is str for token in pair) for pair in premises.member_digests),
             "premise", "member digest bindings require bounded tuples of exact strings")
    _valid_time(premises.retained_domain, positive_width=True)
    _valid_time(premises.reception_domain, positive_width=True)
    _require(premises.retained_domain.lower < premises.reception_domain.lower
             < premises.reception_domain.upper <= premises.retained_domain.upper,
             "premise", "retained/reception domains do not satisfy the theorem")
    _require(premises.common_c1_original_box_membership_assumed is True
             and premises.uniform_speed_and_clearance_assumed is True
             and type(premises.hypothesis_scope) is str and bool(premises.hypothesis_scope.strip()),
             "premise", "common C1, original-box membership and uniform guard hypotheses must be explicit")
    ids = tuple(history.history_id for history in histories)
    _require(len(set(ids)) == len(ids), "identity", "duplicate member history identity")
    for history in histories:
        _require(history.t_start == premises.retained_domain.lower
                 and history.t_end == premises.retained_domain.upper,
                 "history_coverage", "full retained domain differs from hypothesis scope")
    _require(premises.member_digests == tuple((history.history_id, history.history_digest) for history in histories),
             "identity", "hypothesis member order or history digest mismatch")
    _require(type(premises.speed_upper) is tuple and len(premises.speed_upper) == len(histories)
             and all(_finite_decimal(v) and 0 <= v < 1 for v in premises.speed_upper),
             "premise", "uniform speed bounds require an exact tuple of Decimals in [0,1)")
    _require(type(premises.clearance_lower) is tuple and len(premises.clearance_lower) == len(histories)
             and all(type(row) is tuple and len(row) == len(histories) for row in premises.clearance_lower),
             "premise", "complete ordered-pair clearance matrix requires exact tuples")
    for i, row in enumerate(premises.clearance_lower):
        for j, delta in enumerate(row):
            _require(_finite_decimal(delta) and (delta == 0 if i == j else delta > 0),
                     "premise", "nonself uniform clearance must be strictly positive; diagonal must be zero")


def _split_proposals(histories: tuple[PiecewisePolynomialHistory | _ValidatedHistorySnapshot, ...],
                     premises: ConditionalPremises,
                     proposals: Sequence[ReceptionCellProposal]):
    _require(0 < len(proposals) <= MAX_RECEPTION_CELLS, "resource_limit", "proposal census exceeds library bound")
    ids = tuple(history.history_id for history in histories)
    required_pairs = {(i, j) for i in ids for j in ids if i != j}
    original_knots = {knot for history in histories for segment in history.segments
                      for knot in (segment.t_start, segment.t_end)}
    cursor = premises.reception_domain.lower
    cells = []
    for proposal in proposals:
        _require(type(proposal) is ReceptionCellProposal, "coverage", "invalid reception proposal")
        interval = proposal.reception
        _valid_time(interval, positive_width=True)
        _require(interval.lower == cursor and interval.upper <= premises.reception_domain.upper,
                 "coverage", "reception proposals must cover in exact order without gaps/overlaps")
        _require(set(proposal.emission_boxes) == required_pairs, "pair_census", "missing, extra, or self emission proposal")
        emissions = dict(proposal.emission_boxes)
        for emission in emissions.values():
            _valid_time(emission, positive_width=True)
            _require(premises.retained_domain.lower <= emission.lower < emission.upper < interval.lower,
                     "time_domain", "emission box must be retained and strictly before whole receiver cell")
        knots = [interval.lower, *sorted(k for k in original_knots if interval.lower < k < interval.upper), interval.upper]
        for lo, hi in zip(knots, knots[1:]):
            cells.append((DecimalInterval.bounds(lo, hi, PRECISION), emissions))
            _require(len(cells) <= MAX_RECEPTION_CELLS, "resource_limit", "split reception census exceeds library bound")
        cursor = interval.upper
    _require(cursor == premises.reception_domain.upper, "coverage", "reception domain has an uncovered suffix")
    return cells


def enclose_root_cover(histories: Sequence[PiecewisePolynomialHistory], premises: ConditionalPremises,
                       proposals: Sequence[ReceptionCellProposal]) -> ConditionalRootCover:
    """Check an entire proposed finite time/pair cover, conditionally, or abstain.

No acceptance flag is issued. On the first unresolved row the partial rows are
retained, but complete_conditional_coverage remains false. Every row keeps one
pair identity when time boxes cross original piece boundaries. All coordinates
use the unchanged reference's original scalar error enlargement; no root
equation is imposed until the two unrestricted whole-face signs pass.
"""
    rows: list[ConditionalRootRow] = []
    reception_cells: tuple[DecimalInterval, ...] = ()
    expected = 0
    context = "preflight"
    try:
        # Fix working precision and exponent range. Each interval primitive
        # separately selects the directed rounding of its endpoints.
        with localcontext() as decimal_context:
            decimal_context.prec = PRECISION
            decimal_context.Emin, decimal_context.Emax = -999999, 999999
            _require(isinstance(histories, Sequence), "resource_limit",
                     "histories must be a bounded Sequence, not an iterator")
            member_count = len(histories)
            _require(2 <= member_count <= MAX_MEMBERS, "resource_limit",
                     "member census outside bounded interface before materialization")
            # Bounded indexing also avoids an unbounded __iter__ on a Sequence
            # whose declared length is valid. No iterator is consumed here.
            materialized = tuple(_snapshot_history(histories[index]) for index in range(member_count))
            _validate_premises(materialized, premises)
            cells = _split_proposals(materialized, premises, proposals)
            reception_cells = tuple(cell for cell, _ in cells)
            expected = len(cells) * len(materialized)**2
            state_cache = _CallLocalStateCache(materialized)
            for cell_index, (reception, emissions) in enumerate(cells):
                state_cache.clear()  # Keep retention bounded independently of cell count.
                for i, receiver in enumerate(materialized):
                    for j, transmitter in enumerate(materialized):
                        context = f"cell {cell_index}, pair {receiver.history_id}/{transmitter.history_id}"
                        if i == j:
                            # Reverse triangle inequality + the same globally C1
                            # member's uniform V<1 excludes every positive delay.
                            rows.append(ConditionalRootRow(receiver.history_id, transmitter.history_id,
                                                           reception, None, 0, True))
                            continue
                        emission = emissions[(receiver.history_id, transmitter.history_id)]
                        oldest = _unrestricted_residual(receiver, transmitter, reception,
                                                        _point(premises.retained_domain.lower),
                                                        _state_over=state_cache.state)
                        _require(oldest.upper < 0, "oldest_boundary", "unrestricted oldest-face sign is not strictly negative")
                        lower = _unrestricted_residual(receiver, transmitter, reception, _point(emission.lower),
                                                       _state_over=state_cache.state)
                        upper = _unrestricted_residual(receiver, transmitter, reception, _point(emission.upper),
                                                       _state_over=state_cache.state)
                        _require(lower.upper < 0 and upper.lower > 0, "face_sign",
                                 "unrestricted whole-face signs do not strictly bracket every reception root")
                        geometry = _root_geometry(receiver, transmitter, reception, emission,
                                                  premises.speed_upper[i], premises.speed_upper[j],
                                                  premises.clearance_lower[i][j], _state_over=state_cache.state)
                        rows.append(ConditionalRootRow(receiver.history_id, transmitter.history_id,
                                                       reception, emission, 1, False, oldest, lower, upper,
                                                       *geometry))
            _require(len(rows) == expected, "pair_census", "incomplete final time/pair census")
        return ConditionalRootCover("conditional_complete", tuple(rows), reception_cells, expected, "", "", premises)
    except (ValueError, TypeError, ArithmeticError, IndexError, KeyError, AttributeError) as error:
        code = error.code if isinstance(error, RootBoxUnresolved) else "invalid_input_or_arithmetic"
        return ConditionalRootCover("unresolved", tuple(rows), reception_cells, expected, code,
                                    f"{context}: {error}", premises)
