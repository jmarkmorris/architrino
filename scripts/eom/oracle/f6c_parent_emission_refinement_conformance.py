"""Pure independent whole-face replay for one explicitly identified original parent.

Only the unchanged 19c57 exact Bernstein reference is injected. Injection and
the parent/source hashes are declared premises, not authentication. No files,
proposer, root library, histories selected from disk, or execution are owned
here. The caller separately authenticates the original160-parent/frame mapping,
exact1760 pieces/member, coherent family and guards, captured dependency and
bounded successful execution. All fifteen authority flags stay false.

The exact input contract and conditional proof are in PROOF_REQUIRED_SHA256.
Parent indices are original; query/row/piece indices are LOCAL to this call.
Original time lexemes are retained. Their finite normalized scale is <=19;
derived midpoint/face tokens are canonical fixed point with <=51 places and
<=52 significant digits. Positive causal emission endpoints are permitted.

All inert inputs are bounded and deeply copied before helpers/callbacks. No
global cache or lock exists: nested comparisons have independent snapshots and
prefix counts. The injected reference is a trusted execution premise, not a
Python introspection sandbox. Caller deadlines also cover synchronous helpers
and callbacks. A failed prefix is never a positive partial comparison.
"""
from __future__ import annotations

from dataclasses import dataclass
from fractions import Fraction
import hashlib
import json
import re
from types import MappingProxyType

REQUIRED_REFERENCE_SHA = 'e0e063ce268cfd54e8a9ce618fb7da3caca0a9756000d7602ed9ae2abc6b0fd9'
PROOF_REQUIRED_SHA256 = '652d77241f9b5c082e7d15e2bb62328f346760548f9f13e4ffe7562c4cad0733'
PARENT_SCHEMA = 'braid-program/f6c-original-parent-refinement-input.v1'
IDS = ('0+', '0-', '1+', '1-', '2+', '2-', '3+', '3-')
A, END = Fraction(-8), Fraction(13, 100)
CHARGE = '0.1666666666666666666666666666666667'
MAX_VALUE_NODES = 1000000
MAX_STRING_BYTES = 64 * 1024 * 1024
HEX = re.compile(r'[0-9a-f]{64}\Z')
PARENT_FIELDS = frozenset(('schema', 'parentIndex', 'frameIndex', 'frame', 'reception',
    'originalEmissions', 'oldestTime', 'historyGenerationSha256', 'originalCoverBinding'))
EMISSION_FIELDS = frozenset(('receiverIndex', 'transmitterIndex', 'receiverId', 'transmitterId', 'emission'))
HISTORY_FIELDS = frozenset(('id', 'pathKey', 'polarity', 'charge', 'historyFingerprint', 'coverageStart', 'coverageEnd', 'segments'))
SEGMENT_FIELDS = frozenset(('startTime', 'endTime', 'coefficients', 'positionErrors', 'velocityErrors', 'positionError', 'velocityError'))
QUERY_FIELDS = frozenset(('queryIndex', 'receiverIndex', 'transmitterIndex', 'receiverId', 'transmitterId',
    'side', 'ordinal', 'exploratory', 'midpoint', 'residual', 'decision', 'retainedFace'))
FALSE_CLAIMS = tuple((name, False) for name in ('accepted', 'referenceGenerationAuthenticated', 'originalSourceAuthenticated',
    'original1760PieceCensusAuthenticated', 'premiseTruthAuthenticated', 'subjectMembershipEstablished',
    'historicalTrajectoryIdentityEstablished', 'executionAuthorized', 'eomExecuted', 'h3EvidenceEligible',
    'metricsAvailable', 'scoreAuthorized', 'equilibriumEstablished', 'retentionEstablished', 'physicalRealizationEstablished'))
HELPERS = ('number', 'interval', 'sub', 'squared_norm', 'le_sqrt', 'sqrt_le', 'state_box', 'check_face',
    'check_distance', 'check_factor', 'check_piece', 'original_history_digest', 'contains', 'false_flags')


class ConformanceError(ValueError):
    def __init__(self, message, completed_queries=0, completed_rows=0):
        super().__init__(message)
        self.completed_queries = completed_queries
        self.completed_rows = completed_rows
        self.accepted = False


