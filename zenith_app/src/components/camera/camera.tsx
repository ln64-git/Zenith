"use client";
import React, { useEffect, useRef, useState } from "react";
import * as facemesh from "@tensorflow-models/facemesh";
import "@tensorflow/tfjs";
import { drawMesh } from "@/lib/draw-facemesh";
import { useStore } from "@/lib/user-store";

const Camera = ({ onMovement }: { onMovement: (movement: number) => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [model, setModel] = useState<facemesh.FaceMesh | null>(null);
  const color = useStore().userColor;
  const previousNosePosition = useRef<[number, number] | null>(null); // To store the previous nose position
  const movementCount = useRef(0); // To store the movement count

  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await facemesh.load();
        setModel(loadedModel);
      } catch (error) {}
    };
    loadModel();

    const getCameraStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            if (canvasRef.current && videoRef.current) {
              const videoWidth = videoRef.current.videoWidth;
              const videoHeight = videoRef.current.videoHeight;
              canvasRef.current.width = videoWidth;
              canvasRef.current.height = videoHeight;
              canvasRef.current.style.width = `${videoWidth}px`;
              canvasRef.current.style.height = `${videoHeight}px`;
            }
          };
        }
      } catch (err) {}
    };
    getCameraStream();

    const handleResize = () => {
      if (videoRef.current && canvasRef.current) {
        const videoWidth = videoRef.current.videoWidth;
        const videoHeight = videoRef.current.videoHeight;
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;
        canvasRef.current.style.width = `${videoWidth}px`;
        canvasRef.current.style.height = `${videoHeight}px`;
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const detectFace = async () => {
      if (videoRef.current && model) {
        const predictions = (await model.estimateFaces(
          videoRef.current
        )) as facemesh.AnnotatedPrediction[];

        if (predictions.length > 0 && canvasRef.current) {
          const ctx = canvasRef.current.getContext("2d");
          if (ctx) {
            const videoWidth = videoRef.current.videoWidth;
            const videoHeight = videoRef.current.videoHeight;
            ctx.clearRect(0, 0, videoWidth, videoHeight);

            const scaledMesh = predictions[0].scaledMesh;
            if (Array.isArray(scaledMesh)) {
              drawMesh(ctx, scaledMesh, color);
            }
          }
        }

        // Track head movement
        if (predictions.length > 0) {
          const scaledMesh = predictions[0].scaledMesh;
          if (Array.isArray(scaledMesh)) {
            const nose = scaledMesh[168]; // The 168th point is usually the tip of the nose
            const [noseX, noseY] = nose;

            if (previousNosePosition.current) {
              const [prevNoseX, prevNoseY] = previousNosePosition.current;
              const distance = Math.sqrt(
                Math.pow(noseX - prevNoseX, 2) + Math.pow(noseY - prevNoseY, 2)
              );

              // Set a threshold for significant movement
              const movementThreshold = 5; // Adjust this value as needed
              if (distance > movementThreshold) {
                movementCount.current += 1;
                onMovement(movementCount.current); // Call the onMovement callback with the updated count
              }
            }

            previousNosePosition.current = [noseX, noseY];
          }
        }
      }
    };

    const interval = setInterval(detectFace, 100); // Detect every 100ms

    return () => clearInterval(interval);
  }, [model, onMovement]);

  return (
    <div className="relative flex justify-center items-center">
      <video
        ref={videoRef}
        className="max-w-full max-h-full m-1 rounded-lg"
        autoPlay
        muted
      />
      <canvas ref={canvasRef} className="absolute top-0 left-0" />
    </div>
  );
};

export default Camera;
