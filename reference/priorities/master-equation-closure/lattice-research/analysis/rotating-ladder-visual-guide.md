# Seeing the rotating alternating ladder

[Open the motion animation](rotating-ladder-motions.html). Its [editable fragment](rotating-ladder-motions.fragment.html) is retained beside it; the standalone page includes the viewing styles and controls. This is the animation requested by the operator on October 29, 2026.

## The object

Imagine an infinitely long stack of clock faces sharing one axis. Each face holds a positive architrino and a negative architrino opposite one another. In the untwisted version, the polarities swap sides on the next face. In a twisted version, the next pair turns through a slightly different angle. The axis, circular guides and lines between pairs in the picture are drawing aids; they are not material objects. Only a short section is drawn, while the mathematical population extends indefinitely.

The three buttons compare three different prescribed steady motions. In **Spin in place**, all pairs circle the axis together. In **Spin + travel**, neighbouring pairs are slightly twisted relative to one another, and the whole pattern rotates while moving along its axis. In **Travel only**, the pattern keeps its orientation and moves along the axis. The outlined pair lets the reader track the same two members while scrubbing time. Playback speeds differ between examples so each motion remains visible.

These are separate solutions being compared, not a recording of one ladder changing through three stages. Their displayed numerical parameters are rounded representatives of certified balance boxes. The picture draws the selected motion directly; it computes no acceleration, causal roots or freely evolved motion.

## What has been established

The [reviewed October 20 investigation](rotating-ladder-claude-2026-10-20-pi-account.md) established exact infinite-ladder balances and continuous families of balances under the unchanged Master Equation with $c_f=K=1$. It also constructed particular complete-history disturbances that grow away from one rotating balance. Thus an exactly balanced motion can exist while a disturbance of it grows. This is not a claim about the eventual fate of every disturbance or a finite retained assembly.

The animation uses the following rounded display inputs. Rotation speed is $\varepsilon=\omega R$; axial speed is $u$; spacing ratio is $\delta=d/R$. The first two examples use the certified $R=1000$ balances, and the translating balance exists at every radius. Drawing distances are rescaled by $R$.

| Motion | Twist | Spacing ratio | Rotation speed | Axial speed |
| --- | --- | ---: | ---: | ---: |
| Spin in place | $\pi$ | $3.3450352927$ | $0.01384081428$ | $0$ |
| Spin + travel | $0.9\pi$ | $3.147703014$ | $0.01364617543$ | $-0.005089044718$ |
| Travel only | $\pi$ | $2.5083135333$ | $0$ | $-0.8433854761$ |

The grey connectors identify opposite members of a pair. They do not establish binding by a rod, a physical constraint, or stability. The selected polarity colours and shapes identify members consistently; a finite visual crop does not become a finite dynamical population.

## How the motions are connected

The connection proof concerns a catalogue of balanced motions, rather than time evolution of a single ladder. The [October 29 connection study](rotating-ladder-branch-connection-2026-10-29.md) supplies a certificate and a separate exact-arithmetic audit joining the already certified turning region to the already certified twisted branch. The two portions therefore describe one connected family, under the reviewed interval-kernel assumptions. Fresh peer review of that new proof is pending. The entire returning route to the non-rotating translating balance, and whether a freely evolving ladder would follow it, remain unproved.

## App fit

**Animator is the authoring and playback fit.** Its [scene handoff contract](../../../../../src/contracts/animator-prescribed-scene/v1/README.md) already distinguishes authored prescribed motion from evolved motion, can emit a sealed finite record, and hands that record to Borg for replay. The current animation is an explanatory page, not yet an Animator scene document.

**Borg is the 3D inspection and replay fit.** Its [Assembly Viewer requirements](../../../app-borg/contracts/assembly-viewer-requirements.md) provide record-only playback, scrubbing and co-rotating or screw-frame viewing. Adoption requires a source-bound display record for an explicit finite visual crop, with the infinite mathematical configuration and its evidence described separately. The existing [prescribed-geometry lattice contract](../../../../../src/prescribed-geometry/README.md) explicitly distinguishes a cropped periodic template from an executable finite population and an infinite template. Neither displaying the crop nor importing it proves EOM evolution of the infinite ladder.

**Surface addresses another problem.** Its [owner](../../../app-surface/README.md) concerns motion constrained to a closed sphere, ellipsoid or torus. The open-ended ladder is not that configuration. This comparison is inferred from these live app contracts; no app was modified or deployed as part of saving this explanation.

## Capture and checking

The original fragment's bytes and provenance are recorded in [the capture receipt](../evidence/rotating-ladder-branch-connection-2026-10-29/visual-capture.json). The standalone export was made with the bundled visualization renderer using the shared venv. The controls, one-cycle stop, reduced-motion response and tracked-pair geometry were checked in an isolated JavaScript DOM stub at widths 320 and 736. These checks establish control logic, not browser appearance or scientific correctness. The earlier local-file browser preview was refused by browser URL policy; no workaround was attempted. The research certificates, not the animation, establish the mathematical results.

To rebuild the standalone page from the retained fragment, use the visualization renderer's export workflow. Changes to scientific parameters must be tied to their source balance and must preserve the distinction between rounded display inputs, interval-certified balances and evolved histories.
