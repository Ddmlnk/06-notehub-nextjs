"use client";

import { useState } from "react";
import css from "./Notes.module.css";
import Pagination from "@/components/Pagination/Pagination";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { useDebouncedCallback } from "use-debounce";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import SearchBox from "@/components/SearchBox/SearchBox";
export default function Notes() {
  const [page, setPage] = useState(1);
  const [openCreation, setOpenCreation] = useState(false);
  const [query, setQuery] = useState("");

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setQuery(value);
    setPage(1);
  }, 2000);

  const { data } = useQuery({
    queryKey: ["notes", page, query],
    queryFn: () => fetchNotes(page, query),
    placeholderData: keepPreviousData,
  });

  const handleCreateNote = () => {
    if (!openCreation) {
      setOpenCreation(true);
    }
  };
  const handleModalClose = () => {
    setOpenCreation(false);
  };
  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox debouncedSearch={debouncedSearch} />
        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            page={page}
            setPage={handlePageChange}
          />
        )}
        <button className={css.button} onClick={handleCreateNote}>
          Create note +
        </button>
      </div>
      {data && <NoteList notes={data.notes} />}
      {openCreation && (
        <Modal onClose={handleModalClose}>
          {<NoteForm onClose={handleModalClose} />}
        </Modal>
      )}
    </div>
  );
}
