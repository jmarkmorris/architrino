# Direct independent assessment of the exact-ray witness

**Derived grade: accepted for the stated ray-box relaxation, without another target run.** The [frozen subject](authorized-cases-ten-hour-a-directional-ray-witness-specification.md), SHA-256 `0146a5e912442a8e3c82caa988dd752c86f0cc86a1602ef300b95bc127503b06`, selects its candidate after inspection of the accepted original ray intervals. That adaptive provenance is disclosed and does not change the exact containment obligation. The earlier [Cartesian-box adjudication](authorized-cases-ten-hour-reference-a-box-adjudication.md) binds and checks the original accepted cell and both physical witness slacks.

Direct inspection of `originalE.physical.clock.n` and `.AX` in that bound cell gives the following exact closed intervals. Every displayed endpoint is its recorded rational decimal, not a rounded estimate used for comparison.

| Entry | Lower endpoint | Candidate | Upper endpoint |
| --- | --- | --- | --- |
| $n_x$ | −0.838890391979120575644327 | −4/5 | −0.681895623890276926268037 |
| $n_y$ | 0.544300386041675918417187 | 3/5 | 0.731449491160729423914137 |
| $N_{11}$ | −0.095318991491101193652268 | 0 | 0.771341756346081790017631 |
| $N_{12}$ | 0.095343127999597717826656 | 1/10 | 0.541899436713389418202075 |
| $N_{21}$ | −0.113266369682467298030804 | 0 | 0.935591863369957095269303 |
| $N_{22}$ | −0.354433864707436484684452 | 0 | 0.256635797913350421593649 |

Each candidate lies strictly between the listed endpoints. The ray has unit norm because $16/25+9/25=1$. Independently of matrix multiplication code, the conjugated matrix is the outer product $C=n(Jn)^{\mathsf T}/10$, since the ray matrix has only its upper-right entry nonzero. Thus

$$
C=\begin{pmatrix}6/125&8/125\\-9/250&-6/125\end{pmatrix},\qquad Cn=0,\qquad C^2=0,
$$

because $(Jn)\cdot n=0$. The initial velocity $V_0n$ belongs to the scalar initial velocity ball. Choosing zero initial position and zero additive discrepancy gives $\xi(t)=(t-L)V_0n$, $\eta(t)=V_0n$, with norms $(t-L)V_0$ and $V_0$. The exact strict slacks are those already independently checked in `reference/box-witness-independent-v1.json`; direction does not change either norm.

The witness therefore survives retention of exact unit length and orthogonal conjugation, even though the zero matrix is excluded from the original ray-entry box. It still discards joint dependence among the ray, source jets, matrix entries and time. No claim is made that the selected original E history realizes C or the witness. A physically constrained set may exclude it. Merely preserving orthogonal conjugation while retaining these independent intervals cannot do so.

No new instrument or target was needed: the conclusion uses the bound cell's six exact intervals, the independently checked earlier slacks and the displayed outer-product identity. There is no new evolution endpoint or physical fate. Incorrect entry identity, failed containment, loss of an initial-ball premise or application to an unrelaxed physical set would falsify the corresponding claim. All reference compute remains closed.
