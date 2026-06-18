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
    @State private var expandedTOCGroupID: String?

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
            AboutSheet(
                packageVersion: viewModel.packageVersionLabel,
                packageDate: viewModel.packageDateLabel,
                theme: viewModel.theme
            )
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
        .onChange(of: showToc) { _, isPresented in
            if isPresented {
                resetTOCExpansion()
            }
        }
    }

    private var readerDetail: some View {
        NavigationStack {
            VStack(spacing: 0) {
                if !viewModel.hasAnyContent() && viewModel.isReady {
                    VStack(spacing: 10) {
                        Text("No content available in this app bundle.")
                            .foregroundStyle(viewModel.theme.readerPrimaryTextColor)
                            .multilineTextAlignment(.center)
                        Text("Expected chapter content files were not found in GeneratedTextbookPackage.")
                            .font(.footnote)
                            .foregroundStyle(viewModel.theme.readerSecondaryTextColor)
                    }
                    .padding()
                } else if let error = viewModel.errorMessage, viewModel.package == nil {
                    VStack(spacing: 10) {
                        Text("Reader startup failed")
                            .font(.headline)
                            .foregroundStyle(viewModel.theme.readerPrimaryTextColor)
                        Text(error)
                            .font(.footnote)
                            .foregroundStyle(viewModel.theme.readerSecondaryTextColor)
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
                            .tint(viewModel.theme.readerPrimaryTextColor)
                        Text("Loading chapter...")
                            .font(.footnote)
                            .foregroundStyle(viewModel.theme.readerSecondaryTextColor)
                    }
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                }

                if let notice = viewModel.readerNotice ?? tocNotice {
                    HStack(alignment: .top, spacing: 10) {
                        Image(systemName: "info.circle")
                            .foregroundStyle(viewModel.theme.readerAccentColor)
                            .padding(.top, 2)

                        Text(notice)
                            .font(.footnote)
                            .foregroundStyle(viewModel.theme.readerPrimaryTextColor)
                            .multilineTextAlignment(.leading)

                        Spacer()

                        Button {
                            viewModel.readerNotice = nil
                            tocNotice = nil
                        } label: {
                            Image(systemName: "xmark.circle.fill")
                                .foregroundStyle(viewModel.theme.readerSecondaryTextColor)
                                .imageScale(.small)
                        }
                        .buttonStyle(.plain)
                    }
                    .padding(10)
                    .background(viewModel.theme.readerSearchResultBackgroundColor)
                }

                Divider()
                    .overlay(viewModel.theme.readerSeparatorColor)

                controlBar
            }
            .background(viewModel.theme.readerBackgroundColor.ignoresSafeArea())
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
                tocDismissHeader
                    .padding(.top, proxy.safeAreaInsets.top)

                tocSidebar

                Divider()
                    .overlay(viewModel.theme.readerSeparatorColor)

                tocControlBar
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .background(viewModel.theme.readerBackgroundColor.ignoresSafeArea())
        }
        .preferredColorScheme(viewModel.theme.readerToolbarColorScheme)
    }

    private var tocDismissHeader: some View {
        HStack {
            Spacer()

            Button {
                dismissTOCImmediately()
            } label: {
                Image(systemName: "xmark")
                    .font(.system(size: 18, weight: .semibold))
                    .foregroundStyle(viewModel.theme.readerPrimaryTextColor)
                    .frame(width: 44, height: 44)
                    .background(
                        Circle()
                            .fill(viewModel.theme.readerSearchControlBackgroundColor)
                    )
            }
            .accessibilityLabel("Close table of contents")
        }
        .padding(.horizontal, 14)
        .padding(.bottom, 6)
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
        resetTOCExpansion()
        action()
        if !isRegularWidth && showToc {
            dismissTOCImmediately()
        }
    }

    private func dismissTOCImmediately() {
        resetTOCExpansion()
        showToc = false
    }

    private func resetTOCExpansion() {
        expandedTOCGroupID = nil
    }

    private func openFirstChapterFromTOC() {
        guard let chapter = viewModel.chapter(at: 0) else { return }
        navigateFromTOC {
            viewModel.openChapter(by: chapter.id, anchor: nil)
        }
    }

    private func tocHierarchyRow(_ node: TextbookTOCNode, depth: Int) -> AnyView {
        let route = viewModel.resolveTOCTarget(for: node)

        return AnyView(
            VStack(alignment: .leading, spacing: 0) {
                tocNavigationRow(
                    title: node.title,
                    route: route,
                    depth: depth,
                    expansionID: nil,
                    isExpanded: false,
                    hasExpandableContent: false
                )

                if depth == 0 {
                    ForEach(node.resolvedChildren) { child in
                        tocSecondLevelNodeRow(child, parentID: node.id)
                    }

                    ForEach(Array(node.resolvedSections.enumerated()), id: \.offset) { index, section in
                        tocSectionRow(section, in: node, depth: depth + 1, stableID: "\(node.id)::top-section-\(index)")
                    }
                }
            }
        )
    }

    private func tocSecondLevelNodeRow(_ node: TextbookTOCNode, parentID: String) -> some View {
        let route = viewModel.resolveTOCTarget(for: node)
        let expansionID = "\(parentID)::\(node.id)"
        let isExpanded = expandedTOCGroupID == expansionID
        let hasExpandableContent = !node.resolvedSections.isEmpty || !node.resolvedChildren.isEmpty

        return VStack(alignment: .leading, spacing: 0) {
            tocNavigationRow(
                title: node.title,
                route: route,
                depth: 1,
                expansionID: expansionID,
                isExpanded: isExpanded,
                hasExpandableContent: hasExpandableContent
            )

            if isExpanded {
                ForEach(node.resolvedChildren) { child in
                    tocLeafNodeRow(child, depth: 2)
                }

                ForEach(Array(node.resolvedSections.enumerated()), id: \.offset) { index, section in
                    tocSectionRow(section, in: node, depth: 2, stableID: "\(expansionID)::section-\(index)")
                }
            }
        }
    }

    private func tocLeafNodeRow(_ node: TextbookTOCNode, depth: Int) -> some View {
        tocNavigationRow(
            title: node.title,
            route: viewModel.resolveTOCTarget(for: node),
            depth: depth,
            expansionID: nil,
            isExpanded: false,
            hasExpandableContent: false
        )
    }

    private func tocSectionRow(
        _ section: TextbookTOCSection,
        in node: TextbookTOCNode,
        depth: Int,
        stableID: String
    ) -> AnyView {
        let route = viewModel.resolveTOCSectionTarget(section, in: node)

        return AnyView(
            VStack(alignment: .leading, spacing: 0) {
                tocNavigationRow(
                    title: tocSectionTitle(section),
                    route: route,
                    depth: depth,
                    expansionID: nil,
                    isExpanded: false,
                    hasExpandableContent: false
                )

                if expandedTOCGroupID == stableID {
                    ForEach(Array(section.resolvedChildren.enumerated()), id: \.offset) { index, child in
                        tocSectionRow(child, in: node, depth: depth + 1, stableID: "\(stableID)::child-\(index)")
                    }
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

    private func tocNavigationRow(
        title: String,
        route: ReaderViewModel.TOCRoute,
        depth: Int,
        expansionID: String?,
        isExpanded: Bool,
        hasExpandableContent: Bool
    ) -> some View {
        HStack(spacing: 8) {
            Button {
                navigateTOCRoute(route, fallbackExpansionID: expansionID)
            } label: {
                HStack(spacing: 8) {
                    tocRouteIcon(for: route)

                    tocRowLabel(title: title, depth: depth)

                    Spacer(minLength: 0)
                }
                .contentShape(Rectangle())
            }
            .buttonStyle(.plain)

            if hasExpandableContent, let expansionID {
                Button {
                    toggleTOCExpansion(expansionID)
                } label: {
                    Image(systemName: isExpanded ? "minus.circle" : "plus.circle")
                        .font(.system(size: 18, weight: .semibold))
                        .foregroundStyle(viewModel.theme.readerAccentColor)
                        .frame(width: 34, height: 34)
                }
                .buttonStyle(.plain)
                .accessibilityLabel(isExpanded ? "Collapse section" : "Expand section")
            }
        }
        .contentShape(Rectangle())
        .padding(.vertical, 4)
    }

    private func navigateTOCRoute(_ route: ReaderViewModel.TOCRoute, fallbackExpansionID: String?) {
        switch route {
        case .chapter(let chapterId, let anchor):
            navigateFromTOC {
                viewModel.openChapter(by: chapterId, anchor: anchor)
            }
        case .external(let external):
            tocNotice = nil
            viewModel.readerNotice = nil
            resetTOCExpansion()
            openURL(external)
            if !isRegularWidth {
                dismissTOCImmediately()
            }
        case .none:
            if let fallbackExpansionID {
                toggleTOCExpansion(fallbackExpansionID)
            }
        }
    }

    private func toggleTOCExpansion(_ id: String) {
        expandedTOCGroupID = expandedTOCGroupID == id ? nil : id
    }

    private func tocRowLabel(title: String, depth: Int) -> some View {
        HStack(spacing: 4) {
            Text(readerNativeLabelText(title))
                .font(.custom("HelveticaNeue", size: 17, relativeTo: .body))
                .foregroundStyle(viewModel.theme.readerPrimaryTextColor)
                .lineLimit(2)
                .multilineTextAlignment(.leading)
                .padding(.leading, CGFloat(depth * 12))
        }
    }

    private var controlBar: some View {
        readerControlBar(isTOC: false)
    }

    private var tocControlBar: some View {
        readerControlBar(isTOC: true)
    }

    private func readerControlBar(isTOC: Bool) -> some View {
        HStack {
            fontSizeControl
            readerSettingsControl

            if isTOC {
                Text("TOC")
                    .font(.caption2)
                    .foregroundStyle(viewModel.theme.readerControlBarSecondaryTextColor)
                    .lineLimit(1)
                    .minimumScaleFactor(0.75)
                    .frame(maxWidth: 72, alignment: .leading)
                    .accessibilityLabel("Table of contents")
            } else {
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
                    .frame(maxWidth: 72, alignment: .leading)
                    .accessibilityLabel("Reading location \(viewModel.readingProgressLabel)")
            }

            Spacer()

            if !isTOC {
                Button {
                    viewModel.goToPreviousChapter()
                } label: {
                    Label("Prev", systemImage: "chevron.left")
                }
                .disabled(!viewModel.canGoPreviousChapter())
                .accessibilityLabel("Previous chapter")
            }

            Button {
                if isTOC {
                    openFirstChapterFromTOC()
                } else {
                    viewModel.goToNextChapter()
                }
            } label: {
                Label("Next", systemImage: "chevron.right")
            }
            .disabled(isTOC ? viewModel.chapter(at: 0) == nil : !viewModel.canGoNextChapter())
            .accessibilityLabel(isTOC ? "Open first chapter" : "Next chapter")
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

    var readerDestructiveColor: Color {
        switch self {
        case .architrinoPurple, .dark:
            return Color(red: 255 / 255, green: 194 / 255, blue: 194 / 255)
        case .light, .warm:
            return .red
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
            ZStack {
                viewModel.theme.readerBackgroundColor.ignoresSafeArea()

                List {
                    Section {
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
                                                        .stroke(viewModel.theme.readerSeparatorColor, lineWidth: 1)
                                                )
                                                .frame(width: 34, height: 34)
                                            if viewModel.theme == theme {
                                                Image(systemName: "checkmark.circle.fill")
                                                    .font(.caption)
                                                    .foregroundStyle(viewModel.theme.readerControlBarAccentColor)
                                                    .background(Circle().fill(viewModel.theme.readerControlBarBackgroundColor))
                                            }
                                        }
                                        Text(theme.displayName)
                                            .font(.caption2)
                                            .foregroundStyle(viewModel.theme.readerPrimaryTextColor)
                                            .lineLimit(1)
                                    }
                                    .frame(width: 58)
                                }
                                .buttonStyle(.plain)
                            }
                        }
                        .padding(.vertical, 4)
                    } header: {
                        Text("Theme")
                            .foregroundStyle(viewModel.theme.readerSecondaryTextColor)
                    }
                    .listRowBackground(viewModel.theme.readerSearchResultBackgroundColor)

                    Section {
                        HStack(spacing: 16) {
                            Button {
                                viewModel.decreaseFont()
                            } label: {
                                Text("A")
                                    .font(.system(size: 15, weight: .semibold))
                                    .foregroundStyle(viewModel.theme.readerAccentColor)
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
                            .tint(viewModel.theme.readerAccentColor)

                            Button {
                                viewModel.increaseFont()
                            } label: {
                                Text("A")
                                    .font(.system(size: 24, weight: .semibold))
                                    .foregroundStyle(viewModel.theme.readerAccentColor)
                                    .frame(width: 36, height: 36)
                            }
                            .accessibilityLabel("Increase text size")
                        }
                    } header: {
                        Text("Text")
                            .foregroundStyle(viewModel.theme.readerSecondaryTextColor)
                    }
                    .listRowBackground(viewModel.theme.readerSearchResultBackgroundColor)

                    Section {
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
                        .tint(viewModel.theme.readerAccentColor)
                    } header: {
                        Text("Line Spacing")
                            .foregroundStyle(viewModel.theme.readerSecondaryTextColor)
                    }
                    .listRowBackground(viewModel.theme.readerSearchResultBackgroundColor)

                    Section {
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
                        .tint(viewModel.theme.readerAccentColor)
                    } header: {
                        Text("Margins")
                            .foregroundStyle(viewModel.theme.readerSecondaryTextColor)
                    }
                    .listRowBackground(viewModel.theme.readerSearchResultBackgroundColor)

                    Section {
                        Button("Reset Reading Settings") {
                            viewModel.resetReaderAppearance()
                        }
                        .foregroundStyle(viewModel.theme.readerAccentColor)
                    }
                    .listRowBackground(viewModel.theme.readerSearchResultBackgroundColor)
                }
                .scrollContentBackground(.hidden)
                .background(viewModel.theme.readerBackgroundColor.ignoresSafeArea())
            }
            .navigationTitle("Reading")
            .navigationBarTitleDisplayMode(.inline)
            .toolbarBackground(viewModel.theme.readerBackgroundColor, for: .navigationBar)
            .toolbarBackground(.visible, for: .navigationBar)
            .toolbarColorScheme(viewModel.theme.readerToolbarColorScheme, for: .navigationBar)
            .tint(viewModel.theme.readerAccentColor)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Done") {
                        dismiss()
                    }
                }
            }
        }
        .preferredColorScheme(viewModel.theme.readerToolbarColorScheme)
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
            Text(readerNativeLabelText(result.chapterTitle))
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
            ZStack {
                viewModel.theme.readerBackgroundColor.ignoresSafeArea()

                List {
                    if viewModel.bookmarks.isEmpty {
                        Text("No bookmarks yet.")
                            .foregroundStyle(viewModel.theme.readerSecondaryTextColor)
                            .listRowBackground(Color.clear)
                            .listRowSeparator(.hidden)
                    }

                    ForEach(viewModel.bookmarks) { bookmark in
                        BookmarkRow(
                            bookmark: bookmark,
                            theme: viewModel.theme,
                            open: {
                                viewModel.openBookmark(bookmark)
                            },
                            delete: {
                                viewModel.removeBookmark(bookmark)
                            }
                        )
                        .listRowBackground(Color.clear)
                        .listRowSeparator(.hidden)
                        .listRowInsets(EdgeInsets(top: 6, leading: 14, bottom: 6, trailing: 14))
                    }
                }
                .listStyle(.plain)
                .scrollContentBackground(.hidden)
                .background(viewModel.theme.readerBackgroundColor.ignoresSafeArea())
            }
            .navigationTitle("Bookmarks")
            .navigationBarTitleDisplayMode(.inline)
            .toolbarBackground(viewModel.theme.readerBackgroundColor, for: .navigationBar)
            .toolbarBackground(.visible, for: .navigationBar)
            .toolbarColorScheme(viewModel.theme.readerToolbarColorScheme, for: .navigationBar)
            .tint(viewModel.theme.readerAccentColor)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Done") {
                        viewModel.isBookmarksPresented = false
                    }
                }
            }
        }
        .preferredColorScheme(viewModel.theme.readerToolbarColorScheme)
    }
}

