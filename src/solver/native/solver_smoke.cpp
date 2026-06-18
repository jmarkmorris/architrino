#include "architrino/solver/SolverVersion.hpp"

#include <iostream>

int main() {
  std::cout << architrino::solver::solver_smoke_report() << '\n';
  return architrino::solver::boost_multiprecision_smoke() ? 0 : 1;
}
