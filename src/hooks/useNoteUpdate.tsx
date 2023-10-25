import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateNote } from "../api";
import { NoteType, NoteUpdateType } from "../types/shared.types";

const useNoteUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (note: NoteUpdateType) => {
      return updateNote(note).then((result) => result.data);
    },
    {
      onMutate: async (note: NoteUpdateType) => {
        await queryClient.cancelQueries(["notes", note.id]);
        const previousNote = queryClient
          .getQueryData<NoteType[]>(["notes"])
          ?.find((oldNote: NoteType) => oldNote.id !== note.id);

        queryClient.setQueryData(["notes", note.id], note.data);

        return { previousNote, newNote: note };
      },
      onSettled(data, error, variables, context) {
        if (error) {
          queryClient.setQueryData(["notes"], context?.previousNote);
        }
        if (variables) {
          queryClient.invalidateQueries(["notes"]);
        }
        // console.log(data, error, variables, context);
      },
    }
  );

  // return useMutation(
  //   async (note: NoteUpdateType) => {
  //     return updateNote(note).then((result) => result.data);
  //   },
  //   {
  //     onMutate: async (note: NoteUpdateType) => {
  //       await queryClient.cancelQueries(["notes"]);

  //       const previousNote = queryClient.getQueryData(["notes"]);

  //       queryClient.setQueriesData(["notes"], note.data);

  //       console.log(previousNote, note);
  //       return { previousNote, newNote: note };
  //     },
  //     onError: (error, note: NoteUpdateType, context) => {
  //       queryClient.setQueryData(["notes"], context?.previousNote);
  //       throw error;
  //     },
  //     onSettled: () => {
  //       // console.log(note);
  //       queryClient.invalidateQueries(["notes"]);
  //     },
  //   }
  // );
};

export default useNoteUpdate;
