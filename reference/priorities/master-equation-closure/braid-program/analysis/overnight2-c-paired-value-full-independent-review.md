# Independent full paired-value certificate and outer-equal implication

## Selected scope and known-first audit record

The parent explicitly selected the predeclared full 512 closed speed cells after the four-cell pilot passed. The frozen interval source is [the independent paired-value checker](../evidence/overnight2-c-paired-value-independent-check.py), SHA-256 `94511692ff0fcafa56db6e743a75e6f4a11da5cc4fc78c1355d316a62673b09e`. Its previously recorded known controls and pilot are preserved and are not repeated. The [completed pilot review](overnight2-c-paired-value-independent-review.md), SHA-256 `5fc1e8cabe7eafd8b58338cb6058a7bb93f05f4e61e426a6e6d81f005ed20d66`, remains unchanged. Full-target limits are 120 instrument seconds, 150 supervisor seconds, 400,000,000 observed RSS bytes, 1,000,000 output bytes and one numerical thread. The subject is the frozen [outer-equal sharpening note](overnight2-c-outer-equal-sharpening.md), SHA-256 `1a6ffdef659c5cc75da1651fb927e21e4ea49231334bd0e9e5c595664fb43318`.

The clock tool returned 2026-10-07 10:51:03 UTC at this stage's start. The original allocation remains launch 03:25:15 UTC, exploration stop 13:55:15 UTC and hard deadline 15:25:15 UTC. The law, complete circular histories, transmitter factor, $K_{\log}=c_f=1$ and persistent polarities remain unchanged.

Before any target-receipt audit, a separately authored [exact coverage auditor](../evidence/overnight2-c-paired-value-coverage-independent-check.py) passed manufactured controls: a contiguous three-cell closed partition was accepted; a missing index, rational endpoint gap, wrong angle channel, nonpositive factor and nonstrict paired-value threshold were each rejected. The shared-venv command was

```bash
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/evidence/overnight2-c-paired-value-coverage-independent-check.py --stage known > .local-data/master-equation-closure/overnight2-c/paired-value-coverage-known.json
```

Reading that receipt established `all_pass: true` before target use. The auditor source SHA-256 is `65e4b146bcba7d8327128e24a315943d05d9a9e52217ba81c9f2c3ec41f77bf7`. It uses exact `Fraction` arithmetic for all serialized intervals and speed endpoints, independently of mpmath and the interval producer. It checks ordered indices, exact rational cell endpoints and adjacency, both required angle channels, endpoint-root containment, positive factor floors, every strict paired-response lower bound, empty unresolved inventory and agreement of reported global lower bounds with the cell records. This is a structural and exact-arithmetic audit, not an independently recomputed transcendental interval calculation.

## Full target disposition

**Measured full result: all 512 closed cells certified, with zero unresolved cells.** The audit known pass was recorded above before launching the single selected full target and before inspecting its receipt with the auditor. The unchanged interval source ran once through the owned supervisor:

```bash
OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 node scripts/dev/owned-compute-supervisor.mjs run --owner-task "$CODEX_SESSION_ID" --owner-thread "$CODEX_THREAD_ID" --deadline-seconds 150 --heartbeat-seconds 5 -- "${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/evidence/overnight2-c-paired-value-independent-check.py --stage full > .local-data/master-equation-closure/overnight2-c/paired-value-full-supervisor.json
```

The scientific stdout was copied without transformation from `.local-data/owned-compute/logs/a092f707-d011-4805-8e9a-a0118d39ff66.stdout.log` to `.local-data/master-equation-closure/overnight2-c/paired-value-full.json`. The new coverage auditor then ran once on that receipt:

```bash
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/evidence/overnight2-c-paired-value-coverage-independent-check.py --stage target --receipt .local-data/master-equation-closure/overnight2-c/paired-value-full.json > .local-data/master-equation-closure/overnight2-c/paired-value-coverage-full.json
```

Reading the completed audit established exact consecutive indices $0,\ldots,511$, rational closed endpoints $j/512,(j+1)/512$, no gaps, coverage of both zero and one, exactly the two specified angle channels in every cell, positive factors, all strict $Q>21/20$ signs and no unresolved cells. A subsequent display command initially referenced an incorrect directory for the audit receipt and returned a missing-file error; reading the correct retained path succeeded. The audit and scientific computation were not rerun.

The interval source and exact audit agree on the certified global lower bounds

$$
Q_v(\pi/2)\ge1.07041370883418971934178917152530478>\frac{21}{20},
$$

$$
D\ge0.83601699649724989898995028713319029
$$

for all speed cells and their two enclosed channels. The audited exact positive gap between the decimal $Q$ lower bound and $21/20$ is `1020685441709485967089458576265239/50000000000000000000000000000000000`. The displayed decimals are outward lower endpoints, not rounded point estimates. The factor bound concerns the two certificate channels, not every possible phase in the physical configuration.

The worker receipt reports 9.267541916109622 seconds elapsed and 28,950,528 bytes peak RSS. The supervisor reports 648,099 bytes stdout, zero stderr, elapsed wall time 9.334 seconds, exit code zero, terminal status `completed` and `processGroupClosed: true`. It records start 10:51:34.010 UTC, finish 10:51:43.332 UTC, deadline 10:54:03.931 UTC and an advancing heartbeat at 10:51:39.012 UTC. The owned run ID is `a092f707-d011-4805-8e9a-a0118d39ff66`, owner task `01a1138c-eb29-7cb0-8c67-500816376f91`, owner thread `01a1146b-a25d-70d3-aee9-11c3ccb7d2cb`. All declared limits were met. These operational records establish closure of this owned process group, not a claim about unrelated historical test leases.

