# Spherical curvature coverage, wave 17: the six poles at g = 1/10 continued across the like-image reading

Author: Claude specialist "spherical-curvature coverage" (jack-k-hale), for the Claude PI of the operator-selected spherical 3:3 Master Equation investigation. Written 2026-10-11 between 05:03 and the save stamp at the end of this file (UTC, read with `date -u`). Frozen on handback; corrections only as dated companions. Waves 1 to 16 are frozen and unchanged (wave 16: sha256 9fe979a4...).

Law and conventions as in every prior wave: sphere of radius R = 1, canonical all-root acceleration, c_f = 1, K = 1, radial part discarded, prescribed histories are input, no integrator of any kind. All intervals are outward-rounded mpmath `iv` enclosures at 30 digits; every enclosure in the JSON records contains the exact value under the stated premises. Intervals are quoted here by truncating both endpoints to the digits shown (quoted upper ends may sit below the stored upper ends by less than one unit in the last quoted digit); the exact endpoints are the 25-digit strings in the JSON files. Grades: derived, measured-with-enclosure, inferred; falsifiers stated per claim. Every moving-source value is labelled **unadjudicated pending the reviewer's moving-source/pole great-circle reference**.

## 0. Result in plain words

Starting from the wave-16 certified state at t = T* + 0.10 (t in [1.466684593623, 1.466684709182], q in [0.1078360786, 0.1078365557], speed in [0.1474868323, 0.1474914818]), the six-pole motion at g = 1/10 was continued by the interval method of steps with both classes of moving sources: the two nearest electrinos E2, E3 (approaching, transmitter factor below one, wave 16) and, from their reading time t_like inside the first step on, the two positrinos P2, P3 (receding along their own meridians, transmitter factor above one, repulsive hits). The fixed plan of forty steps of Delta = 0.01 ran to completion with every step certified (closure at the first inflation, sub-wake, both roots unique, both delay containments asserted, both transmitter factors positive, the antipode -e1 unread). The certified reached time is

- t in [1.866684593623, 1.866684709182] (= T* + 0.50), with q in [0.1750516801, 0.1750567637] and speed q' in [0.1887244343, 0.1887427709];
- the feedback accelerates in total: at that time the fixed-image reduction's speed is in [0.1885271003, 0.1885272398], and the enclosed speed exceeds it by an excess in [1.97194e-4, 2.15671e-4] (the enclosed q exceeds the reduction's q, in [0.1750142375, 0.1750144915], by [3.7189e-5, 4.2526e-5]);
- split into the two classes (four runs from the same start state, all forty steps certified as reductions): the unlike (approaching) class alone raises the speed by [3.68922e-4, 4.04956e-4], the like (receding) class alone lowers it by [1.77578e-4, 2.01878e-4], the two together by [1.81058e-4, 2.13399e-4]; the sum of the two single-class effects, [1.67044e-4, 2.27379e-4], contains the joint effect, so no cross term is resolved at this width;
- exact stop: the plan was exhausted (forty steps certified); no certification condition failed. The next premise boundary is the reading of the antipode -e1, whose chord at the reached state is above 1.9923 and whose residual is still positive by more than 0.125.

## 1. Assignment and boundaries

Wave-17 assignment (PI): the last bounded extension of the weak-coupling continuation: extend the six-pole steps at g = 1/10 across t_like in [1.46704, 1.46775] by adding the like images' moving-source terms (receding sources along their own meridians, transmitter factor above one, repulsive hits), derived with the same care as the unlike terms; fixed plan of at most forty further steps of 0.01; certification extended to the like images' root uniqueness and to the antipode staying fixed; controls: continuity of the right-hand side at t_like, wrong-sign probe for the like term, fixed-image continuation; report the certified reached time, position and speed, the feedback sign relative to the fixed-image reduction (split into the two classes if cheap) and the exact stop. Grade as before.

Boundaries kept: writes only under the coverage prefix; no edit of any frozen file; no git write command; nothing deleted, overwritten or moved; the one script edit after a run was preceded by a version copy (section 7); no integrator; foreground runs under 120 s, pinned, with PID, `/usr/bin/time -p` and the internal alarm in the receipt from the first command; the compute slot is held.

## 2. Derivation of the like-image terms (grade: derived)

