# Composer / Reaction Independence

## Direction

Composer and Reaction should be separate app runtimes in one repo.

Allowed sharing:
- repo/build/deploy tooling
- versioned schemas and fixtures
- truly generic infrastructure with no app semantics

Not allowed:
- live cross-app runtime logic
- app-specific stores or overlay state
- direct runtime imports across the app boundary
- any cross-app coupling except explicit JSON contracts

Boundary:
- main webapp = launcher/discovery surface
- Composer = standalone app runtime
- Reaction = standalone app runtime
- cross-app exchange = versioned JSON only

## Current Status

Done:
- `composer.html` and `reaction.html` exist as separate entrypoints;
- the main webapp launches those entrypoints from the scene network;
- `reaction_designer` no longer runs as a Composer overlay mode;
- boundary schemas, fixtures, and a boundary-check script are in place;
- Reaction now owns its standalone app shell, template catalog, export seam, and much of its solver composition under `src/apps/reaction/`;
- Reaction solve-state, solve-layout, solve-projection, and solve-proposal now live under Reaction-owned module names, with legacy runtime paths reduced to compatibility exports where needed;
- Composer now owns standalone app-mode policy, app composition, editor-store facade layers, page-shell DOM lookup, default draft/id scaffolding, assembly-list normalization helpers, pure authoring helpers, assembly authoring logic, timing/overlay integration helpers, and draft/library/preview workspace logic under `src/apps/composer/`.

Left:
- Reaction still has legacy `ComposerReaction...` naming and compatibility layers that should be retired;
- Composer still depends too much on `app.js` as a shared composition root;
- the Reaction export -> Composer import workflow is still provisional rather than production-hardened;
- and some transitional compatibility code remains in place on both sides.

## Disposition Map

### Composer: remaining `app.js` routines

1. Draft/state/selection helpers.
Disposition: move into a Composer draft-state runtime and collapse direct store wrappers into the existing store facade.

Routines:
- `normalizeComposerPathPoint`
- `normalizeComposerAssemblyPathPoints`
- `normalizeComposerAssemblyDraft`
- `ensureComposerAssemblyDrafts`
- `getComposerSelectedAssembly`
- `getComposerAssemblyDraftsState`
- `getComposerGraphicOverlayDraftsState`
- `getComposerSelectedPointIndexState`
- `getComposerSelectedAssemblyIdState`
- `getComposerPendingTransferSourceState`
- `getComposerTransferListRawStateValue`
- `setComposerAssemblyDraftsState`
- `appendComposerAssemblyDraftState`
- `removeComposerAssemblyDraftByIdState`
- `updateComposerAssemblyDraftByIdState`
- `setComposerGraphicOverlayDraftsState`
- `upsertComposerGraphicOverlayDraftState`
- `removeComposerGraphicOverlayDraftByIdState`
- `updateComposerGraphicOverlayDraftByIdState`
- `setComposerSelectedPointIndexState`
- `setComposerSelectedAssemblyIdState`
- `setComposerPendingTransferSourceState`
- `clearComposerPendingTransferSourceState`
- `setComposerTransferListRawStateValue`
- `updateComposerPathPointAtState`
- `mutateComposerPathStateState`
- `persistComposerPathStateToAssembly`
- `validateComposerSelectedAssemblyId`
- `setComposerSelectedAssembly`
- `loadComposerPathStateFromSelectedAssembly`
- `persistComposerPathStateToSelectedAssembly`

2. Transfer/path authoring helpers.
Disposition: move into a Composer authoring-state runtime.

Routines:
- `appendComposerAuthoringLine`
- `replaceComposerAuthoringLineById`
- `setComposerSceneDurationValue`
- `setComposerSceneLoopValue`
- `appendComposerTransferLine`
- `getComposerParsedTransferEntries`
- `getComposerAssemblyMemberIds`
- `promptComposerAssemblyMemberId`
- `clearComposerPendingTransfer`
- `startComposerTransferFromAssembly`
- `completeComposerTransferToAssembly`

