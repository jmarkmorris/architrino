# A necessary sign of third-harmonic height skew

## The waveform and root-domain assumptions

Claim grade: derived, pending independent reconstruction. Consider the canonical six-member radius/phase/height class with $K=c_f=1$, all ordinary positive-delay roots and height
$$
z(\phi)=H\cos\phi+e\cos3\phi+f\sin3\phi,\qquad H>0,
\qquad A:=\sqrt{e^2+f^2}\le\frac H4.
$$
The fundamental cosine fixes the phase origin; the sign of $f$ below refers to this convention and positive deformation rate $\kappa>0$. Radius and phase correction may be asymmetric and need not share a reflection center with the height.

Assume the complete root chart at the descending height zero is finite and ordinary. Assume every positive delay there has $0<\kappa\Delta_b<\pi$. These roots include every self root if one exists. A sufficient global delay condition is $2\kappa\sqrt{r_+^2+(H+A)^2}<\pi$ for bounded radius $\rho\le r_+$; a below-wake-speed endpoint criterion can alternatively supply the needed root reach information.

Then an exact canonical history in this class must have
$$
\boxed{f<0.}
$$
Thus $f\ge0$ is a continuous exclusion, not merely the reflection-symmetric slice $f=0$. The conclusion selects a waveform orientation under causal delay; it does not prove that negative $f$ permits exact balance.

## Exactly one descending zero per half-period

Put $q=A/H\le1/4$. The third harmonic has absolute value at most $A$. Whenever $|\cos\phi|>q$, the sign of $z$ equals that of $\cos\phi$. All zeros therefore lie in the two closed strips where $|\cos\phi|\le q$, around $\pi/2$ and $3\pi/2$.

In the strip around $\pi/2$, one has $\sin\phi\ge\sqrt{1-q^2}$, and
$$
z'(\phi)=-H\sin\phi-3e\sin3\phi+3f\cos3\phi
\le-H\sqrt{1-q^2}+3A
\le-\frac H4(\sqrt{15}-3)<0.
$$
At the two strip endpoints, the fundamental term is respectively $+A$ and $-A$, so the full height is respectively nonnegative and nonpositive. Continuity and the strict derivative give exactly one zero $\phi_0$ in that strip. For $q=0$ the height is a pure cosine and the same conclusion holds directly at $\pi/2$.

The height is anti-periodic, $z(\phi+\pi)=-z(\phi)$. Thus the other strip contains exactly the zero $\phi_0+\pi$, with positive derivative. There are no remaining zeros, and
$$
z(\phi)>0\quad(\phi_0-\pi<\phi<\phi_0).
$$
This is an exact zero count and sign interval, not a sample-based waveform classification.

## Curvature at the descending zero

Twice differentiating the height gives
$$
z''=-H\cos\phi-9e\cos3\phi-9f\sin3\phi
=-9z+8H\cos\phi.
$$
At its descending zero,
$$
\boxed{z''(\phi_0)=8H\cos\phi_0.}
$$
The value at the center of the zero strip is $z(\pi/2)=-f$. Since height is strictly decreasing throughout that strip, $f>0$ places the zero before $\pi/2$, $f=0$ places it at $\pi/2$, and $f<0$ places it after $\pi/2$. The strip lies in $(0,\pi)$, so cosine decreases there. Therefore $z''(\phi_0)$ has exactly the sign of $f$.

By the [accepted zero-crossing identity](overnight2-b-independent-zero-crossing.md), all roots with phase lag less than $\pi$ sample this preceding positive lobe. Their positive canonical weights force $A_z(\phi_0)<0$. Exact balance $A_z=R\kappa^2z''$ consequently requires $z''(\phi_0)<0$, and hence $f<0$. Neither a transmitter sign nor a self contribution can reverse this conclusion because the canonical weight uses the absolute source divisor and the zero-height numerator is minus the common emitted height.

## Half of the original admitted coefficient box

Apply this to the original full-period ordinary box
$$
|a|,|b|\le0.06,\quad |c|,|d|\le0.1,\quad |e|,|f|\le0.04,
\quad H\in[0.25,0.75],\quad\beta\in[0.15,0.5],\quad\kappa\in[0.08,0.35],
$$
with $\rho=1+a\cos2\phi+b\sin2\phi$ and $p=c\cos2\phi+d\sin2\phi$. Its [independently admitted chart](overnight2-b-independent-chart.md) gives five ordinary partner roots and no positive self root throughout every period and every parameter value.

The amplitude inequality holds uniformly, because
$$
A^2\le2(0.04)^2=\frac2{625}<\frac1{256}=\left(\frac{0.25}{4}\right)^2\le\left(\frac H4\right)^2.
$$
The comparison is $2\cdot256=512<625$. The earlier complete chart gives $\Delta_b<2.789$ at every reception, including this parameter-dependent descending zero. Thus $\kappa\Delta_b<0.35\cdot2.789=0.97615<\pi$. All hypotheses hold independently of the radius and phase asymmetries.

Consequently the entire closed subregion with $0\le f\le0.04$ is excluded at every $R>0$. Within the remaining $-0.04\le f<0$ half, the condition is merely necessary. No smaller-amplitude bound, numerical root of the height profile, speed expansion or failed optimizer is used.

## Scope and falsifiers

The sign convention is essential: reversing the time direction or the selected fundamental phase without transforming the causal problem changes the interpretation of $f$. A different harmonic content, amplitude above the stated threshold, several zero crossings per half-period, or roots reaching an earlier sign lobe can evade this proof. Those cases remain open rather than being silently assigned the same skew condition.

A permitted height with an additional zero, a wrong zero-curvature sign, a missed causal root, a nonpositive ordinary weight or an exact history with $f\ge0$ and all stated conditions would falsify the affected result. Passing $f<0$ is not a solution certificate. No numerical instrument is needed; the argument and its explicit original-box application await independent adjudication. All prior subjects and evidence remain frozen, and the receiving account is the second overnight B report.
