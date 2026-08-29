"""Pure constant-response continuation controls; no adapter evaluation or IO API.

The independent mathematical answer used here is integral(1)=duration and
peak_squared=1, with zero correlated residual. Frozen GK supplies the unchanged
transition protocol; equality of replay alone is not independent physics proof.
"""
from dataclasses import dataclass, replace
from fractions import Fraction as F
import hashlib
import json
from pathlib import Path
import sys
from types import ModuleType, SimpleNamespace as NS
import unittest

ROOT=Path(__file__).resolve().parents[1]


def load(name,relative,expected=None):
    raw=(ROOT/relative).read_bytes()
    if expected: assert hashlib.sha256(raw).hexdigest()==expected
    m=ModuleType(name);m.__file__=str(ROOT/relative);sys.modules[name]=m
    exec(compile(raw,m.__file__,'exec'),m.__dict__);return m


R=load('continuation_subject','scripts/eom/f6c_leaf_continuation.py')
D=load('continuation_diagnostic','scripts/eom/f6c_single_leaf_diagnostic.py')
S=load('continuation_streamed','scripts/eom/f6c_streamed_leaf_session.py')
C=load('continuation_codec','scripts/eom/f6c_leaf_evidence_codec.py','371f6eff5a7a50514816b9af04c98fdae18084cc364b35b565fc53acae76a79f')
I=load('continuation_integral','scripts/eom/oracle/f6c_residual_integral_supremum.py','fc170a91b2747923bda89ef00b58d529c98bf96b01cc7b2c05c035042fc79c5a')
G=load('continuation_protocol','scripts/eom/oracle/f6c_gk13_protocol.py','a70a15481f793e913440628068f9c53bab611fe9d92f36206a401c01e91478eb')


