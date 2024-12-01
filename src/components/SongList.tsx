import React, { useState } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  plays: number;
  cover: string;
}

interface SongListProps {
  songs: Song[];
  onSongSelect: (song: Song) => void;
  currentSong: Song | null;
  isPlaying: boolean;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const DraggableRow = ({
  song,
  index,
  moveRow,
  onSongSelect,
  isCurrent,
}: {
  song: Song;
  index: number;
  moveRow: (dragIndex: number, hoverIndex: number) => void;
  onSongSelect: (song: Song) => void;
  isCurrent: boolean;
}) => {
  const [, ref] = useDrag({
    type: 'row',
    item: { index },
  });

  const [, drop] = useDrop<DragItem>({
    accept: 'row',
    hover: (item: DragItem) => {
      if (item.index !== index) {
        moveRow(item.index, index);
        item.index = index; // Update the index to prevent redundant moves
      }
    },
  });

  return (
    <tr
      ref={(node) => ref(drop(node))}
      className={`group hover:bg-gray-900 ${
        isCurrent ? 'bg-[#520000]' : ''
      } cursor-pointer`}
      onClick={() => onSongSelect(song)}
    >
      <td className="py-2 px-4 text-white/70">{index + 1}</td>
      <td className="py-2 px-4">
        <div className="flex items-center gap-3">
          <img src={song.cover} alt={song.title} className="w-10 h-10 rounded" />
          <div>
            <div className="font-medium text-white/70">{song.title}</div>
            <div className="text-sm text-gray-500">{song.artist}</div>
          </div>
        </div>
      </td>
      <td className="py-2 px-4 text-white/70">{song.plays.toLocaleString()}</td>
      <td className="py-2 px-4 text-white/70">{song.duration}</td>
      <td className="py-2 px-4 text-white/70">{song.album}</td>
    </tr>
  );
};

export default function SongList({
  songs: initialSongs,
  onSongSelect,
  currentSong,
}: SongListProps) {
  const [songs, setSongs] = useState(initialSongs);

  const moveRow = (dragIndex: number, hoverIndex: number) => {
    const updatedSongs = [...songs];
    const [draggedSong] = updatedSongs.splice(dragIndex, 1);
    updatedSongs.splice(hoverIndex, 0, draggedSong);
    setSongs(updatedSongs);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="song-list">
        <h1 className="text-xl font-semibold mb-4 text-white/80">Songs</h1>
        <table className="w-full">
          <thead>
            <tr className="text-[#CFC5C5] text-left">
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">Title</th>
              <th className="py-2 px-4">Plays</th>
              <th className="py-2 px-4">Time</th>
              <th className="py-2 px-4">Album</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song, index) => (
              <DraggableRow
                key={song.id}
                song={song}
                index={index}
                moveRow={moveRow}
                onSongSelect={onSongSelect}
                isCurrent={currentSong?.id === song.id}
              />
            ))}
          </tbody>
        </table>
      </div>
    </DndProvider>
  );
}
