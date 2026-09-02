# Atomic-Orbital Structure and Spectra Bridge

## Status and Claim Boundary

- **Work item:** `NAM-004 atomic_orbital_import`
- **Status:** Complete at priority-packet and triage grade.
- **Measured benchmark class:** atomic line frequencies and intensities, ionization thresholds, state-dependent detector distributions, scattering or density reconstructions, and recurring chemical configurations.
- **Derived comparison layer:** the standard central-envelope eigenfunctions, angular labels, node counts, degeneracies, and configuration notation stated below. These are effective observer-level mathematics, not substrate premises.
- **Inferred interpretation:** orbital labels organize repeated atomic records as states of an effective electron envelope.
- **Guessed native bridge:** a localized electron assembly, nuclear assembly, causal-wake history, exclusion envelope, local Noether sea state, and detector response may project to the effective orbital record. No accepted native extractor currently establishes that projection.

This packet does not promote a literal electron trajectory, a physical probability cloud, the Born rule, Pauli filling, or an atomic spectrum as primitive architrino ontology. It does not claim that an electron-assembly carrier, its atomic envelope, or its detector projection has been derived. The reader-facing owners remain [Atomic Structure](../../../../content/markdown/aaa/nuclear-atomic/atomic-structure.md), [Atomic Spectra](../../../../content/markdown/aaa/nuclear-atomic/atomic-spectra.md), and [Wavefunction Ontology](../../../../content/markdown/aaa/quantum/wavefunction-ontology.md).

Plainly: Experiments provide atomic records. Standard orbital mathematics organizes those records very successfully. The open work is to derive why that mathematics emerges from the lower-level dynamics rather than assuming the orbital picture at the start.

## Canonical Standard Notation

Use the observer-level address $(n,\ell,m_\ell,m_s)$:

$$
n\in\{1,2,\ldots\},
\qquad
\ell\in\{0,\ldots,n-1\},
\qquad
m_\ell\in\{-\ell,\ldots,\ell\},
\qquad
m_s\in\left\{-\frac12,+\frac12\right\}.
$$

For a central effective envelope, the spatial state separates as

$$
\psi_{n\ell m_\ell}(r,\theta,\phi)
=
R_{n\ell}(r)Y_\ell^{m_\ell}(\theta,\phi),
$$

with comparison-layer angular readouts

$$
\hat{\mathbf L}^{,2}\psi_{n\ell m_\ell}
=
\ell(\ell+1)\hbar^2\psi_{n\ell m_\ell},
\qquad
\hat L_z\psi_{n\ell m_\ell}
=
m_\ell\hbar\psi_{n\ell m_\ell}.
$$

Plainly: $n$ labels the principal family, $\ell$ the angular family, $m_\ell$ one chosen-axis component, and $m_s$ the separate spin label. These labels describe an effective atomic state; they are not a map of a small object following a fixed path.

The spectroscopic letters are $s,p,d,f$ for $\ell=0,1,2,3$. A subshell contains $2\ell+1$ spatial orbitals and has the standard spin-resolved capacity

$$
N_{\mathrm{subshell}}=2(2\ell+1),
$$

giving capacities $2,6,10,14$. Configuration notation such as $1s^2\,2s^2\,2p^6$ and noble-gas shorthand are the canonical compact forms. The capacity formula is a standard effective recovery target; it must not be used as a substrate derivation of exclusion or spin.

Plainly: The familiar block widths are part of the result that a native account must recover. Repeating those widths in a new code is not additional evidence for why they occur.

## Evidence and Ontology Separation

| Layer | What belongs here | Claim grade | What it does not establish |
| --- | --- | --- | --- |
| Laboratory record | Line positions and intensities, transition outcomes, ionization thresholds, detector counts, and density- or scattering-sensitive observables | Measured when an instrument and source record are named | A literal orbital path, cloud, or native assembly mechanism |
| Effective state model | $\psi_{n\ell m_\ell}$, $R_{n\ell}$, $Y_\ell^{m_\ell}$, node structure, degeneracies, configuration notation, and selection-rule calculations | Derived within the declared effective model; empirically constrained by the records | Permission to import the effective Hamiltonian, Born rule, or point-electron ontology into the substrate law |
| Atomic-state interpretation | The orbital is a state or envelope whose labels organize repeatable atomic preparation and readout | Inferred | Direct imaging of the wavefunction as a material substance |
| $\mathbb{A}\mathbb{A}\mathbb{A}$ carrier | Localized assemblies and causal histories project to the effective envelope and its finite-time records | Guessed until a native extractor and same-record tests pass | Orbital, spectral, exclusion, or Born-rule recovery |

Plainly: The observations are real, and the standard equations are a strong description of them. The shape drawn in a textbook is a representation of that description, not by itself a photograph of substrate material.

## Candidate Native Projection

The minimum candidate record is

$$
\Theta_{\mathrm{atom}}
=
\left(
\mathcal A_N,
\mathcal A_e,
\mathcal H_{\mathrm{wake}},
\Omega_{\mathrm{excl}},
\theta_{\mathrm{sea}}^{(\ell_c)},
W,
\mathcal D
\right),
$$

