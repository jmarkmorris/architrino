"""Independent synthetic controls only: no actual handoff producer or evidence.

Expected bit records use host IEEE operations and a separately written scalar
interval control. The reference itself uses only Fraction/integer arithmetic.
Full-census fixtures are plumbing, never accepted production receipts.
"""
import copy
from contextlib import ExitStack
from decimal import Decimal as D
from fractions import Fraction as F
from hashlib import sha256
import importlib.util
import json
import math
from pathlib import Path
import random
import signal
import struct
import tempfile
import unittest
from unittest.mock import patch

SOURCE = Path(__file__).resolve().parents[1]/'scripts/eom/verify-f5-prehistory-handoff.py'
spec = importlib.util.spec_from_file_location('f5_handoff_reference', SOURCE)
ref = importlib.util.module_from_spec(spec)
spec.loader.exec_module(ref)


def bits(value):
    return struct.pack('>d', float(value)).hex()


def rat(value):
    value = F(value)
    return {'numerator': str(value.numerator), 'denominator': str(value.denominator)}


class HostBox:
    """Independent IEEE control evaluated with actual host float operations."""
    def __init__(self, lo, hi=None):
        self.lo, self.hi = float(lo), float(lo if hi is None else hi)

    @classmethod
    def token(cls, token):
        f = float(token)
        return cls(math.nextafter(f, -math.inf), math.nextafter(f, math.inf))

    def __add__(self, other):
        return HostBox(math.nextafter(self.lo+other.lo, -math.inf), math.nextafter(self.hi+other.hi, math.inf))

    def __sub__(self, other):
        return HostBox(math.nextafter(self.lo-other.hi, -math.inf), math.nextafter(self.hi-other.lo, math.inf))

    def __mul__(self, other):
        values = [a*b for a in (self.lo, self.hi) for b in (other.lo, other.hi)]
        return HostBox(math.nextafter(min(values), -math.inf), math.nextafter(max(values), math.inf))

    def inflate(self, radius):
        return HostBox(math.nextafter(self.lo-radius, -math.inf), math.nextafter(self.hi+radius, math.inf))

    def overlap(self, other):
        return HostBox(max(self.lo, other.lo), min(self.hi, other.hi))

    def record(self):
        return {'lowerBits': bits(self.lo), 'upperBits': bits(self.hi)}


def host_state(s, axis, time):
    local = HostBox(time)-HostBox.token(s['tStart'])
    coeff = [HostBox.token(t) for t in s['coefficients'][axis]]
    q = coeff[0]+local*(coeff[1]+local*(coeff[2]+local*coeff[3]))
    v = coeff[1]+local*(HostBox(2)*coeff[2]+local*(HostBox(3)*coeff[3]))
    return q, q.inflate(float(s['positionErrors'][axis])), v.inflate(float(s['velocityErrors'][axis]))


def host_release(segments):
    a, b = segments[-2:]
    raw, endpoint = {'position': [], 'velocity': []}, {'position': [], 'velocity': []}
    for axis in range(3):
        q, x, v = host_state(b, axis, 0)
        join = float(a['tEnd'])
        _, left, _ = host_state(a, axis, join)
        qj, right, _ = host_state(b, axis, join)
        transported = (left.overlap(right)+(q-qj)).inflate(float(b['velocityErrors'][axis])*abs(0.0-join))
        raw['position'].append(x.record()); raw['velocity'].append(v.record())
        endpoint['position'].append(x.overlap(transported).record()); endpoint['velocity'].append(v.record())
    return raw, endpoint


def host_parsed(s):
    return {'tStart': bits(s['tStart']), 'tEnd': bits(s['tEnd']),
            'coefficients': [[bits(t) for t in row] for row in s['coefficients']],
            'positionErrors': [bits(t) for t in s['positionErrors']],
            'velocityErrors': [bits(t) for t in s['velocityErrors']]}


def independent_fnv(segments):
    pieces = ['eom_history_segment_chain/v1']
    for s in segments:
        pieces += [s['tStart'], s['tEnd']]+sum(s['coefficients'], [])+s['positionErrors']+s['velocityErrors']
    stream = b''.join(str(len(t.encode())).encode()+b':'+t.encode() for t in pieces)
    h = 0xcbf29ce484222325
    for byte in stream:
        h ^= byte
        h = (h*0x100000001b3) % (2**64)
    return 'fnv1a64-chain-v1:'+h.to_bytes(8, 'big').hex()