private struct BookmarkRow: View {
    let bookmark: ReaderBookmark
    let theme: ReaderTheme
    let open: () -> Void
    let delete: () -> Void

    var body: some View {
        HStack(spacing: 12) {
            Button(action: open) {
                VStack(alignment: .leading, spacing: 4) {
                    Text(readerNativeLabelText(bookmark.chapterTitle))
                        .font(.subheadline)
                        .fontWeight(.semibold)
                        .foregroundStyle(theme.readerPrimaryTextColor)

                    Text(readerNativeLabelText(bookmark.displayLabel))
                        .font(.caption)
                        .foregroundStyle(theme.readerSecondaryTextColor)
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .contentShape(Rectangle())
            }
            .buttonStyle(.plain)

            Button(role: .destructive, action: delete) {
                Image(systemName: "trash")
                    .font(.system(size: 17, weight: .semibold))
                    .foregroundStyle(theme.readerDestructiveColor)
                    .frame(width: 34, height: 34)
            }
            .accessibilityLabel("Delete bookmark")
        }
        .padding(.horizontal, 14)
        .padding(.vertical, 12)
        .background(theme.readerSearchResultBackgroundColor)
        .clipShape(RoundedRectangle(cornerRadius: 8, style: .continuous))
        .contentShape(RoundedRectangle(cornerRadius: 8, style: .continuous))
    }
}

private struct AboutSheet: View {
    let packageVersion: String
    let packageDate: String
    let theme: ReaderTheme

