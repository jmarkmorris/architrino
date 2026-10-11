#pragma once

#include "architrino/eom/Interval.hpp"

#include <array>
#include <string>

namespace architrino::eom {

using SurfaceMatrix = std::array<IntervalVector, 3>;
using SurfaceFrameTokens = std::array<std::array<std::string, 3>, 3>;

struct SurfaceGeometryDefinition {
  std::string kind = "sphere";
  std::string radius = "1";
  std::string flattening = "1";
  std::string major_radius = "2";
  std::array<std::string, 3> center{"0", "0", "0"};
  // Exact decimal orthogonal matrix, mapping body coordinates to world.
  // Admission proves U^T U = I in rational arithmetic; no matrix repair.
  SurfaceFrameTokens orientation{{{"1", "0", "0"},
                                  {"0", "1", "0"},
                                  {"0", "0", "1"}}};
};

struct SurfaceGeometryEvaluation {
  Interval defining_value;
  IntervalVector gradient;
  SurfaceMatrix hessian;
  Interval gradient_squared;
  Interval distance_bound;
};

class SurfaceGeometry {
 public:
  explicit SurfaceGeometry(SurfaceGeometryDefinition definition);
  [[nodiscard]] const SurfaceGeometryDefinition& definition() const noexcept;
  [[nodiscard]] const std::string& canonical_json() const noexcept;
  [[nodiscard]] const std::string& digest() const noexcept;
  [[nodiscard]] SurfaceGeometryEvaluation evaluate(
      const IntervalVector& position) const;
  [[nodiscard]] IntervalVector body_position(const IntervalVector&) const;
  [[nodiscard]] IntervalVector world_vector(const IntervalVector&) const;
  [[nodiscard]] const SurfaceMatrix& orientation() const noexcept;

 private:
  const SurfaceGeometryDefinition definition_;
  const SurfaceMatrix orientation_;
  const std::string canonical_json_;
  const std::string digest_;
};

}  // namespace architrino::eom
