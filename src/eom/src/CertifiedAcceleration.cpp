#include "architrino/eom/CertifiedAcceleration.hpp"
#include "architrino/eom/MultiprecisionAcceleration.hpp"

#include <algorithm>
#include <array>
#include <atomic>
#include <chrono>
#include <cmath>
#include <condition_variable>
#include <cstddef>
#include <exception>
#include <functional>
#include <iterator>
#include <limits>
#include <map>
#include <mutex>
#include <optional>
#include <set>
#include <stdexcept>
#include <string>
#include <thread>
#include <tuple>
#include <utility>
#include <vector>

namespace architrino::eom {
namespace {

using SteadyClock = std::chrono::steady_clock;

double wall_seconds_since(const SteadyClock::time_point& start) {
  return std::chrono::duration<double>(SteadyClock::now() - start).count();
}

class AccelerationCertificationError : public std::runtime_error {
 public:
  using std::runtime_error::runtime_error;
};

class DeterministicParallelExecutor {
 public:
  explicit DeterministicParallelExecutor(std::size_t thread_count) {
    const std::size_t helper_count = thread_count > 1U ? thread_count - 1U : 0U;
    helpers_.reserve(helper_count);
    for (std::size_t index = 0; index < helper_count; ++index) {
      helpers_.emplace_back([this]() { helper_loop(); });
    }
  }

  DeterministicParallelExecutor(const DeterministicParallelExecutor&) = delete;
  DeterministicParallelExecutor& operator=(
      const DeterministicParallelExecutor&) = delete;

  ~DeterministicParallelExecutor() {
    {
      std::lock_guard<std::mutex> lock(mutex_);
      stopping_ = true;
      ++generation_;
    }
    ready_.notify_all();
    for (auto& helper : helpers_) {
      helper.join();
    }
  }

  void run(
      std::size_t task_count,
      const std::function<void(std::size_t)>& task) {
    if (helpers_.empty() || task_count < 2U) {
      for (std::size_t index = 0; index < task_count; ++index) {
        task(index);
      }
      return;
    }
    {
      std::lock_guard<std::mutex> lock(mutex_);
      task_ = task;
      task_count_ = task_count;
      next_task_.store(0U);
      completed_helpers_ = 0U;
      ++generation_;
    }
    ready_.notify_all();
    consume_tasks();
    std::unique_lock<std::mutex> lock(mutex_);
    complete_.wait(lock, [&]() {
      return completed_helpers_ == helpers_.size();
    });
    task_ = {};
  }

 private:
  void consume_tasks() {
    while (true) {
      const std::size_t index = next_task_.fetch_add(1U);
      if (index >= task_count_) {
        return;
      }
      task_(index);
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
        if (stopping_) {
          return;
        }
        observed_generation = generation_;
      }
      consume_tasks();
      {
        std::lock_guard<std::mutex> lock(mutex_);
        ++completed_helpers_;
      }
      complete_.notify_one();
    }
  }

