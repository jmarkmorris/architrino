# Independent adjudication of axial ring sectors

Status: accepted at the scopes below, with an independently repaired outward-rounded contraction verification. Date: 2026-10-03. This adjudication leaves the frozen subject and its instrument unchanged.

## Subject and verdict

The subject is [Axial sectors, screw translation and alternating-height rings](ring-axial-sectors-2026-10-03.md), with source instrument [ring_axial_sectors_20261003.py](../../../../../scripts/braid-program/ring_axial_sectors_20261003.py). The frozen subject hashes inspected were `f7a3f1bc50cbbabb409b0143cb7e4d6af66101ca9d3418d3997e9950a72b8402` for the document and `0ec07fddcb37c132dcab4f6729ab8862ea8ac6087481548eb724d33bbcbabdc5` for its instrument. The subject preserves the unchanged Master Equation, every ordinary positive-delay self root, $K=c_f=1$ in numerical references, and the distinction between exact circles and stable nearby histories.

**Derived and independently reconstructed:** the axial first variation, its Fourier reduction and conjugacy; the common drift coefficient's meaning; the preparation-dependent first memory step; the complete subwake screw scaling and extension of the inherited T02–T36 nonexistence result; the singular wake-speed boundary and rootless superwake boundary; and the global two-height alternating-pucker obstruction.

**Computer-assisted derived and independently verified:** existence and uniqueness of the six displayed growing axial roots at T02, T04 and T06, and the three displayed common-sector decaying roots. The new checker additionally verifies every other candidate rectangle retained in the frozen subject receipt: five rectangles for T02, six for T04 and five for T06, including both signs of one explicitly retained decaying pair. These 16 checked rectangles are local witnesses, not a global spectral count. The maximum outward contraction upper bound is below $2\times10^{-19}$, so the subject's small point-rounding gap does not alter the root verdicts.

**Not established:** absence of other growing roots, common-sector stability, nonlinear axial instability at T04/T06, a ring-down for every axial impulse, a large-rung growth limit, or a three-dimensional nonlinear destination. The six positive-root witnesses establish at least four real growing axial directions per reference. They establish linear axial instability at T04 and T06, while the separately adjudicated nonlinear T02 result remains inherited in its original planar sector.

## Independent axial differentiation

At a baseline reception event, write the planar chord as $\mathbf r_0$, its length as $\ell$, and its direction as $\mathbf n_0$. Perturb every member by an axial displacement $z_j(T)\mathbf e_z$. The varied causal constraint is

$$
g(T_e)=\left\|\mathbf r_0+[z_i(T)-z_j(T_e)]\mathbf e_z\right\|-(T-T_e).
$$

At fixed emission time its first variation vanishes, because $\mathbf r_0\cdot\mathbf e_z=0$. The inherited nonzero transmitter derivative then implies $\delta T_e=0$. The norm has no first variation, whereas the direction has

$$
\delta\mathbf n=\frac{z_i(T)-z_j(T-\Delta)}{\ell}\mathbf e_z.
$$

The first variation of $D_t=1-\mathbf n\cdot\mathbf V_j$ vanishes: the varied direction is axial while the reference velocity is planar; the varied velocity is axial while the reference direction is planar. Both cross terms vanish, and the time-shift term is zero. Differentiating the complete per-hit acceleration $\sigma K\mathbf n/(\ell^2|D_t|)$ therefore gives

$$
z_i''(T)=\sum_j\sum_{\text{roots }a}
\frac{q_iq_jK}{\Delta_{ja}^3|D_{t,ja}|}
[z_i(T)-z_j(T-\Delta_{ja})].
$$

This independently reconstructs the subject's kernel without borrowing its reduced scalar root projections. The complete simple root chart is an essential premise: at a zero transmitter derivative, the implicit differentiation is unavailable. Reflection through the original plane explains separation from the planar first variation, but this separation is first-order only.

For $z_j=e^{\lambda T+ik\alpha_j}$, the source offset contributes $e^{ik(\alpha_j-\alpha_i)}$. Thus the characteristic function is precisely

$$
H_k(\lambda)=\lambda^2-\sum_{j,a}w_{ja}
[1-e^{ik(\alpha_j-\alpha_i)-\lambda\Delta_{ja}}].
$$

Rigid axial translation gives $H_0(0)=0$. A rotated exact circle gives a tilt component proportional to $e^{i\Omega T+i\alpha_j}$, hence $H_1(i\Omega)=0$; its conjugate gives $H_5(-i\Omega)=0$. These are consequences of Euclidean covariance of the complete equation. They do not describe a rotating plane normal or prove a precession branch.

