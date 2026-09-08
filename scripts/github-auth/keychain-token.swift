// Local macOS credential storage for explicitly selected tool/repository contexts.
// Never accepts a token through arguments or prints one except Git's helper protocol.
import Foundation
import Security
import Darwin

func fail(_ message: String, _ code: Int32 = 1) -> Never {
    FileHandle.standardError.write(Data((message + "\n").utf8)); exit(code)
}
let args = Array(CommandLine.arguments.dropFirst())
guard args.count >= 2 else { fail("Usage: keychain-token <install|credential|check> <context> [get|store|erase]") }
let mode = args[0]
let contexts = ["codex-architrino": "architrino", "codex-mylists": "MyLists"]
guard let repository = contexts[args[1]] else { fail("Unknown context; no credential accessed.") }
let query: [String: Any] = [kSecClass as String: kSecClassGenericPassword,
    kSecAttrService as String: "com.architrino.github.codex.\(repository.lowercased())",
    kSecAttrAccount as String: "jmarkmorris"]
func loadToken() -> Data {
    var q = query; q[kSecReturnData as String] = true; q[kSecMatchLimit as String] = kSecMatchLimitOne
    var result: CFTypeRef?
    let status = SecItemCopyMatching(q as CFDictionary, &result)
    guard status == errSecSuccess, let data = result as? Data else { fail("Selected credential unavailable; no fallback used.") }
    return data
}
switch mode {
case "install":
    guard isatty(STDIN_FILENO) != 0 else { fail("Run installation yourself in an interactive terminal; token input is hidden.") }
    guard let input = getpass("Paste Codex–\(repository) fine-grained PAT (hidden), then press Return: ") else { fail("No input received.") }
    let token = String(cString: input)
    memset(input, 0, strlen(input))
    guard token.hasPrefix("github_pat_"), token.range(of: "^[A-Za-z0-9_]+$", options: .regularExpression) != nil else { fail("Not a fine-grained token; nothing saved.") }
    var item = query
    item[kSecAttrLabel as String] = "Codex \(repository) GitHub PAT"
    item[kSecValueData as String] = Data(token.utf8)
    let status = SecItemAdd(item as CFDictionary, nil)
    if status == errSecDuplicateItem { fail("That Keychain entry already exists; it was not replaced.") }
    guard status == errSecSuccess else { fail("Keychain save failed (status \(status)); existing logins unchanged.") }
    print("Saved Codex–\(repository) token in a separate Keychain entry. Existing logins unchanged.")
case "check":
    _ = loadToken()
    print("Selected Keychain credential is readable. GitHub permissions have not yet been tested.")
case "credential":
    guard args.count == 3 else { fail("Missing Git credential operation.") }
    // Never modify storage in response to Git credential callbacks.
    guard args[2] == "get" else { exit(0) }
    var fields = [String: String]()
    while let line = readLine(), !line.isEmpty {
        let parts = line.split(separator: "=", maxSplits: 1, omittingEmptySubsequences: false)
        if parts.count == 2 { fields[String(parts[0])] = String(parts[1]) }
    }
    guard fields["protocol"] == "https", fields["host"] == "github.com",
          ["jmarkmorris/\(repository)", "jmarkmorris/\(repository).git"].contains(fields["path"] ?? "") else {
        print("quit=true\n"); exit(0)
    }
    guard let token = String(data: loadToken(), encoding: .utf8) else { fail("Invalid credential encoding.") }
    // Output is consumed privately by Git. Do not invoke this mode to inspect a secret.
    print("username=jmarkmorris\npassword=\(token)\n")
default: fail("Unknown operation; no credential accessed.")
}
