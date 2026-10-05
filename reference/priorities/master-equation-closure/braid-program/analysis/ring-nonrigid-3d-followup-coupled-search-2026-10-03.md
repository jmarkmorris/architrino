# Coupled finite-amplitude nonrigid ring search

Date: 2026-10-03. Assignment: Nonrigid three-dimensional ring, disconnected coupled-waveform attempt; William Thurston lens, stable worker `/root/ring_stability`. Scenario: unchanged baseline Master Equation, $K=c_f=1$, every positive-delay root including all ordinary self hits. **Status: six-start search and two coupled complete-period negative subjects frozen for separate adjudication; no exact three-dimensional structure claimed.** Previous subjects, instruments and adjudications are frozen. Shared owners and both indexes belong to the coordinator.

## Complete candidate and unknowns

Consume the [declared all-time nonrigid class](ring-nonrigid-3d-followup-2026-10-03.md#candidate-complete-histories-and-unknowns), its full vector residual and the [independently accepted local/two-trial limitations](ring-followup-axis-independent-adjudication-2026-10-03.md). The new finite Fourier proposal is

$$
\varphi=\nu T,\quad r=R\rho(\varphi),\quad p=\psi(\varphi),\quad z=R\zeta(\varphi),\quad\Omega=\beta/R,\quad\nu=\kappa/R,
$$

$$
\rho=1+a\cos2\varphi+b\sin2\varphi,\qquad\psi=c\cos2\varphi+d\sin2\varphi,
$$

$$
\zeta=H\cos\varphi+e\cos3\varphi+f\sin3\varphi.
$$

The complete histories are smooth and bounded for every absolute past and future time. The constant angular phase and fundamental height phase are gauges. The fundamental height ratio is fixed successively at $H=0.05,0.15,0.30$, so a fit cannot remove the nonzero deformation by setting that coefficient to zero. No small-amplitude differentiable continuation through a flat ring is assumed. This is a search for finite-amplitude complete relative-periodic histories in a specific Fourier slice, not a proof that its fixed-height slices are connected or disconnected from all other exact histories.

Unknowns are $a,b,c,d,e,f,\beta,\kappa$ and positive $R$. Bounds are $|a|,|b|\le0.20$, $|c|,|d|\le0.12$, $|e|,|f|\le0.10$, $1.40\le\beta\le4.80$ and $0.40\le\kappa\le12$. Thus $\rho\ge0.6>0$. Numerical starts use the admitted T02/T04 circular speeds only as seeds and set deformation rates $\kappa=3,7$ respectively. No balance or spectrum is assigned to these finite profiles before admission.

## Full equation in dimensionless delay

Use $\delta=d/R$, source phase $\varphi_- =\varphi-\kappa\delta$ and $\gamma=j\pi/3-\beta\delta+\psi(\varphi_-)-\psi(\varphi)$. The dimensionless separation and physical source velocity are

$$
Q=(\rho-\rho_-\cos\gamma,-\rho_-\sin\gamma,\zeta-(-1)^j\zeta_-),
$$

$$
V=(\kappa\rho'_-\cos\gamma-\rho_-(\beta+\kappa\psi'_-)\sin\gamma,
\kappa\rho'_-\sin\gamma+\rho_-(\beta+\kappa\psi'_-)\cos\gamma,
(-1)^j\kappa\zeta'_-).
$$

Primes here differentiate deformation phase. Every positive solution of $|Q|=\delta$ contributes $(-1)^jQ/(\delta^3|D|)$ to the dimensionless acceleration sum $A$, with $D=1-Q\cdot V/\delta$. The demanded dimensionless path acceleration is

$$
L=(\kappa^2\rho''-\rho(\beta+\kappa\psi')^2,
2\kappa\rho'(\beta+\kappa\psi')+\rho\kappa^2\psi'',\kappa^2\zeta'').
$$

The full equation is the three-component FUNCTION $RL(\varphi)-A(\varphi)=0$ at every phase. These three components determine all eighteen member components by the exact rotation/reflection/polarity covariance already declared. The finite geometric delay bound is $2\sqrt{(1+|a|+|b|)^2+(H+|e|+|f|)^2}$, not an imposed root cap.

