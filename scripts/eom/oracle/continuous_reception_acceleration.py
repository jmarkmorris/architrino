"""Conditional one-cell sharp acceleration and exact-frame residual ranges.

No IO, root search, root-library import, scalar certificate, quadrature, peak,
metric, publication or authentication is provided. Call evaluate_cell with the
exact frozen dataclasses below. Nested containers must be exact tuples and
leaves exact bounded strings/integers/booleans; no caller-owned mutable aliases
are admitted. The 8 labels and 64 receiver-major rows are always complete.

RootRow is an explicit projection of ConditionalRootRow: retain every scalar
face/geometry/factor/completeness field; replace the two nonself piece arrays
with their original compact coverage SHA-256 tokens. Self coverage fields stay
None: the compact source publishes no self piece records. Member.history_digest is the captured
root history digest, not an original file hash. A separate actual-data consumer
must authenticate the complete original-to-projection mapping, both coverage
lists, original error radii, common C1 family, guards, root existence/uniqueness,
and source bytes. This module only checks consistency of the supplied premises.

f6c-reconstruction-family fixes literal coupling, charges, L0 and c_f. The
synthetic-control scope permits explicit positive coupling/ruler and nonzero
signed charges consistent with the same 8 labels; it is never actual evidence.
Bindings have exactly REQUIRED_BINDINGS roles in order. Their path/hash/size
are copied premises, never read or verified. No acceptance booleans are inputs.

All interval algebra and Hermite coefficients are exact rational operations.
Results are rounded outward only at serialization to 90 significant decimal
digits, using an explicit Decimal context, independent of ambient precision.
No rounded cubic replaces the exact Hermite curve. All 64 pair boxes, 8 sums,
8 H'' boxes, 8 residual vectors and 8 squared-norm intervals are returned.
No width promise is made. Each cell is closed and lies in one closed frame;
adjacent calls may retain both one-sided curvature limits, never their average.

CellRangeResult.to_record() is the complete JSON-compatible record contract:
schema/status/scope/precision/cell_index/frame_index/reception/frame_domain/retained_domain/field_speed/
coupling/ruler/bindings/members/rows/pair_ranges/member_ranges/claims. Data are
freshly copied for serialization. Every authority flag in Claims remains false,
including accepted; status conditional_ranges describes only the implication.
Invalid input raises RangeUnresolved(code, detail), returning no partial result.
"""

from __future__ import annotations

from dataclasses import asdict, dataclass
from decimal import Context, Decimal, ROUND_CEILING, ROUND_FLOOR
from fractions import Fraction
import re


PRECISION = 90
SCHEMA = 'braid-program/continuous-reception-acceleration-range.v1'
LABELS = ('0+', '0-', '1+', '1-', '2+', '2-', '3+', '3-')
F6C_COUPLING = '10.304229970992187'
F6C_CHARGE = '0.1666666666666666666666666666666667'
F6C_RULER = '0.5320012303229503'
FACTOR_FLOOR = Fraction(1, 10**24)
MAX_TOKEN_CHARS = 1152
MAX_TOKEN_DIGITS = 1024
MAX_TOKEN_EXPONENT = 1000
REQUIRED_BINDINGS = ('original_export', 'reconstruction_receipt', 'guards_receipt',
                     'root_cover', 'root_cover_comparison',
                     'member_acceleration_predeclaration',
                     'continuous_reception_enclosure_contract')
_DECIMAL = re.compile(r'[+-]?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)(?:[eE][+-]?[0-9]+)?\Z')
_HASH = re.compile(r'[0-9a-f]{64}\Z')


class RangeUnresolved(ValueError):
    def __init__(self, code, detail):
        super().__init__(detail)
        self.code = code


def _require(condition, code, detail):
    if not condition:
        raise RangeUnresolved(code, detail)


def _tuple(value, count):
    _require(type(value) is tuple and len(value) == count, 'census', 'exact bounded tuple required')


