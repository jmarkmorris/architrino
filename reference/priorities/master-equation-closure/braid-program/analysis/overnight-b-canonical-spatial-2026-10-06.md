# Overnight B: canonical six-member spatial histories

## Execution record

Bounded research complete; final operational closeout is recorded below. Actual launch recorded by `clock.curr_time`: 2026-10-06 23:29:30 UTC (October 6, 19:29:30 EDT). Fixed deadline: 2026-10-07 11:29:30 UTC (October 7, 07:29:30 EDT), exactly twelve elapsed hours later. The scheduled exploration cutoff was 2026-10-07 09:59:30 UTC (05:59:30 EDT). The assignment permits earlier completion when the selected useful items are complete or demonstrably blocked; this report completes the bounded-obstruction alternative without claiming twelve hours of execution.

Assignment and authority: [coordinator plan](overnight-braid-research-plan-2026-10-06.md), assignment B only. Own this report and `overnight-b-` companions. Shared owners, frozen sources, production solver, other assignments and the coordinator plan remain read-only. No publication, regeneration, worktrees or duplicate scheduler.

Selected scenario: unchanged canonical Master Equation with $K=c_f=1$, all ordinary positive-delay partner and self roots, six alternating-polarity persistent paths with common positive radius, phase and alternating height. No response factor, cap, root truncation, smoothing or event continuation. A collocation result can propose a history but cannot admit an exact reference.

## Work state

Legend: ✓ Done; ◐ In progress; ○ Not done.

1. ✓ Done: reconstructed full vector residual and covariance reduction; static geometry and flat T02/T04 controls passed before target calculations.
2. ✓ Done at declared scope: derived necessary mean identities and completed the six-start finite-amplitude experiment. Its surviving proposal fails full balance; a surrounding parameter box has an independently certified root-domain obstruction. The sampled mean diagnostics alone are not exclusions.
3. ✓ Done through the selected negative-result alternative: independently certified period-independent nonlinear neighborhood exclusions, a sign-change necessary condition and the finite-amplitude parameter-box domain obstruction. No exact nonrigid reference has been found.
4. ○ Blocked by the scientific prerequisite: perturbation analysis requires admission of a new exact reference. None was admitted, so no stability calculation was performed.

## Current mathematical result

Computer-assisted derived and independently checked: in the declared six-member class, every exact relative-periodic history satisfying either neighborhood below has $z\equiv0$. For both references, each of $|r-R_0|,|r'|,|r''|,|p'|,|p''|,|\Omega-\Omega_0|$ is bounded by $2^{-20}$ uniformly in absolute time. The separate height bounds are $|z|\le h$, $|z'|\le4h$, $|z''|\le16h$.

| Admitted flat reference | Height bound $h$ | Independent contraction upper bound | Complete ordinary roots per receiver, including self |
| --- | --- | ---: | --- |
| T02 | $1/32$ | $0.203077066$ | 8, including 1 self root |
| T04 | $1/128$ | $0.086153942$ | 12, including 1 self root |

The [independent anisotropic certificate](overnight-b-independent-anisotropic.md) supplies these outward bounds. The common deformation period may be any finite positive number, all harmonics are allowed, and there is no restriction on accumulated phase amplitude $|p|$. This acceptance uses separately derived scalar perturbation envelopes and continuous-frequency bounds, conditional on the inherited admitted exact flat references. The earlier [isotropic certificate](overnight-b-independent-neighborhood.md), with every waveform quantity bounded by $2^{-24}$, remains valid within this stronger domain.

This excludes all periodic height variations in that neighborhood, including those with zero first amplitude variation. It supplies no bound on height alone when the radius or angular-rate derivatives leave the neighborhood. Disconnected finite-amplitude histories remain open. A second necessary condition, independently derived below, requires every nonzero periodic height on a complete finite ordinary chart to change sign.

A separate finite-amplitude nine-parameter box is also independently excluded from the everywhere-ordinary domain: its source-two causal-root count changes from three to one between two deformation phases, forcing an intervening $D=0$ root for every vector in the box and every positive scale $R$. The [independent scalar reconstruction](overnight-b-independent-fold.md) establishes the endpoint counts and boundary guards. This is a domain obstruction, distinct from failure of the full vector residual, and gives no event continuation.

## Anisotropic neighborhood certification

✓ Done. The isotropic certificate bounds vertical and planar quantities by the same tiny number. A stronger bound follows because vertical displacement enters the squared gap quadratically, while its transmitter contribution is the product of vertical displacement and vertical source velocity. Separating these terms permits the larger certified height bounds above while retaining small radius and angular-rate variations. The equation is unchanged.

The [anisotropic subject instrument](overnight-b-anisotropic-neighborhood.py) keeps $|r-R_0|,|r'|,|r''|,|p'|,|p''|,|\Omega-\Omega_0|\le2^{-20}$ and tests $|z|\le h$, $|z'|\le4h$, $|z''|\le16h$, with unrestricted periodic phase amplitude. The first declared height was $h=2^{-8}$. It rebuilds full root and complement enclosures with separate interval jets and uses the proved nonlinear exclusion criterion. Its sharper inverse constants remain subject-only; the independent acceptance below uses its own certified constants.

Before targets, its known stage exited zero and wrote `.local-data/master-equation-closure/overnight-b/anisotropic/known.json`, SHA-256 `12da1c7678ced2c84d50624ee68f14ca71ed7b16936a65c176c7427385b68058`. Controls include the exact static root and full complement, exact static gap derivative, and the analytical $4h^2$ vertical contribution to the static diametric squared gap. The frozen helper's identity is bound into every receipt. This instrument is a new subject; importing the earlier subject's verified interval primitives is not independent evidence.

