# An explicit tilted-square upper bound at release

**Derived candidate, awaiting separate independent assessment before target use.** This is an optional refinement of the initial instantaneous configuration-distance upper bound for the unchanged four-member history. It changes no physical path, trial, equation, label, radius or receiving horizon. The exact comparison orbit already permits arbitrary proper rotations and translations. Its review must not delay launch of the previously admitted certificate route.

Write the single initial offset as $d=(a,b,c)$ and the old radius as $r$. Let $r_*$ be the fixed exact comparison radius, and assume $|c|<2r_*$. Choose a proper rotation about the second coordinate axis whose first column is

$$
q_1=\left(\sqrt{1-\frac{c^2}{4r_*^2}},0,\frac{c}{2r_*}\right),
\qquad q_2=(0,1,0),\qquad q_3=q_1\times q_2.
$$

Compare the four initial positions with the exact square $(r_*q_1,r_*q_2,-r_*q_1,-r_*q_2)$ translated by $t=(a/2,b/2,c/4)$. Define

$$
k=r-\sqrt{r_*^2-c^2/4},\qquad e=r-r_*.
$$

The four member errors are exactly

$$
(a/2+k,b/2,c/4),\quad
(-a/2,-b/2+e,-c/4),\quad
(-a/2-k,-b/2,c/4),\quad
(-a/2,-b/2-e,-c/4).
$$

Consequently the initial minimum maximum-member distance satisfies

$$
d_0\le\sqrt{\frac{a^2+b^2}{4}+\frac{c^2}{16}}+|r-r_*|+
\frac{c^2/4}{r_*+\sqrt{r_*^2-c^2/4}}.
\tag{1}
$$

The last fraction is exactly $r_*-\sqrt{r_*^2-c^2/4}$, written without subtractive cancellation. The triangle inequality bounds both $|k|$ and $|e|$ by the final two terms. Every radius in the independent radius enclosure must be retained. Formula (1) is an explicit admissible comparison and need not minimize the maximum norm.

For the original literal offset $d=\epsilon r(1,0.7,1.3)$, the leading term is $\epsilon r\sqrt{0.478125}$, compared with $\epsilon r\sqrt{3.18}/2$ for translation alone. The improvement comes from fitting half the normal displacement into a proper tilt. It does not discard the out-of-plane component: the remaining normal discrepancy is explicitly $c/4$ at every member, and the rotation-induced radial correction is retained exactly.

Known analytical controls for a directed implementation precede any target use. With $c=0$, the rotation is the identity and the bound reduces to $\sqrt{a^2+b^2}/2+|r-r_*|$. With $a=b=c=0$ it is the radius difference. With $r=r_*=1$, $a=b=0$ and $c=6/5$, the first column is exactly $(4/5,0,3/5)$, the translation is $(0,0,3/10)$, and the four displayed error vectors can be checked by rational arithmetic. Their maximum norm is $\sqrt{13}/10$, while (1) gives the safe upper bound $1/2$. These controls establish the geometry and sign convention independently of any retained trajectory.

If independently accepted, the sharper initial bound may be compared with the already evaluated fixed time-10 RMS observable using a subsequently verified actual-position error there. That is a planning possibility only: no new numerical bound, actual departure or shortened certificate is asserted in this note. Falsifiers are an improper comparison rotation, incorrect label ordering, a wrong release patch position, missing radius uncertainty, or any of the four explicit error vectors exceeding the stated upper bound.
