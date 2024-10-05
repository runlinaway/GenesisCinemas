import React from 'react';
import Header from '../components/Header'
import '../assets/styles/_homepage.scss';  // Import HomePage specific styles

function HomePage() {
  console.log("Homepage rendered");
  return (
    <div className="homepage">
      <Header />
    </div>
  );
}

export default HomePage;

