"""Pure closed inventory transport, not source or scientific admission.

The caller supplies exact inventory bytes and separately admitted closure bytes,
plus an immutable tuple of independently reviewed instrument bindings. This
module performs no filesystem, process, provider or numerical work. It returns
the frozen package module's ExpectedMember tuple, after semantic crosslinks and
complete-original-tuple deduplication checks. Physical hashes/identities and
actual independent authorship/process closure remain caller obligations.
"""
from __future__ import annotations

import hashlib
import json
import re


ROLES = frozenset('plan manifest comparison operation launcher_log resource_log queries rows pieces producer_stdout producer_stderr comparison_stdout comparison_stderr'.split())
OWNER_SUFFIX = '/reference/priorities/braid-program/evidence/2026-08-27-braid-search-launch-readiness.md'
FAMILY = frozenset('retainedHistory reconstruction fullCoverPlan fullCoverManifest fullCoverComparison fullCoverOperation'.split())
CONTEXT = frozenset('family source_generation_sha256 frame_generation_sha256 field_speed coupling ruler'.split())
REFINEMENT = dict(precision=90, fieldSpeed='1', coupling='10.304229970992187', ruler='0.5320012303229503', speedBound='0.85', clearance='0.27', lowerQueriesPerPair=32, upperQueriesPerPair=32, upperSearchRestartsFromOriginal=True, receptionSubdivision=False, automaticRetry=False)
LADDER = (('0.002','0.005','0.000005'), ('0.001','0.0025','0.0000025'), ('0.0005','0.00125','0.00000125'))
MAX_RAW = 16_777_216
MAX_AGGREGATE_RAW = 67_108_864
SHA = re.compile(r'[0-9a-f]{64}\Z')
UINT = re.compile(r'(?:0|[1-9][0-9]{0,38})\Z')
DECIMAL = re.compile(r'[+-]?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)(?:[eE][+-]?[0-9]+)?\Z')


def require(ok, message):
    if not ok:
        raise ValueError(message)


def keys(value, names):
    require(type(value) is dict and set(value) == set(names), 'closed fields')


def integer(value, low, high):
    require(type(value) is int and low <= value <= high, 'bounded integer')
    return value


def canonical(value):
    return json.dumps(value, sort_keys=True, separators=(',', ':'), ensure_ascii=True, allow_nan=False).encode('ascii') + b'\n'


def path(value):
    require(type(value) is str and 1 < len(value) <= 2048 and value.startswith('/') and not value.startswith('//')
            and '\0' not in value and '\\' not in value and all(p not in ('', '.', '..') for p in value.split('/')[1:]), 'canonical absolute path')
    return value


def binding(value):
    keys(value, ('path', 'sha256', 'bytes'))
    path(value['path'])
    require(type(value['sha256']) is str and SHA.fullmatch(value['sha256']), 'binding digest')
    integer(value['bytes'], 1, 1_073_741_824)
    return value


def key(value):
    binding(value)
    return value['path'], value['sha256'], value['bytes']


def identity(value, size):
    keys(value, ('device', 'inode', 'bytes', 'mtimeNs', 'ctimeNs'))
    require(all(type(v) is str and UINT.fullmatch(v) for v in value.values()), 'canonical identity strings')
    require(int(value['bytes']) == size, 'identity byte count')
    require(all(int(v) < 1 << 128 for v in value.values()), 'identity bound')
    return tuple(int(value[k]) for k in ('device', 'inode', 'bytes', 'mtimeNs', 'ctimeNs'))


def _pairs(rows):
    result = {}
    for k, v in rows:
        require(k not in result, 'duplicate JSON key')
        result[k] = v
    return result


def _forbidden(_):
    raise ValueError('noninteger JSON number')


def decode(raw, expected):
    binding(expected)
    require(type(raw) is bytes and 0 < len(raw) <= MAX_RAW and len(raw) == expected['bytes']
            and hashlib.sha256(raw).hexdigest() == expected['sha256'], 'external raw binding')
    try:
        value = json.loads(raw.decode('ascii'), object_pairs_hook=_pairs, parse_float=_forbidden, parse_constant=_forbidden)
        require(canonical(value) == raw, 'canonical JSON plus exactly one LF required')
    except (UnicodeError, RecursionError, OverflowError) as exc:
        raise ValueError('bounded canonical JSON') from exc
    stack = [(value, 0)]; count = 0
    while stack:
        item, depth = stack.pop(); count += 1
        require(depth <= 32 and count <= 500_000, 'JSON structural bound')
        if type(item) is dict:
            require(len(item) <= 4096, 'JSON object bound'); stack.extend((v, depth + 1) for v in item.values())
        elif type(item) is list:
            require(len(item) <= 4096, 'JSON array bound'); stack.extend((v, depth + 1) for v in item)
        elif type(item) is str:
            require(len(item) <= 4096, 'JSON string bound')
    return value


