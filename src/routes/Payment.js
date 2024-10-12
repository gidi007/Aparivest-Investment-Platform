import React, { useState } from 'react';
import Cookies from 'js-cookie';
import UserNav from '../components/UserNav';
import { FaChartBar, FaChartArea } from 'react-icons/fa';
import numberFormat from '../utils/NumberFormatter';
import PaystackDepositForm from '../components/PayForm';
import WithdrawalForm from '../components/WithdrawalForm';
import CheckoutForm from '../routes/CheckoutForm'; // Stripe form import
import Unauthorized from '../utils/Unauthorized';
import '../stylesheets/user/Payment.css';

const Payment = () => {
  const [selectedPayment, setSelectedPayment] = useState('paystack');

  const isLoggedIn = Cookies.get('token');
  const balance = localStorage.getItem('amount');
  const recentDeposit = localStorage.getItem('recentDeposit');

  const handlePaymentSwitch = (method) => setSelectedPayment(method);

  return (
    <div>
      {isLoggedIn ? (
        <section className="user">
          <UserNav />
          <main className="user-main">
            <div className="payment">
              <div className="stat-con-flex">
                <div className="stat-box">
                  <div className="stat-box-md">
                    <span>Balance</span>
                  </div>
                  <div className="stat-box-btm">
                    <b>{numberFormat(balance || 0)}</b>
                  </div>
                </div>

                <div className="stat-box">
                  <div className="stat-box-md">
                    <span>Recent Deposit</span>
                  </div>
                  <div className="stat-box-btm">
                    <b>{numberFormat(recentDeposit || 0)}</b>
                  </div>
                </div>
              </div>

              <div className="payment-buttons">
                <button
                  onClick={() => handlePaymentSwitch('paystack')}
                  className={`payment-btn ${
                    selectedPayment === 'paystack' ? 'active' : ''
                  }`}
                >
                  Pay with Paystack
                </button>
                <button
                  onClick={() => handlePaymentSwitch('stripe')}
                  className={`payment-btn ${
                    selectedPayment === 'stripe' ? 'active' : ''
                  }`}
                >
                  Pay with Stripe
                </button>
              </div>

              <div className="d-w-con">
                {selectedPayment === 'paystack' && <PaystackDepositForm />}
                {selectedPayment === 'stripe' && <CheckoutForm />}
                <WithdrawalForm />
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

export default Payment;
