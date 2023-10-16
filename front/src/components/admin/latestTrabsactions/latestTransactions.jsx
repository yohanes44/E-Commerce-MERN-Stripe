import React from "react";

import {
  SearchOutlined,
  LanguageOutlined,
  DarkModeOutlined,
  FullscreenExitOutlined,
  NotificationsNoneOutlined,
  ChatBubbleOutlineOutlined,
  ListOutlined,
  LightModeOutlined
} from "@mui/icons-material";

import "./latestTransactions.scss";

import avatarImg from "../../../../src/images/category/shoes3.jpg"
import { useDarkMode } from "../../../utility/context/darkMode"



export default function LatestTransaction() {

  
  return (
    <div className="latestTransaction">
      <div className="wrapper">
        <div className="top">
            Latest Transactions
        </div>
        <div className="bottom">
            
        </div>
      </div>
    </div>
  );
}

