# CRW-005 — Nature Is Analog review

## Scope and disposition

Full individual review and bounded caption repair of [Nature Is Analog](../../../../content/markdown/aaa/archie/comics/nature-is-analog.md). The original image was visually inspected in the hub review; the coordinator independently confirmed its mixed-basis table and notebook discrepancy and explicitly authorized caption clarification. The intended continuous-dynamics/discrete-record message and original artwork are preserved.

Baseline leaf SHA-256: `6dc4034a2a1438def3d94928519d370bebcc695efeca6483f302f5c1b951b764`.

Reviewed leaf SHA-256: `14f1dc55fd1d04198cc41250d19bf61a46e506cdbd8a4cd20d4ce2e68434c4f6`.

Unchanged artwork SHA-256: `78c60b878cd18f63772170e9df267e673d9e89b5e5c9fabd3b69759254dfa6f2`.

Scoped `git --no-optional-locks status` showed no leaf edits before work. Only the leaf and this receipt are owned; no image or shared record is edited.

## Finding and repair

**NA-01 — Medium severity, misleading quantitative notation.** The whiteboard combines |0>, |1>, |+>, |−> with numbers 0.62, 0.24, 0.11, 0.03 beneath a state symbol. The notebook appears to repeat the last number as 0.3. The leaf previously gave no indication that this was schematic notation rather than a worked quantum example.

Added two sentences stating that the ket labels and numbers are schematic, not a valid qubit probability calculation, and that actual probabilities require specified preparation and measurement basis. The caption explicitly says the comic illustrates the distinction without deriving quantum statistics. No numerical table, ket, or dialogue was altered in the approved artwork.

## Independent mathematical check

With the standard qubit convention, |0> and |1> form one orthonormal basis, while |+>=(|0>+|1>)/√2 and |−>=(|0>−|1>)/√2 form another. The overlap between |0> and |+> is 1/√2, so the four named states are not four orthogonal outcomes of one projective qubit measurement.

For a normalized density operator, the projectors for either complete basis sum to identity. Consequently each separate pair of outcome probabilities sums to one. The displayed Z pair sums to 0.86 and the X pair to 0.14; their total of one does not repair either basis normalization. A four-outcome generalized measurement or a joint record of measurement choice and outcome would require explicitly defined effects or preparation/context weights. The reviewer does not infer such an unstated instrument from the drawing.

A simple arithmetic check passed the known normalized pair (0.5, 0.5) before evaluating the displayed pairs. The normalization argument is independent linear algebra; the arithmetic check verifies only the sums. No substrate simulation, quantum recovery proof, or imported primitive quantum postulate is claimed.

## Focused checks and limits

A marked-based image/link extractor passed a known nested-image pair before checking the leaf. The image source and enclosing link are unchanged and both resolve to the same existing original. The leaf contains no TeX display or equation-viewer identity. Scoped `git diff --check` passes, and direct SHA-256 measurements bind the before/after source and unchanged image above.

The main image message remains readable. The correction supplies context for literal notation without treating the visual joke as a failed physical theorem. It does not certify every decorative mark, perform a browser/mobile test, or demonstrate the full quantum-statistical recovery target.

No image generation, artwork modification, generator write, neighboring edit, shared-record write, or Git mutation occurred. No remaining leaf repair obligation was established after the requested clarification. Coordinator adjudication and shared integration remain separate.
