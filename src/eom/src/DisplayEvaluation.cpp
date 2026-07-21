#include "architrino/eom/DisplayEvaluation.hpp"

#include <algorithm>
#include <array>
#include <atomic>
#include <chrono>
#include <cmath>
#include <cstddef>
#include <condition_variable>
#include <cstdlib>
#include <exception>
#include <functional>
#include <limits>
#include <mutex>
#include <numbers>
#include <optional>
#include <stdexcept>
#include <string>
#include <thread>
#include <utility>
#include <vector>

namespace architrino::eom {
namespace {

using Clock = std::chrono::steady_clock;
using Vector = std::array<double, 3>;

constexpr std::array<double, 8> kGaussNodes{
    0.09501250983763744, 0.28160355077925891,
    0.45801677765722739, 0.61787624440264375,
    0.75540440835500303, 0.86563120238783174,
    0.94457502307323258, 0.98940093499164993};
constexpr std::array<double, 8> kGaussWeights{
    0.18945061045506850, 0.18260341504492359,
    0.16915651939500254, 0.14959598881657673,
    0.12462897125553387, 0.09515851168249278,
    0.06225352393864789, 0.02715245941175409};

double seconds_since(const Clock::time_point& start) {
  return std::chrono::duration<double>(Clock::now() - start).count();
}

bool finite_vector(const Vector& value) {
  return std::isfinite(value[0]) && std::isfinite(value[1]) &&
      std::isfinite(value[2]);
}

Vector add(const Vector& left, const Vector& right) {
  return {left[0] + right[0], left[1] + right[1], left[2] + right[2]};
}

Vector subtract(const Vector& left, const Vector& right) {
  return {left[0] - right[0], left[1] - right[1], left[2] - right[2]};
}

Vector scale(double factor, const Vector& value) {
  return {factor * value[0], factor * value[1], factor * value[2]};
}

double dot(const Vector& left, const Vector& right) {
  return left[0] * right[0] + left[1] * right[1] +
      left[2] * right[2];
}

double norm(const Vector& value) {
  return std::hypot(value[0], value[1], value[2]);
}

Vector evaluate_history(
    const RetainedHistory& history,
    double time,
    bool velocity) {
  Vector result{};
  try {
    result = velocity
        ? history.nominal_velocity(time)
        : history.nominal_position(time);
  } catch (const std::out_of_range&) {
    throw std::runtime_error("display_insufficient_history_depth");
  }
  if (!finite_vector(result)) {
    throw std::runtime_error("display_nonfinite_state");
  }
  return result;
}

struct SourceSummary {
  double speed_upper = 0.0;
  bool sub_field_speed = false;
};

SourceSummary summarize_source(
    const RetainedHistory& history,
    double field_speed) {
  SourceSummary summary{
      .speed_upper = history.nominal_speed_upper_bound(),
      .sub_field_speed = false,
  };
  summary.sub_field_speed = summary.speed_upper < field_speed;
  return summary;
}

struct RootSample {
  double residual = 0.0;
  double source_normal = 0.0;
  Vector source_position{};
  Vector source_velocity{};
  Vector displacement{};
  double separation = 0.0;
};

RootSample sample_root(
    const DisplayEvaluationRequest& request,
    const RetainedHistory& source_history,
    const Vector& receiver_position,
    double emission) {
  RootSample sample;
  sample.source_position = evaluate_history(source_history, emission, false);
  sample.source_velocity = evaluate_history(source_history, emission, true);
  sample.displacement = subtract(receiver_position, sample.source_position);
  sample.separation = norm(sample.displacement);
  if (!std::isfinite(sample.separation)) {
    throw std::runtime_error("display_nonfinite_state");
  }
  Vector direction{};
  if (sample.separation > 0.0) {
    direction = scale(1.0 / sample.separation, sample.displacement);
  }
  sample.residual = sample.separation -
      request.field_speed * (request.reception_time - emission);
  sample.source_normal = request.field_speed -
      dot(direction, sample.source_velocity);
  if (!std::isfinite(sample.residual) ||
      !std::isfinite(sample.source_normal)) {
    throw std::runtime_error("display_nonfinite_state");
  }
  return sample;
}

std::optional<double> solve_bracket(
    const DisplayEvaluationRequest& request,
    const RetainedHistory& source_history,
    const Vector& receiver_position,
    double lower,
    double upper,
    double lower_residual,
    double upper_residual) {
  if (lower_residual == 0.0) return lower;
  if (upper_residual == 0.0) return upper;
  if ((lower_residual < 0.0) == (upper_residual < 0.0)) {
    return std::nullopt;
  }
  if (lower_residual > 0.0) {
    std::swap(lower, upper);
    std::swap(lower_residual, upper_residual);
  }
  const double time_scale = std::max({
      1.0, std::abs(request.reception_time), std::abs(lower),
      std::abs(upper)});
  const double tolerance = request.root_relative_tolerance * time_scale;
  const double residual_tolerance =
      request.root_relative_tolerance *
      std::max(1.0, request.field_speed * time_scale);
  double point = 0.5 * (lower + upper);
  for (std::size_t iteration = 0U; iteration < 96U; ++iteration) {
    const RootSample sample = sample_root(
        request, source_history, receiver_position, point);
    if (std::abs(sample.residual) <= residual_tolerance ||
        upper - lower <= tolerance) {
      return point;
    }
    if (sample.residual < 0.0) {
      lower = point;
      lower_residual = sample.residual;
    } else {
      upper = point;
      upper_residual = sample.residual;
    }
    const double newton = sample.source_normal == 0.0
        ? std::numeric_limits<double>::quiet_NaN()
        : point - sample.residual / sample.source_normal;
    point = std::isfinite(newton) && newton > lower && newton < upper
        ? newton
        : 0.5 * (lower + upper);
  }
  return std::nullopt;
}

std::optional<double> solve_stationary_bracket(
    const DisplayEvaluationRequest& request,
    const RetainedHistory& source_history,
    const Vector& receiver_position,
    double lower,
    double upper,
    double lower_normal,
    double upper_normal) {
  if (lower_normal == 0.0) return lower;
  if (upper_normal == 0.0) return upper;
  if ((lower_normal < 0.0) == (upper_normal < 0.0)) {
    return std::nullopt;
  }
  const double time_scale = std::max({
      1.0, std::abs(request.reception_time), std::abs(lower),
      std::abs(upper)});
  const double tolerance = request.root_relative_tolerance * time_scale;
  for (std::size_t iteration = 0U; iteration < 96U; ++iteration) {
    const double midpoint = 0.5 * (lower + upper);
    const double midpoint_normal = sample_root(
        request, source_history, receiver_position, midpoint).source_normal;
    if (upper - lower <= tolerance) return midpoint;
    if ((lower_normal < 0.0) == (midpoint_normal < 0.0)) {
      lower = midpoint;
      lower_normal = midpoint_normal;
    } else {
      upper = midpoint;
      upper_normal = midpoint_normal;
    }
  }
  return std::nullopt;
}

struct PairRoots {
  std::vector<double> roots;
  std::string failure_code;
};

double acceleration_upper_bound(
    const CubicHistorySegment& segment,
    double lower,
    double upper) {
  const double lower_local = lower - segment.t_start();
  const double upper_local = upper - segment.t_start();
  Vector component_bounds{};
  for (std::size_t axis = 0U; axis < 3U; ++axis) {
    const auto& coefficient = segment.coefficient_values()[axis];
    const double lower_acceleration =
        2.0 * coefficient[2] + 6.0 * coefficient[3] * lower_local;
    const double upper_acceleration =
        2.0 * coefficient[2] + 6.0 * coefficient[3] * upper_local;
    component_bounds[axis] = std::max(
        std::abs(lower_acceleration), std::abs(upper_acceleration));
  }
  return norm(component_bounds);
}

double residual_variation_upper_bound(
    const RootSample& midpoint_sample,
    const CubicHistorySegment& segment,
    double lower,
    double upper,
    double global_lipschitz) {
  const double half_width = 0.5 * (upper - lower);
  const double acceleration_bound =
      acceleration_upper_bound(segment, lower, upper);
  const double midpoint_speed = norm(midpoint_sample.source_velocity);
  const double speed_bound =
      midpoint_speed + acceleration_bound * half_width;
  const double separation_lower =
      midpoint_sample.separation - speed_bound * half_width;
  if (!(separation_lower > 0.0) || !std::isfinite(separation_lower)) {
    return global_lipschitz * half_width;
  }
  const double source_normal_derivative_bound =
      acceleration_bound + speed_bound * speed_bound / separation_lower;
  const double local_bound =
      std::abs(midpoint_sample.source_normal) * half_width +
      0.5 * source_normal_derivative_bound * half_width * half_width;
  const double rounded_bound = std::nextafter(
      local_bound * (1.0 + 64.0 * std::numeric_limits<double>::epsilon()),
      std::numeric_limits<double>::infinity());
  return std::min(global_lipschitz * half_width, rounded_bound);
}

PairRoots find_roots(
    const DisplayEvaluationRequest& request,
    const DisplayEvaluationPath& receiver,
    const DisplayEvaluationPath& source,
    const RetainedHistory& source_history,
    const SourceSummary& source_summary,
    const Vector& receiver_position) {
  PairRoots result;
  const double lower = source.history->t_start();
  const double upper = std::nextafter(
      request.reception_time, -std::numeric_limits<double>::infinity());
  if (!(lower < upper) || upper > source.history->t_end()) {
    result.failure_code = "display_insufficient_history_depth";
    return result;
  }
  if (receiver.path_id == source.path_id &&
      source_summary.sub_field_speed) {
    return result;
  }
  const double lower_residual = sample_root(
      request, source_history, receiver_position, lower).residual;
  const double upper_residual = sample_root(
      request, source_history, receiver_position, upper).residual;
  if (source_summary.sub_field_speed) {
    if (lower_residual > 0.0) {
      // This is missing numerical input, not a certification obligation. Do
      // not silently discard the delayed interaction even at display grade.
      result.failure_code = "display_insufficient_history_depth";
      return result;
    }
    const auto root = solve_bracket(
        request, source_history, receiver_position, lower, upper,
        lower_residual, upper_residual);
    if (!root.has_value()) {
      result.failure_code = "display_root_solve_not_converged";
      return result;
    }
    result.roots.push_back(*root);
    return result;
  }

  for (const auto& segment : source_history.segments()) {
    const double segment_lower = std::max(lower, segment.t_start());
    const double segment_upper = std::min(upper, segment.t_end());
    if (!(segment_lower < segment_upper)) continue;
    struct Cell {
      double lower;
      double upper;
      double lower_residual;
      double upper_residual;
      std::size_t depth;
    };
    std::vector<Cell> pending{{
        segment_lower, segment_upper,
        sample_root(request, source_history, receiver_position, segment_lower)
            .residual,
        sample_root(request, source_history, receiver_position, segment_upper)
            .residual,
        0U}};
    constexpr std::size_t kMaximumCellsPerSegment = 4096U;
    constexpr std::size_t kMaximumDepth = 48U;
    std::size_t visited_cells = 0U;
    const double time_scale = std::max({
        1.0, std::abs(request.reception_time), std::abs(segment_lower),
        std::abs(segment_upper)});
    const double time_tolerance =
        request.root_relative_tolerance * time_scale;
    const double residual_tolerance = request.root_relative_tolerance *
        std::max(1.0, request.field_speed * time_scale);
    const double residual_lipschitz =
        request.field_speed + source_summary.speed_upper;
    while (!pending.empty()) {
      const Cell cell = pending.back();
      pending.pop_back();
      if (++visited_cells > kMaximumCellsPerSegment) {
        result.failure_code = "display_root_isolation_unresolved";
        return result;
      }
      const bool sign_change =
          (cell.lower_residual <= 0.0 && cell.upper_residual >= 0.0) ||
          (cell.lower_residual >= 0.0 && cell.upper_residual <= 0.0);
      if (sign_change) {
        const auto root = solve_bracket(
            request, source_history, receiver_position,
            cell.lower, cell.upper,
            cell.lower_residual, cell.upper_residual);
        if (!root.has_value()) {
          result.failure_code = "display_root_solve_not_converged";
          return result;
        }
        if (receiver.path_id == source.path_id &&
            upper - *root <= 8.0 * time_tolerance) {
          // The master-equation pair domain excludes the coincident
          // zero-delay self endpoint. Keep delayed self roots, including
          // every root more than the declared display root resolution away.
          continue;
        }
        const double dedup = request.root_relative_tolerance *
            std::max(1.0, std::abs(*root));
        const auto insertion = std::lower_bound(
            result.roots.begin(), result.roots.end(), *root);
        const bool duplicate =
            (insertion != result.roots.end() &&
             std::abs(*insertion - *root) <= 8.0 * dedup) ||
            (insertion != result.roots.begin() &&
             std::abs(*std::prev(insertion) - *root) <= 8.0 * dedup);
        if (!duplicate) result.roots.insert(insertion, *root);
        continue;
      }
      const RootSample lower_sample = sample_root(
          request, source_history, receiver_position, cell.lower);
      const RootSample upper_sample = sample_root(
          request, source_history, receiver_position, cell.upper);
      const bool stationary_sign_change =
          (lower_sample.source_normal <= 0.0 &&
           upper_sample.source_normal >= 0.0) ||
          (lower_sample.source_normal >= 0.0 &&
           upper_sample.source_normal <= 0.0);
      if (stationary_sign_change) {
        const auto stationary = solve_stationary_bracket(
            request, source_history, receiver_position,
            cell.lower, cell.upper,
            lower_sample.source_normal, upper_sample.source_normal);
        if (stationary.has_value()) {
          const RootSample stationary_sample = sample_root(
              request, source_history, receiver_position, *stationary);
          if (std::abs(stationary_sample.residual) <= residual_tolerance) {
            const double dedup_guard = 8.0 * time_tolerance;
            const auto insertion = std::lower_bound(
                result.roots.begin(), result.roots.end(), *stationary);
            const bool duplicate =
                (insertion != result.roots.end() &&
                 std::abs(*insertion - *stationary) <= dedup_guard) ||
                (insertion != result.roots.begin() &&
                 std::abs(*std::prev(insertion) - *stationary) <= dedup_guard);
            if (!duplicate) result.roots.insert(insertion, *stationary);
            // A multiple root creates a residual-tolerance plateau much
            // wider than the time tolerance. Once its stationary contact is
            // located, grow a symmetric exclusion neighborhood until both
            // sides leave that plateau. Any additional contact inside it is
            // indistinguishable at the declared display root resolution.
            double left_guard = dedup_guard;
            double right_guard = dedup_guard;
            for (std::size_t expansion = 0U; expansion < 64U; ++expansion) {
              bool expanded = false;
              const double left_probe = *stationary - left_guard;
              if (left_probe > cell.lower && std::abs(sample_root(
                      request, source_history, receiver_position, left_probe)
                      .residual) <= residual_tolerance) {
                left_guard *= 2.0;
                expanded = true;
              }
              const double right_probe = *stationary + right_guard;
              if (right_probe < cell.upper && std::abs(sample_root(
                      request, source_history, receiver_position, right_probe)
                      .residual) <= residual_tolerance) {
                right_guard *= 2.0;
                expanded = true;
              }
              if (!expanded) break;
            }
            const double left_upper = *stationary - left_guard;
            const double right_lower = *stationary + right_guard;
            if (right_lower < cell.upper) {
              pending.push_back({
                  right_lower, cell.upper,
                  sample_root(
                      request, source_history, receiver_position, right_lower)
                      .residual,
                  cell.upper_residual, cell.depth + 1U});
            }
            if (cell.lower < left_upper) {
              pending.push_back({
                  cell.lower, left_upper, cell.lower_residual,
                  sample_root(
                      request, source_history, receiver_position, left_upper)
                      .residual,
                  cell.depth + 1U});
            }
            continue;
          }
        }
      }
      const double midpoint = 0.5 * (cell.lower + cell.upper);
      const RootSample midpoint_sample = sample_root(
          request, source_history, receiver_position, midpoint);
      const double midpoint_residual = midpoint_sample.residual;
      const double half_width = 0.5 * (cell.upper - cell.lower);
      const double residual_variation = residual_variation_upper_bound(
          midpoint_sample, segment, cell.lower, cell.upper,
          residual_lipschitz);
      if (std::abs(midpoint_residual) >
          residual_variation + residual_tolerance) {
        continue;
      }
      if (std::abs(midpoint_residual) <= residual_tolerance &&
          half_width <= time_tolerance) {
        if (receiver.path_id == source.path_id && cell.upper == upper) {
          // A no-sign-change contact in the last resolution cell is the
          // excluded coincident endpoint, not a delayed self interaction.
          continue;
        }
        const auto insertion = std::lower_bound(
            result.roots.begin(), result.roots.end(), midpoint);
        result.roots.insert(insertion, midpoint);
        continue;
      }
      if (cell.depth >= kMaximumDepth || half_width <= time_tolerance) {
        if (receiver.path_id == source.path_id && cell.upper == upper) {
          continue;
        }
        result.failure_code = "display_root_isolation_unresolved";
        return result;
      }
      pending.push_back({
          midpoint, cell.upper, midpoint_residual, cell.upper_residual,
          cell.depth + 1U});
      pending.push_back({
          cell.lower, midpoint, cell.lower_residual, midpoint_residual,
          cell.depth + 1U});
    }
  }
  return result;
}

Vector finite_width_integrand(
    const DisplayEvaluationRequest& request,
    const DisplayEvaluationPath& receiver,
    const DisplayEvaluationPath& source,
    const RetainedHistory& source_history,
    const Vector& receiver_position,
    const Vector& receiver_velocity,
    double emission) {
  const Vector source_position = evaluate_history(
      source_history, emission, false);
  const Vector displacement = subtract(receiver_position, source_position);
  const double separation = norm(displacement);
  const double radial_square = separation * separation +
      request.core_scale * request.core_scale;
  const double radial_denominator = radial_square * std::sqrt(radial_square);
  if (!(radial_denominator > 0.0) || !std::isfinite(radial_denominator)) {
    throw std::runtime_error("display_nonfinite_state");
  }
  Vector direction{};
  if (separation > 0.0) {
    direction = scale(1.0 / separation, displacement);
  }
  const double receiver_strength = std::abs(
      request.field_speed - dot(direction, receiver_velocity));
  const double residual = separation - request.field_speed *
      (request.reception_time - emission);
  const double width_square = request.causal_width * request.causal_width;
  const double mollifier = std::exp(
      -residual * residual / (2.0 * width_square)) /
      (std::sqrt(2.0 * std::numbers::pi) * request.causal_width);
  const double factor = request.coupling * receiver.charge * source.charge *
      receiver_strength * mollifier / radial_denominator;
  const Vector value = scale(factor, displacement);
  if (!finite_vector(value)) {
    throw std::runtime_error("display_nonfinite_state");
  }
  return value;
}

Vector regulated_pair_acceleration(
    const DisplayEvaluationRequest& request,
    const DisplayEvaluationPath& receiver,
    const DisplayEvaluationPath& source,
    const RetainedHistory& source_history,
    const Vector& receiver_position,
    const Vector& receiver_velocity,
    const std::vector<double>& roots) {
  std::vector<std::pair<double, double>> windows;
  const double lower = source.history->t_start();
  const double upper = std::nextafter(
      request.reception_time, -std::numeric_limits<double>::infinity());
  const auto append_window = [&](double center, double source_normal) {
    const double speed_floor = std::max(
        std::abs(source_normal), 0.25 * request.field_speed);
    const double half_width = std::max(
        8.0 * request.causal_width / speed_floor,
        4.0 * request.core_scale / request.field_speed);
    windows.emplace_back(
        std::max(lower, center - half_width),
        std::min(upper, center + half_width));
  };
  for (const double root : roots) {
    append_window(
        root,
        sample_root(
            request, source_history, receiver_position, root)
            .source_normal);
  }
  if (windows.empty()) {
    append_window(upper, request.field_speed);
  }
  std::sort(windows.begin(), windows.end());
  std::vector<std::pair<double, double>> merged;
  for (const auto& window : windows) {
    if (!(window.first < window.second)) continue;
    if (merged.empty() || window.first > merged.back().second) {
      merged.push_back(window);
    } else {
      merged.back().second = std::max(merged.back().second, window.second);
    }
  }
  Vector total{};
  for (const auto& [start, end] : merged) {
    const double midpoint = 0.5 * (start + end);
    const double radius = 0.5 * (end - start);
    for (std::size_t index = 0U; index < kGaussNodes.size(); ++index) {
      for (const double sign : {-1.0, 1.0}) {
        const double emission = midpoint + sign * radius * kGaussNodes[index];
        total = add(total, scale(
            radius * kGaussWeights[index],
            finite_width_integrand(
                request, receiver, source, source_history, receiver_position,
                receiver_velocity, emission)));
      }
    }
  }
  return total;
}

struct PairWork {
  PairRoots roots;
  Vector acceleration{};
  bool regulated = false;
  double emission_to_current_source_ratio_max = 0.0;
  double emission_to_current_source_ratio_sum = 0.0;
  std::size_t emission_to_current_source_ratio_sample_count = 0U;
  std::string failure_code;
};

class DisplayParallelExecutor {
 public:
  explicit DisplayParallelExecutor(std::size_t thread_count) {
    const std::size_t helper_count = thread_count > 1U
        ? thread_count - 1U : 0U;
    helpers_.reserve(helper_count);
    for (std::size_t index = 0U; index < helper_count; ++index) {
      helpers_.emplace_back([this]() { helper_loop(); });
    }
  }

