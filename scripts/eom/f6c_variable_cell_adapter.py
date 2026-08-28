"""Source-bound F6c variable-cell mapping with explicit geometry restriction.

open_adapter(repo_root, *, adapter_sha256, controls_sha256,
             closure_owner_sha256, deadline, parent_refinements=(),
             evidence_package=None) is a context manager. Construction
captures original files and authenticates preserved metadata only: NO root,
acceleration, residual or GK evaluation. The expected closure-owner hash MUST
be fixed before construction. The captured readiness version attributes the
accepted full run (13512/c21aa7, exit0,862.951823625s); text is not a new process
observation and its mutable owner is not called write-once. The old admission's
862.577186208s is prepublication, never substituted for the fresh observation.

project(frame_index, J) requires positive J in ONE original frame and parent
reception cell. The accepted refined cell0 overrides the broad full-cover row.
Sorted explicit ParentRefinements may additionally select authenticated original
parents1..159. Each needs separately bound independent acceptance. Historical
source generations may be read only through explicit ArchivedSource relations;
logical historical bindings and current physical provenance remain distinct.
An explicit EvidencePackage may replace only the frozen accepted parent1/2
payload inventory. It preserves logical records and archive attribution, holds
one checked physical package handle, and never falls back to loose members.
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
from types import ModuleType, MappingProxyType, SimpleNamespace


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
# Only these historical nonexecuting wrapper generations may be archived.
# The current adapter, numerical references and runtime are never remappable.
PARENT_ARCHIVE_SOURCES=(
 ('producer','scripts/eom/prepare-f6c-parent-emission-refinement.py','492882b63f074fd46253ee92974524c4fd6b43ae6190db23797c307251ed8544',57641),
 ('producerControls','tests/test_f6c_parent_emission_refinement_preparation.py','06cd99bc1f74c3b7dead6089ef20f468f7be8af41ae6702f45ec85d83a1a36ab',40808),
 ('verifier','scripts/eom/verify-f6c-parent-emission-refinement.py','0bb16c232736c895c4f3e38a75e2a0562084710ffdba2503b3ab4457216127fc',46134),
 ('verifierControls','tests/test_f6c_parent_emission_refinement_verification.py','92da2b09c629ecbc0fdcdddac9de69353da0e29795e0b1d3bf2d23a05a9a26f7',39696),
 ('operationalEntry','scripts/eom/run-f6c-parent-emission-refinement-pilot.mjs','398d604f9e5f8a5d85247df0d619c23726c727980881d185d3cc61545df563f6',48579),
 ('operationalControls','tests/f6c-parent-emission-refinement-pilot.test.js','231427f4a98561b8a4377a0a4894e7f7be31ffa8d5f77966d86f77daada4a3e0',20889),
)
# Exact second accepted parent generation, read only as historical metadata.
# Selection also requires its original plan tuple; parent number alone is not
# authority to route a different wrapper generation.
PARENT_TWO_ARCHIVE_PLAN=(PREFIX+'2026-08-27-f6c-parent-2-emission-refinement-launch.v2.json',
 '928dbe46bd133ad7bfc26b21e34368afabedcbf09b310066393d3b58588f7b0e',51509)
PARENT_TWO_ARCHIVE_SOURCES=(
 ('producer','scripts/eom/prepare-f6c-parent-emission-refinement.py','ff488499f2737860034602ce9559c3ebc817aa8413b827007fb31027815679d2',58397),
 ('producerControls','tests/test_f6c_parent_emission_refinement_preparation.py','517cc307251611177ec19cc5d71938a4086806f48583bcf8e3f2d04e9afb8d9f',43836),
 ('verifier','scripts/eom/verify-f6c-parent-emission-refinement.py','53595cc12589ab56c73a1613922bba2739704cbc78465e3d646d5ae6a43813db',46615),
 ('verifierControls','tests/test_f6c_parent_emission_refinement_verification.py','889d8721d2b51520c0fef78f6a954f9b510cbb46fdf9019205199dfa3658b5a9',42419),
 ('operationalEntry','scripts/eom/run-f6c-parent-emission-refinement-pilot.mjs','462247cf723339dbdc9ce9b4b897720cd4edcedc9b85c22b70694c41663f5c1b',56022),
 ('operationalControls','tests/f6c-parent-emission-refinement-pilot.test.js','dd88eae5729d8ecc5947a27966edb215074d12687f3b5cd0bfc3be69d0400bc1',33303),
)
# Exact historical nonexecuting documents changed only by later link edits.
# Their original mathematical/source identities remain the consumed identities.
ANCESTRY_ARCHIVE_SOURCES=(
 ('memberPredeclaration',PREFIX+'2026-08-26-f6c-normalized-member-acceleration-predeclaration.md','c67de8cce1370eed779b560c269d5ca0a7505bdb175d39cff1276b75a7e69853',16985),
 ('fullResourcePlan',PREFIX+'2026-08-27-f6c-root-cover-full-resource-plan.md','46a827d13a5e8f7a068e73e642f74d679ebf18e0b2e8f42ab53aab4de26598ef',13021),
)
# Storage code and literal accepted inventory are separately captured, never
# taken from a package's index. This initial inventory covers parents1/2 only.
PACKAGE_SOURCES=(
 ('reader','scripts/eom/f6c_evidence_package.py','9d888682514f23652b39bfaa53fdfb3ceab66e6ba88cf34222c156d226764ad6'),
 ('readerControls','tests/test_f6c_evidence_package.py','df81708fb1877ce549c4eacfd66c7d7f47f192d57d716a65f184039adb075cbf'),
 ('inventory','tests/fixtures/f6c-lossless-packaging-expectations.v1.json','79a91daedff0fdb712b5b76ff0a4d8c345711eb2c4b69c0731a509da701e48fc'),
)
# The pure v2 parser has independently frozen semantic expectations. Fresh
# operation authority is a separate, explicitly pinned captured instrument.
PARENT_INVENTORY_SOURCES=(
 ('parser','scripts/eom/f6c_parent_evidence_inventory.py','d69db22ad20881a94a950102e70d438792493fa52efde666575bc53100bd784b'),
 ('parserControls','tests/test_f6c_parent_evidence_inventory.py','369091d5a0996fb547a70ba8e9aa8b3fe5570cf046863872bfaeb491bd0cf551'),
 ('schema','.local-data/braid-analysis/f6c-whole-history-20260828/numerical-review/generic-inventory-v2-closed-schema-expectations.md','856c05077241bf9c28d75c21fcb50beac0afd23546c4bbbad9be7abd5d0f6710'),
)
# Independently accepted pure checker; an inventory cannot name its own authority.
# These pins do not admit an unobserved batch or the separate I/O issuer.
FRESH_CLOSURE_SOURCES=(
 ('instrument','.local-data/braid-analysis/f6c-whole-history-20260828/numerical-review/independent_parent_batch_closure.py','3eefbb8767a0337024066f8949770fbf47f39edc308aaf598372cf95b3dba223'),
 ('controls','.local-data/braid-analysis/f6c-whole-history-20260828/numerical-review/independent_parent_batch_closure_controls.py','f45ccfb0ff9609fe267f25c1ba2521ec58134f9caf7d128b09e0adfde9e6a979'),
 ('contract','.local-data/braid-analysis/f6c-whole-history-20260828/numerical-review/fresh-parent-batch-closure-validator-expectations.md','7132bcf6db99bef0b2255418f656e3fb5900eb23fac9d1400d294d5ba8fd2eed'),
)
FRESH_NUMERICAL_SETTINGS=(
 '.local-data/braid-analysis/f6c-streamed-leaf-diagnostic-20260827/three-request-independent-expectations.v1.json',
 'ebd03873e7b57d6f59508b36d3ef1f1f797071524d1ed9cf7ceee33cdc431d51',6116,
)
PARENT_FIXED=(
 ('declaration',PREFIX+'2026-08-27-f6c-parent-emission-refinement-reference.md','652d77241f9b5c082e7d15e2bb62328f346760548f9f13e4ffe7562c4cad0733'),
 ('proposalReference','scripts/eom/f6c_parent_emission_refinement.py','1517575f3df783af36d2bf2b758d19427e8ec85247efec892783716c263b7c27'),
 ('proposalReferenceControls','tests/test_f6c_parent_emission_refinement.py','f1650b5e73a06ecd7ed05bff10ba97949b42aa5330e84fb3514c2f868eff0fc2'),
 ('comparisonReference','scripts/eom/oracle/f6c_parent_emission_refinement_conformance.py','ffe91ad7cbfe4e41bf92203fe73b4195e0ad1437176dace9d12751e68aa2cbec'),
 ('comparisonReferenceControls','tests/test_f6c_parent_emission_refinement_conformance.py','18c21d6e84d0d6ae7e3b4ea35861a75b38d362d8aad1e0cc14715cea167a5a04'),
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
class EvidencePackage:
    package: SourceBinding
    inventory: SourceBinding


@dataclass(frozen=True,slots=True)
class AdmittedClosure:
    binding: SourceBinding
    expected_instrument: SourceBinding


@dataclass(frozen=True,slots=True)
class AcceptedParentEvidence:
    inventory: SourceBinding
    closures: tuple
    expected_authority: tuple
    package: SourceBinding | None = None


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
        '_geometry','_geometry_refs','_geometry_histories','_geometry_parents','_geometry_guards','_geometry_counts','_successful_counts','historical_owner_archives','fresh_provenance')
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
        require(type(_authenticated_refined_indices)is frozenset and 0 in _authenticated_refined_indices
            and all(type(p)is int and 0<=p<160 for p in _authenticated_refined_indices),'authenticated admitted parent indices')
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
        ('provenance',provenance),('fresh_provenance',()),('historical_owner_archives',historical_owner_archives),('_closed',False),('_pool',pool),('_actual',actual),('_issued',{}),('_evaluated',{}),('_clips',clips),('_residuals',[0]),('_successful_counts',[0,0]),
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
    def __init__(self,stack,transport,root,live):self.stack=stack;self.w=transport;self.root=root;self.live=live;self.files={};self.inodes={};self.bytes=0;self._observers=[]
    @contextmanager
    def observe(self,consumed):
        """Attribute physical reads during explicitly delimited metadata work."""
        require(type(consumed)is dict,'internal physical observation dictionary')
        self._observers.append(consumed)
        try:yield
        finally:
            require(self._observers[-1]is consumed,'nested physical observation order')
            self._observers.pop()
    def note(self,file):
        self.live();key=str(file.path)
        require(self.files.get(key)is file,'physical observation requires owned handle')
        s=file.initial;record=(key,file.digest,s.st_size)
        identity=(s.st_dev,s.st_ino,s.st_size,s.st_mtime_ns,s.st_ctime_ns)
        for consumed in self._observers:
            require(key not in consumed or consumed[key]==(record,identity),'observed physical generation changed')
            consumed[key]=(record,identity)
            require(len(consumed)<=512 and sum(v[0][2]for v in consumed.values())<=1024**3,'observed source census/bytes bound')
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
        self.note(found)
        return found
    def read_binding(self,b,*,capture=False):
        b=self.w.normalized(b,self.root)
        f=self.capture(b['path'],b['sha256'],data=capture,size=b['bytes'])
        return f.data if capture else f.binding()
    def adopt(self,physical):
        """Account an already owned package handle without opening it twice."""
        self.live();key=str(physical.path);inode=(physical.initial.st_dev,physical.initial.st_ino)
        require(key not in self.files and inode not in self.inodes,'duplicate package or hardlink source alias')
        require(len(self.files)<512 and self.bytes+physical.initial.st_size<=1024**3,'package physical source census/bytes bound')
        self.files[key]=physical;self.inodes[inode]=key;self.bytes+=physical.initial.st_size
        self.note(physical)
    def recheck(self):
        for f in self.files.values():self.live();f.recheck()
        self.live()


class _LogicalFile:
    """Inert historical metadata view; the backing physical handle stays owned."""
    def __init__(self,physical,original):
        self._physical=physical;self.path=Path(original.path);self.digest=original.sha256
        self.initial=physical.initial;self._original=original
    @property
    def data(self):return self._physical.data
    def binding(self):return asdict(self._original)


class _AncestryPool:
    """Two explicit document routes, never executable/runtime source overrides."""
    def __init__(self,pool,relations):
        self._pool=pool;self.root=pool.root;self.w=pool.w;self.live=pool.live
        self.files=pool.files;self.routes={};self.used=set()
        allowed={r:SourceBinding(str(self.root/p),h,n)for r,p,h,n in ANCESTRY_ARCHIVE_SOURCES}
        require(type(relations)is tuple and len(relations)<=2,'bounded ancestry document routes')
        destinations=set()
        forbidden={str(self.root/p)for _,p,_ in SOURCES}|{str(self.root/p)for _,p,_,_ in PARENT_ARCHIVE_SOURCES+ANCESTRY_ARCHIVE_SOURCES}|{str(self.root/p)for p in (SELF,CONTROLS,OWNER)}
        for r in relations:
            require(type(r)is ArchivedSource and type(r.role)is str and r.role in allowed,'known ancestry document role')
            old,new=_source_binding(r.original),_source_binding(r.archive)
            require(r.original==allowed[r.role]and old['path']not in self.routes,'exact unique ancestry generation')
            require(new['path']not in forbidden and new['path']not in destinations
                and(new['sha256'],new['bytes'])==(old['sha256'],old['bytes']),'distinct exact ancestry archive')
            self.routes[old['path']]=r;destinations.add(new['path'])
    def capture(self,path,digest,*,data=False,size=None):
        key=str(self.root/Path(path));route=self.routes.get(key)
        if route is None:return self._pool.capture(path,digest,data=data,size=size)
        require(digest==route.original.sha256 and(size is None or type(size)is int and size==route.original.bytes),'ancestry generation differs')
        physical=self._pool.capture(route.archive.path,route.archive.sha256,data=data,size=route.archive.bytes)
        self.used.add(key);return _LogicalFile(physical,route.original)
    def read_binding(self,b,*,capture=False):
        b=self.w.normalized(b,self.root)
        f=self.capture(b['path'],b['sha256'],data=capture,size=b['bytes'])
        return f.data if capture else f.binding()
    def recheck(self):
        require(self.used==set(self.routes),'unused ancestry archive')
        self._pool.recheck()


class _PackagePhysicalFile:
    """Physical-only provenance view of the reader's single retained handle."""
    def __init__(self,reader):
        self.reader=reader;self.path=Path(reader.physical_binding.path)
        self.digest=reader.physical_binding.sha256;self.data=None
        s=reader.physical_identity
        self.initial=SimpleNamespace(st_dev=s.device,st_ino=s.inode,st_size=s.bytes,
                                     st_mtime_ns=s.mtime_ns,st_ctime_ns=s.ctime_ns)
    def binding(self):return asdict(self.reader.physical_binding)
    def recheck(self):self.reader.recheck()
    def scan(self,*_):raise ValueError('package is not a direct scientific record')


