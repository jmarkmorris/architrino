#pragma once

#include "architrino/eom/CoupledEvolution.hpp"

#include <cstddef>
#include <map>
#include <string>
#include <vector>

namespace architrino::eom {

struct NativeCheckpointPath {
  std::string path_id;
  std::string charge;
  RetainedHistory history;
};

struct NativeEvolutionCheckpoint {
  std::string schema;
  std::string run_id;
  std::string accepted_time;
  std::string controller_step_size;
  std::size_t controller_certificate_cost_cooldown_remaining = 0;
  std::size_t controller_consecutive_growth_headroom_steps = 0;
  std::string joint_history_mode;
  std::string model_fingerprint;
  std::string checkpoint_fingerprint;
  std::size_t accepted_step_count;
  std::size_t rejected_step_count;
  std::vector<NativeCheckpointPath> paths;
  std::map<std::string, JointAffineRetainedHistory> joint_histories;
};

[[nodiscard]] std::string native_evolution_model_fingerprint(
    const NativeCoupledEvolutionRequest& request);

[[nodiscard]] NativeEvolutionCheckpoint create_native_evolution_checkpoint(
    const NativeCoupledEvolutionRequest& request,
    const NativeCoupledEvolutionCertificate& certificate);

[[nodiscard]] std::vector<unsigned char> serialize_native_evolution_checkpoint(
    const NativeEvolutionCheckpoint& checkpoint);

[[nodiscard]] NativeEvolutionCheckpoint deserialize_native_evolution_checkpoint(
    const std::vector<unsigned char>& bytes);

void write_native_evolution_checkpoint_atomic(
    const std::string& path,
    const NativeEvolutionCheckpoint& checkpoint);

[[nodiscard]] NativeEvolutionCheckpoint read_native_evolution_checkpoint(
    const std::string& path);

[[nodiscard]] NativeCoupledEvolutionCertificate
resume_native_coupled_histories(
    const NativeCoupledEvolutionRequest& request_template,
    const NativeEvolutionCheckpoint& checkpoint,
    const std::string& requested_end_time);

}  // namespace architrino::eom
