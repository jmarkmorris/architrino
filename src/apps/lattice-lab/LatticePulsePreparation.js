// Exact finite-decimal arithmetic keeps the prescribed cubic C1 at its joins.
function fraction(token) {
  const text = String(token);
  if (text.length > 64 || !/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(text)) throw new Error('A bounded decimal is required.');
  const [mantissa, exponent = '0'] = text.toLowerCase().split('e');
  const power = Number(exponent) - (mantissa.split('.')[1]?.length ?? 0);
  if (!Number.isInteger(power) || Math.abs(power) > 32) throw new Error('Decimal exponent outside the preparation range.');
  const n = BigInt(mantissa.replace('.', ''));
  return power >= 0 ? [n * 10n ** BigInt(power), 1n] : [n, 10n ** BigInt(-power)];
}
function decimal(n, d) {
  const negative = n < 0n; if (negative) n = -n;
  const whole = n / d; let remainder = n % d, digits = '';
  while (remainder && digits.length < 128) { remainder *= 10n; digits += String(remainder / d); remainder %= d; }
  if (remainder) throw new Error('Preparation coefficient is not a finite decimal.');
  return `${negative && n ? '-' : ''}${whole}${digits ? '.' + digits : ''}`;
}
export function scaledDecimal(token, numerator, denominator = 1) {
  const [n, d] = fraction(token), [a, b] = fraction(numerator), [c, e] = fraction(denominator);
  if (c <= 0n) throw new Error('Preparation denominator must be positive.');
  return decimal(n * a * e, d * b * c);
}
export function pulsePreparation({ side, spacing, amplitude, axis, preparation }) {
  const ramp = spacing / 4, start = -Math.ceil(Math.sqrt(3) * (side - 1) + .4 + 2) * spacing;
  const center = Math.floor(side / 2), offset = (side - 1) / 2;
  const displacement = scaledDecimal(amplitude, spacing), paths = [];
  for (let i = 0; i < side; i++) for (let j = 0; j < side; j++) for (let k = 0; k < side; k++) {
    const selected = i === center && j === center && k === center;
    const position = [i - offset, j - offset, k - offset].map(v => String(v * spacing));
    const segment = (from, to, coefficients) => ({ start: String(from), end: String(to), coefficients, positionErrors: ['0','0','0'], velocityErrors: ['0','0','0'] });
    let segments;
    if (selected && preparation === 'pulse') {
      const cubic = position.map(v => [v, '0', '0', '0']);
      cubic['xyz'.indexOf(axis)][2] = scaledDecimal(displacement, 3, ramp ** 2);
      cubic['xyz'.indexOf(axis)][3] = scaledDecimal(displacement, -2, ramp ** 3);
      segments = [segment(start, -ramp, position.map(v => [v,'0','0','0'])), segment(-ramp, 0, cubic)];
    } else {
      if (selected) position['xyz'.indexOf(axis)] = String(Number(position['xyz'.indexOf(axis)]) + Number(displacement));
      segments = [segment(start, 0, position.map(v => [v,'0','0','0']))];
    }
    paths.push({ pathId: `site-${i}-${j}-${k}`, charge: (i+j+k)%2 ? '-1' : '1', history: { kind:'cubic', segments } });
  }
  return paths;
}
