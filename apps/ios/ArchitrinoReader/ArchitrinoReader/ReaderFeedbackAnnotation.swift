import PencilKit
import SwiftUI
import UIKit

enum ReaderFeedbackCaptureError: Error {
    case missingReaderView
    case emptyReaderView
    case emptySnapshot
}

@MainActor
enum ReaderPageSnapshotCapture {
    static func captureVisiblePageSnapshot() throws -> UIImage {
        guard let window = UIApplication.shared.readerKeyWindow else {
            throw ReaderFeedbackCaptureError.missingReaderView
        }
        guard window.bounds.width > 1, window.bounds.height > 1 else {
            throw ReaderFeedbackCaptureError.emptyReaderView
        }

        let format = UIGraphicsImageRendererFormat.default()
        format.scale = window.screen.scale
        let renderer = UIGraphicsImageRenderer(bounds: window.bounds, format: format)
        let image = renderer.image { _ in
            window.drawHierarchy(in: window.bounds, afterScreenUpdates: true)
        }

        guard image.size.width > 1, image.size.height > 1 else {
            throw ReaderFeedbackCaptureError.emptySnapshot
        }
        return image
    }
}

struct ReaderFeedbackContext {
    let documentTitle: String
    let readingLocator: String
    let packageVersion: String
    let packageDate: String

    var locationLabel: String {
        let title = documentTitle.trimmingCharacters(in: .whitespacesAndNewlines)
        let locator = readingLocator.trimmingCharacters(in: .whitespacesAndNewlines)

        if title.isEmpty || title == "Textbook" {
            return locator.isEmpty ? "Table of contents" : locator
        }
        if locator.isEmpty {
            return title
        }
        return "\(title) - \(locator)"
    }

    var shareText: String {
        """
        Architrino textbook feedback

        Location: \(locationLabel)
        Package version: \(packageVersion)
        Package date: \(packageDate)
        App version: \(Self.appVersionLabel)

        GitHub issue page: https://github.com/jmarkmorris/architrino/issues/new
        GitHub login is required to submit there.
        """
    }

    private static var appVersionLabel: String {
        let version = Bundle.main.object(forInfoDictionaryKey: "CFBundleShortVersionString") as? String
        let build = Bundle.main.object(forInfoDictionaryKey: "CFBundleVersion") as? String

        switch (version?.trimmingCharacters(in: .whitespacesAndNewlines), build?.trimmingCharacters(in: .whitespacesAndNewlines)) {
        case let (.some(version), .some(build)) where !version.isEmpty && !build.isEmpty:
            return "\(version) (\(build))"
        case let (.some(version), _) where !version.isEmpty:
            return version
        case let (_, .some(build)) where !build.isEmpty:
            return build
        default:
            return "unavailable"
        }
    }
}

struct ReaderPageFeedbackOverlay: View {
    let baseImage: UIImage
    let context: ReaderFeedbackContext
    let theme: ReaderTheme
    let onClose: () -> Void

    @State private var canvasView: PKCanvasView?
    @State private var hasDrawing = false
    @State private var sharePayload: ReaderFeedbackSharePayload?

    var body: some View {
        ZStack {
            ReaderPageFeedbackCanvasView(canvasView: $canvasView, hasDrawing: $hasDrawing)
                .ignoresSafeArea()

            Rectangle()
                .stroke(Color.readerFeedbackOrange.opacity(0.86), lineWidth: 3)
                .ignoresSafeArea()
                .allowsHitTesting(false)

            VStack {
                HStack {
                    feedbackIconButton(systemName: "xmark", accessibilityLabel: "Close feedback", action: onClose)

                    Spacer()

                    HStack(spacing: 8) {
                        feedbackIconButton(
                            systemName: "arrow.uturn.backward",
                            accessibilityLabel: "Undo annotation",
                            isDisabled: !hasDrawing
                        ) {
                            canvasView?.undoManager?.undo()
                            updateDrawingState()
                        }

                        feedbackIconButton(
                            systemName: "trash",
                            accessibilityLabel: "Clear annotation",
                            isDisabled: !hasDrawing
                        ) {
                            canvasView?.drawing = PKDrawing()
                            updateDrawingState()
                        }

                        feedbackIconButton(systemName: "square.and.arrow.up", accessibilityLabel: "Share annotated feedback") {
                            shareAnnotatedFeedback()
                        }
                    }
                    .padding(.horizontal, 8)
                    .padding(.vertical, 6)
                    .background(theme.feedbackChromeBackgroundColor)
                    .clipShape(Capsule())
                }
                .padding(.horizontal, 14)
                .padding(.top, 8)

                Spacer()
            }
        }
        .sheet(item: $sharePayload) { payload in
            ReaderFeedbackShareSheet(activityItems: payload.activityItems)
        }
    }

    private func feedbackIconButton(
        systemName: String,
        accessibilityLabel: String,
        isDisabled: Bool = false,
        action: @escaping () -> Void
    ) -> some View {
        Button(action: action) {
            Image(systemName: systemName)
                .font(.system(size: 17, weight: .semibold))
                .foregroundStyle(isDisabled ? theme.feedbackDisabledColor : theme.feedbackActionColor)
                .frame(width: 36, height: 36)
                .background(theme.feedbackChromeBackgroundColor)
                .clipShape(Circle())
        }
        .disabled(isDisabled)
        .accessibilityLabel(accessibilityLabel)
    }

