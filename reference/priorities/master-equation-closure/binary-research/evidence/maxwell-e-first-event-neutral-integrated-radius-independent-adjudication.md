# Independent simultaneous radius comparison assessment

Status: derived admission of the prospective comparison rule, 2026-10-05, under the Moore lens. The scalar derivation and simultaneous first-exit argument were frozen in the coordinator handoff before reading the subject theorem, helper, driver or recurrence reference. This note records that derivation and the separately disclosed implementation comparison. The original E equation, complete preparation, source census, delayed physical acceleration and stopping premise are unchanged.

## Independent derivation

On one receiving cell of length $h$, fix a positive metric $\nu$ and independently prescribed positive trials $W_{\rm tr},R_{\rm tr},U_{\rm tr}$. All complete coefficient, root and source families must be computed on these trials before deriving any improved receiving bound. Let $\rho=r_a-r_c$, let $z$ be the intrinsic transformed-velocity difference, and set $w=|(\nu\rho,z)|$. On the simultaneous trial domain, the admitted signed-current comparison gives a whole-cell upper bound $\widehat W$ and a separate endpoint bound.

Intrinsic radius differentiation and the sequential q decomposition imply

$$
\rho'=z_r-\delta q_r,\qquad
|\delta q_r|\le L|\rho|+f_r,\qquad
D^+|\rho|\le w+L|\rho|+f_r,
$$

where $L=\sup|Q_r|\ge0$ and $f_r=f_{q,r}\ge0$ are whole-family bounds. Up to any possible first exit, the running radius supremum therefore satisfies

$$
R\le R_0+h(\widehat W+LR+f_r).
$$

If $1-hL>0$, positive scalar inversion yields

$$
R_{\rm int}=\frac{R_0+h(\widehat W+f_r)}{1-hL},\qquad
\widehat R=\min(\widehat W/\nu,R_{\rm int}).
$$

Both entries in this minimum bound the same whole-cell radius error. A preceding whole-cell radius bound is a valid $R_0$ because it includes the incoming endpoint. The improved physical velocity bound is

$$
\widehat U=\widehat W+C_q\widehat R+f_q.
$$

If $\widehat W<W_{\rm tr}$, $\widehat R<R_{\rm tr}$ and $\widehat U<U_{\rm tr}$ simultaneously, continuity rules out a first exit through any of the three faces. All estimates used before that hypothetical exit were computed on the prescribed domain. This proves the absence of circular use of a smaller receiving ball. There is no requirement that $R_{\rm tr}=W_{\rm tr}/\nu$.

The scalar inverse is one sufficient closure. A separate Gronwall alternative, not required by the subject, is

$$
R\le e^{Lh}R_0+\phi(L,h)(\widehat W+f_r),\qquad
\phi(L,h)=\int_0^h e^{Ls}\,ds.
$$

Thus a nonpositive scalar-inverse denominator is a limitation of that sufficient method, not a physical event or failure of all radius comparisons.

At a metric change, the state changes by the diagonal map with entries $\nu_{\rm new}/\nu_{\rm old},1,1$. Its operator norm is $\max(1,\nu_{\rm new}/\nu_{\rm old})$, so the previous admitted W endpoint must still receive this factor. Improving the separate radius bound does not justify discarding or reinterpreting the endpoint W bound.

## Subject inspection and exact controls

After freezing the preceding reasoning, full read of the subject theorem/helper and inspection of the driver/reference radius paths found the same argument implemented. The driver constructs root, source and signed-current families with prescribed trialR and trialU; retains the old trialOmega; computes the scalar inverse using whole-cell rawW, the signed Qr interval's absolute upper bound and the radial q remainder; requires all three strict inequalities; and rebuilds families after enlarging failed trials.

The accepted rawR enters full physical U, both physical velocity components, original E acceleration and its components, stored radial error, and retained angular density. Future source inventories receive the stored whole-cell radius. Current source windows and physical E coefficient families remain based on the prescribed trials, not the smaller result. The previous endpoint W and metric-jump rule are unchanged. The recurrence reference independently recomputes the positive denominator, inverse, minimum, strict radius condition and subsequent physical conversions.

Known arithmetic controls were executed before subject helper calls. For $R_0=1/4$, $\widehat W=3$, $\nu=2$, $Q_r\in[-2,1]$, $f_r=1$ and $h=1/8$, the exact denominator is $3/4$, inverse is $1$, norm radius is $3/2$, and retained radius is $1$. Replacing Qr by the point $-2$ gives the same conservative inverse; changing $\nu$ to four activates the norm cap $3/4$; zero duration returns $1/4$. Subject calls passed these independently chosen controls and rejected zero denominator and zero metric. Arithmetic metric-jump controls gave $5\max(1,3/2)=15/2$ and $5\max(1,2/3)=5$.

No target trajectory, receipt audit or Python target execution was performed for this assessment. The existing independent geometry obligation for the whole-cell nominal tangential bound remains: the recurrence reference reads that bound as supplied data. Mathematical admission of this radius rule does not replace complete coefficient, source-window, domain and defect audits.

| Inspected subject | SHA-256 |
| --- | --- |
| integrated-radius-theorem.md | a6d5af40cc93cc2ac287030c571e528196d8eadee9350de2d3fa532cbb0b9fc5 |
| integrated-radius.mjs | fa77c4f7cf66f7e666b3f224c79053fad281ea53d96969576559bf395741cf64 |
| integrated-radius-run.mjs | 4ec9b7f57671dd85b01f2e508d8bd0b10188a47060d36f67a9aac081b85f3734 |
| integrated-radius-reference.py | 9378d75a0566201f06d9e66b17d2262780e12b02acd97a1e3cfe1055d697ffb0 |

Falsifiers are a q remainder not enclosing the intrinsic radial component, use of endpoint W for a whole-cell estimate, a current family silently built on the improved radius before its first-exit closure, omission of any strict trial inequality, lost complete source bins or delayed acceleration, or an incorrect metric jump. No event, contraction, stability or binding claim follows from this comparison sharpening.
