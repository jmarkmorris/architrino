#define main section86_reference_main
#include "section-86-direct-evolution.cpp"
#undef main

#include "architrino/eom/Checkpoint.hpp"

namespace {

struct TargetRing {
  std::string id;
  double radius;
  double z;
  double omega;
  double phase;
  double alpha;
  int sense;
  int polarity;
  int charge_count;
};

struct Target {
  std::string id;
  std::string section;
  std::string axial_order;
  int handedness;
  std::string speed_regime;
  double drift;
  double fitted_coupling;
  double expected_growth;
  std::array<TargetRing, 3> rings;
};

Target section97_target() {
  return {
      "section_97_best_fully_scored_finalist",
      "97",
      "I-M-O",
      1,
      "sub",
      0.0,
      0.22164267233087945,
      0.721318143353,
      {{{"I", 0.55, 0.0, 0.7811697029643574,
         -0.2827433388230814, -0.47385689191646047, 1, 1, 2},
        {"M", 1.0, 0.0, 0.7811697029643574,
         2.0943951023931953, 0.0, 1, 1, 2},
        {"O", 0.75, 0.0, 0.7811697029643574,
         5.40179403492245, 1.1257373675363425, 1, 1, 2}}}
  };
}

Target section98_moi_target() {
  return {
      "section_98_part_1_m_o_i_24_sample",
      "98",
      "M-O-I",
      -1,
      "sub",
      0.15600000000000003,
      0.7284477337042853,
      0.393849549275,
      {{{"M", 1.0423040833404946, -1.0004399331314409,
         0.45019417846651816, -1.719838432735565,
         -0.25142350192542773, -1, 1, 2},
        {"I", 1.2240525250327166, 0.9678702640402913,
         0.45019417846651816, 2.839546175223731,
         0.3560986876042761, -1, -1, 2},
        {"O", 2.0298219467081178, 0.03256966909114964,
         0.3803048899343244, -1.7180474798194973,
         -0.165849722040702, -1, -1, 2}}}
  };
}

Target target_from_name(const std::string& name) {
  if (name == "section97") return section97_target();
  if (name == "section98-moi") return section98_moi_target();
  throw std::invalid_argument("unknown target: " + name);
}

eom::RetainedHistory target_circular_history(
    const Target& target, const TargetRing& ring, int site,
    double tilt_x, double tilt_y, double depth, double segment_step) {
  if (target.drift != 0.0) {
    throw std::runtime_error(
        "object_blocked_native_uniform_circular_factory_has_no_axial_drift");
  }
  const double cylindrical_radius = ring.radius * std::cos(ring.alpha);
  const double height = ring.z + site * ring.radius * std::sin(ring.alpha);
  const double phase = ring.phase + (site < 0 ? kPi : 0.0);
  const double angular_speed = ring.sense * ring.omega;
  const double tangential_speed =
      std::abs(cylindrical_radius * angular_speed);
  return eom::RetainedHistory::uniform_circular(
      ring.id + (site > 0 ? "+-history" : "--history"),
      {
          .t_start = token(-depth),
          .t_end = "0",
          .maximum_segment_step = token(segment_step),
          .cylindrical_radius = token(cylindrical_radius),
          .height = token(height),
          .angular_speed = token(angular_speed),
          .tangential_speed = token(tangential_speed),
          .phase = token(phase),
          .tilt_x = token(tilt_x),
          .tilt_y = token(tilt_y),
      });
}

std::vector<eom::NativeCoupledPathInput> target_paths(
    const Target& target, const Options& options) {
  const SeedTilts tilts = seed_tilts(options.seed, options.amplitude);
  std::vector<eom::NativeCoupledPathInput> paths;
  paths.reserve(6U);
  for (std::size_t ring_index = 0; ring_index < target.rings.size();
       ++ring_index) {
    const auto& ring = target.rings[ring_index];
    if (ring.charge_count != 2) {
      throw std::runtime_error("object_blocked_nonbinary_primary_ring");
    }
    for (const int site : {1, -1}) {
      const int charge_sign = site * ring.polarity;
      paths.push_back({
          ring.id + (site > 0 ? "+" : "-"),
          charge_sign > 0 ? kCharge : kNegativeCharge,
          target_circular_history(
              target, ring, site, tilts.x[ring_index],
              tilts.y[ring_index], options.history_depth,
              options.history_segment_step)});
    }
  }
  return paths;
}

double target_period(const Target& target) {
  double slowest = std::numeric_limits<double>::infinity();
  for (const auto& ring : target.rings) {
    slowest = std::min(slowest, std::abs(ring.omega));
  }
  return 2.0 * kPi / slowest;
}

void report_object(const Target& target, const Options& options) {
  int charge_sixths = 0;
  double maximum_site_speed = 0.0;
  std::cout << std::setprecision(17)
            << "object target=" << target.id
            << " section=" << target.section
            << " worldlines=6 per_site_charge=abs(e)/6"
            << " axial_order=" << target.axial_order
            << " handedness=" << target.handedness
            << " speed_regime=" << target.speed_regime
            << " field_speed=1 drift=" << target.drift
            << " fitted_coupling=" << target.fitted_coupling
            << " native_coupling=" << 36.0 * target.fitted_coupling
            << " history_depth=" << options.history_depth
            << " history_segment_step=" << options.history_segment_step
            << '\n';
  for (const auto& ring : target.rings) {
    const double transverse_speed =
        std::abs(ring.radius * std::cos(ring.alpha) * ring.omega);
    const double site_speed = std::hypot(transverse_speed, target.drift);
    maximum_site_speed = std::max(maximum_site_speed, site_speed);
    charge_sixths += ring.polarity - ring.polarity;
    std::cout << "ring id=" << ring.id
              << " radius=" << ring.radius
              << " z=" << ring.z
              << " omega=" << ring.omega
              << " phase=" << ring.phase
              << " alpha=" << ring.alpha
              << " sense=" << ring.sense
              << " polarity=" << ring.polarity
              << " charge_count=" << ring.charge_count
              << " site_speed=" << site_speed << '\n';
  }
  std::cout << "object_check net_charge_sixths=" << charge_sixths
            << " maximum_site_speed=" << maximum_site_speed
            << " strictly_sub_field=" << (maximum_site_speed < 1.0)
            << " native_factory_compatible=" << (target.drift == 0.0)
            << '\n';
}

std::vector<eom::NativePublishedPath> published(
    const std::vector<eom::NativeCoupledPathInput>& paths) {
  std::vector<eom::NativePublishedPath> result;
  result.reserve(paths.size());
  for (const auto& path : paths) {
    result.push_back({path.path_id, path.history});
  }
  return result;
}

void write_json_string(std::ostream& output, const std::string& value) {
  output << '"';
  for (const char character : value) {
    switch (character) {
      case '"': output << "\\\""; break;
      case '\\': output << "\\\\"; break;
      case '\n': output << "\\n"; break;
      case '\r': output << "\\r"; break;
      case '\t': output << "\\t"; break;
      default: output << character; break;
    }
  }
  output << '"';
}

void write_segment_json(
    std::ostream& output, const eom::CubicHistorySegment& segment) {
  output << "{\"t_start\":";
  write_json_string(output, segment.t_start_token());
  output << ",\"t_end\":";
  write_json_string(output, segment.t_end_token());
  output << ",\"coefficients\":[";
  const auto& coefficients = segment.coefficient_tokens();
  for (std::size_t axis = 0; axis < coefficients.size(); ++axis) {
    if (axis > 0) output << ',';
    output << '[';
    for (std::size_t term = 0; term < coefficients[axis].size(); ++term) {
      if (term > 0) output << ',';
      write_json_string(output, coefficients[axis][term]);
    }
    output << ']';
  }
  output << "],\"position_error\":";
  write_json_string(output, segment.position_error_token());
  output << ",\"velocity_error\":";
  write_json_string(output, segment.velocity_error_token());
  output << '}';
}

void write_history_json(
    std::ostream& output, const eom::NativePublishedPath& path,
    std::size_t first_segment) {
  output << "{\"path_id\":";
  write_json_string(output, path.path_id);
  output << ",\"history_id\":";
  write_json_string(output, path.history.history_id());
  output << ",\"segments\":[";
  const auto& segments = path.history.segments();
  for (std::size_t index = first_segment; index < segments.size(); ++index) {
    if (index > first_segment) output << ',';
    write_segment_json(output, segments[index]);
  }
  output << "]}";
}

void write_root_rows_json(
    std::ostream& output,
    const eom::NativeAccelerationSnapshotCertificate& snapshot) {
  output << '[';
  for (std::size_t index = 0; index < snapshot.root_certificates.size();
       ++index) {
    if (index > 0) output << ',';
    const auto& row = snapshot.root_certificates[index];
    const auto& certificate = row.certificate;
    output << "{\"receiver_path_id\":";
    write_json_string(output, row.receiver_path_id);
    output << ",\"source_path_id\":";
    write_json_string(output, row.source_path_id);
    output << ",\"status\":";
    write_json_string(output, certificate.status);
    output << ",\"failure_code\":";
    write_json_string(output, certificate.failure_code);
    output << ",\"searched_lower\":";
    write_json_string(output, certificate.searched_lower);
    output << ",\"searched_upper\":";
    write_json_string(output, certificate.searched_upper);
    output << ",\"root_tolerance\":";
    write_json_string(output, certificate.root_tolerance);
    output << ",\"root_free_complement\":"
           << (certificate.root_free_complement ? "true" : "false")
           << ",\"memory_boundary_contact\":"
           << (certificate.memory_boundary_contact ? "true" : "false")
           << ",\"coincident_endpoint_excluded\":"
           << (certificate.coincident_endpoint_excluded ? "true" : "false")
           << ",\"roots\":[";
    for (std::size_t root_index = 0; root_index < certificate.roots.size();
         ++root_index) {
      if (root_index > 0) output << ',';
      const auto& root = certificate.roots[root_index];
      output << "{\"lower\":";
      write_json_string(output, root.lower);
      output << ",\"upper\":";
      write_json_string(output, root.upper);
      output << ",\"source_normal_sign\":" << root.source_normal_sign
             << '}';
    }
    output << "]}";
  }
  output << ']';
}

void write_evolved_root_parity_trace(
    const std::string& path, const eom::NativeCoupledEvolutionRequest& request,
    const std::vector<eom::NativePublishedPath>& initial_histories,
    const eom::NativeAccelerationSnapshotCertificate& initial_snapshot,
    const eom::NativeCoupledEvolutionCertificate& run) {
  if (path.empty()) return;
  std::ofstream output(path);
  if (!output) {
    throw std::runtime_error("cannot open evolved-history parity trace: " + path);
  }
  output << "{\"schema\":\"eom_evolved_history_root_parity_trace/v0\""
         << ",\"run_id\":";
  write_json_string(output, request.run_id);
  output << ",\"field_speed\":";
  write_json_string(output, request.field_speed);
  output << ",\"precision_decimal_digits\":90,\"initial_histories\":[";
  for (std::size_t index = 0; index < initial_histories.size(); ++index) {
    if (index > 0) output << ',';
    write_history_json(output, initial_histories[index], 0U);
  }
  output << "],\"snapshots\":[{\"step_index\":-1,\"reception_time\":";
  write_json_string(output, initial_snapshot.reception_time);
  output << ",\"appended_segments\":[],\"root_certificates\":";
  write_root_rows_json(output, initial_snapshot);
  output << '}';
  std::vector<std::size_t> published_segment_counts;
  published_segment_counts.reserve(initial_histories.size());
  for (const auto& path : initial_histories) {
    published_segment_counts.push_back(path.history.segments().size());
  }
  for (const auto& step : run.steps) {
    if (step.status != "accepted" || !step.accepted_snapshot.has_value()) {
      continue;
    }
    output << ",{\"step_index\":" << step.step_index
           << ",\"reception_time\":";
    write_json_string(output, step.accepted_time);
    output << ",\"appended_segments\":[";
    for (std::size_t index = 0; index < step.published_histories.size();
         ++index) {
      if (index > 0) output << ',';
      write_history_json(
          output, step.published_histories[index],
          published_segment_counts[index]);
      published_segment_counts[index] =
          step.published_histories[index].history.segments().size();
    }
    output << "],\"root_certificates\":";
    write_root_rows_json(output, *step.accepted_snapshot);
    output << '}';
  }
  output << "],\"native_status\":";
  write_json_string(output, run.status);
  output << ",\"native_accepted_end_time\":";
  write_json_string(output, run.accepted_end_time);
  output << ",\"native_halt_code\":";
  write_json_string(output, run.halt_code);
  output << "}\n";
}

void report_step_failures(
    const char* label, const eom::NativeCoupledEvolutionCertificate& run) {
  for (const auto& step : run.steps) {
    if (step.status == "accepted") continue;
    std::cerr << label << " step=" << step.step_index
              << " status=" << step.status
              << " failure=" << step.failure_code << '\n';
    for (const auto& substep : step.substeps) {
      if (!substep.failure_code.empty()) {
        std::cerr << "  substep " << substep.start_time << "->"
                  << substep.end_time
                  << " failure=" << substep.failure_code
                  << " correction_error="
                  << (substep.correction_error.has_value()
                          ? *substep.correction_error
                          : -1.0)
                  << " event_impulses=" << substep.event_impulses.size()
                  << " regulator_certificates="
                  << substep.regulator_convergence_certificates.size()
                  << '\n';
      }
      for (const auto& regulator :
           substep.regulator_convergence_certificates) {
        std::cerr << "    regulator " << regulator.receiver_path_id << "<-"
                  << regulator.source_path_id
                  << " status=" << regulator.status
                  << " failure=" << regulator.failure_code
                  << " required_levels=" << regulator.required_levels
                  << " base_event_status="
                  << regulator.accepted_event_impulse.status
                  << " base_event_failure="
                  << regulator.accepted_event_impulse.failure_code
                  << " base_event_precision="
                  << regulator.accepted_event_impulse.precision_route
                  << ':' << regulator.accepted_event_impulse.precision_bits
                      << " base_event_cells="
                      << regulator.accepted_event_impulse.visited_cells
                      << " base_event_tail_cells="
                      << regulator.accepted_event_impulse.gaussian_tail_cells
                      << " base_event_centered_cells="
                      << regulator.accepted_event_impulse.centered_emission_cells
                      << " base_event_monotone_cells="
                      << regulator.accepted_event_impulse.monotone_residual_cells
                      << " base_event_direct_cells="
                      << regulator.accepted_event_impulse.direct_joint_cells
                      << " base_event_total_width="
                      << regulator.accepted_event_impulse
                             .last_maximum_component_width
                      << " base_event_largest_cell_width="
                      << regulator.accepted_event_impulse
                             .last_largest_cell_width;
        for (const auto& series : regulator.refinement_series) {
          std::cerr << " series=" << series.control_id
                    << ":converged=" << series.converged
                    << ":final_delta="
                    << (series.final_impulse_delta.has_value()
                            ? *series.final_impulse_delta
                            : -1.0)
                    << ":maximum_delta="
                    << (series.maximum_ladder_impulse_delta.has_value()
                            ? *series.maximum_ladder_impulse_delta
                            : -1.0);
        }
        std::cerr << '\n';
        const auto report_event_roots = [&](const char* label,
                                            const auto& snapshot) {
          for (const auto& row : snapshot.root_certificates) {
            if (row.receiver_path_id != regulator.receiver_path_id ||
                row.source_path_id != regulator.source_path_id) {
              continue;
            }
            std::cerr << "      " << label << "_roots"
                      << " search=[" << row.certificate.searched_lower
                      << ',' << row.certificate.searched_upper << ']'
                      << " complement="
                      << row.certificate.root_free_complement
                      << " memory="
                      << row.certificate.memory_boundary_contact
                      << " coincident="
                      << row.certificate.coincident_endpoint_excluded;
            for (const auto& root : row.certificate.roots) {
              std::cerr << " [" << root.lower << ',' << root.upper
                        << "]:" << root.source_normal_sign;
            }
            std::cerr << '\n';
          }
        };
        report_event_roots("start", substep.start_snapshot);
        if (substep.endpoint_snapshot.has_value()) {
          report_event_roots("end", *substep.endpoint_snapshot);
        }
      }
      if (substep.endpoint_snapshot.has_value() &&
          substep.endpoint_snapshot->status != "certified_complete") {
        std::cerr << "    endpoint_acceleration status="
                  << substep.endpoint_snapshot->acceleration.status
                  << " failure="
                  << substep.endpoint_snapshot->acceleration.failure_code
                  << '\n';
        for (const auto& pair :
             substep.endpoint_snapshot->acceleration.pair_certificates) {
          if (pair.status == "uncertified" || !pair.failure_code.empty()) {
            std::cerr << "    endpoint_acceleration_pair "
                      << pair.receiver_path_id << "<-" << pair.source_path_id
                      << " chart=" << pair.chart
                      << " status=" << pair.status
                      << " failure=" << pair.failure_code
                      << " precision_bits="
                      << pair.achieved_acceleration_precision_bits
                      << " quadrature_cells="
                      << pair.quadrature_visited_cells << '\n';
          }
        }
        for (const auto& row :
             substep.endpoint_snapshot->root_certificates) {
          if (row.certificate.status != "certified_complete") {
            std::cerr << "    endpoint_root " << row.receiver_path_id
                      << "<-" << row.source_path_id
                      << " status=" << row.certificate.status
                      << " failure=" << row.certificate.failure_code
                      << " precision_bits="
                      << row.certificate.achieved_precision_bits << '\n';
          }
        }
      }
    }
    for (const auto& error : step.local_errors) {
      std::cerr << "  local_error " << error.path_id
                << " position=" << error.position_error
                << " velocity=" << error.velocity_error << '\n';
    }
  }
}

}  // namespace

