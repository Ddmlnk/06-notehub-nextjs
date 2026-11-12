import css from "./SearchBox.module.css";
import { ChangeEvent } from "react";

interface SearchBoxProps {
  debouncedSearch: (value: string) => void;
}

export default function SearchBox({ debouncedSearch }: SearchBoxProps) {
  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={handleSearchInput}
    />
  );
}
