import Foundation

struct TextbookBundleManifest: Decodable {
    let schemaVersion: Int
    let manifestSchema: String
    let generatedAt: String
    let packageVersion: String
    let textbookToc: TextbookBundleTOC
    let chapters: [TextbookChapter]
    let references: [TextbookReferenceDocument]
    let files: [TextbookBundleFile]
}

struct TextbookBundleTOC: Decodable {
    let path: String
    let sha256: String
    let size: Int
}

struct TextbookChapter: Decodable, Identifiable, Equatable, Hashable {
    let id: String
    let title: String
    let markdownPath: String
    let bundlePath: String
    let htmlPath: String?
    let heading: String?
    let sectionCount: Int
    let sectionKeys: [String]

    var readableTitle: String { title }
}

struct TextbookBundleFile: Decodable {
    let path: String
    let sourcePath: String
    let role: String
    let type: String
    let size: Int
    let sha256: String
}

struct TextbookReferenceDocument: Decodable, Identifiable, Equatable, Hashable {
    let id: String
    let title: String
    let sourcePath: String
    let bundlePath: String
    let htmlPath: String?
}

struct TextbookLinkMetadata: Decodable, Equatable, Hashable {
    let sourceChapterId: String
    let sourcePath: String
    let target: String
    let kind: String
    let status: String
    let targetBundlePath: String?
}

struct TextbookSearchIndex: Decodable {
    let schemaVersion: Int
    let totalEntries: Int
    let entries: [TextbookSearchEntry]
}

struct TextbookSearchEntry: Decodable, Identifiable, Equatable {
    let chapterId: String
    let chapterTitle: String
    let chapterPath: String?
    let chapterSourcePath: String?
    let sectionAnchor: String
    let sectionTitle: String
    let headingLevel: Int
    let text: String
    let snippet: String
    let snippetMarkdown: String?
    let sectionKey: String?
    let sourcePath: String?

    var id: String { "\(chapterId)::\(sectionAnchor)" }
    var documentKey: String { sourcePath ?? chapterSourcePath ?? chapterPath ?? chapterId }

    var renderedPreviewMarkdown: String {
        let preview = (snippetMarkdown?.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty == false)
            ? snippetMarkdown!
            : snippet
        let trimmedTitle = sectionTitle.trimmingCharacters(in: .whitespacesAndNewlines)
        let trimmedPreview = preview.trimmingCharacters(in: .whitespacesAndNewlines)
        if trimmedTitle.isEmpty {
            return trimmedPreview
        }
        if trimmedPreview.isEmpty {
            return trimmedTitle
        }
        return "\(trimmedTitle)\n\n\(trimmedPreview)"
    }
}

struct ReaderPosition: Codable {
    let chapterId: String
    let anchor: String?
    let isExplicit: Bool?
    let scrollProgress: Double?
}

enum ReaderTheme: String, Codable, CaseIterable, Identifiable, Hashable {
    case architrinoPurple
    case light
    case warm
    case dark

    var id: String { rawValue }
}

enum ReaderLineSpacing: String, Codable, CaseIterable, Identifiable, Hashable {
    case compact
    case standard
    case open

    var id: String { rawValue }
}

enum ReaderMarginWidth: String, Codable, CaseIterable, Identifiable, Hashable {
    case narrow
    case standard
    case wide

    var id: String { rawValue }
}

struct ReaderBookmark: Codable, Identifiable, Equatable {
    let id: UUID
    let chapterId: String
    let chapterTitle: String
    let anchor: String?
    let createdAt: Date

    init(id: UUID = UUID(), chapterId: String, chapterTitle: String, anchor: String?, createdAt: Date = Date()) {
        self.id = id
        self.chapterId = chapterId
        self.chapterTitle = chapterTitle
        self.anchor = anchor
        self.createdAt = createdAt
    }

    var displayLabel: String {
        let suffix = anchor.flatMap { " (#\($0))" } ?? ""
        return "\(chapterTitle)\(suffix)"
    }
}

