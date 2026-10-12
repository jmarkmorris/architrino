# Aliasing Control Receipt: an Accepted Canonical Step Whose Published Tube Excludes the True Motion — 2026-10-11

This receipt records the control described in [addendum 1 of the generated-history inclusion record](../analysis/matched-pair-stage-3-addendum-1.md), section 4. The control asks whether an ordinary canonical evolution step can be accepted with a small step-doubling discrepancy while the true motion lies outside the published position and velocity intervals. It is scratch and new-file work: no solver source, oracle or contract was changed, and Stage 3 of the [integration scope](../contracts/matched-pair-enclosure-integration-scope.md) is not released. Every instance uses $c_f=1$.

## Instruments

| Instrument | Role | Identity |
| --- | --- | --- |
| [matched-pair-stage-3-aliasing-control.cpp](matched-pair-stage-3-aliasing-control.cpp) | Driver that builds the prescribed histories and calls the live solver library. It contains no numerical method of its own. | SHA-256 `fbfadb9964e4846bb78661ac42ab906dc988126c186fdc187f79da1e3f6aa47c` |
| Live solver library `.tmp/eom-matched-pair/build-live/libeom_native.a` | The subject. Built from the live Stage 2 source, whose 82-file inventory `shasum -a 256 -c` verified unchanged from `src/eom` at 2026-10-11T22:45:15Z. | SHA-256 `72be0aea49c1bb6159646250445f8523dcb28291a0c34a69b8daa93a18cf7eb3` |
| [matched-pair-stage-3-aliasing-control-bound.py](matched-pair-stage-3-aliasing-control-bound.py) | Exact-rational bracket of the true end state. Imports no solver code; reads only the published end intervals. | SHA-256 `e822aea060538e98a6111febd672a2f1641ef71e578af493b11bec17ef61db53` |

The driver was compiled with `/usr/bin/c++ -std=c++20 -O2 -ffp-contract=off -arch arm64 -isysroot /Library/Developer/CommandLineTools/SDKs/MacOSX26.5.sdk -I src/eom/include -I /opt/homebrew/include`, linked against the library above and `-lmpfr -lgmp -lboost_json`, under `DEVELOPER_DIR=/Library/Developer/CommandLineTools`; the binary has SHA-256 `2c339fd95b8326469a2f4a194f3447b756000d66e02aa5eb4233efeaf7931cbd`. The bracket ran under `/Users/markmorris/vibe/.venv/bin/python`, version 3.13.2.

## Inputs

Two paths on the $z$ axis, both of charge $1$. The receiver's history is the zero cubic on $[-20,0]$. The source's history on $[-20,0]$ is forty half-unit exact cubic segments with zero error tokens: on $[k,k+\tfrac12]$ the coefficients about the segment start are $(10,\,0,\,12A,\,-16A)$ and on $[k+\tfrac12,k+1]$ they are $(10+A,\,0,\,-12A,\,16A)$. Request fields: start time $0$; end, initial, minimum and maximum step all equal to the stated step; field speed $1$; coupling $0.001$; transmitter-factor floor $10^{-24}$; position and velocity tolerances $10^{-8}$; correction tolerance $10^{-10}$; root depth $192$, root cells $300000$; precision $128$ to $512$ bits; one thread; grouped policy disabled by default. Root and acceleration tolerances are $10^{-10}$ and $10^{-9}$ unless stated.

The diagnostic mode prescribes both histories through $t=2$, with the receiver held at the origin, and calls `certify_native_acceleration_snapshot` at fifteen reception times. The evolve mode calls `evolve_native_coupled_histories`.

## Runs

All eight runs were executed in the order below by `run-all.sh` under `node scripts/dev/owned-compute-supervisor.mjs run --owner-task <this session> --deadline-seconds 120`, which finished at 2026-10-11T22:44:58Z with exit status 0 and its process group closed. The outputs are concatenated in that order in [matched-pair-stage-3-aliasing-control-runs.jsonl](matched-pair-stage-3-aliasing-control-runs.jsonl), SHA-256 `cb29d072cd29ffd9301ce4dea317dff830bc57f31533316b8df11fb67ae0c25a`; the separate files and their identity list are retained locally under `.local-data/eom-matched-pair/2026-10-11/aliasing-control/final/`. A replay by the preceding driver build, which differs only in the diagnostic time list, reproduces the evolve outputs byte for byte; that is determinism of one program, not independent evidence.

