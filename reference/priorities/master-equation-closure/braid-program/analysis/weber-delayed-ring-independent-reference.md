# Independent analytical reference for the delayed Weber first screen

## Frozen specification and independence

This working analysis supplies a separately authored reference for the operator-selected first delayed Weber screen. The specification below and the derivations through the characteristic matrix were written before target numbers or any new subject output was inspected. The selected law is a mathematical comparison; no primitive energy, momentum or standard-physics mechanism is imported. The author read the existing equation definitions and research contract, but no new delayed-Weber subject instruments, values or reports. The reference is not a production solver.

For every ordinary positive-delay causal root $S<T$, set $c_f=K=1$, $\sigma_{ij}=(-1)^{i-j}$ for the alternating ring, and

$$
\mathbf A_i(T)=\sum_{j,S}\frac{\sigma_{ij}}{R_{ij}^2|D_{t,ij}|}\left[1-\frac12\left(\frac{dR_{ij}(T,S(T))}{dT}\right)^2+R_{ij}\frac{d^2R_{ij}(T,S(T))}{dT^2}\right]\mathbf n_{ij}.
$$

Here $R=\|\mathbf X_i(T)-\mathbf X_j(S)\|=T-S>0$, $\mathbf n=(\mathbf X_i-\mathbf X_j)/R$ and $D_t=1-\mathbf n\cdot\mathbf V_j(S)\ne0$. Every ordinary self root is included, and the endpoint $S=T$ is excluded. All histories are twice differentiable on the required root charts, and the implicit present-acceleration matrix must be invertible for regular evolution. The unlimited-speed comparison is selected; strict and inclusive speed labels can only reuse results lying inside their domains. There is no boundary response, root deletion, core smoothing or coefficient adjustment. None of the instantaneous comparison's conserved quantities is assumed.

## Causal derivatives and implicit acceleration

Differentiating the arrival identity gives $S'=D_r/D_t=:p$, where $D_r=1-\mathbf n\cdot\mathbf V_i(T)$. In particular $R'=1-p$. Write $\mathbf w=\mathbf V_i-p\mathbf V_j$ and $\mathbf w_\perp=\mathbf w-(\mathbf n\cdot\mathbf w)\mathbf n$. Differentiating the geometric range twice and using $S''=-R''$ gives

$$
R''=\frac{\mathbf n\cdot(\mathbf A_i-p^2\mathbf A_j(S))+\|\mathbf w_\perp\|^2/R}{D_t}.
$$

The derivative contains the present receiver acceleration and the delayed transmitter acceleration. Substitution places the present acceleration in a matrix,

$$
M_i=I-\sum_{j,S}\frac{\sigma_{ij}\mathbf n\mathbf n^{\mathsf T}}{R|D_t|D_t},
$$

with the remaining right-hand side

$$
\sum_{j,S}\frac{\sigma_{ij}\mathbf n}{R^2|D_t|}\left[1-\frac12(1-p)^2+\frac{\|\mathbf w_\perp\|^2-Rp^2\mathbf n\cdot\mathbf A_j(S)}{D_t}\right].
$$

There is no instantaneous two-body denominator to transfer. Claim grade: derived. Falsifier: differentiating the stated arrival identity on an ordinary twice-differentiable root chart and obtaining a different expression for either derivative or matrix.

## Closed-form stationary and affine controls

If transmitter and receiver are stationary and separated, there is one partner root $S=T-R$, $D_t=p=1$ and $R'=R''=0$. The bracket equals one. A stationary complete self history has no positive-delay root. A stationary receiver and an affine transmitter at a root with velocity $\mathbf v$ have

$$
p=D_t^{-1},\qquad R'=-\frac{\mathbf n\cdot\mathbf v}{D_t},\qquad R''=\frac{\|\mathbf v-(\mathbf n\cdot\mathbf v)\mathbf n\|^2}{RD_t^3}.
$$

