#pragma once

#include "architrino/eom/CoupledEvolution.hpp"
#include "architrino/eom/JointSharpRow.hpp"

#include <array>
#include <map>
#include <string>
#include <vector>

namespace architrino::eom {

struct JointReceiverAccelerationState {
  std::string path_id;
  std::vector<std::array<double, 3>> shared_symbol_coefficients;
  std::vector<IntervalVector> shared_symbol_coefficient_enclosures;
  std::array<double, 3> center{};
  std::array<double, 3> independent_remainder_radii{};
  std::array<double, 3> projection_radii_upper{};
  bool accepted_total_dominates = false;
};

struct JointAccelerationSnapshotCertificate {
  const char* schema = "eom_joint_acceleration_snapshot/v1";
  bool certified = false;
  std::string failure_code;
  std::size_t shared_symbol_count = 0U;
  std::size_t consumed_sharp_rows = 0U;
  std::size_t accepted_acceleration_fallback_rows = 0U;
  double failure_max_projection_to_ordinary_ratio = 0.0;
  double failure_projection_upper = 0.0;
  double failure_ordinary_radius = 0.0;
  std::string failure_state;
  std::vector<JointReceiverAccelerationState> receivers;
};

[[nodiscard]] JointAccelerationSnapshotCertificate
certify_joint_acceleration_snapshot(
    const Interval& field_speed,
    const NativeAccelerationSnapshotCertificate& snapshot,
    const std::vector<NativePublishedPath>& ordinary_histories,
    const std::map<std::string, JointAffineRetainedHistory>& joint_histories);

}  // namespace architrino::eom
