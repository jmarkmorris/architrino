# Low-speed restrictions from the complete smaller neutral pair

## Proposed exclusions

**Derived claims pending independent reconstruction.** In the selected distinct-member logarithmic circular class, take $r_1=1$, $r_2=r_3=b>1$ and common angular rate $\omega\ge0$. Write $v=\omega b\le1$ for the common outer speed. With $K_{\log}=c_f=1$, unchanged transmitter weighting, persistent unit polarities and complete histories, the following all-phase exclusions hold:

| Radius and speed domain | Ordered outer tangential difference in original units |
| --- | --- |
| $b\ge2$, $0\le v\le1/40$ | $A_{2,t}-A_{3,t}\ge11/(1896b)>0$ |
| $b\ge3$, $0\le v\le1/8$ | $A_{2,t}-A_{3,t}\ge2819/(118404b)>0$ |

Each difference gives a maximum absolute component at least half its lower bound. Combined with the checked exclusion $b\ge5$, exact outer-equal configurations with $b\ge2$ must satisfy $2\le b<5$, $v>1/40$, and additionally $v>1/8$ if $b\ge3$. These are conditions on the actual outer speed, not on the original angular rate alone. No numerical target or change of coupling is selected.

## Scale and preserve the neutral-pair geometry

Scale length and time by $b$, giving two equal pair radii one and smaller radius $a=1/b<1$, with common angular rate $v$. Scaled accelerations are divided by $b$ when returning to original units. At a positive unit receiver, a smaller source has present phase $\theta$, causal delay $\tau$, emission phase $\theta-v\tau$, chord $p=x-y(-\tau)$ and factor $D=1-n\cdot v_s$, where $x=(1,0)$, $|p|=\tau$ and $n=p/\tau$.

The exact chord bounds are $1-a\le\tau\le1+a$, so $|\tau-1|\le a$. Compare this actual row with a static source at phase $\theta-v$. With comparison chord $p_*=x-y_*$ and length $d_*$, geometry and the arc-length bound give

$$
d_*\ge1-a,\qquad |p-p_*|\le av|\tau-1|\le a^2v.
$$

The actual smaller-source speed is $av$, hence $D\ge1-av>0$ and $|D-1|\le av$. This uses the transmitter's speed and remains valid at outer speed one because $a<1$. The comparison changes no actual source history or emission time.

The exact Euclidean inversion identity gives

$$
\left|\frac p{\tau^2}-\frac{p_*}{d_*^2}\right|
=\frac{|p-p_*|}{\tau d_*}\le\frac{a^2v}{(1-a)^2}.
$$

For either persistent polarity $\sigma$, the row difference splits as

$$
A-A_*=\sigma\left[\frac1D\left(\frac p{\tau^2}-\frac{p_*}{d_*^2}\right)
+\frac{p_*}{d_*^2}\left(\frac1D-1\right)\right],
$$

and therefore

$$
|A-A_*|\le\frac1{1-av}
\left[\frac{a^2v}{(1-a)^2}+\frac{av}{1-a}\right]
=\frac{av}{(1-a)^2(1-av)}.
$$

The antipodal source has its own actual delay but comparison phase $\theta+\pi-v$. Thus the two comparison positions remain one neutral antipodal pair. Their complete pair error is at most

$$
E_a(v)=\frac{2av}{(1-a)^2(1-av)}.
$$

If the two positive unit receivers have clockwise gap $\beta\in(0,\pi)$, the same comparison pair is seen at phases $s$ and $s+\beta$. The two responses are simultaneously within $E_a(v)$ of their static values, preserving the linked phase. This is a vector bound, so it controls both radial and tangential components; no separate choice of source phase is made for either receiver.

## Static whole-pair cap and the inner contribution

The complete static smaller-pair tangential response at a unit receiver is

$$
G^{(0)}_{a,t}(s)
=-\frac{2a(1+a^2)\sin s}{(1-a^2)^2+4a^2\sin^2s}.
$$

It follows by summing both signed rows at their separate static distances. The square $(1-a^2-2a|\sin s|)^2\ge0$ implies

$$
|G^{(0)}_{a,t}(s)|\le\frac{1+a^2}{2(1-a^2)}.
$$

At zero sine the response vanishes, so no division by zero is used. The two-receiver static difference is at most $(1+a^2)/(1-a^2)$ in magnitude; adding both pair errors gives the complete opposing allowance

$$
C_{\rm pair}(a,v)=\frac{1+a^2}{1-a^2}
+\frac{4av}{(1-a)^2(1-av)}.
$$

The other two unit-radius pairs contribute the complete difference

