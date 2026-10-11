#pragma once

#include "architrino/eom/EquationPlan.hpp"

#include <string>
#include <vector>

namespace architrino::eom {

struct NativeCoupledEvolutionRequest;
struct NativePublishedPath;
struct NativeAccelerationSnapshotCertificate;

struct EquationProviderDescriptor {
  std::string id;
  std::string name;
  std::string scientific_definition;
  std::string definition_digest;
  std::string evaluation_profile;
  std::string acceptance_boundary;
};

struct EquationEvaluationContext {
  const NativeCoupledEvolutionRequest& request;
  const std::vector<NativePublishedPath>& histories;
  const std::string& reception_time;
  const NativeAccelerationSnapshotCertificate* warm_snapshot = nullptr;
  const std::vector<NativePublishedPath>* warm_histories = nullptr;
  bool defer_root_precision_escalation = false;
};

// Complete retained-history snapshots use the existing typed certificate/error
// carrier. Stage B's Surface profile adds distinct identity/diagnostics and a
// host-side validated publication proof. Further profiles must explicitly
// declare their own certified derivatives/events rather than inherit them.
class EquationProvider {
 public:
  virtual ~EquationProvider() = default;
  [[nodiscard]] virtual const EquationProviderDescriptor&
  descriptor() const noexcept = 0;
  [[nodiscard]] virtual const EquationPlan& plan() const = 0;
  virtual void admit(const NativeCoupledEvolutionRequest& request) const = 0;
  [[nodiscard]] virtual NativeAccelerationSnapshotCertificate evaluate(
      const EquationEvaluationContext& context) const = 0;
};

}  // namespace architrino::eom
