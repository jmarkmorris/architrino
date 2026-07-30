# Simple-Cubic Checkerboard Stationary-Release Cancellation Certificate

## Certificate

- **Schema:** `lattice-lab-stationary-cancellation-certificate/v1`
- **Case:** `simple-cubic-checkerboard-stationary-release-v1`
- **Claim grade:** derived
- **Result:** exact zero initial acceleration at every lattice site under the declared receiver-centered inversion-symmetric exhaustion
- **Calculation boundary:** the ideal infinite repeat, exhausted by finite receiver-centered offset sets closed under $\mathbf n\mapsto-\mathbf n$
- **Display boundary:** the dotted sphere is a visual crop only and has no role in the calculation
- **Machine implementation:** `src/apps/lattice-lab/SimpleCubicStationaryLedger.js`
- **Structural verifier:** `scripts/verify-lattice-lab-simple-cubic-checkerboard.mjs`
- **Independent numerical oracle:** `tests/test_lattice_lab_stationary_oracle.py`, using the pre-existing high-precision EOM reference kernel without modifying that kernel

Plainly: this certificate applies to one exact held checkerboard and one named way of taking its infinite sum. It does not infer a result from the spherical picture.

## Declared Case

Let the lattice sites be indexed by $\mathbf g=(g_x,g_y,g_z)\in\mathbb Z^3$ with spacing $d>0$:

$$
\mathbf X_{\mathbf g}(T)=d\mathbf g,
\qquad
\mathbf V_{\mathbf g}(T)=\mathbf 0
$$

for the complete retained history through the release time $T_r$. A site is a positrino when $g_x+g_y+g_z$ is even and an electrino when it is odd. Use normalized wake-speed units $c_f=1$, with equal polarity magnitude $\epsilon$.

Plainly: every site has always been held still, and taking one lattice step changes its polarity.

For receiver $\mathbf g$ and transmitter $\mathbf g+\mathbf n$, where $\mathbf n\ne\mathbf0$, the stationary causal-root equation has the unique partner root

$$
T_t=T_r-d\|\mathbf n\|.
$$

The stationary transmitter has $D_t=1$ and therefore $W^{\mathrm{acc}}=1$. A stationary same-site history has no positive-delay self root; its only coordinate coincidence is the excluded endpoint $T_t=T_r$.

Plainly: every other site contributes one delayed partner row, and the selected site contributes no self row.

## Generative Acceleration Ledger

Define the common acceleration scale

$$
a_0=\frac{\kappa\epsilon^2}{d^2}.
$$

The relative polarity sign depends only on the offset:

$$
\sigma(\mathbf n)=(-1)^{n_x+n_y+n_z}.
$$

Because the canonical line-of-action vector points from the transmitter to the receiver, the normalized partner contribution is

$$
\frac{\mathbf A_{\mathbf n}}{a_0}
=
-\sigma(\mathbf n)\frac{\mathbf n}{\|\mathbf n\|^3}.
$$

Plainly: this equation generates the full partner ledger. Odd-step offsets attract and even-step offsets repel, with the canonical inverse-square magnitude.

## Inversion-Pair Theorem

**Theorem.** For every receiver site $\mathbf g$ and every nonzero transmitter offset $\mathbf n$,

$$
\mathbf A_{-\mathbf n}=-\mathbf A_{\mathbf n}.
$$

**Proof.** Negating an integer leaves its parity unchanged modulo two, so

$$
\sigma(-\mathbf n)
=
(-1)^{-n_x-n_y-n_z}
=
(-1)^{n_x+n_y+n_z}
=
\sigma(\mathbf n).
$$

The two rows also have the same separation, root delay, transmitter factor, acceleration weight, and charge-product magnitude. Substitution into the generative row gives

$$
\frac{\mathbf A_{-\mathbf n}}{a_0}
=
-\sigma(-\mathbf n)\frac{-\mathbf n}{\|-\mathbf n\|^3}
=
\sigma(\mathbf n)\frac{\mathbf n}{\|\mathbf n\|^3}
=
-\frac{\mathbf A_{\mathbf n}}{a_0}.
$$

Therefore every admitted inversion pair has exact zero vector sum. For any finite receiver-centered exhaustion set $E$ satisfying $E=-E$ and $\mathbf0\notin E$,

$$
\sum_{\mathbf n\in E}\mathbf A_{\mathbf n}
=
\mathbf0.
$$

The declared exhaustion limit is consequently zero at every receiver.

Plainly: each source has an equally distant source on the opposite side with the same polarity relationship. Their acceleration rows are exact opposites, so every finite centered stage sums to zero.

## First Two Displayed Shells

For an electrino receiver, the nearest shell contains six positrinos at $d$. It forms three inversion pairs. The next local shell contains twelve electrinos at $\sqrt2d$. It forms six inversion pairs. Each of the nine displayed pairs sums to zero separately.

These eighteen rows are an explanatory prefix of the generative infinite ledger. They do not establish the infinite result by themselves; the inversion-pair theorem supplies that result under the declared exhaustion.

Plainly: the app shows the first nine cancelling pairs, while the theorem explains why the same pairing continues through the entire declared calculation.

## Independent Checks

The structural verifier reconstructs parity, polarity sign, coordinate offset, stationary root delay, and exact integer acceleration numerators independently of the app ledger helpers. It checks centered cube and centered lattice-ball exhaustions for four receivers, both receiver polarities, and cutoffs one through six. A tampered acceleration numerator is the mandatory negative control.

The high-precision Python test reconstructs stationary histories directly with the pre-existing EOM oracle in `scripts/eom/oracle/reference_kernel.py`. It evaluates both displayed shells and centered cube exhaustions without importing the JavaScript implementation. The oracle verifies the stationary root, $W^{\mathrm{acc}}=1$, the per-hit acceleration vectors, and their zero sum.

Plainly: one check audits the exact ledger structure, and a separately implemented EOM kernel recomputes the actual stationary contributions.

## Scope And Falsifiers

This certificate makes no absolute-convergence or order-independent infinite-sum claim. The receiver-centered inversion-symmetric exhaustion is part of the case definition. The result is an initial-acceleration statement for the exact stationary retained history only. It does not establish perturbative stability, later delayed-history evolution, conservation, a physical medium, or an EOM-solver trajectory.

The certificate is overturned if any of the following occurs:

1. a stationary partner offset has more or fewer than one admitted causal root;
2. a stationary row has $W^{\mathrm{acc}}\ne1$;
3. the checkerboard gives different polarity signs to $\mathbf n$ and $-\mathbf n$;
4. an admitted inversion pair has unequal acceleration magnitude or a nonzero vector sum;
5. a finite centered cube or lattice-ball exhaustion has a nonzero exact residual; or
6. the independent high-precision oracle disagrees with the generative row.

Plainly: these are direct, operator-checkable ways the result could fail. None licenses a stability or physical-medium claim even when the cancellation certificate passes.
