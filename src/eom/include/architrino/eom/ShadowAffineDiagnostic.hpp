#pragma once

#include "architrino/eom/CoupledEvolution.hpp"

#include <cstddef>
#include <memory>
#include <string>
#include <vector>

namespace architrino::eom {

struct ShadowAffineDiagnosticOptions {
  std::string output_path;
  std::size_t symbol_cap = 256U;
  bool include_root_enclosure_symbols = true;
  bool include_acceleration_enclosure_symbols = true;
};

// Binary64, round-to-nearest, diagnostics-only affine propagation.  This
// observer is deliberately outside every certified gate and publication path.
// Its output is a separate NDJSON sidecar and has no authority over evolution.
class ShadowAffineDiagnostic {
 public:
  explicit ShadowAffineDiagnostic(ShadowAffineDiagnosticOptions options);
  ~ShadowAffineDiagnostic();
  ShadowAffineDiagnostic(ShadowAffineDiagnostic&&) noexcept;
  ShadowAffineDiagnostic& operator=(ShadowAffineDiagnostic&&) noexcept;
  ShadowAffineDiagnostic(const ShadowAffineDiagnostic&) = delete;
  ShadowAffineDiagnostic& operator=(const ShadowAffineDiagnostic&) = delete;

  void consume_evolution(
      const NativeCoupledEvolutionRequest& request,
      const std::vector<NativePublishedPath>& input_histories,
      const NativeCoupledEvolutionCertificate& result);

  void begin_evolution(const std::string& run_id) noexcept;
  void capture_failed_candidate(
      const std::string& start_time,
      const std::string& end_time,
      const std::string& failure_code,
      std::size_t iteration,
      const std::vector<NativePublishedPath>& histories);

 private:
  struct Impl;
  std::unique_ptr<Impl> impl_;
};

}  // namespace architrino::eom
