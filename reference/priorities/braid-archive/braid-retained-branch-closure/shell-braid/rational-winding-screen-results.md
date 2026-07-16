# Rational-Winding Screen Results

Promotion status: `priority-only`. This packet checks whether the unequal lengths in [intrinsic-m2-refined-solve-results.md](intrinsic-m2-refined-solve-results.md) should be read as evidence for a distinct rational-winding branch family, as defined in [period-closure-and-winding-targets.md](period-closure-and-winding-targets.md). The result is negative for the current refined $M=2$ exact-antipodal candidate.

No branch is retained.

---

## 1. Input Lengths

The refined $M=2$ candidate had binary lengths

$$
(L_1,L_2,L_3)
\approx
(9.1113549620,\ 9.0630143825,\ 9.1400781880).
$$

The ratios were

$$
\frac{L_2}{L_1}\approx0.9946944686,
$$

$$
\frac{L_3}{L_1}\approx1.0031524648,
$$

and

$$
\frac{L_3}{L_2}\approx1.0085031097.
$$

These numbers are close to $1$, but the equal-period spread is still

$$
\Delta L_{\max}\approx0.0770638055R.
$$

The question is whether this spread is better interpreted as a nontrivial integer winding row

$$
m_aL_a=L_{\mathrm{com}},
\qquad
m_a\in\mathbb{N},
$$

rather than as a correctable equal-period defect.

---

## 2. Low-Integer Search

Primitive triples

$$
(m_1,m_2,m_3)\in\{1,\ldots,6\}^3
$$

were scored by the spread of

$$
(m_1L_1,\ m_2L_2,\ m_3L_3).
$$

The best rows were:

| Winding triple | Common-length spread | Relative spread |
| --- | ---: | ---: |
| $(1,1,1)$ | $0.0770638055$ | $0.0084640708$ |
| $(6,6,5)$ | $8.9677388320$ | $0.1738533530$ |
| $(5,6,6)$ | $9.2836943180$ | $0.1799452336$ |
| $(5,6,5)$ | $8.8213114850$ | $0.1817137958$ |
| $(6,5,6)$ | $9.5253972155$ | $0.1845724978$ |

The all-one row is the best low-integer row by a large margin. Every nontrivial primitive winding in this range is worse by roughly two orders of magnitude in absolute common-length spread.

Pairwise rational approximation with numerator and denominator at most $6$ also chooses $1/1$ in every case:

| Ratio | Best denominator-$6$ rational | Absolute error |
| --- | --- | ---: |
| $L_2/L_1$ | $1/1$ | $0.0053055314$ |
| $L_3/L_1$ | $1/1$ | $0.0031524648$ |
| $L_3/L_2$ | $1/1$ | $0.0085031097$ |

---

## 3. Interpretation

The current unequal lengths do not support a nontrivial rational-winding branch. They support the opposite conclusion: the refined candidate is near the equal-period class, and the observed length spread is a solver defect that the small projection in [equal-period-projection-results.md](equal-period-projection-results.md) can mostly remove.

Therefore the next dynamics search should stay in the equal-period chart unless a later solve produces stable ratios close to a nontrivial integer triple under refinement.

The rational-winding row remains a valid branch family, but it is not activated by the present $M=2$ data. A future rational-winding claim must report:

1. stable low-integer winding data under mesh refinement;
2. active-root ledgers recomputed over the common period;
3. event/action and return-map rows over the same common period;
4. a comparison against the equal-period projection route.

Failure/status codes:

$$
\texttt{winding-row-unsupported},
\qquad
\texttt{equal-period-preferred},
\qquad
\texttt{not-retained}.
$$
