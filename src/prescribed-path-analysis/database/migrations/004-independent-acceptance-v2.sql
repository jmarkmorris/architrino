DROP VIEW accepted_case;

CREATE VIEW accepted_case AS
SELECT
  campaign_case.manifest_hash,
  campaign_case.case_ordinal,
  campaign_case.case_id,
  campaign_case.case_type,
  campaign_case.configuration_hash,
  campaign_case.source_hash,
  campaign_case.result_hash
FROM campaign_case
JOIN case_result USING (result_hash)
JOIN case_acceptance USING (result_hash)
JOIN campaign_acceptance USING (manifest_hash)
WHERE case_result.completeness_state = 'complete'
  AND case_acceptance.accepted = 1
  AND campaign_acceptance.accepted = 1
  AND case_acceptance.acceptance_instrument_version =
    'prescribed-record-independent-acceptance/v2'
  AND campaign_acceptance.acceptance_instrument_version =
    'prescribed-record-independent-acceptance/v2';

PRAGMA user_version = 4;
