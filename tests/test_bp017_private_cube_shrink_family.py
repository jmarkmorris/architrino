from fractions import Fraction
import importlib.util
from pathlib import Path
import unittest


SOURCE = Path(__file__).parents[1] / "scripts/prescribed-path-analysis/oracle/verify_private_cube_shrink_family.py"
SPEC = importlib.util.spec_from_file_location("verify_private_cube_shrink_family", SOURCE)
SUBJECT = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(SUBJECT)


class PrivateCubeShrinkFamilyTests(unittest.TestCase):
    def test_exact_rational_family(self):
        for shrink in (Fraction(1, 4), Fraction(1, 2), Fraction(3, 4), Fraction(99, 100)):
            result = SUBJECT.audit(shrink)
            self.assertEqual(result["exactGeometry"]["minimumInterCellVertexAndSolidSeparation"], str(2 * (1 - shrink)))
            self.assertEqual(result["exactGeometry"]["packingFraction"], str(shrink**3))

    def test_endpoints_do_not_define_strict_private_packing(self):
        for shrink in (Fraction(0), Fraction(1), Fraction(5, 4)):
            with self.assertRaises(ValueError):
                SUBJECT.audit(shrink)


if __name__ == "__main__":
    unittest.main()
