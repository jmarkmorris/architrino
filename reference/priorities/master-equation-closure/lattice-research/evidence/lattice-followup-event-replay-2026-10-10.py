"""Replay the frozen event reference functions into a fresh output directory.

This wrapper removes only the original command-line dispatcher, then calls the
same known/target functions with HERE redirected. Subject, inputs and reference
source stay byte-identical. Run known first, then target, from the repository.
"""
from pathlib import Path
import hashlib
import json
import signal
import sys

ROOT = Path(__file__).resolve().parents[5]
if Path.cwd().resolve() != ROOT:
    raise SystemExit("Run from the Architrino repository root")
if len(sys.argv) != 2 or sys.argv[1] not in ("known", "target"):
    raise SystemExit("Use known or target; known must precede target")
SOURCE = ROOT / ".tmp/mec-008-next-event/moore/event-reference.py"
SNAPSHOT = ROOT / ".local-data/master-equation-closure/next-event/independent/event-reference.py"
EXPECTED = "2837443d591b513558dff9d467304bdd50f29393f9ba7e9794ef2ead07de5a3b"
raw = SOURCE.read_bytes()
if hashlib.sha256(raw).hexdigest() != EXPECTED or raw != SNAPSHOT.read_bytes():
    raise SystemExit("Reference differs from its accepted byte-exact snapshot")
dispatcher = "known() if sys.argv[1]=='known' else target()\n"
text = raw.decode("utf-8")
if not text.endswith(dispatcher) or text.count(dispatcher) != 1:
    raise SystemExit("Original dispatcher is not the expected unique last statement")
namespace = {"__file__": str(SOURCE), "__name__": "followup_event_reference"}
exec(compile(text[:-len(dispatcher)], str(SOURCE), "exec"), namespace)
OUT = ROOT / ".local-data/master-equation-closure/reciprocal-followup-2026-10-10/event-replay"
OUT.mkdir(parents=True, exist_ok=True)
namespace["HERE"] = OUT

def timeout(signum, frame):
    raise TimeoutError("Bounded event-reference replay exceeded 90 seconds")

signal.signal(signal.SIGALRM, timeout)
signal.alarm(90)
try:
    if sys.argv[1] == "known":
        namespace["known"]()
        control = json.loads((OUT / "event-known.json").read_text())
        if control["result"] != "PASS" or len(control["controls"]) != 3:
            raise RuntimeError("Known controls did not return the expected result")
    else:
        control = json.loads((OUT / "event-known.json").read_text())
        if control["result"] != "PASS" or len(control["controls"]) != 3:
            raise RuntimeError("Run and observe the fresh known controls first")
        namespace["target"]()
finally:
    signal.alarm(0)
