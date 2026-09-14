"""Synthetic exact-answer controls; no actual histories, roots or range jobs."""

from dataclasses import FrozenInstanceError, asdict, replace
from decimal import Decimal, localcontext
from fractions import Fraction as F
import importlib.util
from pathlib import Path
import sys
import unittest
from unittest.mock import patch


ROOT = Path(__file__).resolve().parents[1]


def load(name, filename):
    spec = importlib.util.spec_from_file_location(name, ROOT / 'scripts/eom/oracle' / filename)
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


R = load('gk13_frozen_integral_reference', 'f6c_residual_integral_supremum.py')
M = load('tested_gk13_protocol', 'f6c_gk13_protocol.py')


def exact(token):
    return F(Decimal(token))


def box(a, b=None):
    return R.Bounds(str(a), str(a if b is None else b))


def pair(bound):
    return exact(bound.lower), exact(bound.upper)


def token(q):
    # Test-only exact terminating Fraction serializer, independent of subject.
    n, d = q.numerator, q.denominator
    power = 0
    while 10**power % d:
        power += 1
        if power > 1000:
            raise ValueError('not a bounded finite decimal')
    units = abs(n) * (10**power // d)
    digits = str(units).rjust(power+1, '0')
    result = digits if not power else digits[:-power]+'.'+digits[-power:]
    return ('-' if n < 0 else '')+result


def plan(cuts=0):
    ctx = R.Context(R.FAMILY, 'a'*64, 'b'*64, '1', R.COUPLING, R.RULER)
    # 80 exact frames: first79 width.001, last .051. Synthetic, not actual F6c.
    times = tuple(F(i, 1000) for i in range(80))+(F(13, 100),)
    frames = tuple(R.Frame(i, box(token(a), token(b))) for i, (a,b) in enumerate(zip(times,times[1:])))
    knots = tuple(tuple(token(a+(b-a)*F(j, 25)) for j in range(1,cuts+1))
                  for a,b in zip(times,times[1:]))
    return M.ProtocolInput(ctx, frames, knots, M.REFERENCE_SHA256)


def response(req, q=box('0'), *, node_q=None, mode='range-subtraction'):
    evidence = []
    for label in R.LABELS:
        nodes = (q,)*3 if node_q is None else node_q
        p = M.polynomial_for_nodes(R, req, label, nodes)
        residual = M.fallback_residual(R, req, p, q)
        evidence.append(M.MemberEvidence(label, q, nodes, p, residual, mode))
    return M.LeafResponse(req, tuple(evidence))


def fill_initial(state, factory=lambda req: response(req)):
    count = len(state.leaves)
    for _ in range(count):
        state = M.respond(R, state, factory(M.request(state)))
    return state


def replace_member(packet, index=0, **updates):
    members = list(packet.members)
    members[index] = replace(members[index], **updates)
    return replace(packet, members=tuple(members))


class RuleControls(unittest.TestCase):
    def test_moments_derived_without_tables(self):
        # Solve symmetric moment equations directly: m4/m2 = a^2.
        m0, m2, m4 = F(2), F(2,3), F(2,5)
        a2 = m4/m2
        w = m2/(2*a2)
        center_w = m0-2*w
        self.assertEqual((a2,w,center_w),(F(3,5),F(5,9),F(8,9)))
        for degree in range(6):
            expected = F(0) if degree % 2 else F(2,degree+1)
            actual = center_w+2*w if degree == 0 else (F(0) if degree%2 else 2*w*a2**(degree//2))
            self.assertEqual(actual,expected)
        self.assertEqual(2*F(0)**1,0)
        self.assertNotEqual(2*F(0)**2,m2)

    def test_exact_sqrt_bracket_positive_disjoint_affine_neighborhoods(self):
        for domain in (box('0','.001'),box('.079','.13'),box('.00000000001','.00000000001001')):
            neighborhoods = M.node_neighborhoods(R,domain)
            lo,hi = pair(domain); c=(lo+hi)/2; h=(hi-lo)/2
            negative,center,positive=tuple(pair(x) for x in neighborhoods)
            a,b=(positive[0]-c)/h,(positive[1]-c)/h
            self.assertLess(a*a,F(3,5)); self.assertGreater(b*b,F(3,5))
            self.assertEqual(b-a,F(1,10**90))
            self.assertEqual(negative,(c-h*b,c-h*a))
            self.assertEqual(center,(c-h/F(10**90),c+h/F(10**90)))
            self.assertTrue(all(lo<a<b<hi for a,b in (negative,center,positive)))
            self.assertLess(negative[1],center[0]); self.assertLess(center[1],positive[0])

    def test_gk_agreement_is_not_remainder_evidence(self):
        # f(x)=x²(x²-3/5)² vanishes at ALL three exact nodes; integral >0.
        coefficients={2:F(9,25),4:F(-6,5),6:F(1)}
        integral=sum(c*F(2,n+1) for n,c in coefficients.items())
        self.assertEqual(integral,F(8,175))
        self.assertEqual(sum(c*F(3,5)**(n//2) for n,c in coefficients.items()),0)
        self.assertEqual(integral/2,F(4,175))  # any affine cell: multiply by width.
        req=M.request(M.start(R,plan()))
        # Continuous synthetic positive polynomial on normalized leaf. Its true
        # node neighborhoods are NOT points; conservatively use [0,.000001].
        packet=response(req,box('0','1'),node_q=(box('0','.000001'),)*3)
        result=M.evaluate_leaf(R,packet)
        a,b=pair(result.diagnostics[0].integral)
        self.assertLessEqual(a,F(4,175000)); self.assertGreaterEqual(b,F(4,175000))
        self.assertGreater(b-a,F(1,10**6))

    def test_deterministic_quadratic_from_independent_affine_values(self):
        req=M.request(M.start(R,plan()))
        lo,_=pair(req.domain)
        nodes=tuple(box(token(3+2*((a+b)/2-lo))) for a,b in map(pair,req.node_neighborhoods))
        p=M.polynomial_for_nodes(R,req,R.LABELS[0],nodes)
        self.assertEqual(tuple(map(exact,p.coefficients)),(F(3),F(2),F(0)))

    def test_quadratic_fit_before_rounding_exact_known_coefficients(self):
        req=M.request(M.start(R,plan()))
        lo,_=pair(req.domain)
        nodes=[]
        for a,b in map(pair,req.node_neighborhoods):
            x=(a+b)/2-lo
            nodes.append(box(token(7-3*x+5*x*x)))
        p=M.polynomial_for_nodes(R,req,R.LABELS[0],tuple(nodes))
        self.assertEqual(tuple(map(exact,p.coefficients)),(F(7),F(-3),F(5)))

    def test_negative_coefficient_rounding_is_floor_not_toward_zero(self):
        # Direct rational arithmetic check of declared rounding implementation.
        for q in (F(-1,3), F(-2,7), F(1,3), F(2,7), F(-10**130,3)):
            token_q=M._floor_token(q)
            rounded=exact(token_q)
            self.assertLessEqual(rounded,q)
            dec=Decimal(token_q); quantum=F(10)**dec.as_tuple().exponent
            self.assertLess(q-rounded,quantum)
            self.assertLessEqual(len(dec.as_tuple().digits),90)

    def test_constant_members_known_integral_g_and_k(self):
        req=M.request(M.start(R,plan()))
        result=M.evaluate_leaf(R,response(req,box('4')))
        for d in result.diagnostics:
            self.assertEqual(pair(d.gauss),(F(1,250),)*2)
            self.assertEqual(pair(d.kronrod),(F(1,250),)*2)
            self.assertEqual(pair(d.difference),(F(0),)*2)
            self.assertEqual(pair(d.integral),(F(1,250),)*2)
            self.assertEqual(pair(d.remainder),(F(0),)*2)
        self.assertEqual(len(result.witnesses),24)

    def test_naive_subtraction_has_no_integral_gain(self):
        req=M.request(M.start(R,plan()))
        result=M.evaluate_leaf(R,response(req,box('1','4')))
        self.assertEqual(pair(result.diagnostics[0].integral),(F(1,1000),F(1,250)))
        self.assertEqual(result.diagnostics[0].residual_mode,'range-subtraction')

    def test_explicit_correlated_remainder_can_improve(self):
        # True constant f=2 while deliberately broad cell Q=[1,4]; nodeQ=[2,2]
        # and exact f-p=0 are independently valid uniform synthetic premises.
        req=M.request(M.start(R,plan()))
        packet=response(req,box('1','4'),node_q=(box('2'),)*3,mode='correlated')
        members=tuple(replace(e,residual=R.ResidualPartition(e.polynomial.key,
                         (R.ResidualPiece(req.domain,box('0')),))) for e in packet.members)
        result=M.evaluate_leaf(R,replace(packet,members=members))
        self.assertEqual(pair(result.diagnostics[0].integral),(F(1,500),)*2)
        self.assertEqual(pair(result.cell.members[0].squared_norm),(F(1),F(4)))

    def test_ambient_decimal_context_independence(self):
        baseline=None
        for precision in (2,7,28,90,160):
            with localcontext() as ctx:
                ctx.prec=precision
                state=M.start(R,plan())
                req=M.request(state)
                packet=response(req,box('.1','.7'),node_q=(box('.1','.2'),box('.3','.4'),box('.6','.7')))
                result=M.evaluate_leaf(R,packet)
                if baseline is None: baseline=result
                self.assertEqual(result,baseline)


class StateControls(unittest.TestCase):
    def test_complete_zero_global_widths_only_after_all_frames(self):
        state=M.start(R,plan())
        self.assertEqual(state.status,'pending'); self.assertIsNone(state.aggregate)
        for n in range(79):
            self.assertEqual(M.request(state).frame_index,n)
            state=M.respond(R,state,response(M.request(state)))
            self.assertEqual(state.status,'pending'); self.assertIsNone(state.aggregate)
        state=M.respond(R,state,response(M.request(state)))
        self.assertEqual(state.status,'conditional-width-complete')
        self.assertTrue(state.aggregate.both_width_targets_met)
        self.assertEqual((len(state.evaluations),state.node_neighborhood_count),(80,240))
        self.assertEqual((state.root_refinements,state.emission_refinements),(0,0))
        self.assertFalse(any(asdict(state.claims).values()))
        self.assertFalse(any(asdict(state.aggregate.claims).values()))
        self.assertIsNone(M.request(state))
        with self.assertRaises(M.ProtocolUnresolved): M.respond(R,state,state.evaluations[-1].response)

    def test_mandatory_cuts_count_and_neighborhoods_do_not_cross(self):
        state=M.start(R,plan(1))
        self.assertEqual(state.split_counts,(1,)*80)
        self.assertEqual(len(state.leaves),160)
        for leaf in state.leaves:
            a,b=pair(leaf.request.domain)
            self.assertTrue(all(a<x<y<b for x,y in map(pair,leaf.request.node_neighborhoods)))
        self.assertEqual(state.node_neighborhood_count,0)

    def test_rms_priority_largest_integral_then_frame_time_and_one_split(self):
        state=fill_initial(M.start(R,plan()),lambda req:response(req,box('0','1')))
        # Last synthetic frame is .051 wide, so largest integral uncertainty.
        req=M.request(state)
        self.assertEqual(req.frame_index,79)
        self.assertEqual(req.path,(0,0))
        self.assertEqual(state.split_counts,(0,)*79+(1,))
        self.assertEqual(len(state.leaves),81)
        self.assertIsNone(state.aggregate)

    def test_ties_are_original_frame_then_time_not_member_resets(self):
        state=fill_initial(M.start(R,plan()),lambda req:response(req,box('0','1') if req.frame_index<2 else box('0')))
        self.assertEqual(M.request(state).frame_index,0)
        self.assertEqual(state.split_counts[0],1)
        self.assertEqual(sum(state.split_counts),1)

    def test_stale_parent_or_orphan_response_rejected_after_split(self):
        state=M.start(R,plan())
        first=response(M.request(state),box('0','1'))
        state=M.respond(R,state,first)
        with self.assertRaises(M.ProtocolUnresolved): M.respond(R,state,first)
        state=fill_remaining(state)
        parent=state.evaluations[-1].response
        self.assertEqual(M.request(state).frame_index,79)
        with self.assertRaises(M.ProtocolUnresolved): M.respond(R,state,parent)
        req=M.request(state)
        with self.assertRaises(M.ProtocolUnresolved):
            M.respond(R,state,response(replace(req,generation=req.generation+1)))

    def test_unavailable_provider_preserves_prefix_without_metric(self):
        state=M.start(R,plan())
        state=M.respond(R,state,response(M.request(state)))
        req=M.request(state)
        ended=M.respond(R,state,M.ProviderUnavailable(req,'new-root-refinement-required'))
        self.assertEqual(ended.status,'unresolved'); self.assertEqual(len(ended.evaluations),1)
        self.assertIsNone(ended.aggregate); self.assertIsNone(M.request(ended))
        self.assertFalse(any(asdict(ended.claims).values()))

    def test_opaque_state_and_deep_immutable_inputs(self):
        with self.assertRaises(M.ProtocolUnresolved): M.State()
        state=M.start(R,plan())
        with self.assertRaises(FrozenInstanceError): state.split_counts=(0,)*80
        with self.assertRaises(TypeError): state.plan.frames[0]='changed'
        with self.assertRaises(FrozenInstanceError): state.plan.context.ruler='1'
        with self.assertRaises(TypeError): replace(state,status='conditional-width-complete')

    def test_exact_20_shared_cuts_exhaust_no_depth_or_member_reset(self):
        state=M.start(R,plan(20))
        self.assertEqual(len(state.leaves),1680)
        self.assertEqual(state.split_counts,(20,)*80)
        # Structural exhaustion tested using already valid leaf arithmetic:
        # equivalent immutable records with each exact leaf's request/keys.
        # Running all1680 synthetic responses is finite but unnecessary here;
        # final transition is exercised with 79 frames exhausted in separate test.
        with self.assertRaises(M.ProtocolUnresolved): M.start(R,plan(21))

    def test_final_adaptive_event_and_exhaustion_full_transition_plumbing(self):
        # Explicit control-flow test: substitute only leaf arithmetic with the
        # hand-derived constant-range integral. Real scheduler and frozen whole
        # aggregation remain active; this is not independent range evidence.
        p=plan(20)
        p=replace(p,mandatory_knots=(p.mandatory_knots[0][:-1],)+p.mandatory_knots[1:])
        state=M.start(R,p)
        initial=len(state.leaves)
        self.assertEqual(initial,1679)

        def cheap_evaluation(reference,packet):
            self.assertIs(reference,R)
            req=packet.request
            q=box('0','1') if req.frame_index==0 else box('0')
            a,b=pair(req.domain)
            cell=R.Cell(req.context,req.frame_index,req.domain,
                        tuple(R.MemberBound(label,q) for label in R.LABELS))
            witnesses=tuple(R.Witness(req.context,label,req.frame_index,token((a+b)/2),'0')
                            for label in R.LABELS)
            return M.LeafEvaluation(packet,cell,witnesses,(),8*(b-a) if req.frame_index==0 else F(0),
                                    F(1) if req.frame_index==0 else F(0))

        with patch.object(M,'evaluate_leaf',side_effect=cheap_evaluation):
            for _ in range(initial):
                req=M.request(state)
                state=M.respond(R,state,M.LeafResponse(req,()))
            self.assertEqual(state.split_counts,(20,)*80)
            self.assertEqual(M.request(state).frame_index,0)
            self.assertEqual(M.request(state).path,(19,0))  # widest initial cell
            self.assertEqual(len(state.leaves),1680)
            for _ in range(2):
                state=M.respond(R,state,M.LeafResponse(M.request(state),()))
        self.assertEqual(state.status,'unresolved')
        self.assertEqual(state.reason,'shared-split-budget-exhausted')
        self.assertFalse(state.aggregate.both_width_targets_met)
        self.assertEqual(len(state.evaluations),1681)
        self.assertEqual(state.node_neighborhood_count,5043)
        self.assertFalse(any(asdict(state.claims).values()))

    def test_peak_priority_after_correlated_integrals_close_rms(self):
        def known(req):
            # f identically1, but deliberately loose upper range differs by
            # frame; exact correlated integral and node witnesses close RMS.
            q=box('1','9') if req.frame_index==3 else box('1','4')
            packet=response(req,q,node_q=(box('1'),)*3,mode='correlated')
            members=tuple(replace(e,residual=R.ResidualPartition(e.polynomial.key,
                             (R.ResidualPiece(req.domain,box('0')),))) for e in packet.members)
            return replace(packet,members=members)
        state=fill_initial(M.start(R,plan()),known)
        self.assertEqual(state.status,'pending')
        self.assertEqual(M.request(state).frame_index,3)
        self.assertEqual(sum(state.split_counts),1)

    def test_neighborhood_witness_can_close_peak_without_changing_integral(self):
        # f=4 constant: whole Q=[1,4], uniform node neighborhoods give peak≥2.
        state=fill_initial(M.start(R,plan()),lambda req: known_constant(req,'4',box('1','4')))
        self.assertEqual(state.status,'conditional-width-complete')
        self.assertEqual(pair(state.aggregate.peak),(F(2),)*2)
        self.assertEqual(pair(state.aggregate.rms),(F(2),)*2)

    def test_frame_side_witnesses_never_average_curvature_knots(self):
        state=fill_initial(M.start(R,plan()),lambda req:response(req,box('1') if req.frame_index==0 else box('4')))
        self.assertEqual(pair(state.aggregate.peak),(F(2),)*2)
        self.assertEqual(len(state.aggregate.member_integrals),8)
        self.assertEqual(state.aggregate.witnesses,640)


def fill_remaining(state):
    # Finish the original frame list, no unbounded loop or callback in protocol.
    for _ in range(80-len(state.evaluations)):
        state=M.respond(R,state,response(M.request(state),box('0','1')))
    return state


def known_constant(req,value,whole):
    packet=response(req,whole,node_q=(box(value),)*3,mode='correlated')
    return replace(packet,members=tuple(replace(e,residual=R.ResidualPartition(e.polynomial.key,
        (R.ResidualPiece(req.domain,box('0')),))) for e in packet.members))


class RejectionControls(unittest.TestCase):
    def setUp(self):
        self.state=M.start(R,plan())
        self.req=M.request(self.state)
        self.packet=response(self.req)

    def test_missing_reordered_duplicate_members(self):
        for members in (self.packet.members[:-1],self.packet.members[::-1],(self.packet.members[0],)*8):
            with self.assertRaises(M.ProtocolUnresolved): M.evaluate_leaf(R,replace(self.packet,members=members))

    def test_wrong_node_count_or_zero_width_or_precision_retry(self):
        for nodes in (self.req.node_neighborhoods[:2],(box('0'),)*3,
                      (self.req.node_neighborhoods[0],box('.000499','.000501'),self.req.node_neighborhoods[2])):
            with self.assertRaises(M.ProtocolUnresolved):
                M.evaluate_leaf(R,replace(self.packet,request=replace(self.req,node_neighborhoods=nodes)))

    def test_changed_polynomial_or_residual_key_or_domain(self):
        e=self.packet.members[0]
        bads=(replace_member(self.packet,polynomial=replace(e.polynomial,coefficients=('1','0','0'))),
              replace_member(self.packet,residual=replace(e.residual,key=replace(e.residual.key,label='0-'))),
              replace_member(self.packet,residual=replace(e.residual,pieces=(R.ResidualPiece(box('0','.0005'),box('0')),))))
        for packet in bads:
            with self.assertRaises(M.ProtocolUnresolved): M.evaluate_leaf(R,packet)

    def test_empty_node_residual_or_fallback_intersection(self):
        e=self.packet.members[0]
        bads=(replace_member(self.packet,node_squared=(box('1'),)*3),
              replace_member(self.packet,residual=R.ResidualPartition(e.polynomial.key,(R.ResidualPiece(self.req.domain,box('1')),)),residual_mode='correlated'),
              replace_member(self.packet,residual_mode='invented'))
        for packet in bads:
            with self.assertRaises(M.ProtocolUnresolved): M.evaluate_leaf(R,packet)

    def test_negative_nonfinite_huge_or_nondecimal_tokens_fail_before_work(self):
        for token_q in ('-1','NaN','Infinity','1/2','1e999999999','1'*1025,'1e-1001'):
            with self.assertRaises(M.ProtocolUnresolved):
                M.evaluate_leaf(R,replace_member(self.packet,whole_squared=box(token_q)))

    def test_frame_hole_overlap_reorder_or_wrong_end(self):
        p=plan()
        for frame in (replace(p.frames[0],index=True),replace(p.frames[0],domain=box('.0001','.001')),
                      replace(p.frames[0],domain=box('0','.002'))):
            with self.assertRaises(M.ProtocolUnresolved): M.start(R,replace(p,frames=(frame,)+p.frames[1:]))
        with self.assertRaises(M.ProtocolUnresolved): M.start(R,replace(p,frames=p.frames[::-1]))
        with self.assertRaises(M.ProtocolUnresolved): M.start(R,replace(p,frames=p.frames[:-1]))

    def test_knots_unsorted_duplicate_boundary_missing_census(self):
        p=plan()
        for knots in (('.0006','.0004'),('.0005','.0005'),('0',),('.001',),['.0005']):
            with self.assertRaises(M.ProtocolUnresolved): M.start(R,replace(p,mandatory_knots=(knots,)+p.mandatory_knots[1:]))
        with self.assertRaises(M.ProtocolUnresolved): M.start(R,replace(p,mandatory_knots=()))

    def test_mutable_aliases_subclasses_and_identity_changes(self):
        p=plan()
        for bad in (replace(p,frames=list(p.frames)),replace(p,mandatory_knots=list(p.mandatory_knots)),
                    replace(p,reference_sha256='0'*64),replace(p,context=replace(p.context,field_speed='2'))):
            with self.assertRaises(M.ProtocolUnresolved): M.start(R,bad)
        with self.assertRaises(M.ProtocolUnresolved): M.evaluate_leaf(R,replace(self.packet,members=list(self.packet.members)))
        class MutableBounds(R.Bounds): pass
        with self.assertRaises(M.ProtocolUnresolved):
            M.evaluate_leaf(R,replace_member(self.packet,whole_squared=MutableBounds('0','0')))

    def test_nested_key_subclasses_mutable_polynomial_and_frame_bool(self):
        e=self.packet.members[0]
        for p in (replace(e.polynomial,coefficients=list(e.polynomial.coefficients)),
                  replace(e.polynomial,key=replace(e.polynomial.key,frame_index=False)),
                  replace(e.polynomial,key=replace(e.polynomial.key,domain=['0','.001']))):
            with self.assertRaises(M.ProtocolUnresolved): M.evaluate_leaf(R,replace_member(self.packet,polynomial=p))
        with self.assertRaises(M.ProtocolUnresolved):
            M.respond(R,self.state,M.ProviderUnavailable(replace(self.req,path=[0]),'no provider'))

    def test_rounding_capacity_fails_without_node_retry_or_precision_change(self):
        with self.assertRaises(M.ProtocolUnresolved):
            M.node_neighborhoods(R,box('0','1e-1000'))
        self.assertEqual(M.PRECISION,90)
        self.assertEqual((M.ROOT_REFINEMENT_LIMIT,M.EMISSION_REFINEMENT_LIMIT),(0,0))


if __name__ == '__main__':
    unittest.main()
