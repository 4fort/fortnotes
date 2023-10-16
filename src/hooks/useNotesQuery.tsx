import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { getNotes } from "../api";
import { NoteType } from "../types/shared.types";

const useNotesQuery = (): UseQueryResult<NoteType[] | null> => {
  const key = ["notes"];

  // REACT QUERY
  return useQuery(key, async (): Promise<NoteType[] | null> => {
    // SUPABASE QUERY
    return getNotes().then((result) => result.data);
  });
};

export default useNotesQuery;
