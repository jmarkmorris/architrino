# Independent neutral-history reference for the final Maxwell E audit

This reference was derived and frozen on 2026-10-05 before reading the subject neutral-history helpers, their theorems, or the coordinator assessment. The mathematical input is only [Section 7 of the selected equation manuscript](../../equation-variants/manuscript.md#7-complete-maxwell-shaped-transmitter-response), the assigned opposite-polarity mirror history, and elementary differentiation. The assigned Specialist lens is Jack K. Hale; that lens supplies no authority for the result. Every mathematical statement below is derived under its displayed hypotheses. The companion audit will preserve this file unchanged and compare the subject against it.

## 1. Physical source acceleration and moving roots

Set $K=c_f=1$. Write the receiver position as $x(t)$ and its mirror source as $-x(s)$, where $s<t$ is the emission time. Put $u=x'(t)$, $v=x'(s)$, $a=x''(s)$, $r=x(t)+x(s)$, $R=|r|=t-s$, $n=r/R$, $D=1+n\cdot v$, $W=1-n\cdot u$, and $P=I-nn^\top$. Thus the physical source velocity and acceleration are $-v$ and $-a$, respectively. Assume separated histories, $D>0$, $W>0$, and enough local regularity to differentiate $x$ twice. Section 7 gives

$$
u'=-C+B_0a,\qquad
C=\frac{(1-|v|^2)(n+v)}{R^2D^3},\qquad
B_0=\frac{(n+v)n^\top-DI}{RD^3}.
$$

Here $B_0a$ is the original delayed physical-acceleration contribution after both mirror and opposite-polarity signs have been applied. In particular, $n^\top B_0=0$ and

$$
n\cdot u'=-h,\qquad h=\frac{1-|v|^2}{R^2D^2}.
$$

Differentiating the root equation gives

$$
s'=\frac{W}{D},\qquad R'=1-\frac WD,
\qquad n'=\frac{P(u+vs')}{R}.
$$

The factor $W/D$ is essential. A cancellation argument that replaces it by $1/D$ while the receiver moves requires an additional justification and is generally false.

## 2. Exact change of velocity coordinate

Define an unscaled correction and a receiver-dependent correction by

$$
Q=\frac{n+v}{RD},\qquad q=\frac QW,
\qquad p=u+q.
$$

The letters here are local to this reference. Direct differentiation at fixed $(R,n,u)$ establishes

$$
Q_v=-DB_0,\qquad q_v=-\frac DWB_0,\qquad
q_u=\frac{q n^\top}{W},\qquad q_R=-\frac qR.
$$

Thus a subject identity written $q_v=-DB$ can be correct when its $q$ is this reference's $Q$, or its $B$ includes $1/W$. One must check the definitions before comparing symbols. For a direction $\eta$ of $n$ at fixed other coordinates,

$$
q_n\eta=\frac{\eta}{RDW}-\frac{q(v\cdot\eta)}D+\frac{q(u\cdot\eta)}W.
$$

Apply the full chain rule to $p$. The source-acceleration terms cancel exactly:

$$
\begin{aligned}
p'&=u'+q_u u'+q_v a s'+q_n n'+q_RR'\\
&=-C-\frac{qh}{W}+q_n n'-\frac{qR'}R.
\end{aligned}
$$

The last expression depends on present position and velocity and delayed position and velocity, but not on delayed acceleration. No derivative of $a$ has been taken. The additional $q_u u'$ term has been retained: its delayed-acceleration component vanishes because $n^\top B_0=0$, and its remaining value is $-qh/W$.

This coordinate is locally and globally invertible on the half-space $W>0$ at fixed $(R,n,v)$. Indeed $n\cdot Q=1/R$ gives

$$
W^2+(n\cdot p-1)W-\frac1R=0,
\qquad
W=\frac{1-n\cdot p+\sqrt{(1-n\cdot p)^2+4/R}}2,
\qquad u=p-\frac QW.
$$

Alternatively, the transverse correction $Q_T=Q-n/R=Pv/(RD)$ has the same $v$ derivative. Choosing $q_T=Q_T/W$ and $p_T=u+q_T$ makes $W=1-n\cdot p_T$ and gives direct inversion. Its $n$ derivative includes the derivative of the subtracted $n/R$ term. Both conventions are exact when used consistently; neither is a new acceleration law.

Conversely, differentiate $u=p-q$ for a transformed solution with a twice differentiable delayed history. The matrix $I+q_u$ is invertible, since its determinant is $1+1/(RW^2)>0$. Substituting the displayed transformed derivative and $s'=W/D$ recovers $u'=-C+B_0a$. Therefore elimination from the transformed right-hand side does not delete the delayed physical source acceleration from the reconstructed motion. Continuous delayed acceleration suffices for this step; actual jerk is unnecessary.

## 3. Root comparison, translation families, and complete histories

