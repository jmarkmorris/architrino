# Causal Delay Feedback App

## Workstream Metadata

- Kind: `priority-app`
- Rank: `12`
- Value: `4.40`
- Cost: `2.7`
- ROI: `1.63`
- Status: `active`

## Current

This folder owns the active priority packet for `causal-delay-feedback.html`, the single-page app that teaches causal-delay feedback depth in $\mathbb{A}\mathbb{A}\mathbb{A}$.

The live tracker is intentionally compact. Learner-facing intake, audit state, and verification status live in [learner-work-queue.md](learner-work-queue.md). Detailed app requirements, accepted design decisions, solver-contract notes, browser proof artifacts, and implementation evidence now live in [v1-product-requirements.md](v1-product-requirements.md). Provisional teaching ideas and draft explanations live in [brainstorming.md](brainstorming.md). Dated status and partition history live in [work-log.md](work-log.md).

## Objective

Keep the app as a simple canvas-first teaching and review tool for one core idea: present feedback is not determined only by the current architrino positions; it depends on causal-delay hits from retained source history.

The app should remain usable as both:

- a low-friction public teaching surface for causal delay; and
- a solver-facing review surface for central pair-interaction replay, retained path constraints, delayed-hit diagnostics, and future physical boundary-value solver work.

## Current Queue

1. `story_mode_teaching_flow` - Promote the current pedagogy brainstorm into a focused Story-mode requirements card. The teaching flow should start with one emitted wake, one reception, and one line back to the old emission point before exposing the full sandbox.
2. `physical_causal_delay_solver_path` - Continue replacing helper-style retained path relaxation with the intended stronger physical pair-interaction/path-constraint boundary-value solver. Current constrained replays may show evidence-gated discrete pair-interaction boundary convergence, but the full coupled causal-delay Jacobian and stronger physical-law closure remain open.
3. `high_resolution_replay_qa` - Keep validating the denser default replay and path-constraint sampling against browser performance, wake readability, and direct-manipulation smoothness. Use the focused browser QA script and keep generated proof artifacts in the focused requirements/evidence packet.
4. `public_teaching_launch_readiness` - Keep the standalone route and apps-page exposure live, but treat the public teaching launch as ready only after the first Story-mode flow is specified and the default sandbox remains simple enough for younger users.

## Current Blocker

The main conceptual blocker is no longer basic UI clarity. The app now needs a guided teaching path that makes causal delay apparent without relying on operator explanation.

The main solver blocker is still the stronger physical causal-delay path solver: the current pair-interaction boundary replay has useful evidence gates, but it is not the final full physical boundary-value solver for the theory.

## Next Action

Write a focused Story-mode requirements card in this directory. It should turn the notes in [brainstorming.md](brainstorming.md) into the first five guided scenes, acceptance checks, and runtime boundaries, while keeping the sandbox controls unchanged unless the Story flow requires a small, scoped hook.

## Promotion Map

- Promote Story-mode pedagogy from [brainstorming.md](brainstorming.md) into a focused requirements card before implementation.
- Promote only stable, reader-facing causal-delay explanations into `content/markdown/aaa`; do not link reader-facing corpus prose back into this priority folder.
- Keep implementation evidence, browser captures, solver-contract details, and accepted UI decisions in [v1-product-requirements.md](v1-product-requirements.md) or another focused sibling file.
- Keep dated status, failed proof paths, checker narratives, and operator/developer handoffs in [work-log.md](work-log.md).

## Implementation Boundaries

- Do not hand-author meaningful architrino paths in the app runtime; use solver output or explicitly marked representative mock replay data.
- Do not present the current constrained replay as full Noether sea closure or final physical boundary-value solver closure.
- Do not grow the app into a dense control dashboard before the teaching sequence is clear.
- Keep end-user language plain: causal delay means influence arrives after travel time.
- Keep retained interior path-history samples internal to replay and diagnostics; the canvas should expose visible paths, live wakes, moving architrino markers, and start/end endpoint handles.
