# Fold Parent `w` Positive-Overlap Subdivision Attempt

## Scope

This packet continues the `w` parent-complement lane after `fold_parent_endpoint_w_closure_attempt.md`. It attempts a finer subdivision of the six remaining `w` strips rejected there:

- five strips with positive-width null-coordinate overlap;
- one strip with an endpoint-scale diagnostic gap that was not accepted after outward rounding.

Sources read:

- `fold_parent_complement_partition_attempt.md`
- `fold_parent_endpoint_w_closure_attempt.md`
- `fold_parent_boundary_complement_packet.md`
- `mesh_refined_preledger_v1.json`
- `causal_preledger_interval_report.md`

This packet does not edit `causal_ledger.json`, `fold_layer_atlas.json`, `branch_chart.json`, `pass_fail_ledger.md`, or any `u` lane file.

## Verdict

Rejected as a parent-row consumption certificate.

The finer subdivision identifies explicit inverse-threshold equations for the remaining `w` overlap strips. It can separate diagnostic empty regions from equality-bearing cores, but every equality-bearing core still has positive-width overlap in the null coordinate. The artificial split thresholds are actual positive-depth equality thresholds, not causal self-interaction or zero-depth endpoints. Therefore they cannot be deleted by the Route A endpoint-exclusion convention.

No additional simple-root subrow is accepted under the fixed pre-ledger simple-root margin
$$
\gamma_{\mathrm{cov}}=0.005.
$$
One strip, `R_w_A2_A1/receiver_left`, has a diagnostic simple-root-like coverage margin of only
$$
1.614412241202067833\times 10^{-4},
$$
which is positive but below the fixed margin. The other equality cores have zero coverage margin at at least one boundary if taken as complete complement-covering rectangles.

Therefore no `w` parent row can be consumed.

| Question | Answer |
| --- | --- |
| Exact verdict | Rejected. |
| Strict-empty pieces certified for parent consumption? | No. Diagnostic empty subregions can be named, but their closures meet positive-depth equality thresholds, so no closed strict $\Delta^w_B>0$ complement is produced without leaving a positive sliver unresolved. |
| Endpoint-excluded pieces added? | No. The new threshold contacts are positive-depth equality contacts, not accepted endpoint exclusions. |
| Additional simple-root subrows accepted? | No. No remaining strip supplies a complete complement-covering simple-root rectangle with $\gamma_{\mathrm{cov}}\ge 0.005$. |
| Can any parent row be consumed? | No. |
| Are live ledger updates authorized? | No. |

## Coordinate And Threshold Rule

The coordinate used in the source packets is
$$
w(\theta)=2\pi\theta+1.25\cos(2\pi\theta).
$$
On regular intervals away from $\Sigma_1$ and $\Sigma_2$,
$$
w'(\theta)=2\pi\bigl(1-1.25\sin(2\pi\theta)\bigr)
$$
has fixed sign, so inverse thresholds are well-defined on the listed monotone intervals.

For a receiver interval $R$ and source interval $S$, the equality-bearing value core is
$$
O_{R,S}=w(R)\cap w(S).
$$
If $O_{R,S}=[a,b]$ has positive width, the corresponding inverse thresholds solve
$$
w(\theta_r)=a,\quad w(\theta_r)=b,\quad
w(\theta_s)=a,\quad w(\theta_s)=b
$$
on the appropriate receiver and source monotonicity branches. Subdivision by these thresholds can name regions with no equality, but it does not by itself produce a closed strict-gap certificate when the threshold boundary is an actual positive-depth equality point.

## Subdivision Table

