import SwiftUI

struct ContentView: View {
    @StateObject private var viewModel = ReaderViewModel()
    @Environment(\.horizontalSizeClass) private var horizontalSizeClass
    @Environment(\.openURL) private var openURL

    @State private var showToc = false
    @State private var tocNotice: String?

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
        .sheet(isPresented: $showToc) {
            NavigationStack {
                tocSidebar
                    .navigationTitle("Table of Contents")
                    .navigationBarTitleDisplayMode(.inline)
                    .toolbar {
                        ToolbarItem(placement: .cancellationAction) {
                            Button("Done") {
                                showToc = false
                            }
                        }
                    }
            }
        }
        .sheet(isPresented: $viewModel.isSearchPresented) {
            SearchSheet(viewModel: viewModel)
        }
        .sheet(isPresented: $viewModel.isBookmarksPresented) {
            BookmarksSheet(viewModel: viewModel)
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
                } else if let command = viewModel.renderCommand {
                    ReaderWebView(renderCommand: $viewModel.renderCommand) { payload in
                        if let url = viewModel.handleWebLink(message: payload) {
                            openURL(url)
                        }
                    }
                    .background(Color(.systemBackground))
                } else {
                    VStack {
                        ProgressView()
                        Text("Loading chapter…")
                            .font(.footnote)
                            .foregroundStyle(.secondary)
                    }
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                }

                if let notice = tocNotice {
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
            .navigationTitle(viewModel.currentChapter?.title ?? "Textbook")
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
                            Image(systemName: "bookmark")
                        }

                        Menu {
                            Button("Package version \(viewModel.packageVersionLabel)") {}
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
                if let package = viewModel.package {
                    Section("Textbook") {
                        if package.tocPackage.tocRoot.resolvedChildren.isEmpty {
                            ForEach(Array(package.manifest.chapters.enumerated()), id: \.offset) { index, chapter in
                                Button {
                                    viewModel.openChapter(by: chapter.id, anchor: nil)
                                    showToc = false
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
                        Label("Bookmarks", systemImage: "bookmark")
                    }

                    Button {
                        if let glossary = viewModel.glossaryURL() {
                            openURL(glossary)
                        }
                    } label: {
                        Label("Glossary", systemImage: "book.pages")
                    }
                }
            }
            .listStyle(.insetGrouped)
        }
        .navigationTitle("Textbook")
    }

    @ViewBuilder
    private func tocHierarchyRow(_ node: TextbookTOCNode, depth: Int) -> some View {
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

        if isExternalRoute {
            HStack(spacing: 10) {
                tocRouteIcon(for: route)
                    .font(.caption)
                    .foregroundStyle(.secondary)

                tocRowLabel(title: node.title, depth: depth)

                Spacer()

                Button {
                    if let externalURL {
                        openURL(externalURL)
                    }
                    if !isRegularWidth {
                        showToc = false
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
                tocNotice = "“\(node.title)” is a web-app scene. Open in Safari to view the interactive version."
                if !isRegularWidth {
                    showToc = false
                }
            }
            .background(Color.clear)
        } else {
            Button {
                tocNotice = nil
                if let external = viewModel.performTOCAction(for: node) {
                    openURL(external)
                }
                if !isRegularWidth {
                    showToc = false
                }
            } label: {
                HStack(spacing: 10) {
                    tocRouteIcon(for: route)
                        .font(.caption)
                        .foregroundStyle(.secondary)

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

    @ViewBuilder
    private func tocRouteIcon(for route: ReaderViewModel.TOCRoute) -> some View {
        switch route {
        case .chapter:
            Image(systemName: "book")
        case .external:
            Image(systemName: "safari")
        case .none:
            Image(systemName: "link")
        }
    }

    private func tocRowLabel(title: String, depth: Int) -> some View {
        HStack(spacing: 4) {
            Text(title)
                .font(.body)
                .foregroundStyle(.primary)
                .lineLimit(2)
                .multilineTextAlignment(.leading)
                .padding(.leading, CGFloat(depth * 14))
        }
    }

    private var controlBar: some View {
        HStack {
            Button {
                viewModel.decreaseFont()
            } label: {
                Image(systemName: "textformat.size.smaller")
            }
            .disabled(viewModel.fontScale <= 0.85)

            Button {
                viewModel.addBookmark()
            } label: {
                Image(systemName: "bookmark.fill")
            }
            .disabled(viewModel.currentChapter == nil)
            .accessibilityLabel("Add bookmark")

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

            Button {
                viewModel.increaseFont()
            } label: {
                Image(systemName: "textformat.size.larger")
            }
            .disabled(viewModel.fontScale >= 1.45)
        }
        .font(.subheadline)
        .padding(10)
        .background(.regularMaterial)
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
                            Text(result.sectionTitle)
                                .font(.caption)
                                .foregroundStyle(.secondary)
                            Text(result.snippet)
                                .font(.caption2)
                                .foregroundStyle(.secondary)
                                .lineLimit(3)
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

#Preview
struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
