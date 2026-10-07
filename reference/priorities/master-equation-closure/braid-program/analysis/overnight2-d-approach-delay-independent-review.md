# Independent review of approaching-pair delay geometry

## Disposition and scope

Derived disposition: the [approach-delay identities and sufficient conditions](overnight2-d-approach-delay-geometry.md) are correct. The capped kinematic example rigorously refutes an upper bound on delayed range divided by present separation based only on the speed ceiling, decreasing separation, root uniqueness and a positive pointwise emission factor. It does not refute a preparation-specific bound using the full source history or the master equation.

One endpoint-domain qualification was requested and has been independently verified: the limiting positive-delay continuum is $0<s<t$, with $D_s=0$; $s=0$ is separately a source-velocity jump trace, and $s=t$ has zero range outside the $R>0$ direction chart. No remaining mathematical correction is required. The initial subject SHA-256 was `3af6e14bcec2f306c87d87c19d5e482603f3362d9766a4c0331a8e9caa33ffd7`; the repaired subject is `1a12bf119c3abed5df6a4517714aa40d20cedb62c4a80d49d5370b9b41bbd122`. The parent preserved the initial bytes at `.local-data/master-equation-closure/overnight2-d/approach-delay-before-endpoint-qualification.md`, whose SHA matches the initial identity. A file-to-file diff shows only the specified limiting-continuum paragraph changed. This review explicitly covers both stages rather than claiming that the full subject stayed frozen during the repair.

The live Ramon E. Moore role and retained Specialist charter provide an analytical lens; the independent derivations and exact controls below provide evidence. The optional original balance-0 approaching-pair investigation remains separate from the accepted balance-1 finite prefix and its primary admission work. No original preparation, equation or event rule is changed. All calculations use $c_f=1$. The explicit paths are geometric controls, not solutions of the master equation or a proposal to replace a prescribed history. The parent owns integration into the [existing research account](overnight2-d-followup-and-research-2026-10-07.md). The reference-transfer target remains unrun and queued at this review's completion; no completed transfer is presumed.

## Exact identity and bounds

Take a geometric causal root $s=t-R$ with $R>0$, $X_i(t)-X_j(s)=Rn$ and $|n|=1$. Absolute continuity of the source position on the entire delay interval yields $X_j(t)-X_j(s)=\int_s^t V_j(u)\,du$. Subtraction gives

$$
d=X_i(t)-X_j(t)=\int_s^t(n-V_j(u))\,du,
\qquad n\cdot d=R\eta,
\qquad \eta=\frac1R\int_s^t(1-n\cdot V_j(u))\,du.
$$

The direction $n$ is held fixed in this integral. The assumed unit-speed bound gives $0\le1-n\cdot V_j\le2$ almost everywhere, hence $0\le\eta\le2$ and $n\cdot d\ge0$. By Cauchy–Schwarz, $R\eta=n\cdot d\le|d|=r$. Thus a separately verified positive mean-deficit floor $\eta_*$ gives $R\le r/\eta_*$. No receiver speed assumption is needed for this one-root identity. Uniform source speed at most $1-\delta$ supplies $\eta_*\ge\delta$; a complete directional deficit bound can do so even at unit speed.

Vector Cauchy–Schwarz gives

$$
r^2\le R\int_s^t|n-V_j(u)|^2\,du.
$$

Since $|n-V|^2=1+|V|^2-2n\cdot V\le2(1-n\cdot V)$, this is at most $2R^2\eta$. Consequently $\eta\ge(r/R)^2/2$, while the earlier projection inequality gives $\eta\le r/R$. These relations do not supply a strictly positive history-independent floor for $\eta$. Also $r\le\int_s^t|n-V_j|\le2R$, so $R\ge r/2$. This lower range bound cannot be reversed.

If the source velocity has a Lipschitz representative with constant $M$ on the complete closed delay interval, then $n\cdot(V_j(u)-V_j(s))\le M(u-s)$. Integrating yields

$$
\eta\ge1-n\cdot V_j(s)-MR/2=D_s-MR/2.
$$

The factor $1/2$, sign and use of the complete interval are correct. At a genuine velocity jump such a finite whole-interval Lipschitz hypothesis is generally unavailable; it cannot be inferred from smooth acceleration bounds on the separate sides. A positive emission factor alone therefore does not imply a positive mean-deficit floor. The displayed estimate is useful only where its right side is positive, and an upper bound for $R$ used to enforce that condition must have an independent justification.

## Counterexample and limiting chart

For the complete source $X_j(u)=0$ for $u\le0$ and $X_j(u)=u$ for $u\ge0$, and receiver $X_i(t)=a-t$ on $0\le t<a/2$, both source and receiver positions satisfy the unit-speed bound. The receiver may be continuously extended to $a/2$ for the limiting calculation. Present separation is $r=a-2t>0$.

For a causal candidate $0\le s\le t<a/2$, the source-to-receiver displacement $a-t-s$ is positive. Its scalar causal equation reduces to $t-s=a-t-s$, which would force $2t=a$. Therefore there is no nonnegative causal root before contact. For a negative candidate the source is stationary, so the equation uniquely gives $s=2t-a=-r$ and $R=a-t>0$. The negative branch is differentiable at this root with $V_j(s)=0$ and $D_s=1$; it is ordinary and unique over the complete causal domain.

Only the negative segment of $[s,t]$ contributes to the directional deficit, with length $-s=r$. Therefore $\eta=r/R$, and $R/r=(a-t)/(a-2t)$ diverges as $t\uparrow a/2$. Even a uniform pointwise factor $D_s=1$ along this precontact family does not control the complete mean. Its delay interval crosses the source velocity jump, so it does not contradict the whole-interval Lipschitz estimate.

