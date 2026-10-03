# Alternating-ring moments and a prescribed mismatch

## Purpose and scope

This calculation tests a geometric cancellation mechanism before a retained photon or neutrino branch exists. It uses prescribed circular histories and the same common-time moments as the Braid Program's [causal-delay angular bound](../../braid-program/evidence/2026-07-24-causal-delay-angular-bound.md). It derives neither weak shielding nor exposure fractions for a neutrino. Numerical preparations and the formulas below use $c_f=1$.

Claim grade: derived algebra and conditional far-pattern bounds, self-reviewed here, without independent adjudication or a numerical target run. The moment identities require no speed restriction; connecting them to the cited far-pattern theorem requires its uniform subfield speed, smooth-history and exterior-receiver assumptions. Known exact superfield ring solutions are outside that theorem's speed domain.

## Angular selection rule

Place $2N$ members on a circle with angles $\theta_k=\theta+k\pi/N$ and polarity $q_k=q_0(-1)^k$, where $q_0=\pm1$. For integer angular order $h$, the signed harmonic is

$$
M_h=\sum_{k=0}^{2N-1}q_k e^{ih\theta_k}
=q_0e^{ih\theta}\sum_{k=0}^{2N-1}
\left[e^{i\pi(h+N)/N}\right]^k.
$$

The geometric sum gives

$$
M_h=\begin{cases}
2Nq_0e^{ih\theta},&h\equiv N\pmod{2N},\\
0,&\text{otherwise}.
\end{cases}
$$

The order $h$ here is the azimuthal harmonic, not automatically a spherical-harmonic degree or an inverse-distance exponent. For a six-member ring, $N=3$, so orders zero, one and two vanish and order three is permitted. For example, with in-plane unit direction $\hat n$ at angle $\phi$,

$$
\sum_kq_k(\hat n\cdot\mathbf x_k)^3
=\frac32q_0R^3\cos 3(\theta-\phi).
$$

This is a nonzero cubic geometric moment for $R>0$. It does not by itself establish a nonzero leading dynamical exterior coefficient; a response may have additional cancellations. A two-ring pair can also cancel moments that one ring permits.

## Common-time velocity and position–acceleration moments

Take the six prescribed paths

$$
\mathbf x_k(T)=R e_r(\theta_k(T)),\qquad
\theta_k(T)=\omega T+\theta_0+k\pi/3,
$$

where $e_r=(\cos\theta,\sin\theta,0)$ and $e_t=(-\sin\theta,\cos\theta,0)$. Then $\mathbf v_k=\omega R e_t$ and $\mathbf a_k=-\omega^2R e_r$. Define the cited moments

$$
\mathbf U=\sum_kq_k\mathbf v_k,\qquad
\mathbf S=\operatorname{STF}\sum_kq_k
\operatorname{sym}(\mathbf x_k\otimes\mathbf a_k).
$$

Here $\operatorname{sym}B=(B+B^{\mathsf T})/2$ and $\operatorname{STF}B=B-\operatorname{tr}(B)I/3$ for a symmetric tensor. Velocity has angular orders $\pm1$; $\mathbf x\otimes\mathbf a$ has orders $0,\pm2$. The selection rule therefore gives $\mathbf U=0$ and $\mathbf S=0$ at every common time. A constant common center offset also adds no term to $\mathbf S$, because $\sum_kq_k\mathbf a_k=0$. These are exact prescribed-path identities, not equations of motion.

## Explicit one-member mismatch

Change only member $m$, throughout its prescribed past, to radius $R(1+\delta a)$ and phase $\theta_m+\delta b$. The numbers $a,b$ specify a fractional-radius and phase direction, and $\delta$ is a small dimensionless mismatch. Keep its angular frequency and polarity fixed. At the undeformed member phase, differentiation gives

$$
\mathbf U=\delta q_m\omega R(ae_t-be_r)+O(\delta^2),
$$

$$
\mathbf S=-\delta q_m\omega^2R^2
\operatorname{STF}\left[
2ae_r\otimes e_r+b(e_t\otimes e_r+e_r\otimes e_t)
\right]+O(\delta^2).
$$

Orthogonality of the radial and mixed tensor terms gives

$$
\|\mathbf U\|^2=\omega^2R^2(a^2+b^2)\delta^2+O(\delta^3),
$$

$$
\|\mathbf S\|_{\mathrm F}^2=
\omega^4R^4\left(\frac83a^2+2b^2\right)\delta^2+O(\delta^3).
$$

For $R>0$, $\omega\ne0$ and a nonzero direction $(a,b)$, both leading coefficients are positive. For a general coordinated deformation they can cancel, so first-order restoration is not universal for every mismatch.

## What the quadratic quantity measures

The cited first causal-delay approximation $L$ has degree-one and degree-two angular powers

$$
P_1(L)=\frac{4\pi}{3}\langle\|\mathbf U\|^2\rangle,\qquad
P_2(L)=\frac{8\pi}{15}\langle\|\mathbf S\|_{\mathrm F}^2\rangle.
$$

The brackets denote a declared time average. The coefficients above are time independent, so the one-member mismatch gives

$$
P_1(L)=\frac{4\pi}{3}\omega^2R^2(a^2+b^2)\delta^2+O(\delta^3),
$$