def _text(value, maximum=256):
    _require(type(value) is str and 0 < len(value) <= maximum
             and all(32 <= ord(c) < 127 for c in value), 'identity', 'bounded ASCII identity required')


def _hash(value):
    _require(type(value) is str and _HASH.fullmatch(value) is not None,
             'binding', 'lowercase SHA-256 token required')


def _number(value):
    _require(type(value) is str and 0 < len(value) <= MAX_TOKEN_CHARS
             and _DECIMAL.fullmatch(value) is not None, 'token', 'bounded exact decimal string required')
    try:
        parsed = Decimal(value)
    except ArithmeticError as error:
        raise RangeUnresolved('token', 'unrepresentable decimal token') from error
    digits = parsed.as_tuple()
    _require(parsed.is_finite() and len(digits.digits) <= MAX_TOKEN_DIGITS
             and abs(digits.exponent) <= MAX_TOKEN_EXPONENT,
             'token', 'finite bounded decimal required')
    return Fraction(parsed)


@dataclass(frozen=True, slots=True)
class Bounds:
    lower: str
    upper: str


@dataclass(frozen=True, slots=True)
class Binding:
    role: str
    path: str
    sha256: str
    bytes: int


@dataclass(frozen=True, slots=True)
class Member:
    label: str
    path_id: str
    charge: str
    history_digest: str
    position_left: tuple[str, str, str]
    velocity_left: tuple[str, str, str]
    position_right: tuple[str, str, str]
    velocity_right: tuple[str, str, str]


@dataclass(frozen=True, slots=True)
class RootRow:
    receiver_id: str
    transmitter_id: str
    reception: Bounds
    emission: Bounds | None
    ordinary_roots_per_reception: int
    coincident_endpoint_excluded: bool
    oldest_residual: Bounds | None
    lower_face_residual: Bounds | None
    upper_face_residual: Bounds | None
    displacement: tuple[Bounds, Bounds, Bounds] | None
    distance: Bounds | None
    transmitter_factor: Bounds | None
    receiver_factor: Bounds | None
    receiver_coverage_sha256: str | None
    transmitter_coverage_sha256: str | None
    root_free_complement_conditional: bool
    retained_boundary_contact: bool


@dataclass(frozen=True, slots=True)
class CellRangeInput:
    scope: str
    precision: int
    cell_index: int
    frame_index: int
    reception: Bounds
    frame_domain: Bounds
    retained_domain: Bounds
    field_speed: str
    coupling: str
    ruler: str
    cover_status: str
    bindings: tuple[Binding, ...]
    members: tuple[Member, ...]
    rows: tuple[RootRow, ...]


@dataclass(frozen=True, slots=True)
class Claims:
    accepted: bool = False
    premise_truth_authenticated: bool = False
    source_bytes_authenticated: bool = False
    root_coverage_established: bool = False
    subject_membership_established: bool = False
    historical_trajectory_identity_established: bool = False
    execution_authorized: bool = False
    metrics_available: bool = False
    score_authorized: bool = False
    h3_evidence_eligible: bool = False


@dataclass(frozen=True, slots=True)
class PairRange:
    receiver_id: str
    transmitter_id: str
    disposition: str
    acceleration: tuple[Bounds, Bounds, Bounds]


@dataclass(frozen=True, slots=True)
class MemberRange:
    label: str
    acceleration: tuple[Bounds, Bounds, Bounds]
    required_acceleration: tuple[Bounds, Bounds, Bounds]
    residual: tuple[Bounds, Bounds, Bounds]
    squared_norm: Bounds


@dataclass(frozen=True, slots=True)
class CellRangeResult:
    schema: str
    status: str
    scope: str
    precision: int
    cell_index: int
    frame_index: int
    reception: Bounds
    frame_domain: Bounds
    retained_domain: Bounds
    field_speed: str
    coupling: str
    ruler: str
    bindings: tuple[Binding, ...]
    members: tuple[Member, ...]
    rows: tuple[RootRow, ...]
    pair_ranges: tuple[PairRange, ...]
    member_ranges: tuple[MemberRange, ...]
    claims: Claims

    def to_record(self):
        return asdict(self)


