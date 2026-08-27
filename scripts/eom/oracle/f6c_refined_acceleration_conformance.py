"""Pure independent refined-cover projection and conditional range comparison.

API: reconstruct_refined_projection(reference, export, manifest, rows, pieces,
bindings, *, reference_sha256, progress=None) -> FrozenProjection; and
compare_refined_ranges(reference, export, manifest, rows, pieces, bindings,
candidate_projection, candidate_ranges, *, reference_sha256, progress=None)
-> RefinedRangeComparison. The projection is the JSON-record representation of
the unchanged CellRangeInput, not an import or construction of subject objects.
FrozenProjection.to_record() returns a fresh detached dict/list serialization.

The caller must separately capture/authenticate the cc26 reference, original
export, admitted refined cover and seven binding records. reference_sha256 is
only a required declared generation, not a file or executable authentication.
Only the injected unchanged original_history, clipped_coverage and compare_ranges
helpers are called. This module performs no IO, root search, geometry evaluation,
subject import, publication or operational admission. No coverage cache exists.

All original inputs are copied into bounded immutable trees BEFORE any callback
or injected helper. Callback mutation of caller-owned origins cannot change this
call. Exact builtin containers/leaves only; cycles/subclasses/nonfinite or binary
floating values fail closed. A frozen result has only conditional mapping/range
meaning; every acceptance/source/execution/physics/metric authority remains false.

The seven bindings are supplied premises in their declared mathematical role
order, not hard-coded actual-file fixtures. The later source-bound wrapper owns
their exact paths/hashes/bytes and the full refined query/comparison/operation
chain; this core does not re-prove the 3584 queries or authenticate those premises.
It does check all 56 pair restrictions, 64 rows, 112 original closed coverages,
1760 pieces/member, 81 frames/80 edges and the original scalar/axis error tokens.

decode_document is a pure bounded parser: data strings <=8192, explicitly typed
operational-receipt strings <=131072, file <=64MiB, depth<=24, object<=10000,
array<=20000, key<=4096. Scientific values are always unchanged exact strings
subject to the frozen helper's stricter 1152-character/1024-digit/exponent1000
rule. Receipt parsing cannot relax that rule. No actual-file fixture is needed.
"""
from __future__ import annotations

from dataclasses import dataclass
from decimal import Decimal
from fractions import Fraction
import hashlib
import json
import re

REFERENCE_SHA256 = 'cc26f5a45d0e09a472e3066d0d62ae8192492a7c3e0ab18a3658781a0274b299'
IDS = ('0+', '0-', '1+', '1-', '2+', '2-', '3+', '3-')
CHARGE = '0.1666666666666666666666666666666667'
COUPLING = '10.304229970992187'
RULER = '0.5320012303229503'
ROLES = ('original_export', 'reconstruction_receipt', 'guards_receipt', 'root_cover',
         'root_cover_comparison', 'member_acceleration_predeclaration',
         'continuous_reception_enclosure_contract')
ROOT_FLAGS = tuple('premise_truth_authenticated subject_membership_established execution_authorized metrics_available h3_evidence_eligible'.split())
MANIFEST_FLAGS = tuple('historicalTrajectoryIdentityEstablished metricsAvailable scoreAuthorized h3EvidenceEligible eomExecuted independentComparisonPassed executionAuthorized'.split())
ROW_KEYS = tuple('rowIndex cellIndex receiverIndex transmitterIndex receiverId transmitterId reception emission ordinaryRootsPerReception coincidentEndpointExcluded oldestResidual lowerFaceResidual upperFaceResidual displacement distance transmitterFactor receiverFactor receiverPieceRecord transmitterPieceRecord rootFreeComplementConditional retainedBoundaryContact libraryFlags'.split())
PIECE_KEYS = tuple('recordIndex rowIndex role memberId historyDigest requestedInterval touchedPieceCount firstIndex lastIndex contiguousIndexRange clippedPiecesSha256'.split())
CENSUS = dict(cells=1, members=8, queries=3584, pairRows=64, ordinaryPairs=56, selfZeros=8, pieceRecords=112)
MAX_BYTES, MAX_NODES = 64*1024**2, 1000000
_TOKEN = re.compile(r'-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\Z')
_HASH = re.compile(r'[a-f0-9]{64}\Z')


