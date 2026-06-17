import SwiftUI

struct ContentView: View {
    @StateObject private var viewModel = ReaderViewModel()
    @Environment(\.horizontalSizeClass) private var horizontalSizeClass
    @Environment(\.openURL) private var openURL

    @State private var showToc = false
    @State private var tocNotice: String?
    @State private var showAbout = false
    @State private var showReaderSettings = false
    @State private var didPresentInitialToc = false
    @State private var dismissTOCAfterRender = false

    private var isRegularWidth: Bool {
        horizontalSizeClass == .regular
    }

    var body: some View {
        Group {
            if isRegularWidth {
                NavigationSplitView {
                    tocSidebar
                } detail: {
                    readerDetail
                }
                .navigationSplitViewStyle(.balanced)
            } else {
                readerDetail
            }
        }
        .fullScreenCover(isPresented: $showToc) {
            NavigationStack {
                tocSidebar
                    .navigationTitle("Table of Contents")
                    .navigationBarTitleDisplayMode(.inline)
                    .toolbar {
                        ToolbarItem(placement: .cancellationAction) {
                            Button("Done") {
                                dismissTOCImmediately()
                            }
                        }
                    }
            }
            .background(Color(.systemGroupedBackground).ignoresSafeArea())
        }
        .sheet(isPresented: $viewModel.isSearchPresented) {
            SearchSheet(viewModel: viewModel)
        }
        .sheet(isPresented: $viewModel.isBookmarksPresented) {
            BookmarksSheet(viewModel: viewModel)
        }
        .sheet(isPresented: $showAbout) {
            AboutSheet(packageVersion: viewModel.packageVersionLabel)
        }
        .sheet(isPresented: $showReaderSettings) {
            ReaderSettingsSheet(viewModel: viewModel)
        }
        .onAppear {
            presentInitialTOCIfNeeded()
        }
        .onChange(of: viewModel.isReady) { _, _ in
            presentInitialTOCIfNeeded()
        }
        .onChange(of: horizontalSizeClass) { _, _ in
            presentInitialTOCIfNeeded()
        }
    }

