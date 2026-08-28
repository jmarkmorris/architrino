"""Frozen-reference candidate: one-reception, strength-independent response.

Contract: SegmentTokens -> MemberTokens and NativeRoot -> NativePairSelection
are deeply immutable, explicit source projections. ResponseInput fixes their
ordered census and premise hashes. evaluate_response returns a frozen result;
to_record() returns a fresh JSON-compatible description with accepted=False.
This module reads no files, imports no EOM/producer, searches no roots, selects
no strength and publishes nothing. Completeness and analytic membership are
EXTERNAL premises authenticated by a separately authored data consumer.

NativePairSelection is NOT a Python RootCompletenessCertificate. Its original
packet row index and original history IDs/FNV survive separately from the
mapped exact-decimal history SHA. Native 53-bit tokens are decoded to exact
dyadics by integer arithmetic before directed 90-digit interval conversion.

The complete consumer output schema is declared in OUTER_FIELDS below. All
fields are mandatory, additional fields rejected by its future consumer. The
outer bindings are original-byte {role,path,sha256,bytes}; roles, in order, are
every INPUT_PINS role, then predeclaration,reference,referenceTests,consumer,
consumerTests,pythonExecutable, then the literal paths in FROZEN_IMPORTS and
FORMULA_OWNERS. The path is a captured original regular-file path; sha256 is
64 lowercase hex digits and bytes is its exact nonnegative integer size.
Reference/tests/consumer/executable hashes are independently reviewed supplied
pins, never inferred from an untrusted result. Subject is exactly
{scope,campaignId,runId,receptionTime,quantity,fieldSpeed,symbolicStrength}, with
values f5-release, f5-enclosed-root-restart-20260826-v1, prepared-20260827-v1,
"0", "G_i", "1", and "K=kappa*q0^2". Execution is exactly
{startedAt,elapsedSeconds,exitCode,processesClosed,heartbeatSeconds,
maximumSampledGroupRssBytes,rssSampleIntervalSeconds,outputBytes,logBytes,
watcherSha256,publicationComplete}. accepted can become true ONLY in that
future captured consumer after external provenance and timed publication
checks. Its referenceResult remains the unchanged conditional record.
On rejection accepted is false, status is rejected, failures is a nonempty
array of {code,detail} strings; referenceResult is null or a complete unchanged
conditional record kept solely as diagnostic observations. On success failures
is empty, newRootSearches=0, all FALSE_CLAIMS remain false, status is the first
OUTER_STATUS value, execution has exitCode=0, processesClosed=true,
publicationComplete=true and meets LIMITS through final process completion.
No private/interrupted candidate is admissible; the external watcher must
authenticate fresh successful process completion and intended final bytes.
Execution times/RSS counters are finite nonnegative JSON numbers (counts and
bytes integers); startedAt is UTC ISO-8601 text, watcherSha256 a reviewed hash.
These are obligations of the SEPARATE future consumer, not this pure library.

RECORD_SHAPES closes every reference record object. Scientific endpoints,
exact integer numerators/denominators and source values are strings; indices,
precisions/census are integers; flags are booleans. Reference root contributions
and self exclusions are in receiver-major/transmitter-major order; responses
and members in member order. Every vector has three components. No abbreviated
row substitutes for original certificate/root-free-cell byte authentication.

No actual F5 calculation is part of this reference's synthetic test batch.
"""
from __future__ import annotations

from dataclasses import dataclass, fields
from decimal import Decimal, ROUND_CEILING, ROUND_FLOOR, localcontext
from fractions import Fraction
import json
import re

from .certified_history import CubicHistorySegment, PiecewisePolynomialHistory
from .continuous_reception_roots import history_state_over
from .decimal_interval import DecimalInterval, interval_dot, interval_norm