class _PackageLogicalFile:
    def __init__(self,reader,member,logical):
        self.reader=reader;self.member=member;self._logical=logical
        self.path=Path(logical.path);self.digest=logical.sha256
        self.initial=SimpleNamespace(st_size=logical.bytes);self.data=None
    def binding(self):return asdict(self._logical)
    def capture(self):
        if self.data is None:self.data=self.reader.read_binding(self.member.original,capture=True)
        return self


class _PackagePool:
    """Exact inert member routes; archive attribution remains in descriptors.

    ``members`` comes only from the separately frozen literal inventory. The
    package is fully validated before this view is created. Nonpackaged sources
    retain ordinary capture, while any error on a declared route fails closed.
    """
    def __init__(self,pool,reader,members,descriptors):
        self._pool=pool;self.root=pool.root;self.w=pool.w;self.live=pool.live
        self.files=pool.files;self.reader=reader;self.routes={};self.views={}
        owner_path=str(self.root/OWNER);self.historical_owners=set()
        by_name={m.name:m for m in members}
        for d in descriptors:
            if d.parent_index not in (1,2):continue
            for role,_,_,_ in PARENT_ONE[:6]:
                m=by_name.get(f'parents/{d.parent_index}/{role}')
                require(m is not None and asdict(m.original)==asdict(getattr(d,role)),
                        'packaged parent descriptor generation differs')
            relations=tuple(r for r in d.archived_sources if r.role=='acceptanceOwner')
            require(len(relations)==1,'packaged parent requires exact historical owner relation')
            r=relations[0];m=by_name.get('owners/'+r.original.sha256)
            require(m is not None and asdict(m.original)==asdict(r.original)
                    and asdict(r.archive)==dict(path=m.source_path,sha256=m.original.sha256,bytes=m.original.bytes),
                    'historical archive and package owner differ')
        for m in members:
            original=SourceBinding(**asdict(m.original))
            if m.role=='acceptanceOwner':
                require(original.path==owner_path,'packaged historical owner path')
                self.historical_owners.add((original.sha256,original.bytes))
                logical=replace(original,path=m.source_path)
            else:
                require(m.source_path==original.path,'evidence package cannot redirect a logical path')
                logical=original
            require(logical.path not in self.routes and logical.path not in pool.files,
                    'duplicate packaged route or already captured loose evidence')
            self.routes[logical.path]=(m,logical)
        physical=_PackagePhysicalFile(reader);pool.adopt(physical)
    def capture(self,path,digest,*,data=False,size=None):
        self.live();key=str(self.root/Path(path));route=self.routes.get(key)
        if route is None:
            require(not(key==str(self.root/OWNER)and any(digest==h for h,_ in self.historical_owners)),
                    'historical package owner requires explicit archive route')
            return self._pool.capture(path,digest,data=data,size=size)
        m,logical=route
        require(digest==logical.sha256 and(size is None or type(size)is int and size==logical.bytes),
                'packaged logical generation differs')
        base=_physical_pool(self);base.note(base.files[str(self.reader.physical_binding.path)])
        view=self.views.get(key)
        if view is None:view=_PackageLogicalFile(self.reader,m,logical);self.views[key]=view
        if data:view.capture()
        return view
    def read_binding(self,b,*,capture=False):
        b=self.w.normalized(b,self.root)
        f=self.capture(b['path'],b['sha256'],data=capture,size=b['bytes'])
        return f.data if capture else f.binding()
    def recheck(self):self._pool.recheck()


