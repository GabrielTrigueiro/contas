import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal, { ModalProps } from "@mui/material/Modal";

export const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface CustomModalProps {
  open: boolean;
  children?: React.ReactNode;
  handleOpen: () => void;
  handleClose: () => void;
}

export default function CustomModal({
  open,
  children,
  handleClose,
  handleOpen,
}: CustomModalProps & ModalProps) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>{children}</Box>
    </Modal>
  );
}