    private var readerDetail: some View {
        NavigationStack {
            VStack(spacing: 0) {
                if !viewModel.hasAnyContent() && viewModel.isReady {
                    VStack(spacing: 10) {
                        Text("No content available in this app bundle.")
                            .foregroundStyle(.secondary)
                            .multilineTextAlignment(.center)
                        Text("Expected chapter content files were not found in GeneratedTextbookPackage.")
                            .font(.footnote)
                            .foregroundStyle(.secondary)
                    }
                    .padding()
                } else if let error = viewModel.errorMessage, viewModel.package == nil {
                    VStack(spacing: 10) {
                        Text("Reader startup failed")
                            .font(.headline)
                        Text(error)
                            .font(.footnote)
                            .foregroundStyle(.secondary)
                    }
                    .padding()
                } else if viewModel.renderCommand != nil {
                    ReaderWebView(
                        renderCommand: $viewModel.renderCommand,
                        onLinkTap: { payload in
                            if let url = viewModel.handleWebLink(message: payload) {
                                openURL(url)
                            }
                        },
                        onRenderComplete: {
                            handleReaderRenderComplete()
                        }
                    )
                    .background(viewModel.theme.readerBackgroundColor)
                } else {
                    VStack {
                        ProgressView()
                        Text("Loading chapter…")
                            .font(.footnote)
                            .foregroundStyle(.secondary)
                    }
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                }

                if let notice = viewModel.readerNotice ?? tocNotice {
                    HStack(alignment: .top, spacing: 10) {
                        Image(systemName: "info.circle")
                            .foregroundStyle(.blue)
                            .padding(.top, 2)

                        Text(notice)
                            .font(.footnote)
                            .foregroundStyle(.primary)
                            .multilineTextAlignment(.leading)

                        Spacer()

                        Button {
                            viewModel.readerNotice = nil
                            tocNotice = nil
                        } label: {
                            Image(systemName: "xmark.circle.fill")
                                .foregroundStyle(.secondary)
                                .imageScale(.small)
                        }
                        .buttonStyle(.plain)
                    }
                    .padding(10)
                    .background(Color(.systemFill))
                }

                Divider()

                controlBar
            }
            .navigationTitle(viewModel.currentDocumentTitle)
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    if !isRegularWidth {
                        Button {
                            showToc = true
                        } label: {
                            Label("TOC", systemImage: "list.bullet")
                        }
                    }
                }
                ToolbarItem(placement: .navigationBarTrailing) {
                    HStack {
                        Button {
                            viewModel.isSearchPresented = true
                            viewModel.clearSearch()
                        } label: {
                            Image(systemName: "magnifyingglass")
                        }

                        Button {
                            viewModel.isBookmarksPresented = true
                        } label: {
                            Image(systemName: "list.bullet.rectangle")
                        }
                        .accessibilityLabel("Bookmarks")

                        Button {
                            showAbout = true
                        } label: {
                            Image(systemName: "info.circle")
                        }
                    }
                }
            }
        }
    }

    private var tocSidebar: some View {
        VStack(alignment: .leading, spacing: 0) {
            List {
                Section {
                    VStack(alignment: .leading, spacing: 6) {
                        Text("Architrino Assembly Architecture Textbook")
                            .font(.headline)
                    }
                    .padding(.vertical, 4)
                }

                if let package = viewModel.package {
                    Section("Textbook") {
                        if package.tocPackage.tocRoot.resolvedChildren.isEmpty {
                            ForEach(Array(package.manifest.chapters.enumerated()), id: \.offset) { index, chapter in
                                Button {
                                    navigateFromTOC {
                                        viewModel.openChapter(by: chapter.id, anchor: nil)
                                    }
                                } label: {
                                    tocRowLabel(title: chapter.title, depth: 0)
                                    Spacer()
                                    Text(String(index + 1))
                                        .font(.caption)
                                        .foregroundStyle(.secondary)
                                }
                                .buttonStyle(.plain)
                            }
                        } else {
                            ForEach(viewModel.tocTopLevelNodes) { node in
                                tocHierarchyRow(node, depth: 0)
                            }
                        }
                    }
                }

                Section("Actions") {
                    Button {
                        viewModel.isSearchPresented = true
                        viewModel.clearSearch()
                    } label: {
                        Label("Search", systemImage: "magnifyingglass")
                    }

                    Button {
                        viewModel.isBookmarksPresented = true
                    } label: {
                        Label("Bookmarks", systemImage: "list.bullet.rectangle")
                    }

                    Button {
                        navigateFromTOC {
                            viewModel.openGlossary()
                        }
                    } label: {
                        Label("Glossary", systemImage: "book.pages")
                    }
                    .disabled(!viewModel.canOpenGlossary)
                }
            }
            .listStyle(.insetGrouped)
        }
        .navigationTitle("Textbook")
    }

    private func presentInitialTOCIfNeeded() {
        guard !didPresentInitialToc,
              !isRegularWidth,
              viewModel.isReady,
              viewModel.hasAnyContent() else {
            return
        }
        didPresentInitialToc = true
        showToc = true
    }

    private func navigateFromTOC(_ action: () -> Void) {
        tocNotice = nil
        viewModel.readerNotice = nil
        if !isRegularWidth && showToc {
            dismissTOCAfterRender = true
        }
        action()
    }

    private func dismissTOCImmediately() {
        dismissTOCAfterRender = false
        showToc = false
    }

    private func handleReaderRenderComplete() {
        guard dismissTOCAfterRender else { return }
        dismissTOCAfterRender = false
        showToc = false
    }

    private func tocHierarchyRow(_ node: TextbookTOCNode, depth: Int) -> AnyView {
        let route = viewModel.resolveTOCTarget(for: node)
        let isCurrentChapter = {
            if case .chapter(let chapterId, _) = route {
                return chapterId == viewModel.currentChapterId
            }
            return false
        }()
        let isExternalRoute = {
            if case .external = route { return true }
            return false
        }()
        let externalURL: URL? = {
            if case .external(let url) = route { return url }
            return nil
        }()

        return AnyView(
            VStack(alignment: .leading, spacing: 0) {
                if isExternalRoute {
                    HStack(spacing: 10) {
                        tocRouteIcon(for: route)

                        tocRowLabel(title: node.title, depth: depth)

                        Spacer()

                        Button {
                            if let externalURL {
                                openURL(externalURL)
                            }
                            if !isRegularWidth {
                                dismissTOCImmediately()
                            }
                        } label: {
                            Image(systemName: "safari")
                                .foregroundStyle(.blue)
                                .imageScale(.small)
                                .accessibilityLabel("Open scene in web app")
                        }
                        .buttonStyle(.plain)

                        if isCurrentChapter {
                            Image(systemName: "checkmark")
                                .font(.caption)
                                .foregroundStyle(.secondary)
                        }
                    }
                    .contentShape(Rectangle())
                    .padding(.vertical, 2)
                    .padding(.horizontal, 2)
                    .onTapGesture {
                        viewModel.readerNotice = nil
                        tocNotice = "“\(node.title)” is a web-app scene. Open in Safari to view the interactive version."
                        if !isRegularWidth {
                            dismissTOCImmediately()
                        }
                    }
                    .background(Color.clear)
                } else {
                    Button {
                        switch route {
                        case .chapter(let chapterId, let anchor):
                            navigateFromTOC {
                                viewModel.openChapter(by: chapterId, anchor: anchor)
                            }
                        case .external(let external):
                            tocNotice = nil
                            viewModel.readerNotice = nil
                            openURL(external)
                            if !isRegularWidth {
                                dismissTOCImmediately()
                            }
                        case .none:
                            break
                        }
                    } label: {
                        HStack(spacing: 10) {
                            tocRouteIcon(for: route)

                            tocRowLabel(title: node.title, depth: depth)

                            Spacer()

                            if isCurrentChapter {
                                Image(systemName: "checkmark")
                                    .font(.caption)
                                    .foregroundStyle(.secondary)
                            }
                        }
                        .contentShape(Rectangle())
                        .padding(.vertical, 2)
                        .padding(.horizontal, 2)
                    }
                    .contentShape(Rectangle())
                    .padding(.vertical, 2)
                    .padding(.horizontal, 2)
                    .buttonStyle(.plain)
                }

                ForEach(node.resolvedChildren) { child in
                    tocHierarchyRow(child, depth: depth + 1)
                }
            }
        )
    }

    private func tocRouteIcon(for route: ReaderViewModel.TOCRoute) -> some View {
        Image(systemName: tocRouteIconName(for: route))
            .font(.caption)
            .foregroundStyle(.secondary)
            .frame(width: 22, height: 18, alignment: .center)
    }

    private func tocRouteIconName(for route: ReaderViewModel.TOCRoute) -> String {
        switch route {
        case .chapter:
            return "book"
        case .external:
            return "safari"
        case .none:
            return "link"
        }
    }

    private func tocRowLabel(title: String, depth: Int) -> some View {
        HStack(spacing: 4) {
            Text(title)
                .font(.custom("HelveticaNeue", size: 17, relativeTo: .body))
                .foregroundStyle(.primary)
                .lineLimit(2)
                .multilineTextAlignment(.leading)
                .padding(.leading, CGFloat(depth * 14))
        }
    }

    private var controlBar: some View {
        HStack {
            fontSizeControl
            readerSettingsControl

            Button {
                viewModel.toggleCurrentBookmark()
            } label: {
                Image(systemName: viewModel.isCurrentPositionBookmarked ? "bookmark.fill" : "bookmark")
            }
            .disabled(viewModel.currentChapter == nil)
            .accessibilityLabel(viewModel.isCurrentPositionBookmarked ? "Remove bookmark" : "Add bookmark")

            Text(viewModel.readingProgressLabel)
                .font(.caption2)
                .foregroundStyle(.secondary)
                .lineLimit(1)
                .minimumScaleFactor(0.75)
                .frame(maxWidth: 92, alignment: .leading)
                .accessibilityLabel("Reading progress \(viewModel.readingProgressLabel)")

            Spacer()

            Button {
                viewModel.goToPreviousChapter()
            } label: {
                Label("Previous", systemImage: "chevron.left")
            }
            .disabled(!viewModel.canGoPreviousChapter())

            Button {
                viewModel.goToNextChapter()
            } label: {
                Label("Next", systemImage: "chevron.right")
            }
            .disabled(!viewModel.canGoNextChapter())
        }
        .font(.subheadline)
        .padding(10)
        .background(.regularMaterial)
    }

    private var readerSettingsControl: some View {
        Button {
            showReaderSettings = true
        } label: {
            HStack(spacing: 4) {
                Text("Aa")
                    .font(.system(size: 16, weight: .semibold))
                Circle()
                    .fill(viewModel.theme.swatchColor)
                    .overlay(
                        Circle()
                            .stroke(.primary.opacity(0.25), lineWidth: 1)
                    )
                    .frame(width: 12, height: 12)
            }
        }
        .frame(width: 46, height: 28)
        .accessibilityLabel("Reading settings")
    }

    private var fontSizeControl: some View {
        HStack(spacing: 6) {
            Button {
                viewModel.decreaseFont()
            } label: {
                Text("A")
                    .font(.system(size: 13, weight: .semibold))
                    .frame(width: 20, height: 28)
            }
            .disabled(viewModel.fontScale <= 0.85)
            .accessibilityLabel("Decrease text size")

            Text("A")
                .font(.system(size: 18, weight: .semibold))
                .foregroundStyle(.secondary)
                .frame(width: 20, height: 28)
                .accessibilityHidden(true)

            Button {
                viewModel.increaseFont()
            } label: {
                Text("A")
                    .font(.system(size: 24, weight: .semibold))
                    .frame(width: 20, height: 28)
            }
            .disabled(viewModel.fontScale >= 1.45)
            .accessibilityLabel("Increase text size")
        }
        .frame(width: 78, alignment: .leading)
    }
}

