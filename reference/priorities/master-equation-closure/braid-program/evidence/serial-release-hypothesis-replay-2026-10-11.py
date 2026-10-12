"""Serial task 7: replay of the named first-search releases below wake speed, with the measurements that the
hypotheses of Theorem U need and that the retained records lack.

Subject (unchanged, imported by path after a SHA-256 check): release.py of geometry-session-20261005, the
fixed-step integrator of the unchanged delayed Master Equation with every positive-delay causal root, c_f = K = 1.
Preparations (unchanged): the complete rigid past of each balance from the retained geometry-session-20261004
result files, and the kick of release_many.py, rng = default_rng(seed), normal(size=(N, 3)), scaled to norm amp.

One declared substitution. release.py imports scipy.optimize.brentq, and scipy cannot be imported in the shared
environment on this host today. A module named scipy.optimize holding a plain bisection `brentq` is placed in
sys.modules before release.py is loaded. release.py itself is not edited. The bisection only seeds the roots at
the first scan and counts them at rescans; every tracked root is then re-solved by release.py's own Newton
iteration at each use. The substitution is tested by known cases and by reproduction of the retained records.

Nothing is written into a geometry-session directory. Every run writes its own new sub-directory and refuses
to overwrite. All measurements are made after the run, from the stored trajectory, with release.py's own
`hist` and `past` for the history and with a root scan and row sum written here; the stepping is untouched.

Per run, for the arriving member w and event step n (the first stored step with speed >= 1):
  speed history: speeds at the last 60 steps; crossing time t* by linear interpolation of the last step;
    rates (v_n - v_{n-q})/(T_n - T_{n-q}) for q = 1, 5, 20, 50; the sampled lower slope
    min over the last K steps of (1 - v_k)/(t* - T_k), K = 5, 20, 50; largest speed of w before the event step;
  rows: at steps n-1 and n and at the last 20 steps, the rows on w from every other member found by an
    independent scan of the delay to twice the instrument's scan range (count per partner, delay, emission
    time, transmitter factor), their sum B, |B| and e.B (which is dv/dt by the equation), and the largest
    step-to-step change of B over the last 20 steps;
  kick crossings: for every partner j the reception time at which the emission received by w crosses the
    kick time 0, from g_k = T_k - |x_w(T_k) - X_j(0)|, and its distance from the event;
  all members: largest speed before the event step, smallest pair distance, own-path scan for w at step n-1.
Float instrument: measured. Sampled quantities are not bounds.

Modes: known | replay <jobs.json> <out dir> <processes>
"""
import hashlib
import importlib.util
import json
import pathlib
import sys
import time
import types
import numpy as np

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[4]
G4 = ROOT / ".local-data/master-equation-closure/geometry-session-20261004"
G5 = ROOT / ".local-data/master-equation-closure/geometry-session-20261005"
RELEASE_SHA = "ed8c886643c344e2f4b26f138d39051263f95c0fdcab533195895d4785849cca"
SRC = {"travel3": ("results/0151.json", 0, "358ff7f2c3f1d8b9b4224d8a1a8622f7520b51c45fa8b15251e38e4f89c981cc"),
       "planar6": ("results/0022.json", 0, "438ebb1978d9d7acdb921bc0364211ec9ccc8673b3f4d3676359eae9361b23f5"),
       "travel6": ("results/0090.json", 0, "3974fd11c77dcd1aa03a189e6d254265ffcd9172b3cfa4d774de048998bbfec6"),
       "mirror7": ("results/0199.json", 0, "da23409477cdb078d7bdd12702d123835e71e5f68045fedca06584ab53cd30db"),
       "travel8": ("results/0152.json", 0, "47747b035918c83fd90d3ba62e61d50b6724ddcb1bb317e10905070796ec5f6b")}
sha = lambda p: hashlib.sha256(pathlib.Path(p).read_bytes()).hexdigest()


