import { TbPin, TbPinnedOff } from "react-icons/tb";
import { motion } from "framer-motion";
import { NoteType } from "../../types/shared.types";
import { useEffect, useState } from "react";
import useEditNote from "../../hooks/useEditNote";

interface NoteCardProps {
  note: NoteType;
}

const NoteCard = (props: NoteCardProps) => {
  const { note } = props;

  const [pinIsHovered, setPinIsHovered] = useState<boolean>(false);

  const [formattedDate, setFormattedDate] = useState<string>();

  useEffect(() => {
    if (note.created_at) {
      setFormattedDate(
        new Date(note.created_at as string).toLocaleTimeString([], {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
        })
      );
    } else setFormattedDate("Saving note...");
  }, [note]);

  const [selectedNote, setSelectedNote] = useState<number | undefined>();
  useEditNote(selectedNote);

  return (
    <motion.div
      animate={{ scale: [0.9, 1], opacity: [0, 1] }}
      key={note?.id}
      onClick={() => {
        setSelectedNote(note.id);
      }}
      className='relative max-h-44 min-h-44 h-44 flex flex-col justify-evenly border-[1px] border-stone-700 rounded-md bg-neutral-800/40 p-5 hover:bg-neutral-700/60 hover:scale-105 hover:shadow-md cursor-pointer transition-all z-0'
    >
      {note.is_pinned && (
        <div
          className='absolute -top-3 -right-3 text-xl bg-emerald-700 hover:bg-emerald-800 rounded-md p-2 shadow-sm active:scale-90 transition-all z-10'
          onMouseEnter={() => setPinIsHovered(true)}
          onMouseLeave={() => setPinIsHovered(false)}
        >
          {pinIsHovered ? (
            <TbPinnedOff color='white' stroke='white' />
          ) : (
            <TbPin color='white' stroke='white' />
          )}
        </div>
      )}
      <h3 className='font-bold text-2xl line-clamp-2'>{note.title}</h3>
      <p className='text-xs text-neutral-500 font-semibold pt-1'>
        {formattedDate}
      </p>
      <p className='pt-3 line-clamp-2 text-neutral-500'>{note.context}</p>
    </motion.div>
  );
};

export default NoteCard;
