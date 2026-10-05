# Common radius and phase growth across the alternating six-member ring ladder

## Result and scope

A new comparison instrument certifies two distinct positive real characteristic roots for each of the hundred recorded even rungs T02 through T200 under the unchanged Master Equation. These are growing modes of the common in-plane radius and phase first variation about an exact periodic ring. Every displayed witness bracket has a strictly signed derivative, so its root is simple and unique inside that bracket. The calculation counts neither the complete complex spectrum nor every positive real root. A formal growing mode is not, by itself, a nonlinear escape trajectory; the separately adjudicated T02 history theorem supplies that additional connection at T02.

At T02 and T04, the transfer from a common tangential velocity kick has a nonzero numerator at both growing poles. Thus the kick excites a growing formal component rather than producing a pure decaying ring-down. The fixed circular past and an endpoint velocity kick define a linear input problem; compatibility and a finite-duration drive for the nonlinear equation remain separate requirements.

Claim grade: computer-assisted derived positive-root existence and simplicity on the declared exact simple-root charts, using outward-rounded reference uncertainty and determinant endpoints; independent adjudication of this new family instrument is pending. The numerical roots and trend diagnostics are measured. Falsifiers are a failed complete census, an incorrect tensor derivative, a balance bracket missing the exact zero, an interval endpoint sign failure, or a zero-containing derivative/numerator contrary to the recorded certificate. The full-ring nonlinear verdict beyond T02 remains open here.

## Scenario and reference histories

The six paths are

$$
X_j(T)=Q(\Omega T+j\pi/3)R e_1,\qquad q_j=(-1)^j,\qquad \beta=\Omega R,
$$

where $Q$ is planar rotation and $e_1=(1,0)$. Every numerical value uses $K=c_f=1$. No cap, receiver multiplier, root exclusion, logarithmic response or event prescription is included. The coupling length is $R_*=K/c_f^2$; restoring dimensions multiplies normalized lengths by $K/c_f^2$, normalized time by $K/c_f^3$, and normalized growth by $c_f^3/K$.

A common perturbation has the form $Q(\Omega T+j\pi/3)u(T)$, where $u=(a,b)$ is radial and tangential displacement and $b=R\varphi$ for dimensionless phase $\varphi$. The exponential trial is $u(T)=e^{zT}u_0$. It is this two-component invariant sector, not differential radial, phase shear or axial modes, that is evaluated.

The inputs are the [accepted ladder](../evidence/2026-08-29-planar-three-binary-circular-balance-ladder.md), [first variation](six-ring-symmetric-first-variation.md), [frozen independent T02 evaluator](t02-symmetric-characteristic-independent-evaluation.md), [nonlinear history construction](t02-admissible-nonlinear-history-connection.md) and its [independent adjudication](t02-nonlinear-history-independent-adjudication-2026-10-03.md). They remain unchanged. The new instrument imports neither an old evaluator nor a scalar oracle implementation.

## Complete circular census before spectral evaluation

For one receiver, every positive-delay circular hit has $0<x<\pi$ and a lattice level

$$
F_\beta(x)=\beta\sin x-x=m\pi/6.
$$

The source is $j=m\bmod6$, its rotation relative to the receiver is $B=Q(-2x)$, the delay is $\ell=2R\sin x$, and its signed transmitter factor is $D=1-\beta\cos x$. The acceleration coefficient projections are

$$
C_r=\sum\frac{(-1)^m}{4\sin x|D|},\qquad C_t=\sum\frac{(-1)^m\cos x}{4\sin^2x|D|}.
$$

In cell T$t$, $(t-1)\pi/6<\max F_\beta<t\pi/6$. Strict concavity gives one descending root at each $m=-5,-4,-3,-2,-1,0$ and a rising/descending pair at every $m=1,\ldots,t-1$. The endpoints $x=0,\pi$ are excluded. There are $2t+4$ hits per receiver and $12t+24$ ordered hits in all six receivers. Positive-delay self hits are exactly the listed roots with $m$ divisible by six; none is removed. This census is proved from concavity and level inequalities, rather than inferred from a delay scan.

