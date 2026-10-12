// Scratch control, not production: a real canonical solver step whose
// step-doubling discrepancy is tiny while its integration error is not.
//
// Geometry, all on the z axis, c_f = 1. Receiver starts at rest at the origin.
// One like-charged source has the prescribed past z_s(S) = R + A p(S), where p
// is a C1 piecewise-cubic function of period 1: p rises from 0 to 1 over
// [k, k + 1/2] as 12 t^2 - 16 t^3 and falls back over [k + 1/2, k + 1].
// With A = 0 the source is static, which is the analytically known case.
//
// Usage: aliasing_control <amplitude> <coupling> <step> <mode>
//   mode "diagnostic": canonical acceleration at a FIXED receiver at several
//        reception times, with both histories prescribed through those times.
//   mode "evolve": the solver's own evolution from T = 0 over one step.
#include "architrino/eom/CoupledEvolution.hpp"

#include <iomanip>
#include <iostream>
#include <limits>
#include <sstream>
#include <string>
#include <vector>

namespace eom = architrino::eom;

namespace {

std::string number(double value) {
  std::ostringstream stream;
  stream << std::setprecision(std::numeric_limits<double>::max_digits10)
         << value;
  return stream.str();
}

std::string decimal_product(const std::string& amplitude, int numerator) {
  // amplitude is a finite decimal with at most a few digits; multiply as a
  // scaled integer so the coefficient token is exact.
  const auto point = amplitude.find('.');
  const std::string digits = point == std::string::npos
      ? amplitude
      : amplitude.substr(0, point) + amplitude.substr(point + 1);
  const std::size_t scale =
      point == std::string::npos ? 0U : amplitude.size() - point - 1U;
  long long value = std::stoll(digits) * numerator;
  const bool negative = value < 0;
  if (negative) value = -value;
  std::string text = std::to_string(value);
  while (text.size() <= scale) text.insert(text.begin(), '0');
  if (scale > 0U) text.insert(text.end() - static_cast<long>(scale), '.');
  return (negative ? "-" : "") + text;
}

eom::CubicCoefficientTokens on_z(
    const std::string& c0, const std::string& c1, const std::string& c2,
    const std::string& c3) {
  return {{{"0", "0", "0", "0"}, {"0", "0", "0", "0"}, {c0, c1, c2, c3}}};
}

std::string half_token(int twice) {
  // twice / 2 as an exact decimal
  const bool negative = twice < 0;
  const int magnitude = negative ? -twice : twice;
  std::string text = std::to_string(magnitude / 2);
  if (magnitude % 2 != 0) text += ".5";
  return (negative ? "-" : "") + text;
}

// Source history on [-20, end], end an integer >= 0.
eom::RetainedHistory source_history(
    const std::string& amplitude, int end, const std::string& base) {
  std::vector<eom::CubicHistorySegment> segments;
  const std::string up2 = decimal_product(amplitude, 12);
  const std::string up3 = decimal_product(amplitude, -16);
  const std::string down2 = decimal_product(amplitude, -12);
  const std::string down3 = decimal_product(amplitude, 16);
  // base + amplitude as an exact decimal: both have at most 3 fraction digits.
  const double top_value = std::stod(base) + std::stod(amplitude);
  std::ostringstream top_stream;
  top_stream << std::fixed << std::setprecision(6) << top_value;
  std::string top = top_stream.str();
  while (top.back() == '0') top.pop_back();
  if (top.back() == '.') top.pop_back();
  for (int twice = -40; twice < 2 * end; ++twice) {
    const bool rising = (twice % 2 + 2) % 2 == 0;
    segments.emplace_back(
        half_token(twice), half_token(twice + 1),
        rising ? on_z(base, "0", up2, up3) : on_z(top, "0", down2, down3));
  }
  return eom::RetainedHistory("source-history", std::move(segments));
}

eom::RetainedHistory receiver_history(int end) {
  return eom::RetainedHistory(
      "receiver-history",
      {eom::CubicHistorySegment(
          "-20", std::to_string(end), on_z("0", "0", "0", "0"))});
}

eom::NativeCoupledEvolutionRequest make_request(
    const std::string& amplitude,
    const std::string& coupling,
    const std::string& step,
    int history_end,
    const std::string& root_tolerance = "1e-10",
    const std::string& acceleration_tolerance = "1e-9") {
  eom::NativeCoupledEvolutionRequest request{
      .run_id = "aliasing-control",
      .paths = {{"receiver", "1", receiver_history(history_end)},
                {"source", "1", source_history(amplitude, history_end, "10")}},
      .start_time = "0",
      .end_time = step,
      .initial_step = step,
      .minimum_step = step,
      .maximum_step = step,
      .field_speed = "1",
      .coupling = coupling,
      .root_tolerance = root_tolerance,
      .transmitter_factor_floor = "1e-24",
      .acceleration_tolerance = acceleration_tolerance,
      .position_tolerance = "1e-8",
      .velocity_tolerance = "1e-8",
      .correction_tolerance = "1e-10",
      .root_max_depth = 192,
      .root_max_cells = 300000,
      .initial_mpfr_bits = 128,
      .maximum_mpfr_bits = 512,
      .max_correction_iterations = 24,
      .max_step_attempts = 4,
      .max_rejected_steps = 2,
      .thread_count = 1,
  };
  return request;
}

void print_interval(const eom::Interval& value) {
  std::cout << "[" << number(value.lower()) << "," << number(value.upper())
            << "]";
}

}  // namespace

