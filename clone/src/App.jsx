import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    if (!email || !password) {
      setError("Both email and password are required!");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setError("");
        navigate("/landing");
      } else {
        setError(data.message || "Login failed!");
      }
    } catch (err) {
      setError("Connection error. Please try again.");
    }
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="login-container">
      <div className="logo">Paynow</div>
      <div className="login-form">
        <h2>Sign In</h2>
        <input
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="error-message">{error}</p>}
        <div className="options">
          <a href="#">Forgot Password?</a>
          <a href="#" onClick={handleSignUp}>
            New to Paynow? Sign up
          </a>
        </div>
        <button className="btn-login" onClick={handleSignIn}>
          Sign In
        </button>
      </div>
    </div>
  );
}

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      setError("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setError("");
        navigate("/login");
      } else {
        setError(data.message || "Signup failed!");
      }
    } catch (err) {
      setError("Connection error. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      
      <div className="signup-form">
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <p className="error-message">{error}</p>}
        <button className="btn-signup" onClick={handleSignup}>
          Sign Up
        </button>
        <p>
          Already have an account?{" "}
          <a href="#" onClick={() => navigate("/login")}>
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}

function LandingPage() {
  return (
    <div className="landing-container">
      <h1>Welcome to Paynow!</h1>
      <p>This is the landing page after successful login.</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/landing" element={<LandingPages />} />
      </Routes>
    </Router>
  );
}

function LandingPages() {
  const navigate = useNavigate();
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
  const [transactions, setTransactions] = useState([
    { id: 1, name: "Diego B.", date: "15 Oct", type: "Request received", amount: "25.00 RS", initials: "DB" },
    { id: 2, name: "Alisha H.", date: "10 Oct", type: "Request received", amount: "10.00 RS", initials: "AH" },
    { id: 3, name: "Wonku", date: "30 Sept", type: "Automatic Payment", amount: "15.99 RS", initials: "W" },
  ]);
  
  // Sidebar visibility state
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const nextSlide = () => {
    if (currentIndex < images.length - imagesToShow) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Reset to the first image if at the end
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(images.length - imagesToShow); // Go to the last image if at the start
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter transactions based on search query
  const filteredTransactions = transactions.filter(transaction =>
    transaction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.date.includes(searchQuery)
  );

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className={`landing-page ${sidebarVisible ? 'sidebar-active' : ''}`}>
      {/* Sidebar */}
      <div className={`sidebar ${sidebarVisible ? 'visible' : ''}`}>
        <div className="sidebar-header">
          <h3>Menu</h3>
          <button className="close-sidebar" onClick={toggleSidebar}>×</button>
        </div>
        <ul className="sidebar-menu">
          <li><a href="#dashboard">Dashboard</a></li>
          <li><a href="#transactions">Transactions</a></li>
          <li><a href="#settings">Settings</a></li>
          <li><a href="#" onClick={handleLogout}>Log out</a></li>
        </ul>
      </div>

      {/* Header Section */}
      <div className="header-section">
        <div className="header-left">
          <button className="menu-toggle" onClick={toggleSidebar}>
            <i className="fas fa-bars"></i>
          </button>
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
        {filteredTransactions.map((transaction) => (
          <div className="transaction" key={transaction.id}>
            <div className="circle">{transaction.initials}</div>
            <div className="details">
              <p>{transaction.name}</p>
              <p>{transaction.date}</p>
              <p>{transaction.type}</p>
            </div>
            <p className="amount">{transaction.amount}</p>
          </div>
        ))}
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