    @Environment(\.dismiss) private var dismiss

    private let websiteURL = URL(string: "https://architrino.com")!
    private let repositoryURL = URL(string: "https://github.com/jmarkmorris/architrino")!

    var body: some View {
        NavigationStack {
            ZStack {
                theme.readerBackgroundColor.ignoresSafeArea()

                List {
                    Section {
                        VStack(alignment: .leading, spacing: 12) {
                            Text("Architrino Assembly Architecture (AAA)")
                                .font(.headline)
                                .foregroundStyle(theme.readerPrimaryTextColor)
                                .lineLimit(1)
                                .minimumScaleFactor(0.72)
                                .accessibilityAddTraits(.isHeader)

                            Text("AAA begins from a deliberately spare ontology: point-like transceivers of potential, termed architrinos, moving through a three-dimensional Euclidean void in absolute time, exchanging influence through causal wakes, and assembling into the structures we observe.")
                                .font(.body)
                                .foregroundStyle(theme.readerSecondaryTextColor)

                            Text("The goal of the theory is to provide a common foundation for general relativity and quantum theory. Instead of starting with separate primitives for spacetime, particles, fields, and measurement, AAA asks how much can be recovered from one underlying causal layer and the bookkeeping of its wakes.")
                                .font(.body)
                                .foregroundStyle(theme.readerSecondaryTextColor)

                            Text("This textbook is an invitation into that architecture. Its promise is parsimony: few assumptions, clearer causal accounting, and a path from substrate events to effective physical law.")
                                .font(.body)
                                .foregroundStyle(theme.readerSecondaryTextColor)

                            Text("The textbook is in active development at the GitHub repository linked below.")
                                .font(.body)
                                .foregroundStyle(theme.readerSecondaryTextColor)
                        }
                        .padding(.vertical, 6)
                    }
                    .listRowBackground(theme.readerSearchResultBackgroundColor)

                    Section {
                        Link(destination: websiteURL) {
                            Label("architrino.com", systemImage: "safari")
                                .foregroundStyle(theme.readerAccentColor)
                        }

                        Link(destination: repositoryURL) {
                            Label("GitHub repository", systemImage: "chevron.left.forwardslash.chevron.right")
                                .foregroundStyle(theme.readerAccentColor)
                        }
                    } header: {
                        Text("Links")
                            .foregroundStyle(theme.readerSecondaryTextColor)
                    }
                    .listRowBackground(theme.readerSearchResultBackgroundColor)

                    Section {
                        HStack {
                            Text("Package version")
                                .foregroundStyle(theme.readerPrimaryTextColor)
                            Spacer()
                            Text(packageVersion)
                                .foregroundStyle(theme.readerSecondaryTextColor)
                        }

                        HStack {
                            Text("Package date")
                                .foregroundStyle(theme.readerPrimaryTextColor)
                            Spacer()
                            Text(packageDate)
                                .foregroundStyle(theme.readerSecondaryTextColor)
                        }
                    }
                    .listRowBackground(theme.readerSearchResultBackgroundColor)
                }
                .scrollContentBackground(.hidden)
                .background(theme.readerBackgroundColor.ignoresSafeArea())
            }
            .navigationTitle("About the Textbook")
            .navigationBarTitleDisplayMode(.inline)
            .toolbarBackground(theme.readerBackgroundColor, for: .navigationBar)
            .toolbarBackground(.visible, for: .navigationBar)
            .toolbarColorScheme(theme.readerToolbarColorScheme, for: .navigationBar)
            .tint(theme.readerAccentColor)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Done") {
                        dismiss()
                    }
                }
            }
        }
        .preferredColorScheme(theme.readerToolbarColorScheme)
    }
}

