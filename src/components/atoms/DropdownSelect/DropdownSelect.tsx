import { useState, useRef } from "react";
import { Choice } from "@/types/categoryFeildsTypes";
import styles from "./DropdownSelect.module.css";
import SEARCHICON from "@/assets/icons/search.svg";
import Image from "next/image";

interface DropdownSelectProps {
  choices: Choice[];
  value: string;
  onChange: (value: string) => void;
}

const DropdownSelect = ({ choices, value, onChange }: DropdownSelectProps) => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredChoices = choices?.filter((c) =>
    c.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className={styles.searchSelect}
      ref={containerRef}
      onBlur={() => setOpen(false)}
      tabIndex={0}
    >
      <div className={styles.searchSelectWrapper}>
        <Image src={SEARCHICON} alt="search" />
        <input
          className={styles.searchSelectInput}
          value={
            (search ||
              choices?.filter((v) => {
                v.value === value;
              })[0]?.label) ??
            ""
          }
          placeholder="Search"
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onFocusCapture={() => {
            setOpen(true);
          }}
          onBlurCapture={() => {
            setOpen(false);
          }}
        />
      </div>

      {open && (
        <ul className={styles.searchSelectList}>
          {filteredChoices?.length === 0 && (
            <li className={styles.searchSelectEmpty}>No results</li>
          )}

          {filteredChoices?.map((c) => (
            <li
              key={c.id}
              className={styles.searchSelectItem}
              onMouseDown={() => {
                onChange(c.value);
                setSearch(c.label);
                setOpen(false);
              }}
            >
              {c.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownSelect;
