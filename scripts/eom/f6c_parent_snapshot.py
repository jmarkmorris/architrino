"""Bounded inert whole-parent snapshot storage, with no acceptance authority.

The caller independently fixes the base, its acceptance, and the virtual output
descriptor. All physical bytes come from an explicit callback. This module has
no filesystem, process, provider, scientific import or replay-state authority.
Frozen contract: parent-snapshot-overlay-independent-expectations.md b2943533.
"""
from __future__ import annotations

import codecs
from dataclasses import dataclass
import hashlib
import json


MAX_DATA_BYTES = 64 * 1024**2
MAX_MANIFEST_BYTES = 16 * 1024**2
MAX_SOURCE_BYTES = 1024**3
MAX_FILES = 512
MAX_NODES = 1_000_000
MAX_DEPTH = 48
MAX_ITEMS = 20_000
MAX_STRING_BYTES = 8 * 1024**2
CHUNK = 4096
BLOCK_SCHEMA = 'braid-program/f6c-whole-parent-overrides.v1'
MANIFEST_SCHEMA = 'braid-program/f6c-parent-snapshot-overlay.v1'
ENCODING = 'f6c-parent-wire-ascii-sorted-json-lf.v1'


def _require(value, message):
    if not value:
        raise ValueError(message)


def _keys(value, names):
    _require(type(value) is dict and all(type(k) is str for k in value)
             and set(value) == set(names), 'closed exact fields')


def _integer(value, lo, hi):
    _require(type(value) is int and lo <= value <= hi, 'bounded exact integer')
    return value


def _digest(value):
    _require(type(value) is str and len(value) == 64
             and all(c in '0123456789abcdef' for c in value), 'lowercase SHA256')


def _binding(value):
    _keys(value, ('path', 'sha256', 'bytes'))
    path = value['path']
    _require(type(path) is str and 1 < len(path) <= 2048 and path.startswith('/')
             and '\0' not in path and '\\' not in path
             and not any(0xD800 <= ord(c) <= 0xDFFF for c in path)
             and all(p not in ('', '.', '..') for p in path.split('/')[1:]),
             'canonical absolute physical path')
    _digest(value['sha256'])
    _integer(value['bytes'], 1, MAX_SOURCE_BYTES)
    return {k: value[k] for k in ('path', 'sha256', 'bytes')}


def _descriptor(value):
    _keys(value, ('encoding', 'sha256', 'bytes', 'parentCount', 'rowsPerParent'))
    _require(value['encoding'] == ENCODING and type(value['encoding']) is str,
             'virtual encoding')
    _digest(value['sha256'])
    _integer(value['bytes'], 1, MAX_DATA_BYTES)
    _integer(value['parentCount'], 160, 160)
    _integer(value['rowsPerParent'], 64, 64)
    return dict(value)


class _Budget:
    def __init__(self, live):
        _require(live is None or callable(live), 'explicit live callback')
        self.live = live if live is not None else lambda: None
        self.nodes = self.work = 0
        self.live()

    def node(self, depth):
        self.nodes += 1
        _require(depth <= MAX_DEPTH and self.nodes <= MAX_NODES, 'JSON structure limit')
        self.tick()

    def tick(self, amount=1):
        self.work += amount
        if self.work >= CHUNK:
            self.work = 0
            self.live()


def _integer_chunks(value, budget):
    """Avoid changing Python's process-global integer conversion limit."""
    if value < 0:
        yield b'-'
        value = -value
    # An input integer cannot force an over-limit temporary decimal buffer.
    _require((value.bit_length() * 30103) // 100000 <= MAX_DATA_BYTES,
             'integer byte limit')
    parts = []
    while value >= 10**9:
        value, tail = divmod(value, 10**9)
        parts.append(str(tail).zfill(9))
        budget.tick(CHUNK)
    yield str(value).encode('ascii')
    for piece in reversed(parts):
        budget.tick()
        yield piece.encode('ascii')


