# Composer, Reaction App, and PDG Solver

## Scope

This workstream covers the scene system, composer, reaction app, PDG solver, and later composer enhancements. The detailed architecture references are [composer.md](../../composer.md) and [reaction.md](../../reaction.md).

## Current State

- The composer shell is real enough that the remaining work is gap-closing rather than first invention.
- The reaction app is the primary manual provenance surface.
- A read-only canonical-structure bridge exists, but it does not yet drive live structure mutations.

## Ordered Objectives

1. Finish the reaction app as a genuinely usable manual provenance tool.
2. Bridge solved reactions back into the main composer as staged animated results.
3. Replace observer/editorial placeholders with a real authored timeline model.
4. Move composer-side structural editing and visualization onto the shared canonical structure model.
