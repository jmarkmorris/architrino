import {
  ANIMATOR_PRESCRIBED_SCENE_HANDOFF_SCHEMA,
  validateAnimatorPrescribedSceneHandoff,
} from "./AnimatorPrescribedSceneHandoff.mjs";

export const ANIMATOR_BORG_HANDOFF_QUERY = "animatorHandoff";
export const ANIMATOR_BORG_HANDOFF_QUERY_VALUE = "prescribed-scene-v1";
export const ANIMATOR_BORG_READY_MESSAGE = "borg-prescribed-scene-ready.v1";
export const ANIMATOR_BORG_PAYLOAD_MESSAGE = "animator-prescribed-scene-payload.v1";
export const ANIMATOR_BORG_ACCEPTED_MESSAGE = "borg-prescribed-scene-accepted.v1";

const DEFAULT_TIMEOUT_MS = 10_000;

export async function openAnimatorPrescribedSceneInBorg(handoff, options = {}) {
  const windowLike = options.windowLike ?? globalThis.window;
  const validated = await validateAnimatorPrescribedSceneHandoff(handoff, {
    cryptoLike: options.cryptoLike ?? windowLike?.crypto ?? globalThis.crypto,
  });
  if (typeof windowLike?.open !== "function" || typeof windowLike?.addEventListener !== "function") {
    throw new TypeError("Open in Borg requires a browser window with open() and message events.");
  }
  const url = new URL(options.borgUrl ?? "./borg.html", windowLike.location?.href);
  url.searchParams.set(ANIMATOR_BORG_HANDOFF_QUERY, ANIMATOR_BORG_HANDOFF_QUERY_VALUE);
  const targetOrigin = url.origin === "null" ? "*" : url.origin;
  const timeoutMs = positiveTimeout(options.timeoutMs);

  return new Promise((resolve, reject) => {
    let targetWindow = null;
    let sent = false;
    const finish = (callback, value) => {
      globalThis.clearTimeout(timeoutId);
      windowLike.removeEventListener("message", onMessage);
      callback(value);
    };
    const onMessage = (event) => {
      if (event.source !== targetWindow || (targetOrigin !== "*" && event.origin !== targetOrigin)) {
        return;
      }
      if (event.data?.type === ANIMATOR_BORG_READY_MESSAGE && !sent) {
        sent = true;
        targetWindow.postMessage(
          {
            type: ANIMATOR_BORG_PAYLOAD_MESSAGE,
            schema: ANIMATOR_PRESCRIBED_SCENE_HANDOFF_SCHEMA,
            handoff: validated,
          },
          targetOrigin,
        );
        return;
      }
      if (
        event.data?.type === ANIMATOR_BORG_ACCEPTED_MESSAGE &&
        event.data?.recordSha256 === validated.recordSha256
      ) {
        finish(resolve, Object.freeze({
          opened: true,
          recordSha256: validated.recordSha256,
          targetWindow,
        }));
      }
    };
    windowLike.addEventListener("message", onMessage);
    const timeoutId = globalThis.setTimeout(() => {
      finish(reject, new Error("Borg did not accept the sealed Animator record before the handoff timed out."));
    }, timeoutMs);
    // Borg must retain this exact opener long enough to complete the one-shot
    // structured-clone handshake. No shared store or continuing channel exists.
    targetWindow = windowLike.open(url.href, "_blank");
    if (!targetWindow) {
      finish(reject, new Error("Open in Borg was blocked. Allow pop-ups for this site and try again."));
    }
  });
}

export async function receiveAnimatorPrescribedSceneHandoff(options = {}) {
  const windowLike = options.windowLike ?? globalThis.window;
  if (
    !windowLike?.opener ||
    typeof windowLike.addEventListener !== "function" ||
    typeof windowLike.opener.postMessage !== "function"
  ) {
    throw new Error("Borg Animator handoff requires the validated Animator opener window.");
  }
  const opener = windowLike.opener;
  const ownOrigin = windowLike.location?.origin ?? "null";
  const targetOrigin = ownOrigin === "null" ? "*" : ownOrigin;
  const timeoutMs = positiveTimeout(options.timeoutMs);

  return new Promise((resolve, reject) => {
    const finish = (callback, value) => {
      globalThis.clearTimeout(timeoutId);
      windowLike.removeEventListener("message", onMessage);
      callback(value);
    };
    const onMessage = async (event) => {
      if (event.source !== opener || (targetOrigin !== "*" && event.origin !== ownOrigin)) return;
      if (event.data?.type !== ANIMATOR_BORG_PAYLOAD_MESSAGE) return;
      try {
        const handoff = await validateAnimatorPrescribedSceneHandoff(event.data.handoff, {
          cryptoLike: options.cryptoLike ?? windowLike.crypto ?? globalThis.crypto,
        });
        opener.postMessage(
          { type: ANIMATOR_BORG_ACCEPTED_MESSAGE, recordSha256: handoff.recordSha256 },
          targetOrigin,
        );
        finish(resolve, handoff);
      } catch (error) {
        finish(reject, error);
      }
    };
    windowLike.addEventListener("message", onMessage);
    const timeoutId = globalThis.setTimeout(() => {
      finish(reject, new Error("Borg did not receive a sealed Animator record before the handoff timed out."));
    }, timeoutMs);
    opener.postMessage({ type: ANIMATOR_BORG_READY_MESSAGE }, targetOrigin);
  });
}

function positiveTimeout(value) {
  const number = Number(value ?? DEFAULT_TIMEOUT_MS);
  return Number.isFinite(number) && number > 0 ? number : DEFAULT_TIMEOUT_MS;
}
