import { SOLVER_APP_WORKER_PROTOCOL_VERSION } from "../src/solver/app/SolverAppWorkerBridge.mjs";

export function createSolverBridgeLoopbackWorker(methodHandlers = {}) {
  const listeners = new Set();
  const worker = {
    terminated: false,
    messages: [],
    addEventListener(type, listener) {
      if (type === "message") {
        listeners.add(listener);
      }
    },
    removeEventListener(type, listener) {
      if (type === "message") {
        listeners.delete(listener);
      }
    },
    postMessage(message) {
      worker.messages.push(message);
      queueMicrotask(async () => {
        try {
          const handler = methodHandlers[message.method];
          const response = handler ? await handler(message.request, message) : {};
          emitWorkerMessage(listeners, {
            schema: message.schema ?? SOLVER_APP_WORKER_PROTOCOL_VERSION,
            type: "response",
            requestId: message.requestId,
            method: message.method,
            response,
          });
        } catch (error) {
          emitWorkerMessage(listeners, {
            schema: message.schema ?? SOLVER_APP_WORKER_PROTOCOL_VERSION,
            type: "error",
            requestId: message.requestId,
            method: message.method,
            status: {
              code: "internal_solver_error",
              severity: "error",
              message: error?.message ?? "solver worker loopback error",
              recoverable: true,
            },
          });
        }
      });
    },
    terminate() {
      worker.terminated = true;
    },
  };
  return worker;
}

function emitWorkerMessage(listeners, message) {
  for (const listener of listeners) {
    listener({ data: message });
  }
}
