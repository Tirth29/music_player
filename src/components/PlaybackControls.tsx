import React from 'react';
import { Song, PlaybackMode } from '../../types/music';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle } from 'lucide-react';

interface PlaybackControlsProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onRepeat: () => void;
  onShuffle: () => void;
  playbackMode: PlaybackMode;
}

export default function PlaybackControls({
  currentSong,
  isPlaying,
  onTogglePlay,
  onPrevious,
  onNext,
  onRepeat,
  onShuffle,
  playbackMode,
}: PlaybackControlsProps) {
  if (!currentSong) return null;

  return (
    <div className="bg-[#6B0000] rounded-lg m-2 md:m-4 lg:m-7 p-3 md:p-4 lg:p-5">
      <img
        src={currentSong.cover}
        alt={currentSong.title}
        className="w-full aspect-square object-cover rounded-lg mb-4"
      />
      <h3 className="font-semibold text-base md:text-lg mb-1 text-white/70">{currentSong.title}</h3>
      <p className="text-white/60 text-sm md:text-base mb-4">{currentSong.artist}</p>
      <div className="flex justify-between items-center">
        <button 
          onClick={onRepeat} 
          className={`text-white/60 hover:text-white ${playbackMode === 'repeat' ? 'text-red-500' : ''}`}
        >
          <Repeat className="w-4 h-4 md:w-6 md:h-6" />
        </button>
        <button onClick={onPrevious} className="text-white/60 hover:text-white">
          <SkipBack className="w-6 h-6 md:w-8 md:h-8" />
        </button>
        <button
          onClick={onTogglePlay}
          className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-red-500 flex items-center justify-center hover:bg-red-600"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 md:w-8 md:h-8 text-white" />
          ) : (
            <Play className="w-6 h-6 md:w-8 md:h-8 text-white" />
          )}
        </button>
        <button onClick={onNext} className="text-white/60 hover:text-white">
          <SkipForward className="w-6 h-6 md:w-8 md:h-8" />
        </button>
        <button 
          onClick={onShuffle} className={`text-white/60 hover:text-white ${playbackMode === 'shuffle' ? 'text-red-500' : ''}`}
        >
          <Shuffle className="w-4 h-4 md:w-6 md:h-6" />
        </button>
      </div>
    </div>
  );
}

