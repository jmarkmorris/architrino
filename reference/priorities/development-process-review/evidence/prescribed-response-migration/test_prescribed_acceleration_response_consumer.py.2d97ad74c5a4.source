"""Synthetic provenance/plumbing tests, NEVER actual F5 response evidence.

Any fabricated F5-shaped receipt here tests rejection/assembly mechanics only.
Independent response mathematics belongs to the unchanged reference controls.
"""
from copy import deepcopy
from decimal import Decimal
import hashlib
import importlib.util
import json
import os
from pathlib import Path
import signal
import sys
import tempfile
import types
import unittest
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT/'scripts/eom/reduce-prescribed-acceleration-response.py'
SPEC = importlib.util.spec_from_file_location('response_consumer_under_test', SOURCE)
C = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = C
SPEC.loader.exec_module(C)


def interval(lower='0', upper=None):
    upper = lower if upper is None else upper
    width = C.Fraction(upper)-C.Fraction(lower)
    return dict(lower=lower, upper=upper, widthNumerator=str(width.numerator), widthDenominator=str(width.denominator))


def conditional_record():
    """Deliberately synthetic shape fixture, not a computed mathematical answer."""
    zero = [interval() for _ in range(3)]
    members = [dict(index=i, constituentId=w.replace('-worldline', '-architrino'), worldlineId=w,
        polarity=1 if i < 6 else -1, originalHistoryId='f5-enclosed-root/v1/'+w,
        originalHistoryFingerprint='fnv1a64-chain-v1:'+'0'*16, mappedDecimalHistorySha256='0'*64,
        segmentCount=1032, receptionPosition=deepcopy(zero), receptionVelocity=deepcopy(zero)) for i, w in enumerate(C.IDS)]
    contributions, exclusions = [], []
    end = dict(originalToken='-0.5', bits='bfe0000000000000', numerator='-1', denominator='2')
    for i in range(12):
        for j in range(12):
            row = dict(packetRowIndex=i*12+j, rowId=f'{C.IDS[i]}/{C.IDS[j]}/phase-0', receiverIndex=i, transmitterIndex=j)
            if i == j:
                exclusions.append(dict(**row, coincidentEndpointExcluded=True, ordinaryRootCount=0)); continue
            row.update(rootIndex=0, polarityProduct=1 if (i < 6) == (j < 6) else -1,
                emissionEndpoints=[deepcopy(end), deepcopy(end)], emissionInterval=interval('-0.5'),
                nativeTransmitterFactorEndpoints=[deepcopy(end), deepcopy(end)],
                nativeReceiverFactorEndpoints=[deepcopy(end), deepcopy(end)], nativeSegmentIndices=[0],
                receiverPieces=[dict(index=0, domain=interval())], transmitterPieces=[dict(index=0, domain=interval('-0.5'))],
                transmitterPosition=deepcopy(zero), transmitterVelocity=deepcopy(zero), displacement=deepcopy(zero),
                response=deepcopy(zero))
            for field in ('distanceEvaluated', 'causalDelay', 'distance', 'transmitterFactorEvaluated',
                          'receiverFactorEvaluated', 'transmitterFactor', 'receiverFactor'):
                row[field] = interval('1')
            contributions.append(row)
    return dict(schema='braid-program/prescribed-acceleration-response-reference.v1', accepted=False,
        authority='conditional-response-enclosure; original-byte and premise authentication required',
        scope='f5-release', campaignId=C.CAMPAIGN, runId=C.RUN, receptionTime='0', searchedInterval=['-1', '0'],
        sourceHashes=[dict(role=r, sha256=h) for r, _, h in C.SCIENCE], interpretations=['source-decimal', 'frozen-binary64'],
        decimalPrecision=90, nativePrecisionBits=53, arithmeticComplete=True,
        hypotheses=['native complete-root selections authenticated against original packet and accepted ledger',
            'each declared analytic interpretation is one smooth path inside the original nominal and API enclosures',
            'reviewed native build and finite IEEE nearest-rounding/gradual-underflow premises apply'],
        census=dict(members=12, segments=12384, orderedPairs=144, ordinaryRoots=132, selfExclusions=12),
        members=members, contributions=contributions, selfExclusions=exclusions,
        responses=[dict(memberIndex=i, worldlineId=w, components=deepcopy(zero)) for i, w in enumerate(C.IDS)],
        claims={k: False for k in C.FALSE_CLAIMS}, newRootSearches=0, failures=[])


