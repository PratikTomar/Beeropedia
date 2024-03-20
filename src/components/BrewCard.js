import React from "react";
import "./BrewCard.css";

const BrewCard = ({ data }) => {
  const {
    name,
    brewery_type,
    city,
    country,
    state,
    street,
    website_url,
    postal_code,
  } = data;

  return (
    <div className="brew-card">
      <div className="brew-details">
        <h2 className="brew-name">{name}</h2>
        <p className="brew-site">{website_url}</p>
        <p className="brew-type">Brewery type: {brewery_type}</p>
      </div>
      <div className="address-container">
        <h3 className="address-title">Address:</h3>
        <p>{street}</p>
        <p>
          {city}, {state} {postal_code}
        </p>
        <p>{country}</p>
      </div>
    </div>
  );
};

export default BrewCard;