3. View-mode/display-flag helpers.
Disposition: move into a Composer viewport-display runtime.

Routines:
- `updateComposerHudViewportToggleState`
- `isComposerViewportDisplayFlagEnabled`
- `setComposerViewportDisplayFlag`
- `toggleComposerViewportDisplayFlag`
- `normalizeComposerTimelineAddType`
- `getComposerTimelineEditKindTitle`

4. Assembly identity/label helpers.
Disposition: move into a Composer assembly-label runtime or merge into the existing assembly/runtime helpers.

Routines:
- `isComposerBareArchitrinoAssembly`
- `normalizeComposerAssemblySceneRole`
- `getComposerAssemblySceneRoleLabel`
- `getComposerAssemblySceneRoleGlyph`
- `getComposerAssemblySceneRoleColor`
- `getComposerAssemblyViewportLabel`
- `getComposerAssemblyLetter`
- `getComposerPrimaryPathAssemblyLetter`
- `getComposerSelectedAssemblyLetter`
- `getComposerTransferListRaw`
- `setComposerTransferListRaw`

5. Orbit/member/anchor math helpers.
Disposition: move into a Composer structure-geometry runtime.

Routines:
- `resolveComposerGraphicTargetContactPosition`
- `getComposerMemberColor`
- `getComposerProxyMemberOffset`
- `setComposerMemberAnchor`
- `getComposerOrbitOffsetAtTime`
- `resolveComposerMemberAnchorPosition`
- `resolveComposerTransferEndpointPosition`
- `findComposerCoreMemberId`
- `getComposerPersonalityMembers`
- `getComposerPersonalityRingRadius`
- `getComposerObserverPlaneBasisInFrame`
- `getComposerPersonalitySlotLocalOffset`

6. Texture/sprite/render-asset builders.
Disposition: move into a Composer render-assets runtime.

Routines:
- `createComposerLozengeTexture`
- `createComposerPointLabelTexture`
- `createComposerMemberLabelTexture`
- `wrapComposerOverlayText`
- `createComposerGraphicOverlayTextTexture`
- `createComposerGraphicOverlayTextSprite`
- `updateComposerGraphicOverlayTextSprite`
- `updateComposerPointLabelSprite`
- `createComposerPointLabelSprite`
- `createComposerCameraWaypointLabelTexture`
- `updateComposerCameraWaypointLabelSprite`
- `createComposerCameraWaypointLabelSprite`
- `createComposerMemberLabelSprite`
- `createComposerAssemblyBadgeTexture`
- `createComposerAssemblyBadgeSprite`
- `createComposerChildBadgeSprite`
- `setComposerTransportButtonIcon`
- `createComposerMarkerHitProxy`
- `disposeComposerMarkerHandle`
- `resolveComposerIndexedHit`

7. Camera/path authoring runtime.
Disposition: move into a Composer camera-path runtime.

Routines:
- `getComposerEffectiveFrameScale`
- `formatComposerTimeLabel`
- `formatComposerTimeInputValue`
- `getComposerNumericInputPrecision`
- `formatComposerNumericInputValue`
- `setComposerFrameDefaults`
- `setComposerCameraDefaults`
- `updateComposerWaypointCount`
- `updateComposerCameraWaypointMaterials`
- `updateComposerCameraPoiStatus`
- `getComposerOrbitTargetWorld`
- `updateComposerOrbitFromPosition`
- `syncComposerCameraRadiusInput`
- `applyComposerCameraRadiusInput`
- `getComposerPoiLocal`
- `addComposerCameraWaypoint`
- `clearComposerCameraWaypoints`
- `resetComposerPathPoints`
- `addComposerPathPoint`
- `updateComposerPointMaterials`
- `updateComposerPathMarkerScales`

8. Assembly editor/inspector runtime.
Disposition: move into a Composer assembly-inspector runtime.

