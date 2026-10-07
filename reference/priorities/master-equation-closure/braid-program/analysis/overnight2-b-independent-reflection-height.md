# Independent review of the reflection-height extension

## Adjudication and scope

**Derived and independently accepted:** the [frozen reflection-height extension](overnight2-b-reflection-height-extension.md), including its final explicit coefficient region, is valid without mathematical repair. The proof gives strictly positive mean axial work from every partner. For the displayed coefficient region it gives the strict uniform bound $\langle V_zA_z\rangle>1/40000$, excluding exact canonical balance at every positive scale.

The canonical scenario remains $K=c_f=1$, with alternating polarity products $\sigma_j=(-1)^j$ and complete histories
$$
X_j(t)=R\bigl(\rho(\phi)\cos[\beta t/R+j\pi/3+p(\phi)],\rho(\phi)\sin[\beta t/R+j\pi/3+p(\phi)],(-1)^jz(\phi)\bigr),
\qquad \phi=\kappa t/R.
$$
The radius is positive, even and $2\pi$-periodic, the phase correction is odd and $2\pi$-periodic, and all profiles are real $C^2$. There is a common physical speed bound $v_*<1$, $R,\kappa>0$, and every partner delay obeys $0<\kappa\Delta<\pi$. The new height assumptions are
$$
z(-\phi)=z(\phi),\qquad z(\phi+\pi)=-z(\phi),\qquad z''(\phi)<0\quad(0<\phi<\pi/2).
$$
The first two imply $2\pi$-periodicity. No physical concavity principle is assumed: the last inequality selects a prescribed waveform class. The [accepted independent midpoint review](overnight2-b-independent-midpoint-axial-work.md) supplies the complete ordinary root argument and exact phase Jacobian; their applicability to this height is checked below. The new sign arguments and quantitative comparisons are reconstructed independently here, without numerical work means or a Fourier truncation premise.

## Shape consequences, including endpoints

Evenness gives $z'(0)=0$ and oddness of $z'$. Combining evenness with anti-periodicity gives, for every real $\phi$,
$$
z(\pi-\phi)=-z(\phi),\qquad z'(\pi-\phi)=z'(\phi).
$$
In particular $z(\pi/2)=0$. Since $z''<0$ in the open first quarter, integration from zero shows $z'(\phi)<0$ for $0<\phi\le\pi/2$. The strict inequality at $\pi/2$ follows by integrating over any interior interval; it does not require negative curvature at the endpoint. Derivative reflection extends $z'<0$ to all $0<\phi<\pi$, while $z'(\pi)=0$. Therefore $z$ is strictly decreasing on $[0,\pi]$, with $z(0)>0$, $z(\pi/2)=0$ and $z(\pi)=-z(0)<0$.

Define $g=-z'$. It is odd and anti-periodic, strictly positive on $(0,\pi)$, symmetric under $\phi\mapsto\pi-\phi$, and strictly increasing on $[0,\pi/2]$. This includes strict endpoint comparisons: if two points in that closed quarter are distinct, the integral of $-z''$ between them is positive. Reflection makes $g$ strictly decreasing on the second quarter.

A convenient order representation is
$$
F(u)=z(\arccos u),\qquad -1\le u\le1.
$$
The decreasing functions $\arccos$ and $z|_{[0,\pi]}$ compose to a strictly increasing $F$. Height reflection gives $F(-u)=-F(u)$. Evenness and periodicity then extend $z(\phi)=F(\cos\phi)$ to every real phase. No endpoint derivative or smooth inverse for $F$ is used.

## Complete midpoint chart and reflection pairing

Positive periodic radius has a positive minimum, and periodic height has a finite maximum magnitude $Z$. The complete bounded histories therefore satisfy the same all-past argument as the accepted midpoint theorem: source speed below one makes the reception gap strictly decreasing, equal-time partner separation is positive, and the diameter $2\sqrt{\rho_+^2+Z^2}$ bounds every root. There is one positive ordinary root per partner and no positive self root. The transmitter divisor is $D_s=1-n\cdot V_s>0$.

At fixed midpoint phase $\theta$, write $a=\kappa\Delta/2$, $z_+=z(\theta+a)$ and $z_-=z(\theta-a)$. Increasing normalized delay moves the receiver forward and source backward in physical time, giving $\partial_\Delta Q=(V_r+V_s)/2$. Thus
$$
D_m=1-\frac12 n\cdot(V_r+V_s)=\frac{D_r+D_s}{2},\qquad
1-v_*\le D_m\le1+v_*.
$$
Its positive floor gives the unique complete midpoint root. Under $\theta\mapsto-\theta$, even height exchanges $z_+$ and $z_-$. The axial separation $z_+-\sigma z_-$ changes by the factor $-\sigma$, so its square is even for either polarity. Even radius exchanges the endpoint radii, while odd phase preserves their phase difference. The full squared distance is therefore even for each partner separately. Uniqueness implies that $\Delta_j(\theta)$, $a_j(\theta)$ and the evaluated $D_{m,j}(\theta)$ are even and $2\pi$-periodic.