## Mathematical inclusion and complete-root boundary

The separately derived geometric chart is $\gamma=H_v(\alpha)=\alpha-2v\sin(\alpha/2)$, $D=1-v\cos(\alpha/2)$. It is strictly increasing on the physical interior $0<\alpha<2\pi$ for $0\le v\le1$, maps that interval onto $(0,2\pi)$ and has the positive implicit speed derivative $\partial_v\alpha=2\sin(\alpha/2)/D$. Each exact angle $\gamma=\pi/2,3\pi/2$ therefore has a unique complete root whose value over a closed speed cell lies between its endpoint roots, including $v=1$.

The interval producer uses exact rational bisection endpoints and outward transcendental residuals at 80 decimal digits. Certified residual signs retain the physical root at every bisection. Its 100 iterations leave rational brackets of width $7/2^{100}$. Endpoint monotonicity then encloses the entire cell, and direct interval evaluation of $B=\cot(\alpha/2)/D$ followed by subtraction encloses $Q$. The source checks a positive factor before division. Exact binary-to-rational extraction and signed decimal floor/ceiling preserve inclusion in the saved receipt. These source facts and the prior known controls establish the inclusion method; the coverage auditor independently establishes that its saved full output covers the intended partition and meets the sign threshold. The auditor does not independently recalculate mpmath's transcendental enclosures.

The equal-circle chart and general closed-subfield circular-root theorem retain exactly one positive ordinary root per directed distinct pair, no positive self roots and no omitted older-history branch. The scalar premise evaluates only the two named angles, while its application to arbitrary-phase outer-equal configurations uses the independently proved convexity of the complete paired response. No numerical phase sampling is substituted for that analytic implication.

## Completed outer-equal exclusion

**Derived result using the full interval-certified premise:** every exact distinct-member outer-equal configuration with $r_1=1$, $r_2=r_3=b$ and $\omega b\le1$ must satisfy $b<5$.

Independently reconstruct the implication as follows. Scale length and time by $b$, so the equal outer radii are one, the remaining radius is $a=1/b$, and the common unit-circle speed is $v=\omega b\in[0,1]$. The two positive outer receivers can be ordered at clockwise gap $\beta\in(0,\pi)$. Their complete three-equal-source tangential difference is $[Q_v(\beta)+Q_v(\pi-\beta)]/2$, because own-antipode terms cancel. Convexity gives a lower bound $Q_v(\pi/2)>21/20$ for every such gap.

Each smaller-source row has factor at least $1-a$ from its actual speed $va\le a$. The exact tangential chord square bounds the row by $a/[(1-a)^2(1+a)]$. Four rows across the two receivers therefore oppose their difference by at most $C(a)=4a/[(1-a)^2(1+a)]$. This increases with $a$. For $b\ge5$, $a\le1/5$, so $C\le25/24$. The scaled difference is strictly greater than $21/20-25/24=1/120$. Scaling back gives

$$
A_{2,t}-A_{3,t}>\frac1{120b},\qquad
\max(|A_{2,t}|,|A_{3,t}|)>\frac1{240b}.
$$

These are tangential residuals because the required circular acceleration has no tangential component. Exact balance is impossible. All thirty partner roots and zero positive self roots remain included, including at outer wake speed. This is a complete boundary exclusion in the stated outer-equal class, not an exclusion of arbitrary unequal radii, a stability conclusion or a trajectory result.

## Exact retained identities and limitations

All hashes below were measured with `shasum -a 256`; paths with only a basename in the runtime rows are under `.local-data/master-equation-closure/overnight2-c/`.

| Artifact | SHA-256 |
| --- | --- |
| Interval source | `94511692ff0fcafa56db6e743a75e6f4a11da5cc4fc78c1355d316a62673b09e` |
| Coverage auditor source | `65e4b146bcba7d8327128e24a315943d05d9a9e52217ba81c9f2c3ec41f77bf7` |
| `paired-value-full.json` | `64e59a4cf1a2b2789018a68c2548fc88ac356bd41ac1a52b15065485b8d1a3cb` |
| `paired-value-full-supervisor.json` | `05d3188da2a2e5d3299206ea2e0514ebee3aee0c1d044b803e933ca9715dd126` |
| `paired-value-coverage-known.json` | `35ffe55dc381614356ad31f1630d498a9b6291d04ae619560eec6fc9751b0b73` |
| `paired-value-coverage-full.json` | `e7e5a7ae3b34c30f934dba46d430a944694820dfef154a2699314d36009ece5f` |

Exactly one full target was run, with no refinement, source modification or extra partition. The completed pilot review, known and pilot receipts, frozen subject and previous evidence were preserved. Parent integration remains separate. The declared one-dimensional speed coverage and analytic convexity implication establish this boundary theorem; they do not imply practical cost for a higher-dimensional cover or existence anywhere else.

A non-outward arithmetic endpoint, missed root, invalid monotonic root enclosure, wrong angle channel, omitted cell, failed convexity premise, source-factor error or reversed scaling would invalidate the corresponding conclusion. An exact outer-equal configuration with $b\ge5$ under the fixed complete-root law would falsify the completed exclusion. No unresolved interval was classified as excluded, and no remaining exact configuration is asserted.
