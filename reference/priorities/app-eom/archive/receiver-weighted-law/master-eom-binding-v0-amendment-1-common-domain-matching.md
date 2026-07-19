# Master EOM Binding v0 Amendment 1 — Common-Domain Regulator-Limit Matching

## Status

- Amendment id: `master_eom_binding/v0/amendment/1`
- Derivation date: 2026-07-16
- Ratification date: 2026-07-17
- Stage: `ratified-binding-amendment`
- Claim level: `derived-and-operator-ratified`
- Amended binding: [master-eom-binding-v0.md](master-eom-binding-v0.md)
- Owning packet:
  [finite-width-close-approach-caustic-route.md](finite-width-close-approach-caustic-route.md)
- Owning queue item: `coupled_retained_history_integrator`
- Engine authority:
  [independently checked first-transit implementation](evidence/eom-fwc-regulator-matching-remainder-seed-0-2026-07-17.md)
- Oracle authority: none
- Budget change: none
- Frozen binding edited: yes

This file records the derivation and decision rationale for Amendment 1. The
normative common-domain matching condition is incorporated into the frozen
binding. The EOM solver now emits the independently checked regulator-matching
rows and remains fail-closed whenever their complete unchanged-budget test
does not certify.

## Finding In Plain Language

The bound finite-width law has the correct sharp limit. It does not equal the
sharp law at positive causal width and positive core scale, nor does the
frozen binding claim that it does. The comparison corrected by this amendment
omitted the deterministic difference caused by those positive regulators and
compared the two chart integrals using only numerical interpolation and
retained-track remainders. The recorded raw disjoint interval is therefore
consistent with the bound law and does not by itself identify an error in
either certified integral.

The ratified amendment leaves the acceleration law and every budget
unchanged. It makes the common-domain matching remainder explicit and requires
that remainder to fit inside the existing impulse and position-moment budgets.
Literal raw overlap at positive regulator values is replaced by overlap after
adding the certified regulator-matching remainder.

Claim grade: `derived`. Falsifier: the expansion below has no positive-width
term, the frozen binding requires equality rather than convergence at positive
regulator values, or an independently evaluated zero-regulator limit of the
bound law does not recover the sharp root sum.

## Import Test

The derivation uses a change of variable, Taylor expansion, Gaussian moments,
and matched asymptotic bookkeeping. These are mathematical techniques. The
only dynamical inputs are the bound delayed residual $g_{ij}$, the source and
receiver normals, the bound core kernel, polarity, retained path history, and
absolute-time integration. No standard-physics law, constant, ontology, or
mechanism enters as a premise.

Claim grade: `derived`. Falsifier: any step below requires a force law,
spacetime structure, mass, field equation, or constitutive premise not already
present in `master_eom_binding/v0`.

## Common-Domain Setup

Fix one ordered pair $(i,j)$ and a compact reception interval
$C=[T_a,T_b]$. Assume:

1. the accepted retained histories cover the complete reception/emission
   domain used below;
2. the sharp root set contains finitely many root branches $S_a(T)$ on $C$;
3. every branch is simple, with $|D_{s,ij}(T,S_a(T))|\ge\nu_s>0$;
4. every root tube is isolated, its complement is root-free with a certified
   residual gap, and no root meets the memory boundary;
5. $r_{ij}(T,S)\ge r_{\min}>0$ on the root tubes, so the common domain excludes
   coordinate coincidence and the core-active stratum;
6. the histories and the derived integrand have the derivatives used in the
   bounds below on each retained segment; joins are split into separate cells;
7. each root tube either contains the required Gaussian support or supplies an
   outward Gaussian-tail bound.

Suppress the pair indices and define the complete vector numerator

$$
\mathbf Q_{\epsilon_c}(T,S)
=
\kappa\,\sigma_{ij}|q_iq_j|
\mathbf K_{\epsilon_c}(\mathbf r(T,S))
|D_T(T,S)|
$$

On root tube $a$, use $u=g(T,S)$ as the emission coordinate. The source-normal
floor gives a local inverse $S=S_a(T,u)$. Define

$$
\mathbf P_{\epsilon_c,a}(T,u)
=
\frac{
\mathbf Q_{\epsilon_c}(T,S_a(T,u))
}{
|D_s(T,S_a(T,u))|
}
$$