def require(condition, message):
    if not condition:
        raise ValueError(message)


@dataclass(frozen=True, slots=True)
class _Object:
    items: tuple


def _freeze(value, string_limit=8192):
    """Bounded detached generation; never invoke caller conversion methods."""
    count = 0
    size = 0
    active = set()
    def visit(v, depth):
        nonlocal count, size
        count += 1; size += 2
        require(depth <= 24 and count <= MAX_NODES and size <= MAX_BYTES, 'input structure/byte bound')
        t = type(v)
        if t is str:
            require(len(v) <= string_limit, 'string bound')
            size += len(v.encode('utf-8', errors='strict'))
            require(size <= MAX_BYTES, 'input byte bound')
            return v
        if t is int:
            require(abs(v) <= 2**53-1, 'integer bound')
            return v
        if v is None or t is bool:
            return v
        if t is Decimal:
            require(v.is_finite() and len(v.as_tuple().digits) <= 1024 and abs(v.as_tuple().exponent) <= 1000, 'receipt number bound')
            return v
        require(t in (dict, list, tuple), 'exact builtin input type required')
        require(id(v) not in active, 'cyclic input')
        active.add(id(v))
        try:
            if t is dict:
                require(len(v) <= 10000, 'object bound')
                result = []
                for k,x in v.items():
                    require(type(k) is str and len(k) <= 4096, 'key bound')
                    result.append((visit(k, depth+1), visit(x, depth+1)))
                return _Object(tuple(result))
            require(len(v) <= 20000, 'array bound')
            return tuple(visit(x, depth+1) for x in v)
        finally:
            active.remove(id(v))
    return visit(value, 0)


def _thaw(value):
    if type(value) is _Object:
        return {k:_thaw(v) for k,v in value.items}
    if type(value) is tuple:
        return [_thaw(v) for v in value]
    return value


def decode_document(raw, *, document_class='data'):
    require(type(document_class) is str and document_class in ('data', 'operational-receipt'), 'unknown document class')
    require(type(raw) is bytes and 0 < len(raw) <= MAX_BYTES, 'bounded original JSON bytes required')
    def pairs(items):
        result = {}
        for k,v in items:
            require(k not in result, 'duplicate JSON key')
            result[k] = v
        return result
    def reject(token):
        raise ValueError('nonexact/nonfinite JSON number')
    value = json.loads(raw.decode('utf-8', errors='strict'), object_pairs_hook=pairs,
                       parse_float=Decimal if document_class == 'operational-receipt' else reject,
                       parse_constant=reject)
    return _thaw(_freeze(value, 131072 if document_class == 'operational-receipt' else 8192))


def _keys(v, keys):
    require(type(v) is dict and set(v) == set(keys), 'closed fields differ')


def _seq(v, n):
    require(type(v) is list and len(v) == n, 'exact list census differs')


def _number(v):
    require(type(v) is str and 0 < len(v) <= 1152 and _TOKEN.fullmatch(v), 'scientific decimal token')
    d = Decimal(v)
    require(d.is_finite() and len(d.as_tuple().digits) <= 1024 and abs(d.as_tuple().exponent) <= 1000, 'scientific decimal bound')
    return Fraction(d)


def _box(v):
    _keys(v, ('lower','upper','precision'))
    require(type(v['precision']) is int and v['precision'] == 90, 'precision differs')
    lo,hi = _number(v['lower']),_number(v['upper'])
    require(lo <= hi, 'reversed bounds')
    return lo,hi


def _flags(v, names):
    _keys(v,names);require(all(x is False for x in v.values()), 'authority promoted')


def _index(value, expected):
    require(type(value) is int and value == expected, 'identity/index differs')


def _same(a,b):
    return type(a) is type(b) and (a.keys() == b.keys() and all(_same(a[k],b[k]) for k in a) if type(a) is dict
        else len(a) == len(b) and all(_same(x,y) for x,y in zip(a,b)) if type(a) is list else a == b)


@dataclass(frozen=True, slots=True)
class FrozenProjection:
    _tree: _Object
    accepted: bool = False
    source_authenticated: bool = False
    execution_authorized: bool = False

    def to_record(self):
        return _thaw(self._tree)


