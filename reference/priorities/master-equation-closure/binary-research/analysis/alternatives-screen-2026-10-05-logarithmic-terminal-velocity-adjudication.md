# Independent adjudication of the inverse-distance terminal-velocity exclusion

## Conclusion and complete scope

**Derived assessment: the exclusion is valid.** For the fixed isolated opposite-polarity pair with $p=1$, $K=R_*=c_f=1$, a classical separated solution on every future time, whose complete supplied histories and full future share one bound $|V_i|\le b<1$, cannot have both Cartesian velocity limits. The conclusion covers arbitrary nonmirror three-dimensional motion. No limit or lower bound on positive present separation is required.

The [frozen subject](alternatives-screen-2026-10-05-logarithmic-terminal-velocity-exclusion.md) was read before this independent analytical reconstruction. The proof below uses only the selected complete delayed equation and its uniform speed margin. No expanding spiral, spiral spectrum, numerical trajectory, conservation law or imported boost symmetry is a premise. This is an obstruction conditional on an all-future solution in the stated class, not an existence theorem, a stability verdict or a prediction that either speed magnitude diverges.

## Complete roots and a direct source-clock lower bound

Write $r=X_1-X_2$, $d=|r|>0$. For each receiver $i$ and its partner $j$, the complete causal residual $T-S-|X_i(T)-X_j(S)|$ decreases strictly in $S$ with slope bounded above by $-(1-b)$ in the Lipschitz sense. Its remote-past limit is positive infinity and its reception-time value is $-d$. Hence there is exactly one partner source $S_i(T)<T$. Self chords are at most $b(T-S)<T-S$, so every positive-delay self-root set is empty. The diagonal endpoint remains excluded by the fixed law.

With $\tau_i=T-S_i$, $n_i=[X_i(T)-X_j(S_i)]/\tau_i$, and $D_i=1-n_i\cdot V_j(S_i)$, the complete equation is exactly

$$
A_i=-\frac{n_i}{\tau_iD_i},\qquad
D_i\ge1-b,\qquad
\frac d{1+b}\le\tau_i\le\frac d{1-b}.
$$

The ordinary root is differentiable because its range is positive and $D_i>0$. Direct differentiation gives an alternative late-source proof:

$$
S_i'(T)=\frac{1-n_i\cdot V_i(T)}{1-n_i\cdot V_j(S_i(T))}
\ge\frac{1-b}{1+b}=:c>0.
$$

Therefore $S_i(T)\ge S_i(0)+cT\to\infty$. In particular every point of the source-to-receiver interval also tends uniformly into the future. This proves that terminal-velocity information applies throughout each sampled interval, without deleting old history by convention. The subject's separate position-bound argument gives the same valid conclusion. This source-clock proof needs no bound on accelerations or on the eventual size of $d$.

## Distinct limits imply a nonintegrable fixed-direction acceleration

Assume $V_i(T)\to v_i$, with $v_1\ne v_2$. Then $X_i(T)=v_iT+o(T)$ by integration. Set $\lambda_i=S_i/T$. The preceding lower bound keeps $\lambda_i$ in a compact subset of $(0,1]$ eventually. Dividing the complete root equation by $T$ gives

$$
1-\lambda_i=|v_i-\lambda_i v_j+o(1)|.
$$

The error is uniform for these actual source times: $S_i\ge cT+O(1)$ and $S_i\le T$, so the source's $o(S_i)$ remainder divided by $T$ tends to zero. The limiting scalar residual $1-\lambda-|v_i-\lambda v_j|$ is strictly decreasing with lower monotonicity modulus $1-b$. It is positive at zero and negative at one. Its unique root $\lambda_i^*$ lies in $(0,1)$, and compactness forces $\lambda_i\to\lambda_i^*$.

The direction and denominator therefore tend to

$$
n_i^*=\frac{v_i-\lambda_i^*v_j}{1-\lambda_i^*},\qquad
D_i^*=1-n_i^*\cdot v_j\ge1-b>0,
$$

with $|n_i^*|=1$. Thus

$$
T A_i(T)\longrightarrow-\frac{n_i^*}{(1-\lambda_i^*)D_i^*}.
$$

Projection on the fixed direction $n_i^*$ is eventually at most $-c_i/T$ for some $c_i>0$. Its integral tends to negative infinity, contradicting the uniform bound on the corresponding velocity projection. The $o(1/T)$ acceleration remainder cannot cancel this contradiction, because eventual strict sign is obtained before integration. Distinct terminal velocities are excluded.

## An exact scaled formula controls the common-limit case

Now suppose both velocities tend to the same vector $v$, with $|v|\le b$. For receiver $i$, define the exact average source velocity and endpoint source velocity

$$
q_i(T)=\frac{X_j(T)-X_j(S_i)}{\tau_i}
=\frac1{\tau_i}\int_{S_i}^T V_j(s)\,ds,
\qquad p_i(T)=V_j(S_i).
$$

