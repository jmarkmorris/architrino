import Foundation
import SwiftUI

@MainActor
final class ReaderViewModel: ObservableObject {
    @Published private(set) var package: ReaderPackageData?
    @Published private(set) var errorMessage: String?
    @Published var currentChapterId: String?
    @Published var currentAnchor: String?
    @Published var fontScale: Double = 1.0
    @Published var isReady: Bool = false
    @Published var searchText: String = ""
    @Published var searchResults: [TextbookSearchEntry] = []
    @Published var bookmarks: [ReaderBookmark] = []
    @Published var isSearchPresented: Bool = false
    @Published var isBookmarksPresented: Bool = false
    @Published var renderCommand: ReaderRenderCommand?
    @Published var bootstrapContext: ReaderBootstrapContext?

    private let loader = ReaderTextbookLoader()
    private let defaults = UserDefaults.standard
    private let stateKey = "architrino.reader.position"
    private let bookmarksKey = "architrino.reader.bookmarks"
    private let fontScaleKey = "architrino.reader.fontScale"
    private let appWebBaseURL = "https://architrino.com"
    private let inAppTOCKinds: Set<String> = ["scene-index", "markdown-view"]
    private let webappTOCKinds: Set<String> = ["diagram", "markdown-tree", "markdown-split"]

    private var markdownCache: [String: String] = [:]

    struct ReaderRenderCommand: Identifiable, Codable, Equatable {
        let id: UUID
        let chapterId: String
        let chapterTitle: String
        let sourcePath: String
        let markdownText: String
        let linkMap: [String: ReaderPayloadChapterLink]
        let initialAnchor: String?
        let fontScale: Double
        let bootstrapContext: ReaderBootstrapContext
    }

    struct ReaderWebLinkPayload: Equatable {
        let href: String
        let type: String?
        let kind: String?
        let status: String?
        let target: String?
        let anchor: String?
        let chapterId: String?
        let targetBundlePath: String?
    }

    enum TOCRoute {
        case chapter(id: String, anchor: String?)
        case external(URL)
        case none
    }

    init() {
        bootstrap()
    }

    private func bootstrap() {
        fontScale = defaults.double(forKey: fontScaleKey)
        if fontScale == 0 {
            fontScale = 1.0
        }
        loadBookmarks()
        Task {
            await load()
        }
    }

    func load() async {
        do {
            let data = try loader.loadPackage()
            isReady = false
            package = data
            markdownCache.removeAll(keepingCapacity: false)
            restoreReadingState()
            buildBootstrapContext()
            errorMessage = nil

            if currentChapterId == nil {
                currentChapterId = data.manifest.chapters.first?.id
            }
            emitRenderCommand()
            isReady = true
        } catch {
            errorMessage = error.localizedDescription
            isReady = false
            package = nil
            renderCommand = nil
            bootstrapContext = nil
        }
    }

    var currentChapter: TextbookChapter? {
        guard let package,
              let chapterId = currentChapterId else { return nil }
        return package.chapterById[chapterId]
    }

    var chapterCount: Int {
        package?.manifest.chapters.count ?? 0
    }

    var tocTopLevelNodes: [TextbookTOCNode] {
        package?.tocPackage.tocRoot.resolvedChildren ?? []
    }

    var packageVersionLabel: String {
        package?.manifest.packageVersion ?? "unavailable"
    }

    func chapter(at index: Int) -> TextbookChapter? {
        guard let package else { return nil }
        guard package.manifest.chapters.indices.contains(index) else { return nil }
        return package.manifest.chapters[index]
    }

    func canGoPreviousChapter() -> Bool {
        guard let package,
              let currentChapterId,
              let index = package.manifest.chapters.firstIndex(where: { $0.id == currentChapterId }) else {
            return false
        }
        return index > 0
    }

    func canGoNextChapter() -> Bool {
        guard let package,
              let currentChapterId,
              let index = package.manifest.chapters.firstIndex(where: { $0.id == currentChapterId }) else {
            return false
        }
        return index < (package.manifest.chapters.count - 1)
    }

    func goToPreviousChapter() {
        guard let package,
              let currentChapterId,
              let index = package.manifest.chapters.firstIndex(where: { $0.id == currentChapterId }) else {
            return
        }
        let previous = index - 1
        guard previous >= 0 else { return }
        openChapter(by: package.manifest.chapters[previous].id, anchor: nil)
    }

