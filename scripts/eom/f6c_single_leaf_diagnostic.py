"""One fixed F6c leaf diagnostic; no launch, adaptation, roots or authority.

The caller supplies one fresh, source-bound adapter context and owns process
admission, runtime supervision, final source recheck and publication. This
composition itself authenticates nothing. A synthetic adapter is also useful
for controls, and cannot acquire scientific authority through this function.

Exactly four range calls cover [0,0.001] and its three frozen GK neighborhoods,
in that order. Eight correlated residual calls then feed ONE frozen leaf
evaluation. No global state machine, split, aggregate or retry is invoked.
The resulting bounds concern this leaf only, never a whole-history metric.
measure retains inherited parent geometry. measure_restricted explicitly calls
the adapter's restricted projection route four times. Its additive result wraps
the same leaf record with a mode and observed geometry/state counters; it grants
no additional scientific authority and does not alter the adapter's methods.
measure_bisected_restricted evaluates only two declared children of that parent;
its split budget includes mandatory original-frame cuts, without running State.

LeafResponseSession is the separate request-driven bridge. It owns one genuine
frozen GK State and one captured reference identity. provide performs only four
restricted ranges and eight correlated residuals; advance explicitly delegates
one leaf evaluation/state transition to frozen respond. No execution loop, IO,
resource extension, source authentication or numerical authority is added.
"""

from dataclasses import dataclass
from decimal import Decimal, InvalidOperation
from fractions import Fraction as F
import re


LABELS = ('0+', '0-', '1+', '1-', '2+', '2-', '3+', '3-')
COUNTERS = ('projections', 'evaluations', 'residuals', 'root_queries', 'emission_refinements')
GEOMETRY_COUNTERS = ('restriction_calls', 'completed_restrictions',
                     'history_state_evaluations', 'restricted_projections')


@dataclass(frozen=True, slots=True)
class RangeSnapshot:
    cell: object
    ranges: object


@dataclass(frozen=True, slots=True)
class LeafDiagnostic:
    schema: str
    scope: str
    context: object
    source_provenance: tuple
    request: object
    ranges: tuple
    correlated_residuals: tuple
    leaf: object
    call_counts: tuple
    claims: object


@dataclass(frozen=True, slots=True)
class RestrictedLeafDiagnostic:
    schema: str
    mode: str
    diagnostic: LeafDiagnostic
    geometry_accounting: tuple
    history_state_evaluations: tuple


@dataclass(frozen=True, slots=True)
class RationalBounds:
    """Exact rational strings, not decimal Bounds or rounded display values."""
    lower: str
    upper: str


@dataclass(frozen=True, slots=True)
class LocalMemberIntegral:
    label: str
    integral: RationalBounds


@dataclass(frozen=True, slots=True)
class LocalSummary:
    member_integrals: tuple
    total_integral: RationalBounds
    sum_leaf_integral_width_exact: str
    serialized_integral_width: str
    peak: object


@dataclass(frozen=True, slots=True)
class SplitAccounting:
    frame_index: int
    mandatory_cut_tokens: tuple
    new_cut: str
    used_before: int
    used_after: int
    maximum: int
    remaining: int


@dataclass(frozen=True, slots=True)
class BisectedRestrictedDiagnostic:
    schema: str
    scope: str
    context: object
    source_provenance: tuple
    parent_domain: object
    children: tuple
    local_summary: LocalSummary
    split_accounting: SplitAccounting
    request_identity_scope: str
    child_call_counts_scope: str
    call_counts: tuple
    geometry_accounting: tuple
    history_state_evaluations: tuple
    claims: object


def _require(ok, message):
    if not ok:
        raise ValueError(message)


def _counts(adapter):
    values = adapter.call_counts
    result = tuple(values[key] for key in COUNTERS)
    _require(all(type(value) is int and value >= 0 for value in result),
             'exact nonnegative adapter counters required')
    return result


def _geometry_counts(adapter):
    values = adapter.geometry_accounting
    _require(set(values) == set(GEOMETRY_COUNTERS), 'exact geometry accounting fields required')
    result = tuple(values[key] for key in GEOMETRY_COUNTERS)
    _require(all(type(value) is int and value >= 0 for value in result),
             'exact nonnegative geometry counters required')
    return result


