import SafariServices
import SwiftUI

struct ReaderSafariDestination: Identifiable {
    let id = UUID()
    let url: URL
}

struct ReaderSafariView: UIViewControllerRepresentable {
    let url: URL

    func makeUIViewController(context: Context) -> SFSafariViewController {
        SFSafariViewController(url: url)
    }

    func updateUIViewController(_ uiViewController: SFSafariViewController, context: Context) {}
}
