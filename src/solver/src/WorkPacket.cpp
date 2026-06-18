#include "architrino/solver/WorkPacket.hpp"

#include <algorithm>
#include <cmath>
#include <iomanip>
#include <limits>
#include <sstream>
#include <string_view>

namespace architrino::solver {
namespace {

constexpr std::string_view WorkPacketSchema = "solver-work-packet.v1";

bool finite_ordered_time(WorkPacketTimeRange range) {
  return std::isfinite(range.start) && std::isfinite(range.end) && range.end >= range.start;
}

bool valid_enabled_range(WorkPacketIndexRange range) {
  return !range.enabled || range.end > range.start;
}

bool has_owned_range(const WorkPacketHeader& header) {
  return header.sourceBlock.enabled || header.receiverBlock.enabled || header.pathBlock.enabled;
}

bool byte_length_matches_rows(std::uint64_t byteLength,
                              std::uint64_t rowCount,
                              std::uint64_t rowSizeBytes) {
  if (rowSizeBytes == 0) {
    return byteLength == 0;
  }
  if (rowCount > std::numeric_limits<std::uint64_t>::max() / rowSizeBytes) {
    return false;
  }
  return byteLength == rowCount * rowSizeBytes;
}

std::string json_escape(std::string_view value) {
  std::string out;
  out.reserve(value.size() + 2);
  for (const char ch : value) {
    switch (ch) {
      case '"':
        out += "\\\"";
        break;
      case '\\':
        out += "\\\\";
        break;
      case '\b':
        out += "\\b";
        break;
      case '\f':
        out += "\\f";
        break;
      case '\n':
        out += "\\n";
        break;
      case '\r':
        out += "\\r";
        break;
      case '\t':
        out += "\\t";
        break;
      default:
        if (static_cast<unsigned char>(ch) < 0x20U) {
          std::ostringstream escaped;
          escaped << "\\u" << std::hex << std::setw(4) << std::setfill('0')
                  << static_cast<int>(static_cast<unsigned char>(ch));
          out += escaped.str();
        } else {
          out += ch;
        }
        break;
    }
  }
  return out;
}

void append_quoted(std::ostringstream& out, std::string_view value) {
  out << '"' << json_escape(value) << '"';
}

void append_index_range(std::ostringstream& out, WorkPacketIndexRange range) {
  out << "{\"enabled\":" << (range.enabled ? "true" : "false") << ",\"start\":" << range.start
      << ",\"end\":" << range.end << '}';
}

void append_time_range(std::ostringstream& out, WorkPacketTimeRange range) {
  out << "{\"start\":" << std::setprecision(17) << range.start << ",\"end\":" << range.end << '}';
}

void append_layout_array(std::ostringstream& out, const std::vector<BinaryLayoutId>& values) {
  out << '[';
  for (std::size_t index = 0; index < values.size(); ++index) {
    if (index > 0) {
      out << ',';
    }
    append_quoted(out, to_string(values[index]));
  }
  out << ']';
}

void append_buffer_ref(std::ostringstream& out, const WorkPacketBufferRef& buffer) {
  out << "{\"bufferId\":";
  append_quoted(out, buffer.bufferId);
  out << ",\"layout\":";
  append_quoted(out, to_string(buffer.layoutId));
  out << ",\"numericType\":";
  append_quoted(out, to_string(buffer.numericType));
  out << ",\"byteOffset\":" << buffer.byteOffset << ",\"byteLength\":" << buffer.byteLength
      << ",\"rowOffset\":" << buffer.rowOffset << ",\"rowCount\":" << buffer.rowCount
      << ",\"checksum\":";
  append_quoted(out, buffer.checksum);
  out << '}';
}

void append_buffer_array(std::ostringstream& out, const std::vector<WorkPacketBufferRef>& values) {
  out << '[';
  for (std::size_t index = 0; index < values.size(); ++index) {
    if (index > 0) {
      out << ',';
    }
    append_buffer_ref(out, values[index]);
  }
  out << ']';
}

std::string fnv1a64_hex(std::string_view bytes) {
  std::uint64_t hash = 14695981039346656037ULL;
  for (const char byte : bytes) {
    hash ^= static_cast<unsigned char>(byte);
    hash *= 1099511628211ULL;
  }
  std::ostringstream out;
  out << std::hex << std::setw(16) << std::setfill('0') << hash;
  return out.str();
}

}  // namespace

ValidationReport validate_work_packet_header(const WorkPacketHeader& header) {
  ValidationReport report;
  if (header.schema != WorkPacketSchema) {
    report.add(StatusCode::AppContractError,
               StatusSeverity::Error,
               "work packet schema must be solver-work-packet.v1",
               "work-packet");
  }
  if (header.packetId.empty()) {
    report.add(StatusCode::AppContractError,
               StatusSeverity::Error,
               "work packet id is required",
               "work-packet");
  }
  if (header.runId.empty()) {
    report.add(StatusCode::AppContractError,
               StatusSeverity::Error,
               "work packet run id is required",
               "work-packet");
  }
  if (header.modelId.empty()) {
    report.add(StatusCode::AppContractError,
               StatusSeverity::Error,
               "work packet model id is required",
               "work-packet");
  }
  if (header.precisionPath == PrecisionPath::Auto) {
    report.add(StatusCode::PrecisionFailed,
               StatusSeverity::Error,
               "work packet precision path must be selected before dispatch",
               "work-packet");
  }
  if (!valid_enabled_range(header.sourceBlock) || !valid_enabled_range(header.receiverBlock) ||
      !valid_enabled_range(header.pathBlock)) {
    report.add(StatusCode::AppContractError,
               StatusSeverity::Error,
               "enabled work packet ranges must be nonempty",
               "work-packet");
  }
  if (!has_owned_range(header)) {
    report.add(StatusCode::AppContractError,
               StatusSeverity::Error,
               "work packet must own at least one source, receiver, or path range",
               "work-packet");
  }
  if (!finite_ordered_time(header.timeRange)) {
    report.add(StatusCode::TimeResolutionInsufficient,
               StatusSeverity::Error,
               "work packet time range must be finite and ordered",
               "work-packet");
  }
  if (header.expectedOutputs.empty()) {
    report.add(StatusCode::AppContractError,
               StatusSeverity::Error,
               "work packet expected outputs are required",
               "work-packet");
  }
  for (const BinaryLayoutId output : header.expectedOutputs) {
    if (binary_layout_descriptor(output).rowSizeBytes == 0) {
      report.add(StatusCode::AppContractError,
                 StatusSeverity::Error,
                 "work packet expected output layout is not implemented",
                 "work-packet");
    }
  }
  for (const WorkPacketBufferRef& buffer : header.inputBuffers) {
    const BinaryLayoutDescriptor layout = binary_layout_descriptor(buffer.layoutId);
    if (buffer.bufferId.empty()) {
      report.add(StatusCode::AppContractError,
                 StatusSeverity::Error,
                 "work packet input buffer id is required",
                 "work-packet");
    }
    if (layout.rowSizeBytes == 0) {
      report.add(StatusCode::AppContractError,
                 StatusSeverity::Error,
                 "work packet input layout is not implemented",
                 "work-packet");
    }
    if (buffer.rowCount > 0 &&
        !byte_length_matches_rows(
            buffer.byteLength,
            buffer.rowCount,
            static_cast<std::uint64_t>(layout.rowSizeBytes))) {
      report.add(StatusCode::AppContractError,
                 StatusSeverity::Error,
                 "work packet input byte length must match row count and layout size",
                 "work-packet");
    }
    if (buffer.rowCount > 0 && buffer.checksum.empty()) {
      report.add(StatusCode::AppContractError,
                 StatusSeverity::Error,
                 "work packet input checksum is required for nonempty buffers",
                 "work-packet");
    }
  }
  if (header.mergeKey.empty()) {
    report.add(StatusCode::AppContractError,
               StatusSeverity::Error,
               "work packet merge key is required",
               "work-packet");
  }
  return report;
}

std::string serialize_work_packet_header(const WorkPacketHeader& header) {
  std::ostringstream out;
  out << "{\"schema\":";
  append_quoted(out, header.schema);
  out << ",\"packetId\":";
  append_quoted(out, header.packetId);
  out << ",\"runId\":";
  append_quoted(out, header.runId);
  out << ",\"modelId\":";
  append_quoted(out, header.modelId);
  out << ",\"precisionPath\":";
  append_quoted(out, to_string(header.precisionPath));
  out << ",\"sourceBlock\":";
  append_index_range(out, header.sourceBlock);
  out << ",\"receiverBlock\":";
  append_index_range(out, header.receiverBlock);
  out << ",\"pathBlock\":";
  append_index_range(out, header.pathBlock);
  out << ",\"timeRange\":";
  append_time_range(out, header.timeRange);
  out << ",\"expectedOutputs\":";
  append_layout_array(out, header.expectedOutputs);
  out << ",\"inputBuffers\":";
  append_buffer_array(out, header.inputBuffers);
  out << ",\"mergeOrder\":" << header.mergeOrder << ",\"mergeKey\":";
  append_quoted(out, header.mergeKey);
  out << '}';
  return out.str();
}

std::string work_packet_header_checksum(const WorkPacketHeader& header) {
  return fnv1a64_hex(serialize_work_packet_header(header));
}

std::vector<WorkPacketResultRef> deterministic_merge_order(std::vector<WorkPacketResultRef> results) {
  std::stable_sort(results.begin(), results.end(), [](const WorkPacketResultRef& left,
                                                      const WorkPacketResultRef& right) {
    if (left.mergeKey != right.mergeKey) {
      return left.mergeKey < right.mergeKey;
    }
    if (left.mergeOrder != right.mergeOrder) {
      return left.mergeOrder < right.mergeOrder;
    }
    return left.packetId < right.packetId;
  });
  return results;
}

}  // namespace architrino::solver
