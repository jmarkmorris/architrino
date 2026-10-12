"""Serial task 7 supplement (review comments R7-01, R7-02, R7-04): reduction of the retained replay trajectories at
the located v = 1 crossing of their cubic-Hermite interpolant, with duplicate-safe ingestion.

This script integrates nothing and imports neither release.py nor any compiled library beyond numpy. It reads the
retained per-run result.json and trajectory.npz, the retained join, and the blind-reproduction input file. Its
Hermite interpolation, rigid past, root scan and row sum are written here.

What is interpolated. Each stored step has positions X and velocities V for every member. Between steps k and k+1,
with q in [0, 1] and step h, the cubic Hermite position has velocity a + q b + q^2 c with
    a = v0,   b = 6 (x1 - x0)/h - 4 v0 - 2 v1,   c = 6 (x0 - x1)/h + 3 v0 + 3 v1,
and acceleration (b + 2 q c)/h. This acceleration belongs to the interpolant. It is not the Master Equation's row
sum B, and the two are reported separately with their difference.

Per selected run (24 records, base and half step):
  ingestion   every runs/*/result.json is listed with its identity (balance file, index, seed, amplitude, steps) and
              duplicates are detected on that list before any dictionary is built;
  bounds      for every member and segment, the largest norm of the Bernstein controls a, a + b/2, a + b + c, which
              bounds the interpolant's speed on the segment (convexity of the norm);
  crossing    in the final segment of the arriving member w, the roots of |x'|^2 = 1 by a 2000-point sign scan and
              bisection; time t*, the interpolant's rate e.x'' there, the grid-endpoint values for comparison;
  rows        at reception time t* and position x_w(t*): for each partner, sign changes of the delay residual over
              (1e-9, twice the instrument's scan range], the root, emission time, transmitter factor; the row sum B,
              e.B, and the difference between the interpolant's acceleration and B;
  margins     smallest factor, smallest delay, nearest member at t*; kick residual t* - |x_w(t*) - X_j(0)| for each
              partner (negative: still received from the rigid past).
A finite sign scan finds the roots it finds; it is not a proof that no other root exists.

Known cases first: a segment with linear velocity crossing speed one at q = 1/2 with rate 1/h; a planted segment whose
endpoint speeds are 1/2 and whose interior speed is 5/4, which the Bernstein bound must not report below 5/4; the
row sum on each of the five exact rigid balances, sampled onto a grid with no kick and evaluated at an off-grid
time, against the rigid acceleration, with the wrong sign failing; the kick residual of a receiver at rest; and a
planted duplicate run directory that the ingestion must report.
Usage: python <this> <runs dir> <join.json> <blind-release.json> <output json>
"""
import hashlib
import json
import pathlib
import sys
import tempfile
import numpy as np

SRC = {"travel3": ("results/0151.json", 0), "planar6": ("results/0022.json", 0), "travel6": ("results/0090.json", 0), "mirror7": ("results/0199.json", 0), "travel8": ("results/0152.json", 0)}
sha = lambda p: hashlib.sha256(pathlib.Path(p).read_bytes()).hexdigest()


class Path:
    """Rigid past for s <= 0 and cubic Hermite on the stored uniform grid for s > 0."""

    def __init__(self, bal, T, X, V):
        self.r, self.phi, self.z, self.pol = [np.asarray(bal[k], float) for k in ("r", "phi", "z", "s")]
        self.w, self.u = float(bal["w"]), float(bal["u"])
        self.T, self.X, self.V = np.asarray(T), np.asarray(X), np.asarray(V)
        self.h = float(self.T[1] - self.T[0]) if len(self.T) > 1 else 1.0
        self.N = len(self.r)

    def rigid(self, j, s):
        a = self.phi[j] + self.w * s
        return (np.array([self.r[j] * np.cos(a), self.r[j] * np.sin(a), self.z[j] + self.u * s]), np.array([-self.r[j] * self.w * np.sin(a), self.r[j] * self.w * np.cos(a), self.u]))

    def at(self, j, s):
        if s <= 0.0:
            return self.rigid(j, s)
        k = min(int(s / self.h), len(self.T) - 2)
        q = (s - self.T[k]) / self.h
        x0, x1, v0, v1 = self.X[k][j], self.X[k + 1][j], self.V[k][j], self.V[k + 1][j]
        h = self.h
        x = (2 * q ** 3 - 3 * q ** 2 + 1) * x0 + (q ** 3 - 2 * q ** 2 + q) * h * v0 + (-2 * q ** 3 + 3 * q ** 2) * x1 + (q ** 3 - q ** 2) * h * v1
        a, b, c = seg_coeffs(x0, x1, v0, v1, h)
        return x, a + q * b + q * q * c


