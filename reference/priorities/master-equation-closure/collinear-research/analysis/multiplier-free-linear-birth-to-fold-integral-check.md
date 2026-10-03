# Independent integral audit from self birth through the first partner fold

**Date:** 2026-10-02. **Status:** ✓ Done for the three final supplied histories. **Grade:** independently measured polynomial-root census, event locations and acceleration-integral agreement. **Scope:** the resolved multiplier-free linear history, with held rest preparation, through self birth, third contact and the first inherited partner fold. This is not an interval enclosure or a proof of the exact selected-release trajectory.

The new resolved histories pass the independent complete-channel integral checks in the stated windows. Three source-prefix resolutions give the same event sequence and root transitions. The third passage and local transit through the first partner fold now have independent numerical support under the multiplier-free law; they no longer depend on the old factor-bearing calculation or the inaccurate earlier postbirth full histories. No later turn, return, cycle, escape or indefinite growth is established by this audit.

The earlier [frozen full-history integral failure](multiplier-free-linear-partner-fold-integral-check.md) remains preserved: those histories had stable finite acceleration integrals but nonmonotone velocity-increment residuals of order $10^{-3}$. The subsequent [local coupled receiver check](multiplier-free-linear-partner-fold-coupled-integral-check.md) established agreement conditional on that local seed and fixed source past. This report evaluates the newly supplied full resolved histories instead. It does not reuse the earlier postbirth trajectory.

## Declared law, inputs and independent services

The scenario is the exploratory linear spatial numerator, with $a=0.5$, release from held rest, $k=0.2862286103053385$ and $c_f=1$. For the initially right-hand member at $x(T)$, its partner is at $-x(T)$ and its self history is at $x(S)$. Every admitted earlier partner or self root is retained, with the absolute transmitter Jacobian. There is no receiving-speed multiplier, cap, softening, kick or generalized no-self clause. The [corrected equation owner](multiplier-free-linear-delayed-comparison.md) supplies the full law.

The new [wrapper](../../../../../scripts/collinear-research/linear-birth-to-fold-independent-integral.py) imports the unchanged [source-time integral oracle](../../../../../scripts/collinear-research/linear-partner-fold-independent-integral.py) and unchanged [polynomial-range service](../../../../../scripts/collinear-research/linear-partner-fold-coupled-integral-check.py). Only receipt destinations are redirected into this audit's new namespace; scientific constants and algorithms are unchanged. Every invocation records fresh known-case receipts before a target read, preserving earlier receipts.

The supplied inputs are `resolved-h2048-q1e-06.npz`, `resolved-h4096-q1e-06.npz` and `resolved-h8192-q1e-06.npz` under `.local-data/collinear-research/linear-self-birth-to-fold/`. These are final reruns after the coordinator corrected the startup matching to distinguish the supplied past's curvature from the instantaneous partner acceleration. That description is coordinator-provided context; this audit does not inspect the evolving instrument's source. The first provisional h4096 independent receipt is retained under this audit's `preliminary/` and excluded from final quantitative conclusions.

Before parsing each final input, the wrapper reads its bytes once and saves a hash-named private copy under `.local-data/collinear-research/linear-birth-to-fold-independent/inputs/`. The receipt binds that copy, the original input path, both unchanged service hashes, and the known-case receipt. This avoids confusing a later shared-path replacement with the data actually inspected. Only the arrays `t,x,v` are used; supplied event scalars, source parameters and any parent accumulated ledger are not used to locate events or tune integral expectations.

The position is independently reconstructed by cubic Hermite interpolation, using the derivative of that same interpolant for velocity. Define $P(S)=S+x(S)$ and $Q(S)=S-x(S)$. The first negative wake-speed event is independently located as the first crossing maximum of $P$; the third contact is the third zero of $x$; the inherited partner fold is located by $Q(T_f)=P(S_*)$ at that source maximum. Held negative-time clocks are included analytically. Complete earlier roots are enumerated with the polynomial solver, rather than copied from the evolving instrument.

