export function createAnimatorPointerHitRuntime(options = {}) {
  const getCanvas = typeof options.getCanvas === "function" ? options.getCanvas : () => null;

  function resolveAnimatorIndexedHit(object, key) {
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

  function getAnimatorPointerNdc(event) {
    const animatorCanvas = getCanvas();
    const rect = animatorCanvas?.getBoundingClientRect?.();
    if (!rect) {
      return { x: 0, y: 0 };
    }
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    return { x, y };
  }

  function resolveAnimatorAssemblyHit(object) {
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

  function resolveAnimatorMemberHandleHit(object) {
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

  function resolveAnimatorSubassemblyHandleHit(object) {
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

  function resolveAnimatorGraphicOverlayHit(object) {
    let current = object;
    while (current) {
      const overlayId = current.userData?.overlayId;
      if (overlayId && current.userData?.isAnimatorGraphicHandle) {
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

  function resolveAnimatorPersonalityHandleHit(object) {
    let current = object;
    while (current) {
      const assemblyId = current.userData?.assemblyId;
      const memberId = current.userData?.memberId;
      if (assemblyId && memberId && current.userData?.isAnimatorPersonalityHandle) {
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

  function resolveAnimatorAssemblyIdHit(object) {
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

  function findAnimatorShellSurfaceHit(hits = []) {
    return (Array.isArray(hits) ? hits : []).find(
      (hit) => hit?.object && !hit.object.userData?.isAnimatorShellGuide
    ) ?? null;
  }

  function findAnimatorCenterMarkerIntersection(hits = []) {
    for (const hit of Array.isArray(hits) ? hits : []) {
      const assemblyHit = resolveAnimatorAssemblyHit(hit?.object);
      if (assemblyHit?.object?.userData?.isAssemblyCenterMarker) {
        return {
          ...assemblyHit,
          distance: Number(hit.distance ?? 0),
        };
      }
    }
    return null;
  }

  function shouldPreferAnimatorCenterMarker(pointHits = [], assemblyHits = []) {
    const centerHit = findAnimatorCenterMarkerIntersection(assemblyHits);
    if (!centerHit) {
      return null;
    }
    const nearestPointDistance = Number(pointHits?.[0]?.distance ?? Number.POSITIVE_INFINITY);
    return centerHit.distance <= nearestPointDistance + 0.12 ? centerHit : null;
  }

  return {
    resolveAnimatorIndexedHit,
    getAnimatorPointerNdc,
    resolveAnimatorAssemblyHit,
    resolveAnimatorMemberHandleHit,
    resolveAnimatorSubassemblyHandleHit,
    resolveAnimatorGraphicOverlayHit,
    resolveAnimatorPersonalityHandleHit,
    resolveAnimatorAssemblyIdHit,
    findAnimatorShellSurfaceHit,
    findAnimatorCenterMarkerIntersection,
    shouldPreferAnimatorCenterMarker,
  };
}
