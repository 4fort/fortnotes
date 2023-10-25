import { useQueryClient } from "@tanstack/react-query";
import { NoteType } from "../types/shared.types";

const useNoteQueryById = (noteId: number | undefined): NoteType | undefined => {
  const queryClient = useQueryClient();

  if (!noteId) return undefined;
  const noteData: NoteType | undefined = queryClient
    .getQueryData<NoteType[]>(["notes"])
    ?.find((note: NoteType) => note.id === noteId);
  return noteData;
};

export default useNoteQueryById;