  ~DisplayParallelExecutor() {
    {
      std::lock_guard<std::mutex> lock(mutex_);
      stopping_ = true;
      ++generation_;
    }
    ready_.notify_all();
    for (auto& helper : helpers_) helper.join();
  }

  void run(
      std::size_t count,
      const std::function<void(std::size_t)>& function) {
    if (helpers_.empty() || count < 2U) {
      for (std::size_t index = 0U; index < count; ++index) function(index);
      return;
    }
    {
      std::lock_guard<std::mutex> lock(mutex_);
      function_ = function;
      count_ = count;
      next_.store(0U);
      completed_ = 0U;
      ++generation_;
    }
    ready_.notify_all();
    consume();
    std::unique_lock<std::mutex> lock(mutex_);
    complete_.wait(lock, [&]() { return completed_ == helpers_.size(); });
    function_ = {};
  }

 private:
  void consume() {
    while (true) {
      const std::size_t index = next_.fetch_add(1U);
      if (index >= count_) return;
      function_(index);
    }
  }

  void helper_loop() {
    std::size_t observed_generation = 0U;
    while (true) {
      {
        std::unique_lock<std::mutex> lock(mutex_);
        ready_.wait(lock, [&]() {
          return stopping_ || generation_ != observed_generation;
        });
        if (stopping_) return;
        observed_generation = generation_;
      }
      consume();
      {
        std::lock_guard<std::mutex> lock(mutex_);
        ++completed_;
      }
      complete_.notify_one();
    }
  }

