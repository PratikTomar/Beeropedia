import React from 'react';
import './BeerCard.css'; 

const BeerCard = ({ data }) => {
  const { name, tagline, first_brewed, description, image_url } = data;

  return (
    <div className="beer-card">
      <img src={image_url} alt={name} className="beer-image" />
      <div className="beer-details">
        <h2 className="beer-name">{name}</h2>
        <p className="beer-tagline">{tagline}</p>
        <p className="first-brewed">First Brewed: {first_brewed}</p>
        <p className="beer-description">{description}</p>
      </div>
    </div>
  );
};

export default BeerCard;
