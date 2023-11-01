import HeaderWrapper from "./Header.style";
import MobileMenu from "../mobileMenu/MobileMenu";

import Logo from "../../../assets/images/logo.png";
import Telegram from "../../../assets/images/icons/telegram.svg";
import Discord from "../../../assets/images/icons/discord.svg";
import Twitter from "../../../assets/images/icons/twitter.svg";
import { HiMenuAlt3 } from "react-icons/hi";

import { useState } from "react";
import ConnectWalletButton from "../../button/ConnectWalletButton";
import DropdownDemo from "../dropdownDemo/DropdownDemo";

const Header = () => {
  const [isMobileMenu, setIsMobileMenu] = useState(false);

  const handleMobileMenu = () => {
    setIsMobileMenu(!isMobileMenu);
  };

  return (
    <>
      <HeaderWrapper className="header-section">
        <div className="container">
          <div className="gittu-header-content">
            <div className="gittu-header-left">
              <a className="gittu-header-logo" href="/">
                <img src={Logo} alt="Logo" />
              </a>

              <DropdownDemo />
            </div>
            <div className="gittu-header-right">
              <div className="gittu-header-menu-toggle">
                <button className="menu-toggler" onClick={handleMobileMenu}>
                  <HiMenuAlt3 />
                </button>
              </div>
              <div className="gittu-header-right-menu">
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
                </ul>

                <ConnectWalletButton />
              </div>
            </div>
          </div>
        </div>
      </HeaderWrapper>
      {isMobileMenu && <MobileMenu mobileMenuHandle={handleMobileMenu} />}
    </>
  );
};

export default Header;
