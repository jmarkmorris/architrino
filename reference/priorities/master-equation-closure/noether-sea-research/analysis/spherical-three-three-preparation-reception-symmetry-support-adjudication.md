# Independent adjudication of the preparation-reception support refinement

## Scoped verdict

**Accepted, derived, with later support sign explicitly unresolved.** The [support subject](spherical-three-three-preparation-reception-dynamics-support.md) correctly strengthens the canonical radial and speed enclosures on the already admitted hexagon interval $t_0\le t\le t_E+1/100$, without extending motion. Its $N<0$ conclusion concerns canonical radial acceleration. Its signed-support upper bound is positive, so it proves neither outward support nor a support zero. No repair is required.

This comparison uses the [independently frozen symmetry reference](spherical-three-three-preparation-reception-symmetry-reference.md), the [corrected-history actual theorem](spherical-three-three-preparation-reception-review-adjudication.md), and the inherited comparisons independently retained in the [twenty-one-twentieths symmetry reference](spherical-three-three-hexagon-extension-symmetry-twentyone-reference.md). The inherited early-source and feedback-speed comparisons remain shared accepted premises; this adjudication checks their applicability and every new inference instead of presenting them as newly independent findings. The new bounds below are reconstructed directly from the five canonical terms. No six-pole history enters this calculation.

Dispatch `fe6a4c1e-93eb-4d37-ae23-c8d47b306cc9` was admitted untruncated at 22:35:00.941 UTC on October 10, 2026. Payload verification passed and transport verification was separately false. Before writing, `shasum -a 256` matched all four baselines:

| Input | SHA-256 |
| --- | --- |
| Reception plan | `599219639e9ffb83635a842a2f07c05d520942ec93e4e1a06234fd98d39151e8` |
| Independent symmetry reference | `008dbc5021740540b694b7a0b47b4e185e60b199ae82986c1476957470e4c0f9` |
| Corrected-history review adjudication | `6fc97a9485704a160280f48a3a696daed4206a88c94e89c0478eec119ba5400e` |
| Dynamics support subject | `ef2775b8b0661f3fd2f6d7ca2d61a3c5b0f1ef536fae405b3e88c975940b1383` |

## Domain, history and source-speed use

The corrected theorem supplies actual continuation with $t_E<11/10$, $t_E+1/100<111/100$, $q\in(1/5,5/12)$, $0<u<1/2$, complete thirty-root census, and no positive-delay self root. It classifies one early actual leading source, one stationary-then-preparation trailing source, and three stationary intermediate sources per receiver. It also proves $0<s_1<133/300<t_B$ and $0<\zeta=s_5+1/4<t-t_E\le1/100$ after reception. These are actual-history availability statements, not candidate-time extrapolations.

The selected source is exactly $p=-4\zeta^3+16\zeta^4$, $p'=-12\zeta^2+64\zeta^3$. It has $-1/250000<p\le0$ and $-3/2500<p'\le0$ on the admitted slice, with zero at the seam. The previously rejected fourfold polynomial is not reused. A nonzero analytical control is $p(-1/8)=-1/256$, $p'(-1/8)=-1/16$; the fourfold alternative fails both values. This preserves the independently frozen reference's normalization.

For the leading source, $s_1<133/300<9/20$. The accepted early comparison has phase below $s/4+9s^2/80$; at $s=9/20$ this is $4329/32000<1/4$. Hence the required small-phase chart for $0<q''<33q/40$ is respected, and this source remains before its own preparation boundary. Integrating from the actual release velocity gives

$$
v(s_1)<\frac14+\frac{33}{40}\left(\frac{s_1^2}{8}+\frac{3s_1^3}{80}\right)
<\frac{7006771}{25600000}<\frac7{25}.
$$

The last strict numerator margin is $7168000-7006771=161229$. No source speed is prescribed; the inequality encloses retained actual early motion. The lower bound $v\ge1/4$ follows from the same early positive acceleration.

## Reconstructed tangent lower bound

Use $x_k=k\pi/6+[P(s_k)-q]/2$, $D_k=1+P'(s_k)\cos x_k$. The chord geometry yields tangent contribution $-(-1)^k\cos x_k/(4\sin^2x_kD_k)$ and radial contribution $(-1)^k/(4\sin x_kD_k)$. Only the transmitter factor weights these terms; receiver factors enter playback only. With $R=10$, $u'=F/10$ and $\lambda=-u^2/10-N/100$.

The leading chart $1/3<x_1<\pi/6$ has $\cos x_1>6/7$, $\sin x_1<1/2$ and $D_1<32/25$. Therefore $F_1>75/112$. Static offset 4 has $|\cos x_4|=\sin(\pi/6-q/2)>\sin(3/10)>29/100$; its denominator is at most four, giving $F_4>29/400$. Offset 3 is positive. For a direct check of the negative offset 2 bound, $x_2>\pi/3-5/24>5/6$, so $\sin x_2>5/6-(5/6)^3/6=955/1296>5/7$. Consequently its magnitude is below $49/100<1/2$, independently verifying the retained weaker bound.

For the trailing term put $w=(q-p)/2$. Then $1/10<w<5/24+1/500000<21/100$. Since $\sin x_5=\sin(\pi/6+w)$ is increasing here,

$$
\sin x_5>\frac{199}{400}+\frac{599}{7000}=\frac{24489}{42000}>\frac{29}{50}.
$$

This follows from the elementary Taylor bounds $\cos(1/10)>199/200$, $\sin(1/10)>599/6000$ and $\sqrt3/2>6/7$. Its cosine magnitude is below $7/8-599/12000=9901/12000<5/6$. Since $p'\le0$ and $\cos x_5<0$, $D_5\ge1$. The magnitude of its negative tangent term is thus less than

