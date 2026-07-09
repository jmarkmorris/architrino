# Decision: Theory Closure and Corpus Convergence as the Guiding Objective

- Date: 2026-07-08
- Status: Accepted

## Decision

The guiding objective of the Architrino knowledge system is **Theory Closure** and **Corpus Convergence**.

- **Theory Closure** is the progressive reduction of unresolved questions, inconsistencies, missing derivations, and unexplained phenomena until the theory forms a coherent and comprehensive explanatory framework.
- **Corpus Convergence** is the continual movement of the knowledge corpus toward the current canonical theory state. Every contribution, revision, and discovery should reduce divergence, propagate insights, strengthen explanations, eliminate redundancy, and increase internal coherence.

Closure is the destination; convergence is the process. As understanding advances, the canonical state advances, and the corpus continuously converges toward it. The corpus is never static.

**Convergence** replaces **corpus advancement** as the canonical name for the corpus-improvement process. The advancement pass becomes the **convergence campaign**. Documents are rewritten forward-only to the new terms; `advancement` is not retained as a coexisting synonym.

## Convergence Vocabulary

| Term | Meaning |
| --- | --- |
| Convergence | The overall process of moving the corpus toward the canonical theory state. |
| Convergence Agent | An agent responsible for reducing a specific class of residual error. |
| Convergence Campaign | A coordinated execution of convergence agents over the corpus (formerly a corpus-advancement pass). |
| Convergence Target | A specific inconsistency, omission, or improvement opportunity. |
| Convergence Metric | A measure of corpus distance from the current canonical theory. |
| Convergence Debt | Known deficiencies awaiting resolution, analogous to technical debt. |
| Convergence Operator | The transformation a convergence agent performs on the corpus. |
| Convergence Frontier | The remaining boundary between the corpus and current understanding. |

## Mapping Onto Existing Structures

| Vocabulary | Existing structure |
| --- | --- |
| Convergence Campaign | A run of [corpus-advancement-pass.md](../entourage/archie/prompts/corpus-advancement-pass.md) (to be renamed `convergence-campaign.md`). |
| Convergence Target | A priority item in `reference/priorities`. |
| Convergence Debt | The priority ledgers, collectively. |
| Convergence Frontier | [closure-join-matrix.md](../priorities/aaa-work-threads/closure-join-matrix.md) and the current core geometry focus. |
| Theory Closure | The objective already named by the `Closure goal:` prompt convention, which is unchanged. |

## Scope Boundary

Convergence vocabulary is operator/agent-facing workflow terminology. It belongs in `AGENTS.md` and `reference/`. It must not enter reader-facing prose in `content/markdown/aaa`: internal workflow labels are excluded from textbook prose, and `convergence` already carries its mathematical meaning there (series, integral, and iterative convergence). The two senses must not collide.

## Constraints Carried Forward

- A Convergence Metric is named vocabulary only. Metric tooling is built only when it has a concrete consumer, per the anti-gate-proliferation policy in `AGENTS.md`. Until then the working metric is qualitative: each campaign must leave the corpus measurably closer to canonical — debt items retired, targets closed.
- The installed `aaa-corpus-advancement` skill is managed outside this repo. Its in-repo protocol text is updated with the rename; the skill identifier itself is renamed separately when convenient.

## Alternatives Considered

- **Keep `corpus advancement` as the process name**, using `convergence` only for the objective statement. Rejected: it leaves two overlapping process terms, violating the no-alternate-names rule, and discards the main benefit — one word that names the process, the operator, the debt, and the destination coherently.
- **Knowledge Curation** as the objective label. Rejected: encodes maintenance but not direction or destination.
