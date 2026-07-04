# Mathematical Style Guide (Canonical Dialect)

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
  - Spatial vectors are bold: $\mathbf{s}, \mathbf{v}, \mathbf{a}$.
  - Unit vectors carry hats: $\hat{\mathbf{r}}$.
  - Norms use double bars: $\|\cdot\|$.
- Indices:
  - Components indexed by $i, j \in \{1,2,3\}$ with $\delta_{ij}$.

Plain language: One global clock $T$ and ordinary 3D space; we write vectors in bold, unit directions with hats, and lengths with double bars.

---

## Coordinate and Time Layers

Every equation must declare which coordinate layer it uses. This is now a
core notation rule, not a cosmetic preference, because $\mathbb{A}\mathbb{A}\mathbb{A}$
uses an ontological absolute frame while many bridge equations use an
observer-level effective geometry. The same dimensional unit can appear in both
layers without naming the same object.

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

Pitfall: bare $t$, $\mathbf x$, $dt$, or $dx^i$ can make a valid-looking
equation that silently switches paradigms. The result may pass a dimensional
check while failing a layer check. For example, $dX^i$ and $dx_{\mathrm{eff}}^i$
both have units of length, but one belongs to the Euclidean void and the other
belongs to an effective observer chart. Treating them as identical hides the
constitutive map that still has to be derived.

When a derivation moves between layers, introduce an explicit map before
substituting variables:

$$
(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)
=
\chi_{\mathrm{eff}}(T,\mathbf X,\mathcal N_{\mathrm{sea}},\text{observer record}).
$$

This map is a closure target unless the local document has already derived the
needed row. It must not be smuggled in by reusing the same letters on both
sides. In programs and app data, the same rule applies to field names and
labels: native solver state, display coordinates, and effective observer
coordinates must not share one undifferentiated symbol when a calculation or
claim depends on the distinction.

Plain language: first ask which layer the math is using. Native equations use
the absolute clock and Euclidean void. Effective equations use the coordinates
an observer reconstruction would assign. Proper time is a clock readout, not
the native clock.

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

  Here $\delta_{ij}$ is the Kronecker delta (identity). It defines the Euclidean dot product and norm:
  $u\!\cdot\!v = h_{ij}u^i v^j$ and $\|v\|^2 = h_{ij}v^i v^j$. Raising/lowering is trivial with $h^{ij}=\delta^{ij}$.
  In Cartesian frames, $\Gamma^{i}{}_{jk}=0$, so covariant derivatives equal partial derivatives and geodesics are straight; curvature vanishes identically. In curvilinear coordinates (e.g., spherical), $h_{ij}$ takes the flat-space form $\mathrm{diag}(1, r^2, r^2\sin^2\theta)$, still representing the same flat geometry.
- There is no 4D non-degenerate metric; we do not mix time and space into a single line element.
- Worldlines:
  - $\mathbf X: I \subset \mathbb{R} \to \mathbb{R}^3,\ T \mapsto \mathbf X(T)$, absolutely continuous; $\mathbf V = d\mathbf X/dT$, $\mathbf A = d\mathbf V/dT$.

Plain language: Objects move as dots in 3D through successive instants; speeds and distances are measured separately from time.

---

## Propagation and causal set (delayed-only)

- Field speed is $v$; by default we non-dimensionalize to $v=1$.
- Causal-time condition (CT):
  $$
  \Delta_{o'j}=t-t_0,\quad r = \|\mathbf{s}_{o'}(t) - \mathbf{s}_j(t_0)\|,\quad r = v\,\Delta_{o'j}
  $$
- Causal set:
  $$
  \mathcal{C}_{o'j}(t) = \{\, t_0 < t \mid \|\mathbf{s}_{o'}(t) - \mathbf{s}_j(t_0)\| = v\,(t - t_0) \,\}
  $$
- Conventions:
  - $H(0)=0$ (no instantaneous self-kick).
  - No $r=0$ causal roots beyond $\Delta_{o'j}=0$: because $r = v(t - t_0)$, $r=0$ implies $\Delta_{o'j}=0$; that coincident-time case is excluded by $H(0)=0$. Under mollification, the symmetric limit as $r\to 0$ yields zero net push.

Plain language: A push now only happens if a past causal wake surface has had exactly enough time to reach the receiver.

---

## Distributions and regularization (causal wake surfaces)

- Point emission at $(t_0,s_0)$:
  $$
  \text{source} = q\,\delta(t - t_0)\,\delta^{(3)}(\mathbf{s} - \mathbf{s}_0)
  $$
-- Expanding causal wake surface at speed v:
  $$
  \rho(t,\mathbf{s}) = \frac{q}{4\pi r^2}\,\delta(r - v\,\Delta)\,H(\Delta),\quad r=\|\mathbf{s}-\mathbf{s}_0\|,\ \Delta=t-t_0
  $$
  $$
  \rho = \frac{q}{4\pi r^2}\,\delta_{S_{v\Delta}}(\mathbf{s}-\mathbf{s}_0)\,H(\Delta)
  $$
