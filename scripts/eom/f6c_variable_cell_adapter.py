"""Source-bound F6c variable-cell mapping with explicit geometry restriction.

open_adapter(repo_root, *, adapter_sha256, controls_sha256,
             closure_owner_sha256, deadline, parent_refinements=()) is a context manager. Construction
captures original files and authenticates preserved metadata only: NO root,
acceleration, residual or GK evaluation. The expected closure-owner hash MUST
be fixed before construction. The captured readiness version attributes the
accepted full run (13512/c21aa7, exit0,862.951823625s); text is not a new process
observation and its mutable owner is not called write-once. The old admission's
862.577186208s is prepublication, never substituted for the fresh observation.

project(frame_index, J) requires positive J in ONE original frame and parent
reception cell. The accepted refined cell0 overrides the broad full-cover row.
An explicit ParentRefinement may additionally select the independently accepted
original-parent1 generation. No other parent is admitted by that protocol. Its
historical acceptance owner may be read only through an explicit ArchivedSource;
logical historical bindings and current physical provenance remain distinct.
ALL parent emission/three faces/displacement/distance/Dr/Dt are inherited
unchanged; only receiver coverage is clipped to J. No geometry tightening,
emission subsetting, root search, hidden retry or accuracy guarantee occurs.
project_restricted(frame_index, J) explicitly invokes the captured geometry
restriction once, retaining parent E/three faces and recomputing only D/R/Dt/Dr
on J. It shares the same assembly, validation and issued-object ownership as
project; there is no caller-supplied replacement geometry. Constructor mapping
of restriction histories is metadata only. geometry_accounting separately
records attempted/completed restrictions, actual history-state calls (including
failed calls), and issued restricted projections; ordinary accounting is stable.
evaluate(projected) explicitly calls captured abfc once. residual_for(evaluated,
polynomial) calls captured b869 with exact rational original-Hermite affine
curvature. Neither operation runs automatically or drives a GK batch.

make_synthetic_adapter is a separate pure fixture seam, never authentication.
Inputs are copied to deeply immutable records; small coherent grids are allowed
there only. Production fixes original8x1760/81frames/160parentcells and complete
64/112 row/piece ownership. There is no actual-data default, output publication,
launcher, new ledger or process supervision. A later executor owns runtime
admission, deadlines through final publication, and the fixed shared budgets.

All scientific authority flags stay false. Source metadata verified at capture
remains conditional on final unchanged-file recheck at context close. An
unavailable provider must report a separately bounded refinement obligation;
inherited emission width can prevent useful node/leaf contraction.
"""

from __future__ import annotations

from contextlib import ExitStack, contextmanager
from dataclasses import asdict, dataclass, replace
from decimal import Decimal
from fractions import Fraction as F
import hashlib
import json
import os
from pathlib import Path
import re
import stat
import sys
import time
import weakref
from types import ModuleType, MappingProxyType


SELF = 'scripts/eom/f6c_variable_cell_adapter.py'
CONTROLS = 'tests/test_f6c_variable_cell_adapter.py'
_EXECUTING_CODE = sys._getframe().f_code
OWNER = 'reference/priorities/braid-program/evidence/2026-08-27-braid-search-launch-readiness.md'
PREFIX = 'reference/priorities/braid-program/evidence/'
FULL_BASE = '.local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/full-cached-v1/'
FULL = (
 ('rows',FULL_BASE+'subject/rows.ndjson','28491edb2f1faec7adf248f535d29a1600b8bd69f5a46706fd26dbb3eb848b5c',22585784),
 ('pieces',FULL_BASE+'subject/pieces.ndjson','b3a2ddf2c8cd5b586ef7b374eee94afc395f63496c849ec574e71bf1f487a9ab',7505144),
 ('manifest',FULL_BASE+'subject/cover-manifest.json','61b0cdfad85696a0b5ead7df838119c9005a28656e9ac3daa26df139054410e2',42922),
 ('comparison',FULL_BASE+'comparison.json','1c423aece2009a2d7d0852e9558c16464c640abbc5bea3743211af3805b6eed2',43377),
 ('admission',FULL_BASE+'full-admission.json','8fe8f0f9651fd8de15467a69f0534f08bbe19e0e3fdb64a86c6422be857eb77f',332567),
 ('launcherLog',FULL_BASE+'launcher-stderr.log','b976d8deb556d8faba5a3aff73a09b77ec26c6da84e42726167eec4ec7a43314',30969),
 ('resourceLog',FULL_BASE+'resource-observations.ndjson','66eb0cfa1811d0a834d18d3bd8e749a941e1964f7276898b80a4e12136d69d03',1710278),
 ('plan',PREFIX+'2026-08-27-f6c-cached-root-cover-full-launch.v1.json','5dd7e27084a2e8e5b2c3ed8daf8cf66248a437108710ce91281977e728197ddc',45282),
)
PARENT_BASE='.local-data/braid-analysis/f6c-parent-emission-refinement-20260827/'
# This is the separately accepted original-parent1 invocation, not authority to
# select arbitrary output from the general mathematical refinement library.
PARENT_ONE=(
 ('plan',PREFIX+'2026-08-27-f6c-parent-emission-refinement-launch.v1.json','2ef79411d22b646136352b83a92dfb18b42e2d01733aec6dff828ab258dc68d4',51509),
 ('manifest',PARENT_BASE+'pilot-parent-1-v1/cover-manifest.json','952aa6a5951407af57b68478a3f19381d81dd2a970a82d3f3475bdd075936df6',113112),
 ('comparison',PARENT_BASE+'pilot-parent-1-v1-outer/comparison.json','8015590d0c2a39557411e1f3e3e3e6892565afc2a0b7741a225952c2e79f13f7',127948),
 ('operation',PARENT_BASE+'pilot-parent-1-v1-outer/operation.json','d912a2b1daeddf0f6bafe852a876fde517b9d1da49260a557144ecacfb925029',657555),
 ('launcher_log',PARENT_BASE+'pilot-parent-1-v1-outer/launcher-stderr.log','4e5f4ca8c305b409a27bab70339dc1aed2f0a1b6962843b0e340118538dd6a71',7488),
 ('resource_log',PARENT_BASE+'pilot-parent-1-v1-outer/resource-observations.ndjson','ccc61d5b04f22baf85fe3981db293903c446b788e77ae852ca6b41311dc27dda',520798),
 ('queries',PARENT_BASE+'pilot-parent-1-v1/queries.ndjson','cf4a6c7464f773782c5450d562a999543c60c2d906bf2fa91dc5f6207564db77',2003114),
 ('rows',PARENT_BASE+'pilot-parent-1-v1/rows.ndjson','ad9734afd944cf92994852f3cfbb3c3b64ebcecf090e243cbf7a37ab5c019624',161022),
 ('pieces',PARENT_BASE+'pilot-parent-1-v1/pieces.ndjson','928a7d56104e528170b50f971c3217f157f5ba462a815cd646afba73fd354e46',48578),
)
SOURCES = (
 ('transport','scripts/eom/verify-f6c-refined-acceleration.py','3f49831a2e63d2526125c1585c1250330079fa423986ec1b36901bb3cecde6ae'),
 ('transportControls','tests/test_f6c_refined_acceleration.py','4d8bc9e7eaf1166a7c8e42133d3a3e8812c3f228c1fb13c9215994338972f72a'),
 ('mapping','scripts/eom/verify-f6c-continuous-reception-acceleration.py','cc26f5a45d0e09a472e3066d0d62ae8192492a7c3e0ab18a3658781a0274b299'),
 ('mappingControls','tests/test_f6c_continuous_reception_acceleration.py','be741dccccd90c349849b19dc15df1acd4ea5752ec6f8a9e98e7ae14013c52c6'),
 ('decoder','scripts/eom/oracle/f6c_refined_acceleration_conformance.py','63db48f604d0b1abdf61f0efcb3894feac9d30a25af26a4d96f01bda6522e2a2'),
 ('decoderControls','tests/test_f6c_refined_acceleration_conformance.py','3fb6eabd03a56b982f2601f11b535c60208f03df519e41ea29d4ba018a0e531e'),
 ('rootComparison','scripts/eom/verify-f6c-cached-continuous-reception-root-cover.py','19c57e9b638b0beb866c86b061b2325f9567add2a85608f0c42ef1f7612d9132'),
 ('rootControls','tests/test_f6c_cached_continuous_reception_root_cover.py','2fd2080b3b4facdc80b85cdc65610c2bfeefdd8eab5f7234e207d3d4908bc117'),
 ('acceleration','scripts/eom/oracle/continuous_reception_acceleration.py','abfc21f29d8bdd984118b1e0ba0cb62b88a081a75a961052eb11f31ea7bdd7b8'),
 ('accelerationControls','tests/test_eom_continuous_reception_acceleration.py','26b7c5455a57da5beba6e7fd32a0b7bfbc8e1f32630b663c55a33273e8cc1823'),
 ('accelerationProof',PREFIX+'2026-08-27-f6c-continuous-reception-acceleration-reference.md','c1a5358e1d887fab5b4753368dc14ec59ed220294f42d2afa4ac40f962ee537f'),
 ('integral','scripts/eom/oracle/f6c_residual_integral_supremum.py','fc170a91b2747923bda89ef00b58d529c98bf96b01cc7b2c05c035042fc79c5a'),
 ('integralControls','tests/test_f6c_residual_integral_supremum.py','d80ca8bab38bface925fbdee1530f43919c83b331a878f004ef1601b2cf09b24'),
 ('integralProof',PREFIX+'2026-08-27-f6c-residual-integral-supremum-enclosure.md','945441097fdd2934434dd2ff6d9dd6f06a77898752db6bcac90745a76420eb4b'),
 ('correlated','scripts/eom/oracle/f6c_correlated_residual_enclosure.py','b86907236e849124f3fa9c6bcad0f65492ecc6fbeb1b51a27438655c45b037b1'),
 ('correlatedControls','tests/test_f6c_correlated_residual_enclosure.py','327b1be489baa06d5785de9c306c06ffbe2f5c825700abfd87ac18345a9ac9ff'),
 ('correlatedProof',PREFIX+'2026-08-27-f6c-correlated-residual-box-envelope.md','4180faad5d631af4bdbaf9ebd11500b0cc158b50da6ccc81295cf4d84a82bd41'),
 ('gk','scripts/eom/oracle/f6c_gk13_protocol.py','a70a15481f793e913440628068f9c53bab611fe9d92f36206a401c01e91478eb'),
 ('gkControls','tests/test_f6c_gk13_protocol.py','4b53d57f19de401348830b809600f01a9ae0c0c88d19d406a6a85e5ac8c5a241'),
 ('gkProof',PREFIX+'2026-08-27-f6c-gk13-execution-protocol.md','66ec97315dd8caf08d0628e2b23326044ac0a2f5b86b29d7c2f5542dc879cc85'),
 ('refinedClosure',PREFIX+'2026-08-27-f6c-refined-cover-acceleration-projection.md','c491ada9b781d7aedf20a9f49b0a2dca92f4f5985660c1de56b83686976aab9d'),
 ('fullEntry','scripts/eom/run-f6c-cached-root-cover-full.mjs','1398a005510480d073d3882c7b9508b1cd2f91f0d7bb7ae5757b4893ed73352b'),
 ('geometry','scripts/eom/f6c_reception_geometry_restriction.py','e4bc1ff8bd23346f58a934ace429dbf65b11d0b2bb71ebc55dc34036ab9c51e7'),
 ('geometryControls','tests/test_f6c_reception_geometry_restriction.py','b6c4b4e6a82a11b4ee84c782bf208df4b141860bb8d01f1ad2b2a1ca749a6c7b'),
 ('captureHelper','scripts/eom/prepare-f6c-cached-continuous-reception-root-cover.py','af53f5af2f9dd7eda4869af2a7533f869f4e3866003c90bf9a8487b2e5636386'),
 ('captureHelperControls','tests/test_f6c_cached_continuous_reception_root_cover_preparation.py','9abc7c3a80ad670e7bc7ad9f94a95f1fcd8924de425991032d6d26bba3372427'),
 ('geometryHistory','scripts/eom/oracle/certified_history.py','ca916b4bc979629a5e25c1490da07fd78a26b4e75cfba5677f35fbab658a29e7'),
 ('geometryRoots','scripts/eom/oracle/continuous_reception_roots_cached.py','daa4cc227cb8685de673fc400d817a19666b4fc7323e6c3a56f475a463b23acf'),
 ('geometryRootsControls','tests/test_eom_continuous_reception_roots_cached.py','a5ac7c8b26c5d0a193f20305f4bdbad93939756780bdaefd9cbf569f42a487eb'),
 ('geometryIntervals','scripts/eom/oracle/decimal_interval.py','fffc17270e149e6213315c1c82b518caa739657eb649822fd1955b8a2820e38a'),
 ('geometryIntervalControls','tests/test_eom_decimal_interval.py','22242cb7335cdddeb56416b8584793972195ee1aa6b460d8a43ea6baeb693b44'),
)
LABELS=('0+','0-','1+','1-','2+','2-','3+','3-')
CHARGE='0.1666666666666666666666666666666667'
COUPLING='10.304229970992187'
RULER='0.5320012303229503'
MAX_BYTES=64*1024**2
_TOKEN=re.compile(r'[+-]?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)(?:[eE][+-]?[0-9]+)?\Z')
_SHA=re.compile(r'[0-9a-f]{64}\Z')