def measure(adapter, progress=None):
    """Conditional arithmetic only, using a fresh adapter and fixed first leaf."""
    return _measure(adapter, progress, restricted=False)


def measure_restricted(adapter, progress=None):
    """Same single leaf, explicitly refreshing reception geometry four times."""
    return _measure(adapter, progress, restricted=True)


def _measure(adapter, progress, *, restricted):
    _require(progress is None or callable(progress), 'optional progress callback required')
    _require(_counts(adapter) == (0, 0, 0, 0, 0), 'fresh unmeasured adapter required')
    geometry_expected = (0, 0, 0, 0)
    state_deltas = []
    if restricted:
        _require(_geometry_counts(adapter) == geometry_expected, 'fresh geometry adapter required')
    a, ref, gk = adapter.acceleration_reference, adapter.integral_reference, adapter.gk_protocol
    domain = ref.Bounds('0', '0.001')
    nodes = gk.node_neighborhoods(ref, domain)
    request = gk.LeafRequest(adapter.context, 0, domain, 0, (0,), nodes)
    result, geometry_expected, state_deltas = _leaf(adapter, progress, restricted=restricted,
        request=request, geometry_expected=geometry_expected)
    if not restricted:
        return result
    return RestrictedLeafDiagnostic('braid-program/f6c-single-leaf-restricted-diagnostic.v1',
        'restricted-reception-geometry', result, tuple(zip(GEOMETRY_COUNTERS, geometry_expected)), state_deltas)


def _prepare_response(adapter, progress, *, restricted, request, geometry_expected,
                      child_index=0, child_count=1, identity_check=None,
                      references=None, progress_local=False):
    """Shared provider arithmetic only; never evaluates or advances a GK leaf."""
    a, ref, gk = references if references is not None else (adapter.acceleration_reference, adapter.integral_reference, adapter.gk_protocol)
    domain, nodes = request.domain, request.node_neighborhoods
    state_deltas = []
    evaluated, snapshots = [], []
    for index, interval in enumerate((domain, *nodes)):
        if restricted:
            projection = adapter.project_restricted(request.frame_index, a.Bounds(interval.lower, interval.upper))
            observed = _geometry_counts(adapter)
            _require((observed[0], observed[1], observed[3]) == (4 * child_index + index + 1,) * 3
                     and observed[2] > geometry_expected[2], 'one complete restricted projection per interval')
            _require(projection.geometry_inherited_unchanged is False, 'explicit restricted geometry required')
            state_deltas.append(observed[2] - geometry_expected[2])
            geometry_expected = observed
        else:
            projection = adapter.project(request.frame_index, a.Bounds(interval.lower, interval.upper))
        if identity_check is not None:
            identity_check(projection)
        value = adapter.evaluate(projection)
        _require(value.projection is projection, 'evaluation must retain its issued projection')
        result = value.ranges
        _require(result.frame_index == request.frame_index and result.reception == projection.cell.reception
                 and (result.reception.lower, result.reception.upper) == (interval.lower, interval.upper),
                 'exact requested frame and interval required')
        _require(type(result.member_ranges) is tuple and len(result.member_ranges) == 8
                 and tuple(member.label for member in result.member_ranges) == LABELS,
                 'complete ordered member ranges required')
        evaluated.append(value)
        snapshots.append(RangeSnapshot(projection.cell, result))
        _require(_counts(adapter) == (4 * child_index + index + 1, 4 * child_index + index + 1, 8 * child_index, 0, 0),
                 'one projection and evaluation per interval; no other work')
        if restricted:
            _require(_geometry_counts(adapter) == geometry_expected, 'evaluation must not perform geometry work')
        if progress is not None:
            progress('range', index + 1 if progress_local else 4 * child_index + index + 1,
                     4 if progress_local else 4 * child_count)
            if restricted:
                _require(_counts(adapter) == (4 * child_index + index + 1, 4 * child_index + index + 1, 8 * child_index, 0, 0)
                         and _geometry_counts(adapter) == geometry_expected, 'progress must not perform numerical work')
            if identity_check is not None:
                identity_check()

    members, residuals = [], []
    for index, label in enumerate(LABELS):
        def box(value):
            return ref.Bounds(value.lower, value.upper)
        whole = box(evaluated[0].ranges.member_ranges[index].squared_norm)
        node_values = tuple(box(value.ranges.member_ranges[index].squared_norm) for value in evaluated[1:])
        polynomial = gk.polynomial_for_nodes(ref, request, label, node_values)
        residual = adapter.residual_for(evaluated[0], polynomial)
        residuals.append(residual)
        members.append(gk.MemberEvidence(label, whole, node_values, polynomial,
                                         residual.residual_partition, 'correlated'))
        _require(_counts(adapter) == (4 * (child_index + 1), 4 * (child_index + 1), 8 * child_index + index + 1, 0, 0),
                 'one correlated residual per member; no additional range/root work')
        if restricted:
            _require(_geometry_counts(adapter) == geometry_expected, 'residual must not perform geometry work')
        if progress is not None:
            progress('residual', index + 1 if progress_local else 8 * child_index + index + 1,
                     8 if progress_local else 8 * child_count)
            if restricted:
                _require(_counts(adapter) == (4 * (child_index + 1), 4 * (child_index + 1), 8 * child_index + index + 1, 0, 0)
                         and _geometry_counts(adapter) == geometry_expected, 'progress must not perform numerical work')
            if identity_check is not None:
                identity_check()

    response = gk.LeafResponse(request, tuple(members))
    if identity_check is not None:
        identity_check()
    return response, tuple(snapshots), tuple(residuals), geometry_expected, tuple(state_deltas)


