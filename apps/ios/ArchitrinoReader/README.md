# Architrino (v1 Textbook-Only Scaffold)

Path: `apps/ios/ArchitrinoReader/`

Status:
- SwiftUI source scaffold: present
- Xcode project file: present and build-validated in-repo at `ArchitrinoReader.xcodeproj/project.pbxproj`
- Bundle identifier: `com.architrino.reader` (set in `.xcodeproj` scaffold).
- App display/product name: `Architrino`
- Textbook-only packaging: implemented via `scripts/export-ios-textbook-package.mjs`
- Device family: iPhone and iPad
- iPadOS release posture: first-release quality target with split-view TOC/sidebar reading layout
- Packaging cadence: on demand for requested iOS development or device testing, not every PR
- Release posture: deferred until theory closure and an explicit operator release decision; eventual target remains Unlisted App Store distribution

The goal is to keep v1 focused on chapter-bundled offline textbook reading on iPhone and iPad.

## On-Demand Textbook Packaging

Keep the reader software, exporter, schema, and packaging procedure maintained without continually producing a new app content package. The saved `GeneratedTextbookPackage/` is a development snapshot that may lag the current corpus. Routine PR checks and full web-content regeneration do not require its freshness. Changes to shared reader or exporter software still require their focused tests; package generation and strict freshness checks belong to explicitly requested iOS package/build work.

When a current-content package is requested, first ensure the canonical web inputs pass their owning checks, refreshing those inputs only within the authorized regeneration scope. Then generate and verify the iOS package:

```bash
node scripts/build-scene-graph.mjs --check --strict
node scripts/build-textbook-md-pdf.mjs --check
node scripts/export-ios-textbook-package.mjs --write --strict
node scripts/export-ios-textbook-package.mjs --check --strict
node --test tests/ios-textbook-link-routing.test.js
```

Plainly: package only when an iOS session needs current textbook content, and verify that package before using it. Xcode copies the selected package into the app; it does not regenerate the textbook itself. A saved prototype can still be used for explicitly scoped testing of that older content.

## Release Boundary

App Store release work is deferred until theory closure and an explicit operator decision to resume it. The release-preparation instructions below preserve the process; they are not an active submission request. Informal device testing is not full release acceptance. The dated operator report and deferred release tasks are retained in the [iOS work log](../../../reference/priorities/dormant-deferred/app-ios/work-log.md) and [work queue](../../../reference/priorities/dormant-deferred/app-ios/work-queue.md).

## Ticket Mapping

1. `ios_project_scaffold`
   - Source scaffold files and `.xcodeproj` are in place under `ArchitrinoReader.xcodeproj/`.
   - Default scheme: `ArchitrinoReader`; generated app product: `Architrino.app`.
   - Local no-signing validation command: `xcodebuild -project apps/ios/ArchitrinoReader/ArchitrinoReader.xcodeproj -scheme ArchitrinoReader -configuration Debug -destination generic/platform=iOS -derivedDataPath "${TMPDIR:-/tmp}/architrino-reader-derived-data" CODE_SIGNING_ALLOWED=NO build`
2. `content_bundle_schema_v1`
   - Manifest schema: `textbook_bundle_schema_v1.json`
3. `content_export_script`
   - Export script: `scripts/export-ios-textbook-package.mjs`
   - Current behavior:
     - emits chapter bundles + assets by TOC path
     - emits deterministic search index in `textbook_bundle_search_index.json`
     - reports repeated heading titles as non-fatal diagnostics after deterministic suffix anchors are assigned

## Manual Run

1. Open the SwiftUI iOS project at `apps/ios/ArchitrinoReader/ArchitrinoReader.xcodeproj`.
2. Select the `ArchitrinoReader` scheme.
3. Select an available iOS simulator or connected device.
4. Build and run.

## Deferred Release Prep: Unlisted App Store

Target public distribution is Unlisted App Store distribution. The app still goes through App Store Connect, code signing, TestFlight, and App Review; after approval, Apple provides a direct App Store link that can be published from `architrino.com` and the GitHub repository.

Repo-side release prep:

1. Confirmed bundle identifier: `com.architrino.reader`.
2. Final AppIcon asset slots are present for iPhone, iPad, iPad Pro, and the 1024x1024 marketing icon.
3. Once release work is resumed, refresh the bundled textbook package using the on-demand procedure before each release archive.
4. Validate the package with `node scripts/export-ios-textbook-package.mjs --check --strict`.
5. Verify the About screen reports the expected package version and package date.
6. Verify the About screen Feedback row opens a prefilled GitHub issue and visibly states that GitHub login is required.
7. Verify the reader Feedback toolbar icon blanks the header/footer, accepts orange handwriting directly on the page, and shares the marked screenshot with package/location context.

App Store Connect release prep:

1. Capture iPhone and iPad screenshots, including at least one iPad split-view reader/TOC screenshot.
2. Set App Store privacy metadata to no data collection unless new networked features are added.
3. Add an App Review note that this app is intended for unlisted distribution.
4. Upload a signed Release archive.
5. Test the TestFlight build on physical iPhone and iPad hardware.
6. Submit for App Review.
7. After the app is approved or ready for final distribution, submit Apple's unlisted app request.

Privacy metadata draft:

- Data collection: none.
- Tracking: none.
- Accounts: none.
- Local-only app state: theme, font size, margin width, bookmarks, and reading position.
- Network access in v1: explicit browser handoff for external links and web-app scene links; no analytics, accounts, cloud sync, or remote textbook updates.

App Review note draft:

Architrino is an offline textbook reader for the bundled Architrino Assembly Architecture textbook package. The app is intended for Unlisted App Store distribution. It stores reading preferences, bookmarks, and reading position locally on the device and does not collect user data.
