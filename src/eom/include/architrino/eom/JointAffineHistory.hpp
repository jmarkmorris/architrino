#pragma once

#include "architrino/eom/JointState.hpp"

#include <array>
#include <optional>
#include <string>
#include <vector>

namespace architrino::eom {

using JointCoefficientRow = std::vector<double>;
using JointCubicCoefficientRows =
    std::array<std::array<JointCoefficientRow, 4>, 3>;

struct JointAffineCubicSegment {
  double start_time = 0.0;
  double end_time = 0.0;
  JointCubicCoefficientRows position_coefficients;
  std::array<double, 3> position_remainder_radii{};
  std::array<double, 3> velocity_remainder_radii{};
};

struct JointAffinePointEvaluation {
  JointAffinePathPosition position;
  std::vector<std::array<double, 3>> velocity_shared_coefficients;
  std::array<double, 3> velocity_remainder_radii{};
  std::array<double, 3> ordinary_velocity_radii{};
  bool position_fallback_dominates = false;
  bool velocity_fallback_dominates = false;
};

struct JointAffineEndpointOverride {
  double time = 0.0;
  std::vector<std::array<double, 3>> position_shared_symbol_coefficients;
  std::vector<std::array<double, 3>> velocity_shared_symbol_coefficients;
  std::array<double, 3> position_remainder_radii{};
  std::array<double, 3> velocity_remainder_radii{};
};

// Retained shared-symbol state parallel to one ordinary retained history.  All
// path histories participating in one coupled state use the same ordered
// symbol_registry.  Ordinary radii remain the fail-closed fallback and are
// supplied by the canonical RetainedHistory at each evaluation.
class JointAffineRetainedHistory {
 public:
  JointAffineRetainedHistory(
      std::string path_id,
      std::vector<std::string> symbol_registry,
      std::vector<JointAffineCubicSegment> segments,
      std::optional<JointAffineEndpointOverride> endpoint_override =
          std::nullopt);

  [[nodiscard]] const std::string& path_id() const noexcept { return path_id_; }
  [[nodiscard]] const std::vector<std::string>& symbol_registry() const noexcept {
    return symbol_registry_;
  }
  [[nodiscard]] const std::vector<JointAffineCubicSegment>& segments() const
      noexcept {
    return segments_;
  }
  [[nodiscard]] const std::optional<JointAffineEndpointOverride>&
  endpoint_override() const noexcept { return endpoint_override_; }
  [[nodiscard]] bool covers(double time) const noexcept;

  [[nodiscard]] JointAffinePointEvaluation evaluate(
      double time,
      const std::array<double, 3>& ordinary_position_radii,
      const std::array<double, 3>& ordinary_velocity_radii) const;

  [[nodiscard]] JointAffineRetainedHistory appended(
      JointAffineCubicSegment segment) const;

  [[nodiscard]] JointAffineRetainedHistory with_appended_symbols(
      const std::vector<std::string>& symbol_ids) const;

 private:
  std::string path_id_;
  std::vector<std::string> symbol_registry_;
  std::vector<JointAffineCubicSegment> segments_;
  std::optional<JointAffineEndpointOverride> endpoint_override_;
};

}  // namespace architrino::eom
