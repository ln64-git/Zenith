"use client";
import React, { useEffect, useRef, useState } from "react";
import * as blazeface from "@tensorflow-models/blazeface";
import "@tensorflow/tfjs";
import { drawRectangle } from "@/utils/draw";

const Camera = ({ onMovement }: { onMovement: (movement: number) => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [model, setModel] = useState<blazeface.BlazeFaceModel | null>(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await blazeface.load();
        setModel(loadedModel);
      } catch (error) {
        console.error("Error loading BlazeFace model", error);
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
        const predictions = await model.estimateFaces(videoRef.current, false);
        console.log("Predictions: ", predictions);

        if (predictions.length > 0 && canvasRef.current) {
          const ctx = canvasRef.current.getContext("2d");
          if (ctx) {
            const videoWidth = videoRef.current.videoWidth;
            const videoHeight = videoRef.current.videoHeight;
            ctx.clearRect(0, 0, videoWidth, videoHeight);
            drawRectangle(ctx, predictions[0], videoWidth, videoHeight);
          }
        }

        // Track head movement
        if (predictions.length > 0) {
          const landmarks = predictions[0].landmarks;
          if (Array.isArray(landmarks)) {
            const nose = landmarks[2] as number[];
            onMovement(nose[0]); // Call the onMovement callback with the nose x position
          } else if (landmarks instanceof Float32Array) {
            const nose = [landmarks[6], landmarks[7]]; // Adjusted for the correct index
            onMovement(nose[0]);
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
