#include "architrino/eom/Krawczyk.hpp"

#include <algorithm>
#include <cmath>
#include <limits>
#include <stdexcept>

namespace architrino::eom {
namespace {

void validate_square_dimensions(const KrawczykRequest& request) {
  const std::size_t dimension = request.center.size();
  if (dimension == 0U || request.residual_at_center.size() != dimension ||
      request.jacobian.size() != dimension ||
      request.preconditioner.size() != dimension ||
      request.candidate_box.size() != dimension) {
    throw std::invalid_argument("Krawczyk dimensions are incomplete");
  }
  for (std::size_t row = 0U; row < dimension; ++row) {
    if (request.jacobian[row].size() != dimension ||
        request.preconditioner[row].size() != dimension) {
      throw std::invalid_argument("Krawczyk matrices must be square");
    }
    if (!std::isfinite(request.center[row])) {
      throw std::invalid_argument("Krawczyk center must be finite");
    }
    if (request.center[row] < request.candidate_box[row].lower() ||
        request.center[row] > request.candidate_box[row].upper()) {
      throw std::invalid_argument("Krawczyk center lies outside candidate box");
    }
    for (const double value : request.preconditioner[row]) {
      if (!std::isfinite(value)) {
        throw std::invalid_argument("Krawczyk preconditioner must be finite");
      }
    }
  }
}

Interval interval_sum(const std::vector<Interval>& values) {
  Interval result = Interval::point(0.0);
  for (const auto& value : values) {
    if (value.is_exact_zero()) continue;
    if (result.is_exact_zero()) {
      result = value;
    } else {
      result = result + value;
    }
  }
  return result;
}

Interval dot_row(
    const std::vector<double>& row,
    const IntervalDenseVector& vector) {
  std::vector<Interval> terms;
  terms.reserve(row.size());
  for (std::size_t index = 0U; index < row.size(); ++index) {
    if (row[index] == 0.0 || vector[index].is_exact_zero()) continue;
    terms.push_back(Interval::point(row[index]) * vector[index]);
  }
  return interval_sum(terms);
}

Interval dot_interval_row(
    const std::vector<Interval>& row,
    const IntervalDenseVector& vector) {
  std::vector<Interval> terms;
  terms.reserve(row.size());
  for (std::size_t index = 0U; index < row.size(); ++index) {
    if (row[index].is_exact_zero() || vector[index].is_exact_zero()) continue;
    terms.push_back(row[index] * vector[index]);
  }
  return interval_sum(terms);
}

std::optional<Interval> certify_determinant(const DenseMatrix& matrix) {
  const std::size_t dimension = matrix.size();
  IntervalDenseMatrix working(
      dimension,
      std::vector<Interval>(dimension, Interval::point(0.0)));
  for (std::size_t row = 0U; row < dimension; ++row) {
    for (std::size_t column = 0U; column < dimension; ++column) {
      working[row][column] = Interval::point(matrix[row][column]);
    }
  }
  bool odd_swaps = false;
  for (std::size_t pivot_column = 0U;
       pivot_column < dimension; ++pivot_column) {
    std::size_t pivot_row = pivot_column;
    double pivot_magnitude = 0.0;
    bool pivot_found = false;
    for (std::size_t row = pivot_column; row < dimension; ++row) {
      const auto& candidate = working[row][pivot_column];
      if (candidate.contains_zero()) continue;
      const double magnitude = std::min(
          std::abs(candidate.lower()), std::abs(candidate.upper()));
      if (!pivot_found || magnitude > pivot_magnitude) {
        pivot_magnitude = magnitude;
        pivot_row = row;
        pivot_found = true;
      }
    }
    if (!pivot_found) return std::nullopt;
    if (pivot_row != pivot_column) {
      std::swap(working[pivot_row], working[pivot_column]);
      odd_swaps = !odd_swaps;
    }
    const Interval pivot = working[pivot_column][pivot_column];
    for (std::size_t row = pivot_column + 1U; row < dimension; ++row) {
      if (working[row][pivot_column].is_exact_zero()) continue;
      const Interval factor = working[row][pivot_column] / pivot;
      for (std::size_t column = pivot_column;
           column < dimension; ++column) {
        working[row][column] = working[row][column] -
            factor * working[pivot_column][column];
      }
    }
  }
  Interval determinant = Interval::point(odd_swaps ? -1.0 : 1.0);
  for (std::size_t index = 0U; index < dimension; ++index) {
    determinant = determinant * working[index][index];
  }
  if (determinant.contains_zero()) return std::nullopt;
  return determinant;
}

}  // namespace

KrawczykCertificate certify_krawczyk_inclusion(
    const KrawczykRequest& request) {
  validate_square_dimensions(request);
  const std::size_t dimension = request.center.size();
  KrawczykCertificate result;
  result.dimension = dimension;
  result.preconditioner_determinant =
      certify_determinant(request.preconditioner);
  result.preconditioner_nonsingular_certified =
      result.preconditioner_determinant.has_value();
  if (!result.preconditioner_nonsingular_certified) {
    result.failure_code = "preconditioner_nonsingularity_not_certified";
    return result;
  }

  IntervalDenseVector centered_box;
  centered_box.reserve(dimension);
  for (std::size_t row = 0U; row < dimension; ++row) {
    centered_box.push_back(
        request.candidate_box[row] - Interval::point(request.center[row]));
  }

  IntervalDenseMatrix preconditioned_jacobian(
      dimension,
      std::vector<Interval>(dimension, Interval::point(0.0)));
  for (std::size_t row = 0U; row < dimension; ++row) {
    for (std::size_t column = 0U; column < dimension; ++column) {
      std::vector<Interval> terms;
      terms.reserve(dimension);
      for (std::size_t inner = 0U; inner < dimension; ++inner) {
        if (request.preconditioner[row][inner] == 0.0 ||
            request.jacobian[inner][column].is_exact_zero()) {
          continue;
        }
        terms.push_back(
            Interval::point(request.preconditioner[row][inner]) *
            request.jacobian[inner][column]);
      }
      preconditioned_jacobian[row][column] = interval_sum(terms);
    }
  }

  IntervalDenseMatrix contraction = preconditioned_jacobian;
  for (std::size_t row = 0U; row < dimension; ++row) {
    for (std::size_t column = 0U; column < dimension; ++column) {
      contraction[row][column] =
          Interval::point(row == column ? 1.0 : 0.0) -
          preconditioned_jacobian[row][column];
    }
  }

  result.image.reserve(dimension);
  result.lower_containment_margins.reserve(dimension);
  result.upper_containment_margins.reserve(dimension);
  result.minimum_containment_margin =
      std::numeric_limits<double>::infinity();
  bool strictly_interior = true;
  for (std::size_t row = 0U; row < dimension; ++row) {
    const Interval corrected_center =
        Interval::point(request.center[row]) -
        dot_row(request.preconditioner[row], request.residual_at_center);
    const Interval image = corrected_center +
        dot_interval_row(contraction[row], centered_box);
    result.image.push_back(image);
    const double lower_margin =
        image.lower() - request.candidate_box[row].lower();
    const double upper_margin =
        request.candidate_box[row].upper() - image.upper();
    result.lower_containment_margins.push_back(lower_margin);
    result.upper_containment_margins.push_back(upper_margin);
    result.minimum_containment_margin = std::min(
        result.minimum_containment_margin,
        std::min(lower_margin, upper_margin));
    strictly_interior = strictly_interior &&
        image.lower() > request.candidate_box[row].lower() &&
        image.upper() < request.candidate_box[row].upper();
  }
  result.certified_unique = strictly_interior;
  if (!result.certified_unique) {
    result.failure_code = "krawczyk_image_not_strictly_interior";
  }
  return result;
}

}  // namespace architrino::eom
