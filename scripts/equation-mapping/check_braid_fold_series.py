#!/usr/bin/env python3
"""Check exact series used by the BP-011/BP-013/BP-014 fold reductions.

This checker uses symbolic algebra only.  It does not evaluate a prescribed
balance, certify an interval cover, or supply an independent mathematical
oracle.
"""

from __future__ import annotations

import sympy as sp


alpha, r, t = sp.symbols("alpha r t")


def require_zero_through(expression: sp.Expr, variable: sp.Symbol, order: int) -> None:
    truncated = sp.series(expression, variable, 0, order).removeO().expand()
    if truncated != 0:
        raise AssertionError(f"nonzero series through order {order - 1}: {truncated}")


# Low-speed fold: phi = 2(tan(alpha)-alpha), beta = sec(alpha).
alpha_of_r = r * (
    1
    - sp.Rational(2, 15) * r**2
    + sp.Rational(3, 175) * r**4
    - sp.Rational(2, 1575) * r**6
)
require_zero_through(
    2 * (sp.tan(alpha_of_r) - alpha_of_r) - sp.Rational(2, 3) * r**3,
    r,
    11,
)
low_speed_excess = sp.series(1 / sp.cos(alpha_of_r) - 1, r, 0, 10).removeO().expand()
expected_low_speed_excess = (
    sp.Rational(1, 2) * r**2
    + sp.Rational(3, 40) * r**4
    - sp.Rational(1, 2800) * r**6
    - sp.Rational(479, 1008000) * r**8
)
if sp.expand(low_speed_excess - expected_low_speed_excess) != 0:
    raise AssertionError("low-speed fold expansion mismatch")


# High-speed fold: cot(epsilon)+epsilon=A with t=1/A and beta=csc(epsilon).
epsilon_of_t = (
    t
    + sp.Rational(2, 3) * t**3
    + sp.Rational(13, 15) * t**5
    + sp.Rational(146, 105) * t**7
)
require_zero_through(1 / sp.tan(epsilon_of_t) + epsilon_of_t - 1 / t, t, 7)
high_speed_fold = sp.series(1 / sp.sin(epsilon_of_t), t, 0, 7).removeO().expand()
expected_high_speed_fold = (
    1 / t
    - sp.Rational(1, 2) * t
    - sp.Rational(7, 24) * t**3
    - sp.Rational(83, 240) * t**5
)
if sp.expand(high_speed_fold - expected_high_speed_fold) != 0:
    raise AssertionError("high-speed fold expansion mismatch")


# Fixed-level shifted-endpoint pair used by the BP-011 old background.
p, level, sign = sp.symbols("p level sign")
theta = (
    level * p
    - sign * level * p**2
    + (level + level**3 / 6) * p**3
    - sign * (level + sp.Rational(2, 3) * level**3) * p**4
)
secant = sp.series(1 / sp.cos(theta), p, 0, 5).removeO()
endpoint = 1 / (4 * p * (level - sign * theta) ** 2) / (1 + sign * p * secant)
endpoint = sp.series(endpoint, p, 0, 4).removeO().expand()
pair = sp.expand(endpoint.subs(sign, -1) - endpoint.subs(sign, 1))
expected_pair = -1 / (2 * level**2) + p**2 / 12
require_zero_through(pair - expected_pair, p, 4)


print("low-speed beta-1:", expected_low_speed_excess)
print("high-speed beta_fold:", expected_high_speed_fold)
print("fixed-level endpoint pair:", expected_pair)
print("PASS")
