# Lissajous Figures and Braid Phase Return

## 1. Geometry as a Description of Phase Motion

### 1.1. The proposed correspondence

The [original Lissajous proposal](priorities.md) asks whether familiar closed figures can describe phase-return data in a Noether braid. Its useful idea is to distinguish commensurate frequencies, which can return together, from incommensurate frequencies, which need not. That is a statement about a prescribed phase chart. Establishing a realized braid additionally requires admissible constituent histories, complete delayed interactions and the relevant dynamical return.

A figure is the image of a trajectory under a specified coordinate or observation map. Its name alone does not identify which binary phases, radial breathing variables, indexed axes or projected observables generated it. The same apparent figure can arise from different histories, and a projection can erase a phase that prevents the complete state from returning. The correspondence must therefore begin with variables and a map, rather than infer a physical state from the outline of a curve.

### 1.2. Rotation and translation

A single rotating coordinate with constant axial drift has the illustrative path

$$
\mathbf X(T)=\big(R\cos(\omega T+\phi),\ R\sin(\omega T+\phi),\ uT\big),
\qquad R>0,\quad\omega>0.
$$

After the rotation period its displacement is

$$
\mathbf X(T+2\pi/\omega)-\mathbf X(T)
=\big(0,0,2\pi u/\omega\big).
$$

For nonzero drift this is an open helix in ordinary Euclidean space. Zero drift gives a closed circle. Removing the translation in a declared moving frame also leaves a circle, but that is a relative return, not equality of absolute positions. Thus the original single-frequency helix description needs its translation or embedding convention stated. A rotating phase by itself does not require a helix.

The example prescribes geometry only. It is not a solution of the master equation, and its period is not evidence of attraction, stability or assembly retention.

## 2. Exact Return of Active Phases

### 2.1. The commensurability criterion

For active constant-frequency phases, write

$$
\theta_a(T)=\omega_aT+\phi_a\pmod{2\pi}.
$$

The complete phase vector has a positive return period $P$ precisely when integers $k_a$ satisfy

$$
\omega_aP=2\pi k_a
\quad\text{for every active }a.
$$

This follows by subtracting each initial phase from its value after $P$. For two nonzero frequencies, it implies a rational ratio. Conversely, if the frequencies are integer multiples of a common nonzero frequency, a common phase return exists. With positive base frequency $\omega_0$ and a nonzero integer vector,

$$
\omega_a=k_a\omega_0,
\qquad
P_{\min}=\frac{2\pi}{\omega_0\,\gcd(|k_1|,\ldots,|k_d|)}.
$$

Zero entries represent stationary phases and impose no additional period constraint. The formula concerns the phase vector; a projected figure may have a shorter period because it suppresses or identifies coordinates. One should also distinguish tracing a closed image from returning with the required phase, direction, rate and history.

For a positive $4{:}2{:}1$ carrier, the winding vector over the slow phase's cycle is $(4,2,1)$. The [frequency-lock chapter](../../../../content/markdown/aaa/noether-braid/three-binary-4-2-1-frequency-lock.md#assumption-2-exact-integer-phase-closure) uses that reduced carrier convention while explicitly retaining its branch assumptions. The index with the base frequency is not thereby the outermost radius, and the ratio is not a generic law for all Noether braids.

### 2.2. A planar figure and a breathing rotation

A classical planar coordinate map has the form

$$
x(T)=A\cos\theta_1(T),\qquad
y(T)=B\sin\theta_2(T),\qquad A,B>0.
$$

Commensurate active phases give a periodic Lissajous trace. The relative phase offsets and amplitudes affect its shape, so the frequency ratio alone does not identify one unique figure. If an amplitude is zero, the visible trace loses a phase and can close even when the original two-phase vector does not.

A radial breathing construction uses different variables:

$$
R(T)=R_0+a\cos(\Omega T+\psi),\qquad R_0>|a|>0,
$$

$$
x(T)=R(T)\cos(\omega T+\phi),\qquad
y(T)=R(T)\sin(\omega T+\phi).
$$

Here the rotation and breathing phases define a two-frequency image. Expanding the products produces components at the rotation frequency and its sum and difference with the breathing frequency. It is therefore a related two-phase construction, not automatically the same two-Cartesian-harmonic form as the preceding planar example. A rational rotation/breathing ratio gives a common phase period, but the actual spatial return and its minimal period depend on the complete coordinate map.

These examples make the original proposed roles explicit without selecting a physical breathing mode or identifying radial oscillation with the indexed binary frequencies of another branch.

