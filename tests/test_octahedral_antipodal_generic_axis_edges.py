import sys
from pathlib import Path
import unittest


ORACLE_DIRECTORY = (
    Path(__file__).parents[1] / "scripts/prescribed-path-analysis/oracle"
)
sys.path.insert(0, str(ORACLE_DIRECTORY))
import certify_octahedral_antipodal_generic_axis_edges as subject  # noqa: E402


class GenericAxisEdgeCertificateTests(unittest.TestCase):
    def test_declared_edges_and_directed_owners_are_complete(self):
        self.assertEqual(
            subject.EDGES,
            ((0, 1), (1, 2), (2, 0), (2, 3), (3, 0)),
        )
        owners = {
            (receiver, transmitter)
            for receiver in range(6)
            for transmitter in range(6)
            if receiver != transmitter
        }
        self.assertEqual(len(owners), 30)

        for edge_index, edge in enumerate(subject.EDGES):
            axis = subject.axis_interval(
                edge, subject.mp.mpf("0"), subject.mp.mpf("0.01")
            )
            enclosed = set()
            for receiver, transmitter in sorted(owners):
                root, factor, _ = subject.enclose_root(
                    edge,
                    axis,
                    subject.mp.mpf("0"),
                    subject.mp.mpf("0.01"),
                    subject.mp.mpf("0.2"),
                    subject.mp.mpf("0.21"),
                    receiver,
                    transmitter,
                )
                self.assertGreater(subject.lower(root), 0)
                self.assertGreater(subject.lower(factor), 0)
                enclosed.add((receiver, transmitter))
            self.assertEqual(enclosed, owners, f"edge {edge_index}")

    def test_outward_axis_hulls_and_nine_row_sign_rejections(self):
        for edge_index, edge in enumerate(subject.EDGES):
            t_lo = subject.mp.mpf("0.31")
            t_hi = subject.mp.mpf("0.32")
            axis_hull = subject.axis_interval(edge, t_lo, t_hi)
            for t in (t_lo, (t_lo + t_hi) / 2, t_hi):
                axis = subject.axis_point(edge, t)
                for component, enclosure in zip(axis, axis_hull):
                    self.assertLessEqual(subject.lower(enclosure), component)
                    self.assertGreaterEqual(subject.upper(enclosure), component)

            residuals, excluded, factor, _ = subject.evaluate_box(
                edge_index,
                t_lo,
                t_hi,
                subject.mp.mpf("0.2"),
                subject.mp.mpf("0.21"),
                0,
            )
            self.assertEqual(len(residuals), 9)
            self.assertIsNotNone(excluded)
            self.assertGreater(factor, 0)
            obstruction = residuals[excluded]
            self.assertTrue(
                subject.upper(obstruction) < 0 or subject.lower(obstruction) > 0
            )


if __name__ == "__main__":
    unittest.main()
