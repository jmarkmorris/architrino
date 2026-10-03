# Inclusive field-speed ceiling for the logarithmic collinear approach

## Scope and independent reference

**Claim grade: derived, conditional on the explicitly modified response below.** This derivation starts from the [logarithmic reception definition](causal-logarithmic-formulation.md), its [incoming first-event theorem](causal-collinear-first-event.md), and the [shared ceiling definition](../../analysis/field-speed-ceiling-definition-and-shared-results.md). It was written independently without reading the new primary ceiling assessment. No numerical trajectory, external physical law, or event update is used.

The inclusive inequality alone is not an acceleration law. The examined modification combines three distinct clauses: the closed speed domain $|V_i|\le1$, the shared rule assigning zero self acceleration at and below that ceiling, and projection of the complete finite ordinary partner acceleration onto the admissible velocity response. This is an unadopted logarithmic variant of the shared ceiling model. A bare inequality does not imply either response clause.

The incoming histories have $c_f=1$, $a,K>0$, $0\le u_0<1$, and the complete affine supplied past $X_\pm(T)=\pm(a-u_0T)$ for $T\le0$. The established incoming trajectory reaches $u=1$ at time $T_v$ and positive half-separation $x_v$. Its one-sided inward acceleration has a finite strictly positive limit $A_v$. All formulas below retain these actual incoming histories, including emissions before release.

## The constrained response before coincidence

For a finite ordinary acceleration $A_i^{\mathrm{ord}}$ in one dimension, the inclusive rule is

$$
\dot V_i=
\begin{cases}
A_i^{\mathrm{ord}},&|V_i|<1,\\
A_i^{\mathrm{ord}}-\max(\widehat v_iA_i^{\mathrm{ord}},0)\widehat v_i,&|V_i|=1,
\end{cases}
\qquad \widehat v_i=V_i.
$$

The receiver first receives its complete finite ordinary input. Projection then removes a component that would increase speed past one; a component that slows the receiver remains. The declared self response is zero independently of this projection. Infinite input is outside this finite-input rule, so the expression cannot be read as an instruction to subtract one infinity from another.

Before contact the mirror partner contribution points inward. At $T_v$ the right label has $V_+=-1$ and the left label has $V_-=+1$. Their projected acceleration is zero. On every subsequent regular interval of positive separation the partner input remains inward, so the capped continuation is

$$
u(T)=1,\qquad x(T)=x_v-(T-T_v)=T_c-T,
\qquad T_c=T_v+x_v.
$$

These identities establish a solution on $[T_v,T_c)$ for the stated modified response. In the mirror collinear sector it cannot depart below the ceiling on this interval: the effective inward-speed derivative is nonnegative everywhere and zero on $u=1$, while the speed is bounded above by one. Thus an absolutely continuous speed beginning at one stays one. The result establishes arrival at the coincidence boundary as a limit, not a defined acceleration or event update at that boundary.

## Ordinary partner input near coincidence

Define the incoming source coordinate $P(S)=S+x(S)$. It is strictly increasing for $S<T_v$ and has value $P(T_v)=T_c$. On the capped source segment it is constant. For a reception $T<T_c$ in the capped segment, the partner equation is

$$
P(S)=T-x(T)=2T-T_c<T_c.
$$

It therefore has exactly one solution, with $S<T_v$. No capped-source emission yet contributes to this partner input. Let

$$
\varepsilon=T_c-T>0,\qquad \delta=T_v-S>0.
$$

The root equation becomes

$$
2\varepsilon=P(T_v)-P(T_v-\delta)
=\int_{T_v-\delta}^{T_v}[1-u(w)]\,dw.
$$

Finite positive incoming acceleration gives

$$
1-u(T_v-\delta)=A_v\delta+o(\delta),\qquad
2\varepsilon=\frac{A_v}{2}\delta^2+o(\delta^2).
$$

Consequently

$$
\delta\sim2\sqrt{\frac{\varepsilon}{A_v}},\qquad
D_t=1-u(S)\sim2\sqrt{A_v\varepsilon},\qquad
R=T-S=x_v+\delta-\varepsilon\longrightarrow x_v.
$$

The logarithmic ordinary inward input therefore obeys

$$
A_{\log}^{\mathrm{ord}}(T)
=\frac{K}{R[1-u(S)]}
\sim\frac{K}{2x_v\sqrt{A_v(T_c-T)}}.
$$

This input tends to infinity but is integrable from the incoming side. Its divergence comes from the source speed approaching one; its source-to-receiver distance tends to the positive value $x_v$. Projection is well defined at each $T<T_c$ and removes this forward input. The finite one-sided integral does not include the different emission family that collapses onto the coincidence instant.

The same geometrical computation for a separately evaluated inverse-square operator gives $G/[2x_v^2\sqrt{A_v(T_c-T)}]$. This comparison evaluates kernels on the displayed supplied history; it does not identify the incoming event data of independently evolved logarithmic and canonical models.

## Self reception requires the explicit zero-response clause

