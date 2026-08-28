"""Pure proposal and cover serialization for one declared original F6c parent.

The caller injects privately captured, unchanged production dependencies. This
module neither authenticates those sources nor reads files. Its independent
comparison is a separate instrument, never imported or called here. The nine
parent fields and complete history-token generation follow the accepted parent
comparison contract; all fifteen authority claims remain false.

Production scope is deliberately narrower than the general comparison: an
interior reception-history knot is rejected during metadata preflight, since
the unchanged cover library would split it into multiple cells. Both closed
boundary pieces and arbitrary emission-side knots remain mandatory. No merge,
new uncertainty, reception subdivision, private cache or root solver is added.

on_record(kind, immutable_record) is an optional synchronous sink. Only its
successful return acknowledges a record; this is NOT a durability assertion.
progress(queries, rows, pieces) follows acknowledgement. Failure exposes the
immutable acknowledged prefix and any unacknowledged pending record separately.
Nested calls have independent state. Caller deadlines cover all callbacks and
helpers. A complete result still requires separate independent comparison and
source-bound, watched execution before any operational acceptance.
"""
from __future__ import annotations

from dataclasses import dataclass
from decimal import Context, Decimal, ROUND_HALF_EVEN, localcontext
from fractions import Fraction
import hashlib
import json
import re
from types import MappingProxyType


PARENT_SCHEMA = 'braid-program/f6c-original-parent-refinement-input.v1'
PROOF_SHA256 = '652d77241f9b5c082e7d15e2bb62328f346760548f9f13e4ffe7562c4cad0733'
REQUIRED_SOURCES = (
    ('helper', 'af53f5af2f9dd7eda4869af2a7533f869f4e3866003c90bf9a8487b2e5636386'),
    ('history', 'ca916b4bc979629a5e25c1490da07fd78a26b4e75cfba5677f35fbab658a29e7'),
    ('intervals', 'fffc17270e149e6213315c1c82b518caa739657eb649822fd1955b8a2820e38a'),
    ('roots', 'daa4cc227cb8685de673fc400d817a19666b4fc7323e6c3a56f475a463b23acf'),
)
IDS = ('0+', '0-', '1+', '1-', '2+', '2-', '3+', '3-')
CHARGE = '0.1666666666666666666666666666666667'
OLDEST, END = Fraction(-8), Fraction(13, 100)
MAX_NODES, MAX_BYTES = 1000000, 64*1024*1024
DECIMAL = re.compile(r'-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\Z')
SHA = re.compile(r'[0-9a-f]{64}\Z')
PARENT_FIELDS = frozenset(('schema', 'parentIndex', 'frameIndex', 'frame', 'reception',
    'originalEmissions', 'oldestTime', 'historyGenerationSha256', 'originalCoverBinding'))
HISTORY_FIELDS = frozenset(('id', 'pathKey', 'polarity', 'charge', 'historyFingerprint',
    'coverageStart', 'coverageEnd', 'segments'))
SEGMENT_FIELDS = frozenset(('startTime', 'endTime', 'coefficients', 'positionErrors',
    'velocityErrors', 'positionError', 'velocityError'))
PAIR_FIELDS = frozenset(('receiverIndex', 'transmitterIndex', 'receiverId', 'transmitterId', 'emission'))
FALSE_CLAIMS = tuple((name, False) for name in ('accepted', 'referenceGenerationAuthenticated',
    'originalSourceAuthenticated', 'original1760PieceCensusAuthenticated', 'premiseTruthAuthenticated',
    'subjectMembershipEstablished', 'historicalTrajectoryIdentityEstablished', 'executionAuthorized',
    'eomExecuted', 'h3EvidenceEligible', 'metricsAvailable', 'scoreAuthorized', 'equilibriumEstablished',
    'retentionEstablished', 'physicalRealizationEstablished'))
LIBRARY_FLAGS = ('premise_truth_authenticated', 'subject_membership_established',
    'execution_authorized', 'metrics_available', 'h3_evidence_eligible')


@dataclass(frozen=True)
class ProductionReferences:
    """Explicit trusted execution premises, not source-authentication evidence."""
    helper: object
    history: object
    intervals: object
    roots: object


@dataclass(frozen=True)
class ParentProposal:
    parent: MappingProxyType
    queries: tuple
    restrictions: tuple
    rows: tuple
    pieces: tuple
    census: MappingProxyType
    claims: tuple
    build_calls: int
    query_calls: int
    cover_calls: int
    accepted: bool = False
    status: str = 'conditional_complete'


