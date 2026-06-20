cmake_minimum_required(VERSION 3.25)

project(
  ArchitrinoSolver
  VERSION 0.1.0
  DESCRIPTION "Central architrino motion and geometry solver scaffold"
  LANGUAGES CXX
)

option(ARCHITRINO_SOLVER_BUILD_WASM "Build the WebAssembly smoke target" OFF)
set(
  ARCHITRINO_SOLVER_BOOST_INCLUDE_DIR
  ""
  CACHE PATH
  "Boost include directory for header-only Boost.Multiprecision use"
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

if(NOT ARCHITRINO_SOLVER_BOOST_INCLUDE_DIR AND EXISTS "/opt/homebrew/opt/boost/include")
  set(ARCHITRINO_SOLVER_BOOST_INCLUDE_DIR "/opt/homebrew/opt/boost/include")
endif()

if(
  NOT EXISTS
  "${ARCHITRINO_SOLVER_BOOST_INCLUDE_DIR}/boost/multiprecision/cpp_dec_float.hpp"
)
  message(
    FATAL_ERROR
    "Boost.Multiprecision headers not found. Set ARCHITRINO_SOLVER_BOOST_INCLUDE_DIR."
  )
endif()

add_library(architrino_solver_core STATIC
  src/AssemblyGraph.cpp
  src/AssemblyGraphStore.cpp
  src/BinaryLayouts.cpp
  src/CausalRootBatchSolver.cpp
  src/CausalRootSolver.cpp
  src/ErrorBudget.cpp
  src/Geometry.cpp
  src/InvariantChecks.cpp
  src/MotionSampler.cpp
  src/NumericSerialization.cpp
  src/PathHistoryStream.cpp
  src/ParallelExecution.cpp
  src/PhaseDiagnostics.cpp
  src/PrecisionDiagnostics.cpp
  src/PrecisionPathSolver.cpp
  src/RootLedger.cpp
  src/RootLedgerTransition.cpp
  src/SolverCAbi.cpp
  src/SolverContract.cpp
  src/SolverSelfTest.cpp
  src/SolverTypes.cpp
  src/SolverVersion.cpp
  src/SpaceTimeIndex.cpp
  src/StorageLifecycle.cpp
  src/StreamMetadata.cpp
  src/WorkPacket.cpp
)

target_include_directories(architrino_solver_core
  PUBLIC
    "${CMAKE_CURRENT_SOURCE_DIR}/include"
    "${ARCHITRINO_SOLVER_BOOST_INCLUDE_DIR}"
)

target_compile_features(architrino_solver_core PUBLIC cxx_std_20)

target_compile_definitions(architrino_solver_core
  PUBLIC
    ARCHITRINO_SOLVER_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_CXX_COMPILER_ID MATCHES "Clang|GNU")
  target_compile_options(architrino_solver_core PRIVATE
    -Wall
    -Wextra
    -Wpedantic
    -Werror
  )
elseif(MSVC)
  target_compile_options(architrino_solver_core PRIVATE /W4 /WX)
endif()

if(NOT EMSCRIPTEN)
  add_executable(architrino_solver_assembly_graph_smoke
    native/solver_assembly_graph_smoke.cpp
  )

  target_link_libraries(architrino_solver_assembly_graph_smoke
    PRIVATE architrino_solver_core
  )

  add_executable(architrino_solver_assembly_graph_store_smoke
    native/solver_assembly_graph_store_smoke.cpp
  )

  target_link_libraries(architrino_solver_assembly_graph_store_smoke
    PRIVATE architrino_solver_core
  )

  add_executable(architrino_solver_analytic_smoke
    native/solver_analytic_smoke.cpp
  )

  target_link_libraries(architrino_solver_analytic_smoke
    PRIVATE architrino_solver_core
  )

  add_executable(architrino_solver_smoke
    native/solver_smoke.cpp
  )

  target_link_libraries(architrino_solver_smoke
    PRIVATE architrino_solver_core
  )

  add_executable(architrino_solver_contract_smoke
    native/solver_contract_smoke.cpp
  )

  target_link_libraries(architrino_solver_contract_smoke
    PRIVATE architrino_solver_core
  )

  add_executable(architrino_solver_error_budget_smoke
    native/solver_error_budget_smoke.cpp
  )

  target_link_libraries(architrino_solver_error_budget_smoke
    PRIVATE architrino_solver_core
  )

  add_executable(architrino_solver_batch_smoke
    native/solver_batch_smoke.cpp
  )

  target_link_libraries(architrino_solver_batch_smoke
    PRIVATE architrino_solver_core
  )

  add_executable(architrino_solver_geometry_smoke
    native/solver_geometry_smoke.cpp
  )

  target_link_libraries(architrino_solver_geometry_smoke
    PRIVATE architrino_solver_core
  )

  add_executable(architrino_solver_invariant_smoke
    native/solver_invariant_smoke.cpp
  )

  target_link_libraries(architrino_solver_invariant_smoke
    PRIVATE architrino_solver_core
  )

  add_executable(architrino_solver_motion_smoke
    native/solver_motion_smoke.cpp
  )

  target_link_libraries(architrino_solver_motion_smoke
    PRIVATE architrino_solver_core
  )

  add_executable(architrino_solver_numeric_serialization_smoke
    native/solver_numeric_serialization_smoke.cpp
  )

  target_link_libraries(architrino_solver_numeric_serialization_smoke
    PRIVATE architrino_solver_core
  )

  add_executable(architrino_solver_parallel_smoke
    native/solver_parallel_smoke.cpp
  )

  target_link_libraries(architrino_solver_parallel_smoke
    PRIVATE architrino_solver_core
  )

  add_executable(architrino_solver_phase_smoke
    native/solver_phase_smoke.cpp
  )

  target_link_libraries(architrino_solver_phase_smoke
    PRIVATE architrino_solver_core
  )

  add_executable(architrino_solver_root_ledger_smoke
    native/solver_root_ledger_smoke.cpp
  )

  target_link_libraries(architrino_solver_root_ledger_smoke
    PRIVATE architrino_solver_core
  )

  add_executable(architrino_solver_root_transition_smoke
    native/solver_root_transition_smoke.cpp
  )

  target_link_libraries(architrino_solver_root_transition_smoke
    PRIVATE architrino_solver_core
  )

  add_executable(architrino_solver_spacetime_index_smoke
    native/solver_spacetime_index_smoke.cpp
  )

  target_link_libraries(architrino_solver_spacetime_index_smoke
    PRIVATE architrino_solver_core
  )

  add_executable(architrino_solver_storage_lifecycle_smoke
    native/solver_storage_lifecycle_smoke.cpp
  )

  target_link_libraries(architrino_solver_storage_lifecycle_smoke
    PRIVATE architrino_solver_core
  )

  add_executable(architrino_solver_precision_smoke
    native/solver_precision_smoke.cpp
  )

  target_link_libraries(architrino_solver_precision_smoke
    PRIVATE architrino_solver_core
  )

  add_executable(architrino_solver_precision_dynamic_range_smoke
    native/solver_precision_dynamic_range_smoke.cpp
  )

  target_link_libraries(architrino_solver_precision_dynamic_range_smoke
    PRIVATE architrino_solver_core
  )

  add_executable(architrino_solver_stream_smoke
    native/solver_stream_smoke.cpp
  )

  target_link_libraries(architrino_solver_stream_smoke
    PRIVATE architrino_solver_core
  )

  add_executable(architrino_solver_work_packet_smoke
    native/solver_work_packet_smoke.cpp
  )

  target_link_libraries(architrino_solver_work_packet_smoke
    PRIVATE architrino_solver_core
  )

  add_executable(architrino_solver_benchmark
    native/solver_benchmark.cpp
  )

  target_link_libraries(architrino_solver_benchmark
    PRIVATE architrino_solver_core
  )
endif()

if(ARCHITRINO_SOLVER_BUILD_WASM)
  add_executable(architrino_solver_wasm_smoke
    wasm/solver_wasm_smoke.cpp
  )

  target_link_libraries(architrino_solver_wasm_smoke
    PRIVATE architrino_solver_core
  )

  if(EMSCRIPTEN)
    set_target_properties(architrino_solver_wasm_smoke PROPERTIES SUFFIX ".mjs")
    target_link_options(architrino_solver_wasm_smoke PRIVATE
      "SHELL:-sMODULARIZE=1"
      "SHELL:-sEXPORT_ES6=1"
      "SHELL:-sEXPORT_NAME=createArchitrinoSolverSmoke"
      "SHELL:-sENVIRONMENT=web,worker,node"
      "SHELL:-sALLOW_MEMORY_GROWTH=1"
      "SHELL:-sEXPORTED_FUNCTIONS=['_malloc','_free','_architrino_solver_get_abi_info','_architrino_solver_admit_simulation_envelope_f64','_architrino_solver_smoke','_architrino_solver_contract_smoke','_architrino_solver_root_smoke','_architrino_solver_solve_causal_roots_f64','_architrino_solver_solve_circular_source_causal_roots_f64','_architrino_solver_solve_circular_source_roots_hits_ledger_f64','_architrino_solver_solve_roots_and_hits_f64','_architrino_solver_build_root_ledger_detail_f64','_architrino_solver_solve_causal_root_batch_f64','_architrino_solver_solve_roots_and_hits_batch_f64','_architrino_solver_diagnose_precision_f64','_architrino_solver_solve_causal_roots_precision_f64','_architrino_solver_solve_roots_and_hits_precision_f64','_architrino_solver_solve_roots_hits_ledger_precision_f64','_architrino_solver_propagate_error_budget_f64','_architrino_solver_sample_linear_motion_f64','_architrino_solver_sample_linear_path_history_f64','_architrino_solver_integrate_constant_acceleration_motion_f64','_architrino_solver_integrate_constant_acceleration_path_history_f64','_architrino_solver_integrate_pair_interaction_motion_f64','_architrino_solver_compute_phase_at_hit_f64','_architrino_solver_compute_path_bounds_f64','_architrino_solver_intersect_sphere_points_f64','_architrino_solver_compute_delayed_potentials_f64','_architrino_solver_solve_circular_self_hit_spans_f64','_architrino_solver_detect_assembly_membership_events_f64','_architrino_solver_write_assembly_graph_store_f64','_architrino_solver_read_assembly_graph_store_states_f64','_architrino_solver_read_assembly_graph_store_memberships_f64','_architrino_solver_read_assembly_graph_store_hierarchy_f64','_architrino_solver_read_assembly_graph_store_events_f64','_architrino_solver_read_assembly_graph_store_index','_architrino_solver_query_assembly_graph_store_index','_architrino_solver_build_spacetime_index_f64','_architrino_solver_query_spacetime_index_f64','_architrino_solver_query_emission_shell_broad_phase_f64','_architrino_solver_query_emission_shell_broad_phase_indexed_v0_f64','_architrino_solver_estimate_emission_shell_narrow_phase_f64','_architrino_solver_write_path_history_stream_f64','_architrino_solver_read_path_history_stream_rows_f64','_architrino_solver_read_path_history_stream_index','_architrino_solver_read_path_history_stream_chunks','_architrino_solver_query_path_history_stream_index','_architrino_solver_read_path_history_stream_query_f64','_architrino_solver_plan_path_history_storage_lifecycle']"
      "SHELL:-sEXPORTED_RUNTIME_METHODS=['cwrap','getValue','setValue']"
    )
  endif()
endif()
