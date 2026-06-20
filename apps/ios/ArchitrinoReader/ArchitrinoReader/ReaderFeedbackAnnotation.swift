import PencilKit
import SwiftUI
import UIKit
import WebKit

@MainActor
final class ReaderSnapshotController: ObservableObject {
    weak var webView: WKWebView?

    func captureVisibleSnapshot() async throws -> UIImage {
        guard let webView else {
            throw ReaderFeedbackCaptureError.missingReaderView
        }
        guard webView.bounds.width > 1, webView.bounds.height > 1 else {
            throw ReaderFeedbackCaptureError.emptyReaderView
        }

        let configuration = WKSnapshotConfiguration()
        configuration.rect = webView.bounds

        return try await withCheckedThrowingContinuation { continuation in
            webView.takeSnapshot(with: configuration) { image, error in
                if let image {
                    continuation.resume(returning: image)
                    return
                }
                if let error {
                    continuation.resume(throwing: error)
                    return
                }
                continuation.resume(throwing: ReaderFeedbackCaptureError.emptySnapshot)
            }
        }
    }
}

enum ReaderFeedbackCaptureError: Error {
    case missingReaderView
    case emptyReaderView
    case emptySnapshot
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

struct ReaderFeedbackDraft: Identifiable {
    let id = UUID()
    let context: ReaderFeedbackContext
    let baseImage: UIImage

    init(snapshot: UIImage, context: ReaderFeedbackContext, theme: ReaderTheme) {
        self.context = context
        baseImage = ReaderFeedbackImageRenderer.makeBaseImage(from: snapshot, theme: theme)
    }
}

struct ReaderFeedbackAnnotationSheet: View {
    let draft: ReaderFeedbackDraft
    let theme: ReaderTheme

    @Environment(\.dismiss) private var dismiss
    @State private var canvasView: PKCanvasView?
    @State private var hasDrawing = false
    @State private var sharePayload: ReaderFeedbackSharePayload?

    var body: some View {
        NavigationStack {
            ZStack {
                Color(uiColor: theme.feedbackBackgroundUIColor)
                    .ignoresSafeArea()

                GeometryReader { geometry in
                    ScrollView {
                        ReaderFeedbackCanvasView(
                            baseImage: draft.baseImage,
                            canvasView: $canvasView,
                            hasDrawing: $hasDrawing
                        )
                        .aspectRatio(draft.baseImage.size, contentMode: .fit)
                        .frame(maxWidth: min(geometry.size.width - 24, 940))
                        .padding(.vertical, 16)
                        .frame(maxWidth: .infinity)
                    }
                    .scrollIndicators(.hidden)
                }
            }
            .navigationTitle("Feedback")
            .navigationBarTitleDisplayMode(.inline)
            .toolbarBackground(Color(uiColor: theme.feedbackBackgroundUIColor), for: .navigationBar)
            .toolbarBackground(.visible, for: .navigationBar)
            .toolbarColorScheme(theme.feedbackToolbarColorScheme, for: .navigationBar)
            .tint(theme.feedbackAccentColor)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button {
                        dismiss()
                    } label: {
                        Image(systemName: "xmark")
                    }
                    .accessibilityLabel("Close feedback")
                }

                ToolbarItem(placement: .navigationBarTrailing) {
                    HStack(spacing: 16) {
                        Button {
                            canvasView?.undoManager?.undo()
                            updateDrawingState()
                        } label: {
                            Image(systemName: "arrow.uturn.backward")
                        }
                        .disabled(!hasDrawing)
                        .accessibilityLabel("Undo annotation")

                        Button {
                            canvasView?.drawing = PKDrawing()
                            updateDrawingState()
                        } label: {
                            Image(systemName: "trash")
                        }
                        .disabled(!hasDrawing)
                        .accessibilityLabel("Clear annotation")

                        Button {
                            shareAnnotatedFeedback()
                        } label: {
                            Image(systemName: "square.and.arrow.up")
                        }
                        .accessibilityLabel("Share annotated feedback")
                    }
                }
            }
        }
        .preferredColorScheme(theme.feedbackToolbarColorScheme)
        .sheet(item: $sharePayload) { payload in
            ReaderFeedbackShareSheet(activityItems: payload.activityItems)
        }
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
            sharePayload = ReaderFeedbackSharePayload(activityItems: [draft.context.shareText, draft.baseImage])
            return
        }

        let image = ReaderFeedbackImageRenderer.renderAnnotatedImage(
            baseImage: draft.baseImage,
            drawing: canvasView.drawing,
            canvasBounds: canvasView.bounds
        )
        sharePayload = ReaderFeedbackSharePayload(activityItems: [draft.context.shareText, image])
    }
}

private struct ReaderFeedbackCanvasView: UIViewRepresentable {
    let baseImage: UIImage
    @Binding var canvasView: PKCanvasView?
    @Binding var hasDrawing: Bool

    func makeUIView(context: Context) -> ReaderFeedbackCanvasContainerView {
        let view = ReaderFeedbackCanvasContainerView()
        view.configure(baseImage: baseImage)
        view.canvasView.delegate = context.coordinator
        DispatchQueue.main.async {
            canvasView = view.canvasView
            hasDrawing = view.canvasView.drawing.hasVisibleStrokes
        }
        return view
    }