The four channel clock pairs and signs are $(P,Q,-1)$ for positive-distance partner, $(Q,P,+1)$ for negative-distance partner, $(P,P,-1)$ for negative-distance self and $(Q,Q,+1)$ for positive-distance self. Admissibility requires $S<T$; the exact zero-delay diagonal is excluded. The numerical census uses a $2\times10^{-9}$ separation tolerance for that diagonal. These event probes and positive-cutoff birth windows are away from a second earlier root at that numerical scale; no claim of a certified infinitesimal census is made.

## Known cases before targets

Each final target first passed the oracle's exact two-sided parabolic source fold with unequal curvatures 0.6 and 1.4, with integral error $3.05\times10^{-16}$. The imported range/mapping service passed that exact integral at 61, 121 and 241 receiver samples per side, with maximum error $3.05\times10^{-16}$. The new wrapper then checked a held static source: its census gives one earlier partner root and no earlier self root; its integrated partner contribution on a width-0.2 interval differs from the exact value $-0.2k$ by $2.01\times10^{-16}$. Its identical source/receiver self clock gives zero after diagonal exclusion.

These are exact normalization, branch-weight, domain-reduction and diagonal controls. They are not independent evolved-trajectory references for the later target. The scientific independence comes from the source-time coarea calculation and polynomial-root implementation, while refinement remains numerical consistency evidence.

## Independently located events and complete census

| Source-prefix step | First wake-speed/self-birth time | Third contact time | First inherited partner fold time |
| --- | ---: | ---: | ---: |
| $1/2048$ | 12.411882216911 | 13.012286219135 | 13.100021969709 |
| $1/4096$ | 12.411882245953 | 13.012286308332 | 13.100022073471 |
| $1/8192$ | 12.411882235168 | 13.012286279190 | 13.100022039885 |

The displayed digits identify each numerical input, not a rigorous error bound. Six-decimal event values are stable across these three histories. The independent locations do not consume the NPZ event scalars.

All three histories have the following census at reception offsets $\pm10^{-3}$ and $\pm10^{-4}$ from each event:

| Event | Earlier roots before | Earlier roots after | Geometric meaning |
| --- | --- | --- | --- |
| Self birth | 1 partner, 0 self | 1 partner, 1 self | The new earlier self root must enter the acceleration; a self-free extension would change the law. |
| Third contact | 1 partner, 1 self | 3 partner, 1 self | New partner branches emerge at the diagonal while older partner/self reception persists. The subfield zero-total-acceleration contact argument cannot be copied here. |
| Partner fold | 3 partner, 1 self | 1 partner, 1 self | The two positive-distance partner roots coalesce; the negative-distance partner and negative-distance self root remain. |

The source-range service retains every polynomial sector whose endpoint/extremum range intersects the receiver-clock range. Disjoint sectors cannot solve the arrival equation; their omission is a numerical domain reduction on the fixed polynomial, not a new physical root exclusion. Both orientations at the fold are integrated with absolute weights and reinforce.

At the h4096 birth probes, the complete acceleration is approximately -0.599202 at offset $-10^{-4}$ and -1.390489 at offset $+10^{-4}$. These finite sampled values are consistent with the separately derived finite, changed right trace. They do not measure the exact limit or replace its conditional theorem.

## Integrated-equation checks

The unchanged oracle changes integration variable from reception time to source time on each branch. For source clock $F$ and receiver clock $G$, it evaluates

