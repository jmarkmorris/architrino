// Data-only History API inspector. No root API, charge, coupling or evolution request.
// The separately pinned Python producer owns input/source capture and supervision.
#include "architrino/eom/History.hpp"

#include <boost/multiprecision/cpp_int.hpp>

#include <array>
#include <bit>
#include <cfenv>
#include <cmath>
#include <cstdint>
#include <iomanip>
#include <iostream>
#include <limits>
#include <regex>
#include <sstream>
#include <stdexcept>
#include <string>
#include <vector>

namespace {
namespace eom = architrino::eom;
using Integer = boost::multiprecision::cpp_int;
using Rational = boost::multiprecision::cpp_rational;
constexpr std::size_t kMembers = 12, kSegments = 51;

void require(bool condition, const char* reason) {
  if (!condition) throw std::runtime_error(reason);
}

// Character-at-a-time framing refuses an oversized line before allocating it.
std::string line() {
  std::string value;
  for (char c; std::cin.get(c);) {
    if (c == '\n') return value;
    require(c >= 0x20 && c <= 0x7e && value.size() < 512,
            "bounded ASCII protocol line required");
    value.push_back(c);
  }
  throw std::runtime_error("truncated inspector protocol");
}

Integer ten(unsigned exponent) {
  Integer value = 1;
  for (unsigned i = 0; i < exponent; ++i) value *= 10;
  return value;
}

Rational exact_decimal(const std::string& token) {
  static const std::regex syntax(R"(-?(0|[1-9][0-9]*)(\.[0-9]+)?([eE][+-]?[0-9]+)?)");
  require(!token.empty() && token.size() <= 512 && std::regex_match(token, syntax),
          "invalid decimal token");
  const auto marker = token.find_first_of("eE");
  const std::string mantissa = token.substr(0, marker);
  int exponent = 0;
  if (marker != std::string::npos) {
    const auto suffix = token.substr(marker + 1);
    require(suffix.size() <= 5, "decimal exponent too long");
    exponent = std::stoi(suffix);
    require(exponent >= -1024 && exponent <= 1024, "decimal exponent out of range");
  }
  Integer numerator = 0;
  unsigned fractional = 0;
  bool after_point = false;
  for (char c : mantissa) {
    if (c == '-') continue;
    if (c == '.') { after_point = true; continue; }
    numerator = numerator * 10 + (c - '0');
    if (after_point) ++fractional;
  }
  if (mantissa.front() == '-') numerator = -numerator;
  const int scale = exponent - static_cast<int>(fractional);
  if (scale < 0) return Rational(numerator) / ten(static_cast<unsigned>(-scale));
  return Rational(numerator * ten(static_cast<unsigned>(scale)));
}

std::string decimal_line() {
  auto token = line();
  (void)exact_decimal(token);
  return token;
}

std::string quote(const std::string& value) {
  std::string result = "\"";
  for (char c : value) {
    require(c >= 0x20 && c <= 0x7e, "non-ASCII output string");
    if (c == '"' || c == '\\') result += '\\';
    result += c;
  }
  return result + '"';
}

std::string bits(double value) {
  require(std::isfinite(value), "nonfinite inspector value");
  std::ostringstream out;
  out << std::hex << std::setfill('0') << std::setw(16)
      << std::bit_cast<std::uint64_t>(value);
  return quote(out.str());
}

template<class Range, class Encode>
std::string array(const Range& values, Encode encode) {
  std::string result = "[";
  for (const auto& value : values) {
    if (result.size() != 1) result += ',';
    result += encode(value);
  }
  return result + ']';
}

std::string rational_json(const Rational& value) {
  return "{\"numerator\":" + quote(boost::multiprecision::numerator(value).str()) +
         ",\"denominator\":" + quote(boost::multiprecision::denominator(value).str()) + '}';
}

std::string vector_boxes(const eom::IntervalVector& vector) {
  return array(vector, [](const auto& box) {
    return "{\"lowerBits\":" + bits(box.lower()) + ",\"upperBits\":" + bits(box.upper()) + '}';
  });
}

std::string state_json(const eom::IntervalVector& position, const eom::IntervalVector& velocity) {
  return "{\"position\":" + vector_boxes(position) + ",\"velocity\":" + vector_boxes(velocity) + '}';
}

std::string segment_json(const eom::CubicHistorySegment& s, std::size_t index) {
  const auto token_vector = [](const auto& values) { return array(values, quote); };
  const auto bit_vector = [](const auto& values) { return array(values, bits); };
  return "{\"index\":" + std::to_string(index) +
      ",\"tStart\":" + quote(s.t_start_token()) + ",\"tEnd\":" + quote(s.t_end_token()) +
      ",\"coefficients\":" + array(s.coefficient_tokens(), token_vector) +
      ",\"positionErrors\":" + token_vector(s.position_error_tokens()) +
      ",\"velocityErrors\":" + token_vector(s.velocity_error_tokens()) +
      ",\"parsedBinary64\":{\"tStart\":" + bits(s.t_start()) + ",\"tEnd\":" + bits(s.t_end()) +
      ",\"coefficients\":" + array(s.coefficient_values(), bit_vector) +
      ",\"positionErrors\":" + bit_vector(s.position_errors()) +
      ",\"velocityErrors\":" + bit_vector(s.velocity_errors()) + "}}";
}

std::string expected_worldline(std::size_t index) {
  return "f5-axis-" + std::to_string((index % 6) / 2 + 1) + "-ring-" +
      std::to_string(index % 2 + 1) + (index < 6 ? "-positive-worldline" : "-negative-worldline");
}

std::string inspect_member(std::size_t index) {
  const auto worldline = line();
  require(worldline == expected_worldline(index), "member identity/order differs");
  std::vector<eom::CubicHistorySegment> segments;
  segments.reserve(kSegments);
  for (std::size_t j = 0; j < kSegments; ++j) {
    const auto start = decimal_line(), end = decimal_line();
    eom::CubicCoefficientTokens c;
    eom::HistoryErrorTokens ex, ev;
    for (auto& row : c) for (auto& token : row) token = decimal_line();
    for (auto& token : ex) token = decimal_line();
    for (auto& token : ev) token = decimal_line();
    require(exact_decimal(start) < exact_decimal(end) && exact_decimal(end) <= 0,
            "positive-time or empty input piece");
    for (const auto& token : ex) require(exact_decimal(token) > 0, "positive position allowance required");
    for (const auto& token : ev) require(exact_decimal(token) > 0, "positive velocity allowance required");
    segments.emplace_back(start, end, c, ex, ev);
  }
  require(segments.front().t_start_token() == "-1" && segments.back().t_end_token() == "0",
          "past-only endpoints must remain literal -1 and 0");
  const std::string id = "f5-prehistory/v1/" + worldline;
  const eom::RetainedHistory history(id, segments);
  const auto& last = segments.back();
  const auto time = eom::Interval::point(last.t_end());
  const auto actual = history.endpoint_state_hull();
  std::array<Rational, 3> position, derivative;
  const Rational u = -exact_decimal(last.t_start_token());
  for (std::size_t axis = 0; axis < 3; ++axis) {
    const auto& tokens = last.coefficient_tokens()[axis];
    position[axis] = 0; derivative[axis] = 0;
    Rational power = 1;
    for (std::size_t k = 0; k < 4; ++k) {
      const auto coefficient = exact_decimal(tokens[k]);
      position[axis] += coefficient * power;
      if (k < 3) derivative[axis] += Rational(k + 1) * exact_decimal(tokens[k + 1]) * power;
      power *= u;
    }
  }
  std::string pieces = "[";
  for (std::size_t j = 0; j < segments.size(); ++j) {
    if (j) pieces += ',';
    pieces += segment_json(segments[j], j);
  }
  return "{\"index\":" + std::to_string(index) + ",\"worldlineId\":" + quote(worldline) +
      ",\"restrictedHistoryId\":" + quote(history.history_id()) +
      ",\"historyFingerprint\":" + quote(history.provenance_fingerprint()) +
      ",\"segments\":" + pieces + "]" +
      ",\"release\":{\"nominalPosition\":" + array(position, rational_json) +
      ",\"nominalDerivative\":" + array(derivative, rational_json) +
      ",\"rawFinalPiece\":" + state_json(last.position_interval(time), last.velocity_interval(time)) +
      ",\"endpointState\":" + state_json(actual.position, actual.velocity) + "}}";
}

void runtime_controls() {
  require(std::numeric_limits<double>::is_iec559 && sizeof(double) == 8 &&
          std::fegetround() == FE_TONEAREST, "IEEE binary64 nearest rounding required");
  volatile double normal = std::numeric_limits<double>::min();
  volatile double half = 0.5;
  volatile double subnormal = normal * half;
  require(subnormal > 0 && subnormal == std::numeric_limits<double>::min() / 2,
          "gradual underflow control failed");
  volatile double tiny = std::numeric_limits<double>::denorm_min();
  volatile double one = 1;
  require(tiny * one == std::numeric_limits<double>::denorm_min(), "subnormal input control failed");
}
}  // namespace

