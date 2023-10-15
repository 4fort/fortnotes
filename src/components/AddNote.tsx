import { useState } from "react";
import * as Form from "@radix-ui/react-form";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Dialog from "@radix-ui/react-dialog";
import {
  TbDeviceFloppy,
  TbPin,
  TbPinFilled,
  TbPinnedOff,
  TbX,
} from "react-icons/tb";
import useNoteInsert from "../hooks/useNoteInsert";
import { NoteType } from "../types/shared.types";

const AddNote = () => {
  const [title, setTitle] = useState<string>("");
  const [context, setContext] = useState<string>("");
  const [isPinned, setIsPinned] = useState<
    "checked" | "unchecked" | "indeterminate"
  >("indeterminate");
  const is_pinned = isPinned === "checked" ? true : false;
  const newNoteMutation = useNoteInsert();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const note: NoteType = {
      title,
      context,
      is_pinned,
    };
    newNoteMutation.mutate(note);
  };

  return (
    <>
      <Dialog.Title className='text-neutral-500/80 mb-4'>AddNote</Dialog.Title>
      <Form.Root className='flex flex-col gap-5' onSubmit={handleSubmit}>
        <div className='overflow-clip rounded-md bg-neutral-800/30'>
          <Form.Field className='flex flex-col' name='title'>
            <Form.Control asChild>
              <input
                className='bg-transparent focus:bg-neutral-800/20 text-2xl font-semibold p-2 focus:outline-none border-b-2 border-b-neutral-800'
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
              />
            </Form.Control>
          </Form.Field>
        </div>

        <Form.Submit asChild>
          <button
            disabled={newNoteMutation.isLoading || context === ""}
            className='flex justify-center items-center gap-2 p-2 bg-emerald-700 rounded-md disabled:opacity-50'
          >
            <TbDeviceFloppy /> save
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
          <button aria-label='Close'>
            <TbX className='group-active:scale-90 transition-all' />
          </button>
        </Dialog.Close>
      </div>
    </>
  );
};

export default AddNote;
