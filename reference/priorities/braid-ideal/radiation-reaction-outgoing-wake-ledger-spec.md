# Radiation-Reaction / Outgoing-Wake Angular-Momentum Ledger — Scope (the (b) Reframe)

Claim level: scoping packet / reframe. This packet defines the object the §70–§75 local-sink no-go forces: the middle rail pump's un-absorbed residual is not a *local sink shortfall* but the **outgoing-wave angular-momentum flux the steady braid radiates to the far field**. It defines the ledger, the steady-state balance, the crux physics, the measurables, and what building takes. It does **not** claim the balance closes — it scopes the test. Central solver `AbsoluteHistoryRootRuntime.mjs` untouched; runner + fixture only when built. Fail-closed: `retainedBranchClaim=false`, `scoreMovement=no_score_increase`.

## Why this reframe is forced (the airtight predecessor)

The §70–§75 arc measured every way the un-absorbed middle rail pump ($\approx0.076$, the $1/3$ the native self-hit brake leaves, §66) could be shed as a **local sink** into a braid-organized environment, and closed all of them:

| channel | disposition | § |
|---|---|---|
| local equatorial sea brake | barred in principle (exact $m{=}0$ + static $Q<10\%$ + dynamical χ″ $5$–$15\times$ short) | 70 |
| transport off-equator + dissipative drain | transport opens (§72) but the drain is χ″-starved $\approx10\times$ | 73 |
| conservative co-orbital sink | zero secular transfer | 74 |
| native nonlinear/saturable χ″ | multiple $1.06$, no $10\times$ — structural bound | 75 |

The unifying finding: **secular angular-momentum shedding from the braid to any braid-organized, neutral, orientational near-field environment is χ″-limited, and the sea's χ″ is intrinsically $\approx10\times$ too weak** (§75 sealed this above seed grade — a bounded orientational rotator's dissipative lag is capped, not a linear-estimate artifact). So the residual **cannot** be a local near-field sink. What remains is the one channel the whole arc excluded by construction (each instrument used a bounded near-field environment): the **far field** — the outgoing wake carrying angular momentum to infinity. This packet reframes the residual as that flux.

## The ledger (the continuity equation)

Let $S_{\rm braid}$ be the braid's spin angular momentum about $\hat n$. The steady-state balance is a **continuity equation**, not a force balance:

$$
\frac{dS_{\rm braid}}{dt} \;=\; \underbrace{\dot S_{\rm pump}}_{\text{near-field source}} \;-\; \underbrace{\dot S_{\rm self}}_{\text{internal recirculation}} \;-\; \underbrace{\Phi_\infty}_{\text{far-field wake flux}} \;=\; 0 \quad(\text{steady state}).
$$

- **$\dot S_{\rm pump} = +0.2274$** — the near-field rail pump (the anti-damping tangential self-force at the $\beta_M=1$ rail, §60).
- **$\dot S_{\rm self} = 0.667\times\dot S_{\rm pump} = +0.1517$** — the internal recirculation: the native self-hit brake, the braid's own wake catching itself and returning $2/3$ of the pump to the near field (§66).
- **$\Phi_\infty$** — the outgoing-wave angular-momentum flux through a large sphere: the true sink. Steady state requires $\Phi_\infty = \dot S_{\rm pump} - \dot S_{\rm self} = \mathbf{+0.076}$.

The reframe: the $\approx0.076$ "deficit" is $\Phi_\infty$ — the angular-momentum current that flows **through** the near field and **out** to the far field, a steady throughput, not an accumulation. The Row-7 "coherent expansion" (§60) was the bare rigid-release **trapping** this current (the rigid + rail-pin dynamics converted the outward flux into radial expansion) instead of letting an open far-field boundary carry it away.

## The crux (three questions the ledger must resolve)

**Crux 1 — the sign and magnitude of the far-field radiation reaction.** An outgoing wave from a rotating source carries positive angular momentum in the sense of rotation, so its reaction on the source is a **brake** ($-$). The near-field pump residual is anti-damping ($+0.076$). For steady rotation the far-field brake must equal $-0.076$. **Test:** is the far-field radiation reaction of the braid's wake a brake, and is its magnitude $\approx0.076$ — exactly the residual? If yes, the near-field anti-damping pump and the far-field radiation brake are two parts of one self-field that **balance at the steady configuration** (total self-torque zero), and S1/S2 closes with no environment and no new ingredient — the braid is a **self-consistent radiating structure**.

