import SwiftUI
import WebKit

struct ReaderWebView: UIViewRepresentable {
    @Binding var renderCommand: ReaderViewModel.ReaderRenderCommand?
    @Binding var anchorCommand: ReaderViewModel.ReaderAnchorCommand?
    let fontScale: Double
    let theme: ReaderTheme
    let lineSpacing: ReaderLineSpacing
    let marginWidth: ReaderMarginWidth
    let onLinkTap: (Any) -> Void
    let onRenderComplete: (Any) -> Void
    let onScrollPositionChange: (Double) -> Void

    func makeUIView(context: Context) -> WKWebView {
        let configuration = WKWebViewConfiguration()
        configuration.defaultWebpagePreferences.allowsContentJavaScript = true
        let controller = WKUserContentController()
        controller.add(context.coordinator, name: "readerLinkHandler")
        controller.add(context.coordinator, name: "readerReady")
        controller.add(context.coordinator, name: "readerRenderComplete")
        configuration.userContentController = controller

        let view = WKWebView(frame: .zero, configuration: configuration)
        view.backgroundColor = UIColor.readerBackground(for: .architrinoPurple)
        view.isOpaque = false
        view.navigationDelegate = context.coordinator
        view.scrollView.backgroundColor = UIColor.readerBackground(for: .architrinoPurple)
        view.scrollView.keyboardDismissMode = .onDrag
        view.scrollView.bounces = false
        view.scrollView.alwaysBounceHorizontal = false
        view.scrollView.showsHorizontalScrollIndicator = false
        view.scrollView.isDirectionalLockEnabled = true
        view.scrollView.delegate = context.coordinator

        if let shellURL = Bundle.main.url(
            forResource: "ReaderShell",
            withExtension: "html",
            subdirectory: "ReaderAssets"
        ) {
            let readAccessURL = Bundle.main.resourceURL ?? shellURL.deletingLastPathComponent()
            view.loadFileURL(shellURL, allowingReadAccessTo: readAccessURL)
        }
        context.coordinator.webView = view

        return view
    }

    func updateUIView(_ uiView: WKWebView, context: Context) {
        let appearance = ReaderAppearancePayload(
            fontScale: fontScale,
            theme: theme,
            lineSpacing: lineSpacing,
            marginWidth: marginWidth
        )
        if context.coordinator.lastAppliedAppearance?.theme != theme {
            uiView.backgroundColor = UIColor.readerBackground(for: theme)
            uiView.scrollView.backgroundColor = UIColor.readerBackground(for: theme)
        }
        context.coordinator.webView = uiView
        uiView.scrollView.delegate = context.coordinator
        context.coordinator.pendingAppearance = appearance
        if let anchorCommand,
           context.coordinator.lastAppliedAnchorCommandID != anchorCommand.id {
            context.coordinator.pendingAnchorCommand = anchorCommand
        } else if anchorCommand == nil {
            context.coordinator.pendingAnchorCommand = nil
        }
        if let command = renderCommand {
            context.coordinator.currentRenderCommand = command
            if context.coordinator.lastRenderedCommandID != command.id {
                context.coordinator.pendingRenderCommand = command
            }
        } else if renderCommand == nil {
            context.coordinator.currentRenderCommand = nil
            context.coordinator.pendingRenderCommand = nil
        }
        if context.coordinator.isReaderReady {
            context.coordinator.flushAppearance()
            context.coordinator.flushRenderCommand()
            context.coordinator.flushAnchorCommand()
        }
    }

    func makeCoordinator() -> Coordinator {
        Coordinator(parent: self)
    }

    final class Coordinator: NSObject, WKScriptMessageHandler, WKNavigationDelegate, UIScrollViewDelegate {
        private let parent: ReaderWebView
        weak var webView: WKWebView?
        var isReaderReady = false
        var pendingRenderCommand: ReaderViewModel.ReaderRenderCommand?
        var pendingAppearance: ReaderAppearancePayload?
        var pendingAnchorCommand: ReaderViewModel.ReaderAnchorCommand?
        var currentRenderCommand: ReaderViewModel.ReaderRenderCommand?
        var lastAppliedAppearance: ReaderAppearancePayload?
        var lastRenderedCommandID: UUID?
        var lastAppliedAnchorCommandID: UUID?
        var lastReportedScrollProgress: Double?