$$
L=\frac{Q_v(\beta)+Q_v(\pi-\beta)}2\ge Q_v(\pi/2)
$$

by the [checked paired-response convexity](overnight2-c-tangential-convexity-independent-review.md). Own-antipode terms cancel. The circle chart is $\gamma=\alpha-2v\sin(\alpha/2)$, $D_v=1-v\cos(\alpha/2)$, $B_v(\gamma)=\cot(\alpha/2)/D_v$ and $Q_v(\gamma)=B_v(\gamma)-B_v(\gamma+\pi)$.

For $0\le v\le1/8$, the complete angle at $\pi/2$ lies between $\pi/2$ and $\pi/2+2v<\pi$, while its positive cotangent is divided by a factor at most one. At present angle $3\pi/2$, the negative cotangent has magnitude at least one and factor at most $1+v$. Hence

$$
L\ge\cot(\pi/4+v)+\frac1{1+v}.
$$

A useful coarser form is $L\ge2-5v$, since $\tan v\le v/(1-v^2/2)\le2v$, $\cot(\pi/4+v)=(1-\tan v)/(1+\tan v)\ge1-4v$, and $1/(1+v)\ge1-v$.

## The two exact margins

When $b\ge2$, $a\le1/2$. The static difference cap is at most $5/3$. Each positive factor $a$, $(1-a)^{-2}$ and $(1-av)^{-1}$ increases with $a$ at fixed nonnegative $v$, so the moving comparison error is at most $8v/(1-v/2)$. Consequently, for $v\le1/40$,

$$
\widetilde A_{2,t}-\widetilde A_{3,t}
\ge\frac13-5v-\frac{8v}{1-v/2}
\ge\frac13-\frac18-\frac{16}{79}
=\frac{11}{1896}>0.
$$

The subtracted speed functions increase, so the endpoint gives a valid lower bound on the whole interval.

When $b\ge3$, $a\le1/3$. The static difference cap is at most $5/4$, and the moving comparison error is at most $3v/(1-v/3)$. Both terms in the sharper lower bound for $L$ decrease on $0\le v\le1/8$. At $v=1/8$, $\tan v\le16/127$, hence

$$
L\ge\frac{111}{143}+\frac89=\frac{2143}{1287}.
$$

It follows that

$$
\widetilde A_{2,t}-\widetilde A_{3,t}
\ge\frac{2143}{1287}-\frac54-\frac9{23}
=\frac{2143\cdot92-1287\cdot151}{1287\cdot92}
=\frac{2819}{118404}>0.
$$

The error $3v/(1-v/3)$ increases with $v$, so this margin holds throughout the second speed interval. Tildes indicate scaled accelerations. Dividing each margin by $b$ gives the original-unit differences, and at least one absolute component is half as large. Required circular acceleration has zero tangential component, which makes these necessary equations incompatible with exact balance.

## Compact consequence, complete roots and limits

Using the [checked outer-equal radius and root bounds](overnight2-c-outer-regular-domain-independent-review.md), the remaining exact branch with $b\ge2$ lies in the compact containing set

$$
2\le b\le5,\qquad \frac1{40b}\le\omega\le\frac1b,
\qquad \frac1{32}\le\beta\le\pi-\frac1{32},\qquad\chi\in\mathbb T.
$$

The exact subset excludes $b=5$ and the lower-speed equality. It also has $\omega b>1/8$ when $b\ge3$. In particular every exact configuration in this branch has $\omega>1/200$. This bound concerns normalized inner radius one. The established bounds $d_{\min}\ge1/32$, $\tau\in[1/64,10]$ and $D\ge1/128$ persist because this only reduces the already checked domain.

All thirty positive partner roots and no positive self roots are included. Every selected receiver's three equal-radius and two smaller-radius sources are retained, with separate actual delays. The comparison uses the complete smaller pair, not a truncated history. At $v=0$, its shift and error vanish and the static formula is recovered exactly. Its phase-axis values are $G^{(0)}_{a,t}(0)=0$ and $G^{(0)}_{a,t}(\pi/2)=-2a/(1+a^2)$, providing sign controls. The inversion identity and rational margins are analytic controls; no new instrument or numerical target was run.

The pair-error bound itself holds for $0<a<1$, $0\le v\le1$, while the two exclusions use their narrower radius/speed hypotheses. These results do not decide higher speeds, $1<b<2$, general unequal radii, stability or actual-time continuation. A wrong scaled speed, source-factor estimate, comparison phase, signed pair sum, four-row count or rational subtraction would falsify the corresponding step. An exact configuration in either declared strip would falsify its exclusion. Independent reconstruction is required before these proposed claims are integrated as checked.
