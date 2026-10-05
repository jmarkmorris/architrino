# Controlled secular comparison for the amplitude-gradient mirror pair

The amplitude-gradient response suppresses the canonical circular push at first order in speed, but its cubic residual persists on coupled near-circular histories when their delayed derivatives are controlled. For a suitably prepared slow mirror pair, a corrected geometric radius satisfies a controlled cubic-radius drift law over a finite interval of order the inverse cube of the speed ratio in orbital time. The actual pair expands by a fixed small fraction on that interval. This is a derived, analytically self-reviewed finite theorem awaiting independent adjudication; it is not an all-future escape theorem or a physical energy account.

The selected law is the ordinary-branch response in the [regular-pair treatment](amplitude-gradient-regular-pair-investigation.md), accepted by its [independent adjudication](amplitude-gradient-independent-adjudication.md). Those subjects are fixed references here. The unchanged canonical Master Equation remains a distinct comparison. The sum differentiates each already admitted ordinary positive-delay branch; it is not the undefined gradient of a global self-inclusive scalar at the receiver diagonal. No cap, source debit, singular-event rule, superfield path or population response enters this investigation.

## 1. Scaling and the exact coupled equation

Write the physical mirror histories as $\mathbf X_\pm(T)=\pm R_0\mathbf y(s)$ in one plane, with

$$
v_0^2=\frac K{4R_0},\qquad
\epsilon=\frac{v_0}{c_f},\qquad s=\frac{v_0T}{R_0},\qquad
r=\|\mathbf y\|,\quad \mathbf e=\frac{\mathbf y}r.
$$

Here $R_0>0$ is the initial member radius, $v_0$ is the instantaneous-comparison speed used for scaling, and $K$ is the positive inverse-square coupling. All instantiated wake-speed conventions use $c_f=1$; symbolic dimensions will be restored at the end. A prime denotes differentiation in orbital time $s$.

Let $u=s-s_d>0$ be the partner delay in orbital time, and put

$$
u=\epsilon L,\qquad
L=\|\mathbf y(s)+\mathbf y(s_d)\|,\qquad
\mathbf n=\frac{\mathbf y(s)+\mathbf y(s_d)}L,\qquad
D=1+\epsilon\mathbf n\cdot\mathbf y'(s_d).
$$

The exact candidate equation is

