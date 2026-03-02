export function createNodeFactory(deps) {
  const { THREE, CSS2DObject, binaryStyle } = deps;
  let haloSeed = 0;
  const orbitRingLightenFactor = 0.2;

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

  function parseStructuredLabel(displayName) {
    const raw = String(displayName ?? "").trim();
    let title = raw;
    let subtitle = "";
    let dates = "";

    const dashMatch = raw.match(/\s[—-]\s(.+)$/);
    if (dashMatch) {
      subtitle = dashMatch[1].trim();
      title = raw.slice(0, dashMatch.index).trim();
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

  function getRingStyle(nodeData) {
    const ringScale = nodeData.glowRingScale ?? 1.04;
    const ringThickness =
      nodeData.glowRingThickness ?? Math.max(0.028, nodeData.radius * 0.06);
    const ringColor = nodeData.glowRingColor ?? "#aeb6c6";
    const ringOpacity = nodeData.glowRingOpacity ?? 0.3;
    return { ringScale, ringThickness, ringColor, ringOpacity };
  }

  function createRingMesh(nodeData, style) {
    const ringGeometry = new THREE.TorusGeometry(
      nodeData.radius * style.ringScale,
      style.ringThickness,
      12,
      64
    );
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: style.ringColor,
      transparent: true,
      opacity: style.ringOpacity,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.renderOrder = -1;
    return ring;
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
    const parsed = parseStructuredLabel(displayName);
    const labelTitle =
      typeof node.labelTitle === "string" && node.labelTitle.trim().length > 0
        ? node.labelTitle.trim()
        : parsed.title;
    const labelSubtitle =
      typeof node.labelSubtitle === "string" && node.labelSubtitle.trim().length > 0
        ? node.labelSubtitle.trim()
        : parsed.subtitle;
    const labelDates =
      typeof node.labelDates === "string" && node.labelDates.trim().length > 0
        ? node.labelDates.trim()
        : parsed.dates;
    const badgeSymbol =
      typeof node.labelBadge === "string" && node.labelBadge.trim().length > 0
        ? node.labelBadge.trim()
        : node.markdownDocIcon
          ? "📚"
          : "";
    const badgeImage =
      typeof node.labelBadgeImage === "string" && node.labelBadgeImage.trim().length > 0
        ? node.labelBadgeImage.trim()
        : "";
    const badgeAlt =
      typeof node.labelBadgeAlt === "string" && node.labelBadgeAlt.trim().length > 0
        ? node.labelBadgeAlt.trim()
        : "Badge";
    const scaleHtml =
      node.hideScaleLabel || !node.hasScale
        ? ""
        : `<div class="label-scale">10^${escapeHtml(node.scale)}</div>`;
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
      : badgeSymbol
        ? `<div class="label-badge-line"><span class="label-badge-symbol" aria-hidden="true">${escapeHtml(
            badgeSymbol
          )}</span></div>`
        : "";
    label.innerHTML = `<div class="label-title">${escapeHtml(
      labelTitle
    )}</div>${subtitleHtml}${datesHtml}${badgeHtml}${scaleHtml}${tagHtml}`;
    return new CSS2DObject(label);
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
      color: "#7a7a7a",
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

    return {
      group,
      mesh,
      outline,
      labelObject,
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
    const material = new THREE.MeshBasicMaterial({
      color: nodeData.color,
      transparent: true,
      opacity: isReaction ? 0.92 : 0.86,
    });
    material.depthWrite = false;
    const mesh = new THREE.Mesh(geometry, material);
    group.add(mesh);

    const outlineGeometry = new THREE.EdgesGeometry(geometry);
    const outlineMaterial = new THREE.LineBasicMaterial({
      color: isReaction ? "#f6dd9c" : "#7a7a7a",
      transparent: true,
      opacity: isReaction ? 0.55 : 0.3,
    });
    outlineMaterial.depthWrite = false;
    const outline = new THREE.LineSegments(outlineGeometry, outlineMaterial);
    group.add(outline);

    const labelObject = createLabel(nodeData);
    group.add(labelObject);

    const extraMeshes = [];
    if (nodeData.glowRing) {
      const ring = createRingMesh(nodeData, getRingStyle(nodeData));
      ring.userData.isGlowRing = true;
      group.add(ring);
      extraMeshes.push({ mesh: ring, baseOpacity: ring.material.opacity });
    }

    let halo = null;
    if (!nodeData.glowRing && (nodeData.childScene || nodeData.docDrillDownPreferred === true)) {
      halo = createRingMesh(nodeData, getRingStyle(nodeData));
      halo.userData.isHaloRing = true;
      group.add(halo);
    }

    return {
      group,
      mesh,
      outline,
      labelObject,
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

  return { createNode };
}
