export function createPdgviewPointerInteractionRuntime(options = {}) {
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
    const pdgviewRaycaster = getRaycaster();
    const pdgviewCamera = getCamera();
    if (!pdgviewRaycaster || !pdgviewCamera) {
      return null;
    }
    const { x, y } = getPointerNdc(event);
    pdgviewRaycaster.setFromCamera({ x, y }, pdgviewCamera);
    const intersection = new THREE.Vector3();
    if (!pdgviewRaycaster.ray.intersectPlane(plane, intersection)) {
      return null;
    }
    return intersection;
  }

  function startPdgviewAssemblyDrag(assemblyId, assemblyIndex, worldPoint, event) {
    const pdgviewFrameGroup = getFrameGroup();
    const pdgviewCamera = getCamera();
    const pdgviewRaycaster = getRaycaster();
    const pdgviewCanvas = getCanvas();
    const pdgviewDragState = getDragState();
    const pdgviewAssemblyWorldCenters = getAssemblyWorldCenters();
    const assembly = getAssemblyDraftsState()[assemblyIndex];
    if (!assembly || !pdgviewFrameGroup || !pdgviewCamera || !pdgviewDragState) {
      return false;
    }
    setSelectedAssembly(assemblyId);
    pdgviewDragState.mode = "assembly";
    pdgviewDragState.assemblyIndex = assemblyIndex;
    pdgviewDragState.assemblyId = assemblyId;
    pdgviewDragState.startX = event.clientX;
    pdgviewDragState.startY = event.clientY;
    const startPosition = Array.isArray(assembly.position) ? assembly.position : [0, 0, 0];
    pdgviewDragState.startAssemblyPosition.set(
      Number(startPosition[0] ?? 0) || 0,
      Number(startPosition[1] ?? 0) || 0,
      Number(startPosition[2] ?? 0) || 0
    );
    pdgviewDragState.startAssemblyPathPoints = normalizeAssemblyPathPoints(assembly.pathPoints);
    const parentWorldCenter = assembly.parentId
      ? pdgviewAssemblyWorldCenters.get(assembly.parentId) ?? new THREE.Vector3()
      : new THREE.Vector3();
    const assemblyWorldCenter =
      pdgviewAssemblyWorldCenters.get(assemblyId) ?? worldPoint?.clone?.() ?? new THREE.Vector3();
    pdgviewDragState.startAssemblyParentCenter.copy(
      pdgviewFrameGroup.worldToLocal(parentWorldCenter.clone())
    );
    pdgviewDragState.startAssemblyCenter.copy(
      pdgviewFrameGroup.worldToLocal(assemblyWorldCenter.clone())
    );
    const planeNormal = pdgviewCamera.getWorldDirection(new THREE.Vector3()).normalize();
    pdgviewDragState.plane.setFromNormalAndCoplanarPoint(planeNormal, assemblyWorldCenter);
    pdgviewDragState.startAssemblyGrabOffset.set(0, 0, 0);
    if (pdgviewRaycaster && pdgviewCamera && pdgviewCanvas) {
      const { x, y } = getPointerNdc(event);
      pdgviewRaycaster.setFromCamera({ x, y }, pdgviewCamera);
      const intersection = new THREE.Vector3();
      if (pdgviewRaycaster.ray.intersectPlane(pdgviewDragState.plane, intersection)) {
        const localIntersection = pdgviewFrameGroup.worldToLocal(intersection.clone());
        pdgviewDragState.startAssemblyGrabOffset.copy(
          localIntersection.sub(pdgviewDragState.startAssemblyCenter)
        );
      }
    }
    return true;
  }

  function onPdgviewPointerDown(event) {
    const pdgviewCanvas = getCanvas();
    const pdgviewCamera = getCamera();
    const pdgviewRaycaster = getRaycaster();
    const pdgviewFrameGroup = getFrameGroup();
    const pdgviewDragState = getDragState();
    const pdgviewCameraFlightState = getCameraFlightState();
    const pdgviewAssemblyWorldCenters = getAssemblyWorldCenters();
    const pdgviewPathState = getPathState();
    if (!pdgviewCanvas || !pdgviewCamera || !pdgviewRaycaster || !pdgviewFrameGroup || !pdgviewDragState) {
      return;
    }
    if (event.button === 2) {
      return;
    }
    closeAssemblyMenu();
    if (pdgviewCameraFlightState.preview) {
      stopCameraFlightPreview();
    }
    pdgviewCanvas.setPointerCapture(event.pointerId);
    const { x, y } = getPointerNdc(event);
    pdgviewRaycaster.setFromCamera({ x, y }, pdgviewCamera);
    const cameraWaypointHits = pdgviewRaycaster.intersectObjects(getCameraWaypointMeshes(), true);
    if (cameraWaypointHits.length) {
      const hitMesh = resolveIndexedHit(cameraWaypointHits[0].object, "cameraWaypointIndex");
      const waypointIndex = hitMesh?.index;
      if (Number.isInteger(waypointIndex) && pdgviewCameraFlightState.waypoints[waypointIndex]) {
        clearSelectedPoint();
        pdgviewDragState.mode = "camera_waypoint";
        pdgviewDragState.cameraWaypointIndex = waypointIndex;
        setSelectedCameraWaypointIndex(waypointIndex);
        pdgviewDragState.startX = event.clientX;
        pdgviewDragState.startY = event.clientY;
        pdgviewDragState.startCameraWaypoint.copy(
          pdgviewCameraFlightState.waypoints[waypointIndex].position
        );
        const worldPoint = hitMesh.object.getWorldPosition(new THREE.Vector3());
        const normal = new THREE.Vector3(0, 0, 1).applyQuaternion(pdgviewFrameGroup.quaternion);
        pdgviewDragState.plane.setFromNormalAndCoplanarPoint(normal, worldPoint);
        updateCameraWaypointMaterials(waypointIndex);
        return;
      }
    }
    const personalityHits = pdgviewRaycaster.intersectObjects(getPersonalityHandleMeshes(), true);
    const memberHits = pdgviewRaycaster.intersectObjects(getMemberHandleMeshes(), true);
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
    const graphicHits = pdgviewRaycaster.intersectObjects(getGraphicOverlayHandleMeshes(), true);
    if (event.button === 0 && graphicHits.length) {
      const graphicHit = resolveGraphicOverlayHit(graphicHits[0].object);
      const overlay = graphicHit?.overlayId ? getGraphicOverlayDraftById(graphicHit.overlayId) : null;
      if (graphicHit?.draggable && overlay) {
        clearSelectedPoint();
        pdgviewDragState.mode = "graphic";
        pdgviewDragState.overlayId = overlay.id;
        pdgviewDragState.startX = event.clientX;
        pdgviewDragState.startY = event.clientY;
        const anchorPosition =
          resolveGraphicTargetPosition(
            overlay.target,
            pdgviewAssemblyWorldCenters,
            getCurrentDocument()
          ) ?? new THREE.Vector3();
        pdgviewDragState.startGraphicAnchor.copy(anchorPosition);
        pdgviewDragState.startGraphicOffset.copy(vectorFromTriplet(overlay.offset));
        pdgviewDragState.startGraphicCenter.copy(
          anchorPosition.clone().add(vectorFromTriplet(overlay.offset))
        );
        const planeNormal = pdgviewCamera.getWorldDirection(new THREE.Vector3()).normalize();
        const worldCenter = pdgviewFrameGroup.localToWorld(
          pdgviewDragState.startGraphicCenter.clone()
        );
        pdgviewDragState.plane.setFromNormalAndCoplanarPoint(planeNormal, worldCenter);
        return;
      }
    }
    const assemblyHits = pdgviewRaycaster.intersectObjects(getAssemblyMeshes(), true);
    const pointHits = pdgviewRaycaster.intersectObjects(getPointMeshes(), true);
    const preferredCenterHit = shouldPreferCenterMarker(pointHits, assemblyHits);
    if (event.button === 0 && preferredCenterHit?.draggable) {
      clearSelectedPoint();
      if (
        startPdgviewAssemblyDrag(
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
      pdgviewDragState.mode = "point";
      pdgviewDragState.pointIndex = hit.index;
      setSelectedPointIndexState(pdgviewDragState.pointIndex);
      pdgviewDragState.startX = event.clientX;
      pdgviewDragState.startY = event.clientY;
      pdgviewDragState.startPoint.copy(pdgviewPathState.points[pdgviewDragState.pointIndex]);
      const worldPoint = hit.object.getWorldPosition(new THREE.Vector3());
      const normal = new THREE.Vector3(0, 0, 1).applyQuaternion(pdgviewFrameGroup.quaternion);
      pdgviewDragState.plane.setFromNormalAndCoplanarPoint(normal, worldPoint);
      updatePointMaterials(pdgviewDragState.pointIndex);
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
            startPdgviewAssemblyDrag(
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
        pdgviewDragState.mode = "member";
        pdgviewDragState.assemblyId = memberHit.assemblyId;
        pdgviewDragState.memberId = memberHit.memberId;
        pdgviewDragState.subassemblyId = memberHit.subassemblyId ?? "";
        pdgviewDragState.startX = event.clientX;
        pdgviewDragState.startY = event.clientY;
        const assemblyWorldCenter =
          pdgviewAssemblyWorldCenters.get(memberHit.assemblyId) ?? new THREE.Vector3();
        pdgviewDragState.startMemberAssemblyCenter.copy(
          pdgviewFrameGroup.worldToLocal(assemblyWorldCenter.clone())
        );
        const subassemblyIndex = getAssemblySubassemblyIndex(
          liveAssembly,
          pdgviewDragState.subassemblyId
        );
        const subassemblyPosition =
          subassemblyIndex >= 0
            ? normalizeMemberPosition(liveAssembly.subassemblies?.[subassemblyIndex]?.position) ??
              [0, 0, 0]
            : [0, 0, 0];
        pdgviewDragState.startMemberSubassemblyPosition.set(
          Number(subassemblyPosition[0] ?? 0),
          Number(subassemblyPosition[1] ?? 0),
          Number(subassemblyPosition[2] ?? 0)
        );
        const worldPoint = memberHit.object.getWorldPosition(new THREE.Vector3());
        const planeNormal = pdgviewCamera.getWorldDirection(new THREE.Vector3()).normalize();
        pdgviewDragState.plane.setFromNormalAndCoplanarPoint(planeNormal, worldPoint);
        return;
      }
    }
    const subassemblyHits = pdgviewRaycaster.intersectObjects(getSubassemblyHandleMeshes(), true);
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
        pdgviewDragState.mode = "subassembly";
        pdgviewDragState.assemblyId = subassemblyHit.assemblyId;
        pdgviewDragState.subassemblyId = subassemblyHit.subassemblyId;
        pdgviewDragState.startX = event.clientX;
        pdgviewDragState.startY = event.clientY;
        const assemblyWorldCenter =
          pdgviewAssemblyWorldCenters.get(subassemblyHit.assemblyId) ?? new THREE.Vector3();
        pdgviewDragState.startSubassemblyAssemblyCenter.copy(
          pdgviewFrameGroup.worldToLocal(assemblyWorldCenter.clone())
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
        pdgviewDragState.startSubassemblyPosition.set(
          Number(startPosition[0] ?? 0),
          Number(startPosition[1] ?? 0),
          Number(startPosition[2] ?? 0)
        );
        const worldPoint = subassemblyHit.object.getWorldPosition(new THREE.Vector3());
        const planeNormal = pdgviewCamera.getWorldDirection(new THREE.Vector3()).normalize();
        pdgviewDragState.plane.setFromNormalAndCoplanarPoint(planeNormal, worldPoint);
        return;
      }
    }
    if (event.button === 0 && assemblyHits.length) {
      const assemblyHit = resolveAssemblyHit(assemblyHits[0].object);
      if (assemblyHit?.draggable) {
        clearSelectedPoint();
        if (
          startPdgviewAssemblyDrag(
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
      pdgviewDragState.mode = "frame";
      pdgviewDragState.startFrameRot.copy(getFrameState().rotation);
    } else {
      pdgviewDragState.mode = "camera";
    }
    const pdgviewCameraOrbitState = getCameraOrbitState();
    pdgviewDragState.button = event.button;
    pdgviewDragState.startX = event.clientX;
    pdgviewDragState.startY = event.clientY;
    pdgviewDragState.startOrbitTheta = pdgviewCameraOrbitState.theta;
    pdgviewDragState.startOrbitPhi = pdgviewCameraOrbitState.phi;
  }

  function onPdgviewContextMenu(event) {
    const pdgviewCanvas = getCanvas();
    const pdgviewCamera = getCamera();
    const pdgviewRaycaster = getRaycaster();
    const pdgviewPathState = getPathState();
    if (!pdgviewCanvas || !pdgviewCamera || !pdgviewRaycaster) {
      return;
    }
    event.preventDefault();
    const { x, y } = getPointerNdc(event);
    pdgviewRaycaster.setFromCamera({ x, y }, pdgviewCamera);
    const shellHits = pdgviewRaycaster.intersectObjects(getShellMeshes(), true);
    const orbitHits = pdgviewRaycaster.intersectObjects(getOrbitParticleMeshes(), true);
    const personalityHits = pdgviewRaycaster.intersectObjects(getPersonalityHandleMeshes(), true);
    const graphicHits = pdgviewRaycaster.intersectObjects(getGraphicOverlayHandleMeshes(), true);
    const assemblyHits = pdgviewRaycaster.intersectObjects(getAssemblyMeshes(), true);
    const pointHits = pdgviewRaycaster.intersectObjects(getPointMeshes(), true);
    const memberHits = pdgviewRaycaster.intersectObjects(getMemberHandleMeshes(), true);
    const subassemblyHits = pdgviewRaycaster.intersectObjects(getSubassemblyHandleMeshes(), true);
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
          const targetAssemblyId = pdgviewPathState.ownerAssemblyId || getSelectedAssemblyIdState();
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

  function onPdgviewTimelineContextMenu(event) {
    if (!getTimelineTrack()) {
      return;
    }
    event.preventDefault();
    closeAssemblyMenu();
    const timelineBand = event.target.closest?.(".pdgview-timeline-band") ?? null;
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

  function onPdgviewTimelineSummaryContextMenu(event) {
    event.preventDefault();
    closeAssemblyMenu();
    openTimelineSummaryMenuAt(event.clientX, event.clientY);
  }

  function resolvePdgviewHoverAssemblyId(event) {
    const pdgviewCanvas = getCanvas();
    const pdgviewCamera = getCamera();
    const pdgviewRaycaster = getRaycaster();
    if (!pdgviewCanvas || !pdgviewCamera || !pdgviewRaycaster || !event) {
      return "";
    }
    const { x, y } = getPointerNdc(event);
    pdgviewRaycaster.setFromCamera({ x, y }, pdgviewCamera);

    const personalityHits = pdgviewRaycaster.intersectObjects(getPersonalityHandleMeshes(), true);
    if (personalityHits.length) {
      return resolvePersonalityHandleHit(personalityHits[0].object)?.assemblyId ?? "";
    }

    const memberHits = pdgviewRaycaster.intersectObjects(getMemberHandleMeshes(), true);
    if (memberHits.length) {
      return resolveMemberHandleHit(memberHits[0].object)?.assemblyId ?? "";
    }

    const subassemblyHits = pdgviewRaycaster.intersectObjects(getSubassemblyHandleMeshes(), true);
    if (subassemblyHits.length) {
      return resolveSubassemblyHandleHit(subassemblyHits[0].object)?.assemblyId ?? "";
    }

    const assemblyHits = pdgviewRaycaster.intersectObjects(getAssemblyMeshes(), true);
    if (assemblyHits.length) {
      return resolveAssemblyHit(assemblyHits[0].object)?.assemblyId ?? "";
    }
    return "";
  }

  function onPdgviewPointerMove(event) {
    const pdgviewDragState = getDragState();
    const pdgviewRaycaster = getRaycaster();
    const pdgviewCamera = getCamera();
    const pdgviewFrameGroup = getFrameGroup();
    const pdgviewPathState = getPathState();
    const pdgviewAssemblyWorldCenters = getAssemblyWorldCenters();
    if (!pdgviewDragState || !pdgviewRaycaster || !pdgviewCamera || !pdgviewFrameGroup) {
      return;
    }
    if (!pdgviewDragState.mode) {
      updateAssemblyHoverTooltip(resolvePdgviewHoverAssemblyId(event), event);
      return;
    }
    hideHoverTooltip();
    clearAssemblyHoverTooltipState();
    const dx = event.clientX - pdgviewDragState.startX;
    const dy = event.clientY - pdgviewDragState.startY;
    if (pdgviewDragState.mode === "point") {
      const index = pdgviewDragState.pointIndex;
      if (index == null) {
        return;
      }
      const intersection = raycastToDragPlane(event, pdgviewDragState.plane);
      if (intersection) {
        const localPoint = pdgviewFrameGroup.worldToLocal(intersection.clone());
        updatePathPointAtState(index, (point) => {
          point.copy(localPoint);
        });
      }
      if (getPointMeshes()[index]) {
        getPointMeshes()[index].position.copy(pdgviewPathState.points[index]);
      }
      updatePathGeometry();
      renderJsonPreview();
      return;
    }

    if (pdgviewDragState.mode === "assembly") {
      const assemblyIndex = pdgviewDragState.assemblyIndex;
      const assemblyDrafts = getAssemblyDraftsState();
      if (assemblyIndex == null || !assemblyDrafts[assemblyIndex]) {
        return;
      }
      const intersection = raycastToDragPlane(event, pdgviewDragState.plane);
      if (intersection) {
        const liveAssembly = assemblyDrafts[assemblyIndex];
        const localIntersection = pdgviewFrameGroup
          .worldToLocal(intersection.clone())
          .sub(pdgviewDragState.startAssemblyGrabOffset);
        if (
          Array.isArray(pdgviewDragState.startAssemblyPathPoints) &&
          pdgviewDragState.startAssemblyPathPoints.length
        ) {
          const delta = localIntersection.sub(pdgviewDragState.startAssemblyCenter);
          const nextPathPoints = pdgviewDragState.startAssemblyPathPoints.map((point) => [
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
          const localPosition = localIntersection.sub(pdgviewDragState.startAssemblyParentCenter);
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

    if (pdgviewDragState.mode === "member") {
      const liveAssembly = getAssemblyDraftById(pdgviewDragState.assemblyId);
      if (!liveAssembly || !pdgviewDragState.memberId) {
        return;
      }
      const intersection = raycastToDragPlane(event, pdgviewDragState.plane);
      if (intersection) {
        const localPoint = pdgviewFrameGroup.worldToLocal(intersection.clone());
        const relativeToAssembly = localPoint.sub(pdgviewDragState.startMemberAssemblyCenter);
        const nextLocalPosition = pdgviewDragState.subassemblyId
          ? relativeToAssembly.sub(pdgviewDragState.startMemberSubassemblyPosition)
          : relativeToAssembly;
        if (
          setAssemblyMemberPosition(
            liveAssembly,
            pdgviewDragState.memberId,
            [nextLocalPosition.x, nextLocalPosition.y, nextLocalPosition.z],
            pdgviewDragState.subassemblyId
          )
        ) {
          renderJsonPreview();
        }
      }
      return;
    }

    if (pdgviewDragState.mode === "graphic") {
      const overlay = getGraphicOverlayDraftById(pdgviewDragState.overlayId);
      if (!overlay) {
        return;
      }
      const intersection = raycastToDragPlane(event, pdgviewDragState.plane);
      if (intersection) {
        const localPoint = pdgviewFrameGroup.worldToLocal(intersection.clone());
        const nextOffset = localPoint.sub(pdgviewDragState.startGraphicAnchor);
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

    if (pdgviewDragState.mode === "subassembly") {
      const liveAssembly = getAssemblyDraftById(pdgviewDragState.assemblyId);
      if (!liveAssembly || !pdgviewDragState.subassemblyId) {
        return;
      }
      const intersection = raycastToDragPlane(event, pdgviewDragState.plane);
      if (intersection) {
        const localPoint = pdgviewFrameGroup.worldToLocal(intersection.clone());
        const nextPosition = localPoint.sub(pdgviewDragState.startSubassemblyAssemblyCenter);
        if (
          setSubassemblyPosition(liveAssembly, pdgviewDragState.subassemblyId, [
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

    if (pdgviewDragState.mode === "camera_waypoint") {
      const pdgviewCameraFlightState = getCameraFlightState();
      const waypointIndex = pdgviewDragState.cameraWaypointIndex;
      if (waypointIndex == null || !pdgviewCameraFlightState.waypoints[waypointIndex]) {
        return;
      }
      const intersection = raycastToDragPlane(event, pdgviewDragState.plane);
      if (intersection) {
        const localPoint = pdgviewFrameGroup.worldToLocal(intersection.clone());
        pdgviewCameraFlightState.waypoints[waypointIndex].position.copy(localPoint);
        updateCameraFlightDisplay();
        renderJsonPreview();
      }
      return;
    }

    if (pdgviewDragState.mode === "camera") {
      const pdgviewCameraState = getCameraState();
      const pdgviewCameraOrbitState = getCameraOrbitState();
      const speed = pdgviewCameraState.speed * 0.004;
      pdgviewCameraOrbitState.theta = pdgviewDragState.startOrbitTheta - dx * speed;
      pdgviewCameraOrbitState.phi = clampFn(
        pdgviewDragState.startOrbitPhi - dy * speed,
        0.05,
        Math.PI - 0.05
      );
      updateCamera();
    }

    if (pdgviewDragState.mode === "frame") {
      const pdgviewFrameState = getFrameState();
      pdgviewFrameState.rotation.y = pdgviewDragState.startFrameRot.y - dx * 0.005;
      pdgviewFrameState.rotation.x = pdgviewDragState.startFrameRot.x - dy * 0.005;
      updateFrame();
    }
  }

  function onPdgviewPointerUp(event) {
    const pdgviewDragState = getDragState();
    const pdgviewCanvas = getCanvas();
    if (!pdgviewDragState) {
      return;
    }
    hideHoverTooltip();
    clearAssemblyHoverTooltipState();
    if (pdgviewDragState.mode === "point" && pdgviewDragState.pointIndex != null) {
      updatePointMaterials();
    }
    if (pdgviewDragState.mode === "camera_waypoint") {
      updateCameraWaypointMaterials(getSelectedCameraWaypointIndex());
    }
    pdgviewDragState.mode = null;
    pdgviewDragState.pointIndex = null;
    pdgviewDragState.cameraWaypointIndex = null;
    pdgviewDragState.assemblyIndex = null;
    pdgviewDragState.assemblyId = null;
    pdgviewDragState.memberId = null;
    pdgviewDragState.overlayId = null;
    pdgviewDragState.subassemblyId = null;
    if (pdgviewCanvas && pdgviewCanvas.hasPointerCapture(event.pointerId)) {
      pdgviewCanvas.releasePointerCapture(event.pointerId);
    }
    pdgviewDragState.button = 0;
  }

  function onPdgviewWheel(event) {
    const pdgviewCamera = getCamera();
    if (!pdgviewCamera) {
      return;
    }
    const pdgviewCameraState = getCameraState();
    const pdgviewCameraOrbitState = getCameraOrbitState();
    event.preventDefault();
    const speed = pdgviewCameraState.speed * 0.0015;
    pdgviewCameraOrbitState.theta -= event.deltaX * speed;
    pdgviewCameraOrbitState.phi = clampFn(
      pdgviewCameraOrbitState.phi - event.deltaY * speed,
      0.05,
      Math.PI - 0.05
    );
    updateCamera();
  }

  return {
    onPdgviewPointerDown,
    onPdgviewContextMenu,
    onPdgviewTimelineContextMenu,
    onPdgviewTimelineSummaryContextMenu,
    onPdgviewPointerMove,
    onPdgviewPointerUp,
    onPdgviewWheel,
  };
}