All $w_{ja}$ and delays are real, so $\overline{H_k(\lambda)}=H_{6-k}(\overline\lambda)$ on the six-member reference. The sector-2 witness and sector-4 conjugate form two real growing solutions. Sector 3 has real coefficients; its positive-imaginary temporal root and conjugate form two further real growing solutions. Different spatial sectors are linearly independent. Unique interval inclusion also implies these witnessed zeros are simple because the complex derivative is nonzero throughout their small certified boxes. The lower bound of four real growing directions is consequently valid without assuming that all right-half-plane roots were found.

Falsifier: a complete independent axial differentiation with a nonzero first-order delay or transmitter-factor change refutes the kernel. A failed symmetry identity, conjugacy relation or local inclusion defeats the corresponding sector statement.

## Separate numerical reconstruction and inclusion proof

The new [adjudication checker](../../../../../scripts/braid-program/ring_axial_independent_adjudication_20261003.py) imports no subject function, unified-level projection, existing root oracle or EOM solver. It receives candidate rectangles as locating inputs. It reconstructs each source channel directly from the ordinary chord equation

$$
g_j(\chi)=2\beta\left|\sin\frac{\chi-\alpha_j}{2}\right|-\chi=0,
\qquad 0<\chi\le2\beta,\qquad \alpha_j=j\pi/3.
$$

Every sine half-wave is strictly concave. Its zero locations and sole possible stationary maximum partition it into monotone pieces. The checker bisects all sign-changing pieces independently at both endpoints of the inherited certified speed bracket. Outward-rounded endpoint signs and a transmitter derivative of fixed nonzero sign certify each root; $d\chi/d\beta=2|\sin((\chi-\alpha_j)/2)|/D_t$ encloses its continuation between those endpoints. The inherited topology-cell certificate supplies the absence of a fold inside each speed bracket. Concavity and the complete lobe partition supply the finite complement, excluding zero-delay self coincidence only.

For each enclosed emission angle $\phi_j=\alpha_j-\chi$, the checker constructs the Cartesian unit-radius chord and source velocity,

$$
\mathbf d=(1-\cos\phi_j,-\sin\phi_j),\quad
L=\|\mathbf d\|,\quad \mathbf n=\mathbf d/L,\quad
\mathbf V_j=\beta(-\sin\phi_j,\cos\phi_j),\quad
D_t=1-\mathbf n\cdot\mathbf V_j.
$$

It sums radial and tangential projections from $q_iq_j\mathbf n/(L^2|D_t|)$, rather than the subject's $v$-coordinate formulas. The complete counts are independently reconstructed as 48, 72 and 96 directed roots for T02, T04 and T06, with six positive-delay self hits each. Every radial coefficient is inward and every tangential interval includes zero. Radius is enclosed as $R=-C_r/\beta^2$, and each physical delay is $RL$. These enclosures retain the accepted reference uncertainty throughout the characteristic calculation. Their agreement does not independently establish a new exact balance: the exact unique balance remains an inherited theorem premise from the frozen speed certificate.

For the real system $F=(\Re H,\Im H)$ and an explicitly invertible binary preconditioner $C$, define the Newton-like map $N(x)=x-CF(x)$. On the subject's exact binary rectangle $X$, the new instrument encloses

$$
N(X)\subset x_0-CF(x_0)+(I-CJF(X))(X-x_0).
$$

It verifies strict inclusion in $X$. More importantly, it computes each infinity-norm row bound as a sum of **interval absolute values with outward interval addition**:

$$
L_i\in\sum_j|[I-CJF(X)]_{ij}|,\qquad
\max_i\sup L_i<1.
$$

The chosen $C$ has the real form of a nonzero complex reciprocal, so its determinant is a sum of two nonzero squared entries and is positive. Strict inclusion and the contraction bound give one unique fixed point, and invertibility of $C$ makes that fixed point a zero of $F$. The derivative bound also supplies a nonsingular real Jacobian and hence a simple characteristic zero in each witnessed rectangle. This argument is uniform over the full enclosed reference bracket, despite dropping parameter correlations for safety.

The subject computes its final row-sum contraction number at 90-digit point precision from 75-digit interval endpoints. That sum is not itself a rigorously outward-rounded upper bound. The new checker repairs this verification gap independently, without modifying the subject. Its 85-digit interval row sums and outward decimal serialization retain rigorous upper endpoints; all 16 rectangles pass. The subject's document may cite this receipt for independently checked local witnesses. For a reusable primary instrument, its point contraction calculation needs replacement by an outward interval sum, or an explicit analytically justified upward error allowance; replaying the old point sum alone would retain the defect.