def _bounds(value):
    _require(type(value) is Bounds, 'immutability', 'exact Bounds record required')
    lo, hi = _number(value.lower), _number(value.upper)
    _require(lo <= hi, 'interval', 'reversed interval')
    return lo, hi


def _vector(value):
    _tuple(value, 3)
    return tuple(_bounds(x) for x in value)


def _coordinates(value):
    _tuple(value, 3)
    return tuple(_number(x) for x in value)


def _add(a, b):
    return a[0] + b[0], a[1] + b[1]


def _subtract(a, b):
    return a[0] - b[1], a[1] - b[0]


def _multiply(a, b):
    corners = (a[0]*b[0], a[0]*b[1], a[1]*b[0], a[1]*b[1])
    return min(corners), max(corners)


def _square(a):
    return (0 if a[0] <= 0 <= a[1] else min(a[0]**2, a[1]**2),
            max(a[0]**2, a[1]**2))


def _serialize(a):
    # Decimal(int) is exact; Context.divide controls the sole rounding step.
    def endpoint(value, rounding):
        value = Fraction(value)
        context = Context(prec=PRECISION, rounding=rounding, Emin=-999999, Emax=999999)
        result = context.divide(Decimal(value.numerator), Decimal(value.denominator))
        _require(result.is_finite(), 'arithmetic', 'nonfinite serialized result')
        return str(result)
    return Bounds(endpoint(a[0], ROUND_FLOOR), endpoint(a[1], ROUND_CEILING))


def _serialize_vector(v):
    return tuple(_serialize(x) for x in v)


def _sharp(displacement, distance, factor, coupling, qi, qj):
    _require(distance[0] > 0, 'distance', 'sharp distance must be strictly positive')
    _require(factor[0] >= FACTOR_FLOOR, 'factor', 'positive transmitter factor below fixed floor')
    denominator = (distance[0]**3 * factor[0], distance[1]**3 * factor[1])
    signed_scale = coupling * qi * qj
    scale = _multiply((signed_scale, signed_scale), (1/denominator[1], 1/denominator[0]))
    return tuple(_multiply(scale, component) for component in displacement)


def sharp_range(*, displacement, distance, transmitter_factor, coupling,
                receiver_charge, transmitter_charge, field_speed):
    """Synthetic/control-level conditional kernel; no root or source authority."""
    _require(type(field_speed) is str and field_speed == '1', 'field_speed', 'c_f must be exactly token 1')
    k, qi, qj = _number(coupling), _number(receiver_charge), _number(transmitter_charge)
    _require(k > 0 and qi != 0 and qj != 0, 'polarity', 'positive coupling/nonzero signed charges required')
    return _serialize_vector(_sharp(_vector(displacement), _bounds(distance),
                                   _bounds(transmitter_factor), k, qi, qj))


def _hermite(frame, reception, p0, v0, p1, v1):
    h = frame[1] - frame[0]
    _require(h > 0 and frame[0] <= reception[0] <= reception[1] <= frame[1],
             'frame', 'closed reception must lie within one positive-width exact frame')
    elapsed = (reception[0] - frame[0], reception[1] - frame[0])
    result = []
    for x0, w0, x1, w1 in zip(p0, v0, p1, v1):
        c2 = 3*(x1-x0)/h**2 - (2*w0+w1)/h
        c3 = 2*(x0-x1)/h**3 + (w0+w1)/h**2
        result.append(_add((2*c2, 2*c2), _multiply((6*c3, 6*c3), elapsed)))
    return tuple(result)