For a radial affine transmitter, $R''=0$. For a transverse affine transmitter at the chosen root, $\mathbf n\cdot\mathbf v=0$, so $D_t=1$, $R'=0$, and the bracket is $1+\|\mathbf v\|^2$. These are prescribed-history acceleration evaluations; a held receiver is not asserted to satisfy the selected equation. For two affine paths with a common constant velocity and constant displacement, a selected ordinary root has constant lag and $R'=R''=0$, but its causal range, direction and transmitter weight generally differ from those of the stationary preparation. Thus the causal comparison cannot inherit instantaneous common-velocity invariance. Claim grade: derived. Falsifier: an ordinary affine example violating the displayed derivatives or the direct causal-range calculation.

## Full circular root census and balance

Take $\mathbf X_j(T)=\rho(\cos(\Omega T+\phi_j),\sin(\Omega T+\phi_j))$, $\phi_j=j\pi/2$, $\rho>0$, $\Omega>0$, and $\beta=\Omega\rho$. For receiver zero at $T=0$, put $d=\Omega(T-S)$, $\alpha=\phi_j-d$, and $u=R/\rho=d/\beta$. Every causal root is a positive solution of

$$
h_j(d;\beta)=d-2\beta\left|\sin\frac{\phi_j-d}{2}\right|=0,\qquad 0<d\le2\beta.
$$

The complete ledger can be obtained by partitioning this compact interval at the zeros of the sine and at every zero of $h_j'=1+\beta\,\operatorname{sign}(\sin((\phi_j-d)/2))\cos((\phi_j-d)/2)$. Each remaining interval is strictly monotone; a sign change supplies exactly one root. An endpoint zero is tested separately, counted once, and rejected if its transmitter denominator vanishes. This partition therefore includes every self and partner root without sampling an unbounded past. At a root,

$$
\mathbf n=\frac{(1-\cos\alpha,-\sin\alpha)}u,\quad
D_t=1+\frac{\beta\sin\alpha}u,\quad
C_r(\beta)=\sum_{j,d}\frac{(-1)^j}{2u|D_t|},\quad
C_t(\beta)=-\sum_{j,d}\frac{(-1)^j\sin\alpha}{u^3|D_t|}.
$$

Every lag is constant along the whole rigid history. Hence $R'=R''=0$ on each root branch, including every ordinary self root, and the delayed Weber bracket is exactly one. The exact vector balance conditions are consequently

$$
C_t(\beta)=0,\qquad C_r(\beta)<0,\qquad \rho=-\frac{C_r(\beta)}{\beta^2},\qquad \Omega=\frac\beta\rho.
$$

The complete delayed Weber circle balances if and only if this canonical all-root balance does. This identity does not transfer a canonical stability spectrum, since variation of $R''$ is nonzero. Claim grade: derived. Falsifier: a time-dependent lag or range on a rigid circular root branch, or a discrepancy between the two selected circle acceleration sums using the same complete ledger.

## Separately derived pairing characteristic matrix

Let $J=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ and $Q_\alpha$ be the plane rotation through $\alpha$. A Fourier sector $k$ has a local-frame perturbation $\boldsymbol\xi_j(T)=e^{zT}e^{ik\phi_j}U$. At a ledger root let $E=e^{ik\phi_j}e^{-z\tau}$, $\tau=R$, $W=I-EQ_\alpha$, $\mathbf v=\beta(-\sin\alpha,\cos\alpha)$, and $\mathbf a=-\Omega^2\rho(\cos\alpha,\sin\alpha)$. Define the row $L=\mathbf n^{\mathsf T}W/D_t$. Direct variation gives

$$
\delta R=LU,\quad \delta S=-LU,\quad
\delta\mathbf n=\frac{I-\mathbf n\mathbf n^{\mathsf T}}R(W+\mathbf vL)U,
$$

$$
\delta\mathbf v=\left[EQ_\alpha(zI+\Omega J)-\mathbf aL\right]U,\qquad
\delta D_t=-\mathbf v^{\mathsf T}\delta\mathbf n-\mathbf n^{\mathsf T}\delta\mathbf v.
$$

Since the unperturbed range is constant, $\delta R''=z^2\delta R$. If $N$ is the matrix multiplying $U$ in $\delta\mathbf n$ and $D$ the row multiplying $U$ in $\delta D_t$, the complete planar characteristic matrix is