The $h=2^{-8}$ pilot passed for both references with subject contraction upper bounds $0.004035$ and $0.023103$. Its receipt `anisotropic/h-2m8.json` has SHA-256 `211b7543a661217e42db64cbdb389fe2ed8eedb8a122c4d5a0f854c60814eb16`. Supervisor run `7718fa3a-e768-4f70-be61-cc21e8ec4cd6` completed in 0.496 seconds with exit zero, zero stderr and closed process group. The subsequent bounded study tested $h=2^{-7},2^{-6},2^{-5}$, retaining the same planar bounds and derivative ratios. This measured how much of the finite-height domain the same inequality excludes; a failed bound is an instrument limitation, not a reference or physical transition. Each receipt has a distinct height name and each run was singly supervised.

| Height bound $h$ | T02 subject result | T04 subject result | Supervised run / elapsed seconds |
| --- | --- | --- | --- |
| $2^{-7}$ | contraction $<0.014035$ | contraction $<0.079572$ | `7601ae41-9f63-47e5-a6d8-26ccc1722988` / 0.486 |
| $2^{-6}$ | contraction $<0.053607$ | source-three root bracket unresolved | `42feb00b-7b2b-4cde-b9ff-ccfce1fc4432` / 0.423 |
| $2^{-5}$ | contraction $<0.209464$ | source-three root bracket unresolved | `0c39e988-2bec-4b2f-abd9-b80ed3717a59` / 0.453 |

All three supervisor leases record exit zero, zero stderr and closed groups; scientific pass/failure is recorded separately per rung inside the receipts. The unresolved T04 bracket certifies no chart loss or dynamical obstruction. A final subject trial tested $h=2^{-4}$; no further T04 enlargement was inferred from its unresolved chart.

The final $h=2^{-4}$ trial failed the sufficient T02 playback bound: its interval upper bound on $|d_b'|$ exceeded one for source one. T04 again lacked a certified source-three bracket. Neither failure is a physical boundary. The receipt `anisotropic/h-2m4.json` has SHA-256 `4f18d05f1328271d8d77221103d6bee003b3cfd8881f312ce25913779ccf9c07`; run `6a8c9a61-7cdf-4089-ab38-9c47501f7e9a` closed in 0.412 seconds, exit zero and zero stderr. The frozen consequential subjects selected for independent reconstruction are therefore $h=1/32$ at T02 and $h=1/128$ at T04. Their respective receipt identities are `c96682b950a0a66742df0e3e3ede408fffc28d5991e6e410d0ec51c5e6764d3a` and `df931d5a57f33db7c7d6ccf5f38a1a71bc73fe50b75fe9aa719bf350b4b64e7d`.

The independent construction passed both selected heights using $(C_0,C_1)=(1/4,4/5)$ for T02 and $(1/40,3/10)$ for T04. Its 15 and 13 continuous-frequency discs, with rigorous infinite tails, establish these inverse bounds separately. Scalar gap and velocity estimates retain quadratic vertical terms; complete compact complements use 41 and 52 leaves. Recent-self, recent-partner and distant-past guards establish complete causal coverage. The resulting contraction bounds are the ones in the leading table. Larger failed subject bounds are sufficient-estimate failures, not physical limits.

Final independent instrument SHA-256: `a07a1c4ded3ba0d8304f433b5768b93ef6cc2a25db98c6290a4d83f7a3447253`. Final known-first receipt: `3be7849fea8a502e069e1a2ce6565b8a4ac9bb32a974d7e8e0be4199f4c6c8ae`. Final target receipt: `afc10602d11854b8da05934689bf531dc5816b2b66ce7f89b3d3200986af771f`. Both receipts are under `.local-data/master-equation-closure/overnight-b/independent-anisotropic/`; the instrument is the linked analysis companion. The final target completed in 0.3354 seconds with macOS peak resident memory 30,867,456 bytes, as recorded by the independent instrument. Its final revision encodes spectral constants as exact rational intervals; the earlier instrument and receipts are preserved with `pre-rational-` names, and known controls were rerun before the final target. The separate report provides the complete derivation, commands, provenance and falsifiers. Parent inspection of that proof and instrument found the stated scalar estimates and contraction argument consistent; `shasum -a 256` verified the final identities during closeout.

## Complete geometry and residual

Write $q_j=(-1)^j$ and $\alpha_j=j\pi/3$ for $j=0,\ldots,5$. The complete paths, for every real absolute time $t$, are

$$
X_j(t)=r(t)(\cos[\Omega t+\alpha_j+p(t)],\sin[\Omega t+\alpha_j+p(t)],0)+q_jz(t)e_z.
$$

Here $r>0,p,z$ are real $C^2$ functions of a common period $P>0$, and $\Omega>0$. The deformation repeats after $P$ while the whole configuration rotates through $\Omega P$. Genuine periodicity follows when $\Omega P/(2\pi)$ is rational. A nonconstant nonzero $z$ is required for the assigned nonrigid spatial target. The six members and alternating polarities are fixed; this description assigns no binary or component-braid membership.

For reception at member zero, rotate axes through $\Omega t+p(t)$. At source time $t-d$, set $\gamma_j=\alpha_j-\Omega d+p(t-d)-p(t)$ and use a minus subscript for that source time. The separation $Q_j$ and source velocity $V_j$ are

$$
Q_j=(r-r_-\cos\gamma_j,-r_-\sin\gamma_j,z-q_jz_-),
$$

$$
V_j=(r'_-\cos\gamma_j-r_-(\Omega+p'_- )\sin\gamma_j,
r'_-\sin\gamma_j+r_-(\Omega+p'_- )\cos\gamma_j,q_jz'_-).
$$

Every positive root of $|Q_j|=d$ is retained, including $j=0$. On an ordinary root, $D_j=1-Q_j\cdot V_j/d\ne0$. The exact canonical full vector residual is

