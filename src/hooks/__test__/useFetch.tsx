import { useEffect, useState } from "react";
import supabase from "../../config/supabaseClient";
import { NoteType } from "../../types/shared.types";

interface UseFetchTypes {
  notes: NoteType[] | null;
  isLoading: boolean;
  fetchError: string | null;
  refetch: () => void;
}

const useFetch = (): UseFetchTypes => {
  const [notes, setNotes] = useState<NoteType[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from("notes").select();

    if (error) {
      setFetchError(error.message);
      setNotes(null);
      setIsLoading(false);
      throw error;
    }
    if (data) {
      setNotes(data);
      setFetchError(null);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    fetchData();
  };

  return {
    notes,
    isLoading,
    fetchError,
    refetch,
  };
};

export default useFetch;