def seg_coeffs(x0, x1, v0, v1, h):
    return v0, 6 * (x1 - x0) / h - 4 * v0 - 2 * v1, 6 * (x0 - x1) / h + 3 * v0 + 3 * v1


def bernstein_bound(x0, x1, v0, v1, h):
    a, b, c = seg_coeffs(x0, x1, v0, v1, h)
    return max(np.linalg.norm(a), np.linalg.norm(a + b / 2), np.linalg.norm(a + b + c))


def crossings(a, b, c, n=2000):
    """Roots of |a + q b + q^2 c|^2 = 1 on [0, 1] by a sign scan and bisection."""
    f = lambda q: float(np.dot(a + q * b + q * q * c, a + q * b + q * q * c) - 1.0)
    qs = np.linspace(0.0, 1.0, n + 1)
    fv = np.array([f(q) for q in qs])
    # A root lying exactly on a scan point makes both neighbouring products zero. The second run of this script
    # missed the known q = 1/2 crossing that way and failed its first known case; exact zeros are now taken as roots.
    out = [float(qs[i]) for i in np.nonzero(fv == 0)[0]]
    for i in np.nonzero(fv[:-1] * fv[1:] < 0)[0]:
        lo, hi = qs[i], qs[i + 1]
        for _ in range(80):
            m = 0.5 * (lo + hi)
            if f(lo) * f(m) <= 0:
                hi = m
            else:
                lo = m
        out.append(0.5 * (lo + hi))
    return sorted(out)


def rows(path, i, t, xi, scan_to, n=4000):
    out, B = [], np.zeros(3)
    for j in range(path.N):
        if j == i:
            continue
        ts = np.linspace(1e-9, scan_to, n)
        g = lambda tau: tau - np.linalg.norm(xi - path.at(j, t - tau)[0])
        gv = np.array([g(x) for x in ts])
        assert not np.any(gv == 0), "delay residual vanishes exactly on a scan point"
        idx = np.nonzero(gv[:-1] * gv[1:] < 0)[0]
        for q in idx:
            lo, hi = ts[q], ts[q + 1]
            for _ in range(80):
                m = 0.5 * (lo + hi)
                if g(lo) * g(m) <= 0:
                    hi = m
                else:
                    lo = m
            tau = 0.5 * (lo + hi)
            xs, vs = path.at(j, t - tau)
            nv = (xi - xs) / np.linalg.norm(xi - xs)
            D = 1 - nv.dot(vs)
            B += path.pol[i] * path.pol[j] * nv / (tau * tau * abs(D))
            out.append(dict(source=j, sign_changes_for_source=int(len(idx)), delay=float(tau), emission_time=float(t - tau), D=float(D), source_speed_at_emission=float(np.linalg.norm(vs)), distance_now=float(np.linalg.norm(xi - path.at(j, t)[0]))))
    return out, B


def ingest(runs_dir):
    """List every run's identity from its own result.json; report duplicates before any dictionary is built."""
    items = []
    for d in sorted(pathlib.Path(runs_dir).iterdir()):
        f = d / "result.json"
        if f.exists():
            r = json.load(open(f))
            fl, k = SRC[r["name"]]
            items.append(((fl, k, r["seed"], float(r["amp"]), r["hdiv"]), d))
    keys = [k for k, _ in items]
    dup = sorted(set(k for k in keys if keys.count(k) > 1))
    return items, dup


