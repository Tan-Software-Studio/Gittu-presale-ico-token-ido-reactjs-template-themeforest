import styled, { css } from "styled-components";

const ButtonWrapper = styled.button`
  background: ${({ theme }) => theme.colors.primary}26;
  backdrop-filter: blur(7.5px);
  border-radius: 30px;
  border: 0;
  padding: 17px 47px;
  font-family: ${({ theme }) => theme.fonts.outfit};
  font-weight: 700;
  font-size: 15px;
  line-height: 26px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: 0.3s;

  &:hover {
    background: ${({ theme }) => theme.colors.primary}40;
  }

  ${({ large }) =>
    large &&
    css`
      padding: 17px;
      width: 100%;
      background: ${({ theme }) => theme.colors.primary};
      color: #0e1117;
      transition: 0.3s;

      &:hover {
        background: ${({ theme }) => theme.colors.primary}b3;
      }
    `}

  ${({ variant }) =>
    variant === "green" &&
    css`
      padding: 17px;
      min-width: 245px;
      background: ${({ theme }) => theme.colors.conicGradient};
      border-radius: 50px;
      color: ${({ theme }) => theme.colors.white};
      transition: 0.3s;

      &:hover {
        background: ${({ theme }) => theme.colors.conicGradient};
      }
    `}

${({ variant }) =>
    variant === "gradient" &&
    css`
      padding: 17px;
      min-width: 270px;
      background: ${({ theme }) => theme.colors.linearGradient};
      border-radius: 50px;
      font-weight: 700;
      font-size: 15px;
      line-height: 26px;
      color: ${({ theme }) => theme.colors.white};
      transition: 0.3s;

      &:hover {
        background: ${({ theme }) => theme.colors.linearGradient};
      }
    `}

${({ variant }) =>
    variant === "gradient2" &&
    css`
      padding: 17px;
      min-width: 270px;
      background: ${({ theme }) => theme.colors.linearGradient2};
      border-radius: 50px;
      font-weight: 700;
      font-size: 15px;
      line-height: 26px;
      color: ${({ theme }) => theme.colors.white};
      transition: 0.3s;

      &:hover {
        background: ${({ theme }) => theme.colors.linearGradient2};
      }
    `}

${({ variant }) =>
    variant === "connect" &&
    css`
      padding: 12px;
      min-width: 185px;
      background: ${({ theme }) => theme.colors.white}33;
      border-radius: 50px;
      color: ${({ theme }) => theme.colors.white};
      transition: 0.3s;

      &:hover {
        background: ${({ theme }) => theme.colors.white}33;
      }

      .short-address {
        display: none;
      }
    `}

  @media screen and (max-width: 767px) {
    ${({ variant }) =>
      variant === "connect" &&
      css`
        padding: 10px 20px;
        min-width: auto;
        span {
          display: none;
        }
        .short-address {
          display: block;
        }
      `}
  }

  @media screen and (max-width: 575px) {
    ${({ variant }) =>
      variant === "green" &&
      css`
        min-width: unset;
        width: 100%;
      `}
  }
`;

export default ButtonWrapper;
