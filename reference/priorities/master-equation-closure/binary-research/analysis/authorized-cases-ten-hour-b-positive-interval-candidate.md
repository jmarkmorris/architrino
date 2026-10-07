# An explicit positive-speed interval in the original gradient family

**Derived candidate, awaiting independent assessment.** This follows the [bounded plan](authorized-cases-ten-hour-b-positive-interval-plan.md), whose parameter interval was selected before the estimates below. It retains exactly the original complete degree-five preparation family, its fixed cutoff and compatible jet branch, the regular amplitude-gradient row, $K=c_f=1$, and every admitted causal root. No numerical target or new physical history construction is used.

Let $e_0=2^{-200000}$ and $\eta=2^{-2200000}$. The proposed conclusion is that every member with

$$
e_0(1-\eta)\le\epsilon\le e_0
\tag{1}
$$

has a nonzero limiting physical velocity and asymptotically linear separation. The independently accepted fixed-member result is retained regardless of whether this extension is accepted. The point of (1) is its explicit nonempty parameter width; it is deliberately conservative and is not an estimate of the largest positive-speed interval.

## 1. The finite expression whose variation is needed

Use the exact initial polynomials and endpoint expressions already accepted by the [input/slow audit](authorized-cases-ten-hour-reference-b-input-slow-acceptance.md). Write the degree-sixteen initial complex polynomial and parameter polynomial as

$$
q(\epsilon)=\epsilon^3 z(\epsilon),\qquad
\delta(\epsilon)=\epsilon d(\epsilon),
\qquad z(0)=-8i/3,\quad d(0)=1.
\tag{2}
$$

The accepted full rational coefficient norms of these polynomials are below $2^{4096}$. Their exact inputs remain SHA-256 `bb454c74e947e3b53ce4796639cdf26213eae539d0e2ed88e136595176fa8a51` and slow-expression SHA-256 `fd25ff2326dd62a17a219ec8160201b5889fddfaff4fec13f860ab86b78446b0`. Define $I=|q|^2$ on the real parameter interval, $x=I^{1/3}$, and the continuous prepared argument $\psi_0=\arg q$ near $-\pi/2$. Let $k_{13}(\delta,I)$ and $\mathcal T_{13}(\delta,I)$ be the accepted degree-thirteen endpoint slow multiplier and normalized phase polynomial in $\delta$. Then the exact finite critical expression is

$$
\Theta(\epsilon)=\psi_0+
\frac{\mathcal T_{13}(\delta,I)}{I\delta^3}
+\frac5{8\delta I^{1/3}k_{13}(\delta,I)}-\pi.
\tag{3}
$$

This is precisely the expression evaluated by the two independent integer instruments. It includes the reciprocal endpoint multiplier. Differentiating (3) concerns finite comparison coordinates and preparation parameters; it does not differentiate the actual time history beyond its retained $C^{5,1}$ regularity.

For all $0<\epsilon\le e_0$, the finite coefficient norms and the nonzero leading terms give

$$
2<|z|<3,\qquad 3/4<d<5/4,
\qquad I>\epsilon^6,\quad \epsilon/2<\delta<2\epsilon.
\tag{4}
$$

Indeed every higher coefficient sum times its first positive power of $\epsilon$ is at most $2^{4096}\epsilon$, and its logarithmic derivative is at most $16\,2^{4096}\epsilon$. These are much smaller than $1/4$ at the largest allowed parameter. With $\mathcal D=\epsilon\,d/d\epsilon$, it follows that

$$
|\mathcal D\log I|<8,\qquad
|\mathcal D\log\delta|<2,\qquad
|\mathcal D\psi_0|<1.
\tag{5}
$$

