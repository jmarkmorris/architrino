#!/usr/bin/env python3
"""Independent, strength-free F5 history-carrier conformance reference.

This checker precedes its producer. It imports neither producer nor EOM code.
Only PREFIX_SHA/RESTRICTION_SHA bytes may support production acceptance. The
already accepted restriction and BOTH inherited analytic interpretations are
premises, not rederived here. No strength, charge magnitude, request, root or
future trajectory is chosen. Source/build/executable hashes must be supplied
independently by the caller; byte agreement does NOT authenticate their build
origin or successful producer execution. Those remain separate review duties.

Closed producer schema HANDOFF_SCHEMA (all keys required, no additional keys):
  schema, status='data-only-history-handoff', prefixSha256,
  restrictionReceiptSha256, sourceOwners=SOURCE_OWNERS,
  producerBindings={source,buildReceipt,executable}, each {path,sha256,bytes},
  runtimePremises=RUNTIME_PREMISES, normalizedFieldSpeed='1',
  retainedInterval=['-1','0'], releaseTime='0', claims=FALSE_CLAIMS, members.
Each of the 12 ordered members has index,constituentId,worldlineId,polarity,
originalHistory (unchanged provenance), restrictedHistoryId=HISTORY_PREFIX+
worldlineId, historyFingerprint (NEW restricted FNV chain), segments, release.
Each of 51 segments has exactly the original six fields index,tStart,tEnd,
coefficients[3][4],positionErrors[3],velocityErrors[3], plus parsedBinary64.
parsedBinary64 has tStart,tEnd,coefficients[3][4],positionErrors[3],
velocityErrors[3], containing lowercase 16-digit IEEE-754 binary64 hex words.
No origin shift or token normalization is allowed. Decimal tokens remain strings.
release={nominalPosition[3],nominalDerivative[3],rawFinalPiece,endpointState};
the first two arrays hold reduced {numerator,denominator} integer strings;
the latter objects have position[3],velocity[3] boxes {lowerBits,upperBits}.
endpointState MUST be the actual RetainedHistory::endpoint_state_hull output,
including the preceding-join position intersection, not a nominal midpoint.

Reference arithmetic: exact Fractions, explicit IEEE decoding, ties-to-even
rounding, next-representable outward endpoints, and independently specified
length-prefixed FNV-1a chain. Every returned release bit is reconstructed.
Zero release-box endpoints are explicitly unresolved: Fraction retains their
value but not the IEEE sign, so this bounded reference rejects either zero.
The shared analytic endpoint enclosure in the accepted restriction receipt
covers source-decimal AND frozen-binary64 constants. It must fit both raw and
correlated release boxes for each interpretation. Failure of this sufficient
inclusion is NOT proof of analytic escape: obtain a separately checked tighter
endpoint bound, never enlarge an allowance or substitute a nominal state.

CLI: --prefix FILE --restriction-receipt FILE --handoff FILE --handoff-sha256 H
 --producer-source FILE --producer-source-sha256 H --build-receipt FILE
 --build-receipt-sha256 H --executable FILE --executable-sha256 H
 --verifier-sha256 H --out NEW. Source owners are fixed below and rechecked.
Fresh completion hash, finite elapsed <=1800 and exit 0 are mandatory for
receipt admission; private, interrupted or late publication has no authority.
"""
from __future__ import annotations

import argparse
from contextlib import ExitStack
from decimal import Decimal
from fractions import Fraction as F
from hashlib import sha256
import json
import os
from pathlib import Path
import re
import signal
import stat
import sys
import tempfile
import time

