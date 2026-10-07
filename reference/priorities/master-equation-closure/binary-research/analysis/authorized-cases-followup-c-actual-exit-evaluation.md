# Evaluating the signed-gain test on the admitted actual exit information

## Disposition

**Derived subject, pending independent assessment.** The actual local departure information does not certify entry into the [signed angular gain test](authorized-cases-followup-c-signed-gain-entry.md). The obstruction can be quantified: an earlier checkpoint of the same actual departing family can retain a squared-speed defect greater than $500151/10^6$, strictly outward radial velocity greater than $21/100$, and accumulated speed gain from a regular finite entry of less than $18213/10^6$. The gain test would require more than $512796/10^6$ from that entry. These are bounds for a permitted refinement of the existing local proof chart, not claimed numerical bounds for the original frozen exit threshold. The original frozen exit has an existential positive speed defect, and no certified forward signed-gain lower bound.

No phase, sign, amplitude or history has been changed. The independent follow-up reference remains unopened at this freeze. This is an actual-family evaluation of the criterion, not a new numerical target and not a repetition of the established instability theorem.

## 1. What the fixed original exit encloses

The [original nonlinear departure proof](alternatives-screen-2026-10-05-logarithmic-spiral-nonlinear-departure.md) has an entry chart with

$$
z_\eta=\eta\chi_e+o(\eta),\qquad 0<\eta<\eta_0,
$$

and a sampled cone exit with

$$
d_0\le\|u_{N_\eta}\|\le Md_0,\qquad
\|s_{N_\eta}\|\le\|u_{N_\eta}\|.
\tag{1}
$$

The chart and constants are existential. Between samples the physical history stays in a regular chart with complete speed uniformly below one. Let $\bar b<1$ be that chart's physical speed upper bound. At the frozen exit, its actual squared-speed defect is at least $1-\bar b^2>0$. Let $\varepsilon_v$ denote any valid bound for the actual receiving velocity difference from the base in corotating coordinates. The direct bound is

$$
|v(T_{\rm exit})|\le\nu_*+\varepsilon_v,
\qquad
1-|v(T_{\rm exit})|^2\ge1-(\nu_*+\varepsilon_v)^2,
\tag{2}
$$

whenever the right side is positive. A finite chart/evaluation constant times $C_aMd_0$ supplies such an $\varepsilon_v$ abstractly. No numerical value of that constant or of $d_0$ is supplied in the frozen proof. Therefore (2) is not a numerical certificate for its original exit, and I do not assign one.

This alone explains why a rigorous finite unit test cannot be declared satisfied at local departure: the full certified prefix is explicitly inside the strict chart. It does not preclude a later event. The unresolved part is the signed-gain integral after this prefix, before an event or a controlled invariant future.

## 2. Quantitative shortfall at an earlier actual checkpoint

The same local proof allows its threshold to be decreased, without changing any member or its complete input. Use this freedom only to define an earlier checkpoint; do not replace the original frozen exit or its attained set. The equilibrium has similarity position $A=(a,0)$ and corotating physical velocity $v_0=(I+\Omega)A$. On the smaller proof chart require the receiving values

$$
|U-A|\le\frac1{100},\qquad
|W-v_0|\le\frac1{100},\qquad W=U'+(I+\Omega)U.
\tag{3}
$$

The continuous evaluation map from the original $C^1$ history chart gives (3) on a sufficiently small chart. The original sampled cone construction then gives an actual first checkpoint for every sufficiently small positive member, with its entire preceding generated segment in that chart. This uses the already proved local construction, including its between-sample estimate; it supplies no new numerical amplitude or departure time.

The [independent exact spiral admission](alternatives-screen-2026-10-05-logarithmic-spiral-adjudication.md) proves

$$
\frac{277}{1000}<a<\frac{279}{1000},\qquad
\frac{695}{1000}<\nu_*<\frac{697}{1000}.
\tag{4}
$$

Consequently throughout the smaller chart,

$$
|v|<\frac{707}{1000},\qquad
1-|v|^2>\frac{500151}{10^6}>\frac12.
\tag{5}
$$

The radial velocity is positive with a concrete margin. For $e_U=U/|U|$ and $e_0=A/a$, the elementary normalization inequality gives

$$
|e_U-e_0|\le\frac{2|U-A|}{a}.
$$

It follows that

$$
p=e_U\cdot W
\ge a-|W-v_0|-\nu_*|e_U-e_0|
>\frac{277}{1000}-\frac1{100}-\frac{1394}{27700}
>\frac{21}{100}.
\tag{6}
$$

For the last comparison, $(267/1000-21/100)(277/1000)=15789/10^6>13940/10^6$. This is exact rational arithmetic on previously admitted constants. It is not a new scalar computation. Thus neither the inward budget nor the nearly inward-unit criterion is reached during this local checkpoint construction.

At the original fixed finite entry time, differentiable dependence implies $|W_\eta-v_0|<1/1000$ for all sufficiently small positive $\eta$. This decreases only the existential allowed amplitude threshold; it does not select another preparation. Write $E_e$ for squared speed there. Equation (4) yields

$$
\frac{481636}{10^6}<E_e<\frac{487204}{10^6}.
\tag{7}
$$

At every subsequent time up to the smaller checkpoint, (5) and the exact gain identity therefore imply

$$
\int_{\theta_e}^{\theta}W(\varphi)\,d\varphi
=E(\theta)-E_e
<\frac{499849-481636}{10^6}
=\frac{18213}{10^6}.
\tag{8}
$$

The actual required gain from entry satisfies

$$
1-E_e>\frac{512796}{10^6}.
\tag{9}
$$