Routines:
- `renderComposerAssemblyEditor`
- `getComposerAssemblyDraftIndexById`
- `getComposerAssemblyDraftById`
- `getComposerAssemblyCanonicalBridgeSummary`
- `createComposerAssemblyStructureTooltipContent`
- `updateComposerAssemblyHoverTooltip`
- `getComposerAssemblyWorldCenterById`
- `shiftComposerPointTriplets`
- `rebaseComposerAssemblyParentFrame`
- `getComposerCanvasLocalPointFromEvent`

9. Canvas/menu runtime.
Disposition: move into the existing canvas-menu runtime or a new Composer canvas-menu-shell runtime.

Routines:
- `closeComposerAssemblyMenu`
- `resetComposerAssemblyMenu`
- `getComposerPathOwnerAssemblyId`
- `clearComposerBackgroundPathLines`
- `rebuildComposerPathDisplayFromDocument`
- `applyComposerViewportDisplayState`
- `positionComposerAssemblyMenu`
- `getComposerMenuAnchorClientPosition`
- `appendComposerMenuRangeControl`
- `appendComposerMenuSectionHeader`
- `appendComposerMenuButtonRow`
- `appendComposerMenuField`
- `appendComposerMenuSelectField`
- `appendComposerMenuBlock`
- `appendComposerMenuNote`
- `openComposerMemberMenuAt`
- `openComposerPersonalitySlotMenuAt`
- `openComposerSubassemblyMenuAt`
- `openComposerAssemblyTemplateMenuAt`
- `openComposerAssemblyPropertiesMenuAt`
- `getNextComposerAssemblyId`
- `createBuiltInComposerAssemblyDraft`
- `addBuiltInComposerAssembly`

10. Canvas bootstrap/runtime.
Disposition: move into a Composer canvas-bootstrap runtime.

Routines:
- `setComposerStatus`
- `initComposerCanvas`
- `resizeComposerCanvas`
- `updateComposerFrame`
- `applyComposerFrameScaleInput`
- `updateComposerCamera`
- `applyComposerCameraSpeedInput`
- `rebuildComposerControlPoints`
- `sampleComposerPath`
- `updateComposerPathGeometry`
- `clearComposerViewportVisuals`

11. Document/viewport render pipeline.
Disposition: split into Composer viewport-render runtime and Composer playback/timeline runtime.

Routines:
- `computeComposerAssemblyBasePosition`
- `sampleComposerPointAt`
- `sampleComposerCurvePoints`
- `sampleComposerCameraWaypointState`
- `getComposerCameraWaypointDisplayPosition`
- `getComposerDocumentCameraStateAtTime`
- `getComposerPreviewCameraStateAtTime`
- `getComposerViewportAutoscaleTargetSpheres`
- `getComposerAutoscaledCameraState`
- `getComposerOrbitBasis`
- `getComposerPlaybackRateAtTime`
- `getComposerMotionRateAtTime`
- `getComposerIntegratedMotionTime`
- `getComposerTotalMotionDuration`
- `getComposerMotionProgress`
- `getComposerPlaybackTimeForMotionTime`
- `getComposerPlaybackTimeForMotionProgress`
- `clearComposerTimelineLayer`
- `createComposerTimelineBand`
- `createComposerTimelineMarker`
- `openComposerTimelineSummaryMenuAt`
- `applyComposerSceneIdentityDraft`
- `openComposerSceneMenuAt`
- `openComposerJsonPreviewMenuAt`
- `openComposerLibraryMenuAt`
- `getComposerTimelineTimeAtClientX`
- `openComposerTimelineMenuAt`
- `removeComposerPathPoint`
- `openComposerPathPointMenuAt`
- `describeComposerTimelineState`
- `getComposerSortedMarkers`
- `syncComposerMarkerNavigation`
- `renderComposerTimeline`
- `updateComposerTimelinePlayhead`
- `clearComposerEditorPreviewState`
- `updateComposerViewportModeButtons`
- `setComposerViewportCameraSource`
- `setComposerPlaybackPlayhead`
- `startComposerPlayback`
- `toggleComposerPlayback`
- `restartComposerPlayback`
- `jumpToComposerMarker`
- `jumpComposerMarkerByOffset`
- `scrubComposerPlayback`
- `updateComposerPlaybackState`
- `updateComposerAnimatedViewport`

