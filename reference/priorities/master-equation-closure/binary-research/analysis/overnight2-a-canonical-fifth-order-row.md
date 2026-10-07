# Formal fifth-order canonical response on a generated comparison window

**Measured exact-symbolic coefficients, pending an independent derivation and an actual-history remainder.** The [bounded method](overnight2-a-canonical-fifth-order-method.md) and its [instrument](../evidence/overnight2-a-canonical-fifth-order.py) produced the degree-four and degree-five polynomials below after known controls passed. This is formal algebra about one source response. It does not evolve a physical trajectory, replace the original complete past, or decide the nominal pair's entry or fate.

Use the method's $\alpha=\epsilon/h$, $P=hp$, $Q=h^2/r$ and fixed receiving axes. The dimensionless row $r^2A$ is

$$
\begin{aligned}
r^2A_r={}&-1-\alpha P+\frac{\alpha^2Q^2}{2}
+\frac43\alpha^3PQ\\
&+\frac{\alpha^4Q}{24}(64P^2+3Q^3-64Q^2+24Q)\\
&+\frac{\alpha^5PQ}{15}(44P^2-196Q^2+57Q)+O(\alpha^6),
\end{aligned}
$$
$$
\begin{aligned}
r^2A_t={}&\alpha Q+\alpha^2PQ-\frac53\alpha^3Q^2\\
&+\frac{\alpha^4PQ^2}{6}(3Q-38)\\
&-\frac{\alpha^5Q^2}{30}(284P^2-121Q^2-18Q)+O(\alpha^6).
\end{aligned}
\tag{1}
$$

The $O$ symbols are formal placeholders. The transverse coefficients retain $Q$, but that fact alone supplies no bound on the transverse actual-history remainder. Degree three agrees with the independently accepted cubic response by a recorded control. The new degree-four and degree-five coefficients have not yet received a separate derivation.

The calculation recursively integrates the analytic cubic comparison field in the scaled backward variable, solves the same implicit norm equation for $L$ coefficient by coefficient, and evaluates the delayed velocity in the transmitter denominator. Its resulting clock coefficients are

$$
\begin{aligned}
L={}&1-\alpha P+\frac{\alpha^2}{2}(2P^2+Q^2-2Q)
-\frac{\alpha^3P}{3}(3P^2+3Q^2-2Q)\\
&+\frac{\alpha^4}{24}(24P^4+36P^2Q^2-24P^2Q+9Q^4-8Q^3+16Q^2)\\
&-\frac{\alpha^5P}{15}(15P^4+30P^2Q^2-12P^2Q+15Q^4-42Q^3-16Q^2)
+O(\alpha^6).
\end{aligned}
$$

The transmitter polynomial is

$$
\begin{aligned}
D={}&1+\alpha P-\alpha^2Q(Q-2)
-\frac{\alpha^3PQ}{2}(Q-8)\\
&+\frac{2\alpha^4Q}{3}(6P^2-5Q^2+4Q)\\
&+\frac{\alpha^5PQ}{24}(96P^2-3Q^3-360Q^2+160Q)
+O(\alpha^6).
\end{aligned}
$$

All polynomials arise from exact SymPy arithmetic. Exact arithmetic establishes the calculation's algebraic output, not independent correctness of the mathematical source map. The controls separately test constant-acceleration source integration, the closed affine response through degree five and the previously independently derived generated cubic.

## Receipts and next proof burden

The known pass at 05:38:45 UTC preceded the target at 05:39:09 UTC. The frozen producer identity is `6fdffdb810085f4d9f3765065c1353b04c47ab22ca2d6a18c805e1f039288708`. The target receipt is retained at `.local-data/master-equation-closure/overnight2-a/canonical-fifth-target.json`, with supervisor lease `67dac682-8288-4537-bc85-f354e3138583`, `processGroupClosed: true`, target time 1.3251 seconds and Darwin peak resident memory 67,846,144 bytes. The known target used 0.2193 seconds and 64,094,208 bytes; the supervisor times are .478 and 1.577 seconds respectively. No process survives either run.

Before physical use, independently derive (1), prove a uniform actual-history remainder on complete generated windows, retain the original release interval, and quantify the existing nominal/spatial forcing. The accepted cubic result does not automatically supply these higher-order bounds. A local comparison theorem may avoid differentiating an actual residual, but its evaluated constants and Taylor enclosure remain separate obligations.

Falsifiers are a wrong fixed-coordinate form of the cubic auxiliary field, incorrect source-path integration, omission of the displaced clock or sampled velocity, a failed independent coefficient derivation, or a remainder bound that loses its required angular factor. The [main A report](overnight2-a-followup-and-research-2026-10-07.md) owns integration. Original receipts, failed pre-spawn supervisor attempt and frozen lower-order subjects remain preserved.
