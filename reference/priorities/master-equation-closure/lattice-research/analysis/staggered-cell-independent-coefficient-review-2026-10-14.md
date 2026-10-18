# Independent review of staggered propagation coefficients

## Exact reference prepared before the peer instrument

**Status: ◐ Partial — analytic references prepared; peer coefficient instrument and physical propagation unreviewed.** This review uses the unchanged causal scalar chart in [the first-event analysis](staggered-lattice-first-event.md), equations (5), (6) and (14)–(16). The fixed ancient branch, $a=2^{-40}$, $c_f=1$, $g=16$ and original infinite stationary grouping remain. The calculation below is an analytic local control, not a replacement population or a physical target calculation. No stability conclusion about the nonstationary branch is made.

At fixed reception time, write $z=m+x-\sigma q(s)$, $r=t-s=\sqrt{p+z^2}$, $n=z/r$ and $D=1-\sigma n w>0$, where $w=q'(s)$ and $a_s=q''(s)$. Differentiate with respect to receiver position $x$, keeping the source history fixed. Implicit differentiation gives

$$
s_x=-\frac nD,\qquad z_x=\frac1D,\qquad
r_x=\frac nD,\qquad n_x=\frac{1-n^2}{rD},\qquad
D_x=-\frac{\sigma w(1-n^2)}{rD}+\frac{\sigma n^2a_s}{D}.
$$

The signed per-source acceleration without $g$ is $K=\sigma n/(r^2D)$. Substitution and collection over the common denominator yield

$$
K_x=\frac{\sigma(1-3n^2)+2n^3w-rn^3a_s}{r^3D^3}
=\sigma J_d,
\qquad
J_d=\frac{1-3n^2+2\sigma n^3w-r\sigma n^3a_s}{r^3D^3}.
$$

Expanding equation (14) over $D^3$ gives this same unsigned $J_d$. Its source-acceleration term is essential. The unsigned kernel's direct source-velocity derivative is $\sigma B_d$, where $B_d=n^2/(r^2D^2)$. For a history variation $h$, the implicit-root change is $\delta s=-n[h(t)-\sigma h(s)]/D$. Consequently the signed changed-source row has variation

$$
\sigma(J_d-H_0)h(t)-J_dh(s)+B_dh'(s).
$$

Equations (15)–(16) in the original analysis express the inner row before its external $\sigma$ factor in equation (6). Multiplying that factor once gives the variation above. The receiver sum must therefore retain $g[S'(q)+\sum_d\sigma_d(J_d-H_0)]$ before taking its absolute upper bound. Confusing inner and signed rows reverses some derivative signs and destroys the stationary cancellation. This is an algebraic obligation derived from the given kernel, not an imported physical law.

## Separately parameterized curved-source control

Choose a local synthetic source with $t=0$, $s=-5$, $p=9$, $m=-4$, $\sigma=-1$, $q(-5)=0$, $q'(-5)=w$ and $q''(-5)=a_s$. The causal root can instead be parameterized explicitly by

$$
r=-s,\qquad z=-\sqrt{s^2-9},\qquad
x(s)=z-m+\sigma q(s).
$$

At the chosen point $r=5$, $z=-4$, $n=-4/5$, $z_s=5/4$, $n_s=9/100$ and $x_s=5/4-w>0$. Differentiating $K(s)=\sigma z/(r^3D)$ directly in this parameter, then dividing by $x_s$, produces an independent exact receiver derivative without using the collected $J_d$ formula.

| Source jets $(w,a_s)$ | $D$ | Exact signed $K_x$ | Exact unsigned $J_d$ |
| --- | --- | --- | --- |
| $(0,0)$ | $1$ | $23/3125$ | $-23/3125$ |
| $(1/8,0)$ | $9/10$ | $88/10125$ | $-88/10125$ |
| $(1/8,1/8)$ | $9/10$ | $1112/91125$ | $-1112/91125$ |

The separately authored exact-rational `curved-row-reference.py` verifies these three fractions, positive denominators, invertibility and the Pythagorean root identity before any peer coefficient instrument is imported. Its source and receipt are retained in `codex-coefficient-reference/`. It evaluates zero physical reception cells. These references can test an implementation's signs and acceleration term; they do not establish whole-tube coefficient validity, infinite-tail bounds, incoming actual-error bounds or an event. Those obligations remain unreviewed. Falsifiers include failure to enclose any fraction, omitted polarity/acceleration terms, nonpositive $D$, missing source roots, a source-error lookup reaching the current step, or reliance on old propagated-error outputs as a new reference.

## Peer coefficient component acceptance

**Status: ✓ Core coefficient preparation accepted; ◐ propagation remains unbuilt.** Full source `8302bf97…b9f4` and report `60108e70…c6bb` are reviewed; nine source/fifteen output entries verify by SHA-256 manifests and six controls rerun PASS. The unchanged exact root-parameter reference prepared before this instrument confirms enclosure of23/3125,88/10125 and1112/91125 in its signed K. The latter tests nonzero source acceleration independently of its finite-difference control. Its K is the signed sigma J_d of this review; the m-sign change maps the symmetric orbit table consistently. Exact first variation, zero-history subtraction, cancellation-preserving H difference, root-shift triangle inequality and incoming-error formula are mathematically accepted. The Bernstein/Q2 seam envelope and original incoming theorem/characteristic bounds remain declared shared premises. The source code supplies no whole-tube L_j/Q_j assembly, infinite derivative-tail summation, incoming table join or majorant; those are not accepted by the six controls. C6 checks arithmetic of an admitted bound and does not independently prove the ancient theorem. The failed shape-helper run is retained. No physical propagation target has run. The receiving assembly must authenticate all inputs, use the full trial tube including actual ancient error, preserve signed summation and strict past lookups, and include the zero jump without double counting. Falsifiers remain the exact fractions/signs, root/domain failures, inadequate full-tube bounds and circular error lookup.
