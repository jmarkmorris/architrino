"""Explicit, bounded evidence transport for an unchanged leaf-response session.

This module owns no numerical method, filesystem, launcher or authentication.
The caller supplies captured modules and remains responsible for their origin,
the original deadline, durable output and independent mathematical admission.
One advance writes a provision BEFORE consuming it, then its actual evaluation.
A complete stream may describe a still-pending partial history.
"""

from dataclasses import fields, is_dataclass
from fractions import Fraction
import json


MAX_BYTES = 64 * 1024**2
MAX_DEPTH = 48
MAX_NODES = 1000000
MAX_ITEMS = 20000
MAX_STRING_BYTES = 131072
METADATA_KEYS = ('scope', 'spec', 'sourceBindings', 'runtimeBindings',
                 'pythonBodySha256', 'clockTransfer', 'publicationRequires')
COUNTERS = ('projections', 'evaluations', 'residuals', 'root_queries', 'emission_refinements')
GEOMETRY = ('restriction_calls', 'completed_restrictions', 'history_state_evaluations', 'restricted_projections')


def _require(value, message):
    if not value:
        raise ValueError(message)


def _integer_text(value, limit):
    """Exact bounded decimal serialization, without changing interpreter limits."""
    _require(type(value) is int and value.bit_length() <= 4 * limit, 'integer text bound')
    sign = '-' if value < 0 else ''
    value = abs(value)
    parts = []
    while value >= 10**1000:
        value, tail = divmod(value, 10**1000)
        parts.append(str(tail).zfill(1000))
        _require(len(parts) * 1000 <= limit, 'integer text length')
    result = sign + str(value) + ''.join(reversed(parts))
    _require(len(result) <= limit, 'integer text length')
    return result


def to_wire(value):
    """Bound conversion itself, preserving declared fields and exact tokens."""
    active = set()
    nodes = size = 0

    def charge(amount):
        nonlocal size
        size += amount
        _require(size <= MAX_BYTES, 'expanded wire byte limit')

    def visit(v, depth):
        nonlocal nodes
        nodes += 1
        _require(nodes <= MAX_NODES and depth <= MAX_DEPTH, 'wire structure limit')
        kind = type(v)
        if v is None or kind in (str, int, bool):
            if kind is str:
                _require(len(v) <= MAX_STRING_BYTES and len(v.encode('utf-8')) <= MAX_STRING_BYTES, 'wire string bound')
            if kind is int:
                _require(v.bit_length() <= 3402 and len(_integer_text(v, 1025).lstrip('-')) <= 1024, 'wire integer bound')
            charge(len(json.dumps(v, ensure_ascii=True, allow_nan=False).encode('ascii')))
            return v
        if kind is Fraction:
            # Rational components are decimal STRINGS, not JSON integers.
            return visit(dict(numerator=_integer_text(v.numerator, MAX_STRING_BYTES),
                              denominator=_integer_text(v.denominator, MAX_STRING_BYTES)), depth)
        record = (not isinstance(v, type) and is_dataclass(v)
                  and kind.__bases__ == (object,) and '__dataclass_fields__' in kind.__dict__)
        _require(kind in (dict, list, tuple) or record, 'unsupported wire value or subclass')
        _require(id(v) not in active, 'cyclic wire value')
        if record:
            _require(len(kind.__dataclass_fields__) <= MAX_ITEMS, 'wire declared-field bound')
        count = len(fields(v)) if record else len(v)
        _require(count <= MAX_ITEMS, 'wire container bound')
        active.add(id(v))
        try:
            charge(2 + max(0, count - 1))
            if kind in (list, tuple):
                return [visit(item, depth + 1) for item in v]
            result = {}
            names = tuple(f.name for f in fields(v)) if record else v.keys()
            for key in names:
                _require(type(key) is str and len(key.encode('utf-8')) <= 4096, 'wire key bound')
                visit(key, depth + 1)
                charge(1)
                result[key] = visit(getattr(v, key) if record else v[key], depth + 1)
            return result
        finally:
            active.remove(id(v))

    return visit(value, 0)


def state_summary(protocol, state):
    """Complete existing public frontier summary; not a serialized State."""
    return to_wire(dict(status=state.status, aggregate_is_none=state.aggregate is None,
                        next_generation=state.next_generation, split_counts=state.split_counts,
                        leaf_count=len(state.leaves), evaluated_count=len(state.evaluations),
                        pending_count=sum(leaf.evaluation is None for leaf in state.leaves),
                        next_request=protocol.request(state)))