**Crux 2 — the steady-state / spin-down reconciliation.** If the braid radiates $+0.076$ of angular momentum to infinity, it appears to spin down — inconsistent with a stable particle. Three candidate resolutions, to be decided by the measurement:
1. **Light-cylinder pin (leading).** The rail is pinned at $\beta_M=1$ — exactly the field-speed "light cylinder," the boundary between bound (non-radiating) near field and radiating far field (§11–12 two-sided attractor). At this marginal point the **net** far-field angular-momentum flux may be **zero** (bound standing structure, no traveling-wave loss), and the $+0.076$ is a purely **reactive** near-field term that does zero net work when the full field (near + marginal far) is accounted. The pin holds the braid exactly where it does not radiate net — the field-speed pin is then *also* the no-spin-down condition. This makes the residual a bookkeeping artifact of a near-field-only ledger.
2. **Self-consistent radiating soliton.** The braid genuinely radiates and is genuinely braked, but its rotation is **re-supplied** by the near-field pump extracting angular momentum from the field structure; the steady state is a flow (rotational reservoir → near field → far field) that holds because the pump and radiation brake balance at a fixed radius — a dissipative soliton. Requires an angular-momentum source for the pump (the crux of whether this is truly steady).
3. **Radiative detailed balance with the ambient bath.** The braid radiates $0.076$ and absorbs $0.076$ of **incoherent ambient wake** from the far-field radiation bath (the isotropic Noether-sea/CMB-like background) — matter as an open system in radiative equilibrium (brainstorming entry 32, "respiration," now at the far-field radiation level, distinct from the near-field directed χ″ the §70–§75 no-go bounded). Gives testable consequences: matter in radiation-starved regions (deep voids) is under-supported.

**Crux 3 — is $\Phi_\infty$ a genuine secular (traveling-wave) flux, not a reactive near-field oscillation?** The §74 lesson: a conservative/reactive coupling gives zero net cyclic transfer; only a genuine lagged/traveling channel carries secular flux. The measurement must separate the traveling-wave (radiated, secular) part of $\Phi_\infty$ from the reactive (bound, oscillating, zero-net) part — the same guard that §74/§75 applied to the near field, now at the far-field sphere.

## The measurables and what building takes

1. **The far-field angular-momentum flux $\Phi_\infty(r)$ through spheres of increasing radius $r$.** The decisive quantity. Requires the theory's field **momentum-flux density** (the outgoing wake's $\mathbf r\times$ momentum current), integrated over a sphere, cycle-averaged, secular part isolated (Crux 3 guard). **Build burden:** the architrino field's momentum/angular-momentum flux is not currently computed in the runner (which returns accelerations via causal roots, not field stress-energy). This needs the theory's stress-energy / momentum-density definition for the potential-gradient field — the one genuinely new piece of machinery. Central solver untouched; this is a far-field field-integral post-processor on the emitted wake.
2. **The net self-torque vs memory depth / look-back radius.** A feasible proxy now: extend the self-hit ledger's causal-root memory window to farther (earlier) emission times — the braid's own wake at larger emission radii is the far-field self-interaction. Does the net self-torque, summed over deeper memory, cross from anti-damping ($+0.076$, near field only) toward a brake (far-field radiation reaction included)? A sign change toward $-$ with depth is Crux-1 evidence; persistence at $+0.076$ is the runaway. **Build burden:** low — extend the memory window of the existing self-hit causal-root sum (runner only).
3. **The $R_\perp$ track with an open far-field boundary.** Re-run the release with the outgoing wake allowed to leave (an absorbing boundary / the flux subtracted) vs the trapped rigid release: does $R_\perp$ flatten when the flux is carried away? Distinguishes "residual is a real deficit" from "residual is trapped throughput."

## Connections (why this carries S1/S2, the axis anchor, and $A_0$)

- **S1/S2** (the shape attractor / rail-pump absorption): closes iff $\Phi_\infty = +0.076$ as a genuine far-field sink (Crux 1) — the residual is radiated, not accumulated, and $R_\perp$ holds.
- **The axis anchor:** the axial component of the outgoing wake carries the axis-sector flux; the same far-field ledger books whether the axis flutter (§61–68) is a trapped near-field mode that an open boundary radiates away.
- **$A_0$ (the mass map):** a self-consistent radiating structure's total field energy at the pinned radius **is** the assembly's mass; the far-field flux + the light-cylinder pin set the absolute scale the scale-invariant near-field ledgers cannot (§58 "the speed pin is the size pin" now joined by "the radiation pin is the mass pin"). The mass map $A_0$ consumes the same self-consistent radiating solution.

## Claim ladder and discipline