def _canonical_chunks(value, live, maximum_bytes, *, node_budget=None):
    _integer(maximum_bytes, 1, MAX_DATA_BYTES)
    budget = _Budget(live) if node_budget is None else node_budget
    active = set()
    total = 0

    def emit(raw):
        nonlocal total
        total += len(raw)
        _require(total <= maximum_bytes, 'expanded canonical byte limit')
        budget.tick(len(raw))
        return raw

    def string(text):
        _require(len(text) <= MAX_STRING_BYTES, 'string byte limit')
        yield emit(b'"')
        size = 0
        for start in range(0, len(text), CHUNK):
            part = text[start:start + CHUNK]
            _require(not any(0xD800 <= ord(c) <= 0xDFFF for c in part), 'surrogate code point')
            size += len(part.encode('utf-8'))
            _require(size <= MAX_STRING_BYTES, 'string byte limit')
            # Small string chunks bound the only standard-library JSON operation.
            yield emit(json.dumps(part, ensure_ascii=True)[1:-1].encode('ascii'))
            budget.live()
        yield emit(b'"')

    def visit(item, depth):
        budget.node(depth)
        kind = type(item)
        if item is None:
            yield emit(b'null')
        elif kind is bool:
            yield emit(b'true' if item else b'false')
        elif kind is int:
            for raw in _integer_chunks(item, budget):
                yield emit(raw)
        elif kind is str:
            yield from string(item)
        else:
            _require(kind in (list, dict), 'inert JSON types only')
            _require(id(item) not in active and len(item) <= MAX_ITEMS, 'container limit or cycle')
            active.add(id(item))
            try:
                if kind is list:
                    yield emit(b'[')
                    for n, child in enumerate(item):
                        if n:
                            yield emit(b',')
                        yield from visit(child, depth + 1)
                    yield emit(b']')
                else:
                    _require(all(type(k) is str and k.isascii() for k in item), 'ASCII object keys only')
                    budget.live()
                    names = sorted(item)
                    budget.live()
                    yield emit(b'{')
                    for n, name in enumerate(names):
                        if n:
                            yield emit(b',')
                        yield from visit(name, depth + 1)
                        yield emit(b':')
                        yield from visit(item[name], depth + 1)
                    yield emit(b'}')
            finally:
                active.remove(id(item))

    yield from visit(value, 0)
    yield emit(b'\n')
    budget.live()


def canonical_bytes(value, *, live=None, maximum_bytes=MAX_DATA_BYTES):
    """Encode bounded inert data with the frozen exact canonical JSON spelling."""
    return b''.join(_canonical_chunks(value, live, maximum_bytes))


