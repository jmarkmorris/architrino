export function buildFixtureRenderModel(selection) {
  if (!selection?.response?.schema) {
    throw new Error("fixture selection with response schema is required");
  }

  if (selection.response.schema === "archie-answer-artifact-manifest/v1") {
    return buildManifestRenderModel(selection);
  }
  if (selection.response.schema === "archie-service-terms/v1") {
    return buildServiceTermsRenderModel(selection);
  }
  if (selection.response.schema === "archie-service-status/v1") {
    return buildServiceStatusRenderModel(selection);
  }

  throw new Error(`Unsupported fixture response schema for rendering: ${selection.response.schema}`);
}

function buildManifestRenderModel(selection) {
  const manifest = selection.response;
  const actions = manifest.availableActions ?? [];
  const issueDraftArtifacts = (manifest.artifacts ?? []).filter((artifact) => artifact.artifactType === "issue_draft");

  return baseRenderModel(selection, {
    sourceChips: manifest.sourceContext?.sourceChips ?? [],
    claimLabel: manifest.claimContext?.claimLabel ?? null,
    displayedVerbatimText: {
      displayedText: manifest.answerBody?.displayedText ?? null,
      segments: (manifest.answerBody?.verbatimSegments ?? []).map((segment) => ({
        segmentId: segment.segmentId,
        text: segment.text,
      })),
    },
    tokenReceipt: manifest.tokenReceipt
      ? {
          receiptId: manifest.tokenReceipt.receiptId,
          capStatus: manifest.tokenReceipt.capStatus,
          chargedTokens: manifest.tokenReceipt.chargedTokens,
          refundedTokens: manifest.tokenReceipt.refundedTokens,
          workUnits: manifest.tokenReceipt.workUnits ?? [],
          privatePromptIncluded: manifest.tokenReceipt.privatePromptIncluded,
        }
      : null,
    actionConfirmations: actions.map((action) => ({
      actionType: action.actionType,
      preflightStatus: action.preflightStatus,
      confirmationRequired: action.confirmationRequired,
      confirmationReasons: action.confirmationReasons ?? [],
      destinationClass: action.destinationClass,
    })),
    speechSync: manifest.speechSync
      ? {
          status: manifest.speechSync.status,
          audioArtifactId: manifest.speechSync.audioArtifactId,
          segmentIds: (manifest.speechSync.segments ?? []).map((segment) => segment.segmentId),
        }
      : null,
    issueDraft:
      issueDraftArtifacts.length > 0
        ? {
            artifactIds: issueDraftArtifacts.map((artifact) => artifact.artifactId),
            issueMiningEnabled: manifest.issueMiningContext?.enabled === true,
            duplicateKeys: manifest.issueMiningContext?.duplicateKeys ?? [],
            ownerLane: manifest.issueMiningContext?.ownerLane ?? null,
            publicIssueUrl: manifest.issueMiningContext?.publicIssueUrl ?? null,
            privatePromptIncluded: manifest.issueMiningContext?.privatePromptIncluded,
          }
        : null,
    serviceTerms: null,
    serviceStatus: null,
    invariants: {
      authorityOrigin: "manifest",
      sideChannelAuthorityAllowed: false,
      providerSecretsIncluded: manifest.providerExecutionContext?.noBrowserKeys !== true,
      privatePromptIncluded: Boolean(
        manifest.tokenReceipt?.privatePromptIncluded ||
          manifest.issueMiningContext?.privatePromptIncluded ||
          manifest.privatePromptIncluded
      ),
    },
  });
}

function buildServiceTermsRenderModel(selection) {
  const terms = selection.response;
  return baseRenderModel(selection, {
    sourceChips: [],
    claimLabel: null,
    displayedVerbatimText: null,
    tokenReceipt: null,
    actionConfirmations: [],
    speechSync: null,
    issueDraft: null,
    serviceTerms: {
      versionSetId: terms.versionSetId,
      legalTermsRoute: terms.legalTermsRoute,
      supportRoute: terms.supportRoute,
      legalReviewState: terms.legalReviewState,
      generatedMediaTermsVersion: terms.generatedMediaTermsVersion,
      githubHandoffNoticeVersion: terms.githubHandoffNoticeVersion,
      tokenSubscriptionTermsVersion: terms.tokenSubscriptionTermsVersion,
    },
    serviceStatus: null,
    invariants: {
      authorityOrigin: "service_terms",
      sideChannelAuthorityAllowed: false,
      providerSecretsIncluded: false,
      privatePromptIncluded: false,
    },
  });
}

function buildServiceStatusRenderModel(selection) {
  const status = selection.response;
  return baseRenderModel(selection, {
    sourceChips: [],
    claimLabel: null,
    displayedVerbatimText: null,
    tokenReceipt: null,
    actionConfirmations: [],
    speechSync: null,
    issueDraft: null,
    serviceTerms: null,
    serviceStatus: {
      statusId: status.statusId,
      serviceStatus: status.serviceStatus,
      answerStatus: status.answerStatus,
      sourceStatus: status.sourceStatus,
      speechStatus: status.speechStatus,
      visualStatus: status.visualStatus,
      issueHandoffStatus: status.issueHandoffStatus,
      tokenStatus: status.tokenStatus,
      termsStatus: status.termsStatus,
      currentIncidents: status.currentIncidents ?? [],
      privatePromptIncluded: status.privatePromptIncluded,
    },
    invariants: {
      authorityOrigin: "service_status",
      sideChannelAuthorityAllowed: false,
      providerSecretsIncluded: false,
      privatePromptIncluded: status.privatePromptIncluded !== false,
    },
  });
}

function baseRenderModel(selection, fields) {
  return {
    schema: "archie-fixture-render-model/v1",
    endpointId: selection.endpointId,
    caseId: selection.caseId,
    responseKind: selection.responseKind,
    responseSchema: selection.responseSchema,
    responseFixture: selection.responseFixture,
    ...fields,
  };
}
