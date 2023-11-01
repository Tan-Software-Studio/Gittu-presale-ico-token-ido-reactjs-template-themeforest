import styled, { css } from "styled-components";

import MeshGradModal from "../../assets/images/modal/overlay1.png";
import MeshGradModal2 from "../../assets/images/modal/overlay2.png";

const ModalWrapper = styled.div`
  position: fixed;
  z-index: 99999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: center;

  .overlay {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.colors.bgModalOverlay};
    backdrop-filter: blur(5px);
    z-index: -1;
  }

  .gittu-modal-content {
    width: 530px;
    max-width: 100%;
    height: auto;
    background: ${({ theme }) => theme.colors.bgModal};
    border-radius: 20px;
    overflow: hidden;
    padding: 40px;
    position: relative;
    z-index: 0;
    animation: 0.3s modalContentAnimation;

    &::before {
      position: absolute;
      content: "";
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      background-image: url(${MeshGradModal});
      background-repeat: no-repeat;
      background-position: top center;
      z-index: -1;
    }
  }

  ${({ variant }) =>
    variant === "v2" &&
    css`
      .gittu-modal-content {
        &::before {
          left: -76px;
          background-image: url(${MeshGradModal2});
        }
      }
    `}

  @keyframes modalContentAnimation {
    from {
      transform: translateY(-20px);
    }
    to {
      transform: translateY(0%);
    }
  }

  .gittu-modal-header {
    margin-bottom: 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;

    button {
      border: 0;
      background: transparent;
      font-size: 20px;
      color: ${({ theme }) => theme.colors.white};
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .token-info-list {
    display: flex;
    flex-direction: column;
    gap: 8px;

    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      flex-wrap: wrap;
      padding-bottom: 11px;
      border-bottom: 1px dashed ${({ theme }) => theme.colors.white}1a;
    }

    li p {
      font-weight: 500;
      font-size: 15px;
      line-height: 30px;
      color: ${({ theme }) => theme.colors.white};
    }
  }

  h6 {
    margin-bottom: 10px;
    font-weight: 500;
    font-size: 15px;
    line-height: 30px;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.white};
  }

  input {
    width: 100%;
    padding: 16px 16px 15px;
    background: ${({ theme }) => theme.colors.white}0d;
    border: 2px solid ${({ theme }) => theme.colors.white}1a;
    border-radius: 10px;
    font-weight: 600;
    font-size: 18px;
    line-height: 18px;
    color: ${({ theme }) => theme.colors.white};
    transition: 0.3s;

    &:focus {
      outline: none;
    }
  }

  .input-group {
    width: 100%;
    display: flex;

    input {
      width: 60%;
    }

    &-dropdown {
      width: 40%;
    }

    button {
      border-radius: 0 10px 10px 0;
    }
  }

  .btn-approve {
    min-width: unset;
  }

  @media screen and (max-width: 575px) {
    .gittu-modal-content {
      width: calc(100% - 40px);
      max-width: 100%;
    }
  }

  @media screen and (max-width: 480px) {
    .gittu-modal-content {
      padding: 20px;
    }

    .gittu-modal-header {
      margin-bottom: 20px;
      h4 {
        font-size: 13px;
      }
    }

    .gittu-modal-body {
      h5 {
        font-size: 14px;
      }
    }

    .input-group {
      flex-direction: column;
      gap: 10px;

      input,
      &-dropdown {
        width: 100%;
      }

      input,
      button {
        border-radius: 10px !important;
      }
    }
  }
`;

export default ModalWrapper;
