import React, { useState, useEffect, useRef } from 'react';
import { Howl } from 'howler';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle } from 'lucide-react';
import { Song } from '../../types/music';

export default function PlayerBar() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const soundRef = useRef<Howl | null>(null);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  useEffect(() => {
    if (currentSong) {
      soundRef.current = new Howl({
        src: [currentSong.audioUrl],
        html5: true,
        onplay: () => setIsPlaying(true),
        onpause: () => setIsPlaying(false),
        onend: () => setIsPlaying(false),
        onload: () => setDuration(soundRef.current?.duration() || 0),
      });
    }

    return () => {
      soundRef.current?.unload();
    };
  }, [currentSong]);

  const togglePlayPause = () => {
    if (!soundRef.current) return;
    if (isPlaying) {
      soundRef.current.pause();
    } else {
      soundRef.current.play();
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-black/95 border-t border-white/10 p-2 md:p-4">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        {currentSong && (
          <div className="flex items-center gap-2 md:gap-4 flex-1">
            <img src={currentSong.cover} alt={currentSong.title} className="w-10 h-10 md:w-14 md:h-14 rounded-lg" />
            <div className="hidden sm:block">
              <h3 className="font-semibold text-sm md:text-base">{currentSong.title}</h3>
              <p className="text-xs md:text-sm text-white/60">{currentSong.artist}</p>
            </div>
          </div>
        )}

        <div className="flex flex-col items-center gap-1 md:gap-2 flex-1">
          <div className="flex items-center gap-2 md:gap-4">
            <button className="text-white/60 hover:text-white hidden sm:block">
              <Shuffle className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button className="text-white/60 hover:text-white">
              <SkipBack className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button
              onClick={togglePlayPause}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-500 flex items-center justify-center hover:bg-red-600"
            >
              {isPlaying ? <Pause className="w-4 h-4 md:w-5 md:h-5" /> : <Play className="w-4 h-4 md:w-5 md:h-5" />}
            </button>
            <button className="text-white/60 hover:text-white">
              <SkipForward className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button className="text-white/60 hover:text-white hidden sm:block">
              <Repeat className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2 w-full max-w-xs md:max-w-md">
            <span className="text-xs text-white/60 hidden sm:inline">{formatTime(currentTime)}</span>
            <div className="flex-1 h-1 bg-white/10 rounded-full">
              <div
                className="h-full bg-red-500 rounded-full"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
            <span className="text-xs text-white/60 hidden sm:inline">{formatTime(duration)}</span>
          </div>
        </div>

        <div className="w-10 md:w-40 flex-1" />
      </div>
    </div>
  );
}




