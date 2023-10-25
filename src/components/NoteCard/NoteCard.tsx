import { TbPencil, TbPin } from "react-icons/tb";
import { motion } from "framer-motion";
import { NoteType } from "../../types/shared.types";
import { useEffect, useState } from "react";

interface NoteCardProps {
  note: NoteType;
  setSelectedNote: (id: number | null) => void;
  setIsOpen: (open: boolean) => void;
}

const NoteCard = (props: NoteCardProps) => {
  const { note, setSelectedNote, setIsOpen } = props;

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

  return (
    <motion.div
      animate={{ scale: [0.9, 1], opacity: [0, 1] }}
      key={note?.id}
      onClick={() => {
        if (note.id) {
          setSelectedNote(note.id);
          setIsOpen(true);
        } else {
          setSelectedNote(null);
          console.log(note);
          setIsOpen(false);
        }
      }}
      className='relative max-h-44 min-h-44 h-44 flex flex-col justify-between border-[1px] border-stone-700 rounded-md bg-neutral-800/40 p-5 hover:bg-neutral-700/60 hover:shadow-md cursor-pointer transition-all z-0'
      onMouseEnter={() => setPinIsHovered(true)}
      onMouseLeave={() => setPinIsHovered(false)}
    >
      {note.is_pinned ? (
        <motion.div
          animate={{ y: ["-80%", "0%"], opacity: [0, 1] }}
          transition={{ duration: 0.2, delay: 0.35 }}
          className='absolute -top-3 -right-3 text-xl bg-emerald-700 rounded-md p-2 shadow-sm active:scale-90 transition-all z-10'
        >
          {pinIsHovered ? (
            <TbPencil color='white' stroke='white' />
          ) : (
            <TbPin color='white' stroke='white' />
          )}
        </motion.div>
      ) : pinIsHovered ? (
        <motion.div
          animate={{ y: ["10%", "0%"], opacity: [0, 1] }}
          transition={{ duration: 0.2 }}
          className='absolute -top-3 -right-3 text-xl bg-emerald-700 rounded-md p-2 shadow-sm active:scale-90 transition-all z-10'
        >
          <TbPencil color='white' stroke='white' />
        </motion.div>
      ) : null}
      {note.title && (
        <h3
          className={
            (note.context ? "line-clamp-2" : "line-clamp-3") +
            " font-bold text-2xl "
          }
        >
          {note.title}
        </h3>
      )}
      {note.title && (
        <p className='text-xs text-neutral-500 font-semibold pt-1'>
          {formattedDate}
        </p>
      )}
      {note.context && (
        <p
          className={
            note.title
              ? "pt-3 line-clamp-2 leading-5 text-neutral-500"
              : "line-clamp-3 text-2xl"
          }
        >
          {note.context}
        </p>
      )}
      {!note.title && (
        <p className='text-xs text-neutral-500 font-semibold pt-1'>
          {formattedDate}
        </p>
      )}
    </motion.div>
  );
};

export default NoteCard;
