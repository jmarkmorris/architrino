# Architrino Reader (v1 Textbook-Only Scaffold)

Path: `apps/ios/ArchitrinoReader/`

Status:
- SwiftUI source scaffold: present
- Xcode project file: present and build-validated in-repo at `ArchitrinoReader.xcodeproj/project.pbxproj`
- Bundle identifier: `com.architrino.reader` (set in `.xcodeproj` scaffold).
- Textbook-only packaging: implemented via `scripts/export-ios-textbook-package.mjs`

The goal is to keep v1 focused on chapter-bundled offline textbook reading.

## Ticket Mapping

1. `ios_project_scaffold`
   - Source scaffold files and `.xcodeproj` are in place under `ArchitrinoReader.xcodeproj/`.
   - Default scheme: `ArchitrinoReader`.
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
