# OPS-031 Ontology review — 2026-09-20

## Scope and disposition

The full [Ontology chapter](../../../../content/markdown/aaa/foundations/ontology.md), 326 lines by `wc -l`, received report-only review as the first priority-1 chapter of the approved cycle. `shasum -a 256` before review and again before receipt creation returned `48bf11bec4defceb1a317443928e43ecebfae28340aef02ac2f8c0754e47c43d`. No corpus, shared queue, or work-log edits were made by this reviewer. CRW-005 remains closed.

Reviewer: Codex delegated agent `ops_031_ontology`, inherited model/settings; exact model identifier was not exposed to the reviewer. This is an ordinary scheduled review, not a claimed comparison of model quality. Review time and operator burden were not instrumented.

Disposition: two small proposed corrections, one explaining a probabilistic assumption and one clarifying notation. No changed physical postulate, completed Bell recovery, retained assembly, or newly demonstrated dynamical defect is claimed. Both proposals remain unaccepted; the coordinator routes them through the current corpus owner.

## Findings

### ONT-20260920-01 — Low: the introductory Bell paragraph underdescribes factorization

At source line 232, the clause “each outcome probability to depend only on the local setting and $\lambda$” is immediately called “That factorization.” If read as a condition on the two marginal probabilities, it states parameter independence, which is weaker than conditional product factorization. The later displayed joint law at lines 246–250 is correct and substantially limits the defect: the chapter's actual Bell constraint and provisional route need no change.

Independent algebraic counterexample to the marginal-only reading: take binary settings $x,y\in\{0,1\}$ independent of a constant $\lambda$. Define $P(a,b\mid x,y,\lambda)=1/2$ when $a\mathbin{\mathrm{xor}}b=xy$ and zero otherwise. For every setting pair, both one-wing marginals equal $1/2$, so neither depends on the remote setting. Nevertheless, with signed outcomes $A=(-1)^a$ and $B=(-1)^b$, the correlators are $E_{00}=E_{01}=E_{10}=1$ and $E_{11}=-1$, giving $E_{00}+E_{01}+E_{10}-E_{11}=4$. The joint law is not the product of its marginals. This is a probability-table counterexample, not a proposed physical realization or an Architrino trajectory.

