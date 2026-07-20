#pragma once

#include "architrino/eom/JointAccelerationSnapshot.hpp"
#include "architrino/eom/Krawczyk.hpp"

#include <array>
#include <map>
#include <string>
#include <vector>

namespace architrino::eom {

struct JointEndpointCorrectorRequest {
  std::vector<std::string> path_ids;
  std::map<std::string, std::array<double, 3>> endpoint_centers;
  std::map<std::string, std::vector<std::array<double, 3>>>
      endpoint_shared_coefficients;
  JointAccelerationSnapshotCertificate evaluated_snapshot;
  std::size_t retained_symbol_count = 0U;
  std::vector<double> corrector_variable_radii;
};

struct JointEndpointCorrectorCertificate {
  const char* schema = "eom_joint_endpoint_corrector/v1";
  bool certified = false;
  std::string failure_code;
  std::size_t dimension = 0U;
  std::size_t retained_symbol_count = 0U;
  IntervalDenseVector parametric_residual_at_center;
  IntervalDenseMatrix corrector_jacobian;
  DenseMatrix preconditioner;
  KrawczykCertificate krawczyk;
  std::map<std::string, std::array<double, 3>>
      endpoint_remainder_radii;
};

// Certifies the endpoint-acceleration remainder after the retained shared
// symbols have been propagated explicitly.  The retained symbols are treated
// as parameters in the residual; the final 3*N symbols are normalized basis
// directions for the physical endpoint-acceleration correction box.
[[nodiscard]] JointEndpointCorrectorCertificate
certify_joint_endpoint_corrector(
    const JointEndpointCorrectorRequest& request);

}  // namespace architrino::eom
