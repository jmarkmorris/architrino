export const PUBCHEM_BASE_URL = "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound";
export const PUBCHEM_EXPLICIT_FORM_SUBMIT = "explicit-form-submit";

export function shouldQueryPubChem(activation) {
  return activation === PUBCHEM_EXPLICIT_FORM_SUBMIT;
}
