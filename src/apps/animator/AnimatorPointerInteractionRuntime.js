export function createAnimatorPointerInteractionRuntime(options = {}) {
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
    const animatorRaycaster = getRaycaster();
    const animatorCamera = getCamera();
    if (!animatorRaycaster || !animatorCamera) {
      return null;
    }
    const { x, y } = getPointerNdc(event);
    animatorRaycaster.setFromCamera({ x, y }, animatorCamera);
    const intersection = new THREE.Vector3();
    if (!animatorRaycaster.ray.intersectPlane(plane, intersection)) {
      return null;
    }
    return intersection;
  }

  function startAnimatorAssemblyDrag(assemblyId, assemblyIndex, worldPoint, event) {
    const animatorFrameGroup = getFrameGroup();
    const animatorCamera = getCamera();
    const animatorRaycaster = getRaycaster();
    const animatorCanvas = getCanvas();
    const animatorDragState = getDragState();
    const animatorAssemblyWorldCenters = getAssemblyWorldCenters();
    const assembly = getAssemblyDraftsState()[assemblyIndex];
    if (!assembly || !animatorFrameGroup || !animatorCamera || !animatorDragState) {
      return false;
    }
    setSelectedAssembly(assemblyId);
    animatorDragState.mode = "assembly";
    animatorDragState.assemblyIndex = assemblyIndex;
    animatorDragState.assemblyId = assemblyId;
    animatorDragState.startX = event.clientX;
    animatorDragState.startY = event.clientY;
    const startPosition = Array.isArray(assembly.position) ? assembly.position : [0, 0, 0];
    animatorDragState.startAssemblyPosition.set(
      Number(startPosition[0] ?? 0) || 0,
      Number(startPosition[1] ?? 0) || 0,
      Number(startPosition[2] ?? 0) || 0
    );
    animatorDragState.startAssemblyPathPoints = normalizeAssemblyPathPoints(assembly.pathPoints);
    const parentWorldCenter = assembly.parentId
      ? animatorAssemblyWorldCenters.get(assembly.parentId) ?? new THREE.Vector3()
      : new THREE.Vector3();
    const assemblyWorldCenter =
      animatorAssemblyWorldCenters.get(assemblyId) ?? worldPoint?.clone?.() ?? new THREE.Vector3();
    animatorDragState.startAssemblyParentCenter.copy(
      animatorFrameGroup.worldToLocal(parentWorldCenter.clone())
    );
    animatorDragState.startAssemblyCenter.copy(
      animatorFrameGroup.worldToLocal(assemblyWorldCenter.clone())
    );
    const planeNormal = animatorCamera.getWorldDirection(new THREE.Vector3()).normalize();
    animatorDragState.plane.setFromNormalAndCoplanarPoint(planeNormal, assemblyWorldCenter);
    animatorDragState.startAssemblyGrabOffset.set(0, 0, 0);
    if (animatorRaycaster && animatorCamera && animatorCanvas) {
      const { x, y } = getPointerNdc(event);
      animatorRaycaster.setFromCamera({ x, y }, animatorCamera);
      const intersection = new THREE.Vector3();
      if (animatorRaycaster.ray.intersectPlane(animatorDragState.plane, intersection)) {
        const localIntersection = animatorFrameGroup.worldToLocal(intersection.clone());
        animatorDragState.startAssemblyGrabOffset.copy(
          localIntersection.sub(animatorDragState.startAssemblyCenter)
        );
      }
    }
    return true;
  }

  function onAnimatorPointerDown(event) {
    const animatorCanvas = getCanvas();
    const animatorCamera = getCamera();
    const animatorRaycaster = getRaycaster();
    const animatorFrameGroup = getFrameGroup();
    const animatorDragState = getDragState();
    const animatorCameraFlightState = getCameraFlightState();
    const animatorAssemblyWorldCenters = getAssemblyWorldCenters();
    const animatorPathState = getPathState();
    if (!animatorCanvas || !animatorCamera || !animatorRaycaster || !animatorFrameGroup || !animatorDragState) {
      return;
    }
    if (event.button === 2) {
      return;
    }
    closeAssemblyMenu();
    if (animatorCameraFlightState.preview) {
      stopCameraFlightPreview();
    }
    animatorCanvas.setPointerCapture(event.pointerId);
    const { x, y } = getPointerNdc(event);
    animatorRaycaster.setFromCamera({ x, y }, animatorCamera);
    const cameraWaypointHits = animatorRaycaster.intersectObjects(getCameraWaypointMeshes(), true);
    if (cameraWaypointHits.length) {
      const hitMesh = resolveIndexedHit(cameraWaypointHits[0].object, "cameraWaypointIndex");
      const waypointIndex = hitMesh?.index;
      if (Number.isInteger(waypointIndex) && animatorCameraFlightState.waypoints[waypointIndex]) {
        clearSelectedPoint();
        animatorDragState.mode = "camera_waypoint";
        animatorDragState.cameraWaypointIndex = waypointIndex;
        setSelectedCameraWaypointIndex(waypointIndex);
        animatorDragState.startX = event.clientX;
        animatorDragState.startY = event.clientY;
        animatorDragState.startCameraWaypoint.copy(
          animatorCameraFlightState.waypoints[waypointIndex].position
        );
        const worldPoint = hitMesh.object.getWorldPosition(new THREE.Vector3());
        const normal = new THREE.Vector3(0, 0, 1).applyQuaternion(animatorFrameGroup.quaternion);
        animatorDragState.plane.setFromNormalAndCoplanarPoint(normal, worldPoint);
        updateCameraWaypointMaterials(waypointIndex);
        return;
      }
    }
    const personalityHits = animatorRaycaster.intersectObjects(getPersonalityHandleMeshes(), true);
    const memberHits = animatorRaycaster.intersectObjects(getMemberHandleMeshes(), true);
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
    const graphicHits = animatorRaycaster.intersectObjects(getGraphicOverlayHandleMeshes(), true);
    if (event.button === 0 && graphicHits.length) {
      const graphicHit = resolveGraphicOverlayHit(graphicHits[0].object);
      const overlay = graphicHit?.overlayId ? getGraphicOverlayDraftById(graphicHit.overlayId) : null;
      if (graphicHit?.draggable && overlay) {
        clearSelectedPoint();
        animatorDragState.mode = "graphic";
        animatorDragState.overlayId = overlay.id;
        animatorDragState.startX = event.clientX;
        animatorDragState.startY = event.clientY;
        const anchorPosition =
          resolveGraphicTargetPosition(
            overlay.target,
            animatorAssemblyWorldCenters,
            getCurrentDocument()
          ) ?? new THREE.Vector3();
        animatorDragState.startGraphicAnchor.copy(anchorPosition);
        animatorDragState.startGraphicOffset.copy(vectorFromTriplet(overlay.offset));
        animatorDragState.startGraphicCenter.copy(
          anchorPosition.clone().add(vectorFromTriplet(overlay.offset))
        );
        const planeNormal = animatorCamera.getWorldDirection(new THREE.Vector3()).normalize();
        const worldCenter = animatorFrameGroup.localToWorld(
          animatorDragState.startGraphicCenter.clone()
        );
        animatorDragState.plane.setFromNormalAndCoplanarPoint(planeNormal, worldCenter);
        return;
      }
    }
    const assemblyHits = animatorRaycaster.intersectObjects(getAssemblyMeshes(), true);
    const pointHits = animatorRaycaster.intersectObjects(getPointMeshes(), true);
    const preferredCenterHit = shouldPreferCenterMarker(pointHits, assemblyHits);
    if (event.button === 0 && preferredCenterHit?.draggable) {
      clearSelectedPoint();
      if (
        startAnimatorAssemblyDrag(
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
      animatorDragState.mode = "point";
      animatorDragState.pointIndex = hit.index;
      setSelectedPointIndexState(animatorDragState.pointIndex);
      animatorDragState.startX = event.clientX;
      animatorDragState.startY = event.clientY;
      animatorDragState.startPoint.copy(animatorPathState.points[animatorDragState.pointIndex]);
      const worldPoint = hit.object.getWorldPosition(new THREE.Vector3());
      const normal = new THREE.Vector3(0, 0, 1).applyQuaternion(animatorFrameGroup.quaternion);
      animatorDragState.plane.setFromNormalAndCoplanarPoint(normal, worldPoint);
      updatePointMaterials(animatorDragState.pointIndex);
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
            startAnimatorAssemblyDrag(
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
        animatorDragState.mode = "member";
        animatorDragState.assemblyId = memberHit.assemblyId;
        animatorDragState.memberId = memberHit.memberId;
        animatorDragState.subassemblyId = memberHit.subassemblyId ?? "";
        animatorDragState.startX = event.clientX;
        animatorDragState.startY = event.clientY;
        const assemblyWorldCenter =
          animatorAssemblyWorldCenters.get(memberHit.assemblyId) ?? new THREE.Vector3();
        animatorDragState.startMemberAssemblyCenter.copy(
          animatorFrameGroup.worldToLocal(assemblyWorldCenter.clone())
        );
        const subassemblyIndex = getAssemblySubassemblyIndex(
          liveAssembly,
          animatorDragState.subassemblyId
        );
        const subassemblyPosition =
          subassemblyIndex >= 0
            ? normalizeMemberPosition(liveAssembly.subassemblies?.[subassemblyIndex]?.position) ??
              [0, 0, 0]
            : [0, 0, 0];
        animatorDragState.startMemberSubassemblyPosition.set(
          Number(subassemblyPosition[0] ?? 0),
          Number(subassemblyPosition[1] ?? 0),
          Number(subassemblyPosition[2] ?? 0)
        );
        const worldPoint = memberHit.object.getWorldPosition(new THREE.Vector3());
        const planeNormal = animatorCamera.getWorldDirection(new THREE.Vector3()).normalize();
        animatorDragState.plane.setFromNormalAndCoplanarPoint(planeNormal, worldPoint);
        return;
      }
    }
    const subassemblyHits = animatorRaycaster.intersectObjects(getSubassemblyHandleMeshes(), true);
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
        animatorDragState.mode = "subassembly";
        animatorDragState.assemblyId = subassemblyHit.assemblyId;
        animatorDragState.subassemblyId = subassemblyHit.subassemblyId;
        animatorDragState.startX = event.clientX;
        animatorDragState.startY = event.clientY;
        const assemblyWorldCenter =
          animatorAssemblyWorldCenters.get(subassemblyHit.assemblyId) ?? new THREE.Vector3();
        animatorDragState.startSubassemblyAssemblyCenter.copy(
          animatorFrameGroup.worldToLocal(assemblyWorldCenter.clone())
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
        animatorDragState.startSubassemblyPosition.set(
          Number(startPosition[0] ?? 0),
          Number(startPosition[1] ?? 0),
          Number(startPosition[2] ?? 0)
        );
        const worldPoint = subassemblyHit.object.getWorldPosition(new THREE.Vector3());
        const planeNormal = animatorCamera.getWorldDirection(new THREE.Vector3()).normalize();
        animatorDragState.plane.setFromNormalAndCoplanarPoint(planeNormal, worldPoint);
        return;
      }
    }
    if (event.button === 0 && assemblyHits.length) {
      const assemblyHit = resolveAssemblyHit(assemblyHits[0].object);
      if (assemblyHit?.draggable) {
        clearSelectedPoint();
        if (
          startAnimatorAssemblyDrag(
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
      animatorDragState.mode = "frame";
      animatorDragState.startFrameRot.copy(getFrameState().rotation);
    } else {
      animatorDragState.mode = "camera";
    }
    const animatorCameraOrbitState = getCameraOrbitState();
    animatorDragState.button = event.button;
    animatorDragState.startX = event.clientX;
    animatorDragState.startY = event.clientY;
    animatorDragState.startOrbitTheta = animatorCameraOrbitState.theta;
    animatorDragState.startOrbitPhi = animatorCameraOrbitState.phi;
  }

  function onAnimatorContextMenu(event) {
    const animatorCanvas = getCanvas();
    const animatorCamera = getCamera();
    const animatorRaycaster = getRaycaster();
    const animatorPathState = getPathState();
    if (!animatorCanvas || !animatorCamera || !animatorRaycaster) {
      return;
    }
    event.preventDefault();
    const { x, y } = getPointerNdc(event);
    animatorRaycaster.setFromCamera({ x, y }, animatorCamera);
    const shellHits = animatorRaycaster.intersectObjects(getShellMeshes(), true);
    const orbitHits = animatorRaycaster.intersectObjects(getOrbitParticleMeshes(), true);
    const personalityHits = animatorRaycaster.intersectObjects(getPersonalityHandleMeshes(), true);
    const graphicHits = animatorRaycaster.intersectObjects(getGraphicOverlayHandleMeshes(), true);
    const assemblyHits = animatorRaycaster.intersectObjects(getAssemblyMeshes(), true);
    const pointHits = animatorRaycaster.intersectObjects(getPointMeshes(), true);
    const memberHits = animatorRaycaster.intersectObjects(getMemberHandleMeshes(), true);
    const subassemblyHits = animatorRaycaster.intersectObjects(getSubassemblyHandleMeshes(), true);
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
          const targetAssemblyId = animatorPathState.ownerAssemblyId || getSelectedAssemblyIdState();
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

  function onAnimatorTimelineContextMenu(event) {
    if (!getTimelineTrack()) {
      return;
    }
    event.preventDefault();
    closeAssemblyMenu();
    const timelineBand = event.target.closest?.(".animator-timeline-band") ?? null;
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

  function onAnimatorTimelineSummaryContextMenu(event) {
    event.preventDefault();
    closeAssemblyMenu();
    openTimelineSummaryMenuAt(event.clientX, event.clientY);
  }

  function resolveAnimatorHoverAssemblyId(event) {
    const animatorCanvas = getCanvas();
    const animatorCamera = getCamera();
    const animatorRaycaster = getRaycaster();
    if (!animatorCanvas || !animatorCamera || !animatorRaycaster || !event) {
      return "";
    }
    const { x, y } = getPointerNdc(event);
    animatorRaycaster.setFromCamera({ x, y }, animatorCamera);

    const personalityHits = animatorRaycaster.intersectObjects(getPersonalityHandleMeshes(), true);
    if (personalityHits.length) {
      return resolvePersonalityHandleHit(personalityHits[0].object)?.assemblyId ?? "";
    }

    const memberHits = animatorRaycaster.intersectObjects(getMemberHandleMeshes(), true);
    if (memberHits.length) {
      return resolveMemberHandleHit(memberHits[0].object)?.assemblyId ?? "";
    }

    const subassemblyHits = animatorRaycaster.intersectObjects(getSubassemblyHandleMeshes(), true);
    if (subassemblyHits.length) {
      return resolveSubassemblyHandleHit(subassemblyHits[0].object)?.assemblyId ?? "";
    }

    const assemblyHits = animatorRaycaster.intersectObjects(getAssemblyMeshes(), true);
    if (assemblyHits.length) {
      return resolveAssemblyHit(assemblyHits[0].object)?.assemblyId ?? "";
    }
    return "";
  }

  function onAnimatorPointerMove(event) {
    const animatorDragState = getDragState();
    const animatorRaycaster = getRaycaster();
    const animatorCamera = getCamera();
    const animatorFrameGroup = getFrameGroup();
    const animatorPathState = getPathState();
    const animatorAssemblyWorldCenters = getAssemblyWorldCenters();
    if (!animatorDragState || !animatorRaycaster || !animatorCamera || !animatorFrameGroup) {
      return;
    }
    if (!animatorDragState.mode) {
      updateAssemblyHoverTooltip(resolveAnimatorHoverAssemblyId(event), event);
      return;
    }
    hideHoverTooltip();
    clearAssemblyHoverTooltipState();
    const dx = event.clientX - animatorDragState.startX;
    const dy = event.clientY - animatorDragState.startY;
    if (animatorDragState.mode === "point") {
      const index = animatorDragState.pointIndex;
      if (index == null) {
        return;
      }
      const intersection = raycastToDragPlane(event, animatorDragState.plane);
      if (intersection) {
        const localPoint = animatorFrameGroup.worldToLocal(intersection.clone());
        updatePathPointAtState(index, (point) => {
          point.copy(localPoint);
        });
      }
      if (getPointMeshes()[index]) {
        getPointMeshes()[index].position.copy(animatorPathState.points[index]);
      }
      updatePathGeometry();
      renderJsonPreview();
      return;
    }

    if (animatorDragState.mode === "assembly") {
      const assemblyIndex = animatorDragState.assemblyIndex;
      const assemblyDrafts = getAssemblyDraftsState();
      if (assemblyIndex == null || !assemblyDrafts[assemblyIndex]) {
        return;
      }
      const intersection = raycastToDragPlane(event, animatorDragState.plane);
      if (intersection) {
        const liveAssembly = assemblyDrafts[assemblyIndex];
        const localIntersection = animatorFrameGroup
          .worldToLocal(intersection.clone())
          .sub(animatorDragState.startAssemblyGrabOffset);
        if (
          Array.isArray(animatorDragState.startAssemblyPathPoints) &&
          animatorDragState.startAssemblyPathPoints.length
        ) {
          const delta = localIntersection.sub(animatorDragState.startAssemblyCenter);
          const nextPathPoints = animatorDragState.startAssemblyPathPoints.map((point) => [
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
          const localPosition = localIntersection.sub(animatorDragState.startAssemblyParentCenter);
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

    if (animatorDragState.mode === "member") {
      const liveAssembly = getAssemblyDraftById(animatorDragState.assemblyId);
      if (!liveAssembly || !animatorDragState.memberId) {
        return;
      }
      const intersection = raycastToDragPlane(event, animatorDragState.plane);
      if (intersection) {
        const localPoint = animatorFrameGroup.worldToLocal(intersection.clone());
        const relativeToAssembly = localPoint.sub(animatorDragState.startMemberAssemblyCenter);
        const nextLocalPosition = animatorDragState.subassemblyId
          ? relativeToAssembly.sub(animatorDragState.startMemberSubassemblyPosition)
          : relativeToAssembly;
        if (
          setAssemblyMemberPosition(
            liveAssembly,
            animatorDragState.memberId,
            [nextLocalPosition.x, nextLocalPosition.y, nextLocalPosition.z],
            animatorDragState.subassemblyId
          )
        ) {
          renderJsonPreview();
        }
      }
      return;
    }

    if (animatorDragState.mode === "graphic") {
      const overlay = getGraphicOverlayDraftById(animatorDragState.overlayId);
      if (!overlay) {
        return;
      }
      const intersection = raycastToDragPlane(event, animatorDragState.plane);
      if (intersection) {
        const localPoint = animatorFrameGroup.worldToLocal(intersection.clone());
        const nextOffset = localPoint.sub(animatorDragState.startGraphicAnchor);
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

    if (animatorDragState.mode === "subassembly") {
      const liveAssembly = getAssemblyDraftById(animatorDragState.assemblyId);
      if (!liveAssembly || !animatorDragState.subassemblyId) {
        return;
      }
      const intersection = raycastToDragPlane(event, animatorDragState.plane);
      if (intersection) {
        const localPoint = animatorFrameGroup.worldToLocal(intersection.clone());
        const nextPosition = localPoint.sub(animatorDragState.startSubassemblyAssemblyCenter);
        if (
          setSubassemblyPosition(liveAssembly, animatorDragState.subassemblyId, [
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

    if (animatorDragState.mode === "camera_waypoint") {
      const animatorCameraFlightState = getCameraFlightState();
      const waypointIndex = animatorDragState.cameraWaypointIndex;
      if (waypointIndex == null || !animatorCameraFlightState.waypoints[waypointIndex]) {
        return;
      }
      const intersection = raycastToDragPlane(event, animatorDragState.plane);
      if (intersection) {
        const localPoint = animatorFrameGroup.worldToLocal(intersection.clone());
        animatorCameraFlightState.waypoints[waypointIndex].position.copy(localPoint);
        updateCameraFlightDisplay();
        renderJsonPreview();
      }
      return;
    }

    if (animatorDragState.mode === "camera") {
      const animatorCameraState = getCameraState();
      const animatorCameraOrbitState = getCameraOrbitState();
      const speed = animatorCameraState.speed * 0.004;
      animatorCameraOrbitState.theta = animatorDragState.startOrbitTheta - dx * speed;
      animatorCameraOrbitState.phi = clampFn(
        animatorDragState.startOrbitPhi - dy * speed,
        0.05,
        Math.PI - 0.05
      );
      updateCamera();
    }

    if (animatorDragState.mode === "frame") {
      const animatorFrameState = getFrameState();
      animatorFrameState.rotation.y = animatorDragState.startFrameRot.y - dx * 0.005;
      animatorFrameState.rotation.x = animatorDragState.startFrameRot.x - dy * 0.005;
      updateFrame();
    }
  }

  function onAnimatorPointerUp(event) {
    const animatorDragState = getDragState();
    const animatorCanvas = getCanvas();
    if (!animatorDragState) {
      return;
    }
    hideHoverTooltip();
    clearAssemblyHoverTooltipState();
    if (animatorDragState.mode === "point" && animatorDragState.pointIndex != null) {
      updatePointMaterials();
    }
    if (animatorDragState.mode === "camera_waypoint") {
      updateCameraWaypointMaterials(getSelectedCameraWaypointIndex());
    }
    animatorDragState.mode = null;
    animatorDragState.pointIndex = null;
    animatorDragState.cameraWaypointIndex = null;
    animatorDragState.assemblyIndex = null;
    animatorDragState.assemblyId = null;
    animatorDragState.memberId = null;
    animatorDragState.overlayId = null;
    animatorDragState.subassemblyId = null;
    if (animatorCanvas && animatorCanvas.hasPointerCapture(event.pointerId)) {
      animatorCanvas.releasePointerCapture(event.pointerId);
    }
    animatorDragState.button = 0;
  }

  function onAnimatorWheel(event) {
    const animatorCamera = getCamera();
    if (!animatorCamera) {
      return;
    }
    const animatorCameraState = getCameraState();
    const animatorCameraOrbitState = getCameraOrbitState();
    event.preventDefault();
    const speed = animatorCameraState.speed * 0.0015;
    animatorCameraOrbitState.theta -= event.deltaX * speed;
    animatorCameraOrbitState.phi = clampFn(
      animatorCameraOrbitState.phi - event.deltaY * speed,
      0.05,
      Math.PI - 0.05
    );
    updateCamera();
  }

  return {
    onAnimatorPointerDown,
    onAnimatorContextMenu,
    onAnimatorTimelineContextMenu,
    onAnimatorTimelineSummaryContextMenu,
    onAnimatorPointerMove,
    onAnimatorPointerUp,
    onAnimatorWheel,
  };
}
