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
            tocFullScreen
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
                    ZStack {
                        ReaderWebView(
                            renderCommand: $viewModel.renderCommand,
                            anchorCommand: $viewModel.anchorCommand,
                            fontScale: viewModel.fontScale,
                            theme: viewModel.theme,
                            lineSpacing: viewModel.lineSpacing,
                            marginWidth: viewModel.marginWidth,
                            onLinkTap: { payload in
                                if let url = viewModel.handleWebLink(message: payload) {
                                    openURL(url)
                                }
                            },
                            onRenderComplete: { payload in
                                viewModel.markRenderComplete(message: payload)
                            }
                        )

                        if viewModel.isRendering {
                            readerRenderOverlay
                        }
                    }
                    .background(viewModel.theme.readerBackgroundColor)
                } else if viewModel.isReady && viewModel.hasAnyContent() {
                    readerSelectionPlaceholder
                } else {
                    VStack {
                        ProgressView()
                        Text("Loading chapter...")
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
                            viewModel.presentSearch()
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
            .toolbarBackground(viewModel.theme.readerBackgroundColor, for: .navigationBar)
            .toolbarBackground(.visible, for: .navigationBar)
            .toolbarColorScheme(viewModel.theme.readerToolbarColorScheme, for: .navigationBar)
            .tint(viewModel.theme.readerAccentColor)
        }
        .preferredColorScheme(viewModel.theme.readerToolbarColorScheme)
    }

    private var readerSelectionPlaceholder: some View {
        ZStack {
            viewModel.theme.readerBackgroundColor.ignoresSafeArea()
            Text("Select a section from the table of contents.")
                .font(.footnote)
                .foregroundStyle(viewModel.theme.readerSecondaryTextColor)
                .multilineTextAlignment(.center)
                .padding()
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }

    private var readerRenderOverlay: some View {
        ZStack {
            viewModel.theme.readerBackgroundColor
            ProgressView()
                .tint(viewModel.theme.readerPrimaryTextColor)
        }
        .ignoresSafeArea(edges: .top)
    }

    private var tocFullScreen: some View {
        GeometryReader { proxy in
            VStack(spacing: 0) {
                Color.clear
                    .frame(height: max(proxy.safeAreaInsets.top + 8, 44))

                tocSidebar
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .background(viewModel.theme.readerBackgroundColor.ignoresSafeArea())
        }
        .preferredColorScheme(viewModel.theme.readerToolbarColorScheme)
    }

    private var tocSidebar: some View {
        VStack(alignment: .leading, spacing: 0) {
            List {
                Section {
                    Text("Architrino Assembly Architecture Textbook")
                        .font(.headline)
                        .foregroundStyle(viewModel.theme.readerPrimaryTextColor)
                        .padding(.vertical, 2)
                        .listRowInsets(EdgeInsets(top: 0, leading: 10, bottom: 8, trailing: 10))

                    if let package = viewModel.package {
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
                                        .foregroundStyle(viewModel.theme.readerSecondaryTextColor)
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
                .listRowBackground(Color.clear)
                .listRowSeparatorTint(viewModel.theme.readerSeparatorColor)
                .listRowInsets(EdgeInsets(top: 0, leading: 8, bottom: 0, trailing: 8))

                Section {
                    Button {
                        viewModel.presentSearch()
                    } label: {
                        Label("Search", systemImage: "magnifyingglass")
                            .foregroundStyle(viewModel.theme.readerPrimaryTextColor)
                    }

                    Button {
                        viewModel.isBookmarksPresented = true
                    } label: {
                        Label("Bookmarks", systemImage: "list.bullet.rectangle")
                            .foregroundStyle(viewModel.theme.readerPrimaryTextColor)
                    }

                    Button {
                        navigateFromTOC {
                            viewModel.openGlossary()
                        }
                    } label: {
                        Label("Glossary", systemImage: "book.pages")
                            .foregroundStyle(
                                viewModel.canOpenGlossary
                                    ? viewModel.theme.readerPrimaryTextColor
                                    : viewModel.theme.readerSecondaryTextColor
                            )
                    }
                    .disabled(!viewModel.canOpenGlossary)
                } header: {
                    tocSectionHeader("Actions")
                }
                .listRowBackground(Color.clear)
                .listRowSeparatorTint(viewModel.theme.readerSeparatorColor)
                .listRowInsets(EdgeInsets(top: 0, leading: 8, bottom: 0, trailing: 8))
            }
            .listStyle(.plain)
            .listSectionSpacing(8)
            .contentMargins(.top, 8, for: .scrollContent)
            .contentMargins(.horizontal, 0, for: .scrollContent)
            .scrollContentBackground(.hidden)
            .background(viewModel.theme.readerBackgroundColor.ignoresSafeArea())
        }
        .toolbarBackground(viewModel.theme.readerBackgroundColor, for: .navigationBar)
        .toolbarBackground(.visible, for: .navigationBar)
        .toolbarColorScheme(viewModel.theme.readerToolbarColorScheme, for: .navigationBar)
        .tint(viewModel.theme.readerAccentColor)
    }

    private func tocSectionHeader(_ title: String) -> some View {
        Text(title)
            .font(.caption)
            .fontWeight(.semibold)
            .foregroundStyle(viewModel.theme.readerSecondaryTextColor)
            .textCase(.uppercase)
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
        action()
        if !isRegularWidth && showToc {
            dismissTOCImmediately()
        }
    }

    private func dismissTOCImmediately() {
        showToc = false
    }

    private func tocHierarchyRow(_ node: TextbookTOCNode, depth: Int) -> AnyView {
        let route = viewModel.resolveTOCTarget(for: node)

        return AnyView(
            VStack(alignment: .leading, spacing: 0) {
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
                    HStack(spacing: 8) {
                        tocRouteIcon(for: route)

                        tocRowLabel(title: node.title, depth: depth)

                        Spacer()
                    }
                    .contentShape(Rectangle())
                    .padding(.vertical, 2)
                }
                .contentShape(Rectangle())
                .padding(.vertical, 2)
                .buttonStyle(.plain)

                ForEach(Array(node.resolvedSections.enumerated()), id: \.offset) { _, section in
                    tocSectionRow(section, in: node, depth: depth + 1)
                }

                ForEach(node.resolvedChildren) { child in
                    tocHierarchyRow(child, depth: depth + 1)
                }
            }
        )
    }

    private func tocSectionRow(_ section: TextbookTOCSection, in node: TextbookTOCNode, depth: Int) -> AnyView {
        let route = viewModel.resolveTOCSectionTarget(section, in: node)

        return AnyView(
            VStack(alignment: .leading, spacing: 0) {
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
                    HStack(spacing: 8) {
                        tocRouteIcon(for: route)

                        tocRowLabel(title: tocSectionTitle(section), depth: depth)

                        Spacer()
                    }
                    .contentShape(Rectangle())
                    .padding(.vertical, 2)
                }
                .contentShape(Rectangle())
                .padding(.vertical, 2)
                .buttonStyle(.plain)

                ForEach(Array(section.resolvedChildren.enumerated()), id: \.offset) { _, child in
                    tocSectionRow(child, in: node, depth: depth + 1)
                }
            }
        )
    }

    private func tocSectionTitle(_ section: TextbookTOCSection) -> String {
        for value in [section.title, section.markdownSection, section.sectionKey] {
            if let title = value?.trimmingCharacters(in: .whitespacesAndNewlines),
               !title.isEmpty {
                return title
            }
        }
        return "Section"
    }

    private func tocRouteIcon(for route: ReaderViewModel.TOCRoute) -> some View {
        Image(systemName: tocRouteIconName(for: route))
            .font(.caption)
            .foregroundStyle(viewModel.theme.readerSecondaryTextColor)
            .frame(width: 20, height: 18, alignment: .center)
    }

    private func tocRouteIconName(for route: ReaderViewModel.TOCRoute) -> String {
        switch route {
        case .chapter:
            return "book"
        case .external:
            return "link"
        case .none:
            return "link"
        }
    }

    private func tocRowLabel(title: String, depth: Int) -> some View {
        HStack(spacing: 4) {
            Text(title)
                .font(.custom("HelveticaNeue", size: 17, relativeTo: .body))
                .foregroundStyle(viewModel.theme.readerPrimaryTextColor)
                .lineLimit(2)
                .multilineTextAlignment(.leading)
                .padding(.leading, CGFloat(depth * 12))
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
                .foregroundStyle(viewModel.theme.readerControlBarSecondaryTextColor)
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
        .tint(viewModel.theme.readerControlBarAccentColor)
        .padding(10)
        .background(viewModel.theme.readerControlBarBackgroundColor.ignoresSafeArea(edges: .bottom))
    }

    private var readerSettingsControl: some View {
        Button {
            showReaderSettings = true
        } label: {
            HStack(spacing: 4) {
                Image(systemName: "gearshape")
                    .font(.system(size: 17, weight: .semibold))
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
            .accessibilityLabel("Decrease text size")

            Button {
                viewModel.setFontScale(1.0)
            } label: {
                Text("A")
                    .font(.system(size: 18, weight: .semibold))
                    .frame(width: 20, height: 28)
            }
            .accessibilityLabel("Reset text size")

            Button {
                viewModel.increaseFont()
            } label: {
                Text("A")
                    .font(.system(size: 24, weight: .semibold))
                    .frame(width: 20, height: 28)
            }
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

    var readerPrimaryTextColor: Color {
        switch self {
        case .architrinoPurple, .dark:
            return .white
        case .light, .warm:
            return .primary
        }
    }

    var readerSecondaryTextColor: Color {
        switch self {
        case .architrinoPurple, .dark:
            return .white.opacity(0.72)
        case .light, .warm:
            return .secondary
        }
    }

    var readerAccentColor: Color {
        switch self {
        case .architrinoPurple, .dark:
            return .white
        case .light, .warm:
            return .blue
        }
    }

    var readerSeparatorColor: Color {
        switch self {
        case .architrinoPurple, .dark:
            return .white.opacity(0.18)
        case .light, .warm:
            return Color(.separator)
        }
    }

    var readerToolbarColorScheme: ColorScheme? {
        switch self {
        case .architrinoPurple, .dark:
            return .dark
        case .light, .warm:
            return .light
        }
    }

    var readerControlBarBackgroundColor: Color {
        switch self {
        case .architrinoPurple:
            return Color(red: 216 / 255, green: 196 / 255, blue: 255 / 255)
        case .light:
            return Color(.systemBackground)
        case .warm:
            return Color(red: 248 / 255, green: 241 / 255, blue: 225 / 255)
        case .dark:
            return Color(red: 24 / 255, green: 31 / 255, blue: 48 / 255)
        }
    }

    var readerControlBarAccentColor: Color {
        switch self {
        case .architrinoPurple:
            return Color(red: 75 / 255, green: 0, blue: 130 / 255)
        case .light, .warm:
            return .blue
        case .dark:
            return .white
        }
    }

    var readerControlBarSecondaryTextColor: Color {
        switch self {
        case .architrinoPurple:
            return Color(red: 75 / 255, green: 0, blue: 130 / 255).opacity(0.58)
        case .light, .warm:
            return .secondary
        case .dark:
            return .white.opacity(0.65)
        }
    }

    var readerSearchResultBackgroundColor: Color {
        switch self {
        case .architrinoPurple:
            return .white.opacity(0.12)
        case .light:
            return Color(red: 245 / 255, green: 247 / 255, blue: 251 / 255)
        case .warm:
            return Color(red: 255 / 255, green: 248 / 255, blue: 232 / 255)
        case .dark:
            return .white.opacity(0.08)
        }
    }

    var readerSearchControlBackgroundColor: Color {
        switch self {
        case .architrinoPurple:
            return .white.opacity(0.12)
        case .light:
            return Color(red: 245 / 255, green: 247 / 255, blue: 251 / 255)
        case .warm:
            return Color(red: 255 / 255, green: 248 / 255, blue: 232 / 255)
        case .dark:
            return .white.opacity(0.08)
        }
    }

    var readerSearchControlBorderColor: Color {
        switch self {
        case .architrinoPurple, .dark:
            return .white.opacity(0.22)
        case .light, .warm:
            return Color(.separator)
        }
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
    @FocusState private var isSearchFieldFocused: Bool

    var body: some View {
        ZStack {
            viewModel.theme.readerBackgroundColor.ignoresSafeArea()

            VStack(spacing: 0) {
                searchHeader
                searchResults
            }
        }
        .preferredColorScheme(viewModel.theme.readerToolbarColorScheme)
        .onAppear {
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.25) {
                isSearchFieldFocused = true
            }
        }
        .onChange(of: query) { _, newValue in
            viewModel.search(newValue)
        }
    }

    private var searchHeader: some View {
        HStack(spacing: 12) {
            HStack(spacing: 10) {
                Image(systemName: "magnifyingglass")
                    .font(.system(size: 22, weight: .regular))
                    .foregroundStyle(viewModel.theme.readerPrimaryTextColor)

                TextField("Find section", text: $query)
                    .textInputAutocapitalization(.never)
                    .autocorrectionDisabled(true)
                    .submitLabel(.search)
                    .focused($isSearchFieldFocused)
                    .foregroundStyle(viewModel.theme.readerPrimaryTextColor)
                    .tint(viewModel.theme.readerPrimaryTextColor)

                if !query.isEmpty {
                    Button {
                        query = ""
                    } label: {
                        Image(systemName: "xmark.circle.fill")
                            .font(.system(size: 18, weight: .semibold))
                            .foregroundStyle(viewModel.theme.readerPrimaryTextColor)
                    }
                    .accessibilityLabel("Clear search")
                }
            }
            .padding(.horizontal, 14)
            .frame(height: 50)
            .background(viewModel.theme.readerSearchControlBackgroundColor)
            .overlay(
                Capsule()
                    .stroke(viewModel.theme.readerSearchControlBorderColor, lineWidth: 1)
            )
            .clipShape(Capsule())

            Button {
                viewModel.isSearchPresented = false
            } label: {
                Image(systemName: "xmark")
                    .font(.system(size: 28, weight: .regular))
                    .frame(width: 50, height: 50)
                    .foregroundStyle(viewModel.theme.readerPrimaryTextColor)
                    .background(viewModel.theme.readerSearchControlBackgroundColor)
                    .overlay(
                        Circle()
                            .stroke(viewModel.theme.readerSearchControlBorderColor, lineWidth: 1)
                    )
                    .clipShape(Circle())
            }
            .accessibilityLabel("Close search")
        }
        .padding(.horizontal, 14)
        .padding(.top, 14)
        .padding(.bottom, 16)
    }

    private var searchResults: some View {
        ScrollView {
            LazyVStack(spacing: 12) {
                if viewModel.isSearchIndexLoading {
                    searchStatusText("Preparing search...")
                } else if viewModel.searchResults.isEmpty && !query.isEmpty {
                    searchStatusText("No matching sections.")
                }

                ForEach(viewModel.searchResults) { result in
                    Button {
                        viewModel.openSearchResult(result)
                    } label: {
                        SearchResultRow(result: result, theme: viewModel.theme)
                    }
                    .buttonStyle(.plain)
                }
            }
            .padding(.horizontal, 14)
            .padding(.bottom, 24)
        }
        .scrollDismissesKeyboard(.interactively)
    }

    private func searchStatusText(_ value: String) -> some View {
        Text(value)
            .font(.subheadline)
            .foregroundStyle(viewModel.theme.readerSecondaryTextColor)
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding(.horizontal, 14)
            .padding(.vertical, 12)
    }
}

private struct SearchResultRow: View {
    let result: TextbookSearchEntry
    let theme: ReaderTheme

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text(result.chapterTitle)
                .font(.subheadline)
                .fontWeight(.semibold)
                .foregroundStyle(theme.readerPrimaryTextColor)

            SearchSnippetPreview(markdownText: result.renderedPreviewMarkdown, theme: theme)
                .frame(height: 78)
                .clipped()
                .allowsHitTesting(false)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(.horizontal, 14)
        .padding(.vertical, 12)
        .background(theme.readerSearchResultBackgroundColor)
        .clipShape(RoundedRectangle(cornerRadius: 8, style: .continuous))
        .contentShape(RoundedRectangle(cornerRadius: 8, style: .continuous))
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
