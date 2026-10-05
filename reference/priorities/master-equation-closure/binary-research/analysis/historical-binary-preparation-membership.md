# Applicability of the slow-binary theorem to the historical preparation

The historical speed and radial-balance calibration lie comfortably inside the accepted slow-binary dispersal theorem. An exactly symmetric, complete circular past reconstructed from those parameters satisfies every preparation inequality. The retained numerical source is a different evidentiary object: its circular certificate covers only solver time $[-3,0]$, and its two paths are independently constructed with phase tokens $0$ and `3.1415926535897931`. The retained data do not bind a complete past or an exact antipodal relation. Consequently the theorem can be applied to the reconstructed ideal reference, but cannot yet be assigned to the literal certificate-identified historical source.

This is an applicability check, not a review of the accepted theorem or a numerical revalidation. It establishes neither the historical trajectory's later fate nor the correctness of its reported radial dip. All new calculations use $c_f=1$. The radius and speed in physical display units identify the legacy record; they supply no new substrate constant.

## 1. The preparation that the theorem requires

The [accepted wider theorem](slow-binary-wider-regime.md), as delimited by its [independent adjudication](slow-binary-wider-regime-independent-adjudication.md#accepted-scope-and-checks), concerns two opposite-polarity members with a complete supplied planar mirror history, meaning $\mathbf X_-(T)=-\mathbf X_+(T)$ at every past time. Set $K=\kappa|q_+q_-|$, choose member radius scale $R_0$, and define

$$
v_0^2=\frac{K}{4R_0},\qquad \epsilon=\frac{v_0}{c_f},\qquad
s=\frac{v_0T}{R_0},\qquad \mathbf Y=\frac{\mathbf X_+}{R_0}.
$$

The theorem's small parameter uses the coupling-defined comparison speed $v_0$, which is slightly different from the imposed circular speed. It requires $0<\epsilon\le1/2000$, scaled speed $|\mathbf Y'|\le2$ throughout the complete supplied past, and recent data in $W^{2,\infty}$ on $[-7\epsilon,0]$. This regularity means continuously differentiable positions with bounded weak second derivative; it permits an acceleration jump at release. On that recent interval the required bounds are $3/4\le|\mathbf Y|\le5/4$, $|\mathbf Y'|\le2$ and $|\mathbf Y''|\le8$.

At release the angular coordinate $h_0$ and eccentricity coordinate $\mathbf e_0$ satisfy $|h_0-1|\le\epsilon$ and $|\mathbf e_0|\le\epsilon$, where

$$
h=(\mathbf Y\times\mathbf Y')\cdot\hat{\mathbf z},\qquad
\mathbf e=\mathbf Y'\times(h\hat{\mathbf z})-\frac{\mathbf Y}{|\mathbf Y|}.
$$

These are algebraic coordinates of the trajectory. The theorem has no mass or physical-energy premise, and supplies no ceiling response or additional event prescription.

## 2. Which historical bytes are available

The [August 11 evidence account](../evidence/2026-08-11-physical-binary-retained-history-radial-turn.md#reproduction-record) identifies the early CSV, refined CSV and refined checkpoint by SHA-256. `node .tmp/binary-historical-preparation/inspect.mjs target` measured each of those retained files and found its digest equal to the corresponding digest in that account. The early checkpoint, which is available alongside the early CSV, was also inventoried; the August 11 account does not give a digest for that checkpoint. The refined checkpoint is therefore the stronger direct binding of the circular preparation metadata to the preserved evidence record.

The same inspection measured a mismatch between the current `scripts/eom/antipodal-binary-spiral-law.cpp` bytes and the instrument digest recorded in the August 11 account. That mismatch alone establishes no behavioral defect. A search of the file's Git history using `git log --format=%H -- scripts/eom/antipodal-binary-spiral-law.cpp`, followed by `git show` and the known-case-tested SHA-256 function, recovered an exact digest match at commit `c82aa319f04bffe08ec36cb901ac1ba96e277f57`. The retained instrument and the checkpoint/history implementation at that commit were read; disposable copies are in `.tmp/binary-historical-preparation/`. No historical source was changed.

The retained instrument's physical-target entry point sets solver radius to one, selects a circular seed, and computes the normalized imposed speed from the two legacy display numbers. Its evolution request explicitly sets `field_speed` to `1`. It measures a sharp release snapshot at unit coupling and calibrates the raw coupling from its radial coefficient. The two actual evolution paths then receive opposite finite decimal charge tokens and separately constructed circular histories. Thus the current code's preparation description is supported by the digest-matching historical source, rather than assumed from a later revision.

A dedicated reader, `node .tmp/binary-historical-preparation/decode-v6.mjs target`, decoded both checkpoints against the serialization layout of the recovered historical source. It checked the complete serialized-byte checksum, bounds on every string read, the schema, path count and payload exhaustion. Both checkpoints have format `EOMCPV3` with schema `eom_native_evolution_checkpoint/v6`; their stored circular metadata agree:

| Metadata | Positive member | Negative member |
| --- | --- | --- |
| Circular certificate interval | $[-3,0]$ | $[-3,0]$ |
| Maximum segment step token | `0.10000000000000001` | `0.10000000000000001` |
| Radius token | `1` | `1` |
| Height and tilt tokens | `0` | `0` |
| Angular-speed and speed tokens | `0.00033356409519815205` | `0.00033356409519815205` |
| Phase token | `0` | `3.1415926535897931` |
| Charge token | `0.1666666666666666666666666666666667` | `-0.1666666666666666666666666666666667` |

The early checkpoint ends at solver time 3400 and the digest-bound refined checkpoint at 18560. Their appended accepted histories preserve the original circular certificate interval; appending does not extend that certificate into an all-past preparation. The decoded numerical histories and checksums are evidence of the serialized source record, not independent proof of the trajectory they contain.

**Claim grade: measured.** The instruments above bind available bytes to the historical account and read the stored metadata over the named files. Falsifier: an independently decoded copy of the digest-bound refined checkpoint with different circular tokens, or a recovered historical source whose digest differs from the account's instrument binding. Exact machine observations are in `.tmp/binary-historical-preparation/input-inventory.json`, `source-bindings.json` and `decoded-refined.json`.

## 3. Radial-balance calibration and the theorem's coordinates

The [August 10 circular-release calculation](../evidence/2026-08-10-balanced-circular-release-outward-departure.md#analytic-release-test) provides an independent analytic reference for the intended ideal geometry. Let $\beta$ be the imposed speed divided by $c_f$. For an exactly antipodal circle of radius $R_0$, the unique partner root has half phase $\xi$ satisfying

$$
\xi=\beta\cos\xi,\qquad C=\cos\xi,\qquad D=1+\beta\sin\xi.
$$

The emission delay is $2R_0\xi/(\beta c_f)$, the delayed range is $2R_0 C$, and the positive radial coefficient is $F_r=1/(4CD)$. Radial balance requires $\beta^2c_f^2=K F_r/R_0$. Therefore the coupling-defined speed and initial algebraic coordinates obey

$$
\epsilon^2=\beta^2CD,\qquad
h_0=\frac\beta\epsilon=\frac1{\sqrt{CD}},\qquad
\mathbf e_0=(h_0^2-1)\mathbf n_0.
$$

The acceleration at release is not needed to be continuous with the imposed circular past. The theorem expressly permits that seam. It is also not necessary for the release to be perfectly radially balanced: the displayed coordinate inequalities are its actual hypotheses.

For small $\beta$, elementary bounds give $0<\xi\le\beta$, $C\ge1-\beta^2/2$ and $0\le\beta\sin\xi\le\beta^2$. Hence

$$
1-\frac{\beta^2}{2}\le CD\le1+\beta^2,
$$

so $h_0-1$ and $|\mathbf e_0|$ are of order $\beta^2$, much smaller than the permitted order-$\epsilon$ deviations. This conclusion follows from the closed-form circle geometry rather than the trajectory integrator or its calibration snapshot.

For a second, direct arithmetic check, use the recorded raw coupling $\kappa=1.6022161698524887\times10^{-5}$ and the retained decimal charge magnitude. Exact rational arithmetic in `node .tmp/binary-historical-preparation/membership-arithmetic.mjs target` gives

$$
0.00033356410<\epsilon<0.00033356411<\frac1{2000},
\qquad |h_0-1|<3\times10^{-8},
\qquad |\mathbf e_0|<6\times10^{-8}.
$$

Here $h_0=\beta/\epsilon$ and $\mathbf e_0=(h_0^2-1)\mathbf n_0$ are evaluated for the reconstructed unit circle with the retained speed token. Its radius is exactly one, its scaled past speed is $h_0<2$, and its scaled circular acceleration has magnitude $h_0^2<8$. Extending that exact circle to every negative time gives smooth recent data and a uniformly bounded complete past. These inequalities therefore prove membership of that declared ideal extension.

The raw coupling in this arithmetic check is the value stated in the evidence account. The checkpoint stores a model fingerprint rather than a readable request containing the coupling token; no full request manifest was located by `rg --files --hidden .local-data/braid-program` restricted to the physical-target families. The calibration source and recorded coupling are consistent with the analytic reference. Recomputing the model fingerprint from a separately retained complete launch request would strengthen the exact request binding; it is not needed to establish the ideal preparation's arithmetic margin and has not been done here.

**Claim grade: derived, with the recorded coupling as a declared datum.** The reconstructed exact mirror circle satisfies all numerical and regularity hypotheses. Falsifier: exact rational evaluation outside one of the displayed intervals, a different recorded coupling token invalidating those bounds, or an error in the independently stated circular-root and balance identities. The result does not identify that extension with a particular selected trajectory inside numerical history enclosures.

## 4. Complete history and exact mirror symmetry remain distinct obligations

The finite history interval is shorter than the theorem's recent preparation interval. In this legacy solver's normalized units $R_0=c_f=1$, the change of time gives

$$
[-7\epsilon,0]\text{ in }s
\quad\longleftrightarrow\quad[-7,0]\text{ in }T.
$$

The retained circular certificate ends at zero and begins at $-3$. It does not specify the required additional four units or the entire earlier past. The historical instrument's root search starts at minus the chosen history depth, and `uniform_circular_analytic_state` explicitly returns no analytic state outside the certificate's bounded interval. Neither routine implicitly creates a circle back to minus infinity.

This is an evidence boundary, not a proof that the finite preparation cannot be extended. A complete circular extension is available. For the ideal mirror extension its initial partner delay is below $2/(1-\beta)<3$, so no negative-time source outside the retained interval is initially used. During the theorem's ordinary future, emission time has positive derivative equal to the receiver root factor divided by the transmitter root factor. It never moves earlier than its initial value. Thus a declared complete ideal extension can retain the same relevant circular prefix without later sampling the newly added remote times. This derived observation explains why the short finite history is sufficient for the historical one-root calculation; it does not supply a declaration of the missing complete past in the historical record.

There is also a separate symmetry issue. The historical factory does not construct the negative path by exact reflection of the positive one. It calls the same circular constructor with a rounded numerical phase. As an exact decimal parameter, `3.1415926535897931` differs from $\pi$, so the nominal analytic parameterization is not exactly antipodal. The theorem requires equality, not approximate antipodality.

The representation does carry numerical enclosures. In the inspected historical `Interval::decimal_token`, a decimal is converted to a binary64 value and enclosed between neighboring values. The circle factory also attaches coordinate and velocity error radii to its cubic segments. Such enclosures can contain positions belonging to the intended ideal mirror circle. Their containing that circle does not by itself establish that both independently represented paths select one correlated exact mirror history. No reflection constraint or exact cross-path identity is recorded in the decoded circular metadata; the checkpoint's joint-history mode is disabled.

Accordingly the defensible conclusion is lack of exact mirror binding. Under a literal nominal-token interpretation the circular paths fail exact antipodality. Under an enclosure interpretation the symmetry may be compatible with the data, but its correlated realization and subsequent exact solution are not established by this membership check. A perturbation theorem for small nonmirror defects would be a separate result; the accepted mirror theorem cannot silently supply it.

**Claim grade: derived from measured metadata and the inspected representation contract.** Complete mirror membership is not established for the certificate-identified source. Falsifier: a digest-bound complete-past declaration together with an exact reflection identity or a checked correlation argument selecting the mirror solution represented by both paths. A small numerical phase error, or overlapping error hulls alone, does not supply those conditions.

## 5. Hypothesis adjudication

The table separates the ideal mathematical source reconstructed above from the literal retained source. A missing hypothesis here does not revise the historical event claim; it limits use of the newer dispersal theorem.

| Theorem hypothesis | Reconstructed complete mirror circle | Certificate-identified historical source |
| --- | --- | --- |
| Unchanged inverse-square law, no cap or event modification | Declared | Historical request source specifies $c_f=1$, sharp chart and vector evolution; full request binding remains limited by stored model fingerprint |
| Isolated opposite-polarity planar pair | Declared, with retained opposite charge magnitudes | Supported by matching instrument and checkpoint paths; no environment path is serialized |
| $0<\epsilon\le1/2000$ | Proved from the recorded coupling | Recorded-parameter arithmetic meets the bound; coupling is not readable from the checkpoint itself |
| Exact past mirror relation | Defined by reflection | Not bound; independently parameterized finite phase tokens and uncorrelated enclosures |
| Complete supplied past for every $T\le0$ | Explicit circular extension | Not serialized or declared by the finite certificate |
| Recent $W^{2,\infty}$ interval and radius bounds | Smooth circle, radius one | Circular certificate is smooth on its declared interval, but covers only $[-3,0]$ rather than required $[-7,0]$ |
| Complete past scaled speed $\le2$ | $h_0<2$ for every negative time | Verified for the intended finite circular prefix; no complete past bound is recorded |
| Recent scaled acceleration $\le8$ | $h_0^2<8$ | Supported on the declared circular prefix; missing older part of the required recent interval |
| $|h_0-1|\le\epsilon$, $|\mathbf e_0|\le\epsilon$ | Exact rational margins shown above | Intended circular endpoint meets them under recorded coupling; the CSV is a midpoint diagnostic and does not itself select an exact correlated history |
| Continuity of positions and velocities; acceleration jump allowed | Satisfied | Intended circular release is compatible; matching a numerical hull is insufficient to establish the complete exact source |

The check is complete at a precise applicability boundary. The ideal historical-parameter reference disperses by the accepted theorem. The literal historical source is not yet shown to be a member of that theorem's complete mirror class. Neither conclusion proves a strictly positive terminal speed or validates the historical solver's long trajectory and its tiny radial dip.

## 6. Scoped verification and preservation

The custom byte, CSV, checkpoint and rational readers were run on known cases before their targets. `inspect.mjs known` passed the SHA-256 of `abc`, a synthetic length-prefixed checkpoint header and a synthetic CSV row. `decode-v6.mjs known` passed the independently known FNV-1a digest of `hello`, a synthetic circular certificate with a known cubic coefficient, and rejection of a truncated payload. `membership-arithmetic.mjs known` passed exact rational addition, scientific-decimal conversion, a square inequality and division. The succeeding target runs establish byte identities, metadata and arithmetic inequalities; they do not approximate or evolve the binary.

Only this new analysis and `.tmp/binary-historical-preparation/` are authored. The accepted theorem and adjudication, historical accounts, prior instruments, checkpoints and CSVs are preserved. No production solver, Python interpreter, trajectory rerun, Git mutation or generated-artifact write was performed. The assigned Germund Dahlquist analytical lens supplies no independent acceptance authority. This subject is ready for a separate applicability review; any acceptance must preserve the ideal-versus-literal source distinction.

The validation receipt in `.tmp/binary-historical-preparation/validation.json` records mathematical rendering, local-link checks, protected-input comparisons and the frozen new report identity. These document and preservation checks are distinct from the source applicability argument.
