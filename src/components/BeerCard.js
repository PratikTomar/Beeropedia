import React from 'react';
import './BeerCard.css'; 

const BeerCard = ({ data }) => {
  const { id, name, tagline, first_brewed, description, image_url } = data;

  return (
    <div className="beer-card">
      <img src={image_url} alt={name} className="beer-image" />
      <div className="beer-details">

        <h2>{name}</h2>
        <p>ID-{id}</p>
        <p>{tagline}</p>
        <p>First Brewed: {first_brewed}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default BeerCard;