@dataclass(frozen=True)
class PairRestriction:
    receiver_index: int
    transmitter_index: int
    lower: Fraction
    upper: Fraction
    lower_query_index: int | None
    upper_query_index: int | None


@dataclass(frozen=True)
class ParentRefinementComparison:
    accepted: bool
    parent: MappingProxyType
    conditional_query_replay_conformant: bool
    conditional_final_cover_conformant: bool
    query_count: int
    pair_count: int
    row_count: int
    ordinary_nonself_rows: int
    self_exclusion_rows: int
    piece_record_count: int
    final_strict_face_checks: int
    oldest_boundary_checks: int
    geometry_piece_visits: int
    restrictions: tuple[PairRestriction, ...]
    claims: tuple[tuple[str, bool], ...]
    reference_required_sha256: str = REQUIRED_REFERENCE_SHA
    proof_required_sha256: str = PROOF_REQUIRED_SHA256


def _require(value, message):
    if not value:
        raise ValueError(message)


def _sequence(value, count=None, maximum=None):
    _require(type(value) in (list, tuple), 'bounded exact list/tuple required')
    _require((count is None or len(value) == count) and
             (maximum is None or 0 < len(value) <= maximum), 'bounded container census differs')


def _integer(value, expected):
    _require(type(value) is int and value == expected, 'exact integer/order differs')


def _closed(value, names):
    _require(type(value) is MappingProxyType and set(value) == set(names), 'closed record fields differ')


def _freeze(value, budget, depth=0, location=()):
    """Aggregate limits apply jointly to parent, histories and all three streams."""
    budget[0] += 1
    _require(budget[0] <= MAX_VALUE_NODES and depth <= 12, 'aggregate node/depth bound')
    if type(value) is dict:
        _require(len(value) <= 32, 'record field bound')
        result = {}
        for key, item in value.items():
            _require(type(key) is str and len(key) <= 128, 'record key bound')
            budget[1] += len(key.encode('utf-8'))
            _require(budget[1] <= MAX_STRING_BYTES, 'aggregate string payload bound')
            result[key] = _freeze(item, budget, depth+1, location+(key,))
        return MappingProxyType(result)
    if type(value) in (list, tuple):
        _require(len(value) <= 3584, 'record array bound')
        return tuple(_freeze(item, budget, depth+1, location+(index,)) for index, item in enumerate(value))
    _require(value is None or type(value) in (str, int, bool), 'inert exact JSON leaf required')
    if type(value) is str:
        _require(len(value) <= 1100, 'record token bound')
        budget[1] += len(value.encode('utf-8'))
        _require(budget[1] <= MAX_STRING_BYTES, 'aggregate string payload bound')
    if type(value) is int:
        maximum = 64*1024*1024 if location == ('parent', 'originalCoverBinding', 'bytes') else 1000000
        _require(abs(value) <= maximum, 'record integer bound')
    return value


def _plain(value):
    if type(value) is MappingProxyType:
        return {key: _plain(item) for key, item in value.items()}
    if type(value) is tuple:
        return [_plain(item) for item in value]
    return value


def _places(value):
    denominator = value.denominator
    twos = fives = 0
    while denominator % 2 == 0:
        denominator //= 2; twos += 1
    while denominator % 5 == 0:
        denominator //= 5; fives += 1
    _require(denominator == 1, 'nonterminating time operand')
    return max(twos, fives)


def _original_time(reference, token):
    value = reference.number(token)
    _require(abs(value) <= 8 and _places(value) <= 19, 'original time scale/magnitude bound')
    return value


def _original_box(reference, value):
    _closed(value, ('lower', 'upper', 'precision'))
    _integer(value['precision'], 90)
    lo, hi = (_original_time(reference, value[key]) for key in ('lower', 'upper'))
    _require(lo <= hi, 'reversed original interval')
    return lo, hi