_EXECUTING_CODE = sys._getframe().f_code
PREFIX_SHA = '8d14aa3bc5e0788f06c8b79e788a55df82e8db83736e2413c9800a78af63111b'
RESTRICTION_SHA = '5a2e9158bf26c34a7a9755e53ea1337cc006765727d9afe1ef1304c3fcd140b0'
FULL_SHA = '5c665fcd7eee92a105fd958929ee443e4eeaea6afc0222935739aad2622a1725'
NOMINAL_SHA = 'f862a7148a0a00b3bde5fbb0d164156fce2dbfc161597b0cdaa182457f3741e0'
API_SHA = '440deb996eaeb646b7863e9276fb937f9897c11fdbd56fed11a32efb269fe746'
SOURCE_OWNERS = {
    'src/eom/src/History.cpp': 'cd732843db488de66798953278d1e3b15151163c826b9d5b93eed98363a8b4c5',
    'src/eom/src/Interval.cpp': '5da66e8473f78439dbb075857918af85b7789b2749e5046c83d9b58d944023a5',
    'src/eom/include/architrino/eom/Decimal.hpp': '8126e685d9be5a2d4935d29eaa12d1aa995822781c198d48d809c0f0b6ddad7f',
    'src/eom/include/architrino/eom/History.hpp': '0e326f15c70a0b0dc5786b1c14a2f2378324754c28cc597b92d82c0c1da3c8f3',
    'src/eom/src/CoupledEvolution.cpp': '88935fa4410f626d25200597a2fb5ba1ad4cb7a8c68324cf452affd4643c9194',
}
HANDOFF_SCHEMA = 'braid-program/f5-prehistory-handoff.v1'
REPORT_SCHEMA = 'braid-program/f5-prehistory-handoff-conformance.v1'
HISTORY_PREFIX = 'f5-prehistory/v1/'
MODES = ['source-decimal', 'frozen-binary64']
RUNTIME_PREMISES = ['IEEE-754 binary64 round-to-nearest ties-to-even',
                    'gradual underflow; finite operations; no contraction or fast-math',
                    'decimal parsing agrees with exact nearest binary64']
FALSE_CLAIMS = {name: False for name in (
    'couplingChosen', 'chargeMagnitudeChosen', 'futureSupplied', 'requestValidated',
    'rootsEvaluated', 'eomExecuted', 'evolutionAuthorized', 'metricsComputed',
    'scoreAuthorized', 'h3EvidenceEligible', 'analyticTrajectoryIdentityEstablished')}
SEGMENT_KEYS = {'index', 'tStart', 'tEnd', 'coefficients', 'positionErrors', 'velocityErrors'}
PARSED_KEYS = SEGMENT_KEYS - {'index'}
TOP_KEYS = {'schema', 'status', 'prefixSha256', 'restrictionReceiptSha256', 'sourceOwners',
            'producerBindings', 'runtimePremises', 'normalizedFieldSpeed', 'retainedInterval',
            'releaseTime', 'claims', 'members'}
MEMBER_KEYS = {'index', 'constituentId', 'worldlineId', 'polarity', 'originalHistory',
               'restrictedHistoryId', 'historyFingerprint', 'segments', 'release'}
WORLDLINES = tuple(f'f5-axis-{axis}-ring-{ring}-{polarity}-worldline'
                  for polarity in ('positive', 'negative') for axis in (1, 2, 3) for ring in (1, 2))
TOKEN = re.compile(r'-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE]([+-]?[0-9]+))?\Z')
HEX = re.compile(r'[0-9a-f]{16}\Z')
HASH = re.compile(r'[0-9a-f]{64}\Z')
INTEGER = re.compile(r'-?(?:0|[1-9][0-9]*)\Z')
SIGN, MASK = 1 << 63, (1 << 64)-1
MAX_BYTES, MAX_BINARY_BYTES = 8*1024*1024, 256*1024*1024
DEADLINE_SECONDS, HEARTBEAT_SECONDS = 1800, 15


class ProofError(ValueError):
    pass


def require(condition, message):
    if not condition:
        raise ProofError(message)


def keys(value, expected, label):
    require(type(value) is dict and set(value) == set(expected), f'{label}: closed fields differ')


def integer(value, expected, label):
    require(type(value) is int and value == expected, f'{label}: exact integer differs')


def exact(token):
    require(type(token) is str and len(token) <= 512, 'bounded decimal string required')
    match = TOKEN.fullmatch(token)
    require(match is not None, 'invalid decimal token')
    exponent = match.group(1)
    require(exponent is None or (len(exponent) <= 5 and abs(int(exponent)) <= 1024), 'decimal exponent bound')
    return F(token)


def rational(value):
    return {'numerator': str(value.numerator), 'denominator': str(value.denominator)}


def read_rational(value):
    keys(value, ('numerator', 'denominator'), 'rational')
    for token in value.values():
        require(type(token) is str and len(token) <= 4096 and INTEGER.fullmatch(token), 'bounded integer token required')
    require(int(value['denominator']) > 0, 'positive denominator required')
    result = F(int(value['numerator']), int(value['denominator']))
    require(rational(result) == value, 'canonical reduced rational required')
    return result


def parse_json(data, *, metadata=False):
    def pairs(items):
        result = {}
        for key, value in items:
            require(key not in result, 'duplicate JSON key: '+key)
            result[key] = value
        return result
    def reject(token):
        raise ProofError('noninteger/nonfinite JSON number: '+token)
    return json.loads(data.decode('utf-8'), object_pairs_hook=pairs,
                      parse_float=Decimal if metadata else reject, parse_constant=reject)


