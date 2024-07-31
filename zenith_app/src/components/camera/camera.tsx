"use client";
import React, { useEffect, useRef, useState } from "react";
import * as facemesh from "@tensorflow-models/facemesh";
import "@tensorflow/tfjs";
import { drawMesh } from "@/utils/draw-facemesh";
import { useDisplayStore } from "@/utils/display-store";

const Camera = ({ onMovement }: { onMovement: (movement: number) => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [model, setModel] = useState<facemesh.FaceMesh | null>(null);
  const store = useDisplayStore();
  const color = store.userColor;
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await facemesh.load();
        setModel(loadedModel);
      } catch (error) {
        console.error("Error loading FaceMesh model", error);
      }
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
      } catch (err) {
        console.error("Error accessing camera: ", err);
        setError(
          "Failed to access camera. Please ensure the camera is not being used by another application and that the browser has permission to access it."
        );
      }
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
            onMovement(nose[0]); // Call the onMovement callback with the nose x position
          }
        }
      }
    };

    const interval = setInterval(detectFace, 1); // Detect every 100ms

    return () => clearInterval(interval);
  }, [model, onMovement]);

  return (
    <div className="relative flex justify-center items-center">
      {error && <div className="absolute text-red-500">{error}</div>}
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
