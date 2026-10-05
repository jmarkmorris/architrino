# Independent adjudication of a smooth tangential preparation

## Verdict

Accepted: the specified raised-cosine tangential acceleration has no transform zero in the open right half-plane. It excites every certified simple common planar growing pole with nonzero tangential numerator. For any fixed finite pulse duration this gives growing linear post-pulse components; slow delivery does not turn this preparation into pure ring-down. The [frozen subject](ring-slow-tangential-drive-2026-10-03.md) correctly distinguishes the input area from a conserved angular-momentum increment and from a finite nonlinear trajectory.

**Grade: derived conditional linear response, independently adjudicated; modal factors independently enclosed at broader integral precision.** The domain is the declared external preparation followed by the unchanged baseline equation, complete exact circular past and ordinary first variation. The certified spatial numerators come from the separately accepted [six-member verifier](ring-symmetric-independent-adjudication-2026-10-03.md) and [other-inventory verifier](ring-inventory-spectrum-independent-adjudication-2026-10-03.md). Unknown complex-root spatial numerators remain unclassified. No nonlinear rung transfer, amplitude threshold, retained evolution, conserved delayed account or physical law adoption follows.

## Independent analytical reconstruction

Let $a=2\pi/L$, and let $f=(\delta V/L)(1-\cos aT)$ on $[0,L]$, zero elsewhere. Its endpoint value and first derivative vanish. Two integrations by parts give $s^2\widehat f(s)=\widehat {f''}(s)$ with no boundary term. Direct integration of $f''=(\delta V/L)a^2\cos aT$ yields

$$
\widehat f(s)=\frac{\delta V}{L}\frac{a^2(1-e^{-sL})}{s(s^2+a^2)}.
$$

The integral itself is entire, so the three displayed exceptional imaginary points are removable. If $\Re s>0$, then $|e^{-sL}|<1$, which excludes numerator cancellation and all denominator exceptions. For real positive roots, positivity also follows directly from the positive weighted pulse integral. A generic positive pulse has no real-positive zero but can have a complex zero; the stronger complex conclusion is specific to this pulse.

The common transfer $A(s)^{-1}e_2\widehat f(s)$ has a nonzero residue at every retained simple positive witness because its separately certified adjugate column and determinant derivative are nonzero. This argument uses the actual forced profile, not a conservation assumption. Multiplying its onset transform by $e^{\lambda L}$ gives the endpoint factor

$$
\Gamma_L=\frac{e^{\lambda L}-1}{\lambda L[1+(\lambda L/2\pi)^2]}.
$$

Its short-pulse limit is one, while its long-pulse limit is $4\pi^2e^{\lambda L}/(\lambda^3L^3)$. Expanding the original integral or the independently reconstructed formula gives the subject's next short-pulse coefficients. The large endpoint growth is a linear infinitesimal-input statement at fixed $L$; any finite amplitude needs a separate chart duration estimate.

Endpoint compatibility is sound: the declared driven equation agrees with the baseline functional at the beginning and end because the external acceleration vanishes there. The driven history during the interval is not represented as an autonomous baseline history. At first order the external angular contribution integrates to $R\delta V$, while delayed baseline acceleration also contributes to $d(X\times V)/dT$. Neither total angular change nor actual velocity change is fixed by the external area alone.

## Direct integral enclosure

The [new checker](../../../../../scripts/braid-program/ring_slow_drive_independent_adjudication_20261003.py) imports no subject transform or response implementation. It encloses the normalized positive integrals

$$
\widehat f(\lambda)/\delta V=\int_0^1e^{-\lambda Lt}(1-\cos2\pi t)\,dt,\qquad
\Gamma_L=\int_0^1e^{\lambda L(1-t)}(1-\cos2\pi t)\,dt
$$

using 1024 outward interval boxes each. An exact affine integral of two and the exact cosine-pulse area of one pass before targets. All sixteen inherited T02/T04 witness-duration combinations have strictly positive direct bounds containing the subject's much narrower factor intervals. This independent construction checks factor scale, sign and the exponential reference time, while its wider bounds do not independently establish all printed digits or recompute the inherited residue vectors.

Owned run `11cd7e29-07ae-4cfe-9701-cfe4b5bebe42` completed in 5.586 wall seconds, exit zero, with a closed process group. Receipts are `.local-data/ring-exploration/slow-drive-adjudication/known.json` and `target.json`. Instrument SHA-256 is `f3769a6b807cbe0ce64f3193dbaba1a9195901b10fd429e486279ad97b4e9dd0`; known receipt is `b35b569d6a7f5b3dcc1d5adf5372c945c8646bf2186845c5c1f571304ef36fd5`; target is `76a61c4ccaf104c42a351f077adf7378bc270222318274a4ce0b5842a9bcd0ca`.

Falsifiers are a failed inherited pole/numerator certificate, a wrong endpoint preparation, a transform zero in the claimed domain, incorrect integral enclosure or wrong time reference in the endpoint factor. A different pulse or a finite nonlinear response is outside the verdict. The frozen subject and its implementation were not changed during this adjudication.