int main(int argc, char** argv) {
  if (argc != 5 && argc != 7) {
    std::cerr << "usage: aliasing_control <amplitude> <coupling> <step> "
                 "<diagnostic|evolve>\n";
    return 2;
  }
  const std::string amplitude = argv[1];
  const std::string coupling = argv[2];
  const std::string step = argv[3];
  const std::string mode = argv[4];
  const std::string root_tolerance = argc == 7 ? argv[5] : "1e-10";
  const std::string acceleration_tolerance = argc == 7 ? argv[6] : "1e-9";
  try {
    if (mode == "diagnostic") {
      // Both histories prescribed through T = 2. Fixed receiver.
      const auto request = make_request(
          amplitude, coupling, step, 2, root_tolerance, acceleration_tolerance);
      std::vector<eom::NativePublishedPath> histories;
      for (const auto& path : request.paths) {
        histories.push_back({path.path_id, path.history});
      }
      for (const std::string time :
           {"0", "0.125", "0.25", "0.35", "0.375", "0.5", "0.625", "0.75",
            "0.85", "0.875", "1", "1.25", "1.5", "1.75", "2"}) {
        const auto snapshot = eom::certify_native_acceleration_snapshot(
            request, histories, time);
        std::cout << "{\"mode\":\"diagnostic\",\"amplitude\":\"" << amplitude
                  << "\",\"coupling\":\"" << coupling << "\",\"time\":\""
                  << time << "\",\"status\":\"" << snapshot.status
                  << "\",\"failure_code\":\"" << snapshot.failure_code << "\"";
        for (const auto& total : snapshot.acceleration.receiver_totals) {
          if (total.receiver_path_id == "receiver") {
            std::cout << ",\"receiver_acceleration_z\":";
            print_interval(total.acceleration[2]);
          }
        }
        std::cout << "}\n";
      }
      return 0;
    }
    if (mode == "evolve") {
      const auto request = make_request(
          amplitude, coupling, step, 0, root_tolerance, acceleration_tolerance);
      const auto result = eom::evolve_native_coupled_histories(request);
      std::cout << "{\"mode\":\"evolve\",\"amplitude\":\"" << amplitude
                << "\",\"coupling\":\"" << coupling << "\",\"step\":\"" << step
                << "\",\"root_tolerance\":\"" << root_tolerance
                << "\",\"acceleration_tolerance\":\""
                << acceleration_tolerance
                << "\",\"status\":\"" << result.status
                << "\",\"halt_code\":\"" << result.halt_code
                << "\",\"accepted_end_time\":\"" << result.accepted_end_time
                << "\",\"accepted_steps\":" << result.accepted_step_count
                << ",\"rejected_steps\":" << result.rejected_step_count;
      if (!result.steps.empty()) {
        const auto& last = result.steps.back();
        std::cout << ",\"last_step_status\":\"" << last.status
                  << "\",\"last_step_failure\":\"" << last.failure_code
                  << "\",\"local_errors\":[";
        bool first = true;
        for (const auto& error : last.local_errors) {
          std::cout << (first ? "" : ",") << "{\"path\":\"" << error.path_id
                    << "\",\"position_error_z\":"
                    << number(error.position_errors[2])
                    << ",\"velocity_error_z\":"
                    << number(error.velocity_errors[2]) << "}";
          first = false;
        }
        std::cout << "]";
        if (last.recertification_snapshot.has_value()) {
          const auto& snap = *last.recertification_snapshot;
          std::cout << ",\"recertification\":{\"status\":\"" << snap.status
                    << "\",\"failure_code\":\"" << snap.failure_code
                    << "\",\"acceleration_status\":\""
                    << snap.acceleration.status
                    << "\",\"acceleration_failure\":\""
                    << snap.acceleration.failure_code << "\",\"roots\":[";
          bool first_root = true;
          for (const auto& root : snap.root_certificates) {
            std::cout << (first_root ? "" : ",") << "{\"receiver\":\""
                      << root.receiver_path_id << "\",\"transmitter\":\""
                      << root.transmitter_path_id << "\",\"status\":\""
                      << root.certificate.status << "\",\"failure\":\""
                      << root.certificate.failure_code
                      << "\",\"searched_lower\":\""
                      << root.certificate.searched_lower
                      << "\",\"root_free_complement\":"
                      << (root.certificate.root_free_complement ? "true"
                                                                : "false")
                      << ",\"memory_boundary_contact\":"
                      << (root.certificate.memory_boundary_contact ? "true"
                                                                   : "false")
                      << "}";
            first_root = false;
          }
          std::cout << "],\"pairs\":[";
          bool first_pair = true;
          for (const auto& pair : snap.acceleration.pair_certificates) {
            std::cout << (first_pair ? "" : ",") << "{\"receiver\":\""
                      << pair.receiver_path_id << "\",\"transmitter\":\""
                      << pair.transmitter_path_id << "\",\"chart\":\""
                      << pair.chart << "\",\"status\":\"" << pair.status
                      << "\",\"failure\":\"" << pair.failure_code << "\"}";
            first_pair = false;
          }
          std::cout << "]}";
        }
        for (std::size_t index = 0; index < last.substeps.size(); ++index) {
          const auto& sub = last.substeps[index];
          std::cout << ",\"substep_" << index << "\":{\"start\":\""
                    << sub.start_time << "\",\"end\":\"" << sub.end_time
                    << "\",\"status\":\"" << sub.status
                    << "\",\"failure\":\"" << sub.failure_code
                    << "\",\"iterations\":" << sub.correction_iterations
                    << "}";
        }
      }
      std::cout << ",\"paths\":[";
      bool first_path = true;
      for (const auto& path : result.histories) {
        const double end = path.history.t_end();
        const eom::Interval at_end = eom::Interval::point(end);
        const auto position = path.history.position_hull(at_end);
        const auto velocity = path.history.velocity_hull(at_end);
        const auto last = path.history.segments().back();
        std::cout << (first_path ? "" : ",") << "{\"path\":\"" << path.path_id
                  << "\",\"segments\":" << path.history.segments().size()
                  << ",\"t_end\":" << number(end) << ",\"position_z\":";
        print_interval(position[2]);
        std::cout << ",\"velocity_z\":";
        print_interval(velocity[2]);
        std::cout << ",\"last_segment\":{\"t_start\":\"" << last.t_start_token()
                  << "\",\"t_end\":\"" << last.t_end_token()
                  << "\",\"z_coefficients\":[\""
                  << last.coefficient_tokens()[2][0] << "\",\""
                  << last.coefficient_tokens()[2][1] << "\",\""
                  << last.coefficient_tokens()[2][2] << "\",\""
                  << last.coefficient_tokens()[2][3]
                  << "\"],\"position_error_z\":\""
                  << last.position_error_tokens()[2]
                  << "\",\"velocity_error_z\":\""
                  << last.velocity_error_tokens()[2] << "\"}}";
        first_path = false;
      }
      std::cout << "]}\n";
      return 0;
    }
    std::cerr << "unknown mode\n";
    return 2;
  } catch (const std::exception& error) {
    std::cout << "{\"mode\":\"" << mode << "\",\"exception\":\"" << error.what()
              << "\"}\n";
    return 1;
  }
}
