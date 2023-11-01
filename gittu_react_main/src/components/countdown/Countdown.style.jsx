import styled, { css } from "styled-components";

const CountdownWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;

  .count-item {
    display: flex;
    align-items: baseline;
    position: relative;
    &:not(:last-child) {
      padding-right: 25px;

      &::before {
        position: absolute;
        content: ":";
        top: 0;
        right: -5px;
        font-family: ${({ theme }) => theme.fonts.primary};
        font-weight: 700;
        font-size: 40px;
        line-height: 60px;
        color: ${({ theme }) => theme.colors.white}33;
      }
    }
  }

  .count {
    font-family: ${({ theme }) => theme.fonts.primary};
    font-weight: 700;
    font-size: 40px;
    line-height: 60px;
    color: ${({ theme }) => theme.colors.white};
  }

  .label {
    font-weight: 700;
    font-size: 24px;
    line-height: 59px;
    color: ${({ theme }) => theme.colors.white};
  }

  @media screen and (max-width: 1199px) {
    gap: 20px;

    .count-item {
      &:not(:last-child) {
        padding-right: 20px;

        &::before {
          font-size: 30px;
          line-height: 50px;
        }
      }
    }

    .count {
      font-size: 30px;
      line-height: 50px;
    }

    .label {
      font-size: 20px;
      line-height: 50px;
    }
  }

  @media screen and (max-width: 480px) {
    gap: 10px;

    .count-item {
      &:not(:last-child) {
        padding-right: 10px;

        &::before {
          font-size: 22px;
          line-height: 40px;
        }
      }
    }

    .count {
      font-size: 22px;
      line-height: 40px;
    }

    .label {
      font-size: 15px;
      line-height: 40px;
    }
  }

  ${({ medium }) =>
    medium &&
    css`
      gap: 20px;
      .count-item {
        &:not(:last-child) {
          padding-right: 20px;

          &::before {
            font-weight: 700;
            font-size: 30px;
            line-height: 50px;
            color: ${({ theme }) => theme.colors.white}33;
          }
        }
      }

      .count {
        font-weight: 700;
        font-size: 30px;
        line-height: 50px;
        color: ${({ theme }) => theme.colors.white};
      }

      .label {
        font-weight: 700;
        font-size: 18px;
        line-height: 50px;
        color: ${({ theme }) => theme.colors.white};
      }
    `}

  ${({ font }) =>
    font === "orbitron" &&
    css`
      .count-item {
        &:not(:last-child) {
          &::before {
            font-family: ${({ theme }) => theme.fonts.secondary};
          }
        }
      }

      .count {
        font-family: ${({ theme }) => theme.fonts.secondary};
      }

      .label {
        font-family: ${({ theme }) => theme.fonts.secondary};
      }
    `}
`;

export default CountdownWrapper;
