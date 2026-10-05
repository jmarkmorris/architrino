# Complete real planar frequencies throughout the subfield circle family

Status: derived theorem with a complete rational interval certificate, 2026-10-05; independent enclosure audit and coordinator assessment pending at freeze. This source completes the bounded assignment without changing the selected equation or any preceding frozen source. It concerns whole-line linear boundary solutions, not nonlinear stability or causal evolution.

For every fixed $0<\beta<1$, the balanced Section 14 equal past/future circle has exactly the following real continuous planar frequencies in rotating time:

| Exchange parity | Frequencies | Determinant multiplicity | Matrix nullity |
| --- | --- | --- | --- |
| Common displacement | $m=\pm1$ | Two at each root | One |
| Opposite displacement | $m=0$ | Two | One |
| Opposite displacement | $m=\pm m_*(\beta)$, with $0<m_*<1$ | One at each root | One |

There are no other real planar frequencies. The real planar tempered solution space has dimension eight; its bounded subspace has dimension five, consisting of two translations, phase rotation, and two non-Euclidean oscillatory directions. The latter have physical frequencies $(1\pm m_*)\omega$. The branch $m_*$ is real analytic throughout $(0,1)$ and has the small-speed expansion $m_*=1-\beta^2/2+O(\beta^4)$.

## 1. Exact case and retained physical derivative

The law is precisely Section 14 of [the binary source](alternatives-screen-2026-10-05-binary.md): canonical radial acceleration with equal past/future weights, opposite polarities, and $K=c_f=1$. Define

$$
x=\beta\cos x,\quad c=\cos x,\quad s=\sin x,\quad D=1+\beta s,\quad R=(4\beta^2cD)^{-1},\quad \omega=\beta/R,\quad \tau=2x/\omega.
$$

The complete paths are $X_1(t)=R(\cos\omega t,\sin\omega t,0)$, $X_2(t)=-X_1(t)$. Their half-weighted past/future tangent accelerations cancel, and their radial acceleration is $-e_R/(4R^2cD)=-R\omega^2e_R$. Every partner root is retained: strict subfield speed gives exactly one root in each time direction, at $t\pm\tau$, and excludes nonzero-age self roots by the strict chord/age inequality. No new instantaneous diagonal rule is imposed.

The [independent analytical reference](alternatives-screen-2026-10-05-time-symmetric-all-speed-frequency-independent-analytic-reference.md) gives the full symbol and its physical Cartesian derivation. In particular, a source perturbation includes both

$$
\delta S=\frac{\varepsilon n\cdot(\eta_i-\eta_j)}{D_\varepsilon},\qquad \delta X_j'(S)=\eta_j'(S)+X_j''(S)\delta S.
$$

The source acceleration shift is retained in $M_\varepsilon$, and the rotating physical derivative $\omega(\partial_\theta+J)$ is retained in the $N_\varepsilon$ term. The entire proof uses that unchanged complete tensor, including both time directions. The interval instrument's known controls independently compare its determinant with the earlier Cartesian outer-product reference.

Let $\theta=\omega t$, $Q(\theta)$ be planar rotation, and $\eta_i(t)=Q(\theta)u_i(\theta)$. Exchange parity $\chi$ means $u_2=\chi u_1$. For every real $m$, the exact symbol is the Hermitian matrix $H_\chi(m,x)=(a,if;-if,d)$ from the analytical reference. Integer $m$ is imposed only when one requires the base physical period. No such restriction is imposed here.

## 2. Analytic common-sector classification

The analytical reference proves, for all real $m$ and every $0<\beta<1$,

$$
F_+(m,x):=\det H_+(m,x)=(m^2-1)^2Q_+(m,x),\qquad Q_+\ge a_*^2-b_*^2>0,
$$

where

$$
a_*=1-\frac{\beta^2}{2}+\frac{\beta^2x^2}{2D^2},\qquad b_*=\frac{\beta^2}{D}+\frac{\beta^2(1-\beta^2)}{2D^2},\qquad a_*-b_*=(1-\beta^2)\left(1-\frac{\beta^2}{D^2}\right)>0.
$$