def _leaf(adapter, progress, *, restricted, request, geometry_expected,
          child_index=0, child_count=1, identity_check=None):
    """Legacy local diagnostics retain their exact output/callback contract."""
    ref, gk = adapter.integral_reference, adapter.gk_protocol
    response, snapshots, residuals, geometry_expected, state_deltas = _prepare_response(
        adapter, progress, restricted=restricted, request=request, geometry_expected=geometry_expected,
        child_index=child_index, child_count=child_count, identity_check=identity_check)
    leaf = gk.evaluate_leaf(ref, response)
    _require(_counts(adapter) == (4 * (child_index + 1), 4 * (child_index + 1), 8 * (child_index + 1), 0, 0), 'fixed diagnostic call census')
    if restricted:
        _require(_geometry_counts(adapter) == geometry_expected, 'leaf must not perform geometry work')
    if progress is not None:
        progress('leaf', child_index + 1, child_count)
    _require(_counts(adapter) == (4 * (child_index + 1), 4 * (child_index + 1), 8 * (child_index + 1), 0, 0), 'progress must not perform numerical work')
    if restricted:
        _require(_geometry_counts(adapter) == geometry_expected, 'progress must not perform geometry work')
    if identity_check is not None:
        identity_check()
    result = LeafDiagnostic('braid-program/f6c-single-leaf-diagnostic.v1',
        ('conditional-first-refined-leaf-only-not-a-full-history-metric' if child_count == 1
         else 'conditional-child-interval-only-not-a-full-history-metric'), adapter.context,
        tuple(adapter.provenance), request, tuple(snapshots), tuple(residuals), leaf,
        tuple(zip(COUNTERS, (4, 4, 8, 0, 0))), ref.Claims())
    return result, geometry_expected, tuple(state_deltas)


def _q(token):
    _require(type(token) is str and 0 < len(token) <= 1152, 'bounded decimal token required')
    _require(re.fullmatch(r'[+-]?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)(?:[eE][+-]?[0-9]+)?', token) is not None,
             'literal decimal token required')
    try:
        value = Decimal(token)
    except InvalidOperation:
        raise ValueError('finite decimal token required') from None
    _require(value.is_finite() and len(value.as_tuple().digits) <= 1024
             and abs(value.as_tuple().exponent) <= 1000, 'bounded finite decimal required')
    return F(value)


