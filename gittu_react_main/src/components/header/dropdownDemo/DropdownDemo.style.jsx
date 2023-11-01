import styled from "styled-components";

const DropdownDemoStyles = styled.div`
  position: relative;
  &:hover .dropdown-demo-list {
    visibility: visible;
    opacity: 1;
    transform: scale(1) translateY(0);
  }

  .demo-btn {
    width: 50px;
    height: 50px;
    border: 0;
    border-radius: 25px;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(7.5px);
    font-size: 22px;
    color: ${({ theme }) => theme.colors.white};
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .dropdown-demo-list {
    position: absolute;
    top: calc(100% + 10px);
    left: 0;
    width: 170px;
    border-radius: 15px;
    background-color: #2a2b33;
    padding: 10px 20px;
    opacity: 0;
    visibility: hidden;
    transform: scale(0.75) translateY(-21px);
    transition: 0.3s;

    &.active {
      visibility: visible;
      opacity: 1;
      transform: scale(1) translateY(0);
    }

    li a {
      font-family: ${({ theme }) => theme.fonts.primary};
      font-weight: 500;
      font-size: 15px;
      line-height: 40px;
      color: ${({ theme }) => theme.colors.white};
      transition: 0.3s;

      &:hover {
        opacity: 0.7;
      }
    }
  }
`;

export default DropdownDemoStyles;