The proof factors out $m-1$ and $m+1$ in the circular basis and bounds the remaining off-diagonal secant with the exact inequality $|\cos w-3\operatorname{sinc}w|\le2$. It covers the entire real frequency axis analytically. Thus the common roots are exactly $\pm1$, each double, and each matrix has nullity one. No common-sector numerical grid enters this result.

## 3. Complete opposite-sector derivative certificate

Put $y=m^2$. The same analytical reference derives the entire regularized determinant

$$
F_-(m,x)=m^2G(m^2,x),\qquad G(0,x)=-1.
$$

Explicitly, with $\rho=x^2/D^2$, $a_0=-(3+\rho)$, and the scalar coefficients $U,V,W,\kappa$ defined in that reference,

$$
\begin{aligned}
\mathsf C&=\cos(2x\sqrt y),&\mathsf S&=\operatorname{sinc}(2x\sqrt y),&\mathsf T&=\operatorname{sinc}^2(x\sqrt y),\\
\bar a&=-1+2Ux^2\mathsf T-2\kappa c^2x\mathsf S,\\
\bar d&=-1+2Vx^2\mathsf T+2\kappa s^2x\mathsf S,\\
\bar f&=-2+2Wx\mathsf S-\kappa cs\mathsf C,\\
G&=a_0\bar d-\bar f^2+y\bar a\bar d.
\end{aligned}
$$

The removable value at zero follows from the exact identities $a_0=-(3+\rho)$, $\bar d(0)=-(1+\rho)$ and $\bar f(0)=-(2+\rho)$. Hence the phase root remains exactly double at every speed. Its coefficient is exactly minus one, not a measured approximation.

The [frozen interval protocol](alternatives-screen-2026-10-05-time-symmetric-all-speed-frequency-opposite-interval-protocol.md) and [new interval instrument](../evidence/alternatives-screen-2026-10-05-time-symmetric-all-speed-frequency-opposite-interval.py) enclose $\partial_yG$ over the complete rectangle

$$
0\le x\le\frac34,\qquad 0\le y\le36.
$$

The proof includes the analytic continuation $x=0$ without treating it as a finite-radius physical circle; it slightly exceeds the physical upper endpoint only to provide a convenient closed enclosure.

**Measured complete certificate.** The admitted pilot finished at 20:41:15 UTC on 2026-10-05, after 934 evaluated boxes and 3.6865757079795003 measured elapsed seconds. Its final partition has 531 certified leaves and zero pending leaves. Every leaf has a strictly positive rational derivative enclosure. The structural audit reconstructed all exact box bounds from 128 dyadic roots and child paths, found both children at every internal node, and returned complete coverage. The minimum of the certified rational lower bounds is

$$
\mu=\frac{4036349565933687020810885057124836754448673}{10^{45}}>\frac1{250}=0.004.
$$

Thus the certificate establishes $\partial_yG\ge\mu>0$ throughout the entire rectangle, subject to the outward arithmetic and remainder proof. The pilot exhausted its complete mathematical queue, so no additional full-target run was needed or performed. The certified bound is $\mu$; the earlier sampled minimum near $0.77$ is not used in the theorem.

The instrument imports unchanged rational interval arithmetic with outward grid step $10^{-45}$. It evaluates the entire cosine/sinc series at exact rational midpoints through term 40, encloses the alternating tails by their first omitted terms, and expands to each interval using proved derivative bounds. The global constants and local improvements for first and second derivatives are derived in the protocol from elementary integral identities. Thus source intervals containing $x=0$ or $y=0$ are handled without division by vanishing quantities. All signed products in $G$ and $\partial_yG$ are interval products.

**Measured known-first record.** At 20:40:09 UTC, before this target, the interval instrument passed 26 additional controls and all imported Cartesian controls. These included exact limiting $G(y,0)=y-1$ and $\partial_yG(y,0)=1$, exact phase values at nonzero points and intervals, entire-function values and derivatives at zero, and overlap of $yG$ with independently assembled Cartesian determinants at 15 rational nonzero angle/frequency points. The complete root-partition audit also passed before the target. The subject and the original Cartesian reference were not modified together.