def _partition_metadata(adapter):
    """Consume adapter-owned refinement flags; this driver authenticates none.

    Parent0 remains required by the legacy first-refined-parent diagnostics.
    Other exact boolean flags belong to the captured adapter generation, not
    to a second refinement-admission policy in this composition layer.
    """
    frames, parents = adapter.frames, adapter.parents
    _require(type(frames) is tuple and len(frames) == 81
             and type(parents) is tuple and len(parents) == 160, 'complete original metadata required')
    times = tuple(frame.time for frame in frames)
    values = tuple(_q(token) for token in times)
    _require(values[0] == 0 and values[-1] == F(13, 100)
             and all(a < b for a, b in zip(values, values[1:])), 'ordered original frames required')
    intervals, cursor, frame_index = [], F(0), 0
    cuts = [[] for _ in range(80)]
    for index, parent in enumerate(parents):
        _require(type(parent.index) is int and parent.index == index
                 and type(parent.refined) is bool and (index != 0 or parent.refined is True),
                 'original parent index/refined ownership required')
        lo, hi = _q(parent.reception.lower), _q(parent.reception.upper)
        while frame_index < 79 and lo >= values[frame_index + 1]:
            frame_index += 1
        _require(lo == cursor < hi and values[frame_index] <= lo < hi <= values[frame_index + 1],
                 'gap-free frame-contained parent partition required')
        intervals.append((parent.reception.lower, parent.reception.upper))
        if hi < values[frame_index + 1]:
            cuts[frame_index].append(parent.reception.upper)
        cursor = hi
    _require(cursor == F(13, 100), 'complete original parent suffix required')
    mandatory = tuple(tuple(tokens) for tokens in cuts)
    _require(all(len(cuts) <= 20 for cuts in mandatory), 'mandatory cuts exceed original-frame budget')
    return times, tuple(intervals), mandatory, tuple(parent.refined for parent in parents)


def _bisected_metadata(adapter):
    times, intervals, all_cuts, refined_flags = _partition_metadata(adapter)
    _require(_q(times[1]) == F(1, 500) and intervals[0] == ('0', '0.001'),
             'fixed first refined parent and frame required')
    mandatory = all_cuts[0]
    _require(tuple(map(_q, mandatory)) == (F(1, 1000),), 'complete first-frame mandatory cut required')
    _require(F(1, 2000) not in tuple(map(_q, mandatory)), 'midpoint must be one new shared cut')
    return times, intervals, mandatory, refined_flags


def _local_summary(ref, children):
    member_integrals, total_lo, total_hi = [], F(0), F(0)
    peak_lo, peak_hi = F(0), F(0)
    exact_width = F(0)
    for child in children:
        _require(type(child.leaf.integral_width) is F and child.leaf.integral_width >= 0,
                 'exact nonnegative leaf width required')
        exact_width += child.leaf.integral_width
    for index, label in enumerate(LABELS):
        lo = hi = F(0)
        for child in children:
            member = child.leaf.cell.members[index]
            _require(member.label == label and len(member.validated_integrals) == 1,
                     'one complete child integral per member')
            integral = member.validated_integrals[0]
            key = integral.key
            _require(key.context == child.context and key.label == label and key.frame_index == 0
                     and key.domain == child.request.domain, 'same child integral key required')
            lower, upper = _q(integral.bounds.lower), _q(integral.bounds.upper)
            _require(0 <= lower <= upper, 'nonnegative child integral required')
            lo += lower
            hi += upper
            lower, upper = _q(member.squared_norm.lower), _q(member.squared_norm.upper)
            _require(0 <= lower <= upper, 'nonnegative whole-child bound required')
            peak_lo, peak_hi = max(peak_lo, lower), max(peak_hi, upper)
        member_integrals.append(LocalMemberIntegral(label, RationalBounds(str(lo), str(hi))))
        total_lo += lo
        total_hi += hi
    for child in children:
        for witness in child.leaf.witnesses:
            _require(witness.context == child.context and witness.frame_index == 0
                     and witness.label in LABELS
                     and _q(child.request.domain.lower) <= _q(witness.time) <= _q(child.request.domain.upper),
                     'same family and closed child witness required')
            value = _q(witness.squared_lower)
            member_index = LABELS.index(witness.label)
            time = _q(witness.time)
            applicable = tuple(_q(other.leaf.cell.members[member_index].squared_norm.upper)
                               for other in children
                               if _q(other.request.domain.lower) <= time <= _q(other.request.domain.upper))
            _require(applicable and 0 <= value <= min(applicable),
                     'uniform witness must fit every applicable closed same-member cell')
            peak_lo = max(peak_lo, value)
    _require(exact_width <= total_hi - total_lo, 'serialized outward width must enclose exact leaf widths')
    return LocalSummary(tuple(member_integrals), RationalBounds(str(total_lo), str(total_hi)),
                        str(exact_width), str(total_hi - total_lo), ref.sqrt_bounds(peak_lo, peak_hi))