def _packaged_pool(pool,selection,descriptors,deadline):
    require(type(selection)is EvidencePackage,'single immutable package selection')
    physical=_source_binding(selection.package);inventory=_source_binding(selection.inventory)
    required={r:(str(pool.root/p),h)for r,p,h in PACKAGE_SOURCES}
    require((inventory['path'],inventory['sha256'])==required['inventory'],'fixed independent package inventory required')
    require(physical['bytes']<=MAX_BYTES and physical['path'].startswith(str(pool.root/'.local-data/braid-analysis')+'/'),
            'bounded package in owned evidence lane')
    require(physical['path']not in pool.files,'package already captured')
    source={r:pool.capture(p,h,data=r in ('reader','inventory'))for r,p,h in PACKAGE_SOURCES}
    require(source['inventory'].initial.st_size==inventory['bytes'],'package inventory byte count')
    module=pool.stack.enter_context(_module(source['reader'].data,source['reader'].path))
    members=module.inventory_members(source['inventory'].data,expected_sha256=inventory['sha256'],root=pool.root)
    reader=pool.stack.enter_context(module.PackageReader(module.Binding(**physical),members,
        deadline=deadline,live=lambda _:pool.live()))
    return _PackagePool(pool,reader,members,descriptors)


def _source_binding(value):
    require(type(value)is SourceBinding,'immutable explicit source binding')
    require(type(value.path)is str and 0<len(value.path)<=2048 and '\0'not in value.path,'source path token')
    path=Path(value.path)
    require(path.is_absolute()and str(path)==value.path and '..'not in path.parts,'canonical absolute source path')
    require(type(value.sha256)is str and _SHA.fullmatch(value.sha256),'source SHA256')
    require(type(value.bytes)is int and 0<value.bytes<=1024**3,'source byte bound')
    return asdict(value)


def _physical_pool(pool):
    while hasattr(pool,'_pool'):pool=pool._pool
    return pool


def _file_identity(file):
    """Current physical identity, or the fixed original identity of a member."""
    if isinstance(file,_PackageLogicalFile):
        s=file.member.source_identity
        return dict(device=str(s.device),inode=str(s.inode),bytes=str(s.bytes),
                    mtimeNs=str(s.mtime_ns),ctimeNs=str(s.ctime_ns))
    s=file.initial
    return dict(device=str(s.st_dev),inode=str(s.st_ino),bytes=str(s.st_size),
                mtimeNs=str(s.st_mtime_ns),ctimeNs=str(s.st_ctime_ns))


def _fresh_selections(values,root):
    """Closed inert inputs checked before file capture or provider creation."""
    require(type(values)is tuple and len(values)<=159,'bounded immutable fresh selections')
    authority={str(root/p):h for role,p,h in FRESH_CLOSURE_SOURCES if role=='instrument'}
    inventories=set();closures=set();packages=set();metadata_bytes=0
    for value in values:
        require(type(value)is AcceptedParentEvidence,'explicit fresh evidence variant')
        b=_source_binding(value.inventory)
        require(b['bytes']<=16*1024**2 and value.inventory not in inventories,'bounded unique fresh inventory')
        inventories.add(value.inventory)
        metadata_bytes+=b['bytes']
        require(type(value.expected_authority)is tuple and len(value.expected_authority)==1,'one externally reviewed fresh authority')
        instrument=_source_binding(value.expected_authority[0])
        require(authority.get(instrument['path'])==instrument['sha256'],'unreviewed fresh closure instrument')
        require(type(value.closures)is tuple and 0<len(value.closures)<=159,'bounded immutable closure selection')
        for closure in value.closures:
            require(type(closure)is AdmittedClosure,'explicit immutable admitted closure')
            b=_source_binding(closure.binding);_source_binding(closure.expected_instrument)
            require(b['bytes']<=16*1024**2 and closure.binding not in closures,'bounded unique fresh closure')
            require(closure.expected_instrument==value.expected_authority[0],'externally fixed closure authority differs')
            closures.add(closure.binding)
            metadata_bytes+=b['bytes']
        if value.package is not None:
            b=_source_binding(value.package)
            require(b['bytes']<=MAX_BYTES and b['path'].startswith(str(root/'.local-data/braid-analysis')+'/')
                and value.package not in packages,'bounded unique explicitly selected package')
            packages.add(value.package)
    require(len(closures)<=159,'combined fresh closure bound')
    require(metadata_bytes<=MAX_BYTES,'aggregate fresh metadata byte bound')
    return values


