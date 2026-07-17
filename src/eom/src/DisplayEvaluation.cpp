#include "architrino/eom/DisplayEvaluation.hpp"

#include <algorithm>
#include <array>
#include <atomic>
#include <chrono>
#include <cmath>
#include <cstddef>
#include <cstdlib>
#include <exception>
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

double token_value(const std::string& token) {
  char* end = nullptr;
  const double value = std::strtod(token.c_str(), &end);
  if (end == token.c_str() || *end != '\0' || !std::isfinite(value)) {
    throw std::runtime_error("display_nonfinite_state");
  }
  return value;
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

Vector evaluate_segment(
    const CubicHistorySegment& segment,
    double time,
    bool velocity) {
  const double local = time - segment.t_start();
  Vector result{};
  for (std::size_t axis = 0U; axis < 3U; ++axis) {
    const auto& row = segment.coefficient_tokens()[axis];
    const double c0 = token_value(row[0]);
    const double c1 = token_value(row[1]);
    const double c2 = token_value(row[2]);
    const double c3 = token_value(row[3]);
    result[axis] = velocity
        ? (3.0 * c3 * local + 2.0 * c2) * local + c1
        : ((c3 * local + c2) * local + c1) * local + c0;
  }
  if (!finite_vector(result)) {
    throw std::runtime_error("display_nonfinite_state");
  }
  return result;
}

Vector evaluate_history(
    const RetainedHistory& history,
    double time,
    bool velocity) {
  return evaluate_segment(
      history.segments()[history.segment_index_at(time)], time, velocity);
}

struct SourceSummary {
  double speed_upper = 0.0;
  Vector position_lower{
      std::numeric_limits<double>::infinity(),
      std::numeric_limits<double>::infinity(),
      std::numeric_limits<double>::infinity()};
  Vector position_upper{
      -std::numeric_limits<double>::infinity(),
      -std::numeric_limits<double>::infinity(),
      -std::numeric_limits<double>::infinity()};
  bool sub_field_speed = false;
};

void include_position_extrema(
    SourceSummary& summary,
    const CubicHistorySegment& segment,
    std::size_t axis) {
  const auto& row = segment.coefficient_tokens()[axis];
  const double c1 = token_value(row[1]);
  const double c2 = token_value(row[2]);
  const double c3 = token_value(row[3]);
  const double duration = segment.t_end() - segment.t_start();
  std::array<double, 4> candidates{0.0, duration, -1.0, -1.0};
  std::size_t count = 2U;
  if (c3 == 0.0) {
    if (c2 != 0.0) {
      const double root = -c1 / (2.0 * c2);
      if (root > 0.0 && root < duration) candidates[count++] = root;
    }
  } else {
    const double discriminant = 4.0 * c2 * c2 - 12.0 * c3 * c1;
    if (discriminant >= 0.0) {
      const double root_term = std::sqrt(discriminant);
      for (const double root : {
               (-2.0 * c2 - root_term) / (6.0 * c3),
               (-2.0 * c2 + root_term) / (6.0 * c3)}) {
        if (root > 0.0 && root < duration) candidates[count++] = root;
      }
    }
  }
  for (std::size_t index = 0U; index < count; ++index) {
    const Vector value = evaluate_segment(
        segment, segment.t_start() + candidates[index], false);
    summary.position_lower[axis] =
        std::min(summary.position_lower[axis], value[axis]);
    summary.position_upper[axis] =
        std::max(summary.position_upper[axis], value[axis]);
  }
}

SourceSummary summarize_source(
    const RetainedHistory& history,
    double field_speed) {
  SourceSummary summary;
  for (const auto& segment : history.segments()) {
    const double duration = segment.t_end() - segment.t_start();
    double speed_square_upper = 0.0;
    for (std::size_t axis = 0U; axis < 3U; ++axis) {
      include_position_extrema(summary, segment, axis);
      const auto& row = segment.coefficient_tokens()[axis];
      const double component_upper =
          std::abs(token_value(row[1])) +
          2.0 * std::abs(token_value(row[2])) * duration +
          3.0 * std::abs(token_value(row[3])) * duration * duration;
      speed_square_upper += component_upper * component_upper;
    }
    summary.speed_upper =
        std::max(summary.speed_upper, std::sqrt(speed_square_upper));
  }
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
    const DisplayEvaluationPath& source,
    const Vector& receiver_position,
    double emission) {
  RootSample sample;
  sample.source_position = evaluate_history(*source.history, emission, false);
  sample.source_velocity = evaluate_history(*source.history, emission, true);
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
    const DisplayEvaluationPath& source,
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
        request, source, receiver_position, point);
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

struct PairRoots {
  std::vector<double> roots;
  std::string failure_code;
};

PairRoots find_roots(
    const DisplayEvaluationRequest& request,
    const DisplayEvaluationPath& receiver,
    const DisplayEvaluationPath& source,
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
      request, source, receiver_position, lower).residual;
  const double upper_residual = sample_root(
      request, source, receiver_position, upper).residual;
  if (source_summary.sub_field_speed) {
    if (lower_residual > 0.0) {
      result.failure_code = "display_insufficient_history_depth";
      return result;
    }
    const auto root = solve_bracket(
        request, source, receiver_position, lower, upper,
        lower_residual, upper_residual);
    if (!root.has_value()) {
      result.failure_code = "display_root_solve_not_converged";
      return result;
    }
    result.roots.push_back(*root);
    return result;
  }

  double prior_time = lower;
  double prior_residual = lower_residual;
  for (const auto& segment : source.history->segments()) {
    const double segment_lower = std::max(lower, segment.t_start());
    const double segment_upper = std::min(upper, segment.t_end());
    if (!(segment_lower < segment_upper)) continue;
    constexpr std::size_t kSamplesPerSegment = 4U;
    for (std::size_t sample_index = 1U;
         sample_index <= kSamplesPerSegment; ++sample_index) {
      const double fraction = static_cast<double>(sample_index) /
          static_cast<double>(kSamplesPerSegment);
      const double time = segment_lower +
          fraction * (segment_upper - segment_lower);
      const double residual = sample_root(
          request, source, receiver_position, time).residual;
      if ((prior_residual <= 0.0 && residual >= 0.0) ||
          (prior_residual >= 0.0 && residual <= 0.0)) {
        const auto root = solve_bracket(
            request, source, receiver_position, prior_time, time,
            prior_residual, residual);
        if (!root.has_value()) {
          result.failure_code = "display_root_solve_not_converged";
          return result;
        }
        const double dedup = request.root_relative_tolerance *
            std::max(1.0, std::abs(*root));
        if (result.roots.empty() ||
            std::abs(result.roots.back() - *root) > 8.0 * dedup) {
          result.roots.push_back(*root);
        }
      }
      prior_time = time;
      prior_residual = residual;
    }
  }
  return result;
}

