# Planar Three-Binary T04 Coupled Phase-Radius Box Certificate

## Disposition

**Status:** Completed local zero census. The regular equal-radius T04 balance is the unique full-vector balance in the declared coupled phase-radius-speed box.

**Closure goal:** Determine whether a balance branch can leave T04 along a diagonal direction that changes phases and radii together, despite the separately accepted phase-only and radius-only isolation results.

**Claim grade:** **Computer-assisted derived local isolation.** The tracked five-variable certificate reuses the frozen generic unequal-radius interval-root primitives, then separately composes the coupled phase and radius chart, implicit derivatives, complete compatibility map, and interval-Newton system. It binds the exact T04 source, the accepted source-order reconciliation, and the accepted scalar T04 theorem by SHA-256.

Plainly: two slice proofs do not automatically exclude a diagonal branch. This certificate opens both phase gaps and both radius ratios at the same time and checks that coupled possibility directly.

## Declared coupled chart

Fix the first positive endpoint at phase zero and write

$$
\phi_2=\frac{2\pi}{3}+\delta_2,
\qquad
\phi_3=\frac{4\pi}{3}+\delta_3,
$$

with each negative endpoint antipodal to its positive partner. Write the three binary radii as

$$
R_1=R,
\qquad
R_2=r_2R,
\qquad
R_3=r_3R.
$$

All six members share one positive angular rate, the binary-pair polarity word is `+-+-+-`, and $c_f=1$. The certified box is

$$
|\delta_2|,|\delta_3|,|r_2-1|,|r_3-1|
\leq10^{-6},
\qquad
|\beta_f-\beta_{\mathrm{T04}}|\leq10^{-6}.
$$

Plainly: the chart has five independent coordinates after global phase and overall radius scale are fixed. All five may vary together throughout the declared box.

## Root ownership and geometric margins

For every directed receiver-transmitter channel, the certificate evaluates the unequal-radius causal equation

$$
G_{ij}
=
\beta_f
\sqrt{
r_i^2+r_j^2-2r_ir_j\cos(\phi_i-\phi_j+\vartheta)
}
-\vartheta.
$$

Each equal-radius center root is only a proposal. Parametric interval Newton proves one simple continuation for every source owner and ordinal throughout the full five-coordinate box. A 336-box complement cover excludes every extra root to maximum subdivision depth six, including analytic exclusion of the coincident zero-delay self solution.

The complete source-permuted 72-root ledger is preserved. The minimum certified causal-derivative magnitude is greater than $0.1166850336057556700488426789$, the minimum scaled separation is greater than $0.2632828320266762978235076170$, and the minimum transmitter-factor magnitude is greater than $0.1163409527840862301621674600$.

Plainly: no root is lost, duplicated, folded, or reassigned while phases, radii, and speed move together inside the box.

## Five-equation subsystem

For receiver $i$, let $a_{t,i}$ be the tangential acceleration projection and let $s_i=a_{r,i}/r_i$ be its receiver-compatible radial coefficient. A full common-rate circular balance requires all six $a_{t,i}$ to vanish and all six $s_i$ to agree. The certificate selects

$$
\mathbf f
=
\left(
a_{t,0},
a_{t,2},
a_{t,4},
s_2-s_0,
s_4-s_0
\right)
$$

as five necessary equations in $(\delta_2,\delta_3,r_2,r_3,\beta_f)$.

A point precheck composed the already measured phase and radius partial derivatives and found determinant $7.4370568772298885\times10^{10}$ with smallest singular value $3.37829048385\ldots$. That precheck selected the subsystem but is not proof authority. The interval certificate differentiates the complete coupled equations directly.

Plainly: three rows control sideways acceleration, while two rows require the three circle sizes to share one angular acceleration coefficient. Together they test every independent coupled coordinate.

## Interval-Newton zero count

