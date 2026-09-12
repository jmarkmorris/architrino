"""Synthetic transport controls; these do not establish scientific acceptance."""
import copy
import hashlib
import importlib.util
from pathlib import Path
from types import SimpleNamespace
import unittest
from unittest.mock import Mock, patch

ROOT = Path(__file__).resolve().parents[1]
def current_execution_plan(plan):
    """Copy the retained example into a current synthetic control, without changing its provenance."""
    plan=copy.deepcopy(plan)
    keys=('consumer','controls','rangeVerifier','producer','producerControls','verifier','verifierControls','executionBridge')
    rows=[plan[k] for k in keys if k in plan]
    rows += plan['operationalBindings'] + plan.get('subjectSourceBindings',[])
    for b in rows:
        if b['path'].startswith(('scripts/','tests/')):
            raw=(ROOT/b['path']).read_bytes()
            b.update(sha256=hashlib.sha256(raw).hexdigest(),bytes=len(raw))
    return plan





def load(name, relative):
    spec = importlib.util.spec_from_file_location(name, ROOT / relative)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


bridge = load('emission_current_controls_bridge', 'scripts/eom/execute-f6c-emission-refinement.py')
m = load('emission_current_controls_verifier', bridge.VERIFIER)
support = load('emission_current_controls_support', bridge.SUPPORT)


def binding(path, digest='a' * 64, size=10):
    return dict(path=path, sha256=digest, bytes=size)


def plan_fixture():
    """Explicit synthetic closed plan: byte capture is tested by the CLI suite."""
    names = dict(declaration=(m.DECLARATION, m.DECLARATION_SHA),
                 producer=(m.PRODUCER, bridge.PRODUCER_SHA), producerControls=(m.PRODUCER_CONTROLS, 'b'*64),
                 verifier=(m.SELF, bridge.VERIFIER_SHA), verifierControls=(m.CONTROLS, 'c'*64),
                 comparisonReference=(m.PURE, m.PURE_SHA), comparisonReferenceControls=(m.PURE_CONTROLS, m.PURE_CONTROLS_SHA))
    p = {key: binding(path, digest) for key, (path, digest) in names.items()}
    p.update(schema=bridge.SCHEMA, scope=m.SCOPE, limits=copy.deepcopy(m.LIMITS), priorCoverClosure=m.prior_closure(),
             subjectSourceBindings=[binding(path, digest) for path, digest in m.FROZEN_SUBJECT] +
                                   [p['producer'], p['producerControls']],
             runtimeBindings=[binding('/synthetic/python')], executionBridge=binding(bridge.SELF),
             declarationInput=dict(originalPath=m.DECLARATION, path='reference/declaration.source', sha256=m.DECLARATION_SHA, bytes=10),
             historicalInputs=[dict(role=role, originalPath=path, sha256=digest, bytes=size,
                                    path='reference/'+role+'.source') for role, path, digest, size in support.HISTORICAL])
    p['operationalBindings'] = [p['executionBridge'], binding(bridge.SUPPORT, bridge.SUPPORT_SHA),
        binding('tests/test_f6c_emission_current_execution.py'),
        binding('scripts/eom/run-f6c-emission-refinement-pilot.mjs'),
        binding('scripts/eom/launch-f6c-emission-refinement-pilot.mjs'),
        binding('tests/f6c-emission-refinement-pilot.test.js'),
        binding('tests/f6c-emission-refinement-pilot-process.test.js'),
        binding('scripts/eom/launch-prescribed-response-pilot.mjs', '05cd35574276841795077ea28a2b6d6e47534379184f7164a9dafe473e156a7f'),
        binding('scripts/eom/launch-subfield-circular-root-pilot.mjs', '71974054ddce7fc29b8464b9a7a63f8fbb04ee5b425dc997df4d40b2804341aa'),
        binding('/bin/ps'), binding('/usr/bin/memory_pressure', 'ba1ce108f7f91e55bdcb7f5dd267c39484eb51bc6b8135814678c0f8c045a6da'),
        binding('/synthetic/node')]
    return p


class CurrentPlanControls(unittest.TestCase):
    def validate(self, p):
        return bridge.current_plan(p, m, ROOT, 'a'*64, support)

    def test_closed_plan_projects_without_mutating_original_or_runtime_bindings(self):
        p = plan_fixture(); before = copy.deepcopy(p)
        result = self.validate(p)
        self.assertEqual(p, before)
        self.assertEqual(result['schema'], m.PLAN_SCHEMA)
        self.assertEqual(result['operationalBindings'], p['operationalBindings'])
        self.assertNotIn('historicalInputs', result)

    def test_rejects_data_route_escape_alias_collision_and_generation_change(self):
        for path in ('/reference/escaped.source', 'reference/../escaped.source', 'reference//x.source',
                     'scripts/x.source', 'reference/x.py', 'reference/rootTheorem.source'):
            with self.subTest(path=path):
                p = plan_fixture(); p['declarationInput']['path'] = path
                with self.assertRaises(ValueError): self.validate(p)
        p = plan_fixture(); p['historicalInputs'][0]['sha256'] = 'f'*64
        with self.assertRaises(ValueError): self.validate(p)
        p = plan_fixture(); p['historicalInputs'].reverse()
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
                elif field == 'subject': p['subjectSourceBindings'][1]['sha256'] = 'd'*64
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



