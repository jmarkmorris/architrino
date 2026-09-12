# CRW-005 Black Holes Review — 2026-09-12

Status: ✓ Done — bounded chapter review and repair. Findings BH-01–BH-19 are dispositioned in [Black Holes](../../../../content/markdown/aaa/spacetime/black-holes.md), with validation and remaining physical obligations recorded below. Write authority covers only that chapter and this report; HQ owns shared-board and queue integration.

## Baseline and review boundary

| Record | Measured value and instrument |
| --- | --- |
| Baseline chapter SHA-256 | bd2baf7d1a3059234eb5113445277ecc960a3f1b69bd390b0ab6cf3cfe202db4, by shasum -a 256 on the chapter |
| Baseline revision | ab3ed93a59e69a5807397c24cefcfcb3a9642487, by git rev-parse HEAD |
| Final chapter SHA-256 | 5c36552d19af2504dc40fbef4f8db40d92c50b7ad5bb8cd6a9fd31a3344abc07, by shasum -a 256 and Node crypto over the chapter |
| Baseline preservation | git show of the chapter at the recorded revision, piped to shasum -a 256, reproduced its baseline digest |
| Initial scoped state | git --no-optional-locks status --short over the chapter/report returned no entries; test ! -e confirmed the report was new |
| Read coverage | Complete 1,350-line baseline and edited lines 1–1,354 read in contiguous sections; the eight final wording adjustments were reread in place |
| Concurrency guard | Fresh passage reads and digest checks preceded edits; guarded Node replacements required the exact expected digest and exactly one match per replacement |

This task's write-tool record names only the chapter and this report. The supporting agent made no writes. No Git writes, linked worktrees, shared-board edits, generated writes, or solver runs occurred. Line references below were located with sed, nl, and rg against the recorded baseline and edited source. This is a measured review of those bytes, not a causal attribution to their last editor.

The native question is whether terminal alignment admits a complete delayed history, controlled acceleration and continuation, and an observer-level escape map. Local speed equalities, finite coarse fields, and named labels cannot establish those results alone. The repairs retain the strong-field proposals at guessed grade.

## Findings and bounded dispositions

P1 denotes a major layer, inference, or mathematical-contract error; P2 denotes a material definition, domain, or source-support defect. A demonstrated defect is not an experimental falsification of the native theory. An open obligation identifies missing proof obscured by stronger wording. ✓ Done means the chapter repair is implemented, never that the physical obligation is solved.

