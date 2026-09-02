# Octahedral Antipodal Face-Diagonal Exclusion

Date: 2026-09-02
Compatibility identifier: `aaa-corpus-advancement`
Status: source-bound continuous strict-sub-field exclusion ready for independent integration review
Queue owner: [BP-016 — Antipodal-Alternating Mixed-Face Octahedral Stratum](../work-queue.md#bp-016--antipodal-alternating-mixed-face-octahedral-stratum)

## Result

For the regular octahedron with vertex order $(+\mathbf e_x,-\mathbf e_x,+\mathbf e_y,-\mathbf e_y,+\mathbf e_z,-\mathbf e_z)$, antipodal-alternating word `+-+-+-`, and rotation axis

$$
\mathbf n=\frac{\mathbf e_x+\mathbf e_y+\mathbf e_z}{\sqrt3},
$$

the outward-rounded interval oracle certifies that the $+\mathbf e_x$ receiver's acceleration projection onto $\mathbf n$ lies in

$$
[-1.9175460254434311,-0.6320427837023777]
$$

throughout $0\leq\beta_f<1$ with $c_f=1$. A rigid rotation about $\mathbf n$ requires zero acceleration along $\mathbf n$, so this fixed-axis stratum cannot satisfy full-vector acceleration balance.

Plainly: the calculated acceleration always has a substantial component along the rotation axis, but rigid circular motion has none. This entire speed chart is therefore excluded.

## Certificate

The checker `scripts/prescribed-path-analysis/oracle/certify_octahedral_antipodal_face_diagonal.py` covers the closed computational box $0\leq\beta_f\leq1$ with 64 accepted boxes and no subdivision. It directly encloses all five partner roots for the declared receiver, uses the strict-sub-field theorem for the complete 30 directed partner roots and absence of nontrivial self roots, and records minimum transmitter factor `0.720319219151570650795674355156852723087312328`.

Run:

```sh
"${AAA_VENV:-../.venv}/bin/python" scripts/prescribed-path-analysis/oracle/certify_octahedral_antipodal_face_diagonal.py
```

Two consecutive outputs were byte-identical at SHA-256 `3ad3ae88c7d4f68806ca3f739b7ab5bbb11fe245f924dcb0dbc7cc675df9dfb5`; the wrapper SHA-256 is `a5e0df64a70e72d4ed92b60f5f66935378d0d2e715e2b37f64a1072af2be5169`.

The separately implemented generic prescribed-history evaluator samples $\beta_f\in\{0.1,0.25,0.5,0.75,0.9,0.99\}$, finds five partner roots for every receiver, and places the declared axis projection inside the certified enclosure. All five focused octahedral checks pass; the test SHA-256 is `da4b7f4165c7836753f2de19919aaeeb7db1c0faca4105f2a1a2960184ef2718`.

This excludes only the face-diagonal extreme ray of the exact generic-axis quotient. It does not exclude the two quotient triangles, another polarity word, field/super-field speed, deformation, evolution, retention, stability, binding, or physical realization.

Plainly: one boundary ray of the generic-axis domain is now proved impossible. The interiors of both axis triangles remain the next mathematical object.

## Falsifier

A nonnegative axis-direction acceleration at any strict-sub-field speed, a missed root, nonpositive transmitter factor, failed interval cover, nonzero prescribed axis projection, or outward-rounding failure overturns the corresponding exclusion.

Closure goal: independently reproduce this boundary-ray exclusion, then seek a uniform obstruction or verified sign-partition over the two exact generic-axis triangles.
