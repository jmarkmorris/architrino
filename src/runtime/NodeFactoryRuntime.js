import { SCENE_CHAPTER_MARKER_RADIUS_SCALE } from "./SceneLabelSizingRuntime.js";
import { hasActionableSceneSphereTarget } from "./SceneSphereActionRuntime.js";

export function createNodeFactory(deps) {
  const { THREE, CSS2DObject, binaryStyle } = deps;
  let haloSeed = 0;
  const orbitRingLightenFactor = 0.2;
  const premiumSphereSpecularColor = "#d8c6ff";
  const premiumSphereOutlineColor = "#b9a8e8";
  const premiumSphereGlowRingColor = "#d8c6ff";
  const premiumSphereCenterRingColor = "#c7b9ff";
  const staticSphereRingColor = "#000000";
  const staticSphereRingOpacity = 0.62;

  function createPremiumSphereMaterial(nodeData, { hideSphere = false, isReaction = false } = {}) {
    const baseColor = new THREE.Color(nodeData.color ?? "#3a5a8a");
    const emissiveColor = baseColor.clone().multiplyScalar(isReaction ? 0.14 : 0.11);
    const material = new THREE.MeshPhongMaterial({
      color: baseColor,
      emissive: emissiveColor,
      specular: premiumSphereSpecularColor,
      shininess: isReaction ? 8 : 6,
      transparent: true,
      opacity: hideSphere ? 0 : isReaction ? 0.9 : 0.84,
    });
    material.depthWrite = false;
    return material;
  }

  function escapeHtml(text) {
    return String(text ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function escapeAttr(text) {
    return escapeHtml(text).replace(/\n/g, " ");
  }

  function getDefaultDocBadgeSvg() {
    return (
      '<svg class="label-badge-svg label-badge-doc" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      '<path d="M5 3H14L19 8V21H5Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="miter"/>' +
      '<path d="M14 3V8H19Z" fill="currentColor"/>' +
      '<path d="M7.5 12.6H16.5M7.5 16.1H16.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt"/>' +
      "</svg>"
    );
  }

  function getPdfBadgeSvg() {
    return (
      '<svg class="label-badge-svg label-badge-doc" viewBox="0 0 28 24" aria-hidden="true" focusable="false">' +
      '<path d="M5 3H16L22 9V21H5Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="miter"/>' +
      '<path d="M16 3V9H22Z" fill="currentColor"/>' +
      '<text x="8" y="17" font-family="Arial, Helvetica, sans-serif" font-size="6.5" font-weight="700" fill="currentColor">PDF</text>' +
      "</svg>"
    );
  }

  function getDiagramBadgeSvg() {
    return (
      '<svg class="label-badge-svg label-badge-diagram" viewBox="0 0 24 16" aria-hidden="true" focusable="false">' +
      '<ellipse cx="12" cy="8" rx="7.2" ry="2.9" fill="none" stroke="currentColor" stroke-width="1.15"/>' +
      '<ellipse cx="12" cy="8" rx="7.2" ry="2.9" transform="rotate(60 12 8)" fill="none" stroke="currentColor" stroke-width="1.15"/>' +
      '<ellipse cx="12" cy="8" rx="7.2" ry="2.9" transform="rotate(-60 12 8)" fill="none" stroke="currentColor" stroke-width="1.15"/>' +
      "</svg>"
    );
  }

  function isDocBadgeToken(value) {
    if (typeof value !== "string") {
      return false;
    }
    const normalized = value.trim().toLowerCase();
    return (
      normalized === "doc" ||
      normalized === "doc-svg" ||
      normalized === "md" ||
      normalized === "markdown"
    );
  }

  function isPdfBadgeToken(value) {
    if (typeof value !== "string") {
      return false;
    }
    return value.trim().toLowerCase() === "pdf";
  }

  function isDiagramBadgeToken(value) {
    if (typeof value !== "string") {
      return false;
    }
    const normalized = value.trim().toLowerCase();
    return normalized === "diagram" || normalized === "branch";
  }

  function latexToPlainText(expr) {
    return String(expr || "")
      .replace(/\\mathbb\{A\}/g, "\u{1D538}")
      .replace(/\\(mathbb|mathrm|text)\{([^}]*)\}/g, "$2")
      .replace(/[_^]\{([^}]*)\}/g, "$1")
      .replace(/[_^]([A-Za-z0-9]+)/g, "$1")
      .replace(/\\[A-Za-z]+\*?/g, " ")
      .replace(/[{}]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function normalizeLabelText(text) {
    let normalized = String(text ?? "").trim();
    if (!normalized) {
      return "";
    }
    normalized = normalized.replace(/\\\$/g, "$");
    normalized = normalized.replace(/\$\$([\s\S]*?)\$\$/g, (_match, expr) =>
      latexToPlainText(expr)
    );
    normalized = normalized.replace(/\$([^$]+)\$/g, (_match, expr) => latexToPlainText(expr));
    normalized = normalized.replace(/\\\(([\s\S]*?)\\\)/g, (_match, expr) =>
      latexToPlainText(expr)
    );
    normalized = normalized.replace(/\\\[([\s\S]*?)\\\]/g, (_match, expr) =>
      latexToPlainText(expr)
    );
    return normalized.replace(/\s+/g, " ").trim();
  }

  function extractIsoDatePrefix(text) {
    const match = String(text).match(
      /^(\d{4}-\d{2}-\d{2})(?:\s*[:\u2014\u2013-]\s+|\s+)(.+)$/
    );
    if (!match) {
      return null;
    }
    const title = (match[2] || "").trim();
    if (!title) {
      return null;
    }
    return {
      title,
      dates: match[1].trim(),
    };
  }

  function parseStructuredLabel(displayName) {
    const raw = normalizeLabelText(displayName);
    let title = raw;
    let subtitle = "";
    let dates = "";

    const dated = extractIsoDatePrefix(raw);
    if (dated) {
      title = dated.title;
      dates = dated.dates;
    }

    const dashMatch = title.match(/\s[—-]\s(.+)$/);
    if (dashMatch) {
      subtitle = dashMatch[1].trim();
      title = title.slice(0, dashMatch.index).trim();
    }

    const paren = title.match(/^(.*?)\(([^)]*)\)(.*)$/);
    if (paren) {
      const before = (paren[1] || "").trim();
      const inside = (paren[2] || "").trim();
      const after = (paren[3] || "").trim();
      title = [before, after].filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
      dates = inside ? `(${inside})` : "";
    }

    return { title: title || raw, subtitle, dates };
  }

  function isActionableSphereNode(nodeData) {
    if (typeof deps.isActionableSphereNode === "function") {
      return Boolean(deps.isActionableSphereNode(nodeData));
    }
    return hasActionableSceneSphereTarget(nodeData);
  }

  function getRingStyle(nodeData) {
    const actionable = isActionableSphereNode(nodeData);
    const ringScale = nodeData.glowRingScale ?? 1.04;
    const ringThickness =
      nodeData.glowRingThickness ?? Math.max(0.028, nodeData.radius * 0.06);
    const ringColor = actionable
      ? nodeData.glowRingColor ?? premiumSphereGlowRingColor
      : staticSphereRingColor;
    const ringOpacity =
      nodeData.glowRingOpacity ?? (actionable ? 0.3 : staticSphereRingOpacity);
    const blending = actionable ? THREE.AdditiveBlending : THREE.NormalBlending;
    return { ringScale, ringThickness, ringColor, ringOpacity, blending };
  }

  function createRingGeometry(radius, style) {
    return new THREE.TorusGeometry(radius * style.ringScale, style.ringThickness, 12, 64);
  }

  function createRingMesh(nodeData, style) {
    const ringGeometry = createRingGeometry(nodeData.radius, style);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: style.ringColor,
      transparent: true,
      opacity: style.ringOpacity,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: style.blending ?? THREE.AdditiveBlending,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.renderOrder = -1;
    return ring;
  }

  function getCenterContextRingStyle(radius) {
    return {
      ringScale: 1.04,
      ringThickness: Math.max(0.028, radius * 0.06),
      ringColor: staticSphereRingColor,
      ringOpacity: staticSphereRingOpacity,
      blending: THREE.NormalBlending,
    };
  }

  function createLabel(node) {
    const label = document.createElement("div");
    label.className = "label";
    if (node.wrapLabel) {
      label.classList.add("label-wrap");
      label.style.maxWidth = "120px";
    }
    const displayName =
      typeof node.shortName === "string" && node.shortName.trim()
        ? node.shortName.trim()
        : node.name;
    const fullName =
      typeof node.name === "string" && node.name.trim().length > 0
        ? node.name.trim()
        : displayName;
    const parsedFull = parseStructuredLabel(fullName);
    const parsedFallback = parseStructuredLabel(displayName);
    const prefersCompactLabel =
      parsedFallback.title &&
      parsedFallback.title !== parsedFull.title &&
      parsedFallback.title.length < parsedFull.title.length;
    const hasExplicitLabelTitle =
      typeof node.labelTitle === "string" && node.labelTitle.trim().length > 0;
    const hasExplicitLabelSubtitle =
      typeof node.labelSubtitle === "string" && node.labelSubtitle.trim().length > 0;
    const hasExplicitLabelDates =
      typeof node.labelDates === "string" && node.labelDates.trim().length > 0;
    const labelTitle = hasExplicitLabelTitle
      ? node.labelTitle.trim()
      : prefersCompactLabel
        ? parsedFallback.title
        : parsedFull.title || parsedFallback.title;
    let labelSubtitle = hasExplicitLabelSubtitle
      ? node.labelSubtitle.trim()
      : prefersCompactLabel
        ? parsedFallback.subtitle
        : parsedFull.subtitle || parsedFallback.subtitle;
    const labelDates = hasExplicitLabelDates
      ? node.labelDates.trim()
      : hasExplicitLabelTitle || hasExplicitLabelSubtitle
        ? ""
        : parsedFull.dates || parsedFallback.dates;
    // Avoid duplicated two-line labels when heading format is "X - X".
    if (
      labelSubtitle &&
      labelTitle &&
      labelSubtitle.localeCompare(labelTitle, undefined, { sensitivity: "base" }) === 0
    ) {
      labelSubtitle = "";
    }
    const badgeToken =
      typeof node.labelBadge === "string" && node.labelBadge.trim().length > 0
        ? node.labelBadge.trim()
        : "";
    const wantsPdfSvgBadge = isPdfBadgeToken(badgeToken);
    const wantsDocSvgBadge = isDocBadgeToken(badgeToken);
    const wantsDiagramSvgBadge = isDiagramBadgeToken(badgeToken);
    const badgeImage =
      typeof node.labelBadgeImage === "string" && node.labelBadgeImage.trim().length > 0
        ? node.labelBadgeImage.trim()
        : "";
    const badgeAlt =
      typeof node.labelBadgeAlt === "string" && node.labelBadgeAlt.trim().length > 0
        ? node.labelBadgeAlt.trim()
        : "Badge";
    const tagHtml =
      node.category === "Reaction" ? `<div class="label-tag">RXN</div>` : "";
    const subtitleHtml = labelSubtitle
      ? `<div class="label-subtitle">${escapeHtml(labelSubtitle)}</div>`
      : "";
    const datesHtml = labelDates
      ? `<div class="label-dates">${escapeHtml(labelDates)}</div>`
      : "";
    const badgeHtml = badgeImage
      ? `<div class="label-badge-line"><img class="label-badge-image" src="${escapeAttr(
          badgeImage
        )}" alt="${escapeAttr(badgeAlt)}" /></div>`
      : wantsPdfSvgBadge
        ? `<div class="label-badge-line">${getPdfBadgeSvg()}</div>`
      : wantsDocSvgBadge
        ? `<div class="label-badge-line">${getDefaultDocBadgeSvg()}</div>`
      : wantsDiagramSvgBadge && node.childScene
        ? `<div class="label-badge-line">${getDiagramBadgeSvg()}</div>`
        : "";
    label.innerHTML = `<div class="label-title">${escapeHtml(
      labelTitle
    )}</div>${subtitleHtml}${datesHtml}${tagHtml}${badgeHtml}`;
    return new CSS2DObject(label);
  }

  function createChapterLabel(node) {
    const chapterLabel =
      typeof node.textbookChapterLabel === "string" && node.textbookChapterLabel.trim().length > 0
        ? node.textbookChapterLabel.trim()
        : "";
    if (!chapterLabel) {
      return null;
    }
    const label = document.createElement("div");
    label.className = "label-chapter-marker";
    label.textContent = chapterLabel;
    const labelObject = new CSS2DObject(label);
    labelObject.position.set(
      0,
      -Math.max(0, node.radius ?? 0) * SCENE_CHAPTER_MARKER_RADIUS_SCALE,
      0
    );
    return labelObject;
  }

  function getCenterContextContentKey(data) {
    return [
      data?.title ?? "",
      data?.chapterLabel ?? "",
      data?.countLabel ?? "",
    ].join("|");
  }

  function renderCenterContextLabel(data) {
    const title = String(data?.title ?? "").trim();
    const chapterLabel = String(data?.chapterLabel ?? "").trim();
    const countLabel = String(data?.countLabel ?? "").trim();
    const chapterHtml = chapterLabel
      ? `<div class="label-center-context-meta">${escapeHtml(chapterLabel)}</div>`
      : "";
    const countHtml = countLabel
      ? `<div class="label-center-context-count">${escapeHtml(countLabel)}</div>`
      : "";
    return `<div class="label-title">${escapeHtml(title)}</div>${chapterHtml}${countHtml}`;
  }

  function createCenterContextSphere(data) {
    const radius = Math.max(0.01, Number(data?.radius) || 1);
    const group = new THREE.Group();
    const geometry = new THREE.SphereGeometry(radius, 32, 20);
    const material = new THREE.MeshBasicMaterial({
      color: data?.color ?? "#243047",
      transparent: true,
      opacity: 0.42,
    });
    material.depthWrite = false;
    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData.isCenterContextSphere = true;
    group.add(mesh);

    const outlineGeometry = new THREE.EdgesGeometry(geometry);
    const outlineMaterial = new THREE.LineBasicMaterial({
      color: premiumSphereCenterRingColor,
      transparent: true,
      opacity: 0.24,
    });
    outlineMaterial.depthWrite = false;
    const outline = new THREE.LineSegments(outlineGeometry, outlineMaterial);
    outline.userData.isCenterContextSphere = true;
    group.add(outline);

    const ringStyle = getCenterContextRingStyle(radius);
    const ring = createRingMesh({ radius }, ringStyle);
    ring.userData.isCenterContextRing = true;
    group.add(ring);

    const label = document.createElement("div");
    label.className = "label label-wrap label-center-context";
    label.innerHTML = renderCenterContextLabel(data);
    const labelObject = new CSS2DObject(label);
    group.add(labelObject);

    return {
      group,
      mesh,
      outline,
      ring,
      labelObject,
      data: { ...data, radius },
      labelMaxWidth: null,
      labelContentKey: getCenterContextContentKey(data),
      baseOpacity: {
        mesh: material.opacity,
        outline: outlineMaterial.opacity,
        ring: ring.material.opacity,
        label: 1,
      },
    };
  }

  function updateCenterContextSphere(contextSphere, data) {
    if (!contextSphere || !data) {
      return;
    }
    const radius = Math.max(0.01, Number(data.radius) || contextSphere.data?.radius || 1);
    if (Math.abs(radius - (contextSphere.data?.radius ?? 0)) > 0.0001) {
      const geometry = new THREE.SphereGeometry(radius, 32, 20);
      contextSphere.mesh.geometry.dispose();
      contextSphere.mesh.geometry = geometry;
      contextSphere.outline.geometry.dispose();
      contextSphere.outline.geometry = new THREE.EdgesGeometry(geometry);
      if (contextSphere.ring) {
        const ringStyle = getCenterContextRingStyle(radius);
        contextSphere.ring.geometry.dispose();
        contextSphere.ring.geometry = createRingGeometry(radius, ringStyle);
      }
    }

    const nextContentKey = getCenterContextContentKey(data);
    if (nextContentKey !== contextSphere.labelContentKey) {
      contextSphere.labelObject.element.innerHTML = renderCenterContextLabel(data);
      contextSphere.labelContentKey = nextContentKey;
    }
    contextSphere.data = { ...data, radius };
  }

  function disposeCenterContextSphere(contextSphere) {
    if (!contextSphere) {
      return;
    }
    contextSphere.mesh?.geometry?.dispose?.();
    contextSphere.mesh?.material?.dispose?.();
    contextSphere.outline?.geometry?.dispose?.();
    contextSphere.outline?.material?.dispose?.();
    contextSphere.ring?.geometry?.dispose?.();
    contextSphere.ring?.material?.dispose?.();
  }

  function getBinaryBandRadii(shellRadius, bands) {
    if (!Array.isArray(bands) || bands.length === 0) {
      return [];
    }
    const radiiByBand = {
      outer: 0.75,
      middle: 0.52,
      inner: 0.32,
    };
    return bands.map((band) => {
      const factor = radiiByBand[band] ?? 0.5;
      return shellRadius * factor;
    });
  }

  function createBinaryCoreNode(nodeData, useCutaway) {
    const group = new THREE.Group();
    const shellRadius = nodeData.radius;
    const shellGeometry = useCutaway
      ? new THREE.SphereGeometry(shellRadius, 36, 22, Math.PI * 0.15, Math.PI * 1.7, 0, Math.PI)
      : new THREE.SphereGeometry(shellRadius, 36, 22);
    const shellMaterial = new THREE.MeshBasicMaterial({
      color: nodeData.color,
      transparent: true,
      opacity: binaryStyle.shellOpacity,
      side: THREE.DoubleSide,
    });
    shellMaterial.depthWrite = false;
    const mesh = new THREE.Mesh(shellGeometry, shellMaterial);
    group.add(mesh);

    const outlineGeometry = new THREE.EdgesGeometry(shellGeometry);
    const outlineMaterial = new THREE.LineBasicMaterial({
      color: premiumSphereOutlineColor,
      transparent: true,
      opacity: binaryStyle.shellOutlineOpacity,
    });
    outlineMaterial.depthWrite = false;
    const outline = new THREE.LineSegments(outlineGeometry, outlineMaterial);
    group.add(outline);

    const extraMeshes = [];
    const binaryBandData = [];
    const bandRadii = getBinaryBandRadii(shellRadius, nodeData.binaryBands);
    const particleRadius = shellRadius * binaryStyle.particleRadiusFactor;

    const bandSpeedFactor = {
      outer: 1,
      middle: 2,
      inner: 4,
    };
    const ringColor = new THREE.Color(nodeData.color).lerp(
      new THREE.Color("#ffffff"),
      orbitRingLightenFactor
    );
    bandRadii.forEach((bandRadius, index) => {
      const ringGeometry = new THREE.TorusGeometry(
        bandRadius,
        shellRadius * binaryStyle.ringTubeFactor,
        16,
        64
      );
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: ringColor,
        transparent: true,
        opacity: binaryStyle.ringOpacity,
        side: THREE.DoubleSide,
      });
      ringMaterial.depthWrite = false;
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      group.add(ring);
      extraMeshes.push({ mesh: ring, baseOpacity: binaryStyle.ringOpacity });

      const positrinoMaterial = new THREE.MeshBasicMaterial({
        color: binaryStyle.positrinoColor,
        transparent: true,
        opacity: 0.9,
      });
      positrinoMaterial.depthWrite = false;
      const electrinoMaterial = new THREE.MeshBasicMaterial({
        color: binaryStyle.electrinoColor,
        transparent: true,
        opacity: 0.9,
      });
      electrinoMaterial.depthWrite = false;

      const positrino = new THREE.Mesh(
        new THREE.SphereGeometry(particleRadius, 16, 12),
        positrinoMaterial
      );
      const electrino = new THREE.Mesh(
        new THREE.SphereGeometry(particleRadius, 16, 12),
        electrinoMaterial
      );
      group.add(positrino);
      group.add(electrino);
      extraMeshes.push({ mesh: positrino, baseOpacity: 0.9 });
      extraMeshes.push({ mesh: electrino, baseOpacity: 0.9 });

      const bandName = nodeData.binaryBands?.[index];
      ring.userData.bandName = bandName;
      binaryBandData.push({
        radius: bandRadius,
        speed: binaryStyle.baseOrbitSpeed * (bandSpeedFactor[bandName] ?? 1),
        phase: index * 0.7,
        bandName,
        ring,
        ringBaseOpacity: binaryStyle.ringOpacity,
        positrino,
        electrino,
      });
    });

    const labelObject = createLabel(nodeData);
    group.add(labelObject);
    const chapterLabelObject = createChapterLabel(nodeData);
    if (chapterLabelObject) {
      group.add(chapterLabelObject);
    }

    return {
      group,
      mesh,
      outline,
      labelObject,
      chapterLabelObject,
      labelMaxWidth: null,
      halo: null,
      haloBaseOpacity: 0,
      haloIntensity: 1,
      haloPhase: haloSeed++ * 0.6,
      baseScale: 1,
      data: nodeData,
      baseOpacity: {
        mesh: shellMaterial.opacity,
        outline: outlineMaterial.opacity,
        label: 1,
      },
      extraMeshes,
      binaryBandData,
    };
  }

  function createNode(nodeData) {
    if (nodeData.renderStyle === "binaryShell") {
      return createBinaryCoreNode(nodeData, true);
    }
    if (nodeData.renderStyle === "binarySphere") {
      return createBinaryCoreNode(nodeData, false);
    }
    const group = new THREE.Group();
    const geometry = new THREE.SphereGeometry(nodeData.radius, 32, 20);
    const isReaction = nodeData.category === "Reaction";
    const hideSphere = nodeData.hideSphere === true;
    const material = createPremiumSphereMaterial(nodeData, { hideSphere, isReaction });
    const mesh = new THREE.Mesh(geometry, material);
    group.add(mesh);

    const outlineGeometry = new THREE.EdgesGeometry(geometry);
    const outlineMaterial = new THREE.LineBasicMaterial({
      color: isReaction ? premiumSphereGlowRingColor : premiumSphereOutlineColor,
      transparent: true,
      opacity: hideSphere ? 0 : isReaction ? 0.44 : 0.24,
    });
    outlineMaterial.depthWrite = false;
    const outline = new THREE.LineSegments(outlineGeometry, outlineMaterial);
    group.add(outline);

    const labelObject = createLabel(nodeData);
    group.add(labelObject);
    const chapterLabelObject = createChapterLabel(nodeData);
    if (chapterLabelObject) {
      group.add(chapterLabelObject);
    }

    const extraMeshes = [];
    if (!hideSphere && nodeData.glowRing) {
      const ring = createRingMesh(nodeData, getRingStyle(nodeData));
      ring.userData.isGlowRing = true;
      group.add(ring);
      extraMeshes.push({ mesh: ring, baseOpacity: ring.material.opacity });
    }

    let halo = null;
    if (
      !hideSphere &&
      !nodeData.glowRing &&
      (nodeData.childScene || nodeData.docDrillDownPreferred === true)
    ) {
      halo = createRingMesh(nodeData, getRingStyle(nodeData));
      halo.userData.isHaloRing = true;
      group.add(halo);
    }

    return {
      group,
      mesh,
      outline,
      labelObject,
      chapterLabelObject,
      labelMaxWidth: null,
      halo,
      haloBaseOpacity: halo ? halo.material.opacity : 0,
      haloIntensity: 1,
      haloPhase: haloSeed++ * 0.6,
      baseScale: 1,
      data: nodeData,
      baseOpacity: {
        mesh: material.opacity,
        outline: outlineMaterial.opacity,
        label: 1,
      },
      extraMeshes,
    };
  }

  return { createNode, createCenterContextSphere, updateCenterContextSphere, disposeCenterContextSphere };
}
