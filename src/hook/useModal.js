import { useState } from "react";

export const useModal = (initialValue) => {
  const [open, setOpen] = useState(initialValue);

  return {
    open,
    setOpen,
  };
};
