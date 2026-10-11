#pragma once

#include <stdexcept>
#include <string>
#include <string_view>
#include <vector>

namespace architrino::eom {

// Omission on the legacy request preserves its recorded numeric meaning.
// Explicit selections are admitted only on their implemented domain.
struct EquationSelection {
  std::string composition_id = "canonical/v1";
  std::string speed_domain = "unrestricted";
  std::string boundary_policy = "none";
  std::string constraint = "none";
  std::string method = "numerical";
};

class EquationAdmissionError : public std::invalid_argument {
 public:
  EquationAdmissionError(std::string code, std::string message);
  [[nodiscard]] const std::string& code() const noexcept { return code_; }
 private:
  std::string code_;
};

struct EquationStageSpec {
  std::string id;
  std::string provider_id;
  std::string input_type;
  std::string output_type;
  std::vector<std::string> dependencies;
};

// A descriptive dependency contract for a registered evaluator, not a
// caller-editable pipeline or an implemented general stage interpreter.
class EquationPlan {
 public:
  EquationPlan(std::string id, std::vector<EquationStageSpec> stages);
  [[nodiscard]] const std::string& id() const noexcept { return id_; }
  [[nodiscard]] const std::vector<EquationStageSpec>& stages() const noexcept {
    return stages_;
  }
  [[nodiscard]] const std::string& canonical_json() const noexcept {
    return canonical_json_;
  }
  [[nodiscard]] const std::string& digest() const noexcept { return digest_; }
 private:
  const std::string id_;
  const std::vector<EquationStageSpec> stages_;
  const std::string canonical_json_;
  const std::string digest_;
};

// These helpers identify bytes/decimal values, not scientific correctness.
[[nodiscard]] std::string equation_identity_sha256(std::string_view bytes);
[[nodiscard]] std::string equation_json_quote(std::string_view value);
[[nodiscard]] std::string equation_decimal_identity(std::string_view token);

}  // namespace architrino::eom