- Reframe + ledger definition: **derivation-adjacent scoping** (the continuity balance is exact; the identification of the residual with $\Phi_\infty$ is the hypothesis to test).
- The three cruxes are **open**; the light-cylinder-pin resolution (Crux 2.1) is the leading candidate because it unifies with the already-native field-speed pin (§11–12).
- Central solver untouched; runner + fixture only; the one new piece (field momentum-flux) is a far-field post-processor, not a solver change. Keep suites green; block-diagonal/near-field regression against §66.
- The §70–§75 local-sink no-go is the **airtight predecessor**: it is the proven reason the far-field channel is the one that must carry the residual. Without it, the radiation reframe would be optional; with it, it is necessary.

## Next artifact

The feasibility proxy (measurable 2 — net self-torque vs memory depth), the cheapest first test of Crux 1: does deepening the self-interaction memory turn the anti-damping residual toward a far-field brake? A sign change re-opens S1/S2 closure within the existing ontology via radiation; persistence hands to the field-momentum-flux build (measurable 1) and the Crux-2 fork.

## Results (2026-07-11)

**Measurable 2 — the memory-depth proxy ([spec §77](fold-crossing-chart-spec.md#77-the-b-feasibility-proxy-run)).** The bounded self-interaction converges flat within $\approx2R/c_f$ (net self-torque reproduces the §60 pump $+0.22$ then holds; self-hit is coincidence-only at $\beta_M=1$) — **no far-field brake** from memory depth, because a bounded source's self-force never samples the far field. The proxy rules itself out and hands to measurable 1.

**Measurable 1 — the field-momentum-flux, DECISIVE ([spec §78](fold-crossing-chart-spec.md#78-the-field-momentum-flux-build)).** $\Phi_\infty(r)$ from the braid's retarded **velocity** field (the force law has no $1/r$ radiation term) **VANISHES**: endpoint slope $-2.5$ (LSQ $-2.8$; radiation would be $\approx0$), far flux $\approx2\times10^{-4}$ of the residual. The field is **bound** — no net angular momentum to infinity — so **Crux 1 resolves to: there is no far-field sink because there is no net source** (a bound field conserves total angular momentum, net secular self-torque $=0$). **Crux 2 resolves to the light-cylinder pin** (2.1): $\beta_M=1$ is the bound/radiating boundary and *also* the no-spin-down condition; the $+0.076$ is **reactive**. The sink question dissolves. S1/S2 reduces to the **bound-field internal balance**: does the reactive residual redistribute (via the §72 open transport) to a bounded internal steady state — no sink required. Load-bearing caveat: the electric-type stress tensor is declared, and the master equation's history-generated magnetic-analog response (a possible radiation channel) is not included — the one door that could reopen radiation. Run records under `.tmp/braid-ideal/coupled-complex/`.

**Magnetic-analog ceiling — the caveat radiates at seed effective-model grade ([spec §80](fold-crossing-chart-spec.md#80-ceiling-i-reopens-radiation)).** A 2048-sample periodic retained record reconstructs $\mathbf A_{\mathrm{wake}}=\sum_s\kappa q_s\mathbf v_s(t_e)[D_s/(D_s^2+\epsilon^2)]/r_s$; its leading far-zone curl is integrated with the declared magnetic Maxwell stress $T^B_{ij}=B_iB_j-\tfrac12\delta_{ij}B^2$. Across $r=16,32,64,128,256$, $|\Phi_{\mathrm{mag}}|=57.15$–$59.89$, with LSQ slope $-0.004$, endpoint slope $+0.003$, and $4.73\%$ radial spread: the flux is radius-independent. An analytic outgoing helical $m=1$ positive control gives slope zero and constant flux to $2.84\times10^{-15}$ fractional spread. The electric/velocity channel remains bound, but the history-generated antisymmetric channel is radiative under this declared reconstruction, so the sink question reopens in bounded form and §79 is not an unconditional non-radiating closure.

**Crux status after §80.** The existence/scaling result is seed-grade and modeling-choice dependent. Its default magnitude, mean $58.081$ and $767.65$ times the $+0.0758$ residual at $r=256$, is not a calibrated small radiation reaction and changes with the regulator/coarse derivative scale at the rail caustic. Crux 1 therefore narrows to normalization: derive the same branch channel independently as $\mathbf C_{ij}^{(\eta)}$, $\mathbf A_{\mathrm{wake}}$, and $\Pi_{q,J}^{[ij]}$, require agreement, and then determine whether the physical flux balances $+0.0758$ or forces spin-down. Claim level: seed-grade far-field measurement under a declared effective reconstruction; no retained-branch or score movement authority.