PRECISION = 90
MAX_SEGMENTS = 1032
MAX_MEMBERS = 12
NATIVE_SCHEMA = 'eom_native_exact_pair_certificate/v1'
REFERENCE_SCHEMA = 'braid-program/prescribed-acceleration-response-reference.v1'
OUTER_SCHEMA = 'braid-program/prescribed-acceleration-response.v1'
PREDECLARATION_SHA = 'c08d7f53616fc2843b3a192f7e3c10229f9a9fe7abc1a8670ddb1706d95756ef'
INPUT_PINS = (
    ('rootPacket', 'a430d035d41ad32c89224f1a068c0a2a7947b9e44849f76280e1aa43a86b9052'),
    ('rootLedger', '37b934854075b500239a733df1b5e70a7ff355f0e56bbdc382adad952288a3a5'),
    ('historyManifest', '5c665fcd7eee92a105fd958929ee443e4eeaea6afc0222935739aad2622a1725'),
    ('nominalConformance', 'f862a7148a0a00b3bde5fbb0d164156fce2dbfc161597b0cdaa182457f3741e0'),
    ('apiConformance', '440deb996eaeb646b7863e9276fb937f9897c11fdbd56fed11a32efb269fe746'),
    ('reviewedBuild', '5c8a9c36804b8bfed45b7f98834c0c104e758465ca0d19402bf0c328d81f9710'),
    ('approvedSource', 'e92e450c8ea83086b60184d31ff5b07fe8a470b1e20088ea312592f2b38800fb'),
    ('scientificFixture', 'bda39fe695e8b446ac91aee96a9f867c7f48b8228f2c9f6ac547c8172e0da344'),
)
FROZEN_IMPORTS = (
    ('scripts/eom/oracle/decimal_interval.py', 'fffc17270e149e6213315c1c82b518caa739657eb649822fd1955b8a2820e38a'),
    ('scripts/eom/oracle/certified_history.py', 'ca916b4bc979629a5e25c1490da07fd78a26b4e75cfba5677f35fbab658a29e7'),
    ('scripts/eom/oracle/continuous_reception_roots.py', 'f38657eedb585f6066bf233cef05508ef4d4336146dbf1e44501dfa9b669e04c'),
)
FORMULA_OWNERS = (
    ('scripts/eom/oracle/reference_kernel.py', 'a3b94301b2994c29e1107de44d627db9566abe9cda60ec8e00b89d9351a275f6'),
    ('scripts/eom/oracle/certified_acceleration.py', '62787f1bb0d14329c0ad1f3586ef1f1cbeb666fe8c11f8831f7ad761d7c42b83'),
)
FALSE_CLAIMS = ('physicalStrengthChosen', 'eomExecuted', 'evolutionAuthorized',
                'braidMetricsComputed', 'scoreAuthorized', 'retentionEstablished',
                'h3EvidenceEligible', 'premiseTruthAuthenticated',
                'analyticTrajectoryIdentityEstablished')
OUTER_FIELDS = ('schema', 'accepted', 'status', 'subject', 'bindings',
                'referenceResult', 'execution', 'claims', 'newRootSearches', 'failures')
OUTER_STATUS = ('accepted-prescribed-response-enclosure', 'rejected')
SUBJECT_FIELDS = ('scope', 'campaignId', 'runId', 'receptionTime', 'quantity', 'fieldSpeed', 'symbolicStrength')
BINDING_FIELDS = ('role', 'path', 'sha256', 'bytes')
EXECUTION_FIELDS = ('startedAt', 'elapsedSeconds', 'exitCode', 'processesClosed',
                    'heartbeatSeconds', 'maximumSampledGroupRssBytes',
                    'rssSampleIntervalSeconds', 'outputBytes', 'logBytes',
                    'watcherSha256', 'publicationComplete')
LIMITS = (('wallSeconds', 1800), ('heartbeatSeconds', 15),
          ('sampledGroupRssBytes', 2*1024**3), ('rssSampleIntervalSeconds', 1),
          ('jsonBytes', 64*1024**2), ('totalScientificJsonBytes', 256*1024**2),
          ('outputBytes', 8*1024**2), ('logBytes', 16*1024**2))