struct TextbookTOCSection: Decodable, Equatable {
    let kind: String?
    let title: String?
    let markdownPath: String?
    let markdownSection: String?
    let sectionKey: String?
    let headingLevel: Int?
    let children: [TextbookTOCSection]?

    var resolvedChildren: [TextbookTOCSection] {
        children ?? []
    }
}

struct TextbookTOCNode: Decodable, Identifiable {
    let id: String
    let title: String
    let kind: String?
    let markdownPath: String?
    let markdownSection: String?
    let sectionKey: String?
    let scenePath: String?
    let sceneType: String?
    let sections: [TextbookTOCSection]?
    let children: [TextbookTOCNode]?

    var nodeKind: String {
        kind ?? "unknown"
    }

    var isSectionLeaf: Bool {
        kind == "markdown-section" || kind == "anchor"
    }

    var resolvedChildren: [TextbookTOCNode] {
        children ?? []
    }

    var resolvedSections: [TextbookTOCSection] {
        sections ?? []
    }
}

struct TextbookTOCPackage: Decodable {
    let tocRoot: TextbookTOCNode
}

struct ReaderPayloadChapterLink: Codable {
    let target: String
    let kind: String
    let status: String
    let targetBundlePath: String
}

struct ReaderBootstrapContext: Codable {
    let chapterBySourcePath: [String: String]
    let chapterByBasename: [String: String]
}

enum ReaderLoadError: Error, LocalizedError {
    case missingBundleRoot
    case missingManifestFile
    case decodeFailed(String)
    case missingChapterText(String)

    var errorDescription: String? {
        switch self {
        case .missingBundleRoot:
            return "Could not locate the app bundle resource root."
        case .missingManifestFile:
            return "Could not locate textbook manifest in app resources."
        case let .decodeFailed(message):
            return "Failed to read textbook data: \(message)"
        case let .missingChapterText(chapter):
            return "Missing chapter markdown for \(chapter)."
        }
    }
}

final class ReaderTextbookLoader {
    private let packageRootPath = "GeneratedTextbookPackage"
    private let manifestPath = "GeneratedTextbookPackage/textbook_bundle.json"
    private let searchIndexPath = "GeneratedTextbookPackage/textbook_bundle_search_index.json"
    private let linksPath = "GeneratedTextbookPackage/textbook_bundle_links.json"

    private var decoder: JSONDecoder {
        let value = JSONDecoder()
        value.keyDecodingStrategy = .convertFromSnakeCase
        return value
    }

    private func resourceURL(_ relativePath: String) -> URL? {
        guard let base = Bundle.main.resourceURL else {
            return nil
        }
        return base
            .appendingPathComponent(relativePath, isDirectory: false)
    }

    private func packageRelativePath(_ relativePath: String) -> String {
        if relativePath == packageRootPath || relativePath.hasPrefix("\(packageRootPath)/") {
            return relativePath
        }
        return "\(packageRootPath)/\(relativePath)"
    }

    private func readJson<T: Decodable>(relativePath: String, as type: T.Type) throws -> T {
        guard let url = resourceURL(relativePath) else {
            throw ReaderLoadError.missingBundleRoot
        }
        if !FileManager.default.fileExists(atPath: url.path) {
            throw ReaderLoadError.missingManifestFile
        }
        let payload = try Data(contentsOf: url)
        do {
            return try decoder.decode(T.self, from: payload)
        } catch {
            throw ReaderLoadError.decodeFailed("\(relativePath): \(error.localizedDescription)")
        }
    }

    func loadManifest() throws -> TextbookBundleManifest {
        return try readJson(relativePath: manifestPath, as: TextbookBundleManifest.self)
    }

    func loadSearchIndex() throws -> TextbookSearchIndex {
        guard let url = resourceURL(searchIndexPath),
              FileManager.default.fileExists(atPath: url.path) else {
            return TextbookSearchIndex(schemaVersion: 1, totalEntries: 0, entries: [])
        }
        return try readJson(relativePath: searchIndexPath, as: TextbookSearchIndex.self)
    }

