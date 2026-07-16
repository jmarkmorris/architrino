// Serialization-only diagnostic for path-provenance audits.
//
// Reads an EOM checkpoint through the public checkpoint API and prints the
// retained-history identities and exact decimal segment tokens as JSON. It
// computes no trajectory, root, acceleration, or evidence grade.

#include "architrino/eom/Checkpoint.hpp"

#include <cstddef>
#include <exception>
#include <iostream>
#include <string>

namespace eom = architrino::eom;

namespace {

void write_json_string(const std::string& value) {
  std::cout << '"';
  for (const char character : value) {
    switch (character) {
      case '"': std::cout << "\\\""; break;
      case '\\': std::cout << "\\\\"; break;
      case '\n': std::cout << "\\n"; break;
      case '\r': std::cout << "\\r"; break;
      case '\t': std::cout << "\\t"; break;
      default: std::cout << character; break;
    }
  }
  std::cout << '"';
}

void write_segment(const eom::CubicHistorySegment& segment) {
  std::cout << "{\"startTime\":";
  write_json_string(segment.t_start_token());
  std::cout << ",\"endTime\":";
  write_json_string(segment.t_end_token());
  std::cout << ",\"coefficients\":[";
  for (std::size_t axis = 0; axis < 3; ++axis) {
    if (axis > 0) std::cout << ',';
    std::cout << '[';
    for (std::size_t coefficient = 0; coefficient < 4; ++coefficient) {
      if (coefficient > 0) std::cout << ',';
      write_json_string(segment.coefficient_tokens()[axis][coefficient]);
    }
    std::cout << ']';
  }
  std::cout << "],\"positionError\":";
  write_json_string(segment.position_error_token());
  std::cout << ",\"velocityError\":";
  write_json_string(segment.velocity_error_token());
  std::cout << '}';
}

}  // namespace

int main(int argc, char** argv) {
  if (argc != 2) {
    std::cerr << "usage: dump-eom-checkpoint-segments <checkpoint.bin>\n";
    return 2;
  }
  try {
    const auto checkpoint = eom::read_native_evolution_checkpoint(argv[1]);
    std::cout << "{\"checkpointFingerprint\":";
    write_json_string(checkpoint.checkpoint_fingerprint);
    std::cout << ",\"paths\":[";
    for (std::size_t path_index = 0; path_index < checkpoint.paths.size();
         ++path_index) {
      if (path_index > 0) std::cout << ',';
      const auto& path = checkpoint.paths[path_index];
      std::cout << "{\"id\":";
      write_json_string(path.path_id);
      std::cout << ",\"fingerprint\":";
      write_json_string(path.history.provenance_fingerprint());
      std::cout << ",\"segments\":[";
      for (std::size_t segment_index = 0;
           segment_index < path.history.segments().size(); ++segment_index) {
        if (segment_index > 0) std::cout << ',';
        write_segment(path.history.segments()[segment_index]);
      }
      std::cout << "]}";
    }
    std::cout << "]}\n";
    return 0;
  } catch (const std::exception& error) {
    std::cerr << "dump-eom-checkpoint-segments error: " << error.what()
              << '\n';
    return 1;
  }
}
