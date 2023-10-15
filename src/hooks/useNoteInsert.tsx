import { useMutation } from "@tanstack/react-query";
import { insertNote } from "../api";
import { NoteType } from "../types/shared.types";

const useNoteInsert = () => {
  return useMutation(async (note: NoteType) => {
    return insertNote(note).then((result) => result.data);
  });
};

export default useNoteInsert;
