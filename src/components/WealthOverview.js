import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import Cookies from 'js-cookie';
import axios from 'axios';
import '../stylesheets/user/WealthOverview.css';
import UserNav from '../components/UserNav';
import { useNavigate } from 'react-router-dom';

const WealthOverview = () => {
  const [investmentData, setInvestmentData] = useState([]);
  const [profitData, setProfitData] = useState([]);
  const [totalProfits, setTotalProfits] = useState(0);
  const [activePackages, setActivePackages] = useState(0);
  const [expectedReturns, setExpectedReturns] = useState(0);
  const navigate = useNavigate();
  const userId = Cookies.get('userId');
  const token = Cookies.get('token');
  const url = process.env.REACT_APP_URL;

  // Fetching data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const investmentResponse = await axios.get(`${url}/users/${userId}/investments`, {
          headers: { Authorization: `${token}` },
        });
        const profitResponse = await axios.get(`${url}/users/${userId}/profits`, {
          headers: { Authorization: `${token}` },
        });

        setInvestmentData(investmentResponse.data);
        setProfitData(profitResponse.data);

        // Calculate total profits, active packages, and expected returns
        const totalProfitAmount = profitResponse.data.reduce((sum, profit) => sum + profit.amount, 0);
        const totalExpectedReturns = investmentResponse.data.reduce((sum, inv) => sum + inv.expectedReturn, 0);
        setTotalProfits(totalProfitAmount);
        setActivePackages(investmentResponse.data.length);
        setExpectedReturns(totalExpectedReturns);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId, token, url]);

  // Navigate to package insights
  const handleViewPackages = () => {
    navigate('/package-insights');
  };

  const profitChartData = {
    labels: profitData.map((profit) => profit.date),
    datasets: [
      {
        label: 'Profits ($)',
        data: profitData.map((profit) => profit.amount),
        borderColor: '#4CAF50',
        backgroundColor: '#A5D6A7',
        fill: true,
      },
    ],
  };

  const investmentChartData = {
    labels: investmentData.map((inv) => inv.packageName),
    datasets: [
      {
        label: 'Investment Growth ($)',
        data: investmentData.map((inv) => inv.expectedReturn),
        backgroundColor: '#42A5F5',
        borderColor: '#1E88E5',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="wealth-overview-page">
      <UserNav /> {/* Positioned UserNav correctly */}
      <main className="wealth-overview-main">
        <h2>Wealth Overview</h2>
        <div className="overview-stats">
          <div className="stat-box">
            <h3>Total Profits</h3>
            <p>${totalProfits.toFixed(2)}</p>
          </div>
          <div className="stat-box">
            <h3>Active Packages</h3>
            <p>{activePackages}</p>
          </div>
          <div className="stat-box">
            <h3>Expected Returns</h3>
            <p>${expectedReturns.toFixed(2)}</p>
            <button onClick={handleViewPackages} className="view-packages-button">
              View Package Insights
            </button> {/* Button to view more details */}
          </div>
        </div>

        <div className="charts-container">
          <div className="chart">
            <h3>Profit Tracker</h3>
            <Line data={profitChartData} options={{ responsive: true }} />
          </div>
          <div className="chart">
            <h3>Investment Insights</h3>
            <Bar data={investmentChartData} options={{ responsive: true }} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default WealthOverview;
