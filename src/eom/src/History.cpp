#include "architrino/eom/History.hpp"
#include "architrino/eom/Decimal.hpp"

#include <boost/multiprecision/cpp_int.hpp>

#include <algorithm>
#include <cerrno>
#include <cmath>
#include <cstdint>
#include <cstdlib>
#include <filesystem>
#include <fstream>
#include <iomanip>
#include <limits>
#include <mutex>
#include <optional>
#include <sstream>
#include <stdexcept>
#include <system_error>
#include <utility>

namespace architrino::eom {
namespace {

using ExactRational = boost::multiprecision::cpp_rational;

void fingerprint_token(std::uint64_t& state, const std::string& token) {
  const std::string length = std::to_string(token.size());
  for (const char value : length) {
    state ^= static_cast<unsigned char>(value);
    state *= UINT64_C(1099511628211);
  }
  state ^= static_cast<unsigned char>(':');
  state *= UINT64_C(1099511628211);
  for (const char value : token) {
    state ^= static_cast<unsigned char>(value);
    state *= UINT64_C(1099511628211);
  }
}

void fingerprint_segment(
    std::uint64_t& state,
    const CubicHistorySegment& segment) {
  fingerprint_token(state, segment.t_start_token());
  fingerprint_token(state, segment.t_end_token());
  for (const auto& axis : segment.coefficient_tokens()) {
    for (const auto& coefficient : axis) {
      fingerprint_token(state, coefficient);
    }
  }
  for (const auto& token : segment.position_error_tokens()) {
    fingerprint_token(state, token);
  }
  for (const auto& token : segment.velocity_error_tokens()) {
    fingerprint_token(state, token);
  }
}

std::uint64_t initial_history_fingerprint_state() {
  std::uint64_t state = UINT64_C(14695981039346656037);
  fingerprint_token(state, "eom_history_segment_chain/v1");
  return state;
}

std::string history_fingerprint(std::uint64_t state) {
  std::ostringstream stream;
  stream.imbue(std::locale::classic());
  stream << "fnv1a64-chain-v1:" << std::hex << std::setw(16)
         << std::setfill('0')
         << state;
  return stream.str();
}

ExactRational power_of_ten(std::size_t exponent) {
  boost::multiprecision::cpp_int value = 1;
  for (std::size_t index = 0; index < exponent; ++index) {
    value *= 10;
  }
  return ExactRational(value);
}

ExactRational exact_decimal(const std::string& token) {
  std::string mantissa = token;
  long exponent = 0;
  const auto exponent_position = mantissa.find_first_of("eE");
  if (exponent_position != std::string::npos) {
    exponent = std::stol(mantissa.substr(exponent_position + 1));
    mantissa.resize(exponent_position);
  }
  bool negative = false;
  if (!mantissa.empty() && (mantissa.front() == '+' || mantissa.front() == '-')) {
    negative = mantissa.front() == '-';
    mantissa.erase(mantissa.begin());
  }
  const auto decimal_position = mantissa.find('.');
  std::size_t fractional_digits = 0;
  if (decimal_position != std::string::npos) {
    fractional_digits = mantissa.size() - decimal_position - 1;
    mantissa.erase(decimal_position, 1);
  }
  if (mantissa.empty()) {
    throw std::invalid_argument("invalid exact decimal token");
  }
  boost::multiprecision::cpp_int numerator = 0;
  for (const char digit : mantissa) {
    if (digit < '0' || digit > '9') {
      throw std::invalid_argument("invalid exact decimal mantissa");
    }
    numerator *= 10;
    numerator += digit - '0';
  }
  if (negative) {
    numerator = -numerator;
  }
  const long scale = exponent - static_cast<long>(fractional_digits);
  if (scale >= 0) {
    return ExactRational(numerator) *
           power_of_ten(static_cast<std::size_t>(scale));
  }
  return ExactRational(numerator) /
         power_of_ten(static_cast<std::size_t>(-scale));
}

ExactRational exact_polynomial(
    const std::array<std::string, 4>& coefficients,
    const ExactRational& local_time) {
  ExactRational result = exact_decimal(coefficients[3]);
  for (int index = 2; index >= 0; --index) {
    result = result * local_time +
             exact_decimal(coefficients[static_cast<std::size_t>(index)]);
  }
  return result;
}

ExactRational exact_velocity(
    const std::array<std::string, 4>& coefficients,
    const ExactRational& local_time) {
  return ExactRational(3) * exact_decimal(coefficients[3]) * local_time *
             local_time +
         ExactRational(2) * exact_decimal(coefficients[2]) * local_time +
         exact_decimal(coefficients[1]);
}

bool exact_enclosures_overlap(
    const ExactRational& left,
    const ExactRational& left_error,
    const ExactRational& right,
    const ExactRational& right_error) {
  return left - left_error <= right + right_error &&
         right - right_error <= left + left_error;
}

void validate_segment_join(
    const CubicHistorySegment& prior,
    const CubicHistorySegment& next) {
  const ExactRational prior_end = exact_decimal(prior.t_end_token());
  const ExactRational next_start = exact_decimal(next.t_start_token());
  if (prior_end != next_start) {
    throw std::invalid_argument("retained-history segments must be contiguous");
  }
  const ExactRational prior_local_time =
      prior_end - exact_decimal(prior.t_start_token());
  for (std::size_t axis = 0; axis < 3; ++axis) {
    const ExactRational prior_position_error =
        exact_decimal(prior.position_error_tokens()[axis]);
    const ExactRational next_position_error =
        exact_decimal(next.position_error_tokens()[axis]);
    const ExactRational prior_velocity_error =
        exact_decimal(prior.velocity_error_tokens()[axis]);
    const ExactRational next_velocity_error =
        exact_decimal(next.velocity_error_tokens()[axis]);
    const ExactRational prior_position =
        exact_polynomial(prior.coefficient_tokens()[axis], prior_local_time);
    const ExactRational next_position =
        exact_decimal(next.coefficient_tokens()[axis][0]);
    if (!exact_enclosures_overlap(
            prior_position, prior_position_error,
            next_position, next_position_error)) {
      throw std::invalid_argument("retained-history position is discontinuous");
    }
    const ExactRational prior_velocity =
        exact_velocity(prior.coefficient_tokens()[axis], prior_local_time);
    const ExactRational next_velocity =
        exact_decimal(next.coefficient_tokens()[axis][1]);
    if (!exact_enclosures_overlap(
            prior_velocity, prior_velocity_error,
            next_velocity, next_velocity_error)) {
      throw std::invalid_argument("retained-history velocity is discontinuous");
    }
  }
}

double parse_decimal(const std::string& token, const char* label) {
  return parse_finite_double(token, label);
}

std::string decimal_token(double value) {
  return finite_double_token(value);
}

std::array<double, 3> rotate_x(
    const std::array<double, 3>& value,
    double angle) {
  const double cosine = std::cos(angle);
  const double sine = std::sin(angle);
  return {value[0], cosine * value[1] - sine * value[2],
          sine * value[1] + cosine * value[2]};
}

std::array<double, 3> rotate_y(
    const std::array<double, 3>& value,
    double angle) {
  const double cosine = std::cos(angle);
  const double sine = std::sin(angle);
  return {cosine * value[0] + sine * value[2], value[1],
          -sine * value[0] + cosine * value[2]};
}

IntervalVector rotate_x_interval(
    const IntervalVector& value,
    const Interval& angle) {
  const Interval cosine = interval_cos(angle);
  const Interval sine = interval_sin(angle);
  return {value[0], cosine * value[1] - sine * value[2],
          sine * value[1] + cosine * value[2]};
}

IntervalVector rotate_y_interval(
    const IntervalVector& value,
    const Interval& angle) {
  const Interval cosine = interval_cos(angle);
  const Interval sine = interval_sin(angle);
  return {cosine * value[0] + sine * value[2], value[1],
          Interval::point(0.0) - sine * value[0] + cosine * value[2]};
}

CubicCoefficientIntervals parse_coefficient_intervals(
    const CubicCoefficientTokens& tokens) {
  return {{
      {{Interval::decimal_token(tokens[0][0]),
        Interval::decimal_token(tokens[0][1]),
        Interval::decimal_token(tokens[0][2]),
        Interval::decimal_token(tokens[0][3])}},
      {{Interval::decimal_token(tokens[1][0]),
        Interval::decimal_token(tokens[1][1]),
        Interval::decimal_token(tokens[1][2]),
        Interval::decimal_token(tokens[1][3])}},
      {{Interval::decimal_token(tokens[2][0]),
        Interval::decimal_token(tokens[2][1]),
        Interval::decimal_token(tokens[2][2]),
        Interval::decimal_token(tokens[2][3])}},
  }};
}

IntervalVector segment_hull(
    const RetainedHistory& history,
    const Interval& time,
    bool velocity) {
  if (!history.covers(time)) {
    throw std::out_of_range("history interval lies outside retained coverage");
  }
  std::optional<IntervalVector> result;
  const Interval& retained_start =
      history.segments().front().t_start_interval();
  const Interval& retained_end = history.segments().back().t_end_interval();
  const double requested_lower = std::max(time.lower(), retained_start.lower());
  const double requested_upper = std::min(time.upper(), retained_end.upper());
  double cursor = requested_lower;
  for (const auto& segment : history.segments()) {
    const Interval& segment_start = segment.t_start_interval();
    const Interval& segment_end = segment.t_end_interval();
    const double lower = std::max(requested_lower, segment_start.lower());
    const double upper = std::min(requested_upper, segment_end.upper());
    if (lower > upper || upper < cursor) {
      continue;
    }
    if (lower > cursor) {
      throw std::out_of_range("retained history contains an interval gap");
    }
    const Interval local_time(lower, upper);
    const auto value = velocity ? segment.velocity_interval(local_time)
                                : segment.position_interval(local_time);
    result = result.has_value() ? hull(*result, value) : value;
    cursor = std::max(cursor, upper);
    if (cursor >= requested_upper) {
      break;
    }
  }
  if (!result.has_value() || cursor < requested_upper) {
    throw std::out_of_range("retained history does not cover complete interval");
  }
  return *result;
}

IntervalVector complete_segment_position_hull(
    const CubicHistorySegment& segment) {
  const Interval time(
      segment.t_start_interval().lower(), segment.t_end_interval().upper());
  return segment.position_interval(time);
}

IntervalVector intersect_vectors(
    const IntervalVector& left,
    const IntervalVector& right) {
  IntervalVector result{
      Interval::point(0.0), Interval::point(0.0), Interval::point(0.0)};
  for (std::size_t axis = 0U; axis < 3U; ++axis) {
    const auto overlap = left[axis].intersection(right[axis]);
    if (!overlap.has_value()) {
      throw std::invalid_argument(
          "certified retained-history enclosures do not intersect");
    }
    result[axis] = *overlap;
  }
  return result;
}

IntervalVector correlated_segment_position_from_join(
    const CubicHistorySegment& segment,
    const IntervalVector& shared_position,
    double join_time,
    const Interval& time) {
  const IntervalVector ordinary = segment.position_interval(time);
  const IntervalVector nominal_delta = subtract(
      segment.nominal_position_interval(time),
      segment.nominal_position_interval(Interval::point(join_time)));
  const double distance = std::max(
      std::abs(time.lower() - join_time),
      std::abs(time.upper() - join_time));
  IntervalVector propagated{
      Interval::point(0.0), Interval::point(0.0), Interval::point(0.0)};
  for (std::size_t axis = 0U; axis < 3U; ++axis) {
    propagated[axis] = (shared_position[axis] + nominal_delta[axis]).inflate(
        segment.velocity_errors()[axis] * distance);
  }
  return intersect_vectors(ordinary, propagated);
}

}  // namespace

CubicHistorySegment::CubicHistorySegment(
    std::string t_start,
    std::string t_end,
    CubicCoefficientTokens coefficients,
    std::string position_error,
    std::string velocity_error)
    : CubicHistorySegment(
          std::move(t_start), std::move(t_end), std::move(coefficients),
          HistoryErrorTokens{position_error, position_error, position_error},
          HistoryErrorTokens{velocity_error, velocity_error, velocity_error}) {}

CubicHistorySegment::CubicHistorySegment(
    std::string t_start,
    std::string t_end,
    CubicCoefficientTokens coefficients,
    HistoryErrorTokens position_errors,
    HistoryErrorTokens velocity_errors)
    : t_start_token_(std::move(t_start)),
      t_end_token_(std::move(t_end)),
      coefficient_tokens_(std::move(coefficients)),
      position_error_tokens_(std::move(position_errors)),
      velocity_error_tokens_(std::move(velocity_errors)),
      t_start_(parse_decimal(t_start_token_, "history start time")),
      t_end_(parse_decimal(t_end_token_, "history end time")),
      t_start_interval_(Interval::decimal_token(t_start_token_)),
      t_end_interval_(Interval::decimal_token(t_end_token_)),
      coefficient_intervals_(
          parse_coefficient_intervals(coefficient_tokens_)) {
  if (t_start_ >= t_end_) {
    throw std::invalid_argument("history segment requires t_start < t_end");
  }
  for (std::size_t axis = 0U; axis < 3U; ++axis) {
    position_errors_[axis] = parse_decimal(
        position_error_tokens_[axis], "position error");
    velocity_errors_[axis] = parse_decimal(
        velocity_error_tokens_[axis], "velocity error");
    if (position_errors_[axis] < 0.0 || velocity_errors_[axis] < 0.0) {
      throw std::invalid_argument("history errors must be nonnegative");
    }
    position_error_ = std::max(position_error_, position_errors_[axis]);
    velocity_error_ = std::max(velocity_error_, velocity_errors_[axis]);
  }
  position_error_token_ = decimal_token(position_error_);
  velocity_error_token_ = decimal_token(velocity_error_);
  double speed_square_upper = 0.0;
  const double duration = t_end_ - t_start_;
  for (std::size_t axis = 0U; axis < coefficient_tokens_.size(); ++axis) {
    for (std::size_t coefficient = 0U;
         coefficient < coefficient_tokens_[axis].size(); ++coefficient) {
      coefficient_values_[axis][coefficient] = parse_decimal(
          coefficient_tokens_[axis][coefficient], "history coefficient");
    }
    const auto& row = coefficient_values_[axis];
    const double component_upper = std::abs(row[1]) +
        2.0 * std::abs(row[2]) * duration +
        3.0 * std::abs(row[3]) * duration * duration;
    speed_square_upper += component_upper * component_upper;
  }
  nominal_speed_upper_bound_ = std::sqrt(speed_square_upper);
}

void CubicHistorySegment::require_time(const Interval& time) const {
  if (time.lower() < t_start_interval_.lower() ||
      time.upper() > t_end_interval_.upper()) {
    std::ostringstream detail;
    detail << std::setprecision(std::numeric_limits<double>::max_digits10)
           << "history evaluation lies outside segment: requested=["
           << time.lower() << ',' << time.upper() << "] segment=["
           << t_start_interval_.lower() << ',' << t_end_interval_.upper()
           << "] tokens=[" << t_start_token_ << ',' << t_end_token_ << ']';
    throw std::out_of_range(detail.str());
  }
}

Interval CubicHistorySegment::polynomial_interval(
    const std::array<Interval, 4>& coefficients,
    const Interval& time) const {
  require_time(time);
  const Interval local_time = time - t_start_interval_;
  Interval result = coefficients[3];
  for (int index = 2; index >= 0; --index) {
    result = result * local_time + coefficients[static_cast<std::size_t>(index)];
  }
  return result;
}

IntervalVector CubicHistorySegment::position_interval(
    const Interval& time) const {
  return {
      polynomial_interval(coefficient_intervals_[0], time).inflate(position_errors_[0]),
      polynomial_interval(coefficient_intervals_[1], time).inflate(position_errors_[1]),
      polynomial_interval(coefficient_intervals_[2], time).inflate(position_errors_[2]),
  };
}

IntervalVector CubicHistorySegment::nominal_position_interval(
    const Interval& time) const {
  return {
      polynomial_interval(coefficient_intervals_[0], time),
      polynomial_interval(coefficient_intervals_[1], time),
      polynomial_interval(coefficient_intervals_[2], time),
  };
}

std::array<double, 3> CubicHistorySegment::nominal_position(
    double time) const {
  if (time < t_start_ || time > t_end_) {
    throw std::out_of_range("nominal history position lies outside segment");
  }
  const double local = time - t_start_;
  std::array<double, 3> result{};
  for (std::size_t axis = 0; axis < 3U; ++axis) {
    const auto& row = coefficient_values_[axis];
    result[axis] =
        ((row[3] * local + row[2]) * local + row[1]) * local + row[0];
  }
  return result;
}

std::array<double, 3> CubicHistorySegment::nominal_velocity(
    double time) const {
  if (time < t_start_ || time > t_end_) {
    throw std::out_of_range("nominal history velocity lies outside segment");
  }
  const double local = time - t_start_;
  std::array<double, 3> result{};
  for (std::size_t axis = 0; axis < 3U; ++axis) {
    const auto& row = coefficient_values_[axis];
    result[axis] =
        (3.0 * row[3] * local + 2.0 * row[2]) * local + row[1];
  }
  return result;
}

IntervalVector CubicHistorySegment::correlated_displacement_interval(
    const Interval& reception,
    const Interval& emission) const {
  require_time(reception);
  require_time(emission);
  if (emission.upper() > reception.lower()) {
    throw std::invalid_argument(
        "correlated self displacement requires emission before reception");
  }
  const IntervalVector nominal = subtract(
      nominal_position_interval(reception),
      nominal_position_interval(emission));
  const double maximum_delay = reception.upper() - emission.lower();
  // The reconstruction remainder is one function on this retained segment,
  // not two independent endpoint errors.  If |e| <= eps_x and
  // |e'| <= eps_v, then
  //   |e(T)-e(S)| <= min(2 eps_x, eps_v |T-S|).
  // This preserves the same-segment correlation while remaining a rigorous
  // enclosure under the segment's published position and velocity bounds.
  return {
      nominal[0].inflate(std::min(
          2.0 * position_errors_[0], velocity_errors_[0] * maximum_delay)),
      nominal[1].inflate(std::min(
          2.0 * position_errors_[1], velocity_errors_[1] * maximum_delay)),
      nominal[2].inflate(std::min(
          2.0 * position_errors_[2], velocity_errors_[2] * maximum_delay)),
  };
}

IntervalVector CubicHistorySegment::velocity_interval(
    const Interval& time) const {
  require_time(time);
  const Interval local_time = time - t_start_interval_;
  IntervalVector result = {
      Interval::point(0.0), Interval::point(0.0), Interval::point(0.0)};
  for (std::size_t axis = 0; axis < 3; ++axis) {
    Interval derivative =
        Interval::point(3.0) * coefficient_intervals_[axis][3];
    derivative = derivative * local_time +
                 Interval::point(2.0) * coefficient_intervals_[axis][2];
    derivative = derivative * local_time + coefficient_intervals_[axis][1];
    result[axis] = derivative.inflate(velocity_errors_[axis]);
  }
  return result;
}

namespace {

struct ExactHistoryDiskBlock {
  std::filesystem::path path;
  std::uint64_t bytes = 0U;
  std::uint64_t generation = 0U;
};

struct ExactHistoryDiskRuntime {
  std::mutex mutex;
  bool enabled = false;
  std::filesystem::path root_directory;
  std::filesystem::path run_directory;
  std::uint64_t maximum_disk_bytes = 0U;
  std::uint64_t disk_bytes = 0U;
  std::uint64_t block_file_count = 0U;
  std::uint64_t next_block_id = 0U;
  std::uint64_t generation = 0U;
  std::size_t cached_blocks_per_thread = 16U;
  std::string run_id;
};

ExactHistoryDiskRuntime& exact_history_disk_runtime() {
  static ExactHistoryDiskRuntime runtime;
  return runtime;
}

void write_u64(std::ostream& output, std::uint64_t value) {
  for (unsigned byte = 0U; byte < 8U; ++byte) {
    output.put(static_cast<char>((value >> (byte * 8U)) & 0xffU));
  }
  if (!output) {
    throw std::runtime_error("exact history disk write failed");
  }
}

std::uint64_t read_u64(std::istream& input) {
  std::uint64_t value = 0U;
  for (unsigned byte = 0U; byte < 8U; ++byte) {
    const int character = input.get();
    if (character == std::char_traits<char>::eof()) {
      throw std::runtime_error("exact history disk block is truncated");
    }
    value |= static_cast<std::uint64_t>(
        static_cast<unsigned char>(character)) << (byte * 8U);
  }
  return value;
}

void write_token(std::ostream& output, const std::string& token) {
  write_u64(output, token.size());
  output.write(token.data(), static_cast<std::streamsize>(token.size()));
  if (!output) {
    throw std::runtime_error("exact history token write failed");
  }
}

std::string read_token(std::istream& input) {
  const std::uint64_t size = read_u64(input);
  if (size > UINT64_C(1048576)) {
    throw std::runtime_error("exact history token exceeds the disk format envelope");
  }
  std::string token(static_cast<std::size_t>(size), '\0');
  input.read(token.data(), static_cast<std::streamsize>(token.size()));
  if (!input) {
    throw std::runtime_error("exact history token is truncated");
  }
  return token;
}

void remove_disk_block(const ExactHistoryDiskBlock& descriptor) noexcept {
  auto& runtime = exact_history_disk_runtime();
  std::lock_guard lock(runtime.mutex);
  if (!runtime.enabled || descriptor.generation != runtime.generation) {
    return;
  }
  std::error_code error;
  const bool removed = std::filesystem::remove(descriptor.path, error);
  if (removed) {
    runtime.disk_bytes = descriptor.bytes > runtime.disk_bytes
        ? 0U : runtime.disk_bytes - descriptor.bytes;
    if (runtime.block_file_count > 0U) {
      --runtime.block_file_count;
    }
  }
}

}  // namespace

void configure_history_disk_storage(
    const HistoryDiskStorageOptions& options) {
  if (options.root_directory.empty() || options.maximum_disk_bytes == 0U ||
      options.cached_blocks_per_thread < 2U) {
    throw std::invalid_argument(
        "exact history disk storage requires a root, positive limit, and "
        "at least two cached blocks per thread");
  }
  const std::filesystem::path root =
      std::filesystem::path(options.root_directory).lexically_normal();
  if (!root.is_absolute() || root == root.root_path() ||
      root.filename().empty()) {
    throw std::invalid_argument(
        "exact history disk storage requires a dedicated absolute root");
  }
  auto& runtime = exact_history_disk_runtime();
  std::lock_guard lock(runtime.mutex);
  std::error_code error;
  std::filesystem::remove_all(root, error);
  if (error) {
    throw std::runtime_error("exact_history_stale_cleanup_failed");
  }
  std::filesystem::create_directories(root, error);
  if (error) {
    throw std::runtime_error("exact_history_disk_root_create_failed");
  }
  ++runtime.generation;
  runtime.enabled = true;
  runtime.root_directory = root;
  runtime.run_directory.clear();
  runtime.maximum_disk_bytes = options.maximum_disk_bytes;
  runtime.disk_bytes = 0U;
  runtime.block_file_count = 0U;
  runtime.next_block_id = 0U;
  runtime.cached_blocks_per_thread = options.cached_blocks_per_thread;
  runtime.run_id.clear();
}

void begin_history_disk_storage_run(const std::string& run_id) {
  if (run_id.empty()) {
    throw std::invalid_argument("exact history disk run id must be nonempty");
  }
  auto& runtime = exact_history_disk_runtime();
  std::lock_guard lock(runtime.mutex);
  if (!runtime.enabled || runtime.root_directory.empty()) {
    return;
  }
  std::error_code error;
  std::filesystem::remove_all(runtime.root_directory, error);
  if (error) {
    throw std::runtime_error("exact_history_prior_run_cleanup_failed");
  }
  std::filesystem::create_directories(runtime.root_directory, error);
  if (error) {
    throw std::runtime_error("exact_history_disk_root_create_failed");
  }
  ++runtime.generation;
  runtime.run_directory = runtime.root_directory /
      ("run-" + std::to_string(runtime.generation));
  std::filesystem::create_directories(runtime.run_directory, error);
  if (error) {
    runtime.run_directory.clear();
    throw std::runtime_error("exact_history_run_directory_create_failed");
  }
  runtime.disk_bytes = 0U;
  runtime.block_file_count = 0U;
  runtime.next_block_id = 0U;
  runtime.run_id = run_id;
}

void release_history_disk_storage_run() noexcept {
  auto& runtime = exact_history_disk_runtime();
  std::lock_guard lock(runtime.mutex);
  ++runtime.generation;
  std::error_code ignored;
  if (!runtime.root_directory.empty()) {
    std::filesystem::remove_all(runtime.root_directory, ignored);
    std::filesystem::create_directories(runtime.root_directory, ignored);
  }
  runtime.run_directory.clear();
  runtime.disk_bytes = 0U;
  runtime.block_file_count = 0U;
  runtime.next_block_id = 0U;
  runtime.run_id.clear();
}

HistoryDiskStorageStats history_disk_storage_stats() noexcept {
  auto& runtime = exact_history_disk_runtime();
  std::lock_guard lock(runtime.mutex);
  return {
      .enabled = runtime.enabled,
      .schema = "eom_exact_history_disk_store/v1",
      .maximum_disk_bytes = runtime.maximum_disk_bytes,
      .disk_bytes = runtime.disk_bytes,
      .block_file_count = runtime.block_file_count,
      .cached_blocks_per_thread = runtime.cached_blocks_per_thread,
      .run_id = runtime.run_id,
  };
}

struct HistorySegmentSequence::Storage {
  static constexpr std::size_t kBlockSize = 64U;
  using Block = std::vector<CubicHistorySegment>;

