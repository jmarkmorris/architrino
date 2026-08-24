import test from "node:test";
import assert from "node:assert/strict";

import { toArchitrinoWebUrl } from "../scripts/ios-textbook-link-routing.mjs";

test("iOS textbook links preserve the public Equation Mapping page and semantic hash", () => {
  assert.equal(
    toArchitrinoWebUrl(
      "../../../../equation-mapping.html#lorentz-clock-rate",
      "equation-mapping.html"
    ),
    "https://architrino.com/equation-mapping.html#lorentz-clock-rate"
  );
});

test("iOS textbook links retain the established ideal-braid clean route", () => {
  assert.equal(
    toArchitrinoWebUrl("../../../../ideal-braid.html#lesson", "ideal-braid.html"),
    "https://architrino.com/ideal-braid#lesson"
  );
});
