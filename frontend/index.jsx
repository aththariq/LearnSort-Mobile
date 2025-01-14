import React from 'react';
import './styles.css'; // Assuming styles are globally imported

const Header = () => (
  <header>
    <div className="logo">
      <a href="index.html">
        <img src="assets/images/logo.webp" alt="LearnSort Logo" />
      </a>
    </div>
    <nav>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#algorithms">Algorithms</a></li>
        <li><a href="#overview">Overview</a></li>
        <li><a href="#demo">Demo</a></li>
        <li><a href="#testimonials">Testimonials</a></li>
        <li><a href="#faq">FAQ</a></li>
        <li><a href="#creator">Creator</a></li>
      </ul>
    </nav>
    <div>
      <button id="GetStarted">Get Started</button>
    </div>
  </header>
);

const Main = () => (
  <main>
    <section id="home">
      <h1>Discover How Easy Sorting Algorithms Can Be</h1>
      <p id="description-h1">
        Practice and learn with visual guides and interactive challenges. Perfect for beginners!
      </p>
      <button id="startlearning-button">Start learning today</button>
    </section>
    <section id="algorithms">
      {/* Content for Algorithms */}
    </section>
    <section id="overview">
      {/* Content for Overview */}
    </section>
    <section id="faq">
      {/* FAQ Section */}
    </section>
    <section id="creator">
      {/* Creator Bio */}
    </section>
  </main>
);

const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <div className="footer-links">
        <a href="#">About</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Contact</a>
      </div>
      <div className="footer-socials">
        <a href="https://github.com/aththariq" className="fa fa-github fa-lg" title="GitHub Profile"></a>
        <a href="https://www.linkedin.com/in/aththariqlisan/" className="fa fa-linkedin fa-lg" title="LinkedIn Profile"></a>
        <a href="mailto:aththariq.lisan@gmail.com" className="fa fa-envelope fa-lg" title="Email Aththariq Lisan"></a>
      </div>
    </div>
  </footer>
);

const IndexPage = () => (
  <div>
    <Header />
    <Main />
    <Footer />
  </div>
);

export default IndexPage;