    func goToNextChapter() {
        guard let package,
              let currentChapterId,
              let index = package.manifest.chapters.firstIndex(where: { $0.id == currentChapterId }) else {
            return
        }
        let next = index + 1
        guard next < package.manifest.chapters.count else { return }
        openChapter(by: package.manifest.chapters[next].id, anchor: nil)
    }

    func setFontScale(_ value: Double) {
        let clamped = max(0.85, min(1.45, value))
        fontScale = clamped
        defaults.set(clamped, forKey: fontScaleKey)
        emitRenderCommand()
    }

    func increaseFont() {
        setFontScale(fontScale + 0.08)
    }

    func decreaseFont() {
        setFontScale(fontScale - 0.08)
    }

    func openChapter(by id: String, anchor: String?) {
        currentAnchor = anchor
        currentChapterId = id
        emitRenderCommand()
        saveReadingState()
    }

    func openSearchResult(_ result: TextbookSearchEntry) {
        openChapter(by: result.chapterId, anchor: result.sectionAnchor)
        isSearchPresented = false
    }

    func openAnchor(_ anchor: String?) {
        guard let currentChapterId else { return }
        openChapter(by: currentChapterId, anchor: anchor)
    }

    func handleNavigationFromWeb(to chapterId: String, anchor: String?) {
        openChapter(by: chapterId, anchor: anchor)
    }

    func search(_ query: String) {
        searchText = query
        guard let package,
              !query.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty else {
            searchResults = []
            return
        }
        let normalized = query.lowercased()
        searchResults = package.searchIndex.entries.filter { entry in
            let haystack = "\(entry.chapterTitle) \(entry.sectionTitle) \(entry.text) \(entry.snippet)".lowercased()
            return haystack.contains(normalized)
        }
        .sorted { lhs, rhs in
            if lhs.chapterTitle == rhs.chapterTitle {
                return lhs.sectionTitle < rhs.sectionTitle
            }
            return lhs.chapterTitle < rhs.chapterTitle
        }
    }

    func clearSearch() {
        searchText = ""
        searchResults = []
    }

    func addBookmark() {
        guard let chapter = currentChapter else { return }
        let bookmark = ReaderBookmark(
            chapterId: chapter.id,
            chapterTitle: chapter.title,
            anchor: currentAnchor
        )
        if bookmarks.firstIndex(where: { $0.chapterId == bookmark.chapterId && $0.anchor == bookmark.anchor }) != nil {
            return
        }
        bookmarks.insert(bookmark, at: 0)
        persistBookmarks()
    }

    func removeBookmark(_ bookmark: ReaderBookmark) {
        bookmarks.removeAll { $0.id == bookmark.id }
        persistBookmarks()
    }

    func openBookmark(_ bookmark: ReaderBookmark) {
        openChapter(by: bookmark.chapterId, anchor: bookmark.anchor)
        isBookmarksPresented = false
    }

    func resolveTOCTarget(for node: TextbookTOCNode) -> TOCRoute {
        guard let package else {
            return .none
        }
        let chapterId = package.tocChapterByNodeId[node.id]
        let kind = node.nodeKind

        if inAppTOCKinds.contains(kind), let targetChapter = chapterId {
            let anchor = resolveTOCAnchor(for: node, chapterId: targetChapter)
            return .chapter(id: targetChapter, anchor: anchor)
        }

        if webappTOCKinds.contains(kind) {
            if let fallback = URL(string: appWebBaseURL) {
                return .external(fallback)
            }
            return .none
        }

        if let fallback = fallbackExternalURL(for: preferredTOCTargetPath(for: node), anchor: resolveTOCAnchor(for: node, chapterId: chapterId)) {
            return .external(fallback)
        }
        return .none
    }

    func performTOCAction(for node: TextbookTOCNode) -> URL? {
        switch resolveTOCTarget(for: node) {
        case .chapter(let chapterId, let anchor):
            openChapter(by: chapterId, anchor: anchor)
            return nil
        case .external(let url):
            return url
        case .none:
            return nil
        }
    }

