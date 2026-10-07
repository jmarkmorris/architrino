# An outer-radius restriction when the two inner radii coincide

## Proposed boundary exclusion

**Derived claim pending independent reconstruction:** an exact distinct-member configuration in the selected closed-subfield circular class with $r_1=r_2=1$ and $r_3=b>1$ must have $b<12$. For every configuration in this class with $b\ge12$, at least one positive inner receiver has radial balance residual

$$
F_r\le-\frac{13115}{226512}<0.
$$

The class consists of three neutral persistent antipodal pairs with common center, plane and angular rate $\omega\ge0$, unit polarities, and $K_{\log}=c_f=1$. Every positive ordinary partner root is included. All member speeds are at most one. The ordinary closed-subfield circular chart has thirty partner roots and zero positive self roots at distinct positions. This is a partial-equality boundary result; the outer pair's radius and phase are unrestricted subject to the stated bounds. It does not assume the outer-radius bound from the strictly ordered class.

## One inner receiver retains inward radial acceleration

Let $v=\omega$ be the common inner speed. Of the two positive inner endpoints, choose their labels so the clockwise separation from the first to the second is $\beta\in(0,\pi)$. Such a choice is always possible because coincident or antipodal positive endpoints would create a forbidden member collision. The equal-radius complete chart gives radial response $R_v(\beta)=1/D_v(\beta)$, strictly decreasing in clockwise present angle for $v>0$, with $R_0=1$ at zero speed.

At the second positive receiver, the other inner positive endpoint has angle $2\pi-\beta$ and its negative antipode has angle $\pi-\beta$. Its own negative antipode has angle $\pi$. The complete radial acceleration from these three inner sources is

$$
2A_{\mathrm{inner},r}
=-R_v(\pi)+R_v(2\pi-\beta)-R_v(\pi-\beta)
\le-R_v(\pi).
$$

The inequality is strict when $v>0$ and remains valid at zero speed. The actual own-antipode factor is at most $1+v$, so

$$
A_{\mathrm{inner},r}\le-\frac1{2(1+v)}.
$$

This selects one receiver; it does not assert that the other positive inner receiver has the same bound. The two outer sources remain to be included.

## Bounding both outer rows with the receiver geometry

For an inner receiver of radius one and an outer source of radius $b$, write the causal angle as $\theta$ and its positive delay as $\tau$. Then

$$
\tau^2=1+b^2-2b\cos\theta,\qquad
D=1+\frac{\omega b\sin\theta}{\tau}.
$$

The exact geometric identity

$$
\tau^2-b^2\sin^2\theta=(b\cos\theta-1)^2\ge0
$$

gives $|b\sin\theta|/\tau\le1$, and hence $D\ge1-v$. This factor bound uses the inner receiver radius. It does not infer a strict speed margin for the outer source, whose speed may equal one.

At reception, the source and receiver are at least $b-1$ apart. The source moves at speed at most one throughout its complete circular history, so the triangle inequality gives $b-1\le2\tau$. Thus each complete signed logarithmic outer row has magnitude at most

$$
|A|=\frac1{\tau D}\le\frac2{(b-1)(1-v)}.
$$

The two outer sources therefore contribute at most $4/[(b-1)(1-v)]$ to outward radial acceleration at the selected inner receiver. Since $vb\le1$, for $b>1$ this is bounded by $4b/(b-1)^2$. The bound includes both outer polarities separately and uses the unique complete root in each channel; cancellation is not presumed.

## The explicit negative margin

The prescribed circular acceleration adds $v^2$ to the radial residual. Therefore

$$
F_r\le v^2-\frac1{2(1+v)}+\frac{4b}{(b-1)^2}.
$$

For $b\ge12$, the closed speed bound gives $0\le v\le1/12$. The function $4b/(b-1)^2$ decreases for $b>1$, since its derivative is $-4(b+1)/(b-1)^3$. Bounding the three terms separately yields

$$
F_r\le\frac1{144}-\frac6{13}+\frac{48}{121}
=\frac{1573-104544+89856}{226512}
=-\frac{13115}{226512}<0.
$$

This contradiction to exact radial balance excludes the whole continuous boundary sector $r_1=r_2=1$, $r_3\ge12$, every outer phase and every closed-subfield speed. The static endpoint is covered directly by the non-strict inner inequality and the same estimates. No grid, fit, new coupling, finite-history truncation or numerical target enters this proof.

## Independent-check boundary and next unresolved region

The equal-radius inner rows use the [independently checked chart](overnight2-c-equal-radius-chart-independent-review.md), and complete-root coverage uses the [closed-subfield root theorem](overnight2-c-root-bound-independent-review.md). The new receiver-factor identity and rational negative margin above are hand-derived controls of the estimates. An independent review must check the clockwise indexing, the use of the receiver radius in $D$, the inclusion of both outer rows, and the exact arithmetic before this is recorded as a completed boundary finding.

An incorrect source ordering, failure of the displayed geometric identity, an additional ordinary root, or a configuration in the stated domain whose selected complete residual exceeds the bound would falsify the corresponding step. The result leaves $1<r_3<12$ on this boundary unresolved, except for whatever independently proved all-equal-radius neighborhood exclusion applies. It supplies no conclusion for the other partial-equality boundary $r_1<r_2=r_3$, arbitrary unequal radii, superfield motion or stability.
