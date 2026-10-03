"""Bounded numerical illustration of the second logarithmic history interval.

c_f=1, stationary complete preparation, unchanged logarithmic response.
Stop at receiver speed one or source time T_j; never evolve beyond that event.
This research instrument is not an EOM solver or an interval certificate.
Analytical stationary-source controls run before all target integrations.
"""
import json
from math import exp, pi, sqrt

from scipy.integrate import solve_ivp
from scipy.optimize import brentq
from scipy.special import erf, erfinv


def first_clock(speed, coupling, half_separation=1.0):
    return half_separation * sqrt(2 * pi / coupling) * erf(speed / sqrt(2 * coupling))


def first_range(speed, coupling, half_separation=1.0):
    return 2 * half_separation * exp(-speed * speed / (2 * coupling))


def source_speed(source_time, coupling, half_separation=1.0):
    argument = source_time * sqrt(coupling / (2 * pi)) / half_separation
    return sqrt(2 * coupling) * erfinv(argument)


def integrate(coupling, source, interval, initial, ceiling=1.0, rtol=2e-11, step_count=200):
    # Independent variable is source time; state is receiver speed and delay.
    def equation(s, state):
        speed, delay = state
        emitted_speed = source(s)
        return [coupling / (delay * (1 + speed)),
                -(speed + emitted_speed) / (1 + speed)]

    def speed_event(s, state):
        return state[0] - ceiling

    speed_event.terminal = True
    speed_event.direction = 1
    result = solve_ivp(
        equation, interval, initial, method="DOP853", events=speed_event,
        rtol=rtol, atol=rtol / 100, max_step=(interval[1] - interval[0]) / step_count,
    )
    if not result.success:
        raise RuntimeError(result.message)
    return result


def known_controls():
    # Closed-form stationary-source motion independently fixes the endpoint.
    coupling, a, expected_speed = 0.7, 1.3, 0.4
    expected_delay = first_range(expected_speed, coupling, a)
    expected_source = first_clock(expected_speed, coupling, a) - expected_delay
    result = integrate(coupling, lambda s: 0.0,
                       (-2 * a, expected_source + 0.2), [0.0, 2 * a],
                       ceiling=expected_speed)
    assert result.status == 1
    assert abs(result.t[-1] - expected_source) < 2e-10
    assert abs(result.y[1, -1] - expected_delay) < 2e-10
    assert abs(result.y[0, -1] - expected_speed) < 2e-12
    assert abs(source_speed(first_clock(expected_speed, coupling, a), coupling, a)
               - expected_speed) < 2e-14
    assert abs(brentq(lambda z: z*z - 2, 1, 2) - sqrt(2)) < 2e-12
    print("Known controls PASS before targets: closed-form stationary-source "
          "event time and delay; source-clock inverse; sqrt(2) root.", flush=True)


def second_interval(coupling, rtol=2e-11, step_count=200):
    a = 1.0
    joined_speed = brentq(
        lambda v: first_clock(v, coupling, a) - first_range(v, coupling, a),
        0.0, 1.0, xtol=5e-15,
    )
    joined_time = first_clock(joined_speed, coupling, a)
    result = integrate(coupling, lambda s: source_speed(s, coupling, a),
                       (0.0, joined_time), [joined_speed, joined_time],
                       rtol=rtol, step_count=step_count)
    s = float(result.t[-1])
    speed, delay = map(float, result.y[:, -1])
    emitted_speed = float(source_speed(s, coupling, a))
    emitted_position = first_range(emitted_speed, coupling, a) - a
    position = delay - emitted_position
    assert position > 0
    assert 0 <= emitted_speed < 1
    assert speed <= 1 + 1e-12
    return {
        "K": coupling,
        "event": "excluded speed-one boundary" if result.status == 1 else "source time reaches T_j",
        "first_join_T_over_a": joined_time,
        "first_join_u": joined_speed,
        "T_over_a": s + delay,
        "x_over_a": position,
        "u": speed,
        "S_over_a": s,
        "source_u": emitted_speed,
        "R_over_a": delay,
        "A_times_a": coupling / (delay * (1 - emitted_speed)),
    }


def event_order_residual(coupling):
    row = second_interval(coupling, rtol=5e-13, step_count=400)
    if row["event"] == "source time reaches T_j":
        return row["u"] - 1
    return 1 - row["S_over_a"] / row["first_join_T_over_a"]


if __name__ == "__main__":
    known_controls()
    rows = []
    for coupling in (0.1, 0.25, 0.5, 0.75, 1.0):
        row = second_interval(coupling)
        refined = second_interval(coupling, rtol=5e-13, step_count=400)
        assert row["event"] == refined["event"]
        keys = ("T_over_a", "x_over_a", "u", "S_over_a", "source_u", "A_times_a")
        row["max_absolute_refinement_change"] = max(abs(row[k] - refined[k]) for k in keys)
        assert row["max_absolute_refinement_change"] < 1e-9
        rows.append(row)
    critical = brentq(event_order_residual, 0.5, 0.75, xtol=1e-12)
    print(json.dumps({
        "grade": "bounded numerical integration; analytical controls and tolerance refinement, not interval certification",
        "units": "c_f=1; distances and times scaled by initial half-separation a",
        "equation": "dU/dS=K/[R(1+U)], dR/dS=-(U+u(S))/(1+U)",
        "second_ordering_threshold": critical,
        "near_threshold_state": second_interval(critical, rtol=5e-13, step_count=400),
        "examples": rows,
    }, indent=2))
