import { useEffect, useRef, useState } from "react";

export const useDropdown = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [open, toggle] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    toggle(!open);
  };

  const closeDropdown = () => {
    toggle(false);
  };

  return { dropdownRef, open, toggleDropdown, closeDropdown };
};
