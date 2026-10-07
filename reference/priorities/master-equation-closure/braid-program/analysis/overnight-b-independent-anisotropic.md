# Independent anisotropic spatial-neighborhood check

## Scope and predeclared construction

This independent check targets planar absolute-time bounds $|r-R_0|,|r'|,|r''|,|p'|,|p''|,|\Omega-\Omega_0|\le2^{-20}$, with no bound on $|p|$, together with vertical bounds $|z|\le h$, $|z'|\le4h$, $|z''|\le16h$. The selected heights are $h=1/32$ for T02 and $h=1/128$ for T04. The waveforms have any common finite positive period. The canonical equation remains unchanged with $K=c_f=1$ and every ordinary self and partner root.

The [independent instrument](overnight-b-independent-anisotropic.py) separates planar perturbations from quadratic height contributions in the scalar causal gap. It uses its own root brackets and signed scalar mean-value refinement. The spectral bounds are proved by the earlier independent center-disc method, using independently authenticated exact-reference data. The preselected bounds are $C_0=1/4,C_1=4/5$ for T02 and $C_0=1/40,C_1=3/10$ for T04; these constants must pass continuous-frequency interval verification before use.

Only frozen generic interval and frequency-disc helpers from [the earlier independent instrument](overnight-b-independent-neighborhood.py) are imported. No subject implementation, subject inverse constant or subject receipt enters the numerical proof. Static-root, elevated static-height and spectral controls must pass under the final instrument identity before target use. The computation uses the executable shared venv, one thread, 85-decimal interval arithmetic and a sixty-second alarm. If a selected height fails a sufficient estimate, any smaller dyadic retry will have a separate receipt, and the failure will not be interpreted as a physical boundary.

## Independent acceptance

Claim grade: computer-assisted derived, conditional on the inherited exact T02/T04 flat-reference admissions. Both selected anisotropic domains pass the independent complete-root and nonlinear axial exclusion certificate. Every exact relative-periodic history in either domain has $z\equiv0$. No smaller-height retry was needed.

| Reference | $h$ | Independently certified $C_0,C_1$ | Ordinary roots per receiver / self | Upper bound on $2C_0E+C_1B$ | Frequency discs | Compact complement leaves |
| --- | --- | --- | --- | ---: | ---: | ---: |
| T02 | $1/32$ | $1/4,4/5$ | 8 / 1 | $0.203077066$ | 15 | 41 |
| T04 | $1/128$ | $1/40,3/10$ | 12 / 1 | $0.086153942$ | 13 | 52 |

The counts and bounds are measured by the final independent target receipt; displayed contraction bounds round upward. These are sufficient inequalities, not a measurement of a maximum permitted height. The result is uniform over all finite common periods and all harmonics satisfying the stated absolute-time bounds. It establishes neither stability nor nonlinear fate, and it does not exclude exact spatial histories outside the domains.

## Exact histories and scalar comparison

For all real times, the six paths have the form

$$
X_j(t)=\big(r(t)\cos[\Omega t+j\pi/3+p(t)],r(t)\sin[\Omega t+j\pi/3+p(t)],(-1)^jz(t)\big).
$$

The waveforms $r,p,z$ are real $C^2$ functions of an arbitrary common period $P>0$. Write $R=R_0$ and $\Omega_0$ for the admitted flat radius and angular rate, and $\beta=R\Omega_0$. Put $\epsilon=2^{-20}$ and $v=4h$. Radius, its first two derivatives, the phase derivatives and the angular-rate difference obey the bounds in the scope above. There is no phase-amplitude bound because only the difference $p(t-d)-p(t)$ enters relative causal geometry, and this difference is bounded by $\epsilon d$ from the derivative hypothesis.

At reception by member zero, rotate axes with its present angle. At positive delay $d$, let $Q$ be the full separation and let $V_s,V_r$ be source and receiving velocities in these axes. Their flat planar comparisons are

$$
\theta_0=j\pi/3-\Omega_0d,\qquad
Q_{p0}=(R-R\cos\theta_0,-R\sin\theta_0),
$$