| ID | Severity and kind | Baseline → final chapter lines | Repair, grade, and falsifier or reopening condition |
| --- | --- | --- | --- |
| BH-01 | P2, definitions/layers | 5–17, 56–112 → 5–17, 56–112 | ✓ Done. Defined substrate ingredients, retained history, time layers, distinct speeds, composition factor, and residual domains; used $c_0$ in electron comparisons and distinguished crossover from the ultrarelativistic limit. Fermi-model scaling is derived within its effective assumptions; native mapping is guessed. Reopen native use only with the state-counting and energy-map derivation. |
| BH-02 | P2, demonstrated chart dependence | 134–183 → 134–183 | ✓ Done. Native histories use $T$; metric determinants now share an effective chart through a smooth invertible map. Positive-radius and averaging domains are stated. The Jacobian cancellation is derived; material-to-metric correspondence remains open. Falsifier: coordinate change alters the repaired ratio for fixed geometry. |
| BH-03 | P1, causal and local/global conflation | 264–314, 1056 → 264–316, 1060 | ✓ Done. Alignment is not a self-hit or horizon certificate. Added the native root/fixed-site wake argument, outermost closed apparent-surface condition, complete effective development for the event horizon, and a distinct dark-channel escape test. The logical distinctions are derived; physical horizons remain open. Reopen with admissible histories and an observer escape map. |
| BH-04 | P1, unsupported retention/regularity | 244–262, 407–411, 902–947 → 244–262, 409–413, 906–949 | ✓ Done. Finite coarse fields do not prove acceleration control, binding, stability, or continuation. An outward self-hit contribution does not prove a barrier. GR incompleteness is distinguished from weak-field failure and curvature blowup. Recycling and regular embedding remain guessed. Reopen with full acceleration balance, complete roots, stability, and continuation. |
| BH-05 | P2, demonstrated overprecision | 389–401 → 391–403 | ✓ Done. Removed the universal four-percent metric claim; the quoted diameter fractions are 7.1% and 4.4%. EHT quantities are imaging/modeling inferences. A sharper metric constraint requires its mass-distance and ring-to-shadow likelihood, including transfer uncertainty. |
| BH-06 | P1, circular test/heuristic overclaim | 417–512 → 419–514 | ✓ Done. Localization/radius crossing is heuristic. The residual uses an independently justified nonempty formation domain and fixed normalized weights; deleting the candidate horizon no longer disables the test. Crossing algebra is derived from assumed effective scales; formation and alignment remain open. Reopen with an independent formation calculation. |
| BH-07 | P1, carrier and clock overclaim | 194–198, 533–565 → 194–198, 535–567 | ✓ Done. Photon/neutrino physical referents remain pending. Segment sums need matched clocks or clock-transfer factors. $E=h\nu$ applies only in a validated effective photon regime. Reopen with a retained carrier branch and calibrated channel, endpoint-frequency, and energy map. |
| BH-08 | P1, undefined entropy count | 589–644, 681–701 → 591–648, 685–703 | ✓ Done. Counts require finite nonempty coarse classes, fixed resolution/tolerances, and a measure. Log-cardinality assumes equiprobability. Interaction/boundary energy is assigned once; large-block limits require enlarging interfaces. Equal projected counts prove neither state/measure correspondence nor area law. These distinctions are derived; reopen with the actual ensemble, correspondence, and density limit. |
| BH-09 | P2, demonstrated overlap nonimplication | 573–587 → 575–589 | ✓ Done. The causal-horizon cut is independent of $F_H=0$; $\eta_H$ measures exact area overlap under one regulator, not closeness or global causality. Disjoint approaching surfaces refute the old inference. Reopen the intended limit with a separate surface-convergence theorem and causal construction. |
| BH-10 | P1, entropy double count/Page mismatch | 679, 729–732, 765–807 → 683, 731–734, 767–824 | ✓ Done. Horizon-only $S_H^{(O)}$, generalized $S_{\mathrm{gen}}^{(O)}$, and fine-grained radiation entropy are distinct. Exterior entropy is added once. Page turnover is not a universal horizon/radiation equality. Algebra demonstrates the former double count; native entropy recovery remains open. Falsifier: substitution still produces two exterior terms. |
| BH-11 | P1, demonstrated equilibrium-test error | 717–740 → 721–741 | ✓ Done. Replaced equal unweighted conditional probabilities with population-weighted flux balance and positive normalization. CPT recovery is separate and does not imply equilibrium during evaporation. The two-state witness below proves the defect. Reopen with native rates, populations, channel measure, and reversal map. |
| BH-12 | P2, thermodynamic/discrete domains | 648–679, 741–753 → 652–683, 743–755 | ✓ Done. Specified stationary comparison and fixed-calibration domains; labeled lifetime an idealized blackbody estimate. Finite state counts need a thermodynamic limit before differentiation. Discrete spectator counts use a finite difference. Reopen with a controlled limit, release spectrum, and boundary-work terms where applicable. |
| BH-13 | P2, complexity endpoints | 828–851 → 832–855 | ✓ Done. Defined identity at $N=0$, unreachable value $+\infty$, and fixed local update/resource conventions. This is a formal count, not measured duration or cost. Falsifier: the claimed physical interpretation changes under arbitrary update rescaling; calibration is still required. |
| BH-14 | P1, finite records treated as sufficient state | 855–885, 914 → 859–891, 919 | ✓ Done. Corrected the medium variable; required all relevant history, including earlier boundary-crossing wakes. Supplied medium history is input or a consistency condition. Coarse records select history families; unique outputs need constancy on that family or a statistical projection. Reopen with existence/uniqueness and observer sufficiency. |
| BH-15 | P2, mass/capture/energy partitions | 951–1028 → 955–1032 | ✓ Done. Fixed Schwarzschild parameters; distinguished tidal $M^{-2}$ from Kretschmann $M^{-4}$. Mass neither forces a neutron-star route nor proves strongest environmental coupling. Capture radius need not be bounded by horizon radius. Defined energy before separately subtracted escape. Reopen with a channel capture calculation, formation history, and independent energy map. |
| BH-16 | P2, jet-domain overreach | 1052, 1092–1130, 1219 → 1056, 1096–1134, 1223 | ✓ Done. Restricted Newtonian escape-speed comparison to weak-field nonrelativistic flow; relativistic AGN predictions are separate. Spin extraction is a specified effective mechanism, not a universal native requirement. Removed personal conversation framing. Reopen with a source-specific launch and propagation calculation. |
| BH-17 | P1, native energy import | 1236–1250 → 1240–1254 | ✓ Done. Removed $E_N=h\nu_N$ and defined the schematic cadence current, sources, and relaxation operator. Noether Sea leaves native action/calibration unproved. Transport remains guessed. Reopen with a branch-derived energy–cadence relation and observer calibration. |
| BH-18 | P2, source/model conflation | 35, 785, 919, 1280–1288 → 35, 787, 923, 1284–1292 | ✓ Done. Added selective primary citations and inference boundaries for collapse, GW250114, embedding, star-formation coupling, GLIMPSE-17775, QSO1, and MRG-M0138. Separated QSO1's modeled mass from its simple lower bound; removed an unsupported large-$D$ identification. These remain reported measurements/inferences or conditional models. Falsifier: the cited source fails to support the stated result or assumptions. |
| BH-19 | P2, dimensional scale treated as bound | 1318 → 1322 | ✓ Done. $c_0^5/G$ and $c_0^4/G$ are dimensional scales. Universal maxima need additional hypotheses; broad formulations face published counterexamples. This does not refute every restricted bound. Reopen with a precise applicable theorem and native flux recovery. |