$$
H_k(z)=(z^2-\Omega^2)I+2\Omega zJ-\sum_{j,d}\frac{(-1)^j}{R^2|D_t|}\left[N-\frac{2\mathbf nL}R-\frac{\mathbf nD}{D_t}+Rz^2\mathbf nL\right].
$$

The last term is the new neutral delayed Weber contribution. The $k=2$ sector alternates the local-frame radial/tangential displacement between neighbors and supplies a real planar pairing/shear screen. A root of $\det H_2(z)$ with $z>0$ is a growing formal mode about the certified balanced whole history. It establishes linear instability in this sector only; it is not an evolved nonlinear fate or an all-sector verdict. Claim grade: derived. Falsifier: direct first variation of the frozen law on the same ordinary ledger that disagrees with this matrix, including its source-time shift or neutral term.

## Validation record

The known-case command, its result, and the subsequently run target command will be recorded here in that order. No target values have been computed when this specification/reference was first saved.

Before target use, `node reference/priorities/master-equation-closure/braid-program/evidence/weber-delayed-reference-screen.mjs --known` passed the named stationary, transverse affine and monotonic subfield-census controls; its receipt is [the known-case record](../evidence/weber-delayed-reference-known.json). The affine finite-difference first derivative was $-1.1102\times10^{-11}$ against zero, and the second derivative was $0.0449999593$ against the independently derived closed-form $0.045$, within the declared $10^{-7}$ tolerance. The analytical reference as first saved had SHA-256 `60f374223f3b89bc73f153222b9bba6e7d75946342a01f98aedd0c964ab2ad66`. Target use follows this recorded pass.

A second, separate interval reference first passed `node reference/priorities/master-equation-closure/braid-program/evidence/weber-delayed-reference-interval.mjs --known`, recording enclosures of $\sin0=0$, $\cos0=1$, $\exp0=1$, $\sin(\pi/2)=1$, and the determinant of $\operatorname{diag}(2,3)$ as $6$ in [its known-case receipt](../evidence/weber-delayed-reference-interval-known.json). Its arithmetic moves each elementary floating-point operation outward by one representable number. Sine and cosine use 20 Taylor corrections after reduction to an interval within $[-3.142,3.142]$, with absolute remainder $10^{-23}$; the true remainder is smaller than that bound. Exponential uses 32 terms on an interval within $[-0.6,0.6]$, remainder $10^{-30}$, and four squarings. The determinant and transcendental known controls precede the interval target run.

## Certified bounded target result

The measured target command `node reference/priorities/master-equation-closure/braid-program/evidence/weber-delayed-reference-screen.mjs --target` produced [the independent numerical record](../evidence/weber-delayed-reference-target.json). It locates a circle near $\beta=2.1472456589006272$, $\rho=0.41618280830931376$ and $\Omega=5.1593809644$; the last displayed frequency is only an approximate projection. The reference's sampled search is not a global balance census and is not used to establish uniqueness of a balancing speed.

The interval target command `node reference/priorities/master-equation-closure/braid-program/evidence/weber-delayed-reference-interval.mjs --target` then passed, with [its certificate record](../evidence/weber-delayed-reference-interval-target.json). The [endpoint hints](../evidence/weber-delayed-reference-endpoint-seeds.json) only propose root locations; the interval calculation independently verifies sign changes at every root-box endpoint, includes every critical point in the compact monotone partition, rejects folds, and verifies the count of sign-changing monotone intervals. The initial narrow second characteristic bracket failed to exclude zero because its interval determinant was too wide; widening that bracket to $[3.60,3.70]$ resolved the enclosure without changing any analytical formula. The failure was a certificate-width limitation, not a negative root finding.

| Certified quantity | Enclosure or sign |
| --- | --- |
| Balanced-speed existence interval | $\beta\in[2.14724560,2.14724572]$ |
| Tangential coefficient at left endpoint | $[-7.89398,-7.88692]\times10^{-7}$ |
| Tangential coefficient at right endpoint | $[8.18145,8.18851]\times10^{-7}$ |
| Radial coefficient throughout the speed interval | $C_r\in[-1.918913553141,-1.918844560927]$ |
| Positive balance radius | $\rho\in[0.416175302550,0.416190312686]$ |
| Complete reception-zero counts by transmitter index | $(1,3,1,1)$, including one self root |
| Present-acceleration matrix determinant | $\det M\in[-21.0772650500,-21.0572514159]$ |
| First positive pairing characteristic zero | At least one $z\in[1.02,1.04]$ |
| Second positive pairing characteristic zero | At least one $z\in[3.60,3.70]$ |

