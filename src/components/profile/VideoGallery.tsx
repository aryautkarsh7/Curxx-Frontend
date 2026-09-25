'use client';
import { useState } from 'react';
import type { Video } from '@/lib/api';

/** YouTube thumbnails come free; others use the admin's thumbnail or a plain tile. */
function thumbnail(v: Video) {
  if (v.thumbnailUrl) return v.thumbnailUrl;
  const id = v.provider === 'youtube' ? v.embedUrl.split('/embed/')[1]?.split(/[?&]/)[0] : undefined;
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : '';
}

/** A tile that only loads the player when tapped, so a row of reels doesn't load a dozen iframes. */
function Player({ video }: { video: Video }) {
  const [playing, setPlaying] = useState(false);
  const reel = video.kind === 'reel';
  const thumb = thumbnail(video);
  const src = video.provider === 'youtube' ? `${video.embedUrl}?autoplay=1&rel=0` : video.embedUrl;
  return (
    <figure className={`shrink-0 snap-start ${reel ? 'w-[200px] sm:w-[220px]' : 'w-[300px] sm:w-[380px]'}`}>
      <div className={`relative w-full overflow-hidden rounded-xl bg-[#1C1917] ${reel ? 'aspect-[9/16]' : 'aspect-video'}`}>
        {playing ? (
          video.provider === 'file' ? (
            <video src={video.embedUrl} controls autoPlay playsInline className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <iframe
              src={src}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              className="absolute inset-0 w-full h-full border-0"
            />
          )
        ) : (
          <button type="button" onClick={() => setPlaying(true)} className="absolute inset-0 w-full h-full group" aria-label={`Play: ${video.title}`}>
            {thumb ? <img src={thumb} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition" /> : <span className="absolute inset-0 bg-gradient-to-br from-[#8E0E17] to-[#1C1917]" />}
            <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-[32px] text-[#C1121F]" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
            </span>
            {video.provider === 'instagram' && <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/50 text-white text-[11px] font-semibold">Instagram</span>}
            <span className="absolute bottom-2 left-3 right-3 text-left text-white font-caption-strong text-caption-strong line-clamp-2">{video.title}</span>
          </button>
        )}
      </div>
      {video.description && <figcaption className="mt-2 font-caption text-caption text-[#78716C] line-clamp-2">{video.description}</figcaption>}
    </figure>
  );
}

/** A horizontally scrolling row of reels and videos. Renders nothing when there are none. */
export default function VideoGallery({ videos, heading, subheading, id }: { videos: Video[]; heading: string; subheading?: string; id?: string }) {
  if (!videos.length) return null;
  return (
    <section id={id} className="space-y-4 scroll-mt-32">
      <div>
        <h2 className="font-headline-h2 text-headline-h2 text-[#1C1917]">{heading}</h2>
        {subheading && <p className="font-caption text-caption text-[#78716C]">{subheading}</p>}
      </div>
      <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x pb-2 -mx-1 px-1">
        {videos.map((v) => (
          <Player key={v.id} video={v} />
        ))}
      </div>
    </section>
  );
}
