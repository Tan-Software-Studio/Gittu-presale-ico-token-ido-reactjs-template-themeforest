import styled from "styled-components";

const HeaderWrapper = styled.nav`
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
    gap: 30px;
    justify-content: space-between;
  }

  .gittu-header-left {
    display: flex;
    align-items: center;
    gap: 60px;

    .gittu-header-logo {
      width: 145px;
      img {
        width: 100%;
      }
    }
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

  .gittu-header-right {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .gittu-header-right-menu {
    display: flex;
    align-items: center;
    gap: 40px;
  }

  .social-links {
    display: flex;
    align-items: center;
    gap: 40px;
    li a {
      transition: 0.3s;
      img {
        width: 24px;
        transition: 0.3s;
      }
      &:hover {
        opacity: 0.7;
      }
    }
  }

  @media screen and (max-width: 991px) {
    .gittu-header-menu-toggle {
      display: block;
    }

    .gittu-header-right-menu {
      .social-links {
        display: none;
      }
    }

    .gittu-header-content {
      gap: 20px;
    }

    .gittu-header-left {
      gap: 30px;
    }

    .gittu-header-right {
      flex-direction: row-reverse;
    }
  }

  @media screen and (max-width: 480px) {
    .gittu-header-left {
      gap: 15px;
    }

    .gittu-header-logo {
      flex: 0 0 auto;
      max-width: 100px;
    }

    .demo-btn {
      display: none;
    }

    .gittu-header-right {
      gap: 10px;
    }
  }

  @media screen and (max-width: 375px) {
    .gittu-header-content {
      gap: 15px;
    }
  }
`;

export default HeaderWrapper;
