import { useEffect, useState } from "react";
import * as Form from "@radix-ui/react-form";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Dialog from "@radix-ui/react-dialog";
import {
  TbDeviceFloppy,
  TbPin,
  TbPinFilled,
  TbPinnedOff,
  TbTrash,
  TbX,
} from "react-icons/tb";
import useNoteInsert from "../hooks/useNoteInsert";
import { NoteType } from "../types/shared.types";
import useNoteQueryById from "../hooks/useNoteQueryById";
import useNoteUpdate from "../hooks/useNoteUpdate";

interface AddNoteProps {
  setSelectedNote: (id: number | null) => void;
  selectedNote?: number | null;
  setIsOpen: (open: boolean) => void;
}

const NoteDialog = (props: AddNoteProps) => {
  const { setIsOpen, setSelectedNote, selectedNote } = props;

  const [title, setTitle] = useState<string>("");
  const [context, setContext] = useState<string>("");
  const [isPinned, setIsPinned] = useState<
    "checked" | "unchecked" | "indeterminate"
  >("indeterminate");
  const is_pinned = isPinned === "checked" ? true : false;

  const toEditNote = useNoteQueryById(selectedNote ?? undefined);

  const emptyFields = () => {
    setSelectedNote(null);
  };

  useEffect(() => {
    if (toEditNote) {
      setTitle(toEditNote.title);
      setContext(toEditNote.context);
      setIsPinned(toEditNote.is_pinned ? "checked" : "unchecked");
    }
    return;
  }, [toEditNote]);

  const newNoteMutation = useNoteInsert();
  const updateNoteMutation = useNoteUpdate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const note: NoteType = {
      title,
      context,
      is_pinned,
    };
    if (selectedNote) {
      const updatedNote = {
        id: selectedNote,
        data: note,
      };

      setIsOpen(false);
      updateNoteMutation.mutate(updatedNote);
      return;
    }
    // console.log(selectedNote);
    newNoteMutation.mutate(note);
    if (!newNoteMutation.isLoading) {
      setIsOpen(false);
      emptyFields();
    }
  };

  return (
    <>
      <Dialog.Title className='text-neutral-500/80 mb-4'>AddNote</Dialog.Title>
      <Form.Root className='flex flex-col gap-5' onSubmit={handleSubmit}>
        <div className='overflow-clip rounded-md bg-neutral-800/30'>
          <Form.Field className='flex flex-col' name='title'>
            <Form.Control asChild>
              <input
                className='bg-emerald-950/5 focus:bg-emerald-950/20 text-2xl font-semibold p-2 focus:outline-none border-b-2 border-b-neutral-800'
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoComplete='off'
              />
            </Form.Control>
          </Form.Field>

          <Form.Field className='flex flex-col' name='context'>
            <Form.Control asChild>
              <textarea
                className='bg-transparent focus:bg-neutral-800/20 font-thin p-2 resize-none focus:outline-none'
                rows={10}
                value={context}
                onChange={(e) => setContext(e.target.value)}
                autoComplete='off'
              />
            </Form.Control>
          </Form.Field>
        </div>

        <Form.Submit asChild>
          <button
            disabled={
              newNoteMutation.isLoading ||
              (context === "" && !title) ||
              (!context && title === "")
            }
            className='flex justify-center items-center gap-2 p-2 bg-emerald-700 rounded-md disabled:opacity-50'
          >
            <TbDeviceFloppy />{" "}
            {(context === "" && !title) || (!context && title === "")
              ? "Fields must not be empty"
              : "save"}
          </button>
        </Form.Submit>
      </Form.Root>

      <div className='absolute -top-3 -right-3 flex shadow-sm text-xl bg-emerald-700 rounded-md overflow-hidden before:content-[""] before:absolute before:w-[1.2px] before:h-4/6 before:inset-x-1/2 before:self-center before:flex before:bg-neutral-600/40'>
        <Checkbox.Root
          checked={isPinned === "checked"}
          onCheckedChange={(e) => {
            setIsPinned(e ? "checked" : "unchecked");
          }}
          id='c1'
          className='group hover:bg-emerald-800 p-2 z-20'
        >
          {isPinned === "checked" ? (
            <TbPinFilled
              className='group-active:scale-90 transition-all'
              color='white'
              stroke='white'
            />
          ) : isPinned === "unchecked" ? (
            <TbPin
              className='group-active:scale-90 transition-all'
              color='white'
              stroke='white'
            />
          ) : (
            <TbPinnedOff
              className='group-active:scale-90 transition-all'
              color='white'
              stroke='white'
            />
          )}
        </Checkbox.Root>
        <Dialog.Close
          asChild
          className='group hover:bg-emerald-800 p-2 transition-all'
        >
          <button
            type='button'
            aria-label='Close'
            onClick={() => emptyFields()}
          >
            <TbX className='group-active:scale-90 transition-all' />
          </button>
        </Dialog.Close>
      </div>
    </>
  );
};

export default NoteDialog;