@dataclass(frozen=True, slots=True)
class RefinedRangeComparison:
    conditional_projection_conformant: bool = True
    conditional_ranges_conformant: bool = True
    cells: int = 1
    members: int = 8
    pair_rows: int = 64
    ordinary_pairs: int = 56
    self_zeros: int = 8
    piece_records: int = 112
    compared_pair_components: int = 192
    compared_member_intervals: int = 80
    accepted: bool = False
    source_authenticated: bool = False
    reference_generation_authenticated: bool = False
    root_coverage_established: bool = False
    premise_truth_authenticated: bool = False
    subject_membership_established: bool = False
    historical_trajectory_identity_established: bool = False
    execution_authorized: bool = False
    eom_executed: bool = False
    metrics_available: bool = False
    score_authorized: bool = False
    h3_evidence_eligible: bool = False
    equilibrium_established: bool = False
    retention_established: bool = False
    physical_realization_established: bool = False


def _reference(reference, digest):
    require(type(digest) is str and digest == REFERENCE_SHA256, 'declared reference generation differs')
    functions = tuple(getattr(reference, n, None) for n in ('original_history','clipped_coverage','compare_ranges'))
    require(all(callable(f) for f in functions), 'injected frozen reference interface missing')
    return functions


def _project(original_history, clipped_coverage, values, progress):
    export,manifest,rows,pieces,bindings = values
    _seq(rows,64);_seq(pieces,112);_seq(bindings,7)
    for role,b in zip(ROLES,bindings):
        _keys(b,('role','path','sha256','bytes'))
        require(b['role'] == role and type(b['path']) is str and 0 < len(b['path']) <= 2048 and '\0' not in b['path'], 'binding role/path differs')
        require(type(b['sha256']) is str and _HASH.fullmatch(b['sha256']) and type(b['bytes']) is int and 0 < b['bytes'] <= 1024**3, 'binding hash/size differs')
    require(len({b['path'] for b in bindings}) == 7, 'duplicate mathematical source path')
    require(export['schema'] == 'braid-program/f6c-retained-history-export.v1' and export['fieldSpeed'] == '1' and export['coupling'] == COUPLING, 'original source constants/schema differ')
    require(manifest['schema'] == 'braid-program/f6c-emission-refinement-cover.v1' and manifest['scope'] == 'pilot-cell-0-emission-refinement' and manifest['status'] == 'conditional_complete' and manifest['accepted'] is False, 'refined cover schema/scope differs')
    _flags(manifest['libraryFlags'],ROOT_FLAGS);_flags(manifest['claims'],MANIFEST_FLAGS)
    require(_same(manifest['census'],CENSUS) and _same(manifest['algorithm'],dict(lowerQueriesPerPair=32,upperQueriesPerPair=32,order='receiver-major;lower32;reset;upper32')), 'refinement census/algorithm differs')
    _index(manifest['precision'],90)
    require(manifest['speedUpper'] == '0.85' and manifest['clearanceLower'] == '0.27', 'shared guard literals differ')
    require(_box(manifest['receptionDomain']) == (Fraction(0),Fraction(1,1000)) and _box(manifest['retainedDomain']) == (Fraction(-8),Fraction(13,100)) and _box(manifest['originalEmissionDomain']) == (Fraction(-8),Fraction(-1,20)), 'fixed domains differ')
    histories,frames,edges = (export[k] for k in ('retainedHistories','acceptedFrames','acceptedFrameIntervals'))
    _seq(histories,8);_seq(frames,81);_seq(edges,80);_seq(manifest['members'],8)
    grids=[];digests=[];knots=None
    for i,h in enumerate(histories):
        sign=1 if i%2 == 0 else -1
        require(h['id'] == IDS[i] and type(h['pathKey']) is int and h['pathKey'] == i+1 and type(h['polarity']) is int and h['polarity'] == sign and h['charge'] == ('' if sign > 0 else '-')+CHARGE, 'original member/charge differs')
        require(h['coverageStart'] == '-8' and h['coverageEnd'] == '0.13' and type(h['historyFingerprint']) is str and 0 < len(h['historyFingerprint']) <= 256, 'original domain/fingerprint differs')
        digest,grid=original_history(h);grids.append(grid);digests.append(digest)
        future=sorted({x for pair in grid[1600:] for x in pair})
        if knots is None:knots=future
        require(future == knots and len(future) == 161, 'original future knot census differs')
        expected=dict(id=IDS[i],pathKey=i+1,polarity=sign,charge=h['charge'],originalHistoryFingerprint=h['historyFingerprint'],historyDigest=digest)
        require(_same(manifest['members'][i],expected), 'refined member lexeme/digest differs')
    require(manifest['knotSha256'] == hashlib.sha256(''.join(str(x)+'\n' for x in knots).encode()).hexdigest(), 'original knot hash differs')
    for n,frame in enumerate(frames):
        _keys(frame,('frameIndex','time','members'));_seq(frame['members'],8);_index(frame['frameIndex'],n)
        require(_number(frame['time']) == knots[2*n], 'frame knot differs')
        for i,member in enumerate(frame['members']):
            _keys(member,('pathKey','position','velocity','positionErrorBound','stateFlags'));_index(member['pathKey'],i+1);_index(member['stateFlags'],1 if i%2 == 0 else 2)
            require(_number(member['positionErrorBound']) >= 0, 'negative frame provenance error')
            for kind in ('position','velocity'):
                _keys(member[kind],('x','y','z'))
                for token in member[kind].values():_number(token)
        if n < 80:require(_same(edges[n],dict(leftFrameIndex=n,rightFrameIndex=n+1,startTime=frame['time'],endTime=frames[n+1]['time'])), 'frame edge lexemes differ')
    require(_number(frames[0]['time']) == 0 and _number(frames[1]['time']) == Fraction(1,500), 'fixed first frame differs')
    members=[]
    for i,h in enumerate(histories):
        member=dict(label=IDS[i],path_id=str(i+1),charge=h['charge'],history_digest=digests[i])
        for side,n in (('left',0),('right',1)):
            for kind in ('position','velocity'):member[kind+'_'+side]=[frames[n]['members'][i][kind][axis] for axis in ('x','y','z')]
        members.append(member)
    restrictions=manifest['restrictions'];_seq(restrictions,56);by_pair={};pair=0
    for i in range(8):
        for j in range(8):
            if i == j:continue
            r=restrictions[pair];_keys(r,('receiverIndex','transmitterIndex','receiverId','transmitterId','lower','upper','lowerQueryIndex','upperQueryIndex'))
            _index(r['receiverIndex'],i);_index(r['transmitterIndex'],j);require(r['receiverId'] == IDS[i] and r['transmitterId'] == IDS[j], 'restriction ownership differs')
            require(Fraction(-8) <= _number(r['lower']) < _number(r['upper']) <= Fraction(-1,20), 'restriction outside original emission')
            for k,offset,boundary in (('lowerQueryIndex',0,Fraction(-8)),('upperQueryIndex',32,Fraction(-1,20))):
                v=r[k];endpoint=_number(r['lower' if offset == 0 else 'upper'])
                require((v is None and endpoint == boundary) or (type(v) is int and pair*64+offset <= v < pair*64+offset+32), 'restriction query witness differs')
            by_pair[i,j]=r;pair+=1
    mapped=[];piece_index=0
    def projected_box(value):
        if value is None:return None
        _box(value);return {k:value[k] for k in ('lower','upper')}
    for n,row in enumerate(rows):
        _keys(row,ROW_KEYS);_flags(row['libraryFlags'],ROOT_FLAGS);i,j=divmod(n,8)
        for k,v in dict(rowIndex=n,cellIndex=0,receiverIndex=i,transmitterIndex=j).items():_index(row[k],v)
        require(row['receiverId'] == IDS[i] and row['transmitterId'] == IDS[j] and _same(row['reception'],manifest['receptionDomain']), 'pair reception/identity differs')
        require(row['rootFreeComplementConditional'] is True and row['retainedBoundaryContact'] is False, 'root completeness flags differ')
        nullable=('emission','oldestResidual','lowerFaceResidual','upperFaceResidual','displacement','distance','transmitterFactor','receiverFactor','receiverPieceRecord','transmitterPieceRecord')
        coverage=[]
        if i == j:
            _index(row['ordinaryRootsPerReception'],0)
            require(row['coincidentEndpointExcluded'] is True and all(row[k] is None for k in nullable), 'self exclusion differs');coverage=[None,None]
        else:
            _index(row['ordinaryRootsPerReception'],1);require(row['coincidentEndpointExcluded'] is False, 'ordinary exclusion differs')
            r=by_pair[i,j];require(_same(row['emission'],dict(lower=r['lower'],upper=r['upper'],precision=90)), 'pair-specific emission lexemes differ')
            require(_box(row['oldestResidual'])[1] < 0 and _box(row['lowerFaceResidual'])[1] < 0 and _box(row['upperFaceResidual'])[0] > 0, 'strict oldest/lower/upper face differs')
            require(_box(row['distance'])[0] > 0 and _box(row['transmitterFactor'])[0] >= Fraction(1,10**24) and _box(row['receiverFactor'])[0] > 0, 'denominator/factor differs')
            _seq(row['displacement'],3)
            for v in row['displacement']:_box(v)
            for role,member,request in (('receiver',i,row['reception']),('transmitter',j,row['emission'])):
                _index(row[role+'PieceRecord'],piece_index);p=pieces[piece_index];_keys(p,PIECE_KEYS)
                # No cache: the same transmitter has different refined requests.
                cover=clipped_coverage(grids[member],_box(request))
                expected=dict(recordIndex=piece_index,rowIndex=n,role=role,memberId=IDS[member],historyDigest=digests[member],requestedInterval=request,**cover)
                require(_same(p,expected), 'original closed-piece ownership/coverage differs');coverage.append(p['clippedPiecesSha256']);piece_index+=1
        result=dict(receiver_id=IDS[i],transmitter_id=IDS[j],reception=projected_box(row['reception']),ordinary_roots_per_reception=row['ordinaryRootsPerReception'],coincident_endpoint_excluded=row['coincidentEndpointExcluded'],root_free_complement_conditional=True,retained_boundary_contact=False,receiver_coverage_sha256=coverage[0],transmitter_coverage_sha256=coverage[1])
        for camel,snake in (('emission','emission'),('oldestResidual','oldest_residual'),('lowerFaceResidual','lower_face_residual'),('upperFaceResidual','upper_face_residual'),('distance','distance'),('transmitterFactor','transmitter_factor'),('receiverFactor','receiver_factor')):result[snake]=projected_box(row[camel])
        result['displacement']=None if row['displacement'] is None else [projected_box(v) for v in row['displacement']]
        mapped.append(result)
        if progress is not None:progress(n+1)
    require(piece_index == 112, 'unconsumed piece records')
    return dict(scope='f6c-reconstruction-family',precision=90,cell_index=0,frame_index=0,reception=projected_box(manifest['receptionDomain']),frame_domain=dict(lower=frames[0]['time'],upper=frames[1]['time']),retained_domain=projected_box(manifest['retainedDomain']),field_speed='1',coupling=COUPLING,ruler=RULER,cover_status='conditional_complete',bindings=bindings,members=members,rows=mapped)


