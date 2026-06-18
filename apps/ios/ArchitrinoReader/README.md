# Architrino (v1 Textbook-Only Scaffold)

Path: `apps/ios/ArchitrinoReader/`

Status:
- SwiftUI source scaffold: present
- Xcode project file: present and build-validated in-repo at `ArchitrinoReader.xcodeproj/project.pbxproj`
- Bundle identifier: `com.architrino.reader` (set in `.xcodeproj` scaffold).
- App display/product name: `Architrino`
- Textbook-only packaging: implemented via `scripts/export-ios-textbook-package.mjs`

The goal is to keep v1 focused on chapter-bundled offline textbook reading.

## Ticket Mapping

1. `ios_project_scaffold`
   - Source scaffold files and `.xcodeproj` are in place under `ArchitrinoReader.xcodeproj/`.
   - Default scheme: `ArchitrinoReader`; generated app product: `Architrino.app`.
   - Local no-signing validation command:
     `xcodebuild -project apps/ios/ArchitrinoReader/ArchitrinoReader.xcodeproj -scheme ArchitrinoReader -configuration Debug -destination generic/platform=iOS -derivedDataPath /tmp/architrino-reader-derived-data CODE_SIGNING_ALLOWED=NO build`
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

## Release Prep: Unlisted App Store

Target public distribution is Unlisted App Store distribution. The app still goes through App Store Connect, code signing, TestFlight, and App Review; after approval, Apple provides a direct App Store link that can be published from `architrino.com` and the GitHub repository.

Before the first App Store submission:

1. Confirm the app record uses bundle identifier `com.architrino.reader`.
2. Choose the final app icon and add the required AppIcon assets.
3. Refresh the bundled textbook package with `node scripts/export-ios-textbook-package.mjs --write --strict`.
4. Validate the package with `node scripts/export-ios-textbook-package.mjs --check --strict`.
5. Verify the About screen reports the expected package version and package date.
6. Capture iPhone screenshots for App Store Connect.
7. Set App Store privacy metadata to local-only/no data collection unless new networked features are added.
8. Add an App Review note that this app is intended for unlisted distribution.
9. Upload a signed Release archive, test the TestFlight build on a physical iPhone, then submit for App Review.
10. After the app is approved or ready for final distribution, submit Apple's unlisted app request.