    func updateUIView(_ uiView: ReaderFeedbackCanvasContainerView, context: Context) {
        uiView.configure(baseImage: baseImage)
    }

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

private final class ReaderFeedbackCanvasContainerView: UIView {
    let imageView = UIImageView()
    let canvasView = PKCanvasView()

    override init(frame: CGRect) {
        super.init(frame: frame)
        setup()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setup()
    }

    func configure(baseImage: UIImage) {
        imageView.image = baseImage
    }

    private func setup() {
        backgroundColor = .clear

        imageView.contentMode = .scaleToFill
        imageView.translatesAutoresizingMaskIntoConstraints = false
        addSubview(imageView)

        canvasView.backgroundColor = .clear
        canvasView.isOpaque = false
        canvasView.isScrollEnabled = false
        canvasView.drawingPolicy = .anyInput
        canvasView.tool = PKInkingTool(.pen, color: .readerFeedbackOrange, width: 5.5)
        canvasView.translatesAutoresizingMaskIntoConstraints = false
        addSubview(canvasView)

        NSLayoutConstraint.activate([
            imageView.leadingAnchor.constraint(equalTo: leadingAnchor),
            imageView.trailingAnchor.constraint(equalTo: trailingAnchor),
            imageView.topAnchor.constraint(equalTo: topAnchor),
            imageView.bottomAnchor.constraint(equalTo: bottomAnchor),
            canvasView.leadingAnchor.constraint(equalTo: leadingAnchor),
            canvasView.trailingAnchor.constraint(equalTo: trailingAnchor),
            canvasView.topAnchor.constraint(equalTo: topAnchor),
            canvasView.bottomAnchor.constraint(equalTo: bottomAnchor),
        ])
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
    static func makeBaseImage(from snapshot: UIImage, theme: ReaderTheme) -> UIImage {
        let sourceSize = CGSize(
            width: max(1, snapshot.size.width),
            height: max(1, snapshot.size.height)
        )
        let horizontalMargin = max(48, sourceSize.width * 0.08)
        let topMargin = max(28, sourceSize.height * 0.035)
        let screenshotBottomSpacing: CGFloat = 34
        let writingHeight = max(300, sourceSize.height * 0.42)
        let bottomMargin = max(40, topMargin)
        let canvasSize = CGSize(
            width: sourceSize.width + (horizontalMargin * 2),
            height: topMargin + sourceSize.height + screenshotBottomSpacing + writingHeight + bottomMargin
        )

        let format = UIGraphicsImageRendererFormat.default()
        format.scale = max(2, snapshot.scale)
        let renderer = UIGraphicsImageRenderer(size: canvasSize, format: format)

        return renderer.image { context in
            theme.feedbackBackgroundUIColor.setFill()
            context.fill(CGRect(origin: .zero, size: canvasSize))

            let screenshotRect = CGRect(
                x: horizontalMargin,
                y: topMargin,
                width: sourceSize.width,
                height: sourceSize.height
            )
            snapshot.draw(in: screenshotRect)

            let borderPath = UIBezierPath(roundedRect: screenshotRect, cornerRadius: 16)
            theme.feedbackRuleUIColor.withAlphaComponent(0.22).setStroke()
            borderPath.lineWidth = 1
            borderPath.stroke()

            let writingRect = CGRect(
                x: horizontalMargin,
                y: screenshotRect.maxY + screenshotBottomSpacing,
                width: sourceSize.width,
                height: writingHeight
            )
            drawWritingRules(in: writingRect, theme: theme)
        }
    }

    static func renderAnnotatedImage(baseImage: UIImage, drawing: PKDrawing, canvasBounds: CGRect) -> UIImage {
        guard canvasBounds.width > 1, canvasBounds.height > 1 else {
            return baseImage
        }

        let exportScale = baseImage.size.width / canvasBounds.width
        let drawingImage = drawing.image(from: canvasBounds, scale: exportScale)
        let format = UIGraphicsImageRendererFormat.default()
        format.scale = max(2, baseImage.scale)
        let renderer = UIGraphicsImageRenderer(size: baseImage.size, format: format)

        return renderer.image { _ in
            baseImage.draw(in: CGRect(origin: .zero, size: baseImage.size))
            drawingImage.draw(in: CGRect(origin: .zero, size: baseImage.size))
        }
    }

    private static func drawWritingRules(in rect: CGRect, theme: ReaderTheme) {
        let path = UIBezierPath()
        let lineSpacing: CGFloat = 58
        var y = rect.minY + lineSpacing

        while y < rect.maxY {
            path.move(to: CGPoint(x: rect.minX, y: y))
            path.addLine(to: CGPoint(x: rect.maxX, y: y))
            y += lineSpacing
        }

        theme.feedbackRuleUIColor.setStroke()
        path.lineWidth = 1
        path.stroke()
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

private extension ReaderTheme {
    var feedbackBackgroundUIColor: UIColor {
        switch self {
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

    var feedbackRuleUIColor: UIColor {
        switch self {
        case .architrinoPurple, .dark:
            return UIColor.white.withAlphaComponent(0.18)
        case .light, .warm:
            return UIColor.black.withAlphaComponent(0.14)
        }
    }

    var feedbackAccentColor: Color {
        switch self {
        case .architrinoPurple, .dark:
            return .white
        case .light, .warm:
            return .blue
        }
    }

    var feedbackToolbarColorScheme: ColorScheme? {
        switch self {
        case .architrinoPurple, .dark:
            return .dark
        case .light, .warm:
            return .light
        }
    }
}
