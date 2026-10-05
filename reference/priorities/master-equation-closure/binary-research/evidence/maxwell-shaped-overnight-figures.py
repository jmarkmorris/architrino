"""Plot retained binary diagnostics; validate a known record before target reads.

These figures display measured histories, not a continuous error certificate.
Use the shared Architrino venv; outputs belong in the ignored geometry owner.
"""
import argparse
import json
import math
from pathlib import Path


def validate_records(records):
    assert records, "empty record inventory"
    prior = -math.inf
    accepted = []
    fields = ["t", "r", "separation", "speed", "vR", "vT", "angle",
              "angularRate", "delay", "D", "sourceAccelerationNorm"]
    for row in records:
        assert all(math.isfinite(row[k]) for k in fields)
        if row["t"] == prior:
            assert row == accepted[-1], "conflicting duplicate-time records"
            continue
        assert row["t"] > prior
        prior = row["t"]
        assert row["r"] > 0 and row["delay"] > 0 and row["D"] > 0
        assert math.isclose(row["separation"], 2*row["r"], rel_tol=1e-12)
        assert math.isclose(row["speed"]**2, row["vR"]**2+row["vT"]**2,
                            rel_tol=1e-11, abs_tol=1e-14)
        assert math.isclose(row["angularRate"], row["vT"]/row["r"],
                            rel_tol=1e-11, abs_tol=1e-14)
        accepted.append(row)
    return accepted


def known_control():
    row = dict(t=0., r=2., separation=4., speed=.5, vR=.3, vT=.4,
               angle=0., unwrappedAngle=0., angularRate=.2, delay=4., D=1., sourceAccelerationNorm=.1)
    validate_records([row, dict(row, t=1., angle=.2)])
    assert len(validate_records([row, row])) == 1
    bad = dict(row, speed=.6)
    try:
        validate_records([bad])
    except AssertionError:
        pass
    else:
        raise AssertionError("known inconsistent velocity was not rejected")
    try:
        validate_records([row, dict(row, angle=.1)])
    except AssertionError:
        pass
    else:
        raise AssertionError("known conflicting duplicate was not rejected")
    return dict(passed=True, known_separation=4., known_speed=.5,
                known_angular_rate=.2, inconsistent_velocity_rejected=True,
                identical_duplicate_collapsed=True, conflicting_duplicate_rejected=True)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--controls-only", action="store_true")
    parser.add_argument("--input-owner", default=".local-data/master-equation-closure/binary-research/maxwell-shaped-overnight")
    parser.add_argument("--output-owner", default=".local-data/master-equation-closure/binary-research/maxwell-shaped-overnight-figures")
    args = parser.parse_args()
    control = known_control()
    output = Path(args.output_owner)
    output.mkdir(parents=True, exist_ok=True)
    (output/"known-record-control.json").write_text(json.dumps(control, indent=2)+"\n")
    print(json.dumps(dict(known_control=control, target_reads=0)))
    if args.controls_only:
        return
    import matplotlib
    matplotlib.use("Agg")
    import matplotlib.pyplot as plt
    root = Path(args.input_owner)
    retained = {}
    for law in ["E", "full"]:
        path = root/f"b03-{law}-clean-T35-h0.00125.jsonl"
        retained[law] = validate_records([json.loads(line) for line in path.read_text().splitlines() if line])
    panels = [("r", "Member radius; separation = 2r"), ("speed", "Speed"),
              ("vR", "Radial velocity"), ("vT", "Tangential velocity"),
              ("unwrappedAngle", "Accumulated angle / 2π"), ("delay", "Partner delay"),
              ("D", "Transmitter denominator D"),
              ("sourceAccelerationNorm", "Delayed source acceleration norm")]
    fig, axes = plt.subplots(4, 2, figsize=(11, 11), sharex=True, constrained_layout=True)
    for ax, (field, title) in zip(axes.flat, panels):
        for law, label, color in [("E", "E", "#2469a0"), ("full", "E+M", "#bb4e39")]:
            rows = retained[law]
            scale = 2*math.pi if field == "unwrappedAngle" else 1.
            ax.plot([row["t"] for row in rows], [row.get(field, row["angle"])/scale for row in rows],
                    label=label, color=color, linewidth=1.6)
        ax.set_title(title, fontsize=10)
        ax.grid(alpha=.2)
        ax.tick_params(labelsize=8)
    axes[0, 0].legend(frameon=False)
    for ax in axes[-1]:
        ax.set_xlabel("Reception time T (cf = 1)")
    fig.suptitle("Original compatible mirror preparations: β = 0.3, K = cf = 1\n"
                 "Separate coupled futures, retained interval T ≤ 35; sampled measurements", fontsize=12)
    filename = output/"original-beta03-T35-diagnostics.png"
    fig.savefig(filename, dpi=150)
    plt.close(fig)
    (output/"figure-provenance.json").write_text(json.dumps(dict(
        inputs={law: str(root/f"b03-{law}-clean-T35-h0.00125.jsonl") for law in retained},
        output=str(filename), known_control=control,
        record_counts={law: len(rows) for law, rows in retained.items()},
        scope="sampled measured retained histories; not a continuous tube or binding verdict"), indent=2)+"\n")
    print(json.dumps(dict(output=str(filename), target_reads=2,
                         record_counts={law: len(rows) for law, rows in retained.items()})))


if __name__ == "__main__":
    main()
