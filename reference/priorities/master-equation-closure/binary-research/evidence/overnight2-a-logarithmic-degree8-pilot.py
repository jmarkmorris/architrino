#!/usr/bin/env python
"""Degree-eight formal reference pilot; no enclosure and no physical evolution."""
import hashlib
import importlib.util
import json
from pathlib import Path
import sys
import time

HERE = Path(__file__).resolve()
ENGINE = HERE.with_name('overnight2-a-logarithmic-formal-manifold.py')
spec = importlib.util.spec_from_file_location('frozen_log_manifold_degree8', ENGINE)
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)
m.N = 8
m.LIMIT = 300
WRAPPER_HASH = hashlib.sha256(HERE.read_bytes()).hexdigest()
ENGINE_HASH = hashlib.sha256(ENGINE.read_bytes()).hexdigest()
old_budget = m.budget
old_write = m.write_receipt
last = time.monotonic()
operations = 0


def budget():
    global last, operations
    operations += 1
    old_budget()
    now = time.monotonic()
    if now-last >= 15:
        print(json.dumps({'heartbeat': True, 'polynomial_multiplications': operations,
                          'wall_seconds': now-m.START, 'degree': m.N}), flush=True)
        last = now


def write_receipt(path, data):
    data.update(wrapper_sha256=WRAPPER_HASH, engine_sha256=ENGINE_HASH,
                polynomial_multiplications=operations,
                limitation='Floating formal coefficients only; no tail bound or physical fate.')
    target = Path(path)
    if target.exists():
        raise RuntimeError('refuse overwrite of retained receipt')
    old_write(path, data)


m.budget = budget
m.write_receipt = write_receipt
if '--known-receipt' in sys.argv:
    known = Path(sys.argv[sys.argv.index('--known-receipt')+1])
    receipt = json.loads(known.read_text())
    if not (receipt.get('wrapper_sha256') == WRAPPER_HASH
            and receipt.get('engine_sha256') == ENGINE_HASH
            and receipt.get('degree') == 8
            and receipt.get('controls', {}).get('passed') is True):
        raise RuntimeError('known receipt does not admit this exact degree-eight wrapper and engine')
m.main()
