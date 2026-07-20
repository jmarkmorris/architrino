#include "architrino/eom/ShadowAffineDiagnostic.hpp"

#include <algorithm>
#include <array>
#include <cmath>
#include <cstdlib>
#include <fstream>
#include <iomanip>
#include <limits>
#include <map>
#include <numeric>
#include <optional>
#include <sstream>
#include <stdexcept>
#include <utility>

namespace architrino::eom {
namespace {

using Row = std::vector<double>;
using VectorRows = std::array<Row, 3>;

struct AffineState {
  VectorRows position;
  VectorRows velocity;
};

struct AffineSegment {
  double start = 0.0;
  double end = 0.0;
  std::array<std::array<Row, 4>, 3> position_coefficients;
  VectorRows position_extra;
  VectorRows velocity_extra;
};

struct SymbolMeta {
  std::string id;
  std::string source;
  std::string path_id;
  std::string transmitter_path_id;
  std::string axis;
  std::string time;
  double magnitude = 0.0;
};

struct SnapshotFreshSymbols {
  std::map<std::string, std::size_t> root_slots;
  std::map<std::string, std::size_t> acceleration_slots;
};

struct FailedCandidateCapture {
  std::string run_id;
  std::string start_time;
  std::string end_time;
  std::string failure_code;
  std::size_t iteration = 0U;
  std::vector<NativePublishedPath> histories;
};

double token(const std::string& value) {
  char* end = nullptr;
  const double parsed = std::strtod(value.c_str(), &end);
  if (end == value.c_str() || *end != '\0' || !std::isfinite(parsed)) {
    throw std::invalid_argument("shadow affine diagnostic received a nonfinite token");
  }
  return parsed;
}

std::string json_escape(const std::string& value) {
  std::ostringstream stream;
  for (const unsigned char character : value) {
    switch (character) {
      case '"': stream << "\\\""; break;
      case '\\': stream << "\\\\"; break;
      case '\n': stream << "\\n"; break;
      case '\r': stream << "\\r"; break;
      case '\t': stream << "\\t"; break;
      default:
        if (character < 0x20U) {
          stream << "\\u" << std::hex << std::setw(4) << std::setfill('0')
                 << static_cast<unsigned>(character) << std::dec;
        } else {
          stream << static_cast<char>(character);
        }
    }
  }
  return stream.str();
}

Row zero_row(std::size_t count) { return Row(count, 0.0); }

Row add_row(const Row& left, const Row& right) {
  Row result(left.size(), 0.0);
  for (std::size_t index = 0U; index < result.size(); ++index) {
    result[index] = left[index] + right[index];
  }
  return result;
}

Row subtract_row(const Row& left, const Row& right) {
  Row result(left.size(), 0.0);
  for (std::size_t index = 0U; index < result.size(); ++index) {
    result[index] = left[index] - right[index];
  }
  return result;
}

Row scale_row(const Row& row, double scale) {
  Row result(row.size(), 0.0);
  for (std::size_t index = 0U; index < result.size(); ++index) {
    result[index] = row[index] * scale;
  }
  return result;
}

double row_radius(const Row& row) {
  double result = 0.0;
  for (const double coefficient : row) result += std::abs(coefficient);
  return result;
}

std::array<double, 3> add3(
    const std::array<double, 3>& left,
    const std::array<double, 3>& right) {
  return {left[0] + right[0], left[1] + right[1], left[2] + right[2]};
}

std::array<double, 3> subtract3(
    const std::array<double, 3>& left,
    const std::array<double, 3>& right) {
  return {left[0] - right[0], left[1] - right[1], left[2] - right[2]};
}

std::array<double, 3> scale3(
    const std::array<double, 3>& value, double scale) {
  return {value[0] * scale, value[1] * scale, value[2] * scale};
}

double dot3(
    const std::array<double, 3>& left,
    const std::array<double, 3>& right) {
  return left[0] * right[0] + left[1] * right[1] + left[2] * right[2];
}

double norm3(const std::array<double, 3>& value) {
  return std::sqrt(dot3(value, value));
}

const NativePublishedPath& path_history(
    const std::vector<NativePublishedPath>& histories,
    const std::string& path_id) {
  const auto found = std::find_if(
      histories.begin(), histories.end(), [&](const auto& path) {
        return path.path_id == path_id;
      });
  if (found == histories.end()) {
    throw std::invalid_argument("shadow affine diagnostic lacks a path history");
  }
  return *found;
}

std::string root_key(
    const NativePairAccelerationCertificate& pair,
    const NativeAccelerationRow& row) {
  return pair.receiver_path_id + "|" + pair.transmitter_path_id + "|" +
      row.reception_time + "|" + std::to_string(row.row_index) + "|" +
      row.emission_lower + "|" + row.emission_upper;
}

std::string acceleration_key(const std::string& path_id, std::size_t axis) {
  return path_id + "|" + std::to_string(axis);
}

}  // namespace

struct ShadowAffineDiagnostic::Impl {
  explicit Impl(ShadowAffineDiagnosticOptions supplied)
      : options(std::move(supplied)), output(options.output_path, std::ios::app) {
    if (options.output_path.empty()) {
      throw std::invalid_argument("shadow affine diagnostic output path is empty");
    }
    if (options.symbol_cap < 32U) {
      throw std::invalid_argument("shadow affine diagnostic symbol cap is below 32");
    }
    if (!output) {
      throw std::runtime_error("cannot open shadow affine diagnostic output");
    }
    output << "{\"record\":\"observer_start\",\"schema\":"
              "\"eom_shadow_affine_diagnostic/v1\",\"authority\":"
              "\"non_authoritative_binary64_round_to_nearest\","
              "\"symbolCap\":" << options.symbol_cap << "}\n";
    output.flush();
  }

  ShadowAffineDiagnosticOptions options;
  std::ofstream output;
  std::vector<SymbolMeta> symbols;
  std::map<std::string, AffineState> current;
  std::map<std::string, VectorRows> current_acceleration;
  std::map<std::string, std::vector<AffineSegment>> segments;
  double current_time = std::numeric_limits<double>::quiet_NaN();
  std::size_t next_symbol_id = 0U;
  std::size_t global_step_index = 0U;
  std::string active_run_id;
  std::optional<FailedCandidateCapture> failed_candidate;

