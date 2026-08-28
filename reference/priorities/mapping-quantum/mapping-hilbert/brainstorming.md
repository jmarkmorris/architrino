# Hilbert Space: Learning Notes and Braid Questions

## Starting Point

The operator's stated need on 2026-08-28 is to understand Hilbert space well enough to help decipher the overall mapping to the braid. This file begins that exploration; it is not a completed tutorial or a recovered physical theory. [README.md](README.md) supplies the learning sequence, while [QC-013](../work-queue.md#qc-013--hilbert-space-and-effective-state-vector-contract) owns the accepted introductory task.

## The Three Spaces to Keep Separate

**Mathematical definitions and current corpus framing:** physical space describes where things are; a dynamical state space describes the information needed to predict their evolution; an effective quantum state space describes the quantum states used for observer-level predictions. A Hilbert space is a vector space with an inner product and completeness in the distance supplied by that inner product. These roles are different even when some of the mathematical spaces share properties. Ordinary Euclidean vector space is itself a real Hilbert space; the distinction is not that every Hilbert space is quantum or nonphysical.

Plainly: the room, the information describing what is happening in the room, and a prediction based on that information answer different questions. A long list of coordinates does not create extra directions in the room.

**Proof burden for a braid mapping:** identify what one effective state represents and give the map from the relevant assembly, wake, history, and apparatus data. Do not replace the history by an instantaneous picture without proving that the discarded information cannot change the declared predictions. The [Wavefunction Ontology](../../../../content/markdown/aaa/quantum/wavefunction-ontology.md#representation-and-decomposition-discipline) owns the present representation boundary.

**Falsifier:** two histories assigned the same proposed effective state give different predictions for a measurement the state was supposed to cover, beyond the declared approximation error. **Next artifact:** a drawn example separating a physical change from a coordinate change, followed by an explicitly labeled list of the braid information a proposed description retains. **Possible promotion target:** the existing Effective State-Vector Contract after the mapping has a derivation.

## Candidate Correspondences to Explore

**Claim grade: guessed correspondence questions, not established identifications.** The table asks what a physical realization would need; it does not assign quantum objects to existing braid parts.

| Hilbert-space idea | Physical question for braid mapping | What would be insufficient |
| --- | --- | --- |
| One state vector | Which complete effective description is being represented? | Calling the spatial position of one constituent the whole quantum state. |
| A basis | Which independent effective patterns or measurement channels span the declared description? | Assigning one basis vector to each binary solely from the number of binaries. |
| Complex phase | Which retained timing or path-history relation controls a reproducible interference response? | Writing a circular motion with complex numbers and declaring quantum phase recovered. |
| Inner product | Which derived comparison between effective states yields the required overlaps? | Choosing a convenient dot product without connecting it to the physical response. |
| Linear combinations | Under what preparation and observation conditions does adding effective amplitudes describe a realizable response? | Assuming that adding two physical braid configurations produces another admissible configuration. |
| Tensor product | Which physically justified subsystem split supports the quantum combination rule? | Partitioning constituent identities and treating the partition as a proof of factorization. |
| Squared amplitude | Why does the physically derived distribution of records agree with the squared effective amplitude? | Defining amplitudes after the fact as square roots of measured frequencies. |

Plainly: each mathematical feature creates a specific question about the braid. Similar shapes, matching counts, and useful notation can suggest where to look, but they do not answer those questions.

**Assumptions and proof burden:** any proposed correspondence must specify its preparation, retained histories, apparatus, observable predictions, and approximation regime, then derive the relevant operation from those objects. **Falsifier:** the same construction fails an independently specified change-of-basis, interference, or detector-frequency comparison within that regime. **Next artifact:** work the ordinary-vector example first, then select one row for a concrete mapping question rather than assigning every mathematical feature at once. **Possible promotion target:** [Wavefunction Ontology](../../../../content/markdown/aaa/quantum/wavefunction-ontology.md); candidate-specific claims remain with the [Braid Program](../../braid-program/priorities.md).

## Connections Already Available

- [Spinors, rotations, and history](../spinors-rotations-and-history/brainstorming.md) develops rotation mathematics and explains why representation signs and physical response must be distinguished. Use it after the elementary state-and-coordinate distinction, not as assumed prerequisite knowledge.
- [Transfer operator and basin measure](../transfer-operator-basin-measure.md) asks how deterministic histories generate distributions over outcomes. It does not by itself establish a complex quantum state representation.
- [Quantum Summary](../../../../content/markdown/aaa/quantum/quantum-summary.md#current-status) records the open physical recovery obligations, including the Born square. Learning progress here does not alter those dispositions.

## Mathematical References

[MIT's vector-space and quantum-state introduction](https://ocw.mit.edu/courses/6-453-quantum-optical-communication-fall-2016/d9beb82c9d4f3ac411496eb0633e8aee_MIT6_453F16_Lect2_Notes.pdf) supplies definitions and finite-vector/function-space examples. [Durham's Hilbert-space lesson](https://www.maths.dur.ac.uk/users/kasper.peeters/mathphys/hilbert_space.html) develops wavefunctions as vectors, inner products, and bases. These were inspected during the 2026-08-28 explanation and support the comparison mathematics, not a braid correspondence. Begin with the worked local lesson rather than requiring the operator to master either source first.
