# Book 4 Image-Generation Brief: Again Makes A Pattern

Use this brief after Book 3 review, before adding Book 4 back into `generation-manifest.json`.

## Master Style Prompt

Generate text-free 3:2 landscape source illustrations for **Again Makes A Pattern**, Book 4 of **The Wonder of Nature and the Universe**.

Match the Book 1, Book 2, and Book 3 first-draft visual direction, with Book 4 focused on repeated path traces becoming a readable pattern:

- Electra is a toddler girl with medium-brown skin, dark curly hair in two small puffs, and simple white-and-lavender play clothes.
- Poz is a toddler boy with light-brown skin, short straight dark hair, and simple white-and-purple play clothes.
- They are ordinary human children, not symbols, polarity figures, or architrinos.
- Use natural skin and hair tones only for people.
- Use only white, black, pure red, pure blue, and red-blue purples for balls, ribbons, paths, trace marks, shadows, floor details, clothing, play objects, and all non-human visual systems.
- Keep the art as a simple preschool board-book scene with generous white paper space, black expressive linework, soft purple shadows, and calm readable actions.
- Treat repeated motion only as visible path traces and child-readable pattern finding at this age. Do not draw architrinos, Noether sea, formal causal wakes, interference diagrams, equations, labels, or detached diagrams.
- Do not include arrows, labels, captions, readable text, letters, numbers, logos, watermarks, extra characters, tiled floors, grids, rulers, measurement marks, mazes, graphs, or busy backgrounds.
- Keep every red or blue ball clear, round, visible, and easy to point to.
- Whenever paths repeat, show older/fainter purple traces and newer/fresher purple traces. Let the pattern emerge from the traces, not from diagram symbols.
- Keep repeated paths simple enough for a preschool reader: a few clear routes, crossings, overlaps, and quiet shapes rather than a dense scribble field.

## Source Images

### Cover

Electra and Poz sit on a clear white floor with a red ball and a blue ball nearby. Several soft purple path traces curve across the floor and gently gather into a simple readable pattern: near paths, far paths, and one gentle crossing. The traces should feel like repeated rolling paths that have become a quiet shape, not a maze or diagram. Keep the children, balls, and path pattern in one calm continuous scene.

### Spread 1: The Wonder

Electra looks at a faint older purple trail left on the white floor, while Poz sits nearby with the red and blue balls. Electra's body and gaze show curiosity about doing the motion again. The old trail should be visible but soft, like yesterday's trace. Keep the scene open and uncluttered.

### Spread 2: First Roll

The red ball rolls across the white floor and leaves one clear purple dotted path behind it. Electra and Poz watch from the side. This image should read as one run and one path. Keep the red ball clear, round, visible, and uncovered.

### Spread 3: Second Roll

The blue ball rolls next, leaving a second purple dotted path that comes close to the earlier red-ball path. The older path is paler and the newer path is fresher. Electra and Poz compare by looking at the two nearby paths. Keep the paths separated enough to see both.

### Spread 4: Almost Same

Electra looks closely at two similar purple paths on the white floor. One older/fainter path and one newer/fresher path almost follow the same route, with small visible differences. Poz sits nearby with the red and blue balls. The image should show "almost the same" without arrows, labels, or measurement marks.

### Spread 5: Farther Start

Poz moves one ball farther over before rolling. Show the red or blue ball starting from a clearly farther side position, and a new purple path that changes because of that farther start. The old path remains faint nearby for comparison. Leave enough white space so the changed starting place is readable.

### Spread 6: Nearer Start

Electra moves a ball near an old path before rolling. The new purple path begins close to the old path and gently meets or overlaps it. Show the near start clearly with the children watching. Keep the overlap simple and child-readable, not tangled.

### Spread 7: Over And Under

One purple line crosses another on the white floor. Poz traces the crossing with one finger while Electra watches. The crossing should be a gentle path overlap from repeated rolling, not a knot, maze, road map, or diagram. Keep both balls visible nearby if space allows.

### Spread 8: Many Tries

Electra and Poz have rolled again and again. Several purple path traces now appear across the white floor, with older traces faint and newer traces fresher. The page can feel a little busier than earlier spreads, but the paths must remain readable and not become a scribble, grid, or maze. The red and blue balls should stay visible.

### Spread 9: The Quiet Shape

The repeated purple paths are not random; together they form a simple quiet shape on the white floor, like a soft loop, oval, or gentle fan of paths. Electra and Poz look at the emerging pattern together. The shape should arise from repeated traces, not from a drawn outline or formal symbol.

### Spread 10: Predict

Poz looks at the existing pattern and appears to anticipate where the next path will go. Show a faint open place in the pattern where the next trace could fit, with the red or blue ball ready nearby. Do not use arrows, dotted prediction lines, labels, numbers, or thought bubbles. The composition itself should suggest a likely next path.

### Spread 11: Test

Electra and Poz roll once more. A newer, fresher purple path joins the quiet shape in a place that fits the earlier pattern. Keep the older pattern visible but soft, and make the new joined path easy to notice. The red or blue ball should be clear at the end or along the path.

### Spread 12: Again

Electra and Poz sit together on the white floor and look at the finished set of repeated paths. The purple traces form a calm, readable pattern with near sections, far sections, one simple crossing, and one gentle overlap. The red and blue balls sit nearby. The scene should feel complete: again made a pattern, and the pattern helped them see.

### Backmatter Activity

A clean text-free activity scene for adult-led play: Electra and Poz sit by a white play surface where a grown-up hand places the red ball at one start point and the blue ball at a nearby or farther start point. Several soft purple path traces show repeated rolls making a simple pattern. Keep the grown-up hand small and secondary. The red and blue balls must both be clear and visible for repeating and comparing. Do not use arrows, labels, numbers, rulers, grids, mazes, panels, or abstract diagrams.

## Notes Before Generation

- Book 4 should have `14` source images: cover, 12 story spreads, and 1 backmatter activity.
- Do not generate Book 4 until Book 3 source images and layout are reviewed.
- After approval, add Book 4 to `tools/build_generation_manifest.py`, add production prompt blocks to `again-makes-a-pattern.md`, rebuild the manifest, generate sources with the built-in `image_gen` workflow used for Book 1, run QA, render pages, then refresh the manifest again.
