"""Lossless bounded F6c wire records; no mathematics, filesystem or authority.

The caller converts records to inert JSON trees before using this module.
Decimal and rational tokens remain strings; floats are deliberately rejected.
Each record has a fresh, ordered, tagged value table. Only context and source
provenance may be shared across records. A sink accepts one immutable LF-ended
line synchronously by returning None. That acknowledgement is NOT durability.

Call provision before advancing the external session, then transition with its
complete evaluation and public state summary. Any error permanently poisons
the encoder. The decoder reports completion only when finish() explicitly
confirms EOF after a valid footer. Neither interface reconstructs a GK State,
executes a calculation, retries a request, or authorizes publication.
"""

import hashlib
import json
import re


SCHEMA = 'braid-program/f6c-leaf-evidence-stream.v1'
MAX_BYTES = 64 * 1024 * 1024
MAX_NODES = 1000000
MAX_DEPTH = 48
MAX_STRING_BYTES = 131072
MAX_ITEMS = 20000
SHARED_KEYS = ('context', 'source_provenance')
HEADER_KEYS = ('scope', 'accepted', 'protocol_plan', 'initial_state', 'metadataCensus',
               'spec', 'sourceBindings', 'runtimeBindings', 'pythonBodySha256',
               'clockTransfer', 'publicationRequires', 'claims')
SUMMARY_KEYS = ('final_state', 'call_counts', 'geometry_accounting',
                'history_state_evaluations', 'claims')
PROVISION_KEYS = ('schema', 'scope', 'context', 'source_provenance', 'response', 'ranges',
                  'correlated_residuals', 'call_counts', 'geometry_accounting',
                  'history_state_evaluations', 'claims')
REQUEST_KEYS = ('context', 'frame_index', 'domain', 'generation', 'path', 'node_neighborhoods')
EVALUATION_KEYS = ('response', 'cell', 'witnesses', 'diagnostics', 'integral_width', 'peak_upper_squared')
INTEGER = re.compile(r'(?:0|-[1-9][0-9]*|[1-9][0-9]*)\Z')


class CodecError(ValueError):
    pass


def _require(ok, message):
    if not ok:
        raise CodecError(message)


def _keys(value, names):
    _require(type(value) is dict and set(value) == set(names), 'closed fields differ')


def _json(value):
    return json.dumps(value, ensure_ascii=True, allow_nan=False,
                      separators=(',', ':')).encode('ascii')


def _equal(a, b):
    if type(a) is not type(b):
        return False
    if type(a) is dict:
        return list(a) == list(b) and all(_equal(a[k], b[k]) for k in a)
    if type(a) is list:
        return len(a) == len(b) and all(_equal(x, y) for x, y in zip(a, b))
    return a == b


def _snapshot(value):
    """Copy only exact builtins, bounding expanded structure before callbacks."""
    count = 0
    size = 0
    active = set()

    def visit(v, depth):
        nonlocal count, size
        count += 1
        _require(count <= MAX_NODES and depth <= MAX_DEPTH, 'expanded structure bound')
        t = type(v)
        if v is None or t in (bool, int, str):
            if t is int:
                _require(v.bit_length() <= 3402, 'integer digit bound')
                _require(len(str(v).lstrip('-')) <= 1024, 'integer decimal digit bound')
            if t is str:
                _require(len(v) <= MAX_STRING_BYTES, 'string bound')
                try:
                    _require(len(v.encode('utf-8')) <= MAX_STRING_BYTES, 'UTF8 string bound')
                except UnicodeError as exc:
                    raise CodecError('invalid Unicode string') from exc
            size += len(_json(v))
            _require(size <= MAX_BYTES, 'expanded byte bound')
            return v
        _require(t in (list, dict), 'inert JSON tree required; floats are unsupported')
        _require(id(v) not in active and len(v) <= MAX_ITEMS, 'cycle/container bound')
        active.add(id(v))
        size += 2 + max(0, len(v) - 1)
        try:
            if t is list:
                result = [visit(x, depth + 1) for x in v]
            else:
                result = {}
                for k, x in v.items():
                    _require(type(k) is str and len(k) <= 4096, 'object key bound')
                    visit(k, depth + 1)
                    size += 1
                    result[k] = visit(x, depth + 1)
            _require(size <= MAX_BYTES, 'expanded byte bound')
            return result
        finally:
            active.remove(id(v))

    return visit(value, 0)