| Parent row | Strip | Inverse thresholds used | Diagnostic subdivision result | Accepted outcome |
| --- | --- | --- | --- | --- |
| `R_w_A1_A0` | `receiver_left` | $\rho_{10}=0.160536675649330$, where $w(\rho_{10})=w(0.135083617650)=1.674902497689390$; $\sigma_{10}=0.125869003963000$, where $w(\sigma_{10})=w(0.170709367399)=1.669902497689657$. | Diagnostic empty regions lie to the left of $\rho_{10}$ in the receiver or below $\sigma_{10}$ in the source. The remaining core $[0.160536675649330,0.170709367399]\times[0.125869003963000,0.135083617650]$ has positive-width overlap $[1.669902497690,1.674902497689]$. | Rejected. Positive-width core remains; no endpoint deletion is legal at $\rho_{10}$ or $\sigma_{10}$. |
| `R_w_A1_A0` | `source_left` | $\rho_{11}=0.339916382346199$, where $w(\rho_{11})=w(0.041038833440)=1.466528714677615$; $\sigma_{11}=0.041038833439689$, where $w(\sigma_{11})=w(0.339916382350)=1.466528714676283$. | The residual core has endpoint-scale but positive diagnostic width: $\Delta w=1.331823540340337786\times10^{-12}$, with receiver width $3.800959547106685932\times10^{-12}$ and source width $3.110775526060649554\times10^{-13}$. | Rejected. Endpoint-scale positive-width overlap is not finite endpoint contact. |
| `R_w_A2_A0` | `receiver_right` | $\rho_{20}=0.458923441955692$, where $w(\rho_{20})=w(0.135083617650)=1.674902497689390$; $\sigma_{20}=0.125869003963000$, where $w(\sigma_{20})=w(0.457747116028)=1.669902497689657$. | Diagnostic empty regions lie above $\rho_{20}$ in the receiver or below $\sigma_{20}$ in the source. The remaining core $[0.457747116028,0.458923441955692]\times[0.125869003963000,0.135083617650]$ has positive-width overlap $[1.669902497690,1.674902497689]$. | Rejected. Positive-width core remains; no endpoint deletion is legal at $\rho_{20}$ or $\sigma_{20}$. |
| `R_w_A2_A0` | `source_left` | No positive-overlap inverse threshold is available. The diagnostic separation is $w(0.364916382350)-w(0.041076558044)=1.317168596415285720\times10^{-12}$. | The whole strip is a diagnostic strict-empty candidate, but the gap is endpoint-scale and was already not accepted after outward rounding. | Rejected. No certified strict outward-rounded gap is recorded here. |
| `R_w_A2_A1` | `receiver_left` | $\sigma_{21}^{-}=0.339463324350670$, where $w(\sigma_{21}^{-})=w(0.364916382350)=1.466690155900404$; $\sigma_{21}^{+}=0.329553995645000$, where $w(\sigma_{21}^{+})=w(0.373898811563)=1.471528714676480$. | Source values outside $[0.329553995645000,0.339463324350670]$ are diagnostic empty. The core $[0.364916382350,0.373898811563]\times[0.329553995645000,0.339463324350670]$ has positive-width overlap $[1.466690155900,1.471528714676]$. | Rejected. It is a diagnostic simple-root-like candidate only with lower coverage margin $1.614412241202067833\times10^{-4}<0.005$, so it is not accepted under the current simple-root margin. |
| `R_w_A2_A1` | `receiver_right` | $\rho_{22}=0.458961166560311$, where $w(\rho_{22})=w(0.160083617650)=1.675063938913510$; $\sigma_{22}=0.170446004355000$, where $w(\sigma_{22})=w(0.457785341387)=1.670063938913313$. | Diagnostic empty regions lie above $\rho_{22}$ in the receiver or above $\sigma_{22}$ in the source. The remaining core $[0.457785341387,0.458961166560311]\times[0.160083617650,0.170446004355000]$ has positive-width overlap $[1.670063938913,1.675063938914]$. | Rejected. Positive-width core remains; no complete simple-root rectangle has positive coverage margin at both ends. |

## Simple-Root Subrow Check

An additional simple-root subrow would have to preserve strict source and receiver monotonicity, positive memory depth, and a source-coverage margin compatible with the fixed refinement parameter
$$
\gamma_{\mathrm{cov}}=0.005.
$$
The monotonicity floors are not the blocker on these regular strips; the blocker is coverage margin and complete complement coverage.

| Strip | Simple-root diagnostic | Coverage blocker |
| --- | --- | --- |
| `R_w_A1_A0/receiver_left` | Equality graph exists on the residual core. | Complete core has zero upper source-coverage margin at $w=1.674902497689390$. |
| `R_w_A1_A0/source_left` | Endpoint-scale equality graph exists on the residual core. | Complete core has endpoint-scale width and zero boundary margin after closed complement ownership. |
| `R_w_A2_A0/receiver_right` | Equality graph exists on the residual core. | Complete core has zero upper source-coverage margin at $w=1.674902497689390$. |
| `R_w_A2_A0/source_left` | No equality graph is certified after outward rounding. | Diagnostic gap is too small to accept as a strict certificate. |
| `R_w_A2_A1/receiver_left` | Equality graph is well-behaved on the residual core. | Lower source-coverage margin is only $0.0001614412241202067833$, below $0.005$. |
| `R_w_A2_A1/receiver_right` | Equality graph exists on the residual core. | Complete core has zero upper source-coverage margin at $w=1.675063938913510$. |

Shrinking any residual core can create an interior diagnostic simple-root rectangle with positive margin, but the discarded edge slivers still have positive-width overlap. Since this packet is a complement-consumption attempt, that does not consume the parent row.

## Parent Row Consumption

| Parent row | Previously accepted endpoint-only strips from `fold_parent_endpoint_w_closure_attempt.md` | New result from this packet | Parent row consumption |
| --- | --- | --- | --- |
| `R_w_A1_A0` | `source_right` | `receiver_left` and `source_left` remain rejected. | Not consumed. |
| `R_w_A2_A0` | `source_right` | `receiver_right` remains rejected; `source_left` remains uncertified after outward rounding. | Not consumed. |
| `R_w_A2_A1` | `source_left`, `source_right` | `receiver_left` and `receiver_right` remain rejected. | Not consumed. |

The exact remaining obligation on the `w` parent rows is unchanged in live-ledger terms: each remaining complement must be closed by a true strict outward-rounded gap, accepted fold-layer-family coverage, or a valid endpoint-excluded complement. This packet supplies no authorization to update `causal_ledger.json`, `fold_layer_atlas.json`, `branch_chart.json`, `pass_fail_ledger.md`, or any live pre-ledger state.