def require(ok,message):
    if not ok: raise ValueError(message)


def number(token):
    require(type(token)is str and 0<len(token)<=1152 and _TOKEN.fullmatch(token),'bounded exact decimal token')
    mantissa,*exponent=re.split('[eE]',token)
    require(sum(c.isdigit()for c in mantissa)<=1024,'decimal digit bound')
    if exponent:
        x=exponent[0].lstrip('+-0')or'0';require(len(x)<=4 and int(x)<=1000,'decimal exponent bound')
    d=Decimal(token);require(d.is_finite()and abs(d.as_tuple().exponent)<=1000,'finite decimal exponent')
    return F(d)


def _same(a,b):
    if type(a)is not type(b):return False
    if type(a)is dict:return a.keys()==b.keys()and all(_same(a[k],b[k])for k in a)
    if type(a)in(list,tuple):return len(a)==len(b)and all(_same(x,y)for x,y in zip(a,b))
    return a==b


def _keys(x,keys):require(type(x)is dict and set(x)==set(keys),'closed mapping fields')
def _seq(x,n):require(type(x)is list and len(x)==n,'exact original list census')
def _hash(raw):return hashlib.sha256(raw).hexdigest()
def _encoded(x):return json.dumps(x,sort_keys=True,separators=(',',':'),allow_nan=False).encode()+b'\n'


@dataclass(frozen=True,slots=True)
class Segment:
    start: str
    end: str
    coefficients: tuple
    position_errors: tuple
    velocity_errors: tuple
    position_error: str
    velocity_error: str


@dataclass(frozen=True,slots=True)
class History:
    label: str
    path_key: int
    charge: str
    fingerprint: str
    digest: str
    segments: tuple
    grid: tuple


@dataclass(frozen=True,slots=True)
class OriginalFrame:
    index: int
    time: str
    positions: tuple
    velocities: tuple


@dataclass(frozen=True,slots=True)
class ParentCell:
    index: int
    reception: object
    rows: tuple
    bindings: tuple
    refined: bool = False


@dataclass(frozen=True,slots=True)
class SourceBinding:
    path: str
    sha256: str
    bytes: int


@dataclass(frozen=True,slots=True)
class ArchivedSource:
    role: str
    original: SourceBinding
    archive: SourceBinding


@dataclass(frozen=True,slots=True)
class ParentClosure:
    owner: SourceBinding
    operation: SourceBinding
    original_caller_session: str
    final_completion_chunk: str
    exit_code: int
    elapsed_seconds: str
    processes_closed: bool
    independent_audit_accepted: bool
    authority: str = 'attributed-versioned-acceptance-owner-not-fresh-process-observation'


@dataclass(frozen=True,slots=True)
class ParentRefinement:
    parent_index: int
    plan: SourceBinding
    manifest: SourceBinding
    comparison: SourceBinding
    operation: SourceBinding
    launcher_log: SourceBinding
    resource_log: SourceBinding
    closure: ParentClosure
    archived_sources: tuple = ()


@dataclass(frozen=True,slots=True)
class Coverage:
    row_index: int
    role: str
    member_id: str
    requested: object
    touched_piece_count: int
    first_index: int
    last_index: int
    sha256: str


@dataclass(frozen=True,slots=True,weakref_slot=True)
class Projection:
    cell: object
    context: object
    required_affine: tuple
    parent_reception: object
    coverage: tuple
    geometry_inherited_unchanged: bool
    emission_refinements: int
    root_refinements: int
    accuracy_guaranteed: bool
    claims: object
    _owner: object


@dataclass(frozen=True,slots=True,weakref_slot=True)
class Evaluation:
    projection: Projection
    ranges: object
    claims: object
    _owner: object


class _API:
    __slots__=('_names',)
    def __init__(self,module):object.__setattr__(self,'_names',MappingProxyType({k:v for k,v in vars(module).items()if not k.startswith('_')}))
    def __setattr__(self,*_):raise TypeError('read-only captured API')
    def __getattr__(self,name):
        try:return self._names[name]
        except KeyError:raise AttributeError(name)from None


class _StateQueries:
    """Narrow counter around one captured public API, never a module mutation."""
    __slots__=('_reference','_counts','_live')
    def __init__(self,reference,counts,live):self._reference=reference;self._counts=counts;self._live=live
    def history_state_over(self,history,domain):
        self._live();self._counts['history_state_evaluations']+=1
        result=self._reference.history_state_over(history,domain)
        self._live();return result


def _coverage(grid,lo,hi):
    require(F(-8)<=lo<=hi<=F(13,100),'retained coverage domain')
    rows=[];cursor=lo;digest=hashlib.sha256()
    for n,(a,b)in enumerate(grid):
        if b<lo or a>hi:continue
        left,right=max(a,lo),min(b,hi)
        require(left<=cursor and(not rows or n==rows[-1]+1),'closed coverage gap')
        rows.append(n);cursor=max(cursor,right)
        digest.update(f'{n}\t{left}\t{right}\n'.encode())
    require(rows and cursor==hi,'complete closed coverage required')
    return len(rows),rows[0],rows[-1],digest.hexdigest()