  template <typename Visitor>
  void visit_rows(Visitor&& visitor) {
    for (auto& [path_id, state] : current) {
      static_cast<void>(path_id);
      for (auto& row : state.position) visitor(row);
      for (auto& row : state.velocity) visitor(row);
    }
    for (auto& [path_id, acceleration] : current_acceleration) {
      static_cast<void>(path_id);
      for (auto& row : acceleration) visitor(row);
    }
    for (auto& [path_id, path_segments] : segments) {
      static_cast<void>(path_id);
      for (auto& segment : path_segments) {
        for (auto& axis : segment.position_coefficients) {
          for (auto& row : axis) visitor(row);
        }
        for (auto& row : segment.position_extra) visitor(row);
        for (auto& row : segment.velocity_extra) visitor(row);
      }
    }
  }

  void resize_all(std::size_t count) {
    visit_rows([&](Row& row) { row.resize(count, 0.0); });
  }

  void condense_for(std::size_t needed) {
    if (symbols.size() + needed <= options.symbol_cap) return;
    if (needed > options.symbol_cap) {
      throw std::runtime_error("one shadow affine allocation exceeds symbol cap");
    }
    const std::size_t free_required = symbols.size() + needed - options.symbol_cap;
    const std::size_t target_count = std::min(
        symbols.size(), std::max(free_required + 1U, std::size_t{32U}));
    std::vector<double> magnitude(symbols.size(), 0.0);
    visit_rows([&](Row& row) {
      for (std::size_t index = 0U; index < row.size(); ++index) {
        magnitude[index] = std::max(magnitude[index], std::abs(row[index]));
      }
    });
    std::vector<std::size_t> selected(symbols.size());
    std::iota(selected.begin(), selected.end(), 0U);
    std::stable_sort(selected.begin(), selected.end(), [&](auto left, auto right) {
      return magnitude[left] < magnitude[right];
    });
    selected.resize(target_count);
    std::sort(selected.begin(), selected.end());
    const std::size_t target = selected.front();
    std::ostringstream ids;
    for (std::size_t offset = 0U; offset < selected.size(); ++offset) {
      if (offset > 0U) ids << ',';
      ids << '"' << json_escape(symbols[selected[offset]].id) << '"';
    }
    visit_rows([&](Row& row) {
      double hull = 0.0;
      for (const std::size_t index : selected) hull += std::abs(row[index]);
      row[target] = hull;
      for (auto index = selected.rbegin(); index != selected.rend(); ++index) {
        if (*index != target) row.erase(row.begin() + static_cast<std::ptrdiff_t>(*index));
      }
    });
    SymbolMeta merged{
        .id = "eps-" + std::to_string(next_symbol_id++),
        .source = "hull_condensation",
        .axis = "all",
        .time = std::isfinite(current_time) ? std::to_string(current_time) : "initial",
    };
    for (auto index = selected.rbegin(); index != selected.rend(); ++index) {
      if (*index != target) symbols.erase(symbols.begin() + static_cast<std::ptrdiff_t>(*index));
    }
    symbols[target] = merged;
    output << "{\"record\":\"condensation\",\"grade\":\"measured\","
              "\"mergedSymbols\":[" << ids.str() << "],\"replacement\":\""
           << merged.id << "\",\"activeAfter\":" << symbols.size() << "}\n";
  }

  std::vector<std::size_t> allocate(std::vector<SymbolMeta> metadata) {
    if (metadata.empty()) return {};
    condense_for(metadata.size());
    const std::size_t first = symbols.size();
    for (auto& item : metadata) {
      item.id = "eps-" + std::to_string(next_symbol_id++);
      output << "{\"record\":\"symbol\",\"grade\":\"measured\","
                "\"id\":\"" << item.id << "\",\"source\":\""
             << json_escape(item.source) << "\",\"pathId\":\""
             << json_escape(item.path_id) << "\",\"transmitterPathId\":\""
             << json_escape(item.transmitter_path_id) << "\",\"axis\":\""
             << json_escape(item.axis) << "\",\"time\":\""
             << json_escape(item.time) << "\",\"magnitude\":"
             << std::setprecision(17) << item.magnitude << "}\n";
      symbols.push_back(std::move(item));
    }
    resize_all(symbols.size());
    std::vector<std::size_t> slots(metadata.size());
    std::iota(slots.begin(), slots.end(), first);
    return slots;
  }

  Row zero() const { return zero_row(symbols.size()); }

  AffineState zero_state() const {
    AffineState result;
    for (auto& row : result.position) row = zero();
    for (auto& row : result.velocity) row = zero();
    return result;
  }

  VectorRows zero_vector_rows() const {
    VectorRows result;
    for (auto& row : result) row = zero();
    return result;
  }

  void initialize(
      const NativeCoupledEvolutionRequest& request,
      const std::vector<NativePublishedPath>& input_histories) {
    if (std::isfinite(current_time)) return;
    current_time = token(request.start_time);
    for (const auto& path : input_histories) current.emplace(path.path_id, zero_state());
    output << "{\"record\":\"initial_state\",\"grade\":\"inferred\","
              "\"time\":" << std::setprecision(17) << current_time
           << ",\"initialRetainedErrorsModeled\":false,"
              "\"falsifier\":\"nonzero initial retained-history error tokens\"}\n";
  }