RECORD_SHAPES = (
    ('reference', ('schema', 'accepted', 'authority', 'scope', 'campaignId', 'runId',
        'receptionTime', 'searchedInterval', 'sourceHashes', 'interpretations',
        'decimalPrecision', 'nativePrecisionBits', 'arithmeticComplete', 'hypotheses',
        'census', 'members', 'contributions', 'selfExclusions', 'responses', 'claims',
        'newRootSearches', 'failures')),
    ('interval', ('lower', 'upper', 'widthNumerator', 'widthDenominator')),
    ('binaryEndpoint', ('originalToken', 'bits', 'numerator', 'denominator')),
    ('sourceHash', ('role', 'sha256')),
    ('census', ('members', 'segments', 'orderedPairs', 'ordinaryRoots', 'selfExclusions')),
    ('member', ('index', 'constituentId', 'worldlineId', 'polarity', 'originalHistoryId',
        'originalHistoryFingerprint', 'mappedDecimalHistorySha256', 'segmentCount',
        'receptionPosition', 'receptionVelocity')),
    ('piece', ('index', 'domain')),
    ('contribution', ('packetRowIndex', 'rowId', 'receiverIndex', 'transmitterIndex',
        'rootIndex', 'polarityProduct', 'emissionEndpoints', 'emissionInterval',
        'nativeTransmitterFactorEndpoints', 'nativeReceiverFactorEndpoints',
        'nativeSegmentIndices', 'receiverPieces', 'transmitterPieces',
        'transmitterPosition', 'transmitterVelocity', 'displacement',
        'distanceEvaluated', 'causalDelay', 'distance', 'transmitterFactorEvaluated',
        'receiverFactorEvaluated', 'transmitterFactor', 'receiverFactor', 'response')),
    ('selfExclusion', ('packetRowIndex', 'rowId', 'receiverIndex', 'transmitterIndex',
        'coincidentEndpointExcluded', 'ordinaryRootCount')),
    ('response', ('memberIndex', 'worldlineId', 'components')),
)
F5_IDS = tuple(f'f5-axis-{axis}-ring-{ring}-{polarity}-worldline'
               for polarity in ('positive', 'negative')
               for axis in (1, 2, 3) for ring in (1, 2))
DECIMAL_TOKEN = re.compile(r'-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE]([+-]?[0-9]+))?\Z')
HEX = re.compile(r'[0-9a-f]{16}\Z')
HASH = re.compile(r'[0-9a-f]{64}\Z')
FNV = re.compile(r'fnv1a64-chain-v1:[0-9a-f]{16}\Z')
SIGN = 1 << 63
MAX_WORD = 0x7fefffffffffffff


class ResponseUnresolved(ValueError):
    def __init__(self, code, detail):
        super().__init__(detail)
        self.code, self.detail = code, detail


def require(condition, code, detail):
    if not condition:
        raise ResponseUnresolved(code, detail)


def token(value):
    require(type(value) is str and 0 < len(value) <= 512,
            'decimal_token', 'bounded exact decimal string required')
    match = DECIMAL_TOKEN.fullmatch(value)
    require(match is not None, 'decimal_token', 'invalid exact decimal token')
    exponent = match.group(1)
    require(exponent is None or (len(exponent) <= 5 and abs(int(exponent)) <= 1000),
            'decimal_token', 'decimal exponent outside bound')
    result = Decimal(value)
    require(result.is_finite(), 'decimal_token', 'nonfinite decimal token')
    return result


def identity(value):
    require(type(value) is str and 0 < len(value) <= 512 and value.isascii()
            and all(32 <= ord(c) < 127 for c in value),
            'identity', 'bounded printable original identity required')


def exact_tuple(value, size=None):
    require(type(value) is tuple and (size is None or len(value) == size),
            'immutable_input', 'exact immutable tuple and census required')


def strict_record(value, cls):
    require(type(value) is cls, 'immutable_input', 'exact '+cls.__name__+' required')
    for field in fields(cls):
        expected = {'str': str, 'int': int, 'bool': bool}.get(field.type, tuple)
        require(type(getattr(value, field.name)) is expected, 'immutable_input',
                cls.__name__+'.'+field.name+' has a mutable/subclass/wrong type')


def bits_value(bits):
    require(type(bits) is str and HEX.fullmatch(bits), 'binary64', '16 lowercase hex digits required')
    word = int(bits, 16)
    exponent, fraction = (word >> 52) & 2047, word & ((1 << 52)-1)
    require(exponent != 2047, 'binary64', 'nonfinite binary64 word')
    if exponent == 0:
        value = Fraction(fraction, 1 << 1074)
    else:
        power = exponent-1075
        value = Fraction((1 << 52)+fraction)*(Fraction(2)**power)
    return -value if word & SIGN else value


def binary64_bits(decimal_token):
    """Nearest finite binary64 by exact ordered-word bisection; ties even.

    No host float/parser or production conversion is used. Reject beyond the
    greatest finite magnitude (a conservative domain limit, not an overflow
    emulation). Both lexical signed zeros retain their exact bit identity.
    """
    value = Fraction(token(decimal_token))
    negative = value < 0 or (value == 0 and decimal_token.startswith('-'))
    magnitude = abs(value)
    require(magnitude <= bits_value(f'{MAX_WORD:016x}'), 'binary64', 'magnitude beyond finite binary64 domain')
    lo, hi = 0, MAX_WORD
    while lo < hi:
        middle = (lo+hi+1)//2
        if bits_value(f'{middle:016x}') <= magnitude:
            lo = middle
        else:
            hi = middle-1
    word = lo
    lower = bits_value(f'{word:016x}')
    if lower != magnitude and word < MAX_WORD:
        upper = bits_value(f'{word+1:016x}')
        if upper-magnitude < magnitude-lower or (upper-magnitude == magnitude-lower and word & 1):
            word += 1
    return f'{word | (SIGN if negative else 0):016x}'