def _originals(export,*,actual):
    require(type(export)is dict and export['schema']=='braid-program/f6c-retained-history-export.v1'
            and export['fieldSpeed']=='1'and export['coupling']==COUPLING,'fixed export/model required')
    raw_histories=export['retainedHistories'];_seq(raw_histories,8)
    histories=[];common=None
    for i,h in enumerate(raw_histories):
        require(type(h)is dict and h['id']==LABELS[i]and type(h['pathKey'])is int and h['pathKey']==i+1
                and type(h['polarity'])is int and h['polarity']==(1 if i%2==0 else -1),'original identities')
        charge=(''if i%2==0 else '-')+CHARGE
        require(h['charge']==charge and type(h['historyFingerprint'])is str
                and 0<len(h['historyFingerprint'])<=256,'original literal charge/fingerprint')
        require(h['coverageStart']=='-8'and h['coverageEnd']=='0.13','full retained domain')
        segments=h['segments'];require(type(segments)is list and 1<=len(segments)<=1760,'bounded original segments')
        if actual:require(len(segments)==1760,'actual1760 census')
        copied=[];grid=[];cursor=F(-8);digest_tokens=[h['id']]
        for n,s in enumerate(segments):
            _keys(s,('startTime','endTime','coefficients','positionErrors','velocityErrors','positionError','velocityError'))
            a,b=number(s['startTime']),number(s['endTime']);require(a==cursor<b<=F(13,100),'segment continuity/domain')
            if actual:require(b<=0 if n<1600 else a>=0,'actual prehistory/future census')
            _seq(s['coefficients'],3)
            for axis in s['coefficients']:
                _seq(axis,4)
                for t in axis:number(t)
            for kind in ('position','velocity'):
                _seq(s[kind+'Errors'],3);radius=number(s[kind+'Error'])
                require(all(0<=number(t)<=radius for t in s[kind+'Errors']),'axis/scalar allowances')
            copied.append(Segment(s['startTime'],s['endTime'],tuple(tuple(c)for c in s['coefficients']),
                tuple(s['positionErrors']),tuple(s['velocityErrors']),s['positionError'],s['velocityError']))
            raw=[s['startTime'],s['endTime'],*(t for c in s['coefficients']for t in c),s['positionError'],s['velocityError']]
            digest_tokens.extend(str(Decimal(t))for t in raw);digest_tokens.append('90')
            grid.append((a,b));cursor=b
        require(cursor==F(13,100),'full history suffix')
        future=tuple(sorted({t for a,b in grid for t in (a,b)if t>=0}))
        require(future and future[0]==0,'release knot required')
        if common is None:common=future
        require(common==future,'common original future knot grid')
        histories.append(History(h['id'],h['pathKey'],charge,h['historyFingerprint'],
            _hash('\n'.join(digest_tokens).encode()),tuple(copied),tuple(grid)))
    frames=export['acceptedFrames'];edges=export['acceptedFrameIntervals']
    require(type(frames)is list and 2<=len(frames)<=81,'bounded frame census');_seq(edges,len(frames)-1)
    if actual:require(len(frames)==81 and len(common)==161,'actual frame/knot census')
    result=[];last=None
    for n,frame in enumerate(frames):
        _keys(frame,('frameIndex','time','members'));_seq(frame['members'],8)
        t=number(frame['time']);require(type(frame['frameIndex'])is int and frame['frameIndex']==n
            and(last is None or last<t)and t in common,'original frame ordering/knot')
        if actual:require(t==common[2*n],'actual alternating frame grid')
        positions=[];velocities=[]
        for i,member in enumerate(frame['members']):
            _keys(member,('pathKey','position','velocity','positionErrorBound','stateFlags'))
            require(type(member['pathKey'])is int and member['pathKey']==i+1 and type(member['stateFlags'])is int
                and member['stateFlags']==(1 if i%2==0 else 2)and number(member['positionErrorBound'])>=0,'frame member identity')
            for field,target in (('position',positions),('velocity',velocities)):
                _keys(member[field],('x','y','z'));coordinates=tuple(member[field][k]for k in ('x','y','z'))
                for x in coordinates:number(x)
                target.append(coordinates)
        result.append(OriginalFrame(n,frame['time'],tuple(positions),tuple(velocities)));last=t
        if n<len(edges):require(_same(edges[n],dict(leftFrameIndex=n,rightFrameIndex=n+1,
            startTime=frame['time'],endTime=frames[n+1]['time'])),'exact frame edge tokens')
    require(number(result[0].time)==0 and number(result[-1].time)==F(13,100),'whole future frame domain')
    return tuple(histories),tuple(result),common


def _register_projection(registry,projected):
    key=id(projected)
    def collected(reference):
        entry=registry.get(key)
        if entry is not None and entry[0]is reference:del registry[key]
    # Neither callback owns its referent. The marker survives collection of
    # Evaluation while Projection is live; lifetime totals are separate.
    registry[key]=(weakref.ref(projected,collected),False)


def _register_evaluation(registry,key,evaluated):
    def collected(reference):
        if registry.get(key)is reference:del registry[key]
    registry[key]=weakref.ref(evaluated,collected)


class Adapter:
    __slots__=('_a','_i','_c','_gk','histories','frames','parents','context','provenance','_closed','_pool','_actual','_issued','_evaluated','_clips','_residuals',
        '_geometry','_geometry_refs','_geometry_histories','_geometry_parents','_geometry_guards','_geometry_counts','_successful_counts','historical_owner_archives')
    def __init__(self,*_):raise TypeError('use open_adapter or make_synthetic_adapter')
    def __setattr__(self,*_):raise TypeError('immutable captured adapter generation')

    def _live(self):
        require(not self._closed,'adapter generation closed')
        if self._pool is not None:self._pool.live()

    @property
    def references(self):
        """Read-only name maps of privately captured APIs, not authentication flags.

        Ordinary Python introspection is not a security boundary. Callers must
        not mutate function globals or private attributes of the generation.
        """
        self._live()
        return MappingProxyType({role:MappingProxyType({k:v for k,v in vars(module).items()if not k.startswith('_')})
            for role,module in (('acceleration',self._a),('integral',self._i),('correlated',self._c),('gk',self._gk))if module is not None})

    @property
    def accounting(self):
        self._live()
        return MappingProxyType(dict(projections=self._successful_counts[0],evaluations=self._successful_counts[1],
            residuals=self._residuals[0],root_queries=0,emission_refinements=0,coverage_cache_entries=len(self._clips)))

    @property
    def geometry_accounting(self):
        self._live();return MappingProxyType(dict(self._geometry_counts))

    @property
    def acceleration_reference(self):self._live();return _API(self._a)
    @property
    def integral_reference(self):self._live();return _API(self._i)
    @property
    def gk_protocol(self):self._live();require(self._gk is not None,'GK source not captured in synthetic seam');return _API(self._gk)
    @property
    def call_counts(self):return self.accounting

    def _clip(self,member,lo,hi):
        return _cached_coverage(self._clips,self.histories,member,lo,hi)

    def project(self,frame_index,domain):
        """Inherit-only path: parent geometry remains byte/token unchanged."""
        return self._project(frame_index,domain,restricted=False)

    def project_restricted(self,frame_index,domain):
        """Explicit one-call geometry restriction; no root/emission refinement."""
        return self._project(frame_index,domain,restricted=True)

    def _project(self,frame_index,domain,*,restricted):
        self._live();a=self._a
        require(type(frame_index)is int and 0<=frame_index<len(self.frames)-1,'original frame index')
        require(type(domain)is a.Bounds,'exact range Bounds required')
        lo,hi=number(domain.lower),number(domain.upper)
        left,right=self.frames[frame_index:frame_index+2]
        require(number(left.time)<=lo<hi<=number(right.time),'one positive-width original frame required')
        matches=[p for p in self.parents if number(p.reception.lower)<=lo<hi<=number(p.reception.upper)]
        require(len(matches)==1,'one parent reception cell required; no hidden split')
        parent=matches[0];members=[];affines=[]
        for i,hist in enumerate(self.histories):
            member=a.Member(hist.label,str(hist.path_key),hist.charge,hist.digest,
                left.positions[i],left.velocities[i],right.positions[i],right.velocities[i])
            members.append(member);axis=[];h=number(right.time)-number(left.time)
            for p0,v0,p1,v1 in zip(member.position_left,member.velocity_left,member.position_right,member.velocity_right):
                x0,w0,x1,w1=map(number,(p0,v0,p1,v1))
                c2=3*(x1-x0)/h**2-(2*w0+w1)/h
                c3=2*(x0-x1)/h**3+(w0+w1)/h**2
                axis.append(self._c.Affine(2*c2+6*c3*(lo-number(left.time)),6*c3))
            affines.append(tuple(axis))
        if restricted:
            require(self._geometry is not None,'captured geometry dependencies required')
            require(self._successful_counts[0]<16384 and self._geometry_counts['restriction_calls']<16384,'bounded explicit restriction count')
            before=self._geometry_counts['history_state_evaluations']
            self._geometry_counts['restriction_calls']+=1
            result=self._geometry.restrict_cell_geometry(self._geometry_refs,self._geometry_histories,
                self._geometry_parents[parent.index],domain,self._geometry_guards)
            self._geometry_counts['completed_restrictions']+=1
            require(result.state_evaluations==self._geometry_counts['history_state_evaluations']-before,'captured state-call count differs')
            self._live();rows=result.rows
            coverage=tuple(Coverage(p.row_index,p.role,p.member_id,p.requested,len(p.clips),
                p.clips[0][0],p.clips[-1][0],p.sha256)for p in result.coverage)
        else:
            receiver_clips=tuple(self._clip(n,lo,hi)for n in range(8))
            rows=[];coverage=[]
            for n,row in enumerate(parent.rows):
                i,j=divmod(n,8)
                if i==j:rows.append(replace(row,reception=domain));continue
                clip=receiver_clips[i]
                rows.append(replace(row,reception=domain,receiver_coverage_sha256=clip[3]))
                coverage.append(Coverage(n,'receiver',LABELS[i],domain,*clip))
                tx=self._clip(j,number(row.emission.lower),number(row.emission.upper))
                require(tx[3]==row.transmitter_coverage_sha256,'inherited transmitter coverage differs')
                coverage.append(Coverage(n,'transmitter',LABELS[j],row.emission,*tx))
        cell=a.CellRangeInput('f6c-reconstruction-family',90,parent.index,frame_index,domain,
            a.Bounds(left.time,right.time),a.Bounds('-8','0.13'),'1',COUPLING,RULER,
            'conditional_complete',parent.bindings,tuple(members),tuple(rows))
        # Validation only: the unchanged evaluator's kernel is NOT invoked.
        a._validate(cell)
        require(self._successful_counts[0]<16384,'bounded projection count; no automatic extension')
        projected=Projection(cell,self.context,tuple(affines),parent.reception,tuple(coverage),not restricted,0,0,False,
                             self._i.Claims(),self)
        self._live()  # Validation/construction must not outlive the issued generation.
        _register_projection(self._issued,projected)
        self._successful_counts[0]+=1
        if restricted:self._geometry_counts['restricted_projections']+=1
        return projected

    def evaluate(self,projected):
        self._live();entry=self._issued.get(id(projected))
        require(type(projected)is Projection and entry is not None and entry[0]()is projected,'original issued projection required')
        require(not entry[1],'no implicit repeat evaluation')
        ranges=self._a.evaluate_cell(projected.cell)
        self._live()
        result=Evaluation(projected,ranges,self._i.Claims(),self)
        _register_evaluation(self._evaluated,id(projected),result)
        self._issued[id(projected)]=(entry[0],True)
        self._successful_counts[1]+=1
        return result

    def residual_for(self,evaluated,polynomial):
        self._live();require(type(evaluated)is Evaluation and evaluated._owner is self
            and (registered:=self._evaluated.get(id(evaluated.projection)))is not None
            and registered()is evaluated,'original evaluated projection required')
        i=self._i;require(type(polynomial)is i.Polynomial and type(polynomial.key)is i.IntegralKey,'exact auxiliary polynomial/key')
        p=evaluated.projection;key=polynomial.key
        require(key.context==self.context and key.frame_index==p.cell.frame_index
            and type(key.domain)is i.Bounds and(key.domain.lower,key.domain.upper)==(p.cell.reception.lower,p.cell.reception.upper)
            and type(key.label)is str and key.label in LABELS,'same polynomial context/member/frame/domain required')
        index=LABELS.index(key.label)
        acceleration=tuple(i.Bounds(x.lower,x.upper)for x in evaluated.ranges.member_ranges[index].acceleration)
        result=self._c.enclose(i,polynomial,p.required_affine[index],acceleration)
        self._live();self._residuals[0]+=1;return result

    def recheck(self):
        self._live()
        if self._pool is not None:self._pool.recheck()


