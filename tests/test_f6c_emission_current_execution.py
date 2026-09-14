"""Synthetic transport controls; these do not establish scientific acceptance."""

import copy
import hashlib
import importlib.util
from pathlib import Path
from types import SimpleNamespace
import unittest
from unittest.mock import Mock, patch

ROOT = Path(__file__).resolve().parents[1]
H = 'a'*64

def load(name, relative):
    spec = importlib.util.spec_from_file_location(name, ROOT / relative)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


bridge = load('emission_current_controls_bridge', 'scripts/eom/execute-f6c-emission-refinement.py')
m = load('emission_current_controls_verifier', bridge.VERIFIER)
support = load('emission_current_controls_support', bridge.SUPPORT)


def binding(path, digest='a' * 64, size=10):
    return dict(path=path, sha256=digest or H, bytes=size)


def plan_fixture():
    """Explicit synthetic closed plan: byte capture is tested by the CLI suite."""
    names = dict(declaration=(m.DECLARATION, ('a'*64)),
                 producer=(m.PRODUCER, ('a'*64)), producerControls=(m.PRODUCER_CONTROLS, 'b'*64),
                 verifier=(m.SELF, ('a'*64)), verifierControls=(m.CONTROLS, 'c'*64),
                 comparisonReference=(m.PURE, ('a'*64)), comparisonReferenceControls=(m.PURE_CONTROLS, ('a'*64)))
    p = {key: binding(path, digest) for key, (path, digest) in names.items()}
    p.update(schema=bridge.SCHEMA, scope=m.SCOPE, limits=copy.deepcopy(m.LIMITS), priorCoverClosure=m.prior_closure(),
             subjectSourceBindings=[binding(path) for path in m.FROZEN_SUBJECT] +
                                   [p['producer'], p['producerControls']],
             runtimeBindings=[binding('/synthetic/python')], executionBridge=binding(bridge.SELF))
    p['operationalBindings'] = [p['executionBridge'], binding(bridge.SUPPORT, ('a'*64)),
        binding('tests/test_f6c_emission_current_execution.py'),
        binding('scripts/eom/run-f6c-emission-refinement-pilot.mjs'),
        binding('scripts/eom/launch-f6c-emission-refinement-pilot.mjs'),
        binding('tests/f6c-emission-refinement-pilot.test.js'),
        binding('tests/f6c-emission-refinement-pilot-process.test.js'),
        binding('scripts/eom/launch-prescribed-response-pilot.mjs'),
        binding('scripts/eom/launch-subfield-circular-root-pilot.mjs'),

        binding('/bin/ps'), binding('/usr/bin/memory_pressure', 'ba1ce108f7f91e55bdcb7f5dd267c39484eb51bc6b8135814678c0f8c045a6da'),
        binding('/synthetic/node')]
    return p


class CurrentPlanControls(unittest.TestCase):
    def validate(self, p):
        return bridge.current_plan(p, m, ROOT, 'a'*64, support, {role:'a'*64 for role in bridge.OPERATIONAL_SELECTION})

    def test_closed_plan_projects_without_mutating_original_or_runtime_bindings(self):
        p = plan_fixture(); before = copy.deepcopy(p)
        result = self.validate(p)
        self.assertEqual(p, before)
        self.assertEqual(result['schema'], m.PLAN_SCHEMA)
        self.assertEqual(result['operationalBindings'], p['operationalBindings'])
        self.assertNotIn('historicalInputs', result)

    def test_external_selection_is_required_and_cannot_be_inferred_from_plan(self):
        for selection in (None, {}, {'outer':'a'*64}, {role:'d'*64 for role in bridge.OPERATIONAL_SELECTION}):
            with self.subTest(selection=selection), self.assertRaises(ValueError):
                bridge.current_plan(plan_fixture(), m, ROOT, 'a'*64, support, selection)
        for role, filename in bridge.OPERATIONAL_SELECTION.items():
            p=plan_fixture()
            next(row for row in p['operationalBindings'] if row['path']==filename)['sha256']='d'*64
            with self.subTest(role=role), self.assertRaises(ValueError): self.validate(p)

    def test_direct_cli_requires_every_external_selection_before_source_or_plan_use(self):
        import subprocess, sys
        base=['--stage','producer','--bridge-sha256','a'*64,'--plan','absent-plan',
              '--plan-sha256','a'*64,'--budget-seconds','1']
        selections=sum((['--'+role+'-sha256','a'*64] for role in bridge.OPERATIONAL_SELECTION),[])
        for index in range(0,len(selections),2):
            args=base+selections[:index]+selections[index+2:]
            result=subprocess.run([sys.executable,'-I','-B',str(ROOT/bridge.SELF),*args],capture_output=True,text=True,timeout=3)
            self.assertEqual(result.returncode,2)
            self.assertIn(selections[index],result.stderr)
            self.assertNotIn('FileNotFoundError',result.stderr)

    def test_rejects_obsolete_source_routes(self):
        for key in ('historicalInputs','declarationInput'):
            p=plan_fixture();p[key]={}
            with self.assertRaises(ValueError): self.validate(p)

    def test_rejects_missing_extra_duplicate_or_stale_execution_member(self):
        for mode in ('missing', 'extra', 'duplicate', 'stale', 'relative-node', 'wrong-bridge'):
            with self.subTest(mode=mode):
                p = plan_fixture(); ops = p['operationalBindings']
                if mode == 'missing': ops.pop(2)
                elif mode == 'extra': ops.append(binding('scripts/unlisted.py'))
                elif mode == 'duplicate': ops.append(copy.deepcopy(ops[0]))
                elif mode == 'stale': ops[7]['sha256'] = 'd'*64
                elif mode == 'relative-node': ops[-1]['path'] = 'synthetic/node'
                else: p['executionBridge'] = binding(bridge.SELF, 'd'*64)
                with self.assertRaises(ValueError): self.validate(p)

    def test_preserved_scientific_validator_rejects_claim_promotion_limits_and_subject_change(self):
        for field in ('closure', 'limit', 'subject', 'extra'):
            with self.subTest(field=field):
                p = plan_fixture()
                if field == 'closure': p['priorCoverClosure']['independentAuditAccepted'] = False
                elif field == 'limit': p['limits']['serialWorkers'] = 2
                elif field == 'subject': p['subjectSourceBindings'][1]['path'] = 'scripts/wrong.py'
                else: p['h3EvidenceEligible'] = True
                with self.assertRaises(ValueError): self.validate(p)