## Independent reasoning and counterexamples

### Native support and regularity

At normalized wake speed $c_f=1$, one emission at $T_t=0$ from the origin reaches a prescribed site $\mathbf Y=(3,0,0)$ at $T_r=3$. This follows directly from the causal-sphere equation; the transmitter's later alignment is absent. This is a derived geometric witness, not a retained black-hole simulation, an actual fixed receiver, or a decodable signal.

The [master-equation per-hit law](../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form), inspected at lines 1402–1452, contains $r^{-2}c_f/|D_t|$. Finite selected medium fields supply no lower bound on $r$ or $|D_t|$. Thus a finite coarse residual alone does not bound acceleration or resolve a degenerate root. This does not claim that a particular physical history realizes a divergence; constructing or excluding such histories remains open.

### Coordinate and probe comparisons

In three dimensions, $\gamma=a^2h^{\mathrm{ref}}$ gives $\det\gamma/\det h^{\mathrm{ref}}=a^6$. Under a common coordinate change both determinants gain the same squared Jacobian; unrelated charts leave an arbitrary factor. This proves the mathematical repair, not the material-to-metric map.

The old active indicator used the candidate's own $R_H$. Setting $R_H(E;\theta)=0$ disables it for every positive probe scale even if alignment and release predictions are wrong. The repaired active set comes from an independent formation benchmark. Separately, for positive fixed parameters, $\hbar c_0/E\le2G_{\mathrm{eff}}E/c_0^4$ is equivalent to $E^2\ge\hbar c_0^5/(2G_{\mathrm{eff}})$. This algebra does not prove localization assumptions or collapse.

### Counts, balance, and entropy

One label with a real parameter in $[0,1]$ has uncountably many exact states. A fixed finite-resolution quotient is an additional construction. Sets $\{a,b\}$ and $\{c,d\}$ have equal cardinality without a specified physical correspondence or probability measure.

For a two-state discrete-time comparison, take
$$
P=\begin{pmatrix}1/2&1/2\\1/4&3/4\end{pmatrix},
\qquad
\pi=(1/3,\,2/3).
$$

Direct multiplication gives $\pi P=\pi$ and equilibrium fluxes $\pi_A P_{AB}=1/6=\pi_B P_{BA}$. Yet the old unweighted squared difference equals $(1/2-1/4)^2=1/16>0$. This independently checkable algebra proves the old test rejects an equilibrium; it does not establish black-hole transition rates or CPT.

