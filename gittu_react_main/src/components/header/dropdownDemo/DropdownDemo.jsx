import React, { useState } from "react";
import DropdownDemoStyles from "./DropdownDemo.style";
import { BsGrid } from "react-icons/bs";

const DropdownDemo = () => {
  const [isDropdownDemoActive, setIsDropdownDemoActive] = useState(false);
  const handleDropdownDemo = () => {
    setIsDropdownDemoActive(!isDropdownDemoActive);
  };

  return (
    <DropdownDemoStyles>
      <button className="demo-btn">
        <BsGrid />
      </button>
      <ul className="dropdown-demo-list">
        <li>
          <a href="/">Demo one</a>
        </li>
        <li>
          <a href="/home-two">Demo two</a>
        </li>
        <li>
          <a href="/home-three">Demo three</a>
        </li>
        <li>
          <a href="/home-four">Demo four</a>
        </li>
      </ul>
    </DropdownDemoStyles>
  );
};

export default DropdownDemo;
