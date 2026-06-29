# VP-1 Receiver-Normal Interval Integration Plan

Status. Current-law restart target. The interval integration plan no longer
accepts sampled drive signs, source-normal branch intervals, or old sidecar
status transitions as theorem-grade evidence.

Claim level. Priority-only restart target.

## Integration Rule

Topology rows may still be loaded:

- active roots;
- inactive gaps;
- finite-memory depth;
- source-normal transversality floors.

Drive rows require:

- $D_s$ interval;
- $D_t$ interval;
- $W^{\mathrm{rec}}=\lvert D_t/D_s\rvert$ interval;
- receiver-normal radial or tangential contribution interval;
- a negative control showing the row fails closed when $D_t$ is missing.

## Promotion Rule

The sidecar may mark a drive row `passed` or `certified_fail` only after those
receiver-normal rows are present on the same retained record.
