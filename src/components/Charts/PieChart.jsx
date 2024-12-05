import React, { useState } from "react";
import { Chart } from "react-google-charts";
import { Button } from "@mui/material";
import "./PieChart.css";

export default function PieChart() {
    const salesData = [
        {
            label: "Daily Sales",
            data: [
                ["Task", "Total Sales"],
                ["Mens wear", 25000],
                ["Womens wear", 10000],
                ["Kids wear", 5000],
            ],
        },
        {
            label: "Weekly Sales",
            data: [
                ["Task", "Total Sales"],
                ["Mens wear", 1700],
                ["Womens wear", 7000],
                ["Kids wear", 35000],
            ],
        },
        {
            label: "Monthly Sales",
            data: [
                ["Task", "Total Sales"],
                ["Mens wear", 75000],
                ["Womens wear", 30000],
                ["Kids wear", 15000],
            ],
        },
        {
            label: "Annual Sales",
            data: [
                ["Task", "Total Sales"],
                ["Mens wear", 9000000],
                ["Womens wear", 2570000],
                ["Kids wear", 2359000],
            ],
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const handleToggle = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % salesData.length);
    };

    const { label, data } = salesData[currentIndex];

    const options = {
        title: "",
        colors: ["#0F4C81", "#46C6A3", "#FEAC00"],
    };

    return (
        <div className="pie-chart">
            <p className="chart-title-2">{`${label} in dollars`}</p>

            <div className="body-container">
                <div className="button-container">
                    <Button
                        variant="outlined"
                        onClick={handleToggle} 
                        sx={{
                            textTransform: 'none', 
                            backgroundColor: '#000000', 
                            color: '#FFFFFF', 
                            fontSize: '14px', 
                            fontWeight: '550',
                            marginLeft: '320px',
                            width: "180px",
                            fontFamily: 'sans-serif', 
                            '&:hover': {
                              backgroundColor: '#000000', 
                            },
                          }}     
                    >
                        Show {salesData[(currentIndex + 1) % salesData.length].label}
                    </Button>
                </div>
                    <div className="pie-chart-container">
                    <Chart
                        chartType="PieChart"
                        data={data}
                        options={options}
                        width="100%"
                        height="350px"
                    />
                    </div>
            </div>
        </div>
    );
}
