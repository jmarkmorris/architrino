#include "architrino/solver/NumericSerialization.hpp"

#include <iostream>

int main() {
  const bool ok = architrino::solver::numeric_serialization_contract_smoke();
  if (!ok) {
    std::cerr << "solver numeric-serialization smoke failed\n";
    return 1;
  }

  std::cout << "solver numeric-serialization=ok types="
            << architrino::solver::core_numeric_serialization_descriptors().size()
            << '\n';
  return 0;
}