def bindings():
    rows = list(C.SCIENCE)+[
        ('predeclaration', C.PREDECLARATION, C.PREDECLARATION_SHA), ('reference', C.REFERENCE, C.REFERENCE_SHA),
        ('referenceTests', C.REFERENCE_TESTS, C.REFERENCE_TESTS_SHA), ('consumer', C.SELF, '1'*64),
        ('consumerTests', C.TESTS, '2'*64), ('pythonExecutable', '/synthetic/python', '3'*64),
        *((p, p, h) for p, h in (*C.IMPORTS, *C.FORMULAS))]
    return [dict(role=r, path=str(Path('/synthetic/root')/p), sha256=h, bytes=1) for r, p, h in rows]


def assembly_fixture():
    result = conditional_record()
    candidate = dict(schema='braid-program/prescribed-acceleration-response-private.v1', accepted=False, admissible=False,
        subject=C.SUBJECT.copy(), bindings=bindings(), referenceResult=result, referenceResultSha256=C.sha(C.canonical(result)), watcherSha256='4'*64)
    raw = C.canonical(candidate)+b'\n'
    completion = dict(completed=True, accepted=False,
        candidate=dict(path='/synthetic/attempt/private-candidate.json', sha256=C.sha(raw), bytes=len(raw)),
        referenceResultSha256=candidate['referenceResultSha256'], elapsedSeconds=1)
    execution = dict(startedAt='2026-08-27T12:00:00Z', elapsedSeconds=2, exitCode=0, processesClosed=True,
        heartbeatSeconds=15, maximumSampledGroupRssBytes=1000000, rssSampleIntervalSeconds=1,
        outputBytes=1, logBytes=1000, watcherSha256='4'*64, publicationComplete=True)
    expected = dict(schema='braid-program/prescribed-acceleration-response.v1', accepted=True,
        status='accepted-prescribed-response-enclosure', subject=candidate['subject'], bindings=candidate['bindings'],
        referenceResult=result, execution=execution, claims={k: False for k in C.FALSE_CLAIMS}, newRootSearches=0, failures=[])
    for _ in range(8):
        count = len(C.canonical(expected))+1
        if execution['outputBytes'] == count: break
        execution['outputBytes'] = count
    return raw, C.sha(raw), completion, execution, candidate['bindings'], '4'*64


def member_fixture(i=0):
    segments = []
    for j in range(1032):
        a = str(Decimal(-1)+Decimal(j)/50)
        b = str(Decimal(-1)+Decimal(j+1)/50) if j < 1031 else C.INTERVAL[1]
        if j == 0: a = '-1'
        segments.append(dict(index=j, tStart=a, tEnd=b, coefficients=[['0', '0', '0', '0'] for _ in range(3)],
            positionErrors=[C.POSITION]*3, velocityErrors=[C.VELOCITY]*3))
    w = C.IDS[i]
    return dict(index=i, constituentId=w.replace('-worldline', '-architrino'), worldlineId=w, polarity=1 if i < 6 else -1,
                historyId='f5-enclosed-root/v1/'+w, historyFingerprint=C.fnv(segments), segments=segments)


def pair_fixture():
    members = [types.SimpleNamespace(worldline_id=w, constituent_id=w.replace('-worldline', '-architrino'),
        history_id='f5-enclosed-root/v1/'+w, history_fingerprint='fnv1a64-chain-v1:'+'0'*16) for w in C.IDS]
    rows = []
    for phase in range(8):
        for i in range(12):
            for j in range(12):
                t = str(phase)
                row_id = f'{C.IDS[i]}/{C.IDS[j]}/phase-{phase}'
                root = dict(lower='-0.5', upper='-0.5', transmitter_factor_lower='1', transmitter_factor_upper='1',
                    receiver_factor_lower='1', receiver_factor_upper='1', transmitter_factor_sign=1,
                    transmitter_segment_indices=[0], precision_route='binary64_outward', precision_bits=53)
                cert = dict(schema='eom_native_exact_pair_certificate/v1', row_id=row_id,
                    receiver_history_id=members[i].history_id, transmitter_history_id=members[j].history_id,
                    receiver_history_fingerprint=members[i].history_fingerprint, transmitter_history_fingerprint=members[j].history_fingerprint,
                    reception_time=t, searched_lower='-1', searched_upper=t, field_speed='1', root_tolerance='1e-8',
                    status='certified_complete', failure_code='', root_free_complement=True, memory_boundary_contact=False,
                    coincident_endpoint_excluded=i == j, has_difficult_cell=False, difficult_cells=0, achieved_precision_bits=53,
                    precision_escalated=False, mpfr_attempt_count=0, mpfr_escalation_attempt_count=0, diagnostic_detail='',
                    roots=[] if i == j else [root], root_free_cells=[])
                rows.append(dict(phaseIndex=phase, receptionTime=t, receiverIndex=i, transmitterIndex=j,
                    receiverConstituentId=members[i].constituent_id, transmitterConstituentId=members[j].constituent_id,
                    receiverWorldlineId=C.IDS[i], transmitterWorldlineId=C.IDS[j], rowId=row_id, certificate=cert))
    fake = types.SimpleNamespace(NativeRoot=lambda **k: types.SimpleNamespace(**k), NativePairSelection=lambda **k: types.SimpleNamespace(**k))
    return dict(rows=rows), members, fake


