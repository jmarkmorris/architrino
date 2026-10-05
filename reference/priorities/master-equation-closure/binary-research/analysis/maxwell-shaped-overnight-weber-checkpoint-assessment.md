# Final-hour assessment of the available Weber sources

## Availability and integration boundary

This is the Maxwell coordinator's assessment of the separately authored Weber material, read only after the Maxwell scientific cutoff at 2026-10-05 11:29:32 UTC. Weber supplies no premise for the Maxwell derivations. The Maxwell sources and accepted outcomes were frozen first; the [primary Maxwell synthesis](maxwell-shaped-overnight-investigation.md) records those independent results.

**Measured availability, 2026-10-05 11:31 UTC:** `rg --files` under the binary, collinear and braid analysis/evidence owners found the Weber binary subject, independent reference, collinear subject and five instrument/control sources. The binary and collinear subjects explicitly say PI integration, measured runs and adjudication are pending. The independent source fixes its reference at 03:00 UTC but explicitly leaves subject adjudication pending. A bounded filename search under `.local-data/master-equation-closure/` and `.tmp/weber-overnight/` found smoke outputs and reference benchmarks, but no named frozen nine-hour checkpoint, checkpoint manifest or PI synthesis. These observations establish availability in those searched owners; they do not establish another investigator's elapsed clock or host state. A source-linked PI checkpoint with its freeze identity and complete evidence would overturn the availability limitation.

The coordinator copied the eight available sources into `.tmp/maxwell-shaped-overnight/weber-final-hour-read-snapshot/` and retained a sibling SHA256 inventory before assessing them. This is a coordinator read snapshot, **not** Claude's required nine-hour checkpoint. The selected contract admits only an assessed frozen external checkpoint to shared scientific integration. Consequently the available findings are reviewed here, but no new Weber scientific registry row, findings entry, geometry theorem or canon claim is propagated from this snapshot. Existing Weber family definitions remain unchanged. This status can be superseded by an eligible checkpoint and a source-by-source assessment.

**Measured clock metadata at 12:09 UTC:** `.tmp/weber-overnight/pi/common-brief.md` and `clock.txt`, inspected with `cat`, declare Weber start `2026-10-05T02:31Z`, planned nine-hour freeze `11:31Z` and deadline `12:31Z`. Their respective SHA256 values by `shasum -a 256` are `4f9344871033fb5e3b862af1d66881030d88434104299484326b4eb5c34b0b0d` and `dad28f442e9be35399be7bb87a725a5a45cd301628270bf0bfa11718ef02cb6a`. These PI-authored records establish the declared clock, not an observed completed duration, frozen scientific checkpoint or host/process closeout. The Weber deadline is 88 seconds later than the Maxwell deadline, so this coordinator does not wait past its own cutoff for the other lane's final completion.

The available sources are the [binary subject](weber-overnight-investigation.md), [independent reference](weber-overnight-independent-adjudication.md), [collinear subject](../../collinear-research/analysis/weber-overnight-collinear-approach.md), [Cartesian instrument description](../evidence/weber-overnight-pair-instrument.md) and their separately owned executable/control records. They are preserved without coordinator edits. The PI primary-source attribution section is still reserved; the benchmark coefficients are treated only as an explicit adapted-law selection, without verified historical attribution.

## Independent reconstruction of the assessable pair argument

The selected adapted law is instantaneous, with two distinct equal-coupling labels, no self term, fixed positive $K$, $\lambda_{\mathrm W}=-1/2$, $\mu_{\mathrm W}=1$, and normalized numerical $c_f=1$. It uses present separation $r=\|\boldsymbol\rho\|>0$, $\boldsymbol\rho=\mathbf X_1-\mathbf X_2$, relative velocity $\mathbf w$, and polarity product $\sigma$. It does not inherit delayed roots or Maxwell source histories. Define $k=2K$, $\kappa=k/c_f^2$, $\mathbf e=\boldsymbol\rho/r$, and $h=\|\boldsymbol\rho\times\mathbf w\|$. Direct differentiation gives

