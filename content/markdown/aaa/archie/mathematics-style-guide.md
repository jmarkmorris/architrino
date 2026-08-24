# Mathematical Style Guide (Canonical Dialect)

This guide keeps the mathematical language from switching layers without warning. The main danger is not a typo; it is a valid-looking equation that quietly treats absolute time, Euclidean void coordinates, effective observer charts, and standard comparison variables as if they were the same thing.

Use the rules below as a wiring diagram for notation. Every symbol should tell the reader which layer it belongs to and what map, if any, is still owed.

Purpose: Define a single, canonical mathematical and geometrical dialect for the Geometrical Model of Nature. All technical documents should adhere to this guide. Equations are presented in display math for clarity where appropriate.

---

## Background spaces and sets

- Timespace:
  $$
  \mathcal{M} = \mathbb{R}\times \mathbb{R}^3
  $$
  with native absolute coordinates $(T, X, Y, Z)$.
  $$
  \Sigma_T = \{T\}\times \mathbb{R}^3
  $$
  are simultaneity slices (Euclidean 3-space snapshots).
- Vectors and norms:
  - Native spatial, velocity, and acceleration vectors are bold: $\mathbf X$, $\mathbf V$, $\mathbf A$.
  - Unit vectors carry hats: $\hat{\mathbf{r}}$.
  - Norms use double bars: $\|\cdot\|$.
- Indices:
  - Components indexed by $i, j \in \{1,2,3\}$ with $\delta_{ij}$.

Plain language: One global clock $T$ and ordinary 3D space; we write vectors in bold, unit directions with hats, and lengths with double bars.

---

## Coordinate and Time Layers

Every equation must declare which coordinate layer it uses. This is now a core notation rule, not a cosmetic preference, because $\mathbb{A}\mathbb{A}\mathbb{A}$ uses an ontological absolute frame while many bridge equations use an observer-level effective geometry. The same dimensional unit can appear in both layers without naming the same object.

- Native absolute layer:
  - Use $T$ for absolute time.
  - Use $\mathbf X=(X^1,X^2,X^3)$ for position in the Euclidean void.
  - Use $dT$, $dX^i$, $\partial_T$, and $\nabla_{\mathbf X}$ for native differentials and operators.
  - Use worldlines $\mathbf X_i(T)$ and native velocities $\mathbf V_i=d\mathbf X_i/dT$.
- Effective observer or GR-comparison layer:
  - Use $t_{\mathrm{eff}}$ for effective observer coordinate time.
  - Use $x_{\mathrm{eff}}^i$ for effective spatial chart coordinates.
  - Use $dt_{\mathrm{eff}}$, $dx_{\mathrm{eff}}^i$, and $\partial_{t_{\mathrm{eff}}}$ for effective-chart differentials and operators.
  - Use $g_{\mu\nu}^{\mathrm{eff}}$, $\gamma_{ij}^{\mathrm{eff}}$, and projected drift terms such as $u_{\mathrm{sea,eff}}^i$ when writing metric or ADM-style rows.
- Proper time:
  - Use $\tau$ only for derived clock time, meaning the readout of a physical clock.
  - Write $d\tau/dt_{\mathrm{eff}}$ for an observer-coordinate clock-rate comparison.
  - Write $d\tau/dT$ only when a native clock-map derivation has been declared.
- Pure comparison equations:
  - In student-facing textbook prose, the displayed working equation must use layer-explicit $\mathbb{A}\mathbb{A}\mathbb{A}$ notation.
  - A standard GR, SR, QM, QFT, QED, QCD, Standard Model, or $\Lambda\mathrm{CDM}$-era equation may appear first only as a labeled `standard comparison form` for recognition, source matching, or benchmark recovery.
  - Immediately follow that recognition form with the translated form using $T,\mathbf X$ or $t_{\mathrm{eff}},x_{\mathrm{eff}}^i$ before any interpretation, diagramming, or term-by-term map.
  - Some standard equations already use dimension-bearing time, distance, scale, coupling, or renormalization variables. That helps the translation but does not remove the layer obligation: when the map is mostly a case or subscript change, such as $t\mapsto T$, $\mathbf x\mapsto\mathbf X$, or $t\mapsto t_{\mathrm{eff}}$, say so explicitly in the symbol map.
  - Do not rely on a paragraph disclaimer alone. Bare symbols such as $t$, $x^i$, $dt$, and $dx^i$ must not carry forward as the working notation in native or bridge derivations.
  - Preferred teaching pattern: standard comparison form, layer-explicit translated form, then a short map explaining which symbols changed and why.

