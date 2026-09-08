# Emission current execution bridge controls

This review covers the new current execution transport in `scripts/eom/execute-f6c-emission-refinement.py`. The preserved producer, comparator, acceleration capture support, and their actual plan, metadata, capture, and publication contracts were read. The review edits only `tests/test_f6c_emission_current_execution.py` and this record. It supplies transport controls, not mathematical acceptance of the emission refinement.

## Measured controls

The shared-venv command `python -m unittest discover -s tests -p test_f6c_emission_current_execution.py -v`, executed through the owned supervisor, reports 10 tests passed. Run `b7878494-2fac-47e4-9880-8ce2f38da97b` completed at 2026-09-08T15:29:36.013Z with exit code 0 and `processGroupClosed: true`; native unittest reports 0.003 seconds, and the supervisor reports 0.11 seconds. Logs remain in `.local-data/owned-compute/logs/` under that run ID. These are synthetic transport cases; no numerical campaign was launched.

The positive closed-plan fixture is accepted by the preserved verifier's real validator. Negative variants exercise escaped or executable archive paths, conflicting routes, wrong historical identities, missing or extra operational bindings, duplicate bindings, stale supervisor generations, relative Node paths, substituted bridge identities, scientific source changes, altered limits, and promoted authority fields. The comparison controls use explicit synthetic dependency doubles to establish authentication-before-comparison ordering and exact forwarding of the three original streams with their declared record counts. They reject promoted claims, substituted streams, failed original-chain authentication, independent negative results, and mismatched restrictions. Those dependency doubles establish transport behavior only; they do not independently establish the numerical predicates they stand in for.

The reproducible falsifier for each bounded claim is a failing corresponding unittest, an altered test/bridge generation, or a terminal lease inconsistent with the recorded exit and closure. A later bridge change requires rerunning this suite.

## Lifecycle finding sent to the implementation owner

Code inspection of the initial `main` implementation found that `--check-plan` printed `metadataValidated: true` and returned from inside its nested capture contexts. That return bypassed the ordinary post-cleanup and stdout deadline checks, and capture/module cleanup could still fail after the apparent metadata success line. The implementation owner was asked to route metadata completion through the same deferred completion boundary as ordinary execution. This record describes the initial finding; the implementation owner must record its repair and relevant CLI validation before treating it as closed.

## Integrating repair and validation

The integrating implementation now defers metadata completion until input/module cleanup and retains the deadline through stdout. Both actual isolated metadata stages pass in owned run `887b58a0-e146-4b7d-92d9-0f8cc90f0828`, authenticating 204 distinct bindings with zero scientific calls. The expanded 11-control suite passes in owned run `aad104a3-7e3d-431a-b2a2-194df094f8f3`; it additionally exercises actual source capture, original prior authentication, both real output writers and failed-publication retraction around artificial numerical callbacks. Both runs exit 0 with process-group closure. These controls close the initial lifecycle finding within the stated transport boundary.
