#!/usr/bin/env python3
"""Check the BP-011 fold-boundary lattice coefficient.

This is a symbolic/numerical consistency checker for the analytic derivation.
It does not evaluate a prescribed balance or provide an independent interval
certificate.
"""

from __future__ import annotations

import mpmath as mp
import sympy as sp


mp.mp.dps = 80

h = mp.pi / 6
eta_half = mp.altzeta(mp.mpf("0.5"))
boundary_coefficient = eta_half / (2 * mp.sqrt(2 * h))
balance_coefficient = -eta_half / (27 * mp.sqrt(2 * h))

if not boundary_coefficient > 0:
    raise AssertionError("fold-boundary background coefficient must be positive")
if not balance_coefficient < 0:
    raise AssertionError("first balance correction must be negative")

# At cutoff J, the near-fold interior coefficient and the six terminal
# plus-branch coefficients reduce to two alternating half-power sums.  Their
# limit is 2 eta(1/2).  This checks the finite reindexing identity before the
# analytic alternating-tail bound is applied.
for cutoff in (32, 128, 512, 2048):
    interior = mp.fsum(
        (-1) ** (j + 1) * (j ** mp.mpf("-0.5") + (j + 6) ** mp.mpf("-0.5"))
        for j in range(1, cutoff + 1)
    )
    terminal = mp.fsum((-1) ** (j + 1) * j ** mp.mpf("-0.5") for j in range(1, 7))
    combined = interior + terminal
    error = abs(combined - 2 * eta_half)
    if error > 2 / mp.sqrt(cutoff):
        raise AssertionError(f"alternating boundary identity failed at cutoff {cutoff}")

# The balance algebra is independent of the fold-boundary derivation.  If
# B=3/2+b p^(3/2)+o(p^(3/2)), then 1/(8 B^2) has the asserted coefficient.
p, b = sp.symbols("p b", positive=True)
normalized_offset = sp.series(1 / (8 * (sp.Rational(3, 2) + b * p ** sp.Rational(3, 2)) ** 2), p, 0, 3)
expected = sp.Rational(1, 18) - sp.Rational(2, 27) * b * p ** sp.Rational(3, 2)
if sp.expand(normalized_offset.removeO() - expected) != 0:
    raise AssertionError("balance-offset re-expansion mismatch")

print("eta(1/2):", mp.nstr(eta_half, 30))
print("background beta^(-3/2) coefficient:", mp.nstr(boundary_coefficient, 30))
print("balance beta^(-9/2) coefficient:", mp.nstr(balance_coefficient, 30))
print("PASS")