def measure_bisected_restricted(adapter, progress=None):
    """Two fixed children only; local reserved IDs, never a running GK State."""
    _require(progress is None or callable(progress), 'optional progress callback required')
    _require(_counts(adapter) == (0, 0, 0, 0, 0)
             and _geometry_counts(adapter) == (0, 0, 0, 0), 'fresh unmeasured geometry adapter required')
    metadata = _bisected_metadata(adapter)
    context, provenance = adapter.context, tuple(adapter.provenance)
    frames, parents = adapter.frames, adapter.parents
    parent = parents[0]
    ref, gk = adapter.integral_reference, adapter.gk_protocol
    _require(gk.MAX_SPLITS_PER_FRAME == 20, 'unchanged shared original-frame split budget required')
    def identity_check(projection=None):
        _require(adapter.context is context and tuple(adapter.provenance) == provenance
                 and adapter.frames is frames and adapter.parents is parents
                 and _bisected_metadata(adapter) == metadata, 'same captured source/frame/parent generation required')
        if projection is not None:
            cell = projection.cell
            _require(projection.context is context and cell.frame_index == 0 and cell.cell_index == parent.index
                     and projection.parent_reception == parent.reception and cell.bindings == parent.bindings
                     and (cell.frame_domain.lower, cell.frame_domain.upper) == (frames[0].time, frames[1].time),
                     'genuine first-parent projection and original frame required')
    children, deltas, geometry = [], [], (0, 0, 0, 0)
    for index, endpoints in enumerate((('0', '0.0005'), ('0.0005', '0.001'))):
        domain = ref.Bounds(*endpoints)
        req = gk.LeafRequest(context, 0, domain, len(parents) + index, (0, index),
                             gk.node_neighborhoods(ref, domain))
        child, geometry, observed = _leaf(adapter, progress, restricted=True, request=req,
            geometry_expected=geometry, child_index=index, child_count=2, identity_check=identity_check)
        children.append(child)
        deltas.extend(observed)
    children = tuple(children)
    _require(children[0].request.domain.upper == children[1].request.domain.lower
             and children[0].request.domain.lower == parent.reception.lower
             and children[1].request.domain.upper == parent.reception.upper,
             'two closed children exactly cover first parent')
    summary = _local_summary(ref, children)
    identity_check()
    _require(_counts(adapter) == (8, 8, 16, 0, 0) and _geometry_counts(adapter) == geometry,
             'fixed two-child final call census')
    cuts = len(metadata[2])
    return BisectedRestrictedDiagnostic('braid-program/f6c-bisected-restricted-diagnostic.v1',
        'conditional-first-parent-two-child-only-not-a-full-history-metric', context, provenance,
        ref.Bounds(parent.reception.lower, parent.reception.upper), children, summary,
        SplitAccounting(0, metadata[2], '0.0005', cuts, cuts + 1, 20, 20 - cuts - 1),
        'local-reserved-160-161-not-GK-State-issued-or-global-priority-executed',
        'local-per-child-4-projections-4-evaluations-8-residuals',
        tuple(zip(COUNTERS, _counts(adapter))), tuple(zip(GEOMETRY_COUNTERS, geometry)), tuple(deltas), ref.Claims())


