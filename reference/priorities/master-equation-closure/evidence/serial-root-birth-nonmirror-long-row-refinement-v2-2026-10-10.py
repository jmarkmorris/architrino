"""Second attempt at the finer-grading rerun of the long-delay row, recording the state at failure.

The first attempt (serial-root-birth-nonmirror-long-row-refinement-2026-10-10.py, target mode) ended
inside the retained instrument with "min() iterable argument is empty" and wrote no output. This
version repeats the same release with the same settings (results/f0703.json index 1, seed 1,
h = P/3000, eta = 0.005, eta3 = 0.03, eight periods) and differs only in catching an exception from
the instrument, so that the time reached, the root-change events so far, the births recorded and the
miss count are written out. It does not alter, wrap or repair the instrument's stepping. If the run
completes, the result is recorded exactly as the first driver would have recorded it.
Its release settings and kick are those of the first driver, whose known and negative controls passed.
Output is written once; an existing path is refused. Float instrument: measured.
"""
import json
import os
import sys
import time

here = os.path.dirname(os.path.abspath(__file__))
SESSION = os.path.normpath(os.path.join(here, "..", "..", "..", "..", ".local-data", "master-equation-closure", "geometry-session-20261006"))

if __name__ == "__main__":
    outpath = os.path.abspath(sys.argv[1])
    eta3 = float(sys.argv[2]) if len(sys.argv) > 2 else 0.03
    if os.path.exists(outpath):
        raise SystemExit("output exists; refusing to overwrite")
    os.chdir(SESSION)
    sys.path.insert(0, SESSION)
    import numpy as np
    from birth_impulse import R
    f, k, seed = "results/f0703.json", 1, 1
    t0 = time.time()
    b = json.load(open("../geometry-session-20261004/" + f))["balances"][k]
    rng = np.random.default_rng(seed)
    kick = rng.normal(size=(len(b["r"]), 3))
    kick *= 1e-4 / np.linalg.norm(kick)
    P = 2 * np.pi / b["w"]
    S = R(b["r"], b["phi"], b["z"], b["s"], b["w"], b["u"], h=P / 3000, kick=kick, close_tol=1e-7 * max(b["r"]), far_factor=25.0, eta=0.005, eta3=eta3)
    err = None
    try:
        S.run(8 * P)
    except Exception as exc:  # the instrument's own failure, recorded and not repaired
        err = repr(exc)[:200]
    speeds = np.linalg.norm(S.V[-1], axis=1).tolist()
    seps = [float(np.linalg.norm(S.X[-1][i] - S.X[-1][j])) for i in range(S.N) for j in range(i + 1, S.N)]
    out = dict(file=f, idx=k, seed=seed, eta3=eta3, error=err, event=S.event[0] if S.event else None, who=S.event[1] if S.event else None,
               t_over_P_reached=S.T[-1] / P, steps=len(S.T), missed=S.missed, births_recorded=S.births or [],
               root_change_events=[(e[0] / P, e[1], e[2], e[3], e[4]) for e in S.events],
               root_counts_at_end=[[len(S.roots[i][j]) for j in range(S.N)] for i in range(S.N)],
               speeds_at_end=speeds, separations_at_end=seps, P=P, seconds=time.time() - t0)
    if S.event and S.event[0] == "wake" and err is None:
        w = S.event[1]
        s1, s0 = np.linalg.norm(S.V[-1][w]), np.linalg.norm(S.V[-2][w])
        out["t_cross"] = float(S.T[-2] + (1 - s0) / (s1 - s0) * (S.T[-1] - S.T[-2]))
        mine = [B for B in out["births_recorded"] if B["i"] == w]
        if mine:
            B = mine[-1]
            out["selected"] = dict(tau_b=B["tau_b"], kappa_tau_b_cubed=abs(B["gtt"]) * B["tau_b"] ** 3, tstar=B["tstar"], measured=out["t_cross"] - B["T"], ratio=(out["t_cross"] - B["T"]) / B["tstar"])
    with open(outpath, "x") as fh:
        json.dump(out, fh, indent=1, default=float)
    print(json.dumps({kk: vv for kk, vv in out.items() if kk not in ("births_recorded", "root_change_events")}, indent=1, default=float))
    print("root changes:", len(out["root_change_events"]), "births recorded:", len(out["births_recorded"]))