$$
P_2(L)=\frac{8\pi}{15}\omega^4R^4
\left(\frac83a^2+2b^2\right)\delta^2+O(\delta^3).
$$

The radius defect also restores the scalar part that trace removal hides. Writing $B=\sum_kq_k\operatorname{sym}(\mathbf x_k\otimes\mathbf a_k)$, the neutral source's degree-zero approximation is $L_0=\operatorname{tr}B/3$. Thus

$$
L_0=-\frac23q_m\omega^2R^2a\delta+O(\delta^2),\qquad
P_0(L)=\frac{16\pi}{9}\omega^4R^4a^2\delta^2+O(\delta^3).
$$

A pure phase defect leaves this trace zero. Net polarity remains zero in both cases; it does not forbid an isotropic delayed-response correction.

These powers are squared angular norms of a rescaled virtual-probe acceleration pattern. They are not energy flux, radiation power, reaction probability or the corpus's weak-exposure fraction. The pure-radius and pure-phase proxy ratios tend respectively to $(16/15)(\omega R)^2$ and $(4/5)(\omega R)^2$. These distinct coefficients are analytical controls, not fitted neutrino parameters.

The source theorem bounds the difference between the exact finite-radius pattern $F_{R_o}$ and $L$ using $E_R+E_D$. Increasing observer radius $R_o$ reduces $E_R$ but does not remove the delay-approximation error $E_D$. Near cancellation, that absolute error can exceed the small mismatch amplitude. The quadratic proxy alone therefore does not certify a measured exterior suppression. The source packet explicitly finds its ratio bounds uninformative for its existing active draws.

## Exact compact-source far pattern: a conditional strengthening

For smooth prescribed paths with a uniform speed bound $\nu<1$, define the exact far pattern from the cited theorem by

$$
H(\hat n,T_0)=\sum_k\frac{q_k}{1-\hat n\cdot\mathbf v_k(T_0+d_k)},\qquad
d_k=\hat n\cdot\mathbf x_k(T_0+d_k).
$$

For the undeformed regular ring, let $Q$ rotate through $\pi/3$ about its axis. The identities $\mathbf x_{k+1}=Q\mathbf x_k$ and $\mathbf v_{k+1}=Q\mathbf v_k$, uniqueness of the contraction root and $q_{k+1}=-q_k$ imply

$$
H(Q\hat n,T_0)=-H(\hat n,T_0).
$$

Thus its azimuthal orders satisfy $h\equiv3\pmod6$. In particular its exact spherical degrees zero, one and two vanish: none supports an azimuthal order with magnitude at least three. Degree three is the first allowed degree, not a proof that its coefficient is nonzero.

For a perturbation family satisfying uniform bounds $|\mathbf x_m^\delta-\mathbf x_m^0|\le c_x|\delta|$, $|\mathbf v_m^\delta-\mathbf v_m^0|\le c_v|\delta|$, $|\mathbf a_m|\le A_*$ and speed at most $\nu<1$, contraction perturbation gives $|d_m^\delta-d_m^0|\le c_x|\delta|/(1-\nu)$. Hence

$$
|H_\delta-H_0|\le C_H|\delta|,\qquad
C_H=\frac{|q_m|}{(1-\nu)^2}
\left(c_v+\frac{A_*c_x}{1-\nu}\right).
$$

Since the undeformed lower-degree projections vanish, orthogonal projection and the sphere's area give

$$
P_\ell(H_\delta)\le4\pi C_H^2\delta^2,\qquad \ell=0,1,2.
$$

This is a conditional exact-far-pattern upper bound, not a nonzero asymptotic coefficient, total-response scaling or receiver-channel identification. Higher allowed degrees need not vanish at zero mismatch. The argument cannot be transferred to superfield paths by substituting their moments: the positive denominator margin and unique contraction root would be lost. A compact, centered subfield source is also a different preparation from an indefinitely translating carrier at a fixed laboratory origin.

## Bounded proposed check

Use a prescribed centered six-ring with $R=1$, $|\omega|=0.1$, $c_f=1$ and complete all-past circular formulas. Perturb one member in the pure-radius and pure-phase directions above, keeping a uniform subfield margin. These are explicit comparison paths, not unforced solutions or neutrino preparations. Check common-time moments and their mismatch derivatives over one declared cycle; an exact exterior calculation would additionally need direction-dependent roots, angular projection and controlled approximation errors.

A separately authored direct-sum evaluator must first pass the two-member harmonic identity $M_h=1-(-1)^h$ at zero phase and a single-source tensor control: $q=1$, $x=(1,0,0)$, $v=(0,1/2,0)$, $a=(-1/4,0,0)$ give $U=(0,1/2,0)$ and $S=\operatorname{diag}(-1/6,1/12,1/12)$. Then the roots-of-unity formula and displayed mismatch coefficients supply analytical references for the target. Do not alter the analytical reference and evaluator together to repair disagreement.

Acceptance is agreement with the harmonic zeros and first-order coefficients within independently controlled rounding and Taylor errors. A nonzero undeformed $U$ or $S$, a wrong mismatch coefficient, or an exact ordinary far-root ledger violating the rotation/sign covariance overturns the corresponding result. No evaluator or exterior calculation was run in this integration. Passing this check would still establish only the prescribed cancellation mechanism, not weak shielding, mode reduction or a retained neutrino.
