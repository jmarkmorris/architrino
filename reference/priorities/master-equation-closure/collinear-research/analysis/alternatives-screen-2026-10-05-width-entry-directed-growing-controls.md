# Directed growing-width successor specification and controls

The new [v6 directed instrument](../evidence/alternatives-screen-2026-10-05-width-entry-directed-v6.mjs) implements the independently assessed [monotone-width implication](alternatives-screen-2026-10-05-width-entry-growing-barriers.md) with the measured-positive [successor candidate](alternatives-screen-2026-10-05-width-entry-growing-v2-controls.md), $e(d)=\min(3/40,1/1000+3d/4)$. The v4 instrument and its three complete receipts remain unchanged.

Receiver intervals use directed enclosures of $1-e(d)$ and $1+e(d)$ in the existing complete functional evaluator. The candidate derivative bounds explicitly include the two $e'E$ terms. The rational width seam $37/375$ is enclosed by directed division; its two dyadic enclosure endpoints split the receiver partition. The tiny middle interval uses the whole derivative interval $e'\in[0,3/4]$, thereby requiring both one-sided derivative inequalities without equating the rational seam with a rounded number.

Preparation coefficient coverage uses the narrowest width $e(0)=1/1000$, giving a sufficient strict sandwich throughout the original prepared segment. The tiny prepared collar is compared with that narrower pair as well. Generated-collar speed and elapsed-time checks use the actual variable width. The fixed $0.99/1.03$ bounds from the [collar lemma](alternatives-screen-2026-10-05-width-entry-seam-collar.md) are sharpened by retaining the actual directed collar maximum $d_{\max}$ in its identical proof:

$$
\frac{1-d_{\max}}{(1+\rho^2)^2}\le u'\le\frac1{(1-d_{\max})^2}+\frac{d_{\max}}{2(1-10^{-3})\rho^3}.
$$

The code compares both corrected candidate derivatives directly with these bounds. The geometric requirements $d_{\max}<10^{-7}$, $m<10^{-3}$ and collar traversal time $<10^{-6}$ remain enforced, so the complete partner band remains held and the self half-window argument is unchanged. These sharper numerical constants are necessary because the initial band is only one-tenth of a percent wide.

Before any target application, source hash `4a15fa25add026e4752ff2f7a7ad5e00d3dbd0598e900b229af12485b9a6d9b6` passed its full independent arithmetic/affine controls and new growing-derivative polynomial controls at 15:17:42 UTC. Measured runtime was 0.168 seconds, final RSS 107102208 bytes. The local receipt is `width-entry-directed-v6-controls/receipt.json` beneath the campaign's retained local evidence owner. Frozen v5 and its controls are preserved as a pre-target draft; an audit corrected its elapsed-time and speed checks to use the growing width rather than the narrower preparation coefficient factors. No v5 target was applied.

The proposed first fourth-law target uses 256 travel subdivisions per original segment, source subdivisions $1,2,4,8,16,32$, receiver bisection depth at most 8, a 600-second instrument limit and a 630-second supervisor limit. Any unresolved or unvisited interval prevents a certificate. The source and mathematical reference are frozen before that target.

> Grade: proposed directed implementation with measured known-first control pass. Its mathematical extension and complete finite checks require independent assessment before a new complete certificate is promoted.
