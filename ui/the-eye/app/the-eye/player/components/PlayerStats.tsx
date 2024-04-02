// Not used

"use client";

import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { blue } from "@mui/material/colors";
import { SportsBaseball } from "@mui/icons-material";

const chartSetting = {
  xAxis: [
    {
      label: "Percentage",
      min: 0,
      max: 100,
    },
  ],

  width: 350,
  height: 350,
};

const dataset = [
  {
    Auburn: 63.9,
    stat: "On Base Percentage",
  },
  {
    Auburn: 47,
    stat: "Slug Precentage",
  },
  {
    Auburn: 56,
    stat: "On Base Plus Slug Percentage",
  },
  {
    Auburn: 90,
    stat: "Isolated Power",
  },
  {
    Auburn: 37,
    stat: "K percentage",
  },
  {
    Auburn: 15,
    stat: "Base on Ball Percentage",
  },
  {
    Auburn: 19,
    stat: "In Zone Whiff percentage",
  },
  {
    Auburn: 32,
    stat: "Chase Percentage",
  },
];

const valueFormatter = (value: number | null) => `${value} percent`;

export default function HorizontalBars() {
  return (

     <>
     <style>
      {`
    .mui-1uma31z-MuiResponsiveChart-container {
      width: 700px;
    }
    `}

     </style>
   
     <div style={{display: "flex"}}>
     <BarChart
     
     dataset={dataset}
     yAxis={[
       { id: "leftAxis", scaleType: "band", dataKey: "stat" },
       {
         id: "rightAxis",
         scaleType: "band",
         dataKey: "Auburn",
         valueFormatter,
       },
     ]}
     rightAxis="rightAxis"
     series={[
       {
         dataKey: "Auburn",
         label: "Auburn Player Stats",
         valueFormatter,
         color: "#0C2340",
       },
     ]}

     
     layout="horizontal"
     {...chartSetting} />
       </div>

       <div>
       <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
      
        <h3
          style={{
            display: "flex",
            color: "#E87722",
            whiteSpace: "pre",
          }}
        >
          {" "}
          <SportsBaseball color="primary"/> Total at bats:{" "}
          <span style={{ color: "#0C2340" }}>23</span>{" "}
        </h3>
      </div>
      <div style={{
          display: "flex",
          marginTop: -25,
          alignItems: "center",
          justifyContent: "center",
        }}>
        <h3
          style={{
            display: "flex",
            color: "#E87722",
            whiteSpace: "pre",
          }}
        >
          {" "}
         <SportsBaseball color="primary" /> Batting avg:{" "}
          <span style={{ color: "#0C2340" }}>.389</span>{" "}
        </h3>
      </div>
      </div>
      </>
    
      
     
  );
}