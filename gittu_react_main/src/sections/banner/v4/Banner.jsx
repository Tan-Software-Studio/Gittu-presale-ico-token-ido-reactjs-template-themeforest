import BannerWrapper from "./Banner.style";

import DocumentIcon from "../../../assets/images/icons/document-text.svg";
import PresaleLiveTextIcon from "../../../assets/images/icons/presale-live-text.svg";
import Abstrac1 from "../../../assets/images/banner/abstrac-1.png";
import Abstrac2 from "../../../assets/images/banner/abstrac-2.png";

import { FiArrowDownRight } from "react-icons/fi";
import { HiArrowLeft } from "react-icons/hi2";
import Whitepaper from "../../../assets/pdf/whitepaper.pdf";

import Button from "../../../components/button/Button";
import SmoothSlider from "../../../components/smooth-slider/SmoothSlider";
import Progressbar from "../../../components/progressbar/Progressbar";
import Countdown from "../../../components/countdown/Countdown";
import Dropdown from "../../../components/dropdown/Dropdown";
import { useState, useEffect } from "react";

import Data from "../../../assets/data/bannarV1";
import TokenInfo from "../../../components/tokenInfo/TokenInfo";
import {
  useAccount,
  useBalance,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import {
  GetUSDExchangeRate,
  buyTokenCall,
  currentStageIdCall,
  currentStageInfoCall,
  hardCapCall,
  payWith,
  presaleTokenAmountCall,
  softCapCall,
  tokenSymbolCall,
  totalFundCall,
  totalSoldCall,
} from "../../../contracts/config";
import { formatEther, parseEther } from "viem";

const Banner = () => {
  const [userBalance, setUserBalance] = useState("28.25 ETH");
  const [isBuyNow, setIsBuyNow] = useState(false);

  const buyNowHandle = () => {
    setIsBuyNow(!isBuyNow);
  };

  const [usdExRate, setUsdExRate] = useState(0);
  const [paymentUsd, setPaymentUsd] = useState(0);
  const [currentStage, setCurrentStage] = useState(1);
  const [currentBonus, setCurrentBonus] = useState("20");
  const [currentPrice, setCurrentPrice] = useState("0.001");
  const [stageEnd, setStageEnd] = useState(1703916000);
  const [presaleToken, setPresaleToken] = useState(10000);
  const [tokenSymbol, setTokenSymbol] = useState("GITTU");
  const [softCap, setSoftCap] = useState("10");
  const [hardCap, setHardCap] = useState("40");
  const [totalFund, setTotalFund] = useState("20");
  const [paymentPrice, setPaymentPrice] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [buyAmount, setBuyAmount] = useState(0);
  const [bonusAmount, setBonusAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [tokenSold, setTokenSold] = useState(0);
  const [tokenPercent, setTokenPercent] = useState(20);

  const { address: addressData, isConnected } = useAccount();
  const { data: balanceData } = useBalance({
    address: addressData,
  });
  const { data: tokenSymbolData } = useContractRead({ ...tokenSymbolCall });
  const { data: presaleTokenAmountData } = useContractRead({
    ...presaleTokenAmountCall,
  });
  const { data: totalSoldData } = useContractRead({ ...totalSoldCall });
  const { data: currentStageIdData } = useContractRead({
    ...currentStageIdCall,
  });
  const { data: currentStageInfoData } = useContractRead({
    ...currentStageInfoCall,
    args: [currentStageIdData],
  });
  const { data: softCapData } = useContractRead({ ...softCapCall });
  const { data: hardCapData } = useContractRead({ ...hardCapCall });
  const { data: totalFundData } = useContractRead({ ...totalFundCall });

  const { config } = usePrepareContractWrite({
    ...buyTokenCall,
    value: parseEther(paymentPrice.toString()),
    args: [buyAmount],
  });
  const { write } = useContractWrite(config);

  useEffect(() => {
    if (isBuyNow) {
      document.querySelector(".gittu-banner-card").classList.add("flip");
    }

    if (!isBuyNow) {
      document.querySelector(".gittu-banner-card").classList.remove("flip");
    }

    if (isConnected) {
      if (balanceData) {
        let tmp = parseFloat(balanceData?.formatted).toFixed(2);
        setUserBalance(`${tmp} ${balanceData?.symbol}`);
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

      if (currentStageIdData) {
        setCurrentStage(currentStageIdData.toString());
      }

      if (currentStageInfoData) {
        setCurrentBonus(currentStageInfoData[1].toString());

        let tmp = formatEther(currentStageInfoData[2]);
        setCurrentPrice(tmp);

        setStageEnd(currentStageInfoData[4].toString());
      }

      if (softCapData) {
        let tmp = formatEther(softCapData);
        setSoftCap(tmp.toString());
      }

      if (hardCapData) {
        let tmp = formatEther(hardCapData);
        setHardCap(tmp.toString());
      }

      if (totalFundData) {
        let tmp = formatEther(totalFundData);
        setTotalFund(tmp.toString());
      }

      let _tokenPercent = parseInt((tokenSold * 100) / presaleToken);
      setTokenPercent(_tokenPercent);
      if (_tokenPercent > 100) {
        setTokenPercent(100);
      }

      GetUSDExchangeRate().then((res) => {
        setUsdExRate(parseFloat(res));
      });

      let pay = parseFloat(usdExRate * paymentPrice).toFixed(2);
      setPaymentUsd(pay);
    }
  }, [
    isBuyNow,
    isConnected,
    balanceData,
    tokenSymbolData,
    presaleTokenAmountData,
    totalSoldData,
    currentStageIdData,
    currentStageInfoData,
    softCapData,
    hardCapData,
    totalFundData,
    tokenSold,
    presaleToken,
    usdExRate,
    paymentPrice,
  ]);

  const handlePaymentInput = (e) => {
    let _inputValue = e.target.value;
    setPaymentAmount(_inputValue);

    if (_inputValue >= currentPrice) {
      let _amount = parseInt(_inputValue / currentPrice);
      setBuyAmount(_amount);

      let _bonusAmount = parseInt((_amount * currentBonus) / 100);
      setBonusAmount(_bonusAmount);

      let _totalAmount = _amount + _bonusAmount;
      setTotalAmount(_totalAmount);

      if (_inputValue != "" && _inputValue >= 0) {
        setPaymentPrice(_inputValue);
      }
    }
  };

  const buyToken = () => {
    if (paymentAmount != "" && paymentAmount >= currentPrice) {
      write?.();
    }
  };

  return (
    <BannerWrapper>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="gittu-banner-left">
              <h1 className="banner-title">{Data.title}</h1>
              <h2 className="text-white">{Data.titleExtra}</h2>
              <h5 className="mt-15">{Data.subtitle}</h5>

              <div className="mt-40 mb-40">
                <a
                  className="whitepaper-btn"
                  href={Whitepaper}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={DocumentIcon} alt="icon" />
                  Whitepaper
                </a>
              </div>

              <ul className="gittu-banner-list">
                <li>Total Supply: {presaleToken}</li>
                <li>
                  Soft Cap: {softCap} {payWith}
                </li>
                <li>
                  Hard Cap: {hardCap} {payWith}
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="gittu-banner-right">
              <div className="overlay">
                <a href="#" className="presale-live-btn">
                  <img src={PresaleLiveTextIcon} alt="Presale live" />
                  <span className="icon">
                    <FiArrowDownRight />
                  </span>
                </a>
              </div>
              <div className="gittu-banner-card">
                <div className="gittu-banner-card-inner">
                  <div className="bg-shape">
                    <div className="bg-shape-img img-1">
                      <img src={Abstrac1} alt="shape" />
                    </div>
                    <div className="bg-shape-img img-2">
                      <img src={Abstrac2} alt="shape" />
                    </div>
                  </div>

                  {isBuyNow ? (
                    <div className="card-content">
                      <button
                        className="presale-back-btn"
                        onClick={buyNowHandle}
                      >
                        <HiArrowLeft />
                      </button>

                      <div className="presale-item mb-20">
                        <div className="presale-item-inner">
                          <h5 className="fw-600 text-uppercase text-white">
                            Balance: {userBalance}
                          </h5>
                        </div>
                        <div className="presale-item-inner">
                          <h5 className="fw-600 text-uppercase text-white">
                            Price: {currentPrice} {payWith}
                          </h5>
                        </div>
                      </div>

                      <div className="presale-item mb-25">
                        <div className="presale-item-inner">
                          <h6>Select Token</h6>
                          <Dropdown />
                        </div>
                        <div className="presale-item-inner">
                          <h6>Amount</h6>
                          <input
                            type="number"
                            min={currentPrice}
                            step={currentPrice}
                            name=""
                            id=""
                            placeholder="0.5"
                            value={paymentAmount}
                            onChange={handlePaymentInput}
                          />
                        </div>
                      </div>

                      <div className="presale-item mb-37">
                        <div className="presale-item-inner">
                          <h6>$ Amount</h6>
                          <input
                            type="text"
                            name=""
                            id=""
                            placeholder="0"
                            value={paymentUsd}
                            disabled
                          />
                        </div>
                        <div className="presale-item-inner">
                          <h6>Get Amount ( {tokenSymbol} )</h6>
                          <input
                            type="text"
                            name=""
                            id=""
                            placeholder="0"
                            value={buyAmount}
                            disabled
                          />
                        </div>
                      </div>

                      <ul className="token-info-list mb-35">
                        <li>
                          <p>Bonus</p>
                          <p>{currentBonus}%</p>
                        </li>
                        <li>
                          <p>Total Amount</p>
                          <p>
                            {buyAmount} + {bonusAmount} Bonus
                          </p>
                        </li>
                      </ul>

                      <Button large onClick={buyToken}>
                        Approve
                      </Button>
                    </div>
                  ) : (
                    <div className="card-content">
                      <p className="presale-stage-title text-uppercase">
                        Stage {currentStage}: {currentBonus}% Bonus!
                      </p>
                      <h5 className="fw-600 text-white text-uppercase">
                        Pre-sale ends in
                      </h5>

                      <div className="mt-1 mb-17">
                        <Countdown endDate={stageEnd} />
                      </div>

                      <div className="mb-15">
                        <Progressbar done={tokenPercent} />
                      </div>

                      <div className="presale-raised fw-500 mb-25">
                        <p className="fs-15 text-white">Raised: {tokenSold}</p>
                        <p className="fs-15 text-white">Goal: {presaleToken}</p>
                      </div>

                      <div className="mb-35">
                        <TokenInfo />
                      </div>

                      <Button large onClick={buyNowHandle}>
                        Buy {tokenSymbol} now
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="gittu-banner-slider">
        <SmoothSlider />
      </div>
    </BannerWrapper>
  );
};

export default Banner;