### 2.3. Irrational phases and the image of a torus

Two nonzero constant frequencies with irrational ratio have no positive common phase period. Their phase orbit is dense in the two-dimensional phase torus. One way to see the density is to return repeatedly to a fixed first-phase section: the second phase advances by an irrational rotation, whose iterates are dense on the circle. Allowing the continuous time between those sections fills every phase neighborhood. This is a property of the prescribed linear phase flow, not a physical thermalization or probability law.

For a continuous coordinate map $G$, density carries into its image:

$$
\overline{\{G(\theta_1(T),\theta_2(T)):T\in\mathbb R\}}
=G(\mathbb T^2).
$$

The phase torus is compact, so the image is closed; continuity maps arbitrarily close phase returns into arbitrarily close image points. In the planar cosine/sine example, that image is a rectangle. A torus embedding gives a toroidal image. A spherical coordinate construction may give a sphere or a restricted subset, depending on the map. “Torus-filling” therefore refers first to phase space; it does not assert that every observed trajectory occupies a physical torus. Density also does not mean visiting every point exactly or recovering a full delayed state.

## 3. From Winding Integers to a Braid Record

### 3.1. Integer return is only part of the label

For nonconstant phases on a declared closed return chart, the winding count is

$$
k_a=\frac{1}{2\pi}\int_{T_0}^{T_0+P}\dot\theta_a(T)\,dT.
$$

An integer value records net phase return. It does not imply a constant instantaneous frequency or a pointwise fixed relative phase. For example, adding a nonconstant $P$-periodic modulation to one phase changes its within-cycle timing while leaving its integrated winding unchanged. Fixed relative-phase locking is an additional condition, separately stated in the frequency-lock source.

The original lane calls its reduced label $\Lambda_{\mathrm{NS}}$. The current [coincident-midpoint closure-label section](../../../../content/markdown/aaa/noether-braid/zero-axial-offset-three-binary-dynamics-and-interpretation.md#reduced-coincident-midpoint-closure-label) uses $\Lambda_{\mathrm{cm}}$ for that specific branch. Besides three winding counts, it retains within-binary causal-root records, inter-binary delayed exchange records and a chirality entry with its own proof burden. Neither name denotes a new primitive object or a universal figure classifier.

A pair of frequency integers cannot replace those records. A drawn crossing is not automatically a constituent coincidence, a change of causal-root topology or a chirality proof. Returning the reduced coordinates also does not establish return of the retained delayed history. The geometry-to-record bridge remains conditional until the same branch supplies the required identities, roots, phases, frame and return convention.

### 3.2. A bounded rational approximation is not an exact lock

The original source reports a classifier that assigns a bounded-denominator rational label to the rotation/breathing ratio. Such a label is a useful description of detuning within a declared resolution. Every positive finite tolerance can also admit irrational ratios. If the ratio is modeled as $\Omega/\omega=p/q+\delta$ with $\omega>0$ and positive integer $q$, the residual breathing phase after $q$ rotation cycles is

$$
\Delta\theta_{\mathrm{breath}}=2\pi q\delta.
$$

This is the unwrapped mismatch; visible phase agreement compares it modulo a full turn, and repeated candidate cycles can accumulate the mismatch. A small finite-window residual therefore does not establish exact rationality, permanent phase lock or a positive-width set of retained histories.

The classifier is source-reported and has not been executed here. The source also reports that its July 2026 breathing search found no admissible mode in the scanned box because the cycle-averaged tangential pump remained positive there. That is a bounded historical negative, not a theorem excluding every breathing construction. The proposed admissible-mode figure catalog consequently remains empty at that source's recorded stage.

## 4. The Unresolved Physical Correspondence

The mathematical comparison can organize planar, spherical and toroidal phase images once their active variables and maps are declared. External figure catalogs can supply geometric examples; published stability or control results remain tied to their own equations and cannot establish stability under the acceleration-first delayed law of $\mathbb{A}\mathbb{A}\mathbb{A}$ by visual similarity.

The physical correspondence still needs a branch-specific identification of the two-frequency variables, a return criterion that includes the necessary history and a distinction between harmless relabeling and physical change. The proposed literature survey has not been performed here. Attaching figure labels to future modes remains conditional on those modes first being admissible under their actual dynamical owner.

The exact finite-frequency result is the simultaneous phase-return criterion. Its scientific use would be defeated by a supposedly closed record with an unreturned active phase, secular translation or required history, or by a stability claim borrowed from a different governing law. Preserving these distinctions lets a figure describe established phase information without making its appearance stand in for a braid solution.
