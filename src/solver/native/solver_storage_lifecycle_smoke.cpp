#include "architrino/solver/StorageLifecycle.hpp"

#include <iostream>

int main() {
  const bool ok = architrino::solver::storage_lifecycle_contract_smoke();
  if (!ok) {
    std::cerr << "solver storage-lifecycle smoke failed\n";
    return 1;
  }

  std::cout << "solver storage-lifecycle=ok\n";
  return 0;
}
