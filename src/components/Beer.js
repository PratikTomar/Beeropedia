import React, { useEffect } from "react";
import { useState } from "react";
import BeerCard from "./BeerCard";
import "./BeerCard.css";

const BASE_API = `https://api.punkapi.com/v2/beers`;
const Beer = () => {
  const [beer, setBeer] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [perPage, setPerPage] = useState(20);
  const [beerName, setBeerName] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const beerNameSearch = beerName !== "" ? `&beer_name=${beerName}` : "";
      setIsLoading(true);

      const res = await fetch(
        `${BASE_API}?page=${currentPage}&per_page=${perPage}${beerNameSearch}`
      );

      const data = await res.json();
      setBeer(data);
      setIsLoading(false);
    };

    fetchData();
  }, [currentPage, beerName, perPage]);

  const handleChange = (e) => {
    setBeerName(e.target.value);
  };

  const handleSelect = (e) => {
    setPerPage(e.target.value);
  };

  const prevHandler = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const nextHandler = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="card-container">
    <h1>Beeropedia : Beer Encyclopedia</h1>
      <input
        type="text"
        value={beerName}
        onChange={handleChange}
        placeholder="Type here to search..."
      ></input>
      <div className="items-per-page-container">
        <label htmlFor="itemsPerPage">Beers Per Page</label>
        <select onChange={handleSelect}>
          <option value="" disabled={perPage > 20 ? true : false}>
            --Please choose an option--
          </option>
          <option value="30">30 Beers per page</option>
          <option value="50">50 Beers per page</option>
          <option value="70">70 Beers per page</option>
        </select>
      </div>
      {beer.map((item) => {
        return <BeerCard data={item} key={item.id} />;
      })}
      {isLoading && <p className="loading">Loading....</p>}
      <div className="pages-button">
        <button
          disabled={currentPage === 1}
          onClick={prevHandler}
        >
          Previous
        </button>
        <button
          disabled={beer.length < perPage}
          onClick={nextHandler}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Beer;
