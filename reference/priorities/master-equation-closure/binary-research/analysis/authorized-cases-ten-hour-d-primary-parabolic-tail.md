# Conditional parabolic tail classification for a nonmirror canonical pair

**Grade: derived candidate, awaiting independent assessment.** For an actual dispersing canonical pair whose relative velocity tends to zero and whose relative angular-motion vector stays bounded, the distance has a parabolic power law and both the separation direction and midpoint velocity converge. Their limits obey the alignment condition found in the [first tail analysis](authorized-cases-ten-hour-d-primary-zero-speed-tail.md). If the angular-motion vector itself converges, its limit obeys a further restriction. The result classifies a conditional tail; it neither selects that tail for the historical source nor proves that nearby histories disperse.

The law is the unchanged canonical inverse-square equation with the source-fixed $K>0$ and $c_f=1$. The complete supplied and generated histories retain a single strict speed bound $\beta<1$, all partner and self channels, and the two actual ordinary clocks. No prescribed affine trajectory is used as a coupled solution. The affine evaluations below are analytical controls of the same acceleration functional, used to approximate the actual source windows with an explicit error order.

## Hypotheses and notation

Write

$$
Z=X_+-X_-=dN,\quad U=V_+-V_-,\quad
W=\frac{V_++V_-}{2},\quad H=Z\times U,
\qquad |N|=1.
\tag{1}
$$

Assume an actual all-future ordinary solution satisfies

$$
d(t)\to\infty,\qquad U(t)\to0,\qquad
\sup_{t\ge T}|H(t)|<\infty
\tag{2}
$$

for some finite $T$. No limit of $W$ or $N$, no distance rate, and no angular-momentum conservation are assumed. The last variable is geometrical angular motion, with no mass interpretation. Let $u=d'=N\cdot U$ and $U_\perp=U-uN=H\times N/d$.

Complete strict speed again gives one partner root per receiver and excludes all positive-delay self roots. Their delays lie between $d/(1+\beta)$ and $d/(1-\beta)$. Since $|d'|\le|U|\to0$, one has $d=o(t)$, and both source clocks escape to generated future times.

## A sharper comparison with current affine source velocities

This step does not yet require bounded $H$, only the first two limits in (2). Over either actual causal window, the relative velocity tends uniformly to zero. The simultaneous separation there consequently satisfies $d(v)/d(t)\to1$, uniformly in the source-to-reception interval. The actual canonical acceleration bound is therefore $O(d(t)^{-2})$ throughout both windows, with constants depending on fixed $K$ and the strict speed margin.

Expand the actual source about its current state by the integral acceleration formula. For either label,

$$
X_j(t-R)=X_j(t)-V_j(t)R+E_j,
\qquad |E_j|\le\frac12 R^2\sup_{[t-R,t]}|A_j|=O(1),
\tag{3}
$$

$$
V_j(t-R)-V_j(t)=O(d^{-1}).
\tag{4}
$$

The constants in $O(1)$ include $K$; the notation is an asymptotic statement at fixed $K$. Compare the actual clock with the affine evaluation using that current source position and velocity. Its monotone root gap has a fixed positive slope, so (3) changes its delay by $O(1)$, its normalized direction by $O(d^{-1})$, and its transmitter factor by $O(d^{-1})$. The canonical row is therefore changed by $O(d^{-3})$:

$$
A_i(t)=A_i^{\mathrm{aff}}(Z(t),V_j(t))+O(d(t)^{-3}).
\tag{5}
$$

This sharper comparison follows from actual generated accelerations. It is stronger than merely replacing the source velocity by an unspecified limiting velocity with an $o(1)$ error.

Bounded $H$ gives $|U_\perp|=O(d^{-1})$. Removing only that component from the current affine source velocities changes their rows by another $O(d^{-3})$. For large time their norms lie below a fixed number strictly less than one, so this comparison retains uniform ordinary-root margins. The relevant affine velocities are thus $W\mp uN/2$.

Set

