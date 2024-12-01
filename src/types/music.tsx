export interface Song {
    id: string;
    title: string;
    artist: string;
    album: string;
    duration: string;
    plays: number;
    cover: string;
    audioUrl: string;
  }
  
  export interface Artist {
    name: string;
    monthlyListeners: number;
    isVerified: boolean;
    image: string;
  }
  
  export type PlaybackMode = 'off' | 'repeat' | 'shuffle';
  
  export interface Playlist {
    id: string;
    name: string;
    songs: Song[];
    createdBy: string;
    createdAt: Date;
  }
  
  export interface User {
    id: string;
    username: string;
    email: string;
    avatarUrl?: string;
    playlists: Playlist[];
  }
  
  export interface Album {
    id: string;
    title: string;
    artist: string;
    releaseDate: Date;
    coverUrl: string;
    songs: Song[];
  }
  
  export interface SearchResult {
    songs: Song[];
    artists: Artist[];
    albums: Album[];
    playlists: Playlist[];
  }
  
  export interface PlayerState {
    currentSong: Song | null;
    isPlaying: boolean;
    volume: number;
    playbackMode: PlaybackMode;
    queue: Song[];
  }
  
  