def brentq(f, a, b, xtol=1e-14, **kw):
    """Plain bisection on a sign-changing bracket (substitute for scipy.optimize.brentq; see the header)."""
    fa, fb = f(a), f(b)
    if fa == 0:
        return a
    if fb == 0:
        return b
    assert fa * fb < 0, "bracket does not change sign"
    for _ in range(200):
        m = 0.5 * (a + b)
        fm = f(m)
        if fm == 0 or (b - a) < 2 * xtol:
            return m
        if fa * fm < 0:
            b, fb = m, fm
        else:
            a, fa = m, fm
    return 0.5 * (a + b)


def load_release():
    assert sha(G5 / "release.py") == RELEASE_SHA, "release.py differs from the pinned bytes"
    sp, so = types.ModuleType("scipy"), types.ModuleType("scipy.optimize")
    so.brentq = brentq
    sp.optimize = so
    sys.modules["scipy"], sys.modules["scipy.optimize"] = sp, so
    spec = importlib.util.spec_from_file_location("release", G5 / "release.py")
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod.Release


def balance(name):
    f, k, h = SRC[name]
    assert sha(G4 / f) == h, "balance source differs from the pinned bytes"
    return json.load(open(G4 / f))["balances"][k]


def kick_of(seed, amp, n):
    rng = np.random.default_rng(seed)
    kick = rng.normal(size=(n, 3))
    return kick * (amp / np.linalg.norm(kick))


def rows_on(S, k, i, scan_factor=2.0, n=4000):
    """Rows on member i at stored step k from every other member, by an independent scan of the delay."""
    T, X = S.T[k], S.X[k]
    out, B = [], np.zeros(3)
    for j in range(S.N):
        if j == i:
            continue
        ts = np.linspace(1e-9, scan_factor * S.tau_max, n)
        g = lambda t: t - np.linalg.norm(X[i] - S.hist(j, T - t)[0])
        gv = np.array([g(t) for t in ts])
        idx = np.nonzero(gv[:-1] * gv[1:] < 0)[0]
        for q in idx:
            tau = brentq(g, ts[q], ts[q + 1], xtol=1e-15)
            Xs, Vs = S.hist(j, T - tau)
            Rv = X[i] - Xs
            nv = Rv / np.linalg.norm(Rv)
            D = 1 - nv.dot(Vs)
            row = S.pol[i] * S.pol[j] * nv / (tau * tau * abs(D))
            B += row
            out.append(dict(source=j, delay=float(tau), emission_time=float(T - tau), D=float(D), distance_now=float(np.linalg.norm(X[i] - X[j])), source_speed_at_emission=float(np.linalg.norm(Vs)), roots_for_this_source=int(len(idx))))
    return out, B


def own_path_roots(S, k, i, n=4000):
    T, X = S.T[k], S.X[k]
    ts = np.linspace(1e-9, 2.0 * S.tau_max, n)
    gv = np.array([t - np.linalg.norm(X[i] - S.hist(i, T - t)[0]) for t in ts])
    return int(np.count_nonzero(gv[:-1] * gv[1:] < 0)), float(gv.min())