  std::vector<std::thread> helpers_;
  std::mutex mutex_;
  std::condition_variable ready_;
  std::condition_variable complete_;
  std::function<void(std::size_t)> task_;
  std::atomic<std::size_t> next_task_{0U};
  std::size_t task_count_ = 0U;
  std::size_t completed_helpers_ = 0U;
  std::size_t generation_ = 0U;
  bool stopping_ = false;
};

Interval token_bounds(const std::string& lower, const std::string& upper) {
  const Interval lower_value = Interval::decimal_token(lower);
  const Interval upper_value = Interval::decimal_token(upper);
  if (lower_value.lower() > upper_value.upper()) {
    throw std::invalid_argument("interval token lower bound exceeds upper bound");
  }
  return Interval(lower_value.lower(), upper_value.upper());
}

bool same_interval(const Interval& left, const Interval& right) {
  return left.lower() == right.lower() && left.upper() == right.upper();
}

bool same_vector(const IntervalVector& left, const IntervalVector& right) {
  return same_interval(left[0], right[0]) &&
         same_interval(left[1], right[1]) &&
         same_interval(left[2], right[2]);
}

void require_positive(const Interval& value, const char* label) {
  if (value.lower() <= 0.0) {
    throw std::invalid_argument(std::string(label) + " must be positive");
  }
}

void require_nonzero_charge(const Interval& value, const char* label) {
  if (value.contains_zero()) {
    throw std::invalid_argument(std::string(label) + " must have certified sign");
  }
}

int charge_polarity(const Interval& receiver, const Interval& source) {
  return receiver.strict_sign() == source.strict_sign() ? 1 : -1;
}

bool root_overlaps_segment(
    const Interval& emission,
    const CubicHistorySegment& segment) {
  const Interval segment_interval = token_bounds(
      segment.t_start_token(), segment.t_end_token());
  return emission.intersection(segment_interval).has_value();
}

NativeAccelerationRow reconstruct_row(
    const NativePairAccelerationRequest& request,
    const NativeRootBracket& root,
    std::size_t row_index,
    const Interval& receiver_charge,
    const Interval& source_charge,
    const Interval& coupling,
    const Interval& source_normal_floor) {
  const auto& root_certificate = *request.root_certificate;
  const Interval reception =
      Interval::decimal_token(root_certificate.reception_time);
  const Interval certified_emission = token_bounds(root.lower, root.upper);
  Interval emission = certified_emission;
  if (!request.receiver_history->covers(reception) ||
      !request.source_history->covers(emission)) {
    throw AccelerationCertificationError(
        "acceleration evaluation lies outside retained-history coverage");
  }
  if (root.source_segment_indices.empty()) {
    throw AccelerationCertificationError("root lacks source segment identity");
  }
  for (const std::size_t index : root.source_segment_indices) {
    if (index >= request.source_history->segments().size() ||
        !root_overlaps_segment(
            certified_emission, request.source_history->segments()[index])) {
      throw AccelerationCertificationError(
          "root source segment identity does not cover the root enclosure");
    }
  }

  const Interval field_speed =
      Interval::decimal_token(root_certificate.field_speed);
  const Interval certified_source_normal = token_bounds(
      root.source_normal_lower, root.source_normal_upper);
  bool emission_contracted = false;
  if (!certified_source_normal.contains_zero()) {
    const Interval midpoint = Interval::point(certified_emission.midpoint());
    const IntervalVector contraction_receiver =
        request.receiver_history->correlated_position_hull(reception);
    const IntervalVector contraction_source =
        request.source_history->correlated_position_hull(midpoint);
    const Interval contraction_residual =
        norm(subtract(contraction_receiver, contraction_source)) -
        field_speed * (reception - midpoint);
    const Interval candidate =
        midpoint - contraction_residual / certified_source_normal;
    const auto intersection = certified_emission.intersection(candidate);
    if (intersection.has_value() &&
        intersection->width() < certified_emission.width()) {
      emission = *intersection;
      emission_contracted = true;
    }
  }

  const IntervalVector receiver_position =
      request.receiver_history->correlated_position_hull(reception);
  const IntervalVector receiver_velocity =
      request.receiver_history->velocity_hull(reception);
  const IntervalVector source_position =
      request.source_history->correlated_position_hull(emission);
  const IntervalVector source_velocity =
      request.source_history->velocity_hull(emission);
  const IntervalVector displacement =
      subtract(receiver_position, source_position);
  const Interval separation = norm(displacement);
  if (separation.contains_zero()) {
    throw AccelerationCertificationError(
        "sharp acceleration separation enclosure contains zero");
  }
  const IntervalVector direction = divide(displacement, separation);
  const Interval evaluated_source_normal =
      field_speed - dot(direction, source_velocity);
  const auto source_normal_intersection =
      evaluated_source_normal.intersection(certified_source_normal);
  if (!source_normal_intersection.has_value()) {
    throw AccelerationCertificationError(
        "root and acceleration transmitter-side enclosures disagree");
  }
  const Interval source_normal = *source_normal_intersection;
  if (source_normal.contains_zero() ||
      source_normal.strict_sign() != root.source_normal_sign) {
    throw AccelerationCertificationError(
        "sharp acceleration transmitter-side sign is uncertified");
  }
  if (interval_absolute(source_normal).lower() < source_normal_floor.upper()) {
    throw AccelerationCertificationError(
        "sharp acceleration transmitter-side floor is not certified");
  }

  const Interval evaluated_receiver_normal =
      field_speed - dot(direction, receiver_velocity);
  const Interval certified_receiver_normal = token_bounds(
      root.receiver_normal_lower, root.receiver_normal_upper);
  const auto receiver_normal_intersection =
      evaluated_receiver_normal.intersection(certified_receiver_normal);
  if (!receiver_normal_intersection.has_value()) {
    throw AccelerationCertificationError(
        "root and acceleration receiver-side enclosures disagree");
  }
  const Interval receiver_normal = *receiver_normal_intersection;
  const Interval branch_orientation = receiver_normal / source_normal;
  const Interval receiver_strength = interval_absolute(branch_orientation);
  const Interval radial_denominator =
      interval_square(separation) * separation;
  const IntervalVector inverse_square_direction =
      divide(displacement, radial_denominator);
  const Interval signed_scale =
      coupling * receiver_charge * source_charge * receiver_strength;
  const IntervalVector acceleration =
      scale(signed_scale, inverse_square_direction);

  return NativeAccelerationRow{
      .row_id = request.row_id + "/root/" + std::to_string(row_index),
      .receiver_path_id = request.receiver_path_id,
      .source_path_id = request.source_path_id,
      .row_index = row_index,
      .chart = "sharp_root",
      .reception_time = root_certificate.reception_time,
      .emission_lower = root.lower,
      .emission_upper = root.upper,
      .source_segment_indices = root.source_segment_indices,
      .separation = separation,
      .source_normal = source_normal,
      .receiver_normal = receiver_normal,
      .branch_orientation = branch_orientation,
      .receiver_strength = receiver_strength,
      .polarity = charge_polarity(receiver_charge, source_charge),
      .charge_product_magnitude =
          interval_absolute(receiver_charge * source_charge),
      .coupling = coupling,
      .accumulation_group = request.receiver_path_id,
      .acceptance_status = "consumed_certified_sharp_root",
      .root_precision_route = root.precision_route,
      .root_precision_bits = root.precision_bits,
      .acceleration_precision_route = emission_contracted
          ? "binary64_outward_monotone_root_contraction"
          : "binary64_outward",
      .acceleration_precision_bits = 53,
      .acceleration = acceleration,
  };
}

struct FiniteWidthIntegrand {
  IntervalVector value;
  bool used_analytic_fold = false;
  bool used_correlated_self_chord = false;
  bool used_stable_circular_residual = false;
};

bool analytic_pinned_fold_eligible(
    const NativePairAccelerationRequest& request) {
  if (!request.use_analytic_pinned_fold ||
      request.receiver_path_id != request.source_path_id) {
    return false;
  }
  const auto& circular =
      request.source_history->uniform_circular_endpoint_certificate();
  return circular.has_value() &&
      same_interval(
          Interval::decimal_token(circular->tangential_speed),
          Interval::decimal_token(request.root_certificate->field_speed));
}

bool same_retained_history_pair(
    const NativePairAccelerationRequest& request) {
  return request.receiver_path_id == request.source_path_id &&
      request.receiver_history->history_id() ==
          request.source_history->history_id() &&
      request.receiver_history->provenance_fingerprint() ==
          request.source_history->provenance_fingerprint();
}

Interval stable_sine_minus_argument(const Interval& argument) {
  const double maximum = std::max(
      std::abs(argument.lower()), std::abs(argument.upper()));
  if (maximum > 0.25) {
    return interval_sin(argument) - argument;
  }
  const Interval one = Interval::point(1.0);
  const Interval argument_square = interval_square(argument);
  const Interval cubic = argument * argument_square;
  const Interval coefficient =
      (Interval::point(-1.0) / Interval::point(6.0)) +
      argument_square *
          ((one / Interval::point(120.0)) +
           argument_square *
               ((Interval::point(-1.0) / Interval::point(5040.0)) +
                argument_square *
                    (one / Interval::point(362880.0))));
  Interval result = cubic * coefficient;
  const double remainder =
      std::pow(maximum, 11) / 39916800.0;
  return result.inflate(remainder);
}

std::optional<Interval> stable_circular_self_residual(
    const NativePairAccelerationRequest& request,
    const Interval& reception,
    const Interval& emission) {
  if (!request.use_stable_circular_residual ||
      !analytic_pinned_fold_eligible(request)) {
    return std::nullopt;
  }
  const auto& circular =
      *request.source_history->uniform_circular_endpoint_certificate();
  if (!request.receiver_history->uniform_circular_analytic_state(reception)
           .has_value() ||
      !request.source_history->uniform_circular_analytic_state(emission)
           .has_value()) {
    return std::nullopt;
  }
  const Interval angular_speed = interval_absolute(
      Interval::decimal_token(circular.angular_speed));
  const Interval tangential_speed =
      Interval::decimal_token(circular.tangential_speed);
  const Interval radius = tangential_speed / angular_speed;
  const Interval delay = reception - emission;
  if (delay.lower() < 0.0) {
    return std::nullopt;
  }
  const Interval argument =
      angular_speed * delay / Interval::point(2.0);
  // At the certified v=c_f pin, c_f D = 2 rho u.  Evaluating
  // 2 rho [sin(u)-u] retains the cubic term without subtracting two nearly
  // equal O(D) quantities.
  return Interval::point(2.0) * radius *
      stable_sine_minus_argument(argument);
}

IntervalVector finite_width_displacement(
    const NativePairAccelerationRequest& request,
    const Interval& reception,
    const Interval& emission,
    const IntervalVector& receiver_position,
    const IntervalVector& source_position) {
  if (!request.use_correlated_self_chord ||
      !same_retained_history_pair(request)) {
    return subtract(receiver_position, source_position);
  }
  const auto analytic_receiver =
      request.receiver_history->uniform_circular_analytic_state(reception);
  const auto analytic_source =
      request.source_history->uniform_circular_analytic_state(emission);
  if (analytic_receiver.has_value() && analytic_source.has_value()) {
    return subtract(analytic_receiver->position, analytic_source->position);
  }
  const auto correlated =
      request.source_history->correlated_self_displacement(
          reception, emission);
  return correlated.has_value()
      ? *correlated
      : subtract(receiver_position, source_position);
}

bool uses_correlated_self_chord(
    const NativePairAccelerationRequest& request,
    const Interval& reception,
    const Interval& emission) {
  if (!request.use_correlated_self_chord ||
      !same_retained_history_pair(request)) {
    return false;
  }
  if (request.receiver_history->uniform_circular_analytic_state(reception)
          .has_value() &&
      request.source_history->uniform_circular_analytic_state(emission)
          .has_value()) {
    return true;
  }
  return request.source_history->correlated_self_displacement(
      reception, emission).has_value();
}

std::optional<Interval> analytic_circular_taylor_residual(
    const NativePairAccelerationRequest& request,
    const Interval& emission,
    const IntervalVector& receiver_position,
    const Interval& reception,
    const Interval& field_speed) {
  if (!analytic_pinned_fold_eligible(request)) {
    return std::nullopt;
  }
  const double midpoint = emission.midpoint();
  const auto midpoint_state =
      request.source_history->uniform_circular_analytic_state(
          Interval::point(midpoint));
  const auto cell_state =
      request.source_history->uniform_circular_analytic_state(emission);
  if (!midpoint_state.has_value() || !cell_state.has_value()) {
    return std::nullopt;
  }
  const IntervalVector midpoint_displacement =
      subtract(receiver_position, midpoint_state->position);
  const Interval midpoint_separation = norm(midpoint_displacement);
  if (midpoint_separation.contains_zero()) {
    return std::nullopt;
  }
  const IntervalVector midpoint_direction =
      divide(midpoint_displacement, midpoint_separation);
  const Interval midpoint_time = Interval::point(midpoint);
  const Interval residual_at_midpoint =
      midpoint_separation - field_speed * (reception - midpoint_time);
  const Interval residual_derivative =
      field_speed - dot(midpoint_direction, midpoint_state->velocity);

  const IntervalVector cell_displacement =
      subtract(receiver_position, cell_state->position);
  const Interval cell_separation = norm(cell_displacement);
  if (cell_separation.contains_zero()) {
    return std::nullopt;
  }
  const IntervalVector cell_direction =
      divide(cell_displacement, cell_separation);
  const Interval radial_speed = dot(cell_direction, cell_state->velocity);
  const Interval speed_square =
      interval_square(cell_state->velocity[0]) +
      interval_square(cell_state->velocity[1]) +
      interval_square(cell_state->velocity[2]);
  const Interval transverse_speed_square =
      speed_square - interval_square(radial_speed);
  const Interval residual_curvature =
      transverse_speed_square / cell_separation -
      dot(cell_direction, cell_state->acceleration);
  const double radius = std::max(
      midpoint - emission.lower(), emission.upper() - midpoint);
  const Interval displacement_from_midpoint(-radius, radius);
  // Taylor's theorem encloses the causal residual without losing the
  // cancellation F'(tau_c)=0 at the pinned fold.  The analytic circular
  // factory supplies the exact prefix position, velocity, and acceleration;
  // arbitrary cubic histories remain on the generic interval route.
  return residual_at_midpoint +
      residual_derivative * displacement_from_midpoint +
      Interval::point(0.5) * residual_curvature *
          interval_square(displacement_from_midpoint);
}

FiniteWidthIntegrand finite_width_integrand(
    const NativePairAccelerationRequest& request,
    const Interval& emission,
    const Interval& receiver_charge,
    const Interval& source_charge,
    const Interval& coupling,
    const Interval& causal_width,
    const Interval& core_scale) {
  const auto& root_certificate = *request.root_certificate;
  const Interval reception =
      Interval::decimal_token(root_certificate.reception_time);
  const auto analytic_receiver =
      request.use_correlated_self_chord &&
              analytic_pinned_fold_eligible(request)
          ? request.receiver_history->uniform_circular_analytic_state(reception)
          : std::nullopt;
  const IntervalVector receiver_position = analytic_receiver.has_value()
      ? analytic_receiver->position
      : request.receiver_history->position_hull(reception);
  const IntervalVector receiver_velocity = analytic_receiver.has_value()
      ? analytic_receiver->velocity
      : request.receiver_history->velocity_hull(reception);
  const auto analytic_state = analytic_pinned_fold_eligible(request)
      ? request.source_history->uniform_circular_analytic_state(emission)
      : std::nullopt;
  const IntervalVector source_position = analytic_state.has_value()
      ? analytic_state->position
      : request.source_history->position_hull(emission);
  const IntervalVector displacement = finite_width_displacement(
      request, reception, emission, receiver_position, source_position);
  const Interval separation = norm(displacement);
  const Interval radial_square =
      interval_square(separation) + interval_square(core_scale);
  const Interval radial_denominator =
      radial_square * interval_sqrt(radial_square);
  const IntervalVector kernel = divide(displacement, radial_denominator);
  const Interval field_speed =
      Interval::decimal_token(root_certificate.field_speed);
  Interval receiver_strength = Interval::point(0.0);
  if (separation.contains_zero()) {
    receiver_strength = Interval(
        0.0, (field_speed + norm(receiver_velocity)).upper());
  } else {
    const IntervalVector direction = divide(displacement, separation);
    receiver_strength = interval_absolute(
        field_speed - dot(direction, receiver_velocity));
  }
  const Interval delay = reception - emission;
  const Interval direct_residual = separation - field_speed * delay;
  const auto stable_residual =
      stable_circular_self_residual(request, reception, emission);
  const auto taylor_residual = analytic_circular_taylor_residual(
      request, emission, receiver_position, reception, field_speed);
  Interval residual = direct_residual;
  const auto analytic_residual = stable_residual.has_value()
      ? stable_residual : taylor_residual;
  if (analytic_residual.has_value()) {
    const auto intersection = residual.intersection(*analytic_residual);
    if (!intersection.has_value()) {
      throw AccelerationCertificationError(
          "analytic pinned-fold residual disagrees with direct enclosure");
    }
    residual = *intersection;
  }
  const Interval exponent =
      Interval::point(0.0) -
      interval_square(residual) /
          (Interval::point(2.0) * interval_square(causal_width));
  const Interval pi(
      3.1415926535897931,
      3.1415926535897936);
  const Interval normalizer =
      interval_sqrt(Interval::point(2.0) * pi) * causal_width;
  const Interval mollifier = interval_exp(exponent) / normalizer;
  return {
      .value = scale(
          coupling * receiver_charge * source_charge * receiver_strength *
              mollifier,
          kernel),
      .used_analytic_fold = analytic_residual.has_value(),
      .used_correlated_self_chord = uses_correlated_self_chord(
          request, reception, emission),
      .used_stable_circular_residual = stable_residual.has_value(),
  };
}

struct CenteredFiniteWidthIntegral {
  IntervalVector value;
  bool used_analytic_fold = false;
  bool used_correlated_self_chord = false;
  bool used_stable_circular_residual = false;
};

std::optional<CenteredFiniteWidthIntegral> centered_finite_width_integral(
    const NativePairAccelerationRequest& request,
    const Interval& emission,
    const Interval& receiver_charge,
    const Interval& source_charge,
    const Interval& coupling,
    const Interval& causal_width,
    const Interval& core_scale) {
  const auto source_state = analytic_pinned_fold_eligible(request)
      ? request.source_history->uniform_circular_analytic_state(emission)
      : std::nullopt;
  const double midpoint = emission.midpoint();
  const Interval midpoint_interval = Interval::point(midpoint);
  const auto& root_certificate = *request.root_certificate;
  const Interval reception =
      Interval::decimal_token(root_certificate.reception_time);
  const auto analytic_receiver =
      request.use_correlated_self_chord &&
              analytic_pinned_fold_eligible(request)
          ? request.receiver_history->uniform_circular_analytic_state(reception)
          : std::nullopt;
  const IntervalVector receiver_position = analytic_receiver.has_value()
      ? analytic_receiver->position
      : request.receiver_history->position_hull(reception);
  const IntervalVector receiver_velocity = analytic_receiver.has_value()
      ? analytic_receiver->velocity
      : request.receiver_history->velocity_hull(reception);
  const IntervalVector source_position = source_state.has_value()
      ? source_state->position
      : request.source_history->position_hull(emission);
  const IntervalVector source_velocity = source_state.has_value()
      ? source_state->velocity
      : request.source_history->velocity_hull(emission);
  const IntervalVector displacement = finite_width_displacement(
      request, reception, emission, receiver_position, source_position);
  const Interval separation = norm(displacement);
  if (separation.contains_zero()) {
    return std::nullopt;
  }
  const IntervalVector direction = divide(displacement, separation);
  const Interval field_speed =
      Interval::decimal_token(root_certificate.field_speed);
  const Interval source_radial_speed =
      dot(direction, source_velocity);
  const Interval residual_derivative =
      field_speed - source_radial_speed;

  const Interval zero = Interval::point(0.0);
  const Interval minus_one = Interval::point(-1.0);
  const IntervalVector displacement_derivative =
      scale(minus_one, source_velocity);
  const IntervalVector direction_derivative = divide(
      add(
          displacement_derivative,
          scale(source_radial_speed, direction)),
      separation);
  const Interval receiver_normal =
      field_speed - dot(direction, receiver_velocity);
  const Interval receiver_normal_derivative =
      zero - dot(direction_derivative, receiver_velocity);
  Interval receiver_strength_derivative = receiver_normal_derivative;
  if (receiver_normal.upper() < 0.0) {
    receiver_strength_derivative =
        zero - receiver_normal_derivative;
  } else if (receiver_normal.contains_zero()) {
    const double bound = std::max(
        std::abs(receiver_normal_derivative.lower()),
        std::abs(receiver_normal_derivative.upper()));
    receiver_strength_derivative = Interval(-bound, bound);
  }
  const Interval receiver_strength = interval_absolute(receiver_normal);

  const Interval radial_square =
      interval_square(separation) + interval_square(core_scale);
  const Interval radial_three_halves =
      radial_square * interval_sqrt(radial_square);
  const Interval radial_five_halves =
      interval_square(radial_square) * interval_sqrt(radial_square);
  const IntervalVector kernel =
      divide(displacement, radial_three_halves);
  const Interval displacement_dot_derivative =
      dot(displacement, displacement_derivative);
  const IntervalVector kernel_derivative = add(
      divide(displacement_derivative, radial_three_halves),
      scale(
          Interval::point(-3.0) * displacement_dot_derivative /
              radial_five_halves,
          displacement));

  const Interval delay = reception - emission;
  const Interval direct_residual =
      separation - field_speed * delay;
  const auto stable_residual =
      stable_circular_self_residual(request, reception, emission);
  const auto taylor_residual = analytic_circular_taylor_residual(
      request, emission, receiver_position, reception, field_speed);
  Interval residual = direct_residual;
  const auto analytic_residual = stable_residual.has_value()
      ? stable_residual : taylor_residual;
  if (analytic_residual.has_value()) {
    const auto intersection = residual.intersection(*analytic_residual);
    if (!intersection.has_value()) {
      throw AccelerationCertificationError(
          "analytic pinned-fold derivative residual disagrees with direct enclosure");
    }
    residual = *intersection;
  }
  const Interval exponent =
      zero - interval_square(residual) /
          (Interval::point(2.0) * interval_square(causal_width));
  const Interval pi(3.1415926535897931, 3.1415926535897936);
  const Interval normalizer =
      interval_sqrt(Interval::point(2.0) * pi) * causal_width;
  const Interval mollifier = interval_exp(exponent) / normalizer;
  const Interval mollifier_derivative =
      mollifier *
      (zero - residual * residual_derivative /
          interval_square(causal_width));
  const Interval signed_charge_scale =
      coupling * receiver_charge * source_charge;
  const IntervalVector derivative = scale(
      signed_charge_scale,
      add(
          add(
              scale(receiver_strength_derivative * mollifier, kernel),
              scale(receiver_strength * mollifier, kernel_derivative)),
          scale(
              receiver_strength * mollifier_derivative,
              kernel)));

  const IntervalVector midpoint_value = finite_width_integrand(
      request, midpoint_interval, receiver_charge, source_charge, coupling,
      causal_width, core_scale).value;
  const double width = emission.upper() - emission.lower();
  IntervalVector result = scale(Interval::point(width), midpoint_value);
  const double remainder_scale = width * width * 0.25;
  // For every component A of the unchanged finite-width master-equation
  // integrand,
  //   integral_I A = |I| A(mid(I)) + R,
  //   |R| <= sup_I |A'| integral_I |tau-mid(I)| d tau
  //        = sup_I |A'| |I|^2 / 4.
  // The derivative enclosure above therefore certifies the complete cell
  // integral while avoiding the O(|I|) dependency loss of a box product.
  for (std::size_t axis = 0; axis < 3; ++axis) {
    const double derivative_bound = std::max(
        std::abs(derivative[axis].lower()),
        std::abs(derivative[axis].upper()));
    result[axis] =
        result[axis].inflate(derivative_bound * remainder_scale);
  }
  return CenteredFiniteWidthIntegral{
      .value = result,
      .used_analytic_fold = analytic_residual.has_value(),
      .used_correlated_self_chord = uses_correlated_self_chord(
          request, reception, emission),
      .used_stable_circular_residual = stable_residual.has_value(),
  };
}

Interval finite_width_normal_cdf(
    const Interval& residual, const Interval& causal_width) {
  return Interval::point(0.5) *
      (Interval::point(1.0) +
       interval_erf(
           residual /
           (interval_sqrt(Interval::point(2.0)) * causal_width)));
}

std::optional<CenteredFiniteWidthIntegral>
monotone_finite_width_integral(
    const NativePairAccelerationRequest& request,
    const Interval& emission,
    const Interval& receiver_charge,
    const Interval& source_charge,
    const Interval& coupling,
    const Interval& causal_width,
    const Interval& core_scale) {
  const auto& certificate = *request.root_certificate;
  const Interval reception =
      Interval::decimal_token(certificate.reception_time);
  const auto analytic_receiver =
      request.use_correlated_self_chord &&
              analytic_pinned_fold_eligible(request)
          ? request.receiver_history->uniform_circular_analytic_state(reception)
          : std::nullopt;
  const IntervalVector receiver_position = analytic_receiver.has_value()
      ? analytic_receiver->position
      : request.receiver_history->position_hull(reception);
  const IntervalVector receiver_velocity = analytic_receiver.has_value()
      ? analytic_receiver->velocity
      : request.receiver_history->velocity_hull(reception);
  const auto analytic_source = analytic_pinned_fold_eligible(request)
      ? request.source_history->uniform_circular_analytic_state(emission)
      : std::nullopt;
  const IntervalVector source_position = analytic_source.has_value()
      ? analytic_source->position
      : request.source_history->position_hull(emission);
  const IntervalVector source_velocity = analytic_source.has_value()
      ? analytic_source->velocity
      : request.source_history->velocity_hull(emission);
  const IntervalVector displacement = finite_width_displacement(
      request, reception, emission, receiver_position, source_position);
  const Interval separation = norm(displacement);
  if (separation.contains_zero()) return std::nullopt;
  const IntervalVector direction = divide(displacement, separation);
  const Interval field_speed =
      Interval::decimal_token(certificate.field_speed);
  const Interval source_normal =
      field_speed - dot(direction, source_velocity);
  if (source_normal.contains_zero()) return std::nullopt;

  const auto endpoint_residual = [&](double time) {
    const Interval point = Interval::point(time);
    const auto analytic_point = analytic_pinned_fold_eligible(request)
        ? request.source_history->uniform_circular_analytic_state(point)
        : std::nullopt;
    const IntervalVector point_position = analytic_point.has_value()
        ? analytic_point->position
        : request.source_history->position_hull(point);
    const Interval direct =
        norm(finite_width_displacement(
            request, reception, point, receiver_position, point_position)) -
        field_speed * (reception - point);
    const auto stable =
        stable_circular_self_residual(request, reception, point);
    if (!stable.has_value()) return direct;
    const auto intersection = direct.intersection(*stable);
    if (!intersection.has_value()) {
      throw AccelerationCertificationError(
          "stable circular endpoint residual disagrees with direct enclosure");
    }
    return *intersection;
  };
  Interval first_residual = endpoint_residual(emission.lower());
  Interval second_residual = endpoint_residual(emission.upper());
  if (source_normal.upper() < 0.0) {
    std::swap(first_residual, second_residual);
  }
  const Interval raw_mass =
      finite_width_normal_cdf(second_residual, causal_width) -
      finite_width_normal_cdf(first_residual, causal_width);
  const Interval mass(
      std::max(0.0, raw_mass.lower()),
      std::max(0.0, raw_mass.upper()));
  const Interval mollifier_integral =
      mass / interval_absolute(source_normal);

  const Interval radial_square =
      interval_square(separation) + interval_square(core_scale);
  const Interval radial_three_halves =
      radial_square * interval_sqrt(radial_square);
  const IntervalVector kernel = divide(displacement, radial_three_halves);
  const Interval receiver_normal =
      field_speed - dot(direction, receiver_velocity);
  const Interval receiver_strength = interval_absolute(receiver_normal);
  const Interval signed_charge_scale =
      coupling * receiver_charge * source_charge;
  IntervalVector result = scale(
      signed_charge_scale * receiver_strength * mollifier_integral,
      kernel);

  const IntervalVector displacement_derivative =
      scale(Interval::point(-1.0), source_velocity);
  const IntervalVector direction_derivative = divide(
      add(displacement_derivative,
          scale(dot(direction, source_velocity), direction)),
      separation);
  const Interval receiver_normal_derivative =
      Interval::point(0.0) -
      dot(direction_derivative, receiver_velocity);
  Interval receiver_strength_derivative = receiver_normal_derivative;
  if (receiver_normal.upper() < 0.0) {
    receiver_strength_derivative =
        Interval::point(0.0) - receiver_normal_derivative;
  } else if (receiver_normal.contains_zero()) {
    const double bound = std::max(
        std::abs(receiver_normal_derivative.lower()),
        std::abs(receiver_normal_derivative.upper()));
    receiver_strength_derivative = Interval(-bound, bound);
  }
  const Interval radial_five_halves =
      interval_square(radial_square) * interval_sqrt(radial_square);
  const IntervalVector kernel_derivative = add(
      divide(displacement_derivative, radial_three_halves),
      scale(
          Interval::point(-3.0) *
              dot(displacement, displacement_derivative) /
              radial_five_halves,
          displacement));
  const IntervalVector prefactor_derivative = scale(
      signed_charge_scale,
      add(
          scale(receiver_strength_derivative, kernel),
          scale(receiver_strength, kernel_derivative)));

  const double midpoint = emission.midpoint();
  const Interval midpoint_emission = Interval::point(midpoint);
  const auto midpoint_analytic = analytic_pinned_fold_eligible(request)
      ? request.source_history->uniform_circular_analytic_state(
            midpoint_emission)
      : std::nullopt;
  const IntervalVector midpoint_source = midpoint_analytic.has_value()
      ? midpoint_analytic->position
      : request.source_history->position_hull(midpoint_emission);
  const IntervalVector midpoint_displacement = finite_width_displacement(
      request, reception, midpoint_emission, receiver_position,
      midpoint_source);
  const Interval midpoint_separation = norm(midpoint_displacement);
  if (!midpoint_separation.contains_zero()) {
    const IntervalVector midpoint_direction =
        divide(midpoint_displacement, midpoint_separation);
    const Interval midpoint_radial_square =
        interval_square(midpoint_separation) + interval_square(core_scale);
    const IntervalVector midpoint_kernel = divide(
        midpoint_displacement,
        midpoint_radial_square * interval_sqrt(midpoint_radial_square));
    const Interval midpoint_strength = interval_absolute(
        field_speed - dot(midpoint_direction, receiver_velocity));
    IntervalVector centered = scale(
        signed_charge_scale * midpoint_strength * mollifier_integral,
        midpoint_kernel);
    const double remainder_scale =
        0.5 * emission.width() * mollifier_integral.upper();
    for (std::size_t axis = 0; axis < 3; ++axis) {
      const double derivative_bound = std::max(
          std::abs(prefactor_derivative[axis].lower()),
          std::abs(prefactor_derivative[axis].upper()));
      centered[axis] =
          centered[axis].inflate(derivative_bound * remainder_scale);
      const auto intersection = result[axis].intersection(centered[axis]);
      if (!intersection.has_value()) {
        throw AccelerationCertificationError(
            "finite-width residual and prefactor enclosures disagree");
      }
      result[axis] = *intersection;
    }
  }
  return CenteredFiniteWidthIntegral{
      .value = result,
      .used_analytic_fold = analytic_source.has_value(),
      .used_correlated_self_chord = uses_correlated_self_chord(
          request, reception, emission),
      .used_stable_circular_residual =
          stable_circular_self_residual(request, reception, emission)
              .has_value(),
  };
}

struct FiniteWidthAttempt {
  IntervalVector acceleration{
      Interval::point(0.0), Interval::point(0.0), Interval::point(0.0)};
  std::size_t visited_cells = 0;
  std::size_t analytic_fold_visited_cells = 0;
  std::size_t correlated_self_chord_visited_cells = 0;
  std::size_t stable_circular_residual_visited_cells = 0;
  std::size_t centered_cells = 0;
  std::size_t monotone_cells = 0;
  std::size_t direct_cells = 0;
  double last_total_width = 0.0;
  double last_largest_cell_width = 0.0;
};

void require_finite_width_boundary_clearance(
    const NativePairAccelerationRequest& request) {
  const auto& certificate = *request.root_certificate;
  if (certificate.memory_boundary_contact) {
    throw AccelerationCertificationError(
        "finite-width chart has a causal root at the memory boundary");
  }
  const Interval lower = Interval::decimal_token(certificate.searched_lower);
  const Interval reception =
      Interval::decimal_token(certificate.reception_time);
  const Interval lower_point = Interval::point(lower.midpoint());
  const IntervalVector receiver_position =
      request.receiver_history->position_hull(reception);
  const IntervalVector source_boundary =
      request.source_history->position_hull(lower_point);
  const Interval boundary_residual =
      norm(subtract(receiver_position, source_boundary)) -
      Interval::decimal_token(certificate.field_speed) *
          (reception - lower_point);
  if (boundary_residual.contains_zero()) {
    throw AccelerationCertificationError(
        "finite-width memory-boundary clearance is not certified");
  }
}

FiniteWidthAttempt reconstruct_finite_width(
    const NativePairAccelerationRequest& request,
    const Interval& receiver_charge,
    const Interval& source_charge,
    const Interval& coupling,
    const Interval& causal_width,
    const Interval& core_scale,
    const Interval& quadrature_tolerance) {
  const auto& certificate = *request.root_certificate;
  const Interval lower = Interval::decimal_token(certificate.searched_lower);
  const Interval reception =
      Interval::decimal_token(certificate.reception_time);
  const double lower_value = lower.midpoint();
  const double reception_value = reception.midpoint();
  const double total_span = reception_value - lower_value;
  if (!(total_span > 0.0)) {
    throw AccelerationCertificationError(
        "finite-width integration requires a positive retained interval");
  }

  struct Cell {
    double lower;
    double upper;
    std::size_t segment_group;
    std::size_t depth;
    std::size_t id;
    IntervalVector integral;

    [[nodiscard]] double score() const {
      return std::max(
          {integral[0].width(), integral[1].width(), integral[2].width()});
    }
  };
  struct CellOrder {
    bool operator()(const Cell& left, const Cell& right) const {
      if (left.score() != right.score()) {
        return left.score() < right.score();
      }
      return left.id < right.id;
    }
  };

  FiniteWidthAttempt attempt;
  DeterministicParallelExecutor quadrature_executor(
      request.quadrature_thread_count);
  std::size_t next_id = 0U;
  const auto require_cell_budget = [&]() {
    ++attempt.visited_cells;
    if (attempt.visited_cells > request.quadrature_max_cells) {
      throw AccelerationCertificationError(
          "finite-width quadrature cell limit exhausted;centered=" +
          std::to_string(attempt.centered_cells) + ";monotone=" +
          std::to_string(attempt.monotone_cells) + ";direct=" +
          std::to_string(attempt.direct_cells) + ";total_width=" +
          std::to_string(attempt.last_total_width) +
          ";largest_cell_width=" +
          std::to_string(attempt.last_largest_cell_width));
    }
  };
  const auto assemble_cell = [&] (
      double cell_lower, double cell_upper,
      std::size_t segment_group, std::size_t depth, std::size_t id,
      const std::optional<CenteredFiniteWidthIntegral>& centered_integral,
      const std::optional<CenteredFiniteWidthIntegral>& monotone_integral) {
    const Interval cell(cell_lower, cell_upper);
    const auto integrand = centered_integral.has_value()
        ? FiniteWidthIntegrand{
              .value = centered_integral->value,
              .used_analytic_fold = centered_integral->used_analytic_fold,
              .used_correlated_self_chord =
                  centered_integral->used_correlated_self_chord,
              .used_stable_circular_residual =
                  centered_integral->used_stable_circular_residual,
          }
        : finite_width_integrand(
              request, cell, receiver_charge, source_charge, coupling,
              causal_width, core_scale);
    if (integrand.used_analytic_fold) {
      ++attempt.analytic_fold_visited_cells;
    }
    if (integrand.used_correlated_self_chord) {
      ++attempt.correlated_self_chord_visited_cells;
    }
    if (integrand.used_stable_circular_residual) {
      ++attempt.stable_circular_residual_visited_cells;
    }
    if (centered_integral.has_value()) {
      ++attempt.centered_cells;
    } else {
      ++attempt.direct_cells;
    }
    if (monotone_integral.has_value()) {
      ++attempt.monotone_cells;
    }
    IntervalVector cell_integral = centered_integral.has_value()
        ? integrand.value
        : scale(
              Interval::point(cell_upper - cell_lower),
              integrand.value);
    if (monotone_integral.has_value()) {
      for (std::size_t axis = 0; axis < 3; ++axis) {
        const auto intersection =
            cell_integral[axis].intersection(monotone_integral->value[axis]);
        if (!intersection.has_value()) {
          throw AccelerationCertificationError(
              "finite-width monotone and direct enclosures disagree");
        }
        cell_integral[axis] = *intersection;
      }
    }
    return Cell{
        .lower = cell_lower,
        .upper = cell_upper,
        .segment_group = segment_group,
        .depth = depth,
        .id = id,
        .integral = cell_integral,
    };
  };
  const auto make_cell = [&](double cell_lower, double cell_upper,
                             std::size_t segment_group,
                             std::size_t depth, std::size_t id) {
    require_cell_budget();
    const Interval cell(cell_lower, cell_upper);
    const auto centered_integral = centered_finite_width_integral(
        request, cell, receiver_charge, source_charge, coupling,
        causal_width, core_scale);
    const auto monotone_integral = monotone_finite_width_integral(
        request, cell, receiver_charge, source_charge, coupling,
        causal_width, core_scale);
    return assemble_cell(
        cell_lower, cell_upper, segment_group, depth, id,
        centered_integral, monotone_integral);
  };

  std::multiset<Cell, CellOrder> cells;
  std::vector<IntervalVector> segment_group_enclosures;
  for (std::size_t index = 0;
       index < request.source_history->segments().size(); ++index) {
    const auto& segment = request.source_history->segments()[index];
    const double cell_lower = std::max(lower_value, segment.t_start());
    const double cell_upper = std::min(reception_value, segment.t_end());
    if (cell_lower < cell_upper) {
      const std::size_t segment_group = segment_group_enclosures.size();
      auto cell = make_cell(
          cell_lower, cell_upper, segment_group, 0U, next_id++);
      segment_group_enclosures.push_back(cell.integral);
      cells.insert(std::move(cell));
    }
  }
  if (cells.empty()) {
    throw AccelerationCertificationError(
        "finite-width integration has no covered source cells");
  }

  while (true) {
    std::vector<const Cell*> chronological;
    chronological.reserve(cells.size());
    for (const auto& cell : cells) {
      chronological.push_back(&cell);
    }
    std::sort(
        chronological.begin(), chronological.end(),
        [](const Cell* left, const Cell* right) {
          return left->lower < right->lower ||
              (left->lower == right->lower && left->id < right->id);
        });
    std::vector<std::vector<IntervalVector>> grouped(
        segment_group_enclosures.size());
    for (const Cell* cell : chronological) {
      grouped[cell->segment_group].push_back(cell->integral);
    }
    std::vector<IntervalVector> totals;
    totals.reserve(grouped.size());
    for (std::size_t group = 0; group < grouped.size(); ++group) {
      IntervalVector refined = fixed_pairwise_sum(grouped[group]);
      for (std::size_t axis = 0; axis < 3; ++axis) {
        const auto intersection = refined[axis].intersection(
            segment_group_enclosures[group][axis]);
        if (!intersection.has_value()) {
          throw AccelerationCertificationError(
              "finite-width child and retained-segment enclosures disagree");
        }
        refined[axis] = *intersection;
      }
      totals.push_back(refined);
    }
    attempt.acceleration = fixed_pairwise_sum(totals);
    attempt.last_total_width = std::max(
        {attempt.acceleration[0].width(), attempt.acceleration[1].width(),
         attempt.acceleration[2].width()});
    attempt.last_largest_cell_width = cells.rbegin()->score();
    if (std::all_of(
            attempt.acceleration.begin(), attempt.acceleration.end(),
            [&](const Interval& component) {
              return component.width() <= quadrature_tolerance.lower();
            })) {
      return attempt;
    }

    const std::size_t splits_before_reduction =
        std::max<std::size_t>(64U, cells.size() / 16U);
    for (std::size_t split = 0; split < splits_before_reduction; ++split) {
      if (cells.empty()) {
        throw AccelerationCertificationError(
            "finite-width integration lost its active cells");
      }
      const auto found = std::prev(cells.end());
      const Cell parent = *found;
      cells.erase(found);
      if (parent.depth >= request.quadrature_max_depth) {
        throw AccelerationCertificationError(
            "finite-width quadrature depth exhausted");
      }
      const double midpoint =
          parent.lower + (parent.upper - parent.lower) * 0.5;
      if (!(midpoint > parent.lower && midpoint < parent.upper)) {
        throw AccelerationCertificationError(
            "finite-width quadrature time resolution exhausted");
      }
      struct ChildSpec {
        double lower;
        double upper;
        std::size_t id;
      };
      const std::array<ChildSpec, 2> children{{
          {parent.lower, midpoint, next_id++},
          {midpoint, parent.upper, next_id++},
      }};
      require_cell_budget();
      require_cell_budget();
      std::array<std::optional<CenteredFiniteWidthIntegral>, 2>
          centered_integrals;
      std::array<std::optional<CenteredFiniteWidthIntegral>, 2>
          monotone_integrals;
      std::array<std::exception_ptr, 4> failures{};
      quadrature_executor.run(4U, [&](std::size_t task_index) {
        const std::size_t child_index = task_index / 2U;
        const Interval child(
            children[child_index].lower, children[child_index].upper);
        try {
          if (task_index % 2U == 0U) {
            centered_integrals[child_index] = centered_finite_width_integral(
                request, child, receiver_charge, source_charge, coupling,
                causal_width, core_scale);
          } else {
            monotone_integrals[child_index] = monotone_finite_width_integral(
                request, child, receiver_charge, source_charge, coupling,
                causal_width, core_scale);
          }
        } catch (...) {
          failures[task_index] = std::current_exception();
        }
      });
      for (const auto& failure : failures) {
        if (failure != nullptr) {
          std::rethrow_exception(failure);
        }
      }
      for (std::size_t child_index = 0; child_index < children.size();
           ++child_index) {
        cells.insert(assemble_cell(
            children[child_index].lower, children[child_index].upper,
            parent.segment_group, parent.depth + 1U,
            children[child_index].id, centered_integrals[child_index],
            monotone_integrals[child_index]));
      }
    }
  }
}

void validate_pair_request(const NativePairAccelerationRequest& request) {
  if (request.row_id.empty() || request.receiver_path_id.empty() ||
      request.source_path_id.empty() || request.receiver_history == nullptr ||
      request.source_history == nullptr || request.root_certificate == nullptr) {
    throw std::invalid_argument(
        "pair acceleration request requires row, path, history, and root identities");
  }
  if (request.chart != "sharp" && request.chart != "finite_width" &&
      request.chart != "far_field_enclosure") {
    throw std::invalid_argument(
        "pair acceleration chart must be sharp, finite_width, or "
        "far_field_enclosure");
  }
  if (request.chart == "far_field_enclosure" &&
      request.far_field_enclosure == nullptr) {
    throw std::invalid_argument(
        "far-field acceleration requires an enclosure certificate");
  }
  if (request.initial_mpfr_bits < 64U ||
      request.maximum_mpfr_bits < request.initial_mpfr_bits) {
    throw std::invalid_argument("invalid acceleration MPFR precision ladder");
  }
  if (request.quadrature_thread_count == 0U) {
    throw std::invalid_argument(
        "finite-width quadrature requires at least one thread");
  }
}

NativePairAccelerationCertificate uncertified_pair(
    const NativePairAccelerationRequest& request,
    const std::string& failure_code,
    std::size_t quadrature_visited_cells,
    std::size_t analytic_fold_visited_cells,
    std::size_t correlated_self_chord_visited_cells,
    std::size_t stable_circular_residual_visited_cells,
    bool acceleration_precision_escalated,
    unsigned achieved_acceleration_precision_bits,
    double pair_wall_seconds,
    double finite_width_wall_seconds,
    double precision_escalation_wall_seconds,
    std::size_t precision_escalation_attempt_count) {
  return {
      .schema = "eom_native_pair_acceleration_certificate/v0",
      .row_id = request.row_id,
      .receiver_path_id = request.receiver_path_id,
      .source_path_id = request.source_path_id,
      .chart = request.chart,
      .status = "uncertified",
      .failure_code = failure_code,
      .root_certificate_row_id = request.root_certificate->row_id,
      .reduction_policy = kDeterministicReductionPolicy,
      .quadrature_visited_cells = quadrature_visited_cells,
      .analytic_fold_visited_cells = analytic_fold_visited_cells,
      .correlated_self_chord_visited_cells =
          correlated_self_chord_visited_cells,
      .stable_circular_residual_visited_cells =
          stable_circular_residual_visited_cells,
      .acceleration_precision_escalated = acceleration_precision_escalated,
      .achieved_acceleration_precision_bits =
          achieved_acceleration_precision_bits,
      .pair_wall_seconds = pair_wall_seconds,
      .finite_width_wall_seconds = finite_width_wall_seconds,
      .precision_escalation_wall_seconds =
          precision_escalation_wall_seconds,
      .precision_escalation_attempt_count =
          precision_escalation_attempt_count,
      .reconstruction_matches = false,
      .rows = {},
      .total_acceleration = std::nullopt,
  };
}

}  // namespace