int main(int argc, char** argv) {
  try {
    Options options;
    const std::string target_name =
        option_string(argc, argv, "target", "section97");
    const Target target = target_from_name(target_name);
    options.cycles = option_double(argc, argv, "cycles", options.cycles);
    options.step = option_double(argc, argv, "step", options.step);
    options.minimum_step =
        option_double(argc, argv, "minimum-step", options.step / 4.0);
    options.maximum_step =
        option_double(argc, argv, "maximum-step", options.step);
    options.history_depth =
        option_double(argc, argv, "history-depth", options.history_depth);
    options.history_segment_step = option_double(
        argc, argv, "history-segment-step", options.history_segment_step);
    options.amplitude =
        option_double(argc, argv, "amplitude", options.amplitude);
    options.seed = option_string(argc, argv, "seed", options.seed);
    options.chart = option_string(argc, argv, "chart", options.chart);
    options.acceleration_tolerance = option_double(
        argc, argv, "acceleration-tolerance",
        options.acceleration_tolerance);
    options.quadrature_tolerance = option_double(
        argc, argv, "quadrature-tolerance",
        options.quadrature_tolerance);
    options.position_tolerance = option_double(
        argc, argv, "position-tolerance", options.position_tolerance);
    options.velocity_tolerance = option_double(
        argc, argv, "velocity-tolerance", options.velocity_tolerance);
    options.output = option_string(argc, argv, "output", options.output);
    const std::string parity_output =
        option_string(argc, argv, "parity-output", "");
    const std::string checkpoint_input =
        option_string(argc, argv, "checkpoint-in", "");
    const std::string checkpoint_output =
        option_string(argc, argv, "checkpoint-out", "");
    const std::string verified_legacy_checkpoint_fingerprint = option_string(
        argc, argv, "verified-legacy-checkpoint-model-fingerprint", "");
    options.snapshot_only = has_flag(argc, argv, "snapshot-only");
    options.adaptive_step_growth =
        has_flag(argc, argv, "adaptive-step-growth");

    const double period = target_period(target);
    gPeriod = period;
    const double default_end = options.cycles * period;
    const double end_time = option_double(argc, argv, "end-time", default_end);
    const unsigned maximum_mpfr_bits = static_cast<unsigned>(option_double(
        argc, argv, "maximum-mpfr-bits", 512.0));
    const std::string root_tolerance =
        option_string(argc, argv, "root-tolerance", "1e-5");
    const std::size_t regulator_refinement_levels =
        static_cast<std::size_t>(option_double(
            argc, argv, "regulator-refinement-levels", 3.0));
    const std::size_t event_max_cells =
        static_cast<std::size_t>(option_double(
            argc, argv, "event-max-cells", 300000.0));
    const std::size_t quadrature_max_cells =
        static_cast<std::size_t>(option_double(
            argc, argv, "quadrature-max-cells", 300000.0));
    const std::size_t checkpoint_source_event_max_cells =
        static_cast<std::size_t>(option_double(
            argc, argv, "checkpoint-source-event-max-cells",
            static_cast<double>(event_max_cells)));
    const double checkpoint_source_minimum_step = option_double(
        argc, argv, "checkpoint-source-minimum-step",
        options.minimum_step);
    const std::size_t checkpoint_source_quadrature_max_cells =
        static_cast<std::size_t>(option_double(
            argc, argv, "checkpoint-source-quadrature-max-cells",
            static_cast<double>(quadrature_max_cells)));
    std::cout << "precision maximum_mpfr_bits=" << maximum_mpfr_bits << '\n';
    report_object(target, options);
    if (target.drift != 0.0) {
      std::cout << "disposition=object_blocked reason="
                   "native_uniform_circular_factory_has_no_axial_drift;"
                   "dropping_drift_would_change_the_recorded_worldlines\n";
      return 4;
    }

    auto paths = target_paths(target, options);
    eom::NativeCoupledEvolutionRequest request{
        .run_id = target.id + "-" + options.seed,
        .paths = paths,
        .start_time = "0",
        .end_time = token(end_time),
        .initial_step = token(options.step),
        .minimum_step = token(options.minimum_step),
        .maximum_step = token(options.maximum_step),
        .field_speed = "1",
        .coupling = token(36.0 * target.fitted_coupling),
        .root_tolerance = root_tolerance,
        .source_normal_floor = "1e-24",
        .acceleration_tolerance = token(options.acceleration_tolerance),
        .chart_policy = options.chart,
        .causal_width = "0.05",
        .core_scale = "0.05",
        .quadrature_tolerance = token(options.quadrature_tolerance),
        .event_impulse_tolerance = "1e-6",
        .regulator_convergence_tolerance = "1e-3",
        .position_tolerance = token(options.position_tolerance),
        .velocity_tolerance = token(options.velocity_tolerance),
        .correction_tolerance = "2e-7",
        .root_max_depth = 192,
        .root_max_cells = 500000,
        .quadrature_max_depth = 32,
        .quadrature_max_cells = quadrature_max_cells,
        .event_max_depth = 24,
        .event_max_cells = event_max_cells,
        .regulator_refinement_levels = regulator_refinement_levels,
        .initial_mpfr_bits = 128,
        .maximum_mpfr_bits = maximum_mpfr_bits,
        .max_correction_iterations = 12,
        .max_step_attempts = 200000,
        .max_rejected_steps = 1000,
        .thread_count = 8,
        .use_adaptive_step_growth = options.adaptive_step_growth,
        .use_analytic_pinned_fold = false,
        .use_pinned_fold_aware_temporal_step = false,
    };

    std::optional<eom::NativeEvolutionCheckpoint> checkpoint;
    if (!checkpoint_input.empty()) {
      checkpoint = eom::read_native_evolution_checkpoint(checkpoint_input);
    }
    std::vector<eom::NativePublishedPath> initial_histories;
    std::string initial_reception = "0";
    if (checkpoint.has_value()) {
      initial_reception = checkpoint->accepted_time;
      initial_histories.reserve(checkpoint->paths.size());
      for (const auto& path : checkpoint->paths) {
        initial_histories.push_back({path.path_id, path.history});
      }
    } else {
      initial_histories = published(paths);
    }
    const auto snapshot = eom::certify_native_acceleration_snapshot(
        request, initial_histories, initial_reception);
    std::size_t unresolved_roots = 0U;
    for (const auto& row : snapshot.root_certificates) {
      if (row.certificate.status != "certified_complete") {
        ++unresolved_roots;
        std::cerr << "root " << row.receiver_path_id << "<-"
                  << row.source_path_id << " status="
                  << row.certificate.status << " failure="
                  << row.certificate.failure_code << '\n';
      }
    }
    std::cout << "snapshot status=" << snapshot.status
              << " failure=" << snapshot.failure_code
              << " unresolved_roots=" << unresolved_roots
              << " acceleration_status=" << snapshot.acceleration.status
              << " acceleration_failure="
              << snapshot.acceleration.failure_code
              << " pair_route=" << snapshot.pair_selection_route << '\n';
    if (options.snapshot_only || snapshot.status != "certified_complete") {
      return snapshot.status == "certified_complete" ? 0 : 2;
    }

    eom::NativeCoupledEvolutionCertificate perturbed = [&]() {
      if (!checkpoint.has_value()) {
        return eom::evolve_native_coupled_histories(request);
      }
      const auto resume_from_verified_checkpoint = [&]() {
        auto resumed_request = request;
        resumed_request.run_id = checkpoint->run_id;
        resumed_request.start_time = checkpoint->accepted_time;
        resumed_request.end_time = token(end_time);
        resumed_request.initial_step = checkpoint->controller_step_size;
        resumed_request.paths.clear();
        resumed_request.paths.reserve(checkpoint->paths.size());
        for (const auto& path : checkpoint->paths) {
          resumed_request.paths.push_back(
              {path.path_id, path.charge, path.history});
        }
        return eom::evolve_native_coupled_histories(resumed_request);
      };
      if (checkpoint_source_event_max_cells == event_max_cells &&
          checkpoint_source_minimum_step == options.minimum_step &&
          checkpoint_source_quadrature_max_cells == quadrature_max_cells) {
        const std::string current_model_fingerprint =
            eom::native_evolution_model_fingerprint(request);
        if (current_model_fingerprint != checkpoint->model_fingerprint) {
          std::cerr << "checkpoint_model expected="
                    << checkpoint->model_fingerprint << " actual="
                    << current_model_fingerprint << '\n';
          if (verified_legacy_checkpoint_fingerprint ==
              checkpoint->model_fingerprint) {
            std::cerr << "checkpoint_legacy_model_verification="
                         "explicit_exact_fingerprint_match\n";
            return resume_from_verified_checkpoint();
          }
        }
        return eom::resume_native_coupled_histories(
            request, *checkpoint, token(end_time));
      }
      auto source_request = request;
      source_request.event_max_cells = checkpoint_source_event_max_cells;
      source_request.minimum_step = token(checkpoint_source_minimum_step);
      source_request.quadrature_max_cells =
          checkpoint_source_quadrature_max_cells;
      if (eom::native_evolution_model_fingerprint(source_request) !=
          checkpoint->model_fingerprint) {
        throw std::invalid_argument(
            "checkpoint differs by more than the declared numerical resource controls");
      }
      return resume_from_verified_checkpoint();
    }();
    if (!checkpoint_output.empty()) {
      eom::write_native_evolution_checkpoint_atomic(
          checkpoint_output,
          eom::create_native_evolution_checkpoint(request, perturbed));
    }
    report_step_failures("engine", perturbed);
    write_evolved_root_parity_trace(
        parity_output, request, initial_histories, snapshot, perturbed);

    double maximum_speed = 0.0;
    double maximum_radius = 0.0;
    for (const auto& path : perturbed.histories) {
      const eom::Interval endpoint = eom::Interval::point(
          eom::Interval::decimal_token(perturbed.accepted_end_time).midpoint());
      const auto position = path.history.position_hull(endpoint);
      const auto velocity = path.history.velocity_hull(endpoint);
      maximum_radius = std::max(maximum_radius, eom::norm(position).upper());
      maximum_speed = std::max(maximum_speed, eom::norm(velocity).upper());
    }
    std::cout << "engine_acceptance status=" << perturbed.status
              << " halt=" << perturbed.halt_code
              << " accepted_end=" << perturbed.accepted_end_time
              << " accepted_steps=" << perturbed.accepted_step_count
              << " rejected_steps=" << perturbed.rejected_step_count
              << " required_horizon=6.93"
              << " required_horizon_reached="
              << (std::stod(perturbed.accepted_end_time) >= 6.93)
              << " max_radius=" << maximum_radius
              << " max_speed=" << maximum_speed << '\n';
    std::cout << "timing engine_wall="
              << perturbed.timing.total_wall_seconds
              << " engine_wall_per_accepted_step="
              << (perturbed.accepted_step_count > 0
                      ? perturbed.timing.total_wall_seconds /
                            static_cast<double>(perturbed.accepted_step_count)
                      : std::numeric_limits<double>::quiet_NaN())
              << '\n';
    const bool completed = perturbed.status == "completed" &&
        std::stod(perturbed.accepted_end_time) >= 6.93;
    return completed ? 0 : 3;
  } catch (const std::exception& error) {
    std::cerr << "section-97-98-direct-evolution error: "
              << error.what() << '\n';
    return 1;
  }
}
