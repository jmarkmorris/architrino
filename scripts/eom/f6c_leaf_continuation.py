"""Bounded pure replay of externally admitted, complete response segments.

No filesystem, process, source-authentication or numerical-admission authority.
The caller authenticates original source/history/refinement mappings and every
detached acceptance crosslink before supplying Segment records. This module
checks their byte bindings and arithmetic lineage, never a serialized GK State.
Only genuine start/respond products can enter the single-use session seam.
"""

from dataclasses import dataclass, fields
from fractions import Fraction
import hashlib
import json
import re


MAX_BYTES = 64 * 1024**2
MAX_SOURCE_BYTES = 1024**3
MAX_PAIRS = 3280
SCHEMA = 'braid-program/f6c-stream-segment-independent-acceptance.v2'
CONTINUATION_SCHEMA = 'braid-program/f6c-stream-continuation.v1'
AUTHORITY_KEYS = ('context', 'history', 'mathematicalSettings', 'mathematicalBindings')
ACCEPTANCE_KEYS = ('schema', 'scope', 'accepted', 'stream', 'operation', 'invocation',
    'finalCaller', 'numericalReceipt', 'operationalReceipt', 'independentAudit',
    'acceptanceReceipt', 'segment', 'completeEOF', 'independentNumericalConformance',
    'processClosure', 'accuracyClosure', 'streamFraming', 'mathematicalSettings',
    'history', 'context', 'mathematicalBindings', 'arithmeticBlocks',
    'consumedParentBindings', 'originalSourceClosure', 'reviewerBindings',
    'finalState', 'measuredProcessClosure', 'limitations', 'predecessor')
_KEY = object()
_ACTIVE = set()
_POISONED = set()


def _require(ok, message):
    if not ok:
        raise ValueError(message)


def _keys(value, names):
    _require(type(value) is dict and set(value) == set(names), 'closed continuation fields')


def _same(a, b):
    if type(a) is not type(b):
        return False
    if type(a) is dict:
        return set(a) == set(b) and all(_same(a[k], b[k]) for k in a)
    if type(a) is list:
        return len(a) == len(b) and all(_same(x, y) for x, y in zip(a, b))
    return a == b


def _binding(value, maximum=MAX_SOURCE_BYTES):
    _keys(value, ('path', 'sha256', 'bytes'))
    p = value['path']
    _require(type(p) is str and 0 < len(p) <= 2048 and p.startswith('/')
             and not p.startswith('//') and '\\' not in p and '\0' not in p
             and all(x not in ('', '.', '..') for x in p.split('/')[1:]), 'canonical logical binding path')
    _require(type(value['sha256']) is str and re.fullmatch('[a-f0-9]{64}', value['sha256'])
             and type(value['bytes']) is int and 0 < value['bytes'] <= maximum, 'bounded external binding')
    return value


def _decode(raw):
    def pairs(rows):
        result = {}
        for k, v in rows:
            _require(k not in result, 'duplicate acceptance key')
            result[k] = v
        return result
    return json.loads(raw, object_pairs_hook=pairs,
                      parse_constant=lambda _: (_ for _ in ()).throw(ValueError('nonfinite acceptance')))


@dataclass(frozen=True, slots=True)
class Segment:
    stream_binding: dict
    lines: object
    expected_header: dict
    original_parents: object
    acceptance_binding: dict
    acceptance_bytes: bytes


class ReplayedPrefix:
    """Opaque pure-replay result, not evidence of physical source admission."""
    __slots__ = ('_adapter', '_reference', '_protocol', '_state', '_parents',
                 '_frames', '_context', '_provenance', '_metadata', '_wire', '_used', '_baseline')

    def __new__(cls, key=None):
        _require(key is _KEY, 'prefix can only be created by complete replay')
        return object.__new__(cls)

    def __setattr__(self, *_):
        raise TypeError('read-only replayed prefix')

    @property
    def metadata(self):
        return self._wire(self._metadata)


def _response(ref, gk, request, value, wire):
    """Rebuild only frozen response records; no private State construction."""
    def record(cls, raw, transforms):
        _keys(raw, tuple(f.name for f in fields(cls)))
        return cls(**{k: transforms[k](v) if k in transforms else v for k, v in raw.items()})
    def context(raw):
        _require(_same(raw, wire(request.context)), 'response context changed')
        return request.context
    def box(raw): return record(ref.Bounds, raw, {})
    def key(raw): return record(ref.IntegralKey, raw, dict(context=context, domain=box))
    def polynomial(raw): return record(ref.Polynomial, raw, dict(key=key, coefficients=tuple))
    def piece(raw): return record(ref.ResidualPiece, raw, dict(domain=box, residual=box))
    def residual(raw): return record(ref.ResidualPartition, raw, dict(key=key, pieces=lambda x: tuple(piece(p) for p in x)))
    _keys(value, ('request', 'members'))
    _require(_same(value['request'], wire(request)), 'saved request is not the genuine outstanding request')
    _require(type(value['members']) is list and len(value['members']) == 8, 'complete saved member census')
    members = tuple(record(gk.MemberEvidence, m, dict(whole_squared=box,
        node_squared=lambda x: tuple(box(b) for b in x), polynomial=polynomial, residual=residual)) for m in value['members'])
    result = gk.LeafResponse(request, members)
    _require(_same(wire(result), value), 'response token or record changed during reconstruction')
    return result