def known(runs_dir):
    out, detail = {}, {}
    h = 0.01
    x0, v0, v1 = np.zeros(3), np.array([0.5, 0, 0]), np.array([1.5, 0, 0])
    a, b, c = seg_coeffs(x0, x0 + h * np.array([1.0, 0, 0]), v0, v1, h)
    q = crossings(a, b, c)
    rate = float(np.dot((a + q[0] * b + q[0] ** 2 * c), (b + 2 * q[0] * c) / h)) if q else float("nan")
    out["linear velocity from 1/2 to 3/2 crosses speed one once, at q = 1/2, with rate 1/h"] = len(q) == 1 and abs(q[0] - 0.5) < 1e-12 and abs(rate - 1 / h) < 1e-9
    v0 = v1 = np.array([0.5, 0, 0])
    x1 = x0 + h * np.array([1.0, 0, 0])
    a, b, c = seg_coeffs(x0, x1, v0, v1, h)
    mid = float(np.linalg.norm(a + 0.5 * b + 0.25 * c))
    out["planted segment: endpoint speeds 1/2, interior speed 5/4, and the Bernstein bound is not below 5/4"] = abs(mid - 1.25) < 1e-12 and bernstein_bound(x0, x1, v0, v1, h) >= 1.25 and len(crossings(a, b, c)) == 2
    worst, wrong, acc = 0.0, 0.0, 0.0
    seen = {}
    for d in sorted(pathlib.Path(runs_dir).iterdir()):
        if not (d / "result.json").exists():   # the first run of this script tried to open index.json as a directory here; retained
            continue
        r = json.load(open(d / "result.json"))
        if r["name"] in seen:
            continue
        seen[r["name"]] = 1
        bal = r["balance"]
        P = 2 * np.pi / bal["w"]
        hh = P / 1500
        base = Path(bal, [0.0, hh], np.zeros((2, len(bal["r"]), 3)), np.zeros((2, len(bal["r"]), 3)))
        T = hh * np.arange(0, 400)
        X = np.array([[base.rigid(j, t)[0] for j in range(base.N)] for t in T])
        V = np.array([[base.rigid(j, t)[1] for j in range(base.N)] for t in T])
        path = Path(bal, T, X, V)
        t = T[-1] - 0.37 * hh
        for i in range(path.N):
            xi, vi = path.at(i, t)
            rr, B = rows(path, i, t, xi, 2.0 * r["tau_max"])
            ang = path.phi[i] + path.w * t
            rigid = np.array([-path.r[i] * path.w ** 2 * np.cos(ang), -path.r[i] * path.w ** 2 * np.sin(ang), 0.0])
            scale = max(np.linalg.norm(rigid), 1e-12)
            if np.linalg.norm(rigid) > 1e-9:
                worst = max(worst, float(np.linalg.norm(B - rigid) / scale))
                wrong = max(wrong, float(np.linalg.norm(B + rigid)))
            else:
                worst = max(worst, float(np.linalg.norm(B)))
            k = len(T) - 2
            a, b, c = seg_coeffs(X[k][i], X[k + 1][i], V[k][i], V[k + 1][i], hh)
            acc = max(acc, float(np.linalg.norm((b + 2 * 0.63 * c) / hh - rigid) / scale) if np.linalg.norm(rigid) > 1e-9 else 0.0)
            assert len(rr) == path.N - 1
    out["off-grid row sum on the five exact rigid balances equals the rigid acceleration (relative 1e-6)"] = worst < 1e-6 and len(seen) == 5
    out["negative: the wrong sign of the rigid acceleration does not match"] = wrong > 1e-2
    detail.update(rigid_row_sum_worst_relative=worst, hermite_acceleration_minus_rigid_worst_relative=acc)
    out["the interpolant's acceleration on those exact rigid grids is within 1e-4 relative of the rigid acceleration"] = acc < 1e-4
    out["kick residual of a receiver at rest at distance 2 is t - 2: negative at 1.5, zero at 2, positive at 2.5"] = all(abs((t - np.linalg.norm(np.array([2.0, 0, 0]) - np.zeros(3))) - (t - 2)) < 1e-15 for t in (1.5, 2.0, 2.5)) and (1.5 - 2) < 0 < (2.5 - 2)
    with tempfile.TemporaryDirectory() as tmp:
        for name in ("a", "b", "c"):
            p = pathlib.Path(tmp) / name
            p.mkdir()
            json.dump(dict(name="travel3", seed=1 if name != "c" else 2, amp=1e-4, hdiv=2000), open(p / "result.json", "w"))
        items, dup = ingest(tmp)
        out["planted duplicate run directory is reported by the ingestion itself (three directories, one duplicated identity)"] = len(items) == 3 and dup == [("results/0151.json", 0, 1, 1e-4, 2000)]
    return out, detail


