# Blind full-Cartesian transverse error reference

**Derived before disclosure of a new common-frame subject.** Keep the original Section 7 E mirror pair, comparison, complete compatible past and transverse coordinate already assessed. This is a mathematical comparison representation. No physical frame change, new source or endpoint is selected.

Choose the comparison receiving polar frame $O_c(t)$ and express both actual and prescribed Cartesian differences in that same orthonormal frame. Put $\xi=O_c^{\mathsf T}(x_a-x_c)$, $z=O_c^{\mathsf T}(p_a-p_c)$ and use $J=\left(\begin{smallmatrix}0&1\\-1&0\end{smallmatrix}\right)$. Then the derivative of either difference gains $\omega_cJ$ times that difference. This differs from separately rotating the actual receiving ray: the position difference has two components and there is no actual/comparison angular-rate difference multiplying $p_c$.

At a fixed reception, apply one constant $O_c^{\mathsf T}$ to both entire source histories. The original Cartesian source-error norms are unchanged by that common rotation. They require no additional $\eta R_s$ or $\eta V_s$ allowance. Source derivatives still use the original physical velocities and accelerations rotated by this constant matrix; one must not differentiate the assembled rotating source curve as a physical history.

Use the physical-u telescoping order already proved: source replacement at actual receiver, receiving-position interpolation at fixed actual u with nominal source, and receiving-u interpolation at fixed nominal receiver/source. The two-component position difference now gives full $2\times2$ averaged matrices $B_q,B_H$:

$$
\delta q=B_q\xi+A\delta u+f_q,\qquad
\delta H=B_H\xi+U\delta u+f_H.
$$

The last bracket has one fixed nominal ray, so $A=\alpha tn^{\mathsf T}$, $A^2=0$ and $E=I-A$ exactly. Therefore

$$
\delta u=-EB_q\xi+Ez-Ef_q,
\qquad
\delta H=(B_H-UEB_q)\xi+UEz+f_H-UEf_q.
$$

The common-frame four-dimensional system is consequently

$$
\binom{\xi}{z}'=
\begin{pmatrix}
-EB_q+\omega_cJ&E\\
B_H-UEB_q&UE+\omega_cJ
\end{pmatrix}
\binom{\xi}{z}
+\binom{-Ef_q}{f_H-UEf_q}.
\tag{1}
$$

All averages can vary independently within their complete family bounds except for the proved fixed-ray structure of A. In particular one cannot combine separately sampled matrices as if they were one mean-value point. The original-E comparison residual enters $f_H$ multiplied by $I+q_{u,c}$ with its proper sign; no residual is asserted unchanged.

For a fixed positive metric $Y=(\nu\xi,z)$, the unrotated part of the transformed matrix is

$$
M_\nu=\begin{pmatrix}
-EB_q&\nu E\\
(B_H-UEB_q)/\nu&UE
\end{pmatrix}.
$$

Both comparison-frame rotation blocks are skew because each two-component block has equal weight. Thus a complete bound $\lambda_{\max}[(M_\nu+M_\nu^{\mathsf T})/2]\le\mu$ yields the usual scalar variation-of-constants enclosure with forcing $(-\nu Ef_q,f_H-UEf_q)$. For a rational symmetric four-by-four upper certificate, all fifteen nonempty principal minors of $\mu I-S$ being nonnegative is a sufficient exact positive-semidefinite test. A point eigenvalue or only the four leading principal minors is not sufficient for an arbitrary semidefinite matrix. An alternative interval or completed-square certificate must prove the same uniform condition.

The physical velocity error is bounded through $-EB_q\xi+Ez-Ef_q$, not by the transformed norm alone. Original E reconstructs physical acceleration with all delayed source-A inputs and the original defect. Complete original Cartesian X/V/A bounds can supply both the inherited and newly constructed source inventories without an angular primitive because every pointwise source comparison uses the common rotation. The comparison frame's own angular speed must be bounded on the receiving interval, even though its skew contribution does not enlarge the Euclidean logarithmic norm.

At the old endpoint, $|\xi|\le e_X$ and $|\delta u|\le e_V$. An independently bounded q difference gives the sufficient initializer $|Y|\le\sqrt{\nu^2e_X^2+(e_V+|\delta q|)^2}$. The position family must cover the full Cartesian error disk/box, not just the old radial segment. It may be wider geometrically even while avoiding the previous source-rotation inflation. No numerical improvement follows until complete source/position/u charts, initialization and a fixed physical trial are certified. Changing metric between cells also requires an explicit norm transfer.

Known controls are a stationary source where $q=0$, and two identical trajectories viewed in a rotating frame, where both errors remain zero. For arbitrary nonzero constant Cartesian errors under zero Cartesian error dynamics, the frame alone produces precisely the two skew blocks in (1), preserving the norm. Falsifiers are an omitted frame derivative, an extra intrinsic angular-rate term, a radial-only position family used for a two-component error, a lost $UEf_q$, an unproved fixed-ray average, or omission of original-E source acceleration. No new subject or target was read or run for this reference; no owned computation is active.