NativePairAccelerationCertificate certify_pair_acceleration(
    const NativePairAccelerationRequest& request) {
  const auto pair_timing_start = SteadyClock::now();
  validate_pair_request(request);
  const auto& root_certificate = *request.root_certificate;
  std::size_t quadrature_visited_cells = 0;
  std::size_t analytic_fold_visited_cells = 0;
  std::size_t correlated_self_chord_visited_cells = 0;
  std::size_t stable_circular_residual_visited_cells = 0;
  bool acceleration_precision_escalated = false;
  unsigned achieved_acceleration_precision_bits = 53;
  double finite_width_wall_seconds = 0.0;
  double precision_escalation_wall_seconds = 0.0;
  std::size_t precision_escalation_attempt_count = 0U;
  try {
    const bool far_field_chart = request.chart == "far_field_enclosure";
    if ((!far_field_chart &&
         root_certificate.schema != "eom_native_exact_pair_certificate/v0") ||
        (far_field_chart &&
         root_certificate.schema != "eom_native_enclosed_pair_marker/v0")) {
      throw AccelerationCertificationError("unsupported root certificate schema");
    }
    if (root_certificate.receiver_history_id !=
            request.receiver_history->history_id() ||
        root_certificate.source_history_id !=
            request.source_history->history_id()) {
      throw AccelerationCertificationError("root certificate history identity mismatch");
    }
    if (root_certificate.receiver_history_fingerprint !=
            request.receiver_history->provenance_fingerprint() ||
        root_certificate.source_history_fingerprint !=
            request.source_history->provenance_fingerprint()) {
      throw AccelerationCertificationError(
          "root certificate retained-history provenance mismatch");
    }
    const Interval reception =
        Interval::decimal_token(root_certificate.reception_time);
    const Interval searched_upper =
        Interval::decimal_token(root_certificate.searched_upper);
    if (!same_interval(reception, searched_upper)) {
      throw AccelerationCertificationError(
          "acceleration requires root coverage through reception time");
    }
    const Interval receiver_charge =
        Interval::decimal_token(request.receiver_charge);
    const Interval source_charge =
        Interval::decimal_token(request.source_charge);
    const Interval coupling = Interval::decimal_token(request.coupling);
    const Interval source_normal_floor =
        Interval::decimal_token(request.source_normal_floor);
    const Interval causal_width =
        Interval::decimal_token(request.causal_width);
    const Interval core_scale =
        Interval::decimal_token(request.core_scale);
    const Interval acceleration_tolerance =
        Interval::decimal_token(request.acceleration_tolerance);
    const Interval quadrature_tolerance =
        Interval::decimal_token(request.quadrature_tolerance);
    require_nonzero_charge(receiver_charge, "receiver charge");
    require_nonzero_charge(source_charge, "source charge");
    require_positive(coupling, "coupling");
    require_positive(source_normal_floor, "transmitter-side factor floor");
    require_positive(causal_width, "causal width");
    require_positive(core_scale, "core scale");
    require_positive(acceleration_tolerance, "acceleration tolerance");
    require_positive(quadrature_tolerance, "quadrature tolerance");

    std::vector<NativeAccelerationRow> rows;
    std::vector<IntervalVector> contributions;
    if (request.chart == "far_field_enclosure") {
      const auto& enclosure = *request.far_field_enclosure;
      if (enclosure.schema != "eom_native_far_field_enclosure_certificate/v0" ||
          enclosure.status != "certified_enclosed" ||
          !enclosure.acceleration.has_value() ||
          !enclosure.pair_width_budget.has_value() ||
          enclosure.receiver_path_id != request.receiver_path_id ||
          enclosure.source_path_id != request.source_path_id ||
          enclosure.receiver_history_id !=
              request.receiver_history->history_id() ||
          enclosure.source_history_id != request.source_history->history_id() ||
          enclosure.receiver_history_fingerprint !=
              request.receiver_history->provenance_fingerprint() ||
          enclosure.source_history_fingerprint !=
              request.source_history->provenance_fingerprint()) {
        throw AccelerationCertificationError(
            "far-field enclosure identity or provenance mismatch");
      }
      if (!same_interval(
              Interval::decimal_token(enclosure.reception_time), reception) ||
          !same_interval(
              Interval::decimal_token(enclosure.emission_upper), reception)) {
        throw AccelerationCertificationError(
            "far-field enclosure does not cover the reception time");
      }
      for (const auto& component : *enclosure.acceleration) {
        if (component.width() > enclosure.pair_width_budget->lower()) {
          throw AccelerationCertificationError(
              "far-field enclosure exceeds its pair budget slice");
        }
      }
      NativeAccelerationRow row{
          .row_id = request.row_id + "/far-field-enclosure",
          .receiver_path_id = request.receiver_path_id,
          .source_path_id = request.source_path_id,
          .row_index = 0,
          .chart = "far_field_enclosure",
          .reception_time = root_certificate.reception_time,
          .emission_lower = enclosure.emission_lower,
          .emission_upper = enclosure.emission_upper,
          .source_segment_indices = {},
          .separation = enclosure.separation,
          .source_normal = enclosure.source_normal_lower_bound,
          .receiver_normal = std::nullopt,
          .branch_orientation = std::nullopt,
          .receiver_strength = std::nullopt,
          .polarity = charge_polarity(receiver_charge, source_charge),
          .charge_product_magnitude =
              interval_absolute(receiver_charge * source_charge),
          .coupling = coupling,
          .accumulation_group = request.receiver_path_id,
          .acceptance_status = "consumed_certified_far_field_enclosure",
          .root_precision_route = "root_search_bypassed_by_enclosure",
          .root_precision_bits = 53,
          .acceleration_precision_route = "binary64_outward_far_field_bound",
          .acceleration_precision_bits = 53,
          .acceleration = *enclosure.acceleration,
      };
      contributions.push_back(row.acceleration);
      rows.push_back(std::move(row));
    } else if (request.chart == "sharp") {
      if (root_certificate.status != "certified_complete" ||
          !root_certificate.root_free_complement ||
          root_certificate.memory_boundary_contact) {
        throw AccelerationCertificationError(
            "sharp acceleration requires a complete interior root certificate");
      }
      rows.reserve(root_certificate.roots.size());
      contributions.reserve(root_certificate.roots.size());
      for (std::size_t index = 0; index < root_certificate.roots.size(); ++index) {
        auto row = reconstruct_row(
            request, root_certificate.roots[index], index, receiver_charge,
            source_charge, coupling, source_normal_floor);
        contributions.push_back(row.acceleration);
        rows.push_back(std::move(row));
      }
    } else {
      require_finite_width_boundary_clearance(request);
      IntervalVector finite_acceleration{
          Interval::point(0.0), Interval::point(0.0), Interval::point(0.0)};
      std::string acceleration_precision_route =
          "binary64_outward_quadrature";
      bool binary_certified = false;
      std::string binary_failure;
      if (!request.force_precision_escalation) {
        const auto finite_width_timing_start = SteadyClock::now();
        try {
          const auto attempt = reconstruct_finite_width(
              request, receiver_charge, source_charge, coupling, causal_width,
              core_scale, quadrature_tolerance);
          finite_acceleration = attempt.acceleration;
          quadrature_visited_cells = attempt.visited_cells;
          analytic_fold_visited_cells =
              attempt.analytic_fold_visited_cells;
          correlated_self_chord_visited_cells =
              attempt.correlated_self_chord_visited_cells;
          stable_circular_residual_visited_cells =
              attempt.stable_circular_residual_visited_cells;
          if (analytic_fold_visited_cells > 0U) {
            acceleration_precision_route =
                "binary64_outward_analytic_pinned_fold_quadrature";
          }
          binary_certified = true;
        } catch (const AccelerationCertificationError& error) {
          binary_failure = error.what();
        }
        finite_width_wall_seconds +=
            wall_seconds_since(finite_width_timing_start);
      }
      if (!binary_certified) {
        acceleration_precision_escalated = true;
        std::string mpfr_failure = binary_failure;
        unsigned bits = request.initial_mpfr_bits;
        while (true) {
          const auto escalation_timing_start = SteadyClock::now();
          const auto attempt =
              certify_mpfr_finite_width_acceleration(request, bits);
          const double escalation_seconds =
              wall_seconds_since(escalation_timing_start);
          finite_width_wall_seconds += escalation_seconds;
          precision_escalation_wall_seconds += escalation_seconds;
          ++precision_escalation_attempt_count;
          quadrature_visited_cells = attempt.visited_cells;
          achieved_acceleration_precision_bits = bits;
          if (attempt.certified) {
            finite_acceleration = attempt.acceleration;
            acceleration_precision_route = "mpfr_directed_interval_quadrature";
            binary_certified = true;
            break;
          }
          mpfr_failure = attempt.failure_code;
          if (bits >= request.maximum_mpfr_bits) {
            break;
          }
          bits = std::min(request.maximum_mpfr_bits, bits * 2U);
        }
        if (!binary_certified) {
          if (!binary_failure.empty() && mpfr_failure != binary_failure) {
            mpfr_failure += ";binary64=" + binary_failure;
          }
          throw AccelerationCertificationError(
              mpfr_failure.empty()
                  ? "numeric acceleration precision limit exhausted"
                  : mpfr_failure);
        }
      }
      std::vector<std::size_t> source_segment_indices;
      for (std::size_t index = 0;
           index < request.source_history->segments().size(); ++index) {
        const auto& segment = request.source_history->segments()[index];
        if (segment.t_end() >
                Interval::decimal_token(root_certificate.searched_lower).midpoint() &&
            segment.t_start() < reception.midpoint()) {
          source_segment_indices.push_back(index);
        }
      }
      NativeAccelerationRow row{
          .row_id = request.row_id + "/finite-width",
          .receiver_path_id = request.receiver_path_id,
          .source_path_id = request.source_path_id,
          .row_index = 0,
          .chart = "finite_width_pair",
          .reception_time = root_certificate.reception_time,
          .emission_lower = root_certificate.searched_lower,
          .emission_upper = root_certificate.reception_time,
          .source_segment_indices = std::move(source_segment_indices),
          .separation = std::nullopt,
          .source_normal = std::nullopt,
          .receiver_normal = std::nullopt,
          .branch_orientation = std::nullopt,
          .receiver_strength = std::nullopt,
          .polarity = charge_polarity(receiver_charge, source_charge),
          .charge_product_magnitude =
              interval_absolute(receiver_charge * source_charge),
          .coupling = coupling,
          .accumulation_group = request.receiver_path_id,
          .acceptance_status = "consumed_certified_finite_width_pair",
          .root_precision_route = root_certificate.precision_escalated
              ? "mpfr_directed_interval"
              : "binary64_outward",
          .root_precision_bits = root_certificate.achieved_precision_bits,
          .acceleration_precision_route = acceleration_precision_route,
          .acceleration_precision_bits =
              achieved_acceleration_precision_bits,
          .acceleration = finite_acceleration,
      };
      contributions.push_back(row.acceleration);
      rows.push_back(std::move(row));
    }
    const IntervalVector total = fixed_pairwise_sum(contributions);
    for (const auto& component : total) {
      if (component.width() > acceleration_tolerance.lower()) {
        throw AccelerationCertificationError(
          request.chart +
          " acceleration enclosure exceeds the declared tolerance");
      }
    }
    std::vector<IntervalVector> replay;
    replay.reserve(rows.size());
    for (const auto& row : rows) {
      replay.push_back(row.acceleration);
    }
    const bool reconstruction_matches =
        same_vector(total, fixed_pairwise_sum(replay));
    if (!reconstruction_matches) {
      throw AccelerationCertificationError(
          "emitted acceleration rows do not reconstruct the pair total");
    }
    return {
        .schema = "eom_native_pair_acceleration_certificate/v0",
        .row_id = request.row_id,
        .receiver_path_id = request.receiver_path_id,
        .source_path_id = request.source_path_id,
        .chart = request.chart,
        .status = rows.empty() ? "inactive" : "active",
        .failure_code = "",
        .root_certificate_row_id = root_certificate.row_id,
      .reduction_policy = kDeterministicReductionPolicy,
      .quadrature_visited_cells = quadrature_visited_cells,
      .analytic_fold_visited_cells = analytic_fold_visited_cells,
      .correlated_self_chord_visited_cells =
          correlated_self_chord_visited_cells,
      .stable_circular_residual_visited_cells =
          stable_circular_residual_visited_cells,
        .acceleration_precision_escalated = acceleration_precision_escalated,
        .achieved_acceleration_precision_bits =
            achieved_acceleration_precision_bits,
        .pair_wall_seconds = wall_seconds_since(pair_timing_start),
        .finite_width_wall_seconds = finite_width_wall_seconds,
        .precision_escalation_wall_seconds =
            precision_escalation_wall_seconds,
        .precision_escalation_attempt_count =
            precision_escalation_attempt_count,
        .reconstruction_matches = true,
        .rows = std::move(rows),
        .total_acceleration = total,
    };
  } catch (const AccelerationCertificationError& error) {
    return uncertified_pair(
        request, error.what(), quadrature_visited_cells,
        analytic_fold_visited_cells,
        correlated_self_chord_visited_cells,
        stable_circular_residual_visited_cells,
        acceleration_precision_escalated,
        achieved_acceleration_precision_bits,
        wall_seconds_since(pair_timing_start), finite_width_wall_seconds,
        precision_escalation_wall_seconds,
        precision_escalation_attempt_count);
  } catch (const std::runtime_error& error) {
    return uncertified_pair(
        request, error.what(), quadrature_visited_cells,
        analytic_fold_visited_cells,
        correlated_self_chord_visited_cells,
        stable_circular_residual_visited_cells,
        acceleration_precision_escalated,
        achieved_acceleration_precision_bits,
        wall_seconds_since(pair_timing_start), finite_width_wall_seconds,
        precision_escalation_wall_seconds,
        precision_escalation_attempt_count);
  }
}

