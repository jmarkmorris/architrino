# Exact frame rotation from a Cartesian position ball

**Status: derived subject sharpening, not applied to a target.** This supplements the sufficient 2eX/m orientation allowance in [strongest-prefix transfer](authorized-cases-ten-hour-a-strongest-prefix-transfer.md). The frozen first checkpoint instrument retains its original allowance.

Let the nominal vector be $x_c$ with radius $r_c>0$, and let $|x_a-x_c|\le e<r_c$. Let $\theta$ be the smaller angle between their directions. Their dot product is positive because $x_a\cdot x_c\ge r_c(r_c-e)>0$, so $|\theta|<\pi/2$. For fixed direction of $x_a$, the point on its ray closest to $x_c$ has radius $r_c\cos\theta$ and distance $r_c|\sin\theta|$. Hence $r_c|\sin\theta|\le e$. If $Q$ aligns these directions, its Euclidean operator distance to the identity is $2|\sin(\theta/2)|$. Therefore

$$
\|Q-I\|^2\le 2-2\sqrt{1-(e/r_c)^2}.
$$

The bound is attained by either tangent ray to the error ball. It concerns a sufficient rotation allowance; the actual configuration need not attain the ball boundary. Replacing $r_c$ by a proved lower bound $m>e$ preserves the inequality.

This bound admits a rational outward certificate without trusting a floating square root. Set $\varepsilon=e/m\in[0,1)$. A proposed rational $\eta$ satisfying

$$
0\le\eta,\qquad \eta^2\le2,\qquad
\eta^2\left(1-\frac{\eta^2}{4}\right)\ge\varepsilon^2
$$

is an upper bound for $\|Q-I\|$. Indeed, the last inequality gives $(1-\eta^2/2)^2\le1-\varepsilon^2$; the middle inequality makes its left square root nonnegative, so $1-\eta^2/2\le\sqrt{1-\varepsilon^2}$. This is precisely the required squared chord bound. Candidate search may be numerical, but these three rational inequalities decide validity. For the rare case that no prescribed rational candidate below sqrt2 is selected, the old bound 2epsilon remains valid and can be retained.

An analytically known control is $x_c=(5,0)$, $x_a=(16/5,12/5)$, with radii 5 and4 and error3. Here epsilon=3/5, cosine=4/5 and the exact rotation chord squared is2/5. The candidate eta=2/3 passes because $(4/9)(1-1/9)=32/81>9/25$; eta=3/5 fails because $(9/25)(1-9/100)=819/2500<9/25$. This control simultaneously tests the geometric extremizer and the direction of the squared certificate. At zero error, eta=0 passes and the frame is unchanged.

The same sharpened eta can replace2eX/m in receiving intrinsic V/A conversion, whole-source Cartesian orientation allowances and future eta0-plus-angle accumulation, with the physical history and all Cartesian input errors fixed. Each use requires the same positive nominal radius lower bound and exact rational certificate. It does not sharpen Cartesian X/V/A themselves, transfer the old p norm, prove a new chart or close a receiving recurrence. Its falsifiers are a nonpositive radius margin, an omitted eta²<=2 sign condition, a failed squared certificate or inconsistent receiving rotations among source components.