def chain_fixture():
    """Metadata-only fabricated chain: does not authenticate real F5 bytes."""
    hashes = {r: h for r, _, h in C.SCIENCE}
    root = Path('/synthetic/root')
    members = [dict(index=i, constituentId=w.replace('-worldline', '-architrino'), worldlineId=w,
        polarity=1 if i < 6 else -1, historyId='f5-enclosed-root/v1/'+w,
        historyFingerprint='fnv1a64-chain-v1:'+'0'*16, segments=[]) for i, w in enumerate(C.IDS)]
    base = dict(campaignId=C.CAMPAIGN, runId=C.RUN)
    manifest = dict(**base, schema='braid-program/f5-enclosed-root-history-manifest.v1',
        normalizedFieldSpeed='1', retainedInterval=C.INTERVAL, maximumSegmentStep='0.02',
        positionWidth=C.POSITION, velocityWidth=C.VELOCITY, members=members)
    packet = dict(**base, schema='braid-program/f5-enclosed-root-rung.v1', bindings=C.expected_bindings(),
        implementationBindings=C.expected_bindings(True), historyManifestSha256=hashes['historyManifest'],
        rungSamples=8, normalizedFieldSpeed='1', terminalStatus='passed', completedRows=1152, passingRows=1152,
        failureCount=0, rootTolerance='1e-8', rootMaxDepth=192, rootMaxCells=300000, workerCount=8,
        initialMpfrBits=128, maximumMpfrBits=512, positionWidth=C.POSITION, velocityWidth=C.VELOCITY,
        retainedHistoryDepth='1', maximumSegmentStep='0.02', analyticInterpolationErrorBounded=True,
        resourceControl=dict(contact=False), members=[{k: m[k] for k in C.MEMBER_KEYS} for m in members])
    ledger = dict(**base, schema='braid-program/f5-enclosed-root-ledger-reduction.v1', accepted=True,
        structurallyAccepted=True, h3EvidenceEligible=False, historyManifestSha256=hashes['historyManifest'],
        rungOrder=[8, 32, 128], totalRows=24192, rungSummaries=[dict(rungSamples=8, rawSha256=hashes['rootPacket'],
            rowCount=1152, ordinaryRootCount=1056, maximumPrecisionBits=53), {}, {}],
        rawHistoryManifest=dict(path=str(root/C.SCIENCE[2][1]), sha256=hashes['historyManifest']),
        rawRungFiles=[dict(path=str(root/C.SCIENCE[0][1]), sha256=hashes['rootPacket'])],
        reducer=dict(path=C.IMPLEMENTATION[5][1], sha256=C.IMPLEMENTATION[5][2]))
    instrument = [dict(path='synthetic-instrument-'+str(i), sha256=str(i)*64) for i in range(4)]
    proofs = []
    for api in (False, True):
        proof = dict(**base, schema='braid-program/f5-api-domain-conformance.v1' if api else 'braid-program/f5-actual-cubic-conformance.v1',
            status='api-domain-conformance-passed' if api else 'actual-cubic-conformance-passed', accepted=True,
            failure=None, resourceContact=False, h3EvidenceEligible=False, historyManifestSha256=hashes['historyManifest'],
            normalizedFieldSpeed='1', expectedMemberSegments=12384, processedMemberSegments=12384,
            retainedInterval=C.INTERVAL, positionWidth=C.POSITION, velocityWidth=C.VELOCITY,
            sourceBindings=C.expected_bindings(), instrumentBindings=instrument if api else instrument[:3],
            memberResults=[dict(index=i, worldlineId=m['worldlineId'], historyFingerprint=m['historyFingerprint'],
                segments=[dict(index=j, **{'passed' if api else 'accepted': True}) for j in range(1032)]) for i, m in enumerate(members)])
        if api:
            proof.update(constantInterpretations=['source-decimal', 'frozen-binary64'],
                nominalCertificateSha256=hashes['nominalConformance'], nominalCertificatePath=str(root/C.SCIENCE[3][1]),
                historyManifestPath=str(root/C.SCIENCE[2][1]), subjectApiBindings=[dict(path=C.IMPLEMENTATION[0][1], sha256=C.IMPLEMENTATION[0][2])])
        proofs.append(proof)
    build = dict(schema='braid-program/f5-reviewed-build.v1', adapterSourceSha256=C.IMPLEMENTATION[0][2],
        runtimePremises=['finite IEEE binary64 nearest rounding', 'gradual underflow'],
        nominalConformance=dict(path=C.SCIENCE[3][1], sha256=hashes['nominalConformance']),
        apiConformance=dict(path=C.SCIENCE[4][1], sha256=hashes['apiConformance']),
        resolvedCompiler=dict(path=C.IMPLEMENTATION[6][1], sha256=C.IMPLEMENTATION[6][2]),
        dependencies=[dict(path=p, sha256=h) for _, p, h in C.IMPLEMENTATION[:5]]+deepcopy(instrument))
    return dict(rootPacket=packet, rootLedger=ledger, historyManifest=manifest,
                nominalConformance=proofs[0], apiConformance=proofs[1], reviewedBuild=build), root