These inequalities rule out covering the event budget with the certified local departure prefix, for every sufficiently small member of the unchanged family. The remaining defect after that checkpoint is greater than one half. No inference from an arbitrarily small local exit threshold can make this order-one budget vanish. A later nonlinear evolution must provide the missing gain, or enter a different proved event region.

The smaller checkpoint does not assert that the original frozen exit also obeys (3), nor does it reset evolution at that checkpoint. Every later source is still determined by the complete original supplied and generated history. The argument merely quantifies what the local mechanism itself certifies if its freely chosen chart is made explicit in the observable coordinates.

## 3. Why amplitude variation supplies no certified favorable exit phase

The admitted growing pair has nonzero imaginary part. The frozen family fixes a nonzero real modal combination and uses positive amplitude. A change to a different modal phase or to a different endpoint/old-support correction would be a different family realization and is not authorized here. Varying the existing positive amplitude changes the actual time of exit, but the proof does not identify the exiting history with a point on the certified two-dimensional modal plane.

There is an exact mathematical reason that its $o(\eta)$ entry error is insufficient for that identification. As a closed-form analytical control, consider the finite-dimensional linear system

$$
\dot u=\alpha u,\qquad \dot w=\alpha_2w,
\qquad u(0)=\eta,\quad w(0)=\eta^{1+\rho},
\quad \alpha_2>(1+\rho)\alpha>0.
\tag{10}
$$

Its exact solutions are $u=\eta e^{\alpha t}$ and $w=\eta^{1+\rho}e^{\alpha_2t}$. The initial $w$ component is $o(\eta)$. At the putative $u=d_0$ exit time,

$$
w=d_0^{\alpha_2/\alpha}\eta^{1+\rho-\alpha_2/\alpha},
\tag{11}
$$

which grows without bound as $\eta\downarrow0$. In fact the trajectory exits a small ball through $w$ earlier. This exact control is evaluated before applying its logical lesson: a leading initial tangent does not by itself determine the direction at a diverging exit time when additional faster directions are unexcluded. It is not an assertion that the logarithmic equation has such an extra eigenvalue.

The accepted proof explicitly allows further uncomputed growing modes inside $E_u$ and controls their combined norm. Its nonlinear remainder is only uniformly $o(\|z\|)$, not a mode-decoupling estimate. Therefore rotating the certified mode through the amplitude-dependent logarithmic time and choosing a putative favorable phase would omit a load-bearing dominance estimate. The norm cone and compact attained exit set do not supply that estimate. Even if dominance were later proved, a favorable small local phase would still face the strictly positive budget in (5); dominance alone would not settle global fate.

For the currently frozen positive-amplitude family there is thus no proved signed/phase selection that enters the finite event region. This means no such selection follows from its certified information. It does not prove that no actual amplitude has favorable later behavior.

## 4. The exact later lower bound still missing

After a proved actual checkpoint or the original frozen exit, let $E_a$ be the actual squared speed. The unresolved quantitative assertion is a survival-conditional bound

$$
\int_{\theta_a}^{\theta_a+L}
\frac{2[\kappa\sin\delta-y(1+\kappa\cos\delta)]}{d^2D}\,d\theta
>1-E_a,
\tag{12}
$$

with complete actual source-window coverage, or another independently admitted actual event test. The current enclosure bounds the denominator and the sizes of the factors but not their signed integral. In particular the numerator vanishes at the balanced spiral and can have either sign on its regular angular-history chart. Arbitrary test histories showing these signs are not assigned to the family. They show why unsigned local bounds cannot create a one-sided estimate.

For the smaller actual checkpoint above, the right side of (12) exceeds $1/2$. No positive lower bound for the left side over any subsequent controlled interval has been obtained from the existing exit information. All-infinite compactness protects ordinary sources and bounded observables; its exact speed-gain primitive is bounded and has zero long-interval mean, so compactness itself cannot imply a strictly positive drift. Excluding that cancellation requires additional dynamics of the attained return histories.

**Scoped conclusion:** actual branch selection remains unresolved. The concrete failed implication is from the certified norm-cone exit to a positive complete-history signed-gain estimate that covers the remaining order-one speed defect. Numerical phase guessing, a new compatible history, or an abstract viable limiting connection would not close it. This conclusion preserves every accepted local departure and conditional infinite-dispersal theorem.

## Falsifiers, sources and closure

Falsifiers are a defect in the admitted exact bounds (4); failure of physical position/velocity evaluation to be continuous in the original chart; an incorrect normalization inequality in (6); a family realization that is silently changed when taking the smaller chart; or an existing published-in-repository quantitative mode-dominance or actual forward entry estimate omitted from the named sources. A future actual-history proof of (12) would close the gap rather than contradict the local shortfall.

The source identities are the original nonlinear departure SHA-256 `4c0b6b39862e52dc0fb2ab27538586b978f7467ac71e908c0b93364375add785`, the independently admitted angular formulation `51827f415d6f80db330cf9d9021f993939c4959f8986468bdf5c2b24f4238a7c`, and the unchanged criterion subject `ec85f1d03e11ef0ada5581f9c2ad4bde4c76efa0addc62afba40bb27fa38f412`. The first two were measured by scoped `shasum -a 256` before the criterion freeze. The exact spiral interval source and modal realization are the linked original independent admissions; their frozen original instruments are not rerun.

Only this new analytical evaluation is authored in this step. No instrument, physical trajectory, numerical amplitude, alternate equation, history, spectrum, Python process, shared owner edit, Git operation or generator was introduced. Independent assessment is required; no owned computation remains active.