For every $T_v<T<T_c$ and every emission $S\in[T_v,T)$ on the same label,

$$
|X_i(T)-X_i(S)|=T-S,\qquad D_t=0.
$$

Thus a whole interval of self emissions lies on the receiver's characteristic path. These are not isolated ordinary roots. The shared ceiling modification explicitly makes this self family inactive. If only $|V_i|\le1$ were imposed while retaining the unmodified logarithmic self operator, the family would be undefined immediately after cap entry. Its absence from the active acceleration is a separate model clause, not a result of the inequality or the partner projection.

## The coincidence fiber is not a finite event input

At $T=T_c$ the receiver position is zero, and the partner's capped emissions satisfy

$$
S\in[T_v,T_c),\qquad X_-(S)=S-T_c,\qquad
R=T_c-S>0,\qquad D_t=0.
$$

The whole interval reaches the right receiver at the same instant. Earlier emissions $S<T_v$ do not belong to this fiber because $P(S)<T_c$. Excluding the same-time endpoint $S=T_c$ leaves the entire positive-delay interval and does not remove its singular accumulation.

The ordinary-root sum already fails here: the roots are nonisolated and their transmitter factor vanishes. A reception-time measure diagnostic makes the strength of this failure explicit, without supplying an event law. For each retained emission on a truncated interval $S\in[T_v,T_c-\eta]$, with $0<\eta<x_v$, a prescribed $C^1$ receiver continuation with the inherited velocity has $D_r=2$ at reception. Changing variables in reception time gives the inward event carrier

$$
d\mu_{\log}(S)=\frac{K}{2(T_c-S)}\,dS,
\qquad
\mu_{\log}([T_v,T_c-\eta])
=\frac K2\ln\frac{x_v}{\eta}.
$$

The truncated positive contributions are unbounded as $\eta\downarrow0$. Thus the natural source-provenanced pushforward cannot furnish a locally finite nonnegative event input. This is a diagnostic of the retained reception geometry, not a definition silently added to the finite-ledger ceiling rule. Either way, the stated rule has no finite complete partner input on which to act at coincidence.

The inverse-square comparison has truncated mass

$$
\mu_{\mathrm{can}}([T_v,T_c-\eta])
=\frac G2\left(\frac1\eta-\frac1{x_v}\right).
$$

The logarithmic replacement weakens this divergence from inverse distance to a logarithm, but does not make it finite. Vector cancellation between the two opposite receivers does not cancel either receiver's separate inward input.

## A straight passage trial and the retained crossing emission

Temporarily prescribe straight passage only to evaluate its causal geometry. Write $t=T-T_c>0$ and take

$$
X_+(T_c+t)=-t,\qquad X_-(T_c+t)=t.
$$

The right label's unique partner root is the crossing emission $S=T_c$. That emission occurs at the origin; the later receiver is a distance $t$ to its left. The root has

$$
R=t,\qquad n=-1,\qquad D_t=2,\qquad D_r=0.
$$

It is an ordinary source root at each $t>0$, with positive delay and nonzero transmitter factor. Its emission time is frozen, but zero playback does not mean zero acceleration. Opposite polarity gives rightward braking of magnitude

$$
A_{\mathrm{brake},\log}=\frac{K}{2t}.
$$

The ceiling retains this braking component. The prescribed constant-speed passage therefore fails the equation even away from the undefined coincidence event. Deleting the retained crossing emission because its playback is zero would be an additional rule; it is not part of this model.

## No continuous collinear passage with the inherited velocities

The failure extends beyond an exactly straight constant-speed trial. Suppose a proposed extension has continuous labeled velocities through coincidence, obeys the inclusive speed ceiling, remains collinear, and satisfies the ordinary modified equation almost everywhere after coincidence. Require velocity to be absolutely continuous on each compact interval strictly after $T_c$; no regularity of acceleration at the coincidence instant is assumed. Continuity with the inherited velocities makes both labels pass across the origin for a sufficiently short time. They need not remain mirror symmetric.

Write their positive outgoing distances and speeds as

$$
X_+(T_c+t)=-a(t),\qquad X_-(T_c+t)=b(t),\qquad
p(t)=a'(t),\qquad q(t)=b'(t),
$$

where $a(0)=b(0)=0$, $p(t),q(t)\to1$, and $0<p(t),q(t)\le1$ near zero. In particular $a(t)\le t$, $a(t)=t+o(t)$, and $b(t)=t+o(t)$.

No emission strictly before $T_c$ can reach the right label after coincidence. For an emission $S=T_c-s<T_c$, the old left-label position is $-x(S)$ with $0<x(S)\le s$, while $0<a(t)\le t$. Hence

$$
|X_+(T_c+t)-X_-(S)|=|x(S)-a(t)|<s+t.
$$

For partner emissions at or after coincidence, write $S=T_c+s$. The root equation is

$$
s+b(s)=t-a(t).
$$