double distance_to_box(
    const Vector& point,
    const Vector& lower,
    const Vector& upper) {
  Vector delta{};
  for (std::size_t axis = 0U; axis < 3U; ++axis) {
    if (point[axis] < lower[axis]) {
      delta[axis] = lower[axis] - point[axis];
    } else if (point[axis] > upper[axis]) {
      delta[axis] = point[axis] - upper[axis];
    }
  }
  return norm(delta);
}

std::optional<double> display_far_field_bound(
    const DisplayEvaluationRequest& request,
    const DisplayEvaluationPath& receiver,
    const DisplayEvaluationPath& source,
    const SourceSummary& source_summary,
    const Vector& receiver_position,
    const Vector& receiver_velocity) {
  if (!(request.far_field_enclosure_fraction > 0.0)) return std::nullopt;
  const double separation = distance_to_box(
      receiver_position, source_summary.position_lower,
      source_summary.position_upper);
  const double source_normal =
      request.field_speed - source_summary.speed_upper;
  if (!(separation > 0.0) || !(source_normal > 0.0)) {
    return std::nullopt;
  }
  const double receiver_normal = request.field_speed + norm(receiver_velocity);
  const double magnitude = std::abs(
      request.coupling * receiver.charge * source.charge) * receiver_normal /
      (separation * separation * source_normal);
  const double pair_budget = request.far_field_enclosure_fraction *
      request.acceleration_tolerance /
      static_cast<double>(request.paths.size());
  if (!std::isfinite(magnitude) || 2.0 * magnitude > pair_budget) {
    return std::nullopt;
  }
  return magnitude;
}