def fixture():
    """Twelve artificial stationary paths; full census is test plumbing only."""
    members, release = [], []
    for mi in range(12):
        polarity = 'positive' if mi < 6 else 'negative'
        axis, ring = (mi % 6)//2+1, mi % 2+1
        worldline = f'f5-axis-{axis}-ring-{ring}-{polarity}-worldline'
        segments = []
        for j in range(51):
            a = str(D(-1)+D(j)/D(64))
            b = '0' if j == 50 else str(D(-1)+D(j+1)/D(64))
            segments.append({'index': j, 'tStart': a, 'tEnd': b,
                             'coefficients': [[str(mi), '0', '0', '0'], ['0']*4, ['0']*4],
                             'positionErrors': ['0.0625']*3, 'velocityErrors': ['0.0625']*3})
        member = {'index': mi, 'constituentId': worldline.replace('-worldline', '-architrino'),
                  'worldlineId': worldline, 'polarity': 1 if mi < 6 else -1,
                  'originalHistory': {'historyId': 'original/'+worldline,
                                      'historyFingerprint': 'fnv1a64-chain-v1:0000000000000000'}, 'segments': segments}
        members.append(member)
        release.append({'index': mi, 'worldlineId': worldline, 'time': '0', 'axes': [
            {'axis': k, 'nominalPosition': rat(mi if k == 0 else 0), 'nominalDerivative': rat(0),
             'analyticPositionEnclosure': [rat((mi if k == 0 else 0)-F(1,64)), rat((mi if k == 0 else 0)+F(1,64))],
             'analyticVelocityEnclosure': [rat(-F(1,64)), rat(F(1,64))]} for k in range(3)]})
    prefix = {'schema': 'braid-program/f5-prehistory-restriction.v1', 'normalizedFieldSpeed': '1',
              'retainedInterval': ['-1','0'], 'releaseTime': '0', 'members': members}
    receipt = {'schema': 'braid-program/f5-prehistory-restriction-conformance.v1', 'accepted': True,
               'prefix': {'sha256': ref.PREFIX_SHA}, 'originalFullManifest': {'sha256': ref.FULL_SHA},
               'nominalConformance': {'sha256': ref.NOMINAL_SHA}, 'apiConformance': {'sha256': ref.API_SHA},
               'claims': {'nominalContainmentInherited': True, 'apiDomainContainmentInherited': True},
               'inheritedConstantInterpretations': ['source-decimal','frozen-binary64'], 'release': release}
    bindings = {role: {'path': '/synthetic-unexecuted/'+role, 'sha256': 'a'*64, 'bytes': 12}
                for role in ('source','buildReceipt','executable')}
    handoff = {'schema': ref.HANDOFF_SCHEMA, 'status': 'data-only-history-handoff',
               'prefixSha256': ref.PREFIX_SHA, 'restrictionReceiptSha256': ref.RESTRICTION_SHA,
               'sourceOwners': ref.SOURCE_OWNERS.copy(), 'producerBindings': bindings,
               'runtimePremises': list(ref.RUNTIME_PREMISES), 'normalizedFieldSpeed': '1',
               'retainedInterval': ['-1','0'], 'releaseTime': '0', 'claims': ref.FALSE_CLAIMS.copy(), 'members': []}
    for m in members:
        got = copy.deepcopy(m)
        got['restrictedHistoryId'] = 'f5-prehistory/v1/'+m['worldlineId']
        got['historyFingerprint'] = independent_fnv(m['segments'])
        for s in got['segments']:
            s['parsedBinary64'] = host_parsed(s)
        raw, endpoint = host_release(m['segments'])
        got['release'] = {'nominalPosition': [rat(m['index']), rat(0), rat(0)],
                          'nominalDerivative': [rat(0)]*3, 'rawFinalPiece': raw, 'endpointState': endpoint}
        handoff['members'].append(got)
    return prefix, receipt, handoff, bindings


