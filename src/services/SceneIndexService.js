export class SceneIndexService {
  constructor() {
    this.scenes = [];
    this.ready = false;
  }

  async ensure(fetchImpl, path) {
    if (this.ready) {
      return this.scenes;
    }
    try {
      const response = await fetchImpl(path);
      if (!response.ok) {
        throw new Error("Failed to load scene index");
      }
      const data = await response.json();
      this.scenes = Array.isArray(data.scenes) ? data.scenes : [];
      this.ready = true;
    } catch (error) {
      console.error(error);
      this.scenes = [];
      this.ready = false;
    }
    return this.scenes;
  }

  getScenes() {
    return this.scenes;
  }
}