def _shared(value):
    value = _snapshot(value)
    _keys(value, SHARED_KEYS)
    return value


def _claims(value):
    _require(type(value) is dict and value and all(type(k) is str and v is False
             for k, v in value.items()), 'all authority claims must remain false')


def _globals_match(value, shared):
    if type(value) is dict:
        for key, item in value.items():
            if key in SHARED_KEYS:
                _require(_equal(item, shared[key]), 'declared global value differs')
            else:
                _globals_match(item, shared)
    elif type(value) is list:
        for item in value:
            _globals_match(item, shared)


def _provision(value, shared):
    """Wire-shape checks only; no numerical or protocol-validity inference."""
    _keys(value, PROVISION_KEYS)
    _require(all(_equal(value[k], shared[k]) for k in SHARED_KEYS), 'provision globals differ')
    _keys(value['response'], ('request', 'members'))
    _keys(value['response']['request'], REQUEST_KEYS)
    _require(type(value['response']['members']) is list and len(value['response']['members']) == 8,
             'eight response members required')
    _require(type(value['ranges']) is list and len(value['ranges']) == 4, 'four complete ranges required')
    for item in value['ranges']:
        _keys(item, ('cell', 'ranges'))
        for key in ('cell', 'ranges'):
            _require(type(item[key]) is dict and type(item[key].get('rows')) is list
                     and len(item[key]['rows']) == 64, 'complete64-row range evidence required')
    _require(type(value['correlated_residuals']) is list and len(value['correlated_residuals']) == 8,
             'eight complete residuals required')
    _claims(value['claims'])
    _globals_match(value, shared)


def _encode(value, shared):
    nodes = []
    interned = {}

    def visit(v):
        node = None
        for name, global_value in shared.items():
            if _equal(v, global_value):
                node = ('g', name)
                break
        if node is None:
            t = type(v)
            if v is None:
                node = ('n',)
            elif t is bool:
                node = ('b', v)
            elif t is int:
                node = ('i', str(v))
            elif t is str:
                node = ('s', v)
            elif t is list:
                node = ('a', tuple(visit(x) for x in v))
            else:
                node = ('o', tuple((k, visit(x)) for k, x in v.items()))
        if node in interned:
            return interned[node]
        index = len(nodes)
        _require(index < MAX_ITEMS, 'DAG table node bound')
        interned[node] = index
        if node[0] == 'a':
            record = ['a', list(node[1])]
        elif node[0] == 'o':
            record = ['o', [[k, n] for k, n in node[1]]]
        else:
            record = list(node)
        nodes.append(record)
        return index

    root = visit(value)
    return dict(nodes=nodes, root=root)


def encode_dag(value, shared=None):
    """Encode one detached exact wire tree; no callbacks or cross-record cache."""
    return _encode(_snapshot(value), {} if shared is None else _shared(shared))


