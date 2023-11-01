import BannerWrapper from "./Banner.style";
import Countdown from "../../../components/countdown/Countdown";
import Progressbar from "../../../components/progressbar/Progressbar";
import Button from "../../../components/button/Button";

import Telegram from "../../../assets/images/icons/telegram.svg";
import Discord from "../../../assets/images/icons/discord.svg";
import Twitter from "../../../assets/images/icons/twitter.svg";
import Medium from "../../../assets/images/icons/medium.svg";
import Reddit from "../../../assets/images/icons/reddit.svg";
import Instagram from "../../../assets/images/icons/instagram.svg";
import Linkedin from "../../../assets/images/icons/linkedin.svg";

import { useState } from "react";
import Modal from "../../../components/modal/Modal";
import Data from "../../../assets/data/bannarV3";
import { useAccount, useContractRead } from "wagmi";
import { useEffect } from "react";
import {
  payWith,
  currentStageIdCall,
  currentStageInfoCall,
  maxStageCall,
  presaleTokenAmountCall,
  tokenNameCall,
  tokenSymbolCall,
  totalSoldCall,
} from "../../../contracts/config";
import { formatEther } from "viem";

const Banner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalHandle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const [maxStage, setMaxStage] = useState(0);
  const [currentStage, setCurrentStage] = useState(1);
  const [currentBonus, setCurrentBonus] = useState("20");
  const [currentPrice, setCurrentPrice] = useState("0.001");
  const [stageEnd, setStageEnd] = useState(1703916000);
  const [nextStage, setNextStage] = useState(0);
  const [nextPrice, setNextPrice] = useState("0.002");
  const [tokenName, setTokenName] = useState("GITTU TOKEN");
  const [tokenSymbol, setTokenSymbol] = useState("Test");
  const [presaleToken, setPresaleToken] = useState(10000);
  const [tokenSold, setTokenSold] = useState(2000);
  const [tokenPercent, setTokenPercent] = useState(20);

  const { isConnected } = useAccount();
  const { data: tokenNameData } = useContractRead({ ...tokenNameCall });
  const { data: tokenSymbolData } = useContractRead({ ...tokenSymbolCall });
  const { data: presaleTokenAmountData } = useContractRead({
    ...presaleTokenAmountCall,
  });
  const { data: totalSoldData } = useContractRead({ ...totalSoldCall });
  const { data: maxStageData } = useContractRead({ ...maxStageCall });
  const { data: currentStageIdData } = useContractRead({
    ...currentStageIdCall,
  });
  const { data: currentStageInfoData } = useContractRead({
    ...currentStageInfoCall,
    args: [currentStageIdData],
  });

  const { data: nextStageInfoData } = useContractRead({
    ...currentStageInfoCall,
    args: [nextStage],
  });

  useEffect(() => {
    if (isConnected) {
      if (tokenNameData) {
        setTokenName(tokenNameData);
      }
      if (tokenSymbolData) {
        setTokenSymbol(tokenSymbolData);
      }

      if (presaleTokenAmountData) {
        let tmp = formatEther(presaleTokenAmountData);
        setPresaleToken(tmp);
      }

      if (totalSoldData) {
        let tmp = formatEther(totalSoldData);
        setTokenSold(tmp.toString());
      }

      if (maxStageData) {
        setMaxStage(maxStageData.toString());
      }

      if (currentStageIdData) {
        setCurrentStage(currentStageIdData.toString());

        let tmp = parseInt(currentStageIdData);
        setNextStage(tmp + 1);

        if (maxStage < tmp + 1) {
          setNextStage(tmp);
        }
      }

      if (currentStageInfoData) {
        setCurrentBonus(currentStageInfoData[1].toString());

        let tmp = currentStageInfoData[2].toString() / 1e18;
        setCurrentPrice(tmp);

        setStageEnd(currentStageInfoData[4].toString());
      }

      if (nextStageInfoData) {
        let tmp = nextStageInfoData[2].toString() / 1e18;
        setNextPrice(tmp);
      }

      let _tokenPercent = parseInt((tokenSold * 100) / presaleToken);
      setTokenPercent(_tokenPercent);
      if (_tokenPercent > 100) {
        setTokenPercent(100);
      }
    }
  }, [
    isConnected,
    tokenNameData,
    tokenSymbolData,
    presaleTokenAmountData,
    totalSoldData,
    maxStageData,
    currentStageIdData,
    currentStageInfoData,
    nextStageInfoData,
    tokenSold,
    presaleToken,
    maxStage,
  ]);

  return (
    <>
      <BannerWrapper>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="mb-40 text-center">
                <div className="mb-20">
                  <h5 className="ff-outfit fw-600 text-white text-uppercase">
                    Pre-Sale Ends in{" "}
                  </h5>
                </div>
                <div className="mb-20 d-flex justify-content-center">
                  <Countdown endDate={stageEnd} font="orbitron" />
                </div>
                <div className="mb-20">
                  <h1 className="banner-title">
                    {Data.title}
                    <br />
                    {Data.titleExtra}
                  </h1>
                </div>
                <h5 className="ff-outfit text-white">{Data.subtitle}</h5>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="mb-2 d-flex align-items-center justify-content-between gap-1 flex-wrap">
                <h5 className="ff-orbitron fs-15 fw-600 text-white text-uppercase">
                  Stage {currentStage} : {currentBonus}% Bonus !
                </h5>
                <h5 className="ff-orbitron fs-15 fw-600 text-white text-uppercase">
                  {tokenSold} / {presaleToken}
                </h5>
              </div>

              <div className="mb-30">
                <Progressbar done={tokenPercent} variant="dashed" />
              </div>

              <div className="mb-30 text-center">
                <p className="ff-orbitron fs-15 fw-600 text-white text-uppercase">
                  1 {tokenSymbol} = {currentPrice} {payWith}
                </p>
                <p className="ff-orbitron fs-15 fw-600 text-white text-uppercase">
                  NEXT STAGE PRICE = {nextPrice} {payWith}
                </p>
              </div>

              <div className="mb-74 d-flex align-items-center justify-content-center">
                <Button variant="gradient" onClick={modalHandle}>
                  Buy now
                </Button>
              </div>

              <ul className="social-links">
                <li>
                  <a
                    href="https://web.telegram.org/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={Telegram} alt="icon" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={Discord} alt="icon" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={Twitter} alt="icon" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://medium.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={Medium} alt="icon" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.reddit.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={Reddit} alt="icon" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={Instagram} alt="icon" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={Linkedin} alt="icon" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </BannerWrapper>
      {isModalOpen && <Modal modalCloseHandle={modalHandle} />}
    </>
  );
};

export default Banner;