    func handleWebLink(message: Any) -> URL? {
        guard let payload = parseWebPayload(from: message) else {
            if let value = message as? String, let url = URL(string: value) {
                return url
            }
            return nil
        }

        if payload.kind == "anchor" || payload.type == "anchor" {
            currentAnchor = payload.anchor
            emitRenderCommand()
            saveReadingState()
            return nil
        }

        if payload.kind == "markdown" || payload.status == "kept_out_of_bundle" {
            if let anchorTarget = resolveChapterTarget(from: payload.targetBundlePath ?? payload.href, defaultAnchor: payload.anchor) {
                openChapter(by: anchorTarget.chapterId, anchor: anchorTarget.anchor)
                return nil
            }

            if let external = fallbackExternalURL(for: payload.targetBundlePath ?? payload.href, anchor: payload.anchor) {
                return external
            }
            return nil
        }

        if let mapped = payload.targetBundlePath,
           let external = URL(string: mapped),
           external.scheme != nil {
            return external
        }

        if let fallback = fallbackExternalURL(for: payload.href, anchor: payload.anchor) {
            return fallback
        }

        return nil
    }

    func hasAnyContent() -> Bool {
        !(package?.manifest.chapters.isEmpty ?? true)
    }

    func glossaryURL() -> URL? {
        return fallbackExternalURL(for: "content/markdown/aaa/archie/comparative-glossary.md", anchor: nil)
    }

    private func emitRenderCommand() {
        guard let package,
              let chapterId = currentChapterId,
              let chapter = package.chapterById[chapterId],
              let bootstrapContext else {
            renderCommand = nil
            return
        }

        let chapterMarkdown = loadChapterText(chapter)

        var linkMap: [String: ReaderPayloadChapterLink] = [:]
        for link in package.linksBySourcePath[normalizePath(chapter.markdownPath)] ?? [] {
            linkMap[link.target] = ReaderPayloadChapterLink(
                target: link.target,
                kind: link.kind,
                status: link.status,
                targetBundlePath: link.targetBundlePath ?? ""
            )
        }

        renderCommand = ReaderRenderCommand(
            id: UUID(),
            chapterId: chapter.id,
            chapterTitle: chapter.title,
            sourcePath: chapter.markdownPath,
            markdownText: chapterMarkdown,
            linkMap: linkMap,
            initialAnchor: currentAnchor,
            fontScale: fontScale,
            bootstrapContext: bootstrapContext
        )
        saveReadingState()
    }

    private func buildBootstrapContext() {
        guard let package else {
            bootstrapContext = nil
            return
        }
        var bySource: [String: String] = [:]
        var byBasename: [String: String] = [:]

        for chapter in package.manifest.chapters {
            bySource[normalizePath(chapter.markdownPath)] = chapter.id
            bySource[normalizePath(chapter.bundlePath)] = chapter.id
            byBasename[
                URL(fileURLWithPath: chapter.markdownPath)
                    .deletingPathExtension()
                    .lastPathComponent
                    .lowercased()
            ] = chapter.id
            byBasename[
                URL(fileURLWithPath: chapter.bundlePath)
                    .deletingPathExtension()
                    .lastPathComponent
                    .lowercased()
            ] = chapter.id
        }

        bootstrapContext = ReaderBootstrapContext(
            chapterBySourcePath: bySource,
            chapterByBasename: byBasename
        )
    }

    private func loadChapterText(_ chapter: TextbookChapter) -> String {
        if let cached = markdownCache[chapter.id] {
            return cached
        }
        do {
            let text = try loader.chapterMarkdown(relativePath: chapter.bundlePath)
            markdownCache[chapter.id] = text
            return text
        } catch {
            return "# Failed to load chapter\n\n\(error.localizedDescription)"
        }
    }

    private func saveReadingState() {
        guard let currentChapterId else { return }
        let state = ReaderPosition(
            chapterId: currentChapterId,
            anchor: currentAnchor
        )
        do {
            let payload = try JSONEncoder().encode(state)
            defaults.set(payload, forKey: stateKey)
        } catch {
            // no-op for storage failures
        }
    }

    private func restoreReadingState() {
        guard let stateData = defaults.data(forKey: stateKey) else {
            currentChapterId = nil
            currentAnchor = nil
            return
        }
        do {
            let state = try JSONDecoder().decode(ReaderPosition.self, from: stateData)
            if package?.chapterById[state.chapterId] != nil {
                currentChapterId = state.chapterId
                currentAnchor = state.anchor
            }
        } catch {
            currentChapterId = nil
            currentAnchor = nil
        }
    }

    private func loadBookmarks() {
        guard let data = defaults.data(forKey: bookmarksKey) else {
            bookmarks = []
            return
        }
        do {
            bookmarks = try JSONDecoder().decode([ReaderBookmark].self, from: data)
        } catch {
            bookmarks = []
        }
    }