Pitfall: bare $t$, $\mathbf x$, $dt$, or $dx^i$ can make a valid-looking equation that silently switches paradigms. The result may pass a dimensional check while failing a layer check. For example, $dX^i$ and $dx_{\mathrm{eff}}^i$ both have units of length, but one belongs to the Euclidean void and the other belongs to an effective observer chart. Treating them as identical hides the constitutive map that still has to be derived.

When a derivation moves between layers, introduce an explicit map before substituting variables:

$$
(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)
=
\chi_{\mathrm{eff}}(T,\mathbf X,\mathcal N_{\mathrm{sea}},\text{observer record}).
$$

This map is a closure target unless the local document has already derived the needed mapping. It must not be smuggled in by reusing the same letters on both sides. In programs and app data, the same rule applies to field names and labels: EOM solver state, display coordinates, and effective observer coordinates must not share one undifferentiated symbol when a calculation or claim depends on the distinction.

Plain language: first ask which layer the math is using. Native equations use the absolute clock and Euclidean void. Effective equations use the coordinates an observer reconstruction would assign. Proper time is a clock readout, not the native clock.

---

## Kinematics (Newton–Cartan/Galilean background)

- Absolute time $T$ is universal and oriented; durations are

  $$
  \Delta T = |\,T_2 - T_1\,|
  $$

- Space is Euclidean with metric

  $$
  h_{ij} = \delta_{ij}\quad\text{on each slice }\Sigma_T
  $$

  Notation: We use $h_{ij}$ exclusively for the spatial metric; do not use $g_{ij}$.

  Here $\delta_{ij}$ is the Kronecker delta (identity). It defines the Euclidean dot product and norm: $\mathbf U\!\cdot\!\mathbf V = h_{ij}U^i V^j$ and $\|\mathbf V\|^2 = h_{ij}V^i V^j$. Raising/lowering is trivial with $h^{ij}=\delta^{ij}$. In Cartesian frames, $\Gamma^{i}{}_{jk}=0$, so covariant derivatives equal partial derivatives and geodesics are straight; curvature vanishes identically. In curvilinear coordinates (e.g., spherical), $h_{ij}$ takes the flat-space form $\mathrm{diag}(1, r^2, r^2\sin^2\theta)$, still representing the same flat geometry.
- There is no 4D non-degenerate metric; we do not mix time and space into a single line element.
- Worldlines:
  - $\mathbf X: I \subset \mathbb{R} \to \mathbb{R}^3,\ T \mapsto \mathbf X(T)$, absolutely continuous; $\mathbf V = d\mathbf X/dT$, $\mathbf A = d\mathbf V/dT$.

Plain language: Objects move as dots in 3D through successive instants; speeds and distances are measured separately from time.

---

## Propagation and causal set (delayed-only)

- Primitive causal-wake speed is $c_f$; every numerical instantiation uses $c_f=1$.
- Causal-time condition (CT):
  $$
  \mathbf r_t=\mathbf X_r(T_r)-\mathbf X_t(T_t),\quad
  \Delta_{r\leftarrow t}=T_r-T_t,\quad
  r=\|\mathbf r_t\|=c_f\,\Delta_{r\leftarrow t}
  $$
- Causal set:
  $$
  \mathcal C_{r\leftarrow t}(T_r)
  =
  \{\,T_t<T_r\mid\|\mathbf X_r(T_r)-\mathbf X_t(T_t)\|=c_f(T_r-T_t)\,\}
  $$
- Conventions:
  - $H(0)=0$ (no instantaneous self-kick).
  - No $r=0$ causal roots exist beyond $\Delta_{r\leftarrow t}=0$: because $r=c_f(T_r-T_t)$, $r=0$ implies $T_r=T_t$; that coincident-time case is excluded by $H(0)=0$.
  - This exclusion does not supply a continuation through a coincident same-transmitter root birth. Verification remains incomplete until one finite transition rule certifies the singular event's root ledger and conserved accounts.

