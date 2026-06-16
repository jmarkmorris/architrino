#include "architrino/solver/SolverVersion.hpp"
#include "architrino/solver/SolverSelfTest.hpp"

extern "C" int architrino_solver_smoke() {
  return architrino::solver::boost_multiprecision_smoke() ? 0 : 1;
}

extern "C" int architrino_solver_contract_smoke() {
  return architrino::solver::solver_contract_smoke() ? 0 : 1;
}

extern "C" int architrino_solver_root_smoke() {
  return architrino::solver::causal_root_smoke() ? 0 : 1;
}

int main() {
  return architrino_solver_smoke() || architrino_solver_contract_smoke() ||
         architrino_solver_root_smoke();
}