The instrument brackets each lattice root at both endpoints of the speed bracket using outward-rounded residual signs and a fixed signed $D$. Because $dx/d\beta=\sin x/D$ has a constant branch sign, the hull of those endpoint root enclosures contains its complete continuation across the speed bracket. It verifies $C_t(\beta_-)<0<C_t(\beta_+)$, $C_t'>0$ and $C_r<0$ before any spectral evaluation. Defining $R=-C_r/\beta^2$ at the exact enclosed zero supplies exact radial balance; circular covariance supplies all six receiver vectors and perpetuates the equality for all time.

T02 through T36 use the frozen outward-rounded scalar speed brackets from the existing bounded zero-count receipt. T38 and above use the 120-decimal recorded speed as a proposal and a new symmetric bracket of half-width $10^{-55}$, independently verifying its opposite tangential endpoint signs. The old table is not treated as an exact scalar zero or as a certified error bar. The new certificates retain the actual speed bracket, all root endpoint certificates, outward-rounded radius/frequency uncertainty and minimum $|D|$.

Claim grade: derived complete census and computer-assisted derived reference enclosure for each successful receipt. Falsifier: an admissible missing lattice level, an unlisted root on a monotone branch, an endpoint at a retained self hit, a zero-containing $D$, a failed tangential sign or inward radial test, or a failed level inequality invalidates that target before interpreting its spectrum.

## Tensor construction of the first variation

At a root, let $n$ be the emission-to-reception unit separation, $v$ the source velocity and $a_s$ its acceleration. Write $\delta q$ for the receiver-position change minus the source-position change evaluated at a fixed emission time. Differentiating the causal equation gives $\delta S=-n^{\mathsf T}\delta q/D$. Therefore

$$
\delta r=P\delta q,\qquad P=I+vn^{\mathsf T}/D,
$$

and

$$
\delta n=N\delta q,\qquad N=(I-nn^{\mathsf T})P/\ell.
$$

The range variation is $\delta\ell=n^{\mathsf T}\delta q/D$. The source velocity at the moved emission changes by $\delta v_f-a_s n^{\mathsf T}\delta q/D$, where $\delta v_f$ is the fixed-emission velocity variation. Consequently

$$
\delta D=d\delta q-n^{\mathsf T}\delta v_f,\qquad d=-v^{\mathsf T}N+(n\cdot a_s)n^{\mathsf T}/D.
$$

Differentiating the per-hit acceleration $w n$, with $w=(-1)^m/(\ell^2|D|)$, factorizes the row as

$$
\delta A=T\delta q+U\delta v_f,
$$

where

$$
T=w\left[N-n\left(\frac{2n^{\mathsf T}}{\ell D}+\frac dD\right)\right],\qquad U=\frac wD nn^{\mathsf T}.
$$

The signed divisor $D$ remains signed even on a rising negative-$D$ hit, because $d\log|D|=dD/D$. With $E=e^{-z\ell}$, $\delta q=(I-BE)u_0$ and $\delta v_f=BE(zI+\Omega J)u_0$, where $J e_1=e_2$, so

$$
L(z)=\sum\left[C+e^{-z\ell}(F+zH)\right],\qquad C=T,\quad F=-TB+\Omega UBJ,\quad H=UB.
$$

This factorization is independently authored in the new instrument. The characteristic matrix and radius/phase determinant are

$$
A(z)=z^2I+2\Omega zJ-\Omega^2I-L(z),\qquad G(z)=\frac{R\det A(z)}z.
$$

A constant common phase shift supplies the known neutral root at zero; it does not suppress a positive root. All witness brackets lie strictly above zero.

## Analytical and nonlinear controls before targets