private extension ReaderTheme {
    var displayName: String {
        switch self {
        case .architrinoPurple:
            return "Purple"
        case .light:
            return "Light"
        case .warm:
            return "Warm"
        case .dark:
            return "Dark"
        }
    }

    var swatchColor: Color {
        switch self {
        case .architrinoPurple:
            return Color(red: 75 / 255, green: 0, blue: 130 / 255)
        case .light:
            return Color(red: 253 / 255, green: 253 / 255, blue: 253 / 255)
        case .warm:
            return Color(red: 244 / 255, green: 236 / 255, blue: 216 / 255)
        case .dark:
            return Color(red: 15 / 255, green: 23 / 255, blue: 42 / 255)
        }
    }

    var readerBackgroundColor: Color {
        swatchColor
    }
}

private extension ReaderLineSpacing {
    var displayName: String {
        switch self {
        case .compact:
            return "Compact"
        case .standard:
            return "Normal"
        case .open:
            return "Open"
        }
    }
}

private extension ReaderMarginWidth {
    var displayName: String {
        switch self {
        case .narrow:
            return "Narrow"
        case .standard:
            return "Normal"
        case .wide:
            return "Wide"
        }
    }
}

private struct ReaderSettingsSheet: View {
    @ObservedObject var viewModel: ReaderViewModel
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            List {
                Section("Theme") {
                    HStack(spacing: 14) {
                        ForEach(ReaderTheme.allCases) { theme in
                            Button {
                                viewModel.setTheme(theme)
                            } label: {
                                VStack(spacing: 6) {
                                    ZStack(alignment: .bottomTrailing) {
                                        Circle()
                                            .fill(theme.swatchColor)
                                            .overlay(
                                                Circle()
                                                    .stroke(.primary.opacity(0.22), lineWidth: 1)
                                            )
                                            .frame(width: 34, height: 34)
                                        if viewModel.theme == theme {
                                            Image(systemName: "checkmark.circle.fill")
                                                .font(.caption)
                                                .foregroundStyle(.blue)
                                                .background(Circle().fill(Color(.systemBackground)))
                                        }
                                    }
                                    Text(theme.displayName)
                                        .font(.caption2)
                                        .lineLimit(1)
                                }
                                .frame(width: 58)
                            }
                            .buttonStyle(.plain)
                        }
                    }
                    .padding(.vertical, 4)
                }

                Section("Text") {
                    HStack(spacing: 16) {
                        Button {
                            viewModel.decreaseFont()
                        } label: {
                            Text("A")
                                .font(.system(size: 15, weight: .semibold))
                                .frame(width: 36, height: 36)
                        }
                        .disabled(viewModel.fontScale <= 0.85)
                        .accessibilityLabel("Decrease text size")

                        Slider(
                            value: Binding(
                                get: { viewModel.fontScale },
                                set: { viewModel.setFontScale($0) }
                            ),
                            in: 0.85...1.45,
                            step: 0.04
                        )

                        Button {
                            viewModel.increaseFont()
                        } label: {
                            Text("A")
                                .font(.system(size: 24, weight: .semibold))
                                .frame(width: 36, height: 36)
                        }
                        .disabled(viewModel.fontScale >= 1.45)
                        .accessibilityLabel("Increase text size")
                    }
                }

                Section("Line Spacing") {
                    Picker(
                        "Line Spacing",
                        selection: Binding(
                            get: { viewModel.lineSpacing },
                            set: { viewModel.setLineSpacing($0) }
                        )
                    ) {
                        ForEach(ReaderLineSpacing.allCases) { spacing in
                            Text(spacing.displayName).tag(spacing)
                        }
                    }
                    .pickerStyle(.segmented)
                }

                Section("Margins") {
                    Picker(
                        "Margins",
                        selection: Binding(
                            get: { viewModel.marginWidth },
                            set: { viewModel.setMarginWidth($0) }
                        )
                    ) {
                        ForEach(ReaderMarginWidth.allCases) { margin in
                            Text(margin.displayName).tag(margin)
                        }
                    }
                    .pickerStyle(.segmented)
                }

                Section {
                    Button("Reset Reading Settings") {
                        viewModel.resetReaderAppearance()
                    }
                }
            }
            .navigationTitle("Reading")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Done") {
                        dismiss()
                    }
                }
            }
        }
    }
}