def decode_dag(record, shared=None):
    """Validate expansion costs BEFORE building fresh, non-aliased JSON trees."""
    record = _snapshot(record)
    globals_ = {} if shared is None else _shared(shared)
    _keys(record, ('nodes', 'root'))
    nodes, root = record['nodes'], record['root']
    _require(type(nodes) is list and 0 < len(nodes) <= MAX_ITEMS, 'DAG nodes')
    _require(type(root) is int and 0 <= root < len(nodes), 'DAG root')
    costs = []
    edges = []

    def stats(v):
        t = type(v)
        if t is dict:
            children = [stats(x) for x in v.values()]
            return (2 + max(0, len(v)-1) + sum(len(_json(k))+1 for k in v)
                    + sum(x[0] for x in children),
                    1 + len(v) + sum(x[1] for x in children),
                    max([1 if v else 0] + [1+x[2] for x in children]))
        if t is list:
            children = [stats(x) for x in v]
            return (2 + max(0, len(v)-1) + sum(x[0] for x in children),
                    1 + sum(x[1] for x in children),
                    max([0] + [1+x[2] for x in children]))
        return len(_json(v)), 1, 0

    global_costs = {name: stats(v) for name, v in globals_.items()}
    for index, node in enumerate(nodes):
        _require(type(node) is list and node and type(node[0]) is str, 'DAG node shape')
        tag = node[0]
        refs = []
        if tag == 'n':
            _require(len(node) == 1, 'null shape')
            cost = (4, 1, 0)
        elif tag in ('b', 'i', 's', 'g'):
            _require(len(node) == 2, 'scalar shape')
            value = node[1]
            if tag == 'b':
                _require(type(value) is bool, 'boolean type')
                cost = (4 if value else 5, 1, 0)
            elif tag == 'i':
                _require(type(value) is str and len(value.lstrip('-')) <= 1024
                         and INTEGER.fullmatch(value), 'canonical integer string')
                cost = (len(value), 1, 0)
            elif tag == 's':
                _require(type(value) is str, 'literal string type')
                cost = (len(_json(value)), 1, 0)
            else:
                _require(type(value) is str and value in globals_, 'unavailable global')
                cost = global_costs[value]
        else:
            _require(tag in ('a', 'o') and len(node) == 2
                     and type(node[1]) is list and len(node[1]) <= MAX_ITEMS, 'container shape')
            keys = []
            if tag == 'o':
                for pair in node[1]:
                    _require(type(pair) is list and len(pair) == 2 and type(pair[0]) is str
                             and len(pair[0]) <= 4096 and pair[0] not in keys, 'unique object keys')
                    keys.append(pair[0])
                    refs.append(pair[1])
            else:
                refs = node[1]
            _require(all(type(n) is int and 0 <= n < index for n in refs), 'strict backward references')
            children = [costs[n] for n in refs]
            cost = (2 + max(0, len(refs)-1) + sum(c[0] for c in children)
                    + (sum(len(_json(k))+1 for k in keys) if tag == 'o' else 0),
                    1 + len(keys) + sum(c[1] for c in children),
                    max([1 if keys else 0] + [1+c[2] for c in children]))
        _require(cost[0] <= MAX_BYTES and cost[1] <= MAX_NODES and cost[2] <= MAX_DEPTH,
                 'expanded DAG byte/node/depth bound')
        costs.append(cost)
        edges.append(refs)
    seen = set()
    todo = [root]
    while todo:
        n = todo.pop()
        if n not in seen:
            seen.add(n)
            todo.extend(edges[n])
    _require(len(seen) == len(nodes), 'unused DAG nodes')

    def build(n):
        node = nodes[n]
        tag = node[0]
        if tag == 'n': return None
        if tag == 'i': return int(node[1])
        if tag in ('b', 's'): return node[1]
        if tag == 'g': return _snapshot(globals_[node[1]])
        if tag == 'a': return [build(i) for i in node[1]]
        return {k: build(i) for k, i in node[1]}

    return build(root)


def _line(record, remaining):
    """Count and collect bounded chunks, never concatenate an entire run."""
    parts = bytearray()
    encoder = json.JSONEncoder(ensure_ascii=True, allow_nan=False, separators=(',', ':'))
    for text in encoder.iterencode(record):
        block = text.encode('ascii')
        _require(len(parts)+len(block)+1 <= remaining, 'aggregate stream byte limit')
        parts.extend(block)
    parts.append(10)
    return bytes(parts)


def _decode_line(line):
    _require(type(line) is bytes and 0 < len(line) <= MAX_BYTES and line.endswith(b'\n')
             and line.count(b'\n') == 1, 'one complete bounded NDJSON line')

    def pairs(items):
        result = {}
        for k, v in items:
            _require(k not in result, 'duplicate JSON key')
            result[k] = v
        return result

    def integer(token):
        _require(len(token) <= 20, 'wire index integer bound')
        value = int(token)
        _require(-(2**63) <= value <= 2**63-1, 'wire index signed64 bound')
        return value

    def reject(_):
        raise CodecError('wire floats/nonfinite numbers are unsupported')

    try:
        value = json.loads(line[:-1].decode('ascii'), object_pairs_hook=pairs,
                           parse_int=integer, parse_float=reject, parse_constant=reject)
    except (UnicodeError, RecursionError, json.JSONDecodeError) as exc:
        raise CodecError('invalid wire JSON') from exc
    value = _snapshot(value)
    _require(_json(value)+b'\n' == line, 'canonical wire JSON required')
    return value


