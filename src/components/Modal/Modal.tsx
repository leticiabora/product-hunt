import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div role="dialog" aria-modal="true" onClick={onClose} style={{ position: 'fixed', left: 0, right: 0, bottom: 0, top: 0, backgroundColor: '#000', opacity: '70%', overflow: 'hidden' }}>
      <div onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>X</button>
        <div style={{ overflowY: 'scroll' }}>
        {children}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
