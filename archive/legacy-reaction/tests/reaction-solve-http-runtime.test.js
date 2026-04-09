import test from "node:test";
import assert from "node:assert/strict";

import {
  handleReactionSolveApiRequest,
  isReactionSolveApiRequest,
} from "../scripts/dev/ReactionSolveHttpRuntime.mjs";

function createRequest({ method = "POST", url = "/api/reaction/solve", body = "{}" } = {}) {
  const chunks = [Buffer.from(body, "utf8")];
  return {
    method,
    url,
    async *[Symbol.asyncIterator]() {
      for (const chunk of chunks) {
        yield chunk;
      }
    },
  };
}

function createResponse() {
  return {
    statusCode: 0,
    headers: null,
    body: "",
    writeHead(statusCode, headers) {
      this.statusCode = statusCode;
      this.headers = headers;
    },
    end(body = "") {
      this.body = String(body ?? "");
    },
  };
}

test("reaction solve http runtime matches the local solve API route", () => {
  assert.equal(isReactionSolveApiRequest({ method: "POST", url: "/api/reaction/solve" }), true);
  assert.equal(isReactionSolveApiRequest({ method: "GET", url: "/api/reaction/solve" }), false);
  assert.equal(isReactionSolveApiRequest({ method: "POST", url: "/reaction.html" }), false);
});

test("reaction solve http runtime handles a local solve API request", async () => {
  const request = createRequest({
    body: JSON.stringify({ schema: "solver-request/v1", requestId: "browser_test" }),
  });
  const response = createResponse();
  const handled = await handleReactionSolveApiRequest(request, response, {
    repoRoot: "/tmp/architrino",
    executeSolveRequest: (sourceText) => ({
      echoedRequestId: JSON.parse(sourceText).requestId,
    }),
  });

  assert.equal(handled, true);
  assert.equal(response.statusCode, 200);
  assert.match(response.headers["Content-Type"], /application\/json/);
  assert.deepEqual(JSON.parse(response.body), {
    echoedRequestId: "browser_test",
  });
});

test("reaction solve http runtime returns a json error for invalid request bodies", async () => {
  const request = createRequest({ body: "{invalid json" });
  const response = createResponse();

  const handled = await handleReactionSolveApiRequest(request, response, {
    repoRoot: "/tmp/architrino",
  });

  assert.equal(handled, true);
  assert.equal(response.statusCode, 400);
  assert.equal(typeof JSON.parse(response.body).error, "string");
});

test("reaction solve http runtime reports a timeout when the solve subprocess stalls", async () => {
  const request = createRequest({
    body: JSON.stringify({ schema: "solver-request/v1", requestId: "timeout_test" }),
  });
  const response = createResponse();
  const timeoutError = new Error("Command timed out");
  timeoutError.code = "ETIMEDOUT";

  const handled = await handleReactionSolveApiRequest(request, response, {
    repoRoot: "/tmp/architrino",
    executeSolveRequest: () => {
      throw timeoutError;
    },
  });

  assert.equal(handled, true);
  assert.equal(response.statusCode, 504);
  assert.match(JSON.parse(response.body).error, /timed out/i);
});
