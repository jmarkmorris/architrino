function createCanvasTexture(THREE, canvas) {
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function drawRoundedRect(context, x, y, width, height, radius) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  context.lineTo(x + radius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.closePath();
}

function wrapAnimatorOverlayText(context, text, maxWidth) {
  const words = String(text ?? "").trim().split(/\s+/).filter(Boolean);
  if (!words.length) {
    return [""];
  }
  const lines = [];
  let currentLine = words[0];
  for (let index = 1; index < words.length; index += 1) {
    const candidate = `${currentLine} ${words[index]}`;
    if (context.measureText(candidate).width <= maxWidth) {
      currentLine = candidate;
    } else {
      lines.push(currentLine);
      currentLine = words[index];
    }
  }
  lines.push(currentLine);
  return lines.slice(0, 4);
}

export function createAnimatorRenderAssetsRuntime(options = {}) {
  const THREE = options.THREE;
  const documentLike = options.documentLike ?? globalThis.document;
  if (!THREE) {
    throw new Error("createAnimatorRenderAssetsRuntime requires THREE");
  }

  function createAnimatorLozengeTexture(text, options = {}) {
    const {
      isActive = false,
      fill = "rgba(20, 24, 40, 0.92)",
      fillActive = "rgba(13, 24, 42, 0.96)",
      stroke = "rgba(255, 194, 106, 0.75)",
      strokeActive = "rgba(125, 211, 252, 0.95)",
      textColor = "rgba(255, 216, 148, 0.98)",
      textColorActive = "rgba(214, 243, 255, 0.98)",
    } = options;
    const canvas = documentLike.createElement("canvas");
    canvas.width = 96;
    canvas.height = 64;
    const context = canvas.getContext("2d");
    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = isActive ? fillActive : fill;
      context.strokeStyle = isActive ? strokeActive : stroke;
      context.lineWidth = 4;
      drawRoundedRect(context, 8, 8, canvas.width - 16, canvas.height - 16, 18);
      context.fill();
      context.stroke();
      context.fillStyle = isActive ? textColorActive : textColor;
      context.font = "700 28px sans-serif";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(text, canvas.width / 2, canvas.height / 2 + 1);
    }
    return createCanvasTexture(THREE, canvas);
  }

  function createAnimatorPointLabelTexture(text, isActive = false) {
    const label = String(text ?? "").trim() || "A";
    const canvas = documentLike.createElement("canvas");
    canvas.width = 96;
    canvas.height = 96;
    const context = canvas.getContext("2d");
    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.font = "700 42px sans-serif";
      context.fillStyle = isActive ? "rgba(16, 24, 38, 0.98)" : "rgba(18, 24, 36, 0.96)";
      context.fillText(label, canvas.width / 2, canvas.height / 2 + 1);
    }
    return createCanvasTexture(THREE, canvas);
  }

  function createAnimatorMemberLabelTexture(text, color = "#ffd894") {
    const label = String(text ?? "").trim() || "?";
    const canvas = documentLike.createElement("canvas");
    canvas.width = 220;
    canvas.height = 64;
    const context = canvas.getContext("2d");
    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "rgba(16, 20, 34, 0.88)";
      context.strokeStyle = color;
      context.lineWidth = 3;
      drawRoundedRect(context, 8, 10, canvas.width - 16, canvas.height - 20, 18);
      context.fill();
      context.stroke();
      context.fillStyle = "rgba(244, 247, 255, 0.96)";
      context.font = "600 24px sans-serif";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(label, canvas.width / 2, canvas.height / 2 + 1);
    }
    return createCanvasTexture(THREE, canvas);
  }

  function createAnimatorGraphicOverlayTextTexture(text, radius = 0.42) {
    const canvas = documentLike.createElement("canvas");
    canvas.width = 320;
    canvas.height = 256;
    const context = canvas.getContext("2d");
    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "rgba(244, 248, 255, 0.96)";
      context.font = "600 28px sans-serif";
      context.textAlign = "center";
      context.textBaseline = "middle";
      const padding = 42;
      const lines = wrapAnimatorOverlayText(context, text, canvas.width - padding * 2);
      const lineHeight = 34;
      const startY = canvas.height / 2 - ((lines.length - 1) * lineHeight) / 2;
      lines.forEach((line, index) => {
        context.fillText(line, canvas.width / 2, startY + index * lineHeight);
      });
    }
    const texture = createCanvasTexture(THREE, canvas);
    texture.minFilter = THREE.LinearFilter;
    const normalizedRadius = Math.max(0.18, Number(radius) || 0.42);
    return {
      texture,
      scale: [normalizedRadius * 2.55, normalizedRadius * 2.1, 1],
    };
  }

  function createAnimatorGraphicOverlayTextSprite(text, radius = 0.42) {
    const { texture, scale } = createAnimatorGraphicOverlayTextTexture(text, radius);
    const material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(scale[0], scale[1], scale[2]);
    sprite.renderOrder = 19;
    return sprite;
  }

  function updateAnimatorGraphicOverlayTextSprite(sprite, text, radius = 0.42) {
    if (!sprite?.material) {
      return;
    }
    const previousMap = sprite.material.map ?? null;
    const { texture, scale } = createAnimatorGraphicOverlayTextTexture(text, radius);
    sprite.material.map = texture;
    sprite.material.needsUpdate = true;
    sprite.scale.set(scale[0], scale[1], scale[2]);
    previousMap?.dispose?.();
  }

  function updateAnimatorPointLabelSprite(sprite, text, isActive = false) {
    if (!sprite) {
      return;
    }
    const previousMap = sprite.material?.map ?? null;
    const nextTexture = createAnimatorPointLabelTexture(text, isActive);
    sprite.material.map = nextTexture;
    sprite.material.needsUpdate = true;
    previousMap?.dispose?.();
  }

  function createAnimatorPointLabelSprite(text) {
    const material = new THREE.SpriteMaterial({
      map: createAnimatorPointLabelTexture(text, false),
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(0.16, 0.16, 1);
    sprite.renderOrder = 13;
    return sprite;
  }

  function createAnimatorCameraWaypointLabelTexture(text, isActive = false) {
    const canvas = documentLike.createElement("canvas");
    canvas.width = 96;
    canvas.height = 96;
    const context = canvas.getContext("2d");
    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      const stroke = isActive ? "rgba(10, 16, 24, 0.98)" : "rgba(8, 14, 22, 0.96)";
      const fill = isActive ? "rgba(10, 16, 24, 0.94)" : "rgba(8, 14, 22, 0.9)";
      context.fillStyle = fill;
      context.strokeStyle = stroke;
      context.lineWidth = 5;
      context.lineJoin = "round";
      context.lineCap = "round";

      context.beginPath();
      context.roundRect(24, 34, 34, 24, 8);
      context.fill();

      context.beginPath();
      context.moveTo(58, 40);
      context.lineTo(72, 32);
      context.lineTo(72, 60);
      context.lineTo(58, 52);
      context.closePath();
      context.fill();

      context.beginPath();
      context.arc(35, 30, 6, 0, Math.PI * 2);
      context.arc(48, 30, 6, 0, Math.PI * 2);
      context.fill();

      context.beginPath();
      context.arc(41, 46, 6.5, 0, Math.PI * 2);
      context.stroke();
    }
    return createCanvasTexture(THREE, canvas);
  }

  function updateAnimatorCameraWaypointLabelSprite(sprite, text, isActive = false) {
    if (!sprite) {
      return;
    }
    const previousMap = sprite.material?.map ?? null;
    const nextTexture = createAnimatorCameraWaypointLabelTexture(text, isActive);
    sprite.material.map = nextTexture;
    sprite.material.needsUpdate = true;
    previousMap?.dispose?.();
  }

  function createAnimatorCameraWaypointLabelSprite(text) {
    const material = new THREE.SpriteMaterial({
      map: createAnimatorCameraWaypointLabelTexture(text, false),
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(0.18, 0.18, 1);
    sprite.renderOrder = 13;
    return sprite;
  }

  function createAnimatorMemberLabelSprite(text, color = "#ffd894") {
    const material = new THREE.SpriteMaterial({
      map: createAnimatorMemberLabelTexture(text, color),
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(0.56, 0.16, 1);
    return sprite;
  }

  function createAnimatorAssemblyBadgeTexture(title, subtitle = "") {
    const canvas = documentLike.createElement("canvas");
    canvas.width = 176;
    canvas.height = 88;
    const context = canvas.getContext("2d");
    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "rgba(18, 24, 42, 0.94)";
      context.strokeStyle = "rgba(143, 220, 255, 0.7)";
      context.lineWidth = 3;
      drawRoundedRect(context, 8, 8, canvas.width - 16, canvas.height - 16, 18);
      context.fill();
      context.stroke();
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillStyle = "rgba(239, 248, 255, 0.98)";
      context.font = "700 24px sans-serif";
      context.fillText(title, canvas.width / 2, subtitle ? 34 : canvas.height / 2);
      if (subtitle) {
        context.fillStyle = "rgba(183, 230, 255, 0.92)";
        context.font = "600 18px sans-serif";
        context.fillText(subtitle, canvas.width / 2, 59);
      }
    }
    return createCanvasTexture(THREE, canvas);
  }

  function createAnimatorAssemblyBadgeSprite(title, subtitle = "") {
    const material = new THREE.SpriteMaterial({
      map: createAnimatorAssemblyBadgeTexture(title, subtitle),
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(0.78, 0.39, 1);
    return sprite;
  }

  function createAnimatorChildBadgeSprite(title, subtitle = "") {
    const sprite = createAnimatorAssemblyBadgeSprite(title, subtitle);
    sprite.scale.set(0.52, 0.26, 1);
    return sprite;
  }

  return {
    createAnimatorLozengeTexture,
    createAnimatorPointLabelTexture,
    createAnimatorMemberLabelTexture,
    createAnimatorGraphicOverlayTextTexture,
    createAnimatorGraphicOverlayTextSprite,
    updateAnimatorGraphicOverlayTextSprite,
    updateAnimatorPointLabelSprite,
    createAnimatorPointLabelSprite,
    createAnimatorCameraWaypointLabelTexture,
    updateAnimatorCameraWaypointLabelSprite,
    createAnimatorCameraWaypointLabelSprite,
    createAnimatorMemberLabelSprite,
    createAnimatorAssemblyBadgeTexture,
    createAnimatorAssemblyBadgeSprite,
    createAnimatorChildBadgeSprite,
  };
}
