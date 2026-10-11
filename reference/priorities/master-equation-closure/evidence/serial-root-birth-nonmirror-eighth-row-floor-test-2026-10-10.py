"""Resolution test of the eighth release row: the instrument's floor step.

Finding to test. In the retained instrument the step that contains a root birth is integrated without
the two newborn rows. The rows therefore start at the value G_delta the root function has reached when
the birth is detected, and the leading law then gives, exactly within that law,
    measured/t_* - 1 = 6 * split / (tau_b^2 (y_* - y_0)(y_* + 2 y_0)),
where `split` is the separation of the two newborn roots recorded at detection. On every retained and
new record this expression reproduces the measured excess (0.1148 against 0.1151 for this row). The
split is set by the instrument's floor step, `hfloor = 1e-10` of a period, not by the grading
parameter eta3: changing eta3 from 0.1 to 0.03 changed the ratio from 1.1151 to 1.1175.

This driver repeats the identified eighth-row release (results/f0702.json index 2, seed 1) at the census
settings with one openly changed instrument attribute: `hfloor` multiplied by the factor given on the
command line (for example 0.01). Nothing else is changed: same retained instrument code, same
preparation, same kick, same step and grading parameters. If the finding is right, the split falls by
about the square root of the factor and the excess with it.

This is a resolution study of the instrument, not a new physical preparation, and its result does not
establish what setting produced the note's printed value 1.014.
Output is written once; an existing path is refused. Float instrument: measured.
"""
import json
import os
import sys
import time

here = os.path.dirname(os.path.abspath(__file__))
SESSION = os.path.normpath(os.path.join(here, "..", "..", "..", "..", ".local-data", "master-equation-closure", "geometry-session-20261006"))

if __name__ == "__main__":
    factor, outpath = float(sys.argv[1]), os.path.abspath(sys.argv[2])
    if os.path.exists(outpath):
        raise SystemExit("output exists; refusing to overwrite")
    os.chdir(SESSION)
    sys.path.insert(0, SESSION)
    import numpy as np
    from birth_impulse import R
    f, k, seed, eta3 = "results/f0702.json", 2, 1, 0.1
    t0 = time.time()
    b = json.load(open("../geometry-session-20261004/" + f))["balances"][k]
    rng = np.random.default_rng(seed)
    kick = rng.normal(size=(len(b["r"]), 3))
    kick *= 1e-4 / np.linalg.norm(kick)
    P = 2 * np.pi / b["w"]
    S = R(b["r"], b["phi"], b["z"], b["s"], b["w"], b["u"], h=P / 3000, kick=kick, close_tol=1e-7 * max(b["r"]), far_factor=25.0, eta=0.005, eta3=eta3)
    floor_default = S.hfloor
    S.hfloor = floor_default * factor
    err = None
    try:
        S.run(8 * P)
    except Exception as exc:
        err = repr(exc)[:200]
    out = dict(file=f, idx=k, seed=seed, eta3=eta3, hfloor_default=floor_default, hfloor_used=S.hfloor, factor=factor, error=err,
               event=S.event[0] if S.event else None, who=S.event[1] if S.event else None, t_over_P=S.T[-1] / P, steps=len(S.T), missed=S.missed, births=S.births or [], seconds=time.time() - t0)
    if S.event and S.event[0] == "wake" and err is None:
        w = S.event[1]
        s1, s0 = np.linalg.norm(S.V[-1][w]), np.linalg.norm(S.V[-2][w])
        t_cross = float(S.T[-2] + (1 - s0) / (s1 - s0) * (S.T[-1] - S.T[-2]))
        mine = [B for B in out["births"] if B["i"] == w]
        if mine:
            B = mine[-1]
            ratio = (t_cross - B["T"]) / B["tstar"]
            model = 6 * B["split"] / (B["tau_b"] ** 2 * (B["ystar"] - B["y0"]) * (B["ystar"] + 2 * B["y0"]))
            out["selected"] = dict(tau_b=B["tau_b"], split=B["split"], tstar=B["tstar"], measured=t_cross - B["T"], ratio=ratio, excess=ratio - 1, model_excess_from_split=model, last_step=float(S.T[-1] - S.T[-2]))
    with open(outpath, "x") as fh:
        json.dump(out, fh, indent=1, default=float)
    print(json.dumps({kk: vv for kk, vv in out.items() if kk != "births"}, indent=1, default=float))