The point proposal instrument fits positive $R$ by the full-vector least-squares scalar $\sum A\cdot L/\sum |L|^2$, then optimizes all other unknowns against all three residual components at sixteen uniform phases. It uses one scalar normalization for the entire residual and cannot discard an inconvenient component. Each final proposal is reprobed at sixty-four phases with a denser delay chart. Even radial/phase and odd height harmonics give exact half-period reflection, so the reduced radial/tangential residuals are $\pi$-periodic and the axial residual is $\pi$-antiperiodic.

## Admission boundary and controls

The new [floating proposal instrument](../../../../../scripts/braid-program/ring_nonrigid_3d_followup_coupled_proposal_20261003.py) partitions the finite delay interval using proposed stationary points of the squared gap before finding zeros. This improves narrow root-pair detection over a sign-only delay grid. It is still a numerical proposal: its stationary partition, root counts and transmitter margins are not outward proofs of completeness. Near-zero ordinary divisors and nonpositive fitted scales make a point proposal invalid; such failures imply no geometric exclusion.

Before targets it passes the analytical static flat and puckered six-member acceleration sums, including no self root at rest and exactly one partner root per channel, and a known two-variable bounded least-squares solution. The known static test exposed an exact endpoint root at the geometric range bound; endpoint handling was corrected before any target, and all controls rerun under the final source identity. The admitted flat T02/T04 full-vector residual and 8/12 root censuses also pass as secondary known-reference controls after the analytical controls. A target cannot run without a matching successful known receipt.

A numerical fit can become an exact candidate only after a fresh outward full-phase root/complement census and proof that the full three-component residual vanishes for every phase. A small collocation residual is insufficient. If no candidate is admitted, the result will record the exact searched box, numerical progress, residual reach and any certified bounded trial rejection or root-chart obstruction, while retaining arbitrary coupled waveforms as open. Optimizer nonconvergence is not nonexistence.

**Falsifiers:** an omitted positive-delay root, incorrect source velocity or symmetry, failed analytical control, larger residual or different point counts on a finer proposal chart, a failed outward full-phase admission, or an exact waveform elsewhere in the stated box overturns its affected claim. The last observation would defeat a box exclusion, which this numerical search does not claim in advance.

## Measured six-start search

**Measured numerical proposals, not an exhaustive search or an exact-balance verdict:** the controlled floating search completed all six starts, using 1146 actual residual evaluations. Five fits stopped at the optimizer's relative-improvement condition; the height-0.30 T04-seeded fit reached the declared maximum of 35 main evaluations. No point was invalidated by the proposal's near-divisor or nonpositive-scale guards. None produced a small full-vector residual. The table gives residuals of $RL-A=R^2\mathcal E$, rather than unscaled physical acceleration; normalization is the single full-vector scalar specified by the instrument.

| Fundamental height ratio $H$ | Seed | Fitted $R$ | 64-phase scaled-vector RMS | Normalized RMS | Point-proposed roots per receiver |
| --- | --- | ---: | ---: | ---: | ---: |
| 0.05 | T02 | 0.9679831713 | 0.104911485 | 0.036483340 | 8 |
| 0.05 | T04 | 0.5499564571 | 0.249647945 | 0.064937368 | 12 |
| 0.15 | T02 | 0.8975351526 | 0.290453052 | 0.102628261 | 8 |
| 0.15 | T04 | 0.4709016538 | 0.715192683 | 0.193051269 | 12 |
| 0.30 | T02 | 0.6580584707 | 0.495686937 | 0.188155252 | 8 |
| 0.30 | T04 | 0.2640988346 | 1.139563306 | 0.359608538 | 12 |

These point counts remained the same at all sixty-four reprobed phases for each trial. They remain proposals until a separate outward all-phase census is admitted. Residuals are deliberately not extrapolated between collocation phases or interpreted as whole-box lower bounds. No uniqueness, disconnected branch census, optimizer-global-minimum or absence theorem follows.

The best fit and the stronger-coupled height-0.30 T02-seeded fit are selected as complete prescribed trial histories. For outward admission, the following literal decimal parameters, not unspecified floating approximations, define them:

