# Exact leading asymptotics of the admitted zero-speed radial escapes

## Statement and inherited domain

**Claim grade: derived candidate, pending a separate independent assessment.** Fix $1<p\le2$, $K=R_*=c_f=1$ and one of the complete compatible mirror-planar preparations covered by the [fixed-power global theorem](alternatives-screen-2026-10-05-radial-power-family-global.md) and its [independent reconstruction](alternatives-screen-2026-10-05-radial-power-family-adjudication.md). Suppose that member selects zero terminal speed. The separate [selection assessment](alternatives-screen-2026-10-05-radial-power-family-zero-speed-adjudication.md) establishes existence of such parameters arbitrarily near zero but locates none. This argument improves their radius comparability to an exact leading asymptotic, without changing a history, coefficient, source census or launch threshold.

Write physical member radius $r(T)=|q(T)|$, radial speed $u=r'$, polar angle $\theta$ and physical areal rate $H=q\times q'$. These are physical-time quantities; $H$ is not the scaled $h$ in the preceding proof and is not called a conserved account. For this fixed member, the global theorem gives

$$
r\longrightarrow\infty,\qquad q'\longrightarrow0,\qquad
H\longrightarrow H_\infty\in(0,\infty),\qquad
\theta\longrightarrow\theta_\infty.
$$

Indeed its finite weighted endpoint has finite positive $a_\infty$, while scaled $h=a^{(3-p)/2}$ and physical $H=\epsilon r_0h$. The zero-speed endpoint has $y\asymp\chi_\infty-\chi>0$ sufficiently late, so $u>0$ eventually. Its whole future and supplied past have one common strict speed margin. Every finite time is separated and ordinary, with exactly one partner source and no positive-delay self source.

Put

$$
\alpha_p=\frac2{p+1},\qquad
C_p=\left[\frac{p+1}{2}\sqrt{\frac{2^{1-p}}{p-1}}\right]^{2/(p+1)}.
$$

The claim is

$$
r(T)\sim C_pT^{\alpha_p},\qquad
u(T)\sim\alpha_p C_pT^{\alpha_p-1},
$$

$$
\theta_\infty-\theta(T)
\sim\frac{H_\infty}{(2\alpha_p-1)C_p^2}\,T^{1-2\alpha_p}.
$$

Here $\sim$ means that the ratio tends to one for this fixed launch as physical time tends to infinity. The coefficient $C_p$ is independent of the selected launch within the zero-speed class. There is no joint uniform limit in launch parameter or exponent. The angular coefficient retains the actual history-dependent $H_\infty$.

## The complete source interval becomes slowly varying

Let $S(T)$ be the unique partner time and $\tau=T-S=|q(T)+q(S)|$. If the complete speed bound is $b<1$, then

$$
\tau\le2r(T)+|q(S)-q(T)|\le2r(T)+b\tau,
\qquad \tau\le\frac{2r(T)}{1-b}.
$$

The velocity limit zero implies $q(T)/T\to0$ by integration, hence $r(T)/T\to0$. Therefore $\tau/T\to0$ and $S(T)/T\to1$. In particular the complete receiving source interval moves to arbitrarily late generated history. If $m(T)=\sup_{s\in[S(T),T]}|q'(s)|$, the velocity limit gives $m(T)\to0$. Consequently

$$
\frac{|q(S)-q(T)|}{r(T)}
\le\frac{m(T)\tau}{r(T)}
\le\frac{2m(T)}{1-b}\longrightarrow0.
$$

Thus $q(S)/r(T)\to n(T)$ in norm, where $n(T)=q(T)/r(T)$, and

$$
\frac{\tau}{2r(T)}\to1,\qquad
N(T)=\frac{q(T)+q(S)}{\tau}=n(T)+o(1).
$$

The partner's velocity is $-q'(S)$, so its transmitter factor is $D=1+N\cdot q'(S)\to1$. The exact selected acceleration is $q''=-N/(\tau^pD)$. These limits concern the actual complete root and source path, not a replacement circular or instantaneous history. Taking the current radial projection gives

$$
q''\cdot n=-2^{-p}r^{-p}[1+o(1)].
$$

## Integrating the actual radial equation

The exact polar identity is $r''=H^2/r^3+q''\cdot n$. Since $H$ has a finite limit and $p<3$,

$$
r''=-2^{-p}r^{-p}[1+o(1)].
$$

In particular $u$ is eventually positive and decreasing to zero. Invert the eventually increasing radius as a time coordinate. The chain rule gives $d(u^2)/dr=2r''$. Integrate from the current radius to infinity using $u(\infty)=0$. For every fixed positive tolerance, the preceding radial limit bounds the integrand above and below by the corresponding constant multiples of $r^{-p}$ on a sufficiently late whole tail. Since $p>1$, both bounds integrate and then the tolerance tends to zero. This yields

$$
u^2\sim\frac{2^{1-p}}{p-1}\,r^{1-p}.
$$

This is an integrated identity along the actual delayed solution, not conservation of a central comparison function. Taking the positive square root and differentiating $r^{(p+1)/2}$ gives a derivative tending to

$$
\frac{p+1}{2}\sqrt{\frac{2^{1-p}}{p-1}}.
$$

Integration gives the asserted exact radius coefficient and, on substitution, the radial-speed coefficient. Transverse physical speed is $H/r=o(u)$ because $p<3$, so total speed also satisfies $|q'|\sim u$.

Finally $\theta'=H/r^2\sim H_\infty C_p^{-2}T^{-2\alpha_p}$. Here $2\alpha_p>1$, so the same tail-sandwich argument yields the stated remaining-angle asymptotic. It is positive because $H_\infty>0$ and the original orientation is positive. The reflected member has the same radius and the opposite Cartesian velocity.

## Scope and falsifiers

The argument works conditionally for any mirror-planar ordinary radial solution with $1<p<3$ that has the stated global strict margin, zero velocity limit, eventual increasing radius and finite positive areal-rate limit. The current existence and selection dependencies establish those hypotheses only on their admitted $1<p\le2$ family. No existence conclusion for $2<p<3$ is inferred from the larger conditional asymptotic range. At $p=1$ the radial tail integral diverges; at $p=3$ the centrifugal term has the same order and changes the calculation. Neither endpoint belongs to this result.

The coefficient concerns a member radius; pair separation is $2r$ and has twice that coefficient. No parameter is located, no positive-terminal-speed member is constructed, and no perturbative stability, capture or persistent binary is established. The existing canonical wider theorem may supply other trajectories satisfying the hypotheses, but this note does not automatically transfer the terminal-selection result to its broader preparation class.

Falsifiers are a failure of the inherited finite areal-rate limit, a delayed source that fails to move into the late zero-speed tail despite the complete delay bound, an incorrect normalization or transmitter limit in the radial projection, or a zero-speed member violating the displayed exact leading coefficient. The explicit tail inequalities identify where each claim can be checked. Validation here is the complete source-window estimate, exact polar identity and two elementary tail integrations; no numerical target, new instrument or external physical law is used.
