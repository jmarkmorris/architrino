Proof assistants such as **Lean, Coq, and Isabelle** are formal verification systems designed to check mathematical proofs with machine precision. They implement a **formal logic foundation** and require every inference step to be justified according to that logic. If the proof compiles, it is logically valid under the system’s axioms. There is no ambiguity or reviewer interpretation.

All three are **free and publicly available**.

---

# Core idea

Instead of writing proofs in natural language, the mathematician writes them in a **formal language**.

Example (informally):

> If (a = b) and (b = c), then (a = c).

A proof assistant requires every step:

1. declare variables
2. state hypotheses
3. apply a transitivity theorem

The system verifies that each transformation is valid.

This is essentially **type-checked mathematics**.

---

# 1. Lean

Lean (proof assistant)

Lean is currently the fastest growing system in academic mathematics.

Origin:

* Microsoft Research (Leonardo de Moura)
* now developed by the Lean community

License:

* **open source (Apache-2.0)**
* completely free

Major feature:
**mathlib**, a massive open-source mathematical library.

It already contains formal proofs of large areas of mathematics:

* algebra
* topology
* measure theory
* number theory
* category theory

Notable milestone:

In 2023 the **sphere packing theorem** (Hales) was fully formalized in Lean.

Lean has become the dominant system for **formalized mathematics research**.

Typical workflow:

```
VS Code + Lean extension
```

Example Lean proof:

```lean
theorem trans (a b c : Nat) (h1 : a = b) (h2 : b = c) : a = c :=
by
  rw [h1, h2]
```

The compiler checks it.

---

# 2. Coq

Coq proof assistant

One of the oldest and most powerful systems.

Origin:

* INRIA (France)
* based on **Calculus of Inductive Constructions**

License:

* **open source (LGPL)**

Coq is famous for verifying extremely deep systems.

Major achievements:

* **CompCert** — formally verified C compiler
* **Four Color Theorem** formalization
* large formal developments in algebra and homotopy type theory

Coq proofs are often more verbose but extremely expressive.

Example:

```coq
Theorem trans : forall a b c : nat,
  a = b -> b = c -> a = c.
Proof.
  intros a b c H1 H2.
  rewrite H1.
  rewrite H2.
  reflexivity.
Qed.
```

---

# 3. Isabelle

Isabelle proof assistant

Developed at Cambridge and TU Munich.

Key system:
**Isabelle/HOL** (Higher-Order Logic).

License:

* open source (BSD-style)

It emphasizes **automation** and strong integration with classical logic.

Notable formalizations:

* **Kepler Conjecture** verification (Flyspeck project)
* formal semantics of programming languages
* security protocol verification

Its interface uses **Isabelle/jEdit**, a custom IDE.

Example proof:

```isabelle
lemma trans:
  assumes "a = b" and "b = c"
  shows "a = c"
using assms by simp
```

---

# Why these systems matter

Human mathematical proofs contain:

* gaps
* implicit steps
* informal reasoning

Formal systems eliminate that.

A theorem becomes:

```
axioms + formal logic → machine-verified truth
```

This is stronger than peer review.

---

# Scale of current formal mathematics

Rough approximate sizes:

| system             | library size      |
| ------------------ | ----------------- |
| Lean mathlib       | ~1 million lines  |
| Coq libraries      | ~1 million+ lines |
| Isabelle libraries | ~1 million lines  |

Large areas of undergraduate mathematics are now fully formalized.

---

# Relationship to AI

This is where things get interesting.

AI + proof assistants may transform mathematics.

Current experiments:

* LLMs generating Lean proofs
* reinforcement learning searching proof trees
* automated conjecture generation

Because formal systems have **precise correctness signals**, they are ideal environments for AI reasoning.

Mathematics becomes closer to **software engineering**.

---

# Accessibility

Anyone can use them.

Typical setup:

Lean (easiest):

1. install VS Code
2. install Lean extension
3. install mathlib

Total cost:

**$0**

No academic affiliation required.

This is one of the first areas where **independent researchers can produce fully verified mathematical results** without institutional infrastructure.

---

# Important limitation

Writing formal proofs is still extremely labor intensive.

A typical ratio today:

```
1 page informal proof
≈ 5–20 pages formal proof code
```

The situation is improving as libraries grow.

---

# Long-term implication

If AI becomes good at generating formal proofs in Lean/Coq, mathematics could shift from:

```
trust mathematicians
```

to

```
trust machine verification
```

At that point the social gatekeeping of journals becomes less important than **formal correctness certificates**.
