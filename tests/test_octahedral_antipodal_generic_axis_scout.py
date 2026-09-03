import importlib.util
from pathlib import Path
import unittest


SOURCE = Path(__file__).parents[1] / "scripts/prescribed-path-analysis/oracle/scout_octahedral_antipodal_generic_axes.py"
SPEC = importlib.util.spec_from_file_location("scout_octahedral_antipodal_generic_axes", SOURCE)
SUBJECT = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(SUBJECT)


class GenericAxisScoutTests(unittest.TestCase):
    def test_antipodal_receiver_rows_are_paired(self):
        axis = SUBJECT.axis_on_edge((0, 1), 0.37)
        residuals, scale, floor = SUBJECT.nine_channels(axis, 0.63)
        self.assertEqual(len(residuals), 9)
        self.assertGreater(floor, 0)
        self.assertTrue(scale == scale)

    def test_small_grid_covers_five_edges_and_two_simplices(self):
        result = SUBJECT.scout(edge_steps=2, beta_steps=2, interior_order=2)
        self.assertEqual(len(result["edgeMinima"]), 5)
        self.assertEqual(len(result["simplexMinima"]), 2)
        self.assertTrue(all(row["best"]["minimumTransmitterFactor"] > 0 for row in result["edgeMinima"]))


if __name__ == "__main__": unittest.main()
