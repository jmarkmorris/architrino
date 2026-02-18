export class PeriodicTableService {
  constructor() {
    this.data = null;
    this.ready = false;
  }

  async ensure(fetchImpl, path) {
    if (this.ready) {
      return this.data;
    }
    try {
      const response = await fetchImpl(path);
      if (!response.ok) {
        throw new Error("Failed to load periodic table");
      }
      this.data = await response.json();
      this.ready = true;
    } catch (error) {
      console.error(error);
      this.data = null;
      this.ready = false;
    }
    return this.data;
  }

  findBySymbol(symbol) {
    if (!symbol || !Array.isArray(this.data?.elements)) {
      return null;
    }
    const upper = String(symbol).toUpperCase();
    return this.data.elements.find((el) => el.symbol.toUpperCase() === upper) ?? null;
  }
}
