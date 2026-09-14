"""Input and domain checks without running certificate campaigns."""
import importlib.util
import json
from pathlib import Path
import sys
import tempfile
import unittest
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
DIRECTORY = ROOT / "scripts/equation-mapping"


def load(name, directory=DIRECTORY):
    spec = importlib.util.spec_from_file_location(name, directory / (name + ".py"))
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


class CalculationReached(RuntimeError):
    pass


class CertificateInputLoadingTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.base = load("certify_planar_three_binary_unequal_radius_box")
        cls.coupled = load("certify_planar_three_binary_coupled_box")
        cls.phase = load("certify_planar_three_binary_phase_box")
        cls.ladder = load("certify_planar_three_binary_equal_radius_ladder")
        cls.jacobian = load("diagnose_planar_three_binary_unequal_radius_jacobian")

    def test_phase_starts_numerics_without_source_or_document_bytes(self):
        with patch.object(Path, "read_bytes", side_effect=AssertionError("unexpected source read")), \
             patch.object(self.phase, "root_chart_for_box", side_effect=CalculationReached):
            with self.assertRaises(CalculationReached):
                self.phase.calculate()

    def test_ladder_checks_mathematical_domain_without_document_bytes(self):
        with patch.object(Path, "read_bytes", side_effect=AssertionError("unexpected source read")):
            with self.assertRaisesRegex(self.ladder.CertificateFailure, "topology range"):
                self.ladder.calculate(-1, 0)

    def test_reformatted_configuration_reaches_semantic_validation(self):
        original = json.loads(self.base.SOURCE.read_text())
        with tempfile.TemporaryDirectory() as folder:
            source = Path(folder) / "configuration.json"
            source.write_text(json.dumps(original, indent=4) + "\n\n")
            for module in (self.base, self.coupled):
                with self.subTest(module=module.__name__), \
                     patch.object(self.base, "SOURCE", source), \
                     patch.object(self.base, "validate_source", side_effect=CalculationReached) as validate:
                    with self.assertRaises(CalculationReached):
                        module.calculate()
                    validate.assert_called_once_with(original)

    def test_configuration_still_requires_the_mathematical_root_count(self):
        source = json.loads(self.base.SOURCE.read_text())
        source["geometry"]["balanceParameters"]["directedRootCount"] = 71
        with self.assertRaisesRegex(self.base.CertificateFailure, "directed-root count"):
            self.base.validate_source(source)

    def test_jacobian_reformatted_configuration_reaches_calculation(self):
        with tempfile.TemporaryDirectory() as folder:
            source = Path(folder) / "configuration.json"
            source.write_text(self.jacobian.SOURCE.read_text() + "\n")
            with patch.object(self.jacobian, "SOURCE", source), \
                 patch.object(self.jacobian, "compatibility_residual", side_effect=CalculationReached):
                with self.assertRaises(CalculationReached):
                    self.jacobian.calculate()

    def test_orthogonal_protocols_do_not_open_source_or_document_files(self):
        directory = ROOT / "scripts/prescribed-path-analysis/oracle"
        for name in ("orthogonal_plane_weave_interval_oracle", "orthogonal_plane_weave_fold_limit_certificate"):
            module = load(name, directory)
            packet = json.loads(module.DEFAULT_PROTOCOL.read_text())
            read = Path.read_bytes

            def only_data(path):
                self.assertEqual(path.suffix, ".json")
                return read(path)

            with self.subTest(module=name), patch.object(Path, "read_bytes", only_data):
                module.validate_protocol(packet, module.DEFAULT_PROTOCOL.resolve())
            packet["domain"]["fieldSpeed"] = "2"
            with self.assertRaises(ValueError):
                module.validate_protocol(packet, module.DEFAULT_PROTOCOL.resolve())


if __name__ == "__main__":
    unittest.main()