def power2(exponent):
    return F(1 << exponent) if exponent >= 0 else F(1, 1 << -exponent)


def decode_bits(bits):
    require(type(bits) is str and HEX.fullmatch(bits), '16 lowercase binary64 hex digits required')
    word = int(bits, 16)
    exponent, fraction = (word >> 52) & 2047, word & ((1 << 52)-1)
    require(exponent != 2047, 'nonfinite binary64 word')
    magnitude = F(fraction)*power2(-1074) if exponent == 0 else F((1 << 52)+fraction)*power2(exponent-1075)
    return -magnitude if word & SIGN else magnitude


def nearest_bits(value, *, negative_zero=False):
    """Exact rational to IEEE binary64, ties to even; no host float conversion."""
    value = F(value)
    negative = value < 0 or (value == 0 and negative_zero)
    value = abs(value)
    if not value:
        return f'{SIGN if negative else 0:016x}'
    exponent = value.numerator.bit_length()-value.denominator.bit_length()
    if value < power2(exponent):
        exponent -= 1
    quantum = power2(max(exponent-52, -1074))
    scaled = value/quantum
    floor, remainder = divmod(scaled.numerator, scaled.denominator)
    if 2*remainder > scaled.denominator or (2*remainder == scaled.denominator and floor % 2):
        floor += 1
    rounded = floor*quantum
    require(rounded < power2(1024), 'binary64 rounding overflow')
    if rounded < power2(-1022):
        word = int(rounded/power2(-1074))
    else:
        exponent = rounded.numerator.bit_length()-rounded.denominator.bit_length()
        if rounded < power2(exponent):
            exponent -= 1
        significand = int(rounded/power2(exponent-52))
        word = ((exponent+1023) << 52) | (significand-(1 << 52))
    return f'{word | (SIGN if negative else 0):016x}'


def token_bits(token):
    value = exact(token)
    return nearest_bits(value, negative_zero=not value and token.startswith('-'))


def adjacent(bits, direction):
    value = decode_bits(bits)
    word = int(bits, 16)
    if value == 0:
        word = 1 if direction > 0 else SIGN | 1
    elif (value > 0) == (direction > 0):
        word += 1
    else:
        word -= 1
    result = f'{word:016x}'
    decode_bits(result)
    return result


def rn(value):
    return decode_bits(nearest_bits(value))


def outward(value, direction):
    return decode_bits(adjacent(nearest_bits(value), direction))


def token_box(token):
    bits = token_bits(token)
    return decode_bits(adjacent(bits, -1)), decode_bits(adjacent(bits, 1))


def add(a, b):
    return outward(a[0]+b[0], -1), outward(a[1]+b[1], 1)


def subtract(a, b):
    return outward(a[0]-b[1], -1), outward(a[1]-b[0], 1)


def multiply(a, b):
    products = [x*y for x in a for y in b]
    return min(outward(x, -1) for x in products), max(outward(x, 1) for x in products)


def inflate(box, radius):
    require(radius >= 0, 'negative radius')
    return outward(box[0]-radius, -1), outward(box[1]+radius, 1)


def intersect(a, b):
    result = max(a[0], b[0]), min(a[1], b[1])
    require(result[0] <= result[1], 'empty EOM endpoint intersection')
    return result


def box_record(box):
    require(all(endpoint != 0 for endpoint in box),
            'zero release-box endpoint: signed-zero bit identity unresolved')
    return {'lowerBits': nearest_bits(box[0]), 'upperBits': nearest_bits(box[1])}


def read_box(value):
    keys(value, ('lowerBits', 'upperBits'), 'release box')
    result = decode_bits(value['lowerBits']), decode_bits(value['upperBits'])
    require(result[0] <= result[1], 'inverted release box')
    return result


def nominal(segment, axis, t):
    c = tuple(map(exact, segment['coefficients'][axis]))
    u = t-exact(segment['tStart'])
    return ((c[3]*u+c[2])*u+c[1])*u+c[0], (3*c[3]*u+2*c[2])*u+c[1]


def segment_state(segment, axis, t):
    """Independent exact simulation of the frozen outward binary64 expression."""
    a, b = token_box(segment['tStart']), token_box(segment['tEnd'])
    require(a[0] <= t[0] <= t[1] <= b[1], 'state outside API domain')
    u = subtract(t, a)
    c = [token_box(v) for v in segment['coefficients'][axis]]
    q = c[3]
    for index in (2, 1, 0):
        q = add(multiply(q, u), c[index])
    v = multiply((F(3), F(3)), c[3])
    v = add(multiply(v, u), multiply((F(2), F(2)), c[2]))
    v = add(multiply(v, u), c[1])
    return q, inflate(q, decode_bits(token_bits(segment['positionErrors'][axis]))), inflate(v, decode_bits(token_bits(segment['velocityErrors'][axis])))