$$
a=W\cdot N,\qquad W_\perp=W-aN,\qquad
g=\sqrt{1-|W|^2+a^2}=\sqrt{1-|W_\perp|^2}>0.
\tag{6}
$$

For a source velocity $v=a_vN+v_\perp$, direct solution of the positive affine root gives

$$
F(N,v)=-\frac K{d^2}\left\{
(q_v-a_v)N+\left(1-\frac{a_v}{q_v}\right)v_\perp
\right\},\qquad q_v=\sqrt{1-|v_\perp|^2}.
\tag{7}
$$

The radial relative velocity shifts $a_v$ but leaves $q_v$ and $v_\perp$ unchanged. Combining the two receiver rows therefore gives the exact affine identities

$$
A_+^{\mathrm{aff}}-A_-^{\mathrm{aff}}
=-\frac K{d^2}\left\{(2g+u)N-\frac{2a}{g}W_\perp\right\},
\tag{8}
$$

$$
\frac{A_+^{\mathrm{aff}}+A_-^{\mathrm{aff}}}{2}
=\frac K{d^2}\left\{aN-\left(1+\frac{u}{2g}\right)W_\perp\right\}.
\tag{9}
$$

At $W=0$, (8) reduces to the known radial affine relative row $-K(2+u)N/d^2$ and (9) vanishes. At $u=0$, they recover the independently checked parallel-common-velocity formulas. These are analytical controls before application to the actual tail.

Using (5) and the $O(d^{-1})$ transverse relative velocity now gives actual coupled equations

$$
d''=\frac{|H|^2}{d^3}-\frac K{d^2}(2g+u)+O(d^{-3}),
\tag{10}
$$

$$
H'=\frac{2Ka}{dg}N\times W+O(d^{-2}),
\tag{11}
$$

$$
W'=\frac K{d^2}\left\{2aN-W-\frac{u}{2g}W_\perp\right\}+O(d^{-3}).
\tag{12}
$$

The radial relative velocity cancels exactly from the affine torque in (11). This cancellation is needed for the later logarithmic restriction; a generic $O(|U|/d)$ torque error would not suffice.

## Bounded angular motion forces the distance scale and both limits

Uniform strict speed gives $g\ge\sqrt{1-\beta^2}>0$. Since $u\to0$ and $H$ is bounded, (10) is eventually strictly negative and bounded between two negative constants times $d^{-2}$. The derivative $u$ tends to zero. A strictly decreasing function with limit zero is positive, so $d$ is eventually increasing.

Multiplying these two radial bounds by $2u>0$ and integrating to infinity shows that $u^2$ lies between two positive constants times $d^{-1}$. Integrating $d'=u$ gives two-sided positive bounds on $d(t)/t^{2/3}$. In particular,

$$
\int_T^\infty\frac{dt}{d(t)^2}<\infty.
\tag{13}
$$

The actual acceleration bound then makes $W'$ integrable, proving $W\to c$ for a finite vector $c$. Also $N'=H\times N/d^2$ is absolutely integrable, proving $N\to N_\infty$. Thus neither limit was an extra hypothesis.

Now put

$$
a_\infty=c\cdot N_\infty,\qquad
g_\infty=\sqrt{1-|c|^2+a_\infty^2}>0.
\tag{14}
$$

Equation (10) sharpens to $d''=-2Kg_\infty d^{-2}(1+o(1))$. Integrating once and then again yields

$$
d(t)u(t)^2\longrightarrow4Kg_\infty,
\qquad
\frac{d(t)^{3/2}}t\longrightarrow3\sqrt{Kg_\infty}.
\tag{15}
$$

In particular $d(t)\sim(3\sqrt{Kg_\infty}\,t)^{2/3}$. This is a derived consequence of the conditional actual tail, not a rate assumed to evaluate the clocks.

Equation (11) and $\int dt/d=\infty$ recover the necessary alignment

$$
(c\cdot N_\infty)(N_\infty\times c)=0.
\tag{16}
$$

