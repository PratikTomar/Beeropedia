import React, { useEffect, useState } from "react";
import BeerCard from "./BeerCard";
import "./BeerCard.css";

const BASE_API = `https://api.punkapi.com/v2/beers`;

const Beer = () => {
  const [beer, setBeer] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [perPage, setPerPage] = useState(20);
  const [beerName, setBeerName] = useState("");
  const [isScrollToTop, setIsScrollToTop] = useState(false);

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
      setIsScrollToTop(true);
    };

    fetchData();
  }, [currentPage, beerName, perPage]);

  useEffect(() => {
    if (isScrollToTop) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setIsScrollToTop(false);
    }
  }, [isScrollToTop]);

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
    <div className="beer-container">
      <h1 className="title">Beeropedia: Beer Encyclopedia</h1>
      <div className="search-container">
        <input
          type="text"
          value={beerName}
          onChange={handleChange}
          placeholder="Search for beers..."
          className="search-input"
        />
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

      <div className="beer-list">
        {beer.map((item) => (
          <BeerCard data={item} key={item.id} />
        ))}
      </div>
      {isLoading && <p className="loading">Loading...</p>}
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={prevHandler}
          className="pagination-button"
        >
          Previous
        </button>
        <button
          disabled={beer.length < perPage}
          onClick={nextHandler}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Beer;