private func readerNativeLabelText(_ value: String) -> String {
    var output = ""
    var index = value.startIndex

    while let open = value[index...].firstIndex(of: "$") {
        output += String(value[index..<open])
        let mathStart = value.index(after: open)
        guard let close = value[mathStart...].firstIndex(of: "$") else {
            output += String(value[open...])
            return readerNormalizeNativeLabelSpacing(output)
        }

        output += readerNativeMathText(String(value[mathStart..<close]))
        index = value.index(after: close)
    }

    output += String(value[index...])
    return readerNormalizeNativeLabelSpacing(output)
}

private func readerNativeMathText(_ rawValue: String) -> String {
    let trimmed = rawValue.trimmingCharacters(in: .whitespacesAndNewlines)
    if trimmed == "\\mathbb{A}\\mathbb{A}\\mathbb{A}" {
        return "AAA"
    }
    if trimmed == "\\mathbb{U}_{\\text{now}}" {
        return "U_now"
    }

    var text = readerReplaceBracedTextCommands(trimmed)
    let replacements: [(String, String)] = [
        ("\\mathbb{A}\\mathbb{A}\\mathbb{A}", "AAA"),
        ("\\mathbb{U}", "U"),
        ("\\bar{K}", "K\u{0304}"),
        ("\\Lambda", "Λ"),
        ("\\gamma", "γ"),
        ("\\pi", "π"),
        ("\\rho", "ρ"),
        ("\\Delta", "Δ"),
        ("\\eta", "η"),
        ("\\epsilon", "ε"),
        ("\\hbar", "ℏ"),
        ("\\ell", "ℓ"),
        ("\\times", "×"),
        ("\\to", " → "),
        ("\\pm", "±"),
        ("\\sim", "~"),
        ("\\|", "||")
    ]

    for (source, replacement) in replacements {
        text = text.replacingOccurrences(of: source, with: replacement)
    }

    text = readerReplaceScriptMarkers(in: text, marker: "^", transform: readerSuperscriptText)
    text = readerReplaceScriptMarkers(in: text, marker: "_", transform: readerSubscriptText)
    text = text
        .replacingOccurrences(of: "{", with: "")
        .replacingOccurrences(of: "}", with: "")
        .replacingOccurrences(of: "\\", with: "")

    return readerNormalizeNativeLabelSpacing(text)
}

