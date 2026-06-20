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

        Use the GitHub feedback button in the app to open a prefilled issue.
        GitHub login is required.
        """
    }

    var githubIssueURL: URL {
        ReaderFeedbackIssue.url(title: githubIssueTitle, body: githubIssueBody)
    }

    var githubIssueTitle: String {
        "Feedback: \(locationLabel)"
    }

    var githubIssueBody: String {
        ReaderFeedbackIssue.body(
            locationLabel: locationLabel,
            packageVersion: packageVersion,
            packageDate: packageDate,
            appVersion: Self.appVersionLabel,
            includesClipboardScreenshot: true
        )
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

enum ReaderFeedbackIssue {
    static func url(title: String, body: String) -> URL {
        var components = URLComponents(string: "https://github.com/jmarkmorris/architrino/issues/new")!
        components.queryItems = [
            URLQueryItem(name: "title", value: title),
            URLQueryItem(name: "body", value: body),
        ]
        return components.url!
    }

    static func body(
        locationLabel: String,
        packageVersion: String,
        packageDate: String,
        appVersion: String,
        includesClipboardScreenshot: Bool
    ) -> String {
        let screenshotInstruction = includesClipboardScreenshot
            ? "\n\nThe app copied an annotated screenshot to the clipboard. Paste it into this issue if GitHub does not insert it automatically."
            : ""

        return """
        ## Feedback

        Tell us what you noticed, what confused you, or what would help. Use whatever level of detail fits you.\(screenshotInstruction)

        ## Reader context

        - Location: \(locationLabel)
        - Package version: \(packageVersion)
        - Package date: \(packageDate)
        - App version: \(appVersion)

        """
    }
}

struct ReaderPageFeedbackOverlay: View {
    let context: ReaderFeedbackContext
    let theme: ReaderTheme
    let onClose: () -> Void
    private let feedbackBaseImage: UIImage

    @State private var canvasView: PKCanvasView?
    @State private var hasDrawing = false
    @State private var sharePayload: ReaderFeedbackSharePayload?
    @State private var safariDestination: ReaderSafariDestination?

    init(baseImage: UIImage, context: ReaderFeedbackContext, theme: ReaderTheme, onClose: @escaping () -> Void) {
        self.feedbackBaseImage = ReaderFeedbackImageRenderer.makeFeedbackBaseImage(
            from: baseImage,
            theme: theme
        )
        self.context = context
        self.theme = theme
        self.onClose = onClose
    }

    var body: some View {
        GeometryReader { proxy in
            ZStack {
                Image(uiImage: feedbackBaseImage)
                    .resizable()
                    .frame(width: proxy.size.width, height: proxy.size.height)
                    .clipped()
                    .ignoresSafeArea()

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

                            feedbackIconButton(systemName: "square.and.arrow.up", accessibilityLabel: "Share or save annotated feedback") {
                                shareAnnotatedFeedback()
                            }

                            feedbackSubmitButton {
                                openGitHubIssue()
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
        }
        .sheet(item: $sharePayload) { payload in
            ReaderFeedbackShareSheet(activityItems: payload.activityItems)
        }
        .sheet(item: $safariDestination) { destination in
            ReaderSafariView(url: destination.url)
                .ignoresSafeArea()
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

    private func feedbackSubmitButton(action: @escaping () -> Void) -> some View {
        Button(action: action) {
            ViewThatFits(in: .horizontal) {
                feedbackSubmitLabel("Submit GitHub issue")
                feedbackSubmitLabel("Submit issue")
            }
        }
        .accessibilityLabel("Submit GitHub issue")
    }

    private func feedbackSubmitLabel(_ title: String) -> some View {
        Label(title, systemImage: "exclamationmark.bubble")
            .font(.system(size: 15, weight: .semibold))
            .foregroundStyle(theme.feedbackActionColor)
            .lineLimit(1)
            .minimumScaleFactor(0.82)
            .padding(.horizontal, 12)
            .frame(height: 36)
            .background(theme.feedbackChromeBackgroundColor)
            .clipShape(Capsule())
    }

    private func updateDrawingState() {
        guard let canvasView else {
            hasDrawing = false
            return
        }
        hasDrawing = canvasView.drawing.hasVisibleStrokes
    }

    private func shareAnnotatedFeedback() {
        sharePayload = ReaderFeedbackSharePayload(activityItems: [context.shareText, currentFeedbackImage()])
    }

    private func openGitHubIssue() {
        UIPasteboard.general.image = currentFeedbackImage()
        safariDestination = ReaderSafariDestination(url: context.githubIssueURL)
    }

    private func currentFeedbackImage() -> UIImage {
        guard let canvasView else {
            return feedbackBaseImage
        }

        return ReaderFeedbackImageRenderer.renderAnnotatedImage(
            baseImage: feedbackBaseImage,
            drawing: canvasView.drawing,
            canvasBounds: canvasView.bounds
        )
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
        view.tool = PKInkingTool(.pen, color: .readerFeedbackOrange, width: 6.5)
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
    static func makeFeedbackBaseImage(from baseImage: UIImage, theme: ReaderTheme) -> UIImage {
        let size = baseImage.size
        guard size.width > 1, size.height > 1 else {
            return baseImage
        }

        let topChromeCrop = ReaderFeedbackLayout.topChromeCrop(for: size)
        let footerTransferHeight = ReaderFeedbackLayout.footerTransferHeight(for: size)
        let commentPanelHeight = topChromeCrop + footerTransferHeight
        let sourceTopCrop = ReaderFeedbackLayout.sourceTopCrop(for: size)
        let sourceBottomCrop = ReaderFeedbackLayout.sourceBottomCrop(for: size)
        let sourceHeight = max(1, size.height - sourceTopCrop - sourceBottomCrop)
        let destinationHeight = max(1, size.height - commentPanelHeight)

        let format = UIGraphicsImageRendererFormat.default()
        format.scale = max(2, baseImage.scale)
        let renderer = UIGraphicsImageRenderer(size: size, format: format)

        return renderer.image { context in
            theme.feedbackBackgroundUIColor.setFill()
            context.fill(CGRect(origin: .zero, size: size))

            let sourceRect = CGRect(
                x: 0,
                y: sourceTopCrop,
                width: size.width,
                height: sourceHeight
            )
            let destinationRect = CGRect(
                x: 0,
                y: commentPanelHeight,
                width: size.width,
                height: destinationHeight
            )
            if let croppedImage = croppedFeedbackImage(baseImage, sourceRect: sourceRect) {
                croppedImage.draw(in: destinationRect)
            }

            drawCommentPanel(
                in: CGRect(x: 0, y: 0, width: size.width, height: commentPanelHeight),
                theme: theme,
                context: context.cgContext
            )
        }
    }

    private static func croppedFeedbackImage(_ image: UIImage, sourceRect: CGRect) -> UIImage? {
        guard let cgImage = image.cgImage else {
            return nil
        }

        let scale = image.scale
        let pixelRect = CGRect(
            x: sourceRect.minX * scale,
            y: sourceRect.minY * scale,
            width: sourceRect.width * scale,
            height: sourceRect.height * scale
        ).integral

        guard let cropped = cgImage.cropping(to: pixelRect) else {
            return nil
        }
        return UIImage(cgImage: cropped, scale: scale, orientation: image.imageOrientation)
    }

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

    private static func drawCommentPanel(in rect: CGRect, theme: ReaderTheme, context: CGContext) {
        theme.feedbackBackgroundUIColor.setFill()
        context.fill(rect)

        let inset = ReaderFeedbackLayout.commentPanelInset
        let writableRect = rect.insetBy(dx: inset, dy: 0)
        let rulePath = UIBezierPath()
        let firstRuleY = rect.minY + ReaderFeedbackLayout.commentPanelTopPadding
        let lastRuleY = rect.maxY - ReaderFeedbackLayout.commentPanelBottomPadding
        var y = firstRuleY

        while y <= lastRuleY {
            rulePath.move(to: CGPoint(x: writableRect.minX, y: y))
            rulePath.addLine(to: CGPoint(x: writableRect.maxX, y: y))
            y += ReaderFeedbackLayout.commentPanelLineSpacing
        }

        theme.feedbackRuleUIColor.setStroke()
        rulePath.lineWidth = 1
        rulePath.stroke()
    }
}

private enum ReaderFeedbackLayout {
    static let commentPanelInset: CGFloat = 18
    static let commentPanelTopPadding: CGFloat = 22
    static let commentPanelBottomPadding: CGFloat = 12
    static let commentPanelLineSpacing: CGFloat = 24

    static func topChromeCrop(for size: CGSize) -> CGFloat {
        min(max(size.height * 0.085, 72), 112)
    }

    static func footerTransferHeight(for size: CGSize) -> CGFloat {
        min(max(size.height * 0.07, 64), 96)
    }

    static func sourceTopCrop(for size: CGSize) -> CGFloat {
        min(max(size.height * 0.068, 54), 82)
    }

    static func sourceBottomCrop(for size: CGSize) -> CGFloat {
        min(max(size.height * 0.058, 54), 78)
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