  AffineState evaluate(const std::string& path_id, double time) const {
    const double scale = std::max({1.0, std::abs(time), std::abs(current_time)});
    if (std::abs(time - current_time) <= 32.0 * std::numeric_limits<double>::epsilon() * scale) {
      const auto found = current.find(path_id);
      if (found != current.end()) return found->second;
    }
    const auto found = segments.find(path_id);
    if (found == segments.end()) return zero_state();
    const AffineSegment* selected = nullptr;
    for (auto segment = found->second.rbegin(); segment != found->second.rend(); ++segment) {
      const double envelope = 32.0 * std::numeric_limits<double>::epsilon() *
          std::max({1.0, std::abs(segment->start), std::abs(segment->end)});
      if (time >= segment->start - envelope && time <= segment->end + envelope) {
        selected = &*segment;
        break;
      }
    }
    if (selected == nullptr) return zero_state();
    const double local = std::clamp(time, selected->start, selected->end) - selected->start;
    AffineState result = zero_state();
    for (std::size_t axis = 0U; axis < 3U; ++axis) {
      Row position = selected->position_coefficients[axis][3];
      for (int degree = 2; degree >= 0; --degree) {
        position = add_row(
            scale_row(position, local),
            selected->position_coefficients[axis][static_cast<std::size_t>(degree)]);
      }
      Row velocity = scale_row(selected->position_coefficients[axis][3], 3.0 * local * local);
      velocity = add_row(
          velocity, scale_row(selected->position_coefficients[axis][2], 2.0 * local));
      velocity = add_row(velocity, selected->position_coefficients[axis][1]);
      result.position[axis] = add_row(position, selected->position_extra[axis]);
      result.velocity[axis] = add_row(velocity, selected->velocity_extra[axis]);
    }
    return result;
  }

  SnapshotFreshSymbols allocate_snapshot_fresh(
      const NativeAccelerationSnapshotCertificate& snapshot) {
    std::vector<SymbolMeta> metadata;
    std::vector<std::string> keys;
    for (const auto& pair : snapshot.acceleration.pair_certificates) {
      for (const auto& row : pair.rows) {
        if (row.chart != "sharp_root") continue;
        const double width = 0.5 * std::max(0.0, token(row.emission_upper) - token(row.emission_lower));
        metadata.push_back({
            .source = "consumed_root_time_enclosure_half_width",
            .path_id = pair.receiver_path_id,
            .transmitter_path_id = pair.transmitter_path_id,
            .axis = "root_time",
            .time = row.reception_time,
            .magnitude = width,
        });
        keys.push_back("root:" + root_key(pair, row));
      }
    }
    for (const auto& receiver : snapshot.acceleration.receiver_totals) {
      for (std::size_t axis = 0U; axis < 3U; ++axis) {
        metadata.push_back({
            .source = "accepted_acceleration_enclosure_half_width",
            .path_id = receiver.receiver_path_id,
            .axis = std::to_string(axis),
            .time = snapshot.reception_time,
            .magnitude = 0.5 * receiver.acceleration[axis].width(),
        });
        keys.push_back("acc:" + acceleration_key(receiver.receiver_path_id, axis));
      }
    }
    const auto slots = allocate(std::move(metadata));
    SnapshotFreshSymbols result;
    for (std::size_t index = 0U; index < keys.size(); ++index) {
      if (keys[index].starts_with("root:")) {
        result.root_slots.emplace(keys[index].substr(5U), slots[index]);
      } else {
        result.acceleration_slots.emplace(keys[index].substr(4U), slots[index]);
      }
    }
    return result;
  }

  std::array<double, 3> nominal_acceleration(
      const RetainedHistory& history, double time) const {
    const std::size_t index = history.segment_index_at(time);
    const auto& segment = history.segments()[index];
    const double local = time - segment.t_start();
    std::array<double, 3> result{};
    for (std::size_t axis = 0U; axis < 3U; ++axis) {
      const auto& coefficient = segment.coefficient_values()[axis];
      result[axis] = 2.0 * coefficient[2] + 6.0 * coefficient[3] * local;
    }
    return result;
  }

  VectorRows compute_acceleration(
      const NativeCoupledEvolutionRequest&,
      const NativeAccelerationSnapshotCertificate& snapshot,
      const std::vector<NativePublishedPath>& histories,
      const std::string& receiver_id,
      const SnapshotFreshSymbols& fresh) const {
    VectorRows result = zero_vector_rows();
    const double reception = token(snapshot.reception_time);
    for (const auto& pair : snapshot.acceleration.pair_certificates) {
      if (pair.receiver_path_id != receiver_id) continue;
      const auto& receiver_history = path_history(histories, pair.receiver_path_id).history;
      const auto& transmitter_history = path_history(histories, pair.transmitter_path_id).history;
      const auto receiver_affine = evaluate(pair.receiver_path_id, reception);
      const auto xr = receiver_history.nominal_position(reception);
      for (const auto& row : pair.rows) {
        if (row.chart != "sharp_root" || !row.transmitter_factor.has_value() ||
            !row.receiver_factor.has_value() ||
            !row.acceleration_weight.has_value()) continue;
        const double emission = 0.5 * (token(row.emission_lower) + token(row.emission_upper));
        const auto transmitter_affine = evaluate(pair.transmitter_path_id, emission);
        const auto xs = transmitter_history.nominal_position(emission);
        const auto vs = transmitter_history.nominal_velocity(emission);
        const auto transmitter_acceleration = nominal_acceleration(transmitter_history, emission);
        const auto displacement = subtract3(xr, xs);
        const double separation = norm3(displacement);
        const double transmitter_factor = row.transmitter_factor->midpoint();
        if (!(separation > 0.0) || transmitter_factor == 0.0) continue;
        const auto direction = scale3(displacement, 1.0 / separation);
        const double strength = row.acceleration_weight->midpoint();
        const double signed_scale = static_cast<double>(row.polarity) *
            row.charge_product_magnitude.midpoint() * row.coupling.midpoint();
        const double inverse_r3 = 1.0 / (separation * separation * separation);
        const double inverse_r5 = inverse_r3 / (separation * separation);
        const auto inverse_square_direction = scale3(displacement, inverse_r3);
        for (std::size_t symbol = 0U; symbol < symbols.size(); ++symbol) {
          std::array<double, 3> dxr{}, dxs{}, dvs{};
          for (std::size_t axis = 0U; axis < 3U; ++axis) {
            dxr[axis] = receiver_affine.position[axis][symbol];
            dxs[axis] = transmitter_affine.position[axis][symbol];
            dvs[axis] = transmitter_affine.velocity[axis][symbol];
          }
          const double delta_emission =
              (dot3(direction, dxs) - dot3(direction, dxr)) / transmitter_factor;
          const auto dxs_total = add3(dxs, scale3(vs, delta_emission));
          const auto dvs_total = add3(dvs, scale3(transmitter_acceleration, delta_emission));
          const auto delta_displacement = subtract3(dxr, dxs_total);
          const double radial_delta = dot3(direction, delta_displacement);
          const auto delta_direction = scale3(
              subtract3(delta_displacement, scale3(direction, radial_delta)),
              1.0 / separation);
          const double delta_transmitter_factor =
              -(dot3(delta_direction, vs) + dot3(direction, dvs_total));
          const double delta_strength =
              -strength * delta_transmitter_factor / transmitter_factor;
          const auto delta_inverse_square = subtract3(
              scale3(delta_displacement, inverse_r3),
              scale3(displacement, 3.0 * dot3(displacement, delta_displacement) * inverse_r5));
          const auto delta_acceleration = scale3(
              add3(scale3(inverse_square_direction, delta_strength),
                   scale3(delta_inverse_square, strength)),
              signed_scale);
          for (std::size_t axis = 0U; axis < 3U; ++axis) {
            result[axis][symbol] += delta_acceleration[axis];
          }
        }
        const auto root_found = fresh.root_slots.find(root_key(pair, row));
        if (root_found != fresh.root_slots.end()) {
          const std::size_t symbol = root_found->second;
          const double delta_emission =
              0.5 * std::max(0.0, token(row.emission_upper) - token(row.emission_lower));
          const auto delta_displacement = scale3(vs, -delta_emission);
          const double radial_delta = dot3(direction, delta_displacement);
          const auto delta_direction = scale3(
              subtract3(delta_displacement, scale3(direction, radial_delta)),
              1.0 / separation);
          const auto delta_source_velocity = scale3(transmitter_acceleration, delta_emission);
          const double delta_transmitter_factor =
              -(dot3(delta_direction, vs) + dot3(direction, delta_source_velocity));
          const double delta_strength =
              -strength * delta_transmitter_factor / transmitter_factor;
          const auto delta_inverse_square = subtract3(
              scale3(delta_displacement, inverse_r3),
              scale3(displacement, 3.0 * dot3(displacement, delta_displacement) * inverse_r5));
          const auto delta_acceleration = scale3(
              add3(scale3(inverse_square_direction, delta_strength),
                   scale3(delta_inverse_square, strength)),
              signed_scale);
          for (std::size_t axis = 0U; axis < 3U; ++axis) {
            result[axis][symbol] += delta_acceleration[axis];
          }
        }
      }
    }
    for (std::size_t axis = 0U; axis < 3U; ++axis) {
      const auto found = fresh.acceleration_slots.find(acceleration_key(receiver_id, axis));
      if (found == fresh.acceleration_slots.end()) continue;
      const auto total = std::find_if(
          snapshot.acceleration.receiver_totals.begin(),
          snapshot.acceleration.receiver_totals.end(), [&](const auto& row) {
            return row.receiver_path_id == receiver_id;
          });
      if (total != snapshot.acceleration.receiver_totals.end()) {
        result[axis][found->second] += 0.5 * total->acceleration[axis].width();
      }
    }
    return result;
  }

