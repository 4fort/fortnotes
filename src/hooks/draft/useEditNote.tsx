import { useQueryClient } from "@tanstack/react-query";
import { NoteType } from "../../types/shared.types";

const useEditNote = (noteId?: NoteType["id"]) => {
  const queryClient = useQueryClient();

  const noteData = queryClient
    .getQueriesData<NoteType[]>(["notes"])[0][1]
    ?.filter((note: NoteType) => note.id === noteId);
  queryClient.setQueryData(["dialog_fields", noteId], () => noteData);

  return queryClient.getQueryData(["dialog_fields", noteId]);
};

export default useEditNote;