The sharp branch contribution is

$$
\mathbf A^{\sharp}_a(T)
=
\mathbf P_{0,a}(T,0)
$$

The root-tube portion of the finite-width contribution is

$$
\mathbf A^{(\eta,\epsilon_c)}_a(T)
=
\int
\mathbf P_{\epsilon_c,a}(T,u)
\delta_\eta(u)\,du
$$

The finite-width integral over the certified root-free complement is retained
as a separate Gaussian-leakage remainder. It is not zero at positive $\eta$
merely because the sharp chart has no root there.

Claim grade: `derived`. Falsifier: $\partial_Sg\ne D_s$, the stated
source-normal floor does not give the local inverse, or direct substitution of
$u=g(T,S)$ produces a Jacobian other than $1/|D_s|$.

## Gaussian And Core Expansions

The bound Gaussian has moments

$$
\int_{\mathbb R}\delta_\eta(u)\,du=1,
\qquad
\int_{\mathbb R}u\delta_\eta(u)\,du=0,
\qquad
\int_{\mathbb R}u^2\delta_\eta(u)\,du=\eta^2,
\qquad
\int_{\mathbb R}u^4\delta_\eta(u)\,du=3\eta^4
$$

Therefore, component by component for a $C^4$ extension of the root-tube
integrand,

$$
\mathbf A^{(\eta,\epsilon_c)}_a(T)
=
\mathbf P_{\epsilon_c,a}(T,0)
+
\frac{\eta^2}{2}
\partial_u^2\mathbf P_{\epsilon_c,a}(T,0)
+
\mathbf R_{\eta^4,a}(T)
$$

If
$B_{4,a,k}(T)\ge\sup|\partial_u^4P_{\epsilon_c,a,k}(T,u)|$,
then the full-Gaussian Taylor remainder satisfies

$$
|R_{\eta^4,a,k}(T)|
\le
\frac{\eta^4}{8}B_{4,a,k}(T)
$$

The expansion is applied only where its derivative bound is certified. Any
finite-tube discrepancy from the full Gaussian integral is added outward as a
tail remainder rather than discarded.

At the root, the bound core kernel is exactly a scalar multiple of the sharp
kernel:

$$
\mathbf K_{\epsilon_c}(\mathbf r_a)
=
c_{\epsilon_c,a}\mathbf K_0(\mathbf r_a),
\qquad
c_{\epsilon_c,a}
=
\left(1+\frac{\epsilon_c^2}{r_a^2}\right)^{-3/2}
$$

Hence

$$
\mathbf P_{\epsilon_c,a}(T,0)
=
c_{\epsilon_c,a}\mathbf P_{0,a}(T,0)
$$

and

$$
c_{\epsilon_c,a}
=
1
-
\frac{3}{2}\frac{\epsilon_c^2}{r_a^2}
+
\frac{15}{8}\frac{\epsilon_c^4}{r_a^4}
+
O\!\left(\frac{\epsilon_c^6}{r_a^6}\right)
$$

Combining the two expansions gives the positive-regulator chart difference

$$
\boxed{
\mathbf A^{(\eta,\epsilon_c)}(T)
-
\mathbf A^{\sharp}(T)
=
\sum_a
\left[
-\frac{3\epsilon_c^2}{2r_a^2}
\mathbf A^{\sharp}_a(T)
+
\frac{\eta^2}{2}
\partial_u^2\mathbf P_{0,a}(T,0)
\right]
+
O(\epsilon_c^4+\eta^2\epsilon_c^2+\eta^4)
+
\mathbf E_{\mathrm{tail}}
+
\mathbf E_{\mathrm{comp}}
}
$$

Here $\mathbf E_{\mathrm{tail}}$ is the certified root-tube tail and
$\mathbf E_{\mathrm{comp}}$ is the positive-$\eta$ contribution from the
root-free emission complement. The displayed powers are regulator powers;
their coefficients retain the dimensions supplied by the derivatives and the
bound law.

Claim grade: `derived`. Falsifier: direct symbolic expansion gives a nonzero
odd Gaussian moment, a core coefficient other than $-3/2$, or a stationary
simple-root analytic control violates the stated leading terms as both
regulators decrease independently.