The receipts are `.local-data/ring-exploration/axial-adjudication/control.json` and `target.json`. They retain exact binary rectangle, image, radial, tangential, delay-derived drift, signed-weight and pucker-characteristic endpoints, plus checker and input identities. No displayed rounded root is treated as an authoritative rectangle endpoint.

## Known controls before target

The independent checker first tested analytically known cases: the direct self chord at $\beta=\pi/2$ has the positive endpoint root $\chi=\pi$; the self channel at $\beta=1/2$ has no positive root; the synthetic characteristic $H(z)=z^2+1$ has its simple root at $i$ and passes the same outward Krawczyk contraction machinery; direct symbolic differentiation of a static Cartesian source at separation two gives axial derivative $1/8$; and the outward row-sum control encloses $7/10$.

The endpoint-root control initially failed because the proposed numerical lobe partition did not retain an exact upper-delay endpoint root. The checker was repaired and all controls passed before any ring target. Controls were rerun before the final target after changing the verifier to consume the subject's exact binary rectangle endpoints. This order is recorded explicitly because the repaired known case protects actual root coverage; no target-first validation is counted.

Shared-venv `--stage control` returned PASS, followed by `--stage target` returning PASS. Reproduction uses only the shared venv and follows the same order:

```sh
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_axial_independent_adjudication_20261003.py --stage control
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_axial_independent_adjudication_20261003.py --stage target
```

This is independence through a separate phase-channel root construction and Cartesian acceleration instrument, not through a second reader, a copied target evaluation or replay of the same implementation. The common imported object is the already accepted exact-reference speed certificate, whose authority is explicitly inherited.

## Common drift, impulse preparation and decay

For the common sector, all source perturbations equal $z(T)$. Prescribing its complete past as $z(T)=UT$ gives

$$
z''=U\sum_{j,a}w_{ja}\Delta_{ja}=UB.
$$

The independently reconstructed outward intervals make $B<0$ on all three references. This is a response coefficient for an imposed uniformly drifting history, with units of inverse time. It is not an eigenvalue or a decay exponent. The actual drifting history has zero required axial acceleration and therefore fails the equation whenever $UB\ne0$.

The translation zero remains exact, and $H_0'(0)=-B>0$ makes it simple. Independently enclosing negative common-sector roots proves that damped oscillations are available. It does not exclude positive roots, identify the least-damped root, or prove a ring-down for every common axial nudge. The subject correctly preserves each of these boundaries; T04 even has another witnessed negative root with a real part closer to zero than the displayed one, demonstrating why that caution matters.

For a present-time velocity impulse applied to a flat axial past, every delayed source displacement remains zero until the smallest reference delay. The linear equation is then $z''=Wz$, where $W=\sum w_{ja}$. The new intervals certify $W<0$ on T02, T04 and T06. With $z(0)=0$ and $z'(0^+)=U$, the first memory step is exactly

$$
z(T)=\frac{U}{\sqrt{-W}}\sin(\sqrt{-W}T),\qquad
z'(T)=U\cos(\sqrt{-W}T),\qquad 0<T<\Delta_{\min}.
$$

The acceleration at the impulse event is zero, not $BU$. The external impulse is the preparation; afterward the history-dependent equation governs the response. Source terms enter on later memory steps, so this first-step solution cannot be extrapolated as an eternal harmonic mode or a memoryless braking law.

Falsifier: an independently enclosed nonnegative drift coefficient defeats its local sign claim; a different complete flat-past first-step response defeats that reduction. Stable common-sector behavior still requires a separate global spectral exclusion or nonlinear history estimate.

## Screw translation: scaling and exact domain boundary

For a whole-past axial screw with speed $u$, the chord identity is

$$
\Delta^2=4R^2\sin^2\frac{\Omega\Delta+\alpha_i-\alpha_j}{2}+u^2\Delta^2.
$$

For $|u|<1$, put $\gamma=\sqrt{1-u^2}$. The transverse chord is $\gamma\Delta$, so $\Delta\le2R/\gamma$ provides complete coverage even though the absolute screw history is axially unbounded. Its stationary equivalent has speed $b=\Omega R/\gamma$, direction $\mathbf n=(\gamma\mathbf n_0,u)$ and transmitter factor $D_t=\gamma^2D_0$.

