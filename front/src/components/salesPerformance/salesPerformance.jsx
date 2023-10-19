import React, {useState, useEffect} from "react";



import Chart from "../../components/chart/Chart"

export default function SalesPerformance() {

    return (
      <div>
          <Chart
          aspect={4/1} title="Sales Performance"
          page="adminPanel/product"
          data={
             [
                 {name: "January", Total: 4000},
                 {name: "February", Total: 3200},
                 {name: "March", Total: 4000}
                ]
               }/>
     </div>

  );
}