class _Parser:
    """Small JSON parser: capacities are checked during, not after, expansion."""
    def __init__(self, text, live):
        self.text = text
        self.at = 0
        self.budget = _Budget(live)

    def space(self):
        while self.at < len(self.text) and self.text[self.at] in ' \t\r\n':
            self.at += 1
            self.budget.tick()

    def string(self):
        _require(self.text[self.at:self.at + 1] == '"', 'JSON string required')
        self.at += 1
        parts, size = [], 0

        def append(part):
            nonlocal size
            size += len(part.encode('utf-8'))
            _require(size <= MAX_STRING_BYTES, 'string byte limit')
            parts.append(part)

        while self.at < len(self.text):
            start = self.at
            stop = min(start + CHUNK, len(self.text))
            while self.at < stop:
                char = self.text[self.at]
                if char in '"\\':
                    break
                _require(ord(char) >= 32 and not 0xD800 <= ord(char) <= 0xDFFF,
                         'JSON string scalar')
                self.at += 1
            if self.at > start:
                append(self.text[start:self.at])
            self.budget.live()
            _require(self.at < len(self.text), 'unterminated JSON string')
            char = self.text[self.at]
            if char == '"':
                self.at += 1
                return ''.join(parts)
            if char != '\\':
                continue
            self.at += 1
            _require(self.at < len(self.text), 'unfinished JSON escape')
            escape = self.text[self.at]
            self.at += 1
            simple = {'"': '"', '\\': '\\', '/': '/', 'b': '\b', 'f': '\f',
                      'n': '\n', 'r': '\r', 't': '\t'}
            if escape in simple:
                append(simple[escape])
                continue
            _require(escape == 'u', 'invalid JSON escape')

            def codepoint():
                raw = self.text[self.at:self.at + 4]
                _require(len(raw) == 4 and all(c in '0123456789abcdefABCDEF' for c in raw),
                         'invalid Unicode escape')
                self.at += 4
                return int(raw, 16)

            code = codepoint()
            if 0xD800 <= code <= 0xDBFF:
                _require(self.text[self.at:self.at + 2] == '\\u', 'unpaired surrogate')
                self.at += 2
                low = codepoint()
                _require(0xDC00 <= low <= 0xDFFF, 'unpaired surrogate')
                code = 0x10000 + ((code - 0xD800) << 10) + low - 0xDC00
            else:
                _require(not 0xDC00 <= code <= 0xDFFF, 'unpaired surrogate')
            append(chr(code))
        raise ValueError('unterminated JSON string')

    def value(self, depth=0):
        self.space()
        self.budget.node(depth)
        _require(self.at < len(self.text), 'missing JSON value')
        char = self.text[self.at]
        if char == '"':
            return self.string()
        if char in '[{':
            is_object = char == '{'
            result = {} if is_object else []
            close = '}' if is_object else ']'
            self.at += 1
            self.space()
            if self.text[self.at:self.at + 1] == close:
                self.at += 1
                return result
            while True:
                _require(len(result) < MAX_ITEMS, 'container item limit')
                if is_object:
                    self.space()
                    self.budget.node(depth + 1)
                    name = self.string()
                    _require(name.isascii() and name not in result, 'non-ASCII or duplicate object key')
                    self.space()
                    _require(self.text[self.at:self.at + 1] == ':', 'missing JSON colon')
                    self.at += 1
                    result[name] = self.value(depth + 1)
                else:
                    result.append(self.value(depth + 1))
                self.space()
                delimiter = self.text[self.at:self.at + 1]
                _require(delimiter in (close, ','), 'missing JSON delimiter')
                self.at += 1
                if delimiter == close:
                    return result
        for token, result in (('true', True), ('false', False), ('null', None)):
            if self.text.startswith(token, self.at):
                self.at += len(token)
                return result
        negative = char == '-'
        if negative:
            self.at += 1
        start = self.at
        _require(self.at < len(self.text) and self.text[self.at] in '0123456789',
                 'integer JSON number required')
        if self.text[self.at] == '0':
            self.at += 1
        else:
            while self.at < len(self.text) and self.text[self.at] in '0123456789':
                self.at += 1
                self.budget.tick()
        end = self.at
        _require(self.at == len(self.text) or self.text[self.at] in ' \t\r\n,]}',
                 'fractional, exponent or malformed JSON number')
        result = 0
        for position in range(start, end, 9):
            part = self.text[position:min(position + 9, end)]
            result = result * (10**len(part)) + int(part)
            self.budget.tick(CHUNK)
        return -result if negative else result


def decode_bytes(raw, *, canonical=False, live=None, maximum_bytes=MAX_DATA_BYTES):
    """Parse exact inert bytes with incremental lexical/structural limits."""
    _integer(maximum_bytes, 1, MAX_DATA_BYTES)
    _require(type(canonical) is bool and type(raw) is bytes and 0 < len(raw) <= maximum_bytes,
             'bounded exact JSON bytes')
    budget = _Budget(live)
    decoder = codecs.getincrementaldecoder('utf-8')('strict')
    pieces = []
    try:
        for at in range(0, len(raw), CHUNK):
            pieces.append(decoder.decode(raw[at:at + CHUNK], False))
            budget.live()
        pieces.append(decoder.decode(b'', True))
        parser = _Parser(''.join(pieces), budget.live)
        value = parser.value()
        parser.space()
        _require(parser.at == len(parser.text), 'trailing JSON bytes')
        if canonical:
            at = 0
            for chunk in _canonical_chunks(value, budget.live, maximum_bytes):
                _require(raw[at:at + len(chunk)] == chunk, 'noncanonical JSON bytes')
                at += len(chunk)
            _require(at == len(raw), 'canonical EOF')
        budget.live()
        return value
    except (UnicodeError, OverflowError, RecursionError) as error:
        raise ValueError('invalid bounded JSON') from error