The resulting planar ledger is $(K\gamma/R^2)(C_r,C_t)$, while its axial component is $(Ku/R^2)S(b)$. Tangential balance selects a stationary zero $b$; radial compatibility then gives the necessary scaling

$$
R=R_0/\gamma,\qquad \Omega=\gamma^2\Omega_0,
\qquad \Delta=\Delta_0/\gamma^2.
$$

Hence the axial residual is $A_z=K\gamma^2uS(b)/R_0^2$. The $\gamma^2/R_0^2$ factor is essential for an actual acceleration; omitting it preserves a zero/sign chart only. The inherited [axial-speed certificate](../evidence/2026-09-01-planar-three-binary-axial-translation-speed-chart.md) proves $S(b)<0$ on its 18 T02–T36 branches. That sign is independent of $u$ in the mapped chart. The subject's extension from $|u|\le0.9$ to every $|u|<1$ on those same branches is therefore accepted as a derived algebraic consequence, without new speed sampling. No all-higher-rung sign claim follows.

As $|u|\to1$, the required radius, delay depth and inverse transmitter factor diverge, while angular frequency tends to zero. The residual approaching zero does not yield a finite-radius rotating solution. At $|u|=1$, the chord equation requires exact transverse alignment. For nonzero angular frequency there are infinitely many positive-delay phase alignments in the all-past history, including full-period self alignments; each has $D_t=0$. These are singular roots outside the ordinary finite-simple-ledger equation. They do not furnish an ordinary translating ring or an automatically authorized generic-fold continuation.

For $|u|>1$, range is at least $|u|\Delta>\Delta$ for every positive delay. There is no causal hit, even with the unbounded past retained. Zero acceleration cannot sustain the specified nonzero centripetal acceleration. The rootless exclusion of rotating screws with nonzero radius and angular rate is accepted for every inventory under this ansatz.

Falsifier: a positive-delay root violating the chord identity, a finite ordinary transmitter factor at wake-speed alignment, or a superwake root refutes the corresponding argument. An all-higher-rung stationary weight of a different sign would affect that rung alone; its sign remains unproved here.

## Static two-height pucker

Take constant heights $z_j=(-1)^jh$ on one common circle, with the same alternating polarity order. A same-polarity emission always has the receiver's height and has zero axial acceleration contribution, including all self hits. At an upper receiver, an opposite-polarity source lies $2h$ below it. Every ordinary opposite-polarity term has axial component

$$
-\frac{2Kh}{\ell^3|D_t|}.
$$

Every term has the same nonzero sign for $h\ne0$. At least one root exists in each opposite-polarity channel: the causal gap is positive at delay zero, and the bounded rotating source eventually lies inside a sufficiently old wake. Restriction to the complete ordinary-root chart makes each retained denominator finite and nonzero. Thus the sum cannot equal the zero required axial acceleration. This establishes the subject's global obstruction for this explicit two-height ansatz, including every even-member regular alternating circle with each polarity in its own height plane.

At $h=0$, the derivative is $-2\sum_{j\text{ odd},a}K/(\Delta_{ja}^3|D_{t,ja}|)<0$, and $H_3(0)>0$. The independently reconstructed intervals confirm the latter sign on the three references. This static restoring derivative coexists with the growing oscillatory temporal pair; delayed feedback samples an earlier displacement rather than its static value. There is consequently no nearby rigid static pucker for that pair to settle onto within this ansatz. A general three-dimensional evolving object or differently assigned height pattern is outside the obstruction.

Falsifier: a same-height axial contribution, a reversed ordinary opposite-polarity axial sign, or a complete simple-ledger exact nonzero-height balance refutes this specific result. An unequal-height or precessing solution would instead extend the unexamined geometry.

## Necessary disposition and remaining work

The accepted derived results and locally certified axial roots can be integrated at their stated grades, citing this independent adjudication and its receipt. The frozen subject's point row-sum should not be retained as the sole certificate of a contraction upper bound. No root number or displayed rate needs correction: the separate outward verification repairs the proof instrument's final bound.

The remaining obligations are a right-half-plane exclusion or full root count in common and tilt sectors, complete axial counts in the witnessed sectors, admissible nonlinear-history connections at T04/T06, later impulse response, higher-rung screw weights, and general three-dimensional geometry. Those obligations remain outside this adjudication. Only this new adjudication, its new checker, local receipts and permitted scratch are owned here; shared queues, manuscript, indexes and logs remain coordinator-owned.
