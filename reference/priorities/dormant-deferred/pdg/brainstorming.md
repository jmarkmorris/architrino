# PDG Pipeline Synthesis

This synthesis reserves space for provisional changes to the deferred `pdgfeed → pdgsolve → pdgedit` pipeline. It does not reactivate that pipeline.

## Stable Boundary

The preserved architecture uses explicit versioned contracts: `pdgfeed` owns ingest and request emission, `pdgsolve` owns assembly-native solving and acceptance, and `pdgedit` owns the final authored surface. The detailed frozen responsibilities remain in the component documents listed by [priorities.md](priorities.md).

## Reactivation Boundary

Any new idea must first identify the live owner it serves and must preserve the contract-first stage separation. Substantive behavior changes require an explicit reactivation decision and revalidation of the frozen schemas, examples, manifests, and tests.

## Unresolved Ideas

- None currently recorded.
