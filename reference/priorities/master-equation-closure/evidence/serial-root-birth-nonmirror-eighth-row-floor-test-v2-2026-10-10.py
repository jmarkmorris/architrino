"""Resolution test of the eighth release row: the instrument's floor step (version 2, explanation only).

This file is a corrected companion of serial-root-birth-nonmirror-eighth-row-floor-test-2026-10-10.py.
Its computational body is byte-for-byte the body of that file. The original file and its output are
unchanged and remain the record of what was run. Only this explanation differs.

Correction. The original explanation gave the detection-excess formula as
    measured/t_* - 1 = 6 * split / (tau_b^2 (y_* - y_0)(y_* + 2 y_0)).
That form is right only when y_* > y_0, which is the opposite-polarity case of every release examined.
For both polarity signs the formula is
    measured/t_* - 1 = 6 * split / (tau_b^2 * abs(y_* - y_0) * (y_* + 2 y_0)),
because the time from detection is the leading-law time plus sqrt(G_delta) * abs(y_* - y_0) / c.
The body below evaluates the unsigned-difference form without abs; for the opposite-polarity release
it runs, the two agree.

Scope. The formula accounts for one mechanism: the impulse omitted in the step that contains the
birth. It is not a bound on every grading or resolution error of the instrument.
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
