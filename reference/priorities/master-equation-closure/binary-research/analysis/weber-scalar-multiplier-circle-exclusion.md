# No scalar multiple of a hit admits a mirror circle at or below the wake speed

**Status: written 2026-10-09 at the operator's direction as the first follow-up to the Codex review of the Weber investigations; derived by one session and checked numerically by it; independently reviewed by Codex on 2026-10-09, which reconstructed the proof and accepted it at derived grade without rerunning the numerical check.** This document carries out inquiry P-W-1 of the [follow-up inquiries](../../brainstorming.md#weber-follow-ups-from-the-2026-10-09-review--selected-by-the-operator-carried-out-one-at-a-time). It concerns two members on a rigid circle and proves an exclusion that holds for a whole class of comparison laws at once. It selects no equation, evolves no history and adopts nothing into canon. The [canonical Master Equation](../../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form) remains the baseline; the laws discussed are the research comparisons of the [equation-variants manuscript](../../equation-variants/manuscript.md#9a-selected-delayed-weber-adaptation).

## 1. Question and result

The [delayed-pair investigation](weber-delayed-pair-investigation.md) shows that the selected delayed Weber law has no rigid mirror circle at or below the wake speed, because its bracket equals one on such a circle and the canonical law has none. Its Corollary 4.4 then says, at leading order in the speed, that no scalar bracket of the form $1+O(1/c_f)$ changes the forward push that prevents the circle. The [2026-10-09 corrections](../../analysis/weber-review-corrections-2026-10-09.md#5-w5-the-class-of-scalar-factors-accepted) restricted the summaries of that statement to brackets with unit leading limit, since a leading-order coefficient depends on the bracket's leading value.

The question here is narrower and has a stronger answer. Suppose the acceleration that one hit contributes is multiplied by a scalar. Can any choice of that scalar make a rigid mirror circle an exact solution at or below the wake speed? It cannot, whatever the scalar is: positive, negative, zero, constant or varying, the same for both members or not, dependent on the history in any way. The same holds when the hit is aimed along the extrapolated direction of the first proposed delayed adaptation. The reason is geometric. With one hit per receiver, the acceleration is a number times a fixed direction, and that direction is never along the radius.

## 2. Setting

Two members move on a **rigid mirror circle**: with radius $R_0>0$ and angular rate $\Omega\ne0$,

$$
\mathbf X_1(T)=R_0(\cos\Omega T,\ \sin\Omega T),\qquad \mathbf X_2(T)=-\mathbf X_1(T).
$$

Their common speed is $|\Omega|R_0$ and the speed ratio is $\beta=|\Omega|R_0/c_f$. A reflection exchanges the two senses of rotation, so take $\Omega>0$. Fix a reception time $T$ and rotate the frame so that the receiver, member 1, is at $R_0\mathbf e_r$ and moves along $\mathbf e_\theta$; "radial" and "tangential" refer to these two unit vectors, and "forward" means along $+\mathbf e_\theta$.

A **hit** on the receiver is an emission of the transmitter at an earlier time $S=T-\tau$ whose wake arrives at $T$: the range $\mathscr R=\|\mathbf X_i(T)-\mathbf X_j(S)\|$ equals $c_f\tau>0$. Its line of action is the unit vector $\mathbf n$ from the emission point to the receiver, and its transmitter factor is $D_t=c_f-\mathbf n\cdot\mathbf V_j(S)$. The canonical law assigns to it the acceleration

$$
\mathbf a=\frac{\sigma K c_f}{\mathscr R^2|D_t|}\,\mathbf n ,
$$

with $K>0$ the coupling and $\sigma=\pm1$ the sign of the polarity product. The first proposed delayed adaptation, called P1 in its [expansion](weber-delayed-p1-slow-expansion.md), keeps the scalar prefactor and replaces $\mathbf n$ by the unit vector $\tilde{\mathbf n}$ along $\mathbf X_i(T)-\mathbf X_j(S)-\mathbf V_j(S)\,\tau$, the direction from the transmitter's position extrapolated at its emission velocity. Write $\tilde{\mathbf a}=\sigma Kc_f\tilde{\mathbf n}/(\mathscr R^2|D_t|)$.

Two classes of law are considered. In **class N** each hit contributes $m\,\mathbf a$; in **class E** each hit contributes $m\,\tilde{\mathbf a}$. In both, $m$ is a finite real number attached to that hit at that time, called the scalar multiplier. Nothing else is assumed about it. The canonical law is class N with $m=1$. The selected delayed Weber law of Section 9a is class N with $m$ equal to its bracket. P1 is class E with the same bracket. A law that adds a contribution in another direction, or that multiplies the hit by a matrix, belongs to neither class. Both classes sum the ordinary hits of the manuscript's Section 1: emissions at strictly earlier times, with positive range and positive delay. The proposition adds no prescription for the same-time point of a member's own path and no regularization.

A history **satisfies** a law at time $T$ when each member's actual acceleration equals the sum of its hits' contributions. For the rigid circle the actual acceleration of member 1 is $-\Omega^2\mathbf X_1(T)$: purely radial, inward, and nonzero.

## 3. The hits on the circle

**Lemma 1 (one hit per receiver).** On a rigid mirror circle with $0<\beta\le1$, each receiver has exactly one partner hit and no hit from its own past. The partner hit has delay $\tau=2\xi/\Omega$, where $\xi$ is the unique solution in $(0,\pi/2)$ of

$$
\xi=\beta\cos\xi ,
$$

and its transmitter factor is $D_t=c_f(1+\beta\sin\xi)>0$.

*Proof.* The chord from the receiver to the partner's position a time $\tau$ earlier has length $2R_0|\cos(\Omega\tau/2)|$. With $\xi=\Omega\tau/2>0$ the arrival condition $c_f\tau=2R_0|\cos\xi|$ reads $\xi=\beta|\cos\xi|$. Any solution has $\xi\le\beta\le1<\pi/2$, so $\cos\xi>0$ there, and on $(0,\pi/2)$ the function $\xi/\cos\xi$ increases strictly from $0$ without bound, so exactly one solution exists. The chord to the receiver's own earlier position has length $2R_0|\sin\xi|$, and the arrival condition $\xi=\beta|\sin\xi|$ has no solution with $\xi>0$ when $\beta\le1$, because $|\sin\xi|<\xi$. For the partner hit, the emission point is $R_0(-\cos2\xi,\ \sin2\xi)$ and the emission velocity is $-\beta c_f(\sin2\xi,\ \cos2\xi)$ in the components $(\mathbf e_r,\mathbf e_\theta)$, so

$$
\mathscr R=2R_0\cos\xi,\qquad \mathbf n=\cos\xi\,\mathbf e_r-\sin\xi\,\mathbf e_\theta,\qquad \mathbf n\cdot\mathbf V_2(S)=-\beta c_f\sin\xi ,
$$

which gives the stated $D_t$. $\square$

The lemma is where the wake speed enters. Above it, $\xi=\beta|\sin\xi|$ acquires solutions, so hits from the receiver's own past appear, and for larger $\beta$ further partner hits appear. The single-direction argument below then no longer applies.

**Lemma 2 (the hit is never radial).** Under the conditions of Lemma 1:

1. the tangential component of $\mathbf n$ is $-\sin\xi$, which is nonzero;
2. the tangential component of $\tilde{\mathbf n}$ is $-N/\sqrt{1+\beta^2+2\beta\sin\xi}$ with $N=\sin\xi-\beta\cos2\xi$, and $N>0$.

*Proof.* The first statement is read from Lemma 1, since $0<\xi<\pi/2$. For the second, $\mathbf X_1(T)-\mathbf X_2(S)-\mathbf V_2(S)\tau$ equals $2R_0\cos\xi$ times $(\cos\xi+\beta\sin2\xi)\,\mathbf e_r-(\sin\xi-\beta\cos2\xi)\,\mathbf e_\theta$, whose squared length is $1+\beta^2+2\beta\sin\xi>0$, so $\tilde{\mathbf n}$ is defined. Multiplying $N$ by $\cos\xi>0$ and using $\beta\cos\xi=\xi$ gives

$$
N\cos\xi=\tfrac12\sin2\xi-\xi\cos2\xi=:g(\xi),\qquad g(0)=0,\qquad g'(\xi)=2\xi\sin2\xi>0\quad(0<\xi<\pi/2),
$$

so $g>0$ and hence $N>0$ on the whole interval. $\square$

The positivity of $N$ for $0<\beta<1$ is also the adjudicated lemma of the [amplitude-gradient circle comparison](../../analysis/amplitude-gradient-regular-pair-investigation.md#7-exact-accelerated-circle-the-push-is-cubic-not-absent), which the P1 expansion cites. The short argument through $g$ was supplied by Codex in its review of 2026-10-09 and is reproduced here after verification of the derivative. It covers $\beta=1$ as well, because it holds for every $\xi$ in $(0,\pi/2)$.

## 4. The exclusion

**Proposition.** Let two members move on a rigid mirror circle with $R_0>0$, $\Omega\ne0$ and $0<\beta\le1$, with either polarity product and any coupling $K>0$. Then the history satisfies no law of class N and no law of class E at any time, for any finite real values of the scalar multipliers.

*Proof.* By Lemma 1 the receiver has a single hit, so under a class N law its acceleration would be $m\,\mathbf a$ and under a class E law $m\,\tilde{\mathbf a}$, for one real number $m$. The acceleration required by the circle is $-\Omega^2\mathbf X_1(T)$, which has zero tangential component. By Lemma 2 the vectors $\mathbf a$ and $\tilde{\mathbf a}$ have nonzero tangential components, so equality forces $m=0$. With $m=0$ the law gives zero acceleration, while the circle requires $-\Omega^2\mathbf X_1(T)\ne\mathbf 0$. Hence equality fails for every real $m$. $\square$

Several features of the statement follow from how little the proof uses.

- **Sign and size of the multiplier.** A positive multiplier leaves a tangential acceleration in one sense, a negative multiplier in the other, and a zero multiplier removes the centripetal acceleration together with the tangential one. No value works.
- **Dependence of the multiplier.** The argument is made at one instant for one receiver. The multiplier may therefore vary in time, differ between the two members, and depend on the history through ranges, their derivatives, speeds or accelerations. For an implicit law such as Section 9a, whose bracket contains the second derivative of the range, the bracket evaluated on the assumed circle is still one real number, and the proposition applies as long as that number is finite.
- **Rotation invariance.** It is not needed. A multiplier built from rotation-invariant scalars is constant along a rigid rotation, which is how the proposal for this inquiry first argued. That constancy would matter only for showing that a balance, once achieved, persists; it plays no part in showing that balance cannot be achieved.
- **Polarity.** The polarity product $\sigma$ multiplies the hit and can be absorbed into $m$. For opposite polarity and a positive multiplier the tangential acceleration is forward, which is the push identified in the investigation.
- **Endpoints.** The speed ratio $\beta=1$ is included for both classes, because Lemma 1 and Lemma 2 hold there. The limit $\beta\to0$ is not a circle with $\Omega\ne0$ and positive radius, and is excluded by hypothesis; as $\beta\to0$ the tangential component tends to zero but is positive for every $\beta>0$.

## 5. What the proposition does not say

**It is not the leading-coefficient statement.** On a slow circle the tangential acceleration under a class N law is $m$ times $K\sin\xi/\big(4R_0^2\cos^2\xi\,(1+\beta\sin\xi)\big)$, which tends to $m_0K\beta/(4R_0^2)$, and under a class E law it tends to $m_0K\beta^3/(3R_0^2)$, where $m_0$ is the limit of the multiplier for opposite polarity. The size and sense of the residual push therefore depend on the multiplier, and they are unchanged exactly when its leading limit is one. That is the restricted statement of the 2026-10-09 corrections, and it stands as written there. The proposition says only that the residual is never zero while a centripetal acceleration is present.

**It concerns exact rigid mirror circles.** It says nothing about bounded histories that are not rigid circles, about how such a pair evolves, or about whether a bound class exists. Those remain as graded in the investigation and the corrections.

**It stops at the wake speed.** For $\beta>1$ a receiver has more than one hit, the hits point in different directions, and their tangential parts can cancel. The canonical circles above the wake speed are an example.

**It is limited to two members.** A receiver on a ring of more than two members has several partner hits even below the wake speed, so the single-direction argument does not apply.

**It is limited to scalar multiples of the two stated directions.** A law with a contribution across the line of action, such as the acceleration-driven term of the Maxwell-shaped transmitter row, is in neither class, and the proposition is silent about it.

## 6. Checks performed

The check script [weber-scalar-multiplier-circle-check.mjs](../evidence/weber-scalar-multiplier-circle-check.mjs) was written for this document by the same session. It builds the hit from the members' positions and velocities in double precision, with $c_f=K=R_0=1$ and opposite polarity, locates the partner root from $\xi=\beta\cos\xi$, verifies it by the arrival residual computed from positions, and evaluates both directions without using the component formulas of Section 3.

Known cases, run before the targets:

| Known case | Returned | Reference |
| --- | --- | --- |
| Class N with $m=1$, $A_\theta/\beta$ at $\beta=0.01$ | $0.249983336166130$ | $0.24998333616613028$, computed separately by Codex on 2026-10-09; limit $1/4$ |
| Class E with $m=1$, $A_\theta/\beta^3$ at $\beta=0.01$ | $0.3332366955$ | $0.3332366955$, computed separately by Codex on 2026-10-09; limit $1/3$ |
| Root census by sign changes on $0<\xi\le40$ at $\beta=5$ | 3 partner roots, 3 own-past roots | More than one of each is expected well above the wake speed, so the counter can report multiplicity |

Targets, at $\beta=k/2000$ for $k=1,\dots,2000$, which includes $\beta=1$:

| Quantity | Value |
| --- | --- |
| Minimum of $A_\theta/\beta$, class N with $m=1$ | $0.18420700$, attained at $\beta=1$ |
| Minimum of $A_\theta/\beta^3$, class E with $m=1$ | $0.086859733$, attained at $\beta=1$ |
| Largest arrival residual $\lvert\mathscr R-c_f\tau\rvert$ | $1.1\times10^{-15}$ |
| Smallest transmitter factor $D_t$ | above $1$ |
| Root census at $\beta\in\{0.05,0.3,0.6,0.9,0.999,1\}$ | one partner root, no own-past root, in every case |
| At $\beta=1$: $\xi$; class N $(A_r,A_\theta)$; class E $(A_r,A_\theta)$ | $0.7390851332$; $(-0.20211137,\ 0.18420700)$; $(-0.25930023,\ 0.086859733)$ |

Claim grade of this section: measured, by the named script on the stated grid. It checks the geometry of Lemmas 1 and 2 on sampled speeds and establishes nothing beyond them; the proposition rests on the proofs. The agreement of the two known cases with Codex's numbers compares two separately written calculations of the same prescribed geometry. Codex reviewed the proposition and its proofs on 2026-10-09 by independent reconstruction of the root census, of both directions and of the pointwise argument, and accepted them; it did not rerun this script.

## 7. Claims, grades and falsifiers

| Claim | Grade | Falsifier |
| --- | --- | --- |
| Lemma 1: one partner hit, no own-past hit, $D_t>0$, for $0<\beta\le1$ | Derived | A second solution of $\xi=\beta\lvert\cos\xi\rvert$, or a positive solution of $\xi=\beta\lvert\sin\xi\rvert$, at some $\beta\le1$ |
| Lemma 2: nonzero tangential component of $\mathbf n$ and of $\tilde{\mathbf n}$ | Derived; the argument for $N>0$ supplied by Codex and verified here | A zero of $\sin\xi$ or of $\sin\xi-\beta\cos2\xi$ on the root curve for some $0<\beta\le1$ |
| Proposition: no finite scalar multiplier admits the circle, classes N and E, $0<\beta\le1$ | Derived; independently reviewed by Codex on 2026-10-09 by reconstruction of the proof; numerically checked on a grid by the author | A rigid mirror circle at some $0<\beta\le1$ and a real number $m$ for which $m\,\mathbf a$ or $m\,\tilde{\mathbf a}$ equals $-\Omega^2\mathbf X_1$ |
| Leading residuals $m_0K\beta/(4R_0^2)$ and $m_0K\beta^3/(3R_0^2)$ | Derived from the expansions already recorded in the investigation and the P1 expansion; their dependence on $m_0$ is immediate | For a multiplier that is nonzero on the circle, a slow circle on which the tangential acceleration divided by $m$ does not approach the base value $K\beta/(4R_0^2)$ for class N or $K\beta^3/(3R_0^2)$ for class E |

## 8. Relation to earlier statements

Theorem 3.1 and Corollary 3.3 of the investigation are the case of class N in which the multiplier is the Section 9a bracket, equal to one on the circle. The exact-circle result of the P1 expansion is the case of class E with that bracket; the source states it for $0<\beta<1$, and the present argument extends it to $\beta=1$. Corollary 4.4 of the investigation and Section 5 of the P1 expansion are leading-order statements about the size of the push and keep the class restriction given in the 2026-10-09 corrections. For the queued [case for closing the delayed Weber family](../work-queue.md#review-the-case-for-closing-the-delayed-weber-family-codex), the proposition means that step 2's conclusion about exact circles needs no restriction on the bracket, while its statement about the first-order push keeps the restriction. No investigation, reference or evidence file was changed in writing this document.
