import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import UserNav from '../components/UserNav';
import axios from 'axios';
import { dmd } from '../assets/assets';
import { Link } from 'react-router-dom';
import '../stylesheets/Packages.css';
import numberFormat from '../utils/NumberFormatter';
import Unauthorized from '../utils/Unauthorized';

const Packages = () => {
  const [packages, setPackages] = useState([]);

  const isLoggedIn = Cookies.get('token');
  const userId = Cookies.get('userId');
  const balance = localStorage.getItem('amount');
  const url = process.env.REACT_APP_URL;

  const showPackages = async () => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get(`${url}/packages/`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      const packages = response.data;
      setPackages(packages);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddPackage = async (packageId, packagePrice) => {
    if (parseFloat(balance) < parseFloat(packagePrice)) {
      alert("Insufficient balance, please top up your account balance");
    } else {
      try {
        const token = Cookies.get('token');
        await axios.post(
          `${url}/users/${userId}/packages`,
          { package_id: packageId },
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        alert('Package added successfully');
        const newBalance = parseFloat(balance) - parseFloat(packagePrice);
        localStorage.setItem('amount', newBalance);
      } catch (error) {
        alert('Package is not available for investing');
        console.error('Error adding package:', error);
      }
    }
  };

  useEffect(() => {
    showPackages();
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <section className='user'>
          <UserNav />
          <main className='user-main'>
            <h2>Investment Packages</h2>
            <div className='packages-grid'>
              <div className='package-card'>
                <h3>Starter Investment</h3>
                <p>Invest $50 and earn $300</p>
                <div className='card-info'>
                  <span className='package-icon'>$</span>
                  <span>50</span>
                </div>
                <button onClick={() => handleAddPackage(1, 50)}>Activate</button>
              </div>
              <div className='package-card'>
                <h3>Growth Investment</h3>
                <p>Invest $150 and earn $500</p>
                <div className='card-info'>
                  <span className='package-icon'>$</span>
                  <span>150</span>
                </div>
                <button onClick={() => handleAddPackage(2, 150)}>Activate</button>
              </div>
              <div className='package-card'>
                <h3>Premium Investment</h3>
                <p>Invest $300 and earn $1000</p>
                <div className='card-info'>
                  <span className='package-icon'>$</span>
                  <span>300</span>
                </div>
                <button onClick={() => handleAddPackage(3, 300)}>Activate</button>
              </div>
            </div>
          </main>
        </section>
      ) : (
        <Unauthorized />
      )}
    </div>
  );
};

export default Packages;