### Exact stationary simple-root control

Take stationary retained source and receiver histories with constant
separation vector $\mathbf r$, $0<r<c_fh$, and zero velocities. Then
$D_s=D_T=c_f$, the unique causal root is $S=T-r/c_f$, and the spatial kernel
is constant over emission time. Writing $\Phi$ for the standard normal
cumulative distribution, direct integration gives

$$
\mathbf A^{(\eta,\epsilon_c)}(T)
=
c_{\epsilon_c}
\mathbf A^{\sharp}(T)
\left[
\Phi\!\left(\frac{r}{\eta}\right)
-
\Phi\!\left(\frac{r-c_fh}{\eta}\right)
\right]
$$

The bracket tends to one when the root remains strictly inside the retained
interval and $\eta\to0^+$, while $c_{\epsilon_c}\to1$ as
$\epsilon_c\to0^+$. At positive regulators the expression is generically not
equal to the sharp acceleration. This exact control separates core attenuation
from finite-memory Gaussian tails without invoking a curved trajectory.

Claim grade: `derived analytic control`. Falsifier: direct evaluation of the
bound emission integral for these stationary histories differs from the
displayed normal-CDF expression.

## Common-Domain Matching Theorem

**Theorem (regulated-to-sharp common-domain matching).** Under the common-
domain assumptions above, the bound finite-width law converges uniformly on
$C$ to the sharp root sum as $\eta\to0^+$ and $\epsilon_c\to0^+$ when the
Gaussian-tail and root-free-complement bounds also tend to zero. The
componentwise leading defect at fixed positive regulators is

$$
\mathbf D_2(T)
=
\sum_a
\left[
-\frac{3\epsilon_c^2}{2r_a^2}
\mathbf A^{\sharp}_a(T)
+
\frac{\eta^2}{2}
\partial_u^2\mathbf P_{0,a}(T,0)
\right]
$$

Pointwise equality through second regulator order requires
$\mathbf D_2(T)=\mathbf0$ or a declared matching term
$-\mathbf D_2(T)$. Integrated second-order terms can also cancel over a
particular interval, but such cancellation requires a certificate and cannot
be assumed. A comparison that does not alter the law must instead carry
$\mathbf D_2$, together with the higher-order, tail, and complement terms, as
an outward regulator-matching remainder. Gaussian normalization alone proves
the zeroth-order limit; its nonzero second moment does not prove positive-width
equality.

For the common-domain impulse and position moment, define

$$
\mathbf I^{\sharp}(C)
=
\int_C\mathbf A^{\sharp}(T)\,dT,
\qquad
\mathbf I^{(\eta,\epsilon_c)}(C)
=
\int_C\mathbf A^{(\eta,\epsilon_c)}(T)\,dT
$$

and

$$
\mathbf M^{\sharp}(C)
=
\int_C(T_1-T)\mathbf A^{\sharp}(T)\,dT,
\qquad
\mathbf M^{(\eta,\epsilon_c)}(C)
=
\int_C(T_1-T)\mathbf A^{(\eta,\epsilon_c)}(T)\,dT
$$

The sharp integrals are regulator-order zero. With

$$
\Delta\mathbf I_2(C)
=
\int_C\mathbf D_2(T)\,dT,
\qquad
\Delta\mathbf M_2(C)
=
\int_C(T_1-T)\mathbf D_2(T)\,dT
$$

the regulated integrals expand as

$$
\mathbf I^{(\eta,\epsilon_c)}(C)
=
\mathbf I^{\sharp}(C)
+
\Delta\mathbf I_2(C)
+
\mathbf R_{I,4}(C)
$$

and

$$
\mathbf M^{(\eta,\epsilon_c)}(C)
=
\mathbf M^{\sharp}(C)
+
\Delta\mathbf M_2(C)
+
\mathbf R_{M,4}(C)
$$

where the two remainder vectors include
$O(\epsilon_c^4+\eta^2\epsilon_c^2+\eta^4)$ and the certified tail and
root-free-complement terms.

A certified component bound

$$
E_{\mathrm{reg},k}(T)
\ge
|A^{(\eta,\epsilon_c)}_k(T)-A^{\sharp}_k(T)|
$$