    private func updateDrawingState() {
        guard let canvasView else {
            hasDrawing = false
            return
        }
        hasDrawing = canvasView.drawing.hasVisibleStrokes
    }

    private func shareAnnotatedFeedback() {
        guard let canvasView else {
            sharePayload = ReaderFeedbackSharePayload(activityItems: [context.shareText, baseImage])
            return
        }

        let image = ReaderFeedbackImageRenderer.renderAnnotatedImage(
            baseImage: baseImage,
            drawing: canvasView.drawing,
            canvasBounds: canvasView.bounds
        )
        sharePayload = ReaderFeedbackSharePayload(activityItems: [context.shareText, image])
    }
}

private struct ReaderPageFeedbackCanvasView: UIViewRepresentable {
    @Binding var canvasView: PKCanvasView?
    @Binding var hasDrawing: Bool

    func makeUIView(context: Context) -> PKCanvasView {
        let view = PKCanvasView()
        view.backgroundColor = .clear
        view.isOpaque = false
        view.isScrollEnabled = false
        view.drawingPolicy = .anyInput
        view.tool = PKInkingTool(.pen, color: .readerFeedbackOrange, width: 5.5)
        view.delegate = context.coordinator
        DispatchQueue.main.async {
            canvasView = view
            hasDrawing = view.drawing.hasVisibleStrokes
        }
        return view
    }

    func updateUIView(_ uiView: PKCanvasView, context: Context) {}

    func makeCoordinator() -> Coordinator {
        Coordinator(hasDrawing: $hasDrawing)
    }

    final class Coordinator: NSObject, PKCanvasViewDelegate {
        @Binding private var hasDrawing: Bool

        init(hasDrawing: Binding<Bool>) {
            _hasDrawing = hasDrawing
        }

        func canvasViewDrawingDidChange(_ canvasView: PKCanvasView) {
            hasDrawing = canvasView.drawing.hasVisibleStrokes
        }
    }
}

private struct ReaderFeedbackSharePayload: Identifiable {
    let id = UUID()
    let activityItems: [Any]
}

private struct ReaderFeedbackShareSheet: UIViewControllerRepresentable {
    let activityItems: [Any]

    func makeUIViewController(context: Context) -> UIActivityViewController {
        UIActivityViewController(activityItems: activityItems, applicationActivities: nil)
    }

    func updateUIViewController(_ uiViewController: UIActivityViewController, context: Context) {}
}

private enum ReaderFeedbackImageRenderer {
    static func renderAnnotatedImage(baseImage: UIImage, drawing: PKDrawing, canvasBounds: CGRect) -> UIImage {
        guard canvasBounds.width > 1, canvasBounds.height > 1 else {
            return baseImage
        }

        let drawingImage = drawing.image(from: canvasBounds, scale: max(1, baseImage.scale))
        let format = UIGraphicsImageRendererFormat.default()
        format.scale = max(2, baseImage.scale)
        let renderer = UIGraphicsImageRenderer(size: baseImage.size, format: format)

        return renderer.image { _ in
            baseImage.draw(in: CGRect(origin: .zero, size: baseImage.size))
            drawingImage.draw(in: CGRect(origin: .zero, size: baseImage.size))
        }
    }
}

private extension UIApplication {
    var readerKeyWindow: UIWindow? {
        connectedScenes
            .compactMap { $0 as? UIWindowScene }
            .flatMap(\.windows)
            .first { $0.isKeyWindow }
    }
}

private extension PKDrawing {
    var hasVisibleStrokes: Bool {
        !bounds.isNull && !bounds.isEmpty
    }
}

private extension UIColor {
    static let readerFeedbackOrange = UIColor(red: 1, green: 149 / 255, blue: 0, alpha: 1)
}

private extension Color {
    static let readerFeedbackOrange = Color(uiColor: .readerFeedbackOrange)
}

private extension ReaderTheme {
    var feedbackChromeBackgroundColor: Color {
        switch self {
        case .architrinoPurple:
            return Color(red: 106 / 255, green: 32 / 255, blue: 151 / 255).opacity(0.88)
        case .light:
            return Color.white.opacity(0.88)
        case .warm:
            return Color(red: 250 / 255, green: 244 / 255, blue: 229 / 255).opacity(0.9)
        case .dark:
            return Color(red: 30 / 255, green: 41 / 255, blue: 59 / 255).opacity(0.9)
        }
    }

    var feedbackActionColor: Color {
        switch self {
        case .architrinoPurple, .dark:
            return .white
        case .light:
            return Color(red: 15 / 255, green: 23 / 255, blue: 42 / 255)
        case .warm:
            return Color(red: 60 / 255, green: 43 / 255, blue: 25 / 255)
        }
    }

    var feedbackDisabledColor: Color {
        feedbackActionColor.opacity(0.36)
    }
}