private struct SearchSheet: View {
    @ObservedObject var viewModel: ReaderViewModel
    @State private var query = ""

    var body: some View {
        NavigationStack {
            List {
                if viewModel.searchResults.isEmpty && !query.isEmpty {
                    Text("No matching sections.")
                        .foregroundStyle(.secondary)
                }

                ForEach(viewModel.searchResults) { result in
                    Button {
                        viewModel.openSearchResult(result)
                    } label: {
                        VStack(alignment: .leading, spacing: 4) {
                            Text(result.chapterTitle)
                                .font(.subheadline)
                                .fontWeight(.medium)
                            SearchSnippetPreview(markdownText: result.renderedPreviewMarkdown)
                                .frame(height: 74)
                                .clipped()
                                .allowsHitTesting(false)
                        }
                        .padding(.vertical, 2)
                    }
                    .buttonStyle(.plain)
                }
            }
            .searchable(text: $query, placement: .navigationBarDrawer(displayMode: .always), prompt: "Find section")
            .onChange(of: query) { _, newValue in
                viewModel.search(newValue)
            }
            .navigationTitle("Search")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Done") {
                        viewModel.isSearchPresented = false
                    }
                }
            }
        }
    }
}

private struct BookmarksSheet: View {
    @ObservedObject var viewModel: ReaderViewModel

