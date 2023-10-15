import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertNote } from "../api";
import { NoteType } from "../types/shared.types";

const useNoteInsert = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (note: NoteType) => {
      return insertNote(note).then((result) => result.data);
    },
    {
      onMutate: (note: NoteType) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        queryClient.setQueryData(
          ["notes"],
          (oldNotes: NoteType[] | undefined) => {
            return oldNotes ? [...oldNotes, note] : [note];
          }
        );
      },
      onError: (note: NoteType) => {
        queryClient.setQueryData(
          ["notes"],
          (oldNotes: NoteType[] | undefined | null) => {
            return oldNotes ? oldNotes.filter((n) => n.id !== note.id) : null;
          }
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries(["notes"]);
      },
    }
  );
};

export default useNoteInsert;