def measure(S, P):
    T = np.array(S.T)
    V = np.array(S.V)
    X = np.array(S.X)
    sp = np.linalg.norm(V, axis=2)
    n = len(T) - 1
    out = dict(steps=n, h=float(S.h), period=float(P), size=float(S.size), tau_max=float(S.tau_max), event=list(S.event) if S.event else None, census0=S.census0, Dmin_instrument=float(S.Dmin),
               speeds0_rigid=S.speed0.tolist(), speeds_after_kick=sp[0].tolist(), final_speeds=sp[-1].tolist(), max_speed_before_event_step=sp[:-1].max(axis=0).tolist(), max_speed_whole_run=sp.max(axis=0).tolist())
    d = np.array([[np.linalg.norm(X[:, a] - X[:, b], axis=1).min() if a != b else np.inf for b in range(S.N)] for a in range(S.N)])
    out["min_pair_whole_run"] = float(d.min())
    out["min_pair_final"] = float(min(np.linalg.norm(X[-1][a] - X[-1][b]) for a in range(S.N) for b in range(a + 1, S.N)))
    if not S.event or S.event[0] != "wake":
        return out
    w = S.event[1]
    v = sp[:, w]
    tstar = T[n - 1] + (1.0 - v[n - 1]) * (T[n] - T[n - 1]) / (v[n] - v[n - 1])
    A = dict(member=int(w), polarity=float(S.pol[w]), event_time=float(T[n]), event_time_over_P=float(T[n] / P), crossing_time_linear=float(tstar), crossing_time_over_P=float(tstar / P), speed_last=float(v[n]), speed_prev=float(v[n - 1]),
             speeds_last_60=[float(x) for x in v[max(0, n - 60):]], times_last_60=[float(x) for x in T[max(0, n - 60):]], max_speed_before_event_step=float(v[:n].max()), speed_after_kick=float(v[0]), all_sampled_speeds_before_event_step_below_one=bool(v[:n].max() < 1.0))
    for q in (1, 5, 20, 50):
        if n - q >= 0:
            A["rate_%d" % q] = float((v[n] - v[n - q]) / (T[n] - T[n - q]))
    for K in (5, 20, 50):
        ks = range(max(0, n - K), n)
        A["sampled_lower_slope_last_%d" % K] = float(min((1.0 - v[k]) / (tstar - T[k]) for k in ks))
    A["speed_increments_last_50_all_positive"] = bool(np.all(np.diff(v[max(0, n - 50):]) > 0))
    out["arrival"] = A
    # rows on w
    R = {}
    hist_B = []
    for k in range(max(1, n - 20), n + 1):
        rows, B = rows_on(S, k, w)
        e = V[k][w] / np.linalg.norm(V[k][w])
        hist_B.append(dict(step_offset=int(k - n), time=float(T[k]), B=[float(x) for x in B], norm_B=float(np.linalg.norm(B)), e_dot_B=float(e.dot(B)), roots=len(rows), min_abs_D=float(min(abs(r["D"]) for r in rows)), min_delay=float(min(r["delay"] for r in rows)),
                           roots_per_source=sorted(set(r["roots_for_this_source"] for r in rows))))
        if k >= n - 1:
            R["step_%d" % (k - n)] = rows
    dB = [float(np.linalg.norm(np.array(hist_B[q + 1]["B"]) - np.array(hist_B[q]["B"]))) for q in range(len(hist_B) - 1)]
    out["rows_on_arriving_member"] = dict(at_event_steps=R, last_steps=hist_B, max_norm_B_last_20=float(max(x["norm_B"] for x in hist_B)), max_step_change_of_B_last_20=float(max(dB)) if dB else None, last_step_change_of_B=dB[-1] if dB else None,
                                          one_root_per_partner_at_every_checked_step=bool(all(x["roots"] == S.N - 1 and x["roots_per_source"] == [1] for x in hist_B)),
                                          e_dot_B_step_minus_1=hist_B[-2]["e_dot_B"] if len(hist_B) > 1 else None, e_dot_B_step_0=hist_B[-1]["e_dot_B"])
    own = own_path_roots(S, n - 1, w)
    out["own_path_scan_step_minus_1"] = dict(sign_changes=own[0], min_g=own[1])
    # kick crossings: emission received by w from j crosses the kick time when T = |x_w(T) - X_j(0)|
    KC = []
    for j in range(S.N):
        if j == w:
            continue
        gk = T - np.linalg.norm(X[:, w] - X[0][j], axis=1)
        idx = np.nonzero(gk[:-1] * gk[1:] < 0)[0]
        cross = [float(T[q] + (T[q + 1] - T[q]) * (0 - gk[q]) / (gk[q + 1] - gk[q])) for q in idx]
        KC.append(dict(source=j, emission_before_kick_at_event=bool(gk[n] < 0), g_at_event=float(gk[n]), crossing_times=cross, event_minus_last_crossing=float(T[n] - cross[-1]) if cross else None,
                       event_minus_last_crossing_in_steps=float((T[n] - cross[-1]) / S.h) if cross else None))
    gaps = [abs(c["g_at_event"]) for c in KC]
    out["kick_crossings"] = dict(per_source=KC, sources_still_emitting_from_rigid_past_at_event=int(sum(c["emission_before_kick_at_event"] for c in KC)), min_abs_g_at_event=float(min(gaps)),
                                 nearest_crossing_before_event_in_steps=(min(c["event_minus_last_crossing_in_steps"] for c in KC if c["event_minus_last_crossing_in_steps"] is not None) if any(c["crossing_times"] for c in KC) else None),
                                 crossings_within_last_50_steps=int(sum(1 for c in KC for t in c["crossing_times"] if T[n] - t < 50 * S.h)))
    return out