def rational_interval(value):
    """Outward conversion of an exact rational, unaffected by ambient precision."""
    require(type(value) is Fraction, 'rational', 'exact Fraction required')
    with localcontext() as ctx:
        ctx.prec = PRECISION
        ctx.rounding = ROUND_FLOOR
        lower = Decimal(value.numerator)/Decimal(value.denominator)
        ctx.rounding = ROUND_CEILING
        upper = Decimal(value.numerator)/Decimal(value.denominator)
    return DecimalInterval(lower, upper, PRECISION)


@dataclass(frozen=True, slots=True)
class BinaryEndpoint:
    original_token: str
    bits: str
    exact_value: Fraction

    def to_record(self):
        return {'originalToken': self.original_token, 'bits': self.bits,
                'numerator': str(self.exact_value.numerator),
                'denominator': str(self.exact_value.denominator)}


def lift_endpoint(value):
    word = binary64_bits(value)
    return BinaryEndpoint(value, word, bits_value(word))


def lifted_interval(lower, upper):
    lo, hi = lift_endpoint(lower), lift_endpoint(upper)
    require(lo.exact_value <= hi.exact_value, 'interval_order', 'inverted native interval')
    a, b = rational_interval(lo.exact_value), rational_interval(hi.exact_value)
    return DecimalInterval(a.lower, b.upper, PRECISION), (lo, hi)


def interval_record(box):
    require(type(box) is DecimalInterval and type(box.precision) is int
            and box.precision == PRECISION and type(box.lower) is Decimal
            and type(box.upper) is Decimal and box.lower.is_finite()
            and box.upper.is_finite() and box.lower <= box.upper,
            'precision', 'finite exact 90-digit interval required')
    width = Fraction(box.upper)-Fraction(box.lower)
    return {'lower': str(box.lower), 'upper': str(box.upper),
            'widthNumerator': str(width.numerator), 'widthDenominator': str(width.denominator)}


def intersection(left, right, label):
    lo, hi = max(left.lower, right.lower), min(left.upper, right.upper)
    require(lo <= hi, 'empty_intersection', label+' enclosures disagree')
    return DecimalInterval(lo, hi, PRECISION)


@dataclass(frozen=True, slots=True)
class SegmentTokens:
    index: int
    t_start: str
    t_end: str
    coefficients: tuple[tuple[str, ...], ...]
    position_errors: tuple[str, ...]
    velocity_errors: tuple[str, ...]


@dataclass(frozen=True, slots=True)
class MemberTokens:
    index: int
    constituent_id: str
    worldline_id: str
    polarity: int
    history_id: str
    history_fingerprint: str
    segments: tuple[SegmentTokens, ...]


@dataclass(frozen=True, slots=True)
class NativeRoot:
    lower: str
    upper: str
    transmitter_factor_lower: str
    transmitter_factor_upper: str
    receiver_factor_lower: str
    receiver_factor_upper: str
    transmitter_factor_sign: int
    transmitter_segment_indices: tuple[int, ...]
    precision_route: str
    precision_bits: int


@dataclass(frozen=True, slots=True)
class NativePairSelection:
    """Consumer-owned projection, never independent root-completeness evidence."""
    packet_row_index: int
    row_id: str
    receiver_index: int
    transmitter_index: int
    receiver_history_id: str
    transmitter_history_id: str
    receiver_history_fingerprint: str
    transmitter_history_fingerprint: str
    reception_time: str
    searched_lower: str
    searched_upper: str
    field_speed: str
    root_tolerance: str
    certificate_schema: str
    status: str
    failure_code: str
    root_free_complement: bool
    memory_boundary_contact: bool
    coincident_endpoint_excluded: bool
    has_difficult_cell: bool
    difficult_cells: int
    achieved_precision_bits: int
    roots: tuple[NativeRoot, ...]