def token(n):
    # Every synthetic endpoint is n*13/16000, represented exactly.
    scaled=n*8125
    return str(scaled//10000000)+'.'+str(scaled%10000000).zfill(7)


@dataclass(frozen=True)
class Parent:
    index:int
    reception:object
    rows:tuple
    bindings:tuple
    refined:bool


class Adapter:
    integral_reference=I
    gk_protocol=G
    acceleration_reference=NS()
    def __init__(self):
        self.context=I.Context('f6c-reconstruction-family','a'*64,'b'*64,'1','10.304229970992187','0.5320012303229503')
        self.frames=tuple(NS(time=token(2*n)) for n in range(81))
        self.parents=tuple(Parent(n,I.Bounds(token(n),token(n+1)),tuple(dict(row=j) for j in range(64)),(),n==0) for n in range(160))
        self.provenance=(('synthetic','constant-one'),)
        self.histories=tuple(NS(segments=(None,)) for _ in range(8))
        self.call_counts=dict.fromkeys(S.COUNTERS,0)
        self.geometry_accounting=dict.fromkeys(S.GEOMETRY,0)
    def project_restricted(self,*_): raise AssertionError('no numerical provider allowed in pure replay')
    evaluate=project_restricted
    residual_for=project_restricted


def binding(raw,path):return dict(path=path,sha256=hashlib.sha256(raw).hexdigest(),bytes=len(raw))


def authority(a):
    return dict(context=S.to_wire(a.context),history={'synthetic':'fixed stationary family'},
                mathematicalSettings={'settingIndex':0,'fieldSpeed':'1'},mathematicalBindings=[])


def metadata():
    return dict(scope='synthetic-constant-one-only',spec={},sourceBindings={},runtimeBindings=[],
                pythonBodySha256='c'*64,clockTransfer={},publicationRequires='external source/process/numerical admission')


def constant_response(req,wide=False):
    members=[]
    for label in G.LABELS:
        key=I.IntegralKey(req.context,label,req.frame_index,req.domain)
        polynomial=I.Polynomial(key,('0.5'+'0'*89 if wide else '1.'+'0'*89,'0','0'))
        residual=I.ResidualPartition(key,(I.ResidualPiece(req.domain,I.Bounds('-0.5','0.5') if wide else I.Bounds('0','0')),))
        q=I.Bounds('0','1') if wide else I.Bounds('1','1')
        members.append(G.MemberEvidence(label,q,(q,)*3,polynomial,residual,'correlated'))
    return G.LeafResponse(req,tuple(members))


def segment(a,count=2,*,state=None,previous=None,consumed=(),name='first',mutate=None,wide=False):
    state=D.LeafResponseSession(a).state if state is None else state
    inherited=len(state.evaluations);initial=S.state_summary(G,state);meta=metadata()
    if previous is not None:meta['spec']['continuation']=dict(schema=R.CONTINUATION_SCHEMA,predecessor=previous,
        inheritedPairs=inherited,replayedInitialState=initial,consumedOriginalParents=list(consumed))
    header=dict(**meta,accepted=False,protocol_plan=S.to_wire(state.plan),initial_state=initial,
                metadataCensus={},claims=S.to_wire(I.Claims()))
    lines=[];enc=C.StreamEncoder(dict(context=S.to_wire(a.context),source_provenance=S.to_wire(a.provenance)),header,lines.append)
    visited=set();domains=[]
    for n in range(count):
        request=G.request(state);response=constant_response(request,wide)
        parent=next(p for p in a.parents if F(p.reception.lower)<=F(request.domain.lower)<F(request.domain.upper)<=F(p.reception.upper))
        visited.add(parent.index);domains.append(request.domain)
        calls=tuple(zip(S.COUNTERS,(4*(n+1),4*(n+1),8*(n+1),0,0)))
        geometry=tuple(zip(S.GEOMETRY,(4*(n+1),4*(n+1),32*(n+1),4*(n+1))))
        rows=[{} for _ in range(64)]
        provision=D.LeafProvision('braid-program/f6c-leaf-provision.v1','synthetic',a.context,a.provenance,response,
            tuple(dict(cell=dict(rows=rows),ranges=dict(rows=rows)) for _ in range(4)),tuple({} for _ in range(8)),calls,geometry,(8,)*4,I.Claims())
        enc.provision(n,S.to_wire(provision));state=G.respond(I,state,response)
        evaluation=state.evaluations[-1]
        assert evaluation.peak_upper_squared==1
        if not wide:
            assert evaluation.integral_width==0
            assert all(F(d.integral.lower)==F(request.domain.upper)-F(request.domain.lower)==F(d.integral.upper) for d in evaluation.diagnostics)
        else:
            assert all(F(d.integral.lower)==0 and F(d.integral.upper)==F(request.domain.upper)-F(request.domain.lower) for d in evaluation.diagnostics)
        transition=dict(evaluation=S.to_wire(evaluation),state_after=S.state_summary(G,state))
        if mutate:mutate(transition)
        enc.transition(n,transition)
    enc.finish(dict(final_state=S.state_summary(G,state),call_counts=S.to_wire(calls),geometry_accounting=S.to_wire(geometry),history_state_evaluations=[8]*(4*count),claims=S.to_wire(I.Claims())))
    raw=b''.join(lines);sb=binding(raw,'/synthetic/'+name+'.ndjson');ab={k:None for k in R.ACCEPTANCE_KEYS}
    for k in ('operation','invocation','finalCaller','numericalReceipt','operationalReceipt','independentAudit','acceptanceReceipt'):ab[k]=binding(b'x','/synthetic/'+k+'.json')
    ab.update(schema=R.SCHEMA,scope='synthetic-only',accepted=True,stream=sb,predecessor=previous,
        segment=dict(localPairs=count,totalPairs=inherited+count,inheritedPairs=inherited,records=2*count+2,
                     coveredOriginalParents=sorted(visited),domain=[domains[0].lower,domains[-1].upper]),
        completeEOF=True,independentNumericalConformance=True,processClosure=True,accuracyClosure=False,
        streamFraming=dict(prefixBytes=sum(map(len,lines[:-1])),prefixSha256=hashlib.sha256(b''.join(lines[:-1])).hexdigest(),
                           finalLF=True,complete=True,provisions=count,transitions=count),
        finalState=S.state_summary(G,state),**authority(a))
    ar=json.dumps(ab).encode();acceptance=binding(ar,'/synthetic/'+name+'-acceptance.json')
    return R.Segment(sb,tuple(lines),meta,S.to_wire(a.parents),acceptance,ar),state,dict(stream=sb,acceptance=acceptance)


def accepted_change(s,change):
    a=json.loads(s.acceptance_bytes);change(a);raw=json.dumps(a).encode()
    return replace(s,acceptance_bytes=raw,acceptance_binding=binding(raw,s.acceptance_binding['path']))


class ReplayTests(unittest.TestCase):
    def replay(self,a,segments,**kwargs):return R.replay(a,D,C,S,segments,expected_authority=authority(a),**kwargs)

    def test_exact_constant_prefix_and_single_use_adoption(self):
        a=Adapter();s,want,_=segment(a);prefix=self.replay(a,[s]);self.assertEqual(prefix.metadata['inheritedPairs'],2)
        session=D.LeafResponseSession(a,continuation=R,prefix=prefix)
        self.assertEqual(S.state_summary(G,session.state),S.state_summary(G,want))
        self.assertEqual(session.logical_accounting,dict(inherited_pairs=2,new_pairs=0,total_pairs=2))
        self.assertEqual(a.call_counts,dict.fromkeys(S.COUNTERS,0))
        with self.assertRaises(ValueError):D.LeafResponseSession(a,continuation=R,prefix=prefix)
        with self.assertRaises(ValueError):R.ReplayedPrefix()

    def test_two_segments_preserve_complete_chronology_and_budget(self):
        a=Adapter();one,state,prev=segment(a);two,want,_=segment(a,2,state=state,previous=prev,consumed=(0,1),name='second')
        token=self.replay(a,[one,two]);session=D.LeafResponseSession(a,continuation=R,prefix=token)
        self.assertEqual(S.to_wire(session.state.evaluations),S.to_wire(want.evaluations));self.assertEqual(session.state.next_generation,160)
        self.assertEqual(session.logical_accounting['total_pairs'],4)
        self.assertEqual(tuple(p.request.path for p in session.state.leaves[:4]),((0,),(1,),(0,),(1,)))

    def test_false_hashes_trailing_data_and_framing_reject(self):
        a=Adapter();s,_,_=segment(a,1)
        bad=[replace(s,acceptance_bytes=s.acceptance_bytes+b' '),replace(s,lines=s.lines[:-1]),
             replace(s,lines=s.lines+(b'\n',)),replace(s,lines=(s.lines[0][:-1],)+s.lines[1:]),
             accepted_change(s,lambda v:v.update(completeEOF=False)),accepted_change(s,lambda v:v['stream'].update(sha256='f'*64))]
        for b in bad:
            with self.subTest(b=b.stream_binding),self.assertRaises(ValueError):self.replay(a,[b])
        self.assertTrue(all(v==0 for v in a.call_counts.values()))

    def test_forged_evaluation_and_frontier_reject(self):
        for change in (lambda v:v['evaluation']['integral_width'].update(numerator='1'),lambda v:v['state_after'].update(next_generation=161)):
            a=Adapter();s,_,_=segment(a,1,mutate=change)
            with self.assertRaises(ValueError):self.replay(a,[s])

    def test_detached_counts_context_and_predecessor_reject(self):
        a=Adapter();s,_,_=segment(a,1)
        for change in (lambda v:v['segment'].update(inheritedPairs=1),lambda v:v['context'].update(field_speed='2'),
                       lambda v:v.update(predecessor={'stream':v['stream'],'acceptance':v['operation']}),lambda v:v['segment'].update(domain=['0','0.13'])):
            with self.assertRaises(ValueError):self.replay(a,[accepted_change(s,change)])

    def test_consumed_parent_snapshot_and_mutated_current_generation_reject(self):
        a=Adapter();s,_,_=segment(a,1);parents=S.to_wire(s.original_parents);parents[0]['rows'][0]['row']=99
        with self.assertRaises(ValueError):self.replay(a,[replace(s,original_parents=parents)])
        prefix=self.replay(a,[s]);a.parents=tuple(list(a.parents))
        with self.assertRaises(ValueError):D.LeafResponseSession(a,continuation=R,prefix=prefix)

    def test_provider_work_and_swallowed_reentry_poison_before_token(self):
        a=Adapter();s,_,_=segment(a,1)
        def work():a.call_counts['projections']+=1
        with self.assertRaises(ValueError):self.replay(a,[s],live=work)
        a=Adapter();s,_,_=segment(a,1)
        def reenter():
            try:self.replay(a,[s])
            except ValueError:pass
        with self.assertRaises(ValueError):self.replay(a,[s],live=reenter)

    def test_new_stream_header_has_bound_prefix_and_local_counters(self):
        a=Adapter();s,_,_=segment(a,1);prefix=self.replay(a,[s]);lines=[]
        stream=S.StreamedLeafSession(a,D,C,metadata(),lines.append,continuation=R,prefix=prefix)
        receipt=stream.finish();decoder=C.StreamDecoder();records=[decoder.feed(x) for x in lines];decoder.finish()
        self.assertEqual(records[0]['header']['spec']['continuation']['inheritedPairs'],1)
        self.assertEqual(records[-1]['summary']['call_counts'],[[k,0] for k in S.COUNTERS])
        self.assertEqual(receipt['logical_accounting'],dict(inherited_pairs=1,new_pairs=0,total_pairs=1,replayed_gk_evaluations=1))

    def test_last_initial_leaf_and_terminal_width_complete(self):
        a=Adapter();one,state,prev=segment(a,159);two,want,_=segment(a,1,state=state,previous=prev,consumed=range(159),name='terminal')
        self.assertEqual(want.status,'conditional-width-complete')
        prefix=self.replay(a,[one,two]);session=D.LeafResponseSession(a,continuation=R,prefix=prefix)
        self.assertIsNone(G.request(session.state));self.assertEqual(session.state.aggregate,want.aggregate)
        self.assertEqual(session.state.split_counts,(1,)*80)
        with self.assertRaises(ValueError):session.provide(session.state)
        self.assertTrue(all(v==0 for v in a.call_counts.values()))

    def test_global_priority_tie_and_pending_adaptive_child(self):
        a=Adapter();one,state,prev=segment(a,160,wide=True)
        self.assertEqual((G.request(state).frame_index,G.request(state).path),(0,(0,0)))
        self.assertEqual(state.split_counts,(2,)+(1,)*79)
        two,want,_=segment(a,1,state=state,previous=prev,consumed=range(160),name='adaptive-child',wide=True)
        prefix=self.replay(a,[one,two]);session=D.LeafResponseSession(a,continuation=R,prefix=prefix)
        self.assertEqual(S.to_wire(session.state.evaluations),S.to_wire(want.evaluations))
        self.assertEqual((G.request(session.state).path,session.state.next_generation),((0,1),162))
        self.assertEqual(session.logical_accounting['total_pairs'],161)
        self.assertEqual(len(session.state.evaluations),161)
        self.assertIsNone(session.state.aggregate)


if __name__=='__main__':unittest.main()
