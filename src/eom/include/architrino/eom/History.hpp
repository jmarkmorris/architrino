#pragma once

#include "architrino/eom/Interval.hpp"

#include <array>
#include <cstddef>
#include <string>
#include <vector>

namespace architrino::eom {

using CubicCoefficientTokens =
    std::array<std::array<std::string, 4>, 3>;

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

 private:
  [[nodiscard]] Interval polynomial_interval(
      const std::array<std::string, 4>& coefficients,
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
};

class RetainedHistory {
 public:
  RetainedHistory(std::string history_id,
                  std::vector<CubicHistorySegment> segments);

  [[nodiscard]] const std::string& history_id() const noexcept {
    return history_id_;
  }
  [[nodiscard]] const std::vector<CubicHistorySegment>& segments() const
      noexcept {
    return segments_;
  }
  [[nodiscard]] const std::string& provenance_fingerprint() const noexcept {
    return provenance_fingerprint_;
  }
  [[nodiscard]] double t_start() const noexcept;
  [[nodiscard]] double t_end() const noexcept;
  [[nodiscard]] bool covers(const Interval& time) const noexcept;
  [[nodiscard]] std::size_t segment_index_at(double time) const;
  [[nodiscard]] IntervalVector position_hull(const Interval& time) const;
  [[nodiscard]] IntervalVector velocity_hull(const Interval& time) const;

 private:
  std::string history_id_;
  std::vector<CubicHistorySegment> segments_;
  std::string provenance_fingerprint_;
};

}  // namespace architrino::eom