@dataclass(frozen=True, slots=True)
class ResponseInput:
    scope: str  # f5-release or synthetic-control; both remain conditional here
    campaign_id: str
    run_id: str
    reception_time: str
    search_lower: str
    decimal_precision: int
    source_hashes: tuple[tuple[str, str], ...]
    interpretations: tuple[str, ...]
    members: tuple[MemberTokens, ...]
    pairs: tuple[NativePairSelection, ...]  # exact receiver-major/transmitter-major


def fnv_fingerprint(segments):
    pieces = ['eom_history_segment_chain/v1']
    for segment in segments:
        pieces.extend((segment.t_start, segment.t_end))
        pieces.extend(v for row in segment.coefficients for v in row)
        pieces.extend(segment.position_errors)
        pieces.extend(segment.velocity_errors)
    state = 0xcbf29ce484222325
    for value in pieces:
        encoded = value.encode('utf-8')
        for byte in str(len(encoded)).encode('ascii')+b':'+encoded:
            state = ((state ^ byte)*0x100000001b3) & 0xffffffffffffffff
    return f'fnv1a64-chain-v1:{state:016x}'


def map_member(member, expected_index, f5):
    strict_record(member, MemberTokens)
    require(type(member.index) is int and member.index == expected_index, 'census', 'member order differs')
    for value in (member.constituent_id, member.worldline_id, member.history_id):
        identity(value)
    require(type(member.polarity) is int and member.polarity in (-1, 1), 'polarity', 'fixed polarity sign required')
    require(type(member.history_fingerprint) is str and FNV.fullmatch(member.history_fingerprint), 'fingerprint', 'native FNV fingerprint required')
    exact_tuple(member.segments)
    require(1 <= len(member.segments) <= MAX_SEGMENTS, 'census', 'bounded segment census required')
    if f5:
        require(member.worldline_id == F5_IDS[expected_index]
                and member.constituent_id == member.worldline_id.replace('-worldline', '-architrino')
                and member.history_id == 'f5-enclosed-root/v1/'+member.worldline_id,
                'identity', 'original F5 identity required; no restricted history alias')
        require(member.polarity == (1 if expected_index < 6 else -1)
                and len(member.segments) == 1032, 'census', 'F5 polarity/segment census differs')
    mapped, cursor = [], None
    for j, segment in enumerate(member.segments):
        strict_record(segment, SegmentTokens)
        require(type(segment) is SegmentTokens and type(segment.index) is int and segment.index == j,
                'immutable_input', 'exact indexed SegmentTokens required')
        a, b = token(segment.t_start), token(segment.t_end)
        require(a < b and (cursor is None or a == cursor), 'history_coverage', 'segment gap, overlap or nonpositive width')
        exact_tuple(segment.coefficients, 3)
        for row in segment.coefficients:
            exact_tuple(row, 4)
        coefficients = tuple(tuple(token(v) for v in row) for row in segment.coefficients)
        errors = []
        for original in (segment.position_errors, segment.velocity_errors):
            exact_tuple(original, 3)
            parsed = tuple(token(v) for v in original)
            require(all(v >= 0 for v in parsed) and parsed[0] == parsed[1] == parsed[2],
                    'error_allowance', 'unchanged equal-axis nonnegative allowances required')
            errors.append(parsed[0])
        if f5:
            require(segment.position_errors == ('1.528724905003159e-10',)*3
                    and segment.velocity_errors == ('2.866983034112353e-7',)*3,
                    'error_allowance', 'original F5 allowance tokens changed')
            require(Fraction(b)-Fraction(a) <= Fraction('0.02'), 'history_coverage', 'F5 maximum step changed')
        mapped.append(CubicHistorySegment(a, b, coefficients, errors[0], errors[1], PRECISION))
        cursor = b
    require(fnv_fingerprint(member.segments) == member.history_fingerprint,
            'fingerprint', 'original exact token chain does not match native fingerprint')
    if f5:
        require(member.segments[0].t_start == '-1' and member.segments[-1].t_end == '19.63359163663986',
                'history_coverage', 'original full F5 domain required')
    # Local envelope compatibility is necessary, NOT a proof of one global path.
    try:
        return PiecewisePolynomialHistory.from_segments(tuple(mapped), history_id=member.history_id)
    except ValueError as exc:
        raise ResponseUnresolved('history_compatibility', str(exc)) from exc


