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

import "./navbar.scss";

import avatarImg from "../../../../src/images/category/shoes3.jpg"
import { useDarkMode } from "../../../utility/context/darkMode"



function Navbar() {

  const {darkMode, setDarkMode} = useDarkMode();

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text"  placeholder="search..."/>
          <SearchOutlined />
        </div>

        <div className="items">
          <div className="item">
            <LanguageOutlined className="icon" />
            English
          </div>
          <div className="item" onClick={(e) => {setDarkMode(!darkMode)}}>
            {darkMode ? <LightModeOutlined className="icon" /> : <DarkModeOutlined className="icon" />}
          </div>
          <div className="item">
            <FullscreenExitOutlined className="icon" />
          </div>
          <div className="item">
            <NotificationsNoneOutlined className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlined className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlined className="icon" />
          </div>
          <div className="item">
            <img src={avatarImg} alt="avatarImg" className="avatar" />
          </div>
        </div>


      </div>
    </div>
  );
}

export default Navbar;
