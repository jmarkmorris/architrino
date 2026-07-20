#include "architrino/eom/JointEndpointCorrector.hpp"

#include <algorithm>
#include <cmath>
#include <stdexcept>

namespace architrino::eom {
namespace {

const JointReceiverAccelerationState& receiver_state(
    const JointAccelerationSnapshotCertificate& snapshot,
    const std::string& path_id) {
  const auto found = std::find_if(
      snapshot.receivers.begin(), snapshot.receivers.end(),
      [&](const auto& receiver) { return receiver.path_id == path_id; });
  if (found == snapshot.receivers.end()) {
    throw std::invalid_argument(
        "joint endpoint corrector lacks a receiver state");
  }
  return *found;
}

Interval symmetric(double radius) {
  return Interval(-radius, radius);
}

Interval pairwise_sum(std::vector<Interval> terms) {
  if (terms.empty()) return Interval::point(0.0);
  while (terms.size() > 1U) {
    std::vector<Interval> next;
    next.reserve((terms.size() + 1U) / 2U);
    for (std::size_t index = 0U; index < terms.size(); index += 2U) {
      next.push_back(
          index + 1U < terms.size()
              ? terms[index] + terms[index + 1U]
              : terms[index]);
    }
    terms = std::move(next);
  }
  return terms.front();
}

DenseMatrix inverse(DenseMatrix matrix) {
  const std::size_t dimension = matrix.size();
  DenseMatrix result(
      dimension, std::vector<double>(dimension, 0.0));
  for (std::size_t row = 0U; row < dimension; ++row) {
    if (matrix[row].size() != dimension) {
      throw std::invalid_argument(
          "joint endpoint corrector Jacobian is not square");
    }
    result[row][row] = 1.0;
  }
  for (std::size_t column = 0U; column < dimension; ++column) {
    std::size_t pivot = column;
    double pivot_magnitude = std::abs(matrix[pivot][column]);
    for (std::size_t row = column + 1U; row < dimension; ++row) {
      const double candidate = std::abs(matrix[row][column]);
      if (candidate > pivot_magnitude) {
        pivot = row;
        pivot_magnitude = candidate;
      }
    }
    if (!(pivot_magnitude > 0.0) || !std::isfinite(pivot_magnitude)) {
      throw std::invalid_argument(
          "joint endpoint corrector midpoint Jacobian is singular");
    }
    if (pivot != column) {
      std::swap(matrix[pivot], matrix[column]);
      std::swap(result[pivot], result[column]);
    }
    const double scale = matrix[column][column];
    for (std::size_t entry = 0U; entry < dimension; ++entry) {
      matrix[column][entry] /= scale;
      result[column][entry] /= scale;
    }
    for (std::size_t row = 0U; row < dimension; ++row) {
      if (row == column) continue;
      const double factor = matrix[row][column];
      if (factor == 0.0) continue;
      for (std::size_t entry = 0U; entry < dimension; ++entry) {
        matrix[row][entry] -= factor * matrix[column][entry];
        result[row][entry] -= factor * result[column][entry];
      }
    }
  }
  return result;
}

}  // namespace

JointEndpointCorrectorCertificate certify_joint_endpoint_corrector(
    const JointEndpointCorrectorRequest& request) {
  JointEndpointCorrectorCertificate result;
  if (!request.evaluated_snapshot.certified) {
    result.failure_code = "joint_corrector_requires_certified_snapshot";
    return result;
  }
  const std::size_t path_count = request.path_ids.size();
  const std::size_t dimension = 3U * path_count;
  result.dimension = dimension;
  result.retained_symbol_count = request.retained_symbol_count;
  if (dimension == 0U ||
      request.corrector_variable_radii.size() != dimension ||
      request.evaluated_snapshot.shared_symbol_count !=
          request.retained_symbol_count + dimension) {
    throw std::invalid_argument(
        "joint endpoint corrector dimensions disagree");
  }

  result.corrector_jacobian.assign(
      dimension,
      std::vector<Interval>(dimension, Interval::point(0.0)));
  std::vector<double> center(dimension, 0.0);
  IntervalDenseVector candidate_box;
  candidate_box.reserve(dimension);
  result.parametric_residual_at_center.reserve(dimension);
  for (std::size_t path = 0U; path < path_count; ++path) {
    const auto& path_id = request.path_ids[path];
    const auto center_found = request.endpoint_centers.find(path_id);
    const auto coefficient_found =
        request.endpoint_shared_coefficients.find(path_id);
    if (center_found == request.endpoint_centers.end() ||
        coefficient_found == request.endpoint_shared_coefficients.end() ||
        coefficient_found->second.size() != request.retained_symbol_count) {
      throw std::invalid_argument(
          "joint endpoint corrector lacks endpoint affine state");
    }
    const auto& evaluated = receiver_state(
        request.evaluated_snapshot, path_id);
    if (evaluated.shared_symbol_coefficients.size() !=
            request.retained_symbol_count + dimension ||
        evaluated.shared_symbol_coefficient_enclosures.size() !=
            request.retained_symbol_count + dimension) {
      throw std::invalid_argument(
          "joint endpoint corrector snapshot registry is not aligned");
    }
    for (std::size_t axis = 0U; axis < 3U; ++axis) {
      const std::size_t row = 3U * path + axis;
      std::vector<Interval> residual_terms;
      residual_terms.push_back(
          Interval::point(center_found->second[axis]) -
          Interval::point(evaluated.center[axis]));
      residual_terms.push_back(
          symmetric(evaluated.independent_remainder_radii[axis]));
      for (std::size_t symbol = 0U;
           symbol < request.retained_symbol_count; ++symbol) {
        residual_terms.push_back(
            (Interval::point(coefficient_found->second[symbol][axis]) -
             evaluated.shared_symbol_coefficient_enclosures[symbol][axis]) *
            Interval(-1.0, 1.0));
      }
      result.parametric_residual_at_center.push_back(
          pairwise_sum(std::move(residual_terms)));

      const double row_radius = request.corrector_variable_radii[row];
      if (!(row_radius > 0.0) || !std::isfinite(row_radius)) {
        throw std::invalid_argument(
            "joint endpoint corrector radii must be finite and positive");
      }
      candidate_box.push_back(symmetric(row_radius));
      for (std::size_t column = 0U; column < dimension; ++column) {
        const double column_radius =
            request.corrector_variable_radii[column];
        if (!(column_radius > 0.0) || !std::isfinite(column_radius)) {
          throw std::invalid_argument(
              "joint endpoint corrector radii must be finite and positive");
        }
        const Interval evaluated_derivative =
            evaluated.shared_symbol_coefficient_enclosures[
                request.retained_symbol_count + column][axis] /
            Interval::point(column_radius);
        result.corrector_jacobian[row][column] =
            Interval::point(row == column ? 1.0 : 0.0) -
            evaluated_derivative;
      }
    }
  }

  DenseMatrix midpoint_jacobian(
      dimension, std::vector<double>(dimension, 0.0));
  for (std::size_t row = 0U; row < dimension; ++row) {
    for (std::size_t column = 0U; column < dimension; ++column) {
      midpoint_jacobian[row][column] =
          result.corrector_jacobian[row][column].midpoint();
    }
  }
  result.preconditioner = inverse(std::move(midpoint_jacobian));
  result.krawczyk = certify_krawczyk_inclusion({
      .center = std::move(center),
      .residual_at_center = result.parametric_residual_at_center,
      .jacobian = result.corrector_jacobian,
      .preconditioner = result.preconditioner,
      .candidate_box = std::move(candidate_box),
  });
  if (!result.krawczyk.certified_unique) {
    result.failure_code = result.krawczyk.failure_code;
    return result;
  }
  for (std::size_t path = 0U; path < path_count; ++path) {
    std::array<double, 3> radii{};
    for (std::size_t axis = 0U; axis < 3U; ++axis) {
      const auto& image = result.krawczyk.image[3U * path + axis];
      radii[axis] = std::max(std::abs(image.lower()), std::abs(image.upper()));
    }
    result.endpoint_remainder_radii.emplace(
        request.path_ids[path], radii);
  }
  result.certified = true;
  return result;
}

}  // namespace architrino::eom