- Regularization:
  $$
  \delta(r - v\,\Delta)\ \to\ \delta_\eta(r - v\,\Delta) \;=\; \frac{1}{\sqrt{2\pi}\,\eta}\,\exp\!\Big(\!-\frac{(r - v\,\Delta)^2}{2\,\eta^2}\Big)
  $$
  - Use $\eta$ > 0 when differentiability is required; take $\eta$ → 0 limits in the weak/integrated sense.

Plain language: Each emission is a razor-thin causal wake surface; when needed, we thicken it slightly so calculus works smoothly.

---

## Master Equation of Motion (EOM; line of action with receiver-normal branch strength)

Given a receiver $o'$ at time $t$ and a source $j$ at causal emission time $t_0 \in \mathcal{C}_{o'j}(t)$, let
$$
r_{o'j}(t;t_0)=\|\mathbf{s}_{o'}(t)-\mathbf{s}_j(t_0)\|,
\qquad
\hat{\mathbf{r}}_{o'j}(t;t_0)=\frac{\mathbf{s}_{o'}(t)-\mathbf{s}_j(t_0)}{r_{o'j}(t;t_0)}
$$
and $\sigma_{q_j q_{o'}}=\mathrm{sign}(q_j q_{o'}) \in \{+1,-1\}$.

Canonical per-hit acceleration:
$$
\mathbf{a}_{o'\leftarrow j}(t; t_0)
= \kappa\,\sigma_{q_j q_{o'}}\,
\frac{|q_j q_{o'}|}{r_{o'j}^2(t;t_0)}
W_{o'j}^{\mathrm{rec}}(t;t_0)\,\hat{\mathbf{r}}_{o'j}(t;t_0)
$$
where
$$
D_{s,o'j}(t;t_0)
\equiv
c_f-\mathbf{v}_j(t_0)\cdot\hat{\mathbf{r}}_{o'j}(t;t_0),
\qquad
D_{t,o'j}(t;t_0)
\equiv
c_f-\mathbf{v}_{o'}(t)\cdot\hat{\mathbf{r}}_{o'j}(t;t_0)
$$
and
$$
W_{o'j}^{\mathrm{rec}}(t;t_0)
\equiv
\left|
\frac{D_{t,o'j}(t;t_0)}
{D_{s,o'j}(t;t_0)}
\right|.
$$
The source-normal denominator $D_s$ controls root transversality and wake-front compression or dilation from source motion. The receiver-normal numerator $D_t$ controls how the moving receiver cuts through the same emitted wake sequence. The unsigned ratio $W^{\mathrm{rec}}$ is the branch-strength factor in the acceleration magnitude.

Total acceleration:
$$
\mathbf{a}_{o'}(t) = \sum_{j}\ \sum_{t_0 \in \mathcal{C}_{o'j}(t)} \mathbf{a}_{o'\leftarrow j}(t; t_0)
$$

DDE view: let state $x = (\mathbf{s}, \mathbf{v})$. With $\eta>0$ regularization, the dynamics admit a causal functional form
$$
\frac{d x}{d t} = F\big(x(t), \{x_j(t - \Delta_j)\}_j, t\big)
$$
with $\Delta_j$ determined implicitly by $\|\mathbf{s}(t)-\mathbf{s}_j(t-\Delta_j)\| = v\,\Delta_j$, and per-hit contributions summed over all roots. In the $\eta\to 0$ limit interpret in the weak sense.

Notes:
- Emission cadence and per-wavefront amplitude are constant at the source; the received force magnitude is modulated by the receiver-normal branch factor $W^{\mathrm{rec}}=\lvert D_t/D_s\rvert$.
- No cross products, no right-hand-rule magnetism; every per-hit action is along $\hat{\mathbf{r}}$.

Plain language: For each past emission that can reach the receiver now, push along the line back to where it came from, with inverse-square falloff multiplied by how the source laid down the wake and how the receiver crosses it, then add all pushes.

Receiver velocity decomposition (instantaneous):
- Decompose the receiver velocity relative to $\hat{\mathbf{r}}_{o'j}$:
  $$
  \mathbf{v}_{o'} = v_r\,\hat{\mathbf{r}}_{o'j} + \mathbf{v}_\perp,\qquad v_r = \mathbf{v}_{o'}\cdot \hat{\mathbf{r}}_{o'j}
  $$
- Because $\mathbf{a}_{o'\leftarrow j} \parallel \hat{\mathbf{r}}_{o'j}$, a single hit updates only the radial component:
  $$
  \frac{d}{dt}\mathbf{v}_\perp = 0,\qquad \frac{d}{dt}v_r = \mathbf{a}_{o'\leftarrow j}\cdot \hat{\mathbf{r}}_{o'j}
  $$
- Local trend: inward motion ($v_r<0$) tends to strengthen subsequent per-hit contributions via the $1/r^2$ factor; outward ($v_r>0$) tends to weaken them, all else equal.

Plain language: a hit changes only the along-the-line piece of your velocity right then; sideways motion is unchanged at that instant.

---

## Energetics

-- Potential (mollified):
  - $\Phi_\eta$ is defined using $\delta_\eta$ causal surfaces; at a point:
    $$
    U_{\text{pot}} = q'\,\Phi_\eta
    $$
- Force relation:
  - Holds pointwise for $\Phi_\eta$; as $\eta \to 0$, interpret in the weak sense over resolved intervals:
    $$
    \mathbf{F} = -\nabla U_{\text{pot}}
    $$
- Work–energy:
  $$
  \Delta E_k \;=\; \int \mathbf{F}\cdot d\mathbf{s} \;=\; -\,\Delta U_{\text{pot}}
  $$

Plain language: With slightly thick causal wake surfaces, the usual “force is minus gradient of potential” works; in the razor-thin limit it works after integrating over small time windows.

---

## Units and symbols

- Core dynamics chapters often set field speed to $v=1$ (equivalently $c_f=1$).
- In spacetime closure chapters, keep $c_f$ explicit and use $v$ for drift speed only through $\beta=v/c_f$.
- $\epsilon = |e|/6$ is the potential polarity-unit magnitude in observer-level electric bookkeeping; Electrino $q=-\epsilon$, Positrino $q=+\epsilon$.
- In axial-inventory and weak-coupling-triad counts, write signed polarity units as $\epsilon_+$ and $\epsilon_-$, for example $5\epsilon_+ + 1\epsilon_-$. Do not use initial-letter polarity shorthand for these inventories.
- $\kappa>0$ universal coupling.
- $\eta>0$ mollifier width (regularization parameter).
- Emission cadence and per-wavefront amplitude are constant. Receiver-normal velocity enters the branch strength through $D_t$ and enters instantaneous power through $\,\mathbf{F}\cdot\mathbf{v} = |\mathbf{F}|\,v_r$.
- $r$, $\hat{\mathbf{r}}$ as above; $H$ is the Heaviside step function with $H(0)=0$.

Plain language: Fix units so the field speed is one; use $\epsilon$ as the basic polarity unit; emission cadence and per-wavefront amplitude are constant; receiver motion changes received branch strength through $D_t$ and power through radial velocity.

---

## Exclusions and scope

- No Lorentzian 4-vectors or Minkowski metric in the core specification.
- No $\mathbf{v}\times\mathbf{B}$, no magnetic right-hand rule constructs; “magnetic-like” phenomena are emergent from causal path history geometry.
- Keep alternate presentations (forms/differential geometry) in clearly marked appendices if needed.

---

## Editorial micro-style

- After formal definitions, add a brief “Plain language” sentence.
- Use consistent symbol set: $\mathcal{C}_{o'j}(t)$, $r$, $\hat{\mathbf{r}}$, $v$, $\epsilon$, $\kappa$, $D_s$, $D_t$, and $W^{\mathrm{rec}}$; reserve $J^{\mathrm{src}}$ for source-normal causal-Jacobian diagnostics.
- Equation tags (optional): (CT) causal-time, (EOM) equation of motion, (REG) regularization, (ENER) energetics.
- Emission cadence and per-wavefront amplitude are constant; receiver-normal motion changes the crossing cadence of the emitted wake sequence.
- Notation for “now”: use $t_{\text{now}}$ for a fixed current evaluation time; use $t_{\text{obs}}$ for observation time. Avoid Tnow/`T_now`; keep $t$ as the running variable elsewhere.
- Canonical universe-now notation: use $\mathbb{U}_{\text{now}} \equiv S(t)$ for the complete ontic universe state; do not substitute alternate labels or glyph variants.
- Emitters/receivers are individual architrinos; composite assemblies never emit or receive as wholes; their behavior emerges from constituent architrinos.
- Use “surrogate location” to denote a stationary, hypothetical emitter placed on the receiver’s current unoriented line of action that reproduces the same instantaneous hit; use “surrogate-location recast” when referring to this rewriting.
- On first occurrence in a doc: “We work in units with field speed v=1 unless stated otherwise.”
- KaTeX lint:
  - Use `$...$` inline math for short symbols or ratios in prose.
  - Use `$$...$$` display math only for standalone equations.
  - Display equations are standalone, centered equations rendered from `$$...$$`. Do not add sentence punctuation inside display equations merely to punctuate the surrounding prose. Put commas, periods, and colons in the prose around the equation instead. Keep punctuation only when it is part of the mathematical object itself, such as tuple entries, set-builder clauses, aligned lists, or semicolon-separated state vectors.
  - Treat `\(...\)` and `\[...\]` as compatibility forms for literal examples or renderer-specific validated cases, not as default authoring syntax.
  - For inline inequalities with `<` or `>` in prose, keep them in `$...$` with spaces, for example `$1 < m < n$`.

- Notation lint (common mistakes):
  - Use bold for vectors: $\mathbf{v}$, not plain v.
  - In core dynamics derivations, reserve $v$ for field speed; in spacetime closure derivations, reserve $c_f$ for field speed and use $v$ only as drift magnitude in $\beta=v/c_f$.
  - Use $\|\mathbf{v}\|$ for speed magnitude of a vector velocity.
  - Emission cadence and per-wavefront amplitude are constant.
  - Do not write mixed forms like $|v|$ to mean speed; bold the vector and take its norm.