$$
V_{s0}=R\Omega_0(-\sin\theta_0,\cos\theta_0),\qquad
V_{r0}=(0,R\Omega_0).
$$

The flat squared causal gap and its delay derivative are

$$
F_0(d)=2R^2(1-\cos\theta_0)-d^2,\qquad
F_0'(d)=-2R^2\Omega_0\sin\theta_0-2d.
$$

The actual relative-angle difference is at most $2\epsilon d$. Triangle inequalities for planar components give

$$
q_p=2\epsilon+2R\epsilon d,\qquad
v_r=\epsilon+\Omega_0\epsilon+2(R+\epsilon)\epsilon,\qquad
v_s=v_r+2\beta\epsilon d.
$$

Here $q_p$ bounds $|Q_p-Q_{p0}|$, while $v_r,v_s$ bound the respective planar velocity differences. Vertical separation satisfies $|Q_z|=|z(t)-(-1)^jz(t-d)|\le2h$, and each vertical velocity has absolute value at most $v$. Consequently, with $F=|Q|^2-d^2$,

$$
-f_p\le F-F_0\le f_p+4h^2,\qquad f_p=4Rq_p+q_p^2.
$$

The lower bound retains the nonnegative sign of $Q_z^2$. This makes it stronger than replacing the vertical term by a symmetric error interval. The source dot-product error is bounded by

$$
U=2Rv_s+\beta q_p+q_pv_s+2hv.
$$

Since $F_d=2Q\cdot V_s-2d$, the derivative perturbation satisfies $|F_d-F_0'|\le2U$. Vertical height enters through $4h^2$ in the gap and $2hv=8h^2$ in $U$, not as a linear planar displacement error.

## Complete roots and row bounds

Each inherited ordinary flat root is enclosed by a bracket with dyadic padding, enlarged only until the interval endpoints have opposite strict signs and the whole derivative interval excludes zero. Brackets remain disjoint within each source channel. Every complementary delay interval must exclude zero by a strict gap sign or by monotonicity with same-sign endpoints. The instrument checks gap-free coverage of the compact delay window.

For an inherited exact root $d_0$ and its perturbed root $d$, the scalar mean value theorem gives

