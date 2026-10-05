# Alternating rings under the authorized logarithmic variation

The inverse-distance variation does not inherit the baseline ring's radius-selection mechanism. Its coupling has squared-speed units, and the radius cancels from both circular balance conditions. A tangential zero would select a required coupling; at that coupling every positive radius would give an exact circle at the same speed, with frequency inversely proportional to radius. A fixed finite coupling cannot support an unbounded sequence of alternating six-ring speeds. The proof below uses the complete ordinary-root census and excludes that possibility without a numerical fit.

No exact first logarithmic ring has been exhibited here, so no stability spectrum is evaluated. A finite diagnostic of the circular tangential coefficient is a search for balances, not a linearization about the baseline rings. The baseline exact ladder and its stability results remain separate. The derived logarithmic obstruction awaits separately constructed adjudication before being called independently checked.

## Selected equation, coupling dimensions and exact balance conditions

The [shared logarithmic definition](../../equation-variants/logarithmic-potential/README.md) and its [equation owner](../../equation-variants/logarithmic-potential/manuscript.md#after-the-proposed-logarithmic-potential-equation) authorize research on the inverse-distance replacement. On every simple positive-delay hit the selected acceleration is

$$
\mathbf A_{ij}=\sigma_{ij}K_{\log}\frac{c_f}{|D_t|}\frac{\mathbf n}{\ell},
\qquad D_t=c_f-\mathbf n\cdot\mathbf V_j.
$$

All positive-delay self hits are retained and only the zero-delay self endpoint is excluded. No ceiling, receiver multiplier, self suppression or event prescription is selected. The coupling $K_{\log}=\kappa_{\log}|q_iq_j|$ has dimensions $L^2/T^2$. It is not the baseline inverse-square coupling $K$, whose dimensions are $L^3/T^2$. The dimensionless coupling is $k=K_{\log}/c_f^2>0$; all numerical evaluations use $c_f=1$. A unit-coupling comparison means $k=1$ and does not transplant the baseline length unit $K/c_f^2$. Radius is an independently declared length.

For six regular co-rotating members, $q_j=(-1)^j$, $\alpha_j=j\pi/3$, $v=c_f\beta$ and $\Omega=v/R$. The causal geometry is unchanged. With $c_f=1$, its complete roots solve

$$
\beta\sin x-x=m\pi/6,\qquad 0<x<\pi,
\qquad \ell=2R\sin x,\quad D=1-\beta\cos x,
\quad \sigma=(-1)^m.
$$

The emission-to-reception direction in the receiver's radial/tangential basis is $(\sin x,\cos x)$. Thus the full radial and tangential acceleration coefficients are

$$
A_r=\frac{K_{\log}}R C_r(\beta),\qquad
A_t=\frac{K_{\log}}R C_t(\beta),
$$

$$
C_r=\frac12\sum_m\frac{(-1)^m}{|D_m|},
\qquad
C_t=\frac12\sum_m\frac{(-1)^m\cot x_m}{|D_m|}.
$$

These are inverse-distance coefficients. The baseline sums with extra powers of $\sin x$ cannot be reused as logarithmic balance functions. Exact circular balance requires

$$
\boxed{C_t(\beta)=0},\qquad
\boxed{\beta^2=-kC_r(\beta)}.
$$

Radius cancels. If $C_t(\beta_0)=0$ and $C_r(\beta_0)<0$, the only compatible coupling is $k_0=-\beta_0^2/C_r(\beta_0)$. At that coupling every $R>0$ has frequency $\Omega=c_f\beta_0/R$ and period $2\pi R/(c_f\beta_0)$, and rotation covariance extends complete one-phase balance to an exact periodic history. This conditional family is continuous in radius and frequency. Changing $k$ to repair radial balance changes the chosen coupling, rather than moving between solutions of one fixed model. The scalar logarithm's arbitrary reference radius does not tune either equation.

Grade: derived conditional balance and scaling statements. Falsifier: a complete simple-root logarithmic residual with a different radius power, an exact circle violating either boxed condition, or a scalar reference shift changing acceleration defeats its corresponding statement.

## Complete census and the small-speed obstruction

Let $M(\beta)=\max_{0<x<\pi}(\beta\sin x-x)$ and $h=\pi/6$. For $\beta>1$, $x_*=\arccos(1/\beta)$ is its maximizer. In the cell $qh<M<(q+1)h$, descending roots occur for $m=-5,\ldots,0$ and both roots occur for every $m=1,\ldots,q$. Strict concavity proves completeness; the same-transmitter source levels are multiples of six. The unchanged root geometry licenses this census for a prescribed logarithmic circle, not the baseline balance speeds.

At $\beta=0$ there are five partner roots $x_m=-m\pi/6$, $m=-5,\ldots,-1$, and no positive-delay self root. They give $C_r(0)=-1/2$ and $C_t(0)=0$. The static configuration is not an equilibrium at positive coupling, because its received radial acceleration is nonzero.

For $2N$ regular alternating members the same static calculation gives $C_r(0)=-1/2$. Differentiating the complete sub-wake partner roots at zero gives $dx/d\beta=\sin x$, $D'=-\cos x$, and

$$
\left.\frac{d}{d\beta}\frac{\cot x}{D}\right|_{\beta=0}=-\sin x.
$$

The finite alternating sine sum is $\sum_{j=1}^{2N-1}(-1)^j\sin(j\pi/(2N))=-\tan(\pi/(4N))$. Consequently

$$
C_t(\beta)=\frac12\tan\left(\frac{\pi}{4N}\right)\beta+O(\beta^2).
$$

The coefficient is strictly positive for every finite inventory. In the six-member case it is $(2-\sqrt3)/2$. Thus sufficiently slow rotating alternating logarithmic circles have a positive tangential residual and cannot be exact circles, whatever radius or positive coupling is chosen. This is a local small-speed statement, not a sign theorem on the whole sub-wake interval. It agrees with the separately owned [binary inverse-distance circular expansion](../../binary-research/analysis/logarithmic-first-order-circle-response.md) when $N=1$.

Grade: derived finite-inventory low-speed expansion. Falsifier: a complete independently differentiated partner-root sum with a different linear coefficient, or arbitrarily small positive speeds with zero tangential residual at fixed finite inventory, defeats it. A large-$N$ limit with speed simultaneously changing is outside this fixed-inventory expansion.

## No unbounded speed ladder at fixed logarithmic coupling

This theorem concerns the six-member regular alternating ordinary-root chart at any fixed finite $k>0$. Assume for contradiction that exact circle speeds tend to infinity. At each speed let $q$ be the newest integer root level and set $\delta=M(\beta)-qh\in(0,h)$. Separate the two newest roots from all older roots. Fold speeds themselves have $D=0$ and are outside this ordinary-root theorem.

Every old root is at least $h$ below the maximum. The uniform estimate reconstructed in the [fast-limit adjudication](ring-frequency-and-fast-limit-independent-adjudication-2026-10-03.md#5-newest-pair-dominance-and-uniformly-smaller-old-roots) applies independently of a baseline balance: for sufficiently large $\beta$, every old root has $|D|\ge c\sqrt\beta$ with one positive constant. There are $O(\beta)$ old roots, so

$$
|C_r^{\mathrm{old}}|=O(\sqrt\beta).
$$

The tangential bound can be sharper than a per-row sine-floor estimate. Since $\beta\cos x=1-D$,

$$
\frac{|\cot x|}{|D|}
\le\frac{1+1/|D|}{\beta\sin x}
\le\frac{C}{\beta\sin x}
$$

for all old rows. For a rising root at positive level $m$, its equation gives $\beta\sin x=x+mh\ge mh$, so summing its bound is at most a constant times the harmonic sum $\sum_{m\le q}1/m=O(\log\beta)$.

For a descending root write $y=\pi-x$ and $l=m+6\ge1$. Then $\beta\sin x+y=lh$. If $y\le lh/2$, the same bound is at most $2/(lh)$. If $y>lh/2$, then $lh<2\pi$, so only finitely many indices $l<12$ qualify. For those indices $x\ge x_*\ge\pi/3$ and $y>h/2$ place $x$ in a fixed interval away from both sine zeros. Their total contribution is $O(\beta^{-1})$. Thus the complete older tangential sum satisfies

$$
|C_t^{\mathrm{old}}|=O(\log\beta).
$$

The bounds are uniform throughout every high ordinary cell, including arbitrarily close to its left fold. They do not assume fixed source level while $\beta$ grows.

If $q$ is even, both newest radial terms are positive. They cannot produce $C_r=-\beta^2/k$ against an older contribution only $O(\sqrt\beta)$. Therefore any sufficiently high exact circle must have odd $q$. In that case write

$$
C_r^{\mathrm{new}}=-L,\qquad
L=\frac12\left(\frac1{|D_-|}+\frac1{|D_+|}\right)>0.
$$

Radial balance forces $L=\beta^2/k+O(\sqrt\beta)$. At least one newest factor must therefore satisfy $|D|=O(\beta^{-2})$. Such a factor puts its root within $O(\beta^{-3})$ of $x_*$, since $D'=\beta\sin x\asymp\beta$ near the maximizer. Integrating the gap gives $\delta=O(\beta^{-5})$. The opposite newborn root of the same strictly concave level also lies within $O(\beta^{-3})$ of $x_*$ and has $|D|=O(\beta^{-2})$. To justify the opposite-root statement uniformly, first use the small gap to confine both roots to a fixed central interval, then integrate the bounds $c\beta\le D'\le\beta$ there; they give $|x_\pm-x_*|\asymp\sqrt{\delta/\beta}$.

Both roots consequently obey

$$
\cot x_\pm=\cot x_*+O(\beta^{-3})
=\frac1\beta+O(\beta^{-3}).
$$

Weighted by their positive inverse factors, their tangential contribution is

$$
C_t^{\mathrm{new}}
=-\frac L\beta+O(L\beta^{-3})
=-\frac\beta k+O(\beta^{-1/2}).
$$

It cannot cancel the complete older contribution $O(\log\beta)$. This contradicts $C_t=0$. Therefore every fixed positive logarithmic coupling has a finite upper speed bound for these exact regular alternating circles. An unbounded speed ladder at fixed coupling is impossible. The proof supplies no numerical threshold and no count of the finite-speed balances below it. It does not exclude different circles at different couplings, nor general deformed, breathing or nonplanar assemblies.

Grade: derived conditional fixed-coupling obstruction, awaiting separate adjudication. Falsifier: an unbounded fixed-$k$ sequence of complete simple-root exact regular circles, an old-root family violating the uniform estimates, or failure of the newest-pair gap confinement defeats the theorem. A finite-speed solution, if found, is consistent with it.

## Numerical diagnostic and stability boundary

The new [logarithmic ring instrument](../../../../../scripts/braid-program/ring_logarithmic_variation_20261003.py) is separate from every baseline evaluator and production solver. Its known analytical controls use a stationary inverse-distance source at separation 2, the exact static hexagon coefficients, and the independently specified root $\beta=2\pi/3,m=1,x=\pi/2$ on the descending branch. Controls must pass and be recorded with its current source identity before target use.

The target diagnostic independently reconstructs the complete six-ring census in each declared cell and searches for a tangential zero. A discovered zero would be bracketed with outward interval endpoint signs, a nonzero interval derivative and a negative radial coefficient before any exact coupling is declared. Representative point signs are evaluated with complete outward root and transmitter-factor enclosures. A finite zero search or a point-sign table does not exclude an unsampled zero; it cannot establish complete cell counts.

The source-identity-gated final run passed its known controls before the target and found no candidate in its finite T01–T20 searches. It separately certified 60 representative signs: at fractions $10^{-6}$, $1/2$ and $1-10^{-6}$ through each ordinary cell, every odd-cell point has positive $C_t$ and every even-cell point has negative $C_t$. Five additional sub-wake or wake-speed points $\beta=0.01,0.1,0.5,0.9,1$ have positive outward-certified $C_t$ with the complete 30-hit partner census. These are computer-assisted derived point-sign witnesses, not continuous-domain exclusions. The receipt's `passed` field means that the diagnostic and its controls completed; it does not mean a logarithmic ring balanced.

A known-controlled wrapper evaluated the logarithmic coefficient over the inherited exact baseline speed brackets, retaining their full uncertainty and complete 48-, 72- and 96-hit censuses. The widened enclosures below show that the baseline T02, T04 and T06 speeds cannot be logarithmic circle speeds at any positive coupling or radius:

| Baseline speed bracket | Outward-widened logarithmic $C_t$ enclosure | Consequence |
| --- | --- | --- |
| T02 | $[-2.732306,-2.732305]$ | nonzero tangential logarithmic residual |
| T04 | $[-2.867914,-2.867913]$ | nonzero tangential logarithmic residual |
| T06 | $[-2.924055,-2.924054]$ | nonzero tangential logarithmic residual |

The wrapper checked the exact static-ring control before reading the frozen baseline receipt, whose SHA-256 is `fd83e4ea68aace450fc945e410182177c048be05a592608a865e14bc93e463af`. It imports only this new logarithmic instrument, not the baseline root oracle or acceleration implementation. Receipt: `.local-data/ring-exploration/logarithmic/baseline-residual.json`; wrapper and its known receipt: `.tmp/ring-logarithmic/baseline_residual.py` and `.local-data/ring-exploration/logarithmic/baseline-wrapper-known.json`. The durable instrument's `enclosure(beta_lo,beta_hi,topology)` reconstructs every row used in these witnesses. A changed authoritative binary sign or missing admitted root defeats the corresponding row; these calculations supply no stability verdict about an unbalanced geometry.

At unit coupling, a tangential zero would still have to pass the independent radial condition $\beta^2+C_r=0$. No radius adjustment repairs that condition. Because no exact logarithmic reference is established in this record, the common planar characteristic equation is not evaluated and no first-ring stability verdict is made. The appropriate next mathematical question is a continuous-domain tangential-zero census, followed by its required-coupling compatibility, rather than transplanting the baseline first rung.

Numerical reproduction uses the shared venv and $c_f=1$ only:

```sh
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_logarithmic_variation_20261003.py --stage known
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_logarithmic_variation_20261003.py --stage balance
```

The known and balance receipts belong under `.local-data/ring-exploration/logarithmic/`. Every sign witness retains its authoritative binary interval endpoints. The known-control syntax validator `node .tmp/ring-logarithmic/validate.mjs` passed before target use, then rendered the document's mathematics, resolved every local link and checked the current known-control instrument identity. `git diff --no-index --check /dev/null` produced no whitespace diagnostics for either new tracked file. These are measured syntax and preservation checks, separate from mathematical adjudication. No scientific result is inferred from solver silence, no baseline balance certificate is altered, and no shared index or queue is edited by this specialist. The coordinator owns integration and independent adjudication.