may be constructed from the exact core factor, a second-derivative Gaussian
bound, the fourth-order remainder when used, and outward tail and complement
bounds. Its integrated rows are

$$
R^{\mathrm{reg}}_{I,k}(C)
=
\int_C E_{\mathrm{reg},k}(T)\,dT
$$

and

$$
R^{\mathrm{reg}}_{M,k}(C)
=
\int_C(T_1-T)E_{\mathrm{reg},k}(T)\,dT
$$

Let $R^{\mathrm{num}}_{I,k}$ and $R^{\mathrm{num}}_{M,k}$ denote the already
derived shortcut-plus-track remainders. Matching at the certified order is
then the componentwise condition

$$
\operatorname{dist}\!\left(
I^{\sharp}_k(C),I^{(\eta,\epsilon_c)}_k(C)
\right)
\le
R^{\mathrm{num}}_{I,k}(C)
+
R^{\mathrm{reg}}_{I,k}(C)
$$

and

$$
\operatorname{dist}\!\left(
M^{\sharp}_k(C),M^{(\eta,\epsilon_c)}_k(C)
\right)
\le
R^{\mathrm{num}}_{M,k}(C)
+
R^{\mathrm{reg}}_{M,k}(C)
$$

The sum of numerical and regulator-matching rows must remain inside the
unchanged event impulse or position-moment budget. A row that exceeds the
existing budget remains an adjudicated halt.

**Proof.** The source-normal floor permits the root-tube change of variable.
Gaussian normalization and evenness give the zeroth and second moments; Taylor
expansion gives the displayed local terms and outward fourth-order remainder.
The exact scalar core factor gives its positive-$\epsilon_c$ difference from
the sharp kernel. Certified residual gaps bound the Gaussian contribution on
the root-free complement, and finite tube boundaries supply the tail rows.
Integrating the pointwise enclosure over $C$, once with unit weight and once
with nonnegative weight $T_1-T$, gives the two stated remainder rows. The
triangle inequality then gives the matching conditions.

Claim grade: `derived`. Falsifier: an analytic simple-root control satisfying
the assumptions lies outside either integrated remainder, or a certified
common-domain row passes while the total numerical plus regulator remainder
exceeds its unchanged event budget.

## Evaluation Of The Frozen Bound Law

The frozen bound law satisfies the theorem's asymptotic matching condition:

- the Gaussian has unit zeroth moment and vanishing first moment;
- the core factor tends to one for every $r\ge r_{\min}>0$;
- the second and higher Gaussian moments vanish as $\eta\to0^+$;
- the root-free-complement leakage vanishes when its certified residual gap is
  fixed and $\eta\to0^+$.

The law does not satisfy literal equality at fixed positive $\eta$ and
$\epsilon_c$ for a general curved retained history. No normalization defect is
present: the first omitted Gaussian term is its lawful second moment, and the
first omitted core term is the lawful Plummer-kernel attenuation. A
zero-second-moment signed mollifier would remove only the $O(\eta^2)$ term; it
would not remove the core term, complement leakage, or all higher finite-width
terms. Replacing the core kernel outside the core stratum would remove only the
core term. Neither is a minimal correction to the stated convergence claim.

The measured `FWC-STATE-01` negative therefore originates in the current
comparison obligation: it requires raw positive-regulator overlap after
adding only $R^{\mathrm{num}}$. It omits $R^{\mathrm{reg}}$, even though the
binding claims convergence in the regulator limit rather than equality at the
declared positive regulator values.

Claim grade: `derived` for satisfaction of the limiting condition and failure
of generic positive-width equality; `inferred` for assigning the recorded gap
to the omitted regulator row before that row is evaluated on the recorded
track. Falsifier: a certified evaluation of the theorem's regulator terms
fails to contain the recorded chart difference, or the raw chart gap does not
decrease under independent $\eta$ and $\epsilon_c$ refinement on a fixed
simple-root common domain.

## Quantitative Seed-0 Prediction

The recorded first side cell for `1004 <- 1006` has raw component-0 impulse
interval distance

$$
g_0=3.51437\times10^{-11}
$$