@dataclass(frozen=True, slots=True)
class LeafProvision:
    """Conditional evidence for ONE consumed genuine outstanding request."""
    schema: str
    scope: str
    context: object
    source_provenance: tuple
    response: object
    ranges: tuple
    correlated_residuals: tuple
    call_counts: tuple
    geometry_accounting: tuple
    history_state_evaluations: tuple
    claims: object


class LeafResponseSession:
    """In-memory protocol owner, not a launcher or source-authentication token.

    Normal Python immutability is assumed, not hostile private introspection.
    provide(current_state) consumes a request before adapter work; advance
    accepts only that exact issued provision. Any failure poisons the session.
    The external caller retains the original deadline/resources and publication
    duties. No checkpoint, retry, automatic loop or budget reset is provided.
    """
    __slots__ = ('_adapter', '_ref', '_gk', '_a', '_context', '_provenance',
                 '_frames', '_parents', '_metadata', '_plan', '_state', '_phase',
                 '_provision', '_completed', '_expected_counts', '_expected_geometry')

    def __setattr__(self, *_):
        raise TypeError('read-only leaf-response session')

    def __init__(self, adapter):
        _require(_counts(adapter) == (0, 0, 0, 0, 0)
                 and _geometry_counts(adapter) == (0, 0, 0, 0), 'fresh unmeasured geometry adapter required')
        # Retain these exact proxies: frozen respond checks reference identity.
        ref, gk, a = adapter.integral_reference, adapter.gk_protocol, adapter.acceleration_reference
        metadata = _partition_metadata(adapter)
        frames = tuple(ref.Frame(n, ref.Bounds(lo, hi))
                       for n, (lo, hi) in enumerate(zip(metadata[0], metadata[0][1:])))
        _require(gk.MAX_SPLITS_PER_FRAME == 20 and gk.ROOT_REFINEMENT_LIMIT == 0
                 and gk.EMISSION_REFINEMENT_LIMIT == 0, 'unchanged frozen budget contract required')
        plan = gk.ProtocolInput(adapter.context, frames, metadata[2], gk.REFERENCE_SHA256)
        for name, value in (
            ('_adapter', adapter), ('_ref', ref), ('_gk', gk), ('_a', a),
            ('_context', adapter.context), ('_provenance', tuple(adapter.provenance)),
            ('_frames', adapter.frames), ('_parents', adapter.parents), ('_metadata', metadata),
            ('_plan', plan), ('_state', None), ('_phase', 'initializing'), ('_provision', None),
            ('_completed', 0), ('_expected_counts', (0, 0, 0, 0, 0)), ('_expected_geometry', (0, 0, 0, 0))):
            object.__setattr__(self, name, value)
        try:
            state = gk.start(ref, plan)
            self._check()
            _require(type(state) is gk.State and state.plan is plan, 'genuine initial frozen state required')
            _require(len(state.leaves) == len(adapter.parents), 'initial partition differs from original parents')
            for leaf, endpoints in zip(state.leaves, metadata[1]):
                _require((leaf.request.domain.lower, leaf.request.domain.upper) == endpoints,
                         'initial request must preserve exact parent endpoint tokens')
            object.__setattr__(self, '_state', state)
            object.__setattr__(self, '_phase', 'idle')
        except BaseException:
            object.__setattr__(self, '_phase', 'failed')
            raise

    def _generation_check(self):
        try:
            _require(self._phase != 'failed', 'failed session cannot be reused')
            adapter = self._adapter
            # These public counters also check the captured adapter deadline/lifetime.
            _counts(adapter)
            _require(adapter.context is self._context and tuple(adapter.provenance) == self._provenance
                     and adapter.frames is self._frames and adapter.parents is self._parents
                     and _partition_metadata(adapter) == self._metadata,
                     'same live captured source/frame/parent generation required')
        except BaseException:
            object.__setattr__(self, '_phase', 'failed')
            raise

    def _check(self):
        self._generation_check()
        _require(_counts(self._adapter) == self._expected_counts
                 and _geometry_counts(self._adapter) == self._expected_geometry,
                 'no intervening external numerical or geometry work')

    @property
    def state(self):
        self._generation_check()
        return self._state

    @property
    def integral_reference(self):
        self._generation_check()
        return self._ref

    @property
    def gk_protocol(self):
        self._generation_check()
        return self._gk

    @property
    def status(self):
        return self._phase

    def provide(self, state, progress=None):
        """Return LeafResponse evidence; ZERO evaluate_leaf/respond calls."""
        try:
            _require(self._phase == 'idle', 'busy or consumed request cannot be provided again')
            _require(state is self._state, 'only this session outstanding State is accepted')
            _require(progress is None or callable(progress), 'optional progress callback required')
            self._check()
            request = self._gk.request(state)
            _require(request is not None, 'no outstanding request in completed or unresolved State')
            _require(self._completed < self._gk.MAX_EVALUATED_LEAVES, 'frozen evaluation census exhausted')
            matches = tuple(parent for parent in self._parents
                            if _q(parent.reception.lower) <= _q(request.domain.lower)
                            < _q(request.domain.upper) <= _q(parent.reception.upper))
            _require(len(matches) == 1, 'one original parent required; no closed-boundary crossing')
            parent = matches[0]
            object.__setattr__(self, '_phase', 'providing')

            def identity_check(projection=None):
                _require(self._phase == 'providing' and self._state is state
                         and self._gk.request(state) is request, 'consumed outstanding request changed or reentered')
                self._generation_check()
                if projection is not None:
                    cell = projection.cell
                    frame = self._plan.frames[request.frame_index].domain
                    _require(projection.context is self._context and cell.frame_index == request.frame_index
                             and cell.cell_index == parent.index and projection.parent_reception == parent.reception
                             and cell.bindings == parent.bindings
                             and (cell.frame_domain.lower, cell.frame_domain.upper) == (frame.lower, frame.upper),
                             'issued projection must retain the requested original frame and parent')

            response, ranges, residuals, geometry, deltas = _prepare_response(
                self._adapter, progress, restricted=True, request=request,
                geometry_expected=self._expected_geometry, child_index=self._completed,
                identity_check=identity_check, references=(self._a, self._ref, self._gk), progress_local=True)
            _require(response.request is request and self._phase == 'providing',
                     'same consumed request required after provision')
            counts = (4*(self._completed+1), 4*(self._completed+1), 8*(self._completed+1), 0, 0)
            object.__setattr__(self, '_expected_counts', counts)
            object.__setattr__(self, '_expected_geometry', geometry)
            self._check()
            provision = LeafProvision('braid-program/f6c-leaf-provision.v1',
                'conditional-outstanding-request-response-not-evaluated-or-a-full-history-metric',
                self._context, self._provenance, response, ranges, residuals,
                tuple(zip(COUNTERS, counts)), tuple(zip(GEOMETRY_COUNTERS, geometry)), deltas, self._ref.Claims())
            self._check()
            _require(self._phase == 'providing', 'reentrant provision construction')
            object.__setattr__(self, '_provision', provision)
            object.__setattr__(self, '_phase', 'provided')
            return provision
        except BaseException:
            object.__setattr__(self, '_phase', 'failed')
            raise

    def advance(self, provision):
        """Explicit caller-controlled transition: frozen respond evaluates ONCE."""
        try:
            _require(self._phase == 'provided' and provision is self._provision,
                     'only the original unconsumed provision can advance')
            self._check()
            state = self._state
            _require(provision.response.request is self._gk.request(state), 'original outstanding response required')
            object.__setattr__(self, '_phase', 'advancing')
            next_state = self._gk.respond(self._ref, state, provision.response)
            self._check()
            _require(self._phase == 'advancing' and type(next_state) is self._gk.State
                     and next_state.plan is self._plan, 'genuine frozen transition required')
            object.__setattr__(self, '_state', next_state)
            object.__setattr__(self, '_completed', self._completed + 1)
            object.__setattr__(self, '_provision', None)
            object.__setattr__(self, '_phase', 'idle')
            return next_state
        except BaseException:
            object.__setattr__(self, '_phase', 'failed')
            raise