def replay(adapter, diagnostic, codec, streamed, segments, *, expected_authority, live=None):
    if id(adapter) in _ACTIVE:
        _POISONED.add(id(adapter))
        raise ValueError('reentrant prefix replay')
    _ACTIVE.add(id(adapter))
    try:
        return _replay(adapter, diagnostic, codec, streamed, segments,
                       expected_authority=expected_authority, live=live)
    finally:
        _ACTIVE.remove(id(adapter))
        _POISONED.discard(id(adapter))


def _replay(adapter, diagnostic, codec, streamed, segments, *, expected_authority, live=None):
    """Stream complete accepted segments into a sealed genuine GK prefix.

    expected_authority is the caller-admitted exact context, history, settings
    and mathematicalBindings. Segment.original_parents contains all 160 original
    whole-parent snapshots, not narrowed provision geometry. Every consumed
    parent must equal the current adapter's exact original descriptor. Different
    unconsumed evidence is an external explicitly admitted refinement mapping.
    """
    _require(live is None or callable(live), 'optional bounded live callback')
    wire = streamed.to_wire
    _keys(expected_authority, AUTHORITY_KEYS)
    authority = wire(expected_authority)
    context, frames, parents = adapter.context, adapter.frames, adapter.parents
    provenance = tuple(adapter.provenance)
    session = diagnostic.LeafResponseSession(adapter)
    ref, gk = session.integral_reference, session.gk_protocol
    _require(gk.MAX_EVALUATED_LEAVES == MAX_PAIRS and gk.MAX_NODE_NEIGHBORHOODS == 9840
             and gk.MAX_SPLITS_PER_FRAME == 20 and gk.ROOT_REFINEMENT_LIMIT == 0
             and gk.EMISSION_REFINEMENT_LIMIT == 0, 'unchanged global budget')
    _require(_same(wire(context), authority['context']), 'current context authority')
    baseline = (tuple(adapter.call_counts.items()), tuple(adapter.geometry_accounting.items()))
    _require(all(v == 0 for k, v in baseline[0] if k != 'coverage_cache_entries')
             and all(v == 0 for k, v in baseline[1]), 'replay requires fresh unmeasured adapter')

    def guard():
        _require(id(adapter) not in _POISONED, 'poisoned reentrant replay')
        _require(adapter.context is context and adapter.frames is frames and adapter.parents is parents
                 and tuple(adapter.provenance) == provenance and session.integral_reference is ref
                 and session.gk_protocol is gk, 'same current replay adapter generation')
        _require((tuple(adapter.call_counts.items()), tuple(adapter.geometry_accounting.items())) == baseline,
                 'provider or geometry work during replay')

    def external(callback, *args):
        guard()
        try:
            return callback(*args)
        finally:
            guard()

    def tick():
        guard()
        if live is not None: external(live)
        guard()

    state = session.state
    _require(type(state) is gk.State and state.plan.context is context, 'genuine initial protocol state')
    plan_wire = wire(state.plan)
    current_parents = wire(parents)
    _require(type(current_parents) is list and len(current_parents) == 160, 'complete current parent census')
    consumed, previous, total_bytes, segment_count = {}, None, 0, 0
    seen_streams, seen_acceptances = set(), set()
    iterator = external(iter, segments)
    while True:
        tick()
        try: segment = external(next, iterator)
        except StopIteration: break
        _require(type(segment) is Segment and segment_count < MAX_PAIRS, 'bounded exact segment envelope')
        stream_binding, acceptance_binding = wire(segment.stream_binding), wire(segment.acceptance_binding)
        _binding(stream_binding, MAX_BYTES); _binding(acceptance_binding, MAX_BYTES)
        stream_key, acceptance_key = (tuple(b[k] for k in ('path','sha256','bytes')) for b in (stream_binding,acceptance_binding))
        _require(stream_key not in seen_streams and acceptance_key not in seen_acceptances, 'duplicate or cyclic segment')
        seen_streams.add(stream_key); seen_acceptances.add(acceptance_key)
        total_bytes += stream_binding['bytes'] + acceptance_binding['bytes']
        _require(total_bytes <= MAX_SOURCE_BYTES, 'aggregate inherited source byte limit')
        raw = segment.acceptance_bytes
        _require(type(raw) is bytes and len(raw) == acceptance_binding['bytes']
                 and hashlib.sha256(raw).hexdigest() == acceptance_binding['sha256'], 'exact external acceptance bytes')
        accepted = _decode(raw)
        _keys(accepted, ACCEPTANCE_KEYS)
        _require(accepted['schema'] == SCHEMA and all(accepted[k] is True for k in
                 ('accepted', 'completeEOF', 'independentNumericalConformance', 'processClosure')), 'independent closed segment declaration')
        _require(_same(accepted['stream'], stream_binding) and _same(accepted['predecessor'], previous), 'exact accepted stream and predecessor')
        for key in AUTHORITY_KEYS:
            _require(_same(accepted[key], authority[key]), 'same admitted '+key)
        for key in ('operation', 'invocation', 'finalCaller', 'numericalReceipt', 'operationalReceipt',
                    'independentAudit', 'acceptanceReceipt'):
            _binding(accepted[key])
        census = accepted['segment']; _keys(census, ('localPairs', 'totalPairs', 'inheritedPairs', 'records', 'coveredOriginalParents', 'domain'))
        inherited = len(state.evaluations)
        _require(all(type(census[k]) is int for k in ('localPairs', 'totalPairs', 'inheritedPairs', 'records'))
                 and 0 < census['localPairs'] <= MAX_PAIRS-inherited and census['inheritedPairs'] == inherited
                 and census['totalPairs'] == inherited+census['localPairs'] and census['records'] == 2*census['localPairs']+2,
                 'one cumulative mathematical budget and local transport census')
        original_parents = wire(segment.original_parents)
        _require(type(original_parents) is list and len(original_parents) == 160, 'all original whole-parent snapshots required')
        for index, parent in enumerate(original_parents):
            _keys(parent, ('index', 'reception', 'rows', 'bindings', 'refined'))
            _require(type(parent['index']) is int and parent['index'] == index and type(parent['refined']) is bool
                     and type(parent['rows']) is list and len(parent['rows']) == 64
                     and _same(parent['reception'], current_parents[index]['reception']), 'same original parent partition/shape')
        expected_header = wire(segment.expected_header)
        _keys(expected_header, streamed.METADATA_KEYS)
        decoder = codec.StreamDecoder(byte_limit=MAX_BYTES, live=tick)
        lines = external(iter, segment.lines)
        local_pairs, local_consumed, deltas, pending = 0, {}, [], None
        local_domains = []
        segment_hash = hashlib.sha256(); segment_bytes = 0
        initial_summary = streamed.state_summary(gk, state)
        saw_header = saw_footer = False
        while True:
            tick()
            try: line = external(next, lines)
            except StopIteration: break
            _require(type(line) is bytes and len(line) <= stream_binding['bytes']-segment_bytes, 'bounded original stream bytes')
            before_bytes, before_hash = segment_bytes, segment_hash.hexdigest()
            result = decoder.feed(line)
            segment_bytes += len(line); segment_hash.update(line)
            if result['kind'] == 'header':
                _require(not saw_header and _same({k:result['header'][k] for k in streamed.METADATA_KEYS}, expected_header), 'exact historical transport metadata')
                saw_header = True
                _require(_same(result['shared']['context'], authority['context'])
                         and _same(result['header']['protocol_plan'], plan_wire)
                         and _same(result['header']['initial_state'], initial_summary), 'same original plan and replayed initial frontier')
                continuation = result['header']['spec'].get('continuation')
                if previous is None:
                    _require(continuation is None and inherited == 0, 'initial segment has no predecessor')
                else:
                    _require(_same(continuation, dict(schema=CONTINUATION_SCHEMA, predecessor=previous,
                        inheritedPairs=inherited, replayedInitialState=initial_summary,
                        consumedOriginalParents=sorted(consumed))), 'explicit complete continuation header')
            elif result['kind'] == 'provision':
                _require(local_pairs < census['localPairs'] and len(state.evaluations) < MAX_PAIRS, 'bounded inherited pair count')
                request = gk.request(state)
                _require(request is not None, 'cannot continue terminal mathematical state')
                value = result['value']; pending = _response(ref, gk, request, value['response'], wire)
                matches = [p for p in original_parents if Fraction(p['reception']['lower']) <= Fraction(request.domain.lower)
                           < Fraction(request.domain.upper) <= Fraction(p['reception']['upper'])]
                _require(len(matches) == 1, 'one whole original parent; no boundary crossing')
                parent = matches[0]; index = parent['index']
                _require(_same(parent, current_parents[index]) and (index not in consumed or _same(parent, consumed[index])),
                         'consumed parent evidence cannot change')
                consumed[index] = local_consumed[index] = parent
                local_domains.append((request.domain.lower,request.domain.upper))
                observed = value['history_state_evaluations']
                _require(type(observed) is list and len(observed) == 4 and all(type(v) is int and v > 0 for v in observed), 'historical four positive geometry deltas')
                deltas.extend(observed)
                n = local_pairs+1
                _require(_same(value['call_counts'], [[k,v] for k,v in zip(streamed.COUNTERS,(4*n,4*n,8*n,0,0))])
                         and _same(value['geometry_accounting'], [[k,v] for k,v in zip(streamed.GEOMETRY,(4*n,4*n,sum(deltas),4*n))]), 'historical local measured counters')
            elif result['kind'] == 'transition':
                _require(pending is not None, 'one pending saved response')
                next_state = gk.respond(ref, state, pending)
                _require(type(next_state) is gk.State and next_state.plan is state.plan
                         and len(next_state.evaluations) == len(state.evaluations)+1, 'one genuine replay transition')
                _require(_same(wire(next_state.evaluations[-1]), result['value']['evaluation'])
                         and _same(streamed.state_summary(gk, next_state), result['value']['state_after']), 'complete replay evaluation and frontier')
                state = next_state; pending = None; local_pairs += 1
            else:
                _require(result['kind'] == 'footer' and pending is None, 'complete footer after transition')
                saw_footer = True
                final_summary = streamed.state_summary(gk, state)
                expected_summary = dict(final_state=final_summary,
                    call_counts=[[k,v] for k,v in zip(streamed.COUNTERS,(4*local_pairs,4*local_pairs,8*local_pairs,0,0))],
                    geometry_accounting=[[k,v] for k,v in zip(streamed.GEOMETRY,(4*local_pairs,4*local_pairs,sum(deltas),4*local_pairs))],
                    history_state_evaluations=deltas, claims=wire(ref.Claims()))
                _require(_same(result['summary'], expected_summary) and _same(accepted['finalState'], final_summary), 'complete footer and detached final frontier')
                framing = accepted['streamFraming']
                _require(_same(framing, dict(prefixBytes=before_bytes,prefixSha256=before_hash,finalLF=True,complete=True,
                                            provisions=local_pairs,transitions=local_pairs)), 'independent original framing declaration')
            tick()
        finished = decoder.finish(); tick()
        _require(saw_header and saw_footer and finished['complete'] is True and finished['pairs'] == local_pairs == census['localPairs']
                 and segment_bytes == stream_binding['bytes'] == finished['bytes']
                 and segment_hash.hexdigest() == stream_binding['sha256'] == finished['sha256'], 'external complete stream binding and actual EOF')
        _require(_same(sorted(local_consumed), census['coveredOriginalParents']), 'exact locally consumed original parents')
        domain = [min(local_domains,key=lambda x:Fraction(x[0]))[0],max(local_domains,key=lambda x:Fraction(x[1]))[1]]
        _require(_same(domain,census['domain']), 'exact covered segment domain hull')
        previous = dict(stream=stream_binding, acceptance=acceptance_binding)
        segment_count += 1
    _require(segment_count > 0, 'nonempty independently admitted prefix')
    tick()
    metadata = dict(schema=CONTINUATION_SCHEMA, predecessor=previous, inheritedPairs=len(state.evaluations),
                    replayedInitialState=streamed.state_summary(gk,state), consumedOriginalParents=sorted(consumed))
    token = ReplayedPrefix(_KEY)
    for name,value in (('_adapter',adapter),('_reference',ref),('_protocol',gk),('_state',state),('_parents',parents),
                       ('_frames',frames),('_context',context),('_provenance',provenance),('_metadata',metadata),('_wire',wire),('_used',False),('_baseline',baseline)):
        object.__setattr__(token,name,value)
    return token


def references(prefix, adapter):
    """Keep the actual reference proxy that owns the genuine replayed State."""
    _require(type(prefix) is ReplayedPrefix and not prefix._used and adapter is prefix._adapter,
             'original unused same-adapter replay token required')
    return prefix._reference, prefix._protocol


def consume(prefix, adapter, reference, protocol, fresh_plan):
    """Consume once, only in the same current unmeasured adapter generation."""
    _require(type(prefix) is ReplayedPrefix and not prefix._used, 'original unused replay token required')
    object.__setattr__(prefix,'_used',True)
    _require(adapter is prefix._adapter and reference is prefix._reference and protocol is prefix._protocol
             and adapter.parents is prefix._parents and adapter.frames is prefix._frames
             and adapter.context is prefix._context and tuple(adapter.provenance) == prefix._provenance,
             'token belongs to another adapter/reference generation')
    _require(_same(prefix._wire(fresh_plan),prefix._wire(prefix._state.plan)), 'fresh plan differs from genuine replayed plan')
    _require((tuple(adapter.call_counts.items()),tuple(adapter.geometry_accounting.items())) == prefix._baseline,
             'no numerical or cache work before prefix adoption')
    return prefix._state, prefix.metadata