12. Viewport visuals/media/document-camera runtime.
Disposition: move into a Composer viewport-visuals runtime.

Routines:
- `addComposerOrbitTrace`
- `addComposerAxisGuide`
- `addComposerShell`
- `addComposerEnvelope`
- `addComposerHistoryTrace`
- `addComposerOrbitParticle`
- `addComposerTransferLine`
- `addComposerGraphicOverlayVisual`
- `updateComposerGraphicOverlayVisuals`
- `setComposerViewportMediaOverlayFrame`
- `clearComposerViewportMediaOverlays`
- `createComposerViewportMediaOverlayElement`
- `syncComposerViewportMediaOverlays`
- `updateComposerViewportMediaOverlays`
- `addComposerAssemblyProxy`
- `addComposerDocumentCameraVisuals`
- `updateComposerViewportFromDocument`
- `updateComposerCameraFlightDisplay`
- `startComposerCameraFlightPreview`
- `stopComposerCameraFlightPreview`
- `renderComposerCanvas`

13. Pointer/input runtime.
Disposition: move into a Composer pointer-interaction runtime.

Routines:
- `getComposerPointerNdc`
- `resolveComposerAssemblyHit`
- `resolveComposerMemberHandleHit`
- `resolveComposerSubassemblyHandleHit`
- `resolveComposerGraphicOverlayHit`
- `resolveComposerPersonalityHandleHit`
- `resolveComposerAssemblyIdHit`
- `findComposerShellSurfaceHit`
- `findComposerCenterMarkerIntersection`
- `shouldPreferComposerCenterMarker`
- `startComposerAssemblyDrag`
- `onComposerPointerDown`
- `onComposerContextMenu`
- `onComposerTimelineContextMenu`
- `onComposerTimelineSummaryContextMenu`
- `onComposerTimelineClick`
- `resolveComposerHoverAssemblyId`
- `onComposerPointerMove`
- `onComposerPointerUp`
- `onComposerWheel`

14. Path-point info pill runtime.
Disposition: move into a Composer viewport-overlay-pill runtime.

Routines:
- `formatComposerCoordinatePillValue`
- `syncComposerPathPointInfoPillCoordinateInputs`
- `commitComposerPathPointCoordinateInput`
- `clearComposerSelectedPoint`
- `ensureComposerPathPointInfoPill`
- `hideComposerPathPointInfoPill`
- `projectComposerLocalPointToViewport`
- `getComposerPathPointNormalizedTime`
- `updateComposerPathPointInfoPill`

15. Thin Composer scene glue.
Disposition: keep thin until the end, then either keep as launch/config glue or move into a Composer shell runtime.

Routines:
- `isComposerOverlaySceneId`
- `shouldHideLevelForComposerOverlayScene`

### Reaction: remaining legacy surface

1. Rename remaining wrapper-backed Reaction helpers and delete compatibility layers once callers move.

Current wrapper-backed app files:
- `ReactionAnchorRenderRuntime.js`
- `ReactionBinaryGlyphRuntime.js`
- `ReactionAnchorStateRuntime.js`
- `ReactionBinaryInventoryRuntime.js`
- `ReactionBinarySelectionRuntime.js`
- `ReactionParticipantRenderRuntime.js`
- `ReactionParticipantMutationRuntime.js`
- `ReactionMappingRulesRuntime.js`
- `ReactionAddPickerRuntime.js`
- `ReactionSolverUiRuntime.js`

Disposition:
- move implementation into the Reaction-named file when clearly app-owned;
- leave the old `ComposerReaction...` file as a temporary compatibility re-export only;
- then delete the old path after all callers migrate.