def same(a, b):
    # Python's True == 1 must never admit an altered closed declaration.
    return type(a) is type(b) and (all(k in b and same(v, b[k]) for k, v in a.items()) and len(a) == len(b) if type(a) is dict else
                                 len(a) == len(b) and all(same(x, y) for x, y in zip(a, b)) if type(a) is list else a == b)


def settings(value):
    keys(value['family'], FAMILY)
    for b in value['family'].values(): binding(b)
    c = value['context']; keys(c, CONTEXT)
    require(type(c['family']) is str and 0 < len(c['family']) <= 256, 'family token')
    require(all(type(c[k]) is str and SHA.fullmatch(c[k]) for k in ('source_generation_sha256', 'frame_generation_sha256')), 'context generations')
    require((c['field_speed'], c['coupling'], c['ruler']) == ('1', '10.304229970992187', '0.5320012303229503'), 'fixed context')
    require(c['source_generation_sha256'] == value['family']['retainedHistory']['sha256'], 'retained-history generation')
    n = value['numericalSettings']; keys(n, ('declaration','settingIndex','step','historySegmentStep','rootTolerance')); binding(n['declaration'])
    i = integer(n['settingIndex'], 0, 2)
    require((n['step'], n['historySegmentStep'], n['rootTolerance']) == LADDER[i], 'frozen setting ladder')
    require(same(value['refinementSettings'], REFINEMENT), 'unchanged refinement settings')


def parent_metadata(p):
    integer(p['parentIndex'], 1, 159); integer(p['frameIndex'], 0, 79)
    keys(p['reception'], ('lower', 'upper'))
    require(all(type(v) is str and 0 < len(v) <= 1100 and DECIMAL.fullmatch(v) for v in p['reception'].values()), 'original finite-decimal tokens')
    require(type(p['historyGenerationSha256']) is str and SHA.fullmatch(p['historyGenerationSha256']), 'parent composite history generation')
    keys(p['roles'], ROLES)