def release_boxes(segments):
    require(len(segments) >= 2, 'preceding join required')
    prior, last = segments[-2:]
    endpoint = decode_bits(token_bits(last['tEnd']))
    join = decode_bits(token_bits(prior['tEnd']))
    require(endpoint == 0, 'release must be exact zero')
    raw = {'position': [], 'velocity': []}
    narrowed = {'position': [], 'velocity': []}
    for axis in range(3):
        q_end, position, velocity = segment_state(last, axis, (endpoint, endpoint))
        _, prior_join, _ = segment_state(prior, axis, (join, join))
        q_join, last_join, _ = segment_state(last, axis, (join, join))
        shared = intersect(prior_join, last_join)
        # The caller's scalar subtraction/product are separately rounded RN.
        distance = abs(rn(endpoint-join))
        radius = rn(decode_bits(token_bits(last['velocityErrors'][axis]))*distance)
        transported = inflate(add(shared, subtract(q_end, q_join)), radius)
        actual = intersect(position, intersect(position, transported))
        raw['position'].append(box_record(position)); raw['velocity'].append(box_record(velocity))
        narrowed['position'].append(box_record(actual)); narrowed['velocity'].append(box_record(velocity))
    return raw, narrowed


def fingerprint(segments):
    """FNV-1a over ASCII decimal byte-length + ':' + each exact UTF-8 token."""
    state = 14695981039346656037
    tokens = ['eom_history_segment_chain/v1']
    for s in segments:
        tokens.extend((s['tStart'], s['tEnd']))
        tokens.extend(t for row in s['coefficients'] for t in row)
        tokens.extend(s['positionErrors']); tokens.extend(s['velocityErrors'])
    for token in tokens:
        require(type(token) is str, 'fingerprint token must be a string')
        data = token.encode('utf-8')
        for byte in str(len(data)).encode('ascii')+b':'+data:
            state = ((state ^ byte)*1099511628211) & MASK
    return f'fnv1a64-chain-v1:{state:016x}'


def validate_segment(segment, index):
    keys(segment, SEGMENT_KEYS, 'prefix segment')
    integer(segment['index'], index, 'segment index')
    a, b = exact(segment['tStart']), exact(segment['tEnd'])
    require(a < b <= 0 and decode_bits(token_bits(segment['tStart'])) < decode_bits(token_bits(segment['tEnd'])), 'nonpositive/excess segment domain')
    c = segment['coefficients']
    require(type(c) is list and len(c) == 3 and all(type(row) is list and len(row) == 4 for row in c), '3x4 coefficients required')
    for row in c:
        for token in row:
            exact(token)
    for field in ('positionErrors', 'velocityErrors'):
        require(type(segment[field]) is list and len(segment[field]) == 3, 'three axis errors required')
        for token in segment[field]:
            require(exact(token) > 0, 'original F5 error must remain strictly positive')


def parsed_segment(segment):
    return {'tStart': token_bits(segment['tStart']), 'tEnd': token_bits(segment['tEnd']),
            'coefficients': [[token_bits(t) for t in row] for row in segment['coefficients']],
            'positionErrors': [token_bits(t) for t in segment['positionErrors']],
            'velocityErrors': [token_bits(t) for t in segment['velocityErrors']]}


def validate_restriction(prefix, receipt):
    require(prefix.get('schema') == 'braid-program/f5-prehistory-restriction.v1', 'prefix schema')
    require(prefix.get('normalizedFieldSpeed') == '1' and prefix.get('releaseTime') == '0'
            and prefix.get('retainedInterval') == ['-1', '0'], 'fixed past-only domain')
    require(receipt.get('schema') == 'braid-program/f5-prehistory-restriction-conformance.v1'
            and receipt.get('accepted') is True, 'accepted restriction receipt required')
    for key, expected in (('prefix', PREFIX_SHA), ('originalFullManifest', FULL_SHA),
                          ('nominalConformance', NOMINAL_SHA), ('apiConformance', API_SHA)):
        require(receipt[key]['sha256'] == expected, 'restriction provenance differs: '+key)
    require(receipt['inheritedConstantInterpretations'] == MODES, 'both analytic interpretations required')
    for flag in ('nominalContainmentInherited', 'apiDomainContainmentInherited'):
        require(receipt['claims'][flag] is True, 'accepted containment premise missing')
    require(type(prefix.get('members')) is list and len(prefix['members']) == 12
            and type(receipt.get('release')) is list and len(receipt['release']) == 12, 'twelve-member census')


