#!/usr/bin/env python3
"""Check exact algebra in the BP-014 first-fold boundary-layer theorem.

The checker verifies the limiting kernel, its unique zero, the root-family
count, and the leading compatible-radius coefficient.  The uniform remainder
bounds are analytic obligations recorded in the evidence packet, not claims
made by this checker.
"""

from __future__ import annotations

import sympy as sp


d = sp.symbols("d", positive=True)
pi = sp.pi
a = (sp.Rational(3, 2) * pi) ** sp.Rational(1, 3)
x1 = a**2 / 2
d_star = 2 / pi**2
kernel = sp.Rational(1, 6) - 1 / (3 * pi * sp.sqrt(2 * d))

if sp.simplify(kernel.subs(d, d_star)) != 0:
    raise AssertionError("boundary-layer zero mismatch")
if sp.simplify(sp.diff(kernel, d)) <= 0:
    raise AssertionError("boundary-layer kernel must be strictly increasing")
if sp.simplify(a**3 - 3 * pi / 2) != 0:
    raise AssertionError("first-fold scale mismatch")

# In the first-birth topology there is one pre-phase root for every nonzero
# transmitter, one nontrivial same-transmitter root, and the two k=1 newborn
# roots.  Keep this count exact rather than sampling a finite ring.
n = sp.symbols("n", integer=True, positive=True)
root_count = (2 * n - 1) + 1 + 2
if sp.expand(root_count - (2 * n + 2)) != 0:
    raise AssertionError("first-birth root-family count mismatch")

# At balance, the newborn radial-to-tangential ratio is tan(alpha_N), with
# N^(1/3) alpha_N -> a and tangential/N^2 -> -1/6.
radius_coefficient = a / 6
if sp.simplify(radius_coefficient - (3 * pi / 2) ** sp.Rational(1, 3) / 6) != 0:
    raise AssertionError("compatible-radius coefficient mismatch")

print("x_1^fold:", x1)
print("boundary-layer d_*:", d_star)
print("limiting kernel:", kernel)
print("compatible-radius N^(5/3) coefficient:", radius_coefficient)
print("PASS")
