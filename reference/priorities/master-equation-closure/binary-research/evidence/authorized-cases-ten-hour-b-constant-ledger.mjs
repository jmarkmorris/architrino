import assert from 'node:assert/strict';

// Exact arithmetic only. This does not certify an analytic majorant or evolve a history.
const pow2 = n => 1n << BigInt(n);
const fact = n => n < 2 ? 1n : BigInt(n) * fact(n - 1);
const lt = (an, ad, bn, bd) => an * bd < bn * ad;
assert.equal(pow2(10), 1024n);
assert.equal(fact(4), 24n);
assert.equal(lt(1n, 2n, 2n, 3n), true);
assert.equal(lt(2n, 3n, 1n, 2n), false);
assert.equal(lt(2n, 4n, 1n, 2n), false);
console.log('KNOWN CONTROLS PASS: powers, factorial, strict rational comparison and equality rejection.');

const rows = [];
const check = (name, condition, scope) => {
  assert.equal(condition, true, name);
  rows.push({ name, passed: true, scope });
};

// e < 11/4 follows from sum_{0..5} 1/k! + (1/6!)/(1-1/7).
check('exponential series upper bound', lt(11743n, 4320n, 11n, 4n), 'Elementary constant only.');
check('B1 < 2^10', lt(15609n, 16n, pow2(10), 1n), 'Uses e < 11/4 in 8e^2+16e^4.');
check('complete past speed < 2^13', 5206n < pow2(13), 'Uses Vpast=3+(16/3)B1; conditional on the compatible jet box.');

const rootNumerator = 9n * 8n ** 3n * 7n ** 8n * 9n ** 4n;
const rootDenominator = 4n * 7n ** 3n * 5n ** 8n * 7n ** 4n;
check('weighted highest-source coefficient < 256', lt(rootNumerator, rootDenominator, 256n, 1n), 'Conditional on the complete physical speed margin and exact highest-jet inventory.');

const p = [0, 13, 4, 64, 256, 1024, 8192];
const exponentBounds = [0, 48, 189, 855, 4208];
for (let k = 1; k <= 4; k++) {
  const q = Math.max(13, p[k + 1]);
  const proposedN = pow2(10 + k * (q + 24)) * fact(k);
  check(`N${k} claimed exponent`, proposedN < pow2(exponentBounds[k]), 'Arithmetic of proposed Cauchy bound only; domain and row bound require analytical proof.');
  check(`parabolic M${k + 2} absorbs twice N${k}`, 2n * proposedN < pow2(p[k + 2]), 'Conditional on proposed N bound.');
}

check('compatibility map preserves quarter box', 48n * pow2(48) < pow2(400000), 'Uses proposed |Delta G| <= 2^48 epsilon^2 and ||A^-1|| <=12.');
check('compatibility contraction factor below half', 24n * pow2(52) < pow2(400000), 'Uses proposed jet Lipschitz bound only.');
check('complete physical speed below 1/8', pow2(16) < pow2(200000), 'Complete dimensionless speed bounded by 2^13.');
check('weighted highest jet below quarter', pow2(23) < pow2(400000), 'Uses r >= 2^-13.');
check('normalized parameter inside analytic disk', 199993 > 8241, 'Uses sqrt(8192)<128; rho=2^-8240.');
check('signed-account relative error below quarter', 50020 + 7 + 2 < 200000, 'Conditional on the proposed explicit fourth-order remainder.');
check('angular relative error below quarter', 50000 + 3 < 200000, 'Conditional on h>=1/2 and proposed fourth-order remainder.');
check('passage remainder smallness', 50000 + 1 + 100 < 200000, 'C_Q delta_c < 2^-100 conditional on h_c>=1/2.');
check('tail entry cone', 257n > 4n * 16n, 'Exact numerical cone comparison; existence of its entry remains analytical.');
check('tail dimensionless speed < 2^13', 19n ** 2n * 8192n < pow2(26), 'Conditional on tail radius and entry estimates.');

const tailP = [0, 13, 4, 128, 512, 2048, 16384];
const entryP = [0, 0, 4, 71, 269, 1044, 8218];
for (let k = 1; k <= 4; k++) {
  const q = Math.max(13, tailP[k + 1]);
  const proposedN = pow2(10 + k * (q + 40)) * fact(k);
  check(`ballistic M${k + 2} absorbs twice N${k}`, 2n * proposedN < pow2(tailP[k + 2]), 'Conditional on the explicitly enlarged tail disk majorant.');
  check(`ballistic M${k + 2} exceeds entry`, tailP[k + 2] > entryP[k + 2], 'Uses r>=2^-13 and inherited parabolic weighted jets.');
}
console.log(JSON.stringify({ grade: 'measured exact arithmetic', rows, boundary: 'No analytic estimate, history solution, speed admission or terminal branch is certified by this ledger.' }, null, 2));