class _FreshEvidencePool:
    """Exact original-tuple routes for explicitly selected fresh evidence.

    A package error never falls back to loose files. Distinct packages may
    share only the identical independently expected owner route; every package
    still contributes its own physical handle to the complete source union.
    """
    def __init__(self,pool):
        self._pool=pool;self.root=pool.root;self.w=pool.w;self.live=pool.live
        self.files=pool.files;self.routes={};self.views={};self.metadata=[]
        self.members={};self.member_paths={};self.member_inodes={};self.original_paths={}
    def add(self,members,reader):
        for member in members:
            self.live();original=SourceBinding(**asdict(member.original))
            require(member.role=='acceptanceOwner'or member.source_path==original.path,
                'cross-inventory nonowner physical redirect is forbidden')
            original_key=(original.path,original.sha256,original.bytes)
            previous=self.members.get(original_key)
            if previous is not None:
                require(member.role==previous.role=='acceptanceOwner'and asdict(member)==asdict(previous),
                    'conflicting shared evidence route')
                continue  # The first explicit identical owner route owns reads.
            s=member.source_identity;inode=(s.device,s.inode)
            prior_roles=self.original_paths.get(original.path,set())
            require(not prior_roles or prior_roles=={'acceptanceOwner'}and member.role=='acceptanceOwner',
                'cross-inventory original path generation alias')
            require(member.source_path not in self.member_paths and inode not in self.member_inodes,
                'cross-inventory physical path or original inode alias')
            require(inode not in _physical_pool(self._pool).inodes,'member aliases already captured physical source')
            self.members[original_key]=member;self.member_paths[member.source_path]=original_key
            self.member_inodes[inode]=original_key
            self.original_paths.setdefault(original.path,set()).add(member.role)
            aliases={original.path,member.source_path}
            for path in aliases:
                # The live owner is always a direct captured input, even when
                # an exact historical-consumption copy has the same bytes.
                if member.role=='acceptanceOwner'and path==str(self.root/OWNER):
                    direct=self.files.get(path)
                    if direct is not None and direct.digest==original.sha256:
                        require(direct.initial.st_size==original.bytes,'direct current owner byte count')
                        continue
                key=(path,original.sha256,original.bytes)
                prior=self.routes.get(key)
                if prior is not None:
                    prior_member,_=prior
                    require(member.role==prior_member.role=='acceptanceOwner'
                        and asdict(member)==asdict(prior_member),'conflicting shared evidence route')
                    continue
                require(path not in self.files or member.role=='acceptanceOwner'and path==str(self.root/OWNER),
                    'fresh member already captured outside its declared route')
                self.routes[key]=(member,reader)
            if reader is None:
                f=self._pool.capture(member.source_path,original.sha256,size=original.bytes)
                s=member.source_identity
                expected=dict(device=str(s.device),inode=str(s.inode),bytes=str(s.bytes),
                    mtimeNs=str(s.mtime_ns),ctimeNs=str(s.ctime_ns))
                require(_file_identity(f)==expected,'loose evidence original identity differs')
    def capture(self,path,digest,*,data=False,size=None):
        self.live();path=str(self.root/Path(path))
        if path==str(self.root/OWNER):
            direct=self.files.get(path)
            if direct is not None and direct.digest==digest:
                require(size is None or size==direct.initial.st_size,'direct current owner byte count')
                return self._pool.capture(path,digest,data=data,size=size)
        found=[(k,v)for k,v in self.routes.items()if k[0]==path and k[1]==digest and(size is None or k[2]==size)]
        if not found:
            require(not any(k[0]==path for k in self.routes),'declared fresh evidence generation differs')
            return self._pool.capture(path,digest,data=data,size=size)
        require(len(found)==1,'ambiguous fresh evidence route')
        key,(member,reader)=found[0]
        if reader is None:
            physical=self._pool.capture(member.source_path,digest,data=data,size=member.original.bytes)
            return _LogicalFile(physical,SourceBinding(*key))
        view_key=(member.source_path,member.original.sha256,member.original.bytes)
        base=_physical_pool(self);base.note(base.files[str(reader.physical_binding.path)])
        if view_key not in self.views:
            self.views[view_key]=_PackageLogicalFile(reader,member,SourceBinding(**asdict(member.original)))
        view=self.views[view_key]
        if data:view.capture()
        return view
    def read_binding(self,b,*,capture=False):
        b=self.w.normalized(b,self.root)
        f=self.capture(b['path'],b['sha256'],data=capture,size=b['bytes'])
        return f.data if capture else b
    def read_identity(self,b):
        b=self.w.normalized(b,self.root)
        return _file_identity(self.capture(b['path'],b['sha256'],size=b['bytes']))
    def release(self,bindings):
        """Drop optional raw transcript buffers, never the retained handles."""
        for binding in bindings:
            b=self.w.normalized(binding,self.root)
            route=self.routes.get((b['path'],b['sha256'],b['bytes']))
            if route is None:continue
            member,reader=route
            if reader is None:
                f=self.files.get(member.source_path)
                if f is not None:f.data=None
            else:
                view=self.views.get((member.source_path,member.original.sha256,member.original.bytes))
                if view is not None:view.data=None
    def recheck(self):self._pool.recheck()


def _fresh_evidence_pool(pool,selections,deadline,already_refined):
    """Capture v2 metadata/storage; independent operation audit follows later."""
    base=_physical_pool(pool);out=_FreshEvidencePool(pool)
    source={role:pool.capture(path,h,data=role in ('reader','parser'))for role,path,h in
        (*PACKAGE_SOURCES[:2],*PARENT_INVENTORY_SOURCES)}
    package=base.stack.enter_context(_module(source['reader'].data,source['reader'].path))
    parser=base.stack.enter_context(_module(source['parser'].data,source['parser'].path))
    indices=set(already_refined);raw_bytes=0
    for selection in selections:
        inventory_raw=pool.read_binding(asdict(selection.inventory),capture=True)
        admitted=tuple(dict(binding=asdict(c.binding),raw=pool.read_binding(asdict(c.binding),capture=True),
            expectedInstrument=asdict(c.expected_instrument))for c in selection.closures)
        raw_bytes+=len(inventory_raw)+sum(len(x['raw'])for x in admitted)
        require(raw_bytes<=MAX_BYTES,'aggregate fresh metadata byte bound')
        members=parser.parse_inventory(inventory_raw,asdict(selection.inventory),package,
            admitted_closures=admitted,expected_authority=tuple(asdict(b)for b in selection.expected_authority))
        inventory=parser.decode(inventory_raw,asdict(selection.inventory))
        fresh=tuple(p['parentIndex']for p in inventory['parents'])
        require(not(indices&set(fresh))and len(indices)+len(fresh)<=160,'duplicate or overlapping selected parent')
        indices.update(fresh)
        current=inventory['currentAcceptanceOwner']
        require(current['binding']['path']==str(pool.root/OWNER),'direct canonical current owner')
        f=pool.capture(**dict(path=current['binding']['path'],digest=current['binding']['sha256'],size=current['binding']['bytes']))
        require(_file_identity(f)==current['identity'],'current owner original identity differs')
        reader=None
        if selection.package is not None:
            reader=base.stack.enter_context(package.PackageReader(package.Binding(**asdict(selection.package)),members,
                deadline=deadline,live=lambda _:pool.live()))
            base.adopt(_PackagePhysicalFile(reader))
        out.add(members,reader)
        out.metadata.append((selection,inventory,admitted))
    return out


def _historical_parent_sources(descriptor,root):
    """Finite nonexecuting archive generation, never a current-source override."""
    if descriptor is not None:
        require(type(descriptor)is ParentRefinement,'inert historical parent descriptor')
        path,digest,size=PARENT_TWO_ARCHIVE_PLAN
        if type(descriptor.parent_index)is int and descriptor.parent_index==2 and _source_binding(descriptor.plan)==dict(path=str(root/path),sha256=digest,bytes=size):
            return PARENT_TWO_ARCHIVE_SOURCES
    return PARENT_ARCHIVE_SOURCES


