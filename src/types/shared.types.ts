export interface NoteType {
  id?: number;
  created_at?: string;
  title: string;
  context: string;
  is_pinned: boolean;
}

export interface NoteUpdateType {
  id: number;
  data: NoteType;
}
