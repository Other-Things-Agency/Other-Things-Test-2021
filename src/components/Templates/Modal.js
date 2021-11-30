import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import Portal from "./Portal";
import Link from "../Global/Link";

const Modal = forwardRef((props, ref) => {
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        handleClose();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  useImperativeHandle(ref, () => {
    return {
      openModal: () => handleOpen(),
      closeModal: () => handleClose(),
    };
  });

  const handleOpen = () => {
    setDisplay(true);
  };

  const handleClose = () => {
    setDisplay(false);
  };

  if (display) {
    return (
      <Portal>
        <div className="modal brand-modal" tabindex="-1">
          <div className="brand-modal-background" onClick={handleClose} />
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
              <div class="modal-header">
                {props.title && (
                  <h5 class="modal-title brand-font brand-text-blue">
                    {props.title}
                  </h5>
                )}
                <Link
                  to="/"
                  aria-label="Close"
                  icon="times"
                  onClick={handleClose}
                  className="ms-auto brand-font-size-1-5 brand-link-black"
                />
              </div>
              {props.children}
            </div>
          </div>
        </div>
      </Portal>
    );
  }

  return null;
});

export default Modal;

const ModalBody = ({ children }) => {
  return (
    <div class="modal-body">
      <div class="container-fluid">{children}</div>
    </div>
  );
};

const ModalFooter = ({ children }) => {
  return <div class="modal-footer">{children}</div>;
};

export { ModalBody, ModalFooter };