def analyze_data(prefix, receipt, handoff, bindings, progress=None):
    """Pure control helper; accepted=False always. Only captured CLI grants conformance."""
    validate_restriction(prefix, receipt)
    keys(handoff, TOP_KEYS, 'handoff')
    require(handoff['schema'] == HANDOFF_SCHEMA and handoff['status'] == 'data-only-history-handoff', 'handoff schema/status')
    require(handoff['prefixSha256'] == PREFIX_SHA and handoff['restrictionReceiptSha256'] == RESTRICTION_SHA, 'original byte identities differ')
    keys(handoff['producerBindings'], ('source', 'buildReceipt', 'executable'), 'producer bindings')
    for value in handoff['producerBindings'].values():
        keys(value, ('path', 'sha256', 'bytes'), 'producer file binding')
        require(type(value['path']) is str and Path(value['path']).is_absolute()
                and type(value['sha256']) is str and HASH.fullmatch(value['sha256'])
                and type(value['bytes']) is int and value['bytes'] > 0, 'invalid producer file binding')
    require(handoff['sourceOwners'] == SOURCE_OWNERS and handoff['producerBindings'] == bindings, 'source/build/executable bindings differ')
    require(handoff['runtimePremises'] == RUNTIME_PREMISES, 'runtime premises differ')
    require(handoff['normalizedFieldSpeed'] == '1' and handoff['retainedInterval'] == ['-1', '0'] and handoff['releaseTime'] == '0', 'release scope differs')
    keys(handoff['claims'], FALSE_CLAIMS, 'claims')
    require(all(value is False for value in handoff['claims'].values()), 'handoff grants forbidden authority')
    require(type(handoff['members']) is list and len(handoff['members']) == 12, 'complete handoff member census')
    failures, fingerprints = [], []
    for mi, (source, member, release) in enumerate(zip(prefix['members'], handoff['members'], receipt['release'])):
        keys(member, MEMBER_KEYS, 'member')
        integer(source['index'], mi, 'source member index'); integer(member['index'], mi, 'member index')
        require(source['worldlineId'] == WORLDLINES[mi] and source['constituentId'] == WORLDLINES[mi].replace('-worldline', '-architrino'), 'fixed F5 identity/order')
        integer(source['polarity'], 1 if mi < 6 else -1, 'source polarity')
        for field in ('constituentId', 'worldlineId', 'polarity', 'originalHistory'):
            require(type(member[field]) is type(source[field]) and member[field] == source[field], 'original identity/provenance changed: '+field)
        require(member['restrictedHistoryId'] == HISTORY_PREFIX+source['worldlineId']
                and member['restrictedHistoryId'] != source['originalHistory']['historyId'], 'fresh restricted identity required')
        require(type(source['segments']) is list and len(source['segments']) == 51
                and type(member['segments']) is list and len(member['segments']) == 51, '51-piece census required')
        cursor = F(-1)
        for j, (s, got) in enumerate(zip(source['segments'], member['segments'])):
            validate_segment(s, j)
            keys(got, SEGMENT_KEYS | {'parsedBinary64'}, 'returned segment')
            integer(got['index'], j, 'returned segment index')
            require({key: got[key] for key in SEGMENT_KEYS} == s, 'original token/origin/error changed')
            require(exact(s['tStart']) == cursor, 'exact segment gap/overlap'); cursor = exact(s['tEnd'])
            keys(got['parsedBinary64'], PARSED_KEYS, 'parsed binary64')
            require(got['parsedBinary64'] == parsed_segment(s), 'binary64 conversion bits differ')
            if j:
                prior = source['segments'][j-1]
                for axis in range(3):
                    p, v = nominal(prior, axis, exact(prior['tEnd']))
                    for left, right, field in ((p, exact(s['coefficients'][axis][0]), 'positionErrors'),
                                                (v, exact(s['coefficients'][axis][1]), 'velocityErrors')):
                        require(abs(left-right) <= exact(prior[field][axis])+exact(s[field][axis]), 'exact constructor join fails')
            if progress:
                progress()
        require(cursor == 0 and source['segments'][-1]['tEnd'] == '0', 'release endpoint changed')
        expected_fingerprint = fingerprint(source['segments'])
        require(member['historyFingerprint'] == expected_fingerprint
                and expected_fingerprint != source['originalHistory']['historyFingerprint'], 'restricted fingerprint differs or copied original')
        fingerprints.append({'worldlineId': source['worldlineId'], 'historyId': member['restrictedHistoryId'], 'fingerprint': expected_fingerprint})
        keys(member['release'], ('nominalPosition', 'nominalDerivative', 'rawFinalPiece', 'endpointState'), 'release state')
        for field in ('nominalPosition', 'nominalDerivative'):
            require(type(member['release'][field]) is list and len(member['release'][field]) == 3, 'release vector census')
        integer(release['index'], mi, 'receipt release index')
        require(release['worldlineId'] == source['worldlineId'] and release['time'] == '0'
                and type(release['axes']) is list and len(release['axes']) == 3, 'receipt release identity')
        raw, endpoint = release_boxes(source['segments'])
        for field, expected in (('rawFinalPiece', raw), ('endpointState', endpoint)):
            keys(member['release'][field], ('position', 'velocity'), field)
            for kind in ('position', 'velocity'):
                require(type(member['release'][field][kind]) is list and len(member['release'][field][kind]) == 3, 'box vector census')
                for box in member['release'][field][kind]:
                    read_box(box)
            require(member['release'][field] == expected, 'actual release API bit box mismatch: '+field)
        for axis in range(3):
            p, v = nominal(source['segments'][-1], axis, F(0))
            proof = release['axes'][axis]; integer(proof['axis'], axis, 'receipt axis')
            for field, expected in (('nominalPosition', p), ('nominalDerivative', v)):
                require(read_rational(member['release'][field][axis]) == expected
                        and read_rational(proof[field]) == expected, 'exact release polynomial value differs')
            for kind, label in (('position', 'analyticPositionEnclosure'), ('velocity', 'analyticVelocityEnclosure')):
                values = proof[label]
                require(type(values) is list and len(values) == 2, 'analytic enclosure endpoints required')
                lo, hi = map(read_rational, values); require(lo <= hi, 'analytic enclosure inverted')
                for mode in MODES:
                    for field in ('rawFinalPiece', 'endpointState'):
                        actual = read_box(member['release'][field][kind][axis])
                        if not actual[0] <= lo <= hi <= actual[1]:
                            failures.append({'member': mi, 'axis': axis, 'kind': kind, 'constantInterpretation': mode,
                                             'box': field, 'code': 'inherited_analytic_endpoint_bound_not_contained',
                                             'analyticEnclosure': values, 'actualBox': member['release'][field][kind][axis],
                                             'meaning': 'sufficient inherited enclosure failed; not proof of analytic escape'})
    return {'accepted': False, 'dataChecksPassed': not failures, 'members': 12, 'segments': 612,
            'binary64TokenComparisons': 12240, 'exactJoinComparisons': 3600, 'releaseScalars': 72,
            'analyticInterpretationBoxComparisons': 288, 'fingerprints': fingerprints,
            'inheritedConstantInterpretations': MODES, 'failures': failures}


