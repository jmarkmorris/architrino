#!/usr/bin/env python3
"""Independent high-precision incoming oracle for the MEC-007 mirror event.

This instrument is deliberately separate from ``src/eom``.  It imports only
the Python standard library and mpmath, restates the reduced mirror equations,
and never reads EOM solver output or fixtures.

For the positive half-position q and inward speed u=-dq/dT, the unique
opposite-label emission time s<T is the zero of

    F_T(s) = q(T) + q(s) - (T-s).

On the incoming strictly subfield chart F'_T(s)=1-u(s)>0, so a retained-history
sign bracket proves exactly one partner root.  The same inequality makes
x(T)-T strictly decreasing for either label, proving that no positive-delay
self root exists.  The one admitted acceleration magnitude is

    du/dT = K / ((T-s)^2 * (1-u(s))).

The oracle advances this delay equation with explicit RK4.  Delayed values are
represented independently by either linear or cubic-Hermite interpolation.
It stops at the first interpolated event u=1 and emits refinement and section
ledgers.  Numerical refinement measures the stationary input; the analytic
monotonicity arguments carry the complete root census and first-event scope.

No post-threshold history, boundary value, conservation account, or physical
interpretation is supplied.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import math
from dataclasses import dataclass
from pathlib import Path
from typing import Any

import mpmath as mp


REPO_ROOT = Path(__file__).resolve().parents[2]
SCHEMA = "mec007_stationary_mirror_incoming_oracle/v1"
# The fixture's global coupling is 36*K and each label has magnitude 1/6;
# the reduced one-partner mirror row therefore has coefficient K.
K_TEXT = "0.2862286103053385"
HISTORY_START_TEXT = "-20"
INITIAL_Q_TEXT = "0.5"
SECTION_SPEEDS = ("0.25", "0.5", "0.75", "0.9", "0.99", "1")
TIME_CHECKPOINTS = ("1.24", "1.395")


@dataclass(frozen=True)
class Configuration:
    name: str
    step: str
    decimal_digits: int
    root_tolerance: str
    history_representation: str


FULL_CONFIGURATIONS = (
    Configuration("linear_coarse", "0.001", 50, "1e-35", "linear"),
    Configuration("hermite_coarse", "0.001", 50, "1e-35", "cubic_hermite"),
    Configuration("hermite_medium", "0.0005", 70, "1e-50", "cubic_hermite"),
    Configuration("hermite_fine", "0.00025", 90, "1e-65", "cubic_hermite"),
)

QUICK_CONFIGURATIONS = (
    Configuration("quick_linear", "0.004", 35, "1e-22", "linear"),
    Configuration("quick_hermite", "0.002", 45, "1e-30", "cubic_hermite"),
)


def token(value: mp.mpf, digits: int = 24) -> str:
    return mp.nstr(value, n=digits, strip_zeros=False, min_fixed=-12, max_fixed=12)


def sha256_bytes(value: bytes) -> str:
    return hashlib.sha256(value).hexdigest()


class IncomingHistory:
    def __init__(self, step: mp.mpf, representation: str, root_tolerance: mp.mpf):
        self.step = step
        self.representation = representation
        self.root_tolerance = root_tolerance
        self.times = [mp.mpf("0")]
        self.q = [mp.mpf(INITIAL_Q_TEXT)]
        self.u = [mp.mpf("0")]
        self.a = [mp.mpf("0")]
        self.emission = [mp.mpf("-1")]
        self.range = [mp.mpf("1")]
        self.transmitter_factor = [mp.mpf("1")]
        self.root_residual = [mp.mpf("0")]
        self.terminal_time_bracket_width = mp.mpf("0")

    def _segment_index(self, time: mp.mpf) -> int:
        index = int(mp.floor(time / self.step))
        return max(0, min(index, len(self.times) - 2))

    def delayed_state(self, time: mp.mpf) -> tuple[mp.mpf, mp.mpf]:
        if time <= 0:
            return mp.mpf(INITIAL_Q_TEXT), mp.mpf("0")
        if len(self.times) < 2 or time > self.times[-1]:
            raise ValueError("delayed query is outside completed history")
        index = self._segment_index(time)
        left = self.times[index]
        width = self.times[index + 1] - left
        z = (time - left) / width
        q0, q1 = self.q[index], self.q[index + 1]
        u0, u1 = self.u[index], self.u[index + 1]
        if self.representation == "linear":
            return q0 + z * (q1 - q0), u0 + z * (u1 - u0)
        h00 = 2 * z**3 - 3 * z**2 + 1
        h10 = z**3 - 2 * z**2 + z
        h01 = -2 * z**3 + 3 * z**2
        h11 = z**3 - z**2
        q_value = h00 * q0 + h10 * width * (-u0) + h01 * q1 + h11 * width * (-u1)
        u_value = h00 * u0 + h10 * width * self.a[index] + h01 * u1 + h11 * width * self.a[index + 1]
        return q_value, u_value

    def partner_root(self, reception: mp.mpf, current_q: mp.mpf) -> tuple[mp.mpf, mp.mpf, mp.mpf]:
        lower = mp.mpf(HISTORY_START_TEXT)
        upper = min(reception, self.times[-1])

        def residual(emission: mp.mpf) -> mp.mpf:
            delayed_q, _ = self.delayed_state(emission)
            return current_q + delayed_q - (reception - emission)

        lower_value = residual(lower)
        upper_value = residual(upper)
        if not (lower_value < 0 < upper_value):
            raise ValueError(
                f"partner root lacks retained-history sign bracket at T={reception}: "
                f"F(lower)={lower_value}, F(upper)={upper_value}"
            )
        required = max(1, int(mp.ceil(mp.log((upper - lower) / self.root_tolerance, 2))) + 2)
        for _ in range(required):
            middle = (lower + upper) / 2
            value = residual(middle)
            if value < 0:
                lower = middle
            else:
                upper = middle
        emission = (lower + upper) / 2
        return emission, residual(emission), upper - lower

    def evaluate_derivative(self, reception: mp.mpf, current_q: mp.mpf, current_u: mp.mpf) -> tuple[mp.mpf, mp.mpf, mp.mpf, mp.mpf, mp.mpf]:
        emission, residual, bracket_width = self.partner_root(reception, current_q)
        _, delayed_u = self.delayed_state(emission)
        causal_range = reception - emission
        transmitter_factor = 1 - delayed_u
        if causal_range <= 0 or transmitter_factor <= 0:
            raise ValueError("incoming regular chart lost positive range or transmitter factor")
        acceleration = mp.mpf(K_TEXT) / (causal_range**2 * transmitter_factor)
        return -current_u, acceleration, emission, residual, bracket_width

    def initialize_acceleration(self) -> None:
        _, acceleration, emission, residual, _ = self.evaluate_derivative(
            self.times[0], self.q[0], self.u[0]
        )
        self.a[0] = acceleration
        self.emission[0] = emission
        self.range[0] = self.times[0] - emission
        self.transmitter_factor[0] = 1 - self.delayed_state(emission)[1]
        self.root_residual[0] = residual

    def _trial_step(self, width: mp.mpf) -> tuple[mp.mpf, mp.mpf]:
        time = self.times[-1]
        q0, u0 = self.q[-1], self.u[-1]
        h = width
        k1q, k1u, _, _, _ = self.evaluate_derivative(time, q0, u0)
        k2q, k2u, _, _, _ = self.evaluate_derivative(
            time + h / 2, q0 + h * k1q / 2, u0 + h * k1u / 2
        )
        k3q, k3u, _, _, _ = self.evaluate_derivative(
            time + h / 2, q0 + h * k2q / 2, u0 + h * k2u / 2
        )
        k4q, k4u, _, _, _ = self.evaluate_derivative(
            time + h, q0 + h * k3q, u0 + h * k3u
        )
        q1 = q0 + h * (k1q + 2 * k2q + 2 * k3q + k4q) / 6
        u1 = u0 + h * (k1u + 2 * k2u + 2 * k3u + k4u) / 6
        return q1, u1

    def step_once(self) -> None:
        time = self.times[-1]
        width = self.step
        q1, u1 = self._trial_step(width)
        if u1 >= 1:
            lower, upper = mp.mpf("0"), width
            for _ in range(180):
                middle = (lower + upper) / 2
                _, middle_u = self._trial_step(middle)
                if middle_u < 1:
                    lower = middle
                else:
                    upper = middle
            width = (lower + upper) / 2
            self.terminal_time_bracket_width = upper - lower
            q1, _ = self._trial_step(width)
            u1 = mp.mpf("1")
        time1 = time + width
        _, a1, emission, residual, _ = self.evaluate_derivative(time1, q1, u1)
        delayed_u = self.delayed_state(emission)[1]
        self.times.append(time1)
        self.q.append(q1)
        self.u.append(u1)
        self.a.append(a1)
        self.emission.append(emission)
        self.range.append(time1 - emission)
        self.transmitter_factor.append(1 - delayed_u)
        self.root_residual.append(residual)


def hermite_value(y0: mp.mpf, y1: mp.mpf, dy0: mp.mpf, dy1: mp.mpf, width: mp.mpf, z: mp.mpf) -> mp.mpf:
    h00 = 2 * z**3 - 3 * z**2 + 1
    h10 = z**3 - 2 * z**2 + z
    h01 = -2 * z**3 + 3 * z**2
    h11 = z**3 - z**2
    return h00 * y0 + h10 * width * dy0 + h01 * y1 + h11 * width * dy1


def event_at_speed(history: IncomingHistory, target: mp.mpf) -> dict[str, mp.mpf]:
    right = next(index for index, speed in enumerate(history.u) if speed >= target)
    if history.u[right] == target:
        left = right
        z = mp.mpf("0")
    else:
        left = right - 1
        lo, hi = mp.mpf("0"), mp.mpf("1")
        for _ in range(180):
            middle = (lo + hi) / 2
            speed = hermite_value(
                history.u[left], history.u[right], history.a[left], history.a[right],
                history.times[right] - history.times[left], middle,
            )
            if speed < target:
                lo = middle
            else:
                hi = middle
        z = (lo + hi) / 2
    width = history.times[right] - history.times[left] if right != left else mp.mpf("0")
    reception = history.times[left] + z * width
    if right == left:
        q_value = history.q[left]
    else:
        q_value = hermite_value(
            history.q[left], history.q[right], -history.u[left], -history.u[right], width, z
        )
    emission, residual, root_width = history.partner_root(reception, q_value)
    _, delayed_u = history.delayed_state(emission)
    causal_range = reception - emission
    transmitter_factor = 1 - delayed_u
    acceleration = mp.mpf(K_TEXT) / (causal_range**2 * transmitter_factor)
    return {
        "reception": reception,
        "q": q_value,
        "coordinate_separation": 2 * q_value,
        "emission": emission,
        "range": causal_range,
        "emission_speed": delayed_u,
        "transmitter_factor": transmitter_factor,
        "receiver_factor": 1 + target,
        "acceleration_per_receiver": acceleration,
        "signed_relative_acceleration_integral": 2 * target,
        "total_variation": 2 * target,
        "retained_history_margin": emission - mp.mpf(HISTORY_START_TEXT),
        "root_residual": residual,
        "root_bracket_width": root_width,
    }


def checkpoint_at_time(history: IncomingHistory, reception: mp.mpf) -> dict[str, mp.mpf]:
    if not (0 <= reception <= history.times[-1]):
        raise ValueError("time checkpoint lies outside the incoming trajectory")
    right = next(index for index, time in enumerate(history.times) if time >= reception)
    if history.times[right] == reception:
        q_value = history.q[right]
        u_value = history.u[right]
    else:
        left = right - 1
        width = history.times[right] - history.times[left]
        z = (reception - history.times[left]) / width
        q_value = hermite_value(
            history.q[left], history.q[right], -history.u[left], -history.u[right], width, z
        )
        u_value = hermite_value(
            history.u[left], history.u[right], history.a[left], history.a[right], width, z
        )
    emission, residual, root_width = history.partner_root(reception, q_value)
    _, delayed_u = history.delayed_state(emission)
    causal_range = reception - emission
    transmitter_factor = 1 - delayed_u
    acceleration = mp.mpf(K_TEXT) / (causal_range**2 * transmitter_factor)
    return {
        "reception": reception,
        "q": q_value,
        "coordinate_separation": 2 * q_value,
        "receiver_speed": u_value,
        "emission": emission,
        "range": causal_range,
        "emission_speed": delayed_u,
        "transmitter_factor": transmitter_factor,
        "receiver_factor": 1 + u_value,
        "acceleration_per_receiver": acceleration,
        "signed_relative_acceleration_integral": 2 * u_value,
        "total_variation": 2 * u_value,
        "retained_history_margin": emission - mp.mpf(HISTORY_START_TEXT),
        "root_residual": residual,
        "root_bracket_width": root_width,
    }


def solve(configuration: Configuration) -> dict[str, Any]:
    with mp.workdps(configuration.decimal_digits):
        history = IncomingHistory(
            mp.mpf(configuration.step),
            configuration.history_representation,
            mp.mpf(configuration.root_tolerance),
        )
        history.initialize_acceleration()
        while history.u[-1] < 1:
            if len(history.times) > 20000:
                raise RuntimeError("stationary event was not reached inside the step budget")
            history.step_once()
        sections = {speed: event_at_speed(history, mp.mpf(speed)) for speed in SECTION_SPEEDS}
        checkpoints = {
            time: checkpoint_at_time(history, mp.mpf(time)) for time in TIME_CHECKPOINTS
        }
        terminal = sections["1"]
        terminal_time = terminal["reception"]
        incoming_indices = [
            index for index, time in enumerate(history.times) if time <= terminal_time
        ]
        incoming_ranges = [history.range[index] for index in incoming_indices] + [terminal["range"]]
        incoming_factors = [
            history.transmitter_factor[index] for index in incoming_indices
        ] + [terminal["transmitter_factor"]]
        incoming_emissions = [
            history.emission[index] for index in incoming_indices
        ] + [terminal["emission"]]
        incoming_residuals = [
            history.root_residual[index] for index in incoming_indices
        ] + [terminal["root_residual"]]

        trapezoid = mp.mpf("0")
        for index in range(1, len(history.times)):
            if history.times[index] <= terminal_time:
                width = history.times[index] - history.times[index - 1]
                trapezoid += width * (history.a[index - 1] + history.a[index]) / 2
            else:
                width = terminal_time - history.times[index - 1]
                trapezoid += width * (history.a[index - 1] + terminal["acceleration_per_receiver"]) / 2
                break

        def render(values: dict[str, mp.mpf]) -> dict[str, str]:
            return {key: token(value) for key, value in values.items()}

        return {
            "configuration": {
                "name": configuration.name,
                "step": configuration.step,
                "decimal_digits": configuration.decimal_digits,
                "root_tolerance": configuration.root_tolerance,
                "history_representation": configuration.history_representation,
            },
            "accepted_steps_through_bracket": len(history.times) - 1,
            "terminal_time_bracket_width": token(history.terminal_time_bracket_width),
            "terminal": render(terminal),
            "trajectory_extrema": {
                "minimum_q": token(terminal["q"]),
                "minimum_coordinate_separation": token(terminal["coordinate_separation"]),
                "minimum_delayed_range": token(min(incoming_ranges)),
                "minimum_abs_transmitter_factor": token(min(incoming_factors)),
                "minimum_retained_history_margin": token(min(
                    emission - mp.mpf(HISTORY_START_TEXT) for emission in incoming_emissions
                )),
                "maximum_abs_root_residual": token(max(abs(value) for value in incoming_residuals)),
            },
            "quadrature": {
                "relative_acceleration_trapezoid": token(2 * trapezoid),
                "relative_acceleration_velocity_identity": token(mp.mpf("2")),
                "absolute_difference": token(abs(2 * trapezoid - 2)),
            },
            "time_checkpoints": {time: render(values) for time, values in checkpoints.items()},
            "sections": {speed: render(values) for speed, values in sections.items()},
        }


def build_receipt(configurations: tuple[Configuration, ...], quick: bool) -> dict[str, Any]:
    runs = [solve(configuration) for configuration in configurations]
    terminal_times = [mp.mpf(run["terminal"]["reception"]) for run in runs]
    terminal_q = [mp.mpf(run["terminal"]["q"]) for run in runs]
    terminal_range = [mp.mpf(run["terminal"]["range"]) for run in runs]
    terminal_factor = [mp.mpf(run["terminal"]["transmitter_factor"]) for run in runs]
    return {
        "schema": SCHEMA,
        "authority": "independently authored high-precision incoming stationary-mirror oracle",
        "scope": "stationary separated-at-rest mirror history through the first u=1 reception event; no continuation",
        "normalization": {"c_f": "1", "K": K_TEXT, "initial_q": INITIAL_Q_TEXT},
        "provenance": {
            "oracle_path": "scripts/eom/stationary-mirror-incoming-oracle.py",
            "oracle_sha256": sha256_bytes(Path(__file__).read_bytes()),
            "mpmath_version": mp.__version__,
            "quick_mode": quick,
        },
        "analytic_census": {
            "partner_root_count_per_ordered_channel": 1,
            "partner_completeness_argument": "F_T(-20)<0<F_T(T) and dF_T/ds=1-u(s)>0 on the retained incoming chart",
            "positive_delay_self_root_count_per_label": 0,
            "self_completeness_argument": "x(T)-T is strictly decreasing while u(T)<1; the zero-delay diagonal is excluded",
            "terminal_event": "first receiver field-speed event u=1 at positive q and partner delay",
        },
        "runs": runs,
        "refinement_envelope": {
            "terminal_reception_span": token(max(terminal_times) - min(terminal_times)),
            "terminal_q_span": token(max(terminal_q) - min(terminal_q)),
            "terminal_range_span": token(max(terminal_range) - min(terminal_range)),
            "terminal_transmitter_factor_span": token(max(terminal_factor) - min(terminal_factor)),
        },
        "same_event_and_measure_disposition": {
            "exact_diagonal": "excluded by strict positive-delay admission T_t<T_r",
            "open_side": "any continuous genuine u>1 extension births one self root per label",
            "limiting_measure": "not locally finite: A_s dT_r = K_s d(rho)/(rho^2(w_-+w_+)) has infinite total variation and fixed-sign inward integral",
            "disposition": "Not advanced",
        },
        "claim_boundary": {
            "does_not_establish": [
                "a post-threshold continuation", "passage", "rebound", "coordinate crossing",
                "an outgoing retained history", "a boundary value", "conservation", "physical realization",
                "MEC closure", "EOM solver acceptance",
            ]
        },
    }


def validate_receipt(receipt: dict[str, Any]) -> None:
    if receipt.get("schema") != SCHEMA:
        raise ValueError("unsupported receipt schema")
    if receipt.get("normalization", {}).get("c_f") != "1":
        raise ValueError("oracle must use normalized wake speed c_f=1")
    runs = receipt.get("runs", [])
    if len(runs) < 2:
        raise ValueError("at least two refinement runs are required")
    for run in runs:
        terminal = run["terminal"]
        if not (mp.mpf(terminal["q"]) > 0 and mp.mpf(terminal["range"]) > 0):
            raise ValueError("terminal positive separation or delay was not preserved")
        if not mp.mpf(terminal["transmitter_factor"]) > 0:
            raise ValueError("terminal partner root is not simple")
        if abs(mp.mpf(terminal["signed_relative_acceleration_integral"]) - 2) > mp.mpf("1e-18"):
            raise ValueError("terminal relative-acceleration identity failed")
        if set(run["sections"]) != set(SECTION_SPEEDS):
            raise ValueError("section ladder is incomplete")
        if set(run["time_checkpoints"]) != set(TIME_CHECKPOINTS):
            raise ValueError("time-checkpoint ledger is incomplete")
    if receipt["analytic_census"]["partner_root_count_per_ordered_channel"] != 1:
        raise ValueError("partner-root census is incomplete")
    if receipt["analytic_census"]["positive_delay_self_root_count_per_label"] != 0:
        raise ValueError("incoming self-root complement is incomplete")
    if receipt["same_event_and_measure_disposition"]["disposition"] != "Not advanced":
        raise ValueError("same-event obstruction disposition changed")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--quick", action="store_true", help="run the bounded two-row smoke refinement")
    parser.add_argument("--write-receipt", type=Path)
    parser.add_argument("--verify-receipt", type=Path)
    args = parser.parse_args()
    if args.verify_receipt:
        receipt = json.loads(args.verify_receipt.read_text(encoding="utf-8"))
        validate_receipt(receipt)
        print(json.dumps({"schema": SCHEMA, "result": "verified"}, separators=(",", ":")))
        return
    configurations = QUICK_CONFIGURATIONS if args.quick else FULL_CONFIGURATIONS
    receipt = build_receipt(configurations, args.quick)
    validate_receipt(receipt)
    rendered = json.dumps(receipt, ensure_ascii=False, indent=2) + "\n"
    if args.write_receipt:
        args.write_receipt.write_text(rendered, encoding="utf-8")
    else:
        print(rendered, end="")


if __name__ == "__main__":
    main()
