"""Finer-grading rerun of the root-birth table's long-delay row (four-member balance f0703#1, seed 1).

Purpose. The root-birth note's row with tau_b = 0.1977 reports a birth-to-arrival interval 20.5 percent
above the leading-order law at the census grading, where the step is limited to a tenth of the
predicted time to each root birth (eta3 = 0.1). This driver repeats that exact release with the step
limited to three hundredths (eta3 = 0.03), to see how much of the excess is resolution.

What is unchanged. The instrument is the retained session's own: `birth_impulse.R` over `release4.py`
and `release2.py`, imported from `.local-data/master-equation-closure/geometry-session-20261006/` and
not edited or copied. The equation is the unchanged Master Equation with c_f = K = 1 as that instrument
states. The preparation is the retained balance entry `results/f0703.json` index 1 with its rigid
supplied past as constructed by the instrument, and the kick is regenerated exactly as
`birth_census.py` did: numpy default_rng(seed), a normal draw of shape (N, 3), scaled to norm 1e-4.
The call replicates `birth_census.job` line for line except for eta3 in target mode.

Modes.
  known   : census settings on `results/f0501.json` index 0 seed 2 (the 45-second closed-form-pair
            release). Must reproduce the retained census record's arrival time and newborn delay.
            Includes a negative control: the same result must NOT match the retained record of seed 1.
  target  : `results/f0703.json` index 1 seed 1 at eta3 = 0.03.
Outputs are written once to the path given; an existing path is refused. Float instrument: measured.
"""
import json
import os
import sys
import time

SESSION = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "..", "..", ".local-data", "master-equation-closure", "geometry-session-20261006")
SESSION = os.path.normpath(SESSION)


def job(f, k, seed, eta3):
    import numpy as np
    from birth_impulse import R
    t0 = time.time()
    b = json.load(open("../geometry-session-20261004/" + f))["balances"][k]
    rng = np.random.default_rng(seed)
    kick = rng.normal(size=(len(b["r"]), 3))
    kick *= 1e-4 / np.linalg.norm(kick)
    P = 2 * np.pi / b["w"]
    S = R(b["r"], b["phi"], b["z"], b["s"], b["w"], b["u"], h=P / 3000, kick=kick, close_tol=1e-7 * max(b["r"]), far_factor=25.0, eta=0.005, eta3=eta3)
    S.run(8 * P)
    out = dict(file=f, idx=k, seed=seed, eta3=eta3, event=S.event[0] if S.event else None, who=S.event[1] if S.event else None, t_over_P=S.T[-1] / P, births=S.births or [], P=P, steps=len(S.T), missed=S.missed, seconds=time.time() - t0)
    if S.event and S.event[0] == "wake":
        w = S.event[1]
        s1, s0 = np.linalg.norm(S.V[-1][w]), np.linalg.norm(S.V[-2][w])
        out["t_cross"] = float(S.T[-2] + (1 - s0) / (s1 - s0) * (S.T[-1] - S.T[-2]))
        out["last_step"] = float(S.T[-1] - S.T[-2])
        mine = [B for B in out["births"] if B["i"] == w]
        if mine:
            B = mine[-1]
            out["selected"] = dict(tau_b=B["tau_b"], gtt=B["gtt"], kappa_tau_b_cubed=abs(B["gtt"]) * B["tau_b"] ** 3, Vsrc=B["Vsrc"], speed=B["speed"], y0=B["y0"], ystar=B["ystar"], like=B["like"], tstar=B["tstar"], other_rows=B["other_rows"], birth_time=B["T"], measured=out["t_cross"] - B["T"], ratio=(out["t_cross"] - B["T"]) / B["tstar"])
    return out


def matches(o, rec):
    """Same release as a retained census record: arrival time and newborn delay."""
    if o.get("event") != "wake" or "selected" not in o:
        return False
    return abs(o["t_cross"] - rec["t_cross"]) < 1e-9 and abs(o["selected"]["tau_b"] - rec["tau_b"]) < 1e-6 * rec["tau_b"]


if __name__ == "__main__":
    mode, outpath = sys.argv[1], os.path.abspath(sys.argv[2])
    if os.path.exists(outpath):
        raise SystemExit("output exists; refusing to overwrite")
    os.chdir(SESSION)
    sys.path.insert(0, SESSION)
    census = json.load(open("birth-census.json"))

    def rec(file, idx, seed):
        r = [c for c in census if c["file"] == file and c["idx"] == idx and c["seed"] == seed][0]
        mine = [B for B in r["births"] if B["i"] == r["who"]][-1]
        return dict(t_cross=r["t_cross"], tau_b=mine["tau_b"], ratio=(r["t_cross"] - mine["T"]) / mine["tstar"], measured=r["t_cross"] - mine["T"], tstar=mine["tstar"])

    if mode == "known":
        o = job("results/f0501.json", 0, 2, 0.1)
        r2, r1 = rec("results/f0501.json", 0, 2), rec("results/f0501.json", 0, 1)
        res = {"mode": "known", "run": o, "retained_record_seed2": r2, "retained_record_seed1": r1,
               "known_reproduces_retained_seed2_record": bool(matches(o, r2)),
               "negative_control_does_not_match_seed1_record": bool(not matches(o, r1))}
        res["result"] = "PASS" if res["known_reproduces_retained_seed2_record"] and res["negative_control_does_not_match_seed1_record"] else "FAIL"
    elif mode == "target":
        o = job("results/f0703.json", 1, 1, 0.03)
        res = {"mode": "target", "run": o, "retained_census_record_eta3_0.1": rec("results/f0703.json", 1, 1), "result": "COMPLETED"}
    else:
        raise SystemExit("usage: known|target <output.json>")
    with open(outpath, "x") as fh:
        json.dump(res, fh, indent=1, default=float)
    print(json.dumps({k: v for k, v in res.items() if k != "run"}, indent=1, default=float))
    if "run" in res:
        print("event", res["run"].get("event"), "who", res["run"].get("who"), "seconds", round(res["run"]["seconds"], 1), "selected", res["run"].get("selected"))
    raise SystemExit(0 if res["result"] in ("PASS", "COMPLETED") else 1)