after the existing complete numerical remainder
$R^{\mathrm{num}}_{I,0}=6.29988\times10^{-16}$ has already been applied. The
ratified amendment changes no law evaluation and therefore predicts that a
same-track rerun will retain this raw gap within the existing interval and
track reproducibility. It also predicts

$$
R^{\mathrm{reg}}_{I,0}
\ge
3.51437\times10^{-11}
$$

for any valid regulator-matching enclosure that explains this row. The
post-accounting disjoint distance is predicted to be

$$
g_{0,\mathrm{matched}}
=
\max\!\left(0,g_0-R^{\mathrm{reg}}_{I,0}\right)
=0
$$

while the total remainder must still remain below the unchanged $10^{-7}$
impulse budget. The second recorded pair, `1004 <- 1002`, analogously requires
$R^{\mathrm{reg}}_{I,0}\ge1.7013\times10^{-10}$ on its failed side cell.

Claim grade: `inferred quantitative prediction`. Falsifier: the independently
implemented regulator enclosure is smaller than the recorded raw interval
distance, the matched intervals remain disjoint, the total row exceeds the
unchanged event budget, or the raw gap disappears without adding the regulator
row.

## Ratified Binding Amendment

The following substance is now bound after the simple-root limit in
`master-eom-binding-v0` without changing either boxed acceleration equation:

> On a certified common simple-root domain, the equality of the sharp and
> finite-width charts is an independently refined regulator-limit statement,
> not literal equality at fixed positive $\eta$ and $\epsilon_c$. A
> positive-regulator comparison must carry an outward matching remainder for
> the core-kernel difference, the nonzero second and higher moments of
> $\delta_\eta$, finite root-tube tails, and finite-width leakage over the
> certified root-free complement. The impulse and position-moment integrals
> may match only after adding this remainder. The regulator-matching remainder,
> numerical quadrature remainder, retained-history remainder, and
> interpolation remainder must sum inside the existing declared error budget.
> Failure to certify that sum is fail-closed. No remainder authorizes the
> sharp quotient where its source-normal floor fails.

The finite-width law, core kernel, regulator values, error budgets, and sharp
caustic prohibition are unchanged.

Claim grade: `derived-and-operator-ratified`. Falsifier: an independent theorem
review finds that this text permits a rejected trajectory to pass without
enclosing the actual chart difference, or the certified regulator remainder
fails its analytic common-domain controls.

## Rejected Alternative: Exact Positive-Regulator Identity

Exact equality wherever both charts are certified at positive regulator
values would require a genuine matching-layer term. The minimal exact
composite is

$$
\mathbf A^{\mathrm{comp}}(T)
=
\mathbf A^{(\eta,\epsilon_c)}(T)
+
\chi_C(T)
\left[
\mathbf A^{\sharp}(T)
-
\mathbf A^{(\eta,\epsilon_c)}(T)
\right]
$$

where $\chi_C=1$ only on a certified common sharp/finite-width domain,
$\chi_C=0$ on the fold/core stratum, and any transition support lies wholly
inside a domain where both terms and their derivatives are certified. It gives
exact sharp equality on $C$ and preserves the finite-width law on the event
stratum. On the recorded first side cell it predicts zero raw chart distance,
hence overlap within the existing $6.29988\times10^{-16}$ numerical remainder.

This alternate changes the law at finite regulator values and makes a chart
selector part of the binding. The operator rejected it in favor of the
regulator-limit relation, which the current law already satisfies. A finite-
order kernel-moment correction is not an exact substitute:
some higher positive-width moment remains and again scales linearly with a
shrinking reception-cell width.

Claim grade: `derived rejected alternative`. Falsifier: the composite differs
from the sharp law where $\chi_C=1$, differs from the finite-width law where
$\chi_C=0$, or a transition contribution cannot be bounded inside the
unchanged event budget.

## Ratification And Promotion Disposition

This amendment is promoted into the priority-owned binding and finite-width
route. No reader-facing corpus promotion is required because neither boxed law
changes. The separately recorded implementation certifies
$R^{\mathrm{reg}}$, the unchanged budget sum, and the first atomic seed-0
transit. Any common-domain row that does not satisfy those same obligations
remains an adjudicated `FWC-STATE-01` halt.