$$
d-d_0=-\frac{F(t,d)-F_0(d)}{F_0'(\xi)}
$$

for an intermediate delay $\xi$. Repeated interval intersection with this relation refines the root enclosure. The error interval contains zero, so the enclosing interval also retains the reference root and hence the intermediate segment. The calculation claims inclusion only; it does not infer exactness from convergence of an iteration.

At arbitrary delay, the flat transmitter expression is

$$
D_{\rm flat}(d)=1+\frac{R^2\Omega_0\sin\theta_0}{d}.
$$

For refined delay lower bound $d_{\min}>0$, the actual divisor obeys $|D-D_{\rm flat}(d)|\le U/d_{\min}$. Interval evaluation proves that its sign agrees with the inherited root and bounds the coefficient $a=1/(d^3|D|)$ relative to $a_0$.

The flat playback numerator vanishes identically: $Q_{p0}\cdot(V_{r0}-V_{s0})=0$. The perturbed numerator is therefore bounded by

$$
P_b=2R(v_r+v_s)+2\beta q_p+q_p(v_r+v_s)+4hv.
$$

The vertical term is $4hv=16h^2$, because receiving-minus-source vertical velocity is at most $2v$. Implicit root differentiation gives

$$
|d_b'|\le\eta_b=\frac{P_b}{d_{\min}\inf|D_b|}<1.
$$

The largest certified $\eta_b$ is below $0.056097$ for T02 and $0.008421$ for T04. These upper bounds round upward. All coefficients, delays and their derivatives are bounded uniformly in absolute reception time and across the full waveform domain.

## Recent self, recent partner and distant guards

The independent compact window is $[1/64,4]$. Set

$$
v_{\min}=(R-\epsilon)(\Omega_0-2\epsilon),\qquad
v_{\max}=\epsilon+(R+\epsilon)(\Omega_0+2\epsilon)+4h,
$$

$$
A_{\max}=\epsilon+(R+\epsilon)(\Omega_0+2\epsilon)^2+
2\epsilon(\Omega_0+2\epsilon)+(R+\epsilon)\epsilon+16h.
$$

These follow by bounding the planar tangential speed from below, and adding absolute component bounds for speed and acceleration from above. For a recent self delay, tangent projection bounds the chord divided by delay from below by $v_{\min}-A_{\max}d/2$. At $d=1/64$, this exceeds $1.7958$ for T02 and $2.8502$ for T04. Thus all earlier positive self delays are excluded geometrically; no self root is removed by convention.

For every distinct partner, present planar separation is at least $R-\epsilon$. Its recent range-minus-delay is therefore at least $R-\epsilon-(v_{\max}+1)/64$, certified above $0.9298$ and $0.4991$, respectively. Every complete path lies inside the ball of radius $\sqrt{(R+\epsilon)^2+h^2}$. All causal delays are bounded by twice this radius, certified below $1.9530$ and $1.1236$, respectively, and hence below $4$. The lower floors round downward and the upper bounds round upward. These guards and the compact complement establish all-past coverage.

## Inverse and nonlinear exclusion

The independent spectral calculation reconstructs every admitted root coefficient and delay from the authenticated half-chord data. With $W_0=\sum_b\sigma_ba_b^0$, the axial characteristic function is

$$
H(s)=s^2-W_0+\sum_ba_b^0e^{-sd_b^0}.
$$

At frequency interval $[u,w]$, an outward center-value enclosure and the derivative bound $2w+\sum_ba_b^0d_b^0$ give a disc enclosing all $H(i\omega)$ on the interval. Its distance from zero establishes the two inverse bounds. Contiguous discs cover $[0,8]$ for T02 and $[0,32]$ for T04. Negative frequencies follow by conjugation. For the infinite tails, write $Q=\sum_ba_b^0+|W_0|$. The inequalities $|H(i\omega)|\ge\omega^2-Q$ and monotonic decrease of $1/(\omega^2-Q)$ and $\omega/(\omega^2-Q)$ above $\sqrt Q$ certify the same constants beyond the outer endpoint. Exact rational intervals encode the constants in the table.

Let $\varepsilon_b$ bound $|a_b-a_b^0|$ and $\Delta_b$ bound $|d_b-d_b^0|$. Define

$$
E=\sum_b\varepsilon_b,\qquad
B=\sum_b\frac{(a_b^0+\varepsilon_b)\Delta_b}{\sqrt{1-\eta_b}}.
$$

For the constant-delay axial operator $L_0$, the frequency bounds give $\|z\|_2\le C_0\|L_0z\|_2$ and $\|z'\|_2\le C_1\|L_0z\|_2$ on every period. The exact nonlinear axial equation and the variable-delay change-of-variables estimate then imply

$$
\|L_0z\|_2\le2E\|z\|_2+B\|z'\|_2
\le(2C_0E+C_1B)\|L_0z\|_2.
$$

The certified strict inequality forces $L_0z=0$ and hence $z=0$. The [earlier independent analytical review](overnight-b-independent-neighborhood.md) supplies the full periodic norm argument. It uses neither a first-amplitude derivative nor a finite limiting period. The present bounds supply an explicitly wider vertical domain for that same theorem.

## Execution record

Before any target evaluation, `OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 MKL_NUM_THREADS=1 "${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/analysis/overnight-b-independent-anisotropic.py --stage known` exited zero. Its receipt `.local-data/master-equation-closure/overnight-b/independent-anisotropic/known.json` has SHA-256 `05ffdccb1696b09fae56520407edd4a272d7c71501a587169e12699de1b758d6`, with measured wall time 0.0206 seconds. The exact elevated static-height root was enclosed, both vertical dot-product bounds returned their known values, and the polynomial frequency controls passed. This record precedes target invocation.

The first target passed both selected heights. A subsequent arithmetic hardening encodes the spectral constants as exact rational intervals, compares frequency-disc estimates against their lower endpoints, and uses the enclosing rational intervals in the final contraction. The initial instrument and receipts are preserved under the ignored names `pre-rational-instrument.py`, `pre-rational-known.json` and `pre-rational-selected.json`. Before rerunning any target under the final instrument identity, the same known command passed again, exit zero, producing final known receipt SHA-256 `3be7849fea8a502e069e1a2ce6565b8a4ac9bb32a974d7e8e0be4199f4c6c8ae`, with measured wall time 0.0181 seconds. The earlier decimal comparison points were slightly below their exact rational values; this change makes the rational constants explicit in the contraction arithmetic as well.

The final target command used the identical environment prefix and script with `--stage target`, exit zero. Its receipt `.local-data/master-equation-closure/overnight-b/independent-anisotropic/selected.json` has SHA-256 `afc10602d11854b8da05934689bf531dc5816b2b66ce7f89b3d3200986af771f`. It records 0.3354 seconds wall time and macOS `ru_maxrss=30867456` bytes. Both final stages executed synchronously and completed; no scientific process or supervisor session remains from this review. The earlier selected receipt, retained as `pre-rational-selected.json`, has SHA-256 `4d6b1a07ed7c16ebcdf83681718602a5b8a7512467bd8fe6712d89b646bea88d` and is superseded by the final receipt above.

| Artifact | SHA-256 |
| --- | --- |
| Final independent instrument | `a07a1c4ded3ba0d8304f433b5768b93ef6cc2a25db98c6290a4d83f7a3447253` |
| Frozen independent helper | `173c8c8684d4f4ddc32c730f03653ed33fabaa62a9818652a88750605f364cf4` |
| Inherited symmetric adjudication | `5bfed3044a262902b65f4bbba2ede2d18c3c1a9950342bdbed2593de8b718adf` |
| Inherited T02 exact-reference certificate | `3f44600259557b9736b860a904dc986193b7ca21f33cdbbaeb45f8bc0a440c50` |
| Inherited T04 exact-reference certificate | `17b41d073a1aeec059e292b6696ad2fe54c60b27c46d54976848d29062debc4a` |
| Frozen anisotropic subject, inspected but not imported or executed | `311333546f07e06b7ecb6eb4bf423173498067a47ef3db1bfcee1b056f6f0bc4` |
| Subject `h-2m5.json`, not mathematical input | `c96682b950a0a66742df0e3e3ede408fffc28d5991e6e410d0ec51c5e6764d3a` |
| Subject `h-2m7.json`, not mathematical input | `df931d5a57f33db7c7d6ccf5f38a1a71bc73fe50b75fe9aa719bf350b4b64e7d` |

The inherited inputs remain at `.local-data/ring-exploration/stability/T02-certificate.json`, `T04-certificate.json` and `.local-data/ring-exploration/symmetric-adjudication/target.json`. Their identities are authenticated during target execution. Ignored evidence is local provenance; replay requires those admitted files. `shasum -a 256` recorded the displayed final identities. The independent numerical proof uses the shared `mpmath` interval library; it does not claim independent implementation of arbitrary-precision arithmetic itself.

Scoped whitespace validation ran `git diff --no-index --check /dev/null` separately for both new owned source files, with no whitespace diagnostics. Exit one records each expected difference from `/dev/null`. The final Python source executed successfully in both stages, and no regular tests were added or run.

## Falsifiers and completion

A missing ordinary root, failed guard or complement interval, incorrect planar or vertical error bound, failed outward enclosure, imaginary-axis zero within the asserted inverse bounds, or nonzero exact periodic height satisfying every stated hypothesis would defeat its affected acceptance. An invalid inherited flat-reference admission would defeat the corresponding conditional application. Histories outside these domains are not excluded. No singular continuation, stability verdict or actual-fate conclusion follows from the sufficient inequality.

No selected height failed, and no narrower retry or physical-boundary inference was needed. Only this report, its new independent instrument and evidence under the authorized ignored directory were written. Completed subjects and earlier oracles remain unchanged. No corpus, shared ledger, regular test suite, production solver, scheduler or publication state was changed. The bounded independent check is complete.