For a fixed receiver $(t,x)$ define $F(s)=t-s-|x+x(s)|$. Its source derivative is $F_s=-D$. Uniform subfield source speed $|v|\leq b<1$ implies $D\geq1-b>0$, hence at most one source root. Existence additionally needs opposite endpoint signs or a complete-history argument; monotonicity alone does not prove existence. A bounded all-past history gives $F(s)\to+\infty$ as $s\to-\infty$ and, at a separated present mirror state, $F(t)<0$. More generally, an all-past uniform speed bound strictly below one also supplies the positive far-past sign. The same uniform bound excludes positive-delay self roots because displacement over a nonzero time interval is strictly less than that interval. These are whole-history statements, not conclusions from a present-speed sample.

For a translation family of complete comparison sources $y_\theta(s)=\bar x(s+\theta)$, the root and all velocity/acceleration evaluations must use that same translated source. If a receiver or a source history also varies with a parameter $\lambda$, implicit differentiation gives $s_\lambda=-F_\lambda/F_s$. Bounds obtained by integrating this derivative require a root chart for the entire interpolation or translation family, including intermediate histories; endpoint root checks alone do not establish it. A source-root shift estimate for velocity uses an acceleration bound, $|v(s_1)-v(s_0)|\leq\sup|a|\,|s_1-s_0|$. It requires no acceleration derivative. Estimating a shifted acceleration by a linear Lipschitz bound requires a proved modulus for that acceleration; it cannot be inferred solely from $C^2$ regularity.

Every source interval reached by the complete root enclosure must be inventoried. At adjoining history pieces, position and velocity compatibility make the first-order transformed right-hand side well-defined; continuous acceleration compatibility is needed to reconstruct a classical $C^2$ physical solution at the seam. For a declared $C^{2,1}$ history, acceleration is locally Lipschitz. That is a regularity premise, not an authorization to use an unmeasured Lipschitz constant. Closed interval coverage or an explicitly assigned common endpoint must prevent seam omissions. Piecewise derivative bounds remain sufficient when the continuous function is Lipschitz across each covered seam.

## 4. Fixed-reception rotations and physical derivatives

Fix a reception time $t_*$ and a constant orthogonal matrix $O_*$. The comparison history $y(s)=O_*\bar x(s+\theta_*)$ satisfies $y'(s)=O_*\bar x'(s+\theta_*)$ and $y''(s)=O_*\bar x''(s+\theta_*)$. It is legitimate to align a complete source history this way separately at each reception time when proving pointwise, uniform inequalities. Source differentiation holds that reception time and therefore $O_*,\theta_*$ fixed.

The assembled curve $z(t)=O(t)\bar x(t+\theta(t))$ is different. Its physical derivatives contain $O'$, $O''$, $\theta'$, and $\theta''$ terms. A proof cannot substitute $O(t)\bar x'$ and $O(t)\bar x''$ as those derivatives. When an error coordinate is differentiated in a moving frame, the first frame derivative must be retained explicitly even if source evaluations use fixed-reception frames. This distinction can be falsified directly by taking a constant nonzero $\bar x$ and a rotating $O$: the assembled curve has nonzero derivatives while the rotated physical comparison velocity vanishes.

## 5. Local continuation and claim boundary

On a compact regular chart with positive separation, positive $D,W$, a positive delay margin, complete source coverage, and bounded compatible history, the transformed equation is a finite-dimensional ordinary differential equation over a sufficiently short step whose delayed evaluations remain in the already constructed past. Its right-hand side is locally Lipschitz when the past velocity is locally Lipschitz and the root chart remains regular. Existence and uniqueness then follow by the usual contraction argument: the integral map has Lipschitz constant less than one on a sufficiently short time interval and maps a closed neighbourhood into itself. Reconstruction above returns the selected physical equation. The argument is local; repeating it to a claimed endpoint requires each regularity and history margin throughout that interval.

The assigned compatible circle-tail/patch parameters are $\beta=0.3$, $r=25/9$, $\omega=27/250$. They do not enter the algebraic identities and have not been numerically tested in this reference. The assigned existing physical prefix through $56.72222$ is not independently certified here. No statement about a later event, physical fate, or an equality/superfield extension follows from this reference.

## Validation and falsifiers

The independent instrument is the chain-rule derivation above. Its elementary stationary-source control is $v=a=0$: $B_0a=0$, $C=n/R^2$, and the reconstructed acceleration is $-n/R^2$, as Section 7 requires. Its tangency control is $n^\top B_0=0$, established directly from $n\cdot(n+v)=D$. These controls precede any subject inspection. A noncancelling coefficient of $a$, failure of the inverse formula, an omitted root-family interval, a seam lacking declared compatibility, or a substituted derivative of a rotating surrogate overturns the corresponding claim. No numerical evolution, target sweep, custom checker, or external physical premise has been used.
