import unittest
from collections import Counter

from scripts.pdg.pdgfeed_registry import (
    PDG_MAPPING_BY_CANONICAL_NAME,
    PDG_PARTICLE_MAPPINGS,
    REQUEST_ASSEMBLY_COUNTS,
    REQUEST_ASSEMBLY_MAPPINGS,
    canonicalize_pdg_name,
    conjugate_canonical_name,
    particle_charge_thirds,
)


class PdgfeedRegistryAuditTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.assembly_name_by_id = {
            mapping.canonical_id: mapping.canonical_name
            for mapping in REQUEST_ASSEMBLY_MAPPINGS
        }

    def constituent_names(self, mapping):
        return [
            self.assembly_name_by_id[occurrence.assembly_id]
            for occurrence in mapping.request_occurrences
        ]

    def primitive_totals(self, mapping):
        electrinos = 0
        positrinos = 0
        for occurrence in mapping.request_occurrences:
            counts = REQUEST_ASSEMBLY_COUNTS[occurrence.assembly_id]
            electrinos += counts["electrinoCount"]
            positrinos += counts["positrinoCount"]
        return electrinos, positrinos

    def test_aliases_canonicalize_without_case_insensitive_collisions(self):
        alias_owners_by_lower = {}
        for mapping in PDG_PARTICLE_MAPPINGS:
            for alias in mapping.aliases:
                self.assertEqual(canonicalize_pdg_name(alias), mapping.canonical_name)
                lowered = alias.lower()
                alias_owners_by_lower.setdefault(lowered, set()).add(mapping.canonical_name)
        collisions = {
            alias: owners
            for alias, owners in alias_owners_by_lower.items()
            if len(owners) > 1
        }
        self.assertEqual(
            collisions,
            {"h": {"H", "h"}},
            msg="Only the exact-case-disambiguated h/H pair should collide case-insensitively.",
        )

    def test_phi_energy_levels_canonicalize_to_phi(self):
        for alias in (
            "phi(1020)",
            "phi(1020)0",
            "phi(1680)",
            "phi(1680)0",
            "phi(2170)+",
            "phi(2170)-",
            "phi(2170)0",
        ):
            with self.subTest(alias=alias):
                self.assertEqual(canonicalize_pdg_name(alias), "phi")

    def test_every_mapping_has_charge_and_conjugate_metadata(self):
        for mapping in PDG_PARTICLE_MAPPINGS:
            with self.subTest(canonical_name=mapping.canonical_name):
                charge = particle_charge_thirds(mapping.canonical_name)
                conjugate = conjugate_canonical_name(mapping.canonical_name)

                self.assertIsNotNone(charge)
                self.assertIsNotNone(conjugate)
                self.assertIn(conjugate, PDG_MAPPING_BY_CANONICAL_NAME)
                self.assertEqual(
                    particle_charge_thirds(conjugate),
                    -charge,
                    msg=f"{mapping.canonical_name} and its conjugate should carry opposite third-charge totals.",
                )
                if mapping.polarity == "self-conjugate":
                    self.assertEqual(conjugate, mapping.canonical_name)
                    self.assertEqual(charge, 0)

    def test_assembly_mappings_are_direct_single_row_transforms(self):
        for mapping in REQUEST_ASSEMBLY_MAPPINGS:
            with self.subTest(canonical_name=mapping.canonical_name):
                self.assertEqual(mapping.particle_type, "assembly")
                self.assertEqual(mapping.request_translation, "direct")
                self.assertEqual(len(mapping.request_occurrences), 1)
                self.assertEqual(mapping.request_occurrences[0].assembly_id, mapping.canonical_id)
                self.assertEqual(
                    REQUEST_ASSEMBLY_COUNTS[mapping.canonical_id],
                    {
                        "electrinoCount": mapping.electrino_count,
                        "positrinoCount": mapping.positrino_count,
                    },
                )

    def test_request_transforms_reference_known_assemblies_and_match_declared_totals(self):
        for mapping in PDG_PARTICLE_MAPPINGS:
            if not mapping.has_request_transform:
                continue
            with self.subTest(canonical_name=mapping.canonical_name):
                for occurrence in mapping.request_occurrences:
                    self.assertIn(
                        occurrence.assembly_id,
                        REQUEST_ASSEMBLY_COUNTS,
                        msg=f"{mapping.canonical_name} references unknown assembly id {occurrence.assembly_id!r}.",
                    )
                electrinos, positrinos = self.primitive_totals(mapping)
                self.assertEqual(electrinos, mapping.electrino_count)
                self.assertEqual(positrinos, mapping.positrino_count)

    def test_request_transforms_preserve_declared_charge(self):
        for mapping in PDG_PARTICLE_MAPPINGS:
            if not mapping.has_request_transform:
                continue
            with self.subTest(canonical_name=mapping.canonical_name):
                expected_charge = particle_charge_thirds(mapping.canonical_name)
                actual_charge = sum(
                    particle_charge_thirds(name)
                    for name in self.constituent_names(mapping)
                )
                self.assertEqual(actual_charge, expected_charge)

    def test_conjugate_transform_rows_match_conjugated_constituent_multisets(self):
        for mapping in PDG_PARTICLE_MAPPINGS:
            if not mapping.has_request_transform:
                continue
            conjugate_name = conjugate_canonical_name(mapping.canonical_name)
            conjugate_mapping = PDG_MAPPING_BY_CANONICAL_NAME.get(conjugate_name or "")
            if conjugate_mapping is None or not conjugate_mapping.has_request_transform:
                continue
            with self.subTest(canonical_name=mapping.canonical_name, conjugate=conjugate_name):
                expected = Counter(
                    conjugate_canonical_name(name)
                    for name in self.constituent_names(mapping)
                )
                actual = Counter(self.constituent_names(conjugate_mapping))
                self.assertEqual(actual, expected)

    def test_request_translation_modes_match_current_registry_contract(self):
        for mapping in PDG_PARTICLE_MAPPINGS:
            with self.subTest(canonical_name=mapping.canonical_name):
                if mapping.particle_type == "assembly":
                    self.assertTrue(mapping.has_request_transform)
                    self.assertEqual(mapping.request_translation, "direct")
                elif mapping.has_request_transform:
                    self.assertEqual(mapping.request_translation, "expanded")
                else:
                    self.assertEqual(mapping.request_translation, "none")


if __name__ == "__main__":
    unittest.main()