Plain language: A push now only happens if a past causal wake surface has had exactly enough time to reach the receiver.

---

## Distributions and regularization (causal wake surfaces)

- Point emission at $(T_t,\mathbf X_{\mathrm{em}})$:
  $$
  \text{source} = q\,\delta(T - T_t)\,\delta^{(3)}(\mathbf X - \mathbf X_{\mathrm{em}})
  $$
- Expanding causal wake surface at speed $c_f$:
  $$
  \rho(T,\mathbf X) = \frac{q}{4\pi r^2}\,\delta(r - c_f\,\Delta)\,H(\Delta),\quad r=\|\mathbf X-\mathbf X_{\mathrm{em}}\|,\ \Delta=T-T_t
  $$
  $$
  \rho = \frac{q}{4\pi r^2}\,\delta_{S_{c_f\Delta}}(\mathbf X-\mathbf X_{\mathrm{em}})\,H(\Delta)
  $$
- Regularization:
  $$
  \delta(r - c_f\,\Delta)\ \to\ \delta_\eta(r - c_f\,\Delta) \;=\; \frac{1}{\sqrt{2\pi}\,\eta}\,\exp\!\Big(\!-\frac{(r - c_f\,\Delta)^2}{2\,\eta^2}\Big)
  $$
  - Use $\eta > 0$ when differentiability is required; take $\eta\to 0$ limits in the weak/integrated sense.

Plain language: Each emission is a razor-thin causal wake surface; when needed, we thicken it slightly so calculus works smoothly.

---

## Master Equation of Motion (EOM; line of action with transmitter-side acceleration weight)

Given receiver $r$ at reception time $T_r$ and transmitter $t$ at causal emission time $T_t\in\mathcal C_{r\leftarrow t}(T_r)$, let
$$
r(T_r;T_t)=\|\mathbf X_r(T_r)-\mathbf X_t(T_t)\|,
\qquad
\hat{\mathbf r}_t(T_r;T_t)=\frac{\mathbf X_r(T_r)-\mathbf X_t(T_t)}{r(T_r;T_t)}
$$
and $\sigma_{tr}=\operatorname{sign}(q_tq_r)\in\{+1,-1\}$.

Canonical per-hit acceleration:
$$
\mathbf A_{r\leftarrow t}(T_r;T_t)
=\kappa\,\sigma_{tr}\,
\frac{|q_tq_r|}{r^2(T_r;T_t)}
W_{r\leftarrow t}^{\mathrm{acc}}(T_r;T_t)\,\hat{\mathbf r}_t(T_r;T_t)
$$
where
$$
D_t(T_r;T_t)
\equiv
c_f-\mathbf V_t(T_t)\cdot\hat{\mathbf r}_t(T_r;T_t),
\qquad
D_r(T_r;T_t)
\equiv
c_f-\mathbf V_r(T_r)\cdot\hat{\mathbf r}_t(T_r;T_t)
$$
and
$$
W_{r\leftarrow t}^{\mathrm{acc}}(T_r;T_t)
\equiv
\frac{c_f}{|D_t(T_r;T_t)|}.
$$
The transmitter-side factor $D_t$ controls root transversality and wake-front compression or dilation from transmitter motion. The receiver-side factor $D_r$ controls how the moving receiver cuts through the same emitted wake sequence. The exact signed root-playback derivative is $dT_t/dT_r=D_r/D_t$. The transmitter-side acceleration weight is $W^{\mathrm{acc}}=c_f/|D_t|$; it is not the magnitude of root playback.

Total acceleration:
$$
\mathbf A_r(T_r)=\sum_t\ \sum_{T_t\in\mathcal C_{r\leftarrow t}(T_r)}\mathbf A_{r\leftarrow t}(T_r;T_t)
$$

