# Turning-point campaign, support role (emmy-noether): ONE-INVOCATION driver (PI request): runs, in this single python process and each in its own
# fresh global namespace, (1) slice7-iv.py (3dea2db0...) on the subject slices given, (2) d2ls-iv.py v4 (subdivided l'', n_sub sub-intervals) restricted
# to target steps >= FROM, (3) dlend-iv.py v3 (6da894c0..., subdivided end-instant dl/dt, n x n sub-boxes) on ends FROM..TO. Every component runs its own
# full control set first and exits on failure (which ends this driver). No new arithmetic here.
# Run: OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -l perl -e 'alarm 110; exec @ARGV' -- ../.venv/bin/python -I <this file> <A|B|AB> <tag> <FROM> <TO> <n_sub l''> <n end> <p1 ... pK>
import os, sys, time
print("PID", os.getpid(), flush=True)
EVC = "reference/priorities/master-equation-closure/noether-sea-research/evidence/"; PRE = EVC + "spherical-six-pole-turning-point-claude-support-"
MODE, TAG, FROM, TO, NL, NE = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5], sys.argv[6]; FILES = sys.argv[7:]   # MODE: A = slice7 + l'', B = end-instant dl/dt, AB = both; t0 = time.time()
def run(script, argv, env=None):
    if env: os.environ.update(env)
    sys.argv = argv; g = {"__name__": "__main__", "__file__": script}; exec(compile(open(script).read(), script, "exec"), g); print("DONE", script.split("support-")[-1], "%.1f s" % (time.time() - t0), flush=True)
if "A" in MODE: run(PRE + "slice7-iv.py", [PRE + "slice7-iv.py", PRE + "slice7-" + TAG + ".json"] + FILES)
if "A" in MODE: run(PRE + "d2ls-iv.py", [PRE + "d2ls-iv.py", PRE + "d2ls" + NL + "v4-" + TAG + ".json", NL, PRE + "slice7-" + TAG + ".json"] + FILES, {"D2LS_FROM": FROM})
if "B" in MODE: run(PRE + "dlend-iv.py", [PRE + "dlend-iv.py", PRE + "dlend" + NE + "v3-" + TAG + ".json", NE, FROM, TO] + [f for f in FILES if not f.endswith(("-p1.json", "-p2.json"))])
print("ALL DONE %.1f s" % (time.time() - t0), flush=True)