class _Lifecycle:
    def _initialize(self, byte_limit, live):
        _require(type(byte_limit) is int and 0 < byte_limit <= MAX_BYTES, 'byte limit cannot expand')
        _require(live is None or callable(live), 'live callback')
        self._limit = byte_limit
        self._live = live if live is not None else lambda: None
        self._phase = 'new'
        self._busy = False
        self._hash = hashlib.sha256()
        self._bytes = 0
        self._pairs = 0
        self._response = None
        self._shared = None

    @property
    def status(self): return self._phase

    @property
    def acknowledged_bytes(self): return self._bytes

    @property
    def completed_pairs(self): return self._pairs

    def _enter(self):
        if self._busy or self._phase == 'failed':
            self._phase = 'failed'
            raise CodecError('failed or reentrant codec')
        self._busy = True

    def _check(self):
        self._live()
        _require(self._phase != 'failed', 'callback reentered codec')


class StreamEncoder(_Lifecycle):
    def __init__(self, shared, header, sink, *, byte_limit=MAX_BYTES, live=None):
        self._initialize(byte_limit, live)
        _require(callable(sink), 'synchronous sink required')
        self._sink = sink
        self.attempted_records = 0
        self.attempted_bytes = 0
        self.acknowledged_records = 0
        self.pending_record = None
        self._enter()
        try:
            self._shared = _shared(shared)
            header = _snapshot(header)
            _keys(header, HEADER_KEYS)
            _require(header['accepted'] is False, 'header cannot accept evidence')
            _claims(header['claims'])
            _globals_match(header, self._shared)
            self._emit(dict(kind='header', schema=SCHEMA,
                            shared=_encode(self._shared, {}), header=_encode(header, self._shared)))
            self._phase = 'ready'
        except BaseException:
            self._phase = 'failed'
            raise
        finally:
            self._busy = False

    def _emit(self, record):
        line = _line(record, self._limit-self._bytes)
        self.pending_record = line
        self._check()
        self.attempted_records += 1
        self.attempted_bytes += len(line)
        result = self._sink(line)
        _require(result is None, 'sink acknowledgement must return None')
        # A normal None return is the sink's acknowledgement, even if a later
        # guard poisons this attempt. Do not erase the observed accepted write.
        self._hash.update(line)
        self._bytes += len(line)
        self.acknowledged_records += 1
        self.pending_record = None
        self._check()

    def provision(self, index, value):
        self._enter()
        try:
            _require(self._phase == 'ready' and type(index) is int and index == self._pairs,
                     'next provision required')
            value = _snapshot(value)
            _provision(value, self._shared)
            self._emit(dict(kind='provision', index=index, dag=_encode(value, self._shared)))
            self._response = value['response']
            self._phase = 'pending'
        except BaseException:
            self._phase = 'failed'
            raise
        finally:
            self._busy = False

    def transition(self, index, value):
        self._enter()
        try:
            _require(self._phase == 'pending' and type(index) is int and index == self._pairs,
                     'matching transition required')
            value = _snapshot(value)
            _keys(value, ('evaluation', 'state_after'))
            _keys(value['evaluation'], EVALUATION_KEYS)
            _globals_match(value, self._shared)
            _require(type(value['evaluation']) is dict and 'response' in value['evaluation']
                     and _equal(value['evaluation']['response'], self._response), 'pending response differs')
            self._emit(dict(kind='transition', index=index, dag=_encode(value, self._shared)))
            self._response = None
            self._pairs += 1
            self._phase = 'ready'
        except BaseException:
            self._phase = 'failed'
            raise
        finally:
            self._busy = False

    def finish(self, summary):
        self._enter()
        try:
            _require(self._phase == 'ready', 'cannot finish pending/finished stream')
            summary = _snapshot(summary)
            _keys(summary, SUMMARY_KEYS)
            _claims(summary['claims'])
            _globals_match(summary, self._shared)
            self._emit(dict(kind='footer', complete=True, accepted=False, provisions=self._pairs,
                            transitions=self._pairs, prefix_bytes=self._bytes,
                            prefix_sha256=self._hash.hexdigest(), summary=_encode(summary, self._shared)))
            self._phase = 'finished'
        except BaseException:
            self._phase = 'failed'
            raise
        finally:
            self._busy = False