NativeAccelerationReconstructionCertificate certify_acceleration_reconstruction(
    const std::vector<std::string>& path_ids,
    const std::vector<NativePairAccelerationRequest>& pair_requests,
    std::size_t thread_count) {
  if (path_ids.empty() || thread_count == 0U) {
    throw std::invalid_argument(
        "acceleration reconstruction requires paths and at least one thread");
  }
  std::set<std::string> unique_paths;
  for (const auto& path_id : path_ids) {
    if (path_id.empty() || !unique_paths.insert(path_id).second) {
      throw std::invalid_argument(
          "acceleration reconstruction path identities must be nonempty and unique");
    }
  }
  if (path_ids.size() >
      std::numeric_limits<std::size_t>::max() / path_ids.size()) {
    throw std::overflow_error("ordered-pair matrix size overflows size_t");
  }
  const std::size_t expected_count = path_ids.size() * path_ids.size();
  std::map<std::pair<std::string, std::string>, std::size_t> request_indices;
  for (std::size_t index = 0; index < pair_requests.size(); ++index) {
    validate_pair_request(pair_requests[index]);
    const auto key = std::make_pair(
        pair_requests[index].receiver_path_id,
        pair_requests[index].source_path_id);
    if (!request_indices.emplace(key, index).second) {
      throw std::invalid_argument("duplicate ordered-pair acceleration request");
    }
  }
  if (request_indices.size() != expected_count) {
    throw std::invalid_argument("ordered-pair acceleration domain is incomplete");
  }

  std::vector<NativePairAccelerationRequest> canonical_requests;
  canonical_requests.reserve(expected_count);
  for (const auto& receiver : path_ids) {
    for (const auto& source : path_ids) {
      const auto found = request_indices.find({receiver, source});
      if (found == request_indices.end()) {
        throw std::invalid_argument("ordered-pair acceleration domain is incomplete");
      }
      canonical_requests.push_back(pair_requests[found->second]);
    }
  }
  const std::size_t finite_width_request_count = static_cast<std::size_t>(
      std::count_if(
          canonical_requests.begin(), canonical_requests.end(),
          [](const auto& request) { return request.chart == "finite_width"; }));
  const std::size_t finite_width_threads = finite_width_request_count == 0U
      ? 1U
      : std::max<std::size_t>(
            1U, std::min<std::size_t>(
                    4U, thread_count / finite_width_request_count));
  for (auto& request : canonical_requests) {
    if (request.chart == "finite_width") {
      request.quadrature_thread_count = finite_width_threads;
    }
  }

  std::map<std::string, const RetainedHistory*> path_histories;
  std::map<std::string, Interval> path_charges;
  std::map<std::string, Interval> receiver_times;
  std::optional<Interval> run_coupling;
  std::optional<Interval> run_field_speed;
  for (const auto& request : canonical_requests) {
    const Interval coupling = Interval::decimal_token(request.coupling);
    const Interval field_speed =
        Interval::decimal_token(request.root_certificate->field_speed);
    if (run_coupling.has_value() && !same_interval(*run_coupling, coupling)) {
      throw std::invalid_argument("all-pair reconstruction requires one coupling");
    }
    if (run_field_speed.has_value() &&
        !same_interval(*run_field_speed, field_speed)) {
      throw std::invalid_argument("all-pair reconstruction requires one field speed");
    }
    run_coupling = coupling;
    run_field_speed = field_speed;
    const Interval reception =
        Interval::decimal_token(request.root_certificate->reception_time);
    const auto prior_time = receiver_times.find(request.receiver_path_id);
    if (prior_time != receiver_times.end() &&
        !same_interval(prior_time->second, reception)) {
      throw std::invalid_argument(
          "each receiver requires one acceleration reception time");
    }
    receiver_times.insert_or_assign(request.receiver_path_id, reception);
    for (const auto& [path_id, history, charge_token] : {
             std::tuple<std::string, const RetainedHistory*, std::string>{
                 request.receiver_path_id, request.receiver_history,
                 request.receiver_charge},
             std::tuple<std::string, const RetainedHistory*, std::string>{
                 request.source_path_id, request.source_history,
                 request.source_charge}}) {
      const auto prior_history = path_histories.find(path_id);
      if (prior_history != path_histories.end() &&
          prior_history->second != history) {
        throw std::invalid_argument(
            "path has inconsistent retained-history inputs");
      }
      path_histories.insert_or_assign(path_id, history);
      const Interval charge = Interval::decimal_token(charge_token);
      const auto prior_charge = path_charges.find(path_id);
      if (prior_charge != path_charges.end() &&
          !same_interval(prior_charge->second, charge)) {
        throw std::invalid_argument("path has inconsistent charge inputs");
      }
      path_charges.insert_or_assign(path_id, charge);
    }
  }

  std::vector<NativePairAccelerationCertificate> pair_certificates(
      canonical_requests.size());
  struct PairExecutionWindow {
    SteadyClock::time_point start;
    SteadyClock::time_point end;
    bool finite_width = false;
  };
  std::vector<PairExecutionWindow> execution_windows(
      canonical_requests.size());
  const std::size_t worker_count =
      std::min(thread_count, canonical_requests.size());
  std::atomic<std::size_t> next_index{0};
  std::exception_ptr failure;
  std::mutex failure_mutex;
  std::vector<std::thread> workers;
  workers.reserve(worker_count);
  const auto pair_batch_timing_start = SteadyClock::now();
  for (std::size_t worker = 0; worker < worker_count; ++worker) {
    workers.emplace_back([&]() {
      try {
        while (true) {
          const std::size_t index = next_index.fetch_add(1U);
          if (index >= canonical_requests.size()) {
            return;
          }
          execution_windows[index].start = SteadyClock::now();
          execution_windows[index].finite_width =
              canonical_requests[index].chart == "finite_width";
          pair_certificates[index] =
              certify_pair_acceleration(canonical_requests[index]);
          execution_windows[index].end = SteadyClock::now();
        }
      } catch (...) {
        std::lock_guard<std::mutex> lock(failure_mutex);
        if (failure == nullptr) {
          failure = std::current_exception();
        }
      }
    });
  }
  for (auto& worker : workers) {
    worker.join();
  }
  if (failure != nullptr) {
    std::rethrow_exception(failure);
  }
  const double pair_batch_wall_seconds =
      wall_seconds_since(pair_batch_timing_start);

  struct ExecutionEvent {
    SteadyClock::time_point time;
    int total_delta;
    int finite_width_delta;
    int sharp_delta;
  };
  std::vector<ExecutionEvent> events;
  events.reserve(execution_windows.size() * 2U);
  for (const auto& window : execution_windows) {
    const int finite_delta = window.finite_width ? 1 : 0;
    const int sharp_delta = window.finite_width ? 0 : 1;
    events.push_back({window.start, 1, finite_delta, sharp_delta});
    events.push_back({window.end, -1, -finite_delta, -sharp_delta});
  }
  std::sort(events.begin(), events.end(), [](const auto& left, const auto& right) {
    if (left.time != right.time) {
      return left.time < right.time;
    }
    return left.total_delta < right.total_delta;
  });
  double pair_execution_union_wall_seconds = 0.0;
  double finite_width_execution_union_wall_seconds = 0.0;
  double sharp_execution_union_wall_seconds = 0.0;
  double finite_width_sharp_overlap_wall_seconds = 0.0;
  int active_total = 0;
  int active_finite_width = 0;
  int active_sharp = 0;
  auto prior_event_time = events.front().time;
  for (const auto& event : events) {
    const double duration =
        std::chrono::duration<double>(event.time - prior_event_time).count();
    if (active_total > 0) {
      pair_execution_union_wall_seconds += duration;
    }
    if (active_finite_width > 0) {
      finite_width_execution_union_wall_seconds += duration;
    }
    if (active_sharp > 0) {
      sharp_execution_union_wall_seconds += duration;
    }
    if (active_finite_width > 0 && active_sharp > 0) {
      finite_width_sharp_overlap_wall_seconds += duration;
    }
    active_total += event.total_delta;
    active_finite_width += event.finite_width_delta;
    active_sharp += event.sharp_delta;
    prior_event_time = event.time;
  }
  const double worker_idle_orchestration_wall_seconds = std::max(
      0.0, pair_batch_wall_seconds - pair_execution_union_wall_seconds);

  const bool all_certified = std::all_of(
      pair_certificates.begin(), pair_certificates.end(), [](const auto& pair) {
        return pair.status != "uncertified" && pair.total_acceleration.has_value();
      });
  std::vector<NativeReceiverAcceleration> receiver_totals;
  bool reconstruction_matches = all_certified;
  if (all_certified) {
    for (std::size_t receiver_index = 0; receiver_index < path_ids.size();
         ++receiver_index) {
      std::vector<IntervalVector> source_totals;
      source_totals.reserve(path_ids.size());
      for (std::size_t source_index = 0; source_index < path_ids.size();
           ++source_index) {
        const std::size_t pair_index =
            receiver_index * path_ids.size() + source_index;
        source_totals.push_back(
            *pair_certificates[pair_index].total_acceleration);
      }
      const IntervalVector total = fixed_pairwise_sum(source_totals);
      reconstruction_matches = reconstruction_matches &&
          same_vector(total, fixed_pairwise_sum(source_totals));
      receiver_totals.push_back({path_ids[receiver_index], total});
    }
  }
  return {
      .schema = "eom_native_acceleration_reconstruction_certificate/v0",
      .status = all_certified ? "certified_complete" : "uncertified",
      .failure_code = all_certified ? "" : "ordered_pair_acceleration_uncertified",
      .reduction_policy = kDeterministicReductionPolicy,
      .logical_ordered_pairs = expected_count,
      .complete_ordered_pair_domain = true,
      .reconstruction_matches = reconstruction_matches,
      .pair_execution_union_wall_seconds =
          pair_execution_union_wall_seconds,
      .finite_width_execution_union_wall_seconds =
          finite_width_execution_union_wall_seconds,
      .sharp_execution_union_wall_seconds =
          sharp_execution_union_wall_seconds,
      .finite_width_sharp_overlap_wall_seconds =
          finite_width_sharp_overlap_wall_seconds,
      .worker_idle_orchestration_wall_seconds =
          worker_idle_orchestration_wall_seconds,
      .path_ids = path_ids,
      .pair_certificates = std::move(pair_certificates),
      .receiver_totals = std::move(receiver_totals),
  };
}

}  // namespace architrino::eom
