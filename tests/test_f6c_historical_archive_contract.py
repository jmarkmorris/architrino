"""Literal policy controls, independent of preparation output and old receipts."""
from contextlib import ExitStack
from copy import deepcopy
import hashlib
import importlib.util
from pathlib import Path
import sys
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]


def load(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


v = load('archive_contract_verifier', ROOT / 'scripts/eom/verify-f6c-parent-emission-refinement.py')
w = load('archive_contract_transport', ROOT / 'scripts/eom/verify-f6c-refined-acceleration.py')


def binding(path, raw):
    return dict(path=str(path), sha256=hashlib.sha256(raw).hexdigest(), bytes=len(raw))


class HistoricalArchiveContract(unittest.TestCase):
    def test_literal_host_exception_cannot_excuse_scientific_code(self):
        old = dict(path='/bin/ps', sha256='472992c470606d28f577590decfecd7f4a20f832fd92c671bebc6d44790b5d02', bytes=170816)
        self.assertEqual(v.validate_environment([old], ROOT, w), {'/bin/ps': old})
        for change in (dict(path='scripts/eom/oracle/certified_history.py'), dict(bytes=170817), dict(sha256='0'*64)):
            with self.assertRaises(ValueError):
                v.validate_environment([{**old, **change}], ROOT, w)
        with self.assertRaises(ValueError):
            v.validate_environment([old, old], ROOT, w)
        result = v.historical_evidence([old])
        self.assertTrue(result['retainedScientificBytesVerified'])
        self.assertTrue(result['recordedProvenanceVerified'])
        self.assertFalse(result['fullOriginalEnvironmentVerified'])
        self.assertEqual(result['unavailableHistoricalEnvironment'], [old])
        self.assertTrue(v.historical_evidence([])['fullOriginalEnvironmentVerified'])

    def test_exact_nonexecuting_route_and_forged_tuple_rejection(self):
        old = dict(path=str(ROOT/'scripts/eom/run-f6c-cached-root-cover-full.mjs'), sha256='1398a005510480d073d3882c7b9508b1cd2f91f0d7bb7ae5757b4893ed73352b', bytes=27166)
        raw = (ROOT/'reference/priorities/development-process-review/evidence/source-recovery/original-full-entry.mjs.source').read_bytes()
        self.assertEqual(hashlib.sha256(raw).hexdigest(), old['sha256'])
        self.assertEqual(len(raw),old['bytes'])
        route = dict(original=old, physical={**old, 'path':'/synthetic/entry.mjs.source'})
        before = deepcopy(route)
        self.assertEqual(v.historical_routes([route], ROOT, w)[old['path']], route)
        self.assertEqual(route, before)
        for mutate in (lambda r:r['original'].update(bytes=1), lambda r:r['original'].update(sha256='0'*64),
                       lambda r:r['physical'].update(path='/synthetic/entry.mjs'), lambda r:r.update(execute=True)):
            changed = deepcopy(route); mutate(changed)
            with self.assertRaises(ValueError): v.historical_routes([changed], ROOT, w)
        with self.assertRaises(ValueError): v.historical_routes([route, route], ROOT, w)

    def test_two_generations_keep_physical_union_and_original_identity_separate(self):
        with tempfile.TemporaryDirectory() as directory, ExitStack() as stack:
            root = Path(directory).resolve()
            current = root/'module.py'; archive = root/'module.py.source'
            current.write_bytes(b'current'); archive.write_bytes(b'old')
            old = binding(current,b'old'); physical = binding(archive,b'old')
            pool = v.Pool(stack,w,root,lambda:None)
            pool.routes={str(current):dict(original=old,physical=physical)}
            pool.read_binding(binding(current,b'current'))
            self.assertEqual(pool.historical(old),old)
            self.assertEqual(pool.historical_file(old,data=True).data,b'old')
            self.assertEqual(pool.bindings(),sorted([binding(current,b'current'),physical],key=lambda b:b['path']))
            self.assertEqual(pool.used_routes,{str(current)})
            with self.assertRaises(ValueError): pool.historical({**old,'bytes':4})
            archive.write_bytes(b'bad')
            with self.assertRaises(ValueError): pool.recheck()

    def test_missing_scientific_archive_and_unavailable_execution_fail(self):
        with tempfile.TemporaryDirectory() as directory, ExitStack() as stack:
            root=Path(directory).resolve(); pool=v.Pool(stack,w,root,lambda:None)
            with self.assertRaises(FileNotFoundError): pool.historical(binding(root/'missing',b'old'))
            old=dict(path='/bin/ps',sha256='472992c470606d28f577590decfecd7f4a20f832fd92c671bebc6d44790b5d02',bytes=170816)
            pool.unavailable=v.validate_environment([old],root,w)
            self.assertEqual(pool.historical(old),old)
            self.assertEqual(pool.bindings(),[])
            with self.assertRaises(ValueError): pool.historical_file(old,data=True)
            with self.assertRaises(ValueError): pool.historical({**old,'sha256':'0'*64})


if __name__ == '__main__': unittest.main()