class PublicationLifecycle(unittest.TestCase):
    def test_actual_transport_publication_and_cleanup_with_artificial_numerics(self):
        """Keep capture/authentication/writers real; synthetic callbacks make no science claim."""
        from contextlib import contextmanager, redirect_stdout
        import hashlib
        import io
        import json
        import tempfile
        plan_path = ROOT/'reference/priorities/development-process-review/evidence/emission-current-migration/emission-launch.v2.json'
        plan = current_execution_plan(json.loads(plan_path.read_bytes()))
        own = Path(__file__).resolve()
        for b in plan['operationalBindings']:
            if ROOT/b['path'] == own:
                raw = own.read_bytes(); b.update(sha256=hashlib.sha256(raw).hexdigest(), bytes=len(raw))
        original_support = bridge.support
        fail = False
        @contextmanager
        def controlled_support(root):
            with original_support(root) as common:
                original_instrument = common.instrument
                @contextmanager
                def instrument(captured):
                    with original_instrument(captured) as mod:
                        if captured.expected == bridge.PRODUCER_SHA:
                            def propose(histories, modules, helper, write, progress):
                                for i in range(3584): write(dict(syntheticQuery=i))
                                return []
                            def emit(histories, restrictions, modules, helper, row, piece, progress):
                                for i in range(64): row(dict(syntheticRow=i))
                                for i in range(112): piece(dict(syntheticPiece=i))
                                return 112
                            with patch.object(mod,'propose',propose), patch.object(mod,'emit_cover',emit): yield mod
                        else:
                            original_publish = mod.Publication.publish
                            def publish(instance, packet):
                                result = original_publish(instance,packet)
                                if fail: raise ValueError('synthetic post-write failure')
                                return result
                            with patch.object(mod,'runtime_paths',return_value=set()), patch.object(mod.Publication,'publish',publish): yield mod
                with patch.object(common,'instrument',instrument): yield common
        lane = ROOT/'.local-data/braid-analysis/f6c-emission-refinement-20260827'
        with tempfile.TemporaryDirectory(dir=lane,prefix='synthetic-current-') as tmp:
            base = Path(tmp).resolve(); p=base/'plan.json'; raw=json.dumps(plan).encode(); p.write_bytes(raw)
            common=['--bridge-sha256',plan['executionBridge']['sha256'],'--plan',str(p),'--plan-sha256',hashlib.sha256(raw).hexdigest(),'--budget-seconds','30']
            git=next(b['path'] for b in plan['runtimeBindings'] if b['path'].endswith('/git'))
            output=lane/(base.name+'-producer')
            def run(args):
                stream=io.StringIO()
                with controlled_support(ROOT) as controlled, patch.object(bridge,'support',lambda _:controlled_context(controlled)), redirect_stdout(stream):
                    bridge.main(common+args)
                return json.loads(stream.getvalue())
            @contextmanager
            def controlled_context(value): yield value
            try:
                produced=run(['--stage','producer','--out-dir',str(output),'--git-binary',git])
                self.assertFalse(produced['accepted']); self.assertEqual(len(produced['outputs']),4)
                manifest=produced['outputs'][-1]
                def compare(*args):
                    args[-1](3584,64)
                    return dict(syntheticOnly=True)
                outer=lane/(output.name+'-outer'); outer.mkdir()
                target=outer/'comparison.json'
                with patch.object(bridge,'compare_current',compare):
                    checked=run(['--stage','comparison','--manifest',manifest['path'],'--manifest-sha256',manifest['sha256'],'--out',str(target)])
                    self.assertTrue(checked['accepted']); self.assertTrue(target.exists())
                    target.unlink()
                    fail=True; rejected=target
                    with self.assertRaisesRegex(ValueError,'synthetic post-write failure'):
                        run(['--stage','comparison','--manifest',manifest['path'],'--manifest-sha256',manifest['sha256'],'--out',str(rejected)])
                    self.assertFalse(rejected.exists())
            finally:
                import shutil
                if output.exists(): shutil.rmtree(output)
                outer=lane/(output.name+'-outer')
                if outer.exists(): shutil.rmtree(outer)

if __name__ == '__main__':
    unittest.main()
