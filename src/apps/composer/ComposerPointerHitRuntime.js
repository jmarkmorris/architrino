export function createComposerPointerHitRuntime(options = {}) {
  const getCanvas = typeof options.getCanvas === "function" ? options.getCanvas : () => null;

  function resolveComposerIndexedHit(object, key) {
    let current = object;
    while (current) {
      const value = current.userData?.[key];
      if (Number.isInteger(value)) {
        return {
          object: current,
          index: value,
        };
      }
      current = current.parent ?? null;
    }
    return null;
  }

  function getComposerPointerNdc(event) {
    const composerCanvas = getCanvas();
    const rect = composerCanvas?.getBoundingClientRect?.();
    if (!rect) {
      return { x: 0, y: 0 };
    }
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    return { x, y };
  }

  function resolveComposerAssemblyHit(object) {
    let current = object;
    while (current) {
      const assemblyIndex = current.userData?.assemblyIndex;
      const assemblyId = current.userData?.assemblyId;
      if (Number.isInteger(assemblyIndex) && assemblyId) {
        return {
          assemblyIndex,
          assemblyId,
          draggable: current.userData?.draggable !== false,
          object: current,
        };
      }
      current = current.parent ?? null;
    }
    return null;
  }

  function resolveComposerMemberHandleHit(object) {
    let current = object;
    while (current) {
      const assemblyId = current.userData?.assemblyId;
      const memberId = current.userData?.memberId;
      if (assemblyId && memberId) {
        return {
          assemblyId,
          memberId,
          subassemblyId: current.userData?.subassemblyId ?? "",
          draggable: current.userData?.draggable !== false,
          object: current,
        };
      }
      current = current.parent ?? null;
    }
    return null;
  }

  function resolveComposerSubassemblyHandleHit(object) {
    let current = object;
    while (current) {
      const assemblyId = current.userData?.assemblyId;
      const subassemblyId = current.userData?.subassemblyId;
      if (assemblyId && subassemblyId) {
        return {
          assemblyId,
          subassemblyId,
          draggable: current.userData?.draggable !== false,
          object: current,
        };
      }
      current = current.parent ?? null;
    }
    return null;
  }

  function resolveComposerGraphicOverlayHit(object) {
    let current = object;
    while (current) {
      const overlayId = current.userData?.overlayId;
      if (overlayId && current.userData?.isComposerGraphicHandle) {
        return {
          overlayId,
          draggable: current.userData?.draggable !== false,
          object: current,
        };
      }
      current = current.parent ?? null;
    }
    return null;
  }

  function resolveComposerPersonalityHandleHit(object) {
    let current = object;
    while (current) {
      const assemblyId = current.userData?.assemblyId;
      const memberId = current.userData?.memberId;
      if (assemblyId && memberId && current.userData?.isComposerPersonalityHandle) {
        return {
          assemblyId,
          memberId,
          draggable: false,
          object: current,
        };
      }
      current = current.parent ?? null;
    }
    return null;
  }

  function resolveComposerAssemblyIdHit(object) {
    let current = object;
    while (current) {
      const assemblyId = current.userData?.assemblyId;
      if (assemblyId) {
        return {
          assemblyId,
          object: current,
        };
      }
      current = current.parent ?? null;
    }
    return null;
  }

  function findComposerShellSurfaceHit(hits = []) {
    return (Array.isArray(hits) ? hits : []).find(
      (hit) => hit?.object && !hit.object.userData?.isComposerShellGuide
    ) ?? null;
  }

  function findComposerCenterMarkerIntersection(hits = []) {
    for (const hit of Array.isArray(hits) ? hits : []) {
      const assemblyHit = resolveComposerAssemblyHit(hit?.object);
      if (assemblyHit?.object?.userData?.isAssemblyCenterMarker) {
        return {
          ...assemblyHit,
          distance: Number(hit.distance ?? 0),
        };
      }
    }
    return null;
  }

  function shouldPreferComposerCenterMarker(pointHits = [], assemblyHits = []) {
    const centerHit = findComposerCenterMarkerIntersection(assemblyHits);
    if (!centerHit) {
      return null;
    }
    const nearestPointDistance = Number(pointHits?.[0]?.distance ?? Number.POSITIVE_INFINITY);
    return centerHit.distance <= nearestPointDistance + 0.12 ? centerHit : null;
  }

  return {
    resolveComposerIndexedHit,
    getComposerPointerNdc,
    resolveComposerAssemblyHit,
    resolveComposerMemberHandleHit,
    resolveComposerSubassemblyHandleHit,
    resolveComposerGraphicOverlayHit,
    resolveComposerPersonalityHandleHit,
    resolveComposerAssemblyIdHit,
    findComposerShellSurfaceHit,
    findComposerCenterMarkerIntersection,
    shouldPreferComposerCenterMarker,
  };
}
