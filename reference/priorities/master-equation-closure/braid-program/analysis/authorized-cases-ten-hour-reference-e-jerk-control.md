# Independent moving-root jerk control

**Derived control, before propagation target use.** Supplement the [Cartesian reference](authorized-cases-ten-hour-reference-e-cartesian-propagation.md) with a source whose sampled position, velocity and acceleration vanish, but whose jerk is $j_0e_2$. A local source polynomial is $X_s(s)=j_0s^3e_2/6$. At reception $T=R$, take current receiver position $Re_1$ and velocity zero. The exact root is $S=0$, $n=e_1$, $D=1$ and $E=e_1/R^2$. The implicit position variation satisfies $\dot S=-h_1$, hence $\dot a=-j_0h_1e_2$. The transverse acceleration part of E contributes $-\dot a/R$, so

$$
A=\begin{pmatrix}
-2/R^3&0&0\\
j_0/R&1/R^3&0\\
0&0&1/R^3
\end{pmatrix},\qquad S=0.
$$

At $R=2,j_0=1/20$ every entry is rational, including $A_{21}=1/40$. If the source also has acceleration $a_0e_2$, the prior acceleration matrix gains exactly this additional $j_0/R$ in its $(2,1)$ entry. The positive sign tests the composition of the negative root shift with the negative transverse acceleration response. A smooth bounded-speed extension outside the sampled local polynomial interval gives a complete ordinary-root response control. It is not a coupled solution, physical target, or new preparation in Package E. No computation is claimed.