Its left side is strictly increasing from zero, so it has exactly one solution $s(t)\ge0$ and $s(t)<t$. The case $a(t)=t$ gives $s=0$, retaining the crossing emission. Otherwise $s>0$. Since $t-a(t)=o(t)$ and $s\le t-a(t)$, one has

$$
s=o(t),\qquad R=t-s\sim t,\qquad D_t=1+q(s)\longrightarrow2.
$$

Thus the entire ordinary partner input is braking, with

$$
p'(t)=-\frac{K}{[t-s(t)][1+q(s(t))]}
\sim-\frac{K}{2t}.
$$

Projection does not alter that sign or magnitude, and self acceleration is zero by the stated modification. For all sufficiently small $t>0$, therefore $p'(t)\le-K/(4t)$. Integrating on $[\epsilon,t]$ gives

$$
p(t)-p(\epsilon)\le-\frac K4\ln\frac t\epsilon.
$$

The right side tends to negative infinity as $\epsilon\downarrow0$, while continuity requires $p(\epsilon)\to1$. This contradiction excludes every extension in the declared class. It does not assume a zero-impulse event prescription: velocity continuity is the stated class being tested, and the contradiction arises on open intervals after the event. Impulsive or discontinuous velocities, changed reception weights, dropped source emissions, and noncollinear updates are different hypotheses whose laws have not been supplied here.

## Disposition and falsifiers

The inclusive ceiling with explicit self-zero response removes the above-wake self-birth obstruction and supplies a capped approach from positive separation to the coincidence boundary. It does not close the encounter. Coincidence has a nonordinary partner family, the natural logarithmic event carrier has infinite mass, and any continuous collinear passage with inherited velocities would receive nonintegrable braking immediately afterward. No bounce, sticking, passage, annihilation, or selected discontinuity follows.

The statements can be refuted at specific mathematical steps: a different root satisfying the complete capped histories would refute the census; failure of the $A_v$ expansion would refute the square-root asymptotic; a finite limit of the displayed positive truncated event mass would refute its divergence; or a continuous capped collinear passage with a complete ordinary partner sum avoiding the derived $K/(2t)$ asymptotic would refute the continuation obstruction. A separately imposed event update does not test these results because it changes the response or the extension class.

## Assessment after comparison with the primary treatment

The derivation above was frozen before reading the [primary ceiling comparison](ceiling-comparison.md). Its SHA-256, measured by `shasum -a 256` before the comparison, was `7442d176e2747703f348c293632f48c3059055c258d53bcab7aaf2ffb1400672`. This assessment is appended separately; the independent derivation is preserved.

**Disposition: the primary inclusive conclusions agree with the independently derived results.** Its capped trajectory, source-time asymptotic, finite incoming raw integral, positive logarithmically divergent coincidence carrier, and retained frozen crossing emission all have the same equations and scope. The primary correctly distinguishes the explicit self-zero response from the bare inequality, applies projection only to complete finite input, and does not infer a coincidence update from the event-carrier diagnostic.

The primary's stronger postcoincidence bound is also valid: $s\ge0$ and $p_-\le1$ imply $R(1+p_-)\le2t$, hence $B_+\ge K/(2t)$ directly. This sharpens the sufficient asymptotic lower bound used above without changing the nonintegrability conclusion.

Two explanatory corrections were requested of the primary. First, the exclusion of negative-time partner roots should use the full chord inequality instead of relying on an implicitly selected chord orientation. For every old source time $S=T_c-h<T_c$, its position magnitude satisfies $0<x(S)\le h$, while the outgoing receiver distance obeys $0<a_+(t)\le t$; therefore $|x(S)-a_+(t)|<h+t$. This covers both the capped source segment and every earlier retained emission. Second, the extension's solution class should be explicit: velocity is continuous through coincidence and absolutely continuous on every compact subinterval strictly afterward. These corrections make the proof independently checkable; they do not alter its verdict or introduce an event prescription.

This comparison assesses the inclusive branch and shared scope only. It does not independently certify the primary's separate quadratic strict-speed derivation.

### Final clarification and manuscript recheck

Both requested primary clarifications are now present by direct rereading of its continuous-passage subsection: the complete old-source chord inequality excludes all precontact emissions without selecting an orientation, and the tested velocity class explicitly states continuity through contact, absolute continuity on compact outgoing intervals, and the equation almost everywhere there. The two clarification requests are closed.

The manuscript's [strict and inclusive comparison](../manuscript.md#strict-and-inclusive-speed-ceilings-for-logarithmic-attraction) faithfully carries the inclusive result. It separately states the zero-self response clause, limits projection to finite complete input, distinguishes the integrable incoming divergence from the nonfinite coincidence carrier, retains the frozen crossing emission, and bounds the passage exclusion to continuous collinear velocities whose changes equal integrated acceleration on compact outgoing intervals. It does not select a jump, halt, rebound, or other event update. No remaining inclusive-scope discrepancy was found in those reread sections; this is a textual and mathematical comparison against the frozen derivation, not a new numerical or global-dynamics result.
