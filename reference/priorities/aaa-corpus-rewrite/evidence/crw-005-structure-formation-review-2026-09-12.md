# CRW-005 Structure Formation Review — 2026-09-12

## Scope and provenance

This is the bounded worker receipt for priority 67, [Structure Formation](../../../../content/markdown/aaa/cosmology/structure-formation.md), under the operator's explicit review-and-safe-repair instruction. The worker write scope is the chapter and this receipt only. Shared CRW-005 disposition, priorities, work log, work queue, generated assets, and Git publication are outside that scope.

Baseline commit inspected: `5549583a1fa498a72e90aa1a170f26bec10dbd54`. The initial two-path `git --no-optional-locks status --short -- content/markdown/aaa/cosmology/structure-formation.md reference/priorities/aaa-corpus-rewrite/evidence/crw-005-structure-formation-review-2026-09-12.md` returned no entries; the chapter matched that commit, and the receipt did not exist. This is a two-path baseline, not a claim about the rest of the shared checkout.

- Baseline chapter SHA-256, measured by `shasum -a 256` and independently matched against the immutable commit bytes by the scoped checker: `af16b11ea340917ab71f583097b5e4f50e7266c2771a239f34d9302f01690f04`.
- Final chapter SHA-256, measured by the Node SHA-256 checker below: `08fae3b6be360ef97fd56e5fb5d94477ff647daa1a7b44a7df306363e49c78d8`.
- Review disposition: 22 finding groups repaired or narrowed to their defensible scope: 15 High and 7 Medium. High means the defect can alter a mathematical or physical conclusion; Medium means an important notation, attribution-scope, or inference qualification.
- Claim boundary: conditional algebra is derived within its stated comparison assumptions. External observations are measured by the named primary instruments and interpreted through the named models. The Noether sea response coefficients, population realization, and downstream recovery remain open. No EOM solver acceptance, physical branch existence, or theory closure is claimed.
- No Python, numerical EOM run, parameter fit, Git write, or generator write was performed. Every new numerical witness below fixes primitive wake speed to $c_f=1$; observer calibration $c_0$ is a separate symbol.

## Owners, canon, and binding inventory

The review followed the local [AGENTS.md](../../../../AGENTS.md), [generated startup router](../../../op/agent-startup-orientation.generated.md), [bounded corpus-review owner](../../../office-of-research/cto/prompts/corpus-reviewer.md), [review skill owner](../../../op/skills/skill-architrino-review.md), [theory orientation](../../../op/theory-orientation.md), and [geometry/dynamics role](../../../office-of-research/specialists/roles-geometry-dynamics/system-prompt.md). The operator explicitly authorized repairs, overriding the procedure's review-only default, and explicitly reserved shared-record integration for the coordinator.

