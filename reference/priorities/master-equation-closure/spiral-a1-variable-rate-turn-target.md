# Spiral A1 Receiver-Normal Variable-Rate Turn Target

Status. Receiver-normal restart target for variable-rate A1 turn-center analysis.
This file does not supply an angular-rate slope, force-ratio interval, or
tangential compatibility verdict.

Claim level. Priority-only restart target.

The variable-rate turn problem is now:

1. keep the retained A1 root topology visible;
2. compute $D_s$, $D_T$, and $W^{\mathrm{rec}}=\lvert D_T/D_s\rvert$ on the
   same retained branch boxes;
3. rebuild radial and tangential turn-center sums from those receiver-normal
   factors;
4. only then compare the rebuilt sums to the selected kinematic time law.

No superseded slope or force-ratio value is canonical Master EOM evidence.
