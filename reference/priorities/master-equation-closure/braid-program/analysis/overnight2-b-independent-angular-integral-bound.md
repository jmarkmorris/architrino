# Independent angular–first-integral bound review

## Verdict and scope

**Derived and independently accepted without repair.** Every regular periodic normalized limiting orbit with positive radius, $\ell>0$ and zero necessary torque mean satisfies
$$
0<|\mathcal I|\ell^2<\frac{2809}{31250}<\frac9{100}.
$$
Moreover, every such regular periodic orbit with $|\mathcal I|\ell^2\ge2809/31250$ has a strictly positive torque integrand at every phase and hence strictly positive mean. No waveform degree, section, period bound or imposed radius ceiling is needed.

The [frozen subject](overnight2-b-angular-integral-bound.md) SHA-256, measured by native `shasum -a 256`, is `067eaf6861010a34b0d5ccac28412f7d72d98dd2374054a06937cc668a141f40`. This review uses the canonical $K=c_f=1$ normalized simultaneous limiting equation, its independently derived negative mathematical first integral, and the independently reconstructed necessary torque coefficient. It introduces no physical energy premise, arbitrary finite-speed first integral or numerical candidate membership. The proof below checks every scalar constant directly; no new numerical instrument or target is needed.

## Height excursion required by zero torque

The torque mean is
$$
M_\chi=\ell\left\langle\frac{C(h)}{r^2}\right\rangle,\qquad h=z/r,
$$
where
$$
C(h)=\frac{N(h^2)}{12(1+4h^2)^2(1+h^2)},\qquad
N(x)=19-72x-192x^2-128x^3.
$$
For $x\ge0$, its denominator is positive, $N(0)>0$, $N(x)\to-\infty$, and $N'(x)=-72-384x-384x^2<0$. Thus $N$ has exactly one positive zero $x_C$, defining $h_C=\sqrt{x_C}$, with $C>0$ for $|h|<h_C$ and $C<0$ for $|h|>h_C$.

The planar case $z\equiv0$ has $C(0)=19/12>0$ and cannot give zero mean when $\ell>0$. A nonplanar periodic height changes sign: its equation is $\ddot z=-a_z^*(r,z)z$ with a continuous strictly positive coefficient $a_z^*$, so a nonzero nonnegative or nonpositive height throughout a period would contradict the zero mean of $\ddot z$. There is consequently an interval about a height zero where $C(h)>0$. If $|h|\le h_C$ at all phases, the integrand $\ell C(h)/r^2$ would be nonnegative everywhere and positive on that interval. Its mean could not vanish. Therefore zero torque requires
$$
\max|h|>h_C.
$$
This strict conclusion does not depend on the number of height oscillations or any reflection symmetry.

Direct rational evaluation confirms the improved lower comparison. At $x=25/144$,
$$
72x=\frac{25}{2},\qquad192x^2=\frac{625}{108},\qquad128x^3=\frac{15625}{23328},
$$
$$
N(25/144)=\frac{443232-291600-135000-15625}{23328}
=\frac{1007}{23328}>0.
$$
By strict decrease of $N$, $x_C>25/144$ and $h_C>5/12$. In particular, a zero-torque orbit has a phase with $|h|>5/12$. For later positivity comparisons, $N(1/4)=-13<0$ also gives $h_C<1/2$.

## Pointwise first-integral inequality

Write $E=|\mathcal I|=-\mathcal I>0$ and
$$
a(h)=\frac1{\sqrt{1+4h^2}}+\frac1{4\sqrt{1+h^2}}-\frac1{\sqrt3}.
$$
Then $U=-a(h)/r$, and the derived first integral is
$$
-E=\frac12\left(\dot r^2+\dot z^2+\frac{\ell^2}{r^2}\right)-\frac{a(h)}r.
$$
Multiplication by positive $r$ and rearrangement give exactly
$$
Er+\frac{\ell^2}{2r}+\frac r2(\dot r^2+\dot z^2)=a(h).
$$
This verifies the signs of all terms. In particular $a(h)>0$ along any such orbit. The first two terms are positive when $\ell>0$ and have product $E\ell^2/2$. The nonnegative square
$$
\left(\sqrt{Er}-\sqrt{\frac{\ell^2}{2r}}\right)^2\ge0
$$
therefore gives the pointwise bound
$$
\sqrt{2E\ell^2}\le Er+\frac{\ell^2}{2r}\le a(h).
$$
Equality in this intermediate bound is harmless; final strictness will come from the required height excursion and the rational comparisons.

The function $a$ is even, and for $h>0$,
$$
a'(h)=-\frac{4h}{(1+4h^2)^{3/2}}-\frac{h}{4(1+h^2)^{3/2}}<0.
$$
At a phase where $|h|>h_C>5/12$, this yields
$$
\sqrt{2E\ell^2}\le a(h)<a(h_C)<a(5/12).
$$
Positivity before squaring is justified: $a(h)>0$ by the first-integral identity, so both larger comparison values are positive as well. Equivalently the accepted confinement root satisfies $h_U>11/10>h_C$. Hence the stronger symbolic bound
$$
E\ell^2<\frac12a(h_C)^2
$$
is also valid, without a numerical value of $h_C$.