        init(parent: ReaderWebView) {
            self.parent = parent
        }

        func userContentController(
            _ userContentController: WKUserContentController,
            didReceive message: WKScriptMessage
        ) {
            if message.name == "readerReady" {
                isReaderReady = true
                DispatchQueue.main.async {
                    self.restorePendingRenderCommandIfNeeded()
                    self.flushAppearance()
                    self.flushRenderCommand()
                    self.flushAnchorCommand()
                }
                return
            }

            if message.name == "readerRenderComplete" {
                DispatchQueue.main.async {
                    self.parent.onRenderComplete(message.body)
                }
                return
            }

            if message.name == "readerLinkHandler" {
                DispatchQueue.main.async {
                    self.parent.onLinkTap(message.body)
                }
            }
        }

        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
            isReaderReady = true
            restorePendingRenderCommandIfNeeded()
            flushAppearance()
            flushRenderCommand()
            flushAnchorCommand()
        }

        func webView(_ webView: WKWebView, didStartProvisionalNavigation navigation: WKNavigation!) {
            markReaderShellReloading()
        }

        func webViewWebContentProcessDidTerminate(_ webView: WKWebView) {
            markReaderShellReloading()
            webView.reload()
        }

        func scrollViewDidScroll(_ scrollView: UIScrollView) {
            if scrollView.contentOffset.x != 0 {
                scrollView.contentOffset = CGPoint(x: 0, y: scrollView.contentOffset.y)
            }

            let maxOffset = max(0, scrollView.contentSize.height - scrollView.bounds.height)
            let progress: Double
            if maxOffset <= 0 {
                progress = 0
            } else {
                progress = max(0, min(1, Double(scrollView.contentOffset.y / maxOffset)))
            }
            if let lastReportedScrollProgress,
               abs(lastReportedScrollProgress - progress) < 0.002 {
                return
            }
            lastReportedScrollProgress = progress
            parent.onScrollPositionChange(progress)
        }

        private func markReaderShellReloading() {
            isReaderReady = false
            lastRenderedCommandID = nil
            lastAppliedAnchorCommandID = nil
            lastAppliedAppearance = nil
            restorePendingRenderCommandIfNeeded()
        }

        private func restorePendingRenderCommandIfNeeded() {
            guard pendingRenderCommand == nil,
                  let currentRenderCommand,
                  currentRenderCommand.id != lastRenderedCommandID else {
                return
            }
            pendingRenderCommand = currentRenderCommand
        }

        func flushRenderCommand() {
            guard let command = pendingRenderCommand,
                  let webView else {
                return
            }
            sendRenderCommand(command, to: webView)
        }

        func flushAppearance() {
            guard let appearance = pendingAppearance,
                  let webView,
                  appearance != lastAppliedAppearance else {
                pendingAppearance = nil
                return
            }
            if let lastAppliedAppearance,
               lastAppliedAppearance.theme == appearance.theme,
               lastAppliedAppearance.lineSpacing == appearance.lineSpacing,
               lastAppliedAppearance.marginWidth == appearance.marginWidth,
               lastAppliedAppearance.fontScale != appearance.fontScale {
                sendFontScale(appearance, to: webView)
            } else {
                sendAppearance(appearance, to: webView)
            }
        }

        func flushAnchorCommand() {
            guard let command = pendingAnchorCommand,
                  let webView,
                  command.id != lastAppliedAnchorCommandID else {
                pendingAnchorCommand = nil
                return
            }
            sendAnchorCommand(command, to: webView)
        }