    private func persistBookmarks() {
        do {
            let payload = try JSONEncoder().encode(bookmarks)
            defaults.set(payload, forKey: bookmarksKey)
        } catch {
            // persist failure is non-blocking
        }
    }

    private func parseWebPayload(from message: Any) -> ReaderWebLinkPayload? {
        guard let dict = message as? [String: Any] else {
            return nil
        }
        guard let href = dict["href"] as? String,
              !href.isEmpty else {
            return nil
        }

        return ReaderWebLinkPayload(
            href: href,
            type: dict["type"] as? String,
            kind: dict["kind"] as? String,
            status: dict["status"] as? String,
            target: dict["target"] as? String,
            anchor: dict["anchor"] as? String,
            chapterId: dict["chapterId"] as? String,
            targetBundlePath: dict["targetBundlePath"] as? String
        )
    }

    private func resolveChapterTarget(from rawTarget: String, defaultAnchor: String?) -> (chapterId: String, anchor: String?)? {
        guard let package else {
            return nil
        }

        let (targetPath, explicitAnchor) = splitPathAndAnchor(rawTarget)
        let normalized = normalizePath(targetPath)

        if let chapter = package.chapterBySourcePath[normalized] {
            return (chapter.id, explicitAnchor ?? defaultAnchor)
        }

        if let chapter = package.chapterBySourcePath[normalizePath("GeneratedTextbookPackage/\(targetPath)")] {
            return (chapter.id, explicitAnchor ?? defaultAnchor)
        }

        let basename = URL(fileURLWithPath: normalized)
            .deletingPathExtension()
            .lastPathComponent
            .lowercased()
        if let chapter = package.chapterByBasename[basename] {
            return (chapter.id, explicitAnchor ?? defaultAnchor)
        }

        return nil
    }

    private func preferredTOCTargetPath(for node: TextbookTOCNode) -> String {
        if let path = node.markdownPath, !path.isEmpty {
            return path
        }
        if let path = node.scenePath, !path.isEmpty {
            return path
        }
        return node.id
    }

    private func resolveTOCAnchor(for node: TextbookTOCNode, chapterId: String?) -> String? {
        guard let package,
              let chapterId,
              let firstSection = node.resolvedSections.first(where: { !($0.sectionKey ?? "").isEmpty }) else {
            return nil
        }
        let requested = firstSection.sectionKey!.trimmingCharacters(in: .whitespacesAndNewlines)
        if requested.isEmpty {
            return nil
        }

        if let match = package.searchIndex.entries.first(where: { $0.chapterId == chapterId && $0.sectionKey == requested }) {
            return match.sectionAnchor
        }
        return nil
    }

    private func fallbackExternalURL(for rawTarget: String, anchor: String?) -> URL? {
        let fallbackAnchor = anchor.flatMap { "#\($0)" } ?? ""

        if let direct = URL(string: rawTarget), direct.scheme != nil {
            if let fragment = direct.fragment, !fragment.isEmpty {
                return direct
            }
            if let url = URL(string: "\(direct.absoluteString)\(fallbackAnchor)") {
                return url
            }
            return direct
        }

        let target = rawTarget.trimmingCharacters(in: .whitespacesAndNewlines)
        if target.isEmpty {
            return nil
        }

        guard let fileName = URL(fileURLWithPath: target).deletingPathExtension().lastPathComponent.lowercased().nilIfEmpty else {
            return nil
        }
        if fileName == "index" || fileName == "readme" {
            return URL(string: appWebBaseURL)
        }
        return URL(string: "\(appWebBaseURL)/\(fileName)\(fallbackAnchor)")
    }

    private func splitPathAndAnchor(_ raw: String) -> (path: String, anchor: String?) {
        let normalized = raw.trimmingCharacters(in: .whitespacesAndNewlines)
        guard let hashIndex = normalized.firstIndex(of: "#") else {
            return (normalized, nil)
        }
        let pathPart = String(normalized[..<hashIndex])
        let anchorPart = String(normalized[normalized.index(after: hashIndex)...])
        return (pathPart, anchorPart)
    }
}

private extension String {
    var nilIfEmpty: String? {
        let trimmed = trimmingCharacters(in: .whitespacesAndNewlines)
        return trimmed.isEmpty ? nil : trimmed
    }
}
