"use client"
import useCamera from "@/components/useCamera";

export default function Home() {
  const videoRef = useCamera();

  return (
    <main className="w-full h-screen">
      <video
        ref={videoRef}
        autoPlay
        className="w-full h-full"
      ></video>
    </main>
  );
}