$$
\mathcal E(t)=
\begin{pmatrix}r''-r(\Omega+p')^2\\2r'(\Omega+p')+rp''\\z''\end{pmatrix}
-\sum_{j,d}\frac{q_jQ_j}{d^3|D_j|}.
$$

Rotation by $\pi/3$, reflection of height, and global polarity conjugation carry this equation and each complete root set to the next receiver. Thus three functions determine the eighteen member components without discarding any row. If $r\le r_+$ and $|z|\le z_+$, bounded geometry gives $d\le2\sqrt{r_+^2+z_+^2}$ for every root; this excludes the distant past geometrically. Recent self roots still need a separate proof.

### Inherited boundaries

The [axis adjudication](ring-followup-axis-independent-adjudication-2026-10-03.md) accepts imaginary-axis exclusion at the exact T02/T04 rings and the conditional obstruction for differentiable periodic branches with nonzero first height variation and finite limiting period. The [coupled adjudication](ring-followup-coupled-independent-adjudication-2026-10-03.md) independently rejects two literal trial histories at reception zero. Neither adjudication accepts a whole Fourier-box exclusion. These are source-inspected inherited claims; this report does not label them freshly rerun.

The earlier Fourier slice has radial and phase harmonics only at order two, height harmonics only at orders one and three, and zero mean height. It fixes the height fundamental at $0.05,0.15,0.30$, seeds the circular speeds T02/T04, and starts the remaining Fourier coefficients at zero. The wider declared functional class allows other harmonics, a height offset, and disconnected finite-amplitude profiles. The theorem below addresses a neighborhood by causal-row inequalities rather than assuming any Fourier truncation.

## A quantitative exclusion using the axial equation

Claim grade: derived conditional theorem, independently reconstructed by the single native reviewer `/root/overnight_b_axial_review` using a separate axial derivation and change-of-variables proof. The mechanism is that the flat ring's axial equation has a uniformly bounded inverse on periodic functions. A sufficiently small change in every causal coefficient and delay cannot supply the axial acceleration needed by a nonzero periodic height. This argument uses the exact nonlinear axial equation, rather than differentiating a proposed branch with respect to an amplitude parameter.

### Hypotheses and computable condition

Fix an independently admitted flat T02 or T04 reference. Label its complete ordinary roots by $b=1,\ldots,N$, retaining source parity $\sigma_b\in\{-1,1\}$ and its self row. Let $d_b^0>0$ be each physical delay and $a_b^0=1/[(d_b^0)^3|D_b^0|]>0$ its unsigned axial coefficient. Put $W_0=\sum_b\sigma_ba_b^0$. Its axial characteristic function is

$$
H(s)=s^2-W_0+\sum_b a_b^0e^{-sd_b^0}.
$$

Assume constants $C_0,C_1<\infty$ bound the entire real frequency axis:

$$
\frac1{|H(i\omega)|}\le C_0,\qquad
\frac{|\omega|}{|H(i\omega)|}\le C_1\quad(\omega\in\mathbb R).
$$

For the proposed complete nonlinear history, require a complete ordinary root chart with exactly these labels and no additional roots, periodic $C^1$ delays $d_b(t)$, and coefficients $a_b(t)=1/[d_b(t)^3|D_b(t)|]$. Require uniform bounds

$$
|a_b(t)-a_b^0|\le\epsilon_b,\qquad
|d_b(t)-d_b^0|\le\Delta_b,\qquad |d_b'(t)|\le\eta_b<1.
$$

These bounds concern all times and all roots, not sampled phases. Define

$$
E=\sum_b\epsilon_b,\qquad
B=\sum_b\frac{(a_b^0+\epsilon_b)\Delta_b}{\sqrt{1-\eta_b}}.
$$

If

$$
2C_0E+C_1B<1,
$$

then an exact periodic history in this chart must have $z\equiv0$. The statement permits arbitrary common period $P$, arbitrary harmonics, and coupled radial and phase functions. It does not assert an explicit radius in waveform coordinates until the root-chart and coefficient bounds have been supplied.

### Proof

Use the normalized period norm $\|u\|_2^2=P^{-1}\int_0^P|u(t)|^2\,dt$. Fourier frequencies are $2\pi n/P$. Parseval's identity applied to the constant-delay operator

$$
L_0z=z''-W_0z+\sum_ba_b^0z(t-d_b^0)
$$

gives $\|z\|_2\le C_0\|L_0z\|_2$ and $\|z'\|_2\le C_1\|L_0z\|_2$, uniformly in $P$. This follows term by term from the two displayed frequency bounds; no existence theorem for a nonlinear flow is used.

The actual axial equation is exactly

$$
z''=W(t)z-\sum_ba_b(t)z(t-d_b(t)),\qquad W(t)=\sum_b\sigma_ba_b(t).
$$

The minus sign of every delayed height follows from multiplying the source height parity by the row polarity. It remains the same for either sign of $D_b$ and retains the ordinary self row.

For $\delta_b(t)=d_b(t)-d_b^0$, the fundamental theorem of calculus gives

$$
z(t-d_b(t))-z(t-d_b^0)
=-\delta_b(t)\int_0^1z'(t-d_b^0-\theta\delta_b(t))\,d\theta.
$$

For every $0\le\theta\le1$, the argument map has derivative $1-\theta d_b'(t)\ge1-\eta_b>0$ and increases by $P$ over a period. A change of variables therefore bounds its composition operator in the period norm by $(1-\eta_b)^{-1/2}$. The last display and the integral triangle inequality imply

$$
\|z(\cdot-d_b(\cdot))-z(\cdot-d_b^0)\|_2
\le\frac{\Delta_b}{\sqrt{1-\eta_b}}\|z'\|_2.
$$

Subtract the flat operator from the exact axial equation. The present-time coefficient difference contributes at most $E\|z\|_2$. Expand each delayed term by changing its coefficient at the fixed delay first and then changing its delay with coefficient $a_b(t)$. Fixed translation preserves the period norm, so the delayed coefficient differences contribute at most another $E\|z\|_2$, and the delay changes contribute at most $B\|z'\|_2$. Hence

$$
\|L_0z\|_2\le2E\|z\|_2+B\|z'\|_2
\le(2C_0E+C_1B)\|L_0z\|_2.
$$

The strict bound forces $L_0z=0$ and then $z=0$. This proves the conditional exclusion.

### A period-independent neighborhood exists

Claim grade: derived, independently reconstructed, conditional on the admitted flat reference and its imaginary-axis exclusion. The following proof establishes a nonzero neighborhood without a numerical radius. All $C^2$ norms in this subsection use derivatives in absolute time, over $\mathbb R$. Smallness only after rescaling a variable deformation period to a fixed phase circle would not suffice.

At the flat ring, $E=B=0$ and $d_b'=0$. Its strict speed $R_0\Omega_0>1$ persists as a uniform speed lower bound $v_*>1$ in a small neighborhood. A uniform acceleration bound $M$ then gives the self-secant estimate $|X(t)-X(t-d)|/d\ge v_*-Md/2$. A fixed recent interval therefore contains no positive self root. For distinct members the present separation is at least $r_{\min}>0$; a source-speed bound $V_*$ gives range-minus-delay at least $r_{\min}-(V_*+1)d$, excluding recent partner roots. A fixed upper bound larger than $2\sqrt{r_+^2+z_+^2}$ excludes the distant past.

On the remaining compact delay interval, choose disjoint brackets around the finite accepted roots. Simplicity gives a nonzero derivative floor and opposite endpoint signs; the root-free compact complement has a positive absolute gap. Uniformly small waveform and angular-rate changes preserve all three conditions. There is consequently exactly one root in each bracket and no other root. Relative source angle changes through $|\Omega-\Omega_0|d+p(t-d)-p(t)$ on a bounded delay interval, so this argument requires no all-past physical closeness of different angular rates.

Writing the unsquared gap as $g(t,d)=|X_0(t)-X_j(t-d)|-d$, implicit differentiation gives $g_d=-D_b$ and

$$
d_b'(t)=\frac{\widehat Q_b\cdot[V_0(t)-V_j(t-d_b)]}{D_b}.
$$

Its numerator vanishes at the flat reference. Uniform continuity and the preserved divisor floor make $d_b-d_b^0$, $d_b'$, and $a_b-a_b^0$ uniformly small. Uniqueness within each bracket makes the root delays periodic whenever the relative geometry is periodic. Thus $E,B\to0$ with absolute-time $C^2$ distance, independently of the deformation period. The strict contraction criterion holds on some nonzero neighborhood and excludes every nonzero periodic height there. No differentiability in an amplitude parameter or nonzero first axial variation is required. Arbitrarily large or small finite periods are covered; histories whose absolute-time derivatives leave the neighborhood are not.

Falsifiers: an omitted root, failure of the signed transmitter derivative, an incorrect $H$, a real frequency violating either inverse bound, or a history satisfying every stated bound with nonzero $z$ and zero full residual defeats the affected claim. Nonzero exact histories outside the strict inequality are not excluded. This is not a stability, nonlinear-fate or retention claim.

## Sign-definite height obstruction

Claim grade: derived, independently reconstructed. No ordinary exact relative-periodic history in the declared class can have $z(t)>0$ for every time, or $z(t)<0$ for every time. At a positive global minimum $m=z(t_*)>0$, every same-polarity row has axial numerator $m-z(t_*-d)\le0$, while every opposite-polarity row has numerator $-m-z(t_*-d)\le-2m<0$. A bounded noncoincident partner history has at least one positive causal root: its range-minus-delay is positive at zero and negative beyond the geometric bound. On the declared ordinary domain its row coefficient is finite and positive. The complete axial sum is therefore strictly negative, contradicting $z''(t_*)\ge0$. Height reflection proves the negative case. This extends the constant-height geometric obstruction to arbitrary positive-height radial/phase/height waveforms.

On a complete finite periodic ordinary chart, this strengthens to a necessary sign change for every nonzero height. Suppose $z\ge0$ touches zero at $t_0$. The exact axial equation gives $z''\le W(t)z\le Mz$, with $M=\max(0,\sup_tW(t))<\infty$. Since $z'(t_0)=0$, twice integrating gives $0\le z(t)\le M\int_{t_0}^t(t-s)z(s)\,ds$. On an interval of length $h$ with $Mh^2/2<1$, its supremum must be zero. Repeating this argument covers all future times; periodicity covers the complete history. Thus $z\equiv0$. Reflection covers nonpositive profiles. This extension was supplied by the independent reviewer and checked here directly from the displayed differential inequality; bounded $W$ is an explicit hypothesis. A missing ordinary opposite-polarity root, a reversed axial sign, an unbounded $W$ in the extension, or a nonzero one-signed exact profile on the stated chart would falsify the affected claim. Sign-changing finite-amplitude histories remain open.

## Validation and continuation

### Uniform inverse calculation

Independent acceptance of the neighborhood uses the separately proved constants $C_0=1,C_1=8$ and contraction upper bounds $0.000503518$ for T02 and $0.013899781$ for T04. The independent target receipt `.local-data/master-equation-closure/overnight-b/independent/target.json`, authenticated here by `shasum -a 256`, is `01463d7f6717f6fc3e232c509d48c5bf6be4003ba89b0f809d832a96b9841e2e`. Its known receipt is `fb03f3aba028964232660e8b6f42fbf5df6021c7f77f22958810d779c4e4caf2`; the instrument identity is `173c8c8684d4f4ddc32c730f03653ed33fabaa62a9818652a88750605f364cf4`. Both stages exited zero under the shared venv and one thread; target time was 0.208 seconds with a 45-second internal alarm. The subject's sharper numerical constants below remain subject-only and are unnecessary to the accepted exclusion. The independent estimates additionally remove the phase-amplitude restriction because they bound $|p(t-d)-p(t)|$ by $\varepsilon d$.

Computer-assisted derived subject, with sharper constants outside the independent acceptance: `overnight-b-resolvent.py --stage target` returned the conservative bounds $(C_0,C_1)=(0.181,0.600)$ for T02 and $(0.015,0.200)$ for T04. It reconstructed physical delays and unsigned coefficients from authenticated accepted intervals, then covered $[0,7]$ and $[0,18]$ with 448 and 1152 frequency cells respectively. Each cell encloses both real and imaginary components and uses their squared-modulus lower bound. For the remaining axis, $|H(i\omega)|\ge\omega^2-(|W_0|+\sum a_b^0)$ gives decreasing bounds for both inverse ratios; real coefficients cover negative frequencies. No frequency sample is substituted for a continuous interval.

The target receipt `.local-data/master-equation-closure/overnight-b/resolvent/target.json` has SHA-256 `3585efc5e36fe867de13845d30782e6f27e862a1ee9965f81915a2a32d843f95`. Supervised run `a1cb0a62-1cb5-4639-ba16-2c95855075b8` completed in 2.636 seconds with exit zero, zero stderr and closed process group by its completion lease. The first sandboxed supervisor attempt was blocked before target spawn by its denied loopback socket; the identical command succeeded with host execution permission. Reproduction after the known stage:

```sh
OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 MKL_NUM_THREADS=1 node scripts/dev/owned-compute-supervisor.mjs run --owner-task "$CODEX_SESSION_ID" --deadline-seconds 60 -- "${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/analysis/overnight-b-resolvent.py --stage target
```

The single native reviewer completed its independent analytical reconstruction, accepted the conditional theorem, supplied the absolute-time neighborhood proof and the nonnegative-height extension, and explicitly left all numerical constants outside its verdict. Its separate numerical reconstruction is complete in the linked `overnight-b-independent-neighborhood` companions.

Before the neighborhood target, `overnight-b-neighborhood.py --stage known` exited zero and wrote receipt `.local-data/master-equation-closure/overnight-b/neighborhood/known.json`, SHA-256 `bf3fe39612be3556685bc72bed1cf916b0fc0a7d87c3728987fce018b07ce500`. Its controls enclosed the exact static delay two, excluded its full complementary intervals, reproduced the static six-member vector sum $(-5/4+1/\sqrt3,0,0)$, retained all five partner roots and excluded positive self roots at rest. This receipt precedes target use. The first target is the dyadic bound $\varepsilon=2^{-24}=0.000000059604644775390625$ on each absolute-time waveform derivative through order two and on $|\Omega-\Omega_0|$.

The target completed with complete uniform charts of eight roots per receiver at T02 and twelve at T04, including one positive-delay self root per receiver. The complement covers used 60 and 80 leaves, respectively. Its sufficient contraction upper bounds are below $0.000048681$ and $0.000172479$. These sharper contraction numbers remain subject results; the independent certificate establishes the same exclusion with its own broader bounds. No optimal neighborhood is claimed. The literal box requires $|r-R_0|,|r'|,|r''|,|p|,|p'|,|p''|,|z|,|z'|,|z''|,|\Omega-\Omega_0|\le2^{-24}$ for all absolute times. The radius and angular rate are the inherited exact reference values, not rounded centers. All periods and harmonics are allowed within these bounds.

The target receipt is `.local-data/master-equation-closure/overnight-b/neighborhood/target.json`, SHA-256 `937cbec298a463d0fc4713237cf7db4e943fc569a86bfc0129fe2dcc4d917372`. Supervised run `1fce6471-92e6-4663-a239-fe18326a987e` completed in 0.486 seconds, exit zero, zero stderr and closed process group by its completion lease. It had a 120-second deadline. Reproduction uses the same supervised command as above, with script `overnight-b-neighborhood.py`, `--stage target --epsilon 0.000000059604644775390625`, after its known stage. The proof does not linearize the nonlinear target or change its equation.

## Mean and harmonic conditions for finite-amplitude searches

Claim grade: derived necessary identities, self-reviewed. Write $\theta'=\Omega+p'$ and let $A_r,A_t,A_z$ denote the complete canonical acceleration sum in the rotating frame. A full-period average is $\langle f\rangle=P^{-1}\int_0^P f(t)\,dt$. Any exact relative-periodic history satisfies

$$
\langle A_z\rangle=0,\qquad
\langle zA_z\rangle=-\langle(z')^2\rangle,
$$

$$
\langle rA_t\rangle=0,\qquad
\langle rA_r\rangle=-\langle(r')^2+r^2(\theta')^2\rangle,
$$

$$
\langle r'A_r+r\theta'A_t+z'A_z\rangle=0.
$$

The first two follow by integrating $z''=A_z$ and multiplying by $z$; the tangential identity follows from $(r^2\theta')'=rA_t$; the radial identity follows from $r''-r(\theta')^2=A_r$; the final identity follows by differentiating the periodic squared speed. These are geometric consequences of an exact periodic profile, not imported momentum or energy conservation laws. A proposed history violating any one fails full balance. Satisfying these averages does not imply the pointwise equation. An independently reconstructed full residual with zero pointwise values but a nonzero displayed integral would falsify an identity or its evaluation.

## Declared finite-amplitude proposal experiment

### Root-domain obstruction selected from the measured proposals

Independent acceptance: [the scalar adjudication](overnight-b-independent-fold.md) independently certifies three versus one root throughout the same box, with 18 and 14 complement leaves. It imports no subject/proposal evaluator and discovers its own brackets before rigorous admission. The target receipt `.local-data/master-equation-closure/overnight-b/independent-fold/target.json` has SHA-256 `c860ac236028ce626ae98b26fdc9ba68a586470631e0a8858846f07679fe4512`, and the preceding known receipt is `633cbcfdb3f7762a9a9fecfb8cea2da1cd174da389dce7a42671ed15cab66440`. Its frozen instrument identity is `f43d7cc3760d0a6210b532f06bf6d5b3c1d71b562bcf1e04bb4c379edd1b9a4f`. Both stages exited zero under the shared venv and one thread; target execution took 1.345 seconds and left no process. This accepts the parameter-box domain obstruction below, without accepting generic fold order or any continuation through a singular root.

Computer-assisted derived subject, independently accepted by the separate scalar construction above: the full coefficient box passed both complete source-channel censuses. Source $j=2$ has exactly three ordinary positive-delay roots at phase zero and exactly one at phase $\pi/4$, throughout the parameter box. Its dimensionless radius is bounded below by $0.800048$, and all causal delays lie below $2.459783$. The complete complement counts are 30 and 31 leaves. These outward bounds come from [the two-phase instrument](overnight-b-fold-witness.py), whose target receipt `.local-data/master-equation-closure/overnight-b/fold-witness/target.json` has SHA-256 `c5d978ce100523ee00a5ef7ce98d5e50140a16af77f9585ffcc4d6b3f50f6e90`. Supervisor run `641a4557-83d5-447c-87c0-b4a18728392c` completed in 1.092 seconds, exit zero, zero stderr and a closed process group. It had a 90-second deadline; the script also used a 60-second alarm.

The box centers below are exact decimal literals, with independent halfwidth $2^{-20}$ on every row. They define a durable finite-amplitude family, rather than an unspecified optimizer point.

| Coefficient | Exact center |
| --- | ---: |
| $H$ | 0.2 |
| $a$ | 0.11997900112386073 |
| $b$ | -0.0799710538443139 |
| $c$ | 0.02997342993774324 |
| $d$ | 0.024927982505888825 |
| $e$ | 0.039822224742504894 |
| $f$ | -0.029891781517266583 |
| $\beta$ | 2.3997325538255883 |
| $\kappa$ | 1.000732185870741 |

For any fixed coefficient vector in this box, suppose every source-two root remained ordinary from phase zero to $\pi/4$. On the compact phase/delay region each simple root would continue uniquely, and the root count would be locally constant. Positive present separation excludes roots at delay zero; the geometric upper bound excludes their escape through the distant endpoint. The endpoint counts would then agree, contradicting three versus one. Consequently every profile in the box has a root with $D=0$ somewhere between these phases. Such a profile cannot be an all-time solution on the selected ordinary canonical domain. This proves a geometric domain obstruction, independent of $R>0$ and without a residual-smallness argument. It does not prove a generic fold's multiplicity, establish a continuation through the event, or omit any self contribution: a singular partner channel alone prevents the complete sum from being an ordinary chart.

The six-start target completed in 39.602 seconds by its internal timer (40.237 supervised seconds), with 170 actual residual evaluations and peak resident memory 74,563,584 bytes. Supervisor run `f51fbe0d-b3a2-4b26-9e43-61d7cafb7f44` recorded exit zero, zero stderr and a closed process group. The combined target receipt has SHA-256 `70925370b7dc9fc04aac41ce144c89ccd0de60ac7d2403873741f141dccdad7f`. Five starts had no valid evaluated point and terminated on a constant penalty; those terminations are not scientific negatives. The remaining start had normalized 96-phase RMS 0.90852 and inconsistent sampled necessary-radius values. It supplies no exact candidate.

A more useful geometric signal is that this remaining proposal's point census changes between eight and ten roots per receiver. In source channel $j=2$, the proposal has three roots at deformation phase zero and one at $\pi/4$. The complete interval counts above confirm that every profile in the box must encounter a nonordinary transmitter root in between: roots cannot enter through zero because the same-time members stay separated, or through infinity because the paths are bounded. This is a testable ordinary-domain obstruction, not an optimizer failure interpreted as nonexistence.

Before evaluating this target, [the new two-phase census instrument](overnight-b-fold-witness.py) passed its known static diametric root/complement test, including the exact derivative $-4$ at delay two, and an interval waveform-amplitude control. Its known receipt `.local-data/master-equation-closure/overnight-b/fold-witness/known.json` has SHA-256 `c7f9a0ae85c1f04eb6dff37a256e1a827916320eb2f0e8ce1141fc5af5d15131`. The predeclared target is the full nine-parameter coefficient box of halfwidth $2^{-20}$ around the literal $H=0.2$ proposal in `search-H0.2-start0.json`, whose frozen identity is `84bbc04c3f65beee68864e7609951fbf31a647b0f20901fb74bc577662f213de`. The positive scale $R$ is arbitrary for this geometric root-domain question. Floating roots supply brackets only; strict interval endpoint/derivative and complete complementary exclusions must supply both counts. A differing count would establish a nonordinary root, without asserting a nondegenerate fold or any continuation law there.

Pilot receipt: the final known-controlled driver completed ten actual residual evaluations and the 96-phase reprobe in 3.143 seconds by its internal monotonic timer, with maximum resident memory 74,121,216 bytes by `resource.getrusage` on macOS. Supervisor run `92694c63-d900-4402-aa4d-510be64ad0d0` records 3.818 seconds, exit zero, zero stderr and a closed group. Its receipt `.local-data/master-equation-closure/overnight-b/finite-search/pilot.json` has SHA-256 `0220506de13c7ec19957e16257877cd87eb585db27c285fb0df4e07c02515eaf`. The pilot's normalized RMS was 0.82546, a measured poor proposal after two main optimizer evaluations; it supplies no exclusion. The subsequent target used this single-thread resource profile, at most 240 seconds internal time and a 300-second supervisor deadline.

The [new search driver](overnight-b-finite-search.py) uses the frozen earlier full-vector evaluator as a subject dependency, with its identity authenticated. Reuse supplies consistency with its known controls, not independent target evidence. The histories retain $r=R[1+a\cos2\varphi+b\sin2\varphi]$, $p=c\cos2\varphi+d\sin2\varphi$, $z=R[H\cos\varphi+e\cos3\varphi+f\sin3\varphi]$, $\varphi=\kappa t/R$, and $\Omega=\beta/R$. The common phase gauges and fitted positive radius $R$ are as in the inherited slice. This is still the declared complete all-time class.

Before target evaluation, the experiment fixes six starts: $H=0.2,0.5,0.8$ crossed with two substantial radial/phase seeds. Seed zero uses $(a,b,c,d,e,f,\beta,\kappa)=(0.12,-0.08,0.03,0.025,0.04,-0.03,2.4,1)$; seed one reverses all six Fourier coefficient signs and uses $(\beta,\kappa)=(4.2,2.5)$. Bounds remain $|a|,|b|\le0.2$, $|c|,|d|\le0.12$, $|e|,|f|\le0.1$, $1.4\le\beta\le4.8$, $0.4\le\kappa\le12$. The selected speed region also requires the conservative recent self-secant bound to exceed $1.05$ through dimensionless delay $10^{-5}$; the underlying floating routine's recent origin omission is therefore guarded for every evaluated accepted proposal. The remaining stationary partition is a point proposal and does not prove complete root coverage.

The objective retains all three residual components at 24 phases, with a single shared normalization and a positive least-squares radius. Each retained point is reprobed at 96 phases and a 1024-interval delay grid. The target budget is 35 main optimizer evaluations per start, at most 1500 actual residual calls and 240 seconds internal elapsed time. A two-evaluation, one-start pilot precedes the target and measures resident memory and wall time. Every launch uses one numerical worker and one BLAS/OpenMP thread, a supervisor deadline, and ten-second progress records where the run lasts that long. Output is bounded by six small coefficient/vector records; no evolved-history output is produced.

Before any pilot or target, the driver's known stage exited zero, including the frozen analytical static/full-vector controls, admitted flat T02/T04 residual controls, the exact recent-self estimate $2-2\times10^{-5}$ for a unit-radius speed-two circle, and rejection of a subwake example by the selected speed guard. Its receipt `.local-data/master-equation-closure/overnight-b/finite-search/known.json` has SHA-256 `84b27d9f7b3604112ef747bf1c9fc520cdb867f01673314262eecc0c741a26a1`. This pre-diagnostic receipt was superseded by the final known stage below, before the completed pilot and target.

These starts probe a changed finite-amplitude basin; failure establishes no box exclusion. A successful small residual would require frozen coefficients, a fresh all-period root chart, and an exact residual proof before admission. The finite neighborhood obstruction is a separate result and is not inferred from optimizer behavior.

The search driver gained a necessary-identity diagnostic before target use. With dimensionless acceleration $A$ and demands $L$, the exact equation $RL=A$ implies two independently computed radius expressions,

$$
R_r=-\frac{\langle\rho A_r\rangle}{\langle\kappa^2(\rho')^2+\rho^2(\beta+\kappa\psi')^2\rangle},\qquad
R_z=-\frac{\langle\zeta A_z\rangle}{\langle\kappa^2(\zeta')^2\rangle},
$$

where primes now mean deformation-phase derivatives. Any nonconstant-height exact profile requires $R_r=R_z>0$, together with $\langle\rho A_t\rangle=0$. These follow from the preceding integration identities. The diagnostic records sampled versions only; their numerators contain delayed roots and need outward quadrature before becoming certified exclusions. Its analytical control imposes $A=RL$ for a simple sinusoidal profile, reproducing both radius values $R=1/2$; that imposed vector is an algebraic control, not a claimed canonical solution. The final known stage then exited zero before the pilot, superseding the pre-diagnostic known receipt with SHA-256 `7bed0f9215a9a52a1ffdf2ae6608a7ed365b6b85c24a12b2eca4fb9ecd6e6a56`.

The shared interpreter executed successfully via `"${AAA_VENV:-../.venv}/bin/python" -c 'import sys, mpmath, numpy, scipy; print(sys.executable); print(sys.version)'`: Python 3.13.2 at the repository-adjacent venv. No system Python is used.

Before target use, [the inverse-bound instrument](overnight-b-resolvent.py) passed its known stage. The independent polynomial $H(s)=(s+1)^2$ has exact inverse suprema $1$ and $1/2$; the interval cover enclosed these within its predeclared allowances. It also passed the interval-square zero guard, and called the frozen static full-vector and admitted flat T02/T04 controls without rewriting their receipts. The new receipt is `.local-data/master-equation-closure/overnight-b/resolvent/known.json`, SHA-256 `4c83ad9e8435b86ae9a30d22e4c945a74d465649f0deb83fa21e52ebf580c579`. This pass was recorded before any target calculation. The `/usr/bin/time -l` wrapper printed 0.97 seconds real time but exited 1 because its `sysctl kern.clockrate` query was sandbox-denied after the Python receipt was written; this is an operational telemetry limitation, not a failed mathematical control. Resource limits use one BLAS/OpenMP thread. The subsequent target calculations and separate verdicts are recorded above.

## Reproduction, validation and closeout

The following commands specify the recorded scientific entrypoints from the repository root. Each instrument's `--stage known` command preceded its target under that instrument's final identity. The scripts embed their input identities and preserve exact interval endpoints in their local receipts. A replay needs the named inherited local evidence; a fresh checkout alone does not contain those ignored admissions. Preserve existing receipts before any replay because the instruments use fixed output paths. These commands document the completed runs; they are not a request to launch them again.

```sh
export OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 MKL_NUM_THREADS=1
b_analysis=reference/priorities/master-equation-closure/braid-program/analysis
"${AAA_VENV:-../.venv}/bin/python" "$b_analysis/overnight-b-resolvent.py" --stage known
node scripts/dev/owned-compute-supervisor.mjs run --owner-task "$CODEX_SESSION_ID" --deadline-seconds 60 -- "${AAA_VENV:-../.venv}/bin/python" "$b_analysis/overnight-b-resolvent.py" --stage target
"${AAA_VENV:-../.venv}/bin/python" "$b_analysis/overnight-b-neighborhood.py" --stage known
node scripts/dev/owned-compute-supervisor.mjs run --owner-task "$CODEX_SESSION_ID" --deadline-seconds 120 -- "${AAA_VENV:-../.venv}/bin/python" "$b_analysis/overnight-b-neighborhood.py" --stage target --epsilon 0.000000059604644775390625
"${AAA_VENV:-../.venv}/bin/python" "$b_analysis/overnight-b-finite-search.py" --stage known
node scripts/dev/owned-compute-supervisor.mjs run --owner-task "$CODEX_SESSION_ID" --deadline-seconds 60 -- "${AAA_VENV:-../.venv}/bin/python" "$b_analysis/overnight-b-finite-search.py" --stage pilot
node scripts/dev/owned-compute-supervisor.mjs run --owner-task "$CODEX_SESSION_ID" --deadline-seconds 300 -- "${AAA_VENV:-../.venv}/bin/python" "$b_analysis/overnight-b-finite-search.py" --stage target
"${AAA_VENV:-../.venv}/bin/python" "$b_analysis/overnight-b-fold-witness.py" --stage known
node scripts/dev/owned-compute-supervisor.mjs run --owner-task "$CODEX_SESSION_ID" --deadline-seconds 90 -- "${AAA_VENV:-../.venv}/bin/python" "$b_analysis/overnight-b-fold-witness.py" --stage target
"${AAA_VENV:-../.venv}/bin/python" "$b_analysis/overnight-b-anisotropic-neighborhood.py" --stage known
for height_power in 8 7 6 5 4; do
  node scripts/dev/owned-compute-supervisor.mjs run --owner-task "$CODEX_SESSION_ID" --deadline-seconds 90 -- "${AAA_VENV:-../.venv}/bin/python" "$b_analysis/overnight-b-anisotropic-neighborhood.py" --stage target --height-power "$height_power"
done
```

The three independent instruments use the same one-thread environment and executable shared venv, each with `--stage known` followed by `--stage target`: [neighborhood](overnight-b-independent-neighborhood.py), [finite-amplitude root obstruction](overnight-b-independent-fold.py), and [anisotropic neighborhood](overnight-b-independent-anisotropic.py). They completed synchronously under internal alarms, and their reports record exact invocations. They share `mpmath` interval arithmetic and inherited admitted inputs; implementation independence concerns their derived envelopes, root census and frequency verification, not a second implementation of arithmetic itself. The parent has read the independent proofs and code. The reviewer also inspected the final leading synthesis against the anisotropic proof and identified two wording corrections, both applied before closeout.

### Owned files and scoped checks

`git --no-optional-locks status --short -- reference/priorities/master-equation-closure/braid-program/analysis/overnight-b-*.py reference/priorities/master-equation-closure/braid-program/analysis/overnight-b-*.md` lists twelve new owned files: this report; the five subject instruments linked above; and the three independent report/instrument pairs. This is the complete task-authored deliverable set shown by that scoped inventory, not a claim about unrelated checkout state. Runtime receipts are retained under `.local-data/master-equation-closure/overnight-b/`, measured as 8.6 MiB by `du -sh` at closeout, and remain ignored local provenance.

The shared-venv command `"${AAA_VENV:-../.venv}/bin/python" -m py_compile reference/priorities/master-equation-closure/braid-program/analysis/overnight-b-*.py` exited zero for all eight owned Python files. `git diff --no-index --check /dev/null` on each of the twelve owned files emitted no whitespace diagnostics; the exit code of one for a new-file difference was distinguished from a command error. These are syntax and whitespace checks, not independent mathematical evidence. No regular test suite was added. Final `shasum -a 256` checks reproduced the identities above for the frozen proposal evaluator, both inherited exact-reference certificates and their symmetric adjudication, and the final anisotropic instrument and receipts.

### Completion boundary and outstanding science

The selected finite-amplitude experiment and three independently checked obstruction results complete assignment B's bounded-negative alternative. No exact spatial reference was admitted. The dependent perturbation item is blocked by that missing scientific prerequisite; taking a spectrum of an imbalanced proposal would have no referent. No useful pending certification remains for the selected regions. This completion does not assert that the whole smooth radius/phase/height class has been exhausted.

The open scientific question is whether a disconnected sign-changing finite-amplitude profile outside the certified neighborhoods admits an everywhere-ordinary complete root chart and solves all three acceleration equations. A concrete subsequent investigation would first construct such a root chart over a full period, with a positive divisor margin, and only then optimize or certify the full residual. This avoids treating a phase-dependent root census as a smooth residual problem. Enlarging the sufficient neighborhoods to their maximal possible size is also open; failed interval bounds here do not locate a physical boundary. Neither continuation through a singular root nor stability, nonlinear fate, retention or qualification is established.

Operational closeout: `node scripts/dev/owned-compute-supervisor.mjs closeout --owner-task "$CODEX_SESSION_ID"` exited zero and returned `status: clear` for owner `01a1138c-ab63-7f63-bf6c-5084c98759e6`. The independent reviewer reported all synchronous checks complete and no remaining process, then closed its review. The coordinator-created continuation heartbeat `b-overnight-braid-research` was paused using the app automation tool, as its saved completion instruction requires; `rg` on that exact automation configuration verifies `PAUSED` and this chat's target ID. No other chat's process or automation was changed.

Closeout checkpoint by `clock.curr_time`: 2026-10-07 00:01:11 UTC (October 6, 20:01:11 EDT), 31 minutes 41 seconds after launch. Final editorial corrections follow that checkpoint; this was an early bounded completion, not a twelve-hour run. Shared priority integration remains with the coordinator under the assignment's read-only boundary. No further computation is running or scheduled for this completed B allocation.