def _cached_coverage(cache,histories,member,lo,hi):
    # Cache belongs to ONE captured immutable generation. The member AND both
    # exact endpoints are keys; different pair-specific emissions never alias.
    key=(member,lo,hi)
    if key not in cache:
        require(len(cache)<150000,'bounded coverage cache')
        cache[key]=_coverage(histories[member].grid,lo,hi)
    return cache[key]


def _build(a,i,c,export,parents,*,actual,provenance,pool=None,source_sha=None,gk=None,
           geometry=None,geometry_references=None,geometry_guards=None,
           _authenticated_refined_indices=frozenset({0}),historical_owner_archives=()):
    histories,frames,knots=_originals(export,actual=actual)
    require(type(parents)is tuple and 1<=len(parents)<=160,'bounded immutable parents')
    if actual:
        require(len(parents)==160,'complete full160 cover')
        require(type(_authenticated_refined_indices)is frozenset and _authenticated_refined_indices in
            (frozenset({0}),frozenset({0,1})),'authenticated admitted parent indices')
    cursor=F(0);clips={}
    for n,parent in enumerate(parents):
        require(type(parent)is ParentCell and type(parent.index)is int and parent.index==n
            and type(parent.refined)is bool and type(parent.reception)is a.Bounds,'ordered immutable parent')
        lo,hi=number(parent.reception.lower),number(parent.reception.upper)
        require(lo==cursor<hi and lo in knots and hi in knots,'complete parent/knot partition')
        if actual:require((lo,hi)==(knots[n],knots[n+1])and parent.refined is(n in _authenticated_refined_indices),'exact actual parent/override order')
        require(type(parent.rows)is tuple and len(parent.rows)==64 and type(parent.bindings)is tuple,'complete immutable parent records')
        for row_index,row in enumerate(parent.rows):
            require(type(row)is a.RootRow and type(row.reception)is a.Bounds and row.reception==parent.reception,'parent row domain')
            x,y=divmod(row_index,8)
            if x!=y:
                rx=_cached_coverage(clips,histories,x,lo,hi)
                tx=_cached_coverage(clips,histories,y,number(row.emission.lower),number(row.emission.upper))
                require((row.receiver_coverage_sha256,row.transmitter_coverage_sha256)==(rx[3],tx[3]),'original parent piece hashes')
        cursor=hi
    require(cursor==F(13,100),'full future parent suffix')
    adapter=object.__new__(Adapter)
    for name,value in (('_a',a),('_i',i),('_c',c),('_gk',gk),('histories',histories),('frames',frames),('parents',parents),
        ('context',i.Context(i.FAMILY,source_sha or _hash(_encoded(export)),_hash(_encoded(export['acceptedFrames'])),'1',COUPLING,RULER)),
        ('provenance',provenance),('historical_owner_archives',historical_owner_archives),('_closed',False),('_pool',pool),('_actual',actual),('_issued',{}),('_evaluated',{}),('_clips',clips),('_residuals',[0]),('_successful_counts',[0,0]),
        ('_geometry',geometry),('_geometry_refs',None),('_geometry_histories',()),('_geometry_parents',()),('_geometry_guards',None),
        ('_geometry_counts',dict(restriction_calls=0,completed_restrictions=0,history_state_evaluations=0,restricted_projections=0))):
        object.__setattr__(adapter,name,value)
    # Check every immutable parent shape against the frozen input contract.
    # project invokes no numerical range evaluation.
    for parent in parents:
        frame=next((n for n in range(len(frames)-1)if number(frames[n].time)<=number(parent.reception.lower)
                    and number(parent.reception.upper)<=number(frames[n+1].time)),None)
        require(frame is not None,'parent crosses original frame')
        left,right=frames[frame:frame+2]
        members=tuple(a.Member(h.label,str(h.path_key),h.charge,h.digest,left.positions[n],left.velocities[n],
                              right.positions[n],right.velocities[n])for n,h in enumerate(histories))
        a._validate(a.CellRangeInput('f6c-reconstruction-family',90,parent.index,frame,parent.reception,
            a.Bounds(left.time,right.time),a.Bounds('-8','0.13'),'1',COUPLING,RULER,'conditional_complete',
            parent.bindings,members,parent.rows))
    if geometry is None:
        require(geometry_references is None and geometry_guards is None,'complete explicit geometry dependencies')
    else:
        require(type(geometry_references)is geometry.References and geometry_references.ranges is a,'same captured range class generation')
        guards=geometry.Guards('1',('0.85',)*8,tuple(tuple('0'if x==y else'0.27'for y in range(8))for x in range(8)))
        require(type(geometry_guards)is geometry.Guards and geometry_guards==guards,'fixed authenticated geometry guards')
        # Literal token mapping once per immutable constructor generation. These
        # consistency digests are not new original-file provenance or evaluation.
        mapped=tuple(geometry.History(h.label,tuple(geometry.Segment(s.start,s.end,s.coefficients,
            s.position_errors,s.velocity_errors,s.position_error,s.velocity_error)for s in h.segments))for h in histories)
        generations=tuple(geometry.history_generation(h)for h in mapped)
        prepared=tuple(geometry.ParentCell(p.index,p.reception,p.rows,generations,adapter.context.family,
            '-8','conditional_complete')for p in parents)
        refs=geometry.References(geometry_references.history,
            _StateQueries(geometry_references.roots,adapter._geometry_counts,adapter._live),geometry_references.intervals,a)
        for name,value in (('_geometry_refs',refs),('_geometry_histories',mapped),('_geometry_parents',prepared),('_geometry_guards',guards)):
            object.__setattr__(adapter,name,value)
    return adapter


def make_synthetic_adapter(acceleration,integral,correlated,export,parents,*,
                           geometry=None,geometry_references=None,geometry_guards=None):
    """Pure, unauthenticated fixture seam; no production source boolean exists."""
    return _build(acceleration,integral,correlated,export,parents,actual=False,
                  provenance=(('scope','synthetic-only-no-source-authentication'),),geometry=geometry,
                  geometry_references=geometry_references,geometry_guards=geometry_guards)


@contextmanager
def _module(raw,path):
    """Execute only already captured bytes, in a fresh private module namespace."""
    module=ModuleType('_f6c_variable_'+_hash(raw)+'_'+str(id(raw)))
    module.__file__=str(path);module.__package__='';name=module.__name__
    require(name not in sys.modules,'private module collision')
    sys.modules[name]=module
    try:
        exec(compile(raw,str(path),'exec',dont_inherit=True),module.__dict__)
        yield module
    finally:
        require(sys.modules.get(name)is module,'private module generation replaced')
        del sys.modules[name]


