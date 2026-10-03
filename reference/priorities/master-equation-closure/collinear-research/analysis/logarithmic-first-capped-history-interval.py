"""First capped history interval for the selected logarithmic comparison.

c_f=1, stationary preparation, K=1, finite-partner boundary projection,
and separately stipulated zero self acceleration. Evaluate the reception
of S=T_j algebraically from the previously computed incoming history.
No capped trajectory integration, later event, or contact rule is supplied.
"""
import importlib.util
import json
from math import isclose
from pathlib import Path


def received_state(source_time, source_position, source_speed, intercept, coupling):
    time = (intercept + source_time + source_position) / 2
    delay = time - source_time
    return {
        "T_over_a": time,
        "x_over_a": intercept - time,
        "S_over_a": source_time,
        "R_over_a": delay,
        "source_u": source_speed,
        "source_denominator": 1 - source_speed,
        "raw_A_times_a": coupling / (delay * (1 - source_speed)),
        "actual_A_times_a": 0.0,
        "u": 1.0,
    }


def known_controls():
    # Exact causal triangles: stationary source at x=2, then x(S)=2-S/2.
    for position, speed, expected in (
        (2.0, 0.0, (3.5, 0.5, 2.5, 0.4)),
        (1.5, 0.5, (3.25, 0.75, 2.25, 8 / 9)),
    ):
        row = received_state(1.0, position, speed, 4.0, 1.0)
        for key, value in zip(("T_over_a", "x_over_a", "R_over_a", "raw_A_times_a"), expected):
            assert isclose(row[key], value, rel_tol=0, abs_tol=2e-15)
    print("Known controls PASS before targets: exact stationary and affine "
          "source causal triangles, ranges, positions and raw inputs.", flush=True)


if __name__ == "__main__":
    known_controls()
    # Reuse the frozen incoming instrument; its analytical controls run first.
    spec = importlib.util.spec_from_file_location(
        "incoming", Path(__file__).with_name("logarithmic-second-history-interval.py"))
    incoming = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(incoming)
    incoming.known_controls()
    event = incoming.second_interval(1.0, rtol=5e-13, step_count=400)
    tj, uj = event["first_join_T_over_a"], event["first_join_u"]
    intercept = event["T_over_a"] + event["x_over_a"]
    assert 0 < event["S_over_a"] < tj < event["T_over_a"]
    row = received_state(tj, tj - 1, uj, intercept, 1.0)
    assert event["T_over_a"] < row["T_over_a"] < intercept
    assert row["x_over_a"] > 0 and row["R_over_a"] > 0
    source_acceleration = 1 / tj
    source_jerk_jump = (1 + uj) / (2 * tj)
    d = 1 - uj
    raw = row["raw_A_times_a"]
    row.update({
        "elapsed_since_cap_over_a": row["T_over_a"] - event["T_over_a"],
        "full_separation_over_a": 2 * row["x_over_a"],
        "dS_dT": 2 / d,
        "raw_A_prime_times_a2": raw * (
            (1 + uj) / (row["R_over_a"] * d) + 2 * source_acceleration / d**2),
        "raw_A_second_derivative_jump_times_a3": 4 * raw * source_jerk_jump / d**3,
    })
    print(json.dumps({
        "grade": "algebraic event evaluation from bounded numerical incoming data; not an interval certificate",
        "units": "c_f=1; K=1; times and lengths divided by initial half-separation a",
        "incoming_cap_event": event,
        "next_event": "reception of partner emissions made at S=T_j",
        "received_history_join": row,
    }, indent=2))
