import { Coords3D } from "@tensorflow-models/facemesh/dist/util";

export const drawMesh = (
  ctx: CanvasRenderingContext2D,
  keypoints: Coords3D
) => {
  ctx.beginPath();
  ctx.strokeStyle = "yellow";
  ctx.lineWidth = 0.5;

  for (let i = 0; i < keypoints.length; i++) {
    const x = keypoints[i][0];
    const y = keypoints[i][1];

    ctx.moveTo(x, y);
    ctx.arc(x, y, 1 /* radius */, 0, 2 * Math.PI);
  }

  ctx.stroke();
};