class ComparisonControls(unittest.TestCase):
    def setUp(self):
        self.plan = dict(subjectSourceBindings=[], priorCoverClosure={})
        self.plan_binding, self.producer = binding('/plan'), binding('/producer')
        self.fixed, self.execution, self.docs = {}, [], {'synthetic': True}
        self.raw = {role: (binding('/'+role), role.encode()) for role in ('queries', 'rows', 'pieces')}
        self.members, self.histories, self.restrictions = ['member-control'], object(), ['restriction-control']
        self.result = SimpleNamespace(accepted=False, conditional_query_replay_conformant=True,
            conditional_final_cover_conformant=True, query_count=3584, pair_count=64, row_count=64,
            ordinary_nonself_rows=56, self_exclusion_rows=8, piece_record_count=112,
            final_strict_face_checks=112, oldest_boundary_checks=56, geometry_piece_visits=123,
            claims={key: False for key in m.CLAIMS})
        box = lambda lo, hi: dict(lower=lo, upper=hi, precision=90)
        self.packet = dict(schema=m.MANIFEST_SCHEMA, scope=m.SCOPE, status='conditional_complete', accepted=False,
            launchPlan=self.plan_binding, producer=self.producer, fixedBindings=self.fixed,
            subjectSourceBindings=[], executionBindings=[], priorCoverClosure={}, members=self.members,
            knotSha256=m.KNOT_SHA, retainedDomain=box('-8', '0.13'), receptionDomain=box('0', '0.001'),
            originalEmissionDomain=box('-8', '-0.05'), precision=90, speedUpper='0.85', clearanceLower='0.27',
            algorithm=m.ALGORITHM, census=m.CENSUS, restrictions=self.restrictions,
            libraryFlags={key: False for key in m.ROOT_FLAGS}, claims={key: False for key in m.CLAIMS},
            **{role: value[0] for role, value in self.raw.items()})
        self.events = []
        self.auth = Mock(side_effect=lambda *_: self.events.append('authenticate'))
        self.pure = SimpleNamespace(compare_refinement=Mock(side_effect=lambda *_, **kw: (self.events.append('compare'), self.result)[1]))
        self.helper, self.progress = object(), Mock()

    def call(self):
        with patch.object(m, 'original_mapping', return_value=(self.histories, self.members)), \
             patch.object(m, 'records', side_effect=lambda data, count: (data, count)), \
             patch.object(m, 'restriction_records', return_value=self.restrictions):
            return bridge.compare_current(m, self.packet, self.plan, self.plan_binding, self.producer,
                self.fixed, self.execution, self.docs, self.raw, self.pure, self.helper, self.auth, self.progress)

    def test_authenticates_before_delegating_exact_original_stream_census(self):
        result = self.call()
        self.assertEqual(self.events, ['authenticate', 'compare'])
        self.auth.assert_called_once_with(m, self.docs, self.fixed)
        self.pure.compare_refinement.assert_called_once_with(self.helper, self.histories,
            (b'queries', 3584), (b'rows', 64), (b'pieces', 112), progress=self.progress)
        self.assertIs(result['accepted'], False)

    def test_rejects_promoted_claim_before_authentication_or_numerics(self):
        self.packet['claims']['h3EvidenceEligible'] = True
        with self.assertRaisesRegex(ValueError, 'authority flag'): self.call()
        self.auth.assert_not_called(); self.pure.compare_refinement.assert_not_called()

    def test_rejects_stream_substitution_before_authentication(self):
        self.packet['queries'] = binding('/substitute')
        with self.assertRaisesRegex(ValueError, 'stream binding'): self.call()
        self.auth.assert_not_called(); self.pure.compare_refinement.assert_not_called()

    def test_prior_authentication_failure_prevents_comparison(self):
        self.auth.side_effect = ValueError('known rejected original chain')
        with self.assertRaisesRegex(ValueError, 'known rejected original chain'): self.call()
        self.pure.compare_refinement.assert_not_called()

    def test_independent_negative_result_is_never_promoted(self):
        self.result.conditional_final_cover_conformant = False
        with self.assertRaisesRegex(ValueError, 'complete conditional comparison'): self.call()

    def test_independent_restriction_mismatch_is_rejected(self):
        self.packet['restrictions'] = ['altered']
        with self.assertRaisesRegex(ValueError, 'restrictions'): self.call()



if __name__ == '__main__':
    unittest.main()
