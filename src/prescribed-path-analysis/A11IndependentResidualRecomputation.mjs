const TWO_PI = 2 * Math.PI;

function phaseFromToken(token) {
  if (token === "0") return 0;
  if (token === "2*pi/3") return 2 * Math.PI / 3;
  if (token === "4*pi/3") return 4 * Math.PI / 3;
  throw new TypeError(`unsupported A1.1 phase token ${token}.`);
}

function radiusForBinary(binary, alpha1, alpha3) {
  if (binary.radiusParameter === "alpha1") return alpha1;
  if (binary.radiusParameter === "alpha2") return 1;
  if (binary.radiusParameter === "alpha3") return alpha3;
  throw new TypeError(`unsupported A1.1 radius parameter ${binary.radiusParameter}.`);
}

function directPoint(binary, endpointIndex, alpha1, alpha3, commonPhase) {
  const sign = endpointIndex === 0 ? 1 : -1;
  const radius = radiusForBinary(binary, alpha1, alpha3);
  const angle = commonPhase + phaseFromToken(binary.phase);
  const cosine = Math.cos(angle);
  const sine = Math.sin(angle);
  return binary.plane.e1.map((component, index) =>
    sign * radius * (
      component * cosine +
      binary.plane.e2[index] * sine
    ));
}

function squaredDistance(left, right) {
  return left.reduce((sum, component, index) => {
    const difference = component - right[index];
    return sum + difference * difference;
  }, 0);
}

export function recomputeA11SquaredCausalResidual({
  protocol,
  receiver,
  transmitter,
  alpha1,
  alpha3,
  receptionPhase,
  delay,
}) {
  const receiverBinary = protocol.sourceFamily.binaries[receiver.binaryIndex - 1];
  const transmitterBinary = protocol.sourceFamily.binaries[transmitter.binaryIndex - 1];
  const receiverPoint = directPoint(
    receiverBinary,
    receiver.endpointIndex,
    alpha1,
    alpha3,
    receptionPhase,
  );
  const transmitterPoint = directPoint(
    transmitterBinary,
    transmitter.endpointIndex,
    alpha1,
    alpha3,
    receptionPhase - delay,
  );
  const separationSquared = squaredDistance(receiverPoint, transmitterPoint);
  const squaredResidual = separationSquared - delay * delay;
  const distance = Math.sqrt(separationSquared);
  return {
    schema: "prescribed-path-analysis/a1-1-independent-residual-row.v1",
    evaluatorId: "a1-1-squared-causal-residual-direct-coordinate-recomputation.v1",
    formula: "squared-distance-minus-squared-delay",
    alpha1,
    alpha3,
    receptionPhase:
      ((receptionPhase % TWO_PI) + TWO_PI) % TWO_PI,
    delay,
    separationSquared,
    squaredResidual,
    normalizedResidual: squaredResidual / Math.max(distance + delay, Number.MIN_VALUE),
  };
}