$$
\dot r=\mathbf e\cdot\mathbf w,\qquad
\ddot r=\frac{h^2}{r^3}+\mathbf e\cdot(\mathbf A_1-\mathbf A_2).
$$

Writing $\mathbf u=(\mathbf e,-\mathbf e)$, the full pair acceleration matrix is $I_6-\sigma K\mathbf u\mathbf u^{\mathsf T}/(c_f^2r)$, whose determinant is

$$
\Delta(r)=1-\frac{\sigma\kappa}{r}.
$$

On its invertible domain, the accelerations are radial and opposite, the centre velocity $\mathbf V_c=(\mathbf V_1+\mathbf V_2)/2$ is constant, and $\boldsymbol\rho\times\mathbf w$ is constant. Substitution into the scalar radial equation yields

$$
\Delta(r)\ddot r=\frac{h^2}{r^3}+\frac{\sigma k}{r^2}-\frac{\sigma\kappa\dot r^2}{2r^2},\qquad
\varepsilon=\frac12\Delta(r)\dot r^2+\frac{h^2}{2r^2}+\frac{\sigma k}{r}.
$$

**Derived assessment:** differentiating $\varepsilon$ and using the displayed equation cancels all terms exactly. This verifies the invariant directly from the selected law, independently of numerical orbit agreement. The available reference reaches the same equation by a rank-one solve and polar reduction. A regular solution violating this derivative identity or the rank-one determinant would falsify the assessment; the full Cartesian law is the corresponding checkable equation.

For opposite polarity, $\Delta=1+\kappa/r>0$. With $h>0$ and $-k^2/(2h^2)\le\varepsilon<0$, the radial potential $h^2/(2r^2)-k/r$ confines separation to two positive turning radii, or one circular radius at equality. The vector field is smooth on that compact separation interval and velocities stay bounded, so the relative solution extends for all absolute time. Circles have $r_0=h^2/k$ and $\Omega^2=k/r_0^3$; the radial frequency satisfies $\omega_r^2=k/[r_0^2(r_0+\kappa)]>0$. The invariant minimum supplies reduced radial stability. These are assessable adapted-law arguments for persistent bounded **relative** histories; a free centre drift is not bounded absolute position. They are neither a Maxwell result nor physical binding evidence.

Speed labels require the absolute-frame preparation as well. In the centre-rest frame, member speed is half relative speed. On the opposite-polarity bound class its maximum is $h/(2r_p)$ at pericentre $r_p$. Thus $h/(2r_p)<c_f$ gives the strict domain, equality gives an inclusive boundary history, and larger values require unrestricted support. A sufficient condition with centre drift is $\|\mathbf V_c\|+h/(2r_p)<c_f$. Negative $\varepsilon$ alone does not certify a ceiling domain. For circular histories with $x=rc_f^2/K$, strict coverage is $x>1/2$, equality is $x=1/2$, and smaller $x$ is superfield. No ceiling response is present.

For collinear motion $h=0$, direct elimination further gives

$$
\dot r^2=\frac{2(\varepsilon r-\sigma k)}{r-\sigma\kappa},\qquad
\ddot r=-\frac{\sigma k(\varepsilon-c_f^2)}{c_f^2(r-\sigma\kappa)^2}.
$$

An opposite-polarity approaching pair reaches contact in finite time, with incoming relative-speed limit $\sqrt2c_f$ and finite incoming acceleration. In a centre-rest frame the member-speed limit is $c_f/\sqrt2$. The law remains undefined at contact; a finite incoming limit does not select a crossing. A same-polarity exterior approach with $\varepsilon>c_f^2$ reaches $r=\kappa$ at finite time with divergent speed and singular acceleration matrix. For $0<\varepsilon<c_f^2$ it turns outside that radius and disperses. The boundary level $\varepsilon=c_f^2$ has uniform relative speed $\sqrt2c_f$ but reaches an indeterminate solve; adopting a passage is a separate formulation decision. These conclusions follow from the rational radial equation, with the two polarity determinants kept separate.

## Corrections and unreviewed scope

