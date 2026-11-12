import { deleteNote } from "@/lib/api";
import { Note } from "@/types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteList.module.css";
import Link from "next/link";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
  });
  return (
    <ul className={css.list}>
      {notes.map((el) => (
        <li key={el.id} className={css.listItem}>
          <h2 className={css.title}>{el.title}</h2>
          <p className={css.content}>{el.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{el.tag}</span>
            <Link href={`/notes/${el.id}`}>View details</Link>

            <button
              className={css.button}
              onClick={() => {
                mutate(el.id);
              }}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