The new instrument first records the exact static-source control: for a transmitter fixed at the origin and a receiver at $(2,0)$, the separation derivative of $n/\ell^2$ is $\operatorname{diag}(-2,1)/8$. The tensor construction returns this exactly. Only after this receipt is written does it reconstruct the accepted T02 circle as a control.

The T02 controls are phase neutrality $A(0)e_2=0$, the rigid-radius derivative

$$
A(0)e_1=(-3\Omega^2-\beta C_r'/R^3,\,-\beta C_t'/R^3)^{\mathsf T},
$$

and the rigid-frequency derivative

$$
A'(0)e_2=(-2\Omega-C_r'/R^2,\,-C_t'/R^2)^{\mathsf T}.
$$

Their determinant identity is $G(0)=\Omega^2C_t'/R$. The negative-$D$ row is checked by independently perturbing the paths, re-solving the nonlinear causal emission root and differencing its acceleration; this calculation does not reuse the tensor derivative. Finally the analytic determinant derivative agrees with arbitrary-precision differentiation on the known T02 input. The largest recorded identity discrepancy is below $1.2\times10^{-97}$ and the negative-$D$ nonlinear centered-difference discrepancy is below $2.9\times10^{-57}$. These are numerical controls of a declared formula, not a new proof of the baseline law.

The `known.json` and `controls.json` receipts were written successfully before any target. Targets require their hashes to match the current instrument. Changing the instrument invalidates both gates. The frozen evaluator and its receipts are never modified or imported.

## Certified witnesses and measured trend

The table rounds the witness centers for readability. The authoritative outward-rounded binary intervals and endpoint signs are in the per-rung receipts under `.local-data/ring-exploration/stability/`.

| Cell | Ordered hits | Positive real witness 1 | Positive real witness 2 | Witness 1 / $\Omega$ | Witness 2 / $\Omega$ |
| --- | ---: | ---: | ---: | ---: | ---: |
| T02 | 48 | 0.859629068213381 | 10.6584241740494 | 0.4593536394 | 5.695463445 |
| T04 | 72 | 1.42545538342261 | 89.6449210439662 | 0.2692134432 | 16.93046176 |
| T06 | 96 | 1.96065573589528 | 332.711769713353 | 0.1934342854 | 32.82466280 |
| T10 | 144 | 2.99485832426726 | 1899.44512999892 | 0.1238921070 | 78.57675850 |
| T20 | 264 | 5.52493157555863 | 23264.7724583960 | 0.06514649783 | 274.3234785 |
| T50 | 624 | 13.0449905707837 | 757679.036954655 | 0.02684332597 | 1559.113842 |
| T100 | 1224 | 25.5516438079004 | 11363138.9776642 | 0.01355083578 | 6026.227957 |
| T200 | 2424 | 50.5541850632798 | 175882992.725135 | 0.006807321678 | 23683.34308 |

Each interval has opposite outward-rounded signs of $G$ at its endpoints and a fixed sign of $G'$ throughout the bracket. Continuity gives existence and the derivative sign gives a unique simple root there. The full reference uncertainty, including the old speed bracket, is included in both tests. Finite samples merely propose the witness locations; no finite sample supplies a no-growth verdict. The final proposal domain is $10^{-8}\Omega\leq z\leq10^6\Omega$.

Claim grade: computer-assisted derived witnesses and measured centers on the listed cells. Falsifier: a failed outward-rounded endpoint sign or zero-containing derivative contradicts existence or simplicity respectively. Neither the absence of further sampled sign changes nor confinement proves that there are only two growing modes.

## Tangential kick and noncancellation

For fixed circular past, $u(0)=0$ and a common tangential endpoint velocity kick $u'(0)=\delta v\,e_2$, the formal Laplace equation is

$$
A(z)\widehat u(z)=\delta v\,e_2,\qquad \widehat u(z)=\delta v\,\frac{\operatorname{adj}A(z)e_2}{\det A(z)}.
$$

