import {
  getPhotonDirectionSign,
  getPhotonLayer,
  getPhotonLayerAngleRadians,
  getPhotonSeparationReferenceRadius,
} from "./PhotonStateRuntime.js";

const TWO_PI = Math.PI * 2;

export const PHOTON_TRANSMITTER_HISTORY_PROVIDER_ID =
  "photon-constrained-architrino-transmitter-history.v1";

export const PHOTON_TRANSMITTER_HISTORY_BOUNDARY = Object.freeze({
  constrainedMotionOwner: "photon_app",
  transmitterHistoryOwner: "photon_app",
  causalRootOwner: "prescribed_path_analysis",
  rootPlaybackOwner: "prescribed_path_analysis",
  fieldReconstructionOwner: "prescribed_path_analysis",
  evidenceGrade: "display-only-visualization",
  nonEvidence: true,
  downstreamConsumer: "photon_field_polarization_diagnostics",
});

export function getPhotonConstrainedBraidCenterX(state, braidId) {
  const fallbackSeparation = getPhotonSeparationReferenceRadius(state);
  const separation = Math.max(0, Number(state?.pair?.pairSeparation) || fallbackSeparation);
  return braidId === "left" ? -separation / 2 : separation / 2;
}

export function getPhotonAbsoluteObserverPositionAtTime(measurement, timeSeconds) {
  const photonSpeed = Number(measurement?.photonSpeedCf) || 0;
  return {
    x: (Number(measurement?.virtualObserver?.x) || 0) + photonSpeed * (Number(timeSeconds) || 0),
    y: Number(measurement?.virtualObserver?.y) || 0,
    z: Number(measurement?.virtualObserver?.z) || 0,
  };
}

export function createPhotonConstrainedMovingCircularTransmitterHistory(state, transmitterRef, measurement) {
  const layer = getPhotonLayer(state, transmitterRef.braidId, transmitterRef.layerId);
  const radius = Number(layer.radius) || 0;
  return {
    centerAtEpoch: {
      x: getPhotonConstrainedBraidCenterX(state, transmitterRef.braidId),
      y: 0,
      z: 0,
    },
    centerVelocity: {
      x: Number(measurement?.photonSpeedCf) || 0,
      y: 0,
      z: 0,
    },
    radiusU: { x: 0, y: radius, z: 0 },
    radiusV: { x: 0, y: 0, z: radius },
    angularVelocity:
      getPhotonDirectionSign(state, transmitterRef.braidId) *
      TWO_PI *
      (Number(layer.frequencyHz) || 0),
    phaseAtEpoch: getPhotonLayerAngleRadians(
      state,
      transmitterRef.braidId,
      transmitterRef.layerId,
      0,
      transmitterRef.chargeType
    ),
    epochTime: 0,
  };
}

export function createPhotonConstrainedVirtualObserverHistory(measurement) {
  return {
    startTime: 0,
    endTime: 0,
    positionAtStart: getPhotonAbsoluteObserverPositionAtTime(measurement, 0),
    velocity: {
      x: Number(measurement?.photonSpeedCf) || 0,
      y: 0,
      z: 0,
    },
  };
}

export function createPhotonConstrainedTransmitterHistoryProvider(
  state,
  transmitterRef,
  measurement,
  options = {}
) {
  return {
    providerId: PHOTON_TRANSMITTER_HISTORY_PROVIDER_ID,
    providerKind: "constrained_architrino_motion",
    transmitterHistoryKind: options.transmitterHistoryKind ?? "moving-circular-transmitter",
    receiverHistoryKind: options.receiverHistoryKind ?? "moving-linear-virtual-observer",
    approximationPolicy: options.approximationPolicy ?? "exact-moving-circular-provider",
    boundary: PHOTON_TRANSMITTER_HISTORY_BOUNDARY,
    transmitterRef: { ...transmitterRef },
    transmitter: createPhotonConstrainedMovingCircularTransmitterHistory(state, transmitterRef, measurement),
    receiver: createPhotonConstrainedVirtualObserverHistory(measurement),
    measurement: {
      transmitterHistoryMode: measurement?.transmitterHistoryMode ?? "absolute_history",
      signalSpeedCf: Number(measurement?.signalSpeedCf) || 0,
      photonSpeedCf: Number(measurement?.photonSpeedCf) || 0,
    },
  };
}
