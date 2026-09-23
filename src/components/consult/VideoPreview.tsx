'use client';
import { useEffect, useRef } from 'react';

/** Renders a MediaStream mirrored, like a front camera. */
export default function VideoPreview({ stream, off, className = '' }: { stream: MediaStream | null; off?: boolean; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.srcObject = stream;
  }, [stream]);
  return <video ref={ref} autoPlay playsInline muted className={`w-full h-full object-cover -scale-x-100 ${off ? 'invisible' : ''} ${className}`} />;
}