  struct Slot {
    std::shared_ptr<const Block> memory;
    std::shared_ptr<const ExactHistoryDiskBlock> disk;
    std::size_t size = 0U;
  };

  std::vector<Slot> blocks;
  std::vector<std::size_t> cumulative_ends;
  std::size_t size = 0U;

  void rebuild_index() {
    cumulative_ends.clear();
    cumulative_ends.reserve(blocks.size());
    size = 0U;
    for (const auto& block : blocks) {
      size += block.size;
      cumulative_ends.push_back(size);
    }
  }
};

namespace {

using ExactHistoryBlock = HistorySegmentSequence::Storage::Block;
using ExactHistorySlot = HistorySegmentSequence::Storage::Slot;

std::shared_ptr<const ExactHistoryDiskBlock> write_exact_history_block(
    const ExactHistoryBlock& block) {
  auto& runtime = exact_history_disk_runtime();
  std::ostringstream encoded(std::ios::binary);
  encoded.write("AEHB0001", 8);
  write_u64(encoded, block.size());
  for (const auto& segment : block) {
    write_token(encoded, segment.t_start_token());
    write_token(encoded, segment.t_end_token());
    for (const auto& axis : segment.coefficient_tokens()) {
      for (const auto& token : axis) {
        write_token(encoded, token);
      }
    }
    for (const auto& token : segment.position_error_tokens()) {
      write_token(encoded, token);
    }
    for (const auto& token : segment.velocity_error_tokens()) {
      write_token(encoded, token);
    }
  }
  const std::string bytes = encoded.str();

  std::lock_guard lock(runtime.mutex);
  if (!runtime.enabled || runtime.run_directory.empty()) {
    return nullptr;
  }
  if (bytes.size() > runtime.maximum_disk_bytes -
          std::min(runtime.disk_bytes, runtime.maximum_disk_bytes)) {
    throw std::runtime_error("exact_history_disk_limit_exhausted");
  }
  const auto final_path = runtime.run_directory /
      ("block-" + std::to_string(runtime.next_block_id++) + ".aehb");
  const auto temporary_path = final_path.string() + ".tmp";
  {
    std::ofstream output(temporary_path, std::ios::binary | std::ios::trunc);
    output.write(bytes.data(), static_cast<std::streamsize>(bytes.size()));
    output.close();
    if (!output) {
      std::error_code ignored;
      std::filesystem::remove(temporary_path, ignored);
      throw std::runtime_error("exact_history_disk_write_failed");
    }
  }
  std::error_code rename_error;
  std::filesystem::rename(temporary_path, final_path, rename_error);
  if (rename_error) {
    std::error_code ignored;
    std::filesystem::remove(temporary_path, ignored);
    throw std::runtime_error("exact_history_disk_publish_failed");
  }
  runtime.disk_bytes += bytes.size();
  ++runtime.block_file_count;
  auto* descriptor = new ExactHistoryDiskBlock{
      final_path, static_cast<std::uint64_t>(bytes.size()), runtime.generation};
  return std::shared_ptr<const ExactHistoryDiskBlock>(
      descriptor,
      [](const ExactHistoryDiskBlock* value) {
        remove_disk_block(*value);
        delete value;
      });
}

std::shared_ptr<const ExactHistoryBlock> read_exact_history_block(
    const ExactHistoryDiskBlock& descriptor) {
  std::ifstream input(descriptor.path, std::ios::binary);
  char magic[8]{};
  input.read(magic, 8);
  if (!input || std::string(magic, 8) != "AEHB0001") {
    throw std::runtime_error("exact history disk block has invalid format");
  }
  const std::uint64_t count = read_u64(input);
  if (count == 0U || count > HistorySegmentSequence::Storage::kBlockSize) {
    throw std::runtime_error("exact history disk block has invalid segment count");
  }
  auto block = std::make_shared<ExactHistoryBlock>();
  block->reserve(static_cast<std::size_t>(count));
  for (std::uint64_t index = 0U; index < count; ++index) {
    std::string t_start = read_token(input);
    std::string t_end = read_token(input);
    CubicCoefficientTokens coefficients{};
    for (auto& axis : coefficients) {
      for (auto& token : axis) {
        token = read_token(input);
      }
    }
    HistoryErrorTokens position_errors{};
    HistoryErrorTokens velocity_errors{};
    for (auto& token : position_errors) token = read_token(input);
    for (auto& token : velocity_errors) token = read_token(input);
    block->emplace_back(
        std::move(t_start), std::move(t_end), std::move(coefficients),
        std::move(position_errors), std::move(velocity_errors));
  }
  return block;
}

std::shared_ptr<const ExactHistoryBlock> exact_history_slot_block(
    const ExactHistorySlot& slot) {
  if (slot.memory) {
    return slot.memory;
  }
  if (!slot.disk) {
    throw std::logic_error("exact history block has no storage");
  }
  struct CacheEntry {
    std::filesystem::path path;
    std::uint64_t generation = 0U;
    std::shared_ptr<const ExactHistoryBlock> block;
  };
  struct ThreadCache {
    std::vector<CacheEntry> entries;
    std::size_t next = 0U;
  };
  thread_local ThreadCache cache;
  for (const auto& entry : cache.entries) {
    if (entry.generation == slot.disk->generation &&
        entry.path == slot.disk->path) {
      return entry.block;
    }
  }
  auto loaded = read_exact_history_block(*slot.disk);
  std::size_t limit = 16U;
  {
    auto& runtime = exact_history_disk_runtime();
    std::lock_guard lock(runtime.mutex);
    limit = std::max<std::size_t>(2U, runtime.cached_blocks_per_thread);
  }
  if (cache.entries.size() < limit) {
    cache.entries.push_back({slot.disk->path, slot.disk->generation, loaded});
  } else {
    cache.entries[cache.next] = {
        slot.disk->path, slot.disk->generation, loaded};
    cache.next = (cache.next + 1U) % limit;
  }
  return loaded;
}

ExactHistorySlot make_exact_history_slot(
    std::shared_ptr<const ExactHistoryBlock> block) {
  if (!block || block->empty()) {
    throw std::invalid_argument("exact history block must not be empty");
  }
  const std::size_t block_size = block->size();
  if (block_size == HistorySegmentSequence::Storage::kBlockSize) {
    if (auto disk = write_exact_history_block(*block)) {
      return {.memory = nullptr, .disk = std::move(disk), .size = block_size};
    }
  }
  return {.memory = std::move(block), .disk = nullptr, .size = block_size};
}

std::pair<std::size_t, std::size_t> locate_exact_history_segment(
    const HistorySegmentSequence::Storage& storage,
    std::size_t index) {
  const auto found = std::upper_bound(
      storage.cumulative_ends.begin(), storage.cumulative_ends.end(), index);
  const std::size_t block_index = static_cast<std::size_t>(
      found - storage.cumulative_ends.begin());
  const std::size_t block_start = block_index == 0U
      ? 0U : storage.cumulative_ends[block_index - 1U];
  return {block_index, index - block_start};
}

}  // namespace

HistorySegmentSequence::HistorySegmentSequence(
    std::vector<CubicHistorySegment> segments) {
  auto storage = std::make_shared<Storage>();
  storage->blocks.reserve(
      (segments.size() + Storage::kBlockSize - 1U) / Storage::kBlockSize);
  for (std::size_t offset = 0U; offset < segments.size();
       offset += Storage::kBlockSize) {
    auto block = std::make_shared<Storage::Block>();
    const std::size_t block_end =
        std::min(segments.size(), offset + Storage::kBlockSize);
    block->reserve(block_end - offset);
    for (std::size_t index = offset; index < block_end; ++index) {
      block->push_back(std::move(segments[index]));
    }
    storage->blocks.push_back(make_exact_history_slot(std::move(block)));
  }
  storage->rebuild_index();
  storage_ = std::move(storage);
}

std::size_t HistorySegmentSequence::size() const noexcept {
  return storage_->size;
}

const CubicHistorySegment& HistorySegmentSequence::operator[](
    std::size_t index) const {
  if (index >= size()) {
    throw std::out_of_range("history segment index lies outside the sequence");
  }
  const auto [block_index, local_index] =
      locate_exact_history_segment(*storage_, index);
  return (*exact_history_slot_block(storage_->blocks[block_index]))[local_index];
}

const CubicHistorySegment& HistorySegmentSequence::front() const {
  if (empty()) {
    throw std::out_of_range("empty history segment sequence has no front");
  }
  return (*this)[0U];
}

const CubicHistorySegment& HistorySegmentSequence::back() const {
  if (empty()) {
    throw std::out_of_range("empty history segment sequence has no back");
  }
  return (*this)[size() - 1U];
}

std::size_t HistorySegmentSequence::resident_segment_count() const noexcept {
  std::size_t count = 0U;
  for (const auto& slot : storage_->blocks) {
    if (slot.memory) {
      count += slot.size;
    }
  }
  return count;
}

std::size_t HistorySegmentSequence::disk_backed_block_count() const noexcept {
  return static_cast<std::size_t>(std::count_if(
      storage_->blocks.begin(), storage_->blocks.end(),
      [](const auto& slot) { return slot.disk != nullptr; }));
}

HistorySegmentSequence HistorySegmentSequence::appended(
    CubicHistorySegment segment) const {
  auto storage = std::make_shared<Storage>(*storage_);
  if (!storage->blocks.empty() &&
      storage->blocks.back().size < Storage::kBlockSize) {
    auto block = std::make_shared<Storage::Block>(
        *exact_history_slot_block(storage->blocks.back()));
    block->push_back(std::move(segment));
    storage->blocks.back() = make_exact_history_slot(std::move(block));
  } else {
    auto block = std::make_shared<Storage::Block>();
    block->reserve(Storage::kBlockSize);
    block->push_back(std::move(segment));
    storage->blocks.push_back(make_exact_history_slot(std::move(block)));
  }
  storage->rebuild_index();
  return HistorySegmentSequence(std::move(storage));
}

HistorySegmentSequence HistorySegmentSequence::retained_suffix(
    std::size_t first_segment_index) const {
  if (first_segment_index >= size()) {
    throw std::out_of_range(
        "history segment suffix must preserve at least one segment");
  }
  if (first_segment_index == 0U) {
    return *this;
  }
  const auto [first_block_index, first_local_index] =
      locate_exact_history_segment(*storage_, first_segment_index);
  auto storage = std::make_shared<Storage>();
  storage->blocks.reserve(storage_->blocks.size() - first_block_index);
  if (first_local_index == 0U) {
    storage->blocks.insert(
        storage->blocks.end(),
        storage_->blocks.begin() + static_cast<std::ptrdiff_t>(first_block_index),
        storage_->blocks.end());
  } else {
    const auto first = exact_history_slot_block(
        storage_->blocks[first_block_index]);
    auto trimmed = std::make_shared<Storage::Block>(
        first->begin() + static_cast<std::ptrdiff_t>(first_local_index),
        first->end());
    storage->blocks.push_back(make_exact_history_slot(std::move(trimmed)));
    storage->blocks.insert(
        storage->blocks.end(),
        storage_->blocks.begin() + static_cast<std::ptrdiff_t>(first_block_index + 1U),
        storage_->blocks.end());
  }
  storage->rebuild_index();
  return HistorySegmentSequence(std::move(storage));
}

HistorySegmentSequence::const_iterator::reference
HistorySegmentSequence::const_iterator::operator*() const {
  return (*owner_)[index_];
}

HistorySegmentSequence::const_iterator::pointer
HistorySegmentSequence::const_iterator::operator->() const {
  return &(*owner_)[index_];
}

HistorySegmentSequence::const_iterator&
HistorySegmentSequence::const_iterator::operator++() {
  ++index_;
  return *this;
}

HistorySegmentSequence::const_iterator
HistorySegmentSequence::const_iterator::operator++(int) {
  auto prior = *this;
  ++*this;
  return prior;
}

RetainedHistory::RetainedHistory(
    std::string history_id,
    std::vector<CubicHistorySegment> segments)
    : RetainedHistory(
          std::move(history_id),
          HistorySegmentSequence(std::move(segments)),
          RecomputeMetadataTag{}) {}

RetainedHistory::RetainedHistory(
    std::string history_id,
    HistorySegmentSequence segments,
    RecomputeMetadataTag)
    : history_id_(std::move(history_id)),
      segments_(std::move(segments)),
      fingerprint_state_(initial_history_fingerprint_state()) {
  if (history_id_.empty()) {
    throw std::invalid_argument("retained history requires an identity");
  }
  if (segments_.empty()) {
    throw std::invalid_argument("retained history requires at least one segment");
  }
  for (std::size_t index = 1; index < segments_.size(); ++index) {
    validate_segment_join(segments_[index - 1U], segments_[index]);
  }
  for (const auto& segment : segments_) {
    fingerprint_segment(fingerprint_state_, segment);
    const IntervalVector position = complete_segment_position_hull(segment);
    full_position_hull_ = full_position_hull_.has_value()
        ? hull(*full_position_hull_, position)
        : position;
    nominal_speed_upper_bound_ = std::max(
        nominal_speed_upper_bound_, segment.nominal_speed_upper_bound());
  }
  provenance_fingerprint_ = history_fingerprint(fingerprint_state_);
}

RetainedHistory RetainedHistory::uniform_circular(
    std::string history_id,
    const UniformCircularHistoryRequest& request) {
  const double t_start = parse_decimal(request.t_start, "circular history start");
  const double t_end = parse_decimal(request.t_end, "circular history end");
  const double maximum_segment_step = parse_decimal(
      request.maximum_segment_step, "circular history segment step");
  const double cylindrical_radius = parse_decimal(
      request.cylindrical_radius, "circular history radius");
  const double height = parse_decimal(request.height, "circular history height");
  const double angular_speed = parse_decimal(
      request.angular_speed, "circular history angular speed");
  const double tangential_speed = parse_decimal(
      request.tangential_speed, "circular history tangential speed");
  const double phase = parse_decimal(request.phase, "circular history phase");
  const double tilt_x = parse_decimal(request.tilt_x, "circular history x tilt");
  const double tilt_y = parse_decimal(request.tilt_y, "circular history y tilt");
  if (!(t_end > t_start) || !(maximum_segment_step > 0.0) ||
      !(cylindrical_radius > 0.0) || angular_speed == 0.0 ||
      !(tangential_speed > 0.0)) {
    throw std::invalid_argument(
        "uniform circular history requires positive duration, segment step, "
        "radius, and speed with nonzero angular speed");
  }
  const double derived_speed =
      std::abs(cylindrical_radius * angular_speed);
  const double speed_scale =
      std::max({1.0, derived_speed, tangential_speed});
  if (std::abs(derived_speed - tangential_speed) >
      128.0 * std::numeric_limits<double>::epsilon() * speed_scale) {
    throw std::invalid_argument(
        "uniform circular history tangential speed disagrees with radius "
        "times angular speed: radius=" +
        request.cylindrical_radius + " angular_speed=" +
        request.angular_speed + " tangential_speed=" +
        request.tangential_speed);
  }
  // The speed token is the exact kinematic datum.  Construct the analytic
  // circle from v/|omega| so a caller can request the sharp v=c_f endpoint
  // without losing the equality to a binary64 product rounded around c_f.
  // The supplied radius remains a required close geometry cross-check.
  const double certified_radius =
      tangential_speed / std::abs(angular_speed);

  const std::size_t segment_count = static_cast<std::size_t>(
      std::ceil((t_end - t_start) / maximum_segment_step));
  if (segment_count == 0U) {
    throw std::invalid_argument("uniform circular history has no segments");
  }
  const double actual_step =
      (t_end - t_start) / static_cast<double>(segment_count);
  struct CircularState {
    std::array<double, 3> position;
    std::array<double, 3> velocity;
  };
  const auto state = [&](double time) {
    const double azimuth = angular_speed * time + phase;
    std::array<double, 3> position{
        certified_radius * std::cos(azimuth),
        certified_radius * std::sin(azimuth), height};
    std::array<double, 3> velocity{
        -certified_radius * angular_speed * std::sin(azimuth),
        certified_radius * angular_speed * std::cos(azimuth), 0.0};
    position = rotate_y(rotate_x(position, tilt_x), tilt_y);
    velocity = rotate_y(rotate_x(velocity, tilt_x), tilt_y);
    return CircularState{position, velocity};
  };
  const double fourth_derivative =
      certified_radius * std::pow(std::abs(angular_speed), 4);
  const double coordinate_scale =
      std::max({1.0, certified_radius, std::abs(height)});
  const double position_roundoff =
      64.0 * std::numeric_limits<double>::epsilon() * coordinate_scale;
  const double velocity_roundoff =
      64.0 * std::numeric_limits<double>::epsilon() *
      std::max(1.0, tangential_speed);

  std::vector<CubicHistorySegment> segments;
  segments.reserve(segment_count);
  for (std::size_t index = 0; index < segment_count; ++index) {
    const double segment_start =
        t_start + actual_step * static_cast<double>(index);
    const double segment_end = index + 1U == segment_count
        ? t_end
        : t_start + actual_step * static_cast<double>(index + 1U);
    const double step = segment_end - segment_start;
    const auto start = state(segment_start);
    const auto end = state(segment_end);
    CubicCoefficientTokens coefficients{};
    for (std::size_t axis = 0; axis < 3; ++axis) {
      const double delta = end.position[axis] - start.position[axis];
      coefficients[axis] = {
          decimal_token(start.position[axis]),
          decimal_token(start.velocity[axis]),
          decimal_token(
              3.0 * delta / (step * step) -
              (2.0 * start.velocity[axis] + end.velocity[axis]) / step),
          decimal_token(
              -2.0 * delta / (step * step * step) +
              (start.velocity[axis] + end.velocity[axis]) / (step * step))};
    }
    const double position_error =
        fourth_derivative * std::pow(step, 4) / 300.0 +
        position_roundoff;
    const double velocity_error =
        fourth_derivative * std::pow(step, 3) / 8.0 +
        velocity_roundoff;
    segments.emplace_back(
        decimal_token(segment_start), decimal_token(segment_end),
        std::move(coefficients), decimal_token(position_error),
        decimal_token(velocity_error));
  }

  RetainedHistory history(std::move(history_id), std::move(segments));
  UniformCircularEndpointCertificate certificate{
      .schema = "eom_uniform_circular_endpoint_certificate/v1",
      .valid_start_time = request.t_start,
      .valid_reception_time = request.t_end,
      .maximum_segment_step = request.maximum_segment_step,
      .tangential_speed = request.tangential_speed,
      .cylindrical_radius = request.cylindrical_radius,
      .angular_speed = request.angular_speed,
      .height = request.height,
      .phase = request.phase,
      .tilt_x = request.tilt_x,
      .tilt_y = request.tilt_y,
  };
  fingerprint_token(history.fingerprint_state_, certificate.schema);
  fingerprint_token(history.fingerprint_state_, certificate.valid_start_time);
  fingerprint_token(
      history.fingerprint_state_, certificate.valid_reception_time);
  fingerprint_token(
      history.fingerprint_state_, certificate.maximum_segment_step);
  fingerprint_token(history.fingerprint_state_, certificate.tangential_speed);
  fingerprint_token(history.fingerprint_state_, certificate.cylindrical_radius);
  fingerprint_token(history.fingerprint_state_, certificate.angular_speed);
  fingerprint_token(history.fingerprint_state_, certificate.height);
  fingerprint_token(history.fingerprint_state_, certificate.phase);
  fingerprint_token(history.fingerprint_state_, certificate.tilt_x);
  fingerprint_token(history.fingerprint_state_, certificate.tilt_y);
  history.provenance_fingerprint_ =
      history_fingerprint(history.fingerprint_state_);
  history.uniform_circular_endpoint_certificate_ = std::move(certificate);
  return history;
}

RetainedHistory RetainedHistory::restore_uniform_circular(
    std::string history_id,
    const UniformCircularHistoryRequest& request,
    std::vector<CubicHistorySegment> segments) {
  RetainedHistory restored = uniform_circular(history_id, request);
  if (segments.size() < restored.segments().size()) {
    throw std::invalid_argument(
        "restored circular history is missing certified prefix segments");
  }
  const auto same_segment = [](const CubicHistorySegment& left,
                               const CubicHistorySegment& right) {
    return left.t_start_token() == right.t_start_token() &&
        left.t_end_token() == right.t_end_token() &&
        left.coefficient_tokens() == right.coefficient_tokens() &&
        left.position_error_tokens() == right.position_error_tokens() &&
        left.velocity_error_tokens() == right.velocity_error_tokens();
  };
  for (std::size_t index = 0; index < restored.segments().size(); ++index) {
    if (!same_segment(restored.segments()[index], segments[index])) {
      throw std::invalid_argument(
          "restored circular history prefix differs from factory construction");
    }
  }
  for (std::size_t index = restored.segments().size();
       index < segments.size(); ++index) {
    restored = restored.appended(std::move(segments[index]));
  }
  return restored;
}

RetainedHistory::RetainedHistory(
    std::string history_id,
    HistorySegmentSequence segments,
    std::uint64_t fingerprint_state,
    IntervalVector full_position_hull,
    double nominal_speed_upper_bound,
    std::optional<UniformCircularEndpointCertificate>
        uniform_circular_endpoint_certificate)
    : history_id_(std::move(history_id)),
      segments_(std::move(segments)),
      fingerprint_state_(fingerprint_state),
      provenance_fingerprint_(history_fingerprint(fingerprint_state_)),
      full_position_hull_(std::move(full_position_hull)),
      nominal_speed_upper_bound_(nominal_speed_upper_bound),
      uniform_circular_endpoint_certificate_(
          std::move(uniform_circular_endpoint_certificate)) {}

RetainedHistory RetainedHistory::appended(CubicHistorySegment segment) const {
  validate_segment_join(segments_.back(), segment);
  std::uint64_t fingerprint_state = fingerprint_state_;
  fingerprint_segment(fingerprint_state, segment);
  const IntervalVector position = complete_segment_position_hull(segment);
  const double speed_upper = std::max(
      nominal_speed_upper_bound_, segment.nominal_speed_upper_bound());
  return RetainedHistory(
      history_id_, segments_.appended(std::move(segment)), fingerprint_state,
      hull(*full_position_hull_, position), speed_upper,
      uniform_circular_endpoint_certificate_);
}

RetainedHistory RetainedHistory::retained_suffix(
    std::size_t first_segment_index) const {
  if (first_segment_index >= segments_.size()) {
    throw std::out_of_range(
        "retained-history suffix must preserve at least one segment");
  }
  if (first_segment_index == 0U) {
    return *this;
  }
  return RetainedHistory(
      history_id_, segments_.retained_suffix(first_segment_index),
      RecomputeMetadataTag{});
}

std::optional<UniformCircularAnalyticState>
RetainedHistory::uniform_circular_analytic_state(const Interval& time) const {
  if (!uniform_circular_endpoint_certificate_.has_value()) {
    return std::nullopt;
  }
  const auto& certificate = *uniform_circular_endpoint_certificate_;
  const Interval valid_start =
      Interval::decimal_token(certificate.valid_start_time);
  const Interval valid_end =
      Interval::decimal_token(certificate.valid_reception_time);
  if (time.lower() < valid_start.lower() ||
      time.upper() > valid_end.upper()) {
    return std::nullopt;
  }
  const Interval angular_speed =
      Interval::decimal_token(certificate.angular_speed);
  if (angular_speed.contains_zero()) {
    return std::nullopt;
  }
  const Interval radius =
      Interval::decimal_token(certificate.tangential_speed) /
      interval_absolute(angular_speed);
  const Interval angle = angular_speed * time +
      Interval::decimal_token(certificate.phase);
  const Interval cosine = interval_cos(angle);
  const Interval sine = interval_sin(angle);
  const Interval zero = Interval::point(0.0);
  const Interval height = Interval::decimal_token(certificate.height);
  const Interval omega_square = interval_square(angular_speed);
  IntervalVector position{radius * cosine, radius * sine, height};
  IntervalVector velocity{
      zero - radius * angular_speed * sine,
      radius * angular_speed * cosine,
      zero};
  IntervalVector acceleration{
      zero - radius * omega_square * cosine,
      zero - radius * omega_square * sine,
      zero};
  const Interval tilt_x = Interval::decimal_token(certificate.tilt_x);
  const Interval tilt_y = Interval::decimal_token(certificate.tilt_y);
  position = rotate_y_interval(rotate_x_interval(position, tilt_x), tilt_y);
  velocity = rotate_y_interval(rotate_x_interval(velocity, tilt_x), tilt_y);
  acceleration =
      rotate_y_interval(rotate_x_interval(acceleration, tilt_x), tilt_y);
  return UniformCircularAnalyticState{
      .position = position,
      .velocity = velocity,
      .acceleration = acceleration,
  };
}

double RetainedHistory::t_start() const {
  return segments_.front().t_start();
}

double RetainedHistory::t_end() const {
  return segments_.back().t_end();
}

bool RetainedHistory::covers(const Interval& time) const noexcept {
  try {
    const Interval& start = segments_.front().t_start_interval();
    const Interval& end = segments_.back().t_end_interval();
    return time.lower() >= start.lower() && time.upper() <= end.upper();
  } catch (...) {
    return false;
  }
}

std::size_t RetainedHistory::segment_index_at(double time) const {
  if (time < t_start() || time > t_end()) {
    throw std::out_of_range("history time lies outside retained coverage");
  }
  std::size_t lower = 0U;
  std::size_t upper = segments_.size();
  while (lower < upper) {
    const std::size_t middle = lower + (upper - lower) / 2U;
    if (segments_[middle].t_end() <= time) {
      lower = middle + 1U;
    } else {
      upper = middle;
    }
  }
  if (lower == segments_.size()) {
    return segments_.size() - 1U;
  }
  if (segments_[lower].t_start() <= time) {
    return lower;
  }
  throw std::out_of_range("history contains an uncovered time");
}

IntervalVector RetainedHistory::position_hull(const Interval& time) const {
  const Interval& retained_start = segments_.front().t_start_interval();
  const Interval& retained_end = segments_.back().t_end_interval();
  if (time.lower() == retained_start.lower() &&
      time.upper() == retained_end.upper()) {
    return *full_position_hull_;
  }
  return segment_hull(*this, time, false);
}

IntervalVector RetainedHistory::correlated_position_hull(
    const Interval& time) const {
  if (!covers(time)) {
    throw std::out_of_range("history interval lies outside retained coverage");
  }
  if (segments_.size() == 1U) {
    return position_hull(time);
  }
  std::optional<IntervalVector> result;
  for (std::size_t index = 0U; index < segments_.size(); ++index) {
    const auto& segment = segments_[index];
    const double lower = std::max(time.lower(), segment.t_start());
    const double upper = std::min(time.upper(), segment.t_end());
    if (lower > upper) {
      continue;
    }
    const Interval local_time(lower, upper);
    IntervalVector local = segment.position_interval(local_time);
    const auto apply_join = [&](std::size_t left_index) {
      const auto& left = segments_[left_index];
      const auto& right = segments_[left_index + 1U];
      const double join_time = left.t_end();
      const Interval point = Interval::point(join_time);
      const IntervalVector shared = intersect_vectors(
          left.position_interval(point), right.position_interval(point));
      local = intersect_vectors(
          local, correlated_segment_position_from_join(
                     segment, shared, join_time, local_time));
    };
    if (index > 0U) {
      apply_join(index - 1U);
    }
    if (index + 1U < segments_.size()) {
      apply_join(index);
    }
    result = result.has_value() ? hull(*result, local) : local;
  }
  if (!result.has_value()) {
    throw std::out_of_range("history interval is not covered");
  }
  return *result;
}

IntervalVector RetainedHistory::velocity_hull(const Interval& time) const {
  return segment_hull(*this, time, true);
}

IntervalVector RetainedHistory::correlated_velocity_hull(
    const Interval& time) const {
  IntervalVector result = velocity_hull(time);
  if (time.lower() != time.upper()) {
    return result;
  }
  const double point_value = time.lower();
  for (const auto& segment : segments_) {
    if (point_value < segment.t_start() || point_value > segment.t_end()) {
      continue;
    }
    result = intersect_vectors(result, segment.velocity_interval(time));
  }
  return result;
}

std::array<double, 3> RetainedHistory::nominal_position(double time) const {
  return segments_[segment_index_at(time)].nominal_position(time);
}

std::array<double, 3> RetainedHistory::nominal_velocity(double time) const {
  return segments_[segment_index_at(time)].nominal_velocity(time);
}

std::optional<IntervalVector>
RetainedHistory::same_segment_correlated_displacement(
    const Interval& reception,
    const Interval& emission) const {
  if (emission.upper() > reception.lower()) {
    return std::nullopt;
  }
  for (const auto& segment : segments_) {
    if (emission.lower() >= segment.t_start_interval().lower() &&
        reception.upper() <= segment.t_end_interval().upper()) {
      return segment.correlated_displacement_interval(reception, emission);
    }
  }
  return std::nullopt;
}

std::optional<IntervalVector> RetainedHistory::correlated_self_displacement(
    const Interval& reception,
    const Interval& emission) const {
  if (emission.upper() > reception.lower() ||
      !covers(emission) || !covers(reception)) {
    return std::nullopt;
  }
  if (const auto same_segment =
          same_segment_correlated_displacement(reception, emission);
      same_segment.has_value()) {
    return same_segment;
  }

  IntervalVector displacement{
      Interval::point(0.0), Interval::point(0.0), Interval::point(0.0)};
  bool started = false;
  for (const auto& segment : segments_) {
    const bool contains_emission =
        emission.lower() >= segment.t_start_interval().lower() &&
        emission.upper() <= segment.t_end_interval().upper();
    const bool contains_reception =
        reception.lower() >= segment.t_start_interval().lower() &&
        reception.upper() <= segment.t_end_interval().upper();
    if (!started && !contains_emission) {
      continue;
    }
    started = true;
    const Interval local_lower = contains_emission
        ? emission : segment.t_start_interval();
    const Interval local_upper = contains_reception
        ? reception : segment.t_end_interval();
    if (local_lower.upper() > local_upper.lower()) {
      return std::nullopt;
    }
    IntervalVector contribution = subtract(
        segment.nominal_position_interval(local_upper),
        segment.nominal_position_interval(local_lower));
    const double duration = local_upper.upper() - local_lower.lower();
    const double velocity_error = segment.velocity_error() * duration;
    for (auto& component : contribution) {
      component = component.inflate(velocity_error);
    }
    displacement = add(displacement, contribution);
    if (contains_reception) {
      return displacement;
    }
  }
  return std::nullopt;
}

}  // namespace architrino::eom