$$
\boxed{
\mathbf y''=-\frac4{L^2D^3}
\left[(1-\epsilon^2\|\mathbf y'(s_d)\|^2)\mathbf n
+\epsilon D\mathbf y'(s_d)
-\epsilon^2L\mathbf n\big(\mathbf n\cdot\mathbf y''(s_d)\big)\right].
}
$$

The sampled acceleration has not been removed. Its coefficient is $4\epsilon^2\mathbf n\mathbf n^{\mathsf T}/(LD^3)$. The complete uniform subfield speed bound gives one partner root and no ordinary positive-delay self root. Mirror symmetry is preserved by uniqueness of the regular local solution, so this equation represents the coupled pair rather than a prescribed host.

The relevant geometry box will have $1/2\le r\le2$ and $\|\mathbf y'\|\le2$ on the new interval and on its sampled recent past. The complete older past may have the larger bound $\|\mathbf y'\|\le V$, with fixed $V\ge2$, and $\epsilon V\le1/8$. Complete-root inequalities then place every partner delay in

$$
\frac{2\epsilon r}{1+\epsilon V}\le u\le\frac{2\epsilon r}{1-\epsilon V}\le5\epsilon,
\qquad D\ge7/8.
$$

Thus only the recent interval of width $5\epsilon$ is sampled, while the complete speed bound excludes older roots. Positive separation and delay remain essential.

## 2. Controls and present-source expansion

The stationary row is radial inverse square. The exact affine-source scalar is

$$
\Psi=\big[(1-\|\mathbf v/c_f\|^2)\|\mathbf q\|^2
+(\mathbf q\cdot\mathbf v/c_f)^2\big]^{-1/2},
$$

with $\mathbf q$ measured from the source's present position. Its gradient has no linear velocity term. The distinct accelerated quadratic control in the fixed regular-pair treatment gives the nonzero sampled-acceleration coefficient. These accepted analytic controls are applied before the higher-order comparison below; no new numerical target is used.

A useful direct coefficient calculation starts with a source $\mathbf z(t)$ and reception position $\mathbf x$ held fixed. For an auxiliary inverse-propagation parameter $\lambda$, put

$$
\ell(u)=\|\mathbf x-\mathbf z(t-u)\|,\qquad
u=\lambda\ell(u),\qquad
\Psi_\lambda=\frac1{\ell(u)[1-\lambda\ell'(u)]}.
$$

This auxiliary parameter computes a Taylor coefficient; its zero endpoint is not an ordinary-hit prescription. Differentiate the implicit equation and scalar with respect to $\lambda$ at zero. Product differentiation gives

$$
\Psi_\lambda
=\frac1{q}+\frac{\lambda^2}{2}\ell''(0)
+\frac{\lambda^3}{6}(\ell^2)'''(0)+O(\lambda^4),
\qquad q=\|\mathbf x-\mathbf z(t)\|.
$$

The coefficient calculation is elementary. Put $a=\ell(0)$, $b=\ell'(0)$, $c=\ell''(0)$ and $d=\ell'''(0)$. Substituting a polynomial in $\lambda$ into $u=\lambda\ell(u)$ gives

$$
u=a\lambda+ab\lambda^2+(ab^2+a^2c/2)\lambda^3
+(ab^3+3a^2bc/2+a^3d/6)\lambda^4+O(\lambda^5).
$$

Multiplying the Taylor polynomials of $\ell(u)$ and $1-\lambda\ell'(u)$, and inverting their product, gives $\Psi_\lambda=a^{-1}+c\lambda^2/2+(bc+ad/3)\lambda^3+O(\lambda^4)$. Since $(\ell^2)'''=6bc+2ad$, these are exactly the displayed coefficients; there is no first-order term. In present-source notation $\mathbf v=\mathbf z'(t)$, $\mathbf a=\mathbf z''(t)$ and $\mathbf j=\mathbf z'''(t)$,

$$
\ell''(0)=\frac{\|P\mathbf v\|^2}{q}-\mathbf e_q\cdot\mathbf a,
\qquad
(\ell^2)'''(0)=2\mathbf q\cdot\mathbf j-6\mathbf v\cdot\mathbf a,
\quad P=I-\mathbf e_q\mathbf e_q^{\mathsf T}.
$$

Taking the fixed-time spatial gradient yields

$$
-\sigma K\nabla\Psi
=\frac{\sigma K}{q^2}\mathbf e_q
+\frac{\sigma K}{2c_f^2q^2}
\left[2(\mathbf e_q\cdot\mathbf v)\mathbf v
+(\|\mathbf v\|^2-3(\mathbf e_q\cdot\mathbf v)^2)\mathbf e_q
+qP\mathbf a\right]
-\frac{\sigma K}{3c_f^3}\mathbf j+\mathbf R_4.
$$

The jerk $\mathbf j$ is the time derivative of source acceleration. This term is the smallest surviving odd-speed contribution on acceleration-controlled histories. It is derived from the selected scalar, not imported from a radiation or reaction law.

Two additional elementary controls test the derivative terms. With present source velocity zero, a transverse quadratic source has leading acceleration correction $\sigma K\mathbf a_\perp/(2c_f^2q)$; direct substitution of its delayed position and velocity into the exact row gives the same coefficient. With present velocity and acceleration zero, a transverse cubic source has leading correction $-\sigma K\mathbf j/(3c_f^3)$, obtained directly from its delayed direction and velocity. Smooth complete subfield extensions provide these source jets. These are prescribed analytic coefficient controls, not evolved pair histories.

### Remainder and the needed history regularity

On a fixed separated geometry box with strict transmitter margin and position derivatives through sixth order bounded, the row Taylor remainder satisfies

$$
\|\mathbf R_4\|_{W^{2,\infty}}
\le C\lambda^4
$$

in orbital units along the reception path. The norm means the function and its first two time derivatives are bounded, with the second derivative understood almost everywhere. The constant depends on the geometry margins and the finite derivative bounds; it is independent of $\lambda$ and elapsed time. The bound uses weighted component expansions, rather than four derivatives of the entire accelerated row. Expand sampled position/direction through third parameter order with a fourth-order remainder; expand the sampled velocity multiplied by $\lambda$ through second order with a third-order remainder; and expand the sampled acceleration multiplied by $\lambda^2$ through first order with a second-order remainder. Each reaches at most the fourth source-position derivative. Expand the denominator powers by their finite binomial series, with bounded remainders on the transmitter box. Product remainders are then fourth order. Two additional time derivatives reach at most the sixth source derivative. Implicit-root derivatives are bounded by the transmitter floor. Taylor's integral remainder bounds these weighted components, including their mixed time derivatives, by their finite suprema. Piecewise smooth joined histories use the same integral estimate because the highest derivative is locally bounded and the lower derivatives are continuous. A naive fourth-parameter-derivative bound on the whole sampled-acceleration row would require unnecessary higher derivatives; it is not the argument used here.

This estimate requires more than the local theorem's $C^{2,1}$ regularity. The theorem below explicitly restricts the supplied recent histories to $C^{5,1}$, with fifth derivative locally Lipschitz and sixth derivative bounded almost everywhere. Their terminal derivatives through order five must be compatible. No jerk estimate is inferred from a speed bound alone.

## 3. Uniform delayed-derivative control

The delayed acceleration is the obstacle to simply repeating the canonical argument. It can be controlled here because its coefficient is small on the slow separated chart.

Assume uniform bounds on the supplied recent derivatives through sixth order. Differentiate the exact equation $k$ times, for $0\le k\le4$. Its only derivative of order $k+2$ on the right is the delayed $\mathbf y^{(k+2)}(s_d)$, with coefficient

$$
\frac{4\epsilon^2}{LD^3}\mathbf n\mathbf n^{\mathsf T}(s_d')^k,
\qquad
s_d'=\frac{1-\epsilon\mathbf n\cdot\mathbf y'(s)}D.
$$

Every other term uses derivatives of order at most $k+1$ and fixed root margins. For recent speeds at most two and $\epsilon\le1/16$, $L\ge8/9$, $D\ge7/8$ and $|s_d'|\le9/7$. Hence the displayed coefficient norm is at most $64\epsilon^2$, for every $k\le4$.

This supplies an explicit recursive bound. Starting with the position/speed box and supplied derivative bounds, let $N_k$ be the supremum of the remaining terms in the $k$th differentiated equation when already bounded derivatives through order $k+1$ lie in their fixed balls. The terms are rational functions of finite jets with $L,D$ bounded away from zero, so $N_k$ is finite and can be calculated by differentiating the boxed exact row. Define

$$
M_{k+2}=\max\{M_{k+2}^{\rm past},2N_k\},\qquad 0\le k\le4,
$$

and take $64\epsilon^2\le1/2$. On successive short delay steps, the inequality $\|y^{(k+2)}\|\le N_k+\tfrac12\sup_{\rm earlier}\|y^{(k+2)}\|$ preserves this bound. This is an induction over time and derivative order, rather than a simultaneous present-acceleration assumption. No exponential-in-elapsed-time derivative estimate is needed.

Compatibility through fifth order makes the generated solution $C^{5,1}$ across release and subsequent step seams. The sixth derivative may have bounded jumps. The regular solution can be restarted while the geometry, speed and these derivative bounds hold. All constants in the following theorem are fixed using this recursive inventory, before choosing the small speed parameter.

## 4. Reduced coupled equation through cubic order

Put $v_r=\mathbf e\cdot\mathbf y'$, $\mathbf v_\perp=\mathbf y'-v_r\mathbf e$ and $P=I-\mathbf e\mathbf e^{\mathsf T}$. The present-source expansion applied to $\mathbf z=-\mathbf y$ gives

$$
\mathbf y''=-\frac{\mathbf e}{r^2}
-\frac{\epsilon^2}{2r^2}
\left[2v_r\mathbf y'+(\|\mathbf y'\|^2-3v_r^2)\mathbf e-2rP\mathbf y''\right]
-\frac43\epsilon^3\mathbf y'''+O_{W^{2,\infty}}(\epsilon^4).
$$

The transverse current acceleration appears because the source present acceleration is $-\mathbf y''$. This equation is an expansion of the coupled delay law, not an acceleration imported from a prescribed circle. The uniform derivative bounds give $\mathbf y''+\mathbf e/r^2=O_{W^{2,\infty}}(\epsilon^2)$. Differentiating its leading term gives

$$
\mathbf y'''=-\frac{\mathbf y'-3v_r\mathbf e}{r^3}
+O_{W^{1,\infty}}(\epsilon^2).
$$

Since $P\mathbf e=0$, substituting these controlled estimates in the quadratic acceleration term and cubic jerk term yields

$$
\boxed{
\mathbf y''=-\frac{\mathbf e}{r^2}
-\frac{\epsilon^2}{2r^2}
\left[2v_r\mathbf y'+(\|\mathbf y'\|^2-3v_r^2)\mathbf e\right]
+\frac43\frac{\epsilon^3}{r^3}(\mathbf y'-3v_r\mathbf e)
+\mathbf Q,
\quad \|\mathbf Q\|_{W^{1,\infty}}\le C_Q\epsilon^4.
}
$$

The inherited constants include the actual delayed-derivative bounds. In particular this substitution does not assume that the jerk of an arbitrary prepared history is Keplerian.

The exact prescribed circle in the fixed references supplies a check: $v_r=0$ and $v_\perp=1$ at radius one give a quadratic inward correction $-\epsilon^2/2$ and a cubic tangent $4\epsilon^3/3$ in these orbital units. These agree with the exact residual's radial expansion and tangential coefficient. That agreement checks coefficients; the following evolving-history control provides the secular conclusion.

## 5. Corrected angular quantity and radial balance

Let $h=(\mathbf y\times\mathbf y')\cdot\widehat{\mathbf z}>0$, where $\widehat{\mathbf z}$ is the fixed oriented normal to the pair plane. It is an angular quantity constructed from position and velocity, not primitive physical angular momentum. Cross the reduced equation with $\mathbf y$:

$$
h'=-\frac{\epsilon^2r'}{r^2}h
+\frac43\frac{\epsilon^3}{r^3}h+q_h,
\qquad \|q_h\|_{W^{1,\infty}}\le C_h\epsilon^4.
$$

The quadratic term is a total radial derivative. Define

$$
H=h\exp(-\epsilon^2/r).
$$

Then

$$
H'=\frac43\frac{\epsilon^3}{r^3}H+q_H,
\qquad\|q_H\|_{W^{1,\infty}}\le C_H\epsilon^4.
$$

The remainder constants are finite on the fixed box. This correction is essential: using $h$ directly would confuse a reversible quadratic radial modulation with cubic secular growth.

The radial equation becomes

$$
r''=\frac{H^2e^{2\epsilon^2/r}}{r^3}
-\frac1{r^2}
-\frac{\epsilon^2H^2e^{2\epsilon^2/r}}{2r^4}
-\frac83\frac{\epsilon^3r'}{r^3}+q_r,
\qquad\|q_r\|_{W^{1,\infty}}\le C_r\epsilon^4.
$$

Define a radial comparison potential $U_H$ by

$$
\partial_r U_H(r)=\frac1{r^2}
-H^2e^{2\epsilon^2/r}\left(\frac1{r^3}-\frac{\epsilon^2}{2r^4}\right).
$$

Its additive constant is irrelevant. This is a mathematical scalar for the radial comparison equation, not a physical potential account of the full delayed pair. For $H$ near one and $\epsilon$ sufficiently small, it has a smooth strict local minimum at $r=\mathcal R(H,\epsilon)$, with

$$
\mathcal R(H,\epsilon)=H^2+\frac32\epsilon^2+O(\epsilon^4),
\qquad \partial_r^2U_H(\mathcal R)\ge c_U>0.
$$

Indeed its minimum equation is $r=H^2e^{2\epsilon^2/r}(1-\epsilon^2/(2r))$, and the derivative with respect to $r$ is nonzero at $\epsilon=0,r=H^2$. The constant $c_U$ is the positive infimum on a sufficiently small fixed neighborhood, chosen before $\epsilon$. The $3\epsilon^2/2$ displacement of the radial reference is another necessary correction to the instantaneous circle.

## 6. A finite secular theorem

Fix finite recent-history derivative bounds and a complete scaled speed bound $V$. There are constants $c>0$, $C>0$ and $\epsilon_0>0$, depending only on these bounds and the strict geometry boxes, with the following property. Supply complete planar mirror histories satisfying:

- $0<\epsilon\le\epsilon_0$, $\epsilon V\le1/8$ and the complete speed bound $\|\mathbf y'\|\le V$;
- the sampled recent past belongs to $C^{5,1}$, with the uniform derivative inventory in Section 3 and recent speed at most two;
- positions and velocities at release have $r(0)=1$, $r'(0)=0$ and $h(0)=(1-\epsilon^2/2)^{-1/2}$;
- the terminal derivatives through fifth order equal the corresponding candidate-equation derivatives computed from the supplied earlier histories and already specified lower receiver jets.

The higher compatibility is triangular: acceleration is set first, then jerk and the next derivatives are set from the functional and those already fixed lower jets. It is stronger than the original local domain and is part of this long-time preparation.

**Theorem.** The exact coupled candidate solution continues throughout

$$
0\le s\le c\epsilon^{-3},
$$

with complete one-partner/no-self root census, positive separation and uniform subfield speed. On this interval

$$
|r-H^2|\le C\epsilon,
\qquad
\left|\frac{dH^6}{ds}-8\epsilon^3\right|\le C\epsilon^4,
\qquad
|H^6(s)-H^6(0)-8\epsilon^3s|\le C\epsilon^4s.
$$

For a further sufficiently small choice of $\epsilon_0$, the terminal actual radius satisfies $r(c\epsilon^{-3})\ge1+c$. This is finite expansion by a fixed positive fraction; it does not assert eventual escape.

### Proof of the radial and history bootstrap

Let $w=r-\mathcal R(H,\epsilon)$ and $p=r'-\mathcal R_H H'$. The initial $H$ is $h(0)e^{-\epsilon^2}$, so $\mathcal R(H(0),\epsilon)=1$ exactly by the specified radial-balance equation. The initial $p$ is $O(\epsilon^3)$ because $r'(0)=0$ and the corrected angular equation gives $H'=O(\epsilon^3)$. Choose a fixed neighborhood with $9/10<H<11/10$, $|w|<\delta$ and $\delta$ small enough for positive radial curvature. The initial data lie inside it.

Let

$$
V(H,w)=U_H(\mathcal R(H,\epsilon)+w)-U_H(\mathcal R(H,\epsilon)),
\qquad E_r=\frac12p^2+V(H,w).
$$

Taylor's integral formula and the curvature bound give $a_Uw^2\le V\le b_Uw^2$ for fixed positive constants. Since $V(H,0)=V_w(H,0)=0$ for every $H$, $|V_H|\le Cw^2$. The centered variables obey

$$
w'=p,\qquad p'=-V_w+B,
\qquad |B|\le C_1\epsilon^3|p|+C_2\epsilon^4.
$$

To verify the last estimate, differentiate $H'=4\epsilon^3H/(3r^3)+q_H$: its second derivative satisfies $|H''|\le C\epsilon^3|r'|+C\epsilon^6+C\epsilon^4$. Subtract $\mathcal R_HH''+\mathcal R_{HH}(H')^2$ from the radial equation. The radial cubic term and the resulting terms linear in $r'$ are bounded by $C\epsilon^3|p|$, while $r'-p=\mathcal R_HH'=O(\epsilon^3)$ and the remaining terms are at most $C\epsilon^4$. This is where the time derivative of the row remainder and its delayed-history bound are required.

Differentiate $E_r$ along the centered equation:

$$
E_r'=pB+V_HH'
\le C_3\epsilon^3E_r+C_4\epsilon^4\sqrt{E_r}.
$$

For $e_r=\sqrt{E_r}$, the corresponding integral inequality, obtained first with $\sqrt{E_r+\delta_0}$ and then $\delta_0\downarrow0$, gives

$$
e_r(s)\le e^{C_5\epsilon^3s}
\big(e_r(0)+C_6\epsilon^4s\big).
$$

On $s\le c\epsilon^{-3}$ this is $O(\epsilon)$, since the initial value is $O(\epsilon^3)$. Choose $c$ small enough that the bounded corrected angular rate keeps $H$ strictly within the fixed neighborhood, and then choose $\epsilon_0$ small enough that the last estimate keeps $|w|$ and $|p|$ inside half their neighborhood slacks. Thus $r$ stays separated, $|\mathbf y'|^2=(r')^2+h^2/r^2$ stays strictly below four, and the complete physical speed remains subfield. Section 3 independently preserves all sampled derivative bounds. The regular local theorem can therefore restart before any attempted first exit, so no first exit occurs up to the stated finite time.

This closes the geometric and neutral-history estimates together. An undifferentiated circle residual or a bounded acceleration alone would not supply the $q_H'$ estimate used here.

### Corrected cubic-radius growth

The bootstrap gives $r=H^2+O(\epsilon)$ and $H$ bounded away from zero. Hence

$$
\frac{dH^6}{ds}
=6H^5H'=8\epsilon^3\frac{H^6}{r^3}+O(\epsilon^4)
=8\epsilon^3+O(\epsilon^4).
$$

Integration gives the theorem's uniform secular error. At the endpoint, $H^6(0)=1+O(\epsilon^2)$ and $H^6=1+8c+O(\epsilon)$. Since $r=H^2+O(\epsilon)$, $r^3=1+8c+O(\epsilon)$. Choose $c\le1/100$ and $\epsilon_0$ small enough that the terminal error is below $c$. Then $r^3\ge1+7c>(1+c)^3$, proving the finite expansion. The constants are constructive: $c$ is any positive value satisfying the geometry and centered-energy bounds above, and $\epsilon_0$ enforces their strict slacks and the recursive delayed-derivative coefficient bound. They are not fitted to a simulation.

### Nonempty preparations with the required compatibility

The conditions do not declare a prescribed circle to be a solution. Fix a recent interval $[-a,0]$, with $a>0$ independent of $\epsilon$, and take a degree-five polynomial with the specified endpoint position and velocity and unknown terminal vector jets $J_2,\ldots,J_5$. Its mirror specifies the other past. Compute the candidate row and its first three reception-time derivatives at release using this polynomial, its unique implicit root and the same terminal receiver jets. Setting these traces equal to $J_2,\ldots,J_5$ is a finite system of compatibility equations. It is smooth in the coefficients and in $\epsilon$ near zero: the auxiliary root is $u=0$ at zero, the geometric range is two and the implicit denominator is one. For sufficiently small positive $\epsilon$, the physical root lies inside the fixed polynomial interval.

At $\epsilon=0$ the row is $A_0(\mathbf y)=-\mathbf y/\|\mathbf y\|^3$. The compatibility system becomes

$$
J_2=A_0(\mathbf y_0),\qquad J_3=DA_0(\mathbf y_0)\mathbf v_0,
$$

$$
J_4=D^2A_0(\mathbf y_0)[\mathbf v_0,\mathbf v_0]+DA_0(\mathbf y_0)J_2,
$$

$$
J_5=D^3A_0(\mathbf y_0)[\mathbf v_0,\mathbf v_0,\mathbf v_0]
+3D^2A_0(\mathbf y_0)[\mathbf v_0,J_2]+DA_0(\mathbf y_0)J_3.
$$

The equations written as left minus right have a triangular Jacobian in $(J_2,J_3,J_4,J_5)$ with identity diagonal. Its inverse is a finite triangular substitution. The finite-dimensional implicit-function argument therefore gives bounded smooth jets for all sufficiently small positive $\epsilon$, with the prescribed smooth initial velocity $h(0)=(1-\epsilon^2/2)^{-1/2}$. Choose $a$ small enough that the polynomial stays in the recent position/speed box. Its sixth derivative is zero on this fixed interval. Extend it smoothly into the complete older past with a fixed cutoff outside that interval; the extension has some finite speed bound $V$ and finite derivative bounds independent of $\epsilon$. It cannot add partner roots because the complete physical speed is below one. The generated sixth derivative may jump at release, which is permitted in $C^{5,1}$. This proves nonemptiness for sufficiently large fixed preparation bounds, without a shrinking transition that hides growing derivatives. The supplied pasts do not have to solve the candidate equation before release.

## 7. Physical dimensions, significance and remaining fate question

Define the geometric slow radius $\rho_{\rm slow}=R_0H^2$. Restoring dimensions gives

$$
\boxed{
\frac{d(\rho_{\rm slow}^3)}{dT}
=\frac{K^2}{2c_f^3}\,[1+O(\epsilon)],
\qquad
0\le T\le c\frac{R_0c_f^3}{v_0^4},
\qquad
\rho(T)=\rho_{\rm slow}(T)+O(R_0\epsilon).
}
$$

The error constants refer to the fixed preparation class and finite interval, not every slow binary. The instantaneous-comparison baseline drift concerns squared radius and a linear speed correction; this selected law instead has a cubic-radius law driven by a cubic correction. Both statements are geometric evolution comparisons, without a physical energy premise.

This result connects the accelerated-source response to coupled evolution. It demonstrates suppression of the leading baseline mechanism while identifying a smaller residual mechanism that still expands a sufficiently prepared near-circular pair. It therefore advances the variant comparison but supplies no binding theorem. A formal continuation would suggest cube-root expansion, but changing-scale history control, preparation renewal and the accumulation of the fourth-order remainder remain unproved beyond this finite interval. No infinite-future fate is booked.

## 8. Failure mechanisms and falsifiers

The theorem fails to apply if complete past speed is not uniformly subfield, separation is lost, a transmitter denominator vanishes, terminal jets are incompatible, or the sixth-derivative inventory is not uniform. In particular a prepared acceleration that varies sharply on the shrinking causal interval can make the jerk or mixed Taylor remainder large even at small speed. The old $C^{2,1}$ local theorem does not prevent that failure. The new $C^{5,1}$ hypotheses and small delayed highest-derivative coefficient supply the additional control explicitly.

The operator-checkable falsifiers are a different cubic jerk coefficient obtained by a fixed-time differentiation of the source scalar; a violation of the differentiated exact row's highest-derivative coefficient inventory inside its box; failure of the claimed mixed Taylor bound on bounded sixth jets; a compatible history satisfying the preparation and margins whose corrected angular quantity decreases faster than its fourth-order error; or a coupled solution inside those hypotheses that violates the stated finite endpoint growth. The exact affine and prescribed circle controls would detect sign or coefficient errors, but neither alone validates the finite coupled theorem.

## Development record

The startup, role and live queue were refreshed for this selected follow-up. The prior treatment, its independent adjudication and the canonical equation were inventoried locally with Node SHA-256 after the known `abc` control passed; `.tmp/amplitude-gradient-secular/input-inventory.json` records that measurement. Only this new treatment and the dedicated scratch directory are written. The old proof subjects remain fixed. No production solver, system Python, standard-physics premise, Git mutation, generator, population calculation or physical account was used.

All new claims above are derived and analytically self-reviewed, not independently accepted until a separate reviewer reconstructs the neutral-history bound and centered radial estimate. Their constants are defined by explicit finite derivative suprema and neighborhood slacks; no numerical value is offered without evaluating those suprema. The treatment proves existence of a uniformly bounded class with a controlled finite secular interval, not a certified practical speed threshold for a historical run.

The document check `node .tmp/amplitude-gradient-secular/check.mjs` passed after its fenced-code/math-link and four-delimiter/invalid-TeX known controls. It rendered the mathematical spans and checked this treatment's local destinations; that validates syntax, not the new theorem. The analytical self-review checked the present scalar coefficients, the coupled signs, the radial balance displacement, the highest-delayed-derivative coefficient, the weighted mixed remainder, centered radial energy cancellation and the fixed-window compatibility Jacobian. The preparation proof uses the actual candidate traces and a finite triangular inverse; no practical cutoff or speed has been assigned from an unevaluated constant.
