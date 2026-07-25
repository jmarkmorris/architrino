export function clearBorgSceneGroup(group) {
  group.children.slice().forEach((object) => {
    group.remove(object);
    const sharedArrowGeometry = object.type === "ArrowHelper";
    object.traverse?.((child) => {
      if (!sharedArrowGeometry) {
        child.geometry?.dispose?.();
      }
      if (Array.isArray(child.material)) {
        child.material.forEach((material) => material.dispose?.());
      } else {
        child.material?.dispose?.();
      }
    });
  });
}