The unchanged endpoint derivative calculation gives
$$
\frac{d\phi}{d\theta}=\frac{D_s}{D_m}>0,
\qquad \phi=\theta+\frac\kappa2\Delta_j(\theta),
\qquad \frac{d\phi}{D_s}=\frac{d\theta}{D_m}.
$$
It is a degree-one phase lift. Consequently one full receiver mean can be integrated over a symmetric midpoint period with denominator $\Delta_j^3D_m$.

The receiver axial velocity is $\kappa z_+'$. Its original numerator is $N_\sigma(\theta)=\sigma\kappa z_+'(z_+-\sigma z_-)$. Reflection and oddness of $z'$ give
$$
N_\sigma(-\theta)=\kappa z_-'(z_+-\sigma z_-).
$$
Averaging these numerators is legitimate because their denominator is even. The exact paired numerator is
$$
P_\sigma(\theta,a)=\frac\kappa2(\sigma z_+'+z_-')(z_+-\sigma z_-).
$$
Thus
$$
\langle V_zA_{z,j}\rangle
=\frac1{2\pi}\int_{-\pi}^{\pi}
\frac{P_{\sigma_j}(\theta,a_j(\theta))}{\Delta_j(\theta)^3D_{m,j}(\theta)}\,d\theta.
$$
No derivative of the variable $a_j(\theta)$ enters this algebraic pairing. The sign lemmas below hold for every independent pair $(\theta,a)$ with $0<a<\pi/2$; they therefore apply pointwise after substituting any allowed variable delay. In particular no symmetry of $a_j$ about $\pi/2$ is assumed.

## Same-polarity factors

For $\sigma=+1$ the paired product is
$$
P_+=\frac\kappa2 B_+C_+,qquad
B_+=z'(\theta+a)+z'(\theta-a),\quad C_+=z(\theta+a)-z(\theta-a).
$$
Strict increase of $F$ implies
$$
\operatorname{sgn}C_+=\operatorname{sgn}[\cos(\theta+a)-\cos(\theta-a)]
=\operatorname{sgn}(-\sin\theta),
$$
with zeros exactly at multiples of $\pi$, since $\sin a>0$.

To determine $B_+$, first fix $0<\theta\le\pi/2$. If $\theta\ge a$, both arguments lie in $[0,\pi)$ and at least one lies in $(0,\pi)$, so the derivative sum is strictly negative. This includes the boundary $\theta=a$, where one derivative is zero and the other is negative.

If $0<\theta<a$, oddness gives
$$
B_+=-g(a+\theta)+g(a-\theta).
$$
When $a+\theta\le\pi/2$, strict increase of $g$ makes this negative, including equality at the upper endpoint. When $a+\theta>\pi/2$, use $g(a+\theta)=g(\pi-a-\theta)$. Both $\pi-a-\theta$ and $a-\theta$ lie in $[0,\pi/2)$ and their difference is $\pi-2a>0$. Strict increase again makes $B_+<0$.

For each fixed $a$, the identities $B_+(\pi-\theta,a)=B_+(\theta,a)$ and $B_+(-\theta,a)=-B_+(\theta,a)$ extend the sign to all phases. Anti-periodicity completes the extension over repeated periods. Hence $B_+$ has precisely the same strict sign as $C_+$ away from multiples of $\pi$; both vanish there. Therefore $P_+>0$ away from those phases and $P_+=0$ at them.

## Opposite-polarity factors

For $\sigma=-1$ the paired product is
$$
P_-=\frac\kappa2 B_-C_-,\qquad
B_-=z'(\theta-a)-z'(\theta+a)=g(\theta+a)-g(\theta-a),\quad
C_-=z(\theta+a)+z(\theta-a).
$$
Oddness and strict increase of $F$ imply
$$
\operatorname{sgn}C_-
=\operatorname{sgn}\{F[\cos(\theta+a)]-F[-\cos(\theta-a)]\}
=\operatorname{sgn}[2\cos\theta\cos a]
=\operatorname{sgn}(\cos\theta).
$$
The zeros are precisely the odd multiples of $\pi/2$ because $\cos a>0$.

Take $0\le\theta<\pi/2$. If $\theta<a$, the argument $\theta+a$ lies in $(0,\pi)$ while $\theta-a$ lies in $(-\pi/2,0)$; their $g$ values have opposite signs, so $B_->0$. This includes $\theta=0$, where $B_-=2g(a)>0$.

