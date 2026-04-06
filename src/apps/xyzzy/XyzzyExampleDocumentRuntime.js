import { XYZZY_SCHEMA } from "./XyzzyConstants.js";

export const XYZZY_DEFAULT_DOCUMENT = Object.freeze({
  schema: XYZZY_SCHEMA,
  assemblies: [
    Object.freeze({
      id: "assembly_reactant_neutron",
      type: "baryon",
      x: 2,
      y: 1,
      title: "Neutron",
      role: "reactant",
      tiles: Object.freeze([
        Object.freeze({ kind: "title", text: "Neu" }),
        Object.freeze({ kind: "binary", text: "d" }),
        Object.freeze({ kind: "binary", text: "u" }),
        Object.freeze({ kind: "binary", text: "d" }),
      ]),
    }),
    Object.freeze({
      id: "assembly_intermediate_free_architrinos",
      type: "free_architrinos",
      x: 9,
      y: 1,
      title: "Free Architrinos",
      role: "intermediate",
      tiles: Object.freeze([
        Object.freeze({ kind: "title", text: "Free" }),
        Object.freeze({ kind: "free-electrino", circleCount: 1 }),
        Object.freeze({ kind: "free-positrino", circleCount: 1 }),
        Object.freeze({ kind: "ledger", positrinoCount: 1, electrinoCount: 1 }),
      ]),
    }),
    Object.freeze({
      id: "assembly_product_proton",
      type: "baryon",
      x: 16,
      y: 1,
      title: "Proton",
      role: "product",
      tiles: Object.freeze([
        Object.freeze({ kind: "title", text: "Pro" }),
        Object.freeze({ kind: "binary", text: "u" }),
        Object.freeze({ kind: "binary", text: "d" }),
        Object.freeze({ kind: "binary", text: "u" }),
      ]),
    }),
    Object.freeze({
      id: "assembly_product_electron",
      type: "lepton",
      x: 16,
      y: 3,
      title: "Electron",
      role: "product",
      tiles: Object.freeze([
        Object.freeze({ kind: "title", text: "Ele" }),
        Object.freeze({ kind: "binary", text: "e-" }),
        Object.freeze({ kind: "binary", text: "" }),
        Object.freeze({ kind: "binary", text: "" }),
      ]),
    }),
  ],
  operators: [
    Object.freeze({
      id: "operator_dissociate",
      type: "dissociate",
      x: 7,
      y: 1,
      title: "Dissociate",
      positrinoCount: 1,
      electrinoCount: 1,
    }),
    Object.freeze({
      id: "operator_pass_thru",
      type: "pass_thru",
      x: 14,
      y: 1,
      title: "Pass Thru",
      positrinoCount: 1,
      electrinoCount: 1,
    }),
    Object.freeze({
      id: "operator_associate",
      type: "associate",
      x: 14,
      y: 3,
      title: "Associate",
      positrinoCount: 1,
      electrinoCount: 1,
    }),
  ],
  links: [
    Object.freeze({
      id: "link_neutron_to_dissociate",
      endpointA: "assembly_reactant_neutron",
      endpointB: "operator_dissociate",
    }),
    Object.freeze({
      id: "link_dissociate_to_free_architrinos",
      endpointA: "operator_dissociate",
      endpointB: "assembly_intermediate_free_architrinos",
    }),
    Object.freeze({
      id: "link_free_architrinos_to_pass_thru",
      endpointA: "assembly_intermediate_free_architrinos",
      endpointB: "operator_pass_thru",
    }),
    Object.freeze({
      id: "link_pass_thru_to_proton",
      endpointA: "operator_pass_thru",
      endpointB: "assembly_product_proton",
    }),
    Object.freeze({
      id: "link_free_architrinos_to_associate",
      endpointA: "assembly_intermediate_free_architrinos",
      endpointB: "operator_associate",
    }),
    Object.freeze({
      id: "link_associate_to_electron",
      endpointA: "operator_associate",
      endpointB: "assembly_product_electron",
    }),
  ],
  compositeLabels: [
    Object.freeze({
      id: "label_inputs",
      column: 1,
      text: "Inputs",
      rowStart: 1,
      rowEnd: 1,
    }),
    Object.freeze({
      id: "label_outputs",
      column: 20,
      text: "Outputs",
      rowStart: 1,
      rowEnd: 3,
    }),
  ],
});

export function cloneXyzzyDefaultDocument() {
  if (typeof globalThis.structuredClone === "function") {
    return globalThis.structuredClone(XYZZY_DEFAULT_DOCUMENT);
  }
  return JSON.parse(JSON.stringify(XYZZY_DEFAULT_DOCUMENT));
}