    var body: some View {
        NavigationStack {
            List {
                if viewModel.bookmarks.isEmpty {
                    Text("No bookmarks yet.")
                        .foregroundStyle(.secondary)
                }

                ForEach(viewModel.bookmarks) { bookmark in
                    HStack {
                        Button {
                            viewModel.openBookmark(bookmark)
                        } label: {
                            VStack(alignment: .leading, spacing: 4) {
                                Text(bookmark.chapterTitle)
                                    .font(.subheadline)
                                    .fontWeight(.medium)
                                Text(bookmark.displayLabel)
                                    .font(.caption)
                                    .foregroundStyle(.secondary)
                            }
                        }
                        .buttonStyle(.plain)

                        Spacer()

                        Button(role: .destructive) {
                            viewModel.removeBookmark(bookmark)
                        } label: {
                            Image(systemName: "trash")
                                .foregroundStyle(.red)
                        }
                    }
                }
            }
            .navigationTitle("Bookmarks")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Done") {
                        viewModel.isBookmarksPresented = false
                    }
                }
            }
        }
    }
}

private struct AboutSheet: View {
    let packageVersion: String

    @Environment(\.dismiss) private var dismiss

    private let websiteURL = URL(string: "https://architrino.com")!
    private let repositoryURL = URL(string: "https://github.com/jmarkmorris/architrino")!

    var body: some View {
        NavigationStack {
            List {
                Section {
                    VStack(alignment: .leading, spacing: 8) {
                        Text("Architrino Assembly Architecture Textbook")
                            .font(.headline)
                        Text("Reader for the bundled textbook package.")
                            .font(.subheadline)
                            .foregroundStyle(.secondary)
                    }
                    .padding(.vertical, 4)
                }

                Section("Links") {
                    Link(destination: websiteURL) {
                        Label("architrino.com", systemImage: "safari")
                    }

                    Link(destination: repositoryURL) {
                        Label("GitHub repository", systemImage: "chevron.left.forwardslash.chevron.right")
                    }
                }

                Section {
                    LabeledContent("Package version", value: packageVersion)
                }
            }
            .navigationTitle("About")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Done") {
                        dismiss()
                    }
                }
            }
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
