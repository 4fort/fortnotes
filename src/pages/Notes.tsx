import NoteCard from "../components/NoteCard/NoteCard";
import NoteCardSkeleton from "../components/NoteCard/NoteCardSkeleton";
import useFetch from "../hooks/useFetch";

import { NoteType } from "../types/shared.types";

const Notes = () => {
  const { notes, isLoading, fetchError, refetch } = useFetch();

  return (
    <div
      className='page-container'
      style={isLoading ? { cursor: "wait" } : { cursor: "default" }}
    >
      <div className='flex justify-between'>
        <h1>Notes</h1>
        <button
          className='bg-emerald-700 hover:bg-emerald-800 text-xs text-white py-1 px-4 rounded transition-all'
          onClick={refetch}
          style={isLoading ? { cursor: "wait" } : { cursor: "pointer" }}
        >
          refresh
        </button>
      </div>
      {fetchError && <p>{fetchError}</p>}
      {notes && (
        <div className=''>
          <div className='w-full h-full grid grid-cols-4 gap-4 mt-5'>
            {isLoading
              ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((e: number, i) => (
                  <NoteCardSkeleton key={e} index={i} />
                ))
              : notes.map((note: NoteType) => (
                  <NoteCard key={note.id} note={note} />
                ))}
            {/* {notes.map(
              (note: NoteType) =>
                note.is_pinned && <NoteCard key={note.id} note={note} />
            )} */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;