Paths and symmetry as in wave 16: P1 on X1(q) = cos q e1 - sin q (e2 + e3)/sqrt2 with T1 = dX1/dq; P2 on X2(q) = cos q e2 - sin q (e3 + e1)/sqrt2, P3 likewise; electrinos on -Xi; the order-12 symmetry gives every member the same q(t). Write sigma = +1 for the unlike source E2 = -X2(q') (wave 16) and sigma = -1 for the like source P2 = +X2(q'), q' = q(t - tau) the source's arc coordinate at its emission time. Then, with X1(q).X2(q') = -sin(q + q')/sqrt2 + sin q sin q'/2 and T2(q').X1(q) = -M, M = cos(q + q')/sqrt2 - sin q cos q'/2, and T1(q).X2(q') = -N, N = cos(q + q')/sqrt2 - cos q sin q'/2:

- receiver-minus-emitter vector r = X1(q) + sigma X2(q'), r^2 = 2 - sigma sqrt2 sin(q + q') + sigma sin q sin q'; for the like source r^2 = 2 + sqrt2 sin(q + q') - sin q sin q', which at q' = 0 is the fixed like chord sqrt(2 + sqrt2 sin q). Root condition tau = r(q(t), q(t - tau)).
- source velocity: the like source P2 moves on its own great circle with velocity +v' T2(q'), v' = q'(t - tau) (the unlike source with -v' T2). Since T2.X2 = 0, V.r = sigma v' M, so V.rhat = sigma v' M/r and the transmitter factor is D_t = 1 - sigma v' M/r: for the like source D_t = 1 + v' M/r > 1 (receding, M > 0 on the range reached: it starts at 1/sqrt2 and is about 0.61 at q = 0.17), for the unlike source D_t = 1 - v' M/r < 1 (approaching).
- tangential hit on P1: sigma_hit (T1.r)/(r^3 D_t) with sigma_hit = +1 for the like (repulsive) and -1 for the unlike (attractive) source; T1.r = sigma T1.X2(q') = -sigma N, so the hit is sigma_hit (-sigma) N/(r^3 D_t) = N/(r^3 D_t) for both classes (sigma_hit sigma = -1 in both). At q' = 0, v' = 0 each reduces to cos q/(sqrt2 r_fixed^3), the wave-14 fixed-image term of that class: the right-hand side is continuous at each reading instant (the like reading at t_like, the unlike at T*).
- root uniqueness: h(tau) = tau - r(q(t), q(t - tau)) has dh/dtau = 1 + (dr/dq') v' = 1 - V.rhat = D_t > 0 for either class whenever the source is sub-wake (dr/dq' = -sigma M/r is checked from the explicit partial derivative); so each class has exactly one root, found by bisection on the sign of h. For the like class D_t > 1, so uniqueness holds with margin.
- post-reception law with both classes: q'' = g [F(q) - 2 aU_fixed(q) - 2 aL_fixed(q) + 2 N/(rU^3 DU) + 2 N/(rL^3 DL)], each class with its own delay tauU, tauL and its own delayed state; the fixed-image terms are aU_fixed = cos q/(sqrt2 (2 - sqrt2 sin q)^(3/2)), aL_fixed = cos q/(sqrt2 (2 + sqrt2 sin q)^(3/2)).
- the affine model's derivative: for each class da/dt = a_q q' + a_q' v' (1 - tau') + a_v' q''(t - tau) (1 - tau'), tau' = (r_q q' + r_q' v')/(1 + r_q' v'), with r_q = sigma(-sqrt2 cos(q + q') + cos q sin q')/(2r), r_q' = sigma(-sqrt2 cos(q + q') + sin q cos q')/(2r), D_q = -sigma v'(M_q r - M r_q)/r^2, D_q' likewise, D_v' = -sigma M/r, and the quotient rule for N/(r^3 D); the script carries every partial derivative explicitly with the sign sigma.
- antipode: chord 2 cos(q/2), residual 2 cos(q(t)/2) - t strictly decreasing sub-wake, so -e1 stays fixed over a step iff the residual at the step end is positive; expected reading near t = 2 (the residual at the reached state is about 0.126).

The like reading instant is handled without a separate start: the history is at rest for delayed arguments below release, so the moving-source formula with the enclosed history reduces exactly to the fixed-image term before t_like (the root is then the fixed chord), and the step whose like delayed range reaches across the release carries the hull of the two regimes (the acceleration hull includes 0: the psi'' hull repair). Step 1 is that step.

## 3. Method

History: the window enclosure at g = 1/10 (frozen wave-14/15 machinery executed in-process, q up to 0.3, N = 4000 cells in u = sqrt q) and its end T*, reproduced bit for bit from wave 16 (the run records `T_star_reproduces_wave16: true` by string equality with the frozen wave-16 JSON). All delayed arguments stay inside the window (the largest is about 0.55 for the unlike class and 0.37 for the like class, both far below T*), so the window enclosure is the whole history for the plan.

Start state: the end of wave-16 step 10, read from the frozen run-2 JSON: t0 = [1.466684593623, 1.466684709182], q0 = [0.1078360786, 0.1078365557], q'0 = [0.1474868323, 0.1474914818].

Node lookup: the frozen `q_of_t` scans the 4000 nodes linearly; the wave-17 script uses a bisection lookup with the same formulas and verifies, as control (0), that both return identical interval endpoints on sixty sample times (pass in every run).

Step: as in wave 16 (candidate sets, affine remainder, closure at most ten inflations, no adaptation) with one delay enclosure per moving class: tau0 by bisection with two-sided refinement; tau over the step by the fixed-point iteration from tau0 + [-1, 0.5] Delta with the containment assertion before use; history hulls over t_int - tau_range for each class; D_t positive at t0 and over the step for each class; the fixed-image terms of the moving classes subtracted and the delayed terms added. Certification: closure, up(speed) < 1 (sub-wake, hence root uniqueness for both classes and no self roots by the sphere theorem), both containments, both D_t ranges positive, antipode residual positive at the step end.

Modes: `full` (both classes moving; the physical continuation), `unlike` (like class held at its fixed-image value), `like` (unlike class held fixed), `fixed` (both held fixed). The three reduction modes are mathematical reductions started from the same state; their held classes are modelling premises and the record keeps the premise's chord condition (`reduction_premise_holds`, false for the like class from step 1 on, as it must be) separately from the certification. The `fixed` mode is the fixed-image law started from the feedback-shifted wave-16 state, so it differs from the reduction's own enclosure (the window enclosure continued) by the propagated wave-16 offset; the comparison with the reduction itself uses the window enclosure, the split uses the four runs.

Controls before target (all pass in every run): (0) node lookup equality; (1) continuity of the like term at its reading instant: the like hit with zero delayed state intersects (here equals) the fixed-image like term at the start state, hit in [0.2226529369, 0.2226530525], D_t = 1; (2) negative, like term: at the probe t0 + 0.08 (like history speed [0.00734104, 0.00738897], tau in [1.4727988, 1.4732744]) the correct hit is in [0.21876062, 0.21900667] with D_t in [1.00319782, 1.00322267], the wrong-sign hit in [0.22016968, 0.22041735] with D_t in [0.99677732, 0.99680217]: disjoint; (3) the fixed-image affine step from t = 1.2 intersects (nests in) the window enclosure at 1.21 (q [0.0733281287, 0.0733282832] versus [0.0733281157, 0.0733282891]; q' [0.1214262652, 0.1214265176] versus [0.1214263682, 0.1214265126]).

Plan as stated before the runs: at most forty steps of Delta = 0.01 from the wave-16 end state; stop at the first uncertified step; no adaptation. Validation runs at N = 500 (full, six steps; unlike, three steps) preceded the final N = 4000 runs of forty steps in the four modes.

## 4. Results (grade: measured-with-enclosure; moving-source values unadjudicated)

Full run, forty certified steps (t_end rounded up to eight decimals; DU, DL the transmitter factors at the step start; q, q' at the step end; "reduction" the fixed-image reduction's speed at the same time from the window enclosure; the sign is "above" at every step; the last column is the lower bound of the antipode chord at the step end):

| step | t_end | DU(t0) | DL(t0) | q(t_end) | q'(t_end) | reduction q' | antipode |
|---|---|---|---|---|---|---|---|
| 1 | 1.47668471 | [0.99485910, 0.99485927] | [1.0, 1.0] | [0.1093160547, 0.1093165795] | [0.1485083838, 0.1485133963] | [0.1484948316, 0.1484949840] | 1.99701 |
| 2 | 1.48668471 | [0.99434616, 0.99434629] | [1.0, 1.00088303] | [0.1108062474, 0.1108068253] | [0.1495301640, 0.1495358622] | [0.1495139135, 0.1495140545] | 1.99693 |
| 3 | 1.49668471 | [0.99383344, 0.99383355] | [1.0, 1.00098593] | [0.1123066609, 0.1123072990] | [0.1505525389, 0.1505589765] | [0.1505333225, 0.1505334522] | 1.99685 |
| 4 | 1.50668471 | [0.99332098, 0.99332107] | [1.00120966, 1.00120998] | [0.1138173009, 0.1138180043] | [0.1515754567, 0.1515821714] | [0.1515530599, 0.1515532034] | 1.99676 |
| 5 | 1.51668471 | [0.99280870, 0.99280890] | [1.00161436, 1.00161474] | [0.1153381723, 0.1153389438] | [0.1525988313, 0.1526058248] | [0.1525731473, 0.1525732798] | 1.99668 |
| 6 | 1.52668471 | [0.99229675, 0.99229693] | [1.00201717, 1.00201758] | [0.1168692798, 0.1168701222] | [0.1536226645, 0.1536299387] | [0.1535935691, 0.1535937153] | 1.99659 |
| 7 | 1.53668471 | [0.99178507, 0.99178524] | [1.00241828, 1.00241842] | [0.1184106279, 0.1184115440] | [0.1546469584, 0.1546545150] | [0.1546143523, 0.1546144875] | 1.99650 |
| 8 | 1.54668471 | [0.99127368, 0.99127385] | [1.00281729, 1.00281748] | [0.1199622213, 0.1199632139] | [0.1556717151, 0.1556795561] | [0.1556354758, 0.1556356247] | 1.99640 |
| 9 | 1.55668471 | [0.99076259, 0.99076275] | [1.00321435, 1.00321458] | [0.1215240646, 0.1215251365] | [0.1566969367, 0.1567050641] | [0.1566569723, 0.1566571105] | 1.99631 |
| 10 | 1.56668471 | [0.99025181, 0.99025197] | [1.00360946, 1.00360970] | [0.1230961624, 0.1230973166] | [0.1577226255, 0.1577310414] | [0.1576788154, 0.1576789671] | 1.99621 |
| 11 | 1.57668471 | [0.98974136, 0.98974152] | [1.00400268, 1.00400277] | [0.1246785194, 0.1246797588] | [0.1587487838, 0.1587574903] | [0.1587010432, 0.1587011843] | 1.99611 |
| 12 | 1.58668471 | [0.98923124, 0.98923141] | [1.00439384, 1.00439396] | [0.1262711404, 0.1262724678] | [0.1597754140, 0.1597844134] | [0.1597236382, 0.1597237689] | 1.99602 |
| 13 | 1.59668471 | [0.98872147, 0.98872165] | [1.00478299, 1.00478313] | [0.1278740301, 0.1278754485] | [0.1608025187, 0.1608118131] | [0.1607466012, 0.1607467453] | 1.99591 |
| 14 | 1.60668471 | [0.98821207, 0.98821225] | [1.00517011, 1.00517028] | [0.1294871932, 0.1294887055] | [0.1618301003, 0.1618396922] | [0.1617699551, 0.1617700890] | 1.99581 |
| 15 | 1.61668471 | [0.98770304, 0.98770323] | [1.00555521, 1.00555538] | [0.1311106345, 0.1311122438] | [0.1628581614, 0.1628680533] | [0.1627936834, 0.1627938306] | 1.99570 |
| 16 | 1.62668471 | [0.98719444, 0.98719457] | [1.00593824, 1.00593844] | [0.1327443588, 0.1327460681] | [0.1638867050, 0.1638968991] | [0.1638178150, 0.1638179521] | 1.99560 |
| 17 | 1.63668471 | [0.98668620, 0.98668635] | [1.00631922, 1.00631942] | [0.1343883710, 0.1343901832] | [0.1649157335, 0.1649262326] | [0.1648423274, 0.1648424777] | 1.99549 |
| 18 | 1.64668471 | [0.98617839, 0.98617855] | [1.00669816, 1.00669827] | [0.1360426759, 0.1360445942] | [0.1659452501, 0.1659560565] | [0.1658672559, 0.1658673963] | 1.99537 |
| 19 | 1.65668471 | [0.98567101, 0.98567118] | [1.00707496, 1.00707508] | [0.1377072784, 0.1377093058] | [0.1669752573, 0.1669863738] | [0.1668925851, 0.1668927157] | 1.99526 |
| 20 | 1.66668471 | [0.98516409, 0.98516428] | [1.00744964, 1.00744977] | [0.1393821835, 0.1393843231] | [0.1680057583, 0.1680171876] | [0.1679183165, 0.1679184602] | 1.99514 |
| 21 | 1.67668471 | [0.98465764, 0.98465784] | [1.00782220, 1.00782233] | [0.1410673961, 0.1410696511] | [0.1690367561, 0.1690485009] | [0.1689444720, 0.1689446061] | 1.99503 |
| 22 | 1.68668471 | [0.98415170, 0.98415187] | [1.00819260, 1.00819275] | [0.1427629211, 0.1427652947] | [0.1700682537, 0.1700803168] | [0.1699710363, 0.1699711834] | 1.99491 |
| 23 | 1.69668471 | [0.98364624, 0.98364642] | [1.00856085, 1.00856101] | [0.1444687637, 0.1444712589] | [0.1711002542, 0.1711126385] | [0.1709980381, 0.1709981757] | 1.99478 |
| 24 | 1.70668471 | [0.98314130, 0.98314150] | [1.00892692, 1.00892708] | [0.1461849288, 0.1461875490] | [0.1721327608, 0.1721454693] | [0.1720254554, 0.1720256059] | 1.99466 |
| 25 | 1.71668471 | [0.98263690, 0.98263713] | [1.00929080, 1.00929097] | [0.1479114215, 0.1479141699] | [0.1731657768, 0.1731788125] | [0.1730533238, 0.1730534650] | 1.99453 |
| 26 | 1.72668471 | [0.98213309, 0.98213329] | [1.00965248, 1.00965265] | [0.1496482469, 0.1496511267] | [0.1741993053, 0.1742126712] | [0.1740816287, 0.1740817607] | 1.99440 |
| 27 | 1.73668471 | [0.98162982, 0.98163004] | [1.01001193, 1.01001210] | [0.1513954101, 0.1513984248] | [0.1752333498, 0.1752470490] | [0.1751103704, 0.1751105153] | 1.99427 |
| 28 | 1.74668471 | [0.98112716, 0.98112741] | [1.01036914, 1.01036932] | [0.1531529165, 0.1531560693] | [0.1762679135, 0.1762819491] | [0.1761395733, 0.1761397091] | 1.99414 |
| 29 | 1.75668471 | [0.98062514, 0.98062537] | [1.01072410, 1.01072428] | [0.1549207710, 0.1549240654] | [0.1773029998, 0.1773173751] | [0.1771692199, 0.1771693685] | 1.99400 |
| 30 | 1.76668471 | [0.98012374, 0.98012399] | [1.01107679, 1.01107697] | [0.1566989791, 0.1567024184] | [0.1783386121, 0.1783533303] | [0.1781993420, 0.1781994817] | 1.99386 |
| 31 | 1.77668471 | [0.97962300, 0.97962328] | [1.01142719, 1.01142737] | [0.1584875459, 0.1584911336] | [0.1793747539, 0.1793898184] | [0.1792299273, 0.1792300583] | 1.99372 |
| 32 | 1.78668471 | [0.97912297, 0.97912324] | [1.01177529, 1.01177548] | [0.1602864768, 0.1602902163] | [0.1804114287, 0.1804268427] | [0.1802609779, 0.1802611215] | 1.99358 |
| 33 | 1.79668471 | [0.97862363, 0.97862392] | [1.01212108, 1.01212127] | [0.1620957772, 0.1620996720] | [0.1814486399, 0.1814644068] | [0.1812925151, 0.1812926502] | 1.99343 |
| 34 | 1.80668471 | [0.97812504, 0.97812532] | [1.01246450, 1.01246480] | [0.1639154523, 0.1639195061] | [0.1824863910, 0.1825025143] | [0.1823245247, 0.1823246724] | 1.99329 |
| 35 | 1.81668471 | [0.97762718, 0.97762750] | [1.01280562, 1.01280586] | [0.1657455077, 0.1657497240] | [0.1835246855, 0.1835411688] | [0.1833570361, 0.1833571753] | 1.99314 |
| 36 | 1.82668471 | [0.97713012, 0.97713046] | [1.01314436, 1.01314461] | [0.1675859488, 0.1675903311] | [0.1845635271, 0.1845803739] | [0.1843900388, 0.1843901696] | 1.99298 |
| 37 | 1.83668471 | [0.97663387, 0.97663420] | [1.01348073, 1.01348097] | [0.1694367810, 0.1694413331] | [0.1856029192, 0.1856201330] | [0.1854235352, 0.1854236786] | 1.99283 |
| 38 | 1.84668471 | [0.97613846, 0.97613879] | [1.01381470, 1.01381495] | [0.1712980099, 0.1713027354] | [0.1866428654, 0.1866604498] | [0.1864575461, 0.1864576812] | 1.99267 |
| 39 | 1.85668471 | [0.97564388, 0.97564425] | [1.01414626, 1.01414651] | [0.1731696411, 0.1731745438] | [0.1876833693, 0.1877013279] | [0.1874920581, 0.1874922057] | 1.99251 |
| 40 | 1.86668471 | [0.97515022, 0.97515058] | [1.01447539, 1.01447564] | [0.1750516801, 0.1750567637] | [0.1887244343, 0.1887427709] | [0.1885271003, 0.1885272398] | 1.99234 |

Delays: the unlike delay falls from [1.3590583083, 1.3590585746] (step 1) to [1.3185839054, 1.3185866245] (step 40); the like delay rises from the fixed chord [1.4670405071, 1.4670407357] at step 1 (source not yet read at the step start) to [1.5004724647, 1.5004747430] at step 40. Over the whole plan the unlike transmitter factor ranges over [0.974596, 0.994867] and the like one over [1.000000, 1.014887]; every step closed at the first inflation with both containments asserted; the largest speed upper end is 0.18874; the smallest antipode chord at a step end is 1.99234 (residual above 0.125).

The crossing of the like reading (step 1): the like delayed range t_int - tau_range reaches from below the release to 0.0097 after it (history q hull [0, 2.1566e-5], q' hull [0, 0.00207678], D_t range [1, 1.00091923]); the like hit at the step start equals its fixed-image value, [0.2226529369, 0.2226530525]. At step 2 the like source has been read: tau0 in [1.4677487342, 1.4677592857], D_t(t0) in [1, 1.00088303], consistent with the wave-16 bracket t_like in [1.4670405072, 1.4677497282] (the like delay at the step-1 start equals the fixed chord, so t_like > 1.4666847; the step-2 start reads an emission after release, so t_like < 1.4766847, and the step-1 like tau_range upper end 1.4677728 bounds the reading from above).

Certified reached time: t in [1.866684593623, 1.866684709182]. Enclosed state there: q in [0.1750516801, 0.1750567637], speed in [0.1887244343, 0.1887427709] (P1 at cos q e1 - sin q (e2 + e3)/sqrt2 with cos q about 0.98472 and sin q/sqrt2 about 0.12318; the exact enclosure is the q interval). Width of the speed enclosure after fifty steps from T*: 1.8e-5, growing about 4.5e-7 per step as in wave 16.

Feedback sign and split at the reached time (speeds; lower = lower end of the first minus upper end of the second, upper likewise):

| run (all from the same start state) | speed at t = 1.8666847 | minus the reduction (window enclosure) | minus the `fixed` run |
|---|---|---|---|
| full (both classes moving) | [0.1887244343, 0.1887427709] | [1.97194e-4, 2.15671e-4] above | [1.81058e-4, 2.13399e-4] |
| unlike only moving | [0.1889122978, 0.1889343283] | [3.85058e-4, 4.07228e-4] above | [3.68922e-4, 4.04956e-4] |
| like only moving | [0.1883414979, 0.1883517941] | [-1.85742e-4, -1.75306e-4] below | [-2.01878e-4, -1.77578e-4] |
| fixed (both held fixed) | [0.1885293719, 0.1885433759] | [2.132e-6, 1.6276e-5] above (the propagated wave-16 offset) | 0 |

The approaching electrinos accelerate P1 (transmitter factor below one and a shorter delayed distance than the fixed chord), the receding positrinos retard it (transmitter factor above one and a longer delayed distance), the first effect is about twice the second at this time, and the net feedback accelerates. The sum of the two single-class effects, [1.67044e-4, 2.27379e-4], contains the joint effect [1.81058e-4, 2.13399e-4]: no cross term is resolved at the present widths (grade inferred for the absence of a cross term; the containment is measured). Position: the full run's q exceeds the reduction's by [3.7189e-5, 4.2526e-5].

Exact stop: the plan was exhausted at step 40 with every certification condition satisfied; the stop is the plan bound, not a premise boundary. The next premise boundary is the antipode reading near t = 2: its residual 2 cos(q/2) - t at the reached state is above 0.125 and decreases at the rate 1 + sin(q/2) q', below 1.02 while the speed stays below 0.2, so the reading lies beyond t = 1.98 on that premise (inferred; the plan does not cover it).

## 5. Controls

All pass in the two validation runs and in all four final runs: (0) node-lookup equality on sixty times; (1) continuity of the like term at its reading instant; (2) wrong-sign probe for the like term (disjoint by 0.0012 against enclosure widths of 0.00025); (3) fixed-image continuation. Section 3 gives the numbers. The unlike class's own continuity and wrong-sign controls are those of wave 16 (frozen) and were not repeated.

## 6. Grading and falsifiers

- Derived: section 2 (root equation, transmitter factor, hit, uniqueness, continuity, the antipode criterion, the derivative formulas) for both classes with the common sign sigma. Falsifier: an algebraic error in X1.X2, T1.X2, T2.X1 or the quotient-rule derivatives; the script carries the formulas verbatim with the sign and an independent re-derivation would expose one.
- Measured-with-enclosure: T* and its reproduction, the forty step enclosures, the reached time, position and speed, the feedback excess over the reduction, the four-run split and the containment of the joint effect in the sum. Premises: directed rounding of the listed mpmath operations; the frozen wave-14/15 family, first integral and enclosure; the affine model's remainder form; the fixed plan; the wave-16 start state. Falsifier: a point evaluation of the true solution by any method the reviewer accepts outside any quoted interval, or a second interval implementation disagreeing.
- Inferred: the mechanism attribution (approach accelerates, recession retards) and the absence of a resolved cross term. Falsifier for the first: a run with the velocity term removed but the delayed positions kept, or the reverse, whose effect does not fall on the stated side; for the second: narrower enclosures (smaller Delta or a sharper remainder) exhibiting a joint effect outside the sum of the single-class effects.
- Not independent evidence: the four runs share the script and the history; the validation runs replay the same code at N = 500.
- Unadjudicated: every moving-source value pending the reviewer's moving-source/pole great-circle reference.

## 7. Provenance, receipts, preservation

Receipt: `/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-curvature-claude-coverage-wave17-commands.txt` (every run: UTC start, cwd, literal command with the thread pin, `/usr/bin/time -p` and the perl alarm of 110 s, PID, exit status, wall/user/sys). Runs: val-full (N = 500, six steps, 6.2 s), val-unlike (N = 500, three steps, 3.4 s), N4000-full (48.3 s), N4000-unlike (30.2 s), N4000-like (29.2 s), N4000-fixed (12.9 s), split (0.1 s). All foreground, one at a time, under the alarm.

Script versions: the step script was edited once after a run (val-full); before that edit the exact bytes were copied to `-v1.py` (retained; it differs from the final script only in the certification treatment of a held class in the reduction modes, which the final script records as a premise instead of a certification failure, and in a comment line). The val-full output was produced by v1; every other output by the final script. Nothing was deleted, overwritten or moved among retained outputs.

Evidence files (all under `/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/noether-sea-research/evidence/`, prefix `spherical-curvature-claude-coverage-wave17-`), sha256 at handback:

- `sixpole-steps2-iv.py` (final): bdb469852c1bb21a819750fbeccd3530d695959cdbdb1b81f3d3ebc11b4afef9; `sixpole-steps2-iv-v1.py`: 0d1a86b2279d7d26f079a700a12424f8a71f450ab09941ea2c0566c623f7ae7a
- `sixpole-steps2-iv-N4000-full.json` / `.out` / `.out.time`: 0d4743a080f53a22d40382d3ca38ceaede737bba942713b9ae5addcaedcb4c9d / 71bb785551e3be71d0ca18ab877d489cae01a6b3faec6d39ef950eb29bdc141d / 98a9e1d7eea49ad5a7e3bc1d7ba1216e2d0b333d9068be5c27fcfab3cf0051ef
- `sixpole-steps2-iv-N4000-unlike.json` / `.out` / `.out.time`: 9dc7c2d54053085e611e96e25b38d74d6a5ee485dc2e2bffed6ccafc6a3be91e / a6e44466ef9636351f2b5e18db3035cd4f12509fc721427f7c9207aa817d3b07 / 859301bf009b6300c1dba428ab9884a6d5fcba5660191bb50e3abd95139fb13d
- `sixpole-steps2-iv-N4000-like.json` / `.out` / `.out.time`: 4fdbe193f87312edc2c70876ecec2b68cf4cfc62027191e1f9029cb30757a300 / fd7dc04ba30321382e4e48f96b468b009de7315c78b2d919bae6051e9697eb51 / ee325897b61a79a1824c38466a0205412c51d6228823b6366e85b9c8757034f5
- `sixpole-steps2-iv-N4000-fixed.json` / `.out` / `.out.time`: 315712f296286ac4feca0379bc98076ddea1ef20b1cf5b8f72f108508e7589ee / c0afb6c9fd485dad341651ca03fa6febd07362db493513b0553943ee5157c596 / 243f5432c950216dcb7b9273d593433c8ffaa8d2cd416ec1be238fd2742cde2b
- `sixpole-steps2-iv-val-full.json` / `.out` / `.out.time`: 4163ac4ae3223e902654dfd6a0a5674c6fcff0d9bb908d95525082ef44a8a671 / bfd60e8b77406f8492a06e48f945d7c37912f8e17bb5745b71476c8cd7e0b206 / 8f9ca717f40a2af1fd8bccc7d5e436b2d93d879445fdd652d07ca9e6412cf17b
- `sixpole-steps2-iv-val-unlike.json` / `.out` / `.out.time`: 1ae8bb866f3c02b239c37bac4b8af93a0f016c34adfa82fc5c8120febb046a6d / e7805b2446f90efbb3aad1b722ca70a0f1dee420bc1764c2c3e794488786899b / eda4da3dd3819c33681df50c0721c3af5ad5ffe141986467da21605f953b89f2
- `split.py` / `.out` / `.out.time`: 950e854a0309fc5ba0c47e812d677a50400ed14ca2b34c70f1864657ab472a53 / a06e8388ce73bd656050416db52645b5d5ba35ba99705c76ffe7f678e0ca0a9e / 58cd708b2d9baf3268f11667f9b3d17a5f39dd086b9639da649a93105e3fb855
- `commands.txt`: hashed in the handback message (it is complete before this report is saved; its hash at that point is 61e7b48e7d9f772960ac1090e96648d1e0a6bb897fee8d076aa28f0f775245de).

Retained coverage evidence total: 7872 KiB (limit 10 MiB). Frozen inputs executed or read in-process, unchanged: `spherical-curvature-claude-coverage-wave15-rest-iv.py` (and through it the wave-14 module) and the wave-16 run-2 JSON.

## 8. Limits and next possible actions

Limits: the plan bound, not a premise, ended the continuation; the antipode reading near t = 2 is the next premise boundary; the enclosure widths (1.8e-5 in speed at the reached time) are set by the affine remainder and would need a sharper (second-order) remainder or a smaller step to resolve a cross term between the two classes; the first three steps' like-class history is coarse (first cell of the window enclosure), which does not affect the sign here.

Next possible actions, with a recommendation for each:
1. Stand by, as instructed; the weak-coupling continuation is complete to its planned bound.
2. If the PI wants the antipode boundary: a further fixed plan of at most twenty steps from the reached state would reach t = 2.07, crossing the antipode reading (expected near 1.99); it needs the antipode's moving-source term (source E1 at -X1(q'), the receiver's own antipodal image, approaching along the same great circle), derived the same way; about 60 s per run.
3. If the PI wants the cross term resolved: rerun the four modes with Delta = 0.005 (eighty steps, about 100 s per run); the remainder width would fall by about four.

Save stamp: report saved at 2026-10-11T05:12:29Z (date -u read immediately before this append); this stamp line is the only write after the report body.
