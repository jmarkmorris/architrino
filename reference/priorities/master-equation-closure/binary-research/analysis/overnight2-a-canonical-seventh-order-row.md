# Formal seventh-order canonical source response

**Measured exact-symbolic output, independent derivation pending.** The [bounded seventh-order method](overnight2-a-seventh-order-method.md) passed its known controls before evaluating the new coefficients below. The [instrument](../evidence/overnight2-a-canonical-seventh-order.py) evaluates the analytic fifth-order comparison field, its implicit source root and its sampled velocity. It is not a physical evolution, and the new coefficients have no actual-history remainder attached here.

In the established notation $\alpha=\epsilon/h$, $P=hp$, $Q=h^2/r$, retain the independently established degree-zero through degree-five terms from the [fifth-order row](overnight2-a-canonical-fifth-order-row.md). The new coefficients of $r^2A_r$ are

$$
a_{r,6}=\frac{Q}{720}\left(2304P^4-25632P^2Q^2+3408P^2Q
+45Q^5+6240Q^4-672Q^3-224Q^2\right),
$$
$$
a_{r,7}=\frac{PQ}{630}\left(2088P^4-46728P^2Q^2+762P^2Q
+40329Q^4+10758Q^3-7832Q^2\right).
$$

The new coefficients of $r^2A_t$ are

$$
a_{t,6}=-\frac{PQ^2}{120}\left(1200P^2-45Q^3-2392Q^2-1248Q\right),
$$
$$
a_{t,7}=-\frac{Q^2}{2520}\left(26352P^4-149400P^2Q^2-107256P^2Q
+28683Q^4+35880Q^3-13928Q^2\right).
\tag{1}
$$

These multiply $\alpha^6$ and $\alpha^7$. Their factors and polynomial degree are useful algebraic diagnostics, not a proof of their correctness or a bound on the omitted terms. The retained receipt also gives all clock and transmitter coefficients, so an independent calculation can test the complete source map rather than matching only the final response.

Known mode completed at 05:58:08 UTC under lease `6989181a-e73d-4131-b0e3-271fb7352e5a`, before target launch. It passed the affine degree-seven response, fifth-order pointwise-field coefficients and quarter-turn covariance, and generated fifth-order response. Target mode ran at 05:58:34 UTC under lease `2e238d58-0756-4af9-bbeb-cd62c133c87e`; its supervisor heartbeat advanced and its process group closed successfully. The target instrument measured 16.4783 seconds and 78,512,128 peak resident bytes on Darwin; supervisor elapsed time was 16.731 seconds. The known instrument measured 3.3154 seconds and 70,893,568 bytes. No scientific process remains from these runs.

The producer is `9987dd821fe10c7120202619abd5afaa6d15a3b58182f365229b3a61daaf4d56`, and the frozen reused series engine is `6fdffdb810085f4d9f3765065c1353b04c47ab22ca2d6a18c805e1f039288708`. Both identities are checked by the instrument's retained receipt, with the dependency checked before import. The original receipts remain `.local-data/master-equation-closure/overnight2-a/canonical-seventh-known.json` and `canonical-seventh-target.json`; supervisor output and progress are retained separately. Reuse of the same engine is implementation reuse, not independent evidence.

The next obligations are a separate coefficient derivation, a uniform analytic comparison remainder, and actual complete-window transfer with the required transverse factor. A later accumulated phase estimate must include the original early history and the actual nominal forcing. No preparation, source clause, speed domain, root/self treatment, coefficient or physical law has changed. Equation (1) cannot serve as a substitute production acceleration law. The [main A report](overnight2-a-followup-and-research-2026-10-07.md) owns the current disposition and deciding question.
