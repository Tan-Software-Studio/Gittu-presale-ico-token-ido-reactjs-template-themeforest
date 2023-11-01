import { useState, useEffect } from "react";
import Button from "../button/Button";
import Dropdown from "../dropdown/Dropdown";
import ModalWrapper from "./Modal.style";

import { CgClose } from "react-icons/cg";
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
  tokenSymbolCall,
} from "../../contracts/config";
import { formatEther, parseEther } from "viem";

const Modal = ({ modalCloseHandle, ...props }) => {
  const [usdExRate, setUsdExRate] = useState(0);
  const [paymentUsd, setPaymentUsd] = useState(0);
  const [userBalance, setUserBalance] = useState("28.25ETH");
  const [tokenSymbol, setTokenSymbol] = useState("GITTU");
  const [currentStage, setCurrentStage] = useState(0);
  const [currentBonus, setCurrentBonus] = useState("0");
  const [currentPrice, setCurrentPrice] = useState("0.001");
  const [paymentPrice, setPaymentPrice] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [buyAmount, setBuyAmount] = useState(0);
  const [bonusAmount, setBonusAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const { address: addressData, isConnected } = useAccount();
  const { data: balanceData } = useBalance({
    address: addressData,
  });
  const { data: tokenSymbolData } = useContractRead({ ...tokenSymbolCall });
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

  const {
    data: buyTokenData,
    isError,
    isSuccess,
    write,
  } = useContractWrite(config);

  useEffect(() => {
    if (isConnected) {
      if (balanceData) {
        let tmp = parseFloat(balanceData?.formatted).toFixed(2);
        setUserBalance(`${tmp} ${balanceData?.symbol}`);
      }

      if (tokenSymbolData) {
        setTokenSymbol(tokenSymbolData);
      }

      if (currentStageIdData) {
        setCurrentStage(currentStageIdData.toString());
      }

      if (currentStageInfoData) {
        setCurrentBonus(currentStageInfoData[1].toString());

        let tmp = formatEther(currentStageInfoData[2]);
        setCurrentPrice(tmp);
      }

      GetUSDExchangeRate().then((res) => {
        setUsdExRate(parseFloat(res));
      });

      let pay = parseFloat(usdExRate * paymentPrice).toFixed(2);
      setPaymentUsd(pay);

      if (buyTokenData || isError || isSuccess) {
        window.location.reload();
      }
    }
  }, [
    isConnected,
    balanceData,
    tokenSymbolData,
    currentStageIdData,
    currentStageInfoData,
    usdExRate,
    paymentPrice,
    buyTokenData,
    isError,
    isSuccess,
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
    <ModalWrapper className="gittu-modal" {...props}>
      <div className="overlay"></div>
      <div className="gittu-modal-content">
        <div className="gittu-modal-header">
          <h4 className="ff-orbitron text-white text-uppercase">
            Be an early investor
          </h4>
          <button onClick={modalCloseHandle}>
            <CgClose />
          </button>
        </div>
        <div className="gittu-modal-body">
          <div className="mb-20">
            <h5 className="ff-outfit fw-600 text-white text-uppercase">
              Balance : {userBalance}
            </h5>
          </div>

          <div className="presale-item mb-25">
            <h6>Amount</h6>
            <div className="input-group">
              <input
                type="number"
                min={currentPrice}
                step={currentPrice}
                name="payment-amount"
                id="payment-amount"
                placeholder="0.5"
                value={paymentAmount}
                onChange={handlePaymentInput}
              />
              <div className="input-group-dropdown">
                <Dropdown />
              </div>
            </div>
          </div>
          <div className="presale-item mb-25">
            <h6>Get Amount ( {tokenSymbol} )</h6>
            <input
              type="text"
              name="usd-amount"
              id="usd-amount"
              placeholder="569633"
              value={buyAmount}
              disabled
            />
          </div>

          <ul className="token-info-list mb-35">
            <li>
              <p>$ Price</p>
              <p>{paymentUsd}</p>
            </li>
            <li>
              <p>Bonus {currentBonus}%</p>
              <p>{bonusAmount}</p>
            </li>
            <li>
              <p>Total Amount</p>
              <p>{totalAmount}</p>
            </li>
          </ul>

          <Button
            large
            variant={props.variant === "v2" ? "gadient2" : "gradient"}
            onClick={buyToken}
            className="btn-approve"
          >
            Approve
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default Modal;
