import { useState, useEffect } from "react";
import Data from "../../../assets/data/bannarV2";
import Button from "../../../components/button/Button";
import Countdown from "../../../components/countdown/Countdown";
import Dropdown from "../../../components/dropdown/Dropdown";
import Progressbar from "../../../components/progressbar/Progressbar";
import TokenInfo from "../../../components/tokenInfo/TokenInfo";
import BannerWrapper from "./Banner.style";

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
  presaleTokenAmountCall,
  tokenSymbolCall,
  totalSoldCall,
} from "../../../contracts/config";
import { formatEther, parseEther } from "viem";

const Banner = () => {
  const [usdExRate, setUsdExRate] = useState(0);
  const [paymentUsd, setPaymentUsd] = useState(0);
  const [currentStage, setCurrentStage] = useState(1);
  const [currentBonus, setCurrentBonus] = useState("20");
  const [currentPrice, setCurrentPrice] = useState("0.001");
  const [stageEnd, setStageEnd] = useState(1703916000);
  const [tokenName, setTokenName] = useState("GITTU TOKEN");
  const [tokenSymbol, setTokenSymbol] = useState("GITTU");
  const [userBalance, setUserBalance] = useState("28.25 ETH");
  const [presaleToken, setPresaleToken] = useState(10000);
  const [tokenSold, setTokenSold] = useState(2000);
  const [paymentPrice, setPaymentPrice] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [buyAmount, setBuyAmount] = useState(0);
  const [bonusAmount, setBonusAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
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

  const { config } = usePrepareContractWrite({
    ...buyTokenCall,
    value: parseEther(paymentPrice.toString()),
    args: [buyAmount],
  });
  const { write } = useContractWrite(config);

  useEffect(() => {
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
    isConnected,
    balanceData,
    tokenSymbolData,
    presaleTokenAmountData,
    totalSoldData,
    currentStageIdData,
    currentStageInfoData,
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
        <div className="row">
          <div className="col-md-12">
            <div className="text-center text-white mb-40">
              <div className="mb-30">
                <h1 className="banner-title">
                  {Data.title}
                  <img src={Data.titleImg} alt="icon" />
                  {Data.titleExtra}
                </h1>
                <h2 className="banner-title-extra">{Data.titleLine}</h2>
              </div>
              <h5 className="banner-subtitle">
                {Data.subtitle}
                <br />
                {Data.subtitleExtra}
              </h5>
            </div>
          </div>
          <div className="col-md-12">
            <div className="gittu-banner-card">
              <div className="gittu-banner-card-left">
                <div className="presale-top">
                  <h5 className="fs-700 text-white text-uppercase">
                    Sale ends in
                  </h5>
                  <Countdown endDate={stageEnd} medium />
                </div>

                <div className="gittu-banner-card-left-content">
                  <div className="d-flex align-items-center justify-content-between flex-wrap mb-10">
                    <h5 className="fw-600 text-uppercase text-white">
                      Stage {currentStage} : {currentBonus}% Bonus !
                    </h5>
                    <h5 className="fw-600 text-uppercase text-white">
                      {tokenSold} / {presaleToken}
                    </h5>
                  </div>

                  <div className="mb-20">
                    <Progressbar done={tokenPercent} variant="green" />
                  </div>

                  <TokenInfo />
                </div>
              </div>
              <div className="gittu-banner-card-right">
                <div className="presale-item mb-20">
                  <h5 className="fw-600 text-uppercase text-white">
                    Balance: {userBalance}
                  </h5>
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
                      name="paymentInput"
                      id="paymentInput"
                      placeholder="0"
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
                      value={totalAmount}
                      disabled
                    />
                  </div>
                </div>

                <Button variant="green" onClick={buyToken}>
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BannerWrapper>
  );
};

export default Banner;
