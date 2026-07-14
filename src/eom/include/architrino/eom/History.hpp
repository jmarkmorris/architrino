#pragma once

#include "architrino/eom/Interval.hpp"

#include <array>
#include <cstddef>
#include <cstdint>
#include <iterator>
#include <memory>
#include <optional>
#include <string>
#include <utility>
#include <vector>

namespace architrino::eom {

using CubicCoefficientTokens =
    std::array<std::array<std::string, 4>, 3>;
using CubicCoefficientIntervals =
    std::array<std::array<Interval, 4>, 3>;

struct UniformCircularHistoryRequest {
  std::string t_start;
  std::string t_end;
  std::string maximum_segment_step;
  std::string cylindrical_radius;
  std::string height;
  std::string angular_speed;
  // Exact kinematic datum. The factory constructs the analytic radius as
  // tangential_speed / |angular_speed| after checking the supplied nominal
  // radius agrees within the binary64 construction envelope.
  std::string tangential_speed;
  std::string phase;
  std::string tilt_x = "0";
  std::string tilt_y = "0";
};

struct UniformCircularEndpointCertificate {
  std::string schema;
  std::string valid_start_time;
  std::string valid_reception_time;
  std::string maximum_segment_step;
  std::string tangential_speed;
  std::string cylindrical_radius;
  std::string angular_speed;
  std::string height;
  std::string phase;
  std::string tilt_x;
  std::string tilt_y;
};

struct UniformCircularAnalyticState {
  IntervalVector position;
  IntervalVector velocity;
  IntervalVector acceleration;
};

class CubicHistorySegment {
 public:
  CubicHistorySegment(
      std::string t_start,
      std::string t_end,
      CubicCoefficientTokens coefficients,
      std::string position_error = "0",
      std::string velocity_error = "0");

  [[nodiscard]] double t_start() const noexcept { return t_start_; }
  [[nodiscard]] double t_end() const noexcept { return t_end_; }
  [[nodiscard]] const Interval& t_start_interval() const noexcept {
    return t_start_interval_;
  }
  [[nodiscard]] const Interval& t_end_interval() const noexcept {
    return t_end_interval_;
  }
  [[nodiscard]] const std::string& t_start_token() const noexcept {
    return t_start_token_;
  }
  [[nodiscard]] const std::string& t_end_token() const noexcept {
    return t_end_token_;
  }
  [[nodiscard]] const CubicCoefficientTokens& coefficient_tokens() const
      noexcept {
    return coefficient_tokens_;
  }
  [[nodiscard]] const std::string& position_error_token() const noexcept {
    return position_error_token_;
  }
  [[nodiscard]] const std::string& velocity_error_token() const noexcept {
    return velocity_error_token_;
  }
  [[nodiscard]] double position_error() const noexcept {
    return position_error_;
  }
  [[nodiscard]] double velocity_error() const noexcept {
    return velocity_error_;
  }

  [[nodiscard]] IntervalVector position_interval(const Interval& time) const;
  [[nodiscard]] IntervalVector velocity_interval(const Interval& time) const;
  [[nodiscard]] IntervalVector nominal_position_interval(
      const Interval& time) const;
  [[nodiscard]] IntervalVector correlated_displacement_interval(
      const Interval& reception,
      const Interval& emission) const;

 private:
  [[nodiscard]] Interval polynomial_interval(
      const std::array<Interval, 4>& coefficients,
      const Interval& time) const;
  void require_time(const Interval& time) const;

  std::string t_start_token_;
  std::string t_end_token_;
  CubicCoefficientTokens coefficient_tokens_;
  std::string position_error_token_;
  std::string velocity_error_token_;
  double t_start_;
  double t_end_;
  double position_error_;
  double velocity_error_;
  Interval t_start_interval_;
  Interval t_end_interval_;
  CubicCoefficientIntervals coefficient_intervals_;
};

class HistorySegmentSequence {
 public:
  class const_iterator {
   public:
    using iterator_category = std::forward_iterator_tag;
    using value_type = CubicHistorySegment;
    using difference_type = std::ptrdiff_t;
    using pointer = const CubicHistorySegment*;
    using reference = const CubicHistorySegment&;

