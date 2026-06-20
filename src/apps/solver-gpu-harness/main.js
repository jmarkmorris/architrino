const WORKGROUP_SIZE = 128;
const DEFAULT_TOLERANCE = 0.015;
const PAIR_COUNT_OPTIONS = [65536, 262144, 1048576, 2097152];
const REPETITION_OPTIONS = [1, 3, 5, 9];

const elements = {
  status: document.getElementById("gpu-status"),
  adapterInfo: document.getElementById("adapter-info"),
  pairCount: document.getElementById("pair-count"),
  repetitions: document.getElementById("repetitions"),
  tolerance: document.getElementById("hit-tolerance"),
  runBoth: document.getElementById("run-both"),
  runCpu: document.getElementById("run-cpu"),
  runGpu: document.getElementById("run-gpu"),
  rows: document.getElementById("result-rows"),
  log: document.getElementById("benchmark-log"),
  cpuMs: document.getElementById("metric-cpu-ms"),
  gpuMs: document.getElementById("metric-gpu-ms"),
  gpuDispatchMs: document.getElementById("metric-gpu-dispatch-ms"),
  speedup: document.getElementById("metric-speedup"),
};

const datasetCache = new Map();
let gpuRuntimePromise = null;
let lastCpuResult = null;
let lastGpuResult = null;

const shaderSource = `
struct Params {
  pair_count: u32,
  tolerance: f32,
  _pad0: u32,
  _pad1: u32,
};

@group(0) @binding(0) var<storage, read> sources: array<vec4<f32>>;
@group(0) @binding(1) var<storage, read> receivers: array<vec4<f32>>;
@group(0) @binding(2) var<storage, read> radii: array<f32>;
@group(0) @binding(3) var<storage, read_write> hits: array<u32>;
@group(0) @binding(4) var<uniform> params: Params;

@compute @workgroup_size(${WORKGROUP_SIZE})
fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
  let index = global_id.x;
  if (index >= params.pair_count) {
    return;
  }

  let delta = receivers[index].xyz - sources[index].xyz;
  let distance = sqrt(dot(delta, delta));
  let residual = abs(distance - radii[index]);
  hits[index] = select(0u, 1u, residual < params.tolerance);
}
`;

