const DEFAULT_PERIOD_LABEL = "Aggregate Window";
const BREAKDOWN_COLORS = ["#d1912d", "#4a9a78", "#b95f6a", "#6385b7", "#bfa354"];

function createElement(tagName, className, textContent) {
  const element = document.createElement(tagName);
  if (className) {
    element.className = className;
  }
  if (textContent != null) {
    element.textContent = String(textContent);
  }
  return element;
}

function appendChildren(parent, children) {
  children.forEach((child) => {
    if (child) {
      parent.appendChild(child);
    }
  });
  return parent;
}

function formatNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? new Intl.NumberFormat("en-US").format(number) : "0";
}

function formatPercent(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    return "0%";
  }
  return `${number > 0 ? "+" : ""}${Math.round(number * 100)}%`;
}

function formatShare(value) {
  const number = Number(value);
  return Number.isFinite(number) ? `${Math.round(number * 100)}%` : "0%";
}

function formatDuration(seconds) {
  const totalSeconds = Math.max(0, Math.round(Number(seconds) || 0));
  const minutes = Math.floor(totalSeconds / 60);
  const remainder = totalSeconds % 60;
  return minutes > 0 ? `${minutes}m ${remainder}s` : `${remainder}s`;
}

function formatShortDate(dateText) {
  const date = new Date(`${dateText}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return String(dateText || "");
  }
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date);
}

function metricCard({ label, value, comparison, foot }) {
  const card = createElement("section", "website-stats-card");
  card.setAttribute("aria-label", label);

  const trend = createElement(
    "span",
    `website-stats-trend ${Number(comparison) >= 0 ? "is-up" : "is-down"}`,
    formatPercent(comparison)
  );
  const footRow = appendChildren(createElement("div", "website-stats-card-foot"), [
    trend,
    createElement("span", "", foot),
  ]);

  return appendChildren(card, [
    createElement("div", "website-stats-card-label", label),
    createElement("div", "website-stats-card-value", value),
    footRow,
  ]);
}

function panel(title, meta, body) {
  const wrapper = createElement("section", "website-stats-panel");
  const header = appendChildren(createElement("div", "website-stats-panel-header"), [
    createElement("h2", "", title),
    meta ? createElement("span", "", meta) : null,
  ]);
  return appendChildren(wrapper, [header, body]);
}

function renderDailyChart(daily = []) {
  if (!daily.length) {
    return createElement("div", "website-stats-empty", "No daily records.");
  }

  const maxPageViews = Math.max(...daily.map((entry) => Number(entry.pageViews) || 0), 1);
  const chart = createElement("div", "website-stats-chart");
  chart.style.setProperty("--bar-count", String(daily.length));
  daily.forEach((entry) => {
    const pageViewsHeight = Math.max(4, ((Number(entry.pageViews) || 0) / maxPageViews) * 100);
    const visitsHeight = Math.max(4, ((Number(entry.visits) || 0) / maxPageViews) * 100);
    const bar = createElement("div", "website-stats-bar");
    bar.style.setProperty("--page-views-height", `${pageViewsHeight.toFixed(2)}%`);
    bar.style.setProperty("--visits-height", `${visitsHeight.toFixed(2)}%`);
    bar.title = `${formatShortDate(entry.date)}: ${formatNumber(entry.visits)} visits, ${formatNumber(
      entry.pageViews
    )} page views`;
    bar.appendChild(createElement("span", "", formatShortDate(entry.date)));
    chart.appendChild(bar);
  });

  const legend = appendChildren(createElement("div", "website-stats-legend"), [
    appendChildren(createElement("span", "website-stats-legend-item"), [
      createElement("span", "website-stats-swatch is-visits"),
      createElement("span", "", "Visits"),
    ]),
    appendChildren(createElement("span", "website-stats-legend-item"), [
      createElement("span", "website-stats-swatch is-pageviews"),
      createElement("span", "", "Page Views"),
    ]),
  ]);

  return appendChildren(document.createDocumentFragment(), [chart, legend]);
}

function renderTopPagesTable(pages = []) {
  if (!pages.length) {
    return createElement("div", "website-stats-empty", "No page records.");
  }

  const table = createElement("table", "website-stats-table");
  const head = document.createElement("thead");
  const headRow = document.createElement("tr");
  ["Page", "Views", "Visits", "Avg. Time"].forEach((heading) => {
    headRow.appendChild(createElement("th", "", heading));
  });
  head.appendChild(headRow);

  const body = document.createElement("tbody");
  pages.forEach((page) => {
    const row = document.createElement("tr");
    const pageCell = createElement("td");
    pageCell.appendChild(createElement("span", "website-stats-page-title", page.title));
    pageCell.appendChild(createElement("span", "website-stats-page-path", page.path));
    row.appendChild(pageCell);
    row.appendChild(createElement("td", "", formatNumber(page.pageViews)));
    row.appendChild(createElement("td", "", formatNumber(page.visits)));
    row.appendChild(createElement("td", "", formatDuration(page.averageEngagedSeconds)));
    body.appendChild(row);
  });

  return appendChildren(table, [head, body]);
}

function renderBreakdown(items = [], valueKey = "visits") {
  if (!items.length) {
    return createElement("div", "website-stats-empty", "No records.");
  }

  const maxValue = Math.max(...items.map((item) => Number(item[valueKey]) || 0), 1);
  const wrapper = createElement("div", "website-stats-breakdown");
  items.forEach((item, index) => {
    const value = Number(item[valueKey]) || 0;
    const share = Number.isFinite(Number(item.share)) ? Number(item.share) : value / maxValue;
    const row = createElement("div", "website-stats-breakdown-row");
    row.appendChild(createElement("div", "website-stats-breakdown-label", item.source || item.type || item.name));
    row.appendChild(
      createElement(
        "div",
        "website-stats-breakdown-value",
        `${formatNumber(value)} · ${formatShare(share)}`
      )
    );
    const meter = createElement("div", "website-stats-meter");
    const fill = createElement("span");
    fill.style.setProperty("--meter-width", `${Math.min(100, (value / maxValue) * 100).toFixed(2)}%`);
    fill.style.setProperty("--meter-color", BREAKDOWN_COLORS[index % BREAKDOWN_COLORS.length]);
    meter.appendChild(fill);
    row.appendChild(meter);
    wrapper.appendChild(row);
  });
  return wrapper;
}

function renderShell(data) {
  const periodLabel = data?.period?.label || DEFAULT_PERIOD_LABEL;
  const periodMeta =
    data?.period?.start && data?.period?.end
      ? `${formatShortDate(data.period.start)} - ${formatShortDate(data.period.end)}`
      : "";
  const totals = data?.totals ?? {};
  const comparisons = data?.comparisons ?? {};
  const isSample = data?.mode === "sample";
  const sourceStatus = String(data?.sourceStatus || "").trim();
  const headerDetail = [
    periodLabel,
    periodMeta,
    isSample ? "Demo Data" : "",
    sourceStatus,
  ].filter(Boolean).join(" · ");

  const shell = createElement("div", "website-stats-shell");
  const header = appendChildren(createElement("header", "website-stats-header"), [
    appendChildren(createElement("div", "website-stats-title"), [
      createElement("h1", "", "Website Stats"),
      createElement("p", "", headerDetail),
    ]),
    appendChildren(createElement("nav", "website-stats-actions"), [
      createNavLink("./index.html#scene=content%2Fscenes%2Farchie%2Fproject.json", "Archie"),
      createNavLink("./index.html", "Home"),
    ]),
  ]);

  const summary = appendChildren(createElement("section", "website-stats-summary"), [
    metricCard({
      label: "Visits",
      value: formatNumber(totals.visits),
      comparison: comparisons.visits,
      foot: "vs prior window",
    }),
    metricCard({
      label: "Visitors",
      value: formatNumber(totals.uniqueVisitors),
      comparison: comparisons.uniqueVisitors,
      foot: "unique count",
    }),
    metricCard({
      label: "Page Views",
      value: formatNumber(totals.pageViews),
      comparison: comparisons.pageViews,
      foot: "total reads",
    }),
    metricCard({
      label: "Return Rate",
      value: formatShare((Number(totals.returningVisitors) || 0) / Math.max(1, Number(totals.uniqueVisitors) || 0)),
      comparison: comparisons.returnRate,
      foot: "returning visitors",
    }),
    metricCard({
      label: "Avg. Time",
      value: formatDuration(totals.averageEngagedSeconds),
      comparison: comparisons.averageEngagedSeconds,
      foot: "engaged time",
    }),
  ]);

  const mainGrid = appendChildren(createElement("section", "website-stats-grid"), [
    panel("Traffic", "daily", renderDailyChart(data?.daily ?? [])),
    appendChildren(createElement("div", "website-stats-stack"), [
      panel("Referrers", "visits", renderBreakdown(data?.referrers ?? [], "visits")),
      panel("Devices", "visits", renderBreakdown(data?.devices ?? [], "visits")),
    ]),
  ]);

  const lowerGrid = appendChildren(createElement("section", "website-stats-grid"), [
    panel("Top Pages", "ranked by views", renderTopPagesTable(data?.topPages ?? [])),
    appendChildren(createElement("div", "website-stats-stack"), [
      panel("Channels", "visits", renderBreakdown(data?.trafficChannels ?? [], "visits")),
      panel("Key Events", "counts", renderBreakdown(data?.events ?? [], "count")),
    ]),
  ]);

  const main = appendChildren(createElement("main", "website-stats-main"), [
    summary,
    mainGrid,
    lowerGrid,
  ]);

  return appendChildren(shell, [header, main]);
}

function createNavLink(href, label) {
  const link = createElement("a", "website-stats-link");
  link.href = href;
  link.appendChild(createNavIcon(label));
  link.appendChild(createElement("span", "", label));
  return link;
}

function createNavIcon(label) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("aria-hidden", "true");
  const paths =
    label === "Home"
      ? ["M3 11.5L12 4l9 7.5", "M6.5 10.5V20h11V10.5"]
      : ["M4 12a8 8 0 1 0 16 0a8 8 0 0 0-16 0", "M8 12h8", "M12 8v8"];
  paths.forEach((pathData) => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathData);
    svg.appendChild(path);
  });
  return svg;
}

function renderError(root, message) {
  root.replaceChildren(
    appendChildren(createElement("div", "website-stats-shell"), [
      appendChildren(createElement("header", "website-stats-header"), [
        appendChildren(createElement("div", "website-stats-title"), [
          createElement("h1", "", "Website Stats"),
          createElement("p", "", "Data unavailable"),
        ]),
        appendChildren(createElement("nav", "website-stats-actions"), [
          createNavLink("./index.html#scene=content%2Fscenes%2Farchie%2Fproject.json", "Archie"),
        ]),
      ]),
      createElement("main", "website-stats-error", message),
    ])
  );
}

export async function renderWebsiteStatsApp({ root, dataPath, fetchImpl = fetch } = {}) {
  if (!root) {
    throw new Error("Website Stats requires a root element.");
  }

  root.replaceChildren(createElement("div", "website-stats-empty", "Loading website stats."));
  try {
    const response = await fetchImpl(dataPath);
    if (!response.ok) {
      throw new Error(`Failed to load ${dataPath}: ${response.status}`);
    }
    const data = await response.json();
    root.replaceChildren(renderShell(data));
  } catch (error) {
    renderError(root, String(error?.message || "Failed to load website stats."));
  }
}
