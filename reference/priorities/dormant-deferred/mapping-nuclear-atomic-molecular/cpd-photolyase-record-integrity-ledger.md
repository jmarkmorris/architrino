# CPD Photolyase Record-Integrity Ledger

## Status and Claim Boundary

- **Work item:** `NAM-009 dna_record_integrity_bridge`
- **Selected event:** repair of a cis-syn cyclobutane pyrimidine dimer between adjacent thymine bases by CPD photolyase.
- **Status:** Complete at source-bound record-design grade.
- **Current native disposition:** `blocked_missing_native_cpd_photorepair_record`.

The source-defined damage joins adjacent pyrimidines into a cyclobutane dimer, deforms their duplex context, and can block faithful polymerase progression. Photolyase binds the damaged DNA, places the lesion in its active site, uses a photoexcited flavin adenine dinucleotide cofactor, cleaves the lesion bonds, releases the repaired bases stepwise, resets the enzyme, and permits the bases to return to the duplex. These are measured structural and functional records plus source interpretations. They are not primitive molecular laws or an $\mathbb{A}\mathbb{A}\mathbb{A}$ derivation.

Plainly: The information to preserve is not an abstract bit floating above the molecule. It is the ordered identity and pairing capacity of two actual DNA bases inside an intact strand, and repair must restore that usable geometry without silently replacing the record.

## Source-Bound Experimental Packet

