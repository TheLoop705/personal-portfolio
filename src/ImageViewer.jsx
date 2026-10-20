import { createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./ImageViewer.css";

const ImageViewerContext = createContext(null);

export function useImageViewer() {
  return useContext(ImageViewerContext);
}

export function ImageLink({ children, ...props }) {
  const { openImage } = useImageViewer();
  return (
    <a
      {...props}
      aria-haspopup="dialog"
      onClick={(event) => {
        event.preventDefault();
        const image = event.currentTarget.querySelector("img");
        openImage({
          src: props.href,
          alt: image?.alt || "",
          trigger: event.currentTarget,
        });
      }}
    >
      {children}
    </a>
  );
}

function ImageDialog({ image, onClose }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (dialog.showModal) dialog.showModal();
    else dialog.setAttribute("open", "");
    closeRef.current.focus();
    return () => {
      if (dialog.open && dialog.close) dialog.close();
      document.body.style.overflow = previousOverflow;
      if (image.trigger.isConnected)
        image.trigger.focus({ preventScroll: true });
    };
  }, [image]);

  return createPortal(
    <dialog
      ref={dialogRef}
      className="image-viewer"
      aria-label="Enlarged image"
      aria-modal="true"
      onClose={(event) => { if (!event.currentTarget.open) onClose(); }}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === "Tab") {
          event.preventDefault();
          closeRef.current.focus();
        }
        if (event.key === "Escape") {
          event.preventDefault();
          event.stopPropagation();
          onClose();
        }
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <button
        ref={closeRef}
        type="button"
        className="image-viewer__close"
        aria-label="Close enlarged image"
        onClick={onClose}
      >
        <svg
          aria-hidden="true"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="m6 6 12 12M18 6 6 18" />
        </svg>
      </button>
      <figure className="image-viewer__figure">
        <img src={image.src} alt={image.alt} />
        <figcaption>{image.alt}</figcaption>
      </figure>
    </dialog>,
    document.body,
  );
}

export default function ImageViewerProvider({ children }) {
  const [image, setImage] = useState(null);
  return (
    <ImageViewerContext.Provider
      value={{ openImage: setImage, isOpen: Boolean(image) }}
    >
      {children}
      {image && <ImageDialog image={image} onClose={() => setImage(null)} />}
    </ImageViewerContext.Provider>
  );
}
