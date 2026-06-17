import Foundation
import SwiftUI

@MainActor
final class ReaderViewModel: ObservableObject {
    @Published private(set) var package: ReaderPackageData?
    @Published private(set) var errorMessage: String?
    @Published var currentChapterId: String?
    @Published var currentAnchor: String?
    @Published var fontScale: Double = 1.0
    @Published var theme: ReaderTheme = .architrinoPurple
    @Published var lineSpacing: ReaderLineSpacing = .standard
    @Published var marginWidth: ReaderMarginWidth = .standard
    @Published var isReady: Bool = false
    @Published var searchText: String = ""
    @Published var searchResults: [TextbookSearchEntry] = []
    @Published var bookmarks: [ReaderBookmark] = []
    @Published var isSearchPresented: Bool = false
    @Published var isBookmarksPresented: Bool = false
    @Published var renderCommand: ReaderRenderCommand?
    @Published var anchorCommand: ReaderAnchorCommand?
    @Published var bootstrapContext: ReaderBootstrapContext?
    @Published var readerNotice: String?
    @Published var isRendering: Bool = false
    @Published private(set) var restoredReadingState: Bool = false

    private let loader = ReaderTextbookLoader()
    private let defaults = UserDefaults.standard
    private let stateKey = "architrino.reader.position"
    private let bookmarksKey = "architrino.reader.bookmarks"
    private let fontScaleKey = "architrino.reader.fontScale"
    private let themeKey = "architrino.reader.theme"
    private let lineSpacingKey = "architrino.reader.lineSpacing"
    private let marginWidthKey = "architrino.reader.marginWidth"
    private let appWebBaseURL = "https://architrino.com"
    private let inAppTOCKinds: Set<String> = ["scene-index", "markdown-view"]
    private let webappTOCKinds: Set<String> = ["diagram", "markdown-tree", "markdown-split"]

    private var markdownCache: [String: String] = [:]
    private var activeRenderCommandId: UUID?

    struct ReaderRenderCommand: Identifiable, Codable {
        let id: UUID
        let chapterId: String
        let chapterTitle: String
        let sourcePath: String
        let markdownText: String
        let linkMap: [String: ReaderPayloadChapterLink]
        let initialAnchor: String?
        let fontScale: Double
        let theme: ReaderTheme
        let lineSpacing: ReaderLineSpacing
        let marginWidth: ReaderMarginWidth
        let bootstrapContext: ReaderBootstrapContext
    }

    struct ReaderAnchorCommand: Identifiable, Codable {
        let id: UUID
        let anchor: String?
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

    private struct ReaderDocument {
        let id: String
        let title: String
        let sourcePath: String
        let bundlePath: String
    }

    init() {
        bootstrap()
    }

    private func bootstrap() {
        fontScale = defaults.double(forKey: fontScaleKey)
        if fontScale == 0 {
            fontScale = 1.0
        }
        if let storedTheme = defaults.string(forKey: themeKey),
           let resolvedTheme = ReaderTheme(rawValue: storedTheme) {
            theme = resolvedTheme
        }
        if let storedLineSpacing = defaults.string(forKey: lineSpacingKey),
           let resolvedLineSpacing = ReaderLineSpacing(rawValue: storedLineSpacing) {
            lineSpacing = resolvedLineSpacing
        }
        if let storedMarginWidth = defaults.string(forKey: marginWidthKey),
           let resolvedMarginWidth = ReaderMarginWidth(rawValue: storedMarginWidth) {
            marginWidth = resolvedMarginWidth
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
            restoredReadingState = restoreReadingState()
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
            anchorCommand = nil
            bootstrapContext = nil
            isRendering = false
            activeRenderCommandId = nil
            restoredReadingState = false
        }
    }

    var currentChapter: TextbookChapter? {
        guard let package,
              let chapterId = currentChapterId else { return nil }
        return package.chapterById[chapterId]
    }

    var currentReferenceDocument: TextbookReferenceDocument? {
        guard let package,
              let chapterId = currentChapterId else { return nil }
        return package.referenceById[chapterId]
    }

