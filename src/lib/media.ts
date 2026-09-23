'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

export type MediaState = {
  stream: MediaStream | null;
  error: string | null;
  cameraOn: boolean;
  micOn: boolean;
  level: number;
  cameras: MediaDeviceInfo[];
  mics: MediaDeviceInfo[];
  cameraId: string;
  micId: string;
};

/**
 * Local camera + microphone for the pre-call check and the consult room: live preview,
 * on/off toggles that really stop the tracks' output, device switching and a mic level.
 */
export function useLocalMedia(autoStart = true) {
  const [state, setState] = useState<MediaState>({ stream: null, error: null, cameraOn: true, micOn: true, level: 0, cameras: [], mics: [], cameraId: '', micId: '' });
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);
  const audioRef = useRef<AudioContext | null>(null);

  const stop = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    void audioRef.current?.close().catch(() => {});
    audioRef.current = null;
  }, []);

  const start = useCallback(async (cameraId?: string, micId?: string) => {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      setState((s) => ({ ...s, error: 'This browser can’t access a camera. Try Chrome or Safari on a phone or laptop.' }));
      return;
    }
    stop();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: cameraId ? { deviceId: { exact: cameraId } } : { facingMode: 'user', width: { ideal: 1280 } },
        audio: micId ? { deviceId: { exact: micId } } : true,
      });
      streamRef.current = stream;
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoTrack = stream.getVideoTracks()[0];
      const audioTrack = stream.getAudioTracks()[0];

      // Mic level meter.
      try {
        const ctx = new AudioContext();
        audioRef.current = ctx;
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 256;
        ctx.createMediaStreamSource(stream).connect(analyser);
        const data = new Uint8Array(analyser.frequencyBinCount);
        const tick = () => {
          analyser.getByteFrequencyData(data);
          const avg = data.reduce((n, v) => n + v, 0) / data.length;
          setState((s) => (Math.abs(s.level - avg / 128) > 0.02 ? { ...s, level: Math.min(1, avg / 128) } : s));
          rafRef.current = requestAnimationFrame(tick);
        };
        tick();
      } catch {
        // Level meter is optional.
      }

      setState((s) => ({
        ...s,
        stream,
        error: null,
        cameras: devices.filter((d) => d.kind === 'videoinput'),
        mics: devices.filter((d) => d.kind === 'audioinput'),
        cameraId: videoTrack?.getSettings().deviceId ?? '',
        micId: audioTrack?.getSettings().deviceId ?? '',
        cameraOn: true,
        micOn: true,
      }));
    } catch (e) {
      const name = (e as DOMException)?.name;
      setState((s) => ({
        ...s,
        stream: null,
        error:
          name === 'NotAllowedError' ? 'Camera and microphone are blocked. Allow access in your browser’s address bar, then try again.'
          : name === 'NotFoundError' ? 'No camera or microphone was found on this device.'
          : name === 'NotReadableError' ? 'Your camera is being used by another app. Close it and try again.'
          : 'We couldn’t start your camera. Please try again.',
      }));
    }
  }, [stop]);

  useEffect(() => {
    if (autoStart) void start();
    return stop;
  }, [autoStart, start, stop]);

  const toggleCamera = () => {
    const track = streamRef.current?.getVideoTracks()[0];
    if (!track) return;
    track.enabled = !track.enabled;
    setState((s) => ({ ...s, cameraOn: track.enabled }));
  };
  const toggleMic = () => {
    const track = streamRef.current?.getAudioTracks()[0];
    if (!track) return;
    track.enabled = !track.enabled;
    setState((s) => ({ ...s, micOn: track.enabled }));
  };

  return { ...state, start, stop, toggleCamera, toggleMic };
}

/** Short two-tone chime to check the speakers. */
export function playTestSound() {
  try {
    const ctx = new AudioContext();
    [660, 880].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, ctx.currentTime + i * 0.25);
      gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + i * 0.25 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.25 + 0.22);
      osc.connect(gain).connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.25);
      osc.stop(ctx.currentTime + i * 0.25 + 0.25);
    });
    setTimeout(() => void ctx.close(), 800);
  } catch {
    // No audio output available.
  }
}
