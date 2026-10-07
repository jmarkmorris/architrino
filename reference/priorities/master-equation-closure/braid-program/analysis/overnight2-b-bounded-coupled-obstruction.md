# A bounded coupled slow-limit period obstruction

## Result being tested

Claim grade: self-derived, pending exact arithmetic completion and independent review. The [independently reconstructed coupled conditions](overnight2-b-independent-coupled-period.md) require the quadratic mean $W_\chi$ of every nondegenerate normalized limiting orbit to vanish. The numerical proposals near height $0.75$ nearly satisfy the separate torque condition but retain a positive quadratic mean. This theorem targets an entire geometric region, without assuming that a numerical shooting zero is exact.

Consider any regular periodic radial/axial solution of the derived normalized limiting equation
$$
\ddot r=\ell^2/r^3+A_r^{(0)}(r,z),\qquad
\ddot z=A_z^{(0)}(r,z),
$$
with the canonical simultaneous accelerations defined in the linked proof. Suppose one radial/axial period $T$ satisfies
$$
1\le r\le6/5,\quad |z/r|\le77/100,\quad |\ell|\le3/20,\quad T\le7,
$$
and during that period
$$
\max z\ge37/50,\qquad \min z\le-37/50.
$$
Then the proposed conclusion is $W_\chi>1/25$. If verified, this excludes every such orbit as the limiting shape of an exact canonical slow family with uniform $C^2$ bounds, appropriate derivative convergence and finite positive $R\epsilon^2$ limit. It does not assert the existence of an orbit satisfying these bounds, prove that a floating proposal lies in them, or supply a numerical finite-speed threshold.

## A total derivative that removes the indefinite radial term

Write $h=z/r$, $u=\dot r$, $v=\dot z$, $w=\ell/r$ and $a_0=19/12$. Introduce the mathematical function
$$
\Phi(r,z)=a_0\log r+f(h),\qquad
f(h)=\frac14\log(1+4h^2)+\frac18\log(1+h^2).
$$
This is a tool for a period identity, not a modification of the acceleration law. Its derivatives are
$$
f'(h)=\frac{2h}{1+4h^2}+\frac{h}{4(1+h^2)},\qquad
f''(h)=S(h)-\frac23,
$$
$$
r\Phi_r=a_0-hf',\quad r\Phi_z=f',\quad
r^2\Phi_{rz}=-f'-hf''=Q(h),
$$
$$
r^2\Phi_{rr}=-a_0+2hf'+h^2f'',\qquad
r^2\Phi_{zz}=f''.
$$
Here $P,Q,C,S$ are the already derived first-order matrix coefficients. Subtracting the Hessian coefficients from the matrix gives
$$
P-r^2\Phi_{rr}=\frac{6h^2}{1+4h^2},\qquad
S-r^2\Phi_{zz}=\frac23,\qquad
C-r\Phi_r=-\frac{6h^2(3+4h^2)}{(1+4h^2)^2}.
$$
The mixed coefficient cancels exactly.

Along a limiting solution,
$$
\ddot\Phi
=\Phi_{rr}u^2+2\Phi_{rz}uv+\Phi_{zz}v^2
+\Phi_r(w^2/r+A_r^{(0)})+\Phi_zA_z^{(0)}.
$$
Its period average is zero. Thus the quadratic diagnostic can be written exactly as
$$
W_\chi=\left\langle
\frac{6h^2u^2}{r^2(1+4h^2)}
+\frac{2v^2}{3r^2}
-\frac{B(h)w^2}{r^2}
+\frac{G(h^2)}{r^3}
\right\rangle_\chi,
$$
where
$$
B(h)=\frac{6h^2(3+4h^2)}{(1+4h^2)^2},
$$
$$
J(x)=\frac{2x}{1+4x}+\frac{x}{4(1+x)},\qquad
G(x)=\frac{J(x)-a_0}{\sqrt3}
+\frac{a_0+3J(x)}{(1+4x)^{3/2}}
+\frac{a_0}{4(1+x)^{3/2}}.
$$
The last expression follows by substituting the simultaneous accelerations into $-\Phi_rA_r^{(0)}-\Phi_zA_z^{(0)}$. It carries the factor $r^{-3}$. The average now contains an explicitly nonnegative radial contribution, a positive axial contribution and one bounded angular subtraction, provided $G$ is nonnegative on the declared height-ratio region.

## Scalar bounds and the continuous arithmetic obligation

