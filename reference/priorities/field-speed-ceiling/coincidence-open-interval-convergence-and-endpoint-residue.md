# Coincidence open-interval convergence and endpoint residue

**Status:** conditional convergence theorem and exact mirror residue completed.
**Claim grade:** derived on each declared labeled injective simple branch under
the explicit branch-collapse, moving-trace, kernel-convergence, positive-
$D_r$, and competing-stratum separation hypotheses below. No endpoint measure,
coincidence response, outgoing history, or right trace is supplied.

## Purpose

This note closes the retargeted FSC-006a question. The ordinary receiver
measure has a well-defined, parameterization-independent local limit on every
compact subset of the open approach interval. In the exact mirror chart its
total variation has the endpoint residue

$$
\frac{K}{2c_f^2}.
$$

The same calculation proves that these ordinary measures cannot converge to a
finite vector-Radon measure on any neighborhood that contains the coincidence
endpoint. The endpoint therefore remains separately owned event data.

This theorem concerns the ordinary simple-root rows approaching coincidence.
It is not the finite raw source-history measure used by the proposed common
impulse-event aggregation law.

Plainly: ordinary wake receptions settle to one definite measure everywhere
before the final zero-range point. Their size nevertheless grows too strongly
to become a finite ordinary measure at that point. The rate of growth has one
exact coefficient, which is the endpoint residue.

## One labeled branch and its two representations

Fix one ordered source--receiver channel $i\leftarrow j$, retain its source
label and polarity, and write

$$
U_s=(T_{\mathrm c}-W,T_{\mathrm c})
$$

for the open source-time approach interval. Let the $n$th ceiling-admissible
resolution contain an injective ordinary simple-root branch

$$
s=S_n(T),
\qquad
T=T_n(s),
$$

with $D_{t,n},D_{r,n}>0$. After the exact simple-branch change of variables,
its source-clock density is

$$
\mathbf f_n(s)
=
\frac{
\mathbf K_{ij}^{(n)}(T_n(s),s)
}{
D_{r,n}(T_n(s),s)
},
$$

and its pulled-back labeled measure is

$$
d\boldsymbol\mu_n(s)
=
\delta_{(i\leftarrow j)}\otimes
\mathbf f_n(s)\,ds.
$$

For a compact interval $J\Subset U_s$, the corresponding receiver-time
measure is the pushforward

$$
\boldsymbol\eta_{n,J}
=
(T_n)_\#
\left(
\boldsymbol\mu_n\!\restriction_J
\right).
$$

The source-clock and receiver-time forms are the same ordinary rows expressed
with different clocks. No event update is included in either measure.

## Explicit convergence hypotheses

For every compact $J\Subset U_s$, assume:

1. **eventual branch coverage:** $J$ lies in the source domain of the $n$th
   branch for all sufficiently large $n$;
2. **branch collapse:**
   $\sup_{s\in J}|T_n(s)-T_{\mathrm c}|\to0$;
3. **moving-trace and kernel convergence:** for one limit kernel
   $\mathbf K_\ast(T_{\mathrm c},s)$,

   $$
   \mathbf K_{ij}^{(n)}(T_n(\cdot),\cdot)
   \longrightarrow
   \mathbf K_\ast(T_{\mathrm c},\cdot)
   \quad\hbox{in }L^1(J);
   $$

4. **receiver transversality:** for one limit $D_{r,\ast}$,

   $$
   D_{r,n}(T_n(\cdot),\cdot)
   \longrightarrow
   D_{r,\ast}(T_{\mathrm c},\cdot)
   \quad\hbox{uniformly on }J,
   $$

   with a common floor $D_{r,n},D_{r,\ast}\ge d_J>0$ there; and
5. **ownership:** the channel label and polarity do not change, and every
   simultaneous or competing stratum remains in its own labeled measure
   rather than being merged into $\boldsymbol\mu_n$.

These are stronger than uniform path convergence plus $L^1$ velocity
convergence alone. In particular, they state the moving-time trace and kernel
limits that the earlier candidate topology did not imply.

## Local convergence theorem

Define

