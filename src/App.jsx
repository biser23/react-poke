import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      if (!searchTerm) {
        setPokemonData(null);
        return;
      }
      setIsLoading(true);
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
        if (!response.ok) {
          throw new Error('Pokemon no encontrado');
        }
        const data = await response.json();
        setPokemonData(data);
        setError(null);
      } catch (error) {
        setError(error.message);
        setPokemonData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemon();
  }, [searchTerm]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="app">
      <h1>Nombre del Pokemon</h1>
      <form>
        <input
          type="text"
          placeholder="Nombre del Pokemon"
          value={searchTerm}
          onChange={handleInputChange}
        />
        {isLoading && <p>Loading...</p>}
      </form>
      {error && <p>{error}</p>}
      {pokemonData && (
        <div className="detalles-pokemon">
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
          <h2>{pokemonData.name}</h2>
          {}
        </div>
      )}
    </div>
  );
}
export default App;
