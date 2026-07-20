#pragma once

#include "architrino/eom/Interval.hpp"

#include <cstddef>
#include <optional>
#include <string>
#include <vector>

namespace architrino::eom {

using IntervalDenseVector = std::vector<Interval>;
using IntervalDenseMatrix = std::vector<std::vector<Interval>>;
using DenseMatrix = std::vector<std::vector<double>>;

struct KrawczykRequest {
  std::vector<double> center;
  IntervalDenseVector residual_at_center;
  IntervalDenseMatrix jacobian;
  DenseMatrix preconditioner;
  IntervalDenseVector candidate_box;
};

struct KrawczykCertificate {
  const char* schema = "eom_krawczyk_inclusion/v1";
  bool certified_unique = false;
  std::string failure_code;
  std::size_t dimension = 0U;
  bool preconditioner_nonsingular_certified = false;
  std::optional<Interval> preconditioner_determinant;
  IntervalDenseVector image;
  std::vector<double> lower_containment_margins;
  std::vector<double> upper_containment_margins;
  double minimum_containment_margin = 0.0;
};

// For F(z)=0, evaluates
//
// K(Z) = z_hat - Y F(z_hat) + (I - Y[J])(Z - z_hat)
//
// with outward-rounded interval arithmetic. Strict K(Z) subset int(Z)
// certifies one and only one zero in Z under the supplied Jacobian enclosure.
[[nodiscard]] KrawczykCertificate certify_krawczyk_inclusion(
    const KrawczykRequest& request);

}  // namespace architrino::eom
