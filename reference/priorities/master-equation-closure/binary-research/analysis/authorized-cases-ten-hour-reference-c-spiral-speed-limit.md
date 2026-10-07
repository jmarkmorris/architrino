# Blind reference: a scalar speed limit must be the classified spiral speed

**Derived reference, frozen before opening the new speed-limit subject.** Use the same actual compatible departing family and unchanged logarithmic mirror row. Assume its strict-subfield continuation exists for all future time and that $|v(t)|$ has a limit $V\in[0,1]$. The previously accepted fate estimates give $h>0$, increasing $h$, $r>h$, $s(t)\to\infty$, acute positive lifted lag, and, with $\tau=t-s_0$, eventual

$$
r(t)<\frac{19}{20}\tau,\qquad \tau_s=s(t)-s_0>\frac{\tau}{39},\qquad
h'(t)\ge\frac{h(s(t))}{2\pi(t-s(t))}.
$$

This reference constructs the regular limiting tail needed by the [independent constant-speed reference](authorized-cases-ten-hour-reference-c-spiral-constant-speed.md). It does not assume such a limit exists a priori, does not replace the actual history, and does not decide whether the original scalar speed converges.

## Recurrent macroscopic radius

Set $c_*=1/(1+4\pi)$. Suppose for contradiction that $r(t)\le c\tau$ eventually for some $c<c_*$. Sources eventually lie in this regime. The chord bound gives, with $\lambda=\tau_s/\tau$,

$$
1-\lambda\le c(1+\lambda),\qquad
\lambda\ge a:=\frac{1-c}{1+c},\qquad
\frac{a}{2\pi(1-a)}>1.
$$

Choose $m>1$ sufficiently close to one that $a^m/[2\pi(1-a)]>m$. For a small positive $k$, the comparison $k\tau^m$ lies below $h$ on an initial interval covering every earlier source needed for a first crossing. At such a crossing,

$$
h'\ge k\tau^{m-1}\frac{\lambda^m}{2\pi(1-\lambda)}
\ge k\tau^{m-1}\frac{a^m}{2\pi(1-a)}
>mk\tau^{m-1}.
$$

This rules out a downward crossing. It contradicts $h<r\le c\tau$. Therefore $\limsup r(t)/\tau\ge c_*$. This proves recurrence, not an eventual lower bound. In particular $V=0$ is impossible, because a velocity tending to zero would imply $r(t)/\tau\to0$ by integration.

## A speed limit promotes some radius returns to angular returns

Choose $c_0\in(0,c_*)$ and arbitrarily large $\tau_n$ with $r(\tau_n+s_0)\ge c_0\tau_n$. On $[\tau_n,(1+d)\tau_n]$, where $d=c_0/2$, unit speed gives $r\ge c_0\tau_n/2$. The radial equation and the complete chord estimate imply

$$
p'=\frac{h^2}{r^3}-\frac{e\cdot n}{RD}
\le\frac{h^2}{r^3}-\frac{r}{4\tau^2},\qquad p=r'. \tag{1}
$$

Here $e\cdot n\ge r/R$, $D\le2$ and $R\le2\tau$ even give a comparable weaker constant; using $R\le\tau$ once $\tau_s>0$ gives the displayed $1/4$ safely. If $h\le\eta\tau_n$ throughout this interval, then

$$
p'\le\frac1{\tau_n}\left(\frac{8\eta^2}{c_0^3}-\frac{c_0}{8(1+d)^2}\right).
$$

For a sufficiently small fixed $\eta>0$, the bracket is a negative constant. But $p^2=|v|^2-h^2/r^2$ and $|v|\to V>0$ force $p$ into two arbitrarily narrow neighborhoods of $\pm V$ as $\eta$ is made small and $n$ large. Its sign cannot change, and its total allowed change in either neighborhood is smaller than the fixed negative decrease forced by (1). Contradiction. Hence, after possibly changing the sequence by a factor bounded by $1+d$, there is $\eta_0>0$ with