The available binary subject's Section 7.3 assigns three zero-eigenvalue centre Jordan blocks while describing the **relative part** in a co-rotating frame. This is consistent as a mixed description with an inertial centre and rotating relative coordinates, but it cannot be read as the spectrum of a wholly co-rotating twelve-state Cartesian Jacobian. If $\mathbf C''=0$ is the inertial centre equation and $\mathbf y$ is its rotating planar coordinate, then

$$
\mathbf y''+2\Omega J\mathbf y'-\Omega^2\mathbf y=0,
$$

where $J$ is planar rotation by a quarter turn. The rotating in-plane centre eigenvalues are $\pm i\Omega$, each with a size-two Jordan block; the out-of-plane centre retains a zero size-two block. The [Cartesian instrument note](../evidence/weber-overnight-pair-instrument.md#linearization-helper) uses this wholly rotating frame. The relative phase/family, tilt and radial directions are unaffected. The subject table needs an explicit mixed-frame label before numerical spectrum comparison; the table is **not admitted as a wholly rotating Jacobian spectrum**. This is a coordinate clarification, not a defect in the invariant-based bounded-relative-history proof. A wholly rotating centre Jacobian with three inertial zero blocks would falsify the corrected assignment.

The opposite-polarity dispersal proof in subject Section 7.4 claims a positive lower radial-speed bound away from the turning point even at $\varepsilon=0$. On that level speed instead tends to zero at infinity. Monotonic outward motion, no finite limiting radius, and bounded speed still prove all-future dispersal; the stronger stated bound is rejected. This correction does not change the negative-invariant bound class.

The subject's radial speed-domain table omits a boundary case: $\varepsilon=2c_f^2$ gives member speed strictly below $c_f$ at every finite positive separation, with supremum $c_f$ approached only at infinity. A strict pointwise domain differs from a uniform margin. The table also writes $\sqrt{\varepsilon/2}$ without restricting $\varepsilon\ge0$, which is undefined for its negative-invariant radial histories. The finite-contact speed statement is supported only in the centre-rest frame; a common boost changes individual absolute speeds. Any integration must use the exact speed function and actual centre velocity rather than this table verbatim.

The independent reference's Section 5(iii) labels $\ddot r(0)=-3/4$ for opposite-polarity release from rest at $r_0=4$, $K=c_f=1$. Direct evaluation gives launch acceleration $\ddot r(0)=-2/[4(4+2)]=-1/12$. The value $-3/4$ is the incoming **contact** acceleration limit on this invariant level. The retained benchmark JSON correctly encloses the launch value near $-0.0833333333333333$; the discrepancy is a table endpoint label, not an observed code failure. Neither value defines acceleration at contact, where the original law is undefined.

The independent reference's summary also overcompresses radial classes. An incoming exterior same-polarity pair reaches $r=\kappa$ at the threshold $C=2c_f^2$ as well as above it: equality has finite uniform speed and an indeterminate solve, whereas larger $C$ has divergent speed. The phrase “otherwise turns” therefore excludes a real boundary case. An opposite-polarity radial history need not reach contact if it is receding with nonnegative invariant; the contact claim needs the direction or returning-branch condition stated above. The binary subject's Theorem 8.1 also omits an exterior outward same-polarity dispersal branch when $\varepsilon>V_{\mathrm{eff}}(\kappa)$, although its no-regular-bound-history conclusion survives that omission. These summaries are not admitted as exhaustive classification tables.

The collinear subject's general separated invariant uses $|\Delta|$, so its identification $C=1-\varepsilon/c_f^2$ holds only where $\Delta>0$. The full relation is $C=\operatorname{sign}(\Delta)(1-\varepsilon/c_f^2)$; the sign reverses inside the same-polarity critical radius. The subsequent equations expressed directly in $\varepsilon$ remain correct. Its description of contact as a “simultaneous self pair” also confuses two distinct labels at zero separation with a diagonal self term. Contact is outside the law because $r=0$ leaves its direction and response undefined, regardless of that wording.

General integrating factors have the same chart issue. A power $\Delta^p$ with arbitrary real $p$ is not generally real where $\Delta<0$; use $|\Delta|^p$ or state a chart-specific signed normalization. On the selected frozen law the rational signed-$\Delta$ invariant above is valid on each regular fixed-sign chart. Broader coefficient-family integrating-factor claims are not admitted from the unqualified expression.

No complete four-member Weber ring balance, full matrix invertibility certificate, independently assessed Cartesian spectrum, retained coupled perturbation or nonlinear fate was supplied in the searched geometry sources. A loose-tolerance ring smoke output is a code-path check, not a ring solution or stability reference. No Weber ring spectrum is integrated. Historical coefficient attribution, full subject numerical preregistration, target-output binding and a PI checkpoint remain unavailable or pending as specified above.

## Numerical evidence and final disposition

**Measured known-control replay:** importing the two unchanged instruments' exported `runControls` functions under Node v26.3.0 returned subject 11/11 and reference 24/24 passes in 0.278 seconds, before any coordinator target replay. The replay wrote only a separate coordinator receipt, `.local-data/master-equation-closure/weber-overnight/coordinator-numerical-review/controls-rerun-v1.json`, SHA256 `f5cd218c1833f04b40f42051892ebed072e8ce3b197fe578d0cc1ff9aec86d92`. It binds subject source `3d16f3494c55fefa41b3d225e8e591501241f725a79965469f1dfb9d28109d18` and reference source `feeffd7e8986d6fa695dfc1a35777891ba7ef65728f3aeda5e9a1631440d23c3`. Original source files, controls and benchmark receipts were not overwritten. The originals record Node v22.23.2; the replay confirms the stated known cases under the present runtime, not a historical freeze or cross-platform numerical theorem.

The full Cartesian subject assembles the $3N$ acceleration system, whereas the separately authored pair reference uses a rank-one reduction, first integral and closed-form or quadrature values. That is a meaningful independent comparison arrangement. The reference's internal RK4, tanh-sinh and Lagrangian routes share an author and are implementation checks, not additional independent parties. No preregistered Cartesian target comparison was found by the bounded runtime filename inventory. Smoke trajectories are measurements of code-path execution. The subject supplies no continuous solution enclosure; its endpoint event search assumes no multiple unresolved crossings within an accepted step, and contact/escape/matrix thresholds are numerical guards rather than exact terminal events.

The reference's interval numbers are conditional evaluations of its derived formulas. Their stated assumptions include exact-rational input enclosure, one-ULP arithmetic widening, Taylor remainder and strict interval-Newton bounds, the cited analytic-strip trapezoid theorem, and faithful or correctly rounded host basic operations. A known-control pass does not machine-check the derivation, verify the host backend or certify floating ODE/tanh-sinh tail checks. This final-hour review admits the explicit algebraic arguments above, but does not promote all benchmark numbers or the full interval backend as independently certified. A failing known replay, source hash mismatch, incorrect remainder or numerical value outside a valid separately evaluated enclosure would falsify the corresponding numerical claim.

The operator requested early Maxwell closeout and explicitly deferred further Weber analysis until Claude finishes. The already completed available-source assessment is retained for that later review; no further external assessment or scientific propagation is performed in this closeout. The unapplied scientific destinations are the binary manuscript's Weber reduction/orbit treatment, the collinear manuscript's Weber fate treatment, Section 9's assessed fixed-benchmark conclusions, separately defined Weber registry rows and findings, and the related priority/work-log scientific summaries. No Weber ring destination is ready: its balance and invertibility premises are absent. Shared status notes link this assessment without propagating the pending scientific claims. The final availability check and elapsed Maxwell closeout are recorded in the primary synthesis; Claude's elapsed duration is not inferred from file times.


### Durable copies of recorded scratch inputs

Recorded command and provenance text retain their original paths. Byte-identical durable owners are [common-brief.md](../evidence/weber-overnight-promoted/pi/common-brief.md). The [promotion map](weber-overnight-closeout-verification.md#part-3--promotion-map) records hashes and the retained scratch aliases.
