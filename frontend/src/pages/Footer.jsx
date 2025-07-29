import React from "react";


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>✨ Product Store</h3>
        <p>© {new Date().getFullYear()}</p>
        <p>
          Built with ⚛️ React, 🚀 Express, 🌳 Node.js & 🐘 PostgreSQL (PERN Stack)<br />
          Made by <span className="highlight">Varshitha</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