$$
\mathbf f_\ast(s)
=
\frac{
\mathbf K_\ast(T_{\mathrm c},s)
}{
D_{r,\ast}(T_{\mathrm c},s)
},
\qquad
d\boldsymbol\mu_\ast(s)
=
\delta_{(i\leftarrow j)}\otimes
\mathbf f_\ast(s)\,ds.
$$

Then, on every $J\Subset U_s$,

$$
\boxed{
\left\|
\boldsymbol\mu_n-\boldsymbol\mu_\ast
\right\|_{\mathrm{TV}(J)}
\longrightarrow0.
}
$$

Hence $\boldsymbol\mu_n\to\boldsymbol\mu_\ast$ in the local weak-* topology
of labeled vector-Radon measures on $U_s$.

To prove the result, use the positive $D_r$ floor to write

$$
\begin{aligned}
\|\mathbf f_n-\mathbf f_\ast\|_{L^1(J)}
\le{}&
\frac1{d_J}
\left\|
\mathbf K_n(T_n(\cdot),\cdot)-
\mathbf K_\ast(T_{\mathrm c},\cdot)
\right\|_{L^1(J)}
\\
&+
\frac{
\|\mathbf K_\ast(T_{\mathrm c},\cdot)\|_{L^1(J)}
}{d_J^2}
\left\|
D_{r,n}(T_n(\cdot),\cdot)-
D_{r,\ast}(T_{\mathrm c},\cdot)
\right\|_{L^\infty(J)}.
\end{aligned}
$$

Both terms tend to zero. For absolutely continuous vector measures, this
$L^1$ convergence is exactly total-variation norm convergence.

For the receiver-time representation, branch collapse gives, for every
continuous test function $\boldsymbol\varphi$,

$$
\begin{aligned}
\left\langle\boldsymbol\eta_{n,J},\boldsymbol\varphi\right\rangle
&=
\int_J
\boldsymbol\varphi(T_n(s))\mathbin{\cdot}\mathbf f_n(s)\,ds
\\
&\longrightarrow
\boldsymbol\varphi(T_{\mathrm c})\mathbin{\cdot}
\int_J\mathbf f_\ast(s)\,ds.
\end{aligned}
$$

Therefore every fixed far part has the receiver-time limit

$$
\boxed{
\boldsymbol\eta_{n,J}
\stackrel{\ast}{\rightharpoonup}
\left(
\int_J\mathbf f_\ast(s)\,ds
\right)\delta_{T_{\mathrm c}}.
}
$$

This atom is the limit of one fixed, positive-range truncation. It is not a
finite limit of the complete branch as the truncation is removed.

Plainly: choose any portion of the incoming history that stays a definite
distance from coincidence. Every honest resolving family delivers the same
rows from that portion, and those arrival times collapse to the coincidence
time. The theorem says this precisely and retains the source label.

## Parameterization independence

The measure $\boldsymbol\mu_n$ is obtained from the receiver-time row by an
exact change of variables:

$$
\frac{\mathbf K_n}{D_{t,n}}\,dT
=
\frac{\mathbf K_n}{D_{r,n}}\,ds.
$$

If the same branch is described by any increasing parameter $\theta$, both
sides push forward to the same labeled measure. Total variation is likewise
preserved under an injective reparameterization. The limit and the residue
below are therefore properties of the measure, not of the parameter used to
calculate it.

The cutoff is defined by the model's absolute lookback time
$\tau=T_{\mathrm c}-s$, equivalently by causal range $r=c_f\tau$. It is not a
freely chosen coordinate cutoff.

## Exact mirror residue

For the exact mirror channel,

$$
D_{r,\ast}=2c_f,
\qquad
r=c_f(T_{\mathrm c}-s),
$$

and with $K=\kappa|q_iq_j|$ the limiting total-variation density is

$$
\|\mathbf f_\ast(s)\|
=
\frac{K}{2c_f^2(T_{\mathrm c}-s)^2}.
$$

Let $0<\rho<\rho_0<W$ and

$$
J_{\rho,\rho_0}
=
[T_{\mathrm c}-\rho_0,T_{\mathrm c}-\rho].
$$

Then

$$
\left|
\boldsymbol\mu_\ast
\right|(J_{\rho,\rho_0})
=
\frac{K}{2c_f^2}
\left(
\frac1\rho-\frac1{\rho_0}
\right),
$$