$$
\int a(T)\,dT=\sigma k\int\frac{T(S)-S}{|G'(T(S))|}\,dS.
$$

The source-fold derivative has canceled without changing the original instantaneous weight. Integration splits at both source and receiver polynomial knots and extrema. Receiver clocks have no zero derivative inside the chosen positive-cutoff birth or contact/fold windows. Each receiver reconstruction is refined with 61, 121 and 241 samples per side, and each is integrated at Gaussian orders eight and sixteen. The table gives the 241-sample signed residual $\Delta v-\int a\,dT$.

| Source-prefix step | Birth $T_*+10^{-4}$ to $T_*+0.01$ | Third contact $\pm0.002$ | Partner fold $\pm0.002$ |
| --- | ---: | ---: | ---: |
| $1/2048$ | $-1.15\times10^{-10}$ | $-1.56\times10^{-12}$ | $-2.72\times10^{-10}$ |
| $1/4096$ | $-1.03\times10^{-10}$ | $-4.71\times10^{-12}$ | $-1.53\times10^{-11}$ |
| $1/8192$ | $-1.07\times10^{-10}$ | $+2.22\times10^{-11}$ | $-2.92\times10^{-10}$ |

At h4096, the complete acceleration integrals are respectively -0.01377836923163, -0.00679261130484 and -0.01911491081689. The corresponding velocity increments are -0.01377836933480, -0.00679261130956 and -0.01911491083219. The fold's receiver-refinement residual decreases from $-6.91\times10^{-10}$ at 61 samples to $-1.50\times10^{-10}$ at 121 and $-1.53\times10^{-11}$ at 241. The other source resolutions show the same improving fold receiver-refinement trend, with a small remaining interpolation/trajectory residual.

At the finest receiver sampling, quadrature-order differences over these windows are at most $3.56\times10^{-13}$ across all three inputs. The birth-window residual has largely stabilized under receiver refinement at order $10^{-10}$; it is not driven down by quoting the smaller quadrature difference. These are measured agreements on polynomial histories, not rigorous continuous error bounds.

The h4096 complete integrals separate as follows:

| Window | Positive-distance partner | Negative-distance partner | Negative-distance self | Positive-distance self |
| --- | ---: | ---: | ---: | ---: |
| Positive-cutoff birth | -0.00593934624489 | 0 | -0.00783902298674 | 0 |
| Third contact | -0.00339784710564 | +0.00000025896239 | -0.00339502316159 | 0 |
| Partner fold | -0.01573812592537 | +0.00004732804414 | -0.00342411293565 | 0 |

The zero entries are absent admissible earlier roots on these specific windows, established by the polynomial census and diagonal exclusion. They are not no-self premises. The self contribution is comparable to the partner contribution near birth/contact and remains material at the fold.

## Whole postbirth integrated increment

The event windows alone do not check the intervals between them. A separate h4096 supplement therefore integrates the complete signed acceleration from $T_*+10^{-4}=12.41198224595301$ to $T_f+0.002=13.10202207347135$. Third contact and the partner fold are explicit receiver split knots. The receiver is independently reconstructed from supplied position and velocity with 241, 481 and 961 samples in each of the three regimes; the incoming fold regime uses quadratic endpoint spacing. The unchanged source-time oracle and exact polynomial range service evaluate all four channels at quadrature orders eight and sixteen.

| Receiver samples per regime | Order-sixteen complete integral | Supplied velocity increment | Increment minus integral |
| --- | ---: | ---: | ---: |
| 241 | -1.097410279042480 | -1.097410281094800 | $-2.0523\times10^{-9}$ |
| 481 | -1.097410280514128 | -1.097410281094800 | $-5.8067\times10^{-10}$ |
| 961 | -1.097410280876385 | -1.097410281094800 | $-2.1842\times10^{-10}$ |

The finest complete integral comprises -0.52843362912542 from positive-distance partner roots, +0.00053546604748 from negative-distance partner roots and -0.56951211779845 from the negative-distance self root. Positive-distance self roots are absent on this interval by the clock geometry. The maximum order-eight versus order-sixteen difference over the three receiver refinements is $3.05\times10^{-13}$. These measured results independently support the full postbirth integrated increment on the saved resolved history, including the intervals between birth, third contact and the first partner fold. The retained cutoff excludes the first $10^{-4}$ after birth, and the result is neither an interval enclosure nor a bound on pointwise trajectory error.

This supplement uses the same frozen final h4096 bytes as the local-window audit. A global polynomial-extremum search on the entire saved source interval finds the single negative-speed birth extremum at 12.41188224595301; the complete before/after census remains one partner and zero self to one partner and one self at birth, one to three partner roots at third contact, and three to one partner roots at the fold, with one self root after birth. The exact artificial fold, receiver/range mapping and held-static controls passed before this target. The separate receipt is `.local-data/collinear-research/linear-birth-to-fold-independent/resolved-h4096-q1e-06-whole-independent.json`; its input, known-control path and immutable service hashes are recorded there. The watched foreground run completed with exit zero in 494.670 seconds and advancing ten-second heartbeats.

## Near-birth conditioning limit

The source and receiver $P$ clocks become nearly flat at birth. A source-time transformation removes the source Jacobian singularity, but root inversion still subtracts nearly equal floating-point clock values. To expose this limit, the audit integrates from successively smaller positive birth cutoffs to $T_*+0.001$ at 121 receiver samples per side:

| Birth cutoff | h4096 acceleration integral | h4096 velocity increment minus integral |
| --- | ---: | ---: |
| $10^{-4}$ | -0.00125154319940 | $-8.49\times10^{-11}$ |
| $2.5\times10^{-5}$ | -0.00135582912485 | $+1.00\times10^{-9}$ |
| $6.25\times10^{-6}$ | -0.00138190041361 | $-5.66\times10^{-9}$ |

The integrals approach a finite value as the omitted birth layer shrinks, consistent with a bounded changed acceleration trace. Agreement degrades as the cutoff approaches birth; the coarser/finer source inputs also reach residuals around $5\times10^{-9}$ at the closest cutoff. This is a conditioning limit of the floating-point check, not an interval proof, a divergent-impulse finding or a license to omit the born self root. The exact zero-time startup is assessed by its analytical finite-trace theorem, not by extrapolating these digits into a numerical certificate.

## Geometry disposition and reproduction

The supplied resolved multiplier-free histories have independent numerical support for a third contact and complete local transit through the first inherited partner fold, with continuous supplied position and velocity and all source channels retained. This advances the numerical frontier beyond the earlier independently checked subfield prefix and beyond a local fold computation whose source past had been supplied separately. The exact mathematical trajectory, generalized-solution uniqueness, later motion and global behavior remain unproved. The earlier approximate all-root trajectories cannot inherit this receipt because their source hashes and event handling differ.

Reproduce with the shared executable venv:

```bash
"${AAA_VENV:-../.venv}/bin/python" scripts/collinear-research/linear-birth-to-fold-independent-integral.py --known
"${AAA_VENV:-../.venv}/bin/python" scripts/collinear-research/linear-birth-to-fold-independent-integral.py --history .local-data/collinear-research/linear-self-birth-to-fold/resolved-h2048-q1e-06.npz
"${AAA_VENV:-../.venv}/bin/python" scripts/collinear-research/linear-birth-to-fold-independent-integral.py --history .local-data/collinear-research/linear-self-birth-to-fold/resolved-h4096-q1e-06.npz
"${AAA_VENV:-../.venv}/bin/python" scripts/collinear-research/linear-birth-to-fold-independent-integral.py --history .local-data/collinear-research/linear-self-birth-to-fold/resolved-h8192-q1e-06.npz
"${AAA_VENV:-../.venv}/bin/python" scripts/collinear-research/linear-birth-to-fold-independent-integral.py --history .local-data/collinear-research/linear-self-birth-to-fold/resolved-h4096-q1e-06.npz --whole-only
```

Receipts and bound input copies are under `.local-data/collinear-research/linear-birth-to-fold-independent/`. Every target's known receipt is recorded in its result. All final runs completed with exit zero as watched foreground jobs, with advancing ten-second heartbeats; measured wall times were 18.737, 22.250 and 28.968 seconds. No job remains active. Prior reports, services and receipts are retained unchanged; provisional evidence is kept separately.

Before creating the new files, basename `rg` searches under `scripts`, `tests` and `reference` returned no existing named consumer or binder in that scope. Script compilation, scoped whitespace and relative-file checks are recorded in the handoff. They validate document/code syntax, not mathematical correctness. This audit introduces no standing test, physical shim, production EOM change, generator write or Git publication.

Falsifiers are an earlier root omitted from the stated clock equations, failed exact controls, wrong polarity or absolute source weighting, a root-conditioning error larger than the claimed numerical precision, or an independent integral disagreement beyond the observed refinement limits. Failure of the complete held-release history to satisfy the intended equation would prevent promoting it despite passing selected windows. A later turn or return would require a new bounded event analysis; a finite output horizon is neither that event nor a no-continuation theorem.
