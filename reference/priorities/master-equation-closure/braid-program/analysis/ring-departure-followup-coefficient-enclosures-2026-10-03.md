# Outward coefficient enclosures for the validated T02 departure

Date: 2026-10-03. Assignment: Validated ring departure, specialist lens Jack K. Hale, stable agent `/root/ring_axial`. **Scenario: unchanged Master Equation, $K=c_f=1$ in all numbers, all eight ordinary hits per receiver including its positive-delay self hit.** The lens organizes the history-domain analysis; it supplies no acceptance authority.

## Result and boundary

**Measured outward recurrence enclosures, supporting a derived coefficient construction; frozen for separate adjudication:** the new [interval jet instrument](../../../../../scripts/braid-program/ring_departure_followup_jets_20261003.py) encloses both coordinates of every exact coefficient $u_1,\ldots,u_8$ in the specified fast ancient branch $p(q)=\sum_{n\ge1}u_nq^n$. It also encloses the error between each exact coefficient and the previously printed point coefficient. This closes the rounding obligation left by the [quantitative-domain adjudication](ring-unstable-domain-independent-adjudication-2026-10-03.md#5-exact-degree-eight-remainder-and-honest-reach), subject to the new separate instrument review.

It does not enlarge the proved $|q|\le10^{-13}$ domain, validate a larger extrapolation, or identify an event. Its purpose is to make the exact degree-eight remainder usable together with an explicit printed-polynomial error, and to supply interval polynomial data for a sharper continuation proof. No stability computation is performed about an unbalanced history.

The coordinatewise maximum old-point coefficient errors have these conservatively upward-rounded caps:

| Degree | Maximum coordinate error |
| --- | ---: |
| 1 | $2.2290\times10^{-21}$ |
| 2 | $6.9202\times10^{-19}$ |
| 3 | $1.7904\times10^{-16}$ |
| 4 | $3.7195\times10^{-14}$ |
| 5 | $6.9196\times10^{-12}$ |
| 6 | $1.2167\times10^{-9}$ |
| 7 | $2.0763\times10^{-7}$ |
| 8 | $3.4870\times10^{-5}$ |

The error at an amplitude $q$ is the sum of these errors weighted by $|q|^n$, not the largest table entry alone. With $e_n$ denoting the caps, the rotating position error is at most $\sum e_n|q|^n$, its first Euler-derivative error at most $\sum n e_n|q|^n$, and its second at most $\sum n^2e_n|q|^n$. Multiplication by the physical rotation and the recorded $\lambda,\Omega$ bounds gives physical position, velocity and acceleration error by the same formulas as the accepted remainder theorem. Any application must add that theorem's omitted-coefficient tail within its proved domain.

## Exact inputs and interval recurrence

The exact T02 balance and complete root census are inherited from the frozen characteristic certificate, SHA-256 `ca1673b65e8dab0e0e602c4156e59deb3008c0d40fb52ee0dbcf8f8cc0591ff6`. Its authoritative binary intervals supply $R,\Omega,x_m,\Delta_m,D_m,C_m,F_m,H_m$. The accepted fast-root witness endpoints are widened by $10^{-70}$ to enclose their decimal printing before interval reuse. The [specified-mode independent adjudication](ring-unstable-series-independent-adjudication-2026-10-03.md) proves that any true fast root in that interval admits the normalization $u_1=R(1,-A_{11}(\lambda)/A_{12}(\lambda))$ and that every higher harmonic matrix is invertible. No largest-root or simplicity premise is added.

The new instrument is an interval adaptation of the frozen finite formal-jet instrument; it is not claimed to be an independent implementation of that instrument. Its scalar jet operations use outward addition, convolution, reciprocal, exponential, sine/cosine, positive-reference square root and composition. Each branch's implicit delay coefficient is computed from the range-minus-delay coefficient divided by its signed exact reference $D_m$. The check rejects a divisor interval containing zero. The fixed-sign denominator $\operatorname{sgn}(D_m)D(q)$ preserves the rising negative-transmitter row.

At degree $n$, inserting no degree-$n$ displacement gives the lower-order residual $E_n$. The inherited exact first variation gives

$$
A(n\lambda)u_n=-E_n.
$$

Interval adjugate division encloses its unique solution. Dependency among the reference intervals is deliberately not presumed: all exact correlated inputs lie inside the rectangular interval product, so dependency loss widens the enclosure and cannot remove the exact coefficient. This proves inclusion inductively, provided the arithmetic operations and the inherited recurrence are correct. Residual coefficient intervals contain zero through degree eight; this is a consistency check, not an independent existence proof.

Existence and convergence remain supplied by the [admitted nonlinear history construction](t02-admissible-nonlinear-history-connection.md), its [separate review](t02-nonlinear-history-independent-adjudication-2026-10-03.md), and the [quantitative-domain theorem](ring-unstable-series-quantitative-domain-2026-10-03.md). The old measured point table is read only to calculate its explicit error. It is never used as an expected answer for the exact coefficient recurrence.

## Controls and frozen receipts

Before the target, the new final instrument recorded the independent analytical controls: static implicit range $2+q$, static acceleration $(2+q)^{-2}$ with exact coefficients $(-1)^n(n+1)/2^{n+2}$, exponential coefficients $0.7^n/n!$, the sine/cosine identity, and a rational composition identity. All appropriate exact values lie in their interval jet results. The target then checks inherited finite harmonic determinant signs before constructing its coefficients.

The final instrument SHA-256 is `d4c4a0ba33793d66d536bb8010fd855c41b4cf3fb53dbf8adbe187c62dfe956e`. Under `.local-data/ring-followup/departure/interval-jets/`, `known.json` is `d14b9c932d73d71cf971afcdefde14eaa59c45b1252e0be77998ef6dd78827b6` and `target.json` is `09670f8a7b0593823819a69791f20318de0b70336eaaa5ee5a0710156ac8804d`. They retain exact binary interval endpoints. Final owned run `2d0857cc-277a-4224-b8e0-76d44398b49a` completed with exit zero in 4.685 wall seconds, no stderr and a closed process group by its lease. An earlier controlled target preceded the explicit divisor-rejection check; it is superseded by the final known-first run, rather than used under a changed instrument identity.

```sh
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_departure_followup_jets_20261003.py --stage known
node scripts/dev/owned-compute-supervisor.mjs run --owner-task "$CODEX_SESSION_ID" --owner-thread "$CODEX_THREAD_ID" --deadline-seconds 600 --heartbeat-seconds 15 -- "${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_departure_followup_jets_20261003.py --stage target
```

**Falsifiers:** an invalid inherited exact reference or fast-root interval, failed signed implicit-delay recurrence, non-outward jet primitive, harmonic determinant containing zero, or a separately enclosed exact coefficient outside these binary intervals defeats the affected claim. Look in the target's coefficient and residual binary fields, rather than its decimal displays. The ongoing departure continuation must prove a larger analytic domain and complete real-history chart before using a polynomial there. No frozen prior subject/oracle, shared index, queue, manuscript, log, rank, score, qualification, response law or production solver was changed.
