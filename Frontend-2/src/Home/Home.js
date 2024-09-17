import React from 'react';
import './Home.css';

const imageUrls = ["https://images.unsplash.com/photo-1715924298872-9a86b729eb96?q=80&w=1892&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
  "https://takestwoeggs.com/wp-content/uploads/2022/04/Ba%CC%81nh-Xe%CC%80o-Vietnamese-Cre%CC%82pes-Takestwoeggs-Final-Photogrphy-sq.jpg", 
  "https://mission-food.com/wp-content/uploads/2023/02/Vietnamese-Chicken-Wings-Featured.jpg"];

function BanhMiCatering() {
  return (
    <main className="main-container">
      <div className="content-wrapper">
      <h2 className="welcome-text">Welcome to Banh Mi Catering</h2>
        <section className="image-gallery">
          {imageUrls.map((url, index) => (
            <div className="image-wrapper" key={index}>
              <img src={url} alt={`Gallery image ${index + 1}`} className="image" />
            </div>
          ))}
        </section>
        
        <p className="sub-text">See our Menu First!</p>
        <p className='sub-text'>Choose some options and then we will get to get a quota based on the amount guest and items</p>
      </div>
    </main>
  );
}

export default BanhMiCatering;