
import './App.css';
import React, { useEffect, useState } from 'react';
import Pokemon from './components/pokemon'
function App() {
  const [pokemon, setPokemon] = useState([]);
  useEffect(function () {
    fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
      .then(function (serverReturn) {
        return serverReturn.json()
      })
      .then(function (jsonPromise) {
        setPokemon(jsonPromise)
      })


  }, [])
  var basePokemon = {
    name: pokemon?.name.toUpperCase(),
    height:pokemon?.height,
    weight:pokemon?.weight,
    sprite:pokemon.sprites?.front_default,
  }

  return (
    <div>
      <form onSubmit={function handleSearchPokemon(e) {
        e.preventDefault();
        const formData = new FormData(e.target)

        fetch(`https://pokeapi.co/api/v2/pokemon/${formData.get("searchPoke")}`)
          .then(function (serverReturn) {
            return serverReturn.json()
          })
          .then(function (jsonPromise) {
          
            setPokemon(jsonPromise)
            basePokemon = {
              name: pokemon?.name.toUpperCase(),
              height:pokemon?.height,
              weight:pokemon?.weight,
              sprite:pokemon.sprites?.front_default,
            }

          })  
          .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
          });  



      }}>
        <label htmlFor="nomePokemon">Pokemon</label>
        <input name="searchPoke"id="nomePokemon" types="text" placeholder="Pikachu"></input>
        <button>Buscar</button>
      </form>
      
      <Pokemon pokemon={basePokemon}></Pokemon>
     
      Habilidades
      <ul>
        {
          pokemon.abilities?.map((entity) => {
            return (
              <li key={entity.ability.name}>
                {entity.ability.name}
              </li>
            )
          })
        }
      </ul>
      Tipos
      <ul>
        {
          pokemon.types?.map((entity) => {
            return (
              <li key={entity.type.name}>
                {entity.type.name}
              </li>
            )
          })
        }
      </ul>
      Moves
      <ul>
        {
          pokemon.moves?.map((entity,index) => {
            return (
              <li key={entity.move.name + index}>
                {entity.move.name}
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}

export default App;