The numerator is $(-A_{12},A_{11})^{\mathsf T}$. At a certified simple positive root, any nonzero numerator component prevents cancellation and gives a growing pole. In the new receipts both components are strictly nonzero on both T02 and T04 witness brackets. Representative containing bounds are

| Cell and witness | $-A_{12}$ containing interval | $A_{11}$ containing interval |
| --- | --- | --- |
| T02 slow | $(47.5565,47.5567)$ | $(-117.942,-117.941)$ |
| T02 fast | $(97.5614,97.5616)$ | $(23.3050,23.3052)$ |
| T04 slow | $(2030.60,2030.61)$ | $(-8905.41,-8905.39)$ |
| T04 fast | $(3532.18,3532.20)$ | $(812.77,812.79)$ |

Thus a small common tangential kick does not shift the exact solution along a continuous regular-ring ladder: its formal response contains growing components. No particular nonlinear fate or angular-momentum conservation law is supplied by this transfer calculation. A slow imposed torque has transform proportional to the same transfer column, but a chosen time profile can alter its pole weights; a universal slow-torque verdict would require specifying that profile.

Claim grade: derived transfer identity and computer-assisted derived noncancellation in the common sector on T02/T04; finite-amplitude nonlinear response remains unresolved. Falsifier: a compatible input whose transform vanishes at the claimed pole, a zero-containing numerator interval, or an incorrect initial-data Laplace equation overturns the corresponding statement. The abrupt kick should be regarded as a linear input idealization, not an already constructed nonlinear history.

## Full finite family and measured slow trend

The [complete hundred-rung table](ring-family-symmetric-stability-table-2026-10-03.md) records all 200 distinct simple positive real witnesses, the speed bracket widths, directed and self-hit counts, minimum transmitter-factor margins and scaled rates. The all-hundred target run completed with exit zero in 691.459 wall seconds under the owned-compute supervisor; its terminal lease records `processGroupClosed: true`. Every target passed its exact balance and complete-root prerequisite before spectral evaluation. The summary extractor first passed a known beta-two, roots-three-and-eight scaling control before reading the target receipts.


The witnessed slow growth increases roughly with $\beta$, while the witnessed fast growth increases roughly with $\beta^4$. The ratios should be tabulated across the complete finite ladder before inferring limiting constants. This finite trend does not establish a limit or stability/instability of every uncomputed rung. The fast-rate limit is proved conditionally below; the slow-rate limit remains open. Its finite ratio rises from 0.4706605861 at T02 to a maximum among the selected rows near T10, then falls to 0.4779985010 at T200. No exact limiting constant is claimed.

The root charts become more delicate at high speed because the newborn negative-$D$ and positive-$D$ pair approaches a fold. T200 still has a strictly positive transmitter-factor margin. A stronger growing mode does not mean an exact undisrupted ring ceases to exist; existence and nearby-history response are separate questions.

## Fast growth at large rung number

The fast common-sector growth has an analytical large-rung limit,

$$
\frac{\lambda_{\max}}{\beta^4}\longrightarrow\sqrt2,
$$

where $\lambda_{\max}$ is the largest positive real root of the common-sector characteristic determinant. This uses the accepted ladder asymptotics and applies to sufficiently high even rungs; it does not supply a finite speed threshold or a count of complex growing roots. The mechanism is the growing receiver-position derivative of the newly born opposite-polarity root pair. At the fast growth scale, delayed source variations become exponentially small while the receiver tensor retains an order-$\beta^8$ radial eigenvalue.

Let $q=t-1$ be the newborn odd level and $x_*=\arccos(1/\beta)$ the maximum of $F_\beta$. The accepted ladder gives $R=(3/2)\beta^{-1}(1+o(1))$ and $\beta-\beta_q=(18\beta_q^3)^{-1}+o(\beta_q^{-3})$. Since $dF_{\max}/d\beta=\sin x_*\to1$, the newborn level gap and root offsets satisfy

$$
\Delta=F_{\max}-q\pi/6=\frac{1+o(1)}{18\beta^3},\qquad x_\pm-x_*=\pm\frac{1+o(1)}{3\beta^2}.
$$

