#!/usr/bin/env python3
"""Explicit-use selected unchanged acceleration tests on a fresh fixture packet."""
import argparse
import importlib.util
import json
import sys
import unittest
from pathlib import Path

ROOT=Path(__file__).resolve().parents[2]
sys.path.insert(0,str(ROOT))


def known():
    class Pass(unittest.TestCase):
        def runTest(self):
            self.assertEqual(2+2,4)
    class Fail(unittest.TestCase):
        def runTest(self):
            self.assertEqual(2+2,5)
    first=unittest.TestResult();Pass().run(first)
    second=unittest.TestResult();Fail().run(second)
    assert first.wasSuccessful() and not second.wasSuccessful() and len(second.failures)==1
    print('Known unittest success/failure control passed before selected target tests.',flush=True)


def target(packet):
    spec=importlib.util.spec_from_file_location('unchanged_acceleration_tests',ROOT/'tests/test_eom_native_acceleration.py')
    module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
    cls=module.NativeAccelerationTests
    cls.packet=json.loads(packet.read_text())
    # Preserve every selected existing assertion and independent oracle; only
    # use the already rebuilt executable packet instead of rebuilding again.
    cls.setUpClass=classmethod(lambda c: None)
    cls.tearDownClass=classmethod(lambda c: None)
    suite=unittest.TestSuite(cls(name) for name in [
        'test_sharp_rows_and_totals_have_independent_oracle_parity',
        'test_rail_and_super_field_speed_cases_are_not_clamped'])
    result=unittest.TextTestRunner(verbosity=2).run(suite)
    if not result.wasSuccessful():
        raise SystemExit(1)


if __name__=='__main__':
    ap=argparse.ArgumentParser();ap.add_argument('--packet',type=Path,required=True);args=ap.parse_args()
    known();target(args.packet)
