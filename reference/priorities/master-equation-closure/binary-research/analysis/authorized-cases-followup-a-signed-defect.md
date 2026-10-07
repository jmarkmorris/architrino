# Signed residual integrals for the original Maxwell E preparation

**Status: ◐ Derived method, awaiting independent assessment and a fixed retrospective test.** The physical case is unchanged: Section 7 E, opposite-polarity mirror planar pair, $K=c_f=1$, initial speed $3/10$, radius $25/9$, angular rate $27/250$, and the original complete compatible $C^{2,1}$ preparation. The comparison curve retains its separately bounded preparation mismatch. Neither a zero error reset nor a new physical release is introduced.

## What information changes

The [accepted scalar-method obstruction](authorized-cases-ten-hour-a-final-audit.md#reconstruction-of-the-obstruction-and-its-limits) concerns propagation of nonnegative error allowances. The residual of a prescribed comparison is a signed vector: it records the difference between that curve's acceleration and the selected law evaluated on its own complete history. Taking its magnitude before integration can discard cancellation. This note preserves its first two vector integrals while bounding the remaining difference between actual and comparison accelerations by the already accepted complete-domain bounds. It is a new error representation for the same solution, not a modified acceleration law.

Write $x$ for the actual positive member, $y$ for the unchanged comparison, and $F[y](t)$ for the original E response using its full comparison history and certified partner root. Define

$$
d(t)=y''(t)-F[y](t),\qquad
g(t)=F[x](t)-F[y](t),\qquad
e(t)=x(t)-y(t).
$$

The exact identity is $e''=g-d$. Delayed source acceleration belongs to both response evaluations; it is not removed by integrating the residual. On every already accepted receiving cell $[L_j,R_j]$, let $X_j$ be its whole-cell position error and let $s_{X,j},s_{V,j},s_{A,j}$ bound the complete physical source errors. The original physical-frame coefficient theorem supplies

$$
|g(t)|\le G_j:=C_{x,j}(X_j+s_{X,j})+H_{v,j}s_{V,j}+B_j s_{A,j}.
$$

This retrospective use is noncircular: the old proof establishes the receiving and source domains independently of the new signed integral. It does not automatically extend those domains or admit any new cell.

## Endpoint enclosures

For a fixed endpoint $T$ in the accepted prefix, define

$$
I_1(T)=\int_0^T d(t)\,dt,\qquad
I_2(T)=\int_0^T(T-t)d(t)\,dt.
$$

If the unchanged initial mismatch satisfies $|e(0)|\le X_0$ and $|e'(0)|\le V_0$, direct integration yields

$$
e'(T)\in-I_1(T)+\overline B\left(0,V_0+\sum_j h_jG_j\right),
$$

$$
e(T)\in-I_2(T)+\overline B\left(0,X_0+TV_0+\sum_j\frac{h_j(2T-L_j-R_j)}2G_j\right).
$$

Here $h_j=R_j-L_j$ and $\overline B(0,r)$ is the closed Euclidean ball of radius $r$. Sums partition $[0,T]$ exactly, including any final partial cell. Adding the corresponding signed residual integral produces a centered enclosure rather than assigning unrelated signs to every past residual. A rigorous interval enclosure of each component of $I_1,I_2$ gives a directly checkable endpoint velocity or position set. Its norm bound may be intersected with the old bound, because both describe the same actual solution.

On a larger receiving interval, analogous enclosures are required at every time before using a new whole-cell source allowance. An endpoint improvement is not a whole-cell improvement. No new source bin may use the improved endpoint alone.

## Continuous signed quadrature and seams

The comparison is piecewise polynomial with continuous position, velocity and acceleration. Its residual is continuous and locally Lipschitz on a regular complete root chart. Let $d(a)\in D_0$ and $d'(t)\in D_1$ componentwise almost everywhere on $[a,a+h]$. All receiver and source one-sided third derivatives at seams enter $D_1$. The fundamental theorem for Lipschitz functions gives the following interval inclusions, without requiring a continuous jerk:

$$
\int_a^{a+h}d(t)\,dt\in hD_0+\frac{h^2}{2}D_1,
$$

$$
\int_a^{a+h}(T-t)d(t)\,dt
\in\left((T-a)h-\frac{h^2}{2}\right)D_0
+\left(\frac{(T-a)h^2}{2}-\frac{h^3}{3}\right)D_1.
$$

Both integral weights multiplying the derivative are nonnegative for $a+h\le T$. The response derivative follows the actual comparison clock, including its source acceleration and source jerk. A sample of $d$ without a whole-interval derivative enclosure does not prove either inclusion.

## Fixed test and acceptance boundary

The first target is retrospective and finite: the first 128 complete rows of the original accepted v9 prefix, with the same original comparison and complete negative-time source preparation. Each row is subdivided into eight equal exact receiving pieces for signed quadrature. Source roots must have certified brackets and positive transmitter denominator; every selected row must certify its full source window before zero. The target rejects the first positive-source row rather than substituting an endpoint error for a whole source interval. The unchanged v9 preparation mismatch supplies all three source errors, including acceleration.

Known controls must establish exact cancellation for $d(t)=2t-1$ on $[0,1]$, whose first integral is zero and second is $-1/6$, and a continuous piecewise-linear residual with a derivative seam. The original stationary-source and nonzero quadratic comparison controls must also pass before the target. These are mathematical controls, not new physical cases.

The target passes as a method advancement only if at least one new endpoint norm allowance is strictly smaller than its original accepted counterpart, with independently checked signed-integral and source-domain obligations. It cannot establish the physical first event, overcome the later inherited allowance by declaration, or change the strongest actual endpoint. A successful early initializer still needs a complete independently checked continuation to become useful near the event.

Claim grade: derived for the integral identities and conditional enclosures. Falsifiers are a missing residual or source-acceleration term, use of an endpoint bound as whole-cell input, omitted derivative seam, wrong integration sign or weight, changed complete physical history, or an unproved source bracket. Target efficacy is unmeasured at this note's initial freeze.
