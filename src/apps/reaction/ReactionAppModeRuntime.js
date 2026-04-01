export const STANDALONE_REACTION_NAVIGATOR_HREF = "./index.html";

export function navigateStandaloneReactionHome(
  locationLike = globalThis.window?.location,
  href = STANDALONE_REACTION_NAVIGATOR_HREF
) {
  const resolvedHref = String(href ?? "").trim();
  if (!resolvedHref || typeof locationLike?.assign !== "function") {
    return false;
  }
  locationLike.assign(resolvedHref);
  return true;
}
