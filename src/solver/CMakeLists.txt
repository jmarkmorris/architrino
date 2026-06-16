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
  src/BinaryLayouts.cpp
  src/CausalRootBatchSolver.cpp
  src/CausalRootSolver.cpp
  src/Geometry.cpp
  src/MotionSampler.cpp
  src/PathHistoryStream.cpp
  src/PhaseDiagnostics.cpp
  src/PrecisionDiagnostics.cpp
  src/SolverCAbi.cpp
  src/SolverContract.cpp
  src/SolverSelfTest.cpp
  src/SolverTypes.cpp
  src/SolverVersion.cpp
  src/StreamMetadata.cpp
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

  add_executable(architrino_solver_motion_smoke
    native/solver_motion_smoke.cpp
  )

  target_link_libraries(architrino_solver_motion_smoke
    PRIVATE architrino_solver_core
  )

  add_executable(architrino_solver_phase_smoke
    native/solver_phase_smoke.cpp
  )

  target_link_libraries(architrino_solver_phase_smoke
    PRIVATE architrino_solver_core
  )

  add_executable(architrino_solver_precision_smoke
    native/solver_precision_smoke.cpp
  )

  target_link_libraries(architrino_solver_precision_smoke
    PRIVATE architrino_solver_core
  )

  add_executable(architrino_solver_stream_smoke
    native/solver_stream_smoke.cpp
  )

  target_link_libraries(architrino_solver_stream_smoke
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
    set_target_properties(architrino_solver_wasm_smoke PROPERTIES SUFFIX ".js")
    target_link_options(architrino_solver_wasm_smoke PRIVATE
      "SHELL:-sMODULARIZE=1"
      "SHELL:-sEXPORT_NAME=createArchitrinoSolverSmoke"
      "SHELL:-sENVIRONMENT=web,worker,node"
      "SHELL:-sEXPORTED_FUNCTIONS=['_malloc','_free','_architrino_solver_get_abi_info','_architrino_solver_smoke','_architrino_solver_contract_smoke','_architrino_solver_root_smoke','_architrino_solver_solve_causal_roots_f64','_architrino_solver_solve_roots_and_hits_f64','_architrino_solver_solve_causal_root_batch_f64','_architrino_solver_diagnose_precision_f64']"
      "SHELL:-sEXPORTED_RUNTIME_METHODS=['cwrap','getValue','setValue']"
    )
  endif()
endif()