function formatCount(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

function formatMs(value) {
  return Number.isFinite(value) ? `${value.toFixed(value < 10 ? 2 : 1)} ms` : "--";
}

function formatRate(value) {
  if (!Number.isFinite(value)) {
    return "--";
  }
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(2)}M`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }
  return value.toFixed(0);
}

function logLine(message) {
  const timestamp = new Date().toLocaleTimeString();
  elements.log.textContent = `${elements.log.textContent}[${timestamp}] ${message}\n`;
  elements.log.scrollTop = elements.log.scrollHeight;
}

function setBusy(isBusy) {
  elements.runBoth.disabled = isBusy;
  elements.runCpu.disabled = isBusy;
  elements.runGpu.disabled = isBusy || !navigator.gpu;
  elements.pairCount.disabled = isBusy;
  elements.repetitions.disabled = isBusy;
  elements.tolerance.disabled = isBusy;
}

function populateControls() {
  for (const count of PAIR_COUNT_OPTIONS) {
    const option = document.createElement("option");
    option.value = String(count);
    option.textContent = formatCount(count);
    elements.pairCount.append(option);
  }
  elements.pairCount.value = String(262144);

  for (const repetitions of REPETITION_OPTIONS) {
    const option = document.createElement("option");
    option.value = String(repetitions);
    option.textContent = String(repetitions);
    elements.repetitions.append(option);
  }
  elements.repetitions.value = "3";
  elements.tolerance.value = String(DEFAULT_TOLERANCE);
}

function readBenchmarkSettings() {
  return {
    pairCount: Number.parseInt(elements.pairCount.value, 10),
    repetitions: Number.parseInt(elements.repetitions.value, 10),
    tolerance: Number.parseFloat(elements.tolerance.value),
  };
}

function deterministicUnit(index, salt) {
  const raw = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453123;
  return raw - Math.floor(raw);
}

function getDataset(pairCount, tolerance) {
  const key = `${pairCount}:${tolerance}`;
  const cached = datasetCache.get(key);
  if (cached) {
    return cached;
  }

  const sources = new Float32Array(pairCount * 4);
  const receivers = new Float32Array(pairCount * 4);
  const radii = new Float32Array(pairCount);
  let expectedHits = 0;

  for (let index = 0; index < pairCount; index += 1) {
    const offset = index * 4;
    const sx = (deterministicUnit(index, 1) - 0.5) * 180;
    const sy = (deterministicUnit(index, 2) - 0.5) * 180;
    const sz = (deterministicUnit(index, 3) - 0.5) * 180;
    const rx = sx + (deterministicUnit(index, 4) - 0.5) * 26;
    const ry = sy + (deterministicUnit(index, 5) - 0.5) * 26;
    const rz = sz + (deterministicUnit(index, 6) - 0.5) * 26;

    sources[offset] = Math.fround(sx);
    sources[offset + 1] = Math.fround(sy);
    sources[offset + 2] = Math.fround(sz);
    sources[offset + 3] = 0;
    receivers[offset] = Math.fround(rx);
    receivers[offset + 1] = Math.fround(ry);
    receivers[offset + 2] = Math.fround(rz);
    receivers[offset + 3] = 0;

    const dx = Math.fround(receivers[offset] - sources[offset]);
    const dy = Math.fround(receivers[offset + 1] - sources[offset + 1]);
    const dz = Math.fround(receivers[offset + 2] - sources[offset + 2]);
    const distance = Math.fround(Math.sqrt(Math.fround(dx * dx + dy * dy + dz * dz)));
    const shouldHit = index % 23 === 0 || index % 211 === 7;
    const residual = shouldHit ? tolerance * 0.25 : tolerance * (4.5 + (index % 7) * 0.4);
    radii[index] = Math.fround(distance + residual);
    expectedHits += shouldHit ? 1 : 0;
  }

  const dataset = { sources, receivers, radii, expectedHits, pairCount, tolerance };
  datasetCache.set(key, dataset);
  return dataset;
}

function updateChecksum(checksum, hit, index) {
  if (!hit) {
    return checksum;
  }
  return Math.imul(checksum ^ ((index + 1) >>> 0), 16777619) >>> 0;
}

function summarizeHits(hits) {
  let hitCount = 0;
  let checksum = 2166136261;
  for (let index = 0; index < hits.length; index += 1) {
    const hit = hits[index] === 1;
    hitCount += hit ? 1 : 0;
    checksum = updateChecksum(checksum, hit, index);
  }
  return { hitCount, checksum };
}

function runCpuBenchmark(settings) {
  const dataset = getDataset(settings.pairCount, settings.tolerance);
  const hits = new Uint32Array(settings.pairCount);
  const startedAt = performance.now();

  for (let repeat = 0; repeat < settings.repetitions; repeat += 1) {
    for (let index = 0; index < settings.pairCount; index += 1) {
      const offset = index * 4;
      const dx = Math.fround(dataset.receivers[offset] - dataset.sources[offset]);
      const dy = Math.fround(dataset.receivers[offset + 1] - dataset.sources[offset + 1]);
      const dz = Math.fround(dataset.receivers[offset + 2] - dataset.sources[offset + 2]);
      const distance = Math.fround(Math.sqrt(Math.fround(dx * dx + dy * dy + dz * dz)));
      const residual = Math.abs(Math.fround(distance - dataset.radii[index]));
      hits[index] = residual < settings.tolerance ? 1 : 0;
    }
  }

  const totalMs = performance.now() - startedAt;
  const summary = summarizeHits(hits);
  return {
    path: "CPU f32",
    pairCount: settings.pairCount,
    repetitions: settings.repetitions,
    totalMs,
    dispatchMs: null,
    pairsPerSecond: (settings.pairCount * settings.repetitions) / (totalMs / 1000),
    ...summary,
  };
}

async function readAdapterInfo(adapter) {
  if (typeof adapter.requestAdapterInfo === "function") {
    return adapter.requestAdapterInfo();
  }
  return adapter.info ?? {};
}

function describeAdapter(info) {
  const parts = [info.vendor, info.architecture, info.device, info.description]
    .map((part) => String(part || "").trim())
    .filter(Boolean);
  return parts.length ? parts.join(" / ") : "WebGPU adapter available";
}

async function getGpuRuntime() {
  if (!navigator.gpu) {
    throw new Error("WebGPU is not available in this browser.");
  }

  if (gpuRuntimePromise) {
    return gpuRuntimePromise;
  }

  gpuRuntimePromise = (async () => {
    const adapter = await navigator.gpu.requestAdapter({
      powerPreference: "high-performance",
    });
    if (!adapter) {
      throw new Error("No WebGPU adapter was returned by the browser.");
    }

    const adapterInfo = await readAdapterInfo(adapter);
    const device = await adapter.requestDevice();
    device.lost.then((info) => {
      logLine(`GPU device lost: ${info.reason || "unknown reason"}`);
      gpuRuntimePromise = null;
    });

    const shaderModule = device.createShaderModule({ code: shaderSource });
    const pipeline = device.createComputePipeline({
      layout: "auto",
      compute: {
        module: shaderModule,
        entryPoint: "main",
      },
    });

    elements.adapterInfo.textContent = describeAdapter(adapterInfo);
    elements.status.textContent = "WebGPU ready";
    return { adapterInfo, device, pipeline };
  })();

  return gpuRuntimePromise;
}

function createUploadBuffer(device, data, usage) {
  const buffer = device.createBuffer({
    size: data.byteLength,
    usage,
    mappedAtCreation: true,
  });
  const mappedRange = buffer.getMappedRange();
  if (ArrayBuffer.isView(data)) {
    new data.constructor(mappedRange).set(data);
  } else {
    new Uint8Array(mappedRange).set(new Uint8Array(data));
  }
  buffer.unmap();
  return buffer;
}

function createParamBuffer(settings) {
  const data = new ArrayBuffer(16);
  const view = new DataView(data);
  view.setUint32(0, settings.pairCount, true);
  view.setFloat32(4, settings.tolerance, true);
  view.setUint32(8, 0, true);
  view.setUint32(12, 0, true);
  return data;
}

async function runGpuBenchmark(settings) {
  const runtime = await getGpuRuntime();
  const dataset = getDataset(settings.pairCount, settings.tolerance);
  const { device, pipeline } = runtime;
  const hitsByteLength = settings.pairCount * Uint32Array.BYTES_PER_ELEMENT;
  const setupStartedAt = performance.now();
  const sourceBuffer = createUploadBuffer(
    device,
    dataset.sources,
    GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
  );
  const receiverBuffer = createUploadBuffer(
    device,
    dataset.receivers,
    GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
  );
  const radiiBuffer = createUploadBuffer(
    device,
    dataset.radii,
    GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
  );
  const hitBuffer = device.createBuffer({
    size: hitsByteLength,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC,
  });
  const paramBuffer = createUploadBuffer(
    device,
    createParamBuffer(settings),
    GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
  );
  const readbackBuffer = device.createBuffer({
    size: hitsByteLength,
    usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST,
  });
  const bindGroup = device.createBindGroup({
    layout: pipeline.getBindGroupLayout(0),
    entries: [
      { binding: 0, resource: { buffer: sourceBuffer } },
      { binding: 1, resource: { buffer: receiverBuffer } },
      { binding: 2, resource: { buffer: radiiBuffer } },
      { binding: 3, resource: { buffer: hitBuffer } },
      { binding: 4, resource: { buffer: paramBuffer } },
    ],
  });
  const setupMs = performance.now() - setupStartedAt;
  const dispatchStartedAt = performance.now();
  const commandEncoder = device.createCommandEncoder();
  const workgroupCount = Math.ceil(settings.pairCount / WORKGROUP_SIZE);

  for (let repeat = 0; repeat < settings.repetitions; repeat += 1) {
    const pass = commandEncoder.beginComputePass();
    pass.setPipeline(pipeline);
    pass.setBindGroup(0, bindGroup);
    pass.dispatchWorkgroups(workgroupCount);
    pass.end();
  }

  commandEncoder.copyBufferToBuffer(hitBuffer, 0, readbackBuffer, 0, hitsByteLength);
  device.queue.submit([commandEncoder.finish()]);
  await readbackBuffer.mapAsync(GPUMapMode.READ);
  const mappedHits = new Uint32Array(readbackBuffer.getMappedRange().slice(0));
  readbackBuffer.unmap();
  const dispatchMs = performance.now() - dispatchStartedAt;
  const summary = summarizeHits(mappedHits);

  sourceBuffer.destroy();
  receiverBuffer.destroy();
  radiiBuffer.destroy();
  hitBuffer.destroy();
  paramBuffer.destroy();
  readbackBuffer.destroy();

  const totalMs = setupMs + dispatchMs;
  return {
    path: "GPU WebGPU f32",
    pairCount: settings.pairCount,
    repetitions: settings.repetitions,
    totalMs,
    dispatchMs,
    setupMs,
    pairsPerSecond: (settings.pairCount * settings.repetitions) / (totalMs / 1000),
    ...summary,
  };
}

function renderRows(results) {
  if (!results.length) {
    elements.rows.innerHTML = `<tr><td colspan="7">No benchmark run yet.</td></tr>`;
    return;
  }

  elements.rows.replaceChildren(
    ...results.map((result) => {
      const row = document.createElement("tr");
      const values = [
        result.path,
        formatCount(result.pairCount),
        String(result.repetitions),
        result.totalMs.toFixed(2),
        formatRate(result.pairsPerSecond),
        formatCount(result.hitCount),
        `0x${result.checksum.toString(16).padStart(8, "0")}`,
      ];
      for (const value of values) {
        const cell = document.createElement("td");
        cell.textContent = value;
        row.append(cell);
      }
      return row;
    })
  );
}

function updateMetrics() {
  elements.cpuMs.textContent = formatMs(lastCpuResult?.totalMs);
  elements.gpuMs.textContent = formatMs(lastGpuResult?.totalMs);
  elements.gpuDispatchMs.textContent = formatMs(lastGpuResult?.dispatchMs);
  if (lastCpuResult && lastGpuResult) {
    elements.speedup.textContent = `${(lastCpuResult.totalMs / lastGpuResult.totalMs).toFixed(2)}x`;
  } else {
    elements.speedup.textContent = "--";
  }
}

function renderResults() {
  renderRows([lastCpuResult, lastGpuResult].filter(Boolean));
  updateMetrics();

  if (lastCpuResult && lastGpuResult) {
    const parity =
      lastCpuResult.hitCount === lastGpuResult.hitCount &&
      lastCpuResult.checksum === lastGpuResult.checksum;
    logLine(
      parity
        ? "CPU/GPU parity matched for hit count and checksum."
        : "CPU/GPU parity differed; inspect tolerance, adapter precision, or kernel code."
    );
  }
}

async function runSelected(paths) {
  const settings = readBenchmarkSettings();
  setBusy(true);
  try {
    const dataset = getDataset(settings.pairCount, settings.tolerance);
    logLine(
      `Dataset ready: ${formatCount(settings.pairCount)} pairs, ${formatCount(dataset.expectedHits)} seeded hits.`
    );
    if (paths.includes("cpu")) {
      logLine("Running CPU f32 benchmark.");
      lastCpuResult = runCpuBenchmark(settings);
      logLine(`CPU complete: ${formatMs(lastCpuResult.totalMs)}.`);
    }
    if (paths.includes("gpu")) {
      logLine("Running WebGPU f32 benchmark.");
      lastGpuResult = await runGpuBenchmark(settings);
      logLine(
        `GPU complete: ${formatMs(lastGpuResult.totalMs)} total, ${formatMs(
          lastGpuResult.dispatchMs
        )} dispatch/readback.`
      );
    }
    renderResults();
  } catch (error) {
    logLine(String(error?.message || error));
  } finally {
    setBusy(false);
  }
}

async function initializeGpuStatus() {
  if (!navigator.gpu) {
    elements.status.textContent = "WebGPU unavailable";
    elements.adapterInfo.textContent = "This browser did not expose navigator.gpu.";
    elements.runGpu.disabled = true;
    return;
  }

  try {
    await getGpuRuntime();
  } catch (error) {
    elements.status.textContent = "WebGPU unavailable";
    elements.adapterInfo.textContent = String(error?.message || error);
    elements.runGpu.disabled = true;
  }
}

function bindEvents() {
  elements.runBoth.addEventListener("click", () => runSelected(["cpu", "gpu"]));
  elements.runCpu.addEventListener("click", () => runSelected(["cpu"]));
  elements.runGpu.addEventListener("click", () => runSelected(["gpu"]));
}

populateControls();
bindEvents();
initializeGpuStatus();
