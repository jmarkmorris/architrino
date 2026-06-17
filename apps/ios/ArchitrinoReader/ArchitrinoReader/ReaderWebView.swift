import SwiftUI
import WebKit

struct ReaderWebView: UIViewRepresentable {
    @Binding var renderCommand: ReaderViewModel.ReaderRenderCommand?
    let onLinkTap: (Any) -> Void
    let onRenderComplete: () -> Void

    func makeUIView(context: Context) -> WKWebView {
        let configuration = WKWebViewConfiguration()
        configuration.defaultWebpagePreferences.allowsContentJavaScript = true
        let controller = WKUserContentController()
        controller.add(context.coordinator, name: "readerLinkHandler")
        controller.add(context.coordinator, name: "readerReady")
        controller.add(context.coordinator, name: "readerRenderComplete")
        configuration.userContentController = controller

        let view = WKWebView(frame: .zero, configuration: configuration)
        view.backgroundColor = UIColor.systemBackground
        view.isOpaque = false
        view.navigationDelegate = context.coordinator
        view.scrollView.backgroundColor = UIColor.systemBackground
        view.scrollView.keyboardDismissMode = .onDrag
        view.scrollView.bounces = false

        if let shellURL = Bundle.main.url(
            forResource: "ReaderShell",
            withExtension: "html",
            subdirectory: "ReaderAssets"
        ) {
            view.loadFileURL(shellURL, allowingReadAccessTo: shellURL.deletingLastPathComponent())
        }
        context.coordinator.webView = view

        return view
    }

    func updateUIView(_ uiView: WKWebView, context: Context) {
        guard let command = renderCommand else { return }
        if context.coordinator.lastRenderedCommandID == command.id {
            return
        }
        context.coordinator.pendingRenderCommand = command
        context.coordinator.webView = uiView
        if context.coordinator.isReaderReady {
            context.coordinator.flushRenderCommand()
        }
    }

    func makeCoordinator() -> Coordinator {
        Coordinator(parent: self)
    }

    final class Coordinator: NSObject, WKScriptMessageHandler, WKNavigationDelegate {
        private let parent: ReaderWebView
        weak var webView: WKWebView?
        var isReaderReady = false
        var pendingRenderCommand: ReaderViewModel.ReaderRenderCommand?
        var lastRenderedCommandID: UUID?

        init(parent: ReaderWebView) {
            self.parent = parent
        }

        func userContentController(
            _ userContentController: WKUserContentController,
            didReceive message: WKScriptMessage
        ) {
            if message.name == "readerReady" {
                isReaderReady = true
                DispatchQueue.main.async { self.flushRenderCommand() }
                return
            }

            if message.name == "readerRenderComplete" {
                DispatchQueue.main.async {
                    self.parent.onRenderComplete()
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
            flushRenderCommand()
        }

        func flushRenderCommand() {
            guard let command = pendingRenderCommand,
                  let webView else {
                return
            }
            sendRenderCommand(command, to: webView)
        }

        func sendRenderCommand(_ command: ReaderViewModel.ReaderRenderCommand, to webView: WKWebView) {
            do {
                let jsonData = try JSONEncoder().encode(command)
                let jsonString = String(data: jsonData, encoding: .utf8) ?? "{}"
                let script = """
                window.ReaderBridge && window.ReaderBridge.renderChapter(\(readerJavaScriptStringLiteral(jsonString)));
                """
                webView.evaluateJavaScript(script) { _, error in
                    if let error {
                        // Keep diagnostics available during local testing.
                        _ = error
                    }
                }
                pendingRenderCommand = nil
                lastRenderedCommandID = command.id
            } catch {
                // non-fatal: command encoding is handled entirely locally
            }
        }

        func resetReaderState() {
            isReaderReady = false
            pendingRenderCommand = nil
            lastRenderedCommandID = nil
        }

        deinit {
            resetReaderState()
            if let controller = webView?.configuration.userContentController {
                controller.removeScriptMessageHandler(forName: "readerLinkHandler")
                controller.removeScriptMessageHandler(forName: "readerReady")
                controller.removeScriptMessageHandler(forName: "readerRenderComplete")
            }
        }
    }
}

struct SearchSnippetPreview: UIViewRepresentable {
    let markdownText: String

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
        if context.coordinator.isReady {
            context.coordinator.flushRenderCommand()
        }
    }

    func makeCoordinator() -> Coordinator {
        Coordinator()
    }

    private struct SearchSnippetPayload: Encodable {
        let markdownText: String
    }

    final class Coordinator: NSObject, WKNavigationDelegate {
        weak var webView: WKWebView?
        var isReady = false
        var pendingMarkdownText: String?
        var lastRenderedMarkdownText: String?

        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
            isReady = true
            flushRenderCommand()
        }

        func flushRenderCommand() {
            guard let markdownText = pendingMarkdownText,
                  let webView else {
                return
            }
            if lastRenderedMarkdownText == markdownText {
                pendingMarkdownText = nil
                return
            }

            do {
                let payload = SearchSnippetPayload(markdownText: markdownText)
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
                lastRenderedMarkdownText = markdownText
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
