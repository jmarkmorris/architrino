# Preregistration of the Weber-overnight target runs

Status: written by the PI at 2026-10-05T12:46Z, after the [subject derivation](weber-overnight-investigation.md), the [independent reference](weber-overnight-independent-adjudication.md) and the [instrument controls](../evidence/weber-overnight-pair-instrument-controls.json) were fixed and before any target run. Nothing below may be changed after a target run starts; a needed change creates a new, separately named case.

## Frozen law and units

The law is Section 9 of the [variation manuscript](../../equation-variants/manuscript.md#9-weber-inspired-relative-motion-response) with $\lambda_{\mathrm W}=-1/2$, $\mu_{\mathrm W}=1$, $c_f=1$, equal coupling $K=1$, instantaneous support, no self term, unit integration weights. The dimensionless separation is $x=rc_f^2/K$. Every preparation below starts with the centre of velocity at rest in the void frame unless the case says otherwise. Opposite polarity is $\sigma=-1$; like polarity is $\sigma=+1$. The zero-coefficient control is the same preparation with $\lambda_{\mathrm W}=\mu_{\mathrm W}=0$. No causal delay, clamp, projection, softening, root rule or coefficient change is permitted in any case.

## Instrument and settings

Subject instrument: [weber-overnight-pair-instrument.mjs](../evidence/weber-overnight-pair-instrument.mjs), Gragg–Bulirsch–Stoer method, `rtol` $10^{-12}$, `atol` $10^{-14}$, `hmax` no larger than one fiftieth of the shortest expected period, exact condition number on. Events: contact at $r<10^{-6}$, escape at $r>10^{3}$, acceleration-matrix obstruction at $|\det|<10^{-8}$ or condition number above $10^{10}$, every individual speed crossing of $c_f$ recorded with time, member and direction, turning points of $r$ recorded with a turning floor of $10^{-9}$. Each case stops at its first event or at `tEnd`. A refinement rerun at `rtol` $10^{-10}$ measures the integration error as the difference between the two runs. Trajectories go to `.local-data/master-equation-closure/weber-overnight/binary/` (collinear cases to `collinear/`); the compact summary goes to `../evidence/weber-overnight-target-runs.json`.

Reference: the fixed [independent reference](weber-overnight-independent-adjudication.md). Its printed values are the comparison targets for the predicted cases. The withheld cases have no printed reference value; the reference worker computes them blind, from the case specification alone, without seeing instrument output.

## Tolerances

A predicted quantity agrees with the reference when the relative difference is below $10^{-8}$ for radial periods and apsidal angles, $10^{-9}$ for turning points and maximum individual speed, and $10^{-7}$ for event times of the like-polarity cases (whose approach to the singular radius loses accuracy). The first integral $\varepsilon$ and angular momentum $h$ must drift by less than $10^{-9}$ relative to their initial values over any regular run. Disagreement beyond tolerance that survives the refinement rerun is a finding against one side, not a tolerance to be widened.

## Cases

| ID | Polarity | Preparation ($K=c_f=1$) | Length | Predicted outcome, by whom | What the run decides |
| --- | --- | --- | --- | --- | --- |
| WB-1 | $-1$ | Circle at $x=4$, individual speed $0.3535533906$ | 10 orbital periods ($355.43$) | Both: exact circular solution | Numerical survival of the exact circle; drift of $r$, $\varepsilon$, $h$ |
| WB-2 | $-1$ | Circle at $x=1$, individual speed $0.7071067812$ | 10 periods ($44.43$) | Both: circle, strict domain | Same, nearer the speed boundary |
| WB-3 | $-1$ | Circle at $x=1/2$, individual speed exactly $c_f$ | 5 periods | Both: circle on the equality boundary; inclusive label only | Whether the unrestricted law evolves it without incident; coverage entry for equality |
| WB-4 | $-1$ | Apocentre release at $x=4$, tangential relative speed $0.8$ of circular, $\dot r=0$ | 5 radial periods ($145.03$) | Both: pericentre $32/17$, radial period $29.00582560$, apsidal angle $4.186307003$, max speed $0.6010407640$ | Sharpest predicted test; precession opposite to control's zero |
| WB-5 | $-1$ | Withheld mildly eccentric: apocentre release at $x=3$, tangential relative speed $0.9$ of circular | 5 radial periods | None printed; reference computed blind | Withheld eccentric test |
| WB-6 | $-1$ | Withheld radial: release from rest at $x=2.5$ | To contact | None printed; reference computed blind. Theory predicts contact at relative speed $\sqrt2$ | Withheld radial test |
| WB-7 | $-1$ | WB-1 circle plus a general perturbation: member 1 velocity kicked by $(0.005,0,0.01)$, whole pair given centre velocity $(0.05,0,0)$ | 20 periods | Subject: bounded relative motion, tilt and precession, centre uniform | General pair perturbation outside the planar symmetry; absolute-frame speed coverage with drift |
| WB-8 | $+1$ | Radial approach from $x=8$, $\dot r=-1.6$ | To event | Reference: reaches $x=2$ at $t=3.491175960$ with diverging speed; individual speed passes $c_f$ at $x=2.531645570$, $t=3.283813842$ | Loss of invertibility and speed-equality crossing |
| WB-9 | $+1$ | Radial approach from $x=8$, $\dot r=-1.2$ | $t=30$ | Reference: turns at $x=2.531645570$, $t=5.352958001$, escapes with asymptotic relative speed $1.256980509$ | Turning outside the critical radius |
| WB-10 | $+1$ | Planar approach from $x=6$, $\dot r=-1.2$, tangential relative speed $0.3$ | To event or $t=30$ | Subject theorem: no regular bound like-polarity history | Classification with angular momentum |
| WB-11 | $-1$ | Zero-coefficient control of WB-4 | 5 radial periods ($112.05$) | Both: same turning points, period $22.41023935$, apsidal angle $\pi$ | Ablation isolating the velocity terms |
| WB-12 | $-1$ | Zero-coefficient control of WB-5 | 5 radial periods | Turning points equal to WB-5's | Ablation of the withheld case |
| WC-1 | $-1$ | Collinear release from rest at $x=4$ | To contact | Both: contact at $t=8.560326833$, relative speed $\sqrt2$, finite acceleration | Collinear contact classification |
| WC-2 | $+1$ | Collinear release from rest at $x=4$ | $t=10$ | Both: escapes; reaches $x=8$ at $t=7.191411155$ | Collinear like-polarity dispersal |
| WC-3 | $-1$ | Zero-coefficient control of WC-1 | To contact | Both: contact at $t=2\pi$ with unbounded speed | Ablation of the finite contact speed |

## Speed coverage and stops

Every case reports the supremum of individual speed in the void frame and the label it supports: strict if the supremum is below $c_f$ on the whole run, inclusive if it equals $c_f$ only at isolated times or on the WB-3 boundary circle, unrestricted otherwise. A label is a domain statement; the acceleration is identical under all three. WB-8's crossing is recorded as an unrestricted event and establishes no continuation within a ceiling domain.

## Decision rules

- **Binary GO/NO GO.** The binary target is GO if the derived bound class $\{h>0,\varepsilon<0\}$ survives adjudication and WB-1, WB-2, WB-4, WB-5 and WB-7 remain regular and bounded with invariant drift inside tolerance. It is NO GO if adjudication overturns the class theorem or any of those runs reaches contact, escape or an obstruction.
- **Ring GO/NO GO.** The four-member alternating ring is GO only if its full $12\times12$ acceleration matrix is invertible at a configuration where exact balance holds; otherwise it is a documented NO GO for that geometry under this law.
- **Withheld cases.** WB-5, WB-6 and WB-12 are compared only after both the instrument output and the blind reference value are written to disk; neither side is rerun after seeing the other.
