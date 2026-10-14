// Known case for the race detector used on Stage 3 increment 3. Two threads
// write one unsynchronised counter. Built with the same compiler and
// -fsanitize=thread, this program must be reported as a data race; if it is
// not, a clean report on the solver means nothing. With the argument "safe"
// the two threads write separate counters and no race must be reported.
#include <cstring>
#include <iostream>
#include <thread>

int main(int argc, char** argv) {
  const bool safe = argc > 1 && std::strcmp(argv[1], "safe") == 0;
  long counters[2] = {0, 0};
  const auto work = [&](int slot) {
    for (int i = 0; i < 100000; ++i) ++counters[safe ? slot : 0];
  };
  std::thread a(work, 0);
  std::thread b(work, 1);
  a.join();
  b.join();
  std::cout << counters[0] + counters[1] << "\n";
  return 0;
}
