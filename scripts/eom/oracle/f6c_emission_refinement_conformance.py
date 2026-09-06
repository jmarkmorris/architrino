"""Pure independent replay of the fixed one-cell emission refinement.

The caller injects the captured helper module at REQUIRED_REFERENCE_SHA.
Injection is an execution premise, NOT authentication. This module reads no
files, imports no proposer and authenticates neither sources nor histories.
All positive results remain accepted=False with all authority flags false.

Eight histories must cover [-8,.13], with 1..1760 pieces/member so analytic
synthetic controls need no padded histories. An actual caller must separately
authenticate exactly1760 original pieces/member, all original tokens, the
premise receipts, runtime generation and fresh bounded process closure.
The conditional geometry uses the frozen c_f=1 contract: a coherent global C1
family inside these boxes, speed<=17/20, simultaneous nonself clearance>=27/100,
and the accepted oldest-boundary guard. This library does not prove those
hypotheses; in particular factor/clearance intersections retain that premise.

Queries have exactly QUERY_FIELDS. Ordinals are0..31; global queryIndex visits
receiver-major nonself pairs, lower32 then independently reset upper32.
exploratory and residual are {lower,upper,precision:90}; midpoint/retainedFace
are canonical finite decimal strings, with retainedFace AFTER the decision.
Final rows/pieces retain the frozen helper schemas, with pair-specific emission.

Inputs are bounded exact list/tuple containers. Inert records and histories are
copied into call-local immutable snapshots before numerical comparison or
progress callbacks; the frozen dependency parses exact tokens during copying.
There is no global or cross-call cache. The caller owns timeouts for synchronous
helpers and callbacks. A callback cannot change the compared input generation.
"""
from __future__ import annotations

from dataclasses import dataclass
from fractions import Fraction
from types import MappingProxyType

REQUIRED_REFERENCE_SHA='e0e063ce268cfd54e8a9ce618fb7da3caca0a9756000d7602ed9ae2abc6b0fd9'
DECLARATION_SHA='53f3398ba083218948c9efd93f10db09cbf5d617bc0270988f5adea24c48f037'
IDS=('0+','0-','1+','1-','2+','2-','3+','3-')
A,B=Fraction(-8),Fraction(-1,20)
RECEPTION=(Fraction(0),Fraction(1,1000))
END=Fraction(13,100)
CHARGE='0.1666666666666666666666666666666667'
QUERY_FIELDS=frozenset(('queryIndex','receiverIndex','transmitterIndex','receiverId','transmitterId',
    'side','ordinal','exploratory','midpoint','residual','decision','retainedFace'))
SEGMENT_FIELDS=frozenset(('startTime','endTime','coefficients','positionErrors','velocityErrors','positionError','velocityError'))
FALSE_CLAIMS=tuple((name,False) for name in ('accepted','referenceGenerationAuthenticated','originalSourceAuthenticated',
    'original1760PieceCensusAuthenticated','premiseTruthAuthenticated','subjectMembershipEstablished',
    'historicalTrajectoryIdentityEstablished','executionAuthorized','eomExecuted','h3EvidenceEligible',
    'metricsAvailable','scoreAuthorized','equilibriumEstablished','retentionEstablished','physicalRealizationEstablished'))
HELPERS=('number','interval','sub','squared_norm','le_sqrt','sqrt_le','state_box','check_face','check_distance',
    'check_factor','check_piece','original_history_digest','contains','false_flags')


class ConformanceError(ValueError):
    """A failed prefix is not a complete mathematical result."""
    def __init__(self,message,completed_queries=0,completed_rows=0):
        super().__init__(message)
        self.completed_queries=completed_queries
        self.completed_rows=completed_rows
        self.accepted=False


@dataclass(frozen=True)
class PairRestriction:
    receiver_index:int
    transmitter_index:int
    lower:Fraction
    upper:Fraction
    lower_query_index:int|None
    upper_query_index:int|None