    func loadLinks() throws -> [TextbookLinkMetadata] {
        guard let url = resourceURL(linksPath),
              FileManager.default.fileExists(atPath: url.path) else {
            return []
        }
        if let wrapped = try? readJson(relativePath: linksPath, as: TextbookLinkMetadataFile.self) {
            return wrapped.links
        }
        if let direct = try? readJson(relativePath: linksPath, as: [TextbookLinkMetadata].self) {
            return direct
        }
        return []
    }

    func chapterMarkdown(relativePath: String) throws -> String {
        return try bundledText(relativePath: relativePath)
    }

    func bundledText(relativePath: String) throws -> String {
        let bundledPath = packageRelativePath(relativePath)
        guard let url = resourceURL(bundledPath) else {
            throw ReaderLoadError.missingBundleRoot
        }
        guard FileManager.default.fileExists(atPath: url.path) else {
            throw ReaderLoadError.missingChapterText(bundledPath)
        }
        return try String(contentsOf: url, encoding: .utf8)
    }

    func bundledData(relativePath: String) throws -> Data {
        let bundledPath = packageRelativePath(relativePath)
        guard let url = resourceURL(bundledPath) else {
            throw ReaderLoadError.missingBundleRoot
        }
        guard FileManager.default.fileExists(atPath: url.path) else {
            throw ReaderLoadError.missingChapterText(bundledPath)
        }
        return try Data(contentsOf: url)
    }

    struct TextbookLinkMetadataFile: Decodable {
        let schemaVersion: Int?
        let totalLinks: Int?
        let links: [TextbookLinkMetadata]
    }
}

struct ReaderPackageData {
    let manifest: TextbookBundleManifest
    let tocPackage: TextbookTOCPackage
    let tocChapterByNodeId: [String: String]
    let tocNodeByMarkdownPath: [String: TextbookTOCNode]
    let chapterBySourcePath: [String: TextbookChapter]
    let chapterById: [String: TextbookChapter]
    let chapterByBasename: [String: TextbookChapter]
    let referenceBySourcePath: [String: TextbookReferenceDocument]
    let referenceByBundlePath: [String: TextbookReferenceDocument]
    let referenceById: [String: TextbookReferenceDocument]
    let referenceByBasename: [String: TextbookReferenceDocument]
}

extension ReaderTextbookLoader {
    func loadPackage() throws -> ReaderPackageData {
        let manifest = try loadManifest()
        let tocPackage = try readJson(relativePath: "GeneratedTextbookPackage/graph/textbook_toc.json", as: TextbookTOCPackage.self)
        let chapterIds = Set(manifest.chapters.map(\.id))
        let tocChapterByNodeId = buildTOCChapterLookup(
            node: tocPackage.tocRoot,
            chapterIds: chapterIds,
            inheritedChapterId: nil
        )
        let tocNodeByMarkdownPath = buildTOCMarkdownPathLookup(node: tocPackage.tocRoot)

        var bySourcePath: [String: TextbookChapter] = [:]
        var byId: [String: TextbookChapter] = [:]
        var byBasename: [String: TextbookChapter] = [:]
        var referenceBySourcePath: [String: TextbookReferenceDocument] = [:]
        var referenceByBundlePath: [String: TextbookReferenceDocument] = [:]
        var referenceById: [String: TextbookReferenceDocument] = [:]
        var referenceByBasename: [String: TextbookReferenceDocument] = [:]

        for chapter in manifest.chapters {
            bySourcePath[normalizePath(chapter.markdownPath)] = chapter
            byId[chapter.id] = chapter
            byBasename[URL(fileURLWithPath: chapter.markdownPath).deletingPathExtension().lastPathComponent.lowercased()] = chapter
            byBasename[URL(fileURLWithPath: chapter.bundlePath).deletingPathExtension().lastPathComponent.lowercased()] = chapter
            if let htmlPath = chapter.htmlPath {
                bySourcePath[normalizePath(htmlPath)] = chapter
                bySourcePath[normalizePath("GeneratedTextbookPackage/\(htmlPath)")] = chapter
                byBasename[URL(fileURLWithPath: htmlPath).deletingPathExtension().lastPathComponent.lowercased()] = chapter
            }
        }

        for reference in manifest.references {
            referenceBySourcePath[normalizePath(reference.sourcePath)] = reference
            referenceByBundlePath[normalizePath(reference.bundlePath)] = reference
            if let htmlPath = reference.htmlPath {
                referenceByBundlePath[normalizePath(htmlPath)] = reference
                referenceByBundlePath[normalizePath("GeneratedTextbookPackage/\(htmlPath)")] = reference
            }
            referenceById[reference.id] = reference
            referenceByBasename[
                URL(fileURLWithPath: reference.sourcePath)
                    .deletingPathExtension()
                    .lastPathComponent
                    .lowercased()
            ] = reference
            referenceByBasename[
                URL(fileURLWithPath: reference.bundlePath)
                    .deletingPathExtension()
                    .lastPathComponent
                    .lowercased()
            ] = reference
            if let htmlPath = reference.htmlPath {
                referenceByBasename[
                    URL(fileURLWithPath: htmlPath)
                        .deletingPathExtension()
                        .lastPathComponent
                        .lowercased()
                ] = reference
            }
        }

        return ReaderPackageData(
            manifest: manifest,
            tocPackage: tocPackage,
            tocChapterByNodeId: tocChapterByNodeId,
            tocNodeByMarkdownPath: tocNodeByMarkdownPath,
            chapterBySourcePath: bySourcePath,
            chapterById: byId,
            chapterByBasename: byBasename,
            referenceBySourcePath: referenceBySourcePath,
            referenceByBundlePath: referenceByBundlePath,
            referenceById: referenceById,
            referenceByBasename: referenceByBasename
        )
    }

