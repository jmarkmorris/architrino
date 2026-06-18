#pragma once

#include "architrino/solver/AssemblyGraph.hpp"
#include "architrino/solver/BinaryLayouts.hpp"

#include <cstddef>
#include <cstdint>
#include <fstream>
#include <string>
#include <string_view>
#include <vector>

namespace architrino::solver {

struct AssemblyGraphStoreOptions {
  std::string storeId = "assembly-graph";
  std::string statePath;
  std::string membershipPath;
  std::string hierarchyPath;
  std::string eventPath;
  std::string metadataPath;
  bool durable = true;
  std::string indexPath;
};

enum class AssemblyGraphStoreIndexLayout : std::uint32_t {
  AssemblyState = 1,
  AssemblyMembership = 2,
  AssemblyHierarchy = 3,
  AssemblyEvents = 4,
};

enum class AssemblyGraphStoreIndexKeyKind : std::uint32_t {
  Path = 1,
  Assembly = 2,
  ParentAssembly = 3,
  ChildAssembly = 4,
};

struct AssemblyGraphStoreIndexRowF64 {
  std::uint32_t layoutCode = 0;
  std::uint32_t keyKind = 0;
  std::uint64_t key = 0;
  std::uint64_t rowOffset = 0;
  std::uint64_t rowCount = 0;
  double timeStart = 0.0;
  double timeEnd = 0.0;
  std::uint64_t byteOffset = 0;
  std::uint64_t byteLength = 0;
  std::uint32_t stateFlags = 0;
  std::uint32_t reserved0 = 0;
};

struct AssemblyGraphDatasetMetadata {
  BinaryLayoutId layoutId = BinaryLayoutId::AssemblyStateV1;
  std::size_t rowSizeBytes = 0;
  std::uint64_t rowCount = 0;
  std::uint64_t byteLength = 0;
  std::string path;
};

struct AssemblyGraphStoreMetadata {
  std::string storeId;
  std::string manifestVersion = "solver-assembly-graph-manifest.v1";
  NumericType numericType = NumericType::F64;
  double timeStart = 0.0;
  double timeEnd = 0.0;
  bool hasTimeRange = false;
  bool durable = true;
  AssemblyGraphDatasetMetadata states;
  AssemblyGraphDatasetMetadata memberships;
  AssemblyGraphDatasetMetadata hierarchy;
  AssemblyGraphDatasetMetadata events;
  AssemblyGraphDatasetMetadata index;
  std::string metadataPath;
};

struct AssemblyGraphQuery {
  std::uint64_t pathKey = 0;
  std::uint64_t assemblyKey = 0;
  double timeStart = 0.0;
  double timeEnd = 0.0;
  bool filterPath = false;
  bool filterAssembly = false;
  bool filterTime = false;
};

struct AssemblyGraphStoreIndexQuery {
  AssemblyGraphStoreIndexLayout layoutCode = AssemblyGraphStoreIndexLayout::AssemblyState;
  AssemblyGraphStoreIndexKeyKind keyKind = AssemblyGraphStoreIndexKeyKind::Assembly;
  std::uint64_t key = 0;
  double timeStart = 0.0;
  double timeEnd = 0.0;
  std::uint64_t byteStart = 0;
  std::uint64_t byteEnd = 0;
  bool filterLayout = false;
  bool filterKeyKind = false;
  bool filterKey = false;
  bool filterTime = false;
  bool filterByteRange = false;
};

class AssemblyGraphStoreWriter {
 public:
  explicit AssemblyGraphStoreWriter(AssemblyGraphStoreOptions options);
  ~AssemblyGraphStoreWriter() noexcept;

  AssemblyGraphStoreWriter(const AssemblyGraphStoreWriter&) = delete;
  AssemblyGraphStoreWriter& operator=(const AssemblyGraphStoreWriter&) = delete;

  void append_state(const AssemblyStateRowF64& row);
  void append_membership(const AssemblyMembershipRowF64& row);
  void append_hierarchy(const AssemblyHierarchyRowF64& row);
  void append_event(const AssemblyEventRowF64& row);
  void flush();
  AssemblyGraphStoreMetadata close();
  const AssemblyGraphStoreMetadata& metadata() const;

 private:
  void include_time_range(double start, double end);
  void append_index(AssemblyGraphStoreIndexLayout layoutCode,
                    AssemblyGraphStoreIndexKeyKind keyKind,
                    std::uint64_t key,
                    std::uint64_t rowOffset,
                    std::uint64_t rowCount,
                    double timeStart,
                    double timeEnd,
                    std::uint64_t byteOffset,
                    std::uint64_t byteLength,
                    std::uint32_t stateFlags = 0);
  void write_manifest() const;

  AssemblyGraphStoreOptions options_;
  AssemblyGraphStoreMetadata metadata_;
  bool closed_ = false;
  std::ofstream stateStream_;
  std::ofstream membershipStream_;
  std::ofstream hierarchyStream_;
  std::ofstream eventStream_;
  std::ofstream indexStream_;
};

std::vector<AssemblyStateRowF64> read_assembly_state_rows(std::string_view path,
                                                          std::uint64_t rowOffset,
                                                          std::size_t rowCount);
std::vector<AssemblyMembershipRowF64> read_assembly_membership_rows(std::string_view path,
                                                                    std::uint64_t rowOffset,
                                                                    std::size_t rowCount);
std::vector<AssemblyHierarchyRowF64> read_assembly_hierarchy_rows(std::string_view path,
                                                                  std::uint64_t rowOffset,
                                                                  std::size_t rowCount);
std::vector<AssemblyEventRowF64> read_assembly_event_rows(std::string_view path,
                                                          std::uint64_t rowOffset,
                                                          std::size_t rowCount);
std::vector<AssemblyGraphStoreIndexRowF64> read_assembly_graph_store_index_rows(
    std::string_view path,
    std::uint64_t rowOffset,
    std::size_t rowCount);

std::vector<AssemblyStateRowF64> query_assembly_states(
    const std::vector<AssemblyStateRowF64>& rows,
    const AssemblyGraphQuery& query);
std::vector<AssemblyMembershipRowF64> query_assembly_memberships(
    const std::vector<AssemblyMembershipRowF64>& rows,
    const AssemblyGraphQuery& query);
std::vector<AssemblyHierarchyRowF64> query_assembly_hierarchy(
    const std::vector<AssemblyHierarchyRowF64>& rows,
    const AssemblyGraphQuery& query);
std::vector<AssemblyEventRowF64> query_assembly_events(
    const std::vector<AssemblyEventRowF64>& rows,
    const AssemblyGraphQuery& query);
std::vector<AssemblyGraphStoreIndexRowF64> query_assembly_graph_store_index(
    const std::vector<AssemblyGraphStoreIndexRowF64>& rows,
    const AssemblyGraphStoreIndexQuery& query);

}  // namespace architrino::solver