Outward-rounded automatic differentiation propagates through every enclosed causal root by $\partial_u\vartheta=-(\partial_uG)/(\partial_{\vartheta}G)$ and then through every acceleration contribution. Gauss-Jordan elimination encloses the inverse of the resulting $5\times5$ interval Jacobian. Its pivot intervals are

$$
\begin{aligned}
0.4234318655&<p_1<0.4249676592,\\
23.31195770&<p_2<25.32272595,\\
823.8039936&<p_3<1017.068747,\\
-3404.425163&<p_4<-2357.639784,\\
-6077.114530&<p_5<-612.5273544.
\end{aligned}
$$

Every pivot therefore excludes zero. The interval-Newton image satisfies

$$
|\delta_2|<2.70\times10^{-66},
\qquad
|\delta_3|<4.59\times10^{-67},
$$

places both radius ratios within $7\times10^{-69}$ of unity at the printed precision, and encloses $\beta_f$ within $4\times10^{-69}$ of the frozen T04 center. The image lies strictly inside the declared box, so the five selected equations have exactly one zero there.

Plainly: the whole coupled box contracts to the known T04 point. There is no second selected-equation zero along a mixed phase-radius direction inside that box.

## Full-vector discharge

The accepted scalar T04 bracket lies strictly inside the coupled speed interval and supplies one regular equal-radius zero. Interval-Newton uniqueness identifies it as the only selected-row zero. At that point, rotation through $\pi/3$ followed by the global polarity-label flip preserves every polarity product, causal equation, and acceleration contribution. Exact covariance makes all six tangential projections vanish and all six equal-radius coefficients $s_i$ coincide. Direct interval evaluation of all twelve compatibility rows over the accepted scalar bracket contains zero in every row, with maximum enclosure width below $1.21\times10^{-29}$.

Therefore the regular equal-radius T04 balance is the unique full-vector zero in the declared coupled box, and no nonregular phase-radius branch passes through that neighborhood.

Plainly: every row required for a common-rate circular balance is settled at the one point allowed by interval Newton. The result excludes both asymmetric slices and mixed diagonal departures inside the declared box.

## Reproduction and boundary

Run:

```bash
"${AAA_VENV:-../.venv}/bin/python" scripts/equation-mapping/certify_planar_three_binary_coupled_box.py
```

The coupled certificate script is frozen at SHA-256 `b238a0669a06ac64d985569e75740d7eddb3817f64b69ddd48d56c4f17a1b3bc`. Two consecutive runs produced byte-identical standard output at SHA-256 `30f9af9ec1f382fa18ecca92ebe0aa706fe47823dae13d291a63c7e517db03b5`.

The shared interval-root implementation is frozen at SHA-256 `74ef263449da4f74a8556914db32bd4222057b23d7c8934a911b4e7c2073cc5a`. The source configuration, accepted phase certificate, and accepted scalar theorem evidence remain frozen respectively at SHA-256 `569902016197cdbea29082ffd1fcf3881d962f5c1cba26f3eeb56dcdcaa2e7a8`, `916e65532efbed3d543a75ba74c4f93d0d1fd9b95ff8c4f16f825866af307fec`, and `1669066391ac4ba783be843b7f77fa11d3d9c3332085d3cbea570b8cc2ae3e54`.

The $10^{-6}$ box is the accepted claim boundary. A wider $2\times10^{-6}$ trial failed closed because the fifth interval-inverse pivot contained zero; that arithmetic failure is neither evidence of a branch nor a counterexample. This certificate establishes no wider planar-chart census, disconnected branch result, evolution, retention, stability, binding, physical identity, score, or scientific acceptance. A changed frozen input, missed or misowned root, complement zero, collision at an accepted root, causal fold, zero-containing transmitter factor, singular Jacobian inside the accepted box, escaping Newton image, invalid scalar bracket, failed covariance argument, or independently certified nonregular full-vector zero inside the box falsifies the result.

Closure goal: retain the coupled local-isolation theorem as the T04 neighborhood result and route any wider planar search as a separate compact-chart census rather than as unfinished local closure.
