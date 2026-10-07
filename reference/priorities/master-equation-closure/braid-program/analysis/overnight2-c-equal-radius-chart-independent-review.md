# Independent reconstruction of the equal-radius causal-angle chart

## Verdict and review boundary

**Derived verdict:** the [frozen equal-radius chart](overnight2-c-equal-radius-next-step.md) is correct for three neutral antipodal pairs on a common circle of radius $a>0$, distinct simultaneous member positions, positive angular rate $u$, and $0<v=ua\le1$. The selected equation has $K_{\log}=c_f=1$, unit persistent polarities, the unchanged transmitter factor, and every ordinary positive-delay hit. The complete history has exactly thirty directed partner roots and zero positive self roots. The stated radial and tangential rows, and the six scalar equations at the three positive receivers, follow from that complete census. No mathematical defect was found in this chart.

This is an independent geometric reconstruction, not numerical target replay, an existence result, a finite-speed exclusion, or a stability result. The positive self-root exclusion includes the closed speed boundary; it does not authorize continuation above that boundary. The review uses the live Ramon E. Moore role as an analytical lens, with the parent retaining integration authority.

## Reconstructing the geometry before the row formula

Choose reception time zero, receiver $x=(a,0)$, positive rotation counterclockwise, and present source position $y=a(\cos\beta,-\sin\beta)$, where the clockwise present separation is $\beta\in(0,2\pi)$. The complete source path is $z(-\tau)=\operatorname{Rot}(-u\tau)y$. A causal hit obeys $\tau=|x-z(-\tau)|$. In particular, every positive hit in the entire infinite history lies in $0<\tau\le2a$; later delays cannot be hits because a chord never exceeds the diameter.

Let $\alpha\in[0,2\pi)$ be the clockwise emission separation reduced modulo $2\pi$. Emission coincidence would give chord length zero and hence $\tau=0$, so any positive hit has $0<\alpha<2\pi$. Its chord and direction are

$$
x-z(-\tau)=a(1-\cos\alpha,\sin\alpha),\qquad
\tau=2a\sin(\alpha/2),\qquad
n=(\sin(\alpha/2),\cos(\alpha/2)).
$$

Circular motion first gives the modular relation $\alpha\equiv\beta+u\tau\pmod{2\pi}$. Substituting the chord equation yields

$$
\beta\equiv H_v(\alpha):=\alpha-2v\sin(\alpha/2)\pmod{2\pi}.
$$

The modular step cannot simply be discarded. For every $0<\alpha<2\pi$ and $0<v\le1$,

$$
0<\alpha-2v\sin(\alpha/2)<2\pi.
$$

The lower inequality follows from $\sin x<x$ for $x>0$ and $v\le1$; the upper follows from $H_v(\alpha)<\alpha<2\pi$. Thus both $\beta$ and $H_v(\alpha)$ are representatives in the same open interval, and the modular equality is the exact equality $H_v(\alpha)=\beta$. This excludes all extra winding branches rather than selecting one of them.

Conversely, if $H_v(\alpha)=\beta$ in this interval and $\tau=2a\sin(\alpha/2)$, then $\alpha=\beta+u\tau$ exactly. The complete circular source path therefore has precisely the claimed emission point and satisfies the unsquared causal equation. No spurious root is introduced by squaring a distance equation.

## Census, multiplicity, and transmitter factor

The endpoint values and derivative are

$$
H_v(0)=0,\qquad H_v(2\pi)=2\pi,\qquad
H_v'(\alpha)=1-v\cos(\alpha/2)>0\quad(0<\alpha<2\pi).
$$

Consequently each distinct present partner has exactly one positive-delay root, including at $v=1$. For self reception the present separation is zero modulo $2\pi$, whereas $H_v(\alpha)$ is strictly between the two multiples $0$ and $2\pi$ at every positive hit. There is therefore no positive self root. The zero-delay coincidence is excluded by the ordinary positive-delay law and is not counted. Six receivers, each with five distinct partners, supply thirty directed roots, with no omitted additional history interval.

The source emission velocity is $V_s=ua(\sin\alpha,\cos\alpha)$, so

$$
n\cdot V_s=v\cos(\alpha/2),\qquad
D=1-n\cdot V_s=1-v\cos(\alpha/2)=H_v'(\alpha)>0.
$$

For the delay gap $g(\tau)=|x-z(-\tau)|-\tau$, differentiation at the hit gives $g'=-D<0$. Thus these are ordinary simple causal roots, and replacing $|D|$ by $D$ is justified. At $v=1$ the derivative vanishes only at the excluded angle endpoint $\alpha=0$. Distinctness alone does not provide a uniform positive $D$ bound over a family whose present separations approach zero. In fact $H_1(\alpha)=\alpha^3/24+O(\alpha^5)$ and $D=\alpha^2/8+O(\alpha^4)$ near that endpoint. This conditioning qualification does not change the pointwise root census.