    var currentDocumentTitle: String {
        currentChapter?.title ?? currentReferenceDocument?.title ?? "Textbook"
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

    var canOpenGlossary: Bool {
        package?.referenceById["archie-comparative-glossary"] != nil
    }

    var isCurrentPositionBookmarked: Bool {
        currentBookmarkIndex != nil
    }

    var readingProgressLabel: String {
        guard let package,
              let currentChapterId else {
            return ""
        }
        if let index = package.manifest.chapters.firstIndex(where: { $0.id == currentChapterId }) {
            let percent = Int(((Double(index) + 1.0) / Double(max(1, package.manifest.chapters.count)) * 100).rounded())
            return "\(index + 1)/\(package.manifest.chapters.count) · \(percent)%"
        }
        return currentReferenceDocument?.title ?? ""
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
    }

    func setTheme(_ value: ReaderTheme) {
        theme = value
        defaults.set(value.rawValue, forKey: themeKey)
    }

    func setLineSpacing(_ value: ReaderLineSpacing) {
        lineSpacing = value
        defaults.set(value.rawValue, forKey: lineSpacingKey)
    }

    func setMarginWidth(_ value: ReaderMarginWidth) {
        marginWidth = value
        defaults.set(value.rawValue, forKey: marginWidthKey)
    }

    func resetReaderAppearance() {
        fontScale = 1.0
        theme = .architrinoPurple
        lineSpacing = .standard
        marginWidth = .standard
        defaults.set(fontScale, forKey: fontScaleKey)
        defaults.set(theme.rawValue, forKey: themeKey)
        defaults.set(lineSpacing.rawValue, forKey: lineSpacingKey)
        defaults.set(marginWidth.rawValue, forKey: marginWidthKey)
    }

    func increaseFont() {
        setFontScale(fontScale + 0.08)
    }

    func decreaseFont() {
        setFontScale(fontScale - 0.08)
    }

    func openChapter(by id: String, anchor: String?) {
        guard package?.chapterById[id] != nil else { return }
        openDocument(by: id, anchor: anchor)
    }

    func openReferenceDocument(by id: String, anchor: String?) {
        guard package?.referenceById[id] != nil else { return }
        openDocument(by: id, anchor: anchor)
    }

    func openGlossary() {
        openReferenceDocument(by: "archie-comparative-glossary", anchor: nil)
    }

    func openSearchResult(_ result: TextbookSearchEntry) {
        openChapter(by: result.chapterId, anchor: result.sectionAnchor)
        isSearchPresented = false
    }

    func openAnchor(_ anchor: String?) {
        guard let currentChapterId else { return }
        openDocument(by: currentChapterId, anchor: anchor)
    }

    func handleNavigationFromWeb(to chapterId: String, anchor: String?) {
        openDocument(by: chapterId, anchor: anchor)
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

    func toggleCurrentBookmark() {
        if let index = currentBookmarkIndex {
            bookmarks.remove(at: index)
            persistBookmarks()
            return
        }
        addBookmark()
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
            if let fallback = webAppURL(for: node) {
                return .external(fallback)
            }
            return .none
        }

        if let fallback = fallbackExternalURL(for: preferredTOCTargetPath(for: node), anchor: resolveTOCAnchor(for: node, chapterId: chapterId)) {
            return .external(fallback)
        }
        return .none
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
            saveReadingState()
            return nil
        }

        if payload.kind == "markdown" || payload.status == "kept_out_of_bundle" {
            if let anchorTarget = resolveDocumentTarget(from: payload.targetBundlePath ?? payload.href, defaultAnchor: payload.anchor) {
                openDocument(by: anchorTarget.documentId, anchor: anchorTarget.anchor)
                return nil
            }

            if payload.status == "kept_out_of_bundle" {
                readerNotice = "This reference is not included in this app bundle."
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

    func markRenderComplete(message: Any?) {
        if let message,
           let commandId = renderCommandId(from: message),
           let activeRenderCommandId,
           commandId != activeRenderCommandId {
            return
        }
        isRendering = false
        activeRenderCommandId = nil
    }

    func hasAnyContent() -> Bool {
        !(package?.manifest.chapters.isEmpty ?? true)
    }

    private func openDocument(by id: String, anchor: String?) {
        guard package?.chapterById[id] != nil || package?.referenceById[id] != nil else {
            return
        }
        readerNotice = nil
        let isSameDocument = currentChapterId == id && renderCommand != nil
        currentAnchor = anchor
        currentChapterId = id
        if isSameDocument {
            anchorCommand = ReaderAnchorCommand(id: UUID(), anchor: anchor)
            saveReadingState()
            return
        }
        emitRenderCommand()
        saveReadingState()
    }

    private func emitRenderCommand() {
        guard let package,
              let chapterId = currentChapterId,
              let document = readerDocument(by: chapterId),
              let bootstrapContext else {
            renderCommand = nil
            anchorCommand = nil
            isRendering = false
            activeRenderCommandId = nil
            return
        }

        let markdownText = loadDocumentText(document)

        var linkMap: [String: ReaderPayloadChapterLink] = [:]
        for link in package.linksBySourcePath[normalizePath(document.sourcePath)] ?? [] {
            linkMap[link.target] = ReaderPayloadChapterLink(
                target: link.target,
                kind: link.kind,
                status: link.status,
                targetBundlePath: link.targetBundlePath ?? ""
            )
        }

        let commandId = UUID()
        activeRenderCommandId = commandId
        isRendering = true
        anchorCommand = nil
        renderCommand = ReaderRenderCommand(
            id: commandId,
            chapterId: document.id,
            chapterTitle: document.title,
            sourcePath: document.sourcePath,
            markdownText: markdownText,
            linkMap: linkMap,
            initialAnchor: currentAnchor,
            fontScale: fontScale,
            theme: theme,
            lineSpacing: lineSpacing,
            marginWidth: marginWidth,
            bootstrapContext: bootstrapContext
        )
    }

    private func renderCommandId(from message: Any) -> UUID? {
        if let dictionary = message as? [String: Any],
           let id = dictionary["commandId"] as? String {
            return UUID(uuidString: id)
        }
        if let dictionary = message as? [String: String],
           let id = dictionary["commandId"] {
            return UUID(uuidString: id)
        }
        return nil
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

        for reference in package.manifest.references {
            bySource[normalizePath(reference.sourcePath)] = reference.id
            bySource[normalizePath(reference.bundlePath)] = reference.id
            byBasename[
                URL(fileURLWithPath: reference.sourcePath)
                    .deletingPathExtension()
                    .lastPathComponent
                    .lowercased()
            ] = reference.id
            byBasename[
                URL(fileURLWithPath: reference.bundlePath)
                    .deletingPathExtension()
                    .lastPathComponent
                    .lowercased()
            ] = reference.id
        }

        bootstrapContext = ReaderBootstrapContext(
            chapterBySourcePath: bySource,
            chapterByBasename: byBasename
        )
    }

    private func readerDocument(by id: String) -> ReaderDocument? {
        guard let package else { return nil }
        if let chapter = package.chapterById[id] {
            return ReaderDocument(
                id: chapter.id,
                title: chapter.title,
                sourcePath: chapter.markdownPath,
                bundlePath: chapter.bundlePath
            )
        }
        if let reference = package.referenceById[id] {
            return ReaderDocument(
                id: reference.id,
                title: reference.title,
                sourcePath: reference.sourcePath,
                bundlePath: reference.bundlePath
            )
        }
        return nil
    }

    private func loadDocumentText(_ document: ReaderDocument) -> String {
        if let cached = markdownCache[document.id] {
            return cached
        }
        do {
            let text = try loader.chapterMarkdown(relativePath: document.bundlePath)
            markdownCache[document.id] = text
            return text
        } catch {
            return "# Failed to load document\n\n\(error.localizedDescription)"
        }
    }

    private func saveReadingState() {
        guard let currentChapterId else { return }
        let state = ReaderPosition(
            chapterId: currentChapterId,
            anchor: currentAnchor,
            isExplicit: true
        )
        do {
            let payload = try JSONEncoder().encode(state)
            defaults.set(payload, forKey: stateKey)
        } catch {
            // no-op for storage failures
        }
    }

    private func restoreReadingState() -> Bool {
        guard let stateData = defaults.data(forKey: stateKey) else {
            currentChapterId = nil
            currentAnchor = nil
            return false
        }
        do {
            let state = try JSONDecoder().decode(ReaderPosition.self, from: stateData)
            if package?.chapterById[state.chapterId] != nil || package?.referenceById[state.chapterId] != nil {
                guard state.isExplicit == true else {
                    currentChapterId = nil
                    currentAnchor = nil
                    defaults.removeObject(forKey: stateKey)
                    return false
                }
                currentChapterId = state.chapterId
                currentAnchor = state.anchor
                return true
            }
        } catch {
            currentChapterId = nil
            currentAnchor = nil
        }
        return false
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

    private var currentBookmarkIndex: Int? {
        guard let chapter = currentChapter else { return nil }
        return bookmarks.firstIndex { bookmark in
            bookmark.chapterId == chapter.id && bookmark.anchor == currentAnchor
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

    private func resolveDocumentTarget(from rawTarget: String, defaultAnchor: String?) -> (documentId: String, anchor: String?)? {
        guard let package else {
            return nil
        }

        let (targetPath, explicitAnchor) = splitPathAndAnchor(rawTarget)
        let normalized = normalizePath(targetPath)

        if let chapter = package.chapterBySourcePath[normalized] {
            return (chapter.id, explicitAnchor ?? defaultAnchor)
        }

        if let reference = package.referenceBySourcePath[normalized] ?? package.referenceByBundlePath[normalized] {
            return (reference.id, explicitAnchor ?? defaultAnchor)
        }

        if let tocTarget = resolveTOCMarkdownTarget(
            for: normalized,
            explicitAnchor: explicitAnchor,
            defaultAnchor: defaultAnchor
        ) {
            return tocTarget
        }

        if let chapter = package.chapterBySourcePath[normalizePath("GeneratedTextbookPackage/\(targetPath)")] {
            return (chapter.id, explicitAnchor ?? defaultAnchor)
        }

        if let reference = package.referenceByBundlePath[normalizePath("GeneratedTextbookPackage/\(targetPath)")] {
            return (reference.id, explicitAnchor ?? defaultAnchor)
        }

        if let tocTarget = resolveTOCMarkdownTarget(
            for: normalizePath("GeneratedTextbookPackage/\(targetPath)"),
            explicitAnchor: explicitAnchor,
            defaultAnchor: defaultAnchor
        ) {
            return tocTarget
        }

        let basename = URL(fileURLWithPath: normalized)
            .deletingPathExtension()
            .lastPathComponent
            .lowercased()
        if let chapter = package.chapterByBasename[basename] {
            return (chapter.id, explicitAnchor ?? defaultAnchor)
        }
        if let reference = package.referenceByBasename[basename] {
            return (reference.id, explicitAnchor ?? defaultAnchor)
        }

        return nil
    }

    private func resolveTOCMarkdownTarget(
        for normalizedPath: String,
        explicitAnchor: String?,
        defaultAnchor: String?
    ) -> (documentId: String, anchor: String?)? {
        guard let package,
              let node = package.tocNodeByMarkdownPath[normalizedPath],
              let chapterId = package.tocChapterByNodeId[node.id] else {
            return nil
        }
        let anchor = explicitAnchor ?? defaultAnchor ?? resolveTOCAnchor(for: node, chapterId: chapterId)
        return (chapterId, anchor)
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

    private func webAppURL(for node: TextbookTOCNode) -> URL? {
        guard let scenePath = node.scenePath?.trimmingCharacters(in: .whitespacesAndNewlines),
              !scenePath.isEmpty else {
            return URL(string: appWebBaseURL)
        }

        var allowed = CharacterSet.urlQueryAllowed
        allowed.remove(charactersIn: "&=")
        let encodedScenePath = scenePath.addingPercentEncoding(withAllowedCharacters: allowed) ?? scenePath
        return URL(string: "\(appWebBaseURL)/#scene=\(encodedScenePath)")
    }

    private func resolveTOCAnchor(for node: TextbookTOCNode, chapterId: String?) -> String? {
        guard let package,
              let chapterId else {
            return nil
        }

        let chapterEntries = package.searchIndex.entries.filter { $0.chapterId == chapterId }
        var primaryCandidates: [String] = []
        appendTOCAnchorCandidate(node.title, to: &primaryCandidates)
        appendTOCAnchorCandidate(node.markdownSection, to: &primaryCandidates)
        appendTOCAnchorCandidate(node.sectionKey, to: &primaryCandidates)
        for candidate in primaryCandidates {
            if let match = searchEntryAnchor(matching: candidate, in: chapterEntries) {
                return match
            }
        }

        if let primary = primaryCandidates.first {
            return anchorFromHeadingTitle(primary)
        }

        var fallbackCandidates: [String] = []
        for section in node.resolvedSections {
            appendTOCAnchorCandidate(section.markdownSection, to: &fallbackCandidates)
            appendTOCAnchorCandidate(section.sectionKey, to: &fallbackCandidates)
        }

        for candidate in fallbackCandidates {
            if let match = searchEntryAnchor(matching: candidate, in: chapterEntries) {
                return match
            }
        }

        for section in node.resolvedSections {
            guard let requested = section.sectionKey?.trimmingCharacters(in: .whitespacesAndNewlines),
                  !requested.isEmpty else {
                continue
            }
            if let match = chapterEntries.first(where: { $0.sectionKey == requested }) {
                return match.sectionAnchor
            }
        }

        return fallbackCandidates.first.map(anchorFromHeadingTitle)
    }

    private func appendTOCAnchorCandidate(_ value: String?, to candidates: inout [String]) {
        guard let trimmed = value?.trimmingCharacters(in: .whitespacesAndNewlines),
              !trimmed.isEmpty else {
            return
        }
        let normalized = normalizeHeadingKey(trimmed)
        if candidates.contains(where: { normalizeHeadingKey($0) == normalized }) {
            return
        }
        candidates.append(trimmed)
    }

    private func searchEntryAnchor(matching candidate: String, in entries: [TextbookSearchEntry]) -> String? {
        let normalized = normalizeHeadingKey(candidate)
        if let match = entries.first(where: { normalizeHeadingKey($0.sectionTitle) == normalized }) {
            return match.sectionAnchor
        }
        if let match = entries.first(where: { normalizeHeadingKey($0.sectionKey ?? "") == normalized }) {
            return match.sectionAnchor
        }
        return nil
    }

    private func normalizeHeadingKey(_ raw: String) -> String {
        return raw
            .folding(options: [.diacriticInsensitive, .caseInsensitive], locale: Locale(identifier: "en_US_POSIX"))
            .lowercased()
            .replacingOccurrences(of: "<[^>]+>", with: " ", options: .regularExpression)
            .replacingOccurrences(of: "[^a-z0-9\\s]+", with: " ", options: .regularExpression)
            .replacingOccurrences(of: "\\s+", with: " ", options: .regularExpression)
            .trimmingCharacters(in: .whitespacesAndNewlines)
    }

    private func anchorFromHeadingTitle(_ raw: String) -> String {
        let anchor = raw
            .folding(options: [.diacriticInsensitive, .caseInsensitive], locale: Locale(identifier: "en_US_POSIX"))
            .lowercased()
            .replacingOccurrences(of: "<[^>]+>", with: "", options: .regularExpression)
            .replacingOccurrences(of: "[\\u{2013}\\u{2014}]", with: "-", options: .regularExpression)
            .replacingOccurrences(of: "[^a-z0-9\\-\\s]+", with: "", options: .regularExpression)
            .replacingOccurrences(of: "\\s+", with: "-", options: .regularExpression)
            .replacingOccurrences(of: "-+", with: "-", options: .regularExpression)
            .trimmingCharacters(in: CharacterSet(charactersIn: "-"))
        return anchor.isEmpty ? "section" : anchor
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
