import { useQueryClient } from "@tanstack/react-query";

const useNoteRefetch = () => {
  const queryClient = useQueryClient();

  const refetch = async () => {
    await queryClient.cancelQueries(["notes"]);

    const previouseNotes = queryClient.getQueriesData(["notes"]);

    await queryClient.invalidateQueries(["notes"]).catch((error) => {
      console.log(error);
      queryClient.setQueryData(["notes"], previouseNotes);
    });
  };

  return refetch;
};

export default useNoteRefetch;