Thus $D_\pm=\pm(3\beta)^{-1}(1+o(1))$, $\ell_\pm=3\beta^{-1}(1+o(1))$, $n_\pm\to e_1$, and $w_\pm=-\beta^3(1+o(1))/3$. Write $k=(-\cos x,\sin x)$, the unit vector perpendicular to $n$. The exact circular identities are $v\cdot k=-\beta\sin x$ and $n\cdot a_s=\beta^2\sin x/R$. Substitution into the tensor derivation above gives the exact symmetric identity

$$
\frac T w=\frac{kk^{\mathsf T}}\ell+\frac{(v\cdot k)(kn^{\mathsf T}+nk^{\mathsf T})}{\ell D}-\frac{2nn^{\mathsf T}}{\ell D}-\frac{\beta^2\sin x}{2RD^2}nn^{\mathsf T}.
$$

For each newborn root, the first three terms after multiplication by $w$ have orders $O(\beta^4)$, $O(\beta^6)$ and $O(\beta^5)$ respectively. The last term gives $T/\beta^8\to e_1e_1^{\mathsf T}$. Both roots have the same leading tensor sign, although their $D$ signs differ. Their sum contributes $2\beta^8 e_1e_1^{\mathsf T}$ to leading order.

The older rows are uniformly smaller. Every rising old root has $\beta\sin x=x+m\pi/6\geq\pi/6$. For a descending root, with $y=\pi-x$, the identity is $\beta\sin x+y=(m+6)\pi/6\geq\pi/6$. If $y<\pi/12$, this gives $\beta\sin x\geq\pi/12$; if $y\geq\pi/12$, its descending position $x\geq x_*\geq\pi/3$ gives a constant positive sine floor. Hence all old roots have $\sin x\geq c/\beta$ for one $c>0$ at large $\beta$, and every delay has $\ell\geq c'\beta^{-2}$.

Each old level is at least $\pi/6$ below the maximum. If $|D|\geq\beta/4$, then $|D|\geq\sqrt\beta/2$ for $\beta\geq4$. Otherwise $x$ and the intervening path from $x_*$ lie in $[\pi/3,2\pi/3]$ for sufficiently large $\beta$, so $D'=\beta\sin x\geq\sqrt3\beta/2$. Integrating the level gap in $|D|$ gives

$$
\frac\pi6\leq F_{\max}-F_\beta(x)\leq\frac{D^2}{\sqrt3\beta}.
$$

This again implies $|D|\geq\sqrt\beta/2$. The sine and transmitter-factor floors give $|w|=O(\beta^{7/2})$. The exact tensor bracket is $O(\beta^{5/2})$, so each old $T$ is $O(\beta^6)$. There are $O(\beta)$ older rows; their total is $O(\beta^7)=o(\beta^8)$. Therefore

$$
\frac{\sum C}{\beta^8}\longrightarrow2e_1e_1^{\mathsf T}.
$$

