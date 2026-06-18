#include "architrino/solver/AssemblyGraphStore.hpp"

#include <algorithm>
#include <cmath>
#include <fstream>
#include <limits>
#include <sstream>
#include <stdexcept>
#include <string>
#include <utility>

namespace architrino::solver {
namespace {

std::string json_escape(std::string_view value) {
  std::string escaped;
  escaped.reserve(value.size());
  for (const char ch : value) {
    switch (ch) {
      case '\\':
        escaped += "\\\\";
        break;
      case '"':
        escaped += "\\\"";
        break;
      case '\n':
        escaped += "\\n";
        break;
      case '\r':
        escaped += "\\r";
        break;
      case '\t':
        escaped += "\\t";
        break;
      default:
        escaped += ch;
        break;
    }
  }
  return escaped;
}

AssemblyGraphDatasetMetadata make_dataset(BinaryLayoutId layoutId,
                                          std::size_t rowSizeBytes,
                                          std::string path) {
  return AssemblyGraphDatasetMetadata{
      layoutId,
      rowSizeBytes,
      0,
      0,
      std::move(path),
  };
}

AssemblyGraphStoreOptions normalize_options(AssemblyGraphStoreOptions options) {
  if (options.indexPath.empty() && !options.metadataPath.empty()) {
    options.indexPath = options.metadataPath + ".assembly_graph_index.v1.bin";
  }
  return options;
}

void ensure_open(const std::ofstream& stream, std::string_view path, std::string_view role) {
  if (!stream.is_open()) {
    std::ostringstream message;
    message << "failed to open " << role << " file at " << path;
    throw std::runtime_error(message.str());
  }
}

std::uint64_t checked_file_size(std::ifstream& stream, std::string_view path) {
  stream.seekg(0, std::ios::end);
  const std::streamoff size = stream.tellg();
  if (size < 0) {
    std::ostringstream message;
    message << "failed to determine file size for " << path;
    throw std::runtime_error(message.str());
  }
  stream.seekg(0, std::ios::beg);
  return static_cast<std::uint64_t>(size);
}

template <typename Row>
void write_row(std::ofstream& stream,
               const Row& row,
               AssemblyGraphDatasetMetadata& metadata,
               std::string_view role) {
  stream.write(reinterpret_cast<const char*>(&row), static_cast<std::streamsize>(sizeof(Row)));
  if (!stream) {
    std::ostringstream message;
    message << "failed to write " << role << " row";
    throw std::runtime_error(message.str());
  }
  metadata.rowCount += 1;
  metadata.byteLength += sizeof(Row);
}

template <typename Row>
std::vector<Row> read_rows(std::string_view path,
                           std::uint64_t rowOffset,
                           std::size_t rowCount,
                           std::string_view role) {
  std::ifstream input(std::string(path), std::ios::binary);
  if (!input.is_open()) {
    std::ostringstream message;
    message << "failed to open " << role << " file at " << path;
    throw std::runtime_error(message.str());
  }

  const std::uint64_t fileBytes = checked_file_size(input, path);
  if (fileBytes % sizeof(Row) != 0) {
    std::ostringstream message;
    message << role << " file size is not a whole-row multiple";
    throw std::runtime_error(message.str());
  }
  if (rowOffset > std::numeric_limits<std::uint64_t>::max() / sizeof(Row) ||
      rowCount > std::numeric_limits<std::uint64_t>::max() / sizeof(Row)) {
    std::ostringstream message;
    message << role << " read range exceeds uint64 capacity";
    throw std::runtime_error(message.str());
  }

  const std::uint64_t byteOffset = rowOffset * sizeof(Row);
  const std::uint64_t byteLength = static_cast<std::uint64_t>(rowCount) * sizeof(Row);
  if (byteOffset > fileBytes || byteLength > fileBytes - byteOffset) {
    std::ostringstream message;
    message << role << " read range is outside the file";
    throw std::runtime_error(message.str());
  }
  if (byteLength > static_cast<std::uint64_t>(std::numeric_limits<std::streamsize>::max())) {
    std::ostringstream message;
    message << role << " read range exceeds streamsize capacity";
    throw std::runtime_error(message.str());
  }

  std::vector<Row> rows(rowCount);
  input.seekg(static_cast<std::streamoff>(byteOffset), std::ios::beg);
  input.read(reinterpret_cast<char*>(rows.data()), static_cast<std::streamsize>(byteLength));
  if (!input) {
    std::ostringstream message;
    message << "failed to read " << role << " rows";
    throw std::runtime_error(message.str());
  }
  return rows;
}

void validate_query(const AssemblyGraphQuery& query, std::string_view role) {
  if (query.filterTime && query.timeEnd < query.timeStart) {
    std::ostringstream message;
    message << role << " query time bounds are not ordered";
    throw std::invalid_argument(message.str());
  }
}

bool interval_overlaps(double start, double end, const AssemblyGraphQuery& query) {
  if (!query.filterTime) {
    return true;
  }
  return !(end < query.timeStart || start > query.timeEnd);
}

bool point_in_range(double time, const AssemblyGraphQuery& query) {
  if (!query.filterTime) {
    return true;
  }
  return query.timeStart <= time && time <= query.timeEnd;
}

bool index_time_overlaps(double start, double end, const AssemblyGraphStoreIndexQuery& query) {
  if (!query.filterTime) {
    return true;
  }
  return !(end < query.timeStart || start > query.timeEnd);
}

bool index_byte_range_overlaps(std::uint64_t start,
                               std::uint64_t length,
                               const AssemblyGraphStoreIndexQuery& query) {
  if (!query.filterByteRange) {
    return true;
  }
  const std::uint64_t end = start + length;
  return start < query.byteEnd && end > query.byteStart;
}

void write_dataset_manifest(std::ofstream& output,
                            std::string_view name,
                            const AssemblyGraphDatasetMetadata& metadata,
                            bool trailingComma) {
  output << "    \"" << name << "\": {\n";
  output << "      \"layout\": \"" << to_string(metadata.layoutId) << "\",\n";
  output << "      \"rowSizeBytes\": " << metadata.rowSizeBytes << ",\n";
  output << "      \"rowCount\": " << metadata.rowCount << ",\n";
  output << "      \"byteLength\": " << metadata.byteLength << ",\n";
  output << "      \"path\": \"" << json_escape(metadata.path) << "\"\n";
  output << "    }" << (trailingComma ? "," : "") << "\n";
}

}  // namespace

AssemblyGraphStoreWriter::AssemblyGraphStoreWriter(AssemblyGraphStoreOptions options)
    : options_(normalize_options(std::move(options))),
      metadata_{
          options_.storeId,
          "solver-assembly-graph-manifest.v1",
          NumericType::F64,
          0.0,
          0.0,
          false,
          options_.durable,
          make_dataset(BinaryLayoutId::AssemblyStateV1,
                       sizeof(AssemblyStateRowF64),
                       options_.statePath),
          make_dataset(BinaryLayoutId::AssemblyMembershipV1,
                       sizeof(AssemblyMembershipRowF64),
                       options_.membershipPath),
          make_dataset(BinaryLayoutId::AssemblyHierarchyV1,
                       sizeof(AssemblyHierarchyRowF64),
                       options_.hierarchyPath),
          make_dataset(BinaryLayoutId::AssemblyEventsV1,
                       sizeof(AssemblyEventRowF64),
                       options_.eventPath),
          make_dataset(BinaryLayoutId::AssemblyGraphIndexV1,
                       sizeof(AssemblyGraphStoreIndexRowF64),
                       options_.indexPath),
          options_.metadataPath,
      },
      stateStream_(options_.statePath, std::ios::binary | std::ios::trunc),
      membershipStream_(options_.membershipPath, std::ios::binary | std::ios::trunc),
      hierarchyStream_(options_.hierarchyPath, std::ios::binary | std::ios::trunc),
      eventStream_(options_.eventPath, std::ios::binary | std::ios::trunc),
      indexStream_(options_.indexPath, std::ios::binary | std::ios::trunc) {
  if (options_.statePath.empty() || options_.membershipPath.empty() ||
      options_.hierarchyPath.empty() || options_.eventPath.empty() ||
      options_.metadataPath.empty() || options_.indexPath.empty()) {
    throw std::invalid_argument(
        "assembly graph store requires state, membership, hierarchy, event, index, and metadata paths");
  }
  ensure_open(stateStream_, options_.statePath, "assembly-state");
  ensure_open(membershipStream_, options_.membershipPath, "assembly-membership");
  ensure_open(hierarchyStream_, options_.hierarchyPath, "assembly-hierarchy");
  ensure_open(eventStream_, options_.eventPath, "assembly-event");
  ensure_open(indexStream_, options_.indexPath, "assembly-graph-index");
}

AssemblyGraphStoreWriter::~AssemblyGraphStoreWriter() noexcept {
  try {
    if (!closed_) {
      close();
    }
  } catch (...) {
  }
}

void AssemblyGraphStoreWriter::append_state(const AssemblyStateRowF64& row) {
  const std::uint64_t rowOffset = metadata_.states.rowCount;
  write_row(stateStream_, row, metadata_.states, "assembly-state");
  append_index(AssemblyGraphStoreIndexLayout::AssemblyState,
               AssemblyGraphStoreIndexKeyKind::Assembly,
               row.assemblyKey,
               rowOffset,
               1,
               row.timeStart,
               row.timeEnd,
               rowOffset * sizeof(AssemblyStateRowF64),
               sizeof(AssemblyStateRowF64),
               row.statusFlags);
  include_time_range(row.timeStart, row.timeEnd);
}

void AssemblyGraphStoreWriter::append_membership(const AssemblyMembershipRowF64& row) {
  const std::uint64_t rowOffset = metadata_.memberships.rowCount;
  write_row(membershipStream_, row, metadata_.memberships, "assembly-membership");
  append_index(AssemblyGraphStoreIndexLayout::AssemblyMembership,
               AssemblyGraphStoreIndexKeyKind::Path,
               row.pathKey,
               rowOffset,
               1,
               row.timeStart,
               row.timeEnd,
               rowOffset * sizeof(AssemblyMembershipRowF64),
               sizeof(AssemblyMembershipRowF64),
               row.statusFlags);
  append_index(AssemblyGraphStoreIndexLayout::AssemblyMembership,
               AssemblyGraphStoreIndexKeyKind::Assembly,
               row.assemblyKey,
               rowOffset,
               1,
               row.timeStart,
               row.timeEnd,
               rowOffset * sizeof(AssemblyMembershipRowF64),
               sizeof(AssemblyMembershipRowF64),
               row.statusFlags);
  include_time_range(row.timeStart, row.timeEnd);
}

void AssemblyGraphStoreWriter::append_hierarchy(const AssemblyHierarchyRowF64& row) {
  const std::uint64_t rowOffset = metadata_.hierarchy.rowCount;
  write_row(hierarchyStream_, row, metadata_.hierarchy, "assembly-hierarchy");
  append_index(AssemblyGraphStoreIndexLayout::AssemblyHierarchy,
               AssemblyGraphStoreIndexKeyKind::ParentAssembly,
               row.parentAssemblyKey,
               rowOffset,
               1,
               row.timeStart,
               row.timeEnd,
               rowOffset * sizeof(AssemblyHierarchyRowF64),
               sizeof(AssemblyHierarchyRowF64),
               row.statusFlags);
  append_index(AssemblyGraphStoreIndexLayout::AssemblyHierarchy,
               AssemblyGraphStoreIndexKeyKind::ChildAssembly,
               row.childAssemblyKey,
               rowOffset,
               1,
               row.timeStart,
               row.timeEnd,
               rowOffset * sizeof(AssemblyHierarchyRowF64),
               sizeof(AssemblyHierarchyRowF64),
               row.statusFlags);
  include_time_range(row.timeStart, row.timeEnd);
}

void AssemblyGraphStoreWriter::append_event(const AssemblyEventRowF64& row) {
  const std::uint64_t rowOffset = metadata_.events.rowCount;
  write_row(eventStream_, row, metadata_.events, "assembly-event");
  append_index(AssemblyGraphStoreIndexLayout::AssemblyEvents,
               AssemblyGraphStoreIndexKeyKind::Path,
               row.relatedPathKey,
               rowOffset,
               1,
               row.eventTime,
               row.eventTime,
               rowOffset * sizeof(AssemblyEventRowF64),
               sizeof(AssemblyEventRowF64),
               row.statusFlags);
  append_index(AssemblyGraphStoreIndexLayout::AssemblyEvents,
               AssemblyGraphStoreIndexKeyKind::Assembly,
               row.relatedAssemblyKey,
               rowOffset,
               1,
               row.eventTime,
               row.eventTime,
               rowOffset * sizeof(AssemblyEventRowF64),
               sizeof(AssemblyEventRowF64),
               row.statusFlags);
  include_time_range(row.eventTime, row.eventTime);
}

void AssemblyGraphStoreWriter::flush() {
  stateStream_.flush();
  membershipStream_.flush();
  hierarchyStream_.flush();
  eventStream_.flush();
  indexStream_.flush();
  if (!stateStream_ || !membershipStream_ || !hierarchyStream_ || !eventStream_ || !indexStream_) {
    throw std::runtime_error("failed to flush assembly graph store");
  }
}

AssemblyGraphStoreMetadata AssemblyGraphStoreWriter::close() {
  if (closed_) {
    return metadata_;
  }
  flush();
  stateStream_.close();
  membershipStream_.close();
  hierarchyStream_.close();
  eventStream_.close();
  indexStream_.close();
  write_manifest();
  closed_ = true;
  return metadata_;
}

const AssemblyGraphStoreMetadata& AssemblyGraphStoreWriter::metadata() const {
  return metadata_;
}

void AssemblyGraphStoreWriter::include_time_range(double start, double end) {
  if (!std::isfinite(start) || !std::isfinite(end)) {
    return;
  }
  const double orderedStart = std::min(start, end);
  const double orderedEnd = std::max(start, end);
  if (!metadata_.hasTimeRange) {
    metadata_.timeStart = orderedStart;
    metadata_.timeEnd = orderedEnd;
    metadata_.hasTimeRange = true;
    return;
  }
  metadata_.timeStart = std::min(metadata_.timeStart, orderedStart);
  metadata_.timeEnd = std::max(metadata_.timeEnd, orderedEnd);
}

void AssemblyGraphStoreWriter::append_index(AssemblyGraphStoreIndexLayout layoutCode,
                                            AssemblyGraphStoreIndexKeyKind keyKind,
                                            std::uint64_t key,
                                            std::uint64_t rowOffset,
                                            std::uint64_t rowCount,
                                            double timeStart,
                                            double timeEnd,
                                            std::uint64_t byteOffset,
                                            std::uint64_t byteLength,
                                            std::uint32_t stateFlags) {
  if (key == 0 || rowCount == 0) {
    return;
  }
  const AssemblyGraphStoreIndexRowF64 row{
      static_cast<std::uint32_t>(layoutCode),
      static_cast<std::uint32_t>(keyKind),
      key,
      rowOffset,
      rowCount,
      std::min(timeStart, timeEnd),
      std::max(timeStart, timeEnd),
      byteOffset,
      byteLength,
      stateFlags,
      0,
  };
  write_row(indexStream_, row, metadata_.index, "assembly-graph-index");
}

void AssemblyGraphStoreWriter::write_manifest() const {
  std::ofstream output(options_.metadataPath, std::ios::binary | std::ios::trunc);
  if (!output.is_open()) {
    std::ostringstream message;
    message << "failed to open assembly graph metadata file at " << options_.metadataPath;
    throw std::runtime_error(message.str());
  }

  output << "{\n";
  output << "  \"storeId\": \"" << json_escape(metadata_.storeId) << "\",\n";
  output << "  \"manifestVersion\": \"" << json_escape(metadata_.manifestVersion) << "\",\n";
  output << "  \"numericType\": \"" << to_string(metadata_.numericType) << "\",\n";
  output << "  \"byteOrder\": \"little-endian\",\n";
  output << "  \"timeRange\": ";
  if (metadata_.hasTimeRange) {
    output << "{\"start\": " << metadata_.timeStart << ", \"end\": " << metadata_.timeEnd << "},\n";
  } else {
    output << "null,\n";
  }
  output << "  \"durable\": " << (metadata_.durable ? "true" : "false") << ",\n";
  output << "  \"metadataPath\": \"" << json_escape(metadata_.metadataPath) << "\",\n";
  output << "  \"datasets\": {\n";
  write_dataset_manifest(output, "states", metadata_.states, true);
  write_dataset_manifest(output, "memberships", metadata_.memberships, true);
  write_dataset_manifest(output, "hierarchy", metadata_.hierarchy, true);
  write_dataset_manifest(output, "events", metadata_.events, true);
  write_dataset_manifest(output, "index", metadata_.index, false);
  output << "  }\n";
  output << "}\n";

  if (!output) {
    throw std::runtime_error("failed to write assembly graph metadata manifest");
  }
}

std::vector<AssemblyStateRowF64> read_assembly_state_rows(std::string_view path,
                                                          std::uint64_t rowOffset,
                                                          std::size_t rowCount) {
  return read_rows<AssemblyStateRowF64>(path, rowOffset, rowCount, "assembly-state");
}

std::vector<AssemblyMembershipRowF64> read_assembly_membership_rows(
    std::string_view path,
    std::uint64_t rowOffset,
    std::size_t rowCount) {
  return read_rows<AssemblyMembershipRowF64>(path, rowOffset, rowCount, "assembly-membership");
}

std::vector<AssemblyHierarchyRowF64> read_assembly_hierarchy_rows(std::string_view path,
                                                                  std::uint64_t rowOffset,
                                                                  std::size_t rowCount) {
  return read_rows<AssemblyHierarchyRowF64>(path, rowOffset, rowCount, "assembly-hierarchy");
}

std::vector<AssemblyEventRowF64> read_assembly_event_rows(std::string_view path,
                                                          std::uint64_t rowOffset,
                                                          std::size_t rowCount) {
  return read_rows<AssemblyEventRowF64>(path, rowOffset, rowCount, "assembly-event");
}

std::vector<AssemblyGraphStoreIndexRowF64> read_assembly_graph_store_index_rows(
    std::string_view path,
    std::uint64_t rowOffset,
    std::size_t rowCount) {
  return read_rows<AssemblyGraphStoreIndexRowF64>(
      path,
      rowOffset,
      rowCount,
      "assembly-graph-index");
}

std::vector<AssemblyStateRowF64> query_assembly_states(
    const std::vector<AssemblyStateRowF64>& rows,
    const AssemblyGraphQuery& query) {
  validate_query(query, "assembly-state");
  std::vector<AssemblyStateRowF64> matches;
  for (const AssemblyStateRowF64& row : rows) {
    if (query.filterAssembly && row.assemblyKey != query.assemblyKey) {
      continue;
    }
    if (!interval_overlaps(row.timeStart, row.timeEnd, query)) {
      continue;
    }
    matches.push_back(row);
  }
  return matches;
}

std::vector<AssemblyMembershipRowF64> query_assembly_memberships(
    const std::vector<AssemblyMembershipRowF64>& rows,
    const AssemblyGraphQuery& query) {
  validate_query(query, "assembly-membership");
  std::vector<AssemblyMembershipRowF64> matches;
  for (const AssemblyMembershipRowF64& row : rows) {
    if (query.filterPath && row.pathKey != query.pathKey) {
      continue;
    }
    if (query.filterAssembly && row.assemblyKey != query.assemblyKey) {
      continue;
    }
    if (!interval_overlaps(row.timeStart, row.timeEnd, query)) {
      continue;
    }
    matches.push_back(row);
  }
  return matches;
}

std::vector<AssemblyHierarchyRowF64> query_assembly_hierarchy(
    const std::vector<AssemblyHierarchyRowF64>& rows,
    const AssemblyGraphQuery& query) {
  validate_query(query, "assembly-hierarchy");
  std::vector<AssemblyHierarchyRowF64> matches;
  for (const AssemblyHierarchyRowF64& row : rows) {
    if (query.filterAssembly && row.parentAssemblyKey != query.assemblyKey &&
        row.childAssemblyKey != query.assemblyKey) {
      continue;
    }
    if (!interval_overlaps(row.timeStart, row.timeEnd, query)) {
      continue;
    }
    matches.push_back(row);
  }
  return matches;
}

std::vector<AssemblyEventRowF64> query_assembly_events(
    const std::vector<AssemblyEventRowF64>& rows,
    const AssemblyGraphQuery& query) {
  validate_query(query, "assembly-event");
  std::vector<AssemblyEventRowF64> matches;
  for (const AssemblyEventRowF64& row : rows) {
    if (query.filterPath && row.relatedPathKey != query.pathKey) {
      continue;
    }
    if (query.filterAssembly && row.relatedAssemblyKey != query.assemblyKey) {
      continue;
    }
    if (!point_in_range(row.eventTime, query)) {
      continue;
    }
    matches.push_back(row);
  }
  return matches;
}

std::vector<AssemblyGraphStoreIndexRowF64> query_assembly_graph_store_index(
    const std::vector<AssemblyGraphStoreIndexRowF64>& rows,
    const AssemblyGraphStoreIndexQuery& query) {
  if (query.filterTime && query.timeEnd < query.timeStart) {
    throw std::invalid_argument("assembly graph index query time bounds are not ordered");
  }
  if (query.filterByteRange && query.byteEnd < query.byteStart) {
    throw std::invalid_argument("assembly graph index query byte bounds are not ordered");
  }
  std::vector<AssemblyGraphStoreIndexRowF64> matches;
  for (const AssemblyGraphStoreIndexRowF64& row : rows) {
    if (query.filterLayout && row.layoutCode != static_cast<std::uint32_t>(query.layoutCode)) {
      continue;
    }
    if (query.filterKeyKind && row.keyKind != static_cast<std::uint32_t>(query.keyKind)) {
      continue;
    }
    if (query.filterKey && row.key != query.key) {
      continue;
    }
    if (!index_time_overlaps(row.timeStart, row.timeEnd, query)) {
      continue;
    }
    if (!index_byte_range_overlaps(row.byteOffset, row.byteLength, query)) {
      continue;
    }
    matches.push_back(row);
  }
  return matches;
}

}  // namespace architrino::solver
