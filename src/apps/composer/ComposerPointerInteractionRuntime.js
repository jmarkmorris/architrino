export function createComposerPointerInteractionRuntime(options = {}) {
  const THREE = options.THREE;
  const clampFn =
    typeof options.clampFn === "function"
      ? options.clampFn
      : (value, min, max) => Math.min(max, Math.max(min, value));
  const vectorFromTriplet =
    typeof options.vectorFromTriplet === "function"
      ? options.vectorFromTriplet
      : (value) =>
          value instanceof THREE.Vector3
            ? value.clone()
            : new THREE.Vector3(value?.[0] ?? 0, value?.[1] ?? 0, value?.[2] ?? 0);
  const normalizeAssemblyPathPoints =
    typeof options.normalizeAssemblyPathPoints === "function"
      ? options.normalizeAssemblyPathPoints
      : () => [];
  const normalizeMemberPosition =
    typeof options.normalizeMemberPosition === "function"
      ? options.normalizeMemberPosition
      : () => [0, 0, 0];
  const isBareArchitrinoAssembly =
    typeof options.isBareArchitrinoAssembly === "function"
      ? options.isBareArchitrinoAssembly
      : () => false;
  const getAssemblySubassemblyIndex =
    typeof options.getAssemblySubassemblyIndex === "function"
      ? options.getAssemblySubassemblyIndex
      : () => -1;
  const setAssemblyMemberPosition =
    typeof options.setAssemblyMemberPosition === "function"
      ? options.setAssemblyMemberPosition
      : () => false;
  const setSubassemblyPosition =
    typeof options.setSubassemblyPosition === "function"
      ? options.setSubassemblyPosition
      : () => false;
  const resolveGraphicTargetPosition =
    typeof options.resolveGraphicTargetPosition === "function"
      ? options.resolveGraphicTargetPosition
      : () => null;
  const getCanvas = typeof options.getCanvas === "function" ? options.getCanvas : () => null;
  const getCamera = typeof options.getCamera === "function" ? options.getCamera : () => null;
  const getRaycaster =
    typeof options.getRaycaster === "function" ? options.getRaycaster : () => null;
  const getFrameGroup =
    typeof options.getFrameGroup === "function" ? options.getFrameGroup : () => null;
  const getDragState =
    typeof options.getDragState === "function" ? options.getDragState : () => null;
  const getAssemblyWorldCenters =
    typeof options.getAssemblyWorldCenters === "function"
      ? options.getAssemblyWorldCenters
      : () => new Map();
  const getCurrentDocument =
    typeof options.getCurrentDocument === "function" ? options.getCurrentDocument : () => null;
  const getPathState =
    typeof options.getPathState === "function" ? options.getPathState : () => ({ points: [] });
  const getFrameEditMode =
    typeof options.getFrameEditMode === "function" ? options.getFrameEditMode : () => false;
  const getFrameState =
    typeof options.getFrameState === "function" ? options.getFrameState : () => null;
  const getCameraState =
    typeof options.getCameraState === "function" ? options.getCameraState : () => ({ speed: 1 });
  const getCameraOrbitState =
    typeof options.getCameraOrbitState === "function"
      ? options.getCameraOrbitState
      : () => ({ theta: 0, phi: Math.PI / 2 });
  const getCameraFlightState =
    typeof options.getCameraFlightState === "function"
      ? options.getCameraFlightState
      : () => ({ preview: false, waypoints: [] });
  const getSelectedCameraWaypointIndex =
    typeof options.getSelectedCameraWaypointIndex === "function"
      ? options.getSelectedCameraWaypointIndex
      : () => null;
  const setSelectedCameraWaypointIndex =
    typeof options.setSelectedCameraWaypointIndex === "function"
      ? options.setSelectedCameraWaypointIndex
      : () => {};
  const getAssemblyDraftsState =
    typeof options.getAssemblyDraftsState === "function"
      ? options.getAssemblyDraftsState
      : () => [];
  const getAssemblyDraftById =
    typeof options.getAssemblyDraftById === "function"
      ? options.getAssemblyDraftById
      : () => null;
  const getAssemblyDraftIndexById =
    typeof options.getAssemblyDraftIndexById === "function"
      ? options.getAssemblyDraftIndexById
      : () => -1;
  const updateAssemblyDraftByIdState =
    typeof options.updateAssemblyDraftByIdState === "function"
      ? options.updateAssemblyDraftByIdState
      : () => {};
  const getGraphicOverlayDraftById =
    typeof options.getGraphicOverlayDraftById === "function"
      ? options.getGraphicOverlayDraftById
      : () => null;
  const updateGraphicOverlayDraftByIdState =
    typeof options.updateGraphicOverlayDraftByIdState === "function"
      ? options.updateGraphicOverlayDraftByIdState
      : () => {};
  const getSelectedAssemblyIdState =
    typeof options.getSelectedAssemblyIdState === "function"
      ? options.getSelectedAssemblyIdState
      : () => null;
  const getSelectedPointIndexState =
    typeof options.getSelectedPointIndexState === "function"
      ? options.getSelectedPointIndexState
      : () => null;
  const setSelectedPointIndexState =
    typeof options.setSelectedPointIndexState === "function"
      ? options.setSelectedPointIndexState
      : () => {};
  const mutatePathStateState =
    typeof options.mutatePathStateState === "function"
      ? options.mutatePathStateState
      : () => {};
  const updatePathPointAtState =
    typeof options.updatePathPointAtState === "function"
      ? options.updatePathPointAtState
      : () => {};
  const rebuildControlPoints =
    typeof options.rebuildControlPoints === "function"
      ? options.rebuildControlPoints
      : () => {};
  const updatePathGeometry =
    typeof options.updatePathGeometry === "function" ? options.updatePathGeometry : () => {};
  const updatePointMaterials =
    typeof options.updatePointMaterials === "function" ? options.updatePointMaterials : () => {};
  const updateCameraWaypointMaterials =
    typeof options.updateCameraWaypointMaterials === "function"
      ? options.updateCameraWaypointMaterials
      : () => {};
  const updateCameraFlightDisplay =
    typeof options.updateCameraFlightDisplay === "function"
      ? options.updateCameraFlightDisplay
      : () => {};
  const stopCameraFlightPreview =
    typeof options.stopCameraFlightPreview === "function"
      ? options.stopCameraFlightPreview
      : () => {};
  const updateCamera =
    typeof options.updateCamera === "function" ? options.updateCamera : () => {};
  const updateFrame = typeof options.updateFrame === "function" ? options.updateFrame : () => {};
  const renderJsonPreview =
    typeof options.renderJsonPreview === "function" ? options.renderJsonPreview : () => {};
  const renderAssemblyEditor =
    typeof options.renderAssemblyEditor === "function" ? options.renderAssemblyEditor : () => {};
  const setSelectedAssembly =
    typeof options.setSelectedAssembly === "function" ? options.setSelectedAssembly : () => {};
  const clearSelectedPoint =
    typeof options.clearSelectedPoint === "function" ? options.clearSelectedPoint : () => {};
  const hideHoverTooltip =
    typeof options.hideHoverTooltip === "function" ? options.hideHoverTooltip : () => {};
  const clearAssemblyHoverTooltipState =
    typeof options.clearAssemblyHoverTooltipState === "function"
      ? options.clearAssemblyHoverTooltipState
      : () => {};
  const updateAssemblyHoverTooltip =
    typeof options.updateAssemblyHoverTooltip === "function"
      ? options.updateAssemblyHoverTooltip
      : () => {};
  const closeAssemblyMenu =
    typeof options.closeAssemblyMenu === "function" ? options.closeAssemblyMenu : () => {};
  const openAssemblyPropertiesMenuAt =
    typeof options.openAssemblyPropertiesMenuAt === "function"
      ? options.openAssemblyPropertiesMenuAt
      : () => {};
  const openPersonalitySlotMenuAt =
    typeof options.openPersonalitySlotMenuAt === "function"
      ? options.openPersonalitySlotMenuAt
      : () => false;
  const openTimelineMenuAt =
    typeof options.openTimelineMenuAt === "function" ? options.openTimelineMenuAt : () => {};
  const openPathPointMenuAt =
    typeof options.openPathPointMenuAt === "function" ? options.openPathPointMenuAt : () => {};
  const openMemberMenuAt =
    typeof options.openMemberMenuAt === "function" ? options.openMemberMenuAt : () => {};
  const openSubassemblyMenuAt =
    typeof options.openSubassemblyMenuAt === "function" ? options.openSubassemblyMenuAt : () => {};
  const openAssemblyTemplateMenuAt =
    typeof options.openAssemblyTemplateMenuAt === "function"
      ? options.openAssemblyTemplateMenuAt
      : () => {};
  const openTimelineSummaryMenuAt =
    typeof options.openTimelineSummaryMenuAt === "function"
      ? options.openTimelineSummaryMenuAt
      : () => {};
  const getTimelineTimeAtClientX =
    typeof options.getTimelineTimeAtClientX === "function"
      ? options.getTimelineTimeAtClientX
      : () => 0;
  const getTimelineTrack =
    typeof options.getTimelineTrack === "function" ? options.getTimelineTrack : () => null;
  const resolveIndexedHit =
    typeof options.resolveIndexedHit === "function" ? options.resolveIndexedHit : () => null;
  const getPointerNdc =
    typeof options.getPointerNdc === "function" ? options.getPointerNdc : () => ({ x: 0, y: 0 });
  const resolveAssemblyHit =
    typeof options.resolveAssemblyHit === "function" ? options.resolveAssemblyHit : () => null;
  const resolveMemberHandleHit =
    typeof options.resolveMemberHandleHit === "function"
      ? options.resolveMemberHandleHit
      : () => null;
  const resolveSubassemblyHandleHit =
    typeof options.resolveSubassemblyHandleHit === "function"
      ? options.resolveSubassemblyHandleHit
      : () => null;
  const resolveGraphicOverlayHit =
    typeof options.resolveGraphicOverlayHit === "function"
      ? options.resolveGraphicOverlayHit
      : () => null;
  const resolvePersonalityHandleHit =
    typeof options.resolvePersonalityHandleHit === "function"
      ? options.resolvePersonalityHandleHit
      : () => null;
  const resolveAssemblyIdHit =
    typeof options.resolveAssemblyIdHit === "function" ? options.resolveAssemblyIdHit : () => null;
  const findShellSurfaceHit =
    typeof options.findShellSurfaceHit === "function" ? options.findShellSurfaceHit : () => null;
  const shouldPreferCenterMarker =
    typeof options.shouldPreferCenterMarker === "function"
      ? options.shouldPreferCenterMarker
      : () => null;
  const getAssemblyMeshes =
    typeof options.getAssemblyMeshes === "function" ? options.getAssemblyMeshes : () => [];
  const getPointMeshes =
    typeof options.getPointMeshes === "function" ? options.getPointMeshes : () => [];
  const getMemberHandleMeshes =
    typeof options.getMemberHandleMeshes === "function"
      ? options.getMemberHandleMeshes
      : () => [];
  const getPersonalityHandleMeshes =
    typeof options.getPersonalityHandleMeshes === "function"
      ? options.getPersonalityHandleMeshes
      : () => [];
  const getSubassemblyHandleMeshes =
    typeof options.getSubassemblyHandleMeshes === "function"
      ? options.getSubassemblyHandleMeshes
      : () => [];
  const getGraphicOverlayHandleMeshes =
    typeof options.getGraphicOverlayHandleMeshes === "function"
      ? options.getGraphicOverlayHandleMeshes
      : () => [];
  const getShellMeshes =
    typeof options.getShellMeshes === "function" ? options.getShellMeshes : () => [];
  const getOrbitParticleMeshes =
    typeof options.getOrbitParticleMeshes === "function"
      ? options.getOrbitParticleMeshes
      : () => [];
  const getCameraWaypointMeshes =
    typeof options.getCameraWaypointMeshes === "function"
      ? options.getCameraWaypointMeshes
      : () => [];

  function raycastToDragPlane(event, plane) {
    const composerRaycaster = getRaycaster();
    const composerCamera = getCamera();
    if (!composerRaycaster || !composerCamera) {
      return null;
    }
    const { x, y } = getPointerNdc(event);
    composerRaycaster.setFromCamera({ x, y }, composerCamera);
    const intersection = new THREE.Vector3();
    if (!composerRaycaster.ray.intersectPlane(plane, intersection)) {
      return null;
    }
    return intersection;
  }

  function startComposerAssemblyDrag(assemblyId, assemblyIndex, worldPoint, event) {
    const composerFrameGroup = getFrameGroup();
    const composerCamera = getCamera();
    const composerRaycaster = getRaycaster();
    const composerCanvas = getCanvas();
    const composerDragState = getDragState();
    const composerAssemblyWorldCenters = getAssemblyWorldCenters();
    const assembly = getAssemblyDraftsState()[assemblyIndex];
    if (!assembly || !composerFrameGroup || !composerCamera || !composerDragState) {
      return false;
    }
    setSelectedAssembly(assemblyId);
    composerDragState.mode = "assembly";
    composerDragState.assemblyIndex = assemblyIndex;
    composerDragState.assemblyId = assemblyId;
    composerDragState.startX = event.clientX;
    composerDragState.startY = event.clientY;
    const startPosition = Array.isArray(assembly.position) ? assembly.position : [0, 0, 0];
    composerDragState.startAssemblyPosition.set(
      Number(startPosition[0] ?? 0) || 0,
      Number(startPosition[1] ?? 0) || 0,
      Number(startPosition[2] ?? 0) || 0
    );
    composerDragState.startAssemblyPathPoints = normalizeAssemblyPathPoints(assembly.pathPoints);
    const parentWorldCenter = assembly.parentId
      ? composerAssemblyWorldCenters.get(assembly.parentId) ?? new THREE.Vector3()
      : new THREE.Vector3();
    const assemblyWorldCenter =
      composerAssemblyWorldCenters.get(assemblyId) ?? worldPoint?.clone?.() ?? new THREE.Vector3();
    composerDragState.startAssemblyParentCenter.copy(
      composerFrameGroup.worldToLocal(parentWorldCenter.clone())
    );
    composerDragState.startAssemblyCenter.copy(
      composerFrameGroup.worldToLocal(assemblyWorldCenter.clone())
    );
    const planeNormal = composerCamera.getWorldDirection(new THREE.Vector3()).normalize();
    composerDragState.plane.setFromNormalAndCoplanarPoint(planeNormal, assemblyWorldCenter);
    composerDragState.startAssemblyGrabOffset.set(0, 0, 0);
    if (composerRaycaster && composerCamera && composerCanvas) {
      const { x, y } = getPointerNdc(event);
      composerRaycaster.setFromCamera({ x, y }, composerCamera);
      const intersection = new THREE.Vector3();
      if (composerRaycaster.ray.intersectPlane(composerDragState.plane, intersection)) {
        const localIntersection = composerFrameGroup.worldToLocal(intersection.clone());
        composerDragState.startAssemblyGrabOffset.copy(
          localIntersection.sub(composerDragState.startAssemblyCenter)
        );
      }
    }
    return true;
  }

  function onComposerPointerDown(event) {
    const composerCanvas = getCanvas();
    const composerCamera = getCamera();
    const composerRaycaster = getRaycaster();
    const composerFrameGroup = getFrameGroup();
    const composerDragState = getDragState();
    const composerCameraFlightState = getCameraFlightState();
    const composerAssemblyWorldCenters = getAssemblyWorldCenters();
    const composerPathState = getPathState();
    if (!composerCanvas || !composerCamera || !composerRaycaster || !composerFrameGroup || !composerDragState) {
      return;
    }
    if (event.button === 2) {
      return;
    }
    closeAssemblyMenu();
    if (composerCameraFlightState.preview) {
      stopCameraFlightPreview();
    }
    composerCanvas.setPointerCapture(event.pointerId);
    const { x, y } = getPointerNdc(event);
    composerRaycaster.setFromCamera({ x, y }, composerCamera);
    const cameraWaypointHits = composerRaycaster.intersectObjects(getCameraWaypointMeshes(), true);
    if (cameraWaypointHits.length) {
      const hitMesh = resolveIndexedHit(cameraWaypointHits[0].object, "cameraWaypointIndex");
      const waypointIndex = hitMesh?.index;
      if (Number.isInteger(waypointIndex) && composerCameraFlightState.waypoints[waypointIndex]) {
        clearSelectedPoint();
        composerDragState.mode = "camera_waypoint";
        composerDragState.cameraWaypointIndex = waypointIndex;
        setSelectedCameraWaypointIndex(waypointIndex);
        composerDragState.startX = event.clientX;
        composerDragState.startY = event.clientY;
        composerDragState.startCameraWaypoint.copy(
          composerCameraFlightState.waypoints[waypointIndex].position
        );
        const worldPoint = hitMesh.object.getWorldPosition(new THREE.Vector3());
        const normal = new THREE.Vector3(0, 0, 1).applyQuaternion(composerFrameGroup.quaternion);
        composerDragState.plane.setFromNormalAndCoplanarPoint(normal, worldPoint);
        updateCameraWaypointMaterials(waypointIndex);
        return;
      }
    }
    const personalityHits = composerRaycaster.intersectObjects(getPersonalityHandleMeshes(), true);
    const memberHits = composerRaycaster.intersectObjects(getMemberHandleMeshes(), true);
    if (event.button === 0 && personalityHits.length) {
      const personalityHit = resolvePersonalityHandleHit(personalityHits[0].object);
      if (personalityHit?.assemblyId) {
        clearSelectedPoint();
        setSelectedAssembly(personalityHit.assemblyId);
        renderAssemblyEditor();
        renderJsonPreview();
        return;
      }
    }
    const graphicHits = composerRaycaster.intersectObjects(getGraphicOverlayHandleMeshes(), true);
    if (event.button === 0 && graphicHits.length) {
      const graphicHit = resolveGraphicOverlayHit(graphicHits[0].object);
      const overlay = graphicHit?.overlayId ? getGraphicOverlayDraftById(graphicHit.overlayId) : null;
      if (graphicHit?.draggable && overlay) {
        clearSelectedPoint();
        composerDragState.mode = "graphic";
        composerDragState.overlayId = overlay.id;
        composerDragState.startX = event.clientX;
        composerDragState.startY = event.clientY;
        const anchorPosition =
          resolveGraphicTargetPosition(
            overlay.target,
            composerAssemblyWorldCenters,
            getCurrentDocument()
          ) ?? new THREE.Vector3();
        composerDragState.startGraphicAnchor.copy(anchorPosition);
        composerDragState.startGraphicOffset.copy(vectorFromTriplet(overlay.offset));
        composerDragState.startGraphicCenter.copy(
          anchorPosition.clone().add(vectorFromTriplet(overlay.offset))
        );
        const planeNormal = composerCamera.getWorldDirection(new THREE.Vector3()).normalize();
        const worldCenter = composerFrameGroup.localToWorld(
          composerDragState.startGraphicCenter.clone()
        );
        composerDragState.plane.setFromNormalAndCoplanarPoint(planeNormal, worldCenter);
        return;
      }
    }
    const assemblyHits = composerRaycaster.intersectObjects(getAssemblyMeshes(), true);
    const pointHits = composerRaycaster.intersectObjects(getPointMeshes(), true);
    const preferredCenterHit = shouldPreferCenterMarker(pointHits, assemblyHits);
    if (event.button === 0 && preferredCenterHit?.draggable) {
      clearSelectedPoint();
      if (
        startComposerAssemblyDrag(
          preferredCenterHit.assemblyId,
          preferredCenterHit.assemblyIndex,
          preferredCenterHit.object.getWorldPosition(new THREE.Vector3()),
          event
        )
      ) {
        return;
      }
    }
    if (pointHits.length) {
      const hit = resolveIndexedHit(pointHits[0].object, "pointIndex");
      if (!hit) {
        return;
      }
      composerDragState.mode = "point";
      composerDragState.pointIndex = hit.index;
      setSelectedPointIndexState(composerDragState.pointIndex);
      composerDragState.startX = event.clientX;
      composerDragState.startY = event.clientY;
      composerDragState.startPoint.copy(composerPathState.points[composerDragState.pointIndex]);
      const worldPoint = hit.object.getWorldPosition(new THREE.Vector3());
      const normal = new THREE.Vector3(0, 0, 1).applyQuaternion(composerFrameGroup.quaternion);
      composerDragState.plane.setFromNormalAndCoplanarPoint(normal, worldPoint);
      updatePointMaterials(composerDragState.pointIndex);
      return;
    }
    if (event.button === 0 && memberHits.length) {
      const memberHit = resolveMemberHandleHit(memberHits[0].object);
      if (memberHit?.draggable) {
        clearSelectedPoint();
        const liveAssembly = getAssemblyDraftById(memberHit.assemblyId);
        if (!liveAssembly) {
          return;
        }
        if (isBareArchitrinoAssembly(liveAssembly)) {
          const assemblyIndex = getAssemblyDraftIndexById(memberHit.assemblyId);
          if (
            assemblyIndex >= 0 &&
            startComposerAssemblyDrag(
              memberHit.assemblyId,
              assemblyIndex,
              memberHit.object.getWorldPosition(new THREE.Vector3()),
              event
            )
          ) {
            return;
          }
        }
        setSelectedAssembly(memberHit.assemblyId);
        renderAssemblyEditor();
        composerDragState.mode = "member";
        composerDragState.assemblyId = memberHit.assemblyId;
        composerDragState.memberId = memberHit.memberId;
        composerDragState.subassemblyId = memberHit.subassemblyId ?? "";
        composerDragState.startX = event.clientX;
        composerDragState.startY = event.clientY;
        const assemblyWorldCenter =
          composerAssemblyWorldCenters.get(memberHit.assemblyId) ?? new THREE.Vector3();
        composerDragState.startMemberAssemblyCenter.copy(
          composerFrameGroup.worldToLocal(assemblyWorldCenter.clone())
        );
        const subassemblyIndex = getAssemblySubassemblyIndex(
          liveAssembly,
          composerDragState.subassemblyId
        );
        const subassemblyPosition =
          subassemblyIndex >= 0
            ? normalizeMemberPosition(liveAssembly.subassemblies?.[subassemblyIndex]?.position) ??
              [0, 0, 0]
            : [0, 0, 0];
        composerDragState.startMemberSubassemblyPosition.set(
          Number(subassemblyPosition[0] ?? 0),
          Number(subassemblyPosition[1] ?? 0),
          Number(subassemblyPosition[2] ?? 0)
        );
        const worldPoint = memberHit.object.getWorldPosition(new THREE.Vector3());
        const planeNormal = composerCamera.getWorldDirection(new THREE.Vector3()).normalize();
        composerDragState.plane.setFromNormalAndCoplanarPoint(planeNormal, worldPoint);
        return;
      }
    }
    const subassemblyHits = composerRaycaster.intersectObjects(getSubassemblyHandleMeshes(), true);
    if (event.button === 0 && subassemblyHits.length) {
      const subassemblyHit = resolveSubassemblyHandleHit(subassemblyHits[0].object);
      if (subassemblyHit?.draggable) {
        clearSelectedPoint();
        const liveAssembly = getAssemblyDraftById(subassemblyHit.assemblyId);
        if (!liveAssembly) {
          return;
        }
        setSelectedAssembly(subassemblyHit.assemblyId);
        renderAssemblyEditor();
        composerDragState.mode = "subassembly";
        composerDragState.assemblyId = subassemblyHit.assemblyId;
        composerDragState.subassemblyId = subassemblyHit.subassemblyId;
        composerDragState.startX = event.clientX;
        composerDragState.startY = event.clientY;
        const assemblyWorldCenter =
          composerAssemblyWorldCenters.get(subassemblyHit.assemblyId) ?? new THREE.Vector3();
        composerDragState.startSubassemblyAssemblyCenter.copy(
          composerFrameGroup.worldToLocal(assemblyWorldCenter.clone())
        );
        const subassemblyIndex = getAssemblySubassemblyIndex(
          liveAssembly,
          subassemblyHit.subassemblyId
        );
        const startPosition =
          subassemblyIndex >= 0
            ? normalizeMemberPosition(liveAssembly.subassemblies?.[subassemblyIndex]?.position) ??
              [0, 0, 0]
            : [0, 0, 0];
        composerDragState.startSubassemblyPosition.set(
          Number(startPosition[0] ?? 0),
          Number(startPosition[1] ?? 0),
          Number(startPosition[2] ?? 0)
        );
        const worldPoint = subassemblyHit.object.getWorldPosition(new THREE.Vector3());
        const planeNormal = composerCamera.getWorldDirection(new THREE.Vector3()).normalize();
        composerDragState.plane.setFromNormalAndCoplanarPoint(planeNormal, worldPoint);
        return;
      }
    }
    if (event.button === 0 && assemblyHits.length) {
      const assemblyHit = resolveAssemblyHit(assemblyHits[0].object);
      if (assemblyHit?.draggable) {
        clearSelectedPoint();
        if (
          startComposerAssemblyDrag(
            assemblyHit.assemblyId,
            assemblyHit.assemblyIndex,
            assemblyHit.object.getWorldPosition(new THREE.Vector3()),
            event
          )
        ) {
          return;
        }
      }
    }
    const wantsPan = event.shiftKey;
    clearSelectedPoint();
    if (getFrameEditMode() && event.button === 0 && !wantsPan) {
      composerDragState.mode = "frame";
      composerDragState.startFrameRot.copy(getFrameState().rotation);
    } else {
      composerDragState.mode = "camera";
    }
    const composerCameraOrbitState = getCameraOrbitState();
    composerDragState.button = event.button;
    composerDragState.startX = event.clientX;
    composerDragState.startY = event.clientY;
    composerDragState.startOrbitTheta = composerCameraOrbitState.theta;
    composerDragState.startOrbitPhi = composerCameraOrbitState.phi;
  }

  function onComposerContextMenu(event) {
    const composerCanvas = getCanvas();
    const composerCamera = getCamera();
    const composerRaycaster = getRaycaster();
    const composerPathState = getPathState();
    if (!composerCanvas || !composerCamera || !composerRaycaster) {
      return;
    }
    event.preventDefault();
    const { x, y } = getPointerNdc(event);
    composerRaycaster.setFromCamera({ x, y }, composerCamera);
    const shellHits = composerRaycaster.intersectObjects(getShellMeshes(), true);
    const orbitHits = composerRaycaster.intersectObjects(getOrbitParticleMeshes(), true);
    const personalityHits = composerRaycaster.intersectObjects(getPersonalityHandleMeshes(), true);
    const graphicHits = composerRaycaster.intersectObjects(getGraphicOverlayHandleMeshes(), true);
    const assemblyHits = composerRaycaster.intersectObjects(getAssemblyMeshes(), true);
    const pointHits = composerRaycaster.intersectObjects(getPointMeshes(), true);
    const memberHits = composerRaycaster.intersectObjects(getMemberHandleMeshes(), true);
    const subassemblyHits = composerRaycaster.intersectObjects(getSubassemblyHandleMeshes(), true);
    const shellSurfaceHit = findShellSurfaceHit(shellHits);
    if (shellSurfaceHit) {
      const assemblyId = resolveAssemblyIdHit(shellSurfaceHit.object)?.assemblyId ?? null;
      if (assemblyId) {
        clearSelectedPoint();
        setSelectedAssembly(assemblyId);
        renderAssemblyEditor();
        renderJsonPreview();
        openAssemblyPropertiesMenuAt(event.clientX, event.clientY, assemblyId);
        return;
      }
    }
    if (orbitHits.length) {
      const assemblyId = resolveAssemblyIdHit(orbitHits[0].object)?.assemblyId ?? null;
      if (assemblyId) {
        clearSelectedPoint();
        setSelectedAssembly(assemblyId);
        renderAssemblyEditor();
        renderJsonPreview();
        openAssemblyPropertiesMenuAt(event.clientX, event.clientY, assemblyId);
        return;
      }
    }
    if (personalityHits.length) {
      const personalityHit = resolvePersonalityHandleHit(personalityHits[0].object);
      if (personalityHit?.assemblyId && personalityHit?.memberId) {
        clearSelectedPoint();
        setSelectedAssembly(personalityHit.assemblyId);
        renderAssemblyEditor();
        renderJsonPreview();
        if (
          openPersonalitySlotMenuAt(
            event.clientX,
            event.clientY,
            personalityHit.assemblyId,
            personalityHit.memberId
          )
        ) {
          return;
        }
      }
    }
    if (graphicHits.length) {
      const graphicHit = resolveGraphicOverlayHit(graphicHits[0].object);
      if (graphicHit?.overlayId) {
        clearSelectedPoint();
        event.preventDefault();
        openTimelineMenuAt(event.clientX, event.clientY, {
          graphicId: graphicHit.overlayId,
        });
        return;
      }
    }
    const preferredCenterHit = shouldPreferCenterMarker(pointHits, assemblyHits);
    if (preferredCenterHit?.assemblyId) {
      clearSelectedPoint();
      setSelectedAssembly(preferredCenterHit.assemblyId);
      renderAssemblyEditor();
      renderJsonPreview();
      openAssemblyPropertiesMenuAt(event.clientX, event.clientY, preferredCenterHit.assemblyId);
      return;
    }
    if (pointHits.length) {
      const pointIndex = resolveIndexedHit(pointHits[0].object, "pointIndex")?.index;
      if (Number.isInteger(pointIndex)) {
        setSelectedPointIndexState(pointIndex);
        updatePointMaterials(pointIndex);
        if (pointIndex === 0) {
          const targetAssemblyId = composerPathState.ownerAssemblyId || getSelectedAssemblyIdState();
          const targetAssembly = targetAssemblyId ? getAssemblyDraftById(targetAssemblyId) : null;
          if (targetAssemblyId && !isBareArchitrinoAssembly(targetAssembly)) {
            setSelectedAssembly(targetAssemblyId);
            renderAssemblyEditor();
            renderJsonPreview();
            openAssemblyPropertiesMenuAt(event.clientX, event.clientY, targetAssemblyId);
            return;
          }
        }
        openPathPointMenuAt(event.clientX, event.clientY, pointIndex);
        return;
      }
    }
    if (memberHits.length) {
      const memberHit = resolveMemberHandleHit(memberHits[0].object);
      if (memberHit?.assemblyId && memberHit?.memberId) {
        const liveAssembly = getAssemblyDraftById(memberHit.assemblyId);
        clearSelectedPoint();
        setSelectedAssembly(memberHit.assemblyId);
        renderAssemblyEditor();
        renderJsonPreview();
        if (isBareArchitrinoAssembly(liveAssembly)) {
          openAssemblyPropertiesMenuAt(event.clientX, event.clientY, memberHit.assemblyId);
        } else {
          openMemberMenuAt(event.clientX, event.clientY, memberHit.assemblyId, memberHit.memberId);
        }
        return;
      }
    }
    if (subassemblyHits.length) {
      const subassemblyHit = resolveSubassemblyHandleHit(subassemblyHits[0].object);
      if (subassemblyHit?.assemblyId && subassemblyHit?.subassemblyId) {
        clearSelectedPoint();
        setSelectedAssembly(subassemblyHit.assemblyId);
        renderAssemblyEditor();
        renderJsonPreview();
        openSubassemblyMenuAt(
          event.clientX,
          event.clientY,
          subassemblyHit.assemblyId,
          subassemblyHit.subassemblyId
        );
        return;
      }
    }
    if (assemblyHits.length) {
      const assemblyHit = resolveAssemblyHit(assemblyHits[0].object);
      if (assemblyHit?.assemblyId) {
        clearSelectedPoint();
        setSelectedAssembly(assemblyHit.assemblyId);
        renderAssemblyEditor();
        renderJsonPreview();
        openAssemblyPropertiesMenuAt(event.clientX, event.clientY, assemblyHit.assemblyId);
        return;
      }
    }
    clearSelectedPoint();
    openAssemblyTemplateMenuAt(event);
  }

  function onComposerTimelineContextMenu(event) {
    if (!getTimelineTrack()) {
      return;
    }
    event.preventDefault();
    closeAssemblyMenu();
    const timelineBand = event.target.closest?.(".composer-timeline-band") ?? null;
    const isWarpBand = !!timelineBand?.classList?.contains("is-warp");
    const isPauseBand = !!timelineBand?.classList?.contains("is-pause");
    const isOverlayBand =
      !!timelineBand?.classList?.contains("is-graphic") ||
      !!timelineBand?.classList?.contains("is-image") ||
      !!timelineBand?.classList?.contains("is-video");
    openTimelineMenuAt(event.clientX, event.clientY, {
      timeSeconds: getTimelineTimeAtClientX(event.clientX, getCurrentDocument()),
      overlayId: isOverlayBand ? timelineBand?.dataset?.overlayId ?? null : null,
      pauseId: isPauseBand ? timelineBand?.dataset?.pauseId ?? null : null,
      warpId: isWarpBand ? timelineBand?.dataset?.warpId ?? null : null,
    });
  }

  function onComposerTimelineSummaryContextMenu(event) {
    event.preventDefault();
    closeAssemblyMenu();
    openTimelineSummaryMenuAt(event.clientX, event.clientY);
  }

  function resolveComposerHoverAssemblyId(event) {
    const composerCanvas = getCanvas();
    const composerCamera = getCamera();
    const composerRaycaster = getRaycaster();
    if (!composerCanvas || !composerCamera || !composerRaycaster || !event) {
      return "";
    }
    const { x, y } = getPointerNdc(event);
    composerRaycaster.setFromCamera({ x, y }, composerCamera);

    const personalityHits = composerRaycaster.intersectObjects(getPersonalityHandleMeshes(), true);
    if (personalityHits.length) {
      return resolvePersonalityHandleHit(personalityHits[0].object)?.assemblyId ?? "";
    }

    const memberHits = composerRaycaster.intersectObjects(getMemberHandleMeshes(), true);
    if (memberHits.length) {
      return resolveMemberHandleHit(memberHits[0].object)?.assemblyId ?? "";
    }

    const subassemblyHits = composerRaycaster.intersectObjects(getSubassemblyHandleMeshes(), true);
    if (subassemblyHits.length) {
      return resolveSubassemblyHandleHit(subassemblyHits[0].object)?.assemblyId ?? "";
    }

    const assemblyHits = composerRaycaster.intersectObjects(getAssemblyMeshes(), true);
    if (assemblyHits.length) {
      return resolveAssemblyHit(assemblyHits[0].object)?.assemblyId ?? "";
    }
    return "";
  }

  function onComposerPointerMove(event) {
    const composerDragState = getDragState();
    const composerRaycaster = getRaycaster();
    const composerCamera = getCamera();
    const composerFrameGroup = getFrameGroup();
    const composerPathState = getPathState();
    const composerAssemblyWorldCenters = getAssemblyWorldCenters();
    if (!composerDragState || !composerRaycaster || !composerCamera || !composerFrameGroup) {
      return;
    }
    if (!composerDragState.mode) {
      updateAssemblyHoverTooltip(resolveComposerHoverAssemblyId(event), event);
      return;
    }
    hideHoverTooltip();
    clearAssemblyHoverTooltipState();
    const dx = event.clientX - composerDragState.startX;
    const dy = event.clientY - composerDragState.startY;
    if (composerDragState.mode === "point") {
      const index = composerDragState.pointIndex;
      if (index == null) {
        return;
      }
      const intersection = raycastToDragPlane(event, composerDragState.plane);
      if (intersection) {
        const localPoint = composerFrameGroup.worldToLocal(intersection.clone());
        updatePathPointAtState(index, (point) => {
          point.copy(localPoint);
        });
      }
      if (getPointMeshes()[index]) {
        getPointMeshes()[index].position.copy(composerPathState.points[index]);
      }
      updatePathGeometry();
      renderJsonPreview();
      return;
    }

    if (composerDragState.mode === "assembly") {
      const assemblyIndex = composerDragState.assemblyIndex;
      const assemblyDrafts = getAssemblyDraftsState();
      if (assemblyIndex == null || !assemblyDrafts[assemblyIndex]) {
        return;
      }
      const intersection = raycastToDragPlane(event, composerDragState.plane);
      if (intersection) {
        const liveAssembly = assemblyDrafts[assemblyIndex];
        const localIntersection = composerFrameGroup
          .worldToLocal(intersection.clone())
          .sub(composerDragState.startAssemblyGrabOffset);
        if (
          Array.isArray(composerDragState.startAssemblyPathPoints) &&
          composerDragState.startAssemblyPathPoints.length
        ) {
          const delta = localIntersection.sub(composerDragState.startAssemblyCenter);
          const nextPathPoints = composerDragState.startAssemblyPathPoints.map((point) => [
            Number((point[0] + delta.x).toFixed(3)),
            Number((point[1] + delta.y).toFixed(3)),
            Number((point[2] + delta.z).toFixed(3)),
          ]);
          updateAssemblyDraftByIdState(liveAssembly.id, (currentAssembly) => ({
            ...currentAssembly,
            pathPoints: nextPathPoints,
          }));
          if (liveAssembly.id === getSelectedAssemblyIdState()) {
            mutatePathStateState((pathState) => {
              pathState.points = nextPathPoints.map((point) => vectorFromTriplet(point));
            });
            rebuildControlPoints();
            updatePathGeometry();
          }
        } else {
          const localPosition = localIntersection.sub(composerDragState.startAssemblyParentCenter);
          updateAssemblyDraftByIdState(liveAssembly.id, (currentAssembly) => ({
            ...currentAssembly,
            position: [
              Number(localPosition.x.toFixed(3)),
              Number(localPosition.y.toFixed(3)),
              Number(localPosition.z.toFixed(3)),
            ],
          }));
        }
        renderJsonPreview();
      }
      return;
    }

    if (composerDragState.mode === "member") {
      const liveAssembly = getAssemblyDraftById(composerDragState.assemblyId);
      if (!liveAssembly || !composerDragState.memberId) {
        return;
      }
      const intersection = raycastToDragPlane(event, composerDragState.plane);
      if (intersection) {
        const localPoint = composerFrameGroup.worldToLocal(intersection.clone());
        const relativeToAssembly = localPoint.sub(composerDragState.startMemberAssemblyCenter);
        const nextLocalPosition = composerDragState.subassemblyId
          ? relativeToAssembly.sub(composerDragState.startMemberSubassemblyPosition)
          : relativeToAssembly;
        if (
          setAssemblyMemberPosition(
            liveAssembly,
            composerDragState.memberId,
            [nextLocalPosition.x, nextLocalPosition.y, nextLocalPosition.z],
            composerDragState.subassemblyId
          )
        ) {
          renderJsonPreview();
        }
      }
      return;
    }

    if (composerDragState.mode === "graphic") {
      const overlay = getGraphicOverlayDraftById(composerDragState.overlayId);
      if (!overlay) {
        return;
      }
      const intersection = raycastToDragPlane(event, composerDragState.plane);
      if (intersection) {
        const localPoint = composerFrameGroup.worldToLocal(intersection.clone());
        const nextOffset = localPoint.sub(composerDragState.startGraphicAnchor);
        updateGraphicOverlayDraftByIdState(overlay.id, (currentOverlay) => ({
          ...currentOverlay,
          offset: [
            Number(nextOffset.x.toFixed(3)),
            Number(nextOffset.y.toFixed(3)),
            Number(nextOffset.z.toFixed(3)),
          ],
        }));
        renderJsonPreview();
      }
      return;
    }

    if (composerDragState.mode === "subassembly") {
      const liveAssembly = getAssemblyDraftById(composerDragState.assemblyId);
      if (!liveAssembly || !composerDragState.subassemblyId) {
        return;
      }
      const intersection = raycastToDragPlane(event, composerDragState.plane);
      if (intersection) {
        const localPoint = composerFrameGroup.worldToLocal(intersection.clone());
        const nextPosition = localPoint.sub(composerDragState.startSubassemblyAssemblyCenter);
        if (
          setSubassemblyPosition(liveAssembly, composerDragState.subassemblyId, [
            nextPosition.x,
            nextPosition.y,
            nextPosition.z,
          ])
        ) {
          renderJsonPreview();
        }
      }
      return;
    }

    if (composerDragState.mode === "camera_waypoint") {
      const composerCameraFlightState = getCameraFlightState();
      const waypointIndex = composerDragState.cameraWaypointIndex;
      if (waypointIndex == null || !composerCameraFlightState.waypoints[waypointIndex]) {
        return;
      }
      const intersection = raycastToDragPlane(event, composerDragState.plane);
      if (intersection) {
        const localPoint = composerFrameGroup.worldToLocal(intersection.clone());
        composerCameraFlightState.waypoints[waypointIndex].position.copy(localPoint);
        updateCameraFlightDisplay();
        renderJsonPreview();
      }
      return;
    }

    if (composerDragState.mode === "camera") {
      const composerCameraState = getCameraState();
      const composerCameraOrbitState = getCameraOrbitState();
      const speed = composerCameraState.speed * 0.004;
      composerCameraOrbitState.theta = composerDragState.startOrbitTheta - dx * speed;
      composerCameraOrbitState.phi = clampFn(
        composerDragState.startOrbitPhi - dy * speed,
        0.05,
        Math.PI - 0.05
      );
      updateCamera();
    }

    if (composerDragState.mode === "frame") {
      const composerFrameState = getFrameState();
      composerFrameState.rotation.y = composerDragState.startFrameRot.y - dx * 0.005;
      composerFrameState.rotation.x = composerDragState.startFrameRot.x - dy * 0.005;
      updateFrame();
    }
  }

  function onComposerPointerUp(event) {
    const composerDragState = getDragState();
    const composerCanvas = getCanvas();
    if (!composerDragState) {
      return;
    }
    hideHoverTooltip();
    clearAssemblyHoverTooltipState();
    if (composerDragState.mode === "point" && composerDragState.pointIndex != null) {
      updatePointMaterials();
    }
    if (composerDragState.mode === "camera_waypoint") {
      updateCameraWaypointMaterials(getSelectedCameraWaypointIndex());
    }
    composerDragState.mode = null;
    composerDragState.pointIndex = null;
    composerDragState.cameraWaypointIndex = null;
    composerDragState.assemblyIndex = null;
    composerDragState.assemblyId = null;
    composerDragState.memberId = null;
    composerDragState.overlayId = null;
    composerDragState.subassemblyId = null;
    if (composerCanvas && composerCanvas.hasPointerCapture(event.pointerId)) {
      composerCanvas.releasePointerCapture(event.pointerId);
    }
    composerDragState.button = 0;
  }

  function onComposerWheel(event) {
    const composerCamera = getCamera();
    if (!composerCamera) {
      return;
    }
    const composerCameraState = getCameraState();
    const composerCameraOrbitState = getCameraOrbitState();
    event.preventDefault();
    const speed = composerCameraState.speed * 0.0015;
    composerCameraOrbitState.theta -= event.deltaX * speed;
    composerCameraOrbitState.phi = clampFn(
      composerCameraOrbitState.phi - event.deltaY * speed,
      0.05,
      Math.PI - 0.05
    );
    updateCamera();
  }

  return {
    onComposerPointerDown,
    onComposerContextMenu,
    onComposerTimelineContextMenu,
    onComposerTimelineSummaryContextMenu,
    onComposerPointerMove,
    onComposerPointerUp,
    onComposerWheel,
  };
}