  std::map<std::string, VectorRows> compute_snapshot_accelerations(
      const NativeCoupledEvolutionRequest& request,
      const NativeAccelerationSnapshotCertificate& snapshot,
      const std::vector<NativePublishedPath>& histories,
      const SnapshotFreshSymbols& fresh) const {
    std::map<std::string, VectorRows> result;
    for (const auto& path : request.paths) {
      result.emplace(path.path_id, compute_acceleration(
          request, snapshot, histories, path.path_id, fresh));
    }
    return result;
  }

  AffineSegment make_segment(
      const AffineState& start,
      const VectorRows& acceleration_start,
      const VectorRows& acceleration_end,
      double begin,
      double end) const {
    const double step = end - begin;
    AffineSegment segment;
    segment.start = begin;
    segment.end = end;
    for (std::size_t axis = 0U; axis < 3U; ++axis) {
      segment.position_coefficients[axis][0] = start.position[axis];
      segment.position_coefficients[axis][1] = start.velocity[axis];
      segment.position_coefficients[axis][2] = scale_row(acceleration_start[axis], 0.5);
      segment.position_coefficients[axis][3] = scale_row(
          subtract_row(acceleration_end[axis], acceleration_start[axis]),
          1.0 / (6.0 * step));
      segment.position_extra[axis] = zero();
      segment.velocity_extra[axis] = zero();
    }
    return segment;
  }

  AffineState endpoint(const AffineSegment& segment) const {
    AffineState state = zero_state();
    const double step = segment.end - segment.start;
    for (std::size_t axis = 0U; axis < 3U; ++axis) {
      Row position = segment.position_coefficients[axis][3];
      for (int degree = 2; degree >= 0; --degree) {
        position = add_row(
            scale_row(position, step),
            segment.position_coefficients[axis][static_cast<std::size_t>(degree)]);
      }
      Row velocity = scale_row(segment.position_coefficients[axis][3], 3.0 * step * step);
      velocity = add_row(
          velocity, scale_row(segment.position_coefficients[axis][2], 2.0 * step));
      velocity = add_row(velocity, segment.position_coefficients[axis][1]);
      state.position[axis] = add_row(position, segment.position_extra[axis]);
      state.velocity[axis] = add_row(velocity, segment.velocity_extra[axis]);
    }
    return state;
  }

  const NativeCorrectedSubstepCertificate* published_substep(
      const NativeAtomicStepCertificate& step, double begin, double end) const {
    const NativeCorrectedSubstepCertificate* result = nullptr;
    for (const auto& substep : step.substeps) {
      if (!substep.endpoint_snapshot.has_value()) continue;
      const double local_begin = token(substep.start_time);
      const double local_end = token(substep.end_time);
      const double scale = std::max({1.0, std::abs(begin), std::abs(end)});
      if (std::abs(local_begin - begin) <= 64.0 * std::numeric_limits<double>::epsilon() * scale &&
          std::abs(local_end - end) <= 64.0 * std::numeric_limits<double>::epsilon() * scale) {
        result = &substep;
      }
    }
    return result;
  }