| # | Amplitude | Mode and step | Root, acceleration tolerance | Result |
| --- | --- | --- | --- | --- |
| 1 | $0$ | diagnostic | default | Known case. All fifteen times certified; every interval contains $-10^{-5}=-\kappa/R^2$. |
| 2 | $0$ | evolve, $2$ | default | Known case. Completed, one accepted step. |
| 3 | $0$ | evolve, $2$ | $10^{-7}$, $10^{-7}$ | Known case. Completed, one accepted step; receiver end velocity $[-1.999998000\times10^{-5},\,-1.999996000\times10^{-5}]$, which contains the second-order analytic value $-1.99999733\times10^{-5}$. |
| 4 | $0.2$ | diagnostic | default | All fifteen times certified. $-1.0000\times10^{-5}$ at $t=0,1,2$; between nodes the samples run from $-6.1245\times10^{-6}$ at $t=0.375$ to $-2.4507\times10^{-5}$ at $t=0.85$. The intervals at $t=0.35$ and $t=0.85$ contain the closed-form values $-6.126850309\times10^{-6}$ and $-2.450740124\times10^{-5}$. |
| 5 | $0.2$ | evolve, $2$ | default | **Retained failure.** Halted, `root_completeness_not_certified`, no accepted step. The three substeps were accepted candidates and the receiver discrepancy was $2.30\times10^{-10}$, inside tolerance; the end-of-step recertification returned `numeric_precision_limit_exhausted` for the receiver's root on the source. |
| 6 | $0.2$ | evolve, $2$ | $10^{-7}$, $10^{-7}$ | **Target.** Completed, one accepted step. Receiver discrepancy $2.3004\times10^{-10}$ in position and $2.3003\times10^{-10}$ in velocity. Published end velocity $[-2.000092009\times10^{-5},\,-2.000046003\times10^{-5}]$, end position $[-2.000061340\times10^{-5},\,-2.000015332\times10^{-5}]$. |
| 7 | $0.2$ | evolve, $1$ | $10^{-7}$, $10^{-7}$ | Contrast. Halted, `minimum_step_exhausted`; the step was rejected with `numeric_step_budget_exceeded`, receiver velocity discrepancy $1.794\times10^{-6}$. |
| 8 | $0.2$ | evolve, $4$ | $10^{-7}$, $10^{-7}$ | Completed, one accepted step. Receiver velocity discrepancy $1.84\times10^{-9}$; published end velocity $[-4.000736302\times10^{-5},\,-4.000368083\times10^{-5}]$. |

The first attempt at run 5 and the first passes of the other runs are also retained beside the final set. An earlier driver without the tolerance arguments and without the two quarter-period times produced the first outputs; the final set comes from the driver identified above.

## Bracket

Run with `"${AAA_VENV:-../.venv}/bin/python" reference/priorities/app-solver/evidence/matched-pair-stage-3-aliasing-control-bound.py <outputs of runs 3, 6, 8, 7>`; output retained as [matched-pair-stage-3-aliasing-control-bound-output.txt](matched-pair-stage-3-aliasing-control-bound-output.txt), SHA-256 `fa4f0ae1db06ac6a5345e169080b2c0c59eca549dcb6bda6a6c887498ff6bfc0`. The instrument first checks its Riemann bracket against the closed form $\int_0^{1/2}du/(R+2Au)^2$, the static value $I=1/R^2$ and the static weighted integral $2/R^2$, and exits with status 2 before any target if one fails. It then evaluates the static run before the targets.

| Run | Quantity | Published interval | True bracket | Verdict |
| --- | --- | --- | --- | --- |
| 3 | velocity | $[-1.999998000\times10^{-5},\,-1.999996000\times10^{-5}]$ | $[-2.000002667\times10^{-5},\,-1.999997333\times10^{-5}]$ | intersects |
| 6 | velocity | $[-2.000092009\times10^{-5},\,-2.000046003\times10^{-5}]$ | $[-1.963423564\times10^{-5},\,-1.958320815\times10^{-5}]$ | excluded; separation at least $3.662\times10^{-7}$, $1592$ published half-widths |
| 6 | position | $[-2.000061340\times10^{-5},\,-2.000015332\times10^{-5}]$ | $[-1.768122117\times10^{-5},\,-1.765219809\times10^{-5}]$ | excluded; separation at least $2.319\times10^{-6}$, $10081$ published half-widths |
| 8 | velocity | $[-4.000736302\times10^{-5},\,-4.000368083\times10^{-5}]$ | $[-3.942097129\times10^{-5},\,-3.901391631\times10^{-5}]$ | excluded; separation at least $5.827\times10^{-7}$, $317$ published half-widths |

For the target the bracket uses $I\in[9.804312410\times10^{-3},\,9.804409488\times10^{-3}]$, Lipschitz constant $L=0.7625$, and receiver-motion corrections of $2.542\times10^{-8}$ in velocity and $1.271\times10^{-8}$ in position at step $2$. The position bracket is evaluated only for step $2$.

## What this establishes and what it does not

**Claim grade: measured** for the solver's outputs, by the driver and library identified above over the eight runs listed; **derived** for the true-state bracket, by the two bounds stated in the addendum and evaluated exactly. Together they establish that, for this one constructed instance, an accepted ordinary canonical step published receiver position and velocity intervals that do not contain the true state at the step end.

The instance is adversarial: the step is pinned, the source period divides it, and the oscillating source past is prescribed data that the canonical law did not generate. The result does not show that dynamically generated histories alias, does not measure how often ordinary runs do, and is not a statement about the Master Equation, since the solver and the bracket evaluate the same law and differ only in how they integrate it in time. Canonical steps are published as `executable_architecture_evidence`, so this is not a contradiction of the solver's own claim; it refutes only the proposal to treat the published radii as an enclosure. The cause given for the retained failure of run 5, that the receiver's published half-width exceeds the root tolerance, is **inferred** from the failure code and from run 6. The driver and the bracket have one author; independent review is the reviewer's.

Falsifiers: an error in the change of variable or the Lipschitz bound; an exact evaluation of the bracket that meets a published interval; a reading of the request under which the receiver's motion over the step depends on anything but the prescribed past; or a rerun from the identified inputs that publishes different intervals.