def job(a):
    name, seed, amp, hdiv, outdir, label = a
    Release = load_release()
    b = balance(name)
    P = 2 * np.pi / b["w"]
    kick = kick_of(seed, amp, len(b["r"]))
    t0 = time.time()
    S = Release(b["r"], b["phi"], b["z"], b["s"], b["w"], b["u"], h=P / hdiv, kick=kick)
    S.run(6.0 * P)
    res = dict(name=name, seed=seed, amp=amp, hdiv=hdiv, label=label, kick=kick.tolist(), kick_norm=float(np.linalg.norm(kick)), balance=dict(r=b["r"], phi=b["phi"], z=b["z"], s=b["s"], w=b["w"], u=b["u"]), integrate_seconds=time.time() - t0)
    res.update(measure(S, P))
    res["seconds"] = time.time() - t0
    d = pathlib.Path(outdir) / ("%s-seed%d-amp%g-h%d" % (name, seed, amp, hdiv))
    d.mkdir(parents=True, exist_ok=False)
    np.savez_compressed(d / "trajectory.npz", T=np.array(S.T), X=np.array(S.X), V=np.array(S.V))
    with open(d / "result.json", "x") as fh:
        json.dump(res, fh, indent=1)
    return dict(dir=d.name, name=name, seed=seed, amp=amp, hdiv=hdiv, label=label, event=res["event"][0] if res["event"] else None, who=res["event"][1] if res["event"] else None, t_over_P=res["event"][2] / P if res["event"] else None, seconds=res["seconds"])


