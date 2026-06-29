#!/usr/bin/env python3
"""Receiver-normal restart stub for the A1 finite-memory transport lane.

The previous executable emitted A1 branch-sum, gamma, radial, tangential, and
finite-collar diagnostics from a source-normal branch-strength model. Those
outputs are not current Master EOM evidence. This stub fails closed by emitting
only the required rebuild contract.
"""

from __future__ import annotations

import json


RESTART_CONTRACT = {
    "status": "receiver_normal_restart_required",
    "claim_level": "restart target, not solver evidence",
    "retained_labels": ["P_1", "P_2", "P_3", "S_1"],
    "required_rows": [
        "retained_root_box",
        "D_s_interval",
        "D_t_interval",
        "W_rec_interval",
        "receiver_normal_radial_interval",
        "receiver_normal_tangential_interval",
        "negative_control_missing_D_t",
    ],
    "promotion_rule": (
        "No A1 finite-memory transport result may pass, fail, or guide closure "
        "until it is redriven from same-record D_s, D_t, and W_rec=abs(D_t/D_s)."
    ),
}


def main() -> int:
    print(json.dumps(RESTART_CONTRACT, indent=2, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