  std::vector<std::thread> helpers_;
  std::mutex mutex_;
  std::condition_variable ready_;
  std::condition_variable complete_;
  std::function<void(std::size_t)> function_;
  std::atomic<std::size_t> next_{0U};
  std::size_t count_ = 0U;
  std::size_t completed_ = 0U;
  std::size_t generation_ = 0U;
  bool stopping_ = false;
};

}  // namespace

DisplayEvaluationResult evaluate_display_acceleration(
    const DisplayEvaluationRequest& request) {
  const auto total_start = Clock::now();
  DisplayEvaluationResult result;
  result.status = "failed";
  if (request.paths.empty() || !(request.field_speed > 0.0) ||
      !(request.root_relative_tolerance > 0.0) ||
      !(request.causal_width > 0.0) || !(request.core_scale > 0.0) ||
      request.thread_count == 0U) {
    result.failure_code = "display_invalid_evaluation_request";
    return result;
  }
  try {
    const std::size_t path_count = request.paths.size();
    const std::size_t pair_count = path_count * path_count;
    std::vector<Vector> receiver_positions(path_count);
    std::vector<Vector> receiver_velocities(path_count);
    std::vector<SourceSummary> source_summaries;
    source_summaries.reserve(path_count);
    for (std::size_t index = 0U; index < path_count; ++index) {
      const auto& path = request.paths[index];
      if (path.history == nullptr || !std::isfinite(path.charge)) {
        throw std::runtime_error("display_nonfinite_state");
      }
      receiver_positions[index] = evaluate_history(
          *path.history, request.reception_time, false);
      receiver_velocities[index] = evaluate_history(
          *path.history, request.reception_time, true);
      source_summaries.push_back(summarize_source(
          *path.history, request.field_speed));
    }

    std::vector<PairWork> pairs(pair_count);
    DisplayParallelExecutor executor(request.thread_count);
    const auto root_start = Clock::now();
    executor.run(pair_count, [&](std::size_t pair_index) {
      const std::size_t receiver_index = pair_index / path_count;
      const std::size_t source_index = pair_index % path_count;
      auto& pair = pairs[pair_index];
      try {
        pair.roots = find_roots(
            request, request.paths[receiver_index],
            request.paths[source_index], *request.paths[source_index].history,
            source_summaries[source_index],
            receiver_positions[receiver_index]);
        pair.failure_code = pair.roots.failure_code;
      } catch (const std::runtime_error& error) {
        pair.failure_code = error.what();
      } catch (const std::exception&) {
        pair.failure_code = "display_nonfinite_state";
      }
    });
    result.root_wall_seconds = seconds_since(root_start);

    for (const auto& pair : pairs) {
      if (!pair.failure_code.empty()) {
        result.failure_code = pair.failure_code;
        result.total_wall_seconds = seconds_since(total_start);
        return result;
      }
    }

    const auto acceleration_start = Clock::now();
    executor.run(pair_count, [&](std::size_t pair_index) {
      const std::size_t receiver_index = pair_index / path_count;
      const std::size_t source_index = pair_index % path_count;
      auto& pair = pairs[pair_index];
      try {
        const auto& receiver = request.paths[receiver_index];
        const auto& source = request.paths[source_index];
        const Vector& receiver_position = receiver_positions[receiver_index];
        const Vector& receiver_velocity = receiver_velocities[receiver_index];
        const Vector& current_source_position = receiver_positions[source_index];
        bool regulated = false;
        for (const double root : pair.roots.roots) {
          const RootSample sample = sample_root(
              request, *request.paths[source_index].history,
              receiver_position, root);
          if (sample.separation > 0.0) {
            const double ratio = norm(subtract(
                current_source_position, sample.source_position)) /
                sample.separation;
            if (!std::isfinite(ratio)) {
              throw std::runtime_error("display_nonfinite_state");
            }
            pair.emission_to_current_source_ratio_max = std::max(
                pair.emission_to_current_source_ratio_max, ratio);
            pair.emission_to_current_source_ratio_sum += ratio;
            ++pair.emission_to_current_source_ratio_sample_count;
          }
          const double caustic_floor = std::max(
              request.source_normal_floor,
              std::sqrt(std::numeric_limits<double>::epsilon()) *
                  std::max(request.field_speed, norm(sample.source_velocity)));
          if (sample.separation <= request.core_scale ||
              std::abs(sample.source_normal) <= caustic_floor) {
            regulated = true;
            break;
          }
        }
        if (receiver.path_id != source.path_id) {
          const double endpoint_separation = norm(subtract(
              receiver_position,
              evaluate_history(
                  *request.paths[source_index].history, request.reception_time,
                  false)));
          regulated = regulated || endpoint_separation <= request.core_scale;
        }
        pair.regulated = regulated;
        if (regulated) {
          pair.acceleration = regulated_pair_acceleration(
              request, receiver, source, *request.paths[source_index].history,
              receiver_position,
              receiver_velocity, pair.roots.roots);
          return;
        }
        Vector acceleration{};
        for (const double root : pair.roots.roots) {
          const RootSample sample = sample_root(
              request, *request.paths[source_index].history,
              receiver_position, root);
          if (!(sample.separation > 0.0) || sample.source_normal == 0.0) {
            throw std::runtime_error("display_nonfinite_state");
          }
          const Vector direction = scale(
              1.0 / sample.separation, sample.displacement);
          const double receiver_normal = request.field_speed -
              dot(direction, receiver_velocity);
          const double factor = request.coupling * receiver.charge *
              source.charge * std::abs(receiver_normal / sample.source_normal) /
              (sample.separation * sample.separation * sample.separation);
          acceleration = add(
              acceleration, scale(factor, sample.displacement));
        }
        if (!finite_vector(acceleration)) {
          throw std::runtime_error("display_nonfinite_state");
        }
        pair.acceleration = acceleration;
      } catch (const std::runtime_error& error) {
        pair.failure_code = error.what();
      } catch (const std::exception&) {
        pair.failure_code = "display_nonfinite_state";
      }
    });
    result.acceleration_wall_seconds = seconds_since(acceleration_start);

    result.receiver_accelerations.reserve(path_count);
    result.pair_root_counts.reserve(pair_count);
    for (std::size_t receiver_index = 0U;
         receiver_index < path_count; ++receiver_index) {
      Vector total{};
      for (std::size_t source_index = 0U;
           source_index < path_count; ++source_index) {
        const auto& pair = pairs[receiver_index * path_count + source_index];
        if (!pair.failure_code.empty()) {
          result.failure_code = pair.failure_code;
          result.total_wall_seconds = seconds_since(total_start);
          return result;
        }
        ++result.root_pair_count;
        result.root_count += pair.roots.roots.size();
        result.pair_root_counts.push_back({
            request.paths[receiver_index].path_id,
            request.paths[source_index].path_id,
            pair.roots.roots.size()});
        total = add(total, pair.acceleration);
        result.emission_to_current_source_ratio_max = std::max(
            result.emission_to_current_source_ratio_max,
            pair.emission_to_current_source_ratio_max);
        result.emission_to_current_source_ratio_sum +=
            pair.emission_to_current_source_ratio_sum;
        result.emission_to_current_source_ratio_sample_count +=
            pair.emission_to_current_source_ratio_sample_count;
        if (pair.regulated) {
          result.regulated_pairs.emplace_back(
              request.paths[receiver_index].path_id,
              request.paths[source_index].path_id);
        }
      }
      if (!finite_vector(total)) {
        result.failure_code = "display_nonfinite_state";
        result.total_wall_seconds = seconds_since(total_start);
        return result;
      }
      result.receiver_accelerations.push_back({
          request.paths[receiver_index].path_id, total});
    }
    result.status = "display_evaluated";
    result.failure_code.clear();
  } catch (const std::runtime_error& error) {
    result.failure_code = error.what();
  } catch (const std::exception&) {
    result.failure_code = "display_nonfinite_state";
  }
  result.total_wall_seconds = seconds_since(total_start);
  return result;
}

}  // namespace architrino::eom