$$
h(t_n)\ge\eta_0\tau_n,\qquad \tau_n=t_n-s_0\longrightarrow\infty. \tag{2}
$$

For explicit quantifier order, first choose $\eta$ so the bracket is at most $-c_0/[16(1+d)^2]$ and $2\eta/c_0<V/4$, then reduce it until the resulting width in $p$ is less than one quarter of that decrease times $d$; finally use convergence of speed to control the remaining width. Monotonicity of $h$ preserves this lower bound at every later time.

## Compact source charts are a consequence

Rescale the actual paths by $x_n(u)=x(s_0+\tau_nu)/\tau_n$. On every fixed compact interval $1\le u\le U$, (2) gives $r_n\ge h_n\ge\eta_0$ and $r_n\le u$. The speed is at most one. For receivers $u\ge39$, the actual source has $\sigma_n\ge u/39\ge1$. The range $R_n=u-\sigma_n$ is at least $r_n\ge\eta_0$ by acute endpoint geometry. Along its entire causal interval, $h_n\ge\eta_0$ and $r_n\le U$, so

$$
\delta_n=\int_{\sigma_n}^u\frac{h_n(w)}{r_n(w)^2}\,dw
\ge\frac{\eta_0R_n}{U^2}.
$$

Let $\gamma_n$ be the angle between the source radius and the chord, and $\alpha_n$ the angle between the chord and the receiving radius. Since $0<\delta_n<\pi/2$,

$$
\sin\gamma_n=\frac{r_n(u)\sin\delta_n}{R_n}
\ge\frac{2\eta_0^2}{\pi U^2},\qquad
\sin\alpha_n\ge\frac{2\eta_0^2}{\pi U^2}=:b_U.
$$

The source velocity has positive tangential component. Therefore $n\cdot v_s\ge-\cos\gamma_n$, while at reception $n\cdot v\le\cos\alpha_n$. It follows that both clock factors obey

$$
D_n\ge1-\sqrt{1-b_U^2}\ge b_U^2/2,
\qquad 1-n\cdot v_n\ge b_U^2/2. \tag{3}
$$

These are uniform positive margins on each compact scaled interval, even when $V=1$. Thus acceleration is bounded for $u\ge39$. The root derivative is bounded as well. For receivers $u\ge39^2$, their source velocities come from $u\ge39$, where the acceleration bound already gives equicontinuity. The exact row and implicit clock therefore pass to a diagonal subsequence: positions and velocities converge locally uniformly, clocks converge with the required regularity, and the limit solves the unchanged single-partner row on a whole sufficiently late tail. Its speed is exactly $V$, its separation and angular quantity are positive, and its source tends to infinity by the inherited factor $1/39$.

The history census is not silently lost. Limiting source residuals are nonincreasing under the inherited speed bound one; the positive local derivative margin at the retained root excludes any second root at the same level. Remote negative scaled times cannot introduce one, since the retained $19/20$ radius ceiling gives positive residual at scaled time zero. In the regular limiting tail, nonzero acceleration excludes straight unit segments and hence excludes self-root equality. Positive angular quantity passes to the limit. Acute endpoint lag is initially nonobtuse in the limit; equality would require a straight unit causal arc, again excluded by the nonzero regular row. Thus the strict acute geometry required by the constant-speed reduction holds on its late tail.

## Consequence and limits

For $0<V<1$, the exact constant-speed reduction and old global classification force $V$ to equal the unique admitted spiral speed. For $V=1$, the independent unit-tail obstruction gives a contradiction. The zero limit was excluded above. Therefore any scalar speed limit of the actual all-future branch must equal the admitted base spiral speed. This is stronger than ruling out finite capture, but it does not prove the existence of a speed limit, convergence of the whole normalized history, or selection of the all-future branch instead of finite unit arrival.

The proof uses actual-path rescalings solely as a compactness argument. They are not new physical preparations. Load-bearing falsifiers are failure of the delayed torque comparison, the radius-to-angular recurrence step, either geometric margin in (3), or loss of the original row when passing the source clocks and velocities to the limit. No numerical target, spectral calculation, balance search or long process was launched.
