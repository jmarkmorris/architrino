"""Display retained long binary diagnostics, cutting off at a declared curve guard.

The figure is a sampled measurement, not an exact-solution fate certificate.
Run with the shared Architrino venv. Known record and cutoff controls run before
target reads. Inputs and producer bytes are hashed in the local provenance.
"""
import argparse
import hashlib
import importlib.util
import json
import math
from pathlib import Path

SOURCE = Path(__file__).resolve()
BASE = SOURCE.with_name("maxwell-shaped-overnight-figures.py")
spec = importlib.util.spec_from_file_location("retained_figure_reference", BASE)
reference = importlib.util.module_from_spec(spec)
spec.loader.exec_module(reference)


def cut_records(rows, event):
    rows = reference.validate_records(rows)
    stop = event["t"]
    accepted = [row for row in rows if row["t"] < stop]
    assert accepted, "no pre-guard record"
    result = reference.validate_records(accepted + [event])
    assert result[-1]["t"] == stop
    assert all(row["t"] <= stop for row in result)
    return result


def known():
    control = reference.known_control()
    row = dict(t=0., r=2., separation=4., speed=.5, vR=.3, vT=.4,
               angle=0., unwrappedAngle=0., angularRate=.2, delay=4.,
               D=1., sourceAccelerationNorm=.1)
    future = dict(row, t=2., angle=.4, unwrappedAngle=.4)
    event = dict(row, t=1., angle=.2, unwrappedAngle=.2)
    selected = cut_records([row, future, future], event)
    assert [x["t"] for x in selected] == [0., 1.]
    assert selected[-1]["unwrappedAngle"]/(2*math.pi) == .2/(2*math.pi)
    return dict(passed=True, record_controls=control,
                post_guard_and_duplicate_records_excluded=True,
                declared_event_inserted=True)


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def rotations(row):
    if "unwrappedAngle" in row:
        return row["unwrappedAngle"]/(2*math.pi)
    assert row["t"] == 0 and row["angle"] == 0, "missing noninitial accumulated angle"
    return 0.


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--controls-only", action="store_true")
    parser.add_argument("--input-owner", type=Path, default=Path(
        ".local-data/master-equation-closure/binary-research/maxwell-shaped-overnight"))
    parser.add_argument("--output-owner", type=Path, default=Path(
        ".local-data/master-equation-closure/binary-research/maxwell-shaped-overnight-long-figures"))
    parser.add_argument("--suffix", default="long-h002")
    args = parser.parse_args()
    controls = known()
    assert rotations(dict(t=0., angle=0.)) == 0.
    try:
        rotations(dict(t=1., angle=.1))
    except AssertionError:
        pass
    else:
        raise AssertionError("missing noninitial accumulated angle admitted")
    controls["initial_zero_angle_only_fallback"] = True
    args.output_owner.mkdir(parents=True, exist_ok=True)
    (args.output_owner/"known-controls.json").write_text(json.dumps(controls, indent=2)+"\n")
    print(json.dumps(dict(known_controls=controls, target_reads=0)))
    if args.controls_only:
        return
    import matplotlib
    matplotlib.use("Agg")
    import matplotlib.pyplot as plt
    cases, bindings = {}, {}
    for law in ("E", "full"):
        stem = args.input_owner/f"b005-{law}-{args.suffix}"
        summary_path, records_path = Path(str(stem)+".json"), Path(str(stem)+".jsonl")
        summary = json.loads(summary_path.read_text())
        assert summary["method"]["speedStop"] == .999
        assert summary["frozenCase"]["cf"] == 1
        event = summary["monitoredMarginEvent"]
        assert abs(event["speed"]-.999) < 1e-8
        rows = [json.loads(line) for line in records_path.read_text().splitlines() if line]
        cases[law] = cut_records(rows, event)
        bindings[law] = dict(summary=str(summary_path), summary_sha256=digest(summary_path),
                             records=str(records_path), records_sha256=digest(records_path),
                             stop=event["t"], record_count=len(cases[law]))
    panels = [("r", "Member radius", True), ("r3", "Radius cubed / initial radius cubed", False),
              ("speed", "Speed", False), ("vR", "Radial velocity", False),
              ("vT", "Tangential velocity", False), ("turns", "Accumulated rotations", False),
              ("D", "Transmitter denominator", False),
              ("sourceAccelerationNorm", "Delayed source acceleration norm", True)]
    fig, axes = plt.subplots(4, 2, figsize=(11, 11), sharex=True, constrained_layout=True)
    for ax, (field, label, logarithmic) in zip(axes.flat, panels):
        for law, title, color in [("E", "E", "#2469a0"), ("full", "E+M", "#bb4e39")]:
            rows = cases[law]
            def value(row):
                if field == "r3":
                    return (row["r"]/100.)**3
                if field == "turns":
                    return rotations(row)
                return row[field]
            ax.plot([row["t"]/1e6 for row in rows], [value(row) for row in rows],
                    color=color, label=title, linewidth=1.3)
        if logarithmic:
            ax.set_yscale("log")
        ax.set_title(label, fontsize=10)
        ax.grid(alpha=.2)
        ax.tick_params(labelsize=8)
    axes[0, 0].legend(frameon=False)
    for ax in axes[-1]:
        ax.set_xlabel("Reception time T / 10⁶ (cf = 1)")
    fig.suptitle("Original compatible mirror preparations: β = 0.05, r(0) = 100, K = cf = 1\n"
                 "Separate retained numerical futures up to each 0.999 curve guard; no continuous tube", fontsize=11)
    output = args.output_owner/"original-beta005-long-diagnostics.png"
    fig.savefig(output, dpi=150)
    plt.close(fig)
    provenance = dict(known_controls=controls, inputs=bindings, output=str(output),
                      producer_sha256=digest(SOURCE), validator_sha256=digest(BASE),
                      scope="sampled retained curves, declared interpolation guard; no exact-launch fate")
    (args.output_owner/"figure-provenance.json").write_text(json.dumps(provenance, indent=2)+"\n")
    print(json.dumps(dict(output=str(output), records={law: len(rows) for law, rows in cases.items()})))


if __name__ == "__main__":
    main()