class ArithmeticControls(unittest.TestCase):
    def test_binary64_known_values_and_signed_zero(self):
        for token, word in [('0','0000000000000000'),('-0','8000000000000000'),
                            ('1','3ff0000000000000'),('-1','bff0000000000000'),('0.1','3fb999999999999a')]:
            self.assertEqual(ref.token_bits(token), word)
            self.assertEqual(ref.decode_bits(word), F(float(token)))

    def test_ties_even_subnormal_and_normal_boundary(self):
        unit = F(1,2**1074)
        cases = [(unit/2, 0), (3*unit/2, 2), (5*unit/2, 2),
                 (F(1)+F(1,2**53), 0x3ff0000000000000),
                 (F(1)+F(3,2**53), 0x3ff0000000000002),
                 (F(1,2**1022)-unit/2, 0x0010000000000000)]
        for value, expected in cases:
            self.assertEqual(ref.nearest_bits(value), f'{expected:016x}')
            self.assertEqual(ref.nearest_bits(-value), bits(-float(value)))

    def test_zero_release_endpoint_bits_remain_unresolved(self):
        # Independent IEEE counterexample: the mathematical zero loses its sign
        # when represented as Fraction, so neither signed zero may be certified.
        signed_zero = math.nextafter(-math.ulp(0.0), math.inf)
        self.assertEqual(bits(signed_zero), '8000000000000000')
        self.assertEqual(F(signed_zero), F(0))
        self.assertEqual(ref.token_bits('-0'), '8000000000000000')
        for box in ((F(-1), F(signed_zero)), (F(0), F(1)), (F(0), F(0))):
            with self.subTest(box=box):
                with self.assertRaisesRegex(ref.ProofError, 'zero release-box endpoint.*unresolved'):
                    ref.box_record(box)

    def test_exact_rounding_against_independent_host_300_values(self):
        rng = random.Random(401)
        for _ in range(300):
            value = F(rng.randrange(-10**18,10**18),rng.randrange(1,10**18))*F(2)**rng.randrange(-1050,900)
            self.assertEqual(ref.nearest_bits(value), bits(float(value)))

    def test_nonfinite_words_tokens_and_overflow_reject(self):
        for word in ('7ff0000000000000','fff0000000000000','7ff8000000000001','ABC','3FF0000000000000'):
            with self.assertRaises(ref.ProofError): ref.decode_bits(word)
        for token in ('NaN','Infinity','1e10000',1.0):
            with self.assertRaises(ref.ProofError): ref.exact(token)
        with self.assertRaises(ref.ProofError): ref.nearest_bits(F(2)**1024)

    def test_exact_shifted_rational_release(self):
        # q(u)=1/8 + 2u - 3u^2 +4u^3 at u=1/4.
        s={'tStart':'-0.25','coefficients':[['0.125','2','-3','4']]*3}
        self.assertEqual(ref.nominal(s,0,F(0)),(F(1,2),F(5,4)))
        self.assertEqual(ref.nominal(s,2,F(-1,4)),(F(1,8),F(2)))

    def test_correlated_release_against_separate_host_control(self):
        p,_,_,_=fixture();segments=p['members'][2]['segments']
        self.assertEqual(ref.release_boxes(segments),host_release(segments))

    def test_nonconstant_shifted_cubic_binary_operations(self):
        # The global exact curve is x(t)=1+t/8+t^2/16-t^3/32.
        segments=[]
        for j,(a,b) in enumerate((('-0.5','-0.25'),('-0.25','0'))):
            origin=F(a)
            coefficients=[F(1)+origin/8+origin**2/16-origin**3/32,
                          F(1,8)+origin/8-3*origin**2/32,
                          F(1,16)-3*origin/32,F(-1,32)]
            tokens=[str(D(v.numerator)/D(v.denominator)) for v in coefficients]
            segments.append({'index':j,'tStart':a,'tEnd':b,'coefficients':[tokens]*3,
                             'positionErrors':['0.03125']*3,'velocityErrors':['0.03125']*3})
        self.assertEqual(ref.nominal(segments[-1],0,F(0)),(F(1),F(1,8)))
        self.assertEqual(ref.release_boxes(segments),host_release(segments))

    def test_token_fingerprint_preserves_format_and_endpoint(self):
        p,_,_,_=fixture();s=p['members'][0]['segments']
        self.assertEqual(ref.fingerprint(s),independent_fnv(s))
        other=copy.deepcopy(s);other[0]['coefficients'][0][0]='0.0'
        self.assertNotEqual(ref.fingerprint(s),ref.fingerprint(other))
        other=copy.deepcopy(s);other[-1]['tEnd']='0.0'
        self.assertNotEqual(ref.fingerprint(s),ref.fingerprint(other))