@contextmanager
def _bootstrap(path,digest,live):
    """Small same-FD bootstrap for the frozen transport; no ambient import.

    Subsequent files use its reviewed BoundFile implementation. Bootstrap is
    checked again before closing, including path identity and complete bytes.
    """
    require(type(digest)is str and _SHA.fullmatch(digest),'bootstrap expected hash')
    path=Path(path);require(path.is_absolute()and path==path.resolve(),'canonical bootstrap')
    fd=os.open(path,os.O_RDONLY|os.O_NONBLOCK|getattr(os,'O_NOFOLLOW',0))
    try:
        before=os.fstat(fd)
        identity=lambda s:(s.st_dev,s.st_ino,s.st_size,s.st_mtime_ns,s.st_ctime_ns)
        require(stat.S_ISREG(before.st_mode)and 0<before.st_size<=MAX_BYTES,'bounded bootstrap regular file')
        def scan():
            live();os.lseek(fd,0,os.SEEK_SET);chunks=[];left=before.st_size
            while left:
                live();chunk=os.read(fd,min(65536,left));require(chunk,'bootstrap early EOF');chunks.append(chunk);left-=len(chunk)
            require(os.read(fd,1)==b'','bootstrap grew')
            raw=b''.join(chunks)
            require(_hash(raw)==digest and identity(os.fstat(fd))==identity(before)
                and identity(os.stat(path,follow_symlinks=False))==identity(before),'bootstrap changed')
            live();return raw
        raw=scan()
        try:yield raw
        finally:scan()
    finally:os.close(fd)


class _Pool:
    def __init__(self,stack,transport,root,live):self.stack=stack;self.w=transport;self.root=root;self.live=live;self.files={};self.inodes={};self.bytes=0
    def capture(self,path,digest,*,data=False,size=None):
        self.live();path=self.root/Path(path);key=str(path)
        require(path.is_absolute()and path==path.resolve(),'canonical captured path')
        found=self.files.get(key)
        if found is None:
            require(len(self.files)<512,'source file census bound')
            found=self.stack.enter_context(self.w.BoundFile(path,digest,capture=data,limit=MAX_BYTES if data else 1024**3,live=self.live))
            inode=(found.initial.st_dev,found.initial.st_ino)
            require(inode not in self.inodes,'hardlink source alias')
            self.inodes[inode]=key;self.files[key]=found;self.bytes+=found.initial.st_size
            require(self.bytes<=1024**3,'total source bytes bound')
        else:
            require(found.digest==digest,'conflicting captured source generation')
            if data and found.data is None:
                require(found.initial.st_size<=MAX_BYTES,'capture upgrade byte bound')
                found.data,observed=found.scan(True);require(observed==digest,'late capture changed')
        if size is not None:require(type(size)is int and found.initial.st_size==size,'source byte count differs')
        return found
    def read_binding(self,b,*,capture=False):
        b=self.w.normalized(b,self.root)
        f=self.capture(b['path'],b['sha256'],data=capture,size=b['bytes'])
        return f.data if capture else f.binding()
    def recheck(self):
        for f in self.files.values():self.live();f.recheck()
        self.live()


def _source_binding(value):
    require(type(value)is SourceBinding,'immutable explicit source binding')
    require(type(value.path)is str and 0<len(value.path)<=2048 and '\0'not in value.path,'source path token')
    path=Path(value.path)
    require(path.is_absolute()and str(path)==value.path and '..'not in path.parts,'canonical absolute source path')
    require(type(value.sha256)is str and _SHA.fullmatch(value.sha256),'source SHA256')
    require(type(value.bytes)is int and 0<value.bytes<=1024**3,'source byte bound')
    return asdict(value)


def _refinement_descriptors(values,root,owner_sha):
    """Inert immutable declarations, checked before opening any source."""
    require(type(values)is tuple and len(values)<=1,'ordered unique admitted refinements')
    for value in values:
        require(type(value)is ParentRefinement and type(value.parent_index)is int
            and value.parent_index==1,'only independently admitted original parent1')
        for role,path,digest,size in PARENT_ONE[:6]:
            require(_source_binding(getattr(value,role))==dict(path=str(root/path),sha256=digest,bytes=size),
                'accepted parent1 '+role+' binding differs')
        closure=value.closure
        require(type(closure)is ParentClosure,'explicit external parent closure')
        _source_binding(closure.owner);_source_binding(closure.operation)
        require(all(type(getattr(closure,k))is str for k in ('original_caller_session','final_completion_chunk','elapsed_seconds','authority')),
            'inert exact closure tokens')
        require(closure.owner.path==str(root/OWNER)and closure.owner.sha256==owner_sha
            and closure.operation==value.operation,'parent closure bound to current acceptance owner and operation')
        require(type(closure.exit_code)is int and closure.exit_code==0
            and closure.original_caller_session=='9158'and closure.final_completion_chunk=='1eda87'
            and closure.elapsed_seconds=='261.94229158400003'and closure.processes_closed is True
            and closure.independent_audit_accepted is True
            and closure.authority=='attributed-versioned-acceptance-owner-not-fresh-process-observation',
            'independently accepted external parent closure required')
        require(type(value.archived_sources)is tuple and len(value.archived_sources)<=1,'one explicit historical owner archive')
        for relation in value.archived_sources:
            require(type(relation)is ArchivedSource and type(relation.role)is str and relation.role=='acceptanceOwner','only historical acceptance-owner substitution')
            old,new=_source_binding(relation.original),_source_binding(relation.archive)
            require(old['path']==str(root/OWNER)and old['sha256']=='7b4fb29001fac6cd21b91f8e3e0b6f38a5fc93a53a52c4f7939a75304e548d7c'
                and old['bytes']==318717,'exact historical owner original tuple')
            require(new['path']!=old['path']and (new['sha256'],new['bytes'])==(old['sha256'],old['bytes']),
                'archive must preserve exact bytes at distinct physical path')
    return values


class _HistoricalReader:
    """Resolve only an explicitly declared old owner; never alter _Pool identity.

    Logical maps retain the original binding. Physical provenance contains the
    archive and live owner separately. All physical handles receive the ordinary
    final recheck. This is not fallback discovery or a generic source override.
    """
    def __init__(self,pool,relations,expected_owner):
        self.pool=pool;self.relations=relations;self.used=False
        require(type(relations)is tuple and len(relations)<=1,'unique historical owner mapping')
        self.original=pool.w.normalized(expected_owner,pool.root)
        for relation in relations:
            require(type(relation)is ArchivedSource and type(relation.role)is str and relation.role=='acceptanceOwner','historical role only')
            old,new=_source_binding(relation.original),_source_binding(relation.archive)
            require(old==self.original and old['path']==str(pool.root/OWNER),'historical owner mapping differs')
            require(new['path']!=old['path']and(new['sha256'],new['bytes'])==(old['sha256'],old['bytes']),'archive content differs')
            self.archive=new
    def read_binding(self,b,*,capture=False):
        b=self.pool.w.normalized(b,self.pool.root)
        if self.relations and b['path']==self.original['path']:
            require(b==self.original,'historical owner generation differs')
            raw=self.pool.read_binding(self.archive,capture=capture);self.used=True
            return raw if capture else dict(b)
        return self.pool.read_binding(b,capture=capture)
    def finish(self):
        require(not self.relations or self.used,'unused historical owner archive')
        return self.relations


def _parent_owner(raw,descriptor):
    text=raw.decode('utf-8',errors='strict');heading='## Independently accepted actual parent-one emission refinement\n'
    require(text.count(heading)==1,'unique parent1 acceptance section')
    section=text.split(heading,1)[1].split('\n## ',1)[0]
    for token in ('original caller session `9158`','final completion chunk `1eda87`','exit zero',
        '`261.94229158400003`','44,626','`76942e`','All 24 recorded PIDs, five process groups and the shared lock are absent'):
        require(token in section,'parent1 external closure attribution differs')
    for _,_,digest,size in PARENT_ONE:
        require(digest in section and (str(size)in section or format(size,',')in section),'parent1 accepted evidence differs')
    require(descriptor.closure.owner.bytes==len(raw),'parent1 owner size differs')


