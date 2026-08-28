#include "architrino/eom/Decimal.hpp"
#include "architrino/eom/ExactPairBatch.hpp"
#include "architrino/eom/History.hpp"

#include <boost/multiprecision/cpp_dec_float.hpp>
#include <boost/multiprecision/cpp_int.hpp>
#include <boost/property_tree/json_parser.hpp>
#include <boost/property_tree/ptree.hpp>

#include <algorithm>
#include <array>
#include <atomic>
#include <bit>
#include <cerrno>
#include <cfenv>
#include <chrono>
#include <cmath>
#include <condition_variable>
#include <cstdint>
#include <filesystem>
#include <iomanip>
#include <iostream>
#include <limits>
#include <map>
#include <memory>
#include <mutex>
#include <set>
#include <sstream>
#include <stdexcept>
#include <string>
#include <string_view>
#include <thread>
#include <type_traits>
#include <vector>
#include <fcntl.h>
#include <sys/stat.h>
#include <unistd.h>

// A prescribed-circle subject, not an independent oracle or evolution solver.
// Infrastructure serializers follow the EOM API; geometry is constructed here
// directly from the literal circle law, never from reference output.
namespace {
namespace eom = architrino::eom;
namespace fs = std::filesystem;
using Tree = boost::property_tree::ptree;
using Real = boost::multiprecision::cpp_dec_float_100;
using Integer = boost::multiprecision::cpp_int;
using Rational = boost::multiprecision::cpp_rational;
using Vector = std::array<Real, 3>;
using Clock = std::chrono::steady_clock;
constexpr std::size_t kSegments = 1000, kMaxCells = 300000;
constexpr double kWallLimit = 1800;
constexpr std::string_view kPositionError = "0.0000000000072759576141834259033203125";
constexpr std::string_view kVelocityError = "0.0000002384185791015625";
constexpr std::string_view kOutputRoot = ".local-data/braid-analysis/abc-h3-root-pilot-20260827-v1";
constexpr std::string_view kManifestSchema = "braid-program/abc-circular-history-manifest.v1";
struct SourceBinding { const char* id; const char* path; const char* hash; };
constexpr std::array<SourceBinding, 8> kSources{{
 {"circular-core", "src/prescribed-path-analysis/CircularHistoryConformance.mjs", "d5bf2aa286c28cc715d4903b35c85f5327966fd7a4fb5e7dd49e985298c600c9"},
 {"integer-primitive", "scripts/eom/derive-abc-subfield-root-reference.mjs", "2c0242d36ca47f5fc53077b0baa3db90aa5e37a97a4b6089bdaa4b86fcbfdbee"},
 {"root-reference", ".local-data/braid-analysis/parallel-agent-search/parallel-braid-prescribed-search-20260826-v1/abc-root-reference-20260827-v1.json", "c74bad1d7c5aeed4c9bb326ff711f87833ba43e39236bbc920afb2f375dc7e08"},
 {"budget-cli", "scripts/eom/derive-abc-circular-history-budget.mjs", "f20e16a1098706935df12be7e1b034fca16d64b927642f21b740465238ce0816"},
 {"construction-budget", ".local-data/braid-analysis/parallel-agent-search/parallel-braid-prescribed-search-20260826-v1/abc-circular-history-budget-20260827-v1.json", "df1b1254c867b928dac595eada4dc1f197fa2e23d2451efb114eb41de495c74a"},
 {"pilot-predeclaration", "reference/priorities/braid-program/evidence/2026-08-27-abc-h3-pilot-predeclaration.md", "886be366bf4051ecb0339930631ca81b0a85af016ed07a24f3bf0216854fef0c"},
 {"source-manifest", "reference/priorities/braid-program/campaigns/parallel-agent-braid-search.v1.json", "739eb4706ae1be9d427c1a643419c7e5d5455fe85a26ad5d6e490bb114d411ee"},
 {"whole-manifest-verifier", "scripts/eom/verify-abc-circular-history.mjs", "b213094bb38c73d291615042df27e8feac6711c8a7958b21688fc7414208630d"}
}};
constexpr std::array<std::string_view, 16> kCandidates{
 "a1-1","a1-2","a1-4","a2","a3-1","a3-2","a3-4","b1-1","b1-2","b1-3",
 "c1","c2","c3","c4","c5","c6"
};
// SHA-256 is used only for byte identity. The input digest is never supplied
// by the caller, and no digest is a mathematical conformance certificate.
std::string sha256(std::string_view bytes) {
  constexpr std::array<std::uint32_t, 64> k{
      0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,
      0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,
      0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,
      0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,
      0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,
      0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,
      0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,
      0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2};
  std::array<std::uint32_t, 8> h{
      0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19};
  std::vector<std::uint8_t> input(bytes.begin(), bytes.end());
  const std::uint64_t bits = static_cast<std::uint64_t>(input.size()) * 8;
  input.push_back(0x80);
  while (input.size() % 64 != 56) input.push_back(0);
  for (int shift = 56; shift >= 0; shift -= 8) input.push_back(bits >> shift);
  for (std::size_t offset = 0; offset < input.size(); offset += 64) {
    std::array<std::uint32_t, 64> w{};
    for (std::size_t i = 0; i < 16; ++i) {
      for (std::size_t j = 0; j < 4; ++j) w[i] = (w[i] << 8) | input[offset + 4*i + j];
    }
    for (std::size_t i = 16; i < 64; ++i) {
      const auto s0 = std::rotr(w[i-15],7) ^ std::rotr(w[i-15],18) ^ (w[i-15] >> 3);
      const auto s1 = std::rotr(w[i-2],17) ^ std::rotr(w[i-2],19) ^ (w[i-2] >> 10);
      w[i] = w[i-16] + s0 + w[i-7] + s1;
    }
    auto [a,b,c,d,e,f,g,z] = h;
    for (std::size_t i = 0; i < 64; ++i) {
      const auto s1 = std::rotr(e,6) ^ std::rotr(e,11) ^ std::rotr(e,25);
      const auto t1 = z + s1 + ((e & f) ^ (~e & g)) + k[i] + w[i];
      const auto s0 = std::rotr(a,2) ^ std::rotr(a,13) ^ std::rotr(a,22);
      const auto t2 = s0 + ((a & b) ^ (a & c) ^ (b & c));
      z=g; g=f; f=e; e=d+t1; d=c; c=b; b=a; a=t1+t2;
    }
    h[0]+=a; h[1]+=b; h[2]+=c; h[3]+=d; h[4]+=e; h[5]+=f; h[6]+=g; h[7]+=z;
  }
  std::ostringstream out;
  out << std::hex << std::setfill('0');
  for (const auto word : h) out << std::setw(8) << word;
  return out.str();
}
std::string quote(std::string_view text) {
  std::ostringstream out;
  out << '"';
  for (const unsigned char ch : text) {
    if (ch == '"' || ch == '\\') out << '\\' << ch;
    else if (ch < 0x20) out << "\\u" << std::hex << std::setw(4) << std::setfill('0') << unsigned(ch);
    else out << ch;
  }
  out << '"';
  return out.str();
}

struct Object {
  std::string text = "{";
  void raw(std::string_view name, std::string_view value) {
    if (text.size() > 1) text += ',';
    text += quote(name) + ':' + std::string(value);
  }
  void string(std::string_view name, std::string_view value) { raw(name, quote(value)); }
  void boolean(std::string_view name, bool value) { raw(name, value ? "true" : "false"); }
  template<class T> void number(std::string_view name, T value) {
    if constexpr (std::is_floating_point_v<T>) {
      if (!std::isfinite(value)) throw std::runtime_error("nonfinite JSON number");
    }
    std::ostringstream out;
    out << std::setprecision(std::numeric_limits<double>::max_digits10) << value;
    raw(name, out.str());
  }
  std::string finish() const { return text + '}'; }
};

template<class Range, class Function>
std::string array_json(const Range& values, Function serialize) {
  std::string result = "[";
  for (const auto& value : values) {
    if (result.size() > 1) result += ',';
    result += serialize(value);
  }
  return result + ']';
}


bool within(const fs::path& path, const fs::path& root) {
 auto p = path.begin();
 for (auto r = root.begin(); r != root.end(); ++r, ++p)
   if (p == path.end() || *p != *r) return false;
 return true;
}
std::string read_bytes(const fs::path& path) {
 constexpr std::size_t limit = 64 * 1024 * 1024;
 const int fd = ::open(path.c_str(), O_RDONLY | O_NONBLOCK);
 if (fd < 0) throw std::runtime_error("cannot open input: " + path.string());
 struct Guard { int fd; ~Guard() { ::close(fd); } } guard{fd};
 struct stat before{}, after{};
 if (::fstat(fd, &before) || !S_ISREG(before.st_mode) || before.st_size < 0 ||
     static_cast<std::uintmax_t>(before.st_size) > limit)
   throw std::runtime_error("input must be a regular file of at most 64 MiB");
 std::string bytes;
 std::array<char, 65536> buffer{};
 for (;;) {
   const auto count = ::read(fd, buffer.data(), buffer.size());
   if (count < 0 && errno == EINTR) continue;
   if (count < 0) throw std::runtime_error("input read failed");
   if (count == 0) break;
   bytes.append(buffer.data(), static_cast<std::size_t>(count));
   if (bytes.size() > limit) throw std::runtime_error("input grew beyond 64 MiB");
 }
 if (::fstat(fd, &after) || after.st_size != before.st_size ||
     bytes.size() != static_cast<std::uintmax_t>(before.st_size) ||
     after.st_mtime != before.st_mtime || after.st_ctime != before.st_ctime)
   throw std::runtime_error("input changed during read");
 return bytes;
}
Tree read_json(const std::string& bytes) {
 Tree tree; std::istringstream input(bytes);
 boost::property_tree::read_json(input, tree);
 return tree;
}
struct FrozenInputs {
 fs::path root;
 std::array<std::string, kSources.size()> bytes;
 std::string source_path, source_hash, source_bytes, speed_upper;
 std::size_t member_count;
 explicit FrozenInputs(const fs::path& requested, const std::string& candidate)
   : root(fs::canonical(requested)) {
   if (std::find(kCandidates.begin(), kCandidates.end(), candidate) == kCandidates.end())
     throw std::runtime_error("candidate absent from frozen sixteen-row census");
   for (std::size_t i = 0; i < kSources.size(); ++i) {
     const auto target = fs::canonical(root / kSources[i].path);
     if (!within(target, root)) throw std::runtime_error("bound source escapes repository");
     bytes[i] = read_bytes(target);
     if (sha256(bytes[i]) != kSources[i].hash)
       throw std::runtime_error("frozen source mismatch: " + std::string(kSources[i].id));
   }
   const auto report = read_json(bytes[2]);
   const auto& rows = report.get_child("results");
   if (!report.get<bool>("accepted") || report.get<std::string>("normalizedFieldSpeed") != "1" ||
       rows.size() != kCandidates.size()) throw std::runtime_error("root reference census invalid");
   std::size_t i = 0;
   for (const auto& entry : rows) {
     const auto& row = entry.second;
     if (row.get<std::string>("id") != kCandidates[i++] || !row.get<bool>("passed"))
       throw std::runtime_error("root reference order differs");
     if (row.get<std::string>("id") == candidate) {
       source_path = row.get<std::string>("sourcePath");
       source_hash = row.get<std::string>("sourceSha256");
       speed_upper = row.get<std::string>("vUpper");
       member_count = row.get<std::size_t>("memberCount");
     }
   }
   if (member_count != 6 && member_count != 12) throw std::runtime_error("wrong member count");
   const auto target = fs::canonical(root / source_path);
   if (!within(target, root)) throw std::runtime_error("candidate source escapes repository");
   source_bytes = read_bytes(target);
   if (sha256(source_bytes) != source_hash) throw std::runtime_error("candidate source hash mismatch");
 }
 void recheck() const {
   for (std::size_t i = 0; i < kSources.size(); ++i)
     if (read_bytes(root / kSources[i].path) != bytes[i])
       throw std::runtime_error("frozen source changed: " + std::string(kSources[i].id));
   if (read_bytes(root / source_path) != source_bytes) throw std::runtime_error("candidate source changed");
 }
 std::string binding_json() const {
   Object out; out.string("path", source_path); out.string("sha256", source_hash); return out.finish();
 }
};
class ExclusiveOutput {
 int fd_ = -1;
 public:
 ExclusiveOutput(const fs::path& requested, const fs::path& repository) {
   const auto absolute = fs::absolute(requested).lexically_normal();
   const auto parent = fs::canonical(absolute.parent_path());
   const auto admitted = fs::canonical(repository / kOutputRoot);
   if (!within(parent, admitted) || !within(admitted, repository))
     throw std::runtime_error("output must be under the ignored ABC pilot lane");
   const auto path = parent / absolute.filename();
   fd_ = ::open(path.c_str(), O_WRONLY | O_CREAT | O_EXCL | O_NOFOLLOW, 0600);
   if (fd_ < 0) throw std::runtime_error("exclusive output creation failed: " + path.string());
 }
 ExclusiveOutput(const ExclusiveOutput&) = delete;
 ExclusiveOutput& operator=(const ExclusiveOutput&) = delete;
 ~ExclusiveOutput() { if (fd_ >= 0) ::close(fd_); }
 void write(std::string_view bytes) {
   while (!bytes.empty()) {
     const auto count = ::write(fd_, bytes.data(), bytes.size());
     if (count < 0 && errno == EINTR) continue;
     if (count <= 0) throw std::runtime_error("output write failed");
     bytes.remove_prefix(static_cast<std::size_t>(count));
   }
 }
 void sync() { if (::fsync(fd_)) throw std::runtime_error("output sync failed"); }
};
Integer pow10(unsigned exponent) {
  Integer result = 1;
  while (exponent-- > 0) result *= 10;
  return result;
}

Rational exact_decimal(std::string_view token) {
  if (token.empty() || token.size() > 1024) throw std::runtime_error("invalid exact decimal token");
  bool negative = false;
  std::size_t index = 0;
  if (token[index] == '-' || token[index] == '+') negative = token[index++] == '-';
  Integer coefficient = 0;
  int fraction = 0;
  bool dot = false, digit = false;
  for (; index < token.size() && token[index] != 'e' && token[index] != 'E'; ++index) {
    const char c = token[index];
    if (c == '.' && !dot) { dot = true; continue; }
    if (c < '0' || c > '9') throw std::runtime_error("invalid exact decimal digit");
    coefficient = coefficient * 10 + (c - '0');
    if (dot) ++fraction;
    digit = true;
  }
  if (!digit) throw std::runtime_error("exact decimal has no digits");
  int exponent = 0;
  if (index < token.size()) {
    std::string suffix(token.substr(index + 1));
    std::size_t used = 0;
    exponent = std::stoi(suffix, &used);
    if (used != suffix.size()) throw std::runtime_error("invalid decimal exponent");
  }
  exponent -= fraction;
  if (exponent < -2000 || exponent > 2000) throw std::runtime_error("decimal exponent out of bounds");
  if (negative) coefficient = -coefficient;
  Rational result(coefficient);
  if (exponent >= 0) result *= pow10(static_cast<unsigned>(exponent));
  else result /= pow10(static_cast<unsigned>(-exponent));
  return result;
}

std::string scaled_integer(Integer coefficient, unsigned places) {
  const bool negative = coefficient < 0;
  if (negative) coefficient = -coefficient;
  std::string digits = coefficient.str();
  if (digits.size() <= places) digits.insert(0, places + 1 - digits.size(), '0');
  if (places != 0) digits.insert(digits.size() - places, 1, '.');
  while (places != 0 && digits.back() == '0') digits.pop_back();
  if (digits.back() == '.') digits.pop_back();
  return (negative ? "-" : "") + digits;
}


std::string time_token(std::int64_t ticks) { return scaled_integer(Integer(ticks), 5); }
std::string real_token(const Real& value) {
 // The independent fixed-point checker admits exact multiples of 10^-60.
 // Rounding here is subject construction, not an asserted error proof.
 std::string token = value.str(60, std::ios_base::fixed);
 if (token.find('.') != std::string::npos) {
   while (token.back() == '0') token.pop_back();
   if (token.back() == '.') token.pop_back();
 }
 if (token == "-0") token = "0";
 if (token.size() > 128) throw std::runtime_error("coefficient token too long");
 (void)eom::parse_finite_double(token, "constructed coefficient");
 return token;
}
std::string bits(double value) {
 std::ostringstream out;
 out << std::hex << std::setfill('0') << std::setw(16) << std::bit_cast<std::uint64_t>(value);
 return out.str();
}
void check_environment() {
#ifdef __FAST_MATH__
 throw std::runtime_error("fast-math build is inadmissible");
#endif
 static_assert(std::numeric_limits<double>::is_iec559 && sizeof(double) == 8);
 if (std::fegetround() != FE_TONEAREST) throw std::runtime_error("nearest rounding required");
 volatile double tiny = std::numeric_limits<double>::denorm_min(), two = 2.0, one = 1.0;
 volatile double product = tiny * two, preserved = tiny * one;
 if (product != std::ldexp(1.0, -1073) || preserved != tiny || product == 0 || preserved == 0)
   throw std::runtime_error("gradual underflow environment control failed");
}
struct Progress {
 const Clock::time_point started = Clock::now();
 std::mutex mutex;
 std::condition_variable changed;
 std::atomic<bool> stop{false};
 std::atomic<std::size_t> constructed{0}, completed{0}, passing{0}, failures{0};
 bool finished = false;
 std::string stage = "starting", cause, manifest_hash;
 std::thread heartbeat;
 Progress() : heartbeat([this] {
   std::unique_lock lock(mutex);
   while (!changed.wait_for(lock, std::chrono::seconds(15), [this] { return finished; })) {
     if (elapsed() >= kWallLimit) { stop.store(true); if (cause.empty()) cause = "wall_limit_exceeded"; }
     emit_locked("heartbeat");
   }
 }) {}
 ~Progress() {
   { std::lock_guard lock(mutex); finished = true; }
   changed.notify_all(); heartbeat.join();
 }
 double elapsed() const { return std::chrono::duration<double>(Clock::now()-started).count(); }
 void require_live() {
   if (stop.load() || elapsed() >= kWallLimit) throw std::runtime_error("adapter deadline or stop reached");
 }
 void emit_locked(std::string_view event, const std::string& detail = "") const {
   Object out; out.string("schema", "braid-program/abc-enclosed-root-adapter-event.v1");
   out.string("event", event); out.string("stage", stage); out.string("failureCode", cause);
   out.number("constructedMemberSegments", constructed.load()); out.number("completedRows", completed.load());
   out.number("passingRows", passing.load()); out.number("failureCount", failures.load());
   out.number("elapsedWallSeconds", elapsed()); out.string("historyManifestSha256", manifest_hash);
   out.boolean("h3EvidenceEligible", false);
   if (!detail.empty()) out.raw("detail", detail);
   std::cerr << out.finish() << '\n' << std::flush;
 }
 void event(std::string_view next, const std::string& detail = "") {
   std::lock_guard lock(mutex); stage = std::string(next); emit_locked(next, detail);
 }
 void fail(const std::string& message) {
   stop.store(true); std::lock_guard lock(mutex);
   if (cause.empty()) cause = message;
 }
 void identity(const std::string& hash) { std::lock_guard lock(mutex); manifest_hash = hash; }
};
Vector vector_value(const Tree& array) {
 if (array.size() != 3) throw std::runtime_error("expected three-coordinate source vector");
 Vector result; std::size_t index = 0;
 for (const auto& item : array) result[index++] = Real(item.second.data());
 return result;
}
struct Member {
 std::size_t index;
 std::string constituent, worldline, history_id;
 int polarity;
 Vector center, u, v;
 Real epoch, phase, omega;
 double inflated_speed_upper = 0;
 std::unique_ptr<eom::RetainedHistory> history;
};
std::vector<Member> source_members(const FrozenInputs& inputs, const std::string& manifest_id) {
 const auto source = read_json(inputs.source_bytes);
 if (source.get<std::string>("schema") != "prescribed-assembly-spec.v2" ||
     source.get<std::string>("history.start") != "0" ||
     source.get<std::string>("history.end") != "8" ||
     source.get<std::string>("history.delayHorizon") != "2")
   throw std::runtime_error("source history or schema differs");
 const auto& order = source.get_child("relationships.sourceOrder");
 const auto& constituents = source.get_child("constituents");
 const auto& worldlines = source.get_child("worldlines");
 if (order.size() != inputs.member_count || constituents.size() != order.size() ||
     worldlines.size() != order.size()) throw std::runtime_error("member census differs");
 std::set<std::string> identities, worldline_ids;
 std::vector<Member> result;
 for (const auto& item : order) {
   const auto identity = item.second.data();
   if (!identities.insert(identity).second) throw std::runtime_error("duplicate constituent");
   const auto constituent = std::find_if(constituents.begin(), constituents.end(), [&](const auto& row) {
     return row.second.template get<std::string>("id") == identity;
   });
   const auto worldline = std::find_if(worldlines.begin(), worldlines.end(), [&](const auto& row) {
     return row.second.template get<std::string>("constituentId") == identity;
   });
   if (constituent == constituents.end() || worldline == worldlines.end())
     throw std::runtime_error("missing constituent/worldline");
   const auto& op = worldline->second.get_child("operator");
   const auto center_rate = vector_value(op.get_child("centerVelocity"));
   if (op.get<std::string>("kind") != "moving-circular.v1" ||
       Real(op.get<std::string>("angularAcceleration")) != 0 ||
       std::any_of(center_rate.begin(), center_rate.end(), [](const auto& value) { return value != 0; }))
     throw std::runtime_error("only frozen stationary-center constant-cadence circles admitted");
   Member member{};
   member.index = result.size(); member.constituent = identity;
   member.worldline = worldline->second.get<std::string>("id");
   if (!worldline_ids.insert(member.worldline).second ||
       constituent->second.get<std::string>("worldlineId") != member.worldline)
     throw std::runtime_error("worldline identity/link differs");
   member.history_id = manifest_id + "/" + member.worldline;
   member.polarity = constituent->second.get<int>("polarity");
   if (member.polarity != 1 && member.polarity != -1) throw std::runtime_error("invalid polarity");
   member.center = vector_value(op.get_child("centerAtEpoch"));
   member.u = vector_value(op.get_child("radiusU")); member.v = vector_value(op.get_child("radiusV"));
   member.epoch = Real(op.get<std::string>("epochTime"));
   member.phase = Real(op.get<std::string>("phaseAtEpoch"));
   member.omega = Real(op.get<std::string>("angularVelocity"));
   result.push_back(std::move(member));
 }
 return result;
}
struct State { Vector position, velocity; };
State analytic_state(const Member& member, const Real& time) {
 const Real theta = member.phase + member.omega * (time - member.epoch);
 const Real c = cos(theta), s = sin(theta);
 State state{};
 for (std::size_t axis = 0; axis < 3; ++axis) {
   state.position[axis] = member.center[axis] + member.u[axis]*c + member.v[axis]*s;
   state.velocity[axis] = member.omega*(-member.u[axis]*s + member.v[axis]*c);
 }
 return state;
}
void build_histories(std::vector<Member>& members, std::int64_t lower_ticks, Progress& progress) {
 for (auto& member : members) {
   std::vector<eom::CubicHistorySegment> segments;
   segments.reserve(kSegments);
   State left = analytic_state(member, Real(time_token(lower_ticks)));
   for (std::size_t i = 0; i < kSegments; ++i) {
     progress.require_live();
     const auto start = time_token(lower_ticks + 200*static_cast<std::int64_t>(i));
     const auto end = time_token(lower_ticks + 200*static_cast<std::int64_t>(i+1));
     const Real h("0.002");
     const State right = analytic_state(member, Real(end));
     eom::CubicCoefficientTokens coefficients;
     for (std::size_t axis = 0; axis < 3; ++axis) {
       const Real slope = (right.position[axis]-left.position[axis])/h;
       coefficients[axis] = {real_token(left.position[axis]), real_token(left.velocity[axis]),
         real_token(Real((3*slope-2*left.velocity[axis]-right.velocity[axis])/h)),
         real_token(Real((left.velocity[axis]+right.velocity[axis]-2*slope)/(h*h)))};
     }
     segments.emplace_back(start, end, std::move(coefficients),
       std::string(kPositionError), std::string(kVelocityError));
     // This is an actual EOM interval diagnostic, not an analytic proof.
     // The self route checks the same inflated velocity on nominal cell spans.
     const auto& segment = segments.back();
     const double speed = eom::norm(segment.velocity_interval(
       eom::Interval(segment.t_start(), segment.t_end()))).upper();
     if (!std::isfinite(speed)) throw std::runtime_error("nonfinite inflated speed bound");
     member.inflated_speed_upper = std::max(member.inflated_speed_upper, speed);
     left = right; ++progress.constructed;
   }
   member.history = std::make_unique<eom::RetainedHistory>(member.history_id, std::move(segments));
   Object detail; detail.number("memberIndex", member.index);
   detail.string("historyFingerprint", member.history->provenance_fingerprint());
   detail.number("actualInflatedSpeedUpper", member.inflated_speed_upper);
   detail.boolean("strictlySubField", member.inflated_speed_upper < 1);
   progress.event("member-constructed", detail.finish());
 }
}
std::string segment_json(const eom::CubicHistorySegment& segment, std::size_t index) {
 Object out; out.number("index", index);
 out.string("tStart", segment.t_start_token()); out.string("tEnd", segment.t_end_token());
 out.raw("coefficients", array_json(segment.coefficient_tokens(), [](const auto& axis) {
   return array_json(axis, [](const auto& token) { return quote(token); });
 }));
 out.raw("positionErrors", array_json(segment.position_error_tokens(), [](const auto& token) { return quote(token); }));
 out.raw("velocityErrors", array_json(segment.velocity_error_tokens(), [](const auto& token) { return quote(token); }));
 out.raw("parsedEndpointBits", "[" + quote(bits(segment.t_start())) + "," + quote(bits(segment.t_end())) + "]");
 return out.finish();
}
std::string manifest_json(const std::vector<Member>& members, const FrozenInputs& inputs,
 const std::string& candidate, const std::string& id, const std::string& reception, const std::string& lower) {
 Object out;
 out.string("schema", kManifestSchema); out.string("manifestId", id); out.string("candidateId", candidate);
 out.raw("sourceBinding", inputs.binding_json()); out.string("normalizedFieldSpeed", "1");
 out.string("receptionTime", reception); out.raw("retainedInterval", "["+quote(lower)+","+quote(reception)+"]");
 out.raw("members", array_json(members, [](const auto& member) {
   Object item; item.number("index", member.index); item.string("constituentId", member.constituent);
   item.string("worldlineId", member.worldline); item.number("polarity", member.polarity);
   item.string("historyId", member.history_id); item.string("historyFingerprint", member.history->provenance_fingerprint());
   std::string segments = "["; std::size_t i = 0;
   for (const auto& segment : member.history->segments()) {
     if (i) segments += ',';
     segments += segment_json(segment, i++);
   }
   item.raw("segments", segments+']'); return item.finish();
 }));
 return out.finish()+'\n';
}
std::string certificate_json(const eom::ExactPairCertificate& certificate) {
  Object out;
#define STRING_FIELD(name) out.string(#name, certificate.name)
#define NUMBER_FIELD(name) out.number(#name, certificate.name)
#define BOOL_FIELD(name) out.boolean(#name, certificate.name)
  STRING_FIELD(schema); STRING_FIELD(row_id); STRING_FIELD(receiver_history_id);
  STRING_FIELD(transmitter_history_id); STRING_FIELD(receiver_history_fingerprint);
  STRING_FIELD(transmitter_history_fingerprint); STRING_FIELD(reception_time);
  STRING_FIELD(searched_lower); STRING_FIELD(searched_upper); STRING_FIELD(field_speed);
  STRING_FIELD(root_tolerance); STRING_FIELD(status); STRING_FIELD(failure_code);
  BOOL_FIELD(root_free_complement); BOOL_FIELD(memory_boundary_contact);
  BOOL_FIELD(coincident_endpoint_excluded); BOOL_FIELD(precision_escalated);
  NUMBER_FIELD(achieved_precision_bits); NUMBER_FIELD(visited_cells);
  NUMBER_FIELD(excluded_cells); NUMBER_FIELD(difficult_cells); STRING_FIELD(diagnostic_detail);
  NUMBER_FIELD(binary64_worker_wall_seconds); NUMBER_FIELD(binary64_setup_wall_seconds);
  NUMBER_FIELD(binary64_warm_start_wall_seconds); NUMBER_FIELD(binary64_cell_setup_wall_seconds);
  NUMBER_FIELD(binary64_cell_classification_wall_seconds); NUMBER_FIELD(binary64_finalization_wall_seconds);
  NUMBER_FIELD(mpfr_worker_wall_seconds); NUMBER_FIELD(mpfr_attempt_count);
  NUMBER_FIELD(mpfr_escalation_worker_wall_seconds); NUMBER_FIELD(mpfr_escalation_attempt_count);
  NUMBER_FIELD(warm_excluded_cells); NUMBER_FIELD(reevaluated_cells); NUMBER_FIELD(warm_residual_drift_upper);
  BOOL_FIELD(stable_negative_prefix_certified); STRING_FIELD(stable_negative_prefix_upper);
  NUMBER_FIELD(incremental_prefix_reuse_count); BOOL_FIELD(has_difficult_cell);
  NUMBER_FIELD(difficult_source_segment_index); STRING_FIELD(difficult_cell_lower);
  STRING_FIELD(difficult_cell_upper); STRING_FIELD(difficult_point);
  STRING_FIELD(difficult_point_residual_lower); STRING_FIELD(difficult_point_residual_upper);
  STRING_FIELD(difficult_transmitter_factor_lower); STRING_FIELD(difficult_transmitter_factor_upper);
  STRING_FIELD(difficult_receiver_factor_lower); STRING_FIELD(difficult_receiver_factor_upper);
  NUMBER_FIELD(difficult_lower_sign); NUMBER_FIELD(difficult_upper_sign);
#undef STRING_FIELD
#undef NUMBER_FIELD
#undef BOOL_FIELD
  out.raw("roots", array_json(certificate.roots, [](const auto& root) {
    Object item;
    item.string("lower", root.lower); item.string("upper", root.upper);
    item.string("transmitter_factor_lower", root.transmitter_factor_lower);
    item.string("transmitter_factor_upper", root.transmitter_factor_upper);
    item.string("receiver_factor_lower", root.receiver_factor_lower);
    item.string("receiver_factor_upper", root.receiver_factor_upper);
    item.number("transmitter_factor_sign", root.transmitter_factor_sign);
    item.raw("transmitter_segment_indices", array_json(root.transmitter_segment_indices,
        [](auto index) { return std::to_string(index); }));
    item.string("precision_route", root.precision_route); item.number("precision_bits", root.precision_bits);
    return item.finish();
  }));
  out.raw("root_free_cells", array_json(certificate.root_free_cells, [](const auto& cell) {
    Object item;
    item.number("transmitter_segment_index", cell.transmitter_segment_index);
    item.string("lower", cell.lower); item.string("upper", cell.upper);
    item.string("residual_lower", cell.residual_lower); item.string("residual_upper", cell.residual_upper);
    item.string("receiver_factor_lower", cell.receiver_factor_lower);
    item.string("receiver_factor_upper", cell.receiver_factor_upper);
    item.number("lower_value", cell.lower_value); item.number("upper_value", cell.upper_value);
    item.number("residual_lower_value", cell.residual_lower_value);
    item.number("residual_upper_value", cell.residual_upper_value);
    item.boolean("numeric_values_valid", cell.numeric_values_valid);
    return item.finish();
  }));
  return out.finish();
}


struct Options {
 std::string mode, candidate;
 fs::path root, output, manifest, conformance;
 unsigned rung = 0, phase = 0;
 std::size_t receiver = 0, transmitter = 0;
};
unsigned natural(const std::string& token) {
 if (token.empty() || token.size() > 8 || (token.size() > 1 && token.front() == '0') ||
     std::any_of(token.begin(), token.end(), [](char c) { return c < '0' || c > '9'; }))
   throw std::runtime_error("nonnegative canonical integer required");
 return static_cast<unsigned>(std::stoul(token));
}
void usage() {
 std::cout << "Prescribed ABC carrier; no evolution or H3 acceptance.\n"
   "manifest --repo-root ROOT --candidate ID --rung 2|8|32|128 --phase K --out NEW.json\n"
   "serve    [same options] --history-manifest FILE --conformance FILE --out NEW.ndjson\n"
   "row      [same as serve] --receiver-index I --transmitter-index J\n"
   "serve stdin: I J followed by newline; one sequential pair call, then flushed row.\n"
   "EOF stops; first failure stops. External group watchdog required.\n";
}
Options options(int argc, char** argv) {
 if (argc < 2) throw std::runtime_error("mode required; use --help");
 Options o; o.mode = argv[1];
 if (o.mode != "manifest" && o.mode != "serve" && o.mode != "row") throw std::runtime_error("unknown mode");
 std::map<std::string, std::string> flags;
 for (int at = 2; at < argc; at += 2) {
   if (at+1 >= argc || !flags.emplace(argv[at], argv[at+1]).second)
     throw std::runtime_error("missing or duplicate option");
 }
 std::set<std::string> expected{"--repo-root","--candidate","--rung","--phase","--out"};
 if (o.mode != "manifest") { expected.insert("--history-manifest"); expected.insert("--conformance"); }
 if (o.mode == "row") { expected.insert("--receiver-index"); expected.insert("--transmitter-index"); }
 if (flags.size() != expected.size()) throw std::runtime_error("wrong options; use --help");
 for (const auto& [key, value] : flags)
   if (!expected.contains(key) || value.empty()) throw std::runtime_error("unknown or empty option: " + key);
 o.root = flags.at("--repo-root"); o.output = flags.at("--out"); o.candidate = flags.at("--candidate");
 o.rung = natural(flags.at("--rung")); o.phase = natural(flags.at("--phase"));
 if ((o.rung != 2 && o.rung != 8 && o.rung != 32 && o.rung != 128) || o.phase >= o.rung)
   throw std::runtime_error("rung must be 2/8/32/128 and phase in range");
 if (o.mode != "manifest") { o.manifest = flags.at("--history-manifest"); o.conformance = flags.at("--conformance"); }
 if (o.mode == "row") { o.receiver = natural(flags.at("--receiver-index")); o.transmitter = natural(flags.at("--transmitter-index")); }
 return o;
}
void check_conformance(const std::string& bytes, const Options& o, const std::string& manifest_hash,
 const std::string& manifest_id, const std::string& reception, const std::vector<Member>& members,
 const FrozenInputs& inputs) {
 const auto proof = read_json(bytes);
 if (proof.get<std::string>("schema") != "braid-program/abc-circular-history-conformance.v1" ||
     !proof.get<bool>("accepted") || !proof.get<bool>("actualCarrierValidated") || proof.get<bool>("h3EvidenceEligible") ||
     proof.get<std::string>("authority") != "source-bound-whole-manifest-analytic-conformance-only" ||
     proof.get<std::string>("manifestSha256") != manifest_hash || proof.get<std::string>("manifestId") != manifest_id ||
     proof.get<std::string>("candidateId") != o.candidate || proof.get<std::string>("receptionTime") != reception ||
     proof.get<unsigned>("rung") != o.rung || proof.get<unsigned>("phase") != o.phase ||
     proof.get<std::string>("normalizedFieldSpeed") != "1" ||
     proof.get<std::size_t>("memberCount") != members.size() ||
     proof.get<std::size_t>("segmentCount") != members.size()*kSegments)
   throw std::runtime_error("conformance receipt does not accept this exact complete manifest");
 const auto& census = proof.get_child("members");
 if (census.size() != members.size()) throw std::runtime_error("conformance member census differs");
 std::size_t i = 0;
 for (const auto& entry : census) {
   const auto& row = entry.second; const auto& member = members[i++];
   if (row.get<std::size_t>("index") != member.index || row.get<std::string>("constituentId") != member.constituent ||
       row.get<std::string>("worldlineId") != member.worldline || row.get<int>("polarity") != member.polarity ||
       row.get<std::string>("historyId") != member.history_id ||
       row.get<std::string>("historyFingerprint") != member.history->provenance_fingerprint() ||
       row.get<std::size_t>("segmentCount") != kSegments) throw std::runtime_error("conformance history identity differs");
 }
 std::map<std::string, std::pair<std::string, std::string>> bindings;
 for (const auto& entry : proof.get_child("bindings")) {
   const auto& row = entry.second;
   if (!bindings.emplace(row.get<std::string>("id"), std::make_pair(
       row.get<std::string>("path"), row.get<std::string>("sha256"))).second)
     throw std::runtime_error("duplicate conformance binding");
 }
 if (bindings.size() != kSources.size()+1) throw std::runtime_error("conformance binding census differs");
 for (const auto& binding : kSources)
   if (bindings.at(binding.id) != std::make_pair(std::string(binding.path), std::string(binding.hash)))
     throw std::runtime_error("conformance frozen binding differs");
 if (bindings.at("candidate-source") != std::make_pair(inputs.source_path, inputs.source_hash))
   throw std::runtime_error("conformance candidate binding differs");
 // The coordinator authenticates the actual verifier process/build and receipt
 // bytes. This mechanical receipt check deliberately makes no signature claim.
}
std::string request_json(const eom::ExactPairRequest& r) {
 Object out;
 out.string("rowId", r.row_id); out.string("receiverHistoryId", r.receiver->history_id());
 out.string("transmitterHistoryId", r.source->history_id());
 out.string("receiverHistoryFingerprint", r.receiver->provenance_fingerprint());
 out.string("transmitterHistoryFingerprint", r.source->provenance_fingerprint());
 out.string("receiverPathId", r.receiver_path_id); out.string("sourcePathId", r.source_path_id);
 out.string("receptionTime", r.reception_time); out.string("searchLower", r.search_lower);
 out.string("searchUpper", r.search_upper); out.string("fieldSpeed", r.field_speed);
 out.string("rootTolerance", r.root_tolerance); out.number("maxDepth", r.max_depth); out.number("maxCells", r.max_cells);
 out.number("initialMpfrBits", r.initial_mpfr_bits); out.number("maximumMpfrBits", r.maximum_mpfr_bits);
 out.boolean("forcePrecisionEscalation", r.force_precision_escalation);
 out.boolean("deferPrecisionEscalation", r.defer_precision_escalation);
 out.boolean("warmStart", r.warm_start != nullptr); out.boolean("jointHistory",
   r.joint_root_point_state != nullptr || r.joint_receiver_history != nullptr || r.joint_transmitter_history != nullptr);
 out.number("workerCount", 1);
 return out.finish();
}
std::string row_failure(const eom::ExactPairRequest& r, const eom::ExactPairCertificate& c,
 bool self, const std::string& v_upper) {
 if (c.row_id != r.row_id || c.receiver_history_id != r.receiver->history_id() ||
     c.transmitter_history_id != r.source->history_id() ||
     c.receiver_history_fingerprint != r.receiver->provenance_fingerprint() ||
     c.transmitter_history_fingerprint != r.source->provenance_fingerprint() ||
     exact_decimal(c.reception_time) != exact_decimal(r.reception_time) ||
     exact_decimal(c.searched_lower) != exact_decimal(r.search_lower) ||
     exact_decimal(c.searched_upper) != exact_decimal(r.search_upper) ||
     exact_decimal(c.field_speed) != 1 || exact_decimal(c.root_tolerance) != exact_decimal("1e-8"))
   return "certificate_identity_or_controls_mismatch";
 if (c.status != "certified_complete" || !c.failure_code.empty() ||
     !c.root_free_complement || c.memory_boundary_contact || c.visited_cells > kMaxCells)
   return "incomplete_or_resource_contact_certificate";
 if (self) {
   if (!c.roots.empty() || !c.coincident_endpoint_excluded ||
       r.receiver->history_id() != r.source->history_id() ||
       r.receiver->provenance_fingerprint() != r.source->provenance_fingerprint())
     return "invalid_self_exclusion";
   return "";
 }
 if (c.roots.size() != 1 || c.coincident_endpoint_excluded) return "wrong_nonself_root_inventory";
 const auto& root = c.roots.front();
 const Rational lo = exact_decimal(root.lower), hi = exact_decimal(root.upper);
 if (hi < lo || hi-lo > exact_decimal("1e-8") || lo <= exact_decimal(r.search_lower) ||
     hi >= exact_decimal(r.reception_time)) return "invalid_positive_delay_root_bracket";
 const Rational analytic_lo = 1-exact_decimal(v_upper), analytic_hi = 1+exact_decimal(v_upper);
 for (const auto& factor : std::array<std::pair<std::string, std::string>, 2>{{
     {root.transmitter_factor_lower, root.transmitter_factor_upper},
     {root.receiver_factor_lower, root.receiver_factor_upper}}}) {
   const Rational lower = exact_decimal(factor.first), upper = exact_decimal(factor.second);
   if (lower <= 0 || upper < lower || upper < analytic_lo || lower > analytic_hi)
     return "invalid_or_analytically_disjoint_factor";
 }
 if (root.transmitter_factor_sign != 1) return "invalid_transmitter_factor_sign";
 return "";
}
bool next_pair(std::size_t& receiver, std::size_t& transmitter) {
 std::string line;
 for (;;) {
   const auto ch = std::cin.get();
   if (ch == std::char_traits<char>::eof()) {
     if (std::cin.bad()) throw std::runtime_error("stdin read failed");
     if (line.empty()) return false;
     throw std::runtime_error("pair command missing final newline");
   }
   if (ch == '\n') break;
   line += static_cast<char>(ch);
   if (line.size() > 64) throw std::runtime_error("pair command exceeds 64 bytes");
 }
 std::istringstream input(line); std::string a, b, extra;
 if (!(input >> a >> b) || (input >> extra)) throw std::runtime_error("pair command requires exactly I J");
 receiver = natural(a); transmitter = natural(b); return true;
}
int run(const Options& o) {
 Progress progress;
 try {
   check_environment(); progress.event("environment-controls-passed");
   FrozenInputs inputs(o.root, o.candidate);
   ExclusiveOutput output(o.output, inputs.root);
   const std::int64_t ticks = 400000 + 400000*static_cast<std::int64_t>(o.phase)/o.rung;
   const auto reception = time_token(ticks), lower = time_token(ticks-200000);
   const auto id = "abc-circular-history/v1:" + o.candidate + ":T=" + reception;
   auto members = source_members(inputs, id);
   build_histories(members, ticks-200000, progress);
   const auto manifest = manifest_json(members, inputs, o.candidate, id, reception, lower);
   const auto manifest_hash = sha256(manifest); progress.identity(manifest_hash);
   inputs.recheck(); progress.require_live();
   if (o.mode == "manifest") {
     output.write(manifest); output.sync(); inputs.recheck(); progress.require_live();
     Object detail; detail.number("outputBytes", manifest.size()); detail.string("manifestId", id);
     progress.event("manifest-complete", detail.finish()); return 0;
   }
   if (read_bytes(o.manifest) != manifest) throw std::runtime_error("supplied manifest is not byte-identical to actual histories");
   const auto proof_bytes = read_bytes(o.conformance), proof_hash = sha256(proof_bytes);
   check_conformance(proof_bytes, o, manifest_hash, id, reception, members, inputs);
   for (const auto& member : members)
     if (!(member.inflated_speed_upper < 1)) throw std::runtime_error("actual inflated velocity is not strictly sub-field");
   Object prepared; prepared.string("manifestId", id); prepared.string("conformanceSha256", proof_hash);
   prepared.number("memberCount", members.size());
   progress.event("prepared", prepared.finish());
   std::set<std::pair<std::size_t, std::size_t>> visited;
   bool first = true;
   for (;;) {
     std::size_t receiver = o.receiver, transmitter = o.transmitter;
     if (o.mode == "row") { if (!first) break; }
     else if (!next_pair(receiver, transmitter)) break;
     first = false; progress.require_live(); check_environment();
     if (receiver >= members.size() || transmitter >= members.size() ||
         !visited.emplace(receiver, transmitter).second) throw std::runtime_error("invalid or duplicate ordered pair");
     inputs.recheck();
     if (read_bytes(o.manifest) != manifest || read_bytes(o.conformance) != proof_bytes)
       throw std::runtime_error("prepared manifest or receipt changed");
     eom::ExactPairRequest request{};
     request.row_id = id + "/" + std::to_string(receiver) + "/" + std::to_string(transmitter);
     request.receiver = members[receiver].history.get(); request.source = members[transmitter].history.get();
     request.reception_time = reception; request.search_lower = lower; request.search_upper = reception;
     request.field_speed = "1"; request.root_tolerance = "1e-8";
     request.max_depth = 192; request.max_cells = kMaxCells;
     request.initial_mpfr_bits = 128; request.maximum_mpfr_bits = 512;
     Object row; row.string("schema", "braid-program/abc-enclosed-root-row.v1");
     row.string("candidateId", o.candidate); row.number("rung", o.rung); row.number("phase", o.phase);
     row.string("manifestId", id); row.string("historyManifestSha256", manifest_hash);
     row.string("conformanceSha256", proof_hash); row.raw("sourceBinding", inputs.binding_json());
     row.number("receiverIndex", receiver); row.number("transmitterIndex", transmitter);
     row.string("receiverConstituentId", members[receiver].constituent);
     row.string("transmitterConstituentId", members[transmitter].constituent);
     row.string("receiverWorldlineId", members[receiver].worldline);
     row.string("transmitterWorldlineId", members[transmitter].worldline);
     row.number("receiverPolarity", members[receiver].polarity); row.number("transmitterPolarity", members[transmitter].polarity);
     row.number("receiverInflatedSpeedUpper", members[receiver].inflated_speed_upper);
     row.number("transmitterInflatedSpeedUpper", members[transmitter].inflated_speed_upper);
     row.raw("request", request_json(request)); row.boolean("h3EvidenceEligible", false);
     progress.event("row-started", request_json(request));
     const auto began = Clock::now();
     std::string failure;
     try {
       const auto certificate = eom::certify_exact_pair(request);
       row.raw("certificate", certificate_json(certificate));
       ++progress.completed;
       try {
         failure = row_failure(request, certificate, receiver == transmitter, inputs.speed_upper);
         inputs.recheck();
         if (read_bytes(o.manifest) != manifest || read_bytes(o.conformance) != proof_bytes)
           throw std::runtime_error("prepared input changed during call");
         progress.require_live();
       } catch (const std::exception& error) { failure = error.what(); }
     } catch (const std::exception& error) {
       row.raw("certificate", "null"); failure = std::string("pair_exception: ") + error.what();
     }
     row.number("pairWallSeconds", std::chrono::duration<double>(Clock::now()-began).count());
     row.string("adapterFailureCode", failure); row.boolean("rowPassed", failure.empty());
     output.write(row.finish()+'\n'); output.sync();
     if (failure.empty()) ++progress.passing;
     else { ++progress.failures; progress.fail(failure); progress.event("failed"); return 1; }
     progress.event("row-complete");
   }
   inputs.recheck();
   if (read_bytes(o.manifest) != manifest || read_bytes(o.conformance) != proof_bytes)
     throw std::runtime_error("prepared input changed before finalization");
   output.sync(); progress.require_live(); progress.event("stopped"); return 0;
 } catch (const std::exception& error) {
   ++progress.failures; progress.fail(error.what()); progress.event("failed"); return 1;
 }
}
} // namespace
int main(int argc, char** argv) {
 try {
   if (argc == 2 && std::string_view(argv[1]) == "--help") { usage(); return 0; }
   return run(options(argc, argv));
 } catch (const std::exception& error) { std::cerr << error.what() << '\n'; return 2; }
}
