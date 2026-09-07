# FSC-006b / FSC-005 — Two-Lobe Return Map and Autonomous-Trigger Audit

**Date:** 2026-09-02 **Status:** independently reviewed FSC-local theorem packet; the sufficient complete-lobe theorem, returning-event measure typing, prescribed-onset spatial two-cycle, and narrow selector exclusion survive with the repairs incorporated below; no full retained-state periodic orbit, field-speed ceiling, or canonical law is adopted. **Owner:** FSC-006b/FSC-005.

## Question and verdict

Does the minimal retained-history-plus-wake crossing state autonomously brake the exact mirror pair and close a regular collinear breather?

No. The minimal state has no changing admission variable on the exact outgoing plateau and therefore selects no positive braking onset. Conditional on prescribing the same onset after every exact-mirror event, however, the delayed partner row produces a complete brake--turn--inward-cap--coincidence lobe under the sufficient bound $K\ge7u_*/2$, and reflection gives a spatial two-cycle. The most direct reset candidate available from the event record, setting the next onset equal to the preceding inward-cap duration, has no positive fixed cycle in the analytically closed regime $K\ge6u_*$: the onset decreases after every lobe.

Plainly: the wake geometry can execute a complete returning excursion once an early-enough alarm time is supplied. The present state contains no alarm. Reusing the duration of the last incoming wake family as that alarm does not stabilize the excursion; it makes each later waiting interval shorter.

## Event-reduced state

Let $T_n$ be an exact-mirror coincidence, let $\epsilon_n\in\{+1,-1\}$ be label 1's outgoing orientation, and normalize $c_f=1$. Let $L_n>0$ be the duration of the final inward ceiling segment that arrives at $T_n$ as the matched cap family. After shifting $T_n$ to zero and reflecting the outgoing direction to the positive axis, the future-relevant event data are represented by

$$
Z_n
=
(\epsilon_n,K,L_n,S_{1\leftarrow2},S_{2\leftarrow1},\mathcal O_n),
$$

where both received partner clocks are on the coincidence-endpoint plateau and $\mathcal O_n$ owns the incoming interval $[-L_n,0]$ once. The full retained histories remain labeled. This reduction does not delete them; it uses the owned-family permanence lemma and the strict causal-margin argument below to identify which records cannot affect a later ordinary ledger.

Plainly: at each return, the event remembers which way the pair will leave, the coupling, the length of the just-arrived ceiling-speed segment, the two frozen reception clocks, and which wake family has already been counted.

## No autonomous onset in the minimal crossing state

On the exact straight outgoing trace after $T_n$, the partner clocks remain on their $s=0$ plateaus, the owned event record is unchanged, and the complete ordinary ledger is zero. Every new partner emission has strictly positive inactive margin and is not received. The minimal admission rule advances a received-source clock only after an independently generated geometric crossing. It therefore produces no state transition at any finite positive time.

This proves the following scoped negative.

> **Minimal-transition no-onset lemma.** In the isolated exact-mirror chart, the declared minimal crossing transition rule produces no admission-relevant state transition at any finite positive time on the exact zero-ledger outgoing plateau. Its selected crossing-state evolution remains straight unless another admitted contribution first creates a strict receiver-side crossing.

The lemma does not exclude every imaginable history functional. It says that any positive onset must add a new maturity, threshold, or event-state transition not present in the minimal crossing rule. The dynamically relevant dimensional event scalars in $Z_n$ are $K$ and $L_n$; a selector acting outside the ordinary ledger could additionally use earlier retained records, event counts, or accumulated lookback. That wider inventory increases rather than removes the underdetermination. Time-translation, reflection, and scale covariance alone permit the entire family

$$
u_n
=
K\,\Phi\!\left(\frac{L_n}{K}\right),
$$

with arbitrary dimensionless $\Phi$. The current wake-crossing clauses supply no equation for $\Phi$.

Plainly: symmetry can constrain the units of a new alarm rule, but it cannot choose the rule. Saying “use the coupling scale,” “use the previous cap length,” or any mixture of them is still an added selection unless the wake or action account derives that choice.

**Claim grade:** `derived negative` for the declared minimal crossing state and `underdetermination result` for symmetry alone. The result is falsified by an existing FSC clause that changes an admission-relevant state variable at a finite time on the zero-ledger straight plateau without using a new threshold, maturity rule, or independently admitted contribution.