Writing $H$ for horizon-only entropy and $O$ for exterior entropy, the old definition $S_H=H+O$ followed by $S_H+O$ gives $H+2O$. The repaired generalized entropy is $H+O$. Fine-grained radiation entropy describes a separately declared subsystem; a Page turnover cannot be assigned to a generic horizon-plus-exterior sum.

### Surface and mass comparisons

Take a regulated unit square at height zero and its translate at height $1/n$. Separation tends to zero, but the intersection is empty for every finite $n$, so exact-overlap fraction stays zero. This geometric counterexample is not an actual entropy-surface model.

At fixed effective parameters, $R_H\propto M$ gives $GM/R_H^3\propto M^{-2}$, while $G^2M^2/(c_0^4R_H^6)\propto M^{-4}$. A Schwarzschild null-capture comparison also has critical impact parameter $b_c=3\sqrt3\,GM/c_0^2>2GM/c_0^2$: maximizing $(1-2m/r)/r^2$ at $r=3m$, with $m=GM/c_0^2$, gives the result. These are effective comparison derivations, not native capture or material-damage predictions.

## Source audit and anchor scope

The read-only supporting agent /root/crw_005_bh_source_check used the albert-einstein analytical role. Its agreement is not mathematical independence; the algebra above, actual owner equations, and source material supply the evidence. Its second native audit covered snapshot 6fea2134f463253b8a8c640dba75861c9ab585ae809b14426c12240f7710a7d2 and specifically the causal/horizon and escape passages, not the entire final chapter.

