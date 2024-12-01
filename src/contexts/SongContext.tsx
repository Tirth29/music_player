import React, { createContext, useState, useContext } from 'react';
import { Song } from '../types/music';

interface SongContextType {
  currentSong: Song | null;
  setCurrentSong: (song: Song) => void;
  playlist: Song[];
  setPlaylist: (playlist: Song[]) => void;
}

const SongContext = createContext<SongContextType | undefined>(undefined);

export const SongProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [playlist, setPlaylist] = useState<Song[]>([]);

  return (
    <SongContext.Provider value={{ currentSong, setCurrentSong, playlist, setPlaylist }}>
      {children}
    </SongContext.Provider>
  );
};

export const useSongContext = () => {
  const context = useContext(SongContext);
  if (context === undefined) {
    throw new Error('useSongContext must be used within a SongProvider');
  }
  return context;
};