def reconstruct_refined_projection(reference, export, manifest, rows, pieces, bindings, *, reference_sha256, progress=None):
    snapshot=_freeze([export,manifest,rows,pieces,bindings])
    original,coverage,_=_reference(reference,reference_sha256)
    require(progress is None or callable(progress), 'progress must be callable')
    result=_project(original,coverage,_thaw(snapshot),progress)
    return FrozenProjection(_freeze(result))


def compare_refined_ranges(reference, export, manifest, rows, pieces, bindings, candidate_projection, candidate_ranges, *, reference_sha256, progress=None):
    snapshot=_freeze([export,manifest,rows,pieces,bindings,candidate_projection,candidate_ranges])
    original,coverage,compare=_reference(reference,reference_sha256)
    require(progress is None or callable(progress), 'progress must be callable')
    values=_thaw(snapshot);projected=_project(original,coverage,values[:5],progress)
    require(_same(values[5],projected), 'candidate projection differs from originals')
    counts=compare(values[6],projected)
    expected=dict(cells=1,pairRows=64,ordinaryPairs=56,selfZeros=8,members=8,pieceRecords=112,comparedPairComponents=192,comparedMemberIntervals=80)
    require(_same(counts,expected), 'frozen comparison census differs')
    return RefinedRangeComparison()