class StreamedLeafSession:
    """One fresh session, with explicit one-request advance and explicit finish.

    Normal frozen-record immutability is assumed, as by the injected protocol;
    hostile private reflection is not a supported interface. Errors poison this
    caller without erasing completed work or altering inherited ownership maps.
    """

    def __init__(self, adapter, diagnostic, codec, metadata, sink, *, byte_limit=MAX_BYTES, live=None,
                 continuation=None, prefix=None):
        self._phase = 'constructing'
        self._encoder = None
        self._callback = False
        self._providing = False
        self._deltas = []
        self._completed = 0
        self._inherited = 0
        try:
            _require(callable(sink) and (live is None or callable(live)), 'sink and optional live callbacks')
            _require(type(byte_limit) is int and 0 < byte_limit <= MAX_BYTES, 'aggregate byte limit')
            _require(type(metadata) is dict and set(metadata) == set(METADATA_KEYS), 'closed transport metadata')
            metadata = to_wire(metadata)
            for name in ('scope', 'pythonBodySha256', 'publicationRequires'):
                _require(type(metadata[name]) is str and metadata[name], 'transport string metadata')
            _require(type(metadata['spec']) is dict and type(metadata['sourceBindings']) is dict
                     and type(metadata['runtimeBindings']) is list and type(metadata['clockTransfer']) is dict,
                     'transport metadata shapes')
            self._adapter, self._sink, self._live = adapter, sink, live
            self._context, self._provenance = adapter.context, tuple(adapter.provenance)
            self._frames, self._parents = adapter.frames, adapter.parents
            _require((continuation is None) == (prefix is None), 'complete optional continuation seam')
            self._session = (diagnostic.LeafResponseSession(adapter) if prefix is None else
                             diagnostic.LeafResponseSession(adapter, continuation=continuation, prefix=prefix))
            if prefix is not None:
                self._inherited = self._session.logical_accounting['inherited_pairs']
                _require('continuation' not in metadata['spec'], 'continuation metadata is derived from replay token')
                metadata['spec']['continuation'] = to_wire(self._session.continuation)
            self._ref, self._protocol = self._session.integral_reference, self._session.gk_protocol
            self._state = self._session.state
            self._expected = self._counters()
            self._expected_cache = self._cache_count()
            _require(self._expected == ((0, 0, 0, 0, 0), (0, 0, 0, 0)), 'fresh unmeasured adapter')
            self._tick()
            lengths = {len(h.segments) for h in adapter.histories}
            _require(len(lengths) == 1, 'uniform original history-piece census')
            census = dict(sources=len(self._provenance), members=len(adapter.histories),
                          segmentsPerMember=next(iter(lengths)), frames=len(self._frames), parents=len(self._parents),
                          projections=0, evaluations=0, residuals=0, restrictions=0, historyStateEvaluations=0)
            header = dict(scope=metadata['scope'], accepted=False, protocol_plan=to_wire(self._state.plan),
                          initial_state=self._summary(), metadataCensus=census,
                          **{k: metadata[k] for k in METADATA_KEYS if k != 'scope'}, claims=self._claims())
            shared = dict(context=to_wire(self._context), source_provenance=to_wire(self._provenance))
            # Retain the actual encoder even if its header is acknowledged and
            # a later guard rejects construction. Never invent prefix counts.
            self._encoder = codec.StreamEncoder.__new__(codec.StreamEncoder)
            self._encoder.__init__(shared, header, self._write, byte_limit=byte_limit, live=self._tick)
            self._tick()
            self._phase = 'idle'
        except BaseException:
            self._phase = 'failed'
            raise

    @property
    def status(self):
        return self._phase

    @property
    def accounting(self):
        """Observed codec acknowledgements, including a poisoned attempt."""
        e = self._encoder
        if e is None:
            return None
        return dict(status=e.status, completed_pairs=e.completed_pairs,
                    attempted_records=e.attempted_records, attempted_bytes=e.attempted_bytes,
                    acknowledged_records=e.acknowledged_records, acknowledged_bytes=e.acknowledged_bytes,
                    pending_record=e.pending_record)

    def _counters(self):
        calls, geometry = self._adapter.call_counts, self._adapter.geometry_accounting
        _require(set(calls) in (set(COUNTERS), set(COUNTERS) | {'coverage_cache_entries'})
                 and set(geometry) == set(GEOMETRY), 'closed actual counters')
        result = tuple(calls[k] for k in COUNTERS), tuple(geometry[k] for k in GEOMETRY)
        _require(all(type(n) is int and n >= 0 for row in result for n in row), 'exact actual counters')
        return result

    def _cache_count(self):
        value = self._adapter.call_counts.get('coverage_cache_entries', 0)
        _require(type(value) is int and value >= 0, 'exact coverage cache count')
        return value

    def _observe(self):
        _require(self._phase != 'failed', 'poisoned streamed session')
        a, s = self._adapter, self._session
        _require(a.context is self._context and tuple(a.provenance) == self._provenance
                 and a.frames is self._frames and a.parents is self._parents, 'same adapter generation')
        _require(s.state is self._state and s.integral_reference is self._ref
                 and s.gk_protocol is self._protocol, 'same owned state and references')
        counts = self._counters()
        cache = self._cache_count()
        if not self._providing:
            _require(counts == self._expected and cache == self._expected_cache, 'intervening adapter work')
        return counts, cache

    def _external(self, callback, *args):
        before = self._observe()
        _require(not self._callback, 'reentrant callback')
        self._callback = True
        try:
            result = callback(*args)
            _require(self._observe() == before, 'callback performed adapter work')
            return result
        except BaseException:
            self._phase = 'failed'
            raise
        finally:
            self._callback = False

    def _tick(self):
        self._observe()
        if self._live is not None:
            self._external(self._live)
        self._observe()

    def _write(self, line):
        _require(type(line) is bytes and line.endswith(b'\n'), 'immutable complete wire line')
        self._observe()
        _require(not self._callback, 'reentrant callback')
        self._callback = True
        try:
            # Return the sink's observation unchanged. The frozen encoder counts
            # a None acknowledgement BEFORE its mandatory post-write _tick,
            # which rejects mutation or swallowed reentry without erasing it.
            return self._sink(line)
        except BaseException:
            self._phase = 'failed'
            raise
        finally:
            self._callback = False

    def _begin(self, phase):
        if self._phase != 'idle' or self._callback:
            self._phase = 'failed'
            raise ValueError('terminal, failed or reentrant streamed session')
        self._phase = phase

    def _claims(self):
        claims = to_wire(self._ref.Claims())
        _require(type(claims) is dict and claims and all(v is False for v in claims.values()), 'no scientific authority')
        return claims

    def _summary(self):
        return state_summary(self._protocol, self._state)

    def advance(self, progress=None):
        self._begin('advancing')
        try:
            _require(progress is None or callable(progress), 'optional progress callback')
            self._tick()
            old = self._state
            request = self._protocol.request(old)
            _require(request is not None, 'no outstanding request')
            _require(self._inherited+self._completed < self._protocol.MAX_EVALUATED_LEAVES, 'original cumulative leaf budget')

            def report(*args):
                self._tick()
                if progress is not None:
                    self._external(progress, *args)
                self._tick()

            self._providing = True
            try:
                provision = self._session.provide(old, report)
            finally:
                self._providing = False
            counts = self._counters()
            n = self._completed + 1
            deltas = provision.history_state_evaluations
            _require(type(deltas) is tuple and len(deltas) == 4 and all(type(x) is int and x > 0 for x in deltas), 'four observed geometry deltas')
            _require(counts == ((4*n, 4*n, 8*n, 0, 0), (4*n, 4*n, self._expected[1][2] + sum(deltas), 4*n)), 'exact genuine provision work')
            _require(provision.response.request is request, 'original provision request')
            self._expected = counts
            self._expected_cache = self._cache_count()
            self._tick()
            self._encoder.provision(self._completed, to_wire(provision))
            self._tick()
            state = self._session.advance(provision)
            _require(state is self._session.state and len(state.evaluations) == len(old.evaluations) + 1, 'one actual evaluation appended')
            evaluation = state.evaluations[-1]
            _require(evaluation.response is provision.response and evaluation.response.request is request, 'actual consumed evaluation identity')
            self._state = state
            self._tick()
            summary = self._summary()
            self._encoder.transition(self._completed, dict(evaluation=to_wire(evaluation), state_after=summary))
            self._tick()
            self._completed += 1
            self._deltas.extend(deltas)
            _require(len(self._deltas) <= 4*self._protocol.MAX_EVALUATED_LEAVES, 'bounded scalar geometry accounting')
            self._phase = 'idle'
            return summary
        except BaseException:
            self._phase = 'failed'
            raise

    def finish(self):
        self._begin('finishing')
        try:
            self._tick()
            summary = dict(final_state=self._summary(), call_counts=to_wire(tuple(zip(COUNTERS, self._expected[0]))),
                           geometry_accounting=to_wire(tuple(zip(GEOMETRY, self._expected[1]))),
                           history_state_evaluations=list(self._deltas), claims=self._claims())
            self._encoder.finish(summary)
            self._tick()
            receipt = dict(complete=True, accepted=False, completed_pairs=self._encoder.completed_pairs,
                           acknowledged_records=self._encoder.acknowledged_records, acknowledged_bytes=self._encoder.acknowledged_bytes)
            if self._inherited:
                receipt['logical_accounting'] = dict(inherited_pairs=self._inherited,
                    new_pairs=self._completed, total_pairs=self._inherited+self._completed,
                    replayed_gk_evaluations=self._inherited)
            self._phase = 'finished'
            return receipt
        except BaseException:
            self._phase = 'failed'
            raise
