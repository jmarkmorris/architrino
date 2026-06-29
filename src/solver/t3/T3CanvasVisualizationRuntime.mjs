export function createT3CanvasRenderer(input = {}) {
  if (!input.canvas) {
    throw new TypeError("createT3CanvasRenderer requires a canvas");
  }
  const canvas = input.canvas;
  const context = input.context ?? canvas.getContext("2d");
  if (!context) {
    throw new TypeError("canvas 2d context is unavailable");
  }
  const options = {
    projection: input.projection ?? "xy",
    particleRadius: input.particleRadius ?? 2,
    velocityScale: input.velocityScale ?? 0.15,
    showVelocityVectors: input.showVelocityVectors ?? true,
    showDensityMap: input.showDensityMap ?? true,
    showTrails: input.showTrails ?? true,
    showStatistics: input.showStatistics ?? true,
    background: input.background ?? "#080a0d",
    densityColor: input.densityColor ?? "rgba(80, 170, 255, 0.18)",
    trailColor: input.trailColor ?? "rgba(255, 255, 255, 0.18)",
    particleColor: input.particleColor ?? "#f4f7ff",
    velocityColor: input.velocityColor ?? "#80ffaa",
    textColor: input.textColor ?? "#d7e2f0",
  };

  return {
    render(frame) {
      renderT3CanvasFrame(context, canvas, frame, options);
    },
    resizeToDisplaySize(devicePixelRatio = globalThis.devicePixelRatio ?? 1) {
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width * devicePixelRatio));
      const height = Math.max(1, Math.floor(rect.height * devicePixelRatio));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      return { width, height, devicePixelRatio };
    },
  };
}

export function renderT3CanvasFrame(context, canvas, frame, options = {}) {
  const renderOptions = {
    projection: options.projection ?? "xy",
    particleRadius: options.particleRadius ?? 2,
    velocityScale: options.velocityScale ?? 0.15,
    showVelocityVectors: options.showVelocityVectors ?? true,
    showDensityMap: options.showDensityMap ?? true,
    showTrails: options.showTrails ?? true,
    showStatistics: options.showStatistics ?? true,
    background: options.background ?? "#080a0d",
    densityColor: options.densityColor ?? "rgba(80, 170, 255, 0.18)",
    trailColor: options.trailColor ?? "rgba(255, 255, 255, 0.18)",
    particleColor: options.particleColor ?? "#f4f7ff",
    velocityColor: options.velocityColor ?? "#80ffaa",
    textColor: options.textColor ?? "#d7e2f0",
  };
  const width = canvas.width;
  const height = canvas.height;
  const sideLength = frame.sideLength;
  context.save();
  context.fillStyle = renderOptions.background;
  context.fillRect(0, 0, width, height);
  if (renderOptions.showDensityMap && frame.densityMap) {
    renderDensityMap(context, width, height, frame.densityMap, renderOptions);
  }
  if (renderOptions.showTrails && frame.trails?.samples?.length) {
    renderTrails(context, width, height, sideLength, frame.trails, renderOptions);
  }
  renderParticles(context, width, height, sideLength, frame, renderOptions);
  if (renderOptions.showStatistics) {
    renderStatistics(context, frame, renderOptions);
  }
  context.restore();
}

function renderDensityMap(context, width, height, densityMap, options) {
  const resolution = densityMap.resolution;
  const cellWidth = width / resolution;
  const cellHeight = height / resolution;
  const maxCount = Math.max(1, ...densityMap.counts);
  context.fillStyle = options.densityColor;
  for (let y = 0; y < resolution; y += 1) {
    for (let x = 0; x < resolution; x += 1) {
      let projectedCount = 0;
      for (let z = 0; z < resolution; z += 1) {
        projectedCount += densityMap.counts[x + resolution * (y + resolution * z)];
      }
      if (projectedCount === 0) {
        continue;
      }
      context.globalAlpha = Math.min(0.75, projectedCount / maxCount);
      context.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
    }
  }
  context.globalAlpha = 1;
}

function renderTrails(context, width, height, sideLength, trails, options) {
  context.fillStyle = options.trailColor;
  for (const sample of trails.samples) {
    for (let offset = 0; offset < sample.positions.length; offset += 3) {
      const point = projectPoint(sample.positions, offset, sideLength, width, height, options.projection);
      context.fillRect(point.x - 0.5, point.y - 0.5, 1, 1);
    }
  }
}

function renderParticles(context, width, height, sideLength, frame, options) {
  const positions = frame.positions ?? [];
  const velocities = frame.velocities ?? [];
  for (let offset = 0; offset < positions.length; offset += 3) {
    const point = projectPoint(positions, offset, sideLength, width, height, options.projection);
    context.fillStyle = options.particleColor;
    context.beginPath();
    context.arc(point.x, point.y, options.particleRadius, 0, Math.PI * 2);
    context.fill();
    if (options.showVelocityVectors && velocities.length >= offset + 3) {
      const vector = projectVector(velocities, offset, width, height, sideLength, options);
      context.strokeStyle = options.velocityColor;
      context.beginPath();
      context.moveTo(point.x, point.y);
      context.lineTo(point.x + vector.x, point.y + vector.y);
      context.stroke();
    }
  }
}

function renderStatistics(context, frame, options) {
  context.fillStyle = options.textColor;
  context.font = "12px system-ui, sans-serif";
  const speed = frame.statistics?.speed?.mean;
  const energy = frame.statistics?.totalEnergy;
  const parts = [`t=${formatNumber(frame.time)}`, `step=${frame.stepIndex}`, `n=${frame.particleCount}`];
  if (speed != null) {
    parts.push(`mean speed=${formatNumber(speed)}`);
  }
  if (energy != null) {
    parts.push(`energy=${formatNumber(energy)}`);
  }
  context.fillText(parts.join("  "), 12, 20);
}

function projectPoint(values, offset, sideLength, width, height, projection) {
  const axes = projectionAxes(projection);
  return {
    x: (values[offset + axes[0]] / sideLength) * width,
    y: height - (values[offset + axes[1]] / sideLength) * height,
  };
}

function projectVector(values, offset, width, height, sideLength, options) {
  const axes = projectionAxes(options.projection);
  return {
    x: (values[offset + axes[0]] / sideLength) * width * options.velocityScale,
    y: -(values[offset + axes[1]] / sideLength) * height * options.velocityScale,
  };
}

function projectionAxes(projection) {
  if (projection === "xz") {
    return [0, 2];
  }
  if (projection === "yz") {
    return [1, 2];
  }
  return [0, 1];
}

function formatNumber(value) {
  if (!Number.isFinite(Number(value))) {
    return "n/a";
  }
  const numericValue = Number(value);
  if (Math.abs(numericValue) >= 1000 || Math.abs(numericValue) < 0.001) {
    return numericValue.toExponential(2);
  }
  return numericValue.toFixed(3);
}
