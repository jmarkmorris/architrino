# VP-1 Receiver-Normal Radial Validator Review

Status. Receiver-normal validator review target. The previous radial sidecar
validator contract is invalid as force/action evidence unless it is rebuilt
around same-record receiver-normal branch strength.

Claim level. Restart target, not test closure.

## Required Validator Behavior

The validator must reject any nonblocked radial row that lacks:

| Required check | Failure mode |
| --- | --- |
| same retained labels | row cannot swap branch identity |
| same root boxes | row cannot import a different root chart |
| $D_s$ interval | row cannot omit source-normal transversality |
| $D_T$ interval | row cannot omit receiver-normal motion |
| $W^{\mathrm{rec}}$ interval | row fails if branch strength is replaced by source-normal data |
| receiver-normal radial sum | row cannot compare kinematics to a stale branch sum |
| negative control | row cannot pass when $D_T$ is removed or mismatched |

## Promotion Rule

Future tests should prove that source-normal branch-sum fixtures are rejected and
that only receiver-normal rows can become `passed` or `certified_fail`.
