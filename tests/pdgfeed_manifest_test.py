from pathlib import Path
import sys
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import pdgfeed


class FakeItem:
    def __init__(self, name, *, has_particle=True):
        self.name = name
        self.particle = object() if has_particle else None


class FakeDecayProduct:
    def __init__(self, name, *, multiplier=1, has_particle=True):
        self.multiplier = multiplier
        self.item = FakeItem(name, has_particle=has_particle)


class FakeDecay:
    def __init__(self, pdgid, description, products, *, mode_number=0, display_value_text=""):
        self.pdgid = pdgid
        self.description = description
        self.decay_products = products
        self.mode_number = mode_number
        self.display_value_text = display_value_text


class FakeParticle:
    def __init__(self, name, pdgid, decays):
        self.name = name
        self.pdgid = pdgid
        self._decays = list(decays)

    def exclusive_branching_fractions(self, **_kwargs):
        return list(self._decays)


class FakeParticleList(list):
    def __init__(self, pdgid, description, particles):
        super().__init__(particles)
        self.pdgid = pdgid
        self.description = description


class FakeApi:
    def __init__(self, groups):
        self._groups = groups
        self.edition = "2025"

    def get_particles(self):
        return list(self._groups)

    def get_canonical_name(self, name):
        aliases = {"nubar_e": "anti-nu_e"}
        return aliases.get(name, name)

    def info(self, _key):
        return "PDG Python API live read"


class BuildLiveManifestPayloadTests(unittest.TestCase):
    def test_manifest_assigns_incrementing_batch_ids_to_exportable_discoveries(self):
        neutron_particle = FakeParticle(
            "n",
            "S017/2025",
            [
                FakeDecay(
                    "S017.1/2025",
                    "n --> p e- nubar_e",
                    [
                        FakeDecayProduct("p"),
                        FakeDecayProduct("e-"),
                        FakeDecayProduct("nubar_e"),
                    ],
                    mode_number=1,
                    display_value_text="(100)",
                )
            ],
        )
        pion_particle = FakeParticle(
            "pi+",
            "S008/2025",
            [
                FakeDecay(
                    "S008.1/2025",
                    "pi+ -> mu+ nu_mu",
                    [
                        FakeDecayProduct("mu+"),
                        FakeDecayProduct("nu_mu"),
                    ],
                    mode_number=1,
                    display_value_text="(99.9)",
                )
            ],
        )
        api = FakeApi(
            [
                FakeParticleList("S017/2025", "neutron", [neutron_particle]),
                FakeParticleList("S008/2025", "charged pion", [pion_particle]),
            ]
        )

        manifest = pdgfeed.build_live_manifest_payload(api=api)

        self.assertEqual(manifest["schema"], "pdg-live-manifest/v1")
        self.assertEqual(manifest["edition"], "2025")
        self.assertEqual(manifest["exportableCount"], 1)
        self.assertEqual(manifest["unsupportedDiscoveryCount"], 1)
        self.assertEqual(len(manifest["entries"]), 1)
        self.assertEqual(manifest["entries"][0]["batchId"], 1)
        self.assertEqual(manifest["entries"][0]["pdgIdentifier"], "S017.1/2025")
        self.assertEqual(manifest["entries"][0]["lookupParticleName"], "n")
        self.assertEqual(manifest["entries"][0]["solverRequest"]["schema"], "solver-request/v1")
        self.assertEqual(manifest["topUnsupportedParticles"], [{"particle": "pi+", "count": 1}])

    def test_extract_unsupported_particle_names_ignores_non_particle_text_tokens(self):
        notes = [
            "unsupported:product:pi+:no-v1-mapping",
            "unsupported:product:-->:generic-or-textual-item",
            "unsupported:product:gamma ray:generic-or-textual-item",
        ]

        self.assertEqual(pdgfeed.extract_unsupported_particle_names(notes), ["pi+"])


if __name__ == "__main__":
    unittest.main()