def _authenticate_parent(w,core,pool,descriptor,owner,ancestry,full,fdocs,export,original,a,reference,histories):
    """Consume accepted metadata once, without rerunning any numerical oracle."""
    _parent_owner(owner.data,descriptor)
    files={role:pool.capture(path,digest,data=True,size=size)for role,path,digest,size in PARENT_ONE}
    bound={role:f.binding()for role,f in files.items()}
    raw_plan,m=(core.decode_document(files[k].data)for k in ('plan','manifest'))
    named=('declaration','producer','producerControls','proposalReference','proposalReferenceControls',
        'verifier','verifierControls','comparisonReference','comparisonReferenceControls')
    # The plan stores relative source paths; published records store absolute
    # logical paths. Build a view, leaving captured JSON and old attribution intact.
    p={**raw_plan,**{k:w.normalized(raw_plan[k],pool.root)for k in (*named,'acceptanceOwner')}}
    for key in ('dependencies','originalBindings'):
        p[key]={k:w.normalized(b,pool.root)for k,b in raw_plan[key].items()}
    for key in ('runtimeBindings','operationalBindings'):
        p[key]=[w.normalized(b,pool.root)for b in raw_plan[key]]
    c=w.decode_operational(files['comparison'].data)
    op=w.decode_operational(files['operation'].data,document_class='operational-receipt')
    reader=_HistoricalReader(pool,descriptor.archived_sources,p['acceptanceOwner'])
    _owner_declaration(reader.read_binding(p['acceptanceOwner'],capture=True))
    scope='original-parent-1-emission-refinement'
    require(p['schema']=='braid-program/f6c-parent-emission-refinement-launch.v1'and p['scope']==scope
        and type(p['parentIndex'])is int and p['parentIndex']==1 and w.equal(p['limits'],w.LIMITS),'parent plan scope/limits')
    require(m['schema']=='braid-program/f6c-parent-emission-refinement-cover.v1'and m['scope']==scope
        and m['status']=='conditional_complete'and m['accepted']is False,'parent manifest disposition')
    require(c['schema']=='braid-program/f6c-parent-emission-refinement-conformance.v1'and c['scope']==scope
        and c['accepted']is True and c['analysis']['conditional_final_cover_conformant']is True
        and c['analysis']['conditional_query_replay_conformant']is True,'independent parent comparison required')
    require(op['schema']=='braid-program/f6c-parent-emission-refinement-operation.v1'
        and op['scope']=='operational-original-parent1-refinement-completion-only'and op['accepted']is True
        and type(op['parentIndex'])is int and op['parentIndex']==1,'parent operation disposition')
    closure=number(descriptor.closure.elapsed_seconds)
    require(0<=F(op['elapsedSecondsBeforePublication'])<closure<=1800,'prepublication is not external closure')
    for obj in (m['claims'],c['candidateClaims'],op['claims']):
        require(type(obj)is dict and len(obj)==15 and all(v is False for v in obj.values()),'parent scientific authority promoted')
    for key in ('accelerationEvaluated','eomExecuted','wholeHistoryMetrics'):require(op[key]is False,'parent numerical authority promoted')
    expected_original={k:ancestry[k]for k in ('export','reconstruction','guards')}
    expected_original['fullEntry']=pool.files[str(pool.root/'scripts/eom/run-f6c-cached-root-cover-full.mjs')].binding()
    expected_original.update(('full'+k[0].upper()+k[1:],v)for k,v in full.items())
    require(w.equal(w.source_map(p['originalBindings'].values(),pool.root),w.source_map(expected_original.values(),pool.root))
        and set(p['originalBindings'])==set(expected_original),'parent exact original sources')
    for key,b in expected_original.items():require(w.equal(p['originalBindings'][key],b),'original role mapping differs')
    subjects=[*(p[k]for k in named),*p['dependencies'].values()]
    for group,n in ((subjects,23),(p['runtimeBindings'],159),(p['operationalBindings'],8)):
        w.binding_list(group,n);require(len(w.source_map(group,pool.root))==n,'parent source group uniqueness')
    current=[*subjects,*p['runtimeBindings'],*p['operationalBindings'],*p['originalBindings'].values(),p['acceptanceOwner'],bound['plan']]
    current_map=w.source_map(current,pool.root);require(len(current_map)==204,'parent declared204 source closure')
    # _full_chain has already independently derived and captured this exact198.
    # Reuse it; do not derive the ancestry from an unverified parent receipt.
    historical=fdocs['admission']['sourceBindings'];historical_map=w.source_map(historical,pool.root)
    historical_logs=[stage['process'][key]for stage in fdocs['admission']['stages']for key in ('stdoutLog','stderrLog')]
    combined=w.source_map([*historical,*historical_logs,*current],pool.root);require(len(combined)==230,'parent combined230 source closure')
    for b in combined.values():reader.read_binding(b)
    for obj in (m,c):
        require(w.equal(w.source_map(obj['historicalSourceBindings'],pool.root),historical_map),'parent historical membership differs')
        for key in ('originalBindings','acceptanceOwner','priorCoverClosure'):require(w.equal(obj[key],p[key]),'parent original/owner attribution differs')
        require(w.equal(obj['launchPlan'],bound['plan']),'parent plan binding differs')
    for key,expected in (('subjectSourceBindings',subjects),('runtimeBindings',p['runtimeBindings']),('operationalBindings',p['operationalBindings'])):
        require(w.equal(w.source_map(m[key],pool.root),w.source_map(expected,pool.root)),'parent group bindings differ')
    for key in ('producer','verifier','declaration'):require(w.equal(m[key],p[key]),'parent implementation role differs')
    require(w.equal(c['verifier'],p['verifier'])and w.equal(op['plan'],bound['plan']),'parent verifier/operation plan differs')
    outputs=[bound[k]for k in ('queries','rows','pieces','manifest')]
    comparison_sources=w.source_map([*combined.values(),*outputs],pool.root)
    require(len(comparison_sources)==234 and w.equal(w.source_map(c['sourceBindings'],pool.root),comparison_sources),'parent comparison234 source closure')
    require(w.equal(w.source_map(op['sourceBindings'],pool.root),current_map),'parent operation204 source closure')
    for key in ('queries','rows','pieces'):
        require(w.equal(m[key],bound[key])and w.equal(c[key],bound[key]),'parent stream binding differs')
    require(w.equal(c['manifest'],bound['manifest']),'parent comparison manifest differs')
    census=dict(cells=1,members=8,queries=3584,pairRows=64,ordinaryPairs=56,selfZeros=8,pieceRecords=112)
    require(w.equal(m['census'],census)and w.equal(m['helperCalls'],dict(build=1,queries=3584,cover=1)),'parent exact census')
    for key,n in dict(query_count=3584,row_count=64,piece_record_count=112,ordinary_nonself_rows=56,self_exclusion_rows=8,
        oldest_boundary_checks=56,final_strict_face_checks=112).items():
        require(type(c['analysis'][key])is int and c['analysis'][key]==n,'parent comparison census')
    _seq(op['stages'],2)
    for item,stage in zip(op['stages'],('producer','comparison')):
        proc=item['process'];ad=proc['admission'];done=ad['completion']
        require(item['stage']==stage and proc['accepted']is True and proc['processesClosed']is True
            and w.equal(proc['exit'],dict(code=0,signal=None))and ad['accepted']is True
            and ad['h3EvidenceEligible']is False and done['completed']is True and done['accepted']is(stage=='comparison'),
            'parent closed successful stage required')
        require(w.equal(proc['stdoutLog'],ad['completionLog'])and w.equal(proc['stderrLog'],ad['stderrLog']),'parent stage log binding differs')
        raw=reader.read_binding(proc['stdoutLog'],capture=True);reader.read_binding(proc['stderrLog'])
        require(raw.endswith(b'\n')and len(raw.splitlines())==1 and w.equal(w.decode_operational(raw),done),'parent fresh stage log differs')
        expected=outputs if stage=='producer'else outputs+[bound['comparison']]
        require(w.equal(ad['outputs'],expected),'parent admitted stage outputs')
        require(w.equal(done['outputs']if stage=='producer'else[done['output']],outputs if stage=='producer'else[bound['comparison']]),'parent completion outputs')
        want=historical_map if stage=='producer'else comparison_sources
        require(w.equal(w.source_map(ad['capturedSourceBindings'],pool.root),want),'parent stage source membership')
        require(w.equal(w.source_map(ad['historicalSourceBindings'],pool.root),historical_map),'parent stage historical membership')
        for b in ad['capturedSourceBindings']:reader.read_binding(b)
        _seq(proc['gates'],1);gate=proc['gates'][0]
        require(gate['retired']is True and gate['acknowledged']is True and gate['measurement']['code']==0
            and gate['measurement']['signal']is None,'parent stage gate closure')
    # Capture the final observations as evidence of the accepted old run, not a
    # new process observation. Original external closure remains separately bound.
    raw=files['resource_log'].data
    require(raw.endswith(b'\n'),'parent resource stream terminated')
    lines=raw.split(b'\n')[:-1]
    require(len(lines)==1055 and all(0<len(line)<=131072 for line in lines),'parent resource stream census')
    rss=[w.decode_operational(line)for line in lines]
    for j,row in enumerate(rss):
        require(row['kind']=='aggregate-rss'and 0<=F(row['elapsedSeconds'])<closure
            and(j==0 or F(rss[j-1]['elapsedSeconds'])<=F(row['elapsedSeconds'])),'parent resource time ordering')
        require(type(row['aggregateResidentBytes'])is int and 0<=row['aggregateResidentBytes']<=2*1024**3
            and 0<=F(row['sampleGapMs'])<=1000,'parent resource limits')
    # Independent original-token identity reconstruction, not numerical work.
    hkeys=('id','pathKey','polarity','charge','historyFingerprint','coverageStart','coverageEnd')
    skeys=('startTime','endTime','coefficients','positionErrors','velocityErrors','positionError','velocityError')
    raw_histories=[dict(**{k:h[k]for k in hkeys},segments=[{k:s[k]for k in skeys}for s in h['segments']])for h in export['retainedHistories']]
    generation=_hash(json.dumps(raw_histories,sort_keys=True,separators=(',',':'),ensure_ascii=True,allow_nan=False).encode('ascii'))
    rb=lambda b:dict(lower=b.lower,upper=b.upper,precision=90)
    parent=dict(schema='braid-program/f6c-original-parent-refinement-input.v1',parentIndex=1,frameIndex=0,
        frame=dict(lower=export['acceptedFrames'][0]['time'],upper=export['acceptedFrames'][1]['time'],precision=90),
        reception=rb(original.reception),oldestTime='-8',historyGenerationSha256=generation,originalCoverBinding=full['manifest'],
        originalEmissions=[dict(receiverIndex=i,transmitterIndex=j,receiverId=LABELS[i],transmitterId=LABELS[j],emission=rb(original.rows[8*i+j].emission))
            for i in range(8)for j in range(8)if i!=j])
    require(w.equal(m['parent'],parent)and w.equal(c['parent'],parent)and w.equal(c['analysis']['parent'],parent),'parent original history/interval identity differs')
    require(w.equal(m['members'],[{k:h[k]for k in hkeys[:5]}for h in raw_histories]),'parent original members differ')
    w.records(core,files['queries'].data,3584)  # recorded census, never query replay
    bindings=tuple(a.Binding(**v)for v in w.mathematical_bindings(ancestry,bound))
    selected=_parents_from_raw(a,reference,w.records(core,files['rows'].data,64),w.records(core,files['pieces'].data,112),
        histories,bindings,cells=1,refined=True,original_indices=(1,))[0]
    require(selected.reception==original.reception,'parent refinement original reception differs')
    for old,new in zip(original.rows,selected.rows):
        if new.emission is not None:
            require(number(old.emission.lower)<number(new.emission.lower)<=number(new.emission.upper)<number(old.emission.upper),
                'accepted parent emission must narrow both sides')
    return selected,reader.finish()


