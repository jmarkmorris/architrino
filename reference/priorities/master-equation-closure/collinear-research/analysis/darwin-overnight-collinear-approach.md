# Darwin-inspired frozen functional: collinear release and head-on approach of the mirror pair

## Status

- Run: `darwin-overnight` (Darwin lane, start 2026-10-05T12:50Z). Worker: `darwin-overnight reduction`. Lens: `emmy-noether`. Worker UTC window 2026-10-05T12:53Z–13:11Z; complete for the assigned scope.
- Law, notation, Hessian, invariants and the reduced mirror problem are derived in the [investigation file](../../binary-research/analysis/darwin-overnight-investigation.md); this file applies its Sections 2 and 4 to one-dimensional (radial, $\ell=0$) mirror histories. Same polarity ($\sigma=+1$, control) and opposite polarity ($\sigma=-1$, target) are treated separately throughout.
- Claim-grade summary. Derived: the radial energy relation, the closed-form rest-release time for opposite polarity, the order of events (speed bound, $K/r$ bound, singular $H$, contact) for each preparation class, the non-uniqueness of the full solve at $r=1$ for opposite polarity, and the absence of any singular $H$ or ceiling crossing for same-polarity preparations with $E<1$. Derived-and-computed: the numbers quoted from `../../binary-research/evidence/darwin-overnight-reduction-predictions.mjs`. Nothing measured.
- Open: what an instrument's condition-number threshold does to the stopping time near $r=1$ (predicted below, to be checked in round 2); the behaviour of non-mirror collinear preparations ($\mathbf P\ne0$), not treated here.

## 1. The radial reduced equation

On the mirror subspace with $\ell=0$ the separation $r$ obeys (investigation file, Section 4)

$$
\tfrac14a(r)\dot r^2=E-\frac{\sigma}{r},\qquad a(r)=1-\frac{\sigma}{r},\qquad
u^2=\frac{\dot r^2}{4}=\frac{E-\sigma/r}{1-\sigma/r}=\frac{Er-\sigma}{r-\sigma},
$$

where $u$ is the individual speed and $E$ the energy-like invariant, fixed by the preparation: rest release from $r_0$ gives $E=\sigma/r_0$; head-on approach from $r_0$ with individual speeds $u_{\mathrm{in}}$ gives $E=u_{\mathrm{in}}^2a(r_0)+\sigma/r_0$. The acceleration is $\ddot r=2\sigma/(r^2a(r))$ at a turning point and in general follows from differentiating the relation. The time between separations is the quadrature $T=\int dr/(2u)$; near a turning point $r_t$ (where $E=\sigma/r_t$) the substitution $r=r_t\pm t^2$ makes the integrand $\sqrt{r\,r_t\,a(r)}$, which is regular. The zero-coupling control ($a\equiv1$) is the inverse-square mirror problem with free-fall time $\pi r_0^{3/2}/4$ from rest; the quadrature reproduced it to $2.9\times10^{-16}$ before any coupled case was evaluated (investigation file, Section 11).

The full velocity Hessian is singular at $r=1$ and $r=1/2$ for both polarities, but on different modes (investigation file, Section 2). For opposite polarity the singular modes are common-centre modes, so the reduced equation above stays regular ($a=1+1/r>0$) while the full solve loses uniqueness. For same polarity the singular modes are the relative modes, and $a=1-1/r$ vanishes at $r=1$ in the reduced equation itself.

## 2. Opposite polarity

Rest release from $r_0$ ($E=-1/r_0$). The relation gives $u^2=(1-r/r_0)/(1+r)$, which increases monotonically as $r$ decreases and tends to $1$ at contact for every $r_0$ (derived): the individual speed approaches $c_f$ from below and equals it only in the contact limit. The time from release to separation $r$ has the closed form

$$
T(r_0\to r)=\tfrac12\sqrt{r_0}\,\big[F(\tfrac\pi2)-F(\varphi(r))\big],\qquad
F(\varphi)=(r_0+1)\left(\varphi-\tfrac12\sin2\varphi\right),\qquad
\sin^2\varphi(r)=\frac{1+r}{r_0+1},
$$

so the contact time is $T_c=\tfrac12\sqrt{r_0}\left[(r_0+1)\left(\tfrac\pi2-\arcsin\tfrac1{\sqrt{r_0+1}}\right)+\sqrt{r_0}\right]$, against $\pi r_0^{3/2}/4$ in the control. Events occur in this order for $r_0>20$: (i) individual speed reaches the provisional bound $0.1$ at $r=0.99/(0.01+1/r_0)$; (ii) $K/r$ reaches $0.05$ at $r=20$; (iii) at $r=1$ the common longitudinal eigenvalue $1-1/r$ of $H$ vanishes; (iv) at $r=1/2$ the two common transverse eigenvalues vanish; (v) the reduced equation reaches contact at $T_c$ with $u\to1^-$. Speed equality with $c_f$ never occurs at positive separation, and there is no turning point. For $r_0=100$ (script, 12 digits): (i) $r=49.5$, $T=649.12607251571$; (ii) $T=759.08538891434$; (iii) $T=792.30838203217$, $u=0.70356236397351$; (iv) $T=792.64007502217$, $u=0.81445278152471$; (v) $T_c=792.91947552339$. The closed form and the quadrature agree to all printed digits.

