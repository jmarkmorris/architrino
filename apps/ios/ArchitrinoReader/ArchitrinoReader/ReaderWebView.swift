import SwiftUI
import WebKit

struct ReaderWebView: UIViewRepresentable {
    @Binding var renderCommand: ReaderViewModel.ReaderRenderCommand?
    let onLinkTap: (Any) -> Void

    func makeUIView(context: Context) -> WKWebView {
        let configuration = WKWebViewConfiguration()
        configuration.defaultWebpagePreferences.allowsContentJavaScript = true
        let controller = WKUserContentController()
        controller.add(context.coordinator, name: "readerLinkHandler")
        controller.add(context.coordinator, name: "readerReady")
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
                let escaped = jsonString
                    .replacingOccurrences(of: "\\", with: "\\\\")
                    .replacingOccurrences(of: "`", with: "\\`")
                let script = "window.ReaderBridge && window.ReaderBridge.renderChapter(`\(escaped)`);"
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
            }
        }
    }
}