        func sendRenderCommand(_ command: ReaderViewModel.ReaderRenderCommand, to webView: WKWebView) {
            do {
                let jsonData = try JSONEncoder().encode(command)
                let jsonString = String(data: jsonData, encoding: .utf8) ?? "{}"
                let script = """
                if (!window.ReaderBridge || typeof window.ReaderBridge.renderChapter !== "function") {
                    throw new Error("Reader shell is not ready.");
                }
                window.ReaderBridge.renderChapter(\(readerJavaScriptStringLiteral(jsonString)));
                """
                currentRenderCommand = command
                webView.evaluateJavaScript(script) { _, error in
                    if let error {
                        DispatchQueue.main.async {
                            if self.currentRenderCommand?.id == command.id {
                                self.lastRenderedCommandID = nil
                                self.pendingRenderCommand = command
                            }
                        }
                        // Keep diagnostics available during local testing.
                        _ = error
                    }
                }
                pendingRenderCommand = nil
                lastRenderedCommandID = command.id
                lastAppliedAppearance = ReaderAppearancePayload(
                    fontScale: command.fontScale,
                    theme: command.theme,
                    lineSpacing: command.lineSpacing,
                    marginWidth: command.marginWidth
                )
            } catch {
                // non-fatal: command encoding is handled entirely locally
            }
        }

        func sendAppearance(_ appearance: ReaderAppearancePayload, to webView: WKWebView) {
            do {
                let jsonData = try JSONEncoder().encode(appearance)
                let jsonString = String(data: jsonData, encoding: .utf8) ?? "{}"
                let script = """
                window.ReaderBridge && window.ReaderBridge.updateAppearance(\(readerJavaScriptStringLiteral(jsonString)));
                """
                webView.evaluateJavaScript(script) { _, error in
                    if let error {
                        // Keep diagnostics available during local testing.
                        _ = error
                    }
                }
                pendingAppearance = nil
                lastAppliedAppearance = appearance
            } catch {
                // non-fatal: appearance changes will be reflected by the next render
            }
        }

        func sendFontScale(_ appearance: ReaderAppearancePayload, to webView: WKWebView) {
            do {
                let payload = ReaderFontScalePayload(fontScale: appearance.fontScale)
                let jsonData = try JSONEncoder().encode(payload)
                let jsonString = String(data: jsonData, encoding: .utf8) ?? "{}"
                let script = """
                window.ReaderBridge && window.ReaderBridge.updateFontScale(\(readerJavaScriptStringLiteral(jsonString)));
                """
                webView.evaluateJavaScript(script) { _, error in
                    if let error {
                        // Keep diagnostics available during local testing.
                        _ = error
                    }
                }
                pendingAppearance = nil
                lastAppliedAppearance = appearance
            } catch {
                // non-fatal: font changes will be reflected by the next appearance update
            }
        }

        func sendAnchorCommand(_ command: ReaderViewModel.ReaderAnchorCommand, to webView: WKWebView) {
            do {
                let jsonData = try JSONEncoder().encode(command)
                let jsonString = String(data: jsonData, encoding: .utf8) ?? "{}"
                let script = """
                window.ReaderBridge && window.ReaderBridge.setAnchor(\(readerJavaScriptStringLiteral(jsonString)));
                """
                webView.evaluateJavaScript(script) { _, error in
                    if let error {
                        // Keep diagnostics available during local testing.
                        _ = error
                    }
                }
                pendingAnchorCommand = nil
                lastAppliedAnchorCommandID = command.id
            } catch {
                // non-fatal: anchor changes will be reflected by the next render
            }
        }

        func resetReaderState() {
            isReaderReady = false
            pendingRenderCommand = nil
            pendingAppearance = nil
            pendingAnchorCommand = nil
            currentRenderCommand = nil
            lastAppliedAppearance = nil
            lastRenderedCommandID = nil
            lastAppliedAnchorCommandID = nil
            lastReportedScrollProgress = nil
        }

        deinit {
            resetReaderState()
            webView?.scrollView.delegate = nil
            if let controller = webView?.configuration.userContentController {
                controller.removeScriptMessageHandler(forName: "readerLinkHandler")
                controller.removeScriptMessageHandler(forName: "readerReady")
                controller.removeScriptMessageHandler(forName: "readerRenderComplete")
            }
        }
    }
}

struct ReaderAppearancePayload: Codable, Equatable {
    let fontScale: Double
    let theme: ReaderTheme
    let lineSpacing: ReaderLineSpacing
    let marginWidth: ReaderMarginWidth
}

