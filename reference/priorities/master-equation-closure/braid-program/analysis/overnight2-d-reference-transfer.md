# Transferring an admitted history between comparison references

## Purpose and status

The current [delayed admission](overnight2-d-delayed-admission.md) uses an improved increment-defined reference. The retained conditional tail neighborhood uses its own earlier reference and velocity convention. Success around the improved reference cannot silently become membership around the retained one. This note derives a sufficient transfer of the same actual trajectory between two comparison descriptions, over every history interval that a later argument may query.

The [independent theorem review](overnight2-d-reference-transfer-independent-review.md) accepts this conditional transfer argument, and the [independent implementation review](overnight2-d-reference-transfer-application-independent-review.md) accepts the prepared instrument under its stated accepted-history input contract. The [completed output review](overnight2-d-reference-transfer-output-independent-review.md) accepts transfer to the retained tail reference over the already admitted interval through time 14.713681572972876, with uniform position error at most $8.261492634886502\times10^{-8}$ and raw-velocity error at most $1.1597418249895204\times10^{-8}$. No later reference admission or tail entry is claimed. The original eight-member preparation, prescribed history, kick and selected ceiling remain unchanged. Units are $c_f=1$. The transfer changes an error description, not the physical state or its history.

## Pointwise weighted transfer

For the same actual position and velocity $(X,V)$, let reference $A$ have position $Q_A$, feasible velocity $W_A$ and positive weight $\alpha_A$. Let reference $B$ have corresponding $Q_B,W_B,\alpha_B$. Suppose a previously accepted bound controls

$$
Y_A=\left(\alpha_A^2|X-Q_A|^2+|V-W_A|^2\right)^{1/2}\le E_A.
$$

Define the six-dimensional discrepancy and scale factor by

$$
\Delta=\begin{pmatrix}\alpha_B(Q_A-Q_B)\\W_A-W_B\end{pmatrix},
\qquad
\kappa=\max\left(1,\frac{\alpha_B}{\alpha_A}\right).
$$

The exact identity between weighted error vectors is

$$
\begin{pmatrix}\alpha_B(X-Q_B)\\V-W_B\end{pmatrix}
=\begin{pmatrix}(\alpha_B/\alpha_A)I&0\\0&I\end{pmatrix}
\begin{pmatrix}\alpha_A(X-Q_A)\\V-W_A\end{pmatrix}+\Delta.
$$

The block diagonal matrix has Euclidean operator norm $\kappa$. Hence

$$
Y_B\le\kappa E_A+|\Delta|.
$$

For equal weights this is simply the old accepted allowance plus the complete reference discrepancy in the same weighted norm. For a smaller new position weight, $\kappa=1$; position recovery must still divide by that smaller weight. The inequality uses the same actual state on both sides and supplies no new existence statement.

If both feasible velocities are exact Euclidean projections onto $\mathcal B=\{v:|v|\le1\}$ of the position derivatives, $W_A=\Pi_{\mathcal B}(Q_A')$ and $W_B=\Pi_{\mathcal B}(Q_B')$, nonexpansiveness gives

$$
|W_A-W_B|\le|Q_A'-Q_B'|.
$$

This also applies to the current strictly interior reference, for which $W_A=Q_A'$. Therefore complete polynomial bounds on position and derivative differences can supply a transfer without resolving every projection crossing of the other reference. If its later tail condition compares actual velocity to $Q_B'$ rather than $W_B$, that later condition separately pays $|Q_B'-W_B|$. Alternatively a direct bound relative to $Q_B'$ can be carried alongside the feasible-velocity error, with its own explicitly stated meaning.

## Complete past coverage is essential

A future delayed acceleration can query any source time in its verified root brackets. The transfer must consequently hold on every part of the admitted past that those brackets can reach. An endpoint transfer alone gives no bound on errors at an earlier source time. Merely replacing the reference after a switching time would instead create a spliced comparison and require its continuity, derivative traces, root census and defects to be established separately.

A direct route is to retain the globally defined reference $B$ on the full past and transfer all already admitted history into its error description. The actual trajectory and its accepted existence remain the same. The old reference $A$ and its receipts remain preserved as the evidence behind the transferred bounds. Nothing is retroactively relabeled.

On an interval $J$, suppose complete bounds give $E_A(t)\le\bar E_A$, $\kappa(t)\le\bar\kappa$ and $|\Delta(t)|\le\bar\Delta$ for every $t\in J$. Then $\bar\kappa\bar E_A+\bar\Delta$ is a valid interval allowance for $Y_B$. A consumer requiring nondecreasing envelopes may take the running maximum of these bounds. This can enlarge the allowance but cannot omit an earlier larger value. Every genuine comparison-velocity jump requires both traces; a known shared negative branch may use zero discrepancy only after the two mathematical definitions and parameter bindings are matched exactly.

For two piecewise polynomial position references, partition at the union of their breakpoints and the accepted envelope's breakpoints. Enclose their exact difference on each common interval, using the declared encoded-node and coefficient definitions rather than an unverified rounded cache. The increment-defined reference's exact initial-plus-increment nodes and the tail reference's independently certified Hermite definition must each retain their own provenance. Midpoint comparisons or agreement at common nodes do not control the interval interiors.

