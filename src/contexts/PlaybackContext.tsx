import React, { createContext, useState, useContext } from 'react';
import { PlaybackMode } from '../types/music';

interface PlaybackContextType {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  playbackMode: PlaybackMode;
  setPlaybackMode: (mode: PlaybackMode) => void;
  volume: number;
  setVolume: (volume: number) => void;
}

const PlaybackContext = createContext<PlaybackContextType | undefined>(undefined);

export const PlaybackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackMode, setPlaybackMode] = useState<PlaybackMode>('off');
  const [volume, setVolume] = useState(1);

  return (
    <PlaybackContext.Provider value={{ isPlaying, setIsPlaying, playbackMode, setPlaybackMode, volume, setVolume }}>
      {children}
    </PlaybackContext.Provider>
  );
};

export const usePlaybackContext = () => {
  const context = useContext(PlaybackContext);
  if (context === undefined) {
    throw new Error('usePlaybackContext must be used within a PlaybackProvider');
  }
  return context;
};

