#pragma once

#include "architrino/eom/JointState.hpp"

#include <array>
#include <optional>
#include <string>
#include <vector>

namespace architrino::eom {

class RetainedHistory;

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
// symbol_registry.  Ordinary radii remain the fallback; verification is
// required for advancement, and they are supplied by the canonical
// RetainedHistory at each evaluation.
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

  // Evaluates one already-validated retained segment directly. This preserves
  // the segment choice made by an upstream certified row without copying that
  // segment and the shared symbol registry into a temporary one-segment
  // history.
  [[nodiscard]] JointAffinePointEvaluation evaluate_segment(
      std::size_t segment_index,
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

// Encloses receiver minus transmitter position while retaining cancellation
// between aligned shared symbols. The ordinary histories remain an
// independently certified fallback, and the returned components are the
// intersections of the joint and ordinary displacement enclosures.
[[nodiscard]] IntervalVector joint_affine_displacement_hull(
    const RetainedHistory& receiver_ordinary,
    const JointAffineRetainedHistory& receiver_joint,
    const Interval& reception,
    const RetainedHistory& transmitter_ordinary,
    const JointAffineRetainedHistory& transmitter_joint,
    const Interval& emission);

// Precomputes the shared-error part of a displacement enclosure over one
// complete receiver/source segment pair. It is independent of quadrature-cell
// boundaries and may therefore be reused by every cell in that segment pair.
[[nodiscard]] IntervalVector joint_affine_segment_pair_error_hull(
    const JointAffineCubicSegment& receiver,
    const JointAffineCubicSegment& transmitter,
    std::size_t shared_symbol_count);

}  // namespace architrino::eom