For all real $h$,
$$
0\le B(h)\le\frac{27}{16},
$$
because, with $x=h^2$,
$$
\frac{27}{16}-B(h)=\frac{3(4x-3)^2}{16(1+4x)^2}.
$$

The remaining scalar obligation is $G(x)>0$ for $0\le x\le5929/10000$. It is checked continuously by rational interval bounds on 128 equal subintervals, not by point samples. The function $J$ is increasing because
$$
J'(x)=\frac{2}{(1+4x)^2}+\frac1{4(1+x)^2}>0,
$$
and $0\le J(x)<3/4<a_0$. For a subinterval $[l,u]$, a valid rational lower bound is
$$
\frac{J(l)-a_0}{L_3}
+\frac{a_0+3J(l)}{(1+4u)U_{1+4u}}
+\frac{a_0}{4(1+u)U_{1+u}},
$$
where $L_3\le\sqrt3$ and $U_y\ge\sqrt y$ are exact rational outward square-root bounds. The negative first numerator explains why the lower square-root bound is used there. Every other numerator and denominator is positive. Strict positivity of each subinterval bound proves the whole scalar region. The small companion uses integer square roots and fractions, with known controls before this target; its result is not assumed until recorded.

## Axial variation dominates the angular subtraction

The radius and geometric-constant bounds give
$$
\frac{2v^2}{3r^2}\ge\frac{25}{54}v^2,\qquad
\frac{B(h)w^2}{r^2}
=\frac{B(h)\ell^2}{r^4}\le\frac{243}{6400}.
$$
A continuously differentiable periodic height that reaches both stated extrema has total variation at least $4(37/50)$. Applying Cauchy–Schwarz over the period gives
$$
\langle v^2\rangle_\chi
\ge\frac{16(37/50)^2}{T^2}
\ge\frac{16(37/50)^2}{49}.
$$
Once the positive scalar bound on $G$ is verified, discard the nonnegative radial and $G$ terms in the exact identity. This yields
$$
W_\chi\ge
\frac{25}{54}\frac{16(37/50)^2}{49}-\frac{243}{6400}
=\frac{379439}{8467200}>\frac1{25}.
$$
Thus even an orbit satisfying zero leading torque cannot satisfy the quadratic period condition in this geometric region. The proof uses only the normalized limiting equation and periodicity; it does not depend on the simultaneous-turning-point preparation or a Fourier truncation.

## Evidence boundary and falsifiers

The algebra and scalar interval cover are fresh subjects pending independent review. A wrong Hessian identity, sign error in $G$, invalid square-root enclosure, failure of a subinterval lower bound, incorrect axial-variation estimate, or a periodic limiting orbit in the stated region with $W_\chi\le1/25$ defeats the corresponding claim. The conclusion concerns limits with finite positive scale normalization and the stated derivative convergence, not degenerate scale limits or arbitrary finite-speed paths. General coupled orbits outside this region remain open. The receiving account is the second-allocation report; original subject/reference files and other workers' owners remain unchanged.

### Known-first arithmetic record

The shared-venv companion passed exact square-root controls at $4$ and $9/16$, an outward rational enclosure of $\sqrt2$ with independently specified endpoints, $J(0)=0$, $J(1)=21/40$, and the exact circular-limit range $1<G(0)<11/10$. This pass was recorded before the interval-cover target. The subject instrument is frozen at SHA-256 `47f7341086a33ef6f5f81a2f8762d7d8a04446db229e79ade9af1981f7474c38`; its original known receipt remains in `.local-data/master-equation-closure/overnight2-b/bounded-coupled/known.json`. The short synchronous command exited zero in 0.004574 internal seconds and left no background process.

The subsequent exact-rational target passed all 128 continuous subinterval bounds and the final period margin. Its smallest scalar lower bound is a retained positive rational; the full exact fraction is in `bounded-coupled/target.json`. It verified the final margin $379439/8467200>1/25$. Known and target receipt SHA-256 values are `b95c572cb52429a0c0e29a05508bf679ab96590547af3f896111e2d55b70cac8` and `3e8f9e8694f9d19adb53a381fba94f18769d89abbec53e0711771d8b9678dbed`. Target wall time was 0.009183 seconds by `time.perf_counter()`, with synchronous exit zero and no background process. This arithmetic pass verifies the declared scalar cover; independent mathematical adjudication of the complete theorem remains pending. All original receipts and source are retained locally, with no replay or remote-backup claim.
