import { useQuery } from "@tanstack/react-query";
import { getNotes } from "../api";

const useNotesQuery = () => {
  const key = ["notes"];

  return useQuery(key, async () => {
    return getNotes().then((result) => result.data);
  });
};

export default useNotesQuery;