@dataclass(frozen=True)
class RefinementComparison:
    accepted:bool
    conditional_query_replay_conformant:bool
    conditional_final_cover_conformant:bool
    query_count:int
    pair_count:int
    row_count:int
    ordinary_nonself_rows:int
    self_exclusion_rows:int
    piece_record_count:int
    final_strict_face_checks:int
    oldest_boundary_checks:int
    geometry_piece_visits:int
    restrictions:tuple[PairRestriction,...]
    claims:tuple[tuple[str,bool],...]
    reference_required_sha256:str=REQUIRED_REFERENCE_SHA
    declaration_required_sha256:str=DECLARATION_SHA


def _require(value,message):
    if not value:raise ValueError(message)


def _sequence(value,count=None,maximum=None):
    _require(type(value) in (list,tuple),'bounded exact list/tuple required')
    _require((count is None or len(value)==count) and (maximum is None or 0<len(value)<=maximum),'bounded container census differs')


def _integer(value,expected):
    _require(type(value) is int and value==expected,'exact integer/order differs')


def _closed(value,names):
    _require(type(value) in (dict,MappingProxyType) and set(value)==set(names),'closed record fields differ')


def _freeze(value,depth=0):
    """Copy inert exact JSON leaves; no retained mutable input aliases."""
    _require(depth<=8,'record depth bound')
    if type(value) is dict:
        _require(len(value)<=40 and all(type(k) is str and len(k)<=128 for k in value),'record key bound')
        return MappingProxyType({k:_freeze(v,depth+1) for k,v in value.items()})
    if type(value) in (list,tuple):
        _require(len(value)<=16,'record array bound')
        return tuple(_freeze(v,depth+1) for v in value)
    _require(value is None or type(value) in (str,int,bool),'inert JSON leaf required')
    if type(value) is str:_require(len(value)<=1152,'record token bound')
    if type(value) is int:_require(abs(value)<=1000000,'record integer bound')
    return value


def _plain(value):
    """The unchanged helper schema checks require ordinary dict/list inputs."""
    if type(value) is MappingProxyType:return {k:_plain(v) for k,v in value.items()}
    if type(value) is tuple:return [_plain(v) for v in value]
    return value


