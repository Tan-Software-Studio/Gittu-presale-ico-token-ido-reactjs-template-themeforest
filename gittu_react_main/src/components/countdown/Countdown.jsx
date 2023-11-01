import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import CountdownWrapper from "./Countdown.style";

const Countdown = ({ endDate, ...props }) => {
  const [remainingTime, setRemainingTime] = useState({
    seconds: "00",
    minutes: "00",
    hours: "00",
    days: "00",
  });

  const countDownDate = endDate;

  useEffect(() => {
    const x = setInterval(() => {
      // Get today's date and time
      var now = Math.floor(Date.now() / 1000);

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      if (distance >= 0) {
        var d = Math.floor(distance / 86400);
        if (d < 10) {
          d = "0" + d;
        }
        var h = Math.floor((distance % 86400) / 3600);
        if (h < 10) {
          h = "0" + h;
        }
        var m = Math.floor((distance % 3600) / 60);
        if (m < 10) {
          m = "0" + m;
        }
        var s = Math.floor(distance % 60);
        if (s < 10) {
          s = "0" + s;
        }
        setRemainingTime({
          days: d,
          hours: h,
          minutes: m,
          seconds: s,
        });
      } else {
        setRemainingTime({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
        clearInterval(x);
      }
    }, 1000);
  }, [remainingTime]);

  return (
    <CountdownWrapper {...props}>
      <div className="count-item">
        <span className="count">{remainingTime.days}</span>
        <span className="label">d</span>
      </div>
      <div className="count-item">
        <span className="count">{remainingTime.hours}</span>
        <span className="label">h</span>
      </div>
      <div className="count-item">
        <span className="count">{remainingTime.minutes}</span>
        <span className="label">m</span>
      </div>
      <div className="count-item">
        <span className="count">{remainingTime.seconds}</span>
        <span className="label">s</span>
      </div>
    </CountdownWrapper>
  );
};

export default Countdown;
