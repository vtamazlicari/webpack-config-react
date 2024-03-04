import { useState } from "react";
import classes from "./App.module.scss";
import { Link, Outlet } from "react-router-dom";
import png from "@/assets/check.png";
import jpg from "@/assets/2.jpg";
import Svg from "@/assets/calendar.svg";

function ourFunc() {
  ourFunc2();
}

function ourFunc2() {
  throw new Error();
}

export const App = () => {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
    ourFunc();
  };

  if (__PLATFORM__ === "mobile") {
    return null;
  }

  return (
    <div data-testid={"App.DataTestId"}>
      <h1 data-testid="Platform">PLATFORM: {__PLATFORM__}</h1>
      <div>
        <img src={png} alt="" width={200} height={200} />
        <img src={jpg} alt="" width={200} height={200} />
        <Svg width={200} height={200} />
      </div>
      <Link to="about">About link</Link>
      <Link to="shop">Shop link</Link>
      <h2>{count}</h2>
      <button className={classes.button} onClick={increment}>
        increment
      </button>
      <Outlet />
    </div>
  );
};
