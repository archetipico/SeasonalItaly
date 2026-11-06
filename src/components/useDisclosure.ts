import { useEffect, useRef, useState } from "react";

/** State and controls of one panel. */
export type Disclosure = ReturnType<typeof useDisclosure>;

/**
 * Hold the open state of a panel that closes on Escape and gives focus back to its button.
 * @returns Open flag, open, close and toggle callbacks, ref for the button.
 */
export function useDisclosure() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const close = () => {
    setIsOpen(false);
    toggleRef.current!.focus();
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return { isOpen, open: () => setIsOpen(true), close, toggle: () => setIsOpen(!isOpen), toggleRef };
}
