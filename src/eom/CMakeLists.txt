cmake_minimum_required(VERSION 3.20)
project(architrino_eom_native LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

find_package(Threads REQUIRED)
find_path(MPFR_INCLUDE_DIR mpfr.h REQUIRED)
find_library(MPFR_LIBRARY mpfr REQUIRED)
find_library(GMP_LIBRARY gmp REQUIRED)

add_library(eom_native STATIC
  src/Interval.cpp
  src/History.cpp
  src/BlockExclusion.cpp
  src/CertifiedTraversal.cpp
  src/CenteredAffine.cpp
  src/ExactPairBatch.cpp
  src/CertifiedAcceleration.cpp
  src/MultiprecisionAcceleration.cpp
  src/CoupledEvolution.cpp
  src/DelayedRootSensitivity.cpp
  src/DisplayEvaluation.cpp
  src/JointState.cpp
  src/JointAffineHistory.cpp
  src/JointAccelerationSnapshot.cpp
  src/JointEndpointCorrector.cpp
  src/JointRootBracket.cpp
  src/JointSharpRow.cpp
  src/Krawczyk.cpp
  src/RootTimeBudget.cpp
  src/SharpAccelerationSensitivity.cpp
  src/ShadowAffineDiagnostic.cpp
  src/Checkpoint.cpp
)
target_include_directories(eom_native
  PUBLIC include
  PRIVATE ${MPFR_INCLUDE_DIR}
)
target_link_libraries(eom_native PUBLIC Threads::Threads ${MPFR_LIBRARY} ${GMP_LIBRARY})
target_compile_options(
  eom_native PRIVATE -Wall -Wextra -Wpedantic -ffp-contract=off
)

add_executable(eom_native_fixture_cli native/eom_native_fixture_cli.cpp)
target_link_libraries(eom_native_fixture_cli PRIVATE eom_native)
target_compile_options(
  eom_native_fixture_cli PRIVATE -Wall -Wextra -Wpedantic -ffp-contract=off
)

add_executable(eom_recursive_block_benchmark_cli
  native/eom_recursive_block_benchmark_cli.cpp
)
target_link_libraries(eom_recursive_block_benchmark_cli PRIVATE eom_native)
target_compile_options(eom_recursive_block_benchmark_cli
  PRIVATE -Wall -Wextra -Wpedantic -ffp-contract=off
)

add_executable(eom_native_acceleration_fixture_cli
  native/eom_native_acceleration_fixture_cli.cpp
)
target_link_libraries(eom_native_acceleration_fixture_cli PRIVATE eom_native)
target_compile_options(eom_native_acceleration_fixture_cli
  PRIVATE -Wall -Wextra -Wpedantic -ffp-contract=off
)

add_executable(eom_native_evolution_fixture_cli
  native/eom_native_evolution_fixture_cli.cpp
)

add_executable(eom_borg_shadow_cli native/eom_borg_shadow_cli.cpp)
target_link_libraries(eom_borg_shadow_cli PRIVATE eom_native)
target_compile_options(
  eom_borg_shadow_cli PRIVATE -Wall -Wextra -Wpedantic -ffp-contract=off
)
target_link_libraries(eom_native_evolution_fixture_cli PRIVATE eom_native)
target_compile_options(eom_native_evolution_fixture_cli
  PRIVATE -Wall -Wextra -Wpedantic -ffp-contract=off
)

enable_testing()
add_test(NAME eom_native_fixture COMMAND eom_native_fixture_cli all)
add_test(
  NAME eom_native_acceleration_fixture
  COMMAND eom_native_acceleration_fixture_cli all
)
add_test(
  NAME eom_native_evolution_fixture
  COMMAND eom_native_evolution_fixture_cli all
)
add_test(
  NAME eom_borg_shadow_protocol_version
  COMMAND eom_borg_shadow_cli print-protocol-version
)
set_tests_properties(
  eom_borg_shadow_protocol_version
  PROPERTIES PASS_REGULAR_EXPRESSION "^EOM_BORG_NATIVE_V10"
)