## Complete returning-lobe theorem

Choose an onset $u_*>0$. Use the delayed-ignition variables

$$
x(t)=t-E(t),
\qquad
v(t)=1-m(t),
\qquad
E'=m,
$$

and let $s(t)$ be the unique partner source time while $x(t)>0$ and $-1<v(t)<1$. The mirror root equation is

$$
2s=E(t)+E(s).
$$

Writing $H(s)=2s-E(s)$ gives $H'(s)=2-m(s)=1+v(s)>0$ before the source enters an inward ceiling segment. Since $H(0)=0<E(t)$ and $H(t)-E(t)=2x(t)>0$, exactly one ordinary partner root exists throughout the pre-cap positive-separation chart. The opposite-polarity partner acceleration decreases $v$ monotonically.

The root census remains exact while the receiver rides the final inward cap. Let $t_{\mathrm{cap}}$ be its onset and $T_{n+1}$ the return coincidence. On that cap, $x(t)=T_{n+1}-t$ and $E(t)=2t-T_{n+1}$. For source times $s\in[t_{\mathrm{cap}},t]$, the source also lies on the inward cap and $H(s)=T_{n+1}$, while $E(t)<T_{n+1}$ for every $t<T_{n+1}$; hence this flat segment contains no partner root. On $[0,t_{\mathrm{cap}})$, $H$ is strictly increasing from $H(0)=0<E(t)$ to $H(t_{\mathrm{cap}})=T_{n+1}>E(t)$, so exactly one partner root exists and satisfies $s(t)<t_{\mathrm{cap}}$.

Each receiver also rides its own wake on the inward cap: for $s\in[t_{\mathrm{cap}},t)$ the same-transmitter margin is identically zero and $D_t=D_r=0$. Under the packet's [swept-branch reception rule](mathematics-geometry-dynamical-system.md#109-proposed-swept-source-reception-the-frozen-root-resolution), this is an inactive co-moving same-transmitter characteristic family, not an ordinary row. The complete classified ledger on the cap therefore contains one ordinary partner root and one inactive nonordinary self family.

Plainly: the partner-root function becomes flat over the already-emitted inward cap, but that flat value lies above the causal target until coincidence, so it contributes no extra partner root. The receiver's own cap wake is present as a nonordinary family and is recorded without being inserted into the ordinary acceleration sum.

On the stored-straight first chart, the exact first integral is

$$
2m-\frac{m^2}{2}
=
K\left(\frac{1}{u_*}-\frac{1}{y}\right),
\qquad
y=t-s(t).
$$

At $m=1$, the turnaround range is

$$
y_{\mathrm{turn}}
=
\frac{2Ku_*}{2K-3u_*}.
$$

