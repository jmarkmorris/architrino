#define main section86_reference_main
#include "section-86-direct-evolution.cpp"
#undef main

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
                  << " failure=" << substep.failure_code << '\n';
      }
      if (substep.endpoint_snapshot.has_value() &&
          substep.endpoint_snapshot->status != "certified_complete") {
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
    options.snapshot_only = has_flag(argc, argv, "snapshot-only");
    options.skip_control = has_flag(argc, argv, "skip-control");
    options.adaptive_step_growth =
        has_flag(argc, argv, "adaptive-step-growth");

    const double period = target_period(target);
    const double default_end = options.cycles * period;
    const double end_time = option_double(argc, argv, "end-time", default_end);
    const unsigned maximum_mpfr_bits = static_cast<unsigned>(option_double(
        argc, argv, "maximum-mpfr-bits", 512.0));
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
        .root_tolerance = "1e-5",
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
        .quadrature_max_cells = 300000,
        .event_max_depth = 24,
        .event_max_cells = 300000,
        .regulator_refinement_levels = 3,
        .initial_mpfr_bits = 128,
        .maximum_mpfr_bits = maximum_mpfr_bits,
        .max_correction_iterations = 12,
        .max_step_attempts = 200000,
        .max_rejected_steps = 1000,
        .thread_count = 8,
        .use_adaptive_step_growth = options.adaptive_step_growth,
    };

    const auto initial_histories = published(paths);
    const auto snapshot = eom::certify_native_acceleration_snapshot(
        request, initial_histories, "0");
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

    Options control_options = options;
    control_options.seed = "none";
    control_options.amplitude = 0.0;
    auto control_paths = target_paths(target, control_options);
    auto control_request = request;
    control_request.run_id = target.id + "-control";
    control_request.paths = control_paths;
    const auto control_initial = published(control_paths);
    const Sample initial = measure_difference(
        control_initial, initial_histories, "0");

    std::optional<eom::NativeCoupledEvolutionCertificate> control;
    if (!options.skip_control) {
      control = eom::evolve_native_coupled_histories(control_request);
    }
    const auto perturbed = eom::evolve_native_coupled_histories(request);
    if (control.has_value()) report_step_failures("control", *control);
    report_step_failures("perturbed", perturbed);

    std::vector<Sample> samples{initial};
    for (const auto& step : perturbed.steps) {
      if (step.status != "accepted" || !control.has_value()) continue;
      const double time = std::stod(step.accepted_time);
      if (time > std::stod(control->accepted_end_time) + 1e-12) break;
      const auto* control_histories = histories_covering(*control, time);
      if (control_histories != nullptr) {
        try {
          samples.push_back(measure_difference(
              *control_histories, step.published_histories,
              step.accepted_time));
        } catch (const std::exception&) {
          break;
        }
      }
    }
    write_samples(options.output, samples);
    const Sample& final = samples.back();
    const double fit_start = final.time * 0.2;
    if (control.has_value()) {
      std::cout << "control status=" << control->status
                << " halt=" << control->halt_code
                << " accepted_end=" << control->accepted_end_time
                << " accepted_steps=" << control->accepted_step_count
                << " rejected_steps=" << control->rejected_step_count
                << '\n';
    }
    std::cout << "evolution status=" << perturbed.status
              << " halt=" << perturbed.halt_code
              << " accepted_end=" << perturbed.accepted_end_time
              << " accepted_steps=" << perturbed.accepted_step_count
              << " rejected_steps=" << perturbed.rejected_step_count
              << " horizon_target=" << 5.0 / target.expected_growth
              << " horizon_fraction="
              << final.time / (5.0 / target.expected_growth)
              << " final_time=" << final.time
              << " final_amplitude=" << final.amplitude
              << " amplitude_ratio="
              << final.amplitude / initial.amplitude
              << " max_radius=" << final.maximum_radius
              << " max_speed=" << final.maximum_speed << '\n';
    std::cout << "growth slope_stride_1="
              << log_slope(samples, 1U, fit_start, 0.25)
              << " slope_stride_2="
              << log_slope(samples, 2U, fit_start, 0.25)
              << " slope_stride_5="
              << log_slope(samples, 5U, fit_start, 0.25)
              << " slope_stride_10="
              << log_slope(samples, 10U, fit_start, 0.25) << '\n';
    std::cout << "timing perturbed_wall="
              << perturbed.timing.total_wall_seconds
              << " perturbed_wall_per_accepted_step="
              << (perturbed.accepted_step_count > 0
                      ? perturbed.timing.total_wall_seconds /
                            static_cast<double>(perturbed.accepted_step_count)
                      : std::numeric_limits<double>::quiet_NaN())
              << " control_wall="
              << (control.has_value() ? control->timing.total_wall_seconds : 0.0)
              << '\n';
    const bool completed = perturbed.status == "completed" &&
        (!control.has_value() || control->status == "completed");
    return completed ? 0 : 3;
  } catch (const std::exception& error) {
    std::cerr << "section-97-98-direct-evolution error: "
              << error.what() << '\n';
    return 1;
  }
}