The current [academic style](../../../../content/markdown/aaa/archie/academic-style-guide.md), [mathematics style](../../../../content/markdown/aaa/archie/mathematics-style-guide.md), [mathematics terminology](../../../../content/markdown/aaa/archie/mathematics-terminology.md), [terminology usage](../../../../content/markdown/aaa/archie/terminology-usage.md), [comparative glossary](../../../../content/markdown/aaa/archie/comparative-glossary.md), and [attribution policy](../../../../content/markdown/aaa/archie/about-architrino.md#sources-references-and-attribution) governed the review. Theory checks used the foundation definitions, the current [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md), [Noether sea](../../../../content/markdown/aaa/spacetime/noether-sea.md), [Cosmology Ontology](../../../../content/markdown/aaa/cosmology/cosmology-ontology.md), [Expansion Mechanism](../../../../content/markdown/aaa/cosmology/expansion-mechanism.md), and [Emergent Metric](../../../../content/markdown/aaa/spacetime/emergent-metric.md). These anchors were not edited.

Before editing, targeted path search and owner inspection identified the chapter's named consumers: `content/scenes/cosmology/structure_formation.json`, `content/graph/textbook_toc.json`, `content/graph/scene_graph.json`, `content/markdown/markdown_index.json`, and `content/generated/equation-mapping/corpus-equations.json`. The equation generator consumes display text, context, and symbol definitions, so unchanged IDs do not imply unchanged registry bytes. This is a named consumer inventory, not an exhaustive no-other-consumers claim.

The initial registry `--check` passed with 199 Markdown files, 4,685 displays, 23 promoted equations, and 30,444 symbol definitions. The post-edit check is recorded below. Generated targets, scene identity, graph entries, and index entries were left to their owners.

## Findings and safe repairs

References below name the chapter section and, where helpful, its final source lines. Baseline line numbers belong to the immutable commit above, not a moving branch. Each falsifier states evidence that would require revisiting the finding or its narrowed conclusion.

### SF-01 — High: candidate medium behavior was treated as established physics

**Measured defect by baseline prose inspection, Scope and Physical Picture and growth-coefficient bullets:** filamentary overlap, braid density, and radius were treated as sufficient mechanisms for attraction and stiffness. **Repair:** identify the population and constitutive maps as hypotheses; two concentrations do not by themselves prove axial accumulation, lensing, or attractive feedback. Retain the transmitter-only per-hit weight $c_f/|D_t|$, define $D_t$ locally, and distinguish same-transmitter causal roots from internal speed or density. **Grade and falsifier:** the missing implication is an inferred evidence-boundary defect; an independently checked physical history producing the claimed response, with its causal-root domain and observer map, would justify a stronger statement. Final lines 11–15 and 54–72.

### SF-02 — High: redshift reconstruction did not derive the growth friction term

**Measured defect by baseline Background Noether Sea State and growth-law inspection:** effective scale and relaxation were assigned the standard $2H\dot\delta$ role without the required clock, separation, continuity, and volume maps. **Repair:** distinguish $T$, $t_{\mathrm{eff}}$, chart scale $a$, redshift factorization, and volume projection; state the pressureless conserved-matter continuity/Euler/Poisson assumptions behind the comparison equation. **Grade and falsifier:** derived domain restriction; a native-to-effective derivation that includes any source, drag, mass, and clock terms could establish this coefficient. Redshift factorization alone cannot. Final lines 30–70.

### SF-03 — High: mass, energy, and number densities were conflated

**Measured defect by baseline density definitions and susceptibility/Poisson inspection:** matter was called energy density while the growth law used a mass-density source; sea energy was added to matter without an explicit conversion, and a sea density symbol lacked a consistent definition. **Repair:** declare assembly mass density, braid number density, and sea energy density separately; use $\delta u_{\mathrm{sea}}/c_0^2$ in the mass-equivalent Poisson source and susceptibility. **Grade and falsifier:** dimensional derivation, with witness W08; an explicitly different, dimensionally complete normalization would require revising the conversion consistently everywhere. Final lines 25–30 and 530–560.

### SF-04 — High: the growth factor and integral were used beyond their domains

**Measured defect by baseline The Growth Factor:** scale-dependent coupling was combined with a single real-space growth factor and an unrestricted integral solution. **Repair:** use mode-dependent $D(k,t)$, normalized initial data, and restrict the integral to a background for which $H$ solves the homogeneous equation. For $D=Hv$, reduction of order gives $\dot v\propto a^{-2}H^{-2}$ and $v\propto\int da/(a^3H^3)$. **Grade and falsifier:** derived under those premises; W01 independently substitutes the Einstein–de Sitter solution into the ODE and shows failure if only the gravitational coefficient doubles. W02 shows that different mode growth factors cannot be represented by one common factor. An explicit verification of the homogeneous equation for another background would extend the integral's domain. Final lines 34–47 and 76–102.

### SF-05 — Medium: the transfer envelope omitted its logarithm and scale normalization

**Measured defect by baseline display 4:** a bare inverse-square high-wavenumber transfer asymptotic omitted the cold-matter logarithmic factor and dimensionless scale ratio. **Repair:** use $\mathcal T\propto\ln q/q^2$, $q=k/k_{\mathrm{eq}}$, specify matter-seed normalization and subsequent scale-independent growth, and reserve $T$ for absolute time. **Grade and falsifier:** standard observer-level comparison, not a substrate premise; a transfer normalization or component model with a different asymptotic requires its own stated definition and solution. Display ID preserved; final lines 90–102.

### SF-06 — High: transfer power lacked conjugation and a multiple-seed covariance

**Measured defect by baseline display 6:** multiplying unconstrained complex transfer amplitudes without conjugation can give a negative auto-power. **Repair:** use $T_xT_y^*P_{\mathrm{seed}}$ for a single seed and $\mathsf T_x\mathbf C_{\mathrm{init}}\mathsf T_y^\dagger$ for correlated initial modes. **Grade and falsifier:** covariance identity derived from $\langle yy^\dagger\rangle$; W03 gives $i\,i=-1$ versus $i\,i^*=1$. A declared real single-seed restriction permits omitting the conjugate, but does not justify the broader formula. Final lines 120–134.

### SF-07 — High: the adiabatic chain lacked units and an initial-condition boundary

**Measured defect by baseline display 7 and neighboring prose:** pressure was added to a mass density, and the component chain did not state its source-free, initial, relativistic-neutrino assumptions. **Repair:** insert $p/c_0^2$, define adiabaticity as a common local time shift, and use actual $\dot{\bar\rho}_x$ when source exchange is present. **Grade and falsifier:** derived from the stated background evolution; W04 checks the $3/4$ ratio and shows that a nonzero source changes the derivative. A different background law must be substituted, not silently assigned the source-free ratio. Final lines 134–153.

### SF-08 — Medium: relic and free-streaming formulas implied universal production histories

**Measured defect by baseline displays 8–9:** the neutrino mass-to-energy convention and thermal assumptions were omitted, while a $1.2\,\mathrm{Mpc}$ free-streaming estimate had no declared distribution or endpoints. **Repair:** retain the rounded standard $94\,\mathrm{eV}$ relic comparison with $m_\nu c_0^2$, narrow the approximate $-8f_\nu$ rule, and retain an explicit mean-speed integral from production to equality. Define $pc_0/(k_BT_{\mathrm{temp}})$ rather than a dimensional momentum/temperature ratio. **Grade and falsifier:** standard comparison supported by Lesgourgues–Pastor, not an assembly calculation; W05 shows endpoint dependence. A specified production distribution and background could support a numerical coefficient. Final lines 155–183.

### SF-09 — High: coldness and neutrality were treated as sufficient dark-sector criteria

**Measured defect by baseline Linear and Nonlinear Dark-Sector Split and Neutral Assemblies:** small pressure or neutrality did not supply abundance, perturbations, scattering, or a stable physical assembly. **Repair:** normalize sound speed, compare $c_s^2k^2/a^2$ against the gravitational rate, and require the common production and interaction history. Separate scale-dependent gravity from heat transport and nonlinear scattering. **Grade and falsifier:** derived insufficiency and inferred population boundary; W06 has small sound speed but dominant pressure at large $k$. A realized candidate with controlled kinetics and recovery calculations could establish sufficiency on a specified domain. Final lines 187–210 and 246–252.

### SF-10 — High: finite penalties did not enforce a shared physical state

**Measured defect by baseline residual prose:** finite discrepancy penalties were described as preventing independently retuned states, without normalization or covariance conditions. **Repair:** require actual shared-state agreement, dimensionless residuals, and joint covariance; state the independent-redshift-block condition for the Lyman-$\alpha$ sum. **Grade and falsifier:** derived; minimizing $(x-1)^2+\lambda x^2$ gives $x=1/(1+\lambda)\ne0$ for finite positive $\lambda$ (W07). A hard constraint or certified zero discrepancy would establish exact consistency. Final lines 228, 347, and 364.

### SF-11 — Medium: inferred mass deficits and profiles were overinterpreted

**Measured defect by baseline rotation-curve, baryon, and cluster prose:** neutrality did not produce an NFW halo; a bookkeeping baryon deficit did not establish a component; X-ray and lensing inferences did not automatically measure an identical coupling independently. **Repair:** require a formation history, define the $M_{200}$ convention, retain the deficit identity without positivity or detection claims, and name hydrostatic, lensing, and sample dependencies. **Grade and falsifier:** inferred observational boundary; independent calibrated data with an explicit response model can resolve those dependencies. A cluster offset tests a specified model, not every possible medium theory. Final lines 266–297.

### SF-12 — High: lensing and acoustic peaks were assigned overly direct meanings

**Measured defect by baseline shear and CMB paragraphs:** matter power alone was said to determine lensing, and acoustic positions to fix an absolute sound horizon. **Repair:** require light-deflection and distance kernels distinct from matter acceleration, and use the angular sound-horizon/distance ratio. **Grade and falsifier:** observer-level inference restriction; W09 preserves that ratio under a common dilation. An independent distance calibration removes that degeneracy, while an independently recovered lensing-potential map could connect matter to light. Final lines 301–315.

### SF-13 — Medium: fitted observational summaries were treated as direct, timeless laws

**Measured defect by baseline $S_8$ and kSZ prose:** an historical tension significance was generalized, and the kSZ fitted radial kernel was too closely identified with pairwise acceleration. **Repair:** make significance dataset/model dependent; retain the published exponent $2.1\pm0.3$ and physical window $30$–$230\,\mathrm{Mpc}$ while distinguishing the kernel, spatial-correlation integral, pairwise estimator, optical-depth nuisance, and Gaussian summary from the full likelihood. **Grade and falsifier:** measured primary-source attribution and inferred scope; a different estimator, window, or likelihood invalidates use of this compressed residual. The existing equation ID and effective-comparison subscript remain intact. Final lines 303 and 317–347.

### SF-14 — High: the QSO1 measurement was attributed to the wrong instrument

**Measured defect by baseline named-source paragraph:** QSO1 was attributed to ALMA rather than the reported JWST/NIRSpec integral-field hydrogen-line kinematics. **Repair:** correct the instrument and model-conditioned dynamical inference; add primary links for QSO1, GLIMPSE-17775, and MRG-M0138; distinguish source/host constraints from uniquely established formation order or quenching mechanism. **Grade and falsifier:** measured source check against the primary articles below; an authoritative source reporting a different observation would require identifying that separate result. These papers do not establish an architrino assembly mechanism. Final lines 413–417.

### SF-15 — Medium: high-redshift and largest-structure arguments exceeded the comparisons

**Measured defect by baseline High-Redshift Structure and Largest Structures:** constant coupling did not imply identical standard-cosmology abundance, large connected structures did not by themselves violate homogeneity, and eternal time did not supply old connected matter. **Repair:** name background, initial power, selection, population persistence, and search-statistic obligations; require predicted rather than merely observed population differences to fail a model. **Grade and falsifier:** inferred insufficiency; a survey-matched likelihood with fixed initial and population assumptions could establish an actual discrepancy. Final lines 381–429.

### SF-16 — High: an assumed constitutive response was presented as a physical linearization

**Measured defect by baseline Linear Constitutive Derivation:** the stress ansatz alone did not supply a realized equilibrium, source coupling, finite-range restoration, or neglect of inertia. **Repair:** label a conditional continuum model and derive only its scalar relaxation property. For frozen $A_L>0$, $B_L>0$, the unforced solution is proportional to $\exp(-A_Lt/B_L)$; this is not a stability verdict for the coupled gravitational system. **Grade and falsifier:** derived toy-equation property; a balanced physical background plus independently validated kinetic/source response is necessary before applying it to the sea. Final lines 487–528.

### SF-17 — Medium: comoving gradients and overloaded constitutive symbols were unspecified

**Measured defect by baseline displays 22–25 and 32:** comoving $k$ was used as a physical gradient; compression, history/velocity notation, and viscosity had overlapping meanings. **Repair:** define physical displacement and $\vartheta_L=a^{-1}\nabla_x\cdot\mathbf u$, use $k^2/a^2$, distinguish $\eta_{\mathrm{vis}}$, state modulus/viscosity units, and use $k_*^2=a^2m_L^2/M_L$. **Grade and falsifier:** dimensional coordinate derivation, W10; a physical-wavenumber convention would remove $a^{-2}$ only if the whole chart and spectrum convention were changed consistently. Final lines 488–526 and 591–599.

### SF-18 — High: fixed carried energy and Poisson sourcing were unstated assumptions

**Measured defect by baseline displays 26–28:** $\delta u=-\bar u\vartheta_L$ and unit mass-equivalent sourcing were treated as automatic consequences of deformation. **Repair:** derive the first from a fixed-energy volume Jacobian; contrast it with pressure-inclusive adiabatic $\delta u=-(\bar u+\bar p)\vartheta_L$ and possible exchange. State the extra observer-level Poisson closure and excluded pressure/slip contributions. **Grade and falsifier:** conditional derivation, not primitive thermodynamics; W13 shows the difference at $p=-u$. An independently derived sea energy/pressure/source law would select the appropriate response. Final lines 530–567.

### SF-19 — High: the oscillatory real part was substituted into a growth problem

**Measured defect by baseline display 30:** a real-frequency in-phase response at $\omega\sim Hf$ was treated as the response to evolving density. **Repair:** for $\delta\rho_m\propto e^{s_\rho t}$ use $\omega=i s_\rho$ and $A_L+s_\rho B_L$, with $s_\rho=Hf+\dot{\bar\rho}_m/\bar\rho_m=H(f-3)$ for conserved dust. State transient, coefficient-variation, denominator, and quasi-static restrictions. **Grade and falsifier:** direct substitution into $B_L\dot\vartheta_L+A_L\vartheta_L=g_m\delta\rho_m$; W11 gives zero residual for $1/(A+sB)$ and a nonzero residual for the oscillatory real part. W12 distinguishes source and contrast rates. A genuinely sinusoidal source would justify the frequency response, not its use as a growth solution. Final lines 569–599.

### SF-20 — Medium: finite-range parameters and local tolerances lacked their domains

**Measured defect by baseline finite-range and local-recovery prose:** division by $m_L^2$ assumed it was nonzero, a universal $|\mu|\lesssim0.1$ bound lacked a parameterized likelihood, and a scalar screening inequality was treated as a full local recovery test. **Repair:** require $m_L^2>0$, $M_L>0$ for the normalized finite-range form and retain the unfactored denominator otherwise; require actual survey, prior, and channel maps for constraints. **Grade and falsifier:** algebraic domain restriction plus inferred observational boundary; W16 shows a finite unnormalized response with singular normalized parameters. A specified multi-channel model and likelihood could support an actual bound. Final lines 599–619.

### SF-21 — High: a component equation of state was used as an acceleration criterion

**Measured defect by baseline Medium Energy:** $w_{\mathrm{sea}}\approx-1$ alone was associated with accelerated effective expansion. **Repair:** require the actual clock/scale history and, in the GR comparison, the total energy-plus-three-pressure criterion. **Grade and falsifier:** standard comparison counterexample W14 has a $w=-1$ component but positive total energy-plus-three-pressure. A sufficiently dominant negative-pressure component in a fully specified compatible background can satisfy the criterion; that does not derive it from architrino dynamics. Final line 256.

### SF-22 — High: a static susceptibility sign and vanishing coupling implied too much recovery

**Measured defect by baseline final constitutive paragraphs:** cooling/compression and late-time suppression were conflated, and setting a driven coupling to zero did not by itself recover all GR growth. **Repair:** static compression with $g_m<0$ gives positive $\mu$ for positive carried energy; increasing stiffness reduces this positive enhancement but does not make it negative. Below-$G_N$ instantaneous sourcing requires $\mu<0$ for a matched comparison, while a lower final $S_8$ may have other causes. Require matching background, matter, initial data, equations, and absent independent transients for recovery. **Grade and falsifier:** conditional sign algebra (W15) and comparison-domain restriction; a full shared growth/lensing history can establish a final observable change. Final lines 599 and 621.

## Independent mathematical witnesses

The executable checks below are arithmetic evaluations of the separately stated identities and counterexamples, not an EOM implementation comparing against itself. The positive and deliberately failing arithmetic controls ran and printed their result before the target witness groups. All 16 groups passed at relative/absolute scale tolerance $10^{-12}$ with $c_f=1$. They do not verify a physical medium, certify a branch, or replace a survey likelihood.

For W01, the independent reference is the closed-form observer comparison $a=t^{2/3}$, $H=2/(3t)$, $D=a$, and $4\pi G_N\bar\rho=2/(3t^2)$. At $t=1$, the growth residual is zero. Doubling only its gravitational coefficient gives $-2/3$, although the claimed universal integral would be unchanged. For W11, direct exponential substitution gives $(A+sB)\vartheta=\mathrm{source}$; $A=2$, $B=3$, $s=1$ gives $\vartheta=1/5$, whereas the oscillatory in-phase value $2/13$ leaves residual $-3/13$. These are independently specified closed-form references, not saved fixtures derived from a solver.

For SF-18's underlying energy argument (implemented as W13), a fractional volume change $\vartheta$ gives $V'=V(1+\vartheta)$. Fixed carried energy yields $u'=u/(1+\vartheta)$ and $\delta u=-u\vartheta$ to first order. In the distinct adiabatic-fluid comparison, $d(uV)=-p\,dV$ instead yields $\delta u=-(u+p)\vartheta$. Neither fluid law is imported as an architrino-level premise.

### Reproduce the arithmetic checks

Run from the existing repository checkout; the following command writes no files.

```bash
node --input-type=module <<'NODE'
import assert from 'node:assert/strict';
const near=(a,b)=>assert(Math.abs(a-b)<=1e-12*Math.max(1,Math.abs(a),Math.abs(b)), a+' != '+b);
near(2+3,5); assert.throws(()=>near(2+3,6));
console.log('CONTROL PASS BEFORE TARGET: arithmetic acceptance and deliberate rejection; tolerance 1e-12');
const c_f=1; assert.equal(c_f,1);
let n=0; const test=(name,f)=>{f();n++;console.log('PASS '+name);};
test('W01 growth integral: independent EdS substitution',()=>{
 const D=1,dD=2/3,ddD=-2/9,H=2/3,Q=2/3;
 near(ddD+2*H*dD-Q*D,0);near(ddD+2*H*dD-2*Q*D,-2/3);
});
test('W02 scale-dependent growth cannot share one factor',()=>{
 const a=2; assert.notEqual(a,a*a);
});
test('W03 Hermitian transfer covariance',()=>{
 const mul=([a,b],[c,d])=>[a*c-b*d,a*d+b*c];
 assert.deepEqual(mul([0,1],[0,1]),[-1,0]);assert.deepEqual(mul([0,1],[0,-1]),[1,0]);
});
test('W04 adiabatic initial ratio and source dependence',()=>{
 near(1/(1+1/3),3/4);
 const H=1,rho=1,Qsource=1;
 assert.notEqual(-3*H*rho,-3*H*rho+Qsource);
});
test('W05 production endpoint controls travel distance',()=>{
 const a=1,v=.5,prod=2,eq=4;
 near(v*(eq-prod)/a,1);near(v*eq/a,2);
});
test('W06 small sound speed is not negligible pressure at every k',()=>{
 const cs=.001,k=1e5,a=1,gravity=1;
 near(cs*cs*k*k/(a*a),1e4);assert(cs*cs*k*k/(a*a)>gravity);
});
test('W07 finite consistency penalty permits discrepancy',()=>{
 const lambda=1,x=1/(1+lambda);
 near(x,.5);near(2*(x-1)+2*lambda*x,0);assert.notEqual(x,0);
});
test('W08 energy-to-mass conversion is dimensional',()=>{
 const c0=2,du=8,drho=3;
 near(drho+du/(c0*c0),5);assert.notEqual(drho+du,5);
});
test('W09 angular acoustic scale leaves a dilation degeneracy',()=>{
 near(1/10,2/20);
});
test('W10 comoving-to-physical gradient',()=>{
 near((4/2)**2,(2/1)**2);assert.notEqual(4**2,2**2);
});
test('W11 oscillatory real part fails exponential-source equation',()=>{
 const A=2,B=3,s=1,source=1,trueResponse=source/(A+s*B);
 const inPhase=source*A/(A*A+(s*B)**2);
 near((A+s*B)*trueResponse-source,0);
 near((A+s*B)*inPhase-source,-3/13);assert.notEqual(inPhase,trueResponse);
});
test('W12 absolute density source differs from contrast rate',()=>{
 const H=.1,f=1;near(H*(f-3),-.2);near(H*f,.1);
});
test('W13 fixed carried energy is not pressure-inclusive adiabatic response',()=>{
 const u=1,p=-1,compression=-.1;
 near(-(u+p)*compression,0);near(-u*compression,.1);
});
test('W14 component w=-1 is insufficient for total acceleration',()=>{
 const um=100,pm=0,ude=1,pde=-1;
 assert(um+ude+3*(pm+pde)>0);
});
test('W15 static sign and amplitude degeneracy',()=>{
 const massEquivalentEnergy=1,gm=-1;
 const mu1=-massEquivalentEnergy*gm/2,mu2=-massEquivalentEnergy*gm/4;
 assert(mu1>mu2&&mu2>0);near(Math.sqrt(.81),.9);
});
test('W16 zero restoring mass invalidates normalized finite-range form',()=>{
 const massSquared=0,M=2,k=1,a=1;
 assert(Number.isFinite(1/(massSquared+M*k*k/(a*a))));assert(!Number.isFinite(1/massSquared));
});
console.log('TARGET PASS: '+n+' analytic witness groups; c_f='+c_f+'; no physical simulation or parameter fit');
NODE
```

## Primary-source verification

These bounded source checks correct the chapter's attributions and inference scope; they are not a new literature survey.

- [Lesgourgues and Pastor, Massive neutrinos and cosmology](https://arxiv.org/abs/astro-ph/0603494): the standard relic-density relation and small-fraction small-scale linear suppression are observer-level comparisons with thermal and background assumptions. The chapter retains a rounded coefficient, not a new assembly prediction.
- [Gallardo et al., ACT kSZ test](https://arxiv.org/abs/2604.14327), with [full analysis](https://arxiv.org/html/2604.14327v1): the primary paper identifies the radial interaction-kernel exponent and physical separation window used here; spatial correlations, optical-depth treatment, and the pairwise estimator separate it from a direct per-pair or substrate acceleration measurement.
- [Kokorev et al., GLIMPSE-17775](https://arxiv.org/abs/2511.07515): JWST spectral diagnostics motivate a dense-gas interpretation and caution about assigning all broad-line width to orbital motion. This does not uniquely determine a seed mechanism.
- [Juodžbalis et al., QSO1](https://www.nature.com/articles/s41586-026-10579-4): Main and methods identify JWST/NIRSpec integral-field hydrogen-line kinematics combined with lensing. The chapter's ALMA attribution was incorrect; lensing, gas geometry, and inclination remain inference assumptions.
- [Newman et al., MRG-M0138](https://arxiv.org/abs/2503.17478): the revised abstract identifies JWST integral-field stellar kinematics at redshift 1.95, a foreground lens model, and stellar dynamical fitting. The measured mass inference alone does not identify quenching causation.

## Preservation and validation

The scoped checker below first tests known good and bad math, missing/present links, fenced/inline-code exclusion, display extraction, and ordered identity. Only after those controls pass does it inspect the chapter or receipt. It is intentionally a bounded checker for the ordinary inline links and dollar-delimited math used in these files; it is not a general Markdown parser or a fragment-anchor verifier.

Measured against the immutable baseline by that checker:

- All 34 display-equation IDs and their order are preserved.
- All 29 headings are byte-identical and ordered identically.
- All 54 original ordinary Markdown link targets are retained; new source and definition links were added.
- The display count remains 34: 16 changed and 18 retain byte-identical TeX.
- The final chapter's 295 mathematical expressions render with strict KaTeX error handling, and all 58 local path references resolve. This is syntax and path validation, not visual review or equation-registry freshness.
- Both files passed the known-case-first scoped checker: 295 strict KaTeX expressions and 58 local path references in the chapter; 92 expressions and 18 local path references in this receipt. It also rejected deliberate bad-math and missing-path controls before inspecting either target.
- `node scripts/validate-content.mjs --check --strict` exited 0 on both runs: 391 scene configs, 199 content Markdown files, and 1,718 then 1,719 repository Markdown files audited; each run reported 0 errors, 0 warnings, 30 notes. These are snapshots of a shared checkout, not a byte-stability claim for unrelated files. The notes include informational reports such as scene-link inventory, not an equation-registry freshness pass.
- `git --no-optional-locks diff --check HEAD -- content/markdown/aaa/cosmology/structure-formation.md reference/priorities/aaa-corpus-rewrite/evidence/crw-005-structure-formation-review-2026-09-12.md` exited 0. Because the receipt is new and untracked, its bytes were also checked directly: `rg -n '[[:blank:]]+$'` on the two explicit paths returned no matches (exit 1), and the scoped Node checker rejected no trailing whitespace.
- The final two-path `git --no-optional-locks status --short --` inspection reports only the modified chapter and untracked dedicated receipt within that scope. It makes no statement about unrelated paths or other workers' edits. This worker's edits and commands did not touch shared CRW-005 records.

| Display index | Preserved ID | Repair |
|:---|:---|:---|
| 4 | `corpus-equation-61c91d955cd3ead3` | Transfer notation and logarithmic envelope |
| 6 | `corpus-equation-2b281c6178c9dc12` | Complex-conjugate power |
| 7 | `corpus-equation-4de833ac52f80e51` | Pressure-to-mass units |
| 8 | `corpus-equation-5870b21b4b669e6d` | Neutrino rest-energy units |
| 9 | `corpus-equation-f26dcb882346e448` | Production-aware free-streaming integral |
| 10 | `corpus-equation-bf6fe768596d32b3` | Dimensionless sound-speed ratio |
| 22 | `corpus-equation-14c64e3d2934eb29` | Physical displacement divergence |
| 23 | `corpus-equation-500a4a13cf59a017` | Strain and viscosity notation |
| 24 | `corpus-equation-ab273ab17ca69d13` | Comoving response denominator |
| 25 | `corpus-equation-6624ca6af422330f` | Viscosity identity |
| 26 | `corpus-equation-19ee86226b43db38` | Mass-equivalent susceptibility definition |
| 27 | `corpus-equation-f75dcf676aa58c1d` | Consistent source and denominator |
| 28 | `corpus-equation-db5c7368c777da5e` | Effective potential and mass-equivalent source |
| 30 | `corpus-equation-002befecb3fc00bd` | Evolving-source response |
| 31 | `corpus-equation-3dc324e5bcd8ddaf` | Quasi-static response |
| 32 | `corpus-equation-9eafb824ea09421e` | Finite-range normalization and comoving scale |

### Reproduce the two-file scope checks

Run from the existing checkout. The receipt is included by the explicit environment switch; no generated files are written.

```bash
SF_RECEIPT=1 node --input-type=module <<'NODE'
import fs from 'node:fs'; import path from 'node:path'; import assert from 'node:assert/strict'; import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process'; import katex from 'katex';
import {parseCorpusDisplayEquations as parse} from './scripts/build-equation-mapping-corpus.mjs';
function clean(s){let fence=null;return s.split('\n').map(l=>{const m=l.match(/^\s*(\x60{3,}|~{3,})/);if(m){if(!fence)fence=m[1][0];else if(fence===m[1][0])fence=null;return '';}return fence?'':l.replace(/(\x60+)[\s\S]*?\1/g,'');}).join('\n');}
function math(s){s=clean(s);const out=[];let i=0;const esc=j=>{let n=0;while(j>0&&s[--j]==='\\')n++;return n%2===1;};while(i<s.length){if(s[i]!=='$'||esc(i)){i++;continue;}const d=s[i+1]==='$'?'$$':'$',from=i+d.length;i=from;while(i<s.length&&!(s.slice(i,i+d.length)===d&&!esc(i)))i++;assert(i<s.length,'unclosed math');if(d==='$')assert(!s.slice(from,i).includes('\n'),'multiline inline math');out.push({tex:s.slice(from,i),displayMode:d.length===2});i+=d.length;}return out;}
const links=s=>[...clean(s).matchAll(/\[[^\]\n]*\]\(([^)\s]+)\)/g)].map(m=>m[1]);
const heads=s=>s.split('\n').filter(l=>/^#{1,6} /.test(l));
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
const render=s=>{const xs=math(s);xs.forEach(x=>katex.renderToString(x.tex,{displayMode:x.displayMode,throwOnError:true,strict:'error'}));return xs.length;};
const local=(f,s)=>links(s).filter(x=>!/^(https?:|mailto:|#)/.test(x)).map(x=>path.resolve(path.dirname(f),decodeURIComponent(x.split('#')[0])));
const control='# Known\n$x^2$ [root](AGENTS.md)\n$$\ny=1\n$$\n\x60\x60\x60\n$\\notACommand$ [ignore](absent.md)\n\x60\x60\x60\n\x60$bad$ [ignore](absent.md)\x60';
assert.equal(render(control),2);assert.equal(links(control).length,1);assert(local('control.md',control).every(fs.existsSync));
assert.throws(()=>render('$\\notACommand$'));assert.throws(()=>math('$x'));assert(!local('control.md','[bad](__crw_sf_missing_c641__.md)').every(fs.existsSync));
const findings=s=>[...s.matchAll(/^### (SF-\d\d) — (High|Medium):/gm)].map(m=>[m[1],m[2]]);
assert.deepEqual(findings('### SF-01 — High: known\n### SF-02 — Medium: known'),[['SF-01','High'],['SF-02','Medium']]);assert.equal(findings('## not a finding').length,0);
assert.equal(parse('control.md',control).length,1);assert.equal(parse('control.md',control)[0].tex,'y=1');assert.notDeepEqual(['a','b'],['b','a']);
console.log('CONTROL PASS: math good/bad, unclosed delimiter, fences/inline code excluded, links existing/missing, display extraction, ordered identity, finding extraction');
const f='content/markdown/aaa/cosmology/structure-formation.md';
const base=execFileSync('git',['show','5549583a1fa498a72e90aa1a170f26bec10dbd54:'+f],{encoding:'utf8'});
assert.equal(hash(base),'af16b11ea340917ab71f583097b5e4f50e7266c2771a239f34d9302f01690f04');
const live=fs.readFileSync(f,'utf8');const ids=s=>links(s).filter(x=>x.includes('#corpus-equation-'));
assert.deepEqual(ids(live),ids(base));assert.deepEqual(heads(live),heads(base));assert(links(base).every(x=>links(live).includes(x)));
const old=parse(f,base),now=parse(f,live);assert.equal(old.length,now.length);
const changed=old.flatMap((b,i)=>b.tex===now[i].tex?[]:[{i:i+1,old:b.startLine,now:now[i].startLine,id:ids(base)[i].split('#')[1]}]);
assert.deepEqual(changed.map(x=>x.i),[4,6,7,8,9,10,22,23,24,25,26,27,28,30,31,32]);
if(process.env.SF_RECEIPT){const r=fs.readFileSync('reference/priorities/aaa-corpus-rewrite/evidence/crw-005-structure-formation-review-2026-09-12.md','utf8'),ff=findings(r);assert.deepEqual(ff.map(x=>x[0]),Array.from({length:22},(_,i)=>'SF-'+String(i+1).padStart(2,'0')));assert.equal(ff.filter(x=>x[1]==='High').length,15);assert.equal(ff.filter(x=>x[1]==='Medium').length,7);assert(r.includes(hash(live)),'receipt chapter hash mismatch');console.log('FINDINGS PASS: SF-01 through SF-22; 15 High, 7 Medium; receipt chapter hash matches');}
for(const file of [f,...process.env.SF_RECEIPT?['reference/priorities/aaa-corpus-rewrite/evidence/crw-005-structure-formation-review-2026-09-12.md']:[]]){
const s=fs.readFileSync(file,'utf8'),ls=local(file,s);assert(ls.every(fs.existsSync),'missing path: '+ls.filter(x=>!fs.existsSync(x)));assert(!/[ \t]+$/m.test(s),'trailing whitespace');console.log(JSON.stringify({file,math:render(s),localLinks:ls.length,hash:hash(s)}));}
console.log(JSON.stringify({preserved:{equations:old.length,ids:ids(live).length,headings:heads(base).length,originalLinks:links(base).length},changed}));
NODE
```

The scope checker verifies paths, not HTTP availability or remote article truth. Primary articles were inspected separately as described above. The immutable baseline hash guards the comparison; a changed final chapter hash invalidates this receipt until reviewed again.

## Generated artifacts

The post-edit command `node scripts/build-equation-mapping-corpus.mjs --check` exited 1 and identified stale `content/generated/equation-mapping/corpus-equations.json`; it inspected 199 Markdown files, 4,685 displays, 23 promoted equations, and 30,468 symbol definitions. The chapter's changed equations and surrounding definitions necessarily affect registry output; concurrent chapter edits may also contribute, so this is not an attribution of every changed registry byte to this worker.

No generated file was edited or regenerated. The exact deferred command, reserved for authorized integration/regeneration, is:

```bash
node scripts/build-equation-mapping-corpus.mjs --write
node scripts/build-equation-mapping-corpus.mjs --check
```

## Remaining obligations and coordinator handoff

The bounded repair is not a proof of physical realization. The remaining scientific obligations are a realized and balanced Noether sea background, causal-root validity, independent constitutive and kinetic coefficients, pressure/source/volume/clock maps, initial populations and transfer histories, and joint matter-motion/light-deflection/observational recovery. In particular, the conditional scalar relaxation result supplies none of those by itself.

Coordinator action: inspect this two-file diff and the final chapter hash, then perform the shared CRW-005 disposition under coordinator authority. This worker has not changed the shared review count, status, queue, or priorities and has not invoked publication. Registry refresh remains deferred as above. Reopen the receipt if the chapter bytes change, a primary attribution is contradicted, or an independent derivation changes the stated comparison assumptions.
