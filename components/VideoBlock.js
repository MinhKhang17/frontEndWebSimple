'use client'
import { useState } from 'react'

export default function VideoBlock({ videoId, title, posterImage }) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="rounded-lg overflow-hidden border bg-black relative w-full">
      {!isPlaying ? (
        <button
          onClick={() => setIsPlaying(true)}
          className="w-full h-full cursor-pointer relative group"
          aria-label={`Play video: ${title || 'Video'}`}
        >
          {posterImage && (
            <img
              src={posterImage}
              alt={title || 'Video thumbnail'}
              className="w-full h-64 object-cover group-hover:opacity-75 transition-opacity"
            />
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all">
            <svg
              className="w-16 h-16 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </div>
        </button>
      ) : (
        <iframe
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title || 'Video player'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-64"
        />
      )}
    </div>
  )
}