$$
\frac{5/6}{4(29/50)^2}=\frac{3125}{5046}<\frac58.
$$

The final comparison is strict because $25000<25230$. Summing all five signs gives

$$
F>\frac{75}{112}+\frac{29}{400}-\frac12-\frac58=-\frac{67}{175}>-\frac25.
$$

This is a deceleration floor; positivity is not claimed.

## Event-speed input and uniform speed floor

The independently retained accepted event comparison is $u_F^2>U(q_F)$ with

$$
U(q)=\frac1{16}+\frac{3q^2}{10}-\frac1{200}-\frac9{100}(q-1/5),\qquad q\ge1/5.
$$

Its derivative is $3q/5-9/100>3/100$ on this domain. Since $q_F>1/5$, evaluation gives $u_F^2>139/2000$. The proposed rational square satisfies

$$
\frac{139}{2000}-\left(\frac{527}{2000}\right)^2=\frac{271}{4000000}>0.
$$

Positive speed and accepted positive drift from feedback through $t_0$ imply $u(t_0)>527/2000$. This uses the old theorem only on its old interval. On the new interval, $t_0=t_F+21/200>171/200$ and $t<111/100$, so elapsed time is below $51/200$. Integrating the newly reconstructed $u'>-1/25$ yields

$$
u>\frac{527}{2000}-\frac1{25}\frac{51}{200}=\frac{2533}{10000}.
$$

This check does not extend old monotonicity into the new motion. The speed floor survives possible negative tangent acceleration.

## Reconstructed radial interval

For the radial lower bound, the leading sine/factor floor $(13/40)(6/5)$ gives $|N_1|<25/39$. The central stationary sine is $\cos(q/2)>31/32$, giving $|N_3|<8/31$. The new trailing sine floor gives $|N_5|<25/58$. Static offset 2 has sine below $\sqrt3/2<7/8$, hence $N_2>2/7$, while $N_4\ge1/4$. Therefore

$$
N>\frac{15}{28}-\frac{25}{39}-\frac8{31}-\frac{25}{58}
>\frac{15}{28}-\frac9{14}-\frac{31}{120}-\frac{19}{44}
=-\frac{7367}{9240}>-\frac45.
$$

The replacement gaps are $1/546$, $1/3720$, and $1/1276$, respectively; the last displayed margin is $5/1848$. Their directions correctly weaken the lower bound.

For the upper bound, the leading sine/factor ceilings give $|N_1|>25/64$. The central negative magnitude is at least $1/4$. The trailing sine is below $1/2+(7/8)(21/100)<7/10$, and $D_5<1+3/2500<15/14$; hence its denominator is below three and $|N_5|>1/3$. The positive terms have $N_2<3/8$ and $N_4<7/24$: the first follows already from $\sin x_2>2/3$, the second from $\sin x_4\ge\sqrt3/2>6/7$. Thus

$$
N<\frac23-\frac{25}{64}-\frac14-\frac13=-\frac{59}{192}<0.
$$

All signs follow directly from the alternating polarity and the admitted chord chart. Consequently $N/100$ is strictly inward canonical radial acceleration throughout the existing interval. This is stronger than the prior two-sign radial enclosure and is accepted.

## Support enclosure and failed sign test

The support formula has two competing terms. From $u<1/2$ and $N<-59/192$,

$$
\lambda>-\frac1{40}+\frac{59}{19200}=-\frac{421}{19200}.
$$

From $u>2533/10000$ and $N>-7367/9240$,

$$
\lambda<\frac{7367}{924000}-\frac{6416089}{1000000000}
=\frac{359633441}{231000000000}>0.
$$

The equality checks the subject's exact positive numerator. Since $7367/924000<1/125$, the weaker upper bound is $1583911/1000000000$. A positive upper endpoint does not assert a positive value. The mathematical sign test for inward support is $u^2>-N/10$. The two independent uniform floors/ceilings give only $u^2>6416089/100000000$ against possible $-N/10$ up to $7367/92400$. They do not close that sufficient test. Their extreme endpoints need not coexist; their state correlation is an unresolved dependency, not a license to select favorable endpoints.

The old strictly inward interval through $t_0$ remains accepted. Continuity gives an unspecified inward neighborhood after that endpoint. Neither that qualitative neighborhood nor this later spanning-zero enclosure locates a zero or decides the support at reception. This precise unresolved outcome is part of the accepted result.

## Controls, preservation and completion

The independent reference predates this subject; the new projection and rational bounds above are a separate analytical reconstruction, not replay of a shared implementation. Known controls are the stationary trailing limit, nonzero correct preparation value/derivative, and the chord projection signs. The incorrect fourfold preparation is an explicit negative control. A changed source domain, failure of the early small-phase inequality, missing root, wrong transmitter or radius factor, invalid event-speed premise, or reversed rational inequality would falsify its corresponding step. The accepted early comparisons are named shared premises, with no claim that this bounded check rederived their entire historical proof lineage.

Only this new adjudication is written. The four frozen inputs are rehashed at completion, and scoped whitespace validation is `git diff --no-index --check /dev/null` on this file. Relative linked targets were directly inspected; no renderer or new link-check instrument is used. No scientific computation, evolution solver, job, process lease or extra agent was launched. All original evidence remains frozen. Cost, regeneration duration and backup recoverability remain unprofiled; local capture is not a backup assertion. No global-idleness claim is made. The bounded comparison is complete with saved evidence; root owns integration. New exploration cutoff 23:26:02 UTC and hard closeout 23:41:02 UTC remain unchanged. No successor is self-selected.
