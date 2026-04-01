function defaultGetParticipantRootNode(participant = null) {
  return Array.isArray(participant?.hierarchy) ? participant.hierarchy[0] ?? null : null;
}

export function buildComposerReactionSolveState(options = {}) {
  const participants = Array.isArray(options.participants) ? options.participants : [];
  const mappings = Array.isArray(options.mappings) ? options.mappings : [];
  const buildNodeKey =
    typeof options.buildNodeKey === "function"
      ? options.buildNodeKey
      : (participantId, nodeId) => `${participantId}:${nodeId}`;
  const getParticipantRootNode =
    typeof options.getParticipantRootNode === "function"
      ? options.getParticipantRootNode
      : defaultGetParticipantRootNode;
  const isCenterAssemblyParticipant =
    typeof options.isCenterAssemblyParticipant === "function"
      ? options.isCenterAssemblyParticipant
      : () => false;
  const isOperatorParticipant =
    typeof options.isOperatorParticipant === "function"
      ? options.isOperatorParticipant
      : () => false;

  const state = {
    reactants: [],
    products: [],
    centerAssemblies: [],
    operators: [],
    unsupported: [],
    mappings,
  };

  participants.forEach((participant) => {
    if (!participant) {
      return;
    }
    const rootNode = getParticipantRootNode(participant);
    const entry = {
      participant,
      rootNode,
      rootNodeKey:
        participant?.id && rootNode?.id ? buildNodeKey(participant.id, rootNode.id) : "",
      isCenterAssembly: false,
      isOperator: false,
    };
    if (isOperatorParticipant(participant)) {
      entry.isOperator = true;
      state.operators.push(entry);
      return;
    }
    if (isCenterAssemblyParticipant(participant)) {
      entry.isCenterAssembly = true;
      state.centerAssemblies.push(entry);
      return;
    }
    if (participant.side === "reactant") {
      state.reactants.push(entry);
      return;
    }
    if (participant.side === "product") {
      state.products.push(entry);
      return;
    }
    state.unsupported.push(entry);
  });

  state.hasUnsupportedParticipants =
    state.unsupported.length > 0;
  state.hasReactants = state.reactants.length + state.centerAssemblies.length > 0;
  state.hasProducts = state.products.length > 0;
  return state;
}
