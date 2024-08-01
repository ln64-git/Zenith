import { Coords3D } from "@tensorflow-models/facemesh/dist/util";

export const drawMesh = (
  ctx: CanvasRenderingContext2D,
  keypoints: Coords3D,
  color: string,
  alpha: number = 0
) => {
  const rgbaColor = hexToRgba(color, alpha);

  ctx.beginPath();
  ctx.strokeStyle = rgbaColor;
  ctx.lineWidth = 0.5;

  for (let i = 0; i < keypoints.length; i++) {
    const x = keypoints[i][0];
    const y = keypoints[i][1];

    ctx.moveTo(x, y);
    ctx.arc(x, y, 1 /* radius */, 0, 2 * Math.PI);
  }

  ctx.stroke();
};

// Helper function to convert hex color to rgba
const hexToRgba = (hex: string, alpha: number): string => {
  let r = 0,
    g = 0,
    b = 0;

  // 3 digits hex
  if (hex.length == 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  }
  // 6 digits hex
  else if (hex.length == 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