    private func buildTOCChapterLookup(
        node: TextbookTOCNode,
        chapterIds: Set<String>,
        inheritedChapterId: String?
    ) -> [String: String] {
        var byNodeId: [String: String] = [:]
        var effectiveChapterId: String? = inheritedChapterId

        if let nodeChapter = chapterIds.contains(node.id) ? node.id : nil {
            effectiveChapterId = nodeChapter
        }

        if let chapterId = effectiveChapterId {
            byNodeId[node.id] = chapterId
        }

        for child in node.resolvedChildren {
            let childMap = buildTOCChapterLookup(
                node: child,
                chapterIds: chapterIds,
                inheritedChapterId: effectiveChapterId
            )
            byNodeId.merge(childMap) { first, _ in first }
        }

        return byNodeId
    }

    private func buildTOCMarkdownPathLookup(node: TextbookTOCNode) -> [String: TextbookTOCNode] {
        var byPath: [String: TextbookTOCNode] = [:]

        if let markdownPath = node.markdownPath?.trimmingCharacters(in: .whitespacesAndNewlines),
           !markdownPath.isEmpty {
            byPath[normalizePath(markdownPath)] = node
        }

        addTOCSectionMarkdownPaths(node.resolvedSections, owner: node, to: &byPath)

        for child in node.resolvedChildren {
            let childMap = buildTOCMarkdownPathLookup(node: child)
            byPath.merge(childMap) { first, _ in first }
        }

        return byPath
    }

    private func addTOCSectionMarkdownPaths(
        _ sections: [TextbookTOCSection],
        owner node: TextbookTOCNode,
        to byPath: inout [String: TextbookTOCNode]
    ) {
        for section in sections {
            if let markdownPath = section.markdownPath?.trimmingCharacters(in: .whitespacesAndNewlines),
               !markdownPath.isEmpty {
                byPath[normalizePath(markdownPath), default: node] = node
            }
            addTOCSectionMarkdownPaths(section.resolvedChildren, owner: node, to: &byPath)
        }
    }
}

func normalizePath(_ raw: String) -> String {
    let replaced = raw.replacingOccurrences(of: "\\", with: "/")
    return replaced
        .split(separator: "/")
        .filter { !$0.isEmpty && $0 != "." && $0 != ".." }
        .joined(separator: "/")
}