If $\theta\ge a$ and $\theta+a\le\pi/2$, strict increase on the first quarter gives $B_->0$. If instead $\theta+a>\pi/2$, replace $g(\theta+a)$ by $g(\pi-\theta-a)$. The reflected argument lies in $(0,\pi/2)$, the other argument $\theta-a$ lies in $[0,\pi/2)$, and their difference is $\pi-2\theta>0$. Strict increase again proves positivity. The case $\theta=a$ is covered even though the second argument is zero.

For fixed $a$, $B_-(-\theta,a)=B_-(\theta,a)$ and $B_-(\pi-\theta,a)=-B_-(\theta,a)$ extend its sign. At $\theta=\pi/2$ the two $g$ values coincide by reflection, and $C_-$ also vanishes. Thus both factors have the sign of $\cos\theta$ everywhere else, so $P_->0$ except at odd multiples of $\pi/2$.

Every channel's denominator is continuous and positive. Its paired numerator is nonnegative everywhere and strictly positive on open intervals independently of the variable delay. Hence each of the two same-polarity and three opposite-polarity partner means is strictly positive.

Exact balance would require $A_z=R\kappa^2z''$, where $A$ is dimensionless canonical acceleration and physical acceleration is $A/R^2$. Then
$$
\langle V_zA_z\rangle
=R\kappa^3\langle z'z''\rangle
=\frac{R\kappa^3}{4\pi}\big[(z')^2\big]_0^{2\pi}=0,
$$
contradicting the strict sign. This is a periodic derivative identity, with no imported physical energy premise, and proves the all-scale exclusion.

## Residual comparison and quantitative margin

Assume the stronger shape inequality $-z''(\phi)\ge m\cos\phi$ on the open first quarter for some $m>0$. Set $u=z-m\cos$. It has the same symmetries and $u''\le0$ there. Accordingly $-u'$ is odd, nonnegative on $(0,\pi)$, symmetric about $\pi/2$ and nondecreasing on the first quarter. The representation $u=F_u(\cos\phi)$ has odd nondecreasing $F_u$. Replacing strict order by weak order in both preceding lemmas therefore proves that each residual factor has the same weak sign as its corresponding cosine factor, including possible zero values and flat intervals.

Each factor is linear in height. If $B=B_c+B_u$ and $C=C_c+C_u$ are either pair of factors, the shared sign gives $B_cC_u\ge0$, $B_uC_c\ge0$ and $B_uC_u\ge0$. Consequently $BC\ge B_cC_c$. At the exceptional zero phases both cosine factors and their residual counterparts vanish by symmetry; no division by a vanishing factor is used.

For the pure component $m\cos\phi$, direct multiplication at the actual midpoint delay gives
$$
\frac\kappa2B_cC_c=\kappa m^2 f_\sigma(\theta)\sin(2a),\qquad
f_{+1}=\sin^2\theta,\quad f_{-1}=\cos^2\theta.
$$
It follows that
$$
\langle V_zA_{z,j}\rangle\ge\frac{\kappa m^2}{2\pi}\int_{-\pi}^{\pi}
\frac{f_{\sigma_j}(\theta)\sin[\kappa\Delta_j(\theta)]}{\Delta_j(\theta)^3D_{m,j}(\theta)}\,d\theta.
$$
The roots and divisors in this inequality are those of the actual height $z$, not those of a separate cosine history. Thus the bounds must use the actual height maximum $Z$, with $d_+=2\sqrt{\rho_+^2+Z^2}$. The accepted scalar estimate $\sin(\kappa\Delta)/\Delta^3\ge\kappa[1-(\kappa d_+)^2/6]/d_+^2$ applies when $\kappa d_+\le1$. Since each $f_\sigma$ integrates to $\pi$ and $D_m\le1+v_*$, summing five partners gives
$$
\boxed{\langle V_zA_z\rangle\ge\frac{5\kappa^2m^2}{2d_+^2(1+v_*)}\left[1-\frac{(\kappa d_+)^2}{6}\right]>0.}
$$
The endpoint-sine version of the accepted cosine bound follows by the same integration when a common delay interval lies strictly inside $(0,\pi/\kappa)$. Only its numerator amplitude changes to $m^2$; its geometric bounds likewise remain those of the actual height.

For $z=H\cos\phi+e\cos3\phi$, the exact identity $\cos3\phi=\cos\phi(4\cos^2\phi-3)$ yields
$$
-z''=\cos\phi[H+9e(4\cos^2\phi-3)].
$$
The infimum of the bracket over the first quarter is $H-27e$ when $e\ge0$ and $H+9e$ when $e<0$. The endpoints of the open quarter need not attain this infimum for it to be a lower bound. The simpler uniform choice $m=H-27|e|$ is valid for either sign and is sufficient whenever positive. It is not claimed necessary for the qualitative theorem.

## Independent audit of the explicit coefficient region

Consider exactly the stated continuous region
$$
\rho=1+a\cos2\phi,\quad p=d\sin2\phi,\quad z=H\cos\phi+e\cos3\phi,
$$
$$
|a|,|d|\le\frac1{10},\quad \frac12\le H\le1,\quad |e|\le\frac H{54},\quad
\frac1{10}\le\beta\le\frac3{10},\quad \frac1{20}\le\kappa\le\frac15.
$$
The parity assumptions hold at the same origin; height is anti-periodic. Radius lies in $[9/10,11/10]$, $|z|\le H+|e|\le55/54<51/50$, and
$$
m=H-27|e|\ge H/2\ge1/4.
$$
The last inequality enforces strict first-quarter concavity even on all coefficient boundaries because $-z''\ge m\cos\phi>0$ in the open quarter.

The cylindrical physical velocity components obey
$$
|V_r|\le\kappa\,2|a|\le\frac1{25}<\frac1{20},
$$
$$
|V_t|\le\frac{11}{10}\left(\frac3{10}+\frac15\frac15\right)=\frac{187}{500}<\frac38,
\qquad
|V_z|\le\frac15\left(H+3|e|\right)\le\frac{19}{90}<\frac9{40}.
$$
Thus
$$
|V|^2<\frac1{400}+\frac9{64}+\frac{81}{1600}=\frac{31}{160}<\frac14,
$$
so the common speed bound $v_*=1/2$ is valid. The radius floor and bounded complete histories give the full five-partner/no-positive-self chart.

Using the actual height bound in the diameter gives
$$
d_+^2\le4\left[\left(\frac{11}{10}\right)^2+\left(\frac{55}{54}\right)^2\right]
<4\left[\left(\frac{11}{10}\right)^2+\left(\frac{51}{50}\right)^2\right]
=\frac{5626}{625}<\frac{91}{10}.
$$
The intermediate number is $90016/10000<(301/100)^2=90601/10000$, so $d_+<301/100$. Hence
$$
\kappa d_+<\frac{301}{500}<\frac{61}{100}<1,
\qquad (\kappa d_+)^2<\frac{3721}{10000}<\frac38.
$$
Every delay phase is therefore in $(0,\pi)$, and the quantitative bracket exceeds $1-(3/8)/6=15/16$.

Finally,
$$
5\kappa^2m^2\ge5\left(\frac1{20}\right)^2\left(\frac14\right)^2=\frac1{1280},\qquad
2d_+^2(1+v_*)=3d_+^2<\frac{273}{10}.
$$
The exact lower bound is consequently
$$
\boxed{\langle V_zA_z\rangle>\frac1{1280}\frac{10}{273}\frac{15}{16}=\frac{150}{5591040}>\frac1{40000}.}
$$
The last cross-product difference is $150\cdot40000-5591040=408960>0$. Strictness is preserved on the closed coefficient boundaries by the strict uniform speed, diameter and phase comparisons above. This is a finite-speed bound over the entire displayed region and all $R>0$, not a conclusion from selected coefficients or a small-rate expansion.

## Falsifiers, source identity and preservation

The decisive algebraic falsifiers are a permitted height and pair $(\theta,a)$ with $0<a<\pi/2$ for which either paired product has the wrong sign, or a residual satisfying $u''\le0$ and the required symmetries whose cross terms are negative. Such an example would invalidate the corresponding sign or comparison lemma. A complete canonical history satisfying all assumptions with nonpositive axial work would refute the qualitative result; a member of the explicit coefficient region with mean at or below $1/40000$ would refute the quantitative result. Losing the shared reflection center, changing the transmitter weight, admitting a divisor zero or permitting a delay phase outside $(0,\pi)$ changes a hypothesis. The endpoints $a=0$ and $a=\pi/2$ are deliberately excluded; the proof's strict factors can degenerate there.

Native `shasum -a 256` identifies the frozen subject as `d74822e5a1be3dcf3c439c410e7a7ab1206a22b8155c6150e3236eea24e83f94`. The accepted independent midpoint report has identity `dc9146c12a4465472549f83bac470631c2d28217016ffd5c58790719ee94c07a`. Analytical identities and displayed integer comparisons constitute this review's evidence. No numerical instrument, target or computational control was needed, and no numerical proposal is used as support.

Only this new independent Markdown report was authored. The subject, accepted dependencies, prior reports, instruments, receipts, parent account and shared owners remain read-only. Final source hashing verifies the frozen identities, and `git diff --no-index --check /dev/null` supplies the new report's whitespace check; exit one with no diagnostics represents its new-file difference. No runtime evidence write, Git mutation, generator or delegation was used. Parent integration remains the disposition step, with no mathematical blocker in this scope. The later thin-height torque numerical review is outside this assignment and has not been performed here.
