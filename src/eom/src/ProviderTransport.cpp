#include "architrino/eom/ProviderTransport.hpp"
#include "architrino/eom/Checkpoint.hpp"
#include "architrino/eom/EquationRegistry.hpp"
#include "architrino/eom/ValidatedOrdinaryBridge.hpp"
#include "architrino/eom/ValidatedRunRecord.hpp"
#include "architrino/eom/MatchedPairEnclosure.hpp"
#include "architrino/eom/Decimal.hpp"
#include "architrino/eom/DisplayEvolution.hpp"
#include "SurfaceArithmetic.hpp"
#include <boost/json.hpp>
#include <boost/property_tree/json_parser.hpp>
#include <algorithm>
#include <csignal>
#include <fstream>
#include <iostream>
#include <set>
#include <sstream>
#include <filesystem>
#include <cmath>
#include <limits>

namespace architrino::eom {
namespace {
namespace j = boost::json;
using Object = j::object;
using Array = j::array;
void fail(const std::string& code, const std::string& message) { throw EquationAdmissionError(code,message); }
void duplicate_check(const boost::property_tree::ptree& tree, const j::value& value) {
  if (value.is_object()) {
    std::set<std::string> keys;
    for (const auto& child : tree) if (!keys.insert(child.first).second) fail("duplicate_json_key", "duplicate decoded object key: " + child.first);
    for (const auto& child : tree) duplicate_check(child.second,value.as_object().at(child.first));
  } else if (value.is_array()) {
    std::size_t i=0; for (const auto& child : tree) duplicate_check(child.second,value.as_array().at(i++));
  }
}
j::value parse(const std::string& text) {
  if (text.size()>32U*1024U*1024U) fail("request_size_exhausted","JSON payload exceeds 32 MiB");
  j::parse_options options; options.max_depth=64;
  auto value=j::parse(text,{},options);
  boost::property_tree::ptree tree; std::istringstream stream(text);
  boost::property_tree::read_json(stream,tree); duplicate_check(tree,value); return value;
}
void keys(const Object& object, std::initializer_list<const char*> allowed) {
  for (const auto& entry : object) {
    const std::string key(entry.key());
    if (std::none_of(allowed.begin(),allowed.end(),[&](const char* a){return key==a;})) fail("unknown_request_field","unknown field: "+key);
  }
}
const Object& object(const j::value& v) { if(!v.is_object()) fail("invalid_request_type","expected object"); return v.as_object(); }
const Array& array(const j::value& v) { if(!v.is_array()) fail("invalid_request_type","expected array"); return v.as_array(); }
std::string string(const j::value& v) { if(!v.is_string()) fail("invalid_request_type","expected string token"); return std::string(v.as_string()); }
std::string token(const j::value& v) { auto s=string(v); if(s.size()>4096) fail("invalid_decimal_identity","decimal token too long"); (void)equation_decimal_identity(s); return s; }
std::uint64_t count(const j::value& v) {
  if(v.is_uint64() && v.as_uint64()<=9007199254740991ULL) return v.as_uint64();
  if(v.is_int64() && v.as_int64()>=0 && v.as_int64()<=9007199254740991LL) return static_cast<std::uint64_t>(v.as_int64());
  fail("invalid_request_type","expected nonnegative integer"); return 0;
}
bool boolean(const j::value& v) { if(!v.is_bool()) fail("invalid_request_type","expected boolean"); return v.as_bool(); }
j::value sorted(const j::value& v) {
  if(v.is_object()) { std::vector<std::string> names; for(auto& e:v.as_object()) names.emplace_back(e.key()); std::sort(names.begin(),names.end()); Object o; for(auto& name:names)o[name]=sorted(v.as_object().at(name)); return o; }
  if(v.is_array()) { Array a; for(auto& e:v.as_array())a.push_back(sorted(e)); return a; } return v;
}
std::string canonical(const j::value& v) { return j::serialize(sorted(v)); }
Array vector(const IntervalVector& v) { Array out; for(const auto& x:v)out.push_back(Array{finite_double_token(x.lower()),finite_double_token(x.upper())}); return out; }
Array segments(const RetainedHistory& history, const std::optional<double>& after={}) {
  Array out;
  for(const auto& s:history.segments()) {
    if(after && s.t_end()<=*after)continue;
    Array coefficients, pe, ve;
    for(std::size_t axis=0;axis<3;++axis) {
      Array row; for(const auto& c:s.coefficient_tokens()[axis])row.emplace_back(c);
      coefficients.push_back(row); pe.emplace_back(s.position_error_tokens()[axis]); ve.emplace_back(s.velocity_error_tokens()[axis]);
    }
    out.push_back(Object{{"start",s.t_start_token()},{"end",s.t_end_token()},{"coefficients",coefficients},{"positionErrors",pe},{"velocityErrors",ve}});
  } return out;
}
struct HistoryBudget {
  std::size_t remaining = 100000;
  void consume(std::size_t size) {
    if (size > remaining) fail("history_budget_exhausted", "combined history segment budget exhausted before allocation");
    remaining -= size;
  }
};
std::vector<CubicHistorySegment> decode_segments(const j::value& value, HistoryBudget& budget) {
  std::vector<CubicHistorySegment> out; const auto& input=array(value);
  if(input.empty())fail("invalid_history","empty history");
  budget.consume(input.size());
  for(const auto& row:input) {
    const auto& o=object(row); keys(o,{"start","end","coefficients","positionErrors","velocityErrors"});
    CubicCoefficientTokens coeff; HistoryErrorTokens pe,ve;
    const auto& c=array(o.at("coefficients")); const auto& p=array(o.at("positionErrors")); const auto& v=array(o.at("velocityErrors"));
    if(c.size()!=3 || p.size()!=3 || v.size()!=3)fail("invalid_history","three Cartesian axes required");
    for(std::size_t axis=0;axis<3;++axis) { const auto& r=array(c[axis]); if(r.size()!=4)fail("invalid_history","four cubic coefficients required"); for(std::size_t k=0;k<4;++k)coeff[axis][k]=token(r[k]); pe[axis]=token(p[axis]); ve[axis]=token(v[axis]); }
    out.emplace_back(token(o.at("start")),token(o.at("end")),coeff,pe,ve);
  } return out;
}
Object circle(const UniformCircularEndpointCertificate& c) {
  return {{"kind","uniform-circular"},{"start",c.valid_start_time},{"end",c.valid_reception_time},{"maximumSegmentStep",c.maximum_segment_step},{"radius",c.cylindrical_radius},{"height",c.height},{"angularSpeed",c.angular_speed},{"speed",c.tangential_speed},{"phase",c.phase},{"tiltX",c.tilt_x},{"tiltY",c.tilt_y}};
}
RetainedHistory decode_history(const std::string& id,const j::value& value, HistoryBudget& budget) {
  const auto& h=object(value); const auto kind=string(h.at("kind"));
  if(kind=="cubic") { keys(h,{"kind","segments"}); return RetainedHistory(id,decode_segments(h.at("segments"),budget)); }
  if(kind!="uniform-circular")fail("invalid_history","unknown history kind");
  keys(h,{"kind","start","end","maximumSegmentStep","radius","height","angularSpeed","speed","phase","tiltX","tiltY"});
  UniformCircularHistoryRequest c{token(h.at("start")),token(h.at("end")),token(h.at("maximumSegmentStep")),token(h.at("radius")),token(h.at("height")),token(h.at("angularSpeed")),token(h.at("speed")),token(h.at("phase"))};
  if(h.contains("tiltX"))c.tilt_x=token(h.at("tiltX")); if(h.contains("tiltY"))c.tilt_y=token(h.at("tiltY"));
  const detail::SurfaceRational duration = detail::SurfaceRational(c.t_end) - detail::SurfaceRational(c.t_start);
  const detail::SurfaceRational step(c.maximum_segment_step), zero("0");
  if (!(zero < duration) || !(zero < step)) fail("invalid_history", "positive duration and segment step required");
  if (step * detail::SurfaceRational(std::to_string(budget.remaining)) < duration)
    fail("history_budget_exhausted", "circular factory would exceed combined segment budget");
  const double size = std::ceil((parse_finite_double(c.t_end,"history end") - parse_finite_double(c.t_start,"history start")) / parse_finite_double(c.maximum_segment_step,"segment step"));
  if (!std::isfinite(size) || size < 1 || size > budget.remaining) fail("history_budget_exhausted", "circular factory binary evaluation exceeds segment budget");
  budget.consume(static_cast<std::size_t>(size));
  return RetainedHistory::uniform_circular(id,c);
}
struct DecimalField { const char* name; std::string NativeCoupledEvolutionRequest::*member; };
const DecimalField decimals[]={
  {"initialStep",&NativeCoupledEvolutionRequest::initial_step},{"minimumStep",&NativeCoupledEvolutionRequest::minimum_step},{"maximumStep",&NativeCoupledEvolutionRequest::maximum_step},
  {"rootTolerance",&NativeCoupledEvolutionRequest::root_tolerance},{"transmitterFactorFloor",&NativeCoupledEvolutionRequest::transmitter_factor_floor},
  {"accelerationTolerance",&NativeCoupledEvolutionRequest::acceleration_tolerance},{"positionTolerance",&NativeCoupledEvolutionRequest::position_tolerance},
  {"velocityTolerance",&NativeCoupledEvolutionRequest::velocity_tolerance},{"correctionTolerance",&NativeCoupledEvolutionRequest::correction_tolerance},
  {"adaptiveSafety",&NativeCoupledEvolutionRequest::adaptive_step_safety_factor},{"adaptiveMinimumScale",&NativeCoupledEvolutionRequest::adaptive_step_minimum_scale},{"adaptiveMaximumScale",&NativeCoupledEvolutionRequest::adaptive_step_maximum_scale}};
struct CountField { const char* name; std::size_t NativeCoupledEvolutionRequest::*member; };
const CountField counts[]={ {"rootMaxDepth",&NativeCoupledEvolutionRequest::root_max_depth},{"rootMaxCells",&NativeCoupledEvolutionRequest::root_max_cells},
  {"maxCorrectionIterations",&NativeCoupledEvolutionRequest::max_correction_iterations},{"maxStepAttempts",&NativeCoupledEvolutionRequest::max_step_attempts},
  {"maxRejectedSteps",&NativeCoupledEvolutionRequest::max_rejected_steps},{"threadCount",&NativeCoupledEvolutionRequest::thread_count}};
NativeCoupledEvolutionRequest decode_request(const j::value& value) {
  const auto& o=object(value); keys(o,{"schema","runId","model","interval","paths","numerics","resources"});
  if(string(o.at("schema"))!="eom_evolution_request/v2")fail("unsupported_request_schema","v2 schema required");
  NativeCoupledEvolutionRequest r; r.run_id=o.contains("runId")?string(o.at("runId")):"inspection";
  if(r.run_id.empty() || r.run_id.size()>1024)fail("invalid_request","runId must contain 1 to 1024 bytes");
  r.field_speed="1";r.coupling="1";r.start_time="0";r.end_time="0.02";r.initial_step="0.02";r.minimum_step="0.00125";r.maximum_step="0.02";
  r.memory_budget_bytes=1024ULL*1024ULL*1024ULL;r.max_step_attempts=1000;r.max_rejected_steps=100;
  r.equation_selection.emplace();
  if(o.contains("model")) {
    const auto& m=object(o.at("model")); keys(m,{"compositionId","speedDomain","boundaryPolicy","constraint","method","fieldSpeed","coupling","geometry"}); auto& s=*r.equation_selection;
    if(m.contains("compositionId"))s.composition_id=string(m.at("compositionId"));
    if(m.contains("speedDomain"))s.speed_domain=string(m.at("speedDomain"));
    if(m.contains("boundaryPolicy"))s.boundary_policy=string(m.at("boundaryPolicy"));
    if(m.contains("constraint"))s.constraint=string(m.at("constraint")); if(m.contains("method"))s.method=string(m.at("method"));
    if(m.contains("fieldSpeed"))r.field_speed=token(m.at("fieldSpeed")); if(m.contains("coupling"))r.coupling=token(m.at("coupling"));
    if(m.contains("geometry")) {
      r.surface_geometry.emplace();auto& g=*r.surface_geometry;const auto& h=object(m.at("geometry"));keys(h,{"kind","radius","flattening","majorRadius","center","orientation"});
      if(h.contains("kind"))g.kind=string(h.at("kind")); if(h.contains("radius"))g.radius=token(h.at("radius")); if(h.contains("flattening"))g.flattening=token(h.at("flattening")); if(h.contains("majorRadius"))g.major_radius=token(h.at("majorRadius"));
      if(h.contains("center")){const auto& a=array(h.at("center"));if(a.size()!=3)fail("invalid_geometry","three center coordinates required");for(std::size_t i=0;i<3;++i)g.center[i]=token(a[i]);}
      if(h.contains("orientation")){const auto& a=array(h.at("orientation"));if(a.size()!=3)fail("invalid_geometry","3x3 frame required");for(std::size_t i=0;i<3;++i){const auto& row=array(a[i]);if(row.size()!=3)fail("invalid_geometry","3x3 frame required");for(std::size_t k=0;k<3;++k)g.orientation[i][k]=token(row[k]);}}
    }
  }
  if(o.contains("interval")){const auto& t=object(o.at("interval"));keys(t,{"start","end"});r.start_time=token(t.at("start"));r.end_time=token(t.at("end"));}
  if(o.contains("numerics")) {
    const auto& n=object(o.at("numerics"));
    for(const auto& entry:n) {
      const std::string name(entry.key()); bool found=false;
      for(auto& f:decimals)if(name==f.name){r.*f.member=token(entry.value());found=true;}
      for(auto& f:counts)if(name==f.name){r.*f.member=count(entry.value());found=true;}
      if(name=="errorBoundChecking"){r.error_bound_checking=string(entry.value());if(r.error_bound_checking!="none" && r.error_bound_checking!="strict")fail("invalid_error_bound_checking","errorBoundChecking must be none or strict");found=true;}
      if(name=="adaptiveGrowth"){r.use_adaptive_step_growth=boolean(entry.value());found=true;}
      if(name=="continuousAdaptive"){r.use_continuous_adaptive_step=boolean(entry.value());found=true;}
      if(name=="surfacePositionTolerance"){r.surface_numerics.position_tolerance=token(entry.value());found=true;}
      if(name=="surfaceTangentVelocityTolerance"){r.surface_numerics.tangent_velocity_tolerance=token(entry.value());found=true;}
      if(name=="surfaceMaxDepth"){r.surface_numerics.maximum_depth=count(entry.value());found=true;}
      if(name=="surfaceMaxCells"){r.surface_numerics.maximum_cells=count(entry.value());found=true;}
      if(!found)fail("unknown_request_field","unknown numerical field: "+name);
    }
  }
  if(o.contains("resources")){const auto& b=object(o.at("resources"));keys(b,{"memoryBytes"});if(b.contains("memoryBytes"))r.memory_budget_bytes=count(b.at("memoryBytes"));}
  if(r.memory_budget_bytes>2ULL*1024ULL*1024ULL*1024ULL || r.root_max_depth>1024 || r.root_max_cells>2000000 || r.max_step_attempts>10000 || r.max_rejected_steps>10000 || r.max_correction_iterations>100 || r.thread_count>32 || r.surface_numerics.maximum_depth>64 || r.surface_numerics.maximum_cells>2000000)fail("request_budget_exhausted","v2 resource/control limit exceeded");
  if(o.contains("paths")) {
    HistoryBudget budget{static_cast<std::size_t>(std::min<std::uint64_t>(100000,r.memory_budget_bytes/4096))};
    const auto& paths=array(o.at("paths")); if(paths.size()>1024)fail("population_budget_exhausted","v2 bounded population limit 1024");
    for(const auto& item:paths){const auto& p=object(item);keys(p,{"pathId","charge","history"});const auto id=string(p.at("pathId"));if(id.empty() || id.size()>1024)fail("invalid_history","invalid path id");r.paths.push_back({id,token(p.at("charge")),decode_history(id,p.at("history"),budget)});}
  }
  (void)require_equation_provider(r); return r;
}
Object encode_request(const NativeCoupledEvolutionRequest& r) {
  const auto s=r.equation_selection.value_or(EquationSelection{});
  Object model{{"compositionId",s.composition_id},{"speedDomain",s.speed_domain},{"boundaryPolicy",s.boundary_policy},{"constraint",s.constraint},{"method",s.method},{"fieldSpeed",r.field_speed},{"coupling",r.coupling}};
  if(r.surface_geometry){const auto& g=*r.surface_geometry;Array center,rotation;for(auto& v:g.center)center.emplace_back(v);for(auto& row:g.orientation){Array a;for(auto& v:row)a.emplace_back(v);rotation.push_back(a);}model["geometry"]=Object{{"kind",g.kind},{"radius",g.radius},{"flattening",g.flattening},{"majorRadius",g.major_radius},{"center",center},{"orientation",rotation}};}
  Object n;for(auto& f:decimals)n[f.name]=r.*f.member;for(auto& f:counts)n[f.name]=r.*f.member;
  n["errorBoundChecking"]=r.error_bound_checking;
  n["adaptiveGrowth"]=r.use_adaptive_step_growth;n["continuousAdaptive"]=r.use_continuous_adaptive_step;
  n["surfacePositionTolerance"]=r.surface_numerics.position_tolerance;n["surfaceTangentVelocityTolerance"]=r.surface_numerics.tangent_velocity_tolerance;n["surfaceMaxDepth"]=r.surface_numerics.maximum_depth;n["surfaceMaxCells"]=r.surface_numerics.maximum_cells;
  Array paths;for(auto& p:r.paths){const auto& c=p.history.uniform_circular_endpoint_certificate();Object h=c?circle(*c):Object{{"kind","cubic"},{"segments",segments(p.history)}};paths.push_back(Object{{"pathId",p.path_id},{"charge",p.charge},{"history",h},{"fingerprint",p.history.provenance_fingerprint()}});}
  return {{"schema","eom_evolution_request/v2"},{"runId",r.run_id},{"model",model},{"interval",Object{{"start",r.start_time},{"end",r.end_time}}},{"paths",paths},{"numerics",n},{"resources",Object{{"memoryBytes",r.memory_budget_bytes}}}};
}
std::string binding(const NativeCoupledEvolutionRequest& r) {
  auto encoded=encode_request(r);encoded.erase("interval");encoded.erase("runId");
  // The v2 exposed controls are bound losslessly. Typed callers using other
  // native options also bind their legacy numerical contract fingerprint.
  auto legacy=r;legacy.equation_selection.reset();legacy.surface_geometry.reset();legacy.continuation_histories.clear();
  return equation_identity_sha256(canonical(Object{{"request",encoded},{"model",parse(inspect_equation_model(r).canonical_json)},{"legacyNumerics",native_evolution_model_fingerprint(legacy)}}));
}
std::string hex(const std::vector<unsigned char>& bytes){static const char* digits="0123456789abcdef";std::string out;for(auto b:bytes){out+=digits[b>>4];out+=digits[b&15];}return out;}
std::vector<unsigned char> unhex(const std::string& text){if(text.size()%2)fail("invalid_checkpoint","invalid hex");std::vector<unsigned char> out;const auto digit=[](char c){if(c>='0'&&c<='9')return c-'0';if(c>='a'&&c<='f')return c-'a'+10;fail("invalid_checkpoint","invalid hex");return 0;};for(std::size_t i=0;i<text.size();i+=2)out.push_back(digit(text[i])*16+digit(text[i+1]));return out;}
Object sealed_checkpoint(const std::string& text){auto value=parse(text);auto o=object(value);keys(o,{"schema","binding","resolvedModel","preparation","acceptedTime","runId","controllerStep","acceptedCount","rejectedCount","growthCount","cooldown","histories","providerState","digest"});if(string(o.at("schema"))!="eom_provider_checkpoint/v8")fail("checkpoint_schema_mismatch","provider restart requires v8; v7 remains legacy-only");const auto digest=string(o.at("digest"));o.erase("digest");if(equation_identity_sha256(canonical(o))!=digest)fail("checkpoint_digest_mismatch","checkpoint bytes changed");return o;}
Array published(const std::vector<NativePublishedPath>& paths){Array out;for(auto& p:paths)out.push_back(Object{{"pathId",p.path_id},{"fingerprint",p.history.provenance_fingerprint()},{"segments",segments(p.history)}});return out;}
Array extensions(const std::vector<NativePublishedPath>& paths,const std::string& start){Array out;for(auto& p:paths)out.push_back(Object{{"pathId",p.path_id},{"fingerprint",p.history.provenance_fingerprint()},{"segments",segments(p.history,parse_finite_double(start,"extension start"))}});return out;}
Object root_ledger(const NativeAccelerationSnapshotCertificate& snapshot) {
  Array pairs;
  for(const auto& row:snapshot.root_certificates) {
    const auto& c=row.certificate;Array hits;
    for(const auto& root:c.roots)hits.push_back(Object{{"emission",Array{root.lower,root.upper}},{"transmitterFactor",Array{root.transmitter_factor_lower,root.transmitter_factor_upper}},{"receiverFactor",Array{root.receiver_factor_lower,root.receiver_factor_upper}},{"transmitterFactorSign",root.transmitter_factor_sign},{"precisionRoute",root.precision_route},{"precisionBits",root.precision_bits}});
    pairs.push_back(Object{{"receiverPathId",row.receiver_path_id},{"transmitterPathId",row.transmitter_path_id},{"receiverHistoryFingerprint",c.receiver_history_fingerprint},{"transmitterHistoryFingerprint",c.transmitter_history_fingerprint},{"status",c.status},{"failureCode",c.failure_code},{"searchedInterval",Array{c.searched_lower,c.searched_upper}},{"rootFreeComplement",c.root_free_complement},{"memoryBoundaryContact",c.memory_boundary_contact},{"coincidentEndpointExcluded",c.coincident_endpoint_excluded},{"roots",hits}});
  }
  return {{"receptionTime",snapshot.reception_time},{"status",snapshot.status},{"failureCode",snapshot.failure_code},{"logicalOrderedPairs",snapshot.logical_ordered_pairs},{"traversalExcludedPairs",snapshot.traversal_excluded_pairs},{"traversalUnresolvedPairs",snapshot.traversal_unresolved_pairs},{"pairs",pairs}};
}
void require_preparation_prefix(const RetainedHistory& prepared, const RetainedHistory& retained) {
  const auto& original_circle=prepared.uniform_circular_endpoint_certificate();
  const auto& retained_circle=retained.uniform_circular_endpoint_certificate();
  if(prepared.history_id()!=retained.history_id() || original_circle.has_value()!=retained_circle.has_value() || (original_circle && canonical(circle(*original_circle))!=canonical(circle(*retained_circle))))fail("checkpoint_history_mismatch","preparation history identity or analytical provenance changed");
  const auto original=segments(prepared), all=segments(retained);
  if (all.size()<original.size()) fail("checkpoint_history_mismatch","preparation prefix missing");
  for(std::size_t i=0;i<original.size();++i)if(canonical(original[i])!=canonical(all[i]))fail("checkpoint_history_mismatch","preparation prefix changed");
}
void validate_checkpoint_histories(const NativeCoupledEvolutionRequest& r, const NativeCoupledEvolutionCertificate& c) {
  if(r.paths.empty() || c.histories.empty())fail("invalid_checkpoint","persistence requires a nonempty population");
  if(c.histories.size()!=r.paths.size())fail("invalid_checkpoint","published population mismatch");
  const auto identity=retained_publication_required(r)?retained_request_identity(r):std::string{};
  for(std::size_t i=0;i<r.paths.size();++i) {
    const auto& path=c.histories[i];
    if(path.path_id!=r.paths[i].path_id)fail("invalid_checkpoint","published path order mismatch");
    require_preparation_prefix(r.paths[i].history,path.history);
    if(equation_decimal_identity(path.history.segments().back().t_end_token())!=equation_decimal_identity(c.accepted_end_time))fail("checkpoint_history_mismatch","published endpoint mismatch");
    if(r.error_bound_checking=="strict" && retained_publication_required(r)) {
      std::size_t depth=0;
      auto endpoint=path.history.provenance_fingerprint();
      for(auto carrier=path.validated_evidence;carrier;carrier=carrier->previous()) {
        if(carrier->model_identity()!=identity || carrier->history_fingerprint()!=endpoint)fail("checkpoint_model_mismatch","invalid immutable Surface evidence");
        ++depth;
        if(carrier->previous())endpoint=carrier->previous()->history_fingerprint();
      }
      if(depth+r.initial_accepted_step_count!=c.accepted_step_count || (!path.validated_evidence && path.history.provenance_fingerprint()!=r.paths[i].history.provenance_fingerprint()))fail("invalid_checkpoint","Surface publication chronology mismatch");
    }
  }
}
volatile std::sig_atomic_t cancellation_flag=0;
void cancel_signal(int){cancellation_flag=1;}
}

std::string create_provider_checkpoint(const NativeCoupledEvolutionRequest& r,const NativeCoupledEvolutionCertificate& c) {
  require_native_ordinary_method(r, "the v8 provider checkpoint");
  if(!r.joint_histories.empty() || !r.joint_root_point_states.empty())fail("unsupported_model_combination","v8 does not yet bind typed joint preparation; use its existing v7 owner within that owner's supported domain");
  (void)require_equation_provider(r);
  if(!c.all_steps_atomic || c.run_id!=r.run_id)fail("invalid_checkpoint","only matching atomic accepted history can be checkpointed");
  validate_checkpoint_histories(r,c);
  const auto preparation=encode_request(r);
  constexpr std::size_t maximum_resume_bytes=32U*1024U*1024U;
  const std::size_t reserved_request_bytes=canonical(preparation).size()+8192U;
  if(reserved_request_bytes>=maximum_resume_bytes)fail("checkpoint_size_exhausted","original request exceeds symmetric resume envelope budget");
  Object out{{"schema","eom_provider_checkpoint/v8"},{"binding",binding(r)},{"resolvedModel",parse(inspect_equation_model(r).canonical_json)},
    {"preparation",preparation},{"acceptedTime",c.accepted_end_time},{"runId",c.run_id},{"controllerStep",c.controller_step_size},
    {"acceptedCount",c.accepted_step_count},{"rejectedCount",c.rejected_step_count},{"growthCount",c.controller_consecutive_growth_headroom_steps},{"cooldown",c.controller_certificate_cost_cooldown_remaining},{"histories",published(c.histories)}};
  if(r.error_bound_checking=="none") {
    out["providerState"]=Object{{"schema","exploratory-point/v1"},{"errorBoundChecking","none"}};
  } else if(retained_publication_required(r)) {
    Array boundaries; std::vector<std::shared_ptr<const RetainedEvolutionEvidence>> chain;
    if(!c.histories.empty())for(auto p=c.histories.front().validated_evidence;p;p=p->previous())chain.push_back(p);
    std::reverse(chain.begin(),chain.end());
    for(auto& p:chain) {if(p->model_identity()!=retained_request_identity(r))fail("checkpoint_model_mismatch","Surface carrier mismatch");const auto& records=p->solutions();if(records.empty())fail("invalid_checkpoint","empty solution carrier");boundaries.push_back(Array{records.front().start_time,records.back().end_time});}
    out["providerState"]=Object{{"schema",r.surface_geometry?"surface-revalidate-publication/v1":"logarithmic-revalidate-publication/v1"},{"boundaries",boundaries}};
  } else {
    auto legacy=r;legacy.equation_selection.reset();legacy.continuation_histories.clear();
    // Persist the accepted prefix even if the invocation ends in rejected
    // attempts. Rejection counters/diagnostics stay in the v8 response; no
    // candidate history enters the legacy payload.
    auto accepted_prefix=c;
    while(!accepted_prefix.steps.empty() && accepted_prefix.steps.back().status!="accepted")accepted_prefix.steps.pop_back();
    out["providerState"]=Object{{"schema","canonical-v7-inside-v8/v1"},{"legacyBytes",hex(serialize_native_evolution_checkpoint(create_native_evolution_checkpoint(legacy,accepted_prefix)))}};
  }
  out["digest"]=equation_identity_sha256(canonical(out));
  auto serialized=canonical(out);
  if(serialized.size()>maximum_resume_bytes-reserved_request_bytes)fail("checkpoint_size_exhausted","checkpoint plus original request exceeds symmetric 32 MiB resume envelope budget");
  return serialized;
}

NativeCoupledEvolutionCertificate resume_provider_checkpoint(const NativeCoupledEvolutionRequest& r,const std::string& text,const std::string& end) {
  require_native_ordinary_method(r, "the v8 provider checkpoint");
  if(!r.joint_histories.empty() || !r.joint_root_point_states.empty())fail("unsupported_model_combination","v8 does not yet bind typed joint preparation");
  if(r.paths.empty())fail("invalid_checkpoint","restart requires a nonempty population");
  const auto cp=sealed_checkpoint(text);
  if(string(cp.at("binding"))!=binding(r) || canonical(cp.at("resolvedModel"))!=canonical(parse(inspect_equation_model(r).canonical_json)))fail("checkpoint_model_mismatch","provider/build/preparation/numerical binding changed");
  if(canonical(cp.at("preparation"))!=canonical(encode_request(r)) || string(cp.at("runId"))!=r.run_id)fail("checkpoint_preparation_mismatch","original request/run identity changed; branching is not implemented");
  auto resumed=r;resumed.run_id=string(cp.at("runId"));resumed.start_time=token(cp.at("acceptedTime"));resumed.end_time=end;resumed.initial_step=token(cp.at("controllerStep"));
  resumed.initial_accepted_step_count=count(cp.at("acceptedCount"));resumed.initial_rejected_step_count=count(cp.at("rejectedCount"));
  resumed.initial_consecutive_growth_headroom_steps=count(cp.at("growthCount"));resumed.certificate_cost_initial_cooldown_steps=count(cp.at("cooldown"));
  const auto& state=object(cp.at("providerState"));
  if(r.error_bound_checking=="none") {
    keys(state,{"schema","errorBoundChecking"});
    if(string(state.at("schema"))!="exploratory-point/v1" || string(state.at("errorBoundChecking"))!="none")fail("checkpoint_provider_state_mismatch","exploratory checkpoint required");
    HistoryBudget budget{static_cast<std::size_t>(std::min<std::uint64_t>(100000,r.memory_budget_bytes/4096))};
    const auto& records=array(cp.at("histories"));if(records.size()!=r.paths.size())fail("invalid_checkpoint","checkpoint population mismatch");
    for(std::size_t i=0;i<records.size();++i){const auto& item=object(records[i]);keys(item,{"pathId","fingerprint","segments"});const auto id=string(item.at("pathId"));if(id!=r.paths[i].path_id)fail("invalid_checkpoint","checkpoint path order changed");RetainedHistory history(id,decode_segments(item.at("segments"),budget));
      // Restore analytical preparation provenance by appending only the stored future.
      auto restored=r.paths[i].history;for(const auto& segment:history.segments())if(segment.t_end()>restored.t_end())restored=restored.appended(segment);
      if(canonical(segments(restored))!=canonical(segments(history))||restored.provenance_fingerprint()!=string(item.at("fingerprint"))||equation_decimal_identity(restored.segments().back().t_end_token())!=equation_decimal_identity(resumed.start_time))fail("checkpoint_history_mismatch","exploratory checkpoint prefix/endpoint/fingerprint mismatch");
      resumed.continuation_histories.push_back({id,std::move(restored)});}
  } else if(retained_publication_required(r)) {
    keys(state,{"schema","boundaries"});
    if(string(state.at("schema"))!=(r.surface_geometry?"surface-revalidate-publication/v1":"logarithmic-revalidate-publication/v1"))fail("checkpoint_provider_state_mismatch","Surface state schema mismatch");
    std::vector<NativePublishedPath> current;for(auto& p:r.paths)current.push_back({p.path_id,p.history});
    const auto& records=array(cp.at("histories"));if(records.size()!=r.paths.size())fail("invalid_checkpoint","checkpoint population mismatch");
    std::vector<std::vector<CubicHistorySegment>> full;
    HistoryBudget budget{static_cast<std::size_t>(std::min<std::uint64_t>(100000,r.memory_budget_bytes/4096))};
    for(std::size_t i=0;i<records.size();++i){const auto& item=object(records[i]);keys(item,{"pathId","fingerprint","segments"});if(string(item.at("pathId"))!=current[i].path_id)fail("invalid_checkpoint","checkpoint path order changed");full.push_back(decode_segments(item.at("segments"),budget));}
    if(array(state.at("boundaries")).size()+r.initial_accepted_step_count!=resumed.initial_accepted_step_count)fail("checkpoint_controller_mismatch","publication count differs from controller");
    for(const auto& row:array(state.at("boundaries"))) {
      const auto& times=array(row);if(times.size()!=2)fail("invalid_checkpoint","invalid publication boundary");const auto start=token(times[0]),stop=token(times[1]);
      std::vector<NativePublishedPath> candidates=current;
      for(std::size_t i=0;i<full.size();++i)for(const auto& segment:full[i])if(segment.t_end()>current[i].history.t_end() && segment.t_end()<=parse_finite_double(stop,"boundary"))candidates[i].history=candidates[i].history.appended(segment);
      const auto proof=certify_retained_publication(r,current,candidates,start,stop);
      if(!proof.certified)fail("checkpoint_revalidation_failed",proof.failure_code);
      for(std::size_t i=0;i<proof.histories.size();++i)if(proof.histories[i].history.provenance_fingerprint()!=candidates[i].history.provenance_fingerprint())fail("checkpoint_revalidation_changed_history","restoration would change persisted errors or coefficients");
      current=proof.histories;
    }
    for(std::size_t i=0;i<current.size();++i)if(canonical(segments(current[i].history))!=canonical(object(records[i]).at("segments")) || current[i].history.provenance_fingerprint()!=string(object(records[i]).at("fingerprint")) || equation_decimal_identity(current[i].history.segments().back().t_end_token())!=equation_decimal_identity(resumed.start_time))fail("checkpoint_history_mismatch","checkpoint history/coverage mismatch");
    resumed.continuation_histories=std::move(current);
    if(resumed.continuation_histories.front().validated_evidence==nullptr)resumed.continuation_histories.clear();
  } else {
    keys(state,{"schema","legacyBytes"});
    if(string(state.at("schema"))!="canonical-v7-inside-v8/v1")fail("checkpoint_provider_state_mismatch","canonical state schema mismatch");
    const auto legacy=deserialize_native_evolution_checkpoint(unhex(string(state.at("legacyBytes"))));
    auto original=r;original.equation_selection.reset();original.continuation_histories.clear();
    if(legacy.model_fingerprint!=native_evolution_model_fingerprint(original) || legacy.run_id!=r.run_id || legacy.paths.size()!=r.paths.size())fail("checkpoint_model_mismatch","inner canonical model/run/population mismatch");
    std::vector<NativePublishedPath> inner;
    for(std::size_t i=0;i<legacy.paths.size();++i){const auto& path=legacy.paths[i];if(path.path_id!=r.paths[i].path_id || path.charge!=r.paths[i].charge)fail("checkpoint_history_mismatch","inner canonical population changed");require_preparation_prefix(r.paths[i].history,path.history);inner.push_back({path.path_id,path.history});}
    if(canonical(published(inner))!=canonical(cp.at("histories")))fail("checkpoint_history_mismatch","inner/outer canonical histories differ");
    if(legacy.accepted_time!=resumed.start_time || legacy.accepted_step_count!=resumed.initial_accepted_step_count || legacy.rejected_step_count!=resumed.initial_rejected_step_count || legacy.controller_step_size!=resumed.initial_step || legacy.controller_consecutive_growth_headroom_steps!=resumed.initial_consecutive_growth_headroom_steps || legacy.controller_certificate_cost_cooldown_remaining!=resumed.certificate_cost_initial_cooldown_steps)fail("checkpoint_controller_mismatch","inner/outer adaptive state mismatch");
    resumed.paths.clear();for(auto& p:legacy.paths)resumed.paths.push_back({p.path_id,p.charge,p.history});resumed.joint_histories=legacy.joint_histories;resumed.joint_state_fallback_already_applied=legacy.joint_history_mode=="ordinary_fallback";
  }
  return evolve_native_coupled_histories(resumed);
}

namespace {
constexpr const char* kValidatedCheckpointSchema = "eom_provider_checkpoint/v9";
constexpr const char* kValidatedProviderState = "validated-run-record/v1";
constexpr std::size_t kMaximumResumeBytes = 32U * 1024U * 1024U;

// The execution identity of a selected request: the method and the bound
// controls the v2 request encoding does not carry. Worker count and the
// per-invocation diagnostic limit are not part of it.
Object validated_execution(const NativeCoupledEvolutionRequest& r) {
  const auto& v = r.validated;
  Array groups;
  for (const auto& [leader, follower] : v.groups) groups.push_back(Array{leader, follower});
  j::value total = nullptr;
  if (v.total_position_budget) total = Array{*v.total_position_budget, *v.total_velocity_budget};
  return Object{{"method", r.integration_method},
                {"positionIncrementBudget", r.position_increment_budget},
                {"velocityIncrementBudget", r.velocity_increment_budget},
                {"totalBudget", total},
                {"maxAttemptsPerStep", v.max_attempts_per_step},
                {"maxLowerSignRetries", v.max_lower_sign_retries},
                {"growthCooldownSteps", v.growth_cooldown_steps},
                {"pairPolicy", v.pair_policy},
                {"groups", groups}};
}

// v8's binding, with the execution digest added.
std::string validated_binding(const NativeCoupledEvolutionRequest& r, const std::string& execution_digest) {
  auto encoded = encode_request(r);
  encoded.erase("interval");
  encoded.erase("runId");
  auto legacy = r;
  legacy.equation_selection.reset();
  legacy.surface_geometry.reset();
  legacy.continuation_histories.clear();
  return equation_identity_sha256(canonical(Object{
      {"request", encoded},
      {"model", parse(inspect_equation_model(r).canonical_json)},
      {"legacyNumerics", native_evolution_model_fingerprint(legacy)},
      {"execution", execution_digest}}));
}

// The first request of a selected run.
void require_validated_original(const NativeCoupledEvolutionRequest& r) {
  if (!native_validated_method_selected(r)) fail("unsupported_execution_policy", "v9 persists the validated method only");
  require_native_validated_controls(r);
  if (r.validated.continuation || r.initial_accepted_step_count != 0U || r.initial_rejected_step_count != 0U)
    fail("checkpoint_preparation_mismatch", "v9 binds a run's original request, which carries no continuation or restart counters");
  if (r.paths.empty()) fail("invalid_checkpoint", "persistence requires a nonempty population");
}

ValidatedRunControls validated_controls(const NativeCoupledEvolutionRequest& r) {
  const ValidatedEvolutionRequest t = native_validated_request(r);
  ValidatedRunControls c;
  c.policy = t.policy;
  c.field_speed = t.field_speed;
  c.coupling = t.coupling;
  c.initial_step = t.initial_step;
  c.minimum_step = t.minimum_step;
  c.increment_budget = t.increment_budget;
  c.total_budget = t.total_budget;
  c.max_attempts_per_step = t.max_attempts_per_step;
  c.max_lower_sign_retries = t.max_lower_sign_retries;
  c.growth_cooldown_steps = t.growth_cooldown_steps;
  c.pair_policy = t.pair_policy;
  c.groups = t.groups;
  return c;
}
}  // namespace

std::string create_validated_provider_checkpoint(const NativeCoupledEvolutionRequest& r, const NativeCoupledEvolutionCertificate& c) {
  require_validated_original(r);
  if (c.run_id != r.run_id || !c.all_steps_atomic) fail("invalid_checkpoint", "only the matching run's atomic accepted boundary can be checkpointed");
  const auto& k = c.validated_continuation;
  if (!k) fail("checkpoint_origin_required", "the run returned no accepted boundary to persist");
  if (k->record_status() != "recorded" || !k->record()) fail("checkpoint_origin_required", "the run has no complete generating record: " + k->record_status());
  const auto& sealed = k->driver()->state();
  const ValidatedRunRecord& generating = *k->record();
  // The original request must be the generating record's: its controls,
  // origin time and exact origin members.
  {
    const std::string difference = validated_run_controls_difference(validated_controls(r), generating.controls());
    if (!difference.empty()) fail("checkpoint_origin_mismatch", "the generating record's control differs from the original request: " + difference);
    if (compare_exact_decimal_tokens(generating.origin_time(), r.start_time) != 0)
      fail("checkpoint_origin_mismatch", "the generating record's origin time is not the original request's start");
    const auto members = generating.origin_members();
    bool same = members.size() == r.paths.size();
    for (std::size_t i = 0; same && i < members.size(); ++i)
      same = members[i].path_id == r.paths[i].path_id && members[i].charge == r.paths[i].charge &&
             members[i].chain == validated_history_digest(r.paths[i].history);
    if (!same) fail("checkpoint_origin_mismatch", "the generating record's origin is not the original request's");
  }
  // Every persisted claim is the sealed accepted boundary's: the scalar
  // claims are read from it, and the certificate's histories must be the
  // ones its members name, in order.
  if (sealed.accepted_time != c.accepted_end_time || k->accepted_step_count() != c.accepted_step_count ||
      k->rejected_step_count() != c.rejected_step_count || sealed.controller_step_size != c.controller_step_size ||
      generating.final_state().accepted_time != sealed.accepted_time ||
      generating.final_state().accepted_step_count != sealed.accepted_step_count ||
      generating.final_state().controller_step_size != sealed.controller_step_size)
    fail("checkpoint_controller_mismatch", "the certificate, its continuation and its record disagree");
  {
    bool same = sealed.members.size() == c.histories.size();
    for (std::size_t i = 0; same && i < c.histories.size(); ++i)
      same = sealed.members[i].path_id == c.histories[i].path_id &&
             sealed.members[i].history_digest == validated_history_digest(c.histories[i].history);
    if (!same) fail("checkpoint_claim_mismatch", "the certificate's histories are not the sealed accepted boundary's");
  }
  const auto execution = validated_execution(r);
  const auto execution_digest = equation_identity_sha256(canonical(execution));
  const Object preparation{{"request", encode_request(r)}, {"execution", execution}};
  const std::size_t reserved_request_bytes = canonical(preparation).size() + 8192U;
  if (reserved_request_bytes >= kMaximumResumeBytes) fail("checkpoint_size_exhausted", "original request exceeds symmetric resume envelope budget");
  const std::string record = k->record()->serialize();
  Object out{{"schema", kValidatedCheckpointSchema},
             {"execution", execution},
             {"executionDigest", execution_digest},
             {"binding", validated_binding(r, execution_digest)},
             {"resolvedModel", parse(inspect_equation_model(r).canonical_json)},
             {"preparation", preparation},
             {"acceptedTime", sealed.accepted_time},
             {"runId", r.run_id},
             {"controllerStep", sealed.controller_step_size},
             {"acceptedCount", k->accepted_step_count()},
             {"rejectedCount", k->rejected_step_count()},
             {"histories", published(c.histories)},
             {"providerState", Object{{"schema", kValidatedProviderState},
                                      {"record", record},
                                      {"recordIdentity", validated_run_record_identity(record)}}}};
  out["digest"] = equation_identity_sha256(canonical(out));
  auto serialized = canonical(out);
  if (serialized.size() > kMaximumResumeBytes - reserved_request_bytes) fail("checkpoint_size_exhausted", "checkpoint plus original request exceeds symmetric 32 MiB resume envelope budget");
  return serialized;
}

ValidatedProviderResume resume_validated_provider_checkpoint(
    const NativeCoupledEvolutionRequest& r, const std::string& text, const std::string& end,
    std::optional<std::size_t> worker_override, std::optional<std::string> expected_record_identity) {
  require_validated_original(r);
  if (text.size() > kMaximumResumeBytes) fail("checkpoint_size_exhausted", "checkpoint exceeds the 32 MiB resume envelope budget");
  // Corruption only: anyone can recompute this digest.
  auto value = parse(text);
  auto cp = object(value);
  keys(cp, {"schema", "execution", "executionDigest", "binding", "resolvedModel", "preparation", "acceptedTime", "runId",
            "controllerStep", "acceptedCount", "rejectedCount", "histories", "providerState", "digest"});
  for (const char* name : {"schema", "execution", "executionDigest", "binding", "resolvedModel", "preparation", "acceptedTime",
                           "runId", "controllerStep", "acceptedCount", "rejectedCount", "histories", "providerState", "digest"})
    if (!cp.contains(name)) fail("invalid_checkpoint", std::string("checkpoint lacks ") + name);
  if (string(cp.at("schema")) != kValidatedCheckpointSchema) fail("checkpoint_schema_mismatch", "validated restart requires v9");
  const auto digest = string(cp.at("digest"));
  cp.erase("digest");
  if (equation_identity_sha256(canonical(cp)) != digest) fail("checkpoint_digest_mismatch", "checkpoint bytes changed");
  // Identity comes from the caller's original request, never the checkpoint.
  const auto execution = validated_execution(r);
  const auto execution_digest = equation_identity_sha256(canonical(execution));
  if (canonical(cp.at("execution")) != canonical(execution) || string(cp.at("executionDigest")) != execution_digest)
    fail("checkpoint_execution_mismatch", "execution method or bound controls changed");
  if (string(cp.at("binding")) != validated_binding(r, execution_digest) ||
      canonical(cp.at("resolvedModel")) != canonical(parse(inspect_equation_model(r).canonical_json)))
    fail("checkpoint_model_mismatch", "provider/build/preparation/numerical/execution binding changed");
  if (canonical(cp.at("preparation")) != canonical(Object{{"request", encode_request(r)}, {"execution", execution}}) ||
      string(cp.at("runId")) != r.run_id)
    fail("checkpoint_preparation_mismatch", "original request/run identity changed; branching is not implemented");
  const auto& state = object(cp.at("providerState"));
  keys(state, {"schema", "record", "recordIdentity"});
  if (string(state.at("schema")) != kValidatedProviderState) fail("checkpoint_provider_state_mismatch", "validated state schema mismatch");
  const std::string record = string(state.at("record"));
  // The runtime worker count: not part of the preparation.
  const std::size_t workers = worker_override.value_or(r.thread_count);
  if (workers == 0U || workers > 32U) fail("request_budget_exhausted", "the worker count must be between 1 and 32");
  if (compare_exact_decimal_tokens(end, token(cp.at("acceptedTime"))) <= 0) fail("invalid_request", "the requested end must follow the accepted time");
  // A complete record identity named by the caller selects these bytes; it
  // adds to the caller's controls and origin below, never replaces them.
  if (expected_record_identity && *expected_record_identity != validated_run_record_identity(record))
    fail("checkpoint_replay_refused", "expectation: the record's bytes are not the expected record");
  // Resources, before any replay, from the record read as plain claims.
  // Replay passes each leg's requested end and accepted-step limit to the
  // driver, which enforces them, so a leg reaches at most the steps those
  // allow from the origin, and one clipped final step each, which the
  // per-leg bound counts. Replay holds one leg's attempts at a time, the
  // whole retained history, and the record and envelope copies; the new leg
  // follows with the caller's own limit.
  const ValidatedRunRecordClaims claims = read_validated_run_record(record);
  if (claims.status != "read" || !claims.record) fail("checkpoint_replay_refused", "read: " + claims.reason);
  std::uint64_t replay_steps = 0;
  std::uint64_t replay_bytes = 0;
  {
    using U = unsigned __int128;
    auto origin = r;
    origin.thread_count = workers;
    U steps = 0, peak = 0, segment = 0;
    for (const auto& leg : claims.record->legs()) {
      auto bound = origin;
      bound.end_time = leg.end_time;
      bound.diagnostic_maximum_accepted_steps = leg.max_accepted_steps;
      const NativeValidatedBound b = native_validated_bound(bound);
      steps += b.reachable_steps;
      peak = std::max<U>(peak, b.growth_bytes);
      segment = std::max<U>(segment, b.segment_bytes);
    }
    auto next = origin;
    next.end_time = end;
    const NativeValidatedBound b = native_validated_bound(next);
    segment = std::max<U>(segment, b.segment_bytes);
    const U bytes = peak + b.growth_bytes + (steps + b.reachable_steps) * U(r.paths.size()) * segment +
                    4U * U(record.size()) + 4U * U(text.size());
    if (bytes > std::numeric_limits<std::uint64_t>::max())
      fail("validated_resource_bound_unavailable", "no finite replay bound can be established");
    replay_steps = static_cast<std::uint64_t>(steps);
    replay_bytes = static_cast<std::uint64_t>(bytes);
    if (replay_bytes > r.memory_budget_bytes)
      fail("checkpoint_resource_refused", "the replay bound of " + std::to_string(replay_bytes) +
           " bytes for " + std::to_string(replay_steps) + " reachable replayed steps exceeds the memory budget of " +
           std::to_string(r.memory_budget_bytes));
  }
  ValidatedRestoreExpectation expectation;
  expectation.controls = validated_controls(r);
  {
    std::vector<ValidatedRunOriginMember> origin;
    for (const auto& p : r.paths) origin.push_back({p.path_id, p.charge, validated_history_digest(p.history)});
    expectation.origin = std::move(origin);
  }
  const ValidatedRestoreResult restored = restore_validated_run(record, expectation, workers);
  if (restored.status != "restored") fail("checkpoint_replay_refused", restored.stage + ": " + restored.reason);
  // Every claim against replay.
  const auto& sealed = restored.continuation->state();
  std::vector<NativePublishedPath> replayed;
  for (const auto& p : restored.paths) replayed.push_back({p.id, p.history});
  if (string(state.at("recordIdentity")) != restored.record_identity) fail("checkpoint_claim_mismatch", "the record identity claim differs from the record read");
  if (token(cp.at("acceptedTime")) != sealed.accepted_time) fail("checkpoint_claim_mismatch", "the accepted time differs from replay");
  if (count(cp.at("acceptedCount")) != sealed.accepted_step_count) fail("checkpoint_claim_mismatch", "the accepted count differs from replay");
  if (count(cp.at("rejectedCount")) != restored.replayed_rejected_steps) fail("checkpoint_claim_mismatch", "the rejected count differs from replay");
  if (token(cp.at("controllerStep")) != sealed.controller_step_size) fail("checkpoint_claim_mismatch", "the controller step differs from replay");
  if (canonical(published(replayed)) != canonical(cp.at("histories"))) fail("checkpoint_claim_mismatch", "the histories differ from replay");
  // Only now is a continuation issued, from the replay.
  const auto continuation = native_validated_continuation_from_replay(restored);
  auto resumed = r;
  resumed.paths.clear();
  for (const auto& p : restored.paths) resumed.paths.push_back({p.id, p.charge, p.history});
  resumed.validated_population_evidence = restored.evidence;
  resumed.validated.continuation = continuation;
  resumed.initial_accepted_step_count = continuation->accepted_step_count();
  resumed.initial_rejected_step_count = continuation->rejected_step_count();
  resumed.start_time = sealed.accepted_time;
  resumed.end_time = end;
  resumed.thread_count = workers;
  ValidatedProviderResume out;
  out.request = resumed;
  out.run = evolve_native_coupled_histories(resumed);
  out.identity_basis = expected_record_identity ? "expected_record" : restored.identity_basis;
  out.record_identity = restored.record_identity;
  out.compared_fields = restored.compared_fields;
  if (expected_record_identity) out.compared_fields.emplace_back("record_identity");
  out.replay_step_bound = replay_steps;
  out.replay_bound_bytes = replay_bytes;
  out.replayed_legs = restored.replayed_legs;
  out.replayed_steps = restored.replayed_steps;
  out.replayed_rejected_steps = restored.replayed_rejected_steps;
  out.worker_count = workers;
  return out;
}

namespace {
constexpr const char* kRequestV3 = "eom_evolution_request/v3";

// Decodes eom_evolution_request/v3: the v2 members through the unchanged v2
// decoder, then the required execution object. Controls the v2 decoder
// would otherwise default are resolved explicitly: the step controls and
// the coupling must be supplied; v2's ordinary-controller wire defaults
// (maximumStep, maxStepAttempts, maxRejectedSteps) are not inherited, so an
// absent one takes the typed default the validated method requires and a
// supplied one is refused by name by the bridge unless it is at that
// default. The bridge's named control refusal runs before return.
NativeCoupledEvolutionRequest decode_request_v3(const j::value& value) {
  const auto& o = object(value);
  if (!o.contains("schema") || string(o.at("schema")) != kRequestV3) fail("unsupported_request_schema", "v3 schema required");
  if (!o.contains("execution")) fail("invalid_request", "v3 requires an execution object");
  Object v2 = o;
  v2.erase("execution");
  v2["schema"] = "eom_evolution_request/v2";
  auto r = decode_request(v2);
  if(r.error_bound_checking!="strict")fail("unsupported_execution_policy","v3 validated execution requires strict error-bound checking");
  const auto present = [&](const char* section, const char* key) {
    return o.contains(section) && object(o.at(section)).contains(key);
  };
  if (!present("numerics", "initialStep") || !present("numerics", "minimumStep"))
    fail("invalid_request", "v3 requires numerics.initialStep and numerics.minimumStep");
  if (!present("model", "coupling")) fail("invalid_request", "v3 requires model.coupling");
  const NativeCoupledEvolutionRequest typed{};
  if (!present("numerics", "maximumStep")) r.maximum_step = typed.maximum_step;
  if (!present("numerics", "maxStepAttempts")) r.max_step_attempts = typed.max_step_attempts;
  if (!present("numerics", "maxRejectedSteps")) r.max_rejected_steps = typed.max_rejected_steps;
  const auto& e = object(o.at("execution"));
  keys(e, {"method", "positionIncrementBudget", "velocityIncrementBudget", "totalBudget", "maxAttemptsPerStep",
           "maxLowerSignRetries", "growthCooldownSteps", "pairPolicy", "groups", "maximumAcceptedSteps"});
  for (const char* k : {"method", "positionIncrementBudget", "velocityIncrementBudget", "maximumAcceptedSteps"})
    if (!e.contains(k)) fail("invalid_request", std::string("v3 execution requires ") + k);
  r.integration_method = string(e.at("method"));
  if (r.integration_method != kValidatedFarStepEvolutionPolicy)
    fail("unsupported_execution_policy", "v3 admits only the validated far-step method");
  r.position_increment_budget = token(e.at("positionIncrementBudget"));
  r.velocity_increment_budget = token(e.at("velocityIncrementBudget"));
  if (e.contains("totalBudget") && !e.at("totalBudget").is_null()) {
    const auto& total = array(e.at("totalBudget"));
    if (total.size() != 2U) fail("invalid_request", "totalBudget is null or two decimal tokens");
    r.validated.total_position_budget = token(total[0]);
    r.validated.total_velocity_budget = token(total[1]);
  }
  if (e.contains("maxAttemptsPerStep")) r.validated.max_attempts_per_step = count(e.at("maxAttemptsPerStep"));
  if (e.contains("maxLowerSignRetries")) r.validated.max_lower_sign_retries = count(e.at("maxLowerSignRetries"));
  if (e.contains("growthCooldownSteps")) r.validated.growth_cooldown_steps = count(e.at("growthCooldownSteps"));
  if (r.validated.max_attempts_per_step == 0U || r.validated.max_attempts_per_step > 1024U ||
      r.validated.max_lower_sign_retries > 1024U || r.validated.growth_cooldown_steps > 1024U)
    fail("request_budget_exhausted", "v3 execution attempt, retry or cooldown limit outside 1..1024");
  if (e.contains("pairPolicy")) r.validated.pair_policy = string(e.at("pairPolicy"));
  if (e.contains("groups")) {
    const auto& groups = array(e.at("groups"));
    if (groups.size() > r.paths.size()) fail("population_budget_exhausted", "more declared groups than paths");
    for (const auto& item : groups) {
      const auto& pair = array(item);
      if (pair.size() != 2U) fail("invalid_request", "a group names exactly two paths");
      r.validated.groups.emplace_back(string(pair[0]), string(pair[1]));
    }
  }
  const auto maximum = count(e.at("maximumAcceptedSteps"));
  if (maximum == 0U || maximum > 1000000U)
    fail("invalid_request", "maximumAcceptedSteps must be a declared positive limit of at most 1000000");
  r.diagnostic_maximum_accepted_steps = static_cast<std::size_t>(maximum);
  require_native_validated_controls(r);
  return r;
}

bool is_request_v3(const Object& envelope) {
  if (!envelope.contains("request") || !envelope.at("request").is_object()) return false;
  const auto& request = envelope.at("request").as_object();
  return request.contains("schema") && request.at("schema").is_string() &&
         std::string(request.at("schema").as_string()) == kRequestV3;
}

Object v3_resources(const NativeCoupledEvolutionRequest& r, std::uint64_t estimate, std::uint64_t budget) {
  return Object{{"memoryEstimateBytes", estimate}, {"memoryBudgetBytes", budget},
                {"maximumAcceptedSteps", r.diagnostic_maximum_accepted_steps},
                {"estimateKind", "admission bound with stated allowances, not a measured resident-set cost"}};
}
}  // namespace

std::string execute_eom_v2_request(const std::string& text,const std::string& checkpoint_file,std::function<bool()> cancel,std::function<void(std::size_t,const std::string&)> progress,std::function<void(const std::string&)> paths) {
  try {
    const auto input=parse(text);const auto& o=object(input);keys(o,{"operation","request","checkpoint","endTime","runtime"});const auto operation=string(o.at("operation"));
    if(operation=="capabilities"){if(o.size()!=1)fail("unknown_request_field","capabilities takes no request");return equation_capabilities_json();}
    if(operation=="validate-cancel") {
      if(o.size()!=2)fail("unknown_request_field","cancel validation requires request only");
      const auto& request=object(o.at("request"));keys(request,{"runId","executionId"});
      const auto id=string(request.at("runId"));
      if(id.empty() || id.size()>1024)fail("invalid_request","runId must contain 1 to 1024 bytes");
      Object validated{{"schema","eom_cancel_request/v2"},{"runId",id}};
      if(request.contains("executionId")){const auto execution=string(request.at("executionId"));if(execution.empty() || execution.size()>128)fail("invalid_request","invalid cancellation execution identity");validated["executionId"]=execution;}
      return canonical(validated);
    }
    const bool v3=is_request_v3(o);
    if(o.contains("runtime") && !(v3 && operation=="resume"))fail("unknown_request_field","runtime is admitted only on a v3 resume");
    auto r=v3?decode_request_v3(o.at("request")):decode_request(o.at("request"));const auto model=inspect_equation_model(r);
    if(operation=="inspect" && v3) {
      if(o.size()!=2)fail("unknown_request_field","inspect takes operation and request only");
      const NativeValidatedBound bound=native_validated_bound(r);
      const auto execution=validated_execution(r);
      return canonical(Object{{"schema","eom_inspection/v3"},{"modelDigest",model.digest},{"resolvedModel",parse(model.canonical_json)},
        {"execution",execution},{"executionDigest",equation_identity_sha256(canonical(execution))},
        {"admission",Object{{"controls","admitted"},{"originPreflight","not_run"},{"certifiedDomain",false},
          {"meaning","control-only inspection: the origin preflight, the driver's admission and every step certificate run only on evolve or resume"}}},
        {"resources",Object{{"maximumAcceptedSteps",r.diagnostic_maximum_accepted_steps},{"reachableSteps",bound.reachable_steps},
          {"growthBoundBytes",bound.growth_bytes},{"memoryBudgetBytes",r.memory_budget_bytes},
          {"estimateKind","admission bound with stated allowances, not a measured resident-set cost"}}}});
    }
    if(operation=="inspect"){if(o.size()!=2)fail("unknown_request_field","inspect takes operation and request only");return canonical(Object{{"schema","eom_inspection/v2"},{"errorBoundChecking",r.error_bound_checking},{"modelDigest",model.digest},{"resolvedModel",parse(model.canonical_json)}});}
    if(operation!="evolve" && operation!="resume")fail("unsupported_operation","unknown v2 operation");
    if(o.size()!=(operation=="evolve"?2U:(o.contains("runtime")?5U:4U)))fail("unknown_request_field","operation fields mismatch");
    if(r.paths.empty() || !object(o.at("request")).contains("interval") || !object(o.at("request")).contains("runId"))fail("invalid_request","evolution requires runId, interval and paths");
    r.cancellation_requested=std::move(cancel);r.accepted_step_callback=std::move(progress);
    std::string delivered=r.start_time;
    if(paths && operation=="resume")delivered=token(object(o.at("checkpoint")).at("acceptedTime"));
    std::size_t path_sequence=0;
    const auto deliver=[&](std::size_t count,const std::string& time,const std::vector<NativePublishedPath>& histories,bool flush) {
      if(!paths || time==delivered)return;
      if(!flush && parse_finite_double(time,"stream time")-parse_finite_double(delivered,"stream start")<0.5)return;
      paths(canonical(Object{{"schema","eom_paths/v1"},{"runId",r.run_id},{"modelDigest",model.digest},{"errorBoundChecking",r.error_bound_checking},
        {"sequence",++path_sequence},{"acceptedStepCount",count},{"acceptedCoverage",Object{{"start",delivered},{"end",time}}},
        {"publishedExtensions",extensions(histories,delivered)},{"durable",false}}));
      delivered=time;
    };
    if(paths)r.accepted_paths_callback=[&](std::size_t count,const std::string& time,const std::vector<NativePublishedPath>& histories){deliver(count,time,histories,false);};
    std::optional<ValidatedProviderResume> restored;
    if(v3) {
      if(r.error_bound_checking!="strict")fail("unsupported_execution_policy","v3 validated execution requires strict error-bound checking");
      const NativeValidatedBound bound=native_validated_bound(r);
      if(bound.growth_bytes>r.memory_budget_bytes)fail("request_budget_exhausted","the v3 bound of "+std::to_string(bound.growth_bytes)+" bytes for maximumAcceptedSteps "+std::to_string(r.diagnostic_maximum_accepted_steps)+" exceeds resources.memoryBytes "+std::to_string(r.memory_budget_bytes));
      if(operation=="resume") {
        std::optional<std::size_t> workers;
        if(o.contains("runtime")){const auto& runtime=object(o.at("runtime"));keys(runtime,{"threadCount"});if(!runtime.contains("threadCount"))fail("invalid_request","runtime requires threadCount");workers=static_cast<std::size_t>(count(runtime.at("threadCount")));}
        restored=resume_validated_provider_checkpoint(r,canonical(o.at("checkpoint")),token(o.at("endTime")),workers);
      }
    }
    auto c=restored?restored->run:(operation=="resume" && !v3?resume_provider_checkpoint(r,canonical(o.at("checkpoint")),token(o.at("endTime"))):evolve_native_coupled_histories(r));
    std::string checkpoint, storage_failure;bool durable=false;
    if(v3){try{checkpoint=create_validated_provider_checkpoint(r,c);}catch(const EquationAdmissionError& error){storage_failure=error.code()+": "+error.what();}}
    else {try {checkpoint=create_provider_checkpoint(r,c);}catch(const EquationAdmissionError& error){if(error.code()!="checkpoint_size_exhausted")throw;storage_failure=error.code()+": "+error.what();}}
    if(!checkpoint.empty() && !checkpoint_file.empty()) {try{write_evolution_checkpoint_bytes_atomic(checkpoint_file,std::vector<unsigned char>(checkpoint.begin(),checkpoint.end()));durable=true;}catch(const std::exception& error){storage_failure=error.what();}}
    Array steps, diagnostics, roots, point_roots, solutions;
    for(auto& step:c.steps){steps.push_back(Object{{"status",step.status},{"start",step.attempted_start},{"end",step.attempted_end},{"acceptedTime",step.accepted_time},{"failureCode",step.failure_code},{"atomic",step.publication_atomic}});
      if(step.accepted_snapshot)point_roots.push_back(root_ledger(*step.accepted_snapshot));
      if(step.recertification_snapshot)point_roots.push_back(root_ledger(*step.recertification_snapshot));
      for(auto& s:step.retained_solutions){
        Array geometry;
        for(const auto& g:s.geometry)geometry.push_back(Object{{"start",g.start_time},{"end",g.end_time},{"certified",g.certified},{"failureCode",g.failure_code},{"visitedCells",g.visited_cells},{"maximumDistance",finite_double_token(g.maximum_distance)},{"maximumTangentVelocity",finite_double_token(g.maximum_tangent_velocity)},{"minimumGradientSquared",finite_double_token(g.minimum_gradient_squared)}});
        solutions.push_back(Object{{"pathId",s.path_id},{"start",s.start_time},{"end",s.end_time},{"certified",s.certified},{"failureCode",s.failure_code},{"positionError",vector(s.position_error)},{"velocityError",vector(s.velocity_error)},{"accelerationBound",vector(s.acceleration_bound)},{"contractionBound",finite_double_token(s.contraction_bound)},{"solutionSpeedUpper",finite_double_token(s.solution_speed_upper)},{"selfAccounting",s.self_accounting},{"geometry",geometry}});
        for(auto& d:s.diagnostics)diagnostics.push_back(Object{{"pathId",d.path_id},{"reception",Array{d.reception_lower,d.reception_upper}},{"netInteraction",vector(d.net_interaction)},{"tangentInteraction",vector(d.tangent_interaction)},{"discardedNormal",vector(d.discarded_normal)},{"curvature",vector(d.curvature)},{"support",vector(d.support)},{"totalAcceleration",vector(d.total_acceleration)}});
        for(auto& root:s.partner_roots)roots.push_back(Object{{"receiverPathId",s.path_id},{"transmitterPathId",root.transmitter_path_id},{"sourceHistoryFingerprint",root.transmitter_history_fingerprint},{"reception",Array{finite_double_token(root.reception.lower()),finite_double_token(root.reception.upper())}},{"emission",Array{finite_double_token(root.emission.lower()),finite_double_token(root.emission.upper())}},{"factor",Array{finite_double_token(root.transmitter_factor.lower()),finite_double_token(root.transmitter_factor.upper())}},{"analyticSourceAcceleration",root.analytic_source_acceleration}});}
    }
    for(const auto& d:c.exploratory_surface_diagnostics)diagnostics.push_back(Object{{"pathId",d.path_id},{"reception",Array{d.reception_lower,d.reception_upper}},{"netInteraction",vector(d.net_interaction)},{"tangentInteraction",vector(d.tangent_interaction)},{"discardedNormal",vector(d.discarded_normal)},{"curvature",vector(d.curvature)},{"support",vector(d.support)},{"totalAcceleration",vector(d.total_acceleration)}});
    Object halt{{"code",c.halt_code},{"boundaryMeaning","attempted slab is possible boundary/uncertainty coverage; no exact contact is claimed"}};
    if(!c.steps.empty() && c.steps.back().status=="rejected")halt["possibleBoundaryInterval"]=Array{c.steps.back().attempted_start,c.steps.back().attempted_end};
    Object response{{"schema","eom_evolution_response/v2"},{"errorBoundChecking",r.error_bound_checking},{"contractId","eom_evolution_contract/v2"},{"runId",c.run_id},{"status",c.status},{"modelDigest",model.digest},{"resolvedModel",parse(model.canonical_json)},
      {"acceptedCoverage",Object{{"start",c.start_time},{"end",c.accepted_end_time}}},{"acceptedStepCount",c.accepted_step_count},{"rejectedStepCount",c.rejected_step_count},{"publishedExtensions",extensions(c.histories,c.start_time)},
      {"ledgers",Object{{"steps",steps},{"partnerRoots",roots},{"pointRoots",point_roots},{logarithmic_equation_selected(r)?"ordinarySolutions":"surfaceSolutions",solutions}}},{"surfaceDiagnostics",diagnostics},{"evidence",Object{{"method","numerical"},{"constraint",r.surface_geometry?"artificial-surface":"none"},{"numericalAcceptance",r.error_bound_checking=="none"?"display-only":c.evidence_status},{"errorBoundChecking",r.error_bound_checking},{"scientificAcceptance",false}}},
      {"halt",halt},{"checkpoint",Object{{"schema","eom_provider_checkpoint/v8"},{"digest",checkpoint.empty()?"":string(object(parse(checkpoint)).at("digest"))},{"durable",durable},{"acceptedTime",c.accepted_end_time},{"storageFailure",storage_failure},{"data",checkpoint.empty()?j::value(nullptr):parse(checkpoint)}}}};
    if(v3) {
      // v3: every v2 field keeps its meaning; the execution, the validated
      // run and the v9 checkpoint are added.
      const auto execution=validated_execution(r);
      response["schema"]="eom_evolution_response/v3";response["contractId"]="eom_evolution_contract/v3";
      response["execution"]=execution;response["executionDigest"]=equation_identity_sha256(canonical(execution));
      response["evidence"].as_object()["integrationMethod"]=r.integration_method;
      response["checkpoint"].as_object()["schema"]="eom_provider_checkpoint/v9";
      Object validated{{"recordStatus",c.validated_continuation?c.validated_continuation->record_status():std::string("none")},
                       {"workerCount",restored?restored->worker_count:r.thread_count}};
      if(restored){Array fields;for(const auto& f:restored->compared_fields)fields.push_back(j::value(f));
        validated["identityBasis"]=restored->identity_basis;validated["recordIdentity"]=restored->record_identity;validated["comparedFields"]=fields;
        validated["replayedLegs"]=restored->replayed_legs;validated["replayedSteps"]=restored->replayed_steps;validated["replayedRejectedSteps"]=restored->replayed_rejected_steps;
        validated["replayStepBound"]=restored->replay_step_bound;validated["replayBoundBytes"]=restored->replay_bound_bytes;}
      Array attempts, ledger;
      if(c.validated_run){
        for(const auto& a:c.validated_run->attempts)attempts.push_back(Array{a.step_index,a.attempt_index,a.producer.step,a.producer.code,a.disposition});
        for(const auto& l:c.validated_run->ledger){Array position,velocity;for(std::size_t axis=0;axis<3;++axis){position.push_back(j::value(finite_double_token(l.position.total[axis])));velocity.push_back(j::value(finite_double_token(l.velocity.total[axis])));}
          ledger.push_back(Object{{"pathId",l.path_id},{"positionTotal",position},{"velocityTotal",velocity}});}
      }
      validated["attemptCount"]=attempts.size();validated["attempts"]=attempts;validated["ledgerTotals"]=ledger;
      response["validated"]=validated;
      response["resources"]=v3_resources(r,c.memory_estimate_bytes,c.memory_budget_bytes);
    }
    deliver(c.accepted_step_count,c.accepted_end_time,c.histories,true);
    return canonical(response);
  } catch(const EquationAdmissionError& error){return canonical(Object{{"schema","eom_error/v2"},{"status","rejected"},{"code",error.code()},{"error",error.what()}});}
    catch(const std::exception& error){return canonical(Object{{"schema","eom_error/v2"},{"status","rejected"},{"code","invalid_request"},{"error",error.what()}});}
}
int run_eom_v2_cli(int argc,char** argv) {
  std::string file;bool stream_paths=false;
  for(int i=2;i<argc;++i){const std::string option=argv[i];if(option=="--checkpoint-file" && i+1<argc)file=argv[++i];else if(option=="--stream-paths")stream_paths=true;else throw std::invalid_argument("v2 usage: eom-v2|eom-v2-server [--checkpoint-file PATH] [--stream-paths]");}
  std::signal(SIGUSR1,cancel_signal);const bool server=std::string(argv[1])=="eom-v2-server";
  do {
    cancellation_flag=0;
    std::cerr<<"{\"schema\":\"eom_ready/v2\"}\n"<<std::flush;
    std::string line;char next;
    while(std::cin.get(next)) {
      if(server && next=='\n')break;
      line+=next;
      if(line.size()>32U*1024U*1024U){std::cout<<execute_eom_v2_request(line)<<'\n';return 0;}
    }
    if(line.empty() && !std::cin)break;
    const auto result=execute_eom_v2_request(line,file,[]{return cancellation_flag!=0;},[](std::size_t count,const std::string& time){std::cerr<<"{\"schema\":\"eom_progress/v2\",\"acceptedStepCount\":"<<count<<",\"acceptedTime\":"<<equation_json_quote(time)<<"}\n"<<std::flush;},stream_paths?std::function<void(const std::string&)>([](const std::string& paths){std::cerr<<paths<<'\n'<<std::flush;}):std::function<void(const std::string&)>{});
    std::cout<<result<<'\n'<<std::flush;if(!server)break;
  }while(server && std::cin);return 0;
}
}
