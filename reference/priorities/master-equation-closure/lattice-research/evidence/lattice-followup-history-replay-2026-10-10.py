"""Replay the unchanged history oracle into a new receipt directory.

This is reproduction of the earlier independent audit, not a new independent
oracle. Only output placement changes; source and numerical inputs are pinned.
Run known first, inspect its PASS, then run target with the shared project venv.
"""
import argparse
import hashlib
import importlib.util
from pathlib import Path
import signal

ROOT = Path(__file__).resolve().parents[5]
SOURCE = ROOT / '.tmp/mec-008-next-event/history/audit.py'
PIN = '6122ba36703589b5d2e65f8f034d02ac0c3228c7bff3f6ba545fac871044ad69'
OUTPUT = ROOT / '.local-data/master-equation-closure/reciprocal-followup-2026-10-10/history-replay'


def deadline(signum, frame):
    raise TimeoutError('Bounded archive audit exceeded its 60-second cap')


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('mode', choices=['known', 'target'])
    args = parser.parse_args()
    assert hashlib.sha256(SOURCE.read_bytes()).hexdigest() == PIN
    spec = importlib.util.spec_from_file_location('unchanged_next_event_audit', SOURCE)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    assert module.ROOT == ROOT
    module.OUT = OUTPUT
    signal.signal(signal.SIGALRM, deadline)
    signal.alarm(60)
    try:
        module.known() if args.mode == 'known' else module.target()
    finally:
        signal.alarm(0)


if __name__ == '__main__':
    main()