2. Rename remaining Reaction-domain solver/support files still living only under legacy names.

Legacy files still to disposition:
- `ComposerReactionSolveAssociateRuntime.js`
- `ComposerReactionSolveMatchRuntime.js`
- `ComposerReactionSolveSelectionRuntime.js`
- `ComposerReactionSolverLayoutRuntime.js`
- `ComposerReactionCompositeModeRuntime.js`
- `ComposerReactionStructureBridgeRuntime.js`
- `ComposerReactionStructureDescriptorRuntime.js`
- `ComposerReactionStructureSelectionRuntime.js`
- `ComposerReactionStructureHierarchyRuntime.js`
- `ComposerReactionStructureMappingRuntime.js`
- `ComposerReactionRulesRuntime.js`

Disposition:
- if truly Reaction-specific, move to `src/apps/reaction/` or a neutral Reaction domain/runtime area;
- if truly generic, promote to a neutral non-Composer/non-Reaction module;
- delete duplicate or obsolete legacy variants once one canonical implementation remains.

### Contract work

Disposition:
- keep `reaction-flow/v1` as the only intended bridge;
- refresh the schema against current solver output;
- build a real Composer import adapter that consumes the document without importing Reaction runtime code;
- add golden import/export tests before deleting the transitional contract scaffolding.

## Automation Assessment

Yes, this can be automated in part, but not fully and not safely as a blind codemod.

Worth automating now:
1. inventory generation.
Disposition: add a repo script that lists every Composer/Reaction routine still living in `app.js` or legacy `ComposerReaction...` files, grouped by cluster and line range.

2. dependency mapping.
Disposition: add a script that records which globals/functions each Composer routine references so extractions stop failing on missing names like `updateCameraFlightDisplay`.

3. extraction scaffolding.
Disposition: add a codemod/helper script that can generate a target runtime file, build the import/export skeleton, and replace the old block with a destructured runtime binding.

4. compatibility-export generation.
Disposition: generate temporary re-export files automatically when a legacy `ComposerReaction...` file is moved to a canonical Reaction path.

5. audit enforcement.
Disposition: add checks that fail when:
- a moved routine still exists in both old and new homes with divergent logic;
- a Reaction app file imports a Composer-named runtime directly;
- a Composer app file imports a Reaction runtime directly;
- or `app.js` grows its Composer function count instead of shrinking it.

Not safe to automate blindly:
- stateful render and pointer-interaction extractions;
- anything that mixes Composer globals with main-webapp globals;
- renames where there are same-name main-app functions such as `updateCamera`;
- final deletion of compatibility shims before all callers are proven migrated.

Practical recommendation:
1. automate inventory and dependency reports first;
2. automate wrapper/re-export generation second;
3. keep the actual runtime extraction itself supervised, one cluster at a time;
4. use the generated report to make each remaining turn larger and less error-prone.

## Enforcement

Keep:
- forbidden cross-import checks;
- contract fixture validation;
- Reaction export tests;
- Composer import tests;
- and smoke tests proving each app boots independently.

## Audit

- review that reaction doesn't mention composer in file names or code where it doesn't make sense and vice versa
- review modularity
- review wrappers
- review scaffolding
- look for dead code
- look for spaghetti code due to how we got here

## Post-Independence Disposition

1. add an `Exit` button to the standalone Reaction app, matching Composer;
2. fix product-side `Neutron` and `Proton` title tiles on the Reaction page so they include the `Pro` prefix consistently.
3. flatten the Composer canvas framing so the canvas uses the full available area and does not pick up redundant nested frames around the timeline/canvas surface.

## Non-Goal

This does not require two repos. One repo is fine. The goal is independent app runtimes with a versioned contract boundary.

## Related Action Items

- [composer](./composer.md)
- [reaction](./reaction.md)
- [composer-reaction](./composer-reaction.md)
- [pdg-solver](./pdg-solver.md)
- [swe](./swe.md)
