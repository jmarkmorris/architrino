import {
  computePotentialSamples,
  createPotentialSamplesRunRequest,
} from "../../aaa-core/potential-v1.mjs";

export function createTopoPotentialSamplesRunRequest(request = {}) {
  return createPotentialSamplesRunRequest({...request, consumerId: "topo"});
}

export function computeTopoPotentialSamples(request = {}, dependencies = {}) {
  return computePotentialSamples({...request, consumerId: "topo"}, dependencies);
}