def validate_input(request):
    strict_record(request, ResponseInput)
    require(type(request.scope) is str and request.scope in ('f5-release', 'synthetic-control'), 'scope', 'bounded declared scope required')
    require(type(request.decimal_precision) is int and request.decimal_precision == PRECISION,
            'precision', 'fixed 90-digit precision required')
    for value in (request.campaign_id, request.run_id):
        identity(value)
    reception, lower = token(request.reception_time), token(request.search_lower)
    require(request.reception_time == '0' and lower < reception, 'scope', 'only reception token 0 supported')
    exact_tuple(request.source_hashes)
    require(len(request.source_hashes) <= 16, 'census', 'bounded source identity census')
    roles = set()
    for pair in request.source_hashes:
        exact_tuple(pair, 2)
        identity(pair[0])
        require(pair[0] not in roles and type(pair[1]) is str and HASH.fullmatch(pair[1]), 'source_binding', 'duplicate/invalid source hash')
        roles.add(pair[0])
    exact_tuple(request.interpretations)
    require(all(type(x) is str for x in request.interpretations)
            and request.interpretations == (('source-decimal', 'frozen-binary64') if request.scope == 'f5-release' else ('synthetic-exact',)),
            'source_binding', 'declared analytic interpretations differ')
    exact_tuple(request.members)
    count = len(request.members)
    require(2 <= count <= MAX_MEMBERS, 'census', 'bounded complete member census required')
    f5 = request.scope == 'f5-release'
    if f5:
        require(count == 12 and request.campaign_id == 'f5-enclosed-root-restart-20260826-v1'
                and request.run_id == 'prepared-20260827-v1' and request.search_lower == '-1'
                and request.source_hashes == INPUT_PINS, 'source_binding', 'fixed F5 generation/premise hashes required')
    mapped = tuple(map_member(m, i, f5) for i, m in enumerate(request.members))
    for attribute in ('constituent_id', 'worldline_id', 'history_id'):
        require(len({getattr(m, attribute) for m in request.members}) == count, 'identity', 'duplicate '+attribute)
    require(all(h.t_start <= lower < reception <= h.t_end for h in mapped), 'history_coverage', 'searched/reception domain not covered')
    exact_tuple(request.pairs, count*count)
    row_ids, packet_indices = set(), set()
    for index, pair in enumerate(request.pairs):
        strict_record(pair, NativePairSelection)
        rx, tx = divmod(index, count)
        require(type(pair.receiver_index) is int and type(pair.transmitter_index) is int
                and (pair.receiver_index, pair.transmitter_index) == (rx, tx), 'census', 'receiver-major complete ordered pairs required')
        identity(pair.row_id)
        require(pair.row_id not in row_ids and type(pair.packet_row_index) is int
                and 0 <= pair.packet_row_index < (1152 if f5 else count*count)
                and pair.packet_row_index not in packet_indices, 'census', 'duplicate/invalid original packet row identity')
        row_ids.add(pair.row_id); packet_indices.add(pair.packet_row_index)
        for role, member in (('receiver', request.members[rx]), ('transmitter', request.members[tx])):
            require(getattr(pair, role+'_history_id') == member.history_id
                    and getattr(pair, role+'_history_fingerprint') == member.history_fingerprint,
                    'fingerprint', 'native certificate history mapping differs')
        require(pair.reception_time == request.reception_time and pair.searched_upper == request.reception_time
                and pair.searched_lower == request.search_lower and pair.field_speed == '1'
                and pair.root_tolerance == '1e-8' and pair.certificate_schema == NATIVE_SCHEMA,
                'native_contract', 'native certificate domain/schema/controls differ')
        require(pair.status == 'certified_complete' and pair.failure_code == ''
                and pair.root_free_complement is True and pair.memory_boundary_contact is False
                and pair.has_difficult_cell is False and type(pair.difficult_cells) is int and pair.difficult_cells == 0
                and type(pair.achieved_precision_bits) is int and pair.achieved_precision_bits == 53,
                'native_contract', 'complete positive-delay native evidence required')
        exact_tuple(pair.roots)
        require(pair.coincident_endpoint_excluded is (rx == tx)
                and len(pair.roots) == (0 if rx == tx else 1),
                'census', 'declared one-nonself/empty-self root census differs')
        for root in pair.roots:
            strict_record(root, NativeRoot)
            require(type(root.precision_bits) is int and root.precision_bits == 53
                    and root.precision_route == 'binary64_outward'
                    and type(root.transmitter_factor_sign) is int and root.transmitter_factor_sign == 1,
                    'precision', 'only positive binary64-outward native roots admitted')
            exact_tuple(root.transmitter_segment_indices)
            require(0 < len(root.transmitter_segment_indices) <= len(mapped[tx].segments)
                    and all(type(j) is int and 0 <= j < len(mapped[tx].segments) for j in root.transmitter_segment_indices)
                    and tuple(sorted(set(root.transmitter_segment_indices))) == root.transmitter_segment_indices,
                    'segment_indices', 'ordered unique source segment indices required')
            emission, exact_ends = lifted_interval(root.lower, root.upper)
            a, b = (end.exact_value for end in exact_ends)
            require(Fraction(lower) < a <= b < Fraction(reception)
                    and b-a <= Fraction('1e-8'), 'root_domain', 'ordinary bracket boundary/delay/width differs')
            # Native indices use parsed binary64 boundaries. Their union must
            # contain the complete root box, without changing its endpoints.
            cursor = a
            for j in root.transmitter_segment_indices:
                segment = request.members[tx].segments[j]
                left = lift_endpoint(segment.t_start).exact_value
                right = lift_endpoint(segment.t_end).exact_value
                require(left <= right and right >= a and left <= b,
                        'segment_indices', 'listed source piece misses root box')
                require(left <= cursor, 'segment_indices', 'native piece coverage gap')
                cursor = max(cursor, right)
            require(cursor >= b, 'segment_indices', 'native indices do not cover root box')
    return mapped


