#pragma once

#include "architrino/eom/CoupledEvolution.hpp"

namespace architrino::eom::detail {

// Private implementation seam. Public model-bound APIs perform admission.
[[nodiscard]] NativeAccelerationSnapshotCertificate
certify_canonical_acceleration_snapshot(
    const NativeCoupledEvolutionRequest& request,
    const std::vector<NativePublishedPath>& histories,
    const std::string& reception_time,
    const NativeAccelerationSnapshotCertificate* warm_snapshot,
    const std::vector<NativePublishedPath>* warm_histories,
    bool defer_root_precision_escalation);

}  // namespace architrino::eom::detail
