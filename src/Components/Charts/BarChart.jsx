import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import "./BarChart.css";

const options = {
  chart: {
    title: "Sellers and Products",
  },
  colors: ["#1c2e4a", "#B1560F"],
};

export default function BarChart() {
  // State for storing orders and products data
  const [ordersData, setOrdersData] = useState({});
  const [productsData, setProductsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState("2024");

  // Function to fetch orders data from API
  const fetchOrdersData = async (year) => {
    try {
      const response = await fetch(`http://localhost:8083/api/product/monthly-product-count?year=${year}`);
      const data = await response.json();
      console.log("Orders Data:", data); // Debugging log
      setOrdersData(data);
    } catch (error) {
      console.error("Error fetching orders data:", error);
      setOrdersData({});
    }
  };

  // Function to fetch products data from API
  const fetchProductsData = async (year) => {
    try {
      const response = await fetch(`http://localhost:8082/api/order/monthly-order-count?year=${year}`);
      const data = await response.json();
      console.log("Products Data:", data); // Debugging log
      setProductsData(data);
    } catch (error) {
      console.error("Error fetching products data:", error);
      setProductsData({});
    }
  };

  // Combine and prepare chart data
  const prepareChartData = () => {
    const chartData = [["Month", "Orders", "Products"]];
    const monthTotals = new Map();

    // Add orders data to the map
    Object.keys(ordersData).forEach((key) => {
      const [year, month] = key.split("-");
      const monthName = new Date(`${year}-${month}-01`).toLocaleString("default", {
        month: "short",
      });
      monthTotals.set(monthName, {
        orders: (monthTotals.get(monthName)?.orders || 0) + ordersData[key],
        products: monthTotals.get(monthName)?.products || 0,
      });
    });

    // Add products data to the map
    Object.keys(productsData).forEach((key) => {
      const [year, month] = key.split("-");
      const monthName = new Date(`${year}-${month}-01`).toLocaleString("default", {
        month: "short",
      });
      monthTotals.set(monthName, {
        orders: monthTotals.get(monthName)?.orders || 0,
        products: (monthTotals.get(monthName)?.products || 0) + productsData[key],
      });
    });

    // Sort the map by month order
    const monthOrder = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    monthOrder.forEach((month) => {
      if (monthTotals.has(month)) {
        const data = monthTotals.get(month);
        chartData.push([month, data.orders, data.products]);
      } else {
        chartData.push([month, 0, 0]); // Add empty months if missing
      }
    });

    console.log("Prepared Chart Data:", chartData); // Debugging log
    return chartData;
  };

  // Fetch data when the component loads
  useEffect(() => {
    setLoading(true);
    Promise.all([fetchOrdersData(selectedYear), fetchProductsData(selectedYear)])
      .then(() => setLoading(false))
      .catch((error) => {
        console.error("Error during data fetching:", error);
        setLoading(false);
      });
  }, [selectedYear]);

  // Handle year change
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (Object.keys(ordersData).length === 0 && Object.keys(productsData).length === 0) {
    return <div>No data available for the chart</div>;
  }

  return (
    <div className="bar-chart">
      <div className="chart-header">
        <p className="chart-title-1">Changes in Orders and Products over the Year</p>
        
        {/* Year selection dropdown */}
        <select value={selectedYear} onChange={handleYearChange} className="year-button">
          <option value="2024" className={`${selectedYear === "2024" ? "selected" : ""}`}>
            2024
          </option>
          <option value="2023" className={`${selectedYear === "2023" ? "selected" : ""}`}>
            2023
          </option>
          {/* Add more years if necessary */}
        </select>
      </div>
  
      <div className="bar-chart-container">
        <Chart
          chartType="Bar"
          width="100%"
          height="300px"
          data={prepareChartData()}
          options={options}
          className="custom-bar-chart"
        />
      </div>
    </div>
  );
  
}

