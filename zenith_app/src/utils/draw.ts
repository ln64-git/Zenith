// utils/draw.ts
export const drawRectangle = (
  ctx: CanvasRenderingContext2D,
  prediction: any
) => {
  const start = prediction.topLeft as [number, number];
  const end = prediction.bottomRight as [number, number];
  const size = [end[0] - start[0], end[1] - start[1]];
  ctx.beginPath();
  ctx.strokeStyle = "red";
  ctx.lineWidth = 2;
  ctx.rect(start[0], start[1], size[0], size[1]);
  ctx.stroke();
};