| Parameter | `H0.05-T02` | `H0.3-T02` |
| --- | ---: | ---: |
| $R$ | 0.967983171307613 | 0.6580584707407016 |
| $H$ | 0.05 | 0.3 |
| $a$ | -0.0006426342458097946 | -0.022108749541418293 |
| $b$ | -0.0007403170283258089 | -0.009730406946934585 |
| $c$ | 0.000833189499455911 | 0.026764608027415038 |
| $d$ | 0.0006618450377634468 | 0.031541564774576286 |
| $e$ | -0.000012664436449874059 | -0.000523072629886091 |
| $f$ | -0.0000494999757834568 | -0.009132869554450192 |
| $\beta$ | 1.8253670387612964 | 1.7884816024562529 |
| $\kappa$ | 3.1508514715501175 | 3.1458121896982436 |

In particular the second profile has a radial modulation amplitude of about 2.4% and nonzero phase feedback, alongside its 30% fundamental height ratio. Neither is a fixed-radius sinusoidal test, an evolved history or an exact structure.

The proposal instrument and its successful known receipt were fixed before the target. Owned run `7d69b949-cfe6-4b9a-827d-cced277febe7` completed in 74.821 supervised wall seconds, exit zero, no stderr, process group closed; its scientific timer reports 74.579 seconds. Its declared deadline was 900 seconds, with 15-second advancing supervisor heartbeats and scientific progress receipts at intervals of roughly ten seconds.

## Complete all-period chart and full vector residual

**Computer-assisted derived subject, frozen for separate adjudication:** both selected literal-decimal complete histories have exactly eight ordinary positive-delay hits per receiver throughout all modulation phases, hence 48 directed hits including six positive-delay self hits. Every row retains its signed transmitter factor and none is dropped or capped. Both have a strictly nonzero full-period residual, so neither is an exact solution. This is a bounded prescribed-history result, not a stability or evolved-motion result.

The [final outward instrument](../../../../../scripts/braid-program/ring_nonrigid_3d_followup_coupled_refined_certificate_20261003.py) reconstructs the full nonlinear geometry, source velocity, squared causal gap and its exact delay derivative for every source. Floating stationary partitions propose root boxes only. For each entire receiving-phase interval, strict opposite gap endpoint signs and a derivative excluding zero give exactly one root in each box. Every complementary delay interval has a strict signed gap or a strict derivative with same-signed endpoints, otherwise it is subdivided. No complement leaf is excluded by a finite phase sample. Newton refinement preserves the already-admitted root for every parameter phase and does not replace existence or completeness with a point solve.

For the self origin, define $r_-=1-|a|-|b|$, $w_-=\beta-2\kappa(|c|+|d|)$ and $v_-=r_-w_->1$. The global dimensionless path acceleration cap $a_+$ is built from

$$
|L_r|\le4\kappa^2(|a|+|b|)+r_+w_+^2,\quad
|L_t|\le4\kappa(|a|+|b|)w_++4r_+\kappa^2(|c|+|d|),
$$

$$
|L_z|\le\kappa^2[H+9(|e|+|f|)],\quad r_+=1+|a|+|b|,\quad w_+=\beta+2\kappa(|c|+|d|).
$$

Project the recent source secant onto the current unit velocity direction. Lipschitz continuity of the velocity gives range over delay at least $v_--a_+\delta/2$. Both trials have this bound strictly above one throughout $0<\delta\le0.005$, excluding every recent self hit in that punctured interval. It is a proof at the origin, not a self-root cutoff. Partner complements start at zero; their noncoincident geometry is included directly in the signed gap cover. Beyond the exact finite geometric range bound there are no roots. A padded chart endpoint is used only to make its last complement interval strictly negative, not to alter the all-past equation.

The even/odd Fourier parity supplies exact half-cycle reflection: at $\varphi+\pi$, the radial and phase waveforms agree, height and vertical velocity change sign, the causal gap and transmitter factor agree, planar acceleration/residual agrees, and axial acceleration/residual changes sign. Thus an outward cover of $[0,\pi]$ plus that identity covers the complete $[0,2\pi]$ residual and root census, and repeats for the complete relative-periodic past and future. This is a full eighteen-component vector equation reduced by exact covariance, not one phase or a selected scalar balance.

| Trial | Half-cycle root-chart cells | Complement leaves | Directed hits / self | Conservative full-period $|D|$ lower bound | Self secant over delay lower bound |
| --- | ---: | ---: | ---: | ---: | ---: |
| `H0.05-T02` | 64 | 3742 | 48 / 6 | 0.18468 | 1.80477 |
| `H0.3-T02` | 257 | 20021 | 48 / 6 | 0.0028003 | 1.35671 |