## 4. Root count and global continuation

The previously frozen [finite interval theorem](alternatives-screen-2026-10-05-time-symmetric-speed-family-kernel.md) proves $G(1,x)=F_-(1,x)>0$ for every physical $x>0$. Its normalized first-frequency factor is greater than $811/1000$ on the complete enclosing angle interval. Combining that independent premise with $G(0,x)=-1$ and the new strict derivative certificate proves exactly one root $y_*(x)$ in $(0,1)$, simple as a root of $G$. No other zero of $G$ occurs on $[0,36]$.

Set $m_*(\beta)=\sqrt{y_*(x(\beta))}$. Then

$$
\partial_mF_-(m_*,x)=2m_*^3\partial_yG(m_*^2,x)>0.
$$

The negative root is its conjugate-frequency partner, also simple. The opposite circular-basis diagonal entries are strictly negative for every real frequency by the analytical reference; therefore every opposite determinant zero has matrix nullity one. The zero root is exactly double by $G(0,x)=-1$.

For completeness, the independent tensor norm bound gives

$$
\|H_\chi(m,x)+m^2I\|\le\frac{24}{7}|m|+\frac{438}{49}<m^2\qquad(|m|\ge6),
$$

so a Neumann inverse excludes the entire real frequency tail. The new rectangle covers $|m|\le6$, including both endpoints. This is the complete union: the common analytic factor covers all real $m$; the opposite exact factor and positive derivative cover $|m|\le6$; the tensor inverse covers $|m|\ge6$. There is no unexamined intermediate frequency or speed interval.

The implicit function theorem applies locally at every point of the unique positive branch. Uniqueness makes these analytic local branches agree on overlaps, producing a single real-analytic branch throughout $0<\beta<1$. The previously proved small-speed expansion identifies it with $m_*=1-\beta^2/2+O(\beta^4)$. No collision with zero, with an additional real root, or with the common roots occurs in the strictly subfield domain. No claim of monotonicity in speed is needed for this continuation; the certified monotonicity is in $y$ at fixed speed.

## 5. Exact generalized chains and bounded modes

Let $\mathcal L_\chi$ denote the rotating shift-differential operator, with $\mathcal L_\chi(e^{im\theta}v)=e^{im\theta}H_\chi(m)v$. A generalized chain obeys

$$
H_\chi v=0,\qquad H_\chi w=iH_\chi'v,
$$