class DataControls(unittest.TestCase):
    @classmethod
    def setUpClass(cls): cls.base=fixture()
    def setUp(self): self.data=copy.deepcopy(self.base)
    def fails(self):
        with self.assertRaises((ref.ProofError,KeyError,TypeError)):
            ref.analyze_data(*self.data)

    def test_synthetic_full_census_plumbing_not_actual_evidence(self):
        result=ref.analyze_data(*self.data)
        self.assertFalse(result['accepted']);self.assertTrue(result['dataChecksPassed'])
        self.assertEqual(result['segments'],612);self.assertEqual(result['analyticInterpretationBoxComparisons'],288)

    def test_wrong_coefficient_lexeme(self):
        self.data[2]['members'][0]['segments'][0]['coefficients'][0][0]='0.0';self.fails()

    def test_wrong_origin(self):
        self.data[2]['members'][0]['segments'][50]['tStart']='-0.2';self.fails()

    def test_zero_error_substitution(self):
        self.data[2]['members'][0]['segments'][0]['positionErrors'][0]='0';self.fails()

    def test_incomplete_census(self):
        for field in ('members','segments'):
            data=copy.deepcopy(self.base)
            if field=='members':data[2]['members'].pop()
            else:data[2]['members'][0]['segments'].pop()
            with self.assertRaises(ref.ProofError):ref.analyze_data(*data)

    def test_wrong_identity_and_polarity(self):
        self.data[2]['members'][0]['worldlineId']='another';self.fails()
        self.data=copy.deepcopy(self.base);self.data[2]['members'][0]['polarity']=True;self.fails()

    def test_copied_original_fingerprint(self):
        m=self.data[2]['members'][0];m['historyFingerprint']=m['originalHistory']['historyFingerprint'];self.fails()

    def test_wrong_restricted_identity(self):
        m=self.data[2]['members'][0];m['restrictedHistoryId']=m['originalHistory']['historyId'];self.fails()

    def test_wrong_coefficient_bit(self):
        self.data[2]['members'][0]['segments'][0]['parsedBinary64']['coefficients'][0][0]='0000000000000001';self.fails()

    def test_wrong_error_and_endpoint_bits(self):
        for field in ('positionErrors','tEnd'):
            data=copy.deepcopy(self.base);parsed=data[2]['members'][0]['segments'][0]['parsedBinary64']
            if field=='tEnd':parsed[field]='0000000000000000'
            else:parsed[field][0]='0000000000000000'
            with self.assertRaises(ref.ProofError):ref.analyze_data(*data)

    def test_nominal_midpoint_box_substitution(self):
        self.data[2]['members'][0]['release']['endpointState']['position'][0]={'lowerBits':bits(0),'upperBits':bits(0)};self.fails()

    def test_incorrect_exact_release(self):
        self.data[2]['members'][0]['release']['nominalDerivative'][1]=rat(1);self.fails()

    def test_shared_analytic_bound_failure_records_both_interpretations(self):
        self.data[1]['release'][0]['axes'][0]['analyticPositionEnclosure']=[rat(-1),rat(1)]
        result=ref.analyze_data(*self.data)
        self.assertFalse(result['dataChecksPassed']);self.assertEqual(len(result['failures']),4)
        self.assertEqual({x['constantInterpretation'] for x in result['failures']},set(('source-decimal','frozen-binary64')))
        self.assertTrue(all('not proof of analytic escape' in x['meaning'] for x in result['failures']))

    def test_real_join_narrowing_must_not_be_replaced_with_raw_box(self):
        prefix,receipt,handoff,_=self.data
        source=prefix['members'][0]['segments']
        source[-2]['positionErrors']=['0.0009765625']*3
        source[-1]['velocityErrors']=['0.0009765625']*3
        member=handoff['members'][0]
        member['segments']=copy.deepcopy(source)
        for s in member['segments']:s['parsedBinary64']=host_parsed(s)
        member['historyFingerprint']=independent_fnv(source)
        raw,endpoint=host_release(source)
        self.assertNotEqual(raw['position'],endpoint['position'])
        member['release']['rawFinalPiece']=raw;member['release']['endpointState']=endpoint
        # Velocity is independently known exactly for these synthetic paths.
        for axis in receipt['release'][0]['axes']:axis['analyticVelocityEnclosure']=[rat(0),rat(0)]
        result=ref.analyze_data(*self.data)
        self.assertEqual(len(result['failures']),6)
        self.assertTrue(all(x['box']=='endpointState' and x['kind']=='position' for x in result['failures']))
        member['release']['endpointState']=copy.deepcopy(raw)
        self.fails()

    def test_missing_interpretation_rejects(self):
        self.data[1]['inheritedConstantInterpretations'].pop();self.fails()

    def test_bound_source_and_claim_changes_reject(self):
        self.data[2]['sourceOwners']={};self.fails()
        self.data=copy.deepcopy(self.base);self.data[2]['claims']['couplingChosen']=True;self.fails()

    def test_producer_binding_mismatch_rejects(self):
        self.data[2]['producerBindings']=copy.deepcopy(self.data[3]);self.data[2]['producerBindings']['executable']['sha256']='b'*64;self.fails()

    def test_duplicate_and_floating_json_reject(self):
        for value in (b'{"a":1,"a":2}',b'{"a":NaN}',b'{"a":0.1}'):
            with self.assertRaises(ref.ProofError):ref.parse_json(value)


