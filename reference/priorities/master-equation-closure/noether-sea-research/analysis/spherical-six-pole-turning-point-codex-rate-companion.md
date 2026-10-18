# Rate, signed geometry and extrema comparison

Derived October14 after the two role references froze, before root inspected any new subject motion. References read: review c6d587dde09c15205f77cc24f05011be9b6758ddd868ced4d5d6e1f8cc74aedc and support576ff7f24120e982915f515ffd7b9bf42092579f1377339e63e813abbc786b0f. Root's unchanged pre-exposure criterion effcbaec6ac4fb4f8af649598bb265c5b9f8496cf8d659214e542eee108a8ca9 is now released. This companion is an analytical comparison on declared common history, not independent trajectory evidence or a target calculation.

## Geometry without transported sign assumptions

Write source coordinate p, receiver q. On q in[1.04,1.50], p in[0,1.20], both cosines are positive and

$$M=\frac{\cos q\cos p}{\sqrt2}\left[1-\tan q\left(\tan p+\frac1{\sqrt2}\right)\right].$$

Because q>arctan(sqrt2) and p>=0, the bracket is strictly negative. This proves M<0 on the full expanded box without a subdivision computation. Likewise

$$N=\frac{\cos q\cos p}{\sqrt2}\left[1-\tan p\left(\tan q+\frac1{\sqrt2}\right)\right].$$

The zero curve and sign depend on the actual delayed p; M<0 does not prove N<0. Both role references correctly retain possible N signs. Prior negative-partial proofs must not be extended beyond their valid chart. Positive denominators need sub-wake whole-history and separation/root-existence evidence as well as this local box, not merely a positive sampled factor.

## A second support derivative from actual history rates

Let rho(q,p) be the class chord, v=p_s the source signed velocity, b=p_ss its acceleration, k=p_sss its true acceleration rate, w=q_t, a=q_tt, j=q_ttt. On an ordinary smooth root, normalized time satisfies t=s+rho(q(t),p(s(t))). Write D=1+rho_p v and u=s_t. Then

$$u=\frac{1-\rho_qw}{D},$$

$$s_{tt}=-\frac{\rho_{qq}w^2+2\rho_{qp}wvu+\rho_{pp}v^2u^2+\rho_qa+\rho_pbu^2}{D}.$$

These follow by differentiating the implicit root twice and collecting the terms proportional to s_tt. No source jerk is needed for s_tt itself. For f=rho_p evaluated along the delayed path,

$$f_t=f_qw+f_pvu,$$

$$f_{tt}=f_{qq}w^2+2f_{qp}wvu+f_{pp}v^2u^2+f_qa+f_p(bu^2+v s_{tt}),$$

$$D_t=f_tv+fbu,\qquad D_{tt}=f_{tt}v+2f_tbu+f(ku^2+b s_{tt}).$$

Thus source jerk is needed for D_tt, but not a source derivative of higher order. Along the exact root rho_t=1-u and rho_tt=-s_tt. For Z=rho D and B=1/Z,

$$Z_t=\rho_tD+\rho D_t,\quad Z_{tt}=\rho_{tt}D+2\rho_tD_t+\rho D_{tt},\quad B_{tt}=\frac{2Z_t^2}{Z^3}-\frac{Z_{tt}}{Z^2}.$$

The canonical radial second derivative is the signed class sum of B_tt with factors m_c g sigma_c/2; additional support l=-w²-r has

$$l_{tt}=-2a^2-2wj-r_{tt}.$$

Every k and j in such an enclosure must bound the TRUE acceleration rate on every touched admitted source/receiver sub-range. A third derivative of an approximate cubic, a fitted secant or a replayed stored number is insufficient. If a lookup exposes only q/v/a, extend its interface under a separately justified inclusion proof and known/negative controls before target use, or retain uniqueness unresolved. Enclose the union of rate ranges across every uncertain record origin and touched seam; differentiability and any one-sided continuity assumption need their own proof. The first-reading two-regime premise is not removed. On a source acceleration jump, use one-sided support derivatives and do not label the event a smooth zero. No new law or numerical evolution route is introduced by these identities.

## Existence and strictness

Continuity of l on an attained compact interval, a strictly negative right derivative near its earlier endpoint and strictly positive left derivative near its later endpoint imply an interior minimum by the extreme value theorem: neither endpoint can minimize. This alone does not prove a unique or strict isolated minimum; a flat minimum interval or several minima remain possible. A l_tt>0 certificate throughout the entire event neighborhood, with valid seam handling, proves the strict unique minimum there. A continuity proof and endpoint derivative sign bracket guarantee a derivative zero but also do not prove uniqueness. Keep existence, strictness, smoothness and uniqueness separate in detector/report wording. The corresponding signed-velocity criterion is unchanged; a<0 throughout a zero bracket proves a unique path maximum/speed minimum.

Known controls for a future B_tt implementation can use a prescribed fixed chord rho=rho0>0 and constant D=1: B_tt=0 exactly; prescribed rho=rho0+v0 t,D=1 gives B_tt=2v0²/rho³. These are algebra controls rather than canonical evolution or valid delay roots in every case. A separate root-consistent synthetic test is t=s+rho0 with constant rho and constant D=1, which has u=1,s_tt=0 and every Z derivative zero. A negative that omits k in D_tt must use a source with nonzero true k and f!=0; a zero-jerk case cannot detect that omission. Signed-support controls in root's frozen criterion distinguish geometric and radial terms and their opposite extremum directions. Falsifier: an admitted input satisfying the declared premises for which these derivative identities fail, or an omitted touched source-rate range changing the claimed l_tt sign.
