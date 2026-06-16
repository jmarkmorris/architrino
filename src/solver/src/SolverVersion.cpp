#include "architrino/solver/SolverVersion.hpp"

#include <boost/multiprecision/cpp_dec_float.hpp>

#include <sstream>

#ifndef ARCHITRINO_SOLVER_VERSION
#define ARCHITRINO_SOLVER_VERSION "0.0.0-local"
#endif

namespace architrino::solver {

SolverBuildInfo solver_build_info() {
  return SolverBuildInfo{
      "architrino_solver",
      ARCHITRINO_SOLVER_VERSION,
      kSolverAbiMajor,
      kSolverAbiMinor,
      kSolverAbiPatch,
  };
}

bool boost_multiprecision_smoke() {
  using boost::multiprecision::cpp_dec_float_50;

  const cpp_dec_float_50 one = 1;
  const cpp_dec_float_50 third = one / 3;
  const cpp_dec_float_50 reconstructed = third + third + third;
  const cpp_dec_float_50 error = abs(reconstructed - one);

  return error < cpp_dec_float_50("1e-45");
}

std::string solver_smoke_report() {
  const SolverBuildInfo info = solver_build_info();
  std::ostringstream out;
  out << info.engineName << " " << info.solverVersion << " abi " << info.abiMajor << "."
      << info.abiMinor << "." << info.abiPatch << " boost_multiprecision="
      << (boost_multiprecision_smoke() ? "ok" : "failed");
  return out.str();
}

}  // namespace architrino::solver