Vector finite_width_integrand(
    const DisplayEvaluationRequest& request,
    const DisplayEvaluationPath& receiver,
    const DisplayEvaluationPath& source,
    const Vector& receiver_position,
    const Vector& receiver_velocity,
    double emission) {
  const Vector source_position = evaluate_history(
      *source.history, emission, false);
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
        sample_root(request, source, receiver_position, root).source_normal);
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
                request, receiver, source, receiver_position,
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
  bool far_field = false;
  double far_field_width = 0.0;
  std::string failure_code;
};

template <class Function>
void parallel_for(
    std::size_t count,
    std::size_t thread_count,
    Function&& function) {
  if (thread_count <= 1U || count < 2U) {
    for (std::size_t index = 0U; index < count; ++index) function(index);
    return;
  }
  std::atomic<std::size_t> next{0U};
  const std::size_t workers = std::min(thread_count, count);
  std::vector<std::thread> threads;
  threads.reserve(workers);
  for (std::size_t worker = 0U; worker < workers; ++worker) {
    threads.emplace_back([&]() {
      while (true) {
        const std::size_t index = next.fetch_add(1U);
        if (index >= count) return;
        function(index);
      }
    });
  }
  for (auto& thread : threads) thread.join();
}

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
    const auto root_start = Clock::now();
    parallel_for(pair_count, request.thread_count, [&](std::size_t pair_index) {
      const std::size_t receiver_index = pair_index / path_count;
      const std::size_t source_index = pair_index % path_count;
      auto& pair = pairs[pair_index];
      try {
        const auto bound = display_far_field_bound(
            request, request.paths[receiver_index],
            request.paths[source_index], source_summaries[source_index],
            receiver_positions[receiver_index],
            receiver_velocities[receiver_index]);
        if (bound.has_value()) {
          pair.far_field = true;
          pair.far_field_width = 2.0 * *bound;
          return;
        }
        pair.roots = find_roots(
            request, request.paths[receiver_index],
            request.paths[source_index], source_summaries[source_index],
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
    parallel_for(pair_count, request.thread_count, [&](std::size_t pair_index) {
      const std::size_t receiver_index = pair_index / path_count;
      const std::size_t source_index = pair_index % path_count;
      auto& pair = pairs[pair_index];
      if (pair.far_field) return;
      try {
        const auto& receiver = request.paths[receiver_index];
        const auto& source = request.paths[source_index];
        const Vector& receiver_position = receiver_positions[receiver_index];
        const Vector& receiver_velocity = receiver_velocities[receiver_index];
        bool regulated = false;
        for (const double root : pair.roots.roots) {
          const RootSample sample = sample_root(
              request, source, receiver_position, root);
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
              evaluate_history(*source.history, request.reception_time, false)));
          regulated = regulated || endpoint_separation <= request.core_scale;
        }
        pair.regulated = regulated;
        if (regulated) {
          pair.acceleration = regulated_pair_acceleration(
              request, receiver, source, receiver_position,
              receiver_velocity, pair.roots.roots);
          return;
        }
        Vector acceleration{};
        for (const double root : pair.roots.roots) {
          const RootSample sample = sample_root(
              request, source, receiver_position, root);
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
    std::vector<double> receiver_far_field_width(path_count, 0.0);
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
        if (pair.far_field) {
          ++result.far_field_pair_count;
          result.far_field_error_width_total += pair.far_field_width;
          receiver_far_field_width[receiver_index] += pair.far_field_width;
        } else {
          total = add(total, pair.acceleration);
        }
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
    for (const double width : receiver_far_field_width) {
      result.far_field_error_width_max_receiver = std::max(
          result.far_field_error_width_max_receiver, width);
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
