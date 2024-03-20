import React, { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import "./BrewCard.css";
import BrewCard from "./BrewCard";


const BASE_API = `https://api.openbrewerydb.org/v1/breweries`;

const Brew = () => {
  const [brew, setBrew] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [perPage, setPerPage] = useState(20);
  const [brewName, setBrewName] = useState("");
  const debouncedSearch = useDebounce(brewName);
  const [isScrollToTop, setIsScrollToTop] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const brewNameSearch = brewName !== "" ? `&by_name=${brewName}` : "";
      setIsLoading(true);

      const res = await fetch(
        `${BASE_API}?page=${currentPage}&per_page=${perPage}${brewNameSearch}`
      );

      const data = await res.json();
      setBrew(data);
      setIsLoading(false);
      setIsScrollToTop(true);
    };

    fetchData();
}, [currentPage, debouncedSearch, perPage]);

  useEffect(() => {
    if (isScrollToTop) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setIsScrollToTop(false);
    }
  }, [isScrollToTop]);

  const handleChange = (e) => {
    const { value } = e.target;
    setBrewName(value);

  };

  const handleSelect = (e) => {
    const { value } = e.target;
    setPerPage(value);
  };

  const prevHandler = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const nextHandler = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="brew-container">
      <h1 className="title">Brewopedia: Brew Encyclopedia</h1>
      <div className="search-container">
        <input
          type="text"
          value={brewName}
          onChange={handleChange}
          placeholder="Search for Brews..."
          className="search-input"
        />
        <label htmlFor="itemsPerPage">List Per Page</label>
        <select onChange={handleSelect}>
          <option value="" disabled={perPage > 20 ? true : false}>
            --Please choose an option--
          </option>
          <option value="30">30 per page</option>
          <option value="50">50 per page</option>
          <option value="70">70 per page</option>
        </select>
      </div>

      <div className="brew-list">
        {brew.map((item) => (
          <BrewCard data={item} key={item.id} />
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
          disabled={brew.length < perPage}
          onClick={nextHandler}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Brew;