For $K\ge3u_*$, the [first-chart turnaround proof](collinear-breather-under-ceiling.md#conditional-first-chart-braking-and-turnaround) gives $s_{\mathrm{turn}}<u_*$, while $m'>0$ makes $v$ strictly decreasing and therefore makes the unique turnaround the positive maximum $x_{\max}=x_{\mathrm{turn}}>0$. The stronger sufficient condition $K\ge7u_*/2$ gives

$$
x_{\max}
<
y_{\mathrm{turn}}
\le
\frac K2.
$$

Plainly: the first bound makes the pair stop while the active root still reads the known straight history. The stronger bound leaves enough inward acceleration budget to reach the inward ceiling before the pair can get back to coincidence.

After turnaround put $w=-v\ge0$. While $w<1$ and $x>0$, the active source also lies between the origin and $x_{\max}$. Its range and transmitter factor satisfy

$$
r=x(t)+x(s(t))
\le
x+x_{\max},
\qquad
1+v(s(t))
\le
2.
$$

Hence the inward acceleration magnitude $a=dw/dt$ obeys

$$
a
\ge
\frac{K}{2(x+x_{\max})^2}.
$$

Because $dx/dt=-w$, integration from the turnaround gives

$$
w(x)^2
\ge
K\left(
\frac{1}{x+x_{\max}}
-
\frac{1}{2x_{\max}}
\right).
$$

The single simple partner root, positive range, and positive $D_t$ floor make the post-turn right-hand side locally Lipschitz, so the branch continues until it reaches either $w=1$ or $x=0$. If it remained below $w=1$ until $x=0$, the displayed bound would give $w(0)^2\ge K/(2x_{\max})>1$, a contradiction. Continuity therefore forces $w=1$ at a positive position $x_{\mathrm{cap}}>0$. One explicit positive lower bound is

$$
x_{\mathrm{cap}}
\ge
\frac{x_{\max}(K-2x_{\max})}{K+2x_{\max}}
>0.
$$

The proposed ceiling response then removes only further inward speed increase, so the pair travels from $x_{\mathrm{cap}}$ to coincidence at $v=-1$. The resulting inward-cap duration is

$$
L_{\mathrm{out}}=x_{\mathrm{cap}}.
$$

Plainly: under $K\ge7u_*/2$, the pair cannot reach the origin while still moving slower than the wake. It first reaches the inward ceiling at a nonzero distance and then covers exactly that remaining distance at unit speed.

The ordinary partner root remains at source times before the cap onset while the receiver rides the final cap. It approaches the cap-start endpoint as coincidence is approached. Although its pointwise row can grow when $D_t=1+v(s)\downarrow0$, the source-clock identity $dt=(D_t/2)\,ds$ on the receiver cap gives

$$
\int
\frac{K}{r^2D_t}\,dt
=
\int
\frac{K}{2r^2}\,ds.
$$

The range tends to $L_{\mathrm{out}}>0$, so this ordinary open-interval contribution is locally integrable. In particular, its receiver-time measure has no atom at $T_{n+1}$ and therefore discharges the exact-mirror guard's no-incoming-remainder-atom clause. The limiting source time $s=t_{\mathrm{cap}}$ is assigned to the event carrier; the ordinary branch approaches it only from below, so there is no double counting. At coincidence, the newly emitted inward cap becomes the separately typed matched event family.

Plainly: the last ordinary wake row may become tall, but its reception interval becomes proportionally narrow. Its accumulated pre-event contribution stays finite because the returning pair reaches ceiling speed at a positive distance.

At the return time $T_{n+1}$, an earlier emission at $s<T_{n+1}$ has partner-event margin

$$
g(T_{n+1},s)
=
x(s)-(T_{n+1}-s)
\le
0.
$$

Equality holds exactly when the path traveled inward at speed $1$ throughout $[s,T_{n+1}]$, namely on the final cap. Every pre-cap record has strict negative margin and has already passed. The final cap is owned once by the exact-mirror event. Its proposed zero impulse is inherited from the common event law: the matched raw scalar records are aggregated on one carrier before a common label-blind, direction-blind linear event map is applied. It is not a cancellation through the ordinary radial kernel. The event preserves the incoming velocity, and the next outgoing orientation is $\epsilon_{n+1}=-\epsilon_n$.

> **Complete returning-lobe theorem.** Work in the isolated exact-mirror collinear class after the proposed zero-impulse restart, in normalized units $c_f=1$, with the packet's swept-branch reception rule classifying every co-moving same-transmitter interval at field speed as nonordinary. Let $u_*>0$ be prescribed and satisfy the sufficient condition $K\ge7u_*/2$. On the maximal post-onset continuation, each receiver has exactly one ordinary partner root before the return event, including on the inward cap, while its same-transmitter cap family is inactive and nonordinary. The branch has one positive-separation turnaround, reaches inward ceiling speed at $x_{\mathrm{cap}}>0$, and coasts to coincidence. Its open cap-approach partner contribution is locally integrable and has no event atom. The incoming state consequently satisfies the exact-mirror guard and resets to the same structural type with $\epsilon_{n+1}=-\epsilon_n$ and $L_{n+1}=x_{\mathrm{cap}}$.

**Claim grade:** `derived sufficient theorem inside the proposed FSC model`. It is not a canonical dynamics claim. It is falsified by a missed ordinary or nonordinary root, failure of the acceleration lower bound, arrival at coincidence before $w=1$, nonintegrability of the displayed cap approach, or failure of the exact-mirror event guard at the return.

## Prescribed-onset return map and spatial two-cycle

Let $G(K,u_*)$ denote the outgoing cap duration produced by the complete lobe. Earlier incoming cap length does not enter the post-event ordinary calculation because that family is owned and every earlier strict-margin record is permanently inactive. For a prescribed onset, the event-reduced return map is therefore

$$
\mathcal R_{u_*}(\epsilon,K,L)
=
\bigl(-\epsilon,K,G(K,u_*)\bigr).
$$

After one lobe, put $L_*=G(K,u_*)$. Repeating the same onset gives

$$
\mathcal R_{u_*}^2(\epsilon,K,L_*)
=
(\epsilon,K,L_*).
$$

If $P$ is the coincidence-to-coincidence lobe time, the reflected construction satisfies

$$
x_1(t+P)=-x_1(t),
\qquad
v_1(t+P)=-v_1(t),
$$

and therefore

$$
x_1(t+2P)=x_1(t),
\qquad
v_1(t+2P)=v_1(t).
$$

The partner identities follow by mirror symmetry. Thus equal prescribed onsets give a formal spatial breather returning each label to the same point and velocity after two lobes.

Plainly: if the same alarm is manually reset at every coincidence, the second excursion is the mirror image of the first. Two excursions return both position and direction. The geometry closes; the alarm rule has still been supplied by hand.

This is not yet a full retained-state periodic-orbit theorem. The literal all-past histories and ownership records grow after each event. A full delay-state claim requires either a bi-infinite shift-periodic history with locally finite typed ledgers or a proved future-equivalence quotient under which permanently inactive owned records are dynamically identical. Neither object is currently part of the proposed state definition.

## The cap-duration reset candidate does not close

The least embellished event-derived alarm is

$$
u_{n+1}=L_{n+1}:
$$

after the lobe from $T_n$ to $T_{n+1}$, wait for as long as the inward cap that arrived at $T_{n+1}$. Equivalently, $u_{n+1}=G(K,u_n)$. This uses no new dimensional scale or fitted constant, but it is still a proposed maturity rule rather than a consequence of geometric crossing.

In the analytically closed regime

$$
\alpha=\frac{K}{u_*}\ge6,
$$

the active root remains in the stored straight source segment until the receiver first reaches $m=2$. Set

$$
\zeta
=
\sqrt{\frac{2}{\alpha-2}}.
$$

Direct integration of the first-chart invariant gives the exact outgoing cap ratio

$$
\boxed{
\frac{G(K,u_*)}{u_*}
=
\ell(\alpha)
=
(1+\zeta^2)
\left(1-\zeta\arctan\zeta\right).
}
$$

The source time at cap onset is

$$
\frac{s_{\mathrm{cap}}}{u_*}
=
(1+\zeta^2)\zeta\arctan\zeta
<
(1+\zeta^2)\zeta^2
\le
\frac34,
$$

which verifies the stored-straight assumption. Moreover, $\arctan\zeta>\zeta/(1+\zeta^2)$ for $\zeta>0$, while $\zeta\arctan\zeta<\zeta^2\le1/2$. Therefore

$$
0<\ell(\alpha)<1.
$$

The restriction $\alpha\ge6$ is load-bearing: it guarantees both $s_{\mathrm{cap}}<u_*$ and positivity of the closed-form cap duration. The formula must not be extrapolated below the stored-straight chart on which it was derived.

Plainly: when the coupling is strong enough for a closed formula, the newly produced incoming cap is always shorter than the waiting interval that produced it.

Under the cap-duration rule and $K\ge6u_n$,

$$
u_{n+1}
=
u_n\ell(K/u_n)
<
u_n.
$$

The condition remains true at every later lobe because $K/u_n$ increases. No positive fixed onset exists in this regime: a positive limit would require $\ell(K/u)=1$, which is impossible. The onset sequence instead decreases toward the excluded immediate-onset boundary $u=0$.

The exact coincidence-to-coincidence lobe period in this regime is

$$
P(K,u_*)
=
2(1+\zeta^2)u_*
=
\frac{2Ku_*}{K-2u_*}.
$$

Moreover,

$$
\ell(\alpha)
=
1-\frac{8}{3(\alpha-2)^2}
+
O\!\left((\alpha-2)^{-3}\right),
$$

so $u_n$ decays on the order of $n^{-1/2}$ and $P_n\sim2u_n$. Hence $\sum_nP_n$ diverges: the shrinking sequence approaches zero only over infinite absolute time and has no finite-time accumulation. It is nonstationary and is not a regular breather, but it is not a finite-time collapse.

Plainly: the cap-duration alarm produces endlessly smaller excursions. They become small slowly enough that infinitely many lobes still require infinite time.

**Claim grade:** `derived negative` for the cap-duration reset candidate when $K/u\ge6$. The claim is falsified by an algebraic error in the boxed cap ratio, a source time leaving the straight segment despite the displayed bound, or a positive solution of $\ell(\alpha)=1$ in the declared regime.

## Exact decision boundary

The FSC-local results now separate cleanly:

1. the minimal crossing state selects no braking onset and therefore no returning lobe;
2. a prescribed onset with $K\ge7u_*/2$ gives a complete returning lobe;
3. prescribing the same onset after every event gives a spatial two-cycle;
4. the current full retained state has not been proved shift-periodic;
5. using the preceding cap duration as the next onset fails to produce a positive fixed cycle for $K/u\ge6$; and
6. any other deterministic positive onset requires a new functional $\Phi$, whose derivation remains open.

The existing FSC action and wake-account material does not narrow that freedom. The constrained-response axiom projects a completed acceleration ledger but assigns no stored account to its rejected boundary component. The exact-mirror event carrier proves a zero matched impulse but supplies no positive clock increment or maturity balance. Sections 12--14 state only a conditional interface for a future cycle action, same-record energy identity, wake account, and boundary account; the independent review confirms that none has been derived. Consequently, no current FSC equation can determine $\Phi$ or a positive fixed point of the cap map.

Plainly: there is no hidden conservation or action formula available to set the alarm. Invoking one now would not complete the proposed retained-history solution; it would add a new foundational law whose own derivation and event accounting would still be required.

> **Current-authority selector-exclusion corollary.** Within the declared FSC crossing state, constrained response, exact-mirror event carrier, and existing conditional action/wake interfaces, no autonomous positive-onset functional is defined. The exact-mirror continuation therefore remains multivalued, with straight passage and prescribed-onset spatial breathers as different compatible selections rather than one autonomous prediction.

**Claim grade:** `derived closure at current declared authority`. This does not prove that no future wake or action theory can derive a selector. It is falsified by an already declared FSC equation that maps the exact event state to one finite positive onset while preserving the stated crossing, ownership, and scale-covariance obligations.

No Master Equation, reader-facing corpus, or general field-speed law receives this result without a separate operator promotion decision.

## Independent-review disposition

The [independent complete-lobe and returning-event review](independent-complete-lobe-returning-event-review-2026-09-02.md) was accepted with repairs. FSC-LR-1, FSC-LR-2, and FSC-LR-9 are incorporated in the completed root census and continuation argument. FSC-LR-3 is resolved in the sibling breather note by retaining the packet's inactive-family disposition and withdrawing the unadopted atomic-projection account. FSC-LR-4, FSC-LR-5, and FSC-LR-16 are corrected here and in the queue records. FSC-LR-6 through FSC-LR-8 and FSC-LR-10 through FSC-LR-15 and FSC-LR-17 are incorporated as scope repairs, provenance, event typing, sufficient-bound calibration, endpoint ownership, exact period, and no-finite-time-accumulation statements. The review's numerical instruments remain falsifier searches and consistency checks, not proof of the proposed law.

No finding was rejected or deferred for operator doctrine. The review does not adopt the ceiling, select an onset, establish literal all-past periodicity, or promote any result beyond the Field-Speed Ceiling lane.

## Next artifact

The independent theorem and returning-event measure review is complete. The next highest-value artifact is a future-equivalence quotient theorem for the isolated exact-mirror history space: prove or refute that states differing only by permanently inactive owned records induce identical future ordinary ledgers and that the event-reduced return map descends to the quotient. A successful theorem would upgrade the prescribed-onset result from periodic path and event-reduced state to a periodic state of that declared quotient, without supplying the still-missing autonomous onset selector.

## Closure goal

Construct the future-equivalence quotient for permanently inactive owned records and determine whether the prescribed-onset spatial two-cycle is a periodic state of that quotient. Reopen autonomous braking only if a future FSC wake or action law explicitly derives a reset-compatible $\Phi$ and passes $L=G(K,K\Phi(L/K))$.
