function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
function colorToCss(color, alpha = color?.a ?? 1) {
  if (typeof color === "string") {
    return color;
  }
  return `rgba(${color?.r ?? 255}, ${color?.g ?? 255}, ${color?.b ?? 255}, ${clamp(alpha, 0, 1)})`;
}

export function createWakeDisplayGeometry(root, receiverTime = root?.receiverTime) {
  if (!root?.emission || !root?.reception) {
    return null;
  }
  const age = Math.max(0, Number(receiverTime) - Number(root.emissionTime));
  const canvasSignalSpeed = Number(root.signalSpeed) / Number(root.distanceScale);
  return {
    id: `wake:${root.id}`,
    rootId: root.id,
    sourceId: root.sourceId,
    receiverId: root.receiverId,
    origin: root.emission,
    reception: root.reception,
    emissionTime: root.emissionTime,
    receiverTime: root.receiverTime,
    radius: canvasSignalSpeed * age,
    accepted: root.accepted,
    reason: root.reason,
  };
}

export function drawDottedWakeArc(ctx, {
  center,
  radius,
  startDegrees = 0,
  endDegrees = 360,
  color,
  dotRadius = 1.5,
  worldToScreen = (point) => point,
}) {
  if (!ctx || !center || !Number.isFinite(radius) || radius <= 0) {
    return;
  }
  const span = Math.abs(endDegrees - startDegrees);
  const count = Math.max(16, Math.min(240, Math.round((span / 360) * radius * 1.2)));
  ctx.save();
  ctx.fillStyle = colorToCss(color);
  for (let index = 0; index <= count; index += 1) {
    const amount = index / Math.max(1, count);
    const angle = ((startDegrees + (endDegrees - startDegrees) * amount) * Math.PI) / 180;
    const point = worldToScreen({
      x: center.x + radius * Math.cos(angle),
      y: center.y + radius * Math.sin(angle),
    });
    ctx.beginPath();
    ctx.arc(point.x, point.y, Math.max(1, dotRadius), 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

export function drawWakeDisplayGeometry(ctx, geometry, {
  worldToScreen = (point) => point,
  color = "rgba(246,247,255,0.82)",
  lineColor = "rgba(246,247,255,0.7)",
  dotRadius = 1.5,
  showWake = true,
  showCausalLine = true,
} = {}) {
  if (!ctx || !geometry) {
    return;
  }
  if (showWake) {
    drawDottedWakeArc(ctx, {
      center: geometry.origin,
      radius: geometry.radius,
      color,
      dotRadius,
      worldToScreen,
    });
  }
  if (showCausalLine) {
    const source = worldToScreen(geometry.origin);
    const receiver = worldToScreen(geometry.reception);
    ctx.save();
    ctx.strokeStyle = colorToCss(lineColor);
    ctx.lineWidth = 1.6;
    ctx.setLineDash([6, 5]);
    ctx.beginPath();
    ctx.moveTo(source.x, source.y);
    ctx.lineTo(receiver.x, receiver.y);
    ctx.stroke();
    ctx.restore();
  }
}