| Source | Instrument and measured record | Bounded use here |
| --- | --- | --- |
| Maestre-Reyna et al., [*Visualizing the DNA repair process by a photolyase at atomic resolution*](https://pubmed.ncbi.nlm.nih.gov/38033054/), DOI `10.1126/science.add7795`, with representative [RCSB PDB 7YD7](https://www.rcsb.org/structure/7YD7) | Time-resolved serial femtosecond crystallography produced 18 structural snapshots across four reaction loci; the reported sequence spans picosecond-to-nanosecond lesion repair, recovery of catalytic moieties and a fully reduced enzyme-product complex at 500 ns, then thymine back-flip intermediates and DNA reannealing at 25–200 $\mu\mathrm s$ | Primary time-ordered structure record. It constrains state succession but does not by itself supply an architrino-level transition mechanism. |
| Mees et al., [*Crystal structure of a photolyase bound to a CPD-like DNA lesion after in situ repair*](https://pubmed.ncbi.nlm.nih.gov/15576622/), DOI `10.1126/science.1101598` | Crystal structure of photolyase bound to duplex DNA bent by $50^\circ$; the synthetic lesion is flipped into the active site and split into two thymines by synchrotron radiation at 100 K, leaving a pre-back-flip product-like substate | Geometry benchmark and excitation-context control. Synchrotron-driven cleavage at 100 K is not relabeled as an ordinary blue-light turnover. |
| Li et al., [RCSB PDB 1SL1 and associated polymerase complexes](https://www.rcsb.org/structure/1sl1), DOI `10.1038/nsmb792` | X-ray structures of T7 DNA polymerase with a cis-syn thymine dimer show lesion-position-dependent active-site geometry, misincorporation/bypass behavior, and a strong replication block | Independent functional failure witness for an unrepaired lesion. It does not define the photolyase repair path. |

Plainly: One experiment watches repair unfold, one freezes a repaired-but-not-yet-returned geometry, and one shows what the damaged geometry does to a different DNA-reading machine. Those records constrain different parts of the proposed bridge.

## Information-Bearing Molecular State

For adjacent sites $i$ and $i+1$, define the record-facing DNA state

$$
\mathcal I_{i:i+1}
=
\left(
b_i,
b_{i+1},
o_{i:i+1},
p_i,
p_{i+1},
\beta_{\mathrm{backbone}},
\chi_{\mathrm{lesion}}
\right),
$$

where $b_i,b_{i+1}$ are base identities, $o_{i:i+1}$ is their strand order, $p_i,p_{i+1}$ are complementary-pairing records in the declared duplex context, $\beta_{\mathrm{backbone}}$ is local backbone continuity and orientation, and $\chi_{\mathrm{lesion}}$ records the CPD covalent and geometric state. The intended repaired record has the same thymine identities and order, intact backbone, restored pairing-accessible geometry, and $\chi_{\mathrm{lesion}}=0$.

This is a molecular record definition, not a new substance or biological information postulate. It deliberately ignores irrelevant solvent microstate while retaining every molecular feature needed to distinguish faithful repair from substitution, inversion, backbone damage, or an uncleaved dimer.

Plainly: A repair counts only if the same two positions still mean “T followed by T,” their strand remains intact, and their geometry can again participate in the duplex. Merely removing a visible bump is not sufficient.

## Required Turnover Carrier

The minimum same-event carrier is

$$
\Theta_{\mathrm{CPD}}
=
\left(
\mathcal A_{\mathrm{DNA}},
\mathcal I_{i:i+1},
\mathcal A_{\mathrm{photolyase}},
\mathcal A_{\mathrm{FAD}},
\mathcal H_{\mathrm{wake}},
\theta_{\mathrm{sea}}^{(\ell_c)},
\mathcal L_{\mathrm{photon}},
\mathcal L_{\mathrm{event}},
W,
\mathcal D
\right).
$$

The DNA, enzyme, and FAD entries retain molecular identity and geometry; $\mathcal H_{\mathrm{wake}}$ and $\theta_{\mathrm{sea}}^{(\ell_c)}$ retain the causal history and local Noether sea environment; $\mathcal L_{\mathrm{photon}}$ identifies the absorbed preparation channel rather than assuming a primitive electromagnetic law; and $\mathcal L_{\mathrm{event}}$, $W$, and $\mathcal D$ bind the transition to its accounts, observation window, and time-resolved instrument.

Plainly: The record has to include the damaged DNA, repair enzyme, light-sensitive cofactor, incoming photon channel, environment, and detector timeline. Otherwise a before-and-after picture cannot prove that the same event performed the repair.

## Transition Ledger

Use the source-observed sequence as a comparison target:

$$
\mathsf D_{\mathrm{CPD}}
\rightarrow
\mathsf B_{\mathrm{bound/flipped}}
\rightarrow
\mathsf X_{\mathrm{FAD/lesion}}
\rightarrow
\mathsf C_{1}
\rightarrow
\mathsf C_{2}
\rightarrow
\mathsf P_{\mathrm{enzyme-product}}
\rightarrow
\mathsf R_{\mathrm{reannealed}}.
$$

$\mathsf D_{\mathrm{CPD}}$ is the damaged duplex record; $\mathsf B_{\mathrm{bound/flipped}}$ is the enzyme-bound geometry; $\mathsf X_{\mathrm{FAD/lesion}}$ is the photoexcited cofactor/lesion context; $\mathsf C_1$ and $\mathsf C_2$ distinguish the source-reported single-bond intermediate and complete cleavage rather than collapsing two covalent changes into one label; $\mathsf P_{\mathrm{enzyme-product}}$ is the repaired product while still enzyme-associated; and $\mathsf R_{\mathrm{reannealed}}$ restores the duplex-facing record. The symbols label required records and ordering, not a native kinetic law.

Plainly: Repair is a sequence of checkable states. If a candidate skips the intermediate, loses the original bases, or cannot return them to the duplex, it has not reproduced the measured event.

## Preserved-State, Transition, and Failure Rows

| Row | Same-event requirement | Evidence grade now | Acceptance condition | Falsifier |
| --- | --- | --- | --- | --- |
| `CPD-damaged-input` | One duplex record contains adjacent thymine identities, intact strand order/backbone, and the lesion geometry before enzyme binding | Structure measured; molecular interpretation inferred | Native record distinguishes the CPD state from an undamaged TT step without changing base identities | Lesion status is only a label or the damaged record already assumes the repaired geometry |
| `lesion-recognition-flip` | The same lesion and photolyase records produce bound, bent, active-site-facing geometry | Bound structures measured | Candidate retains base and strand provenance through binding and flip-out | The lesion is replaced, strand order changes, or the active-site state is imposed without a transition |
| `photon-FAD-initiation` | A declared photon-channel event changes the FAD/lesion record inside the same window | Photoactivated repair measured; detailed mechanism source-inferred | Event starts only under the source-bound excitation context and preserves complete photon, cofactor, apparatus, and molecular accounts | Repair occurs identically in a preregistered dark control or photon provenance is absent |
| `two-bond-cleavage` | $\mathsf C_1$ and $\mathsf C_2$ occur in order while the two thymine identities and backbone survive | Time-resolved structures measured | Candidate resolves the single-bond intermediate and complete cleavage without transition-specific fitted rules | Both bonds are declared gone in one uninstrumented jump, the dimer remains, or the strand is damaged |
| `enzyme-recovery-product-release` | FAD and photolyase return to a reusable macrostate while repaired bases leave the pocket in the source-resolved order | Time-resolved structures measured | Repeated execution shows no hidden-state drift and preserves product provenance | Enzyme/cofactor fails to reset, release order is incompatible, or only one hand-crafted turnover works |
| `TT-record-restoration` | The post-release sites recover the original $(b_i,b_{i+1},o_{i:i+1})$, pairing-accessible geometry, and intact backbone with $\chi_{\mathrm{lesion}}=0$ | Back-flip/reannealing structures measured | $\mathcal I_{i:i+1}^{\mathrm{out}}$ matches the declared preserved fields of $\mathcal I_{i:i+1}^{\mathrm{in}}$ while the lesion field changes from one to zero | Base substitution, inversion, missing pairing access, backbone discontinuity, or residual CPD state |
| `polymerase-failure-control` | The unrepaired lesion record is presented to the independently defined T7 polymerase context | Replication-block structures measured | Candidate predicts a lesion-conditioned progression failure distinct from repaired TT progression without fitting the polymerase result into the repair rule | Damaged and repaired records are functionally indistinguishable or the control requires relabeling the lesion after the fact |

Plainly: The output must be the original usable TT record, not merely two molecules called thymine. The polymerase control checks whether the geometric distinction matters to another physical reader.

## Account and Record-Integrity Conditions

Every event state must share one assembly-level account,

$$
\Delta\mathcal L_{E\mathbf p\mathbf J}^{\mathrm{DNA}}
+
\Delta\mathcal L_{E\mathbf p\mathbf J}^{\mathrm{enzyme/FAD}}
+
\Delta\mathcal L_{E\mathbf p\mathbf J}^{\mathrm{photon}}
+
\Delta\mathcal L_{E\mathbf p\mathbf J}^{\mathrm{solvent/sea}}
+
\Delta\mathcal L_{E\mathbf p\mathbf J}^{\mathrm{apparatus}}
=0.
$$

For the preserved fields $K=\{b_i,b_{i+1},o_{i:i+1},p_i,p_{i+1},\beta_{\mathrm{backbone}}\}$, define a record residual

$$
\mathcal R_{\mathrm{integrity}}
=
\max_{k\in K}
d_k
\left(
\mathcal I_{i:i+1}^{\mathrm{out}},
\mathcal I_{i:i+1}^{\mathrm{target}}
\right),
$$

with the target and all $d_k$ tolerances frozen before execution. Acceptance requires $\mathcal R_{\mathrm{integrity}}\le1$, complete event accounts, $\chi_{\mathrm{lesion}}^{\mathrm{out}}=0$, and successful polymerase discrimination on withheld damaged and repaired records. This residual is a design contract; no value has been measured or calculated here.

Plainly: The integrity score checks each feature needed to preserve the local DNA message. It cannot be tuned after looking at the repaired structure, and it does not excuse missing energy or provenance.

## Acceptance Boundary

NAM-009 closes the motif/event selection and record-design task because one damage/repair event is source-bound and now has an explicit preserved state, transition sequence, account identity, independent functional control, and failure rows. None of the native rows has passed. Corpus promotion requires a retained same-event molecular record, preregistered tolerances, photon/FAD and apparatus provenance, repeated enzyme reset, and a withheld polymerase discrimination test.

Closure goal: derive one CPD-photorepair history that restores the same information-bearing TT duplex record while closing every molecular, photon, cofactor, environment, and apparatus account.
