#!/usr/bin/env python3

"""Exact Bernstein certificate for the BP-014 regularized-lattice shape sign."""

from math import comb

import sympy as sp


beta, c, u, v = sp.symbols("beta c u v", real=True)

shape_polynomial = (
    2 * beta**3 * c**4
    + 3 * beta**3 * c**3
    - 14 * beta**3 * c**2
    - 28 * beta**3 * c
    - 8 * beta**3
    + 6 * beta**2 * c**3
    - 9 * beta**2 * c**2
    - 60 * beta**2 * c
    - 36 * beta**2
    + 6 * beta * c**2
    - 31 * beta * c
    - 38 * beta
    + 2 * c
    - 11
)

# Map beta in [1, 13/10] and beta*c in [-1, beta] to the unit square.
branch_box = sp.cancel(
    (beta * shape_polynomial).subs(c, (-1 + (beta + 1) * u) / beta)
)
unit_square = sp.expand(branch_box.subs(beta, 1 + sp.Rational(3, 10) * v))
power = sp.Poly(unit_square, u, v)
degree_u = power.degree(u)
degree_v = power.degree(v)
power_coefficients = [
    [power.coeff_monomial(u**i * v**j) for j in range(degree_v + 1)]
    for i in range(degree_u + 1)
]

# For p(x)=sum_i a_i x^i of degree n, the Bernstein coefficient at k is
# sum_{i<=k} a_i * binom(k,i)/binom(n,i). Apply this in both variables.
u_bernstein = [
    [
        sum(
            power_coefficients[i][j]
            * sp.Rational(comb(k, i), comb(degree_u, i))
            for i in range(k + 1)
        )
        for j in range(degree_v + 1)
    ]
    for k in range(degree_u + 1)
]
bernstein = [
    [
        sum(
            u_bernstein[k][j]
            * sp.Rational(comb(ell, j), comb(degree_v, j))
            for j in range(ell + 1)
        )
        for ell in range(degree_v + 1)
    ]
    for k in range(degree_u + 1)
]

flat = [coefficient for row in bernstein for coefficient in row]
assert all(coefficient <= 0 for coefficient in flat)
assert flat.count(0) == 1
assert bernstein[0][0] == 0
assert all(bernstein[k][ell] < 0 for k in range(degree_u + 1) for ell in range(degree_v + 1) if (k, ell) != (0, 0))

print("BP-014 regularized-shape Bernstein certificate")
print(f"degrees: u={degree_u}, v={degree_v}")
print(f"coefficient range: [{min(flat)}, {max(flat)}]")
print("zero coefficients: [(0, 0)]")
print("PASS: beta*H_beta(c) < 0 for 1 <= beta <= 13/10 and -1/beta < c < 1")