class ProposalError(ValueError):
    """Acknowledged prefix only; pending_record has NOT been acknowledged."""
    def __init__(self, message, state):
        super().__init__(message)
        self.accepted = False
        self.claims = FALSE_CLAIMS
        self.queries = tuple(state['query'])
        self.rows = tuple(state['row'])
        self.pieces = tuple(state['piece'])
        self.pending_record = state['pending']
        self.completed_queries = len(self.queries)
        self.completed_rows = len(self.rows)
        self.completed_pieces = len(self.pieces)
        self.build_calls, self.query_calls, self.cover_calls = state['calls']


def _require(ok, message):
    if not ok:
        raise ValueError(message)


def _snapshot(value, budget, path=(), depth=0):
    budget[0] += 1
    _require(budget[0] <= MAX_NODES and depth <= 12, 'input/output node or depth limit')
    if type(value) is dict:
        _require(len(value) <= 32, 'record field limit')
        result = {}
        for key, item in value.items():
            _require(type(key) is str and len(key) <= 128, 'exact bounded record key')
            budget[1] += len(key.encode('utf-8'))
            _require(budget[1] <= MAX_BYTES, 'aggregate string byte limit')
            result[key] = _snapshot(item, budget, path+(key,), depth+1)
        return MappingProxyType(result)
    if type(value) in (tuple, list):
        _require(len(value) <= 3584, 'bounded exact sequence')
        return tuple(_snapshot(v, budget, path+(i,), depth+1) for i, v in enumerate(value))
    _require(value is None or type(value) in (str, int, bool), 'inert exact built-in value required')
    if type(value) is str:
        _require(len(value) <= 1100, 'string token limit')
        budget[1] += len(value.encode('utf-8'))
        _require(budget[1] <= MAX_BYTES, 'aggregate string byte limit')
    if type(value) is int:
        limit = MAX_BYTES if path == ('parent', 'originalCoverBinding', 'bytes') else 1000000
        _require(abs(value) <= limit, 'integer limit')
    return value


def _plain(value):
    if type(value) is MappingProxyType:
        return {k: _plain(v) for k, v in value.items()}
    if type(value) is tuple:
        return [_plain(v) for v in value]
    return value


def _keys(value, names):
    _require(type(value) is MappingProxyType and set(value) == set(names), 'closed record fields')


def _integer(value, expected):
    _require(type(value) is int and value == expected, 'exact integer/order')


def _number(token):
    _require(type(token) is str and len(token) <= 1100 and DECIMAL.fullmatch(token), 'exact decimal token')
    mantissa, *exponent = re.split('[eE]', token)
    _require(sum(c.isdigit() for c in mantissa) <= 1024, 'decimal mantissa bound')
    if exponent:
        # Bound the lexical exponent before constructing an integer or Fraction.
        digits = exponent[0].lstrip('+-').lstrip('0') or '0'
        _require(len(digits) <= 4 and abs(int(exponent[0])) <= 1000, 'decimal exponent bound')
    return Fraction(token)


def _scale(value):
    d = value.denominator; counts = []
    for prime in (2, 5):
        n = 0
        while d % prime == 0:
            n += 1; d //= prime
        counts.append(n)
    _require(d == 1, 'nonterminating time')
    return max(counts)


