#include "architrino/eom/Checkpoint.hpp"

#include <cerrno>
#include <cstdint>
#include <cstring>
#include <filesystem>
#include <fstream>
#include <iomanip>
#include <limits>
#include <sstream>
#include <stdexcept>
#include <string>
#include <system_error>
#include <utility>

#include <fcntl.h>
#include <unistd.h>

namespace architrino::eom {
namespace {

constexpr char kCheckpointMagic[] = "EOMCPV3\n";
constexpr std::size_t kMaximumTokenBytes = 16U * 1024U * 1024U;
constexpr std::uint64_t kMaximumPathCount = UINT64_C(10000000);
constexpr std::uint64_t kMaximumSegmentCount = UINT64_C(1000000000);

void hash_byte(std::uint64_t& state, unsigned char value) {
  state ^= value;
  state *= UINT64_C(1099511628211);
}

void hash_token(std::uint64_t& state, const std::string& token) {
  const std::string length = std::to_string(token.size());
  for (const char value : length) {
    hash_byte(state, static_cast<unsigned char>(value));
  }
  hash_byte(state, static_cast<unsigned char>(':'));
  for (const char value : token) {
    hash_byte(state, static_cast<unsigned char>(value));
  }
}

std::string format_hash(std::uint64_t state) {
  std::ostringstream stream;
  stream << "fnv1a64:" << std::hex << std::setw(16) << std::setfill('0')
         << state;
  return stream.str();
}

std::uint64_t hash_bytes(
    const std::vector<unsigned char>& bytes,
    std::size_t size) {
  std::uint64_t state = UINT64_C(14695981039346656037);
  for (std::size_t index = 0; index < size; ++index) {
    hash_byte(state, bytes[index]);
  }
  return state;
}

void append_u64(std::vector<unsigned char>& bytes, std::uint64_t value) {
  for (unsigned shift = 0; shift < 64U; shift += 8U) {
    bytes.push_back(static_cast<unsigned char>((value >> shift) & UINT64_C(0xff)));
  }
}

void append_string(
    std::vector<unsigned char>& bytes,
    const std::string& value) {
  append_u64(bytes, static_cast<std::uint64_t>(value.size()));
  bytes.insert(bytes.end(), value.begin(), value.end());
}

std::uint64_t take_u64(
    const std::vector<unsigned char>& bytes,
    std::size_t& cursor,
    std::size_t payload_end) {
  if (payload_end - cursor < 8U) {
    throw std::invalid_argument("checkpoint payload is truncated");
  }
  std::uint64_t value = 0;
  for (unsigned shift = 0; shift < 64U; shift += 8U) {
    value |= static_cast<std::uint64_t>(bytes[cursor++]) << shift;
  }
  return value;
}

std::string take_string(
    const std::vector<unsigned char>& bytes,
    std::size_t& cursor,
    std::size_t payload_end) {
  const std::uint64_t length = take_u64(bytes, cursor, payload_end);
  if (length > kMaximumTokenBytes ||
      length > static_cast<std::uint64_t>(payload_end - cursor)) {
    throw std::invalid_argument("checkpoint token length is invalid");
  }
  const auto begin = bytes.begin() + static_cast<std::ptrdiff_t>(cursor);
  cursor += static_cast<std::size_t>(length);
  return std::string(begin, begin + static_cast<std::ptrdiff_t>(length));
}

std::string checkpoint_content_fingerprint(
    const NativeEvolutionCheckpoint& checkpoint) {
  std::uint64_t state = UINT64_C(14695981039346656037);
  hash_token(state, checkpoint.schema);
  hash_token(state, checkpoint.run_id);
  hash_token(state, checkpoint.accepted_time);
  hash_token(state, checkpoint.controller_step_size);
  hash_token(
      state,
      std::to_string(
          checkpoint.controller_certificate_cost_cooldown_remaining));
  hash_token(state, checkpoint.model_fingerprint);
  hash_token(state, std::to_string(checkpoint.accepted_step_count));
  hash_token(state, std::to_string(checkpoint.rejected_step_count));
  hash_token(state, std::to_string(checkpoint.paths.size()));
  for (const auto& path : checkpoint.paths) {
    hash_token(state, path.path_id);
    hash_token(state, path.charge);
    hash_token(state, path.history.provenance_fingerprint());
  }
  return format_hash(state);
}

void append_history(
    std::vector<unsigned char>& bytes,
    const NativeCheckpointPath& path) {
  append_string(bytes, path.path_id);
  append_string(bytes, path.charge);
  append_string(bytes, path.history.history_id());
  const auto& circular =
      path.history.uniform_circular_endpoint_certificate();
  append_u64(bytes, circular.has_value() ? 1U : 0U);
  if (circular.has_value()) {
    append_string(bytes, circular->valid_start_time);
    append_string(bytes, circular->valid_reception_time);
    append_string(bytes, circular->maximum_segment_step);
    append_string(bytes, circular->cylindrical_radius);
    append_string(bytes, circular->height);
    append_string(bytes, circular->angular_speed);
    append_string(bytes, circular->tangential_speed);
    append_string(bytes, circular->phase);
    append_string(bytes, circular->tilt_x);
    append_string(bytes, circular->tilt_y);
  }
  append_u64(bytes, static_cast<std::uint64_t>(path.history.segments().size()));
  for (const auto& segment : path.history.segments()) {
    append_string(bytes, segment.t_start_token());
    append_string(bytes, segment.t_end_token());
    for (const auto& axis : segment.coefficient_tokens()) {
      for (const auto& coefficient : axis) {
        append_string(bytes, coefficient);
      }
    }
    for (const auto& token : segment.position_error_tokens()) {
      append_string(bytes, token);
    }
    for (const auto& token : segment.velocity_error_tokens()) {
      append_string(bytes, token);
    }
  }
}

NativeCheckpointPath take_history(
    const std::vector<unsigned char>& bytes,
    std::size_t& cursor,
    std::size_t payload_end) {
  std::string path_id = take_string(bytes, cursor, payload_end);
  std::string charge = take_string(bytes, cursor, payload_end);
  std::string history_id = take_string(bytes, cursor, payload_end);
  const std::uint64_t has_circular = take_u64(bytes, cursor, payload_end);
  if (has_circular > 1U) {
    throw std::invalid_argument("checkpoint circular certificate flag is invalid");
  }
  std::optional<UniformCircularHistoryRequest> circular_request;
  if (has_circular == 1U) {
    circular_request = UniformCircularHistoryRequest{
        .t_start = take_string(bytes, cursor, payload_end),
        .t_end = take_string(bytes, cursor, payload_end),
        .maximum_segment_step = take_string(bytes, cursor, payload_end),
        .cylindrical_radius = take_string(bytes, cursor, payload_end),
        .height = take_string(bytes, cursor, payload_end),
        .angular_speed = take_string(bytes, cursor, payload_end),
        .tangential_speed = take_string(bytes, cursor, payload_end),
        .phase = take_string(bytes, cursor, payload_end),
        .tilt_x = take_string(bytes, cursor, payload_end),
        .tilt_y = take_string(bytes, cursor, payload_end),
    };
  }
  const std::uint64_t segment_count = take_u64(bytes, cursor, payload_end);
  if (segment_count == 0U || segment_count > kMaximumSegmentCount ||
      segment_count > static_cast<std::uint64_t>(
          std::numeric_limits<std::size_t>::max())) {
    throw std::invalid_argument("checkpoint segment count is invalid");
  }
  std::vector<CubicHistorySegment> segments;
  segments.reserve(static_cast<std::size_t>(segment_count));
  for (std::uint64_t index = 0; index < segment_count; ++index) {
    std::string t_start = take_string(bytes, cursor, payload_end);
    std::string t_end = take_string(bytes, cursor, payload_end);
    CubicCoefficientTokens coefficients;
    for (auto& axis : coefficients) {
      for (auto& coefficient : axis) {
        coefficient = take_string(bytes, cursor, payload_end);
      }
    }
    HistoryErrorTokens position_errors{};
    HistoryErrorTokens velocity_errors{};
    for (auto& token : position_errors) {
      token = take_string(bytes, cursor, payload_end);
    }
    for (auto& token : velocity_errors) {
      token = take_string(bytes, cursor, payload_end);
    }
    segments.emplace_back(
        std::move(t_start), std::move(t_end), std::move(coefficients),
        std::move(position_errors), std::move(velocity_errors));
  }
  RetainedHistory history = circular_request.has_value()
      ? RetainedHistory::restore_uniform_circular(
            std::move(history_id), *circular_request, std::move(segments))
      : RetainedHistory(std::move(history_id), std::move(segments));
  return {
      .path_id = std::move(path_id),
      .charge = std::move(charge),
      .history = std::move(history),
  };
}

void require_checkpoint_consistency(
    const NativeEvolutionCheckpoint& checkpoint) {
  if (checkpoint.schema != "eom_native_evolution_checkpoint/v4" ||
      checkpoint.run_id.empty() || checkpoint.paths.empty()) {
    throw std::invalid_argument("checkpoint identity or path domain is invalid");
  }
  if (checkpoint.checkpoint_fingerprint !=
      checkpoint_content_fingerprint(checkpoint)) {
    throw std::invalid_argument("checkpoint content fingerprint mismatch");
  }
  for (const auto& path : checkpoint.paths) {
    if (path.path_id.empty() || path.charge.empty() ||
        path.history.segments().back().t_end_token() !=
            checkpoint.accepted_time) {
      throw std::invalid_argument(
          "checkpoint histories do not share the accepted boundary");
    }
  }
}

std::runtime_error system_failure(const std::string& operation) {
  return std::runtime_error(
      operation + " failed: " + std::string(std::strerror(errno)));
}

}  // namespace

namespace {

std::string model_fingerprint(
    const NativeCoupledEvolutionRequest& request,
    bool include_pinned_fold_controls) {
  std::uint64_t state = UINT64_C(14695981039346656037);
  std::vector<std::string> controls = {
      request.field_speed,
      request.coupling,
      request.root_tolerance,
      request.source_normal_floor,
      request.acceleration_tolerance,
      request.far_field_enclosure_fraction,
      request.chart_policy,
      request.causal_width,
      request.core_scale,
      request.quadrature_tolerance,
      request.event_impulse_tolerance,
      request.regulator_refinement_ratio,
      request.regulator_convergence_tolerance,
      request.position_tolerance,
      request.velocity_tolerance,
      request.correction_tolerance,
      request.minimum_step,
      request.maximum_step,
      std::to_string(request.root_max_depth),
      std::to_string(request.root_max_cells),
      std::to_string(request.quadrature_max_depth),
      std::to_string(request.quadrature_max_cells),
      std::to_string(request.event_max_depth),
      std::to_string(request.event_max_cells),
      std::to_string(request.regulator_refinement_levels),
      std::to_string(request.initial_mpfr_bits),
      std::to_string(request.maximum_mpfr_bits),
      request.force_event_precision_escalation ? "1" : "0",
      std::to_string(request.max_correction_iterations),
      request.use_adaptive_step_growth ? "1" : "0",
      request.use_continuous_adaptive_step ? "1" : "0",
      request.adaptive_step_safety_factor,
      request.adaptive_step_minimum_scale,
      request.adaptive_step_maximum_scale,
      request.use_synchronized_multirate_publication ? "1" : "0",
      request.multirate_synchronization_fraction,
      request.use_certificate_cost_feedback ? "1" : "0",
      std::to_string(
          request.certificate_cost_maximum_probe_adjustments),
      request.certificate_cost_probe_scale,
      std::to_string(
          request.certificate_cost_unavoidable_cooldown_steps),
  };
  if (include_pinned_fold_controls) {
    controls.push_back(request.use_analytic_pinned_fold ? "1" : "0");
    controls.push_back(request.use_correlated_self_chord ? "1" : "0");
    controls.push_back(request.use_stable_circular_residual ? "1" : "0");
    controls.push_back(
        request.use_pinned_fold_aware_temporal_step ? "1" : "0");
  }
  controls.push_back(request.use_certified_history_window ? "1" : "0");
  controls.push_back(request.use_synchronized_multirate_publication
                         ? kNativeMultirateIntegrationMethod
                         : (request.use_pinned_fold_aware_temporal_step
                                ? kNativeIntegrationMethod
                                : kLegacyNativeIntegrationMethod));
  controls.push_back(kDeterministicReductionPolicy);
  for (const auto& control : controls) {
    hash_token(state, control);
  }
  hash_token(state, std::to_string(request.paths.size()));
  for (const auto& path : request.paths) {
    hash_token(state, path.path_id);
    hash_token(state, path.charge);
  }
  return format_hash(state);
}

bool checkpoint_model_matches(
    const NativeCoupledEvolutionRequest& request,
    const NativeEvolutionCheckpoint& checkpoint) {
  if (model_fingerprint(request, true) == checkpoint.model_fingerprint) {
    return true;
  }
  return !request.use_analytic_pinned_fold &&
      !request.use_pinned_fold_aware_temporal_step &&
      model_fingerprint(request, false) == checkpoint.model_fingerprint;
}

}  // namespace

std::string native_evolution_model_fingerprint(
    const NativeCoupledEvolutionRequest& request) {
  return model_fingerprint(request, true);
}

NativeEvolutionCheckpoint create_native_evolution_checkpoint(
    const NativeCoupledEvolutionRequest& request,
    const NativeCoupledEvolutionCertificate& certificate) {
  if (certificate.run_id != request.run_id ||
      certificate.histories.size() != request.paths.size() ||
      !certificate.all_steps_atomic) {
    throw std::invalid_argument(
        "checkpoint source is not an atomic result for the request");
  }
  NativeEvolutionCheckpoint checkpoint{
      .schema = "eom_native_evolution_checkpoint/v4",
      .run_id = certificate.run_id,
      .accepted_time = certificate.accepted_end_time,
      .controller_step_size = certificate.controller_step_size,
      .controller_certificate_cost_cooldown_remaining =
          certificate.controller_certificate_cost_cooldown_remaining,
      .model_fingerprint = native_evolution_model_fingerprint(request),
      .checkpoint_fingerprint = "",
      .accepted_step_count = certificate.accepted_step_count,
      .rejected_step_count = certificate.rejected_step_count,
      .paths = {},
  };
  checkpoint.paths.reserve(request.paths.size());
  for (std::size_t index = 0; index < request.paths.size(); ++index) {
    if (certificate.histories[index].path_id != request.paths[index].path_id) {
      throw std::invalid_argument(
          "checkpoint result path ordering differs from the request");
    }
    checkpoint.paths.push_back({
        .path_id = request.paths[index].path_id,
        .charge = request.paths[index].charge,
        .history = certificate.histories[index].history,
    });
  }
  checkpoint.checkpoint_fingerprint =
      checkpoint_content_fingerprint(checkpoint);
  require_checkpoint_consistency(checkpoint);
  return checkpoint;
}

std::vector<unsigned char> serialize_native_evolution_checkpoint(
    const NativeEvolutionCheckpoint& checkpoint) {
  require_checkpoint_consistency(checkpoint);
  std::vector<unsigned char> bytes;
  bytes.insert(bytes.end(), std::begin(kCheckpointMagic),
               std::end(kCheckpointMagic) - 1);
  append_string(bytes, checkpoint.schema);
  append_string(bytes, checkpoint.run_id);
  append_string(bytes, checkpoint.accepted_time);
  append_string(bytes, checkpoint.controller_step_size);
  append_u64(
      bytes,
      checkpoint.controller_certificate_cost_cooldown_remaining);
  append_string(bytes, checkpoint.model_fingerprint);
  append_string(bytes, checkpoint.checkpoint_fingerprint);
  append_u64(bytes, checkpoint.accepted_step_count);
  append_u64(bytes, checkpoint.rejected_step_count);
  append_u64(bytes, static_cast<std::uint64_t>(checkpoint.paths.size()));
  for (const auto& path : checkpoint.paths) {
    append_history(bytes, path);
  }
  append_u64(bytes, hash_bytes(bytes, bytes.size()));
  return bytes;
}

NativeEvolutionCheckpoint deserialize_native_evolution_checkpoint(
    const std::vector<unsigned char>& bytes) {
  constexpr std::size_t magic_size = sizeof(kCheckpointMagic) - 1U;
  if (bytes.size() < magic_size + 8U ||
      !std::equal(
          bytes.begin(), bytes.begin() + static_cast<std::ptrdiff_t>(magic_size),
          std::begin(kCheckpointMagic))) {
    throw std::invalid_argument("checkpoint magic is invalid");
  }
  const std::size_t payload_end = bytes.size() - 8U;
  std::size_t checksum_cursor = payload_end;
  const std::uint64_t stored_checksum =
      take_u64(bytes, checksum_cursor, bytes.size());
  if (stored_checksum != hash_bytes(bytes, payload_end)) {
    throw std::invalid_argument("checkpoint payload checksum mismatch");
  }
  std::size_t cursor = magic_size;
  NativeEvolutionCheckpoint checkpoint{
      .schema = take_string(bytes, cursor, payload_end),
      .run_id = take_string(bytes, cursor, payload_end),
      .accepted_time = take_string(bytes, cursor, payload_end),
      .controller_step_size = take_string(bytes, cursor, payload_end),
      .controller_certificate_cost_cooldown_remaining =
          static_cast<std::size_t>(take_u64(bytes, cursor, payload_end)),
      .model_fingerprint = take_string(bytes, cursor, payload_end),
      .checkpoint_fingerprint = take_string(bytes, cursor, payload_end),
      .accepted_step_count = static_cast<std::size_t>(
          take_u64(bytes, cursor, payload_end)),
      .rejected_step_count = static_cast<std::size_t>(
          take_u64(bytes, cursor, payload_end)),
      .paths = {},
  };
  const std::uint64_t path_count = take_u64(bytes, cursor, payload_end);
  if (path_count == 0U || path_count > kMaximumPathCount ||
      path_count > static_cast<std::uint64_t>(
          std::numeric_limits<std::size_t>::max())) {
    throw std::invalid_argument("checkpoint path count is invalid");
  }
  checkpoint.paths.reserve(static_cast<std::size_t>(path_count));
  for (std::uint64_t index = 0; index < path_count; ++index) {
    checkpoint.paths.push_back(take_history(bytes, cursor, payload_end));
  }
  if (cursor != payload_end) {
    throw std::invalid_argument("checkpoint payload has trailing fields");
  }
  require_checkpoint_consistency(checkpoint);
  return checkpoint;
}

void write_native_evolution_checkpoint_atomic(
    const std::string& path,
    const NativeEvolutionCheckpoint& checkpoint) {
  if (path.empty()) {
    throw std::invalid_argument("checkpoint path cannot be empty");
  }
  const auto bytes = serialize_native_evolution_checkpoint(checkpoint);
  const std::string temporary =
      path + ".tmp." + std::to_string(static_cast<long long>(::getpid()));
  const int descriptor =
      ::open(temporary.c_str(), O_WRONLY | O_CREAT | O_EXCL, 0600);
  if (descriptor < 0) {
    throw system_failure("checkpoint temporary open");
  }
  bool closed = false;
  try {
    std::size_t offset = 0;
    while (offset < bytes.size()) {
      const ssize_t count = ::write(
          descriptor, bytes.data() + offset, bytes.size() - offset);
      if (count < 0) {
        if (errno == EINTR) {
          continue;
        }
        throw system_failure("checkpoint write");
      }
      offset += static_cast<std::size_t>(count);
    }
    if (::fsync(descriptor) != 0) {
      throw system_failure("checkpoint fsync");
    }
    if (::close(descriptor) != 0) {
      throw system_failure("checkpoint close");
    }
    closed = true;
    if (::rename(temporary.c_str(), path.c_str()) != 0) {
      throw system_failure("checkpoint publish");
    }
    const std::filesystem::path parent =
        std::filesystem::path(path).parent_path();
    const std::string directory = parent.empty() ? "." : parent.string();
    const int directory_descriptor = ::open(directory.c_str(), O_RDONLY);
    if (directory_descriptor < 0) {
      throw system_failure("checkpoint directory open");
    }
    if (::fsync(directory_descriptor) != 0) {
      const int saved_errno = errno;
      ::close(directory_descriptor);
      errno = saved_errno;
      throw system_failure("checkpoint directory fsync");
    }
    if (::close(directory_descriptor) != 0) {
      throw system_failure("checkpoint directory close");
    }
  } catch (...) {
    if (!closed) {
      ::close(descriptor);
    }
    ::unlink(temporary.c_str());
    throw;
  }
}

NativeEvolutionCheckpoint read_native_evolution_checkpoint(
    const std::string& path) {
  std::ifstream stream(path, std::ios::binary | std::ios::ate);
  if (!stream) {
    throw std::runtime_error("checkpoint read open failed");
  }
  const std::streamsize size = stream.tellg();
  if (size < 0) {
    throw std::runtime_error("checkpoint size query failed");
  }
  stream.seekg(0, std::ios::beg);
  std::vector<unsigned char> bytes(static_cast<std::size_t>(size));
  if (!bytes.empty() &&
      !stream.read(
          reinterpret_cast<char*>(bytes.data()),
          static_cast<std::streamsize>(bytes.size()))) {
    throw std::runtime_error("checkpoint read failed");
  }
  return deserialize_native_evolution_checkpoint(bytes);
}

NativeCoupledEvolutionCertificate resume_native_coupled_histories(
    const NativeCoupledEvolutionRequest& request_template,
    const NativeEvolutionCheckpoint& checkpoint,
    const std::string& requested_end_time) {
  require_checkpoint_consistency(checkpoint);
  if (!checkpoint_model_matches(request_template, checkpoint)) {
    throw std::invalid_argument(
        "checkpoint model fingerprint mismatch expected=" +
        checkpoint.model_fingerprint + " current=" +
        model_fingerprint(request_template, true) + " legacy=" +
        model_fingerprint(request_template, false));
  }
  NativeCoupledEvolutionRequest resumed = request_template;
  resumed.run_id = checkpoint.run_id;
  resumed.start_time = checkpoint.accepted_time;
  resumed.end_time = requested_end_time;
  resumed.initial_step = checkpoint.controller_step_size;
  resumed.certificate_cost_initial_cooldown_steps =
      checkpoint.controller_certificate_cost_cooldown_remaining;
  resumed.paths.clear();
  resumed.paths.reserve(checkpoint.paths.size());
  for (const auto& path : checkpoint.paths) {
    resumed.paths.push_back({path.path_id, path.charge, path.history});
  }
  return evolve_native_coupled_histories(resumed);
}

}  // namespace architrino::eom
