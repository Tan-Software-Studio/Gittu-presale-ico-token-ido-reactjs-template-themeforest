import styled from "styled-components";

const HeaderWrapper = styled.div`
  position: absolute;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  padding: 25px 0;
  transition: 0.3s;

  &.sticky {
    background: ${({ theme }) => theme.colors.bgHeader};
  }

  .gittu-header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .gittu-header-left,
    .gittu-header-right {
      width: 40%;
    }

    .git-header-center {
      width: 20%;
    }

    .gittu-header-right {
      display: flex;
      align-items: center;
      justify-content: right;
    }
  }

  .gittu-header-left {
    display: flex;
    align-items: center;
    gap: 30px;
  }

  .gittu-header-menu-toggle {
    display: none;

    .menu-toggler {
      border: 0;
      padding: 0;
      background: transparent;
      color: ${({ theme }) => theme.colors.white};
      font-size: 30px;
    }
  }

  .social-links {
    display: flex;
    align-items: center;
    gap: 20px;
    li a {
      width: 50px;
      height: 50px;
      background: ${({ theme }) => theme.colors.white}26;
      backdrop-filter: blur(10px);
      border-radius: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 0.3s;
      img {
        transition: 0.3s;
      }
      &:hover {
        opacity: 0.7;
      }
    }
  }

  .gittu-header-left-menu {
    li a {
      font-family: ${({ theme }) => theme.fonts.primary};
      font-weight: 700;
      font-size: 15px;
      line-height: 26px;
      text-transform: uppercase;
      color: ${({ theme }) => theme.colors.white};
    }
  }

  .gittu-header-right-menu {
    display: flex;
    align-items: center;
    gap: 30px;
  }

  @media screen and (max-width: 991px) {
    .gittu-header-right {
      gap: 20px;
    }
    .gittu-header-menu-toggle {
      display: block;
    }

    .gittu-header-left {
      display: none;
    }

    .gittu-header-right-menu {
      gap: 20px;
    }

    .gittu-header-right {
      flex-direction: row-reverse;
    }
  }

  @media screen and (max-width: 480px) {
    .gittu-header-right {
      gap: 10px;
    }

    .gittu-header-logo {
      img {
        width: 60px;
      }
    }

    .gittu-header-right-menu {
      gap: 10px;
    }

    .demo-btn {
      display: none;
    }
  }
`;

export default HeaderWrapper;
