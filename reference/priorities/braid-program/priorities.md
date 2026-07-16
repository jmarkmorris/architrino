# Braid Program — Live State

Status: DRAFT, pending operator ratification (2026-07-15). One page, rewritten forward-only. This is the program's single entry point.

## Guiding Question

Which architrino configurations persist as free assemblies under the master equation — and which observed particles do they map to?

## Strategy (proposed for ratification): the N-ladder, evolution-first

Walk up from the smallest object, certifying dynamical behavior at each rung before adding structure. This inverts the last effort, which explored elaborate shapes on prescribed motion before any object had a verified dynamical existence.

1. **Two architrinos, below field speed.** Evolve the opposite-polarity pair under the master equation; collapse-test; characterize its fate (bound, unbound, conditional). The program's first certified dynamical object — everything else builds on knowing what a binary actually does.
2. **Two architrinos at and above field speed.** Self-hits active. The same fate question where the delayed self-interaction channel opens.
3. **Four architrinos: a neutral pair of pairs.** First composite: do certified binaries interact toward binding or dispersal?
4. **Six architrinos: braid candidates.** Screening over the configuration chart nominates candidates; evolution decides them.
5. **Assembly mapping.** Photon-carrier and charged-lepton campaigns open only after a persistent object exists to map.

## Queue

1. Operator ratifies charter ([README.md](README.md)), this strategy, [method.md](method.md), and the drafted instrument gate ([campaigns/instrument-gate.md](campaigns/instrument-gate.md), authored 2026-07-16: accepted/barred capabilities with evidence pointers, per-campaign booking checklist, and the adopted `assembly-view-record.v0` schema — shared display adapter and Borg `?eomRecord=` replay already consume it, converter available for existing harness replay files).
2. Author [configuration-chart.md](configuration-chart.md) past skeleton grade (the search-space coordinate system, including motion classes beyond rigid rotation).
3. Campaign 1 spec and run: sub-field opposite-polarity binary evolution (N-ladder rung 1). **Blocked at the path-provenance gate** (derived — [2026-07-16 audit](evidence/2026-07-16-eom-path-provenance-audit.md)): the interim assembly-view converter reconstructs authoritative `evolved-record` segments from sampled endpoints rather than preserving EOM-published segments. Part 2 stays closed until exact native segment emission replaces that booking path, or the converter is barred with operator sign-off and another compliant emission path exists.
4. Campaign: collinear breather (operator-directed, 2026-07-16). Within the rung-1/rung-2 simple-geometry sweep (1:1, then 2:2 collections), explore the collinear motion class: an opposite-polarity pair confined to a line, evolving through head-on approach, crossing or turnaround, and retreat. Question: does any collinear initial condition (positions, speeds, prehistory) close into a persistent bound oscillation — a breather — under the master equation? Sub-field first; then at/above field speed with the self-hit channel active (rung 2), where the delayed self-interaction may supply the recapture forcing a bound cycle needs. Book fate classifications (bound / unbound / conditional) per the instrument gate; any persistence claim takes the full collapse protocol. Declared prehistories are first-class search coordinates here, not defaults. Its sub-field stage also waits on queue item 3's path-provenance gate.
5. Campaign: undirected ensemble release (operator-directed, 2026-07-16). The undirected complement to the ladder: seed randomized populations through the checkpoint-chunked ensemble harness ([eom-attractor-search](../eom-attractor-search/priorities.md) owns the harness and cost model; this program owns the campaign), evolve, and classify what assembles — census rows, a declared persistence criterion, 2:2 neighborhoods first in coordination with rung 3. Gated on the Campaign 1 Part-1 path-provenance audit ([campaigns/campaign-1-dispatch-prompt.md](campaigns/campaign-1-dispatch-prompt.md)) and the instrument gate's booking rules; emits `assembly-view-record.v0` per booked run. Prerequisite infrastructure (dispatched separately, ungated): the $N=12$ host-control transfer factor and the harness-replay confirmation through the record converter and Borg `?eomRecord=` route.
6. Operator disposition review of the first mining pass — 47 curated leads staged in `mining/` (2026-07-15, four themed files plus overview, each with a recommended disposition confined to this directory). (Corpus reconciliation of the braid chapters and generated-artifact regeneration: **executed 2026-07-15**, see [corpus-reconciliation.md](corpus-reconciliation.md).)

## Waiting On

- Engine: root-completeness certificate extension (EOM engine item) — gates any campaign whose windows cross field-speed folds. The collinear class meets folds head-on, so queue item 4's at/above-field-speed stage waits on this; its sub-field stage does not.
- Instrument: native `assembly-view-record.v0` emission preserving exact EOM-published segments, or an operator-signed bar on the sampled-reconstruction converter plus another compliant per-run record path — gates all booked evolution campaigns.

## Pointers

Charter and ground rules: [README.md](README.md). Method: [method.md](method.md). Search space: [configuration-chart.md](configuration-chart.md). Logs: [work-log.md](work-log.md), [brainstorming.md](brainstorming.md).