class StreamDecoder(_Lifecycle):
    def __init__(self, *, byte_limit=MAX_BYTES, live=None):
        self._initialize(byte_limit, live)

    @property
    def complete(self): return self._phase == 'finished'

    def feed(self, line):
        self._enter()
        try:
            _require(self._phase not in ('footer', 'finished'), 'record after footer/EOF')
            _require(type(line) is bytes and len(line) <= self._limit-self._bytes,
                     'aggregate stream byte limit')
            self._check()
            record = _decode_line(line)
            _require(type(record) is dict, 'record envelope required')
            kind = record.get('kind')
            if kind == 'header':
                _keys(record, ('kind', 'schema', 'shared', 'header'))
                _require(self._phase == 'new' and record['schema'] == SCHEMA, 'one initial header')
                self._shared = _shared(decode_dag(record['shared']))
                value = decode_dag(record['header'], self._shared)
                _keys(value, HEADER_KEYS)
                _require(value['accepted'] is False, 'header authority')
                _claims(value['claims'])
                _globals_match(value, self._shared)
                result = dict(kind=kind, shared=_snapshot(self._shared), header=value)
                next_phase = 'ready'
            elif kind in ('provision', 'transition'):
                _keys(record, ('kind', 'index', 'dag'))
                _require(type(record['index']) is int and record['index'] == self._pairs, 'sequential record index')
                value = decode_dag(record['dag'], self._shared)
                _globals_match(value, self._shared)
                if kind == 'provision':
                    _require(self._phase == 'ready', 'next provision required')
                    _provision(value, self._shared)
                    self._response = _snapshot(value['response'])
                    next_phase = 'pending'
                else:
                    _require(self._phase == 'pending', 'transition without provision')
                    _keys(value, ('evaluation', 'state_after'))
                    _keys(value['evaluation'], EVALUATION_KEYS)
                    _require(type(value['evaluation']) is dict and 'response' in value['evaluation']
                             and _equal(value['evaluation']['response'], self._response), 'pending response differs')
                    self._response = None
                    self._pairs += 1
                    next_phase = 'ready'
                result = dict(kind=kind, index=record['index'], value=value)
            elif kind == 'footer':
                _keys(record, ('kind', 'complete', 'accepted', 'provisions', 'transitions',
                               'prefix_bytes', 'prefix_sha256', 'summary'))
                _require(self._phase == 'ready' and record['complete'] is True
                         and record['accepted'] is False, 'footer disposition')
                _require(all(type(record[k]) is int and record[k] == self._pairs
                             for k in ('provisions', 'transitions')), 'footer record census')
                _require(type(record['prefix_bytes']) is int and record['prefix_bytes'] == self._bytes
                         and record['prefix_sha256'] == self._hash.hexdigest(), 'footer prefix identity')
                summary = decode_dag(record['summary'], self._shared)
                _keys(summary, SUMMARY_KEYS)
                _claims(summary['claims'])
                _globals_match(summary, self._shared)
                result = dict(kind=kind, summary=summary, complete=False, accepted=False)
                next_phase = 'footer'
            else:
                raise CodecError('unknown envelope kind')
            self._check()
            self._hash.update(line)
            self._bytes += len(line)
            self._phase = next_phase
            return result
        except BaseException:
            self._phase = 'failed'
            raise
        finally:
            self._busy = False

    def finish(self):
        """Caller declares EOF; a decoded footer alone is not completion."""
        self._enter()
        try:
            _require(self._phase == 'footer', 'EOF requires a complete footer')
            self._check()
            self._phase = 'finished'
            return dict(complete=True, accepted=False, pairs=self._pairs,
                        bytes=self._bytes, sha256=self._hash.hexdigest())
        except BaseException:
            self._phase = 'failed'
            raise
        finally:
            self._busy = False
