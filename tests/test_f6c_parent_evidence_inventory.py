"""Pure transport controls using the independently frozen 2/10 known answer."""
import copy
import hashlib
import importlib.util
import json
from pathlib import Path
import sys
import unittest

ROOT = Path(__file__).resolve().parents[1]
FIXTURE = ROOT / '.local-data/braid-analysis/f6c-whole-history-20260828/numerical-review/independent-generic-inventory-known-answer.json'
FIXTURE_SHA = '41e3bdbd07e4551ea0b8afa4c26eff2f52a938a7f5430e228648a94e0aaaf1cd'


def load(name, path):
    spec = importlib.util.spec_from_file_location(name, ROOT / path)
    module = importlib.util.module_from_spec(spec); sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


I = load('inventory_subject', 'scripts/eom/f6c_parent_evidence_inventory.py')
P = load('inventory_package', 'scripts/eom/f6c_evidence_package.py')


class InventoryTests(unittest.TestCase):
    def setUp(self):
        raw = FIXTURE.read_bytes()
        self.assertEqual(hashlib.sha256(raw).hexdigest(), FIXTURE_SHA)
        self.f = json.loads(raw)
        self.raw = self.f['inventoryRaw'].encode()
        self.binding = self.f['inventoryBinding']
        self.closures = tuple(dict(x, raw=x['raw'].encode()) for x in self.f['admittedClosures'])
        self.authority = tuple(self.f['expectedAuthority'])

    def parse(self, raw=None, closures=None, authority=None):
        raw = self.raw if raw is None else raw
        bound = dict(self.binding, bytes=len(raw), sha256=hashlib.sha256(raw).hexdigest())
        return I.parse_inventory(raw, bound, P, admitted_closures=self.closures if closures is None else closures,
                                 expected_authority=self.authority if authority is None else authority)

    def test_independent_exact_members_and_framing(self):
        members = self.parse()
        self.assertEqual([m.name for m in members], self.f['expectedMemberNames'])
        _, index, raw = P._members(members)
        self.assertEqual(index, self.f['expectedPackageIndex'])
        self.assertEqual((raw+b'\n').decode(), self.f['expectedPackageIndexRaw'])
        payloads = self.f['payloads']
        self.assertEqual(len(members), 25)
        self.assertEqual(index['payloadBytes'], 796)
        self.assertEqual(len(raw)+1, 7176)
        self.assertEqual(len(P.MAGIC)+len(raw)+1+796+len(P.FOOTER), 8025)

    def test_inert_only_no_file_access(self):
        # No synthetic physical source exists. The parser must not try IO.
        self.assertTrue(all(not Path(m.source_path).exists() for m in self.parse()))

    def test_no_default_authority(self):
        for a in ((), [], (dict(self.authority[0], sha256='0'*64),)):
            with self.subTest(authority=a), self.assertRaises(ValueError): self.parse(authority=a)

    def test_bad_raw_and_noncanonical(self):
        for raw in (self.raw+b'\n', self.raw[:-1], b' '+self.raw, self.raw.replace(b'"scope":', b'"scope":null,"scope":', 1)):
            with self.subTest(raw=raw[:80]), self.assertRaises(ValueError): self.parse(raw)
        with self.assertRaises(ValueError):
            I.parse_inventory(self.raw, dict(self.binding, sha256='0'*64), P, admitted_closures=self.closures, expected_authority=self.authority)

    def test_inventory_mutations(self):
        mutations = [
            lambda v: v.update(extra=None),
            lambda v: v['parents'].reverse(),
            lambda v: v['parents'][0].update(parentIndex=0),
            lambda v: v['parents'][0]['reception'].update(lower='0.00'),
            lambda v: v['parents'][0]['roles'].pop('rows'),
            lambda v: v['parents'][0]['roles'].update(rows='missing'),
            lambda v: v['objects'].reverse(),
            lambda v: v['objects'].append(copy.deepcopy(v['objects'][0])),
            lambda v: v['objects'][0]['identity'].update(bytes='01'),
            lambda v: v['objects'][1].update(physicalPath=v['objects'][0]['physicalPath']),
            lambda v: v['objects'][1]['identity'].update(inode=v['objects'][0]['identity']['inode']),
            lambda v: v['objects'][0]['original'].update(path='/arbitrary.md'),
            lambda v: v['totals'].update(indexBytes=v['totals']['indexBytes']-1),
            lambda v: v['refinementSettings'].update(lowerQueriesPerPair=True),
            lambda v: v['numericalSettings'].update(step='0.001'),
            lambda v: v['independentAcceptances'].clear(),
        ]
        for mutate in mutations:
            v=copy.deepcopy(self.f['inventory']); mutate(v)
            with self.subTest(mutation=mutate), self.assertRaises(ValueError): self.parse(I.canonical(v))

    def test_external_closure_mutations(self):
        for field, value in (('exitCode',1), ('processesClosed',False), ('finalCaller',None), ('authority','historical-attribution')):
            rows=copy.deepcopy(self.closures); row=rows[0]; v=json.loads(row['raw']); v['closure'][field]=value
            row['raw']=I.canonical(v)
            # Rebinding only this external snapshot still cannot silently change
            # the inventory's separately pinned snapshot reference.
            row['binding']=dict(row['binding'], bytes=len(row['raw']), sha256=hashlib.sha256(row['raw']).hexdigest())
            with self.subTest(field=field), self.assertRaises(ValueError): self.parse(closures=rows)
        with self.assertRaises(ValueError): self.parse(closures=self.closures+self.closures)


if __name__ == '__main__': unittest.main()