DDE view: let native state $\mathsf Z = (\mathbf X, \mathbf V)$. With $\eta>0$ regularization, the dynamics admit a causal functional form
$$
\frac{d \mathsf Z}{dT} = F\big(\mathsf Z(T), \{\mathsf Z_j(T - \Delta_j)\}_j, T\big)
$$
with $\Delta_j$ determined implicitly by $\|\mathbf X(T)-\mathbf X_j(T-\Delta_j)\| = c_f\,\Delta_j$, and per-hit contributions summed over all roots. In the $\eta\to 0$ limit interpret in the weak sense.

Notes:
- Emission cadence and per-wavefront amplitude are constant at the transmitter; the received acceleration magnitude is modulated by the transmitter-side acceleration weight $W^{\mathrm{acc}}=c_f/\lvert D_t\rvert$.
- No cross products, no right-hand-rule magnetism; every per-hit action is along $\hat{\mathbf{r}}$.

Plain language: For each past emission that can reach the receiver now, accelerate along the line from the transmitter's emission point to the receiver, with inverse-square falloff multiplied by how densely the transmitter laid down the wake surfaces, then add all contributions. Receiver motion changes root playback and future geometry, not the arriving multiplier.

Receiver velocity decomposition (instantaneous):
- Decompose the receiver velocity relative to $\hat{\mathbf r}_t$:
  $$
  \mathbf V_r = V_{r,\parallel}\,\hat{\mathbf r}_t + \mathbf V_{r,\perp},
  \qquad
  V_{r,\parallel}=\mathbf V_r\cdot\hat{\mathbf r}_t
  $$
- Because $\mathbf A_{r\leftarrow t}\parallel\hat{\mathbf r}_t$, a single hit updates only the radial component:
  $$
  \frac{d}{dT_r}\mathbf V_{r,\perp}=0,
  \qquad
  \frac{d}{dT_r}V_{r,\parallel}=\mathbf A_{r\leftarrow t}\cdot\hat{\mathbf r}_t
  $$
- Local trend: inward motion ($V_{r,\parallel}<0$) tends to strengthen subsequent per-hit contributions via the $1/r^2$ factor; outward motion ($V_{r,\parallel}>0$) tends to weaken them, all else equal.

Plain language: a hit changes only the along-the-line piece of your velocity right then; sideways motion is unchanged at that instant.

---

## Energetics

- Potential (mollified):
  - $\Phi_\eta$ is defined using $\delta_\eta$ causal surfaces; at a point:
    $$
    U_{\text{pot}} = q'\,\Phi_\eta
    $$
- Potential-gradient bookkeeping relation:
  - Holds pointwise for $\Phi_\eta$; the force symbol is optional assembly-level bookkeeping, and as $\eta \to 0$, interpret it in the weak sense over resolved intervals:
    $$
    \mathbf{F} = -\nabla U_{\text{pot}}
    $$
- Work–energy:
  $$
  \Delta E_k \;=\; \int \mathbf{F}\cdot d\mathbf X \;=\; -\,\Delta U_{\text{pot}}
  $$

Plain language: With slightly thick causal wake surfaces, the optional force-bookkeeping variable is minus the potential gradient; the primitive substrate statement remains the per-hit acceleration law, and the razor-thin limit is interpreted after integrating over small time windows.

---

## Units and symbols

- Core dynamics chapters set primitive causal-wake speed to $c_f=1$.
- In spacetime closure chapters, keep $c_f$ explicit and use $v$ for drift speed only through channel-subscripted ratios such as $\beta_f=v/c_f$, $\beta_{\text{eff}}=v/c_{\text{eff}}$, or $\beta_\star=v/c_\star$; the paired Lorentz factor inherits the same subscript. Reserve bare $\beta$ and $\gamma$ for quoted standard-physics benchmark formulas.
- $\epsilon = |e|/6$ is the potential polarity-unit magnitude in observer-level electric bookkeeping; electrino $q=-\epsilon$, positrino $q=+\epsilon$.
- In axial-inventory and weak-coupling-triad counts, write signed polarity units as $\epsilon_+$ and $\epsilon_-$, for example $5\epsilon_+ + 1\epsilon_-$. Do not use initial-letter polarity shorthand for these inventories.
- $\kappa>0$ universal coupling.
- $\eta>0$ mollifier width (regularization parameter).
- Emission cadence and per-wavefront amplitude are constant. Receiver-side velocity enters signed root playback through $D_r/D_t$ and instantaneous specific power through $\mathbf A_{r\leftarrow t}\cdot\mathbf V_r=\sigma_{tr}\|\mathbf A_{r\leftarrow t}\|V_{r,\parallel}$; it does not multiply the instantaneous acceleration weight.
- $r$, $\hat{\mathbf{r}}$ as above; $H$ is the Heaviside step function with $H(0)=0$.

