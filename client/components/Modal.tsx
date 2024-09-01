import React from 'react';
import { useEffect } from 'react';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ show, onClose, children }: ModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!show) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-content" role="document">
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
