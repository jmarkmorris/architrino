import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { buildReactionSolverRequestDocument } from "../src/apps/reaction/ReactionSolverRequestExportRuntime.js";

function runSolveReactionCli(requestPath) {
  return JSON.parse(
    execFileSync(process.execPath, ["scripts/solve-reaction.mjs", requestPath], {
      cwd: new URL("..", import.meta.url),
      encoding: "utf8",
    })
  );
}

test("solver request export defaults recruitment to allow-if-needed", () => {
  const request = buildReactionSolverRequestDocument({
    requestId: "recruitment-policy-default",
    participants: [],
    manualOperators: [],
    manualMappings: [],
    dissociation: {},
  });

  assert.equal(request.policy.recruitmentMode, "allow-if-needed");
});

test("weak solver closes the library reactions with ordered recruitment fallback", () => {
  const cases = [
    {
      requestPath: "content/contracts/examples/pdg/v1/generated/charged_pion_to_muon_neutrino.live-pdg.solver-request.v1.json",
      expectedRuleFamily: "weak-meson-charged-pion-decay",
      expectedRecruitTemplate: null,
    },
    {
      requestPath: "content/contracts/examples/pdg/v1/generated/muon_decay.live-pdg.solver-request.v1.json",
      expectedRuleFamily: "weak-lepton-decay",
      expectedRecruitTemplate: "noether_pair",
    },
    {
      requestPath: "content/contracts/examples/pdg/v1/generated/muon_to_electron_photon.live-pdg.solver-request.v1.json",
      expectedRuleFamily: "weak-lepton-radiative-conversion",
      expectedRecruitTemplate: "noether_pair",
    },
    {
      requestPath: "content/contracts/examples/pdg/v1/generated/free_neutron_beta_decay.live-pdg.solver-request.v1.json",
      expectedRuleFamily: "weak-baryon-beta-decay",
      expectedRecruitTemplate: "noether_pair",
    },
    {
      requestPath: "content/contracts/examples/pdg/v1/generated/radiative_muon_decay.live-pdg.solver-request.v1.json",
      expectedRuleFamily: "weak-lepton-decay-radiative",
      expectedRecruitTemplate: "noether_quad",
    },
    {
      requestPath: "content/contracts/examples/pdg/v1/generated/radiative_free_neutron_beta_decay.live-pdg.solver-request.v1.json",
      expectedRuleFamily: "weak-baryon-beta-decay-radiative",
      expectedRecruitTemplate: "noether_quad",
    },
  ];

  for (const { requestPath, expectedRuleFamily, expectedRecruitTemplate } of cases) {
    const result = runSolveReactionCli(requestPath);

    assert.equal(result.summary.outcome, "exact", requestPath);
    assert.equal(result.summary.exact, true, requestPath);
    assert.equal(
      result.steps.some((step) => step.ruleFamily === expectedRuleFamily),
      true,
      `${requestPath} should use ${expectedRuleFamily}`
    );

    const recruitParticipants = result.participants.filter(
      (participant) =>
        participant.origin === "solve-generated-intermediate" &&
        ["noether_pair", "noether_quad"].includes(participant.templateId)
    );

    if (expectedRecruitTemplate) {
      assert.equal(
        result.steps.some((step) => step.kind === "recruit" && step.ruleFamily === "recruit-spacetime-supplement"),
        true,
        `${requestPath} should record an explicit recruit step`
      );
      assert.equal(
        recruitParticipants.some((participant) => participant.templateId === expectedRecruitTemplate),
        true,
        `${requestPath} should recruit ${expectedRecruitTemplate}`
      );
    } else {
      assert.equal(
        result.steps.some((step) => step.kind === "recruit"),
        false,
        `${requestPath} should not recruit when authored closure is enough`
      );
      assert.equal(recruitParticipants.length, 0, `${requestPath} should not emit recruited supplements`);
    }
  }
});