    reference operator*() const;
    pointer operator->() const;
    const_iterator& operator++();
    const_iterator operator++(int);
    friend bool operator==(
        const const_iterator& left,
        const const_iterator& right) = default;

   private:
    friend class HistorySegmentSequence;
    const_iterator(const HistorySegmentSequence* owner, std::size_t index)
        : owner_(owner), index_(index) {}

    const HistorySegmentSequence* owner_ = nullptr;
    std::size_t index_ = 0;
  };

  explicit HistorySegmentSequence(std::vector<CubicHistorySegment> segments);

  [[nodiscard]] std::size_t size() const noexcept;
  [[nodiscard]] bool empty() const noexcept { return size() == 0U; }
  [[nodiscard]] const CubicHistorySegment& operator[](
      std::size_t index) const;
  [[nodiscard]] const CubicHistorySegment& front() const;
  [[nodiscard]] const CubicHistorySegment& back() const;
  [[nodiscard]] const_iterator begin() const { return {this, 0U}; }
  [[nodiscard]] const_iterator end() const { return {this, size()}; }
  [[nodiscard]] HistorySegmentSequence appended(
      CubicHistorySegment segment) const;

 private:
  struct Storage;
  explicit HistorySegmentSequence(std::shared_ptr<const Storage> storage)
      : storage_(std::move(storage)) {}

  std::shared_ptr<const Storage> storage_;
};

class RetainedHistory {
 public:
  RetainedHistory(std::string history_id,
                  std::vector<CubicHistorySegment> segments);

  [[nodiscard]] static RetainedHistory uniform_circular(
      std::string history_id,
      const UniformCircularHistoryRequest& request);
  [[nodiscard]] static RetainedHistory restore_uniform_circular(
      std::string history_id,
      const UniformCircularHistoryRequest& request,
      std::vector<CubicHistorySegment> segments);

  [[nodiscard]] const std::string& history_id() const noexcept {
    return history_id_;
  }
  [[nodiscard]] const HistorySegmentSequence& segments() const
      noexcept {
    return segments_;
  }
  [[nodiscard]] const std::string& provenance_fingerprint() const noexcept {
    return provenance_fingerprint_;
  }
  [[nodiscard]] const IntervalVector& full_position_hull() const noexcept {
    return *full_position_hull_;
  }
  [[nodiscard]] const std::optional<UniformCircularEndpointCertificate>&
  uniform_circular_endpoint_certificate() const noexcept {
    return uniform_circular_endpoint_certificate_;
  }
  [[nodiscard]] std::optional<UniformCircularAnalyticState>
  uniform_circular_analytic_state(const Interval& time) const;
  [[nodiscard]] double t_start() const noexcept;
  [[nodiscard]] double t_end() const noexcept;
  [[nodiscard]] bool covers(const Interval& time) const noexcept;
  [[nodiscard]] std::size_t segment_index_at(double time) const;
  [[nodiscard]] IntervalVector position_hull(const Interval& time) const;
  [[nodiscard]] IntervalVector velocity_hull(const Interval& time) const;
  [[nodiscard]] std::optional<IntervalVector>
  same_segment_correlated_displacement(
      const Interval& reception,
      const Interval& emission) const;
  [[nodiscard]] std::optional<IntervalVector> correlated_self_displacement(
      const Interval& reception,
      const Interval& emission) const;
  [[nodiscard]] RetainedHistory appended(CubicHistorySegment segment) const;

 private:
  RetainedHistory(
      std::string history_id,
      HistorySegmentSequence segments,
      std::uint64_t fingerprint_state,
      IntervalVector full_position_hull,
      std::optional<UniformCircularEndpointCertificate>
          uniform_circular_endpoint_certificate);

  std::string history_id_;
  HistorySegmentSequence segments_;
  std::uint64_t fingerprint_state_;
  std::string provenance_fingerprint_;
  std::optional<IntervalVector> full_position_hull_;
  std::optional<UniformCircularEndpointCertificate>
      uniform_circular_endpoint_certificate_;
};

}  // namespace architrino::eom