def _refinement_descriptors(values,root,owner_sha):
    """Inert immutable declarations, checked before opening any source."""
    require(type(values)is tuple and len(values)<=159,'ordered unique admitted refinements')
    previous=0;shared={};archive_paths={}
    for value in values:
        require(type(value)is ParentRefinement and type(value.parent_index)is int
            and previous<value.parent_index<160,'sorted unique explicit parents1..159; parent0 is implicit')
        previous=value.parent_index
        for role,_,_,_ in PARENT_ONE[:6]:_source_binding(getattr(value,role))
        legacy=_legacy_parent(value,root)
        # A partial relabel of the accepted old invocation is not a new one.
        if any(getattr(value,r).path==str(root/p)for r,p,_,_ in PARENT_ONE[:6]):
            require(legacy,'accepted parent1 generation differs')
        closure=value.closure
        require(type(closure)is ParentClosure,'explicit external parent closure')
        _source_binding(closure.owner);_source_binding(closure.operation)
        require(all(type(getattr(closure,k))is str for k in ('original_caller_session','final_completion_chunk','elapsed_seconds','authority')),
            'inert exact closure tokens')
        require(closure.owner.path==str(root/OWNER)and closure.owner.sha256==owner_sha
            and closure.operation==value.operation,'parent closure bound to current acceptance owner and operation')
        require(type(closure.exit_code)is int and closure.exit_code==0
            and re.fullmatch(r'[0-9]{1,32}',closure.original_caller_session)
            and re.fullmatch(r'[a-zA-Z0-9_-]{1,128}',closure.final_completion_chunk)
            and 0<number(closure.elapsed_seconds)<=1800 and closure.processes_closed is True
            and closure.independent_audit_accepted is True
            and closure.authority=='attributed-versioned-acceptance-owner-not-fresh-process-observation',
            'independently accepted external parent closure required')
        if legacy:require((closure.original_caller_session,closure.final_completion_chunk,closure.elapsed_seconds)==
            ('9158','1eda87','261.94229158400003'),'legacy external completion differs')
        require(type(value.archived_sources)is tuple and len(value.archived_sources)<=9,'bounded explicit historical archives')
        roles=set();original_paths=set()
        for relation in value.archived_sources:
            require(type(relation)is ArchivedSource and type(relation.role)is str,'inert historical relation')
            require(relation.role not in roles,'duplicate historical role');roles.add(relation.role)
            old,new=_source_binding(relation.original),_source_binding(relation.archive)
            if relation.role=='acceptanceOwner':
                require(old['path']==str(root/OWNER),'historical owner canonical path')
                require(old!=asdict(closure.owner),'current acceptance owner is not historical')
                if legacy:require(old['sha256']=='7b4fb29001fac6cd21b91f8e3e0b6f38a5fc93a53a52c4f7939a75304e548d7c'
                    and old['bytes']==318717,'exact historical owner original tuple')
            else:
                expected={r:dict(path=str(root/p),sha256=h,bytes=n)for r,p,h,n in _historical_parent_sources(value,root)+ANCESTRY_ARCHIVE_SOURCES}
                require(relation.role in expected and old==expected[relation.role],'exact nonexecuting historical source tuple')
            require(old['path']not in original_paths,'duplicate historical original path');original_paths.add(old['path'])
            require(new['path']!=old['path']and (new['sha256'],new['bytes'])==(old['sha256'],old['bytes']),
                'archive must preserve exact bytes at distinct physical path')
            forbidden={str(root/p)for _,p,_ in SOURCES}|{str(root/p)for _,p,_,_ in PARENT_ARCHIVE_SOURCES+ANCESTRY_ARCHIVE_SOURCES}|{str(root/SELF),str(root/CONTROLS),str(root/OWNER)}
            require(new['path']not in forbidden,'archive aliases a current canonical source')
            key=(old['path'],old['sha256'],old['bytes'])
            require(key not in shared or shared[key]==relation,'conflicting shared historical relation')
            require(new['path']not in archive_paths or archive_paths[new['path']]==key,'ambiguous physical archive')
            shared[key]=relation;archive_paths[new['path']]=key
    return values


def _legacy_parent(value,root):
    return value.parent_index==1 and all(_source_binding(getattr(value,r))==
        dict(path=str(root/p),sha256=h,bytes=n)for r,p,h,n in PARENT_ONE[:6])


class _HistoricalReader:
    """Resolve exact declared historical tuples; never alter _Pool identity.

    Logical maps retain the original binding. Physical provenance contains the
    archive and live owner separately. All physical handles receive the ordinary
    final recheck. This is not fallback discovery or a generic source override.
    """
    def __init__(self,pool,relations,expected_owner,expected_sources=None,*,descriptor=None):
        self.pool=pool;self.relations=relations;self.used=set();self.routes={}
        require(type(relations)is tuple and len(relations)<=7,'bounded historical mappings')
        expected={'acceptanceOwner':pool.w.normalized(expected_owner,pool.root)}
        allowed={r:dict(path=str(pool.root/p),sha256=h,bytes=n)for r,p,h,n in _historical_parent_sources(descriptor,pool.root)}
        for role,b in (expected_sources or {}).items():
            require(role in allowed,'historical source role')
            b=pool.w.normalized(b,pool.root)
            if b==allowed[role]:expected[role]=b
        roles=set();destinations=set()
        for relation in relations:
            require(type(relation)is ArchivedSource and type(relation.role)is str
                and relation.role in expected and relation.role not in roles,'unique authenticated historical role')
            old,new=_source_binding(relation.original),_source_binding(relation.archive)
            require(old==expected[relation.role],'historical source mapping differs')
            require(new['path']!=old['path']and(new['sha256'],new['bytes'])==(old['sha256'],old['bytes']),'archive content differs')
            forbidden={str(pool.root/p)for _,p,_ in SOURCES}|{v['path']for v in allowed.values()}|{str(pool.root/p)for p in (SELF,CONTROLS,OWNER)}
            require(new['path']not in forbidden and new['path']not in destinations and old['path']not in self.routes,'archive alias or duplicate')
            roles.add(relation.role);destinations.add(new['path']);self.routes[old['path']]=(old,new)
    def read_binding(self,b,*,capture=False):
        b=self.pool.w.normalized(b,self.pool.root)
        if b['path']in self.routes:
            old,archive=self.routes[b['path']]
            require(b==old,'historical source generation differs')
            raw=self.pool.read_binding(archive,capture=capture);self.used.add(b['path'])
            return raw if capture else dict(b)
        return self.pool.read_binding(b,capture=capture)
    def finish(self):
        require(len(self.used)==len(self.routes),'unused historical archive')
        return self.relations


def _parent_owner(raw,descriptor,bound=None):
    require(type(raw)is bytes and 0<len(raw)<=MAX_BYTES,'bounded parent owner')
    require(descriptor.closure.owner.bytes==len(raw),'parent owner size differs')
    root=Path(descriptor.closure.owner.path).parents[len(Path(OWNER).parts)-1]
    if not _legacy_parent(descriptor,root):
        text=raw.decode('utf-8',errors='strict');p=descriptor.parent_index;c=descriptor.closure
        heading=f'## Independently accepted actual original-parent-{p} emission refinement\n'
        all_lines=text.splitlines();require(all_lines.count(heading.rstrip('\n'))==1,'unique indexed parent acceptance section')
        after=all_lines[all_lines.index(heading.rstrip('\n'))+1:]
        stop=next((n for n,line in enumerate(after)if line.startswith('## ')),len(after));lines=after[:stop]
        identity=(f'Original parent index `{p}`; original caller session `{c.original_caller_session}`; '
            f'final completion chunk `{c.final_completion_chunk}`; exit zero; fresh elapsed seconds `{c.elapsed_seconds}`; '
            'owned processes closed; independent audit accepted.')
        require(lines.count(identity)==1 and sum(x.startswith('Original parent index ')for x in lines)==1,'exact parent acceptance identity')
        require(type(bound)is dict and set(bound)=={r for r,_,_,_ in PARENT_ONE},'all nine owner evidence bindings required')
        expected=[f'Binding `{role}`: SHA-256 `{b["sha256"]}`; bytes `{b["bytes"]}`.'for role,b in bound.items()]
        require(all(lines.count(line)==1 for line in expected)and sum(x.startswith('Binding ')for x in lines)==9,'exact unique parent evidence role lines')
        return
    text=raw.decode('utf-8',errors='strict');heading='## Independently accepted actual parent-one emission refinement\n'
    require(text.count(heading)==1,'unique parent1 acceptance section')
    section=text.split(heading,1)[1].split('\n## ',1)[0]
    for token in ('original caller session `9158`','final completion chunk `1eda87`','exit zero',
        '`261.94229158400003`','44,626','`76942e`','All 24 recorded PIDs, five process groups and the shared lock are absent'):
        require(token in section,'parent1 external closure attribution differs')
    for _,_,digest,size in PARENT_ONE:
        require(digest in section and (str(size)in section or format(size,',')in section),'parent1 accepted evidence differs')