Continuity of the root branches follows because every root box has a transmitter denominator excluding zero and every critical-point value is nonzero throughout the speed interval. The strictly opposite tangential endpoint signs therefore give at least one exact tangential zero by the intermediate value theorem. The strictly negative radial coefficient sets a positive exact radius there. To specify one reference without assuming uniqueness, define $\beta_*:=\min\{\beta\in[2.14724560,2.14724572]:C_t(\beta)=0\}$, $\rho_*=-C_r(\beta_*)/\beta_*^2$, and $\Omega_*=\beta_*/\rho_*$. The zero set is nonempty and closed in a compact ordinary chart, so this minimum exists. Rotational covariance then gives this selected circle complete balance at every time. The four receivers have the same six-hit ledger under the decorated rotational symmetry, giving 24 directed hits with four self hits. At the measured midpoint the six angular delays, grouped by transmitter index, are $3.94914508578$; $1.06809444010$, $3.39167626441$, $4.08476370811$; $2.11284532001$; and $3.09965981583$. The complete certificate retains the root and denominator boxes; the branch at $d\approx3.39167626441$ has negative $D_t$ and remains included with the absolute transmitter weight.

For every exact balanced circle supplied by this speed interval, the first pairing determinant is negative at $z=1.02$ and positive at $z=1.04$; the second is positive at $z=3.60$ and negative at $z=3.70$. The entries of the characteristic matrix are continuous in positive real $z$, so there are at least two positive real characteristic zeros. These are formal exponentially growing perturbations of the whole balanced history. They establish a negative linear-persistence result in the real $k=2$ pairing/shear sector at this one certified circle enclosure. They do not count every characteristic zero, prove simplicity, exclude stable circles at other speeds, give a nonlinear breakup, or solve a future initial-history problem.

Claim grade: derived, supported by the named outward-interval instrument and the frozen separately authored characteristic derivation. The measured decimal projections are aids to reproducing the certificate. Falsifier: rerunning the certificate with a correct independent outward implementation that reverses either tangential endpoint sign, reveals an omitted ordinary/self root, admits zero into the present-acceleration determinant, or removes either pairing determinant sign change would overturn the corresponding bounded conclusion. A different nonlinear future would not overturn this formal linear claim.

This chosen circle has $\beta>1$, so it belongs only to the unlimited-speed comparison. Neither the strict nor inclusive ceiling admits it. The ordinary self contribution is defined; the present acceleration matrix is invertible although indefinite. No instantaneous denominator or conservation law was used. The screen establishes that this particular delayed reading leaves at least one exact four-member circular history linearly unstable. The existence or nonexistence of other balanced or stable circles, and nonrigid bound histories, remains open.

## Remaining invariant boundary

Absolute-time translation, Euclidean translation and rotation preserve the selected equation's form. These are covariance properties, not a proof of conserved instantaneous energy, total velocity or angular quantity. The causal root support refers to the absolute wake speed; adding a common constant velocity changes the lag, direction and weight. An explicit co-moving affine pair with present distance $a>0$ and common longitudinal velocity $v$, $|v|<1$, has forward and backward ranges $R_+=a/(1-v)$ and $R_-=a/(1+v)$ and transmitter factors $1-v$ and $1+v$. Its two inverse-square acceleration magnitudes are proportional to $(1-v)/a^2$ and $(1+v)/a^2$, even though both brackets are one. Their unequal magnitudes disprove generic equal-and-opposite cancellation of the prescribed input rows. This prevents transferring the instantaneous momentum-like derivation; a conserved account of the implicit delayed dynamics would require a separate proof. Claim grade: derived. Falsifier: direct evaluation of this separated ordinary affine preparation giving equal directed magnitudes for a nonzero longitudinal $v$. No replacement mathematical invariant has been proved by this screen.
