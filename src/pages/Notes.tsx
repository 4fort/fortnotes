import * as Dialog from "@radix-ui/react-dialog";
import NoteCard from "../components/NoteCard/NoteCard";
import NoteCardSkeleton from "../components/NoteCard/NoteCardSkeleton";
import { motion } from "framer-motion";

import { NoteType } from "../types/shared.types";
import AddNote from "../components/AddNote";
import { TbPlus, TbRefresh } from "react-icons/tb";
import useNotesQuery from "../hooks/useNotesQuery";

interface NotesQueryTypes {
  data: NoteType[] | null | undefined;
  isLoading: boolean;
  error: string | unknown;
}

const Notes = () => {
  const { data: notes, isLoading, error }: NotesQueryTypes = useNotesQuery();

  const refetch = () => {};

  return (
    <div
      className='page-container'
      style={isLoading ? { cursor: "wait" } : { cursor: "default" }}
    >
      <div className='flex justify-between'>
        <h1>Notes</h1>
        <div className='flex gap-2 text-xs'>
          <button
            className='bg-emerald-700 hover:bg-emerald-800 border-[1px] border-emerald-600 py-1 px-2 rounded flex transition-all'
            onClick={refetch}
            style={isLoading ? { cursor: "wait" } : { cursor: "pointer" }}
          >
            <TbRefresh className='me-2 self-center' />
            <span>refresh</span>
          </button>
          <Dialog.Root>
            <Dialog.Trigger className='bg-emerald-700 hover:bg-emerald-800 border-[1px] border-emerald-600 py-1 px-2 rounded flex transition-all'>
              <TbPlus className='me-2 self-center' />
              <span>add note</span>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className='' asChild>
                <motion.div
                  animate={{ opacity: [0, 1] }}
                  transition={{ duration: 0.2 }}
                  className='bg-black/60 inset-0 fixed'
                />
              </Dialog.Overlay>
              <Dialog.Content className='bg-neutral-900/40 backdrop-blur-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[400px] rounded-lg p-6 text-white border-[1px] border-stone-700'>
                <AddNote />
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
      {error! && <p>{JSON.stringify(error)}</p>}
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