The argument bound uses $\operatorname{Im}(\mathcal Dq/q)=\operatorname{Im}(\epsilon z'/z)$; the real radial factor $\epsilon^3$ contributes no phase. No argument branch is reset.

## 2. Uniform endpoint derivatives from the admitted slow equation

The [finite slow-map protocol](authorized-cases-ten-hour-b-finite-slow-map-protocol.md) and [independent method assessment](authorized-cases-ten-hour-reference-b-next-map-admission.md) define the analytic slow equation

$$
\frac{dk}{db}=\frac{k}{b}F(Ib^3,\delta b^{-1}k),\qquad k(1)=1,
\tag{6}
$$

and its normalized phase at $B=I^{-1/3}$. Put $\rho=2^{-10000}$. The accepted finite coefficient norms give $|F(J,\xi)|\le2^{4100}|\xi|$ and $|H(J,\xi)|<2$ for complex $|J|\le1$ and $|\xi|\le2\rho$. The same absolute polynomial bounds apply to complex $J$; the denominator remains close to its constant term two. These are comparison-polynomial bounds, independent of an actual source history.

To bound the dependence on $I$, fix a real $I<1/8$ and let $\zeta$ range over the complex disk $|\zeta-I|\le I/2$. Choose the analytic logarithm there, put $B=\zeta^{-1/3}$, and integrate along

$$
b(u)=\exp(u\log B),\qquad 0\le u\le1.
$$

Along this path, $|b|\ge1$ and $|\zeta b^3|=|\zeta|^{1-u}\le1$. Also $|\log B|/\operatorname{Re}\log B<2$: the disk has $|\arg\zeta|\le\pi/6$ and $|\zeta|<3/16$. Therefore

$$
\int\frac{|db|}{|b|^2}<2,
\qquad
|\zeta|\int |b|^2|db|<\frac23.
\tag{7}
$$

For $|\delta|\le\rho$ and the bootstrap $|k-1|\le1/2$, equation (6) changes $k$ by less than $2^{4103}\rho<1/2$. The bootstrap closes on the full path. Holomorphic dependence follows from the finite analytic ODE along this holomorphically parameterized path, whose denominator never vanishes. It yields an endpoint $k(\delta,\zeta)$ bounded by two. Since $|k^{-3}|\le8$ and $|H|<2$, the normalized phase integral has magnitude below sixteen by (7); use the looser bound thirty-two below.

Cauchy bounds on the parameter disk give endpoint Taylor coefficients bounded by $2\rho^{-n}$ for $k$ and $32\rho^{-n}$ for $\mathcal T$. Cauchy in the $\zeta$ disk gives $|I\partial_I k_n|\le4\rho^{-n}$ and $|I\partial_I\mathcal T_n|\le64\rho^{-n}$ at its real center. The already accepted exact finite identities identify the retained coefficients with these endpoint Taylor coefficients; no coefficient is recomputed here.

Let $v=\delta/\rho<1/2$. Summing the finite geometric series and its derivative gives

$$
|\mathcal T_{13}|\le64,\quad
|\delta\partial_\delta\mathcal T_{13}|\le64,\quad
|I\partial_I\mathcal T_{13}|\le128,
\tag{8}
$$

$$
|k_{13}|\le4,\quad
|\delta\partial_\delta k_{13}|\le4,\quad
|I\partial_I k_{13}|\le8.
\tag{9}
$$

Its constant coefficient is exactly one. The sharper sum $|k_{13}-1|\le2v/(1-v)$ is less than $1/2$ on the present range, so $k_{13}>1/2$ on the real inputs. This proves the reciprocal margin used in (3), rather than inferring it from the one scalar evaluation.

The analytical control is $F=0$, $H=1/2$: then $k=1$ and $\mathcal T=(1-I)/4$, reproducing the known exact phase $(I^{-1}-1)/(4\delta^3)$. With $q=-(8/3)i\epsilon^3$ and $\delta=\epsilon$, its leading logarithmic derivative is $-81/(256\epsilon^9)$, within the conservative bounds below. This checks the endpoint normalization and the dominant derivative power before applying the bound to the retained finite comparison.

## 3. The phase variation is far below its checked separation

Equations (5), (8) give $|\mathcal D\mathcal T_{13}|<1152$. The logarithmic derivative of $I\delta^3$ has magnitude below fourteen. Hence

$$
\left|\mathcal D\frac{\mathcal T_{13}}{I\delta^3}\right|
<\frac{2048}{I\delta^3}
<2^{14}\epsilon^{-9}.
\tag{10}
$$

Equations (5), (9) give $|\mathcal D k_{13}|<72$ and $|\mathcal D\log k_{13}|<144$. The reciprocal term in (3) has magnitude below $4\epsilon^{-3}$ and logarithmic derivative below $2+8/3+144<149$. Combining it with (5) and (10) yields the deliberately enlarged uniform bound

$$
|\mathcal D\Theta|<2^{16}\epsilon^{-9}.
\tag{11}
$$

On (1), $(1-\eta)^{-9}<2$ and $|\log(\epsilon/e_0)|\le2\eta$. Integration therefore gives

$$
|\Theta(\epsilon)-\Theta(e_0)|
<2^{18}e_0^{-9}\eta=2^{-399982}.
\tag{12}
$$

Distance to the fixed set $2\pi\mathbb Z$ is one-Lipschitz on the real line; no modular turn index needs to be chosen for the nearby parameter. The [independent fixed-member interval](authorized-cases-ten-hour-reference-b-terminal-acceptance.md) has lower distance $1.778897576400$. Thus (12) gives a distance greater than $1.77$ throughout (1).

The [corrected zero-speed consumer](authorized-cases-ten-hour-reference-b-zero-branch-adjudication.md) would require distance below $2^{191000}\epsilon^2\le2^{-209000}$ on a hypothetical zero-speed branch. Its preparation, value, phase and corrected-section estimates are uniform inequalities in the same admitted family for $0<\epsilon\le e_0$; each smallness condition used there is strengthened when $\epsilon$ decreases. The new obligation is explicit uniformity of that analytical chain, not continuity of a numerical trajectory. Subject to its independent confirmation, the incompatible distances exclude zero terminal speed for every parameter in (1). The already accepted all-future dichotomy then gives positive terminal velocity and asymptotically linear pair separation.

The initial physical speed is the monotone function $v(\epsilon)=\epsilon/\sqrt{1-\epsilon^2/2}$, so (1) also specifies an explicit nonempty interval of release speeds. This is an interval within the original fixed preparation family, not robustness against arbitrary source histories or a new population. No accurate terminal speed, optimal interval width or physical energy interpretation follows.

## Review boundary and falsifiers

The independent review must check the complex initial-parameter disk, analytic endpoint normalization, coefficient identification, denominator margins, derivative arithmetic, and uniform scope of the corrected physical consumer. Any failed step withdraws this proposed interval extension while leaving the fixed-member classification and its separately accepted bounds intact. Earlier subjects, references and local numerical receipts remain frozen. Only this new analytical candidate and its prospective plan were written; no computation was launched.