def _authenticate_parent(w,core,pool,descriptor,owner,ancestry,full,fdocs,export,original,a,reference,histories):
    """Consume accepted metadata once, without rerunning any numerical oracle."""
    index=descriptor.parent_index;legacy=_legacy_parent(descriptor,pool.root)
    require(type(index)is int and 1<=index<160 and original.index==index,'selected original parent index')
    files={role:pool.capture(b.path,b.sha256,data=True,size=b.bytes)for role in
        ('plan','manifest','comparison','operation','launcher_log','resource_log')for b in (getattr(descriptor,role),)}
    bound={role:f.binding()for role,f in files.items()}
    raw_plan,m=(core.decode_document(files[k].data)for k in ('plan','manifest'))
    named=('declaration','producer','producerControls','proposalReference','proposalReferenceControls',
        'verifier','verifierControls','comparisonReference','comparisonReferenceControls')
    _keys(raw_plan,('schema','scope','parentIndex',*named,'dependencies','originalBindings','acceptanceOwner',
        'priorCoverClosure','runtimeBindings','operationalBindings','limits'))
    _keys(m,'schema scope status accepted launchPlan producer verifier declaration parent members originalBindings acceptanceOwner priorCoverClosure historicalSourceBindings subjectSourceBindings runtimeBindings operationalBindings algorithm restrictions census helperCalls queries rows pieces libraryFlags claims publicationRequires'.split())
    for role in ('queries','rows','pieces'):
        b=w.normalized(m[role],pool.root)
        require(b['path']==str(Path(bound['manifest']['path']).parent/(role+'.ndjson')),'selected sibling output path')
        files[role]=pool.capture(b['path'],b['sha256'],data=True,size=b['bytes']);bound[role]=files[role].binding()
    require(sum(bound[k]['bytes']for k in ('manifest','queries','rows','pieces'))<=MAX_BYTES,'aggregate parent output cap')
    if legacy:
        require(all(bound[r]==dict(path=str(pool.root/p),sha256=h,bytes=n)for r,p,h,n in PARENT_ONE),'legacy complete output generation')
    _parent_owner(owner.data,descriptor,bound)
    # The plan stores relative source paths; published records store absolute
    # logical paths. Build a view, leaving captured JSON and old attribution intact.
    p={**raw_plan,**{k:w.normalized(raw_plan[k],pool.root)for k in (*named,'acceptanceOwner')}}
    for key in ('dependencies','originalBindings'):
        p[key]={k:w.normalized(b,pool.root)for k,b in raw_plan[key].items()}
    for key in ('runtimeBindings','operationalBindings'):
        p[key]=[w.normalized(b,pool.root)for b in raw_plan[key]]
    # Authenticate fixed mathematical roles independently of either wrapper.
    for role,path,digest in PARENT_FIXED:
        require(p[role]['path']==str(pool.root/path)and p[role]['sha256']==digest,'parent frozen comparison/proposal role')
    for role,path,_,_ in PARENT_ARCHIVE_SOURCES[:4]:
        require(p[role]['path']==str(pool.root/path),'parent canonical wrapper role')
    aliases=dict(transport='transport',transportControls='transportControls',scientificDecoder='decoder',
        scientificDecoderControls='decoderControls',productionHelper='captureHelper',productionHelperControls='captureHelperControls',
        historyReference='geometryHistory',decimalReference='geometryIntervals',decimalControls='geometryIntervalControls',
        rootLibrary='geometryRoots',rootControls='geometryRootsControls',independentRootReference='rootComparison',independentRootControls='rootControls')
    expected_deps={role:next((path,digest)for r,path,digest in SOURCES if r==alias)for role,alias in aliases.items()}
    expected_deps['cacheEquivalence']=(PREFIX+'2026-08-27-f6c-call-local-state-cache-equivalence.md','798858e87058b5a1a2d478c89edad3154a2e4993f3c14cab089b4aabf3434ee3')
    require(set(p['dependencies'])==set(expected_deps),'closed parent dependency roles')
    for role,(path,digest)in expected_deps.items():
        require(p['dependencies'][role]['path']==str(pool.root/path)and p['dependencies'][role]['sha256']==digest,'parent frozen dependency')
    require(p['acceptanceOwner']['path']==str(pool.root/OWNER),'historical owner canonical role')
    historical_sources={role:p[role]for role,_,_,_ in PARENT_ARCHIVE_SOURCES[:4]}
    for role,path,_,_ in PARENT_ARCHIVE_SOURCES[4:]:
        matches=[b for b in p['operationalBindings']if b['path']==str(pool.root/path)]
        require(len(matches)==1,'parent operational source role');historical_sources[role]=matches[0]
    c=w.decode_operational(files['comparison'].data)
    op=w.decode_operational(files['operation'].data,document_class='operational-receipt')
    ancestry_roles={r for r,_,_,_ in ANCESTRY_ARCHIVE_SOURCES}
    reader=_HistoricalReader(pool,tuple(r for r in descriptor.archived_sources if r.role not in ancestry_roles),p['acceptanceOwner'],historical_sources,descriptor=descriptor)
    _owner_declaration(reader.read_binding(p['acceptanceOwner'],capture=True))
    scope=f'original-parent-{index}-emission-refinement'
    require(p['schema']=='braid-program/f6c-parent-emission-refinement-launch.v1'and p['scope']==scope
        and type(p['parentIndex'])is int and p['parentIndex']==index and w.equal(p['limits'],w.LIMITS),'parent plan scope/limits')
    require(w.equal(p['priorCoverClosure'],dict(authority='versioned-acceptance-owner-declaration-not-fresh-observation',
        originalCallerSession='13512',finalCompletionChunk='c21aa7',exitCode=0,elapsedSeconds='862.951823625',
        processesClosed=True,independentAuditAccepted=True)),'original full external closure differs')
    require(m['schema']=='braid-program/f6c-parent-emission-refinement-cover.v1'and m['scope']==scope
        and m['status']=='conditional_complete'and m['accepted']is False,'parent manifest disposition')
    require(c['schema']=='braid-program/f6c-parent-emission-refinement-conformance.v1'and c['scope']==scope
        and c['accepted']is True and c['analysis']['conditional_final_cover_conformant']is True
        and c['analysis']['conditional_query_replay_conformant']is True,'independent parent comparison required')
    require(op['schema']=='braid-program/f6c-parent-emission-refinement-operation.v1'
        and op['scope']==f'operational-original-parent{index}-refinement-completion-only'and op['accepted']is True
        and type(op['parentIndex'])is int and op['parentIndex']==index,'parent operation disposition')
    closure=number(descriptor.closure.elapsed_seconds)
    require(0<=F(op['elapsedSecondsBeforePublication'])<closure<=1800,'prepublication is not external closure')
    for obj in (m['claims'],c['candidateClaims'],op['claims']):
        require(type(obj)is dict and set(obj)==set('accepted referenceGenerationAuthenticated originalSourceAuthenticated original1760PieceCensusAuthenticated premiseTruthAuthenticated subjectMembershipEstablished historicalTrajectoryIdentityEstablished executionAuthorized eomExecuted h3EvidenceEligible metricsAvailable scoreAuthorized equilibriumEstablished retentionEstablished physicalRealizationEstablished'.split())
            and all(v is False for v in obj.values()),'parent scientific authority promoted')
    require(w.equal(m['algorithm'],dict(lowerQueriesPerPair=32,upperQueriesPerPair=32,upperSearchRestartsFromOriginal=True,
        receptionSubdivision=False,automaticRetry=False))and w.equal(m['libraryFlags'],dict.fromkeys(reference.ROOT_FLAGS,False)),
        'unchanged parent algorithm and library flags')
    require(m['publicationRequires']=='fresh successful completion, independent parent refinement comparison, external inclusive deadline and closed owned processes',
        'parent publication boundary differs')
    for key in ('accelerationEvaluated','eomExecuted','wholeHistoryMetrics'):require(op[key]is False,'parent numerical authority promoted')
    expected_original={k:ancestry[k]for k in ('export','reconstruction','guards')}
    expected_original['fullEntry']=pool.files[str(pool.root/'scripts/eom/run-f6c-cached-root-cover-full.mjs')].binding()
    expected_original.update(('full'+k[0].upper()+k[1:],v)for k,v in full.items())
    require(w.equal(w.source_map(p['originalBindings'].values(),pool.root),w.source_map(expected_original.values(),pool.root))
        and set(p['originalBindings'])==set(expected_original),'parent exact original sources')
    for key,b in expected_original.items():require(w.equal(p['originalBindings'][key],b),'original role mapping differs')
    subjects=[*(p[k]for k in named),*p['dependencies'].values()]
    for group,n in ((subjects,23),(p['runtimeBindings'],len(p['runtimeBindings'])),(p['operationalBindings'],len(p['operationalBindings']))):
        require(0<n<=512,'bounded parent source group')
        w.binding_list(group,n);require(len(w.source_map(group,pool.root))==n,'parent source group uniqueness')
    unique=subjects+p['runtimeBindings']+p['operationalBindings']
    require(len(w.source_map(unique,pool.root))==len(unique),'new source groups must not overlap')
    current=[*subjects,*p['runtimeBindings'],*p['operationalBindings'],*p['originalBindings'].values(),p['acceptanceOwner'],bound['plan']]
    current_map=w.source_map(current,pool.root)
    if legacy:require(len(current_map)==204 and len(p['runtimeBindings'])==159 and len(p['operationalBindings'])==8,'legacy declared204 source closure')
    # _full_chain has already independently derived and captured this exact198.
    # Reuse it; do not derive the ancestry from an unverified parent receipt.
    historical=fdocs['admission']['sourceBindings'];historical_map=w.source_map(historical,pool.root)
    historical_logs=[stage['process'][key]for stage in fdocs['admission']['stages']for key in ('stdoutLog','stderrLog')]
    combined=w.source_map([*historical,*historical_logs,*current],pool.root)
    if legacy:require(len(combined)==230,'legacy combined230 source closure')
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
    require(w.equal(w.source_map(c['sourceBindings'],pool.root),comparison_sources),'parent comparison source closure')
    if legacy:require(len(comparison_sources)==234,'legacy comparison234 source closure')
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
    require(0<len(lines)<=100000 and len(raw)<=16*1024**2 and all(0<len(line)<=131072 for line in lines),'bounded parent resource stream')
    if legacy:require(len(lines)==1055,'legacy parent resource stream census')
    rss=[w.decode_operational(line)for line in lines]
    for j,row in enumerate(rss):
        require(row['kind']=='aggregate-rss'and 0<=F(row['elapsedSeconds'])<closure
            and(j==0 or F(rss[j-1]['elapsedSeconds'])<=F(row['elapsedSeconds'])),'parent resource time ordering')
        require(type(row['aggregateResidentBytes'])is int and 0<=row['aggregateResidentBytes']<=2*1024**3
            and 0<=F(row['sampleGapMs'])<=1000,'parent resource limits')
    selected=_selected_parent_metadata(w,core,files,bound,m,c,index,ancestry,full,export,original,a,reference,histories)
    reader.finish()
    return selected,descriptor.archived_sources