def file_identity(s):
    return s.st_dev, s.st_ino, s.st_size, s.st_mtime_ns, s.st_ctime_ns


class BoundFile:
    def __init__(self, path, expected, limit=MAX_BYTES):
        self.path, self.expected, self.limit, self.fd = Path(path).absolute(), expected, limit, None

    def __enter__(self):
        require(type(self.expected) is str and HASH.fullmatch(self.expected), 'external original-byte SHA-256 required')
        self.fd = os.open(self.path, os.O_RDONLY | os.O_NONBLOCK | getattr(os, 'O_NOFOLLOW', 0))
        try:
            info = os.fstat(self.fd)
            require(stat.S_ISREG(info.st_mode) and 0 < info.st_size <= self.limit, 'bounded nonempty regular file required')
            self.identity = file_identity(info)
            self.data = self.read()
            require(sha256(self.data).hexdigest() == self.expected, 'original byte hash mismatch: '+str(self.path))
            self.recheck()
            return self
        except BaseException:
            os.close(self.fd); self.fd = None
            raise

    def read(self):
        os.lseek(self.fd, 0, os.SEEK_SET); chunks, size = [], 0
        while True:
            chunk = os.read(self.fd, min(1024*1024, self.limit+1-size))
            if not chunk:
                break
            size += len(chunk); require(size <= self.limit, 'input grew beyond bound'); chunks.append(chunk)
        require(file_identity(os.fstat(self.fd)) == self.identity and size == self.identity[2], 'input changed during capture')
        return b''.join(chunks)

    def recheck(self):
        require(file_identity(os.stat(self.path, follow_symlinks=False)) == self.identity
                and self.read() == self.data, 'captured source changed/replaced')
        return self.binding()

    def binding(self):
        return {'path': str(self.path), 'sha256': self.expected, 'bytes': len(self.data)}

    def __exit__(self, *unused):
        if self.fd is not None:
            os.close(self.fd); self.fd = None


