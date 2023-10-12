import React from "react";

import "./widget.scss";

import {
  KeyboardArrowUp,
  PersonOutlined,
  AccountBalanceWalletOutlined,
  ShoppingCartOutlined,
  MonetizationOnOutlined,
} from "@mui/icons-material";

function Widget({ type }) {
  var data = null;

  const ammount = 100;
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        icon: <PersonOutlined 
            className="icon"
            style={{color: "crimson", backgroundColor: "rgba(255,0,0,0.2)"}} />,
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: "View all orders",
        icon: <ShoppingCartOutlined 
            className="icon"
            style={{color: "goldenrod", backgroundColor: "rgba(218,165,32,0.2)"}} />,
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        icon: <MonetizationOnOutlined 
            className="icon"
            style={{color: "green", backgroundColor: "rgba(0,128,0,0.2)"}}  />,
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "see details",
        icon: <AccountBalanceWalletOutlined 
            className="icon"
            style={{color: "purple", backgroundColor: "rgba(128, 0, 128, 0.2)"}} />,
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <div className="title">{data.title}</div>
        <div className="counter">{data.isMoney && "$"} {ammount}</div>
        <div className="link">{data.link}</div>
      </div>
      <div className="right">
        <div className="percentage">
          <KeyboardArrowUp />
          {diff} %
        </div>
       {data.icon}
      </div>
    </div>
  );
}

export default Widget;