so

$$
\boxed{
\operatorname{Res}_{i\leftarrow j}(T_{\mathrm c})
:=
\lim_{\rho\downarrow0}
\rho
\left|
\boldsymbol\mu_\ast
\right|(J_{\rho,\rho_0})
=
\frac{K}{2c_f^2}.
}
$$

The value is independent of $\rho_0$. Since the cutoff can equally be written
$r\ge c_f\rho$, it is also independent of how the same branch is
parameterized.

The local convergence theorem makes the perturbation-family consistency test
an iterated-limit theorem:

$$
\boxed{
\lim_{\rho\downarrow0}
\rho
\left[
\lim_{n\to\infty}
|\boldsymbol\mu_n|(J_{\rho,\rho_0})
\right]
=
\frac{K}{2c_f^2}.
}
$$

The order matters: first resolve the ordinary branch on every fixed positive-
range truncation, then remove the truncation. Reversing the order asks each
approximant to own the unresolved endpoint and is not this theorem.

Plainly: the last part of the ordinary wake measure is infinite, but its
leading strength is not arbitrary. Multiply the accumulated variation by the
remaining absolute time to coincidence and the result approaches exactly
$K/(2c_f^2)$.

## No finite-Radon endpoint limit

Suppose, contrary to the claim, that the untruncated receiver measures
converge weak-* in a finite vector-Radon space on a closed neighborhood
$N\ni T_{\mathrm c}$. Uniform boundedness would give

$$
\sup_n|\boldsymbol\eta_n|(N)<\infty.
$$

For every fixed $\rho>0$, injectivity of $T_n$ and local total-variation
convergence give

$$
\lim_{n\to\infty}
|\boldsymbol\eta_n|
\left(T_n(J_{\rho,\rho_0})\right)
=
\frac{K}{2c_f^2}
\left(
\frac1\rho-\frac1{\rho_0}
\right).
$$

The right side is unbounded as $\rho\downarrow0$, contradicting the uniform
finite bound. Hence

$$
\boxed{
\text{no finite vector-Radon weak-* endpoint limit exists.}
}
$$

This is a no-go theorem for an ordinary endpoint measure, not a terminal-
motion theorem. An endpoint atom, a common impulse-event aggregate, or another
event datum must be separately typed and cannot be obtained by silently
calling the divergent ordinary branch a finite Radon measure.

## Relation to the common impulse-event measure

The two objects answer different questions:

- $\boldsymbol\mu_\ast$ is the locally finite ordinary receiver measure on
  the open positive-range approach interval. Its endpoint variation diverges.
- The common impulse-event measure is a proposed finite signed aggregation of
  the two retained raw source-history records on the exact nonordinary event
  carrier. Under exact mirror symmetry, those matched event records cancel.

The present theorem neither proves nor refutes that proposed event law. It
keeps the ordinary approach rows, source labels, polarities, and every
competing wake contribution intact until the separately owned event boundary.

Plainly: the ordinary rows approaching the event can diverge in total
variation while the separately defined equal-and-opposite event records add
to zero. One is an approach measure; the other is a proposed event operation.
They must not be substituted for one another.

## Claim boundary and falsifiers

The following are derived under the explicit hypotheses above:

1. local total-variation, hence local weak-*, convergence on $U_s$;
2. the fixed-far-part receiver-time atom;
3. the exact mirror residue $K/(2c_f^2)$ and its iterated family-consistency
   identity; and
4. nonexistence of a finite vector-Radon limit on a closed endpoint
   neighborhood.

The theorem is falsified by a labeled injective simple-root family satisfying
all five hypotheses for which the local total-variation limit or the iterated
residue differs. It does not claim that every ceiling-admissible perturbation
automatically satisfies the moving-trace and kernel hypotheses; a family that
fails them is outside this theorem and must be separately classified.

No coincidence-event update, outgoing retained history, right trace, passage,
rebound, conservation law, stability result, or general unequal-wake
cancellation follows.

## Closure goal

Completed for FSC-006a: use this theorem as the positive-range input to the
separately queued exact-event family completion and right-trace selection.
