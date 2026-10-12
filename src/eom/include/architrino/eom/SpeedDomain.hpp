#pragma once
#include "architrino/eom/History.hpp"
#include "architrino/eom/EquationPlan.hpp"
namespace architrino::eom {
struct SpeedDomainCertificate {
  bool certified = false;
  std::string failure_code;
  std::string lower_time;
  std::string upper_time;
  std::size_t visited_cells = 0;
};
void admit_speed_selection(const EquationSelection&);
[[nodiscard]] SpeedDomainCertificate certify_speed_domain(
    const RetainedHistory&, const EquationSelection&);
void require_prepared_speed_domain(const RetainedHistory&, const EquationSelection&);
}
