import React, { useState, useEffect, useRef } from "react";
import { Howl } from "howler";
import { Search, BadgeCheck } from "lucide-react";
import SongList from "../components/SongList";
import PlaybackControls from "../components/PlaybackControls";
import { Artist, Song, PlaybackMode } from "../types/music";

const artist: Artist = {
  name: "Sample Artist",
  monthlyListeners: 1234567,
  isVerified: true,
  image:
    "https://static.spotboye.com/uploads/f724eeb59fc90a97f87434b064151f18_thumbnail.jpg",
};

const songs: Song[] = [
  {
    id: "1",
    title: "Sample Song 1",
    artist: "Sample Artist",
    album: "Sample Album 1",
    duration: "3:45",
    plays: 1500000,
    cover:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: "2",
    title: "Sample Song 2",
    artist: "Sample Artist",
    album: "Sample Album 2",
    duration: "4:20",
    plays: 1250000,
    cover:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=300&q=80",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: "3",
    title: "Sample Song 3",
    artist: "Sample Artist",
    album: "Sample Album 3",
    duration: "5:10",
    plays: 980000,
    cover:
      "https://images.unsplash.com/photo-1497032205916-ac775f0649ae?auto=format&fit=crop&w=300&q=80",
    audioUrl:
      "https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg",
  },
  {
    id: "4",
    title: "Sample Song 4",
    artist: "Sample Artist",
    album: "Sample Album 4",
    duration: "3:30",
    plays: 870000,
    cover:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=300&q=80",
    audioUrl:
      "https://commondatastorage.googleapis.com/codeskulptor-assets/week7-brrring.m4a",
  },
  {
    id: "5",
    title: "Sample Song 5",
    artist: "Sample Artist",
    album: "Sample Album 5",
    duration: "4:05",
    plays: 760000,
    cover:
      "https://images.unsplash.com/photo-1497032205916-ac775f0649ae?auto=format&fit=crop&w=300&q=80",
    audioUrl:
      "https://commondatastorage.googleapis.com/codeskulptor-assets/Evillaugh.ogg",
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackMode, setPlaybackMode] = useState<PlaybackMode>("off");
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    if (currentSong) {
      soundRef.current?.unload();
      soundRef.current = new Howl({
        src: [currentSong.audioUrl],
        html5: true,
        onplay: () => setIsPlaying(true),
        onpause: () => setIsPlaying(false),
        onend: () => {
          setIsPlaying(false);
          if (playbackMode === "repeat") {
            soundRef.current?.play();
          } else if (playbackMode === "shuffle") {
            playRandomSong();
          } else {
            playNext();
          }
        },
      });
      soundRef.current.play();
    }
  }, [currentSong]);

  const playSong = (song: Song) => {
    setCurrentSong(song);
  };

  const togglePlayPause = () => {
    if (soundRef.current) {
      if (isPlaying) {
        soundRef.current.pause();
      } else {
        soundRef.current.play();
      }
    }
  };

  const playPrevious = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong?.id);
    if (currentIndex > 0) {
      playSong(songs[currentIndex - 1]);
    }
  };

  const playNext = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong?.id);
    if (currentIndex < songs.length - 1) {
      playSong(songs[currentIndex + 1]);
    }
  };

  const playRandomSong = () => {
    const randomIndex = Math.floor(Math.random() * songs.length);
    playSong(songs[randomIndex]);
  };

  const toggleRepeat = () => {
    setPlaybackMode((prevMode) => (prevMode === "repeat" ? "off" : "repeat"));
  };

  const toggleShuffle = () => {
    setPlaybackMode((prevMode) => (prevMode === "shuffle" ? "off" : "shuffle"));
  };

  // Filter songs based on search query
  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.album.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col lg:flex-row bg-gradient-to-b from-[#4C0000] to-[#0A0A0A] min-h-screen">
      <div className="p-4 md:p-8 lg:p-12 w-full lg:w-2/3 xl:w-3/4">
        <div>
          <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
            <nav className="flex gap-4 mb-4 md:mb-0">
              <button className="text-white hover:text-red-500">Music</button>
              <button className="text-white hover:text-red-500">Podcast</button>
              <button className="text-white hover:text-red-500">Live</button>
              <button className="text-white hover:text-red-500">Radio</button>
            </nav>
            <div className="w-full md:w-auto flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 rounded-full py-2 pl-10 pr-4 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/90 to-black/50" />
            <img
              src={artist.image}
              alt={artist.name}
              className="w-full h-48 md:h-64 lg:h-96 object-cover"
            />
            <div className="absolute bottom-0 left-0 p-4 md:p-6">
              <div className="flex items-center gap-2 mb-2">
                {artist.isVerified && (
                  <div className="bg-blue-500 p-1 rounded-full">
                    <BadgeCheck className="w-4 h-4" />
                  </div>
                )}
                <span className="text-sm text-white/70">Verified Artist</span>
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-white/80">{artist.name}</h1>
              <p className="text-white/60 text-sm md:text-base">
                {artist.monthlyListeners.toLocaleString()} monthly listeners
              </p>
            </div>
          </div>

          {/* Popular songs */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-white/80">Popular</h2>
              <button className="text-white/60 hover:text-white text-sm md:text-base">
                See All
              </button>
            </div>
            <SongList
              songs={filteredSongs}
              onSongSelect={playSong}
              currentSong={currentSong}
              isPlaying={isPlaying}
            />
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/3 xl:w-1/4 bg-gradient-to-b from-[#0F0F0F99] to-[#000] p-4 lg:p-0">
        <PlaybackControls
          currentSong={currentSong}
          isPlaying={isPlaying}
          onTogglePlay={togglePlayPause}
          onPrevious={playPrevious}
          onNext={playNext}
          onRepeat={toggleRepeat}
          onShuffle={toggleShuffle}
          playbackMode={playbackMode}
        />
      </div>
    </div>
  );
}