@dataclass(frozen=True, slots=True)
class ResponseResult:
    """Canonical immutable JSON bytes; fresh descriptions cannot mutate proof."""
    record_json: str

    def to_record(self):
        return json.loads(self.record_json)


def _root_response(receiver_position, receiver_velocity, source_position,
                   source_velocity, emission, root):
    """Pure kernel unit; inputs assume the declared root/analytic premises.

    It does not certify those premises. Complete production census remains the
    obligation of evaluate_response plus the future external authenticator.
    """
    strict_record(root, NativeRoot)
    for vector in (receiver_position, receiver_velocity, source_position, source_velocity):
        exact_tuple(vector, 3)
        for component in vector:
            interval_record(component)
    interval_record(emission)
    require(root.precision_route == 'binary64_outward' and root.precision_bits == 53
            and root.transmitter_factor_sign == 1, 'precision', 'positive native 53-bit root required')
    original_emission, root_ends = lifted_interval(root.lower, root.upper)
    require(emission == original_emission and emission.upper < 0,
            'root_domain', 'complete original positive-delay bracket required')
    displacement = tuple(a-b for a, b in zip(receiver_position, source_position))
    distance_evaluated = interval_norm(displacement)
    delay = DecimalInterval.point('0', PRECISION)-emission
    distance = intersection(distance_evaluated, delay, 'root distance/delay')
    require(distance.lower > 0, 'denominator', 'strictly positive root distance required')
    direction = tuple(x/distance for x in displacement)
    one = DecimalInterval.point('1', PRECISION)
    dt_evaluated = one-interval_dot(direction, source_velocity)
    dr_evaluated = one-interval_dot(direction, receiver_velocity)
    dt_native, dt_ends = lifted_interval(root.transmitter_factor_lower, root.transmitter_factor_upper)
    dr_native, dr_ends = lifted_interval(root.receiver_factor_lower, root.receiver_factor_upper)
    require(dt_native.lower > 0 and dr_native.lower > 0,
            'denominator', 'native factor intervals must already be strictly positive')
    dt = intersection(dt_evaluated, dt_native, 'transmitter factor')
    dr = intersection(dr_evaluated, dr_native, 'receiver factor')
    require(dt.lower > 0 and dr.lower > 0, 'denominator', 'positive subject factor margins required')
    radial = distance.square()*distance
    value = tuple((x/radial)/dt.absolute() for x in displacement)
    return (value, displacement, distance_evaluated, delay, distance,
            dt_evaluated, dr_evaluated, dt, dr, root_ends, dt_ends, dr_ends)


