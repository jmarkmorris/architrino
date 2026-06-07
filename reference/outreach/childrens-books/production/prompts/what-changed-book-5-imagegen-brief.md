# Book 5 Image-Generation Brief: What Changed?

Use this brief after Book 4 review, before adding Book 5 back into `generation-manifest.json`.

## Master Style Prompt

Generate text-free 3:2 landscape source illustrations for **What Changed?**, Book 5 of **The Wonder of Nature and the Universe**.

Match the Book 1 through Book 4 first-draft visual direction, with Book 5 focused on first experimental discipline: predict, change one thing, observe, and compare what happened.

- Electra is a young child with medium-brown skin, dark curly hair in two small puffs, and simple white-and-lavender play clothes.
- Poz is a young child with light-brown skin, short straight dark hair, and simple white-and-purple play clothes.
- They are ordinary human children, not symbols, polarity figures, or architrinos.
- Use natural skin and hair tones only for people.
- Use only white, black, pure red, pure blue, and red-blue purples for balls, start marks, paths, trace marks, shadows, floor details, play-surface pieces, clothing, play objects, and all non-human visual systems.
- Keep the art as a simple pre-K board-book scene with generous white paper space, black expressive linework, soft purple shadows, and calm readable actions.
- Treat `prediction`, `controlled change`, and `comparison` as child-readable play actions, not as formal diagrams. The visual story should be: one try, a remembered result, one small physical change, and a visible difference.
- Use a small purple star-shaped start marker only as a physical floor/play-surface mark. It must not look like a logo, reward sticker, map symbol, night-sky decoration, or abstract coordinate marker.
- Use low, soft physical guide pieces for the dip, hill, and flat path. They should look safe and preschool-friendly, not like rails, walls, roads, tracks, mazes, or engineered apparatus.
- Keep every red or blue ball clear, round, visible, and easy to point to.
- Whenever two tries are compared, show the old path as older/fainter purple and the new path as newer/fresher purple. Keep the difference visible without arrows, labels, measurement marks, or side-by-side panels.
- Do not draw architrinos, Noether sea, formal causal wakes, interference diagrams, equations, labels, captions, readable text, letters, numbers, logos, watermarks, extra characters, tiled floors, grids, rulers, measurement marks, graphs, mazes, road maps, or detached diagrams.

## Source Images

### Cover

Electra and Poz sit beside a simple white play surface with a red ball, a blue ball, a small purple star-shaped start mark, a shallow purple dip, a low purple hill piece, and a flat white path piece with purple shadow edges. Two soft purple paths are visible: one older/fainter path and one newer/fresher path that changed after one piece moved. The scene should invite the question "What changed?" through the visible old/new comparison, without using text, arrows, labels, panels, or diagram symbols.

### Spread 1: The Question

Electra watches the red ball after it has rolled to a resting place on the white floor or play surface. Poz sits nearby with the blue ball and looks toward the same result. A faint purple path behind the red ball shows how it got there. Electra's posture and gaze should feel curious: she is wondering why the ball went there. Keep the scene open and uncluttered.

### Spread 2: First Try

The red ball rolls from a small purple star-shaped start marker and stops in a shallow purple dip. Show one clear purple path from the star to the dip. Electra and Poz watch from the side. This image should read as one first try with one result: start, path, stop.

### Spread 3: Remember It

Poz records what happened by drawing or tracing the red ball's path on a simple white paper or white play surface with a purple crayon or finger trace. The original red ball and shallow dip remain visible nearby. The record should be a physical purple path mark, not writing, labels, symbols, or a diagram panel.

### Spread 4: Predict

Electra looks at the same star start and shallow dip setup, with the red ball ready at the start. Her body language suggests a careful guess about where the ball will go if they try again. Leave a quiet open route from the star toward the dip, but do not draw prediction arrows, dotted future lines, thought bubbles, labels, or numbers.

### Spread 5: Same Start

The red ball rolls again from the same purple star-shaped start marker, with the same gentle push and the same shallow dip. Show the new purple path nearly matching the older/fainter path and ending in the same dip. Electra and Poz watch the repeated result. The image should make "same start, same push, same path" visible through repeated traces, not through labels.

### Spread 6: One Change

Poz changes one physical thing in the setup while Electra watches closely. Show him moving only one low purple guide piece, such as rotating a small curved piece or swapping one shallow guide near the path, while the star start, balls, and most of the play surface stay still. The scene must make "only one change" visually clear without check marks, labels, numbers, arrows, or before/after panels.

### Spread 7: New Path

The red ball rolls again after the one change. This time it turns left along a newer/fresher purple path. The old path remains faint nearby for comparison. Electra and Poz watch the changed result. Keep the left turn broad, gentle, and child-readable, not a road, maze, or diagram.

### Spread 8: Compare

Electra and Poz look together at the old path and the new path on the white floor or play surface. The older/fainter purple path and newer/fresher purple path should be clearly distinguishable, with one visible difference where the new path turns. The children compare by looking and pointing, not by reading labels or using tools.

### Spread 9: Try A Hill

Electra and Poz swap in a low rounded purple hill piece along the path. The red ball rolls up the small hill and slows near the top. Show a short purple path approaching the hill, with closer-spaced trace marks near the top to make slowing visible. Keep the hill soft, safe, and preschool-simple.

### Spread 10: Try A Flat

Electra and Poz try a flat white path piece with subtle purple shadow edges. The red ball rolls straight through along a simple fresh purple path. The scene should contrast with the hill spread by making the path flatter and straighter, without labels, measurement marks, panels, or a road-like look.

### Spread 11: Tell The Rule

Electra points to the place where the path changed because the ball met something new, such as the moved guide piece, hill, dip, or flat path section. Poz looks at the same place. Show the old/faint path and new/fresh path together so the rule is visible from the evidence: the path changes when the ball meets something new. Do not include written rules, speech text, arrows, equations, or diagram callouts.

### Spread 12: Wonder Grows

Electra and Poz sit together beside the play surface with the red and blue balls, the purple star start, one shallow dip, one low hill piece, and several calm path traces from their tries. Leave one simple unused piece or open place nearby to suggest the next thing they might change. The scene should feel complete but curious: one answer has opened the next question.

### Backmatter Activity

A clean text-free activity scene for adult-led play: Electra and Poz sit beside a white play surface while a grown-up hand changes exactly one thing, such as moving a low purple guide piece from near to far or swapping a shallow dip for a flat path piece. A red ball waits at the purple star-shaped start marker, a blue ball sits nearby for comparison, and two soft purple paths show old result and new result. Keep the grown-up hand small and secondary. Do not use arrows, labels, numbers, rulers, grids, mazes, panels, check marks, or abstract diagrams.

## Notes Before Generation

- Book 5 should have `14` source images: cover, 12 story spreads, and 1 backmatter activity.
- Do not generate Book 5 until Book 4 source images and layout are reviewed.
- After approval, add Book 5 to `tools/build_generation_manifest.py`, add production prompt blocks to `what-changed.md`, rebuild the manifest, generate sources with the built-in `image_gen` workflow used for Books 1-4, run QA, render pages, then refresh the manifest again.
