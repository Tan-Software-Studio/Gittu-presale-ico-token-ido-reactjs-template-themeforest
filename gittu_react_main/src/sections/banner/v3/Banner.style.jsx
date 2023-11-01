import styled from "styled-components";

import MeshGrad from "../../../assets/images/banner/mesh-grad-3.png";

const BannerWrapper = styled.div`
  background: #0b0c12;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  z-index: 0;

  &::before {
    z-index: -1;
    position: absolute;
    content: url(${MeshGrad});
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .gittu-container {
    max-width: 1800px;
    width: calc(100% - 20px);
    margin-left: auto;
    margin-right: 0;
  }

  .gittu-row {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    > * {
      max-width: 100%;
    }
  }

  .gittu-col-left {
    flex: 0 0 auto;
    width: 44%;
    padding-top: 75px;
  }

  .gittu-col-right {
    flex: 0 0 auto;
    width: 47%;
  }

  .banner-title {
    display: flex;
    align-items: center;
    gap: 15px;
    flex-wrap: wrap;
    text-transform: uppercase;
    font-weight: 900;
    font-size: 60px;
    line-height: 85px;
    color: ${({ theme }) => theme.colors.white};
    span {
      color: ${({ theme }) => theme.colors.themeGreen};
    }
  }

  .stage-info {
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: space-between;
    h5 {
      text-transform: uppercase;
      font-weight: 600;
      font-size: 15px;
      line-height: 36px;
      color: ${({ theme }) => theme.colors.white};
    }
  }

  .banner-right {
    position: relative;

    &-img {
      width: 100%;
      height: 100vh;
      max-height: 100%;
      img {
        object-fit: cover;
        width: 100%;
        height: 100vh;
        max-height: 100%;
      }
    }
  }

  .presale-card {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 40px 120px;
    background: ${({ theme }) => theme.colors.white}1a;
    backdrop-filter: blur(10px);

    &-header {
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      h5 {
        font-weight: 600;
        font-size: 18px;
        line-height: 30px;
        text-transform: uppercase;
        color: ${({ theme }) => theme.colors.white};
      }
    }
  }

  .social-links {
    margin-top: 100px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 20px;
    flex-wrap: wrap;
    li a {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: ${({ theme }) => theme.colors.white}26;
      backdrop-filter: blur(10px);
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

  @media screen and (max-width: 1850px) {
    .gittu-container {
      max-width: 1750px;
    }
  }

  @media screen and (max-width: 1780px) {
    .gittu-container {
      max-width: 1720px;
    }

    .gittu-row {
      gap: 50px;
    }

    .gittu-col-left {
      width: 48%;
    }

    .gittu-col-right {
      width: 48%;
    }
  }

  @media screen and (max-width: 1899px) {
    .gittu-container {
      max-width: 1780px;
    }
  }

  @media screen and (max-width: 1699px) {
    .gittu-container {
      max-width: 1640px;
    }
  }

  @media screen and (max-width: 1599px) {
    .gittu-container {
      max-width: 1540px;
    }
  }

  @media screen and (max-width: 1499px) {
    .gittu-container {
      max-width: 1430px;
    }

    .presale-card {
      padding: 40px 80px;
    }
  }

  @media screen and (max-width: 1380px) {
    .gittu-container {
      max-width: 100%;
      width: 100%;
      margin: 0;
    }

    .gittu-row {
      width: 100%;
      display: flex;
      gap: 0px;
    }

    .gittu-col-left {
      width: 50%;
    }

    .gittu-col-right {
      width: 50%;
    }

    .banner-left {
      padding: 0 20px;
    }

    .banner-title {
      gap: 10px;
      font-size: 38px;
      line-height: 60px;
    }

    .presale-card {
      padding: 30px 20px;
    }

    .social-links {
      margin-top: 100px;
      gap: 15px;
      li a {
        width: 45px;
        height: 45px;
      }
    }
  }

  @media screen and (max-width: 991px) {
    padding-top: 150px;

    .gittu-row {
      width: 100%;
      display: flex;
      gap: 50px;
    }

    .gittu-col-left {
      width: 100%;
      padding-top: 0px;
    }

    .gittu-col-right {
      width: 100%;
    }

    .banner-left {
      padding: 0 20px;
    }

    .banner-right {
      &-img {
        height: 100%;
        img {
          height: 100%;
        }
      }
    }

    .presale-card {
      &-header {
        align-items: center;
      }
    }

    .social-links {
      margin-top: 60px;
      justify-content: center;
    }
  }

  @media screen and (max-width: 991px) {
    .banner-title {
      font-size: 30px;
      line-height: 50px;
    }

    .banner-body {
      max-width: 525px;
    }
  }

  @media screen and (max-width: 767px) {
    .social-links {
      margin-top: 40px;
    }
  }
`;

export default BannerWrapper;