def exact_time_token(value):
    """Canonical exact finite time; fixedpoint, no rounding or binary floats."""
    _require(type(value) is Fraction and abs(value) <= 8, 'bounded exact Fraction time required')
    places = _places(value)
    _require(places <= 51, 'derived time scale exceeds halving bound')
    scaled = abs(value.numerator) * (10**places // value.denominator)
    whole, tail = divmod(scaled, 10**places)
    token = ('-' if value < 0 else '') + str(whole)
    if tail:
        token += '.' + str(tail).zfill(places).rstrip('0')
    significant = token.lstrip('-').replace('.', '').lstrip('0')
    _require(len(significant) <= 52, 'derived time significant-digit bound')
    return token


def _exact_box(bounds):
    return {'lower': exact_time_token(bounds[0]), 'upper': exact_time_token(bounds[1]), 'precision': 90}


def _histories(reference, histories):
    _sequence(histories, 8)
    for i, history in enumerate(histories):
        _closed(history, HISTORY_FIELDS)
        _integer(history['pathKey'], i+1); _integer(history['polarity'], 1 if i % 2 == 0 else -1)
        _require(history['id'] == IDS[i], 'original member identity differs')
        _require(history['charge'] == ('' if i % 2 == 0 else '-')+CHARGE, 'original signed charge differs')
        _require(history['coverageStart'] == '-8' and history['coverageEnd'] == '0.13', 'fixed retained domain required')
        _require(type(history['historyFingerprint']) is str and 0 < len(history['historyFingerprint']) <= 256,
                 'original fingerprint required')
        _sequence(history['segments'], maximum=1760)
        cursor = A
        for segment in history['segments']:
            _closed(segment, SEGMENT_FIELDS)
            lo, hi = (_original_time(reference, segment[key]) for key in ('startTime', 'endTime'))
            _require(lo == cursor < hi <= END, 'history gap/overlap/domain differs'); cursor = hi
            _sequence(segment['coefficients'], 3)
            for axis in segment['coefficients']:
                _sequence(axis, 4)
                for token in axis:
                    reference.number(token)
            for axis, scalar in (('positionErrors', 'positionError'), ('velocityErrors', 'velocityError')):
                _sequence(segment[axis], 3)
                radius = reference.number(segment[scalar])
                _require(all(0 <= reference.number(token) <= radius for token in segment[axis]),
                         'scalar radius must cover all original axis allowances')
        _require(cursor == END, 'history suffix missing')
    return hashlib.sha256(json.dumps(_plain(histories), sort_keys=True, separators=(',', ':'),
                                    ensure_ascii=True, allow_nan=False).encode('ascii')).hexdigest()


def _parent(reference, parent, generation):
    _closed(parent, PARENT_FIELDS)
    _require(parent['schema'] == PARENT_SCHEMA, 'original parent schema differs')
    for key, upper in (('parentIndex', 159), ('frameIndex', 79)):
        _require(type(parent[key]) is int and 0 <= parent[key] <= upper, 'bounded original index required')
    frame = _original_box(reference, parent['frame']); reception = _original_box(reference, parent['reception'])
    _require(0 <= frame[0] <= reception[0] < reception[1] <= frame[1] <= END, 'positive reception inside original frame required')
    _require(parent['oldestTime'] == '-8', 'oldest boundary must remain -8')
    _require(type(parent['historyGenerationSha256']) is str and HEX.fullmatch(parent['historyGenerationSha256']) and
             parent['historyGenerationSha256'] == generation, 'complete original history generation differs')
    binding = parent['originalCoverBinding']; _closed(binding, ('path', 'sha256', 'bytes'))
    _require(type(binding['path']) is str and 0 < len(binding['path']) <= 1024 and '\0' not in binding['path'], 'bounded cover path required')
    _require(type(binding['sha256']) is str and HEX.fullmatch(binding['sha256']), 'cover SHA256 required')
    _require(type(binding['bytes']) is int and 1 <= binding['bytes'] <= 64*1024*1024, 'bounded cover byte count required')
    _sequence(parent['originalEmissions'], 56)
    intervals = {}; index = 0
    for i in range(8):
        for j in range(8):
            if i == j:
                continue
            record = parent['originalEmissions'][index]; _closed(record, EMISSION_FIELDS)
            _integer(record['receiverIndex'], i); _integer(record['transmitterIndex'], j)
            _require(record['receiverId'] == IDS[i] and record['transmitterId'] == IDS[j], 'original emission pair ownership differs')
            lo, hi = _original_box(reference, record['emission'])
            _require(A <= lo < hi < reception[0], 'original emission must strictly precede reception')
            intervals[i, j] = lo, hi; index += 1
    return reception, intervals


def _query_interval(reference, receiver, transmitter, reception, midpoint, reported):
    """Contain the whole unrestricted face, including an indecisive query."""
    source = reference.state_box(transmitter, (midpoint, midpoint))
    displacement = tuple(reference.sub(x, y) for x, y in zip(receiver['position'], source['position']))
    qlo, qhi = reference.squared_norm(displacement)
    lo, hi = reference.interval(_plain(reported))
    _require(reference.le_sqrt(lo+reception[1]-midpoint, qlo) and
             reference.sqrt_le(qhi, hi+reception[0]-midpoint), 'query misses independent whole-face Bernstein enclosure')
    return lo, hi


def _replay(reference, histories, reception, originals, queries, state, progress):
    receivers = tuple(reference.state_box(history, reception) for history in histories)
    restrictions = []
    for i in range(8):
        for j in range(8):
            if i == j:
                continue
            a, b = originals[i, j]; retained = {}; proofs = {}
            for side in ('lower', 'upper'):
                lo, hi = a, b; face = a if side == 'lower' else b; proof = None
                for ordinal in range(32):
                    index = state['queries']; query = queries[index]; _closed(query, QUERY_FIELDS)
                    for key, expected in (('queryIndex', index), ('receiverIndex', i), ('transmitterIndex', j), ('ordinal', ordinal)):
                        _integer(query[key], expected)
                    _require(query['receiverId'] == IDS[i] and query['transmitterId'] == IDS[j] and query['side'] == side,
                             'query ownership/search order differs')
                    _require(reference.interval(_plain(query['exploratory'])) == (lo, hi), 'exploratory search state differs')
                    midpoint = (lo+hi)/2
                    _require(query['midpoint'] == exact_time_token(midpoint), 'exact canonical midpoint differs')
                    gl, gh = _query_interval(reference, receivers[i], histories[j], reception, midpoint, query['residual'])
                    if side == 'lower':
                        if gh < 0:
                            face = lo = midpoint; proof = index; decision = 'retain-negative'
                        else:
                            hi = midpoint; decision = 'explore-lower-half'
                    else:
                        if gl > 0:
                            face = hi = midpoint; proof = index; decision = 'retain-positive'
                        else:
                            lo = midpoint; decision = 'explore-upper-half'
                    _require(query['decision'] == decision and query['retainedFace'] == exact_time_token(face),
                             'branch or certified face differs')
                    state['queries'] += 1
                    if progress:
                        progress(state['queries'], state['rows'])
                retained[side] = face; proofs[side] = proof
            _require(a <= retained['lower'] < retained['upper'] <= b, 'crossed or invalid final certified interval')
            restrictions.append(PairRestriction(i, j, retained['lower'], retained['upper'], proofs['lower'], proofs['upper']))
    return tuple(restrictions), receivers


def _final_cover(reference, histories, parent, reception, rows, pieces, restrictions, receivers, state, progress):
    by_pair = {(pair.receiver_index, pair.transmitter_index): pair for pair in restrictions}
    piece_index = visits = 0
    digests = tuple(reference.original_history_digest(history) for history in histories)
    oldest = tuple(reference.state_box(history, (A, A)) for history in histories)
    for n, frozen in enumerate(rows):
        _closed(frozen, reference.ROW_KEYS); row = _plain(frozen); i, j = divmod(n, 8)
        for key, expected in (('rowIndex', n), ('cellIndex', parent['parentIndex']), ('receiverIndex', i), ('transmitterIndex', j)):
            _integer(row[key], expected)
        _require(row['receiverId'] == IDS[i] and row['transmitterId'] == IDS[j], 'final pair identity differs')
        _require(row['reception'] == _plain(parent['reception']), 'original reception token identity differs')
        # Equality must not let bool/float precision fields masquerade as90.
        _require(reference.interval(row['reception']) == reception, 'final reception interval differs')
        reference.false_flags(row['libraryFlags'])
        _require(row['rootFreeComplementConditional'] is True and row['retainedBoundaryContact'] is False, 'final complement/boundary differs')
        if i == j:
            _integer(row['ordinaryRootsPerReception'], 0)
            _require(row['coincidentEndpointExcluded'] is True, 'self endpoint exclusion absent')
            _require(all(row[key] is None for key in ('emission', 'oldestResidual', 'lowerFaceResidual', 'upperFaceResidual', 'displacement',
                'distance', 'transmitterFactor', 'receiverFactor', 'receiverPieceRecord', 'transmitterPieceRecord')), 'fabricated self geometry or pieces')
        else:
            _integer(row['ordinaryRootsPerReception'], 1)
            _require(row['coincidentEndpointExcluded'] is False, 'ordinary pair exclusion differs')
            restriction = by_pair[i, j]; emission = restriction.lower, restriction.upper
            _require(row['emission'] == _exact_box(emission) and reference.interval(row['emission']) == emission,
                     'final emission not exact replay-derived canonical interval')
            receiver = receivers[i]
            for name, t, sign in (('oldestResidual', A, 'negative'), ('lowerFaceResidual', emission[0], 'negative'),
                                  ('upperFaceResidual', emission[1], 'positive')):
                source = oldest[j] if t == A else reference.state_box(histories[j], (t, t))
                displacement = tuple(reference.sub(x, y) for x, y in zip(receiver['position'], source['position']))
                reference.check_face(row[name], displacement, (reception[0]-t, reception[1]-t), sign)
            transmitter = reference.state_box(histories[j], emission)
            displacement = tuple(reference.sub(x, y) for x, y in zip(receiver['position'], transmitter['position']))
            _sequence(row['displacement'], 3)
            _require(all(reference.contains(reference.interval(actual), expected) for actual, expected in zip(row['displacement'], displacement)),
                     'final displacement misses original-piece enclosure')
            distance = reference.check_distance(row['distance'], displacement, (reception[0]-emission[1], reception[1]-emission[0]))
            reference.check_factor(row['transmitterFactor'], displacement, distance, transmitter['velocity'], transmitter=True)
            reference.check_factor(row['receiverFactor'], displacement, distance, receiver['velocity'])
            for role, member, requested, enclosure in (('receiver', i, reception, receiver), ('transmitter', j, emission, transmitter)):
                _integer(row[role+'PieceRecord'], piece_index)
                record = _plain(pieces[piece_index])
                expected_box = _plain(parent['reception']) if role == 'receiver' else _exact_box(emission)
                _require(record['requestedInterval'] == expected_box, 'piece interval token identity differs')
                reference.check_piece(record, piece_index, n, role, histories[member], digests[member], requested, enclosure)
                piece_index += 1; visits += enclosure['touchedPieceCount']
        state['rows'] += 1
        if progress:
            progress(state['queries'], state['rows'])
    _require(piece_index == 112, 'final piece census incomplete')
    return visits


def compare_parent_refinement(reference, histories, parent, queries, rows, pieces, *, progress=None):
    """Compare one complete original parent; all indices/lineage remain premises."""
    state = {'queries': 0, 'rows': 0}
    try:
        _require(all(callable(getattr(reference, name, None)) for name in HELPERS), 'required frozen reference dependency absent')
        _require(progress is None or callable(progress), 'progress callback invalid')
        _sequence(histories, 8); _sequence(queries, 3584); _sequence(rows, 64); _sequence(pieces, 112)
        budget = [0, 0]
        histories, parent, queries, rows, pieces = tuple(_freeze(value, budget, location=(name,)) for name, value in
            zip(('histories', 'parent', 'queries', 'rows', 'pieces'), (histories, parent, queries, rows, pieces)))
        generation = _histories(reference, histories)
        reception, originals = _parent(reference, parent, generation)
        if progress:
            progress(0, 0)
        restrictions, receivers = _replay(reference, histories, reception, originals, queries, state, progress)
        _require(state['queries'] == 3584 and len(restrictions) == 56, 'complete query census required')
        visits = _final_cover(reference, histories, parent, reception, rows, pieces, restrictions, receivers, state, progress)
        _require(state['rows'] == 64, 'complete final row census required')
        return ParentRefinementComparison(False, parent, True, True, 3584, 56, 64, 56, 8, 112, 112, 56, visits, restrictions, FALSE_CLAIMS)
    except Exception as error:
        raise ConformanceError(str(error), state['queries'], state['rows']) from error
