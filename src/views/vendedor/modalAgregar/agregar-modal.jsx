import React from "react";
import "./agregar-modal.css";

const AgregarModal = ({ isOpen, onClose, children, className = "" }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backgroup" onClick={onClose}>
      <div
        className={`modal-container ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
export default AgregarModal;
