class FakeItem:
    def __init__(self, name, *, item_type="particle", particle=True):
        self.name = name
        self.item_type = item_type
        self.particle = particle


class FakeDecayProduct:
    def __init__(self, name, *, multiplier=1, subdecay=None, particle=True, item_type="particle"):
        self.multiplier = multiplier
        self.subdecay = subdecay
        self.item = FakeItem(name, item_type=item_type, particle=particle)


class FakeDecay:
    def __init__(self, pdgid, description, products, *, mode_number=1, display_value_text=""):
        self.pdgid = pdgid
        self.description = description
        self.decay_products = products
        self.mode_number = mode_number
        self.display_value_text = display_value_text


class FakeParticle:
    def __init__(self, name, decays, *, mcid=None):
        self.name = name
        self._decays = list(decays)
        self.mcid = mcid

    def exclusive_branching_fractions(self, *args, **kwargs):
        return list(self._decays)


class FakeApi:
    def __init__(self, particles, *, edition="2025"):
        self._particles = {particle.name: particle for particle in particles}
        self._particle_lists = [[particle] for particle in particles]
        self.edition = edition

    def get_particle_by_name(self, name):
        return self._particles[name]

    def get_particles(self):
        return list(self._particle_lists)

    def get_canonical_name(self, name):
        aliases = {
            "nubar_e": "anti-nu_e",
            "nubar_mu": "anti-nu_mu",
            "nubar_tau": "anti-nu_tau",
        }
        return aliases.get(name, name)

    def info(self, _key):
        return "PDG Python API database read"
