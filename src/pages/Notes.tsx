import * as Dialog from "@radix-ui/react-dialog";
import NoteCard from "../components/NoteCard/NoteCard";
import NoteCardSkeleton from "../components/NoteCard/NoteCardSkeleton";
import { motion } from "framer-motion";

import { NoteType } from "../types/shared.types";
import NoteDialog from "../components/NoteDialog";
import { TbPlus, TbRefresh } from "react-icons/tb";
import useNotesQuery from "../hooks/useNotesQuery";
import { useState } from "react";
import useNoteRefetch from "../hooks/useNoteRefetch";
import { UseQueryResult } from "@tanstack/react-query";

const Notes = () => {
  const {
    data: notes,
    isLoading,
    error,
  }: UseQueryResult<NoteType[] | null> = useNotesQuery();
  const refetch = useNoteRefetch();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<number | null>(null);

  console.log(isLoading);

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
          <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
            <Dialog.Trigger className='bg-emerald-700 hover:bg-emerald-800 border-[1px] border-emerald-600 py-1 px-2 rounded flex transition-all'>
              <TbPlus className='me-2 self-center' />
              <span>add note</span>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className='' asChild>
                <motion.div
                  animate={{ opacity: [0, 1] }}
                  transition={{ duration: 0.15 }}
                  className='bg-black/60 inset-0 fixed'
                />
              </Dialog.Overlay>
              <Dialog.Content className='bg-neutral-900/40 backdrop-blur-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[400px] rounded-lg p-6 text-white border-[1px] border-stone-700'>
                <NoteDialog
                  setIsOpen={setIsOpen}
                  setSelectedNote={setSelectedNote}
                  selectedNote={selectedNote}
                />
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
      {error! && <p>{JSON.stringify(error)}</p>}
      {notes && (
        <div className='mt-5 flex flex-col gap-4'>
          <div className='grid grid-cols-4 gap-4'>
            {notes?.map(
              (note: NoteType) =>
                note.is_pinned && (
                  <NoteCard
                    key={note.id}
                    note={note}
                    setSelectedNote={setSelectedNote}
                    setIsOpen={setIsOpen}
                  />
                )
            )}
          </div>
          <hr className='border-t border-stone-700 w-11/12 self-center' />
          <div className='w-full h-full grid grid-cols-4 gap-4'>
            {isLoading &&
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((e: number, i) => (
                <NoteCardSkeleton key={e + i} index={i} />
              ))}
            {notes &&
              notes
                .reverse()
                .map(
                  (note: NoteType) =>
                    !note.is_pinned && (
                      <NoteCard
                        key={note.id}
                        note={note}
                        setSelectedNote={setSelectedNote}
                        setIsOpen={setIsOpen}
                      />
                    )
                )}
          </div>
        </div>
      )}
      {!notes && !isLoading && (
        <div className='flex justify-center algin-center'>
          <p className='text-stone-600'>Error fetching notes</p>
        </div>
      )}
    </div>
  );
};

export default Notes;