| Primary source | Material inspected and limit |
| --- | --- |
| [EHT M87](https://arxiv.org/abs/1906.11243), [Sgr A imaging](https://arxiv.org/abs/2311.08680), [metric test](https://arxiv.org/abs/2311.09484) | Abstracts and stated diameter/calibration results; no visibility or posterior reanalysis |
| [Penrose](https://journals.aps.org/prl/pdf/10.1103/PhysRevLett.14.57) | Relevant proof pp. 58–59; causal completeness is the contradicted assumption |
| [Hawking–Penrose](https://doi.org/10.1098/rspa.1970.0021), [Choptuik](https://doi.org/10.1103/PhysRevLett.70.9) | Primary abstracts; full Hawking–Penrose publisher fetch returned 403 |
| [Almheiri et al.](https://arxiv.org/html/2006.06872v1) | Relevant §§2.2, 6–8, 12 for entropy meanings and surface selection |
| [Ryskin](https://arxiv.org/pdf/1810.07520) | Full two-page paper, pp. 394–395, for effective thermal absorption/emission comparison |
| [Ryu–Takayanagi](https://arxiv.org/html/hep-th/0605073v3) | Relevant §6.3 for finite-temperature surfaces approaching a horizon |
| [LVK GW250114](https://arxiv.org/abs/2509.08054) | Primary abstract and stated area/ringdown conclusions; no strain reanalysis |
| [Cadoni et al.](https://arxiv.org/html/2601.03296v2) | Relevant §§II–IV and equations 7, 21, 28–29 |
| [Ahlen et al.](https://arxiv.org/html/2504.20338v2) | Equations 1–3, tables 1–2, and discussion; model-dependent cosmological interpretation |
| [Kokorev et al.](https://arxiv.org/html/2511.07515v2) | Spectroscopy/interpretation in §§III–IV and conclusion |
| [Maiolino et al.](https://www.nature.com/articles/s41586-026-10579-4) | Main text/methods; inclination-aware mass versus lower bound |
| [Newman et al.](https://arxiv.org/abs/2503.17478) | Primary abstract; no lens or dynamical-model rerun |
| [Krolik and Hawley](https://arxiv.org/abs/0909.2580) | Authors' simulation-synthesis abstract; no simulation rerun |
| [Jowsey–Visser luminosity](https://arxiv.org/abs/2105.06650), [maximum force](https://www.mdpi.com/2218-1997/7/11/403) | Luminosity abstract and force-paper counterexample material; a later force-page refetch returned an internal web error |

Live local anchors included task-relevant passages in Foundations ontology, Architrino, Absolute Time, Euclidean Void, Absolute Timespace, Detecting the Absolute Frame, and Constructing the Model; Master Equation causal-root, acceleration, DDE, and self-hit sections; Observer Framework; Noether Sea; Emergent Metric; Singularity Resolution; Horizon Chirality; Neutrinos; and Photon Guide referent status. Noether Sea lines 530–537 specifically support BH-17. These anchors were consulted for the stated questions, not exhaustively reviewed or edited.

## Known-case-first and validation

Before the baseline equation audit, a Node control contained one real display x^2+1, one mapping link, and one fenced display. Assertions confirmed exactly one extracted display and its expected link. KaTeX accepted the valid expression and rejected an intentionally invalid command. The pass was recorded before the separate target run.

A fractional-percent control returned 25 for uncertainty 1 on value 4 before target arithmetic returned 7.142857142857143 for 100*3/42 and 4.44015444015444 for 100*2.3/51.8. These are diameter fractions, not metric confidence intervals.

A final metadata control confirmed startLine=2, the expected existingLink.semanticId, and fenced-code exclusion before the final metadata run. An earlier final-audit formatter requested absent fields line and link; its display-render check remained valid, but the omitted metadata was not used as an ID receipt. The corrected run used the actual parser fields.

| Check | Measured result and scope |
| --- | --- |
| Full source review | Complete baseline and edited chapter reread, with final wording corrections reread in place |
| Scoped whitespace | git --no-optional-locks diff --check over the chapter/report exited 0. The additional git diff --no-index --check from /dev/null to the untracked report produced no whitespace diagnostics and exit 1 for differing contents. |
| Strict content | node scripts/validate-content.mjs --check --strict exited 0 with 0 errors, 0 warnings, and 30 notes on the final chapter digest and completed report body; it audited 199 corpus Markdown files and 1,656 repository Markdown files. |
| Final display equations | parseCorpusDisplayEquations plus katex.renderToString, throwOnError true and strict error, measured 68 displays, 68 links, and 0 display errors at the final chapter digest |
| Mapping-ID preservation | Ordered semantic-ID comparison with the baseline found all 68 IDs preserved; 11 display bodies changed |
| Report mathematics | The same known-case-checked parser and KaTeX rendered the report's one display equation with zero errors. The matrix identities were also checked by the explicit algebra above. |
| Generated registry | node scripts/build-equation-mapping-corpus.mjs --check exited 1: content/generated/equation-mapping/corpus-equations.json is stale; 199 Markdown files and 4,685 displays were scanned at that live run |

Changed display IDs: corpus-equation-a54823296b97e107; corpus-equation-007f8f237e7aa63b; corpus-equation-0c2c048da19789a2; corpus-equation-d7be45d3e9739137; corpus-equation-0bcc5d9ac959d830; corpus-equation-df0bcc96fc1c39a7; corpus-equation-e8a4f2ac7071d66d; corpus-equation-31df12d1a524d733; corpus-equation-9b11b8b1039d4149; corpus-equation-9b294a6c4b9707c1; corpus-equation-145a368c973339ce.

The exact later regeneration command is `node scripts/build-equation-mapping-corpus.mjs --write`, followed by `node scripts/build-equation-mapping-corpus.mjs --check`. This task changed fingerprinted equations, so corresponding drift is expected; no global drift attribution is made in the concurrently edited checkout. Regeneration belongs to the separately authorized publication/regeneration workflow. Reading-copy, source-index, iOS, PDF, and runtime freshness are not certified here. KaTeX checks establish display syntax, not visual layout or mathematical correctness; no complete inline-math audit is claimed.

## Physical obligations and HQ handoff

The chapter now distinguishes the requirements for stronger claims: an admitted retained assembly history; complete roots and acceleration balance; binding and stability; regular continuation; a sufficient history-to-observer projection; independently calibrated energy, entropy, and transport maps; and source-specific observational recovery. None is supplied by this editorial repair. No no-escape, singularity-resolution, or unitarity theorem, derived release channel, cosmological coupling, solver certification, or empirical acceptance is claimed.

HQ may integrate this receipt as bounded chapter completion. Downstream chapters, shared review status, priorities, queues, and work logs remain outside this worker's edits. The target/report pair and final chapter digest are the handoff; this receipt authorizes neither publication nor downstream closure. The only edits after the final strict check were this completion status, its validation receipts, and the handoff wording.