def _owner_declaration(raw):
    require(type(raw)is bytes and 0<len(raw)<=MAX_BYTES,'bounded acceptance-owner bytes')
    text=raw.decode('utf-8',errors='strict');heading='### Independently Accepted Actual Full F6c Conditional Cover\n'
    require(text.count(heading)==1,'unique full acceptance-owner section')
    section=text.split(heading,1)[1].split('\n### ',1)[0]
    for token in ('original caller session `13512`','final completion chunk `c21aa7`','exit zero',
                  '`862.951823625`','Independent post-closure review accepts all 160',FULL_BASE):
        require(token in section,'full closure-owner identity differs: '+token)
    for _,_,digest,size in FULL[:-1]:require(digest in section and str(size)in section,'full closure-owner output differs')
    return ('attributed-versioned-acceptance-owner-not-fresh-process-observation','13512','c21aa7','0','862.951823625')


def _entry_pins(raw):
    text=raw.decode('utf-8',errors='strict')
    block=text.split('export const PINS = Object.freeze({',1)[1].split('\n});',1)[0]
    result={}
    for line in block.splitlines():
        if not line.strip():continue
        match=re.fullmatch(r'\s*(?:"([^"]+)"|\[([A-Z_]+)\]): "([a-f0-9]{64})",',line)
        require(match is not None,'frozen entry binding syntax differs')
        path,name,digest=match.groups()
        if name:
            matches=re.findall(r'export const '+re.escape(name)+r' = "([^"]+)";',text)
            require(len(matches)==1,'entry binding constant');path=matches[0]
        require(path not in result,'duplicate entry pin');result[path]=digest
    require(len(result)==35,'full fixed entry pin census')
    return result


def _full_chain(w,core,docs,bound,entry_raw,pool,owner_raw):
    """Authenticate preserved full metadata; no root or geometry replay."""
    _owner_declaration(owner_raw)
    p,m,c,a=(docs[k]for k in ('plan','manifest','comparison','admission'))
    _keys(p,('schema','scope','resourcePlan','comparisonContract','operationalBindings','controlBindings','python','pythonRealPath','git','node'))
    require(p['schema']=='braid-program/f6c-cached-root-cover-full-launch.v1'and p['scope']=='full','full plan identity')
    contract=p['comparisonContract'];_keys(contract,('declarationSha256','verifierSha256','scope','subjectSourceBindings','runtimeBindings'))
    require(contract['scope']=='full'and contract['verifierSha256']==dict((r,h)for r,_,h in SOURCES)['rootComparison']
        and contract['declarationSha256']=='7c2a8b0bb06f46da158e0dfe2cb313dd72e2edff3c411e87c1588aa6d028f9e4','full comparison contract')
    expected=[]
    for path,digest in _entry_pins(entry_raw).items():expected.append(pool.capture(path,digest).binding())
    for group,n in ((contract['subjectSourceBindings'],4),(contract['runtimeBindings'],158),(p['operationalBindings'],6),(p['controlBindings'],2)):
        w.binding_list(group,n);expected.extend(pool.read_binding(b)for b in group)
    expected.extend((pool.read_binding(p['resourcePlan']),bound['plan']))
    source_map=w.source_map(expected,pool.root)
    require(len(source_map)==198,'complete full198 source closure')
    w.binding_list(a['sourceBindings'],198)
    require(w.equal(w.source_map(a['sourceBindings'],pool.root),source_map),'full receipt source closure differs')
    require(m['scope']=='full'and m['status']=='conditional_complete'and m['accepted']is False,'full manifest disposition')
    require(c['schema']=='braid-program/f6c-continuous-reception-root-cover-conformance.v1'and c['scope']=='full'and c['accepted']is True,'full comparison disposition')
    require(a['schema']=='braid-program/f6c-cached-root-cover-full-admission.v1'and a['scope']=='full'and a['accepted']is True and a['processesClosed']is True,'full admission disposition')
    require(type(a['elapsedSecondsBeforePublication'])in(int,Decimal)and F(0)<=F(a['elapsedSecondsBeforePublication'])<F('862.951823625'),'full prepublication/fresh closure order')
    for name in ('eomExecuted','fullRunAuthorized','h3EvidenceEligible','historicalTrajectoryIdentityEstablished','metricsAvailable'):require(a[name]is False,'full authority promoted')
    require(w.equal(c['claims'],dict(conditionalRootCoverValidated=True,reconstructedFamilyApplicabilityAuthenticated=True,
        historicalTrajectoryIdentityEstablished=False,rootExecutionAuthorized=False,metricsAvailable=False,h3EvidenceEligible=False,scoreAuthorized=False,eomExecuted=False)),'full comparison claims')
    analysis=c['analysis'];require(analysis['accepted']is False and analysis['conditionalEnclosuresConformant']is True,'full conditional comparison absent')
    for k,n in dict(cellCount=160,pairCellCertificates=10240,ordinaryNonselfRows=8960,selfExclusionRows=1280,distinctNonselfFaceChecks=17920,pieceRecordCount=17920,recordedGeometryPieceVisits=14639800).items():
        require(type(analysis[k])is int and analysis[k]==n,'full analysis census')
    for obj,key,role in ((m,'rows','rows'),(m,'pieces','pieces'),(m,'launchPlan','plan'),(c,'rows','rows'),(c,'pieces','pieces'),(c,'manifest','manifest'),(c,'launchPlan','plan'),(a,'plan','plan')):
        require(w.equal(w.binding(obj[key]),bound[role]),'full output chain differs')
    for key in ('subjectSourceBindings','runtimeBindings'):require(w.equal(m[key],contract[key]),'full source/runtime contract differs')
    _seq(a['stages'],2)
    for item,stage in zip(a['stages'],('consumer','comparison')):
        proc,ad=item['process'],item['admission'];done=ad['completion']
        require(item['stage']==stage and proc['accepted']is True and proc['processesClosed']is True
            and w.equal(proc['exit'],dict(code=0,signal=None))and ad['accepted']is True and w.equal(proc['admission'],ad),'full closed stage')
        _seq(proc['gates'],1);gate=proc['gates'][0]
        require(gate['retired']is True and gate['acknowledged']is True and gate['measurement']['code']==0 and gate['measurement']['signal']is None,'full gate closure')
        require(done['completed']is True and done['accepted']is(stage=='comparison')and done['h3EvidenceEligible']is False,'full completion authority')
        require(w.equal(proc['stdoutLog'],ad['completionLog']),'full completion log binding')
        raw=pool.read_binding(proc['stdoutLog'],capture=True);pool.read_binding(proc['stderrLog'])
        require(raw.endswith(b'\n')and len(raw.splitlines())==1 and w.equal(w.decode_operational(raw),done),'fresh full stage log differs')
        outputs=[bound[k]for k in ('rows','pieces','manifest')]if stage=='consumer'else[bound['comparison']]
        require(w.equal(ad['outputs'],outputs),'full admitted outputs')
        require(w.equal(done['outputs']if stage=='consumer'else[done['output']],outputs),'full completed outputs')
    # Pinned final logs retain observations beyond the prepublication receipt.
    # They do not independently contain the external coordinator exit.
    def lines(raw):
        require(raw.endswith(b'\n'),'full log terminated');parts=raw.split(b'\n')[:-1]
        require(0<len(parts)<=10000 and all(0<len(x)<=131072 for x in parts),'full log bounds')
        return[w.decode_operational(x)for x in parts]
    launcher=lines(docs['launcherLog']);rss=lines(docs['resourceLog'])
    hosts=[x for x in launcher if x.get('kind')=='host-resource']
    require(len(hosts)==62 and len(rss)==3447,'full final observation census')
    require(w.equal(hosts[:len(a['hostObservationsBeforePublication'])],a['hostObservationsBeforePublication']),'full host prefix')
    for j,x in enumerate(rss):
        require(type(x)is dict and x['kind']=='aggregate-rss'and 0<=F(x['elapsedSeconds'])<F('862.951823625')
            and(j==0 or F(rss[j-1]['elapsedSeconds'])<=F(x['elapsedSeconds'])),'full RSS order')
        require(type(x['aggregateResidentBytes'])is int and 0<=x['aggregateResidentBytes']<=2*1024**3
            and 0<=F(x['sampleGapMs'])<=1000,'full RSS/gap limits')
    prefix=a['observationsBeforePublication'];require(prefix['samples']==3444
        and max(x['aggregateResidentBytes']for x in rss[:3444])==prefix['maximumSampledRSSBytes'],'full prepublication RSS prefix')
    return len(source_map)


