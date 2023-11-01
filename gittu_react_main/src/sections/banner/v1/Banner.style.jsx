import styled from "styled-components";

import MeshGrad1 from "../../../assets/images/banner/mesh-grad-1.png";
import MeshGrad2 from "../../../assets/images/banner/mesh-grad-2.png";

const BannerWrapper = styled.div`
  background: #0b0c12;
  min-height: 100vh;
  padding: 168px 0 40px 0;
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
    background-image: url(${MeshGrad1});
    background-repeat: no-repeat;
    background-position: top center;
  }

  &::after {
    z-index: -1;
    position: absolute;
    content: "";
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${MeshGrad2});
    background-repeat: no-repeat;
    background-position: bottom center;
  }

  .banner-title {
    font-family: ${({ theme }) => theme.fonts.orbitron};
    font-weight: 700;
    font-size: 70px;
    line-height: 90px;
    text-align: center;
    color: ${({ theme }) => theme.colors.white};
  }

  .social-links {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;

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

  @media screen and (max-width: 991px) {
    .banner-title {
      font-size: 58px;
      line-height: 80px;
    }

    .social-links {
      gap: 15px;
    }
  }

  @media screen and (max-width: 767px) {
    .banner-title {
      font-size: 40px;
      line-height: 60px;
    }
  }

  @media screen and (max-width: 575px) {
    .banner-title {
      font-size: 34px;
      line-height: 50px;
    }
  }
`;

export default BannerWrapper;
