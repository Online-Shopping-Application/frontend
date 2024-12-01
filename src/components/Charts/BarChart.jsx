import React from "react";
import { Chart } from "react-google-charts";
import "./BarChart.css"; 

const data = [
  ["Month", "Sellers", "Products"],
  ["Jan", 15000, 24000],
  ["Feb", 20000, 4000],
  ["Mar", 11790, 27060],
  ["April", 23000, 11200],
  ["May", 26700, 5000],
  ["June", 16700, 24000],
  ["July", 2700, 13000],
  ["Aug", 21700, 5300],
  ["Sep", 9600, 4000],
  ["Oct", 6500, 4000],
  ["Nov", 6700, 5000],
  ["Dec", 6700, 5000],
];

const options = {
  chart: {
    title: "", 
  },
  colors: ["#1c2e4a", "#B1560F"],
  }


export default function BarChart() {
  return (
    <div className="bar-chart">
      <p className="chart-title-1"> Changes in Sellers and Products over Year</p>
    <div className="bar-chart-container">
      <Chart
        chartType="Bar"
        width="100%"
        height="300px"
        data={data}
        options={options}
        className="custom-bar-chart"
      />
    </div>
    </div>
  );
} 


