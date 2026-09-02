function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function finiteNumber(value) {
  return Number.isFinite(value) ? value : null;
}

async function waitForFrameLoad(frame, source) {
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error(`Timed out loading ${source}`)), 30000);
    frame.addEventListener("load", () => {
      clearTimeout(timeout);
      resolve();
    }, { once: true });
    frame.src = source;
  });
}

function measureNavigation(targetWindow) {
  const navigation = targetWindow.performance.getEntriesByType("navigation")[0];
  if (!navigation) throw new Error("Navigation timing is unavailable.");
  const resources = targetWindow.performance.getEntriesByType("resource");
  return {
    loadEventEndMs: finiteNumber(navigation.loadEventEnd),
    navigationTransferBytes: finiteNumber(navigation.transferSize),
    navigationEncodedBytes: finiteNumber(navigation.encodedBodySize),
    resourceCount: resources.length,
    transferBytes: (navigation.transferSize || 0) + resources.reduce((sum, entry) => sum + (entry.transferSize || 0), 0),
    encodedBytes: (navigation.encodedBodySize || 0) + resources.reduce((sum, entry) => sum + (entry.encodedBodySize || 0), 0),
    decodedBytes: (navigation.decodedBodySize || 0) + resources.reduce((sum, entry) => sum + (entry.decodedBodySize || 0), 0),
    resources: resources.map((entry) => ({
      path: new URL(entry.name).pathname,
      initiatorType: entry.initiatorType,
      transferBytes: finiteNumber(entry.transferSize),
      encodedBytes: finiteNumber(entry.encodedBodySize),
      decodedBytes: finiteNumber(entry.decodedBodySize),
    })),
  };
}

function measureHeap(targetWindow) {
  const memory = targetWindow.performance.memory;
  if (!memory) return { supported: false };
  return {
    supported: true,
    usedBytes: memory.usedJSHeapSize,
    totalBytes: memory.totalJSHeapSize,
    limitBytes: memory.jsHeapSizeLimit,
  };
}

function measureCanvasSurfaces(targetWindow) {
  const surfaces = [...targetWindow.document.querySelectorAll("canvas")].map((canvas, index) => ({
    id: canvas.id || `canvas-${index + 1}`,
    width: canvas.width,
    height: canvas.height,
    minimumSurfaceBytes: canvas.width * canvas.height * 4,
  }));
  return {
    method: "canvas color backing-store lower bound; excludes depth, textures, geometry, driver allocation, compositor copies, and shared GPU-process memory",
    surfaceCount: surfaces.length,
    minimumSurfaceBytes: surfaces.reduce((sum, surface) => sum + surface.minimumSurfaceBytes, 0),
    surfaces,
  };
}

async function measureStorage(targetWindow) {
  if (!targetWindow.navigator.storage?.estimate) return { supported: false };
  const estimate = await targetWindow.navigator.storage.estimate();
  return {
    supported: true,
    originUsageBytes: estimate.usage ?? null,
    originQuotaBytes: estimate.quota ?? null,
  };
}

async function run() {
  const frame = document.querySelector("#probe-frame");
  const output = document.querySelector("#probe-result");
  const runToken = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  await waitForFrameLoad(frame, `/borg.html?opsProbe=${encodeURIComponent(runToken)}`);
  await sleep(2000);
  const targetWindow = frame.contentWindow;
  const result = {
    schema: "architrino.borg-deployment-probe.v1",
    status: "passed",
    measuredAtUtc: new Date().toISOString(),
    route: "/borg.html",
    viewport: {
      cssWidth: targetWindow.innerWidth,
      cssHeight: targetWindow.innerHeight,
      devicePixelRatio: targetWindow.devicePixelRatio,
    },
    launch: measureNavigation(targetWindow),
    heap: measureHeap(targetWindow),
    gpuSurfaceProxy: measureCanvasSurfaces(targetWindow),
    storage: await measureStorage(targetWindow),
  };
  output.textContent = JSON.stringify(result, null, 2);
  document.body.classList.add("is-complete");
  document.title = "COMPLETE /borg.html";
}

run().catch((error) => {
  document.querySelector("#probe-result").textContent = JSON.stringify({
    schema: "architrino.borg-deployment-probe.v1",
    status: "failed",
    error: error instanceof Error ? error.message : String(error),
  }, null, 2);
  document.body.classList.add("is-complete");
  document.title = "FAILED Borg deployment probe";
});
