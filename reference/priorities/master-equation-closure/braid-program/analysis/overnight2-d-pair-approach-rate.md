# A conditional rate of present-pair approach

## Purpose and limits

The [directional ceiling bound](overnight2-d-attractive-ceiling-direction.md) controls each receiver relative to its partner's delayed position. The [mean directional deficit identity](overnight2-d-approach-delay-geometry.md) controls the relation between delayed and present separation. Combining them yields a quantitative rate of present approach. This is a derived conditional component for the original eight-member balance-0 investigation, accepted by the [independent derivation and controls](overnight2-d-eighth-input-and-approach-rate-independent-review.md). It establishes no entry condition for either original release and imports no result from another preparation.

Use normalized wake speed one. Consider two members, labelled $i,j$, on an existing ordinary interval. Positions are absolutely continuous; velocities and delayed directions have the regularity required by the two cited components. Let

$$
d=X_i(t)-X_j(t),\qquad r=|d|>0,\qquad u=d/r.
$$

For the channel received by $i$, write its delayed range and direction as $R_i>0$ and $n_i$, directed from the earlier source $j$ to the present receiver $i$. For the reverse channel use $R_j,n_j$. Assume all source velocities over the complete two delay intervals have norm at most one. Each receiver is on the selected unit-speed ceiling, with directional bounds

$$
|V_i+n_i|\le k_iR_i,\qquad |V_j+n_j|\le k_jR_j,
$$

where $k_i,k_j\ge0$. These are premises, which may be supplied by the separate attractive-direction theorem only when all its original entry, external-acceleration and continuation conditions are established.

Define the complete mean deficits

$$
\eta_i=\frac1{R_i}\int_{t-R_i}^t(1-n_i\cdot V_j(q))\,dq,
\qquad
\eta_j=\frac1{R_j}\int_{t-R_j}^t(1-n_j\cdot V_i(q))\,dq.
$$

The directions are fixed at the reception under consideration while each integral covers its full source interval. Require independently established constants $0<\underline\eta_i,\underline\eta_j\le2$ such that $\eta_i\ge\underline\eta_i$ and $\eta_j\ge\underline\eta_j$ throughout the proposed interval. A positive transmitter factor at one emission or a measured endpoint ratio does not establish these premises.

## From the delayed direction to the present direction

The exact identities for the first channel give

$$
n_i\cdot d=R_i\eta_i,\qquad r^2\le2R_i^2\eta_i.
$$

Therefore

$$
u\cdot n_i=\frac{R_i\eta_i}{r}\ge\sqrt{\frac{\eta_i}{2}}\ge\sqrt{\frac{\underline\eta_i}{2}},
\qquad R_i\le\frac r{\underline\eta_i}.
$$

The upper range inequality follows independently from $n_i\cdot d\le r$. Apply the same argument to the reverse present displacement $-d$:

$$
-u\cdot n_j\ge\sqrt{\frac{\underline\eta_j}{2}},\qquad R_j\le\frac r{\underline\eta_j}.
$$

The square-root directional bound is sharp for the kinematic information used. Choose a fixed delayed direction $n=(1,0,0)$ and a constant unit source velocity $V=(7/25,24/25,0)$ over a delay of length $R$. Then $\eta=18/25$, $d=R(18/25,-24/25,0)$, $r=6R/5$ and $u=(3/5,-4/5,0)$. Thus $u\cdot n=3/5=\sqrt{\eta/2}$. This is an exact geometric control, not a master-equation trajectory or an original preparation.

## Differential and finite-horizon consequences

Write $e_i=V_i+n_i$ and $e_j=V_j+n_j$. At almost every time with positive present separation,

$$
\dot r=u\cdot(V_i-V_j)
=-u\cdot n_i+u\cdot n_j+u\cdot(e_i-e_j)
\le-\sigma+\lambda r,
$$

where

$$
\sigma=\sqrt{\underline\eta_i/2}+\sqrt{\underline\eta_j/2},
\qquad
\lambda=\frac{k_i}{\underline\eta_i}+\frac{k_j}{\underline\eta_j}.
$$

Choose an initial upper bound $\bar r$ with $0<r(t_0)\le\bar r$ and strict margin $\nu=\sigma-\lambda\bar r>0$. A first-exit argument at $r=\bar r$ preserves this upper boundary while the premises hold. Consequently $\dot r\le-\nu$ almost everywhere and

$$
r(t)\le r(t_0)-\nu(t-t_0).
$$

No ordinary positive-separation interval satisfying all these premises can extend past $t_0+r(t_0)/\nu$. By that time, either present separation has reached zero or the ordinary continuation or one of the stated premises has ceased. The theorem does not choose among contact, a nonordinary causal factor, failed source-deficit control, failed directional or external bounds, or another missing continuation condition. It does not supply a law beyond such a boundary. If the limiting endpoint is not part of an existing continuation, the conclusion excludes a longer positive-separation interval with all premises intact; it does not assert an attained contact at that endpoint.

For equal constants $k_i=k_j=k$ and $\underline\eta_i=\underline\eta_j=\eta_*$, the strict rate condition is

$$
\bar r<\frac{\eta_*^{3/2}}{\sqrt2\,k}
$$

when $k>0$. It requires information about the complete source histories; the unit-speed ceiling alone does not imply it. If $k=0$, the same differential bound holds with $\lambda=0$ and rate $\sigma$.

## Exact controls, original-entry gap and falsifiers

A rational sufficient-condition control takes $\underline\eta_i=\underline\eta_j=1/2$, $k_i=k_j=3$ and $\bar r=3/1000$. It gives $\sigma=1$, $\lambda=12$, $\nu=241/250$ and upper duration $\bar r/\nu=3/964$. These constants illustrate the theorem only; in particular, they are not certified source-deficit or interval-length values for either original balance-0 release.

The existing numerical close-pair observations have not established actual capped entry, the complete external-six bound, or a positive mean deficit over each actual delay interval and subsequent approach. All three remain required. This component identifies a deciding sufficient inequality once those premises are available; it does not convert the numerical observations into a contact claim.

An admissible unit-speed source violating the square-root directional bound, an exact pair meeting every stated premise with $\dot r>-\sigma+\lambda r$, or a positive-separation continuation past the stated horizon with all premises intact would falsify the corresponding result. Exact-rational controls and the separate mathematical review passed. The reviewed-stage note remains preserved under the task runtime owner before this status update and explicit endpoint qualification. No new trajectory, regular test suite or numerical release is introduced here.