private func readerReplaceBracedTextCommands(_ value: String) -> String {
    var text = value
    for command in ["\\text", "\\mathrm", "\\mathbf"] {
        while let commandRange = text.range(of: "\(command){") {
            let contentStart = commandRange.upperBound
            guard let close = text[contentStart...].firstIndex(of: "}") else {
                break
            }
            let content = text[contentStart..<close]
            text.replaceSubrange(commandRange.lowerBound...close, with: content)
        }
    }
    return text
}

private func readerReplaceScriptMarkers(
    in value: String,
    marker: Character,
    transform: (String) -> String
) -> String {
    var output = ""
    var index = value.startIndex

    while index < value.endIndex {
        guard value[index] == marker else {
            output.append(value[index])
            index = value.index(after: index)
            continue
        }

        let tokenStart = value.index(after: index)
        guard tokenStart < value.endIndex else {
            output.append(marker)
            index = tokenStart
            continue
        }

        if value[tokenStart] == "{" {
            let contentStart = value.index(after: tokenStart)
            guard let close = value[contentStart...].firstIndex(of: "}") else {
                output.append(marker)
                index = tokenStart
                continue
            }
            output += transform(String(value[contentStart..<close]))
            index = value.index(after: close)
            continue
        }

        var tokenEnd = tokenStart
        while tokenEnd < value.endIndex,
              readerIsScriptTokenCharacter(value[tokenEnd]) {
            tokenEnd = value.index(after: tokenEnd)
        }

        if tokenEnd == tokenStart {
            output.append(marker)
            index = tokenStart
        } else {
            output += transform(String(value[tokenStart..<tokenEnd]))
            index = tokenEnd
        }
    }

    return output
}

