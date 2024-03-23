import React, { useState, useEffect } from 'react';
import Pokemon from './Pokemon';

const apiBase = "https://us-central1-it-sysarch32.cloudfunctions.net/pagination";

function Pokedex() {
  const [pokemon, setPokemon] = useState([]);
  const [language, setLanguage] = useState("english");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await fetch(`${apiBase}?page=${currentPage}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        if (!Array.isArray(data.data)) {
          throw new Error('Invalid data format: Expected an array');
        }
        setPokemon(data.data);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchAPI();
  }, [currentPage]);
  
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="layer">
      <div className="button-header">
        <button className="button" onClick={() => handleLanguageChange("english")}>English</button>
        <button className="button" onClick={() => handleLanguageChange("japanese")}>Japanese</button>
        <button className="button" onClick={() => handleLanguageChange("chinese")}>Chinese</button>
        <button className="button" onClick={() => handleLanguageChange("french")}>French</button>
      </div>
      <div className="pagination">
        <button className="pagination-button" onClick={handlePrevPage} disabled={currentPage === 1}>Back</button>
        {[...Array(totalPages).keys()].map(pageNumber => (
          <button key={pageNumber + 1} className="pagination-button" onClick={() => handlePageChange(pageNumber + 1)}>{pageNumber + 1}</button>
        ))}
        <button className="pagination-button" onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
      <div className="pokedex">
        {pokemon.map(poke => (
          <Pokemon
            key={poke.id}
            id={poke.id}
            name={poke.name[language]}
            type={poke.type}
            image={poke.image}
            HP={poke.base.HP}
            Attack={poke.base.Attack}
            Defense={poke.base.Defense}
            Speed={poke.base.Speed}
            Sp_Attack={poke.base["Sp. Attack"]}
            Sp_Defense={poke.base["Sp. Defense"]}
          />
        ))}
      </div>
    </div>
  );
}

export default Pokedex;
