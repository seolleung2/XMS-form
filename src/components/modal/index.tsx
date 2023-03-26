import { FunctionComponent, PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import Button from '@components/button';

type Props = {
  title: string;
  type?: string;
  onClose: () => void;
};

const Modal: FunctionComponent<PropsWithChildren<Props>> = ({
  children,
  title,
  type = 'info',
  onClose,
}) => {
  return (
    <BackdropWrapper>
      <ModalContent type={type}>
        <div className="modalHeader">
          <span>{title}</span>
          <span
            className="absolute -right-3 w-8 cursor-pointer text-lg hover:text-xl hover:font-semibold"
            onClick={onClose}
          >
            X
          </span>
        </div>
        <div className="modalContent">{children}</div>
        <div className="modalFooter">
          <Button type="button" text="닫기" handleClick={onClose} />
        </div>
      </ModalContent>
    </BackdropWrapper>
  );
};

export default Modal;

const BackdropWrapper = styled.div`
  position: fixed;
  top: -48px;
  left: 0;
  width: 100%;
  height: 120vh;
  z-index: 30;
  background-color: rgba(0, 0, 0, 0.75);
`;

const ModalContent = styled.div<{ type: string }>`
  position: fixed;
  top: 5%;
  left: 5%;
  width: 90%;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 30;
  animation: slide-down 300ms ease-out forwards;

  .modalHeader {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 36px;
    background: ${({ type, theme }) =>
      type === 'warning' ? theme.colors.red : theme.colors.blue};
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    color: white;
    font-size: 16px;
    font-weight: semibold;
  }

  .modalContent {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 140px;
    font-size: 14px;
  }

  .modalFooter {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background-color: #efefef;
    height: 48px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    font-size: 16px;
    color: white;

    button {
      width: 56px;
      height: 32px;
      padding: 4px 0;
      border-radius: 4px;
      font-size: 14px;
      background-color: ${({ theme }) => theme.colors.stone};
      opacity: 0.8;
    }

    button:hover {
      opacity: 1;
    }
  }

  @media (min-width: 768px) {
    width: 30rem;
    left: calc(50% - 15rem);
  }

  @keyframes slide-down {
    from {
      opacity: 0;
      transform: translateY(-3rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