def write_exclusive(path, packet):
    data = (json.dumps(packet, sort_keys=True, separators=(',', ':'), allow_nan=False)+'\n').encode()
    fd = os.open(path, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600)
    with os.fdopen(fd, 'wb') as stream:
        stream.write(data); stream.flush(); os.fsync(stream.fileno())
    return sha256(data).hexdigest()


def sync_directory(path):
    fd = os.open(path, os.O_RDONLY)
    try:
        os.fsync(fd)
    finally:
        os.close(fd)


class Publication:
    def __init__(self, output, packet, watch):
        self.output, self.packet, self.watch = Path(output).absolute(), packet, watch
        require(not os.path.lexists(self.output), 'output already exists')
        self.directory = Path(tempfile.mkdtemp(prefix='.'+self.output.name+'.attempt-', dir=self.output.parent))
        self.candidate, self.identity, self.rejected = self.directory/'candidate.json', None, False
        packet['publication'] = {'intendedOutput': str(self.output), 'attemptDirectory': str(self.directory),
                                 'privateCandidateHasAuthority': False, 'deadlineSeconds': DEADLINE_SECONDS,
                                 'admission': 'matching fresh CLI completion hash, finite elapsed <=1800 and exit 0'}

    def publish(self):
        self.watch.publication = self
        try:
            self.watch.check(); digest = write_exclusive(self.candidate, self.packet)
            info = os.stat(self.candidate, follow_symlinks=False); self.identity = info.st_dev, info.st_ino
            self.watch.check(); os.link(self.candidate, self.output)
            sync_directory(self.directory); sync_directory(self.output.parent); self.watch.check()
            return digest
        except BaseException as error:
            self.reject(error); raise

    def reject(self, error):
        if self.rejected:
            return
        self.rejected = True
        signal.setitimer(signal.ITIMER_REAL, 0)
        if self.identity is not None:
            try:
                info = os.stat(self.output, follow_symlinks=False)
                if (info.st_dev, info.st_ino) == self.identity:
                    os.unlink(self.output)  # Our public link only; private evidence remains.
            except FileNotFoundError:
                pass
        rejected = {**self.packet, 'accepted': False, 'claims': FALSE_CLAIMS.copy(),
                    'dataConformanceEstablished': False, 'inheritedAnalyticReleaseEnclosed': False,
                    'publication': {**self.packet['publication'], 'status': 'rejected'},
                    'failures': [*self.packet.get('failures', []), {'code': 'publication_rejected', 'detail': str(error)}]}
        rejection = self.directory/'rejection.json'; write_exclusive(rejection, rejected)
        try:
            os.link(rejection, self.output)
        except FileExistsError:
            pass
        sync_directory(self.directory); sync_directory(self.output.parent)
        print('Handoff publication rejected; preserved evidence: '+str(rejection), file=sys.stderr, flush=True)


class Watch:
    def __enter__(self):
        require(signal.getitimer(signal.ITIMER_REAL) == (0.0, 0.0), 'existing alarm prevents standalone watch')
        self.started, self.completed, self.publication = time.monotonic(), 0, None
        self.previous = signal.signal(signal.SIGALRM, self.heartbeat)
        signal.setitimer(signal.ITIMER_REAL, HEARTBEAT_SECONDS, HEARTBEAT_SECONDS)
        return self

    def check(self):
        elapsed = time.monotonic()-self.started
        require(0 <= elapsed <= DEADLINE_SECONDS, 'proof/publication deadline exceeded')
        return elapsed

    def progress(self):
        self.completed += 1; self.check()

    def heartbeat(self, *_):
        print(json.dumps({'stage': 'f5-history-handoff-reference', 'segments': self.completed,
                          'elapsedSeconds': time.monotonic()-self.started}), file=sys.stderr, flush=True)
        self.check()

    def __exit__(self, kind, error, traceback):
        try:
            if error is not None:
                if self.publication is not None:
                    self.publication.reject(error)
            else:
                self.check()
        except BaseException as late:
            if self.publication is not None:
                self.publication.reject(late)
            raise
        finally:
            signal.setitimer(signal.ITIMER_REAL, 0); signal.signal(signal.SIGALRM, self.previous)
        if error is None:
            try:
                self.publication_elapsed = self.check()  # Includes watchdog teardown.
            except BaseException as late:
                if self.publication is not None:
                    self.publication.reject(late)
                raise


