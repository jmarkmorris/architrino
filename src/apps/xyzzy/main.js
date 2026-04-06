import { createXyzzyAppRuntime } from "./XyzzyAppRuntime.js";

const xyzzyAppRuntime = createXyzzyAppRuntime({
  root: document.getElementById("xyzzy-surface"),
  statusElement: document.getElementById("xyzzy-status"),
  diagnosticsElement: document.getElementById("xyzzy-diagnostics"),
  jsonTextarea: document.getElementById("xyzzy-json"),
  applyJsonButton: document.getElementById("xyzzy-apply-json"),
  resetExampleButton: document.getElementById("xyzzy-reset-example"),
  exportJsonButton: document.getElementById("xyzzy-export-json"),
});

void xyzzyAppRuntime.init();