The displayed lower bounds are conservative outward decimal bounds. The strong trial's point-probed transmitter minimum is not substituted for its much looser admitted all-phase bound. No singular divisor or omitted-root obstruction is observed within either proved chart. Those facts do not make the history a solution: its demanded and supplied accelerations must also agree.

The instrument evaluates all three components of $\mathcal R=RL-A=R^2\mathcal E$ in every admitted phase cell. The Fourier coefficients are bounded by interval integration over the whole cycle. Planar components use their second harmonic and the axial component its first harmonic; exact reflection reduces each normalized coefficient to twice the corresponding half-cycle integral divided by $\pi$. A phase cell contributes its full interval residual times its full interval sine or cosine and its exact fractional length. It makes no trapezoid-error assumption about an unknown path.

The stronger trial's coarse root-chart cells were sufficient for complete census but insufficient for a signed Fourier witness. The new final instrument therefore saves the full admitted chart **before** its residual witness guard. It then subdivides each admitted phase cell four ways, refines the same owned roots on each smaller phase interval, and evaluates the full vector residual again. This refinement inherits the already-proved complete complement and adds no new selected-root assumption. All 1028 half-cycle residual subcells are retained with their parent root-chart indices. The first trial needed no further subdivision.

| Trial | Half-cycle residual integration cells | Axial cosine coefficient of $R^2\mathcal E$ | Axial sine coefficient of $R^2\mathcal E$ |
| --- | ---: | --- | --- |
| `H0.05-T02` | 64 | $[0.0363678,0.1212942]$ | $[0.1964314,0.2883508]$ |
| `H0.3-T02` | 1028 | $[-0.0739949,0.4863623]$ | $[0.5804387,0.9701206]$ |

All displays are rounded outward; exact binary endpoints in the receipts govern. The strong cosine interval remains unresolved, while its sine interval is strictly positive. A nonzero Fourier coefficient of the full residual excludes an identically zero complete-history residual. The code also retains all planar residual intervals and their mean and second-harmonic bounds. It does not silently replace the vector balance with an axial equation or assign a spectrum to these imbalanced histories.

These are two sharp finite trial negatives. They do not exclude the declared Fourier box, other starts, additional harmonics, different root topologies, arbitrary coupled functions, a disconnected exact branch or a persistent nonrigid structure elsewhere. Relative periodicity of prescribed paths is not autonomous persistence. There is no new exact balanced locus and no retained evolved motion in this result.

## Controls, provenance and validation

The final outward instrument passes its own analytical controls before targets: the static squared causal root at two and complete complement on $[0,3]$; the analytical static puckered six-member full Cartesian acceleration; root refinement and the residual-only refinement of that static case; an exact affine interval integral; and the exact normalized half-cycle sine integral. The final known receipt was recorded at `2026-10-04T03:41:05Z`, before the final target began at `03:41:24.275Z`. These controls establish agreement with independently known analytical cases; they do not count as an independent review of the target.

The original coarse outward [instrument](../../../../../scripts/braid-program/ring_nonrigid_3d_followup_coupled_certificate_20261003.py) and its known receipt are preserved. Its run `e8700398-847c-4c32-88a8-7009e3ee2e1d` stopped at an unresolved strong-trial Fourier witness after 151.412 wall seconds, despite complete root-chart admission. That is a failed sufficient residual enclosure, not a physical exclusion, optimizer failure or fold event. A new instrument was constructed rather than editing the earlier source or accepting that unresolved witness. Final complete charts are separately preserved before the witness guard, and the final fourfold refinement succeeds.

Owned final run `4e48fa19-96ff-4512-9706-d3f055295abd` completed in 198.548 supervised wall seconds, exit zero, no stderr, process group closed, with advancing fifteen-second supervisor heartbeats and ten-second mathematical progress records. The scientific timer reports 197.088 seconds. Its deadline was 900 seconds. All Python work uses the shared venv; final outward arithmetic uses 80 interval digits and authoritative binary endpoints. Shared-venv `py_compile` passes for the three new scripts, and `git diff --no-index --check /dev/null` emits no whitespace errors for those scripts or this owner. All three owned coupled-search leases report terminal status and closed process groups; none of these jobs remains live. Writes were confined to the assigned new analysis/scripts and local evidence, preserving prior subjects/oracles and shared owners, indexes, scores, ranks, qualification and publication state.

