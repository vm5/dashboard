// App.js
import React, { useEffect } from 'react';
import './App.css';
import 'aos/dist/aos.css'; // Import AOS styles
import AOS from 'aos';
import Dashboard from './student';
import Header from './header';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duration of animations in milliseconds
      easing: 'ease-in-out', // Easing function
      once: true, // Whether animation should happen only once - while scrolling down
    });
  }, []);

  return (
    <div className="App">
      <Header />
      <Dashboard />
    </div>
  );
}

export default App;