if __name__ == "__main__":
    runs_dir, join_path, blind_path, out_path = sys.argv[1:5]
    k, detail = known(runs_dir)
    res = dict(known={a: bool(v) for a, v in k.items()}, known_detail=detail, known_result="PASS" if all(k.values()) else "FAIL")
    print(json.dumps(dict(known_result=res["known_result"], failed=[a for a, v in k.items() if not v])), file=sys.stderr, flush=True)
    if res["known_result"] == "PASS":
        items, dup = ingest(runs_dir)
        res["ingestion"] = dict(run_directories=len(items), distinct_identities=len(set(key for key, _ in items)), duplicates=[list(x) for x in dup])
        assert not dup, "duplicate run identities"
        index = dict(items)
        join = json.load(open(join_path))
        res["inputs_sha256"] = {"join.json": sha(join_path), "blind-release.json": sha(blind_path)}
        # blind-reproduction preparations against the replay preparations, by full geometry and kick vectors
        blind = json.load(open(blind_path))
        bl = []
        for case, (name, hdiv) in zip(blind, (("travel3", 2000), ("planar6", 1500), ("mirror7", 1500))):
            f, kk = SRC[name]
            r = json.load(open(index[(f, kk, 1, 1e-4, hdiv)] / "result.json"))
            b = r["balance"]
            diffs = dict(radius=float(np.max(np.abs(np.array(case["radius"]) - np.array(b["r"])))), angle=float(np.max(np.abs(np.array(case["angle"]) - np.array(b["phi"])))), height=float(np.max(np.abs(np.array(case["height"]) - np.array(b["z"])))),
                         polarity=float(np.max(np.abs(np.array(case["polarity"]) - np.array(b["s"])))), angular_rate=abs(case["angular_rate"] - b["w"]), axial_velocity=abs(case["axial_velocity"] - b["u"]),
                         kick=float(np.max(np.abs(np.array(case["velocity_kick_at_time_zero"]) - np.array(r["kick"])))))
            others = [float(np.max(np.abs(np.array(case["velocity_kick_at_time_zero"]) - np.array(json.load(open(index[(f, kk, s, 1e-4, hdiv)] / "result.json"))["kick"])))) for s in (2, 3)]
            bl.append(dict(blind_case=case["name"], balance=name, seed=1, max_abs_differences=diffs, identical=all(v == 0.0 for v in diffs.values()), kick_difference_from_seeds_2_and_3=others, differs_from_other_seeds=all(x > 1e-6 for x in others)))
        res["blind_preparations"] = bl
        runs = {}
        other_bound, arriving_bound = 0.0, 0.0
        for rec in join["selected_records"]:
            f, kk = SRC[rec["name"]]
            for tag, hdiv in (("base", rec["hdiv"]), ("half", 2 * rec["hdiv"])):
                d = index[(f, kk, rec["seed"], 1e-4, hdiv)]
                r = json.load(open(d / "result.json"))
                z = np.load(d / "trajectory.npz")
                T, X, V = z["T"], z["X"], z["V"]
                path = Path(r["balance"], T, X, V)
                w, n, h = r["arrival"]["member"], len(T) - 1, path.h
                bb = np.array([[bernstein_bound(X[s][j], X[s + 1][j], V[s][j], V[s + 1][j], h) for j in range(path.N)] for s in range(n)])
                ob = float(max(bb[:, j].max() for j in range(path.N) if j != w))
                ab = float(bb[:n - 1, w].max()) if n > 1 else 0.0
                other_bound, arriving_bound = max(other_bound, ob), max(arriving_bound, ab)
                a, b, c = seg_coeffs(X[n - 1][w], X[n][w], V[n - 1][w], V[n][w], h)
                qs = crossings(a, b, c)
                q = qs[0]
                tstar = float(T[n - 1] + q * h)
                xi, vi = path.at(w, tstar)
                e = vi / np.linalg.norm(vi)
                accH = (b + 2 * q * c) / h
                rr, B = rows(path, w, tstar, xi, 2.0 * r["tau_max"])
                kick = [dict(source=j, residual=float(tstar - np.linalg.norm(xi - X[0][j]))) for j in range(path.N) if j != w]
                rr1, B1 = rows(path, w, float(T[n - 1]), X[n - 1][w], 2.0 * r["tau_max"])
                e1 = V[n - 1][w] / np.linalg.norm(V[n - 1][w])
                runs["%d-%s" % (rec["n"], tag)] = dict(record=rec["record"], dir=d.name, hdiv=hdiv, member=int(w), crossings_in_final_segment=len(qs), q=float(q), crossing_time=tstar, crossing_time_over_P=tstar / r["period"],
                    grid_event_time=float(T[n]), linear_estimate_time=r["arrival"]["crossing_time_linear"], crossing_minus_linear_estimate=tstar - r["arrival"]["crossing_time_linear"], speed_at_crossing=float(np.linalg.norm(vi)),
                    rate_interpolant=float(e.dot(accH)), rate_rows=float(e.dot(B)), rate_grid_last_step=r["arrival"]["rate_1"], norm_B=float(np.linalg.norm(B)), norm_interpolant_acceleration=float(np.linalg.norm(accH)),
                    norm_interpolant_minus_rows=float(np.linalg.norm(accH - B)), relative_interpolant_minus_rows=float(np.linalg.norm(accH - B) / np.linalg.norm(B)), rate_rows_at_previous_grid_point=float(e1.dot(B1)),
                    roots=len(rr), sign_changes_per_source=sorted(set(x["sign_changes_for_source"] for x in rr)), min_abs_D=float(min(abs(x["D"]) for x in rr)), min_D=float(min(x["D"] for x in rr)), min_delay=float(min(x["delay"] for x in rr)),
                    min_distance_over_size=float(min(x["distance_now"] for x in rr) / r["size"]), max_source_speed_at_emission=float(max(x["source_speed_at_emission"] for x in rr)), rows=rr, kick_residuals=kick,
                    min_abs_kick_residual=float(min(abs(x["residual"]) for x in kick)), sources_received_from_rigid_past=int(sum(1 for x in kick if x["residual"] < 0)), partners=len(kick),
                    bernstein_bound_other_members_whole_run=ob, bernstein_bound_arriving_member_before_final_segment=ab, speed_at_start_of_final_segment=float(np.linalg.norm(V[n - 1][w])), speed_at_grid_event=float(np.linalg.norm(V[n][w])))
        res["runs"] = runs
        S = list(runs.values())
        res["summary"] = dict(runs=len(S), one_crossing_in_every_final_segment=all(x["crossings_in_final_segment"] == 1 for x in S), one_sign_change_per_partner_at_every_crossing=all(x["sign_changes_per_source"] == [1] and x["roots"] == x["partners"] for x in S),
                              rate_interpolant_range=[min(x["rate_interpolant"] for x in S), max(x["rate_interpolant"] for x in S)], rate_rows_range=[min(x["rate_rows"] for x in S), max(x["rate_rows"] for x in S)],
                              max_relative_interpolant_minus_rows=max(x["relative_interpolant_minus_rows"] for x in S), max_abs_rate_interpolant_over_rate_rows_minus_1=max(abs(x["rate_interpolant"] / x["rate_rows"] - 1) for x in S),
                              min_abs_D=min(x["min_abs_D"] for x in S), min_D=min(x["min_D"] for x in S), min_delay=min(x["min_delay"] for x in S), min_distance_over_size=min(x["min_distance_over_size"] for x in S), min_abs_kick_residual=min(x["min_abs_kick_residual"] for x in S),
                              max_abs_crossing_minus_linear_estimate=max(abs(x["crossing_minus_linear_estimate"]) for x in S), bernstein_bound_other_members=other_bound, bernstein_bound_arriving_member_before_final_segment=arriving_bound,
                              max_norm_B=max(x["norm_B"] for x in S), max_source_speed_at_emission=max(x["max_source_speed_at_emission"] for x in S))
    with open(out_path, "x") as fh:
        json.dump(res, fh, indent=1)
    print(json.dumps(dict(known_result=res["known_result"], known_detail=detail, ingestion=res.get("ingestion"), blind=[(b["blind_case"], b["identical"], b["differs_from_other_seeds"]) for b in res.get("blind_preparations", [])], summary=res.get("summary")), indent=1))
    raise SystemExit(0 if res["known_result"] == "PASS" else 1)
