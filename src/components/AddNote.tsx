import { useState } from "react";
import * as Form from "@radix-ui/react-form";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Dialog from "@radix-ui/react-dialog";
import { TbPin, TbPinFilled, TbPinnedOff, TbX } from "react-icons/tb";

const AddNote = () => {
  const [title, setTitle] = useState<string>("");
  const [context, setContext] = useState<string>("");
  const [isPinned, setIsPinned] = useState<
    "checked" | "unchecked" | "indeterminate"
  >("indeterminate");
  const [formError, setFormError] = useState(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(title, context, isPinned);
  };

  return (
    <>
      <Dialog.Title className='text-xl mb-4'>AddNote</Dialog.Title>
      <Form.Root className='flex flex-col gap-5' onSubmit={handleSubmit}>
        <Form.Field className='flex flex-col' name='title'>
          <Form.Label className='text-neutral-500'>Title</Form.Label>
          <Form.Control asChild>
            <input
              className='bg-neutral-800/40 p-2 rounded-md focus:outline-none'
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Control>
        </Form.Field>

        <Form.Field className='flex flex-col' name='context'>
          <Form.Label className='text-neutral-500'>Context</Form.Label>
          <Form.Control asChild>
            <textarea
              className='resize-none bg-neutral-800/40 p-2 rounded-md focus:outline-none'
              rows={4}
              value={context}
              onChange={(e) => setContext(e.target.value)}
            />
          </Form.Control>
        </Form.Field>

        <Form.Submit asChild>
          <button>Add note</button>
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