Plain language: Fix units so the field speed is one; use $\epsilon$ as the basic polarity unit; transmitter motion sets the arriving acceleration weight, while receiver motion changes root playback, future geometry, and instantaneous power.

---

## Exclusions and scope

- No Lorentzian 4-vectors or Minkowski metric in the core specification.
- No $\mathbf V\times\mathbf B$, no magnetic right-hand rule constructs; “magnetic-like” phenomena are emergent from causal path history geometry.
- Keep alternate presentations (forms/differential geometry) in clearly marked appendices if needed.

---

## Editorial micro-style

- After formal definitions, add a brief “Plain language” sentence.
- Use consistent event-role notation: $\mathcal C_{r\leftarrow t}(T_r)$, $T_t$, $T_r$, $\mathbf r_t$, $r$, $\hat{\mathbf r}_t$, $c_f$, $\epsilon$, $\kappa$, $D_t$, $D_r$, $W^{\mathrm{acc}}$, and $J^t$.
- Equation tags (optional): (CT) causal-time, (EOM) equation of motion, (REG) regularization, (ENER) energetics.
- Emission cadence and per-wavefront amplitude are constant; receiver-side motion changes the crossing cadence of the emitted wake sequence.
- Notation for “now”: use $T_{\mathrm{now}}$ or a locally declared $T_\ast$ for a fixed native evaluation time; use $t_{\mathrm{eff,obs}}$ for effective observation time after an observer chart has been declared.
- Canonical universe-now notation: use $\mathbb{U}_{\text{now}} \equiv S(T)$ for the complete ontic universe state; do not substitute alternate labels or glyph variants.
- Emitters/receivers are individual architrinos; composite assemblies never emit or receive as wholes; their behavior emerges from constituent architrinos.
- Use “surrogate location” to denote a stationary, hypothetical transmitter placed on the receiver's current unoriented line of action that reproduces the same instantaneous hit; use “surrogate-location recast” when referring to this rewriting.
- On first occurrence in a numerical document: “We work in normalized wake-speed units with $c_f=1$.”
- KaTeX lint:
  - Use `$...$` inline math for short symbols or ratios in prose.
  - Use `$$...$$` display math only for standalone equations.
  - Display equations are standalone, centered equations rendered from `$$...$$`. Do not add sentence punctuation inside display equations merely to punctuate the surrounding prose. Put commas, periods, and colons in the prose around the equation instead. Keep punctuation only when it is part of the mathematical object itself, such as tuple entries, set-builder clauses, aligned lists, or semicolon-separated state vectors.
  - Treat `\(...\)` and `\[...\]` as compatibility forms for literal examples or renderer-specific validated cases, not as default authoring syntax.
  - For inline inequalities with `<` or `>` in prose, keep them in `$...$` with spaces, for example `$1 < m < n$`.

- Notation lint (common mistakes):
  - Use bold for vectors: $\mathbf V$, not plain $V$.
  - Use $c_f$ for primitive causal-wake speed and $v$ only as drift magnitude in channel-subscripted ratios such as $\beta_f=v/c_f$.
  - Use $\|\mathbf V\|$ for speed magnitude of a vector velocity.
  - Emission cadence and per-wavefront amplitude are constant.
  - Do not write mixed forms like $|V|$ to mean speed; bold the vector and take its norm.
  - Reserve $T$ for absolute time. Write thermodynamic temperature as $T_{\mathrm{temp}}$, never as bare $T$, and disambiguate embedded uses accordingly, for example $k_B T_{\mathrm{temp}}$. Temperatures that already carry a distinguishing subscript, such as $T_{\mathrm{CMB}}$, are acceptable.