def verify(args):
    root = Path(__file__).resolve().parents[2]
    paths = [('prefix', args.prefix, PREFIX_SHA), ('restriction', args.restriction_receipt, RESTRICTION_SHA),
             ('handoff', args.handoff, args.handoff_sha256), ('instrument', __file__, args.verifier_sha256),
             ('source', args.producer_source, args.producer_source_sha256),
             ('buildReceipt', args.build_receipt, args.build_receipt_sha256),
             ('executable', args.executable, args.executable_sha256)]
    paths += [(owner, root/owner, digest) for owner, digest in SOURCE_OWNERS.items()]
    output = Path(args.out).absolute()
    require(output.parent.is_dir() and not os.path.lexists(output), 'fresh output directory/path required')
    require(output.resolve() not in {Path(p).resolve() for _, p, _ in paths}, 'output aliases input')
    packet = {'schema': REPORT_SCHEMA, 'accepted': False, 'h3EvidenceEligible': False,
              'authority': 'exact token and binary64 history-handoff conformance only',
              'claims': FALSE_CLAIMS.copy(), 'producerExecutionAuthenticated': False,
              'producerBuildOriginAuthenticated': False,
              'externalPremise': 'independent caller review of pinned producer source/build/executable and fresh producer completion',
              'failures': []}
    with Watch() as watch:
        with ExitStack() as stack:
            bound = {}
            try:
                for role, path, digest in paths:
                    bound[role] = stack.enter_context(BoundFile(path, digest, MAX_BINARY_BYTES if role == 'executable' else MAX_BYTES))
                require(compile(bound['instrument'].data, _EXECUTING_CODE.co_filename, 'exec', dont_inherit=True,
                                optimize=sys.flags.optimize) == _EXECUTING_CODE, 'executing verifier code differs')
                bindings = {role: bound[role].binding() for role in ('source', 'buildReceipt', 'executable')}
                result = analyze_data(parse_json(bound['prefix'].data), parse_json(bound['restriction'].data, metadata=True),
                                      parse_json(bound['handoff'].data), bindings, watch.progress)
                packet['analysis'] = result; packet['failures'].extend(result['failures'])
            except (ProofError, OSError, ValueError, KeyError, TypeError, RecursionError) as error:
                packet['failures'].append({'code': 'input_or_data_rejected', 'detail': str(error)})
            packet['bindingsBefore'] = {role: item.binding() for role, item in bound.items()}
            packet['bindingsAfter'] = {}
            for role, item in bound.items():
                try:
                    packet['bindingsAfter'][role] = item.recheck()
                except (ProofError, OSError) as error:
                    packet['failures'].append({'code': 'bound_file_changed', 'role': role, 'detail': str(error)})
            packet['accepted'] = 'analysis' in packet and not packet['failures']
            packet['dataConformanceEstablished'] = packet['accepted']
            packet['inheritedAnalyticReleaseEnclosed'] = packet['accepted']
            packet['proofElapsedSeconds'] = watch.check()
            publication = Publication(output, packet, watch); digest = publication.publish()
            for item in bound.values():
                item.recheck()
        # All source handles close before the final watch/teardown check.
    return packet, digest, watch.publication_elapsed


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    for flag in ('prefix', 'restriction-receipt', 'handoff', 'handoff-sha256', 'producer-source',
                 'producer-source-sha256', 'build-receipt', 'build-receipt-sha256',
                 'executable', 'executable-sha256', 'verifier-sha256', 'out'):
        parser.add_argument('--'+flag, required=True)
    args = parser.parse_args(argv)
    try:
        packet, digest, elapsed = verify(args)
    except (ProofError, OSError, ValueError) as error:
        print(json.dumps({'completed': False, 'accepted': False, 'failure': str(error)}), file=sys.stderr, flush=True)
        return 2
    print(json.dumps({'completed': True, 'accepted': packet['accepted'], 'output': str(Path(args.out).absolute()),
                      'receiptSha256': digest, 'publicationElapsedSeconds': elapsed,
                      'h3EvidenceEligible': False, 'producerExecutionAuthenticated': False}), flush=True)
    return 0 if packet['accepted'] else 1


if __name__ == '__main__':
    raise SystemExit(main())