## Explicit constants and direct complementary-region result

The radicals at the rational test height simplify exactly:
$$
a(5/12)=\frac6{\sqrt{61}}+\frac3{13}-\frac1{\sqrt3}.
$$
All numbers in the following comparisons are positive. Squaring or cross multiplication gives
$$
\frac6{\sqrt{61}}<\frac{77}{100}
\quad\text{because}\quad360000<61\cdot5929=361669,
$$
$$
\frac3{13}<\frac{231}{1000}
\quad\text{because}\quad3000<3003,
$$
$$
\frac1{\sqrt3}>\frac{577}{1000}
\quad\text{because}\quad3\cdot577^2=998787<1000000.
$$
The last lower bound has the correct direction for the subtracted reciprocal. Adding gives
$$
a(5/12)<\frac{770+231-577}{1000}=\frac{53}{125}.
$$
Thus $\sqrt{2E\ell^2}<53/125$. Squaring positive quantities gives
$$
E\ell^2<\frac12\left(\frac{53}{125}\right)^2=\frac{2809}{31250}.
$$
The product is strictly positive because $E>0$ and $\ell>0$. Finally,
$$
\frac9{100}-\frac{2809}{31250}=\frac7{62500}>0.
$$
These are exact rational ceilings, not optimized constants.

For the complementary region, assume $E\ell^2\ge2809/31250$ without assuming zero torque. Then $\sqrt{2E\ell^2}\ge53/125$. At any phase with $|h|\ge5/12$, evenness and decrease would give
$$
a(h)\le a(5/12)<53/125\le\sqrt{2E\ell^2},
$$
contradicting the pointwise first-integral bound. Therefore $|h|<5/12<h_C$ at every phase. It follows that $C(h)>0$ pointwise, and $\ell/r^2>0$ makes both the torque integrand and its period mean strictly positive. The equality boundary $E\ell^2=2809/31250$ is included in this positive-torque exclusion. The advertised region $E\ell^2\ge9/100$ is a subset of it.

## Scale invariance and limitations

For clarity, the homogeneity transformation includes a time rescaling. Given a normalized limiting solution, define for $s>0$
$$
r_s(\chi)=s\,r(\chi/s^{3/2}),\qquad
z_s(\chi)=s\,z(\chi/s^{3/2}),\qquad \ell_s=\sqrt{s}\,\ell.
$$
The acceleration scales by $s^{-2}$, matching the degree-minus-two simultaneous acceleration and the centrifugal term. Meridional velocities scale by $s^{-1/2}$, while the primitive scales by $s^{-1}$. Consequently
$$
\mathcal I_s=\mathcal I/s,\qquad
|\mathcal I_s|\ell_s^2=|\mathcal I|\ell^2.
$$
The period becomes $s^{3/2}T$. The height ratio is unchanged and the torque mean scales by the positive factor $s^{-3/2}$, preserving its sign and zero condition. Thus the restriction is genuinely invariant under the normalized equation's homogeneity, rather than an artifact of setting an initial radius to one.

All results require regular periodic normalized limiting motion and the derived negative first integral. They do not assume a physical energy law or apply this integral to arbitrary finite-speed causal-delay trajectories. The positive-rate compact exact-family reduction supplies $\ell>0$ in the present scenario. For a separately admitted negative orientation, the condition for zero torque is unchanged because $\ell^2$ is unchanged, while the sign of the nonzero complementary mean reverses. The zero-angular case is outside this particular strict positive-product theorem.

No finite-speed threshold, orbit existence, numerical candidate membership or sufficiency for full-vector balance follows. The conclusion is a necessary restriction on all regular periodic shapes meeting the stated limiting hypotheses, independent of their Fourier or rational representation.

## Falsifiers, verification and preservation

An error in the polynomial evaluation, the sign or factor of a first-integral term, the derivative of $a$, any of the exact cross products, or the time/constant homogeneity powers would falsify the corresponding step. A regular periodic positive-angular limiting orbit with zero torque and product at or above $2809/31250$ would directly falsify the accepted ceiling; one in the complementary region with nonpositive torque would falsify its direct sign conclusion. A nonperiodic preparation or an arbitrary finite-speed causal-delay orbit is outside those hypotheses.

All evidence is the displayed independent analytical reconstruction. No new numerical target, arithmetic instrument, runtime receipt or resource estimate was needed. This new report is the only reviewer-authored deliverable. The subject, prior proofs/oracles and receipts, parent account and shared owners were not edited. No recursive agent, regular tests, production run, generator or Git mutation was used. No evidence was deleted, moved or replaced, and no replay or remote-backup claim is made. Parent integration remains the receiving disposition step.

Final scoped verification: native `shasum -a 256` reproduced the frozen subject identity above after review. Native `git diff --no-index --check /dev/null` emitted no whitespace diagnostics for this report; exit one denotes the new-file difference. The finite rational arithmetic, first-integral rearrangement, strict torque sign and homogeneity transformation were checked analytically as displayed. These checks support the bounded derivation and source formatting only; no numerical proposal was admitted.