Both lie in the closed ball $|q_i|,|p_i|\le b$. The late-source estimate proves $q_i\to v$ and $p_i\to v$, uniformly with respect to the possibly shrinking or growing interval lengths. More explicitly, their differences from $v$ are bounded by the terminal-velocity tail supremum over $s\ge cT+\min_i S_i(0)$, which tends to zero.

Put $e=r/d$, $e_1=e$, $e_2=-e$ and $a_i=d/\tau_i$. The exact chord identity is

$$
n_i=a_i e_i+q_i,\qquad |n_i|=1.
$$

For every unit $e$ and $|q|\le b$, the unique positive solution of $|ae+q|=1$ is the explicit smooth function

$$
a(e,q)=w(e,q)-e\cdot q,\qquad
w(e,q)=\sqrt{1-|q|^2+(e\cdot q)^2}.
$$

It satisfies $w\ge\sqrt{1-b^2}$ and $1-b\le a\le1+b$. Let $n(e,q)=a(e,q)e+q$, which has unit length, and define

$$
G(e,q,p)=\frac{a(e,q)n(e,q)}{1-n(e,q)\cdot p}.
$$

The exact physical rows obey $d A_i=-G(e_i,q_i,p_i)$. On the compact set $e\in S^2$, $|q|,|p|\le b$, the square root and denominator are bounded away from zero, the latter by $1-b$. Thus $G$ is uniformly Lipschitz in $q,p$, with a constant depending only on $b$. This is a direct formula for the uniform scaled perturbation estimate; no lower or upper bound on $d$ enters it. The segment joining $q_i$ to $v$, or $p_i$ to $v$, stays within the same ball, so an ordinary mean-value bound applies even at its boundary.

At $q=p=v$, write $u=e\cdot v$ and $w=\sqrt{1-|v|^2+u^2}$. Then $a_+=w-u$, $a_-=w+u$, and

$$
1-(a_+e+v)\cdot v=a_+w,\qquad
1-(-a_-e+v)\cdot v=a_-w.
$$

Consequently

$$
-G(e,v,v)+G(-e,v,v)
=-\frac{a_+e+v}{w}+\frac{-a_-e+v}{w}
=-2e.
$$

This verifies the common-drift cancellation exactly, retaining both transmitter factors. It is an algebraic property of this fixed $p=1$ response, not an invocation of invariance under a moving reference frame.

Uniform Lipschitz control now gives, with $\epsilon(T)\to0$ the tail supremum above,

$$
d(A_1-A_2)=-2e+O_b(\epsilon(T)),\qquad
r\cdot(A_1-A_2)=-2+O_b(\epsilon(T)).
$$

This argument permits $e(T)$ to keep rotating and $d(T)$ to shrink, stay bounded, or diverge. Neither needs a limit. It also avoids assuming that acceleration tends to zero merely because velocity converges.

## Integrated contradiction

Since $r'=V_1-V_2\to0$, classical differentiation gives

$$
\frac{d^2}{dT^2}d(T)^2
=2|r'(T)|^2+2r(T)\cdot(A_1-A_2)
\longrightarrow-4.
$$

There is therefore a finite $T_0$ after which $(d^2)''\le-2$. Twice integrating yields

$$
d(T)^2\le d(T_0)^2+(d^2)'(T_0)(T-T_0)-(T-T_0)^2.
$$

The right side becomes negative at finite $T$, contradicting the nonnegative squared separation of an all-future classical solution. Equal terminal velocities are excluded as well. This contradiction does not assume bounded separation, finite total angle, asymptotic collinearity or a nonzero relative terminal velocity.

## Boundaries, falsifiers and source validation

No gap or counterexample was found in the subject's theorem. It excludes simultaneous existence of both Cartesian velocity limits under its complete global uniform speed margin. It does not prove that each velocity separately fails to converge, that either speed magnitude lacks a limit, that no global solution exists, or that a solution approaching unit speed without a common margin satisfies the conclusion. Unequal couplings, extra particles, different self clauses, incomplete past support and contact continuations are different problems.

Checkable falsifiers are an additional ordinary root under the declared complete strict chord bound, failure of the source-clock derivative above, failure of the exact scaled $G$ representation, an incorrect common-drift cancellation, or a separated all-future uniformly subfield solution with both velocity limits. The absence of symmetry and separation-size assumptions is supported by the uniform compact-domain calculation, rather than extrapolation from a planar example.

The frozen subject's SHA-256 was measured with `shasum -a 256` as `0af65a73f1f695930934f6bf01ec4257c120392d8080e5e746f00cdc59250b9b`, matching the requested review identity. The live equation-variants Section 15 confirms the $p=1$, unit-coefficient response used here. The Jack K. Hale role and specialist charter were read as analytical-domain guidance, not evidence of correctness. No external physical law, numerical instrument or computational producer was used. Only this new focused adjudication was written; the subject and shared sources remain unchanged.

Textual validation: `git diff --no-index --check /dev/null` on this new file emitted no whitespace diagnostics; exit status 1 denotes its new-file difference. A final subject digest check retained the same frozen identity. These are scoped source/format checks, separate from the analytical reconstruction above.