def exact_time_token(value):
    """Exact finite midpoint serialization, never rounded to fit the contract."""
    _require(type(value) is Fraction and abs(value) <= 8, 'exact bounded Fraction time')
    places = _scale(value)
    _require(places <= 51, 'derived time exceeds 51 places')
    digits = str(abs(value.numerator)*(10**places//value.denominator)).zfill(places+1)
    token = digits if not places else digits[:-places]+'.'+digits[-places:]
    if '.' in token:
        token = token.rstrip('0').rstrip('.')
    _require(len(token.replace('.', '').lstrip('0')) <= 52, 'derived time exceeds 52 significant digits')
    return ('-' if value < 0 else '')+token


def _time(token):
    value = _number(token)
    _require(abs(value) <= 8 and _scale(value) <= 19, 'original time scale/magnitude')
    return value


def _time_box(record):
    _keys(record, ('lower', 'upper', 'precision')); _integer(record['precision'], 90)
    lo, hi = _time(record['lower']), _time(record['upper'])
    _require(lo <= hi, 'reversed original interval')
    return lo, hi


def _box_record(lo, hi):
    return dict(lower=exact_time_token(lo), upper=exact_time_token(hi), precision=90)


def _validate(histories, parent):
    _require(type(histories) is tuple and len(histories) == 8, 'eight histories')
    _keys(parent, PARENT_FIELDS)
    _require(parent['schema'] == PARENT_SCHEMA, 'parent schema')
    for field, maximum in (('parentIndex', 159), ('frameIndex', 79)):
        _require(type(parent[field]) is int and 0 <= parent[field] <= maximum, 'bounded original index')
    f0, f1 = _time_box(parent['frame']); u, v = _time_box(parent['reception'])
    _require(0 <= f0 <= u < v <= f1 <= END, 'positive reception inside original frame')
    _require(parent['oldestTime'] == '-8', 'oldest boundary is -8')
    binding = parent['originalCoverBinding']; _keys(binding, ('path', 'sha256', 'bytes'))
    _require(type(binding['path']) is str and 0 < len(binding['path']) <= 1024 and '\0' not in binding['path'], 'cover path')
    _require(type(binding['sha256']) is str and SHA.fullmatch(binding['sha256']), 'declared cover SHA')
    _require(type(binding['bytes']) is int and 1 <= binding['bytes'] <= MAX_BYTES, 'declared cover byte count')
    for i, history in enumerate(histories):
        _keys(history, HISTORY_FIELDS)
        _integer(history['pathKey'], i+1); _integer(history['polarity'], 1 if i % 2 == 0 else -1)
        _require(history['id'] == IDS[i] and history['charge'] == ('' if i % 2 == 0 else '-')+CHARGE, 'member identity/charge')
        _require(history['coverageStart'] == '-8' and history['coverageEnd'] == '0.13', 'retained history domain')
        _require(type(history['historyFingerprint']) is str and 0 < len(history['historyFingerprint']) <= 256, 'history fingerprint')
        segments = history['segments']
        _require(type(segments) is tuple and 0 < len(segments) <= 1760, 'bounded complete original history')
        cursor = OLDEST
        for segment in segments:
            _keys(segment, SEGMENT_FIELDS)
            a, b = _time(segment['startTime']), _time(segment['endTime'])
            _require(cursor == a < b <= END, 'history gap/overlap/domain')
            _require(not u < a < v and not u < b < v, 'interior reception knot exceeds single-parent production scope')
            cursor = b
            _require(type(segment['coefficients']) is tuple and len(segment['coefficients']) == 3, 'three coefficient axes')
            for axis in segment['coefficients']:
                _require(type(axis) is tuple and len(axis) == 4, 'four exact cubic coefficients')
                for token in axis:
                    _number(token)
            for axis, scalar in (('positionErrors', 'positionError'), ('velocityErrors', 'velocityError')):
                values = segment[axis]; radius = _number(segment[scalar])
                _require(type(values) is tuple and len(values) == 3 and radius >= 0, 'nonnegative scalar allowance')
                _require(all(0 <= _number(token) <= radius for token in values), 'axis allowance exceeds scalar enlargement')
        _require(cursor == END, 'missing history suffix')
    digest = hashlib.sha256(json.dumps(_plain(histories), sort_keys=True, separators=(',', ':'),
                                      ensure_ascii=True, allow_nan=False).encode('ascii')).hexdigest()
    _require(type(parent['historyGenerationSha256']) is str and SHA.fullmatch(parent['historyGenerationSha256'])
             and parent['historyGenerationSha256'] == digest, 'complete original token generation mismatch')
    pairs = parent['originalEmissions']; _require(type(pairs) is tuple and len(pairs) == 56, '56 original emissions')
    originals = {}; k = 0
    for i in range(8):
        for j in range(8):
            if i == j:
                continue
            pair = pairs[k]; _keys(pair, PAIR_FIELDS)
            _integer(pair['receiverIndex'], i); _integer(pair['transmitterIndex'], j)
            _require(pair['receiverId'] == IDS[i] and pair['transmitterId'] == IDS[j], 'original pair identity')
            a, b = _time_box(pair['emission'])
            _require(OLDEST <= a < b < u, 'original emission must precede all reception times')
            originals[i, j] = a, b; k += 1
    return (u, v), originals


def _context():
    return localcontext(Context(prec=90, rounding=ROUND_HALF_EVEN, Emin=-999999, Emax=999999))


def _interval(value, refs):
    cls = refs.intervals.DecimalInterval
    _require(type(value) is cls and type(value.precision) is int and value.precision == 90, 'same-generation 90-digit interval')
    _require(all(type(x) is Decimal and x.is_finite() and len(x.as_tuple().digits) <= 1024
                 and abs(x.as_tuple().exponent) <= 1000 for x in (value.lower, value.upper)), 'finite bounded interval endpoints')
    _require(value.lower <= value.upper, 'reversed returned interval')
    record = refs.helper.interval_record(value)
    _require(type(record) is dict and set(record) == {'lower', 'upper', 'precision'} and type(record['precision']) is int
             and record['precision'] == 90 and _number(record['lower']) == Fraction(value.lower)
             and _number(record['upper']) == Fraction(value.upper), 'interval serialization differs')
    return record


def _build(histories, refs, state):
    modules = {'certified_history': refs.history, 'decimal_interval': refs.intervals, 'continuous_reception_roots': refs.roots}
    original_records = _plain(histories)
    with _context():
        state['calls'][0] += 1
        built = refs.helper.build_histories(original_records, modules)
    _require(type(built) is tuple and len(built) == 8, 'built history census')
    for original, history in zip(histories, built):
        _require(type(history) is refs.history.PiecewisePolynomialHistory and history.history_id == original['id'], 'built history type/identity')
        _require(type(history.segments) is tuple and len(history.segments) == len(original['segments']), 'built segment census')
        for source, segment in zip(original['segments'], history.segments):
            _require(type(segment) is refs.history.CubicHistorySegment and type(segment.precision) is int and segment.precision == 90, 'built segment type/precision')
            for field, key in (('t_start', 'startTime'), ('t_end', 'endTime'), ('position_error', 'positionError'), ('velocity_error', 'velocityError')):
                _require(type(getattr(segment, field)) is Decimal and getattr(segment, field) == Decimal(source[key]), 'built original scalar/time changed')
            _require(type(segment.coefficients) is tuple and len(segment.coefficients) == 3, 'built coefficient axes')
            for actual, tokens in zip(segment.coefficients, source['coefficients']):
                _require(type(actual) is tuple and len(actual) == 4 and all(type(a) is Decimal and a == Decimal(t)
                         for a, t in zip(actual, tokens)), 'built original coefficients changed')
    return built


def _ack(kind, record, state, on_record, progress):
    frozen = _snapshot(record, state['output_budget'])
    state['pending'] = (kind, frozen)
    if on_record is not None:
        on_record(kind, frozen)
    state[kind].append(frozen)
    state['pending'] = None
    if progress is not None:
        progress(len(state['query']), len(state['row']), len(state['piece']))


def _queries(histories, reception, originals, refs, state, on_record, progress):
    box = refs.intervals.DecimalInterval; restrictions = []
    for i in range(8):
        for j in range(8):
            if i == j:
                continue
            a, b = originals[i, j]; retained = {}; proofs = {}
            for side in ('lower', 'upper'):
                lo, hi = a, b; kept = a if side == 'lower' else b; proof = None
                for ordinal in range(32):
                    index = len(state['query']); before = lo, hi; midpoint = (lo+hi)/2
                    token = exact_time_token(midpoint)
                    with _context():
                        emission_point = box.bounds(token, token, 90)
                        state['calls'][1] += 1
                        residual = refs.roots.unrestricted_residual(histories[i], histories[j], reception, emission_point)
                        record_residual = _interval(residual, refs)
                    proved = residual.upper < 0 if side == 'lower' else residual.lower > 0
                    if proved:
                        kept = midpoint; proof = index
                    if side == 'lower':
                        if proved: lo = midpoint
                        else: hi = midpoint
                        decision = 'retain-negative' if proved else 'explore-lower-half'
                    else:
                        if proved: hi = midpoint
                        else: lo = midpoint
                        decision = 'retain-positive' if proved else 'explore-upper-half'
                    _ack('query', dict(queryIndex=index, receiverIndex=i, transmitterIndex=j, receiverId=IDS[i], transmitterId=IDS[j],
                        side=side, ordinal=ordinal, exploratory=_box_record(*before), midpoint=token, residual=record_residual,
                        decision=decision, retainedFace=exact_time_token(kept)), state, on_record, progress)
                retained[side] = kept; proofs[side] = proof
            _require(a <= retained['lower'] < retained['upper'] <= b, 'crossed retained faces')
            restrictions.append(_snapshot(dict(receiverIndex=i, transmitterIndex=j, receiverId=IDS[i], transmitterId=IDS[j],
                lower=exact_time_token(retained['lower']), upper=exact_time_token(retained['upper']),
                lowerQueryIndex=proofs['lower'], upperQueryIndex=proofs['upper']), state['output_budget']))
    _require(len(state['query']) == 3584 and len(restrictions) == 56, 'incomplete proposal')
    return tuple(restrictions)


def _cover(histories, parent, reception, restrictions, refs, state, on_record, progress):
    lib = refs.roots; box = refs.intervals.DecimalInterval
    digests = tuple((h.history_id, h.digest()) for h in histories)
    emissions = {(IDS[p['receiverIndex']], IDS[p['transmitterIndex']]): box.bounds(p['lower'], p['upper'], 90) for p in restrictions}
    premises = lib.ConditionalPremises(digests, box.bounds('-8', '0.13', 90), reception,
        (Decimal('0.85'),)*8, tuple(tuple(Decimal(0) if i == j else Decimal('0.27') for j in range(8)) for i in range(8)),
        True, True, 'Caller-declared common C1 family inside original scalar envelopes and uniform guards; no source authentication.')
    with _context():
        proposals = (lib.ReceptionCellProposal(reception, emissions),)
        state['calls'][2] += 1
        cover = lib.enclose_root_cover(histories, premises, proposals)
    _require(type(cover) is lib.ConditionalRootCover and cover.hypotheses is premises and type(cover.expected_rows) is int
             and cover.expected_rows == 64 and cover.reception_cells == (reception,), 'single original parent cover identity')
    _require(type(cover.rows) is tuple and len(cover.rows) <= 64, 'bounded final row prefix')
    flags = refs.helper.flags(cover)
    _require(type(flags) is dict and set(flags) == set(LIBRARY_FLAGS) and all(v is False for v in flags.values()), 'library authority flags')
    for index, row in enumerate(cover.rows):
        i, j = divmod(index, 8)
        _require(type(row) is lib.ConditionalRootRow and (row.receiver_id, row.transmitter_id, row.reception) == (IDS[i], IDS[j], reception), 'final ordered row identity')
        _interval(row.reception, refs)
        record = dict(rowIndex=index, cellIndex=parent['parentIndex'], receiverIndex=i, transmitterIndex=j, receiverId=IDS[i], transmitterId=IDS[j],
            reception=_plain(parent['reception']), ordinaryRootsPerReception=row.ordinary_roots_per_reception,
            coincidentEndpointExcluded=row.coincident_endpoint_excluded, rootFreeComplementConditional=row.root_free_complement_conditional,
            retainedBoundaryContact=row.retained_boundary_contact, libraryFlags=dict(flags))
        for name in ('emission', 'oldestResidual', 'lowerFaceResidual', 'upperFaceResidual', 'displacement', 'distance',
                     'transmitterFactor', 'receiverFactor', 'receiverPieceRecord', 'transmitterPieceRecord'):
            record[name] = None
        _integer(row.ordinary_roots_per_reception, 0 if i == j else 1)
        _require(row.root_free_complement_conditional is True and row.retained_boundary_contact is False, 'root complement/boundary')
        if i == j:
            _require(row.coincident_endpoint_excluded is True and row.receiver_pieces == row.transmitter_pieces == (), 'self exclusion/pieces')
            _require(all(getattr(row, k) is None for k in ('emission', 'oldest_residual', 'lower_face_residual', 'upper_face_residual',
                         'displacement', 'distance', 'transmitter_factor', 'receiver_factor')), 'fabricated self geometry')
        else:
            expected = emissions[IDS[i], IDS[j]]
            _require(row.coincident_endpoint_excluded is False and row.emission == expected, 'ordinary final emission')
            _interval(row.emission, refs)
            record['emission'] = _box_record(Fraction(expected.lower), Fraction(expected.upper))
            for name, attribute in (('oldestResidual', 'oldest_residual'), ('lowerFaceResidual', 'lower_face_residual'),
                                    ('upperFaceResidual', 'upper_face_residual'), ('distance', 'distance'),
                                    ('transmitterFactor', 'transmitter_factor'), ('receiverFactor', 'receiver_factor')):
                record[name] = _interval(getattr(row, attribute), refs)
            _require(row.oldest_residual.upper < 0 and row.lower_face_residual.upper < 0 < row.upper_face_residual.lower, 'unresolved strict faces')
            _require(row.distance.lower > 0 and row.transmitter_factor.lower >= Decimal('1e-24') and row.receiver_factor.lower > 0, 'distance/factor safety')
            _require(type(row.displacement) is tuple and len(row.displacement) == 3, 'displacement dimension')
            record['displacement'] = [_interval(x, refs) for x in row.displacement]
            for role, member, parts, requested in (('receiver', i, row.receiver_pieces, row.reception), ('transmitter', j, row.transmitter_pieces, row.emission)):
                _require(type(parts) is tuple and 0 < len(parts) <= 1760, 'bounded original closed pieces')
                pointer = len(state['piece']); record[role+'PieceRecord'] = pointer
                piece = refs.helper.compact_pieces(parts, record_index=pointer, row_index=index, role=role, member=IDS[member], digest=digests[member][1], requested=requested)
                expected_requested = _plain(parent['reception']) if role == 'receiver' else dict(record['emission'])
                _require(type(piece) is dict and set(piece) == {'recordIndex', 'rowIndex', 'role', 'memberId', 'historyDigest',
                    'requestedInterval', 'touchedPieceCount', 'firstIndex', 'lastIndex', 'contiguousIndexRange', 'clippedPiecesSha256'}, 'closed piece serialization')
                for name, value in (('recordIndex', pointer), ('rowIndex', index), ('touchedPieceCount', len(parts)),
                                    ('firstIndex', parts[0][0]), ('lastIndex', parts[-1][0])):
                    _integer(piece[name], value)
                _require(piece['role'] == role and piece['memberId'] == IDS[member] and piece['historyDigest'] == digests[member][1]
                         and type(piece['clippedPiecesSha256']) is str and SHA.fullmatch(piece['clippedPiecesSha256']), 'piece identity/digest')
                _require(type(piece['contiguousIndexRange']) is list and len(piece['contiguousIndexRange']) == 2, 'piece index range')
                for actual, expected_index in zip(piece['contiguousIndexRange'], (parts[0][0], parts[-1][0])):
                    _integer(actual, expected_index)
                _require(type(piece.get('requestedInterval')) is dict and set(piece['requestedInterval']) == {'lower', 'upper', 'precision'} and
                         _number(piece['requestedInterval']['lower']) == Fraction(requested.lower) and
                         _number(piece['requestedInterval']['upper']) == Fraction(requested.upper), 'piece requested interval differs')
                _integer(piece['requestedInterval']['precision'], 90)
                piece['requestedInterval'] = expected_requested
                _ack('piece', piece, state, on_record, progress)
        _ack('row', record, state, on_record, progress)
    _require(cover.status == 'conditional_complete' and cover.failure_code == cover.failure_detail == ''
             and len(state['row']) == 64 and len(state['piece']) == 112, 'final cover unresolved/incomplete')


def propose_parent_refinement(histories, parent, references, *, on_record=None, progress=None):
    """Return a conditional proposal, or an immutable acknowledged error prefix."""
    state = dict(query=[], row=[], piece=[], pending=None, calls=[0, 0, 0], output_budget=[0, 0])
    try:
        budget = [0, 0]
        histories = _snapshot(histories, budget, ('histories',))
        parent = _snapshot(parent, budget, ('parent',))
        reception_values, originals = _validate(histories, parent)
        _require(type(references) is ProductionReferences, 'explicit production reference bundle')
        refs = references
        _require(on_record is None or callable(on_record), 'record callback must be callable')
        _require(progress is None or callable(progress), 'progress callback must be callable')
        for owner, names in ((refs.helper, ('build_histories', 'interval_record', 'flags', 'compact_pieces')),
                             (refs.roots, ('unrestricted_residual', 'enclose_root_cover', 'ConditionalPremises', 'ReceptionCellProposal'))):
            _require(all(callable(getattr(owner, name, None)) for name in names), 'required captured production API')
        # Isolate callback changes from the caller as well as from each helper.
        with localcontext():
            if progress is not None:
                progress(0, 0, 0)
            built = _build(histories, refs, state)
            with _context():
                reception = refs.intervals.DecimalInterval.bounds(parent['reception']['lower'], parent['reception']['upper'], 90)
            _require((Fraction(reception.lower), Fraction(reception.upper)) == reception_values, 'reception construction differs')
            restrictions = _queries(built, reception, originals, refs, state, on_record, progress)
            _cover(built, parent, reception, restrictions, refs, state, on_record, progress)
        census = MappingProxyType(dict(cells=1, members=8, queries=3584, pairRows=64, ordinaryPairs=56, selfZeros=8, pieceRecords=112))
        return ParentProposal(parent, tuple(state['query']), restrictions, tuple(state['row']), tuple(state['piece']), census,
                              FALSE_CLAIMS, *state['calls'])
    except Exception as error:
        raise ProposalError(str(error), state) from error
