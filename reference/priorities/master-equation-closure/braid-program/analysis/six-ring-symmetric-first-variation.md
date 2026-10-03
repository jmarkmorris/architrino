# Common-radius and phase variation of the exact six-ring

## Scope and assumptions

This calculation varies the exact alternating six-member circular solution of the unchanged Master Equation. It concerns common radial and phase perturbations in the plane, not differential-member or out-of-plane perturbations. Set $c_f=1$ and write the acceleration coefficient as $K>0$. All ordinary positive-delay roots, including self roots, are retained. Each root has nonzero transmitter factor, so implicit differentiation is valid on its fixed root chart. No cap or event exclusion is introduced.

Claim grade: derived formal first variation, self-reviewed here, without independent adjudication or a numerical spectrum. The [balance ladder](../evidence/2026-08-29-planar-three-binary-circular-balance-ladder.md) supplies the reference solutions. A finite-chart first variation alone does not prove differentiability of a history-space solution map or nonlinear instability.

## Root-resolved matrix

Let $Q(\gamma)$ be planar rotation, $J=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$, and $e_1,e_2$ the radial and tangential unit vectors. The reference paths are

$$
X_i(T)=R Q(\Omega T+\alpha_i)e_1,
\qquad \alpha_i=i\pi/3,
\qquad q_i=(-1)^i.
$$

At receiver $i=0$, consider a source-$j$ root with delay $\Delta>0$. Express vectors in the receiver's rotating frame and define

$$
B=Q(\alpha_j-\Omega\Delta),\quad
\ell=R\lVert e_1-Be_1\rVert,\quad
n=\frac{R(e_1-Be_1)}{\ell},\quad
v=\Omega RBe_2,\quad
a_s=-\Omega^2RBe_1,\quad D=1-n\cdot v.
$$

The root equation is $\Delta=\ell$. A common perturbation has rotating coordinates $u=(a,b)^\mathsf T$, where $a$ is radial displacement and $b=R\varphi$ is phase displacement in length units. For $u(T)=e^{zT}u_0$, set $E=e^{-z\Delta}$. With the factor $e^{zT}$ suppressed, implicit differentiation of the causal equation gives the emission-time displacement

$$
\delta s=-\frac{n^\mathsf T(I-BE)u}{D}.
$$

The remaining variations are

$$
\delta r=(I-BE)u-v\delta s,\qquad
\delta\ell=n\cdot\delta r,\qquad
\delta n=\frac{(I-nn^\mathsf T)\delta r}{\ell},
$$

$$
\delta v=BE(zI+\Omega J)u+a_s\delta s,\qquad
\delta D=-\delta n\cdot v-n\cdot\delta v.
$$

For polarity product $\sigma=q_0q_j$, the root contributes $\sigma K n/(\ell^2|D|)$. Its variation is

$$
\delta A_{0j}=\frac{\sigma K}{\ell^2|D|}
\left[\delta n-n\left(\frac{2\delta\ell}{\ell}+\frac{\delta D}{D}\right)\right].
$$

This formula includes negative $D$: the relative variation of $|D|$ is $\delta D/D$, not $\delta D/|D|$. For positive-delay self roots $\sigma=1$. Sum the linear root maps to obtain $L(z)u$. The rotating acceleration equation is

$$
A(z)u=0,\qquad
A(z)=z^2I+2\Omega zJ-\Omega^2I-L(z).
$$

In radius/phase coordinates $(a,\varphi)$, use $M(z)=A(z)\operatorname{diag}(1,R)$. The normalization matters when comparing determinant coefficients.

## Analytic controls

Write the reference acceleration as

$$
\frac K{R^2}\big[C_r(\beta)e_1+C_t(\beta)e_2\big],\qquad
\beta=\Omega R.
$$

At a balance, $C_r=-\Omega^2R^3/K$ and $C_t=0$. Constant phase shifts give $A(0)e_2=0$. Differentiating the rigid-circle family at fixed $\Omega$ gives

$$
A(0)e_1=
\begin{pmatrix}-3\Omega^2-K\beta C_r'/R^3\\-K\beta C_t'/R^3\end{pmatrix}.
$$

A phase perturbation $b(T)=T$ varies angular frequency by $1/R$. Differentiating that family gives

$$
A'(0)e_2=
\begin{pmatrix}-2\Omega-K C_r'/R^2\\-K C_t'/R^2\end{pmatrix}.
$$

Consequently the determinant has an analytic factorization and coefficient

$$
\det M(z)=zG(z),\qquad
G(0)=R\det\big[A(0)e_1,A'(0)e_2\big]
=\frac K R\Omega^2 C_t'(\beta).
$$

The terms containing $C_r'C_t'$ cancel. A simple upward tangential crossing has $G(0)>0$. This excludes an additional zero-frequency root in this sector; it supplies no unstable-root verdict. The corrected topology-cell indexing is essential to the crossing sign.

For real $z\to+\infty$, every delayed term $z e^{-z\Delta}$ tends to zero and the receiver-only terms stay bounded. Thus

$$
A(z)=z^2I+2\Omega zJ+O(1),\qquad G(z)\sim Rz^3.
$$

The two positive endpoint signs do not imply either stability or instability between them. The matrix entries are finite exponential polynomials, and $G$ is their analytic determinant quotient after removing the phase root.

## What would decide the question

A future independently authored evaluator must first recover phase neutrality, the displayed $G(0)$ and a known rigid-family variation before use on T02. Root completeness and signed transmitter factors must come from the certified ledger. A certified positive-real sign change would establish a positive real characteristic root. Its absence would leave complex roots unresolved; an argument-principle count also needs a proved large-contour confinement bound and control of all contour errors.

An unstable mode in this sector is relevant to full-ring instability once its history-space interpretation is proved. Stability in this sector does not establish full-ring stability: differential radial/phase and out-of-plane sectors remain. Nonlinear attraction or retention needs additional analysis of the admissible flow. The existing [nearby-history task](../campaigns/planar-three-binary-work-queue.md#nearby-history-return-map-and-stability) remains deferred under its own acceptance contract.

Falsifier: an independently differentiated root row or rigid-family calculation disagreeing with the emission-time variation, signed denominator derivative, determinant coefficient or normalization overturns the corresponding formula. No spectrum, interval count or EOM-solver run was produced here.