def exact_time_token(value):
    """Canonical exact finite-decimal serialization, without binary floats."""
    _require(type(value) is Fraction,'exact Fraction time required')
    d=value.denominator;twos=fives=0
    while d%2==0:d//=2;twos+=1
    while d%5==0:d//=5;fives+=1
    places=max(twos,fives)
    _require(d==1 and places<=34 and A<=value<=B,'time outside finite refinement domain')
    scaled=abs(value.numerator)*(10**places//value.denominator)
    whole,tail=divmod(scaled,10**places)
    return ('-' if value<0 else '')+str(whole)+(('.'+str(tail).zfill(places).rstrip('0')) if tail else '')


def _histories(reference,histories):
    _sequence(histories,8);result=[]
    for i,h in enumerate(histories):
        _require(type(h) is dict,'history object required')
        _integer(h['pathKey'],i+1);_integer(h['polarity'],1 if i%2==0 else -1)
        _require(type(h['id']) is str and h['id']==IDS[i],'member identity differs')
        _require(type(h['charge']) is str and h['charge']==('' if i%2==0 else '-')+CHARGE,'original signed charge differs')
        _require(type(h['coverageStart']) is str and type(h['coverageEnd']) is str and
                 h['coverageStart']=='-8' and h['coverageEnd']=='0.13','fixed retained domain required')
        _require(type(h['historyFingerprint']) is str and 0<len(h['historyFingerprint'])<=256,'original fingerprint required')
        _sequence(h['segments'],maximum=1760);segments=[];cursor=A
        for original in h['segments']:
            _closed(original,SEGMENT_FIELDS);s=_freeze(original)
            lo,hi=reference.number(s['startTime']),reference.number(s['endTime'])
            _require(lo==cursor<hi<=END,'history gap/overlap/domain differs');cursor=hi
            _sequence(s['coefficients'],3)
            for axis in s['coefficients']:
                _sequence(axis,4)
                for token in axis:reference.number(token)
            for axis,scalar in [('positionErrors','positionError'),('velocityErrors','velocityError')]:
                _sequence(s[axis],3);radius=reference.number(s[scalar])
                _require(all(0<=reference.number(v)<=radius for v in s[axis]),'scalar radius must cover original axis allowances')
            segments.append(s)
        _require(cursor==END,'history suffix missing')
        result.append(MappingProxyType({k:h[k] for k in ('id','pathKey','polarity','charge','coverageStart','coverageEnd','historyFingerprint')}|
                                       {'segments':tuple(segments)}))
    return tuple(result)


def _query_interval(reference,receiver,transmitter,reception,midpoint,reported):
    """Unsigned whole-face containment; never a root-only intersection."""
    source=reference.state_box(transmitter,(midpoint,midpoint))
    displacement=tuple(reference.sub(x,y) for x,y in zip(receiver['position'],source['position']))
    qlo,qhi=reference.squared_norm(displacement)
    lo,hi=reference.interval(_plain(reported))
    _require(reference.le_sqrt(lo+reception[1]-midpoint,qlo) and reference.sqrt_le(qhi,hi+reception[0]-midpoint),
             'query misses independent whole-face Bernstein enclosure')
    return lo,hi


def _replay(reference,histories,queries,state,progress):
    receivers=tuple(reference.state_box(h,RECEPTION) for h in histories)
    restrictions=[]
    for i in range(8):
        for j in range(8):
            if i==j:continue
            retained={};proofs={}
            for side in ('lower','upper'):
                lo,hi=A,B;face=A if side=='lower' else B;proof=None
                for ordinal in range(32):
                    index=state['queries'];q=queries[index];_closed(q,QUERY_FIELDS)
                    for key,value in [('queryIndex',index),('receiverIndex',i),('transmitterIndex',j),('ordinal',ordinal)]:_integer(q[key],value)
                    _require(q['receiverId']==IDS[i] and q['transmitterId']==IDS[j] and q['side']==side,'query ownership/search order differs')
                    _require(reference.interval(_plain(q['exploratory']))==(lo,hi),'exploratory state differs')
                    midpoint=(lo+hi)/2
                    _require(q['midpoint']==exact_time_token(midpoint),'exact canonical midpoint differs')
                    gl,gh=_query_interval(reference,receivers[i],histories[j],RECEPTION,midpoint,q['residual'])
                    if side=='lower':
                        if gh<0:face=lo=midpoint;proof=index;decision='retain-negative'
                        else:hi=midpoint;decision='explore-lower-half'
                    else:
                        if gl>0:face=hi=midpoint;proof=index;decision='retain-positive'
                        else:lo=midpoint;decision='explore-upper-half'
                    _require(q['decision']==decision and q['retainedFace']==exact_time_token(face),'branch or certified face differs')
                    state['queries']+=1
                    if progress:progress(state['queries'],state['rows'])
                retained[side]=face;proofs[side]=proof
            _require(A<=retained['lower']<retained['upper']<=B,'crossed or invalid final certified interval')
            restrictions.append(PairRestriction(i,j,retained['lower'],retained['upper'],proofs['lower'],proofs['upper']))
    return tuple(restrictions),receivers


def _final_cover(reference,histories,rows,pieces,restrictions,receivers,state,progress):
    by_pair={(p.receiver_index,p.transmitter_index):p for p in restrictions};piece_index=visits=0
    digests=tuple(reference.original_history_digest(h) for h in histories)
    oldest=tuple(reference.state_box(h,(A,A)) for h in histories)
    for n,frozen in enumerate(rows):
        row=_plain(frozen);_closed(row,reference.ROW_KEYS);i,j=divmod(n,8)
        for key,value in [('rowIndex',n),('cellIndex',0),('receiverIndex',i),('transmitterIndex',j)]:_integer(row[key],value)
        _require(row['receiverId']==IDS[i] and row['transmitterId']==IDS[j],'final pair identity differs')
        _require(reference.interval(row['reception'])==RECEPTION,'fixed reception cell differs')
        reference.false_flags(row['libraryFlags'])
        _require(row['rootFreeComplementConditional'] is True and row['retainedBoundaryContact'] is False,'final complement/boundary differs')
        if i==j:
            _integer(row['ordinaryRootsPerReception'],0)
            _require(row['coincidentEndpointExcluded'] is True,'self endpoint exclusion absent')
            _require(all(row[k] is None for k in ('emission','oldestResidual','lowerFaceResidual','upperFaceResidual','displacement',
                'distance','transmitterFactor','receiverFactor','receiverPieceRecord','transmitterPieceRecord')),'fabricated self geometry or pieces')
        else:
            _integer(row['ordinaryRootsPerReception'],1)
            _require(row['coincidentEndpointExcluded'] is False,'nonself exclusion differs')
            proposed=by_pair[(i,j)];emission=(proposed.lower,proposed.upper)
            _require(reference.interval(row['emission'])==emission,'final box not the replay-derived restriction')
            receiver=receivers[i]
            for name,t,sign in [('oldestResidual',A,'negative'),('lowerFaceResidual',emission[0],'negative'),
                                ('upperFaceResidual',emission[1],'positive')]:
                source=oldest[j] if t==A else reference.state_box(histories[j],(t,t))
                displacement=tuple(reference.sub(x,y) for x,y in zip(receiver['position'],source['position']))
                reference.check_face(row[name],displacement,(RECEPTION[0]-t,RECEPTION[1]-t),sign)
            # Oldest(A) and the newly retained lower face are distinct queries.
            transmitter=reference.state_box(histories[j],emission)
            displacement=tuple(reference.sub(x,y) for x,y in zip(receiver['position'],transmitter['position']))
            _sequence(row['displacement'],3)
            _require(all(reference.contains(reference.interval(r),d) for r,d in zip(row['displacement'],displacement)),
                     'final displacement misses original-piece enclosure')
            distance=reference.check_distance(row['distance'],displacement,(RECEPTION[0]-emission[1],RECEPTION[1]-emission[0]))
            reference.check_factor(row['transmitterFactor'],displacement,distance,transmitter['velocity'],transmitter=True)
            reference.check_factor(row['receiverFactor'],displacement,distance,receiver['velocity'])
            for role,member,requested,enclosure in [('receiver',i,RECEPTION,receiver),('transmitter',j,emission,transmitter)]:
                _integer(row[role+'PieceRecord'],piece_index)
                reference.check_piece(_plain(pieces[piece_index]),piece_index,n,role,histories[member],digests[member],requested,enclosure)
                piece_index+=1;visits+=enclosure['touchedPieceCount']
        state['rows']+=1
        if progress:progress(state['queries'],state['rows'])
    _require(piece_index==112,'final piece census incomplete')
    return visits


def compare_refinement(reference,histories,queries,rows,pieces,*,progress=None):
    """Replay all3584 queries then independently compare all64 rows/112 pieces.

    The reference dependency must be authenticated by the future caller. Return
    values explicitly withhold that authentication and the original1760 census.
    Bounds/counts on inert containers precede iteration or callbacks; callbacks
    receive only completed-query and completed-row integers. Exceptions preserve
    completed-prefix counts but never a positive partial result.
    """
    state={'queries':0,'rows':0}
    try:
        _require(all(callable(getattr(reference,name,None)) for name in HELPERS),'required frozen reference dependency absent')
        _require(progress is None or callable(progress),'progress callback invalid')
        _sequence(queries,3584);_sequence(rows,64);_sequence(pieces,112)
        snapshot=_histories(reference,histories)
        query_snapshot=tuple(_freeze(q) for q in queries)
        row_snapshot=tuple(_freeze(r) for r in rows)
        piece_snapshot=tuple(_freeze(p) for p in pieces)
        if progress:progress(0,0)
        restrictions,receivers=_replay(reference,snapshot,query_snapshot,state,progress)
        _require(state['queries']==3584 and len(restrictions)==56,'complete query census required')
        visits=_final_cover(reference,snapshot,row_snapshot,piece_snapshot,restrictions,receivers,state,progress)
        _require(state['rows']==64,'complete final row census required')
        return RefinementComparison(False,True,True,3584,56,64,56,8,112,112,56,visits,restrictions,FALSE_CLAIMS)
    except Exception as error:
        raise ConformanceError(str(error),state['queries'],state['rows']) from error