  void process_accepted_step(
      const NativeCoupledEvolutionRequest& request,
      const std::vector<NativePublishedPath>& input_histories,
      const NativeAtomicStepCertificate& step,
      bool rejected_candidate = false) {
    const auto& published = rejected_candidate &&
            step.diagnostic_candidate_histories.has_value()
        ? *step.diagnostic_candidate_histories
        : step.published_histories;
    std::size_t new_segment_count = std::numeric_limits<std::size_t>::max();
    for (const auto& path : published) {
      const auto& input = path_history(input_histories, path.path_id);
      if (path.history.segments().size() < input.history.segments().size()) {
        throw std::runtime_error("shadow affine observed lost history");
      }
      new_segment_count = std::min(
          new_segment_count,
          path.history.segments().size() - input.history.segments().size());
    }
    if (new_segment_count == 0U || new_segment_count == std::numeric_limits<std::size_t>::max()) return;

    if (current_acceleration.empty()) {
      const auto* first = published_substep(
          step, token(step.attempted_start),
          published.front().history.segments()[
              path_history(input_histories, published.front().path_id).history.segments().size()].t_end());
      if (first == nullptr) first = step.substeps.empty() ? nullptr : &step.substeps.front();
      if (first != nullptr) {
        const auto fresh = allocate_snapshot_fresh(first->start_snapshot);
        current_acceleration = compute_snapshot_accelerations(
            request, first->start_snapshot, published, fresh);
      }
    }

    std::map<std::string, std::size_t> first_new_index;
    for (const auto& path : published) {
      first_new_index[path.path_id] =
          path_history(input_histories, path.path_id).history.segments().size();
    }
    std::vector<std::pair<std::string, std::size_t>> added_segments;
    for (std::size_t local_index = 0U; local_index < new_segment_count; ++local_index) {
      const auto& reference_path = published.front();
      const auto& reference_segment = reference_path.history.segments()[
          first_new_index.at(reference_path.path_id) + local_index];
      const double begin = reference_segment.t_start();
      const double end = reference_segment.t_end();
      const auto* substep = published_substep(step, begin, end);
      if (substep == nullptr || !substep->endpoint_snapshot.has_value()) {
        throw std::runtime_error("shadow affine cannot match a published substep");
      }
      const auto fresh = allocate_snapshot_fresh(*substep->endpoint_snapshot);
      auto acceleration_end = current_acceleration;
      if (acceleration_end.empty()) {
        for (const auto& path : request.paths) {
          acceleration_end.emplace(path.path_id, zero_vector_rows());
        }
      }
      const auto start_state = current;
      double settling_error = 0.0;
      for (std::size_t iteration = 0U; iteration < request.max_correction_iterations; ++iteration) {
        for (const auto& path : request.paths) {
          auto segment = make_segment(
              start_state.at(path.path_id), current_acceleration.at(path.path_id),
              acceleration_end.at(path.path_id), begin, end);
          auto& path_segments = segments[path.path_id];
          if (!path_segments.empty() && path_segments.back().start == begin &&
              path_segments.back().end == end) {
            path_segments.back() = std::move(segment);
          } else {
            path_segments.push_back(std::move(segment));
          }
          current[path.path_id] = endpoint(path_segments.back());
        }
        current_time = end;
        auto evaluated = compute_snapshot_accelerations(
            request, *substep->endpoint_snapshot, published, fresh);
        settling_error = 0.0;
        for (const auto& path : request.paths) {
          for (std::size_t axis = 0U; axis < 3U; ++axis) {
            const auto& left = acceleration_end.at(path.path_id)[axis];
            const auto& right = evaluated.at(path.path_id)[axis];
            for (std::size_t symbol = 0U; symbol < symbols.size(); ++symbol) {
              settling_error = std::max(
                  settling_error, std::abs(left[symbol] - right[symbol]));
            }
          }
        }
        acceleration_end = std::move(evaluated);
        if (settling_error <= 1e-13) break;
      }
      for (const auto& path : request.paths) {
        auto segment = make_segment(
            start_state.at(path.path_id), current_acceleration.at(path.path_id),
            acceleration_end.at(path.path_id), begin, end);
        auto& path_segments = segments[path.path_id];
        path_segments.back() = std::move(segment);
        current[path.path_id] = endpoint(path_segments.back());
        added_segments.emplace_back(path.path_id, path_segments.size() - 1U);
      }
      current_time = end;
      current_acceleration = std::move(acceleration_end);
      output << "{\"record\":\"substep\",\"grade\":\"inferred\","
                "\"globalStep\":" << global_step_index << ",\"start\":"
             << std::setprecision(17) << begin << ",\"end\":" << end
             << ",\"linearizedCorrectorSettlingError\":" << settling_error
             << ",\"falsifier\":\"repeat with a smaller finite-difference or analytic Jacobian cross-check\"}\n";
    }

    std::vector<SymbolMeta> local_metadata;
    struct LocalInjection { std::string path_id; std::size_t axis; bool position; double magnitude; };
    std::vector<LocalInjection> injections;
    for (const auto& error : step.local_errors) {
      for (std::size_t axis = 0U; axis < 3U; ++axis) {
        local_metadata.push_back({
            .source = "four_quarter_position_endpoint_difference",
            .path_id = error.path_id,
            .axis = std::to_string(axis),
            .time = step.accepted_time,
            .magnitude = error.position_errors[axis],
        });
        injections.push_back({error.path_id, axis, true, error.position_errors[axis]});
        local_metadata.push_back({
            .source = "four_quarter_velocity_endpoint_difference",
            .path_id = error.path_id,
            .axis = std::to_string(axis),
            .time = step.accepted_time,
            .magnitude = error.velocity_errors[axis],
        });
        injections.push_back({error.path_id, axis, false, error.velocity_errors[axis]});
      }
    }
    const auto local_slots = allocate(std::move(local_metadata));
    for (std::size_t index = 0U; index < injections.size(); ++index) {
      const auto& injection = injections[index];
      const std::size_t slot = local_slots[index];
      auto& state = current.at(injection.path_id);
      if (injection.position) {
        state.position[injection.axis][slot] += injection.magnitude;
      } else {
        state.velocity[injection.axis][slot] += injection.magnitude;
      }
      for (const auto& [path_id, segment_index] : added_segments) {
        if (path_id != injection.path_id) continue;
        auto& segment = segments[path_id][segment_index];
        if (injection.position) {
          segment.position_extra[injection.axis][slot] += injection.magnitude;
        } else {
          segment.velocity_extra[injection.axis][slot] += injection.magnitude;
        }
      }
    }

    if (step.accepted_snapshot.has_value()) {
      const auto fresh = allocate_snapshot_fresh(*step.accepted_snapshot);
      current_acceleration = compute_snapshot_accelerations(
          request, *step.accepted_snapshot, published, fresh);
    }

    const double atomic_h = token(step.accepted_time) - token(step.attempted_start);
    output << "{\"record\":\""
           << (rejected_candidate ? "rejected_candidate_step" : "step")
           << "\",\"grade\":\"measured_and_inferred\","
              "\"globalStep\":" << global_step_index << ",\"runId\":\""
           << json_escape(request.run_id) << "\",\"acceptedTime\":"
           << std::setprecision(17) << current_time << ",\"symbolCount\":"
           << symbols.size() << ",\"paths\":[";
    bool first_path = true;
    for (const auto& path : published) {
      if (!first_path) output << ',';
      first_path = false;
      const auto& input = path_history(input_histories, path.path_id).history.segments().back();
      const auto& final_segment = path.history.segments().back();
      const auto local = std::find_if(
          step.local_errors.begin(), step.local_errors.end(), [&](const auto& row) {
            return row.path_id == path.path_id;
          });
      const NativeReceiverAcceleration* total = nullptr;
      if (step.accepted_snapshot.has_value()) {
        const auto found = std::find_if(
            step.accepted_snapshot->acceleration.receiver_totals.begin(),
            step.accepted_snapshot->acceleration.receiver_totals.end(), [&](const auto& row) {
              return row.receiver_path_id == path.path_id;
            });
        if (found != step.accepted_snapshot->acceleration.receiver_totals.end()) {
          total = &*found;
        }
      }
      output << "{\"pathId\":\"" << json_escape(path.path_id) << "\",\"axes\":[";
      for (std::size_t axis = 0U; axis < 3U; ++axis) {
        if (axis > 0U) output << ',';
        const double acceleration_radius = total == nullptr
            ? 0.0 : 0.5 * total->acceleration[axis].width();
        const double local_position = local == step.local_errors.end()
            ? 0.0 : local->position_errors[axis];
        const double local_velocity = local == step.local_errors.end()
            ? 0.0 : local->velocity_errors[axis];
        output << "{\"axis\":" << axis
               << ",\"certifiedPositionRadiusIncrement\":"
               << (final_segment.position_errors()[axis] - input.position_errors()[axis])
               << ",\"certifiedVelocityRadiusIncrement\":"
               << (final_segment.velocity_errors()[axis] - input.velocity_errors()[axis])
               << ",\"freshPositionLocal\":" << local_position
               << ",\"freshVelocityLocal\":" << local_velocity
               << ",\"feedbackPosition_hEv\":"
               << atomic_h * input.velocity_errors()[axis]
               << ",\"feedbackPosition_half_h2_ra\":"
               << 0.5 * atomic_h * atomic_h * acceleration_radius
               << ",\"feedbackVelocity_h_ra\":"
               << atomic_h * acceleration_radius
               << ",\"shadowPositionWidth\":"
               << 2.0 * row_radius(current.at(path.path_id).position[axis])
               << ",\"shadowVelocityWidth\":"
               << 2.0 * row_radius(current.at(path.path_id).velocity[axis])
               << '}';
      }
      output << "]}";
    }
    output << "],\"falsifier\":\"recompute increments directly from the named segment error tokens\"}\n";
    record_step_event_enclosures(request, step, published, "accepted_step");
    if (!rejected_candidate) ++global_step_index;
  }