class ConsumerTests(unittest.TestCase):
    def test_inherited_chain_checks_complete_metadata_without_running_proofs(self):
        data, root = chain_fixture()
        before = deepcopy(data)
        C.authenticate_chain(data, root)
        self.assertEqual(data, before)

    def test_inherited_chain_rejects_cross_generation_missing_proof_and_build_debt(self):
        for kind in ('rung', 'nominal', 'api-member', 'proof-hole', 'build', 'interpretation', 'source-binding', 'instrument'):
            data, root = chain_fixture()
            if kind == 'rung': data['rootLedger']['rungSummaries'][0]['rawSha256'] = '0'*64
            elif kind == 'nominal': data['apiConformance']['nominalCertificateSha256'] = '0'*64
            elif kind == 'api-member': data['apiConformance']['memberResults'][0]['worldlineId'] = C.IDS[1]
            elif kind == 'proof-hole': data['nominalConformance']['memberResults'][11]['segments'][1031]['accepted'] = False
            elif kind == 'build': data['reviewedBuild']['dependencies'][0]['sha256'] = '0'*64
            elif kind == 'interpretation': data['apiConformance']['constantInterpretations'].pop()
            elif kind == 'source-binding': data['rootPacket']['bindings'][0]['sha256'] = '0'*64
            else: data['apiConformance']['instrumentBindings'][3]['sha256'] = '9'*64
            with self.subTest(kind=kind), self.assertRaises(C.Rejected): C.authenticate_chain(data, root)

    def test_original_json_rejects_duplicates_nonfinite_and_invalid_utf8(self):
        for raw in (b'{"a":1,"a":2}', b'{"n":NaN}', b'{"n":1e9999}', b'\xff', b'{'):
            with self.subTest(raw=raw), self.assertRaises(C.Rejected): C.decode(raw)
        self.assertEqual(C.decode(b'{"token":"-0.000E-7"}')['token'], '-0.000E-7')

    def test_capture_same_fd_hash_and_late_replacement(self):
        with tempfile.TemporaryDirectory() as tmp:
            tmp = Path(tmp).resolve()
            p = tmp/'input'; p.write_bytes(b'original')
            with C.Capture(p, C.sha(b'original')) as capture:
                self.assertEqual(capture.data, b'original')
                p.rename(Path(tmp)/'preserved'); p.write_bytes(b'original')
                with self.assertRaises(C.Rejected): capture.recheck()
            self.assertIsNone(capture.fd)

    def test_capture_rejects_symlink_fifo_oversize_and_wrong_hash(self):
        with tempfile.TemporaryDirectory() as tmp:
            tmp = Path(tmp).resolve()
            p = tmp/'input'; p.write_bytes(b'original')
            link = Path(tmp)/'link'; link.symlink_to(p)
            fifo = Path(tmp)/'fifo'; os.mkfifo(fifo)
            for filename, digest, limit in ((link, C.sha(b'original'), 100), (fifo, C.sha(b''), 100),
                                           (p, '0'*64, 100), (p, C.sha(b'original'), 2)):
                with self.subTest(filename=filename), self.assertRaises((C.Rejected, OSError)):
                    with C.Capture(filename, digest, limit): pass

    def test_executing_consumer_identity_includes_nested_code(self):
        raw = SOURCE.read_bytes(); C.verify_executing_consumer(raw)
        with self.assertRaises(C.Rejected):
            C.verify_executing_consumer(raw.replace(b"'duplicate JSON key'", b"'changed JSON key'", 1))

    def test_captured_proof_ignores_poisoned_canonical_module(self):
        sources = {p: (ROOT/p).read_bytes() for p, _ in C.IMPORTS}; sources[C.REFERENCE] = (ROOT/C.REFERENCE).read_bytes()
        poisoned = types.ModuleType('scripts.eom.oracle.prescribed_acceleration_response')
        poisoned.evaluate_response = lambda *_: self.fail('cached module must not execute')
        with patch.dict(sys.modules, {poisoned.__name__: poisoned}):
            with C.proof_package(sources) as reference:
                self.assertIsNot(reference, poisoned)
                name = reference.__name__
                self.assertEqual(reference.PRECISION, 90)
            self.assertNotIn(name, sys.modules)
        sources[C.REFERENCE] += b'\n'
        with self.assertRaises(C.Rejected):
            with C.proof_package(sources): pass

    def test_member_projection_preserves_all_1032_original_tokens(self):
        source = member_fixture()
        fake = types.SimpleNamespace(SegmentTokens=lambda *a: a, MemberTokens=lambda *a: a)
        result = C.member_projection(source, 0, fake)
        self.assertEqual(len(result[-1]), 1032)
        self.assertEqual(result[-1][0][1], '-1')
        self.assertEqual(result[-1][0][3][0], ('0', '0', '0', '0'))
        for key, changed in (('historyFingerprint', 'fnv1a64-chain-v1:'+'0'*16), ('polarity', -1),
                             ('historyId', 'restricted-history'), ('worldlineId', C.IDS[1])):
            altered = deepcopy(source); altered[key] = changed
            with self.subTest(key=key), self.assertRaises(C.Rejected): C.member_projection(altered, 0, fake)

    def test_member_projection_rejects_changed_origins_and_axis_allowances(self):
        fake = types.SimpleNamespace(SegmentTokens=lambda *a: a, MemberTokens=lambda *a: a)
        for kind in ('origin', 'position', 'velocity', 'coefficient'):
            source = member_fixture()
            if kind == 'origin': source['segments'][1]['tStart'] = '-0.99'
            elif kind == 'coefficient': source['segments'][0]['coefficients'][1][0] = '0.000'
            else: source['segments'][0][kind+'Errors'][1] = '0'
            with self.subTest(kind=kind), self.assertRaises(C.Rejected): C.member_projection(source, 0, fake)

    def test_pair_selection_does_not_assume_packet_order(self):
        packet, members, fake = pair_fixture()
        packet['rows'].reverse()
        selected = C.project_pairs(packet, members, fake)
        self.assertEqual(len(selected), 144)
        self.assertEqual(selected[0].packet_row_index, 1151)
        self.assertEqual((selected[13].receiver_index, selected[13].transmitter_index), (1, 1))
        self.assertEqual(selected[1].roots[0].lower, '-0.5')

    def test_pair_selection_rejects_missing_duplicate_and_wrong_original_identity(self):
        for kind in ('missing', 'duplicate', 'rowid', 'fingerprint', 'phase'):
            packet, members, fake = pair_fixture()
            if kind == 'missing': packet['rows'].pop()
            elif kind == 'duplicate': packet['rows'][1] = deepcopy(packet['rows'][0])
            elif kind == 'rowid': packet['rows'][0]['rowId'] = 'invented'
            elif kind == 'fingerprint': packet['rows'][0]['certificate']['receiver_history_fingerprint'] = 'restricted'
            else: packet['rows'][144]['receptionTime'] = '0'
            with self.subTest(kind=kind), self.assertRaises(C.Rejected): C.project_pairs(packet, members, fake)

    def test_pair_selection_retains_original_root_free_cells_without_searching(self):
        packet, members, fake = pair_fixture()
        packet['rows'][1]['certificate']['root_free_cells'] = [dict(transmitter_segment_index=0, lower='-1', upper='-0.75',
            residual_lower='-0.5', residual_upper='-0.25', receiver_factor_lower='1', receiver_factor_upper='1',
            lower_value=-1, upper_value=-.75, residual_lower_value=-.5, residual_upper_value=-.25, numeric_values_valid=True)]
        before = deepcopy(packet)
        C.project_pairs(packet, members, fake)
        self.assertEqual(packet, before)
        packet['rows'][1]['certificate']['root_free_cells'][0]['numeric_values_valid'] = False
        with self.assertRaises(C.Rejected): C.project_pairs(packet, members, fake)

    def test_closed_reference_record_rejects_shape_census_and_width_changes(self):
        C.validate_reference_result(conditional_record())
        for kind in ('extra', 'claim', 'omission', 'pair', 'width', 'piece', 'member', 'precision'):
            record = conditional_record()
            if kind == 'extra': record['unreviewed'] = True
            elif kind == 'claim': record['claims']['physicalStrengthChosen'] = True
            elif kind == 'omission': record['contributions'].pop()
            elif kind == 'pair': record['contributions'][0]['receiverIndex'] = 1
            elif kind == 'width': record['responses'][0]['components'][0]['widthNumerator'] = '1'
            elif kind == 'piece': record['contributions'][0]['receiverPieces'][0]['unexpected'] = 0
            elif kind == 'member': record['members'][0]['worldlineId'] = C.IDS[1]
            else: record['nativePrecisionBits'] = 90
            with self.subTest(kind=kind), self.assertRaises(C.Rejected): C.validate_reference_result(record)

    def test_assembly_keeps_conditional_record_unchanged_and_false_claims(self):
        args = assembly_fixture()
        result = C.assemble_response(*args)
        self.assertTrue(result['accepted'])
        self.assertFalse(result['referenceResult']['accepted'])
        self.assertEqual(C.canonical(result['referenceResult']), C.canonical(C.decode(args[0])['referenceResult']))
        self.assertTrue(all(v is False for v in result['claims'].values()))
        self.assertEqual(len(C.canonical(result))+1, result['execution']['outputBytes'])

    def test_assembly_rejects_missing_rss_groupclosure_late_or_false_measurements(self):
        for field, value in (('maximumSampledGroupRssBytes', None), ('maximumSampledGroupRssBytes', 0),
            ('maximumSampledGroupRssBytes', 2*1024**3), ('processesClosed', False), ('exitCode', 1),
            ('elapsedSeconds', 1801), ('elapsedSeconds', float('nan')), ('publicationComplete', False),
            ('watcherSha256', '5'*64), ('rssSampleIntervalSeconds', 2), ('logBytes', C.LOG_LIMIT+1), ('outputBytes', 1)):
            args = list(assembly_fixture()); args[3][field] = value
            with self.subTest(field=field, value=value), self.assertRaises(C.Rejected): C.assemble_response(*args)

    def test_assembly_rejects_stale_candidate_completion_and_binding_substitution(self):
        for kind in ('bytes', 'completion', 'binding', 'path', 'role'):
            args = list(assembly_fixture())
            if kind == 'bytes': args[0] += b' '
            elif kind == 'completion': args[2]['candidate']['sha256'] = '0'*64
            elif kind == 'binding': args[4][0]['sha256'] = '0'*64
            elif kind == 'path': args[4][0]['path'] = '/elsewhere/rung-8.json'
            else: args[4][0]['role'] = 'other'
            with self.subTest(kind=kind), self.assertRaises(C.Rejected): C.assemble_response(*args)

    def test_publication_is_exclusive_durable_and_private_candidate_retained(self):
        with tempfile.TemporaryDirectory() as tmp:
            tmp = Path(tmp).resolve()
            out = tmp/'result.json'
            bound = C.publish_once(out, {'accepted': False}, lambda: None)
            self.assertEqual(bound['sha256'], C.sha(out.read_bytes()))
            self.assertTrue(list(Path(tmp).glob('.response-private-*/candidate.json')))
            with self.assertRaises(C.Rejected): C.publish_once(out, {'overwrite': True}, lambda: None)
            self.assertEqual(bound['sha256'], C.sha(out.read_bytes()))

    def test_late_publication_retracts_only_owned_output(self):
        with tempfile.TemporaryDirectory() as tmp:
            tmp = Path(tmp).resolve()
            out = tmp/'result.json'
            calls = [0]
            def live():
                calls[0] += 1
                if calls[0] == 3: raise C.Rejected('synthetic late directory fsync')
            with self.assertRaisesRegex(C.Rejected, 'late'): C.publish_once(out, {'accepted': True}, live)
            self.assertFalse(out.exists())
            self.assertTrue(list(Path(tmp).glob('.response-private-*/candidate.json')))

    def test_publication_interruption_preserves_replacement_inode(self):
        with tempfile.TemporaryDirectory() as tmp:
            tmp = Path(tmp).resolve()
            out = tmp/'result.json'; calls = [0]
            def live():
                calls[0] += 1
                if calls[0] == 3:
                    out.unlink(); out.write_bytes(b'unrelated replacement')
                    raise KeyboardInterrupt('synthetic cancellation')
            with self.assertRaises(KeyboardInterrupt): C.publish_once(out, {'accepted': True}, live)
            self.assertEqual(out.read_bytes(), b'unrelated replacement')

    def test_changed_input_during_publication_cannot_admit(self):
        with tempfile.TemporaryDirectory() as tmp:
            tmp = Path(tmp).resolve()
            out = tmp/'result.json'; checks = [0]
            def recheck():
                checks[0] += 1
                if checks[0] == 2: raise C.Rejected('changed final input')
            with self.assertRaisesRegex(C.Rejected, 'changed'): C.publish_once(out, {'accepted': True}, lambda: None, recheck)
            self.assertFalse(out.exists())

    def test_tiny_budget_and_roundback_fail_before_any_timer(self):
        with patch.object(C.time, 'monotonic', return_value=1000), patch.object(C.signal, 'setitimer') as timer:
            for value in ('0', '1801', '1e-1000', '1e-100', 'nan'):
                with self.subTest(value=value), self.assertRaises(C.Rejected): C.Watch(value)
            timer.assert_not_called()

    def test_elapsed_budget_before_watch_entry_installs_no_handlers(self):
        clock = [0.0]
        with patch.object(C.time, 'monotonic', side_effect=lambda: clock[0]), patch.object(C.signal, 'setitimer') as timer, patch.object(C.signal, 'signal') as handlers:
            watch = C.Watch('1'); clock[0] = 2.0
            with self.assertRaises(C.Rejected): watch.__enter__()
            timer.assert_not_called(); handlers.assert_not_called()

    def test_interrupted_private_fsync_never_exposes_an_accepted_path(self):
        with tempfile.TemporaryDirectory() as tmp:
            tmp = Path(tmp).resolve(); out = tmp/'result.json'
            with patch.object(C.os, 'fsync', side_effect=KeyboardInterrupt('synthetic fsync interruption')):
                with self.assertRaises(KeyboardInterrupt): C.publish_once(out, {'accepted': True}, lambda: None)
            self.assertFalse(out.exists())
            self.assertTrue(list(tmp.glob('.response-private-*/candidate.json')))

    def test_watch_checks_after_handler_teardown(self):
        clock = [0.0]
        with patch.object(C.time, 'monotonic', side_effect=lambda: clock[0]), patch.object(C.signal, 'setitimer'), patch.object(C.signal, 'signal'):
            watch = C.Watch('1')
            with self.assertRaises(C.Rejected):
                with watch: clock[0] = 2.0

    def test_progress_hook_observes_without_replacing_frozen_function(self):
        def kernel(): return ('synthetic',)
        reference = types.SimpleNamespace(_root_response=kernel)
        watch = types.SimpleNamespace(state={'contributions': 0}, live=lambda: None)
        with C.contribution_progress(reference, watch):
            self.assertEqual(kernel(), ('synthetic',))
        self.assertIs(reference._root_response, kernel)
        self.assertEqual(watch.state['contributions'], 1)
        self.assertIsNone(sys.getprofile())


if __name__ == '__main__':
    unittest.main()
