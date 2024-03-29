import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const NavModal = ({ children, onClose, className }) => {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;

    modal.showModal();

    return () => {
      modal.close();
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm backdrop-filter"></div>

      <dialog
        ref={dialog}
        className={`rounded-md bg-white px-8 py-4 ${className}`}
        onClose={onClose}
      >
        {children}
      </dialog>
    </>,
    document.getElementById("wishModal-root"),
  );
};

export default NavModal;