If it failed, a fixed projection of $H'$ would eventually have one sign and nonintegrable magnitude, contradicting bounded $H$. The integrable $O(d^{-2})$ remainder cannot remove that contradiction.

## A convergent angular-motion vector has a further restriction

Assume now, additionally, that $H(t)\to H_\infty$. The orthogonality identity gives $H_\infty\cdot N_\infty=0$. From (15),

$$
J(t):=\int_t^\infty\frac{dv}{d(v)^2}
=\frac{1+o(1)}{\sqrt{Kg_\infty d(t)}}.
\tag{17}
$$

Integrating $N'=H\times N/d^2$ gives

$$
N(t)-N_\infty=-J(t)(H_\infty\times N_\infty)+o(d(t)^{-1/2}).
\tag{18}
$$

Equation (12), $u=O(d^{-1/2})$, and convergence of $W,N$ similarly give

$$
W(t)-c=-KJ(t)(2a_\infty N_\infty-c)+o(d(t)^{-1/2}).
\tag{19}
$$

The radial-velocity term in (12) integrates to $O(d^{-1})$, which is smaller than the displayed leading correction.

There are two nonzero-$c$ cases permitted by (16). If $c$ is parallel to $N_\infty$, substitution of (18)–(19) into (11) gives

$$
H'(t)=\frac{2\sqrt K\,|c|^2}{g_\infty^{3/2}d(t)^{3/2}}H_\infty
+o(d(t)^{-3/2})+O(d(t)^{-2}).
\tag{20}
$$

Here $g_\infty=1$. Since $\int dt/d^{3/2}$ diverges logarithmically by (15), convergence of $H$ requires $H_\infty=0$.

If $c\perp N_\infty$, set $w=N_\infty\times c$. Then (18)–(19) instead give

$$
H'(t)=-\frac{2\sqrt K}{g_\infty^{3/2}d(t)^{3/2}}
(H_\infty\cdot w)w
+o(d(t)^{-3/2})+O(d(t)^{-2}).
\tag{21}
$$

Convergence therefore requires $H_\infty\cdot w=0$. Since $H_\infty\perp N_\infty$, this means $H_\infty$ is parallel to $c$, including the zero vector. Thus a nonzero limiting angular-motion vector and nonzero terminal midpoint velocity must satisfy

$$
c\perp N_\infty,\qquad H_\infty\parallel c.
\tag{22}
$$

For an actual planar solution, $c$ lies in the plane while $H_\infty$ is normal to it. Consequently a planar zero-relative-speed dispersal tail with bounded, convergent, nonzero $H_\infty$ must have $c=0$. This is a conditional geometric restriction. It does not prove that the nominal phase-defect solution has a nonzero $c$ or that its relative terminal speed is zero.

## Consequence and precise limits

The accepted slow mirror theorem has finite positive limiting angular motion. Its zero-speed branch therefore has the usual parabolic distance scale as a consequence of the unchanged equation. Transferring that entire asymptotic description to a finite nonmirror perturbation imposes more than bounded midpoint velocity: if a nonzero midpoint limit survives, the limiting orbital geometry must obey (22), or another assumed tail property must change.

The theorem leaves several possibilities open. A perturbed solution may have positive terminal relative speed, unbounded or nonconvergent angular motion, a vanishing angular-motion limit, a zero midpoint limit, or a different limiting plane. It may also fail to enter the conditional dispersal class at all. None is selected or excluded without the corresponding complete-history argument. The primary full-neighborhood dispersal claim and the literal historical source's fate remain unresolved.

Falsifiers are a generated source-window acceleration failing the stated inverse-square bound, an incorrect affine cancellation in (8)–(11), a tail satisfying (2) but not (13)–(16), a missing leading term in (18)–(21), or a convergent nonzero angular-motion vector violating (22). The constants hidden in the asymptotic orders depend on the fixed strict speed margin, coupling, and angular bound; no uniform perturbation radius is claimed. No numerical trajectory, external physical law, replacement preparation or modified source was used.