def _selected_parent_metadata(w,core,files,bound,m,c,index,ancestry,full,export,original,a,reference,histories):
    """Common original-token/row construction after external acceptance.

    Both historical and fresh operation transports enter here only after their
    distinct complete source and process acceptance obligations have passed.
    This block neither evaluates a provider nor grants operation acceptance.
    """
    # Independent original-token identity reconstruction, not numerical work.
    hkeys=('id','pathKey','polarity','charge','historyFingerprint','coverageStart','coverageEnd')
    skeys=('startTime','endTime','coefficients','positionErrors','velocityErrors','positionError','velocityError')
    raw_histories=[dict(**{k:h[k]for k in hkeys},segments=[{k:s[k]for k in skeys}for s in h['segments']])for h in export['retainedHistories']]
    generation=_hash(json.dumps(raw_histories,sort_keys=True,separators=(',',':'),ensure_ascii=True,allow_nan=False).encode('ascii'))
    rb=lambda b:dict(lower=b.lower,upper=b.upper,precision=90)
    frame=index//2
    require(len(export['acceptedFrames'])==81 and all(len(h['segments'])==1760 for h in export['retainedHistories']),'original full parent/frame incidence')
    for h in export['retainedHistories']:
        segment=h['segments'][1600+index]
        require((segment['startTime'],segment['endTime'])==(original.reception.lower,original.reception.upper),'parent original segment lexemes')
    require(number(export['acceptedFrames'][frame]['time'])<=number(original.reception.lower)<number(original.reception.upper)
        <=number(export['acceptedFrames'][frame+1]['time']),'original parent inside original frame')
    parent=dict(schema='braid-program/f6c-original-parent-refinement-input.v1',parentIndex=index,frameIndex=frame,
        frame=dict(lower=export['acceptedFrames'][frame]['time'],upper=export['acceptedFrames'][frame+1]['time'],precision=90),
        reception=rb(original.reception),oldestTime='-8',historyGenerationSha256=generation,originalCoverBinding=full['manifest'],
        originalEmissions=[dict(receiverIndex=i,transmitterIndex=j,receiverId=LABELS[i],transmitterId=LABELS[j],emission=rb(original.rows[8*i+j].emission))
            for i in range(8)for j in range(8)if i!=j])
    require(w.equal(m['parent'],parent)and w.equal(c['parent'],parent)and w.equal(c['analysis']['parent'],parent),'parent original history/interval identity differs')
    require(w.equal(m['members'],[{k:h[k]for k in hkeys[:5]}for h in raw_histories]),'parent original members differ')
    w.records(core,files['queries'].data,3584)  # recorded census, never query replay
    bindings=tuple(a.Binding(**v)for v in w.mathematical_bindings(ancestry,bound))
    selected=_parents_from_raw(a,reference,w.records(core,files['rows'].data,64),w.records(core,files['pieces'].data,112),
        histories,bindings,cells=1,refined=True,original_indices=(index,))[0]
    require(selected.reception==original.reception,'parent refinement original reception differs')
    for old,new in zip(original.rows,selected.rows):
        if new.emission is not None:
            require(number(old.emission.lower)<number(new.emission.lower)<=number(new.emission.upper)<number(old.emission.upper),
                'accepted parent emission must narrow both sides')
    return selected


def _thaw_fresh_metadata(value,live):
    """Copy the independent immutable result into exact inert wire types.

    The historical comparison helpers intentionally require plain dictionaries
    and lists. Do not loosen those helpers or accept arbitrary mapping objects.
    """
    nodes=0;string_bytes=0
    def visit(v,depth=0):
        nonlocal nodes,string_bytes
        nodes+=1
        require(nodes<=1000000 and depth<=64,'bounded fresh metadata result')
        if nodes%256==1:live()
        if type(v)in(dict,MappingProxyType):
            require(len(v)<=20000 and all(type(k)is str for k in v),'exact fresh metadata keys')
            return {visit(k,depth+1):visit(x,depth+1)for k,x in v.items()}
        if type(v)in(tuple,list):
            require(len(v)<=20000,'bounded fresh metadata sequence')
            return [visit(x,depth+1)for x in v]
        if type(v)is str:
            n=len(v.encode('utf-8'));string_bytes+=n
            require(n<=8*1024**2 and string_bytes<=MAX_BYTES,'bounded fresh metadata strings')
            return v
        require(v is None or type(v)is bool or type(v)is int and -(2**63)<=v<2**63,
            'inert fresh metadata scalar')
        return v
    result=visit(value);live();return result