What the full law determines at $r=1$. The kernel of $H$ there is the common longitudinal direction $(\mathbf e,\mathbf e)/\sqrt2$. On the mirror subspace $\mathbf G_2=-\mathbf G_1$ exactly, so $\mathbf G$ is orthogonal to the kernel and $H\mathbf A=\mathbf G$ is solvable, but its solution set is the line $\mathbf A+t(\mathbf e,\mathbf e)$, $t\in\mathbb R$: the acceleration of the centre along the line is not determined by the law. The reduced symmetric equations select $t=0$ silently, which is a property of the symmetry restriction, not of the law. Under the frozen rule a non-unique solve is an obstruction event, so the full-law history ends at $r=1$ at $T=792.30838203217$ for $r_0=100$, and (iv)–(v) are statements about the reduced problem only. An instrument that stops when the condition number of $H$ exceeds $\kappa_{\max}$ stops slightly earlier: on the mirror configuration $\kappa=(r+1)/(r-1)$, so the stop is at $r=(\kappa_{\max}+1)/(\kappa_{\max}-1)$, for example $r=1+2\times10^{-8}$ at $\kappa_{\max}=10^8$, a time difference below $10^{-8}$ (derived; the instrument's declared threshold decides the actual number).

Head-on approach from $r_0$ with individual speeds $u_{\mathrm{in}}$ ($E=u_{\mathrm{in}}^2(1+1/r_0)-1/r_0$). Here $u^2=(Er+1)/(r+1)$, so $u<1$ at every positive separation if $E<1$, $u\equiv1$ if $E=1$, and $u>1$ everywhere if $E>1$: the ceiling is never crossed at positive separation, and the speed label is fixed by the preparation (derived). For $E<0$ the history is the rest-release history with a shifted clock; for $0\le E<1$ there is still no turning point and the same event order (ii)–(v) applies with (i) decided by $u_{\mathrm{in}}$. For $r_0=100$, $u_{\mathrm{in}}=0.02$: $E=-0.009596$, speed $0.1$ at $r=50.5205143907$, $K/r=0.05$ at $T=596.05559092918$, obstruction at $r=1$ at $T=629.18409576831$ with $u=0.70370590447999$.

Coverage. Both opposite-polarity classes with $E<1$ support all three speed labels up to the obstruction event (and, in the reduced problem, up to contact exclusive); they leave the approximation domain by speed first and by $K/r$ second for the preparations above; none remains inside the domain. Falsifier: an instrument integrating the full equations with a certified error bound that reports a turning point, a ceiling crossing at positive separation, or an invertible $H$ at $r=1$.

## 3. Same polarity (control)

Rest release from $r_0>1$ ($E=1/r_0$). $u^2=(r-r_0)/\big(r_0(r-1)\big)$ increases monotonically with $r$ toward $1/r_0$, never reaching it (derived). The pair separates for all time, $H$ is never singular ($r>r_0>1$ throughout), no event occurs, and the history supports all three speed labels. It lies inside the approximation domain for all time if and only if $r_0\ge20$ and $1/\sqrt{r_0}\le0.1$, that is $r_0\ge100$. For $r_0=100$ the asymptotic individual speed is $0.1$ exactly, as in the control, and the time to $r=200$ is $1143.3778308988$ against $1147.7935746963$ in the control: the coupling reduces the longitudinal coefficient $a$ below one and the pair separates slightly faster.

Head-on approach from $r_0$ with individual speeds $u_{\mathrm{in}}$ ($E=u_{\mathrm{in}}^2(1-1/r_0)+1/r_0$). For $E<1$ the turning point is $r_{\min}=1/E>1$, $u^2=(Er-1)/(r-1)$ decreases monotonically as $r$ decreases, the pair turns and recedes, the maximum $K/r$ is $E$, the maximum speed is $u_{\mathrm{in}}$, and $H$ is never singular (derived). For $E\ge1$ the preparation already has $u_{\mathrm{in}}\ge c_f$ asymptotically ($u\equiv1$ at $E=1$, $u>1$ everywhere at $E>1$), and the reduced equation then reaches $r=1$, where $a\to0$ and the relative longitudinal mode of $H$ is singular; for $E>1$ the relative speed diverges there. Thus a same-polarity collinear mirror history with sub-ceiling preparation never meets a singular $H$, never crosses $c_f$, and never makes contact. For $r_0=100$, $u_{\mathrm{in}}=0.05$: $E=0.012475$, $r_{\min}=80.160320641283$ (control $80$), time to the turning point $369.12240131667$; inside the domain throughout; all three labels.

## 4. Summary table

| Class | Polarity | Turning point | Contact | Ceiling crossing at $r>0$ | First singular $H$ | Domain exit |
| --- | --- | --- | --- | --- | --- | --- |
| rest release | opposite | none | reduced problem only, $u\to c_f^-$ | never | $r=1$, common longitudinal (obstruction) | speed at $r=0.99/(0.01+1/r_0)$, then $K/r$ at $r=20$ |
| head-on, $E<1$ | opposite | none | reduced problem only | never | $r=1$ (obstruction) | by preparation, then $r=20$ |
| rest release | same | none (recedes) | never | never | never | never if $r_0\ge100$ |
| head-on, $E<1$ | same | $r_{\min}=1/E>1$ | never | never | never | never if $u_{\mathrm{in}}\le0.1$ and $E\le0.05$ |

## 5. Operational section

Numbers come from `node reference/priorities/master-equation-closure/binary-research/evidence/darwin-overnight-reduction-predictions.mjs` (cases c–f) and the closed form of Section 2 evaluated in the same script; the quadrature passed the zero-coupling free-fall control at $2.9\times10^{-16}$ before the coupled cases were read (investigation file, Section 11). Not done: non-mirror collinear preparations; the time dependence of $\kappa(H)$ for an instrument's actual threshold. Blockers: none.