def _hash(raw, live):
    digest = hashlib.sha256()
    for at in range(0, len(raw), CHUNK):
        live()
        digest.update(raw[at:at + CHUNK])
    live()
    return digest.hexdigest()


def _same(left, right, budget, depth=0):
    budget.tick()
    _require(depth <= MAX_DEPTH, 'comparison depth')
    if type(left) is not type(right):
        return False
    if type(left) is dict:
        return (left.keys() == right.keys()
                and all(_same(left[k], right[k], budget, depth + 1) for k in left))
    if type(left) is list:
        return (len(left) == len(right)
                and all(_same(a, b, budget, depth + 1) for a, b in zip(left, right)))
    if type(left) is str:
        if len(left) != len(right):
            return False
        for at in range(0, len(left), CHUNK):
            budget.tick(CHUNK)
            if left[at:at + CHUNK] != right[at:at + CHUNK]:
                return False
        return True
    return left == right


def _parent(value, expected_index=None):
    _keys(value, ('index', 'reception', 'rows', 'bindings', 'refined'))
    index = _integer(value['index'], 0, 159)
    _require(expected_index is None or index == expected_index, 'original parent index')
    _require(type(value['refined']) is bool, 'exact refined flag')
    _keys(value['reception'], ('lower', 'upper'))
    _require(all(type(v) is str for v in value['reception'].values()), 'exact reception string tokens')
    _require(type(value['rows']) is list and len(value['rows']) == 64
             and all(type(row) is dict for row in value['rows']), 'complete 64-row parent')
    _require(type(value['bindings']) is list and 0 < len(value['bindings']) <= MAX_ITEMS
             and all(type(b) is dict for b in value['bindings']), 'nonempty inert binding records')
    return index


@dataclass(frozen=True, slots=True)
class Snapshot:
    """Plain reconstructed data and a physical census, never an acceptance."""
    parents: list
    physical_bindings: tuple
    materialized: dict


