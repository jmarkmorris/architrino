export const BORG_DISPLAY_HOST_MEMORY_ENVELOPE_SCHEMA =
  "borg-display-host-memory-envelope/v1";
export const BORG_DISPLAY_HOST_MEMORY_POLICY_ID =
  "host-available-memory-with-reserve/v1";

export const BORG_DISPLAY_MINIMUM_MEMORY_BUDGET_BYTES = 64 * 1024 * 1024;
export const BORG_DISPLAY_MINIMUM_HOST_RESERVE_BYTES = 2 * 1024 ** 3;
export const BORG_DISPLAY_HOST_RESERVE_FRACTION = 0.2;

export function createBorgDisplayHostMemoryEnvelope({
  hostTotalMemoryBytes,
  hostAvailableMemoryBytes,
  workerResidentBytes = 0,
  previousMemoryEstimateBytes = 0,
} = {}) {
  const total = requiredByteCount(hostTotalMemoryBytes, "host total memory");
  const available = requiredByteCount(
    hostAvailableMemoryBytes,
    "host available memory",
  );
  const worker = requiredByteCount(workerResidentBytes, "EOM worker resident memory");
  const previousEstimate = requiredByteCount(
    previousMemoryEstimateBytes,
    "previous native memory estimate",
  );
  if (available > total) {
    throw new RangeError("Host available memory cannot exceed total memory.");
  }
  const proportionalReserve = Math.ceil(
    total * BORG_DISPLAY_HOST_RESERVE_FRACTION,
  );
  const reserve = Math.min(
    Math.max(
      BORG_DISPLAY_MINIMUM_HOST_RESERVE_BYTES,
      proportionalReserve,
    ),
    Math.floor(total / 2),
  );
  const availableGrowth = Math.max(0, available - reserve);
  const workerResidentLimitBytes = Math.min(
    Number.MAX_SAFE_INTEGER,
    worker + availableGrowth,
  );
  const admittedWorkerGrowth = workerResidentLimitBytes - worker;
  const requestMemoryBudgetBytes = Math.min(
    Number.MAX_SAFE_INTEGER,
    Math.max(
      BORG_DISPLAY_MINIMUM_MEMORY_BUDGET_BYTES,
      previousEstimate + admittedWorkerGrowth,
    ),
  );
  return Object.freeze({
    schema: BORG_DISPLAY_HOST_MEMORY_ENVELOPE_SCHEMA,
    policyId: BORG_DISPLAY_HOST_MEMORY_POLICY_ID,
    admitted: availableGrowth > 0,
    hostTotalMemoryBytes: total,
    hostAvailableMemoryBytes: available,
    hostReserveBytes: reserve,
    availableGrowthBytes: availableGrowth,
    workerResidentBytes: worker,
    workerResidentLimitBytes,
    previousMemoryEstimateBytes: previousEstimate,
    requestMemoryBudgetBytes,
    minimumRequestMemoryBytes: BORG_DISPLAY_MINIMUM_MEMORY_BUDGET_BYTES,
    reserveFraction: BORG_DISPLAY_HOST_RESERVE_FRACTION,
  });
}

function requiredByteCount(value, label) {
  const number = Number(value);
  if (!Number.isSafeInteger(number) || number < 0) {
    throw new TypeError(`${label} must be a nonnegative safe-integer byte count.`);
  }
  return number;
}
