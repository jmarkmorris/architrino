# Linked neutral-pair response equations for the remaining inner-equal region

## Next question and current evidence boundary

**Parent-derived research formulation, not independently checked yet:** after the continuous upper-radius exclusion, the remaining inner-equal region has $r_1=r_2=1$, $1<b=r_3<4$. The next useful question is whether the same outer neutral pair can supply the two different full vector responses required by the inner receivers while also satisfying its own two component equations. This preserves correlation through its single phase, instead of allowing four unrelated outer rows to attain independent worst cases.

The selected coefficient-one logarithmic law, $K_{\log}=c_f=1$, three persistent antipodal neutral pairs and all complete circular histories remain fixed. The formulation below is a proposed algebraic reduction to check before any new target instrument. It does not select a numerical grid, optimizer, enlarged cover or additional family.

## A precise limitation of the phase-independent cap

The successful boundary estimate bounds the opposing outer tangential difference by $4b/[(b^2-1)(1-v)]$, where $v=\omega$. That estimate by itself cannot settle the whole remaining region. At the exact parameter values $b=2$, $v=1/8$, $\beta=\pi/2$, its cap is $C=64/21$ while the actual inner-only difference is $L=Q_{1/8}(\pi/2)$.

The causal chart gives $B_{1/8}(\pi/2)\le8/7$: the root is at least $\pi/2$, so its positive cotangent is at most one, and its factor is at least $7/8$. At $3\pi/2$, the root is at most $3\pi/2+1/4$, so the magnitude of its negative cotangent is at most $\tan(\pi/4+1/8)\le143/111$, using $\tan(1/8)\le16/127$. Its factor is at least one. Hence

$$
0<L\le\frac87+\frac{143}{111}=\frac{1889}{777}
<\frac{64}{21}=\frac{2368}{777}.
$$

Thus the enclosing difference interval $[L-C,L+C]$ necessarily contains zero. The exact positive gap $C-L\ge479/777$ shows why this particular independent-cap estimate cannot certify a sign on this fibre. This is a limitation of the estimate, not evidence that an outer phase attains every value of that interval or that an exact configuration exists. Radial conditions and phase correlation remain available. This hand-derived limitation awaits independent reconstruction with the rest of this note.

## One neutral-pair response function

For a positive receiver of radius $a$, a positive source of radius $c$ and their counterclockwise present phase difference $\theta$, let $\tau>0$ be the unique complete causal root and define

$$
\psi=\theta-\omega\tau,\qquad
\tau^2=a^2+c^2-2ac\cos\psi,\qquad
D=1+\frac{\omega ac\sin\psi}{\tau}>0,
$$

$$
U_{a,c}(\theta;\omega)
=\frac{(a-c\cos\psi,-c\sin\psi)}{\tau^2D}.
$$

The ordered components are radial and positive-rotation tangential. The source's neutral antipodal pair contributes

$$
G_{a,c}(\theta;\omega)
=U_{a,c}(\theta;\omega)-U_{a,c}(\theta+\pi;\omega).
$$

Each term uses its own full positive delay, rather than forcing antipodality at unequal emission times. Where $a=c$, coincident present members are excluded; where $a\ne c$ no present collision is possible in these channels. Within the selected closed-subfield domain the earlier root theorem supplies uniqueness, ordinary factors and complete history coverage. The parameter $\theta$ here is counterclockwise, whereas the equal-radius functions $R_v,B_v,P_v,Q_v$ below use clockwise present separation. This distinction fixes all signs.

## The four linked inner equations and two outer equations

Choose the inner positive phases $0$ and $-\beta$, where $0<\beta<\pi$, and let the outer positive phase be $\chi$ on its $2\pi$ torus. The outer neutral pair is seen at counterclockwise angles $\chi$ and $\chi+\beta$ by the two inner receivers. Set $v=\omega$ and retain the complete inner-circle functions

$$
P_v(x)=R_v(x)-R_v(x+\pi),\qquad
Q_v(x)=B_v(x)-B_v(x+\pi).
$$

Full inner balance would require the same response curve to satisfy

$$
G_{1,b}(\chi;\omega)
=\left(-\omega^2+\frac{R_v(\pi)-P_v(\beta)}2,
\frac{B_v(\pi)-Q_v(\beta)}2\right),
$$

$$
G_{1,b}(\chi+\beta;\omega)
=\left(-\omega^2+\frac{R_v(\pi)+P_v(\pi-\beta)}2,
\frac{B_v(\pi)+Q_v(\pi-\beta)}2\right).
$$

These four scalar conditions correlate both radial and signed tangential requirements through the one phase $\chi$. They are not four freely adjustable outer contributions. In particular their radial difference must equal $[P_v(\beta)+P_v(\pi-\beta)]/2>0$ for $v>0$, with the sign determined by subtracting the first receiver from the second.

At the positive outer receiver, the two inner neutral pairs are seen at counterclockwise angles $-\chi$ and $-\beta-\chi$. Its own negative antipode contributes the radius-$b$ circle row. Its remaining two scalar equations are

$$
0=\omega^2b-\frac{R_{\omega b}(\pi)}{2b}
+G_{b,1,r}(-\chi;\omega)+G_{b,1,r}(-\beta-\chi;\omega),
$$

$$
0=-\frac{B_{\omega b}(\pi)}{2b}
+G_{b,1,t}(-\chi;\omega)+G_{b,1,t}(-\beta-\chi;\omega).
$$

The negative receivers follow by persistent antipodal symmetry. Thus the proposed system retains six positive-receiver components, all thirty partner rows and zero positive self roots. The necessary phase-gap theorem can restrict $\beta$ only after its own independent review and explicit domain check; it must not be replaced by a fixed arbitrary phase cutoff.

## Static analytic reference for a future instrument

At $\omega=0$, with $a=1$ and $c=b>1$, encode radial plus $i$ times tangential response as a complex number. Direct instantaneous logarithmic summation gives

$$
G_{1,b}(\theta;0)
=\frac1{1-be^{-i\theta}}-\frac1{1+be^{-i\theta}}
=\frac{2be^{-i\theta}}{1-b^2e^{-2i\theta}}.
$$

Its reciprocal therefore obeys the explicit ellipse parametrization

$$
\frac1{G_{1,b}(\theta;0)}
=-\frac{b^2-1}{2b}\cos\theta
+i\frac{b^2+1}{2b}\sin\theta.
$$

This is a known closed-form control candidate for any future numerical neutral-pair evaluator; it is not an exact static six-member reference. A new instrument would have to pass this and a separately specified moving-root control before any target use. The static formula alone does not license its continuation to positive angular rate or prove a dynamic response-curve property.

## Continuation boundary

First independently reconstruct the source inventory, clockwise/counterclockwise conversion, six equations, static ellipse and cap limitation. Then seek a necessary restriction on the paired values of $G$ at phases separated by $\beta$, retaining the radial and tangential components together. If a new numerical instrument is justified, declare its exact subdomain, known controls, pilot and unchanged resource bounds before its target; an inconclusive phase sample does not justify an enlarged cover. Alternatively the remaining outer-equal region provides a separately authorized analytic branch. Preserve every completed certificate and original clock.