def _parents_from_raw(a,reference,rows,pieces,histories,bindings,*,cells,refined,original_indices=None):
    """Exact projection of complete bound records; no geometry computation."""
    require(type(rows)is list and len(rows)==64*cells and type(pieces)is list and len(pieces)==112*cells,'raw parent census')
    if original_indices is None:original_indices=tuple(range(cells))
    require(type(original_indices)is tuple and len(original_indices)==cells
        and all(type(n)is int and 0<=n<160 for n in original_indices)
        and tuple(sorted(set(original_indices)))==original_indices,'ordered original parent identities')
    result=[];piece_index=0;clips={}
    def box(raw):
        _keys(raw,('lower','upper','precision'));require(type(raw['precision'])is int and raw['precision']==90,'raw90 precision')
        require(number(raw['lower'])<=number(raw['upper']),'raw ordered interval');return a.Bounds(raw['lower'],raw['upper'])
    for cell_index in range(cells):
        converted=[];reception=None
        for local in range(64):
            index=64*cell_index+local;raw=rows[index];_keys(raw,reference.ROW_KEYS)
            i,j=divmod(local,8)
            require(type(raw['rowIndex'])is int and raw['rowIndex']==index and type(raw['cellIndex'])is int and raw['cellIndex']==original_indices[cell_index]
                and type(raw['receiverIndex'])is int and raw['receiverIndex']==i and type(raw['transmitterIndex'])is int and raw['transmitterIndex']==j
                and raw['receiverId']==LABELS[i]and raw['transmitterId']==LABELS[j],'raw ordered row identity')
            reference.flags(raw['libraryFlags'],reference.ROOT_FLAGS)
            t=box(raw['reception'])
            if reception is None:reception=t
            require(t==reception,'same raw reception tokens')
            hashes=[]
            for role,member,interval in (('receiver',i,raw['reception']),('transmitter',j,raw['emission'])):
                pointer=raw[role+'PieceRecord']
                if i==j:require(pointer is None,'self piece must be absent');hashes.append(None);continue
                require(type(pointer)is int and pointer==piece_index,'raw piece ordering')
                piece=pieces[piece_index];_keys(piece,reference.PIECE_KEYS);b=box(interval)
                expected=_cached_coverage(clips,histories,member,number(b.lower),number(b.upper))
                require(_same(piece,dict(recordIndex=piece_index,rowIndex=index,role=role,memberId=LABELS[member],
                    historyDigest=histories[member].digest,requestedInterval=interval,touchedPieceCount=expected[0],
                    firstIndex=expected[1],lastIndex=expected[2],contiguousIndexRange=[expected[1],expected[2]],clippedPiecesSha256=expected[3])),'original closed piece projection differs')
                hashes.append(expected[3]);piece_index+=1
            fields=[]
            for key in ('emission','oldestResidual','lowerFaceResidual','upperFaceResidual','distance','transmitterFactor','receiverFactor'):
                value=raw[key]
                if i==j:require(value is None,'self geometry absent');fields.append(None)
                else:fields.append(box(value))
            displacement=raw['displacement']
            if i==j:require(displacement is None,'self displacement absent');d=None
            else:_seq(displacement,3);d=tuple(box(v)for v in displacement)
            e,old,lower,upper,distance,dt,dr=fields
            converted.append(a.RootRow(LABELS[i],LABELS[j],t,e,raw['ordinaryRootsPerReception'],raw['coincidentEndpointExcluded'],
                old,lower,upper,d,distance,dt,dr,*hashes,raw['rootFreeComplementConditional'],raw['retainedBoundaryContact']))
        result.append(ParentCell(original_indices[cell_index],reception,tuple(converted),bindings,refined))
    require(piece_index==len(pieces),'complete piece EOF')
    return tuple(result)


@contextmanager
def open_adapter(repo_root,*,adapter_sha256,controls_sha256,closure_owner_sha256,deadline,parent_refinements=()):
    """Capture-only constructor. Caller fixes all three expected hashes first.

    deadline is the caller's finite monotonic absolute deadline, at most1800s
    away. This library checks it at bounded read/calculation boundaries; a
    separately admitted executor remains responsible for process supervision.
    """
    root=Path(repo_root)
    require(root.is_absolute()and root==root.resolve()and root==Path(__file__).resolve().parents[2],'executing canonical repository')
    for h in (adapter_sha256,controls_sha256,closure_owner_sha256):require(type(h)is str and _SHA.fullmatch(h),'explicit pre-fixed expected hash')
    parent_refinements=_refinement_descriptors(parent_refinements,root,closure_owner_sha256)
    began=time.monotonic();require(type(deadline)in(int,float)and began<deadline<=began+1800,'finite bounded absolute deadline')
    def live():require(time.monotonic()<deadline,'adapter inclusive deadline')
    adapter=None
    transport_path,transport_sha=next((p,h)for r,p,h in SOURCES if r=='transport')
    with _bootstrap(root/transport_path,transport_sha,live)as raw:
        with _module(raw,root/transport_path)as w,ExitStack()as stack:
            pool=_Pool(stack,w,root,live)
            own=pool.capture(SELF,adapter_sha256,data=True)
            require(compile(own.data,_EXECUTING_CODE.co_filename,'exec',dont_inherit=True)==_EXECUTING_CODE,'executing adapter bytes differ')
            pool.capture(CONTROLS,controls_sha256)
            module_roles=('mapping','decoder','rootComparison','acceleration','integral','correlated','gk','geometry','captureHelper')
            source={role:pool.capture(path,digest,data=role in module_roles+('fullEntry','geometryHistory','geometryRoots','geometryIntervals'))for role,path,digest in SOURCES}
            modules={role:stack.enter_context(_module(source[role].data,source[role].path))for role in module_roles}
            # The frozen helper owns private relative imports and their cleanup.
            # The alias remains continuous_reception_roots for the cached bytes.
            captured={alias:(str(source[role].path),source[role].data,source[role].digest)for alias,role in
                (('decimal_interval','geometryIntervals'),('certified_history','geometryHistory'),('continuous_reception_roots','geometryRoots'))}
            geometry_modules=stack.enter_context(modules['captureHelper'].captured_package(captured))
            reference,core=modules['mapping'],modules['decoder']
            ancestry_files={role:pool.capture(p,h,data=role in ('export','manifest','comparison','admission','reconstruction','guards','priorPlan'))for role,p,h in reference.FIXED}
            ancestry={k:v.binding()for k,v in ancestry_files.items()}
            old={k:w.decode_role(core,ancestry_files[k].data,k)for k in ('export','manifest','comparison','admission','reconstruction','guards','priorPlan')}
            reference.authenticate_prior(old,ancestry)
            for b in old['admission']['sourceBindings']:pool.read_binding(b)
            modules['rootComparison'].validate_premises(old['export'],old['reconstruction'],old['guards'])
            refined_files={role:pool.capture(p,h,data=True)for role,p,h in w.REFINED};refined={k:v.binding()for k,v in refined_files.items()}
            rdocs={k:w.decode_role(core,refined_files[k].data,k)for k in ('manifest','comparison','admission','plan')}
            w.authenticate_refinement(rdocs,refined,ancestry,root,w.decode_operational,pool.read_binding)
            logs={role:pool.capture(p,h,data=True,size=n).data for role,p,h,n in w.PRIOR_OPERATIONS}
            w.authenticate_observations(rdocs['admission'],logs,w.decode_operational)
            w.records(core,refined_files['queries'].data,3584)  # census only; no replay
            owner=pool.capture(OWNER,closure_owner_sha256,data=True)
            full_files={role:pool.capture(p,h,data=True,size=n)for role,p,h,n in FULL};full={k:v.binding()for k,v in full_files.items()}
            fdocs={k:w.decode_role(core,full_files[k].data,k)for k in ('manifest','comparison','admission','plan')}
            fdocs.update((k,full_files[k].data)for k in ('launcherLog','resourceLog'))
            _full_chain(w,core,fdocs,full,source['fullEntry'].data,pool,owner.data)
            histories,_,_=_originals(old['export'],actual=True)
            a=modules['acceleration']
            math_bindings=lambda records:tuple(a.Binding(**v)for v in w.mathematical_bindings(ancestry,records))
            parents=_parents_from_raw(a,reference,w.records(core,full_files['rows'].data,10240),w.records(core,full_files['pieces'].data,17920),histories,math_bindings(full),cells=160,refined=False)
            override=_parents_from_raw(a,reference,w.records(core,refined_files['rows'].data,64),w.records(core,refined_files['pieces'].data,112),histories,math_bindings(refined),cells=1,refined=True)
            require(override[0].reception==parents[0].reception,'refined override same original parent')
            selected=override+parents[1:];archived=();refined_indices=frozenset({0})
            for descriptor in parent_refinements:
                parent,relations=_authenticate_parent(w,core,pool,descriptor,owner,ancestry,full,fdocs,old['export'],parents[1],a,reference,histories)
                selected=(selected[0],parent)+selected[2:];archived+=relations;refined_indices=frozenset({0,1})
            geometry=modules['geometry']
            require(rdocs['manifest']['speedUpper']=='0.85'and rdocs['manifest']['clearanceLower']=='0.27','authenticated shared geometry guards')
            geometry_guards=geometry.Guards('1',(rdocs['manifest']['speedUpper'],)*8,
                tuple(tuple('0'if x==y else rdocs['manifest']['clearanceLower']for y in range(8))for x in range(8)))
            geometry_references=geometry.References(geometry_modules['certified_history'],geometry_modules['continuous_reception_roots'],geometry_modules['decimal_interval'],a)
            provenance=tuple(sorted((path,f.digest,f.initial.st_size)for path,f in pool.files.items()))
            adapter=_build(a,modules['integral'],modules['correlated'],old['export'],selected,actual=True,
                provenance=provenance,pool=pool,source_sha=ancestry['export']['sha256'],gk=modules['gk'],
                geometry=geometry,geometry_references=geometry_references,geometry_guards=geometry_guards,
                _authenticated_refined_indices=refined_indices,historical_owner_archives=archived)
            pool.recheck();live()
            try:yield adapter
            finally:
                object.__setattr__(adapter,'_closed',True)
                pool.recheck()
        live()
    live()
