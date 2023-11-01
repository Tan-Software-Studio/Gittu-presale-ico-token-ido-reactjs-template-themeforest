import styled from "styled-components";

import BackgroundImg from "../../../assets/images/banner/banner-bg-2.png";

const BannerWrapper = styled.div`
  background-image: url(${BackgroundImg});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  min-height: 100vh;
  padding: 182px 0 60px 0;
  position: relative;
  z-index: 0;

  &::before {
    z-index: -1;
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.colors.bgBannerV2};
  }

  &::after {
    z-index: -1;
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.colors.linearGradientBanner};
  }

  .banner-title {
    font-family: ${({ theme }) => theme.fonts.primary};
    font-weight: 700;
    font-size: 70px;
    line-height: 90px;
    text-align: center;
    color: ${({ theme }) => theme.colors.white};
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;

    img {
      width: 100px;
      height: 50px;
      border-radius: 50px;
    }
  }

  .banner-title-extra {
    font-family: ${({ theme }) => theme.fonts.primary};
    font-weight: 700;
    font-size: 70px;
    line-height: 90px;
    text-align: center;
    color: ${({ theme }) => theme.colors.white};
  }

  .gittu-banner-card {
    background: ${({ theme }) => theme.colors.white}1a;
    backdrop-filter: blur(10px);
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    align-items: center;

    &-left,
    &-right {
      width: 100%;
    }

    &-left {
      background: ${({ theme }) => theme.colors.white}0d;
    }

    &-left-content {
      padding: 20px 40px 40px 40px;

      h5 {
        line-height: 33px;
      }
    }

    &-right {
      padding: 40px;
    }
  }

  .presale-top {
    padding: 27.5px 40px;
    background: ${({ theme }) => theme.colors.white}1a;
    border-radius: 20px 0px 0px 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;

    h5 {
      font-family: ${({ theme }) => theme.fonts.primary};
    }
  }

  .presale-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 30px;

    .presale-item-inner {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    h6 {
      font-weight: 500;
      font-size: 15px;
      line-height: 30px;
      text-transform: uppercase;
      color: ${({ theme }) => theme.colors.white};
    }

    input {
      width: 100%;
      padding: 16px;
      background: ${({ theme }) => theme.colors.white}0d;
      border: 2px solid ${({ theme }) => theme.colors.white}1a;
      border-radius: 10px;
      font-weight: 600;
      font-size: 18px;
      line-height: 18px !important;
      color: ${({ theme }) => theme.colors.white};
      transition: 0.3s;

      &:focus {
        outline: none;
      }
    }
  }

  @media screen and (max-width: 991px) {
    .banner-title,
    .banner-title-extra {
      font-size: 55px;
      line-height: 70px;
    }

    .gittu-banner-card {
      flex-direction: column;
    }
  }

  @media screen and (max-width: 767px) {
    .banner-subtitle {
      br {
        display: none;
      }
    }
  }

  @media screen and (max-width: 575px) {
    .gittu-banner-card {
      &-left-content {
        padding: 20px 30px 30px 30px;
      }

      &-right {
        padding: 30px;
      }
    }

    .presale-top {
      padding: 25px 30px;
    }

    .presale-item {
      align-items: flex-start;
      flex-direction: column;
    }
  }

  @media screen and (max-width: 480px) {
    .banner-title,
    .banner-title-extra {
      font-size: 38px;
      line-height: 60px;
    }
  }

  @media screen and (max-width: 375px) {
    .gittu-banner-card {
      .count-item:not(:last-child)::before {
        font-size: 20px;
        line-height: 40px;
      }
      .count-item:not(:last-child) {
        padding-right: 15px;
      }
      
      .count {
        font-size: 20px;
        line-height: 40px;
      }

      .label {
        font-size: 14px;
        line-height: 40px;
      }
    }
  }
`;

export default BannerWrapper;