def _authenticate_fresh_parents(w,core,pool,owner,ancestry,full,fdocs,export,parents,a,reference,histories,integral):
    """Normalize separately checked fresh closure into common parent metadata."""
    base=_physical_pool(pool)
    source={role:pool.capture(path,h,data=role=='instrument')for role,path,h in FRESH_CLOSURE_SOURCES}
    require(set(source)=={'instrument','controls','contract'},'complete independently reviewed fresh authority')
    validator=base.stack.enter_context(_module(source['instrument'].data,source['instrument'].path))
    p,h,n=FRESH_NUMERICAL_SETTINGS
    settings_binding=pool.capture(p,h,size=n).binding()
    numerical_settings=dict(declaration=settings_binding,settingIndex=0,step='0.002',historySegmentStep='0.005',rootTolerance='0.000005')
    family=dict(retainedHistory=ancestry['export'],reconstruction=ancestry['reconstruction'],fullCoverPlan=full['plan'],
        fullCoverManifest=full['manifest'],fullCoverComparison=full['comparison'],fullCoverOperation=full['admission'])
    context=dict(family=integral.FAMILY,source_generation_sha256=ancestry['export']['sha256'],
        frame_generation_sha256=_hash(_encoded(export['acceptedFrames'])),field_speed='1',coupling=COUPLING,ruler=RULER)
    original={k:ancestry[k]for k in ('export','reconstruction','guards')}
    original['fullEntry']=pool.files[str(pool.root/'scripts/eom/run-f6c-cached-root-cover-full.mjs')].binding()
    original.update(('full'+k[0].upper()+k[1:],v)for k,v in full.items())
    expected_full=tuple(fdocs['admission']['sourceBindings'])
    selected=[];archives=[]
    for selection,inventory,admitted in pool.metadata:
        require(w.equal(inventory['family'],family)and w.equal(inventory['context'],context)
            and w.equal(inventory['numericalSettings'],numerical_settings),'fresh original family/context/settings differ')
        require(w.equal(inventory['currentAcceptanceOwner']['binding'],owner.binding()),'fresh current owner binding differs')
        indexed={p['parentIndex']:p for p in inventory['parents']};objects={x['memberName']:x for x in inventory['objects']}
        for item in admitted:
            pool.live()
            require(w.equal(item['expectedInstrument'],source['instrument'].binding()),'captured fresh instrument differs')
            verified=validator.verify_closure(item['raw'],item['binding'],expected_instrument=source['instrument'].binding(),
                expected_controls=source['controls'].binding(),read_binding=pool.read_binding,read_identity=pool.read_identity,
                expected_family=family,expected_context=context,expected_owner=owner.binding(),expected_originals=original,
                expected_full_source_bindings=expected_full,live=pool.live)
            _keys(verified,('parents','sourceBindings'))
            require(type(verified['parents'])is tuple and 0<len(verified['parents'])<=159
                and type(verified['sourceBindings'])is tuple and len(verified['sourceBindings'])<=512,'bounded verified fresh result')
            verified=_thaw_fresh_metadata(verified,pool.live)
            for binding in verified['sourceBindings']:pool.read_binding(binding)
            for accepted in verified['parents']:
                index=accepted['parentIndex'];require(type(index)is int and index in indexed,'verified fresh parent selection differs')
                declared=indexed[index]
                require(w.equal(declared['independentAcceptance'],item['binding']),'fresh selected closure differs')
                for field in ('parentIndex','frameIndex','reception','historyGenerationSha256'):
                    require(w.equal(accepted[field],declared[field]),'verified original fresh metadata differs')
                bound={role:objects[name]['original']for role,name in declared['roles'].items()}
                require(w.equal(accepted['roles'],bound)
                    and w.equal(accepted['acceptanceOwner'],objects[declared['acceptanceOwner']]['original']),
                    'verified fresh role/owner tuple differs')
                data_roles=('manifest','comparison','queries','rows','pieces')
                require(sum(b['bytes']for role,b in bound.items()if role in data_roles)<=MAX_BYTES,'bounded fresh parent transcripts')
                files={role:pool.capture(b['path'],b['sha256'],data=True,size=b['bytes'])for role,b in bound.items()if role in data_roles}
                m=core.decode_document(files['manifest'].data);c=w.decode_operational(files['comparison'].data)
                selected.append(_selected_parent_metadata(w,core,files,bound,m,c,index,ancestry,full,export,parents[index],a,reference,histories))
                pool.release(bound.values())
            pool.live()
        for obj in inventory['objects']:
            if obj['role']=='acceptanceOwner':
                relation=ArchivedSource('acceptanceOwner',SourceBinding(**obj['original']),
                    SourceBinding(obj['physicalPath'],obj['original']['sha256'],obj['original']['bytes']))
                if relation not in archives:archives.append(relation)
        require(sorted(p.index for p in selected if p.index in indexed)==sorted(indexed),'complete fresh inventory selected')
    require(len(selected)==len({p.index for p in selected}),'duplicate independently selected fresh parent')
    return tuple(selected),tuple(archives)


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
def open_adapter(repo_root,*,adapter_sha256,controls_sha256,closure_owner_sha256,deadline,parent_refinements=(),evidence_package=None,accepted_parent_evidence=()):
    """Capture-only constructor. Caller fixes all three expected hashes first.

    deadline is the caller's finite monotonic absolute deadline, at most1800s
    away. This library checks it at bounded read/calculation boundaries; a
    separately admitted executor remains responsible for process supervision.
    """
    root=Path(repo_root)
    require(root.is_absolute()and root==root.resolve()and root==Path(__file__).resolve().parents[2],'executing canonical repository')
    for h in (adapter_sha256,controls_sha256,closure_owner_sha256):require(type(h)is str and _SHA.fullmatch(h),'explicit pre-fixed expected hash')
    parent_refinements=_refinement_descriptors(parent_refinements,root,closure_owner_sha256)
    accepted_parent_evidence=_fresh_selections(accepted_parent_evidence,root)
    began=time.monotonic();require(type(deadline)in(int,float)and began<deadline<=began+1800,'finite bounded absolute deadline')
    def live():require(time.monotonic()<deadline,'adapter inclusive deadline')
    adapter=None
    transport_path,transport_sha=next((p,h)for r,p,h in SOURCES if r=='transport')
    with _bootstrap(root/transport_path,transport_sha,live)as raw:
        with _module(raw,root/transport_path)as w,ExitStack()as stack:
            pool=_Pool(stack,w,root,live);physical_pool=pool;fresh_consumed={}
            own=pool.capture(SELF,adapter_sha256,data=True)
            require(compile(own.data,_EXECUTING_CODE.co_filename,'exec',dont_inherit=True)==_EXECUTING_CODE,'executing adapter bytes differ')
            pool.capture(CONTROLS,controls_sha256)
            if evidence_package is not None:pool=_packaged_pool(pool,evidence_package,parent_refinements,deadline)
            ancestry_roles={r for r,_,_,_ in ANCESTRY_ARCHIVE_SOURCES}
            ancestry_routes=tuple(dict.fromkeys(r for d in parent_refinements for r in d.archived_sources if r.role in ancestry_roles))
            if ancestry_routes:pool=_AncestryPool(pool,ancestry_routes)
            if accepted_parent_evidence:
                with physical_pool.observe(fresh_consumed):
                    pool=_fresh_evidence_pool(pool,accepted_parent_evidence,deadline,{0,*(d.parent_index for d in parent_refinements)})
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
                index=descriptor.parent_index
                parent,relations=_authenticate_parent(w,core,pool,descriptor,owner,ancestry,full,fdocs,old['export'],parents[index],a,reference,histories)
                selected=selected[:index]+(parent,)+selected[index+1:]
                archived+=tuple(r for r in relations if r not in archived)
                refined_indices=refined_indices|frozenset({index})
            if accepted_parent_evidence:
                with physical_pool.observe(fresh_consumed):
                    fresh,relations=_authenticate_fresh_parents(w,core,pool,owner,ancestry,full,fdocs,old['export'],parents,a,reference,histories,modules['integral'])
                for parent in fresh:
                    selected=selected[:parent.index]+(parent,)+selected[parent.index+1:]
                    refined_indices=refined_indices|frozenset({parent.index})
                archived+=tuple(r for r in relations if r not in archived)
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
            fresh_provenance=tuple(sorted(record for record,_ in fresh_consumed.values()))
            require(set(fresh_provenance)<=set(provenance),'fresh physical sources belong to complete source union')
            object.__setattr__(adapter,'fresh_provenance',fresh_provenance)
            pool.recheck();live()
            try:yield adapter
            finally:
                object.__setattr__(adapter,'_closed',True)
                pool.recheck()
        live()
    live()
