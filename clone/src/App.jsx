import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/landing" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

function Login() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/landing");
  };

  return (
    <div className="login-container">
      <div className="logo">PayPal</div>
      <div className="login-form">
        <h2>Sign In</h2>
        <input type="text" placeholder="Email address or Phone number" />
        <input type="password" placeholder="Password" />
        <div className="options">
          <a href="#">Forgotten?</a>
          <a href="#">New to PayPal? Sign up</a>
        </div>
        <button className="btn-login" onClick={handleSignIn}>
          Sign In
        </button>
      </div>
    </div>
  );
}

function LandingPage() {
  const images = [
    "p-1.png",
    "p-2.png",
    "p-3.png",
    "p-4.png",
    "p-5.png",
    "p-6.png",
    "p-7.png",
    "p-8.png",
    "p-9.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const imagesToShow = 3; // Number of images visible at a time
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const nextSlide = () => {
    if (currentIndex < images.length - imagesToShow) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="landing-page">
      {/* Header Section */}
      <div className="header-section">
        <div className="header-left">
          <span className="dashboard-icon">
            <i className="fas fa-chart-bar"></i> {/* Dashboard Icon */}
          </span>
        </div>

        {/* Search Bar Section */}
        <div className="header-search">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        <div className="header-right">
          <span className="profile-icon">
            <i className="fas fa-user"></i> {/* Profile Icon */}
          </span>
        </div>
      </div>

      {/* Send Again Section */}
      <div className="send-again-section">
        <h3 className="send-again-title">Send Amount</h3>
        <div className="profiles">
          <div className="profile">
            <i className="fas fa-qrcode"></i>
            <p>SCAN/PAY</p>
          </div>
          <div className="profile">
            <i className="fas fa-user-alt"></i>
            <p>TO MOBILE</p>
          </div>
          <div className="profile">
            <i className="fas fa-user-circle"></i>
            <p>TO CONTACTS</p>
          </div>
          <div className="profile">
            <i className="fa fa-credit-card paytm-icon"></i>
            <p>CHECK BALANCE</p>
          </div>
        </div>
      </div>

      {/* Transactions Section */}
      <div className="transactions-section">
        <h4>Recent Transactions</h4>
        <div className="transaction">
          <div className="circle">DB</div>
          <div className="details">
            <p>Diego B.</p>
            <p>15 Oct</p>
            <p>Request received</p>
          </div>
          <p className="amount">-£25.00</p>
        </div>
        <div className="transaction">
          <div className="circle">AH</div>
          <div className="details">
            <p>Alisha H.</p>
            <p>10 Oct</p>
            <p>Request received</p>
          </div>
          <p className="amount">-£10.00</p>
        </div>
        <div className="transaction">
          <div className="circle">W</div>
          <div className="details">
            <p>Wonku</p>
            <p>30 Sept</p>
            <p>Automatic Payment</p>
          </div>
          <p className="amount">-£15.99</p>
        </div>
      </div>

      {/* Balance and Fundraisers Section */}
      <div className="balance-fundraisers">
        <div className="card">
          <h3>Fundraisers</h3>
          <p>Support the causes that matter to you</p>
          <div className="carousel-container">
            <div className="carousel">
              <div
                className="carousel-images"
                style={{ transform: `translateX(-${currentIndex * (100 / imagesToShow)}%)` }}
              >
                {images.map((image, index) => (
                  <div className="carousel-image" key={index}>
                    <img src={image} alt={`Image ${index + 1}`} />
                  </div>
                ))}
              </div>
              <button className="carousel-button carousel-button-left" onClick={prevSlide}>
                &#10094;
              </button>
              <button className="carousel-button carousel-button-right" onClick={nextSlide}>
                &#10095;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="footer-section">
        <div className="footer-icon">Home</div>
        <div className="footer-icon">Crypto</div>
        <div className="footer-icon">
          <i className="fas fa-qrcode"></i> {/* Scanner Icon */}
          <span>Scanner</span>
        </div>
        <div className="footer-icon">Send/Request</div>
        <div className="footer-icon">Wallet</div>
      </div>
    </div>
  );
}

export default App;