private struct ReaderFontScalePayload: Codable {
    let fontScale: Double
}

struct SearchSnippetPreview: UIViewRepresentable {
    let markdownText: String
    let theme: ReaderTheme

    func makeUIView(context: Context) -> WKWebView {
        let configuration = WKWebViewConfiguration()
        configuration.defaultWebpagePreferences.allowsContentJavaScript = true

        let view = WKWebView(frame: .zero, configuration: configuration)
        view.backgroundColor = UIColor.clear
        view.isOpaque = false
        view.isUserInteractionEnabled = false
        view.navigationDelegate = context.coordinator
        view.scrollView.backgroundColor = UIColor.clear
        view.scrollView.bounces = false
        view.scrollView.isScrollEnabled = false
        view.scrollView.showsHorizontalScrollIndicator = false
        view.scrollView.showsVerticalScrollIndicator = false

        if let shellURL = Bundle.main.url(
            forResource: "SearchSnippetShell",
            withExtension: "html",
            subdirectory: "ReaderAssets"
        ) {
            view.loadFileURL(shellURL, allowingReadAccessTo: shellURL.deletingLastPathComponent())
        }
        context.coordinator.webView = view

        return view
    }

    func updateUIView(_ uiView: WKWebView, context: Context) {
        context.coordinator.webView = uiView
        context.coordinator.pendingMarkdownText = markdownText
        context.coordinator.pendingTheme = theme
        if context.coordinator.isReady {
            context.coordinator.flushRenderCommand()
        }
    }

    func makeCoordinator() -> Coordinator {
        Coordinator()
    }

    private struct SearchSnippetPayload: Encodable {
        let markdownText: String
        let theme: ReaderTheme
    }

    final class Coordinator: NSObject, WKNavigationDelegate {
        weak var webView: WKWebView?
        var isReady = false
        var pendingMarkdownText: String?
        var pendingTheme: ReaderTheme?
        var lastRenderedMarkdownText: String?
        var lastRenderedTheme: ReaderTheme?

        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
            isReady = true
            flushRenderCommand()
        }

        func flushRenderCommand() {
            guard let markdownText = pendingMarkdownText,
                  let theme = pendingTheme,
                  let webView else {
                return
            }
            if lastRenderedMarkdownText == markdownText, lastRenderedTheme == theme {
                pendingMarkdownText = nil
                pendingTheme = nil
                return
            }

            do {
                let payload = SearchSnippetPayload(markdownText: markdownText, theme: theme)
                let jsonData = try JSONEncoder().encode(payload)
                let jsonString = String(data: jsonData, encoding: .utf8) ?? "{}"
                let script = """
                window.SearchSnippetBridge && window.SearchSnippetBridge.renderSnippet(\(readerJavaScriptStringLiteral(jsonString)));
                """
                webView.evaluateJavaScript(script) { _, error in
                    if let error {
                        // Keep diagnostics available during local testing.
                        _ = error
                    }
                }
                pendingMarkdownText = nil
                pendingTheme = nil
                lastRenderedMarkdownText = markdownText
                lastRenderedTheme = theme
            } catch {
                // non-fatal: snippet rendering falls back to an empty preview
            }
        }

    }
}

private func readerJavaScriptStringLiteral(_ value: String) -> String {
    guard let data = try? JSONEncoder().encode(value),
          let literal = String(data: data, encoding: .utf8) else {
        return "\"{}\""
    }
    return literal
}

private extension UIColor {
    static func readerBackground(for theme: ReaderTheme) -> UIColor {
        switch theme {
        case .architrinoPurple:
            return UIColor(red: 75 / 255, green: 0, blue: 130 / 255, alpha: 1)
        case .light:
            return UIColor(red: 253 / 255, green: 253 / 255, blue: 253 / 255, alpha: 1)
        case .warm:
            return UIColor(red: 244 / 255, green: 236 / 255, blue: 216 / 255, alpha: 1)
        case .dark:
            return UIColor(red: 15 / 255, green: 23 / 255, blue: 42 / 255, alpha: 1)
        }
    }
}
