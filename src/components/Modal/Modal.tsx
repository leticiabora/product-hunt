import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as S from './Modal.styles';
import { ChevronIcon, CloseIcon } from '@/assets/icons';

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

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalStyle;
    };
  }, [onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <S.Overlay role="dialog" aria-modal="true" onClick={onClose}>
      <S.Content onClick={(e) => e.stopPropagation()}>
      <S.GoBackButtonContainer>
        <S.GoBackButton>
          <ChevronIcon width={30} height={30} />
        </S.GoBackButton>
      </S.GoBackButtonContainer>
        <S.CloseButton onClick={onClose}>
          <CloseIcon width={30} height={30} />
        </S.CloseButton>
        <S.Container>{children}</S.Container>
      </S.Content>
    </S.Overlay>,
    document.body,
  );
};

export default Modal;
