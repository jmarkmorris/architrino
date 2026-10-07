# Independent explicit slow-speed exclusion review

## Scope and known-first record

This review independently reconstructs the uniform continuous exclusion in [the frozen explicit slow-speed subject](overnight2-b-explicit-slow-exclusion.md). The canonical equation remains $K=c_f=1$, with all ordinary positive partner and self roots. The claim concerns the stated Fourier coefficient box, arbitrary $R>0$, and $0<\epsilon\le1/20000$. The parent researcher owns the main second-allocation synthesis. The subject, prior subjects, prior oracles and shared owners remain read-only.

The new [independent rational instrument](overnight2-b-independent-explicit-slow.py) uses only Python standard-library modules and imports no research implementation. Before target use, its known stage passed at 2026-10-07 03:50:07 UTC using the executable shared venv with the three numerical-thread environment variables set to one. Its exact controls are the velocity $(0,1/2,0)$ and acceleration magnitude components $(1/4,0,0)$ for a radius-one half-speed circle; the separately hand-computed remainder terms $1/2+3+1/2+1=5$ at its declared simple input; and the coefficient values $C_0(0)=19/12$, $C_0(1)=-373/600$. The command exited zero and left its original receipt at `.local-data/master-equation-closure/overnight2-b/independent-explicit-slow/known.json`.

The independent instrument identity is `98c03407927d18911b14b916b43404fd69b17c7ccab81d4386a18e1490f9209a`. The frozen subject instrument identity was verified by `shasum -a 256` as `33982d3c779b8548c613b687d938f8107413e90ec332f0bf71aa540a1a8d47a5`; it was not imported. The subject's retained failed known expectation is not used as an oracle. This known pass is recorded before target arithmetic.

## Accepted result

Claim grade: independently reconstructed derivation with exact-rational arithmetic verification. The entire stated family is excluded from exact canonical acceleration balance for every $R>0$ and $0<\epsilon\le1/20000$. The independent four-term bounds below prove the slightly stronger inequality

$$
\langle\rho A_t\rangle>\frac{43}{20000}\epsilon
>\frac{97}{50000}\epsilon>0.
$$

Here $A_t/R^2$ is the tangential physical acceleration supplied by the complete canonical root sum, and the brackets average over one deformation phase cycle. Exact balance requires that average, weighted by the instantaneous dimensionless radius $\rho$, to vanish. The positive inequality therefore excludes full vector balance without any stability calculation. It does not exclude larger slow parameters, other coefficient boxes or arbitrary spatial profiles.

No mathematical repair to the new explicit subject is required. Its proof uses only two trajectory derivatives and supplies the needed rigorous route around the earlier unquantified subject's second-parameter-derivative qualification. The earlier frozen qualification remains part of its own review record. The subject's known-control transcription correction has no effect on this independent derivation.

## Profile and complete-root bounds reconstructed from the paths

The complete six paths are

$$
X_j(t)=R\big(\rho(\phi)\cos\theta_j,\rho(\phi)\sin\theta_j,(-1)^j\zeta(\phi)\big),\quad
\theta_j=\epsilon b_0t/R+j\pi/3+p(\phi),\quad \phi=\epsilon k_0t/R,
$$

where $b_0=1/4$, $k_0=3/20$, and

$$
\rho=1+a\cos2\phi+b\sin2\phi,\quad p=c\cos2\phi+d\sin2\phi,\quad
\zeta=H\cos\phi+e\cos3\phi+f\sin3\phi.
$$

Each coefficient varies independently with $|a|,|b|\le3/50$, $|c|,|d|\le1/10$, $|e|,|f|\le1/50$ and $H\in[1/4,3/10]$. Prime denotes differentiation with respect to $\phi$. Direct differentiation and triangle inequalities give

$$
\frac{22}{25}\le\rho\le\frac{28}{25},\quad
|\rho'|\le\frac6{25},\quad |\rho''|\le\frac{12}{25},\quad
|p'|\le\frac25,\quad |p''|\le\frac45,
$$

$$
|\zeta|\le\frac{17}{50},\quad |\zeta'|\le\frac{21}{50},\quad
|\zeta''|\le\frac{33}{50},\qquad
\frac{19}{100}\le\omega=b_0+k_0p'\le\frac{31}{100}.
$$

Write $x_j=X_j/R$ and $\tau=t/R$. The physical velocity equals $\partial_\tau x_j$, whose cylindrical components divided by $\epsilon$ are $(k_0\rho',\rho\omega,(-1)^jk_0\zeta')$. Their absolute bounds are

