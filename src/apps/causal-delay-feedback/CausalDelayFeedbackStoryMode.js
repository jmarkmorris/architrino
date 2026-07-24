import {
  createPredictionChoices,
} from "./CausalDelayFeedbackCausalHistory.js";

export const STORY_STEPS = Object.freeze([
  {
    id: "meet",
    title: "Meet the positrino and electrino",
    body: "Let's examine the transmitting positrino (red) and a receiving electrino (blue). Both relationships are shown: positrino transmitter to electrino receiver, and electrino transmitter to positrino receiver.",
  },
  {
    id: "emission",
    title: "Two wakes leave earlier",
    body: "Each transmitter leaves a wake at its own transmit time Tₜ. Dimmed architrinos keep both transmission locations visible as the pair moves on.",
  },
  {
    id: "travel",
    title: "The two wakes cross the gap",
    body: "Both wakes expand at the normalized field speed c_f=1. At this stage they are still traveling and have not yet reached their intended receivers.",
  },
  {
    id: "reception",
    title: "Each receiver meets the other wake",
    body: "At reception time Tᵣ, the positrino wake intersects the electrino receiver and the electrino wake intersects the positrino receiver.",
  },
  {
    id: "meaning",
    title: "Two reciprocal causal relationships",
    body: "Each dashed causal line connects a receiver to the other transmitter's earlier transmission location, not to the transmitter's later position.",
  },
]);

export function createStoryScene(state) {
  const view = createStoryView(state);
  const interactions = view.interactions.filter((interaction) => interaction.root);
  if (interactions.length === 0) {
    return {
      id: view.id,
      interactions: [],
      displayTime: state.receiverTime,
      showWake: false,
      showTransmissionGhost: false,
      showCausalLine: false,
      showReceptionMarker: false,
    };
  }
  const emissionTimes = interactions.map((interaction) => interaction.root.emissionTime);
  const delays = interactions.map((interaction) =>
    Math.max(0, interaction.root.receiverTime - interaction.root.emissionTime));
  const earliestEmissionTime = Math.min(...emissionTimes);
  const latestEmissionTime = Math.max(...emissionTimes);
  const receiverTime = Math.min(...interactions.map((interaction) => interaction.root.receiverTime));
  const maximumDelay = Math.max(...delays);
  const minimumDelay = Math.min(...delays);
  const stage = {
    meet: {
      startTime: Math.max(0, earliestEmissionTime - maximumDelay * 0.52),
      endTime: Math.max(0, earliestEmissionTime - maximumDelay * 0.08),
      displayTime: Math.max(0, earliestEmissionTime - maximumDelay * 0.28),
      showWake: false,
      showTransmissionGhost: false,
      showCausalLine: false,
      showReceptionMarker: false,
    },
    emission: {
      startTime: earliestEmissionTime,
      endTime: latestEmissionTime + minimumDelay * 0.16,
      displayTime: latestEmissionTime + minimumDelay * 0.08,
      showWake: true,
      showTransmissionGhost: true,
      showCausalLine: false,
      showReceptionMarker: false,
    },
    travel: {
      startTime: latestEmissionTime + minimumDelay * 0.12,
      endTime: receiverTime - minimumDelay * 0.12,
      displayTime: latestEmissionTime + (receiverTime - latestEmissionTime) * 0.52,
      showWake: true,
      showTransmissionGhost: true,
      showCausalLine: false,
      showReceptionMarker: false,
    },
    reception: {
      startTime: receiverTime - minimumDelay * 0.18,
      endTime: receiverTime,
      displayTime: receiverTime,
      showWake: true,
      showTransmissionGhost: true,
      showCausalLine: false,
      showReceptionMarker: true,
    },
    meaning: {
      startTime: earliestEmissionTime,
      endTime: receiverTime,
      displayTime: receiverTime,
      showWake: true,
      showTransmissionGhost: true,
      showCausalLine: true,
      showReceptionMarker: true,
    },
  }[view.id];
  return {
    id: view.id,
    interactions,
    ...stage,
  };
}

export function createStoryView(state) {
  const stepIndex = Math.max(0, Math.min(STORY_STEPS.length - 1, Number(state.storyStep) || 0));
  const step = STORY_STEPS[stepIndex];
  const root = state.roots.find((candidate) => candidate.id === state.selectedRootId) ?? null;
  const reciprocalRoot = state.reciprocalRoots?.find(
    (candidate) => candidate.id === state.selectedReciprocalRootId,
  ) ?? null;
  const interactions = [
    {
      id: "positrino-to-electrino",
      transmitterId: state.sourceId,
      receiverId: state.receiverId,
      root,
    },
    {
      id: "electrino-to-positrino",
      transmitterId: state.receiverId,
      receiverId: state.sourceId,
      root: reciprocalRoot,
    },
  ];
  const availableCount = interactions.filter((interaction) => interaction.root).length;
  return {
    ...step,
    stepIndex,
    stepCount: STORY_STEPS.length,
    root,
    reciprocalRoot,
    interactions,
    canGoBack: stepIndex > 0,
    canGoNext: stepIndex < STORY_STEPS.length - 1,
    summary: availableCount === 2
      ? `Two causal relationships are shown at Tᵣ=${root.receiverTime.toFixed(3)}: positrino Tₜ=${root.emissionTime.toFixed(3)} and electrino Tₜ=${reciprocalRoot.emissionTime.toFixed(3)}.`
      : `Only ${availableCount} of 2 reciprocal causal relationships is available at this receiver event.`,
  };
}

export function createPredictionView(state) {
  const choices = createPredictionChoices(state);
  const selected = choices.find((choice) => choice.id === state.selectedPredictionId) ?? null;
  return {
    title: "Which earlier transmission position matters?",
    body: "Choose the transmitter position whose wake reaches the receiver at the shown reception.",
    choices,
    selected,
    answerState: state.predictionState,
    explanation: state.predictionState === "correct"
      ? "Correct. The selected point is the causal root found by g(Tᵣ;Tₜ)=0."
      : state.predictionState === "incorrect"
        ? "That point's wake misses this reception. Try another earlier position."
        : "The answer is generated from the same causal-root evaluator used by Roots and Branch Lab.",
  };
}