## Rows and all six balance equations

The coefficient-one logarithmic row is $q_iq_j n/(\tau|D|)$. Substitution of the independently reconstructed chord and transmitter factor gives

$$
A_{ij,r}=\frac{q_iq_j}{2aD_{ij}},\qquad
A_{ij,t}=\frac{q_iq_j\cot(\alpha_{ij}/2)}{2aD_{ij}},\qquad
D_{ij}=1-v\cos(\alpha_{ij}/2).
$$

In particular, the tangential sign changes at $\alpha=\pi$ for a fixed polarity product; replacing the signed cotangent by its magnitude would alter the law. The prescribed circular acceleration has local components $(-u^2a,0)=(-v^2/a,0)$. Multiplication of the full vector balance by $2a$ therefore gives, at every receiver,

$$
\sum_{j\ne i}\frac{q_iq_j}{D_{ij}}=-2v^2,
\qquad
\sum_{j\ne i}\frac{q_iq_j\cot(\alpha_{ij}/2)}{D_{ij}}=0.
$$

To keep the phase correlations explicit, choose three positive-endpoint phases $\phi_k$ and define member phases $\theta_{k,+}=\phi_k$, $\theta_{k,-}=\phi_k+\pi$, with polarities $q_{k,\pm}=\pm1$. Then

$$
\beta_{ij}=(\theta_i-\theta_j)\bmod 2\pi\in(0,2\pi),\qquad
\alpha_{ij}=H_v^{-1}(\beta_{ij}).
$$

All six positions being distinct is exactly what keeps every partner $\beta_{ij}$ inside the open interval. Angles cannot be assigned independently: the common member phases impose all cyclic and antipodal relations, including $\beta_{ji}=2\pi-\beta_{ij}$. Because causal delay acts in the same rotation direction, one must not infer the corresponding complementary identity for the emission angles without applying $H_v$.

The antipodal map sends each receiver and source to its partner and flips both polarities. It preserves their polarity product, clockwise separation, delay, and transmitter factor. The global row vector and prescribed acceleration both reverse, while the receiver's local radial and tangential frame also reverses. Thus the local balance equations at a negative receiver are identical to those at its positive partner. The three positive receivers give the complete six scalar equations; this symmetry does not discard any of the thirty roots.

## Independent controls and falsifiers

The following are hand-derived controls, not outputs from a new numerical instrument. At $v=0$, $H_0(\alpha)=\alpha$, $D=1$, and the row reduces directly to the static logarithmic chord row. Neutrality gives $\sum_{j\ne i}q_iq_j=q_i(\sum_jq_j-q_i)=-1$, so the static radial balance cannot equal zero. At emission angle $\alpha=\pi$, the chord is a diameter, $\tau=2a$, $D=1$, and the tangential row vanishes; its present angle is $\beta=\pi-2v>0$. The latter distinction checks that an emission antipode and a present antipode are not conflated.

The chart would be falsified by an ordinary positive hit with $\tau>2a$, a hit whose modular branch evades $0<H_v(\alpha)<2\pi$, a second interior solution of $H_v(\alpha)=\beta$, or a direct chord/velocity computation disagreeing with $n$ or $D$ above. The six-equation reduction would fail if pair polarities were not opposite or paths were not related by the common half-turn symmetry. These are explicit assumption changes, not uncovered branches within this chart.

The chart alone supplies no total signed-tangential inequality, no finite-speed exclusion, no exact equilibrium, and no neighborhood exclusion for unequal radii. Any subsequent diagnostic using it must preserve linked phases, complete rows, and the distinction between measured sample signs and a phase-wide theorem.

## Provenance and execution boundary

The frozen subject identity measured with `shasum -a 256` was `35e818b993396ca02cf02facbc44c40a66ff242d2ba56c3add0c217f55d4e873`. This review changed only its own new Markdown file. No subject, old review, main report, shared owner, solver, or oracle was edited; no Python calculation, numerical grid, interval cover, Git mutation, or background worker was run for this review.

The live plan and second C report preserve launch 2026-10-07 03:25:15 UTC, exploration stop 13:55:15 UTC, and hard deadline 15:25:15 UTC. The clock tool returned 05:32:16 UTC during this review. This independent derivation was completed within that unchanged allocation and the existing single-reviewer scope. The parent owns any promotion into the C report.
