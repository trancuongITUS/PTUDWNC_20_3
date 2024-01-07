import { useState } from 'react';

type Dialog = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const useDialog = (): Dialog => {
  const [isOpen, setOpen] = useState(false);

  const open = () => {
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
  };

  const toggle = () => {
    setOpen(isOpen => !isOpen);
  };

  return { isOpen, open, close, toggle };
};

export default useDialog;
