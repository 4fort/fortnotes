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
        <div className='w-full h-full grid grid-cols-4 gap-4 mt-5'>
          {notes.map((note: NoteType) => (
            <div
              key={note.id}
              className='max-h-32 min-h-32 overflow-hidden border-[1px] border-stone-700 rounded-md bg-neutral-800/40 p-5 hover:bg-neutral-700/60 hover:scale-105 cursor-pointer transition-all'
            >
              <h3 className='font-bold text-2xl'>{note.title}</h3>
              <p className='pt-3 line-clamp-2 text-neutral-500'>
                {note.context}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notes;
