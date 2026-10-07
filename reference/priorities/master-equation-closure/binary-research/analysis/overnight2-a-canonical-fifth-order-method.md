# A bounded fifth-order formal canonical source calculation

**Status: formal method only, before new target use.** The [accepted cubic row](overnight2-a-canonical-cubic-assessment.md) has an actual generated-window fourth-order discrepancy. The [short source-comparison method](overnight2-a-local-ode-source-comparison.md) suggests that using this cubic local field as an auxiliary source path can gain two orders in the evaluated response. Its fifth-order polynomial is therefore a useful next mathematical reference, but its uniform actual remainder and nominal-history transfer are not yet proved.

This calculation preserves the canonical inverse-square law, source coefficient, complete source definitions and $c_f=1$. It generates no physical trajectory, supplied history or new solver. It evaluates an analytic local comparison response once in formal power series. The original nominal pair's actual entry sign remains the scientific target.

Fix current radius $r$, angular magnitude $h$, $\alpha=\epsilon/h$, $P=hp$, $Q=h^2/r$ and dimensionless backward position $y(\tau)=Y(s+rh\tau)/r$. Its initial data are $y(0)=(1,0)$ and $y'(0)=(P,Q)$. For a comparison position $y$ write $\rho=|y|$, $n=y/\rho$, $p=n\cdot w$ and $v=w-pn$. The cubic local comparison field is

$$
F_3(y,w)=Q\left[
-\frac n{\rho^2}
+\frac\alpha{\rho^2}(w-2pn)
+\frac{\alpha^2}{\rho^2}\left(\frac{|v|^2}{2}n+pv\right)
+\frac{\alpha^3Q}{3\rho^3}(4pn-5v)
\right].
$$

This is the already derived physical cubic polynomial expressed in fixed rescaled coordinates, not a different acceleration law assigned to the actual path. The extra $Q$ in its cubic term follows from $h^2/r=Q$ and must be retained.

Put $\tau=\alpha\xi$. Recursively integrate the coefficients of $y_{\xi\xi}=\alpha^2F_3(y,y_\xi/\alpha)$ from the common terminal data. Through order five, the degree-three comparison field suffices. The delayed source has $\xi=-2L$, where the same implicit norm equation determines $L=|n_0+y(-2\alpha L)|/2$. The evaluated row is $-4S/(|S|^3D)$ with $S=n_0+y(-2\alpha L)$ and $D=1+\alpha\widehat S\cdot w(-2\alpha L)$.

Before this degree-five target, the instrument must pass exact polynomial controls, constant-acceleration source-path integration, the closed affine-source response through degree five, and the independently known generated cubic row using a separately bounded degree-three invocation. The affine radial coefficients are $-1,-P,Q^2/2,0,Q^4/8,0$; the transverse coefficients are $0,Q,PQ,0,PQ^3/2,0$. The generated degree-three coefficients must agree with the frozen analytical row. These are controls before discovery of the new degree-four and degree-five target, not fixtures produced from those new outputs.

The instrument uses the shared Python venv and exact SymPy polynomials, with one numerical thread, a 90-second internal wall budget, 512 MiB cooperative resident-memory ceiling, 1 MiB output ceiling, advancing coefficient progress and a 120-second supervisor deadline. It is a small symbolic pilot. A budget failure is a method outcome; it does not authorize a larger run. Freeze the instrument after its known pass, preserve all failures, and retain source identities and both receipts. Separate derivation is required before using the new coefficients as premises, and a full remainder proof is required before physical application. The [main A report](overnight2-a-followup-and-research-2026-10-07.md) receives its result and limits.

**Known-first receipt, 05:38:45 UTC, before degree-five target.** The [exact symbolic instrument](../evidence/overnight2-a-canonical-fifth-order.py) passed polynomial arithmetic, constant-acceleration path integration, the complete affine row through degree five and the independently derived generated cubic coefficients. The successful supervisor lease is `0b974ca8-4457-47c9-b462-fe54b647300e`, with closed process group and elapsed supervisor time .478 seconds. Its receipt is retained at `.local-data/master-equation-closure/overnight2-a/canonical-fifth-known.json`. The first supervisor attempt was refused by the sandbox's loopback restriction before target spawn; the authorized native supervisor retry completed. No degree-five generated target preceded the controls, and the instrument is now frozen for that target.
