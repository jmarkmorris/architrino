export const EQUATION_RETURN_PARAM = "equation";

export function createEquationMappingLaunchHref({ currentHref, semanticId, sourcePath, sourceSection }) {
  const originPage = new URL(currentHref);
  const returnPage = new URL(originPage);
  // Preserve the actual scene/section route. Supply a reader route only when absent.
  if (!new URLSearchParams(returnPage.hash.slice(1)).has("scene")) {
    const scene = sourceSection
      ? `runtime:markdown:reader:${sourcePath}::${encodeURIComponent(sourceSection)}`
      : `runtime:markdown:doc:${sourcePath}`;
    returnPage.hash = new URLSearchParams({ scene }).toString();
  }
  returnPage.searchParams.set(EQUATION_RETURN_PARAM, semanticId);
  const destination = new URL("./equation-mapping.html", originPage);
  destination.searchParams.set("returnTo", returnPage.href);
  destination.hash = semanticId;
  return destination.href;
}

export function resolveEquationMappingReturnHref(currentHref) {
  try {
    const current = new URL(currentHref);
    const rawReturn = current.searchParams.get("returnTo");
    if (!rawReturn) return null;
    const target = new URL(rawReturn, current);
    const siteRoot = new URL("./", current);
    // A return link must stay in this site's reader, never become an open redirect.
    if (target.origin !== current.origin || target.username || target.password) return null;
    if (![siteRoot.pathname, `${siteRoot.pathname}index.html`].includes(target.pathname)) return null;
    if (!new URLSearchParams(target.hash.slice(1)).get("scene")) return null;
    return target.href;
  } catch {
    return null;
  }
}
