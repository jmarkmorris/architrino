const PANEL_ICON_PATHS = Object.freeze({
  open:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="4.5" width="17" height="15" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M9.5 4.5v15" stroke="currentColor" stroke-width="2"/><rect x="4.6" y="5.6" width="3.8" height="12.8" rx="1" fill="currentColor"/></svg>',
  closed:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="4.5" width="17" height="15" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M9.5 4.5v15" stroke="currentColor" stroke-width="2"/></svg>',
});

export function createPanelCollapseIconSvg(collapsed = false) {
  return collapsed ? PANEL_ICON_PATHS.closed : PANEL_ICON_PATHS.open;
}
