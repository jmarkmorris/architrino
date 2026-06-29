#include "architrino/solver/InvariantChecks.hpp"

#include <algorithm>
#include <cmath>
#include <limits>
#include <string>
#include <utility>

namespace architrino::solver {

namespace {

bool finite(double value) {
  return std::isfinite(value);
}

bool finite_vector(Vector3 value) {
  return finite(value.x) && finite(value.y) && finite(value.z);
}

Vector3 difference(Vector3 lhs, Vector3 rhs) {
  return Vector3{lhs.x - rhs.x, lhs.y - rhs.y, lhs.z - rhs.z};
}

double norm(Vector3 value) {
  return std::sqrt(value.x * value.x + value.y * value.y + value.z * value.z);
}

bool close_scaled(double actual, double expected, double tolerance) {
  const double scale = std::max({1.0, std::abs(actual), std::abs(expected)});
  return std::abs(actual - expected) <= tolerance * scale;
}

void add_invariant_failure(ValidationReport& validation,
                           std::string message,
                           std::string stage) {
  validation.add(StatusCode::ValidationReplayMismatch,
                 StatusSeverity::Error,
                 std::move(message),
                 std::move(stage),
                 false);
}

void check_root(const CausalRoot& root,
                std::size_t index,
                const InvariantCheckOptions& options,
                ValidationReport& validation) {
  const std::string stage = "root-invariant[" + std::to_string(index) + "]";
  if (!finite(root.emissionTime) || !finite(root.hitTime) || !finite(root.delay) ||
      !finite(root.distance) || !finite(root.residual) || !finite(root.jacobian) ||
      !finite(root.sourceNormalSpeed) || !finite(root.receiverNormalSpeed) ||
      !finite(root.sourceNormalDenominator) || !finite(root.receiverNormalNumerator) ||
      !finite(root.receiverNormalCrossingFactor) || !finite_vector(root.sourcePoint) ||
      !finite_vector(root.receiverPoint)) {
    validation.add(StatusCode::InternalSolverError,
                   StatusSeverity::Error,
                   "root row contains non-finite numeric fields",
                   stage,
                   false);
    return;
  }

  const double expectedDelay = root.hitTime - root.emissionTime;
  if (!close_scaled(root.delay, expectedDelay, options.timeTolerance)) {
    add_invariant_failure(validation, "root delay does not match hit minus emission time", stage);
  }
  if (root.delay < -options.timeTolerance) {
    add_invariant_failure(validation, "root delay is negative", stage);
  }

  const double expectedDistance = norm(difference(root.receiverPoint, root.sourcePoint));
  if (!close_scaled(root.distance, expectedDistance, options.distanceTolerance)) {
    add_invariant_failure(validation, "root distance does not match source/receiver separation", stage);
  }
  if (root.distance < -options.distanceTolerance) {
    add_invariant_failure(validation, "root distance is negative", stage);
  }
  if (std::abs(root.residual) > options.rootResidualTolerance) {
    add_invariant_failure(validation, "root residual exceeds tolerance", stage);
  }
  if (!close_scaled(root.sourceNormalDenominator, root.jacobian, options.branchWeightTolerance)) {
    add_invariant_failure(validation, "root source normal denominator does not match Jacobian", stage);
  }

  if (std::abs(root.jacobian) <= options.smallJacobianTolerance) {
    if (root.statusCode != StatusCode::SmallJacobian) {
      add_invariant_failure(validation, "small-Jacobian root is not marked small_jacobian", stage);
    }
    return;
  }

  const double expectedBranchWeight = 1.0 / std::abs(root.jacobian);
  if (!finite(root.branchWeight) ||
      !close_scaled(root.branchWeight, expectedBranchWeight, options.branchWeightTolerance)) {
    add_invariant_failure(validation, "root branch weight does not match inverse Jacobian magnitude", stage);
  }
  const double expectedReceiverNormalFactor =
      root.receiverNormalNumerator / root.sourceNormalDenominator;
  if (!finite(root.receiverNormalFactor) ||
      !close_scaled(root.receiverNormalFactor, expectedReceiverNormalFactor, options.branchWeightTolerance)) {
    add_invariant_failure(validation,
                          "root receiver normal factor does not match numerator over denominator",
                          stage);
  }
  if (!finite(root.unsignedReceiverNormalFactor) ||
      !close_scaled(root.unsignedReceiverNormalFactor,
                    std::abs(root.receiverNormalFactor),
                    options.branchWeightTolerance)) {
    add_invariant_failure(validation,
                          "root unsigned receiver normal factor does not match magnitude",
                          stage);
  }
}

void check_hit(const DelayedHitEvent& hit,
               std::size_t index,
               const InvariantCheckOptions& options,
               ValidationReport& validation) {
  const std::string stage = "delayed-hit-invariant[" + std::to_string(index) + "]";
  if (!finite(hit.emissionTime) || !finite(hit.hitTime) || !finite(hit.distance) ||
      !finite(hit.jacobian) || !finite(hit.strength) || !finite_vector(hit.emissionPoint) ||
      !finite(hit.sourceNormalSpeed) || !finite(hit.receiverNormalSpeed) ||
      !finite(hit.sourceNormalDenominator) || !finite(hit.receiverNormalNumerator) ||
      !finite(hit.receiverNormalCrossingFactor) || !finite_vector(hit.receiverPoint) ||
      !finite_vector(hit.unitDirection)) {
    validation.add(StatusCode::InternalSolverError,
                   StatusSeverity::Error,
                   "delayed-hit row contains non-finite numeric fields",
                   stage,
                   false);
    return;
  }

  if (hit.hitTime + options.timeTolerance < hit.emissionTime) {
    add_invariant_failure(validation, "delayed-hit time ordering is invalid", stage);
  }

  const Vector3 displacement = difference(hit.receiverPoint, hit.emissionPoint);
  const double expectedDistance = norm(displacement);
  if (!close_scaled(hit.distance, expectedDistance, options.distanceTolerance)) {
    add_invariant_failure(validation, "delayed-hit distance does not match endpoints", stage);
  }
  if (hit.distance < -options.distanceTolerance) {
    add_invariant_failure(validation, "delayed-hit distance is negative", stage);
  }
  if (!close_scaled(hit.sourceNormalDenominator, hit.jacobian, options.branchWeightTolerance)) {
    add_invariant_failure(validation, "delayed-hit source normal denominator does not match Jacobian", stage);
  }

  if (hit.distance > options.distanceTolerance) {
    const double directionNorm = norm(hit.unitDirection);
    if (!close_scaled(directionNorm, 1.0, options.directionTolerance)) {
      add_invariant_failure(validation, "delayed-hit unit direction is not normalized", stage);
    }
    const Vector3 expectedDirection{
        displacement.x / expectedDistance,
        displacement.y / expectedDistance,
        displacement.z / expectedDistance,
    };
    if (!close_scaled(hit.unitDirection.x, expectedDirection.x, options.directionTolerance) ||
        !close_scaled(hit.unitDirection.y, expectedDirection.y, options.directionTolerance) ||
        !close_scaled(hit.unitDirection.z, expectedDirection.z, options.directionTolerance)) {
      add_invariant_failure(validation, "delayed-hit unit direction does not match endpoints", stage);
    }
  }

  if (std::abs(hit.jacobian) > options.smallJacobianTolerance) {
    const double expectedStrength = 1.0 / std::abs(hit.jacobian);
    if (!close_scaled(hit.strength, expectedStrength, options.branchWeightTolerance)) {
      add_invariant_failure(validation, "delayed-hit strength does not match inverse Jacobian magnitude", stage);
    }
    const double expectedReceiverNormalFactor =
        hit.receiverNormalNumerator / hit.sourceNormalDenominator;
    if (!finite(hit.receiverNormalFactor) ||
        !close_scaled(hit.receiverNormalFactor, expectedReceiverNormalFactor, options.branchWeightTolerance)) {
      add_invariant_failure(validation,
                            "delayed-hit receiver normal factor does not match numerator over denominator",
                            stage);
    }
    if (!finite(hit.unsignedReceiverNormalFactor) ||
        !close_scaled(hit.unsignedReceiverNormalFactor,
                      std::abs(hit.receiverNormalFactor),
                      options.branchWeightTolerance)) {
      add_invariant_failure(validation,
                            "delayed-hit unsigned receiver normal factor does not match magnitude",
                            stage);
    }
  }
}

}  // namespace

InvariantCheckReport check_root_hit_invariants(const std::vector<CausalRoot>& roots,
                                               const std::vector<DelayedHitEvent>& hits,
                                               const InvariantCheckOptions& options) {
  InvariantCheckReport report;
  report.rootCount = roots.size();
  report.hitCount = hits.size();

  for (std::size_t index = 0; index < roots.size(); ++index) {
    check_root(roots[index], index, options, report.validation);
  }
  for (std::size_t index = 0; index < hits.size(); ++index) {
    check_hit(hits[index], index, options, report.validation);
  }

  if (report.validation.statuses.empty()) {
    report.validation.add(StatusCode::Ok,
                          StatusSeverity::Ok,
                          "root and delayed-hit invariants passed",
                          "invariant-check");
  }
  return report;
}

}  // namespace architrino::solver