## Later obligations do not transfer automatically

The triangle bound establishes closeness to reference $B$ over the covered history. It does not establish completeness or uniqueness of the roots formed from $Q_B$, positivity of its acceleration denominators, derivative bounds for $W_B$, its residual, or an ordinary continuation beyond the accepted endpoint. Those belong to a new application using $B$ and its transferred history bounds. In particular, feasible $W_B$ does not imply unit-speed $Q_B$; the [integrated-defect root exclusion](overnight2-d-feasible-proxy-root-exclusion.md) remains a conditional route for that separate question.

Likewise, an accepted endpoint [birth-nonreturn margin](overnight2-d-birth-nonreturn-application.md) is a property of the actual trajectory. It does not by itself show that all auxiliary roots of a new comparison use positive source time. Tail entry still requires its complete position and velocity allowances on every required old-source interval and its separate endpoint-center condition.

## Prepared polynomial application

The new [interval transfer instrument](overnight2-d-reference-transfer.py) consumes a complete independently accepted `mesh-reference-t67` admission and the exact positive-time cubic-Hermite reference in `b1-s1-tail-search-h600.npz`. The latter file and its metadata must match the input identities in the accepted seed-1 tail interval receipt. The comparison's negative branch is explicitly defined to be the same exact joined rigid branch as the mesh reference. Matching encoded initial positions and the unchanged literal preparation make this definition continuous and give zero negative-time reference discrepancy; the actual negative-history initialization error remains inherited. This choice does not alter any positive-time Hermite segment used by the tail certificate.

The application partitions $[0,T]$ at the union of both stored time grids, including the accepted endpoint. Each common interval belongs to one mesh cell and one retained Hermite cell. It reconstructs the mesh's degree-seven power coefficients using exact-increment node enclosures and the factored correction coefficients, and the tail reference's degree-three coefficients using its encoded endpoint positions and velocities. Derivative coefficients are formed from these complete finite polynomials before restriction to a common interval. No uniform approximation remainder is differentiated.

For an affine substitution $q=a+bz$, a power polynomial with coefficients $c_m$ has new coefficient

$$
d_k=\sum_{m=k}^n\binom{m}{k}c_m a^{m-k}b^k.
$$

On $0\le z\le1$, the corresponding Bernstein coefficients are

$$
\beta_j=\sum_{k=0}^j\frac{\binom jk}{\binom nk}d_k,
\qquad
p(z)=\sum_{j=0}^n\beta_j\binom nj z^j(1-z)^{n-j}.
$$

The basis functions are nonnegative and sum to one, so componentwise minima and maxima of outward coefficient intervals enclose the whole polynomial. The instrument applies this to the difference polynomials, retaining cancellation before bounding their position and derivative norms. This is a finite-polynomial enclosure, not a comparison at selected nodes. Zero padding permits subtraction of polynomials of different degrees.

For each member and common interval, the accepted mesh cell's complete envelope $E_A$ gives the transferred weighted allowance $E_A+(\alpha^2D_x^2+D_v^2)^{1/2}$, where $D_x,D_v$ bound the reference position and derivative differences. It also records the direct physical bounds $E_A/\alpha+D_x$ and $E_A+D_v$ relative to the tail reference's position and raw derivative. The latter is valid because the accepted mesh reference is strictly feasible, so its comparison velocity equals its derivative. Every operation is outward rounded. A completed output still requires independent application adjudication.

Before target use, the shared-venv controls passed the restricted cubic $q^3$ on $[1/4,3/4]$, whose Bernstein controls are $1,3,9,27$ divided by 64; the actual mesh encoding of $t^5$; independent $t^5-t^3$ position and derivative values; complete common-grid partitioning and invalid-grid rejection; and a weighted Euclidean discrepancy. A subsequent control also exercises the actual restricted-pair dispatch. No scientific reference data were evaluated by those controls. The prepared runner has a wall cap, measured 512 MiB RSS cap and 64 MiB partial-evidence cap, and retains all input identities for closing checks.

## Exact controls and falsifiers

For identical references and weights, $\Delta=0$, $\kappa=1$, and the old bound is retained exactly. For a pure position error $e$ with zero velocity error and identical reference centers, changing $\alpha_A=1$ to $\alpha_B=2$ gives $Y_A=|e|$, $Y_B=2|e|$, attaining the scale factor 2. For a pure velocity error with the position weight decreased, the factor 1 is attained. A collinear reference shift in the same direction as an actual position error attains the triangle bound, so the discrepancy cannot generally be omitted.

Endpoint agreement does not suffice: take $Q_A(t)=0$ and $Q_B(t)=t^2(1-t)^2e_1$ on $[0,1]$. Both positions and derivatives agree at the endpoints, while the position discrepancy at $t=1/2$ is $1/16$. A delayed source at that interior time sees the missing discrepancy. These are exact comparison controls, not alternate physical preparations.

An error pair violating the block identity or its norm inequality would refute the transfer theorem. A target transfer fails if it misses an interval, velocity trace, weight change or reference-definition discrepancy, or if its prior trajectory input lacks independent acceptance. No numerical application has yet been performed.