int main(int argc, char** argv) {
  try {
    require(argc == 2, "usage: eom_f5_prehistory_inspector --inspect | --help");
    if (std::string(argv[1]) == "--help") {
      std::cout << "Data-only history inspector; stdin: f5-prehistory-inspector/v1, then 12 ordered\n"
                   "worldline IDs, each followed by 51 pieces x20 original decimal-token lines, then end.\n"
                   "No roots, coupling, charges, future history or evolution request.\n";
      return 0;
    }
    require(std::string(argv[1]) == "--inspect", "unknown inspector operation");
    runtime_controls();
    require(line() == "f5-prehistory-inspector/v1", "protocol version differs");
    std::string members = "[";
    for (std::size_t index = 0; index < kMembers; ++index) {
      if (index) members += ',';
      members += inspect_member(index);
      std::cerr << "{\"event\":\"member-inspected\",\"completedMembers\":" << index + 1 << "}\n" << std::flush;
    }
    require(line() == "end" && std::cin.peek() == std::char_traits<char>::eof(), "extra protocol input");
    std::cout << "{\"schema\":\"braid-program/f5-prehistory-inspection.v1\",\"completed\":true,"
                 "\"runtimeControlsPassed\":true,\"members\":" << members << "]}\n" << std::flush;
    require(std::cout.good(), "inspection output failed");
    return 0;
  } catch (const std::exception& error) {
    std::cerr << "F5 history inspection failed: " << error.what() << '\n';
    return 1;
  }
}
