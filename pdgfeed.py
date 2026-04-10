#!/usr/bin/env python3
"""Compatibility shim for the PDG feed CLI and module imports.

The implementation lives in scripts/pdg/pdgfeed.py.
"""

from __future__ import annotations

import importlib.util
import sys
from pathlib import Path


_IMPL_PATH = Path(__file__).resolve().parent / "scripts" / "pdg" / "pdgfeed.py"
_IMPL_MODULE_NAME = "pdgfeed" if __name__ != "__main__" else "_architrino_pdgfeed_impl"
_SPEC = importlib.util.spec_from_file_location(_IMPL_MODULE_NAME, _IMPL_PATH)
if _SPEC is None or _SPEC.loader is None:
    raise ImportError(f"Unable to load pdgfeed implementation from {_IMPL_PATH}")

_MODULE = importlib.util.module_from_spec(_SPEC)
sys.modules[_SPEC.name] = _MODULE
_SPEC.loader.exec_module(_MODULE)

if __name__ != "__main__":
    sys.modules[__name__] = _MODULE

__all__ = [name for name in dir(_MODULE) if not name.startswith("__")]
globals().update({name: getattr(_MODULE, name) for name in __all__})


if __name__ == "__main__":
    raise SystemExit(_MODULE.main())
