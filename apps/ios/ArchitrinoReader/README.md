# Architrino Reader (v1 Textbook-Only Scaffold)

Path: `apps/ios/ArchitrinoReader/`

Status:
- SwiftUI source scaffold: present
- Xcode project file: scaffolded in-repo at `ArchitrinoReader.xcodeproj/project.pbxproj`
- Bundle identifier: `com.architrino.reader` (set in `.xcodeproj` scaffold).
- Textbook-only packaging: implemented via `scripts/export-ios-textbook-package.mjs`

The goal is to keep v1 focused on chapter-bundled offline textbook reading.

## Ticket Mapping

1. `ios_project_scaffold`
   - Source scaffold files and `.xcodeproj` are in place under `ArchitrinoReader.xcodeproj/`.
   - Next step is running/refreshing targets on a full Xcode instance and validating the default scheme at `apps/ios/ArchitrinoReader/ArchitrinoReader.xcodeproj`.
2. `content_bundle_schema_v1`
   - Manifest schema: `textbook_bundle_schema_v1.json`
3. `content_export_script`
   - Export script: `scripts/export-ios-textbook-package.mjs`
   - Current behavior:
     - emits chapter bundles + assets by TOC path
     - emits deterministic search index in `textbook_bundle_search_index.json`
     - reports duplicate heading title collisions as summary warnings only

## Manual Bootstrap (outside this environment)

1. Open the SwiftUI iOS project at `apps/ios/ArchitrinoReader/ArchitrinoReader.xcodeproj`.
2. Add the `ArchitrinoReader/` Swift sources above as the app target.
3. Configure deployment targets to iOS 18.0 / iPadOS 18.0.
4. Add `GeneratedTextbookPackage/` as an app resource bundle directory.
