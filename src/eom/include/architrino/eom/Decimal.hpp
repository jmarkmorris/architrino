#pragma once

#include <charconv>
#include <cmath>
#include <iomanip>
#include <limits>
#include <locale>
#include <sstream>
#include <stdexcept>
#include <string>
#include <string_view>

namespace architrino::eom {

[[nodiscard]] inline double parse_finite_double(
    std::string_view token,
    std::string_view label) {
  if (token.empty()) {
    throw std::invalid_argument(
        "invalid " + std::string(label) + ": " + std::string(token));
  }
  if (token.front() == '+') {
    token.remove_prefix(1U);
  }
  double value = 0.0;
  const char* const begin = token.data();
  const char* const end = begin + token.size();
  const auto parsed =
      std::from_chars(begin, end, value, std::chars_format::general);
  if (parsed.ec != std::errc{} || parsed.ptr != end ||
      !std::isfinite(value)) {
    throw std::invalid_argument(
        "invalid " + std::string(label) + ": " + std::string(token));
  }
  return value;
}

[[nodiscard]] inline std::string finite_double_token(double value) {
  if (!std::isfinite(value)) {
    throw std::invalid_argument("double token must be finite");
  }
  std::ostringstream stream;
  stream.imbue(std::locale::classic());
  stream << std::setprecision(std::numeric_limits<double>::max_digits10)
         << value;
  return stream.str();
}

}  // namespace architrino::eom