def known():
    out = {}
    out["bisection: sqrt(2), cos x = x and a root at a bracket end"] = abs(brentq(lambda x: x * x - 2, 0, 2) - 2 ** 0.5) < 1e-13 and abs(brentq(lambda x: np.cos(x) - x, 0, 1) - 0.7390851332151607) < 1e-13 and brentq(lambda x: x - 1.0, 1.0, 2.0) == 1.0
    Release = load_release()
    # closed-form pair of release_controls.py: balance held with no kick; growth rate of a small kick against the located root 0.8531 w
    x = 0.3119574023865681
    R1 = 4 / (np.pi ** 2 * x * (1 + x) ** 2)
    R2 = x * R1
    w = np.pi / (2 * R1)
    P = 2 * np.pi / w
    pair = dict(r=[R1, R2], phi=[0.0, np.pi * (1 - x) / 2], z=[0, 0], pol=[1, -1], w=w, u=0.0)
    S = Release(h=P / 1500, **pair)
    S.run(1.0 * P)
    dev = S.deviation()
    out["release.py with the substitute root finder holds the closed-form pair with no kick for one period (deviation below 1e-8, no event)"] = bool(dev < 1e-8 and S.event is None)
    # Growth of a small kick, as documented for the original control in the release analysis: kick 1e-8, fit while the
    # departure lies between 1e-6 and 3e-4 of the size; expected: the located root 0.8531 w (documented fits 0.8498, 0.8530).
    # (The first run of this script used a kick of 1e-7 and a window from thirty times the first sample to 1e-3; that
    # window takes in the early mixed-mode transient, gave 0.8778 and failed. It was this script's misposed control; retained.)
    rates = []
    for seed in (1, 2):
        rng = np.random.default_rng(seed)
        k = rng.normal(size=(2, 3))
        k[:, 2] = 0
        k *= 1e-8 / np.linalg.norm(k)
        S = Release(h=P / 2000, kick=k, **pair)
        rec = S.run(5.0 * P, log_every=50)
        t = np.array([r[0] for r in rec])
        d = np.array([r[1] for r in rec])
        sel = (d > 1e-6) & (d < 3e-4)
        rates.append(float(np.polyfit(t[sel], np.log(d[sel]), 1)[0] / w) if sel.sum() > 3 else float("nan"))
    out["small-kick growth rate on the closed-form pair is within 0.01 of the located root 0.8531 w, two kick directions"] = bool(all(abs(r - 0.8531) < 0.01 for r in rates))
    detail = dict(no_kick_deviation=float(dev), fitted_rates_over_w=rates)
    # the independent row sum on each exact rigid balance must equal the rigid acceleration
    worst = 0.0
    wrong = 0.0
    for name in SRC:
        b = balance(name)
        S = Release(b["r"], b["phi"], b["z"], b["s"], b["w"], b["u"], h=(2 * np.pi / b["w"]) / 1500)
        for i in range(S.N):
            rows, B = rows_on(S, 0, i)
            a = S.phi[i]
            rigid = np.array([-S.r[i] * S.w ** 2 * np.cos(a), -S.r[i] * S.w ** 2 * np.sin(a), 0.0])
            worst = max(worst, float(np.linalg.norm(B - rigid) / max(np.linalg.norm(rigid), 1e-12)) if np.linalg.norm(rigid) > 1e-9 else float(np.linalg.norm(B)))
            wrong = max(wrong, float(np.linalg.norm(B + rigid)))
            assert len(rows) == S.N - 1
    out["independent row sum equals the rigid acceleration on every member of the five balances (relative 1e-6)"] = bool(worst < 1e-6)
    out["negative: the row sum with the wrong sign of the rigid acceleration does not match"] = bool(wrong > 1e-2)
    detail.update(worst_balance_residual=worst)
    # kick construction reproduces a retained record's stated norm and is deterministic
    k1, k2, k3 = kick_of(1, 1e-4, 3), kick_of(1, 1e-4, 3), kick_of(2, 1e-4, 3)
    out["kick is deterministic in the seed, has the stated norm, and differs between seeds"] = bool(np.array_equal(k1, k2) and abs(np.linalg.norm(k1) - 1e-4) < 1e-18 and not np.allclose(k1, k3))
    return out, detail


if __name__ == "__main__":
    mode = sys.argv[1] if len(sys.argv) > 1 else ""
    if mode == "known":
        t0 = time.time()
        k, detail = known()
        res = dict(known={a: bool(v) for a, v in k.items()}, detail=detail, known_result="PASS" if all(k.values()) else "FAIL", release_sha256=RELEASE_SHA, numpy=np.__version__, python=sys.version.split()[0], seconds=round(time.time() - t0, 1))
        print(json.dumps(res, indent=1))
        raise SystemExit(0 if res["known_result"] == "PASS" else 1)
    if mode == "replay":
        from multiprocessing import Pool
        jobs = json.load(open(sys.argv[2]))
        outdir = pathlib.Path(sys.argv[3])
        outdir.mkdir(parents=True, exist_ok=False)
        index = []
        with Pool(int(sys.argv[4])) as pool:
            for r in pool.imap_unordered(job, [(j["name"], j["seed"], j["amp"], j["hdiv"], str(outdir), j["label"]) for j in jobs]):
                index.append(r)
                print(json.dumps(r), flush=True)
        with open(outdir / "index.json", "x") as fh:
            json.dump(index, fh, indent=1)
        raise SystemExit(0)
    raise SystemExit("usage: known | replay <jobs.json> <out dir> <processes>")