where $\mathcal A_N$ is the nuclear assembly ledger, $\mathcal A_e$ is the electron-assembly ledger, $\mathcal H_{\mathrm{wake}}$ is the retained causal-wake history, $\Omega_{\mathrm{excl}}$ is the dynamic exclusion envelope, $\theta_{\mathrm{sea}}^{(\ell_c)}$ is the local Noether sea record at declared coarse-graining scale $\ell_c$, $W$ is the preparation and readout window, and $\mathcal D$ is the detector-response record. A future native extractor must produce a normalized effective record distribution,

$$
\rho_{\mathrm{rec}}
\left(
x\mid n,\ell,m_\ell,m_s,W
\right)
=
\mathcal P_{\mathrm{orb}}
\left[
\Theta_{\mathrm{atom}},
\mathcal B_{n\ell m_\ell m_s},
\mu_{*,W},
\mathcal D
\right](./x),
\qquad
\int_W \rho_{\mathrm{rec}}(x)\,d\nu_W(x)=1.
$$

Here $\mathcal B_{n\ell m_\ell m_s}$ is a candidate retained basin and $\mu_{*,W}$ is the finite-window basin measure owned by the measurement program. This notation declares the required interface; it does not supply the basin, measure, or projector. The standard $|\psi|^2$ law remains a recovery target and is not inserted into the master equation.

Plainly: A successful bridge must begin with one physical history record and end with the same distribution of detector records that orbital theory predicts. Naming the projector only identifies the missing calculation.

## Same-Record Recovery Matrix

| Target | Same-record requirement | Acceptance condition | Falsifier |
| --- | --- | --- | --- |
| Angular family | One $\Theta_{\mathrm{atom}}$ supplies the angular readout for a declared central-envelope regime | The extracted modes reproduce $Y_\ell^{m_\ell}$ regularity, $2\pi$ closure, and $m_\ell=-\ell,\ldots,\ell$ without using internal spin to force the labels | Missing modes, extra stable modes, wrong closure, or dependence on a separately fitted label table |
| Radial family | The same carrier supplies energy and spatial readout | Radial node count, scale ordering, and transition differences converge under resolution refinement | Node topology changes under refinement or must be imposed from the standard solution |
| Orbital versus spin | The electron's internal assembly ledger and external atomic envelope remain distinct | $\ell=0$ atomic states can coexist with the separately recovered spin-$\tfrac12$ record without relabeling internal circulation as atomic $\mathbf L$ | A model needs nonzero atomic $\ell$ to produce spin or uses atomic $m_\ell$ as the spin record |
| Occupancy and exclusion | One multi-electron record contains envelope geometry, exchange history, preparation, and readout | The same rule recovers $2(2\ell+1)$ capacities and configuration exceptions without element-by-element patches | Capacity or filling order is supplied only by a lookup table, or the rule fails on a withheld configuration |
| Spectra | State preparation, photon event, recoil, apparatus, and detector provenance share one ledger | Frequency differences, line families, intensity or polarization ratios, and declared selection rules pass source-bound residuals | Separate fitted parameters are required for each line or the transition ledger loses energy, momentum, angular momentum, or provenance |
| Probability readout | Preparation basins, deterministic evolution, apparatus coupling, and record formation share one finite window | The native pushforward matches the effective record distribution and continuity target with a declared tolerance | The fit uses the observed histogram to define its own basin weights, loses normalization, or cannot predict a withheld apparatus context |

Plainly: The decisive test is not whether one orbital-shaped picture can be produced. One carrier and one set of rules must jointly explain the labels, shapes, capacities, transitions, and detector records, including cases held back from fitting.

## Legacy EOC Disposition

The deferred [Electron Orbitals](../electron-orbitals/priorities.md) note contains useful standard notation mixed with a private `EOC` compression and digit-pattern discussion. The standard notation above is retained. `EOC` is not canonical notation and is not a promotion source.

Its capacity digits, complements, repetitions, and periodic-table block correspondences are definition-driven consequences of encoding already known subshell capacities. They are not independent measurements, a native derivation, or evidence for an orbital mechanism. The deferred note may remain as a historical idea record, but `EOC` should enter the corpus only if a preregistered rule predicts a withheld atomic configuration, spectral relation, or chemically relevant state distinction more compactly than standard configuration notation without fitting or restating the answer.

Plainly: Re-encoding $2,6,10,14$ can reveal a mnemonic pattern, but it cannot explain those numbers unless it predicts something not used to build the code.

## Completion Boundary

`NAM-004` is complete when this packet is linked from the owner, the legacy material is triaged as above, and the queue dependency is removed. No reader-facing corpus edit is warranted: the existing corpus already states the effective orbital equations and level separation. Native carrier construction, source-bound residuals, Born-rule recovery, exclusion recovery, and corpus promotion remain open scientific work.

Closure goal: derive one same-record native atomic carrier that recovers effective orbital labels and spectral records without importing orbital or probability ontology at the substrate level.
