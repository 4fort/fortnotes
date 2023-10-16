import supabase from "../config/supabaseClient";
import { NoteType } from "../types/shared.types";

export const getNotes = () => {
  return supabase.from("notes").select();
};

export const insertNote = (note: NoteType) => {
  return supabase.from("notes").insert(note);
};

export const selectNote = (noteId: number) => {};