def hermite_second_derivative(*, frame, reception, position_left, velocity_left,
                              position_right, velocity_right):
    """Exact-rational Hermite derivative, outward output; points are allowed."""
    return _serialize_vector(_hermite(_bounds(frame), _bounds(reception),
        _coordinates(position_left), _coordinates(velocity_left),
        _coordinates(position_right), _coordinates(velocity_right)))


def _validate(request):
    _require(type(request) is CellRangeInput, 'immutability', 'exact CellRangeInput required')
    _require(type(request.scope) is str and request.scope in ('f6c-reconstruction-family', 'synthetic-control'),
             'scope', 'explicit conditional subject scope required')
    _require(type(request.precision) is int and request.precision == PRECISION,
             'precision', 'mapped cover must have exact 90-digit precision')
    for index in (request.cell_index, request.frame_index):
        _require(type(index) is int and 0 <= index < 16384, 'identity', 'bounded exact cell/frame index required')
    reception, frame, retained = map(_bounds, (request.reception, request.frame_domain, request.retained_domain))
    _require(retained[0] <= frame[0] <= reception[0] < reception[1] <= frame[1] <= retained[1]
             and frame[0] < frame[1], 'frame', 'cell/frame/retained domain containment failed')
    _require(type(request.field_speed) is str and request.field_speed == '1', 'field_speed', 'c_f must be exactly token 1')
    _require(type(request.cover_status) is str and request.cover_status == 'conditional_complete',
             'coverage', 'one complete conditional cover required')
    k, ruler = _number(request.coupling), _number(request.ruler)
    _require(k > 0 and ruler > 0, 'normalization', 'positive explicit coupling and ruler required')
    f6c = request.scope == 'f6c-reconstruction-family'
    if f6c:
        _require(request.coupling == F6C_COUPLING and request.ruler == F6C_RULER,
                 'normalization', 'unchanged F6c coupling/ruler literals required')
        _require(retained == (Fraction(-8), Fraction(13, 100)) and frame[0] >= 0,
                 'frame', 'F6c full retained and future frame domains required')
    _tuple(request.bindings, len(REQUIRED_BINDINGS))
    for binding, role in zip(request.bindings, REQUIRED_BINDINGS):
        _require(type(binding) is Binding, 'immutability', 'exact immutable binding required')
        _text(binding.role)
        _require(binding.role == role, 'binding', 'complete fixed binding order required')
        _text(binding.path, 2048)
        _hash(binding.sha256)
        _require(type(binding.bytes) is int and 0 < binding.bytes <= 2**40, 'binding', 'bounded exact byte count required')
    _tuple(request.members, 8)
    charges = []
    for i, (member, label) in enumerate(zip(request.members, LABELS)):
        _require(type(member) is Member, 'immutability', 'exact immutable member required')
        _text(member.label)
        _text(member.path_id)
        _require(member.label == label and member.path_id == str(i+1), 'identity', 'exact member/path order required')
        _hash(member.history_digest)
        charge = _number(member.charge)
        _require(charge > 0 if label.endswith('+') else charge < 0, 'polarity', 'label and signed charge disagree')
        if f6c:
            _require(member.charge == ('' if label.endswith('+') else '-') + F6C_CHARGE,
                     'polarity', 'original F6c signed charge literal required')
        charges.append(charge)
        for coordinates in (member.position_left, member.velocity_left, member.position_right, member.velocity_right):
            _coordinates(coordinates)
    _tuple(request.rows, 64)
    for n, row in enumerate(request.rows):
        _require(type(row) is RootRow, 'immutability', 'exact immutable root row required')
        _text(row.receiver_id)
        _text(row.transmitter_id)
        i, j = divmod(n, 8)
        _require((row.receiver_id, row.transmitter_id) == (LABELS[i], LABELS[j]), 'census', 'complete receiver-major pair order required')
        _bounds(row.reception)
        _require(row.reception == request.reception, 'identity', 'exact reception tokens must match')
        for flag in (row.coincident_endpoint_excluded, row.root_free_complement_conditional, row.retained_boundary_contact):
            _require(type(flag) is bool, 'flags', 'exact bool flag required')
        _require(row.root_free_complement_conditional and not row.retained_boundary_contact,
                 'coverage', 'root-free complement and no retained-boundary contact required')
        _require(type(row.ordinary_roots_per_reception) is int,
                 'census', 'exact root count required')
        fields = (row.emission, row.oldest_residual, row.lower_face_residual, row.upper_face_residual,
                  row.displacement, row.distance, row.transmitter_factor, row.receiver_factor)
        if i == j:
            _require(row.ordinary_roots_per_reception == 0 and row.coincident_endpoint_excluded
                     and all(x is None for x in fields), 'self', 'self must be explicit excluded endpoint/empty roots')
            _require(row.receiver_coverage_sha256 is None and row.transmitter_coverage_sha256 is None,
                     'self', 'compact self row has no original piece audit records')
            continue
        _hash(row.receiver_coverage_sha256)
        _hash(row.transmitter_coverage_sha256)
        _require(row.ordinary_roots_per_reception == 1 and not row.coincident_endpoint_excluded,
                 'census', 'nonself must contain exactly one ordinary root')
        emission = _bounds(row.emission)
        _require(retained[0] <= emission[0] < emission[1] < reception[0],
                 'coverage', 'emission must be retained and strictly before all receptions')
        _require(_bounds(row.oldest_residual)[1] < 0 and _bounds(row.lower_face_residual)[1] < 0
                 and _bounds(row.upper_face_residual)[0] > 0, 'faces', 'strict unrestricted face signs required')
        _vector(row.displacement)
        _require(_bounds(row.distance)[0] > 0, 'distance', 'strictly positive root distance required')
        _require(_bounds(row.transmitter_factor)[0] >= FACTOR_FLOOR,
                 'factor', 'positive transmitter factor below fixed floor')
        _require(_bounds(row.receiver_factor)[0] > 0, 'factor', 'positive receiver factor premise required')
    return reception, frame, k, ruler, tuple(charges)


