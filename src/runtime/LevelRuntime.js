export function createLevelRuntime(deps) {
  const {
    THREE,
    motionHandlers,
    linkColors,
    linkStyle,
    clamp,
    camera,
    binaryStyle,
    getPulsingBandName,
  } = deps;

  function updateLevelMotions(level, timeSeconds) {
    level.motionNodes.forEach((node) => {
      const hasBinary = !!(node.binaryBandData && node.binaryBandData.length);
      if (hasBinary) {
        motionHandlers.binaryOrbit(node, level, timeSeconds);
      }
      const handler = motionHandlers[node.data.motionType];
      if (handler && (!hasBinary || node.data.motionType !== "binaryOrbit")) {
        handler(node, level, timeSeconds);
      }
    });
  }

  function buildLevelLinks(level, config) {
    if (!config.links.length) {
      return;
    }
    config.links.forEach((link) => {
      const linkColor = link.color ?? linkColors[link.kind] ?? linkColors.default;
      const arrow = new THREE.ArrowHelper(
        new THREE.Vector3(1, 0, 0),
        new THREE.Vector3(),
        1,
        linkColor,
        linkStyle.headLengthMax,
        linkStyle.headLengthMax * linkStyle.headWidthFactor
      );
      arrow.line.material.transparent = true;
      arrow.line.material.opacity = linkStyle.lineOpacity;
      arrow.line.material.depthWrite = false;
      arrow.cone.material.transparent = true;
      arrow.cone.material.opacity = linkStyle.headOpacity;
      arrow.cone.material.depthWrite = false;
      level.group.add(arrow);
      level.links.push({
        arrow,
        from: link.from,
        to: link.to,
        direction: link.direction,
        length: link.length,
        kind: link.kind,
        opacity: 1,
        baseOpacity: {
          line: linkStyle.lineOpacity,
          cone: linkStyle.headOpacity,
        },
      });
    });
  }

  function getNodeForLink(level, linkId) {
    if (!linkId) {
      return null;
    }
    return level.nodeById.get(linkId) || level.nodeByName.get(linkId) || null;
  }

  function updateLevelLinks(level) {
    if (!level || !level.links.length) {
      return;
    }
    level.links.forEach((link) => {
      const fromNode = getNodeForLink(level, link.from);
      if (!fromNode) {
        return;
      }
      const fromPos = fromNode.group.position.clone();
      const fromRadius = fromNode.data.radius ?? 0;

      if (link.to) {
        const toNode = getNodeForLink(level, link.to);
        if (!toNode) {
          return;
        }
        const toPos = toNode.group.position.clone();
        const toRadius = toNode.data.radius ?? 0;
        const dir = toPos.clone().sub(fromPos);
        const distance = dir.length();
        if (distance <= 0.0001) {
          return;
        }
        dir.normalize();
        const length = Math.max(
          linkStyle.minLength,
          distance - fromRadius - toRadius - linkStyle.tipClearance
        );
        const origin = fromPos
          .clone()
          .add(dir.clone().multiplyScalar(fromRadius + linkStyle.tipClearance));
        const headLength = clamp(
          length * 0.3,
          linkStyle.headLengthMin,
          linkStyle.headLengthMax
        );
        const headWidth = headLength * linkStyle.headWidthFactor;
        link.arrow.position.copy(origin);
        link.arrow.setDirection(dir);
        link.arrow.setLength(length, headLength, headWidth);
      } else if (Array.isArray(link.direction)) {
        const dir = new THREE.Vector3(
          link.direction[0] ?? 0,
          link.direction[1] ?? 0,
          link.direction[2] ?? 0
        );
        if (dir.lengthSq() < 0.0001) {
          return;
        }
        dir.normalize();
        const length = Math.max(linkStyle.minLength, link.length ?? 2);
        const origin = fromPos
          .clone()
          .add(dir.clone().multiplyScalar(fromRadius + linkStyle.tipClearance));
        const headLength = clamp(
          length * 0.3,
          linkStyle.headLengthMin,
          linkStyle.headLengthMax
        );
        const headWidth = headLength * linkStyle.headWidthFactor;
        link.arrow.position.copy(origin);
        link.arrow.setDirection(dir);
        link.arrow.setLength(length, headLength, headWidth);
      }
    });
  }

  function setLevelLinkOpacity(level, opacity) {
    if (!level || !level.links.length) {
      return;
    }
    level.links.forEach((link) => {
      link.opacity = opacity;
      link.arrow.line.material.opacity = link.baseOpacity.line * opacity;
      link.arrow.cone.material.opacity = link.baseOpacity.cone * opacity;
    });
  }

  function updateGlowRingOrientation(level) {
    if (!level?.nodes?.length) {
      return;
    }
    level.nodes.forEach((node) => {
      if (!node.extraMeshes || !node.extraMeshes.length) {
        return;
      }
      node.extraMeshes.forEach((entry) => {
        const mesh = entry.mesh;
        if (!mesh?.userData?.isGlowRing) {
          return;
        }
        mesh.quaternion.copy(camera.quaternion);
      });
    });
  }

  function setNodeExtraOpacity(node, opacity) {
    if (!node.extraMeshes || !node.extraMeshes.length) {
      return;
    }
    node.extraMeshes.forEach((entry) => {
      entry.mesh.material.opacity = entry.baseOpacity * opacity;
    });
  }

  function setLevelOpacity(level, opacity) {
    level.nodes.forEach((node) => {
      node.mesh.material.opacity = node.baseOpacity.mesh * opacity;
      node.outline.material.opacity = node.baseOpacity.outline * opacity;
      node.labelObject.element.style.opacity = opacity;
      node.haloIntensity = opacity;
      setNodeExtraOpacity(node, opacity);
    });
  }

  function setLevelOpacityWithLabel(level, meshOpacity, labelOpacity) {
    level.nodes.forEach((node) => {
      node.mesh.material.opacity = node.baseOpacity.mesh * meshOpacity;
      node.outline.material.opacity = node.baseOpacity.outline * meshOpacity;
      node.labelObject.element.style.opacity = labelOpacity;
      node.haloIntensity = meshOpacity;
      setNodeExtraOpacity(node, meshOpacity);
    });
  }

  function setLevelLabelOpacity(level, labelOpacity) {
    level.nodes.forEach((node) => {
      node.labelObject.element.style.opacity = labelOpacity;
    });
  }

  function setLevelOpacityWithFocus(level, focusId, focusOpacity, otherOpacity) {
    level.nodes.forEach((node) => {
      const opacity =
        node.data.id === focusId || node.data.name === focusId
          ? focusOpacity
          : otherOpacity;
      node.mesh.material.opacity = node.baseOpacity.mesh * opacity;
      node.outline.material.opacity = node.baseOpacity.outline * opacity;
      node.labelObject.element.style.opacity = opacity;
      node.haloIntensity = opacity;
      setNodeExtraOpacity(node, opacity);
    });
  }

  function setLevelOpacityWithFocusAndLabel(
    level,
    focusId,
    focusOpacity,
    otherOpacity,
    labelOpacity
  ) {
    level.nodes.forEach((node) => {
      const opacity =
        node.data.id === focusId || node.data.name === focusId
          ? focusOpacity
          : otherOpacity;
      node.mesh.material.opacity = node.baseOpacity.mesh * opacity;
      node.outline.material.opacity = node.baseOpacity.outline * opacity;
      node.labelObject.element.style.opacity = opacity * labelOpacity;
      node.haloIntensity = opacity;
      setNodeExtraOpacity(node, opacity);
    });
  }

  function updateLevelHalo(level, timeSeconds) {
    if (!level) {
      return;
    }
    level.nodes.forEach((node) => {
      if (!node.halo) {
        return;
      }
      const pulse = 0.5 + 0.5 * Math.sin(timeSeconds * 1.5 + node.haloPhase);
      const scale = 1.02 + 0.06 * pulse;
      node.halo.scale.setScalar(scale);
      node.halo.material.opacity =
        node.haloBaseOpacity * node.haloIntensity * (0.35 + 0.65 * pulse);
    });
  }

  function updateBinaryRingPulse(level, timeSeconds) {
    if (!level) {
      return;
    }
    level.nodes.forEach((node) => {
      if (!node.binaryBandData || !node.binaryBandData.length) {
        return;
      }
      const pulsingBand = getPulsingBandName(node);
      node.binaryBandData.forEach((band) => {
        if (!band.ring) {
          return;
        }
        const base = band.ringBaseOpacity ?? binaryStyle.ringOpacity;
        const pulse =
          pulsingBand && band.bandName === pulsingBand
            ? 0.65 + 0.35 * Math.sin(timeSeconds * 2.2 + node.haloPhase)
            : 1;
        band.ring.material.opacity = base * (node.haloIntensity ?? 1) * pulse;
      });
    });
  }

  return {
    updateLevelMotions,
    buildLevelLinks,
    updateLevelLinks,
    setLevelLinkOpacity,
    updateGlowRingOrientation,
    setLevelOpacity,
    setLevelOpacityWithLabel,
    setLevelLabelOpacity,
    setLevelOpacityWithFocus,
    setLevelOpacityWithFocusAndLabel,
    updateLevelHalo,
    updateBinaryRingPulse,
  };
}
