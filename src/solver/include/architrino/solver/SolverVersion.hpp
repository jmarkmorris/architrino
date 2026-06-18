#pragma once

#include <string>

namespace architrino::solver {

struct SolverBuildInfo {
  const char* engineName;
  const char* solverVersion;
  int abiMajor;
  int abiMinor;
  int abiPatch;
};

constexpr int kSolverAbiMajor = 0;
constexpr int kSolverAbiMinor = 1;
constexpr int kSolverAbiPatch = 0;

SolverBuildInfo solver_build_info();
std::string solver_smoke_report();
bool boost_multiprecision_smoke();

}  // namespace architrino::solver