def materialize_snapshot(manifest_binding, read_binding, *, expected_base,
                         expected_materialized, expected_consumed=None, live=None):
    """Reconstruct one full parent list from explicit, independently fixed data.

    read_binding receives a fresh exact Binding dict and returns exact bytes.
    Physical census order is manifest, base, base acceptance, then first block
    use in numeric parent order. No original input object is modified or shared
    in the result; no semantic refinement/acceptance claim is made here.
    """
    budget = _Budget(live)
    _require(callable(read_binding), 'explicit byte reader')
    manifest_binding = _binding(manifest_binding)
    _keys(expected_base, ('parents', 'acceptance'))
    base = {k: _binding(expected_base[k]) for k in ('parents', 'acceptance')}
    expected = _descriptor(expected_materialized)
    # Freeze caller-owned supplemental records before invoking any read callback.
    consumed = {}
    if expected_consumed is not None:
        _require(type(expected_consumed) is dict and len(expected_consumed) <= 160,
                 'bounded exact consumed map')
        used = 0
        consumed_nodes = _Budget(budget.live)
        for index, parent in expected_consumed.items():
            _integer(index, 0, 159)
            _parent(parent, index)
            # Keep bounded canonical bytes, not a second expanded full parent
            # graph. Share the structural budget across this supplemental map.
            raw = b''.join(_canonical_chunks(parent, budget.live, MAX_DATA_BYTES,
                                            node_budget=consumed_nodes))
            used += len(raw)
            _require(used <= MAX_DATA_BYTES, 'consumed expansion limit')
            consumed[index] = raw

    physical, source_bytes = {}, 0

    def read(binding, limit):
        nonlocal source_bytes
        b = _binding(binding)
        _require(b['bytes'] <= limit, 'individual source byte limit')
        path = b['path']
        if path in physical:
            _require(physical[path] == b, 'conflicting physical binding')
        else:
            _require(len(physical) < MAX_FILES and source_bytes + b['bytes'] <= MAX_SOURCE_BYTES,
                     'unique physical source limit')
            physical[path] = b
            source_bytes += b['bytes']
        budget.live()
        raw = read_binding(dict(b))
        _require(type(raw) is bytes and len(raw) == b['bytes'], 'callback byte length')
        _require(_hash(raw, budget.live) == b['sha256'], 'callback byte digest')
        return raw

    manifest = decode_bytes(read(manifest_binding, MAX_MANIFEST_BYTES), canonical=True,
                            live=budget.live, maximum_bytes=MAX_MANIFEST_BYTES)
    _keys(manifest, ('schema', 'base', 'overrides', 'materialized'))
    _require(manifest['schema'] == MANIFEST_SCHEMA, 'manifest schema')
    _keys(manifest['base'], ('parents', 'acceptance'))
    for k in base:
        _require(_binding(manifest['base'][k]) == base[k], 'externally fixed base binding')
    _require(_descriptor(manifest['materialized']) == expected, 'externally fixed virtual descriptor')
    overrides = manifest['overrides']
    _require(type(overrides) is list and len(overrides) <= 160, 'bounded override selections')
    prior, selections = -1, {}
    for selection in overrides:
        _keys(selection, ('parentIndex', 'block'))
        index = _integer(selection['parentIndex'], 0, 159)
        _require(index > prior, 'strict numeric override order')
        b = _binding(selection['block'])
        if b['path'] not in selections:
            selections[b['path']] = (b, [])
        _require(selections[b['path']][0] == b, 'conflicting physical binding')
        selections[b['path']][1].append(index)
        prior = index

    parents = decode_bytes(read(base['parents'], MAX_DATA_BYTES), live=budget.live)
    _require(type(parents) is list and len(parents) == 160, 'complete original parent list')
    for index, parent in enumerate(parents):
        budget.live()
        _parent(parent, index)
    # The external acceptance is inert source bytes, not an alternate authority.
    read(base['acceptance'], MAX_DATA_BYTES)
    # Read each distinct block once, retain selected parents only, and never keep
    # the source union's raw bytes or all unselected block siblings in a cache.
    for b, selected in selections.values():
        budget.live()
        raw = read(b, MAX_DATA_BYTES)
        block = decode_bytes(raw, canonical=True, live=budget.live)
        _keys(block, ('schema', 'parents'))
        _require(block['schema'] == BLOCK_SCHEMA and type(block['parents']) is list
                 and 0 < len(block['parents']) <= 160, 'override block schema')
        by_index = {}
        for parent in block['parents']:
            budget.live()
            index = _parent(parent)
            _require(index not in by_index, 'duplicate block parent index')
            by_index[index] = parent
        for index in selected:
            _require(index in by_index, 'selected whole parent missing')
            replacement = by_index[index]
            _require(_same(replacement['reception'], parents[index]['reception'], budget),
                     'unchanged original reception')
            _require(not _same(replacement, parents[index], budget), 'redundant base replacement')
            # This list is newly parsed in this call, not a caller-owned cache.
            parents[index] = replacement
        del raw, block, by_index
    for index, expected_raw in consumed.items():
        budget.live()
        offset = 0
        for raw in _canonical_chunks(parents[index], budget.live, MAX_DATA_BYTES):
            _require(expected_raw[offset:offset + len(raw)] == raw, 'consumed original parent changed')
            offset += len(raw)
        _require(offset == len(expected_raw), 'consumed original parent changed')
    digest, size = hashlib.sha256(), 0
    for raw in _canonical_chunks(parents, budget.live, MAX_DATA_BYTES):
        digest.update(raw)
        size += len(raw)
    actual = dict(encoding=ENCODING, sha256=digest.hexdigest(), bytes=size,
                  parentCount=160, rowsPerParent=64)
    _require(actual == expected, 'reconstructed virtual bytes differ')
    budget.live()
    return Snapshot(parents, tuple(dict(b) for b in physical.values()), actual)