| Immutable artifact | SHA-256 |
| --- | --- |
| Floating proposal instrument | `b1494537bc472e7c68e3b0fc272b45178f4e8e254e681af33bca994e0a746721` |
| Proposal known | `41272011bfd7e0de1d9d360d9434691833e3ce7760c452f5324704f6bc56eda2` |
| Proposal six-start target | `4fde821cd2ebfc3e3161deb4f28af5e665c0e75dcc17ba298ca4ece0ce965678` |
| Preserved coarse certificate instrument | `68dfd37c1380ff807aaad365593f0ee214477becccb9191a1aaa5f9da758233b` |
| Preserved coarse known | `e59ae97d5d8acd5ec640d915d71e60887bea4b874392e3262da896fac8978407` |
| Final refined certificate instrument | `348ed31437cc19b5fd303737ccd8f1601240f757a055672127b4e296ba047687` |
| Final refined known | `9ef65757771c11a00979f317dfa99657175f33275be01845d914bb6e5bca9151` |
| Complete `H0.05-T02` chart before residual guard | `e824df339064225dc0fea55d8f4db3cf4d56af42eda2296e501de534b3835465` |
| Complete `H0.3-T02` chart before residual guard | `a874b5f32f5d991c1d5f7ef4fc474ee2f3a1644db0d924276e2760bc9a397338` |
| Final `H0.05-T02` certificate | `f6f7f34de6b214fa4785a7dab42f118792f47dc7145b36b0d46a9afb362a5abd` |
| Final `H0.3-T02` certificate | `23b7cd086203b47c32429eb39d5ab47f24e487e4a62452bc3327865cf1970ab4` |
| Final combined certificate | `4cf7978c3e47e91642378eb4ec8340dac4545e1bd85487d8f97f5075534d465b` |

Local binary receipts are retained under `.local-data/ring-followup/geometry/coupled-search/`. The final certificate instrument imports its own preserved proposal code for root-box proposals only and authenticates that dependency. Its rigorous gap, derivative, complement, secant guard, velocity, kernel, demand and Fourier bounds are computed anew outward; this relationship is not independent adjudication. The two instruments agree only at their stated proposal/certificate boundary. A separately authored absolute-Cartesian full-residual check at an admitted phase can independently reject either complete history without claiming the whole-period chart or Fourier numbers; those narrower and wider verdicts must remain separate.

## Remaining scope and recommended next action

No exact nonrigid three-dimensional structure was found in this bounded coupled search. It exercised genuine finite radius/phase feedback and obtained two complete-period prescribed-history negatives, while retaining the larger functional question. No stability statement is made about the trial histories. The earlier local imaginary-axis obstruction remains restricted to differentiable branches with nonzero leading axial variation and bounded limiting frequency.

1. **Independently adjudicate the bounded history negatives.** Recommended immediately. A direct absolute-Cartesian reception-time calculation with a complete independent census and strict full residual is enough for rejection; a separate all-phase construction is needed to accept the wider chart and Fourier certificates.
2. **Change the search basin before increasing iteration counts.** Recommended for the next explicitly authorized search. The present starts use only two circular speeds and zero radial/phase coefficients at three fixed heights; a bounded multi-start search seeded with substantial radial/phase harmonics, other speed cells or another admitted ordinary root topology would ask a genuinely different finite-amplitude question. No successful basin census is supplied here.
3. **Increase harmonic freedom only with a complete-period admission gate.** Recommended conditionally if a new basin gives a substantially smaller full vector residual. Additional even radial/phase and odd height harmonics can be proposed, but a finite Fourier fit must still justify all residual harmonics and every positive-delay root before exact acceptance. Mere optimizer termination, low collocation error or prescribed recurrence is insufficient.

**Closing falsifiers:** a wrong dimensionless scaling, source velocity, fixed-sign baseline kernel, half-period/member covariance, secant bound, unexcluded complement interval, invalid root refinement, quadrature weight or outward endpoint defeats its affected certificate. An exact solution at another point in the searched box does not contradict these two trial negatives; it would instead resolve part of the still-open search. The frozen binary charts, all vector residual cells and separate adjudication are the operator-checkable evidence.
