import { useState } from "react";
import { NoteType } from "../../types/shared.types";
import supabase from "../../config/supabaseClient";

interface UseInsertProps {
  title: NoteType["title"];
  context: NoteType["context"];
  is_pinned: NoteType["is_pinned"];
}

interface UseInsertTypes {
  newNote: NoteType | null;
  isLoading: boolean;
  insertError: string | null;
  insertData: () => void;
}

const useInsert = (props: UseInsertProps): UseInsertTypes => {
  const { title, context, is_pinned } = props;
  const [newNote, setNewNote] = useState<NoteType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [insertError, setInsertError] = useState<string | null>(null);

  const insertData = async () => {
    const { data, error } = await supabase
      .from("notes")
      .insert([{ title, context, is_pinned }]);

    if (error) {
      setInsertError(error.message);
      setIsLoading(false);
      throw error;
    }
    if (data) {
      setNewNote(data);
      setInsertError(null);
      setIsLoading(false);
    }
  };

  return {
    newNote,
    isLoading,
    insertError,
    insertData,
  };
};

export default useInsert;