  std::optional<double> joint_residual_width(
      const std::vector<NativePublishedPath>& histories,
      const std::string& receiver_id,
      const std::string& transmitter_id,
      double reception,
      double emission) const {
    const auto& receiver = path_history(histories, receiver_id).history;
    const auto& source = path_history(histories, transmitter_id).history;
    const auto normalize_time = [](const RetainedHistory& history, double time)
        -> std::optional<double> {
      const double envelope = 128.0 * std::numeric_limits<double>::epsilon() *
          std::max({1.0, std::abs(time), std::abs(history.t_start()),
                    std::abs(history.t_end())});
      if (time < history.t_start() - envelope ||
          time > history.t_end() + envelope) return std::nullopt;
      return std::clamp(time, history.t_start(), history.t_end());
    };
    const auto safe_reception = normalize_time(receiver, reception);
    const auto safe_emission = normalize_time(source, emission);
    if (!safe_reception.has_value() || !safe_emission.has_value()) {
      return std::nullopt;
    }
    reception = *safe_reception;
    emission = *safe_emission;
    const auto displacement = subtract3(
        receiver.nominal_position(reception), source.nominal_position(emission));
    const double separation = norm3(displacement);
    if (!(separation > 0.0)) return std::nullopt;
    const auto direction = scale3(displacement, 1.0 / separation);
    const auto receiver_affine = evaluate(receiver_id, reception);
    const auto transmitter_affine = evaluate(transmitter_id, emission);
    Row projection = zero();
    for (std::size_t axis = 0U; axis < 3U; ++axis) {
      projection = add_row(
          projection,
          scale_row(
              subtract_row(
                  receiver_affine.position[axis], transmitter_affine.position[axis]),
              direction[axis]));
    }
    return 2.0 * row_radius(projection);
  }

