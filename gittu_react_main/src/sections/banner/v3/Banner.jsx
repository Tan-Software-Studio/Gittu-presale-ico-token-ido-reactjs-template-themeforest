import BannerWrapper from "./Banner.style";
import Countdown from "../../../components/countdown/Countdown";
import Progressbar from "../../../components/progressbar/Progressbar";
import Button from "../../../components/button/Button";

import PresaleImg from "../../../assets/images/banner/presale.png";
import Telegram from "../../../assets/images/icons/telegram.svg";
import Discord from "../../../assets/images/icons/discord.svg";
import Twitter from "../../../assets/images/icons/twitter.svg";
import Medium from "../../../assets/images/icons/medium.svg";
import Reddit from "../../../assets/images/icons/reddit.svg";
import Instagram from "../../../assets/images/icons/instagram.svg";
import Linkedin from "../../../assets/images/icons/linkedin.svg";

import { useState } from "react";
import Modal from "../../../components/modal/Modal";
import Data from "../../../assets/data/bannerV4";
import { useAccount, useContractRead } from "wagmi";
import { useEffect } from "react";
import {
  payWith,
  currentStageIdCall,
  currentStageInfoCall,
  maxStageCall,
  presaleTokenAmountCall,
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
  const [presaleToken, setPresaleToken] = useState(10000);
  const [tokenSold, setTokenSold] = useState(2000);
  const [tokenPercent, setTokenPercent] = useState(20);
  const [tokenSymbol, setTokenSymbol] = useState("GITTU");

  const { isConnected } = useAccount();
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

        let tmp = formatEther(currentStageInfoData[2]);
        setCurrentPrice(tmp);

        setStageEnd(currentStageInfoData[4].toString());
      }

      if (nextStageInfoData) {
        let tmp = formatEther(nextStageInfoData[2]);
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
        <div className="gittu-container">
          <div className="gittu-row align-items-center justify-content-between">
            <div className="gittu-col-left">
              <div className="banner-left">
                <div className="banner-header mb-45">
                  <h2 className="banner-title ff-orbitron">
                    {Data.title}
                    <img src={Data.titleImg} alt="title image" />
                  </h2>
                  <h2 className="banner-title ff-orbitron">
                    <span>{Data.titleExtra1}</span>
                    {Data.titleExtra2}
                    <img src={Data.titleImg2} alt="title image" />
                    {Data.titleExtra3}
                  </h2>
                  <h5 className="mt-15 ff-outfit text-white">
                    {Data.subtitle}
                  </h5>
                </div>
                <div className="banner-body">
                  <div className="stage-info mb-10">
                    <h5 className="ff-orbitron">
                      Stage {currentStage} : {currentBonus}% Bonus !
                    </h5>
                    <h5 className="ff-orbitron">
                      {tokenSold} / {presaleToken}
                    </h5>
                  </div>
                  <div className="mb-30">
                    <Progressbar done={tokenPercent} variant="dashed2" />
                  </div>

                  <ul className="ff-outfit text-white mb-50">
                    <li>
                      1 {tokenSymbol} = {currentPrice} {payWith}
                    </li>
                    <li>
                      Next Stage Price = {nextPrice} {payWith}
                    </li>
                  </ul>

                  <Button variant="gradient2" onClick={modalHandle}>
                    Buy now
                  </Button>
                </div>
              </div>
            </div>
            <div className="gittu-col-right">
              <div className="banner-right">
                <div className="banner-right-img">
                  <img src={PresaleImg} alt="banner image" />
                </div>
                <div className="presale-card">
                  <div className="presale-card-header">
                    <h5 className="ff-outfit mb-10">Pre-Sale ends in</h5>
                    <Countdown endDate={stageEnd} font="orbitron" />
                  </div>

                  <ul className="social-links">
                    <li>
                      <a
                        href="https://web.telegram.org/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src={Telegram} alt="telegram" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://discord.com/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src={Discord} alt="discord" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://twitter.com/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src={Twitter} alt="twitter" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://medium.com/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src={Medium} alt="medium" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.reddit.com/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src={Reddit} alt="reddit" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src={Instagram} alt="instagram" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.linkedin.com/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src={Linkedin} alt="linkedin" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BannerWrapper>
      {isModalOpen && <Modal modalCloseHandle={modalHandle} variant="v2" />}
    </>
  );
};

export default Banner;
