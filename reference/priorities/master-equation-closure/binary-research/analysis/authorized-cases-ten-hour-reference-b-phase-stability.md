# Blind reference for accumulated phase stability

Frozen before access to the coordinator's phase-stability candidate. Claim grade: derived conditional comparison estimate, not an actual terminal phase. Use the independently admitted finite normal coordinates with complex state $Q=a e^{i\psi}$ and parameter $\delta>0$, on an actual admitted chart. Suppose the comparison rows are

$$
 a'=a\Lambda(\delta,a^2),\qquad
 (\log\delta)'=B(\delta,a^2),\qquad
 \psi'=\Omega(\delta,a^2),
$$

where prime denotes physical polar angle, $\Lambda=2\delta^3+O(C\delta^4)$, $B=-4\delta^3/3+O(C\delta^4)$ and $\Omega=1+\delta^2/2+O(C\delta^4)$. The finite scalar coefficient norms are bounded by $C=2^{4096}$. The actual complex-state and logarithmic-parameter rows differ by at most $M\delta^{17}$, $M=2^{175000}$. These hypotheses are conditional on the finite audit and the accepted actual value chart; they impose no new source smoothness.

Take an initial amplitude between fixed positive multiples of $\varepsilon^3$, an initial parameter between fixed positive multiples of $\varepsilon$, and compare until a fixed positive amplitude of order one. Constants below may depend on those fixed multiples and endpoint, never on $\varepsilon$. An original physical state error $O(K_0\varepsilon^{14})$ gives an initial relative amplitude error $O(K_0\varepsilon^{11})$. Its angular error is of that same order. The initial parameter's relative error must be checked through the actual coordinate map; it cannot be inferred from a phase claim.

## Common amplitude avoids a long-time Gronwall factor

Use $y=\log a$ as the independent variable. The positive leading amplitude row and $M\delta^{14}/a\ll1$ make this valid. The exact comparison equations become

$$
 \frac{d\log\delta}{dy}=F(\delta,a^2):=\frac B\Lambda
 =-\frac23+O(C\delta),\qquad
 \frac{d\psi}{dy}=G(\delta,a^2):=\frac\Omega\Lambda.
$$

For the actual row, division by $a\Lambda+r_a$ adds errors bounded by

$$
 |e_F|\le C_1M\frac{\delta^{14}}a,
 \qquad
 |e_G|\le C_1M\frac{\delta^{11}}a.
$$

The second estimate includes both the phase defect $\operatorname{Im}(r_Q/Q)$ and the altered amplitude denominator. The latter is essential because the phase row has a nonzero order-zero term. Omitting it would incorrectly improve the bound by three parameter powers.

Both curves obey

$$
 \delta\asymp\varepsilon\left(\frac{a_0}{a}\right)^{2/3},
 \qquad
 |\partial_{\log\delta}F|\le C_2C\delta,
 \qquad
 |\partial_{\log\delta}G|\le C_2\delta^{-3}.
$$

Indeed the integrals of $C\delta$ and $M\delta^{14}/a$ with respect to $y$ are bounded by constant multiples of $C\varepsilon$ and $M\varepsilon^{14}/a_0$. Thus the variational amplification for $F$ is $\exp(O(C\varepsilon))$, bounded independently of the large number of revolutions. It is not the exponential of the elapsed polar angle.

Align the two curves at one common amplitude. Moving across the initial amplitude mismatch costs $O(K_0\varepsilon^{11})$ in $\log\delta$ and $O(K_0\varepsilon^8)$ in phase. At every later common amplitude, scalar comparison therefore gives

$$
 |\Delta\log\delta|\le C_3(K_0+M)\varepsilon^{11}.
$$

The integrated phase discrepancy is bounded by

$$
 C_4(K_0+M)\varepsilon^{11}
 \int_{a_0}^{a_*}\delta^{-3}\,\frac{da}{a}
 +C_4M\int_{a_0}^{a_*}\frac{\delta^{11}}a\,\frac{da}{a}
 +O(K_0\varepsilon^8).
$$

Since $a_0\asymp\varepsilon^3$, the first integral is $O(\varepsilon^{-9})$ and the second is $O(\varepsilon^8)$. Hence

$$
 |\Delta\psi|\le C_5(K_0+M)\varepsilon^2.
$$

This establishes the requested powers. A proposed explicit constant must separately dominate the fixed amplitude/parameter multiples and the elementary derivative and integration constants; a large exponent alone is not its proof.

## Endpoints and limits

The common amplitude section is indispensable. A physical section whose amplitude changes with phase or parameter requires its own transversality and matching estimate. Likewise the initial normal-coordinate state must come from the unchanged degree-five preparation and independently checked layer/map inversion. This reference does not calculate that state, evaluate the huge scalar phase modulo a turn, or classify the terminal branch. Its falsifiers are failure of positive amplitude growth, an initial parameter mismatch exceeding the assumed relative scale, loss of the actual parabolic chart, or an omitted amplitude-denominator contribution in $e_G$.

No computation is used. Only this new blind reference is written; existing references and subject files remain unchanged.
