"""Run the shared synthetic root-cover controls against the cached implementation."""
import importlib.util
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]

def load(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module

CONTROLS = load("cached_cover_controls", ROOT/"tests/test_f6c_continuous_reception_root_cover.py")
CONTROLS.V = load("cached_cover_verifier", ROOT/"scripts/eom/verify-f6c-cached-continuous-reception-root-cover.py")
CONTROLS.SOURCE = ROOT/"scripts/eom/verify-f6c-cached-continuous-reception-root-cover.py"

def load_tests(loader, tests, pattern):
    return loader.loadTestsFromModule(CONTROLS)

if __name__ == "__main__":
    unittest.main()
