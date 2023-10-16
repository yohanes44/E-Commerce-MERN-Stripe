import React, {useState, useEffect} from "react";

import {
    RemoveRedEye
} from "@mui/icons-material";

import "./NewJoinMembers.scss";

import avatarImg from "../../../../src/images/category/shoes3.jpg"
import { useDarkMode } from "../../../utility/context/darkMode"



export default function NewJoinMembers() {

    const { darkMode, setDarkMode } = useDarkMode();

    const { users, setUsers } = useState();

    return (
        <div className="newJoinMembers">
            <div className="wrapper">
                <div className="top">
                    New Join Members
                </div>
                <div className="bottom">
                    <div className="member">
                        <div className="img">
                            <img src={avatarImg} alt="member" />
                        </div>
                        <div className="content">
                            <div className="top">
                                Yohanes Debebe
                            </div>
                            <div className="bottom">
                                Software Engineer
                            </div>
                        </div>
                        <div className="actions">

                            <div className="action">
                                <div className="icon">
                                    <RemoveRedEye />
                                </div>
                                <div className="display">Display</div>
                            </div>
                            
                        </div>
                    </div>
                    <div className="member">
                        <div className="img">
                            <img src={avatarImg} alt="member" />
                        </div>
                        <div className="content">
                            <div className="top">
                                Yohanes Debebe
                            </div>
                            <div className="bottom">
                                Software Engineer
                            </div>
                        </div>
                        <div className="actions">

                            <div className="action">
                                <div className="icon">
                                    <RemoveRedEye />
                                </div>
                                <div className="display">Display</div>
                            </div>

                        </div>
                    </div>
                    <div className="member">
                        <div className="img">
                            <img src={avatarImg} alt="member" />
                        </div>
                        <div className="content">
                            <div className="top">
                                Yohanes Debebe
                            </div>
                            <div className="bottom">
                                Software Engineer
                            </div>
                        </div>
                        <div className="actions">

                            <div className="action">
                                <div className="icon">
                                    <RemoveRedEye />
                                </div>
                                <div className="display">Display</div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