def parse_inventory(raw, expected_binding, package_module, *, admitted_closures, expected_authority):
    """Return immutable member expectations; never open/approve physical files."""
    require(type(expected_authority) is tuple and 0 < len(expected_authority) <= 159, 'explicit immutable independent authority required')
    authority = tuple(key(b) for b in expected_authority)
    require(len(set(authority)) == len(authority), 'duplicate authority')
    require(type(admitted_closures) is tuple and 0 < len(admitted_closures) <= 159, 'immutable admitted closures required')
    inventory = decode(raw, expected_binding)
    keys(inventory, ('schema','scope','family','context','numericalSettings','refinementSettings','currentAcceptanceOwner','parents','objects','totals','independentAcceptances'))
    require(inventory['schema'] == 'braid-program/accepted-parent-evidence-inventory.v2' and inventory['scope'] == 'lossless-closed-parent-evidence-only', 'inventory scope')
    settings(inventory)
    owner = inventory['currentAcceptanceOwner']; keys(owner, ('binding', 'identity')); binding(owner['binding'])
    require(owner['binding']['path'].endswith(OWNER_SUFFIX), 'direct canonical current owner')
    current_identity = identity(owner['identity'], owner['binding']['bytes'])
    parents, objects = inventory['parents'], inventory['objects']
    require(type(parents) is list and 0 < len(parents) <= 159 and type(objects) is list and 0 < len(objects) <= 4096, 'bounded inventory tables')
    snapshots = {}; used_snapshot_parents = set(); aggregate = len(raw)
    for admitted in admitted_closures:
        keys(admitted, ('binding','raw','expectedInstrument'))
        instrument = key(admitted['expectedInstrument']); require(instrument in authority, 'instrument absent from externally reviewed authority')
        b = admitted['binding']; k = key(b); require(k not in snapshots, 'duplicate admitted snapshot')
        require(type(admitted['raw']) is bytes, 'inert snapshot bytes'); aggregate += len(admitted['raw'])
        require(aggregate <= MAX_AGGREGATE_RAW, 'aggregate raw byte bound')
        snapshot = decode(admitted['raw'], b)
        keys(snapshot, ('schema','instrument','family','context','numericalSettings','refinementSettings','operation','invocation','closure','parents'))
        require(snapshot['schema'] == 'braid-program/accepted-parent-closure-snapshot.v1' and key(snapshot['instrument']) == instrument, 'snapshot instrument binding')
        for field in ('family','context','numericalSettings','refinementSettings'):
            require(same(snapshot[field], inventory[field]), 'externally admitted '+field+' differs')
        binding(snapshot['operation']); binding(snapshot['invocation'])
        closure = snapshot['closure']; keys(closure, ('authority','evidence','finalCaller','originalCallerSession','finalCompletionChunk','exitCode','processesClosed','independentAuditAccepted'))
        binding(closure['evidence']); integer(closure['exitCode'], 0, 0)
        require(closure['processesClosed'] is True and closure['independentAuditAccepted'] is True, 'closed independently admitted operation required')
        require(all(type(closure[f]) is str and 0 < len(closure[f]) <= 256 for f in ('originalCallerSession','finalCompletionChunk')), 'original caller attribution')
        if closure['authority'] == 'historical-attribution':
            require(closure['finalCaller'] is None and closure['evidence']['path'].endswith(OWNER_SUFFIX), 'historical owner attribution')
        else:
            require(closure['authority'] == 'fresh-independent-closure', 'known closure authority'); binding(closure['finalCaller'])
        rows = snapshot['parents']; require(type(rows) is list and 0 < len(rows) <= 159, 'snapshot parent bound')
        indexed = {}; previous = 0
        for p in rows:
            keys(p, ('parentIndex','frameIndex','reception','historyGenerationSha256','roles','acceptanceOwner','comparisonInstrument'))
            parent_metadata(p)
            require(p['parentIndex'] > previous, 'ordered unique snapshot parents'); previous = p['parentIndex']
            for role in ROLES: binding(p['roles'][role])
            binding(p['acceptanceOwner']); binding(p['comparisonInstrument'])
            require(same(p['roles']['operation'], snapshot['operation']), 'parent operation crosslink')
            if closure['authority'] == 'historical-attribution':
                require(same(p['acceptanceOwner'], closure['evidence']), 'historical closure owner crosslink')
            indexed[p['parentIndex']] = p
        snapshots[k] = indexed
    table = {}; logical = {}; physical = set(); inodes = {current_identity[:2]}; prior_name = ''
    for obj in objects:
        keys(obj, ('memberName','role','parentIndex','original','physicalPath','identity'))
        name = obj['memberName']; require(type(name) is str and prior_name < name, 'lexically ordered unique objects'); prior_name = name
        k = key(obj['original']); require(k not in logical, 'duplicate original tuple')
        path(obj['physicalPath']); ident = identity(obj['identity'], obj['original']['bytes'])
        require(obj['physicalPath'] not in physical and ident[:2] not in inodes and obj['physicalPath'] != owner['binding']['path'], 'physical path/inode alias or current owner')
        physical.add(obj['physicalPath']); inodes.add(ident[:2]); table[name] = obj; logical[k] = name
    references = {}; used_snapshots = set(); previous = 0; parent_generation = None
    for p in parents:
        keys(p, ('parentIndex','frameIndex','reception','historyGenerationSha256','roles','acceptanceOwner','independentAcceptance'))
        parent_metadata(p)
        if parent_generation is None: parent_generation = p['historyGenerationSha256']
        require(p['historyGenerationSha256'] == parent_generation, 'mixed parent composite generation')
        index = p['parentIndex']; require(index > previous, 'ordered unique parents'); previous = index
        sk = key(p['independentAcceptance']); require(sk in snapshots and index in snapshots[sk], 'separately admitted parent required')
        accepted = snapshots[sk][index]; used_snapshots.add(sk); used_snapshot_parents.add((sk, index))
        for field in ('parentIndex','frameIndex','reception','historyGenerationSha256'):
            require(same(p[field], accepted[field]), 'original parent metadata differs')
        for role in (*sorted(ROLES), 'acceptanceOwner'):
            name = p['acceptanceOwner'] if role == 'acceptanceOwner' else p['roles'][role]
            require(type(name) is str and name in table, 'unresolved role/owner')
            original = accepted['acceptanceOwner'] if role == 'acceptanceOwner' else accepted['roles'][role]
            require(same(table[name]['original'], original), 'independently admitted role/owner differs')
            valid = 'owners/' + original['sha256'] if role == 'acceptanceOwner' else f'parents/{index}/{role}'
            references.setdefault(name, []).append((valid, role, None if role == 'acceptanceOwner' else index))
    require(set(table) == set(references), 'orphan object')
    require(used_snapshots == set(snapshots) and used_snapshot_parents == {(k, i) for k, rows in snapshots.items() for i in rows}, 'unused admitted snapshot or parent')
    require(type(inventory['independentAcceptances']) is list and [key(b) for b in inventory['independentAcceptances']] == sorted(used_snapshots), 'exact used sorted snapshot list')
    members = []
    for name, obj in table.items():
        canonical_name, role, index = min(references[name])
        require((name, obj['role'], obj['parentIndex']) == (canonical_name, role, index) and (obj['parentIndex'] is None or type(obj['parentIndex']) is int), 'canonical shared name/role/index')
        ident = identity(obj['identity'], obj['original']['bytes'])
        members.append(package_module.ExpectedMember(name, role, index, package_module.Binding(**obj['original']), obj['physicalPath'], package_module.SourceIdentity(*ident)))
    # The unchanged byte module enforces its payload allowlist, same-path owner
    # exception and exact framing/index quota. It performs no IO in _members.
    result, index, index_raw = package_module._members(tuple(members))
    totals = dict(parents=len(parents), roleReferences=13*len(parents), ownerReferences=len(parents), objects=len(result), payloadBytes=index['payloadBytes'], indexBytes=len(index_raw)+1,
                  packageBytes=len(package_module.MAGIC)+len(index_raw)+1+index['payloadBytes']+len(package_module.FOOTER))
    require(same(inventory['totals'], totals), 'exact framing and reference totals')
    return result
