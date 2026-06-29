#!/usr/bin/env python3
"""Receiver-normal restart stub for circular interval certificates."""

from __future__ import annotations

import json


CONTRACT = {
    "status": "receiver_normal_restart_required",
    "claim_level": "restart target, not circular no-go evidence",
    "surviving_rows": [
        "circular_root_brackets",
        "jacobian_null_windows",
        "inactive_gap_diagnostics",
        "finite_memory_diagnostics",
    ],
    "required_rows": [
        "D_s_interval",
        "D_t_interval",
        "W_rec_interval",
        "receiver_normal_tangential_residual",
        "receiver_normal_radial_residual",
        "negative_control_missing_D_t",
    ],
    "promotion_rule": (
        "No circular no-go, existence result, or finite-band force/action verdict "
        "may be promoted until every retained branch is redriven from same-record "
        "D_s, D_t, and W_rec=abs(D_t/D_s)."
    ),
}


def main() -> int:
    print(json.dumps(CONTRACT, indent=2, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