  void record_step_event_enclosures(
      const NativeCoupledEvolutionRequest& request,
      const NativeAtomicStepCertificate& step,
      const std::vector<NativePublishedPath>& histories,
      const char* phase) {
    for (const auto& substep : step.substeps) {
      for (const auto& regulator : substep.regulator_convergence_certificates) {
        const auto& event = regulator.accepted_event_impulse;
        if (event.reception_lower.empty() || event.reception_upper.empty()) continue;
        const double reception = 0.5 * (
            token(event.reception_lower) + token(event.reception_upper));
        double emission = reception;
        const auto root = std::find_if(
            substep.start_snapshot.root_certificates.begin(),
            substep.start_snapshot.root_certificates.end(), [&](const auto& row) {
              return row.receiver_path_id == regulator.receiver_path_id &&
                  row.transmitter_path_id == regulator.transmitter_path_id &&
                  !row.certificate.roots.empty();
            });
        if (root != substep.start_snapshot.root_certificates.end()) {
          emission = 0.5 * (token(root->certificate.roots.front().lower) +
                            token(root->certificate.roots.front().upper));
        }
        const auto width = joint_residual_width(
            histories, regulator.receiver_path_id, regulator.transmitter_path_id,
            reception, emission);
        if (!width.has_value()) continue;
        const double support = event.causal_width.empty()
            ? 0.0 : std::abs(token(event.causal_width));
        const double recorded_box_state_width = 2.0 * (
            event.receiver_position_error_upper +
            event.transmitter_position_error_upper +
            support * (event.receiver_velocity_error_upper +
                       event.transmitter_velocity_error_upper));
        const double dependency_scale = recorded_box_state_width > 0.0
            ? std::min(1.0, *width / recorded_box_state_width) : 1.0;
        const double shadow_event_width =
            event.last_maximum_component_width * dependency_scale;
        output << "{\"record\":\"event_enclosure\",\"grade\":\"inferred\","
                  "\"runId\":\"" << json_escape(request.run_id)
               << "\",\"phase\":\"" << phase
               << "\",\"receiverPathId\":\""
               << json_escape(regulator.receiver_path_id)
               << "\",\"transmitterPathId\":\""
               << json_escape(regulator.transmitter_path_id)
               << "\",\"receptionTime\":" << std::setprecision(17) << reception
               << ",\"emissionTime\":" << emission
               << ",\"shadowProjectedResidualWidthEstimate\":" << *width
               << ",\"recordedBoxStateWidth\":" << recorded_box_state_width
               << ",\"dependencyScale\":" << dependency_scale
               << ",\"shadowEventEnclosureWidthEstimate\":"
               << shadow_event_width
               << ",\"recordedLastMaximumComponentWidth\":"
               << event.last_maximum_component_width
               << ",\"researchLadderSlice\":1.5e-8,"
                  "\"falsifier\":\"direct affine propagation through the finite-width quadrature exceeds this state-projection estimate\"}\n";
      }
    }
  }

  void record_terminal_diagnostics(
      const NativeCoupledEvolutionRequest& request,
      const NativeCoupledEvolutionCertificate& result) {
    const NativeAtomicStepCertificate* terminal_step = nullptr;
    for (auto step = result.steps.rbegin(); step != result.steps.rend(); ++step) {
      if (step->status != "accepted") {
        terminal_step = &*step;
        break;
      }
    }
    if (terminal_step == nullptr) return;
    const std::vector<NativePublishedPath>* terminal_histories = &result.histories;
    std::optional<NativeAtomicStepCertificate> captured_step;
    if (terminal_step->diagnostic_candidate_histories.has_value()) {
      process_accepted_step(
          request, result.histories, *terminal_step, true);
      terminal_histories = &*terminal_step->diagnostic_candidate_histories;
    } else if (failed_candidate.has_value() &&
               failed_candidate->run_id == request.run_id) {
      captured_step = *terminal_step;
      captured_step->diagnostic_candidate_histories =
          failed_candidate->histories;
      process_accepted_step(request, result.histories, *captured_step, true);
      terminal_histories = &*captured_step->diagnostic_candidate_histories;
    }
    {
      const auto& step = *terminal_step;
      const auto record_snapshot = [&](const NativeAccelerationSnapshotCertificate& snapshot) {
        for (const auto& root : snapshot.root_certificates) {
          const auto& certificate = root.certificate;
          if (!certificate.has_difficult_cell || certificate.difficult_point.empty()) continue;
          const double reception = token(certificate.reception_time);
          const double emission = token(certificate.difficult_point);
          const auto width = joint_residual_width(
              *terminal_histories, root.receiver_path_id, root.transmitter_path_id,
              reception, emission);
          if (!width.has_value()) {
            const auto& receiver_history =
                path_history(*terminal_histories, root.receiver_path_id).history;
            const auto& transmitter_history =
                path_history(*terminal_histories, root.transmitter_path_id).history;
            output << "{\"record\":\"joint_residual_unavailable\","
                      "\"runId\":\"" << json_escape(request.run_id)
                   << "\",\"receiverPathId\":\""
                   << json_escape(root.receiver_path_id)
                   << "\",\"transmitterPathId\":\""
                   << json_escape(root.transmitter_path_id)
                   << "\",\"receptionTime\":" << std::setprecision(17)
                   << reception << ",\"emissionTime\":" << emission
                   << ",\"receiverHistoryStart\":" << receiver_history.t_start()
                   << ",\"receiverHistoryEnd\":" << receiver_history.t_end()
                   << ",\"transmitterHistoryStart\":" << transmitter_history.t_start()
                   << ",\"transmitterHistoryEnd\":" << transmitter_history.t_end()
                   << "}\n";
            continue;
          }
          const double box_width = token(certificate.difficult_point_residual_upper) -
              token(certificate.difficult_point_residual_lower);
          output << "{\"record\":\"joint_residual\",\"grade\":\"inferred\","
                    "\"runId\":\"" << json_escape(request.run_id)
                 << "\",\"presetId\":\""
                 << json_escape(request.certified_budget_preset_id)
                 << "\",\"receiverPathId\":\""
                 << json_escape(root.receiver_path_id)
                 << "\",\"transmitterPathId\":\""
                 << json_escape(root.transmitter_path_id)
                 << "\",\"receptionTime\":" << std::setprecision(17) << reception
                 << ",\"emissionTime\":" << emission
                 << ",\"shadowWidth\":" << *width
                 << ",\"linearizationSlackWidth\":" << 2.0 * *width
                 << ",\"recordedBoxWidth\":" << box_width
                 << ",\"transmitterFactorLower\":\""
                 << json_escape(certificate.difficult_transmitter_factor_lower)
                 << "\",\"transmitterFactorUpper\":\""
                 << json_escape(certificate.difficult_transmitter_factor_upper)
                 << "\",\"falsifier\":\"an independently differentiated nominal map gives a projected width at or above the recorded ceiling\"}\n";
        }
      };
      for (const auto& substep : step.substeps) {
        record_snapshot(substep.start_snapshot);
        if (substep.endpoint_snapshot.has_value()) record_snapshot(*substep.endpoint_snapshot);
        for (const auto& regulator : substep.regulator_convergence_certificates) {
          const auto& event = regulator.accepted_event_impulse;
          const double reception = 0.5 * (
              token(event.reception_lower) + token(event.reception_upper));
          double emission = reception;
          const auto root = std::find_if(
              substep.start_snapshot.root_certificates.begin(),
              substep.start_snapshot.root_certificates.end(), [&](const auto& row) {
                return row.receiver_path_id == regulator.receiver_path_id &&
                    row.transmitter_path_id == regulator.transmitter_path_id &&
                    !row.certificate.roots.empty();
              });
          if (root != substep.start_snapshot.root_certificates.end()) {
            emission = 0.5 * (token(root->certificate.roots.front().lower) +
                              token(root->certificate.roots.front().upper));
          }
          const auto width = joint_residual_width(
              *terminal_histories, regulator.receiver_path_id,
              regulator.transmitter_path_id, reception, emission);
          if (!width.has_value()) continue;
          const double support = event.causal_width.empty()
              ? 0.0 : std::abs(token(event.causal_width));
          const double recorded_box_state_width = 2.0 * (
              event.receiver_position_error_upper +
              event.transmitter_position_error_upper +
              support * (event.receiver_velocity_error_upper +
                         event.transmitter_velocity_error_upper));
          const double dependency_scale = recorded_box_state_width > 0.0
              ? std::min(1.0, *width / recorded_box_state_width) : 1.0;
          const double shadow_event_width =
              event.last_maximum_component_width * dependency_scale;
          output << "{\"record\":\"event_enclosure\",\"grade\":\"inferred\","
                    "\"runId\":\"" << json_escape(request.run_id)
                 << "\",\"receiverPathId\":\""
                 << json_escape(regulator.receiver_path_id)
                 << "\",\"transmitterPathId\":\""
                 << json_escape(regulator.transmitter_path_id)
                 << "\",\"receptionTime\":" << std::setprecision(17) << reception
                 << ",\"emissionTime\":" << emission
                 << ",\"shadowProjectedResidualWidthEstimate\":" << *width
                 << ",\"recordedBoxStateWidth\":" << recorded_box_state_width
                 << ",\"dependencyScale\":" << dependency_scale
                 << ",\"shadowEventEnclosureWidthEstimate\":"
                 << shadow_event_width
                 << ",\"recordedLastMaximumComponentWidth\":"
                 << event.last_maximum_component_width
                 << ",\"researchLadderSlice\":1.5e-8,"
                    "\"falsifier\":\"direct affine propagation through the finite-width quadrature exceeds this state-projection estimate\"}\n";
        }
      }
      if (step.accepted_snapshot.has_value()) record_snapshot(*step.accepted_snapshot);
      if (step.recertification_snapshot.has_value()) {
        record_snapshot(*step.recertification_snapshot);
      }
    }
  }