At $t=a/2$, every $0<s<t$ gives $R=t-s>0$, direction $n=1$ and $D_s=1-1=0$. This is a continuum of nonordinary positive-delay roots. At $s=0$ the scalar equality holds but the two source-velocity traces differ; at $s=t$ both range and present separation vanish, so the delayed unit direction is undefined. The repaired paragraph now distinguishes these cases exactly. No passage, physical coincidence mechanism or continuation through this limiting set is inferred.

## Independent known controls before snapshot inspection

Measured: separate shared-venv `fractions.Fraction` controls ran before opening the retained original snapshots. They imported no subject computation or root solver. With $n=(1,0,0)$ and $R=3/2$, constant source velocities $(-1,0,0)$, $(3/5,4/5,0)$ and $(1/4,0,0)$ verified the vector identity, $0\le\eta\le2$, the two Cauchy inequalities and the speed lower bound. The two unit-speed cases attain $r^2=2R^2\eta$; the antiparallel case also attains $r=2R$.

An affine velocity $V(u)=1/4+u/2$ on $[0,1]$ stays between $1/4$ and $3/4$ and gives $D_s=3/4$, $M=1/2$, $R=1$, $\eta=1/2=D_s-MR/2$. A new rational precontact example, distinct from the note's named case, uses $a=3,t=5/4$ and returns exactly $r=1/2$, $s=-1/2$, $R=7/4$, $\eta=2/7$ and $R/r=7/2$. Its nonnegative-candidate gap is exactly $r>0$ independently of the candidate source time.

The separate rational family $t=a(N-1)/(2N)$ was checked at $N=2,3,7,101,10^6$, giving $r=a/N$, $R=a(N+1)/(2N)$, $R/r=(N+1)/2$ and $\eta=2/(N+1)$. Its algebra, rather than the finite number of tests, proves divergence. Contact controls tested strictly interior positive-delay roots separately from the zero-range endpoint. The existing producer receipt `approach-delay-controls.json`, SHA-256 `6ef306264ecdf9bb74c0ff157da62425bd7f414b7e462cff4744a66dcc2cf7eb`, was preserved and hashed but was not counted as independent evidence.

## Retained snapshot table audit

After those geometric controls, a separately authored ordered-pair selector first passed an asymmetric known case and missing/duplicate rejection. It then selected exactly the four named rows from the existing JSON snapshots. The selector preserves receiver/source order for roots and uses the unordered pair only for the common present separation. Read-through of `overnight-d-snapshot-independent-check.py` confirms that its `Dt` field is $1-n\cdot V_j(s)$; its `Dr` is the distinct receiver factor and was not substituted. No new root evaluation was performed.

Measured: all four present separations, delays, ratios and emission factors equal the note's displayed values. Exact rational division of the encoded delay by the encoded separation rounds to each displayed ratio. The corresponding source-speed values are:

| Retained snapshot and ordered channel | Source speed | Excess above one |
| --- | ---: | ---: |
| Balance 0 seed 1, receiver 3 from 4 | 1.0000000002159668 | 2.1596679999902335e-10 |
| Balance 0 seed 1, receiver 4 from 3 | 1.0000000000968934 | 9.689338220653099e-11 |
| Balance 0 seed 2, receiver 2 from 5 | 1.0000000001558695 | 1.5586953949764393e-10 |
| Balance 0 seed 2, receiver 5 from 2 | 1.0000000000628881 | 6.288813914068214e-11 |

These are floating observations of retained interpolation data. Their explicit excesses mean these rows cannot be certified instances of the assumed unit-speed theorem. They do not show an actual trajectory violating its ceiling. Finite endpoint ratios establish neither a uniform ratio along an actual future approach nor a positive lower bound for the complete mean deficit; the counterexample establishes neither divergent ratios nor coincidence for these original preparations.

The seed-1 snapshot has time `8.28428534135345` and SHA-256 `0b16f799eb0ae9e686e8ea3f5507852b0028da52754f6efa472eba14c4adf3b3`. The seed-2 snapshot has time `8.420937994247105` and SHA-256 `6fa8e440360f7b97a4e929228db8fc6c3793cbf7508de3c26e2e1f231ba698c5`. Their `tag` fields identify `b0-s1-h2400-original-endpoint` and `b0-s2-h2400-original-endpoint` respectively. Every recorded NPZ, original metadata JSON and literal preparation hash matches the retained input bytes. The inspected snapshot-checker source is SHA-256 `ab9b60d40416883241e0290bb2543baa6daf82889a2f6d6ab9a1a70965b575bb`; this source read established field meanings and did not rerun the checker. Runtime evidence stays under the established `.local-data/master-equation-closure/overnight-d/` and `overnight2-d/` owners.

## Preservation, falsifiers and remaining boundary

The sole new authored file is this companion. The parent made and preserved the explicitly verified one-paragraph endpoint clarification; this reviewer did not edit the subject, snapshots, producer controls, old/current science or shared research account. Closing checks preserve both subject-stage identities, both snapshots and their recorded inputs, the producer-controls receipt and the inspected checker source. Relative links and whitespace are checked separately. No scientific target, evolution replay or heavy job was run.

A unit-speed absolutely continuous source violating the exact vector identity, a source with verified positive mean deficit but $R>r/\eta_*$, or a whole-delay Lipschitz source violating $\eta\ge D_s-MR/2$ would falsify the corresponding theorem. A missing negative root or a nonnegative precontact root in the explicit paths would falsify the counterexample analysis. An incorrect ordered-row selection or altered retained input would falsify the table verification. The preparation-specific obligation remains complete actual delay-history control, or a separately proved direct bound for the pair's mutual acceleration and projected response. The external-six conditional estimate does not resolve that obligation. This bounded review is complete and supplies no actual entry, contact, coincidence, escape or continuation theorem for the original balance-0 releases.
