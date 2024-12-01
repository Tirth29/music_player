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