def evaluate_cell(request):
    """Return ranges conditional on externally authenticated mapped premises."""
    reception, frame, k, ruler, charges = _validate(request)
    zero = (Fraction(0), Fraction(0))
    totals = [tuple(zero for _ in range(3)) for _ in range(8)]
    pairs = []
    for n, row in enumerate(request.rows):
        i, j = divmod(n, 8)
        acceleration = (zero, zero, zero) if i == j else _sharp(
            _vector(row.displacement), _bounds(row.distance), _bounds(row.transmitter_factor),
            k, charges[i], charges[j])
        totals[i] = tuple(_add(a, b) for a, b in zip(totals[i], acceleration))
        pairs.append(PairRange(row.receiver_id, row.transmitter_id,
                              'self_empty_zero' if i == j else 'ordinary_conditional_range',
                              _serialize_vector(acceleration)))
    members = []
    for i, member in enumerate(request.members):
        required = _hermite(frame, reception, _coordinates(member.position_left),
                           _coordinates(member.velocity_left), _coordinates(member.position_right),
                           _coordinates(member.velocity_right))
        residual = tuple(_multiply((ruler, ruler), _subtract(h, a))
                         for h, a in zip(required, totals[i]))
        squared = zero
        for component in residual:
            squared = _add(squared, _square(component))
        members.append(MemberRange(member.label, _serialize_vector(totals[i]),
            _serialize_vector(required), _serialize_vector(residual), _serialize(squared)))
    return CellRangeResult(SCHEMA, 'conditional_ranges', request.scope, PRECISION, request.cell_index,
        request.frame_index, request.reception, request.frame_domain, request.retained_domain,
        request.field_speed, request.coupling, request.ruler, request.bindings, request.members,
        request.rows, tuple(pairs), tuple(members), Claims())
