import { BORG_DATASET_MANIFEST_V1 } from "./BorgFixtureData.js";

export const BORG_FIXTURE_TRAJECTORY_VERSION = "borg-fixture-trajectory.v1";

const TRAJECTORY_URL = new URL("./borg-fixture-trajectory.v1.json", import.meta.url);

let pendingLoad = null;

/**
 * The full 24k-row native trajectory record.
 *
 * This is kept out of BorgFixtureData.js on purpose. The browser parses that
 * module before it can paint anything, and the trajectory is needed by neither
 * the first frame nor a live run: the live runner seeds from the frameIndex-0
 * rows alone. Only two consumers need the whole record, and both can wait for
 * it — the EOM shadow run, which replays it as retained history, and the
 * fixture fallback, which replays it when no solver is reachable.
 *
 * The record stays authoritative solver output; moving it off the first-paint
 * path changes when it is read, not what it says.
 */
export function loadBorgFixtureTrajectory({ fetchLike, manifest = BORG_DATASET_MANIFEST_V1 } = {}) {
  pendingLoad ??= readTrajectory(fetchLike).then((trajectory) =>
    assertTrajectoryMatchesManifest(trajectory, manifest),
  );
  return pendingLoad;
}

/** Frame rows only, for consumers that just want history to replay. */
export async function loadBorgFixtureTrajectoryFrames(options = {}) {
  const trajectory = await loadBorgFixtureTrajectory(options);
  return trajectory.currentStateFrames;
}

async function readTrajectory(fetchLike) {
  // Node reads the asset from disk; the browser fetches it.
  if (TRAJECTORY_URL.protocol === "file:") {
    const { readFile } = await import("node:fs/promises");
    return JSON.parse(await readFile(TRAJECTORY_URL, "utf8"));
  }
  const request = fetchLike ?? globalThis.fetch;
  if (typeof request !== "function") {
    throw new TypeError("Borg fixture trajectory requires fetch to load its record asset.");
  }
  const response = await request(TRAJECTORY_URL);
  if (!response.ok) {
    throw new Error(
      `Borg fixture trajectory asset is unreachable (${response.status} ${response.statusText}).`,
    );
  }
  return response.json();
}

/**
 * The manifest records what the asset should contain. A mismatch means the
 * two have skewed, and a silently short trajectory would look like a solver
 * result rather than a missing file.
 */
function assertTrajectoryMatchesManifest(trajectory, manifest) {
  const record = manifest.trajectoryRecord;
  const failures = [];
  if (trajectory?.schema !== BORG_FIXTURE_TRAJECTORY_VERSION) {
    failures.push(`schema is ${trajectory?.schema}, expected ${BORG_FIXTURE_TRAJECTORY_VERSION}`);
  }
  if (trajectory?.manifestId !== manifest.manifestId) {
    failures.push(`manifest id is ${trajectory?.manifestId}, expected ${manifest.manifestId}`);
  }
  if (trajectory?.currentStateFrames?.length !== record.frameCount) {
    failures.push(
      `frame count is ${trajectory?.currentStateFrames?.length}, expected ${record.frameCount}`,
    );
  }
  if (trajectory?.trajectoryFrameIds?.length !== record.trajectoryFrameIdCount) {
    failures.push(
      `frame id count is ${trajectory?.trajectoryFrameIds?.length}, expected ${record.trajectoryFrameIdCount}`,
    );
  }
  if (trajectory?.canonicalEomEvidence !== record.canonicalEomEvidence) {
    failures.push("trajectory evidence grade disagrees with the manifest record");
  }
  if (failures.length > 0) {
    throw new Error(`Borg fixture trajectory asset does not match its manifest: ${failures.join("; ")}`);
  }
  return trajectory;
}