$$
\left(\frac9{250},\frac{217}{625},\frac{63}{1000}\right)
=(0.036,0.3472,0.063).
$$

The derivative of that velocity with respect to $\tau$, divided by $\epsilon^2$, has cylindrical components

$$
\big(k_0^2\rho''-\rho\omega^2,\quad
2k_0\rho'\omega+\rho k_0^2p'',\quad (-1)^jk_0^2\zeta''\big).
$$

Their absolute bounds, reconstructed from the profile bounds rather than supplied decimal inputs, are

$$
\left(\frac{3701}{31250},\frac{531}{12500},\frac{297}{20000}\right)
=(0.118432,0.04248,0.01485).
$$

The respective squared sums are strictly below $(2/5)^2$ and $(1/4)^2$. Thus the valid common constants are $B=2/5$ for velocity divided by $\epsilon$ and $C=1/4$ for its $\tau$ derivative divided by $\epsilon^2$. These are derivative bounds on prescribed histories; acceleration balance has not been assumed.

For the entire auxiliary interval $0\le\epsilon\le\bar\epsilon=1/100$, speed is at most $q=\bar\epsilon B=1/250<1$. For distinct members the present separation is at least $m=22/25$, and every dimensionless path lies in the ball of squared radius at most

$$
\left(\frac{28}{25}\right)^2+\left(\frac{17}{50}\right)^2=\frac{137}{100}.
$$

The gap $g(\delta)=|x_i(\tau)-x_j(\tau-\delta)|-\delta$ decreases by at least $(1-q)$ times an increase in delay, is positive at zero and negative for delays greater than the enclosing diameter. Hence each of the five partner channels has exactly one root over the entire past. Every root has $\delta<d_*=12/5$, since $4(137/100)<(12/5)^2$. At a root the source-side divisor is $D=1-\widehat Q\cdot V_s\ge1-q>0$. The self gap is strictly negative for every positive delay because its source displacement is at most $q\delta<\delta$. Thus there is no positive self root to add, and no omitted source complement. The same geometric argument applies to every receiver.

For simultaneous and delayed separation vectors $Q_0,Q$, the velocity bound gives $|Q-Q_0|\le\epsilon B\delta\le\bar\epsilon Bd_*$. Every point on the straight segment joining them therefore has norm at least

$$
m-\bar\epsilon Bd_*=0.8704>\ell=87/100.
$$

This segment estimate is what licenses the ordinary spatial Taylor derivatives below; it is not a sampled condition.

## Independent explicit row-remainder derivation

For one partner fix $s=|Q_0|$, $n=Q_0/s$, and simultaneous source velocity $\epsilon V_1$, with $|V_1|\le B$. Integrating its bounded acceleration along the source segment gives

$$
|Q-Q_0-\epsilon\delta V_1|\le\tfrac12\epsilon^2Cd_*^2,\qquad
|V_s-\epsilon V_1|\le\epsilon^2Cd_*.
$$

Since $|\delta-s|\le|Q-Q_0|\le\epsilon Bd_*$, the first estimate implies

$$
|Q-Q_0-\epsilon sV_1|\le\epsilon^2E,\qquad
E=B^2d_*+\tfrac12Cd_*^2.
$$

For $G(Q)=Q/|Q|^3$, its derivative has eigenvalues $-2/|Q|^3$ in the radial direction and $1/|Q|^3$ in perpendicular directions, so $\|DG(Q)\|\le2/|Q|^3$. Its second derivative applied to unit vectors $u,v$ is

$$
D^2G(Q)[u,v]
=-\frac3{|Q|^5}\{u(Q\cdot v)+v(Q\cdot u)+Q(u\cdot v)\}
+\frac{15Q(Q\cdot u)(Q\cdot v)}{|Q|^7}.
$$

The four displayed terms have total norm at most $24/|Q|^4$. Taylor's formula on the separation segment therefore bounds the error after the linear term $\epsilon DG(Q_0)sV_1$ by

$$
\epsilon^2\left(\frac{2E}{m^3}+\frac{12B^2d_*^2}{\ell^4}\right).
$$

Let $w=\widehat Q\cdot V_s$ and $w_1=n\cdot V_1$. The inequality $|\widehat Q-n|\le2|Q-Q_0|/s$ and the velocity estimate imply

$$
|w-\epsilon w_1|\le\epsilon^2J,\qquad
J=Cd_*+\frac{2B^2d_*}{m}.
$$

Because $|w|\le\epsilon B\le q$, the exact algebra $w/(1-w)=w+w^2/(1-w)$ gives

$$
\left|\frac{w}{1-w}-\epsilon w_1\right|
\le\epsilon^2\left(J+\frac{B^2}{1-q}\right).
$$

Decompose $G(Q)/(1-w)$ as $G(Q)+G(Q)w/(1-w)$. The product error after its linear term $\epsilon G(Q_0)w_1$ is at most

$$
\epsilon^2\left(\frac{2B^2d_*}{\ell^3}
+\frac{J+B^2/(1-q)}{\ell^2}\right),
$$

using $|G(Q)|\le\ell^{-2}$, $|G(Q)-G(Q_0)|\le2\epsilon Bd_*/\ell^3$ and $|w_1|\le B$. Combining the two linear terms gives $(V_1-2n(n\cdot V_1))/s^2$, exactly the canonical first-order row. At a root $|Q|=\delta$ and $D=1-w$, so the complete row error is at most $\epsilon^2$ times the sum of the following four positive terms. The separate ceilings are deliberately simple rationals.

| Error source | Exact value under this box | Strict independent ceiling |
| --- | --- | --- |
| Position linearization error $2E/m^3$ | $8625/2662$ | $13/4$ |
| Spatial quadratic remainder $12B^2d_*^2/\ell^4$ | $40960000/2121843$ | $39/2$ |
| Linear-product remainder $2B^2d_*/\ell^3$ | $256000/219501$ | $5/4$ |
| Divisor-product remainder $[J+B^2/(1-q)]/\ell^2$ | $44738000/20731491$ | $9/4$ |

The target rational instrument verifies each strict comparison by exact fractions. Their ceilings sum to $105/4<27$. This independent termwise comparison proves the subject's claimed row constant without relying on its combined fraction. Only two trajectory derivatives were used; no second slow-parameter derivative of delayed velocity is assumed.

## All five rows, mean margin and positional closure

For source angle $\alpha=j\pi/3$ and polarity $\sigma=(-1)^j$, the simultaneous separation is $(\rho(1-\cos\alpha),-\rho\sin\alpha,(1-\sigma)\zeta)$. Its zeroth-order tangential row cancels with source $6-j$. In the first-order row, radial and vertical source-velocity contributions are odd in $\sin\alpha$ and cancel by the same pairing; both vanish individually for the diametric source. The rotational part leaves $\sigma\omega[\rho^2\cos\alpha/s^2-2\rho^4\sin^2\alpha/s^4]$ after multiplication by $\rho$. The two opposite-polarity neighbors, two same-polarity partners and diametric opposite-polarity source contribute respectively

$$
\omega\frac{2-4h^2}{(1+4h^2)^2},\qquad
-\frac23\omega,\qquad \frac{\omega}{4(1+h^2)},\quad h=\zeta/\rho.
$$

This accounts for all five channels, with polarities of magnitude one. Define their combined coefficient $C_0(h)$ as the sum of the three displayed factors without $\omega$. The full tangential expansion is therefore $\rho A_t=\epsilon\omega C_0(h)+\mathcal R$. The independent row ceiling and $\rho\le28/25$ give the uniform estimate

$$
|\mathcal R|<5\frac{28}{25}\frac{105}{4}\epsilon^2=147\epsilon^2.
$$

This pointwise bound also bounds the absolute averaged remainder. Everywhere in the coefficient box, $|h|\le17/44<2/5$. Independent differentiation gives

$$
C_0'(h)=-\frac{8h(5-4h^2)}{(1+4h^2)^3}-\frac{h}{2(1+h^2)^2}<0
\quad(0<h\le2/5).
$$

Evenness, strict decrease and exact evaluation $C_0(2/5)=31883/584988>1/20$ give $C_0(h)>1/20$. Together with $\omega\ge19/100$, this yields the leading mean $M=\langle\omega C_0(h)\rangle>19/2000$. Thus for $0<\epsilon\le1/20000$,

$$
\langle\rho A_t\rangle
>\epsilon\left(\frac{19}{2000}-147\epsilon\right)
\ge\frac{43}{20000}\epsilon
>\frac{97}{50000}\epsilon.
$$

The exact tangential demand satisfies $\rho L_t=\epsilon^2k_0[\rho^2(b_0+k_0p')]'$. Its phase average is zero, and $RL=A$ would require $\langle\rho A_t\rangle=0$. The strict positive bound contradicts that equation at every $R>0$. A single such component obstruction suffices to reject full balance; no spectrum of an imbalanced profile is computed.

The deformation period is $P=2\pi R/(\epsilon k_0)$. In one period the common planar angle advances by $2\pi b_0/k_0=10\pi/3$. After three periods it advances by $10\pi$, while every profile returns, so all six labeled positions and their derivatives close. Thus these selected histories are genuinely periodic after three deformation cycles; three cycles need not be asserted to be a minimal period. The mean identity already holds over one deformation cycle. The height changes sign because $\zeta(0)\ge23/100$ and $\zeta(\pi)\le-23/100$. At those phases the two noncollinear alternating triangles lie in distinct planes. The theorem concerns spatial finite-height histories even though the sign-changing height passes through planar configurations.

## Arithmetic receipts, validation and remaining obligations

After the known pass was recorded, the independent target exited zero at 2026-10-07 03:50:25 UTC. It checked the profile-derived velocity and acceleration bounds, complete-chart constants, all four remainder ceilings, the leading mean floor, the final positive margin and the three-cycle rate identity. Its measured internal wall time was approximately 0.000212 seconds by `time.perf_counter()`; the known stage measured approximately 0.000184 seconds. Both were synchronous short commands, and this reviewer left no detached computation.

| Item | SHA-256 by `shasum -a 256` |
| --- | --- |
| Frozen subject Markdown | `24b3f976a518b25038e13838b9bb6869d13608297573e758bcc17ece9c373c35` |
| Frozen subject instrument | `33982d3c779b8548c613b687d938f8107413e90ec332f0bf71aa540a1a8d47a5` |
| Independent instrument | `98c03407927d18911b14b916b43404fd69b17c7ccab81d4386a18e1490f9209a` |
| Independent `known.json` | `6f243e9b2332d9b56aba2d0d6383d0efdc71c588e89ffc13e1c7c9d594cca4d4` |
| Independent `target.json` | `6018d19ca9fdaf3372293f7ebe8e0a18ab97342650486d498f55104a0a75b6b3` |

The subject source was read after this review's independent target arithmetic; no functions were imported or reused. Its decimal trajectory inputs agree with the separately derived component bounds above, and its corrected known value $7/4$ agrees with direct substitution. The original failed known expectation remains documented by the subject; this review did not change or erase it.

Original independent receipts remain under `.local-data/master-equation-closure/overnight2-b/independent-explicit-slow/`, while this self-contained proof and its small reproducer are the only new authored files. They are accepted local retained evidence under the [preservation owner](../../../../op/machine-artifact-retention.md#preservation-from-creation-through-closeout), not a claimed remote backup. No replay has been run; available commands and measured first-run cost do not establish historical-byte recovery. The timestamp and runtime fields would differ in a replay. Preserve all originals and use fresh output names:

```bash
OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 MKL_NUM_THREADS=1 "${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/analysis/overnight2-b-independent-explicit-slow.py --stage known --output .local-data/master-equation-closure/overnight2-b/independent-explicit-slow/replay-known.json
# Inspect and record the known pass before the target.
OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 MKL_NUM_THREADS=1 "${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/analysis/overnight2-b-independent-explicit-slow.py --stage target --output .local-data/master-equation-closure/overnight2-b/independent-explicit-slow/replay-target.json
```

The theorem is falsified by an in-box trajectory derivative exceeding a displayed bound, a missing or additional causal root under the complete-history premises, a row remainder exceeding its bound, a surviving omitted tangential contribution, or an exact balanced member in the declared coefficient/speed interval. Any such counterexample should be checked against the profile derivatives, all-past gap and explicit row estimates above. A failed estimate outside this box does not imply an obstruction there. The present result leaves faster profiles, wider heights and general coupled waveforms open.

The parent owns integration of the accepted exclusion and its stronger independent margin into the current second-allocation account. No scientific repair or blocking condition remains for this bounded review. The broader research allocation continues after this reviewer stops.

Scoped validation: the shared-venv Python built-in `compile` accepted the independent source without producing a bytecode artifact. Native `git diff --no-index --check /dev/null` emitted no whitespace diagnostics for each new reviewer-owned file. Native `wc -lc` measured 12 lines and 374 bytes for the known receipt and 54 lines and 1,398 bytes for the target receipt; native `shasum -a 256` verified both intact payloads and both frozen subject identities at handoff. No regular tests, generator writes, Git mutations or recursive reviewers were introduced. The new authored scope is exactly `overnight2-b-independent-explicit-slow.md` and `overnight2-b-independent-explicit-slow.py`, with the two local evidence receipts above.