The separately authored reference also makes the omitted distinction explicit: Bancal et al., [Figure 2 and its caption, page 2](https://arxiv.org/pdf/1110.3795), require screening off the other outcome as well as the remote setting before obtaining the product law. Their local expression conditions away $b,y$ from the response at A, and $a,x$ from the response at B.

Smallest proposed repair: replace the two introductory sentences with “For settings chosen independently of a complete hidden state $\lambda$, Bell-local causality requires the joint outcome probability to factor into two local response probabilities, each depending only on its own setting and $\lambda$. This conditional factorization implies Bell inequalities.” This makes the introduction agree with the existing displayed equation. It does not alter the chosen recovery route. The deterministic special case already implies outcome independence once a complete state fixes both responses, but that restriction is not stated in this general introduction to Bell's theorem.

Falsifier: an explicit definition in the same introductory passage that already makes “each outcome probability” conditional on the other outcome, or an explicit restriction there to deterministic responses, would remove the identified ambiguity. The correct later equation does not require repair and must be preserved.

### ONT-20260920-02 — Low: the clock-map routing uses an untyped time symbol

Source line 273 routes clock extraction as $t\mapsto\tau$ without defining $t$. The [Mathematics Style Guide, Coordinate and Time Layers](../../../../content/markdown/aaa/archie/mathematics-style-guide.md#coordinate-and-time-layers) distinguishes native $T$ from effective observer time $t_{\mathrm{eff}}$. The [clock chapter](../../../../content/markdown/aaa/spacetime/proper-time-and-time-dilation.md) explicitly retains both $d\tau/dT$ and $d\tau/dt_{\mathrm{eff}}$, including its opening and line 272. This independent owner comparison establishes a notation ambiguity, not a wrong computed clock rate.

Smallest proposed repair: replace the bare expression with “native clock extraction and its observer-coordinate projection,” or explicitly name both maps. Falsifier: a local definition of $t$ that fixes its layer would remove the ambiguity. No such definition appears in the full inspected chapter.

## Valid no-change dispositions

| Passage | Checked basis and disposition | Observation that would overturn it |
| --- | --- | --- |
| Four-level inventory and abridged postulates, lines 13–77 and 123–198 | The inspected foundation definitions distinguish the fixed background, primitive identities and wakes, assembly/medium variables, and observer records. The hub explicitly delegates canonical wording. No postulate change is warranted by this review. | A conflict between an abridged statement and its live canonical Summary Postulate. |
| Conditional projection tower, lines 79–103 | Independently checked the set-theoretic criterion: define a function on the image of $C$ by assigning the common record value on each fiber. It is well-defined exactly when records agree on each fiber. The chapter states this condition and does not claim that the displayed smooth tuple is sufficient. Keep unchanged. | Two admitted detailed states with equal retained data and different records presented as if this factorization nevertheless held. |
| Typed regularity conditions, lines 105–120 | Compared the source's simple-root condition with Master Equation lines 121–163, the frame construction with its reconstruction lemma, and wake-center language with Detecting the Absolute Frame lines 125–183. Conditions are assigned to different maps; no universal inverse theorem is claimed. Keep unchanged. | A use of one table condition as sufficient for a different inverse problem; in particular $G_a$ must not become a free-radius/global uniqueness certificate. |
| Exchange topology, lines 174–184 | Independent topological reduction: an unordered pair of distinct centers is represented by center, positive separation length, and an unoriented unit separation direction; its configuration space is $\mathbb R^3\times(0,\infty)\times\mathbb{RP}^2$, with fundamental group $\mathbb Z_2$. The text separately requires the exchange class to survive the retained quotient and a nontrivial effective holonomy. Keep unchanged. | A claim that this point-center topology alone supplies a retained assembly or fixes the fermionic holonomy. |
| Bell recovery boundary, lines 238–268 | The correct joint factorization, measurement-independence alternatives, inability of shared provenance alone to evade Bell, and the remaining finite-speed multipartite obstruction are explicit. Bancal et al.'s inspected pages 1–3 support treating disconnected-party degradation as insufficient by itself. Keep the provisional route and its unresolved burden unchanged. | A supplied multipartite law proving closure, or a source-supported counterexample invalidating the stated obstruction on its own assumptions. |
| Closing routing and summary, lines 282–326 | Direct full-source reading keeps parameter values, assembly quantities and closure work with their owners and does not turn open recoveries into new primitive inputs. Keep unchanged. | A concrete downstream claim promoted to a primitive by this routing. |

## Source and review limits

The local reading used the AGENTS/router/review-skill owners, periodic review procedure, corpus-reviewer prompt, academic and mathematical conventions, terminology and comparative references, About Architrino, and the geometry/dynamics review lens. Nearby foundation and dynamics reads were targeted to the claims above; they are not full reviews of those other chapters.

External verification was bounded to the sources already cited by Ontology. The [Hensen et al. arXiv abstract](https://arxiv.org/abs/1508.05949) reports the detection and locality conditions attributed to it; no reanalysis of its data was performed. The [Laidlaw–DeWitt publisher abstract](https://journals.aps.org/prd/abstract/10.1103/PhysRevD.3.1375) supports the attributed relationship between multiply connected configuration spaces and scalar propagators; the subscription full text was not inspected. The topology calculation above supplies a separate check of the particular two-center claim. Bancal et al.'s abstract and relevant PDF pages were inspected, not every supplementary derivation. Initial DOI fetch failures were retrieval failures and are not reported as broken corpus references.

The mathematical checks in this receipt are explicit reasoning, not numerical instruments or runtime tests. No new parser, validator, simulation, renderer, generated artifact, or reference implementation was introduced. This review does not establish corpus-wide correctness, the physical realizability of the probability counterexample, or closure of the clock, spin-statistics, Bell, or Noether sea programs. Previous-repair/no-change sampling and cycle-level inventory remain coordinator responsibilities; this receipt covers one full chapter only.