The same bounds give an old $U=O(\beta^3)$ per row and a newborn $U=O(\beta^4)$ per row. Thus $\sum\|H\|=O(\beta^4)$ and $\sum\|F\|=O(\beta^8)$, using $\Omega=O(\beta^2)$ and $F=-TB+\Omega UBJ$. The delays' common $c'\beta^{-2}$ floor suppresses every delayed coefficient at $z=\eta\beta^4$ by $e^{-c'\eta\beta^2}$. Uniformly on any compact positive interval of $\eta$,

$$
\frac{A(\eta\beta^4)}{\beta^8}\longrightarrow\eta^2I-2e_1e_1^{\mathsf T},\qquad\frac{\det A(\eta\beta^4)}{\beta^{16}}\longrightarrow f(\eta)=\eta^2(\eta^2-2).
$$

Differentiation in $\eta$ introduces only polynomial factors in $\beta$, still suppressed by that exponential, so the determinant convergence also holds for its first derivative. The limiting root at $\eta=\sqrt2$ has $f'(\sqrt2)=4\sqrt2>0$. For every sufficiently small positive $\varepsilon$, opposite endpoint signs and a positive derivative persist on $[\sqrt2-\varepsilon,\sqrt2+\varepsilon]$ for all sufficiently high rungs. There is a unique simple positive real root there, whose scaled value tends to $\sqrt2$.

The induced-norm confinement is $O(\beta^4)$ because $B_1=O(\beta^4)$ and $B_0=O(\beta^8)$. Hence all positive real roots lie below $C\beta^4$ for one finite $C$. Uniform determinant convergence excludes a root on $[\sqrt2+\varepsilon,C]$ for sufficiently large $\beta$. The fast root is then the largest positive real root, proving the stated limit. This argument establishes no uniform finite-rung bound and leaves the slower-root limit unresolved.

Claim grade: derived asymptotic theorem conditional on the accepted ladder's radius and odd-fold displacement asymptotics; a separately constructed adjudication remains required for independent checking. Falsifier: a failed accepted fold asymptotic, exact tensor identity, old-root sine or signed-factor bound, delay floor, first-derivative suppression or confinement order overturns the corresponding step. The measured ratios $\lambda_{\mathrm{fast}}/\beta^4$ rise from about 0.957811 at T02 to 1.405729 at T200, consistent with $\sqrt2\approx1.414214$, without themselves proving the limit.

## Spectral confinement and nonlinear boundary

For $\Re z\geq0$, every delay factor obeys $|e^{-z\ell}|\leq1$. Taking the induced infinity norm yields at a determinant zero

$$
|z|^2\leq B_1|z|+B_0,
$$

with $B_1=2\Omega+\sum\|H\|_\infty$ and $B_0=\Omega^2+\|\sum C\|_\infty+\sum\|F\|_\infty$. The instrument rounds each bound upward to integers and retains a strict larger-radius certificate. At T200 its enclosing radius is 404857303. This establishes a finite region containing every right-half-plane determinant zero, not their count.

The accepted T02 nonlinear theorem chooses the largest positive real root and constructs a convergent ancient nonlinear path on the persistent root chart. Every successfully certified finite rung has the same structural prerequisites: a finite complete simple census, positive delay floors, exact balance, a positive real witness and finite confinement. Applying that construction to a new rung requires a separately checked extension with its own recent-self, partner, complement and remote margins. No direct nonlinear claim is made from merely reusing the T02 text.

## Instrument, receipts and validation

The new durable instrument is [ring_family_symmetric_stability_20261003.py](../../../../../scripts/braid-program/ring_family_symmetric_stability_20261003.py). Its `--stage known`, `--stage controls` and `--stage target --rungs ...` commands use the shared venv. Receipts store exact mpmath binary interval endpoints as `(sign, mantissa, exponent, bitcount)` by JSON path; decimal displays are rounded diagnostics. The arithmetic is mpmath 1.3.0 outward-rounded interval arithmetic at 85 decimal digits, with 100-decimal point proposals.

Status: all hundred finite targets complete; family witnesses and fast-rate asymptotic treatment frozen for separately constructed adjudication. The completed supervised run used a 1200-second deadline and a 15-second heartbeat. No original oracle, evaluator, production solver, shared tracker, manuscript, index, rank, score or qualification method is changed by this worker. The coordinator owns integration after review.

Scientific validation: `--stage known`, then `--stage controls`, then the selected targets and all hundred targets returned exit zero under the verified shared venv. The known and control receipt gates match the frozen instrument identity. The summary requires exactly two simple, noncancelling positive real witnesses per rung; this validates its finite table coverage, not an exact total spectrum count. Shared-venv `-m py_compile` accepted the new script. `git diff --no-index --check /dev/null` emitted no whitespace diagnostics for the instrument and analysis; exit one denotes new-file differences. The frozen old evaluator, scalar oracle and receipts remain unedited.
