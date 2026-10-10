# Independent verification of the phase-zero obstruction at speed three halves

## Subject and verdict

This companion independently reconstructs the [dynamics report's exact phase-zero vector](spherical-three-three-dynamics.md) from the canonical chord geometry. The source section is titled “Exact phase-zero vector and obstruction at $\beta=3/2$”; the file, rather than an implementation or target output, is the verification subject. No numerical diagnostic, phase scan or numerical replay was used. The full-period admission theorem is not needed for this event-scoped reconstruction.

**Verdict: the six-root census, full vector formula and strictly positive along-path lower bound are correct for the named synchronized orthogonal-circle history at $\beta=3/2$.** The result refutes that prescribed history as a normal-only constrained solution. It does not describe an evolved trajectory or extend to other speeds, phases, windings, geometries or singular continuations.

## Fixed event and complete history

Use $R=c_f=K_{\mathrm{int}}=1$ and $\beta=3/2$. At all absolute times, the three positive-polarity histories are

$$
\mathbf u_0(T)=(\cos\beta T,\sin\beta T,0),\quad
\mathbf u_1(T)=(0,\cos\beta T,\sin\beta T),\quad
\mathbf u_2(T)=(\sin\beta T,0,\cos\beta T),
$$

with opposite-polarity partners $-\mathbf u_k(T)$. Fix reception at $T=0$ on the positive circle-zero member. Its position is $\mathbf e_x$, positive tangent is $\mathbf e_y$ and prescribed acceleration is $-\beta^2\mathbf e_x$. Each positive delay lies in $0<u\le2$ by the diameter of the sphere. At a root, the chord length equals $u$, and the canonical contribution is $\eta\mathbf r/[u^3|D_t|]$, where $\eta$ is the polarity product and $D_t=1-\mathbf V_{\mathrm{source}}(-u)\cdot\mathbf r/u$. The calculation below determines the sign of every $D_t$ instead of dropping its absolute value without justification.

## Root census directly from the chords

### Positive-delay self hit

The self chord is $(1-\cos\beta u,\sin\beta u,0)$. Put $x=\beta u/2$. Since $0<x\le\beta<\pi/2$, its length is $2\sin x$, and the positive-root equation is $x=\beta\sin x$. The function $\sin x/x$ is strictly decreasing on $(0,\beta]$: its derivative has numerator $x\cos x-\sin x<0$, because $\sin x-x\cos x$ has derivative $x\sin x>0$ and vanishes at zero. Its limit is one at zero, while its value at $\beta$ is less than $1/\beta$. Thus exactly one positive root exists in $(0,\beta)$; the diagonal $u=0$ remains excluded.

At the root, $D_t=1-\beta\cos x=1-x\cot x>0$, using the same strict inequality. The chord unit vector is $(\sin x,\cos x,0)$, the self polarity product is positive, and the canonical contribution is

$$
\mathbf A_{\mathrm{self}}=
\frac{(\sin x,\cos x,0)}{4\sin^2x(1-\beta\cos x)}.
$$

In particular, the self tangent component is strictly positive. There is no additional self root elsewhere in the full delay domain because its half-angle domain has already been exhausted.

### Own-circle opposite-polarity hit

The opposite member's source position is $(-\cos\beta u,\sin\beta u,0)$, so its chord is $(1+\cos\beta u,-\sin\beta u,0)$. With $a=\beta u/2$, its length is $2\cos a$ throughout $0<a\le\beta<\pi/2$. The equation $a=\beta\cos a$ has one root in $(0,\beta)$ because $a-\beta\cos a$ is strictly increasing from a negative to a positive endpoint value. Here $D_t=1+\beta\sin a>0$. The negative polarity product gives

$$
\mathbf A_{\mathrm{antipode}}=
\frac{(-\cos a,\sin a,0)}{4\cos^2a(1+\beta\sin a)}.
$$

Its tangent component is also strictly positive. The half-angle domain proves completeness, not just existence of a chosen root.

### The two perpendicular $yz$ sources

Every point on the $yz$ source circle is perpendicular to the fixed receiver radius. Therefore both source signs have the exact constant chord length $\sqrt2$, each gives exactly one root $u=\sqrt2$, and each has $D_t=1$. Put $q=\sqrt2\beta$. The signed chord numerators for the positive and negative sources are respectively $(1,-\cos q,\sin q)$ and $(-1,-\cos q,\sin q)$. Their sum yields

$$
\mathbf A_{yz,+}+\mathbf A_{yz,-}
=\frac{(0,-\cos q,\sin q)}{\sqrt2}.
$$

This proves both the radial cancellation and the tangent/sideways signs directly. The transmitter factor equals one because source velocity is orthogonal to both the receiver axis and the source radius.

### The positive $xz$ source

The positive source is $(-\sin\delta,0,\cos\delta)$, where $\delta=\beta u$. Its chord is $(1+\sin\delta,0,-\cos\delta)$ and its squared distance is $2+2\sin\delta$. The range $0<\delta\le3<\pi$ makes the distance strictly greater than $\sqrt2$, so no root lies at or below $\sqrt2$. On $[\sqrt2,2]$ its distance is $2\sin(\pi/4+\beta u/2)$, with the angle strictly between $\pi/2$ and $\pi$. The residual $u-2\sin(\pi/4+\beta u/2)$ has derivative greater than one, is negative at $\sqrt2$ and positive at $2$. Hence there is exactly one root $u_+\in(\sqrt2,2)$ in the entire allowed delay domain.

At that root, $\delta_+=\beta u_+\in(\pi/2,\pi)$ and

$$
D_{t,+}=1-\frac{\beta\cos\delta_+}{u_+}>1,
\qquad
\mathbf A_{xz,+}=
\frac{(1+\sin\delta_+,0,-\cos\delta_+)}{u_+^3(1-\beta\cos\delta_+/u_+)}.
$$

### The negative $xz$ source and its excluded second branch

The negative source gives chord $(1-\sin\delta,0,\cos\delta)$, squared distance $2-2\sin\delta$, and length $2|\cos(\pi/4+\beta u/2)|$. Before $u_c=\pi/(2\beta)$ the cosine is positive. The residual $u-2\cos(\pi/4+\beta u/2)$ is strictly increasing from negative at zero to positive at $u_c$, so exactly one root $u_-\in(0,u_c)$ exists there.

For $u_c\le u\le2$, put $w=(\beta u-\pi/2)/2\ge0$. The length is $2\sin w\le2w=\beta u-\pi/2$. Since $(\beta-1)u\le1<\pi/2$, this bound is strictly less than $u$. Thus no second root lies after the cosine changes sign. At the actual root, $0<\delta_-<\pi/2$, and

$$
D_{t,-}=1+\frac{\beta\cos\delta_-}{u_-}>1,
\qquad
\mathbf A_{xz,-}=
-\frac{(1-\sin\delta_-,0,\cos\delta_-)}{u_-^3(1+\beta\cos\delta_-/u_-)}.
$$

This last completeness check matters at a speed above the wake speed: the absence of another root cannot be assumed from the sub-wake monotonicity argument. Both $xz$ terms have exactly zero tangent component, but their roots still count and their other vector components remain present.

## Full vector and independent sign obstruction

The complete event ledger contains one self root and five partner roots: the own antipode, two $yz$ members and two $xz$ members. Every root is at positive separation and has a strictly positive transmitter factor, with no omitted part of $(0,2]$. Adding the five displayed vector expressions, with the $yz$ expression already representing two roots, reproduces every component of the subject's full vector. This agreement follows from individually derived chords, not from fitting or replaying its output.

The tangent projection is therefore

$$
A_y=
\frac{\cos x}{4\sin^2x(1-\beta\cos x)}
+\frac{\sin a}{4\cos^2a(1+\beta\sin a)}
-\frac{\cos(3/\sqrt2)}{\sqrt2}.
$$

The first two terms are strictly positive by their root domains and transmitter factors. To bound the last independently of the root values, write $z=3/\sqrt2$. The cosine series after the fourth-degree term begins with a negative term and has strictly decreasing tail magnitudes, since $z^2=9/2$ and the successive denominator factors are at least $5\cdot6$. The alternating-tail bound gives

$$
\cos z\le1-\frac{z^2}{2}+\frac{z^4}{24}
=1-\frac94+\frac{81}{96}
=-\frac{13}{32}.
$$

It is not necessary for the first two series terms to decrease in magnitude; only the retained remainder tail is being bounded. Consequently

$$
\boxed{A_y>\frac{13}{32\sqrt2}>0.}
$$

The prescribed acceleration has zero $y$ component, and a normal support at $\mathbf e_x$ has zero $y$ component. This exact event therefore excludes the synchronized prescribed history as a normal-only solution. It does not establish a measured increase of speed under evolution. The required along-path correction would be $\mu=-A_y<0$, and the normal and sideways quantities are $\lambda=-\beta^2-A_x$ and $\nu=-A_z$ under the subject's stated conventions.

## Scaling, scope and falsifiers

Restoring a radius $R>0$ at fixed $c_f=1$ and speed $\beta=3/2$ makes $\Omega=\beta/R$. Every delay above multiplies by $R$, the dimensionless angles and weights remain unchanged, and every canonical acceleration contribution multiplies by $K_{\mathrm{int}}/R^2$. Thus the exact event bound is $A_y>13K_{\mathrm{int}}/(32\sqrt2R^2)$ for positive coupling. Changing radius cannot cancel it. This is a scaled prescribed-history exclusion and does not assert a generic scaling symmetry of actual constrained solutions.

The simultaneous source/receiver geometry remains collision-free: the cross-circle scalar products have magnitude at most $1/2$, so non-antipodal separations are at least $R$. More importantly, the explicit event roots above establish positive causal separation and ordinary transmitter factors directly. Nothing here supplies a rule for a caustic or coincidence, and the proof does not assume that passing one regular event certifies the entire period. A failure at this one admitted event is already sufficient to reject this all-time prescription.

The precise falsifiers are a missing additional root in one of the exhausted delay intervals, a mistaken source polarity or velocity projection changing the self/antipodal signs, an error in one signed vector numerator, or failure of the displayed cosine-tail inequality. The reconstruction found none. A different phase, winding, speed or curve changes the premises and remains a separate question. No energy map, stability, free confinement or physical sea conclusion follows.

## Preservation and verification state

The inspected dynamics-report snapshot had SHA-256 `73917421b86f73132fb35493b26f41d5fadf660dabdd27721cdf50eb569a7a5c` by `shasum -a 256`. Its author may append later work; this identifies only the inspected subject. Only this symmetry-prefixed companion was written in this slice. The dynamics subject, reviewer report, numerical instruments and earlier frozen symmetry artifacts were not modified. No new instrument, target computation, numerical replay, external search or compute job was used.

The mathematical verification is complete at the stated event and parameter; coordinator integration is the next dependency. The exact formulas and domain arguments above are the retained evidence. There are no bulky outputs or active leases to preserve or close. This is independent analytical adjudication of the event proof, not acceptance of an evolved solution.

Document checks: `git diff --no-index --check /dev/null` on this companion emitted no whitespace diagnostics (exit 1 records the file difference), and scoped `rg` confirmed the named source heading. `shasum -a 256` confirmed that all four earlier symmetry companions retain their previously reported frozen identities. These checks concern source targeting and preservation; the independent chord derivation supplies the mathematical verification.
