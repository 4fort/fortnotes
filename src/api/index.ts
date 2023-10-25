import supabase from "../config/supabaseClient";
import { NoteType, NoteUpdateType } from "../types/shared.types";

export const getNotes = () => {
  return supabase.from("notes").select();
};

export const insertNote = (note: NoteType) => {
  return supabase.from("notes").insert(note);
};

export const updateNote = (params: NoteUpdateType) => {
  return supabase.from("notes").update(params.data).eq("id", params.id);
};