class CapturePublicationControls(unittest.TestCase):
    def test_bound_file_change_and_hash_mismatch(self):
        with tempfile.TemporaryDirectory() as tmp:
            p=Path(tmp)/'source';p.write_bytes(b'original')
            with self.assertRaises(ref.ProofError):
                with ref.BoundFile(p,'0'*64):pass
            with ref.BoundFile(p,sha256(b'original').hexdigest()) as bound:
                p.write_bytes(b'mutated!')
                with self.assertRaises(ref.ProofError):bound.recheck()

    def test_bound_file_path_replacement(self):
        with tempfile.TemporaryDirectory() as tmp:
            p=Path(tmp)/'source';p.write_bytes(b'original')
            with ref.BoundFile(p,sha256(b'original').hexdigest()) as bound:
                q=Path(tmp)/'new';q.write_bytes(b'original');q.replace(p)
                with self.assertRaises(ref.ProofError):bound.recheck()

    def test_symlink_and_oversize_rejected(self):
        with tempfile.TemporaryDirectory() as tmp:
            p=Path(tmp)/'source';p.write_bytes(b'original');q=Path(tmp)/'link';q.symlink_to(p)
            for target,limit in ((q,99),(p,1)):
                with self.assertRaises((OSError,ref.ProofError)):
                    with ref.BoundFile(target,sha256(b'original').hexdigest(),limit):pass

    def test_publication_never_overwrites_existing_output(self):
        with tempfile.TemporaryDirectory() as tmp:
            p=Path(tmp)/'out';p.write_bytes(b'existing')
            with ref.Watch() as watch:
                with self.assertRaises(ref.ProofError):ref.Publication(p,{'accepted':True},watch)
            self.assertEqual(p.read_bytes(),b'existing')

    def timed_publication(self,mode):
        with tempfile.TemporaryDirectory() as tmp:
            out=Path(tmp)/'out';clock=[0.0];write=ref.write_exclusive;restore=ref.signal.signal
            def delayed_write(path,packet):
                result=write(path,packet)
                if Path(path).name=='candidate.json' and mode=='write':clock[0]=1801
                if Path(path).name=='candidate.json' and mode=='interrupt':raise KeyboardInterrupt('synthetic interruption')
                return result
            calls=[0]
            def delayed_restore(*args):
                calls[0]+=1
                value=restore(*args)
                if mode=='teardown' and calls[0]==2:clock[0]=1801
                return value
            with patch.object(ref.time,'monotonic',side_effect=lambda:clock[0]),patch.object(ref,'write_exclusive',side_effect=delayed_write),patch.object(ref.signal,'signal',side_effect=delayed_restore):
                with self.assertRaises((ref.ProofError,KeyboardInterrupt)):
                    with ref.Watch() as watch:
                        with ExitStack() as cleanup:
                            if mode=='cleanup':cleanup.callback(lambda:clock.__setitem__(0,1801))
                            publication=ref.Publication(out,{'accepted':True,'dataConformanceEstablished':True,
                                'inheritedAnalyticReleaseEnclosed':True,'failures':[],'claims':{}},watch)
                            publication.publish()
            rejection=json.loads(out.read_bytes())
            self.assertFalse(rejection['accepted'])
            self.assertFalse(rejection['dataConformanceEstablished'])
            self.assertFalse(rejection['inheritedAnalyticReleaseEnclosed'])
            self.assertTrue((publication.directory/'candidate.json').exists())
            self.assertTrue((publication.directory/'rejection.json').exists())

    def test_slow_final_write_rejects(self):self.timed_publication('write')
    def test_interruption_rejects(self):self.timed_publication('interrupt')
    def test_late_input_cleanup_rejects(self):self.timed_publication('cleanup')
    def test_late_watchdog_teardown_rejects(self):self.timed_publication('teardown')

    def test_watch_deadline(self):
        with patch.object(ref.time,'monotonic',side_effect=[0.0,1801.0]):
            with self.assertRaises(ref.ProofError):
                with ref.Watch() as watch:watch.check()


if __name__=='__main__':unittest.main()
