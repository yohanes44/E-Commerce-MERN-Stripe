import "./featured.scss"

import {MoreVert ,
    KeyboardArrowDown,
   KeyboardArrowUpOutlined} from "@mui/icons-material";
import { CircularProgressbar } from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css"

export default function Featured() {
  return (
    <div className="featured">
       <div className="top">
          <h1 className="title">Total Revenue</h1>
          <MoreVert fontSize="small"/>
       </div>

       <div className="bottom">
         <div className="featuredChart">
            <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
         </div>
         <p className="title">Total sales made today</p>
         <p className="amount">$420</p>
         <p className="desc">
            previous transaction processing, list payments may be included. 
         </p>
         <div className="summary">
            <div className="item">
               <div className="itemTitle">Target</div>
               <div className="itemResult">
                  <KeyboardArrowDown fontSize="small" />
                  <div className="resultAmount">
                     $12.4
                  </div>
               </div>
            </div>

            <div className="item">
               <div className="itemTitle">Last Week</div>
               <div className="itemResult positive">
                  <KeyboardArrowDown fontSize="small" />
                  <div className="resultAmount">
                     $12.4
                  </div>
               </div>
            </div>

            <div className="item">
               <div className="itemTitle">Last Month</div>
               <div className="itemResult negative">
                  <KeyboardArrowDown fontSize="small" />
                  <div className="resultAmount">
                     $12.4
                  </div>
               </div>
            </div>
         </div>
       </div>

    </div>
  )
}