def evaluate_response(request):
    mapped = validate_input(request)
    zero = DecimalInterval.point('0', PRECISION)
    reception = DecimalInterval.point(request.reception_time, PRECISION)
    states = tuple(history_state_over(h, reception) for h in mapped)
    totals = [[zero, zero, zero] for _ in mapped]
    contributions, excluded = [], []
    member_records = []
    for m, h, state in zip(request.members, mapped, states):
        member_records.append({'index': m.index, 'constituentId': m.constituent_id,
                               'worldlineId': m.worldline_id, 'polarity': m.polarity,
                               'originalHistoryId': m.history_id,
                               'originalHistoryFingerprint': m.history_fingerprint,
                               'mappedDecimalHistorySha256': h.digest(),
                               'segmentCount': len(m.segments),
                               'receptionPosition': [interval_record(x) for x in state.position],
                               'receptionVelocity': [interval_record(x) for x in state.velocity]})
    for pair in request.pairs:
        rx, tx = pair.receiver_index, pair.transmitter_index
        provenance = {'packetRowIndex': pair.packet_row_index, 'rowId': pair.row_id,
                      'receiverIndex': rx, 'transmitterIndex': tx}
        if rx == tx:
            excluded.append({**provenance, 'coincidentEndpointExcluded': True, 'ordinaryRootCount': 0})
            continue
        root = pair.roots[0]
        emission, root_ends = lifted_interval(root.lower, root.upper)
        try:
            source = history_state_over(mapped[tx], emission)
        except ValueError as exc:
            raise ResponseUnresolved('history_coverage', str(exc)) from exc
        receiver = states[rx]
        (unsigned, displacement, distance_evaluated, delay, distance,
         dt_evaluated, dr_evaluated, dt, dr, root_ends, dt_ends, dr_ends) = _root_response(
            receiver.position, receiver.velocity, source.position, source.velocity, emission, root)
        sign = request.members[rx].polarity*request.members[tx].polarity
        value = tuple(DecimalInterval.point(str(sign), PRECISION)*x for x in unsigned)
        totals[rx] = [a+b for a, b in zip(totals[rx], value)]
        def pieces(state):
            return [{'index': i, 'domain': interval_record(domain)} for i, domain in state.pieces]
        contributions.append({**provenance, 'rootIndex': 0, 'polarityProduct': sign,
            'emissionEndpoints': [x.to_record() for x in root_ends],
            'emissionInterval': interval_record(emission),
            'nativeTransmitterFactorEndpoints': [x.to_record() for x in dt_ends],
            'nativeReceiverFactorEndpoints': [x.to_record() for x in dr_ends],
            'nativeSegmentIndices': list(root.transmitter_segment_indices),
            'receiverPieces': pieces(receiver), 'transmitterPieces': pieces(source),
            'transmitterPosition': [interval_record(x) for x in source.position],
            'transmitterVelocity': [interval_record(x) for x in source.velocity],
            'displacement': [interval_record(x) for x in displacement],
            'distanceEvaluated': interval_record(distance_evaluated),
            'causalDelay': interval_record(delay), 'distance': interval_record(distance),
            'transmitterFactorEvaluated': interval_record(dt_evaluated),
            'receiverFactorEvaluated': interval_record(dr_evaluated),
            'transmitterFactor': interval_record(dt), 'receiverFactor': interval_record(dr),
            'response': [interval_record(x) for x in value]})
    record = {'schema': REFERENCE_SCHEMA, 'accepted': False,
        'authority': 'conditional-response-enclosure; original-byte and premise authentication required',
        'scope': request.scope, 'campaignId': request.campaign_id, 'runId': request.run_id,
        'receptionTime': request.reception_time, 'searchedInterval': [request.search_lower, request.reception_time],
        'sourceHashes': [{'role': role, 'sha256': digest} for role, digest in request.source_hashes],
        'interpretations': list(request.interpretations), 'decimalPrecision': PRECISION,
        'nativePrecisionBits': 53, 'arithmeticComplete': True,
        'hypotheses': ['native complete-root selections authenticated against original packet and accepted ledger',
                       'each declared analytic interpretation is one smooth path inside the original nominal and API enclosures',
                       'reviewed native build and finite IEEE nearest-rounding/gradual-underflow premises apply'],
        'census': {'members': len(mapped), 'segments': sum(len(h.segments) for h in mapped),
                   'orderedPairs': len(request.pairs), 'ordinaryRoots': len(contributions), 'selfExclusions': len(excluded)},
        'members': member_records, 'contributions': contributions, 'selfExclusions': excluded,
        'responses': [{'memberIndex': i, 'worldlineId': request.members[i].worldline_id,
                       'components': [interval_record(x) for x in row]} for i, row in enumerate(totals)],
        'claims': {key: False for key in FALSE_CLAIMS}, 'newRootSearches': 0, 'failures': []}
    encoded = json.dumps(record, sort_keys=True, separators=(',', ':'), allow_nan=False)
    require(len(encoded.encode('utf-8')) <= 8*1024**2, 'resource_limit', 'response exceeds output bound')
    return ResponseResult(encoded)