  void begin(const std::string& run_id) noexcept {
    active_run_id = run_id;
    failed_candidate.reset();
  }

  void capture(
      const std::string& start_time,
      const std::string& end_time,
      const std::string& failure_code,
      std::size_t iteration,
      const std::vector<NativePublishedPath>& histories) {
    failed_candidate = FailedCandidateCapture{
        .run_id = active_run_id,
        .start_time = start_time,
        .end_time = end_time,
        .failure_code = failure_code,
        .iteration = iteration,
        .histories = histories,
    };
  }

  void consume(
      const NativeCoupledEvolutionRequest& request,
      const std::vector<NativePublishedPath>& input_histories,
      const NativeCoupledEvolutionCertificate& result) {
    initialize(request, input_histories);
    output << "{\"record\":\"run_start\",\"grade\":\"measured\","
              "\"runId\":\"" << json_escape(request.run_id)
           << "\",\"presetId\":\""
           << json_escape(request.certified_budget_preset_id)
           << "\",\"allocationHash\":\""
           << json_escape(request.certified_budget_allocation_hash)
           << "\",\"start\":\"" << json_escape(request.start_time)
           << "\",\"end\":\"" << json_escape(request.end_time) << "\"}\n";
    auto histories = input_histories;
    for (const auto& step : result.steps) {
      if (step.status != "accepted") continue;
      process_accepted_step(request, histories, step);
      histories = step.published_histories;
    }
    record_terminal_diagnostics(request, result);
    output << "{\"record\":\"run_end\",\"grade\":\"measured\","
              "\"runId\":\"" << json_escape(request.run_id)
           << "\",\"status\":\"" << json_escape(result.status)
           << "\",\"haltCode\":\"" << json_escape(result.halt_code)
           << "\",\"acceptedEndTime\":\""
           << json_escape(result.accepted_end_time)
           << "\",\"activeSymbols\":" << symbols.size() << "}\n";
    output.flush();
  }
};

ShadowAffineDiagnostic::ShadowAffineDiagnostic(ShadowAffineDiagnosticOptions options)
    : impl_(std::make_unique<Impl>(std::move(options))) {}

ShadowAffineDiagnostic::~ShadowAffineDiagnostic() = default;
ShadowAffineDiagnostic::ShadowAffineDiagnostic(ShadowAffineDiagnostic&&) noexcept = default;
ShadowAffineDiagnostic& ShadowAffineDiagnostic::operator=(ShadowAffineDiagnostic&&) noexcept = default;

void ShadowAffineDiagnostic::consume_evolution(
    const NativeCoupledEvolutionRequest& request,
    const std::vector<NativePublishedPath>& input_histories,
    const NativeCoupledEvolutionCertificate& result) {
  impl_->consume(request, input_histories, result);
}

void ShadowAffineDiagnostic::begin_evolution(const std::string& run_id) noexcept {
  impl_->begin(run_id);
}

void ShadowAffineDiagnostic::capture_failed_candidate(
    const std::string& start_time,
    const std::string& end_time,
    const std::string& failure_code,
    std::size_t iteration,
    const std::vector<NativePublishedPath>& histories) {
  impl_->capture(start_time, end_time, failure_code, iteration, histories);
}

}  // namespace architrino::eom
