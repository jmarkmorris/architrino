export function createNodeFactory(deps) {
  const { THREE, CSS2DObject, binaryStyle } = deps;
  let haloSeed = 0;

  function createLabel(node) {
    const label = document.createElement("div");
    label.className = "label";
    if (node.wrapLabel) {
      label.classList.add("label-wrap");
      label.style.maxWidth = "120px";
    }
    const scaleHtml =
      node.hideScaleLabel || !node.hasScale
        ? ""
        : `<div class="label-scale">10^${node.scale}</div>`;
    const tagHtml =
      node.category === "Reaction" ? `<div class="label-tag">RXN</div>` : "";
    label.innerHTML = `<div class="label-title">${node.name}</div>${scaleHtml}${tagHtml}`;
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

  function createStripedSphereNode(nodeData) {
    const group = new THREE.Group();
    const sphereGeometry = new THREE.SphereGeometry(nodeData.radius, 32, 20);
    const baseOpacity = nodeData.baseOpacity ?? 0.72;
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: nodeData.color,
      transparent: true,
      opacity: baseOpacity,
    });
    sphereMaterial.depthWrite = false;
    const mesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    group.add(mesh);

    const outlineGeometry = new THREE.EdgesGeometry(sphereGeometry);
    const outlineMaterial = new THREE.LineBasicMaterial({
      color: "#7a7a7a",
      transparent: true,
      opacity: 0.3,
    });
    outlineMaterial.depthWrite = false;
    const outline = new THREE.LineSegments(outlineGeometry, outlineMaterial);
    group.add(outline);

    const extraMeshes = [];
    const stripeCount = nodeData.stripeCount ?? 7;
    const stripeThickness =
      nodeData.stripeThickness ?? Math.max(0.03, nodeData.radius * 0.06);
    const stripeOpacity = nodeData.stripeOpacity ?? 0.85;
    const stripeColors = nodeData.stripeColors ?? ["#ff0000", "#4b0082"];

    for (let i = 0; i < stripeCount; i += 1) {
      const t = (i + 1) / (stripeCount + 1);
      const phi = t * Math.PI;
      const ringRadius = Math.sin(phi) * nodeData.radius;
      const y = Math.cos(phi) * nodeData.radius;
      if (ringRadius <= 0.0001) {
        continue;
      }
      const ringGeometry = new THREE.TorusGeometry(ringRadius, stripeThickness, 12, 48);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: stripeColors[i % stripeColors.length],
        transparent: true,
        opacity: stripeOpacity,
      });
      ringMaterial.depthWrite = false;
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = y;
      group.add(ring);
      extraMeshes.push({ mesh: ring, baseOpacity: stripeOpacity });
    }

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
        mesh: baseOpacity,
        outline: outlineMaterial.opacity,
        label: 1,
      },
      extraMeshes,
      binaryBandData: [],
    };
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
    bandRadii.forEach((bandRadius, index) => {
      const ringGeometry = new THREE.TorusGeometry(
        bandRadius,
        shellRadius * binaryStyle.ringTubeFactor,
        16,
        64
      );
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: nodeData.color,
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
    if (nodeData.renderStyle === "stripedSphere") {
      return createStripedSphereNode(nodeData);
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
      const ringRadius = nodeData.radius * (nodeData.glowRingScale ?? 1.06);
      const ringThickness =
        nodeData.glowRingThickness ?? Math.max(0.02, nodeData.radius * 0.045);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: nodeData.glowRingColor ?? nodeData.color,
        transparent: true,
        opacity: nodeData.glowRingOpacity ?? 0.35,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const ringGeometry = new THREE.TorusGeometry(ringRadius, ringThickness, 12, 64);
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2;
      ring.renderOrder = -1;
      ring.userData.isGlowRing = true;
      group.add(ring);
      extraMeshes.push({ mesh: ring, baseOpacity: ringMaterial.opacity });
    }

    let halo = null;
    if (nodeData.childScene || nodeData.markdownPath) {
      const haloGeometry = new THREE.SphereGeometry(nodeData.radius * 1.18, 24, 16);
      const haloMaterial = new THREE.MeshBasicMaterial({
        color: "#d5dcff",
        transparent: true,
        opacity: 0.2,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      halo = new THREE.Mesh(haloGeometry, haloMaterial);
      halo.renderOrder = -1;
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