because $\mathcal L_\chi\{e^{im\theta}(\theta v+w)\}=e^{im\theta}[\theta H_\chi v+H_\chi w-iH_\chi'v]$.

At the common root $m=1$, define $v=(1,i)^{\mathsf T}$, $v_\perp=(1,-i)^{\mathsf T}$,

$$
h=a_+(1)=d_+(1)=f_+(1)<0,\qquad k=(\partial_m a_+-\partial_mf_+)_{m=1}.
$$

Then $H_+v=0$, $H_+v_\perp=2hv_\perp$, and $H_+'v=kv_\perp$. The common physical solutions are the real and imaginary parts of

$$
\eta_1=\eta_2=v,\qquad \eta_1=\eta_2=\theta v+\frac{ik}{2h}e^{2i\theta}v_\perp.
$$

The first pair gives translations. The second pair grows linearly and generally requires the displayed oscillation at twice the base frequency. No pure in-plane boost symmetry is assumed. For a directly checkable coefficient,

$$
k=\kappa cs-2x(\alpha-\zeta)cs+x\kappa\cos2x.
$$

At the opposite zero root, let $e_R=(1,0)^{\mathsf T}$, $e_T=(0,1)^{\mathsf T}$ and $\rho=x^2/D^2$. The two real chains have rotating coordinates

$$
u_1=e_T,\qquad u_1=\theta e_T-\frac{2+\rho}{3+\rho}e_R,\qquad u_2=-u_1.
$$

The ordinary direction is phase rotation. The generalized direction has a secular tangent term and is unbounded; it is the normalized circle-family variation. Its coefficients follow from the exact phase expansion and solve the chain equation directly.

At the positive opposite root, the circular-basis symbol has strictly negative diagonal entries $d_1=\phi_-(m_*-1)$ and $d_2=\phi_-(m_*+1)$, and off-diagonal entry $b=\psi_-(m_*)$. The root identity gives $b^2=d_1d_2>0$. A real circular-basis null vector is $(b,-d_1)^{\mathsf T}$. In ordinary coordinates set

$$
v_* =\frac{b(1,i)^{\mathsf T}-d_1(1,-i)^{\mathsf T}}{\sqrt2}.
$$

The two bounded real opposite solutions are the real and imaginary parts of

$$
\eta_1(t)=Q(\omega t)v_*e^{im_*\omega t},\qquad \eta_2(t)=-\eta_1(t).
$$

Both circular components are nonzero, so both physical frequencies $(1\pm m_*)\omega$ occur. For example the complex planar coordinate of the real variation is

$$
\eta_{1x}+i\eta_{1y}=-\frac{d_1}{\sqrt2}e^{i(1+m_*)\omega t}+\frac b{\sqrt2}e^{i(1-m_*)\omega t}.
$$

It is quasiperiodic when $m_*$ is irrational and periodic with a longer period when it is rational. This is a statement about linear variations. Since $m_*$ is analytic and nonconstant, the speeds at which it is rational form an at most countable subset of $(0,1)$: each rational level set is discrete inside that interval. This arithmetic observation constructs no nonlinear family.

## 6. Whole-line solution-space completeness

Take planar rotating components in the tempered distribution space on the entire real $\theta$ axis, satisfying the linear equation distributionally. Every bounded classical variation belongs to this class. Smooth periodic rotation preserves temperedness. The matrix symbol and all its derivatives grow at most polynomially, so Fourier multiplication is defined.

Where the symbol is invertible, its smooth local inverse shows that the Fourier transform of a solution vanishes. The transform is therefore supported on the finite root set above. A distribution supported at one point is a finite sum of delta derivatives, so inverse transformation gives polynomial multiples of the listed exponentials. At each root a nonzero matrix entry permits analytic row and column elimination to a nonzero pivot and the scalar Schur complement, equal to determinant divided by that pivot. An order-$r$ scalar zero admits precisely delta derivatives of orders zero through $r-1$. This proves both completeness and the generalized-chain count; determinant multiplicity is not being confused with matrix nullity.

The double common pair contributes four real directions; opposite zero contributes two; the simple opposite pair contributes two. Thus the planar tempered dimension is eight. The common generalized directions and the opposite generalized phase direction are unbounded, and their leading terms cannot cancel across exchange sectors. Removing those three leaves bounded planar dimension five.

Combining this result with the separately derived [whole-line normal theorem](alternatives-screen-2026-10-05-time-symmetric-normal-bounded-independent.md) gives full Cartesian tempered dimension twelve and bounded dimension eight at every fixed strictly subfield speed. The bounded space consists of the six Euclidean motions and the two additional planar oscillatory directions. The four unbounded generalized directions are the two common planar chains, common normal linear drift, and the opposite circle-family chain.

## 7. Boundaries and evidence disposition

The result classifies all real continuous frequencies and all tempered solutions of this whole-line variational equation. It does not classify the full complex characteristic spectrum. It neither constructs a nonlinear quasiperiodic solution nor proves advanced initial-value solvability, a causal instability or causal release. For each fixed speed the bounded variations have bounded first derivatives, so sufficiently small affine path perturbations preserve separation, strict subfield speed and the complete ordinary-root census; a second-order nonlinear residual still does not make those paths nonlinear solutions.

The fixed-period six-dimensional kernel and the local periodic circle classification remain consistent. The new opposite frequency lies strictly between zero and one and is not an integer. For rational $m_*=p/q$ in lowest terms, a common period of the base circle and this variation is $q$ circle periods, with $q\ge2$. This is no assertion of a nonlinear longer-period branch.

The outward interval derivation and queue contract were frozen and prospectively reviewed before the pilot. The pilot's complete positive cover is a subject certificate; independent enclosure audit and coordinator assessment remain the acceptance steps at this source's freeze. There is no remaining subject box, numerical guard failure, or unresolved mathematical frequency region in the stated domain. Earlier frozen partial references remain accurate records of what their own proofs established.

Falsifiers are a missing physical source-clock term; a failed common-factor inequality; an error in the exact regularized determinant; a Taylor remainder or derivative bound that fails to enclose its argument; a non-outward arithmetic operation; a missing or overlapping dyadic leaf; a nonpositive exact derivative inside a certified box; an extra real-frequency root; an incorrect generalized-chain sign or dimension; or an unsupported nonlinear interpretation. Independent evaluation agreement alone would not repair a failed enclosure proof.

## 8. Reproducible provenance

The mathematical reference was frozen before the diagnostic or interval subject. It has SHA-256 `85a17a66c5c9c8e6812b90b21881a1600e2dd0274106784dce3b6cd7b39757da`. The original all-speed protocol has SHA-256 `5fadb8d700bec8ab2533ec86edb8c66964141bc667b2b811f6b8c3caf35b839f`. The complete interval protocol has SHA-256 `a4d8944edda4d6cb6711b2fd5ef6b28e51103c47f2b80dd116d758c5394e2f48`.

| Instrument or local receipt | SHA-256 |
| --- | --- |
| [Interval subject](../evidence/alternatives-screen-2026-10-05-time-symmetric-all-speed-frequency-opposite-interval.py) | `913773f407168c13624cd5c54c1d6bf9a8e23f99e1f61b66ed546284f0d24f41` |
| Unchanged independent Cartesian interval reference | `43c7da211120330a76f1e8030d9b211667845329d807df08f61e77e4135ee01b` |
| Unchanged outward rational arithmetic | `874c3db24a7f5a12f640b8c6b4a30b32c5b453fabd550f3b9478a744781c9c03` |
| Interval known receipt | `4ea0272bc8ed76f9ba094f18c795283334d0cd061c4b6ac299b57faeaa02c4d5` |
| Complete interval pilot receipt | `7795b770a3ce604f71b1f98c5d334ab96fdf710791bc48da0404f501c290ae0d` |
| [Earlier floating diagnostic](../evidence/alternatives-screen-2026-10-05-time-symmetric-all-speed-frequency-opposite-diagnostic.py) | `f7f9842e02cc95b32434f1b46177961d2cbbd7bd9ef03da9917b135e2518a6c3` |
| Diagnostic known receipt | `5bbc488fc27509172dd65f1a207ac291c134cc422c5748c50e30c26a6b655668` |
| Diagnostic target receipt | `467617813d3cb5b399c5e6ae43e75f17b00b94d8874434786fe64e4d84c6eb7c` |

Hashes were measured with `shasum -a 256` over those exact sources and receipts. Local receipts are retained under the existing ignored owner `.local-data/master-equation-closure/binary-research/`, using prefix `alternatives-screen-2026-10-05-time-symmetric-all-speed-frequency-opposite-interval-` with suffixes `known.json` and `pilot.json`; diagnostic receipts use the parallel `opposite-diagnostic-` prefix. They are local provenance, not tracked reference links. The durable instrument and mathematical protocol are linked above.

The original known-first invocations used the mandated shared venv:

```bash
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/binary-research/evidence/alternatives-screen-2026-10-05-time-symmetric-all-speed-frequency-opposite-interval.py known
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/binary-research/evidence/alternatives-screen-2026-10-05-time-symmetric-all-speed-frequency-opposite-interval.py pilot
```

The instrument refuses to overwrite those frozen receipts. An independent rerun must use a separately owned output destination rather than altering the subject and reference together. No production solver, regular test suite, generated output or shared integration document was modified.
