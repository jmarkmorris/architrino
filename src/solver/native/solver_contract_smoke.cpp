#include "architrino/solver/SolverSelfTest.hpp"

#include <iostream>

int main() {
  std::cout << architrino::solver::solver_contract_smoke_report() << '\n';
  return architrino::solver::solver_contract_smoke() && architrino::solver::causal_root_smoke()
             ? 0
             : 1;
}