private func readerIsScriptTokenCharacter(_ character: Character) -> Bool {
    character.isLetter || character.isNumber || character == "+" || character == "-" || character == "±"
}

private func readerSuperscriptText(_ value: String) -> String {
    readerMappedScriptText(
        value,
        map: [
            "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴",
            "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹",
            "+": "⁺", "-": "⁻", "±": "±"
        ],
        fallbackPrefix: "^"
    )
}

private func readerSubscriptText(_ value: String) -> String {
    readerMappedScriptText(
        value,
        map: [
            "0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄",
            "5": "₅", "6": "₆", "7": "₇", "8": "₈", "9": "₉"
        ],
        fallbackPrefix: "_"
    )
}

private func readerMappedScriptText(
    _ value: String,
    map: [Character: Character],
    fallbackPrefix: String
) -> String {
    var output = ""
    for character in value {
        guard let mapped = map[character] else {
            return "\(fallbackPrefix)\(value)"
        }
        output.append(mapped)
    }
    return output
}

private func readerNormalizeNativeLabelSpacing(_ value: String) -> String {
    var text = value
        .replacingOccurrences(of: "  ", with: " ")
        .replacingOccurrences(of: " ,", with: ",")
        .replacingOccurrences(of: "( ", with: "(")
        .replacingOccurrences(of: " )", with: ")")
        .trimmingCharacters(in: .whitespacesAndNewlines)

    while text.contains("  ") {
        text = text.replacingOccurrences(of: "  ", with: " ")
    }
    return text
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
